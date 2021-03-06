/* eslint-env node */
import pkg from './package.json';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const minify = process.env.NODE_ENV === 'production';

const banner = `/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 **/
`;

const [ filename ] = pkg.main.split( '/' ).reverse();
const name = filename.replace( '.js', '' );
const file = minify ? pkg.main.replace( '.js', '.min.js' ) : pkg.main;
const plugins = [
  nodeResolve(),
  babel({
    exclude: 'node_modules/!(@switch-company)/**',
    plugins: [
      'external-helpers'
    ]
  })
];

if( minify ){
  plugins.push( uglify({
    output: {
      'comments': ( node, comment ) => {
        const text = comment.value,
          type = comment.type;

        if ( type === 'comment2' ) {
          // multiline comment
          return /@preserve|@license|@cc_on/i.test( text );
        }
      }
    }
  }));
}

export default {
  input: pkg.module,
  output: {
    banner,
    file,
    format: 'umd',
    indent: '  ',
    name
  },
  plugins
};
