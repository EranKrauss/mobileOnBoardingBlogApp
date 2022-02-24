import React, {useEffect} from "react";
import {StyleSheet, ScrollView, FlatList, Image} from "react-native";
import {View, Text, ListItem, Colors, BorderRadiuses} from 'react-native-ui-lib';
import {Navigation} from "react-native-navigation";
import {useNavigationButtonPress, withNavigationProvider} from "react-native-navigation-hooks";
import * as postsActions from '../../../stores/posts.actions';
// import {postsStore} from "../../stores/posts.store";
import {connect} from 'remx';
import PostCard from "../../PostCard";
const postsStore = require('../../../stores/posts.store');



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
                            }
                        }
                    }]
                }
            });
        },
        {buttonId: 'addPost'}
    )


    // @ts-ignore
    // const renderPost = (item: object) => <PostCard post={item}/>
    const renderPost = (post: Post) => <PostCard post={post}/>   ;
    // @ts-ignore
    const postKeyExtractor = (item: object) => `${item.id}-key`;
    const createPostsList = (posts: object[]) => {
        // @ts-ignore
        return posts.map(post => <PostCard post={post} key={post.id}/>)
    }
    // @ts-ignore
    return (

        <View flex spread padding-24>
            <Text
                text40 purple10 marginB-12 center
            >
                Post's List
            </Text>
            {props.posts.length > 0 &&
            <FlatList testID="posts-list" data={props.posts} renderItem={({item}) => renderPost(item)} keyExtractor={postKeyExtractor}/>}
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
        paddingTop: 20,
    },
    posts: {
        // flex: 9
    },
    border: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.dark60,
    },
    image: {
        width: 54,
        height: 54,
        borderRadius: BorderRadiuses.br20,
        marginHorizontal: 14,
    },
});
