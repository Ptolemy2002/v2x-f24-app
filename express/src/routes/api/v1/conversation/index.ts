import express from 'express';
import conversationGetRouter from './get';
import conversationNewRouter from './new';
import conversationListNameRouter from './list-name';
import conversationUpdateRouter from './update';
import conversationUploadRouter from './upload';
import conversationDeleteRouter from './delete';
import conversationDownloadRouter from './download';
const router = express.Router();

router.use("/", conversationGetRouter);
router.use("/", conversationNewRouter);
router.use("/", conversationListNameRouter);
router.use("/", conversationUpdateRouter);
router.use("/", conversationUploadRouter);
router.use("/", conversationDeleteRouter);
router.use("/", conversationDownloadRouter);

const conversationRouter = router;
export default conversationRouter;