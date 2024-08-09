import { View, Text, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CardField, createPaymentMethod, useStripe } from '@stripe/stripe-react-native'
import CustomButton from './customButton';
import { createPaymentIntent } from '../lib/appwrite';

const PaymentScreen = () => {
    const {confirmPayment}=useStripe();
    const [cardDetails, setCardDetails]=useState(null);
    const [email,setEmail]=useState('');

    const handlePress= async ()=>{
        if(!cardDetails?.complete || !email)
        {
            Alert.alert('Please enter complete card details and valid email');
            return;
        }

        try {
            const {clientSecret}=await createPaymentIntent({email, amount: 1000});
            const {error} = await confirmPayment(clientSecret,{
               type: 'Card',
                billingDetails: {email},
            });

            if(error)
            {
                Alert.alert("Payment confirmation errror", error.message);
            }else{
                Alert.alert("Success", "Payment successful");
    }
        } catch (error) {
            Alert.alert("Payment failed", error.message);
        }
    

    }
  return (
    <View>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        style={{
          fontSize: 16,
          color: '#333',
          fontWeight: 'bold',
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          margin: 10,
          borderRadius: 5,
        }}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <CustomButton
      title="Pay now"
      handlePress={handlePress}
      />
      </View>
  )
}

export default PaymentScreen