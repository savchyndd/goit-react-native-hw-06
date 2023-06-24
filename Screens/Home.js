import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet } from 'react-native';

import PostScreen from './MainPages/PostsScreen';
import CreatePostsScreen from './MainPages/CreatePostsScreen';
import ProfileScreen from './MainPages/ProfileScreen';

import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import SvgLogOut from '../assets/svg/SvgLogOut';

import SvgGrid from '../assets/svg/SvgGrid';
import SvgPlus from '../assets/svg/SvgPlus';
import SvgUser from '../assets/svg/SvgUser';
import SvgTrash from '../assets/svg/SvgTrash';

const ButtomTabs = createBottomTabNavigator();

const Home = () => {
  return (
    <ButtomTabs.Navigator
      id="home"
      screenOptions={{
        tabBarStyle: {
          height: 64,
          paddingTop: 10,
          paddingBottom: 20,

          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ff6c00',
        tabBarInactiveTintColor: '#212121',
      }}
    >
      <ButtomTabs.Screen
        name="Posts"
        component={PostScreen}
        options={({ navigation }) => ({
          ...postsOptions,
          headerRight: () => (
            <SvgLogOut
              onPress={() => navigation.navigate('Login')}
              title="Return back"
              color="#fff"
              style={styles.logOut}
            />
          ),
          tabBarButton: props => <TouchableOpacity {...props} style={styles.btnTab} />,
          tabBarIcon: ({ selected, color }) => {
            return <SvgGrid stroke={color} />;
          },
        })}
      />
      <ButtomTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          tabBarStyle: { display: 'none' },
          ...createPostsOptions,
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => {
                navigation.goBack();
              }}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              style={{
                ...styles.btnTab,
                backgroundColor: props.accessibilityState.selected ? '#f6f6f6' : '#ff6c00',
                width: props.accessibilityState.selected ? 70 : 40,
              }}
            />
          ),
          tabBarIcon: ({ focused }) => {
            return focused ? <SvgTrash stroke={'#dbdbdb'} /> : <SvgPlus fill={'#ffffff'} />;
          },
        })}
      />
      <ButtomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          ...createPostsOptions,
          headerShown: false,
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => navigation.navigate('Posts')}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              style={{
                ...styles.btnTab,
                marginRight: 0,
              }}
            />
          ),
          tabBarIcon: ({ focused, color, size }) => {
            return <SvgUser size={size} fill={color} />;
          },
        })}
      />
    </ButtomTabs.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  arrowLeft: {
    marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logOut: {
    width: 24,
    height: 24,
    marginRight: 60,
    marginRight: 16,
    // paddingHorizontal: 16,
    paddingVertical: 10,
  },
  btnTab: {
    alignSelf: 'center',
    marginRight: 30,
    width: 40,
    height: 40,

    paddingVertical: 8,
    paddingHorizontal: 8,

    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  // btnActiveTab: {
  //   alignSelf: 'center',
  //   marginRight: 30,

  //   width: 70,
  //   height: 40,

  //   paddingVertical: 8,
  //   paddingHorizontal: 23,

  //   backgroundColor: '#ff6c00',
  //   borderRadius: 20,
  // },
});

const createPostsOptions = {
  title: 'Створити публікацію',
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

const postsOptions = {
  title: 'Публікації',
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

    marginLeft: 120,

    textAlign: 'center',
  },
};
