import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, SafeAreaView, ScrollView, Image, TextInput, FlatList } from 'react-native'
import { Header, Text } from "@components";
import styles from './styles';
import { Icon } from "react-native-elements";
import { BaseColor, BaseConfig } from "@config";
import { Images } from "@assets";
import { ApiActions } from "@actions";
import Toast from 'react-native-simple-toast';
import { ActivityIndicator } from 'react-native';
export class ScaleResult extends Component {
    constructor(props) {
        super(props);
        const { units: { weight: weight_units } } = this.props;
        this.cur_unit = BaseConfig.UNITS.weight[weight_units];
        // const { userprofileid, restaurantid, clinicid, bmi, bonevalue, fatvalue, musclevalue, watevalue, weightkg, weightibs, todaysdate, timerecorded, comments, heartrate } = this.props.route.params.data;
        this.state = {
            loading: false,
            data: this.props.route.params.data
        }
    }
    getData() {
        const { data: { bmi, bonevalue, fatvalue, musclevalue, watevalue } } = this.state;
        return [
            { title: "Body Fat", value: `${fatvalue} %` },
            // { title: "Lean Mass", value: `${}%` },
            { title: "Body Water", value: `${watevalue} %` },
            { title: "BMI", value: `${bmi}` },
            { title: "Muscle mass", value: `${musclevalue} ${this.cur_unit.unit}` },
            { title: "BoneMass", value: `${bonevalue} ${this.cur_unit.unit}` },
        ];
    }
    calcBMI() {
        const bmi = parseFloat(this.state.data.bmi);
        var txt = "";
        var image = "";
        if (bmi < 18.5) {
            txt = "Underweight";
            image = Images.hs_result_underweight;
        } else if (bmi < 25) {
            txt = "Normal"
            image = Images.hs_result_normal;
        } else if (bmi < 30) {
            txt = "Overweight"
            image = Images.hs_result_overweight;
        } else {
            txt = "Obese"
            image = Images.hs_result_obese;
        }
        return { txt, image };
    }
    goBack() {
        this.props.navigation.goBack()
    }
    save() {
        this.setState({ loading: true }, () => {
            ApiActions.createScaleDiary(this.state.data)
                .then(res => {
                    Toast.showWithGravity("Successfully saved", Toast.SHORT, Toast.TOP);
                })
                .catch(err => {
                    Toast.showWithGravity(err.message || "save scale failed", Toast.SHORT, Toast.TOP);
                })
                .finally(() => {
                    this.setState({ loading: false });
                })
        })
    }
    render() {
        const { data, data: { bmi, weightkg, comments }, loading } = this.state;
        const bmi_grap = this.calcBMI();

        return (
            <SafeAreaView style={[styles.container, { backgroundColor: BaseColor.lightWhiteColor }]}>
                <Header
                    title={'\nResult'}
                    renderLeft={<Icon name={'angle-left'} type={'font-awesome'} color={BaseColor.whiteColor} size={30} style={{ marginTop: 20 }} />}
                    renderRight={<Icon name={'save'} type={'font-awesome'} color={BaseColor.whiteColor} size={24} style={{ marginTop: 28 }} />}
                    height={130}
                    onPressLeft={this.goBack.bind(this)}
                    onPressRight={this.save.bind(this)}
                />
                <View style={{ flex: 1 }} />
                <ScrollView style={{ flex: 1, position: "absolute", top: 85, height: "100%", padding: 20 }}>
                    <View style={[styles.basicResult, styles.shadow]}>
                        <Text headline>Today 10.49 a.m</Text>
                        <Text title2 blackColor style={{ marginVertical: 10 }}>{bmi_grap.txt}</Text>
                        <Image source={bmi_grap.image} style={{ width: "100%", height: 60 }} resizeMode={'contain'} />
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <View style={{ flex: 1 }}>
                                <Text title2>Weight</Text>
                                <Text>{this.cur_unit.unit}</Text>
                            </View>
                            <Text blackColor bold style={{ fontSize: 40, marginRight: 10 }}>{weightkg}</Text>
                            <Text headline bold style={{ marginBottom: 5 }}>{'↔0.0'}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <View style={{ flex: 1 }}>
                                <Text title2>BMI</Text>
                            </View>
                            <Text blackColor bold style={{ fontSize: 40, marginRight: 40 }}>{bmi}</Text>
                        </View>
                    </View>
                    <View style={[styles.basicResult, styles.shadow, { marginVertical: 30 }]}>
                        <FlatList
                            data={this.getData()}
                            numColumns={3}
                            keyExtractor={(_, index) => index.toString()}
                            style={{ width: "100%" }}
                            renderItem={({ item, index }) => (
                                <View style={{ width: "33%", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                    <Text headline>{item.title}</Text>
                                    <Text headline bold blackColor>{item.value}</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={[styles.basicResult, styles.shadow, { marginBottom: 120 }]}>
                        <Text blackColor flexLeft headline bold>Note</Text>
                        <View style={{ flex: 1, borderWidth: .4, marginVertical: 5, borderColor: BaseColor.grayColor, width: "100%" }} />
                        <TextInput
                            style={{ width: "100%", fontSize: 14 }}
                            placeholder={"Add notes ..."}
                            value={comments}
                            onChangeText={txt => this.setState({ data: { ...data, comments: txt } })}
                        />
                    </View>
                </ScrollView>
                {loading &&
                    <View style={{ position: "absolute", backgroundColor: "#00000077", borderRadius: 8, width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={'large'} color={BaseColor.whiteColor} />
                    </View>}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleResult)
