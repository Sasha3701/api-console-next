import { Form, Formik } from "formik";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CONTENT } from "../../content";
import { IUser } from "../../models";
import { inject, Observer, observer } from "mobx-react";
import { AuthSchema } from "../../utils/Schemes";
import { Button, Input } from "../UI";
import UserStore from "../../store/userStore";
import Loader from "../Loader";

const CustomForm = styled(Form)`
  width: 100%;
  height: 100%;
`;

const initialState: IUser = {
  login: "",
  sublogin: "",
  passwd: "",
};

type Props = {
  userStore?: UserStore;
};

const AuthForm = inject("userStore")(
  observer((props: Props): JSX.Element => {
    const userStore = props.userStore!;

    return (
      <>
      <div>{userStore.user.login}</div>
      <Formik
        initialValues={initialState}
        validationSchema={AuthSchema}
        onSubmit={(values: IUser) => {
          userStore.signInRequest(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          errors,
          touched,
          isValid,
        }) => (
          <Observer>
            {() => (
              <CustomForm>
                <Input
                  style={{ marginBottom: "20px" }}
                  label={CONTENT.AUTH.INPUTS.LOGIN.LABEL}
                  name={CONTENT.AUTH.INPUTS.LOGIN.NAME}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.login && !!errors.login}
                />
                <Input
                  style={{ marginBottom: "20px" }}
                  label={CONTENT.AUTH.INPUTS.SUBLOGIN.LABEL}
                  name={CONTENT.AUTH.INPUTS.SUBLOGIN.NAME}
                  optional={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.sublogin && !!errors.sublogin}
                />
                <Input
                  type="password"
                  style={{ marginBottom: "20px" }}
                  label={CONTENT.AUTH.INPUTS.PASSWORD.LABEL}
                  name={CONTENT.AUTH.INPUTS.PASSWORD.NAME}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.passwd && !!errors.passwd}
                />
                <Button
                  type="submit"
                  loading={userStore.loading}
                  disabled={!isValid}
                >
                  {CONTENT.AUTH.BUTTON}
                </Button>
              </CustomForm>
            )}
          </Observer>
        )}
      </Formik>
      </>
    );
  })
);

export default AuthForm;
