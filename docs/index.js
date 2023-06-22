/*! For license information please see index.js.LICENSE.txt */
var cowSwapWidget
;(() => {
  'use strict'
  var e = {
      281: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.JsonRpcManager = void 0)
        const n = ['connect', 'disconnect', 'chainChanged', 'accountsChanged']
        t.JsonRpcManager = class {
          constructor(e) {
            ;(this.contentWindow = e),
              (this.ethereumProvider = null),
              (this.requests = {}),
              (this.processEvent = (e) => {
                '2.0' === e.data.jsonrpc &&
                  (this.ethereumProvider ? this.processRequest(e.data) : (this.requests[e.data.id] = e.data))
              }),
              window.addEventListener('message', this.processEvent)
          }
          disconnect() {
            ;(this.ethereumProvider = null), window.removeEventListener('message', this.processEvent)
          }
          onConnect(e) {
            ;(this.ethereumProvider = e),
              Object.keys(this.requests).forEach((e) => {
                this.processRequest(this.requests[e])
              }),
              (this.requests = {}),
              n.forEach((t) => {
                e.on(t, (e) => {
                  this.postMessage({ method: t, params: [e] })
                })
              })
          }
          processRequest(e) {
            this.ethereumProvider &&
              ('enable' === e.method ? this.ethereumProvider.enable() : this.ethereumProvider.request(e))
                .then((t) => {
                  this.postMessage({ id: e.id, result: t })
                })
                .catch((t) => {
                  this.postMessage({ id: e.id, error: t })
                })
          }
          postMessage(e) {
            this.contentWindow.postMessage(Object.assign({ jsonrpc: '2.0' }, e), '*')
          }
        }
      },
      312: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.COWSWAP_URLS = void 0),
          (t.COWSWAP_URLS = { local: 'https://swap-dev-git-feat-cow-widget-cowswap.vercel.app', prod: 'swap.cow.fi' })
      },
      65: (e, t, n) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.cowSwapWidget = void 0)
        const o = n(281),
          r = n(269)
        t.cowSwapWidget = function (e, t) {
          const { container: n, provider: a } = e,
            i = (function (e, t) {
              const { width: n, height: o } = e,
                a = document.createElement('iframe')
              return (
                (a.src = (0, r.buildWidgetUrl)(t.urlParams)),
                (a.width = `${n}px`),
                (a.height = `${o}px`),
                (a.style.border = '0'),
                a
              )
            })(e, t)
          ;(n.innerHTML = ''), n.appendChild(i)
          const { contentWindow: s } = i
          if (!s) throw new Error('Iframe does not contain a window!')
          return (
            a && new o.JsonRpcManager(s).onConnect(a),
            (e) =>
              (function (e, t) {
                const n = (0, r.buildWidgetPath)(e.urlParams),
                  o = (0, r.buildTradeAmountsQuery)(e.urlParams).toString()
                t.postMessage({ key: 'cowSwapWidgetUrlUpdate', pathname: n, search: o }, '*'),
                  t.postMessage({ key: 'cowSwapWidgetAppUpdate', params: e.appParams }, '*')
              })(e, s)
          )
        }
      },
      79: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.DemoPage = void 0),
          (t.DemoPage = function () {
            const e = document.createElement('div')
            return (
              (e.innerHTML =
                '\n    <div>\n      <style>\n        body {\n            min-height: 100vh;\n            margin: 0;\n            background: rgb(5, 43, 101);\n            font-family: sans-serif;\n        }\n\n        #demoPage {\n            display: grid;\n            grid-template-columns: 300px 1fr 300px;\n            max-width: 1000px;\n            margin: 0 auto;\n        }\n\n        #widgetContainer {\n            margin: 30px;\n        }\n\n        #widgetContainer > iframe {\n            border: 1px solid #fff;\n            border-radius: 8px;\n            overflow: hidden;\n            background: rgba(83,196,239,0.6);\n            box-shadow: 1px 10px 47px 0 rgba(83,196,239,0.6);\n        }\n\n        #tradeSettings, #tradeSettings input, #tradeSettings select {\n            text-align: right;\n        }\n\n        .settingsContainer {\n            color: #fff;\n            margin-top: 30px;\n        }\n\n        .settingsForm > label {\n            display: block;\n            margin-bottom: 15px;\n        }\n\n        .settingsForm > label > span {\n            display: block;\n            margin-bottom: 2px;\n        }\n\n        .settingsForm input, .settingsForm select {\n            border: 0;\n            padding: 6px 0 4px 8px;\n            border-right: 8px solid transparent;\n            background: #ffffff36;\n            color: #fff;\n            border-radius: 4px;\n            outline: none;\n        }\n\n        .settingsForm input:focus, .settingsForm select:focus {\n            outline: 1px solid rgba(255,255,255,0.51);\n        }\n\n        .actionButton, #mainMenu > button.active {\n            background: rgb(202, 233, 255);\n            color: rgb(5, 43, 101);\n            border-radius: 8px;\n            padding: 8px 20px;\n            outline: none;\n            border: 0;\n            cursor: pointer;\n            font-size: 16px;\n            font-weight: bold;\n        }\n\n        #mainMenu {\n            max-width: 1000px;\n            text-align: center;\n            margin: 30px auto 0;\n            padding-left: 60px;\n        }\n\n        #mainMenu > button:not(.active) {\n            background: transparent;\n            color: rgb(202, 233, 255);\n            text-decoration: underline;\n        }\n      </style>\n\n        <div id="mainMenu">\n            <button id="connectedProviderButton" class="actionButton active">Connected to provider</button>\n            <button id="standaloneModeButton" class="actionButton">Standalone mode</button>\n        </div>\n      <div id="demoPage">\n        <div class="settingsContainer" id="tradeSettings">\n            <h3>CowSwap widget</h3>\n            <form class="settingsForm" id="tradeSettingsForm">\n                <label>\n                    <span>Network</span>\n                    <select name="chainId">\n                        <option value="1" selected="selected">Ethereum</option>\n                        <option value="100">Gnosis chain</option>\n                        <option value="5">Goerli</option>\n                    </select>\n                </label>\n                <label>\n                    <span>Environment</span>\n                    <select name="env">\n                        <option value="local" selected="selected">Local</option>\n                        <option value="prod">Prod</option>\n                    </select>\n                </label>\n                <label>\n                    <span>Trade type</span>\n                    <select name="tradeType">\n                        <option value="swap" selected="selected">Swap</option>\n                        <option value="limit-orders">Limit orders</option>\n                        <option value="advanced-orders">Advanced orders</option>\n                    </select>\n                </label>\n                <label>\n                    <span>Sell currency</span>\n                    <input name="tradeAssets.sell.asset" type="text" value="COW"/>\n                </label>\n                <label>\n                    <span>Sell amount</span>\n                    <input name="tradeAssets.sell.amount" type="text" value="1200"/>\n                </label>\n                <label>\n                    <span>Buy currency</span>\n                    <input name="tradeAssets.buy.asset" type="text" value="WETH"/>\n                </label>\n                <label>\n                    <span>Buy amount</span>\n                    <input name="tradeAssets.buy.amount" type="text" value=""/>\n                </label>\n                <label>\n                    <span>Theme</span>\n                    <select name="theme">\n                        <option value="light" selected="selected">Light</option>\n                        <option value="dark">Dark</option>\n                    </select>\n                </label>\n                <button class="actionButton">Update</button>\n            </form>\n        </div>\n        <div id="widgetContainer"></div>\n        <div class="settingsContainer">\n            <br/><br/><br/>\n            <form class="settingsForm" id="appSettingsForm">\n                <label>\n                    <span>Custom logo url</span>\n                    <input\n                        name="logoUrl"\n                        type="text"\n                        value="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"/>\n                </label>\n                <label>\n                    <span>Hide logo</span>\n                    <input\n                        name="hideLogo"\n                        type="checkbox"/>\n                </label>\n                <label>\n                    <span>Hide network selector</span>\n                    <input\n                        name="hideNetworkSelector"\n                        type="checkbox"/>\n                </label>\n                <button class="actionButton">Update</button>\n            </form>\n        </div>\n      </div>\n    </div>\n  '),
              e
            )
          })
      },
      66: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.ProviderMode = void 0),
          (t.ProviderMode = function (e) {
            const t = document.getElementById('connectedProviderButton'),
              n = document.getElementById('standaloneModeButton'),
              o = () => {
                t.classList.toggle('active'), n.classList.toggle('active')
              }
            t.addEventListener('click', () => {
              e(window.ethereum), o()
            }),
              n.addEventListener('click', () => {
                e(), o()
              }),
              window.ethereum || (o(), (t.style.display = 'none'))
          })
      },
      749: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Settings = void 0),
          (t.Settings = function (e) {
            const t = document.getElementById('appSettingsForm'),
              n = document.getElementById('tradeSettingsForm')
            ;['submit', 'change'].forEach((o) => {
              ;[n, t].forEach((r) => {
                r.addEventListener(o, (o) => {
                  o.preventDefault(),
                    (function () {
                      const o = Object.fromEntries(new FormData(n)),
                        r = Object.fromEntries(new FormData(t))
                      e({
                        urlParams: {
                          env: o.env,
                          chainId: o.chainId,
                          theme: o.theme,
                          tradeType: o.tradeType,
                          tradeAssets: {
                            sell: { asset: o['tradeAssets.sell.asset'], amount: o['tradeAssets.sell.amount'] },
                            buy: { asset: o['tradeAssets.buy.asset'], amount: o['tradeAssets.buy.amount'] },
                          },
                        },
                        appParams: {
                          logoUrl: r.logoUrl,
                          hideLogo: r.hideLogo,
                          hideNetworkSelector: r.hideNetworkSelector,
                        },
                      })
                    })()
                })
              })
            })
          })
      },
      607: (e, t, n) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.COWSWAP_URLS = t.cowSwapWidget = void 0)
        const o = n(655)
        var r = n(65)
        Object.defineProperty(t, 'cowSwapWidget', {
          enumerable: !0,
          get: function () {
            return r.cowSwapWidget
          },
        })
        var a = n(312)
        Object.defineProperty(t, 'COWSWAP_URLS', {
          enumerable: !0,
          get: function () {
            return a.COWSWAP_URLS
          },
        }),
          o.__exportStar(n(699), t)
      },
      699: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 })
      },
      269: (e, t, n) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.buildTradeAmountsQuery = t.buildWidgetPath = t.buildWidgetUrl = void 0)
        const o = n(312)
        function r(e) {
          const { chainId: t, tradeAssets: n, tradeType: o } = e
          return `/${t}/widget/${o}/${n ? [n.sell.asset, n.buy.asset].map(encodeURIComponent).join('/') : ''}`
        }
        function a(e) {
          const { tradeAssets: t, theme: n } = e,
            o = new URLSearchParams()
          if (t) {
            const { sell: e, buy: n } = t
            e.amount && o.append('sellAmount', e.amount), n.amount && o.append('buyAmount', n.amount)
          }
          return n && o.append('theme', n), o
        }
        ;(t.buildWidgetUrl = function (e) {
          return o.COWSWAP_URLS[e.env] + '/#' + r(e) + '?' + a(e)
        }),
          (t.buildWidgetPath = r),
          (t.buildTradeAmountsQuery = a)
      },
      655: (e, t, n) => {
        n.r(t),
          n.d(t, {
            __assign: () => a,
            __asyncDelegator: () => w,
            __asyncGenerator: () => y,
            __asyncValues: () => _,
            __await: () => v,
            __awaiter: () => u,
            __classPrivateFieldGet: () => O,
            __classPrivateFieldSet: () => j,
            __createBinding: () => p,
            __decorate: () => s,
            __exportStar: () => f,
            __extends: () => r,
            __generator: () => d,
            __importDefault: () => x,
            __importStar: () => S,
            __makeTemplateObject: () => P,
            __metadata: () => c,
            __param: () => l,
            __read: () => b,
            __rest: () => i,
            __spread: () => h,
            __spreadArrays: () => g,
            __values: () => m,
          })
        var o = function (e, t) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t
                }) ||
              function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
              }),
            o(e, t)
          )
        }
        function r(e, t) {
          function n() {
            this.constructor = e
          }
          o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()))
        }
        var a = function () {
          return (
            (a =
              Object.assign ||
              function (e) {
                for (var t, n = 1, o = arguments.length; n < o; n++)
                  for (var r in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                return e
              }),
            a.apply(this, arguments)
          )
        }
        function i(e, t) {
          var n = {}
          for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o])
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var r = 0
            for (o = Object.getOwnPropertySymbols(e); r < o.length; r++)
              t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]])
          }
          return n
        }
        function s(e, t, n, o) {
          var r,
            a = arguments.length,
            i = a < 3 ? t : null === o ? (o = Object.getOwnPropertyDescriptor(t, n)) : o
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) i = Reflect.decorate(e, t, n, o)
          else
            for (var s = e.length - 1; s >= 0; s--)
              (r = e[s]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, n, i) : r(t, n)) || i)
          return a > 3 && i && Object.defineProperty(t, n, i), i
        }
        function l(e, t) {
          return function (n, o) {
            t(n, o, e)
          }
        }
        function c(e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(e, t)
        }
        function u(e, t, n, o) {
          return new (n || (n = Promise))(function (r, a) {
            function i(e) {
              try {
                l(o.next(e))
              } catch (e) {
                a(e)
              }
            }
            function s(e) {
              try {
                l(o.throw(e))
              } catch (e) {
                a(e)
              }
            }
            function l(e) {
              var t
              e.done
                ? r(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t)
                      })).then(i, s)
            }
            l((o = o.apply(e, t || [])).next())
          })
        }
        function d(e, t) {
          var n,
            o,
            r,
            a,
            i = {
              label: 0,
              sent: function () {
                if (1 & r[0]) throw r[1]
                return r[1]
              },
              trys: [],
              ops: [],
            }
          return (
            (a = { next: s(0), throw: s(1), return: s(2) }),
            'function' == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this
              }),
            a
          )
          function s(a) {
            return function (s) {
              return (function (a) {
                if (n) throw new TypeError('Generator is already executing.')
                for (; i; )
                  try {
                    if (
                      ((n = 1),
                      o &&
                        (r = 2 & a[0] ? o.return : a[0] ? o.throw || ((r = o.return) && r.call(o), 0) : o.next) &&
                        !(r = r.call(o, a[1])).done)
                    )
                      return r
                    switch (((o = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                      case 0:
                      case 1:
                        r = a
                        break
                      case 4:
                        return i.label++, { value: a[1], done: !1 }
                      case 5:
                        i.label++, (o = a[1]), (a = [0])
                        continue
                      case 7:
                        ;(a = i.ops.pop()), i.trys.pop()
                        continue
                      default:
                        if (!((r = (r = i.trys).length > 0 && r[r.length - 1]) || (6 !== a[0] && 2 !== a[0]))) {
                          i = 0
                          continue
                        }
                        if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                          i.label = a[1]
                          break
                        }
                        if (6 === a[0] && i.label < r[1]) {
                          ;(i.label = r[1]), (r = a)
                          break
                        }
                        if (r && i.label < r[2]) {
                          ;(i.label = r[2]), i.ops.push(a)
                          break
                        }
                        r[2] && i.ops.pop(), i.trys.pop()
                        continue
                    }
                    a = t.call(e, i)
                  } catch (e) {
                    ;(a = [6, e]), (o = 0)
                  } finally {
                    n = r = 0
                  }
                if (5 & a[0]) throw a[1]
                return { value: a[0] ? a[1] : void 0, done: !0 }
              })([a, s])
            }
          }
        }
        function p(e, t, n, o) {
          void 0 === o && (o = n), (e[o] = t[n])
        }
        function f(e, t) {
          for (var n in e) 'default' === n || t.hasOwnProperty(n) || (t[n] = e[n])
        }
        function m(e) {
          var t = 'function' == typeof Symbol && Symbol.iterator,
            n = t && e[t],
            o = 0
          if (n) return n.call(e)
          if (e && 'number' == typeof e.length)
            return {
              next: function () {
                return e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e }
              },
            }
          throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
        }
        function b(e, t) {
          var n = 'function' == typeof Symbol && e[Symbol.iterator]
          if (!n) return e
          var o,
            r,
            a = n.call(e),
            i = []
          try {
            for (; (void 0 === t || t-- > 0) && !(o = a.next()).done; ) i.push(o.value)
          } catch (e) {
            r = { error: e }
          } finally {
            try {
              o && !o.done && (n = a.return) && n.call(a)
            } finally {
              if (r) throw r.error
            }
          }
          return i
        }
        function h() {
          for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(b(arguments[t]))
          return e
        }
        function g() {
          for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length
          var o = Array(e),
            r = 0
          for (t = 0; t < n; t++) for (var a = arguments[t], i = 0, s = a.length; i < s; i++, r++) o[r] = a[i]
          return o
        }
        function v(e) {
          return this instanceof v ? ((this.v = e), this) : new v(e)
        }
        function y(e, t, n) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
          var o,
            r = n.apply(e, t || []),
            a = []
          return (
            (o = {}),
            i('next'),
            i('throw'),
            i('return'),
            (o[Symbol.asyncIterator] = function () {
              return this
            }),
            o
          )
          function i(e) {
            r[e] &&
              (o[e] = function (t) {
                return new Promise(function (n, o) {
                  a.push([e, t, n, o]) > 1 || s(e, t)
                })
              })
          }
          function s(e, t) {
            try {
              ;(n = r[e](t)).value instanceof v ? Promise.resolve(n.value.v).then(l, c) : u(a[0][2], n)
            } catch (e) {
              u(a[0][3], e)
            }
            var n
          }
          function l(e) {
            s('next', e)
          }
          function c(e) {
            s('throw', e)
          }
          function u(e, t) {
            e(t), a.shift(), a.length && s(a[0][0], a[0][1])
          }
        }
        function w(e) {
          var t, n
          return (
            (t = {}),
            o('next'),
            o('throw', function (e) {
              throw e
            }),
            o('return'),
            (t[Symbol.iterator] = function () {
              return this
            }),
            t
          )
          function o(o, r) {
            t[o] = e[o]
              ? function (t) {
                  return (n = !n) ? { value: v(e[o](t)), done: 'return' === o } : r ? r(t) : t
                }
              : r
          }
        }
        function _(e) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
          var t,
            n = e[Symbol.asyncIterator]
          return n
            ? n.call(e)
            : ((e = m(e)),
              (t = {}),
              o('next'),
              o('throw'),
              o('return'),
              (t[Symbol.asyncIterator] = function () {
                return this
              }),
              t)
          function o(n) {
            t[n] =
              e[n] &&
              function (t) {
                return new Promise(function (o, r) {
                  !(function (e, t, n, o) {
                    Promise.resolve(o).then(function (t) {
                      e({ value: t, done: n })
                    }, t)
                  })(o, r, (t = e[n](t)).done, t.value)
                })
              }
          }
        }
        function P(e, t) {
          return Object.defineProperty ? Object.defineProperty(e, 'raw', { value: t }) : (e.raw = t), e
        }
        function S(e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n])
          return (t.default = e), t
        }
        function x(e) {
          return e && e.__esModule ? e : { default: e }
        }
        function O(e, t) {
          if (!t.has(e)) throw new TypeError('attempted to get private field on non-instance')
          return t.get(e)
        }
        function j(e, t, n) {
          if (!t.has(e)) throw new TypeError('attempted to set private field on non-instance')
          return t.set(e, n), n
        }
      },
    },
    t = {}
  function n(o) {
    var r = t[o]
    if (void 0 !== r) return r.exports
    var a = (t[o] = { exports: {} })
    return e[o](a, a.exports, n), a.exports
  }
  ;(n.d = (e, t) => {
    for (var o in t) n.o(t, o) && !n.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: t[o] })
  }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    })
  var o = {}
  ;(() => {
    var e = o
    Object.defineProperty(e, '__esModule', { value: !0 })
    const t = n(607),
      r = n(79),
      a = n(749),
      i = n(66),
      s = (0, r.DemoPage)()
    document.body.appendChild(s)
    const l = {
        env: 'local',
        chainId: 1,
        theme: 'light',
        tradeType: 'swap',
        tradeAssets: { sell: { asset: 'COW', amount: '1200' }, buy: { asset: 'WETH' } },
      },
      c = {}
    function u(e) {
      const n = (0, t.cowSwapWidget)(
        { width: 400, height: 640, container: document.getElementById('widgetContainer'), provider: e },
        { urlParams: l, appParams: c }
      )
      ;(0, a.Settings)(n)
    }
    u(window.ethereum), (0, i.ProviderMode)(u)
  })(),
    (cowSwapWidget = o)
})()
