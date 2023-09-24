import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "@/components/Error/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <CssBaseline />
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}
