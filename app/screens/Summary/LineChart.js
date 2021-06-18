import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
//If you have not Expo import https://github.com/react-native-community/react-native-svg
import Svg, {
    Circle,
    G,
    Line,
    Path, Rect, Text
} from 'react-native-svg';

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        const { width, height, chart } = this.props;
        this.state = {
            minValue: chart.options.minValue,
            maxValue: chart.options.maxValue,
            variation: 0,
            margin: chart.options.margin,
            labelWidth: chart.options.labelWidth,
            stepX: 0,
            stepY: 0,
            width: width,
            height: height,
            values: chart.values,
            colors: chart.colors,
            length: chart.axis.length,
            axis: chart.axis,
            showAxis: chart.showAxis,
            horizontalLines: []
        };

        this.buildChart();
    }

    UNSAFE_componentWillUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }


    buildChart() {
        const { width, height, chart: { options: { margin, maxValue, minValue }, axis } } = this.props;
        const length = axis.length;

        let horizontalLines = [];
        let variation = 0;

        variation = (minValue * -1) + maxValue;

        horizontalLines.push(minValue);
        horizontalLines.push(maxValue);
        if (minValue < -1)
            horizontalLines.push(0);

        let stepX = (width - (margin.left + margin.right)) / (length - 1 || 1);
        let stepY = (height - (margin.top + margin.bottom)) / variation;

        this.state.variation = variation;
        this.state.stepX = stepX;
        this.state.stepY = stepY;
        this.state.horizontalLines = horizontalLines;
    }

    buildPath = (values) => {
        const { chart: { options: { margin, minValue } } } = this.props;
        const { stepX, stepY } = this.state;

        let firstPoint = true;
        let path = "";
        values.forEach((number, index) => {
            let x = (index * stepX) + margin.left;
            let y = -(((number - minValue) * stepY) + margin.bottom);
            if (firstPoint) path += "M" + margin.left + " " + y;
            else path += " L" + x + " " + y;
            firstPoint = false;
        });
        return path;
    };

    buildPolygon = (values) => {
        const { chart: { options: { margin, minValue, axis } } } = this.props;
        const length = axis.length;
        const { stepX, stepY } = this.state;

        let firstPoint = true;
        let start = -(((minValue * -1) * stepY) + margin.bottom);
        let path = margin.left + "," + start;
        values.forEach((number, index) => {
            let x = (index * stepX) + margin.left;
            let y = -(((number - minValue) * stepY) + margin.bottom);
            if (firstPoint) path += " " + margin.left + "," + y;
            else path += " " + x + "," + y;
            firstPoint = false;
        });

        path += " " + (((length - 1) * stepX) + margin.left) + "," + start;
        path += " " + margin.left + "," + start;
        return path;
    };

    getPosition(itemval, itemindex) {
        const { chart: { options: { margin, minValue } } } = this.props;
        const { stepX, stepY } = this.state;

        let x = (itemindex * stepX) + margin.left
        let y = -(((itemval - minValue) * stepY) + margin.bottom);
        return { x: x, y: y };
    }
    render() {
        const {
            width,
            height,
            chart: {
                values,
                colors,
                backgroundColor,
                options: {
                    margin,
                    minValue,
                    labelWidth
                },
                showAxis,
                axis,
            }
        } = this.props;
        const length = axis.length;

        const {
            variation,
            stepX,
            stepY,
            horizontalLines,
        } = this.state;
        const background = axis.map((_, i) => {
            if (i == 0) return <></>;
            const fill = colors.fillColor[i % colors.fillColor.length];
            return <Rect key={`rect_${i}`} x={(i - 1) * stepX + margin.left} y={-height + margin.top} width={stepX} height={height - margin.bottom - margin.top} fill={fill} />
        });
        const lines = values.map((item, i) => {
            let strokeWidth = 1;
            let stroke = colors.strokeColor[i];
            let path = (<Path key={`path_${i}`} d={this.buildPath(item)} fill="none" stroke={stroke} strokeWidth={strokeWidth} />)
            return <G key={`lines_${i}`}>{path}</G>;
        });
        const circles = values.map((item, i) => {
            return item.map((itemval, itemindex) => {
                let color = colors.strokeColor[i];
                try {
                    color = colors.strokeColors[i][itemindex];
                } catch (error) {
                }
                let position = this.getPosition(itemval, itemindex);
                let x = position.x;
                let y = position.y;
                let key = "circle_" + i + "_" + itemindex;
                return (<Circle key={key} cx={x} cy={y} r="4" fill={color} />);
            });
        });

        const axisX = axis.map((_, i) => {
            let strokeColor = colors.axisColor;
            if (showAxis || i == 0) {
                return (<Line key={"axisx_" + i} x1={(i * stepX) + margin.left} y1={-(margin.bottom)} x2={(i * stepX) + margin.left} y2={-(stepY * variation) - (margin.bottom)} stroke={strokeColor} strokeWidth={0.5} />)
            }
            return (<Line key={"axisx_" + i} ></Line>);
        });
        const axisH = horizontalLines.map((item, i) => {
            return (<Line key={"axish_" + i} x1={0} y1={-(((item - minValue) * stepY) + margin.bottom)} x2={(length * stepX) + margin.left} y2={-(((item - minValue) * stepY) + margin.bottom)} stroke={colors.axisColor} strokeWidth="0.5" />)
        });
        const axisHLabel = horizontalLines.map((item, i) => {
            return (
                <Text key={"axislabel_" + i} fill={colors.axisTextColor} stroke="none" fontSize="12" fontWeight="normal" x={margin.left - 7} y={-(((item - minValue) * stepY) + margin.bottom + (i == 0 ? 6 : -16))} textAnchor="end">{item}</Text>
            )
        });
        const axisXLabel = axis.map((item, i) => {
            let each = Math.round(labelWidth / stepX);
            if (i != length && (i == 0 || (i % each == 0)))
                return <Text key={"axislabel_" + i} fill={colors.axisTextColor} stroke="none" fontSize="12" fontWeight="normal" x={(i * stepX) + margin.left} y={-(margin.bottom - 15)} textAnchor="middle">{item}</Text>
        });

        return (
            <View style={styles.container} onLayout={this.onLayout}>
                <Svg width={width} height={height}>
                    <G x={0} y={height}>
                        <Rect key={"background"} x={0} y={-height} width={width} height={height} fill={backgroundColor} />
                        {background}
                        {axisH}
                        {axisHLabel}
                        {axisX}
                        {axisXLabel}
                        {lines}
                        {circles}
                    </G>
                </Svg>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    }
});