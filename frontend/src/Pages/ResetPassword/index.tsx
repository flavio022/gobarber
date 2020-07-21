import React, { useRef, useCallback, useContext } from "react";
import { FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";

import { useToast } from "../../hooks/ToastContext";
import logoImg from "../../assets/logo.svg";
import { Container, Content, Background, AnimationContainer } from "./styled";
import Button from "../../components/Button";
import Input from "../../components/Input";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/apiClient";

interface ResetPasswordFormData {
  password: string;
  confirmation_password: string;
}
const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handlerSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required("Senha obrigatória"),
          confirmation_password: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Confirmação incorreta"
          )
        });
        await schema.validate(data, {
          abortEarly: false
        });
        const token = location.search.replace("?token=", "");
        console.log(token);
        if (!token) {
          throw new Error();
        }
        await api.post("/password/reset", {
          password: data.password,
          confirmation_password: data.confirmation_password,
          token: token
        });
        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "info",
          title: "Erro ao resetar senha",
          description: "Ocorreu ao tentar resetar sua senha, tente novamente!"
        });
      }
    },
    [addToast, history, location.search]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo Gobarber" />
          <Form ref={formRef} onSubmit={handlerSubmit}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              placeholder="Nova Senha"
              type="password"
              icon={FiLock}
            />
            <Input
              name="confirmation_password"
              placeholder="Confirmação de senha"
              type="password"
              icon={FiLock}
            />
            <Button type="submit">Alterar Senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
