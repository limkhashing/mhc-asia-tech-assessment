import React from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  View,
} from 'react-native';
import photosViewModel from './PhotoListViewModel';
import {useNavigation} from '@react-navigation/native';
import PhotoListItem from '../../components/PhotoListItem';
import {PHOTO_DETAIL} from '../../helper/Constants.tsx';
import styles from '../../components/Styles.tsx';
import {DI} from '../../di/ioc.tsx';

const PhotoListScreen: React.FC = () => {
  const viewModel = DI.resolve('photoListViewModel');
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <PhotoListItem photo={item} onRowPress={() => navigateToDetail(item)} />
    );
  };

  const navigateToDetail = item => {
    navigation.navigate(PHOTO_DETAIL.route, {photo: item});
  };

  const renderEmptyComponent = () => <Text>No photos found</Text>;

  const renderFooterComponent = () => <Text>End of list</Text>;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.containerList}>
        <TextInput
          style={styles.searchInput}
          onChangeText={viewModel.handleSearch}
          value={viewModel.searchText}
          placeholder="Search by Name"
        />

        <TouchableOpacity
          onPress={viewModel.handleFilter}
          style={styles.filterButton}>
          <Text>
            {viewModel.isOddFilter ? 'Show Even Numbers' : 'Show Odd Numbers'}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={viewModel.filteredPhotos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooterComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default PhotoListScreen;
