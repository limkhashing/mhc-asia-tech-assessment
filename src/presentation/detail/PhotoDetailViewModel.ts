import {useState, useEffect} from 'react';
import {State} from 'react-native-gesture-handler';
import {DI} from '../../di/ioc.tsx';

export const photoDetailViewModel = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scale, setScale] = useState(1);
  const photoRepository = DI.resolve('photoRepository');

  const checkIfBookmarked = async (photoId: string) => {
    try {
      const bookmarkedPhotos = await photoRepository.getBookmarkedPhotos();
      const isAlreadyBookmarked = bookmarkedPhotos.includes(photoId);
      setIsBookmarked(isAlreadyBookmarked);
    } catch (error) {
      console.error('Error checking bookmark:', error);
    }
  };

  const toggleBookmark = async (photoId: string) => {
    try {
      await photoRepository.toggleBookmark(photoId);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const onPinchGestureEvent = event => {
    setScale(event.nativeEvent.scale);
  };

  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setScale(Math.max(1, scale));
    }
  };

  return {
    isBookmarked,
    scale,
    checkIfBookmarked,
    toggleBookmark,
    onPinchGestureEvent,
    onPinchHandlerStateChange,
  };
};

export default photoDetailViewModel;
