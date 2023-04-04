import axios from "axios";
import { Response, Request } from "express";
import httpStatus from "http-status";

import { NotFoundError } from "errors";

import { testService } from "services";

import { errorHandlerWrapper } from "utils";
import { query } from "express-validator";

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getRecentBlockProductionValidator = () => {
	return [];
};

const getRecentBlockProductionHandler = async (
	_req: Request<Params, ResBody, ReqBody, ReqQuery>,
	res: Response
) => {
	const result = await axios({
		url: process.env.SOLANA_HTTPS_SERVER,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		data: {
			id: 1,
			jsonrpc: "2.0",
			method: "getBlockProduction",
		},
	});

	res.status(httpStatus.OK).json(result.data);
};

export const getRecentBlockProduction = errorHandlerWrapper(
	getRecentBlockProductionHandler
);
