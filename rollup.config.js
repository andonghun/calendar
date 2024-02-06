import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import svgr from "@svgr/rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "lib/index.ts",
  output: {
    file: `package/calendar.js`,
    format: "cjs",
    name: "react-new-calendar",
  },
  plugins: [
    svgr({ exportType: "named", jsxRuntime: "automatic" }),
    terser(),
    typescript(),
    postcss({
      extensions: [".css"],
      modules: true,
    }),
    nodeResolve(),
  ],
};
