import colorModeModule from "@nuxtjs/color-mode";

export default {
  css: ["@/assets/main.css"],
  buildModules: [colorModeModule],
  target: "static",
  head: {
    title: "FUSSBALL MML GEGEN BAUM",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
      },
      {
        hid: "description",
        name: "SPENDE GEGEN BAUM",
        content: "FUSSBALL MML"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Neuton:wght@400&display=swap"
      }
    ]
  }
};
