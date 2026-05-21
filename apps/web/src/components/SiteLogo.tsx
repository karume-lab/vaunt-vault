import { Image as MantineImage } from "@mantine/core";
import Image from "next/image";

const SiteLogo = () => {
  return (
    <MantineImage
      component={Image}
      alt="VauntVault Logo"
      src="/images/core/logo.webp"
      width={50}
      height={50}
      radius={"md"}
    />
  );
};

export default SiteLogo;
