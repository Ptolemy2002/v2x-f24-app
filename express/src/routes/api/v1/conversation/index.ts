import express from 'express';
import conversationGetRouter from './get';
import conversationNewRouter from './new';
import conversationListNameRouter from './list-name';
import conversationUpdateByIDRouter from './update/by-id';
import conversationUpdateByNameRouter from './update/by-name';
const router = express.Router();

router.use("/", conversationGetRouter);
router.use("/", conversationNewRouter);
router.use("/", conversationListNameRouter);

router.use("/", conversationUpdateByIDRouter);
router.use("/", conversationUpdateByNameRouter);

const conversationRouter = router;
export default conversationRouter;