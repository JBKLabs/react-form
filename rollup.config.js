import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import path from 'path';
import fs from 'fs';

import pkg from './package.json';

const isProduction = process.env.ENV === 'production';
const isDevelopment = process.env.ENV === 'development';

const exampleWebPkgPath = fs.existsSync('./examples/web/node_modules')
  ? path.join('./examples/web/node_modules/@jbknowledge/react-form', pkg.main)
  : null;

const exampleNativePkgPath = fs.existsSync('./examples/native/node_modules')
  ? path.join('./examples/native/node_modules/@jbknowledge/react-form', pkg['react-native'])
  : null;

const configBase = {
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  plugins: [
    sourceMaps(),
    resolve(),
    babel({
      exclude: ['node_modules/**', '**/node_modules/**'],
      plugins: ['@babel/plugin-external-helpers']
    }),
    commonjs()
  ]
};

const webConfig = {
  ...configBase,
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: true
    },
    isDevelopment && exampleWebPkgPath && {
      file: exampleWebPkgPath,
      format: 'es',
      sourcemap: true
    }
  ].filter(x => !!x)
}

const nativeConfig = {
  ...configBase,
  input: './src/index.native.js',
  output: [
    {
      file: pkg['react-native'],
      format: 'es',
      sourcemap: true
    },
    isDevelopment && exampleNativePkgPath && {
      file: exampleNativePkgPath,
      format: 'es',
      sourcemap: true
    }
  ].filter(x => !!x)
};

export default [
  webConfig,
  nativeConfig
];
