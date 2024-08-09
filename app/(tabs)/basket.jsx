import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteCartItems, deleteCartItemsBooking, getCartBookings, getCartClasses, getCartItems, getCurrentUser } from '../../lib/appwrite';
import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '../../components/customButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from '../../components/paymentScreen';

const Basket = () => {
  const [cartItems, setCartItems]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(()=>{
    const fetchCartItems= async ()=>{
      try {
        const currentUser= await getCurrentUser();
        const userID=currentUser.$id;
        const items=await getCartItems(userID);

        const itemsDetails= await Promise.all(items.map(async (item)=>{
          let details;
          if(item.classID){
            details= await getCartClasses(item.classID);
            return {...item, classDetails: details};
          } else if (item.bookingID){
            details= await getCartBookings(item.bookingID);
            return {...item, bookingDetails: details};
          }
          
        }));
        
        const total= itemsDetails.reduce((sum, item)=> {
          if(item.classDetails){
            return sum + Number(item.classDetails.classPrice);
          }else if(item.bookingDetails)
          {
            return sum + Number(item.bookingDetails.price);
          }
          return sum;
        },0);
        setTotalPrice(total);
        setCartItems(itemsDetails);

      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false);
      }
    }
    const intervalId = setInterval(() => {
      fetchCartItems();
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  if(isLoading){
    return <Text className="font-pregular">Loading...</Text>
  }

  const handleDelete = async(classID, bookingID)=>{
    try {
      if(classID){
        await deleteCartItems(classID);
        const updatedCartItems= cartItems.filter(item=>item.classID !== classID);
        setCartItems(updatedCartItems);
      } else if(bookingID){
        await deleteCartItemsBooking(bookingID);
        const updatedCartItems= cartItems.filter(item=>item.bookingID !== bookingID);
        setCartItems(updatedCartItems);
      } 
      

      const updatedTotalPrice = cartItems.reduce((sum, item)=>{
        if(item.classID && item.classDetails){
          return sum + Number(item.classDetails.classPrice);
        }else if(item.bookingID && item.bookingDetails){
          return sum + Number(item.bookingDetails.price);
        }
        return sum;
      },0);

      setTotalPrice(updatedTotalPrice);

    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  
  
  return (
    <StripeProvider publishableKey="pk_test_51PaGnAJwJrVYTU4BYNnp4hT56aKV1WvQjiePIvY3qQS5a0TACtePxymDPOjnTg9GjfIAbMs36nVQyiL0RM2dLXo100xmkSrKZi">
    <SafeAreaView className="h-full bg-blue-50">
      <GestureHandlerRootView>
       <Text className="font-pbold text-4xl m-auto p-2 mt-4">Your cart</Text>
      <FlatList className=" bg-blue-50 m-1"
      data={cartItems} 
      keyExtractor={(item)=>item.$id}
      renderItem={({item})=>(
        <View>
          {item.classDetails ? (
              <Card className="bg-blue-500 m-2">
              <Card.Content>
                <View className="flex-row justify-between">
                  <View>
                      <Text className="font-psemibold text-white text-lg">{item.classDetails.className}</Text>
                      <Text className="font-pregular text-white text-base">{item.classDetails.classDay}</Text>
                      <Text className="font-pregular text-white text-base">{item.classDetails.startTime} - {item.classDetails.endTime}</Text>
                      <Text className="font-pregular text-white text-base">£{item.classDetails.classPrice}</Text>
                  </View>
                  <AntDesign on name='delete' size={20} color="white" onPress={()=>handleDelete(item.classID,null)}/>
                </View>
                </Card.Content>
          </Card>
          ): (
            <Card className="bg-blue-500 mt-2">
              <Card.Content>
                <View className="flex-row justify-between">
                <View>
                    <Text className="font-psemibold text-white text-lg">{item.bookingDetails.name}</Text>
                    <Text className="font-pregular text-white text-base">{item.bookingDetails.day}</Text>
                    <Text className="font-pregular text-white text-base">{item.bookingDetails.startTime} - {item.bookingDetails.endTime}</Text>
                    <Text className="font-pregular text-white text-base">£{item.bookingDetails.price}</Text>
                </View>
                <AntDesign on name='delete' size={20} color="white" onPress={()=>handleDelete(null,item.bookingID)}/>
                </View>
              </Card.Content>
          </Card>
          )}
        </View>
      )}
      />
      <View className="flex-row justify-between">
        <Text className="font-pbold text-3xl m-4">Total:</Text>
        <Text className="font-pbold text-3xl m-4">£{totalPrice}</Text>
      </View>
      <PaymentScreen/>
      </GestureHandlerRootView>
    </SafeAreaView>
    </StripeProvider>
  )
}

export default Basket