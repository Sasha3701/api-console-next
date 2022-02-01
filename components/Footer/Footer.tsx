import styled from "styled-components";
import SortIcon from "../../public/format.svg";
import { Button } from "../UI";
import { useCallback, useContext } from "react";
import { CONTENT } from "../../content";
import { observer } from "mobx-react";
import { ConsoleStoreContext } from "../../store/consoleStore";

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

const Footer = observer((): JSX.Element => {

  const consoleStore = useContext(ConsoleStoreContext)

  const handleSend = useCallback(() => {}, []);

  const handleFormat = useCallback(() => {}, []);

  return (
    <CustomFooter>
      <Button onClick={handleSend} disabled={consoleStore?.errorRequest}>
        {CONTENT.FOOTER.BUTTON.SEND}
      </Button>
      <Button onClick={handleFormat} variant="transparent" loading={consoleStore?.loadingConsole}>
        <CustomSvg />
        {CONTENT.FOOTER.BUTTON.FORMAT}
      </Button>
    </CustomFooter>
  );
});

export default Footer;
