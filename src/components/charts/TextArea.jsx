import {View, TextInput} from 'react-native';
import React from 'react';
import {appColors} from '../../utils/appColors';

const TextArea = ({className, placeholder, onChangeText, value, onFocus}) => {
  return (
    <View className={`   rounded-xl  ${className} z-0`}>
      <TextInput
        multiline={true}
        className=" h-[10rem] p-3 placeholder:text-appGray text-gray-800"
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={onFocus}
        value={value}
        cursorColor={appColors?.primary}
      />
    </View>
  );
};

export default TextArea;
