import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/system";
import Layout from "@/components/Section/Layout";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </NextUIProvider>
    </QueryClientProvider>
  );
}
