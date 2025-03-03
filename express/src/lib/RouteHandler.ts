import getEnv, { EnvType } from 'env';
import { ErrorCode, ErrorResponse, ErrorResponse400, ErrorResponse404, ErrorResponse501, ErrorResponseWithCode, SuccessResponseBase } from 'shared';
import { ZodError } from 'zod';
import { interpretZodError, InterpretZodErrorOptions } from '@ptolemy2002/regex-utils';
import { Response } from 'express';
import { cleanTempUploads, tempUploadsPath } from 'services/multer';

export type GeneratedResonse<SuccessResponse extends SuccessResponseBase> = {
    status: number;
} & (
    {
        response: ErrorResponse | SuccessResponse;
    } | {
        filePath: string;
    }
);

export type RouteHandlerRequestData = {
    params: unknown;
    query: unknown;
    body: unknown;
    file?: Express.Multer.File;
    files?: Express.Multer.File[] | Record<string, Express.Multer.File[]>;
};

export type RouteHandlerResponseData = {
    locals: unknown;
};

export default class RouteHandler<SuccessResponse extends SuccessResponseBase = {ok: true}> {
    protected _docsEndpoint: string;
    protected _docsVersion: number;
    protected _env: EnvType;
    protected help: string;

    set env(value: EnvType) {
        this._env = value;
        this.recalculateHelp();
    }

    get env() {
        return this._env;
    }

    set docsVersion(value: number) {
        this._docsVersion = value;
        this.recalculateHelp();
    }

    get docsVersion() {
        return this._docsVersion;
    }

    set docsEndpoint(value: string) {
        this._docsEndpoint = value;
        this.recalculateHelp();
    }

    get docsEndpoint() {
        return this._docsEndpoint;
    }

    constructor(docsVersion: number, docsEndpoint: string) {
        this._env = getEnv();
        this._docsVersion = docsVersion;
        this._docsEndpoint = docsEndpoint;
        this.help = this.recalculateHelp();
    }

    protected recalculateHelp() {
        this.help = this.env.getDocsURL(this.docsVersion) + this._docsEndpoint;
        return this.help;
    }

    protected buildSuccessResponse(data: Omit<SuccessResponse, "ok" | "help">): SuccessResponse {
        return {
            ...data,
            ok: true,
            help: this.help
        } as SuccessResponse;
    }

    protected buildErrorResponse<EC extends ErrorCode = "UNKNOWN">(
        code: EC,
        message: ErrorResponse["message"] = "Internal server error."
    ): ErrorResponseWithCode<EC> {
        return {
            ok: false,
            code,
            message,
            help: this.help,
        };
    }

    protected buildZodErrorResponse(
        error: ZodError,
        code: ErrorResponse400['code'] = 'BAD_INPUT',
        interpretOptions: InterpretZodErrorOptions = {},
    ): ErrorResponse400 {
        if (interpretOptions.prefix === undefined) {
            if (code === 'BAD_BODY') {
                interpretOptions.prefix = 'body';
            } else if (code === 'BAD_URL') {
                interpretOptions.prefix = 'url';
            } else if (code === 'BAD_QUERY') {
                interpretOptions.prefix = 'query';
            }
        }

        return this.buildErrorResponse(
            code,
            interpretZodError(error, interpretOptions)
        );
    }

    protected buildNotFoundResponse(
        message: ErrorResponse["message"] = 'No resources found.'
    ): ErrorResponse404 {
        return this.buildErrorResponse('NOT_FOUND', message);
    }

    protected buildNotImplementedResponse(
        message: ErrorResponse["message"] = 'This feature is not yet implemented.'
    ): ErrorResponse501 {
        return this.buildErrorResponse('NOT_IMPLEMENTED', message);
    }

    protected buildLocalsErrorResponse(
        message: ErrorResponse["message"] = 'Did not receive expected data from previous middleware in res.locals.'
    ): ErrorResponse {
        return this.buildErrorResponse('INTERNAL', message);
    }

    async generateResponse(
        req: RouteHandlerRequestData,
        res: RouteHandlerResponseData
    ): Promise<GeneratedResonse<SuccessResponse>> {
        return {
            status: 501,
            response: this.buildNotImplementedResponse()
        };
    }

    async handle(req: RouteHandlerRequestData, res: Response) {
        const result = await this.generateResponse(req, res);

        res.status(result.status);
        if ("response" in result) {
            res.json(result.response);
            cleanTempUploads();
        } else if ("filePath" in result) {
            res.sendFile(`${tempUploadsPath}/${result.filePath}`, () => {
                cleanTempUploads();
            });
        }
    }
}