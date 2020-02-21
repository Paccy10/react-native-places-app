import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import colors from '../constants/colors';

const Map = props => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readOnly = props.navigation.getParam('readOnly');

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 2.2421
  };

  const onSelectLocationHandler = event => {
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocation });
  }, [savePickedLocation]);

  let markerCoordinate;
  if (selectedLocation) {
    markerCoordinate = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={onSelectLocationHandler}
    >
      {markerCoordinate && (
        <Marker title='Picked Location' coordinate={markerCoordinate}></Marker>
      )}
    </MapView>
  );
};

Map.navigationOptions = navData => {
  const saveLocation = navData.navigation.getParam('saveLocation');
  const readOnly = navData.navigation.getParam('readOnly');
  if (readOnly) {
    return {};
  }
  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveLocation}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? '#fff' : colors.primary
  }
});

export default Map;
