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
    title: "Av. Afonso Pena, 1.000 - Centro - BH",
    location: {
      latitude: -19.922255,
      longitude: -43.936804
    },
    description: "Seu carro está aqui!"
  }

  
]

let idLocal;

export default function Localizacao({route, navigation}) {
 
  const [showDivs, setShowDivs] = useState(false);
  const [token,setToken]=useState(null)
  const mapRef = useRef();
  const initialLocation = locationsOfInterest.length > 0 ? locationsOfInterest[0].location : null;

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
            console.log(jwtToken);
            findLocalizacao(route.params);
        } catch (error) {
            console.error('Erro ao recuperar token:', error);
        }
    }
    fetchData()
  },[]);

  const findLocalizacao = (locacao) => {
  
    const headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
    }
    console.log(locacao)
    axios.get(`https://api-carronamao.azurewebsites.net/find-by-locacao?id_locacao=${locacao}`, { headers })
        .then(response => {
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
      {showDivs && (
        <>
        {idLocal !== 1 ? (
            <Text style={estiloLocalizacao.mapOverlay}>Local indisponível</Text>
          ) : (
            <><Text style ={estiloLocalizacao.textoMapa}>Local de Retirada do veículo</Text>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                style={estiloLocalizacao.map}
                onRegionChange={onRegionChange}
                initialRegion={{
                  latitude: -19.922255,
                  latitudeDelta: 0.00488597828227,
                  longitude: -43.936804,
                  longitudeDelta: 0.0040213018655,
                }}
                customMapStyle={estiloLocalizacao.mapJson}
              >
                {showLocationsOfInterest()}
                <Text style={estiloLocalizacao.mapOverlay}>Local de Retirada</Text>
              </MapView></>
      )}
      </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}