import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {tableHeader} from '../utils/data';
import {appColors} from '../utils/appColors';
import axios from 'axios';
import ProgressChart from '../components/charts/ProgressChart';
import {BASE_URL} from '../utils/BaseUrl';
import RelatedKeywordTable from '../components/RelatedKeywordTable';
import AdConatiner from '../components/AdConatiner';

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [relatedKeyword, setRelatedKeyword] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(5);

  const getKeywordData = async () => {
    Keyboard.dismiss();
    // interstitial?.show();
    setLoader(true);
    setCurrentIndex(5);

    //console.log(requestData, "red darta");
    await axios
      .get(`${BASE_URL}/get-Related-keywords?keyword=${keyword}`)
      .then(result => {
        console.log(result?.data);
        setSearchResult(result?.data);
        setRelatedKeyword(result?.data?.related_keywords?.slice(0, 5));
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
      <TopHeader title="Keyword Research" />
      <View style={{paddingHorizontal: '4%', paddingBottom: '3%'}}>
        <InputField
          onChangeText={t => setKeyword(t)}
          value={keyword}
          loader={loader}
          onSearch={getKeywordData}
          onClose={() => {
            setKeyword('');
            setSearchResult([]);
          }}
          isComplete={searchResult?.length !== 0}
          placeholder="Enter keyword"
        />
      </View>
      <ScrollView>
        <View className="px-4 py-10 ">
          <AdConatiner>
            <CustomText>ads</CustomText>
          </AdConatiner>
          {searchResult?.length !== 0 && (
            <>
              <ToolsContainer title="Keyword Score" style={{marginTop: '5%'}}>
                <View className="px-2 bg-white rounded-lg ">
                  <ProgressChart
                    progress={searchResult?.exact_keyword[0].overallscore}
                    title="Your Score"
                  />
                  <ProgressChart
                    progress={searchResult?.exact_keyword[0].competition_score}
                    title="Competitor Score"
                  />
                </View>
              </ToolsContainer>

              <ToolsContainer
                title="Related Keyword"
                style={{marginTop: '10%'}}>
                <View
                  style={{
                    backgroundColor: appColors.appWhite,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#606060',
                      flexDirection: 'row',
                      paddingVertical: '2%',
                    }}>
                    {tableHeader?.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          width: index === 0 ? '36%' : '16%',
                          paddingLeft: index === 0 && 10,
                          paddingRight: index === 4 && 2,
                        }}>
                        <CustomText
                          style={{
                            fontSize: 9,
                            color: appColors.appWhite,
                            textAlign: index !== 0 ? 'center' : 'start',
                          }}>
                          {item}
                        </CustomText>
                      </View>
                    ))}
                  </View>
                  <RelatedKeywordTable data={searchResult?.related_keywords} />
                </View>
              </ToolsContainer>
              <AdConatiner>
                <CustomText>ads</CustomText>
              </AdConatiner>
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

export default KeywordSearch;
