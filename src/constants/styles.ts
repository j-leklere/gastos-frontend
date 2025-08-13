import { TextStyle } from "react-native";

export const GlobalStyles = {
  colors: {
    primary: "#000000",
    accent: "blue"
  },
  backgrounds: {
    primary: "#182130",
    secondary: "#111828",
    darkBlue: "darkblue"
  },

  // Texts
  textBase: {
    color: "white",
    fontSize: 16,
    fontWeight: 700 as TextStyle["fontWeight"]
  },

  bigText: {
    fontSize: 20,
    fontWeight: 700 as TextStyle["fontWeight"]
  },

  mediumText: {
    fontSize: 16,
    fontWeight: 500 as TextStyle["fontWeight"]
  },

  smallText: {
    fontSize: 12,
    fontWeight: 400 as TextStyle["fontWeight"]
  },

  // Font weights
  weight900: {
    fontWeight: 900 as TextStyle["fontWeight"]
  },
  weight700: {
    fontWeight: 700 as TextStyle["fontWeight"]
  },
  weight500: {
    fontWeight: 500 as TextStyle["fontWeight"]
  },
  weight300: {
    fontWeight: 300 as TextStyle["fontWeight"]
  },

  // Margings bottom
  hugeMarginBottom: {
    marginBottom: 30
  },
  bigMarginBottom: {
    marginBottom: 24
  },
  mediumMarginBottom: {
    marginBottom: 18
  },
  smallMarginBottom: {
    marginBottom: 12
  },
  tinyMarginBottom: {
    marginBottom: 6
  }
};

export const Colors = {
  primary100: "#f9beda",
  primary500: "#c30b64",
  primary800: "#610440",
  error100: "#fcdcbf",
  error500: "#f37c13"
};
