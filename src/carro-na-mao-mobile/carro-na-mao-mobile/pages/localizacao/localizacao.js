import axios from "axios";
import { StatusBar } from 'expo-status-bar';
import { useRef, useState, useEffect } from 'react';
import { RecuperaToken } from "../../Autenticação/autenticacao";
import { Text, View, TextInput } from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import estiloLocalizacao from '../../estilos/estiloLocalizacao';


// npx expo install react-native-maps
// npx expo install expo-sharing
// npx expo install expo-file-system

let locationsOfInterest = [
  {
    title: "R. São Paulo, 323-225 - Centro - BH",
    location: {
      latitude: -19.915823,
      longitude: -43.939082
    },
    description: "Seu carro está aqui!"
  }
]

let idLocal;

export default function Localizacao() {
  const [inputValue, setInputValue] = useState(''); 
  const [showDivs, setShowDivs] = useState(false);
  const [token,setToken]=useState(null)
  const mapRef = useRef();

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker 
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      )
    });
  };

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
                idLocal = response.data.id_local;
                console.log(idLocal);
                setShowDivs(true);
            } else if(response.status != 200){
              alert("Código de Locação não encontrado.");
            }
        })
        .catch(error => {
            console.log(error);
        })
  }

  const onRegionChange = (region) => {
    console.log(region);
  };

  return (
    <View style={estiloLocalizacao.container}>
      <Text>Insira abaixo o código da sua locação</Text>
      <TextInput
        style={estiloLocalizacao.input}
        placeholder="Insira o número da sua Locação"
        onChangeText={(text) => setInputValue(text)}
        onBlur={findLocalizacao}
        value={inputValue}
      />
      {showDivs && (
        <>
        {idLocal !== 1 ? (
            <Text style={estiloLocalizacao.mapOverlay}>Local indisponível</Text>
          ) : (
        <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef} 
        style={estiloLocalizacao.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: -19.915823,
          latitudeDelta: 0.00488597828227,
          longitude: -43.939082,
          longitudeDelta: 0.0040213018655,
        }}
        customMapStyle={estiloLocalizacao.mapJson}
      >
        {showLocationsOfInterest()}
        <Text style={estiloLocalizacao.mapOverlay}>Local de Retirada</Text>
      </MapView>
      )}
      </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}