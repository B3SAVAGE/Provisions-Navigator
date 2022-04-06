import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, setState } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Tea', key: '1' },
    { text: 'Tomatos', key: '2' },
    { text: 'Socks', key: '3' }
  ]);

  const pressHandler = (key) => {
    setTodos(prevTodos => {
      removeData(key)
      return prevTodos.filter(todo => todo.key != key);
      
      GenerateRand();
    });
  };

  const removeData = async(text) => {
    try{
      AsyncStorage.removeItem(newText)
      console.log(text + 'has been removed')
    }catch(err){
      console.log(err)

    }
  }
  

  const GenerateRand=()=>{
    var min = Math.ceil(100);
    var max = Math.floor(3)
    var RandomNum = Math.floor(Math.random() * (max - min) + min);
    return RandomNum;
  }

  const writeData = async (newText) => {
    try {
        AsyncStorage.setItem('todos', JSON.stringify(newText))
    } catch (err) {
        console.log(err)
    }
  };



  const submitHandler = async (text) =>{
    setTodos((prevTodos) =>{
     var keything = GenerateRand().toString()
      if(text.length > 0){
          let newText = {
            name: text,
            key: keything,
          };
          
           writeData(newText)
           console.log(newText)
  
      return [
        {text: text, key:GenerateRand().toString()},
        ...prevTodos]
    }
  })};

  // const printKeys = async()=>{
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     const result = await AsyncStorage.multiGet(keys);
  
  //     return result.map(req => JSON.parse(req)).forEach(console.log);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  
  

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (<TodoItem item={item} pressHandler={pressHandler} />)}

          />
        </View>
      </View>
    </View>
  );
}

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
});