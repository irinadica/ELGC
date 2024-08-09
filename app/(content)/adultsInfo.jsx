import { View, Text, Image, ScrollView, Animated, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import images from '../../constants/images'
import ListItem from '../../components/ListItem'
import CustomButton from '../../components/customButton'
import { useNavigation } from '@react-navigation/native'
  
const AdultsInfo = () => {
  const navigation=useNavigation();
  return (
    <SafeAreaView className="bg-blue-50 h-full">
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={{flexGrow: 1, height: '100%'}}>
          <View className="flex-col w-full items-center px-2 mt-0 ">
              <Image 
              source={images.adultGym} 
              className="w-full h-[300px]"
              resizeMode='contain'
              alt='Main Gym Image'
              />
  
              <ListItem
              title="Open Session"
              details="Open sessions are for experimented individuals only. If you have no experience you will not be able to participate."
              />

              <ListItem
              title="Taught Session"
              details="Our Taught Adults Gymnastics sessions are suitable for absolute beginners all the way up to the experienced! With the beginners classes you will get a great understanding on how fundamental good basics are in starting gymnastics. Each session is taught by an experienced British gymnastics qualified coach and will take you through a warm up on basic jumps, shapes, skills and moving you on towards more exciting floor based skills."
              />

              <Text className="font-psemibold text-xl mt-4">Others</Text>

              <CustomButton
              title="Book Now"
              handlePress={()=>navigation.navigate('bookings')}
              containerStyles= "w-full mt-2"
              />
          </View>
        </ScrollView>
        </GestureHandlerRootView>
    </SafeAreaView>
    
  )
}

export default AdultsInfo