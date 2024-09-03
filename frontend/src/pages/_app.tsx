import "@/styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import store from "../redux/store";
import { Provider, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import mixpanel from "mixpanel-browser";

mixpanel.init("90e1bef61bd9e8539fe7fed160938e58", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // suppress useLayoutEffect warnings when running outside a browser
  if (!typeof window) React.useLayoutEffect = useEffect;
  localStorage.setItem("theme", "dark");

  // React.useEffect(() => {
  //   // write useEffect if we are not having any key related to @aptos-connect/keyless-accounts redirect to 3000
  //   if (!localStorage.getItem("@aptos-connect/keyless-accounts")) {
  //     router.push("/");
  //   } else {
  //     // router.push("/dashboard");
  //   }
  // });

  return (
    <Provider store={store}>
      <ThemeProvider themes={["light", "dark", "cupcake", "lofi", "cyberpunk"]}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
