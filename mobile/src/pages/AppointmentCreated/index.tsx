import React, {useCallback, useMemo} from 'react';
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {Container, Title, Description, OkButton, OkButtonText} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';

const AppointmentCreated: React.FC = () => {
  const {reset} = useNavigation();
  const {params} = useRoute();
  const {date} = params as RouteParams;

  interface RouteParams {
    date: number;
  }
  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{name: 'Dashboard'}],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(date, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });
  }, [date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Agendamento concluído</Title>
      <Description>Terça, dia 14 de março de 2020</Description>
      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
