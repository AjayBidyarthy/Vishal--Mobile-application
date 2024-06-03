import {View, TextInput} from 'react-native';
import React from 'react';

const TextArea = ({className, placeholder, onChangeText, value}) => {
  return (
    <View className={`   rounded-xl  ${className} z-0`}>
      <TextInput
        multiline={true}
        className=" h-[10rem] p-3 placeholder:text-gray-400 text-gray-800"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default TextArea;
