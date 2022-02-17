import {postsStore} from './posts.store';
import {Post} from "../types";

export async function fetchPosts() {
  const response = await fetch('http://localhost:3000/posts');
  const posts = await response.json();
  postsStore.setPosts(posts);
}

export async function addPost(post: Post) {
  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const postToAdd = await response.json();
  // @ts-ignore
  postsStore.addPost(postToAdd);
}

export async function removePost(post : Post){
  const response = await fetch('http://localhost:3000/posts', {
    method: 'REMOVE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const postToDelete = await response.json();
  // @ts-ignore
  postsStore.removePost(postToDelete);
}
