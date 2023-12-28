import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { PickerItem } from './src/Picker';
import { api } from './src/services/api'

export default function App() {
  const [moedas, setMoedas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get("all");

      let arrayMoedas = [];

      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        })
      })

      setMoedas(arrayMoedas);
      setLoading(false);
    }

    loadMoedas();
  }, [])


  if (loading) {
    return (
      <View style={{ backgroundColor: '#101215', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color='#fff' size="large" />
        <Text style={{ color: '#fff', fontSize: 17, marginTop: 20 }}> Carregando ...</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}> Seleciona sua moeda</Text>
          <PickerItem />
        </View>


        {/* <StatusBar style="auto" /> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    // justifyContent: 'center',
    padding: 40,
    alignItems: 'center'
  },
  areaMoeda: {
    backgroundColor: '#f9f9f9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
  }, titulo: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    padding: 2,
  }
});