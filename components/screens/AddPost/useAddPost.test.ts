import AddPostActions from "./AddPostActions";
import * as postStoreAction from '../../../stores/posts.actions'


const mock_componentId = 'mock-component-Id';
const mock_component_title = 'mock-component-title';
const mock_component_text = 'mock-component-text';
// const mock_componentId = 'mock-component-Id';
jest.mock('../../../stores/posts.actions');
jest.mock('react-native-navigation');

// @ts-ignore
describe('useAddPost test', () => {
    let mockNavigation = require('react-native-navigation').Navigation;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should call add post action when clicking on save', () => {
        AddPostActions.onSavePressed(mock_componentId, mock_component_title, mock_component_text);
        expect(postStoreAction.addPost).toHaveBeenCalledWith({
            title : mock_component_title,
            text : mock_component_text,
            img : expect.any(String),
            id :  expect.any(String),
        })
    });




    it('should enable the save button if title is not blank', () => {
        AddPostActions.onChangeTitle(mock_componentId, mock_component_title);
        expect(mockNavigation.mergeOptions).toBe(2);
    });

    // it('should not enable the save button if title is blank', () => {});
    // it('should dismiss the modal when clicking on save', () => {});

});
