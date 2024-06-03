import {View, ScrollView, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {ALL_LANGUAGES_LIST, VIDEO_CATEGORY_LIST} from '../utils/data';
import CopyButton from '../components/CopyButton';
import Dropdown from '../components/Selector';
import axios from 'axios';
import AdConatiner from '../components/AdConatiner';
import {BASE_URL} from '../utils/BaseUrl';
import {convertArrayToString} from '../utils/helper';

const TagGenerator = () => {
  const [nclm, setNclm] = useState(3);
  const [selectedGenre, setSelectedGenre] = useState('Choose Video Genre');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
  const [videoTitle, setVideoTitle] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef();
  const [loader, setLoader] = useState(false);

  const generateVideoTags = async () => {
    setLoader(true);
    const requestData = {
      data: {
        title: videoTitle,
        language: selectedLanguage,
        genre: selectedGenre,
      },
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/ai/generate_youtube_tags`, requestData)
      .then(result => {
        console.log(result?.data);
        // setSearchedData(result?.data);
        setSearchResult(result?.data?.data?.tags);
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
      <TopHeader title="Tag Generator" />
      <View className="px-4 pb-3 bg-secondry ">
        <InputField
          placeholder="Enter Keywords To Generate Title"
          onSearch={() => {
            inputRef?.current?.blur();
            generateVideoTags();
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
                setSearchResult([]);
              }}
            />
          </View>
          <View className=" w-[48%] mr-2 ">
            <Dropdown
              selectedItem={selectedLanguage}
              setSelectedItem={setSelectedLanguage}
              data={ALL_LANGUAGES_LIST}
              onSelect={() => {
                setSearchResult([]);
              }}
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
              <ToolsContainer title="Generated Tags" className="mt-10">
                <View className="p-3 bg-white rounded-xl ">
                  <FlatList
                    data={searchResult}
                    numColumns={nclm}
                    scrollEnabled={false}
                    renderItem={({item, index}) => (
                      <View
                        key={index}
                        style={{elevation: 2}}
                        className=" bg-secondry w-[29%] m-2 items-center py-2 rounded-lg">
                        <CustomText className="text-center capitalize text-appText">
                          {item}
                        </CustomText>
                      </View>
                    )}
                  />
                </View>
              </ToolsContainer>
              <View className="flex-row justify-center my-4">
                <CopyButton text={convertArrayToString(searchResult)} />
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

export default TagGenerator;
