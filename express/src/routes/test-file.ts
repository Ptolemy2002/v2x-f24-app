import express from 'express';
import { cleanTempUploads, createMulter } from 'services/multer';

const router = express.Router();
const upload = createMulter();

router.post('/api/v1/test-file', upload.single('file'), (req, res) => {
    /*
        #swagger.path = '/api/v1/test-file'
        #swagger.method = 'post'
        #swagger.description = 'Upload a file.'
        #swagger.requestBody = {
            content: {
                required: true,
                'multipart/form-data': {
                    schema: {
                        type: 'object',
                        properties: {
                            file: {
                                type: 'string',
                                format: 'binary'
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[200] = {
            description: 'File uploaded.'
        }
    */
    console.log(req.file);
    cleanTempUploads();
    res.send('File uploaded');
});

const testFileRouter = router;
export default testFileRouter;