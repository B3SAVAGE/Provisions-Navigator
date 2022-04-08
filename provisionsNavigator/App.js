<<<<<<< Updated upstream
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, setState } from 'react-native';
=======
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
>>>>>>> Stashed changes
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    restoreTodosFromAsync();
  }, []);


  const pressHandler = (key) => {
<<<<<<< Updated upstream
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
=======

    console.log('Todos BEFORE delete');
    console.log(todos);

    const newTodos = todos.filter(todo => todo.key !== key);

    console.log('Todos AFTER delete');
    console.log(todos);

    setTodos(newTodos);
    storeTodosInAsync(newTodos);
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
      );
    }
>>>>>>> Stashed changes

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