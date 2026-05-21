"use client";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type React from "react";
import TanstackQueryClientProvider from "@/components/Providers/TanstackQueryClientProvider";
import { theme } from "@/styles/mantine-theme";

interface ProvidersProps
  extends Readonly<{
    children: React.ReactNode;
  }> {}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <MantineProvider theme={theme}>
      <NuqsAdapter>
        <ModalsProvider>
          <Notifications />
          <TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
        </ModalsProvider>
      </NuqsAdapter>
    </MantineProvider>
  );
};

export default Providers;
