import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const getSplTokenByOwner = async (wallet, solanaConnection) => {
  const filters = [
    {
      dataSize: 165,
    },
    {
      memcmp: {
        offset: 32,
        bytes: wallet,
      },
    },
  ];
  const accounts = await solanaConnection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
    filters: filters,
    encoding: 'jsonParsed',
  });

  console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
  accounts.forEach((account, i) => {
    //Parse the account data
    const parsedAccountInfo = account.account.data;
    const mintAddress = parsedAccountInfo['parsed']['info']['mint'];
    const tokenBalance = parsedAccountInfo['parsed']['info']['tokenAmount']['uiAmount'];
    //Log results
    console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
    console.log(`--Token Mint: ${mintAddress}`);
    console.log(`--Token Balance: ${tokenBalance}`);
  });
};
