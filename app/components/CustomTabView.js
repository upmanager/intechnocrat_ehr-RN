import React, { Component } from 'react'
import { View } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { getDeviceWidth } from "@utils";
import { ButtonGroup } from 'react-native-elements';
import { BaseColor } from "@config";

export default class CustomTabView extends Component {
    state = {
        curIndex: 0
    }
    getData(type) {
        const { data } = this.props;
        try {
            if (type == 0) {
                return data.map(item => item.title)
            } else {
                return data.map(item => item.component)
            }
        } catch (error) {
        }
        return [];
    }
    onChangeTab(curIndex) {
        this._carousel.snapToItem(curIndex, true);
        this.setState({ curIndex });
        this.props.onChangeTab?.(curIndex);
    }
    render() {
        const { curIndex } = this.state;
        return (
            <View>
                <ButtonGroup
                    onPress={this.onChangeTab.bind(this)}
                    selectedIndex={curIndex}
                    buttons={this.getData(0)}
                    containerStyle={{ marginVertical: 0, marginHorizontal: 0, height: 60 }}
                    selectedButtonStyle={{ backgroundColor: BaseColor.whiteColor }}
                    buttonContainerStyle={{ borderColor: BaseColor.transparent }}
                    selectedTextStyle={{ color: BaseColor.blackColor }}
                    textStyle={{ fontSize: 20, color: BaseColor.lightGrayColor }}
                />
                <Carousel
                    ref={ref => this._carousel = ref}
                    sliderWidth={getDeviceWidth()}
                    itemWidth={getDeviceWidth()}
                    data={this.getData(1)}
                    renderItem={({ item, index }) => item}
                />
            </View>
        )
    }
}
