import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native';
import ListItem from '../../components/ListItem';
import CustomButton from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import images from '../../constants/images';
import { router } from 'expo-router/build';

const Parties = () => {
  const navigation=useNavigation();
  return (
   <SafeAreaView className="bg-blue-100 h-full">
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="flex-col w-full items-center px-2 mt-0 ">
        <Image source={images.party}  className="w-full h-[250px]" resizeMode='contain' alt='Kids Party Image'/>
        <ListItem
        title="How to make a booking"
        details="First, you must book your party booking with us, this will be 1hr 15min for 25 children for a private hire of the Small Gymnasium with full use of the soft play equipment and Jungle gym. Parents are responsible for all children attending the party."
        />
        <ListItem
        title="Rules"
        details="Party Size: The maximum party capacity of 25 children aged 1yrs to 11yrs. No Food or Drinks Allowed in the gym at this stage. "
        />

        <ListItem
        title="Pricing"
        details="1hr 15mins Soft play party (25 children) £125. ( £75 of this fee is non refundable if you cancel the booking after payment is made)"
        />

        <ListItem
        title="Catering"
        details="Food booking is separate and you need to contact Caloroso Pizza Beckton for more details, or click on the button below to redirect you to their page."
        />
        <CustomButton title="Caloroso Pizza" handlePress={()=>router.push('https://www.caloroso.co.uk/becktonkidsparties')}/>
        <CustomButton title="Book Now" handlePress={()=>navigation.navigate('bookings')} containerStyles="mt-1"/>
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default Parties