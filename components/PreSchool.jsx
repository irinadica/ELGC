import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native-paper';

export default function PreSchool ({title}) {
    const [open, setOpen] = useState(false);
    const [animation]= useState(new Animated.Value(0));

    const toggle=()=>{
        if(!open){
            Animated.timing(animation,{
                toValue: 1,
                duration:100,
                useNativeDriver:false
            }).start()
        }else{
            Animated.timing(animation,{
                toValue: 0,
                duration:100,
                useNativeDriver: false
            }).start()
        }
        setOpen(!open)
    }

    const heightAnimation=animation.interpolate({
        inputRange:[0,1],
        outputRange:[0,2000]
    })

  return (
    <View className="w-full bg-blue-500 rounded-2xl mt-4 p-3">
      <TouchableWithoutFeedback onPress={toggle}>
        <View className="w-full flex-row justify-between">
            <Text className="font-psemibold text-white text-xl">{title}</Text>
            <AntDesign name={open ? 'upcircleo' : 'downcircleo'} size={20} color="white"/>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View className="mt-4" style={{maxHeight: heightAnimation}}>
      <View className="flex-row justify-between mt-3">
                  <Text className="text-white text-base font-psemibold">Age group: </Text>
                  <Text className="text-white text-base font-pregular">3-4yo</Text>
                </View>

                <View className="flex-row justify-between mt-3">
                  <Text className="text-white text-base font-psemibold">Duration: </Text>
                  <Text className="text-white text-base font-pregular">45min</Text>
                </View>

                <View className="flex-row justify-between mt-3">
                  <View className="flex-col">
                    <Text className="text-white text-base font-psemibold">Days: </Text>
                    <Text className="text-white text-base font-pregular">Mon-Thurs</Text>
                    <Text className="text-white text-base font-pregular mt-2">Sat</Text>
                  </View>

                  <View className="flex-col">
                    <Text className="text-white text-base font-psemibold">Times: </Text>
                    <Text className="text-white text-base font-pregular">16:15 - 17:00</Text>
                    <View className="flex-col">
                      <Text className="text-white text-base font-pregular mt-2">09:00 - 09:45</Text>
                      <Text className="text-white text-base font-pregular">14:40 - 15:25</Text>
                    </View>
                  </View>
                </View>
      </Animated.View>
    </View>
  )
}
