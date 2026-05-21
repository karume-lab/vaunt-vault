import { Button, Container, Group, Text, Title } from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";

export default function Home() {
  return (
    <Container
      size="md"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Title order={1} size="h1" fw={900}>
        <Text
          component="span"
          inherit
          variant="gradient"
          gradient={{ from: "lime", to: "teal", deg: 45 }}
        >
          Welcome to Vaunt Vault
        </Text>
      </Title>
      <Text c="dimmed" mt="md" size="lg" maw={600}>
        Your new application is ready. Built with Next.js, Mantine, Elysia, and
        Better Auth.
      </Text>
      <Group mt={30} justify="center">
        <Button
          size="lg"
          radius="xl"
          variant="filled"
          color="lime"
          rightSection={<IconRocket size={20} />}
        >
          Get Started
        </Button>
        <Button size="lg" radius="xl" variant="default">
          Documentation
        </Button>
      </Group>
    </Container>
  );
}
