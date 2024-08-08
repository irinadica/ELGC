import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native-paper';
import WeekKids from './WeekKids';

export default function Reck ({title}) {
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
      <View className="flex-col mt-4">
                  <Text className="text-white font-psemibold text-lg">Monday - Tuesday</Text>
                  <WeekKids time="17:00 - 18:00" age="5 - 7yo"/>
                  <WeekKids time="18:00 - 19:00" age="6 - 9yo"/>
                  <WeekKids time="19:00 - 20:00" age="8 - 14yo"/>
                </View>

                <View className="flex-col mt-4">
                  <Text className="text-white font-psemibold text-lg">Friday</Text>
                  <WeekKids time="16:00 - 17:00" age="5 - 7yo"/>
                  <WeekKids time="17:00 - 18:00" age="5 - 7yo"/>
                  <WeekKids time="18:00 - 19:00" age="6 - 9yo"/>
                  <WeekKids time="19:00 - 20:00" age="8 - 14yo"/>
                </View>

                <View className="flex-col mt-4">
                  <Text className="text-white font-psemibold text-lg">Saturday</Text>
                  <WeekKids time="10:00 - 11:00" age="5 - 9yo"/>
                  <WeekKids time="11:00 - 12:00" age="5 - 9yo"/>
                  <WeekKids time="12:30 - 13:30" age="5 - 12yo"/>
                  <WeekKids time="13:30 - 14:30" age="5 - 12yo"/>
                  <WeekKids time="14:30 - 15:30" age="7 - 14yo"/>
                </View>
      </Animated.View>
    </View>
  )
}
