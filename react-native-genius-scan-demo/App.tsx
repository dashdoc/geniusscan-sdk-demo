/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

// import FileViewer from 'react-native-file-viewer';
import RNGeniusScan from '@thegrizzlylabs/react-native-genius-scan';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {launchImageLibrary} from 'react-native-image-picker';

function ScanModal({navigation}: any) {
  const pickAndScanImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets && result.assets[0].uri) {
        const configuration = {
          source: 'image',
          sourceImageUrl: result.assets[0].uri,
          ocrConfiguration: {
            languages: ['en-US'],
          },
        };

        const scanResult = await RNGeniusScan.scanWithConfiguration(configuration);
        // await FileViewer.open(scanResult.multiPageDocumentUrl);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Pick and Scan Photo" onPress={pickAndScanImage} />
      <Button title="Close" onPress={() => navigation.goBack()} />
    </View>
  );
}

// Modify the App component
function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="ScanModal" component={ScanModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Add HomeScreen component
function HomeScreen({navigation}: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 20,
          }}>
          <Button
            title="Open Scanner Modal"
            onPress={() => navigation.navigate('ScanModal')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
