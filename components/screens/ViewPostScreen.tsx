import React, {useEffect, useState} from "react";
import {Image, StyleSheet} from "react-native";
import {View, Text, Colors, Typography, Button, BorderRadiuses} from 'react-native-ui-lib';

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

    const setPostDeep = (post: Post) => {
        const newPost = {
            id: post.id,
            title: post.title,
            text: post.text,
            img: post.text
        }
        setPost(newPost);
    }


    useEffect(() => {
        navi.mergeOptions({
            topBar: {
                title: {
                    text: "My Post"
                },
                rightButtons: [
                    {
                        id: 'editBtn',
                        text: 'edit',
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
                            post: post,
                            setPost: setPostDeep
                        }
                    }
                }]
            }
        })
    }, {buttonId: 'editBtn'})

    const navigateToPostListScreen = () => {
        navi.push({
            component: {
                name: "blog.PostsList"
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
        <View flex spread padding-24>
            <View>
                <View row spread>
                    <Text text40 purple10 marginB-12 testID="post-title">{post.title}</Text>
                    <Image
                        source={{uri: post.img}}
                        style={styles.image}
                    />
                </View>
                <Text text65 dark20 marginT-22  testID="post-content" style={{lineHeight : 0}}>{post.text}</Text>
            </View>
            <Button
                label="Delete Post"
                fullWidth
                text80
                red20
                bg-red70
                marginT-5
                borderRadius={30}

                onPress={deletePressHandler}
            />
        </View>
    )
        ;
})

export default ViewPostScreen;

const styles = {
    title: {
        ...Typography.text40,
        color: Colors.purple10,
        textAlign: 'center',
        marginTop: 23,
    },
    text: {
        ...Typography.text60,
        color: Colors.black10,
        // textAlign: 'center',
        marginTop: 5,
    },
    image: {
        width: 54,
        height: 54,
        borderRadius: BorderRadiuses.br20,
        marginHorizontal: 14,
    }

}
