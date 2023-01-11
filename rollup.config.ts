import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { RollupOptions } from "rollup";
import dts from "rollup-plugin-dts";

// import packageJson from "./package.json";

const config: RollupOptions[] = [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "dist/commonjs/index.js",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/es/index.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" })
    ]
  },
  {
    input: "dist/es/types/src/index.d.ts",
    output: [ { file: "dist/index.d.ts", format: "esm" } ],
    plugins: [ dts() ]
  }
];

export default config;
