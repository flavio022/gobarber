import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Platform, Alert} from 'react-native';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import api from '../../services/api';
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
  const {goBack, navigate} = useNavigation();
  const RoutesParams = route.params as RoutesParams;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);

  const [availability, setAvailability] = useState<IAvailabilityItem[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    RoutesParams.providerId,
  );
  const [providers, setProviders] = useState<IProvider[]>([]);
  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);
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
  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });
      navigate('AppointmentCreated', {date: date.getTime()});
    } catch (err) {
      Alert.alert(
        'Erro ao criar o agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);
  const morningAvailability = useMemo(() => {
    return availability
      .filter(({hour}) => hour < 12)
      .map(({hour, available}) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({hour}) => hour >= 12)
      .map(({hour, available}) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);
  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);
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
      <Content>
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
          <Title>Escolha a data</Title>
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

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent horizontal>
              {morningAvailability.map(({formattedHour, hour, available}) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={formattedHour}
                  onPress={() => handleSelectHour(hour)}>
                  <HourText selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent horizontal>
              {afternoonAvailability.map(({formattedHour, hour, available}) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={formattedHour}
                  onPress={() => handleSelectHour(hour)}>
                  <HourText selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>
        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
