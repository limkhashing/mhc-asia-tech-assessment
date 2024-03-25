import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerList: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 6,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 3,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  containerDetail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '80%',
    marginBottom: 10,
  },
  bookmarkButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginStart: 20,
  },
  bookmarkButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
