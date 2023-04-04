import express from "express";

import { accountController } from "controllers";

const accountRouter = express.Router();

// Get Recent Block Production
accountRouter.get(
	"/tokens/:accountPublicKey",
	accountController.getSPLTokenAccountsValidator(),
	accountController.getSPLTokenAccounts
);

export default accountRouter;
