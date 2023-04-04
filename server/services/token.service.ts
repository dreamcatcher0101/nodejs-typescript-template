import axios from "axios";
import { PublicKey } from "@solana/web3.js";

export const getNewToken = (publicKey: string): PublicKey => {
	return new PublicKey(publicKey);
};

interface IToken {
	address: string;
}

interface ITokenList {
	tokens: IToken[];
}

export const getAllTokenList = async (): Promise<ITokenList> => {
	const { data: tokenList } = await axios.get(
		"https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json"
	);

	return tokenList;
};

interface IAccount {
	account: {
		data: {
			parsed: {
				info: {
					mint: string;
					tokenAmount: {
						decimals: number;
					};
				};
			};
		};
	};
	pubkey: string;
}

interface ITokenAccountByOwner {
	result: {
		value: IAccount[];
	};
}

export const getTokenAccountsByOwner = async (
	publicKey: PublicKey
): Promise<ITokenAccountByOwner> => {
	const { data } = await axios({
		url: "https://api.mainnet-beta.solana.com",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		data: {
			id: 1,
			jsonrpc: "2.0",
			method: "getTokenAccountsByOwner",
			params: [
				publicKey.toBase58(),
				{
					programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
				},
				{
					encoding: "jsonParsed",
				},
			],
		},
	});

	return data;
};
