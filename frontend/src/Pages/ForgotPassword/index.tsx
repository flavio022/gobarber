import React, { useRef, useCallback, useState } from "react";
import { FiLogIn, FiMail } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import api from "../../services/apiClient";
import { useToast } from "../../hooks/ToastContext";
import logoImg from "../../assets/logo.svg";
import { Container, Content, Background, AnimationContainer } from "./styled";
import Button from "../../components/Button";
import Input from "../../components/Input";
import getValidationErrors from "../../utils/getValidationErrors";

interface ForgotPasswordFormData {
  email: string;
}
const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handlerSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido")
        });
        await schema.validate(data, {
          abortEarly: false
        });

        //Recuperação de senha

        await api.post("/password/forgot", {
          email: data.email
        });

        addToast({
          type: "success",
          title: "Email de recuperação enviado",
          description:
            "Enviamos um e-mail, para confirmar a recuperação de senha!"
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "info",
          title: "Erro na recuperação de senha",
          description:
            "Ocorreu um erro ao tentar fazer a recuperação de senha,tente novamente!"
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo Gobarber" />
          <Form ref={formRef} onSubmit={handlerSubmit}>
            <h1>Recuperar Senha</h1>
            <Input name="email" placeholder="E-mail" icon={FiMail} />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
