import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const configBase = {
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  plugins: [
    sourceMaps(),
    resolve(),
    babel({
      exclude: ['node_modules/**', '**/node_modules/**'],
      plugins: ['@babel/plugin-external-helpers'],
    }),
    commonjs()
  ],
};

const webConfig = {
  ...configBase,
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: true
    }
  ],
}

const nativeConfig = {
  ...configBase,
  input: './src/index.native.js',
  output: [
    {
      file: pkg['react-native'],
      format: 'es',
      sourcemap: true
    }
  ],
};


export default [
  webConfig,
  nativeConfig
];