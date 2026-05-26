import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.drams.whisky",
  appName: "Drams",
  webDir: "out",
  server: {
    // Vercel 배포 URL로 교체 (배포 후)
    // url: "https://drams.vercel.app",
    androidScheme: "https",
  },
  ios: {
    contentInset: "always",
    preferredContentMode: "mobile",
  },
};

export default config;
