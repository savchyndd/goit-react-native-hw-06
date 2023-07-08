import { Provider } from 'react-redux';
import Main from './Screens/Main';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
