import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Amplify, API } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { useEffect, useState } from 'react';

Amplify.configure(awsconfig);

export default function App() {

  const [toDoList, setToDoList] = useState<any[]>([]);
  const [newToDoListItem, setNewToDoListItem] = useState({
    "pk": "michael",
    "sk": "",
    "activity": ""
  });

  const getAllToDoListItem = async () => {
    const response = await API.get("api30316a82", "/toDoList/getAllItem", {});
    return response
  };

  const getToDoListItemByKey = async (pk: string, sk: string) => {
    const response = await API.get("api30316a82", "/toDoList/getItem", {
      queryStringParameters: { pk, sk }
    });
    return response
  };

  const addToDoListItem = async (params: {
    "pk": string;
    "sk": string;
    "activity": string;
  }) => {
    const response = await API.post("api30316a82", '/toDoList/addItem', {
      body: {
        ...params,
        "isFinished": false,
        "createdAt": "2022-9-1",
        "updatedAt": "2022-9-1",
      }
    });
    return response
  };

  const deleteToDoListItem = async (params: {
    "pk": string;
    "sk": string;
  }) => {
    const response = await API.del("api30316a82", '/toDoList/deleteItem', {
      body: {
        ...params
      }
    });
    return response
  };

  useEffect(() => {
    (async () => {
      const response = await getAllToDoListItem();
      if (response.data) {
        setToDoList(response.data);
      }
    })();

  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      {
        toDoList.length > 0 && toDoList.map((value, idx) => (
          <TouchableOpacity
            style={{ padding: 10, flexDirection: "row" }}
            key={`${value} ${idx}}`}
            onPress={() => {
              Alert.alert("Do you want to delete this item", "", [
                {
                  text: "ok",
                  onPress: () => {
                    (async () => {
                      const response = await deleteToDoListItem({
                        "pk": value.pk,
                        "sk": value.sk,
                      });
                      if(response){
                        const fetchedToDoListItems = await getAllToDoListItem();
                        if (fetchedToDoListItems.data) {
                          setToDoList(fetchedToDoListItems.data);
                        }
                      }
                    })()
                  }
                },
                {
                  text: "cancel",
                  onPress: () => console.log("cancel")
                }
              ])
            }}
          >
            <Text>
              {value.pk}
            </Text>
            <Text>
              {value.sk}
            </Text>
            <Text>
              {value.activity}
            </Text>
          </TouchableOpacity>
        ))
      }

      {
        Object.keys(newToDoListItem).map((key, idx) => {
          return (
            <TextInput
              style={{ marginVertical: 10, borderWidth: 2 }}
              //@ts-ignore
              value={newToDoListItem[key]}
              placeholder={key}
              key={`${key} ${idx}`}
              onChangeText={(text) => setNewToDoListItem({ ...newToDoListItem, [key]: text })}
            />
          )
        })
      }
      <TouchableOpacity
        style={{ marginVertical: 10, borderWidth: 2 }}
        onPress={() => {
          (async () => {
            const response = await addToDoListItem(newToDoListItem);
            if(response){
              const fetchedToDoListItems = await getAllToDoListItem();
              if (fetchedToDoListItems.data) {
                setToDoList(fetchedToDoListItems.data);
              }
            }
          })();
        }}
      >
        <Text>
          Submit
        </Text>
      </TouchableOpacity>
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
