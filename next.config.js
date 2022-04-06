const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `
      @import 'utils/variables/colors';
      @import 'utils/variables/fonts';
      @import 'utils/mixins/fonts';
      @import 'utils/mixins/typography';
      @import 'utils/mixins/media';
    `,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg?$/,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    })

    config.plugins.push(
      new ESLintPlugin({
        failOnError: true,
        failOnWarning: false,
        emitWarning: false,
        emitError: true,
        outputReport: true,
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
      }),
    )

    return config
  },
}

module.exports = nextConfig
