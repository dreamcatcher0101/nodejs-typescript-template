import express from "express";

import { blockControler } from "controllers";

const blockRouter = express.Router();

// Get Recent Block Production
blockRouter.get(
	"/recent-block-production",
	blockControler.getRecentBlockProductionValidator(),
	blockControler.getRecentBlockProduction
);

export default blockRouter;
