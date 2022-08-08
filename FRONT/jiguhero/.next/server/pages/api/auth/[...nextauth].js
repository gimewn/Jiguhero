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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/kakao */ \"next-auth/providers/kakao\");\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n  providers: [next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default()({\n    clientId: process.env.KAKAO_CLIENT_ID,\n    clientSecret: process.env.KAKAO_CLIENT_SECRET\n  }), next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n    clientId: process.env.GOOGLE_CLIENT_ID,\n    clientSecret: process.env.GOOGLE_CLIENT_SECRET\n  })],\n  secret: process.env.SECRET,\n  session: {\n    strategy: \"jwt\"\n  },\n  callbacks: {\n    async jwt({\n      token,\n      account\n    }) {\n      // Persist the OAuth access_token to the token right after signin\n      if (account) {\n        token.accessToken = account.access_token;\n        token.refreshToken = account.refresh_token;\n      }\n\n      return token;\n    },\n\n    async session({\n      session,\n      token,\n      user\n    }) {\n      // Send properties to the client, like an access_token from a provider.\n      session.accessToken = token.accessToken;\n      session.refreshToken = token.refreshToken;\n      return session;\n    }\n\n  }\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQSxpRUFBZUEsZ0RBQVEsQ0FBQztFQUN0QkcsU0FBUyxFQUFFLENBQ1RELGdFQUFhLENBQUM7SUFDWkUsUUFBUSxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsZUFEVjtJQUVaQyxZQUFZLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRztFQUZkLENBQUQsQ0FESixFQUtUUixpRUFBYyxDQUFDO0lBQ2JHLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlJLGdCQURUO0lBRWJGLFlBQVksRUFBRUgsT0FBTyxDQUFDQyxHQUFSLENBQVlLO0VBRmIsQ0FBRCxDQUxMLENBRFc7RUFZdEJDLE1BQU0sRUFBRVAsT0FBTyxDQUFDQyxHQUFSLENBQVlPLE1BWkU7RUFjdEJDLE9BQU8sRUFBRTtJQUNQQyxRQUFRLEVBQUU7RUFESCxDQWRhO0VBaUJ0QkMsU0FBUyxFQUFFO0lBQ1QsTUFBTUMsR0FBTixDQUFVO01BQUVDLEtBQUY7TUFBU0M7SUFBVCxDQUFWLEVBQThCO01BQzVCO01BRUEsSUFBSUEsT0FBSixFQUFhO1FBQ1hELEtBQUssQ0FBQ0UsV0FBTixHQUFvQkQsT0FBTyxDQUFDRSxZQUE1QjtRQUNBSCxLQUFLLENBQUNJLFlBQU4sR0FBcUJILE9BQU8sQ0FBQ0ksYUFBN0I7TUFFRDs7TUFDRCxPQUFPTCxLQUFQO0lBQ0QsQ0FWUTs7SUFXVCxNQUFNSixPQUFOLENBQWM7TUFBRUEsT0FBRjtNQUFXSSxLQUFYO01BQWtCTTtJQUFsQixDQUFkLEVBQXdDO01BQ3RDO01BQ0FWLE9BQU8sQ0FBQ00sV0FBUixHQUFzQkYsS0FBSyxDQUFDRSxXQUE1QjtNQUNBTixPQUFPLENBQUNRLFlBQVIsR0FBdUJKLEtBQUssQ0FBQ0ksWUFBN0I7TUFDQSxPQUFPUixPQUFQO0lBQ0Q7O0VBaEJRO0FBakJXLENBQUQsQ0FBdkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qaWd1aGVyby8uL3BhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0udHM/MmU4YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgR29vZ2xlUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlXCI7XHJcbmltcG9ydCBLYWthb1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2tha2FvXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBLYWthb1Byb3ZpZGVyKHtcclxuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LktBS0FPX0NMSUVOVF9JRCxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5LQUtBT19DTElFTlRfU0VDUkVULFxyXG4gICAgfSksXHJcbiAgICBHb29nbGVQcm92aWRlcih7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVULFxyXG4gICAgfSksXHJcbiAgXSxcclxuXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5TRUNSRVQsXHJcblxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gIH0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgYWNjb3VudCB9KSB7XHJcbiAgICAgIC8vIFBlcnNpc3QgdGhlIE9BdXRoIGFjY2Vzc190b2tlbiB0byB0aGUgdG9rZW4gcmlnaHQgYWZ0ZXIgc2lnbmluXHJcblxyXG4gICAgICBpZiAoYWNjb3VudCkge1xyXG4gICAgICAgIHRva2VuLmFjY2Vzc1Rva2VuID0gYWNjb3VudC5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgdG9rZW4ucmVmcmVzaFRva2VuID0gYWNjb3VudC5yZWZyZXNoX3Rva2VuO1xyXG5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgLy8gU2VuZCBwcm9wZXJ0aWVzIHRvIHRoZSBjbGllbnQsIGxpa2UgYW4gYWNjZXNzX3Rva2VuIGZyb20gYSBwcm92aWRlci5cclxuICAgICAgc2Vzc2lvbi5hY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc1Rva2VuO1xyXG4gICAgICBzZXNzaW9uLnJlZnJlc2hUb2tlbiA9IHRva2VuLnJlZnJlc2hUb2tlbjtcclxuICAgICAgcmV0dXJuIHNlc3Npb247XHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIktha2FvUHJvdmlkZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJLQUtBT19DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJLQUtBT19DTElFTlRfU0VDUkVUIiwiR09PR0xFX0NMSUVOVF9JRCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwic2VjcmV0IiwiU0VDUkVUIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJhY2NvdW50IiwiYWNjZXNzVG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJyZWZyZXNoVG9rZW4iLCJyZWZyZXNoX3Rva2VuIiwidXNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

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