import { Box, Text } from "@mantine/core";

export default function BuiltByFooter() {
  return (
    <Box
      pos="fixed"
      bottom={0}
      left={0}
      right={0}
      py="sm"
      ta="center"
      style={{ zIndex: 10 }}
    >
      <Text opacity={0.4} size="xs">
        Built by{" "}
        <Text
          component="a"
          href="https://karume.vercel.app"
          target="_blank"
          size="xs"
          style={{ textDecoration: "underline", color: "inherit" }}
        >
          karume-lab ↗
        </Text>
      </Text>
    </Box>
  );
}
