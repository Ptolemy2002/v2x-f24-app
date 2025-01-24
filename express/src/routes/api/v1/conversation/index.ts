import express from 'express';
import conversationGetRouter from './get';
import conversationNewRouter from './new';
const router = express.Router();

router.use("/", conversationGetRouter);
router.use("/", conversationNewRouter);

const conversationRouter = router;
export default conversationRouter;