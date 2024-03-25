import {useEffect, useState} from 'react';
import Photo from '../../domain/model/PhotoModel.ts';
import {DI} from '../../di/ioc.tsx';

export const photosViewModel = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isOddFilter, setIsOddFilter] = useState<boolean>(false);

  const photoRepository = DI.resolve('photoRepository');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const json = await photoRepository.fetchPhotos();
      setPhotos(json);
      setFilteredPhotos(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = photos.filter(item =>
      item.id.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredPhotos(filtered);
  };

  const handleFilter = () => {
    setIsOddFilter(!isOddFilter);
    const filtered = isOddFilter
      ? photos.filter(item => parseInt(item.id, 10) % 2 === 0)
      : photos.filter(item => parseInt(item.id, 10) % 2 !== 0);
    setFilteredPhotos(filtered);
  };

  return {
    filteredPhotos,
    searchText,
    isOddFilter,
    handleSearch,
    handleFilter,
  };
};

export default photosViewModel;
