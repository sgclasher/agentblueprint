module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
        },
      },
    ],
  ],
  plugins: [],
  // Only use this config for test environment
  env: {
    test: {
      presets: [
        [
          'next/babel',
          {
            'preset-react': {
              runtime: 'automatic',
            },
          },
        ],
      ],
    },
  },
}; 