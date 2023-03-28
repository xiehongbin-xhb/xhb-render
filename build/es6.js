import resolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  input: "src/index.js",
  output: {
    format: "iife",
    file: "dist/js/index.js",
    sourcemap: true,
    name: "xhb"
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs({})
  ]
};