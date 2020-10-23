module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            chrome: '58',
          },
        },
      },
    ],
  ],
};
