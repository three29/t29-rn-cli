import React, { useCallback } from 'react';
import { StatusBar, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../Images';

// Components
import Button from '../../Components/button';

// Styles
import styles from './Styles/launchScreenStyle';
import { apply } from '../../Theme/osmiProvider';

const LaunchScreen = (props) => {
  const _navigateExplore = useCallback(
    () => props.navigation.navigate('WelcomeScreen'),
    [props.navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={apply('soft-secondary')} />

      <Image source={Images.appLogo} style={styles.appLogo} />
      <Text style={styles.title}>Welcome to T29 Theme</Text>
      <Text style={styles.desc}>
        This probably isn't what your app is going to look like. Unless your designer handed you
        this screen and, in that case, congrats! You're ready to ship. For everyone else, this is
        where you'll see a live preview of your fully functioning app.
      </Text>

      <Button style={styles.btnExplore} onPress={_navigateExplore}>
        <Text style={styles.btnExploreLabel}>Explore</Text>
      </Button>
    </SafeAreaView>
  );
};

export default LaunchScreen;
