import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import {useNavigation, withNavigationProvider} from "react-native-navigation-hooks";
import {Post} from "../../types";

export type ViewPostScreenPropsType = {
    post: Post
}
const ViewPostScreen = withNavigationProvider((props: ViewPostScreenPropsType) => {
    const navi = useNavigation();
    const deletePressHandler = () => {
        navi.pop();
    }
    return (
        <View style={styles.container}>
            {/*<View >*/}
                <Text style={styles.text}>{props.post.text}</Text>
            {/*</View>*/}
            <View style={styles.button}>
                <Button title='delete' onPress={deletePressHandler}/>
            </View>
        </View>
    );
})

export default ViewPostScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1
    },
    text : {
        flex : 9,
        alignItems : "center",
        textAlign : 'center',
        fontSize : 40,
        paddingTop : 20
    },
    button : {
        flex : 1

    }
});
