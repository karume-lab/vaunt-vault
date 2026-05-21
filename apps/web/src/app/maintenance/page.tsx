"use client";

import {
  Box,
  Center,
  Container,
  Image as MantineImage,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import NextImage from "next/image";

export default function Maintenance() {
  return (
    <Box
      bg="linen.1"
      c="slate.7"
      mih="100vh"
      pos="relative"
      style={{ overflow: "hidden" }}
    >
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Need inline style for keyframes
        dangerouslySetInnerHTML={{
          __html: `
        #bouncing-logo {
          animation: bounce-x 13s linear infinite alternate, 
                     bounce-y 7s linear infinite alternate;
        }

        @keyframes bounce-x {
          from { left: 0; }
          to { left: calc(100% - 150px); }
        }

        @keyframes bounce-y {
          from { top: 0; }
          to { top: calc(100% - 150px); }
        }
      `,
        }}
      />

      <Box pos="fixed" inset={0} style={{ pointerEvents: "none" }} zIndex={50}>
        <Center id="bouncing-logo" pos="absolute" w={150} h={150}>
          <MantineImage
            component={NextImage}
            src="/images/core/logo.png"
            alt="VauntVault Logo"
            width={150}
            height={150}
            radius="md"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid var(--mantine-color-slate-7)",
            }}
          />
        </Center>
      </Box>

      <Center mih="100vh" p="xl">
        <Container size="xs" pos="relative" zIndex={10} ta="center">
          <Stack gap="xl">
            <Title
              order={1}
              ff="'Cinzel', 'Playfair Display', 'Georgia', serif"
              fw={700}
              style={{ fontSize: "2.25rem", letterSpacing: "-0.025em" }}
            >
              Under Maintenance
            </Title>

            <Text opacity={0.7} size="lg" lh={1.625}>
              We're currently performing some scheduled maintenance to improve
              our luxury reselling experience. We'll be back shortly!
            </Text>

            <Text
              opacity={0.5}
              size="sm"
              fw={600}
              tt="uppercase"
              style={{ letterSpacing: "0.1em" }}
            >
              &copy; {new Date().getFullYear()} VauntVault.
            </Text>
          </Stack>
        </Container>
      </Center>
    </Box>
  );
}
