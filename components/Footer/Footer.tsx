import styled from "styled-components";
import SortIcon from "../../public/format.svg";
import { Button } from "../UI";
import { useCallback } from "react";
import { IPropsFooter } from "./Footer.props";
import { CONTENT } from "../../content";

const CustomFooter = styled.footer`
  padding: 15px;
  border-top: 1px solid var(--color-gray-light);
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-content: center;
`;

const CustomSvg = styled(SortIcon)`
  margin-right: 8px;
`;

const Footer = ({ error }: IPropsFooter): JSX.Element => {
  const handleSend = useCallback(() => {}, []);

  const handleFormat = useCallback(() => {}, []);

  return (
    <CustomFooter>
      <Button onClick={handleSend} disabled={error}>
        {CONTENT.FOOTER.BUTTON.SEND}
      </Button>
      <Button onClick={handleFormat} variant="transparent">
        <CustomSvg />
        {CONTENT.FOOTER.BUTTON.FORMAT}
      </Button>
    </CustomFooter>
  );
};

export default Footer;
