module.exports = {
  reactStrictMode: true,

  async rewrites () {
    return [
      { source: '/:any*', destination: '/' }
    ];
  },
};
