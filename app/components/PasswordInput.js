import React, { Component } from 'react';
import { TextInput, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

export default class PasswordInput extends Component {
    render() {
        return (
            <>
                <TextInput {...this.props} />
                <TouchableOpacity style={{ padding: 5 }} onPress={this.props.onVisiblePassword}>
                    {this.props.isVisiblePassword ?
                        <Icon name={'eye-with-line'} type={'entypo'} />
                        :
                        <Icon name={'eye'} type={'entypo'} />
                    }
                </TouchableOpacity>
            </>
        )
    }
}
