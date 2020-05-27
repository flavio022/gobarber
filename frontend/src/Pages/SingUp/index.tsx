import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/apiClient";
import { useToast } from "../../hooks/ToastContext";
import getValidationErrors from "../../utils/getValidationErrors";

import logoImg from "../../assets/logo.svg";
import { Container, Content, Background, AnimationContainer } from "./styled";
import Button from "../../components/Button";
import Input from "../../components/Input";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handlerSubmit = useCallback(
    async (data: object) => {
      console.log(data);
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "Mínimo 6 dígitos")
        });
        await schema.validate(data, {
          abortEarly: false
        });
        await api.post("/users", data);
        history.push("/");
        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: "Você já pode fazer seu login"
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "info",
          title: "Erro no cadastrato",
          description:
            "Ocorreu um erro ao fazer Cadastro,tente novamente mais tarde"
        });
      }
    },
    [addToast, history]
  );
  return (
    <>
      <Container>
        <Background />

        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="Logo Gobarber" />
            <Form ref={formRef} onSubmit={handlerSubmit}>
              <h1>Faça seu cadastro</h1>
              <Input name="name" placeholder="Nome" icon={FiUser} />

              <Input name="email" placeholder="E-mail" icon={FiMail} />
              <Input
                name="password"
                placeholder="Senha"
                type="password"
                icon={FiLock}
              />
              <Button type="submit">Cadastrar</Button>
            </Form>
            <Link to="/">
              <FiArrowLeft />
              Voltar para login
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
