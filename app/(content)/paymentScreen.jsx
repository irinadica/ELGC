import { View, Text, Alert, TextInput, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardField, createPaymentMethod, useStripe } from '@stripe/stripe-react-native'
import CustomButton from '../../components/customButton';
import { createPaymentIntent, deleteCartItems, deleteCartItemsBooking, getCurrentKid, getUser, updateBooking, updateCurrentUser, updateUserPayment } from '../../lib/appwrite';
import FormField from '../../components/FormField';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
    const [form,setForm]=useState({
        cardNumber:"",
        expirationDate:"",
        cvv:"",
        billingAddress:""
    });
    const route=useRoute();
    const {totalPrice, classIDs, bookingIDs}=route.params;
    const [user,setUser]=useState([]);
    const[isSubmitting, setIsSubmitting]=useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigation=useNavigation();
    const [setTotalPrice] = useState(0);
    const [kid,setKid]=useState([]);


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
        const fetchKid=async()=>{
          try {
            const fetchedKid= await getCurrentKid();
            setKid(fetchedKid);
          } catch (error) {
            console.log('error Kid not fetched', error)
          }finally{
            setIsLoading(false);
          }
        };
        fetchKid();
      },[])
      const handlePress =async()=>{
        if(!form.cardNumber || !form.expirationDate || !form.cvv || !form.billingAddress){
          Alert.alert('Error', 'Please fill in all the fields')
        }
    
        setIsSubmitting(true);
    
        try {
              const updatedUser = await updateUserPayment(form.cardNumber,form.expirationDate,form.cvv,form.billingAddress);
                if (classIDs && classIDs.length > 0) {
                    await Promise.all(classIDs.map(id => deleteCartItems(id)));
                  }
                  if (bookingIDs && bookingIDs.length > 0) {
                    await Promise.all(bookingIDs.map(id => deleteCartItemsBooking(id)));
                  }
                 
                navigation.navigate('orderConfirmation');
          }
        catch (error) {
          Alert.alert("Error", error.message)
        }finally{
          setIsSubmitting(false);
          setIsLoading(false)
        }

       
    }
    return(
        <SafeAreaView className="bg-blue-50 h-full">
            <ScrollView>
                <View className="flex-col m-2 h-full p-2">
                    <Text className="font-pbold text-4xl m-auto">Checkout</Text>
                    <View className="flex-col justify-center h-[480px] items-center w-[400px] m-auto mt-4 p-3 rounded-2xl bg-[#72A8E832]">
                            <Text className="font-psemibold text-xl mb-2">Card Details</Text>
                            <FormField 
                            title="Card Number"
                            value={form.cardNumber}
                            handleChangeText={(e)=>setForm({...form,cardNumber:e})}
                            />
                            <FormField 
                            title="Expiration Date"
                            value={form.expirationDate}
                            handleChangeText={(e)=>setForm({...form,expirationDate:e})}
                            placeholder="MM/YY"
                            />
                            <FormField 
                            title="CVV / Security Code"
                            value={form.cvv}
                            handleChangeText={(e)=>setForm({...form,cvv:e})}
                            />
                            <FormField 
                            title="Billing Address"
                            value={form.billingAddress}
                            handleChangeText={(e)=>setForm({...form,billingAddress:e})}
                            />
                            <CustomButton 
                            title="Pay now"
                            handlePress={handlePress}
                            />
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="font-pbold text-3xl m-4">Total:</Text>
                        <Text className="font-pbold text-3xl m-4">£{totalPrice}</Text>
                    </View>
                </View>
                    
            </ScrollView>
        </SafeAreaView>
        
    )
   
   
}

export default PaymentScreen