import React, {useEffect, useState} from "react";
import {View, Text, TextField} from 'react-native-ui-lib';
import {StyleSheet, TextInput} from "react-native";
import {Navigation} from "react-native-navigation";
import {useNavigationButtonPress, useNavigation, withNavigationProvider} from "react-native-navigation-hooks";
import * as postsActions from '../../stores/posts.actions'
import {Post} from "../../types";


export type AddPostScreenPropsType = {
    componentId: string
    setPost?: (post: Post) => void
    post?: Post
}

const AddPostScreen = withNavigationProvider((props: AddPostScreenPropsType) => {
    const [title, setTitle] = useState(props.post ? props.post.title : '');
    const [text, setText] = useState(props.post ? props.post.text : '');
    const navi = useNavigation();
    useEffect(() => {
        Navigation.mergeOptions(props.componentId, {
            topBar: {
                title: {
                    text: props.post ? "Edit Posrt" : "Add Post",
                },
                rightButtons: [{
                    id: "saveBtn",
                    text: "Save",
                    enabled: false,
                }],
                leftButtons: [{
                    id: "cancelBtn",
                    text: "cancel",
                }],
            },
        });
    }, []);


    useNavigationButtonPress(() => {
        //edit
        if (props.post && props.setPost) {
            props.post.title = title;
            props.post.text = text;
            props.setPost(props.post);
            postsActions.editPost(props.post);
        }
        //create
        else {
            const randomImageNumber = Math.floor((Math.random() * 500) + 1);
            postsActions.addPost({
                id: "",
                title: title,
                text: text,
                img: `https://picsum.photos/200/200/?image=${randomImageNumber.toString()}`
            });
        }
        // @ts-ignore
        navi.dismissModal(props.componentId);
    }, {buttonId: "saveBtn"});

    useNavigationButtonPress(() => {
        navi.dismissModal();
    }, {buttonId: "cancelBtn"});

    const onChangeTitle = (title: string) => {
        setTitle(title);
        navi.mergeOptions({
            topBar: {
                rightButtons: [{
                    id: 'saveBtn',
                    text: 'Save',
                    enabled: !!title
                }]
            }
        });
    };

    const onChangeText = (text: string) => {
        setText(text);
    };


    return (
        <View
            flex  padding-24
        >
                <Text text40 purple10 marginB-12>{props.post ? "Edit Post" : "Add Post"}</Text>
                <TextField
                    text70
                    containerStyle={{marginBottom: 12}}
                    floatingPlaceholder
                    placeholder="Add a Catchy Title"
                    onChangeText={onChangeTitle}
                    floatOnFocus
                    value={title}
                />
                <TextField
                    text70
                    floatingPlaceholder
                    placeholder="This is the beginning of a great post"
                    onChangeText={onChangeText}
                    expandable
                    value={text}
                />
        </View>
    );
});

export default AddPostScreen;

const styles = StyleSheet.create({

});
