import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import {useNavigation, withNavigationProvider} from "react-native-navigation-hooks";
import {Post} from "../../types";
import {removePost} from "../../stores/posts.actions";

export type ViewPostScreenPropsType = {
    post: Post
}
const ViewPostScreen = withNavigationProvider((props: ViewPostScreenPropsType) => {
    const navi = useNavigation();

    const navigateToPostListScreen = () => {
        navi.push({
            component : {
                name : "blog.PostsList"
            }
        })
    }
    const deletePressHandler = () => {
        removePost(props.post.id)
            .then(res => {
                console.log("Post deleted");
                navigateToPostListScreen()
            })
            .catch(err => {
                console.error("ViewPostScreen  >  >  deletePressHandler  >  error details: " + err.message);
                navi.pop();
            })
    }
    return (
        <View style={styles.container}>
                <Text style={styles.text}>{props.post.text}</Text>
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
