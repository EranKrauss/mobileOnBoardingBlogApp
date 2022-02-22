import {Post} from "../types";

const mockPosts: Post[] = [
    {
        id: "1",
        title: 'Post 1',
        text: 'Post 1 content',
        img: 'https://picsum.photos/200/200/?image=977',
    },
    {
        id: "2",
        title: 'Post 2',
        text: 'Post 2 content',
        img: 'https://picsum.photos/200/200/?image=1',
    },
];
const mockPost: Post = {
    id: "3",
    title: 'Post 3',
    text: 'Post 3 content',
    img: 'https://picsum.photos/200/200/?image=977',
};


// @ts-ignore
describe("post store tests", () => {
    let postsStore: any;
    beforeEach(() => {
        postsStore = require('./posts.store');
    })

    // it('should be true', () => {
    //     const posts = postsStore.getPosts();
    //     expect(1).toBe(1)
    // });

    it('should have an initial state without any posts', () => {
        expect(postsStore.getPosts()).toEqual([]);
    });

    it('should set posts', () => {
        postsStore.setPosts(mockPosts);
        expect(postsStore.getPosts()).toEqual(mockPosts);
    });
    it('should add a post', () => {
        postsStore.setPosts(mockPosts);
        postsStore.addPost(mockPost);
        expect(postsStore.getPosts()).toEqual([...mockPosts, mockPost]);
    });
    it('should delete a post', () => {
        postsStore.setPosts(mockPosts);
        postsStore.delete(mockPosts[0].id);
        expect(postsStore.getPosts()).toEqual([mockPosts[1]]);
    });
})
