import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {ALL_LANGUAGES_LIST, VIDEO_CATEGORY_LIST} from '../utils/data';
import CopyButton from '../components/CopyButton';
import {appColors} from '../utils/appColors';
import axios from 'axios';
import {BASE_URL} from '../utils/BaseUrl';
import AdConatiner from '../components/AdConatiner';
import Dropdown from '../components/Selector';

const ContentResearch = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Choose Video Genre');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
  const [searchedData, setSearchedData] = useState(null);
  const [loader, setLoader] = useState(false);
  const inputRef = useRef();

  const onReset = () => {
    setSearchedData(null);
    setVideoTitle('');
    setSelectedGenre('Choose Video Genre');
    setSelectedLanguage('Choose Language');
    inputRef?.current?.focus();
  };

  const getContentData = async () => {
    setLoader(true);
    const requestData = {
      data: {
        title: videoTitle,
        genre: selectedGenre,
        language: selectedLanguage,
        realtime: false,
      },
    };

    await axios
      .post(`${BASE_URL}/ai/generate_content`, requestData)
      .then(result => {
        console.log(result?.data);
        // setSearchedData(result?.data);
        setSearchedData(result?.data?.data?.content);
        setLoader(false);
      })
      .catch(error => {
        //setSearchedData(null);
        setLoader(false);
        console.log(error?.message, 'this is error');
      });
  };

  return (
    <View style={styles.screen}>
      <TopHeader title="Content Research" />
      <View className="px-4 pb-4 bg-secondry ">
        <InputField
          ref={inputRef}
          placeholder="Enter Video Title"
          onSearch={() => {
            inputRef?.current?.blur();
            getContentData();
          }}
          onClose={onReset}
          isComplete={searchedData === null ? false : true}
          onChangeText={t => setVideoTitle(t)}
          loader={loader}
          value={videoTitle}
        />
        <View className="flex-row items-center pt-4 ">
          <View className=" w-[48%] mr-2 ">
            <Dropdown
              selectedItem={selectedGenre}
              setSelectedItem={setSelectedGenre}
              data={VIDEO_CATEGORY_LIST}
            />
          </View>
          <View className=" w-[48%] mr-2 ">
            <Dropdown
              selectedItem={selectedLanguage}
              setSelectedItem={setSelectedLanguage}
              data={ALL_LANGUAGES_LIST}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="px-4 ">
          <AdConatiner>
            <CustomText>ads</CustomText>
          </AdConatiner>
          {searchedData && (
            <View className="pt-10">
              <ToolsContainer title="Generated Script">
                <View className="px-4 py-2 overflow-hidden bg-white rounded-lg ">
                  <CustomText
                    font="medium"
                    style={{lineHeight: 30, textAlign: 'justify'}}>
                    {searchedData}
                  </CustomText>
                </View>
              </ToolsContainer>
              <View className="flex-row justify-center my-4">
                <CopyButton text={searchedData} />
              </View>
              <AdConatiner>
                <CustomText>ads</CustomText>
              </AdConatiner>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.secondry,
  },
});

export default ContentResearch;
