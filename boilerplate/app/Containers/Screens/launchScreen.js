import React, { useCallback } from 'react';
import { StatusBar, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../Images';

// Components
import Button from '../../Components/button';

// Styles
import { connect } from '../../Theme/osmiProvider';

const LaunchScreen = (props) => {
  const _navigateExplore = useCallback(() => props.navigation.navigate('WelcomeScreen'), [
    props.navigation,
  ]);

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

const styles = connect({
  container: 'flex bg-soft-secondary items-center p-5 bg-gray-800 justify-center',
  appLogo: 'w-auto h-auto mb-5',
  title: 'font-bold text-2xl text-white text-center mb-2',
  desc: 'text-base text-white text-center mb-5',
  btnExplore: 'bg-primary rounded-md py-2 px-3 items-center mt-5',
  btnExploreLabel: 'text-xl text-white font-bold text-center',
});

export default LaunchScreen;
