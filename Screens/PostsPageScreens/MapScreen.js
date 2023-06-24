import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const [location, setLocation] = useState({});

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent('home')?.setOptions({
        tabBarStyle: { display: 'none' },
        headerShown: false,
      });
    }

    if (route.params) setLocation(route.params.postLocation);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // ...location,

          latitude: 48.383022,
          longitude: 31.1828699,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
      >
        {location && <Marker title="It`s here" coordinate={location} />}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
