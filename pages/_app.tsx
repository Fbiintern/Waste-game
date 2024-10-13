import React from 'react';
import { AppProps } from 'next/app';
import Provider from '../config/Provider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;