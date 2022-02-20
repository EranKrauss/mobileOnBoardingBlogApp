import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import {useNavigation, useNavigationButtonPress, withNavigationProvider} from "react-native-navigation-hooks";
import {Post} from "../../types";
import {removePost} from "../../stores/posts.actions";
import {Navigation} from "react-native-navigation";

export type ViewPostScreenPropsType = {
    post: Post
}
const ViewPostScreen = withNavigationProvider((props: ViewPostScreenPropsType) => {
    const navi = useNavigation();
    const [post, setPost] = useState(props.post);

    const setPostDeep = (post : Post) => {
        const newPost = {
            id : post.id,
            title : post.title,
            text : post.text,
            img : post.text
        }
        setPost(newPost);
    }


    useEffect(() => {
        navi.mergeOptions({
            topBar : {
                title : {
                    text : post.title
                },
                rightButtons : [
                    {
                        id : 'editBtn',
                        text : 'edit',
                    }
                ]
            }
        })
    }, [post])

    useNavigationButtonPress(() => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'blog.AddPost',
                        passProps: {
                            post : post,
                            setPost : setPostDeep
                        }
                    }
                }]
            }
        })
    }, {buttonId : 'editBtn'})

    const navigateToPostListScreen = () => {
        navi.push({
            component : {
                name : "blog.PostsList"
            }
        })
    }
    const deletePressHandler = () => {
        removePost(post.id)
            .then(() => {
                navigateToPostListScreen()
            })
            .catch(err => {
                console.error("ViewPostScreen  >  >  deletePressHandler  >  error details: " + err.message);
                navi.pop();
            })
    }
    return (
        <View style={styles.container}>
                <Text style={styles.text}>{post.text}</Text>
            <View style={styles.button}>
                <Button title='delete' onPress={deletePressHandler}/>
            </View>
        </View>
    );
})

export default ViewPostScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1
    },
    text : {
        flex : 9,
        alignItems : "center",
        textAlign : 'center',
        fontSize : 40,
        paddingTop : 20
    },
    button : {
        flex : 1

    }
});
