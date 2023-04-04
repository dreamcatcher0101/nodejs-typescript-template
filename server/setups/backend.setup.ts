import { json as bodyParserJSON } from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import express, { Express } from "express";

import { ROUTE_VERSION } from "config";

import { MESSAGES } from "consts";

import appRoutes from "routes";

dotenvConfig();

const port = process.env.PORT || 8000;

export const backendSetup = (app: Express) => {
	app.use(express.json());
	app.use(cors());
	app.use(bodyParserJSON());

	// Health check
	app.use("/health", function (_req, res) {
		res.send("OK");
	});

	app.use(`api/${ROUTE_VERSION}`, appRoutes);

	app.listen(port, () => {
		console.info(MESSAGES.SERVER.SUCCESSFULLY_STARTED);
	});
};
