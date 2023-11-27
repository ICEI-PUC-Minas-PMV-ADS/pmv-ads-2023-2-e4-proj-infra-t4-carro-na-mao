import {StyleSheet } from "react-native";


export default StyleSheet.create
({

    container: {
      color: 'green',
      textAlign: 'center',
      flex: 10,
      padding: 20,
      backgroundColor: '#121212',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      color: 'red',
      height: 40,
      borderColor: '#ffff',
      borderWidth: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#ffff', // Cor de destaque
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: 'blue', // Cor do texto do botão
      fontSize: 30,
      textAlign: 'center',
    },
    resultContainer: {
      marginTop: 20,
    },
    resultText: {  color: '#ffff',
    height: 40,
    borderColor: '#ffff',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
      
  });