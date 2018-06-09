import pkg from './package.json'
import babel from 'rollup-plugin-babel'
// import postcssOptions from './postcss.config'

export default [
  {
    input: 'src/index.jsx',
    external: ['react', 'react-dom'],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
]
