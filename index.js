// /**
//  * @format
//  */

import {Navigation} from 'react-native-navigation';
import {registerScreens } from "./components/screens/screens";
import {registerLoggerForDebug} from 'remx';

registerLoggerForDebug(console.log);
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'blog.PostsList',
                            options: {
                                topBar: {
                                    rightButtons : [
                                        {
                                            id : 'addPost',
                                            title : 'add'
                                        }
                                    ],
                                    title: {
                                        text: 'Blog'
                                    },

                                }
                            }
                        }
                    }
                ],
            }
        }
    });
});
