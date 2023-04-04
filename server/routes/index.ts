import express from "express";

import accountRouter from "./account.route";
import blockRouter from "./block.route";
import testRouter from "./test.route";

const appRoutes = express.Router();

appRoutes.use("/account", accountRouter);
appRoutes.use("/block", blockRouter);
appRoutes.use("/test", testRouter);

export default appRoutes;
