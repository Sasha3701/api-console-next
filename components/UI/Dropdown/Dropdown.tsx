import styled from 'styled-components';
import {Manager, Reference, Popper} from 'react-popper';
import {useState, useRef, useCallback} from 'react';
import {IStatusRequest} from './Dropdown.props';
import {Button} from '..';
import MenuIcon from "../../../public/drag.svg";
import {CONTENT} from '../../../content';
import { IHistory } from '../../../models';

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: max-content;
  background-color: var(--color-white);
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 1px 2px var(--color-shadow);
  &:hover {
    box-shadow: 0px 1px 4px var(--color-shadow-1);
  }
`;

const StatusRequest = styled.span<IStatusRequest>`
  display: inline-block;
  height: 10px;
  width: 10px;
  box-sizing: border-box;
  background-color: ${({statusRequest}): string => (statusRequest ? 'var(--color-green)' : 'var(--color-error)')};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-right: 5px;
`;

const CustomButtonWithImg = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 5px 5px 5px 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const CustomButton = styled(Button)`
  padding: 5px 10px 5px 0px;
  & svg {
    fill: var(--color-gray);
  }
  &:hover {
    & svg {
      stroke: none;
      fill: var(--color-gray-2);
    }
  }
  &:focus {
    outline: none;
    & svg {
      stroke: none;
    }
  }
`;

const ListAction = styled.ul`
  list-style: none;
  background-color: var(--color-white);
  box-shadow: 0px 1px 4px var(--color-shadow-1);
  border-radius: 3px;
  margin: 0px 0px 0px 0px;
  padding: 5px 0;
`;

const ItemList = styled.li`
  &:last-child {
    border-top: 1px solid var(--color-gray);
    margin-top: 5px;
  }
  &:hover {
    color: var(--color-white);
    background-color: var(--color-blue-1);
    &:last-child {
      background-color: var(--color-error);
    }
  }
`;

const ListButton = styled.button`
  display: inline-block;
  margin: 0;
  padding: 10px 0px 10px 15px;
  border: none;
  width: 133px;
  text-align: left;
  font-size: 16px;
  background-color: inherit;
  color: inherit;
  cursor: pointer;
`;

const AlertCopy = styled.div`
  padding: 0px 5px;
  position: absolute;
  top: 5px;
  left: 27px;
  z-index: 1000;
  background-color: var(--color-gray-4);
`;

const Dropdown = (props: IHistory): JSX.Element => {
  const [dropdownOpen, setDropdownToggle] = useState(false);
  const dropdownListRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const setButtonRef = useCallback((node, ref) => {
    dropdownButtonRef.current = node;
    return ref(node);
  }, []);

  const setListRef = useCallback((node, ref) => {
    dropdownListRef.current = node;
    return ref(node);
  }, []);

  const handleShowCopyAlert = useCallback(() => {
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 2000);
  }, []);

  const dropdownToggle = useCallback(() => {
    setDropdownToggle((prevState) => !prevState);
  }, []);

  const handleClickHistory = useCallback(() => {
  }, []);

  const handleDelete = useCallback(() => {
    dropdownToggle();
  }, []);

  const handleExecute = useCallback(() => {
    dropdownToggle();
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(props.request);
    handleShowCopyAlert();
    dropdownToggle();
  }, [dropdownToggle, handleShowCopyAlert, props.request]);

  const modifiers: any = {
    preventOverflow: {
      padding: 0,
    },
    shift: {
      enabled: true,
    },
    flip: {
      enabled: true,
      flipVariationsByContent: true,
      behavior: 'flip',
    },
    fn: () => {},
  };

  const handleClickOut = useCallback(() => {
    setDropdownToggle(false);
  }, []);

  return (
    <Manager>
      <div onMouseLeave={handleClickOut}>
        <Reference>
          {({ref}) => (
            <Container>
              {isCopy ? <AlertCopy>{CONTENT.CONSOLE.DROPDOWN.ALERT}</AlertCopy> : null}
              <CustomButtonWithImg onClick={handleClickHistory} ref={(node) => setButtonRef(node, ref)}>
                <StatusRequest statusRequest={props.status} />
                {props.title}
              </CustomButtonWithImg>
              <CustomButton theme="transparent" onClick={dropdownToggle} ref={(node) => setButtonRef(node, ref)}>
                <MenuIcon />
              </CustomButton>
            </Container>
          )}
        </Reference>
        {dropdownOpen && (
          <Popper placement="bottom-end" modifiers={modifiers}>
            {({ref, style, placement, arrowProps}) => (
              <ListAction ref={(node) => setListRef(node, ref)} style={style} data-placement={placement}>
                <ItemList>
                  <ListButton onClick={handleExecute}>{CONTENT.CONSOLE.DROPDOWN.ACTIONS.EXECUTE}</ListButton>
                </ItemList>
                <ItemList>
                  <ListButton onClick={handleCopy}>{CONTENT.CONSOLE.DROPDOWN.ACTIONS.COPY}</ListButton>
                </ItemList>
                <ItemList>
                  <ListButton onClick={handleDelete}>{CONTENT.CONSOLE.DROPDOWN.ACTIONS.DELETE}</ListButton>
                </ItemList>
              </ListAction>
            )}
          </Popper>
        )}
      </div>
    </Manager>
  );
};

export default Dropdown;
