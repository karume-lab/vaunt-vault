import { Image as MantineImage } from "@mantine/core";
import Image from "next/image";
import Logo from "../../public/images/core/logo.png";

const SiteLogo = () => {
  return (
    <MantineImage
      component={Image}
      alt="VauntVault Logo"
      src={Logo}
      width={50}
      height={50}
      radius={"md"}
    />
  );
};

export default SiteLogo;
