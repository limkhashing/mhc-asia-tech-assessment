import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import Photo from '../../domain/model/PhotoModel.ts';
import styles from '../../components/Styles.tsx';
import {DI} from '../../di/ioc.tsx';

interface Props {
  route: {
    params: {
      photo: Photo;
    };
  };
}

const PhotoDetailScreen: React.FC<Props> = ({route}) => {
  const {photo} = route.params;
  const viewModel = DI.resolve('photoDetailViewModel');

  useEffect(() => {
    viewModel.checkIfBookmarked(photo.id);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.containerDetail}>
        <PinchGestureHandler
          onGestureEvent={viewModel.onPinchGestureEvent}
          onHandlerStateChange={viewModel.onPinchHandlerStateChange}>
          <Image
            source={{uri: photo.url}}
            style={[styles.image, {transform: [{scale: viewModel.scale}]}]}
            resizeMode="contain"
          />
        </PinchGestureHandler>

        <Text>ID: {photo.id}</Text>
        <Text>Category: {photo.category_name}</Text>

        <TouchableOpacity
          onPress={() => viewModel.toggleBookmark(photo.id)}
          style={styles.bookmarkButton}>
          <Text style={styles.bookmarkButtonText}>
            {viewModel.isBookmarked
              ? 'Remove from bookmarks'
              : 'Add to bookmarks'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhotoDetailScreen;
