import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/customButton'
import { addKidToUser, createKid, getCurrentUser, getUser, updateCurrentUser, updateKid } from '../../lib/appwrite'
import { router, useNavigation } from 'expo-router/build'


const KidsEnrol_Info = () => {
  
  const [form, setForm]=useState({
    firstName:"",
    lastName:"",
    age:"",
    dob:"",
  });

  const[isSubmitting, setIsSubmitting]=useState(false);
  const navigation=useNavigation();
  const [user,setUser]=useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  
  const submit =async()=>{
    if(!form.firstName || !form.lastName || !form.age || !form.dob){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
          const createdKid = await createKid(form.firstName,form.lastName,form.age,form.dob);
          const addKid = await addKidToUser(createdKid.$id);
           navigation.navigate('classes');
      }
    catch (error) {
      Alert.alert("Error", error.message)
    }finally{
      setIsSubmitting(false);
    }

  }

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
        return userItem.kidAccount!==undefined && userItem.kidAccount!==null;
      });
      if(hasAtt)
      {
        navigation.navigate('classes');
      }
    }
  },[isLoading, user, navigation])
   
  
  
  return (
    <SafeAreaView className="bg-blue-50 h-full">
      <GestureHandlerRootView contentContainerStyle={{flexGrow: 1, height: '100%'}}>
        <ScrollView>
          <View class="flex-col m-auto w-full justify-center items-center min-h-[85vh] px-4 gap-[20px] ">
            <Image 
            source={images.logo} 
            resizeMode='contain' 
            className="w-[100px] h-[100px]"/>

            <Text className="font-pbold text-3xl m-auto">Enrol your child </Text>

            <View className="flex-col justify-center h-[510px] items-center w-[400px] m-auto mt-4 p-3 rounded-2xl bg-[#72A8E832]">
              <Text className="font-pregular text-sm mb-2">Please offer us some information about your child.</Text>
              
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
              title="Date of birth"
              value={form.dob}
              placeholder="dd/mm/yyyy"
              handleChangeText={(e)=>setForm({...form,dob:e})}
              />

              <CustomButton
              title="Submit"
              handlePress={submit}
              isLoading={isSubmitting}
              />


            </View>


          </View>
          
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default KidsEnrol_Info