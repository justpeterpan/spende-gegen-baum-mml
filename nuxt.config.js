import colorModeModule from "@nuxtjs/color-mode";

export default {
  css: ["@/assets/main.css"],
  buildModules: [colorModeModule],
  target: "static",
  head: {
    title: "my website title",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "SPENDE GEGEN BAUM",
        content: "FUSSBALL MML"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  }
};
