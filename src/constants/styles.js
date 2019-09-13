import { Dimensions } from "react-native";

const dimensions = Dimensions.get('window');

export const theme = {
  color: {
    primary: '#44ab4a',
    secondary: 'white',
    secondarybutton: "#f38621",
    grey: '#d5d5d5'
  },
  dimensions
}

export const fullScreen = {
  width: dimensions.width,
  height: dimensions.height
}

export const backgroundGray = {
  backgroundColor: '#f7f7f7'
}

export const backgroundPrimary = {
  backgroundColor: theme.color.primary
}

export const backgroundSecondary = {
  backgroundColor: theme.color.secondary
}

export const backgroundGrey = {
  backgroundColor: theme.color.grey
}

export const container = {
  flex: 1, 
  paddingHorizontal: 0
}

export const centeredItems = {
  justifyContent: "center",
  alignItem: "center"
}

export const floatLeft = {
  padding: 5, 
  flexDirection: "row"
}

export const formGroup = {
  marginTop: 20,
  paddingBottom: 15,
  paddingLeft: 15,
  backgroundColor: 'white',
  marginHorizontal: 30,
}

export const textCenter = {
  textAlign: "center"
}

export const textRight = {
  textAlign: "right"
}

export const uppercase = {
  textTransform: "uppercase"
}

export const textBold = {
  fontWeight: "700"
}

export const borderRadius = {
  borderRadius: 5
}

export const borderRadiusButton = {
  borderRadius: 10,
  marginHorizontal: 30
}

export const pt10 = {
  paddingTop: (10/100)*dimensions.height
}

