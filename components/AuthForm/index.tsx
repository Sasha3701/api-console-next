import { Form, Formik } from "formik";
import styled from "styled-components";
import { CONTENT } from "../../content";
import { AuthSchema } from "../../utils/Schemes";
import { Button, Input } from "../UI";

const CustomForm = styled(Form)`
  width: 100%;
  height: 100%;
`;

export interface IUser {
  login: string;
  sublogin: string;
  password: string;
}

const initialState: IUser = {
  login: "",
  sublogin: "",
  password: "",
};

const AuthForm = (): JSX.Element => {
  return (
    <Formik
      initialValues={initialState}
      validationSchema={AuthSchema}
      onSubmit={(values: IUser, { setSubmitting }) => {}}
    >
      {() => (
        <CustomForm>
          <Input
            style={{ marginBottom: "20px" }}
            label={CONTENT.AUTH.INPUTS.LOGIN.LABEL}
            name={CONTENT.AUTH.INPUTS.LOGIN.NAME}
          />
          <Input
            style={{ marginBottom: "20px" }}
            label={CONTENT.AUTH.INPUTS.SUBLOGIN.LABEL}
            name={CONTENT.AUTH.INPUTS.SUBLOGIN.NAME}
            optional={true}
          />
          <Input
            type="password"
            style={{ marginBottom: "20px" }}
            label={CONTENT.AUTH.INPUTS.PASSWORD.LABEL}
            name={CONTENT.AUTH.INPUTS.PASSWORD.NAME}
          />
          <Button>{CONTENT.AUTH.BUTTON}</Button>
        </CustomForm>
      )}
    </Formik>
  );
};

export default AuthForm;
