import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getBookings, getClasses, getCurrentKid, getCurrentUser } from '../../lib/appwrite'
import { Button, Card } from 'react-native-paper';
import CustomButton from '../../components/customButton';
import AddToCart from '../../components/AddToCartClasses';
import AddToCartBooking from '../../components/AddToCartBooking';
import DropDownPicker from 'react-native-dropdown-picker';

const Bookings = () => {
    const [userAge, setUserAge]=useState(null);
    const[bookings,setBookings]=useState([]);
    const[loading, setLoading]=useState(true);
    const [filterBookings, setFilteredBooking]=useState([]);
    const [selectedName, setSelectedName]=useState(null);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    useEffect(()=>{
        const fetchUser= async ()=>{
            try {
                const fetchedUser = await getCurrentUser();
                if(fetchedUser && fetchedUser.age){
                    setUserAge(fetchedUser.age);
                }
            } catch (error) {
                console.log("error fetching user", error)
            }
        };

        fetchUser();
    },[])
    
    useEffect(()=>{
        const fetchBookings= async ()=>{
            try {
                const fetchedBookings = await getBookings();
                setBookings(fetchedBookings);

                const names=[...new Set(fetchedBookings.map((booking)=>booking.name))].map((name)=>({
                  label: name,
                  value: name,
                }));
                setDropdownItems(names);

                const filtered = userAge ? fetchedBookings.filter((bookingItem) => bookingItem.minAge <= userAge): fetchedBookings;
                setFilteredBooking(filtered);

            } catch (error) {
                console.log("error fetching Bookings",error);
            }finally{
                setLoading(false);
            }
        };

        fetchBookings();
    },[userAge]);

    useEffect(()=>{
      const applyFilters=()=>{
        let filtered=bookings;

        if(userAge){
          filtered= filtered.filter((bookingItem) => bookingItem.minAge<=userAge);
        }

        if(selectedName){
          filtered = filtered.filter((bookingItem) => bookingItem.name === selectedName);
        }
        setFilteredBooking(filtered)
      };
      applyFilters();
    },[selectedName,bookings,userAge])

    
    if(loading){
        <Text>Loading...</Text>
    }
    return (
        <SafeAreaView className="bg-blue-50 h-full">
            <ScrollView>
            <View>
              <DropDownPicker
              className="font-pregular"
              open={dropdownOpen}
              value={selectedName}
              items={dropdownItems}
              setOpen={setDropdownOpen}
              setValue={setSelectedName}
              setItems={setDropdownItems}
              containerStyle={{height: 40, margin: 15, width: 400}}
              style={{backgroundColor:'#60a5fa', borderColor: "#60a5fa"} }
              dropDownContainerStyle={{backgroundColor:'#60a5fa', borderColor: '#60a5fa'}}
              textStyle={{fontSize:16, color: '#fff', fontWeight:'bold'}}
              labelStyle={{fontSize:16, color: '#fff', fontWeight:'bold'}}
              dropDownDirection='BOTTOM'
              />
            {filterBookings.length>0 ? (
                filterBookings.map(bookingItem=>(
                <Card key={bookingItem.$id} className=" bg-blue-500 text-white m-2">
                <Card.Content>
                <View className="flex-col justify-between">
                        <Text className="text-white font-pbold text-xl">{bookingItem.name}</Text>
                        <Text className="text-white font-psemibold text-lg">{bookingItem.day}</Text>
                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Start Time: </Text>
                            <Text className="font-pregular text-white text-sm">{bookingItem.startTime}</Text>
                        </View>
                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">End Time: </Text>
                            <Text className="font-pregular text-white text-sm">{bookingItem.endTime}</Text>
                        </View>
                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Price: </Text>
                            <Text className="font-pregular text-white text-sm">£{bookingItem.price}</Text>
                        </View>
                    </View>
                    <AddToCartBooking bookingID={bookingItem.$id}/>
            </Card.Content>
                </Card>
                
            ))):(<Text className="font-pregular">No classses available</Text>)}
            
            
            
        </View>

            </ScrollView>
        </SafeAreaView>
      )
}
export default Bookings

