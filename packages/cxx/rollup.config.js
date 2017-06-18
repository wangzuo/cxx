import babel from 'rollup-plugin-babel';
// import uglify from 'rollup-plugin-uglify';
// import resolve from 'rollup-plugin-node-resolve';

const targets = ['app', 'link', 'head', 'client', 'client-only'];
export default targets.map(target => ({
  entry: `src/${target}.js`,
  dest: `lib/${target}.js`,
  format: 'cjs',
  plugins: [babel()],
  external: ['babel-polyfill']
}));
