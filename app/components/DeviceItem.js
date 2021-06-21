import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { BaseColor } from "@config";
import { Image } from 'react-native-elements';

export default class DeviceItem extends Component {
    render() {
        const { title, image, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.container, styles.shadow]}>
                <Text> {title} </Text>
                <Image
                    source={typeof image == "string" ? { uri: image } : image}
                    style={{ width: 80, height: 60, marginTop: 10 }}
                    resizeMode={'cover'}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        width: "46%",
        marginLeft: "3%",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
    shadow: {
        backgroundColor: BaseColor.whiteColor,
        shadowColor: BaseColor.blackColor,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 6,
    }
})