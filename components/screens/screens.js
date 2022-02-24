import {Navigation} from 'react-native-navigation';

export function registerScreens() {

  Navigation.registerComponent('blog.PostsList', () => require('./PostsList/PostListScreen').default);
  Navigation.registerComponent('blog.AddPost', () => require('./AddPost/AddPostScreen').default);
  Navigation.registerComponent('blog.ViewPost', () => require('./ViewPost/ViewPostScreen').default);

}
