import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import Main from '@src/components/Main';

const endPoint = 'http://127.0.0.1:8899';

const Home: NextPage = () => {
  const wallets = [getPhantomWallet()];
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
