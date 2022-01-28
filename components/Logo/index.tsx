import styled from "styled-components";
import LogoIcon from "../../public/logo.svg";

const CustomLogo = styled(LogoIcon)`
  width: 115px;
  height: 30px;
  color: var(--color-gray-medium);
  transition: all 0.3s;
  &:hover {
    color: var(--color-gray);
  }
`;

const Logo = (): JSX.Element => {
  return <CustomLogo />;
};

export default Logo;
