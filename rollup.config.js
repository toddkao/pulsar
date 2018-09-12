import rollupPluginTypescript2 from 'rollup-plugin-typescript2';
import pkg from './package.json';
const typescript = require('typescript');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    rollupPluginTypescript2({ typescript })
  ],
};