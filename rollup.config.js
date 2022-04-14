import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        extensions: [".js"],
      }),

      babel({
        presets: ["@babel/preset-react"],
        exclude: "node_modules/**",
      }),
      commonjs(),
      serve({
        open: true,
        verbose: true,
        contentBase: ["", "public"],
        host: "localhost",
        port: 3000,
      }),
      livereload({ watch: "dist" }),
      postcss({
        modules: true,
      }),
    ],
  },
  {
    external: [/\.css$/],
  },
];
