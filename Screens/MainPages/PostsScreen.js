import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import DefaultPostsScreen from '../PostsPageScreens/DefaultPostsScreen';
import CommentsScreen from '../PostsPageScreens/CommentsScreen';
import MapScreen from '../PostsPageScreens/MapScreen';
import { StyleSheet } from 'react-native';
import SvgArrowLeft from '../../assets/svg/SvgArrowLeft';

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator initialRouteName="DefaultPosts" screenOptions={{ headerShown: false }}>
      <NestedScreen.Screen name="DefaultPosts" component={DefaultPostsScreen} />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          ...screenOptions,
          title: 'Коментарі',
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => navigation.goBack()}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          ...screenOptions,
          title: 'Карта',
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => navigation.goBack()}
              title="Return back"
              color="#fff"
              style={{
                ...styles.arrowLeft,
                marginRight: 90,
              }}
            />
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  arrowLeft: {
    marginLeft: 16,
    marginRight: 76,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

const screenOptions = {
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    boxShadow: '0px 0.5px 0px rgba(0, 0, 0, 0.3)',
  },
  headerTintColor: '#212121',
  headerTitleStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,

    textAlign: 'center',
  },
};
