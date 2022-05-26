function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(40.73061, -73.935242),
    styles: [
      { elementType: "labels", stylers: [{ visibility: "on" }] },
      { elementType: "geometry", stylers: [{ color: "#EDEDED" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#998061" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#c6e7a8" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#F7F7F7" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#F7F7F7" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#ffdba5" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#f9be7f" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#9fcbfc" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9fcbfc" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
    ],
  });
}
!(function (t, e) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = t.document
      ? e(t, !0)
      : function (t) {
        if (!t.document)
          throw new Error("jQuery requires a window with a document");
        return e(t);
      })
    : e(t);
})("undefined" != typeof window ? window : this, function (C, t) {
  "use strict";
  function g(t) {
    return null != t && t === t.window;
  }
  var e = [],
    k = C.document,
    n = Object.getPrototypeOf,
    a = e.slice,
    m = e.concat,
    l = e.push,
    s = e.indexOf,
    i = {},
    o = i.toString,
    v = i.hasOwnProperty,
    r = v.toString,
    h = r.call(Object),
    _ = {},
    y = function (t) {
      return "function" == typeof t && "number" != typeof t.nodeType;
    },
    c = { type: !0, src: !0, noModule: !0 };
  function b(t, e, i) {
    var n,
      s = (e = e || k).createElement("script");
    if (((s.text = t), i)) for (n in c) i[n] && (s[n] = i[n]);
    e.head.appendChild(s).parentNode.removeChild(s);
  }
  function w(t) {
    return null == t
      ? t + ""
      : "object" == typeof t || "function" == typeof t
        ? i[o.call(t)] || "object"
        : typeof t;
  }
  var D = function (t, e) {
    return new D.fn.init(t, e);
  },
    u = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  function d(t) {
    var e = !!t && "length" in t && t.length,
      i = w(t);
    return (
      !y(t) &&
      !g(t) &&
      ("array" === i ||
        0 === e ||
        ("number" == typeof e && 0 < e && e - 1 in t))
    );
  }
  (D.fn = D.prototype =
  {
    jquery: "3.3.1",
    constructor: D,
    length: 0,
    toArray: function () {
      return a.call(this);
    },
    get: function (t) {
      return null == t
        ? a.call(this)
        : t < 0
          ? this[t + this.length]
          : this[t];
    },
    pushStack: function (t) {
      var e = D.merge(this.constructor(), t);
      return (e.prevObject = this), e;
    },
    each: function (t) {
      return D.each(this, t);
    },
    map: function (i) {
      return this.pushStack(
        D.map(this, function (t, e) {
          return i.call(t, e, t);
        })
      );
    },
    slice: function () {
      return this.pushStack(a.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (t) {
      var e = this.length,
        i = +t + (t < 0 ? e : 0);
      return this.pushStack(0 <= i && i < e ? [this[i]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: l,
    sort: e.sort,
    splice: e.splice,
  }),
    (D.extend = D.fn.extend =
      function () {
        var t,
          e,
          i,
          n,
          s,
          o,
          r = arguments[0] || {},
          a = 1,
          l = arguments.length,
          h = !1;
        for (
          "boolean" == typeof r && ((h = r), (r = arguments[a] || {}), a++),
          "object" == typeof r || y(r) || (r = {}),
          a === l && ((r = this), a--);
          a < l;
          a++
        )
          if (null != (t = arguments[a]))
            for (e in t)
              (i = r[e]),
                r !== (n = t[e]) &&
                (h && n && (D.isPlainObject(n) || (s = Array.isArray(n)))
                  ? ((o = s
                    ? ((s = !1), i && Array.isArray(i) ? i : [])
                    : i && D.isPlainObject(i)
                      ? i
                      : {}),
                    (r[e] = D.extend(h, o, n)))
                  : void 0 !== n && (r[e] = n));
        return r;
      }),
    D.extend({
      expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (t) {
        throw new Error(t);
      },
      noop: function () { },
      isPlainObject: function (t) {
        var e, i;
        return !(
          !t ||
          "[object Object]" !== o.call(t) ||
          ((e = n(t)) &&
            ("function" !=
              typeof (i = v.call(e, "constructor") && e.constructor) ||
              r.call(i) !== h))
        );
      },
      isEmptyObject: function (t) {
        var e;
        for (e in t) return !1;
        return !0;
      },
      globalEval: function (t) {
        b(t);
      },
      each: function (t, e) {
        var i,
          n = 0;
        if (d(t))
          for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++);
        else for (n in t) if (!1 === e.call(t[n], n, t[n])) break;
        return t;
      },
      trim: function (t) {
        return null == t ? "" : (t + "").replace(u, "");
      },
      makeArray: function (t, e) {
        var i = e || [];
        return (
          null != t &&
          (d(Object(t))
            ? D.merge(i, "string" == typeof t ? [t] : t)
            : l.call(i, t)),
          i
        );
      },
      inArray: function (t, e, i) {
        return null == e ? -1 : s.call(e, t, i);
      },
      merge: function (t, e) {
        for (var i = +e.length, n = 0, s = t.length; n < i; n++) t[s++] = e[n];
        return (t.length = s), t;
      },
      grep: function (t, e, i) {
        for (var n = [], s = 0, o = t.length, r = !i; s < o; s++)
          !e(t[s], s) != r && n.push(t[s]);
        return n;
      },
      map: function (t, e, i) {
        var n,
          s,
          o = 0,
          r = [];
        if (d(t))
          for (n = t.length; o < n; o++)
            null != (s = e(t[o], o, i)) && r.push(s);
        else for (o in t) null != (s = e(t[o], o, i)) && r.push(s);
        return m.apply([], r);
      },
      guid: 1,
      support: _,
    }),
    "function" == typeof Symbol && (D.fn[Symbol.iterator] = e[Symbol.iterator]),
    D.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (t, e) {
        i["[object " + e + "]"] = e.toLowerCase();
      }
    );
  var p = (function (i) {
    function u(t, e, i) {
      var n = "0x" + e - 65536;
      return n != n || i
        ? e
        : n < 0
          ? String.fromCharCode(65536 + n)
          : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
    }
    function s() {
      x();
    }
    var t,
      p,
      b,
      o,
      r,
      f,
      d,
      g,
      w,
      l,
      h,
      x,
      C,
      a,
      k,
      m,
      c,
      v,
      _,
      D = "sizzle" + 1 * new Date(),
      y = i.document,
      T = 0,
      n = 0,
      I = rt(),
      S = rt(),
      E = rt(),
      A = function (t, e) {
        return t === e && (h = !0), 0;
      },
      P = {}.hasOwnProperty,
      e = [],
      j = e.pop,
      O = e.push,
      N = e.push,
      M = e.slice,
      H = function (t, e) {
        for (var i = 0, n = t.length; i < n; i++) if (t[i] === e) return i;
        return -1;
      },
      z =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      W = "[\\x20\\t\\r\\n\\f]",
      L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
      R =
        "\\[" +
        W +
        "*(" +
        L +
        ")(?:" +
        W +
        "*([*^$|!~]?=)" +
        W +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        L +
        "))|)" +
        W +
        "*\\]",
      F =
        ":(" +
        L +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        R +
        ")*)|.*)\\)|)",
      q = new RegExp(W + "+", "g"),
      B = new RegExp("^" + W + "+|((?:^|[^\\\\])(?:\\\\.)*)" + W + "+$", "g"),
      $ = new RegExp("^" + W + "*," + W + "*"),
      U = new RegExp("^" + W + "*([>+~]|" + W + ")" + W + "*"),
      Y = new RegExp("=" + W + "*([^\\]'\"]*?)" + W + "*\\]", "g"),
      K = new RegExp(F),
      V = new RegExp("^" + L + "$"),
      Q = {
        ID: new RegExp("^#(" + L + ")"),
        CLASS: new RegExp("^\\.(" + L + ")"),
        TAG: new RegExp("^(" + L + "|[*])"),
        ATTR: new RegExp("^" + R),
        PSEUDO: new RegExp("^" + F),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
          W +
          "*(even|odd|(([+-]|)(\\d*)n|)" +
          W +
          "*(?:([+-]|)" +
          W +
          "*(\\d+)|))" +
          W +
          "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + z + ")$", "i"),
        needsContext: new RegExp(
          "^" +
          W +
          "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
          W +
          "*((?:-\\d)?\\d*)" +
          W +
          "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      X = /^(?:input|select|textarea|button)$/i,
      G = /^h\d$/i,
      J = /^[^{]+\{\s*\[native \w/,
      Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      tt = /[+~]/,
      et = new RegExp("\\\\([\\da-f]{1,6}" + W + "?|(" + W + ")|.)", "ig"),
      it = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      nt = function (t, e) {
        return e
          ? "\0" === t
            ? "�"
            : t.slice(0, -1) +
            "\\" +
            t.charCodeAt(t.length - 1).toString(16) +
            " "
          : "\\" + t;
      },
      st = _t(
        function (t) {
          return !0 === t.disabled && ("form" in t || "label" in t);
        },
        { dir: "parentNode", next: "legend" }
      );
    try {
      N.apply((e = M.call(y.childNodes)), y.childNodes),
        e[y.childNodes.length].nodeType;
    } catch (i) {
      N = {
        apply: e.length
          ? function (t, e) {
            O.apply(t, M.call(e));
          }
          : function (t, e) {
            for (var i = t.length, n = 0; (t[i++] = e[n++]););
            t.length = i - 1;
          },
      };
    }
    function ot(t, e, i, n) {
      var s,
        o,
        r,
        a,
        l,
        h,
        c,
        u = e && e.ownerDocument,
        d = e ? e.nodeType : 9;
      if (
        ((i = i || []),
          "string" != typeof t || !t || (1 !== d && 9 !== d && 11 !== d))
      )
        return i;
      if (
        !n &&
        ((e ? e.ownerDocument || e : y) !== C && x(e), (e = e || C), k)
      ) {
        if (11 !== d && (l = Z.exec(t)))
          if ((s = l[1])) {
            if (9 === d) {
              if (!(r = e.getElementById(s))) return i;
              if (r.id === s) return i.push(r), i;
            } else if (u && (r = u.getElementById(s)) && _(e, r) && r.id === s)
              return i.push(r), i;
          } else {
            if (l[2]) return N.apply(i, e.getElementsByTagName(t)), i;
            if (
              (s = l[3]) &&
              p.getElementsByClassName &&
              e.getElementsByClassName
            )
              return N.apply(i, e.getElementsByClassName(s)), i;
          }
        if (p.qsa && !E[t + " "] && (!m || !m.test(t))) {
          if (1 !== d) (u = e), (c = t);
          else if ("object" !== e.nodeName.toLowerCase()) {
            for (
              (a = e.getAttribute("id"))
                ? (a = a.replace(it, nt))
                : e.setAttribute("id", (a = D)),
              o = (h = f(t)).length;
              o--;

            )
              h[o] = "#" + a + " " + vt(h[o]);
            (c = h.join(",")), (u = (tt.test(t) && gt(e.parentNode)) || e);
          }
          if (c)
            try {
              return N.apply(i, u.querySelectorAll(c)), i;
            } catch (t) {
            } finally {
              a === D && e.removeAttribute("id");
            }
        }
      }
      return g(t.replace(B, "$1"), e, i, n);
    }
    function rt() {
      var n = [];
      return function t(e, i) {
        return (
          n.push(e + " ") > b.cacheLength && delete t[n.shift()],
          (t[e + " "] = i)
        );
      };
    }
    function at(t) {
      return (t[D] = !0), t;
    }
    function lt(t) {
      var e = C.createElement("fieldset");
      try {
        return !!t(e);
      } catch (t) {
        return !1;
      } finally {
        e.parentNode && e.parentNode.removeChild(e), (e = null);
      }
    }
    function ht(t, e) {
      for (var i = t.split("|"), n = i.length; n--;) b.attrHandle[i[n]] = e;
    }
    function ct(t, e) {
      var i = e && t,
        n =
          i &&
          1 === t.nodeType &&
          1 === e.nodeType &&
          t.sourceIndex - e.sourceIndex;
      if (n) return n;
      if (i) for (; (i = i.nextSibling);) if (i === e) return -1;
      return t ? 1 : -1;
    }
    function ut(e) {
      return function (t) {
        return "input" === t.nodeName.toLowerCase() && t.type === e;
      };
    }
    function dt(i) {
      return function (t) {
        var e = t.nodeName.toLowerCase();
        return ("input" === e || "button" === e) && t.type === i;
      };
    }
    function pt(e) {
      return function (t) {
        return "form" in t
          ? t.parentNode && !1 === t.disabled
            ? "label" in t
              ? "label" in t.parentNode
                ? t.parentNode.disabled === e
                : t.disabled === e
              : t.isDisabled === e || (t.isDisabled !== !e && st(t) === e)
            : t.disabled === e
          : "label" in t && t.disabled === e;
      };
    }
    function ft(r) {
      return at(function (o) {
        return (
          (o = +o),
          at(function (t, e) {
            for (var i, n = r([], t.length, o), s = n.length; s--;)
              t[(i = n[s])] && (t[i] = !(e[i] = t[i]));
          })
        );
      });
    }
    function gt(t) {
      return t && void 0 !== t.getElementsByTagName && t;
    }
    for (t in ((p = ot.support = {}),
      (r = ot.isXML =
        function (t) {
          var e = t && (t.ownerDocument || t).documentElement;
          return !!e && "HTML" !== e.nodeName;
        }),
      (x = ot.setDocument =
        function (t) {
          var e,
            i,
            n = t ? t.ownerDocument || t : y;
          return (
            n !== C &&
            9 === n.nodeType &&
            n.documentElement &&
            ((a = (C = n).documentElement),
              (k = !r(C)),
              y !== C &&
              (i = C.defaultView) &&
              i.top !== i &&
              (i.addEventListener
                ? i.addEventListener("unload", s, !1)
                : i.attachEvent && i.attachEvent("onunload", s)),
              (p.attributes = lt(function (t) {
                return (t.className = "i"), !t.getAttribute("className");
              })),
              (p.getElementsByTagName = lt(function (t) {
                return (
                  t.appendChild(C.createComment("")),
                  !t.getElementsByTagName("*").length
                );
              })),
              (p.getElementsByClassName = J.test(C.getElementsByClassName)),
              (p.getById = lt(function (t) {
                return (
                  (a.appendChild(t).id = D),
                  !C.getElementsByName || !C.getElementsByName(D).length
                );
              })),
              p.getById
                ? ((b.filter.ID = function (t) {
                  var e = t.replace(et, u);
                  return function (t) {
                    return t.getAttribute("id") === e;
                  };
                }),
                  (b.find.ID = function (t, e) {
                    if (void 0 !== e.getElementById && k) {
                      var i = e.getElementById(t);
                      return i ? [i] : [];
                    }
                  }))
                : ((b.filter.ID = function (t) {
                  var i = t.replace(et, u);
                  return function (t) {
                    var e =
                      void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                    return e && e.value === i;
                  };
                }),
                  (b.find.ID = function (t, e) {
                    if (void 0 !== e.getElementById && k) {
                      var i,
                        n,
                        s,
                        o = e.getElementById(t);
                      if (o) {
                        if ((i = o.getAttributeNode("id")) && i.value === t)
                          return [o];
                        for (s = e.getElementsByName(t), n = 0; (o = s[n++]);)
                          if ((i = o.getAttributeNode("id")) && i.value === t)
                            return [o];
                      }
                      return [];
                    }
                  })),
              (b.find.TAG = p.getElementsByTagName
                ? function (t, e) {
                  return void 0 !== e.getElementsByTagName
                    ? e.getElementsByTagName(t)
                    : p.qsa
                      ? e.querySelectorAll(t)
                      : void 0;
                }
                : function (t, e) {
                  var i,
                    n = [],
                    s = 0,
                    o = e.getElementsByTagName(t);
                  if ("*" !== t) return o;
                  for (; (i = o[s++]);) 1 === i.nodeType && n.push(i);
                  return n;
                }),
              (b.find.CLASS =
                p.getElementsByClassName &&
                function (t, e) {
                  if (void 0 !== e.getElementsByClassName && k)
                    return e.getElementsByClassName(t);
                }),
              (c = []),
              (m = []),
              (p.qsa = J.test(C.querySelectorAll)) &&
              (lt(function (t) {
                (a.appendChild(t).innerHTML =
                  "<a id='" +
                  D +
                  "'></a><select id='" +
                  D +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  t.querySelectorAll("[msallowcapture^='']").length &&
                  m.push("[*^$]=" + W + "*(?:''|\"\")"),
                  t.querySelectorAll("[selected]").length ||
                  m.push("\\[" + W + "*(?:value|" + z + ")"),
                  t.querySelectorAll("[id~=" + D + "-]").length || m.push("~="),
                  t.querySelectorAll(":checked").length || m.push(":checked"),
                  t.querySelectorAll("a#" + D + "+*").length ||
                  m.push(".#.+[+~]");
              }),
                lt(function (t) {
                  t.innerHTML =
                    "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                  var e = C.createElement("input");
                  e.setAttribute("type", "hidden"),
                    t.appendChild(e).setAttribute("name", "D"),
                    t.querySelectorAll("[name=d]").length &&
                    m.push("name" + W + "*[*^$|!~]?="),
                    2 !== t.querySelectorAll(":enabled").length &&
                    m.push(":enabled", ":disabled"),
                    (a.appendChild(t).disabled = !0),
                    2 !== t.querySelectorAll(":disabled").length &&
                    m.push(":enabled", ":disabled"),
                    t.querySelectorAll("*,:x"),
                    m.push(",.*:");
                })),
              (p.matchesSelector = J.test(
                (v =
                  a.matches ||
                  a.webkitMatchesSelector ||
                  a.mozMatchesSelector ||
                  a.oMatchesSelector ||
                  a.msMatchesSelector)
              )) &&
              lt(function (t) {
                (p.disconnectedMatch = v.call(t, "*")),
                  v.call(t, "[s!='']:x"),
                  c.push("!=", F);
              }),
              (m = m.length && new RegExp(m.join("|"))),
              (c = c.length && new RegExp(c.join("|"))),
              (e = J.test(a.compareDocumentPosition)),
              (_ =
                e || J.test(a.contains)
                  ? function (t, e) {
                    var i = 9 === t.nodeType ? t.documentElement : t,
                      n = e && e.parentNode;
                    return (
                      t === n ||
                      !(
                        !n ||
                        1 !== n.nodeType ||
                        !(i.contains
                          ? i.contains(n)
                          : t.compareDocumentPosition &&
                          16 & t.compareDocumentPosition(n))
                      )
                    );
                  }
                  : function (t, e) {
                    if (e) for (; (e = e.parentNode);) if (e === t) return !0;
                    return !1;
                  }),
              (A = e
                ? function (t, e) {
                  if (t === e) return (h = !0), 0;
                  var i =
                    !t.compareDocumentPosition - !e.compareDocumentPosition;
                  return (
                    i ||
                    (1 &
                      (i =
                        (t.ownerDocument || t) === (e.ownerDocument || e)
                          ? t.compareDocumentPosition(e)
                          : 1) ||
                      (!p.sortDetached && e.compareDocumentPosition(t) === i)
                      ? t === C || (t.ownerDocument === y && _(y, t))
                        ? -1
                        : e === C || (e.ownerDocument === y && _(y, e))
                          ? 1
                          : l
                            ? H(l, t) - H(l, e)
                            : 0
                      : 4 & i
                        ? -1
                        : 1)
                  );
                }
                : function (t, e) {
                  if (t === e) return (h = !0), 0;
                  var i,
                    n = 0,
                    s = t.parentNode,
                    o = e.parentNode,
                    r = [t],
                    a = [e];
                  if (!s || !o)
                    return t === C
                      ? -1
                      : e === C
                        ? 1
                        : s
                          ? -1
                          : o
                            ? 1
                            : l
                              ? H(l, t) - H(l, e)
                              : 0;
                  if (s === o) return ct(t, e);
                  for (i = t; (i = i.parentNode);) r.unshift(i);
                  for (i = e; (i = i.parentNode);) a.unshift(i);
                  for (; r[n] === a[n];) n++;
                  return n
                    ? ct(r[n], a[n])
                    : r[n] === y
                      ? -1
                      : a[n] === y
                        ? 1
                        : 0;
                })),
            C
          );
        }),
      (ot.matches = function (t, e) {
        return ot(t, null, null, e);
      }),
      (ot.matchesSelector = function (t, e) {
        if (
          ((t.ownerDocument || t) !== C && x(t),
            (e = e.replace(Y, "='$1']")),
            p.matchesSelector &&
            k &&
            !E[e + " "] &&
            (!c || !c.test(e)) &&
            (!m || !m.test(e)))
        )
          try {
            var i = v.call(t, e);
            if (
              i ||
              p.disconnectedMatch ||
              (t.document && 11 !== t.document.nodeType)
            )
              return i;
          } catch (t) { }
        return 0 < ot(e, C, null, [t]).length;
      }),
      (ot.contains = function (t, e) {
        return (t.ownerDocument || t) !== C && x(t), _(t, e);
      }),
      (ot.attr = function (t, e) {
        (t.ownerDocument || t) !== C && x(t);
        var i = b.attrHandle[e.toLowerCase()],
          n = i && P.call(b.attrHandle, e.toLowerCase()) ? i(t, e, !k) : void 0;
        return void 0 !== n
          ? n
          : p.attributes || !k
            ? t.getAttribute(e)
            : (n = t.getAttributeNode(e)) && n.specified
              ? n.value
              : null;
      }),
      (ot.escape = function (t) {
        return (t + "").replace(it, nt);
      }),
      (ot.error = function (t) {
        throw new Error("Syntax error, unrecognized expression: " + t);
      }),
      (ot.uniqueSort = function (t) {
        var e,
          i = [],
          n = 0,
          s = 0;
        if (
          ((h = !p.detectDuplicates),
            (l = !p.sortStable && t.slice(0)),
            t.sort(A),
            h)
        ) {
          for (; (e = t[s++]);) e === t[s] && (n = i.push(s));
          for (; n--;) t.splice(i[n], 1);
        }
        return (l = null), t;
      }),
      (o = ot.getText =
        function (t) {
          var e,
            i = "",
            n = 0,
            s = t.nodeType;
          if (s) {
            if (1 === s || 9 === s || 11 === s) {
              if ("string" == typeof t.textContent) return t.textContent;
              for (t = t.firstChild; t; t = t.nextSibling) i += o(t);
            } else if (3 === s || 4 === s) return t.nodeValue;
          } else for (; (e = t[n++]);) i += o(e);
          return i;
        }),
      ((b = ot.selectors =
      {
        cacheLength: 50,
        createPseudo: at,
        match: Q,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (t) {
            return (
              (t[1] = t[1].replace(et, u)),
              (t[3] = (t[3] || t[4] || t[5] || "").replace(et, u)),
              "~=" === t[2] && (t[3] = " " + t[3] + " "),
              t.slice(0, 4)
            );
          },
          CHILD: function (t) {
            return (
              (t[1] = t[1].toLowerCase()),
              "nth" === t[1].slice(0, 3)
                ? (t[3] || ot.error(t[0]),
                  (t[4] = +(t[4]
                    ? t[5] + (t[6] || 1)
                    : 2 * ("even" === t[3] || "odd" === t[3]))),
                  (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                : t[3] && ot.error(t[0]),
              t
            );
          },
          PSEUDO: function (t) {
            var e,
              i = !t[6] && t[2];
            return Q.CHILD.test(t[0])
              ? null
              : (t[3]
                ? (t[2] = t[4] || t[5] || "")
                : i &&
                K.test(i) &&
                (e = f(i, !0)) &&
                (e = i.indexOf(")", i.length - e) - i.length) &&
                ((t[0] = t[0].slice(0, e)), (t[2] = i.slice(0, e))),
                t.slice(0, 3));
          },
        },
        filter: {
          TAG: function (t) {
            var e = t.replace(et, u).toLowerCase();
            return "*" === t
              ? function () {
                return !0;
              }
              : function (t) {
                return t.nodeName && t.nodeName.toLowerCase() === e;
              };
          },
          CLASS: function (t) {
            var e = I[t + " "];
            return (
              e ||
              ((e = new RegExp("(^|" + W + ")" + t + "(" + W + "|$)")) &&
                I(t, function (t) {
                  return e.test(
                    ("string" == typeof t.className && t.className) ||
                    (void 0 !== t.getAttribute && t.getAttribute("class")) ||
                    ""
                  );
                }))
            );
          },
          ATTR: function (i, n, s) {
            return function (t) {
              var e = ot.attr(t, i);
              return null == e
                ? "!=" === n
                : !n ||
                ((e += ""),
                  "=" === n
                    ? e === s
                    : "!=" === n
                      ? e !== s
                      : "^=" === n
                        ? s && 0 === e.indexOf(s)
                        : "*=" === n
                          ? s && -1 < e.indexOf(s)
                          : "$=" === n
                            ? s && e.slice(-s.length) === s
                            : "~=" === n
                              ? -1 < (" " + e.replace(q, " ") + " ").indexOf(s)
                              : "|=" === n &&
                              (e === s || e.slice(0, s.length + 1) === s + "-"));
            };
          },
          CHILD: function (f, t, e, g, m) {
            var v = "nth" !== f.slice(0, 3),
              _ = "last" !== f.slice(-4),
              y = "of-type" === t;
            return 1 === g && 0 === m
              ? function (t) {
                return !!t.parentNode;
              }
              : function (t, e, i) {
                var n,
                  s,
                  o,
                  r,
                  a,
                  l,
                  h = v != _ ? "nextSibling" : "previousSibling",
                  c = t.parentNode,
                  u = y && t.nodeName.toLowerCase(),
                  d = !i && !y,
                  p = !1;
                if (c) {
                  if (v) {
                    for (; h;) {
                      for (r = t; (r = r[h]);)
                        if (
                          y
                            ? r.nodeName.toLowerCase() === u
                            : 1 === r.nodeType
                        )
                          return !1;
                      l = h = "only" === f && !l && "nextSibling";
                    }
                    return !0;
                  }
                  if (((l = [_ ? c.firstChild : c.lastChild]), _ && d)) {
                    for (
                      p =
                      (a =
                        (n =
                          (s =
                            (o = (r = c)[D] || (r[D] = {}))[r.uniqueID] ||
                            (o[r.uniqueID] = {}))[f] || [])[0] === T &&
                        n[1]) && n[2],
                      r = a && c.childNodes[a];
                      (r = (++a && r && r[h]) || (p = a = 0) || l.pop());

                    )
                      if (1 === r.nodeType && ++p && r === t) {
                        s[f] = [T, a, p];
                        break;
                      }
                  } else if (
                    (d &&
                      (p = a =
                        (n =
                          (s =
                            (o = (r = t)[D] || (r[D] = {}))[r.uniqueID] ||
                            (o[r.uniqueID] = {}))[f] || [])[0] === T && n[1]),
                      !1 === p)
                  )
                    for (
                      ;
                      (r = (++a && r && r[h]) || (p = a = 0) || l.pop()) &&
                      ((y
                        ? r.nodeName.toLowerCase() !== u
                        : 1 !== r.nodeType) ||
                        !++p ||
                        (d &&
                          ((s =
                            (o = r[D] || (r[D] = {}))[r.uniqueID] ||
                            (o[r.uniqueID] = {}))[f] = [T, p]),
                          r !== t));

                    );
                  return (p -= m) === g || (p % g == 0 && 0 <= p / g);
                }
              };
          },
          PSEUDO: function (t, o) {
            var e,
              r =
                b.pseudos[t] ||
                b.setFilters[t.toLowerCase()] ||
                ot.error("unsupported pseudo: " + t);
            return r[D]
              ? r(o)
              : 1 < r.length
                ? ((e = [t, t, "", o]),
                  b.setFilters.hasOwnProperty(t.toLowerCase())
                    ? at(function (t, e) {
                      for (var i, n = r(t, o), s = n.length; s--;)
                        t[(i = H(t, n[s]))] = !(e[i] = n[s]);
                    })
                    : function (t) {
                      return r(t, 0, e);
                    })
                : r;
          },
        },
        pseudos: {
          not: at(function (t) {
            var n = [],
              s = [],
              a = d(t.replace(B, "$1"));
            return a[D]
              ? at(function (t, e, i, n) {
                for (var s, o = a(t, null, n, []), r = t.length; r--;)
                  (s = o[r]) && (t[r] = !(e[r] = s));
              })
              : function (t, e, i) {
                return (n[0] = t), a(n, null, i, s), (n[0] = null), !s.pop();
              };
          }),
          has: at(function (e) {
            return function (t) {
              return 0 < ot(e, t).length;
            };
          }),
          contains: at(function (e) {
            return (
              (e = e.replace(et, u)),
              function (t) {
                return -1 < (t.textContent || t.innerText || o(t)).indexOf(e);
              }
            );
          }),
          lang: at(function (i) {
            return (
              V.test(i || "") || ot.error("unsupported lang: " + i),
              (i = i.replace(et, u).toLowerCase()),
              function (t) {
                var e;
                do {
                  if (
                    (e = k
                      ? t.lang
                      : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                  )
                    return (
                      (e = e.toLowerCase()) === i || 0 === e.indexOf(i + "-")
                    );
                } while ((t = t.parentNode) && 1 === t.nodeType);
                return !1;
              }
            );
          }),
          target: function (t) {
            var e = i.location && i.location.hash;
            return e && e.slice(1) === t.id;
          },
          root: function (t) {
            return t === a;
          },
          focus: function (t) {
            return (
              t === C.activeElement &&
              (!C.hasFocus || C.hasFocus()) &&
              !!(t.type || t.href || ~t.tabIndex)
            );
          },
          enabled: pt(!1),
          disabled: pt(!0),
          checked: function (t) {
            var e = t.nodeName.toLowerCase();
            return (
              ("input" === e && !!t.checked) || ("option" === e && !!t.selected)
            );
          },
          selected: function (t) {
            return (
              t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
            );
          },
          empty: function (t) {
            for (t = t.firstChild; t; t = t.nextSibling)
              if (t.nodeType < 6) return !1;
            return !0;
          },
          parent: function (t) {
            return !b.pseudos.empty(t);
          },
          header: function (t) {
            return G.test(t.nodeName);
          },
          input: function (t) {
            return X.test(t.nodeName);
          },
          button: function (t) {
            var e = t.nodeName.toLowerCase();
            return ("input" === e && "button" === t.type) || "button" === e;
          },
          text: function (t) {
            var e;
            return (
              "input" === t.nodeName.toLowerCase() &&
              "text" === t.type &&
              (null == (e = t.getAttribute("type")) ||
                "text" === e.toLowerCase())
            );
          },
          first: ft(function () {
            return [0];
          }),
          last: ft(function (t, e) {
            return [e - 1];
          }),
          eq: ft(function (t, e, i) {
            return [i < 0 ? i + e : i];
          }),
          even: ft(function (t, e) {
            for (var i = 0; i < e; i += 2) t.push(i);
            return t;
          }),
          odd: ft(function (t, e) {
            for (var i = 1; i < e; i += 2) t.push(i);
            return t;
          }),
          lt: ft(function (t, e, i) {
            for (var n = i < 0 ? i + e : i; 0 <= --n;) t.push(n);
            return t;
          }),
          gt: ft(function (t, e, i) {
            for (var n = i < 0 ? i + e : i; ++n < e;) t.push(n);
            return t;
          }),
        },
      }).pseudos.nth = b.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      b.pseudos[t] = ut(t);
    for (t in { submit: !0, reset: !0 }) b.pseudos[t] = dt(t);
    function mt() { }
    function vt(t) {
      for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
      return n;
    }
    function _t(a, t, e) {
      var l = t.dir,
        h = t.next,
        c = h || l,
        u = e && "parentNode" === c,
        d = n++;
      return t.first
        ? function (t, e, i) {
          for (; (t = t[l]);) if (1 === t.nodeType || u) return a(t, e, i);
          return !1;
        }
        : function (t, e, i) {
          var n,
            s,
            o,
            r = [T, d];
          if (i) {
            for (; (t = t[l]);)
              if ((1 === t.nodeType || u) && a(t, e, i)) return !0;
          } else
            for (; (t = t[l]);)
              if (1 === t.nodeType || u)
                if (
                  ((s =
                    (o = t[D] || (t[D] = {}))[t.uniqueID] ||
                    (o[t.uniqueID] = {})),
                    h && h === t.nodeName.toLowerCase())
                )
                  t = t[l] || t;
                else {
                  if ((n = s[c]) && n[0] === T && n[1] === d)
                    return (r[2] = n[2]);
                  if (((s[c] = r)[2] = a(t, e, i))) return !0;
                }
          return !1;
        };
    }
    function yt(s) {
      return 1 < s.length
        ? function (t, e, i) {
          for (var n = s.length; n--;) if (!s[n](t, e, i)) return !1;
          return !0;
        }
        : s[0];
    }
    function bt(t, e, i, n, s) {
      for (var o, r = [], a = 0, l = t.length, h = null != e; a < l; a++)
        (o = t[a]) && ((i && !i(o, n, s)) || (r.push(o), h && e.push(a)));
      return r;
    }
    function wt(p, f, g, m, v, t) {
      return (
        m && !m[D] && (m = wt(m)),
        v && !v[D] && (v = wt(v, t)),
        at(function (t, e, i, n) {
          var s,
            o,
            r,
            a = [],
            l = [],
            h = e.length,
            c =
              t ||
              (function (t, e, i) {
                for (var n = 0, s = e.length; n < s; n++) ot(t, e[n], i);
                return i;
              })(f || "*", i.nodeType ? [i] : i, []),
            u = !p || (!t && f) ? c : bt(c, a, p, i, n),
            d = g ? (v || (t ? p : h || m) ? [] : e) : u;
          if ((g && g(u, d, i, n), m))
            for (s = bt(d, l), m(s, [], i, n), o = s.length; o--;)
              (r = s[o]) && (d[l[o]] = !(u[l[o]] = r));
          if (t) {
            if (v || p) {
              if (v) {
                for (s = [], o = d.length; o--;)
                  (r = d[o]) && s.push((u[o] = r));
                v(null, (d = []), s, n);
              }
              for (o = d.length; o--;)
                (r = d[o]) &&
                  -1 < (s = v ? H(t, r) : a[o]) &&
                  (t[s] = !(e[s] = r));
            }
          } else (d = bt(d === e ? d.splice(h, d.length) : d)), v ? v(null, e, d, n) : N.apply(e, d);
        })
      );
    }
    function xt(t) {
      for (
        var s,
        e,
        i,
        n = t.length,
        o = b.relative[t[0].type],
        r = o || b.relative[" "],
        a = o ? 1 : 0,
        l = _t(
          function (t) {
            return t === s;
          },
          r,
          !0
        ),
        h = _t(
          function (t) {
            return -1 < H(s, t);
          },
          r,
          !0
        ),
        c = [
          function (t, e, i) {
            var n =
              (!o && (i || e !== w)) ||
              ((s = e).nodeType ? l(t, e, i) : h(t, e, i));
            return (s = null), n;
          },
        ];
        a < n;
        a++
      )
        if ((e = b.relative[t[a].type])) c = [_t(yt(c), e)];
        else {
          if ((e = b.filter[t[a].type].apply(null, t[a].matches))[D]) {
            for (i = ++a; i < n && !b.relative[t[i].type]; i++);
            return wt(
              1 < a && yt(c),
              1 < a &&
              vt(
                t
                  .slice(0, a - 1)
                  .concat({ value: " " === t[a - 2].type ? "*" : "" })
              ).replace(B, "$1"),
              e,
              a < i && xt(t.slice(a, i)),
              i < n && xt((t = t.slice(i))),
              i < n && vt(t)
            );
          }
          c.push(e);
        }
      return yt(c);
    }
    return (
      (mt.prototype = b.filters = b.pseudos),
      (b.setFilters = new mt()),
      (f = ot.tokenize =
        function (t, e) {
          var i,
            n,
            s,
            o,
            r,
            a,
            l,
            h = S[t + " "];
          if (h) return e ? 0 : h.slice(0);
          for (r = t, a = [], l = b.preFilter; r;) {
            for (o in ((i && !(n = $.exec(r))) ||
              (n && (r = r.slice(n[0].length) || r), a.push((s = []))),
              (i = !1),
              (n = U.exec(r)) &&
              ((i = n.shift()),
                s.push({ value: i, type: n[0].replace(B, " ") }),
                (r = r.slice(i.length))),
              b.filter))
              !(n = Q[o].exec(r)) ||
                (l[o] && !(n = l[o](n))) ||
                ((i = n.shift()),
                  s.push({ value: i, type: o, matches: n }),
                  (r = r.slice(i.length)));
            if (!i) break;
          }
          return e ? r.length : r ? ot.error(t) : S(t, a).slice(0);
        }),
      (d = ot.compile =
        function (t, e) {
          var i,
            n = [],
            s = [],
            o = E[t + " "];
          if (!o) {
            for (i = (e = e || f(t)).length; i--;)
              (o = xt(e[i]))[D] ? n.push(o) : s.push(o);
            (o = E(
              t,
              (function (m, v) {
                function t(t, e, i, n, s) {
                  var o,
                    r,
                    a,
                    l = 0,
                    h = "0",
                    c = t && [],
                    u = [],
                    d = w,
                    p = t || (y && b.find.TAG("*", s)),
                    f = (T += null == d ? 1 : Math.random() || 0.1),
                    g = p.length;
                  for (
                    s && (w = e === C || e || s);
                    h !== g && null != (o = p[h]);
                    h++
                  ) {
                    if (y && o) {
                      for (
                        r = 0, e || o.ownerDocument === C || (x(o), (i = !k));
                        (a = m[r++]);

                      )
                        if (a(o, e || C, i)) {
                          n.push(o);
                          break;
                        }
                      s && (T = f);
                    }
                    _ && ((o = !a && o) && l--, t && c.push(o));
                  }
                  if (((l += h), _ && h !== l)) {
                    for (r = 0; (a = v[r++]);) a(c, u, e, i);
                    if (t) {
                      if (0 < l)
                        for (; h--;) c[h] || u[h] || (u[h] = j.call(n));
                      u = bt(u);
                    }
                    N.apply(n, u),
                      s &&
                      !t &&
                      0 < u.length &&
                      1 < l + v.length &&
                      ot.uniqueSort(n);
                  }
                  return s && ((T = f), (w = d)), c;
                }
                var _ = 0 < v.length,
                  y = 0 < m.length;
                return _ ? at(t) : t;
              })(s, n)
            )).selector = t;
          }
          return o;
        }),
      (g = ot.select =
        function (t, e, i, n) {
          var s,
            o,
            r,
            a,
            l,
            h = "function" == typeof t && t,
            c = !n && f((t = h.selector || t));
          if (((i = i || []), 1 === c.length)) {
            if (
              2 < (o = c[0] = c[0].slice(0)).length &&
              "ID" === (r = o[0]).type &&
              9 === e.nodeType &&
              k &&
              b.relative[o[1].type]
            ) {
              if (!(e = (b.find.ID(r.matches[0].replace(et, u), e) || [])[0]))
                return i;
              h && (e = e.parentNode), (t = t.slice(o.shift().value.length));
            }
            for (
              s = Q.needsContext.test(t) ? 0 : o.length;
              s-- && ((r = o[s]), !b.relative[(a = r.type)]);

            )
              if (
                (l = b.find[a]) &&
                (n = l(
                  r.matches[0].replace(et, u),
                  (tt.test(o[0].type) && gt(e.parentNode)) || e
                ))
              ) {
                if ((o.splice(s, 1), !(t = n.length && vt(o))))
                  return N.apply(i, n), i;
                break;
              }
          }
          return (
            (h || d(t, c))(
              n,
              e,
              !k,
              i,
              !e || (tt.test(t) && gt(e.parentNode)) || e
            ),
            i
          );
        }),
      (p.sortStable = D.split("").sort(A).join("") === D),
      (p.detectDuplicates = !!h),
      x(),
      (p.sortDetached = lt(function (t) {
        return 1 & t.compareDocumentPosition(C.createElement("fieldset"));
      })),
      lt(function (t) {
        return (
          (t.innerHTML = "<a href='#'></a>"),
          "#" === t.firstChild.getAttribute("href")
        );
      }) ||
      ht("type|href|height|width", function (t, e, i) {
        if (!i) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
      }),
      (p.attributes &&
        lt(function (t) {
          return (
            (t.innerHTML = "<input/>"),
            t.firstChild.setAttribute("value", ""),
            "" === t.firstChild.getAttribute("value")
          );
        })) ||
      ht("value", function (t, e, i) {
        if (!i && "input" === t.nodeName.toLowerCase()) return t.defaultValue;
      }),
      lt(function (t) {
        return null == t.getAttribute("disabled");
      }) ||
      ht(z, function (t, e, i) {
        var n;
        if (!i)
          return !0 === t[e]
            ? e.toLowerCase()
            : (n = t.getAttributeNode(e)) && n.specified
              ? n.value
              : null;
      }),
      ot
    );
  })(C);
  (D.find = p),
    (D.expr = p.selectors),
    (D.expr[":"] = D.expr.pseudos),
    (D.uniqueSort = D.unique = p.uniqueSort),
    (D.text = p.getText),
    (D.isXMLDoc = p.isXML),
    (D.contains = p.contains),
    (D.escapeSelector = p.escape);
  function f(t, e, i) {
    for (var n = [], s = void 0 !== i; (t = t[e]) && 9 !== t.nodeType;)
      if (1 === t.nodeType) {
        if (s && D(t).is(i)) break;
        n.push(t);
      }
    return n;
  }
  function x(t, e) {
    for (var i = []; t; t = t.nextSibling)
      1 === t.nodeType && t !== e && i.push(t);
    return i;
  }
  var T = D.expr.match.needsContext;
  function I(t, e) {
    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
  }
  var S = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function E(t, i, n) {
    return y(i)
      ? D.grep(t, function (t, e) {
        return !!i.call(t, e, t) !== n;
      })
      : i.nodeType
        ? D.grep(t, function (t) {
          return (t === i) !== n;
        })
        : "string" != typeof i
          ? D.grep(t, function (t) {
            return -1 < s.call(i, t) !== n;
          })
          : D.filter(i, t, n);
  }
  (D.filter = function (t, e, i) {
    var n = e[0];
    return (
      i && (t = ":not(" + t + ")"),
      1 === e.length && 1 === n.nodeType
        ? D.find.matchesSelector(n, t)
          ? [n]
          : []
        : D.find.matches(
          t,
          D.grep(e, function (t) {
            return 1 === t.nodeType;
          })
        )
    );
  }),
    D.fn.extend({
      find: function (t) {
        var e,
          i,
          n = this.length,
          s = this;
        if ("string" != typeof t)
          return this.pushStack(
            D(t).filter(function () {
              for (e = 0; e < n; e++) if (D.contains(s[e], this)) return !0;
            })
          );
        for (i = this.pushStack([]), e = 0; e < n; e++) D.find(t, s[e], i);
        return 1 < n ? D.uniqueSort(i) : i;
      },
      filter: function (t) {
        return this.pushStack(E(this, t || [], !1));
      },
      not: function (t) {
        return this.pushStack(E(this, t || [], !0));
      },
      is: function (t) {
        return !!E(this, "string" == typeof t && T.test(t) ? D(t) : t || [], !1)
          .length;
      },
    });
  var A,
    P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((D.fn.init = function (t, e, i) {
    var n, s;
    if (!t) return this;
    if (((i = i || A), "string" != typeof t))
      return t.nodeType
        ? ((this[0] = t), (this.length = 1), this)
        : y(t)
          ? void 0 !== i.ready
            ? i.ready(t)
            : t(D)
          : D.makeArray(t, this);
    if (
      !(n =
        "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length
          ? [null, t, null]
          : P.exec(t)) ||
      (!n[1] && e)
    )
      return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
    if (n[1]) {
      if (
        ((e = e instanceof D ? e[0] : e),
          D.merge(
            this,
            D.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : k, !0)
          ),
          S.test(n[1]) && D.isPlainObject(e))
      )
        for (n in e) y(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
      return this;
    }
    return (
      (s = k.getElementById(n[2])) && ((this[0] = s), (this.length = 1)), this
    );
  }).prototype = D.fn),
    (A = D(k));
  var j = /^(?:parents|prev(?:Until|All))/,
    O = { children: !0, contents: !0, next: !0, prev: !0 };
  function N(t, e) {
    for (; (t = t[e]) && 1 !== t.nodeType;);
    return t;
  }
  D.fn.extend({
    has: function (t) {
      var e = D(t, this),
        i = e.length;
      return this.filter(function () {
        for (var t = 0; t < i; t++) if (D.contains(this, e[t])) return !0;
      });
    },
    closest: function (t, e) {
      var i,
        n = 0,
        s = this.length,
        o = [],
        r = "string" != typeof t && D(t);
      if (!T.test(t))
        for (; n < s; n++)
          for (i = this[n]; i && i !== e; i = i.parentNode)
            if (
              i.nodeType < 11 &&
              (r
                ? -1 < r.index(i)
                : 1 === i.nodeType && D.find.matchesSelector(i, t))
            ) {
              o.push(i);
              break;
            }
      return this.pushStack(1 < o.length ? D.uniqueSort(o) : o);
    },
    index: function (t) {
      return t
        ? "string" == typeof t
          ? s.call(D(t), this[0])
          : s.call(this, t.jquery ? t[0] : t)
        : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
    },
    add: function (t, e) {
      return this.pushStack(D.uniqueSort(D.merge(this.get(), D(t, e))));
    },
    addBack: function (t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    },
  }),
    D.each(
      {
        parent: function (t) {
          var e = t.parentNode;
          return e && 11 !== e.nodeType ? e : null;
        },
        parents: function (t) {
          return f(t, "parentNode");
        },
        parentsUntil: function (t, e, i) {
          return f(t, "parentNode", i);
        },
        next: function (t) {
          return N(t, "nextSibling");
        },
        prev: function (t) {
          return N(t, "previousSibling");
        },
        nextAll: function (t) {
          return f(t, "nextSibling");
        },
        prevAll: function (t) {
          return f(t, "previousSibling");
        },
        nextUntil: function (t, e, i) {
          return f(t, "nextSibling", i);
        },
        prevUntil: function (t, e, i) {
          return f(t, "previousSibling", i);
        },
        siblings: function (t) {
          return x((t.parentNode || {}).firstChild, t);
        },
        children: function (t) {
          return x(t.firstChild);
        },
        contents: function (t) {
          return I(t, "iframe")
            ? t.contentDocument
            : (I(t, "template") && (t = t.content || t),
              D.merge([], t.childNodes));
        },
      },
      function (n, s) {
        D.fn[n] = function (t, e) {
          var i = D.map(this, s, t);
          return (
            "Until" !== n.slice(-5) && (e = t),
            e && "string" == typeof e && (i = D.filter(e, i)),
            1 < this.length &&
            (O[n] || D.uniqueSort(i), j.test(n) && i.reverse()),
            this.pushStack(i)
          );
        };
      }
    );
  var M = /[^\x20\t\r\n\f]+/g;
  function H(t) {
    return t;
  }
  function z(t) {
    throw t;
  }
  function W(t, e, i, n) {
    var s;
    try {
      t && y((s = t.promise))
        ? s.call(t).done(e).fail(i)
        : t && y((s = t.then))
          ? s.call(t, e, i)
          : e.apply(void 0, [t].slice(n));
    } catch (t) {
      i.apply(void 0, [t]);
    }
  }
  (D.Callbacks = function (n) {
    n =
      "string" == typeof n
        ? (function (t) {
          var i = {};
          return (
            D.each(t.match(M) || [], function (t, e) {
              i[e] = !0;
            }),
            i
          );
        })(n)
        : D.extend({}, n);
    function i() {
      for (o = o || n.once, e = s = !0; a.length; l = -1)
        for (t = a.shift(); ++l < r.length;)
          !1 === r[l].apply(t[0], t[1]) &&
            n.stopOnFalse &&
            ((l = r.length), (t = !1));
      n.memory || (t = !1), (s = !1), o && (r = t ? [] : "");
    }
    var s,
      t,
      e,
      o,
      r = [],
      a = [],
      l = -1,
      h = {
        add: function () {
          return (
            r &&
            (t && !s && ((l = r.length - 1), a.push(t)),
              (function i(t) {
                D.each(t, function (t, e) {
                  y(e)
                    ? (n.unique && h.has(e)) || r.push(e)
                    : e && e.length && "string" !== w(e) && i(e);
                });
              })(arguments),
              t && !s && i()),
            this
          );
        },
        remove: function () {
          return (
            D.each(arguments, function (t, e) {
              for (var i; -1 < (i = D.inArray(e, r, i));)
                r.splice(i, 1), i <= l && l--;
            }),
            this
          );
        },
        has: function (t) {
          return t ? -1 < D.inArray(t, r) : 0 < r.length;
        },
        empty: function () {
          return (r = r && []), this;
        },
        disable: function () {
          return (o = a = []), (r = t = ""), this;
        },
        disabled: function () {
          return !r;
        },
        lock: function () {
          return (o = a = []), t || s || (r = t = ""), this;
        },
        locked: function () {
          return !!o;
        },
        fireWith: function (t, e) {
          return (
            o ||
            ((e = [t, (e = e || []).slice ? e.slice() : e]),
              a.push(e),
              s || i()),
            this
          );
        },
        fire: function () {
          return h.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!e;
        },
      };
    return h;
  }),
    D.extend({
      Deferred: function (t) {
        var o = [
          [
            "notify",
            "progress",
            D.Callbacks("memory"),
            D.Callbacks("memory"),
            2,
          ],
          [
            "resolve",
            "done",
            D.Callbacks("once memory"),
            D.Callbacks("once memory"),
            0,
            "resolved",
          ],
          [
            "reject",
            "fail",
            D.Callbacks("once memory"),
            D.Callbacks("once memory"),
            1,
            "rejected",
          ],
        ],
          s = "pending",
          r = {
            state: function () {
              return s;
            },
            always: function () {
              return a.done(arguments).fail(arguments), this;
            },
            catch: function (t) {
              return r.then(null, t);
            },
            pipe: function () {
              var s = arguments;
              return D.Deferred(function (n) {
                D.each(o, function (t, e) {
                  var i = y(s[e[4]]) && s[e[4]];
                  a[e[1]](function () {
                    var t = i && i.apply(this, arguments);
                    t && y(t.promise)
                      ? t
                        .promise()
                        .progress(n.notify)
                        .done(n.resolve)
                        .fail(n.reject)
                      : n[e[0] + "With"](this, i ? [t] : arguments);
                  });
                }),
                  (s = null);
              }).promise();
            },
            then: function (e, i, n) {
              var l = 0;
              function h(s, o, r, a) {
                return function () {
                  function t() {
                    var t, e;
                    if (!(s < l)) {
                      if ((t = r.apply(i, n)) === o.promise())
                        throw new TypeError("Thenable self-resolution");
                      (e =
                        t &&
                        ("object" == typeof t || "function" == typeof t) &&
                        t.then),
                        y(e)
                          ? a
                            ? e.call(t, h(l, o, H, a), h(l, o, z, a))
                            : (l++,
                              e.call(
                                t,
                                h(l, o, H, a),
                                h(l, o, z, a),
                                h(l, o, H, o.notifyWith)
                              ))
                          : (r !== H && ((i = void 0), (n = [t])),
                            (a || o.resolveWith)(i, n));
                    }
                  }
                  var i = this,
                    n = arguments,
                    e = a
                      ? t
                      : function () {
                        try {
                          t();
                        } catch (t) {
                          D.Deferred.exceptionHook &&
                            D.Deferred.exceptionHook(t, e.stackTrace),
                            l <= s + 1 &&
                            (r !== z && ((i = void 0), (n = [t])),
                              o.rejectWith(i, n));
                        }
                      };
                  s
                    ? e()
                    : (D.Deferred.getStackHook &&
                      (e.stackTrace = D.Deferred.getStackHook()),
                      C.setTimeout(e));
                };
              }
              return D.Deferred(function (t) {
                o[0][3].add(h(0, t, y(n) ? n : H, t.notifyWith)),
                  o[1][3].add(h(0, t, y(e) ? e : H)),
                  o[2][3].add(h(0, t, y(i) ? i : z));
              }).promise();
            },
            promise: function (t) {
              return null != t ? D.extend(t, r) : r;
            },
          },
          a = {};
        return (
          D.each(o, function (t, e) {
            var i = e[2],
              n = e[5];
            (r[e[1]] = i.add),
              n &&
              i.add(
                function () {
                  s = n;
                },
                o[3 - t][2].disable,
                o[3 - t][3].disable,
                o[0][2].lock,
                o[0][3].lock
              ),
              i.add(e[3].fire),
              (a[e[0]] = function () {
                return (
                  a[e[0] + "With"](this === a ? void 0 : this, arguments), this
                );
              }),
              (a[e[0] + "With"] = i.fireWith);
          }),
          r.promise(a),
          t && t.call(a, a),
          a
        );
      },
      when: function (t) {
        function e(e) {
          return function (t) {
            (s[e] = this),
              (o[e] = 1 < arguments.length ? a.call(arguments) : t),
              --i || r.resolveWith(s, o);
          };
        }
        var i = arguments.length,
          n = i,
          s = Array(n),
          o = a.call(arguments),
          r = D.Deferred();
        if (
          i <= 1 &&
          (W(t, r.done(e(n)).resolve, r.reject, !i),
            "pending" === r.state() || y(o[n] && o[n].then))
        )
          return r.then();
        for (; n--;) W(o[n], e(n), r.reject);
        return r.promise();
      },
    });
  var L = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (D.Deferred.exceptionHook = function (t, e) {
    C.console &&
      C.console.warn &&
      t &&
      L.test(t.name) &&
      C.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e);
  }),
    (D.readyException = function (t) {
      C.setTimeout(function () {
        throw t;
      });
    });
  var R = D.Deferred();
  function F() {
    k.removeEventListener("DOMContentLoaded", F),
      C.removeEventListener("load", F),
      D.ready();
  }
  (D.fn.ready = function (t) {
    return (
      R.then(t).catch(function (t) {
        D.readyException(t);
      }),
      this
    );
  }),
    D.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (t) {
        (!0 === t ? --D.readyWait : D.isReady) ||
          ((D.isReady = !0) !== t && 0 < --D.readyWait) ||
          R.resolveWith(k, [D]);
      },
    }),
    (D.ready.then = R.then),
    "complete" === k.readyState ||
      ("loading" !== k.readyState && !k.documentElement.doScroll)
      ? C.setTimeout(D.ready)
      : (k.addEventListener("DOMContentLoaded", F),
        C.addEventListener("load", F));
  var q = function (t, e, i, n, s, o, r) {
    var a = 0,
      l = t.length,
      h = null == i;
    if ("object" === w(i))
      for (a in ((s = !0), i)) q(t, e, a, i[a], !0, o, r);
    else if (
      void 0 !== n &&
      ((s = !0),
        y(n) || (r = !0),
        h &&
        (e = r
          ? (e.call(t, n), null)
          : ((h = e),
            function (t, e, i) {
              return h.call(D(t), i);
            })),
        e)
    )
      for (; a < l; a++) e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
    return s ? t : h ? e.call(t) : l ? e(t[0], i) : o;
  },
    B = /^-ms-/,
    $ = /-([a-z])/g;
  function U(t, e) {
    return e.toUpperCase();
  }
  function Y(t) {
    return t.replace(B, "ms-").replace($, U);
  }
  function K(t) {
    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
  }
  function V() {
    this.expando = D.expando + V.uid++;
  }
  (V.uid = 1),
    (V.prototype = {
      cache: function (t) {
        var e = t[this.expando];
        return (
          e ||
          ((e = {}),
            K(t) &&
            (t.nodeType
              ? (t[this.expando] = e)
              : Object.defineProperty(t, this.expando, {
                value: e,
                configurable: !0,
              }))),
          e
        );
      },
      set: function (t, e, i) {
        var n,
          s = this.cache(t);
        if ("string" == typeof e) s[Y(e)] = i;
        else for (n in e) s[Y(n)] = e[n];
        return s;
      },
      get: function (t, e) {
        return void 0 === e
          ? this.cache(t)
          : t[this.expando] && t[this.expando][Y(e)];
      },
      access: function (t, e, i) {
        return void 0 === e || (e && "string" == typeof e && void 0 === i)
          ? this.get(t, e)
          : (this.set(t, e, i), void 0 !== i ? i : e);
      },
      remove: function (t, e) {
        var i,
          n = t[this.expando];
        if (void 0 !== n) {
          if (void 0 !== e) {
            i = (e = Array.isArray(e)
              ? e.map(Y)
              : (e = Y(e)) in n
                ? [e]
                : e.match(M) || []).length;
            for (; i--;) delete n[e[i]];
          }
          (void 0 !== e && !D.isEmptyObject(n)) ||
            (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
        }
      },
      hasData: function (t) {
        var e = t[this.expando];
        return void 0 !== e && !D.isEmptyObject(e);
      },
    });
  var Q = new V(),
    X = new V(),
    G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    J = /[A-Z]/g;
  function Z(t, e, i) {
    var n;
    if (void 0 === i && 1 === t.nodeType)
      if (
        ((n = "data-" + e.replace(J, "-$&").toLowerCase()),
          "string" == typeof (i = t.getAttribute(n)))
      ) {
        try {
          i = (function (t) {
            return (
              "true" === t ||
              ("false" !== t &&
                ("null" === t
                  ? null
                  : t === +t + ""
                    ? +t
                    : G.test(t)
                      ? JSON.parse(t)
                      : t))
            );
          })(i);
        } catch (t) { }
        X.set(t, e, i);
      } else i = void 0;
    return i;
  }
  D.extend({
    hasData: function (t) {
      return X.hasData(t) || Q.hasData(t);
    },
    data: function (t, e, i) {
      return X.access(t, e, i);
    },
    removeData: function (t, e) {
      X.remove(t, e);
    },
    _data: function (t, e, i) {
      return Q.access(t, e, i);
    },
    _removeData: function (t, e) {
      Q.remove(t, e);
    },
  }),
    D.fn.extend({
      data: function (i, t) {
        var e,
          n,
          s,
          o = this[0],
          r = o && o.attributes;
        if (void 0 !== i)
          return "object" == typeof i
            ? this.each(function () {
              X.set(this, i);
            })
            : q(
              this,
              function (t) {
                var e;
                if (o && void 0 === t) {
                  if (void 0 !== (e = X.get(o, i))) return e;
                  if (void 0 !== (e = Z(o, i))) return e;
                } else
                  this.each(function () {
                    X.set(this, i, t);
                  });
              },
              null,
              t,
              1 < arguments.length,
              null,
              !0
            );
        if (
          this.length &&
          ((s = X.get(o)), 1 === o.nodeType && !Q.get(o, "hasDataAttrs"))
        ) {
          for (e = r.length; e--;)
            r[e] &&
              0 === (n = r[e].name).indexOf("data-") &&
              ((n = Y(n.slice(5))), Z(o, n, s[n]));
          Q.set(o, "hasDataAttrs", !0);
        }
        return s;
      },
      removeData: function (t) {
        return this.each(function () {
          X.remove(this, t);
        });
      },
    }),
    D.extend({
      queue: function (t, e, i) {
        var n;
        if (t)
          return (
            (e = (e || "fx") + "queue"),
            (n = Q.get(t, e)),
            i &&
            (!n || Array.isArray(i)
              ? (n = Q.access(t, e, D.makeArray(i)))
              : n.push(i)),
            n || []
          );
      },
      dequeue: function (t, e) {
        e = e || "fx";
        var i = D.queue(t, e),
          n = i.length,
          s = i.shift(),
          o = D._queueHooks(t, e);
        "inprogress" === s && ((s = i.shift()), n--),
          s &&
          ("fx" === e && i.unshift("inprogress"),
            delete o.stop,
            s.call(
              t,
              function () {
                D.dequeue(t, e);
              },
              o
            )),
          !n && o && o.empty.fire();
      },
      _queueHooks: function (t, e) {
        var i = e + "queueHooks";
        return (
          Q.get(t, i) ||
          Q.access(t, i, {
            empty: D.Callbacks("once memory").add(function () {
              Q.remove(t, [e + "queue", i]);
            }),
          })
        );
      },
    }),
    D.fn.extend({
      queue: function (e, i) {
        var t = 2;
        return (
          "string" != typeof e && ((i = e), (e = "fx"), t--),
          arguments.length < t
            ? D.queue(this[0], e)
            : void 0 === i
              ? this
              : this.each(function () {
                var t = D.queue(this, e, i);
                D._queueHooks(this, e),
                  "fx" === e && "inprogress" !== t[0] && D.dequeue(this, e);
              })
        );
      },
      dequeue: function (t) {
        return this.each(function () {
          D.dequeue(this, t);
        });
      },
      clearQueue: function (t) {
        return this.queue(t || "fx", []);
      },
      promise: function (t, e) {
        function i() {
          --s || o.resolveWith(r, [r]);
        }
        var n,
          s = 1,
          o = D.Deferred(),
          r = this,
          a = this.length;
        for (
          "string" != typeof t && ((e = t), (t = void 0)), t = t || "fx";
          a--;

        )
          (n = Q.get(r[a], t + "queueHooks")) &&
            n.empty &&
            (s++, n.empty.add(i));
        return i(), o.promise(e);
      },
    });
  function tt(t, e, i, n) {
    var s,
      o,
      r = {};
    for (o in e) (r[o] = t.style[o]), (t.style[o] = e[o]);
    for (o in ((s = i.apply(t, n || [])), e)) t.style[o] = r[o];
    return s;
  }
  var et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    it = new RegExp("^(?:([+-])=|)(" + et + ")([a-z%]*)$", "i"),
    nt = ["Top", "Right", "Bottom", "Left"],
    st = function (t, e) {
      return (
        "none" === (t = e || t).style.display ||
        ("" === t.style.display &&
          D.contains(t.ownerDocument, t) &&
          "none" === D.css(t, "display"))
      );
    };
  function ot(t, e, i, n) {
    var s,
      o,
      r = 20,
      a = n
        ? function () {
          return n.cur();
        }
        : function () {
          return D.css(t, e, "");
        },
      l = a(),
      h = (i && i[3]) || (D.cssNumber[e] ? "" : "px"),
      c = (D.cssNumber[e] || ("px" !== h && +l)) && it.exec(D.css(t, e));
    if (c && c[3] !== h) {
      for (l /= 2, h = h || c[3], c = +l || 1; r--;)
        D.style(t, e, c + h),
          (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (r = 0),
          (c /= o);
      (c *= 2), D.style(t, e, c + h), (i = i || []);
    }
    return (
      i &&
      ((c = +c || +l || 0),
        (s = i[1] ? c + (i[1] + 1) * i[2] : +i[2]),
        n && ((n.unit = h), (n.start = c), (n.end = s))),
      s
    );
  }
  var rt = {};
  function at(t, e) {
    for (var i, n, s = [], o = 0, r = t.length; o < r; o++)
      (n = t[o]).style &&
        ((i = n.style.display),
          e
            ? ("none" === i &&
              ((s[o] = Q.get(n, "display") || null),
                s[o] || (n.style.display = "")),
              "" === n.style.display &&
              st(n) &&
              (s[o] =
                ((u = h = l = void 0),
                  (h = (a = n).ownerDocument),
                  (c = a.nodeName),
                  (u = rt[c]) ||
                  ((l = h.body.appendChild(h.createElement(c))),
                    (u = D.css(l, "display")),
                    l.parentNode.removeChild(l),
                    "none" === u && (u = "block"),
                    (rt[c] = u)))))
            : "none" !== i && ((s[o] = "none"), Q.set(n, "display", i)));
    var a, l, h, c, u;
    for (o = 0; o < r; o++) null != s[o] && (t[o].style.display = s[o]);
    return t;
  }
  D.fn.extend({
    show: function () {
      return at(this, !0);
    },
    hide: function () {
      return at(this);
    },
    toggle: function (t) {
      return "boolean" == typeof t
        ? t
          ? this.show()
          : this.hide()
        : this.each(function () {
          st(this) ? D(this).show() : D(this).hide();
        });
    },
  });
  var lt = /^(?:checkbox|radio)$/i,
    ht = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
    ct = /^$|^module$|\/(?:java|ecma)script/i,
    ut = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
  function dt(t, e) {
    var i;
    return (
      (i =
        void 0 !== t.getElementsByTagName
          ? t.getElementsByTagName(e || "*")
          : void 0 !== t.querySelectorAll
            ? t.querySelectorAll(e || "*")
            : []),
      void 0 === e || (e && I(t, e)) ? D.merge([t], i) : i
    );
  }
  function pt(t, e) {
    for (var i = 0, n = t.length; i < n; i++)
      Q.set(t[i], "globalEval", !e || Q.get(e[i], "globalEval"));
  }
  (ut.optgroup = ut.option),
    (ut.tbody = ut.tfoot = ut.colgroup = ut.caption = ut.thead),
    (ut.th = ut.td);
  var ft,
    gt,
    mt = /<|&#?\w+;/;
  function vt(t, e, i, n, s) {
    for (
      var o,
      r,
      a,
      l,
      h,
      c,
      u = e.createDocumentFragment(),
      d = [],
      p = 0,
      f = t.length;
      p < f;
      p++
    )
      if ((o = t[p]) || 0 === o)
        if ("object" === w(o)) D.merge(d, o.nodeType ? [o] : o);
        else if (mt.test(o)) {
          for (
            r = r || u.appendChild(e.createElement("div")),
            a = (ht.exec(o) || ["", ""])[1].toLowerCase(),
            l = ut[a] || ut._default,
            r.innerHTML = l[1] + D.htmlPrefilter(o) + l[2],
            c = l[0];
            c--;

          )
            r = r.lastChild;
          D.merge(d, r.childNodes), ((r = u.firstChild).textContent = "");
        } else d.push(e.createTextNode(o));
    for (u.textContent = "", p = 0; (o = d[p++]);)
      if (n && -1 < D.inArray(o, n)) s && s.push(o);
      else if (
        ((h = D.contains(o.ownerDocument, o)),
          (r = dt(u.appendChild(o), "script")),
          h && pt(r),
          i)
      )
        for (c = 0; (o = r[c++]);) ct.test(o.type || "") && i.push(o);
    return u;
  }
  (ft = k.createDocumentFragment().appendChild(k.createElement("div"))),
    (gt = k.createElement("input")).setAttribute("type", "radio"),
    gt.setAttribute("checked", "checked"),
    gt.setAttribute("name", "t"),
    ft.appendChild(gt),
    (_.checkClone = ft.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (ft.innerHTML = "<textarea>x</textarea>"),
    (_.noCloneChecked = !!ft.cloneNode(!0).lastChild.defaultValue);
  var _t = k.documentElement,
    yt = /^key/,
    bt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    wt = /^([^.]*)(?:\.(.+)|)/;
  function xt() {
    return !0;
  }
  function Ct() {
    return !1;
  }
  function kt() {
    try {
      return k.activeElement;
    } catch (t) { }
  }
  function Dt(t, e, i, n, s, o) {
    var r, a;
    if ("object" == typeof e) {
      for (a in ("string" != typeof i && ((n = n || i), (i = void 0)), e))
        Dt(t, a, i, n, e[a], o);
      return t;
    }
    if (
      (null == n && null == s
        ? ((s = i), (n = i = void 0))
        : null == s &&
        ("string" == typeof i
          ? ((s = n), (n = void 0))
          : ((s = n), (n = i), (i = void 0))),
        !1 === s)
    )
      s = Ct;
    else if (!s) return t;
    return (
      1 === o &&
      ((r = s),
        ((s = function (t) {
          return D().off(t), r.apply(this, arguments);
        }).guid = r.guid || (r.guid = D.guid++))),
      t.each(function () {
        D.event.add(this, e, s, n, i);
      })
    );
  }
  (D.event = {
    global: {},
    add: function (e, t, i, n, s) {
      var o,
        r,
        a,
        l,
        h,
        c,
        u,
        d,
        p,
        f,
        g,
        m = Q.get(e);
      if (m)
        for (
          i.handler && ((i = (o = i).handler), (s = o.selector)),
          s && D.find.matchesSelector(_t, s),
          i.guid || (i.guid = D.guid++),
          (l = m.events) || (l = m.events = {}),
          (r = m.handle) ||
          (r = m.handle =
            function (t) {
              return void 0 !== D && D.event.triggered !== t.type
                ? D.event.dispatch.apply(e, arguments)
                : void 0;
            }),
          h = (t = (t || "").match(M) || [""]).length;
          h--;

        )
          (p = g = (a = wt.exec(t[h]) || [])[1]),
            (f = (a[2] || "").split(".").sort()),
            p &&
            ((u = D.event.special[p] || {}),
              (p = (s ? u.delegateType : u.bindType) || p),
              (u = D.event.special[p] || {}),
              (c = D.extend(
                {
                  type: p,
                  origType: g,
                  data: n,
                  handler: i,
                  guid: i.guid,
                  selector: s,
                  needsContext: s && D.expr.match.needsContext.test(s),
                  namespace: f.join("."),
                },
                o
              )),
              (d = l[p]) ||
              (((d = l[p] = []).delegateCount = 0),
                (u.setup && !1 !== u.setup.call(e, n, f, r)) ||
                (e.addEventListener && e.addEventListener(p, r))),
              u.add &&
              (u.add.call(e, c), c.handler.guid || (c.handler.guid = i.guid)),
              s ? d.splice(d.delegateCount++, 0, c) : d.push(c),
              (D.event.global[p] = !0));
    },
    remove: function (t, e, i, n, s) {
      var o,
        r,
        a,
        l,
        h,
        c,
        u,
        d,
        p,
        f,
        g,
        m = Q.hasData(t) && Q.get(t);
      if (m && (l = m.events)) {
        for (h = (e = (e || "").match(M) || [""]).length; h--;)
          if (
            ((p = g = (a = wt.exec(e[h]) || [])[1]),
              (f = (a[2] || "").split(".").sort()),
              p)
          ) {
            for (
              u = D.event.special[p] || {},
              d = l[(p = (n ? u.delegateType : u.bindType) || p)] || [],
              a =
              a[2] &&
              new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
              r = o = d.length;
              o--;

            )
              (c = d[o]),
                (!s && g !== c.origType) ||
                (i && i.guid !== c.guid) ||
                (a && !a.test(c.namespace)) ||
                (n && n !== c.selector && ("**" !== n || !c.selector)) ||
                (d.splice(o, 1),
                  c.selector && d.delegateCount--,
                  u.remove && u.remove.call(t, c));
            r &&
              !d.length &&
              ((u.teardown && !1 !== u.teardown.call(t, f, m.handle)) ||
                D.removeEvent(t, p, m.handle),
                delete l[p]);
          } else for (p in l) D.event.remove(t, p + e[h], i, n, !0);
        D.isEmptyObject(l) && Q.remove(t, "handle events");
      }
    },
    dispatch: function (t) {
      var e,
        i,
        n,
        s,
        o,
        r,
        a = D.event.fix(t),
        l = new Array(arguments.length),
        h = (Q.get(this, "events") || {})[a.type] || [],
        c = D.event.special[a.type] || {};
      for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
      if (
        ((a.delegateTarget = this),
          !c.preDispatch || !1 !== c.preDispatch.call(this, a))
      ) {
        for (
          r = D.event.handlers.call(this, a, h), e = 0;
          (s = r[e++]) && !a.isPropagationStopped();

        )
          for (
            a.currentTarget = s.elem, i = 0;
            (o = s.handlers[i++]) && !a.isImmediatePropagationStopped();

          )
            (a.rnamespace && !a.rnamespace.test(o.namespace)) ||
              ((a.handleObj = o),
                (a.data = o.data),
                void 0 !==
                (n = (
                  (D.event.special[o.origType] || {}).handle || o.handler
                ).apply(s.elem, l)) &&
                !1 === (a.result = n) &&
                (a.preventDefault(), a.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function (t, e) {
      var i,
        n,
        s,
        o,
        r,
        a = [],
        l = e.delegateCount,
        h = t.target;
      if (l && h.nodeType && !("click" === t.type && 1 <= t.button))
        for (; h !== this; h = h.parentNode || this)
          if (1 === h.nodeType && ("click" !== t.type || !0 !== h.disabled)) {
            for (o = [], r = {}, i = 0; i < l; i++)
              void 0 === r[(s = (n = e[i]).selector + " ")] &&
                (r[s] = n.needsContext
                  ? -1 < D(s, this).index(h)
                  : D.find(s, this, null, [h]).length),
                r[s] && o.push(n);
            o.length && a.push({ elem: h, handlers: o });
          }
      return (
        (h = this), l < e.length && a.push({ elem: h, handlers: e.slice(l) }), a
      );
    },
    addProp: function (e, t) {
      Object.defineProperty(D.Event.prototype, e, {
        enumerable: !0,
        configurable: !0,
        get: y(t)
          ? function () {
            if (this.originalEvent) return t(this.originalEvent);
          }
          : function () {
            if (this.originalEvent) return this.originalEvent[e];
          },
        set: function (t) {
          Object.defineProperty(this, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t,
          });
        },
      });
    },
    fix: function (t) {
      return t[D.expando] ? t : new D.Event(t);
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== kt() && this.focus) return this.focus(), !1;
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          if (this === kt() && this.blur) return this.blur(), !1;
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          if ("checkbox" === this.type && this.click && I(this, "input"))
            return this.click(), !1;
        },
        _default: function (t) {
          return I(t.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (t) {
          void 0 !== t.result &&
            t.originalEvent &&
            (t.originalEvent.returnValue = t.result);
        },
      },
    },
  }),
    (D.removeEvent = function (t, e, i) {
      t.removeEventListener && t.removeEventListener(e, i);
    }),
    (D.Event = function (t, e) {
      if (!(this instanceof D.Event)) return new D.Event(t, e);
      t && t.type
        ? ((this.originalEvent = t),
          (this.type = t.type),
          (this.isDefaultPrevented =
            t.defaultPrevented ||
              (void 0 === t.defaultPrevented && !1 === t.returnValue)
              ? xt
              : Ct),
          (this.target =
            t.target && 3 === t.target.nodeType
              ? t.target.parentNode
              : t.target),
          (this.currentTarget = t.currentTarget),
          (this.relatedTarget = t.relatedTarget))
        : (this.type = t),
        e && D.extend(this, e),
        (this.timeStamp = (t && t.timeStamp) || Date.now()),
        (this[D.expando] = !0);
    }),
    (D.Event.prototype = {
      constructor: D.Event,
      isDefaultPrevented: Ct,
      isPropagationStopped: Ct,
      isImmediatePropagationStopped: Ct,
      isSimulated: !1,
      preventDefault: function () {
        var t = this.originalEvent;
        (this.isDefaultPrevented = xt),
          t && !this.isSimulated && t.preventDefault();
      },
      stopPropagation: function () {
        var t = this.originalEvent;
        (this.isPropagationStopped = xt),
          t && !this.isSimulated && t.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var t = this.originalEvent;
        (this.isImmediatePropagationStopped = xt),
          t && !this.isSimulated && t.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    D.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (t) {
          var e = t.button;
          return null == t.which && yt.test(t.type)
            ? null != t.charCode
              ? t.charCode
              : t.keyCode
            : !t.which && void 0 !== e && bt.test(t.type)
              ? 1 & e
                ? 1
                : 2 & e
                  ? 3
                  : 4 & e
                    ? 2
                    : 0
              : t.which;
        },
      },
      D.event.addProp
    ),
    D.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (t, s) {
        D.event.special[t] = {
          delegateType: s,
          bindType: s,
          handle: function (t) {
            var e,
              i = t.relatedTarget,
              n = t.handleObj;
            return (
              (i && (i === this || D.contains(this, i))) ||
              ((t.type = n.origType),
                (e = n.handler.apply(this, arguments)),
                (t.type = s)),
              e
            );
          },
        };
      }
    ),
    D.fn.extend({
      on: function (t, e, i, n) {
        return Dt(this, t, e, i, n);
      },
      one: function (t, e, i, n) {
        return Dt(this, t, e, i, n, 1);
      },
      off: function (t, e, i) {
        var n, s;
        if (t && t.preventDefault && t.handleObj)
          return (
            (n = t.handleObj),
            D(t.delegateTarget).off(
              n.namespace ? n.origType + "." + n.namespace : n.origType,
              n.selector,
              n.handler
            ),
            this
          );
        if ("object" != typeof t)
          return (
            (!1 !== e && "function" != typeof e) || ((i = e), (e = void 0)),
            !1 === i && (i = Ct),
            this.each(function () {
              D.event.remove(this, t, i, e);
            })
          );
        for (s in t) this.off(s, e, t[s]);
        return this;
      },
    });
  var Tt =
    /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
    It = /<script|<style|<link/i,
    St = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Et = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function At(t, e) {
    return (
      (I(t, "table") &&
        I(11 !== e.nodeType ? e : e.firstChild, "tr") &&
        D(t).children("tbody")[0]) ||
      t
    );
  }
  function Pt(t) {
    return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
  }
  function jt(t) {
    return (
      "true/" === (t.type || "").slice(0, 5)
        ? (t.type = t.type.slice(5))
        : t.removeAttribute("type"),
      t
    );
  }
  function Ot(t, e) {
    var i, n, s, o, r, a, l, h;
    if (1 === e.nodeType) {
      if (
        Q.hasData(t) &&
        ((o = Q.access(t)), (r = Q.set(e, o)), (h = o.events))
      )
        for (s in (delete r.handle, (r.events = {}), h))
          for (i = 0, n = h[s].length; i < n; i++) D.event.add(e, s, h[s][i]);
      X.hasData(t) && ((a = X.access(t)), (l = D.extend({}, a)), X.set(e, l));
    }
  }
  function Nt(i, n, s, o) {
    n = m.apply([], n);
    var t,
      e,
      r,
      a,
      l,
      h,
      c = 0,
      u = i.length,
      d = u - 1,
      p = n[0],
      f = y(p);
    if (f || (1 < u && "string" == typeof p && !_.checkClone && St.test(p)))
      return i.each(function (t) {
        var e = i.eq(t);
        f && (n[0] = p.call(this, t, e.html())), Nt(e, n, s, o);
      });
    if (
      u &&
      ((e = (t = vt(n, i[0].ownerDocument, !1, i, o)).firstChild),
        1 === t.childNodes.length && (t = e),
        e || o)
    ) {
      for (a = (r = D.map(dt(t, "script"), Pt)).length; c < u; c++)
        (l = t),
          c !== d &&
          ((l = D.clone(l, !0, !0)), a && D.merge(r, dt(l, "script"))),
          s.call(i[c], l, c);
      if (a)
        for (h = r[r.length - 1].ownerDocument, D.map(r, jt), c = 0; c < a; c++)
          (l = r[c]),
            ct.test(l.type || "") &&
            !Q.access(l, "globalEval") &&
            D.contains(h, l) &&
            (l.src && "module" !== (l.type || "").toLowerCase()
              ? D._evalUrl && D._evalUrl(l.src)
              : b(l.textContent.replace(Et, ""), h, l));
    }
    return i;
  }
  function Mt(t, e, i) {
    for (var n, s = e ? D.filter(e, t) : t, o = 0; null != (n = s[o]); o++)
      i || 1 !== n.nodeType || D.cleanData(dt(n)),
        n.parentNode &&
        (i && D.contains(n.ownerDocument, n) && pt(dt(n, "script")),
          n.parentNode.removeChild(n));
    return t;
  }
  D.extend({
    htmlPrefilter: function (t) {
      return t.replace(Tt, "<$1></$2>");
    },
    clone: function (t, e, i) {
      var n,
        s,
        o,
        r,
        a,
        l,
        h,
        c = t.cloneNode(!0),
        u = D.contains(t.ownerDocument, t);
      if (
        !(
          _.noCloneChecked ||
          (1 !== t.nodeType && 11 !== t.nodeType) ||
          D.isXMLDoc(t)
        )
      )
        for (r = dt(c), n = 0, s = (o = dt(t)).length; n < s; n++)
          (a = o[n]),
            (l = r[n]),
            void 0,
            "input" === (h = l.nodeName.toLowerCase()) && lt.test(a.type)
              ? (l.checked = a.checked)
              : ("input" !== h && "textarea" !== h) ||
              (l.defaultValue = a.defaultValue);
      if (e)
        if (i)
          for (o = o || dt(t), r = r || dt(c), n = 0, s = o.length; n < s; n++)
            Ot(o[n], r[n]);
        else Ot(t, c);
      return (
        0 < (r = dt(c, "script")).length && pt(r, !u && dt(t, "script")), c
      );
    },
    cleanData: function (t) {
      for (var e, i, n, s = D.event.special, o = 0; void 0 !== (i = t[o]); o++)
        if (K(i)) {
          if ((e = i[Q.expando])) {
            if (e.events)
              for (n in e.events)
                s[n] ? D.event.remove(i, n) : D.removeEvent(i, n, e.handle);
            i[Q.expando] = void 0;
          }
          i[X.expando] && (i[X.expando] = void 0);
        }
    },
  }),
    D.fn.extend({
      detach: function (t) {
        return Mt(this, t, !0);
      },
      remove: function (t) {
        return Mt(this, t);
      },
      text: function (t) {
        return q(
          this,
          function (t) {
            return void 0 === t
              ? D.text(this)
              : this.empty().each(function () {
                (1 !== this.nodeType &&
                  11 !== this.nodeType &&
                  9 !== this.nodeType) ||
                  (this.textContent = t);
              });
          },
          null,
          t,
          arguments.length
        );
      },
      append: function () {
        return Nt(this, arguments, function (t) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            At(this, t).appendChild(t);
        });
      },
      prepend: function () {
        return Nt(this, arguments, function (t) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var e = At(this, t);
            e.insertBefore(t, e.firstChild);
          }
        });
      },
      before: function () {
        return Nt(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this);
        });
      },
      after: function () {
        return Nt(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
        });
      },
      empty: function () {
        for (var t, e = 0; null != (t = this[e]); e++)
          1 === t.nodeType && (D.cleanData(dt(t, !1)), (t.textContent = ""));
        return this;
      },
      clone: function (t, e) {
        return (
          (t = null != t && t),
          (e = null == e ? t : e),
          this.map(function () {
            return D.clone(this, t, e);
          })
        );
      },
      html: function (t) {
        return q(
          this,
          function (t) {
            var e = this[0] || {},
              i = 0,
              n = this.length;
            if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
            if (
              "string" == typeof t &&
              !It.test(t) &&
              !ut[(ht.exec(t) || ["", ""])[1].toLowerCase()]
            ) {
              t = D.htmlPrefilter(t);
              try {
                for (; i < n; i++)
                  1 === (e = this[i] || {}).nodeType &&
                    (D.cleanData(dt(e, !1)), (e.innerHTML = t));
                e = 0;
              } catch (t) { }
            }
            e && this.empty().append(t);
          },
          null,
          t,
          arguments.length
        );
      },
      replaceWith: function () {
        var i = [];
        return Nt(
          this,
          arguments,
          function (t) {
            var e = this.parentNode;
            D.inArray(this, i) < 0 &&
              (D.cleanData(dt(this)), e && e.replaceChild(t, this));
          },
          i
        );
      },
    }),
    D.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (t, r) {
        D.fn[t] = function (t) {
          for (var e, i = [], n = D(t), s = n.length - 1, o = 0; o <= s; o++)
            (e = o === s ? this : this.clone(!0)),
              D(n[o])[r](e),
              l.apply(i, e.get());
          return this.pushStack(i);
        };
      }
    );
  var Ht,
    zt,
    Wt,
    Lt,
    Rt,
    Ft,
    qt,
    Bt = new RegExp("^(" + et + ")(?!px)[a-z%]+$", "i"),
    $t = function (t) {
      var e = t.ownerDocument.defaultView;
      return (e && e.opener) || (e = C), e.getComputedStyle(t);
    },
    Ut = new RegExp(nt.join("|"), "i");
  function Yt() {
    if (qt) {
      (Ft.style.cssText =
        "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
        (qt.style.cssText =
          "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
        _t.appendChild(Ft).appendChild(qt);
      var t = C.getComputedStyle(qt);
      (Ht = "1%" !== t.top),
        (Rt = 12 === Kt(t.marginLeft)),
        (qt.style.right = "60%"),
        (Lt = 36 === Kt(t.right)),
        (zt = 36 === Kt(t.width)),
        (qt.style.position = "absolute"),
        (Wt = 36 === qt.offsetWidth || "absolute"),
        _t.removeChild(Ft),
        (qt = null);
    }
  }
  function Kt(t) {
    return Math.round(parseFloat(t));
  }
  function Vt(t, e, i) {
    var n,
      s,
      o,
      r,
      a = t.style;
    return (
      (i = i || $t(t)) &&
      ("" !== (r = i.getPropertyValue(e) || i[e]) ||
        D.contains(t.ownerDocument, t) ||
        (r = D.style(t, e)),
        !_.pixelBoxStyles() &&
        Bt.test(r) &&
        Ut.test(e) &&
        ((n = a.width),
          (s = a.minWidth),
          (o = a.maxWidth),
          (a.minWidth = a.maxWidth = a.width = r),
          (r = i.width),
          (a.width = n),
          (a.minWidth = s),
          (a.maxWidth = o))),
      void 0 !== r ? r + "" : r
    );
  }
  function Qt(t, e) {
    return {
      get: function () {
        if (!t()) return (this.get = e).apply(this, arguments);
        delete this.get;
      },
    };
  }
  (Ft = k.createElement("div")),
    (qt = k.createElement("div")).style &&
    ((qt.style.backgroundClip = "content-box"),
      (qt.cloneNode(!0).style.backgroundClip = ""),
      (_.clearCloneStyle = "content-box" === qt.style.backgroundClip),
      D.extend(_, {
        boxSizingReliable: function () {
          return Yt(), zt;
        },
        pixelBoxStyles: function () {
          return Yt(), Lt;
        },
        pixelPosition: function () {
          return Yt(), Ht;
        },
        reliableMarginLeft: function () {
          return Yt(), Rt;
        },
        scrollboxSize: function () {
          return Yt(), Wt;
        },
      }));
  var Xt = /^(none|table(?!-c[ea]).+)/,
    Gt = /^--/,
    Jt = { position: "absolute", visibility: "hidden", display: "block" },
    Zt = { letterSpacing: "0", fontWeight: "400" },
    te = ["Webkit", "Moz", "ms"],
    ee = k.createElement("div").style;
  function ie(t) {
    var e = D.cssProps[t];
    return (e =
      e ||
      (D.cssProps[t] =
        (function (t) {
          if (t in ee) return t;
          for (var e = t[0].toUpperCase() + t.slice(1), i = te.length; i--;)
            if ((t = te[i] + e) in ee) return t;
        })(t) || t));
  }
  function ne(t, e, i) {
    var n = it.exec(e);
    return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e;
  }
  function se(t, e, i, n, s, o) {
    var r = "width" === e ? 1 : 0,
      a = 0,
      l = 0;
    if (i === (n ? "border" : "content")) return 0;
    for (; r < 4; r += 2)
      "margin" === i && (l += D.css(t, i + nt[r], !0, s)),
        n
          ? ("content" === i && (l -= D.css(t, "padding" + nt[r], !0, s)),
            "margin" !== i &&
            (l -= D.css(t, "border" + nt[r] + "Width", !0, s)))
          : ((l += D.css(t, "padding" + nt[r], !0, s)),
            "padding" !== i
              ? (l += D.css(t, "border" + nt[r] + "Width", !0, s))
              : (a += D.css(t, "border" + nt[r] + "Width", !0, s)));
    return (
      !n &&
      0 <= o &&
      (l += Math.max(
        0,
        Math.ceil(
          t["offset" + e[0].toUpperCase() + e.slice(1)] - o - l - a - 0.5
        )
      )),
      l
    );
  }
  function oe(t, e, i) {
    var n = $t(t),
      s = Vt(t, e, n),
      o = "border-box" === D.css(t, "boxSizing", !1, n),
      r = o;
    if (Bt.test(s)) {
      if (!i) return s;
      s = "auto";
    }
    return (
      (r = r && (_.boxSizingReliable() || s === t.style[e])),
      ("auto" !== s &&
        (parseFloat(s) || "inline" !== D.css(t, "display", !1, n))) ||
      ((s = t["offset" + e[0].toUpperCase() + e.slice(1)]), (r = !0)),
      (s = parseFloat(s) || 0) +
      se(t, e, i || (o ? "border" : "content"), r, n, s) +
      "px"
    );
  }
  function re(t, e, i, n, s) {
    return new re.prototype.init(t, e, i, n, s);
  }
  D.extend({
    cssHooks: {
      opacity: {
        get: function (t, e) {
          if (e) {
            var i = Vt(t, "opacity");
            return "" === i ? "1" : i;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {},
    style: function (t, e, i, n) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var s,
          o,
          r,
          a = Y(e),
          l = Gt.test(e),
          h = t.style;
        if (
          (l || (e = ie(a)), (r = D.cssHooks[e] || D.cssHooks[a]), void 0 === i)
        )
          return r && "get" in r && void 0 !== (s = r.get(t, !1, n)) ? s : h[e];
        "string" == (o = typeof i) &&
          (s = it.exec(i)) &&
          s[1] &&
          ((i = ot(t, e, s)), (o = "number")),
          null != i &&
          i == i &&
          ("number" === o &&
            (i += (s && s[3]) || (D.cssNumber[a] ? "" : "px")),
            _.clearCloneStyle ||
            "" !== i ||
            0 !== e.indexOf("background") ||
            (h[e] = "inherit"),
            (r && "set" in r && void 0 === (i = r.set(t, i, n))) ||
            (l ? h.setProperty(e, i) : (h[e] = i)));
      }
    },
    css: function (t, e, i, n) {
      var s,
        o,
        r,
        a = Y(e);
      return (
        Gt.test(e) || (e = ie(a)),
        (r = D.cssHooks[e] || D.cssHooks[a]) &&
        "get" in r &&
        (s = r.get(t, !0, i)),
        void 0 === s && (s = Vt(t, e, n)),
        "normal" === s && e in Zt && (s = Zt[e]),
        "" === i || i
          ? ((o = parseFloat(s)), !0 === i || isFinite(o) ? o || 0 : s)
          : s
      );
    },
  }),
    D.each(["height", "width"], function (t, a) {
      D.cssHooks[a] = {
        get: function (t, e, i) {
          if (e)
            return !Xt.test(D.css(t, "display")) ||
              (t.getClientRects().length && t.getBoundingClientRect().width)
              ? oe(t, a, i)
              : tt(t, Jt, function () {
                return oe(t, a, i);
              });
        },
        set: function (t, e, i) {
          var n,
            s = $t(t),
            o = "border-box" === D.css(t, "boxSizing", !1, s),
            r = i && se(t, a, i, o, s);
          return (
            o &&
            _.scrollboxSize() === s.position &&
            (r -= Math.ceil(
              t["offset" + a[0].toUpperCase() + a.slice(1)] -
              parseFloat(s[a]) -
              se(t, a, "border", !1, s) -
              0.5
            )),
            r &&
            (n = it.exec(e)) &&
            "px" !== (n[3] || "px") &&
            ((t.style[a] = e), (e = D.css(t, a))),
            ne(0, e, r)
          );
        },
      };
    }),
    (D.cssHooks.marginLeft = Qt(_.reliableMarginLeft, function (t, e) {
      if (e)
        return (
          (parseFloat(Vt(t, "marginLeft")) ||
            t.getBoundingClientRect().left -
            tt(t, { marginLeft: 0 }, function () {
              return t.getBoundingClientRect().left;
            })) + "px"
        );
    })),
    D.each({ margin: "", padding: "", border: "Width" }, function (s, o) {
      (D.cssHooks[s + o] = {
        expand: function (t) {
          for (
            var e = 0, i = {}, n = "string" == typeof t ? t.split(" ") : [t];
            e < 4;
            e++
          )
            i[s + nt[e] + o] = n[e] || n[e - 2] || n[0];
          return i;
        },
      }),
        "margin" !== s && (D.cssHooks[s + o].set = ne);
    }),
    D.fn.extend({
      css: function (t, e) {
        return q(
          this,
          function (t, e, i) {
            var n,
              s,
              o = {},
              r = 0;
            if (Array.isArray(e)) {
              for (n = $t(t), s = e.length; r < s; r++)
                o[e[r]] = D.css(t, e[r], !1, n);
              return o;
            }
            return void 0 !== i ? D.style(t, e, i) : D.css(t, e);
          },
          t,
          e,
          1 < arguments.length
        );
      },
    }),
    (((D.Tween = re).prototype = {
      constructor: re,
      init: function (t, e, i, n, s, o) {
        (this.elem = t),
          (this.prop = i),
          (this.easing = s || D.easing._default),
          (this.options = e),
          (this.start = this.now = this.cur()),
          (this.end = n),
          (this.unit = o || (D.cssNumber[i] ? "" : "px"));
      },
      cur: function () {
        var t = re.propHooks[this.prop];
        return t && t.get ? t.get(this) : re.propHooks._default.get(this);
      },
      run: function (t) {
        var e,
          i = re.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = e =
              D.easing[this.easing](
                t,
                this.options.duration * t,
                0,
                1,
                this.options.duration
              ))
            : (this.pos = e = t),
          (this.now = (this.end - this.start) * e + this.start),
          this.options.step &&
          this.options.step.call(this.elem, this.now, this),
          i && i.set ? i.set(this) : re.propHooks._default.set(this),
          this
        );
      },
    }).init.prototype = re.prototype),
    ((re.propHooks = {
      _default: {
        get: function (t) {
          var e;
          return 1 !== t.elem.nodeType ||
            (null != t.elem[t.prop] && null == t.elem.style[t.prop])
            ? t.elem[t.prop]
            : (e = D.css(t.elem, t.prop, "")) && "auto" !== e
              ? e
              : 0;
        },
        set: function (t) {
          D.fx.step[t.prop]
            ? D.fx.step[t.prop](t)
            : 1 !== t.elem.nodeType ||
              (null == t.elem.style[D.cssProps[t.prop]] && !D.cssHooks[t.prop])
              ? (t.elem[t.prop] = t.now)
              : D.style(t.elem, t.prop, t.now + t.unit);
        },
      },
    }).scrollTop = re.propHooks.scrollLeft =
      {
        set: function (t) {
          t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
        },
      }),
    (D.easing = {
      linear: function (t) {
        return t;
      },
      swing: function (t) {
        return 0.5 - Math.cos(t * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (D.fx = re.prototype.init),
    (D.fx.step = {});
  var ae,
    le,
    he,
    ce,
    ue = /^(?:toggle|show|hide)$/,
    de = /queueHooks$/;
  function pe() {
    le &&
      (!1 === k.hidden && C.requestAnimationFrame
        ? C.requestAnimationFrame(pe)
        : C.setTimeout(pe, D.fx.interval),
        D.fx.tick());
  }
  function fe() {
    return (
      C.setTimeout(function () {
        ae = void 0;
      }),
      (ae = Date.now())
    );
  }
  function ge(t, e) {
    var i,
      n = 0,
      s = { height: t };
    for (e = e ? 1 : 0; n < 4; n += 2 - e)
      s["margin" + (i = nt[n])] = s["padding" + i] = t;
    return e && (s.opacity = s.width = t), s;
  }
  function me(t, e, i) {
    for (
      var n,
      s = (ve.tweeners[e] || []).concat(ve.tweeners["*"]),
      o = 0,
      r = s.length;
      o < r;
      o++
    )
      if ((n = s[o].call(i, e, t))) return n;
  }
  function ve(o, t, e) {
    var i,
      r,
      n = 0,
      s = ve.prefilters.length,
      a = D.Deferred().always(function () {
        delete l.elem;
      }),
      l = function () {
        if (r) return !1;
        for (
          var t = ae || fe(),
          e = Math.max(0, h.startTime + h.duration - t),
          i = 1 - (e / h.duration || 0),
          n = 0,
          s = h.tweens.length;
          n < s;
          n++
        )
          h.tweens[n].run(i);
        return (
          a.notifyWith(o, [h, i, e]),
          i < 1 && s
            ? e
            : (s || a.notifyWith(o, [h, 1, 0]), a.resolveWith(o, [h]), !1)
        );
      },
      h = a.promise({
        elem: o,
        props: D.extend({}, t),
        opts: D.extend(!0, { specialEasing: {}, easing: D.easing._default }, e),
        originalProperties: t,
        originalOptions: e,
        startTime: ae || fe(),
        duration: e.duration,
        tweens: [],
        createTween: function (t, e) {
          var i = D.Tween(
            o,
            h.opts,
            t,
            e,
            h.opts.specialEasing[t] || h.opts.easing
          );
          return h.tweens.push(i), i;
        },
        stop: function (t) {
          var e = 0,
            i = t ? h.tweens.length : 0;
          if (r) return this;
          for (r = !0; e < i; e++) h.tweens[e].run(1);
          return (
            t
              ? (a.notifyWith(o, [h, 1, 0]), a.resolveWith(o, [h, t]))
              : a.rejectWith(o, [h, t]),
            this
          );
        },
      }),
      c = h.props;
    for (
      (function (t, e) {
        var i, n, s, o, r;
        for (i in t)
          if (
            ((s = e[(n = Y(i))]),
              (o = t[i]),
              Array.isArray(o) && ((s = o[1]), (o = t[i] = o[0])),
              i !== n && ((t[n] = o), delete t[i]),
              (r = D.cssHooks[n]) && ("expand" in r))
          )
            for (i in ((o = r.expand(o)), delete t[n], o))
              (i in t) || ((t[i] = o[i]), (e[i] = s));
          else e[n] = s;
      })(c, h.opts.specialEasing);
      n < s;
      n++
    )
      if ((i = ve.prefilters[n].call(h, o, c, h.opts)))
        return (
          y(i.stop) &&
          (D._queueHooks(h.elem, h.opts.queue).stop = i.stop.bind(i)),
          i
        );
    return (
      D.map(c, me, h),
      y(h.opts.start) && h.opts.start.call(o, h),
      h
        .progress(h.opts.progress)
        .done(h.opts.done, h.opts.complete)
        .fail(h.opts.fail)
        .always(h.opts.always),
      D.fx.timer(D.extend(l, { elem: o, anim: h, queue: h.opts.queue })),
      h
    );
  }
  (D.Animation = D.extend(ve, {
    tweeners: {
      "*": [
        function (t, e) {
          var i = this.createTween(t, e);
          return ot(i.elem, t, it.exec(e), i), i;
        },
      ],
    },
    tweener: function (t, e) {
      for (
        var i, n = 0, s = (t = y(t) ? ((e = t), ["*"]) : t.match(M)).length;
        n < s;
        n++
      )
        (i = t[n]),
          (ve.tweeners[i] = ve.tweeners[i] || []),
          ve.tweeners[i].unshift(e);
    },
    prefilters: [
      function (t, e, i) {
        var n,
          s,
          o,
          r,
          a,
          l,
          h,
          c,
          u = "width" in e || "height" in e,
          d = this,
          p = {},
          f = t.style,
          g = t.nodeType && st(t),
          m = Q.get(t, "fxshow");
        for (n in (i.queue ||
          (null == (r = D._queueHooks(t, "fx")).unqueued &&
            ((r.unqueued = 0),
              (a = r.empty.fire),
              (r.empty.fire = function () {
                r.unqueued || a();
              })),
            r.unqueued++,
            d.always(function () {
              d.always(function () {
                r.unqueued--, D.queue(t, "fx").length || r.empty.fire();
              });
            })),
          e))
          if (((s = e[n]), ue.test(s))) {
            if (
              (delete e[n],
                (o = o || "toggle" === s),
                s === (g ? "hide" : "show"))
            ) {
              if ("show" !== s || !m || void 0 === m[n]) continue;
              g = !0;
            }
            p[n] = (m && m[n]) || D.style(t, n);
          }
        if ((l = !D.isEmptyObject(e)) || !D.isEmptyObject(p))
          for (n in (u &&
            1 === t.nodeType &&
            ((i.overflow = [f.overflow, f.overflowX, f.overflowY]),
              null == (h = m && m.display) && (h = Q.get(t, "display")),
              "none" === (c = D.css(t, "display")) &&
              (h
                ? (c = h)
                : (at([t], !0),
                  (h = t.style.display || h),
                  (c = D.css(t, "display")),
                  at([t]))),
              ("inline" === c || ("inline-block" === c && null != h)) &&
              "none" === D.css(t, "float") &&
              (l ||
                (d.done(function () {
                  f.display = h;
                }),
                  null == h && ((c = f.display), (h = "none" === c ? "" : c))),
                (f.display = "inline-block"))),
            i.overflow &&
            ((f.overflow = "hidden"),
              d.always(function () {
                (f.overflow = i.overflow[0]),
                  (f.overflowX = i.overflow[1]),
                  (f.overflowY = i.overflow[2]);
              })),
            (l = !1),
            p))
            l ||
              (m
                ? "hidden" in m && (g = m.hidden)
                : (m = Q.access(t, "fxshow", { display: h })),
                o && (m.hidden = !g),
                g && at([t], !0),
                d.done(function () {
                  for (n in (g || at([t]), Q.remove(t, "fxshow"), p))
                    D.style(t, n, p[n]);
                })),
              (l = me(g ? m[n] : 0, n, d)),
              n in m ||
              ((m[n] = l.start), g && ((l.end = l.start), (l.start = 0)));
      },
    ],
    prefilter: function (t, e) {
      e ? ve.prefilters.unshift(t) : ve.prefilters.push(t);
    },
  })),
    (D.speed = function (t, e, i) {
      var n =
        t && "object" == typeof t
          ? D.extend({}, t)
          : {
            complete: i || (!i && e) || (y(t) && t),
            duration: t,
            easing: (i && e) || (e && !y(e) && e),
          };
      return (
        D.fx.off
          ? (n.duration = 0)
          : "number" != typeof n.duration &&
          (n.duration in D.fx.speeds
            ? (n.duration = D.fx.speeds[n.duration])
            : (n.duration = D.fx.speeds._default)),
        (null != n.queue && !0 !== n.queue) || (n.queue = "fx"),
        (n.old = n.complete),
        (n.complete = function () {
          y(n.old) && n.old.call(this), n.queue && D.dequeue(this, n.queue);
        }),
        n
      );
    }),
    D.fn.extend({
      fadeTo: function (t, e, i, n) {
        return this.filter(st)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: e }, t, i, n);
      },
      animate: function (e, t, i, n) {
        function s() {
          var t = ve(this, D.extend({}, e), r);
          (o || Q.get(this, "finish")) && t.stop(!0);
        }
        var o = D.isEmptyObject(e),
          r = D.speed(t, i, n);
        return (
          (s.finish = s),
          o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
        );
      },
      stop: function (s, t, o) {
        function r(t) {
          var e = t.stop;
          delete t.stop, e(o);
        }
        return (
          "string" != typeof s && ((o = t), (t = s), (s = void 0)),
          t && !1 !== s && this.queue(s || "fx", []),
          this.each(function () {
            var t = !0,
              e = null != s && s + "queueHooks",
              i = D.timers,
              n = Q.get(this);
            if (e) n[e] && n[e].stop && r(n[e]);
            else for (e in n) n[e] && n[e].stop && de.test(e) && r(n[e]);
            for (e = i.length; e--;)
              i[e].elem !== this ||
                (null != s && i[e].queue !== s) ||
                (i[e].anim.stop(o), (t = !1), i.splice(e, 1));
            (!t && o) || D.dequeue(this, s);
          })
        );
      },
      finish: function (r) {
        return (
          !1 !== r && (r = r || "fx"),
          this.each(function () {
            var t,
              e = Q.get(this),
              i = e[r + "queue"],
              n = e[r + "queueHooks"],
              s = D.timers,
              o = i ? i.length : 0;
            for (
              e.finish = !0,
              D.queue(this, r, []),
              n && n.stop && n.stop.call(this, !0),
              t = s.length;
              t--;

            )
              s[t].elem === this &&
                s[t].queue === r &&
                (s[t].anim.stop(!0), s.splice(t, 1));
            for (t = 0; t < o; t++)
              i[t] && i[t].finish && i[t].finish.call(this);
            delete e.finish;
          })
        );
      },
    }),
    D.each(["toggle", "show", "hide"], function (t, n) {
      var s = D.fn[n];
      D.fn[n] = function (t, e, i) {
        return null == t || "boolean" == typeof t
          ? s.apply(this, arguments)
          : this.animate(ge(n, !0), t, e, i);
      };
    }),
    D.each(
      {
        slideDown: ge("show"),
        slideUp: ge("hide"),
        slideToggle: ge("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (t, n) {
        D.fn[t] = function (t, e, i) {
          return this.animate(n, t, e, i);
        };
      }
    ),
    (D.timers = []),
    (D.fx.tick = function () {
      var t,
        e = 0,
        i = D.timers;
      for (ae = Date.now(); e < i.length; e++)
        (t = i[e])() || i[e] !== t || i.splice(e--, 1);
      i.length || D.fx.stop(), (ae = void 0);
    }),
    (D.fx.timer = function (t) {
      D.timers.push(t), D.fx.start();
    }),
    (D.fx.interval = 13),
    (D.fx.start = function () {
      le || ((le = !0), pe());
    }),
    (D.fx.stop = function () {
      le = null;
    }),
    (D.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (D.fn.delay = function (n, t) {
      return (
        (n = (D.fx && D.fx.speeds[n]) || n),
        (t = t || "fx"),
        this.queue(t, function (t, e) {
          var i = C.setTimeout(t, n);
          e.stop = function () {
            C.clearTimeout(i);
          };
        })
      );
    }),
    (he = k.createElement("input")),
    (ce = k.createElement("select").appendChild(k.createElement("option"))),
    (he.type = "checkbox"),
    (_.checkOn = "" !== he.value),
    (_.optSelected = ce.selected),
    ((he = k.createElement("input")).value = "t"),
    (he.type = "radio"),
    (_.radioValue = "t" === he.value);
  var _e,
    ye = D.expr.attrHandle;
  D.fn.extend({
    attr: function (t, e) {
      return q(this, D.attr, t, e, 1 < arguments.length);
    },
    removeAttr: function (t) {
      return this.each(function () {
        D.removeAttr(this, t);
      });
    },
  }),
    D.extend({
      attr: function (t, e, i) {
        var n,
          s,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return void 0 === t.getAttribute
            ? D.prop(t, e, i)
            : ((1 === o && D.isXMLDoc(t)) ||
              (s =
                D.attrHooks[e.toLowerCase()] ||
                (D.expr.match.bool.test(e) ? _e : void 0)),
              void 0 !== i
                ? null === i
                  ? void D.removeAttr(t, e)
                  : s && "set" in s && void 0 !== (n = s.set(t, i, e))
                    ? n
                    : (t.setAttribute(e, i + ""), i)
                : s && "get" in s && null !== (n = s.get(t, e))
                  ? n
                  : null == (n = D.find.attr(t, e))
                    ? void 0
                    : n);
      },
      attrHooks: {
        type: {
          set: function (t, e) {
            if (!_.radioValue && "radio" === e && I(t, "input")) {
              var i = t.value;
              return t.setAttribute("type", e), i && (t.value = i), e;
            }
          },
        },
      },
      removeAttr: function (t, e) {
        var i,
          n = 0,
          s = e && e.match(M);
        if (s && 1 === t.nodeType) for (; (i = s[n++]);) t.removeAttribute(i);
      },
    }),
    (_e = {
      set: function (t, e, i) {
        return !1 === e ? D.removeAttr(t, i) : t.setAttribute(i, i), i;
      },
    }),
    D.each(D.expr.match.bool.source.match(/\w+/g), function (t, e) {
      var r = ye[e] || D.find.attr;
      ye[e] = function (t, e, i) {
        var n,
          s,
          o = e.toLowerCase();
        return (
          i ||
          ((s = ye[o]),
            (ye[o] = n),
            (n = null != r(t, e, i) ? o : null),
            (ye[o] = s)),
          n
        );
      };
    });
  var be = /^(?:input|select|textarea|button)$/i,
    we = /^(?:a|area)$/i;
  function xe(t) {
    return (t.match(M) || []).join(" ");
  }
  function Ce(t) {
    return (t.getAttribute && t.getAttribute("class")) || "";
  }
  function ke(t) {
    return Array.isArray(t) ? t : ("string" == typeof t && t.match(M)) || [];
  }
  D.fn.extend({
    prop: function (t, e) {
      return q(this, D.prop, t, e, 1 < arguments.length);
    },
    removeProp: function (t) {
      return this.each(function () {
        delete this[D.propFix[t] || t];
      });
    },
  }),
    D.extend({
      prop: function (t, e, i) {
        var n,
          s,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && D.isXMLDoc(t)) ||
            ((e = D.propFix[e] || e), (s = D.propHooks[e])),
            void 0 !== i
              ? s && "set" in s && void 0 !== (n = s.set(t, i, e))
                ? n
                : (t[e] = i)
              : s && "get" in s && null !== (n = s.get(t, e))
                ? n
                : t[e]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (t) {
            var e = D.find.attr(t, "tabindex");
            return e
              ? parseInt(e, 10)
              : be.test(t.nodeName) || (we.test(t.nodeName) && t.href)
                ? 0
                : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    _.optSelected ||
    (D.propHooks.selected = {
      get: function (t) {
        var e = t.parentNode;
        return e && e.parentNode && e.parentNode.selectedIndex, null;
      },
      set: function (t) {
        var e = t.parentNode;
        e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
      },
    }),
    D.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        D.propFix[this.toLowerCase()] = this;
      }
    ),
    D.fn.extend({
      addClass: function (e) {
        var t,
          i,
          n,
          s,
          o,
          r,
          a,
          l = 0;
        if (y(e))
          return this.each(function (t) {
            D(this).addClass(e.call(this, t, Ce(this)));
          });
        if ((t = ke(e)).length)
          for (; (i = this[l++]);)
            if (((s = Ce(i)), (n = 1 === i.nodeType && " " + xe(s) + " "))) {
              for (r = 0; (o = t[r++]);)
                n.indexOf(" " + o + " ") < 0 && (n += o + " ");
              s !== (a = xe(n)) && i.setAttribute("class", a);
            }
        return this;
      },
      removeClass: function (e) {
        var t,
          i,
          n,
          s,
          o,
          r,
          a,
          l = 0;
        if (y(e))
          return this.each(function (t) {
            D(this).removeClass(e.call(this, t, Ce(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ((t = ke(e)).length)
          for (; (i = this[l++]);)
            if (((s = Ce(i)), (n = 1 === i.nodeType && " " + xe(s) + " "))) {
              for (r = 0; (o = t[r++]);)
                for (; -1 < n.indexOf(" " + o + " ");)
                  n = n.replace(" " + o + " ", " ");
              s !== (a = xe(n)) && i.setAttribute("class", a);
            }
        return this;
      },
      toggleClass: function (s, e) {
        var o = typeof s,
          r = "string" == o || Array.isArray(s);
        return "boolean" == typeof e && r
          ? e
            ? this.addClass(s)
            : this.removeClass(s)
          : y(s)
            ? this.each(function (t) {
              D(this).toggleClass(s.call(this, t, Ce(this), e), e);
            })
            : this.each(function () {
              var t, e, i, n;
              if (r)
                for (e = 0, i = D(this), n = ke(s); (t = n[e++]);)
                  i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
              else
                (void 0 !== s && "boolean" != o) ||
                  ((t = Ce(this)) && Q.set(this, "__className__", t),
                    this.setAttribute &&
                    this.setAttribute(
                      "class",
                      t || !1 === s ? "" : Q.get(this, "__className__") || ""
                    ));
            });
      },
      hasClass: function (t) {
        var e,
          i,
          n = 0;
        for (e = " " + t + " "; (i = this[n++]);)
          if (1 === i.nodeType && -1 < (" " + xe(Ce(i)) + " ").indexOf(e))
            return !0;
        return !1;
      },
    });
  var De = /\r/g;
  D.fn.extend({
    val: function (i) {
      var n,
        t,
        s,
        e = this[0];
      return arguments.length
        ? ((s = y(i)),
          this.each(function (t) {
            var e;
            1 === this.nodeType &&
              (null == (e = s ? i.call(this, t, D(this).val()) : i)
                ? (e = "")
                : "number" == typeof e
                  ? (e += "")
                  : Array.isArray(e) &&
                  (e = D.map(e, function (t) {
                    return null == t ? "" : t + "";
                  })),
                ((n =
                  D.valHooks[this.type] ||
                  D.valHooks[this.nodeName.toLowerCase()]) &&
                  "set" in n &&
                  void 0 !== n.set(this, e, "value")) ||
                (this.value = e));
          }))
        : e
          ? (n = D.valHooks[e.type] || D.valHooks[e.nodeName.toLowerCase()]) &&
            "get" in n &&
            void 0 !== (t = n.get(e, "value"))
            ? t
            : "string" == typeof (t = e.value)
              ? t.replace(De, "")
              : null == t
                ? ""
                : t
          : void 0;
    },
  }),
    D.extend({
      valHooks: {
        option: {
          get: function (t) {
            var e = D.find.attr(t, "value");
            return null != e ? e : xe(D.text(t));
          },
        },
        select: {
          get: function (t) {
            var e,
              i,
              n,
              s = t.options,
              o = t.selectedIndex,
              r = "select-one" === t.type,
              a = r ? null : [],
              l = r ? o + 1 : s.length;
            for (n = o < 0 ? l : r ? o : 0; n < l; n++)
              if (
                ((i = s[n]).selected || n === o) &&
                !i.disabled &&
                (!i.parentNode.disabled || !I(i.parentNode, "optgroup"))
              ) {
                if (((e = D(i).val()), r)) return e;
                a.push(e);
              }
            return a;
          },
          set: function (t, e) {
            for (
              var i, n, s = t.options, o = D.makeArray(e), r = s.length;
              r--;

            )
              ((n = s[r]).selected =
                -1 < D.inArray(D.valHooks.option.get(n), o)) && (i = !0);
            return i || (t.selectedIndex = -1), o;
          },
        },
      },
    }),
    D.each(["radio", "checkbox"], function () {
      (D.valHooks[this] = {
        set: function (t, e) {
          if (Array.isArray(e))
            return (t.checked = -1 < D.inArray(D(t).val(), e));
        },
      }),
        _.checkOn ||
        (D.valHooks[this].get = function (t) {
          return null === t.getAttribute("value") ? "on" : t.value;
        });
    }),
    (_.focusin = "onfocusin" in C);
  function Te(t) {
    t.stopPropagation();
  }
  var Ie = /^(?:focusinfocus|focusoutblur)$/;
  D.extend(D.event, {
    trigger: function (t, e, i, n) {
      var s,
        o,
        r,
        a,
        l,
        h,
        c,
        u,
        d = [i || k],
        p = v.call(t, "type") ? t.type : t,
        f = v.call(t, "namespace") ? t.namespace.split(".") : [];
      if (
        ((o = u = r = i = i || k),
          3 !== i.nodeType &&
          8 !== i.nodeType &&
          !Ie.test(p + D.event.triggered) &&
          (-1 < p.indexOf(".") && ((p = (f = p.split(".")).shift()), f.sort()),
            (l = p.indexOf(":") < 0 && "on" + p),
            ((t = t[D.expando]
              ? t
              : new D.Event(p, "object" == typeof t && t)).isTrigger = n ? 2 : 3),
            (t.namespace = f.join(".")),
            (t.rnamespace = t.namespace
              ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = void 0),
            t.target || (t.target = i),
            (e = null == e ? [t] : D.makeArray(e, [t])),
            (c = D.event.special[p] || {}),
            n || !c.trigger || !1 !== c.trigger.apply(i, e)))
      ) {
        if (!n && !c.noBubble && !g(i)) {
          for (
            a = c.delegateType || p, Ie.test(a + p) || (o = o.parentNode);
            o;
            o = o.parentNode
          )
            d.push(o), (r = o);
          r === (i.ownerDocument || k) &&
            d.push(r.defaultView || r.parentWindow || C);
        }
        for (s = 0; (o = d[s++]) && !t.isPropagationStopped();)
          (u = o),
            (t.type = 1 < s ? a : c.bindType || p),
            (h = (Q.get(o, "events") || {})[t.type] && Q.get(o, "handle")) &&
            h.apply(o, e),
            (h = l && o[l]) &&
            h.apply &&
            K(o) &&
            ((t.result = h.apply(o, e)),
              !1 === t.result && t.preventDefault());
        return (
          (t.type = p),
          n ||
          t.isDefaultPrevented() ||
          (c._default && !1 !== c._default.apply(d.pop(), e)) ||
          !K(i) ||
          (l &&
            y(i[p]) &&
            !g(i) &&
            ((r = i[l]) && (i[l] = null),
              (D.event.triggered = p),
              t.isPropagationStopped() && u.addEventListener(p, Te),
              i[p](),
              t.isPropagationStopped() && u.removeEventListener(p, Te),
              (D.event.triggered = void 0),
              r && (i[l] = r))),
          t.result
        );
      }
    },
    simulate: function (t, e, i) {
      var n = D.extend(new D.Event(), i, { type: t, isSimulated: !0 });
      D.event.trigger(n, null, e);
    },
  }),
    D.fn.extend({
      trigger: function (t, e) {
        return this.each(function () {
          D.event.trigger(t, e, this);
        });
      },
      triggerHandler: function (t, e) {
        var i = this[0];
        if (i) return D.event.trigger(t, e, i, !0);
      },
    }),
    _.focusin ||
    D.each({ focus: "focusin", blur: "focusout" }, function (i, n) {
      function s(t) {
        D.event.simulate(n, t.target, D.event.fix(t));
      }
      D.event.special[n] = {
        setup: function () {
          var t = this.ownerDocument || this,
            e = Q.access(t, n);
          e || t.addEventListener(i, s, !0), Q.access(t, n, (e || 0) + 1);
        },
        teardown: function () {
          var t = this.ownerDocument || this,
            e = Q.access(t, n) - 1;
          e
            ? Q.access(t, n, e)
            : (t.removeEventListener(i, s, !0), Q.remove(t, n));
        },
      };
    });
  var Se = C.location,
    Ee = Date.now(),
    Ae = /\?/;
  D.parseXML = function (t) {
    var e;
    if (!t || "string" != typeof t) return null;
    try {
      e = new C.DOMParser().parseFromString(t, "text/xml");
    } catch (t) {
      e = void 0;
    }
    return (
      (e && !e.getElementsByTagName("parsererror").length) ||
      D.error("Invalid XML: " + t),
      e
    );
  };
  var Pe = /\[\]$/,
    je = /\r?\n/g,
    Oe = /^(?:submit|button|image|reset|file)$/i,
    Ne = /^(?:input|select|textarea|keygen)/i;
  function Me(i, t, n, s) {
    var e;
    if (Array.isArray(t))
      D.each(t, function (t, e) {
        n || Pe.test(i)
          ? s(i, e)
          : Me(
            i + "[" + ("object" == typeof e && null != e ? t : "") + "]",
            e,
            n,
            s
          );
      });
    else if (n || "object" !== w(t)) s(i, t);
    else for (e in t) Me(i + "[" + e + "]", t[e], n, s);
  }
  (D.param = function (t, e) {
    function i(t, e) {
      var i = y(e) ? e() : e;
      s[s.length] =
        encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i);
    }
    var n,
      s = [];
    if (Array.isArray(t) || (t.jquery && !D.isPlainObject(t)))
      D.each(t, function () {
        i(this.name, this.value);
      });
    else for (n in t) Me(n, t[n], e, i);
    return s.join("&");
  }),
    D.fn.extend({
      serialize: function () {
        return D.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var t = D.prop(this, "elements");
          return t ? D.makeArray(t) : this;
        })
          .filter(function () {
            var t = this.type;
            return (
              this.name &&
              !D(this).is(":disabled") &&
              Ne.test(this.nodeName) &&
              !Oe.test(t) &&
              (this.checked || !lt.test(t))
            );
          })
          .map(function (t, e) {
            var i = D(this).val();
            return null == i
              ? null
              : Array.isArray(i)
                ? D.map(i, function (t) {
                  return { name: e.name, value: t.replace(je, "\r\n") };
                })
                : { name: e.name, value: i.replace(je, "\r\n") };
          })
          .get();
      },
    });
  var He = /%20/g,
    ze = /#.*$/,
    We = /([?&])_=[^&]*/,
    Le = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Re = /^(?:GET|HEAD)$/,
    Fe = /^\/\//,
    qe = {},
    Be = {},
    $e = "*/".concat("*"),
    Ue = k.createElement("a");
  function Ye(o) {
    return function (t, e) {
      "string" != typeof t && ((e = t), (t = "*"));
      var i,
        n = 0,
        s = t.toLowerCase().match(M) || [];
      if (y(e))
        for (; (i = s[n++]);)
          "+" === i[0]
            ? ((i = i.slice(1) || "*"), (o[i] = o[i] || []).unshift(e))
            : (o[i] = o[i] || []).push(e);
    };
  }
  function Ke(e, s, o, r) {
    var a = {},
      l = e === Be;
    function h(t) {
      var n;
      return (
        (a[t] = !0),
        D.each(e[t] || [], function (t, e) {
          var i = e(s, o, r);
          return "string" != typeof i || l || a[i]
            ? l
              ? !(n = i)
              : void 0
            : (s.dataTypes.unshift(i), h(i), !1);
        }),
        n
      );
    }
    return h(s.dataTypes[0]) || (!a["*"] && h("*"));
  }
  function Ve(t, e) {
    var i,
      n,
      s = D.ajaxSettings.flatOptions || {};
    for (i in e) void 0 !== e[i] && ((s[i] ? t : (n = n || {}))[i] = e[i]);
    return n && D.extend(!0, t, n), t;
  }
  (Ue.href = Se.href),
    D.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Se.href,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            Se.protocol
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": $e,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": D.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (t, e) {
        return e ? Ve(Ve(t, D.ajaxSettings), e) : Ve(D.ajaxSettings, t);
      },
      ajaxPrefilter: Ye(qe),
      ajaxTransport: Ye(Be),
      ajax: function (t, e) {
        "object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
        var c,
          u,
          d,
          i,
          p,
          n,
          f,
          g,
          s,
          o,
          m = D.ajaxSetup({}, e),
          v = m.context || m,
          _ = m.context && (v.nodeType || v.jquery) ? D(v) : D.event,
          y = D.Deferred(),
          b = D.Callbacks("once memory"),
          w = m.statusCode || {},
          r = {},
          a = {},
          l = "canceled",
          x = {
            readyState: 0,
            getResponseHeader: function (t) {
              var e;
              if (f) {
                if (!i)
                  for (i = {}; (e = Le.exec(d));) i[e[1].toLowerCase()] = e[2];
                e = i[t.toLowerCase()];
              }
              return null == e ? null : e;
            },
            getAllResponseHeaders: function () {
              return f ? d : null;
            },
            setRequestHeader: function (t, e) {
              return (
                null == f &&
                ((t = a[t.toLowerCase()] = a[t.toLowerCase()] || t),
                  (r[t] = e)),
                this
              );
            },
            overrideMimeType: function (t) {
              return null == f && (m.mimeType = t), this;
            },
            statusCode: function (t) {
              var e;
              if (t)
                if (f) x.always(t[x.status]);
                else for (e in t) w[e] = [w[e], t[e]];
              return this;
            },
            abort: function (t) {
              var e = t || l;
              return c && c.abort(e), h(0, e), this;
            },
          };
        if (
          (y.promise(x),
            (m.url = ((t || m.url || Se.href) + "").replace(
              Fe,
              Se.protocol + "//"
            )),
            (m.type = e.method || e.type || m.method || m.type),
            (m.dataTypes = (m.dataType || "*").toLowerCase().match(M) || [""]),
            null == m.crossDomain)
        ) {
          n = k.createElement("a");
          try {
            (n.href = m.url),
              (n.href = n.href),
              (m.crossDomain =
                Ue.protocol + "//" + Ue.host != n.protocol + "//" + n.host);
          } catch (t) {
            m.crossDomain = !0;
          }
        }
        if (
          (m.data &&
            m.processData &&
            "string" != typeof m.data &&
            (m.data = D.param(m.data, m.traditional)),
            Ke(qe, m, e, x),
            f)
        )
          return x;
        for (s in ((g = D.event && m.global) &&
          0 == D.active++ &&
          D.event.trigger("ajaxStart"),
          (m.type = m.type.toUpperCase()),
          (m.hasContent = !Re.test(m.type)),
          (u = m.url.replace(ze, "")),
          m.hasContent
            ? m.data &&
            m.processData &&
            0 ===
            (m.contentType || "").indexOf(
              "application/x-www-form-urlencoded"
            ) &&
            (m.data = m.data.replace(He, "+"))
            : ((o = m.url.slice(u.length)),
              m.data &&
              (m.processData || "string" == typeof m.data) &&
              ((u += (Ae.test(u) ? "&" : "?") + m.data), delete m.data),
              !1 === m.cache &&
              ((u = u.replace(We, "$1")),
                (o = (Ae.test(u) ? "&" : "?") + "_=" + Ee++ + o)),
              (m.url = u + o)),
          m.ifModified &&
          (D.lastModified[u] &&
            x.setRequestHeader("If-Modified-Since", D.lastModified[u]),
            D.etag[u] && x.setRequestHeader("If-None-Match", D.etag[u])),
          ((m.data && m.hasContent && !1 !== m.contentType) || e.contentType) &&
          x.setRequestHeader("Content-Type", m.contentType),
          x.setRequestHeader(
            "Accept",
            m.dataTypes[0] && m.accepts[m.dataTypes[0]]
              ? m.accepts[m.dataTypes[0]] +
              ("*" !== m.dataTypes[0] ? ", " + $e + "; q=0.01" : "")
              : m.accepts["*"]
          ),
          m.headers))
          x.setRequestHeader(s, m.headers[s]);
        if (m.beforeSend && (!1 === m.beforeSend.call(v, x, m) || f))
          return x.abort();
        if (
          ((l = "abort"),
            b.add(m.complete),
            x.done(m.success),
            x.fail(m.error),
            (c = Ke(Be, m, e, x)))
        ) {
          if (((x.readyState = 1), g && _.trigger("ajaxSend", [x, m]), f))
            return x;
          m.async &&
            0 < m.timeout &&
            (p = C.setTimeout(function () {
              x.abort("timeout");
            }, m.timeout));
          try {
            (f = !1), c.send(r, h);
          } catch (t) {
            if (f) throw t;
            h(-1, t);
          }
        } else h(-1, "No Transport");
        function h(t, e, i, n) {
          var s,
            o,
            r,
            a,
            l,
            h = e;
          f ||
            ((f = !0),
              p && C.clearTimeout(p),
              (c = void 0),
              (d = n || ""),
              (x.readyState = 0 < t ? 4 : 0),
              (s = (200 <= t && t < 300) || 304 === t),
              i &&
              (a = (function (t, e, i) {
                for (
                  var n, s, o, r, a = t.contents, l = t.dataTypes;
                  "*" === l[0];

                )
                  l.shift(),
                    void 0 === n &&
                    (n = t.mimeType || e.getResponseHeader("Content-Type"));
                if (n)
                  for (s in a)
                    if (a[s] && a[s].test(n)) {
                      l.unshift(s);
                      break;
                    }
                if (l[0] in i) o = l[0];
                else {
                  for (s in i) {
                    if (!l[0] || t.converters[s + " " + l[0]]) {
                      o = s;
                      break;
                    }
                    r = r || s;
                  }
                  o = o || r;
                }
                if (o) return o !== l[0] && l.unshift(o), i[o];
              })(m, x, i)),
              (a = (function (t, e, i, n) {
                var s,
                  o,
                  r,
                  a,
                  l,
                  h = {},
                  c = t.dataTypes.slice();
                if (c[1])
                  for (r in t.converters) h[r.toLowerCase()] = t.converters[r];
                for (o = c.shift(); o;)
                  if (
                    (t.responseFields[o] && (i[t.responseFields[o]] = e),
                      !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
                      (l = o),
                      (o = c.shift()))
                  )
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                      if (!(r = h[l + " " + o] || h["* " + o]))
                        for (s in h)
                          if (
                            (a = s.split(" "))[1] === o &&
                            (r = h[l + " " + a[0]] || h["* " + a[0]])
                          ) {
                            !0 === r
                              ? (r = h[s])
                              : !0 !== h[s] && ((o = a[0]), c.unshift(a[1]));
                            break;
                          }
                      if (!0 !== r)
                        if (r && t.throws) e = r(e);
                        else
                          try {
                            e = r(e);
                          } catch (t) {
                            return {
                              state: "parsererror",
                              error: r
                                ? t
                                : "No conversion from " + l + " to " + o,
                            };
                          }
                    }
                return { state: "success", data: e };
              })(m, a, x, s)),
              s
                ? (m.ifModified &&
                  ((l = x.getResponseHeader("Last-Modified")) &&
                    (D.lastModified[u] = l),
                    (l = x.getResponseHeader("etag")) && (D.etag[u] = l)),
                  204 === t || "HEAD" === m.type
                    ? (h = "nocontent")
                    : 304 === t
                      ? (h = "notmodified")
                      : ((h = a.state), (o = a.data), (s = !(r = a.error))))
                : ((r = h), (!t && h) || ((h = "error"), t < 0 && (t = 0))),
              (x.status = t),
              (x.statusText = (e || h) + ""),
              s ? y.resolveWith(v, [o, h, x]) : y.rejectWith(v, [x, h, r]),
              x.statusCode(w),
              (w = void 0),
              g && _.trigger(s ? "ajaxSuccess" : "ajaxError", [x, m, s ? o : r]),
              b.fireWith(v, [x, h]),
              g &&
              (_.trigger("ajaxComplete", [x, m]),
                --D.active || D.event.trigger("ajaxStop")));
        }
        return x;
      },
      getJSON: function (t, e, i) {
        return D.get(t, e, i, "json");
      },
      getScript: function (t, e) {
        return D.get(t, void 0, e, "script");
      },
    }),
    D.each(["get", "post"], function (t, s) {
      D[s] = function (t, e, i, n) {
        return (
          y(e) && ((n = n || i), (i = e), (e = void 0)),
          D.ajax(
            D.extend(
              { url: t, type: s, dataType: n, data: e, success: i },
              D.isPlainObject(t) && t
            )
          )
        );
      };
    }),
    (D._evalUrl = function (t) {
      return D.ajax({
        url: t,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        throws: !0,
      });
    }),
    D.fn.extend({
      wrapAll: function (t) {
        var e;
        return (
          this[0] &&
          (y(t) && (t = t.call(this[0])),
            (e = D(t, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && e.insertBefore(this[0]),
            e
              .map(function () {
                for (var t = this; t.firstElementChild;)
                  t = t.firstElementChild;
                return t;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (i) {
        return y(i)
          ? this.each(function (t) {
            D(this).wrapInner(i.call(this, t));
          })
          : this.each(function () {
            var t = D(this),
              e = t.contents();
            e.length ? e.wrapAll(i) : t.append(i);
          });
      },
      wrap: function (e) {
        var i = y(e);
        return this.each(function (t) {
          D(this).wrapAll(i ? e.call(this, t) : e);
        });
      },
      unwrap: function (t) {
        return (
          this.parent(t)
            .not("body")
            .each(function () {
              D(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (D.expr.pseudos.hidden = function (t) {
      return !D.expr.pseudos.visible(t);
    }),
    (D.expr.pseudos.visible = function (t) {
      return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
    }),
    (D.ajaxSettings.xhr = function () {
      try {
        return new C.XMLHttpRequest();
      } catch (t) { }
    });
  var Qe = { 0: 200, 1223: 204 },
    Xe = D.ajaxSettings.xhr();
  (_.cors = !!Xe && "withCredentials" in Xe),
    (_.ajax = Xe = !!Xe),
    D.ajaxTransport(function (s) {
      var o, r;
      if (_.cors || (Xe && !s.crossDomain))
        return {
          send: function (t, e) {
            var i,
              n = s.xhr();
            if (
              (n.open(s.type, s.url, s.async, s.username, s.password),
                s.xhrFields)
            )
              for (i in s.xhrFields) n[i] = s.xhrFields[i];
            for (i in (s.mimeType &&
              n.overrideMimeType &&
              n.overrideMimeType(s.mimeType),
              s.crossDomain ||
              t["X-Requested-With"] ||
              (t["X-Requested-With"] = "XMLHttpRequest"),
              t))
              n.setRequestHeader(i, t[i]);
            (o = function (t) {
              return function () {
                o &&
                  ((o =
                    r =
                    n.onload =
                    n.onerror =
                    n.onabort =
                    n.ontimeout =
                    n.onreadystatechange =
                    null),
                    "abort" === t
                      ? n.abort()
                      : "error" === t
                        ? "number" != typeof n.status
                          ? e(0, "error")
                          : e(n.status, n.statusText)
                        : e(
                          Qe[n.status] || n.status,
                          n.statusText,
                          "text" !== (n.responseType || "text") ||
                            "string" != typeof n.responseText
                            ? { binary: n.response }
                            : { text: n.responseText },
                          n.getAllResponseHeaders()
                        ));
              };
            }),
              (n.onload = o()),
              (r = n.onerror = n.ontimeout = o("error")),
              void 0 !== n.onabort
                ? (n.onabort = r)
                : (n.onreadystatechange = function () {
                  4 === n.readyState &&
                    C.setTimeout(function () {
                      o && r();
                    });
                }),
              (o = o("abort"));
            try {
              n.send((s.hasContent && s.data) || null);
            } catch (t) {
              if (o) throw t;
            }
          },
          abort: function () {
            o && o();
          },
        };
    }),
    D.ajaxPrefilter(function (t) {
      t.crossDomain && (t.contents.script = !1);
    }),
    D.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (t) {
          return D.globalEval(t), t;
        },
      },
    }),
    D.ajaxPrefilter("script", function (t) {
      void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
    }),
    D.ajaxTransport("script", function (i) {
      var n, s;
      if (i.crossDomain)
        return {
          send: function (t, e) {
            (n = D("<script>")
              .prop({ charset: i.scriptCharset, src: i.url })
              .on(
                "load error",
                (s = function (t) {
                  n.remove(),
                    (s = null),
                    t && e("error" === t.type ? 404 : 200, t.type);
                })
              )),
              k.head.appendChild(n[0]);
          },
          abort: function () {
            s && s();
          },
        };
    });
  var Ge,
    Je = [],
    Ze = /(=)\?(?=&|$)|\?\?/;
  D.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var t = Je.pop() || D.expando + "_" + Ee++;
      return (this[t] = !0), t;
    },
  }),
    D.ajaxPrefilter("json jsonp", function (t, e, i) {
      var n,
        s,
        o,
        r =
          !1 !== t.jsonp &&
          (Ze.test(t.url)
            ? "url"
            : "string" == typeof t.data &&
            0 ===
            (t.contentType || "").indexOf(
              "application/x-www-form-urlencoded"
            ) &&
            Ze.test(t.data) &&
            "data");
      if (r || "jsonp" === t.dataTypes[0])
        return (
          (n = t.jsonpCallback =
            y(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
          r
            ? (t[r] = t[r].replace(Ze, "$1" + n))
            : !1 !== t.jsonp &&
            (t.url += (Ae.test(t.url) ? "&" : "?") + t.jsonp + "=" + n),
          (t.converters["script json"] = function () {
            return o || D.error(n + " was not called"), o[0];
          }),
          (t.dataTypes[0] = "json"),
          (s = C[n]),
          (C[n] = function () {
            o = arguments;
          }),
          i.always(function () {
            void 0 === s ? D(C).removeProp(n) : (C[n] = s),
              t[n] && ((t.jsonpCallback = e.jsonpCallback), Je.push(n)),
              o && y(s) && s(o[0]),
              (o = s = void 0);
          }),
          "script"
        );
    }),
    (_.createHTMLDocument =
      (((Ge = k.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
        2 === Ge.childNodes.length)),
    (D.parseHTML = function (t, e, i) {
      return "string" != typeof t
        ? []
        : ("boolean" == typeof e && ((i = e), (e = !1)),
          e ||
          (_.createHTMLDocument
            ? (((n = (e =
              k.implementation.createHTMLDocument("")).createElement(
                "base"
              )).href = k.location.href),
              e.head.appendChild(n))
            : (e = k)),
          (o = !i && []),
          (s = S.exec(t))
            ? [e.createElement(s[1])]
            : ((s = vt([t], e, o)),
              o && o.length && D(o).remove(),
              D.merge([], s.childNodes)));
      var n, s, o;
    }),
    (D.fn.load = function (t, e, i) {
      var n,
        s,
        o,
        r = this,
        a = t.indexOf(" ");
      return (
        -1 < a && ((n = xe(t.slice(a))), (t = t.slice(0, a))),
        y(e)
          ? ((i = e), (e = void 0))
          : e && "object" == typeof e && (s = "POST"),
        0 < r.length &&
        D.ajax({ url: t, type: s || "GET", dataType: "html", data: e })
          .done(function (t) {
            (o = arguments),
              r.html(n ? D("<div>").append(D.parseHTML(t)).find(n) : t);
          })
          .always(
            i &&
            function (t, e) {
              r.each(function () {
                i.apply(this, o || [t.responseText, e, t]);
              });
            }
          ),
        this
      );
    }),
    D.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (t, e) {
        D.fn[e] = function (t) {
          return this.on(e, t);
        };
      }
    ),
    (D.expr.pseudos.animated = function (e) {
      return D.grep(D.timers, function (t) {
        return e === t.elem;
      }).length;
    }),
    (D.offset = {
      setOffset: function (t, e, i) {
        var n,
          s,
          o,
          r,
          a,
          l,
          h = D.css(t, "position"),
          c = D(t),
          u = {};
        "static" === h && (t.style.position = "relative"),
          (a = c.offset()),
          (o = D.css(t, "top")),
          (l = D.css(t, "left")),
          (s =
            ("absolute" === h || "fixed" === h) && -1 < (o + l).indexOf("auto")
              ? ((r = (n = c.position()).top), n.left)
              : ((r = parseFloat(o) || 0), parseFloat(l) || 0)),
          y(e) && (e = e.call(t, i, D.extend({}, a))),
          null != e.top && (u.top = e.top - a.top + r),
          null != e.left && (u.left = e.left - a.left + s),
          "using" in e ? e.using.call(t, u) : c.css(u);
      },
    }),
    D.fn.extend({
      offset: function (e) {
        if (arguments.length)
          return void 0 === e
            ? this
            : this.each(function (t) {
              D.offset.setOffset(this, e, t);
            });
        var t,
          i,
          n = this[0];
        return n
          ? n.getClientRects().length
            ? ((t = n.getBoundingClientRect()),
              (i = n.ownerDocument.defaultView),
              { top: t.top + i.pageYOffset, left: t.left + i.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var t,
            e,
            i,
            n = this[0],
            s = { top: 0, left: 0 };
          if ("fixed" === D.css(n, "position")) e = n.getBoundingClientRect();
          else {
            for (
              e = this.offset(),
              i = n.ownerDocument,
              t = n.offsetParent || i.documentElement;
              t &&
              (t === i.body || t === i.documentElement) &&
              "static" === D.css(t, "position");

            )
              t = t.parentNode;
            t &&
              t !== n &&
              1 === t.nodeType &&
              (((s = D(t).offset()).top += D.css(t, "borderTopWidth", !0)),
                (s.left += D.css(t, "borderLeftWidth", !0)));
          }
          return {
            top: e.top - s.top - D.css(n, "marginTop", !0),
            left: e.left - s.left - D.css(n, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var t = this.offsetParent;
            t && "static" === D.css(t, "position");

          )
            t = t.offsetParent;
          return t || _t;
        });
      },
    }),
    D.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (e, s) {
        var o = "pageYOffset" === s;
        D.fn[e] = function (t) {
          return q(
            this,
            function (t, e, i) {
              var n;
              if (
                (g(t) ? (n = t) : 9 === t.nodeType && (n = t.defaultView),
                  void 0 === i)
              )
                return n ? n[s] : t[e];
              n
                ? n.scrollTo(o ? n.pageXOffset : i, o ? i : n.pageYOffset)
                : (t[e] = i);
            },
            e,
            t,
            arguments.length
          );
        };
      }
    ),
    D.each(["top", "left"], function (t, i) {
      D.cssHooks[i] = Qt(_.pixelPosition, function (t, e) {
        if (e)
          return (e = Vt(t, i)), Bt.test(e) ? D(t).position()[i] + "px" : e;
      });
    }),
    D.each({ Height: "height", Width: "width" }, function (r, a) {
      D.each(
        { padding: "inner" + r, content: a, "": "outer" + r },
        function (n, o) {
          D.fn[o] = function (t, e) {
            var i = arguments.length && (n || "boolean" != typeof t),
              s = n || (!0 === t || !0 === e ? "margin" : "border");
            return q(
              this,
              function (t, e, i) {
                var n;
                return g(t)
                  ? 0 === o.indexOf("outer")
                    ? t["inner" + r]
                    : t.document.documentElement["client" + r]
                  : 9 === t.nodeType
                    ? ((n = t.documentElement),
                      Math.max(
                        t.body["scroll" + r],
                        n["scroll" + r],
                        t.body["offset" + r],
                        n["offset" + r],
                        n["client" + r]
                      ))
                    : void 0 === i
                      ? D.css(t, e, s)
                      : D.style(t, e, i, s);
              },
              a,
              i ? t : void 0,
              i
            );
          };
        }
      );
    }),
    D.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (t, i) {
        D.fn[i] = function (t, e) {
          return 0 < arguments.length
            ? this.on(i, null, t, e)
            : this.trigger(i);
        };
      }
    ),
    D.fn.extend({
      hover: function (t, e) {
        return this.mouseenter(t).mouseleave(e || t);
      },
    }),
    D.fn.extend({
      bind: function (t, e, i) {
        return this.on(t, null, e, i);
      },
      unbind: function (t, e) {
        return this.off(t, null, e);
      },
      delegate: function (t, e, i, n) {
        return this.on(e, t, i, n);
      },
      undelegate: function (t, e, i) {
        return 1 === arguments.length
          ? this.off(t, "**")
          : this.off(e, t || "**", i);
      },
    }),
    (D.proxy = function (t, e) {
      var i, n, s;
      if (("string" == typeof e && ((i = t[e]), (e = t), (t = i)), y(t)))
        return (
          (n = a.call(arguments, 2)),
          ((s = function () {
            return t.apply(e || this, n.concat(a.call(arguments)));
          }).guid = t.guid =
            t.guid || D.guid++),
          s
        );
    }),
    (D.holdReady = function (t) {
      t ? D.readyWait++ : D.ready(!0);
    }),
    (D.isArray = Array.isArray),
    (D.parseJSON = JSON.parse),
    (D.nodeName = I),
    (D.isFunction = y),
    (D.isWindow = g),
    (D.camelCase = Y),
    (D.type = w),
    (D.now = Date.now),
    (D.isNumeric = function (t) {
      var e = D.type(t);
      return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
    }),
    "function" == typeof define &&
    define.amd &&
    define("jquery", [], function () {
      return D;
    });
  var ti = C.jQuery,
    ei = C.$;
  return (
    (D.noConflict = function (t) {
      return C.$ === D && (C.$ = ei), t && C.jQuery === D && (C.jQuery = ti), D;
    }),
    t || (C.jQuery = C.$ = D),
    D
  );
}),
  (function (a, i) {
    "use strict";
    var t;
    (a.migrateVersion = "3.0.0"),
      (t =
        i.console &&
        i.console.log &&
        function () {
          i.console.log.apply(i.console, arguments);
        }) &&
      ((a && !/^[12]\./.test(a.fn.jquery)) ||
        t("JQMIGRATE: jQuery 3.0.0+ REQUIRED"),
        a.migrateWarnings &&
        t("JQMIGRATE: Migrate plugin loaded multiple times"),
        t(
          "JQMIGRATE: Migrate is installed" +
          (a.migrateMute ? "" : " with logging active") +
          ", version " +
          a.migrateVersion
        ));
    var n = {};
    function l(t) {
      var e = i.console;
      n[t] ||
        ((n[t] = !0),
          a.migrateWarnings.push(t),
          e &&
          e.warn &&
          !a.migrateMute &&
          (e.warn("JQMIGRATE: " + t), a.migrateTrace && e.trace && e.trace()));
    }
    function e(t, e, i, n) {
      Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return l(n), i;
        },
      });
    }
    (a.migrateWarnings = []),
      void 0 === a.migrateTrace && (a.migrateTrace = !0),
      (a.migrateReset = function () {
        (n = {}), (a.migrateWarnings.length = 0);
      }),
      "BackCompat" === document.compatMode &&
      l("jQuery is not compatible with Quirks Mode");
    var s,
      o = a.fn.init,
      r = a.isNumeric,
      h = a.find,
      c = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
      u = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g;
    for (s in ((a.fn.init = function (t) {
      var e = Array.prototype.slice.call(arguments);
      return (
        "string" == typeof t &&
        "#" === t &&
        (l("jQuery( '#' ) is not a valid selector"), (e[0] = [])),
        o.apply(this, e)
      );
    }),
      (a.fn.init.prototype = a.fn),
      (a.find = function (e) {
        var i = Array.prototype.slice.call(arguments);
        if ("string" == typeof e && c.test(e))
          try {
            document.querySelector(e);
          } catch (t) {
            e = e.replace(u, function (t, e, i, n) {
              return "[" + e + i + '"' + n + '"]';
            });
            try {
              document.querySelector(e),
                l("Attribute selector with '#' must be quoted: " + i[0]),
                (i[0] = e);
            } catch (t) {
              l("Attribute selector with '#' was not fixed: " + i[0]);
            }
          }
        return h.apply(this, i);
      }),
      h))
      Object.prototype.hasOwnProperty.call(h, s) && (a.find[s] = h[s]);
    (a.fn.size = function () {
      return (
        l("jQuery.fn.size() is deprecated; use the .length property"),
        this.length
      );
    }),
      (a.parseJSON = function () {
        return (
          l("jQuery.parseJSON is deprecated; use JSON.parse"),
          JSON.parse.apply(null, arguments)
        );
      }),
      (a.isNumeric = function (t) {
        var e,
          i,
          n = r(t),
          s =
            ((i = (e = t) && e.toString()),
              !a.isArray(e) && 0 <= i - parseFloat(i) + 1);
        return (
          n !== s &&
          l("jQuery.isNumeric() should not be called on constructed objects"),
          s
        );
      }),
      e(
        a,
        "unique",
        a.uniqueSort,
        "jQuery.unique is deprecated, use jQuery.uniqueSort"
      ),
      e(
        a.expr,
        "filters",
        a.expr.pseudos,
        "jQuery.expr.filters is now jQuery.expr.pseudos"
      ),
      e(
        a.expr,
        ":",
        a.expr.pseudos,
        'jQuery.expr[":"] is now jQuery.expr.pseudos'
      );
    var d = a.ajax;
    a.ajax = function () {
      var t = d.apply(this, arguments);
      return (
        t.promise &&
        (e(t, "success", t.done, "jQXHR.success is deprecated and removed"),
          e(t, "error", t.fail, "jQXHR.error is deprecated and removed"),
          e(
            t,
            "complete",
            t.always,
            "jQXHR.complete is deprecated and removed"
          )),
        t
      );
    };
    var p = a.fn.removeAttr,
      f = a.fn.toggleClass,
      g = /\S+/g;
    a.fn.removeAttr = function (t) {
      var i = this;
      return (
        a.each(t.match(g), function (t, e) {
          a.expr.match.bool.test(e) &&
            (l("jQuery.fn.removeAttr no longer sets boolean properties: " + e),
              i.prop(e, !1));
        }),
        p.apply(this, arguments)
      );
    };
    var m = !(a.fn.toggleClass = function (e) {
      return void 0 !== e && "boolean" != typeof e
        ? f.apply(this, arguments)
        : (l("jQuery.fn.toggleClass( boolean ) is deprecated"),
          this.each(function () {
            var t = (this.getAttribute && this.getAttribute("class")) || "";
            t && a.data(this, "__className__", t),
              this.setAttribute &&
              this.setAttribute(
                "class",
                t || !1 === e ? "" : a.data(this, "__className__") || ""
              );
          }));
    });
    a.swap &&
      a.each(["height", "width", "reliableMarginRight"], function (t, e) {
        var i = a.cssHooks[e] && a.cssHooks[e].get;
        i &&
          (a.cssHooks[e].get = function () {
            var t;
            return (m = !0), (t = i.apply(this, arguments)), (m = !1), t;
          });
      }),
      (a.swap = function (t, e, i, n) {
        var s,
          o,
          r = {};
        for (o in (m || l("jQuery.swap() is undocumented and deprecated"), e))
          (r[o] = t.style[o]), (t.style[o] = e[o]);
        for (o in ((s = i.apply(t, n || [])), e)) t.style[o] = r[o];
        return s;
      });
    var v = a.data;
    a.data = function (t, e, i) {
      var n;
      return e &&
        e !== a.camelCase(e) &&
        (n = a.hasData(t) && v.call(this, t)) &&
        e in n
        ? (l("jQuery.data() always sets/gets camelCased names: " + e),
          2 < arguments.length && (n[e] = i),
          n[e])
        : v.apply(this, arguments);
    };
    var _ = a.Tween.prototype.run;
    a.Tween.prototype.run = function (t) {
      1 < a.easing[this.easing].length &&
        (l(
          'easing function "jQuery.easing.' +
          this.easing.toString() +
          '" should use only first argument'
        ),
          (a.easing[this.easing] = a.easing[this.easing].bind(
            a.easing,
            t,
            this.options.duration * t,
            0,
            1,
            this.options.duration
          ))),
        _.apply(this, arguments);
    };
    var y = a.fn.load,
      b = a.event.fix;
    (a.event.props = []),
      (a.event.fixHooks = {}),
      (a.event.fix = function (t) {
        var e,
          i = t.type,
          n = this.fixHooks[i],
          s = a.event.props;
        if (s.length)
          for (
            l("jQuery.event.props are deprecated and removed: " + s.join());
            s.length;

          )
            a.event.addProp(s.pop());
        if (
          n &&
          !n._migrated_ &&
          ((n._migrated_ = !0),
            l("jQuery.event.fixHooks are deprecated and removed: " + i),
            (s = n.props) && s.length)
        )
          for (; s.length;) a.event.addProp(s.pop());
        return (e = b.call(this, t)), n && n.filter ? n.filter(e, t) : e;
      }),
      a.each(["load", "unload", "error"], function (t, e) {
        a.fn[e] = function () {
          var t = Array.prototype.slice.call(arguments, 0);
          return "load" === e && "string" == typeof t[0]
            ? y.apply(this, t)
            : (l("jQuery.fn." + e + "() is deprecated"),
              t.splice(0, 0, e),
              arguments.length
                ? this.on.apply(this, t)
                : (this.triggerHandler.apply(this, t), this));
        };
      }),
      a(function () {
        a(document).triggerHandler("ready");
      }),
      (a.event.special.ready = {
        setup: function () {
          this === document && l("'ready' event is deprecated");
        },
      }),
      a.fn.extend({
        bind: function (t, e, i) {
          return l("jQuery.fn.bind() is deprecated"), this.on(t, null, e, i);
        },
        unbind: function (t, e) {
          return l("jQuery.fn.unbind() is deprecated"), this.off(t, null, e);
        },
        delegate: function (t, e, i, n) {
          return l("jQuery.fn.delegate() is deprecated"), this.on(e, t, i, n);
        },
        undelegate: function (t, e, i) {
          return (
            l("jQuery.fn.undelegate() is deprecated"),
            1 === arguments.length
              ? this.off(t, "**")
              : this.off(e, t || "**", i)
          );
        },
      });
    var w = a.fn.offset;
    a.fn.offset = function () {
      var t,
        e = this[0],
        i = { top: 0, left: 0 };
      return e && e.nodeType
        ? ((t = (e.ownerDocument || document).documentElement),
          a.contains(t, e)
            ? w.apply(this, arguments)
            : (l(
              "jQuery.fn.offset() requires an element connected to a document"
            ),
              i))
        : (l("jQuery.fn.offset() requires a valid DOM element"), i);
    };
    var x = a.param;
    a.param = function (t, e) {
      var i = a.ajaxSettings && a.ajaxSettings.traditional;
      return (
        void 0 === e &&
        i &&
        (l("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"),
          (e = i)),
        x.call(this, t, e)
      );
    };
    var C = a.fn.andSelf || a.fn.addBack;
    a.fn.andSelf = function () {
      return (
        l("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),
        C.apply(this, arguments)
      );
    };
    var k = a.Deferred,
      D = [
        [
          "resolve",
          "done",
          a.Callbacks("once memory"),
          a.Callbacks("once memory"),
          "resolved",
        ],
        [
          "reject",
          "fail",
          a.Callbacks("once memory"),
          a.Callbacks("once memory"),
          "rejected",
        ],
        ["notify", "progress", a.Callbacks("memory"), a.Callbacks("memory")],
      ];
    a.Deferred = function (t) {
      var o = k(),
        r = o.promise();
      return (
        (o.pipe = r.pipe =
          function () {
            var s = arguments;
            return (
              l("deferred.pipe() is deprecated"),
              a
                .Deferred(function (n) {
                  a.each(D, function (t, e) {
                    var i = a.isFunction(s[t]) && s[t];
                    o[e[1]](function () {
                      var t = i && i.apply(this, arguments);
                      t && a.isFunction(t.promise)
                        ? t
                          .promise()
                          .done(n.resolve)
                          .fail(n.reject)
                          .progress(n.notify)
                        : n[e[0] + "With"](
                          this === r ? n.promise() : this,
                          i ? [t] : arguments
                        );
                    });
                  }),
                    (s = null);
                })
                .promise()
            );
          }),
        t && t.call(o, o),
        o
      );
    };
  })(jQuery, window),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : t(jQuery);
  })(function (C) {
    function t() {
      (this._curInst = null),
        (this._keyEvent = !1),
        (this._disabledInputs = []),
        (this._datepickerShowing = !1),
        (this._inDialog = !1),
        (this._mainDivId = "ui-datepicker-div"),
        (this._inlineClass = "ui-datepicker-inline"),
        (this._appendClass = "ui-datepicker-append"),
        (this._triggerClass = "ui-datepicker-trigger"),
        (this._dialogClass = "ui-datepicker-dialog"),
        (this._disableClass = "ui-datepicker-disabled"),
        (this._unselectableClass = "ui-datepicker-unselectable"),
        (this._currentClass = "ui-datepicker-current-day"),
        (this._dayOverClass = "ui-datepicker-days-cell-over"),
        (this.regional = []),
        (this.regional[""] = {
          closeText: "Done",
          prevText: "Prev",
          nextText: "Next",
          currentText: "Today",
          monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          monthNamesShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          dayNames: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          weekHeader: "Wk",
          dateFormat: "mm/dd/yy",
          firstDay: 0,
          isRTL: !1,
          showMonthAfterYear: !1,
          yearSuffix: "",
        }),
        (this._defaults = {
          showOn: "focus",
          showAnim: "fadeIn",
          showOptions: {},
          defaultDate: null,
          appendText: "",
          buttonText: "...",
          buttonImage: "",
          buttonImageOnly: !1,
          hideIfNoPrevNext: !1,
          navigationAsDateFormat: !1,
          gotoCurrent: !1,
          changeMonth: !1,
          changeYear: !1,
          yearRange: "c-10:c+10",
          showOtherMonths: !1,
          selectOtherMonths: !1,
          showWeek: !1,
          calculateWeek: this.iso8601Week,
          shortYearCutoff: "+10",
          minDate: null,
          maxDate: null,
          duration: "fast",
          beforeShowDay: null,
          beforeShow: null,
          onSelect: null,
          onChangeMonthYear: null,
          onClose: null,
          numberOfMonths: 1,
          showCurrentAtPos: 0,
          stepMonths: 1,
          stepBigMonths: 12,
          altField: "",
          altFormat: "",
          constrainInput: !0,
          showButtonPanel: !1,
          autoSize: !1,
          disabled: !1,
        }),
        C.extend(this._defaults, this.regional[""]),
        (this.regional.en = C.extend(!0, {}, this.regional[""])),
        (this.regional["en-US"] = C.extend(!0, {}, this.regional.en)),
        (this.dpDiv = i(
          C(
            "<div id='" +
            this._mainDivId +
            "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
          )
        ));
    }
    function i(t) {
      var e =
        "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
      return t
        .on("mouseout", e, function () {
          C(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") &&
            C(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") &&
            C(this).removeClass("ui-datepicker-next-hover");
        })
        .on("mouseover", e, o);
    }
    function o() {
      C.datepicker._isDisabledDatepicker(
        b.inline ? b.dpDiv.parent()[0] : b.input[0]
      ) ||
        (C(this)
          .parents(".ui-datepicker-calendar")
          .find("a")
          .removeClass("ui-state-hover"),
          C(this).addClass("ui-state-hover"),
          -1 !== this.className.indexOf("ui-datepicker-prev") &&
          C(this).addClass("ui-datepicker-prev-hover"),
          -1 !== this.className.indexOf("ui-datepicker-next") &&
          C(this).addClass("ui-datepicker-next-hover"));
    }
    function u(t, e) {
      for (var i in (C.extend(t, e), e)) null == e[i] && (t[i] = e[i]);
      return t;
    }
    function e(e) {
      return function () {
        var t = this.element.val();
        e.apply(this, arguments),
          this._refresh(),
          t !== this.element.val() && this._trigger("change");
      };
    }
    (C.ui = C.ui || {}), (C.ui.version = "1.12.1");
    var n,
      s,
      r,
      a,
      x,
      k,
      l,
      h,
      c,
      D,
      d,
      T,
      p,
      f = 0,
      g = Array.prototype.slice;
    function I(t, e, i) {
      return [
        parseFloat(t[0]) * (d.test(t[0]) ? e / 100 : 1),
        parseFloat(t[1]) * (d.test(t[1]) ? i / 100 : 1),
      ];
    }
    function S(t, e) {
      return parseInt(C.css(t, e), 10) || 0;
    }
    (C.cleanData =
      ((p = C.cleanData),
        function (t) {
          var e, i, n;
          for (n = 0; null != (i = t[n]); n++)
            try {
              (e = C._data(i, "events")) &&
                e.remove &&
                C(i).triggerHandler("remove");
            } catch (t) { }
          p(t);
        })),
      (C.widget = function (t, i, e) {
        var n,
          s,
          o,
          r = {},
          a = t.split(".")[0],
          l = a + "-" + (t = t.split(".")[1]);
        return (
          e || ((e = i), (i = C.Widget)),
          C.isArray(e) && (e = C.extend.apply(null, [{}].concat(e))),
          (C.expr[":"][l.toLowerCase()] = function (t) {
            return !!C.data(t, l);
          }),
          (C[a] = C[a] || {}),
          (n = C[a][t]),
          (s = C[a][t] =
            function (t, e) {
              return this._createWidget
                ? void (arguments.length && this._createWidget(t, e))
                : new s(t, e);
            }),
          C.extend(s, n, {
            version: e.version,
            _proto: C.extend({}, e),
            _childConstructors: [],
          }),
          ((o = new i()).options = C.widget.extend({}, o.options)),
          C.each(e, function (e, n) {
            return C.isFunction(n)
              ? void (r[e] = function () {
                var t,
                  e = this._super,
                  i = this._superApply;
                return (
                  (this._super = s),
                  (this._superApply = o),
                  (t = n.apply(this, arguments)),
                  (this._super = e),
                  (this._superApply = i),
                  t
                );
              })
              : void (r[e] = n);
            function s() {
              return i.prototype[e].apply(this, arguments);
            }
            function o(t) {
              return i.prototype[e].apply(this, t);
            }
          }),
          (s.prototype = C.widget.extend(
            o,
            { widgetEventPrefix: (n && o.widgetEventPrefix) || t },
            r,
            { constructor: s, namespace: a, widgetName: t, widgetFullName: l }
          )),
          n
            ? (C.each(n._childConstructors, function (t, e) {
              var i = e.prototype;
              C.widget(i.namespace + "." + i.widgetName, s, e._proto);
            }),
              delete n._childConstructors)
            : i._childConstructors.push(s),
          C.widget.bridge(t, s),
          s
        );
      }),
      (C.widget.extend = function (t) {
        for (
          var e, i, n = g.call(arguments, 1), s = 0, o = n.length;
          s < o;
          s++
        )
          for (e in n[s])
            (i = n[s][e]),
              n[s].hasOwnProperty(e) &&
              void 0 !== i &&
              (t[e] = C.isPlainObject(i)
                ? C.isPlainObject(t[e])
                  ? C.widget.extend({}, t[e], i)
                  : C.widget.extend({}, i)
                : i);
        return t;
      }),
      (C.widget.bridge = function (o, e) {
        var r = e.prototype.widgetFullName || o;
        C.fn[o] = function (i) {
          var t = "string" == typeof i,
            n = g.call(arguments, 1),
            s = this;
          return (
            t
              ? this.length || "instance" !== i
                ? this.each(function () {
                  var t,
                    e = C.data(this, r);
                  return "instance" === i
                    ? ((s = e), !1)
                    : e
                      ? C.isFunction(e[i]) && "_" !== i.charAt(0)
                        ? (t = e[i].apply(e, n)) !== e && void 0 !== t
                          ? ((s = t && t.jquery ? s.pushStack(t.get()) : t), !1)
                          : void 0
                        : C.error(
                          "no such method '" +
                          i +
                          "' for " +
                          o +
                          " widget instance"
                        )
                      : C.error(
                        "cannot call methods on " +
                        o +
                        " prior to initialization; attempted to call method '" +
                        i +
                        "'"
                      );
                })
                : (s = void 0)
              : (n.length && (i = C.widget.extend.apply(null, [i].concat(n))),
                this.each(function () {
                  var t = C.data(this, r);
                  t
                    ? (t.option(i || {}), t._init && t._init())
                    : C.data(this, r, new e(i, this));
                })),
            s
          );
        };
      }),
      (C.Widget = function () { }),
      (C.Widget._childConstructors = []),
      (C.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function (t, e) {
          (e = C(e || this.defaultElement || this)[0]),
            (this.element = C(e)),
            (this.uuid = f++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = C()),
            (this.hoverable = C()),
            (this.focusable = C()),
            (this.classesElementLookup = {}),
            e !== this &&
            (C.data(e, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (t) {
                  t.target === e && this.destroy();
                },
              }),
              (this.document = C(e.style ? e.ownerDocument : e.document || e)),
              (this.window = C(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = C.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              t
            )),
            this._create(),
            this.options.disabled &&
            this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: function () {
          return {};
        },
        _getCreateEventData: C.noop,
        _create: C.noop,
        _init: C.noop,
        destroy: function () {
          var i = this;
          this._destroy(),
            C.each(this.classesElementLookup, function (t, e) {
              i._removeClass(e, t);
            }),
            this.element
              .off(this.eventNamespace)
              .removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace);
        },
        _destroy: C.noop,
        widget: function () {
          return this.element;
        },
        option: function (t, e) {
          var i,
            n,
            s,
            o = t;
          if (0 === arguments.length) return C.widget.extend({}, this.options);
          if ("string" == typeof t)
            if (((o = {}), (t = (i = t.split(".")).shift()), i.length)) {
              for (
                n = o[t] = C.widget.extend({}, this.options[t]), s = 0;
                i.length - 1 > s;
                s++
              )
                (n[i[s]] = n[i[s]] || {}), (n = n[i[s]]);
              if (((t = i.pop()), 1 === arguments.length))
                return void 0 === n[t] ? null : n[t];
              n[t] = e;
            } else {
              if (1 === arguments.length)
                return void 0 === this.options[t] ? null : this.options[t];
              o[t] = e;
            }
          return this._setOptions(o), this;
        },
        _setOptions: function (t) {
          var e;
          for (e in t) this._setOption(e, t[e]);
          return this;
        },
        _setOption: function (t, e) {
          return (
            "classes" === t && this._setOptionClasses(e),
            (this.options[t] = e),
            "disabled" === t && this._setOptionDisabled(e),
            this
          );
        },
        _setOptionClasses: function (t) {
          var e, i, n;
          for (e in t)
            (n = this.classesElementLookup[e]),
              t[e] !== this.options.classes[e] &&
              n &&
              n.length &&
              ((i = C(n.get())),
                this._removeClass(n, e),
                i.addClass(
                  this._classes({ element: i, keys: e, classes: t, add: !0 })
                ));
        },
        _setOptionDisabled: function (t) {
          this._toggleClass(
            this.widget(),
            this.widgetFullName + "-disabled",
            null,
            !!t
          ),
            t &&
            (this._removeClass(this.hoverable, null, "ui-state-hover"),
              this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _classes: function (s) {
          function t(t, e) {
            var i, n;
            for (n = 0; t.length > n; n++)
              (i = r.classesElementLookup[t[n]] || C()),
                (i = s.add
                  ? C(C.unique(i.get().concat(s.element.get())))
                  : C(i.not(s.element).get())),
                (r.classesElementLookup[t[n]] = i),
                o.push(t[n]),
                e && s.classes[t[n]] && o.push(s.classes[t[n]]);
          }
          var o = [],
            r = this;
          return (
            (s = C.extend(
              { element: this.element, classes: this.options.classes || {} },
              s
            )),
            this._on(s.element, { remove: "_untrackClassesElement" }),
            s.keys && t(s.keys.match(/\S+/g) || [], !0),
            s.extra && t(s.extra.match(/\S+/g) || []),
            o.join(" ")
          );
        },
        _untrackClassesElement: function (i) {
          var n = this;
          C.each(n.classesElementLookup, function (t, e) {
            -1 !== C.inArray(i.target, e) &&
              (n.classesElementLookup[t] = C(e.not(i.target).get()));
          });
        },
        _removeClass: function (t, e, i) {
          return this._toggleClass(t, e, i, !1);
        },
        _addClass: function (t, e, i) {
          return this._toggleClass(t, e, i, !0);
        },
        _toggleClass: function (t, e, i, n) {
          n = "boolean" == typeof n ? n : i;
          var s = "string" == typeof t || null === t,
            o = {
              extra: s ? e : i,
              keys: s ? t : e,
              element: s ? this.element : t,
              add: n,
            };
          return o.element.toggleClass(this._classes(o), n), this;
        },
        _on: function (r, a, t) {
          var l,
            h = this;
          "boolean" != typeof r && ((t = a), (a = r), (r = !1)),
            t
              ? ((a = l = C(a)), (this.bindings = this.bindings.add(a)))
              : ((t = a), (a = this.element), (l = this.widget())),
            C.each(t, function (t, e) {
              function i() {
                return r ||
                  (!0 !== h.options.disabled &&
                    !C(this).hasClass("ui-state-disabled"))
                  ? ("string" == typeof e ? h[e] : e).apply(h, arguments)
                  : void 0;
              }
              "string" != typeof e &&
                (i.guid = e.guid = e.guid || i.guid || C.guid++);
              var n = t.match(/^([\w:-]*)\s*(.*)$/),
                s = n[1] + h.eventNamespace,
                o = n[2];
              o ? l.on(s, o, i) : a.on(s, i);
            });
        },
        _off: function (t, e) {
          (e =
            (e || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            t.off(e).off(e),
            (this.bindings = C(this.bindings.not(t).get())),
            (this.focusable = C(this.focusable.not(t).get())),
            (this.hoverable = C(this.hoverable.not(t).get()));
        },
        _delay: function (t, e) {
          var i = this;
          return setTimeout(function () {
            return ("string" == typeof t ? i[t] : t).apply(i, arguments);
          }, e || 0);
        },
        _hoverable: function (t) {
          (this.hoverable = this.hoverable.add(t)),
            this._on(t, {
              mouseenter: function (t) {
                this._addClass(C(t.currentTarget), null, "ui-state-hover");
              },
              mouseleave: function (t) {
                this._removeClass(C(t.currentTarget), null, "ui-state-hover");
              },
            });
        },
        _focusable: function (t) {
          (this.focusable = this.focusable.add(t)),
            this._on(t, {
              focusin: function (t) {
                this._addClass(C(t.currentTarget), null, "ui-state-focus");
              },
              focusout: function (t) {
                this._removeClass(C(t.currentTarget), null, "ui-state-focus");
              },
            });
        },
        _trigger: function (t, e, i) {
          var n,
            s,
            o = this.options[t];
          if (
            ((i = i || {}),
              ((e = C.Event(e)).type = (
                t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t
              ).toLowerCase()),
              (e.target = this.element[0]),
              (s = e.originalEvent))
          )
            for (n in s) n in e || (e[n] = s[n]);
          return (
            this.element.trigger(e, i),
            !(
              (C.isFunction(o) &&
                !1 === o.apply(this.element[0], [e].concat(i))) ||
              e.isDefaultPrevented()
            )
          );
        },
      }),
      C.each({ show: "fadeIn", hide: "fadeOut" }, function (o, r) {
        C.Widget.prototype["_" + o] = function (e, t, i) {
          "string" == typeof t && (t = { effect: t });
          var n,
            s = t ? (!0 === t || "number" == typeof t ? r : t.effect || r) : o;
          "number" == typeof (t = t || {}) && (t = { duration: t }),
            (n = !C.isEmptyObject(t)),
            (t.complete = i),
            t.delay && e.delay(t.delay),
            n && C.effects && C.effects.effect[s]
              ? e[o](t)
              : s !== o && e[s]
                ? e[s](t.duration, t.easing, i)
                : e.queue(function (t) {
                  C(this)[o](), i && i.call(e[0]), t();
                });
        };
      }),
      C.widget,
      (x = Math.max),
      (k = Math.abs),
      (l = /left|center|right/),
      (h = /top|center|bottom/),
      (c = /[\+\-]\d+(\.[\d]+)?%?/),
      (D = /^\w+/),
      (d = /%$/),
      (T = C.fn.position),
      (C.position = {
        scrollbarWidth: function () {
          if (void 0 !== a) return a;
          var t,
            e,
            i = C(
              "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
            ),
            n = i.children()[0];
          return (
            C("body").append(i),
            (t = n.offsetWidth),
            i.css("overflow", "scroll"),
            t === (e = n.offsetWidth) && (e = i[0].clientWidth),
            i.remove(),
            (a = t - e)
          );
        },
        getScrollInfo: function (t) {
          var e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
            i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
            n =
              "scroll" === e ||
              ("auto" === e && t.width < t.element[0].scrollWidth);
          return {
            width:
              "scroll" === i ||
                ("auto" === i && t.height < t.element[0].scrollHeight)
                ? C.position.scrollbarWidth()
                : 0,
            height: n ? C.position.scrollbarWidth() : 0,
          };
        },
        getWithinInfo: function (t) {
          var e = C(t || window),
            i = C.isWindow(e[0]),
            n = !!e[0] && 9 === e[0].nodeType;
          return {
            element: e,
            isWindow: i,
            isDocument: n,
            offset: i || n ? { left: 0, top: 0 } : C(t).offset(),
            scrollLeft: e.scrollLeft(),
            scrollTop: e.scrollTop(),
            width: e.outerWidth(),
            height: e.outerHeight(),
          };
        },
      }),
      (C.fn.position = function (u) {
        if (!u || !u.of) return T.apply(this, arguments);
        u = C.extend({}, u);
        var d,
          p,
          f,
          g,
          m,
          t,
          v = C(u.of),
          _ = C.position.getWithinInfo(u.within),
          y = C.position.getScrollInfo(_),
          b = (u.collision || "flip").split(" "),
          w = {};
        return (
          (t = (function (t) {
            var e = t[0];
            return 9 === e.nodeType
              ? {
                width: t.width(),
                height: t.height(),
                offset: { top: 0, left: 0 },
              }
              : C.isWindow(e)
                ? {
                  width: t.width(),
                  height: t.height(),
                  offset: { top: t.scrollTop(), left: t.scrollLeft() },
                }
                : e.preventDefault
                  ? { width: 0, height: 0, offset: { top: e.pageY, left: e.pageX } }
                  : {
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    offset: t.offset(),
                  };
          })(v)),
          v[0].preventDefault && (u.at = "left top"),
          (p = t.width),
          (f = t.height),
          (g = t.offset),
          (m = C.extend({}, g)),
          C.each(["my", "at"], function () {
            var t,
              e,
              i = (u[this] || "").split(" ");
            1 === i.length &&
              (i = l.test(i[0])
                ? i.concat(["center"])
                : h.test(i[0])
                  ? ["center"].concat(i)
                  : ["center", "center"]),
              (i[0] = l.test(i[0]) ? i[0] : "center"),
              (i[1] = h.test(i[1]) ? i[1] : "center"),
              (t = c.exec(i[0])),
              (e = c.exec(i[1])),
              (w[this] = [t ? t[0] : 0, e ? e[0] : 0]),
              (u[this] = [D.exec(i[0])[0], D.exec(i[1])[0]]);
          }),
          1 === b.length && (b[1] = b[0]),
          "right" === u.at[0]
            ? (m.left += p)
            : "center" === u.at[0] && (m.left += p / 2),
          "bottom" === u.at[1]
            ? (m.top += f)
            : "center" === u.at[1] && (m.top += f / 2),
          (d = I(w.at, p, f)),
          (m.left += d[0]),
          (m.top += d[1]),
          this.each(function () {
            var i,
              t,
              r = C(this),
              a = r.outerWidth(),
              l = r.outerHeight(),
              e = S(this, "marginLeft"),
              n = S(this, "marginTop"),
              s = a + e + S(this, "marginRight") + y.width,
              o = l + n + S(this, "marginBottom") + y.height,
              h = C.extend({}, m),
              c = I(w.my, r.outerWidth(), r.outerHeight());
            "right" === u.my[0]
              ? (h.left -= a)
              : "center" === u.my[0] && (h.left -= a / 2),
              "bottom" === u.my[1]
                ? (h.top -= l)
                : "center" === u.my[1] && (h.top -= l / 2),
              (h.left += c[0]),
              (h.top += c[1]),
              (i = { marginLeft: e, marginTop: n }),
              C.each(["left", "top"], function (t, e) {
                C.ui.position[b[t]] &&
                  C.ui.position[b[t]][e](h, {
                    targetWidth: p,
                    targetHeight: f,
                    elemWidth: a,
                    elemHeight: l,
                    collisionPosition: i,
                    collisionWidth: s,
                    collisionHeight: o,
                    offset: [d[0] + c[0], d[1] + c[1]],
                    my: u.my,
                    at: u.at,
                    within: _,
                    elem: r,
                  });
              }),
              u.using &&
              (t = function (t) {
                var e = g.left - h.left,
                  i = e + p - a,
                  n = g.top - h.top,
                  s = n + f - l,
                  o = {
                    target: {
                      element: v,
                      left: g.left,
                      top: g.top,
                      width: p,
                      height: f,
                    },
                    element: {
                      element: r,
                      left: h.left,
                      top: h.top,
                      width: a,
                      height: l,
                    },
                    horizontal: i < 0 ? "left" : 0 < e ? "right" : "center",
                    vertical: s < 0 ? "top" : 0 < n ? "bottom" : "middle",
                  };
                p < a && p > k(e + i) && (o.horizontal = "center"),
                  f < l && f > k(n + s) && (o.vertical = "middle"),
                  (o.important =
                    x(k(e), k(i)) > x(k(n), k(s))
                      ? "horizontal"
                      : "vertical"),
                  u.using.call(this, t, o);
              }),
              r.offset(C.extend(h, { using: t }));
          })
        );
      }),
      (C.ui.position = {
        fit: {
          left: function (t, e) {
            var i,
              n = e.within,
              s = n.isWindow ? n.scrollLeft : n.offset.left,
              o = n.width,
              r = t.left - e.collisionPosition.marginLeft,
              a = s - r,
              l = r + e.collisionWidth - o - s;
            e.collisionWidth > o
              ? 0 < a && l <= 0
                ? ((i = t.left + a + e.collisionWidth - o - s),
                  (t.left += a - i))
                : (t.left =
                  0 < l && a <= 0 ? s : l < a ? s + o - e.collisionWidth : s)
              : 0 < a
                ? (t.left += a)
                : 0 < l
                  ? (t.left -= l)
                  : (t.left = x(t.left - r, t.left));
          },
          top: function (t, e) {
            var i,
              n = e.within,
              s = n.isWindow ? n.scrollTop : n.offset.top,
              o = e.within.height,
              r = t.top - e.collisionPosition.marginTop,
              a = s - r,
              l = r + e.collisionHeight - o - s;
            e.collisionHeight > o
              ? 0 < a && l <= 0
                ? ((i = t.top + a + e.collisionHeight - o - s),
                  (t.top += a - i))
                : (t.top =
                  0 < l && a <= 0 ? s : l < a ? s + o - e.collisionHeight : s)
              : 0 < a
                ? (t.top += a)
                : 0 < l
                  ? (t.top -= l)
                  : (t.top = x(t.top - r, t.top));
          },
        },
        flip: {
          left: function (t, e) {
            var i,
              n,
              s = e.within,
              o = s.offset.left + s.scrollLeft,
              r = s.width,
              a = s.isWindow ? s.scrollLeft : s.offset.left,
              l = t.left - e.collisionPosition.marginLeft,
              h = l - a,
              c = l + e.collisionWidth - r - a,
              u =
                "left" === e.my[0]
                  ? -e.elemWidth
                  : "right" === e.my[0]
                    ? e.elemWidth
                    : 0,
              d =
                "left" === e.at[0]
                  ? e.targetWidth
                  : "right" === e.at[0]
                    ? -e.targetWidth
                    : 0,
              p = -2 * e.offset[0];
            h < 0
              ? ((i = t.left + u + d + p + e.collisionWidth - r - o) < 0 ||
                k(h) > i) &&
              (t.left += u + d + p)
              : 0 < c &&
              (0 <
                (n =
                  t.left - e.collisionPosition.marginLeft + u + d + p - a) ||
                c > k(n)) &&
              (t.left += u + d + p);
          },
          top: function (t, e) {
            var i,
              n,
              s = e.within,
              o = s.offset.top + s.scrollTop,
              r = s.height,
              a = s.isWindow ? s.scrollTop : s.offset.top,
              l = t.top - e.collisionPosition.marginTop,
              h = l - a,
              c = l + e.collisionHeight - r - a,
              u =
                "top" === e.my[1]
                  ? -e.elemHeight
                  : "bottom" === e.my[1]
                    ? e.elemHeight
                    : 0,
              d =
                "top" === e.at[1]
                  ? e.targetHeight
                  : "bottom" === e.at[1]
                    ? -e.targetHeight
                    : 0,
              p = -2 * e.offset[1];
            h < 0
              ? ((n = t.top + u + d + p + e.collisionHeight - r - o) < 0 ||
                k(h) > n) &&
              (t.top += u + d + p)
              : 0 < c &&
              (0 <
                (i = t.top - e.collisionPosition.marginTop + u + d + p - a) ||
                c > k(i)) &&
              (t.top += u + d + p);
          },
        },
        flipfit: {
          left: function () {
            C.ui.position.flip.left.apply(this, arguments),
              C.ui.position.fit.left.apply(this, arguments);
          },
          top: function () {
            C.ui.position.flip.top.apply(this, arguments),
              C.ui.position.fit.top.apply(this, arguments);
          },
        },
      }),
      C.ui.position,
      C.extend(C.expr[":"], {
        data: C.expr.createPseudo
          ? C.expr.createPseudo(function (e) {
            return function (t) {
              return !!C.data(t, e);
            };
          })
          : function (t, e, i) {
            return !!C.data(t, i[3]);
          },
      }),
      C.fn.extend({
        disableSelection:
          ((r =
            "onselectstart" in document.createElement("div")
              ? "selectstart"
              : "mousedown"),
            function () {
              return this.on(r + ".ui-disableSelection", function (t) {
                t.preventDefault();
              });
            }),
        enableSelection: function () {
          return this.off(".ui-disableSelection");
        },
      }),
      (C.ui.focusable = function (t, e) {
        var i,
          n,
          s,
          o,
          r,
          a = t.nodeName.toLowerCase();
        return "area" === a
          ? ((n = (i = t.parentNode).name),
            !(!t.href || !n || "map" !== i.nodeName.toLowerCase()) &&
            0 < (s = C("img[usemap='#" + n + "']")).length &&
            s.is(":visible"))
          : (/^(input|select|textarea|button|object)$/.test(a)
            ? (o = !t.disabled) &&
            (r = C(t).closest("fieldset")[0]) &&
            (o = !r.disabled)
            : (o = ("a" === a && t.href) || e),
            o &&
            C(t).is(":visible") &&
            (function (t) {
              for (var e = t.css("visibility"); "inherit" === e;)
                e = (t = t.parent()).css("visibility");
              return "hidden" !== e;
            })(C(t)));
      }),
      C.extend(C.expr[":"], {
        focusable: function (t) {
          return C.ui.focusable(t, null != C.attr(t, "tabindex"));
        },
      }),
      C.ui.focusable,
      (C.fn.form = function () {
        return "string" == typeof this[0].form
          ? this.closest("form")
          : C(this[0].form);
      }),
      (C.ui.formResetMixin = {
        _formResetHandler: function () {
          var e = C(this);
          setTimeout(function () {
            var t = e.data("ui-form-reset-instances");
            C.each(t, function () {
              this.refresh();
            });
          });
        },
        _bindFormResetHandler: function () {
          if (((this.form = this.element.form()), this.form.length)) {
            var t = this.form.data("ui-form-reset-instances") || [];
            t.length ||
              this.form.on("reset.ui-form-reset", this._formResetHandler),
              t.push(this),
              this.form.data("ui-form-reset-instances", t);
          }
        },
        _unbindFormResetHandler: function () {
          if (this.form.length) {
            var t = this.form.data("ui-form-reset-instances");
            t.splice(C.inArray(this, t), 1),
              t.length
                ? this.form.data("ui-form-reset-instances", t)
                : this.form
                  .removeData("ui-form-reset-instances")
                  .off("reset.ui-form-reset");
          }
        },
      }),
      "1.7" === C.fn.jquery.substring(0, 3) &&
      (C.each(["Width", "Height"], function (t, i) {
        function n(t, e, i, n) {
          return (
            C.each(s, function () {
              (e -= parseFloat(C.css(t, "padding" + this)) || 0),
                i &&
                (e -= parseFloat(C.css(t, "border" + this + "Width")) || 0),
                n && (e -= parseFloat(C.css(t, "margin" + this)) || 0);
            }),
            e
          );
        }
        var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
          o = i.toLowerCase(),
          r = {
            innerWidth: C.fn.innerWidth,
            innerHeight: C.fn.innerHeight,
            outerWidth: C.fn.outerWidth,
            outerHeight: C.fn.outerHeight,
          };
        (C.fn["inner" + i] = function (t) {
          return void 0 === t
            ? r["inner" + i].call(this)
            : this.each(function () {
              C(this).css(o, n(this, t) + "px");
            });
        }),
          (C.fn["outer" + i] = function (t, e) {
            return "number" != typeof t
              ? r["outer" + i].call(this, t)
              : this.each(function () {
                C(this).css(o, n(this, t, !0, e) + "px");
              });
          });
      }),
        (C.fn.addBack = function (t) {
          return this.add(
            null == t ? this.prevObject : this.prevObject.filter(t)
          );
        })),
      (C.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      }),
      (C.ui.escapeSelector =
        ((s = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g),
          function (t) {
            return t.replace(s, "\\$1");
          })),
      (C.fn.labels = function () {
        var t, e, i, n, s;
        return this[0].labels && this[0].labels.length
          ? this.pushStack(this[0].labels)
          : ((n = this.eq(0).parents("label")),
            (i = this.attr("id")) &&
            ((s = (t = this.eq(0).parents().last()).add(
              t.length ? t.siblings() : this.siblings()
            )),
              (e = "label[for='" + C.ui.escapeSelector(i) + "']"),
              (n = n.add(s.find(e).addBack(e)))),
            this.pushStack(n));
      }),
      (C.fn.scrollParent = function (t) {
        var e = this.css("position"),
          i = "absolute" === e,
          n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          s = this.parents()
            .filter(function () {
              var t = C(this);
              return (
                (!i || "static" !== t.css("position")) &&
                n.test(
                  t.css("overflow") + t.css("overflow-y") + t.css("overflow-x")
                )
              );
            })
            .eq(0);
        return "fixed" !== e && s.length
          ? s
          : C(this[0].ownerDocument || document);
      }),
      C.extend(C.expr[":"], {
        tabbable: function (t) {
          var e = C.attr(t, "tabindex"),
            i = null != e;
          return (!i || 0 <= e) && C.ui.focusable(t, i);
        },
      }),
      C.fn.extend({
        uniqueId:
          ((n = 0),
            function () {
              return this.each(function () {
                this.id || (this.id = "ui-id-" + ++n);
              });
            }),
        removeUniqueId: function () {
          return this.each(function () {
            /^ui-id-\d+$/.test(this.id) && C(this).removeAttr("id");
          });
        },
      }),
      (C.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
    var m = !1;
    C(document).on("mouseup", function () {
      m = !1;
    }),
      C.widget("ui.mouse", {
        version: "1.12.1",
        options: {
          cancel: "input, textarea, button, select, option",
          distance: 1,
          delay: 0,
        },
        _mouseInit: function () {
          var e = this;
          this.element
            .on("mousedown." + this.widgetName, function (t) {
              return e._mouseDown(t);
            })
            .on("click." + this.widgetName, function (t) {
              return !0 ===
                C.data(t.target, e.widgetName + ".preventClickEvent")
                ? (C.removeData(t.target, e.widgetName + ".preventClickEvent"),
                  t.stopImmediatePropagation(),
                  !1)
                : void 0;
            }),
            (this.started = !1);
        },
        _mouseDestroy: function () {
          this.element.off("." + this.widgetName),
            this._mouseMoveDelegate &&
            this.document
              .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .off("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function (t) {
          if (!m) {
            (this._mouseMoved = !1),
              this._mouseStarted && this._mouseUp(t),
              (this._mouseDownEvent = t);
            var e = this,
              i = 1 === t.which,
              n =
                !(
                  "string" != typeof this.options.cancel || !t.target.nodeName
                ) && C(t.target).closest(this.options.cancel).length;
            return (
              i &&
              !n &&
              this._mouseCapture(t) &&
              ((this.mouseDelayMet = !this.options.delay),
                this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  e.mouseDelayMet = !0;
                }, this.options.delay)),
                this._mouseDistanceMet(t) &&
                  this._mouseDelayMet(t) &&
                  ((this._mouseStarted = !1 !== this._mouseStart(t)),
                    !this._mouseStarted)
                  ? t.preventDefault()
                  : (!0 ===
                    C.data(
                      t.target,
                      this.widgetName + ".preventClickEvent"
                    ) &&
                    C.removeData(
                      t.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                    (this._mouseMoveDelegate = function (t) {
                      return e._mouseMove(t);
                    }),
                    (this._mouseUpDelegate = function (t) {
                      return e._mouseUp(t);
                    }),
                    this.document
                      .on(
                        "mousemove." + this.widgetName,
                        this._mouseMoveDelegate
                      )
                      .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                    t.preventDefault(),
                    (m = !0))),
              !0
            );
          }
        },
        _mouseMove: function (t) {
          if (this._mouseMoved) {
            if (
              C.ui.ie &&
              (!document.documentMode || document.documentMode < 9) &&
              !t.button
            )
              return this._mouseUp(t);
            if (!t.which)
              if (
                t.originalEvent.altKey ||
                t.originalEvent.ctrlKey ||
                t.originalEvent.metaKey ||
                t.originalEvent.shiftKey
              )
                this.ignoreMissingWhich = !0;
              else if (!this.ignoreMissingWhich) return this._mouseUp(t);
          }
          return (
            (t.which || t.button) && (this._mouseMoved = !0),
            this._mouseStarted
              ? (this._mouseDrag(t), t.preventDefault())
              : (this._mouseDistanceMet(t) &&
                this._mouseDelayMet(t) &&
                ((this._mouseStarted =
                  !1 !== this._mouseStart(this._mouseDownEvent, t)),
                  this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
                !this._mouseStarted)
          );
        },
        _mouseUp: function (t) {
          this.document
            .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .off("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted &&
            ((this._mouseStarted = !1),
              t.target === this._mouseDownEvent.target &&
              C.data(t.target, this.widgetName + ".preventClickEvent", !0),
              this._mouseStop(t)),
            this._mouseDelayTimer &&
            (clearTimeout(this._mouseDelayTimer),
              delete this._mouseDelayTimer),
            (this.ignoreMissingWhich = !1),
            (m = !1),
            t.preventDefault();
        },
        _mouseDistanceMet: function (t) {
          return (
            Math.max(
              Math.abs(this._mouseDownEvent.pageX - t.pageX),
              Math.abs(this._mouseDownEvent.pageY - t.pageY)
            ) >= this.options.distance
          );
        },
        _mouseDelayMet: function () {
          return this.mouseDelayMet;
        },
        _mouseStart: function () { },
        _mouseDrag: function () { },
        _mouseStop: function () { },
        _mouseCapture: function () {
          return !0;
        },
      }),
      (C.ui.plugin = {
        add: function (t, e, i) {
          var n,
            s = C.ui[t].prototype;
          for (n in i)
            (s.plugins[n] = s.plugins[n] || []), s.plugins[n].push([e, i[n]]);
        },
        call: function (t, e, i, n) {
          var s,
            o = t.plugins[e];
          if (
            o &&
            (n ||
              (t.element[0].parentNode &&
                11 !== t.element[0].parentNode.nodeType))
          )
            for (s = 0; o.length > s; s++)
              t.options[o[s][0]] && o[s][1].apply(t.element, i);
        },
      }),
      (C.ui.safeActiveElement = function (e) {
        var i;
        try {
          i = e.activeElement;
        } catch (t) {
          i = e.body;
        }
        return (i = i || e.body).nodeName || (i = e.body), i;
      }),
      (C.ui.safeBlur = function (t) {
        t && "body" !== t.nodeName.toLowerCase() && C(t).trigger("blur");
      }),
      C.widget("ui.draggable", C.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
          addClasses: !0,
          appendTo: "parent",
          axis: !1,
          connectToSortable: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          iframeFix: !1,
          opacity: !1,
          refreshPositions: !1,
          revert: !1,
          revertDuration: 500,
          scope: "default",
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          snap: !1,
          snapMode: "both",
          snapTolerance: 20,
          stack: !1,
          zIndex: !1,
          drag: null,
          start: null,
          stop: null,
        },
        _create: function () {
          "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this._addClass("ui-draggable"),
            this._setHandleClassName(),
            this._mouseInit();
        },
        _setOption: function (t, e) {
          this._super(t, e),
            "handle" === t &&
            (this._removeHandleClassName(), this._setHandleClassName());
        },
        _destroy: function () {
          return (this.helper || this.element).is(".ui-draggable-dragging")
            ? void (this.destroyOnClear = !0)
            : (this._removeHandleClassName(), void this._mouseDestroy());
        },
        _mouseCapture: function (t) {
          var e = this.options;
          return (
            !(
              this.helper ||
              e.disabled ||
              0 < C(t.target).closest(".ui-resizable-handle").length
            ) &&
            ((this.handle = this._getHandle(t)),
              !!this.handle &&
              (this._blurActiveElement(t),
                this._blockFrames(!0 === e.iframeFix ? "iframe" : e.iframeFix),
                !0))
          );
        },
        _blockFrames: function (t) {
          this.iframeBlocks = this.document.find(t).map(function () {
            var t = C(this);
            return C("<div>")
              .css("position", "absolute")
              .appendTo(t.parent())
              .outerWidth(t.outerWidth())
              .outerHeight(t.outerHeight())
              .offset(t.offset())[0];
          });
        },
        _unblockFrames: function () {
          this.iframeBlocks &&
            (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _blurActiveElement: function (t) {
          var e = C.ui.safeActiveElement(this.document[0]);
          C(t.target).closest(e).length || C.ui.safeBlur(e);
        },
        _mouseStart: function (t) {
          var e = this.options;
          return (
            (this.helper = this._createHelper(t)),
            this._addClass(this.helper, "ui-draggable-dragging"),
            this._cacheHelperProportions(),
            C.ui.ddmanager && (C.ui.ddmanager.current = this),
            this._cacheMargins(),
            (this.cssPosition = this.helper.css("position")),
            (this.scrollParent = this.helper.scrollParent(!0)),
            (this.offsetParent = this.helper.offsetParent()),
            (this.hasFixedAncestor =
              0 <
              this.helper.parents().filter(function () {
                return "fixed" === C(this).css("position");
              }).length),
            (this.positionAbs = this.element.offset()),
            this._refreshOffsets(t),
            (this.originalPosition = this.position =
              this._generatePosition(t, !1)),
            (this.originalPageX = t.pageX),
            (this.originalPageY = t.pageY),
            e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt),
            this._setContainment(),
            !1 === this._trigger("start", t)
              ? (this._clear(), !1)
              : (this._cacheHelperProportions(),
                C.ui.ddmanager &&
                !e.dropBehaviour &&
                C.ui.ddmanager.prepareOffsets(this, t),
                this._mouseDrag(t, !0),
                C.ui.ddmanager && C.ui.ddmanager.dragStart(this, t),
                !0)
          );
        },
        _refreshOffsets: function (t) {
          (this.offset = {
            top: this.positionAbs.top - this.margins.top,
            left: this.positionAbs.left - this.margins.left,
            scroll: !1,
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
            (this.offset.click = {
              left: t.pageX - this.offset.left,
              top: t.pageY - this.offset.top,
            });
        },
        _mouseDrag: function (t, e) {
          if (
            (this.hasFixedAncestor &&
              (this.offset.parent = this._getParentOffset()),
              (this.position = this._generatePosition(t, !0)),
              (this.positionAbs = this._convertPositionTo("absolute")),
              !e)
          ) {
            var i = this._uiHash();
            if (!1 === this._trigger("drag", t, i))
              return this._mouseUp(new C.Event("mouseup", t)), !1;
            this.position = i.position;
          }
          return (
            (this.helper[0].style.left = this.position.left + "px"),
            (this.helper[0].style.top = this.position.top + "px"),
            C.ui.ddmanager && C.ui.ddmanager.drag(this, t),
            !1
          );
        },
        _mouseStop: function (t) {
          var e = this,
            i = !1;
          return (
            C.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (i = C.ui.ddmanager.drop(this, t)),
            this.dropped && ((i = this.dropped), (this.dropped = !1)),
            ("invalid" === this.options.revert && !i) ||
              ("valid" === this.options.revert && i) ||
              !0 === this.options.revert ||
              (C.isFunction(this.options.revert) &&
                this.options.revert.call(this.element, i))
              ? C(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function () {
                  !1 !== e._trigger("stop", t) && e._clear();
                }
              )
              : !1 !== this._trigger("stop", t) && this._clear(),
            !1
          );
        },
        _mouseUp: function (t) {
          return (
            this._unblockFrames(),
            C.ui.ddmanager && C.ui.ddmanager.dragStop(this, t),
            this.handleElement.is(t.target) && this.element.trigger("focus"),
            C.ui.mouse.prototype._mouseUp.call(this, t)
          );
        },
        cancel: function () {
          return (
            this.helper.is(".ui-draggable-dragging")
              ? this._mouseUp(
                new C.Event("mouseup", { target: this.element[0] })
              )
              : this._clear(),
            this
          );
        },
        _getHandle: function (t) {
          return (
            !this.options.handle ||
            !!C(t.target).closest(this.element.find(this.options.handle)).length
          );
        },
        _setHandleClassName: function () {
          (this.handleElement = this.options.handle
            ? this.element.find(this.options.handle)
            : this.element),
            this._addClass(this.handleElement, "ui-draggable-handle");
        },
        _removeHandleClassName: function () {
          this._removeClass(this.handleElement, "ui-draggable-handle");
        },
        _createHelper: function (t) {
          var e = this.options,
            i = C.isFunction(e.helper),
            n = i
              ? C(e.helper.apply(this.element[0], [t]))
              : "clone" === e.helper
                ? this.element.clone().removeAttr("id")
                : this.element;
          return (
            n.parents("body").length ||
            n.appendTo(
              "parent" === e.appendTo
                ? this.element[0].parentNode
                : e.appendTo
            ),
            i && n[0] === this.element[0] && this._setPositionRelative(),
            n[0] === this.element[0] ||
            /(fixed|absolute)/.test(n.css("position")) ||
            n.css("position", "absolute"),
            n
          );
        },
        _setPositionRelative: function () {
          /^(?:r|a|f)/.test(this.element.css("position")) ||
            (this.element[0].style.position = "relative");
        },
        _adjustOffsetFromHelper: function (t) {
          "string" == typeof t && (t = t.split(" ")),
            C.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }),
            "left" in t &&
            (this.offset.click.left = t.left + this.margins.left),
            "right" in t &&
            (this.offset.click.left =
              this.helperProportions.width - t.right + this.margins.left),
            "top" in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom" in t &&
            (this.offset.click.top =
              this.helperProportions.height - t.bottom + this.margins.top);
        },
        _isRootNode: function (t) {
          return /(html|body)/i.test(t.tagName) || t === this.document[0];
        },
        _getParentOffset: function () {
          var t = this.offsetParent.offset(),
            e = this.document[0];
          return (
            "absolute" === this.cssPosition &&
            this.scrollParent[0] !== e &&
            C.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((t.left += this.scrollParent.scrollLeft()),
              (t.top += this.scrollParent.scrollTop())),
            this._isRootNode(this.offsetParent[0]) && (t = { top: 0, left: 0 }),
            {
              top:
                t.top +
                (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left:
                t.left +
                (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
          var t = this.element.position(),
            e = this._isRootNode(this.scrollParent[0]);
          return {
            top:
              t.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              (e ? 0 : this.scrollParent.scrollTop()),
            left:
              t.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              (e ? 0 : this.scrollParent.scrollLeft()),
          };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.element.css("marginLeft"), 10) || 0,
            top: parseInt(this.element.css("marginTop"), 10) || 0,
            right: parseInt(this.element.css("marginRight"), 10) || 0,
            bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var t,
            e,
            i,
            n = this.options,
            s = this.document[0];
          return (
            (this.relativeContainer = null),
            n.containment
              ? "window" === n.containment
                ? void (this.containment = [
                  C(window).scrollLeft() -
                  this.offset.relative.left -
                  this.offset.parent.left,
                  C(window).scrollTop() -
                  this.offset.relative.top -
                  this.offset.parent.top,
                  C(window).scrollLeft() +
                  C(window).width() -
                  this.helperProportions.width -
                  this.margins.left,
                  C(window).scrollTop() +
                  (C(window).height() || s.body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
                ])
                : "document" === n.containment
                  ? void (this.containment = [
                    0,
                    0,
                    C(s).width() -
                    this.helperProportions.width -
                    this.margins.left,
                    (C(s).height() || s.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                  ])
                  : n.containment.constructor === Array
                    ? void (this.containment = n.containment)
                    : ("parent" === n.containment &&
                      (n.containment = this.helper[0].parentNode),
                      void (
                        (i = (e = C(n.containment))[0]) &&
                        ((t = /(scroll|auto)/.test(e.css("overflow"))),
                          (this.containment = [
                            (parseInt(e.css("borderLeftWidth"), 10) || 0) +
                            (parseInt(e.css("paddingLeft"), 10) || 0),
                            (parseInt(e.css("borderTopWidth"), 10) || 0) +
                            (parseInt(e.css("paddingTop"), 10) || 0),
                            (t
                              ? Math.max(i.scrollWidth, i.offsetWidth)
                              : i.offsetWidth) -
                            (parseInt(e.css("borderRightWidth"), 10) || 0) -
                            (parseInt(e.css("paddingRight"), 10) || 0) -
                            this.helperProportions.width -
                            this.margins.left -
                            this.margins.right,
                            (t
                              ? Math.max(i.scrollHeight, i.offsetHeight)
                              : i.offsetHeight) -
                            (parseInt(e.css("borderBottomWidth"), 10) || 0) -
                            (parseInt(e.css("paddingBottom"), 10) || 0) -
                            this.helperProportions.height -
                            this.margins.top -
                            this.margins.bottom,
                          ]),
                          (this.relativeContainer = e))
                      ))
              : void (this.containment = null)
          );
        },
        _convertPositionTo: function (t, e) {
          e = e || this.position;
          var i = "absolute" === t ? 1 : -1,
            n = this._isRootNode(this.scrollParent[0]);
          return {
            top:
              e.top +
              this.offset.relative.top * i +
              this.offset.parent.top * i -
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : n
                  ? 0
                  : this.offset.scroll.top) *
              i,
            left:
              e.left +
              this.offset.relative.left * i +
              this.offset.parent.left * i -
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : n
                  ? 0
                  : this.offset.scroll.left) *
              i,
          };
        },
        _generatePosition: function (t, e) {
          var i,
            n,
            s,
            o,
            r = this.options,
            a = this._isRootNode(this.scrollParent[0]),
            l = t.pageX,
            h = t.pageY;
          return (
            (a && this.offset.scroll) ||
            (this.offset.scroll = {
              top: this.scrollParent.scrollTop(),
              left: this.scrollParent.scrollLeft(),
            }),
            e &&
            (this.containment &&
              ((i = this.relativeContainer
                ? ((n = this.relativeContainer.offset()),
                  [
                    this.containment[0] + n.left,
                    this.containment[1] + n.top,
                    this.containment[2] + n.left,
                    this.containment[3] + n.top,
                  ])
                : this.containment),
                t.pageX - this.offset.click.left < i[0] &&
                (l = i[0] + this.offset.click.left),
                t.pageY - this.offset.click.top < i[1] &&
                (h = i[1] + this.offset.click.top),
                t.pageX - this.offset.click.left > i[2] &&
                (l = i[2] + this.offset.click.left),
                t.pageY - this.offset.click.top > i[3] &&
                (h = i[3] + this.offset.click.top)),
              r.grid &&
              ((s = r.grid[1]
                ? this.originalPageY +
                Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1]
                : this.originalPageY),
                (h = i
                  ? s - this.offset.click.top >= i[1] ||
                    s - this.offset.click.top > i[3]
                    ? s
                    : s - this.offset.click.top >= i[1]
                      ? s - r.grid[1]
                      : s + r.grid[1]
                  : s),
                (o = r.grid[0]
                  ? this.originalPageX +
                  Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0]
                  : this.originalPageX),
                (l = i
                  ? o - this.offset.click.left >= i[0] ||
                    o - this.offset.click.left > i[2]
                    ? o
                    : o - this.offset.click.left >= i[0]
                      ? o - r.grid[0]
                      : o + r.grid[0]
                  : o)),
              "y" === r.axis && (l = this.originalPageX),
              "x" === r.axis && (h = this.originalPageY)),
            {
              top:
                h -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                ("fixed" === this.cssPosition
                  ? -this.offset.scroll.top
                  : a
                    ? 0
                    : this.offset.scroll.top),
              left:
                l -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                ("fixed" === this.cssPosition
                  ? -this.offset.scroll.left
                  : a
                    ? 0
                    : this.offset.scroll.left),
            }
          );
        },
        _clear: function () {
          this._removeClass(this.helper, "ui-draggable-dragging"),
            this.helper[0] === this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
            (this.helper = null),
            (this.cancelHelperRemoval = !1),
            this.destroyOnClear && this.destroy();
        },
        _trigger: function (t, e, i) {
          return (
            (i = i || this._uiHash()),
            C.ui.plugin.call(this, t, [e, i, this], !0),
            /^(drag|start|stop)/.test(t) &&
            ((this.positionAbs = this._convertPositionTo("absolute")),
              (i.offset = this.positionAbs)),
            C.Widget.prototype._trigger.call(this, t, e, i)
          );
        },
        plugins: {},
        _uiHash: function () {
          return {
            helper: this.helper,
            position: this.position,
            originalPosition: this.originalPosition,
            offset: this.positionAbs,
          };
        },
      }),
      C.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, t, i) {
          var n = C.extend({}, t, { item: i.element });
          (i.sortables = []),
            C(i.options.connectToSortable).each(function () {
              var t = C(this).sortable("instance");
              t &&
                !t.options.disabled &&
                (i.sortables.push(t),
                  t.refreshPositions(),
                  t._trigger("activate", e, n));
            });
        },
        stop: function (e, t, i) {
          var n = C.extend({}, t, { item: i.element });
          (i.cancelHelperRemoval = !1),
            C.each(i.sortables, function () {
              var t = this;
              t.isOver
                ? ((t.isOver = 0),
                  (i.cancelHelperRemoval = !0),
                  (t.cancelHelperRemoval = !1),
                  (t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left"),
                  }),
                  t._mouseStop(e),
                  (t.options.helper = t.options._helper))
                : ((t.cancelHelperRemoval = !0),
                  t._trigger("deactivate", e, n));
            });
        },
        drag: function (i, n, s) {
          C.each(s.sortables, function () {
            var t = !1,
              e = this;
            (e.positionAbs = s.positionAbs),
              (e.helperProportions = s.helperProportions),
              (e.offset.click = s.offset.click),
              e._intersectsWith(e.containerCache) &&
              ((t = !0),
                C.each(s.sortables, function () {
                  return (
                    (this.positionAbs = s.positionAbs),
                    (this.helperProportions = s.helperProportions),
                    (this.offset.click = s.offset.click),
                    this !== e &&
                    this._intersectsWith(this.containerCache) &&
                    C.contains(e.element[0], this.element[0]) &&
                    (t = !1),
                    t
                  );
                })),
              t
                ? (e.isOver ||
                  ((e.isOver = 1),
                    (s._parent = n.helper.parent()),
                    (e.currentItem = n.helper
                      .appendTo(e.element)
                      .data("ui-sortable-item", !0)),
                    (e.options._helper = e.options.helper),
                    (e.options.helper = function () {
                      return n.helper[0];
                    }),
                    (i.target = e.currentItem[0]),
                    e._mouseCapture(i, !0),
                    e._mouseStart(i, !0, !0),
                    (e.offset.click.top = s.offset.click.top),
                    (e.offset.click.left = s.offset.click.left),
                    (e.offset.parent.left -=
                      s.offset.parent.left - e.offset.parent.left),
                    (e.offset.parent.top -=
                      s.offset.parent.top - e.offset.parent.top),
                    s._trigger("toSortable", i),
                    (s.dropped = e.element),
                    C.each(s.sortables, function () {
                      this.refreshPositions();
                    }),
                    (s.currentItem = s.element),
                    (e.fromOutside = s)),
                  e.currentItem && (e._mouseDrag(i), (n.position = e.position)))
                : e.isOver &&
                ((e.isOver = 0),
                  (e.cancelHelperRemoval = !0),
                  (e.options._revert = e.options.revert),
                  (e.options.revert = !1),
                  e._trigger("out", i, e._uiHash(e)),
                  e._mouseStop(i, !0),
                  (e.options.revert = e.options._revert),
                  (e.options.helper = e.options._helper),
                  e.placeholder && e.placeholder.remove(),
                  n.helper.appendTo(s._parent),
                  s._refreshOffsets(i),
                  (n.position = s._generatePosition(i, !0)),
                  s._trigger("fromSortable", i),
                  (s.dropped = !1),
                  C.each(s.sortables, function () {
                    this.refreshPositions();
                  }));
          });
        },
      }),
      C.ui.plugin.add("draggable", "cursor", {
        start: function (t, e, i) {
          var n = C("body"),
            s = i.options;
          n.css("cursor") && (s._cursor = n.css("cursor")),
            n.css("cursor", s.cursor);
        },
        stop: function (t, e, i) {
          var n = i.options;
          n._cursor && C("body").css("cursor", n._cursor);
        },
      }),
      C.ui.plugin.add("draggable", "opacity", {
        start: function (t, e, i) {
          var n = C(e.helper),
            s = i.options;
          n.css("opacity") && (s._opacity = n.css("opacity")),
            n.css("opacity", s.opacity);
        },
        stop: function (t, e, i) {
          var n = i.options;
          n._opacity && C(e.helper).css("opacity", n._opacity);
        },
      }),
      C.ui.plugin.add("draggable", "scroll", {
        start: function (t, e, i) {
          i.scrollParentNotHidden ||
            (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
            i.scrollParentNotHidden[0] !== i.document[0] &&
            "HTML" !== i.scrollParentNotHidden[0].tagName &&
            (i.overflowOffset = i.scrollParentNotHidden.offset());
        },
        drag: function (t, e, i) {
          var n = i.options,
            s = !1,
            o = i.scrollParentNotHidden[0],
            r = i.document[0];
          o !== r && "HTML" !== o.tagName
            ? ((n.axis && "x" === n.axis) ||
              (i.overflowOffset.top + o.offsetHeight - t.pageY <
                n.scrollSensitivity
                ? (o.scrollTop = s = o.scrollTop + n.scrollSpeed)
                : t.pageY - i.overflowOffset.top < n.scrollSensitivity &&
                (o.scrollTop = s = o.scrollTop - n.scrollSpeed)),
              (n.axis && "y" === n.axis) ||
              (i.overflowOffset.left + o.offsetWidth - t.pageX <
                n.scrollSensitivity
                ? (o.scrollLeft = s = o.scrollLeft + n.scrollSpeed)
                : t.pageX - i.overflowOffset.left < n.scrollSensitivity &&
                (o.scrollLeft = s = o.scrollLeft - n.scrollSpeed)))
            : ((n.axis && "x" === n.axis) ||
              (t.pageY - C(r).scrollTop() < n.scrollSensitivity
                ? (s = C(r).scrollTop(C(r).scrollTop() - n.scrollSpeed))
                : C(window).height() - (t.pageY - C(r).scrollTop()) <
                n.scrollSensitivity &&
                (s = C(r).scrollTop(C(r).scrollTop() + n.scrollSpeed))),
              (n.axis && "y" === n.axis) ||
              (t.pageX - C(r).scrollLeft() < n.scrollSensitivity
                ? (s = C(r).scrollLeft(C(r).scrollLeft() - n.scrollSpeed))
                : C(window).width() - (t.pageX - C(r).scrollLeft()) <
                n.scrollSensitivity &&
                (s = C(r).scrollLeft(C(r).scrollLeft() + n.scrollSpeed)))),
            !1 !== s &&
            C.ui.ddmanager &&
            !n.dropBehaviour &&
            C.ui.ddmanager.prepareOffsets(i, t);
        },
      }),
      C.ui.plugin.add("draggable", "snap", {
        start: function (t, e, i) {
          var n = i.options;
          (i.snapElements = []),
            C(
              n.snap.constructor !== String
                ? n.snap.items || ":data(ui-draggable)"
                : n.snap
            ).each(function () {
              var t = C(this),
                e = t.offset();
              this !== i.element[0] &&
                i.snapElements.push({
                  item: this,
                  width: t.outerWidth(),
                  height: t.outerHeight(),
                  top: e.top,
                  left: e.left,
                });
            });
        },
        drag: function (t, e, i) {
          var n,
            s,
            o,
            r,
            a,
            l,
            h,
            c,
            u,
            d,
            p = i.options,
            f = p.snapTolerance,
            g = e.offset.left,
            m = g + i.helperProportions.width,
            v = e.offset.top,
            _ = v + i.helperProportions.height;
          for (u = i.snapElements.length - 1; 0 <= u; u--)
            (l =
              (a = i.snapElements[u].left - i.margins.left) +
              i.snapElements[u].width),
              (c =
                (h = i.snapElements[u].top - i.margins.top) +
                i.snapElements[u].height),
              m < a - f ||
                l + f < g ||
                _ < h - f ||
                c + f < v ||
                !C.contains(
                  i.snapElements[u].item.ownerDocument,
                  i.snapElements[u].item
                )
                ? (i.snapElements[u].snapping &&
                  i.options.snap.release &&
                  i.options.snap.release.call(
                    i.element,
                    t,
                    C.extend(i._uiHash(), {
                      snapItem: i.snapElements[u].item,
                    })
                  ),
                  (i.snapElements[u].snapping = !1))
                : ("inner" !== p.snapMode &&
                  ((n = f >= Math.abs(h - _)),
                    (s = f >= Math.abs(c - v)),
                    (o = f >= Math.abs(a - m)),
                    (r = f >= Math.abs(l - g)),
                    n &&
                    (e.position.top = i._convertPositionTo("relative", {
                      top: h - i.helperProportions.height,
                      left: 0,
                    }).top),
                    s &&
                    (e.position.top = i._convertPositionTo("relative", {
                      top: c,
                      left: 0,
                    }).top),
                    o &&
                    (e.position.left = i._convertPositionTo("relative", {
                      top: 0,
                      left: a - i.helperProportions.width,
                    }).left),
                    r &&
                    (e.position.left = i._convertPositionTo("relative", {
                      top: 0,
                      left: l,
                    }).left)),
                  (d = n || s || o || r),
                  "outer" !== p.snapMode &&
                  ((n = f >= Math.abs(h - v)),
                    (s = f >= Math.abs(c - _)),
                    (o = f >= Math.abs(a - g)),
                    (r = f >= Math.abs(l - m)),
                    n &&
                    (e.position.top = i._convertPositionTo("relative", {
                      top: h,
                      left: 0,
                    }).top),
                    s &&
                    (e.position.top = i._convertPositionTo("relative", {
                      top: c - i.helperProportions.height,
                      left: 0,
                    }).top),
                    o &&
                    (e.position.left = i._convertPositionTo("relative", {
                      top: 0,
                      left: a,
                    }).left),
                    r &&
                    (e.position.left = i._convertPositionTo("relative", {
                      top: 0,
                      left: l - i.helperProportions.width,
                    }).left)),
                  !i.snapElements[u].snapping &&
                  (n || s || o || r || d) &&
                  i.options.snap.snap &&
                  i.options.snap.snap.call(
                    i.element,
                    t,
                    C.extend(i._uiHash(), {
                      snapItem: i.snapElements[u].item,
                    })
                  ),
                  (i.snapElements[u].snapping = n || s || o || r || d));
        },
      }),
      C.ui.plugin.add("draggable", "stack", {
        start: function (t, e, i) {
          var n,
            s = i.options,
            o = C.makeArray(C(s.stack)).sort(function (t, e) {
              return (
                (parseInt(C(t).css("zIndex"), 10) || 0) -
                (parseInt(C(e).css("zIndex"), 10) || 0)
              );
            });
          o.length &&
            ((n = parseInt(C(o[0]).css("zIndex"), 10) || 0),
              C(o).each(function (t) {
                C(this).css("zIndex", n + t);
              }),
              this.css("zIndex", n + o.length));
        },
      }),
      C.ui.plugin.add("draggable", "zIndex", {
        start: function (t, e, i) {
          var n = C(e.helper),
            s = i.options;
          n.css("zIndex") && (s._zIndex = n.css("zIndex")),
            n.css("zIndex", s.zIndex);
        },
        stop: function (t, e, i) {
          var n = i.options;
          n._zIndex && C(e.helper).css("zIndex", n._zIndex);
        },
      }),
      C.ui.draggable,
      C.widget("ui.droppable", {
        version: "1.12.1",
        widgetEventPrefix: "drop",
        options: {
          accept: "*",
          addClasses: !0,
          greedy: !1,
          scope: "default",
          tolerance: "intersect",
          activate: null,
          deactivate: null,
          drop: null,
          out: null,
          over: null,
        },
        _create: function () {
          var t,
            e = this.options,
            i = e.accept;
          (this.isover = !1),
            (this.isout = !0),
            (this.accept = C.isFunction(i)
              ? i
              : function (t) {
                return t.is(i);
              }),
            (this.proportions = function () {
              return arguments.length
                ? void (t = arguments[0])
                : t ||
                (t = {
                  width: this.element[0].offsetWidth,
                  height: this.element[0].offsetHeight,
                });
            }),
            this._addToManager(e.scope),
            e.addClasses && this._addClass("ui-droppable");
        },
        _addToManager: function (t) {
          (C.ui.ddmanager.droppables[t] = C.ui.ddmanager.droppables[t] || []),
            C.ui.ddmanager.droppables[t].push(this);
        },
        _splice: function (t) {
          for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1);
        },
        _destroy: function () {
          var t = C.ui.ddmanager.droppables[this.options.scope];
          this._splice(t);
        },
        _setOption: function (t, e) {
          if ("accept" === t)
            this.accept = C.isFunction(e)
              ? e
              : function (t) {
                return t.is(e);
              };
          else if ("scope" === t) {
            var i = C.ui.ddmanager.droppables[this.options.scope];
            this._splice(i), this._addToManager(e);
          }
          this._super(t, e);
        },
        _activate: function (t) {
          var e = C.ui.ddmanager.current;
          this._addActiveClass(), e && this._trigger("activate", t, this.ui(e));
        },
        _deactivate: function (t) {
          var e = C.ui.ddmanager.current;
          this._removeActiveClass(),
            e && this._trigger("deactivate", t, this.ui(e));
        },
        _over: function (t) {
          var e = C.ui.ddmanager.current;
          e &&
            (e.currentItem || e.element)[0] !== this.element[0] &&
            this.accept.call(this.element[0], e.currentItem || e.element) &&
            (this._addHoverClass(), this._trigger("over", t, this.ui(e)));
        },
        _out: function (t) {
          var e = C.ui.ddmanager.current;
          e &&
            (e.currentItem || e.element)[0] !== this.element[0] &&
            this.accept.call(this.element[0], e.currentItem || e.element) &&
            (this._removeHoverClass(), this._trigger("out", t, this.ui(e)));
        },
        _drop: function (e, t) {
          var i = t || C.ui.ddmanager.current,
            n = !1;
          return (
            !(!i || (i.currentItem || i.element)[0] === this.element[0]) &&
            (this.element
              .find(":data(ui-droppable)")
              .not(".ui-draggable-dragging")
              .each(function () {
                var t = C(this).droppable("instance");
                return t.options.greedy &&
                  !t.options.disabled &&
                  t.options.scope === i.options.scope &&
                  t.accept.call(t.element[0], i.currentItem || i.element) &&
                  v(
                    i,
                    C.extend(t, { offset: t.element.offset() }),
                    t.options.tolerance,
                    e
                  )
                  ? !(n = !0)
                  : void 0;
              }),
              !n &&
              !!this.accept.call(this.element[0], i.currentItem || i.element) &&
              (this._removeActiveClass(),
                this._removeHoverClass(),
                this._trigger("drop", e, this.ui(i)),
                this.element))
          );
        },
        ui: function (t) {
          return {
            draggable: t.currentItem || t.element,
            helper: t.helper,
            position: t.position,
            offset: t.positionAbs,
          };
        },
        _addHoverClass: function () {
          this._addClass("ui-droppable-hover");
        },
        _removeHoverClass: function () {
          this._removeClass("ui-droppable-hover");
        },
        _addActiveClass: function () {
          this._addClass("ui-droppable-active");
        },
        _removeActiveClass: function () {
          this._removeClass("ui-droppable-active");
        },
      });
    var v = (C.ui.intersect = function (t, e, i, n) {
      if (!e.offset) return !1;
      var s = (t.positionAbs || t.position.absolute).left + t.margins.left,
        o = (t.positionAbs || t.position.absolute).top + t.margins.top,
        r = s + t.helperProportions.width,
        a = o + t.helperProportions.height,
        l = e.offset.left,
        h = e.offset.top,
        c = l + e.proportions().width,
        u = h + e.proportions().height;
      switch (i) {
        case "fit":
          return l <= s && r <= c && h <= o && a <= u;
        case "intersect":
          return (
            s + t.helperProportions.width / 2 > l &&
            c > r - t.helperProportions.width / 2 &&
            o + t.helperProportions.height / 2 > h &&
            u > a - t.helperProportions.height / 2
          );
        case "pointer":
          return (
            _(n.pageY, h, e.proportions().height) &&
            _(n.pageX, l, e.proportions().width)
          );
        case "touch":
          return (
            ((h <= o && o <= u) || (h <= a && a <= u) || (o < h && u < a)) &&
            ((l <= s && s <= c) || (l <= r && r <= c) || (s < l && c < r))
          );
        default:
          return !1;
      }
    });
    function _(t, e, i) {
      return e <= t && t < e + i;
    }
    !(C.ui.ddmanager = {
      current: null,
      droppables: { default: [] },
      prepareOffsets: function (t, e) {
        var i,
          n,
          s = C.ui.ddmanager.droppables[t.options.scope] || [],
          o = e ? e.type : null,
          r = (t.currentItem || t.element)
            .find(":data(ui-droppable)")
            .addBack();
        t: for (i = 0; s.length > i; i++)
          if (
            !(
              s[i].options.disabled ||
              (t &&
                !s[i].accept.call(s[i].element[0], t.currentItem || t.element))
            )
          ) {
            for (n = 0; r.length > n; n++)
              if (r[n] === s[i].element[0]) {
                s[i].proportions().height = 0;
                continue t;
              }
            (s[i].visible = "none" !== s[i].element.css("display")),
              s[i].visible &&
              ("mousedown" === o && s[i]._activate.call(s[i], e),
                (s[i].offset = s[i].element.offset()),
                s[i].proportions({
                  width: s[i].element[0].offsetWidth,
                  height: s[i].element[0].offsetHeight,
                }));
          }
      },
      drop: function (t, e) {
        var i = !1;
        return (
          C.each(
            (C.ui.ddmanager.droppables[t.options.scope] || []).slice(),
            function () {
              this.options &&
                (!this.options.disabled &&
                  this.visible &&
                  v(t, this, this.options.tolerance, e) &&
                  (i = this._drop.call(this, e) || i),
                  !this.options.disabled &&
                  this.visible &&
                  this.accept.call(
                    this.element[0],
                    t.currentItem || t.element
                  ) &&
                  ((this.isout = !0),
                    (this.isover = !1),
                    this._deactivate.call(this, e)));
            }
          ),
          i
        );
      },
      dragStart: function (t, e) {
        t.element.parentsUntil("body").on("scroll.droppable", function () {
          t.options.refreshPositions || C.ui.ddmanager.prepareOffsets(t, e);
        });
      },
      drag: function (o, r) {
        o.options.refreshPositions && C.ui.ddmanager.prepareOffsets(o, r),
          C.each(C.ui.ddmanager.droppables[o.options.scope] || [], function () {
            if (!this.options.disabled && !this.greedyChild && this.visible) {
              var t,
                e,
                i,
                n = v(o, this, this.options.tolerance, r),
                s =
                  !n && this.isover
                    ? "isout"
                    : n && !this.isover
                      ? "isover"
                      : null;
              s &&
                (this.options.greedy &&
                  ((e = this.options.scope),
                    (i = this.element
                      .parents(":data(ui-droppable)")
                      .filter(function () {
                        return C(this).droppable("instance").options.scope === e;
                      })).length &&
                    ((t = C(i[0]).droppable("instance")).greedyChild =
                      "isover" === s)),
                  t &&
                  "isover" === s &&
                  ((t.isover = !1), (t.isout = !0), t._out.call(t, r)),
                  (this[s] = !0),
                  (this["isout" === s ? "isover" : "isout"] = !1),
                  this["isover" === s ? "_over" : "_out"].call(this, r),
                  t &&
                  "isout" === s &&
                  ((t.isout = !1), (t.isover = !0), t._over.call(t, r)));
            }
          });
      },
      dragStop: function (t, e) {
        t.element.parentsUntil("body").off("scroll.droppable"),
          t.options.refreshPositions || C.ui.ddmanager.prepareOffsets(t, e);
      },
    }) !== C.uiBackCompat &&
      C.widget("ui.droppable", C.ui.droppable, {
        options: { hoverClass: !1, activeClass: !1 },
        _addActiveClass: function () {
          this._super(),
            this.options.activeClass &&
            this.element.addClass(this.options.activeClass);
        },
        _removeActiveClass: function () {
          this._super(),
            this.options.activeClass &&
            this.element.removeClass(this.options.activeClass);
        },
        _addHoverClass: function () {
          this._super(),
            this.options.hoverClass &&
            this.element.addClass(this.options.hoverClass);
        },
        _removeHoverClass: function () {
          this._super(),
            this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass);
        },
      }),
      C.ui.droppable,
      C.widget("ui.resizable", C.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "resize",
        options: {
          alsoResize: !1,
          animate: !1,
          animateDuration: "slow",
          animateEasing: "swing",
          aspectRatio: !1,
          autoHide: !1,
          classes: {
            "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se",
          },
          containment: !1,
          ghost: !1,
          grid: !1,
          handles: "e,s,se",
          helper: !1,
          maxHeight: null,
          maxWidth: null,
          minHeight: 10,
          minWidth: 10,
          zIndex: 90,
          resize: null,
          start: null,
          stop: null,
        },
        _num: function (t) {
          return parseFloat(t) || 0;
        },
        _isNumber: function (t) {
          return !isNaN(parseFloat(t));
        },
        _hasScroll: function (t, e) {
          if ("hidden" === C(t).css("overflow")) return !1;
          var i = e && "left" === e ? "scrollLeft" : "scrollTop",
            n = !1;
          return 0 < t[i] || ((t[i] = 1), (n = 0 < t[i]), (t[i] = 0), n);
        },
        _create: function () {
          var t,
            e = this.options,
            i = this;
          this._addClass("ui-resizable"),
            C.extend(this, {
              _aspectRatio: !!e.aspectRatio,
              aspectRatio: e.aspectRatio,
              originalElement: this.element,
              _proportionallyResizeElements: [],
              _helper:
                e.helper || e.ghost || e.animate
                  ? e.helper || "ui-resizable-helper"
                  : null,
            }),
            this.element[0].nodeName.match(
              /^(canvas|textarea|input|select|button|img)$/i
            ) &&
            (this.element.wrap(
              C(
                "<div class='ui-wrapper' style='overflow: hidden;'></div>"
              ).css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left"),
              })
            ),
              (this.element = this.element
                .parent()
                .data("ui-resizable", this.element.resizable("instance"))),
              (this.elementIsWrapper = !0),
              (t = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft"),
              }),
              this.element.css(t),
              this.originalElement.css("margin", 0),
              (this.originalResizeStyle = this.originalElement.css("resize")),
              this.originalElement.css("resize", "none"),
              this._proportionallyResizeElements.push(
                this.originalElement.css({
                  position: "static",
                  zoom: 1,
                  display: "block",
                })
              ),
              this.originalElement.css(t),
              this._proportionallyResize()),
            this._setupHandles(),
            e.autoHide &&
            C(this.element)
              .on("mouseenter", function () {
                e.disabled ||
                  (i._removeClass("ui-resizable-autohide"),
                    i._handles.show());
              })
              .on("mouseleave", function () {
                e.disabled ||
                  i.resizing ||
                  (i._addClass("ui-resizable-autohide"), i._handles.hide());
              }),
            this._mouseInit();
        },
        _destroy: function () {
          this._mouseDestroy();
          function t(t) {
            C(t)
              .removeData("resizable")
              .removeData("ui-resizable")
              .off(".resizable")
              .find(".ui-resizable-handle")
              .remove();
          }
          var e;
          return (
            this.elementIsWrapper &&
            (t(this.element),
              (e = this.element),
              this.originalElement
                .css({
                  position: e.css("position"),
                  width: e.outerWidth(),
                  height: e.outerHeight(),
                  top: e.css("top"),
                  left: e.css("left"),
                })
                .insertAfter(e),
              e.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            t(this.originalElement),
            this
          );
        },
        _setOption: function (t, e) {
          switch ((this._super(t, e), t)) {
            case "handles":
              this._removeHandles(), this._setupHandles();
          }
        },
        _setupHandles: function () {
          var t,
            e,
            i,
            n,
            s,
            o = this.options,
            r = this;
          if (
            ((this.handles =
              o.handles ||
              (C(".ui-resizable-handle", this.element).length
                ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw",
                }
                : "e,s,se")),
              (this._handles = C()),
              this.handles.constructor === String)
          )
            for (
              "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
              i = this.handles.split(","),
              this.handles = {},
              e = 0;
              i.length > e;
              e++
            )
              (n = "ui-resizable-" + (t = C.trim(i[e]))),
                (s = C("<div>")),
                this._addClass(s, "ui-resizable-handle " + n),
                s.css({ zIndex: o.zIndex }),
                (this.handles[t] = ".ui-resizable-" + t),
                this.element.append(s);
          (this._renderAxis = function (t) {
            var e, i, n, s;
            for (e in ((t = t || this.element), this.handles))
              this.handles[e].constructor === String
                ? (this.handles[e] = this.element
                  .children(this.handles[e])
                  .first()
                  .show())
                : (this.handles[e].jquery || this.handles[e].nodeType) &&
                ((this.handles[e] = C(this.handles[e])),
                  this._on(this.handles[e], { mousedown: r._mouseDown })),
                this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /^(textarea|input|select|button)$/i
                ) &&
                ((i = C(this.handles[e], this.element)),
                  (s = /sw|ne|nw|se|n|s/.test(e)
                    ? i.outerHeight()
                    : i.outerWidth()),
                  (n = [
                    "padding",
                    /ne|nw|n/.test(e)
                      ? "Top"
                      : /se|sw|s/.test(e)
                        ? "Bottom"
                        : /^e$/.test(e)
                          ? "Right"
                          : "Left",
                  ].join("")),
                  t.css(n, s),
                  this._proportionallyResize()),
                (this._handles = this._handles.add(this.handles[e]));
          }),
            this._renderAxis(this.element),
            (this._handles = this._handles.add(
              this.element.find(".ui-resizable-handle")
            )),
            this._handles.disableSelection(),
            this._handles.on("mouseover", function () {
              r.resizing ||
                (this.className &&
                  (s = this.className.match(
                    /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                  )),
                  (r.axis = s && s[1] ? s[1] : "se"));
            }),
            o.autoHide &&
            (this._handles.hide(), this._addClass("ui-resizable-autohide"));
        },
        _removeHandles: function () {
          this._handles.remove();
        },
        _mouseCapture: function (t) {
          var e,
            i,
            n = !1;
          for (e in this.handles)
            ((i = C(this.handles[e])[0]) !== t.target &&
              !C.contains(i, t.target)) ||
              (n = !0);
          return !this.options.disabled && n;
        },
        _mouseStart: function (t) {
          var e,
            i,
            n,
            s = this.options,
            o = this.element;
          return (
            (this.resizing = !0),
            this._renderProxy(),
            (e = this._num(this.helper.css("left"))),
            (i = this._num(this.helper.css("top"))),
            s.containment &&
            ((e += C(s.containment).scrollLeft() || 0),
              (i += C(s.containment).scrollTop() || 0)),
            (this.offset = this.helper.offset()),
            (this.position = { left: e, top: i }),
            (this.size = this._helper
              ? { width: this.helper.width(), height: this.helper.height() }
              : { width: o.width(), height: o.height() }),
            (this.originalSize = this._helper
              ? { width: o.outerWidth(), height: o.outerHeight() }
              : { width: o.width(), height: o.height() }),
            (this.sizeDiff = {
              width: o.outerWidth() - o.width(),
              height: o.outerHeight() - o.height(),
            }),
            (this.originalPosition = { left: e, top: i }),
            (this.originalMousePosition = { left: t.pageX, top: t.pageY }),
            (this.aspectRatio =
              "number" == typeof s.aspectRatio
                ? s.aspectRatio
                : this.originalSize.width / this.originalSize.height || 1),
            (n = C(".ui-resizable-" + this.axis).css("cursor")),
            C("body").css("cursor", "auto" === n ? this.axis + "-resize" : n),
            this._addClass("ui-resizable-resizing"),
            this._propagate("start", t),
            !0
          );
        },
        _mouseDrag: function (t) {
          var e,
            i,
            n = this.originalMousePosition,
            s = this.axis,
            o = t.pageX - n.left || 0,
            r = t.pageY - n.top || 0,
            a = this._change[s];
          return (
            this._updatePrevProperties(),
            a &&
            ((e = a.apply(this, [t, o, r])),
              this._updateVirtualBoundaries(t.shiftKey),
              (this._aspectRatio || t.shiftKey) &&
              (e = this._updateRatio(e, t)),
              (e = this._respectSize(e, t)),
              this._updateCache(e),
              this._propagate("resize", t),
              (i = this._applyChanges()),
              !this._helper &&
              this._proportionallyResizeElements.length &&
              this._proportionallyResize(),
              C.isEmptyObject(i) ||
              (this._updatePrevProperties(),
                this._trigger("resize", t, this.ui()),
                this._applyChanges())),
            !1
          );
        },
        _mouseStop: function (t) {
          this.resizing = !1;
          var e,
            i,
            n,
            s,
            o,
            r,
            a,
            l = this.options,
            h = this;
          return (
            this._helper &&
            ((n =
              (i =
                (e = this._proportionallyResizeElements).length &&
                /textarea/i.test(e[0].nodeName)) &&
                this._hasScroll(e[0], "left")
                ? 0
                : h.sizeDiff.height),
              (s = i ? 0 : h.sizeDiff.width),
              (o = {
                width: h.helper.width() - s,
                height: h.helper.height() - n,
              }),
              (r =
                parseFloat(h.element.css("left")) +
                (h.position.left - h.originalPosition.left) || null),
              (a =
                parseFloat(h.element.css("top")) +
                (h.position.top - h.originalPosition.top) || null),
              l.animate || this.element.css(C.extend(o, { top: a, left: r })),
              h.helper.height(h.size.height),
              h.helper.width(h.size.width),
              this._helper && !l.animate && this._proportionallyResize()),
            C("body").css("cursor", "auto"),
            this._removeClass("ui-resizable-resizing"),
            this._propagate("stop", t),
            this._helper && this.helper.remove(),
            !1
          );
        },
        _updatePrevProperties: function () {
          (this.prevPosition = {
            top: this.position.top,
            left: this.position.left,
          }),
            (this.prevSize = {
              width: this.size.width,
              height: this.size.height,
            });
        },
        _applyChanges: function () {
          var t = {};
          return (
            this.position.top !== this.prevPosition.top &&
            (t.top = this.position.top + "px"),
            this.position.left !== this.prevPosition.left &&
            (t.left = this.position.left + "px"),
            this.size.width !== this.prevSize.width &&
            (t.width = this.size.width + "px"),
            this.size.height !== this.prevSize.height &&
            (t.height = this.size.height + "px"),
            this.helper.css(t),
            t
          );
        },
        _updateVirtualBoundaries: function (t) {
          var e,
            i,
            n,
            s,
            o,
            r = this.options;
          (o = {
            minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
            maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0,
            minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
            maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0,
          }),
            (this._aspectRatio || t) &&
            ((e = o.minHeight * this.aspectRatio),
              (n = o.minWidth / this.aspectRatio),
              (i = o.maxHeight * this.aspectRatio),
              (s = o.maxWidth / this.aspectRatio),
              e > o.minWidth && (o.minWidth = e),
              n > o.minHeight && (o.minHeight = n),
              o.maxWidth > i && (o.maxWidth = i),
              o.maxHeight > s && (o.maxHeight = s)),
            (this._vBoundaries = o);
        },
        _updateCache: function (t) {
          (this.offset = this.helper.offset()),
            this._isNumber(t.left) && (this.position.left = t.left),
            this._isNumber(t.top) && (this.position.top = t.top),
            this._isNumber(t.height) && (this.size.height = t.height),
            this._isNumber(t.width) && (this.size.width = t.width);
        },
        _updateRatio: function (t) {
          var e = this.position,
            i = this.size,
            n = this.axis;
          return (
            this._isNumber(t.height)
              ? (t.width = t.height * this.aspectRatio)
              : this._isNumber(t.width) &&
              (t.height = t.width / this.aspectRatio),
            "sw" === n &&
            ((t.left = e.left + (i.width - t.width)), (t.top = null)),
            "nw" === n &&
            ((t.top = e.top + (i.height - t.height)),
              (t.left = e.left + (i.width - t.width))),
            t
          );
        },
        _respectSize: function (t) {
          var e = this._vBoundaries,
            i = this.axis,
            n = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
            s =
              this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
            o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
            r =
              this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
            a = this.originalPosition.left + this.originalSize.width,
            l = this.originalPosition.top + this.originalSize.height,
            h = /sw|nw|w/.test(i),
            c = /nw|ne|n/.test(i);
          return (
            o && (t.width = e.minWidth),
            r && (t.height = e.minHeight),
            n && (t.width = e.maxWidth),
            s && (t.height = e.maxHeight),
            o && h && (t.left = a - e.minWidth),
            n && h && (t.left = a - e.maxWidth),
            r && c && (t.top = l - e.minHeight),
            s && c && (t.top = l - e.maxHeight),
            t.width || t.height || t.left || !t.top
              ? t.width || t.height || t.top || !t.left || (t.left = null)
              : (t.top = null),
            t
          );
        },
        _getPaddingPlusBorderDimensions: function (t) {
          for (
            var e = 0,
            i = [],
            n = [
              t.css("borderTopWidth"),
              t.css("borderRightWidth"),
              t.css("borderBottomWidth"),
              t.css("borderLeftWidth"),
            ],
            s = [
              t.css("paddingTop"),
              t.css("paddingRight"),
              t.css("paddingBottom"),
              t.css("paddingLeft"),
            ];
            e < 4;
            e++
          )
            (i[e] = parseFloat(n[e]) || 0), (i[e] += parseFloat(s[e]) || 0);
          return { height: i[0] + i[2], width: i[1] + i[3] };
        },
        _proportionallyResize: function () {
          if (this._proportionallyResizeElements.length)
            for (
              var t, e = 0, i = this.helper || this.element;
              this._proportionallyResizeElements.length > e;
              e++
            )
              (t = this._proportionallyResizeElements[e]),
                this.outerDimensions ||
                (this.outerDimensions =
                  this._getPaddingPlusBorderDimensions(t)),
                t.css({
                  height: i.height() - this.outerDimensions.height || 0,
                  width: i.width() - this.outerDimensions.width || 0,
                });
        },
        _renderProxy: function () {
          var t = this.element,
            e = this.options;
          (this.elementOffset = t.offset()),
            this._helper
              ? ((this.helper =
                this.helper || C("<div style='overflow:hidden;'></div>")),
                this._addClass(this.helper, this._helper),
                this.helper.css({
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  position: "absolute",
                  left: this.elementOffset.left + "px",
                  top: this.elementOffset.top + "px",
                  zIndex: ++e.zIndex,
                }),
                this.helper.appendTo("body").disableSelection())
              : (this.helper = this.element);
        },
        _change: {
          e: function (t, e) {
            return { width: this.originalSize.width + e };
          },
          w: function (t, e) {
            var i = this.originalSize;
            return { left: this.originalPosition.left + e, width: i.width - e };
          },
          n: function (t, e, i) {
            var n = this.originalSize;
            return { top: this.originalPosition.top + i, height: n.height - i };
          },
          s: function (t, e, i) {
            return { height: this.originalSize.height + i };
          },
          se: function (t, e, i) {
            return C.extend(
              this._change.s.apply(this, arguments),
              this._change.e.apply(this, [t, e, i])
            );
          },
          sw: function (t, e, i) {
            return C.extend(
              this._change.s.apply(this, arguments),
              this._change.w.apply(this, [t, e, i])
            );
          },
          ne: function (t, e, i) {
            return C.extend(
              this._change.n.apply(this, arguments),
              this._change.e.apply(this, [t, e, i])
            );
          },
          nw: function (t, e, i) {
            return C.extend(
              this._change.n.apply(this, arguments),
              this._change.w.apply(this, [t, e, i])
            );
          },
        },
        _propagate: function (t, e) {
          C.ui.plugin.call(this, t, [e, this.ui()]),
            "resize" !== t && this._trigger(t, e, this.ui());
        },
        plugins: {},
        ui: function () {
          return {
            originalElement: this.originalElement,
            element: this.element,
            helper: this.helper,
            position: this.position,
            size: this.size,
            originalSize: this.originalSize,
            originalPosition: this.originalPosition,
          };
        },
      }),
      C.ui.plugin.add("resizable", "animate", {
        stop: function (e) {
          var i = C(this).resizable("instance"),
            t = i.options,
            n = i._proportionallyResizeElements,
            s = n.length && /textarea/i.test(n[0].nodeName),
            o = s && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
            r = s ? 0 : i.sizeDiff.width,
            a = { width: i.size.width - r, height: i.size.height - o },
            l =
              parseFloat(i.element.css("left")) +
              (i.position.left - i.originalPosition.left) || null,
            h =
              parseFloat(i.element.css("top")) +
              (i.position.top - i.originalPosition.top) || null;
          i.element.animate(C.extend(a, h && l ? { top: h, left: l } : {}), {
            duration: t.animateDuration,
            easing: t.animateEasing,
            step: function () {
              var t = {
                width: parseFloat(i.element.css("width")),
                height: parseFloat(i.element.css("height")),
                top: parseFloat(i.element.css("top")),
                left: parseFloat(i.element.css("left")),
              };
              n &&
                n.length &&
                C(n[0]).css({ width: t.width, height: t.height }),
                i._updateCache(t),
                i._propagate("resize", e);
            },
          });
        },
      }),
      C.ui.plugin.add("resizable", "containment", {
        start: function () {
          var i,
            n,
            t,
            e,
            s,
            o,
            r,
            a = C(this).resizable("instance"),
            l = a.options,
            h = a.element,
            c = l.containment,
            u =
              c instanceof C
                ? c.get(0)
                : /parent/.test(c)
                  ? h.parent().get(0)
                  : c;
          u &&
            ((a.containerElement = C(u)),
              /document/.test(c) || c === document
                ? ((a.containerOffset = { left: 0, top: 0 }),
                  (a.containerPosition = { left: 0, top: 0 }),
                  (a.parentData = {
                    element: C(document),
                    left: 0,
                    top: 0,
                    width: C(document).width(),
                    height:
                      C(document).height() ||
                      document.body.parentNode.scrollHeight,
                  }))
                : ((i = C(u)),
                  (n = []),
                  C(["Top", "Right", "Left", "Bottom"]).each(function (t, e) {
                    n[t] = a._num(i.css("padding" + e));
                  }),
                  (a.containerOffset = i.offset()),
                  (a.containerPosition = i.position()),
                  (a.containerSize = {
                    height: i.innerHeight() - n[3],
                    width: i.innerWidth() - n[1],
                  }),
                  (t = a.containerOffset),
                  (e = a.containerSize.height),
                  (s = a.containerSize.width),
                  (o = a._hasScroll(u, "left") ? u.scrollWidth : s),
                  (r = a._hasScroll(u) ? u.scrollHeight : e),
                  (a.parentData = {
                    element: u,
                    left: t.left,
                    top: t.top,
                    width: o,
                    height: r,
                  })));
        },
        resize: function (t) {
          var e,
            i,
            n,
            s,
            o = C(this).resizable("instance"),
            r = o.options,
            a = o.containerOffset,
            l = o.position,
            h = o._aspectRatio || t.shiftKey,
            c = { top: 0, left: 0 },
            u = o.containerElement,
            d = !0;
          u[0] !== document && /static/.test(u.css("position")) && (c = a),
            l.left < (o._helper ? a.left : 0) &&
            ((o.size.width =
              o.size.width +
              (o._helper
                ? o.position.left - a.left
                : o.position.left - c.left)),
              h && ((o.size.height = o.size.width / o.aspectRatio), (d = !1)),
              (o.position.left = r.helper ? a.left : 0)),
            l.top < (o._helper ? a.top : 0) &&
            ((o.size.height =
              o.size.height +
              (o._helper ? o.position.top - a.top : o.position.top)),
              h && ((o.size.width = o.size.height * o.aspectRatio), (d = !1)),
              (o.position.top = o._helper ? a.top : 0)),
            (n = o.containerElement.get(0) === o.element.parent().get(0)),
            (s = /relative|absolute/.test(o.containerElement.css("position"))),
            n && s
              ? ((o.offset.left = o.parentData.left + o.position.left),
                (o.offset.top = o.parentData.top + o.position.top))
              : ((o.offset.left = o.element.offset().left),
                (o.offset.top = o.element.offset().top)),
            (e = Math.abs(
              o.sizeDiff.width +
              (o._helper ? o.offset.left - c.left : o.offset.left - a.left)
            )),
            (i = Math.abs(
              o.sizeDiff.height +
              (o._helper ? o.offset.top - c.top : o.offset.top - a.top)
            )),
            e + o.size.width >= o.parentData.width &&
            ((o.size.width = o.parentData.width - e),
              h && ((o.size.height = o.size.width / o.aspectRatio), (d = !1))),
            i + o.size.height >= o.parentData.height &&
            ((o.size.height = o.parentData.height - i),
              h && ((o.size.width = o.size.height * o.aspectRatio), (d = !1))),
            d ||
            ((o.position.left = o.prevPosition.left),
              (o.position.top = o.prevPosition.top),
              (o.size.width = o.prevSize.width),
              (o.size.height = o.prevSize.height));
        },
        stop: function () {
          var t = C(this).resizable("instance"),
            e = t.options,
            i = t.containerOffset,
            n = t.containerPosition,
            s = t.containerElement,
            o = C(t.helper),
            r = o.offset(),
            a = o.outerWidth() - t.sizeDiff.width,
            l = o.outerHeight() - t.sizeDiff.height;
          t._helper &&
            !e.animate &&
            /relative/.test(s.css("position")) &&
            C(this).css({
              left: r.left - n.left - i.left,
              width: a,
              height: l,
            }),
            t._helper &&
            !e.animate &&
            /static/.test(s.css("position")) &&
            C(this).css({
              left: r.left - n.left - i.left,
              width: a,
              height: l,
            });
        },
      }),
      C.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
          var t = C(this).resizable("instance").options;
          C(t.alsoResize).each(function () {
            var t = C(this);
            t.data("ui-resizable-alsoresize", {
              width: parseFloat(t.width()),
              height: parseFloat(t.height()),
              left: parseFloat(t.css("left")),
              top: parseFloat(t.css("top")),
            });
          });
        },
        resize: function (t, i) {
          var e = C(this).resizable("instance"),
            n = e.options,
            s = e.originalSize,
            o = e.originalPosition,
            r = {
              height: e.size.height - s.height || 0,
              width: e.size.width - s.width || 0,
              top: e.position.top - o.top || 0,
              left: e.position.left - o.left || 0,
            };
          C(n.alsoResize).each(function () {
            var t = C(this),
              n = C(this).data("ui-resizable-alsoresize"),
              s = {},
              e = t.parents(i.originalElement[0]).length
                ? ["width", "height"]
                : ["width", "height", "top", "left"];
            C.each(e, function (t, e) {
              var i = (n[e] || 0) + (r[e] || 0);
              i && 0 <= i && (s[e] = i || null);
            }),
              t.css(s);
          });
        },
        stop: function () {
          C(this).removeData("ui-resizable-alsoresize");
        },
      }),
      C.ui.plugin.add("resizable", "ghost", {
        start: function () {
          var t = C(this).resizable("instance"),
            e = t.size;
          (t.ghost = t.originalElement.clone()),
            t.ghost.css({
              opacity: 0.25,
              display: "block",
              position: "relative",
              height: e.height,
              width: e.width,
              margin: 0,
              left: 0,
              top: 0,
            }),
            t._addClass(t.ghost, "ui-resizable-ghost"),
            !1 !== C.uiBackCompat &&
            "string" == typeof t.options.ghost &&
            t.ghost.addClass(this.options.ghost),
            t.ghost.appendTo(t.helper);
        },
        resize: function () {
          var t = C(this).resizable("instance");
          t.ghost &&
            t.ghost.css({
              position: "relative",
              height: t.size.height,
              width: t.size.width,
            });
        },
        stop: function () {
          var t = C(this).resizable("instance");
          t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));
        },
      }),
      C.ui.plugin.add("resizable", "grid", {
        resize: function () {
          var t,
            e = C(this).resizable("instance"),
            i = e.options,
            n = e.size,
            s = e.originalSize,
            o = e.originalPosition,
            r = e.axis,
            a = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
            l = a[0] || 1,
            h = a[1] || 1,
            c = Math.round((n.width - s.width) / l) * l,
            u = Math.round((n.height - s.height) / h) * h,
            d = s.width + c,
            p = s.height + u,
            f = i.maxWidth && d > i.maxWidth,
            g = i.maxHeight && p > i.maxHeight,
            m = i.minWidth && i.minWidth > d,
            v = i.minHeight && i.minHeight > p;
          (i.grid = a),
            m && (d += l),
            v && (p += h),
            f && (d -= l),
            g && (p -= h),
            /^(se|s|e)$/.test(r)
              ? ((e.size.width = d), (e.size.height = p))
              : /^(ne)$/.test(r)
                ? ((e.size.width = d),
                  (e.size.height = p),
                  (e.position.top = o.top - u))
                : /^(sw)$/.test(r)
                  ? ((e.size.width = d),
                    (e.size.height = p),
                    (e.position.left = o.left - c))
                  : ((p - h <= 0 || d - l <= 0) &&
                    (t = e._getPaddingPlusBorderDimensions(this)),
                    0 < p - h
                      ? ((e.size.height = p), (e.position.top = o.top - u))
                      : ((p = h - t.height),
                        (e.size.height = p),
                        (e.position.top = o.top + s.height - p)),
                    0 < d - l
                      ? ((e.size.width = d), (e.position.left = o.left - c))
                      : ((d = l - t.width),
                        (e.size.width = d),
                        (e.position.left = o.left + s.width - d)));
        },
      }),
      C.ui.resizable,
      C.widget("ui.selectable", C.ui.mouse, {
        version: "1.12.1",
        options: {
          appendTo: "body",
          autoRefresh: !0,
          distance: 0,
          filter: "*",
          tolerance: "touch",
          selected: null,
          selecting: null,
          start: null,
          stop: null,
          unselected: null,
          unselecting: null,
        },
        _create: function () {
          var n = this;
          this._addClass("ui-selectable"),
            (this.dragged = !1),
            (this.refresh = function () {
              (n.elementPos = C(n.element[0]).offset()),
                (n.selectees = C(n.options.filter, n.element[0])),
                n._addClass(n.selectees, "ui-selectee"),
                n.selectees.each(function () {
                  var t = C(this),
                    e = t.offset(),
                    i = {
                      left: e.left - n.elementPos.left,
                      top: e.top - n.elementPos.top,
                    };
                  C.data(this, "selectable-item", {
                    element: this,
                    $element: t,
                    left: i.left,
                    top: i.top,
                    right: i.left + t.outerWidth(),
                    bottom: i.top + t.outerHeight(),
                    startselected: !1,
                    selected: t.hasClass("ui-selected"),
                    selecting: t.hasClass("ui-selecting"),
                    unselecting: t.hasClass("ui-unselecting"),
                  });
                });
            }),
            this.refresh(),
            this._mouseInit(),
            (this.helper = C("<div>")),
            this._addClass(this.helper, "ui-selectable-helper");
        },
        _destroy: function () {
          this.selectees.removeData("selectable-item"), this._mouseDestroy();
        },
        _mouseStart: function (i) {
          var n = this,
            t = this.options;
          (this.opos = [i.pageX, i.pageY]),
            (this.elementPos = C(this.element[0]).offset()),
            this.options.disabled ||
            ((this.selectees = C(t.filter, this.element[0])),
              this._trigger("start", i),
              C(t.appendTo).append(this.helper),
              this.helper.css({
                left: i.pageX,
                top: i.pageY,
                width: 0,
                height: 0,
              }),
              t.autoRefresh && this.refresh(),
              this.selectees.filter(".ui-selected").each(function () {
                var t = C.data(this, "selectable-item");
                (t.startselected = !0),
                  i.metaKey ||
                  i.ctrlKey ||
                  (n._removeClass(t.$element, "ui-selected"),
                    (t.selected = !1),
                    n._addClass(t.$element, "ui-unselecting"),
                    (t.unselecting = !0),
                    n._trigger("unselecting", i, { unselecting: t.element }));
              }),
              C(i.target)
                .parents()
                .addBack()
                .each(function () {
                  var t,
                    e = C.data(this, "selectable-item");
                  return e
                    ? ((t =
                      (!i.metaKey && !i.ctrlKey) ||
                      !e.$element.hasClass("ui-selected")),
                      n
                        ._removeClass(
                          e.$element,
                          t ? "ui-unselecting" : "ui-selected"
                        )
                        ._addClass(
                          e.$element,
                          t ? "ui-selecting" : "ui-unselecting"
                        ),
                      (e.unselecting = !t),
                      (e.selecting = t),
                      (e.selected = t)
                        ? n._trigger("selecting", i, { selecting: e.element })
                        : n._trigger("unselecting", i, {
                          unselecting: e.element,
                        }),
                      !1)
                    : void 0;
                }));
        },
        _mouseDrag: function (n) {
          if (((this.dragged = !0), !this.options.disabled)) {
            var t,
              s = this,
              o = this.options,
              r = this.opos[0],
              a = this.opos[1],
              l = n.pageX,
              h = n.pageY;
            return (
              l < r && ((t = l), (l = r), (r = t)),
              h < a && ((t = h), (h = a), (a = t)),
              this.helper.css({ left: r, top: a, width: l - r, height: h - a }),
              this.selectees.each(function () {
                var t = C.data(this, "selectable-item"),
                  e = !1,
                  i = {};
                t &&
                  t.element !== s.element[0] &&
                  ((i.left = t.left + s.elementPos.left),
                    (i.right = t.right + s.elementPos.left),
                    (i.top = t.top + s.elementPos.top),
                    (i.bottom = t.bottom + s.elementPos.top),
                    "touch" === o.tolerance
                      ? (e = !(
                        i.left > l ||
                        r > i.right ||
                        i.top > h ||
                        a > i.bottom
                      ))
                      : "fit" === o.tolerance &&
                      (e =
                        i.left > r && l > i.right && i.top > a && h > i.bottom),
                    e
                      ? (t.selected &&
                        (s._removeClass(t.$element, "ui-selected"),
                          (t.selected = !1)),
                        t.unselecting &&
                        (s._removeClass(t.$element, "ui-unselecting"),
                          (t.unselecting = !1)),
                        t.selecting ||
                        (s._addClass(t.$element, "ui-selecting"),
                          (t.selecting = !0),
                          s._trigger("selecting", n, { selecting: t.element })))
                      : (t.selecting &&
                        ((n.metaKey || n.ctrlKey) && t.startselected
                          ? (s._removeClass(t.$element, "ui-selecting"),
                            (t.selecting = !1),
                            s._addClass(t.$element, "ui-selected"),
                            (t.selected = !0))
                          : (s._removeClass(t.$element, "ui-selecting"),
                            (t.selecting = !1),
                            t.startselected &&
                            (s._addClass(t.$element, "ui-unselecting"),
                              (t.unselecting = !0)),
                            s._trigger("unselecting", n, {
                              unselecting: t.element,
                            }))),
                        t.selected &&
                        (n.metaKey ||
                          n.ctrlKey ||
                          t.startselected ||
                          (s._removeClass(t.$element, "ui-selected"),
                            (t.selected = !1),
                            s._addClass(t.$element, "ui-unselecting"),
                            (t.unselecting = !0),
                            s._trigger("unselecting", n, {
                              unselecting: t.element,
                            })))));
              }),
              !1
            );
          }
        },
        _mouseStop: function (e) {
          var i = this;
          return (
            (this.dragged = !1),
            C(".ui-unselecting", this.element[0]).each(function () {
              var t = C.data(this, "selectable-item");
              i._removeClass(t.$element, "ui-unselecting"),
                (t.unselecting = !1),
                (t.startselected = !1),
                i._trigger("unselected", e, { unselected: t.element });
            }),
            C(".ui-selecting", this.element[0]).each(function () {
              var t = C.data(this, "selectable-item");
              i
                ._removeClass(t.$element, "ui-selecting")
                ._addClass(t.$element, "ui-selected"),
                (t.selecting = !1),
                (t.selected = !0),
                (t.startselected = !0),
                i._trigger("selected", e, { selected: t.element });
            }),
            this._trigger("stop", e),
            this.helper.remove(),
            !1
          );
        },
      }),
      C.widget("ui.sortable", C.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
          appendTo: "parent",
          axis: !1,
          connectWith: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          dropOnEmpty: !0,
          forcePlaceholderSize: !1,
          forceHelperSize: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          items: "> *",
          opacity: !1,
          placeholder: !1,
          revert: !1,
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          scope: "default",
          tolerance: "intersect",
          zIndex: 1e3,
          activate: null,
          beforeStop: null,
          change: null,
          deactivate: null,
          out: null,
          over: null,
          receive: null,
          remove: null,
          sort: null,
          start: null,
          stop: null,
          update: null,
        },
        _isOverAxis: function (t, e, i) {
          return e <= t && t < e + i;
        },
        _isFloating: function (t) {
          return (
            /left|right/.test(t.css("float")) ||
            /inline|table-cell/.test(t.css("display"))
          );
        },
        _create: function () {
          (this.containerCache = {}),
            this._addClass("ui-sortable"),
            this.refresh(),
            (this.offset = this.element.offset()),
            this._mouseInit(),
            this._setHandleClassName(),
            (this.ready = !0);
        },
        _setOption: function (t, e) {
          this._super(t, e), "handle" === t && this._setHandleClassName();
        },
        _setHandleClassName: function () {
          var t = this;
          this._removeClass(
            this.element.find(".ui-sortable-handle"),
            "ui-sortable-handle"
          ),
            C.each(this.items, function () {
              t._addClass(
                this.instance.options.handle
                  ? this.item.find(this.instance.options.handle)
                  : this.item,
                "ui-sortable-handle"
              );
            });
        },
        _destroy: function () {
          this._mouseDestroy();
          for (var t = this.items.length - 1; 0 <= t; t--)
            this.items[t].item.removeData(this.widgetName + "-item");
          return this;
        },
        _mouseCapture: function (t, e) {
          var i = null,
            n = !1,
            s = this;
          return (
            !this.reverting &&
            !this.options.disabled &&
            "static" !== this.options.type &&
            (this._refreshItems(t),
              C(t.target)
                .parents()
                .each(function () {
                  return C.data(this, s.widgetName + "-item") === s
                    ? ((i = C(this)), !1)
                    : void 0;
                }),
              C.data(t.target, s.widgetName + "-item") === s && (i = C(t.target)),
              !!i &&
              !(
                this.options.handle &&
                !e &&
                (C(this.options.handle, i)
                  .find("*")
                  .addBack()
                  .each(function () {
                    this === t.target && (n = !0);
                  }),
                  !n)
              ) &&
              ((this.currentItem = i), this._removeCurrentsFromItems(), !0))
          );
        },
        _mouseStart: function (t, e, i) {
          var n,
            s,
            o = this.options;
          if (
            ((this.currentContainer = this).refreshPositions(),
              (this.helper = this._createHelper(t)),
              this._cacheHelperProportions(),
              this._cacheMargins(),
              (this.scrollParent = this.helper.scrollParent()),
              (this.offset = this.currentItem.offset()),
              (this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left,
              }),
              C.extend(this.offset, {
                click: {
                  left: t.pageX - this.offset.left,
                  top: t.pageY - this.offset.top,
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset(),
              }),
              this.helper.css("position", "absolute"),
              (this.cssPosition = this.helper.css("position")),
              (this.originalPosition = this._generatePosition(t)),
              (this.originalPageX = t.pageX),
              (this.originalPageY = t.pageY),
              o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
              (this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0],
              }),
              this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
              this._createPlaceholder(),
              o.containment && this._setContainment(),
              o.cursor &&
              "auto" !== o.cursor &&
              ((s = this.document.find("body")),
                (this.storedCursor = s.css("cursor")),
                s.css("cursor", o.cursor),
                (this.storedStylesheet = C(
                  "<style>*{ cursor: " + o.cursor + " !important; }</style>"
                ).appendTo(s))),
              o.opacity &&
              (this.helper.css("opacity") &&
                (this._storedOpacity = this.helper.css("opacity")),
                this.helper.css("opacity", o.opacity)),
              o.zIndex &&
              (this.helper.css("zIndex") &&
                (this._storedZIndex = this.helper.css("zIndex")),
                this.helper.css("zIndex", o.zIndex)),
              this.scrollParent[0] !== this.document[0] &&
              "HTML" !== this.scrollParent[0].tagName &&
              (this.overflowOffset = this.scrollParent.offset()),
              this._trigger("start", t, this._uiHash()),
              this._preserveHelperProportions || this._cacheHelperProportions(),
              !i)
          )
            for (n = this.containers.length - 1; 0 <= n; n--)
              this.containers[n]._trigger("activate", t, this._uiHash(this));
          return (
            C.ui.ddmanager && (C.ui.ddmanager.current = this),
            C.ui.ddmanager &&
            !o.dropBehaviour &&
            C.ui.ddmanager.prepareOffsets(this, t),
            (this.dragging = !0),
            this._addClass(this.helper, "ui-sortable-helper"),
            this._mouseDrag(t),
            !0
          );
        },
        _mouseDrag: function (t) {
          var e,
            i,
            n,
            s,
            o = this.options,
            r = !1;
          for (
            this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll &&
            (this.scrollParent[0] !== this.document[0] &&
              "HTML" !== this.scrollParent[0].tagName
              ? (this.overflowOffset.top +
                this.scrollParent[0].offsetHeight -
                t.pageY <
                o.scrollSensitivity
                ? (this.scrollParent[0].scrollTop = r =
                  this.scrollParent[0].scrollTop + o.scrollSpeed)
                : t.pageY - this.overflowOffset.top <
                o.scrollSensitivity &&
                (this.scrollParent[0].scrollTop = r =
                  this.scrollParent[0].scrollTop - o.scrollSpeed),
                this.overflowOffset.left +
                  this.scrollParent[0].offsetWidth -
                  t.pageX <
                  o.scrollSensitivity
                  ? (this.scrollParent[0].scrollLeft = r =
                    this.scrollParent[0].scrollLeft + o.scrollSpeed)
                  : t.pageX - this.overflowOffset.left <
                  o.scrollSensitivity &&
                  (this.scrollParent[0].scrollLeft = r =
                    this.scrollParent[0].scrollLeft - o.scrollSpeed))
              : (t.pageY - this.document.scrollTop() < o.scrollSensitivity
                ? (r = this.document.scrollTop(
                  this.document.scrollTop() - o.scrollSpeed
                ))
                : this.window.height() -
                (t.pageY - this.document.scrollTop()) <
                o.scrollSensitivity &&
                (r = this.document.scrollTop(
                  this.document.scrollTop() + o.scrollSpeed
                )),
                t.pageX - this.document.scrollLeft() < o.scrollSensitivity
                  ? (r = this.document.scrollLeft(
                    this.document.scrollLeft() - o.scrollSpeed
                  ))
                  : this.window.width() -
                  (t.pageX - this.document.scrollLeft()) <
                  o.scrollSensitivity &&
                  (r = this.document.scrollLeft(
                    this.document.scrollLeft() + o.scrollSpeed
                  ))),
              !1 !== r &&
              C.ui.ddmanager &&
              !o.dropBehaviour &&
              C.ui.ddmanager.prepareOffsets(this, t)),
            this.positionAbs = this._convertPositionTo("absolute"),
            (this.options.axis && "y" === this.options.axis) ||
            (this.helper[0].style.left = this.position.left + "px"),
            (this.options.axis && "x" === this.options.axis) ||
            (this.helper[0].style.top = this.position.top + "px"),
            e = this.items.length - 1;
            0 <= e;
            e--
          )
            if (
              ((n = (i = this.items[e]).item[0]),
                (s = this._intersectsWithPointer(i)) &&
                i.instance === this.currentContainer &&
                n !== this.currentItem[0] &&
                this.placeholder[1 === s ? "next" : "prev"]()[0] !== n &&
                !C.contains(this.placeholder[0], n) &&
                ("semi-dynamic" !== this.options.type ||
                  !C.contains(this.element[0], n)))
            ) {
              if (
                ((this.direction = 1 === s ? "down" : "up"),
                  "pointer" !== this.options.tolerance &&
                  !this._intersectsWithSides(i))
              )
                break;
              this._rearrange(t, i), this._trigger("change", t, this._uiHash());
              break;
            }
          return (
            this._contactContainers(t),
            C.ui.ddmanager && C.ui.ddmanager.drag(this, t),
            this._trigger("sort", t, this._uiHash()),
            (this.lastPositionAbs = this.positionAbs),
            !1
          );
        },
        _mouseStop: function (t, e) {
          if (t) {
            if (
              (C.ui.ddmanager &&
                !this.options.dropBehaviour &&
                C.ui.ddmanager.drop(this, t),
                this.options.revert)
            ) {
              var i = this,
                n = this.placeholder.offset(),
                s = this.options.axis,
                o = {};
              (s && "x" !== s) ||
                (o.left =
                  n.left -
                  this.offset.parent.left -
                  this.margins.left +
                  (this.offsetParent[0] === this.document[0].body
                    ? 0
                    : this.offsetParent[0].scrollLeft)),
                (s && "y" !== s) ||
                (o.top =
                  n.top -
                  this.offset.parent.top -
                  this.margins.top +
                  (this.offsetParent[0] === this.document[0].body
                    ? 0
                    : this.offsetParent[0].scrollTop)),
                (this.reverting = !0),
                C(this.helper).animate(
                  o,
                  parseInt(this.options.revert, 10) || 500,
                  function () {
                    i._clear(t);
                  }
                );
            } else this._clear(t, e);
            return !1;
          }
        },
        cancel: function () {
          if (this.dragging) {
            this._mouseUp(new C.Event("mouseup", { target: null })),
              "original" === this.options.helper
                ? (this.currentItem.css(this._storedCSS),
                  this._removeClass(this.currentItem, "ui-sortable-helper"))
                : this.currentItem.show();
            for (var t = this.containers.length - 1; 0 <= t; t--)
              this.containers[t]._trigger(
                "deactivate",
                null,
                this._uiHash(this)
              ),
                this.containers[t].containerCache.over &&
                (this.containers[t]._trigger("out", null, this._uiHash(this)),
                  (this.containers[t].containerCache.over = 0));
          }
          return (
            this.placeholder &&
            (this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
              "original" !== this.options.helper &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
              C.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null,
              }),
              this.domPosition.prev
                ? C(this.domPosition.prev).after(this.currentItem)
                : C(this.domPosition.parent).prepend(this.currentItem)),
            this
          );
        },
        serialize: function (e) {
          var t = this._getItemsAsjQuery(e && e.connected),
            i = [];
          return (
            (e = e || {}),
            C(t).each(function () {
              var t = (C(e.item || this).attr(e.attribute || "id") || "").match(
                e.expression || /(.+)[\-=_](.+)/
              );
              t &&
                i.push(
                  (e.key || t[1] + "[]") +
                  "=" +
                  (e.key && e.expression ? t[1] : t[2])
                );
            }),
            !i.length && e.key && i.push(e.key + "="),
            i.join("&")
          );
        },
        toArray: function (t) {
          var e = this._getItemsAsjQuery(t && t.connected),
            i = [];
          return (
            (t = t || {}),
            e.each(function () {
              i.push(C(t.item || this).attr(t.attribute || "id") || "");
            }),
            i
          );
        },
        _intersectsWith: function (t) {
          var e = this.positionAbs.left,
            i = e + this.helperProportions.width,
            n = this.positionAbs.top,
            s = n + this.helperProportions.height,
            o = t.left,
            r = o + t.width,
            a = t.top,
            l = a + t.height,
            h = this.offset.click.top,
            c = this.offset.click.left,
            u = "x" === this.options.axis || (a < n + h && n + h < l),
            d = "y" === this.options.axis || (o < e + c && e + c < r),
            p = u && d;
          return "pointer" === this.options.tolerance ||
            this.options.forcePointerForContainers ||
            ("pointer" !== this.options.tolerance &&
              this.helperProportions[this.floating ? "width" : "height"] >
              t[this.floating ? "width" : "height"])
            ? p
            : e + this.helperProportions.width / 2 > o &&
            r > i - this.helperProportions.width / 2 &&
            n + this.helperProportions.height / 2 > a &&
            l > s - this.helperProportions.height / 2;
        },
        _intersectsWithPointer: function (t) {
          var e,
            i,
            n =
              "x" === this.options.axis ||
              this._isOverAxis(
                this.positionAbs.top + this.offset.click.top,
                t.top,
                t.height
              ),
            s =
              "y" === this.options.axis ||
              this._isOverAxis(
                this.positionAbs.left + this.offset.click.left,
                t.left,
                t.width
              );
          return (
            !!(n && s) &&
            ((e = this._getDragVerticalDirection()),
              (i = this._getDragHorizontalDirection()),
              this.floating
                ? "right" === i || "down" === e
                  ? 2
                  : 1
                : e && ("down" === e ? 2 : 1))
          );
        },
        _intersectsWithSides: function (t) {
          var e = this._isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            t.top + t.height / 2,
            t.height
          ),
            i = this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left + t.width / 2,
              t.width
            ),
            n = this._getDragVerticalDirection(),
            s = this._getDragHorizontalDirection();
          return this.floating && s
            ? ("right" === s && i) || ("left" === s && !i)
            : n && (("down" === n && e) || ("up" === n && !e));
        },
        _getDragVerticalDirection: function () {
          var t = this.positionAbs.top - this.lastPositionAbs.top;
          return 0 != t && (0 < t ? "down" : "up");
        },
        _getDragHorizontalDirection: function () {
          var t = this.positionAbs.left - this.lastPositionAbs.left;
          return 0 != t && (0 < t ? "right" : "left");
        },
        refresh: function (t) {
          return (
            this._refreshItems(t),
            this._setHandleClassName(),
            this.refreshPositions(),
            this
          );
        },
        _connectWith: function () {
          var t = this.options;
          return t.connectWith.constructor === String
            ? [t.connectWith]
            : t.connectWith;
        },
        _getItemsAsjQuery: function (t) {
          function e() {
            r.push(this);
          }
          var i,
            n,
            s,
            o,
            r = [],
            a = [],
            l = this._connectWith();
          if (l && t)
            for (i = l.length - 1; 0 <= i; i--)
              for (n = (s = C(l[i], this.document[0])).length - 1; 0 <= n; n--)
                (o = C.data(s[n], this.widgetFullName)) &&
                  o !== this &&
                  !o.options.disabled &&
                  a.push([
                    C.isFunction(o.options.items)
                      ? o.options.items.call(o.element)
                      : C(o.options.items, o.element)
                        .not(".ui-sortable-helper")
                        .not(".ui-sortable-placeholder"),
                    o,
                  ]);
          for (
            a.push([
              C.isFunction(this.options.items)
                ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem,
                })
                : C(this.options.items, this.element)
                  .not(".ui-sortable-helper")
                  .not(".ui-sortable-placeholder"),
              this,
            ]),
            i = a.length - 1;
            0 <= i;
            i--
          )
            a[i][0].each(e);
          return C(r);
        },
        _removeCurrentsFromItems: function () {
          var i = this.currentItem.find(":data(" + this.widgetName + "-item)");
          this.items = C.grep(this.items, function (t) {
            for (var e = 0; i.length > e; e++)
              if (i[e] === t.item[0]) return !1;
            return !0;
          });
        },
        _refreshItems: function (t) {
          (this.items = []), (this.containers = [this]);
          var e,
            i,
            n,
            s,
            o,
            r,
            a,
            l,
            h = this.items,
            c = [
              [
                C.isFunction(this.options.items)
                  ? this.options.items.call(this.element[0], t, {
                    item: this.currentItem,
                  })
                  : C(this.options.items, this.element),
                this,
              ],
            ],
            u = this._connectWith();
          if (u && this.ready)
            for (e = u.length - 1; 0 <= e; e--)
              for (i = (n = C(u[e], this.document[0])).length - 1; 0 <= i; i--)
                (s = C.data(n[i], this.widgetFullName)) &&
                  s !== this &&
                  !s.options.disabled &&
                  (c.push([
                    C.isFunction(s.options.items)
                      ? s.options.items.call(s.element[0], t, {
                        item: this.currentItem,
                      })
                      : C(s.options.items, s.element),
                    s,
                  ]),
                    this.containers.push(s));
          for (e = c.length - 1; 0 <= e; e--)
            for (o = c[e][1], i = 0, l = (r = c[e][0]).length; i < l; i++)
              (a = C(r[i])).data(this.widgetName + "-item", o),
                h.push({
                  item: a,
                  instance: o,
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                });
        },
        refreshPositions: function (t) {
          var e, i, n, s;
          for (
            this.floating =
            !!this.items.length &&
            ("x" === this.options.axis ||
              this._isFloating(this.items[0].item)),
            this.offsetParent &&
            this.helper &&
            (this.offset.parent = this._getParentOffset()),
            e = this.items.length - 1;
            0 <= e;
            e--
          )
            ((i = this.items[e]).instance !== this.currentContainer &&
              this.currentContainer &&
              i.item[0] !== this.currentItem[0]) ||
              ((n = this.options.toleranceElement
                ? C(this.options.toleranceElement, i.item)
                : i.item),
                t || ((i.width = n.outerWidth()), (i.height = n.outerHeight())),
                (s = n.offset()),
                (i.left = s.left),
                (i.top = s.top));
          if (this.options.custom && this.options.custom.refreshContainers)
            this.options.custom.refreshContainers.call(this);
          else
            for (e = this.containers.length - 1; 0 <= e; e--)
              (s = this.containers[e].element.offset()),
                (this.containers[e].containerCache.left = s.left),
                (this.containers[e].containerCache.top = s.top),
                (this.containers[e].containerCache.width =
                  this.containers[e].element.outerWidth()),
                (this.containers[e].containerCache.height =
                  this.containers[e].element.outerHeight());
          return this;
        },
        _createPlaceholder: function (i) {
          var n,
            s = (i = i || this).options;
          (s.placeholder && s.placeholder.constructor !== String) ||
            ((n = s.placeholder),
              (s.placeholder = {
                element: function () {
                  var t = i.currentItem[0].nodeName.toLowerCase(),
                    e = C("<" + t + ">", i.document[0]);
                  return (
                    i
                      ._addClass(
                        e,
                        "ui-sortable-placeholder",
                        n || i.currentItem[0].className
                      )
                      ._removeClass(e, "ui-sortable-helper"),
                    "tbody" === t
                      ? i._createTrPlaceholder(
                        i.currentItem.find("tr").eq(0),
                        C("<tr>", i.document[0]).appendTo(e)
                      )
                      : "tr" === t
                        ? i._createTrPlaceholder(i.currentItem, e)
                        : "img" === t && e.attr("src", i.currentItem.attr("src")),
                    n || e.css("visibility", "hidden"),
                    e
                  );
                },
                update: function (t, e) {
                  (n && !s.forcePlaceholderSize) ||
                    (e.height() ||
                      e.height(
                        i.currentItem.innerHeight() -
                        parseInt(i.currentItem.css("paddingTop") || 0, 10) -
                        parseInt(i.currentItem.css("paddingBottom") || 0, 10)
                      ),
                      e.width() ||
                      e.width(
                        i.currentItem.innerWidth() -
                        parseInt(i.currentItem.css("paddingLeft") || 0, 10) -
                        parseInt(i.currentItem.css("paddingRight") || 0, 10)
                      ));
                },
              })),
            (i.placeholder = C(
              s.placeholder.element.call(i.element, i.currentItem)
            )),
            i.currentItem.after(i.placeholder),
            s.placeholder.update(i, i.placeholder);
        },
        _createTrPlaceholder: function (t, e) {
          var i = this;
          t.children().each(function () {
            C("<td>&#160;</td>", i.document[0])
              .attr("colspan", C(this).attr("colspan") || 1)
              .appendTo(e);
          });
        },
        _contactContainers: function (t) {
          var e,
            i,
            n,
            s,
            o,
            r,
            a,
            l,
            h,
            c,
            u = null,
            d = null;
          for (e = this.containers.length - 1; 0 <= e; e--)
            if (!C.contains(this.currentItem[0], this.containers[e].element[0]))
              if (this._intersectsWith(this.containers[e].containerCache)) {
                if (
                  u &&
                  C.contains(this.containers[e].element[0], u.element[0])
                )
                  continue;
                (u = this.containers[e]), (d = e);
              } else
                this.containers[e].containerCache.over &&
                  (this.containers[e]._trigger("out", t, this._uiHash(this)),
                    (this.containers[e].containerCache.over = 0));
          if (u)
            if (1 === this.containers.length)
              this.containers[d].containerCache.over ||
                (this.containers[d]._trigger("over", t, this._uiHash(this)),
                  (this.containers[d].containerCache.over = 1));
            else {
              for (
                n = 1e4,
                s = null,
                o = (h = u.floating || this._isFloating(this.currentItem))
                  ? "left"
                  : "top",
                r = h ? "width" : "height",
                c = h ? "pageX" : "pageY",
                i = this.items.length - 1;
                0 <= i;
                i--
              )
                C.contains(
                  this.containers[d].element[0],
                  this.items[i].item[0]
                ) &&
                  this.items[i].item[0] !== this.currentItem[0] &&
                  ((a = this.items[i].item.offset()[o]),
                    (l = !1),
                    t[c] - a > this.items[i][r] / 2 && (l = !0),
                    n > Math.abs(t[c] - a) &&
                    ((n = Math.abs(t[c] - a)),
                      (s = this.items[i]),
                      (this.direction = l ? "up" : "down")));
              if (!s && !this.options.dropOnEmpty) return;
              if (this.currentContainer === this.containers[d])
                return void (
                  this.currentContainer.containerCache.over ||
                  (this.containers[d]._trigger("over", t, this._uiHash()),
                    (this.currentContainer.containerCache.over = 1))
                );
              s
                ? this._rearrange(t, s, null, !0)
                : this._rearrange(t, null, this.containers[d].element, !0),
                this._trigger("change", t, this._uiHash()),
                this.containers[d]._trigger("change", t, this._uiHash(this)),
                (this.currentContainer = this.containers[d]),
                this.options.placeholder.update(
                  this.currentContainer,
                  this.placeholder
                ),
                this.containers[d]._trigger("over", t, this._uiHash(this)),
                (this.containers[d].containerCache.over = 1);
            }
        },
        _createHelper: function (t) {
          var e = this.options,
            i = C.isFunction(e.helper)
              ? C(e.helper.apply(this.element[0], [t, this.currentItem]))
              : "clone" === e.helper
                ? this.currentItem.clone()
                : this.currentItem;
          return (
            i.parents("body").length ||
            C(
              "parent" !== e.appendTo
                ? e.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(i[0]),
            i[0] === this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left"),
            }),
            (i[0].style.width && !e.forceHelperSize) ||
            i.width(this.currentItem.width()),
            (i[0].style.height && !e.forceHelperSize) ||
            i.height(this.currentItem.height()),
            i
          );
        },
        _adjustOffsetFromHelper: function (t) {
          "string" == typeof t && (t = t.split(" ")),
            C.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }),
            "left" in t &&
            (this.offset.click.left = t.left + this.margins.left),
            "right" in t &&
            (this.offset.click.left =
              this.helperProportions.width - t.right + this.margins.left),
            "top" in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom" in t &&
            (this.offset.click.top =
              this.helperProportions.height - t.bottom + this.margins.top);
        },
        _getParentOffset: function () {
          this.offsetParent = this.helper.offsetParent();
          var t = this.offsetParent.offset();
          return (
            "absolute" === this.cssPosition &&
            this.scrollParent[0] !== this.document[0] &&
            C.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((t.left += this.scrollParent.scrollLeft()),
              (t.top += this.scrollParent.scrollTop())),
            (this.offsetParent[0] === this.document[0].body ||
              (this.offsetParent[0].tagName &&
                "html" === this.offsetParent[0].tagName.toLowerCase() &&
                C.ui.ie)) &&
            (t = { top: 0, left: 0 }),
            {
              top:
                t.top +
                (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left:
                t.left +
                (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
          var t = this.currentItem.position();
          return {
            top:
              t.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              t.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft(),
          };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
            top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var t,
            e,
            i,
            n = this.options;
          "parent" === n.containment &&
            (n.containment = this.helper[0].parentNode),
            ("document" !== n.containment && "window" !== n.containment) ||
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              "document" === n.containment
                ? this.document.width()
                : this.window.width() -
                this.helperProportions.width -
                this.margins.left,
              ("document" === n.containment
                ? this.document.height() ||
                document.body.parentNode.scrollHeight
                : this.window.height() ||
                this.document[0].body.parentNode.scrollHeight) -
              this.helperProportions.height -
              this.margins.top,
            ]),
            /^(document|window|parent)$/.test(n.containment) ||
            ((t = C(n.containment)[0]),
              (e = C(n.containment).offset()),
              (i = "hidden" !== C(t).css("overflow")),
              (this.containment = [
                e.left +
                (parseInt(C(t).css("borderLeftWidth"), 10) || 0) +
                (parseInt(C(t).css("paddingLeft"), 10) || 0) -
                this.margins.left,
                e.top +
                (parseInt(C(t).css("borderTopWidth"), 10) || 0) +
                (parseInt(C(t).css("paddingTop"), 10) || 0) -
                this.margins.top,
                e.left +
                (i ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) -
                (parseInt(C(t).css("borderLeftWidth"), 10) || 0) -
                (parseInt(C(t).css("paddingRight"), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
                e.top +
                (i
                  ? Math.max(t.scrollHeight, t.offsetHeight)
                  : t.offsetHeight) -
                (parseInt(C(t).css("borderTopWidth"), 10) || 0) -
                (parseInt(C(t).css("paddingBottom"), 10) || 0) -
                this.helperProportions.height -
                this.margins.top,
              ]));
        },
        _convertPositionTo: function (t, e) {
          e = e || this.position;
          var i = "absolute" === t ? 1 : -1,
            n =
              "absolute" !== this.cssPosition ||
                (this.scrollParent[0] !== this.document[0] &&
                  C.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent,
            s = /(html|body)/i.test(n[0].tagName);
          return {
            top:
              e.top +
              this.offset.relative.top * i +
              this.offset.parent.top * i -
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : s
                  ? 0
                  : n.scrollTop()) *
              i,
            left:
              e.left +
              this.offset.relative.left * i +
              this.offset.parent.left * i -
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : s
                  ? 0
                  : n.scrollLeft()) *
              i,
          };
        },
        _generatePosition: function (t) {
          var e,
            i,
            n = this.options,
            s = t.pageX,
            o = t.pageY,
            r =
              "absolute" !== this.cssPosition ||
                (this.scrollParent[0] !== this.document[0] &&
                  C.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent,
            a = /(html|body)/i.test(r[0].tagName);
          return (
            "relative" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              this.scrollParent[0] !== this.offsetParent[0]) ||
            (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition &&
            (this.containment &&
              (t.pageX - this.offset.click.left < this.containment[0] &&
                (s = this.containment[0] + this.offset.click.left),
                t.pageY - this.offset.click.top < this.containment[1] &&
                (o = this.containment[1] + this.offset.click.top),
                t.pageX - this.offset.click.left > this.containment[2] &&
                (s = this.containment[2] + this.offset.click.left),
                t.pageY - this.offset.click.top > this.containment[3] &&
                (o = this.containment[3] + this.offset.click.top)),
              n.grid &&
              ((e =
                this.originalPageY +
                Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1]),
                (o = this.containment
                  ? e - this.offset.click.top >= this.containment[1] &&
                    e - this.offset.click.top <= this.containment[3]
                    ? e
                    : e - this.offset.click.top >= this.containment[1]
                      ? e - n.grid[1]
                      : e + n.grid[1]
                  : e),
                (i =
                  this.originalPageX +
                  Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0]),
                (s = this.containment
                  ? i - this.offset.click.left >= this.containment[0] &&
                    i - this.offset.click.left <= this.containment[2]
                    ? i
                    : i - this.offset.click.left >= this.containment[0]
                      ? i - n.grid[0]
                      : i + n.grid[0]
                  : i))),
            {
              top:
                o -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                ("fixed" === this.cssPosition
                  ? -this.scrollParent.scrollTop()
                  : a
                    ? 0
                    : r.scrollTop()),
              left:
                s -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                ("fixed" === this.cssPosition
                  ? -this.scrollParent.scrollLeft()
                  : a
                    ? 0
                    : r.scrollLeft()),
            }
          );
        },
        _rearrange: function (t, e, i, n) {
          i
            ? i[0].appendChild(this.placeholder[0])
            : e.item[0].parentNode.insertBefore(
              this.placeholder[0],
              "down" === this.direction ? e.item[0] : e.item[0].nextSibling
            ),
            (this.counter = this.counter ? ++this.counter : 1);
          var s = this.counter;
          this._delay(function () {
            s === this.counter && this.refreshPositions(!n);
          });
        },
        _clear: function (t, e) {
          function i(e, i, n) {
            return function (t) {
              n._trigger(e, t, i._uiHash(i));
            };
          }
          this.reverting = !1;
          var n,
            s = [];
          if (
            (!this._noFinalSort &&
              this.currentItem.parent().length &&
              this.placeholder.before(this.currentItem),
              (this._noFinalSort = null),
              this.helper[0] === this.currentItem[0])
          ) {
            for (n in this._storedCSS)
              ("auto" !== this._storedCSS[n] &&
                "static" !== this._storedCSS[n]) ||
                (this._storedCSS[n] = "");
            this.currentItem.css(this._storedCSS),
              this._removeClass(this.currentItem, "ui-sortable-helper");
          } else this.currentItem.show();
          for (
            this.fromOutside &&
            !e &&
            s.push(function (t) {
              this._trigger("receive", t, this._uiHash(this.fromOutside));
            }),
            (!this.fromOutside &&
              this.domPosition.prev ===
              this.currentItem.prev().not(".ui-sortable-helper")[0] &&
              this.domPosition.parent === this.currentItem.parent()[0]) ||
            e ||
            s.push(function (t) {
              this._trigger("update", t, this._uiHash());
            }),
            this !== this.currentContainer &&
            (e ||
              (s.push(function (t) {
                this._trigger("remove", t, this._uiHash());
              }),
                s.push(
                  function (e) {
                    return function (t) {
                      e._trigger("receive", t, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ),
                s.push(
                  function (e) {
                    return function (t) {
                      e._trigger("update", t, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ))),
            n = this.containers.length - 1;
            0 <= n;
            n--
          )
            e || s.push(i("deactivate", this, this.containers[n])),
              this.containers[n].containerCache.over &&
              (s.push(i("out", this, this.containers[n])),
                (this.containers[n].containerCache.over = 0));
          if (
            (this.storedCursor &&
              (this.document.find("body").css("cursor", this.storedCursor),
                this.storedStylesheet.remove()),
              this._storedOpacity &&
              this.helper.css("opacity", this._storedOpacity),
              this._storedZIndex &&
              this.helper.css(
                "zIndex",
                "auto" === this._storedZIndex ? "" : this._storedZIndex
              ),
              (this.dragging = !1),
              e || this._trigger("beforeStop", t, this._uiHash()),
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
              this.cancelHelperRemoval ||
              (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
                (this.helper = null)),
              !e)
          ) {
            for (n = 0; s.length > n; n++) s[n].call(this, t);
            this._trigger("stop", t, this._uiHash());
          }
          return (this.fromOutside = !1), !this.cancelHelperRemoval;
        },
        _trigger: function () {
          !1 === C.Widget.prototype._trigger.apply(this, arguments) &&
            this.cancel();
        },
        _uiHash: function (t) {
          var e = t || this;
          return {
            helper: e.helper,
            placeholder: e.placeholder || C([]),
            position: e.position,
            originalPosition: e.originalPosition,
            offset: e.positionAbs,
            item: e.currentItem,
            sender: t ? t.element : null,
          };
        },
      }),
      C.widget("ui.accordion", {
        version: "1.12.1",
        options: {
          active: 0,
          animate: {},
          classes: {
            "ui-accordion-header": "ui-corner-top",
            "ui-accordion-header-collapsed": "ui-corner-all",
            "ui-accordion-content": "ui-corner-bottom",
          },
          collapsible: !1,
          event: "click",
          header: "> li > :first-child, > :not(li):even",
          heightStyle: "auto",
          icons: {
            activeHeader: "ui-icon-triangle-1-s",
            header: "ui-icon-triangle-1-e",
          },
          activate: null,
          beforeActivate: null,
        },
        hideProps: {
          borderTopWidth: "hide",
          borderBottomWidth: "hide",
          paddingTop: "hide",
          paddingBottom: "hide",
          height: "hide",
        },
        showProps: {
          borderTopWidth: "show",
          borderBottomWidth: "show",
          paddingTop: "show",
          paddingBottom: "show",
          height: "show",
        },
        _create: function () {
          var t = this.options;
          (this.prevShow = this.prevHide = C()),
            this._addClass("ui-accordion", "ui-widget ui-helper-reset"),
            this.element.attr("role", "tablist"),
            t.collapsible ||
            (!1 !== t.active && null != t.active) ||
            (t.active = 0),
            this._processPanels(),
            t.active < 0 && (t.active += this.headers.length),
            this._refresh();
        },
        _getCreateEventData: function () {
          return {
            header: this.active,
            panel: this.active.length ? this.active.next() : C(),
          };
        },
        _createIcons: function () {
          var t,
            e,
            i = this.options.icons;
          i &&
            ((t = C("<span>")),
              this._addClass(
                t,
                "ui-accordion-header-icon",
                "ui-icon " + i.header
              ),
              t.prependTo(this.headers),
              (e = this.active.children(".ui-accordion-header-icon")),
              this._removeClass(e, i.header)
                ._addClass(e, null, i.activeHeader)
                ._addClass(this.headers, "ui-accordion-icons"));
        },
        _destroyIcons: function () {
          this._removeClass(this.headers, "ui-accordion-icons"),
            this.headers.children(".ui-accordion-header-icon").remove();
        },
        _destroy: function () {
          var t;
          this.element.removeAttr("role"),
            this.headers
              .removeAttr(
                "role aria-expanded aria-selected aria-controls tabIndex"
              )
              .removeUniqueId(),
            this._destroyIcons(),
            (t = this.headers
              .next()
              .css("display", "")
              .removeAttr("role aria-hidden aria-labelledby")
              .removeUniqueId()),
            "content" !== this.options.heightStyle && t.css("height", "");
        },
        _setOption: function (t, e) {
          return "active" === t
            ? void this._activate(e)
            : ("event" === t &&
              (this.options.event &&
                this._off(this.headers, this.options.event),
                this._setupEvents(e)),
              this._super(t, e),
              "collapsible" !== t ||
              e ||
              !1 !== this.options.active ||
              this._activate(0),
              void (
                "icons" === t &&
                (this._destroyIcons(), e && this._createIcons())
              ));
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this.element.attr("aria-disabled", t),
            this._toggleClass(null, "ui-state-disabled", !!t),
            this._toggleClass(
              this.headers.add(this.headers.next()),
              null,
              "ui-state-disabled",
              !!t
            );
        },
        _keydown: function (t) {
          if (!t.altKey && !t.ctrlKey) {
            var e = C.ui.keyCode,
              i = this.headers.length,
              n = this.headers.index(t.target),
              s = !1;
            switch (t.keyCode) {
              case e.RIGHT:
              case e.DOWN:
                s = this.headers[(n + 1) % i];
                break;
              case e.LEFT:
              case e.UP:
                s = this.headers[(n - 1 + i) % i];
                break;
              case e.SPACE:
              case e.ENTER:
                this._eventHandler(t);
                break;
              case e.HOME:
                s = this.headers[0];
                break;
              case e.END:
                s = this.headers[i - 1];
            }
            s &&
              (C(t.target).attr("tabIndex", -1),
                C(s).attr("tabIndex", 0),
                C(s).trigger("focus"),
                t.preventDefault());
          }
        },
        _panelKeyDown: function (t) {
          t.keyCode === C.ui.keyCode.UP &&
            t.ctrlKey &&
            C(t.currentTarget).prev().trigger("focus");
        },
        refresh: function () {
          var t = this.options;
          this._processPanels(),
            (!1 === t.active && !0 === t.collapsible) || !this.headers.length
              ? ((t.active = !1), (this.active = C()))
              : !1 === t.active
                ? this._activate(0)
                : this.active.length &&
                  !C.contains(this.element[0], this.active[0])
                  ? this.headers.length ===
                    this.headers.find(".ui-state-disabled").length
                    ? ((t.active = !1), (this.active = C()))
                    : this._activate(Math.max(0, t.active - 1))
                  : (t.active = this.headers.index(this.active)),
            this._destroyIcons(),
            this._refresh();
        },
        _processPanels: function () {
          var t = this.headers,
            e = this.panels;
          (this.headers = this.element.find(this.options.header)),
            this._addClass(
              this.headers,
              "ui-accordion-header ui-accordion-header-collapsed",
              "ui-state-default"
            ),
            (this.panels = this.headers
              .next()
              .filter(":not(.ui-accordion-content-active)")
              .hide()),
            this._addClass(
              this.panels,
              "ui-accordion-content",
              "ui-helper-reset ui-widget-content"
            ),
            e &&
            (this._off(t.not(this.headers)), this._off(e.not(this.panels)));
        },
        _refresh: function () {
          var i,
            t = this.options,
            e = t.heightStyle,
            n = this.element.parent();
          (this.active = this._findActive(t.active)),
            this._addClass(
              this.active,
              "ui-accordion-header-active",
              "ui-state-active"
            )._removeClass(this.active, "ui-accordion-header-collapsed"),
            this._addClass(this.active.next(), "ui-accordion-content-active"),
            this.active.next().show(),
            this.headers
              .attr("role", "tab")
              .each(function () {
                var t = C(this),
                  e = t.uniqueId().attr("id"),
                  i = t.next(),
                  n = i.uniqueId().attr("id");
                t.attr("aria-controls", n), i.attr("aria-labelledby", e);
              })
              .next()
              .attr("role", "tabpanel"),
            this.headers
              .not(this.active)
              .attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1,
              })
              .next()
              .attr({ "aria-hidden": "true" })
              .hide(),
            this.active.length
              ? this.active
                .attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0,
                })
                .next()
                .attr({ "aria-hidden": "false" })
              : this.headers.eq(0).attr("tabIndex", 0),
            this._createIcons(),
            this._setupEvents(t.event),
            "fill" === e
              ? ((i = n.height()),
                this.element.siblings(":visible").each(function () {
                  var t = C(this),
                    e = t.css("position");
                  "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0));
                }),
                this.headers.each(function () {
                  i -= C(this).outerHeight(!0);
                }),
                this.headers
                  .next()
                  .each(function () {
                    C(this).height(
                      Math.max(0, i - C(this).innerHeight() + C(this).height())
                    );
                  })
                  .css("overflow", "auto"))
              : "auto" === e &&
              ((i = 0),
                this.headers
                  .next()
                  .each(function () {
                    var t = C(this).is(":visible");
                    t || C(this).show(),
                      (i = Math.max(i, C(this).css("height", "").height())),
                      t || C(this).hide();
                  })
                  .height(i));
        },
        _activate: function (t) {
          var e = this._findActive(t)[0];
          e !== this.active[0] &&
            ((e = e || this.active[0]),
              this._eventHandler({
                target: e,
                currentTarget: e,
                preventDefault: C.noop,
              }));
        },
        _findActive: function (t) {
          return "number" == typeof t ? this.headers.eq(t) : C();
        },
        _setupEvents: function (t) {
          var i = { keydown: "_keydown" };
          t &&
            C.each(t.split(" "), function (t, e) {
              i[e] = "_eventHandler";
            }),
            this._off(this.headers.add(this.headers.next())),
            this._on(this.headers, i),
            this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
            this._hoverable(this.headers),
            this._focusable(this.headers);
        },
        _eventHandler: function (t) {
          var e,
            i,
            n = this.options,
            s = this.active,
            o = C(t.currentTarget),
            r = o[0] === s[0],
            a = r && n.collapsible,
            l = a ? C() : o.next(),
            h = s.next(),
            c = {
              oldHeader: s,
              oldPanel: h,
              newHeader: a ? C() : o,
              newPanel: l,
            };
          t.preventDefault(),
            (r && !n.collapsible) ||
            !1 === this._trigger("beforeActivate", t, c) ||
            ((n.active = !a && this.headers.index(o)),
              (this.active = r ? C() : o),
              this._toggle(c),
              this._removeClass(
                s,
                "ui-accordion-header-active",
                "ui-state-active"
              ),
              n.icons &&
              ((e = s.children(".ui-accordion-header-icon")),
                this._removeClass(e, null, n.icons.activeHeader)._addClass(
                  e,
                  null,
                  n.icons.header
                )),
              r ||
              (this._removeClass(
                o,
                "ui-accordion-header-collapsed"
              )._addClass(o, "ui-accordion-header-active", "ui-state-active"),
                n.icons &&
                ((i = o.children(".ui-accordion-header-icon")),
                  this._removeClass(i, null, n.icons.header)._addClass(
                    i,
                    null,
                    n.icons.activeHeader
                  )),
                this._addClass(o.next(), "ui-accordion-content-active")));
        },
        _toggle: function (t) {
          var e = t.newPanel,
            i = this.prevShow.length ? this.prevShow : t.oldPanel;
          this.prevShow.add(this.prevHide).stop(!0, !0),
            (this.prevShow = e),
            (this.prevHide = i),
            this.options.animate
              ? this._animate(e, i, t)
              : (i.hide(), e.show(), this._toggleComplete(t)),
            i.attr({ "aria-hidden": "true" }),
            i
              .prev()
              .attr({ "aria-selected": "false", "aria-expanded": "false" }),
            e.length && i.length
              ? i.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
              : e.length &&
              this.headers
                .filter(function () {
                  return 0 === parseInt(C(this).attr("tabIndex"), 10);
                })
                .attr("tabIndex", -1),
            e
              .attr("aria-hidden", "false")
              .prev()
              .attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              });
        },
        _animate: function (t, i, e) {
          function n() {
            a._toggleComplete(e);
          }
          var s,
            o,
            r,
            a = this,
            l = 0,
            h = t.css("box-sizing"),
            c = t.length && (!i.length || t.index() < i.index()),
            u = this.options.animate || {},
            d = (c && u.down) || u;
          return (
            "number" == typeof d && (r = d),
            "string" == typeof d && (o = d),
            (o = o || d.easing || u.easing),
            (r = r || d.duration || u.duration),
            i.length
              ? t.length
                ? ((s = t.show().outerHeight()),
                  i.animate(this.hideProps, {
                    duration: r,
                    easing: o,
                    step: function (t, e) {
                      e.now = Math.round(t);
                    },
                  }),
                  void t.hide().animate(this.showProps, {
                    duration: r,
                    easing: o,
                    complete: n,
                    step: function (t, e) {
                      (e.now = Math.round(t)),
                        "height" !== e.prop
                          ? "content-box" === h && (l += e.now)
                          : "content" !== a.options.heightStyle &&
                          ((e.now = Math.round(s - i.outerHeight() - l)),
                            (l = 0));
                    },
                  }))
                : i.animate(this.hideProps, r, o, n)
              : t.animate(this.showProps, r, o, n)
          );
        },
        _toggleComplete: function (t) {
          var e = t.oldPanel,
            i = e.prev();
          this._removeClass(e, "ui-accordion-content-active"),
            this._removeClass(i, "ui-accordion-header-active")._addClass(
              i,
              "ui-accordion-header-collapsed"
            ),
            e.length && (e.parent()[0].className = e.parent()[0].className),
            this._trigger("activate", null, t);
        },
      }),
      C.widget("ui.menu", {
        version: "1.12.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
          icons: { submenu: "ui-icon-caret-1-e" },
          items: "> *",
          menus: "ul",
          position: { my: "left top", at: "right top" },
          role: "menu",
          blur: null,
          focus: null,
          select: null,
        },
        _create: function () {
          (this.activeMenu = this.element),
            (this.mouseHandled = !1),
            this.element
              .uniqueId()
              .attr({ role: this.options.role, tabIndex: 0 }),
            this._addClass("ui-menu", "ui-widget ui-widget-content"),
            this._on({
              "mousedown .ui-menu-item": function (t) {
                t.preventDefault();
              },
              "click .ui-menu-item": function (t) {
                var e = C(t.target),
                  i = C(C.ui.safeActiveElement(this.document[0]));
                !this.mouseHandled &&
                  e.not(".ui-state-disabled").length &&
                  (this.select(t),
                    t.isPropagationStopped() || (this.mouseHandled = !0),
                    e.has(".ui-menu").length
                      ? this.expand(t)
                      : !this.element.is(":focus") &&
                      i.closest(".ui-menu").length &&
                      (this.element.trigger("focus", [!0]),
                        this.active &&
                        1 === this.active.parents(".ui-menu").length &&
                        clearTimeout(this.timer)));
              },
              "mouseenter .ui-menu-item": function (t) {
                if (!this.previousFilter) {
                  var e = C(t.target).closest(".ui-menu-item"),
                    i = C(t.currentTarget);
                  e[0] === i[0] &&
                    (this._removeClass(
                      i.siblings().children(".ui-state-active"),
                      null,
                      "ui-state-active"
                    ),
                      this.focus(t, i));
                }
              },
              mouseleave: "collapseAll",
              "mouseleave .ui-menu": "collapseAll",
              focus: function (t, e) {
                var i =
                  this.active || this.element.find(this.options.items).eq(0);
                e || this.focus(t, i);
              },
              blur: function (t) {
                this._delay(function () {
                  C.contains(
                    this.element[0],
                    C.ui.safeActiveElement(this.document[0])
                  ) || this.collapseAll(t);
                });
              },
              keydown: "_keydown",
            }),
            this.refresh(),
            this._on(this.document, {
              click: function (t) {
                this._closeOnDocumentClick(t) && this.collapseAll(t),
                  (this.mouseHandled = !1);
              },
            });
        },
        _destroy: function () {
          var t = this.element
            .find(".ui-menu-item")
            .removeAttr("role aria-disabled")
            .children(".ui-menu-item-wrapper")
            .removeUniqueId()
            .removeAttr("tabIndex role aria-haspopup");
          this.element
            .removeAttr("aria-activedescendant")
            .find(".ui-menu")
            .addBack()
            .removeAttr(
              "role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex"
            )
            .removeUniqueId()
            .show(),
            t.children().each(function () {
              var t = C(this);
              t.data("ui-menu-submenu-caret") && t.remove();
            });
        },
        _keydown: function (t) {
          var e,
            i,
            n,
            s,
            o = !0;
          switch (t.keyCode) {
            case C.ui.keyCode.PAGE_UP:
              this.previousPage(t);
              break;
            case C.ui.keyCode.PAGE_DOWN:
              this.nextPage(t);
              break;
            case C.ui.keyCode.HOME:
              this._move("first", "first", t);
              break;
            case C.ui.keyCode.END:
              this._move("last", "last", t);
              break;
            case C.ui.keyCode.UP:
              this.previous(t);
              break;
            case C.ui.keyCode.DOWN:
              this.next(t);
              break;
            case C.ui.keyCode.LEFT:
              this.collapse(t);
              break;
            case C.ui.keyCode.RIGHT:
              this.active &&
                !this.active.is(".ui-state-disabled") &&
                this.expand(t);
              break;
            case C.ui.keyCode.ENTER:
            case C.ui.keyCode.SPACE:
              this._activate(t);
              break;
            case C.ui.keyCode.ESCAPE:
              this.collapse(t);
              break;
            default:
              (o = !1),
                (i = this.previousFilter || ""),
                (s = !1),
                (n =
                  96 <= t.keyCode && t.keyCode <= 105
                    ? "" + (t.keyCode - 96)
                    : String.fromCharCode(t.keyCode)),
                clearTimeout(this.filterTimer),
                n === i ? (s = !0) : (n = i + n),
                (e = this._filterMenuItems(n)),
                (e =
                  s && -1 !== e.index(this.active.next())
                    ? this.active.nextAll(".ui-menu-item")
                    : e).length ||
                ((n = String.fromCharCode(t.keyCode)),
                  (e = this._filterMenuItems(n))),
                e.length
                  ? (this.focus(t, e),
                    (this.previousFilter = n),
                    (this.filterTimer = this._delay(function () {
                      delete this.previousFilter;
                    }, 1e3)))
                  : delete this.previousFilter;
          }
          o && t.preventDefault();
        },
        _activate: function (t) {
          this.active &&
            !this.active.is(".ui-state-disabled") &&
            (this.active.children("[aria-haspopup='true']").length
              ? this.expand(t)
              : this.select(t));
        },
        refresh: function () {
          var t,
            e,
            i,
            n,
            s = this,
            o = this.options.icons.submenu,
            r = this.element.find(this.options.menus);
          this._toggleClass(
            "ui-menu-icons",
            null,
            !!this.element.find(".ui-icon").length
          ),
            (e = r
              .filter(":not(.ui-menu)")
              .hide()
              .attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false",
              })
              .each(function () {
                var t = C(this),
                  e = t.prev(),
                  i = C("<span>").data("ui-menu-submenu-caret", !0);
                s._addClass(i, "ui-menu-icon", "ui-icon " + o),
                  e.attr("aria-haspopup", "true").prepend(i),
                  t.attr("aria-labelledby", e.attr("id"));
              })),
            this._addClass(
              e,
              "ui-menu",
              "ui-widget ui-widget-content ui-front"
            ),
            (t = r.add(this.element).find(this.options.items))
              .not(".ui-menu-item")
              .each(function () {
                var t = C(this);
                s._isDivider(t) &&
                  s._addClass(t, "ui-menu-divider", "ui-widget-content");
              }),
            (n = (i = t.not(".ui-menu-item, .ui-menu-divider"))
              .children()
              .not(".ui-menu")
              .uniqueId()
              .attr({ tabIndex: -1, role: this._itemRole() })),
            this._addClass(i, "ui-menu-item")._addClass(
              n,
              "ui-menu-item-wrapper"
            ),
            t.filter(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active &&
            !C.contains(this.element[0], this.active[0]) &&
            this.blur();
        },
        _itemRole: function () {
          return { menu: "menuitem", listbox: "option" }[this.options.role];
        },
        _setOption: function (t, e) {
          if ("icons" === t) {
            var i = this.element.find(".ui-menu-icon");
            this._removeClass(i, null, this.options.icons.submenu)._addClass(
              i,
              null,
              e.submenu
            );
          }
          this._super(t, e);
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this.element.attr("aria-disabled", t + ""),
            this._toggleClass(null, "ui-state-disabled", !!t);
        },
        focus: function (t, e) {
          var i, n, s;
          this.blur(t, t && "focus" === t.type),
            this._scrollIntoView(e),
            (this.active = e.first()),
            (n = this.active.children(".ui-menu-item-wrapper")),
            this._addClass(n, null, "ui-state-active"),
            this.options.role &&
            this.element.attr("aria-activedescendant", n.attr("id")),
            (s = this.active
              .parent()
              .closest(".ui-menu-item")
              .children(".ui-menu-item-wrapper")),
            this._addClass(s, null, "ui-state-active"),
            t && "keydown" === t.type
              ? this._close()
              : (this.timer = this._delay(function () {
                this._close();
              }, this.delay)),
            (i = e.children(".ui-menu")).length &&
            t &&
            /^mouse/.test(t.type) &&
            this._startOpening(i),
            (this.activeMenu = e.parent()),
            this._trigger("focus", t, { item: e });
        },
        _scrollIntoView: function (t) {
          var e, i, n, s, o, r;
          this._hasScroll() &&
            ((e = parseFloat(C.css(this.activeMenu[0], "borderTopWidth")) || 0),
              (i = parseFloat(C.css(this.activeMenu[0], "paddingTop")) || 0),
              (n = t.offset().top - this.activeMenu.offset().top - e - i),
              (s = this.activeMenu.scrollTop()),
              (o = this.activeMenu.height()),
              (r = t.outerHeight()),
              n < 0
                ? this.activeMenu.scrollTop(s + n)
                : o < n + r && this.activeMenu.scrollTop(s + n - o + r));
        },
        blur: function (t, e) {
          e || clearTimeout(this.timer),
            this.active &&
            (this._removeClass(
              this.active.children(".ui-menu-item-wrapper"),
              null,
              "ui-state-active"
            ),
              this._trigger("blur", t, { item: this.active }),
              (this.active = null));
        },
        _startOpening: function (t) {
          clearTimeout(this.timer),
            "true" === t.attr("aria-hidden") &&
            (this.timer = this._delay(function () {
              this._close(), this._open(t);
            }, this.delay));
        },
        _open: function (t) {
          var e = C.extend({ of: this.active }, this.options.position);
          clearTimeout(this.timer),
            this.element
              .find(".ui-menu")
              .not(t.parents(".ui-menu"))
              .hide()
              .attr("aria-hidden", "true"),
            t
              .show()
              .removeAttr("aria-hidden")
              .attr("aria-expanded", "true")
              .position(e);
        },
        collapseAll: function (e, i) {
          clearTimeout(this.timer),
            (this.timer = this._delay(function () {
              var t = i
                ? this.element
                : C(e && e.target).closest(this.element.find(".ui-menu"));
              t.length || (t = this.element),
                this._close(t),
                this.blur(e),
                this._removeClass(
                  t.find(".ui-state-active"),
                  null,
                  "ui-state-active"
                ),
                (this.activeMenu = t);
            }, this.delay));
        },
        _close: function (t) {
          (t = t || (this.active ? this.active.parent() : this.element))
            .find(".ui-menu")
            .hide()
            .attr("aria-hidden", "true")
            .attr("aria-expanded", "false");
        },
        _closeOnDocumentClick: function (t) {
          return !C(t.target).closest(".ui-menu").length;
        },
        _isDivider: function (t) {
          return !/[^\-\u2014\u2013\s]/.test(t.text());
        },
        collapse: function (t) {
          var e =
            this.active &&
            this.active.parent().closest(".ui-menu-item", this.element);
          e && e.length && (this._close(), this.focus(t, e));
        },
        expand: function (t) {
          var e =
            this.active &&
            this.active.children(".ui-menu ").find(this.options.items).first();
          e &&
            e.length &&
            (this._open(e.parent()),
              this._delay(function () {
                this.focus(t, e);
              }));
        },
        next: function (t) {
          this._move("next", "first", t);
        },
        previous: function (t) {
          this._move("prev", "last", t);
        },
        isFirstItem: function () {
          return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function () {
          return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function (t, e, i) {
          var n;
          this.active &&
            (n =
              "first" === t || "last" === t
                ? this.active["first" === t ? "prevAll" : "nextAll"](
                  ".ui-menu-item"
                ).eq(-1)
                : this.active[t + "All"](".ui-menu-item").eq(0)),
            (n && n.length && this.active) ||
            (n = this.activeMenu.find(this.options.items)[e]()),
            this.focus(i, n);
        },
        nextPage: function (t) {
          var e, i, n;
          return this.active
            ? void (
              this.isLastItem() ||
              (this._hasScroll()
                ? ((i = this.active.offset().top),
                  (n = this.element.height()),
                  this.active.nextAll(".ui-menu-item").each(function () {
                    return (e = C(this)).offset().top - i - n < 0;
                  }),
                  this.focus(t, e))
                : this.focus(
                  t,
                  this.activeMenu
                    .find(this.options.items)
                  [this.active ? "last" : "first"]()
                ))
            )
            : void this.next(t);
        },
        previousPage: function (t) {
          var e, i, n;
          return this.active
            ? void (
              this.isFirstItem() ||
              (this._hasScroll()
                ? ((i = this.active.offset().top),
                  (n = this.element.height()),
                  this.active.prevAll(".ui-menu-item").each(function () {
                    return 0 < (e = C(this)).offset().top - i + n;
                  }),
                  this.focus(t, e))
                : this.focus(
                  t,
                  this.activeMenu.find(this.options.items).first()
                ))
            )
            : void this.next(t);
        },
        _hasScroll: function () {
          return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function (t) {
          this.active = this.active || C(t.target).closest(".ui-menu-item");
          var e = { item: this.active };
          this.active.has(".ui-menu").length || this.collapseAll(t, !0),
            this._trigger("select", t, e);
        },
        _filterMenuItems: function (t) {
          var e = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
            i = RegExp("^" + e, "i");
          return this.activeMenu
            .find(this.options.items)
            .filter(".ui-menu-item")
            .filter(function () {
              return i.test(
                C.trim(C(this).children(".ui-menu-item-wrapper").text())
              );
            });
        },
      }),
      C.widget("ui.autocomplete", {
        version: "1.12.1",
        defaultElement: "<input>",
        options: {
          appendTo: null,
          autoFocus: !1,
          delay: 300,
          minLength: 1,
          position: { my: "left top", at: "left bottom", collision: "none" },
          source: null,
          change: null,
          close: null,
          focus: null,
          open: null,
          response: null,
          search: null,
          select: null,
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
          var i,
            n,
            s,
            t = this.element[0].nodeName.toLowerCase(),
            e = "textarea" === t,
            o = "input" === t;
          (this.isMultiLine =
            e || (!o && this._isContentEditable(this.element))),
            (this.valueMethod = this.element[e || o ? "val" : "text"]),
            (this.isNewMenu = !0),
            this._addClass("ui-autocomplete-input"),
            this.element.attr("autocomplete", "off"),
            this._on(this.element, {
              keydown: function (t) {
                if (this.element.prop("readOnly")) n = s = i = !0;
                else {
                  n = s = i = !1;
                  var e = C.ui.keyCode;
                  switch (t.keyCode) {
                    case e.PAGE_UP:
                      (i = !0), this._move("previousPage", t);
                      break;
                    case e.PAGE_DOWN:
                      (i = !0), this._move("nextPage", t);
                      break;
                    case e.UP:
                      (i = !0), this._keyEvent("previous", t);
                      break;
                    case e.DOWN:
                      (i = !0), this._keyEvent("next", t);
                      break;
                    case e.ENTER:
                      this.menu.active &&
                        ((i = !0), t.preventDefault(), this.menu.select(t));
                      break;
                    case e.TAB:
                      this.menu.active && this.menu.select(t);
                      break;
                    case e.ESCAPE:
                      this.menu.element.is(":visible") &&
                        (this.isMultiLine || this._value(this.term),
                          this.close(t),
                          t.preventDefault());
                      break;
                    default:
                      (n = !0), this._searchTimeout(t);
                  }
                }
              },
              keypress: function (t) {
                if (i)
                  return (
                    (i = !1),
                    void (
                      (this.isMultiLine && !this.menu.element.is(":visible")) ||
                      t.preventDefault()
                    )
                  );
                if (!n) {
                  var e = C.ui.keyCode;
                  switch (t.keyCode) {
                    case e.PAGE_UP:
                      this._move("previousPage", t);
                      break;
                    case e.PAGE_DOWN:
                      this._move("nextPage", t);
                      break;
                    case e.UP:
                      this._keyEvent("previous", t);
                      break;
                    case e.DOWN:
                      this._keyEvent("next", t);
                  }
                }
              },
              input: function (t) {
                return s
                  ? ((s = !1), void t.preventDefault())
                  : void this._searchTimeout(t);
              },
              focus: function () {
                (this.selectedItem = null), (this.previous = this._value());
              },
              blur: function (t) {
                return this.cancelBlur
                  ? void delete this.cancelBlur
                  : (clearTimeout(this.searching),
                    this.close(t),
                    void this._change(t));
              },
            }),
            this._initSource(),
            (this.menu = C("<ul>")
              .appendTo(this._appendTo())
              .menu({ role: null })
              .hide()
              .menu("instance")),
            this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
            this._on(this.menu.element, {
              mousedown: function (t) {
                t.preventDefault(),
                  (this.cancelBlur = !0),
                  this._delay(function () {
                    delete this.cancelBlur,
                      this.element[0] !==
                      C.ui.safeActiveElement(this.document[0]) &&
                      this.element.trigger("focus");
                  });
              },
              menufocus: function (t, e) {
                var i, n;
                return this.isNewMenu &&
                  ((this.isNewMenu = !1),
                    t.originalEvent && /^mouse/.test(t.originalEvent.type))
                  ? (this.menu.blur(),
                    void this.document.one("mousemove", function () {
                      C(t.target).trigger(t.originalEvent);
                    }))
                  : ((n = e.item.data("ui-autocomplete-item")),
                    !1 !== this._trigger("focus", t, { item: n }) &&
                    t.originalEvent &&
                    /^key/.test(t.originalEvent.type) &&
                    this._value(n.value),
                    void (
                      (i = e.item.attr("aria-label") || n.value) &&
                      C.trim(i).length &&
                      (this.liveRegion.children().hide(),
                        C("<div>").text(i).appendTo(this.liveRegion))
                    ));
              },
              menuselect: function (t, e) {
                var i = e.item.data("ui-autocomplete-item"),
                  n = this.previous;
                this.element[0] !== C.ui.safeActiveElement(this.document[0]) &&
                  (this.element.trigger("focus"),
                    (this.previous = n),
                    this._delay(function () {
                      (this.previous = n), (this.selectedItem = i);
                    })),
                  !1 !== this._trigger("select", t, { item: i }) &&
                  this._value(i.value),
                  (this.term = this._value()),
                  this.close(t),
                  (this.selectedItem = i);
              },
            }),
            (this.liveRegion = C("<div>", {
              role: "status",
              "aria-live": "assertive",
              "aria-relevant": "additions",
            }).appendTo(this.document[0].body)),
            this._addClass(
              this.liveRegion,
              null,
              "ui-helper-hidden-accessible"
            ),
            this._on(this.window, {
              beforeunload: function () {
                this.element.removeAttr("autocomplete");
              },
            });
        },
        _destroy: function () {
          clearTimeout(this.searching),
            this.element.removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove();
        },
        _setOption: function (t, e) {
          this._super(t, e),
            "source" === t && this._initSource(),
            "appendTo" === t && this.menu.element.appendTo(this._appendTo()),
            "disabled" === t && e && this.xhr && this.xhr.abort();
        },
        _isEventTargetInWidget: function (t) {
          var e = this.menu.element[0];
          return (
            t.target === this.element[0] ||
            t.target === e ||
            C.contains(e, t.target)
          );
        },
        _closeOnClickOutside: function (t) {
          this._isEventTargetInWidget(t) || this.close();
        },
        _appendTo: function () {
          var t = this.options.appendTo;
          return (
            ((t =
              t &&
              (t.jquery || t.nodeType ? C(t) : this.document.find(t).eq(0))) &&
              t[0]) ||
            (t = this.element.closest(".ui-front, dialog")),
            t.length || (t = this.document[0].body),
            t
          );
        },
        _initSource: function () {
          var i,
            n,
            s = this;
          C.isArray(this.options.source)
            ? ((i = this.options.source),
              (this.source = function (t, e) {
                e(C.ui.autocomplete.filter(i, t.term));
              }))
            : "string" == typeof this.options.source
              ? ((n = this.options.source),
                (this.source = function (t, e) {
                  s.xhr && s.xhr.abort(),
                    (s.xhr = C.ajax({
                      url: n,
                      data: t,
                      dataType: "json",
                      success: function (t) {
                        e(t);
                      },
                      error: function () {
                        e([]);
                      },
                    }));
                }))
              : (this.source = this.options.source);
        },
        _searchTimeout: function (n) {
          clearTimeout(this.searching),
            (this.searching = this._delay(function () {
              var t = this.term === this._value(),
                e = this.menu.element.is(":visible"),
                i = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey;
              (t && (!t || e || i)) ||
                ((this.selectedItem = null), this.search(null, n));
            }, this.options.delay));
        },
        search: function (t, e) {
          return (
            (t = null != t ? t : this._value()),
            (this.term = this._value()),
            t.length < this.options.minLength
              ? this.close(e)
              : !1 !== this._trigger("search", e)
                ? this._search(t)
                : void 0
          );
        },
        _search: function (t) {
          this.pending++,
            this._addClass("ui-autocomplete-loading"),
            (this.cancelSearch = !1),
            this.source({ term: t }, this._response());
        },
        _response: function () {
          var e = ++this.requestIndex;
          return C.proxy(function (t) {
            e === this.requestIndex && this.__response(t),
              this.pending--,
              this.pending || this._removeClass("ui-autocomplete-loading");
          }, this);
        },
        __response: function (t) {
          (t = t && this._normalize(t)),
            this._trigger("response", null, { content: t }),
            !this.options.disabled && t && t.length && !this.cancelSearch
              ? (this._suggest(t), this._trigger("open"))
              : this._close();
        },
        close: function (t) {
          (this.cancelSearch = !0), this._close(t);
        },
        _close: function (t) {
          this._off(this.document, "mousedown"),
            this.menu.element.is(":visible") &&
            (this.menu.element.hide(),
              this.menu.blur(),
              (this.isNewMenu = !0),
              this._trigger("close", t));
        },
        _change: function (t) {
          this.previous !== this._value() &&
            this._trigger("change", t, { item: this.selectedItem });
        },
        _normalize: function (t) {
          return t.length && t[0].label && t[0].value
            ? t
            : C.map(t, function (t) {
              return "string" == typeof t
                ? { label: t, value: t }
                : C.extend({}, t, {
                  label: t.label || t.value,
                  value: t.value || t.label,
                });
            });
        },
        _suggest: function (t) {
          var e = this.menu.element.empty();
          this._renderMenu(e, t),
            (this.isNewMenu = !0),
            this.menu.refresh(),
            e.show(),
            this._resizeMenu(),
            e.position(C.extend({ of: this.element }, this.options.position)),
            this.options.autoFocus && this.menu.next(),
            this._on(this.document, { mousedown: "_closeOnClickOutside" });
        },
        _resizeMenu: function () {
          var t = this.menu.element;
          t.outerWidth(
            Math.max(t.width("").outerWidth() + 1, this.element.outerWidth())
          );
        },
        _renderMenu: function (i, t) {
          var n = this;
          C.each(t, function (t, e) {
            n._renderItemData(i, e);
          });
        },
        _renderItemData: function (t, e) {
          return this._renderItem(t, e).data("ui-autocomplete-item", e);
        },
        _renderItem: function (t, e) {
          return C("<li>").append(C("<div>").text(e.label)).appendTo(t);
        },
        _move: function (t, e) {
          return this.menu.element.is(":visible")
            ? (this.menu.isFirstItem() && /^previous/.test(t)) ||
              (this.menu.isLastItem() && /^next/.test(t))
              ? (this.isMultiLine || this._value(this.term),
                void this.menu.blur())
              : void this.menu[t](e)
            : void this.search(null, e);
        },
        widget: function () {
          return this.menu.element;
        },
        _value: function () {
          return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function (t, e) {
          (this.isMultiLine && !this.menu.element.is(":visible")) ||
            (this._move(t, e), e.preventDefault());
        },
        _isContentEditable: function (t) {
          if (!t.length) return !1;
          var e = t.prop("contentEditable");
          return "inherit" === e
            ? this._isContentEditable(t.parent())
            : "true" === e;
        },
      }),
      C.extend(C.ui.autocomplete, {
        escapeRegex: function (t) {
          return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function (t, e) {
          var i = RegExp(C.ui.autocomplete.escapeRegex(e), "i");
          return C.grep(t, function (t) {
            return i.test(t.label || t.value || t);
          });
        },
      }),
      C.widget("ui.autocomplete", C.ui.autocomplete, {
        options: {
          messages: {
            noResults: "No search results.",
            results: function (t) {
              return (
                t +
                (1 < t ? " results are" : " result is") +
                " available, use up and down arrow keys to navigate."
              );
            },
          },
        },
        __response: function (t) {
          var e;
          this._superApply(arguments),
            this.options.disabled ||
            this.cancelSearch ||
            ((e =
              t && t.length
                ? this.options.messages.results(t.length)
                : this.options.messages.noResults),
              this.liveRegion.children().hide(),
              C("<div>").text(e).appendTo(this.liveRegion));
        },
      }),
      C.ui.autocomplete;
    var y,
      b,
      w,
      E = /ui-corner-([a-z]){2,6}/g;
    C.widget("ui.controlgroup", {
      version: "1.12.1",
      defaultElement: "<div>",
      options: {
        direction: "horizontal",
        disabled: null,
        onlyVisible: !0,
        items: {
          button:
            "input[type=button], input[type=submit], input[type=reset], button, a",
          controlgroupLabel: ".ui-controlgroup-label",
          checkboxradio: "input[type='checkbox'], input[type='radio']",
          selectmenu: "select",
          spinner: ".ui-spinner-input",
        },
      },
      _create: function () {
        this._enhance();
      },
      _enhance: function () {
        this.element.attr("role", "toolbar"), this.refresh();
      },
      _destroy: function () {
        this._callChildMethod("destroy"),
          this.childWidgets.removeData("ui-controlgroup-data"),
          this.element.removeAttr("role"),
          this.options.items.controlgroupLabel &&
          this.element
            .find(this.options.items.controlgroupLabel)
            .find(".ui-controlgroup-label-contents")
            .contents()
            .unwrap();
      },
      _initWidgets: function () {
        var r = this,
          a = [];
        C.each(this.options.items, function (s, t) {
          var e,
            o = {};
          return t
            ? "controlgroupLabel" === s
              ? ((e = r.element.find(t)).each(function () {
                var t = C(this);
                t.children(".ui-controlgroup-label-contents").length ||
                  t
                    .contents()
                    .wrapAll(
                      "<span class='ui-controlgroup-label-contents'></span>"
                    );
              }),
                r._addClass(
                  e,
                  null,
                  "ui-widget ui-widget-content ui-state-default"
                ),
                void (a = a.concat(e.get())))
              : void (
                C.fn[s] &&
                ((o = r["_" + s + "Options"]
                  ? r["_" + s + "Options"]("middle")
                  : { classes: {} }),
                  r.element.find(t).each(function () {
                    var t = C(this),
                      e = t[s]("instance"),
                      i = C.widget.extend({}, o);
                    if ("button" !== s || !t.parent(".ui-spinner").length) {
                      (e = e || t[s]()[s]("instance")) &&
                        (i.classes = r._resolveClassesValues(i.classes, e)),
                        t[s](i);
                      var n = t[s]("widget");
                      C.data(
                        n[0],
                        "ui-controlgroup-data",
                        e || t[s]("instance")
                      ),
                        a.push(n[0]);
                    }
                  }))
              )
            : void 0;
        }),
          (this.childWidgets = C(C.unique(a))),
          this._addClass(this.childWidgets, "ui-controlgroup-item");
      },
      _callChildMethod: function (e) {
        this.childWidgets.each(function () {
          var t = C(this).data("ui-controlgroup-data");
          t && t[e] && t[e]();
        });
      },
      _updateCornerClass: function (t, e) {
        var i = this._buildSimpleOptions(e, "label").classes.label;
        this._removeClass(
          t,
          null,
          "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"
        ),
          this._addClass(t, null, i);
      },
      _buildSimpleOptions: function (t, e) {
        var i = "vertical" === this.options.direction,
          n = { classes: {} };
        return (
          (n.classes[e] = {
            middle: "",
            first: "ui-corner-" + (i ? "top" : "left"),
            last: "ui-corner-" + (i ? "bottom" : "right"),
            only: "ui-corner-all",
          }[t]),
          n
        );
      },
      _spinnerOptions: function (t) {
        var e = this._buildSimpleOptions(t, "ui-spinner");
        return (
          (e.classes["ui-spinner-up"] = ""),
          (e.classes["ui-spinner-down"] = ""),
          e
        );
      },
      _buttonOptions: function (t) {
        return this._buildSimpleOptions(t, "ui-button");
      },
      _checkboxradioOptions: function (t) {
        return this._buildSimpleOptions(t, "ui-checkboxradio-label");
      },
      _selectmenuOptions: function (t) {
        var e = "vertical" === this.options.direction;
        return {
          width: e && "auto",
          classes: {
            middle: {
              "ui-selectmenu-button-open": "",
              "ui-selectmenu-button-closed": "",
            },
            first: {
              "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
              "ui-selectmenu-button-closed":
                "ui-corner-" + (e ? "top" : "left"),
            },
            last: {
              "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
              "ui-selectmenu-button-closed":
                "ui-corner-" + (e ? "bottom" : "right"),
            },
            only: {
              "ui-selectmenu-button-open": "ui-corner-top",
              "ui-selectmenu-button-closed": "ui-corner-all",
            },
          }[t],
        };
      },
      _resolveClassesValues: function (i, n) {
        var s = {};
        return (
          C.each(i, function (t) {
            var e = n.options.classes[t] || "";
            (e = C.trim(e.replace(E, ""))),
              (s[t] = (e + " " + i[t]).replace(/\s+/g, " "));
          }),
          s
        );
      },
      _setOption: function (t, e) {
        return (
          "direction" === t &&
          this._removeClass("ui-controlgroup-" + this.options.direction),
          this._super(t, e),
          "disabled" === t
            ? void this._callChildMethod(e ? "disable" : "enable")
            : void this.refresh()
        );
      },
      refresh: function () {
        var s,
          o = this;
        this._addClass(
          "ui-controlgroup ui-controlgroup-" + this.options.direction
        ),
          "horizontal" === this.options.direction &&
          this._addClass(null, "ui-helper-clearfix"),
          this._initWidgets(),
          (s = this.childWidgets),
          this.options.onlyVisible && (s = s.filter(":visible")),
          s.length &&
          (C.each(["first", "last"], function (t, e) {
            var i = s[e]().data("ui-controlgroup-data");
            if (i && o["_" + i.widgetName + "Options"]) {
              var n = o["_" + i.widgetName + "Options"](
                1 === s.length ? "only" : e
              );
              (n.classes = o._resolveClassesValues(n.classes, i)),
                i.element[i.widgetName](n);
            } else o._updateCornerClass(s[e](), e);
          }),
            this._callChildMethod("refresh"));
      },
    }),
      C.widget("ui.checkboxradio", [
        C.ui.formResetMixin,
        {
          version: "1.12.1",
          options: {
            disabled: null,
            label: null,
            icon: !0,
            classes: {
              "ui-checkboxradio-label": "ui-corner-all",
              "ui-checkboxradio-icon": "ui-corner-all",
            },
          },
          _getCreateOptions: function () {
            var t,
              e,
              i = this,
              n = this._super() || {};
            return (
              this._readType(),
              (e = this.element.labels()),
              (this.label = C(e[e.length - 1])),
              this.label.length ||
              C.error("No label found for checkboxradio widget"),
              (this.originalLabel = ""),
              this.label
                .contents()
                .not(this.element[0])
                .each(function () {
                  i.originalLabel +=
                    3 === this.nodeType ? C(this).text() : this.outerHTML;
                }),
              this.originalLabel && (n.label = this.originalLabel),
              null != (t = this.element[0].disabled) && (n.disabled = t),
              n
            );
          },
          _create: function () {
            var t = this.element[0].checked;
            this._bindFormResetHandler(),
              null == this.options.disabled &&
              (this.options.disabled = this.element[0].disabled),
              this._setOption("disabled", this.options.disabled),
              this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
              this._addClass(
                this.label,
                "ui-checkboxradio-label",
                "ui-button ui-widget"
              ),
              "radio" === this.type &&
              this._addClass(this.label, "ui-checkboxradio-radio-label"),
              this.options.label && this.options.label !== this.originalLabel
                ? this._updateLabel()
                : this.originalLabel &&
                (this.options.label = this.originalLabel),
              this._enhance(),
              t &&
              (this._addClass(
                this.label,
                "ui-checkboxradio-checked",
                "ui-state-active"
              ),
                this.icon && this._addClass(this.icon, null, "ui-state-hover")),
              this._on({
                change: "_toggleClasses",
                focus: function () {
                  this._addClass(
                    this.label,
                    null,
                    "ui-state-focus ui-visual-focus"
                  );
                },
                blur: function () {
                  this._removeClass(
                    this.label,
                    null,
                    "ui-state-focus ui-visual-focus"
                  );
                },
              });
          },
          _readType: function () {
            var t = this.element[0].nodeName.toLowerCase();
            (this.type = this.element[0].type),
              ("input" === t && /radio|checkbox/.test(this.type)) ||
              C.error(
                "Can't create checkboxradio on element.nodeName=" +
                t +
                " and element.type=" +
                this.type
              );
          },
          _enhance: function () {
            this._updateIcon(this.element[0].checked);
          },
          widget: function () {
            return this.label;
          },
          _getRadioGroup: function () {
            var t = this.element[0].name,
              e = "input[name='" + C.ui.escapeSelector(t) + "']";
            return t
              ? (this.form.length
                ? C(this.form[0].elements).filter(e)
                : C(e).filter(function () {
                  return 0 === C(this).form().length;
                })
              ).not(this.element)
              : C([]);
          },
          _toggleClasses: function () {
            var t = this.element[0].checked;
            this._toggleClass(
              this.label,
              "ui-checkboxradio-checked",
              "ui-state-active",
              t
            ),
              this.options.icon &&
              "checkbox" === this.type &&
              this._toggleClass(
                this.icon,
                null,
                "ui-icon-check ui-state-checked",
                t
              )._toggleClass(this.icon, null, "ui-icon-blank", !t),
              "radio" === this.type &&
              this._getRadioGroup().each(function () {
                var t = C(this).checkboxradio("instance");
                t &&
                  t._removeClass(
                    t.label,
                    "ui-checkboxradio-checked",
                    "ui-state-active"
                  );
              });
          },
          _destroy: function () {
            this._unbindFormResetHandler(),
              this.icon && (this.icon.remove(), this.iconSpace.remove());
          },
          _setOption: function (t, e) {
            return "label" !== t || e
              ? (this._super(t, e),
                "disabled" === t
                  ? (this._toggleClass(
                    this.label,
                    null,
                    "ui-state-disabled",
                    e
                  ),
                    void (this.element[0].disabled = e))
                  : void this.refresh())
              : void 0;
          },
          _updateIcon: function (t) {
            var e = "ui-icon ui-icon-background ";
            this.options.icon
              ? (this.icon ||
                ((this.icon = C("<span>")),
                  (this.iconSpace = C("<span> </span>")),
                  this._addClass(
                    this.iconSpace,
                    "ui-checkboxradio-icon-space"
                  )),
                "checkbox" === this.type
                  ? ((e += t
                    ? "ui-icon-check ui-state-checked"
                    : "ui-icon-blank"),
                    this._removeClass(
                      this.icon,
                      null,
                      t ? "ui-icon-blank" : "ui-icon-check"
                    ))
                  : (e += "ui-icon-blank"),
                this._addClass(this.icon, "ui-checkboxradio-icon", e),
                t ||
                this._removeClass(
                  this.icon,
                  null,
                  "ui-icon-check ui-state-checked"
                ),
                this.icon.prependTo(this.label).after(this.iconSpace))
              : void 0 !== this.icon &&
              (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
          },
          _updateLabel: function () {
            var t = this.label.contents().not(this.element[0]);
            this.icon && (t = t.not(this.icon[0])),
              this.iconSpace && (t = t.not(this.iconSpace[0])),
              t.remove(),
              this.label.append(this.options.label);
          },
          refresh: function () {
            var t = this.element[0].checked,
              e = this.element[0].disabled;
            this._updateIcon(t),
              this._toggleClass(
                this.label,
                "ui-checkboxradio-checked",
                "ui-state-active",
                t
              ),
              null !== this.options.label && this._updateLabel(),
              e !== this.options.disabled && this._setOptions({ disabled: e });
          },
        },
      ]),
      C.ui.checkboxradio,
      C.widget("ui.button", {
        version: "1.12.1",
        defaultElement: "<button>",
        options: {
          classes: { "ui-button": "ui-corner-all" },
          disabled: null,
          icon: null,
          iconPosition: "beginning",
          label: null,
          showLabel: !0,
        },
        _getCreateOptions: function () {
          var t,
            e = this._super() || {};
          return (
            (this.isInput = this.element.is("input")),
            null != (t = this.element[0].disabled) && (e.disabled = t),
            (this.originalLabel = this.isInput
              ? this.element.val()
              : this.element.html()),
            this.originalLabel && (e.label = this.originalLabel),
            e
          );
        },
        _create: function () {
          !this.option.showLabel & !this.options.icon &&
            (this.options.showLabel = !0),
            null == this.options.disabled &&
            (this.options.disabled = this.element[0].disabled || !1),
            (this.hasTitle = !!this.element.attr("title")),
            this.options.label &&
            this.options.label !== this.originalLabel &&
            (this.isInput
              ? this.element.val(this.options.label)
              : this.element.html(this.options.label)),
            this._addClass("ui-button", "ui-widget"),
            this._setOption("disabled", this.options.disabled),
            this._enhance(),
            this.element.is("a") &&
            this._on({
              keyup: function (t) {
                t.keyCode === C.ui.keyCode.SPACE &&
                  (t.preventDefault(),
                    this.element[0].click
                      ? this.element[0].click()
                      : this.element.trigger("click"));
              },
            });
        },
        _enhance: function () {
          this.element.is("button") || this.element.attr("role", "button"),
            this.options.icon &&
            (this._updateIcon("icon", this.options.icon),
              this._updateTooltip());
        },
        _updateTooltip: function () {
          (this.title = this.element.attr("title")),
            this.options.showLabel ||
            this.title ||
            this.element.attr("title", this.options.label);
        },
        _updateIcon: function (t, e) {
          var i = "iconPosition" !== t,
            n = i ? this.options.iconPosition : e,
            s = "top" === n || "bottom" === n;
          this.icon
            ? i && this._removeClass(this.icon, null, this.options.icon)
            : ((this.icon = C("<span>")),
              this._addClass(this.icon, "ui-button-icon", "ui-icon"),
              this.options.showLabel || this._addClass("ui-button-icon-only")),
            i && this._addClass(this.icon, null, e),
            this._attachIcon(n),
            s
              ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
                this.iconSpace && this.iconSpace.remove())
              : (this.iconSpace ||
                ((this.iconSpace = C("<span> </span>")),
                  this._addClass(this.iconSpace, "ui-button-icon-space")),
                this._removeClass(this.icon, null, "ui-wiget-icon-block"),
                this._attachIconSpace(n));
        },
        _destroy: function () {
          this.element.removeAttr("role"),
            this.icon && this.icon.remove(),
            this.iconSpace && this.iconSpace.remove(),
            this.hasTitle || this.element.removeAttr("title");
        },
        _attachIconSpace: function (t) {
          this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](
            this.iconSpace
          );
        },
        _attachIcon: function (t) {
          this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](
            this.icon
          );
        },
        _setOptions: function (t) {
          var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
            i = void 0 === t.icon ? this.options.icon : t.icon;
          e || i || (t.showLabel = !0), this._super(t);
        },
        _setOption: function (t, e) {
          "icon" === t &&
            (e
              ? this._updateIcon(t, e)
              : this.icon &&
              (this.icon.remove(),
                this.iconSpace && this.iconSpace.remove())),
            "iconPosition" === t && this._updateIcon(t, e),
            "showLabel" === t &&
            (this._toggleClass("ui-button-icon-only", null, !e),
              this._updateTooltip()),
            "label" === t &&
            (this.isInput
              ? this.element.val(e)
              : (this.element.html(e),
                this.icon &&
                (this._attachIcon(this.options.iconPosition),
                  this._attachIconSpace(this.options.iconPosition)))),
            this._super(t, e),
            "disabled" === t &&
            (this._toggleClass(null, "ui-state-disabled", e),
              (this.element[0].disabled = e) && this.element.blur());
        },
        refresh: function () {
          var t = this.element.is("input, button")
            ? this.element[0].disabled
            : this.element.hasClass("ui-button-disabled");
          t !== this.options.disabled && this._setOptions({ disabled: t }),
            this._updateTooltip();
        },
      }),
      !1 !== C.uiBackCompat &&
      (C.widget("ui.button", C.ui.button, {
        options: { text: !0, icons: { primary: null, secondary: null } },
        _create: function () {
          this.options.showLabel &&
            !this.options.text &&
            (this.options.showLabel = this.options.text),
            !this.options.showLabel &&
            this.options.text &&
            (this.options.text = this.options.showLabel),
            this.options.icon ||
              (!this.options.icons.primary && !this.options.icons.secondary)
              ? this.options.icon &&
              (this.options.icons.primary = this.options.icon)
              : this.options.icons.primary
                ? (this.options.icon = this.options.icons.primary)
                : ((this.options.icon = this.options.icons.secondary),
                  (this.options.iconPosition = "end")),
            this._super();
        },
        _setOption: function (t, e) {
          return "text" === t
            ? void this._super("showLabel", e)
            : ("showLabel" === t && (this.options.text = e),
              "icon" === t && (this.options.icons.primary = e),
              "icons" === t &&
              (e.primary
                ? (this._super("icon", e.primary),
                  this._super("iconPosition", "beginning"))
                : e.secondary &&
                (this._super("icon", e.secondary),
                  this._super("iconPosition", "end"))),
              void this._superApply(arguments));
        },
      }),
        (C.fn.button =
          ((y = C.fn.button),
            function () {
              return !this.length ||
                (this.length && "INPUT" !== this[0].tagName) ||
                (this.length &&
                  "INPUT" === this[0].tagName &&
                  "checkbox" !== this.attr("type") &&
                  "radio" !== this.attr("type"))
                ? y.apply(this, arguments)
                : (C.ui.checkboxradio || C.error("Checkboxradio widget missing"),
                  0 === arguments.length
                    ? this.checkboxradio({ icon: !1 })
                    : this.checkboxradio.apply(this, arguments));
            })),
        (C.fn.buttonset = function () {
          return (
            C.ui.controlgroup || C.error("Controlgroup widget missing"),
            "option" === arguments[0] &&
              "items" === arguments[1] &&
              arguments[2]
              ? this.controlgroup.apply(this, [
                arguments[0],
                "items.button",
                arguments[2],
              ])
              : "option" === arguments[0] && "items" === arguments[1]
                ? this.controlgroup.apply(this, [arguments[0], "items.button"])
                : ("object" == typeof arguments[0] &&
                  arguments[0].items &&
                  (arguments[0].items = { button: arguments[0].items }),
                  this.controlgroup.apply(this, arguments))
          );
        })),
      C.ui.button,
      C.extend(C.ui, { datepicker: { version: "1.12.1" } }),
      C.extend(t.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
          return this.dpDiv;
        },
        setDefaults: function (t) {
          return u(this._defaults, t || {}), this;
        },
        _attachDatepicker: function (t, e) {
          var i, n, s;
          (n = "div" === (i = t.nodeName.toLowerCase()) || "span" === i),
            t.id || ((this.uuid += 1), (t.id = "dp" + this.uuid)),
            ((s = this._newInst(C(t), n)).settings = C.extend({}, e || {})),
            "input" === i
              ? this._connectDatepicker(t, s)
              : n && this._inlineDatepicker(t, s);
        },
        _newInst: function (t, e) {
          return {
            id: t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
            input: t,
            selectedDay: 0,
            selectedMonth: 0,
            selectedYear: 0,
            drawMonth: 0,
            drawYear: 0,
            inline: e,
            dpDiv: e
              ? i(
                C(
                  "<div class='" +
                  this._inlineClass +
                  " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
                )
              )
              : this.dpDiv,
          };
        },
        _connectDatepicker: function (t, e) {
          var i = C(t);
          (e.append = C([])),
            (e.trigger = C([])),
            i.hasClass(this.markerClassName) ||
            (this._attachments(i, e),
              i
                .addClass(this.markerClassName)
                .on("keydown", this._doKeyDown)
                .on("keypress", this._doKeyPress)
                .on("keyup", this._doKeyUp),
              this._autoSize(e),
              C.data(t, "datepicker", e),
              e.settings.disabled && this._disableDatepicker(t));
        },
        _attachments: function (t, e) {
          var i,
            n,
            s,
            o = this._get(e, "appendText"),
            r = this._get(e, "isRTL");
          e.append && e.append.remove(),
            o &&
            ((e.append = C(
              "<span class='" + this._appendClass + "'>" + o + "</span>"
            )),
              t[r ? "before" : "after"](e.append)),
            t.off("focus", this._showDatepicker),
            e.trigger && e.trigger.remove(),
            ("focus" !== (i = this._get(e, "showOn")) && "both" !== i) ||
            t.on("focus", this._showDatepicker),
            ("button" !== i && "both" !== i) ||
            ((n = this._get(e, "buttonText")),
              (s = this._get(e, "buttonImage")),
              (e.trigger = C(
                this._get(e, "buttonImageOnly")
                  ? C("<img/>")
                    .addClass(this._triggerClass)
                    .attr({ src: s, alt: n, title: n })
                  : C("<button type='button'></button>")
                    .addClass(this._triggerClass)
                    .html(
                      s ? C("<img/>").attr({ src: s, alt: n, title: n }) : n
                    )
              )),
              t[r ? "before" : "after"](e.trigger),
              e.trigger.on("click", function () {
                return (
                  C.datepicker._datepickerShowing &&
                    C.datepicker._lastInput === t[0]
                    ? C.datepicker._hideDatepicker()
                    : (C.datepicker._datepickerShowing &&
                      C.datepicker._lastInput !== t[0] &&
                      C.datepicker._hideDatepicker(),
                      C.datepicker._showDatepicker(t[0])),
                  !1
                );
              }));
        },
        _autoSize: function (t) {
          if (this._get(t, "autoSize") && !t.inline) {
            var e,
              i,
              n,
              s,
              o = new Date(2009, 11, 20),
              r = this._get(t, "dateFormat");
            r.match(/[DM]/) &&
              ((e = function (t) {
                for (s = n = i = 0; t.length > s; s++)
                  t[s].length > i && ((i = t[s].length), (n = s));
                return n;
              }),
                o.setMonth(
                  e(
                    this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort")
                  )
                ),
                o.setDate(
                  e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) +
                  20 -
                  o.getDay()
                )),
              t.input.attr("size", this._formatDate(t, o).length);
          }
        },
        _inlineDatepicker: function (t, e) {
          var i = C(t);
          i.hasClass(this.markerClassName) ||
            (i.addClass(this.markerClassName).append(e.dpDiv),
              C.data(t, "datepicker", e),
              this._setDate(e, this._getDefaultDate(e), !0),
              this._updateDatepicker(e),
              this._updateAlternate(e),
              e.settings.disabled && this._disableDatepicker(t),
              e.dpDiv.css("display", "block"));
        },
        _dialogDatepicker: function (t, e, i, n, s) {
          var o,
            r,
            a,
            l,
            h,
            c = this._dialogInst;
          return (
            c ||
            ((this.uuid += 1),
              (o = "dp" + this.uuid),
              (this._dialogInput = C(
                "<input type='text' id='" +
                o +
                "' style='position: absolute; top: -100px; width: 0px;'/>"
              )),
              this._dialogInput.on("keydown", this._doKeyDown),
              C("body").append(this._dialogInput),
              ((c = this._dialogInst =
                this._newInst(this._dialogInput, !1)).settings = {}),
              C.data(this._dialogInput[0], "datepicker", c)),
            u(c.settings, n || {}),
            (e = e && e.constructor === Date ? this._formatDate(c, e) : e),
            this._dialogInput.val(e),
            (this._pos = s ? (s.length ? s : [s.pageX, s.pageY]) : null),
            this._pos ||
            ((r = document.documentElement.clientWidth),
              (a = document.documentElement.clientHeight),
              (l =
                document.documentElement.scrollLeft ||
                document.body.scrollLeft),
              (h =
                document.documentElement.scrollTop || document.body.scrollTop),
              (this._pos = [r / 2 - 100 + l, a / 2 - 150 + h])),
            this._dialogInput
              .css("left", this._pos[0] + 20 + "px")
              .css("top", this._pos[1] + "px"),
            (c.settings.onSelect = i),
            (this._inDialog = !0),
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            C.blockUI && C.blockUI(this.dpDiv),
            C.data(this._dialogInput[0], "datepicker", c),
            this
          );
        },
        _destroyDatepicker: function (t) {
          var e,
            i = C(t),
            n = C.data(t, "datepicker");
          i.hasClass(this.markerClassName) &&
            ((e = t.nodeName.toLowerCase()),
              C.removeData(t, "datepicker"),
              "input" === e
                ? (n.append.remove(),
                  n.trigger.remove(),
                  i
                    .removeClass(this.markerClassName)
                    .off("focus", this._showDatepicker)
                    .off("keydown", this._doKeyDown)
                    .off("keypress", this._doKeyPress)
                    .off("keyup", this._doKeyUp))
                : ("div" !== e && "span" !== e) ||
                i.removeClass(this.markerClassName).empty(),
              b === n && (b = null));
        },
        _enableDatepicker: function (e) {
          var t,
            i,
            n = C(e),
            s = C.data(e, "datepicker");
          n.hasClass(this.markerClassName) &&
            ("input" === (t = e.nodeName.toLowerCase())
              ? ((e.disabled = !1),
                s.trigger
                  .filter("button")
                  .each(function () {
                    this.disabled = !1;
                  })
                  .end()
                  .filter("img")
                  .css({ opacity: "1.0", cursor: "" }))
              : ("div" !== t && "span" !== t) ||
              ((i = n.children("." + this._inlineClass))
                .children()
                .removeClass("ui-state-disabled"),
                i
                  .find("select.ui-datepicker-month, select.ui-datepicker-year")
                  .prop("disabled", !1)),
              (this._disabledInputs = C.map(this._disabledInputs, function (t) {
                return t === e ? null : t;
              })));
        },
        _disableDatepicker: function (e) {
          var t,
            i,
            n = C(e),
            s = C.data(e, "datepicker");
          n.hasClass(this.markerClassName) &&
            ("input" === (t = e.nodeName.toLowerCase())
              ? ((e.disabled = !0),
                s.trigger
                  .filter("button")
                  .each(function () {
                    this.disabled = !0;
                  })
                  .end()
                  .filter("img")
                  .css({ opacity: "0.5", cursor: "default" }))
              : ("div" !== t && "span" !== t) ||
              ((i = n.children("." + this._inlineClass))
                .children()
                .addClass("ui-state-disabled"),
                i
                  .find("select.ui-datepicker-month, select.ui-datepicker-year")
                  .prop("disabled", !0)),
              (this._disabledInputs = C.map(this._disabledInputs, function (t) {
                return t === e ? null : t;
              })),
              (this._disabledInputs[this._disabledInputs.length] = e));
        },
        _isDisabledDatepicker: function (t) {
          if (!t) return !1;
          for (var e = 0; this._disabledInputs.length > e; e++)
            if (this._disabledInputs[e] === t) return !0;
          return !1;
        },
        _getInst: function (t) {
          try {
            return C.data(t, "datepicker");
          } catch (t) {
            throw "Missing instance data for this datepicker";
          }
        },
        _optionDatepicker: function (t, e, i) {
          var n,
            s,
            o,
            r,
            a = this._getInst(t);
          return 2 === arguments.length && "string" == typeof e
            ? "defaults" === e
              ? C.extend({}, C.datepicker._defaults)
              : a
                ? "all" === e
                  ? C.extend({}, a.settings)
                  : this._get(a, e)
                : null
            : ((n = e || {}),
              "string" == typeof e && ((n = {})[e] = i),
              void (
                a &&
                (this._curInst === a && this._hideDatepicker(),
                  (s = this._getDateDatepicker(t, !0)),
                  (o = this._getMinMaxDate(a, "min")),
                  (r = this._getMinMaxDate(a, "max")),
                  u(a.settings, n),
                  null !== o &&
                  void 0 !== n.dateFormat &&
                  void 0 === n.minDate &&
                  (a.settings.minDate = this._formatDate(a, o)),
                  null !== r &&
                  void 0 !== n.dateFormat &&
                  void 0 === n.maxDate &&
                  (a.settings.maxDate = this._formatDate(a, r)),
                  "disabled" in n &&
                  (n.disabled
                    ? this._disableDatepicker(t)
                    : this._enableDatepicker(t)),
                  this._attachments(C(t), a),
                  this._autoSize(a),
                  this._setDate(a, s),
                  this._updateAlternate(a),
                  this._updateDatepicker(a))
              ));
        },
        _changeDatepicker: function (t, e, i) {
          this._optionDatepicker(t, e, i);
        },
        _refreshDatepicker: function (t) {
          var e = this._getInst(t);
          e && this._updateDatepicker(e);
        },
        _setDateDatepicker: function (t, e) {
          var i = this._getInst(t);
          i &&
            (this._setDate(i, e),
              this._updateDatepicker(i),
              this._updateAlternate(i));
        },
        _getDateDatepicker: function (t, e) {
          var i = this._getInst(t);
          return (
            i && !i.inline && this._setDateFromField(i, e),
            i ? this._getDate(i) : null
          );
        },
        _doKeyDown: function (t) {
          var e,
            i,
            n,
            s = C.datepicker._getInst(t.target),
            o = !0,
            r = s.dpDiv.is(".ui-datepicker-rtl");
          if (((s._keyEvent = !0), C.datepicker._datepickerShowing))
            switch (t.keyCode) {
              case 9:
                C.datepicker._hideDatepicker(), (o = !1);
                break;
              case 13:
                return (
                  (n = C(
                    "td." +
                    C.datepicker._dayOverClass +
                    ":not(." +
                    C.datepicker._currentClass +
                    ")",
                    s.dpDiv
                  ))[0] &&
                  C.datepicker._selectDay(
                    t.target,
                    s.selectedMonth,
                    s.selectedYear,
                    n[0]
                  ),
                  (e = C.datepicker._get(s, "onSelect"))
                    ? ((i = C.datepicker._formatDate(s)),
                      e.apply(s.input ? s.input[0] : null, [i, s]))
                    : C.datepicker._hideDatepicker(),
                  !1
                );
              case 27:
                C.datepicker._hideDatepicker();
                break;
              case 33:
                C.datepicker._adjustDate(
                  t.target,
                  t.ctrlKey
                    ? -C.datepicker._get(s, "stepBigMonths")
                    : -C.datepicker._get(s, "stepMonths"),
                  "M"
                );
                break;
              case 34:
                C.datepicker._adjustDate(
                  t.target,
                  t.ctrlKey
                    ? +C.datepicker._get(s, "stepBigMonths")
                    : +C.datepicker._get(s, "stepMonths"),
                  "M"
                );
                break;
              case 35:
                (t.ctrlKey || t.metaKey) && C.datepicker._clearDate(t.target),
                  (o = t.ctrlKey || t.metaKey);
                break;
              case 36:
                (t.ctrlKey || t.metaKey) && C.datepicker._gotoToday(t.target),
                  (o = t.ctrlKey || t.metaKey);
                break;
              case 37:
                (t.ctrlKey || t.metaKey) &&
                  C.datepicker._adjustDate(t.target, r ? 1 : -1, "D"),
                  (o = t.ctrlKey || t.metaKey),
                  t.originalEvent.altKey &&
                  C.datepicker._adjustDate(
                    t.target,
                    t.ctrlKey
                      ? -C.datepicker._get(s, "stepBigMonths")
                      : -C.datepicker._get(s, "stepMonths"),
                    "M"
                  );
                break;
              case 38:
                (t.ctrlKey || t.metaKey) &&
                  C.datepicker._adjustDate(t.target, -7, "D"),
                  (o = t.ctrlKey || t.metaKey);
                break;
              case 39:
                (t.ctrlKey || t.metaKey) &&
                  C.datepicker._adjustDate(t.target, r ? -1 : 1, "D"),
                  (o = t.ctrlKey || t.metaKey),
                  t.originalEvent.altKey &&
                  C.datepicker._adjustDate(
                    t.target,
                    t.ctrlKey
                      ? +C.datepicker._get(s, "stepBigMonths")
                      : +C.datepicker._get(s, "stepMonths"),
                    "M"
                  );
                break;
              case 40:
                (t.ctrlKey || t.metaKey) &&
                  C.datepicker._adjustDate(t.target, 7, "D"),
                  (o = t.ctrlKey || t.metaKey);
                break;
              default:
                o = !1;
            }
          else
            36 === t.keyCode && t.ctrlKey
              ? C.datepicker._showDatepicker(this)
              : (o = !1);
          o && (t.preventDefault(), t.stopPropagation());
        },
        _doKeyPress: function (t) {
          var e,
            i,
            n = C.datepicker._getInst(t.target);
          return C.datepicker._get(n, "constrainInput")
            ? ((e = C.datepicker._possibleChars(
              C.datepicker._get(n, "dateFormat")
            )),
              (i = String.fromCharCode(
                null == t.charCode ? t.keyCode : t.charCode
              )),
              t.ctrlKey || t.metaKey || i < " " || !e || -1 < e.indexOf(i))
            : void 0;
        },
        _doKeyUp: function (t) {
          var e = C.datepicker._getInst(t.target);
          if (e.input.val() !== e.lastVal)
            try {
              C.datepicker.parseDate(
                C.datepicker._get(e, "dateFormat"),
                e.input ? e.input.val() : null,
                C.datepicker._getFormatConfig(e)
              ) &&
                (C.datepicker._setDateFromField(e),
                  C.datepicker._updateAlternate(e),
                  C.datepicker._updateDatepicker(e));
            } catch (t) { }
          return !0;
        },
        _showDatepicker: function (t) {
          var e, i, n, s, o, r, a;
          "input" !== (t = t.target || t).nodeName.toLowerCase() &&
            (t = C("input", t.parentNode)[0]),
            C.datepicker._isDisabledDatepicker(t) ||
            C.datepicker._lastInput === t ||
            ((e = C.datepicker._getInst(t)),
              C.datepicker._curInst &&
              C.datepicker._curInst !== e &&
              (C.datepicker._curInst.dpDiv.stop(!0, !0),
                e &&
                C.datepicker._datepickerShowing &&
                C.datepicker._hideDatepicker(C.datepicker._curInst.input[0])),
              !1 !==
              (n = (i = C.datepicker._get(e, "beforeShow"))
                ? i.apply(t, [t, e])
                : {}) &&
              (u(e.settings, n),
                (e.lastVal = null),
                (C.datepicker._lastInput = t),
                C.datepicker._setDateFromField(e),
                C.datepicker._inDialog && (t.value = ""),
                C.datepicker._pos ||
                ((C.datepicker._pos = C.datepicker._findPos(t)),
                  (C.datepicker._pos[1] += t.offsetHeight)),
                (s = !1),
                C(t)
                  .parents()
                  .each(function () {
                    return !(s |= "fixed" === C(this).css("position"));
                  }),
                (o = { left: C.datepicker._pos[0], top: C.datepicker._pos[1] }),
                (C.datepicker._pos = null),
                e.dpDiv.empty(),
                e.dpDiv.css({
                  position: "absolute",
                  display: "block",
                  top: "-1000px",
                }),
                C.datepicker._updateDatepicker(e),
                (o = C.datepicker._checkOffset(e, o, s)),
                e.dpDiv.css({
                  position:
                    C.datepicker._inDialog && C.blockUI
                      ? "static"
                      : s
                        ? "fixed"
                        : "absolute",
                  display: "none",
                  left: o.left + "px",
                  top: o.top + "px",
                }),
                e.inline ||
                ((r = C.datepicker._get(e, "showAnim")),
                  (a = C.datepicker._get(e, "duration")),
                  e.dpDiv.css(
                    "z-index",
                    (function (t) {
                      for (var e, i; t.length && t[0] !== document;) {
                        if (
                          ("absolute" === (e = t.css("position")) ||
                            "relative" === e ||
                            "fixed" === e) &&
                          ((i = parseInt(t.css("zIndex"), 10)),
                            !isNaN(i) && 0 !== i)
                        )
                          return i;
                        t = t.parent();
                      }
                      return 0;
                    })(C(t)) + 1
                  ),
                  (C.datepicker._datepickerShowing = !0),
                  C.effects && C.effects.effect[r]
                    ? e.dpDiv.show(r, C.datepicker._get(e, "showOptions"), a)
                    : e.dpDiv[r || "show"](r ? a : null),
                  C.datepicker._shouldFocusInput(e) && e.input.trigger("focus"),
                  (C.datepicker._curInst = e))));
        },
        _updateDatepicker: function (t) {
          (this.maxRows = 4),
            (b = t).dpDiv.empty().append(this._generateHTML(t)),
            this._attachHandlers(t);
          var e,
            i = this._getNumberOfMonths(t),
            n = i[1],
            s = t.dpDiv.find("." + this._dayOverClass + " a");
          0 < s.length && o.apply(s.get(0)),
            t.dpDiv
              .removeClass(
                "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
              )
              .width(""),
            1 < n &&
            t.dpDiv
              .addClass("ui-datepicker-multi-" + n)
              .css("width", 17 * n + "em"),
            t.dpDiv[(1 !== i[0] || 1 !== i[1] ? "add" : "remove") + "Class"](
              "ui-datepicker-multi"
            ),
            t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"](
              "ui-datepicker-rtl"
            ),
            t === C.datepicker._curInst &&
            C.datepicker._datepickerShowing &&
            C.datepicker._shouldFocusInput(t) &&
            t.input.trigger("focus"),
            t.yearshtml &&
            ((e = t.yearshtml),
              setTimeout(function () {
                e === t.yearshtml &&
                  t.yearshtml &&
                  t.dpDiv
                    .find("select.ui-datepicker-year:first")
                    .replaceWith(t.yearshtml),
                  (e = t.yearshtml = null);
              }, 0));
        },
        _shouldFocusInput: function (t) {
          return (
            t.input &&
            t.input.is(":visible") &&
            !t.input.is(":disabled") &&
            !t.input.is(":focus")
          );
        },
        _checkOffset: function (t, e, i) {
          var n = t.dpDiv.outerWidth(),
            s = t.dpDiv.outerHeight(),
            o = t.input ? t.input.outerWidth() : 0,
            r = t.input ? t.input.outerHeight() : 0,
            a =
              document.documentElement.clientWidth +
              (i ? 0 : C(document).scrollLeft()),
            l =
              document.documentElement.clientHeight +
              (i ? 0 : C(document).scrollTop());
          return (
            (e.left -= this._get(t, "isRTL") ? n - o : 0),
            (e.left -=
              i && e.left === t.input.offset().left
                ? C(document).scrollLeft()
                : 0),
            (e.top -=
              i && e.top === t.input.offset().top + r
                ? C(document).scrollTop()
                : 0),
            (e.left -= Math.min(
              e.left,
              e.left + n > a && n < a ? Math.abs(e.left + n - a) : 0
            )),
            (e.top -= Math.min(
              e.top,
              e.top + s > l && s < l ? Math.abs(s + r) : 0
            )),
            e
          );
        },
        _findPos: function (t) {
          for (
            var e, i = this._getInst(t), n = this._get(i, "isRTL");
            t &&
            ("hidden" === t.type ||
              1 !== t.nodeType ||
              C.expr.filters.hidden(t));

          )
            t = t[n ? "previousSibling" : "nextSibling"];
          return [(e = C(t).offset()).left, e.top];
        },
        _hideDatepicker: function (t) {
          var e,
            i,
            n,
            s,
            o = this._curInst;
          !o ||
            (t && o !== C.data(t, "datepicker")) ||
            (this._datepickerShowing &&
              ((e = this._get(o, "showAnim")),
                (i = this._get(o, "duration")),
                (n = function () {
                  C.datepicker._tidyDialog(o);
                }),
                C.effects && (C.effects.effect[e] || C.effects[e])
                  ? o.dpDiv.hide(e, C.datepicker._get(o, "showOptions"), i, n)
                  : o.dpDiv[
                    "slideDown" === e
                      ? "slideUp"
                      : "fadeIn" === e
                        ? "fadeOut"
                        : "hide"
                  ](e ? i : null, n),
                e || n(),
                (this._datepickerShowing = !1),
                (s = this._get(o, "onClose")) &&
                s.apply(o.input ? o.input[0] : null, [
                  o.input ? o.input.val() : "",
                  o,
                ]),
                (this._lastInput = null),
                this._inDialog &&
                (this._dialogInput.css({
                  position: "absolute",
                  left: "0",
                  top: "-100px",
                }),
                  C.blockUI && (C.unblockUI(), C("body").append(this.dpDiv))),
                (this._inDialog = !1)));
        },
        _tidyDialog: function (t) {
          t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
        },
        _checkExternalClick: function (t) {
          if (C.datepicker._curInst) {
            var e = C(t.target),
              i = C.datepicker._getInst(e[0]);
            ((e[0].id === C.datepicker._mainDivId ||
              0 !== e.parents("#" + C.datepicker._mainDivId).length ||
              e.hasClass(C.datepicker.markerClassName) ||
              e.closest("." + C.datepicker._triggerClass).length ||
              !C.datepicker._datepickerShowing ||
              (C.datepicker._inDialog && C.blockUI)) &&
              (!e.hasClass(C.datepicker.markerClassName) ||
                C.datepicker._curInst === i)) ||
              C.datepicker._hideDatepicker();
          }
        },
        _adjustDate: function (t, e, i) {
          var n = C(t),
            s = this._getInst(n[0]);
          this._isDisabledDatepicker(n[0]) ||
            (this._adjustInstDate(
              s,
              e + ("M" === i ? this._get(s, "showCurrentAtPos") : 0),
              i
            ),
              this._updateDatepicker(s));
        },
        _gotoToday: function (t) {
          var e,
            i = C(t),
            n = this._getInst(i[0]);
          this._get(n, "gotoCurrent") && n.currentDay
            ? ((n.selectedDay = n.currentDay),
              (n.drawMonth = n.selectedMonth = n.currentMonth),
              (n.drawYear = n.selectedYear = n.currentYear))
            : ((e = new Date()),
              (n.selectedDay = e.getDate()),
              (n.drawMonth = n.selectedMonth = e.getMonth()),
              (n.drawYear = n.selectedYear = e.getFullYear())),
            this._notifyChange(n),
            this._adjustDate(i);
        },
        _selectMonthYear: function (t, e, i) {
          var n = C(t),
            s = this._getInst(n[0]);
          (s["selected" + ("M" === i ? "Month" : "Year")] = s[
            "draw" + ("M" === i ? "Month" : "Year")
          ] =
            parseInt(e.options[e.selectedIndex].value, 10)),
            this._notifyChange(s),
            this._adjustDate(n);
        },
        _selectDay: function (t, e, i, n) {
          var s,
            o = C(t);
          C(n).hasClass(this._unselectableClass) ||
            this._isDisabledDatepicker(o[0]) ||
            (((s = this._getInst(o[0])).selectedDay = s.currentDay =
              C("a", n).html()),
              (s.selectedMonth = s.currentMonth = e),
              (s.selectedYear = s.currentYear = i),
              this._selectDate(
                t,
                this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear)
              ));
        },
        _clearDate: function (t) {
          var e = C(t);
          this._selectDate(e, "");
        },
        _selectDate: function (t, e) {
          var i,
            n = C(t),
            s = this._getInst(n[0]);
          (e = null != e ? e : this._formatDate(s)),
            s.input && s.input.val(e),
            this._updateAlternate(s),
            (i = this._get(s, "onSelect"))
              ? i.apply(s.input ? s.input[0] : null, [e, s])
              : s.input && s.input.trigger("change"),
            s.inline
              ? this._updateDatepicker(s)
              : (this._hideDatepicker(),
                (this._lastInput = s.input[0]),
                "object" != typeof s.input[0] && s.input.trigger("focus"),
                (this._lastInput = null));
        },
        _updateAlternate: function (t) {
          var e,
            i,
            n,
            s = this._get(t, "altField");
          s &&
            ((e = this._get(t, "altFormat") || this._get(t, "dateFormat")),
              (i = this._getDate(t)),
              (n = this.formatDate(e, i, this._getFormatConfig(t))),
              C(s).val(n));
        },
        noWeekends: function (t) {
          var e = t.getDay();
          return [0 < e && e < 6, ""];
        },
        iso8601Week: function (t) {
          var e,
            i = new Date(t.getTime());
          return (
            i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
            (e = i.getTime()),
            i.setMonth(0),
            i.setDate(1),
            Math.floor(Math.round((e - i) / 864e5) / 7) + 1
          );
        },
        parseDate: function (i, o, t) {
          if (null == i || null == o) throw "Invalid arguments";
          if ("" === (o = "object" == typeof o ? "" + o : o + "")) return null;
          function r(t) {
            var e = i.length > a + 1 && i.charAt(a + 1) === t;
            return e && a++, e;
          }
          function e(t) {
            var e = r(t),
              i =
                "@" === t
                  ? 14
                  : "!" === t
                    ? 20
                    : "y" === t && e
                      ? 4
                      : "o" === t
                        ? 3
                        : 2,
              n = RegExp("^\\d{" + ("y" === t ? i : 1) + "," + i + "}"),
              s = o.substring(u).match(n);
            if (!s) throw "Missing number at position " + u;
            return (u += s[0].length), parseInt(s[0], 10);
          }
          function n(t, e, i) {
            var n = -1,
              s = C.map(r(t) ? i : e, function (t, e) {
                return [[e, t]];
              }).sort(function (t, e) {
                return -(t[1].length - e[1].length);
              });
            if (
              (C.each(s, function (t, e) {
                var i = e[1];
                return o.substr(u, i.length).toLowerCase() === i.toLowerCase()
                  ? ((n = e[0]), (u += i.length), !1)
                  : void 0;
              }),
                -1 !== n)
            )
              return n + 1;
            throw "Unknown name at position " + u;
          }
          function s() {
            if (o.charAt(u) !== i.charAt(a))
              throw "Unexpected literal at position " + u;
            u++;
          }
          var a,
            l,
            h,
            c,
            u = 0,
            d =
              (t ? t.shortYearCutoff : null) || this._defaults.shortYearCutoff,
            p =
              "string" != typeof d
                ? d
                : (new Date().getFullYear() % 100) + parseInt(d, 10),
            f = (t ? t.dayNamesShort : null) || this._defaults.dayNamesShort,
            g = (t ? t.dayNames : null) || this._defaults.dayNames,
            m =
              (t ? t.monthNamesShort : null) || this._defaults.monthNamesShort,
            v = (t ? t.monthNames : null) || this._defaults.monthNames,
            _ = -1,
            y = -1,
            b = -1,
            w = -1,
            x = !1;
          for (a = 0; i.length > a; a++)
            if (x) "'" !== i.charAt(a) || r("'") ? s() : (x = !1);
            else
              switch (i.charAt(a)) {
                case "d":
                  b = e("d");
                  break;
                case "D":
                  n("D", f, g);
                  break;
                case "o":
                  w = e("o");
                  break;
                case "m":
                  y = e("m");
                  break;
                case "M":
                  y = n("M", m, v);
                  break;
                case "y":
                  _ = e("y");
                  break;
                case "@":
                  (_ = (c = new Date(e("@"))).getFullYear()),
                    (y = c.getMonth() + 1),
                    (b = c.getDate());
                  break;
                case "!":
                  (_ = (c = new Date(
                    (e("!") - this._ticksTo1970) / 1e4
                  )).getFullYear()),
                    (y = c.getMonth() + 1),
                    (b = c.getDate());
                  break;
                case "'":
                  r("'") ? s() : (x = !0);
                  break;
                default:
                  s();
              }
          if (o.length > u && ((h = o.substr(u)), !/^\s+/.test(h)))
            throw "Extra/unparsed characters found in date: " + h;
          if (
            (-1 === _
              ? (_ = new Date().getFullYear())
              : _ < 100 &&
              (_ +=
                new Date().getFullYear() -
                (new Date().getFullYear() % 100) +
                (_ <= p ? 0 : -100)),
              -1 < w)
          )
            for (y = 1, b = w; !(b <= (l = this._getDaysInMonth(_, y - 1)));)
              y++, (b -= l);
          if (
            (c = this._daylightSavingAdjust(
              new Date(_, y - 1, b)
            )).getFullYear() !== _ ||
            c.getMonth() + 1 !== y ||
            c.getDate() !== b
          )
            throw "Invalid date";
          return c;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970:
          864e9 *
          (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (i, t, e) {
          if (!t) return "";
          function s(t) {
            var e = i.length > r + 1 && i.charAt(r + 1) === t;
            return e && r++, e;
          }
          function n(t, e, i) {
            var n = "" + e;
            if (s(t)) for (; i > n.length;) n = "0" + n;
            return n;
          }
          function o(t, e, i, n) {
            return s(t) ? n[e] : i[e];
          }
          var r,
            a = (e ? e.dayNamesShort : null) || this._defaults.dayNamesShort,
            l = (e ? e.dayNames : null) || this._defaults.dayNames,
            h =
              (e ? e.monthNamesShort : null) || this._defaults.monthNamesShort,
            c = (e ? e.monthNames : null) || this._defaults.monthNames,
            u = "",
            d = !1;
          if (t)
            for (r = 0; i.length > r; r++)
              if (d)
                "'" !== i.charAt(r) || s("'") ? (u += i.charAt(r)) : (d = !1);
              else
                switch (i.charAt(r)) {
                  case "d":
                    u += n("d", t.getDate(), 2);
                    break;
                  case "D":
                    u += o("D", t.getDay(), a, l);
                    break;
                  case "o":
                    u += n(
                      "o",
                      Math.round(
                        (new Date(
                          t.getFullYear(),
                          t.getMonth(),
                          t.getDate()
                        ).getTime() -
                          new Date(t.getFullYear(), 0, 0).getTime()) /
                        864e5
                      ),
                      3
                    );
                    break;
                  case "m":
                    u += n("m", t.getMonth() + 1, 2);
                    break;
                  case "M":
                    u += o("M", t.getMonth(), h, c);
                    break;
                  case "y":
                    u += s("y")
                      ? t.getFullYear()
                      : (t.getFullYear() % 100 < 10 ? "0" : "") +
                      (t.getFullYear() % 100);
                    break;
                  case "@":
                    u += t.getTime();
                    break;
                  case "!":
                    u += 1e4 * t.getTime() + this._ticksTo1970;
                    break;
                  case "'":
                    s("'") ? (u += "'") : (d = !0);
                    break;
                  default:
                    u += i.charAt(r);
                }
          return u;
        },
        _possibleChars: function (i) {
          function t(t) {
            var e = i.length > n + 1 && i.charAt(n + 1) === t;
            return e && n++, e;
          }
          var n,
            e = "",
            s = !1;
          for (n = 0; i.length > n; n++)
            if (s)
              "'" !== i.charAt(n) || t("'") ? (e += i.charAt(n)) : (s = !1);
            else
              switch (i.charAt(n)) {
                case "d":
                case "m":
                case "y":
                case "@":
                  e += "0123456789";
                  break;
                case "D":
                case "M":
                  return null;
                case "'":
                  t("'") ? (e += "'") : (s = !0);
                  break;
                default:
                  e += i.charAt(n);
              }
          return e;
        },
        _get: function (t, e) {
          return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e];
        },
        _setDateFromField: function (t, e) {
          if (t.input.val() !== t.lastVal) {
            var i = this._get(t, "dateFormat"),
              n = (t.lastVal = t.input ? t.input.val() : null),
              s = this._getDefaultDate(t),
              o = s,
              r = this._getFormatConfig(t);
            try {
              o = this.parseDate(i, n, r) || s;
            } catch (t) {
              n = e ? "" : n;
            }
            (t.selectedDay = o.getDate()),
              (t.drawMonth = t.selectedMonth = o.getMonth()),
              (t.drawYear = t.selectedYear = o.getFullYear()),
              (t.currentDay = n ? o.getDate() : 0),
              (t.currentMonth = n ? o.getMonth() : 0),
              (t.currentYear = n ? o.getFullYear() : 0),
              this._adjustInstDate(t);
          }
        },
        _getDefaultDate: function (t) {
          return this._restrictMinMax(
            t,
            this._determineDate(t, this._get(t, "defaultDate"), new Date())
          );
        },
        _determineDate: function (a, t, e) {
          var i,
            n,
            s =
              null == t || "" === t
                ? e
                : "string" == typeof t
                  ? (function (t) {
                    try {
                      return C.datepicker.parseDate(
                        C.datepicker._get(a, "dateFormat"),
                        t,
                        C.datepicker._getFormatConfig(a)
                      );
                    } catch (t) { }
                    for (
                      var e =
                        (t.toLowerCase().match(/^c/)
                          ? C.datepicker._getDate(a)
                          : null) || new Date(),
                      i = e.getFullYear(),
                      n = e.getMonth(),
                      s = e.getDate(),
                      o = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                      r = o.exec(t);
                      r;

                    ) {
                      switch (r[2] || "d") {
                        case "d":
                        case "D":
                          s += parseInt(r[1], 10);
                          break;
                        case "w":
                        case "W":
                          s += 7 * parseInt(r[1], 10);
                          break;
                        case "m":
                        case "M":
                          (n += parseInt(r[1], 10)),
                            (s = Math.min(
                              s,
                              C.datepicker._getDaysInMonth(i, n)
                            ));
                          break;
                        case "y":
                        case "Y":
                          (i += parseInt(r[1], 10)),
                            (s = Math.min(
                              s,
                              C.datepicker._getDaysInMonth(i, n)
                            ));
                      }
                      r = o.exec(t);
                    }
                    return new Date(i, n, s);
                  })(t)
                  : "number" == typeof t
                    ? isNaN(t)
                      ? e
                      : ((i = t), (n = new Date()).setDate(n.getDate() + i), n)
                    : new Date(t.getTime());
          return (
            (s = s && "Invalid Date" == "" + s ? e : s) &&
            (s.setHours(0),
              s.setMinutes(0),
              s.setSeconds(0),
              s.setMilliseconds(0)),
            this._daylightSavingAdjust(s)
          );
        },
        _daylightSavingAdjust: function (t) {
          return t
            ? (t.setHours(12 < t.getHours() ? t.getHours() + 2 : 0), t)
            : null;
        },
        _setDate: function (t, e, i) {
          var n = !e,
            s = t.selectedMonth,
            o = t.selectedYear,
            r = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
          (t.selectedDay = t.currentDay = r.getDate()),
            (t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth()),
            (t.drawYear = t.selectedYear = t.currentYear = r.getFullYear()),
            (s === t.selectedMonth && o === t.selectedYear) ||
            i ||
            this._notifyChange(t),
            this._adjustInstDate(t),
            t.input && t.input.val(n ? "" : this._formatDate(t));
        },
        _getDate: function (t) {
          return !t.currentYear || (t.input && "" === t.input.val())
            ? null
            : this._daylightSavingAdjust(
              new Date(t.currentYear, t.currentMonth, t.currentDay)
            );
        },
        _attachHandlers: function (t) {
          var e = this._get(t, "stepMonths"),
            i = "#" + t.id.replace(/\\\\/g, "\\");
          t.dpDiv.find("[data-handler]").map(function () {
            var t = {
              prev: function () {
                C.datepicker._adjustDate(i, -e, "M");
              },
              next: function () {
                C.datepicker._adjustDate(i, +e, "M");
              },
              hide: function () {
                C.datepicker._hideDatepicker();
              },
              today: function () {
                C.datepicker._gotoToday(i);
              },
              selectDay: function () {
                return (
                  C.datepicker._selectDay(
                    i,
                    +this.getAttribute("data-month"),
                    +this.getAttribute("data-year"),
                    this
                  ),
                  !1
                );
              },
              selectMonth: function () {
                return C.datepicker._selectMonthYear(i, this, "M"), !1;
              },
              selectYear: function () {
                return C.datepicker._selectMonthYear(i, this, "Y"), !1;
              },
            };
            C(this).on(
              this.getAttribute("data-event"),
              t[this.getAttribute("data-handler")]
            );
          });
        },
        _generateHTML: function (t) {
          var e,
            i,
            n,
            s,
            o,
            r,
            a,
            l,
            h,
            c,
            u,
            d,
            p,
            f,
            g,
            m,
            v,
            _,
            y,
            b,
            w,
            x,
            C,
            k,
            D,
            T,
            I,
            S,
            E,
            A,
            P,
            j,
            O,
            N,
            M,
            H,
            z,
            W,
            L,
            R = new Date(),
            F = this._daylightSavingAdjust(
              new Date(R.getFullYear(), R.getMonth(), R.getDate())
            ),
            q = this._get(t, "isRTL"),
            B = this._get(t, "showButtonPanel"),
            $ = this._get(t, "hideIfNoPrevNext"),
            U = this._get(t, "navigationAsDateFormat"),
            Y = this._getNumberOfMonths(t),
            K = this._get(t, "showCurrentAtPos"),
            V = this._get(t, "stepMonths"),
            Q = 1 !== Y[0] || 1 !== Y[1],
            X = this._daylightSavingAdjust(
              t.currentDay
                ? new Date(t.currentYear, t.currentMonth, t.currentDay)
                : new Date(9999, 9, 9)
            ),
            G = this._getMinMaxDate(t, "min"),
            J = this._getMinMaxDate(t, "max"),
            Z = t.drawMonth - K,
            tt = t.drawYear;
          if ((Z < 0 && ((Z += 12), tt--), J))
            for (
              e = this._daylightSavingAdjust(
                new Date(
                  J.getFullYear(),
                  J.getMonth() - Y[0] * Y[1] + 1,
                  J.getDate()
                )
              ),
              e = G && e < G ? G : e;
              this._daylightSavingAdjust(new Date(tt, Z, 1)) > e;

            )
              --Z < 0 && ((Z = 11), tt--);
          for (
            t.drawMonth = Z,
            t.drawYear = tt,
            i = this._get(t, "prevText"),
            i = U
              ? this.formatDate(
                i,
                this._daylightSavingAdjust(new Date(tt, Z - V, 1)),
                this._getFormatConfig(t)
              )
              : i,
            n = this._canAdjustMonth(t, -1, tt, Z)
              ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" +
              i +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (q ? "e" : "w") +
              "'>" +
              i +
              "</span></a>"
              : $
                ? ""
                : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
                i +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (q ? "e" : "w") +
                "'>" +
                i +
                "</span></a>",
            s = this._get(t, "nextText"),
            s = U
              ? this.formatDate(
                s,
                this._daylightSavingAdjust(new Date(tt, Z + V, 1)),
                this._getFormatConfig(t)
              )
              : s,
            o = this._canAdjustMonth(t, 1, tt, Z)
              ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" +
              s +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (q ? "w" : "e") +
              "'>" +
              s +
              "</span></a>"
              : $
                ? ""
                : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
                s +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (q ? "w" : "e") +
                "'>" +
                s +
                "</span></a>",
            r = this._get(t, "currentText"),
            a = this._get(t, "gotoCurrent") && t.currentDay ? X : F,
            r = U ? this.formatDate(r, a, this._getFormatConfig(t)) : r,
            l = t.inline
              ? ""
              : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
              this._get(t, "closeText") +
              "</button>",
            h = B
              ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
              (q ? l : "") +
              (this._isInRange(t, a)
                ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                r +
                "</button>"
                : "") +
              (q ? "" : l) +
              "</div>"
              : "",
            c = parseInt(this._get(t, "firstDay"), 10),
            c = isNaN(c) ? 0 : c,
            u = this._get(t, "showWeek"),
            d = this._get(t, "dayNames"),
            p = this._get(t, "dayNamesMin"),
            f = this._get(t, "monthNames"),
            g = this._get(t, "monthNamesShort"),
            m = this._get(t, "beforeShowDay"),
            v = this._get(t, "showOtherMonths"),
            _ = this._get(t, "selectOtherMonths"),
            y = this._getDefaultDate(t),
            b = "",
            x = 0;
            Y[0] > x;
            x++
          ) {
            for (C = "", this.maxRows = 4, k = 0; Y[1] > k; k++) {
              if (
                ((D = this._daylightSavingAdjust(
                  new Date(tt, Z, t.selectedDay)
                )),
                  (T = " ui-corner-all"),
                  (I = ""),
                  Q)
              ) {
                if (((I += "<div class='ui-datepicker-group"), 1 < Y[1]))
                  switch (k) {
                    case 0:
                      (I += " ui-datepicker-group-first"),
                        (T = " ui-corner-" + (q ? "right" : "left"));
                      break;
                    case Y[1] - 1:
                      (I += " ui-datepicker-group-last"),
                        (T = " ui-corner-" + (q ? "left" : "right"));
                      break;
                    default:
                      (I += " ui-datepicker-group-middle"), (T = "");
                  }
                I += "'>";
              }
              for (
                I +=
                "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
                T +
                "'>" +
                (/all|left/.test(T) && 0 === x ? (q ? o : n) : "") +
                (/all|right/.test(T) && 0 === x ? (q ? n : o) : "") +
                this._generateMonthYearHeader(
                  t,
                  Z,
                  tt,
                  G,
                  J,
                  0 < x || 0 < k,
                  f,
                  g
                ) +
                "</div><table class='ui-datepicker-calendar'><thead><tr>",
                S = u
                  ? "<th class='ui-datepicker-week-col'>" +
                  this._get(t, "weekHeader") +
                  "</th>"
                  : "",
                w = 0;
                w < 7;
                w++
              )
                S +=
                  "<th scope='col'" +
                  (5 <= (w + c + 6) % 7
                    ? " class='ui-datepicker-week-end'"
                    : "") +
                  "><span title='" +
                  d[(E = (w + c) % 7)] +
                  "'>" +
                  p[E] +
                  "</span></th>";
              for (
                I += S + "</tr></thead><tbody>",
                A = this._getDaysInMonth(tt, Z),
                tt === t.selectedYear &&
                Z === t.selectedMonth &&
                (t.selectedDay = Math.min(t.selectedDay, A)),
                P = (this._getFirstDayOfMonth(tt, Z) - c + 7) % 7,
                j = Math.ceil((P + A) / 7),
                O = Q && this.maxRows > j ? this.maxRows : j,
                this.maxRows = O,
                N = this._daylightSavingAdjust(new Date(tt, Z, 1 - P)),
                M = 0;
                M < O;
                M++
              ) {
                for (
                  I += "<tr>",
                  H = u
                    ? "<td class='ui-datepicker-week-col'>" +
                    this._get(t, "calculateWeek")(N) +
                    "</td>"
                    : "",
                  w = 0;
                  w < 7;
                  w++
                )
                  (z = m
                    ? m.apply(t.input ? t.input[0] : null, [N])
                    : [!0, ""]),
                    (L =
                      ((W = N.getMonth() !== Z) && !_) ||
                      !z[0] ||
                      (G && N < G) ||
                      (J && J < N)),
                    (H +=
                      "<td class='" +
                      (5 <= (w + c + 6) % 7 ? " ui-datepicker-week-end" : "") +
                      (W ? " ui-datepicker-other-month" : "") +
                      ((N.getTime() === D.getTime() &&
                        Z === t.selectedMonth &&
                        t._keyEvent) ||
                        (y.getTime() === N.getTime() &&
                          y.getTime() === D.getTime())
                        ? " " + this._dayOverClass
                        : "") +
                      (L
                        ? " " + this._unselectableClass + " ui-state-disabled"
                        : "") +
                      (W && !v
                        ? ""
                        : " " +
                        z[1] +
                        (N.getTime() === X.getTime()
                          ? " " + this._currentClass
                          : "") +
                        (N.getTime() === F.getTime()
                          ? " ui-datepicker-today"
                          : "")) +
                      "'" +
                      ((W && !v) || !z[2]
                        ? ""
                        : " title='" + z[2].replace(/'/g, "&#39;") + "'") +
                      (L
                        ? ""
                        : " data-handler='selectDay' data-event='click' data-month='" +
                        N.getMonth() +
                        "' data-year='" +
                        N.getFullYear() +
                        "'") +
                      ">" +
                      (W && !v
                        ? "&#xa0;"
                        : L
                          ? "<span class='ui-state-default'>" +
                          N.getDate() +
                          "</span>"
                          : "<a class='ui-state-default" +
                          (N.getTime() === F.getTime()
                            ? " ui-state-highlight"
                            : "") +
                          (N.getTime() === X.getTime()
                            ? " ui-state-active"
                            : "") +
                          (W ? " ui-priority-secondary" : "") +
                          "' href='#'>" +
                          N.getDate() +
                          "</a>") +
                      "</td>"),
                    N.setDate(N.getDate() + 1),
                    (N = this._daylightSavingAdjust(N));
                I += H + "</tr>";
              }
              11 < ++Z && ((Z = 0), tt++),
                (C += I +=
                  "</tbody></table>" +
                  (Q
                    ? "</div>" +
                    (0 < Y[0] && k === Y[1] - 1
                      ? "<div class='ui-datepicker-row-break'></div>"
                      : "")
                    : ""));
            }
            b += C;
          }
          return (b += h), (t._keyEvent = !1), b;
        },
        _generateMonthYearHeader: function (t, e, i, n, s, o, r, a) {
          var l,
            h,
            c,
            u,
            d,
            p,
            f,
            g,
            m = this._get(t, "changeMonth"),
            v = this._get(t, "changeYear"),
            _ = this._get(t, "showMonthAfterYear"),
            y = "<div class='ui-datepicker-title'>",
            b = "";
          if (o || !m)
            b += "<span class='ui-datepicker-month'>" + r[e] + "</span>";
          else {
            for (
              l = n && n.getFullYear() === i,
              h = s && s.getFullYear() === i,
              b +=
              "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
              c = 0;
              c < 12;
              c++
            )
              (!l || c >= n.getMonth()) &&
                (!h || s.getMonth() >= c) &&
                (b +=
                  "<option value='" +
                  c +
                  "'" +
                  (c === e ? " selected='selected'" : "") +
                  ">" +
                  a[c] +
                  "</option>");
            b += "</select>";
          }
          if ((_ || (y += b + (!o && m && v ? "" : "&#xa0;")), !t.yearshtml))
            if (((t.yearshtml = ""), o || !v))
              y += "<span class='ui-datepicker-year'>" + i + "</span>";
            else {
              for (
                u = this._get(t, "yearRange").split(":"),
                d = new Date().getFullYear(),
                f = (p = function (t) {
                  var e = t.match(/c[+\-].*/)
                    ? i + parseInt(t.substring(1), 10)
                    : t.match(/[+\-].*/)
                      ? d + parseInt(t, 10)
                      : parseInt(t, 10);
                  return isNaN(e) ? d : e;
                })(u[0]),
                g = Math.max(f, p(u[1] || "")),
                f = n ? Math.max(f, n.getFullYear()) : f,
                g = s ? Math.min(g, s.getFullYear()) : g,
                t.yearshtml +=
                "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                f <= g;
                f++
              )
                t.yearshtml +=
                  "<option value='" +
                  f +
                  "'" +
                  (f === i ? " selected='selected'" : "") +
                  ">" +
                  f +
                  "</option>";
              (t.yearshtml += "</select>"),
                (y += t.yearshtml),
                (t.yearshtml = null);
            }
          return (
            (y += this._get(t, "yearSuffix")),
            _ && (y += (!o && m && v ? "" : "&#xa0;") + b),
            y + "</div>"
          );
        },
        _adjustInstDate: function (t, e, i) {
          var n = t.selectedYear + ("Y" === i ? e : 0),
            s = t.selectedMonth + ("M" === i ? e : 0),
            o =
              Math.min(t.selectedDay, this._getDaysInMonth(n, s)) +
              ("D" === i ? e : 0),
            r = this._restrictMinMax(
              t,
              this._daylightSavingAdjust(new Date(n, s, o))
            );
          (t.selectedDay = r.getDate()),
            (t.drawMonth = t.selectedMonth = r.getMonth()),
            (t.drawYear = t.selectedYear = r.getFullYear()),
            ("M" !== i && "Y" !== i) || this._notifyChange(t);
        },
        _restrictMinMax: function (t, e) {
          var i = this._getMinMaxDate(t, "min"),
            n = this._getMinMaxDate(t, "max"),
            s = i && e < i ? i : e;
          return n && n < s ? n : s;
        },
        _notifyChange: function (t) {
          var e = this._get(t, "onChangeMonthYear");
          e &&
            e.apply(t.input ? t.input[0] : null, [
              t.selectedYear,
              t.selectedMonth + 1,
              t,
            ]);
        },
        _getNumberOfMonths: function (t) {
          var e = this._get(t, "numberOfMonths");
          return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e;
        },
        _getMinMaxDate: function (t, e) {
          return this._determineDate(t, this._get(t, e + "Date"), null);
        },
        _getDaysInMonth: function (t, e) {
          return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
        },
        _getFirstDayOfMonth: function (t, e) {
          return new Date(t, e, 1).getDay();
        },
        _canAdjustMonth: function (t, e, i, n) {
          var s = this._getNumberOfMonths(t),
            o = this._daylightSavingAdjust(
              new Date(i, n + (e < 0 ? e : s[0] * s[1]), 1)
            );
          return (
            e < 0 &&
            o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())),
            this._isInRange(t, o)
          );
        },
        _isInRange: function (t, e) {
          var i,
            n,
            s = this._getMinMaxDate(t, "min"),
            o = this._getMinMaxDate(t, "max"),
            r = null,
            a = null,
            l = this._get(t, "yearRange");
          return (
            l &&
            ((i = l.split(":")),
              (n = new Date().getFullYear()),
              (r = parseInt(i[0], 10)),
              (a = parseInt(i[1], 10)),
              i[0].match(/[+\-].*/) && (r += n),
              i[1].match(/[+\-].*/) && (a += n)),
            (!s || e.getTime() >= s.getTime()) &&
            (!o || e.getTime() <= o.getTime()) &&
            (!r || e.getFullYear() >= r) &&
            (!a || a >= e.getFullYear())
          );
        },
        _getFormatConfig: function (t) {
          var e = this._get(t, "shortYearCutoff");
          return {
            shortYearCutoff: (e =
              "string" != typeof e
                ? e
                : (new Date().getFullYear() % 100) + parseInt(e, 10)),
            dayNamesShort: this._get(t, "dayNamesShort"),
            dayNames: this._get(t, "dayNames"),
            monthNamesShort: this._get(t, "monthNamesShort"),
            monthNames: this._get(t, "monthNames"),
          };
        },
        _formatDate: function (t, e, i, n) {
          e ||
            ((t.currentDay = t.selectedDay),
              (t.currentMonth = t.selectedMonth),
              (t.currentYear = t.selectedYear));
          var s = e
            ? "object" == typeof e
              ? e
              : this._daylightSavingAdjust(new Date(n, i, e))
            : this._daylightSavingAdjust(
              new Date(t.currentYear, t.currentMonth, t.currentDay)
            );
          return this.formatDate(
            this._get(t, "dateFormat"),
            s,
            this._getFormatConfig(t)
          );
        },
      }),
      (C.fn.datepicker = function (t) {
        if (!this.length) return this;
        C.datepicker.initialized ||
          (C(document).on("mousedown", C.datepicker._checkExternalClick),
            (C.datepicker.initialized = !0)),
          0 === C("#" + C.datepicker._mainDivId).length &&
          C("body").append(C.datepicker.dpDiv);
        var e = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t ||
          ("isDisabled" !== t && "getDate" !== t && "widget" !== t)
          ? "option" === t &&
            2 === arguments.length &&
            "string" == typeof arguments[1]
            ? C.datepicker["_" + t + "Datepicker"].apply(
              C.datepicker,
              [this[0]].concat(e)
            )
            : this.each(function () {
              "string" == typeof t
                ? C.datepicker["_" + t + "Datepicker"].apply(
                  C.datepicker,
                  [this].concat(e)
                )
                : C.datepicker._attachDatepicker(this, t);
            })
          : C.datepicker["_" + t + "Datepicker"].apply(
            C.datepicker,
            [this[0]].concat(e)
          );
      }),
      (C.datepicker = new t()),
      (C.datepicker.initialized = !1),
      (C.datepicker.uuid = new Date().getTime()),
      (C.datepicker.version = "1.12.1"),
      C.datepicker,
      C.widget("ui.dialog", {
        version: "1.12.1",
        options: {
          appendTo: "body",
          autoOpen: !0,
          buttons: [],
          classes: {
            "ui-dialog": "ui-corner-all",
            "ui-dialog-titlebar": "ui-corner-all",
          },
          closeOnEscape: !0,
          closeText: "Close",
          draggable: !0,
          hide: null,
          height: "auto",
          maxHeight: null,
          maxWidth: null,
          minHeight: 150,
          minWidth: 150,
          modal: !1,
          position: {
            my: "center",
            at: "center",
            of: window,
            collision: "fit",
            using: function (t) {
              var e = C(this).css(t).offset().top;
              e < 0 && C(this).css("top", t.top - e);
            },
          },
          resizable: !0,
          show: null,
          title: null,
          width: 300,
          beforeClose: null,
          close: null,
          drag: null,
          dragStart: null,
          dragStop: null,
          focus: null,
          open: null,
          resize: null,
          resizeStart: null,
          resizeStop: null,
        },
        sizeRelatedOptions: {
          buttons: !0,
          height: !0,
          maxHeight: !0,
          maxWidth: !0,
          minHeight: !0,
          minWidth: !0,
          width: !0,
        },
        resizableRelatedOptions: {
          maxHeight: !0,
          maxWidth: !0,
          minHeight: !0,
          minWidth: !0,
        },
        _create: function () {
          (this.originalCss = {
            display: this.element[0].style.display,
            width: this.element[0].style.width,
            minHeight: this.element[0].style.minHeight,
            maxHeight: this.element[0].style.maxHeight,
            height: this.element[0].style.height,
          }),
            (this.originalPosition = {
              parent: this.element.parent(),
              index: this.element.parent().children().index(this.element),
            }),
            (this.originalTitle = this.element.attr("title")),
            null == this.options.title &&
            null != this.originalTitle &&
            (this.options.title = this.originalTitle),
            this.options.disabled && (this.options.disabled = !1),
            this._createWrapper(),
            this.element.show().removeAttr("title").appendTo(this.uiDialog),
            this._addClass("ui-dialog-content", "ui-widget-content"),
            this._createTitlebar(),
            this._createButtonPane(),
            this.options.draggable && C.fn.draggable && this._makeDraggable(),
            this.options.resizable && C.fn.resizable && this._makeResizable(),
            (this._isOpen = !1),
            this._trackFocus();
        },
        _init: function () {
          this.options.autoOpen && this.open();
        },
        _appendTo: function () {
          var t = this.options.appendTo;
          return t && (t.jquery || t.nodeType)
            ? C(t)
            : this.document.find(t || "body").eq(0);
        },
        _destroy: function () {
          var t,
            e = this.originalPosition;
          this._untrackInstance(),
            this._destroyOverlay(),
            this.element.removeUniqueId().css(this.originalCss).detach(),
            this.uiDialog.remove(),
            this.originalTitle &&
            this.element.attr("title", this.originalTitle),
            (t = e.parent.children().eq(e.index)).length &&
              t[0] !== this.element[0]
              ? t.before(this.element)
              : e.parent.append(this.element);
        },
        widget: function () {
          return this.uiDialog;
        },
        disable: C.noop,
        enable: C.noop,
        close: function (t) {
          var e = this;
          this._isOpen &&
            !1 !== this._trigger("beforeClose", t) &&
            ((this._isOpen = !1),
              (this._focusedElement = null),
              this._destroyOverlay(),
              this._untrackInstance(),
              this.opener.filter(":focusable").trigger("focus").length ||
              C.ui.safeBlur(C.ui.safeActiveElement(this.document[0])),
              this._hide(this.uiDialog, this.options.hide, function () {
                e._trigger("close", t);
              }));
        },
        isOpen: function () {
          return this._isOpen;
        },
        moveToTop: function () {
          this._moveToTop();
        },
        _moveToTop: function (t, e) {
          var i = !1,
            n = this.uiDialog
              .siblings(".ui-front:visible")
              .map(function () {
                return +C(this).css("z-index");
              })
              .get(),
            s = Math.max.apply(null, n);
          return (
            s >= +this.uiDialog.css("z-index") &&
            (this.uiDialog.css("z-index", s + 1), (i = !0)),
            i && !e && this._trigger("focus", t),
            i
          );
        },
        open: function () {
          var t = this;
          return this._isOpen
            ? void (this._moveToTop() && this._focusTabbable())
            : ((this._isOpen = !0),
              (this.opener = C(C.ui.safeActiveElement(this.document[0]))),
              this._size(),
              this._position(),
              this._createOverlay(),
              this._moveToTop(null, !0),
              this.overlay &&
              this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
              this._show(this.uiDialog, this.options.show, function () {
                t._focusTabbable(), t._trigger("focus");
              }),
              this._makeFocusTarget(),
              void this._trigger("open"));
        },
        _focusTabbable: function () {
          var t = this._focusedElement;
          (t = t || this.element.find("[autofocus]")).length ||
            (t = this.element.find(":tabbable")),
            t.length || (t = this.uiDialogButtonPane.find(":tabbable")),
            t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")),
            t.length || (t = this.uiDialog),
            t.eq(0).trigger("focus");
        },
        _keepFocus: function (t) {
          function e() {
            var t = C.ui.safeActiveElement(this.document[0]);
            this.uiDialog[0] === t ||
              C.contains(this.uiDialog[0], t) ||
              this._focusTabbable();
          }
          t.preventDefault(), e.call(this), this._delay(e);
        },
        _createWrapper: function () {
          (this.uiDialog = C("<div>")
            .hide()
            .attr({ tabIndex: -1, role: "dialog" })
            .appendTo(this._appendTo())),
            this._addClass(
              this.uiDialog,
              "ui-dialog",
              "ui-widget ui-widget-content ui-front"
            ),
            this._on(this.uiDialog, {
              keydown: function (t) {
                if (
                  this.options.closeOnEscape &&
                  !t.isDefaultPrevented() &&
                  t.keyCode &&
                  t.keyCode === C.ui.keyCode.ESCAPE
                )
                  return t.preventDefault(), void this.close(t);
                if (t.keyCode === C.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                  var e = this.uiDialog.find(":tabbable"),
                    i = e.filter(":first"),
                    n = e.filter(":last");
                  (t.target !== n[0] && t.target !== this.uiDialog[0]) ||
                    t.shiftKey
                    ? (t.target !== i[0] && t.target !== this.uiDialog[0]) ||
                    !t.shiftKey ||
                    (this._delay(function () {
                      n.trigger("focus");
                    }),
                      t.preventDefault())
                    : (this._delay(function () {
                      i.trigger("focus");
                    }),
                      t.preventDefault());
                }
              },
              mousedown: function (t) {
                this._moveToTop(t) && this._focusTabbable();
              },
            }),
            this.element.find("[aria-describedby]").length ||
            this.uiDialog.attr({
              "aria-describedby": this.element.uniqueId().attr("id"),
            });
        },
        _createTitlebar: function () {
          var t;
          (this.uiDialogTitlebar = C("<div>")),
            this._addClass(
              this.uiDialogTitlebar,
              "ui-dialog-titlebar",
              "ui-widget-header ui-helper-clearfix"
            ),
            this._on(this.uiDialogTitlebar, {
              mousedown: function (t) {
                C(t.target).closest(".ui-dialog-titlebar-close") ||
                  this.uiDialog.trigger("focus");
              },
            }),
            (this.uiDialogTitlebarClose = C("<button type='button'></button>")
              .button({
                label: C("<a>").text(this.options.closeText).html(),
                icon: "ui-icon-closethick",
                showLabel: !1,
              })
              .appendTo(this.uiDialogTitlebar)),
            this._addClass(
              this.uiDialogTitlebarClose,
              "ui-dialog-titlebar-close"
            ),
            this._on(this.uiDialogTitlebarClose, {
              click: function (t) {
                t.preventDefault(), this.close(t);
              },
            }),
            (t = C("<span>").uniqueId().prependTo(this.uiDialogTitlebar)),
            this._addClass(t, "ui-dialog-title"),
            this._title(t),
            this.uiDialogTitlebar.prependTo(this.uiDialog),
            this.uiDialog.attr({ "aria-labelledby": t.attr("id") });
        },
        _title: function (t) {
          this.options.title ? t.text(this.options.title) : t.html("&#160;");
        },
        _createButtonPane: function () {
          (this.uiDialogButtonPane = C("<div>")),
            this._addClass(
              this.uiDialogButtonPane,
              "ui-dialog-buttonpane",
              "ui-widget-content ui-helper-clearfix"
            ),
            (this.uiButtonSet = C("<div>").appendTo(this.uiDialogButtonPane)),
            this._addClass(this.uiButtonSet, "ui-dialog-buttonset"),
            this._createButtons();
        },
        _createButtons: function () {
          var s = this,
            t = this.options.buttons;
          return (
            this.uiDialogButtonPane.remove(),
            this.uiButtonSet.empty(),
            C.isEmptyObject(t) || (C.isArray(t) && !t.length)
              ? void this._removeClass(this.uiDialog, "ui-dialog-buttons")
              : (C.each(t, function (t, e) {
                var i, n;
                (e = C.isFunction(e) ? { click: e, text: t } : e),
                  (e = C.extend({ type: "button" }, e)),
                  (i = e.click),
                  (n = {
                    icon: e.icon,
                    iconPosition: e.iconPosition,
                    showLabel: e.showLabel,
                    icons: e.icons,
                    text: e.text,
                  }),
                  delete e.click,
                  delete e.icon,
                  delete e.iconPosition,
                  delete e.showLabel,
                  delete e.icons,
                  "boolean" == typeof e.text && delete e.text,
                  C("<button></button>", e)
                    .button(n)
                    .appendTo(s.uiButtonSet)
                    .on("click", function () {
                      i.apply(s.element[0], arguments);
                    });
              }),
                this._addClass(this.uiDialog, "ui-dialog-buttons"),
                void this.uiDialogButtonPane.appendTo(this.uiDialog))
          );
        },
        _makeDraggable: function () {
          function s(t) {
            return { position: t.position, offset: t.offset };
          }
          var o = this,
            r = this.options;
          this.uiDialog.draggable({
            cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
            handle: ".ui-dialog-titlebar",
            containment: "document",
            start: function (t, e) {
              o._addClass(C(this), "ui-dialog-dragging"),
                o._blockFrames(),
                o._trigger("dragStart", t, s(e));
            },
            drag: function (t, e) {
              o._trigger("drag", t, s(e));
            },
            stop: function (t, e) {
              var i = e.offset.left - o.document.scrollLeft(),
                n = e.offset.top - o.document.scrollTop();
              (r.position = {
                my: "left top",
                at:
                  "left" +
                  (0 <= i ? "+" : "") +
                  i +
                  " top" +
                  (0 <= n ? "+" : "") +
                  n,
                of: o.window,
              }),
                o._removeClass(C(this), "ui-dialog-dragging"),
                o._unblockFrames(),
                o._trigger("dragStop", t, s(e));
            },
          });
        },
        _makeResizable: function () {
          function o(t) {
            return {
              originalPosition: t.originalPosition,
              originalSize: t.originalSize,
              position: t.position,
              size: t.size,
            };
          }
          var r = this,
            a = this.options,
            t = a.resizable,
            e = this.uiDialog.css("position"),
            i = "string" == typeof t ? t : "n,e,s,w,se,sw,ne,nw";
          this.uiDialog
            .resizable({
              cancel: ".ui-dialog-content",
              containment: "document",
              alsoResize: this.element,
              maxWidth: a.maxWidth,
              maxHeight: a.maxHeight,
              minWidth: a.minWidth,
              minHeight: this._minHeight(),
              handles: i,
              start: function (t, e) {
                r._addClass(C(this), "ui-dialog-resizing"),
                  r._blockFrames(),
                  r._trigger("resizeStart", t, o(e));
              },
              resize: function (t, e) {
                r._trigger("resize", t, o(e));
              },
              stop: function (t, e) {
                var i = r.uiDialog.offset(),
                  n = i.left - r.document.scrollLeft(),
                  s = i.top - r.document.scrollTop();
                (a.height = r.uiDialog.height()),
                  (a.width = r.uiDialog.width()),
                  (a.position = {
                    my: "left top",
                    at:
                      "left" +
                      (0 <= n ? "+" : "") +
                      n +
                      " top" +
                      (0 <= s ? "+" : "") +
                      s,
                    of: r.window,
                  }),
                  r._removeClass(C(this), "ui-dialog-resizing"),
                  r._unblockFrames(),
                  r._trigger("resizeStop", t, o(e));
              },
            })
            .css("position", e);
        },
        _trackFocus: function () {
          this._on(this.widget(), {
            focusin: function (t) {
              this._makeFocusTarget(), (this._focusedElement = C(t.target));
            },
          });
        },
        _makeFocusTarget: function () {
          this._untrackInstance(), this._trackingInstances().unshift(this);
        },
        _untrackInstance: function () {
          var t = this._trackingInstances(),
            e = C.inArray(this, t);
          -1 !== e && t.splice(e, 1);
        },
        _trackingInstances: function () {
          var t = this.document.data("ui-dialog-instances");
          return (
            t || ((t = []), this.document.data("ui-dialog-instances", t)), t
          );
        },
        _minHeight: function () {
          var t = this.options;
          return "auto" === t.height
            ? t.minHeight
            : Math.min(t.minHeight, t.height);
        },
        _position: function () {
          var t = this.uiDialog.is(":visible");
          t || this.uiDialog.show(),
            this.uiDialog.position(this.options.position),
            t || this.uiDialog.hide();
        },
        _setOptions: function (t) {
          var i = this,
            n = !1,
            s = {};
          C.each(t, function (t, e) {
            i._setOption(t, e),
              t in i.sizeRelatedOptions && (n = !0),
              t in i.resizableRelatedOptions && (s[t] = e);
          }),
            n && (this._size(), this._position()),
            this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", s);
        },
        _setOption: function (t, e) {
          var i,
            n,
            s = this.uiDialog;
          "disabled" !== t &&
            (this._super(t, e),
              "appendTo" === t && this.uiDialog.appendTo(this._appendTo()),
              "buttons" === t && this._createButtons(),
              "closeText" === t &&
              this.uiDialogTitlebarClose.button({
                label: C("<a>")
                  .text("" + this.options.closeText)
                  .html(),
              }),
              "draggable" === t &&
              ((i = s.is(":data(ui-draggable)")) &&
                !e &&
                s.draggable("destroy"),
                !i && e && this._makeDraggable()),
              "position" === t && this._position(),
              "resizable" === t &&
              ((n = s.is(":data(ui-resizable)")) &&
                !e &&
                s.resizable("destroy"),
                n && "string" == typeof e && s.resizable("option", "handles", e),
                n || !1 === e || this._makeResizable()),
              "title" === t &&
              this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
        },
        _size: function () {
          var t,
            e,
            i,
            n = this.options;
          this.element
            .show()
            .css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }),
            n.minWidth > n.width && (n.width = n.minWidth),
            (t = this.uiDialog
              .css({ height: "auto", width: n.width })
              .outerHeight()),
            (e = Math.max(0, n.minHeight - t)),
            (i =
              "number" == typeof n.maxHeight
                ? Math.max(0, n.maxHeight - t)
                : "none"),
            "auto" === n.height
              ? this.element.css({ minHeight: e, maxHeight: i, height: "auto" })
              : this.element.height(Math.max(0, n.height - t)),
            this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", "minHeight", this._minHeight());
        },
        _blockFrames: function () {
          this.iframeBlocks = this.document.find("iframe").map(function () {
            var t = C(this);
            return C("<div>")
              .css({
                position: "absolute",
                width: t.outerWidth(),
                height: t.outerHeight(),
              })
              .appendTo(t.parent())
              .offset(t.offset())[0];
          });
        },
        _unblockFrames: function () {
          this.iframeBlocks &&
            (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _allowInteraction: function (t) {
          return (
            !!C(t.target).closest(".ui-dialog").length ||
            !!C(t.target).closest(".ui-datepicker").length
          );
        },
        _createOverlay: function () {
          if (this.options.modal) {
            var e = !0;
            this._delay(function () {
              e = !1;
            }),
              this.document.data("ui-dialog-overlays") ||
              this._on(this.document, {
                focusin: function (t) {
                  e ||
                    this._allowInteraction(t) ||
                    (t.preventDefault(),
                      this._trackingInstances()[0]._focusTabbable());
                },
              }),
              (this.overlay = C("<div>").appendTo(this._appendTo())),
              this._addClass(this.overlay, null, "ui-widget-overlay ui-front"),
              this._on(this.overlay, { mousedown: "_keepFocus" }),
              this.document.data(
                "ui-dialog-overlays",
                (this.document.data("ui-dialog-overlays") || 0) + 1
              );
          }
        },
        _destroyOverlay: function () {
          if (this.options.modal && this.overlay) {
            var t = this.document.data("ui-dialog-overlays") - 1;
            t
              ? this.document.data("ui-dialog-overlays", t)
              : (this._off(this.document, "focusin"),
                this.document.removeData("ui-dialog-overlays")),
              this.overlay.remove(),
              (this.overlay = null);
          }
        },
      }),
      !1 !== C.uiBackCompat &&
      C.widget("ui.dialog", C.ui.dialog, {
        options: { dialogClass: "" },
        _createWrapper: function () {
          this._super(), this.uiDialog.addClass(this.options.dialogClass);
        },
        _setOption: function (t, e) {
          "dialogClass" === t &&
            this.uiDialog.removeClass(this.options.dialogClass).addClass(e),
            this._superApply(arguments);
        },
      }),
      C.ui.dialog,
      C.widget("ui.progressbar", {
        version: "1.12.1",
        options: {
          classes: {
            "ui-progressbar": "ui-corner-all",
            "ui-progressbar-value": "ui-corner-left",
            "ui-progressbar-complete": "ui-corner-right",
          },
          max: 100,
          value: 0,
          change: null,
          complete: null,
        },
        min: 0,
        _create: function () {
          (this.oldValue = this.options.value = this._constrainedValue()),
            this.element.attr({
              role: "progressbar",
              "aria-valuemin": this.min,
            }),
            this._addClass("ui-progressbar", "ui-widget ui-widget-content"),
            (this.valueDiv = C("<div>").appendTo(this.element)),
            this._addClass(
              this.valueDiv,
              "ui-progressbar-value",
              "ui-widget-header"
            ),
            this._refreshValue();
        },
        _destroy: function () {
          this.element.removeAttr(
            "role aria-valuemin aria-valuemax aria-valuenow"
          ),
            this.valueDiv.remove();
        },
        value: function (t) {
          return void 0 === t
            ? this.options.value
            : ((this.options.value = this._constrainedValue(t)),
              void this._refreshValue());
        },
        _constrainedValue: function (t) {
          return (
            void 0 === t && (t = this.options.value),
            (this.indeterminate = !1 === t),
            "number" != typeof t && (t = 0),
            !this.indeterminate &&
            Math.min(this.options.max, Math.max(this.min, t))
          );
        },
        _setOptions: function (t) {
          var e = t.value;
          delete t.value,
            this._super(t),
            (this.options.value = this._constrainedValue(e)),
            this._refreshValue();
        },
        _setOption: function (t, e) {
          "max" === t && (e = Math.max(this.min, e)), this._super(t, e);
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this.element.attr("aria-disabled", t),
            this._toggleClass(null, "ui-state-disabled", !!t);
        },
        _percentage: function () {
          return this.indeterminate
            ? 100
            : (100 * (this.options.value - this.min)) /
            (this.options.max - this.min);
        },
        _refreshValue: function () {
          var t = this.options.value,
            e = this._percentage();
          this.valueDiv
            .toggle(this.indeterminate || t > this.min)
            .width(e.toFixed(0) + "%"),
            this._toggleClass(
              this.valueDiv,
              "ui-progressbar-complete",
              null,
              t === this.options.max
            )._toggleClass(
              "ui-progressbar-indeterminate",
              null,
              this.indeterminate
            ),
            this.indeterminate
              ? (this.element.removeAttr("aria-valuenow"),
                this.overlayDiv ||
                ((this.overlayDiv = C("<div>").appendTo(this.valueDiv)),
                  this._addClass(this.overlayDiv, "ui-progressbar-overlay")))
              : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": t,
              }),
                this.overlayDiv &&
                (this.overlayDiv.remove(), (this.overlayDiv = null))),
            this.oldValue !== t &&
            ((this.oldValue = t), this._trigger("change")),
            t === this.options.max && this._trigger("complete");
        },
      }),
      C.widget("ui.selectmenu", [
        C.ui.formResetMixin,
        {
          version: "1.12.1",
          defaultElement: "<select>",
          options: {
            appendTo: null,
            classes: {
              "ui-selectmenu-button-open": "ui-corner-top",
              "ui-selectmenu-button-closed": "ui-corner-all",
            },
            disabled: null,
            icons: { button: "ui-icon-triangle-1-s" },
            position: { my: "left top", at: "left bottom", collision: "none" },
            width: !1,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null,
          },
          _create: function () {
            var t = this.element.uniqueId().attr("id");
            (this.ids = {
              element: t,
              button: t + "-button",
              menu: t + "-menu",
            }),
              this._drawButton(),
              this._drawMenu(),
              this._bindFormResetHandler(),
              (this._rendered = !1),
              (this.menuItems = C());
          },
          _drawButton: function () {
            var t,
              e = this,
              i = this._parseOption(
                this.element.find("option:selected"),
                this.element[0].selectedIndex
              );
            (this.labels = this.element.labels().attr("for", this.ids.button)),
              this._on(this.labels, {
                click: function (t) {
                  this.button.focus(), t.preventDefault();
                },
              }),
              this.element.hide(),
              (this.button = C("<span>", {
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true",
                title: this.element.attr("title"),
              }).insertAfter(this.element)),
              this._addClass(
                this.button,
                "ui-selectmenu-button ui-selectmenu-button-closed",
                "ui-button ui-widget"
              ),
              (t = C("<span>").appendTo(this.button)),
              this._addClass(
                t,
                "ui-selectmenu-icon",
                "ui-icon " + this.options.icons.button
              ),
              (this.buttonItem = this._renderButtonItem(i).appendTo(
                this.button
              )),
              !1 !== this.options.width && this._resizeButton(),
              this._on(this.button, this._buttonEvents),
              this.button.one("focusin", function () {
                e._rendered || e._refreshMenu();
              });
          },
          _drawMenu: function () {
            var n = this;
            (this.menu = C("<ul>", {
              "aria-hidden": "true",
              "aria-labelledby": this.ids.button,
              id: this.ids.menu,
            })),
              (this.menuWrap = C("<div>").append(this.menu)),
              this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"),
              this.menuWrap.appendTo(this._appendTo()),
              (this.menuInstance = this.menu
                .menu({
                  classes: { "ui-menu": "ui-corner-bottom" },
                  role: "listbox",
                  select: function (t, e) {
                    t.preventDefault(),
                      n._setSelection(),
                      n._select(e.item.data("ui-selectmenu-item"), t);
                  },
                  focus: function (t, e) {
                    var i = e.item.data("ui-selectmenu-item");
                    null != n.focusIndex &&
                      i.index !== n.focusIndex &&
                      (n._trigger("focus", t, { item: i }),
                        n.isOpen || n._select(i, t)),
                      (n.focusIndex = i.index),
                      n.button.attr(
                        "aria-activedescendant",
                        n.menuItems.eq(i.index).attr("id")
                      );
                  },
                })
                .menu("instance")),
              this.menuInstance._off(this.menu, "mouseleave"),
              (this.menuInstance._closeOnDocumentClick = function () {
                return !1;
              }),
              (this.menuInstance._isDivider = function () {
                return !1;
              });
          },
          refresh: function () {
            this._refreshMenu(),
              this.buttonItem.replaceWith(
                (this.buttonItem = this._renderButtonItem(
                  this._getSelectedItem().data("ui-selectmenu-item") || {}
                ))
              ),
              null === this.options.width && this._resizeButton();
          },
          _refreshMenu: function () {
            var t,
              e = this.element.find("option");
            this.menu.empty(),
              this._parseOptions(e),
              this._renderMenu(this.menu, this.items),
              this.menuInstance.refresh(),
              (this.menuItems = this.menu
                .find("li")
                .not(".ui-selectmenu-optgroup")
                .find(".ui-menu-item-wrapper")),
              (this._rendered = !0),
              e.length &&
              ((t = this._getSelectedItem()),
                this.menuInstance.focus(null, t),
                this._setAria(t.data("ui-selectmenu-item")),
                this._setOption("disabled", this.element.prop("disabled")));
          },
          open: function (t) {
            this.options.disabled ||
              (this._rendered
                ? (this._removeClass(
                  this.menu.find(".ui-state-active"),
                  null,
                  "ui-state-active"
                ),
                  this.menuInstance.focus(null, this._getSelectedItem()))
                : this._refreshMenu(),
                this.menuItems.length &&
                ((this.isOpen = !0),
                  this._toggleAttr(),
                  this._resizeMenu(),
                  this._position(),
                  this._on(this.document, this._documentClick),
                  this._trigger("open", t)));
          },
          _position: function () {
            this.menuWrap.position(
              C.extend({ of: this.button }, this.options.position)
            );
          },
          close: function (t) {
            this.isOpen &&
              ((this.isOpen = !1),
                this._toggleAttr(),
                (this.range = null),
                this._off(this.document),
                this._trigger("close", t));
          },
          widget: function () {
            return this.button;
          },
          menuWidget: function () {
            return this.menu;
          },
          _renderButtonItem: function (t) {
            var e = C("<span>");
            return (
              this._setText(e, t.label),
              this._addClass(e, "ui-selectmenu-text"),
              e
            );
          },
          _renderMenu: function (n, t) {
            var s = this,
              o = "";
            C.each(t, function (t, e) {
              var i;
              e.optgroup !== o &&
                ((i = C("<li>", { text: e.optgroup })),
                  s._addClass(
                    i,
                    "ui-selectmenu-optgroup",
                    "ui-menu-divider" +
                    (e.element.parent("optgroup").prop("disabled")
                      ? " ui-state-disabled"
                      : "")
                  ),
                  i.appendTo(n),
                  (o = e.optgroup)),
                s._renderItemData(n, e);
            });
          },
          _renderItemData: function (t, e) {
            return this._renderItem(t, e).data("ui-selectmenu-item", e);
          },
          _renderItem: function (t, e) {
            var i = C("<li>"),
              n = C("<div>", { title: e.element.attr("title") });
            return (
              e.disabled && this._addClass(i, null, "ui-state-disabled"),
              this._setText(n, e.label),
              i.append(n).appendTo(t)
            );
          },
          _setText: function (t, e) {
            e ? t.text(e) : t.html("&#160;");
          },
          _move: function (t, e) {
            var i,
              n,
              s = ".ui-menu-item";
            this.isOpen
              ? (i = this.menuItems.eq(this.focusIndex).parent("li"))
              : ((i = this.menuItems
                .eq(this.element[0].selectedIndex)
                .parent("li")),
                (s += ":not(.ui-state-disabled)")),
              (n =
                "first" === t || "last" === t
                  ? i["first" === t ? "prevAll" : "nextAll"](s).eq(-1)
                  : i[t + "All"](s).eq(0)).length &&
              this.menuInstance.focus(e, n);
          },
          _getSelectedItem: function () {
            return this.menuItems
              .eq(this.element[0].selectedIndex)
              .parent("li");
          },
          _toggle: function (t) {
            this[this.isOpen ? "close" : "open"](t);
          },
          _setSelection: function () {
            var t;
            this.range &&
              (window.getSelection
                ? ((t = window.getSelection()).removeAllRanges(),
                  t.addRange(this.range))
                : this.range.select(),
                this.button.focus());
          },
          _documentClick: {
            mousedown: function (t) {
              this.isOpen &&
                (C(t.target).closest(
                  ".ui-selectmenu-menu, #" +
                  C.ui.escapeSelector(this.ids.button)
                ).length ||
                  this.close(t));
            },
          },
          _buttonEvents: {
            mousedown: function () {
              var t;
              window.getSelection
                ? (t = window.getSelection()).rangeCount &&
                (this.range = t.getRangeAt(0))
                : (this.range = document.selection.createRange());
            },
            click: function (t) {
              this._setSelection(), this._toggle(t);
            },
            keydown: function (t) {
              var e = !0;
              switch (t.keyCode) {
                case C.ui.keyCode.TAB:
                case C.ui.keyCode.ESCAPE:
                  this.close(t), (e = !1);
                  break;
                case C.ui.keyCode.ENTER:
                  this.isOpen && this._selectFocusedItem(t);
                  break;
                case C.ui.keyCode.UP:
                  t.altKey ? this._toggle(t) : this._move("prev", t);
                  break;
                case C.ui.keyCode.DOWN:
                  t.altKey ? this._toggle(t) : this._move("next", t);
                  break;
                case C.ui.keyCode.SPACE:
                  this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
                  break;
                case C.ui.keyCode.LEFT:
                  this._move("prev", t);
                  break;
                case C.ui.keyCode.RIGHT:
                  this._move("next", t);
                  break;
                case C.ui.keyCode.HOME:
                case C.ui.keyCode.PAGE_UP:
                  this._move("first", t);
                  break;
                case C.ui.keyCode.END:
                case C.ui.keyCode.PAGE_DOWN:
                  this._move("last", t);
                  break;
                default:
                  this.menu.trigger(t), (e = !1);
              }
              e && t.preventDefault();
            },
          },
          _selectFocusedItem: function (t) {
            var e = this.menuItems.eq(this.focusIndex).parent("li");
            e.hasClass("ui-state-disabled") ||
              this._select(e.data("ui-selectmenu-item"), t);
          },
          _select: function (t, e) {
            var i = this.element[0].selectedIndex;
            (this.element[0].selectedIndex = t.index),
              this.buttonItem.replaceWith(
                (this.buttonItem = this._renderButtonItem(t))
              ),
              this._setAria(t),
              this._trigger("select", e, { item: t }),
              t.index !== i && this._trigger("change", e, { item: t }),
              this.close(e);
          },
          _setAria: function (t) {
            var e = this.menuItems.eq(t.index).attr("id");
            this.button.attr({
              "aria-labelledby": e,
              "aria-activedescendant": e,
            }),
              this.menu.attr("aria-activedescendant", e);
          },
          _setOption: function (t, e) {
            if ("icons" === t) {
              var i = this.button.find("span.ui-icon");
              this._removeClass(i, null, this.options.icons.button)._addClass(
                i,
                null,
                e.button
              );
            }
            this._super(t, e),
              "appendTo" === t && this.menuWrap.appendTo(this._appendTo()),
              "width" === t && this._resizeButton();
          },
          _setOptionDisabled: function (t) {
            this._super(t),
              this.menuInstance.option("disabled", t),
              this.button.attr("aria-disabled", t),
              this._toggleClass(this.button, null, "ui-state-disabled", t),
              this.element.prop("disabled", t),
              t
                ? (this.button.attr("tabindex", -1), this.close())
                : this.button.attr("tabindex", 0);
          },
          _appendTo: function () {
            var t = this.options.appendTo;
            return (
              ((t =
                t &&
                (t.jquery || t.nodeType
                  ? C(t)
                  : this.document.find(t).eq(0))) &&
                t[0]) ||
              (t = this.element.closest(".ui-front, dialog")),
              t.length || (t = this.document[0].body),
              t
            );
          },
          _toggleAttr: function () {
            this.button.attr("aria-expanded", this.isOpen),
              this._removeClass(
                this.button,
                "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open")
              )
                ._addClass(
                  this.button,
                  "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed")
                )
                ._toggleClass(
                  this.menuWrap,
                  "ui-selectmenu-open",
                  null,
                  this.isOpen
                ),
              this.menu.attr("aria-hidden", !this.isOpen);
          },
          _resizeButton: function () {
            var t = this.options.width;
            return !1 === t
              ? void this.button.css("width", "")
              : (null === t &&
                ((t = this.element.show().outerWidth()), this.element.hide()),
                void this.button.outerWidth(t));
          },
          _resizeMenu: function () {
            this.menu.outerWidth(
              Math.max(
                this.button.outerWidth(),
                this.menu.width("").outerWidth() + 1
              )
            );
          },
          _getCreateOptions: function () {
            var t = this._super();
            return (t.disabled = this.element.prop("disabled")), t;
          },
          _parseOptions: function (t) {
            var i = this,
              n = [];
            t.each(function (t, e) {
              n.push(i._parseOption(C(e), t));
            }),
              (this.items = n);
          },
          _parseOption: function (t, e) {
            var i = t.parent("optgroup");
            return {
              element: t,
              index: e,
              value: t.val(),
              label: t.text(),
              optgroup: i.attr("label") || "",
              disabled: i.prop("disabled") || t.prop("disabled"),
            };
          },
          _destroy: function () {
            this._unbindFormResetHandler(),
              this.menuWrap.remove(),
              this.button.remove(),
              this.element.show(),
              this.element.removeUniqueId(),
              this.labels.attr("for", this.ids.element);
          },
        },
      ]),
      C.widget("ui.slider", C.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
          animate: !1,
          classes: {
            "ui-slider": "ui-corner-all",
            "ui-slider-handle": "ui-corner-all",
            "ui-slider-range": "ui-corner-all ui-widget-header",
          },
          distance: 0,
          max: 100,
          min: 0,
          orientation: "horizontal",
          range: !1,
          step: 1,
          value: 0,
          values: null,
          change: null,
          slide: null,
          start: null,
          stop: null,
        },
        numPages: 5,
        _create: function () {
          (this._keySliding = !1),
            (this._mouseSliding = !1),
            (this._animateOff = !0),
            (this._handleIndex = null),
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this._addClass(
              "ui-slider ui-slider-" + this.orientation,
              "ui-widget ui-widget-content"
            ),
            this._refresh(),
            (this._animateOff = !1);
        },
        _refresh: function () {
          this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue();
        },
        _createHandles: function () {
          var t,
            e,
            i = this.options,
            n = this.element.find(".ui-slider-handle"),
            s = [];
          for (
            e = (i.values && i.values.length) || 1,
            n.length > e && (n.slice(e).remove(), (n = n.slice(0, e))),
            t = n.length;
            t < e;
            t++
          )
            s.push("<span tabindex='0'></span>");
          (this.handles = n.add(C(s.join("")).appendTo(this.element))),
            this._addClass(
              this.handles,
              "ui-slider-handle",
              "ui-state-default"
            ),
            (this.handle = this.handles.eq(0)),
            this.handles.each(function (t) {
              C(this).data("ui-slider-handle-index", t).attr("tabIndex", 0);
            });
        },
        _createRange: function () {
          var t = this.options;
          t.range
            ? (!0 === t.range &&
              (t.values
                ? t.values.length && 2 !== t.values.length
                  ? (t.values = [t.values[0], t.values[0]])
                  : C.isArray(t.values) && (t.values = t.values.slice(0))
                : (t.values = [this._valueMin(), this._valueMin()])),
              this.range && this.range.length
                ? (this._removeClass(
                  this.range,
                  "ui-slider-range-min ui-slider-range-max"
                ),
                  this.range.css({ left: "", bottom: "" }))
                : ((this.range = C("<div>").appendTo(this.element)),
                  this._addClass(this.range, "ui-slider-range")),
              ("min" !== t.range && "max" !== t.range) ||
              this._addClass(this.range, "ui-slider-range-" + t.range))
            : (this.range && this.range.remove(), (this.range = null));
        },
        _setupEvents: function () {
          this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles);
        },
        _destroy: function () {
          this.handles.remove(),
            this.range && this.range.remove(),
            this._mouseDestroy();
        },
        _mouseCapture: function (t) {
          var e,
            i,
            n,
            s,
            o,
            r,
            a,
            l = this,
            h = this.options;
          return (
            !h.disabled &&
            ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
              (this.elementOffset = this.element.offset()),
              (e = { x: t.pageX, y: t.pageY }),
              (i = this._normValueFromMouse(e)),
              (n = this._valueMax() - this._valueMin() + 1),
              this.handles.each(function (t) {
                var e = Math.abs(i - l.values(t));
                (e < n ||
                  (n === e &&
                    (t === l._lastChangedValue || l.values(t) === h.min))) &&
                  ((n = e), (s = C(this)), (o = t));
              }),
              !1 !== this._start(t, o) &&
              ((this._mouseSliding = !0),
                (this._handleIndex = o),
                this._addClass(s, null, "ui-state-active"),
                s.trigger("focus"),
                (r = s.offset()),
                (a = !C(t.target).parents().addBack().is(".ui-slider-handle")),
                (this._clickOffset = a
                  ? { left: 0, top: 0 }
                  : {
                    left: t.pageX - r.left - s.width() / 2,
                    top:
                      t.pageY -
                      r.top -
                      s.height() / 2 -
                      (parseInt(s.css("borderTopWidth"), 10) || 0) -
                      (parseInt(s.css("borderBottomWidth"), 10) || 0) +
                      (parseInt(s.css("marginTop"), 10) || 0),
                  }),
                this.handles.hasClass("ui-state-hover") || this._slide(t, o, i),
                (this._animateOff = !0)))
          );
        },
        _mouseStart: function () {
          return !0;
        },
        _mouseDrag: function (t) {
          var e = { x: t.pageX, y: t.pageY },
            i = this._normValueFromMouse(e);
          return this._slide(t, this._handleIndex, i), !1;
        },
        _mouseStop: function (t) {
          return (
            this._removeClass(this.handles, null, "ui-state-active"),
            (this._mouseSliding = !1),
            this._stop(t, this._handleIndex),
            this._change(t, this._handleIndex),
            (this._handleIndex = null),
            (this._clickOffset = null),
            (this._animateOff = !1)
          );
        },
        _detectOrientation: function () {
          this.orientation =
            "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function (t) {
          var e, i, n, s;
          return (
            1 <
            (i =
              ("horizontal" === this.orientation
                ? ((e = this.elementSize.width),
                  t.x -
                  this.elementOffset.left -
                  (this._clickOffset ? this._clickOffset.left : 0))
                : ((e = this.elementSize.height),
                  t.y -
                  this.elementOffset.top -
                  (this._clickOffset ? this._clickOffset.top : 0))) / e) &&
            (i = 1),
            i < 0 && (i = 0),
            "vertical" === this.orientation && (i = 1 - i),
            (n = this._valueMax() - this._valueMin()),
            (s = this._valueMin() + i * n),
            this._trimAlignValue(s)
          );
        },
        _uiHash: function (t, e, i) {
          var n = {
            handle: this.handles[t],
            handleIndex: t,
            value: void 0 !== e ? e : this.value(),
          };
          return (
            this._hasMultipleValues() &&
            ((n.value = void 0 !== e ? e : this.values(t)),
              (n.values = i || this.values())),
            n
          );
        },
        _hasMultipleValues: function () {
          return this.options.values && this.options.values.length;
        },
        _start: function (t, e) {
          return this._trigger("start", t, this._uiHash(e));
        },
        _slide: function (t, e, i) {
          var n,
            s = this.value(),
            o = this.values();
          this._hasMultipleValues() &&
            ((n = this.values(e ? 0 : 1)),
              (s = this.values(e)),
              2 === this.options.values.length &&
              !0 === this.options.range &&
              (i = 0 === e ? Math.min(n, i) : Math.max(n, i)),
              (o[e] = i)),
            i === s ||
            (!1 !== this._trigger("slide", t, this._uiHash(e, i, o)) &&
              (this._hasMultipleValues()
                ? this.values(e, i)
                : this.value(i)));
        },
        _stop: function (t, e) {
          this._trigger("stop", t, this._uiHash(e));
        },
        _change: function (t, e) {
          this._keySliding ||
            this._mouseSliding ||
            ((this._lastChangedValue = e),
              this._trigger("change", t, this._uiHash(e)));
        },
        value: function (t) {
          return arguments.length
            ? ((this.options.value = this._trimAlignValue(t)),
              this._refreshValue(),
              void this._change(null, 0))
            : this._value();
        },
        values: function (t, e) {
          var i, n, s;
          if (1 < arguments.length)
            return (
              (this.options.values[t] = this._trimAlignValue(e)),
              this._refreshValue(),
              void this._change(null, t)
            );
          if (!arguments.length) return this._values();
          if (!C.isArray(t))
            return this._hasMultipleValues() ? this._values(t) : this.value();
          for (i = this.options.values, n = t, s = 0; i.length > s; s += 1)
            (i[s] = this._trimAlignValue(n[s])), this._change(null, s);
          this._refreshValue();
        },
        _setOption: function (t, e) {
          var i,
            n = 0;
          switch (
          ("range" === t &&
            !0 === this.options.range &&
            ("min" === e
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === e &&
              ((this.options.value = this._values(
                this.options.values.length - 1
              )),
                (this.options.values = null))),
            C.isArray(this.options.values) && (n = this.options.values.length),
            this._super(t, e),
            t)
          ) {
            case "orientation":
              this._detectOrientation(),
                this._removeClass(
                  "ui-slider-horizontal ui-slider-vertical"
                )._addClass("ui-slider-" + this.orientation),
                this._refreshValue(),
                this.options.range && this._refreshRange(e),
                this.handles.css("horizontal" === e ? "bottom" : "left", "");
              break;
            case "value":
              (this._animateOff = !0),
                this._refreshValue(),
                this._change(null, 0),
                (this._animateOff = !1);
              break;
            case "values":
              for (
                this._animateOff = !0, this._refreshValue(), i = n - 1;
                0 <= i;
                i--
              )
                this._change(null, i);
              this._animateOff = !1;
              break;
            case "step":
            case "min":
            case "max":
              (this._animateOff = !0),
                this._calculateNewMax(),
                this._refreshValue(),
                (this._animateOff = !1);
              break;
            case "range":
              (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
          }
        },
        _setOptionDisabled: function (t) {
          this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
        },
        _value: function () {
          var t = this.options.value;
          return this._trimAlignValue(t);
        },
        _values: function (t) {
          var e, i, n;
          if (arguments.length)
            return (e = this.options.values[t]), this._trimAlignValue(e);
          if (this._hasMultipleValues()) {
            for (i = this.options.values.slice(), n = 0; i.length > n; n += 1)
              i[n] = this._trimAlignValue(i[n]);
            return i;
          }
          return [];
        },
        _trimAlignValue: function (t) {
          if (this._valueMin() >= t) return this._valueMin();
          if (t >= this._valueMax()) return this._valueMax();
          var e = 0 < this.options.step ? this.options.step : 1,
            i = (t - this._valueMin()) % e,
            n = t - i;
          return (
            2 * Math.abs(i) >= e && (n += 0 < i ? e : -e),
            parseFloat(n.toFixed(5))
          );
        },
        _calculateNewMax: function () {
          var t = this.options.max,
            e = this._valueMin(),
            i = this.options.step;
          (t = Math.round((t - e) / i) * i + e) > this.options.max && (t -= i),
            (this.max = parseFloat(t.toFixed(this._precision())));
        },
        _precision: function () {
          var t = this._precisionOf(this.options.step);
          return (
            null !== this.options.min &&
            (t = Math.max(t, this._precisionOf(this.options.min))),
            t
          );
        },
        _precisionOf: function (t) {
          var e = "" + t,
            i = e.indexOf(".");
          return -1 === i ? 0 : e.length - i - 1;
        },
        _valueMin: function () {
          return this.options.min;
        },
        _valueMax: function () {
          return this.max;
        },
        _refreshRange: function (t) {
          "vertical" === t && this.range.css({ width: "", left: "" }),
            "horizontal" === t && this.range.css({ height: "", bottom: "" });
        },
        _refreshValue: function () {
          var e,
            i,
            t,
            n,
            s,
            o = this.options.range,
            r = this.options,
            a = this,
            l = !this._animateOff && r.animate,
            h = {};
          this._hasMultipleValues()
            ? this.handles.each(function (t) {
              (i =
                ((a.values(t) - a._valueMin()) /
                  (a._valueMax() - a._valueMin())) *
                100),
                (h["horizontal" === a.orientation ? "left" : "bottom"] =
                  i + "%"),
                C(this).stop(1, 1)[l ? "animate" : "css"](h, r.animate),
                !0 === a.options.range &&
                ("horizontal" === a.orientation
                  ? (0 === t &&
                    a.range
                      .stop(1, 1)
                    [l ? "animate" : "css"](
                      { left: i + "%" },
                      r.animate
                    ),
                    1 === t &&
                    a.range[l ? "animate" : "css"](
                      { width: i - e + "%" },
                      { queue: !1, duration: r.animate }
                    ))
                  : (0 === t &&
                    a.range
                      .stop(1, 1)
                    [l ? "animate" : "css"](
                      { bottom: i + "%" },
                      r.animate
                    ),
                    1 === t &&
                    a.range[l ? "animate" : "css"](
                      { height: i - e + "%" },
                      { queue: !1, duration: r.animate }
                    ))),
                (e = i);
            })
            : ((t = this.value()),
              (n = this._valueMin()),
              (s = this._valueMax()),
              (i = s !== n ? ((t - n) / (s - n)) * 100 : 0),
              (h["horizontal" === this.orientation ? "left" : "bottom"] =
                i + "%"),
              this.handle.stop(1, 1)[l ? "animate" : "css"](h, r.animate),
              "min" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
              [l ? "animate" : "css"]({ width: i + "%" }, r.animate),
              "max" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
              [l ? "animate" : "css"]({ width: 100 - i + "%" }, r.animate),
              "min" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
              [l ? "animate" : "css"]({ height: i + "%" }, r.animate),
              "max" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
              [l ? "animate" : "css"](
                { height: 100 - i + "%" },
                r.animate
              ));
        },
        _handleEvents: {
          keydown: function (t) {
            var e,
              i,
              n,
              s = C(t.target).data("ui-slider-handle-index");
            switch (t.keyCode) {
              case C.ui.keyCode.HOME:
              case C.ui.keyCode.END:
              case C.ui.keyCode.PAGE_UP:
              case C.ui.keyCode.PAGE_DOWN:
              case C.ui.keyCode.UP:
              case C.ui.keyCode.RIGHT:
              case C.ui.keyCode.DOWN:
              case C.ui.keyCode.LEFT:
                if (
                  (t.preventDefault(),
                    !this._keySliding &&
                    ((this._keySliding = !0),
                      this._addClass(C(t.target), null, "ui-state-active"),
                      !1 === this._start(t, s)))
                )
                  return;
            }
            switch (
            ((n = this.options.step),
              (e = i =
                this._hasMultipleValues() ? this.values(s) : this.value()),
              t.keyCode)
            ) {
              case C.ui.keyCode.HOME:
                i = this._valueMin();
                break;
              case C.ui.keyCode.END:
                i = this._valueMax();
                break;
              case C.ui.keyCode.PAGE_UP:
                i = this._trimAlignValue(
                  e + (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case C.ui.keyCode.PAGE_DOWN:
                i = this._trimAlignValue(
                  e - (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case C.ui.keyCode.UP:
              case C.ui.keyCode.RIGHT:
                if (e === this._valueMax()) return;
                i = this._trimAlignValue(e + n);
                break;
              case C.ui.keyCode.DOWN:
              case C.ui.keyCode.LEFT:
                if (e === this._valueMin()) return;
                i = this._trimAlignValue(e - n);
            }
            this._slide(t, s, i);
          },
          keyup: function (t) {
            var e = C(t.target).data("ui-slider-handle-index");
            this._keySliding &&
              ((this._keySliding = !1),
                this._stop(t, e),
                this._change(t, e),
                this._removeClass(C(t.target), null, "ui-state-active"));
          },
        },
      }),
      C.widget("ui.spinner", {
        version: "1.12.1",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
          classes: {
            "ui-spinner": "ui-corner-all",
            "ui-spinner-down": "ui-corner-br",
            "ui-spinner-up": "ui-corner-tr",
          },
          culture: null,
          icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
          incremental: !0,
          max: null,
          min: null,
          numberFormat: null,
          page: 10,
          step: 1,
          change: null,
          spin: null,
          start: null,
          stop: null,
        },
        _create: function () {
          this._setOption("max", this.options.max),
            this._setOption("min", this.options.min),
            this._setOption("step", this.options.step),
            "" !== this.value() && this._value(this.element.val(), !0),
            this._draw(),
            this._on(this._events),
            this._refresh(),
            this._on(this.window, {
              beforeunload: function () {
                this.element.removeAttr("autocomplete");
              },
            });
        },
        _getCreateOptions: function () {
          var n = this._super(),
            s = this.element;
          return (
            C.each(["min", "max", "step"], function (t, e) {
              var i = s.attr(e);
              null != i && i.length && (n[e] = i);
            }),
            n
          );
        },
        _events: {
          keydown: function (t) {
            this._start(t) && this._keydown(t) && t.preventDefault();
          },
          keyup: "_stop",
          focus: function () {
            this.previous = this.element.val();
          },
          blur: function (t) {
            return this.cancelBlur
              ? void delete this.cancelBlur
              : (this._stop(),
                this._refresh(),
                void (
                  this.previous !== this.element.val() &&
                  this._trigger("change", t)
                ));
          },
          mousewheel: function (t, e) {
            if (e) {
              if (!this.spinning && !this._start(t)) return !1;
              this._spin((0 < e ? 1 : -1) * this.options.step, t),
                clearTimeout(this.mousewheelTimer),
                (this.mousewheelTimer = this._delay(function () {
                  this.spinning && this._stop(t);
                }, 100)),
                t.preventDefault();
            }
          },
          "mousedown .ui-spinner-button": function (t) {
            function e() {
              this.element[0] === C.ui.safeActiveElement(this.document[0]) ||
                (this.element.trigger("focus"),
                  (this.previous = i),
                  this._delay(function () {
                    this.previous = i;
                  }));
            }
            var i;
            (i =
              this.element[0] === C.ui.safeActiveElement(this.document[0])
                ? this.previous
                : this.element.val()),
              t.preventDefault(),
              e.call(this),
              (this.cancelBlur = !0),
              this._delay(function () {
                delete this.cancelBlur, e.call(this);
              }),
              !1 !== this._start(t) &&
              this._repeat(
                null,
                C(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                t
              );
          },
          "mouseup .ui-spinner-button": "_stop",
          "mouseenter .ui-spinner-button": function (t) {
            return C(t.currentTarget).hasClass("ui-state-active")
              ? !1 !== this._start(t) &&
              void this._repeat(
                null,
                C(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                t
              )
              : void 0;
          },
          "mouseleave .ui-spinner-button": "_stop",
        },
        _enhance: function () {
          this.uiSpinner = this.element
            .attr("autocomplete", "off")
            .wrap("<span>")
            .parent()
            .append("<a></a><a></a>");
        },
        _draw: function () {
          this._enhance(),
            this._addClass(
              this.uiSpinner,
              "ui-spinner",
              "ui-widget ui-widget-content"
            ),
            this._addClass("ui-spinner-input"),
            this.element.attr("role", "spinbutton"),
            (this.buttons = this.uiSpinner
              .children("a")
              .attr("tabIndex", -1)
              .attr("aria-hidden", !0)
              .button({ classes: { "ui-button": "" } })),
            this._removeClass(this.buttons, "ui-corner-all"),
            this._addClass(
              this.buttons.first(),
              "ui-spinner-button ui-spinner-up"
            ),
            this._addClass(
              this.buttons.last(),
              "ui-spinner-button ui-spinner-down"
            ),
            this.buttons
              .first()
              .button({ icon: this.options.icons.up, showLabel: !1 }),
            this.buttons
              .last()
              .button({ icon: this.options.icons.down, showLabel: !1 }),
            this.buttons.height() > Math.ceil(0.5 * this.uiSpinner.height()) &&
            0 < this.uiSpinner.height() &&
            this.uiSpinner.height(this.uiSpinner.height());
        },
        _keydown: function (t) {
          var e = this.options,
            i = C.ui.keyCode;
          switch (t.keyCode) {
            case i.UP:
              return this._repeat(null, 1, t), !0;
            case i.DOWN:
              return this._repeat(null, -1, t), !0;
            case i.PAGE_UP:
              return this._repeat(null, e.page, t), !0;
            case i.PAGE_DOWN:
              return this._repeat(null, -e.page, t), !0;
          }
          return !1;
        },
        _start: function (t) {
          return (
            !(!this.spinning && !1 === this._trigger("start", t)) &&
            (this.counter || (this.counter = 1), (this.spinning = !0))
          );
        },
        _repeat: function (t, e, i) {
          (t = t || 500),
            clearTimeout(this.timer),
            (this.timer = this._delay(function () {
              this._repeat(40, e, i);
            }, t)),
            this._spin(e * this.options.step, i);
        },
        _spin: function (t, e) {
          var i = this.value() || 0;
          this.counter || (this.counter = 1),
            (i = this._adjustValue(i + t * this._increment(this.counter))),
            (this.spinning && !1 === this._trigger("spin", e, { value: i })) ||
            (this._value(i), this.counter++);
        },
        _increment: function (t) {
          var e = this.options.incremental;
          return e
            ? C.isFunction(e)
              ? e(t)
              : Math.floor(
                (t * t * t) / 5e4 - (t * t) / 500 + (17 * t) / 200 + 1
              )
            : 1;
        },
        _precision: function () {
          var t = this._precisionOf(this.options.step);
          return (
            null !== this.options.min &&
            (t = Math.max(t, this._precisionOf(this.options.min))),
            t
          );
        },
        _precisionOf: function (t) {
          var e = "" + t,
            i = e.indexOf(".");
          return -1 === i ? 0 : e.length - i - 1;
        },
        _adjustValue: function (t) {
          var e,
            i,
            n = this.options;
          return (
            (i = t - (e = null !== n.min ? n.min : 0)),
            (t = e + (i = Math.round(i / n.step) * n.step)),
            (t = parseFloat(t.toFixed(this._precision()))),
            null !== n.max && t > n.max
              ? n.max
              : null !== n.min && n.min > t
                ? n.min
                : t
          );
        },
        _stop: function (t) {
          this.spinning &&
            (clearTimeout(this.timer),
              clearTimeout(this.mousewheelTimer),
              (this.counter = 0),
              (this.spinning = !1),
              this._trigger("stop", t));
        },
        _setOption: function (t, e) {
          var i, n, s;
          return "culture" === t || "numberFormat" === t
            ? ((i = this._parse(this.element.val())),
              (this.options[t] = e),
              void this.element.val(this._format(i)))
            : (("max" !== t && "min" !== t && "step" !== t) ||
              "string" != typeof e ||
              (e = this._parse(e)),
              "icons" === t &&
              ((n = this.buttons.first().find(".ui-icon")),
                this._removeClass(n, null, this.options.icons.up),
                this._addClass(n, null, e.up),
                (s = this.buttons.last().find(".ui-icon")),
                this._removeClass(s, null, this.options.icons.down),
                this._addClass(s, null, e.down)),
              void this._super(t, e));
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t),
            this.element.prop("disabled", !!t),
            this.buttons.button(t ? "disable" : "enable");
        },
        _setOptions: e(function (t) {
          this._super(t);
        }),
        _parse: function (t) {
          return (
            "string" == typeof t &&
            "" !== t &&
            (t =
              window.Globalize && this.options.numberFormat
                ? Globalize.parseFloat(t, 10, this.options.culture)
                : +t),
            "" === t || isNaN(t) ? null : t
          );
        },
        _format: function (t) {
          return "" === t
            ? ""
            : window.Globalize && this.options.numberFormat
              ? Globalize.format(
                t,
                this.options.numberFormat,
                this.options.culture
              )
              : t;
        },
        _refresh: function () {
          this.element.attr({
            "aria-valuemin": this.options.min,
            "aria-valuemax": this.options.max,
            "aria-valuenow": this._parse(this.element.val()),
          });
        },
        isValid: function () {
          var t = this.value();
          return null !== t && t === this._adjustValue(t);
        },
        _value: function (t, e) {
          var i;
          "" === t ||
            (null !== (i = this._parse(t)) &&
              (e || (i = this._adjustValue(i)), (t = this._format(i)))),
            this.element.val(t),
            this._refresh();
        },
        _destroy: function () {
          this.element
            .prop("disabled", !1)
            .removeAttr(
              "autocomplete role aria-valuemin aria-valuemax aria-valuenow"
            ),
            this.uiSpinner.replaceWith(this.element);
        },
        stepUp: e(function (t) {
          this._stepUp(t);
        }),
        _stepUp: function (t) {
          this._start() &&
            (this._spin((t || 1) * this.options.step), this._stop());
        },
        stepDown: e(function (t) {
          this._stepDown(t);
        }),
        _stepDown: function (t) {
          this._start() &&
            (this._spin((t || 1) * -this.options.step), this._stop());
        },
        pageUp: e(function (t) {
          this._stepUp((t || 1) * this.options.page);
        }),
        pageDown: e(function (t) {
          this._stepDown((t || 1) * this.options.page);
        }),
        value: function (t) {
          return arguments.length
            ? void e(this._value).call(this, t)
            : this._parse(this.element.val());
        },
        widget: function () {
          return this.uiSpinner;
        },
      }),
      !1 !== C.uiBackCompat &&
      C.widget("ui.spinner", C.ui.spinner, {
        _enhance: function () {
          this.uiSpinner = this.element
            .attr("autocomplete", "off")
            .wrap(this._uiSpinnerHtml())
            .parent()
            .append(this._buttonHtml());
        },
        _uiSpinnerHtml: function () {
          return "<span>";
        },
        _buttonHtml: function () {
          return "<a></a><a></a>";
        },
      }),
      C.ui.spinner,
      C.widget("ui.tabs", {
        version: "1.12.1",
        delay: 300,
        options: {
          active: null,
          classes: {
            "ui-tabs": "ui-corner-all",
            "ui-tabs-nav": "ui-corner-all",
            "ui-tabs-panel": "ui-corner-bottom",
            "ui-tabs-tab": "ui-corner-top",
          },
          collapsible: !1,
          event: "click",
          heightStyle: "content",
          hide: null,
          show: null,
          activate: null,
          beforeActivate: null,
          beforeLoad: null,
          load: null,
        },
        _isLocal:
          ((w = /#.*$/),
            function (t) {
              var e, i;
              (e = t.href.replace(w, "")), (i = location.href.replace(w, ""));
              try {
                e = decodeURIComponent(e);
              } catch (t) { }
              try {
                i = decodeURIComponent(i);
              } catch (t) { }
              return 1 < t.hash.length && e === i;
            }),
        _create: function () {
          var e = this,
            t = this.options;
          (this.running = !1),
            this._addClass("ui-tabs", "ui-widget ui-widget-content"),
            this._toggleClass("ui-tabs-collapsible", null, t.collapsible),
            this._processTabs(),
            (t.active = this._initialActive()),
            C.isArray(t.disabled) &&
            (t.disabled = C.unique(
              t.disabled.concat(
                C.map(this.tabs.filter(".ui-state-disabled"), function (t) {
                  return e.tabs.index(t);
                })
              )
            ).sort()),
            (this.active =
              !1 !== this.options.active && this.anchors.length
                ? this._findActive(t.active)
                : C()),
            this._refresh(),
            this.active.length && this.load(t.active);
        },
        _initialActive: function () {
          var i = this.options.active,
            t = this.options.collapsible,
            n = location.hash.substring(1);
          return (
            null === i &&
            (n &&
              this.tabs.each(function (t, e) {
                return C(e).attr("aria-controls") === n
                  ? ((i = t), !1)
                  : void 0;
              }),
              null === i &&
              (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
              (null !== i && -1 !== i) || (i = !!this.tabs.length && 0)),
            !1 !== i &&
            -1 === (i = this.tabs.index(this.tabs.eq(i))) &&
            (i = !t && 0),
            !t && !1 === i && this.anchors.length && (i = 0),
            i
          );
        },
        _getCreateEventData: function () {
          return {
            tab: this.active,
            panel: this.active.length ? this._getPanelForTab(this.active) : C(),
          };
        },
        _tabKeydown: function (t) {
          var e = C(C.ui.safeActiveElement(this.document[0])).closest("li"),
            i = this.tabs.index(e),
            n = !0;
          if (!this._handlePageNav(t)) {
            switch (t.keyCode) {
              case C.ui.keyCode.RIGHT:
              case C.ui.keyCode.DOWN:
                i++;
                break;
              case C.ui.keyCode.UP:
              case C.ui.keyCode.LEFT:
                (n = !1), i--;
                break;
              case C.ui.keyCode.END:
                i = this.anchors.length - 1;
                break;
              case C.ui.keyCode.HOME:
                i = 0;
                break;
              case C.ui.keyCode.SPACE:
                return (
                  t.preventDefault(),
                  clearTimeout(this.activating),
                  void this._activate(i)
                );
              case C.ui.keyCode.ENTER:
                return (
                  t.preventDefault(),
                  clearTimeout(this.activating),
                  void this._activate(i !== this.options.active && i)
                );
              default:
                return;
            }
            t.preventDefault(),
              clearTimeout(this.activating),
              (i = this._focusNextTab(i, n)),
              t.ctrlKey ||
              t.metaKey ||
              (e.attr("aria-selected", "false"),
                this.tabs.eq(i).attr("aria-selected", "true"),
                (this.activating = this._delay(function () {
                  this.option("active", i);
                }, this.delay)));
          }
        },
        _panelKeydown: function (t) {
          this._handlePageNav(t) ||
            (t.ctrlKey &&
              t.keyCode === C.ui.keyCode.UP &&
              (t.preventDefault(), this.active.trigger("focus")));
        },
        _handlePageNav: function (t) {
          return t.altKey && t.keyCode === C.ui.keyCode.PAGE_UP
            ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
              !0)
            : t.altKey && t.keyCode === C.ui.keyCode.PAGE_DOWN
              ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
                !0)
              : void 0;
        },
        _findNextTab: function (t, e) {
          for (
            var i = this.tabs.length - 1;
            -1 !==
            C.inArray(
              (i < t && (t = 0), t < 0 && (t = i), t),
              this.options.disabled
            );

          )
            t = e ? t + 1 : t - 1;
          return t;
        },
        _focusNextTab: function (t, e) {
          return (
            (t = this._findNextTab(t, e)), this.tabs.eq(t).trigger("focus"), t
          );
        },
        _setOption: function (t, e) {
          return "active" === t
            ? void this._activate(e)
            : (this._super(t, e),
              "collapsible" === t &&
              (this._toggleClass("ui-tabs-collapsible", null, e),
                e || !1 !== this.options.active || this._activate(0)),
              "event" === t && this._setupEvents(e),
              void ("heightStyle" === t && this._setupHeightStyle(e)));
        },
        _sanitizeSelector: function (t) {
          return t
            ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&")
            : "";
        },
        refresh: function () {
          var t = this.options,
            e = this.tablist.children(":has(a[href])");
          (t.disabled = C.map(e.filter(".ui-state-disabled"), function (t) {
            return e.index(t);
          })),
            this._processTabs(),
            !1 !== t.active && this.anchors.length
              ? this.active.length &&
                !C.contains(this.tablist[0], this.active[0])
                ? this.tabs.length === t.disabled.length
                  ? ((t.active = !1), (this.active = C()))
                  : this._activate(
                    this._findNextTab(Math.max(0, t.active - 1), !1)
                  )
                : (t.active = this.tabs.index(this.active))
              : ((t.active = !1), (this.active = C())),
            this._refresh();
        },
        _refresh: function () {
          this._setOptionDisabled(this.options.disabled),
            this._setupEvents(this.options.event),
            this._setupHeightStyle(this.options.heightStyle),
            this.tabs
              .not(this.active)
              .attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1,
              }),
            this.panels
              .not(this._getPanelForTab(this.active))
              .hide()
              .attr({ "aria-hidden": "true" }),
            this.active.length
              ? (this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              }),
                this._addClass(
                  this.active,
                  "ui-tabs-active",
                  "ui-state-active"
                ),
                this._getPanelForTab(this.active)
                  .show()
                  .attr({ "aria-hidden": "false" }))
              : this.tabs.eq(0).attr("tabIndex", 0);
        },
        _processTabs: function () {
          var l = this,
            t = this.tabs,
            e = this.anchors,
            i = this.panels;
          (this.tablist = this._getList().attr("role", "tablist")),
            this._addClass(
              this.tablist,
              "ui-tabs-nav",
              "ui-helper-reset ui-helper-clearfix ui-widget-header"
            ),
            this.tablist
              .on("mousedown" + this.eventNamespace, "> li", function (t) {
                C(this).is(".ui-state-disabled") && t.preventDefault();
              })
              .on(
                "focus" + this.eventNamespace,
                ".ui-tabs-anchor",
                function () {
                  C(this).closest("li").is(".ui-state-disabled") && this.blur();
                }
              ),
            (this.tabs = this.tablist
              .find("> li:has(a[href])")
              .attr({ role: "tab", tabIndex: -1 })),
            this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"),
            (this.anchors = this.tabs
              .map(function () {
                return C("a", this)[0];
              })
              .attr({ role: "presentation", tabIndex: -1 })),
            this._addClass(this.anchors, "ui-tabs-anchor"),
            (this.panels = C()),
            this.anchors.each(function (t, e) {
              var i,
                n,
                s,
                o = C(e).uniqueId().attr("id"),
                r = C(e).closest("li"),
                a = r.attr("aria-controls");
              l._isLocal(e)
                ? ((s = (i = e.hash).substring(1)),
                  (n = l.element.find(l._sanitizeSelector(i))))
                : ((i =
                  "#" +
                  (s = r.attr("aria-controls") || C({}).uniqueId()[0].id)),
                  (n = l.element.find(i)).length ||
                  (n = l._createPanel(s)).insertAfter(
                    l.panels[t - 1] || l.tablist
                  ),
                  n.attr("aria-live", "polite")),
                n.length && (l.panels = l.panels.add(n)),
                a && r.data("ui-tabs-aria-controls", a),
                r.attr({ "aria-controls": s, "aria-labelledby": o }),
                n.attr("aria-labelledby", o);
            }),
            this.panels.attr("role", "tabpanel"),
            this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"),
            t &&
            (this._off(t.not(this.tabs)),
              this._off(e.not(this.anchors)),
              this._off(i.not(this.panels)));
        },
        _getList: function () {
          return this.tablist || this.element.find("ol, ul").eq(0);
        },
        _createPanel: function (t) {
          return C("<div>").attr("id", t).data("ui-tabs-destroy", !0);
        },
        _setOptionDisabled: function (t) {
          var e, i, n;
          for (
            C.isArray(t) &&
            (t.length
              ? t.length === this.anchors.length && (t = !0)
              : (t = !1)),
            n = 0;
            (i = this.tabs[n]);
            n++
          )
            (e = C(i)),
              !0 === t || -1 !== C.inArray(n, t)
                ? (e.attr("aria-disabled", "true"),
                  this._addClass(e, null, "ui-state-disabled"))
                : (e.removeAttr("aria-disabled"),
                  this._removeClass(e, null, "ui-state-disabled"));
          (this.options.disabled = t),
            this._toggleClass(
              this.widget(),
              this.widgetFullName + "-disabled",
              null,
              !0 === t
            );
        },
        _setupEvents: function (t) {
          var i = {};
          t &&
            C.each(t.split(" "), function (t, e) {
              i[e] = "_eventHandler";
            }),
            this._off(this.anchors.add(this.tabs).add(this.panels)),
            this._on(!0, this.anchors, {
              click: function (t) {
                t.preventDefault();
              },
            }),
            this._on(this.anchors, i),
            this._on(this.tabs, { keydown: "_tabKeydown" }),
            this._on(this.panels, { keydown: "_panelKeydown" }),
            this._focusable(this.tabs),
            this._hoverable(this.tabs);
        },
        _setupHeightStyle: function (t) {
          var i,
            e = this.element.parent();
          "fill" === t
            ? ((i = e.height()),
              (i -= this.element.outerHeight() - this.element.height()),
              this.element.siblings(":visible").each(function () {
                var t = C(this),
                  e = t.css("position");
                "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0));
              }),
              this.element
                .children()
                .not(this.panels)
                .each(function () {
                  i -= C(this).outerHeight(!0);
                }),
              this.panels
                .each(function () {
                  C(this).height(
                    Math.max(0, i - C(this).innerHeight() + C(this).height())
                  );
                })
                .css("overflow", "auto"))
            : "auto" === t &&
            ((i = 0),
              this.panels
                .each(function () {
                  i = Math.max(i, C(this).height("").height());
                })
                .height(i));
        },
        _eventHandler: function (t) {
          var e = this.options,
            i = this.active,
            n = C(t.currentTarget).closest("li"),
            s = n[0] === i[0],
            o = s && e.collapsible,
            r = o ? C() : this._getPanelForTab(n),
            a = i.length ? this._getPanelForTab(i) : C(),
            l = { oldTab: i, oldPanel: a, newTab: o ? C() : n, newPanel: r };
          t.preventDefault(),
            n.hasClass("ui-state-disabled") ||
            n.hasClass("ui-tabs-loading") ||
            this.running ||
            (s && !e.collapsible) ||
            !1 === this._trigger("beforeActivate", t, l) ||
            ((e.active = !o && this.tabs.index(n)),
              (this.active = s ? C() : n),
              this.xhr && this.xhr.abort(),
              a.length ||
              r.length ||
              C.error("jQuery UI Tabs: Mismatching fragment identifier."),
              r.length && this.load(this.tabs.index(n), t),
              this._toggle(t, l));
        },
        _toggle: function (t, e) {
          function i() {
            (s.running = !1), s._trigger("activate", t, e);
          }
          function n() {
            s._addClass(
              e.newTab.closest("li"),
              "ui-tabs-active",
              "ui-state-active"
            ),
              o.length && s.options.show
                ? s._show(o, s.options.show, i)
                : (o.show(), i());
          }
          var s = this,
            o = e.newPanel,
            r = e.oldPanel;
          (this.running = !0),
            r.length && this.options.hide
              ? this._hide(r, this.options.hide, function () {
                s._removeClass(
                  e.oldTab.closest("li"),
                  "ui-tabs-active",
                  "ui-state-active"
                ),
                  n();
              })
              : (this._removeClass(
                e.oldTab.closest("li"),
                "ui-tabs-active",
                "ui-state-active"
              ),
                r.hide(),
                n()),
            r.attr("aria-hidden", "true"),
            e.oldTab.attr({
              "aria-selected": "false",
              "aria-expanded": "false",
            }),
            o.length && r.length
              ? e.oldTab.attr("tabIndex", -1)
              : o.length &&
              this.tabs
                .filter(function () {
                  return 0 === C(this).attr("tabIndex");
                })
                .attr("tabIndex", -1),
            o.attr("aria-hidden", "false"),
            e.newTab.attr({
              "aria-selected": "true",
              "aria-expanded": "true",
              tabIndex: 0,
            });
        },
        _activate: function (t) {
          var e,
            i = this._findActive(t);
          i[0] !== this.active[0] &&
            (i.length || (i = this.active),
              (e = i.find(".ui-tabs-anchor")[0]),
              this._eventHandler({
                target: e,
                currentTarget: e,
                preventDefault: C.noop,
              }));
        },
        _findActive: function (t) {
          return !1 === t ? C() : this.tabs.eq(t);
        },
        _getIndex: function (t) {
          return (
            "string" == typeof t &&
            (t = this.anchors.index(
              this.anchors.filter("[href$='" + C.ui.escapeSelector(t) + "']")
            )),
            t
          );
        },
        _destroy: function () {
          this.xhr && this.xhr.abort(),
            this.tablist.removeAttr("role").off(this.eventNamespace),
            this.anchors.removeAttr("role tabIndex").removeUniqueId(),
            this.tabs.add(this.panels).each(function () {
              C.data(this, "ui-tabs-destroy")
                ? C(this).remove()
                : C(this).removeAttr(
                  "role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded"
                );
            }),
            this.tabs.each(function () {
              var t = C(this),
                e = t.data("ui-tabs-aria-controls");
              e
                ? t.attr("aria-controls", e).removeData("ui-tabs-aria-controls")
                : t.removeAttr("aria-controls");
            }),
            this.panels.show(),
            "content" !== this.options.heightStyle &&
            this.panels.css("height", "");
        },
        enable: function (i) {
          var t = this.options.disabled;
          !1 !== t &&
            ((t =
              void 0 !== i &&
              ((i = this._getIndex(i)),
                C.isArray(t)
                  ? C.map(t, function (t) {
                    return t !== i ? t : null;
                  })
                  : C.map(this.tabs, function (t, e) {
                    return e !== i ? e : null;
                  }))),
              this._setOptionDisabled(t));
        },
        disable: function (t) {
          var e = this.options.disabled;
          if (!0 !== e) {
            if (void 0 === t) e = !0;
            else {
              if (((t = this._getIndex(t)), -1 !== C.inArray(t, e))) return;
              e = C.isArray(e) ? C.merge([t], e).sort() : [t];
            }
            this._setOptionDisabled(e);
          }
        },
        load: function (t, n) {
          t = this._getIndex(t);
          function s(t, e) {
            "abort" === e && o.panels.stop(!1, !0),
              o._removeClass(i, "ui-tabs-loading"),
              r.removeAttr("aria-busy"),
              t === o.xhr && delete o.xhr;
          }
          var o = this,
            i = this.tabs.eq(t),
            e = i.find(".ui-tabs-anchor"),
            r = this._getPanelForTab(i),
            a = { tab: i, panel: r };
          this._isLocal(e[0]) ||
            ((this.xhr = C.ajax(this._ajaxSettings(e, n, a))),
              this.xhr &&
              "canceled" !== this.xhr.statusText &&
              (this._addClass(i, "ui-tabs-loading"),
                r.attr("aria-busy", "true"),
                this.xhr
                  .done(function (t, e, i) {
                    setTimeout(function () {
                      r.html(t), o._trigger("load", n, a), s(i, e);
                    }, 1);
                  })
                  .fail(function (t, e) {
                    setTimeout(function () {
                      s(t, e);
                    }, 1);
                  })));
        },
        _ajaxSettings: function (t, i, n) {
          var s = this;
          return {
            url: t.attr("href").replace(/#.*$/, ""),
            beforeSend: function (t, e) {
              return s._trigger(
                "beforeLoad",
                i,
                C.extend({ jqXHR: t, ajaxSettings: e }, n)
              );
            },
          };
        },
        _getPanelForTab: function (t) {
          var e = C(t).attr("aria-controls");
          return this.element.find(this._sanitizeSelector("#" + e));
        },
      }),
      !1 !== C.uiBackCompat &&
      C.widget("ui.tabs", C.ui.tabs, {
        _processTabs: function () {
          this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
        },
      }),
      C.ui.tabs,
      C.widget("ui.tooltip", {
        version: "1.12.1",
        options: {
          classes: { "ui-tooltip": "ui-corner-all ui-widget-shadow" },
          content: function () {
            var t = C(this).attr("title") || "";
            return C("<a>").text(t).html();
          },
          hide: !0,
          items: "[title]:not([disabled])",
          position: {
            my: "left top+15",
            at: "left bottom",
            collision: "flipfit flip",
          },
          show: !0,
          track: !1,
          close: null,
          open: null,
        },
        _addDescribedBy: function (t, e) {
          var i = (t.attr("aria-describedby") || "").split(/\s+/);
          i.push(e),
            t
              .data("ui-tooltip-id", e)
              .attr("aria-describedby", C.trim(i.join(" ")));
        },
        _removeDescribedBy: function (t) {
          var e = t.data("ui-tooltip-id"),
            i = (t.attr("aria-describedby") || "").split(/\s+/),
            n = C.inArray(e, i);
          -1 !== n && i.splice(n, 1),
            t.removeData("ui-tooltip-id"),
            (i = C.trim(i.join(" ")))
              ? t.attr("aria-describedby", i)
              : t.removeAttr("aria-describedby");
        },
        _create: function () {
          this._on({ mouseover: "open", focusin: "open" }),
            (this.tooltips = {}),
            (this.parents = {}),
            (this.liveRegion = C("<div>")
              .attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions",
              })
              .appendTo(this.document[0].body)),
            this._addClass(
              this.liveRegion,
              null,
              "ui-helper-hidden-accessible"
            ),
            (this.disabledTitles = C([]));
        },
        _setOption: function (t, e) {
          var i = this;
          this._super(t, e),
            "content" === t &&
            C.each(this.tooltips, function (t, e) {
              i._updateContent(e.element);
            });
        },
        _setOptionDisabled: function (t) {
          this[t ? "_disable" : "_enable"]();
        },
        _disable: function () {
          var n = this;
          C.each(this.tooltips, function (t, e) {
            var i = C.Event("blur");
            (i.target = i.currentTarget = e.element[0]), n.close(i, !0);
          }),
            (this.disabledTitles = this.disabledTitles.add(
              this.element
                .find(this.options.items)
                .addBack()
                .filter(function () {
                  var t = C(this);
                  return t.is("[title]")
                    ? t
                      .data("ui-tooltip-title", t.attr("title"))
                      .removeAttr("title")
                    : void 0;
                })
            ));
        },
        _enable: function () {
          this.disabledTitles.each(function () {
            var t = C(this);
            t.data("ui-tooltip-title") &&
              t.attr("title", t.data("ui-tooltip-title"));
          }),
            (this.disabledTitles = C([]));
        },
        open: function (t) {
          var i = this,
            e = C(t ? t.target : this.element).closest(this.options.items);
          e.length &&
            !e.data("ui-tooltip-id") &&
            (e.attr("title") && e.data("ui-tooltip-title", e.attr("title")),
              e.data("ui-tooltip-open", !0),
              t &&
              "mouseover" === t.type &&
              e.parents().each(function () {
                var t,
                  e = C(this);
                e.data("ui-tooltip-open") &&
                  (((t = C.Event("blur")).target = t.currentTarget = this),
                    i.close(t, !0)),
                  e.attr("title") &&
                  (e.uniqueId(),
                    (i.parents[this.id] = {
                      element: this,
                      title: e.attr("title"),
                    }),
                    e.attr("title", ""));
              }),
              this._registerCloseHandlers(t, e),
              this._updateContent(e, t));
        },
        _updateContent: function (e, i) {
          var t,
            n = this.options.content,
            s = this,
            o = i ? i.type : null;
          return "string" == typeof n || n.nodeType || n.jquery
            ? this._open(i, e, n)
            : void (
              (t = n.call(e[0], function (t) {
                s._delay(function () {
                  e.data("ui-tooltip-open") &&
                    (i && (i.type = o), this._open(i, e, t));
                });
              })) && this._open(i, e, t)
            );
        },
        _open: function (t, e, i) {
          function n(t) {
            (l.of = t), o.is(":hidden") || o.position(l);
          }
          var s,
            o,
            r,
            a,
            l = C.extend({}, this.options.position);
          if (i) {
            if ((s = this._find(e)))
              return void s.tooltip.find(".ui-tooltip-content").html(i);
            e.is("[title]") &&
              (t && "mouseover" === t.type
                ? e.attr("title", "")
                : e.removeAttr("title")),
              (s = this._tooltip(e)),
              (o = s.tooltip),
              this._addDescribedBy(e, o.attr("id")),
              o.find(".ui-tooltip-content").html(i),
              this.liveRegion.children().hide(),
              (a = C("<div>").html(o.find(".ui-tooltip-content").html()))
                .removeAttr("name")
                .find("[name]")
                .removeAttr("name"),
              a.removeAttr("id").find("[id]").removeAttr("id"),
              a.appendTo(this.liveRegion),
              this.options.track && t && /^mouse/.test(t.type)
                ? (this._on(this.document, { mousemove: n }), n(t))
                : o.position(C.extend({ of: e }, this.options.position)),
              o.hide(),
              this._show(o, this.options.show),
              this.options.track &&
              this.options.show &&
              this.options.show.delay &&
              (r = this.delayedShow =
                setInterval(function () {
                  o.is(":visible") && (n(l.of), clearInterval(r));
                }, C.fx.interval)),
              this._trigger("open", t, { tooltip: o });
          }
        },
        _registerCloseHandlers: function (t, i) {
          var e = {
            keyup: function (t) {
              if (t.keyCode === C.ui.keyCode.ESCAPE) {
                var e = C.Event(t);
                (e.currentTarget = i[0]), this.close(e, !0);
              }
            },
          };
          i[0] !== this.element[0] &&
            (e.remove = function () {
              this._removeTooltip(this._find(i).tooltip);
            }),
            (t && "mouseover" !== t.type) || (e.mouseleave = "close"),
            (t && "focusin" !== t.type) || (e.focusout = "close"),
            this._on(!0, i, e);
        },
        close: function (t) {
          var e,
            i = this,
            n = C(t ? t.currentTarget : this.element),
            s = this._find(n);
          return s
            ? ((e = s.tooltip),
              void (
                s.closing ||
                (clearInterval(this.delayedShow),
                  n.data("ui-tooltip-title") &&
                  !n.attr("title") &&
                  n.attr("title", n.data("ui-tooltip-title")),
                  this._removeDescribedBy(n),
                  (s.hiding = !0),
                  e.stop(!0),
                  this._hide(e, this.options.hide, function () {
                    i._removeTooltip(C(this));
                  }),
                  n.removeData("ui-tooltip-open"),
                  this._off(n, "mouseleave focusout keyup"),
                  n[0] !== this.element[0] && this._off(n, "remove"),
                  this._off(this.document, "mousemove"),
                  t &&
                  "mouseleave" === t.type &&
                  C.each(this.parents, function (t, e) {
                    C(e.element).attr("title", e.title), delete i.parents[t];
                  }),
                  (s.closing = !0),
                  this._trigger("close", t, { tooltip: e }),
                  s.hiding || (s.closing = !1))
              ))
            : void n.removeData("ui-tooltip-open");
        },
        _tooltip: function (t) {
          var e = C("<div>").attr("role", "tooltip"),
            i = C("<div>").appendTo(e),
            n = e.uniqueId().attr("id");
          return (
            this._addClass(i, "ui-tooltip-content"),
            this._addClass(e, "ui-tooltip", "ui-widget ui-widget-content"),
            e.appendTo(this._appendTo(t)),
            (this.tooltips[n] = { element: t, tooltip: e })
          );
        },
        _find: function (t) {
          var e = t.data("ui-tooltip-id");
          return e ? this.tooltips[e] : null;
        },
        _removeTooltip: function (t) {
          t.remove(), delete this.tooltips[t.attr("id")];
        },
        _appendTo: function (t) {
          var e = t.closest(".ui-front, dialog");
          return e.length || (e = this.document[0].body), e;
        },
        _destroy: function () {
          var s = this;
          C.each(this.tooltips, function (t, e) {
            var i = C.Event("blur"),
              n = e.element;
            (i.target = i.currentTarget = n[0]),
              s.close(i, !0),
              C("#" + t).remove(),
              n.data("ui-tooltip-title") &&
              (n.attr("title") || n.attr("title", n.data("ui-tooltip-title")),
                n.removeData("ui-tooltip-title"));
          }),
            this.liveRegion.remove();
        },
      }),
      !1 !== C.uiBackCompat &&
      C.widget("ui.tooltip", C.ui.tooltip, {
        options: { tooltipClass: null },
        _tooltip: function () {
          var t = this._superApply(arguments);
          return (
            this.options.tooltipClass &&
            t.tooltip.addClass(this.options.tooltipClass),
            t
          );
        },
      }),
      C.ui.tooltip;
    var A,
      P,
      j,
      O,
      N,
      M,
      H,
      z,
      W,
      L,
      R,
      F,
      q,
      B,
      $,
      U,
      Y,
      K,
      V,
      Q,
      X,
      G = "ui-effects-",
      J = "ui-effects-style",
      Z = "ui-effects-animated",
      tt = C;
    function et(t, e, i, n) {
      return (
        C.isPlainObject(t) && (t = (e = t).effect),
        (t = { effect: t }),
        null == e && (e = {}),
        C.isFunction(e) && ((n = e), (i = null), (e = {})),
        ("number" != typeof e && !C.fx.speeds[e]) ||
        ((n = i), (i = e), (e = {})),
        C.isFunction(i) && ((n = i), (i = null)),
        e && C.extend(t, e),
        (i = i || e.duration),
        (t.duration = C.fx.off
          ? 0
          : "number" == typeof i
            ? i
            : i in C.fx.speeds
              ? C.fx.speeds[i]
              : C.fx.speeds._default),
        (t.complete = n || e.complete),
        t
      );
    }
    function it(t) {
      return (
        !(t && "number" != typeof t && !C.fx.speeds[t]) ||
        ("string" == typeof t && !C.effects.effect[t]) ||
        !!C.isFunction(t) ||
        ("object" == typeof t && !t.effect)
      );
    }
    function nt(t, e) {
      var i = e.outerWidth(),
        n = e.outerHeight(),
        s =
          /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(
            t
          ) || ["", 0, i, n, 0];
      return {
        top: parseFloat(s[1]) || 0,
        right: "auto" === s[2] ? i : parseFloat(s[2]),
        bottom: "auto" === s[3] ? n : parseFloat(s[3]),
        left: parseFloat(s[4]) || 0,
      };
    }
    function st(t) {
      var e,
        i,
        n = t.ownerDocument.defaultView
          ? t.ownerDocument.defaultView.getComputedStyle(t, null)
          : t.currentStyle,
        s = {};
      if (n && n.length && n[0] && n[n[0]])
        for (i = n.length; i--;)
          "string" == typeof n[(e = n[i])] && (s[C.camelCase(e)] = n[e]);
      else for (e in n) "string" == typeof n[e] && (s[e] = n[e]);
      return s;
    }
    function ot(t, e, i) {
      var n = K[e.type] || {};
      return null == t
        ? i || !e.def
          ? null
          : e.def
        : ((t = n.floor ? ~~t : parseFloat(t)),
          isNaN(t)
            ? e.def
            : n.mod
              ? (t + n.mod) % n.mod
              : t < 0
                ? 0
                : t > n.max
                  ? n.max
                  : t);
    }
    function rt(r) {
      var a = U(),
        l = (a._rgba = []);
      return (
        (r = r.toLowerCase()),
        X($, function (t, e) {
          var i,
            n = e.re.exec(r),
            s = n && e.parse(n),
            o = e.space || "rgba";
          return s
            ? ((i = a[o](s)),
              (a[Y[o].cache] = i[Y[o].cache]),
              (l = a._rgba = i._rgba),
              !1)
            : F;
        }),
        l.length
          ? ("0,0,0,0" === l.join() && R.extend(l, q.transparent), a)
          : q[r]
      );
    }
    function at(t, e, i) {
      return 6 * (i = (i + 1) % 1) < 1
        ? t + 6 * (e - t) * i
        : 2 * i < 1
          ? e
          : 3 * i < 2
            ? t + 6 * (e - t) * (2 / 3 - i)
            : t;
    }
    (C.effects = { effect: {} }),
      (B = /^([\-+])=\s*(\d+\.?\d*)/),
      ($ = [
        {
          re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function (t) {
            return [t[1], t[2], t[3], t[4]];
          },
        },
        {
          re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function (t) {
            return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
          },
        },
        {
          re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
          parse: function (t) {
            return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
          },
        },
        {
          re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
          parse: function (t) {
            return [
              parseInt(t[1] + t[1], 16),
              parseInt(t[2] + t[2], 16),
              parseInt(t[3] + t[3], 16),
            ];
          },
        },
        {
          re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          space: "hsla",
          parse: function (t) {
            return [t[1], t[2] / 100, t[3] / 100, t[4]];
          },
        },
      ]),
      (U = (R = tt).Color =
        function (t, e, i, n) {
          return new R.Color.fn.parse(t, e, i, n);
        }),
      (Y = {
        rgba: {
          props: {
            red: { idx: 0, type: "byte" },
            green: { idx: 1, type: "byte" },
            blue: { idx: 2, type: "byte" },
          },
        },
        hsla: {
          props: {
            hue: { idx: 0, type: "degrees" },
            saturation: { idx: 1, type: "percent" },
            lightness: { idx: 2, type: "percent" },
          },
        },
      }),
      (K = {
        byte: { floor: !0, max: 255 },
        percent: { max: 1 },
        degrees: { mod: 360, floor: !0 },
      }),
      (V = U.support = {}),
      (Q = R("<p>")[0]),
      (X = R.each),
      (Q.style.cssText = "background-color:rgba(1,1,1,.5)"),
      (V.rgba = -1 < Q.style.backgroundColor.indexOf("rgba")),
      X(Y, function (t, e) {
        (e.cache = "_" + t),
          (e.props.alpha = { idx: 3, type: "percent", def: 1 });
      }),
      (U.fn = R.extend(U.prototype, {
        parse: function (s, t, e, i) {
          if (s === F) return (this._rgba = [null, null, null, null]), this;
          (s.jquery || s.nodeType) && ((s = R(s).css(t)), (t = F));
          var o = this,
            n = R.type(s),
            r = (this._rgba = []);
          return (
            t !== F && ((s = [s, t, e, i]), (n = "array")),
            "string" === n
              ? this.parse(rt(s) || q._default)
              : "array" === n
                ? (X(Y.rgba.props, function (t, e) {
                  r[e.idx] = ot(s[e.idx], e);
                }),
                  this)
                : "object" === n
                  ? (X(
                    Y,
                    s instanceof U
                      ? function (t, e) {
                        s[e.cache] && (o[e.cache] = s[e.cache].slice());
                      }
                      : function (t, i) {
                        var n = i.cache;
                        X(i.props, function (t, e) {
                          if (!o[n] && i.to) {
                            if ("alpha" === t || null == s[t]) return;
                            o[n] = i.to(o._rgba);
                          }
                          o[n][e.idx] = ot(s[t], e, !0);
                        }),
                          o[n] &&
                          R.inArray(null, o[n].slice(0, 3)) < 0 &&
                          ((o[n][3] = 1), i.from && (o._rgba = i.from(o[n])));
                      }
                  ),
                    this)
                  : F
          );
        },
        is: function (t) {
          var s = U(t),
            o = !0,
            r = this;
          return (
            X(Y, function (t, e) {
              var i,
                n = s[e.cache];
              return (
                n &&
                ((i = r[e.cache] || (e.to && e.to(r._rgba)) || []),
                  X(e.props, function (t, e) {
                    return null != n[e.idx] ? (o = n[e.idx] === i[e.idx]) : F;
                  })),
                o
              );
            }),
            o
          );
        },
        _space: function () {
          var i = [],
            n = this;
          return (
            X(Y, function (t, e) {
              n[e.cache] && i.push(t);
            }),
            i.pop()
          );
        },
        transition: function (t, r) {
          var a = U(t),
            e = a._space(),
            i = Y[e],
            n = 0 === this.alpha() ? U("transparent") : this,
            l = n[i.cache] || i.to(n._rgba),
            h = l.slice();
          return (
            (a = a[i.cache]),
            X(i.props, function (t, e) {
              var i = e.idx,
                n = l[i],
                s = a[i],
                o = K[e.type] || {};
              null !== s &&
                (null === n
                  ? (h[i] = s)
                  : (o.mod &&
                    (s - n > o.mod / 2
                      ? (n += o.mod)
                      : n - s > o.mod / 2 && (n -= o.mod)),
                    (h[i] = ot((s - n) * r + n, e))));
            }),
            this[e](h)
          );
        },
        blend: function (t) {
          if (1 === this._rgba[3]) return this;
          var e = this._rgba.slice(),
            i = e.pop(),
            n = U(t)._rgba;
          return U(
            R.map(e, function (t, e) {
              return (1 - i) * n[e] + i * t;
            })
          );
        },
        toRgbaString: function () {
          var t = "rgba(",
            e = R.map(this._rgba, function (t, e) {
              return null == t ? (2 < e ? 1 : 0) : t;
            });
          return 1 === e[3] && (e.pop(), (t = "rgb(")), t + e.join() + ")";
        },
        toHslaString: function () {
          var t = "hsla(",
            e = R.map(this.hsla(), function (t, e) {
              return (
                null == t && (t = 2 < e ? 1 : 0),
                e && e < 3 && (t = Math.round(100 * t) + "%"),
                t
              );
            });
          return 1 === e[3] && (e.pop(), (t = "hsl(")), t + e.join() + ")";
        },
        toHexString: function (t) {
          var e = this._rgba.slice(),
            i = e.pop();
          return (
            t && e.push(~~(255 * i)),
            "#" +
            R.map(e, function (t) {
              return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t;
            }).join("")
          );
        },
        toString: function () {
          return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
        },
      })),
      (U.fn.parse.prototype = U.fn),
      (Y.hsla.to = function (t) {
        if (null == t[0] || null == t[1] || null == t[2])
          return [null, null, null, t[3]];
        var e,
          i,
          n = t[0] / 255,
          s = t[1] / 255,
          o = t[2] / 255,
          r = t[3],
          a = Math.max(n, s, o),
          l = Math.min(n, s, o),
          h = a - l,
          c = a + l,
          u = 0.5 * c;
        return (
          (e =
            l === a
              ? 0
              : n === a
                ? (60 * (s - o)) / h + 360
                : s === a
                  ? (60 * (o - n)) / h + 120
                  : (60 * (n - s)) / h + 240),
          (i = 0 == h ? 0 : u <= 0.5 ? h / c : h / (2 - c)),
          [Math.round(e) % 360, i, u, null == r ? 1 : r]
        );
      }),
      (Y.hsla.from = function (t) {
        if (null == t[0] || null == t[1] || null == t[2])
          return [null, null, null, t[3]];
        var e = t[0] / 360,
          i = t[1],
          n = t[2],
          s = t[3],
          o = n <= 0.5 ? n * (1 + i) : n + i - n * i,
          r = 2 * n - o;
        return [
          Math.round(255 * at(r, o, e + 1 / 3)),
          Math.round(255 * at(r, o, e)),
          Math.round(255 * at(r, o, e - 1 / 3)),
          s,
        ];
      }),
      X(Y, function (l, t) {
        var i = t.props,
          r = t.cache,
          a = t.to,
          h = t.from;
        (U.fn[l] = function (t) {
          if ((a && !this[r] && (this[r] = a(this._rgba)), t === F))
            return this[r].slice();
          var e,
            n = R.type(t),
            s = "array" === n || "object" === n ? t : arguments,
            o = this[r].slice();
          return (
            X(i, function (t, e) {
              var i = s["object" === n ? t : e.idx];
              null == i && (i = o[e.idx]), (o[e.idx] = ot(i, e));
            }),
            h ? (((e = U(h(o)))[r] = o), e) : U(o)
          );
        }),
          X(i, function (r, a) {
            U.fn[r] ||
              (U.fn[r] = function (t) {
                var e,
                  i = R.type(t),
                  n = "alpha" === r ? (this._hsla ? "hsla" : "rgba") : l,
                  s = this[n](),
                  o = s[a.idx];
                return "undefined" === i
                  ? o
                  : ("function" === i &&
                    ((t = t.call(this, o)), (i = R.type(t))),
                    null == t && a.empty
                      ? this
                      : ("string" === i &&
                        (e = B.exec(t)) &&
                        (t = o + parseFloat(e[2]) * ("+" === e[1] ? 1 : -1)),
                        (s[a.idx] = t),
                        this[n](s)));
              });
          });
      }),
      (U.hook = function (t) {
        var e = t.split(" ");
        X(e, function (t, o) {
          (R.cssHooks[o] = {
            set: function (t, e) {
              var i,
                n,
                s = "";
              if (
                "transparent" !== e &&
                ("string" !== R.type(e) || (i = rt(e)))
              ) {
                if (((e = U(i || e)), !V.rgba && 1 !== e._rgba[3])) {
                  for (
                    n = "backgroundColor" === o ? t.parentNode : t;
                    ("" === s || "transparent" === s) && n && n.style;

                  )
                    try {
                      (s = R.css(n, "backgroundColor")), (n = n.parentNode);
                    } catch (t) { }
                  e = e.blend(s && "transparent" !== s ? s : "_default");
                }
                e = e.toRgbaString();
              }
              try {
                t.style[o] = e;
              } catch (t) { }
            },
          }),
            (R.fx.step[o] = function (t) {
              t.colorInit ||
                ((t.start = U(t.elem, o)),
                  (t.end = U(t.end)),
                  (t.colorInit = !0)),
                R.cssHooks[o].set(t.elem, t.start.transition(t.end, t.pos));
            });
        });
      }),
      U.hook(
        "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"
      ),
      (R.cssHooks.borderColor = {
        expand: function (i) {
          var n = {};
          return (
            X(["Top", "Right", "Bottom", "Left"], function (t, e) {
              n["border" + e + "Color"] = i;
            }),
            n
          );
        },
      }),
      (q = R.Color.names =
      {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff",
      }),
      (W = ["add", "remove", "toggle"]),
      (L = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1,
      }),
      C.each(
        [
          "borderLeftStyle",
          "borderRightStyle",
          "borderBottomStyle",
          "borderTopStyle",
        ],
        function (t, e) {
          C.fx.step[e] = function (t) {
            (("none" !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) &&
              (tt.style(t.elem, e, t.end), (t.setAttr = !0));
          };
        }
      ),
      C.fn.addBack ||
      (C.fn.addBack = function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      }),
      (C.effects.animateClass = function (s, t, e, i) {
        var o = C.speed(t, e, i);
        return this.queue(function () {
          var t,
            i = C(this),
            e = i.attr("class") || "",
            n = o.children ? i.find("*").addBack() : i;
          (n = n.map(function () {
            return { el: C(this), start: st(this) };
          })),
            (t = function () {
              C.each(W, function (t, e) {
                s[e] && i[e + "Class"](s[e]);
              });
            })(),
            (n = n.map(function () {
              return (
                (this.end = st(this.el[0])),
                (this.diff = (function (t, e) {
                  var i,
                    n,
                    s = {};
                  for (i in e)
                    (n = e[i]),
                      t[i] !== n &&
                      (L[i] ||
                        (!C.fx.step[i] && isNaN(parseFloat(n))) ||
                        (s[i] = n));
                  return s;
                })(this.start, this.end)),
                this
              );
            })),
            i.attr("class", e),
            (n = n.map(function () {
              var t = this,
                e = C.Deferred(),
                i = C.extend({}, o, {
                  queue: !1,
                  complete: function () {
                    e.resolve(t);
                  },
                });
              return this.el.animate(this.diff, i), e.promise();
            })),
            C.when.apply(C, n.get()).done(function () {
              t(),
                C.each(arguments, function () {
                  var e = this.el;
                  C.each(this.diff, function (t) {
                    e.css(t, "");
                  });
                }),
                o.complete.call(i[0]);
            });
        });
      }),
      C.fn.extend({
        addClass:
          ((z = C.fn.addClass),
            function (t, e, i, n) {
              return e
                ? C.effects.animateClass.call(this, { add: t }, e, i, n)
                : z.apply(this, arguments);
            }),
        removeClass:
          ((H = C.fn.removeClass),
            function (t, e, i, n) {
              return 1 < arguments.length
                ? C.effects.animateClass.call(this, { remove: t }, e, i, n)
                : H.apply(this, arguments);
            }),
        toggleClass:
          ((M = C.fn.toggleClass),
            function (t, e, i, n, s) {
              return "boolean" == typeof e || void 0 === e
                ? i
                  ? C.effects.animateClass.call(
                    this,
                    e ? { add: t } : { remove: t },
                    i,
                    n,
                    s
                  )
                  : M.apply(this, arguments)
                : C.effects.animateClass.call(this, { toggle: t }, e, i, n);
            }),
        switchClass: function (t, e, i, n, s) {
          return C.effects.animateClass.call(
            this,
            { add: e, remove: t },
            i,
            n,
            s
          );
        },
      }),
      C.expr &&
      C.expr.filters &&
      C.expr.filters.animated &&
      (C.expr.filters.animated =
        ((N = C.expr.filters.animated),
          function (t) {
            return !!C(t).data(Z) || N(t);
          })),
      !1 !== C.uiBackCompat &&
      C.extend(C.effects, {
        save: function (t, e) {
          for (var i = 0, n = e.length; i < n; i++)
            null !== e[i] && t.data(G + e[i], t[0].style[e[i]]);
        },
        restore: function (t, e) {
          for (var i, n = 0, s = e.length; n < s; n++)
            null !== e[n] && ((i = t.data(G + e[n])), t.css(e[n], i));
        },
        setMode: function (t, e) {
          return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
        },
        createWrapper: function (i) {
          if (i.parent().is(".ui-effects-wrapper")) return i.parent();
          var n = {
            width: i.outerWidth(!0),
            height: i.outerHeight(!0),
            float: i.css("float"),
          },
            t = C("<div></div>")
              .addClass("ui-effects-wrapper")
              .css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0,
              }),
            e = { width: i.width(), height: i.height() },
            s = document.activeElement;
          try {
            s.id;
          } catch (t) {
            s = document.body;
          }
          return (
            i.wrap(t),
            (i[0] !== s && !C.contains(i[0], s)) || C(s).trigger("focus"),
            (t = i.parent()),
            "static" === i.css("position")
              ? (t.css({ position: "relative" }),
                i.css({ position: "relative" }))
              : (C.extend(n, {
                position: i.css("position"),
                zIndex: i.css("z-index"),
              }),
                C.each(["top", "left", "bottom", "right"], function (t, e) {
                  (n[e] = i.css(e)),
                    isNaN(parseInt(n[e], 10)) && (n[e] = "auto");
                }),
                i.css({
                  position: "relative",
                  top: 0,
                  left: 0,
                  right: "auto",
                  bottom: "auto",
                })),
            i.css(e),
            t.css(n).show()
          );
        },
        removeWrapper: function (t) {
          var e = document.activeElement;
          return (
            t.parent().is(".ui-effects-wrapper") &&
            (t.parent().replaceWith(t),
              (t[0] !== e && !C.contains(t[0], e)) || C(e).trigger("focus")),
            t
          );
        },
      }),
      C.extend(C.effects, {
        version: "1.12.1",
        define: function (t, e, i) {
          return (
            i || ((i = e), (e = "effect")),
            (C.effects.effect[t] = i),
            (C.effects.effect[t].mode = e),
            i
          );
        },
        scaledDimensions: function (t, e, i) {
          if (0 === e)
            return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
          var n = "horizontal" !== i ? (e || 100) / 100 : 1,
            s = "vertical" !== i ? (e || 100) / 100 : 1;
          return {
            height: t.height() * s,
            width: t.width() * n,
            outerHeight: t.outerHeight() * s,
            outerWidth: t.outerWidth() * n,
          };
        },
        clipToBox: function (t) {
          return {
            width: t.clip.right - t.clip.left,
            height: t.clip.bottom - t.clip.top,
            left: t.clip.left,
            top: t.clip.top,
          };
        },
        unshift: function (t, e, i) {
          var n = t.queue();
          1 < e && n.splice.apply(n, [1, 0].concat(n.splice(e, i))),
            t.dequeue();
        },
        saveStyle: function (t) {
          t.data(J, t[0].style.cssText);
        },
        restoreStyle: function (t) {
          (t[0].style.cssText = t.data(J) || ""), t.removeData(J);
        },
        mode: function (t, e) {
          var i = t.is(":hidden");
          return (
            "toggle" === e && (e = i ? "show" : "hide"),
            (i ? "hide" === e : "show" === e) && (e = "none"),
            e
          );
        },
        getBaseline: function (t, e) {
          var i, n;
          switch (t[0]) {
            case "top":
              i = 0;
              break;
            case "middle":
              i = 0.5;
              break;
            case "bottom":
              i = 1;
              break;
            default:
              i = t[0] / e.height;
          }
          switch (t[1]) {
            case "left":
              n = 0;
              break;
            case "center":
              n = 0.5;
              break;
            case "right":
              n = 1;
              break;
            default:
              n = t[1] / e.width;
          }
          return { x: n, y: i };
        },
        createPlaceholder: function (t) {
          var e,
            i = t.css("position"),
            n = t.position();
          return (
            t
              .css({
                marginTop: t.css("marginTop"),
                marginBottom: t.css("marginBottom"),
                marginLeft: t.css("marginLeft"),
                marginRight: t.css("marginRight"),
              })
              .outerWidth(t.outerWidth())
              .outerHeight(t.outerHeight()),
            /^(static|relative)/.test(i) &&
            ((i = "absolute"),
              (e = C("<" + t[0].nodeName + ">")
                .insertAfter(t)
                .css({
                  display: /^(inline|ruby)/.test(t.css("display"))
                    ? "inline-block"
                    : "block",
                  visibility: "hidden",
                  marginTop: t.css("marginTop"),
                  marginBottom: t.css("marginBottom"),
                  marginLeft: t.css("marginLeft"),
                  marginRight: t.css("marginRight"),
                  float: t.css("float"),
                })
                .outerWidth(t.outerWidth())
                .outerHeight(t.outerHeight())
                .addClass("ui-effects-placeholder")),
              t.data(G + "placeholder", e)),
            t.css({ position: i, left: n.left, top: n.top }),
            e
          );
        },
        removePlaceholder: function (t) {
          var e = G + "placeholder",
            i = t.data(e);
          i && (i.remove(), t.removeData(e));
        },
        cleanUp: function (t) {
          C.effects.restoreStyle(t), C.effects.removePlaceholder(t);
        },
        setTransition: function (n, t, s, o) {
          return (
            (o = o || {}),
            C.each(t, function (t, e) {
              var i = n.cssUnit(e);
              0 < i[0] && (o[e] = i[0] * s + i[1]);
            }),
            o
          );
        },
      }),
      C.fn.extend({
        effect: function () {
          function t(t) {
            function e() {
              C.isFunction(a) && a.call(i[0]), C.isFunction(t) && t();
            }
            var i = C(this);
            (n.mode = h.shift()),
              !1 === C.uiBackCompat || o
                ? "none" === n.mode
                  ? (i[l](), e())
                  : s.call(i[0], n, function () {
                    i.removeData(Z),
                      C.effects.cleanUp(i),
                      "hide" === n.mode && i.hide(),
                      e();
                  })
                : (i.is(":hidden") ? "hide" === l : "show" === l)
                  ? (i[l](), e())
                  : s.call(i[0], n, e);
          }
          function e(t) {
            var e = C(this),
              i = C.effects.mode(e, l) || o;
            e.data(Z, !0),
              h.push(i),
              o && ("show" === i || (i === o && "hide" === i)) && e.show(),
              (o && "none" === i) || C.effects.saveStyle(e),
              C.isFunction(t) && t();
          }
          var n = et.apply(this, arguments),
            s = C.effects.effect[n.effect],
            o = s.mode,
            i = n.queue,
            r = i || "fx",
            a = n.complete,
            l = n.mode,
            h = [];
          return C.fx.off || !s
            ? l
              ? this[l](n.duration, a)
              : this.each(function () {
                a && a.call(this);
              })
            : !1 === i
              ? this.each(e).each(t)
              : this.queue(r, e).queue(r, t);
        },
        show:
          ((O = C.fn.show),
            function (t) {
              if (it(t)) return O.apply(this, arguments);
              var e = et.apply(this, arguments);
              return (e.mode = "show"), this.effect.call(this, e);
            }),
        hide:
          ((j = C.fn.hide),
            function (t) {
              if (it(t)) return j.apply(this, arguments);
              var e = et.apply(this, arguments);
              return (e.mode = "hide"), this.effect.call(this, e);
            }),
        toggle:
          ((P = C.fn.toggle),
            function (t) {
              if (it(t) || "boolean" == typeof t) return P.apply(this, arguments);
              var e = et.apply(this, arguments);
              return (e.mode = "toggle"), this.effect.call(this, e);
            }),
        cssUnit: function (t) {
          var i = this.css(t),
            n = [];
          return (
            C.each(["em", "px", "%", "pt"], function (t, e) {
              0 < i.indexOf(e) && (n = [parseFloat(i), e]);
            }),
            n
          );
        },
        cssClip: function (t) {
          return t
            ? this.css(
              "clip",
              "rect(" +
              t.top +
              "px " +
              t.right +
              "px " +
              t.bottom +
              "px " +
              t.left +
              "px)"
            )
            : nt(this.css("clip"), this);
        },
        transfer: function (t, e) {
          var i = C(this),
            n = C(t.to),
            s = "fixed" === n.css("position"),
            o = C("body"),
            r = s ? o.scrollTop() : 0,
            a = s ? o.scrollLeft() : 0,
            l = n.offset(),
            h = {
              top: l.top - r,
              left: l.left - a,
              height: n.innerHeight(),
              width: n.innerWidth(),
            },
            c = i.offset(),
            u = C("<div class='ui-effects-transfer'></div>")
              .appendTo("body")
              .addClass(t.className)
              .css({
                top: c.top - r,
                left: c.left - a,
                height: i.innerHeight(),
                width: i.innerWidth(),
                position: s ? "fixed" : "absolute",
              })
              .animate(h, t.duration, t.easing, function () {
                u.remove(), C.isFunction(e) && e();
              });
        },
      }),
      (C.fx.step.clip = function (t) {
        t.clipInit ||
          ((t.start = C(t.elem).cssClip()),
            "string" == typeof t.end && (t.end = nt(t.end, t.elem)),
            (t.clipInit = !0)),
          C(t.elem).cssClip({
            top: t.pos * (t.end.top - t.start.top) + t.start.top,
            right: t.pos * (t.end.right - t.start.right) + t.start.right,
            bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
            left: t.pos * (t.end.left - t.start.left) + t.start.left,
          });
      }),
      (A = {}),
      C.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, t) {
        A[t] = function (t) {
          return Math.pow(t, e + 2);
        };
      }),
      C.extend(A, {
        Sine: function (t) {
          return 1 - Math.cos((t * Math.PI) / 2);
        },
        Circ: function (t) {
          return 1 - Math.sqrt(1 - t * t);
        },
        Elastic: function (t) {
          return 0 === t || 1 === t
            ? t
            : -Math.pow(2, 8 * (t - 1)) *
            Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
        },
        Back: function (t) {
          return t * t * (3 * t - 2);
        },
        Bounce: function (t) {
          for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t;);
          return (
            1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
          );
        },
      }),
      C.each(A, function (t, e) {
        (C.easing["easeIn" + t] = e),
          (C.easing["easeOut" + t] = function (t) {
            return 1 - e(1 - t);
          }),
          (C.easing["easeInOut" + t] = function (t) {
            return t < 0.5 ? e(2 * t) / 2 : 1 - e(-2 * t + 2) / 2;
          });
      });
    C.effects;
    C.effects.define("blind", "hide", function (t, e) {
      var i = {
        up: ["bottom", "top"],
        vertical: ["bottom", "top"],
        down: ["top", "bottom"],
        left: ["right", "left"],
        horizontal: ["right", "left"],
        right: ["left", "right"],
      },
        n = C(this),
        s = t.direction || "up",
        o = n.cssClip(),
        r = { clip: C.extend({}, o) },
        a = C.effects.createPlaceholder(n);
      (r.clip[i[s][0]] = r.clip[i[s][1]]),
        "show" === t.mode &&
        (n.cssClip(r.clip), a && a.css(C.effects.clipToBox(r)), (r.clip = o)),
        a && a.animate(C.effects.clipToBox(r), t.duration, t.easing),
        n.animate(r, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: e,
        });
    }),
      C.effects.define("bounce", function (t, e) {
        var i,
          n,
          s,
          o = C(this),
          r = t.mode,
          a = "hide" === r,
          l = "show" === r,
          h = t.direction || "up",
          c = t.distance,
          u = t.times || 5,
          d = 2 * u + (l || a ? 1 : 0),
          p = t.duration / d,
          f = t.easing,
          g = "up" === h || "down" === h ? "top" : "left",
          m = "up" === h || "left" === h,
          v = 0,
          _ = o.queue().length;
        for (
          C.effects.createPlaceholder(o),
          s = o.css(g),
          c = c || o["top" == g ? "outerHeight" : "outerWidth"]() / 3,
          l &&
          (((n = { opacity: 1 })[g] = s),
            o
              .css("opacity", 0)
              .css(g, m ? 2 * -c : 2 * c)
              .animate(n, p, f)),
          a && (c /= Math.pow(2, u - 1)),
          (n = {})[g] = s;
          v < u;
          v++
        )
          ((i = {})[g] = (m ? "-=" : "+=") + c),
            o.animate(i, p, f).animate(n, p, f),
            (c = a ? 2 * c : c / 2);
        a &&
          (((i = { opacity: 0 })[g] = (m ? "-=" : "+=") + c),
            o.animate(i, p, f)),
          o.queue(e),
          C.effects.unshift(o, _, 1 + d);
      }),
      C.effects.define("clip", "hide", function (t, e) {
        var i,
          n = {},
          s = C(this),
          o = t.direction || "vertical",
          r = "both" === o,
          a = r || "horizontal" === o,
          l = r || "vertical" === o;
        (i = s.cssClip()),
          (n.clip = {
            top: l ? (i.bottom - i.top) / 2 : i.top,
            right: a ? (i.right - i.left) / 2 : i.right,
            bottom: l ? (i.bottom - i.top) / 2 : i.bottom,
            left: a ? (i.right - i.left) / 2 : i.left,
          }),
          C.effects.createPlaceholder(s),
          "show" === t.mode && (s.cssClip(n.clip), (n.clip = i)),
          s.animate(n, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e,
          });
      }),
      C.effects.define("drop", "hide", function (t, e) {
        var i,
          n = C(this),
          s = "show" === t.mode,
          o = t.direction || "left",
          r = "up" === o || "down" === o ? "top" : "left",
          a = "up" === o || "left" === o ? "-=" : "+=",
          l = "+=" == a ? "-=" : "+=",
          h = { opacity: 0 };
        C.effects.createPlaceholder(n),
          (i =
            t.distance || n["top" == r ? "outerHeight" : "outerWidth"](!0) / 2),
          (h[r] = a + i),
          s && (n.css(h), (h[r] = l + i), (h.opacity = 1)),
          n.animate(h, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e,
          });
      }),
      C.effects.define("explode", "hide", function (t, e) {
        function i() {
          m.push(this),
            m.length === h * c &&
            (u.css({ visibility: "visible" }), C(m).remove(), e());
        }
        var n,
          s,
          o,
          r,
          a,
          l,
          h = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
          c = h,
          u = C(this),
          d = "show" === t.mode,
          p = u.show().css("visibility", "hidden").offset(),
          f = Math.ceil(u.outerWidth() / c),
          g = Math.ceil(u.outerHeight() / h),
          m = [];
        for (n = 0; n < h; n++)
          for (r = p.top + n * g, l = n - (h - 1) / 2, s = 0; s < c; s++)
            (o = p.left + s * f),
              (a = s - (c - 1) / 2),
              u
                .clone()
                .appendTo("body")
                .wrap("<div></div>")
                .css({
                  position: "absolute",
                  visibility: "visible",
                  left: -s * f,
                  top: -n * g,
                })
                .parent()
                .addClass("ui-effects-explode")
                .css({
                  position: "absolute",
                  overflow: "hidden",
                  width: f,
                  height: g,
                  left: o + (d ? a * f : 0),
                  top: r + (d ? l * g : 0),
                  opacity: d ? 0 : 1,
                })
                .animate(
                  {
                    left: o + (d ? 0 : a * f),
                    top: r + (d ? 0 : l * g),
                    opacity: d ? 1 : 0,
                  },
                  t.duration || 500,
                  t.easing,
                  i
                );
      }),
      C.effects.define("fade", "toggle", function (t, e) {
        var i = "show" === t.mode;
        C(this)
          .css("opacity", i ? 0 : 1)
          .animate(
            { opacity: i ? 1 : 0 },
            { queue: !1, duration: t.duration, easing: t.easing, complete: e }
          );
      }),
      C.effects.define("fold", "hide", function (e, t) {
        var i = C(this),
          n = e.mode,
          s = "show" === n,
          o = "hide" === n,
          r = e.size || 15,
          a = /([0-9]+)%/.exec(r),
          l = !!e.horizFirst ? ["right", "bottom"] : ["bottom", "right"],
          h = e.duration / 2,
          c = C.effects.createPlaceholder(i),
          u = i.cssClip(),
          d = { clip: C.extend({}, u) },
          p = { clip: C.extend({}, u) },
          f = [u[l[0]], u[l[1]]],
          g = i.queue().length;
        a && (r = (parseInt(a[1], 10) / 100) * f[o ? 0 : 1]),
          (d.clip[l[0]] = r),
          (p.clip[l[0]] = r),
          (p.clip[l[1]] = 0),
          s &&
          (i.cssClip(p.clip),
            c && c.css(C.effects.clipToBox(p)),
            (p.clip = u)),
          i
            .queue(function (t) {
              c &&
                c
                  .animate(C.effects.clipToBox(d), h, e.easing)
                  .animate(C.effects.clipToBox(p), h, e.easing),
                t();
            })
            .animate(d, h, e.easing)
            .animate(p, h, e.easing)
            .queue(t),
          C.effects.unshift(i, g, 4);
      }),
      C.effects.define("highlight", "show", function (t, e) {
        var i = C(this),
          n = { backgroundColor: i.css("backgroundColor") };
        "hide" === t.mode && (n.opacity = 0),
          C.effects.saveStyle(i),
          i
            .css({
              backgroundImage: "none",
              backgroundColor: t.color || "#ffff99",
            })
            .animate(n, {
              queue: !1,
              duration: t.duration,
              easing: t.easing,
              complete: e,
            });
      }),
      C.effects.define("size", function (s, e) {
        var t,
          o,
          i,
          n = C(this),
          r = ["fontSize"],
          a = [
            "borderTopWidth",
            "borderBottomWidth",
            "paddingTop",
            "paddingBottom",
          ],
          l = [
            "borderLeftWidth",
            "borderRightWidth",
            "paddingLeft",
            "paddingRight",
          ],
          h = s.mode,
          c = "effect" !== h,
          u = s.scale || "both",
          d = s.origin || ["middle", "center"],
          p = n.css("position"),
          f = n.position(),
          g = C.effects.scaledDimensions(n),
          m = s.from || g,
          v = s.to || C.effects.scaledDimensions(n, 0);
        C.effects.createPlaceholder(n),
          "show" === h && ((i = m), (m = v), (v = i)),
          (o = {
            from: { y: m.height / g.height, x: m.width / g.width },
            to: { y: v.height / g.height, x: v.width / g.width },
          }),
          ("box" !== u && "both" !== u) ||
          (o.from.y !== o.to.y &&
            ((m = C.effects.setTransition(n, a, o.from.y, m)),
              (v = C.effects.setTransition(n, a, o.to.y, v))),
            o.from.x !== o.to.x &&
            ((m = C.effects.setTransition(n, l, o.from.x, m)),
              (v = C.effects.setTransition(n, l, o.to.x, v)))),
          ("content" !== u && "both" !== u) ||
          o.from.y === o.to.y ||
          ((m = C.effects.setTransition(n, r, o.from.y, m)),
            (v = C.effects.setTransition(n, r, o.to.y, v))),
          d &&
          ((t = C.effects.getBaseline(d, g)),
            (m.top = (g.outerHeight - m.outerHeight) * t.y + f.top),
            (m.left = (g.outerWidth - m.outerWidth) * t.x + f.left),
            (v.top = (g.outerHeight - v.outerHeight) * t.y + f.top),
            (v.left = (g.outerWidth - v.outerWidth) * t.x + f.left)),
          n.css(m),
          ("content" !== u && "both" !== u) ||
          ((a = a.concat(["marginTop", "marginBottom"]).concat(r)),
            (l = l.concat(["marginLeft", "marginRight"])),
            n.find("*[width]").each(function () {
              var t = C(this),
                e = C.effects.scaledDimensions(t),
                i = {
                  height: e.height * o.from.y,
                  width: e.width * o.from.x,
                  outerHeight: e.outerHeight * o.from.y,
                  outerWidth: e.outerWidth * o.from.x,
                },
                n = {
                  height: e.height * o.to.y,
                  width: e.width * o.to.x,
                  outerHeight: e.height * o.to.y,
                  outerWidth: e.width * o.to.x,
                };
              o.from.y !== o.to.y &&
                ((i = C.effects.setTransition(t, a, o.from.y, i)),
                  (n = C.effects.setTransition(t, a, o.to.y, n))),
                o.from.x !== o.to.x &&
                ((i = C.effects.setTransition(t, l, o.from.x, i)),
                  (n = C.effects.setTransition(t, l, o.to.x, n))),
                c && C.effects.saveStyle(t),
                t.css(i),
                t.animate(n, s.duration, s.easing, function () {
                  c && C.effects.restoreStyle(t);
                });
            })),
          n.animate(v, {
            queue: !1,
            duration: s.duration,
            easing: s.easing,
            complete: function () {
              var t = n.offset();
              0 === v.opacity && n.css("opacity", m.opacity),
                c ||
                (n.css("position", "static" === p ? "relative" : p).offset(t),
                  C.effects.saveStyle(n)),
                e();
            },
          });
      }),
      C.effects.define("scale", function (t, e) {
        var i = C(this),
          n = t.mode,
          s =
            parseInt(t.percent, 10) ||
            (0 === parseInt(t.percent, 10) ? 0 : "effect" !== n ? 0 : 100),
          o = C.extend(
            !0,
            {
              from: C.effects.scaledDimensions(i),
              to: C.effects.scaledDimensions(i, s, t.direction || "both"),
              origin: t.origin || ["middle", "center"],
            },
            t
          );
        t.fade && ((o.from.opacity = 1), (o.to.opacity = 0)),
          C.effects.effect.size.call(this, o, e);
      }),
      C.effects.define("puff", "hide", function (t, e) {
        var i = C.extend(!0, {}, t, {
          fade: !0,
          percent: parseInt(t.percent, 10) || 150,
        });
        C.effects.effect.scale.call(this, i, e);
      }),
      C.effects.define("pulsate", "show", function (t, e) {
        var i = C(this),
          n = t.mode,
          s = "show" === n,
          o = s || "hide" === n,
          r = 2 * (t.times || 5) + (o ? 1 : 0),
          a = t.duration / r,
          l = 0,
          h = 1,
          c = i.queue().length;
        for (
          (!s && i.is(":visible")) || (i.css("opacity", 0).show(), (l = 1));
          h < r;
          h++
        )
          i.animate({ opacity: l }, a, t.easing), (l = 1 - l);
        i.animate({ opacity: l }, a, t.easing),
          i.queue(e),
          C.effects.unshift(i, c, 1 + r);
      }),
      C.effects.define("shake", function (t, e) {
        var i = 1,
          n = C(this),
          s = t.direction || "left",
          o = t.distance || 20,
          r = t.times || 3,
          a = 2 * r + 1,
          l = Math.round(t.duration / a),
          h = "up" === s || "down" === s ? "top" : "left",
          c = "up" === s || "left" === s,
          u = {},
          d = {},
          p = {},
          f = n.queue().length;
        for (
          C.effects.createPlaceholder(n),
          u[h] = (c ? "-=" : "+=") + o,
          d[h] = (c ? "+=" : "-=") + 2 * o,
          p[h] = (c ? "-=" : "+=") + 2 * o,
          n.animate(u, l, t.easing);
          i < r;
          i++
        )
          n.animate(d, l, t.easing).animate(p, l, t.easing);
        n
          .animate(d, l, t.easing)
          .animate(u, l / 2, t.easing)
          .queue(e),
          C.effects.unshift(n, f, 1 + a);
      }),
      C.effects.define("slide", "show", function (t, e) {
        var i,
          n,
          s = C(this),
          o = {
            up: ["bottom", "top"],
            down: ["top", "bottom"],
            left: ["right", "left"],
            right: ["left", "right"],
          },
          r = t.mode,
          a = t.direction || "left",
          l = "up" === a || "down" === a ? "top" : "left",
          h = "up" === a || "left" === a,
          c = t.distance || s["top" == l ? "outerHeight" : "outerWidth"](!0),
          u = {};
        C.effects.createPlaceholder(s),
          (i = s.cssClip()),
          (n = s.position()[l]),
          (u[l] = (h ? -1 : 1) * c + n),
          (u.clip = s.cssClip()),
          (u.clip[o[a][1]] = u.clip[o[a][0]]),
          "show" === r &&
          (s.cssClip(u.clip), s.css(l, u[l]), (u.clip = i), (u[l] = n)),
          s.animate(u, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e,
          });
      }),
      !1 !== C.uiBackCompat &&
      C.effects.define("transfer", function (t, e) {
        C(this).transfer(t, e);
      });
  }),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(exports, require("popper.js"), require("jquery"))
      : "function" == typeof define && define.amd
        ? define(["exports", "popper.js", "jquery"], e)
        : e((t.bootstrap = {}), t.Popper, t.jQuery);
  })(this, function (t, u, f) {
    "use strict";
    function n(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    function o(t, e, i) {
      return e && n(t.prototype, e), i && n(t, i), t;
    }
    function r(s) {
      for (var t = 1; t < arguments.length; t++) {
        var o = null != arguments[t] ? arguments[t] : {},
          e = Object.keys(o);
        "function" == typeof Object.getOwnPropertySymbols &&
          (e = e.concat(
            Object.getOwnPropertySymbols(o).filter(function (t) {
              return Object.getOwnPropertyDescriptor(o, t).enumerable;
            })
          )),
          e.forEach(function (t) {
            var e, i, n;
            (e = s),
              (n = o[(i = t)]),
              i in e
                ? Object.defineProperty(e, i, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
                : (e[i] = n);
          });
      }
      return s;
    }
    (u = u && u.hasOwnProperty("default") ? u.default : u),
      (f = f && f.hasOwnProperty("default") ? f.default : f);
    var e = "transitionend";
    var g = {
      TRANSITION_END: "bsTransitionEnd",
      getUID: function (t) {
        for (; (t += ~~(1e6 * Math.random())), document.getElementById(t););
        return t;
      },
      getSelectorFromElement: function (t) {
        var e = t.getAttribute("data-target");
        if (!e || "#" === e) {
          var i = t.getAttribute("href");
          e = i && "#" !== i ? i.trim() : "";
        }
        return e && document.querySelector(e) ? e : null;
      },
      getTransitionDurationFromElement: function (t) {
        if (!t) return 0;
        var e = f(t).css("transition-duration"),
          i = f(t).css("transition-delay"),
          n = parseFloat(e),
          s = parseFloat(i);
        return n || s
          ? ((e = e.split(",")[0]),
            (i = i.split(",")[0]),
            1e3 * (parseFloat(e) + parseFloat(i)))
          : 0;
      },
      reflow: function (t) {
        return t.offsetHeight;
      },
      triggerTransitionEnd: function (t) {
        f(t).trigger(e);
      },
      supportsTransitionEnd: function () {
        return Boolean(e);
      },
      isElement: function (t) {
        return (t[0] || t).nodeType;
      },
      typeCheckConfig: function (t, e, i) {
        for (var n in i)
          if (Object.prototype.hasOwnProperty.call(i, n)) {
            var s = i[n],
              o = e[n],
              r =
                o && g.isElement(o)
                  ? "element"
                  : ((a = o),
                    {}.toString
                      .call(a)
                      .match(/\s([a-z]+)/i)[1]
                      .toLowerCase());
            if (!new RegExp(s).test(r))
              throw new Error(
                t.toUpperCase() +
                ': Option "' +
                n +
                '" provided type "' +
                r +
                '" but expected type "' +
                s +
                '".'
              );
          }
        var a;
      },
      findShadowRoot: function (t) {
        if (!document.documentElement.attachShadow) return null;
        if ("function" != typeof t.getRootNode)
          return t instanceof ShadowRoot
            ? t
            : t.parentNode
              ? g.findShadowRoot(t.parentNode)
              : null;
        var e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      },
    };
    (f.fn.emulateTransitionEnd = function (t) {
      var e = this,
        i = !1;
      return (
        f(this).one(g.TRANSITION_END, function () {
          i = !0;
        }),
        setTimeout(function () {
          i || g.triggerTransitionEnd(e);
        }, t),
        this
      );
    }),
      (f.event.special[g.TRANSITION_END] = {
        bindType: e,
        delegateType: e,
        handle: function (t) {
          if (f(t.target).is(this))
            return t.handleObj.handler.apply(this, arguments);
        },
      });
    var i,
      s = "alert",
      a = "bs.alert",
      l = "." + a,
      h = f.fn[s],
      c = {
        CLOSE: "close" + l,
        CLOSED: "closed" + l,
        CLICK_DATA_API: "click" + l + ".data-api",
      },
      d =
        (((i = p.prototype).close = function (t) {
          var e = this._element;
          t && (e = this._getRootElement(t)),
            this._triggerCloseEvent(e).isDefaultPrevented() ||
            this._removeElement(e);
        }),
          (i.dispose = function () {
            f.removeData(this._element, a), (this._element = null);
          }),
          (i._getRootElement = function (t) {
            var e = g.getSelectorFromElement(t),
              i = !1;
            return (
              e && (i = document.querySelector(e)),
              (i = i || f(t).closest(".alert")[0])
            );
          }),
          (i._triggerCloseEvent = function (t) {
            var e = f.Event(c.CLOSE);
            return f(t).trigger(e), e;
          }),
          (i._removeElement = function (e) {
            var i = this;
            if ((f(e).removeClass("show"), f(e).hasClass("fade"))) {
              var t = g.getTransitionDurationFromElement(e);
              f(e)
                .one(g.TRANSITION_END, function (t) {
                  return i._destroyElement(e, t);
                })
                .emulateTransitionEnd(t);
            } else this._destroyElement(e);
          }),
          (i._destroyElement = function (t) {
            f(t).detach().trigger(c.CLOSED).remove();
          }),
          (p._jQueryInterface = function (i) {
            return this.each(function () {
              var t = f(this),
                e = t.data(a);
              e || ((e = new p(this)), t.data(a, e)), "close" === i && e[i](this);
            });
          }),
          (p._handleDismiss = function (e) {
            return function (t) {
              t && t.preventDefault(), e.close(this);
            };
          }),
          o(p, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
          ]),
          p);
    function p(t) {
      this._element = t;
    }
    f(document).on(
      c.CLICK_DATA_API,
      '[data-dismiss="alert"]',
      d._handleDismiss(new d())
    ),
      (f.fn[s] = d._jQueryInterface),
      (f.fn[s].Constructor = d),
      (f.fn[s].noConflict = function () {
        return (f.fn[s] = h), d._jQueryInterface;
      });
    var m,
      v = "button",
      _ = "bs.button",
      y = "." + _,
      b = ".data-api",
      w = f.fn[v],
      x = "active",
      C = '[data-toggle^="button"]',
      k = {
        CLICK_DATA_API: "click" + y + b,
        FOCUS_BLUR_DATA_API: "focus" + y + b + " blur" + y + b,
      },
      D =
        (((m = T.prototype).toggle = function () {
          var t = !0,
            e = !0,
            i = f(this._element).closest('[data-toggle="buttons"]')[0];
          if (i) {
            var n = this._element.querySelector('input:not([type="hidden"])');
            if (n) {
              if ("radio" === n.type)
                if (n.checked && this._element.classList.contains(x)) t = !1;
                else {
                  var s = i.querySelector(".active");
                  s && f(s).removeClass(x);
                }
              if (t) {
                if (
                  n.hasAttribute("disabled") ||
                  i.hasAttribute("disabled") ||
                  n.classList.contains("disabled") ||
                  i.classList.contains("disabled")
                )
                  return;
                (n.checked = !this._element.classList.contains(x)),
                  f(n).trigger("change");
              }
              n.focus(), (e = !1);
            }
          }
          e &&
            this._element.setAttribute(
              "aria-pressed",
              !this._element.classList.contains(x)
            ),
            t && f(this._element).toggleClass(x);
        }),
          (m.dispose = function () {
            f.removeData(this._element, _), (this._element = null);
          }),
          (T._jQueryInterface = function (e) {
            return this.each(function () {
              var t = f(this).data(_);
              t || ((t = new T(this)), f(this).data(_, t)),
                "toggle" === e && t[e]();
            });
          }),
          o(T, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
          ]),
          T);
    function T(t) {
      this._element = t;
    }
    f(document)
      .on(k.CLICK_DATA_API, C, function (t) {
        t.preventDefault();
        var e = t.target;
        f(e).hasClass("btn") || (e = f(e).closest(".btn")),
          D._jQueryInterface.call(f(e), "toggle");
      })
      .on(k.FOCUS_BLUR_DATA_API, C, function (t) {
        var e = f(t.target).closest(".btn")[0];
        f(e).toggleClass("focus", /^focus(in)?$/.test(t.type));
      }),
      (f.fn[v] = D._jQueryInterface),
      (f.fn[v].Constructor = D),
      (f.fn[v].noConflict = function () {
        return (f.fn[v] = w), D._jQueryInterface;
      });
    var I,
      S = "carousel",
      E = "bs.carousel",
      A = "." + E,
      P = f.fn[S],
      j = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
        touch: !0,
      },
      O = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
        touch: "boolean",
      },
      N = "next",
      M = "prev",
      H = {
        SLIDE: "slide" + A,
        SLID: "slid" + A,
        KEYDOWN: "keydown" + A,
        MOUSEENTER: "mouseenter" + A,
        MOUSELEAVE: "mouseleave" + A,
        TOUCHSTART: "touchstart" + A,
        TOUCHMOVE: "touchmove" + A,
        TOUCHEND: "touchend" + A,
        POINTERDOWN: "pointerdown" + A,
        POINTERUP: "pointerup" + A,
        DRAG_START: "dragstart" + A,
        LOAD_DATA_API: "load" + A + ".data-api",
        CLICK_DATA_API: "click" + A + ".data-api",
      },
      z = "active",
      W = ".active.carousel-item",
      L = { TOUCH: "touch", PEN: "pen" },
      R =
        (((I = F.prototype).next = function () {
          this._isSliding || this._slide(N);
        }),
          (I.nextWhenVisible = function () {
            !document.hidden &&
              f(this._element).is(":visible") &&
              "hidden" !== f(this._element).css("visibility") &&
              this.next();
          }),
          (I.prev = function () {
            this._isSliding || this._slide(M);
          }),
          (I.pause = function (t) {
            t || (this._isPaused = !0),
              this._element.querySelector(
                ".carousel-item-next, .carousel-item-prev"
              ) && (g.triggerTransitionEnd(this._element), this.cycle(!0)),
              clearInterval(this._interval),
              (this._interval = null);
          }),
          (I.cycle = function (t) {
            t || (this._isPaused = !1),
              this._interval &&
              (clearInterval(this._interval), (this._interval = null)),
              this._config.interval &&
              !this._isPaused &&
              (this._interval = setInterval(
                (document.visibilityState
                  ? this.nextWhenVisible
                  : this.next
                ).bind(this),
                this._config.interval
              ));
          }),
          (I.to = function (t) {
            var e = this;
            this._activeElement = this._element.querySelector(W);
            var i = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0))
              if (this._isSliding)
                f(this._element).one(H.SLID, function () {
                  return e.to(t);
                });
              else {
                if (i === t) return this.pause(), void this.cycle();
                var n = i < t ? N : M;
                this._slide(n, this._items[t]);
              }
          }),
          (I.dispose = function () {
            f(this._element).off(A),
              f.removeData(this._element, E),
              (this._items = null),
              (this._config = null),
              (this._element = null),
              (this._interval = null),
              (this._isPaused = null),
              (this._isSliding = null),
              (this._activeElement = null),
              (this._indicatorsElement = null);
          }),
          (I._getConfig = function (t) {
            return (t = r({}, j, t)), g.typeCheckConfig(S, t, O), t;
          }),
          (I._handleSwipe = function () {
            var t = Math.abs(this.touchDeltaX);
            if (!(t <= 40)) {
              var e = t / this.touchDeltaX;
              0 < e && this.prev(), e < 0 && this.next();
            }
          }),
          (I._addEventListeners = function () {
            var e = this;
            this._config.keyboard &&
              f(this._element).on(H.KEYDOWN, function (t) {
                return e._keydown(t);
              }),
              "hover" === this._config.pause &&
              f(this._element)
                .on(H.MOUSEENTER, function (t) {
                  return e.pause(t);
                })
                .on(H.MOUSELEAVE, function (t) {
                  return e.cycle(t);
                }),
              this._addTouchEventListeners();
          }),
          (I._addTouchEventListeners = function () {
            var i = this;
            if (this._touchSupported) {
              var e = function (t) {
                i._pointerEvent && L[t.originalEvent.pointerType.toUpperCase()]
                  ? (i.touchStartX = t.originalEvent.clientX)
                  : i._pointerEvent ||
                  (i.touchStartX = t.originalEvent.touches[0].clientX);
              },
                n = function (t) {
                  i._pointerEvent &&
                    L[t.originalEvent.pointerType.toUpperCase()] &&
                    (i.touchDeltaX = t.originalEvent.clientX - i.touchStartX),
                    i._handleSwipe(),
                    "hover" === i._config.pause &&
                    (i.pause(),
                      i.touchTimeout && clearTimeout(i.touchTimeout),
                      (i.touchTimeout = setTimeout(function (t) {
                        return i.cycle(t);
                      }, 500 + i._config.interval)));
                };
              f(this._element.querySelectorAll(".carousel-item img")).on(
                H.DRAG_START,
                function (t) {
                  return t.preventDefault();
                }
              ),
                this._pointerEvent
                  ? (f(this._element).on(H.POINTERDOWN, function (t) {
                    return e(t);
                  }),
                    f(this._element).on(H.POINTERUP, function (t) {
                      return n(t);
                    }),
                    this._element.classList.add("pointer-event"))
                  : (f(this._element).on(H.TOUCHSTART, function (t) {
                    return e(t);
                  }),
                    f(this._element).on(H.TOUCHMOVE, function (t) {
                      var e;
                      (e = t).originalEvent.touches &&
                        1 < e.originalEvent.touches.length
                        ? (i.touchDeltaX = 0)
                        : (i.touchDeltaX =
                          e.originalEvent.touches[0].clientX - i.touchStartX);
                    }),
                    f(this._element).on(H.TOUCHEND, function (t) {
                      return n(t);
                    }));
            }
          }),
          (I._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName))
              switch (t.which) {
                case 37:
                  t.preventDefault(), this.prev();
                  break;
                case 39:
                  t.preventDefault(), this.next();
              }
          }),
          (I._getItemIndex = function (t) {
            return (
              (this._items =
                t && t.parentNode
                  ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item"))
                  : []),
              this._items.indexOf(t)
            );
          }),
          (I._getItemByDirection = function (t, e) {
            var i = t === N,
              n = t === M,
              s = this._getItemIndex(e),
              o = this._items.length - 1;
            if (((n && 0 === s) || (i && s === o)) && !this._config.wrap)
              return e;
            var r = (s + (t === M ? -1 : 1)) % this._items.length;
            return -1 == r ? this._items[this._items.length - 1] : this._items[r];
          }),
          (I._triggerSlideEvent = function (t, e) {
            var i = this._getItemIndex(t),
              n = this._getItemIndex(this._element.querySelector(W)),
              s = f.Event(H.SLIDE, {
                relatedTarget: t,
                direction: e,
                from: n,
                to: i,
              });
            return f(this._element).trigger(s), s;
          }),
          (I._setActiveIndicatorElement = function (t) {
            if (this._indicatorsElement) {
              var e = [].slice.call(
                this._indicatorsElement.querySelectorAll(".active")
              );
              f(e).removeClass(z);
              var i = this._indicatorsElement.children[this._getItemIndex(t)];
              i && f(i).addClass(z);
            }
          }),
          (I._slide = function (t, e) {
            var i,
              n,
              s,
              o = this,
              r = this._element.querySelector(W),
              a = this._getItemIndex(r),
              l = e || (r && this._getItemByDirection(t, r)),
              h = this._getItemIndex(l),
              c = Boolean(this._interval);
            if (
              ((s =
                t === N
                  ? ((i = "carousel-item-left"),
                    (n = "carousel-item-next"),
                    "left")
                  : ((i = "carousel-item-right"),
                    (n = "carousel-item-prev"),
                    "right")),
                l && f(l).hasClass(z))
            )
              this._isSliding = !1;
            else if (
              !this._triggerSlideEvent(l, s).isDefaultPrevented() &&
              r &&
              l
            ) {
              (this._isSliding = !0),
                c && this.pause(),
                this._setActiveIndicatorElement(l);
              var u = f.Event(H.SLID, {
                relatedTarget: l,
                direction: s,
                from: a,
                to: h,
              });
              if (f(this._element).hasClass("slide")) {
                f(l).addClass(n), g.reflow(l), f(r).addClass(i), f(l).addClass(i);
                var d = parseInt(l.getAttribute("data-interval"), 10);
                this._config.interval = d
                  ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                    d)
                  : this._config.defaultInterval || this._config.interval;
                var p = g.getTransitionDurationFromElement(r);
                f(r)
                  .one(g.TRANSITION_END, function () {
                    f(l)
                      .removeClass(i + " " + n)
                      .addClass(z),
                      f(r).removeClass(z + " " + n + " " + i),
                      (o._isSliding = !1),
                      setTimeout(function () {
                        return f(o._element).trigger(u);
                      }, 0);
                  })
                  .emulateTransitionEnd(p);
              } else
                f(r).removeClass(z),
                  f(l).addClass(z),
                  (this._isSliding = !1),
                  f(this._element).trigger(u);
              c && this.cycle();
            }
          }),
          (F._jQueryInterface = function (n) {
            return this.each(function () {
              var t = f(this).data(E),
                e = r({}, j, f(this).data());
              "object" == typeof n && (e = r({}, e, n));
              var i = "string" == typeof n ? n : e.slide;
              if (
                (t || ((t = new F(this, e)), f(this).data(E, t)),
                  "number" == typeof n)
              )
                t.to(n);
              else if ("string" == typeof i) {
                if (void 0 === t[i])
                  throw new TypeError('No method named "' + i + '"');
                t[i]();
              } else e.interval && (t.pause(), t.cycle());
            });
          }),
          (F._dataApiClickHandler = function (t) {
            var e = g.getSelectorFromElement(this);
            if (e) {
              var i = f(e)[0];
              if (i && f(i).hasClass("carousel")) {
                var n = r({}, f(i).data(), f(this).data()),
                  s = this.getAttribute("data-slide-to");
                s && (n.interval = !1),
                  F._jQueryInterface.call(f(i), n),
                  s && f(i).data(E).to(s),
                  t.preventDefault();
              }
            }
          }),
          o(F, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return j;
              },
            },
          ]),
          F);
    function F(t, e) {
      (this._items = null),
        (this._interval = null),
        (this._activeElement = null),
        (this._isPaused = !1),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this.touchStartX = 0),
        (this.touchDeltaX = 0),
        (this._config = this._getConfig(e)),
        (this._element = t),
        (this._indicatorsElement = this._element.querySelector(
          ".carousel-indicators"
        )),
        (this._touchSupported =
          "ontouchstart" in document.documentElement ||
          0 < navigator.maxTouchPoints),
        (this._pointerEvent = Boolean(
          window.PointerEvent || window.MSPointerEvent
        )),
        this._addEventListeners();
    }
    f(document).on(
      H.CLICK_DATA_API,
      "[data-slide], [data-slide-to]",
      R._dataApiClickHandler
    ),
      f(window).on(H.LOAD_DATA_API, function () {
        for (
          var t = [].slice.call(
            document.querySelectorAll('[data-ride="carousel"]')
          ),
          e = 0,
          i = t.length;
          e < i;
          e++
        ) {
          var n = f(t[e]);
          R._jQueryInterface.call(n, n.data());
        }
      }),
      (f.fn[S] = R._jQueryInterface),
      (f.fn[S].Constructor = R),
      (f.fn[S].noConflict = function () {
        return (f.fn[S] = P), R._jQueryInterface;
      });
    var q,
      B = "collapse",
      $ = "bs.collapse",
      U = "." + $,
      Y = f.fn[B],
      K = { toggle: !0, parent: "" },
      V = { toggle: "boolean", parent: "(string|element)" },
      Q = {
        SHOW: "show" + U,
        SHOWN: "shown" + U,
        HIDE: "hide" + U,
        HIDDEN: "hidden" + U,
        CLICK_DATA_API: "click" + U + ".data-api",
      },
      X = "show",
      G = "collapse",
      J = "collapsing",
      Z = "collapsed",
      tt = '[data-toggle="collapse"]',
      et =
        (((q = it.prototype).toggle = function () {
          f(this._element).hasClass(X) ? this.hide() : this.show();
        }),
          (q.show = function () {
            var t,
              e,
              i = this;
            if (
              !(
                this._isTransitioning ||
                f(this._element).hasClass(X) ||
                (this._parent &&
                  0 ===
                  (t = [].slice
                    .call(this._parent.querySelectorAll(".show, .collapsing"))
                    .filter(function (t) {
                      return "string" == typeof i._config.parent
                        ? t.getAttribute("data-parent") === i._config.parent
                        : t.classList.contains(G);
                    })).length &&
                  (t = null),
                  t && (e = f(t).not(this._selector).data($)) && e._isTransitioning)
              )
            ) {
              var n = f.Event(Q.SHOW);
              if ((f(this._element).trigger(n), !n.isDefaultPrevented())) {
                t &&
                  (it._jQueryInterface.call(f(t).not(this._selector), "hide"),
                    e || f(t).data($, null));
                var s = this._getDimension();
                f(this._element).removeClass(G).addClass(J),
                  (this._element.style[s] = 0),
                  this._triggerArray.length &&
                  f(this._triggerArray)
                    .removeClass(Z)
                    .attr("aria-expanded", !0),
                  this.setTransitioning(!0);
                var o = "scroll" + (s[0].toUpperCase() + s.slice(1)),
                  r = g.getTransitionDurationFromElement(this._element);
                f(this._element)
                  .one(g.TRANSITION_END, function () {
                    f(i._element).removeClass(J).addClass(G).addClass(X),
                      (i._element.style[s] = ""),
                      i.setTransitioning(!1),
                      f(i._element).trigger(Q.SHOWN);
                  })
                  .emulateTransitionEnd(r),
                  (this._element.style[s] = this._element[o] + "px");
              }
            }
          }),
          (q.hide = function () {
            var t = this;
            if (!this._isTransitioning && f(this._element).hasClass(X)) {
              var e = f.Event(Q.HIDE);
              if ((f(this._element).trigger(e), !e.isDefaultPrevented())) {
                var i = this._getDimension();
                (this._element.style[i] =
                  this._element.getBoundingClientRect()[i] + "px"),
                  g.reflow(this._element),
                  f(this._element).addClass(J).removeClass(G).removeClass(X);
                var n = this._triggerArray.length;
                if (0 < n)
                  for (var s = 0; s < n; s++) {
                    var o = this._triggerArray[s],
                      r = g.getSelectorFromElement(o);
                    null !== r &&
                      (f([].slice.call(document.querySelectorAll(r))).hasClass(
                        X
                      ) ||
                        f(o).addClass(Z).attr("aria-expanded", !1));
                  }
                this.setTransitioning(!0), (this._element.style[i] = "");
                var a = g.getTransitionDurationFromElement(this._element);
                f(this._element)
                  .one(g.TRANSITION_END, function () {
                    t.setTransitioning(!1),
                      f(t._element).removeClass(J).addClass(G).trigger(Q.HIDDEN);
                  })
                  .emulateTransitionEnd(a);
              }
            }
          }),
          (q.setTransitioning = function (t) {
            this._isTransitioning = t;
          }),
          (q.dispose = function () {
            f.removeData(this._element, $),
              (this._config = null),
              (this._parent = null),
              (this._element = null),
              (this._triggerArray = null),
              (this._isTransitioning = null);
          }),
          (q._getConfig = function (t) {
            return (
              ((t = r({}, K, t)).toggle = Boolean(t.toggle)),
              g.typeCheckConfig(B, t, V),
              t
            );
          }),
          (q._getDimension = function () {
            return f(this._element).hasClass("width") ? "width" : "height";
          }),
          (q._getParent = function () {
            var t,
              i = this;
            g.isElement(this._config.parent)
              ? ((t = this._config.parent),
                void 0 !== this._config.parent.jquery &&
                (t = this._config.parent[0]))
              : (t = document.querySelector(this._config.parent));
            var e =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]',
              n = [].slice.call(t.querySelectorAll(e));
            return (
              f(n).each(function (t, e) {
                i._addAriaAndCollapsedClass(it._getTargetFromElement(e), [e]);
              }),
              t
            );
          }),
          (q._addAriaAndCollapsedClass = function (t, e) {
            var i = f(t).hasClass(X);
            e.length && f(e).toggleClass(Z, !i).attr("aria-expanded", i);
          }),
          (it._getTargetFromElement = function (t) {
            var e = g.getSelectorFromElement(t);
            return e ? document.querySelector(e) : null;
          }),
          (it._jQueryInterface = function (n) {
            return this.each(function () {
              var t = f(this),
                e = t.data($),
                i = r({}, K, t.data(), "object" == typeof n && n ? n : {});
              if (
                (!e && i.toggle && /show|hide/.test(n) && (i.toggle = !1),
                  e || ((e = new it(this, i)), t.data($, e)),
                  "string" == typeof n)
              ) {
                if (void 0 === e[n])
                  throw new TypeError('No method named "' + n + '"');
                e[n]();
              }
            });
          }),
          o(it, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return K;
              },
            },
          ]),
          it);
    function it(e, t) {
      (this._isTransitioning = !1),
        (this._element = e),
        (this._config = this._getConfig(t)),
        (this._triggerArray = [].slice.call(
          document.querySelectorAll(
            '[data-toggle="collapse"][href="#' +
            e.id +
            '"],[data-toggle="collapse"][data-target="#' +
            e.id +
            '"]'
          )
        ));
      for (
        var i = [].slice.call(document.querySelectorAll(tt)),
        n = 0,
        s = i.length;
        n < s;
        n++
      ) {
        var o = i[n],
          r = g.getSelectorFromElement(o),
          a = [].slice.call(document.querySelectorAll(r)).filter(function (t) {
            return t === e;
          });
        null !== r &&
          0 < a.length &&
          ((this._selector = r), this._triggerArray.push(o));
      }
      (this._parent = this._config.parent ? this._getParent() : null),
        this._config.parent ||
        this._addAriaAndCollapsedClass(this._element, this._triggerArray),
        this._config.toggle && this.toggle();
    }
    f(document).on(Q.CLICK_DATA_API, tt, function (t) {
      "A" === t.currentTarget.tagName && t.preventDefault();
      var i = f(this),
        e = g.getSelectorFromElement(this),
        n = [].slice.call(document.querySelectorAll(e));
      f(n).each(function () {
        var t = f(this),
          e = t.data($) ? "toggle" : i.data();
        et._jQueryInterface.call(t, e);
      });
    }),
      (f.fn[B] = et._jQueryInterface),
      (f.fn[B].Constructor = et),
      (f.fn[B].noConflict = function () {
        return (f.fn[B] = Y), et._jQueryInterface;
      });
    var nt,
      st = "dropdown",
      ot = "bs.dropdown",
      rt = "." + ot,
      at = ".data-api",
      lt = f.fn[st],
      ht = new RegExp("38|40|27"),
      ct = {
        HIDE: "hide" + rt,
        HIDDEN: "hidden" + rt,
        SHOW: "show" + rt,
        SHOWN: "shown" + rt,
        CLICK: "click" + rt,
        CLICK_DATA_API: "click" + rt + at,
        KEYDOWN_DATA_API: "keydown" + rt + at,
        KEYUP_DATA_API: "keyup" + rt + at,
      },
      ut = "disabled",
      dt = "show",
      pt = "dropdown-menu-right",
      ft = '[data-toggle="dropdown"]',
      gt = ".dropdown-menu",
      mt = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
      },
      vt = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
      },
      _t =
        (((nt = yt.prototype).toggle = function () {
          if (!this._element.disabled && !f(this._element).hasClass(ut)) {
            var t = yt._getParentFromElement(this._element),
              e = f(this._menu).hasClass(dt);
            if ((yt._clearMenus(), !e)) {
              var i = { relatedTarget: this._element },
                n = f.Event(ct.SHOW, i);
              if ((f(t).trigger(n), !n.isDefaultPrevented())) {
                if (!this._inNavbar) {
                  if (void 0 === u)
                    throw new TypeError(
                      "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                    );
                  var s = this._element;
                  "parent" === this._config.reference
                    ? (s = t)
                    : g.isElement(this._config.reference) &&
                    ((s = this._config.reference),
                      void 0 !== this._config.reference.jquery &&
                      (s = this._config.reference[0])),
                    "scrollParent" !== this._config.boundary &&
                    f(t).addClass("position-static"),
                    (this._popper = new u(
                      s,
                      this._menu,
                      this._getPopperConfig()
                    ));
                }
                "ontouchstart" in document.documentElement &&
                  0 === f(t).closest(".navbar-nav").length &&
                  f(document.body).children().on("mouseover", null, f.noop),
                  this._element.focus(),
                  this._element.setAttribute("aria-expanded", !0),
                  f(this._menu).toggleClass(dt),
                  f(t).toggleClass(dt).trigger(f.Event(ct.SHOWN, i));
              }
            }
          }
        }),
          (nt.show = function () {
            if (
              !(
                this._element.disabled ||
                f(this._element).hasClass(ut) ||
                f(this._menu).hasClass(dt)
              )
            ) {
              var t = { relatedTarget: this._element },
                e = f.Event(ct.SHOW, t),
                i = yt._getParentFromElement(this._element);
              f(i).trigger(e),
                e.isDefaultPrevented() ||
                (f(this._menu).toggleClass(dt),
                  f(i).toggleClass(dt).trigger(f.Event(ct.SHOWN, t)));
            }
          }),
          (nt.hide = function () {
            if (
              !this._element.disabled &&
              !f(this._element).hasClass(ut) &&
              f(this._menu).hasClass(dt)
            ) {
              var t = { relatedTarget: this._element },
                e = f.Event(ct.HIDE, t),
                i = yt._getParentFromElement(this._element);
              f(i).trigger(e),
                e.isDefaultPrevented() ||
                (f(this._menu).toggleClass(dt),
                  f(i).toggleClass(dt).trigger(f.Event(ct.HIDDEN, t)));
            }
          }),
          (nt.dispose = function () {
            f.removeData(this._element, ot),
              f(this._element).off(rt),
              (this._element = null),
              (this._menu = null) !== this._popper &&
              (this._popper.destroy(), (this._popper = null));
          }),
          (nt.update = function () {
            (this._inNavbar = this._detectNavbar()),
              null !== this._popper && this._popper.scheduleUpdate();
          }),
          (nt._addEventListeners = function () {
            var e = this;
            f(this._element).on(ct.CLICK, function (t) {
              t.preventDefault(), t.stopPropagation(), e.toggle();
            });
          }),
          (nt._getConfig = function (t) {
            return (
              (t = r({}, this.constructor.Default, f(this._element).data(), t)),
              g.typeCheckConfig(st, t, this.constructor.DefaultType),
              t
            );
          }),
          (nt._getMenuElement = function () {
            if (!this._menu) {
              var t = yt._getParentFromElement(this._element);
              t && (this._menu = t.querySelector(gt));
            }
            return this._menu;
          }),
          (nt._getPlacement = function () {
            var t = f(this._element.parentNode),
              e = "bottom-start";
            return (
              t.hasClass("dropup")
                ? ((e = "top-start"),
                  f(this._menu).hasClass(pt) && (e = "top-end"))
                : t.hasClass("dropright")
                  ? (e = "right-start")
                  : t.hasClass("dropleft")
                    ? (e = "left-start")
                    : f(this._menu).hasClass(pt) && (e = "bottom-end"),
              e
            );
          }),
          (nt._detectNavbar = function () {
            return 0 < f(this._element).closest(".navbar").length;
          }),
          (nt._getPopperConfig = function () {
            var e = this,
              t = {};
            "function" == typeof this._config.offset
              ? (t.fn = function (t) {
                return (
                  (t.offsets = r(
                    {},
                    t.offsets,
                    e._config.offset(t.offsets) || {}
                  )),
                  t
                );
              })
              : (t.offset = this._config.offset);
            var i = {
              placement: this._getPlacement(),
              modifiers: {
                offset: t,
                flip: { enabled: this._config.flip },
                preventOverflow: { boundariesElement: this._config.boundary },
              },
            };
            return (
              "static" === this._config.display &&
              (i.modifiers.applyStyle = { enabled: !1 }),
              i
            );
          }),
          (yt._jQueryInterface = function (e) {
            return this.each(function () {
              var t = f(this).data(ot);
              if (
                (t ||
                  ((t = new yt(this, "object" == typeof e ? e : null)),
                    f(this).data(ot, t)),
                  "string" == typeof e)
              ) {
                if (void 0 === t[e])
                  throw new TypeError('No method named "' + e + '"');
                t[e]();
              }
            });
          }),
          (yt._clearMenus = function (t) {
            if (!t || (3 !== t.which && ("keyup" !== t.type || 9 === t.which)))
              for (
                var e = [].slice.call(document.querySelectorAll(ft)),
                i = 0,
                n = e.length;
                i < n;
                i++
              ) {
                var s = yt._getParentFromElement(e[i]),
                  o = f(e[i]).data(ot),
                  r = { relatedTarget: e[i] };
                if ((t && "click" === t.type && (r.clickEvent = t), o)) {
                  var a = o._menu;
                  if (
                    f(s).hasClass(dt) &&
                    !(
                      t &&
                      (("click" === t.type &&
                        /input|textarea/i.test(t.target.tagName)) ||
                        ("keyup" === t.type && 9 === t.which)) &&
                      f.contains(s, t.target)
                    )
                  ) {
                    var l = f.Event(ct.HIDE, r);
                    f(s).trigger(l),
                      l.isDefaultPrevented() ||
                      ("ontouchstart" in document.documentElement &&
                        f(document.body)
                          .children()
                          .off("mouseover", null, f.noop),
                        e[i].setAttribute("aria-expanded", "false"),
                        f(a).removeClass(dt),
                        f(s).removeClass(dt).trigger(f.Event(ct.HIDDEN, r)));
                  }
                }
              }
          }),
          (yt._getParentFromElement = function (t) {
            var e,
              i = g.getSelectorFromElement(t);
            return i && (e = document.querySelector(i)), e || t.parentNode;
          }),
          (yt._dataApiKeydownHandler = function (t) {
            if (
              (/input|textarea/i.test(t.target.tagName)
                ? !(
                  32 === t.which ||
                  (27 !== t.which &&
                    ((40 !== t.which && 38 !== t.which) ||
                      f(t.target).closest(gt).length))
                )
                : ht.test(t.which)) &&
              (t.preventDefault(),
                t.stopPropagation(),
                !this.disabled && !f(this).hasClass(ut))
            ) {
              var e = yt._getParentFromElement(this),
                i = f(e).hasClass(dt);
              if (i && (!i || (27 !== t.which && 32 !== t.which))) {
                var n = [].slice.call(
                  e.querySelectorAll(
                    ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                  )
                );
                if (0 !== n.length) {
                  var s = n.indexOf(t.target);
                  38 === t.which && 0 < s && s--,
                    40 === t.which && s < n.length - 1 && s++,
                    s < 0 && (s = 0),
                    n[s].focus();
                }
              } else {
                if (27 === t.which) {
                  var o = e.querySelector(ft);
                  f(o).trigger("focus");
                }
                f(this).trigger("click");
              }
            }
          }),
          o(yt, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return mt;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return vt;
              },
            },
          ]),
          yt);
    function yt(t, e) {
      (this._element = t),
        (this._popper = null),
        (this._config = this._getConfig(e)),
        (this._menu = this._getMenuElement()),
        (this._inNavbar = this._detectNavbar()),
        this._addEventListeners();
    }
    f(document)
      .on(ct.KEYDOWN_DATA_API, ft, _t._dataApiKeydownHandler)
      .on(ct.KEYDOWN_DATA_API, gt, _t._dataApiKeydownHandler)
      .on(ct.CLICK_DATA_API + " " + ct.KEYUP_DATA_API, _t._clearMenus)
      .on(ct.CLICK_DATA_API, ft, function (t) {
        t.preventDefault(),
          t.stopPropagation(),
          _t._jQueryInterface.call(f(this), "toggle");
      })
      .on(ct.CLICK_DATA_API, ".dropdown form", function (t) {
        t.stopPropagation();
      }),
      (f.fn[st] = _t._jQueryInterface),
      (f.fn[st].Constructor = _t),
      (f.fn[st].noConflict = function () {
        return (f.fn[st] = lt), _t._jQueryInterface;
      });
    var bt,
      wt = "modal",
      xt = "bs.modal",
      Ct = "." + xt,
      kt = f.fn[wt],
      Dt = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
      Tt = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean",
      },
      It = {
        HIDE: "hide" + Ct,
        HIDDEN: "hidden" + Ct,
        SHOW: "show" + Ct,
        SHOWN: "shown" + Ct,
        FOCUSIN: "focusin" + Ct,
        RESIZE: "resize" + Ct,
        CLICK_DISMISS: "click.dismiss" + Ct,
        KEYDOWN_DISMISS: "keydown.dismiss" + Ct,
        MOUSEUP_DISMISS: "mouseup.dismiss" + Ct,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + Ct,
        CLICK_DATA_API: "click" + Ct + ".data-api",
      },
      St = "modal-open",
      Et = "fade",
      At = "show",
      Pt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      jt = ".sticky-top",
      Ot =
        (((bt = Nt.prototype).toggle = function (t) {
          return this._isShown ? this.hide() : this.show(t);
        }),
          (bt.show = function (t) {
            var e = this;
            if (!this._isShown && !this._isTransitioning) {
              f(this._element).hasClass(Et) && (this._isTransitioning = !0);
              var i = f.Event(It.SHOW, { relatedTarget: t });
              f(this._element).trigger(i),
                this._isShown ||
                i.isDefaultPrevented() ||
                ((this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  this._adjustDialog(),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  f(this._element).on(
                    It.CLICK_DISMISS,
                    '[data-dismiss="modal"]',
                    function (t) {
                      return e.hide(t);
                    }
                  ),
                  f(this._dialog).on(It.MOUSEDOWN_DISMISS, function () {
                    f(e._element).one(It.MOUSEUP_DISMISS, function (t) {
                      f(t.target).is(e._element) && (e._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(function () {
                    return e._showElement(t);
                  }));
            }
          }),
          (bt.hide = function (t) {
            var e = this;
            if (
              (t && t.preventDefault(), this._isShown && !this._isTransitioning)
            ) {
              var i = f.Event(It.HIDE);
              if (
                (f(this._element).trigger(i),
                  this._isShown && !i.isDefaultPrevented())
              ) {
                this._isShown = !1;
                var n = f(this._element).hasClass(Et);
                if (
                  (n && (this._isTransitioning = !0),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    f(document).off(It.FOCUSIN),
                    f(this._element).removeClass(At),
                    f(this._element).off(It.CLICK_DISMISS),
                    f(this._dialog).off(It.MOUSEDOWN_DISMISS),
                    n)
                ) {
                  var s = g.getTransitionDurationFromElement(this._element);
                  f(this._element)
                    .one(g.TRANSITION_END, function (t) {
                      return e._hideModal(t);
                    })
                    .emulateTransitionEnd(s);
                } else this._hideModal();
              }
            }
          }),
          (bt.dispose = function () {
            [window, this._element, this._dialog].forEach(function (t) {
              return f(t).off(Ct);
            }),
              f(document).off(It.FOCUSIN),
              f.removeData(this._element, xt),
              (this._config = null),
              (this._element = null),
              (this._dialog = null),
              (this._backdrop = null),
              (this._isShown = null),
              (this._isBodyOverflowing = null),
              (this._ignoreBackdropClick = null),
              (this._isTransitioning = null),
              (this._scrollbarWidth = null);
          }),
          (bt.handleUpdate = function () {
            this._adjustDialog();
          }),
          (bt._getConfig = function (t) {
            return (t = r({}, Dt, t)), g.typeCheckConfig(wt, t, Tt), t;
          }),
          (bt._showElement = function (t) {
            var e = this,
              i = f(this._element).hasClass(Et);
            function n() {
              e._config.focus && e._element.focus(),
                (e._isTransitioning = !1),
                f(e._element).trigger(s);
            }
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
              document.body.appendChild(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              this._element.setAttribute("aria-modal", !0),
              (this._element.scrollTop = 0),
              i && g.reflow(this._element),
              f(this._element).addClass(At),
              this._config.focus && this._enforceFocus();
            var s = f.Event(It.SHOWN, { relatedTarget: t });
            if (i) {
              var o = g.getTransitionDurationFromElement(this._dialog);
              f(this._dialog).one(g.TRANSITION_END, n).emulateTransitionEnd(o);
            } else n();
          }),
          (bt._enforceFocus = function () {
            var e = this;
            f(document)
              .off(It.FOCUSIN)
              .on(It.FOCUSIN, function (t) {
                document !== t.target &&
                  e._element !== t.target &&
                  0 === f(e._element).has(t.target).length &&
                  e._element.focus();
              });
          }),
          (bt._setEscapeEvent = function () {
            var e = this;
            this._isShown && this._config.keyboard
              ? f(this._element).on(It.KEYDOWN_DISMISS, function (t) {
                27 === t.which && (t.preventDefault(), e.hide());
              })
              : this._isShown || f(this._element).off(It.KEYDOWN_DISMISS);
          }),
          (bt._setResizeEvent = function () {
            var e = this;
            this._isShown
              ? f(window).on(It.RESIZE, function (t) {
                return e.handleUpdate(t);
              })
              : f(window).off(It.RESIZE);
          }),
          (bt._hideModal = function () {
            var t = this;
            (this._element.style.display = "none"),
              this._element.setAttribute("aria-hidden", !0),
              this._element.removeAttribute("aria-modal"),
              (this._isTransitioning = !1),
              this._showBackdrop(function () {
                f(document.body).removeClass(St),
                  t._resetAdjustments(),
                  t._resetScrollbar(),
                  f(t._element).trigger(It.HIDDEN);
              });
          }),
          (bt._removeBackdrop = function () {
            this._backdrop &&
              (f(this._backdrop).remove(), (this._backdrop = null));
          }),
          (bt._showBackdrop = function (t) {
            var e = this,
              i = f(this._element).hasClass(Et) ? Et : "";
            if (this._isShown && this._config.backdrop) {
              if (
                ((this._backdrop = document.createElement("div")),
                  (this._backdrop.className = "modal-backdrop"),
                  i && this._backdrop.classList.add(i),
                  f(this._backdrop).appendTo(document.body),
                  f(this._element).on(It.CLICK_DISMISS, function (t) {
                    e._ignoreBackdropClick
                      ? (e._ignoreBackdropClick = !1)
                      : t.target === t.currentTarget &&
                      ("static" === e._config.backdrop
                        ? e._element.focus()
                        : e.hide());
                  }),
                  i && g.reflow(this._backdrop),
                  f(this._backdrop).addClass(At),
                  !t)
              )
                return;
              if (!i) return void t();
              var n = g.getTransitionDurationFromElement(this._backdrop);
              f(this._backdrop).one(g.TRANSITION_END, t).emulateTransitionEnd(n);
            } else if (!this._isShown && this._backdrop) {
              f(this._backdrop).removeClass(At);
              var s = function () {
                e._removeBackdrop(), t && t();
              };
              if (f(this._element).hasClass(Et)) {
                var o = g.getTransitionDurationFromElement(this._backdrop);
                f(this._backdrop)
                  .one(g.TRANSITION_END, s)
                  .emulateTransitionEnd(o);
              } else s();
            } else t && t();
          }),
          (bt._adjustDialog = function () {
            var t =
              this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing &&
              t &&
              (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
              this._isBodyOverflowing &&
              !t &&
              (this._element.style.paddingRight = this._scrollbarWidth + "px");
          }),
          (bt._resetAdjustments = function () {
            (this._element.style.paddingLeft = ""),
              (this._element.style.paddingRight = "");
          }),
          (bt._checkScrollbar = function () {
            var t = document.body.getBoundingClientRect();
            (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
              (this._scrollbarWidth = this._getScrollbarWidth());
          }),
          (bt._setScrollbar = function () {
            var s = this;
            if (this._isBodyOverflowing) {
              var t = [].slice.call(document.querySelectorAll(Pt)),
                e = [].slice.call(document.querySelectorAll(jt));
              f(t).each(function (t, e) {
                var i = e.style.paddingRight,
                  n = f(e).css("padding-right");
                f(e)
                  .data("padding-right", i)
                  .css("padding-right", parseFloat(n) + s._scrollbarWidth + "px");
              }),
                f(e).each(function (t, e) {
                  var i = e.style.marginRight,
                    n = f(e).css("margin-right");
                  f(e)
                    .data("margin-right", i)
                    .css(
                      "margin-right",
                      parseFloat(n) - s._scrollbarWidth + "px"
                    );
                });
              var i = document.body.style.paddingRight,
                n = f(document.body).css("padding-right");
              f(document.body)
                .data("padding-right", i)
                .css(
                  "padding-right",
                  parseFloat(n) + this._scrollbarWidth + "px"
                );
            }
            f(document.body).addClass(St);
          }),
          (bt._resetScrollbar = function () {
            var t = [].slice.call(document.querySelectorAll(Pt));
            f(t).each(function (t, e) {
              var i = f(e).data("padding-right");
              f(e).removeData("padding-right"), (e.style.paddingRight = i || "");
            });
            var e = [].slice.call(document.querySelectorAll(jt));
            f(e).each(function (t, e) {
              var i = f(e).data("margin-right");
              void 0 !== i &&
                f(e).css("margin-right", i).removeData("margin-right");
            });
            var i = f(document.body).data("padding-right");
            f(document.body).removeData("padding-right"),
              (document.body.style.paddingRight = i || "");
          }),
          (bt._getScrollbarWidth = function () {
            var t = document.createElement("div");
            (t.className = "modal-scrollbar-measure"),
              document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          }),
          (Nt._jQueryInterface = function (i, n) {
            return this.each(function () {
              var t = f(this).data(xt),
                e = r({}, Dt, f(this).data(), "object" == typeof i && i ? i : {});
              if (
                (t || ((t = new Nt(this, e)), f(this).data(xt, t)),
                  "string" == typeof i)
              ) {
                if (void 0 === t[i])
                  throw new TypeError('No method named "' + i + '"');
                t[i](n);
              } else e.show && t.show(n);
            });
          }),
          o(Nt, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return Dt;
              },
            },
          ]),
          Nt);
    function Nt(t, e) {
      (this._config = this._getConfig(e)),
        (this._element = t),
        (this._dialog = t.querySelector(".modal-dialog")),
        (this._backdrop = null),
        (this._isShown = !1),
        (this._isBodyOverflowing = !1),
        (this._ignoreBackdropClick = !1),
        (this._isTransitioning = !1),
        (this._scrollbarWidth = 0);
    }
    f(document).on(It.CLICK_DATA_API, '[data-toggle="modal"]', function (t) {
      var e,
        i = this,
        n = g.getSelectorFromElement(this);
      n && (e = document.querySelector(n));
      var s = f(e).data(xt) ? "toggle" : r({}, f(e).data(), f(this).data());
      ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
      var o = f(e).one(It.SHOW, function (t) {
        t.isDefaultPrevented() ||
          o.one(It.HIDDEN, function () {
            f(i).is(":visible") && i.focus();
          });
      });
      Ot._jQueryInterface.call(f(e), s, this);
    }),
      (f.fn[wt] = Ot._jQueryInterface),
      (f.fn[wt].Constructor = Ot),
      (f.fn[wt].noConflict = function () {
        return (f.fn[wt] = kt), Ot._jQueryInterface;
      });
    var Mt,
      Ht = "tooltip",
      zt = "bs.tooltip",
      Wt = "." + zt,
      Lt = f.fn[Ht],
      Rt = "bs-tooltip",
      Ft = new RegExp("(^|\\s)" + Rt + "\\S+", "g"),
      qt = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(number|string)",
        container: "(string|element|boolean)",
        fallbackPlacement: "(string|array)",
        boundary: "(string|element)",
      },
      Bt = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        LEFT: "left",
      },
      $t = {
        animation: !0,
        template:
          '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        selector: !1,
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
      },
      Ut = "show",
      Yt = {
        HIDE: "hide" + Wt,
        HIDDEN: "hidden" + Wt,
        SHOW: "show" + Wt,
        SHOWN: "shown" + Wt,
        INSERTED: "inserted" + Wt,
        CLICK: "click" + Wt,
        FOCUSIN: "focusin" + Wt,
        FOCUSOUT: "focusout" + Wt,
        MOUSEENTER: "mouseenter" + Wt,
        MOUSELEAVE: "mouseleave" + Wt,
      },
      Kt = "fade",
      Vt = "show",
      Qt = "hover",
      Xt =
        (((Mt = Gt.prototype).enable = function () {
          this._isEnabled = !0;
        }),
          (Mt.disable = function () {
            this._isEnabled = !1;
          }),
          (Mt.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
          }),
          (Mt.toggle = function (t) {
            if (this._isEnabled)
              if (t) {
                var e = this.constructor.DATA_KEY,
                  i = f(t.currentTarget).data(e);
                i ||
                  ((i = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                    f(t.currentTarget).data(e, i)),
                  (i._activeTrigger.click = !i._activeTrigger.click),
                  i._isWithActiveTrigger()
                    ? i._enter(null, i)
                    : i._leave(null, i);
              } else {
                if (f(this.getTipElement()).hasClass(Vt))
                  return void this._leave(null, this);
                this._enter(null, this);
              }
          }),
          (Mt.dispose = function () {
            clearTimeout(this._timeout),
              f.removeData(this.element, this.constructor.DATA_KEY),
              f(this.element).off(this.constructor.EVENT_KEY),
              f(this.element).closest(".modal").off("hide.bs.modal"),
              this.tip && f(this.tip).remove(),
              (this._isEnabled = null),
              (this._timeout = null),
              (this._hoverState = null),
              (this._activeTrigger = null) !== this._popper &&
              this._popper.destroy(),
              (this._popper = null),
              (this.element = null),
              (this.config = null),
              (this.tip = null);
          }),
          (Mt.show = function () {
            var e = this;
            if ("none" === f(this.element).css("display"))
              throw new Error("Please use show on visible elements");
            var t = f.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              f(this.element).trigger(t);
              var i = g.findShadowRoot(this.element),
                n = f.contains(
                  null !== i ? i : this.element.ownerDocument.documentElement,
                  this.element
                );
              if (t.isDefaultPrevented() || !n) return;
              var s = this.getTipElement(),
                o = g.getUID(this.constructor.NAME);
              s.setAttribute("id", o),
                this.element.setAttribute("aria-describedby", o),
                this.setContent(),
                this.config.animation && f(s).addClass(Kt);
              var r =
                "function" == typeof this.config.placement
                  ? this.config.placement.call(this, s, this.element)
                  : this.config.placement,
                a = this._getAttachment(r);
              this.addAttachmentClass(a);
              var l = this._getContainer();
              f(s).data(this.constructor.DATA_KEY, this),
                f.contains(
                  this.element.ownerDocument.documentElement,
                  this.tip
                ) || f(s).appendTo(l),
                f(this.element).trigger(this.constructor.Event.INSERTED),
                (this._popper = new u(this.element, s, {
                  placement: a,
                  modifiers: {
                    offset: { offset: this.config.offset },
                    flip: { behavior: this.config.fallbackPlacement },
                    arrow: { element: ".arrow" },
                    preventOverflow: { boundariesElement: this.config.boundary },
                  },
                  onCreate: function (t) {
                    t.originalPlacement !== t.placement &&
                      e._handlePopperPlacementChange(t);
                  },
                  onUpdate: function (t) {
                    return e._handlePopperPlacementChange(t);
                  },
                })),
                f(s).addClass(Vt),
                "ontouchstart" in document.documentElement &&
                f(document.body).children().on("mouseover", null, f.noop);
              var h = function () {
                e.config.animation && e._fixTransition();
                var t = e._hoverState;
                (e._hoverState = null),
                  f(e.element).trigger(e.constructor.Event.SHOWN),
                  "out" === t && e._leave(null, e);
              };
              if (f(this.tip).hasClass(Kt)) {
                var c = g.getTransitionDurationFromElement(this.tip);
                f(this.tip).one(g.TRANSITION_END, h).emulateTransitionEnd(c);
              } else h();
            }
          }),
          (Mt.hide = function (t) {
            function e() {
              i._hoverState !== Ut && n.parentNode && n.parentNode.removeChild(n),
                i._cleanTipClass(),
                i.element.removeAttribute("aria-describedby"),
                f(i.element).trigger(i.constructor.Event.HIDDEN),
                null !== i._popper && i._popper.destroy(),
                t && t();
            }
            var i = this,
              n = this.getTipElement(),
              s = f.Event(this.constructor.Event.HIDE);
            if ((f(this.element).trigger(s), !s.isDefaultPrevented())) {
              if (
                (f(n).removeClass(Vt),
                  "ontouchstart" in document.documentElement &&
                  f(document.body).children().off("mouseover", null, f.noop),
                  (this._activeTrigger.click = !1),
                  (this._activeTrigger.focus = !1),
                  (this._activeTrigger[Qt] = !1),
                  f(this.tip).hasClass(Kt))
              ) {
                var o = g.getTransitionDurationFromElement(n);
                f(n).one(g.TRANSITION_END, e).emulateTransitionEnd(o);
              } else e();
              this._hoverState = "";
            }
          }),
          (Mt.update = function () {
            null !== this._popper && this._popper.scheduleUpdate();
          }),
          (Mt.isWithContent = function () {
            return Boolean(this.getTitle());
          }),
          (Mt.addAttachmentClass = function (t) {
            f(this.getTipElement()).addClass(Rt + "-" + t);
          }),
          (Mt.getTipElement = function () {
            return (this.tip = this.tip || f(this.config.template)[0]), this.tip;
          }),
          (Mt.setContent = function () {
            var t = this.getTipElement();
            this.setElementContent(
              f(t.querySelectorAll(".tooltip-inner")),
              this.getTitle()
            ),
              f(t).removeClass("fade show");
          }),
          (Mt.setElementContent = function (t, e) {
            var i = this.config.html;
            "object" == typeof e && (e.nodeType || e.jquery)
              ? i
                ? f(e).parent().is(t) || t.empty().append(e)
                : t.text(f(e).text())
              : t[i ? "html" : "text"](e);
          }),
          (Mt.getTitle = function () {
            var t = this.element.getAttribute("data-original-title");
            return (t =
              t ||
              ("function" == typeof this.config.title
                ? this.config.title.call(this.element)
                : this.config.title));
          }),
          (Mt._getContainer = function () {
            return !1 === this.config.container
              ? document.body
              : g.isElement(this.config.container)
                ? f(this.config.container)
                : f(document).find(this.config.container);
          }),
          (Mt._getAttachment = function (t) {
            return Bt[t.toUpperCase()];
          }),
          (Mt._setListeners = function () {
            var n = this;
            this.config.trigger.split(" ").forEach(function (t) {
              if ("click" === t)
                f(n.element).on(
                  n.constructor.Event.CLICK,
                  n.config.selector,
                  function (t) {
                    return n.toggle(t);
                  }
                );
              else if ("manual" !== t) {
                var e =
                  t === Qt
                    ? n.constructor.Event.MOUSEENTER
                    : n.constructor.Event.FOCUSIN,
                  i =
                    t === Qt
                      ? n.constructor.Event.MOUSELEAVE
                      : n.constructor.Event.FOCUSOUT;
                f(n.element)
                  .on(e, n.config.selector, function (t) {
                    return n._enter(t);
                  })
                  .on(i, n.config.selector, function (t) {
                    return n._leave(t);
                  });
              }
            }),
              f(this.element)
                .closest(".modal")
                .on("hide.bs.modal", function () {
                  n.element && n.hide();
                }),
              this.config.selector
                ? (this.config = r({}, this.config, {
                  trigger: "manual",
                  selector: "",
                }))
                : this._fixTitle();
          }),
          (Mt._fixTitle = function () {
            var t = typeof this.element.getAttribute("data-original-title");
            (!this.element.getAttribute("title") && "string" == t) ||
              (this.element.setAttribute(
                "data-original-title",
                this.element.getAttribute("title") || ""
              ),
                this.element.setAttribute("title", ""));
          }),
          (Mt._enter = function (t, e) {
            var i = this.constructor.DATA_KEY;
            (e = e || f(t.currentTarget).data(i)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
                f(t.currentTarget).data(i, e)),
              t && (e._activeTrigger["focusin" === t.type ? "focus" : Qt] = !0),
              f(e.getTipElement()).hasClass(Vt) || e._hoverState === Ut
                ? (e._hoverState = Ut)
                : (clearTimeout(e._timeout),
                  (e._hoverState = Ut),
                  e.config.delay && e.config.delay.show
                    ? (e._timeout = setTimeout(function () {
                      e._hoverState === Ut && e.show();
                    }, e.config.delay.show))
                    : e.show());
          }),
          (Mt._leave = function (t, e) {
            var i = this.constructor.DATA_KEY;
            (e = e || f(t.currentTarget).data(i)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
                f(t.currentTarget).data(i, e)),
              t && (e._activeTrigger["focusout" === t.type ? "focus" : Qt] = !1),
              e._isWithActiveTrigger() ||
              (clearTimeout(e._timeout),
                (e._hoverState = "out"),
                e.config.delay && e.config.delay.hide
                  ? (e._timeout = setTimeout(function () {
                    "out" === e._hoverState && e.hide();
                  }, e.config.delay.hide))
                  : e.hide());
          }),
          (Mt._isWithActiveTrigger = function () {
            for (var t in this._activeTrigger)
              if (this._activeTrigger[t]) return !0;
            return !1;
          }),
          (Mt._getConfig = function (t) {
            return (
              "number" ==
              typeof (t = r(
                {},
                this.constructor.Default,
                f(this.element).data(),
                "object" == typeof t && t ? t : {}
              )).delay && (t.delay = { show: t.delay, hide: t.delay }),
              "number" == typeof t.title && (t.title = t.title.toString()),
              "number" == typeof t.content && (t.content = t.content.toString()),
              g.typeCheckConfig(Ht, t, this.constructor.DefaultType),
              t
            );
          }),
          (Mt._getDelegateConfig = function () {
            var t = {};
            if (this.config)
              for (var e in this.config)
                this.constructor.Default[e] !== this.config[e] &&
                  (t[e] = this.config[e]);
            return t;
          }),
          (Mt._cleanTipClass = function () {
            var t = f(this.getTipElement()),
              e = t.attr("class").match(Ft);
            null !== e && e.length && t.removeClass(e.join(""));
          }),
          (Mt._handlePopperPlacementChange = function (t) {
            var e = t.instance;
            (this.tip = e.popper),
              this._cleanTipClass(),
              this.addAttachmentClass(this._getAttachment(t.placement));
          }),
          (Mt._fixTransition = function () {
            var t = this.getTipElement(),
              e = this.config.animation;
            null === t.getAttribute("x-placement") &&
              (f(t).removeClass(Kt),
                (this.config.animation = !1),
                this.hide(),
                this.show(),
                (this.config.animation = e));
          }),
          (Gt._jQueryInterface = function (i) {
            return this.each(function () {
              var t = f(this).data(zt),
                e = "object" == typeof i && i;
              if (
                (t || !/dispose|hide/.test(i)) &&
                (t || ((t = new Gt(this, e)), f(this).data(zt, t)),
                  "string" == typeof i)
              ) {
                if (void 0 === t[i])
                  throw new TypeError('No method named "' + i + '"');
                t[i]();
              }
            });
          }),
          o(Gt, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return $t;
              },
            },
            {
              key: "NAME",
              get: function () {
                return Ht;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return zt;
              },
            },
            {
              key: "Event",
              get: function () {
                return Yt;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return Wt;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return qt;
              },
            },
          ]),
          Gt);
    function Gt(t, e) {
      if (void 0 === u)
        throw new TypeError(
          "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
        );
      (this._isEnabled = !0),
        (this._timeout = 0),
        (this._hoverState = ""),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this.element = t),
        (this.config = this._getConfig(e)),
        (this.tip = null),
        this._setListeners();
    }
    (f.fn[Ht] = Xt._jQueryInterface),
      (f.fn[Ht].Constructor = Xt),
      (f.fn[Ht].noConflict = function () {
        return (f.fn[Ht] = Lt), Xt._jQueryInterface;
      });
    var Jt = "popover",
      Zt = "bs.popover",
      te = "." + Zt,
      ee = f.fn[Jt],
      ie = "bs-popover",
      ne = new RegExp("(^|\\s)" + ie + "\\S+", "g"),
      se = r({}, Xt.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      }),
      oe = r({}, Xt.DefaultType, { content: "(string|element|function)" }),
      re = {
        HIDE: "hide" + te,
        HIDDEN: "hidden" + te,
        SHOW: "show" + te,
        SHOWN: "shown" + te,
        INSERTED: "inserted" + te,
        CLICK: "click" + te,
        FOCUSIN: "focusin" + te,
        FOCUSOUT: "focusout" + te,
        MOUSEENTER: "mouseenter" + te,
        MOUSELEAVE: "mouseleave" + te,
      },
      ae = (function (t) {
        var e, i;
        function n() {
          return t.apply(this, arguments) || this;
        }
        (i = t),
          ((e = n).prototype = Object.create(i.prototype)),
          ((e.prototype.constructor = e).__proto__ = i);
        var s = n.prototype;
        return (
          (s.isWithContent = function () {
            return this.getTitle() || this._getContent();
          }),
          (s.addAttachmentClass = function (t) {
            f(this.getTipElement()).addClass(ie + "-" + t);
          }),
          (s.getTipElement = function () {
            return (
              (this.tip = this.tip || f(this.config.template)[0]), this.tip
            );
          }),
          (s.setContent = function () {
            var t = f(this.getTipElement());
            this.setElementContent(t.find(".popover-header"), this.getTitle());
            var e = this._getContent();
            "function" == typeof e && (e = e.call(this.element)),
              this.setElementContent(t.find(".popover-body"), e),
              t.removeClass("fade show");
          }),
          (s._getContent = function () {
            return (
              this.element.getAttribute("data-content") || this.config.content
            );
          }),
          (s._cleanTipClass = function () {
            var t = f(this.getTipElement()),
              e = t.attr("class").match(ne);
            null !== e && 0 < e.length && t.removeClass(e.join(""));
          }),
          (n._jQueryInterface = function (i) {
            return this.each(function () {
              var t = f(this).data(Zt),
                e = "object" == typeof i ? i : null;
              if (
                (t || !/dispose|hide/.test(i)) &&
                (t || ((t = new n(this, e)), f(this).data(Zt, t)),
                  "string" == typeof i)
              ) {
                if (void 0 === t[i])
                  throw new TypeError('No method named "' + i + '"');
                t[i]();
              }
            });
          }),
          o(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return se;
              },
            },
            {
              key: "NAME",
              get: function () {
                return Jt;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return Zt;
              },
            },
            {
              key: "Event",
              get: function () {
                return re;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return te;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return oe;
              },
            },
          ]),
          n
        );
      })(Xt);
    (f.fn[Jt] = ae._jQueryInterface),
      (f.fn[Jt].Constructor = ae),
      (f.fn[Jt].noConflict = function () {
        return (f.fn[Jt] = ee), ae._jQueryInterface;
      });
    var le,
      he = "scrollspy",
      ce = "bs.scrollspy",
      ue = "." + ce,
      de = f.fn[he],
      pe = { offset: 10, method: "auto", target: "" },
      fe = { offset: "number", method: "string", target: "(string|element)" },
      ge = {
        ACTIVATE: "activate" + ue,
        SCROLL: "scroll" + ue,
        LOAD_DATA_API: "load" + ue + ".data-api",
      },
      me = "active",
      ve = ".nav, .list-group",
      _e = ".nav-link",
      ye = ".list-group-item",
      be =
        (((le = we.prototype).refresh = function () {
          var e = this,
            t =
              this._scrollElement === this._scrollElement.window
                ? "offset"
                : "position",
            s = "auto" === this._config.method ? t : this._config.method,
            o = "position" === s ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var e,
                  i = g.getSelectorFromElement(t);
                if ((i && (e = document.querySelector(i)), e)) {
                  var n = e.getBoundingClientRect();
                  if (n.width || n.height) return [f(e)[s]().top + o, i];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (t) {
                e._offsets.push(t[0]), e._targets.push(t[1]);
              });
        }),
          (le.dispose = function () {
            f.removeData(this._element, ce),
              f(this._scrollElement).off(ue),
              (this._element = null),
              (this._scrollElement = null),
              (this._config = null),
              (this._selector = null),
              (this._offsets = null),
              (this._targets = null),
              (this._activeTarget = null),
              (this._scrollHeight = null);
          }),
          (le._getConfig = function (t) {
            if (
              "string" !=
              typeof (t = r({}, pe, "object" == typeof t && t ? t : {})).target
            ) {
              var e = f(t.target).attr("id");
              e || ((e = g.getUID(he)), f(t.target).attr("id", e)),
                (t.target = "#" + e);
            }
            return g.typeCheckConfig(he, t, fe), t;
          }),
          (le._getScrollTop = function () {
            return this._scrollElement === window
              ? this._scrollElement.pageYOffset
              : this._scrollElement.scrollTop;
          }),
          (le._getScrollHeight = function () {
            return (
              this._scrollElement.scrollHeight ||
              Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              )
            );
          }),
          (le._getOffsetHeight = function () {
            return this._scrollElement === window
              ? window.innerHeight
              : this._scrollElement.getBoundingClientRect().height;
          }),
          (le._process = function () {
            var t = this._getScrollTop() + this._config.offset,
              e = this._getScrollHeight(),
              i = this._config.offset + e - this._getOffsetHeight();
            if ((this._scrollHeight !== e && this.refresh(), i <= t)) {
              var n = this._targets[this._targets.length - 1];
              this._activeTarget !== n && this._activate(n);
            } else {
              if (
                this._activeTarget &&
                t < this._offsets[0] &&
                0 < this._offsets[0]
              )
                return (this._activeTarget = null), void this._clear();
              for (var s = this._offsets.length; s--;)
                this._activeTarget !== this._targets[s] &&
                  t >= this._offsets[s] &&
                  (void 0 === this._offsets[s + 1] || t < this._offsets[s + 1]) &&
                  this._activate(this._targets[s]);
            }
          }),
          (le._activate = function (e) {
            (this._activeTarget = e), this._clear();
            var t = this._selector.split(",").map(function (t) {
              return (
                t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
              );
            }),
              i = f([].slice.call(document.querySelectorAll(t.join(","))));
            i.hasClass("dropdown-item")
              ? (i.closest(".dropdown").find(".dropdown-toggle").addClass(me),
                i.addClass(me))
              : (i.addClass(me),
                i
                  .parents(ve)
                  .prev(_e + ", " + ye)
                  .addClass(me),
                i.parents(ve).prev(".nav-item").children(_e).addClass(me)),
              f(this._scrollElement).trigger(ge.ACTIVATE, { relatedTarget: e });
          }),
          (le._clear = function () {
            [].slice
              .call(document.querySelectorAll(this._selector))
              .filter(function (t) {
                return t.classList.contains(me);
              })
              .forEach(function (t) {
                return t.classList.remove(me);
              });
          }),
          (we._jQueryInterface = function (e) {
            return this.each(function () {
              var t = f(this).data(ce);
              if (
                (t ||
                  ((t = new we(this, "object" == typeof e && e)),
                    f(this).data(ce, t)),
                  "string" == typeof e)
              ) {
                if (void 0 === t[e])
                  throw new TypeError('No method named "' + e + '"');
                t[e]();
              }
            });
          }),
          o(we, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return pe;
              },
            },
          ]),
          we);
    function we(t, e) {
      var i = this;
      (this._element = t),
        (this._scrollElement = "BODY" === t.tagName ? window : t),
        (this._config = this._getConfig(e)),
        (this._selector =
          this._config.target +
          " " +
          _e +
          "," +
          this._config.target +
          " " +
          ye +
          "," +
          this._config.target +
          " .dropdown-item"),
        (this._offsets = []),
        (this._targets = []),
        (this._activeTarget = null),
        (this._scrollHeight = 0),
        f(this._scrollElement).on(ge.SCROLL, function (t) {
          return i._process(t);
        }),
        this.refresh(),
        this._process();
    }
    f(window).on(ge.LOAD_DATA_API, function () {
      for (
        var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')),
        e = t.length;
        e--;

      ) {
        var i = f(t[e]);
        be._jQueryInterface.call(i, i.data());
      }
    }),
      (f.fn[he] = be._jQueryInterface),
      (f.fn[he].Constructor = be),
      (f.fn[he].noConflict = function () {
        return (f.fn[he] = de), be._jQueryInterface;
      });
    var xe,
      Ce = "bs.tab",
      ke = "." + Ce,
      De = f.fn.tab,
      Te = {
        HIDE: "hide" + ke,
        HIDDEN: "hidden" + ke,
        SHOW: "show" + ke,
        SHOWN: "shown" + ke,
        CLICK_DATA_API: "click.bs.tab.data-api",
      },
      Ie = "active",
      Se = "> li > .active",
      Ee =
        (((xe = Ae.prototype).show = function () {
          var i = this;
          if (
            !(
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                f(this._element).hasClass(Ie)) ||
              f(this._element).hasClass("disabled")
            )
          ) {
            var t,
              n,
              e = f(this._element).closest(".nav, .list-group")[0],
              s = g.getSelectorFromElement(this._element);
            if (e) {
              var o =
                "UL" === e.nodeName || "OL" === e.nodeName ? Se : ".active";
              n = (n = f.makeArray(f(e).find(o)))[n.length - 1];
            }
            var r = f.Event(Te.HIDE, { relatedTarget: this._element }),
              a = f.Event(Te.SHOW, { relatedTarget: n });
            if (
              (n && f(n).trigger(r),
                f(this._element).trigger(a),
                !a.isDefaultPrevented() && !r.isDefaultPrevented())
            ) {
              s && (t = document.querySelector(s)),
                this._activate(this._element, e);
              var l = function () {
                var t = f.Event(Te.HIDDEN, { relatedTarget: i._element }),
                  e = f.Event(Te.SHOWN, { relatedTarget: n });
                f(n).trigger(t), f(i._element).trigger(e);
              };
              t ? this._activate(t, t.parentNode, l) : l();
            }
          }
        }),
          (xe.dispose = function () {
            f.removeData(this._element, Ce), (this._element = null);
          }),
          (xe._activate = function (t, e, i) {
            function n() {
              return s._transitionComplete(t, o, i);
            }
            var s = this,
              o = (
                !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                  ? f(e).children(".active")
                  : f(e).find(Se)
              )[0],
              r = i && o && f(o).hasClass("fade");
            if (o && r) {
              var a = g.getTransitionDurationFromElement(o);
              f(o)
                .removeClass("show")
                .one(g.TRANSITION_END, n)
                .emulateTransitionEnd(a);
            } else n();
          }),
          (xe._transitionComplete = function (t, e, i) {
            if (e) {
              f(e).removeClass(Ie);
              var n = f(e.parentNode).find("> .dropdown-menu .active")[0];
              n && f(n).removeClass(Ie),
                "tab" === e.getAttribute("role") &&
                e.setAttribute("aria-selected", !1);
            }
            if (
              (f(t).addClass(Ie),
                "tab" === t.getAttribute("role") &&
                t.setAttribute("aria-selected", !0),
                g.reflow(t),
                f(t).addClass("show"),
                t.parentNode && f(t.parentNode).hasClass("dropdown-menu"))
            ) {
              var s = f(t).closest(".dropdown")[0];
              if (s) {
                var o = [].slice.call(s.querySelectorAll(".dropdown-toggle"));
                f(o).addClass(Ie);
              }
              t.setAttribute("aria-expanded", !0);
            }
            i && i();
          }),
          (Ae._jQueryInterface = function (i) {
            return this.each(function () {
              var t = f(this),
                e = t.data(Ce);
              if (
                (e || ((e = new Ae(this)), t.data(Ce, e)), "string" == typeof i)
              ) {
                if (void 0 === e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i]();
              }
            });
          }),
          o(Ae, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
          ]),
          Ae);
    function Ae(t) {
      this._element = t;
    }
    f(document).on(
      Te.CLICK_DATA_API,
      '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      function (t) {
        t.preventDefault(), Ee._jQueryInterface.call(f(this), "show");
      }
    ),
      (f.fn.tab = Ee._jQueryInterface),
      (f.fn.tab.Constructor = Ee),
      (f.fn.tab.noConflict = function () {
        return (f.fn.tab = De), Ee._jQueryInterface;
      });
    var Pe,
      je = "toast",
      Oe = "bs.toast",
      Ne = "." + Oe,
      Me = f.fn[je],
      He = {
        CLICK_DISMISS: "click.dismiss" + Ne,
        HIDE: "hide" + Ne,
        HIDDEN: "hidden" + Ne,
        SHOW: "show" + Ne,
        SHOWN: "shown" + Ne,
      },
      ze = "show",
      We = { animation: "boolean", autohide: "boolean", delay: "number" },
      Le = { animation: !0, autohide: !0, delay: 500 },
      Re =
        (((Pe = Fe.prototype).show = function () {
          var t = this;
          function e() {
            t._element.classList.remove("showing"),
              t._element.classList.add(ze),
              f(t._element).trigger(He.SHOWN),
              t._config.autohide && t.hide();
          }
          if (
            (f(this._element).trigger(He.SHOW),
              this._config.animation && this._element.classList.add("fade"),
              this._element.classList.remove("hide"),
              this._element.classList.add("showing"),
              this._config.animation)
          ) {
            var i = g.getTransitionDurationFromElement(this._element);
            f(this._element).one(g.TRANSITION_END, e).emulateTransitionEnd(i);
          } else e();
        }),
          (Pe.hide = function (t) {
            var e = this;
            this._element.classList.contains(ze) &&
              (f(this._element).trigger(He.HIDE),
                t
                  ? this._close()
                  : (this._timeout = setTimeout(function () {
                    e._close();
                  }, this._config.delay)));
          }),
          (Pe.dispose = function () {
            clearTimeout(this._timeout),
              (this._timeout = null),
              this._element.classList.contains(ze) &&
              this._element.classList.remove(ze),
              f(this._element).off(He.CLICK_DISMISS),
              f.removeData(this._element, Oe),
              (this._element = null),
              (this._config = null);
          }),
          (Pe._getConfig = function (t) {
            return (
              (t = r(
                {},
                Le,
                f(this._element).data(),
                "object" == typeof t && t ? t : {}
              )),
              g.typeCheckConfig(je, t, this.constructor.DefaultType),
              t
            );
          }),
          (Pe._setListeners = function () {
            var t = this;
            f(this._element).on(
              He.CLICK_DISMISS,
              '[data-dismiss="toast"]',
              function () {
                return t.hide(!0);
              }
            );
          }),
          (Pe._close = function () {
            function t() {
              e._element.classList.add("hide"), f(e._element).trigger(He.HIDDEN);
            }
            var e = this;
            if ((this._element.classList.remove(ze), this._config.animation)) {
              var i = g.getTransitionDurationFromElement(this._element);
              f(this._element).one(g.TRANSITION_END, t).emulateTransitionEnd(i);
            } else t();
          }),
          (Fe._jQueryInterface = function (i) {
            return this.each(function () {
              var t = f(this),
                e = t.data(Oe);
              if (
                (e ||
                  ((e = new Fe(this, "object" == typeof i && i)), t.data(Oe, e)),
                  "string" == typeof i)
              ) {
                if (void 0 === e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i](this);
              }
            });
          }),
          o(Fe, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.2.1";
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return We;
              },
            },
          ]),
          Fe);
    function Fe(t, e) {
      (this._element = t),
        (this._config = this._getConfig(e)),
        (this._timeout = null),
        this._setListeners();
    }
    (f.fn[je] = Re._jQueryInterface),
      (f.fn[je].Constructor = Re),
      (f.fn[je].noConflict = function () {
        return (f.fn[je] = Me), Re._jQueryInterface;
      }),
      (function () {
        if (void 0 === f)
          throw new TypeError(
            "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
          );
        var t = f.fn.jquery.split(" ")[0].split(".");
        if (
          (t[0] < 2 && t[1] < 9) ||
          (1 === t[0] && 9 === t[1] && t[2] < 1) ||
          4 <= t[0]
        )
          throw new Error(
            "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
          );
      })(),
      (t.Util = g),
      (t.Alert = d),
      (t.Button = D),
      (t.Carousel = R),
      (t.Collapse = et),
      (t.Dropdown = _t),
      (t.Modal = Ot),
      (t.Popover = ae),
      (t.Scrollspy = be),
      (t.Tab = Ee),
      (t.Toast = Re),
      (t.Tooltip = Xt),
      Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  (function (l) {
    "use strict";
    var p = {
      cache: {},
      support: {},
      objects: {},
      init: function (e) {
        return this.each(function () {
          l(this)
            .unbind("click.lightcase")
            .bind("click.lightcase", function (t) {
              t.preventDefault(), l(this).lightcase("start", e);
            });
        });
      },
      start: function (t) {
        (p.origin = lightcase.origin = this),
          (p.settings = lightcase.settings =
            l.extend(
              !0,
              {
                idPrefix: "lightcase-",
                classPrefix: "lightcase-",
                attrPrefix: "lc-",
                transition: "elastic",
                transitionOpen: null,
                transitionClose: null,
                transitionIn: null,
                transitionOut: null,
                cssTransitions: !0,
                speedIn: 250,
                speedOut: 250,
                width: null,
                height: null,
                maxWidth: 800,
                maxHeight: 500,
                forceWidth: !1,
                forceHeight: !1,
                liveResize: !0,
                fullScreenModeForMobile: !0,
                mobileMatchExpression:
                  /(iphone|ipod|ipad|android|blackberry|symbian)/,
                disableShrink: !1,
                fixedRatio: !0,
                shrinkFactor: 0.75,
                overlayOpacity: 0.9,
                slideshow: !1,
                slideshowAutoStart: !0,
                breakBeforeShow: !1,
                timeout: 5e3,
                swipe: !0,
                useKeys: !0,
                useCategories: !0,
                useAsCollection: !1,
                navigateEndless: !0,
                closeOnOverlayClick: !0,
                title: null,
                caption: null,
                showTitle: !0,
                showCaption: !0,
                showSequenceInfo: !0,
                inline: { width: "auto", height: "auto" },
                ajax: {
                  width: "auto",
                  height: "auto",
                  type: "get",
                  dataType: "html",
                  data: {},
                },
                iframe: { width: 800, height: 500, frameborder: 0 },
                flash: { width: 400, height: 205, wmode: "transparent" },
                video: {
                  width: 400,
                  height: 225,
                  poster: "",
                  preload: "auto",
                  controls: !0,
                  autobuffer: !0,
                  autoplay: !0,
                  loop: !1,
                },
                attr: "data-rel",
                href: null,
                type: null,
                typeMapping: {
                  image: "jpg,jpeg,gif,png,bmp",
                  flash: "swf",
                  video: "mp4,mov,ogv,ogg,webm",
                  iframe: "html,php",
                  ajax: "json,txt",
                  inline: "#",
                },
                errorMessage: function () {
                  return (
                    '<p class="' +
                    p.settings.classPrefix +
                    'error">' +
                    p.settings.labels.errorMessage +
                    "</p>"
                  );
                },
                labels: {
                  errorMessage: "Source could not be found...",
                  "sequenceInfo.of": " of ",
                  close: "Close",
                  "navigator.prev": "Prev",
                  "navigator.next": "Next",
                  "navigator.play": "Play",
                  "navigator.pause": "Pause",
                },
                markup: function () {
                  p.objects.body.append(
                    (p.objects.overlay = l(
                      '<div id="' + p.settings.idPrefix + 'overlay"></div>'
                    )),
                    (p.objects.loading = l(
                      '<div id="' +
                      p.settings.idPrefix +
                      'loading" class="' +
                      p.settings.classPrefix +
                      'icon-spin"></div>'
                    )),
                    (p.objects.case = l(
                      '<div id="' +
                      p.settings.idPrefix +
                      'case" aria-hidden="true" role="dialog"></div>'
                    ))
                  ),
                    p.objects.case.after(
                      (p.objects.close = l(
                        '<a href="#" class="' +
                        p.settings.classPrefix +
                        'icon-close"><span>' +
                        p.settings.labels.close +
                        "</span></a>"
                      )),
                      (p.objects.nav = l(
                        '<div id="' + p.settings.idPrefix + 'nav"></div>'
                      ))
                    ),
                    p.objects.nav.append(
                      (p.objects.prev = l(
                        '<a href="#" class="' +
                        p.settings.classPrefix +
                        'icon-prev"><span>' +
                        p.settings.labels["navigator.prev"] +
                        "</span></a>"
                      ).hide()),
                      (p.objects.next = l(
                        '<a href="#" class="' +
                        p.settings.classPrefix +
                        'icon-next"><span>' +
                        p.settings.labels["navigator.next"] +
                        "</span></a>"
                      ).hide()),
                      (p.objects.play = l(
                        '<a href="#" class="' +
                        p.settings.classPrefix +
                        'icon-play"><span>' +
                        p.settings.labels["navigator.play"] +
                        "</span></a>"
                      ).hide()),
                      (p.objects.pause = l(
                        '<a href="#" class="' +
                        p.settings.classPrefix +
                        'icon-pause"><span>' +
                        p.settings.labels["navigator.pause"] +
                        "</span></a>"
                      ).hide())
                    ),
                    p.objects.case.append(
                      (p.objects.content = l(
                        '<div id="' + p.settings.idPrefix + 'content"></div>'
                      )),
                      (p.objects.info = l(
                        '<div id="' + p.settings.idPrefix + 'info"></div>'
                      ))
                    ),
                    p.objects.content.append(
                      (p.objects.contentInner = l(
                        '<div class="' +
                        p.settings.classPrefix +
                        'contentInner"></div>'
                      ))
                    ),
                    p.objects.info.append(
                      (p.objects.sequenceInfo = l(
                        '<div id="' +
                        p.settings.idPrefix +
                        'sequenceInfo"></div>'
                      )),
                      (p.objects.title = l(
                        '<h4 id="' + p.settings.idPrefix + 'title"></h4>'
                      )),
                      (p.objects.caption = l(
                        '<p id="' + p.settings.idPrefix + 'caption"></p>'
                      ))
                    );
                },
                onInit: {},
                onStart: {},
                onBeforeCalculateDimensions: {},
                onAfterCalculateDimensions: {},
                onBeforeShow: {},
                onFinish: {},
                onResize: {},
                onClose: {},
                onCleanup: {},
              },
              t,
              p.origin.data ? p.origin.data("lc-options") : {}
            )),
          (p.objects.document = l("html")),
          (p.objects.body = l("body")),
          p._callHooks(p.settings.onInit),
          (p.objectData = p._setObjectData(this)),
          p._addElements(),
          p._open(),
          (p.dimensions = p.getViewportDimensions());
      },
      get: function (t) {
        return p.objects[t];
      },
      getObjectData: function () {
        return p.objectData;
      },
      _setObjectData: function (t) {
        var e = l(t),
          i = {
            this: l(t),
            title:
              p.settings.title ||
              e.attr(p._prefixAttributeName("title")) ||
              e.attr("title"),
            caption:
              p.settings.caption ||
              e.attr(p._prefixAttributeName("caption")) ||
              e.children("img").attr("alt"),
            url: p._determineUrl(),
            requestType: p.settings.ajax.type,
            requestData: p.settings.ajax.data,
            requestDataType: p.settings.ajax.dataType,
            rel: e.attr(p._determineAttributeSelector()),
            type: p.settings.type || p._verifyDataType(p._determineUrl()),
            isPartOfSequence:
              p.settings.useAsCollection ||
              p._isPartOfSequence(e.attr(p.settings.attr), ":"),
            isPartOfSequenceWithSlideshow: p._isPartOfSequence(
              e.attr(p.settings.attr),
              ":slideshow"
            ),
            currentIndex: l(p._determineAttributeSelector()).index(e),
            sequenceLength: l(p._determineAttributeSelector()).length,
          };
        return (
          (i.sequenceInfo =
            i.currentIndex +
            1 +
            p.settings.labels["sequenceInfo.of"] +
            i.sequenceLength),
          (i.prevIndex = i.currentIndex - 1),
          (i.nextIndex = i.currentIndex + 1),
          i
        );
      },
      _prefixAttributeName: function (t) {
        return "data-" + p.settings.attrPrefix + t;
      },
      _determineLinkTarget: function () {
        return (
          p.settings.href ||
          l(p.origin).attr(p._prefixAttributeName("href")) ||
          l(p.origin).attr("href")
        );
      },
      _determineAttributeSelector: function () {
        var t = l(p.origin),
          i = "";
        if (void 0 !== p.cache.selector) i = p.cache.selector;
        else if (
          !0 === p.settings.useCategories &&
          t.attr(p._prefixAttributeName("categories"))
        ) {
          var e = t.attr(p._prefixAttributeName("categories")).split(" ");
          l.each(e, function (t, e) {
            0 < t && (i += ","),
              (i +=
                "[" + p._prefixAttributeName("categories") + '~="' + e + '"]');
          });
        } else
          i = "[" + p.settings.attr + '="' + t.attr(p.settings.attr) + '"]';
        return (p.cache.selector = i);
      },
      _determineUrl: function () {
        var s,
          t = p._verifyDataUrl(p._determineLinkTarget()),
          o = 0,
          r = 0,
          a = "";
        return (
          l.each(t, function (t, e) {
            switch (p._verifyDataType(e.url)) {
              case "video":
                var i = document.createElement("video"),
                  n =
                    p._verifyDataType(e.url) + "/" + p._getFileUrlSuffix(e.url);
                "probably" !== a &&
                  a !== i.canPlayType(n) &&
                  "" !== i.canPlayType(n) &&
                  ((a = i.canPlayType(n)), (s = e.url));
                break;
              default:
                p._devicePixelRatio() >= e.density &&
                  e.density >= r &&
                  p._matchMedia()("screen and (min-width:" + e.width + "px)")
                    .matches &&
                  e.width >= o &&
                  ((o = e.width), (r = e.density), (s = e.url));
            }
          }),
          s
        );
      },
      _normalizeUrl: function (t) {
        var a = /^\d+$/;
        return t.split(",").map(function (t) {
          var r = { width: 0, density: 0 };
          return (
            t
              .trim()
              .split(/\s+/)
              .forEach(function (t, e) {
                if (0 === e) return (r.url = t);
                var i = t.substring(0, t.length - 1),
                  n = t[t.length - 1],
                  s = parseInt(i, 10),
                  o = parseFloat(i);
                "w" === n && a.test(i)
                  ? (r.width = s)
                  : "h" === n && a.test(i)
                    ? (r.height = s)
                    : "x" !== n || isNaN(o) || (r.density = o);
              }),
            r
          );
        });
      },
      _isPartOfSequence: function (t, e) {
        var i = l("[" + p.settings.attr + '="' + t + '"]');
        return new RegExp(e).test(t) && 1 < i.length;
      },
      isSlideshowEnabled: function () {
        return (
          p.objectData.isPartOfSequence &&
          (!0 === p.settings.slideshow ||
            !0 === p.objectData.isPartOfSequenceWithSlideshow)
        );
      },
      _loadContent: function () {
        p.cache.originalObject && p._restoreObject(), p._createObject();
      },
      _createObject: function () {
        var i;
        switch (p.objectData.type) {
          case "image":
            (i = l(new Image())).attr({
              src: p.objectData.url,
              alt: p.objectData.title,
            });
            break;
          case "inline":
            (i = l(
              '<div class="' + p.settings.classPrefix + 'inlineWrap"></div>'
            )).html(p._cloneObject(l(p.objectData.url))),
              l.each(p.settings.inline, function (t, e) {
                i.attr(p._prefixAttributeName(t), e);
              });
            break;
          case "ajax":
            (i = l(
              '<div class="' + p.settings.classPrefix + 'inlineWrap"></div>'
            )),
              l.each(p.settings.ajax, function (t, e) {
                "data" !== t && i.attr(p._prefixAttributeName(t), e);
              });
            break;
          case "flash":
            (i = l(
              '<embed src="' +
              p.objectData.url +
              '" type="application/x-shockwave-flash"></embed>'
            )),
              l.each(p.settings.flash, function (t, e) {
                i.attr(t, e);
              });
            break;
          case "video":
            (i = l("<video></video>")).attr("src", p.objectData.url),
              l.each(p.settings.video, function (t, e) {
                i.attr(t, e);
              });
            break;
          default:
            (i = l("<iframe></iframe>")).attr({ src: p.objectData.url }),
              l.each(p.settings.iframe, function (t, e) {
                i.attr(t, e);
              });
        }
        p._addObject(i), p._loadObject(i);
      },
      _addObject: function (t) {
        p.objects.contentInner.html(t),
          p._loading("start"),
          p._callHooks(p.settings.onStart),
          !0 === p.settings.showSequenceInfo && p.objectData.isPartOfSequence
            ? (p.objects.sequenceInfo.html(p.objectData.sequenceInfo),
              p.objects.sequenceInfo.show())
            : (p.objects.sequenceInfo.empty(), p.objects.sequenceInfo.hide()),
          !0 === p.settings.showTitle &&
            void 0 !== p.objectData.title &&
            "" !== p.objectData.title
            ? (p.objects.title.html(p.objectData.title), p.objects.title.show())
            : (p.objects.title.empty(), p.objects.title.hide()),
          !0 === p.settings.showCaption &&
            void 0 !== p.objectData.caption &&
            "" !== p.objectData.caption
            ? (p.objects.caption.html(p.objectData.caption),
              p.objects.caption.show())
            : (p.objects.caption.empty(), p.objects.caption.hide());
      },
      _loadObject: function (n) {
        switch (p.objectData.type) {
          case "inline":
            l(p.objectData.url) ? p._showContent(n) : p.error();
            break;
          case "ajax":
            l.ajax(
              l.extend({}, p.settings.ajax, {
                url: p.objectData.url,
                type: p.objectData.requestType,
                dataType: p.objectData.requestDataType,
                data: p.objectData.requestData,
                success: function (t, e, i) {
                  i.getResponseHeader("X-Ajax-Location")
                    ? ((p.objectData.url =
                      i.getResponseHeader("X-Ajax-Location")),
                      p._loadObject(n))
                    : ("json" === p.objectData.requestDataType
                      ? (p.objectData.data = t)
                      : n.html(t),
                      p._showContent(n));
                },
                error: function (t, e, i) {
                  p.error();
                },
              })
            );
            break;
          case "flash":
            p._showContent(n);
            break;
          case "video":
            "function" == typeof n.get(0).canPlayType ||
              0 === p.objects.case.find("video").length
              ? p._showContent(n)
              : p.error();
            break;
          default:
            p.objectData.url
              ? (n.on("load", function () {
                p._showContent(n);
              }),
                n.on("error", function () {
                  p.error();
                }))
              : p.error();
        }
      },
      error: function () {
        p.objectData.type = "error";
        var t = l(
          '<div class="' + p.settings.classPrefix + 'inlineWrap"></div>'
        );
        t.html(p.settings.errorMessage),
          p.objects.contentInner.html(t),
          p._showContent(p.objects.contentInner);
      },
      _calculateDimensions: function (t) {
        if ((p._cleanupDimensions(), t)) {
          var e = {
            ratio: 1,
            objectWidth: t.attr("width")
              ? t.attr("width")
              : t.attr(p._prefixAttributeName("width")),
            objectHeight: t.attr("height")
              ? t.attr("height")
              : t.attr(p._prefixAttributeName("height")),
          };
          if (!p.settings.disableShrink)
            switch (
            ((e.maxWidth = parseInt(
              p.dimensions.windowWidth * p.settings.shrinkFactor
            )),
              (e.maxHeight = parseInt(
                p.dimensions.windowHeight * p.settings.shrinkFactor
              )),
              e.maxWidth > p.settings.maxWidth &&
              (e.maxWidth = p.settings.maxWidth),
              e.maxHeight > p.settings.maxHeight &&
              (e.maxHeight = p.settings.maxHeight),
              (e.differenceWidthAsPercent = parseInt(
                (100 / e.maxWidth) * e.objectWidth
              )),
              (e.differenceHeightAsPercent = parseInt(
                (100 / e.maxHeight) * e.objectHeight
              )),
              p.objectData.type)
            ) {
              case "image":
              case "flash":
              case "video":
              case "iframe":
              case "ajax":
              case "inline":
                if (
                  "image" === p.objectData.type ||
                  !0 === p.settings.fixedRatio
                ) {
                  100 < e.differenceWidthAsPercent &&
                    e.differenceWidthAsPercent > e.differenceHeightAsPercent &&
                    ((e.objectWidth = e.maxWidth),
                      (e.objectHeight = parseInt(
                        (e.objectHeight / e.differenceWidthAsPercent) * 100
                      ))),
                    100 < e.differenceHeightAsPercent &&
                    e.differenceHeightAsPercent >
                    e.differenceWidthAsPercent &&
                    ((e.objectWidth = parseInt(
                      (e.objectWidth / e.differenceHeightAsPercent) * 100
                    )),
                      (e.objectHeight = e.maxHeight)),
                    100 < e.differenceHeightAsPercent &&
                    e.differenceWidthAsPercent <
                    e.differenceHeightAsPercent &&
                    ((e.objectWidth = parseInt(
                      (e.maxWidth / e.differenceHeightAsPercent) *
                      e.differenceWidthAsPercent
                    )),
                      (e.objectHeight = e.maxHeight));
                  break;
                }
              case "error":
                !isNaN(e.objectWidth) &&
                  e.objectWidth > e.maxWidth &&
                  (e.objectWidth = e.maxWidth);
                break;
              default:
                (isNaN(e.objectWidth) || e.objectWidth > e.maxWidth) &&
                  !p.settings.forceWidth &&
                  (e.objectWidth = e.maxWidth),
                  ((isNaN(e.objectHeight) && "auto" !== e.objectHeight) ||
                    e.objectHeight > e.maxHeight) &&
                  !p.settings.forceHeight &&
                  (e.objectHeight = e.maxHeight);
            }
          if (p.settings.forceWidth) {
            try {
              e.objectWidth = p.settings[p.objectData.type].width;
            } catch (t) {
              e.objectWidth = p.settings.width || e.objectWidth;
            }
            e.maxWidth = null;
          }
          if (
            (t.attr(p._prefixAttributeName("max-width")) &&
              (e.maxWidth = t.attr(p._prefixAttributeName("max-width"))),
              p.settings.forceHeight)
          ) {
            try {
              e.objectHeight = p.settings[p.objectData.type].height;
            } catch (t) {
              e.objectHeight = p.settings.height || e.objectHeight;
            }
            e.maxHeight = null;
          }
          t.attr(p._prefixAttributeName("max-height")) &&
            (e.maxHeight = t.attr(p._prefixAttributeName("max-height"))),
            p._adjustDimensions(t, e);
        }
      },
      _adjustDimensions: function (t, e) {
        t.css({
          width: e.objectWidth,
          height: e.objectHeight,
          "max-width": e.maxWidth,
          "max-height": e.maxHeight,
        }),
          p.objects.contentInner.css({
            width: t.outerWidth(),
            height: t.outerHeight(),
            "max-width": "100%",
          }),
          p.objects.case.css({
            width: p.objects.contentInner.outerWidth(),
            "max-width": "100%",
          }),
          p.objects.case.css({
            "margin-top": parseInt(-p.objects.case.outerHeight() / 2),
            "margin-left": parseInt(-p.objects.case.outerWidth() / 2),
          });
      },
      _loading: function (t) {
        "start" === t
          ? (p.objects.case.addClass(p.settings.classPrefix + "loading"),
            p.objects.loading.show())
          : "end" === t &&
          (p.objects.case.removeClass(p.settings.classPrefix + "loading"),
            p.objects.loading.hide());
      },
      getViewportDimensions: function () {
        return {
          windowWidth: l(window).innerWidth(),
          windowHeight: l(window).innerHeight(),
        };
      },
      _verifyDataUrl: function (t) {
        return (
          !(!t || void 0 === t || "" === t) &&
          (-1 < t.indexOf("#") && (t = "#" + (t = t.split("#"))[t.length - 1]),
            p._normalizeUrl(t.toString()))
        );
      },
      _getFileUrlSuffix: function (t) {
        return /(?:\.([^.]+))?$/.exec(t.toLowerCase())[1];
      },
      _verifyDataType: function (t) {
        var e = p.settings.typeMapping;
        if (!t) return !1;
        for (var i in e)
          if (e.hasOwnProperty(i))
            for (var n = e[i].split(","), s = 0; s < n.length; s++) {
              var o = n[s].toLowerCase(),
                r = new RegExp(".(" + o + ")$", "i"),
                a = t.toLowerCase().split("?")[0].substr(-5);
              if (!0 === r.test(a) || ("inline" === i && -1 < t.indexOf(o)))
                return i;
            }
        return "iframe";
      },
      _addElements: function () {
        (void 0 !== p.objects.case &&
          l("#" + p.objects.case.attr("id")).length) ||
          p.settings.markup();
      },
      _showContent: function (t) {
        p.objects.document.attr(
          p._prefixAttributeName("type"),
          p.objectData.type
        ),
          (p.cache.object = t),
          p._callHooks(p.settings.onBeforeShow),
          p.settings.breakBeforeShow || p.show();
      },
      _startInTransition: function () {
        switch (p.transition.in()) {
          case "scrollTop":
          case "scrollRight":
          case "scrollBottom":
          case "scrollLeft":
          case "scrollHorizontal":
          case "scrollVertical":
            p.transition.scroll(p.objects.case, "in", p.settings.speedIn),
              p.transition.fade(
                p.objects.contentInner,
                "in",
                p.settings.speedIn
              );
            break;
          case "elastic":
            p.objects.case.css("opacity") < 1 &&
              (p.transition.zoom(p.objects.case, "in", p.settings.speedIn),
                p.transition.fade(
                  p.objects.contentInner,
                  "in",
                  p.settings.speedIn
                ));
          case "fade":
          case "fadeInline":
            p.transition.fade(p.objects.case, "in", p.settings.speedIn),
              p.transition.fade(
                p.objects.contentInner,
                "in",
                p.settings.speedIn
              );
            break;
          default:
            p.transition.fade(p.objects.case, "in", 0);
        }
        p._loading("end"),
          (p.isBusy = !1),
          p.cache.firstOpened || (p.cache.firstOpened = p.objectData.this),
          p.objects.info.hide(),
          setTimeout(function () {
            p.transition.fade(p.objects.info, "in", p.settings.speedIn);
          }, p.settings.speedIn),
          p._callHooks(p.settings.onFinish);
      },
      _processContent: function () {
        switch (
        ((p.isBusy = !0),
          p.transition.fade(p.objects.info, "out", 0),
          p.settings.transitionOut)
        ) {
          case "scrollTop":
          case "scrollRight":
          case "scrollBottom":
          case "scrollLeft":
          case "scrollVertical":
          case "scrollHorizontal":
            p.objects.case.is(":hidden")
              ? (p.transition.fade(p.objects.contentInner, "out", 0),
                p.transition.fade(p.objects.case, "out", 0, 0, function () {
                  p._loadContent();
                }))
              : p.transition.scroll(
                p.objects.case,
                "out",
                p.settings.speedOut,
                function () {
                  p._loadContent();
                }
              );
            break;
          case "fade":
            p.objects.case.is(":hidden")
              ? p.transition.fade(p.objects.case, "out", 0, 0, function () {
                p._loadContent();
              })
              : p.transition.fade(
                p.objects.case,
                "out",
                p.settings.speedOut,
                0,
                function () {
                  p._loadContent();
                }
              );
            break;
          case "fadeInline":
          case "elastic":
            p.objects.case.is(":hidden")
              ? p.transition.fade(p.objects.case, "out", 0, 0, function () {
                p._loadContent();
              })
              : p.transition.fade(
                p.objects.contentInner,
                "out",
                p.settings.speedOut,
                0,
                function () {
                  p._loadContent();
                }
              );
            break;
          default:
            p.transition.fade(p.objects.case, "out", 0, 0, function () {
              p._loadContent();
            });
        }
      },
      _handleEvents: function () {
        p._unbindEvents(),
          p.objects.nav.children().not(p.objects.close).hide(),
          p.isSlideshowEnabled() &&
          ((!0 !== p.settings.slideshowAutoStart && !p.isSlideshowStarted) ||
            p.objects.nav.hasClass(p.settings.classPrefix + "paused")
            ? p._stopTimeout()
            : p._startTimeout()),
          p.settings.liveResize && p._watchResizeInteraction(),
          p.objects.close.click(function (t) {
            t.preventDefault(), p.close();
          }),
          !0 === p.settings.closeOnOverlayClick &&
          p.objects.overlay.css("cursor", "pointer").click(function (t) {
            t.preventDefault(), p.close();
          }),
          !0 === p.settings.useKeys && p._addKeyEvents(),
          p.objectData.isPartOfSequence &&
          (p.objects.nav.attr(p._prefixAttributeName("ispartofsequence"), !0),
            p.objects.nav.data("items", p._setNavigation()),
            p.objects.prev.click(function (t) {
              t.preventDefault(),
                (!0 !== p.settings.navigateEndless && p.item.isFirst()) ||
                (p.objects.prev.unbind("click"),
                  (p.cache.action = "prev"),
                  p.objects.nav.data("items").prev.click(),
                  p.isSlideshowEnabled() && p._stopTimeout());
            }),
            p.objects.next.click(function (t) {
              t.preventDefault(),
                (!0 !== p.settings.navigateEndless && p.item.isLast()) ||
                (p.objects.next.unbind("click"),
                  (p.cache.action = "next"),
                  p.objects.nav.data("items").next.click(),
                  p.isSlideshowEnabled() && p._stopTimeout());
            }),
            p.isSlideshowEnabled() &&
            (p.objects.play.click(function (t) {
              t.preventDefault(), p._startTimeout();
            }),
              p.objects.pause.click(function (t) {
                t.preventDefault(), p._stopTimeout();
              })),
            !0 === p.settings.swipe &&
            (l.isPlainObject(l.event.special.swipeleft) &&
              p.objects.case.on("swipeleft", function (t) {
                t.preventDefault(),
                  p.objects.next.click(),
                  p.isSlideshowEnabled() && p._stopTimeout();
              }),
              l.isPlainObject(l.event.special.swiperight) &&
              p.objects.case.on("swiperight", function (t) {
                t.preventDefault(),
                  p.objects.prev.click(),
                  p.isSlideshowEnabled() && p._stopTimeout();
              })));
      },
      _addKeyEvents: function () {
        l(document).bind("keyup.lightcase", function (t) {
          if (!p.isBusy)
            switch (t.keyCode) {
              case 27:
                p.objects.close.click();
                break;
              case 37:
                p.objectData.isPartOfSequence && p.objects.prev.click();
                break;
              case 39:
                p.objectData.isPartOfSequence && p.objects.next.click();
            }
        });
      },
      _startTimeout: function () {
        (p.isSlideshowStarted = !0),
          p.objects.play.hide(),
          p.objects.pause.show(),
          (p.cache.action = "next"),
          p.objects.nav.removeClass(p.settings.classPrefix + "paused"),
          (p.timeout = setTimeout(function () {
            p.objects.nav.data("items").next.click();
          }, p.settings.timeout));
      },
      _stopTimeout: function () {
        p.objects.play.show(),
          p.objects.pause.hide(),
          p.objects.nav.addClass(p.settings.classPrefix + "paused"),
          clearTimeout(p.timeout);
      },
      _setNavigation: function () {
        var t = l(p.cache.selector || p.settings.attr),
          e = p.objectData.sequenceLength - 1,
          i = {
            prev: t.eq(p.objectData.prevIndex),
            next: t.eq(p.objectData.nextIndex),
          };
        return (
          0 < p.objectData.currentIndex
            ? p.objects.prev.show()
            : (i.prevItem = t.eq(e)),
          p.objectData.nextIndex <= e
            ? p.objects.next.show()
            : (i.next = t.eq(0)),
          !0 === p.settings.navigateEndless &&
          (p.objects.prev.show(), p.objects.next.show()),
          i
        );
      },
      item: {
        isFirst: function () {
          return 0 === p.objectData.currentIndex;
        },
        isFirstOpened: function () {
          return p.objectData.this.is(p.cache.firstOpened);
        },
        isLast: function () {
          return p.objectData.currentIndex === p.objectData.sequenceLength - 1;
        },
      },
      _cloneObject: function (t) {
        var e = t.clone(),
          i = t.attr("id");
        return (
          t.is(":hidden")
            ? (p._cacheObjectData(t),
              t.attr("id", p.settings.idPrefix + "temp-" + i).empty())
            : e.removeAttr("id"),
          e.show()
        );
      },
      isMobileDevice: function () {
        return !!navigator.userAgent
          .toLowerCase()
          .match(p.settings.mobileMatchExpression);
      },
      isTransitionSupported: function () {
        var t = p.objects.body.get(0),
          e = !1,
          i = {
            transition: "",
            WebkitTransition: "-webkit-",
            MozTransition: "-moz-",
            OTransition: "-o-",
            MsTransition: "-ms-",
          };
        for (var n in i)
          i.hasOwnProperty(n) &&
            n in t.style &&
            ((p.support.transition = i[n]), (e = !0));
        return e;
      },
      transition: {
        in: function () {
          return p.settings.transitionOpen && !p.cache.firstOpened
            ? p.settings.transitionOpen
            : p.settings.transitionIn;
        },
        fade: function (t, e, i, n, s) {
          var o = "in" === e,
            r = {},
            a = t.css("opacity"),
            l = {},
            h = n || (o ? 1 : 0);
          (!p.isOpen && o) ||
            ((r.opacity = a),
              (l.opacity = h),
              t.css(p.support.transition + "transition", "none"),
              t.css(r).show(),
              p.support.transitions
                ? ((l[p.support.transition + "transition"] = i + "ms ease"),
                  setTimeout(function () {
                    t.css(l),
                      setTimeout(function () {
                        t.css(p.support.transition + "transition", ""),
                          !s || (!p.isOpen && o) || s();
                      }, i);
                  }, 15))
                : (t.stop(), t.animate(l, i, s)));
        },
        scroll: function (t, e, i, n) {
          var s = "in" === e,
            o = s ? p.settings.transitionIn : p.settings.transitionOut,
            r = "left",
            a = {},
            l = s ? 0 : 1,
            h = s ? "-50%" : "50%",
            c = {},
            u = s ? 1 : 0,
            d = s ? "50%" : "-50%";
          if (p.isOpen || !s) {
            switch (o) {
              case "scrollTop":
                r = "top";
                break;
              case "scrollRight":
                (h = s ? "150%" : "50%"), (d = s ? "50%" : "150%");
                break;
              case "scrollBottom":
                (r = "top"), (h = s ? "150%" : "50%"), (d = s ? "50%" : "150%");
                break;
              case "scrollHorizontal":
                (h = s ? "150%" : "50%"), (d = s ? "50%" : "-50%");
                break;
              case "scrollVertical":
                (r = "top"), (h = s ? "-50%" : "50%"), (d = s ? "50%" : "150%");
            }
            if ("prev" === p.cache.action)
              switch (o) {
                case "scrollHorizontal":
                  (h = s ? "-50%" : "50%"), (d = s ? "50%" : "150%");
                  break;
                case "scrollVertical":
                  (h = s ? "150%" : "50%"), (d = s ? "50%" : "-50%");
              }
            (a.opacity = l),
              (a[r] = h),
              (c.opacity = u),
              (c[r] = d),
              t.css(p.support.transition + "transition", "none"),
              t.css(a).show(),
              p.support.transitions
                ? ((c[p.support.transition + "transition"] = i + "ms ease"),
                  setTimeout(function () {
                    t.css(c),
                      setTimeout(function () {
                        t.css(p.support.transition + "transition", ""),
                          !n || (!p.isOpen && s) || n();
                      }, i);
                  }, 15))
                : (t.stop(), t.animate(c, i, n));
          }
        },
        zoom: function (t, e, i, n) {
          var s = "in" === e,
            o = {},
            r = t.css("opacity"),
            a = s ? "scale(0.75)" : "scale(1)",
            l = {},
            h = s ? 1 : 0,
            c = s ? "scale(1)" : "scale(0.75)";
          (!p.isOpen && s) ||
            ((o.opacity = r),
              (o[p.support.transition + "transform"] = a),
              (l.opacity = h),
              t.css(p.support.transition + "transition", "none"),
              t.css(o).show(),
              p.support.transitions
                ? ((l[p.support.transition + "transform"] = c),
                  (l[p.support.transition + "transition"] = i + "ms ease"),
                  setTimeout(function () {
                    t.css(l),
                      setTimeout(function () {
                        t.css(p.support.transition + "transform", ""),
                          t.css(p.support.transition + "transition", ""),
                          !n || (!p.isOpen && s) || n();
                      }, i);
                  }, 15))
                : (t.stop(), t.animate(l, i, n)));
        },
      },
      _callHooks: function (t) {
        "object" == typeof t &&
          l.each(t, function (t, e) {
            "function" == typeof e && e.call(p.origin);
          });
      },
      _cacheObjectData: function (t) {
        l.data(t, "cache", { id: t.attr("id"), content: t.html() }),
          (p.cache.originalObject = t);
      },
      _restoreObject: function () {
        var t = l('[id^="' + p.settings.idPrefix + 'temp-"]');
        t.attr("id", l.data(p.cache.originalObject, "cache").id),
          t.html(l.data(p.cache.originalObject, "cache").content);
      },
      resize: function (t, e) {
        p.isOpen &&
          (p.isSlideshowEnabled() && p._stopTimeout(),
            "object" == typeof e &&
            null !== e &&
            (e.width &&
              p.cache.object.attr(p._prefixAttributeName("width"), e.width),
              e.maxWidth &&
              p.cache.object.attr(
                p._prefixAttributeName("max-width"),
                e.maxWidth
              ),
              e.height &&
              p.cache.object.attr(p._prefixAttributeName("height"), e.height),
              e.maxHeight &&
              p.cache.object.attr(
                p._prefixAttributeName("max-height"),
                e.maxHeight
              )),
            (p.dimensions = p.getViewportDimensions()),
            p._calculateDimensions(p.cache.object),
            p._callHooks(p.settings.onResize));
      },
      _watchResizeInteraction: function () {
        l(window).resize(p.resize);
      },
      _unwatchResizeInteraction: function () {
        l(window).off("resize", p.resize);
      },
      _switchToFullScreenMode: function () {
        (p.settings.shrinkFactor = 1),
          (p.settings.overlayOpacity = 1),
          l("html").addClass(p.settings.classPrefix + "fullScreenMode");
      },
      _open: function () {
        switch (
        ((p.isOpen = !0),
          (p.support.transitions =
            !!p.settings.cssTransitions && p.isTransitionSupported()),
          (p.support.mobileDevice = p.isMobileDevice()),
          p.support.mobileDevice &&
          (l("html").addClass(p.settings.classPrefix + "isMobileDevice"),
            p.settings.fullScreenModeForMobile && p._switchToFullScreenMode()),
          p.settings.transitionIn ||
          (p.settings.transitionIn = p.settings.transition),
          p.settings.transitionOut ||
          (p.settings.transitionOut = p.settings.transition),
          p.transition.in())
        ) {
          case "fade":
          case "fadeInline":
          case "elastic":
          case "scrollTop":
          case "scrollRight":
          case "scrollBottom":
          case "scrollLeft":
          case "scrollVertical":
          case "scrollHorizontal":
            p.objects.case.is(":hidden") &&
              (p.objects.close.css("opacity", 0),
                p.objects.overlay.css("opacity", 0),
                p.objects.case.css("opacity", 0),
                p.objects.contentInner.css("opacity", 0)),
              p.transition.fade(
                p.objects.overlay,
                "in",
                p.settings.speedIn,
                p.settings.overlayOpacity,
                function () {
                  p.transition.fade(p.objects.close, "in", p.settings.speedIn),
                    p._handleEvents(),
                    p._processContent();
                }
              );
            break;
          default:
            p.transition.fade(
              p.objects.overlay,
              "in",
              0,
              p.settings.overlayOpacity,
              function () {
                p.transition.fade(p.objects.close, "in", 0),
                  p._handleEvents(),
                  p._processContent();
              }
            );
        }
        p.objects.document.addClass(p.settings.classPrefix + "open"),
          p.objects.case.attr("aria-hidden", "false");
      },
      show: function () {
        p._callHooks(p.settings.onBeforeCalculateDimensions),
          p._calculateDimensions(p.cache.object),
          p._callHooks(p.settings.onAfterCalculateDimensions),
          p._startInTransition();
      },
      close: function () {
        switch (
        ((p.isOpen = !1),
          p.isSlideshowEnabled() &&
          (p._stopTimeout(),
            (p.isSlideshowStarted = !1),
            p.objects.nav.removeClass(p.settings.classPrefix + "paused")),
          p.objects.loading.hide(),
          p._unbindEvents(),
          p._unwatchResizeInteraction(),
          l("html").removeClass(p.settings.classPrefix + "open"),
          p.objects.case.attr("aria-hidden", "true"),
          p.objects.nav.children().hide(),
          p.objects.close.hide(),
          p._callHooks(p.settings.onClose),
          p.transition.fade(p.objects.info, "out", 0),
          p.settings.transitionClose || p.settings.transitionOut)
        ) {
          case "fade":
          case "fadeInline":
          case "scrollTop":
          case "scrollRight":
          case "scrollBottom":
          case "scrollLeft":
          case "scrollHorizontal":
          case "scrollVertical":
            p.transition.fade(
              p.objects.case,
              "out",
              p.settings.speedOut,
              0,
              function () {
                p.transition.fade(
                  p.objects.overlay,
                  "out",
                  p.settings.speedOut,
                  0,
                  function () {
                    p.cleanup();
                  }
                );
              }
            );
            break;
          case "elastic":
            p.transition.zoom(
              p.objects.case,
              "out",
              p.settings.speedOut,
              function () {
                p.transition.fade(
                  p.objects.overlay,
                  "out",
                  p.settings.speedOut,
                  0,
                  function () {
                    p.cleanup();
                  }
                );
              }
            );
            break;
          default:
            p.cleanup();
        }
      },
      _unbindEvents: function () {
        p.objects.overlay.unbind("click"),
          l(document).unbind("keyup.lightcase"),
          p.objects.case.unbind("swipeleft").unbind("swiperight"),
          p.objects.prev.unbind("click"),
          p.objects.next.unbind("click"),
          p.objects.play.unbind("click"),
          p.objects.pause.unbind("click"),
          p.objects.close.unbind("click");
      },
      _cleanupDimensions: function () {
        var t = p.objects.contentInner.css("opacity");
        p.objects.case.css({
          width: "",
          height: "",
          top: "",
          left: "",
          "margin-top": "",
          "margin-left": "",
        }),
          p.objects.contentInner.removeAttr("style").css("opacity", t),
          p.objects.contentInner.children().removeAttr("style");
      },
      cleanup: function () {
        p._cleanupDimensions(),
          p.objects.loading.hide(),
          p.objects.overlay.hide(),
          p.objects.case.hide(),
          p.objects.prev.hide(),
          p.objects.next.hide(),
          p.objects.play.hide(),
          p.objects.pause.hide(),
          p.objects.document.removeAttr(p._prefixAttributeName("type")),
          p.objects.nav.removeAttr(p._prefixAttributeName("ispartofsequence")),
          p.objects.contentInner.empty().hide(),
          p.objects.info.children().empty(),
          p.cache.originalObject && p._restoreObject(),
          p._callHooks(p.settings.onCleanup),
          (p.cache = {});
      },
      _matchMedia: function () {
        return window.matchMedia || window.msMatchMedia;
      },
      _devicePixelRatio: function () {
        return window.devicePixelRatio || 1;
      },
      _isPublicMethod: function (t) {
        return "function" == typeof p[t] && "_" !== t.charAt(0);
      },
      _export: function () {
        (window.lightcase = {}),
          l.each(p, function (t) {
            p._isPublicMethod(t) && (lightcase[t] = p[t]);
          });
      },
    };
    p._export(),
      (l.fn.lightcase = function (t) {
        return p._isPublicMethod(t)
          ? p[t].apply(this, Array.prototype.slice.call(arguments, 1))
          : "object" != typeof t && t
            ? void l.error("Method " + t + " does not exist on jQuery.lightcase")
            : p.init.apply(this, arguments);
      });
  })(jQuery),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define("jquery-bridget/jquery-bridget", ["jquery"], function (t) {
        return i(e, t);
      })
      : "object" == typeof module && module.exports
        ? (module.exports = i(e, require("jquery")))
        : (e.jQueryBridget = i(e, e.jQuery));
  })(window, function (t, e) {
    "use strict";
    function i(h, s, c) {
      (c = c || e || t.jQuery) &&
        (s.prototype.option ||
          (s.prototype.option = function (t) {
            c.isPlainObject(t) &&
              (this.options = c.extend(!0, this.options, t));
          }),
          (c.fn[h] = function (t) {
            return "string" != typeof t
              ? ((function (t, n) {
                t.each(function (t, e) {
                  var i = c.data(e, h);
                  i
                    ? (i.option(n), i._init())
                    : ((i = new s(e, n)), c.data(e, h, i));
                });
              })(this, t),
                this)
              : (function (t, o, r) {
                var a,
                  l = "$()." + h + '("' + o + '")';
                return (
                  t.each(function (t, e) {
                    var i = c.data(e, h);
                    if (i) {
                      var n = i[o];
                      if (n && "_" != o.charAt(0)) {
                        var s = n.apply(i, r);
                        a = void 0 === a ? s : a;
                      } else u(l + " is not a valid method");
                    } else u(h + " not initialized. Cannot call methods, i.e. " + l);
                  }),
                  void 0 !== a ? a : t
                );
              })(this, t, o.call(arguments, 1));
          }),
          n(c));
    }
    function n(t) {
      !t || (t && t.bridget) || (t.bridget = i);
    }
    var o = Array.prototype.slice,
      s = t.console,
      u =
        void 0 === s
          ? function () { }
          : function (t) {
            s.error(t);
          };
    return n(e || t.jQuery), i;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() { }
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], s = 0;
            s < i.length;
            s++
          ) {
            var o = i[s];
            n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", e)
      : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.getSize = e());
  })(window, function () {
    "use strict";
    function v(t) {
      var e = parseFloat(t);
      return -1 == t.indexOf("%") && !isNaN(e) && e;
    }
    function _(t) {
      var e = getComputedStyle(t);
      return (
        e ||
        i(
          "Style returned " +
          e +
          ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
        ),
        e
      );
    }
    function y(t) {
      if (
        ((function () {
          if (!C) {
            C = !0;
            var t = document.createElement("div");
            (t.style.width = "200px"),
              (t.style.padding = "1px 2px 3px 4px"),
              (t.style.borderStyle = "solid"),
              (t.style.borderWidth = "1px 2px 3px 4px"),
              (t.style.boxSizing = "border-box");
            var e = document.body || document.documentElement;
            e.appendChild(t);
            var i = _(t);
            (b = 200 == Math.round(v(i.width))),
              (y.isBoxSizeOuter = b),
              e.removeChild(t);
          }
        })(),
          "string" == typeof t && (t = document.querySelector(t)),
          t && "object" == typeof t && t.nodeType)
      ) {
        var e = _(t);
        if ("none" == e.display)
          return (function () {
            for (
              var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0,
              },
              e = 0;
              e < x;
              e++
            ) {
              t[w[e]] = 0;
            }
            return t;
          })();
        var i = {};
        (i.width = t.offsetWidth), (i.height = t.offsetHeight);
        for (
          var n = (i.isBorderBox = "border-box" == e.boxSizing), s = 0;
          s < x;
          s++
        ) {
          var o = w[s],
            r = e[o],
            a = parseFloat(r);
          i[o] = isNaN(a) ? 0 : a;
        }
        var l = i.paddingLeft + i.paddingRight,
          h = i.paddingTop + i.paddingBottom,
          c = i.marginLeft + i.marginRight,
          u = i.marginTop + i.marginBottom,
          d = i.borderLeftWidth + i.borderRightWidth,
          p = i.borderTopWidth + i.borderBottomWidth,
          f = n && b,
          g = v(e.width);
        !1 !== g && (i.width = g + (f ? 0 : l + d));
        var m = v(e.height);
        return (
          !1 !== m && (i.height = m + (f ? 0 : h + p)),
          (i.innerWidth = i.width - (l + d)),
          (i.innerHeight = i.height - (h + p)),
          (i.outerWidth = i.width + c),
          (i.outerHeight = i.height + u),
          i
        );
      }
    }
    var b,
      i =
        "undefined" == typeof console
          ? function () { }
          : function (t) {
            console.error(t);
          },
      w = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      x = w.length,
      C = !1;
    return y;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var i = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i] + "MatchesSelector";
        if (t[n]) return n;
      }
    })();
    return function (t, e) {
      return t[i](e);
    };
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define(
        "fizzy-ui-utils/utils",
        ["desandro-matches-selector/matches-selector"],
        function (t) {
          return i(e, t);
        }
      )
      : "object" == typeof module && module.exports
        ? (module.exports = i(e, require("desandro-matches-selector")))
        : (e.fizzyUIUtils = i(e, e.matchesSelector));
  })(window, function (h, o) {
    var c = {
      extend: function (t, e) {
        for (var i in e) t[i] = e[i];
        return t;
      },
      modulo: function (t, e) {
        return ((t % e) + e) % e;
      },
    },
      e = Array.prototype.slice;
    (c.makeArray = function (t) {
      return Array.isArray(t)
        ? t
        : null == t
          ? []
          : "object" == typeof t && "number" == typeof t.length
            ? e.call(t)
            : [t];
    }),
      (c.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (c.getParent = function (t, e) {
        for (; t.parentNode && t != document.body;)
          if (((t = t.parentNode), o(t, e))) return t;
      }),
      (c.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (c.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (c.filterFindElements = function (t, n) {
        t = c.makeArray(t);
        var s = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void s.push(t);
              o(t, n) && s.push(t);
              for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++)
                s.push(e[i]);
            }
          }),
          s
        );
      }),
      (c.debounceMethod = function (t, e, n) {
        n = n || 100;
        var s = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          clearTimeout(t);
          var e = arguments,
            i = this;
          this[o] = setTimeout(function () {
            s.apply(i, e), delete i[o];
          }, n);
        };
      }),
      (c.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (c.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var u = h.console;
    return (
      (c.htmlInit = function (a, l) {
        c.docReady(function () {
          var t = c.toDashed(l),
            s = "data-" + t,
            e = document.querySelectorAll("[" + s + "]"),
            i = document.querySelectorAll(".js-" + t),
            n = c.makeArray(e).concat(c.makeArray(i)),
            o = s + "-options",
            r = h.jQuery;
          n.forEach(function (e) {
            var t,
              i = e.getAttribute(s) || e.getAttribute(o);
            try {
              t = i && JSON.parse(i);
            } catch (t) {
              return void (
                u &&
                u.error("Error parsing " + s + " on " + e.className + ": " + t)
              );
            }
            var n = new a(e, t);
            r && r.data(e, l, n);
          });
        });
      }),
      c
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
        "outlayer/item",
        ["ev-emitter/ev-emitter", "get-size/get-size"],
        e
      )
      : "object" == typeof module && module.exports
        ? (module.exports = e(require("ev-emitter"), require("get-size")))
        : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t, e) {
      t &&
        ((this.element = t),
          (this.layout = e),
          (this.position = { x: 0, y: 0 }),
          this._create());
    }
    var n = document.documentElement.style,
      s = "string" == typeof n.transition ? "transition" : "WebkitTransition",
      o = "string" == typeof n.transform ? "transform" : "WebkitTransform",
      r = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[s],
      a = {
        transform: o,
        transition: s,
        transitionDuration: s + "Duration",
        transitionProperty: s + "Property",
        transitionDelay: s + "Delay",
      },
      l = (i.prototype = Object.create(t.prototype));
    (l.constructor = i),
      (l._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (l.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (l.getSize = function () {
        this.size = e(this.element);
      }),
      (l.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          e[a[i] || i] = t[i];
        }
      }),
      (l.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          s = t[i ? "top" : "bottom"],
          o = parseFloat(n),
          r = parseFloat(s),
          a = this.layout.size;
        -1 != n.indexOf("%") && (o = (o / 100) * a.width),
          -1 != s.indexOf("%") && (r = (r / 100) * a.height),
          (o = isNaN(o) ? 0 : o),
          (r = isNaN(r) ? 0 : r),
          (o -= e ? a.paddingLeft : a.paddingRight),
          (r -= i ? a.paddingTop : a.paddingBottom),
          (this.position.x = o),
          (this.position.y = r);
      }),
      (l.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          s = i ? "paddingLeft" : "paddingRight",
          o = i ? "left" : "right",
          r = i ? "right" : "left",
          a = this.position.x + t[s];
        (e[o] = this.getXValue(a)), (e[r] = "");
        var l = n ? "paddingTop" : "paddingBottom",
          h = n ? "top" : "bottom",
          c = n ? "bottom" : "top",
          u = this.position.y + t[l];
        (e[h] = this.getYValue(u)),
          (e[c] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (l.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (l.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (l._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          s = t == this.position.x && e == this.position.y;
        if ((this.setPosition(t, e), !s || this.isTransitioning)) {
          var o = t - i,
            r = e - n,
            a = {};
          (a.transform = this.getTranslate(o, r)),
            this.transition({
              to: a,
              onTransitionEnd: { transform: this.layoutPosition },
              isCleaning: !0,
            });
        } else this.layoutPosition();
      }),
      (l.getTranslate = function (t, e) {
        return (
          "translate3d(" +
          (t = this.layout._getOption("originLeft") ? t : -t) +
          "px, " +
          (e = this.layout._getOption("originTop") ? e : -e) +
          "px, 0)"
        );
      }),
      (l.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (l.moveTo = l._transitionTo),
      (l.setPosition = function (t, e) {
        (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
      }),
      (l._nonTransition = function (t) {
        for (var e in (this.css(t.to),
          t.isCleaning && this._removeStyles(t.to),
          t.onTransitionEnd))
          t.onTransitionEnd[e].call(this);
      }),
      (l.transition = function (t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
          var e = this._transn;
          for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
          for (i in t.to)
            (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
          if (t.from) {
            this.css(t.from);
            this.element.offsetHeight;
            null;
          }
          this.enableTransition(t.to),
            this.css(t.to),
            (this.isTransitioning = !0);
        } else this._nonTransition(t);
      });
    var h =
      "opacity," +
      o.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    (l.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: h,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(r, this, !1);
      }
    }),
      (l.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (l.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var c = { "-webkit-transform": "transform" };
    (l.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = c[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[i],
            (function (t) {
              for (var e in t) return !1;
              return !null;
            })(e.ingProperties) && this.disableTransition(),
            i in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
            i in e.onEnd)
        )
          e.onEnd[i].call(this), delete e.onEnd[i];
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (l.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(r, this, !1),
          (this.isTransitioning = !1);
      }),
      (l._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var u = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (l.removeTransitionStyles = function () {
        this.css(u);
      }),
      (l.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (l.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (l.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
            this.removeElem();
          }),
            void this.hide())
          : void this.removeElem();
      }),
      (l.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {};
        (e[this.getHideRevealTransitionEndProperty("visibleStyle")] =
          this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (l.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (l.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (l.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {};
        (e[this.getHideRevealTransitionEndProperty("hiddenStyle")] =
          this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (l.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (l.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      i
    );
  }),
  (function (s, o) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
        "outlayer/outlayer",
        [
          "ev-emitter/ev-emitter",
          "get-size/get-size",
          "fizzy-ui-utils/utils",
          "./item",
        ],
        function (t, e, i, n) {
          return o(s, t, e, i, n);
        }
      )
      : "object" == typeof module && module.exports
        ? (module.exports = o(
          s,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
        : (s.Outlayer = o(
          s,
          s.EvEmitter,
          s.getSize,
          s.fizzyUIUtils,
          s.Outlayer.Item
        ));
  })(window, function (t, e, s, o, n) {
    "use strict";
    function r(t, e) {
      var i = o.getQueryElement(t);
      if (i) {
        (this.element = i),
          h && (this.$element = h(this.element)),
          (this.options = o.extend({}, this.constructor.defaults)),
          this.option(e);
        var n = ++c;
        (this.element.outlayerGUID = n),
          (u[n] = this)._create(),
          this._getOption("initLayout") && this.layout();
      } else l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || t));
    }
    function a(t) {
      function e() {
        t.apply(this, arguments);
      }
      return ((e.prototype = Object.create(t.prototype)).constructor = e);
    }
    function i() { }
    var l = t.console,
      h = t.jQuery,
      c = 0,
      u = {};
    (r.namespace = "outlayer"),
      (r.Item = n),
      (r.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var d = r.prototype;
    o.extend(d, e.prototype),
      (d.option = function (t) {
        o.extend(this.options, t);
      }),
      (d._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (d._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          o.extend(this.element.style, this.options.containerStyle),
          this._getOption("resize") && this.bindResize();
      }),
      (d.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (d._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
          i = this.constructor.Item,
          n = [],
          s = 0;
          s < e.length;
          s++
        ) {
          var o = new i(e[s], this);
          n.push(o);
        }
        return n;
      }),
      (d._filterFindItemElements = function (t) {
        return o.filterFindElements(t, this.options.itemSelector);
      }),
      (d.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (d.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (d._init = d.layout),
      (d._resetLayout = function () {
        this.getSize();
      }),
      (d.getSize = function () {
        this.size = s(this.element);
      }),
      (d._getMeasurement = function (t, e) {
        var i,
          n = this.options[t];
        n
          ? ("string" == typeof n
            ? (i = this.element.querySelector(n))
            : n instanceof HTMLElement && (i = n),
            (this[t] = i ? s(i)[e] : n))
          : (this[t] = 0);
      }),
      (d.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (d._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (d._layoutItems = function (t, i) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var n = [];
          t.forEach(function (t) {
            var e = this._getItemLayoutPosition(t);
            (e.item = t), (e.isInstant = i || t.isLayoutInstant), n.push(e);
          }, this),
            this._processLayoutQueue(n);
        }
      }),
      (d._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (d._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (d.updateStagger = function () {
        var t = this.options.stagger;
        return null == t
          ? void (this.stagger = 0)
          : ((this.stagger = (function (t) {
            if ("number" == typeof t) return t;
            var e = t.match(/(^\d*\.?\d*)(\w*)/),
              i = e && e[1],
              n = e && e[2];
            return i.length ? (i = parseFloat(i)) * (p[n] || 1) : 0;
          })(t)),
            this.stagger);
      }),
      (d._positionItem = function (t, e, i, n, s) {
        n ? t.goTo(e, i) : (t.stagger(s * this.stagger), t.moveTo(e, i));
      }),
      (d._postLayout = function () {
        this.resizeContainer();
      }),
      (d.resizeContainer = function () {
        if (this._getOption("resizeContainer")) {
          var t = this._getContainerSize();
          t &&
            (this._setContainerMeasure(t.width, !0),
              this._setContainerMeasure(t.height, !1));
        }
      }),
      (d._getContainerSize = i),
      (d._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
              i.paddingRight +
              i.borderLeftWidth +
              i.borderRightWidth
              : i.paddingBottom +
              i.paddingTop +
              i.borderTopWidth +
              i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (d._emitCompleteOnItems = function (e, t) {
        function i() {
          s.dispatchEvent(e + "Complete", null, [t]);
        }
        function n() {
          ++r == o && i();
        }
        var s = this,
          o = t.length;
        if (t && o) {
          var r = 0;
          t.forEach(function (t) {
            t.once(e, n);
          });
        } else i();
      }),
      (d.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            var s = h.Event(e);
            (s.type = t), this.$element.trigger(s, i);
          } else this.$element.trigger(t, i);
      }),
      (d.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (d.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (d.stamp = function (t) {
        (t = this._find(t)) &&
          ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this));
      }),
      (d.unstamp = function (t) {
        (t = this._find(t)) &&
          t.forEach(function (t) {
            o.removeFrom(this.stamps, t), this.unignore(t);
          }, this);
      }),
      (d._find = function (t) {
        if (t)
          return (
            "string" == typeof t && (t = this.element.querySelectorAll(t)),
            o.makeArray(t)
          );
      }),
      (d._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
            this.stamps.forEach(this._manageStamp, this));
      }),
      (d._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (d._manageStamp = i),
      (d._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          i = this._boundingRect,
          n = s(t);
        return {
          left: e.left - i.left - n.marginLeft,
          top: e.top - i.top - n.marginTop,
          right: i.right - e.right - n.marginRight,
          bottom: i.bottom - e.bottom - n.marginBottom,
        };
      }),
      (d.handleEvent = o.handleEvent),
      (d.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (d.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (d.onresize = function () {
        this.resize();
      }),
      o.debounceMethod(r, "onresize", 100),
      (d.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (d.needsResizeLayout = function () {
        var t = s(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth;
      }),
      (d.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (d.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (d.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (d.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var i = this.updateStagger();
          t.forEach(function (t, e) {
            t.stagger(e * i), t.reveal();
          });
        }
      }),
      (d.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var i = this.updateStagger();
          t.forEach(function (t, e) {
            t.stagger(e * i), t.hide();
          });
        }
      }),
      (d.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (d.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (d.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (d.getItems = function (t) {
        t = o.makeArray(t);
        var i = [];
        return (
          t.forEach(function (t) {
            var e = this.getItem(t);
            e && i.push(e);
          }, this),
          i
        );
      }),
      (d.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
          e.length &&
          e.forEach(function (t) {
            t.remove(), o.removeFrom(this.items, t);
          }, this);
      }),
      (d.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete u[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (r.data = function (t) {
        var e = (t = o.getQueryElement(t)) && t.outlayerGUID;
        return e && u[e];
      }),
      (r.create = function (t, e) {
        var i = a(r);
        return (
          (i.defaults = o.extend({}, r.defaults)),
          o.extend(i.defaults, e),
          (i.compatOptions = o.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = a(n)),
          o.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      });
    var p = { ms: 1, s: 1e3 };
    return (r.Item = n), r;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
      : "object" == typeof module && module.exports
        ? (module.exports = e(require("outlayer")))
        : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window, function (t) {
    "use strict";
    function e() {
      t.Item.apply(this, arguments);
    }
    var i = (e.prototype = Object.create(t.Item.prototype)),
      n = i._create;
    (i._create = function () {
      (this.id = this.layout.itemGUID++), n.call(this), (this.sortData = {});
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var n = e[i];
            this.sortData[i] = n(this.element, this);
          }
        }
      });
    var s = i.destroy;
    return (
      (i.destroy = function () {
        s.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
        "isotope-layout/js/layout-mode",
        ["get-size/get-size", "outlayer/outlayer"],
        e
      )
      : "object" == typeof module && module.exports
        ? (module.exports = e(require("get-size"), require("outlayer")))
        : ((t.Isotope = t.Isotope || {}),
          (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (e, i) {
    "use strict";
    function n(t) {
      (this.isotope = t) &&
        ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    var s = n.prototype;
    return (
      [
        "_resetLayout",
        "_getItemLayoutPosition",
        "_manageStamp",
        "_getContainerSize",
        "_getElementOffset",
        "needsResizeLayout",
        "_getOption",
      ].forEach(function (t) {
        s[t] = function () {
          return i.prototype[t].apply(this.isotope, arguments);
        };
      }),
      (s.needsVerticalResizeLayout = function () {
        var t = e(this.isotope.element);
        return (
          this.isotope.size &&
          t &&
          t.innerHeight != this.isotope.size.innerHeight
        );
      }),
      (s._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (s.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (s.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (s.getSegmentSize = function (t, e) {
        var i = t + e,
          n = "outer" + e;
        if ((this._getMeasurement(i, n), !this[i])) {
          var s = this.getFirstItemSize();
          this[i] = (s && s[n]) || this.isotope.size["inner" + e];
        }
      }),
      (s.getFirstItemSize = function () {
        var t = this.isotope.filteredItems[0];
        return t && t.element && e(t.element);
      }),
      (s.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (s.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (n.modes = {}),
      (n.create = function (t, e) {
        function i() {
          n.apply(this, arguments);
        }
        return (
          ((i.prototype = Object.create(s)).constructor = i),
          e && (i.options = e),
          (n.modes[(i.prototype.namespace = t)] = i)
        );
      }),
      n
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
        "masonry-layout/masonry",
        ["outlayer/outlayer", "get-size/get-size"],
        e
      )
      : "object" == typeof module && module.exports
        ? (module.exports = e(require("outlayer"), require("get-size")))
        : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, h) {
    var e = t.create("masonry");
    e.compatOptions.fitWidth = "isFitWidth";
    var i = e.prototype;
    return (
      (i._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (i.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            e = t && t.element;
          this.columnWidth = (e && h(e).outerWidth) || this.containerWidth;
        }
        var i = (this.columnWidth += this.gutter),
          n = this.containerWidth + this.gutter,
          s = n / i,
          o = i - (n % i);
        (s = Math[o && o < 1 ? "round" : "floor"](s)),
          (this.cols = Math.max(s, 1));
      }),
      (i.getContainerWidth = function () {
        var t = this._getOption("fitWidth")
          ? this.element.parentNode
          : this.element,
          e = h(t);
        this.containerWidth = e && e.innerWidth;
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = Math[e && e < 1 ? "round" : "ceil"](
            t.size.outerWidth / this.columnWidth
          );
        i = Math.min(i, this.cols);
        for (
          var n = this[
            this.options.horizontalOrder
              ? "_getHorizontalColPosition"
              : "_getTopColPosition"
          ](i, t),
          s = { x: this.columnWidth * n.col, y: n.y },
          o = n.y + t.size.outerHeight,
          r = i + n.col,
          a = n.col;
          a < r;
          a++
        )
          this.colYs[a] = o;
        return s;
      }),
      (i._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (i._getTopColGroup = function (t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++)
          e[n] = this._getColGroupY(n, t);
        return e;
      }),
      (i._getColGroupY = function (t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (i._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols;
        i = 1 < t && i + t > this.cols ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = n ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (i._manageStamp = function (t) {
        var e = h(t),
          i = this._getElementOffset(t),
          n = this._getOption("originLeft") ? i.left : i.right,
          s = n + e.outerWidth,
          o = Math.floor(n / this.columnWidth);
        o = Math.max(0, o);
        var r = Math.floor(s / this.columnWidth);
        (r -= s % this.columnWidth ? 0 : 1), (r = Math.min(this.cols - 1, r));
        for (
          var a =
            (this._getOption("originTop") ? i.top : i.bottom) + e.outerHeight,
          l = o;
          l <= r;
          l++
        )
          this.colYs[l] = Math.max(a, this.colYs[l]);
      }),
      (i._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
          (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (i._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (i.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
        "isotope-layout/js/layout-modes/masonry",
        ["../layout-mode", "masonry-layout/masonry"],
        e
      )
      : "object" == typeof module && module.exports
        ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
        : e(t.Isotope.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"),
      n = i.prototype,
      s = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var o in e.prototype) s[o] || (n[o] = e.prototype[o]);
    var r = n.measureColumns;
    n.measureColumns = function () {
      (this.items = this.isotope.filteredItems), r.call(this);
    };
    var a = n._getOption;
    return (
      (n._getOption = function (t) {
        return "fitWidth" == t
          ? void 0 !== this.options.isFitWidth
            ? this.options.isFitWidth
            : this.options.fitWidth
          : a.apply(this.isotope, arguments);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : "object" == typeof exports
        ? (module.exports = e(require("../layout-mode")))
        : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("fitRows"),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
        var n = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          n
        );
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e)
      : "object" == typeof module && module.exports
        ? (module.exports = e(require("../layout-mode")))
        : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        this.y = 0;
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e =
          (this.isotope.size.innerWidth - t.size.outerWidth) *
          this.options.horizontalAlignment,
          i = this.y;
        return (this.y += t.size.outerHeight), { x: e, y: i };
      }),
      (i._getContainerSize = function () {
        return { height: this.y };
      }),
      e
    );
  }),
  (function (r, a) {
    "function" == typeof define && define.amd
      ? define(
        [
          "outlayer/outlayer",
          "get-size/get-size",
          "desandro-matches-selector/matches-selector",
          "fizzy-ui-utils/utils",
          "isotope-layout/js/item",
          "isotope-layout/js/layout-mode",
          "isotope-layout/js/layout-modes/masonry",
          "isotope-layout/js/layout-modes/fit-rows",
          "isotope-layout/js/layout-modes/vertical",
        ],
        function (t, e, i, n, s, o) {
          return a(r, t, e, i, n, s, o);
        }
      )
      : "object" == typeof module && module.exports
        ? (module.exports = a(
          r,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("isotope-layout/js/item"),
          require("isotope-layout/js/layout-mode"),
          require("isotope-layout/js/layout-modes/masonry"),
          require("isotope-layout/js/layout-modes/fit-rows"),
          require("isotope-layout/js/layout-modes/vertical")
        ))
        : (r.Isotope = a(
          r,
          r.Outlayer,
          r.getSize,
          r.matchesSelector,
          r.fizzyUIUtils,
          r.Isotope.Item,
          r.Isotope.LayoutMode
        ));
  })(window, function (t, i, e, n, o, s, r) {
    var a = t.jQuery,
      l = String.prototype.trim
        ? function (t) {
          return t.trim();
        }
        : function (t) {
          return t.replace(/^\s+|\s+$/g, "");
        },
      h = i.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (h.Item = s), (h.LayoutMode = r);
    var c = h.prototype;
    (c._create = function () {
      for (var t in ((this.itemGUID = 0),
        (this._sorters = {}),
        this._getSorters(),
        i.prototype._create.call(this),
        (this.modes = {}),
        (this.filteredItems = this.items),
        (this.sortHistory = ["original-order"]),
        r.modes))
        this._initLayoutMode(t);
    }),
      (c.reloadItems = function () {
        (this.itemGUID = 0), i.prototype.reloadItems.call(this);
      }),
      (c._itemize = function () {
        for (
          var t = i.prototype._itemize.apply(this, arguments), e = 0;
          e < t.length;
          e++
        ) {
          t[e].id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
      }),
      (c._initLayoutMode = function (t) {
        var e = r.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? o.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (c.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout")
          ? void this.arrange()
          : void this._layout();
      }),
      (c._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (c.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        (this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant
            ? this._noTransition(this._hideReveal, [e])
            : this._hideReveal(e),
          this._sort(),
          this._layout();
      }),
      (c._init = c.arrange),
      (c._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide);
      }),
      (c._getIsInstant = function () {
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        return (this._isInstant = e);
      }),
      (c._bindArrangeComplete = function () {
        function t() {
          e &&
            i &&
            n &&
            s.dispatchEvent("arrangeComplete", null, [s.filteredItems]);
        }
        var e,
          i,
          n,
          s = this;
        this.once("layoutComplete", function () {
          (e = !0), t();
        }),
          this.once("hideComplete", function () {
            (i = !0), t();
          }),
          this.once("revealComplete", function () {
            (n = !0), t();
          });
      }),
      (c._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [], n = [], s = [], o = this._getFilterTest(e), r = 0;
          r < t.length;
          r++
        ) {
          var a = t[r];
          if (!a.isIgnored) {
            var l = o(a);
            l && i.push(a),
              l && a.isHidden ? n.push(a) : l || a.isHidden || s.push(a);
          }
        }
        return { matches: i, needReveal: n, needHide: s };
      }),
      (c._getFilterTest = function (e) {
        return a && this.options.isJQueryFiltering
          ? function (t) {
            return a(t.element).is(e);
          }
          : "function" == typeof e
            ? function (t) {
              return e(t.element);
            }
            : function (t) {
              return n(t.element, e);
            };
      }),
      (c.updateSortData = function (t) {
        var e;
        (e = t ? ((t = o.makeArray(t)), this.getItems(t)) : this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (c._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = u(i);
        }
      }),
      (c._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
          t[i].updateSortData();
        }
      });
    var u = function (t) {
      if ("string" != typeof t) return t;
      var e = l(t).split(" "),
        i = e[0],
        n = i.match(/^\[(.+)\]$/),
        s = (function (e, i) {
          return e
            ? function (t) {
              return t.getAttribute(e);
            }
            : function (t) {
              var e = t.querySelector(i);
              return e && e.textContent;
            };
        })(n && n[1], i),
        o = h.sortDataParsers[e[1]];
      return o
        ? function (t) {
          return t && o(s(t));
        }
        : function (t) {
          return t && s(t);
        };
    };
    (h.sortDataParsers = {
      parseInt: function (t) {
        return parseInt(t, 10);
      },
      parseFloat: function (t) {
        return parseFloat(t);
      },
    }),
      (c._sort = function () {
        if (this.options.sortBy) {
          var t = o.makeArray(this.options.sortBy);
          this._getIsSameSortBy(t) ||
            (this.sortHistory = t.concat(this.sortHistory));
          var e = (function (r, a) {
            return function (t, e) {
              for (var i = 0; i < r.length; i++) {
                var n = r[i],
                  s = t.sortData[n],
                  o = e.sortData[n];
                if (o < s || s < o)
                  return (
                    (o < s ? 1 : -1) * ((void 0 !== a[n] ? a[n] : a) ? 1 : -1)
                  );
              }
              return 0;
            };
          })(this.sortHistory, this.options.sortAscending);
          this.filteredItems.sort(e);
        }
      }),
      (c._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++)
          if (t[e] != this.sortHistory[e]) return !1;
        return !0;
      }),
      (c._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (c._resetLayout = function () {
        i.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (c._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (c._manageStamp = function (t) {
        this._mode()._manageStamp(t);
      }),
      (c._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (c.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (c.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i = this._filterRevealAdded(e);
          this.filteredItems = this.filteredItems.concat(i);
        }
      }),
      (c.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          this._resetLayout(), this._manageStamps();
          var i = this._filterRevealAdded(e);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items));
        }
      }),
      (c._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (c.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i,
            n,
            s = e.length;
          for (i = 0; i < s; i++)
            (n = e[i]), this.element.appendChild(n.element);
          var o = this._filter(e).matches;
          for (i = 0; i < s; i++) e[i].isLayoutInstant = !0;
          for (this.arrange(), i = 0; i < s; i++) delete e[i].isLayoutInstant;
          this.reveal(o);
        }
      });
    var d = c.remove;
    return (
      (c.remove = function (t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        d.call(this, t);
        for (var i = e && e.length, n = 0; i && n < i; n++) {
          var s = e[n];
          o.removeFrom(this.filteredItems, s);
        }
      }),
      (c.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
          this.items[t].sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (c._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return (this.options.transitionDuration = i), n;
      }),
      (c.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element;
        });
      }),
      h
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() { }
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], s = 0;
            s < i.length;
            s++
          ) {
            var o = i[s];
            n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (e, i) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (t) {
        return i(e, t);
      })
      : "object" == typeof module && module.exports
        ? (module.exports = i(e, require("ev-emitter")))
        : (e.imagesLoaded = i(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function s(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function o(t, e, i) {
      if (!(this instanceof o)) return new o(t, e, i);
      var n = t;
      return (
        "string" == typeof t && (n = document.querySelectorAll(t)),
        n
          ? ((this.elements = (function (t) {
            return Array.isArray(t)
              ? t
              : "object" == typeof t && "number" == typeof t.length
                ? l.call(t)
                : [t];
          })(n)),
            (this.options = s({}, this.options)),
            "function" == typeof e ? (i = e) : s(this.options, e),
            i && this.on("always", i),
            this.getImages(),
            r && (this.jqDeferred = new r.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error("Bad element for imagesLoaded " + (n || t))
      );
    }
    function i(t) {
      this.img = t;
    }
    function n(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    var r = e.jQuery,
      a = e.console,
      l = Array.prototype.slice;
    ((o.prototype = Object.create(t.prototype)).options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t),
          !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && h[e]) {
          for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var s = i[n];
            this.addImage(s);
          }
          if ("string" == typeof this.options.background) {
            var o = t.querySelectorAll(this.options.background);
            for (n = 0; n < o.length; n++) {
              var r = o[n];
              this.addElementBackgroundImages(r);
            }
          }
        }
      });
    var h = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage);
            null !== n;

          ) {
            var s = n && n[2];
            s && this.addBackground(s, t), (n = i.exec(e.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (t) {
        var e = new i(t);
        this.images.push(e);
      }),
      (o.prototype.addBackground = function (t, e) {
        var i = new n(t, e);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(t, e, i) {
          setTimeout(function () {
            n.progress(t, e, i);
          });
        }
        var n = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
              t.once("progress", e), t.check();
            })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
          this.jqDeferred.notify &&
          this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, t, e);
      }),
      (o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
            this.emitEvent(t, [this]),
            this.emitEvent("always", [this]),
            this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this);
        }
      }),
      ((i.prototype = Object.create(t.prototype)).check = function () {
        return this.getIsImageComplete()
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (i.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (i.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
      }),
      (i.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (i.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (i.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      ((n.prototype = Object.create(i.prototype)).check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents());
      }),
      (n.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (n.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery) &&
          ((r = t).fn.imagesLoaded = function (t, e) {
            return new o(this, t, e).jqDeferred.promise(r(this));
          });
      }),
      o.makeJQueryPlugin(),
      o
    );
  }),
  (function (t, e) {
    if ("function" == typeof define && define.amd)
      define(["module", "exports"], e);
    else if ("undefined" != typeof exports) e(module, exports);
    else {
      var i = { exports: {} };
      e(i, i.exports), (t.WOW = i.exports);
    }
  })(this, function (t, e) {
    "use strict";
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function s(t, e) {
      return 0 <= e.indexOf(t);
    }
    function n(t, e, i) {
      null != t.addEventListener
        ? t.addEventListener(e, i, !1)
        : null != t.attachEvent
          ? t.attachEvent("on" + e, i)
          : (t[e] = i);
    }
    function o(t, e, i) {
      null != t.removeEventListener
        ? t.removeEventListener(e, i, !1)
        : null != t.detachEvent
          ? t.detachEvent("on" + e, i)
          : delete t[e];
    }
    Object.defineProperty(e, "__esModule", { value: !0 });
    var r,
      a,
      l = function (t, e, i) {
        return e && m(t.prototype, e), i && m(t, i), t;
      },
      h =
        window.WeakMap ||
        window.MozWeakMap ||
        (l(g, [
          {
            key: "get",
            value: function (t) {
              for (var e = 0; e < this.keys.length; e++)
                if (this.keys[e] === t) return this.values[e];
            },
          },
          {
            key: "set",
            value: function (t, e) {
              for (var i = 0; i < this.keys.length; i++)
                if (this.keys[i] === t) return (this.values[i] = e), this;
              return this.keys.push(t), this.values.push(e), this;
            },
          },
        ]),
          g),
      c =
        window.MutationObserver ||
        window.WebkitMutationObserver ||
        window.MozMutationObserver ||
        (l(f, [{ key: "observe", value: function () { } }]),
          (a = r = f),
          (r.notSupported = !0),
          a),
      u =
        window.getComputedStyle ||
        function (i) {
          var n = /(\-([a-z]){1})/g;
          return {
            getPropertyValue: function (t) {
              "float" === t && (t = "styleFloat"),
                n.test(t) &&
                t.replace(n, function (t, e) {
                  return e.toUpperCase();
                });
              var e = i.currentStyle;
              return (null != e ? e[t] : void 0) || null;
            },
          };
        },
      d =
        (l(p, [
          {
            key: "init",
            value: function () {
              (this.element = window.document.documentElement),
                s(document.readyState, ["interactive", "complete"])
                  ? this.start()
                  : n(document, "DOMContentLoaded", this.start),
                (this.finished = []);
            },
          },
          {
            key: "start",
            value: function () {
              var o = this;
              if (
                ((this.stopped = !1),
                  (this.boxes = [].slice.call(
                    this.element.querySelectorAll("." + this.config.boxClass)
                  )),
                  (this.all = this.boxes.slice(0)),
                  this.boxes.length)
              )
                if (this.disabled()) this.resetStyle();
                else
                  for (var t = 0; t < this.boxes.length; t++) {
                    var e = this.boxes[t];
                    this.applyStyle(e, !0);
                  }
              this.disabled() ||
                (n(
                  this.config.scrollContainer || window,
                  "scroll",
                  this.scrollHandler
                ),
                  n(window, "resize", this.scrollHandler),
                  (this.interval = setInterval(this.scrollCallback, 50))),
                this.config.live &&
                new c(function (t) {
                  for (var e = 0; e < t.length; e++)
                    for (var i = t[e], n = 0; n < i.addedNodes.length; n++) {
                      var s = i.addedNodes[n];
                      o.doSync(s);
                    }
                }).observe(document.body, { childList: !0, subtree: !0 });
            },
          },
          {
            key: "stop",
            value: function () {
              (this.stopped = !0),
                o(
                  this.config.scrollContainer || window,
                  "scroll",
                  this.scrollHandler
                ),
                o(window, "resize", this.scrollHandler),
                null != this.interval && clearInterval(this.interval);
            },
          },
          {
            key: "sync",
            value: function () {
              c.notSupported && this.doSync(this.element);
            },
          },
          {
            key: "doSync",
            value: function (t) {
              if ((null != t || (t = this.element), 1 === t.nodeType))
                for (
                  var e = (t = t.parentNode || t).querySelectorAll(
                    "." + this.config.boxClass
                  ),
                  i = 0;
                  i < e.length;
                  i++
                ) {
                  var n = e[i];
                  s(n, this.all) ||
                    (this.boxes.push(n),
                      this.all.push(n),
                      this.stopped || this.disabled()
                        ? this.resetStyle()
                        : this.applyStyle(n, !0),
                      (this.scrolled = !0));
                }
            },
          },
          {
            key: "show",
            value: function (t) {
              return (
                this.applyStyle(t),
                (t.className = t.className + " " + this.config.animateClass),
                null != this.config.callback && this.config.callback(t),
                (function (t, e) {
                  null != t.dispatchEvent
                    ? t.dispatchEvent(e)
                    : e in (null != t)
                      ? t[e]()
                      : "on" + e in (null != t) && t["on" + e]();
                })(t, this.wowEvent),
                this.config.resetAnimation &&
                (n(t, "animationend", this.resetAnimation),
                  n(t, "oanimationend", this.resetAnimation),
                  n(t, "webkitAnimationEnd", this.resetAnimation),
                  n(t, "MSAnimationEnd", this.resetAnimation)),
                t
              );
            },
          },
          {
            key: "applyStyle",
            value: function (t, e) {
              var i = this,
                n = t.getAttribute("data-wow-duration"),
                s = t.getAttribute("data-wow-delay"),
                o = t.getAttribute("data-wow-iteration");
              return this.animate(function () {
                return i.customStyle(t, e, n, s, o);
              });
            },
          },
          {
            key: "resetStyle",
            value: function () {
              for (var t = 0; t < this.boxes.length; t++)
                this.boxes[t].style.visibility = "visible";
            },
          },
          {
            key: "resetAnimation",
            value: function (t) {
              if (0 <= t.type.toLowerCase().indexOf("animationend")) {
                var e = t.target || t.srcElement;
                e.className = e.className
                  .replace(this.config.animateClass, "")
                  .trim();
              }
            },
          },
          {
            key: "customStyle",
            value: function (t, e, i, n, s) {
              return (
                e && this.cacheAnimationName(t),
                (t.style.visibility = e ? "hidden" : "visible"),
                i && this.vendorSet(t.style, { animationDuration: i }),
                n && this.vendorSet(t.style, { animationDelay: n }),
                s && this.vendorSet(t.style, { animationIterationCount: s }),
                this.vendorSet(t.style, {
                  animationName: e ? "none" : this.cachedAnimationName(t),
                }),
                t
              );
            },
          },
          {
            key: "vendorSet",
            value: function (t, e) {
              for (var i in e)
                if (e.hasOwnProperty(i)) {
                  var n = e[i];
                  t["" + i] = n;
                  for (var s = 0; s < this.vendors.length; s++)
                    t[
                      "" +
                      this.vendors[s] +
                      i.charAt(0).toUpperCase() +
                      i.substr(1)
                    ] = n;
                }
            },
          },
          {
            key: "vendorCSS",
            value: function (t, e) {
              for (
                var i = u(t), n = i.getPropertyCSSValue(e), s = 0;
                s < this.vendors.length;
                s++
              ) {
                var o = this.vendors[s];
                n = n || i.getPropertyCSSValue("-" + o + "-" + e);
              }
              return n;
            },
          },
          {
            key: "animationName",
            value: function (e) {
              var i = void 0;
              try {
                i = this.vendorCSS(e, "animation-name").cssText;
              } catch (t) {
                i = u(e).getPropertyValue("animation-name");
              }
              return "none" === i ? "" : i;
            },
          },
          {
            key: "cacheAnimationName",
            value: function (t) {
              return this.animationNameCache.set(t, this.animationName(t));
            },
          },
          {
            key: "cachedAnimationName",
            value: function (t) {
              return this.animationNameCache.get(t);
            },
          },
          {
            key: "scrollHandler",
            value: function () {
              this.scrolled = !0;
            },
          },
          {
            key: "scrollCallback",
            value: function () {
              if (this.scrolled) {
                this.scrolled = !1;
                for (var t = [], e = 0; e < this.boxes.length; e++) {
                  var i = this.boxes[e];
                  if (i) {
                    if (this.isVisible(i)) {
                      this.show(i);
                      continue;
                    }
                    t.push(i);
                  }
                }
                (this.boxes = t),
                  this.boxes.length || this.config.live || this.stop();
              }
            },
          },
          {
            key: "offsetTop",
            value: function (t) {
              for (; void 0 === t.offsetTop;) t = t.parentNode;
              for (var e = t.offsetTop; t.offsetParent;)
                e += (t = t.offsetParent).offsetTop;
              return e;
            },
          },
          {
            key: "isVisible",
            value: function (t) {
              var e = t.getAttribute("data-wow-offset") || this.config.offset,
                i =
                  (this.config.scrollContainer &&
                    this.config.scrollContainer.scrollTop) ||
                  window.pageYOffset,
                n =
                  i +
                  Math.min(
                    this.element.clientHeight,
                    "innerHeight" in window
                      ? window.innerHeight
                      : document.documentElement.clientHeight
                  ) -
                  e,
                s = this.offsetTop(t),
                o = s + t.clientHeight;
              return s <= n && i <= o;
            },
          },
          {
            key: "disabled",
            value: function () {
              return (
                !this.config.mobile &&
                (function (t) {
                  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    t
                  );
                })(navigator.userAgent)
              );
            },
          },
        ]),
          p);
    function p() {
      var t =
        arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      i(this, p),
        (this.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
          scrollContainer: null,
          resetAnimation: !0,
        }),
        (this.animate =
          "requestAnimationFrame" in window
            ? function (t) {
              return window.requestAnimationFrame(t);
            }
            : function (t) {
              return t();
            }),
        (this.vendors = ["moz", "webkit"]),
        (this.start = this.start.bind(this)),
        (this.resetAnimation = this.resetAnimation.bind(this)),
        (this.scrollHandler = this.scrollHandler.bind(this)),
        (this.scrollCallback = this.scrollCallback.bind(this)),
        (this.scrolled = !0),
        (this.config = (function (t, e) {
          for (var i in e)
            if (null == t[i]) {
              var n = e[i];
              t[i] = n;
            }
          return t;
        })(t, this.defaults)),
        null != t.scrollContainer &&
        (this.config.scrollContainer = document.querySelector(
          t.scrollContainer
        )),
        (this.animationNameCache = new h()),
        (this.wowEvent = (function (t, e, i, n) {
          var s = !(arguments.length <= 1 || void 0 === e) && e,
            o = !(arguments.length <= 2 || void 0 === i) && i,
            r = arguments.length <= 3 || void 0 === n ? null : n,
            a = void 0;
          return (
            null != document.createEvent
              ? (a = document.createEvent("CustomEvent")).initCustomEvent(
                t,
                s,
                o,
                r
              )
              : null != document.createEventObject
                ? ((a = document.createEventObject()).eventType = t)
                : (a.eventName = t),
            a
          );
        })(this.config.boxClass));
    }
    function f() {
      i(this, f),
        "undefined" != typeof console &&
        null !== console &&
        (console.warn("MutationObserver is not supported by your browser."),
          console.warn(
            "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
          ));
    }
    function g() {
      i(this, g), (this.keys = []), (this.values = []);
    }
    function m(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    (e.default = d), (t.exports = e.default);
  }),
  (function (l, i, s, a) {
    function h(t, e) {
      (this.settings = null),
        (this.options = l.extend({}, h.Defaults, e)),
        (this.$element = l(t)),
        (this._handlers = {}),
        (this._plugins = {}),
        (this._supress = {}),
        (this._current = null),
        (this._speed = null),
        (this._coordinates = []),
        (this._breakpoint = null),
        (this._width = null),
        (this._items = []),
        (this._clones = []),
        (this._mergers = []),
        (this._widths = []),
        (this._invalidated = {}),
        (this._pipe = []),
        (this._drag = {
          time: null,
          target: null,
          pointer: null,
          stage: { start: null, current: null },
          direction: null,
        }),
        (this._states = {
          current: {},
          tags: {
            initializing: ["busy"],
            animating: ["busy"],
            dragging: ["interacting"],
          },
        }),
        l.each(
          ["onResize", "onThrottledResize"],
          l.proxy(function (t, e) {
            this._handlers[e] = l.proxy(this[e], this);
          }, this)
        ),
        l.each(
          h.Plugins,
          l.proxy(function (t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
          }, this)
        ),
        l.each(
          h.Workers,
          l.proxy(function (t, e) {
            this._pipe.push({ filter: e.filter, run: l.proxy(e.run, this) });
          }, this)
        ),
        this.setup(),
        this.initialize();
    }
    (h.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      rewind: !1,
      checkVisibility: !0,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: i,
      fallbackEasing: "swing",
      slideTransition: "",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      refreshClass: "owl-refresh",
      loadedClass: "owl-loaded",
      loadingClass: "owl-loading",
      rtlClass: "owl-rtl",
      responsiveClass: "owl-responsive",
      dragClass: "owl-drag",
      itemClass: "owl-item",
      stageClass: "owl-stage",
      stageOuterClass: "owl-stage-outer",
      grabClass: "owl-grab",
    }),
      (h.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
      (h.Type = { Event: "event", State: "state" }),
      (h.Plugins = {}),
      (h.Workers = [
        {
          filter: ["width", "settings"],
          run: function () {
            this._width = this.$element.width();
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            t.current =
              this._items && this._items[this.relative(this._current)];
          },
        },
        {
          filter: ["items", "settings"],
          run: function () {
            this.$stage.children(".cloned").remove();
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            var e = this.settings.margin || "",
              i = !this.settings.autoWidth,
              n = this.settings.rtl,
              s = {
                width: "auto",
                "margin-left": n ? e : "",
                "margin-right": n ? "" : e,
              };
            i || this.$stage.children().css(s), (t.css = s);
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            var e =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
              i = null,
              n = this._items.length,
              s = !this.settings.autoWidth,
              o = [];
            for (t.items = { merge: !1, width: e }; n--;)
              (i = this._mergers[n]),
                (i =
                  (this.settings.mergeFit &&
                    Math.min(i, this.settings.items)) ||
                  i),
                (t.items.merge = 1 < i || t.items.merge),
                (o[n] = s ? e * i : this._items[n].width());
            this._widths = o;
          },
        },
        {
          filter: ["items", "settings"],
          run: function () {
            var t = [],
              e = this._items,
              i = this.settings,
              n = Math.max(2 * i.items, 4),
              s = 2 * Math.ceil(e.length / 2),
              o = i.loop && e.length ? (i.rewind ? n : Math.max(n, s)) : 0,
              r = "",
              a = "";
            for (o /= 2; 0 < o;)
              t.push(this.normalize(t.length / 2, !0)),
                (r += e[t[t.length - 1]][0].outerHTML),
                t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)),
                (a = e[t[t.length - 1]][0].outerHTML + a),
                (o -= 1);
            (this._clones = t),
              l(r).addClass("cloned").appendTo(this.$stage),
              l(a).addClass("cloned").prependTo(this.$stage);
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function () {
            for (
              var t = this.settings.rtl ? 1 : -1,
              e = this._clones.length + this._items.length,
              i = -1,
              n = 0,
              s = 0,
              o = [];
              ++i < e;

            )
              (n = o[i - 1] || 0),
                (s = this._widths[this.relative(i)] + this.settings.margin),
                o.push(n + s * t);
            this._coordinates = o;
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function () {
            var t = this.settings.stagePadding,
              e = this._coordinates,
              i = {
                width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                "padding-left": t || "",
                "padding-right": t || "",
              };
            this.$stage.css(i);
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            var e = this._coordinates.length,
              i = !this.settings.autoWidth,
              n = this.$stage.children();
            if (i && t.items.merge)
              for (; e--;)
                (t.css.width = this._widths[this.relative(e)]),
                  n.eq(e).css(t.css);
            else i && ((t.css.width = t.items.width), n.css(t.css));
          },
        },
        {
          filter: ["items"],
          run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style");
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            (t.current = t.current
              ? this.$stage.children().index(t.current)
              : 0),
              (t.current = Math.max(
                this.minimum(),
                Math.min(this.maximum(), t.current)
              )),
              this.reset(t.current);
          },
        },
        {
          filter: ["position"],
          run: function () {
            this.animate(this.coordinates(this._current));
          },
        },
        {
          filter: ["width", "position", "items", "settings"],
          run: function () {
            var t,
              e,
              i,
              n,
              s = this.settings.rtl ? 1 : -1,
              o = 2 * this.settings.stagePadding,
              r = this.coordinates(this.current()) + o,
              a = r + this.width() * s,
              l = [];
            for (i = 0, n = this._coordinates.length; i < n; i++)
              (t = this._coordinates[i - 1] || 0),
                (e = Math.abs(this._coordinates[i]) + o * s),
                ((this.op(t, "<=", r) && this.op(t, ">", a)) ||
                  (this.op(e, "<", r) && this.op(e, ">", a))) &&
                l.push(i);
            this.$stage.children(".active").removeClass("active"),
              this.$stage
                .children(":eq(" + l.join("), :eq(") + ")")
                .addClass("active"),
              this.$stage.children(".center").removeClass("center"),
              this.settings.center &&
              this.$stage.children().eq(this.current()).addClass("center");
          },
        },
      ]),
      (h.prototype.initializeStage = function () {
        (this.$stage = this.$element.find("." + this.settings.stageClass)),
          this.$stage.length ||
          (this.$element.addClass(this.options.loadingClass),
            (this.$stage = l("<" + this.settings.stageElement + ">", {
              class: this.settings.stageClass,
            }).wrap(l("<div/>", { class: this.settings.stageOuterClass }))),
            this.$element.append(this.$stage.parent()));
      }),
      (h.prototype.initializeItems = function () {
        var t = this.$element.find(".owl-item");
        if (t.length)
          return (
            (this._items = t.get().map(function (t) {
              return l(t);
            })),
            (this._mergers = this._items.map(function () {
              return 1;
            })),
            void this.refresh()
          );
        this.replace(this.$element.children().not(this.$stage.parent())),
          this.isVisible() ? this.refresh() : this.invalidate("width"),
          this.$element
            .removeClass(this.options.loadingClass)
            .addClass(this.options.loadedClass);
      }),
      (h.prototype.initialize = function () {
        var t, e, i;
        this.enter("initializing"),
          this.trigger("initialize"),
          this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
          this.settings.autoWidth &&
          !this.is("pre-loading") &&
          ((t = this.$element.find("img")),
            (e = this.settings.nestedItemSelector
              ? "." + this.settings.nestedItemSelector
              : a),
            (i = this.$element.children(e).width()),
            t.length && i <= 0 && this.preloadAutoWidthImages(t));
        this.initializeStage(),
          this.initializeItems(),
          this.registerEventHandlers(),
          this.leave("initializing"),
          this.trigger("initialized");
      }),
      (h.prototype.isVisible = function () {
        return !this.settings.checkVisibility || this.$element.is(":visible");
      }),
      (h.prototype.setup = function () {
        var e = this.viewport(),
          t = this.options.responsive,
          i = -1,
          n = null;
        t
          ? (l.each(t, function (t) {
            t <= e && i < t && (i = Number(t));
          }),
            "function" ==
            typeof (n = l.extend({}, this.options, t[i])).stagePadding &&
            (n.stagePadding = n.stagePadding()),
            delete n.responsive,
            n.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + i
                )
            ))
          : (n = l.extend({}, this.options)),
          this.trigger("change", { property: { name: "settings", value: n } }),
          (this._breakpoint = i),
          (this.settings = n),
          this.invalidate("settings"),
          this.trigger("changed", {
            property: { name: "settings", value: this.settings },
          });
      }),
      (h.prototype.optionsLogic = function () {
        this.settings.autoWidth &&
          ((this.settings.stagePadding = !1), (this.settings.merge = !1));
      }),
      (h.prototype.prepare = function (t) {
        var e = this.trigger("prepare", { content: t });
        return (
          e.data ||
          (e.data = l("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(t)),
          this.trigger("prepared", { content: e.data }),
          e.data
        );
      }),
      (h.prototype.update = function () {
        for (
          var t = 0,
          e = this._pipe.length,
          i = l.proxy(function (t) {
            return this[t];
          }, this._invalidated),
          n = {};
          t < e;

        )
          (this._invalidated.all ||
            0 < l.grep(this._pipe[t].filter, i).length) &&
            this._pipe[t].run(n),
            t++;
        (this._invalidated = {}), this.is("valid") || this.enter("valid");
      }),
      (h.prototype.width = function (t) {
        switch ((t = t || h.Width.Default)) {
          case h.Width.Inner:
          case h.Width.Outer:
            return this._width;
          default:
            return (
              this._width -
              2 * this.settings.stagePadding +
              this.settings.margin
            );
        }
      }),
      (h.prototype.refresh = function () {
        this.enter("refreshing"),
          this.trigger("refresh"),
          this.setup(),
          this.optionsLogic(),
          this.$element.addClass(this.options.refreshClass),
          this.update(),
          this.$element.removeClass(this.options.refreshClass),
          this.leave("refreshing"),
          this.trigger("refreshed");
      }),
      (h.prototype.onThrottledResize = function () {
        i.clearTimeout(this.resizeTimer),
          (this.resizeTimer = i.setTimeout(
            this._handlers.onResize,
            this.settings.responsiveRefreshRate
          ));
      }),
      (h.prototype.onResize = function () {
        return (
          !!this._items.length &&
          this._width !== this.$element.width() &&
          !!this.isVisible() &&
          (this.enter("resizing"),
            this.trigger("resize").isDefaultPrevented()
              ? (this.leave("resizing"), !1)
              : (this.invalidate("width"),
                this.refresh(),
                this.leave("resizing"),
                void this.trigger("resized")))
        );
      }),
      (h.prototype.registerEventHandlers = function () {
        l.support.transition &&
          this.$stage.on(
            l.support.transition.end + ".owl.core",
            l.proxy(this.onTransitionEnd, this)
          ),
          !1 !== this.settings.responsive &&
          this.on(i, "resize", this._handlers.onThrottledResize),
          this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
            this.$stage.on(
              "mousedown.owl.core",
              l.proxy(this.onDragStart, this)
            ),
            this.$stage.on(
              "dragstart.owl.core selectstart.owl.core",
              function () {
                return !1;
              }
            )),
          this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            l.proxy(this.onDragStart, this)
          ),
            this.$stage.on(
              "touchcancel.owl.core",
              l.proxy(this.onDragEnd, this)
            ));
      }),
      (h.prototype.onDragStart = function (t) {
        var e = null;
        3 !== t.which &&
          ((e = l.support.transform
            ? {
              x: (e = this.$stage
                .css("transform")
                .replace(/.*\(|\)| /g, "")
                .split(","))[16 === e.length ? 12 : 4],
              y: e[16 === e.length ? 13 : 5],
            }
            : ((e = this.$stage.position()),
            {
              x: this.settings.rtl
                ? e.left +
                this.$stage.width() -
                this.width() +
                this.settings.margin
                : e.left,
              y: e.top,
            })),
            this.is("animating") &&
            (l.support.transform ? this.animate(e.x) : this.$stage.stop(),
              this.invalidate("position")),
            this.$element.toggleClass(
              this.options.grabClass,
              "mousedown" === t.type
            ),
            this.speed(0),
            (this._drag.time = new Date().getTime()),
            (this._drag.target = l(t.target)),
            (this._drag.stage.start = e),
            (this._drag.stage.current = e),
            (this._drag.pointer = this.pointer(t)),
            l(s).on(
              "mouseup.owl.core touchend.owl.core",
              l.proxy(this.onDragEnd, this)
            ),
            l(s).one(
              "mousemove.owl.core touchmove.owl.core",
              l.proxy(function (t) {
                var e = this.difference(this._drag.pointer, this.pointer(t));
                l(s).on(
                  "mousemove.owl.core touchmove.owl.core",
                  l.proxy(this.onDragMove, this)
                ),
                  (Math.abs(e.x) < Math.abs(e.y) && this.is("valid")) ||
                  (t.preventDefault(),
                    this.enter("dragging"),
                    this.trigger("drag"));
              }, this)
            ));
      }),
      (h.prototype.onDragMove = function (t) {
        var e = null,
          i = null,
          n = null,
          s = this.difference(this._drag.pointer, this.pointer(t)),
          o = this.difference(this._drag.stage.start, s);
        this.is("dragging") &&
          (t.preventDefault(),
            this.settings.loop
              ? ((e = this.coordinates(this.minimum())),
                (i = this.coordinates(this.maximum() + 1) - e),
                (o.x = ((((o.x - e) % i) + i) % i) + e))
              : ((e = this.settings.rtl
                ? this.coordinates(this.maximum())
                : this.coordinates(this.minimum())),
                (i = this.settings.rtl
                  ? this.coordinates(this.minimum())
                  : this.coordinates(this.maximum())),
                (n = this.settings.pullDrag ? (-1 * s.x) / 5 : 0),
                (o.x = Math.max(Math.min(o.x, e + n), i + n))),
            (this._drag.stage.current = o),
            this.animate(o.x));
      }),
      (h.prototype.onDragEnd = function (t) {
        var e = this.difference(this._drag.pointer, this.pointer(t)),
          i = this._drag.stage.current,
          n = (0 < e.x) ^ this.settings.rtl ? "left" : "right";
        l(s).off(".owl.core"),
          this.$element.removeClass(this.options.grabClass),
          ((0 !== e.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(
              this.closest(i.x, 0 !== e.x ? n : this._drag.direction)
            ),
            this.invalidate("position"),
            this.update(),
            (this._drag.direction = n),
            (3 < Math.abs(e.x) ||
              300 < new Date().getTime() - this._drag.time) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
          this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
      }),
      (h.prototype.closest = function (i, n) {
        var s = -1,
          o = this.width(),
          r = this.coordinates();
        return (
          this.settings.freeDrag ||
          l.each(
            r,
            l.proxy(function (t, e) {
              return (
                "left" === n && e - 30 < i && i < e + 30
                  ? (s = t)
                  : "right" === n && e - o - 30 < i && i < e - o + 30
                    ? (s = t + 1)
                    : this.op(i, "<", e) &&
                    this.op(i, ">", r[t + 1] !== a ? r[t + 1] : e - o) &&
                    (s = "left" === n ? t + 1 : t),
                -1 === s
              );
            }, this)
          ),
          this.settings.loop ||
          (this.op(i, ">", r[this.minimum()])
            ? (s = i = this.minimum())
            : this.op(i, "<", r[this.maximum()]) && (s = i = this.maximum())),
          s
        );
      }),
      (h.prototype.animate = function (t) {
        var e = 0 < this.speed();
        this.is("animating") && this.onTransitionEnd(),
          e && (this.enter("animating"), this.trigger("translate")),
          l.support.transform3d && l.support.transition
            ? this.$stage.css({
              transform: "translate3d(" + t + "px,0px,0px)",
              transition:
                this.speed() / 1e3 +
                "s" +
                (this.settings.slideTransition
                  ? " " + this.settings.slideTransition
                  : ""),
            })
            : e
              ? this.$stage.animate(
                { left: t + "px" },
                this.speed(),
                this.settings.fallbackEasing,
                l.proxy(this.onTransitionEnd, this)
              )
              : this.$stage.css({ left: t + "px" });
      }),
      (h.prototype.is = function (t) {
        return this._states.current[t] && 0 < this._states.current[t];
      }),
      (h.prototype.current = function (t) {
        if (t === a) return this._current;
        if (0 === this._items.length) return a;
        if (((t = this.normalize(t)), this._current !== t)) {
          var e = this.trigger("change", {
            property: { name: "position", value: t },
          });
          e.data !== a && (t = this.normalize(e.data)),
            (this._current = t),
            this.invalidate("position"),
            this.trigger("changed", {
              property: { name: "position", value: this._current },
            });
        }
        return this._current;
      }),
      (h.prototype.invalidate = function (t) {
        return (
          "string" === l.type(t) &&
          ((this._invalidated[t] = !0),
            this.is("valid") && this.leave("valid")),
          l.map(this._invalidated, function (t, e) {
            return e;
          })
        );
      }),
      (h.prototype.reset = function (t) {
        (t = this.normalize(t)) !== a &&
          ((this._speed = 0),
            (this._current = t),
            this.suppress(["translate", "translated"]),
            this.animate(this.coordinates(t)),
            this.release(["translate", "translated"]));
      }),
      (h.prototype.normalize = function (t, e) {
        var i = this._items.length,
          n = e ? 0 : this._clones.length;
        return (
          !this.isNumeric(t) || i < 1
            ? (t = a)
            : (t < 0 || i + n <= t) &&
            (t = ((((t - n / 2) % i) + i) % i) + n / 2),
          t
        );
      }),
      (h.prototype.relative = function (t) {
        return (t -= this._clones.length / 2), this.normalize(t, !0);
      }),
      (h.prototype.maximum = function (t) {
        var e,
          i,
          n,
          s = this.settings,
          o = this._coordinates.length;
        if (s.loop) o = this._clones.length / 2 + this._items.length - 1;
        else if (s.autoWidth || s.merge) {
          if ((e = this._items.length))
            for (
              i = this._items[--e].width(), n = this.$element.width();
              e-- &&
              !((i += this._items[e].width() + this.settings.margin) > n);

            );
          o = e + 1;
        } else
          o = s.center ? this._items.length - 1 : this._items.length - s.items;
        return t && (o -= this._clones.length / 2), Math.max(o, 0);
      }),
      (h.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2;
      }),
      (h.prototype.items = function (t) {
        return t === a
          ? this._items.slice()
          : ((t = this.normalize(t, !0)), this._items[t]);
      }),
      (h.prototype.mergers = function (t) {
        return t === a
          ? this._mergers.slice()
          : ((t = this.normalize(t, !0)), this._mergers[t]);
      }),
      (h.prototype.clones = function (i) {
        function n(t) {
          return t % 2 == 0 ? s + t / 2 : e - (t + 1) / 2;
        }
        var e = this._clones.length / 2,
          s = e + this._items.length;
        return i === a
          ? l.map(this._clones, function (t, e) {
            return n(e);
          })
          : l.map(this._clones, function (t, e) {
            return t === i ? n(e) : null;
          });
      }),
      (h.prototype.speed = function (t) {
        return t !== a && (this._speed = t), this._speed;
      }),
      (h.prototype.coordinates = function (t) {
        var e,
          i = 1,
          n = t - 1;
        return t === a
          ? l.map(
            this._coordinates,
            l.proxy(function (t, e) {
              return this.coordinates(e);
            }, this)
          )
          : (this.settings.center
            ? (this.settings.rtl && ((i = -1), (n = t + 1)),
              (e = this._coordinates[t]),
              (e +=
                ((this.width() - e + (this._coordinates[n] || 0)) / 2) * i))
            : (e = this._coordinates[n] || 0),
            (e = Math.ceil(e)));
      }),
      (h.prototype.duration = function (t, e, i) {
        return 0 === i
          ? 0
          : Math.min(Math.max(Math.abs(e - t), 1), 6) *
          Math.abs(i || this.settings.smartSpeed);
      }),
      (h.prototype.to = function (t, e) {
        var i = this.current(),
          n = null,
          s = t - this.relative(i),
          o = (0 < s) - (s < 0),
          r = this._items.length,
          a = this.minimum(),
          l = this.maximum();
        this.settings.loop
          ? (!this.settings.rewind && Math.abs(s) > r / 2 && (s += -1 * o * r),
            (n = (((((t = i + s) - a) % r) + r) % r) + a) !== t &&
            n - s <= l &&
            0 < n - s &&
            ((i = n - s), (t = n), this.reset(i)))
          : (t = this.settings.rewind
            ? ((t % (l += 1)) + l) % l
            : Math.max(a, Math.min(l, t))),
          this.speed(this.duration(i, t, e)),
          this.current(t),
          this.isVisible() && this.update();
      }),
      (h.prototype.next = function (t) {
        (t = t || !1), this.to(this.relative(this.current()) + 1, t);
      }),
      (h.prototype.prev = function (t) {
        (t = t || !1), this.to(this.relative(this.current()) - 1, t);
      }),
      (h.prototype.onTransitionEnd = function (t) {
        if (
          t !== a &&
          (t.stopPropagation(),
            (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))
        )
          return !1;
        this.leave("animating"), this.trigger("translated");
      }),
      (h.prototype.viewport = function () {
        var t;
        return (
          this.options.responsiveBaseElement !== i
            ? (t = l(this.options.responsiveBaseElement).width())
            : i.innerWidth
              ? (t = i.innerWidth)
              : s.documentElement && s.documentElement.clientWidth
                ? (t = s.documentElement.clientWidth)
                : console.warn("Can not detect viewport width."),
          t
        );
      }),
      (h.prototype.replace = function (t) {
        this.$stage.empty(),
          (this._items = []),
          (t = t && (t instanceof jQuery ? t : l(t))),
          this.settings.nestedItemSelector &&
          (t = t.find("." + this.settings.nestedItemSelector)),
          t
            .filter(function () {
              return 1 === this.nodeType;
            })
            .each(
              l.proxy(function (t, e) {
                (e = this.prepare(e)),
                  this.$stage.append(e),
                  this._items.push(e),
                  this._mergers.push(
                    1 *
                    e
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                  );
              }, this)
            ),
          this.reset(
            this.isNumeric(this.settings.startPosition)
              ? this.settings.startPosition
              : 0
          ),
          this.invalidate("items");
      }),
      (h.prototype.add = function (t, e) {
        var i = this.relative(this._current);
        (e = e === a ? this._items.length : this.normalize(e, !0)),
          (t = t instanceof jQuery ? t : l(t)),
          this.trigger("add", { content: t, position: e }),
          (t = this.prepare(t)),
          0 === this._items.length || e === this._items.length
            ? (0 === this._items.length && this.$stage.append(t),
              0 !== this._items.length && this._items[e - 1].after(t),
              this._items.push(t),
              this._mergers.push(
                1 *
                t
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
              ))
            : (this._items[e].before(t),
              this._items.splice(e, 0, t),
              this._mergers.splice(
                e,
                0,
                1 *
                t
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
              )),
          this._items[i] && this.reset(this._items[i].index()),
          this.invalidate("items"),
          this.trigger("added", { content: t, position: e });
      }),
      (h.prototype.remove = function (t) {
        (t = this.normalize(t, !0)) !== a &&
          (this.trigger("remove", { content: this._items[t], position: t }),
            this._items[t].remove(),
            this._items.splice(t, 1),
            this._mergers.splice(t, 1),
            this.invalidate("items"),
            this.trigger("removed", { content: null, position: t }));
      }),
      (h.prototype.preloadAutoWidthImages = function (t) {
        t.each(
          l.proxy(function (t, e) {
            this.enter("pre-loading"),
              (e = l(e)),
              l(new Image())
                .one(
                  "load",
                  l.proxy(function (t) {
                    e.attr("src", t.target.src),
                      e.css("opacity", 1),
                      this.leave("pre-loading"),
                      this.is("pre-loading") ||
                      this.is("initializing") ||
                      this.refresh();
                  }, this)
                )
                .attr(
                  "src",
                  e.attr("src") ||
                  e.attr("data-src") ||
                  e.attr("data-src-retina")
                );
          }, this)
        );
      }),
      (h.prototype.destroy = function () {
        for (var t in (this.$element.off(".owl.core"),
          this.$stage.off(".owl.core"),
          l(s).off(".owl.core"),
          !1 !== this.settings.responsive &&
          (i.clearTimeout(this.resizeTimer),
            this.off(i, "resize", this._handlers.onThrottledResize)),
          this._plugins))
          this._plugins[t].destroy();
        this.$stage.children(".cloned").remove(),
          this.$stage.unwrap(),
          this.$stage.children().contents().unwrap(),
          this.$stage.children().unwrap(),
          this.$stage.remove(),
          this.$element
            .removeClass(this.options.refreshClass)
            .removeClass(this.options.loadingClass)
            .removeClass(this.options.loadedClass)
            .removeClass(this.options.rtlClass)
            .removeClass(this.options.dragClass)
            .removeClass(this.options.grabClass)
            .attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                  ""
                )
            )
            .removeData("owl.carousel");
      }),
      (h.prototype.op = function (t, e, i) {
        var n = this.settings.rtl;
        switch (e) {
          case "<":
            return n ? i < t : t < i;
          case ">":
            return n ? t < i : i < t;
          case ">=":
            return n ? t <= i : i <= t;
          case "<=":
            return n ? i <= t : t <= i;
        }
      }),
      (h.prototype.on = function (t, e, i, n) {
        t.addEventListener
          ? t.addEventListener(e, i, n)
          : t.attachEvent && t.attachEvent("on" + e, i);
      }),
      (h.prototype.off = function (t, e, i, n) {
        t.removeEventListener
          ? t.removeEventListener(e, i, n)
          : t.detachEvent && t.detachEvent("on" + e, i);
      }),
      (h.prototype.trigger = function (t, e, i, n, s) {
        var o = { item: { count: this._items.length, index: this.current() } },
          r = l.camelCase(
            l
              .grep(["on", t, i], function (t) {
                return t;
              })
              .join("-")
              .toLowerCase()
          ),
          a = l.Event(
            [t, "owl", i || "carousel"].join(".").toLowerCase(),
            l.extend({ relatedTarget: this }, o, e)
          );
        return (
          this._supress[t] ||
          (l.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(a);
          }),
            this.register({ type: h.Type.Event, name: t }),
            this.$element.trigger(a),
            this.settings &&
            "function" == typeof this.settings[r] &&
            this.settings[r].call(this, a)),
          a
        );
      }),
      (h.prototype.enter = function (t) {
        l.each(
          [t].concat(this._states.tags[t] || []),
          l.proxy(function (t, e) {
            this._states.current[e] === a && (this._states.current[e] = 0),
              this._states.current[e]++;
          }, this)
        );
      }),
      (h.prototype.leave = function (t) {
        l.each(
          [t].concat(this._states.tags[t] || []),
          l.proxy(function (t, e) {
            this._states.current[e]--;
          }, this)
        );
      }),
      (h.prototype.register = function (i) {
        if (i.type === h.Type.Event) {
          if (
            (l.event.special[i.name] || (l.event.special[i.name] = {}),
              !l.event.special[i.name].owl)
          ) {
            var e = l.event.special[i.name]._default;
            (l.event.special[i.name]._default = function (t) {
              return !e ||
                !e.apply ||
                (t.namespace && -1 !== t.namespace.indexOf("owl"))
                ? t.namespace && -1 < t.namespace.indexOf("owl")
                : e.apply(this, arguments);
            }),
              (l.event.special[i.name].owl = !0);
          }
        } else
          i.type === h.Type.State &&
            (this._states.tags[i.name]
              ? (this._states.tags[i.name] = this._states.tags[i.name].concat(
                i.tags
              ))
              : (this._states.tags[i.name] = i.tags),
              (this._states.tags[i.name] = l.grep(
                this._states.tags[i.name],
                l.proxy(function (t, e) {
                  return l.inArray(t, this._states.tags[i.name]) === e;
                }, this)
              )));
      }),
      (h.prototype.suppress = function (t) {
        l.each(
          t,
          l.proxy(function (t, e) {
            this._supress[e] = !0;
          }, this)
        );
      }),
      (h.prototype.release = function (t) {
        l.each(
          t,
          l.proxy(function (t, e) {
            delete this._supress[e];
          }, this)
        );
      }),
      (h.prototype.pointer = function (t) {
        var e = { x: null, y: null };
        return (
          (t =
            (t = t.originalEvent || t || i.event).touches && t.touches.length
              ? t.touches[0]
              : t.changedTouches && t.changedTouches.length
                ? t.changedTouches[0]
                : t).pageX
            ? ((e.x = t.pageX), (e.y = t.pageY))
            : ((e.x = t.clientX), (e.y = t.clientY)),
          e
        );
      }),
      (h.prototype.isNumeric = function (t) {
        return !isNaN(parseFloat(t));
      }),
      (h.prototype.difference = function (t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }),
      (l.fn.owlCarousel = function (e) {
        var n = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
          var t = l(this),
            i = t.data("owl.carousel");
          i ||
            ((i = new h(this, "object" == typeof e && e)),
              t.data("owl.carousel", i),
              l.each(
                [
                  "next",
                  "prev",
                  "to",
                  "destroy",
                  "refresh",
                  "replace",
                  "add",
                  "remove",
                ],
                function (t, e) {
                  i.register({ type: h.Type.Event, name: e }),
                    i.$element.on(
                      e + ".owl.carousel.core",
                      l.proxy(function (t) {
                        t.namespace &&
                          t.relatedTarget !== this &&
                          (this.suppress([e]),
                            i[e].apply(this, [].slice.call(arguments, 1)),
                            this.release([e]));
                      }, i)
                    );
                }
              )),
            "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, n);
        });
      }),
      (l.fn.owlCarousel.Constructor = h);
  })(window.Zepto || window.jQuery, window, document),
  (function (e, i) {
    var n = function (t) {
      (this._core = t),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": e.proxy(function (t) {
            t.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = e.extend({}, n.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (n.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (n.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.isVisible()),
            (this._interval = i.setInterval(
              e.proxy(this.refresh, this),
              this._core.settings.autoRefreshInterval
            )));
      }),
      (n.prototype.refresh = function () {
        this._core.isVisible() !== this._visible &&
          ((this._visible = !this._visible),
            this._core.$element.toggleClass("owl-hidden", !this._visible),
            this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (n.prototype.destroy = function () {
        var t, e;
        for (t in (i.clearInterval(this._interval), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, o) {
    var e = function (t) {
      (this._core = t),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            a.proxy(function (t) {
              if (
                t.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((t.property && "position" == t.property.name) ||
                  "initialized" == t.type)
              ) {
                var e = this._core.settings,
                  i = (e.center && Math.ceil(e.items / 2)) || e.items,
                  n = (e.center && -1 * i) || 0,
                  s =
                    (t.property && void 0 !== t.property.value
                      ? t.property.value
                      : this._core.current()) + n,
                  o = this._core.clones().length,
                  r = a.proxy(function (t, e) {
                    this.load(e);
                  }, this);
                for (
                  0 < e.lazyLoadEager &&
                  ((i += e.lazyLoadEager),
                    e.loop && ((s -= e.lazyLoadEager), i++));
                  n++ < i;

                )
                  this.load(o / 2 + this._core.relative(s)),
                    o && a.each(this._core.clones(this._core.relative(s)), r),
                    s++;
              }
            }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
      (e.prototype.load = function (t) {
        var e = this._core.$stage.children().eq(t),
          i = e && e.find(".owl-lazy");
        !i ||
          -1 < a.inArray(e.get(0), this._loaded) ||
          (i.each(
            a.proxy(function (t, e) {
              var i,
                n = a(e),
                s =
                  (1 < o.devicePixelRatio && n.attr("data-src-retina")) ||
                  n.attr("data-src") ||
                  n.attr("data-srcset");
              this._core.trigger("load", { element: n, url: s }, "lazy"),
                n.is("img")
                  ? n
                    .one(
                      "load.owl.lazy",
                      a.proxy(function () {
                        n.css("opacity", 1),
                          this._core.trigger(
                            "loaded",
                            { element: n, url: s },
                            "lazy"
                          );
                      }, this)
                    )
                    .attr("src", s)
                  : n.is("source")
                    ? n
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          this._core.trigger(
                            "loaded",
                            { element: n, url: s },
                            "lazy"
                          );
                        }, this)
                      )
                      .attr("srcset", s)
                    : (((i = new Image()).onload = a.proxy(function () {
                      n.css({
                        "background-image": 'url("' + s + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: n, url: s },
                          "lazy"
                        );
                    }, this)),
                      (i.src = s));
            }, this)
          ),
            this._loaded.push(e.get(0)));
      }),
      (e.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (r, i) {
    var n = function (t) {
      (this._core = t),
        (this._previousHeight = null),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": r.proxy(function (
            t
          ) {
            t.namespace && this._core.settings.autoHeight && this.update();
          },
            this),
          "changed.owl.carousel": r.proxy(function (t) {
            t.namespace &&
              this._core.settings.autoHeight &&
              "position" === t.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": r.proxy(function (t) {
            t.namespace &&
              this._core.settings.autoHeight &&
              t.element.closest("." + this._core.settings.itemClass).index() ===
              this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = r.extend({}, n.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        (this._intervalId = null);
      var e = this;
      r(i).on("load", function () {
        e._core.settings.autoHeight && e.update();
      }),
        r(i).resize(function () {
          e._core.settings.autoHeight &&
            (null != e._intervalId && clearTimeout(e._intervalId),
              (e._intervalId = setTimeout(function () {
                e.update();
              }, 250)));
        });
    };
    (n.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (n.prototype.update = function () {
        var t = this._core._current,
          e = t + this._core.settings.items,
          i = this._core.settings.lazyLoad,
          n = this._core.$stage.children().toArray().slice(t, e),
          s = [],
          o = 0;
        r.each(n, function (t, e) {
          s.push(r(e).height());
        }),
          (o = Math.max.apply(null, s)) <= 1 &&
          i &&
          this._previousHeight &&
          (o = this._previousHeight),
          (this._previousHeight = o),
          this._core.$stage
            .parent()
            .height(o)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (n.prototype.destroy = function () {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (r.fn.owlCarousel.Constructor.Plugins.AutoHeight = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (c, t, e) {
    var i = function (t) {
      (this._core = t),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": c.proxy(function (t) {
            t.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": c.proxy(function (t) {
            t.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              t.preventDefault();
          }, this),
          "refreshed.owl.carousel": c.proxy(function (t) {
            t.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": c.proxy(function (t) {
            t.namespace &&
              "position" === t.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": c.proxy(function (t) {
            if (t.namespace) {
              var e = c(t.content).find(".owl-video");
              e.length &&
                (e.css("display", "none"), this.fetch(e, c(t.content)));
            }
          }, this),
        }),
        (this._core.options = c.extend({}, i.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          c.proxy(function (t) {
            this.play(t);
          }, this)
        );
    };
    (i.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (i.prototype.fetch = function (t, e) {
        var i = t.attr("data-vimeo-id")
          ? "vimeo"
          : t.attr("data-vzaar-id")
            ? "vzaar"
            : "youtube",
          n =
            t.attr("data-vimeo-id") ||
            t.attr("data-youtube-id") ||
            t.attr("data-vzaar-id"),
          s = t.attr("data-width") || this._core.settings.videoWidth,
          o = t.attr("data-height") || this._core.settings.videoHeight,
          r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if (
          -1 <
          (n = r.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          ))[3].indexOf("youtu")
        )
          i = "youtube";
        else if (-1 < n[3].indexOf("vimeo")) i = "vimeo";
        else {
          if (!(-1 < n[3].indexOf("vzaar")))
            throw new Error("Video URL not supported.");
          i = "vzaar";
        }
        (n = n[6]),
          (this._videos[r] = { type: i, id: n, width: s, height: o }),
          e.attr("data-video", r),
          this.thumbnail(t, this._videos[r]);
      }),
      (i.prototype.thumbnail = function (e, t) {
        function i(t) {
          '<div class="owl-video-play-icon"></div>',
            (n = h.lazyLoad
              ? c("<div/>", { class: "owl-video-tn " + l, srcType: t })
              : c("<div/>", {
                class: "owl-video-tn",
                style: "opacity:1;background-image:url(" + t + ")",
              })),
            e.after(n),
            e.after('<div class="owl-video-play-icon"></div>');
        }
        var n,
          s,
          o =
            t.width && t.height
              ? "width:" + t.width + "px;height:" + t.height + "px;"
              : "",
          r = e.find("img"),
          a = "src",
          l = "",
          h = this._core.settings;
        if (
          (e.wrap(c("<div/>", { class: "owl-video-wrapper", style: o })),
            this._core.settings.lazyLoad && ((a = "data-src"), (l = "owl-lazy")),
            r.length)
        )
          return i(r.attr(a)), r.remove(), !1;
        "youtube" === t.type
          ? ((s = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg"), i(s))
          : "vimeo" === t.type
            ? c.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + t.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (t) {
                (s = t[0].thumbnail_large), i(s);
              },
            })
            : "vzaar" === t.type &&
            c.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + t.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (t) {
                (s = t.framegrab_url), i(s);
              },
            });
      }),
      (i.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (i.prototype.play = function (t) {
        var e,
          i = c(t.target).closest("." + this._core.settings.itemClass),
          n = this._videos[i.attr("data-video")],
          s = n.width || "100%",
          o = n.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
            this._core.trigger("play", null, "video"),
            (i = this._core.items(this._core.relative(i.index()))),
            this._core.reset(i.index()),
            (e = c(
              '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
            )).attr("height", o),
            e.attr("width", s),
            "youtube" === n.type
              ? e.attr(
                "src",
                "//www.youtube.com/embed/" +
                n.id +
                "?autoplay=1&rel=0&v=" +
                n.id
              )
              : "vimeo" === n.type
                ? e.attr("src", "//player.vimeo.com/video/" + n.id + "?autoplay=1")
                : "vzaar" === n.type &&
                e.attr(
                  "src",
                  "//view.vzaar.com/" + n.id + "/player?autoplay=true"
                ),
            c(e)
              .wrap('<div class="owl-video-frame" />')
              .insertAfter(i.find(".owl-video")),
            (this._playing = i.addClass("owl-video-playing")));
      }),
      (i.prototype.isInFullScreen = function () {
        var t =
          e.fullscreenElement ||
          e.mozFullScreenElement ||
          e.webkitFullscreenElement;
        return t && c(t).parent().hasClass("owl-video-frame");
      }),
      (i.prototype.destroy = function () {
        var t, e;
        for (t in (this._core.$element.off("click.owl.video"), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (c.fn.owlCarousel.Constructor.Plugins.Video = i);
  })(window.Zepto || window.jQuery, window, document),
  (function (r) {
    var e = function (t) {
      (this.core = t),
        (this.core.options = r.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = void 0),
        (this.next = void 0),
        (this.handlers = {
          "change.owl.carousel": r.proxy(function (t) {
            t.namespace &&
              "position" == t.property.name &&
              ((this.previous = this.core.current()),
                (this.next = t.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            r.proxy(function (t) {
              t.namespace && (this.swapping = "translated" == t.type);
            }, this),
          "translate.owl.carousel": r.proxy(function (t) {
            t.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          r.support.animation &&
          r.support.transition
        ) {
          this.core.speed(0);
          var t,
            e = r.proxy(this.clear, this),
            i = this.core.$stage.children().eq(this.previous),
            n = this.core.$stage.children().eq(this.next),
            s = this.core.settings.animateIn,
            o = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (o &&
              ((t =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
                i
                  .one(r.support.animation.end, e)
                  .css({ left: t + "px" })
                  .addClass("animated owl-animated-out")
                  .addClass(o)),
              s &&
              n
                .one(r.support.animation.end, e)
                .addClass("animated owl-animated-in")
                .addClass(s));
        }
      }),
      (e.prototype.clear = function (t) {
        r(t.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (r.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (n, s, e) {
    var i = function (t) {
      (this._core = t),
        (this._call = null),
        (this._time = 0),
        (this._timeout = 0),
        (this._paused = !0),
        (this._handlers = {
          "changed.owl.carousel": n.proxy(function (t) {
            t.namespace && "settings" === t.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : t.namespace &&
              "position" === t.property.name &&
              this._paused &&
              (this._time = 0);
          }, this),
          "initialized.owl.carousel": n.proxy(function (t) {
            t.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": n.proxy(function (t, e, i) {
            t.namespace && this.play(e, i);
          }, this),
          "stop.owl.autoplay": n.proxy(function (t) {
            t.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": n.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": n.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": n.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": n.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = n.extend({}, i.Defaults, this._core.options));
    };
    (i.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (i.prototype._next = function (t) {
        (this._call = s.setTimeout(
          n.proxy(this._next, this, t),
          this._timeout * (Math.round(this.read() / this._timeout) + 1) -
          this.read()
        )),
          this._core.is("interacting") ||
          e.hidden ||
          this._core.next(t || this._core.settings.autoplaySpeed);
      }),
      (i.prototype.read = function () {
        return new Date().getTime() - this._time;
      }),
      (i.prototype.play = function (t, e) {
        var i;
        this._core.is("rotating") || this._core.enter("rotating"),
          (t = t || this._core.settings.autoplayTimeout),
          (i = Math.min(this._time % (this._timeout || t), t)),
          this._paused
            ? ((this._time = this.read()), (this._paused = !1))
            : s.clearTimeout(this._call),
          (this._time += (this.read() % t) - i),
          (this._timeout = t),
          (this._call = s.setTimeout(n.proxy(this._next, this, e), t - i));
      }),
      (i.prototype.stop = function () {
        this._core.is("rotating") &&
          ((this._time = 0),
            (this._paused = !0),
            s.clearTimeout(this._call),
            this._core.leave("rotating"));
      }),
      (i.prototype.pause = function () {
        this._core.is("rotating") &&
          !this._paused &&
          ((this._time = this.read()),
            (this._paused = !0),
            s.clearTimeout(this._call));
      }),
      (i.prototype.destroy = function () {
        var t, e;
        for (t in (this.stop(), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (n.fn.owlCarousel.Constructor.Plugins.autoplay = i);
  })(window.Zepto || window.jQuery, window, document),
  (function (o) {
    "use strict";
    var e = function (t) {
      (this._core = t),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": o.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                this._core.settings.dotClass +
                '">' +
                o(t.content)
                  .find("[data-dot]")
                  .addBack("[data-dot]")
                  .attr("data-dot") +
                "</div>"
              );
          }, this),
          "added.owl.carousel": o.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(t.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": o.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(t.position, 1);
          }, this),
          "changed.owl.carousel": o.proxy(function (t) {
            t.namespace && "position" == t.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": o.proxy(function (t) {
            t.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
                this.initialize(),
                this.update(),
                this.draw(),
                (this._initialized = !0),
                this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": o.proxy(function (t) {
            t.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
                this.update(),
                this.draw(),
                this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = o.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: [
        '<span aria-label="Previous">&#x2039;</span>',
        '<span aria-label="Next">&#x203a;</span>',
      ],
      navSpeed: !1,
      navElement: 'button type="button" role="presentation"',
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        var t,
          i = this._core.settings;
        for (t in ((this._controls.$relative = (
          i.navContainer
            ? o(i.navContainer)
            : o("<div>").addClass(i.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = o("<" + i.navElement + ">")
            .addClass(i.navClass[0])
            .html(i.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              o.proxy(function (t) {
                this.prev(i.navSpeed);
              }, this)
            )),
          (this._controls.$next = o("<" + i.navElement + ">")
            .addClass(i.navClass[1])
            .html(i.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              o.proxy(function (t) {
                this.next(i.navSpeed);
              }, this)
            )),
          i.dotsData ||
          (this._templates = [
            o('<button role="button">')
              .addClass(i.dotClass)
              .append(o("<span>"))
              .prop("outerHTML"),
          ]),
          (this._controls.$absolute = (
            i.dotsContainer
              ? o(i.dotsContainer)
              : o("<div>").addClass(i.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "button",
            o.proxy(function (t) {
              var e = o(t.target).parent().is(this._controls.$absolute)
                ? o(t.target).index()
                : o(t.target).parent().index();
              t.preventDefault(), this.to(e, i.dotsSpeed);
            }, this)
          ),
          this._overrides))
          this._core[t] = o.proxy(this[t], this);
      }),
      (e.prototype.destroy = function () {
        var t, e, i, n, s;
        for (t in ((s = this._core.settings), this._handlers))
          this.$element.off(t, this._handlers[t]);
        for (e in this._controls)
          "$relative" === e && s.navContainer
            ? this._controls[e].html("")
            : this._controls[e].remove();
        for (n in this.overides) this._core[n] = this._overrides[n];
        for (i in Object.getOwnPropertyNames(this))
          "function" != typeof this[i] && (this[i] = null);
      }),
      (e.prototype.update = function () {
        var t,
          e,
          i = this._core.clones().length / 2,
          n = i + this._core.items().length,
          s = this._core.maximum(!0),
          o = this._core.settings,
          r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if (
          ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)),
            o.dots || "page" == o.slideBy)
        )
          for (this._pages = [], t = i, e = 0; t < n; t++) {
            if (r <= e || 0 === e) {
              if (
                (this._pages.push({
                  start: Math.min(s, t - i),
                  end: t - i + r - 1,
                }),
                  Math.min(s, t - i) === s)
              )
                break;
              (e = 0), 0;
            }
            e += this._core.mergers(this._core.relative(t));
          }
      }),
      (e.prototype.draw = function () {
        var t,
          e = this._core.settings,
          i = this._core.items().length <= e.items,
          n = this._core.relative(this._core.current()),
          s = e.loop || e.rewind;
        this._controls.$relative.toggleClass("disabled", !e.nav || i),
          e.nav &&
          (this._controls.$previous.toggleClass(
            "disabled",
            !s && n <= this._core.minimum(!0)
          ),
            this._controls.$next.toggleClass(
              "disabled",
              !s && n >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !e.dots || i),
          e.dots &&
          ((t =
            this._pages.length - this._controls.$absolute.children().length),
            e.dotsData && 0 != t
              ? this._controls.$absolute.html(this._templates.join(""))
              : 0 < t
                ? this._controls.$absolute.append(
                  new Array(1 + t).join(this._templates[0])
                )
                : t < 0 && this._controls.$absolute.children().slice(t).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(o.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (e.prototype.onTrigger = function (t) {
        var e = this._core.settings;
        t.page = {
          index: o.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            e &&
            (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items),
        };
      }),
      (e.prototype.current = function () {
        var i = this._core.relative(this._core.current());
        return o
          .grep(
            this._pages,
            o.proxy(function (t, e) {
              return t.start <= i && t.end >= i;
            }, this)
          )
          .pop();
      }),
      (e.prototype.getPosition = function (t) {
        var e,
          i,
          n = this._core.settings;
        return (
          "page" == n.slideBy
            ? ((e = o.inArray(this.current(), this._pages)),
              (i = this._pages.length),
              t ? ++e : --e,
              (e = this._pages[((e % i) + i) % i].start))
            : ((e = this._core.relative(this._core.current())),
              (i = this._core.items().length),
              t ? (e += n.slideBy) : (e -= n.slideBy)),
          e
        );
      }),
      (e.prototype.next = function (t) {
        o.proxy(this._overrides.to, this._core)(this.getPosition(!0), t);
      }),
      (e.prototype.prev = function (t) {
        o.proxy(this._overrides.to, this._core)(this.getPosition(!1), t);
      }),
      (e.prototype.to = function (t, e, i) {
        var n;
        !i && this._pages.length
          ? ((n = this._pages.length),
            o.proxy(this._overrides.to, this._core)(
              this._pages[((t % n) + n) % n].start,
              e
            ))
          : o.proxy(this._overrides.to, this._core)(t, e);
      }),
      (o.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (n, s) {
    "use strict";
    var e = function (t) {
      (this._core = t),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": n.proxy(function (t) {
            t.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              n(s).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": n.proxy(function (t) {
            if (t.namespace) {
              var e = n(t.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!e) return;
              this._hashes[e] = t.content;
            }
          }, this),
          "changed.owl.carousel": n.proxy(function (t) {
            if (t.namespace && "position" === t.property.name) {
              var i = this._core.items(
                this._core.relative(this._core.current())
              ),
                e = n
                  .map(this._hashes, function (t, e) {
                    return t === i ? e : null;
                  })
                  .join();
              if (!e || s.location.hash.slice(1) === e) return;
              s.location.hash = e;
            }
          }, this),
        }),
        (this._core.options = n.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        n(s).on(
          "hashchange.owl.navigation",
          n.proxy(function (t) {
            var e = s.location.hash.substring(1),
              i = this._core.$stage.children(),
              n = this._hashes[e] && i.index(this._hashes[e]);
            void 0 !== n &&
              n !== this._core.current() &&
              this._core.to(this._core.relative(n), !1, !0);
          }, this)
        );
    };
    (e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        var t, e;
        for (t in (n(s).off("hashchange.owl.navigation"), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (n.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (s, t, e, o) {
    function i(t, i) {
      var n = !1,
        e = t.charAt(0).toUpperCase() + t.slice(1);
      return (
        s.each((t + " " + a.join(e + " ") + e).split(" "), function (t, e) {
          if (r[e] !== o) return (n = !i || e), !1;
        }),
        n
      );
    }
    function n(t) {
      return i(t, !0);
    }
    var r = s("<support>").get(0).style,
      a = "Webkit Moz O ms".split(" "),
      l = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      h = function () {
        return !!i("transform");
      },
      c = function () {
        return !!i("perspective");
      },
      u = function () {
        return !!i("animation");
      };
    !(function () {
      return !!i("transition");
    })() ||
      ((s.support.transition = new String(n("transition"))),
        (s.support.transition.end = l.transition.end[s.support.transition])),
      u() &&
      ((s.support.animation = new String(n("animation"))),
        (s.support.animation.end = l.animation.end[s.support.animation])),
      h() &&
      ((s.support.transform = new String(n("transform"))),
        (s.support.transform3d = c()));
  })(window.Zepto || window.jQuery, window, document),
  (function (i) {
    // function t() {
    //   window.matchMedia("(max-width: 1199px)").matches &&
    //     i(".navbar-collapse>ul>li>a, .navbar-collapse ul.sub-menu>li>a").on(
    //       "click",
    //       function () {
    //         var t = i(this).parent("li");
    //         t.hasClass("open")
    //           ? (t.removeClass("open"),
    //             t.find("li").removeClass("open"),
    //             t.find("ul").slideUp(500, "linear"))
    //           : (t.addClass("open"),
    //             t.children("ul").slideDown(),
    //             t.siblings("li").children("ul").slideUp(),
    //             t.siblings("li").removeClass("open"),
    //             t.siblings("li").find("li").removeClass("open"),
    //             t.siblings("li").find("ul").slideUp());
    //       }
    //     );
    // }
    i(document).on("ready", function () {
      i(".bg_img").css("background-image", function () {
        return "url(" + i(this).data("background") + ")";
      });
    }),
      i(window).on("load", function () {
        t(),
          i(window).resize(t),
          i("#preloader")
            .delay(200)
            .animate({ opacity: "0" }, 200, function () {
              // i("#preloader").css("display", "none");
            });
        var e = i(".grid").isotope({
          itemSelector: ".grid-item",
          percentPosition: !0,
          masonry: { columnWidth: ".grid-item" },
        });
        i(".filter-button-group").on("click", "button", function () {
          var t = i(this).attr("data-filter");
          e.isotope({ filter: t });
        }),
          i(".filter-button-group").on("click", "button", function () {
            i(this).addClass("active").siblings().removeClass("active");
          });
      }),
      i("#yearly-amount-btn").on("click", function () {
        i(".monthly-amount").removeClass("active"),
          i(".yearly-amount").addClass("active");
      }),
      i("#monthly-amount-btn").on("click", function () {
        i(".yearly-amount").removeClass("active"),
          i(".monthly-amount").addClass("active");
      }),
      i(".header-serch-btn").on("click", function () {
        i(this).hasClass("toggle-close")
          ? (i(this).removeClass("toggle-close").addClass("toggle-open"),
            i(".header-top-search-area").addClass("open"))
          : (i(this).removeClass("toggle-open").addClass("toggle-close"),
            i(".header-top-search-area").removeClass("open"));
      }),
      i(document).on("click touchstart", function (t) {
        i(t.target).is(
          ".header-serch-btn, .header-serch-btn *, .header-top-search-area, .header-top-search-area *"
        ) ||
          (i(".header-top-search-area").removeClass("open"),
            i(".header-serch-btn").addClass("toggle-close"));
      });
    var e = i(".header-section");
    i(window).on("scroll", function () {
      if (50 < i(window).scrollTop()) {
        i(".header-section").addClass("animated fadeInDown menu-fixed");
      } else {
        i(".header-section").removeClass("animated fadeInDown menu-fixed");
      }
    }),
      i(".menu-toggle").on("click", function () {
        i(this).toggleClass("is-active");
      }),
      i(".testimonial-slider").owlCarousel({
        loop: !0,
        margin: 0,
        smartSpeed: 800,
        nav: !1,
        dots: !0,
        responsiveClass: !0,
        responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 2 } },
      }),
      i(".team-slider").owlCarousel({
        loop: !0,
        margin: 0,
        smartSpeed: 800,
        nav: !0,
        dots: !1,
        navText: [
          "<i class='fa fa-chevron-left'></i>",
          "<i class='fa fa-chevron-right'></i>",
        ],
        responsiveClass: !0,
        responsive: { 0: { items: 1 }, 576: { items: 2 }, 992: { items: 3 } },
      }),
      i(".blocklogos").owlCarousel({
        loop: !0,
        margin: 0,
        smartSpeed: 800,
        nav: !0,
        dots: !1,
        navText: [
          "<i class='fa fa-chevron-left'></i>",
          "<i class='fa fa-chevron-right'></i>",
        ],
        responsiveClass: !0,
        responsive: { 0: { items: 2 }, 576: { items: 4 }, 992: { items: 6 } },
      }),
      i(window).on("scroll", function () {
        200 < i(this).scrollTop()
          ? i(".scroll-to-top").fadeIn(200)
          : i(".scroll-to-top").fadeOut(200);
      }),
      i(".scroll-to-top").on("click", function (t) {
        t.preventDefault(), i("html, body").animate({ scrollTop: 0 }, 300);
      }),
      i("a[data-rel^=lightcase]").lightcase();
  })(jQuery);
