import {postsStore} from './posts.store';
import {Post} from "../types";
import serverApi from "../serverApi";

export async function fetchPosts() {
    const posts = await serverApi.fetchPosts();
    postsStore.setPosts(posts);
}

export async function addPost(post: Post) {
    const postToAdd = await serverApi.addPost(post);
    postsStore.addPost(postToAdd);
}

export async function removePost(postId: string) {
    await serverApi.removePost(postId);
}

export async function editPost(post: Post) {
    const postToUpdate = await serverApi.editPost(post);
    postsStore.editPost(postToUpdate);
}
