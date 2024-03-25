import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigation from './src/navigation/RootStackNavigation.tsx';

const MHCAsia: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default MHCAsia;

AppRegistry.registerComponent(appName, () => MHCAsia);
