import type { ComboboxItem } from "@mantine/core";
import type { ProfileTypes as P } from "@/lib/constants";

export type ProfileType = `${P}`;

export type ComboboxItemWithDescription = ComboboxItem & {
  description?: string;
};
