import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.areaMoeda}>
        <Text style={styles.Titulo}> Seleciona sua moeda</Text>
      </View>
      <Text style={{ color: '#fff' }}> Testando</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    justifyContent: 'center',
    padding: 40,
    alignItems: 'center'
  },
  areaMoeda:{
    backgroundColor: '#f9f9f9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding:10,
  },Titulo:{
    color: '#000',
    textAlign: 'center'
  }
});