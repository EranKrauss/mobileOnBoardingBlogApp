import * as navi from '../../../navigation/navigation';
import {Post} from "../../../types";
import * as postsActions from '../../../stores/posts.actions';

const onChangeTitle = (componentId: string, newTitle: string) => {
    navi.mergeOptions({
        componentId,
        options: {
            topBar: {
                rightButtons: [
                    {
                        id: 'saveBtn',
                        text: 'save',
                        testID: "save-post-btn",
                        enabled: newTitle !== '',
                    }
                ]
            }
        }

    })
}

const onSavePressed = (componentId: string,
                       title: string,
                       text: string,
                       post?: Post,
                       setPost? : (post : Post) => void
) => {
    if(post && setPost){
        post.title = title;
        post.text = text;
        setPost(post);
        postsActions.editPost(post);
    }
    else{
        const randomImageNumber = Math.floor((Math.random() * 500) + 1);
                postsActions.addPost({
                    id: "",
                    title: title,
                    text: text,
                    img: `https://picsum.photos/200/200/?image=${randomImageNumber.toString()}`
                });
    }
    navi.dismissModal(componentId);
}

export type ActionsType = {
    onChangeTitle: (componentId: string, newTitle: string) => void
    onSavePressed: (
        componentId: string,
        title: string,
        text: string,
        post?: Post,
        setPost? : (post : Post) => void
    ) => void
};

const AddPostActions: ActionsType = {
    onChangeTitle,
    onSavePressed
};

export default AddPostActions;
