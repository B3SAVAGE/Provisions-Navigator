import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
export default function AddItem() {
return (
<View>
<Text>Enter task to add to list</Text>
<TextInput
style={{
borderBottomColor: 'black',
backgroundColor: '#f4f4f4',
margin: 4,
}}
></TextInput>
<Button title="Submit"></Button>
</View>
);
}