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
exports.id = "pages/login/kakao";
exports.ids = ["pages/login/kakao"];
exports.modules = {

/***/ "./pages/login/kakao.tsx":
/*!*******************************!*\
  !*** ./pages/login/kakao.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Kakao)\n/* harmony export */ });\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"C:\\\\Users\\\\multicampus\\\\Desktop\\\\S07P12C105\\\\FRONT\\\\jiguhero\\\\pages\\\\login\\\\kakao.tsx\";\n\n\n\n\nfunction Kakao() {\n  //카카오\n  const kakao = window.Kakao;\n\n  const KakaoLogout = () => {\n    console.log(kakao.Auth.getAccessToken()); // 카카오 접근 토큰 확인 (로그인 후 해당 토큰을 이용하여 추가 기능 수행 가능)\n    // 카카오 로그인 링크 해제\n\n    kakao.API.request({\n      url: '/v1/user/unlink',\n      success: res => {\n        // 로그인 성공할 경우 정보 확인 후 / 페이지로 push\n        console.log(res);\n        next_router__WEBPACK_IMPORTED_MODULE_0___default().push('/');\n      },\n      fail: error => {\n        console.log(error);\n      }\n    });\n  };\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(Wrapper, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(Title, {\n      children: \"KaKao Page...\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 27,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(Button, {\n      onClick: KakaoLogout,\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(ButtonText, {\n        children: \"Logout\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 30,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 29,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 26,\n    columnNumber: 5\n  }, this);\n}\nconst Wrapper = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({\n  displayName: \"kakao__Wrapper\",\n  componentId: \"sc-h79cc5-0\"\n})([\"max-width:720px;margin:0 auto;display:flex;flex-direction:column;align-items:center;\"]);\nconst Title = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_2___default().h2.withConfig({\n  displayName: \"kakao__Title\",\n  componentId: \"sc-h79cc5-1\"\n})([\"\"]);\nconst Button = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_2___default().button.withConfig({\n  displayName: \"kakao__Button\",\n  componentId: \"sc-h79cc5-2\"\n})([\"background-color:#fef01b;width:360px;height:40px;margin:6px 0;border:none;border-radius:6px;cursor:pointer;\"]);\nconst ButtonText = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_2___default().h4.withConfig({\n  displayName: \"kakao__ButtonText\",\n  componentId: \"sc-h79cc5-3\"\n})([\"margin:0;padding:0;font-size:18px;color:#ffffff;\"]);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9sb2dpbi9rYWthby50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFZSxTQUFTRyxLQUFULEdBQWlCO0VBQzlCO0VBQ0EsTUFBTUMsS0FBSyxHQUFJQyxNQUFELENBQWdCRixLQUE5Qjs7RUFDQSxNQUFNRyxXQUFXLEdBQUcsTUFBTTtJQUN4QkMsT0FBTyxDQUFDQyxHQUFSLENBQVlKLEtBQUssQ0FBQ0ssSUFBTixDQUFXQyxjQUFYLEVBQVosRUFEd0IsQ0FDa0I7SUFDMUM7O0lBQ0FOLEtBQUssQ0FBQ08sR0FBTixDQUFVQyxPQUFWLENBQWtCO01BQ2hCQyxHQUFHLEVBQUUsaUJBRFc7TUFFaEJDLE9BQU8sRUFBR0MsR0FBRCxJQUFjO1FBQ3JCO1FBQ0FSLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTyxHQUFaO1FBQ0FmLHVEQUFBLENBQVksR0FBWjtNQUNELENBTmU7TUFPaEJpQixJQUFJLEVBQUdDLEtBQUQsSUFBZ0I7UUFDcEJYLE9BQU8sQ0FBQ0MsR0FBUixDQUFZVSxLQUFaO01BQ0Q7SUFUZSxDQUFsQjtFQVdELENBZEQ7O0VBaUJBLG9CQUNFLDhEQUFDLE9BQUQ7SUFBQSx3QkFDRSw4REFBQyxLQUFEO01BQUE7SUFBQTtNQUFBO01BQUE7TUFBQTtJQUFBLFFBREYsZUFHRSw4REFBQyxNQUFEO01BQVEsT0FBTyxFQUFFWixXQUFqQjtNQUFBLHVCQUNFLDhEQUFDLFVBQUQ7UUFBQTtNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7SUFERjtNQUFBO01BQUE7TUFBQTtJQUFBLFFBSEY7RUFBQTtJQUFBO0lBQUE7SUFBQTtFQUFBLFFBREY7QUFTRDtBQUlELE1BQU1hLE9BQU8sZ0JBQUdqQix1RUFBSDtFQUFBO0VBQUE7QUFBQSw0RkFBYjtBQVVBLE1BQU1tQixLQUFLLGdCQUFHbkIsc0VBQUg7RUFBQTtFQUFBO0FBQUEsUUFBWDtBQUVBLE1BQU1xQixNQUFNLGdCQUFHckIsMEVBQUg7RUFBQTtFQUFBO0FBQUEsbUhBQVo7QUFjQSxNQUFNdUIsVUFBVSxnQkFBR3ZCLHNFQUFIO0VBQUE7RUFBQTtBQUFBLHdEQUFoQiIsInNvdXJjZXMiOlsid2VicGFjazovL2ppZ3VoZXJvLy4vcGFnZXMvbG9naW4va2FrYW8udHN4PzhjY2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBLYWthbygpIHtcclxuICAvL+y5tOy5tOyYpFxyXG4gIGNvbnN0IGtha2FvID0gKHdpbmRvdyBhcyBhbnkpLktha2FvO1xyXG4gIGNvbnN0IEtha2FvTG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coa2FrYW8uQXV0aC5nZXRBY2Nlc3NUb2tlbigpKTsgLy8g7Lm07Lm07JikIOygkeq3vCDthqDtgbAg7ZmV7J24ICjroZzqt7jsnbgg7ZuEIO2VtOuLuSDthqDtgbDsnYQg7J207Jqp7ZWY7JesIOy2lOqwgCDquLDriqUg7IiY7ZaJIOqwgOuKpSlcclxuICAgIC8vIOy5tOy5tOyYpCDroZzqt7jsnbgg66eB7YGsIO2VtOygnFxyXG4gICAga2FrYW8uQVBJLnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvdjEvdXNlci91bmxpbmsnLFxyXG4gICAgICBzdWNjZXNzOiAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAvLyDroZzqt7jsnbgg7ISx6rO17ZWgIOqyveyasCDsoJXrs7Qg7ZmV7J24IO2bhCAvIO2OmOydtOyngOuhnCBwdXNoXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBSb3V0ZXIucHVzaCgnLycpO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsOiAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFdyYXBwZXI+XHJcbiAgICAgIDxUaXRsZT5LYUthbyBQYWdlLi4uPC9UaXRsZT5cclxuXHJcbiAgICAgIDxCdXR0b24gb25DbGljaz17S2FrYW9Mb2dvdXR9PlxyXG4gICAgICAgIDxCdXR0b25UZXh0PkxvZ291dDwvQnV0dG9uVGV4dD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICA8L1dyYXBwZXI+XHJcbiAgKVxyXG59XHJcblxyXG5cclxuXHJcbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gICAgbWF4LXdpZHRoOiA3MjBweDtcclxuXHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxuXHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCBUaXRsZSA9IHN0eWxlZC5oMmBgO1xyXG5cclxuY29uc3QgQnV0dG9uID0gc3R5bGVkLmJ1dHRvbmBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZWYwMWI7XHJcblxyXG4gICAgd2lkdGg6IDM2MHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG5cclxuICAgIG1hcmdpbjogNnB4IDA7XHJcblxyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG5cclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuYDtcclxuXHJcbmNvbnN0IEJ1dHRvblRleHQgPSBzdHlsZWQuaDRgXHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG5gOyJdLCJuYW1lcyI6WyJSb3V0ZXIiLCJSZWFjdCIsInN0eWxlZCIsIktha2FvIiwia2FrYW8iLCJ3aW5kb3ciLCJLYWthb0xvZ291dCIsImNvbnNvbGUiLCJsb2ciLCJBdXRoIiwiZ2V0QWNjZXNzVG9rZW4iLCJBUEkiLCJyZXF1ZXN0IiwidXJsIiwic3VjY2VzcyIsInJlcyIsInB1c2giLCJmYWlsIiwiZXJyb3IiLCJXcmFwcGVyIiwiZGl2IiwiVGl0bGUiLCJoMiIsIkJ1dHRvbiIsImJ1dHRvbiIsIkJ1dHRvblRleHQiLCJoNCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/login/kakao.tsx\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("styled-components");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/login/kakao.tsx"));
module.exports = __webpack_exports__;

})();