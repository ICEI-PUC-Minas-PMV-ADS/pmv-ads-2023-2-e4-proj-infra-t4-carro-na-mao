import axios from "axios";
import { StatusBar } from 'expo-status-bar';
import { useRef, useState, useEffect } from 'react';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { Text, View, TextInput } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import estiloLocalizacao from '../../estilos/estiloLocalizacao';
import {LOCAL1,LOCAL2,DEFAULT} from '../../enum/localizacao';


// npx expo install react-native-maps
// npx expo install expo-sharing
// npx expo install expo-file-system

export default function Localizacao() {
  const [inputValue, setInputValue] = useState(''); 
  const [localizacaoEnum, setLocalizacaoEnum] = useState(DEFAULT);
  const [showDivs, setShowDivs] = useState(false);
  const [token,setToken]=useState(null)
  const mapRef = useRef();

  useEffect(() => {
    async function fetchData() {
        try {
            const jwtToken = await RecuperaToken();
            setToken(jwtToken);
        } catch (error) {
            console.error('Erro ao recuperar token:', error);
        }
    }
    fetchData()
  },[]);

  const findLocalizacao = () => {
    const locacao = inputValue;
  
    const headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
    }
  
    axios.get(`https://api-carronamao.azurewebsites.net/find-by-locacao?id_locacao=${locacao}`, { headers })
        .then(response => {
            console.log(response.status);
            if (response.status === 200) {
                const idLocal = response.data.id_local;
                console.log(idLocal);
                const localEnum = getLocalizacao(idLocal);
                console.log("PEGANDO INFORMAÇÂO ENUM: "+ localEnum);
                setLocalizacaoEnum(localEnum);
                console.log(localizacaoEnum);

                setShowDivs(true);
            }
        })
        .catch(error => {
            console.log(error);
        })
  }
  
  const getLocalizacao = (idLocal) => {
    switch (idLocal) {
      case 1:
        return LOCAL1.lat;
      case 2:
        return LOCAL2;
      default:
        return DEFAULT;
    }
  };

  const onRegionChange = (region) => {
    console.log(region);
  };

  return (
    <View style={estiloLocalizacao.container}>
      <TextInput
        style={estiloLocalizacao.input}
        placeholder="Insira o número da sua Locação"
        onChangeText={(text) => setInputValue(text)}
        onBlur={findLocalizacao}
        value={inputValue}
      />
      {showDivs && (
        <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef} 
        style={estiloLocalizacao.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: localizacaoEnum.lat,
          latitudeDelta: 0.00488597828227,
          longitude: localizacaoEnum.lgn,
          longitudeDelta: 0.0040213018655,
        }}
        customMapStyle={estiloLocalizacao.mapJson}
      >
        {showLocationsOfInterest()}
        <Text style={estiloLocalizacao.mapOverlay}>Local de Retirada</Text>
      </MapView>
      )}
      <StatusBar style="auto" />
    </View>
  );
}