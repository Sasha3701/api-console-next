import { inject, observer } from "mobx-react";
import { forwardRef, memo } from "react";
import styled from "styled-components";
import { CONTENT } from "../../content";
import ErrorSmile from "../../public/error-smile.svg";
import { IPropsNotification } from "./Notification.props";

const Container = styled.div`
  width: 100%;
  padding: 10px 10px 10px 42px;
  border-radius: 5px;
  background-color: var(--color-red-light);
  position: relative;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--color-red);
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
`;

const Description = styled.p`
  margin: 0;
  color: var(--color-red);
  font-size: 12px;
  line-height: 20px;
  opacity: 0.5;
`;

const Smile = styled(ErrorSmile)`
  position: absolute;
  top: 13px;
  left: 10px;
`;

const Notification = inject("store")(
  observer(
    forwardRef<HTMLDivElement, IPropsNotification>(
      ({ store, ...props }, ref): JSX.Element => {
        const userStore = store!.userStore!;
        if (!userStore.errorMessage) {
          return <></>;
        }
        return (
          <Container ref={ref} {...props}>
            <Smile />
            <Title>{CONTENT.NOTIFICATION.TITLE}</Title>
            <Description>{userStore.errorMessage}</Description>
          </Container>
        );
      }
    )
  )
);

export default memo(Notification);
