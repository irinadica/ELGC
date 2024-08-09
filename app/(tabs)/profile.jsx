import { View, Text, SafeAreaView, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import {  getCurrentUser, getCurrentKid, getCurrentUserBooking, getBookingDetails, getCurrentKidClass, getClassDetails } from '../../lib/appwrite'
import {Card} from 'react-native-paper';


const Profile = () => {
  const [user,setUser]=useState([]);
  const [kid,setKid]=useState([]);
  const [isLoading, setIsLoading]=useState(true)
  const[bookingDetails,setBookingDetails]=useState([]);
  const[classDetails,setClassDetails]=useState([]);

  useEffect(()=>{
  const fetchData=async()=>{
    try {
      const[fetchedUser, fetchedKid]= await Promise.all([
        getCurrentUser(),
        getCurrentKid()
      ])
      setUser(fetchedUser);
      setKid(fetchedKid);

      const bookingIDs= await getCurrentUserBooking();
      const detailsBooking= await getBookingDetails(bookingIDs);
      setBookingDetails(detailsBooking);

      const classIDs= await getCurrentKidClass();
      const detailsClasses= await getClassDetails(classIDs);
      setClassDetails(detailsClasses);

    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  };
  fetchData();
  },[]);
  
  return (
    <SafeAreaView className="h-full bg-blue-50">
      <ScrollView>
          <View>
            {user && (
                <Card className=" bg-blue-500 text-white m-2">
                <Card.Content>
                <Text className="font-psemibold text-lg text-white">Personal Details</Text>
                <View>
                      <View className="flex-row">
                          <Text className="font-psemibold text-white text-sm">Name: </Text>
                          <Text className="font-pregular text-white text-sm">{user.firstName} {user.lastName}</Text>
                      </View>

                      <View className="flex-row">
                          <Text className="font-psemibold text-white text-sm">Username: </Text>
                          <Text className="font-pregular text-white text-sm">{user.username}</Text>
                      </View>
                      
                      <View className="flex-row">
                          <Text className="font-psemibold text-white text-sm">Email: </Text>
                          <Text className="font-pregular text-white text-sm">{user.email}</Text>
                      </View>

                      <View className="flex-row">
                          <Text className="font-psemibold text-white text-sm">Phone number: </Text>
                          <Text className="font-pregular text-white text-sm">{user.phone}</Text>
                      </View>
                </View>
                </Card.Content>
                </Card>
            )}
            
            {kid &&(
                <Card className=" bg-blue-500 text-white m-2">
                <Card.Content>
                <Text className="font-psemibold text-lg text-white">Kids</Text>
                <View>
                     <View className="flex-row">
                          <Text className="font-psemibold text-white text-sm">Name: </Text>
                          <Text className="font-pregular text-white text-sm">{kid.firstName} {kid.lastName}</Text>
                      </View>

                      <View className="flex-row">
                          <Text className="font-psemibold text-white text-sm">Date of birth: </Text>
                          <Text className="font-pregular text-white text-sm">{kid.dob}</Text>
                      </View>
                      
                      <View className="flex-row">
                          <Text className="font-psemibold text-white text-sm">Age: </Text>
                          <Text className="font-pregular text-white text-sm">{kid.age}</Text>
                      </View>

                    </View>
                    </Card.Content>
                  </Card>
            )}

            {bookingDetails.length>0 ?(
              bookingDetails.map((booking)=>(
                  <Card className=" bg-blue-500 text-white m-2">
                  <Card.Content>
                  <Text className="font-psemibold text-lg text-white">Bookings</Text>
                  <View>
                       <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Name: </Text>
                            <Text className="font-pregular text-white text-sm">{booking.name}</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Day: </Text>
                            <Text className="font-pregular text-white text-sm">{booking.day}</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Start time: </Text>
                            <Text className="font-pregular text-white text-sm">{booking.startTime}</Text>
                        </View>
                        
                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">End Time: </Text>
                            <Text className="font-pregular text-white text-sm">{booking.endTime}</Text>
                        </View>

                        
                  </View>
                  </Card.Content>
              </Card>
    
              ))
            ):(
            
            <Card className=" bg-blue-500 text-white m-2">
              <Card.Content>
              <Text className="text-base text-white font-pregular">No bookings found</Text>
              </Card.Content>
            </Card>
            )}

            {classDetails.length>0 ?(
              classDetails.map((classes)=>(
                  <Card className=" bg-blue-500 text-white m-2">
                  <Card.Content>
                  <Text className="font-psemibold text-lg text-white">Kids Gymnastics Classes</Text>
                  <View>
                       <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Name: </Text>
                            <Text className="font-pregular text-white text-sm">{classes.className}</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Day: </Text>
                            <Text className="font-pregular text-white text-sm">{classes.classDay}</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Start time: </Text>
                            <Text className="font-pregular text-white text-sm">{classes.startTime}</Text>
                        </View>
                        
                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">End Time: </Text>
                            <Text className="font-pregular text-white text-sm">{classes.endTime}</Text>
                        </View>

                        
                  </View>
                  </Card.Content>
              </Card>
    
              ))
            ):(
            
            <Card className=" bg-blue-500 text-white m-2">
              <Card.Content>
              <Text className="text-base text-white font-pregular">No classes found</Text>
              </Card.Content>
            </Card>
            )}
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile