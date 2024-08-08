import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getClasses, getCurrentKid } from '../../lib/appwrite'
import { Button, Card } from 'react-native-paper';
import CustomButton from '../../components/customButton';
import AddToCart from '../../components/AddToCartClasses';

const Classes = () => {
    const [kidAge, setKidAge]=useState(null);
    const[classes,setClasses]=useState([]);
    const[loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchKid= async ()=>{
            try {
                const fetchedKid = await getCurrentKid();
                if(fetchedKid && fetchedKid.length>0){
                    setKidAge(fetchedKid[0].age);
                }
            } catch (error) {
                console.log("error fetching kid", error)
            }
        };

        fetchKid();
    },[])
    
    useEffect(()=>{
        const fetchClasses= async ()=>{
            try {
                const fetchedClasses = await getClasses();
                setClasses(fetchedClasses);
            } catch (error) {
                console.log("error fetching classes",error);
            }finally{
                setLoading(false);
            }
        };

        fetchClasses();
    },[])

    const filteredClasses = kidAge ? classes.filter(classItem => classItem.minAge <= kidAge && classItem.maxAge >=kidAge): classes
    
    if(loading){
        <Text>Loading...</Text>
    }
    return (
        <SafeAreaView className="bg-blue-50 h-full">
            <ScrollView>
            <View>
            {filteredClasses.length>0 ? (
                filteredClasses.map(classItem=>(
                <Card key={classItem.$id} className=" bg-blue-500 text-white m-2">
                <Card.Content>
                <View className="flex-col justify-between">
                    <Text className="text-white font-pbold text-lg">{classItem.classDay}</Text>
                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Start Time: </Text>
                            <Text className="font-pregular text-white text-sm">{classItem.startTime}</Text>
                        </View>
                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">End Time: </Text>
                            <Text className="font-pregular text-white text-sm">{classItem.endTime}</Text>
                        </View>
                        <View className="flex-row">
                            <Text className="font-psemibold text-white text-sm">Price: </Text>
                            <Text className="font-pregular text-white text-sm">£{classItem.classPrice}</Text>
                        </View>
                    </View>
                    <AddToCart classID={classItem.$id}/>
            </Card.Content>
                </Card>
                
            ))):(<Text className="font-pregular">No classses available</Text>)}
            
            
            
        </View>

            </ScrollView>
        </SafeAreaView>
      )
}
export default Classes

