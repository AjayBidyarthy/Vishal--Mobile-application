import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import DrawerNavigation from './DrawerNavigation';
import TopicIdeas from '../screens/TopicIdeas';
import KeywordSearch from '../screens/KeywordSearch';
import ContentResearch from '../screens/ContentResearch';
import ScriptGenerator from '../screens/ScriptGenerator';
import TitleGenerator from '../screens/TitleGenerator';
import DescriptionGenerator from '../screens/DescriptionGenerator';
import VideoOptimization from '../screens/VideoOptimization';
import TagGenerator from '../screens/TagGenerator';
import HasTagGenerator from '../screens/HasTagGenerator';
import ThumbnailChecker from '../screens/ThumbnailChecker';
import ThumbnailGuid from '../screens/ThumbnailGuid';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="drawer" component={DrawerNavigation} />
        <Stack.Screen name="topic_idea" component={TopicIdeas} />
        <Stack.Screen name="keyword_research" component={KeywordSearch} />
        <Stack.Screen name="content" component={ContentResearch} />
        <Stack.Screen name="script" component={ScriptGenerator} />
        <Stack.Screen name="title" component={TitleGenerator} />
        <Stack.Screen name="video_optimization" component={VideoOptimization} />
        <Stack.Screen name="tag" component={TagGenerator} />
        <Stack.Screen name="hasTag" component={HasTagGenerator} />
        <Stack.Screen name="thumbnail_quality" component={ThumbnailChecker} />
        <Stack.Screen name="thumbnail_guid" component={ThumbnailGuid} />

        <Stack.Screen name="description" component={DescriptionGenerator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
