import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useCallback} from 'react';
import logo from '../assets/images/logo.png';
import {navOption} from '../utils/data';
import CustomText from '../components/CustomText';
import home from '../assets/images/home.png';
import person from '../assets/images/person.png';
import chat from '../assets/images/chat.png';
import info from '../assets/images/info.png';
import share from '../assets/images/share.png';

const DrawerMenu = () => {
  return (
    <View
      style={{borderTopRightRadius: 30, borderBottomRightRadius: 30}}
      className="flex-1 bg-secondry rounded-tr-xl">
      <View>
        <View className="px-8 py-5 ">
          <Image source={logo} className=" h-8 w-32" />
        </View>
        <View className="px-8 ">
          <FlatList
            data={navOption}
            renderItem={({item, index}) => (
              <View key={item?.id} className="my-4 ">
                <TouchableOpacity
                  activeOpacity={0.6}
                  // onPress={async () => {
                  //   await Linking.openURL('https://google.com');
                  // }}
                >
                  <View className="flex-row">
                    <Image
                      source={
                        index === 0
                          ? home
                          : index === 1
                          ? person
                          : index == 2
                          ? chat
                          : index === 3
                          ? info
                          : share
                      }
                      className={` h-[25px] w-[25px] `}
                    />
                    <CustomText font="medium" className="ml-2 text-gray-900 ">
                      {item?.title}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default DrawerMenu;
