import { View, Text, Image, ScrollView, Animated, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import images from '../../constants/images'
import ListItem from '../../components/ListItem'
import CustomButton from '../../components/customButton'
import { useNavigation } from '@react-navigation/native'
import PreSchool from '../../components/PreSchool'
import Reck from '../../components/Reck'
import { getCurrentUser } from '../../lib/appwrite'


const KidsInfo = () => {
  const navigation=useNavigation();

  return (
    <SafeAreaView className="bg-blue-100 h-full">
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View className="flex-col w-full items-center px-2 mt-0 ">
              <Image 
              source={images.kidsGym} 
              className="w-full h-[300px]"
              resizeMode='contain'
              alt='Kids Gym Image'
              />
              <CustomButton
              title="Enrol now"
              handlePress={()=>navigation.navigate('kidsEnrol')}
              containerStyles="w-full mt-6"
              />
              
              
              <CustomButton
              title="Clases"
              handlePress={()=>navigation.navigate('classes')}
              containerStyles="w-full mt-2"
              />
              <ListItem
              title="General Information"
              details="Fees are £145 per each term. All the costs are prorated based on your start."
              />
              <Reck title="General Gymnastics"/>
              <PreSchool title="Pre School Gymnastics"/>
              <ListItem
              title="2hrs Advanced Gymnastics"
              details="Our 2 hour general gymnastics program is selected from our general  program and gymnasts are selected by our coaching team. Please contact us for further information."
              />
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default KidsInfo