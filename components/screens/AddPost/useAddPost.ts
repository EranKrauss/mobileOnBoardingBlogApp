import {Post} from "../../../types";
import {useState} from "react";
import {useNavigationButtonPress} from "react-native-navigation-hooks";
import {Navigation} from "react-native-navigation";
import AddPostActions from "./AddPostActions";

const useAddPost = (componentId: string, post?: Post, setPost?: (post: Post) => void) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [text, setText] = useState(post ? post.text : '');


    const onChangeTitle = (newTitle: string) => {
        AddPostActions.onChangeTitle(componentId, newTitle)
        setTitle(newTitle);
    };

    const onChangeText = (text: string) => {
        setText(text);
    };

    const onSavePressed = () => {

            AddPostActions.onSavePressed(
                componentId,
                title,
                text,
                post,
                setPost
            );

    };

    useNavigationButtonPress(
        (e) => {
            if (e.buttonId === 'cancelBtn') {
                Navigation.dismissModal(componentId);
            } else {
                onSavePressed();
            }
        },
        {componentId},
    );

    return {
        title,
        onChangeTitle,
        text,
        onChangeText,
    }

}

export default useAddPost;
