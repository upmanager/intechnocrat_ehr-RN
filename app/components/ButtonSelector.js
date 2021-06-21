import React, { useRef, useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import Picker from '@gregfrench/react-native-wheel-picker';
import { Text } from "@components";
const ALLWEEKS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ButtonSelector(props) {
    const { data, values, onDone, visible, onClose } = props;
    const [pickers, setpickers] = useState([]);
    const [curSelected, setSelect] = useState({});
    const RBSheetRef = useRef(null)
    useEffect(() => {
        if (visible) {
            RBSheetRef?.current?.open();
        } else {
            RBSheetRef?.current?.close();
        }
    }, [visible]);
    useEffect(() => {
        let picker_data = data?.map(item => {
            let list = null;
            if ("list" in item) list = item.list;
            else if ("maxValue" in item && "minValue" in item) {
                list = Array.apply(null, Array(item.maxValue - item.minValue + 1))
                    .map((_, i) => i + item.minValue);
            } else if ("startweek" in item) {
                list = [...ALLWEEKS.slice(item.startweek, ALLWEEKS.length), ...ALLWEEKS.slice(0, item.startweek)];
            }
            return { ...item, list };
        })
            .filter(item => item);
        setpickers(picker_data);
    }, [data]);

    useEffect(() => {
        if (pickers?.length > 0) {
            let selected_value = {};
            pickers?.map(item => (
                selected_value = {
                    ...selected_value,
                    [item.key]: item.list?.indexOf?.(values[item.key])
                }
            ));
            setSelect(selected_value);
        }

    }, [values, pickers])

    const onPickerSelect = (index, key) => {
        curSelected[key] = index;
        setSelect(curSelected);
    }
    const onDoneSelect = () => {
        let selected_value = {};
        pickers?.map(item => (
            selected_value = {
                ...selected_value,
                [item.key]: item.list[curSelected[item.key]]
            }
        ));
        RBSheetRef.current.close();
        onDone(selected_value);
    }
    return (
        <RBSheet
            ref={RBSheetRef}
            height={250}
            openDuration={250}
            customStyles={{ container: styles.container }}
            onClose={onClose}
        >
            <View style={styles.toolbar}>
                <TouchableOpacity onPress={onClose}>
                    <Text primaryColor headline bold>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDoneSelect}>
                    <Text primaryColor headline bold>Done</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.pickers}>
                {pickers?.map((item, index) => (
                    <Picker
                        key={`picker_${index}`}
                        style={styles.picker}
                        selectedValue={curSelected[item.key]}
                        itemStyle={styles.pickerItem}
                        onValueChange={(index) => onPickerSelect(index, item.key)}>
                        {item.list.map((value, i) => (
                            <Picker.Item label={`${item.prefix || ''}${value}${item.suffix || ''}`} value={i} key={`picker_${item.key}_${i}`} />
                        ))}
                    </Picker>

                ))}
            </View>
        </RBSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    toolbar: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: "#ddd",
        padding: 10
    },
    pickers: {
        flex: 1,
        flexDirection: "row"
    },
    picker: {
        flex: 1,
        marginHorizontal: 20
    },
    pickerItem: {
        color: "black",
        fontSize: 20
    }
});