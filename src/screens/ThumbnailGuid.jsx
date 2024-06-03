import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import InputField from '../components/InputField';
import TopHeader from '../components/TopHeader';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import TextArea from '../components/charts/TextArea';
import axios from 'axios';
import {BASE_URL} from '../utils/BaseUrl';
import {appColors} from '../utils/appColors';
import AdConatiner from '../components/AdConatiner';

const ThumbnailGuid = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoScript, setVideoScript] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [loader, setLoader] = useState(false);

  const getThumbnailSuggetions = async () => {
    // interstitial?.show();
    setLoader(true);
    const requestData = {
      formValues: {
        videoTitle: videoTitle,
        script: videoScript,
      },
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/user/get-thumbnail-suggestions`, requestData)
      .then(result => {
        console.log(result?.data?.data);
        setSearchResult(result?.data?.data);
        setLoader(false);
      })
      .catch(error => {
        //setSearchedData(null);
        setLoader(false);
        console.log(error?.message, 'this is error');
      });
  };

  return (
    <View className="flex-1 bg-secondry">
      <TopHeader title="Thumbnail Guide" titleStyle={{marginLeft: '12%'}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 ">
          <InputField
            isSearch={true}
            placeholder="Enter Video Title"
            value={videoTitle}
            onChangeText={t => setVideoTitle(t)}
          />
          <View
            style={{elevation: 3}}
            className="px-3 my-4 bg-white rounded-lg h-80">
            <TextArea
              value={videoScript}
              placeholder="Enter Video Script"
              onChangeText={t => setVideoScript(t)}
            />
          </View>
          <View className="items-center my-3 ">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (!searchResult) {
                  getThumbnailSuggetions;
                  return;
                } else {
                  setVideoScript('');
                  setVideoTitle('');
                  setSearchResult('');
                }
              }}
              className="px-6 py-3 bg-primary rounded-3xl">
              {loader ? (
                <ActivityIndicator color={appColors.appWhite} />
              ) : (
                <>
                  {searchResult ? (
                    <CustomText className="text-white ">Clear</CustomText>
                  ) : (
                    <CustomText className="text-white ">
                      Get Suggestions
                    </CustomText>
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
          <AdConatiner>
            <CustomText>ads</CustomText>
          </AdConatiner>
          {searchResult && (
            <View>
              <ToolsContainer title="Thumbnail Suggestions">
                <View className="p-3 bg-white rounded-lg ">
                  {/* {thumbnailSug?.map((item, index) => (
                    <View key={index}>
                      <CustomText className="my-1">
                        {index + 1}. {item}
                      </CustomText>
                    </View>
                  ))} */}
                  <CustomText className="my-1">
                    {searchResult?.thumbnail_suggestions}
                  </CustomText>
                </View>
              </ToolsContainer>
              <View className="my-3 ">
                <AdConatiner>
                  <CustomText>ads</CustomText>
                </AdConatiner>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ThumbnailGuid;
