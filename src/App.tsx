import React from 'react';
import { Provider } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { store } from './store';
import { HomePage } from './pages';

const App = () => {


  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container} >
        <HomePage />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default App;
