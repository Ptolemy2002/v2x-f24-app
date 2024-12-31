import express from 'express';
import conversationGetRouter from './get';
const router = express.Router();

router.use("/", conversationGetRouter);

const conversationRouter = router;
export default conversationRouter;