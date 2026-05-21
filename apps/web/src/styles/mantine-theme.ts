import { createTheme, type MantineColorsTuple } from "@mantine/core";

const primary: MantineColorsTuple = [
  "#eceeff",
  "#d5d7f5",
  "#a9ace8",
  "#7a7edb",
  "#5458d0",
  "#3b3fcb",
  "#2d31ca",
  "#2125b3",
  "#1a1fa1",
  "#1f196e",
];

export const theme = createTheme({
  colors: {
    primary,
  },
  primaryColor: "primary",
});
