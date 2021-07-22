import * as reduxActions from "@actions";
import { Header, Text, HistoricalItem } from "@components";
import { BaseColor, BaseConfig } from "@config";
import React, { Component } from 'react';
import { ScrollView, View, DeviceEventEmitter } from 'react-native';
import { Icon, Image, Button, Overlay } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Images } from "@assets";
import styles from './styles';
import ProgressCircle from 'react-native-progress-circle'
import * as Utils from "@utils";
import {
    HS2SModule,
    HS2SProfileModule
} from '@ihealth/ihealthlibrary-react-native';
import Carousel from 'react-native-snap-carousel';
import { FlatList } from "react-native";
const { logger } = reduxActions;

export class HS2S extends Component {
    state = {
        curRealtimeWeight: 0,
        curWeight: 0,
        historicaldata: [],
        data: {}
    }
    constructor(props) {
        super(props);
        this.params = this.props.route?.params;
        const { auth: { user, health_profile } } = this.props;
        this.str_userid = (`${user["UserProfileID"]}${Math.random() * 999999999 + 1000000000}`).substr(0, 16);
        this.gender = health_profile.Gender?.toLowerCase?.()?.search("male") >= 0 ? 0 : 1;
    }
    componentDidMount() {
        const { device: { mac } } = this.params;
        if (BaseConfig.TETSTING) {
            this.interval = 0;
            this.timer = setInterval(() => {
                this.setState({
                    curRealtimeWeight: Math.floor(Math.random() * 50) + 30
                });
                this.interval += 1;
                if (this.interval == 10) {
                    clearInterval(this.timer);
                    this.setState({
                        curWeight: Math.floor(Math.random() * 50) + 30
                    });
                    this.timer2 = setTimeout(() => {
                        this.setState({ curRealtimeWeight: 0 })
                    }, 5000);
                }
            }, 500);
            return;
        }
        this.getDeviceEmitter();
        const { auth: { user, health_profile }, units: { weight: weight_units } } = this.props;

        HS2SModule.setUnit(mac, weight_units);
        HS2SModule.updateUserInfo(mac, this.str_userid, 0, health_profile.WeightKg || 0, health_profile.Age, health_profile.Height || 0, this.gender, 0, 0);
        HS2SModule.measure(mac, user.userType || 0, this.str_userid, 0, health_profile.WeightKg || 0, health_profile.Age, health_profile.Height || 0, this.gender, 0, 0);
        // HS2SModule.resetDevice(mac);
    }
    goBack() {
        this.params?.goBack?.();
        this.props?.navigation?.goBack?.();
    }
    disconnectDevice() {
        const { device } = this.params;
        iHealth.disconnectDevice(device.mac, device.type)
            .then(res => {
                console.log("disconnected", res);
            })
            .catch(err => {
                console.error("disconnected", err);
            })
    }
    setDataState(item, callback) {
        this.setState({
            data: {
                ...this.state.data,
                ...item
            }
        }, callback);
    }
    getDeviceEmitter() {
        DeviceEventEmitter.removeAllListeners();
        DeviceEventEmitter.addListener(HS2SModule.Event_Notify, event => {
            logger.log("Emitter => ", event);
            // const emitter = [HS2SProfileModule.ACTION_GET_DEVICE_INFO, HS2SProfileModule.ACTION_SET_UNIT_SUCCESS, HS2SProfileModule.ACTION_CREATE_OR_UPDATE_USER_INFO, HS2SProfileModule.ACTION_DELETE_USER_INFO, HS2SProfileModule.ACTION_DELETE_HISTORY_DATA, HS2SProfileModule.ACTION_SPECIFY_USERS, HS2SProfileModule.ACTION_RESTORE_FACTORY_SETTINGS, HS2SProfileModule.ACTION_HS2S_MEASURE_HEARTRATE];
            // if (event.action in emitter) {
            //     console.log("Emitter => ", event);
            //     return;
            // }
            switch (event.action) {
                case "action_get_battery_hs":
                    this.setDataState({ battery: event[HS2SProfileModule.BATTERY_HS] });
                    break;
                case "action_anonymous_data":
                    this.updateHistory(event['history_data']);
                    break;
                case "action_history_data":
                    this.updateHistory(event['history_data']);
                    break;
                case HS2SProfileModule.ACTION_ONLINE_REAL_TIME_WEIGHT:
                    this.setState({ curRealtimeWeight: event["weight"] });
                    break;
                case HS2SProfileModule.ACTION_ONLINE_RESULT:
                    this.setState({ curWeight: event["weight"] });
                    this.timer2 = setTimeout(() => {
                        this.setState({ curRealtimeWeight: 0 })
                    }, 5000);
                    break;
                case "action_body_fat_result":
                    this.updateBodyfat(event[HS2SProfileModule.DATA_BODY_FAT_RESULT]);
                    break;
                case HS2SProfileModule.ACTION_MEASURE_FINISH_AT_CRITICAL:
                    this.updateBodyfat({ error: true });
                    break;
                case HS2SProfileModule.ACTION_HS2S_EXIT_MEASURE_HEARTRATE_STATUS:
                    this.updateHeartrate(event[HS2SProfileModule.HS2S_MEASURE_HEARTRATE_RESULT])
                    break;
                default:
                    break;
            }
        });
    }
    scaleDevices(type, result) {
        if (result.weight > 0) {
            this.props.setWeight(result?.weight || 0);
            this.setState({ curWeight: result.weight });
            setTimeout(() => {
                this.setState({ curRealtimeWeight: 0 })
            }, 5000);
        } else if (result.realtime_weight > 0) {
            this.setState({ curRealtimeWeight: result.realtime_weight });
        } else if (result.history) {
            this.updateScaleHistory(result.history);
        } else if (result.body_fat) {
            this.updateBodyfat(result.body_fat);
        } else if (result.heartrate) {
            this.updateHeartrate(result.heartrate);
        }
    }
    updateHistory(data) {
        this.setState({ loading: false, historicaldata: data });
        // fat_weight, fat_control, weight_control, standard_weight, skeletal_muscle_mass, body_water_rate, muscle_mas, instruction_type, body_building, height, gender, muscle_control, physical_age, visceral_fat_grade, protein_rate, bone_salt_content, visceral_fat_grade, measure_time, age, impedance, weight
    }
    updateBodyfat(data) {
        if (data.error) return;
        const fatvalue = data["fat_weight"];
        const watevalue = data["body_water_rate"];
        const musclevalue = data["muscle_mas"];
        const height = data["height"];
        const bonevalue = data["bone_salt_content"];
        const weight = data["weight"];
        // const visceral_fat_grade = data["visceral_fat_grade"];
        // const fat_control = data["fat_control"];
        // const weight_control = data["weight_control"];
        // const standard_weight = data["standard_weight"];
        // const skeletal_muscle_mass = data["skeletal_muscle_mass"];
        // const instruction_type = data["instruction_type"];
        // const body_building = data["body_building"];
        // const gender = data["gender"];
        // const muscle_control = data["muscle_control"];
        // const physical_age = data["physical_age"];
        // const protein_rate = data["protein_rate"];
        // const measure_time = data["measure_time"];
        // const age = data["age"];
        // const impedance = data["impedance"];

        const bmi = Utils.getBMI(height, weight, true);
        const {
            auth: {
                user: { ClinicID: clinicid, RestaurantProfileID: restaurantid, UserProfileID: userprofileid },
            },
            units
        } = this.props;

        const cur_weight_unit = BaseConfig.UNITS['weight'][units.weight];
        const weightibs = convertUnits(weight, cur_weight_unit, 1);
        const todaysdate = "";
        const timerecorded = "";
        const comments = "";
        const heartrate = this.heartrate;

        const scaledata = {
            userprofileid, restaurantid, clinicid, bmi, bonevalue, fatvalue, musclevalue, watevalue, weightkg: weight, weightibs, todaysdate, timerecorded, comments, heartrate
        };
        // if (this.heartrate) {
        this.props.navigation.navigate("ScaleResult", { data: scaledata });
        // } else {
        // this.scaledata = scaledata;
        // }
    }
    updateHeartrate({ status, heartrate }) {
        if (this.scaledata) {
            this.scaledata.heartrate = heartrate;
            this.props.navigation.navigate("ScaleResult", { data: this.scaledata });
        } else {
            this.heartrate = heartrate;
        }
    }
    renderConnect() {
        const { loading } = this.state;
        return (
            <>
                <Header
                    title={"About"}
                    renderLeft={
                        <Icon name={'times'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
                    }
                    onPressLeft={this.goBack.bind(this)}
                    loading={loading}
                    renderRight={
                        <Icon name={'cog'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
                    }
                    onPressRight={() => {
                        HS2SModule.getBattery(this.params.device.mac);
                        this._carousel.snapToItem(2)
                    }}
                />
                <ScrollView style={{ padding: 40 }} contentContainerStyle={{ alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                        <Icon name={'check-circle'} size={30} type={'feather'} color={BaseColor.primaryColor} />
                        <Text title3 blackColor>   The device is connected.</Text>
                    </View>
                    <Text headline blackColor>Stand on scale with bare foot</Text>
                    <Image source={Images.connect_success} style={{ width: 260, height: 260 }} resizeMode={'contain'} />
                </ScrollView>
                <Button
                    containerStyle={{ marginBottom: 60, marginHorizontal: 40 }}
                    buttonStyle={{ paddingHorizontal: 60, paddingVertical: 10 }}
                    title="History Data   "
                    icon={<Icon name={'settings'} type={'octicon'} color={BaseColor.primaryColor} size={20} />}
                    iconPosition={'right'}
                    type={'outline'}
                    onPress={this.goHistoricalData.bind(this)}
                />
            </>
        )
    }
    goHistoricalData() {
        this.setState({ loading: true });
        this._carousel.snapToItem(1)
        const { device: { mac } } = this.params;
        HS2SModule.getAnonymousMemoryData(mac);
        HS2SModule.getMemoryData(mac, this.str_userid);
    }
    renderHistory() {
        const { historicaldata, loading } = this.state;
        return (
            <>
                <Header
                    title={"History"}
                    renderLeft={
                        <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
                    }
                    loading={loading}
                    onPressLeft={() => this._carousel.snapToItem(0)}
                />
                <FlatList
                    data={historicaldata}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <HistoricalItem />
                        )
                    }}
                />
            </>
        )
    }
    renderBattery(percent, showtxt) {
        if (percent > 0) { }
        else percent = 0;
        let color = BaseColor.primaryColor;
        if (percent <= 20) {
            color = BaseColor.redColor;
        } else if (percent <= 30) {
            color = BaseColor.dangerColor;
        }
        const borderColor = percent == 0 ? BaseColor.redColor : BaseColor.grayColor;
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 24 }}>
                {showtxt && <Text style={{ color, marginRight: 10 }}>{`${percent}%`}</Text>}
                <View style={{ width: 40, height: 24, borderColor, borderWidth: .8 }}>
                    <View style={{ width: `${percent}%`, backgroundColor: color, height: "100%" }}>
                    </View>
                    <View style={{ height: 17, width: 6, borderColor, borderWidth: .4, borderLeftWidth: 0, position: "absolute", top: 3, right: -6 }}></View>
                </View>
            </View>
        )
    }
    renderSettings() {
        const { loading, data: { battery } } = this.state;
        return (
            <>
                <Header
                    title={"Settings"}
                    renderLeft={
                        <Icon name={'angle-left'} size={30} type={'font-awesome'} color={BaseColor.whiteColor} />
                    }
                    loading={loading}
                    onPressLeft={() => this._carousel.snapToItem(0)}
                />
                <View style={{ flex: 1, flexDirection: "row", padding: 20, }}>
                    <Text headline bold style={{ flex: 1 }}>Battery</Text>
                    {this.renderBattery(battery, true)}
                </View>
            </>
        )
    }
    render() {
        const { curRealtimeWeight, curWeight } = this.state;
        const data = [
            this.renderConnect(),
            this.renderHistory(),
            this.renderSettings()
        ]
        return (
            <SafeAreaView style={styles.container}>
                <Carousel
                    ref={ref => this._carousel = ref}
                    sliderWidth={Utils.getDeviceWidth()}
                    itemWidth={Utils.getDeviceWidth()}
                    scrollEnabled={false}
                    data={data}
                    renderItem={({ item, index }) => item}
                />
                <Overlay visible={curRealtimeWeight > 0}>
                    <ProgressCircle
                        percent={(curWeight || curRealtimeWeight) / 2}
                        radius={80}
                        borderWidth={15}
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{`${curWeight || curRealtimeWeight} kg`}</Text>
                    </ProgressCircle>
                </Overlay>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = {
    ...reduxActions
}

export default connect(mapStateToProps, mapDispatchToProps)(HS2S)
