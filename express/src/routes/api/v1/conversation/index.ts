import express from 'express';
import conversationGetRouter from './get';
import conversationNewRouter from './new';
import conversationListNameRouter from './list-name';
const router = express.Router();

router.use("/", conversationGetRouter);
router.use("/", conversationNewRouter);
router.use("/", conversationListNameRouter);

const conversationRouter = router;
export default conversationRouter;