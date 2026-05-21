"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

interface TanstackQueryClientProviderProps {
  children: ReactNode;
}

const TanstackQueryClientProvider: React.FC<
  TanstackQueryClientProviderProps
> = ({ children }) => {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default TanstackQueryClientProvider;
