import React, { useCallback, useEffect, useState } from 'react';
import { Image, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetPokemonByNameQuery } from '../../Services/pokemon';

// Components
import Button from '../../Components/button';

// Styles
import { apply } from '../../Theme/osmiProvider';
import styles from './Styles/welcomeScreenStyle';

const WelcomeScreen = (props) => {
  const [pokemonName, setPokemonName] = useState('bulbasaur');
  // Using a query hook automatically fetches data and returns query values
  const { data, error, refetch, isLoading } = useGetPokemonByNameQuery(pokemonName);

  const _ReloadData = useCallback(() => {
    setPokemonName('pikachu');
  }, []);

  return (
    <SafeAreaView style={apply('flex justify-center items-center')}>
      <StatusBar barStyle="dark-content" backgroundColor={apply('white')} />
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>
          <Text>Loading ...</Text>
        </>
      ) : data ? (
        <>
          <Text>{data.species.name}</Text>
          <Image source={{ uri: data.sprites.front_shiny }} style={{ width: 100, height: 100 }} />
          <Text style={apply('text-lg text-black text-center')}>
            On this page we are calling the useGetPokemonNameQuery to call the RTK Query slice and
            populate the data.
          </Text>
          <Button style={styles.btnReload} onPress={_ReloadData}>
            <Text style={styles.btnReloadLabel}>Pikachu</Text>
          </Button>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default WelcomeScreen;
