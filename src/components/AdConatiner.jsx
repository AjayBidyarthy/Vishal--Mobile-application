import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import CustomText from './CustomText';

const AdConatiner = ({children}) => {
  return (
    <View className="items-center px-3 my-8 justify-center bg-appGray/70 h-40 mx-2 ">
      <CustomText>Banner ads show here</CustomText>
      {children}
    </View>
  );
};

export default AdConatiner;
