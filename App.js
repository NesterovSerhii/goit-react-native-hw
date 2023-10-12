import { StatusBar } from 'expo-status-bar';
import { useFonts } from "expo-font";
import { StyleSheet, View } from 'react-native';
import RegistrationScreen from './src/Screens/RegistrationScreen.jsx'
import LoginScreen from './src/Screens/LoginScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
 return (
    <View style={styles.container}>
      <StatusBar style="auto" />
     <RegistrationScreen />
     {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
