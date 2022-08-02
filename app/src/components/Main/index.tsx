import React from 'react';
import MainHead from './MainHead';
import styled from '@emotion/styled';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import axios from 'axios';

const bs58 = require('bs58');

function Main() {
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction, select } = useWallet();

  const handleConnect = () => {
    select(PhantomWalletName);
    console.log('>>publickKet', publicKey);
    console.log('connected', connected);
    console.log('>>connection본래정보', connection);
  };

  return (
    <StyledRoot>
      <MainHead />
      <button onClick={handleConnect}>connect to wallet</button>
    </StyledRoot>
  );
}

export default Main;

const StyledRoot = styled.main``;
