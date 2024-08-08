import { View, Text, ScrollView, Image, Button, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createUser } from '../../lib/appwrite';

export default function SignUp () {
  
  const[form, setForm]=useState({
    username:'',
    email:'',
    password:''
  });
  const[isSubmitting, setIsSubmitting]=useState(false);
  
  const submit =async()=>{
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);
    try {
      const result= await createUser(form.email, form.password,form.username);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally{
      setIsSubmitting(false);
    }
    createUser();
  }

  return (
    <SafeAreaView className="bg-blue-50 h-full">
      <GestureHandlerRootView>
      <ScrollView>
        <View class="flex-col m-auto w-full justify-center items-center min-h-[85vh] px-4 gap-[20px] ">
            <Image 
            source={images.logo} 
            resizeMode='contain' 
            className="w-[100px] h-[100px]"/>
            <Text className="font-pbold text-3xl m-auto">Create an account </Text>

          <View className="flex-col justify-center h-[510px] items-center w-[400px] m-auto mt-4 p-5 rounded-2xl bg-[#72A8E832]">
            <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e)=> setForm({...form,username:e})}
            otherStyles=""
            
            />
            <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e)=> setForm({...form,email:e})}
            otherStyles=""
            keyboardType="email-address"
            />

            <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e)=> setForm({...form,password:e})}
            otherStyles=""
            />

            <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-3"
            isLoading={isSubmitting}
            />

            <View className="h-10 flex-row mt-1">
                <Text className="font-pmedium text-lg text-gray-600">Already have an account?</Text>
                <Link href='/signIn' className='text-lg text-blue-600 font-pmedium'> Sign In</Link>
            </View>
            </View>

            
            
            
        </View>
      </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

