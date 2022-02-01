import {forwardRef, memo} from 'react';
import styled from 'styled-components';
import {IPropsAccount} from './Account.props';

const Container = styled.div`
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--color-gray-light);
  font-size: 16px;
  line-height: 20px;
  border-radius: 5px;
`;

const Account = forwardRef<HTMLDivElement, IPropsAccount>(({login, sublogin, ...props}, ref): JSX.Element => {
  return <Container ref={ref} {...props}>{`${login}${sublogin ? ' : ' + sublogin : ''}`}</Container>;
});

export default memo(Account);
