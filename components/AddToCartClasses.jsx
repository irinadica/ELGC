import { View, Text, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { addToCart, getCurrentUser } from '../lib/appwrite';

const AddToCart = ({classID}) => {
    const [quantity,setQty]=useState(1);

    handlePress= async ()=>{
        try {
            const currentUser= await getCurrentUser();
            const userID=currentUser.$id
            const cartItem= await addToCart(userID, classID, quantity);
            Alert.alert("Success", "Product added to cart!")

        } catch (error) {
            console.error(error);
            throw error;
        }

    }
  return (
    <TouchableOpacity 
    className={`bg-blue-100 w-[130px] h-[30px] m-auto rounded-2xl items-center p-1 ? opacity-50: ''` }
    onPress={handlePress}
    activeOpacity={0.7}>
        <Text className="font-psemibold text-base text-blue-600">Add to cart</Text>
    </TouchableOpacity>
    
  )
}

export default AddToCart