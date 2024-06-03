import {View, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {ALL_LANGUAGES_LIST, VIDEO_CATEGORY_LIST} from '../utils/data';
import CopyButton from '../components/CopyButton';
import Dropdown from '../components/Selector';
import axios from 'axios';
import {BASE_URL} from '../utils/BaseUrl';
import AdConatiner from '../components/AdConatiner';
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

const TitleGenerator = () => {
  const [selectedGenre, setSelectedGenre] = useState('Choose Video Genre');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef();
  const [loader, setLoader] = useState(false);
  const [videoGenerError, setVideoGenerError] = useState(false);
  const [videoLanguageError, setVideoLanguageError] = useState(false);

  const generateVideoTitle = async () => {
    if (selectedGenre === 'Choose Video Genre') {
      return setVideoGenerError(true);
    }
    if (selectedLanguage === 'Choose Language') {
      return setVideoLanguageError(true);
    }
    //interstitial.show();
    setLoader(true);
    const requestData = {
      data: {
        keywords: inputKeyword,
        language: selectedLanguage,
        genre: selectedGenre,
        alphabet: '',
        advanceSearch: false,
        advanceSearchResult: [],
      },
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/ai/generate_titles`, requestData)
      .then(result => {
        console.log(result?.data);
        // setSearchedData(result?.data);

        setSearchResult(result?.data?.data?.titles);
        setLoader(false);
      })
      .catch(error => {
        //setSearchedData(null);
        setLoader(false);
        console.log(error?.message, 'this is error');
      });
  };

  const onReset = () => {
    setSearchResult([]);
    setInputKeyword('');
    setSelectedGenre('Choose Video Genre');
    setSelectedLanguage('Choose Language');
    inputRef?.current?.focus();
  };

  return (
    <View className="flex-1 bg-secondry">
      <TopHeader title="Title Generator" />
      <View className="px-4 pb-3 bg-secondry ">
        <InputField
          placeholder="Enter Keywords To Generate Title"
          onSearch={() => {
            inputRef?.current?.blur();
            generateVideoTitle();
          }}
          onClose={onReset}
          isComplete={searchResult.length === 0 ? false : true}
          onChangeText={t => setInputKeyword(t)}
          loader={loader}
          value={inputKeyword}
        />
        <View className="flex-row items-center pt-4 ">
          <View className=" w-[48%] mr-2 ">
            <Dropdown
              selectedItem={selectedGenre}
              setSelectedItem={setSelectedGenre}
              data={VIDEO_CATEGORY_LIST}
              onSelect={() => {
                setVideoGenerError(false);
              }}
              error={videoGenerError}
            />
          </View>
          <View className=" w-[48%] mr-2 ">
            <Dropdown
              selectedItem={selectedLanguage}
              setSelectedItem={setSelectedLanguage}
              data={ALL_LANGUAGES_LIST}
              onSelect={() => {
                setVideoLanguageError(false);
              }}
              error={videoLanguageError}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="px-4 ">
          <AdConatiner>
            <CustomText>ads</CustomText>
          </AdConatiner>
          {searchResult?.length !== 0 && (
            <View className="pt-10 ">
              <ToolsContainer title="Generated Titles">
                <View className="">
                  {searchResult?.map((item, index) => (
                    <View
                      key={index}
                      className="flex-row items-center justify-between my-2 ">
                      <View className="p-3 bg-white rounded-lg w-[70%] ">
                        <CustomText>
                          {item}
                          {index + 1}
                        </CustomText>
                      </View>
                      <CopyButton text={item} />
                    </View>
                  ))}
                </View>
              </ToolsContainer>
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

export default TitleGenerator;
