import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/actions/places';

const PlacesList = props => {
  const places = useSelector(state => state.places.places);
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(placesActions.loadPlaces());
  }, [dispacth]);

  return (
    <FlatList
      data={places}
      renderItem={itemData => (
        <PlaceItem
          title={itemData.item.title}
          onSelect={() =>
            props.navigation.navigate('PlaceDetails', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            })
          }
          image={itemData.item.imageUri}
          address={itemData.item.address}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

PlacesList.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Add Place'
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => navData.navigation.navigate('NewPlace')}
        />
      </HeaderButtons>
    )
  };
};

export default PlacesList;
