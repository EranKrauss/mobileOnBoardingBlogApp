import React from "react";
import * as rmx from 'remx';
import {Post} from "../types";


type initalStateType ={
  posts : Post[]
}
const initialState : initalStateType = {
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
  setPosts(posts: Post[]) {
    postsState.posts = posts;
  },

  addPost(post : Post) {
    postsState.posts = [...postsState.posts, post];
  },

  removePost(post : Post){
    postsState.posts = postsState.posts.filter(curr => curr.id !== post.id);
  }
});

export const postsStore = {
  ...getters,
  ...setters
}

