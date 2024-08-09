import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import CustomButton from '../../components/customButton'

const OrderConfirmation = () => {
    const navigation=useNavigation();
  return (
    <SafeAreaView className="h-full bg-blue-50 justify-center">
         <View className='m-4 justify-center items-center'>
            <Text className="font-pbold text-2xl m-3">Thanks for your purchase!</Text>
            <Text className="font-pregular text-x m-4">Make sure you have your order ready on your arival. You can find it on your Profile page </Text>
            <CustomButton
            title="Back to Home"
            handlePress={()=> navigation.navigate('home')}
            />
        </View>
    </SafeAreaView>
    
  )
}

export default OrderConfirmation