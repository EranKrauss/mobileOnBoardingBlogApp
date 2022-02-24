import * as ServerApi from '../serverApi';

describe('posts actions', () => {

    let postsActions : any, mockStore : any, mockFetchPosts : any, mockAddPost : any, mockDeletePost : any, mockEditPost: any;

    const mockPosts = [
        {
            id: 1,
            title: 'Post 1',
            text: 'Post 1 text',
            img: 'https://picsum.photos/200/200/?image=977'
        },
        {
            id: 2,
            title: 'Post 2',
            text: 'Post 2 text',
            img: 'https://picsum.photos/200/200/?image=1'
        }
    ];
    const mockPost = {
        title: 'Post 3',
        text: 'Post 3 text',
        img: 'https://picsum.photos/200/200/?image=977'
    };

    beforeEach(() => {
        jest.mock('./posts.store');
        mockStore = require('./posts.store');

        mockFetchPosts = jest.fn().mockResolvedValue(mockPosts);
        mockAddPost = jest.fn().mockImplementation(post => Promise.resolve({...post, id: 'mock-id'}));
        mockDeletePost = jest.fn().mockImplementation(postId => Promise.resolve(postId));
        mockEditPost = jest.fn().mockImplementation(post => Promise.resolve(post));
        jest.mock('../serverApi', () => ({
            fetchPosts: mockFetchPosts,
            addPost: mockAddPost,
            removePost: mockDeletePost,
            editPost: jest.fn()
        }));

        postsActions = require('./posts.actions');
    });


    it('should fetch posts', async () => {
        await postsActions.fetchPosts();
        expect(mockStore.setPosts).toHaveBeenCalledWith(mockPosts);
    });

    it('should add a post', async () => {
        await postsActions.addPost(mockPost);
        expect(mockStore.addPost).toHaveBeenCalledWith({...mockPost, id: 'mock-id'});
    });

    // it('should update a post', async () => {
    //     const serverUpdatePost = require('../serverApi').editPost;
    //     await postsActions.editPost(mockPost);
    //     expect(mockStore.editPost).toHaveBeenCalledWith(mockPost);
    //     expect(serverUpdatePost).toHaveBeenCalledWith(mockPost);
    // });


    it('should delete a post', async () => {
        await postsActions.removePost('mock-id');
        expect(mockStore.delete).toHaveBeenCalledWith('mock-id');
    });


});
