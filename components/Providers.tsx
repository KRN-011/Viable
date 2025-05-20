"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { ThemeProvider } from "@/lib/theme/ThemeContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProvider>
  );
}
