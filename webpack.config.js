const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
  // ...other webpack configuration options

  plugins: [
    // ...other plugins

    new GoogleFontsPlugin({
      fonts: [
        { family: "Poppins", variants: ["400", "500", "600", "700"] },
        // Add more font families and variants if needed
      ],
    }),
  ],
};
