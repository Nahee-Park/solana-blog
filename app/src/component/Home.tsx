import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { FC, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const bs58 = require('bs58');

function Home() {
  const [solBalance, setSolBalance] = useState<number>();
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction, select } = useWallet();

  const testPubKey = new PublicKey('GEeKaAwCGwXFFReaeDrMxxWivChYSC87bbTCoxtfmj6q');
  const tokenPubKey = new PublicKey('ahTJbRgJTxoJ9E8v8PnarrNE5uNThx279XKW5MzhVj3');
  const getTokenAccountByOwner = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8899',
        {
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            testPubKey.toBase58(),
            {
              mint: TOKEN_PROGRAM_ID.toBase58(),
            },
            {
              encoding: 'jsonParsed',
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      console.log('>>>>getTokenAccountByOwner', response);
    } catch (e) {
      console.log(e);
    }
  };

  const getBalance = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8899',
        {
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: ['5hPeeELRbsUtq8ZEXMY7SLr9WfSGipGrfSGBgPRKnj5'],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      console.log('>>>>getBalance', response);
    } catch (e) {
      console.log(e);
    }
  };

  // Returns the token balance of an SPL Token account.
  const getTokenAccountBalance = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8899',
        {
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountBalance',
          // <string> - Pubkey of Token account to query, as base-58 encoded string
          params: ['5hPeeELRbsUtq8ZEXMY7SLr9WfSGipGrfSGBgPRKnj5'],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      console.log('>>>>getTokenAccountBalance', response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSendTransaction = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports: 1,
      }),
    );

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, 'processed');
  }, [publicKey, sendTransaction, connection]);

  const handleConnect = () => {
    select(PhantomWalletName);
    console.log('>>publickKet', publicKey);
    console.log('connected', connected);
    console.log('>>connection본래정보', connection);
  };

  useEffect(() => {
    getTokenAccountByOwner();
    getBalance();
    console.log('>>>typeof', testPubKey.toBase58());
    // console.log('>>test', bs58.encode(testPubKey));
    console.log('>>TOKEN_PROGRAM_ID', TOKEN_PROGRAM_ID);
  }, [testPubKey]);

  const handleBalanceClick = async () => {
    if (!publicKey) {
      return;
    }
    let balance = await connection.getBalance(publicKey);
    console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
    setSolBalance(balance / LAMPORTS_PER_SOL);
  };

  const handleGetAllToken = async () => {
    if (!publicKey) {
      return;
    }
  };

  return (
    <>
      <button onClick={handleConnect}>connect to wallet</button>
      <button onClick={handleBalanceClick} disabled={!publicKey}>
        get balance
      </button>
      <button onClick={handleGetAllToken} disabled>
        get all token from wallet address
      </button>
      {solBalance && <h1>{solBalance} sol</h1>}
    </>
  );
}

export default Home;
