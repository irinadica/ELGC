import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import images from '../../constants/images'
import SoftplaySched from '../../components/softplaySched'
import ListItem from '../../components/ListItem'
import CustomButton from '../../components/customButton'
import { useNavigation } from '@react-navigation/native'

const Softplay = () => {
  const navigation=useNavigation();
  return (
   <SafeAreaView className="bg-blue-100 h-full">
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="flex-col w-full items-center px-2 mt-0 ">
        <Image source={images.softplay}  className="w-full h-[300px]" resizeMode='contain' alt='Kids Gym Image'/>
        <ListItem
        title="General Information"
        details="Take full advantage of all the Soft Play equipment, gymnastics apparatus (including trampoline!) as well as our 3 storey Jungle Gym!"
        />
        <ListItem
        title="Rules"
        details="Age limit: 0 - 5yo. Strictly under 5's only!"
        />

        <ListItem
        title="Pricing"
        details="£4.50 per child. NO FEE FOR PARENTS "
        />
        <SoftplaySched title="Softplay Schedule"/>
        <CustomButton title="Book Now" handlePress={()=>navigation.navigate('bookings')} containerStyles="mt-4"/>
      </View>
    </ScrollView>

   </SafeAreaView>
  )
}

export default Softplay