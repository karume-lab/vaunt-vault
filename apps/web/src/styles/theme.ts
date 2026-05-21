import {
  Button,
  Card,
  createTheme,
  Input,
  type MantineColorsTuple,
} from "@mantine/core";

const slate: MantineColorsTuple = [
  "#f4f5f5",
  "#dcdedd",
  "#b4b6b6",
  "#8a8d8e",
  "#6b6e70",
  "#55595b",
  "#4b4f51",
  "#42464a",
  "#3a3e41",
  "#323538",
];

const linen: MantineColorsTuple = [
  "#f8f8f7",
  "#e5e4de",
  "#cccbc3",
  "#b0afa4",
  "#98978a",
  "#868478",
  "#7a796c",
  "#68675a",
  "#5c5b4f",
  "#504f43",
];

export const theme = createTheme({
  colors: {
    slate,
    linen,
  },
  primaryColor: "slate",
  primaryShade: 7,
  fontFamily: "'Inter', 'Montserrat', sans-serif",
  headings: {
    fontFamily: "'Cinzel', 'Playfair Display', 'Georgia', serif",
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "slate",
        variant: "filled",
      },
      styles: {
        root: {
          backgroundColor: "var(--mantine-color-slate-7)",
          color: "var(--mantine-color-linen-1)",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "var(--mantine-color-slate-8)",
          },
        },
      },
    }),
    Input: Input.extend({
      styles: {
        input: {
          border: "1px solid var(--mantine-color-slate-7)",
          backgroundColor: "var(--mantine-color-linen-1)",
          color: "var(--mantine-color-slate-7)",
        },
      },
    }),
    Card: Card.extend({
      styles: {
        root: {
          backgroundColor: "var(--mantine-color-linen-1)",
          border: "1px solid var(--mantine-color-slate-7)",
        },
      },
    }),
  },
});
