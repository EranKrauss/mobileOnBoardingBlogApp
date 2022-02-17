import React from "react";
import {Alert, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "react-native-navigation-hooks";
import {Post} from "../types";

export type PostCardPropsType = {
    post : Post
}
const PostCard = (props: PostCardPropsType) => {
    const navigation = useNavigation();
    const {post} = props;
    // const img = require(post.img);

    const handlePress = () => {
        console.log("click")
        navigation.push({
            component: {
                name: 'blog.ViewPost',
                passProps: {
                    post : props.post
                },
                options: {
                    topBar: {
                        title: {
                            text: props.post.title
                        }
                    }
                }
            }
        })
    };

    // @ts-ignore
    return (
        <Pressable style={styles.container} onPress={handlePress}>
            {/*<Image source={img}/>*/}
            <Text style={styles.text}>
                {post.title}
            </Text>

        </Pressable>
    );
};

export default PostCard;

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: 250,
        margin: 10,
        // padding : 50,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: "center",

    },
    text: {
        fontSize: 15
        // color : 'green'
    },
})
