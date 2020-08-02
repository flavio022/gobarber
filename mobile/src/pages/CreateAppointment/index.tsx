import React, {useCallback, useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  TitleCalendar,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';
import {userAuth} from '../../hooks/auth';
import api from '../../services/api';
import {response} from 'express';
interface RoutesParams {
  providerId: string;
}
export interface IProvider {
  id: string;
  name: string;
  avatar_url: string;
}
interface IAvailabilityItem {
  hour: number;
  available: boolean;
}
const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const {goBack} = useNavigation();
  const RoutesParams = route.params as RoutesParams;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<IAvailabilityItem[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    RoutesParams.providerId,
  );
  const [providers, setProviders] = useState<IProvider[]>([]);
  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  });
  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);
  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);
  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);
  const hadleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );
  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Barbeiros</HeaderTitle>

        <UserAvatar
          source={{
            uri:
              'https://media-exp1.licdn.com/dms/image/C4D03AQHZm7vwH49Jxg/profile-displayphoto-shrink_100_100/0?e=1601510400&v=beta&t=dycyOog8YNaGDFwWpSZGK9-gowig42THLzyd6CmIQ1Q',
          }}
        />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({item: provider}) => (
            <ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}>
              <ProviderAvatar
                source={{
                  uri:
                    'https://media-exp1.licdn.com/dms/image/C4D03AQHZm7vwH49Jxg/profile-displayphoto-shrink_100_100/0?e=1601510400&v=beta&t=dycyOog8YNaGDFwWpSZGK9-gowig42THLzyd6CmIQ1Q',
                }}
              />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
      <Calendar>
        <TitleCalendar>Escolha a data</TitleCalendar>
        <OpenDatePickerButton onPress={hadleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra Data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            is24Hour
            display="calendar"
            onChange={handleDateChanged}
            textColor="#f4ede8"
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
