import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons';

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setShowPassword]=useState(false);
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium">{title}</Text>

      <View className="flex-row w-full h-14 px-4 rounded-2xl bg-white border-blue-300 border-2 focus:border-blue-800 items-center ">
        <TextInput
        className="flex-1 text-black font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#cbd5e1"
        onChangeText={handleChangeText}
        secureTextEntry={title=== 'Password' && !showPassword}
        />
        {title==='Password' && (
        <TouchableOpacity onPress={()=> {
            setShowPassword(!showPassword)
        }}>
            <Image source={!showPassword ? icons.view : icons.hide}
            className="w-6 h-6"
            resizeMode='contain'/>
        </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField