import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.drams.whisky",
  appName: "Drams",
  webDir: "out",
  server: {
    url: "https://drams-six.vercel.app",
    androidScheme: "https",
  },
  ios: {
    contentInset: "always",
    preferredContentMode: "mobile",
  },
};

export default config;
