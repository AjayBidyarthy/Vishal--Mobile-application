import {View, FlatList, ScrollView, StyleSheet, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {appColors} from '../utils/appColors';
import {BASE_URL} from '../utils/BaseUrl';
import axios from 'axios';
import AdConatiner from '../components/AdConatiner';

const TopicIdeas = () => {
  const [videoLink, setVideoLink] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const getTopicIdeaData = async () => {
    Keyboard.dismiss();

    setLoader(true);
    const requestData = {
      url: videoLink,
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/recommended-keywords`, requestData)
      .then(result => {
        console.log(result?.data);
        setSearchResult(result?.data?.response?.recommendations);
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
      <TopHeader title="Topic Ideas" />
      <View style={{paddingHorizontal: '4%', paddingBottom: '3%'}}>
        <InputField
          onChangeText={t => setVideoLink(t)}
          value={videoLink}
          loader={loader}
          onSearch={getTopicIdeaData}
          onClose={() => {
            setVideoLink('');
            setSearchResult([]);
          }}
          isComplete={searchResult?.length !== 0}
          placeholder="Enter Your/Competitor Video Link"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="py-3 ">
            <AdConatiner>
              <CustomText>ads</CustomText>
            </AdConatiner>
          </View>
          {searchResult?.length !== 0 && (
            <>
              <View className="p-4 ">
                <ToolsContainer title="Generated Ideas">
                  <View
                    style={{
                      backgroundColor: appColors.appWhite,
                      paddingHorizontal: '3%',
                      paddingVertical: '4%',
                      borderRadius: 10,
                    }}>
                    <FlatList
                      data={searchResult}
                      scrollEnabled={false}
                      renderItem={({item, index}) => (
                        <View
                          key={index}
                          style={{
                            padding: '3%',
                            marginVertical: 10,
                            backgroundColor: appColors.secondry,
                            borderRadius: 8,
                          }}>
                          <CustomText>{item}</CustomText>
                        </View>
                      )}
                    />
                  </View>
                </ToolsContainer>
              </View>
              <View className="py-3 ">
                <AdConatiner>
                  <CustomText>ads</CustomText>
                </AdConatiner>
              </View>
            </>
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

export default TopicIdeas;
