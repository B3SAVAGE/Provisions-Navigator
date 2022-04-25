
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Axios is used for async shenanigans and url calls
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

const Stack = createNativeStackNavigator();

// in milliseconds, is how often google maps is checked.
const Timer = 12000;// currently 2 minutes.

//the api key, change if another is used. Probrably should have some sort of encryption method?
const API_KEY = "";


// Main code
function App() {
  const [todos, setTodos] = useState([]);

  // this automatically calls the google map api every Timer milliseconds.
  useEffect(()=>{
    const interval = setInterval(()=>{
        console.log('Pretend this is a google maps api call');
        //searchLocation(); // KEEP THIS COMMENTED UNLESS YOU WANT TO RACK UP A BIG BILL ACCEDENTALY
    },Timer);
    return () => clearInterval(interval);
  },[]);

  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- All the screens --- //
// by Noah

// Temporarily added a function to check if searchLocation is being called rather then having it auto call in the background for debug purposes.
function HomeScreen({ navigation }) {
  return (
    <View>
      <Text style = {styles.header} >The Nag</Text>
      <Button
        title="Open List"
        onPress={() => navigation.navigate('List')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="getCurrentLocation"
        onPress={searchLocation}
      />
    </View>
  );
}

function ListScreen({ navigation }) {
  // --- ASYNC STORAGE --- ///
  // By Ben
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    restoreTodosFromAsync();
  }, []);


  const pressHandler = (key) => {

    console.log('Todos BEFORE delete');
    console.log(todos);

    const newTodos = todos.filter(todo => todo.key !== key);

    console.log('Todos AFTER delete');
    

    setTodos(newTodos);
    storeTodosInAsync(newTodos);
    console.log(newTodos);
  };
  
  const asyncStorageKey = '@todos';

  const storeTodosInAsync = newTodos => {
    const stringifiedTodos = JSON.stringify(newTodos);

    AsyncStorage.setItem(asyncStorageKey, stringifiedTodos).catch(err => {
      console.warn('Error storing todos in Async');
      console.warn(err);
    });
  };

  const restoreTodosFromAsync = () => {
    AsyncStorage.getItem(asyncStorageKey)
      .then(stringifiedTodos => {
        console.log('Restored Todos:');
        console.log(stringifiedTodos);

        const parsedTodos = JSON.parse(stringifiedTodos);

        if (!parsedTodos || typeof parsedTodos !== 'object') return;

        setTodos(parsedTodos);
      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
  };

  const submitHandler = (text) =>{
    if (text.length === 0) return;
    
    const key = Math.random().toString();

    console.log('Todos BEFORE submit');
    console.log(todos);

    const newTodos = [{ text, key }, ...todos];

    setTodos(newTodos);
    storeTodosInAsync(newTodos);

    console.log('Todos AFTER submit');
    console.log(newTodos);


  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Header />
            <View style={styles.content}>
              <AddTodo submitHandler={submitHandler} />
              <View style={styles.todoList}>
                <FlatList
                  data={todos}
                  renderItem={({ item }) => <TodoItem item={item} pressHandler={pressHandler} />}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
    </View>
  );
}

function Settings({ navigation }) {
  return (
    <View>
      <Text>Settings</Text>
      <Text> More to Come! </Text>
    </View>
  );
}


// --- Geolocation Code --- //
// by Jo

  //Stores latitude and longitude for reference
  let currLat = 0;
  let currLong=0;
  
  //radius in meters for the search, max radius is 50000.
  let radius="40000";
    
  // list of all sources : https://developers.google.com/maps/documentation/places/web-service/supported_types
  // tells the function searchLocation what the searchtype is
  let searchType="supermarket";
    
  // list of responses after the search function is called.
  let searchResponse=[]; 

//Called to get the information!
// I couldn't get props passed into work so I'll use a jank variable storage work around!
// searchType, setSearchType() sets what you are searching for
// radius, setRadius sets the radius in meters, from 0-15,000
// searchResponse is all the nearby areas
async function getNearbyPlaces(){
    /*
    let tempLat = currLat;
    let tempLong = currLong;
    */
    let currLocation= await getLocation();
    let searchTemp = await searchLocation();
    return searchTemp;
    }

async function getLocation(){
  let tempUrl='https://www.googleapis.com/geolocation/v1/geolocate?key='+API_KEY;
  axios
    .request({
      method: 'post',
      url:tempUrl,
    })
    .then((response) => {
      //console.log(response.data.location);
      currLat=response.data.location.lat;
      currLong=response.data.location.lng;
      return response.data.location;
    })
    .catch((e) => {
      console.log(e.response);
    });
};

async function searchLocation(){
  let tempUrl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+currLat+","+currLong+"&radius="+radius+"&type="+searchType+"&key="+API_KEY;
  console.log(tempUrl);
  axios
    .request({
      method: 'post',
      url:tempUrl
    })
    .then((response) => {
      console.log(response.data);
      searchResponse=response.data;
      return response.data.result;
    })
    .catch((e) => {
      console.log(e.response);
    });
};
// --- end Geolocation Code --- //

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
  },
  list: {
    marginTop: 20,
  },
  header: {
    marginTop: 16,
    paddingVertical: 8,
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
});


export default App;
