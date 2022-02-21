import React from "react";
import {Image, Pressable, StyleSheet} from "react-native";
import {View, Text, Colors, ListItem, BorderRadiuses} from 'react-native-ui-lib';
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

        <ListItem
            //@ts-ignore
            activeBackgroundColor={Colors.purple70}
            activeOpacity={0.1}
            height={77.5}
            onPress={handlePress}
        >
            <ListItem.Part left>
                <Image
                    source={{uri: post.img}}
                    style={styles.image}
                />
            </ListItem.Part>
            <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
                <ListItem.Part containerStyle={{marginBottom: 3}}>
                    <Text dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{post.title}</Text>
                </ListItem.Part>
                <ListItem.Part>
                    <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{post.text}</Text>
                </ListItem.Part>
            </ListItem.Part>
        </ListItem>

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
})
