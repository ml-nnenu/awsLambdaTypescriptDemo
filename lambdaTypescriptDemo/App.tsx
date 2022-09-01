import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Amplify, API } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { useEffect } from 'react';

Amplify.configure(awsconfig);

export default function App() {

  const getAllToDoListItem = async() => {
    const response = await API.get("api30316a82", "/toDoList/all", {});
    return response
  };

  const getToDoListItemByKey = async (pk:string, sk:string) => {
    const response = await API.get("api30316a82", "/toDoList/item", {
      queryStringParameters: {pk,sk}
    });
    return response
  };


  useEffect(() => {
   (async () => {
    // const response = await getToDoListItemByKey("michael", "2");
    const response = await getAllToDoListItem();
    console.log(response);
   })()

  },[]);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
