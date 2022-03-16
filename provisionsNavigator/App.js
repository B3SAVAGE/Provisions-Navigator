import React, { useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components";


export default function App() {
 const [data, setData] = useState([]);
 return (
      <ComponentContainer>
        <View>
          <StatusBar barStyle="light-content" 
             backgroundColor="midnightblue" />
        </View>

        <View>
          <FlatList
            data={data}
           renderItem={({ item }) => (
              console.log(item)
            )}
          />

        </View>
      </ComponentContainer>
    );
}

const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/*
import React, { useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components";
import AddInput from "./Components/AddInput";
import TodoList from "./Components/TodoList";
import Header from "./Components/Header";
import Empty from "./Components/Empty";

export default function App() {
 const [data, setData] = useState([]);
 const submitHandler = (value) => {
  setData((prevTodo) => {
    return [
      {
        value: value,
        key: Math.random().toString(),
      },
      ...prevTodo,
    ];
  });
};
const deleteItem = (key) => {
  setData((prevTodo) => {
    return prevTodo.filter((todo) => todo.key != key);
  });
};

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" 
          backgroundColor="midnightblue" />
      </View>

      <View>
      
      <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            ListEmptyComponent={() => <Empty />}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem} />
            )}
          />
        <View>
          <AddInput submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
*/