import express from 'express';
import botQueryRouter from './query';
const router = express.Router();

router.use("/", botQueryRouter);

const botRouter = router;
export default botRouter;