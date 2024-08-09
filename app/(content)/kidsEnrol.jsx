import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/customButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getCurrentUser, getUser, updateCurrentUser } from '../../lib/appwrite'
import { router, useNavigation } from 'expo-router/build'


const KidsEnrol = () => {

  const [form, setForm]=useState({
    firstName:"",
    lastName:"",
    age:Number,
    address:"",
    phone:"",
  });
  const[isSubmitting, setIsSubmitting]=useState(false);
  const navigation=useNavigation();
  const [user,setUser]=useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const fetchedUser= await getUser();
        setUser(fetchedUser);
      } catch (error) {
        console.log('error user not fetched', error)
      }finally{
        setIsLoading(false);
      }
    };
    fetchUser();
  },[])

  useEffect(()=>{
    if(!isLoading && user)
    {
      const hasAtt=user.some(userItem=>{
        return userItem.firstName !==undefined && userItem.firstName!==null;
      });
      if(hasAtt)
      {
        navigation.navigate('kidsEnrol_kidInfo');
      }
    }
  },[isLoading, user, navigation])
  
  
  const next =async()=>{
    if(!form.firstName || !form.lastName || !form.address || !form.phone || !form.age){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
          const updateUser = await updateCurrentUser(form.firstName,form.lastName,form.age,form.phone,form.address);

          navigation.navigate('kidsEnrol_kidInfo');
      }
    catch (error) {
      Alert.alert("Error", error.message)
    }finally{
      setIsSubmitting(false);
    }
   
  
  }
  return (
    <SafeAreaView className="bg-blue-50 h-full">
      <GestureHandlerRootView contentContainerStyle={{flexGrow: 1, height: '100%'}}>
        <ScrollView>
          <View class="flex-col m-auto w-full justify-center items-center min-h-[85vh] px-4 gap-[20px] ">
            <Image 
            source={images.logo} 
            resizeMode='contain' 
            className="w-[100px] h-[100px]"/>

            <Text className="font-pbold text-3xl m-auto">Parent details </Text>

            <View className="flex-col justify-center h-[510px] items-center w-[400px] m-auto mt-4 p-3 rounded-2xl bg-[#72A8E832]">
              <Text className="font-pregular text-sm mb-2">Please offer us some information about yourself.</Text>
              
              <FormField
              title="First Name"
              value={form.firstName}
              handleChangeText={(e)=>setForm({...form,firstName:e})}
              />

              <FormField
              title="Last Name"
              value={form.lastName}
              handleChangeText={(e)=>setForm({...form,lastName:e})}
              />

              <FormField
              title="Age"
              value={form.age}
              handleChangeText={(e)=>setForm({...form,age:e})}
              />

              <FormField
              title="Home Address"
              value={form.address}
              handleChangeText={(e)=>setForm({...form,address:e})}
              />

              <FormField
              title="Phone Number"
              value={form.phone}
              handleChangeText={(e)=>setForm({...form,phone:e})}
              />

              <CustomButton
              title="Next"
              handlePress={next}
              isLoading={isSubmitting}
              />


            </View>


          </View>
          
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default KidsEnrol