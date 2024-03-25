import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import Photo from '../domain/model/PhotoModel.ts';
import styles from './Styles.tsx';
import {useIsFocused} from '@react-navigation/native';
import {DI} from '../di/ioc.tsx';

interface Props {
  photo: Photo;
  onRowPress: () => void;
}

const PhotoListItem: React.FC<Props> = ({photo, onRowPress}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const useFocused = useIsFocused();
  const photoRepository = DI.resolve('photoRepository');

  useEffect(() => {
    checkIfBookmarked();
  }, [useFocused]);

  const checkIfBookmarked = async () => {
    try {
      const bookmarkedPhotos = await photoRepository.getBookmarkedPhotos();
      const isAlreadyBookmarked = bookmarkedPhotos.includes(photo.id);
      setIsBookmarked(isAlreadyBookmarked);
    } catch (error) {
      console.error('Error checking bookmark:', error);
    }
  };
  const toggleBookmark = async () => {
    try {
      await photoRepository.toggleBookmark(photo.id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return (
    <TouchableOpacity onPress={onRowPress}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
        <Image
          source={{uri: photo.url}}
          style={{width: 50, height: 50, marginRight: 10}}
        />
        <View>
          <Text>Name: {photo.id}</Text>
          <Text>Description : {photo.category}</Text>
        </View>
        <TouchableOpacity
          onPress={toggleBookmark}
          style={styles.bookmarkButton}>
          <Text style={styles.bookmarkButtonText}>
            {isBookmarked ? 'Remove bookmarks' : 'Add bookmarks'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PhotoListItem;
