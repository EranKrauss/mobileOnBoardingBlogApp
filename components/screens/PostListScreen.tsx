import React, {useEffect} from "react";
import {  StyleSheet, ScrollView} from "react-native";
import {View, Text} from 'react-native-ui-lib';
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
                            }
                        }
                    }]
                }
            });
        },
        {buttonId: 'addPost'}
    )


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
             <Text style={styles.title}>
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
