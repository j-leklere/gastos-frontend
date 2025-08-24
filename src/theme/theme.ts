import { createTheme } from "@shopify/restyle";

export const palette = {
  primary: "#6C5CE7",
  primaryDark: "#594BC9",
  danger: "#EF4444",
  success: "#22C55E",
  backgroundDark: "#0B1220",
  cardDark: "#111828",
  surfaceDark: "#1E293B",
  textDark: "#F8FAFC",
  mutedDark: "#94A3B8",
  borderDark: "#334155",
  backgroundLight: "#FFFFFF",
  cardLight: "#F8FAFC",
  surfaceLight: "#FFFFFF",
  textLight: "#0F172A",
  mutedLight: "#475569",
  borderLight: "#E2E8F0"
};

const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
};

const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999
};

export const lightTheme = createTheme({
  colors: {
    background: palette.backgroundLight,
    card: palette.cardLight,
    surface: palette.surfaceLight,
    text: palette.textLight,
    muted: palette.mutedLight,
    primary: palette.primary,
    primaryDark: palette.primaryDark,
    danger: palette.danger,
    success: palette.success,
    border: palette.borderLight
  },
  spacing,
  borderRadii: radii,
  textVariants: {
    defaults: { color: "text", fontSize: 16, lineHeight: 22 },
    title: { color: "text", fontSize: 24, lineHeight: 30, fontWeight: "600" },
    subtitle: { color: "muted", fontSize: 14, lineHeight: 20 },
    caption: { color: "muted", fontSize: 12, lineHeight: 16 }
  },
  buttonVariants: {
    primary: { backgroundColor: "primary", borderRadius: "md", padding: "md" },
    outline: {
      backgroundColor: "transparent",
      borderRadius: "md",
      padding: "md",
      borderWidth: 1,
      borderColor: "primary"
    },
    danger: { backgroundColor: "danger", borderRadius: "md", padding: "md" }
  },
  cardVariants: {
    elevated: { backgroundColor: "card", borderRadius: "lg", padding: "lg" },
    outline: {
      backgroundColor: "surface",
      borderRadius: "lg",
      padding: "lg",
      borderWidth: 1,
      borderColor: "border"
    }
  },
  inputVariants: {
    default: {
      backgroundColor: "surface",
      borderRadius: "md",
      padding: "md",
      borderWidth: 1,
      borderColor: "border"
    },
    error: {
      backgroundColor: "surface",
      borderRadius: "md",
      padding: "md",
      borderWidth: 1,
      borderColor: "danger"
    }
  }
});

export const darkTheme = createTheme({
  ...lightTheme,
  colors: {
    background: palette.backgroundDark,
    card: palette.cardDark,
    surface: palette.surfaceDark,
    text: palette.textDark,
    muted: palette.mutedDark,
    primary: palette.primary,
    primaryDark: palette.primaryDark,
    danger: palette.danger,
    success: palette.success,
    border: palette.borderDark
  }
});

export type Theme = typeof lightTheme;
