import "dotenv/config";
import type { ExpoConfig } from "expo/config";

const ENV = process.env.APP_ENV ?? "dev";
const API_BY_ENV: Record<string, string> = {
  dev: "http://10.0.2.2:8080/api",
  staging: "https://staging.api.tuapp.com/api",
  prod: "https://api.tuapp.com/api"
};

const config: ExpoConfig = {
  name: "gastos-frontend",
  slug: "gastos-frontend",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: { supportsTablet: true },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true
  },
  web: { favicon: "./assets/favicon.png" },
  extra: {
    API_URL: API_BY_ENV[ENV] ?? API_BY_ENV.dev,
    ENV,
    FEATURE_FAST_IMPORT: true
  }
};

export default config;
