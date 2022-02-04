import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoryListItem from './components/CategoryListItem';

export default function App() {
  return (
    <View style={styles.container}>
      <CategoryListItem title='Icon' urlImg="../assets/icon.png"/>
      <CategoryListItem title='favicon' urlImg="../assets/favicon.png"/>
      <CategoryListItem title='splash' urlImg="../assets/splash.png"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
