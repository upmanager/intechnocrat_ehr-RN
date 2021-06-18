import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { BaseColor } from "@config";
import { Image } from 'react-native-elements';

export default class DeviceItem extends Component {
    render() {
        const { name, image } = this.props;
        return (
            <View style={styles.container}>
                <Text> {name} </Text>
                <Image
                    source={{ uri: image }}
                    style={{ width: 80, height: 60, marginTop: 10 }}
                    resizeMode={'cover'}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: BaseColor.whiteColor,
        borderRadius: 8,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
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