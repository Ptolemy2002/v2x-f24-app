import appModulePath from 'app-module-path';
console.log("Adding current directory to module path:", process.cwd());
appModulePath.addPath(process.cwd());

import ms from 'ms';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressRateLimit from 'express-rate-limit';
import cors from 'cors';
import { HttpError } from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from 'services/swagger_output.json';
import { ZodErrorCodeSchema, ZodHelpLinkSchema } from 'shared';
import mongoose from 'mongoose';

import getEnv from 'env';
const env = getEnv();

import indexRouter from 'routes/index';
import { cleanupAnonymousConversationFiles } from 'services/gcloud/storage';
import { schedule } from 'lib/scheduler';

const app = express();

// Connect to MongoDB
mongoose.connect(env.mongoConnectionString)
    .then(() =>  console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error("Error Connecting to MongoDB:", err));

schedule(
    "cleanupAnonymousConversationFiles",
    0,
    async () => {
        await cleanupAnonymousConversationFiles();
        return ms("5m");
    },

    (e) => {
        console.error("Error cleaning up anonymous conversation files:", e);
        return ms("5m");
    }
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

try {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, {explorer: true}));
    console.log("Swagger documentation is available at /api/v1/docs");
} catch (error) {
    console.error("Error loading Swagger documentation:", error);
}

if (env.isProd) {
    const limiter = expressRateLimit({
        windowMs: ms("5m"),
        max: 100, // Limit each IP to 100 requests per windowMs
        standardHeaders: true, // Return rate limit info in the "RateLimit-*" headers
        legacyHeaders: false // Disable the "X-RateLimit-*" headers
    });

    app.use(limiter);
}

app.use(cors({
    origin: env.isProd ?
        env.prodClientUrl! : env.devClientUrl,
    credentials: true
}));

app.use('/', indexRouter);

app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    if (!res.headersSent) {
        let code = err.code ?? "UNKNOWN";
        const { success: codeSuccess } = ZodErrorCodeSchema.safeParse(code);

        let help = err.help ?? getEnv().getDocsURL(1);
        const { success: helpSuccess } = ZodHelpLinkSchema.safeParse(help);

        if (!codeSuccess) {
            code = "UNKNOWN";
        }

        if (!helpSuccess) {
            help = getEnv().getDocsURL(1);
        }

        res.status(err.status ?? 500);
        res.json({ ok: false, code, message: err.message, help });
    }
});

export default app;
