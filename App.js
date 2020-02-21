import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/reducers/places';
import { init } from './helpers/db';

init()
  .then(() => console.log('Database initialized'))
  .catch(error => console.log(error));

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
