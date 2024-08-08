import { View, Text } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'

const WeekKids = ({ time, age}) => {
    
  return (
        <Card.Content>
            <View className="flex-row justify-between">
                <View className="flex-row justify-between">
                    <Text className="text-white text-base font-psemibold">Time: </Text>
                    <Text className="text-white text-base font-pregular">{time}</Text>
                </View>

                <View className="flex-row justify-between">
                    <Text className="text-white text-base font-psemibold">Age group: </Text>
                    <Text className="text-white text-base font-pregular">{age}</Text>
                </View>
            </View>
        </Card.Content>
  )
}

export default WeekKids