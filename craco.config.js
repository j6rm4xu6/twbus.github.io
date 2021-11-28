const CracoLess = require ("craco-less");

module.exports = {
  plugins: [
    { plugin: require('@semantic-ui-react/craco-less') },
    {
      plugin: CracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
        modifyLessRule() {
          return {
            test: /\.module\.less$/,
            exclude: /node_modules/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]', // _[hash:base64:6]
                  },
                },
              },
              { loader: 'less-loader' },
            ],
          };
        },
      },
    },
  ],
};
