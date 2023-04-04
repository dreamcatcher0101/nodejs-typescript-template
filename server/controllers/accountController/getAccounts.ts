import { Response, Request } from "express";
import { param } from "express-validator";
import httpStatus from "http-status";

import { tokenService } from "services";

import { errorHandlerWrapper } from "utils";

type Params = {
	accountPublicKey: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getSPLTokenAccountsValidator = () => {
	return [
		param("accountPublicKey")
			.isString()
			.notEmpty()
			.withMessage("Account Public Key is required!"),
	];
};

const getSPLTokenAccountsHandler = async (
	req: Request<Params, ResBody, ReqBody, ReqQuery>,
	res: Response
) => {
	const { accountPublicKey } = req.params;

	const publicKey = tokenService.getNewToken(accountPublicKey);

	const tokenListData = await tokenService.getAllTokenList();

	const tokenAccountByOwner = await tokenService.getTokenAccountsByOwner(
		publicKey
	);

	const accountTokens = tokenAccountByOwner.result.value;
	const tokenList = tokenListData.tokens;

	const hashTable = {};

	tokenList.forEach((token) => {
		hashTable[token.address] = true;
	});

	const listedTokens = accountTokens.filter(
		(account) =>
			account.account.data.parsed.info.tokenAmount.decimals > 0 &&
			hashTable[account.account.data.parsed.info.mint]
	);

	res.status(httpStatus.OK).json({
		listedTokens,
	});
};

export const getSPLTokenAccounts = errorHandlerWrapper(
	getSPLTokenAccountsHandler
);
