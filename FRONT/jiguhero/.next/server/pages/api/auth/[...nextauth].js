"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "next-auth/providers/kakao":
/*!********************************************!*\
  !*** external "next-auth/providers/kakao" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/kakao");

/***/ }),

/***/ "next-auth/providers/naver":
/*!********************************************!*\
  !*** external "next-auth/providers/naver" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/naver");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/kakao */ \"next-auth/providers/kakao\");\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/naver */ \"next-auth/providers/naver\");\n/* harmony import */ var next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n  providers: [next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default()({\n    clientId: process.env.KAKAO_CLIENT_ID,\n    clientSecret: process.env.KAKAO_CLIENT_SECRET\n  }), next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n    clientId: process.env.GOOGLE_CLIENT_ID,\n    clientSecret: process.env.GOOGLE_CLIENT_SECRET\n  }), next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3___default()({\n    clientId: process.env.NAVER_CLIENT_ID,\n    clientSecret: process.env.NAVER_CLIENT_SECRET\n  })],\n  secret: process.env.SECRET,\n  session: {\n    strategy: \"jwt\"\n  },\n  callbacks: {\n    async jwt({\n      token,\n      account\n    }) {\n      // Persist the OAuth access_token to the token right after signin\n      if (account) {\n        token.accessToken = account.access_token;\n        token.refreshToken = account.refresh_token;\n      }\n\n      return token;\n    },\n\n    async session({\n      session,\n      token,\n      user\n    }) {\n      // Send properties to the client, like an access_token from a provider.\n      session.accessToken = token.accessToken;\n      session.refreshToken = token.refreshToken;\n      return session;\n    }\n\n  }\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsaUVBQWVBLGdEQUFRLENBQUM7RUFDdEJJLFNBQVMsRUFBRSxDQUNURixnRUFBYSxDQUFDO0lBQ1pHLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGVBRFY7SUFFWkMsWUFBWSxFQUFFSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUc7RUFGZCxDQUFELENBREosRUFLVFQsaUVBQWMsQ0FBQztJQUNiSSxRQUFRLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSSxnQkFEVDtJQUViRixZQUFZLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZSztFQUZiLENBQUQsQ0FMTCxFQVNMVCxnRUFBYSxDQUFDO0lBQ2hCRSxRQUFRLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTSxlQUROO0lBRWhCSixZQUFZLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZTztFQUZWLENBQUQsQ0FUUixDQURXO0VBaUJ0QkMsTUFBTSxFQUFFVCxPQUFPLENBQUNDLEdBQVIsQ0FBWVMsTUFqQkU7RUFtQnRCQyxPQUFPLEVBQUU7SUFDUEMsUUFBUSxFQUFFO0VBREgsQ0FuQmE7RUFzQnRCQyxTQUFTLEVBQUU7SUFDVCxNQUFNQyxHQUFOLENBQVU7TUFBRUMsS0FBRjtNQUFTQztJQUFULENBQVYsRUFBOEI7TUFDNUI7TUFFQSxJQUFJQSxPQUFKLEVBQWE7UUFDWEQsS0FBSyxDQUFDRSxXQUFOLEdBQW9CRCxPQUFPLENBQUNFLFlBQTVCO1FBQ0FILEtBQUssQ0FBQ0ksWUFBTixHQUFxQkgsT0FBTyxDQUFDSSxhQUE3QjtNQUVEOztNQUNELE9BQU9MLEtBQVA7SUFDRCxDQVZROztJQVdULE1BQU1KLE9BQU4sQ0FBYztNQUFFQSxPQUFGO01BQVdJLEtBQVg7TUFBa0JNO0lBQWxCLENBQWQsRUFBd0M7TUFDdEM7TUFDQVYsT0FBTyxDQUFDTSxXQUFSLEdBQXNCRixLQUFLLENBQUNFLFdBQTVCO01BQ0FOLE9BQU8sQ0FBQ1EsWUFBUixHQUF1QkosS0FBSyxDQUFDSSxZQUE3QjtNQUNBLE9BQU9SLE9BQVA7SUFDRDs7RUFoQlE7QUF0QlcsQ0FBRCxDQUF2QiIsInNvdXJjZXMiOlsid2VicGFjazovL2ppZ3VoZXJvLy4vcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cz8yZThiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcclxuaW1wb3J0IEtha2FvUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMva2FrYW9cIjtcclxuaW1wb3J0IE5hdmVyUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvbmF2ZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoe1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgS2FrYW9Qcm92aWRlcih7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5LQUtBT19DTElFTlRfSUQsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuS0FLQU9fQ0xJRU5UX1NFQ1JFVCxcclxuICAgIH0pLFxyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcclxuICAgIH0pLFxyXG4gICAgICAgIE5hdmVyUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuTkFWRVJfQ0xJRU5UX0lELFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52Lk5BVkVSX0NMSUVOVF9TRUNSRVQsXHJcbiAgICB9KSxcclxuXHJcbiAgXSxcclxuXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5TRUNSRVQsXHJcblxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gIH0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgYWNjb3VudCB9KSB7XHJcbiAgICAgIC8vIFBlcnNpc3QgdGhlIE9BdXRoIGFjY2Vzc190b2tlbiB0byB0aGUgdG9rZW4gcmlnaHQgYWZ0ZXIgc2lnbmluXHJcblxyXG4gICAgICBpZiAoYWNjb3VudCkge1xyXG4gICAgICAgIHRva2VuLmFjY2Vzc1Rva2VuID0gYWNjb3VudC5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgdG9rZW4ucmVmcmVzaFRva2VuID0gYWNjb3VudC5yZWZyZXNoX3Rva2VuO1xyXG5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgLy8gU2VuZCBwcm9wZXJ0aWVzIHRvIHRoZSBjbGllbnQsIGxpa2UgYW4gYWNjZXNzX3Rva2VuIGZyb20gYSBwcm92aWRlci5cclxuICAgICAgc2Vzc2lvbi5hY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc1Rva2VuO1xyXG4gICAgICBzZXNzaW9uLnJlZnJlc2hUb2tlbiA9IHRva2VuLnJlZnJlc2hUb2tlbjtcclxuICAgICAgcmV0dXJuIHNlc3Npb247XHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIktha2FvUHJvdmlkZXIiLCJOYXZlclByb3ZpZGVyIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiS0FLQU9fQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiS0FLQU9fQ0xJRU5UX1NFQ1JFVCIsIkdPT0dMRV9DTElFTlRfSUQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsIk5BVkVSX0NMSUVOVF9JRCIsIk5BVkVSX0NMSUVOVF9TRUNSRVQiLCJzZWNyZXQiLCJTRUNSRVQiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsImFjY291bnQiLCJhY2Nlc3NUb2tlbiIsImFjY2Vzc190b2tlbiIsInJlZnJlc2hUb2tlbiIsInJlZnJlc2hfdG9rZW4iLCJ1c2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();