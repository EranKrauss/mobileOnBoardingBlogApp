import React, {useEffect} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {Navigation} from "react-native-navigation";
import {useNavigationButtonPress, withNavigationProvider} from "react-native-navigation-hooks";
import * as postsActions from '../../stores/posts.actions';
import {postsStore} from "../../stores/posts.store";
import {connect} from 'remx';
import PostCard from "../PostCard";


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
        {buttonId: 'addPost'}
    )
    const pushViewPostScreen = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'blog.ViewPost',
                passProps: {
                    first: 1,
                    sec: 2
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

    // @ts-ignore
    const renderPost = (post: object) => <PostCard post={post}/>
    // @ts-ignore
    const postKeyExtractor = (item: object) => `${item.id}-key`;
    const createPostsList = (posts : object[]) => {
        // @ts-ignore
        return posts.map(post => <PostCard post={post} key={post.id}/>)
    }
    // @ts-ignore
    return (

        <View style={styles.container}>
             <Text style={styles.title} onPress={pushViewPostScreen}>
                 Post's List
             </Text>
             <ScrollView style={styles.posts}>
            {props.posts.length > 0 && createPostsList(props.posts)}
                  {/*<FlatList data={props.posts} renderItem={renderPost} keyExtractor={postKeyExtractor}/>*/}
             </ScrollView>
         </View>
     );
})

const mapStateToProps = () => {
    return {
        posts: postsStore.getPosts(),
    }
}

export default connect(mapStateToProps)(PostListScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        // flex: 1,
        textAlign: "center",
        fontSize: 28,
        margin: 10,
        paddingTop : 20,
    },
    posts: {

        // flex: 9
    },
});
