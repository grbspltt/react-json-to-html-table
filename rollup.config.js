import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/bundle.js",
      format: "iife",
      sourcemap: true,
      name: "HtmlJsonTable",
    },
    plugins: [
      nodeResolve({
        extensions: [".js"],
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
      babel({
        presets: ["@babel/preset-react"],
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
      postcss(),
    ],
  },
  {
    external: [/\.css$/],
  },
];
