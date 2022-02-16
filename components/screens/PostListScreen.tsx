import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {Navigation} from "react-native-navigation";
import { useNavigationButtonPress, withNavigationProvider } from "react-native-navigation-hooks";
import * as postsActions from '../../stores/posts.actions';
import { postsStore } from "../../stores/posts.store";
import {connect} from 'remx';


const PostListScreen = withNavigationProvider((props: any) => {
  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'addPost',
            text: 'Add'
          }
        ]
      }
    });

    postsActions.fetchPosts();
  }, []);


  useNavigationButtonPress(
    (e) => {
      Navigation.showModal({
        stack: {
          children: [{
            component: {
              name: 'blog.AddPost',
              passProps: {
                text: 'stack with one child'
              },
              options: {
                topBar: {
                  title: {
                    text: 'Modal'
                  }
                }
              }
            }
          }]
        }
      });
    },
    { buttonId: 'addPost' }
  )
  const pushViewPostScreen = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'blog.ViewPost',
        passProps: {
         first : 1,
          sec : 2
        },
        options: {
          topBar: {
            title: {
              text: 'Post1'
            }
          }
        }
      }
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={pushViewPostScreen}>
        Add Post Screen
      </Text>
      <Text>{JSON.stringify(props.posts)}</Text>
    </View>
  );
})

const mapStateToProps = () => {
  return {
    posts : postsStore.getPosts(),
  }
}

export default connect(mapStateToProps)( PostListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems : "center"
  },
  text: {
    // flex : 1,
    textAlign: "center",
    fontSize: 28,
    margin: 10,
  },
});
