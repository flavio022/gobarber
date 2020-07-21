import 'react-native-gesture-handler';
import React from 'react';
import AppProvider from './hooks';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <AppProvider>
      <View style={{flex: 1, backgroundColor: '#312e38'}}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;