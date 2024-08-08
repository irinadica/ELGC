import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
   
        <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    style={styles.button}
    className={`${containerStyles} ${isLoading} ? 'opacity-50' : ''`}
    disabled={isLoading}>
        <Text
        className={`${textStyles}`}
        style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
    
    
  )
}
export default CustomButton

const styles=StyleSheet.create(
    {
        button:{
            backgroundColor: '#3b82f6',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 300,
            padding: 2,
            borderRadius: 20,
            margin: 10,
            marginLeft:'auto',
            marginRight:'auto'
        },

        buttonText:{
            fontFamily: `psemibold`,
            fontSize: 20,
            color: '#fff',
            fontWeight: '700',
        }
    }
) 