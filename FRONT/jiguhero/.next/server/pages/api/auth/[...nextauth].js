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

/***/ "(api)/./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/kakao */ \"next-auth/providers/kakao\");\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n  providers: [next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default()({\n    clientId: process.env.KAKAO_CLIENT_ID,\n    clientSecret: process.env.KAKAO_CLIENT_SECRET\n  }), next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n    clientId: process.env.GOOGLE_CLIENT_ID,\n    clientSecret: process.env.GOOGLE_CLIENT_SECRET\n  })],\n  secret: process.env.SECRET,\n  session: {\n    strategy: \"jwt\"\n  },\n  callbacks: {\n    async jwt({\n      token,\n      account\n    }) {\n      // Persist the OAuth access_token to the token right after signin\n      if (account) {\n        token.accessToken = account.access_token;\n        token.refreshToken = account.refresh_token;\n      }\n\n      return token;\n    },\n\n    async session({\n      session,\n      token,\n      user\n    }) {\n      // Send properties to the client, like an access_token from a provider.\n      session.accessToken = token.accessToken;\n      session.refreshToken = token.refreshToken;\n      return session;\n    }\n\n  }\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQSxpRUFBZUEsZ0RBQVEsQ0FBQztFQUN0QkcsU0FBUyxFQUFFLENBQ1RELGdFQUFhLENBQUM7SUFDWkUsUUFBUSxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsZUFEVjtJQUVaQyxZQUFZLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRztFQUZkLENBQUQsQ0FESixFQUtUUixpRUFBYyxDQUFDO0lBQ2JHLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlJLGdCQURUO0lBRWJGLFlBQVksRUFBRUgsT0FBTyxDQUFDQyxHQUFSLENBQVlLO0VBRmIsQ0FBRCxDQUxMLENBRFc7RUFZdEJDLE1BQU0sRUFBRVAsT0FBTyxDQUFDQyxHQUFSLENBQVlPLE1BWkU7RUFjdEJDLE9BQU8sRUFBRTtJQUNQQyxRQUFRLEVBQUU7RUFESCxDQWRhO0VBaUJ0QkMsU0FBUyxFQUFFO0lBQ1QsTUFBTUMsR0FBTixDQUFVO01BQUVDLEtBQUY7TUFBU0M7SUFBVCxDQUFWLEVBQThCO01BQzVCO01BRUEsSUFBSUEsT0FBSixFQUFhO1FBQ1hELEtBQUssQ0FBQ0UsV0FBTixHQUFvQkQsT0FBTyxDQUFDRSxZQUE1QjtRQUNBSCxLQUFLLENBQUNJLFlBQU4sR0FBcUJILE9BQU8sQ0FBQ0ksYUFBN0I7TUFFRDs7TUFDRCxPQUFPTCxLQUFQO0lBQ0QsQ0FWUTs7SUFXVCxNQUFNSixPQUFOLENBQWM7TUFBRUEsT0FBRjtNQUFXSSxLQUFYO01BQWtCTTtJQUFsQixDQUFkLEVBQXdDO01BQ3RDO01BQ0FWLE9BQU8sQ0FBQ00sV0FBUixHQUFzQkYsS0FBSyxDQUFDRSxXQUE1QjtNQUNBTixPQUFPLENBQUNRLFlBQVIsR0FBdUJKLEtBQUssQ0FBQ0ksWUFBN0I7TUFDQSxPQUFPUixPQUFQO0lBQ0Q7O0VBaEJRO0FBakJXLENBQUQsQ0FBdkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qaWd1aGVyby8uL3BhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0udHM/MmU4YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xuaW1wb3J0IEtha2FvUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMva2FrYW9cIjtcblxuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoe1xuICBwcm92aWRlcnM6IFtcbiAgICBLYWthb1Byb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5LQUtBT19DTElFTlRfSUQsXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LktBS0FPX0NMSUVOVF9TRUNSRVQsXG4gICAgfSksXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQsXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVULFxuICAgIH0pLFxuICBdLFxuXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVULFxuXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIGFjY291bnQgfSkge1xuICAgICAgLy8gUGVyc2lzdCB0aGUgT0F1dGggYWNjZXNzX3Rva2VuIHRvIHRoZSB0b2tlbiByaWdodCBhZnRlciBzaWduaW5cblxuICAgICAgaWYgKGFjY291bnQpIHtcbiAgICAgICAgdG9rZW4uYWNjZXNzVG9rZW4gPSBhY2NvdW50LmFjY2Vzc190b2tlbjtcbiAgICAgICAgdG9rZW4ucmVmcmVzaFRva2VuID0gYWNjb3VudC5yZWZyZXNoX3Rva2VuO1xuXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgLy8gU2VuZCBwcm9wZXJ0aWVzIHRvIHRoZSBjbGllbnQsIGxpa2UgYW4gYWNjZXNzX3Rva2VuIGZyb20gYSBwcm92aWRlci5cbiAgICAgIHNlc3Npb24uYWNjZXNzVG9rZW4gPSB0b2tlbi5hY2Nlc3NUb2tlbjtcbiAgICAgIHNlc3Npb24ucmVmcmVzaFRva2VuID0gdG9rZW4ucmVmcmVzaFRva2VuO1xuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiR29vZ2xlUHJvdmlkZXIiLCJLYWthb1Byb3ZpZGVyIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiS0FLQU9fQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiS0FLQU9fQ0xJRU5UX1NFQ1JFVCIsIkdPT0dMRV9DTElFTlRfSUQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsInNlY3JldCIsIlNFQ1JFVCIsInNlc3Npb24iLCJzdHJhdGVneSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwiYWNjb3VudCIsImFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIiwicmVmcmVzaFRva2VuIiwicmVmcmVzaF90b2tlbiIsInVzZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

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