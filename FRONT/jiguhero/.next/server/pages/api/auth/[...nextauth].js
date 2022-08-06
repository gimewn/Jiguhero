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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/kakao */ \"next-auth/providers/kakao\");\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n  providers: [next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default()({\n    clientId: process.env.KAKAO_CLIENT_ID,\n    clientSecret: process.env.KAKAO_CLIENT_SECRET\n  }), next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n    clientId: process.env.GOOGLE_CLIENT_ID,\n    clientSecret: process.env.GOOGLE_CLIENT_SECRET\n  })],\n  secret: process.env.SECRET,\n  session: {\n    strategy: \"jwt\"\n  },\n  callbacks: {\n    async jwt({\n      token,\n      account\n    }) {\n      // Persist the OAuth access_token to the token right after signin\n      console.log(account);\n\n      if (account) {\n        token.accessToken = account.access_token;\n        token.refreshToken = account.refresh_token;\n      }\n\n      return token;\n      console.log(token);\n    },\n\n    async session({\n      session,\n      token,\n      user\n    }) {\n      // Send properties to the client, like an access_token from a provider.\n      session.accessToken = token.accessToken;\n      session.refreshToken = token.refreshToken;\n      return session;\n    }\n\n  }\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQSxpRUFBZUEsZ0RBQVEsQ0FBQztFQUN0QkcsU0FBUyxFQUFFLENBQ1RELGdFQUFhLENBQUM7SUFDWkUsUUFBUSxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsZUFEVjtJQUVaQyxZQUFZLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRztFQUZkLENBQUQsQ0FESixFQUtUUixpRUFBYyxDQUFDO0lBQ2JHLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlJLGdCQURUO0lBRWJGLFlBQVksRUFBRUgsT0FBTyxDQUFDQyxHQUFSLENBQVlLO0VBRmIsQ0FBRCxDQUxMLENBRFc7RUFZdEJDLE1BQU0sRUFBRVAsT0FBTyxDQUFDQyxHQUFSLENBQVlPLE1BWkU7RUFjdEJDLE9BQU8sRUFBRTtJQUNQQyxRQUFRLEVBQUU7RUFESCxDQWRhO0VBaUJ0QkMsU0FBUyxFQUFFO0lBQ1QsTUFBTUMsR0FBTixDQUFVO01BQUVDLEtBQUY7TUFBU0M7SUFBVCxDQUFWLEVBQThCO01BQzVCO01BQ0FDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixPQUFaOztNQUNBLElBQUlBLE9BQUosRUFBYTtRQUNYRCxLQUFLLENBQUNJLFdBQU4sR0FBb0JILE9BQU8sQ0FBQ0ksWUFBNUI7UUFDQUwsS0FBSyxDQUFDTSxZQUFOLEdBQXFCTCxPQUFPLENBQUNNLGFBQTdCO01BQ0Q7O01BQ0QsT0FBT1AsS0FBUDtNQUNBRSxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsS0FBWjtJQUNELENBVlE7O0lBV1QsTUFBTUosT0FBTixDQUFjO01BQUVBLE9BQUY7TUFBV0ksS0FBWDtNQUFrQlE7SUFBbEIsQ0FBZCxFQUF3QztNQUN0QztNQUNBWixPQUFPLENBQUNRLFdBQVIsR0FBc0JKLEtBQUssQ0FBQ0ksV0FBNUI7TUFDQVIsT0FBTyxDQUFDVSxZQUFSLEdBQXVCTixLQUFLLENBQUNNLFlBQTdCO01BQ0EsT0FBT1YsT0FBUDtJQUNEOztFQWhCUTtBQWpCVyxDQUFELENBQXZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamlndWhlcm8vLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzPzJlOGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcbmltcG9ydCBLYWthb1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2tha2FvXCI7XG5cbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgS2FrYW9Qcm92aWRlcih7XG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuS0FLQU9fQ0xJRU5UX0lELFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5LQUtBT19DTElFTlRfU0VDUkVULFxuICAgIH0pLFxuICAgIEdvb2dsZVByb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcbiAgICB9KSxcbiAgXSxcblxuICBzZWNyZXQ6IHByb2Nlc3MuZW52LlNFQ1JFVCxcblxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCBhY2NvdW50IH0pIHtcbiAgICAgIC8vIFBlcnNpc3QgdGhlIE9BdXRoIGFjY2Vzc190b2tlbiB0byB0aGUgdG9rZW4gcmlnaHQgYWZ0ZXIgc2lnbmluXG4gICAgICBjb25zb2xlLmxvZyhhY2NvdW50KTtcbiAgICAgIGlmIChhY2NvdW50KSB7XG4gICAgICAgIHRva2VuLmFjY2Vzc1Rva2VuID0gYWNjb3VudC5hY2Nlc3NfdG9rZW47XG4gICAgICAgIHRva2VuLnJlZnJlc2hUb2tlbiA9IGFjY291bnQucmVmcmVzaF90b2tlbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiwgdXNlciB9KSB7XG4gICAgICAvLyBTZW5kIHByb3BlcnRpZXMgdG8gdGhlIGNsaWVudCwgbGlrZSBhbiBhY2Nlc3NfdG9rZW4gZnJvbSBhIHByb3ZpZGVyLlxuICAgICAgc2Vzc2lvbi5hY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc1Rva2VuO1xuICAgICAgc2Vzc2lvbi5yZWZyZXNoVG9rZW4gPSB0b2tlbi5yZWZyZXNoVG9rZW47XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxufSk7XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIktha2FvUHJvdmlkZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJLQUtBT19DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJLQUtBT19DTElFTlRfU0VDUkVUIiwiR09PR0xFX0NMSUVOVF9JRCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwic2VjcmV0IiwiU0VDUkVUIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJhY2NvdW50IiwiY29uc29sZSIsImxvZyIsImFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIiwicmVmcmVzaFRva2VuIiwicmVmcmVzaF90b2tlbiIsInVzZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

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