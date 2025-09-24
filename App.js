import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Hello from './components/HelloComponent';

class App extends Component {
  render() {
    return (
      <Hello name='PhucHG'/>
    )
  }
}

export default App;
