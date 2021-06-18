import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseColor } from "@config";
import { Text } from "@components";

export default class Header extends Component {
    render() {
        const { renderLeft, renderRight, renderCenter, title, onPressLeft, onPressRight } = this.props;
        return (
            <View style={[styles.container, renderCenter && { paddingTop: 20 }]}>
                <View style={styles.action}>
                    {renderLeft && (
                        <TouchableOpacity onPress={onPressLeft}>
                            {renderLeft}
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: 1 }}>
                    {!!renderCenter && renderCenter}
                    {!!title && <Text title3 whiteColor flexCenter>{title}</Text>}
                </View>
                <View style={styles.action}>
                    {renderRight && (
                        <TouchableOpacity onPress={onPressRight}>
                            {renderRight}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: BaseColor.primaryColor,
        padding: 10,
        paddingTop: 50,
    },
    action: {
        width: 50,
    }
});
