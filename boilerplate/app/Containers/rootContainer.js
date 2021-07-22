import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from '../Navigation/appNavigation';

// styles
import {apply} from '../Theme/osmiProvider';

const RootContainer = props => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={apply('white')} />
      <AppNavigation />
    </>
  );
};

export default RootContainer;
