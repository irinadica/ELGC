import { View, Text, Alert } from 'react-native'
import React, { useEffect } from 'react'
import StripeApp from '../stripe/stripeApp'
import { presentPaymentSheet, StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stripe = () => {
    const [ready, setReady] = useState(false);
    const {initPaymentSheet,presentPaymentSheet, loading}=usePaymentSheet();

    useEffect(()=>{
        initialisePaymentSheet();
    },[]);

    const initialisePaymentSheet = async ()=>{
        const {paymentIntent, ephemeralKey, customer}= await fetchPaymentSheetParams();

        const {error}= await initPaymentSheet({
            customerId: customer
        })
    }

    const buy= async()=>{
        const {error}=await presentPaymentSheet();

        if(error){
            Alert.alert(`Error code: ${error.code}`,error.message);
        }else {
            Alert.alert('Success', "The payment was confirmed successfully");
            setReady(false);
        }

    }
  return (
    <GestureHandlerRootView>
    <StripeProvider 
    publishableKey="pk_test_51PaGnAJwJrVYTU4BYNnp4hT56aKV1WvQjiePIvY3qQS5a0TACtePxymDPOjnTg9GjfIAbMs36nVQyiL0RM2dLXo100xmkSrKZi"
    >
        <CustomButton
        title="Pay Now"
        handlePress={buy}
        containerStyles="mb-10 "/>
    </StripeProvider>
    </GestureHandlerRootView>
  )
}

export default Stripe