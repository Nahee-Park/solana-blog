import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import Main from '@src/components/Main';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo } from 'react';

const Home: NextPage = () => {
  const endPoint = 'http://127.0.0.1:8899';
  const network = WalletAdapterNetwork.Devnet;
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <Styled.Page>
          <Main />
        </Styled.Page>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Home;

const Styled = {
  Page: styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
