import React from "react";
import { ScrollView, Dimensions, StyleSheet, Text } from "react-native";
const { width } = Dimensions.get("window");
const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text >{props.title}</Text>
            {props.children}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
    
        width: width,
   
    },
});

export default FormContainer;