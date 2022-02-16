import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, withNavigationProvider } from "react-native-navigation-hooks";

const ViewPostScreen = withNavigationProvider((props : any) => {
  console.log("hey there", props)
  const navi = useNavigation();
  const deletePressHandler = () => {
    navi.pop();
  }
  return(
    <View>
      <Text>Add Post Screen</Text>
      <Button title='delete' onPress={deletePressHandler}/>
    </View>
  );
})

export default ViewPostScreen;

const styles = StyleSheet.create({
  container : {

  }
});
