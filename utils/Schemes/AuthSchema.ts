import * as yup from 'yup'
import {REGX} from '../../const';

const AuthSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required().matches(REGX.AUTH),
});

export default AuthSchema;
