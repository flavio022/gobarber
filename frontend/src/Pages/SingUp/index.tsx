import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

import logoImg from "../../assets/logo.svg";
import { Container, Content, Background } from "./styled";
import Button from "../../components/Button";
import Input from "../../components/Input";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handlerSubmit = useCallback(async (data: object) => {
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
    } catch (err) {
      console.log(err);
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <>
      <Container>
        <Background />
        <Content>
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
          <a href="login">
            <FiArrowLeft />
            Voltar para login
          </a>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
