import {useCallback, useRef} from 'react';
import styled from 'styled-components';
import {Textarea, DragButton} from '../UI';
import {IPropsConsole, IWrapperConsole} from './Console.props';
import {CONTENT} from '../../content';

const WrapperConsole = styled.div<IWrapperConsole>`
  display: grid;
  grid-template-columns: ${({widthIn}): string => `${widthIn === null ? '1fr' : widthIn + 'px'} auto 1fr`};
  padding: ${({padSide}): string => `10px ${padSide}px`};
  box-sizing: border-box;
  height: calc(100% - 50px);
`;

const WrapperDragButton = styled.div`
  justify-self: center;
  align-self: center;
`;

const Console = ({padSide = 15, minWidth = 100, handleChange}: IPropsConsole): JSX.Element => {
  const refIn = useRef<HTMLTextAreaElement>(null);
  const refOut = useRef<HTMLTextAreaElement>(null);
  const refDrag = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback(
    (e) => {
      const widthDragButton = refDrag.current?.offsetWidth! / 2;
      const posXCursor = e.pageX - widthDragButton;
      const posXInput = refIn.current?.offsetWidth!;
      const posXOutput = refOut.current?.offsetWidth!;
      const widthWindow = document.documentElement.clientWidth;
      if (
        (posXInput <= minWidth || posXOutput <= minWidth) &&
        (posXCursor <= minWidth + widthDragButton || widthWindow - posXCursor <= minWidth + widthDragButton + padSide * 2)
      ) {
        return;
      }
      const size = posXCursor - refIn.current?.offsetLeft!;
      //
    },
    [minWidth, padSide]
  );

  const handleChangeDragDown = useCallback(() => {
    document.addEventListener('mousemove', handleDrag);
  }, [handleDrag]);

  const handleChangeDragUp = useCallback(() => {
    document.removeEventListener('mousemove', handleDrag);
  }, [handleDrag]);

  return (
    <WrapperConsole padSide={padSide} widthIn={null}>
      <Textarea
        error={false}
        label={CONTENT.CONSOLE.TEXTAREA.IN.LABEL}
        name={CONTENT.CONSOLE.TEXTAREA.IN.NAME}
        ref={refIn}
        value={''}
        onChange={handleChange}
      />
      <WrapperDragButton ref={refDrag}>
        <DragButton onMouseDown={handleChangeDragDown} onMouseUp={handleChangeDragUp} />
      </WrapperDragButton>
      <Textarea
        error={false}
        label={CONTENT.CONSOLE.TEXTAREA.OUT.LABEL}
        name={CONTENT.CONSOLE.TEXTAREA.OUT.NAME}
        variant="out"
        ref={refOut}
        value={''}
      />
    </WrapperConsole>
  );
};

export default Console;
