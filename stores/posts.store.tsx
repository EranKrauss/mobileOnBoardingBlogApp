import React from "react";
import * as rmx from 'remx';



const initialState = {
  posts : []
}
const postsState = rmx.state(initialState);

const getters = rmx.getters({
  getPosts(){
    return postsState.posts
  },
  getPostById(id : number) {
    return postsState.posts.length > id ? postsState.posts[id] : undefined;
  }
});

const setters = rmx.setters({
  setPosts(posts: never[]) {
    postsState.posts = posts;
  },
  addPost(post : never) {
    postsState.posts = [...postsState.posts, post];
  }
});

export const postsStore = {
  ...getters,
  ...setters
}

