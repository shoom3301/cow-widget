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
        const r = n(281),
          o = n(269)
        t.cowSwapWidget = function (e) {
          const { container: t, provider: n } = e,
            a = (function (e) {
              const { width: t, height: n } = e,
                r = document.createElement('iframe')
              return (
                (r.src = (0, o.buildWidgetUrl)(e.urlParams)),
                (r.width = `${t}px`),
                (r.height = `${n}px`),
                (r.style.border = '0'),
                r
              )
            })(e)
          ;(t.innerHTML = ''), t.appendChild(a)
          const { contentWindow: i } = a
          if (!i) throw new Error('Iframe does not contain a window!')
          return (
            n && new r.JsonRpcManager(i).onConnect(n),
            (e) =>
              (function (e, t) {
                const n = (0, o.buildWidgetPath)(e),
                  r = (0, o.buildTradeAmountsQuery)(e).toString()
                t.postMessage({ key: 'cowSwapWidget', pathname: n, search: r }, '*')
              })(e, i)
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
                '\n    <div>\n      <style>\n        body {\n            min-height: 100vh;\n            margin: 0;\n            background: rgb(5, 43, 101);\n            font-family: sans-serif;\n        }\n\n        #demoPage {\n            display: grid;\n            grid-template-columns: 300px 1fr;\n            max-width: 1000px;\n            margin: 0 auto;\n        }\n\n        #widgetContainer {\n            margin: 30px;\n        }\n\n        #widgetContainer > iframe {\n            border: 1px solid #fff;\n            border-radius: 8px;\n            overflow: hidden;\n            background: rgba(83,196,239,0.6);\n            box-shadow: 1px 10px 47px 0 rgba(83,196,239,0.6);\n        }\n\n        #settingsContainer {\n            text-align: right;\n            color: #fff;\n            margin-top: 30px;\n        }\n\n        #settingsForm > label {\n            display: block;\n            margin-bottom: 15px;\n        }\n\n        #settingsForm > label > span {\n            display: block;\n            margin-bottom: 2px;\n        }\n\n        #settingsForm input, #settingsForm select {\n            border: 0;\n            padding: 6px 0 4px 8px;\n            border-right: 8px solid transparent;\n            text-align: right;\n            background: #ffffff36;\n            color: #fff;\n            border-radius: 4px;\n            outline: none;\n        }\n\n        #settingsForm input:focus, #settingsForm select:focus {\n            outline: 1px solid rgba(255,255,255,0.51);\n        }\n\n        #updateButton {\n            background: rgb(202, 233, 255);\n            color: rgb(5, 43, 101);\n            border-radius: 8px;\n            padding: 8px 20px;\n            outline: none;\n            border: 0;\n            cursor: pointer;\n            font-size: 16px;\n            font-weight: bold;\n        }\n      </style>\n\n      <div id="demoPage">\n        <div id="settingsContainer">\n            <h3>CowSwap widget</h3>\n            <form id="settingsForm">\n                <label>\n                    <span>Network</span>\n                    <select name="chainId">\n                        <option value="1" selected="selected">Ethereum</option>\n                        <option value="100">Gnosis chain</option>\n                        <option value="5">Goerli</option>\n                    </select>\n                </label>\n                <label>\n                    <span>Environment</span>\n                    <select name="env">\n                        <option value="local" selected="selected">Local</option>\n                        <option value="prod">Prod</option>\n                    </select>\n                </label>\n                <label>\n                    <span>Sell currency</span>\n                    <input name="tradeAssets.sell.asset" type="text" value="COW"/>\n                </label>\n                <label>\n                    <span>Sell amount</span>\n                    <input name="tradeAssets.sell.amount" type="text" value="1200"/>\n                </label>\n                <label>\n                    <span>Buy currency</span>\n                    <input name="tradeAssets.buy.asset" type="text" value="WETH"/>\n                </label>\n                <label>\n                    <span>Buy amount</span>\n                    <input name="tradeAssets.buy.amount" type="text" value=""/>\n                </label>\n                <label>\n                    <span>Theme</span>\n                    <select name="theme">\n                        <option value="light" selected="selected">Light</option>\n                        <option value="dark">Dark</option>\n                    </select>\n                </label>\n                <button id="updateButton">Update</button>\n            </form>\n        </div>\n        <div id="widgetContainer"></div>\n      </div>\n    </div>\n  '),
              e
            )
          })
      },
      607: (e, t, n) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.COWSWAP_URLS = t.cowSwapWidget = void 0)
        const r = n(582)
        var o = n(65)
        Object.defineProperty(t, 'cowSwapWidget', {
          enumerable: !0,
          get: function () {
            return o.cowSwapWidget
          },
        })
        var a = n(312)
        Object.defineProperty(t, 'COWSWAP_URLS', {
          enumerable: !0,
          get: function () {
            return a.COWSWAP_URLS
          },
        }),
          r.__exportStar(n(699), t)
      },
      699: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 })
      },
      269: (e, t, n) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.buildTradeAmountsQuery = t.buildWidgetPath = t.buildWidgetUrl = void 0)
        const r = n(312)
        function o(e) {
          const { chainId: t, tradeAssets: n } = e
          return `/${t}/swap/widget/${n ? [n.sell.asset, n.buy.asset].map(encodeURIComponent).join('/') : ''}`
        }
        function a(e) {
          const { tradeAssets: t, theme: n } = e,
            r = new URLSearchParams()
          if (t) {
            const { sell: e, buy: n } = t
            e.amount && r.append('sellAmount', e.amount), n.amount && r.append('buyAmount', n.amount)
          }
          return n && r.append('theme', n), r
        }
        ;(t.buildWidgetUrl = function (e) {
          return r.COWSWAP_URLS[e.env] + '/#' + o(e) + '?' + a(e)
        }),
          (t.buildWidgetPath = o),
          (t.buildTradeAmountsQuery = a)
      },
      582: (e, t, n) => {
        n.r(t),
          n.d(t, {
            __assign: () => a,
            __asyncDelegator: () => S,
            __asyncGenerator: () => x,
            __asyncValues: () => j,
            __await: () => O,
            __awaiter: () => h,
            __classPrivateFieldGet: () => T,
            __classPrivateFieldIn: () => I,
            __classPrivateFieldSet: () => M,
            __createBinding: () => b,
            __decorate: () => s,
            __esDecorate: () => l,
            __exportStar: () => m,
            __extends: () => o,
            __generator: () => y,
            __importDefault: () => C,
            __importStar: () => A,
            __makeTemplateObject: () => E,
            __metadata: () => f,
            __param: () => c,
            __propKey: () => d,
            __read: () => _,
            __rest: () => i,
            __runInitializers: () => u,
            __setFunctionName: () => p,
            __spread: () => g,
            __spreadArray: () => P,
            __spreadArrays: () => w,
            __values: () => v,
            default: () => R,
          })
        var r = function (e, t) {
          return (
            (r =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t
                }) ||
              function (e, t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
              }),
            r(e, t)
          )
        }
        function o(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null')
          function n() {
            this.constructor = e
          }
          r(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()))
        }
        var a = function () {
          return (
            (a =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                return e
              }),
            a.apply(this, arguments)
          )
        }
        function i(e, t) {
          var n = {}
          for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r])
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var o = 0
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
          }
          return n
        }
        function s(e, t, n, r) {
          var o,
            a = arguments.length,
            i = a < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) i = Reflect.decorate(e, t, n, r)
          else
            for (var s = e.length - 1; s >= 0; s--)
              (o = e[s]) && (i = (a < 3 ? o(i) : a > 3 ? o(t, n, i) : o(t, n)) || i)
          return a > 3 && i && Object.defineProperty(t, n, i), i
        }
        function c(e, t) {
          return function (n, r) {
            t(n, r, e)
          }
        }
        function l(e, t, n, r, o, a) {
          function i(e) {
            if (void 0 !== e && 'function' != typeof e) throw new TypeError('Function expected')
            return e
          }
          for (
            var s,
              c = r.kind,
              l = 'getter' === c ? 'get' : 'setter' === c ? 'set' : 'value',
              u = !t && e ? (r.static ? e : e.prototype) : null,
              d = t || (u ? Object.getOwnPropertyDescriptor(u, r.name) : {}),
              p = !1,
              f = n.length - 1;
            f >= 0;
            f--
          ) {
            var h = {}
            for (var y in r) h[y] = 'access' === y ? {} : r[y]
            for (var y in r.access) h.access[y] = r.access[y]
            h.addInitializer = function (e) {
              if (p) throw new TypeError('Cannot add initializers after decoration has completed')
              a.push(i(e || null))
            }
            var b = (0, n[f])('accessor' === c ? { get: d.get, set: d.set } : d[l], h)
            if ('accessor' === c) {
              if (void 0 === b) continue
              if (null === b || 'object' != typeof b) throw new TypeError('Object expected')
              ;(s = i(b.get)) && (d.get = s), (s = i(b.set)) && (d.set = s), (s = i(b.init)) && o.unshift(s)
            } else (s = i(b)) && ('field' === c ? o.unshift(s) : (d[l] = s))
          }
          u && Object.defineProperty(u, r.name, d), (p = !0)
        }
        function u(e, t, n) {
          for (var r = arguments.length > 2, o = 0; o < t.length; o++) n = r ? t[o].call(e, n) : t[o].call(e)
          return r ? n : void 0
        }
        function d(e) {
          return 'symbol' == typeof e ? e : ''.concat(e)
        }
        function p(e, t, n) {
          return (
            'symbol' == typeof t && (t = t.description ? '['.concat(t.description, ']') : ''),
            Object.defineProperty(e, 'name', { configurable: !0, value: n ? ''.concat(n, ' ', t) : t })
          )
        }
        function f(e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(e, t)
        }
        function h(e, t, n, r) {
          return new (n || (n = Promise))(function (o, a) {
            function i(e) {
              try {
                c(r.next(e))
              } catch (e) {
                a(e)
              }
            }
            function s(e) {
              try {
                c(r.throw(e))
              } catch (e) {
                a(e)
              }
            }
            function c(e) {
              var t
              e.done
                ? o(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t)
                      })).then(i, s)
            }
            c((r = r.apply(e, t || [])).next())
          })
        }
        function y(e, t) {
          var n,
            r,
            o,
            a,
            i = {
              label: 0,
              sent: function () {
                if (1 & o[0]) throw o[1]
                return o[1]
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
          function s(s) {
            return function (c) {
              return (function (s) {
                if (n) throw new TypeError('Generator is already executing.')
                for (; a && ((a = 0), s[0] && (i = 0)), i; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                        !(o = o.call(r, s[1])).done)
                    )
                      return o
                    switch (((r = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                      case 0:
                      case 1:
                        o = s
                        break
                      case 4:
                        return i.label++, { value: s[1], done: !1 }
                      case 5:
                        i.label++, (r = s[1]), (s = [0])
                        continue
                      case 7:
                        ;(s = i.ops.pop()), i.trys.pop()
                        continue
                      default:
                        if (!((o = (o = i.trys).length > 0 && o[o.length - 1]) || (6 !== s[0] && 2 !== s[0]))) {
                          i = 0
                          continue
                        }
                        if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                          i.label = s[1]
                          break
                        }
                        if (6 === s[0] && i.label < o[1]) {
                          ;(i.label = o[1]), (o = s)
                          break
                        }
                        if (o && i.label < o[2]) {
                          ;(i.label = o[2]), i.ops.push(s)
                          break
                        }
                        o[2] && i.ops.pop(), i.trys.pop()
                        continue
                    }
                    s = t.call(e, i)
                  } catch (e) {
                    ;(s = [6, e]), (r = 0)
                  } finally {
                    n = o = 0
                  }
                if (5 & s[0]) throw s[1]
                return { value: s[0] ? s[1] : void 0, done: !0 }
              })([s, c])
            }
          }
        }
        var b = Object.create
          ? function (e, t, n, r) {
              void 0 === r && (r = n)
              var o = Object.getOwnPropertyDescriptor(t, n)
              ;(o && !('get' in o ? !t.__esModule : o.writable || o.configurable)) ||
                (o = {
                  enumerable: !0,
                  get: function () {
                    return t[n]
                  },
                }),
                Object.defineProperty(e, r, o)
            }
          : function (e, t, n, r) {
              void 0 === r && (r = n), (e[r] = t[n])
            }
        function m(e, t) {
          for (var n in e) 'default' === n || Object.prototype.hasOwnProperty.call(t, n) || b(t, e, n)
        }
        function v(e) {
          var t = 'function' == typeof Symbol && Symbol.iterator,
            n = t && e[t],
            r = 0
          if (n) return n.call(e)
          if (e && 'number' == typeof e.length)
            return {
              next: function () {
                return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
              },
            }
          throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
        }
        function _(e, t) {
          var n = 'function' == typeof Symbol && e[Symbol.iterator]
          if (!n) return e
          var r,
            o,
            a = n.call(e),
            i = []
          try {
            for (; (void 0 === t || t-- > 0) && !(r = a.next()).done; ) i.push(r.value)
          } catch (e) {
            o = { error: e }
          } finally {
            try {
              r && !r.done && (n = a.return) && n.call(a)
            } finally {
              if (o) throw o.error
            }
          }
          return i
        }
        function g() {
          for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(_(arguments[t]))
          return e
        }
        function w() {
          for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length
          var r = Array(e),
            o = 0
          for (t = 0; t < n; t++) for (var a = arguments[t], i = 0, s = a.length; i < s; i++, o++) r[o] = a[i]
          return r
        }
        function P(e, t, n) {
          if (n || 2 === arguments.length)
            for (var r, o = 0, a = t.length; o < a; o++)
              (!r && o in t) || (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]))
          return e.concat(r || Array.prototype.slice.call(t))
        }
        function O(e) {
          return this instanceof O ? ((this.v = e), this) : new O(e)
        }
        function x(e, t, n) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
          var r,
            o = n.apply(e, t || []),
            a = []
          return (
            (r = {}),
            i('next'),
            i('throw'),
            i('return'),
            (r[Symbol.asyncIterator] = function () {
              return this
            }),
            r
          )
          function i(e) {
            o[e] &&
              (r[e] = function (t) {
                return new Promise(function (n, r) {
                  a.push([e, t, n, r]) > 1 || s(e, t)
                })
              })
          }
          function s(e, t) {
            try {
              ;(n = o[e](t)).value instanceof O ? Promise.resolve(n.value.v).then(c, l) : u(a[0][2], n)
            } catch (e) {
              u(a[0][3], e)
            }
            var n
          }
          function c(e) {
            s('next', e)
          }
          function l(e) {
            s('throw', e)
          }
          function u(e, t) {
            e(t), a.shift(), a.length && s(a[0][0], a[0][1])
          }
        }
        function S(e) {
          var t, n
          return (
            (t = {}),
            r('next'),
            r('throw', function (e) {
              throw e
            }),
            r('return'),
            (t[Symbol.iterator] = function () {
              return this
            }),
            t
          )
          function r(r, o) {
            t[r] = e[r]
              ? function (t) {
                  return (n = !n) ? { value: O(e[r](t)), done: !1 } : o ? o(t) : t
                }
              : o
          }
        }
        function j(e) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
          var t,
            n = e[Symbol.asyncIterator]
          return n
            ? n.call(e)
            : ((e = v(e)),
              (t = {}),
              r('next'),
              r('throw'),
              r('return'),
              (t[Symbol.asyncIterator] = function () {
                return this
              }),
              t)
          function r(n) {
            t[n] =
              e[n] &&
              function (t) {
                return new Promise(function (r, o) {
                  !(function (e, t, n, r) {
                    Promise.resolve(r).then(function (t) {
                      e({ value: t, done: n })
                    }, t)
                  })(r, o, (t = e[n](t)).done, t.value)
                })
              }
          }
        }
        function E(e, t) {
          return Object.defineProperty ? Object.defineProperty(e, 'raw', { value: t }) : (e.raw = t), e
        }
        var W = Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: !0, value: t })
            }
          : function (e, t) {
              e.default = t
            }
        function A(e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e) for (var n in e) 'default' !== n && Object.prototype.hasOwnProperty.call(e, n) && b(t, e, n)
          return W(t, e), t
        }
        function C(e) {
          return e && e.__esModule ? e : { default: e }
        }
        function T(e, t, n, r) {
          if ('a' === n && !r) throw new TypeError('Private accessor was defined without a getter')
          if ('function' == typeof t ? e !== t || !r : !t.has(e))
            throw new TypeError('Cannot read private member from an object whose class did not declare it')
          return 'm' === n ? r : 'a' === n ? r.call(e) : r ? r.value : t.get(e)
        }
        function M(e, t, n, r, o) {
          if ('m' === r) throw new TypeError('Private method is not writable')
          if ('a' === r && !o) throw new TypeError('Private accessor was defined without a setter')
          if ('function' == typeof t ? e !== t || !o : !t.has(e))
            throw new TypeError('Cannot write private member to an object whose class did not declare it')
          return 'a' === r ? o.call(e, n) : o ? (o.value = n) : t.set(e, n), n
        }
        function I(e, t) {
          if (null === t || ('object' != typeof t && 'function' != typeof t))
            throw new TypeError("Cannot use 'in' operator on non-object")
          return 'function' == typeof e ? t === e : e.has(t)
        }
        const R = {
          __extends: o,
          __assign: a,
          __rest: i,
          __decorate: s,
          __param: c,
          __metadata: f,
          __awaiter: h,
          __generator: y,
          __createBinding: b,
          __exportStar: m,
          __values: v,
          __read: _,
          __spread: g,
          __spreadArrays: w,
          __spreadArray: P,
          __await: O,
          __asyncGenerator: x,
          __asyncDelegator: S,
          __asyncValues: j,
          __makeTemplateObject: E,
          __importStar: A,
          __importDefault: C,
          __classPrivateFieldGet: T,
          __classPrivateFieldSet: M,
          __classPrivateFieldIn: I,
        }
      },
    },
    t = {}
  function n(r) {
    var o = t[r]
    if (void 0 !== o) return o.exports
    var a = (t[r] = { exports: {} })
    return e[r](a, a.exports, n), a.exports
  }
  ;(n.d = (e, t) => {
    for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] })
  }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    })
  var r = {}
  ;(() => {
    var e = r
    Object.defineProperty(e, '__esModule', { value: !0 })
    const t = n(607),
      o = (0, n(79).DemoPage)()
    document.body.appendChild(o)
    const a = document.getElementById('widgetContainer'),
      i = document.getElementById('settingsForm')
    if (!window.ethereum)
      throw (alert('Please, enable Metamask extension'), new Error('Injected wallet is not detected'))
    const s = (0, t.cowSwapWidget)({
      urlParams: {
        env: 'local',
        chainId: 1,
        theme: 'light',
        tradeAssets: { sell: { asset: 'COW', amount: '1200' }, buy: { asset: 'WETH' } },
      },
      width: 400,
      height: 640,
      container: a,
      provider: window.ethereum,
    })
    function c() {
      const e = Object.fromEntries(new FormData(i))
      s({
        env: e.env,
        chainId: e.chainId,
        theme: e.theme,
        tradeAssets: {
          sell: { asset: e['tradeAssets.sell.asset'], amount: e['tradeAssets.sell.amount'] },
          buy: { asset: e['tradeAssets.buy.asset'], amount: e['tradeAssets.buy.amount'] },
        },
      })
    }
    i.addEventListener('submit', (e) => {
      e.preventDefault(), c()
    }),
      i.addEventListener('change', (e) => {
        e.preventDefault(), c()
      })
  })(),
    (cowSwapWidget = r)
})()
