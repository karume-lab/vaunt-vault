import { Box, Center, Container, Stack, Text, Title } from "@mantine/core";
import BouncingLogo from "@/components/BouncingLogo";

export default function Maintenance() {
  return (
    <Box
      bg="linen.1"
      c="slate.7"
      mih="100vh"
      pos="relative"
      style={{ overflow: "hidden" }}
    >
      {/* Physics-driven bouncing logo */}
      <BouncingLogo />

      <Center mih="100vh" p="xl">
        <Container size="xs" pos="relative" style={{ zIndex: 10 }} ta="center">
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
              our experience. We'll be back shortly!
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
