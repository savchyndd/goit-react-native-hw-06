import { FlatList, Image } from 'react-native';
import { Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import PostsItem from '../../components/PostsItem/PostsItem';

const DefaultPostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([
    {
      id: 'ksdlflsdnfsldjnfdjfsjdkfn',
      postImg:
        'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fgoit-react-native-hw-05-dbed3e8b-5429-4e6e-a6ba-fefe43283569/Camera/1609f830-6073-4560-8596-6f26f450b3a3.jpg',
      postName: 'олл',
      postAddress: 'Ucraine',
      postLocation: { latitude: 48.383022, longitude: 31.1828699 },
    },
  ]);

  useEffect(() => {
    if (!route.params) return;

    setPosts(prev => [...prev, route.params]);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatarImg} />
        <View>
          <Text style={styles.avatarName}>Natali Romanova</Text>
          <Text style={styles.avatarEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        style={styles.postsWrapper}
        data={posts}
        renderItem={({ item }) => (
          <PostsItem
            postName={item.postName}
            postImg={item.postImg}
            postAddress={item.postAddress}
            postLocation={item.postLocation}
          />
        )}
        keyExtractor={(item, idx) => idx.toString()}
      />
      <View style={styles.navTabs}></View>
    </View>
  );
};

export default DefaultPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingTop: 32,

    backgroundColor: '#fff',
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarImg: {
    width: 60,
    height: 60,

    marginRight: 8,

    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },
  avatarName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,

    color: '#212121',
  },
  avatarEmail: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,

    color: 'rgba(33, 33, 33, 0.8)',
  },
});
