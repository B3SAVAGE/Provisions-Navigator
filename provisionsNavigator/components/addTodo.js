import React, {useState} from 'react'
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default function AddTodo({submitHandler}){
    const [text,setText]= useState('');

    const changeHandler=(val) => {
        setText(val);
    }

    return(
        <View style={styles.contaner}>
            <TextInput 
                style={styles.input}
                placeholder="New Item"
                onChangeText={(val)=>changeHandler(val)}
            />
            <Button onPress={() => submitHandler(text)} title='Add Item' color='grey' style={styles.button}/>
        </View>
    );
}

const styles = StyleSheet.create({
    contaner:{
        padding:10,

    },
    input:{
        marginBottom:10,
        paddingHorizontal:8,
        paddingVertical:6,
        borderWidth:2,
        borderColor:'#ddd',
    },
    button:{
        padding:10,
        fontSize: 20,
        fontWeight: 'bold',
    }
})