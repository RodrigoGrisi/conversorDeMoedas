import { useState, useEffect } from 'react';
import {
  StyleSheet, Text,
  View, ActivityIndicator,
  TextInput, TouchableOpacity,
  Keyboard
} from 'react-native';
import { PickerItem } from './src/Picker';
import { api } from './src/services/api'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [moedas, setMoedas] = useState([])
  const [moedaSelecionada, setMoedaSelecionada] = useState(null)

  const [moedaInput, setMoedaInput] = useState("")
  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConverido, setValorConvertido] = useState(0);

  async function converter() {
    if (moedaInput === 0 || moedaInput === "" || moedaSelecionada === null) {
      return
    }

    const response = await api.get(`/all/${moedaSelecionada}-BRL`)

    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaInput))
    setValorConvertido(
resultado.toLocaleString('pt-br', {
        style:
          "currency", currency: "BRL"
      }))
    setValorMoeda(moedaInput)
    Keyboard.dismiss();
  }

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
      setMoedaSelecionada(arrayMoedas[0].key)
    }
    loadMoedas();
  }, [])

  if (loading) {
    return (
      <View style={{ backgroundColor: '#101215', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color='#fff' size="50" />
        <Text style={{ color: '#fff', fontSize: 17, marginTop: 20 }}> Carregando ...</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}> Seleciona sua moeda</Text>
          <PickerItem
            moedas={moedas}
            moedaSelecionada={moedaSelecionada}
            onValueChange={(moeda) => setMoedaSelecionada(moeda)}
          />
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}>
            Digite um valor para converter em (R$)</Text>
          <TextInput
            value={moedaInput}
            keyboardType='numeric'
            onChangeText={(value) => setMoedaInput(value)}
            placeholder="EX: 1.50" style={styles.inputMoeda} />

        </View>

        <TouchableOpacity style={styles.calBtn} onPress={converter}>
          <Text style={styles.textoBtn}>Calcular</Text>
        </TouchableOpacity>


        {valorConverido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>{valorMoeda} {moedaSelecionada}</Text>
            <Text style={{ fontSize: 18, margin: 4 }}>Coressponde a</Text>
            <Text style={styles.valorConvertido}>{valorConverido}</Text>
          </View>
        )}

      </View>
    );
  }
};

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
    marginBottom: 2,
  },
  titulo: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    padding: 2,
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  inputMoeda: {
    fontSize: 18,
    color: '#000',
    padding: 8,
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    height: 42,
    backgroundColor: '#fff',
    elevation: 3
  },
  calBtn: {
    backgroundColor: '#fb4b57',
    padding: 8,
    width: '90%',
    height: 45,
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  textoBtn: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  areaResultado: {
    padding: 24,
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  valorConvertido: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold'
  }
});