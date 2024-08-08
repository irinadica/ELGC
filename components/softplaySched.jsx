import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Button, Card } from 'react-native-paper';

export default function SoftplaySched ({title}) {
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
            <View className="flex-row justify-between">
              <View>
                <Text className="text-white text-sm font-psemibold">Days: </Text>
                <Text className="text-white text-sm font-pregular">Monday - Friday</Text>
                <Text className="text-white text-sm font-pregular">Sunday</Text>
              </View>

              <View>
                <Text className="text-white text-sm font-psemibold">Times: </Text>
                <Text className="text-white text-sm font-pregular">13:30 - 15:00</Text>
                <Text className="text-white text-sm font-pregular">09:30 - 11:00</Text>
              </View>
            </View>
      </Animated.View>
    </View>
  )
}
