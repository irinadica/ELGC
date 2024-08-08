import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import PreSchool from './PreSchool';

export default function ListItem ({title, details}) {
    const [open, setOpen] = useState(false);
    const [animation]= useState(new Animated.Value(0));

    const safeDetails= details || "";
    const numberOfWords= safeDetails.split(" ").length
    

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
        outputRange:[0,(numberOfWords/2.6)*10]
    })

  return (
    <View className="w-full bg-blue-500 rounded-2xl mt-4 p-3">
      <TouchableWithoutFeedback onPress={toggle}>
        <View className="w-full flex-row justify-between">
            <Text className="font-psemibold text-white text-xl">{title}</Text>
            <AntDesign name={open ? 'upcircleo' : 'downcircleo'} size={20} color="white"/>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View className="mt-4" style={{height: heightAnimation}}>
        <Text className="font-pregular text-white text-sm">{details}</Text>
      </Animated.View>
    </View>
  )
}
