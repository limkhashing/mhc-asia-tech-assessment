import AsyncStorage from '@react-native-async-storage/async-storage';
import {MHC_API_ENDPOINT, PHOTO_STORAGE_KEY} from '../../helper/Constants.tsx';
import Photo from '../../domain/model/PhotoModel.ts';

export const photoRepository = () => {
  const fetchPhotos = async (): Promise<Photo[]> => {
    try {
      const response = await fetch(MHC_API_ENDPOINT);
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const getBookmarkedPhotos = async (): Promise<string[]> => {
    try {
      const bookmarkedPhotos = await AsyncStorage.getItem(PHOTO_STORAGE_KEY);
      return bookmarkedPhotos ? JSON.parse(bookmarkedPhotos) : [];
    } catch (error) {
      console.error('Error getting bookmarked photos:', error);
      return [];
    }
  };

  const toggleBookmark = async (photoId: string): Promise<boolean> => {
    try {
      let bookmarkedPhotos = await AsyncStorage.getItem(PHOTO_STORAGE_KEY);
      if (!bookmarkedPhotos) {
        bookmarkedPhotos = '[]';
      }
      const parsedBookmarkedPhotos = JSON.parse(bookmarkedPhotos);
      const index = parsedBookmarkedPhotos.indexOf(photoId);
      if (index !== -1) {
        parsedBookmarkedPhotos.splice(index, 1);
      } else {
        parsedBookmarkedPhotos.push(photoId);
      }
      await AsyncStorage.setItem(
        PHOTO_STORAGE_KEY,
        JSON.stringify(parsedBookmarkedPhotos),
      );
      return true;
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      return false;
    }
  };

  return {
    fetchPhotos,
    getBookmarkedPhotos,
    toggleBookmark,
  };
};

export default photoRepository;

