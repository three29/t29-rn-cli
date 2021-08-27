import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from '../Navigation/appNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// styles
import { apply } from '../Theme/osmiProvider';

const RootContainer = (props) => {
  return (
    <SafeAreaProvider style={{}}>
      <StatusBar barStyle="dark-content" backgroundColor={apply('white')} />
      <AppNavigation />
    </SafeAreaProvider>
  );
};

export default RootContainer;
