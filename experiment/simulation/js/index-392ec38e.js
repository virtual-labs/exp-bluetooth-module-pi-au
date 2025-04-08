var re = Object.defineProperty;
var ie = (t, n, e) =>
  n in t
    ? re(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var an = (t, n, e) => (ie(t, typeof n != "symbol" ? n + "" : n, e), e);
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = e(i);
    fetch(i.href, o);
  }
})();
var oe = { value: () => {} };
function Yt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new _t(e);
}
function _t(t) {
  this._ = t;
}
function se(t, n) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = "",
        i = e.indexOf(".");
      if (
        (i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
        e && !n.hasOwnProperty(e))
      )
        throw new Error("unknown type: " + e);
      return { type: e, name: r };
    });
}
_t.prototype = Yt.prototype = {
  constructor: _t,
  on: function (t, n) {
    var e = this._,
      r = se(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ce(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = ln(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = ln(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new _t(t);
  },
  call: function (t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function (t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  },
};
function ce(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function ln(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = oe), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Lt = "http://www.w3.org/1999/xhtml";
const un = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Lt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function It(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    un.hasOwnProperty(n) ? { space: un[n], local: t } : t
  );
}
function ae(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Lt && n.documentElement.namespaceURI === Lt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function le(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function kn(t) {
  var n = It(t);
  return (n.local ? le : ae)(n);
}
function ue() {}
function Ut(t) {
  return t == null
    ? ue
    : function () {
        return this.querySelector(t);
      };
}
function fe(t) {
  typeof t != "function" && (t = Ut(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new w(r, this._parents);
}
function he(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function de() {
  return [];
}
function Tn(t) {
  return t == null
    ? de
    : function () {
        return this.querySelectorAll(t);
      };
}
function pe(t) {
  return function () {
    return he(t.apply(this, arguments));
  };
}
function ge(t) {
  typeof t == "function" ? (t = pe(t)) : (t = Tn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new w(r, i);
}
function Pn(t) {
  return function () {
    return this.matches(t);
  };
}
function Sn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var _e = Array.prototype.find;
function me(t) {
  return function () {
    return _e.call(this.children, t);
  };
}
function ye() {
  return this.firstElementChild;
}
function xe(t) {
  return this.select(t == null ? ye : me(typeof t == "function" ? t : Sn(t)));
}
var ve = Array.prototype.filter;
function we() {
  return Array.from(this.children);
}
function be(t) {
  return function () {
    return ve.call(this.children, t);
  };
}
function Ee(t) {
  return this.selectAll(
    t == null ? we : be(typeof t == "function" ? t : Sn(t))
  );
}
function $e(t) {
  typeof t != "function" && (t = Pn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new w(r, this._parents);
}
function Mn(t) {
  return new Array(t.length);
}
function Ie() {
  return new w(this._enter || this._groups.map(Mn), this._parents);
}
function xt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
xt.prototype = {
  constructor: xt,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function (t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function (t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t);
  },
};
function Ce(t) {
  return function () {
    return t;
  };
}
function Ne(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new xt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Ae(t, n, e, r, i, o, s) {
  var c,
    a,
    l = new Map(),
    u = n.length,
    h = o.length,
    f = new Array(u),
    p;
  for (c = 0; c < u; ++c)
    (a = n[c]) &&
      ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
      l.has(p) ? (i[c] = a) : l.set(p, a));
  for (c = 0; c < h; ++c)
    (p = s.call(t, o[c], c, o) + ""),
      (a = l.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
        : (e[c] = new xt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function ke(t) {
  return t.__data__;
}
function Te(t, n) {
  if (!arguments.length) return Array.from(this, ke);
  var e = n ? Ae : Ne,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Ce(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      l = 0;
    l < o;
    ++l
  ) {
    var u = r[l],
      h = i[l],
      f = h.length,
      p = Pe(t.call(u, u && u.__data__, l, r)),
      _ = p.length,
      m = (c[l] = new Array(_)),
      $ = (s[l] = new Array(_)),
      U = (a[l] = new Array(f));
    e(u, h, m, $, U, p, n);
    for (var A = 0, k = 0, d, g; A < _; ++A)
      if ((d = m[A])) {
        for (A >= k && (k = A + 1); !(g = $[k]) && ++k < _; );
        d._next = g || null;
      }
  }
  return (s = new w(s, r)), (s._enter = c), (s._exit = a), s;
}
function Pe(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Se() {
  return new w(this._exit || this._groups.map(Mn), this._parents);
}
function Me(t, n, e) {
  var r = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == "function"
      ? ((r = t(r)), r && (r = r.selection()))
      : (r = r.append(t + "")),
    n != null && ((i = n(i)), i && (i = i.selection())),
    e == null ? o.remove() : e(o),
    r && i ? r.merge(i).order() : i
  );
}
function Re(t) {
  for (
    var n = t.selection ? t.selection() : t,
      e = this._groups,
      r = n._groups,
      i = e.length,
      o = r.length,
      s = Math.min(i, o),
      c = new Array(i),
      a = 0;
    a < s;
    ++a
  )
    for (
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, _ = 0;
      _ < h;
      ++_
    )
      (p = l[_] || u[_]) && (f[_] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new w(c, this._parents);
}
function Le() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Be(t) {
  t || (t = De);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), l, u = 0;
      u < c;
      ++u
    )
      (l = s[u]) && (a[u] = l);
    a.sort(n);
  }
  return new w(i, this._parents).order();
}
function De(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Oe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Ge() {
  return Array.from(this);
}
function Xe() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function He() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Fe() {
  return !this.node();
}
function qe(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Ve(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ye(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ue(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function ze(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Ke(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function We(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ze(t, n) {
  var e = It(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Ye
        : Ve
      : typeof n == "function"
      ? e.local
        ? We
        : Ke
      : e.local
      ? ze
      : Ue)(e, n)
  );
}
function Rn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function Qe(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Je(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function je(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function tr(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? Qe : typeof n == "function" ? je : Je)(t, n, e ?? "")
      )
    : Z(this.node(), t);
}
function Z(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Rn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function nr(t) {
  return function () {
    delete this[t];
  };
}
function er(t, n) {
  return function () {
    this[t] = n;
  };
}
function rr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function ir(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? nr : typeof n == "function" ? rr : er)(t, n))
    : this.node()[t];
}
function Ln(t) {
  return t.trim().split(/^|\s+/);
}
function zt(t) {
  return t.classList || new Bn(t);
}
function Bn(t) {
  (this._node = t), (this._names = Ln(t.getAttribute("class") || ""));
}
Bn.prototype = {
  add: function (t) {
    var n = this._names.indexOf(t);
    n < 0 &&
      (this._names.push(t),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (t) {
    var n = this._names.indexOf(t);
    n >= 0 &&
      (this._names.splice(n, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
function Dn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function On(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function or(t) {
  return function () {
    Dn(this, t);
  };
}
function sr(t) {
  return function () {
    On(this, t);
  };
}
function cr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Dn : On)(this, t);
  };
}
function ar(t, n) {
  var e = Ln(t + "");
  if (arguments.length < 2) {
    for (var r = zt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? cr : n ? or : sr)(e, n));
}
function lr() {
  this.textContent = "";
}
function ur(t) {
  return function () {
    this.textContent = t;
  };
}
function fr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function hr(t) {
  return arguments.length
    ? this.each(t == null ? lr : (typeof t == "function" ? fr : ur)(t))
    : this.node().textContent;
}
function dr() {
  this.innerHTML = "";
}
function pr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function gr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function _r(t) {
  return arguments.length
    ? this.each(t == null ? dr : (typeof t == "function" ? gr : pr)(t))
    : this.node().innerHTML;
}
function mr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function yr() {
  return this.each(mr);
}
function xr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function vr() {
  return this.each(xr);
}
function wr(t) {
  var n = typeof t == "function" ? t : kn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function br() {
  return null;
}
function Er(t, n) {
  var e = typeof t == "function" ? t : kn(t),
    r = n == null ? br : typeof n == "function" ? n : Ut(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function $r() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ir() {
  return this.each($r);
}
function Cr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Nr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Ar(t) {
  return this.select(t ? Nr : Cr);
}
function kr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Tr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Pr(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var e = "",
        r = n.indexOf(".");
      return (
        r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
        { type: n, name: e }
      );
    });
}
function Sr(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        (o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function Mr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Tr(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n);
          return;
        }
    }
    this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]);
  };
}
function Rr(t, n, e) {
  var r = Pr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, l = c.length, u; a < l; ++a)
        for (i = 0, u = c[a]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
    }
    return;
  }
  for (c = n ? Mr : Sr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Gn(t, n, e) {
  var r = Rn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Lr(t, n) {
  return function () {
    return Gn(this, t, n);
  };
}
function Br(t, n) {
  return function () {
    return Gn(this, t, n.apply(this, arguments));
  };
}
function Dr(t, n) {
  return this.each((typeof n == "function" ? Br : Lr)(t, n));
}
function* Or() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Xn = [null];
function w(t, n) {
  (this._groups = t), (this._parents = n);
}
function at() {
  return new w([[document.documentElement]], Xn);
}
function Gr() {
  return this;
}
w.prototype = at.prototype = {
  constructor: w,
  select: fe,
  selectAll: ge,
  selectChild: xe,
  selectChildren: Ee,
  filter: $e,
  data: Te,
  enter: Ie,
  exit: Se,
  join: Me,
  merge: Re,
  selection: Gr,
  order: Le,
  sort: Be,
  call: Oe,
  nodes: Ge,
  node: Xe,
  size: He,
  empty: Fe,
  each: qe,
  attr: Ze,
  style: tr,
  property: ir,
  classed: ar,
  text: hr,
  html: _r,
  raise: yr,
  lower: vr,
  append: wr,
  insert: Er,
  remove: Ir,
  clone: Ar,
  datum: kr,
  on: Rr,
  dispatch: Dr,
  [Symbol.iterator]: Or,
};
function L(t) {
  return typeof t == "string"
    ? new w([[document.querySelector(t)]], [document.documentElement])
    : new w([[t]], Xn);
}
function Xr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function fn(t, n) {
  if (((t = Xr(t)), n === void 0 && (n = t.currentTarget), n)) {
    var e = n.ownerSVGElement || n;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      return (
        (r.x = t.clientX),
        (r.y = t.clientY),
        (r = r.matrixTransform(n.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    if (n.getBoundingClientRect) {
      var i = n.getBoundingClientRect();
      return [
        t.clientX - i.left - n.clientLeft,
        t.clientY - i.top - n.clientTop,
      ];
    }
  }
  return [t.pageX, t.pageY];
}
const Hr = { passive: !1 },
  rt = { capture: !0, passive: !1 };
function Pt(t) {
  t.stopImmediatePropagation();
}
function K(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Fr(t) {
  var n = t.document.documentElement,
    e = L(t).on("dragstart.drag", K, rt);
  "onselectstart" in n
    ? e.on("selectstart.drag", K, rt)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function qr(t, n) {
  var e = t.document.documentElement,
    r = L(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", K, rt),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ft = (t) => () => t;
function Bt(
  t,
  {
    sourceEvent: n,
    subject: e,
    target: r,
    identifier: i,
    active: o,
    x: s,
    y: c,
    dx: a,
    dy: l,
    dispatch: u,
  }
) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    subject: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u },
  });
}
Bt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Vr(t) {
  return !t.ctrlKey && !t.button;
}
function Yr() {
  return this.parentNode;
}
function Ur(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function zr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Kr() {
  var t = Vr,
    n = Yr,
    e = Ur,
    r = zr,
    i = {},
    o = Yt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", $)
      .on("touchmove.drag", U, Hr)
      .on("touchend.drag touchcancel.drag", A)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = k(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (L(d.view).on("mousemove.drag", _, rt).on("mouseup.drag", m, rt),
        Fr(d.view),
        Pt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((K(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    L(d.view).on("mousemove.drag mouseup.drag", null),
      qr(d.view, l),
      K(d),
      i.mouse("end", d);
  }
  function $(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        x = n.call(this, d, g),
        b = y.length,
        D,
        z;
      for (D = 0; D < b; ++D)
        (z = k(this, x, d, g, y[D].identifier, y[D])) &&
          (Pt(d), z("start", d, y[D]));
    }
  }
  function U(d) {
    var g = d.changedTouches,
      y = g.length,
      x,
      b;
    for (x = 0; x < y; ++x)
      (b = i[g[x].identifier]) && (K(d), b("drag", d, g[x]));
  }
  function A(d) {
    var g = d.changedTouches,
      y = g.length,
      x,
      b;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        x = 0;
      x < y;
      ++x
    )
      (b = i[g[x].identifier]) && (Pt(d), b("end", d, g[x]));
  }
  function k(d, g, y, x, b, D) {
    var z = o.copy(),
      T = fn(D || y, g),
      rn,
      on,
      ut;
    if (
      (ut = e.call(
        d,
        new Bt("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: b,
          active: s,
          x: T[0],
          y: T[1],
          dx: 0,
          dy: 0,
          dispatch: z,
        }),
        x
      )) != null
    )
      return (
        (rn = ut.x - T[0] || 0),
        (on = ut.y - T[1] || 0),
        function ne(kt, sn, ee) {
          var cn = T,
            Tt;
          switch (kt) {
            case "start":
              (i[b] = ne), (Tt = s++);
              break;
            case "end":
              delete i[b], --s;
            case "drag":
              (T = fn(ee || sn, g)), (Tt = s);
              break;
          }
          z.call(
            kt,
            d,
            new Bt(kt, {
              sourceEvent: sn,
              subject: ut,
              target: f,
              identifier: b,
              active: Tt,
              x: T[0] + rn,
              y: T[1] + on,
              dx: T[0] - cn[0],
              dy: T[1] - cn[1],
              dispatch: z,
            }),
            x
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ft(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ft(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ft(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ft(!!d)), f)
        : r;
    }),
    (f.on = function () {
      var d = o.on.apply(o, arguments);
      return d === o ? f : d;
    }),
    (f.clickDistance = function (d) {
      return arguments.length ? ((h = (d = +d) * d), f) : Math.sqrt(h);
    }),
    f
  );
}
function Kt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Hn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function lt() {}
var it = 0.7,
  vt = 1 / it,
  W = "\\s*([+-]?\\d+)\\s*",
  ot = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  S = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Wr = /^#([0-9a-f]{3,8})$/,
  Zr = new RegExp(`^rgb\\(${W},${W},${W}\\)$`),
  Qr = new RegExp(`^rgb\\(${S},${S},${S}\\)$`),
  Jr = new RegExp(`^rgba\\(${W},${W},${W},${ot}\\)$`),
  jr = new RegExp(`^rgba\\(${S},${S},${S},${ot}\\)$`),
  ti = new RegExp(`^hsl\\(${ot},${S},${S}\\)$`),
  ni = new RegExp(`^hsla\\(${ot},${S},${S},${ot}\\)$`),
  hn = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Kt(lt, st, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: dn,
  formatHex: dn,
  formatHex8: ei,
  formatHsl: ri,
  formatRgb: pn,
  toString: pn,
});
function dn() {
  return this.rgb().formatHex();
}
function ei() {
  return this.rgb().formatHex8();
}
function ri() {
  return Fn(this).formatHsl();
}
function pn() {
  return this.rgb().formatRgb();
}
function st(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = Wr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? gn(n)
          : e === 3
          ? new v(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ht(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ht(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = Zr.exec(t))
      ? new v(n[1], n[2], n[3], 1)
      : (n = Qr.exec(t))
      ? new v((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = Jr.exec(t))
      ? ht(n[1], n[2], n[3], n[4])
      : (n = jr.exec(t))
      ? ht((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = ti.exec(t))
      ? yn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = ni.exec(t))
      ? yn(n[1], n[2] / 100, n[3] / 100, n[4])
      : hn.hasOwnProperty(t)
      ? gn(hn[t])
      : t === "transparent"
      ? new v(NaN, NaN, NaN, 0)
      : null
  );
}
function gn(t) {
  return new v((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ht(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new v(t, n, e, r);
}
function ii(t) {
  return (
    t instanceof lt || (t = st(t)),
    t ? ((t = t.rgb()), new v(t.r, t.g, t.b, t.opacity)) : new v()
  );
}
function Dt(t, n, e, r) {
  return arguments.length === 1 ? ii(t) : new v(t, n, e, r ?? 1);
}
function v(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Kt(
  v,
  Dt,
  Hn(lt, {
    brighter(t) {
      return (
        (t = t == null ? vt : Math.pow(vt, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? it : Math.pow(it, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new v(V(this.r), V(this.g), V(this.b), wt(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: _n,
    formatHex: _n,
    formatHex8: oi,
    formatRgb: mn,
    toString: mn,
  })
);
function _n() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}`;
}
function oi() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}${q(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function mn() {
  const t = wt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${V(this.r)}, ${V(this.g)}, ${V(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function wt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function V(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function q(t) {
  return (t = V(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function yn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new I(t, n, e, r)
  );
}
function Fn(t) {
  if (t instanceof I) return new I(t.h, t.s, t.l, t.opacity);
  if ((t instanceof lt || (t = st(t)), !t)) return new I();
  if (t instanceof I) return t;
  t = t.rgb();
  var n = t.r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    s = NaN,
    c = o - i,
    a = (o + i) / 2;
  return (
    c
      ? (n === o
          ? (s = (e - r) / c + (e < r) * 6)
          : e === o
          ? (s = (r - n) / c + 2)
          : (s = (n - e) / c + 4),
        (c /= a < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (c = a > 0 && a < 1 ? 0 : s),
    new I(s, c, a, t.opacity)
  );
}
function si(t, n, e, r) {
  return arguments.length === 1 ? Fn(t) : new I(t, n, e, r ?? 1);
}
function I(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Kt(
  I,
  si,
  Hn(lt, {
    brighter(t) {
      return (
        (t = t == null ? vt : Math.pow(vt, t)),
        new I(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? it : Math.pow(it, t)),
        new I(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new v(
        St(t >= 240 ? t - 240 : t + 120, i, r),
        St(t, i, r),
        St(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new I(xn(this.h), dt(this.s), dt(this.l), wt(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = wt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${xn(this.h)}, ${
        dt(this.s) * 100
      }%, ${dt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function xn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function dt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function St(t, n, e) {
  return (
    (t < 60
      ? n + ((e - n) * t) / 60
      : t < 180
      ? e
      : t < 240
      ? n + ((e - n) * (240 - t)) / 60
      : n) * 255
  );
}
const qn = (t) => () => t;
function ci(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function ai(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function li(t) {
  return (t = +t) == 1
    ? Vn
    : function (n, e) {
        return e - n ? ai(n, e, t) : qn(isNaN(n) ? e : n);
      };
}
function Vn(t, n) {
  var e = n - t;
  return e ? ci(t, e) : qn(isNaN(t) ? n : t);
}
const vn = (function t(n) {
  var e = li(n);
  function r(i, o) {
    var s = e((i = Dt(i)).r, (o = Dt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Vn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function O(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Ot = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Mt = new RegExp(Ot.source, "g");
function ui(t) {
  return function () {
    return t;
  };
}
function fi(t) {
  return function (n) {
    return t(n) + "";
  };
}
function hi(t, n) {
  var e = (Ot.lastIndex = Mt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Ot.exec(t)) && (i = Mt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: O(r, i) })),
      (e = Mt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? fi(a[0].x)
        : ui(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var wn = 180 / Math.PI,
  Gt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Yn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * wn,
      skewX: Math.atan(a) * wn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var pt;
function di(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Gt : Yn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function pi(t) {
  return t == null ||
    (pt || (pt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    pt.setAttribute("transform", t),
    !(t = pt.transform.baseVal.consolidate()))
    ? Gt
    : ((t = t.matrix), Yn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Un(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push("translate(", null, n, null, e);
      _.push({ i: m - 4, x: O(l, h) }, { i: m - 2, x: O(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: O(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: O(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: O(l, h) }, { i: m - 2, x: O(u, f) });
    } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
  }
  return function (l, u) {
    var h = [],
      f = [];
    return (
      (l = t(l)),
      (u = t(u)),
      o(l.translateX, l.translateY, u.translateX, u.translateY, h, f),
      s(l.rotate, u.rotate, h, f),
      c(l.skewX, u.skewX, h, f),
      a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f),
      (l = u = null),
      function (p) {
        for (var _ = -1, m = f.length, $; ++_ < m; ) h[($ = f[_]).i] = $.x(p);
        return h.join("");
      }
    );
  };
}
var gi = Un(di, "px, ", "px)", "deg)"),
  _i = Un(pi, ", ", ")", ")"),
  Q = 0,
  tt = 0,
  j = 0,
  zn = 1e3,
  bt,
  nt,
  Et = 0,
  Y = 0,
  Ct = 0,
  ct = typeof performance == "object" && performance.now ? performance : Date,
  Kn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Wt() {
  return Y || (Kn(mi), (Y = ct.now() + Ct));
}
function mi() {
  Y = 0;
}
function $t() {
  this._call = this._time = this._next = null;
}
$t.prototype = Wn.prototype = {
  constructor: $t,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Wt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        nt !== this &&
        (nt ? (nt._next = this) : (bt = this), (nt = this)),
      (this._call = t),
      (this._time = e),
      Xt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Xt());
  },
};
function Wn(t, n, e) {
  var r = new $t();
  return r.restart(t, n, e), r;
}
function yi() {
  Wt(), ++Q;
  for (var t = bt, n; t; )
    (n = Y - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Q;
}
function bn() {
  (Y = (Et = ct.now()) + Ct), (Q = tt = 0);
  try {
    yi();
  } finally {
    (Q = 0), vi(), (Y = 0);
  }
}
function xi() {
  var t = ct.now(),
    n = t - Et;
  n > zn && ((Ct -= n), (Et = t));
}
function vi() {
  for (var t, n = bt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (bt = e)));
  (nt = t), Xt(r);
}
function Xt(t) {
  if (!Q) {
    tt && (tt = clearTimeout(tt));
    var n = t - Y;
    n > 24
      ? (t < 1 / 0 && (tt = setTimeout(bn, t - ct.now() - Ct)),
        j && (j = clearInterval(j)))
      : (j || ((Et = ct.now()), (j = setInterval(xi, zn))), (Q = 1), Kn(bn));
  }
}
function En(t, n, e) {
  var r = new $t();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        r.stop(), t(i + n);
      },
      n,
      e
    ),
    r
  );
}
var wi = Yt("start", "end", "cancel", "interrupt"),
  bi = [],
  Zn = 0,
  $n = 1,
  Ht = 2,
  mt = 3,
  In = 4,
  Ft = 5,
  yt = 6;
function Nt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Ei(t, e, {
    name: n,
    index: r,
    group: i,
    on: wi,
    tween: bi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Zn,
  });
}
function Zt(t, n) {
  var e = N(t, n);
  if (e.state > Zn) throw new Error("too late; already scheduled");
  return e;
}
function M(t, n) {
  var e = N(t, n);
  if (e.state > mt) throw new Error("too late; already running");
  return e;
}
function N(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ei(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Wn(o, 0, e.time));
  function o(l) {
    (e.state = $n),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== $n) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === mt) return En(s);
        p.state === In
          ? ((p.state = yt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = yt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (En(function () {
        e.state === mt &&
          ((e.state = In), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Ht),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Ht)
    ) {
      for (
        e.state = mt, i = new Array((f = e.tween.length)), u = 0, h = -1;
        u < f;
        ++u
      )
        (p = e.tween[u].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++h] = p);
      i.length = h + 1;
    }
  }
  function c(l) {
    for (
      var u =
          l < e.duration
            ? e.ease.call(null, l / e.duration)
            : (e.timer.restart(a), (e.state = Ft), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Ft && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = yt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function $i(t, n) {
  var e = t.__transition,
    r,
    i,
    o = !0,
    s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      (i = r.state > Ht && r.state < Ft),
        (r.state = yt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Ii(t) {
  return this.each(function () {
    $i(this, t);
  });
}
function Ci(t, n) {
  var e, r;
  return function () {
    var i = M(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          (r = r.slice()), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Ni(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = M(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, l = i.length; a < l; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === l && i.push(c);
    }
    o.tween = i;
  };
}
function Ai(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = N(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Ci : Ni)(e, t, n));
}
function Qt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = M(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return N(i, r).value[n];
    }
  );
}
function Qn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? O
      : n instanceof st
      ? vn
      : (e = st(n))
      ? ((n = e), vn)
      : hi
  )(t, n);
}
function ki(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ti(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Pi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Si(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Mi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Ri(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Li(t, n) {
  var e = It(t),
    r = e === "transform" ? _i : Qn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Ri : Mi)(e, r, Qt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Ti : ki)(e)
      : (e.local ? Si : Pi)(e, r, n)
  );
}
function Bi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Di(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Oi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Di(t, o)), e;
  }
  return (i._value = n), i;
}
function Gi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Bi(t, o)), e;
  }
  return (i._value = n), i;
}
function Xi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = It(t);
  return this.tween(e, (r.local ? Oi : Gi)(r, n));
}
function Hi(t, n) {
  return function () {
    Zt(this, t).delay = +n.apply(this, arguments);
  };
}
function Fi(t, n) {
  return (
    (n = +n),
    function () {
      Zt(this, t).delay = n;
    }
  );
}
function qi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Hi : Fi)(n, t))
    : N(this.node(), n).delay;
}
function Vi(t, n) {
  return function () {
    M(this, t).duration = +n.apply(this, arguments);
  };
}
function Yi(t, n) {
  return (
    (n = +n),
    function () {
      M(this, t).duration = n;
    }
  );
}
function Ui(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Vi : Yi)(n, t))
    : N(this.node(), n).duration;
}
function zi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    M(this, t).ease = n;
  };
}
function Ki(t) {
  var n = this._id;
  return arguments.length ? this.each(zi(n, t)) : N(this.node(), n).ease;
}
function Wi(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    M(this, t).ease = e;
  };
}
function Zi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Wi(this._id, t));
}
function Qi(t) {
  typeof t != "function" && (t = Pn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new B(r, this._parents, this._name, this._id);
}
function Ji(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var n = this._groups,
      e = t._groups,
      r = n.length,
      i = e.length,
      o = Math.min(r, i),
      s = new Array(r),
      c = 0;
    c < o;
    ++c
  )
    for (
      var a = n[c], l = e[c], u = a.length, h = (s[c] = new Array(u)), f, p = 0;
      p < u;
      ++p
    )
      (f = a[p] || l[p]) && (h[p] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new B(s, this._parents, this._name, this._id);
}
function ji(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function to(t, n, e) {
  var r,
    i,
    o = ji(n) ? Zt : M;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function no(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? N(this.node(), e).on.on(t)
    : this.each(to(e, t, n));
}
function eo(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function ro() {
  return this.on("end.remove", eo(this._id));
}
function io(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Ut(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, l = (o[s] = new Array(a)), u, h, f = 0;
      f < a;
      ++f
    )
      (u = c[f]) &&
        (h = t.call(u, u.__data__, f, c)) &&
        ("__data__" in u && (h.__data__ = u.__data__),
        (l[f] = h),
        Nt(l[f], n, e, f, l, N(u, e)));
  return new B(o, this._parents, n, e);
}
function oo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Tn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            _ = N(u, e),
            m = 0,
            $ = f.length;
          m < $;
          ++m
        )
          (p = f[m]) && Nt(p, n, e, m, f, _);
        o.push(f), s.push(u);
      }
  return new B(o, s, n, e);
}
var so = at.prototype.constructor;
function co() {
  return new so(this._groups, this._parents);
}
function ao(t, n) {
  var e, r, i;
  return function () {
    var o = Z(this, t),
      s = (this.style.removeProperty(t), Z(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Jn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function lo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = Z(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function uo(t, n, e) {
  var r, i, o;
  return function () {
    var s = Z(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), Z(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function fo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = M(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = Jn(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function ho(t, n, e) {
  var r = (t += "") == "transform" ? gi : Qn;
  return n == null
    ? this.styleTween(t, ao(t, r)).on("end.style." + t, Jn(t))
    : typeof n == "function"
    ? this.styleTween(t, uo(t, r, Qt(this, "style." + t, n))).each(
        fo(this._id, t)
      )
    : this.styleTween(t, lo(t, r, n), e).on("end.style." + t, null);
}
function po(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function go(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && po(t, s, e)), r;
  }
  return (o._value = n), o;
}
function _o(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, go(t, n, e ?? ""));
}
function mo(t) {
  return function () {
    this.textContent = t;
  };
}
function yo(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function xo(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? yo(Qt(this, "text", t))
      : mo(t == null ? "" : t + "")
  );
}
function vo(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function wo(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && vo(i)), n;
  }
  return (r._value = t), r;
}
function bo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, wo(t));
}
function Eo() {
  for (
    var t = this._name,
      n = this._id,
      e = jn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = N(a, n);
        Nt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new B(r, this._parents, t, e);
}
function $o() {
  var t,
    n,
    e = this,
    r = e._id,
    i = e.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      a = {
        value: function () {
          --i === 0 && o();
        },
      };
    e.each(function () {
      var l = M(this, r),
        u = l.on;
      u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (l.on = n);
    }),
      i === 0 && o();
  });
}
var Io = 0;
function B(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function jn() {
  return ++Io;
}
var R = at.prototype;
B.prototype = {
  constructor: B,
  select: io,
  selectAll: oo,
  selectChild: R.selectChild,
  selectChildren: R.selectChildren,
  filter: Qi,
  merge: Ji,
  selection: co,
  transition: Eo,
  call: R.call,
  nodes: R.nodes,
  node: R.node,
  size: R.size,
  empty: R.empty,
  each: R.each,
  on: no,
  attr: Li,
  attrTween: Xi,
  style: ho,
  styleTween: _o,
  text: xo,
  textTween: bo,
  remove: ro,
  tween: Ai,
  delay: qi,
  duration: Ui,
  ease: Ki,
  easeVarying: Zi,
  end: $o,
  [Symbol.iterator]: R[Symbol.iterator],
};
function Co(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var No = { time: null, delay: 0, duration: 250, ease: Co };
function Ao(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function ko(t) {
  var n, e;
  t instanceof B
    ? ((n = t._id), (t = t._name))
    : ((n = jn()), ((e = No).time = Wt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Nt(a, t, n, l, s, e || Ao(a, n));
  return new B(r, this._parents, t, n);
}
at.prototype.interrupt = Ii;
at.prototype.transition = ko;
const qt = Math.PI,
  Vt = 2 * qt,
  F = 1e-6,
  To = Vt - F;
function te(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Po(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return te;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class So {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? te : Po(n));
  }
  moveTo(n, e) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(n, e) {
    this._append`L${(this._x1 = +n)},${(this._y1 = +e)}`;
  }
  quadraticCurveTo(n, e, r, i) {
    this._append`Q${+n},${+e},${(this._x1 = +r)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(n, e, r, i, o, s) {
    this._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 =
      +s)}`;
  }
  arcTo(n, e, r, i, o) {
    if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let s = this._x1,
      c = this._y1,
      a = r - n,
      l = i - e,
      u = s - n,
      h = c - e,
      f = u * u + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > F)
      if (!(Math.abs(h * a - l * u) > F) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          m = a * a + l * l,
          $ = p * p + _ * _,
          U = Math.sqrt(m),
          A = Math.sqrt(f),
          k = o * Math.tan((qt - Math.acos((m + f - $) / (2 * U * A))) / 2),
          d = k / A,
          g = k / U;
        Math.abs(d - 1) > F && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * _)},${(this._x1 =
            n + g * a)},${(this._y1 = e + g * l)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      a = r * Math.sin(i),
      l = n + c,
      u = e + a,
      h = 1 ^ s,
      f = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${l},${u}`
      : (Math.abs(this._x1 - l) > F || Math.abs(this._y1 - u) > F) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Vt) + Vt),
        f > To
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > F &&
            this._append`A${r},${r},0,${+(f >= qt)},${h},${(this._x1 =
              n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`);
  }
  rect(n, e, r, i) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 =
      +e)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Mo(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Ro(t, n) {
  return fetch(t, n).then(Mo);
}
function Lo(t) {
  return (n, e) => Ro(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Bo = Lo("application/xml");
function et(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
et.prototype = {
  constructor: et,
  scale: function (t) {
    return t === 1 ? this : new et(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new et(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function (t) {
    return t * this.k + this.x;
  },
  applyY: function (t) {
    return t * this.k + this.y;
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function (t) {
    return (t - this.x) / this.k;
  },
  invertY: function (t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
et.prototype;
class J {
  constructor(n, e, r, i, o, s, c) {
    an(this, "dragged", (n) => {
      this.sensor.attr(
        "transform",
        "translate(" +
          [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      );
    });
    (this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      (this.offsetX = s),
      (this.offsetY = c),
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (L("#" + this.id).node() != null) return;
    const n = await Bo(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr(
        "transform",
        "translate(" +
          [this.offsetX, this.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      )
      .attr("id", this.id)),
      this.sensor.node().append(L(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          Kr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    L(this).raise().classed("active", !0);
  }
  dragended(n) {
    L(this).classed("active", !1);
  }
}
const At = [
    "connector0pin-0",
    "connector1pin-1",
    "connector2pin-3",
    "connector3pin-7",
    "connector4pin-4",
    "connector5pin-1",
    "connector6pin-1",
    "connector7pin-3",
    "connector8pin-0",
    "connector9pin-3",
    "connector10pin-2",
    "connector11pin-1",
    "connector12pin-7",
    "connector13pin-5",
    "connector14pin-6",
    "connector15pin-5",
    "connector16pin-4",
    "connector17pin-2",
    "connector18pin-2",
    "connector19pin-1",
    "connector20pin-7",
    "connector21pin-2",
    "connector22pin-4",
    "connector23pin-1",
    "connector24pin-6",
    "connector25pin-5",
    "connector26pin-7",
    "connector27pin-8",
    "connector28pin-5",
    "connector29pin-9",
    "connector30pin-2",
    "connector31pin-7",
    "connector32pin-3",
    "connector33pin-6",
    "connector34pin-4",
    "connector35pin-7",
    "connector36pin-9",
    "connector37pin-7",
    "connector38pin-2",
    "connector39pin-2",
    "_x30_.1.0.220.2.3-0",
    "_x30_.1.0.221.0.5.13-6",
    "_x30_.1.0.224.0.10_1_-3",
    "_x30_.1.0.223.0.0.1.12-2",
    "_x30_.1.0.224.0.10-7",
    "_x30_.1.0.226.0.1",
    "_x30_.1.0.227.1",
  ],
  G = {
    "connector0pin-0": "3.3v",
    "connector1pin-1": "GPIO 2",
    "connector2pin-3": "GPIO 3",
    "connector3pin-7": "GPIO 4",
    "connector4pin-4": "GND",
    "connector5pin-1": "GPIO 17",
    "connector6pin-1": "GPIO 27",
    "connector7pin-3": "GPIO 22",
    "connector8pin-0": "3.3v",
    "connector9pin-3": "GPIO 10",
    "connector10pin-2": "GPIO 9",
    "connector11pin-1": "GPIO 11",
    "connector12pin-7": "GND",
    "connector13pin-5": "RESERVED",
    "connector14pin-6": "GPIO 5",
    "connector15pin-5": "GPIO 6",
    "connector16pin-4": "GPIO 13",
    "connector17pin-2": "GPIO 19",
    "connector18pin-2": "GPIO 26",
    "connector19pin-1": "GND",
    "connector20pin-7": "GPIO 21",
    "connector21pin-2": "GPIO 20",
    "connector22pin-4": "GPIO 16",
    "connector23pin-1": "GND",
    "connector24pin-6": "GPIO 12",
    "connector25pin-5": "GND",
    "connector26pin-7": "RESERVED",
    "connector27pin-8": "GPIO 7",
    "connector28pin-5": "GPIO 8",
    "connector29pin-9": "GPIO 25",
    "connector30pin-2": "GND",
    "connector31pin-7": "GPIO 24",
    "connector32pin-3": "GPIO 23",
    "connector33pin-6": "GND",
    "connector34pin-4": "GPIO 18",
    "connector35pin-7": "UART 0 RX",
    "connector36pin-9": "UART 0 TX",
    "connector37pin-7": "GND",
    "connector38pin-2": "5V PWR",
    "connector39pin-2": "5V PWR",
    "_x30_.1.0.220.2.3-0": "HDMI",
    "_x30_.1.0.221.0.5.13-6": "Power",
    "_x30_.1.0.223.0.0.1.12-2": "Ethernet",
    "_x30_.1.0.224.0.10-7": "USB 0",
    "_x30_.1.0.224.0.10_1_-3": "USB 1",
    "_x30_.1.0.226.0.1": "CSI Camera",
    "_x30_.1.0.227.1": "DSI Display",
  },
  Do = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  Oo = [
    "hc05_key_pin",
    "hc05_vcc_pin",
    "hc05_gnd_pin",
    "hc05_txd_pin",
    "hc05_rxd_pin",
    "hc05_state_pin",
  ],
  gt = {
    hc05_key_pin: "Key",
    hc05_vcc_pin: "Vcc",
    hc05_gnd_pin: "GND",
    hc05_txd_pin: "TXD",
    hc05_rxd_pin: "RXD",
    hc05_state_pin: "State",
  },
  Go = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = [
      "hc05_vcc_pin",
      "hc05_gnd_pin",
      "hc05_txd_pin",
      "hc05_rxd_pin",
      "GND",
      "UART",
    ];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++, console.log("req", e);
          return;
        }
        if (G[r.connector] == "GND") {
          e++, console.log("gnd", e);
          return;
        }
        if (G[r.connector].includes("UART")) {
          e++, console.log("uart0", e);
          return;
        }
        if (G[r.connector].includes("5V")) {
          e++, console.log("5v", e);
          return;
        }
        At[r.connector];
      }),
      console.log(e, "total"),
      e == 8
    );
  };
class Xo {
  constructor(n) {
    (this.logLocationId = n), (this.connections = []);
  }
  addConnection(n) {
    this.connections.push(n), this.logConnectionsToHtml();
  }
  undoLastConnection() {
    if (this.connections.length) {
      const n = this.connections.pop(),
        e = document.getElementById(this.logLocationId),
        r = e.lastChild;
      e.removeChild(r),
        this.logConnectionsToHtml(),
        console.log("Removed connection:", n);
    } else console.warn("No more connections to undo");
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 === 0) {
      let n = document.createElement("li");
      const e = G[this.connections[this.connections.length - 2].connector]
          ? `${
              G[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = G[this.connections[this.connections.length - 1].connector]
          ? `${
              G[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
          : this.connections[this.connections.length - 1].connector;
      (n.innerHTML = `Connection no. ${
        this.connections.length / 2
      }: ${e} to ${r}`),
        document.getElementById(this.logLocationId).appendChild(n);
      return;
    }
  }
  getConnectionLog() {
    return this.connections;
  }
}
class Ho {
  constructor(n, e, r, i) {
    (this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        });
  }
  throw(n, e) {
    (document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e);
  }
}
const Cn = (t, n) => {
    Jt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  C = L("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Fo = new J("raspberry", C, "images/pi3dirk.svg", 1, !1, 0, 0),
  qo = new J("ultraSonicsensor", C, "images/sensor1.svg", 0.45, !1, 200, 0),
  Vo = new J("box", C, "images/box.svg", 0.7, !1, 700, 80),
  Yo = new J("bluetooth", C, "images/box1.svg", 0.7, !1, 700, 80),
  Uo = new J("phone", C, "images/test.svg", 0.7, !1, 700, 80),
  zo = new J("bconnect", C, "images/start.svg", 0.7, !1, 700, 80),
  Jt = C.append("g").attr("id", "pathsGroup"),
  jt = {
    rasberryPi:
      "Raspberry Pi: Acts as the main controller, using UART pins (TX and RX) to communicate with the HC-05 Bluetooth module. Connect 5V and GND to power the module.",
    sensor:
      "HC-05 Bluetooth Module: Enables wireless communication between the Raspberry Pi and the smartphone. Connect VCC to 5V, GND to GND, TX to RX, and RX to TX on the Pi.",
    object:
      "Smartphone: Receives data sent from the Raspberry Pi via Bluetooth. Click to simulate turning on Bluetooth, selecting the Raspberry Pi, and pairing.",
  },
  tn = document.getElementById("rasberryPi"),
  nn = document.getElementById("sensor"),
  en = document.getElementById("object"),
  Ko = document.getElementById("info"),
  Wo = document.getElementById("list"),
  Zo = document.getElementById("displayInfo"),
  Qo = document.getElementById("codeSubmit"),
  H = document.getElementById("componentDescription"),
  Jo = document.getElementById("undoButton");
tn.addEventListener("click", async () => await Fo.load());
nn.addEventListener("click", () => qo.load());
tn.addEventListener("mouseover", () => {
  (H.textContent = jt.rasberryPi), (H.style.display = "block");
});
nn.addEventListener("mouseover", () => {
  (H.textContent = jt.sensor), (H.style.display = "block");
});
en.addEventListener("mouseover", () => {
  (H.textContent = jt.object), (H.style.display = "block");
});
[tn, nn, en].forEach((t) => {
  t.addEventListener("mouseout", () => {
    (H.textContent = "Hover over a component to see its description."),
      (H.style.display = "none");
  });
});
let Rt = !1;
Ko.addEventListener("click", () => {
  (Rt = !Rt), (Wo.style.display = Rt ? "block" : "none");
});
const Nn = (t) =>
  At.includes(t.srcElement.id) ||
  Do.includes(t.srcElement.id) ||
  Oo.includes(t.srcElement.id);
let E;
const X = new Xo("connectionLog"),
  An = new Ho("errorBox", "errorHeading", "errorText", "closeErrorBox");
let P = 0;
Jo.addEventListener("click", () => {
  X.undoLastConnection(), ts();
});
const jo = (t) => {
  Jt.selectAll(`path[id="${t}"]`)
    .nodes()
    .forEach((e) => e.remove());
};
en.addEventListener("click", async () => {
  await Uo.load(), await Vo.load(), await Yo.load(), await zo.load();
  const t = document.getElementById("hide");
  t.style.display = "none";
  const n = document.getElementById("devices");
  n.style.display = "none";
  const e = document.getElementById("device");
  (e.style.display = "none"),
    document.getElementById("svgContainer").addEventListener("click", (r) => {
      if (r.target.id === "buttonIdInSvg") {
        const i = document.getElementById("box");
        i.style.display = "none";
      }
      if (r.target.id === "icon") {
        const i = document.getElementById("bconnect");
        i.style.display = "none";
      }
      if (r.target.id === "on") {
        const i = document.getElementById("on");
        i.style.fill = "blue";
        const o = document.getElementById("off");
        (o.style.display = "none"),
          (t.style.display = ""),
          (n.style.display = ""),
          (e.style.display = "");
      }
      if (r.target.id === "devices") {
        const i = document.getElementById("bluetooth");
        i.style.display = "none";
      }
    });
});
const ts = () => {
  if (E) {
    Jt.selectAll(`path[id^="path${P}"]`)
      .nodes()
      .forEach((n) => n.remove()),
      (E = null),
      (P = 0),
      console.log("Removed all incomplete paths");
    return;
  }
  if (X.connections.length > 0) {
    const n = X.connections[X.connections.length - 1].lineID;
    jo(n), X.connections.pop(), console.log(`Removed paths with line ID: ${n}`);
  } else console.warn("No more connections to undo");
};
C.on("dblclick", (t) => {
  if (Nn(t) && !E) {
    (E = new So()),
      E.moveTo(t.offsetX, t.offsetY),
      X.addConnection({
        lineID: `path${P}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      C.style("cursor", "crosshair"),
      console.log("path created 0"),
      console.log(P, "path count");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !At.includes(t.srcElement.id)) {
    E &&
      (E.lineTo(t.offsetX, t.offsetY),
      Cn(E.toString(), `path${P}`),
      console.log("path created"),
      console.log(P));
    return;
  }
  if (Nn(t) && E) {
    E.lineTo(t.offsetX, t.offsetY),
      Cn(E.toString(), `path${P}`),
      X.addConnection({
        lineID: `path${P}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      P++,
      C.style("cursor", "default"),
      (E = null),
      console.log("path created 2"),
      console.log(P);
    return;
  }
});
C.on("mouseover", (t) => {
  At.includes(t.srcElement.id) && (Zo.innerHTML = G[t.srcElement.id]);
});
Qo.addEventListener("click", () => {
  const t = Go(X.getConnectionLog());
  if (t === !0) {
    const n = document.getElementById("inputValue").value,
      e = document.getElementById("tspan4567");
    e.textContent = n;
  } else
    t.error
      ? An.throw("Error", t.error)
      : An.throw(
          "Error",
          "Please connect the components properly. Refer to the connection diagram."
        );
});
