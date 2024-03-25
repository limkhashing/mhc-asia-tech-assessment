import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PhotoListScreen from '../presentation/home/PhotoListScreen';
import PhotoDetailScreen from '../presentation/detail/PhotoDetailScreen';
import {PHOTO_LIST, PHOTO_DETAIL} from '../helper/Constants';

export type RootStackParamList = {
  PhotoListScreen: undefined;
  PhotoDetailScreen: {id: string; url: string; category_name: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PHOTO_LIST.route}
        component={PhotoListScreen}
        options={{title: PHOTO_LIST.title}}
      />
      <Stack.Screen
        name={PHOTO_DETAIL.route}
        component={PhotoDetailScreen}
        options={{title: PHOTO_DETAIL.title}}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
