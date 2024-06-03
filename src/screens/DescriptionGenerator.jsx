import {View, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {ALL_LANGUAGES_LIST, VIDEO_CATEGORY_LIST} from '../utils/data';
import CopyButton from '../components/CopyButton';
import Dropdown from '../components/Selector';
import {BASE_URL} from '../utils/BaseUrl';
import AdConatiner from '../components/AdConatiner';
import axios from 'axios';

const DescriptionGenerator = () => {
  const [selectedGenre, setSelectedGenre] = useState('Choose Video Genre');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
  const [videoTitle, setVideoTitle] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef();
  const [loader, setLoader] = useState(false);
  const [videoGenerError, setVideoGenerError] = useState(false);
  const [videoLanguageError, setVideoLanguageError] = useState(false);

  const generateVideoDescription = async () => {
    if (selectedGenre === 'Choose Video Genre') {
      return setVideoGenerError(true);
    }
    if (selectedLanguage === 'Choose Language') {
      return setVideoLanguageError(true);
    }
    setLoader(true);
    const requestData = {
      data: {
        title: videoTitle,
        language: selectedLanguage,
        genre: selectedGenre,
        alphabet: '',
      },
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/ai/generate_descriptions`, requestData)
      .then(result => {
        console.log(result?.data);
        // setSearchedData(result?.data);
        setSearchResult(result?.data?.data?.description);
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
    setVideoTitle('');
    setSelectedGenre('Choose Video Genre');
    setSelectedLanguage('Choose Language');
    inputRef?.current?.focus();
  };

  return (
    <View className="flex-1 bg-secondry">
      <TopHeader title="Description Generator" />
      <View className="px-4 pb-3 bg-secondry ">
        <InputField
          placeholder="Enter Video Title"
          onSearch={() => {
            inputRef?.current?.blur();
            generateVideoDescription();
          }}
          onClose={onReset}
          isComplete={searchResult.length === 0 ? false : true}
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
              <ToolsContainer title="Generated Description" className="mt-10">
                <View className="px-4 py-2 overflow-hidden bg-white rounded-lg ">
                  <CustomText
                    font="medium"
                    style={{lineHeight: 30}}
                    className="text-justify line-clamp-5">
                    {searchResult[0]}
                  </CustomText>
                </View>
              </ToolsContainer>
              <View className="flex-row justify-center my-4">
                <CopyButton text={searchResult[0]} />
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

export default DescriptionGenerator;
