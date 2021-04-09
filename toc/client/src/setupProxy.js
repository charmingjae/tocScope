const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://211.105.65.18:1234/",
      changeOrigin: true,
    })
  );
};
