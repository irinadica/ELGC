import { ScrollView, Text, View, Image, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/customButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";



export default function Menu() {
  const navigation=useNavigation();
  return (
    <GestureHandlerRootView>
    <SafeAreaView className="bg-blue-50 h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <>
        <View className="w-full items-center h-full">

          <CustomButton
          title="ADULT GYMNASTICS"
          handlePress={()=>navigation.navigate('adultsInfo')}
          containerStyles= "w-full mt-5"
          />

          <CustomButton
          title="KIDS GYMNASTICS"
          handlePress={()=>navigation.navigate('kidsInfo')}
          containerStyles= "w-full mt-5"
          />

          <CustomButton
          title="SOFTPLAY"
          handlePress={()=>navigation.navigate('softplay')}
          containerStyles= "w-full mt-5"
          />

          <CustomButton
          title="PARTIES"
          handlePress={()=>navigation.navigate('parties')}
          containerStyles= "w-full mt-5"
          />

          <CustomButton
          title="HOLIDAY CAMP"
          handlePress={()=>navigation.navigate('holidayCamp')}
          containerStyles= "w-full mt-5 "
          />

          <CustomButton
          title="BOOKINGS"
          handlePress={()=>navigation.navigate('bookings')}
          containerStyles= "w-full mt-5 "
          />

          <CustomButton
          title="CONTACT US"
          handlePress={()=>navigation.navigate('contact')}
          containerStyles= "w-full mt-5 "
          />

          
        </View>

        </>
      </ScrollView>
      <StatusBar backgroundColor="#eff6ff" style="dark"/>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}
