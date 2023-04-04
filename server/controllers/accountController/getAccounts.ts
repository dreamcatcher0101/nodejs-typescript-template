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
		hashTable[token.address] = token;
	});

	const tokens = accountTokens
		.filter(
			(account) =>
				account.account.data.parsed.info.tokenAmount.decimals > 0 &&
				hashTable[account.account.data.parsed.info.mint]
		)
		.map((account) => ({
			name: hashTable[account.account.data.parsed.info.mint].name,
			symbol: hashTable[account.account.data.parsed.info.mint].symbol,
			mintAddress: account.account.data.parsed.info.mint,
			tokenAccountAddress: account.account.owner,
			amount: account.account.data.parsed.info.tokenAmount.amount,
			imageUrl: hashTable[account.account.data.parsed.info.mint].logoURI,
		}));

	res.status(httpStatus.OK).json({
		tokens,
	});
};

export const getSPLTokenAccounts = errorHandlerWrapper(
	getSPLTokenAccountsHandler
);
