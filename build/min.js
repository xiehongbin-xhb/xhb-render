import { uglify } from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  input: "src/index.js",
  output: {
    name: "xhb",
    file: "dist/js/index.js",
    format: "iife"
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs({}),
    babel(),
    uglify()
  ]
};