import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../constants/images';
import CustomButton from '../components/customButton'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



export default function App(){
    const {isLoading, isLoggedIn}=useGlobalContext();

    if(!isLoading && isLoggedIn)
    {
        return <Redirect href="/home"/>
    }
    return(
        <SafeAreaView className="bg-blue-50 h-full">
            <GestureHandlerRootView>
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image 
                    source={images.logo}
                    className="w-[130px] h-[200px]"
                    resizeMode='contain'
                    />
                    <Text className=" font-psemibold text-3xl shadow-white">
                    Welcome to East London Gymnastics Centre!
                    </Text>

                    <CustomButton
                        title="Continue to Sign In"
                        handlePress={()=>{router.push('./(auth)/signIn')}}
                        containerStyles= "w-full mt-7"
                    />


                    


                </View>
            </ScrollView>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}