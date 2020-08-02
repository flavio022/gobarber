import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {View, Button} from 'react-native';
import {userAuth} from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTittle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderMeta,
  ProviderInfo,
  ProviderMetaText,
  ProviderName,
} from './styles';
import api from '../../services/api';

export interface IProvider {
  id: string;
  name: string;
  avatar_url: string;
}
const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState([]);
  const {singOut, user} = userAuth();
  const {navigate} = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);
  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', {providerId});
    },
    [navigate],
  );
  return (
    <Container>
      <Header>
        <HeaderTittle>
          Bem vindo,{'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTittle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{
              uri:
                'https://media-exp1.licdn.com/dms/image/C4D03AQHZm7vwH49Jxg/profile-displayphoto-shrink_100_100/0?e=1601510400&v=beta&t=dycyOog8YNaGDFwWpSZGK9-gowig42THLzyd6CmIQ1Q',
            }}
          />
        </ProfileButton>
        {console.log(user.avatar_url)}
      </Header>
      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={<ProvidersListTitle>Barbeiros</ProvidersListTitle>}
        renderItem={({item: provider}) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}>
            <ProviderAvatar
              source={{
                uri:
                  'https://media-exp1.licdn.com/dms/image/C4D03AQHZm7vwH49Jxg/profile-displayphoto-shrink_100_100/0?e=1601510400&v=beta&t=dycyOog8YNaGDFwWpSZGK9-gowig42THLzyd6CmIQ1Q',
              }}
            />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8hrs às 18 hrs</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
