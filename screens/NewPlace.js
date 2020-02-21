import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../constants/colors';
import * as placesActions from '../store/actions/places';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlace = props => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitle(text);
  };

  const imageTakenHandler = imagePath => {
    setImage(imagePath);
  };

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);
  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title, image, selectedLocation));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title='Save Place'
          color={colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlace.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 25,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlace;
