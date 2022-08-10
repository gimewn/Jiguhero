(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6484:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/MenuBarDesktop.tsx
/* eslint-disable jsx-a11y/anchor-is-valid */






const Menu = /*#__PURE__*/external_styled_components_default()('div').withConfig({
  displayName: "MenuBarDesktop__Menu",
  componentId: "sc-8yhrkc-0"
})(["display:flex;justify-content:start;align-items:center;a{font-family:'PyeongChang-Bold';margin:0 10px;color:#555555;font-size:15px;}a:hover{color:#65ACE2;}.active{color:#65ACE2;}"]);
function UnderlineLink() {
  const router = (0,router_.useRouter)();
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Menu, {
    id: "NavBar",
    children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/",
      className: "navMenu",
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: router.pathname == "/" ? "active" : "",
        children: "\uBA54\uC778"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/ground",
      className: "navMenu",
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: router.pathname == "/ground" ? "active" : "",
        children: "\uD65C\uB3D9\uAD6C\uC5ED"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/mission",
      className: "navMenu",
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: router.pathname == "/mission" ? "active" : "",
        children: "\uB300\uC6D0\uB4E4\uC758 \uC784\uBB34"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/mission/nowjoin",
      className: "navMenu",
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: router.pathname == "/mission/nowjoin" ? "active" : "",
        children: "\uC784\uBB34 \uC778\uC99D"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/mypage",
      className: "navMenu",
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: router.pathname == "/mypage" ? "active" : "",
        children: "\uB9C8\uC774\uD398\uC774\uC9C0"
      })
    })]
  });
}
;// CONCATENATED MODULE: external "@mui/icons-material/PeopleAltRounded"
const PeopleAltRounded_namespaceObject = require("@mui/icons-material/PeopleAltRounded");
var PeopleAltRounded_default = /*#__PURE__*/__webpack_require__.n(PeopleAltRounded_namespaceObject);
;// CONCATENATED MODULE: external "@mui/icons-material/HomeRounded"
const HomeRounded_namespaceObject = require("@mui/icons-material/HomeRounded");
var HomeRounded_default = /*#__PURE__*/__webpack_require__.n(HomeRounded_namespaceObject);
;// CONCATENATED MODULE: external "@mui/icons-material/MapRounded"
const MapRounded_namespaceObject = require("@mui/icons-material/MapRounded");
var MapRounded_default = /*#__PURE__*/__webpack_require__.n(MapRounded_namespaceObject);
;// CONCATENATED MODULE: external "@mui/icons-material/CameraAltRounded"
const CameraAltRounded_namespaceObject = require("@mui/icons-material/CameraAltRounded");
var CameraAltRounded_default = /*#__PURE__*/__webpack_require__.n(CameraAltRounded_namespaceObject);
;// CONCATENATED MODULE: external "@mui/icons-material/PersonRounded"
const PersonRounded_namespaceObject = require("@mui/icons-material/PersonRounded");
var PersonRounded_default = /*#__PURE__*/__webpack_require__.n(PersonRounded_namespaceObject);
;// CONCATENATED MODULE: ./components/MenuBarMobile.tsx











const Label = /*#__PURE__*/external_styled_components_default()('p').withConfig({
  displayName: "MenuBarMobile__Label",
  componentId: "sc-1rl57m-0"
})(["margin:0 5px 0 5px;font-size:0.7em;"]);
const NavForMobile = /*#__PURE__*/external_styled_components_default()('div').withConfig({
  displayName: "MenuBarMobile__NavForMobile",
  componentId: "sc-1rl57m-1"
})(["position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:15px 20px;background-color:white;background-attachment:fixed;a{display:flex;justify-content:center;flex-direction:column;align-items:center;svg{color:#98C064;font-size:2em;&:hover{color:#65ACE2;}}&.active{svg{color:#65ACE2;font-size:2.2em;}p{font-color:#98C064;font-size:0.8em;}}}"]);
function SimpleBottomNavigation() {
  // const [value, setValue] = React.useState();
  const router = (0,router_.useRouter)();
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(NavForMobile, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/",
      className: "navMenu",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
        className: router.pathname == "/" ? "active" : "",
        children: [/*#__PURE__*/jsx_runtime_.jsx((HomeRounded_default()), {}), /*#__PURE__*/jsx_runtime_.jsx(Label, {
          children: "\uBA54\uC778"
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/ground",
      className: "navMenu",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
        className: router.pathname == "/ground" ? "active" : "",
        children: [/*#__PURE__*/jsx_runtime_.jsx((MapRounded_default()), {}), /*#__PURE__*/jsx_runtime_.jsx(Label, {
          children: "\uD65C\uB3D9\uAD6C\uC5ED"
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/mission",
      className: "navMenu",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
        className: router.pathname == "/mission" ? "active" : "",
        children: [/*#__PURE__*/jsx_runtime_.jsx((PeopleAltRounded_default()), {}), /*#__PURE__*/jsx_runtime_.jsx(Label, {
          children: "\uB300\uC6D0\uB4E4\uC758 \uC784\uBB34"
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/mission/nowjoin",
      className: "navMenu",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
        className: router.pathname == "/mission/nowjoin" ? "active" : "",
        children: [/*#__PURE__*/jsx_runtime_.jsx((CameraAltRounded_default()), {}), /*#__PURE__*/jsx_runtime_.jsx(Label, {
          children: "\uC784\uBB34 \uC778\uC99D"
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/mypage",
      className: "navMenu",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
        className: router.pathname == "/mypage" ? "active" : "",
        children: [/*#__PURE__*/jsx_runtime_.jsx((PersonRounded_default()), {}), /*#__PURE__*/jsx_runtime_.jsx(Label, {
          children: "\uB9C8\uC774\uD398\uC774\uC9C0"
        })]
      })
    })]
  }) // <BottomNavigation
  //   showLabels
  //   value={value}
  //   onChange={(event, newValue) => {
  //     setValue(newValue);
  //   }}
  // >
  //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="메인" icon={<HomeRoundedIcon />} onClick={() => onLink("/")} />
  //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="활동구역" icon={<MapRoundedIcon />} onClick={() => onLink("/ground")} />
  //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="대원들의 임무" icon={<PeopleAltRoundedIcon />} onClick={() => onLink("/mission")} />
  //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="임무 인증" icon={<CameraAltRoundedIcon />} onClick={() => onLink("/mission/nowjoin")} />
  //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="마이페이지" icon={<PersonRoundedIcon />} onClick={() => onLink("/mypage")} />
  // </BottomNavigation>
  ;
}
;// CONCATENATED MODULE: ./public/logo.png
/* harmony default export */ const logo = ({"src":"/_next/static/media/logo.29533118.png","height":449,"width":1848,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAATUlEQVR4nAFCAL3/AbC5sqgBBgry4wWasAb7+w3a6F3p7QQ3KgQB/P3//wDxAbG3uKMKBgD30wSaqg7/+wPR42zw9QgrLQMB/fr//wD9X5oiluYIW8wAAAAASUVORK5CYII="});
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "@tanstack/react-query"
var react_query_ = __webpack_require__(8910);
// EXTERNAL MODULE: ./node_modules/next/script.js
var script = __webpack_require__(4298);
var script_default = /*#__PURE__*/__webpack_require__.n(script);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















const queryClient = new react_query_.QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
});
const Header = /*#__PURE__*/external_styled_components_default()("div").withConfig({
  displayName: "_app__Header",
  componentId: "sc-1cmcwvb-0"
})(["display:flex;justify-content:space-between;padding:20px;position:fixed;left:0;right:0;z-index:999;background-color:white;"]);
const Body = /*#__PURE__*/external_styled_components_default()("div").withConfig({
  displayName: "_app__Body",
  componentId: "sc-1cmcwvb-1"
})(["display:flex;justify-content:center;width:100%;height:100%;margin-top:80px;"]);
const Container = /*#__PURE__*/external_styled_components_default()("div").withConfig({
  displayName: "_app__Container",
  componentId: "sc-1cmcwvb-2"
})(["display:flex;justify-content:center;flex-direction:column;min-width:375px;span,p{align-items:flex-start;}div{align-items:center;}@media only screen and (max-width:650px){margin-bottom:80px;}"]);
const DeskMenu = /*#__PURE__*/external_styled_components_default()("div").withConfig({
  displayName: "_app__DeskMenu",
  componentId: "sc-1cmcwvb-3"
})(["@media only screen and (max-width:650px){display:none;}margin:auto 0;"]);
const Footer = /*#__PURE__*/external_styled_components_default()('div').withConfig({
  displayName: "_app__Footer",
  componentId: "sc-1cmcwvb-4"
})(["min-width:350px;height:80px;z-index:999;position:absolute;bottom:0;left:0;right:0;@media only screen and (min-width:650px){display:none;}"]);

function MyApp({
  Component,
  pageProps
}) {
  const router = (0,router_.useRouter)();

  const onLink = href => {
    router.push(href);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_recoil_.RecoilRoot, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "favicon",
        href: "FRONT\\jiguhero\\public\\favicon.ico"
      }), /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "\uC9C0\uAD6C\uBC29\uC704\uB300"
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(Header, {
      children: [/*#__PURE__*/jsx_runtime_.jsx((image_default()), {
        src: logo,
        width: 160,
        height: 40,
        onClick: () => onLink("/"),
        layout: "fixed",
        alt: "\uB85C\uACE0"
      }), /*#__PURE__*/jsx_runtime_.jsx(DeskMenu, {
        children: /*#__PURE__*/jsx_runtime_.jsx(UnderlineLink, {})
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(Body, {
      children: /*#__PURE__*/jsx_runtime_.jsx(Container, {
        children: /*#__PURE__*/jsx_runtime_.jsx(react_query_.QueryClientProvider, {
          client: queryClient,
          children: /*#__PURE__*/jsx_runtime_.jsx(react_query_.Hydrate, {
            state: pageProps?.dehydratedState,
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.SessionProvider, {
              session: pageProps?.session,
              children: [/*#__PURE__*/jsx_runtime_.jsx((script_default()), {
                src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${"bb4b7193b8de121008bd7bfa4c617a94"}&libraries=services,clusterer&autoload=false`,
                strategy: "beforeInteractive"
              }), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))]
            })
          })
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(Footer, {
      children: /*#__PURE__*/jsx_runtime_.jsx(SimpleBottomNavigation, {})
    })]
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 4298:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(2189)


/***/ }),

/***/ 8910:
/***/ ((module) => {

"use strict";
module.exports = require("@tanstack/react-query");

/***/ }),

/***/ 1649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 5429:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9755:
/***/ ((module) => {

"use strict";
module.exports = require("recoil");

/***/ }),

/***/ 7518:
/***/ ((module) => {

"use strict";
module.exports = require("styled-components");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [286,675,645,664], () => (__webpack_exec__(6484)));
module.exports = __webpack_exports__;

})();