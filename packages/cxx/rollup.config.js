import babel from 'rollup-plugin-babel';
// import multiEntry from 'rollup-plugin-multi-entry';
// import resolve from 'rollup-plugin-node-resolve';

const targets = ['app', 'link', 'environment', 'head', 'client', 'history'];
export default targets.map(target => ({
  entry: `src/${target}.js`,
  dest: `lib/${target}.js`,
  format: 'cjs',
  plugins: [babel()]
}));
