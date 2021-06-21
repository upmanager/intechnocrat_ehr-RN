import { BaseColor, Typography } from "@config";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      //props style
      header,
      title1,
      title2,
      title3,
      headline,
      body1,
      body2,
      callout,
      subhead,
      footnote,
      caption1,
      caption2,
      overline,
      // props font
      bold,
      //custom color
      primaryColor,
      whiteColor,
      grayColor,
      blackColor,
      redColor,
      transparent,
      lightGrayColor,
      infoColor,
      dangerColor,
      // 
      flexCenter,
      flexLeft,
      flexRight,
      numberOfLines,
      //custom
      style
    } = this.props;

    return (
      <Text
        style={StyleSheet.flatten([
          header && Typography.header,
          title1 && Typography.title1,
          title2 && Typography.title2,
          title3 && Typography.title3,
          headline && Typography.headline,
          body1 && Typography.body1,
          body2 && Typography.body2,
          callout && Typography.callout,
          subhead && Typography.subhead,
          footnote && Typography.footnote,
          caption1 && Typography.caption1,
          caption2 && Typography.caption2,
          overline && Typography.overline,
          //custom for font
          bold && StyleSheet.flatten({ fontWeight: 'bold' }),
          // default color
          StyleSheet.flatten({ color: BaseColor.grayColor }),

          //custom for color
          primaryColor && StyleSheet.flatten({ color: BaseColor.primaryColor }),
          lightGrayColor && StyleSheet.flatten({ color: BaseColor.lightGrayColor }),
          whiteColor && StyleSheet.flatten({ color: BaseColor.whiteColor }),
          grayColor && StyleSheet.flatten({ color: BaseColor.grayColor }),
          blackColor && StyleSheet.flatten({ color: BaseColor.blackColor }),
          redColor && StyleSheet.flatten({ color: BaseColor.redColor }),
          infoColor && StyleSheet.flatten({ color: BaseColor.infoColor }),
          dangerColor && StyleSheet.flatten({ color: BaseColor.dangerColor }),
          transparent && StyleSheet.flatten({ color: BaseColor.transparent }),
          flexCenter && StyleSheet.flatten({ width: "100%", textAlign: "center" }),
          flexLeft && StyleSheet.flatten({ width: "100%", textAlign: "left" }),
          flexRight && StyleSheet.flatten({ width: "100%", textAlign: "right" }),
          style && style
        ])}
        numberOfLines={numberOfLines}
      >
        {this.props.children}
      </Text>
    );
  }
}

// Define typechecking
Index.propTypes = {
  //define style
  header: PropTypes.bool,
  title1: PropTypes.bool,
  title2: PropTypes.bool,
  title3: PropTypes.bool,
  headline: PropTypes.bool,
  body1: PropTypes.bool,
  body2: PropTypes.bool,
  callout: PropTypes.bool,
  subhead: PropTypes.bool,
  footnote: PropTypes.bool,
  caption1: PropTypes.bool,
  caption2: PropTypes.bool,
  overline: PropTypes.bool,

  //define font custom
  thin: PropTypes.bool,
  ultraLight: PropTypes.bool,
  light: PropTypes.bool,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
  semibold: PropTypes.bool,
  bold: PropTypes.bool,
  heavy: PropTypes.bool,
  black: PropTypes.bool,
  //custon for text color
  primaryColor: PropTypes.bool,
  darkPrimaryColor: PropTypes.bool,
  lightPrimaryColor: PropTypes.bool,
  primaryOpacity: PropTypes.bool,
  whiteColor: PropTypes.bool,
  grayColor: PropTypes.bool,
  dividerColor: PropTypes.bool,
  blackColor: PropTypes.bool,
  fieldColor: PropTypes.bool,
  yellowColor: PropTypes.bool,
  successColor: PropTypes.bool,
  warningColor: PropTypes.bool,
  dangerColor: PropTypes.bool,
  redColor: PropTypes.bool,
  transparent: PropTypes.bool,
  blackLightOpacity: PropTypes.bool,
  blackOpacity: PropTypes.bool,
  kashmir: PropTypes.bool,
  primary2Color: PropTypes.bool,
  primary3Color: PropTypes.bool,
  primaryBorderColor: PropTypes.bool,
  //numberOfLines
  numberOfLines: PropTypes.number,
  //custom style
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node // plain text
};

Index.defaultProps = {
  //props for style
  header: false,
  title1: false,
  title2: false,
  title3: false,
  headline: false,
  body1: false,
  body2: false,
  callout: false,
  subhead: false,
  footnote: false,
  caption1: false,
  caption2: false,
  overline: false,
  //props for font
  thin: false,
  ultraLight: false,
  light: false,
  regular: false,
  medium: false,
  semibold: false,
  bold: false,
  heavy: false,
  black: false,
  //custon for text color
  primaryColor: false,
  primaryColor: false,
  darkPrimaryColor: false,
  lightPrimaryColor: false,
  primaryOpacity: false,
  whiteColor: false,
  grayColor: false,
  dividerColor: false,
  blackColor: false,
  fieldColor: false,
  yellowColor: false,
  successColor: false,
  warningColor: false,
  dangerColor: false,
  redColor: false,
  transparent: false,
  blackLightOpacity: false,
  blackOpacity: false,
  kashmir: false,
  primary2Color: false,
  primary3Color: false,
  primaryBorderColor: false,
  //numberOfLines
  numberOfLines: 0,
  //custom style
  style: {},
  children: ""
};
