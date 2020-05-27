import React, { useRef, useCallback, useContext } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { UserAuth } from "../../hooks/AuthContext";
import { useToast } from "../../hooks/ToastContext";
import logoImg from "../../assets/logo.svg";
import { Container, Content, Background, AnimationContainer } from "./styled";
import Button from "../../components/Button";
import Input from "../../components/Input";
import getValidationErrors from "../../utils/getValidationErrors";

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { singIn } = UserAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handlerSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().required("Senha obrigatória")
        });
        await schema.validate(data, {
          abortEarly: false
        });

        await singIn({
          email: data.email,
          password: data.password
        });
        history.push("/dashboard");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "info",
          title: "Erro na autenticaçao",
          description: "Ocorreu um erro ao fazer login"
        });
      }
    },
    [singIn, addToast, history]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo Gobarber" />
          <Form ref={formRef} onSubmit={handlerSubmit}>
            <h1>Faça seu login</h1>
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              placeholder="Senha"
              type="password"
              icon={FiLock}
            />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
