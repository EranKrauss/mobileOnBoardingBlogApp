import {Navigation} from 'react-native-navigation';

export function registerScreens() {

  Navigation.registerComponent('blog.PostsList', () => require('./PostListScreen').default);
  Navigation.registerComponent('blog.AddPost', () => require('./AddPostScreen').default);
  Navigation.registerComponent('blog.ViewPost', () => require('./ViewPostScreen').default);

}
