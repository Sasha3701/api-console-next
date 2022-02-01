import { useCallback, useContext, useRef } from "react";
import styled from "styled-components";
import { Textarea, DragButton } from "../UI";
import { IPropsConsole, IWrapperConsole } from "./Console.props";
import { CONTENT } from "../../content";
import { observer } from "mobx-react";
import { ConsoleStoreContext } from "../../store/consoleStore";

const WrapperConsole = styled.div<IWrapperConsole>`
  display: grid;
  grid-template-columns: ${({ widthIn }): string =>
    `${widthIn === null ? "1fr" : widthIn + "px"} auto 1fr`};
  padding: ${({ padSide }): string => `10px ${padSide}px`};
  box-sizing: border-box;
  height: calc(100% - 50px);
`;

const WrapperDragButton = styled.div`
  justify-self: center;
  align-self: center;
`;

const Console = observer(
  ({
    padSide = 15,
    minWidth = 100,
  }: IPropsConsole): JSX.Element => {
    const refIn = useRef<HTMLTextAreaElement>(null);
    const refOut = useRef<HTMLTextAreaElement>(null);
    const refDrag = useRef<HTMLDivElement>(null);

    const consoleStore = useContext(ConsoleStoreContext)

    const handleChange = useCallback((e) => {
      consoleStore?.changeConsole(e.target.value)
    }, [consoleStore])

    const handleDrag = useCallback(
      (e) => {
        const widthDragButton = refDrag.current?.offsetWidth! / 2;
        const posXCursor = e.pageX - widthDragButton;
        const posXInput = refIn.current?.offsetWidth!;
        const posXOutput = refOut.current?.offsetWidth!;
        const widthWindow = document.documentElement.clientWidth;
        if (
          (posXInput <= minWidth || posXOutput <= minWidth) &&
          (posXCursor <= minWidth + widthDragButton ||
            widthWindow - posXCursor <=
              minWidth + widthDragButton + padSide * 2)
        ) {
          return;
        }
        const size = posXCursor - refIn.current?.offsetLeft!;
        consoleStore?.changeSize(size)
      },
      [consoleStore, minWidth, padSide]
    );

    const handleChangeDragDown = useCallback(() => {
      document.addEventListener("mousemove", handleDrag);
    }, [handleDrag]);

    const handleChangeDragUp = useCallback(() => {
      document.removeEventListener("mousemove", handleDrag);
    }, [handleDrag]);

    return (
      <WrapperConsole padSide={padSide} widthIn={consoleStore?.console.widthIn!}>
        <Textarea
          error={consoleStore?.errorRequest}
          label={CONTENT.CONSOLE.TEXTAREA.IN.LABEL}
          name={CONTENT.CONSOLE.TEXTAREA.IN.NAME}
          ref={refIn}
          value={consoleStore?.value}
          onChange={handleChange}
        />
        <WrapperDragButton ref={refDrag}>
          <DragButton
            onMouseDown={handleChangeDragDown}
            onMouseUp={handleChangeDragUp}
          />
        </WrapperDragButton>
        <Textarea
          error={consoleStore?.errorResponse}
          label={CONTENT.CONSOLE.TEXTAREA.OUT.LABEL}
          name={CONTENT.CONSOLE.TEXTAREA.OUT.NAME}
          variant="out"
          ref={refOut}
          value={consoleStore?.valueResponse}
        />
      </WrapperConsole>
    );
  }
);

export default Console;
