import { View, Text, ScrollView, Image, Button, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import * as AppleAuthentication from 'expo-apple-authentication';
import FormField from '../../components/FormField';
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { signIn } from '../../lib/appwrite';

export default function SignIn () {
  const[form, setForm]=useState({
    email:'',
    password:'',
  });
  const[isSubmitting, setIsSubmitting]=useState(false);
  
  const submit = async()=>{
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally{
      setIsSubmitting(false);
    }
    
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
            <Text className="font-pbold text-3xl m-auto">Log in into your account </Text>

          <View className="flex-col justify-center h-[510px] items-center w-[400px] m-auto mt-4 p-5 rounded-2xl bg-[#72A8E832]">
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
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-3"
            isLoading={isSubmitting}
            />

            <View className="h-10 flex-row mt-1">
                <Text className="font-pmedium text-lg text-gray-600">Don't have an account?</Text>
                <Link href='/signUp' className='text-lg text-blue-600 font-pmedium'> Sign Up</Link>
            </View>
            <View className="flex-col justify-center items-center">
              <Text className="font-psemibold text-xl justify-center">OR</Text>
              <View className="font-pregular m-auto">
              <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
              cornerRadius={10}
              className="w-[350px] h-[50px] mt-5"
              onPress={async()=>{
                try{
                  const credential= await AppleAuthentication.signInAsync({
                    requestedScopes:[
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ]
                  });
                  //signed in
                } catch (e) {
                  if (e.code === 'ERR_REQUEST_CANCELED'){
                    console.error("Request canceled");
                  }
                }
              }}
              />
              </View>
            </View>
            </View>

            
            
            
        </View>
      </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

