import React, { useCallback, useRef, ChangeEvent } from "react";
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/apiClient";
import { useToast } from "../../hooks/ToastContext";
import getValidationErrors from "../../utils/getValidationErrors";

import { Container, Content, AvatarInput } from "./styled";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { UserAuth } from "../../hooks/AuthContext";

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirmation_password: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = UserAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handlerSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: val => !!val.length,
            then: Yup.string().required("Senha é obrigatória"),
            otherwise: Yup.string()
          }),
          confirmation_password: Yup.string()
            .when("old_password", {
              is: val => !!val.length,
              then: Yup.string().required("Confimação de senha é obrigatória"),
              otherwise: Yup.string()
            })
            .oneOf(
              [Yup.ref("password"), null],
              "Senha e confirmação precisam ser iguais."
            )
        });
        await schema.validate(data, {
          abortEarly: false
        });

        const {
          name,
          email,
          old_password,
          password,
          confirmation_password
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                confirmation_password
              }
            : {})
        };

        const response = await api.put("/profile", formData);

        updateUser(response.data);
        history.push("/dashboard");
        addToast({
          type: "success",
          title: "Perfil atualizado!",
          description:
            "Suas informações do perfil foram atualizadas com sucesso"
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro no atualizacao do perfil",
          description:
            "Ocorreu um erro ao tentar atualizar seu perfil, tente novamente mais tarde."
        });
      }
    },
    [addToast, history]
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append("avatar", e.target.files[0]);
        api.patch("/users/avatar", data).then(response => {
          updateUser(response.data);
          addToast({
            type: "success",
            title: "Avatar Atualizado!"
          });
        });
      }
    },
    [addToast, updateUser]
  );
  return (
    <>
      <Container>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
        </header>
        <Content>
          <Form
            ref={formRef}
            onSubmit={handlerSubmit}
            initialData={{ name: user.name, email: user.email }}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>
            <h1>Meu Perfil</h1>

            <Input name="name" placeholder="Nome" icon={FiUser} />

            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              containerStyle={{ marginTop: 20 }}
              name="old_password"
              placeholder="Senha Atual"
              type="password"
              icon={FiLock}
            />
            <Input
              name="password"
              placeholder="Nova Senha"
              type="password"
              icon={FiLock}
            />
            <Input
              name="confirmation_password"
              placeholder="Confirmação de Senha"
              type="password"
              icon={FiLock}
            />
            <Button type="submit">Confirmar Alterações</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
