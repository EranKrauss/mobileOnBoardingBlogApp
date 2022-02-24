import {Post} from "./types";

const addPost = async (post :Post) => {
    const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    return await response.json() as Post;
}

const removePost = async (postId: string) => {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
    });
}

const editPost = async (post: Post) => {
    const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    return await response.json() as Post;
}

const fetchPosts = async () => {
    const response = await fetch('http://localhost:3000/posts');
    return await response.json();
}

const serverApi = {
    addPost,
    removePost,
    editPost,
    fetchPosts
}

export default serverApi;
