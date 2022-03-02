import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AddItem from './components/AddItem';
import ListItems from './components/ListItems';
import { StyleSheet, Text, View } from 'react-native';
export default function App() {
return (
<View style={styles.container}>
<Text>Todo List</Text>
<AddItem></AddItem>
<ListItems></ListItems>
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
