import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Navigation } from "react-native-navigation";
import { useNavigationButtonPress, useNavigation, withNavigationProvider } from "react-native-navigation-hooks";
import * as postsActions from '../../stores/posts.actions'

const AddPostScreen = withNavigationProvider((props: any) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navi = useNavigation();
  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {
          text: "Add Post",
        },
        rightButtons: [{
          id: "saveBtn",
          text: "Save",
          enabled: false,
        }],
        leftButtons: [{
          id: "cancelBtn",
          text: "cancel",
        }],
      },
    });
  }, []);


  useNavigationButtonPress(() => {
    navi.dismissModal(props.componentId);
    const randomImageNumber = Math.floor((Math.random() * 500) + 1);
    postsActions.addPost({
      id : "",
      title : title,
      text : text,
      img: `https://picsum.photos/200/200/?image=${randomImageNumber.toString()}`
    });
  }, { buttonId: "saveBtn" });

  useNavigationButtonPress(() => {
    navi.dismissModal();
  }, { buttonId: "cancelBtn" });

  const onChangeTitle = (title : string) => {
    setTitle(title);
    navi.mergeOptions({
      topBar: {
        rightButtons: [{
          id: 'saveBtn',
          text: 'Save',
          enabled: !!title
        }]
      }
    });
  };

  const onChangeText = (text : string) => {
    setText(text);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>AddPost Screen</Text>
      <TextInput
        placeholder="Add a Catchy Title"
        style={styles.titleInput}
        value={title}
        onChangeText={onChangeTitle}
      />
      <TextInput
        placeholder="This is the beginning of a great post"
        style={styles.textInput}
        value={text}
        onChangeText={onChangeText}
      />
    </View>
  );
});

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : 'orange',
    alignItems : "center",
    // alignContent : "center",
    justifyContent : "center",
  },
  title : {
    fontSize : 50
  },
  titleInput : {
    fontSize : 22
  },
  textInput : {
    alignContent : "flex-start",
    // justifyContent : "flex-start"
  },
  text: {

  },
});
