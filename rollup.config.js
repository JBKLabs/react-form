import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: {
    'index': 'src/index.js',
    'native/index': 'src/native/index.js'
  },
  // experimentalCodeSplitting: true,
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true
    },
    {
      dir: 'dist',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ '@babel/external-helpers' ]
    }),
    resolve(),
    commonjs()
  ]
}