import styled, {keyframes} from 'styled-components';

const animSpinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display:  block;
  width: 24px;
  height: 24px;

  &::after {
    content: ' ';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--text-colot-white);
    border-color: var(--text-colot-white) transparent var(--text-colot-white) transparent;
    animation: ${animSpinner} 1.2s linear infinite;
  }
`;

const Loader = (): JSX.Element => {
  return <Spinner></Spinner>;
};

export default Loader;
