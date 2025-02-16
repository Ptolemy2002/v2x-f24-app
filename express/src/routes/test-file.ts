import express from 'express';
import { createMulter } from 'services/multer';

const router = express.Router();
const upload = createMulter();

router.post('/api/v1/test-file', upload.single('file'), (req, res) => {
    /*
        #swagger.path = '/api/v1/test-file'
        #swagger.method = 'post'
        #swagger.description = 'Upload a file.'
        #swagger.requestBody = {
            content: {
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
    res.send('File uploaded');
});

const testFileRouter = router;
export default testFileRouter;