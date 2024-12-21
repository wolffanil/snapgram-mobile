export const browserType: { [key: string]: string } = {
  Chrome: "Chrome",
  Mozila: "Mozila",
  Safari: "Safari",
  Edge: "Edge",
};

export const osType: { [key: string]: string } = {
  Android: "Android",
  Ios: "Ios",
};

import chrome from "@/public/assets/browsers/chrome.png";
import mozila from "@/public/assets/browsers/mozila.png";
import safari from "@/public/assets/browsers/safari.png";
import edge from "@/public/assets/browsers/edge.png";

import android from "@/public/assets/os/android.png";
import ios from "@/public/assets/os/ios.png";

export default {
  chrome,
  mozila,
  safari,
  edge,
  android,
  ios,
};
