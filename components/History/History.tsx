import { useCallback, useRef } from "react";
import styled from "styled-components";
import ClearIcon from "../../public/clear.svg";
import { Button, Dropdown } from "../UI";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  background-color: var(--color-primary);
  height: 50px;
  box-sizing: border-box;
  border: 1px solid var(--color-gray-light);
`;

const ListRequests = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px 15px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

const Item = styled.li`
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const Border = styled.div`
  width: 1px;
  box-shadow: -1px 0px 20px 10px var(--color-primary);
  position: relative;
  background-color: var(--color-gray-light);
  box-sizing: border-box;
`;

const History = (): JSX.Element => {
  const refList = useRef<HTMLUListElement>(null);

  const handleClearHistory = useCallback(() => {}, []);

  const handleWheel = useCallback((event) => {
    event.preventDefault();
    refList.current?.scrollTo({
      left: refList.current.scrollLeft + event.deltaY * 4,
      behavior: "smooth",
    });
  }, []);

  return (
    <Container>
      {/* {history.length !== 0 ? (
        <>
          <ListRequests ref={refList} onWheel={handleWheel}>
            {history.map(({title, id, request, status}) => (
              <Item key={id}>
                <Dropdown key={id} id={id} title={title} request={request} status={status} />
              </Item>
            ))}
          </ListRequests>
          <Border></Border>
          <Button
            onClick={handleClearHistory}
            style={{ margin: "15px" }}
            variant="transparent"
          >
            <ClearIcon />
          </Button>
        </>
      ) : null} */}
    </Container>
  );
};

export default History;
