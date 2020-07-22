import React from "react";
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar
} from "./styles";
import { FiPower } from "react-icons/fi";

import logoIMg from "../../assets/logo.svg";
import { UserAuth } from "../../hooks/AuthContext";
const Dashboard: React.FC = () => {
  const { singOut, user } = UserAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoIMg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={singOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule></Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
