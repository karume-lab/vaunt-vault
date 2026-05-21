import { useMantineTheme } from "@mantine/core";
import { sendEmail } from "@/lib/utils/send-email";

export const getPrimaryColorHexCode = () => {
  const theme = useMantineTheme();
  const primary = theme.colors[theme.primaryColor][6];

  return primary;
};

export const enumToDataOptions = (enumObj: Record<string, string>) => {
  return Object.values(enumObj).map((value) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
  }));
};

export { sendEmail };
