import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import PlacesList from '../screens/PlacesList';
import PlaceDetails from '../screens/PlaceDetails';
import NewPlace from '../screens/NewPlace';
import Map from '../screens/Map';
import colors from '../constants/colors';

const PlacesNavigator = createStackNavigator(
  {
    PlacesList,
    PlaceDetails,
    NewPlace,
    Map
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? '#fff' : colors.primary
    }
  }
);

export default createAppContainer(PlacesNavigator);
