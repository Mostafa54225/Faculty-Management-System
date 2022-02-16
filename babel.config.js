module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          ie: "11",
        },
      },
    ],
    "es2015",
    "stage-0",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-async-to-generator",
    "syntax-dynamic-import",
    "transform-runtime"
  ],
}
