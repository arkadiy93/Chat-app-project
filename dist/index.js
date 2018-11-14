"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _koa = _interopRequireDefault(require("koa"));

var _koaPug = _interopRequireDefault(require("koa-pug"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaWebpack = _interopRequireDefault(require("koa-webpack"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaGenericSession = _interopRequireDefault(require("koa-generic-session"));

var _lodash = _interopRequireDefault(require("lodash"));

var _routes = _interopRequireDefault(require("./routes"));

var _webpack = _interopRequireDefault(require("../webpack.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
var _default = function _default() {
  var app = new _koa.default();
  app.keys = ['some secret hurr'];
  app.use((0, _koaGenericSession.default)(app));
  app.use((0, _koaBodyparser.default)()); // app.use(serve(path.join(__dirname, '..', 'public')));

  (0, _koaWebpack.default)({
    config: _webpack.default
  }).then(function (middleware) {
    app.use(middleware);
  });
  var router = new _koaRouter.default();
  app.use((0, _koaLogger.default)());
  var pug = new _koaPug.default({
    viewPath: _path.default.join(__dirname, '..', 'views'),
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    noCache: process.env.NODE_ENV !== 'production',
    basedir: _path.default.join(__dirname, 'views'),
    helperPath: [{
      _: _lodash.default
    }, {
      urlFor: function urlFor() {
        return router.url.apply(router, arguments);
      }
    }]
  });
  pug.use(app);

  var server = _http.default.createServer(app.callback());

  var io = (0, _socket.default)(server);
  (0, _routes.default)(router, io);
  app.use(router.allowedMethods());
  app.use(router.routes());
  return server;
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJLb2EiLCJrZXlzIiwidXNlIiwiY29uZmlnIiwid2VicGFja0NvbmZpZyIsInRoZW4iLCJtaWRkbGV3YXJlIiwicm91dGVyIiwiUm91dGVyIiwicHVnIiwiUHVnIiwidmlld1BhdGgiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImRlYnVnIiwicHJldHR5IiwiY29tcGlsZURlYnVnIiwibG9jYWxzIiwibm9DYWNoZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImJhc2VkaXIiLCJoZWxwZXJQYXRoIiwiXyIsInVybEZvciIsInVybCIsInNlcnZlciIsImh0dHAiLCJjcmVhdGVTZXJ2ZXIiLCJjYWxsYmFjayIsImlvIiwiYWxsb3dlZE1ldGhvZHMiLCJyb3V0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQWZBO2VBaUJlLG9CQUFNO0FBQ25CLE1BQU1BLEdBQUcsR0FBRyxJQUFJQyxZQUFKLEVBQVo7QUFFQUQsRUFBQUEsR0FBRyxDQUFDRSxJQUFKLEdBQVcsQ0FBQyxrQkFBRCxDQUFYO0FBQ0FGLEVBQUFBLEdBQUcsQ0FBQ0csR0FBSixDQUFRLGdDQUFRSCxHQUFSLENBQVI7QUFDQUEsRUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVEsNkJBQVIsRUFMbUIsQ0FNbkI7O0FBQ0EsMkJBQVc7QUFDVEMsSUFBQUEsTUFBTSxFQUFFQztBQURDLEdBQVgsRUFFR0MsSUFGSCxDQUVRLFVBQUNDLFVBQUQsRUFBZ0I7QUFDdEJQLElBQUFBLEdBQUcsQ0FBQ0csR0FBSixDQUFRSSxVQUFSO0FBQ0QsR0FKRDtBQU1BLE1BQU1DLE1BQU0sR0FBRyxJQUFJQyxrQkFBSixFQUFmO0FBRUFULEVBQUFBLEdBQUcsQ0FBQ0csR0FBSixDQUFRLHlCQUFSO0FBQ0EsTUFBTU8sR0FBRyxHQUFHLElBQUlDLGVBQUosQ0FBUTtBQUNsQkMsSUFBQUEsUUFBUSxFQUFFQyxjQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsT0FBM0IsQ0FEUTtBQUVsQkMsSUFBQUEsS0FBSyxFQUFFLElBRlc7QUFHbEJDLElBQUFBLE1BQU0sRUFBRSxJQUhVO0FBSWxCQyxJQUFBQSxZQUFZLEVBQUUsSUFKSTtBQUtsQkMsSUFBQUEsTUFBTSxFQUFFLEVBTFU7QUFNbEJDLElBQUFBLE9BQU8sRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFOaEI7QUFPbEJDLElBQUFBLE9BQU8sRUFBRVgsY0FBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLE9BQXJCLENBUFM7QUFRbEJVLElBQUFBLFVBQVUsRUFBRSxDQUNWO0FBQUVDLE1BQUFBLENBQUMsRUFBREE7QUFBRixLQURVLEVBRVY7QUFBRUMsTUFBQUEsTUFBTSxFQUFFO0FBQUEsZUFBYW5CLE1BQU0sQ0FBQ29CLEdBQVAsT0FBQXBCLE1BQU0sWUFBbkI7QUFBQTtBQUFWLEtBRlU7QUFSTSxHQUFSLENBQVo7QUFhQUUsRUFBQUEsR0FBRyxDQUFDUCxHQUFKLENBQVFILEdBQVI7O0FBRUEsTUFBTTZCLE1BQU0sR0FBR0MsY0FBS0MsWUFBTCxDQUFrQi9CLEdBQUcsQ0FBQ2dDLFFBQUosRUFBbEIsQ0FBZjs7QUFDQSxNQUFNQyxFQUFFLEdBQUcscUJBQU9KLE1BQVAsQ0FBWDtBQUVBLHVCQUFVckIsTUFBVixFQUFrQnlCLEVBQWxCO0FBQ0FqQyxFQUFBQSxHQUFHLENBQUNHLEdBQUosQ0FBUUssTUFBTSxDQUFDMEIsY0FBUCxFQUFSO0FBQ0FsQyxFQUFBQSxHQUFHLENBQUNHLEdBQUosQ0FBUUssTUFBTSxDQUFDMkIsTUFBUCxFQUFSO0FBRUEsU0FBT04sTUFBUDtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBLb2EgZnJvbSAna29hJztcbmltcG9ydCBQdWcgZnJvbSAna29hLXB1Zyc7XG5pbXBvcnQgc29ja2V0IGZyb20gJ3NvY2tldC5pbyc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAna29hLXJvdXRlcic7XG5pbXBvcnQga29hTG9nZ2VyIGZyb20gJ2tvYS1sb2dnZXInO1xuaW1wb3J0IGtvYVdlYnBhY2sgZnJvbSAna29hLXdlYnBhY2snO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAna29hLWJvZHlwYXJzZXInO1xuaW1wb3J0IHNlc3Npb24gZnJvbSAna29hLWdlbmVyaWMtc2Vzc2lvbic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGFkZFJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cbmltcG9ydCB3ZWJwYWNrQ29uZmlnIGZyb20gJy4uL3dlYnBhY2suY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCBhcHAgPSBuZXcgS29hKCk7XG5cbiAgYXBwLmtleXMgPSBbJ3NvbWUgc2VjcmV0IGh1cnInXTtcbiAgYXBwLnVzZShzZXNzaW9uKGFwcCkpO1xuICBhcHAudXNlKGJvZHlQYXJzZXIoKSk7XG4gIC8vIGFwcC51c2Uoc2VydmUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3B1YmxpYycpKSk7XG4gIGtvYVdlYnBhY2soe1xuICAgIGNvbmZpZzogd2VicGFja0NvbmZpZyxcbiAgfSkudGhlbigobWlkZGxld2FyZSkgPT4ge1xuICAgIGFwcC51c2UobWlkZGxld2FyZSk7XG4gIH0pO1xuXG4gIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcblxuICBhcHAudXNlKGtvYUxvZ2dlcigpKTtcbiAgY29uc3QgcHVnID0gbmV3IFB1Zyh7XG4gICAgdmlld1BhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICd2aWV3cycpLFxuICAgIGRlYnVnOiB0cnVlLFxuICAgIHByZXR0eTogdHJ1ZSxcbiAgICBjb21waWxlRGVidWc6IHRydWUsXG4gICAgbG9jYWxzOiBbXSxcbiAgICBub0NhY2hlOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICAgIGJhc2VkaXI6IHBhdGguam9pbihfX2Rpcm5hbWUsICd2aWV3cycpLFxuICAgIGhlbHBlclBhdGg6IFtcbiAgICAgIHsgXyB9LFxuICAgICAgeyB1cmxGb3I6ICguLi5hcmdzKSA9PiByb3V0ZXIudXJsKC4uLmFyZ3MpIH0sXG4gICAgXSxcbiAgfSk7XG4gIHB1Zy51c2UoYXBwKTtcblxuICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHAuY2FsbGJhY2soKSk7XG4gIGNvbnN0IGlvID0gc29ja2V0KHNlcnZlcik7XG5cbiAgYWRkUm91dGVzKHJvdXRlciwgaW8pO1xuICBhcHAudXNlKHJvdXRlci5hbGxvd2VkTWV0aG9kcygpKTtcbiAgYXBwLnVzZShyb3V0ZXIucm91dGVzKCkpO1xuXG4gIHJldHVybiBzZXJ2ZXI7XG59O1xuIl19