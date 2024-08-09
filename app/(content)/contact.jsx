import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { Card } from 'react-native-paper'

const Contact = () => {
  return (
   <SafeAreaView className="bg-blue-50 h-full items-center justify-center">
    <ScrollView>
      <View className="flex-col justify-center items-center mt-5">
      <Text className="text-3xl font-pbold items-center">Contact us</Text>
        <Card className="w-[400px] bg-blue-400 mt-4">
          <Card.Content>
                <Text className="text-xl font-psemibold text-white">Useful emails:</Text>
                <Text className="text-base font-pregular text-white">management@eastlondongym.co.uk</Text>
                <Text className="text-base font-pregular text-white">info@eastlondongym.co.uk</Text>

                <Text className="text-xl font-psemibold text-white mt-10">Phone number:</Text>
                <Text className="text-base font-pregular text-white">0207 511 4488</Text>

                <Text className="text-xl font-psemibold text-white mt-10">Location:</Text>
                <Text className="text-base font-pregular text-white">1 Triumph Road, Beckton E65LW</Text>
                



          </Card.Content>
        </Card>
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default Contact