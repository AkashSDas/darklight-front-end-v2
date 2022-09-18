import "@styles/globals.css";

import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import { SocialAuthPreFetch } from "@components/SocialAuthPreFetch";
import store from "@store/index";
import { BaseAuthLoginPersist } from "@components/BaseAuthLoginPersist";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <SocialAuthPreFetch>
        <BaseAuthLoginPersist>
          {getLayout(<Component {...pageProps} />)}
        </BaseAuthLoginPersist>
      </SocialAuthPreFetch>
    </Provider>
  );
};

export default MyApp;
