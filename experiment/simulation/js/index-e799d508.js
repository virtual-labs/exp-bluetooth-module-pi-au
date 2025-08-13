var ie = Object.defineProperty;
var oe = (t, n, e) =>
  n in t
    ? ie(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var an = (t, n, e) => (oe(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var se = { value: () => {} };
function Yt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new mt(e);
}
function mt(t) {
  this._ = t;
}
function ce(t, n) {
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
mt.prototype = Yt.prototype = {
  constructor: mt,
  on: function (t, n) {
    var e = this._,
      r = ce(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ae(e[i], t.name))) return i;
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
    return new mt(t);
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
function ae(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function ln(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = se), (t = t.slice(0, r).concat(t.slice(r + 1)));
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
function Ct(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    un.hasOwnProperty(n) ? { space: un[n], local: t } : t
  );
}
function le(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Lt && n.documentElement.namespaceURI === Lt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function ue(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Tn(t) {
  var n = Ct(t);
  return (n.local ? ue : le)(n);
}
function fe() {}
function Ut(t) {
  return t == null
    ? fe
    : function () {
        return this.querySelector(t);
      };
}
function he(t) {
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
  return new E(r, this._parents);
}
function de(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function pe() {
  return [];
}
function Pn(t) {
  return t == null
    ? pe
    : function () {
        return this.querySelectorAll(t);
      };
}
function ge(t) {
  return function () {
    return de(t.apply(this, arguments));
  };
}
function _e(t) {
  typeof t == "function" ? (t = ge(t)) : (t = Pn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new E(r, i);
}
function Sn(t) {
  return function () {
    return this.matches(t);
  };
}
function Mn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var me = Array.prototype.find;
function ye(t) {
  return function () {
    return me.call(this.children, t);
  };
}
function xe() {
  return this.firstElementChild;
}
function ve(t) {
  return this.select(t == null ? xe : ye(typeof t == "function" ? t : Mn(t)));
}
var we = Array.prototype.filter;
function be() {
  return Array.from(this.children);
}
function Ee(t) {
  return function () {
    return we.call(this.children, t);
  };
}
function $e(t) {
  return this.selectAll(
    t == null ? be : Ee(typeof t == "function" ? t : Mn(t))
  );
}
function Ie(t) {
  typeof t != "function" && (t = Sn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new E(r, this._parents);
}
function Rn(t) {
  return new Array(t.length);
}
function Ce() {
  return new E(this._enter || this._groups.map(Rn), this._parents);
}
function vt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
vt.prototype = {
  constructor: vt,
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
function ke(t) {
  return function () {
    return t;
  };
}
function Ne(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new vt(t, o[s]));
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
        : (e[c] = new vt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Te(t) {
  return t.__data__;
}
function Pe(t, n) {
  if (!arguments.length) return Array.from(this, Te);
  var e = n ? Ae : Ne,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = ke(t));
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
      p = Se(t.call(u, u && u.__data__, l, r)),
      _ = p.length,
      m = (c[l] = new Array(_)),
      k = (s[l] = new Array(_)),
      z = (a[l] = new Array(f));
    e(u, h, m, k, z, p, n);
    for (var T = 0, P = 0, d, g; T < _; ++T)
      if ((d = m[T])) {
        for (T >= P && (P = T + 1); !(g = k[P]) && ++P < _; );
        d._next = g || null;
      }
  }
  return (s = new E(s, r)), (s._enter = c), (s._exit = a), s;
}
function Se(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Me() {
  return new E(this._exit || this._groups.map(Rn), this._parents);
}
function Re(t, n, e) {
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
function Le(t) {
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
  return new E(c, this._parents);
}
function Be() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function De(t) {
  t || (t = Oe);
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
  return new E(i, this._parents).order();
}
function Oe(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Xe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Ge() {
  return Array.from(this);
}
function He() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Fe() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function qe() {
  return !this.node();
}
function Ve(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Ye(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ue(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ze(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Ke(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function We(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ze(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Qe(t, n) {
  var e = Ct(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Ue
        : Ye
      : typeof n == "function"
      ? e.local
        ? Ze
        : We
      : e.local
      ? Ke
      : ze)(e, n)
  );
}
function Ln(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function Je(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function je(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function tr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function nr(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? Je : typeof n == "function" ? tr : je)(t, n, e ?? "")
      )
    : Q(this.node(), t);
}
function Q(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Ln(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function er(t) {
  return function () {
    delete this[t];
  };
}
function rr(t, n) {
  return function () {
    this[t] = n;
  };
}
function ir(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function or(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? er : typeof n == "function" ? ir : rr)(t, n))
    : this.node()[t];
}
function Bn(t) {
  return t.trim().split(/^|\s+/);
}
function zt(t) {
  return t.classList || new Dn(t);
}
function Dn(t) {
  (this._node = t), (this._names = Bn(t.getAttribute("class") || ""));
}
Dn.prototype = {
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
function On(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Xn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function sr(t) {
  return function () {
    On(this, t);
  };
}
function cr(t) {
  return function () {
    Xn(this, t);
  };
}
function ar(t, n) {
  return function () {
    (n.apply(this, arguments) ? On : Xn)(this, t);
  };
}
function lr(t, n) {
  var e = Bn(t + "");
  if (arguments.length < 2) {
    for (var r = zt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? ar : n ? sr : cr)(e, n));
}
function ur() {
  this.textContent = "";
}
function fr(t) {
  return function () {
    this.textContent = t;
  };
}
function hr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function dr(t) {
  return arguments.length
    ? this.each(t == null ? ur : (typeof t == "function" ? hr : fr)(t))
    : this.node().textContent;
}
function pr() {
  this.innerHTML = "";
}
function gr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function _r(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function mr(t) {
  return arguments.length
    ? this.each(t == null ? pr : (typeof t == "function" ? _r : gr)(t))
    : this.node().innerHTML;
}
function yr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function xr() {
  return this.each(yr);
}
function vr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function wr() {
  return this.each(vr);
}
function br(t) {
  var n = typeof t == "function" ? t : Tn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Er() {
  return null;
}
function $r(t, n) {
  var e = typeof t == "function" ? t : Tn(t),
    r = n == null ? Er : typeof n == "function" ? n : Ut(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Ir() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Cr() {
  return this.each(Ir);
}
function kr() {
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
  return this.select(t ? Nr : kr);
}
function Tr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Pr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Sr(t) {
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
function Mr(t) {
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
function Rr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Pr(n);
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
function Lr(t, n, e) {
  var r = Sr(t + ""),
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
  for (c = n ? Rr : Mr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Gn(t, n, e) {
  var r = Ln(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Br(t, n) {
  return function () {
    return Gn(this, t, n);
  };
}
function Dr(t, n) {
  return function () {
    return Gn(this, t, n.apply(this, arguments));
  };
}
function Or(t, n) {
  return this.each((typeof n == "function" ? Dr : Br)(t, n));
}
function* Xr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Hn = [null];
function E(t, n) {
  (this._groups = t), (this._parents = n);
}
function lt() {
  return new E([[document.documentElement]], Hn);
}
function Gr() {
  return this;
}
E.prototype = lt.prototype = {
  constructor: E,
  select: he,
  selectAll: _e,
  selectChild: ve,
  selectChildren: $e,
  filter: Ie,
  data: Pe,
  enter: Ce,
  exit: Me,
  join: Re,
  merge: Le,
  selection: Gr,
  order: Be,
  sort: De,
  call: Xe,
  nodes: Ge,
  node: He,
  size: Fe,
  empty: qe,
  each: Ve,
  attr: Qe,
  style: nr,
  property: or,
  classed: lr,
  text: dr,
  html: mr,
  raise: xr,
  lower: wr,
  append: br,
  insert: $r,
  remove: Cr,
  clone: Ar,
  datum: Tr,
  on: Lr,
  dispatch: Or,
  [Symbol.iterator]: Xr,
};
function b(t) {
  return typeof t == "string"
    ? new E([[document.querySelector(t)]], [document.documentElement])
    : new E([[t]], Hn);
}
function Hr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function fn(t, n) {
  if (((t = Hr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Fr = { passive: !1 },
  it = { capture: !0, passive: !1 };
function Pt(t) {
  t.stopImmediatePropagation();
}
function W(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function qr(t) {
  var n = t.document.documentElement,
    e = b(t).on("dragstart.drag", W, it);
  "onselectstart" in n
    ? e.on("selectstart.drag", W, it)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Vr(t, n) {
  var e = t.document.documentElement,
    r = b(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", W, it),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ht = (t) => () => t;
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
function Yr(t) {
  return !t.ctrlKey && !t.button;
}
function Ur() {
  return this.parentNode;
}
function zr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Kr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Wr() {
  var t = Yr,
    n = Ur,
    e = zr,
    r = Kr,
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
      .on("touchstart.drag", k)
      .on("touchmove.drag", z, Fr)
      .on("touchend.drag touchcancel.drag", T)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = P(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (b(d.view).on("mousemove.drag", _, it).on("mouseup.drag", m, it),
        qr(d.view),
        Pt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((W(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    b(d.view).on("mousemove.drag mouseup.drag", null),
      Vr(d.view, l),
      W(d),
      i.mouse("end", d);
  }
  function k(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        x = n.call(this, d, g),
        $ = y.length,
        D,
        K;
      for (D = 0; D < $; ++D)
        (K = P(this, x, d, g, y[D].identifier, y[D])) &&
          (Pt(d), K("start", d, y[D]));
    }
  }
  function z(d) {
    var g = d.changedTouches,
      y = g.length,
      x,
      $;
    for (x = 0; x < y; ++x)
      ($ = i[g[x].identifier]) && (W(d), $("drag", d, g[x]));
  }
  function T(d) {
    var g = d.changedTouches,
      y = g.length,
      x,
      $;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        x = 0;
      x < y;
      ++x
    )
      ($ = i[g[x].identifier]) && (Pt(d), $("end", d, g[x]));
  }
  function P(d, g, y, x, $, D) {
    var K = o.copy(),
      S = fn(D || y, g),
      rn,
      on,
      ft;
    if (
      (ft = e.call(
        d,
        new Bt("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: $,
          active: s,
          x: S[0],
          y: S[1],
          dx: 0,
          dy: 0,
          dispatch: K,
        }),
        x
      )) != null
    )
      return (
        (rn = ft.x - S[0] || 0),
        (on = ft.y - S[1] || 0),
        function ee(At, sn, re) {
          var cn = S,
            Tt;
          switch (At) {
            case "start":
              (i[$] = ee), (Tt = s++);
              break;
            case "end":
              delete i[$], --s;
            case "drag":
              (S = fn(re || sn, g)), (Tt = s);
              break;
          }
          K.call(
            At,
            d,
            new Bt(At, {
              sourceEvent: sn,
              subject: ft,
              target: f,
              identifier: $,
              active: Tt,
              x: S[0] + rn,
              y: S[1] + on,
              dx: S[0] - cn[0],
              dy: S[1] - cn[1],
              dispatch: K,
            }),
            x
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ht(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ht(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ht(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ht(!!d)), f)
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
function Fn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function ut() {}
var ot = 0.7,
  wt = 1 / ot,
  Z = "\\s*([+-]?\\d+)\\s*",
  st = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  M = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Zr = /^#([0-9a-f]{3,8})$/,
  Qr = new RegExp(`^rgb\\(${Z},${Z},${Z}\\)$`),
  Jr = new RegExp(`^rgb\\(${M},${M},${M}\\)$`),
  jr = new RegExp(`^rgba\\(${Z},${Z},${Z},${st}\\)$`),
  ti = new RegExp(`^rgba\\(${M},${M},${M},${st}\\)$`),
  ni = new RegExp(`^hsl\\(${st},${M},${M}\\)$`),
  ei = new RegExp(`^hsla\\(${st},${M},${M},${st}\\)$`),
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
Kt(ut, ct, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: dn,
  formatHex: dn,
  formatHex8: ri,
  formatHsl: ii,
  formatRgb: pn,
  toString: pn,
});
function dn() {
  return this.rgb().formatHex();
}
function ri() {
  return this.rgb().formatHex8();
}
function ii() {
  return qn(this).formatHsl();
}
function pn() {
  return this.rgb().formatRgb();
}
function ct(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = Zr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? gn(n)
          : e === 3
          ? new w(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? dt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? dt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = Qr.exec(t))
      ? new w(n[1], n[2], n[3], 1)
      : (n = Jr.exec(t))
      ? new w((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = jr.exec(t))
      ? dt(n[1], n[2], n[3], n[4])
      : (n = ti.exec(t))
      ? dt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = ni.exec(t))
      ? yn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = ei.exec(t))
      ? yn(n[1], n[2] / 100, n[3] / 100, n[4])
      : hn.hasOwnProperty(t)
      ? gn(hn[t])
      : t === "transparent"
      ? new w(NaN, NaN, NaN, 0)
      : null
  );
}
function gn(t) {
  return new w((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function dt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new w(t, n, e, r);
}
function oi(t) {
  return (
    t instanceof ut || (t = ct(t)),
    t ? ((t = t.rgb()), new w(t.r, t.g, t.b, t.opacity)) : new w()
  );
}
function Dt(t, n, e, r) {
  return arguments.length === 1 ? oi(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Kt(
  w,
  Dt,
  Fn(ut, {
    brighter(t) {
      return (
        (t = t == null ? wt : Math.pow(wt, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? ot : Math.pow(ot, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new w(Y(this.r), Y(this.g), Y(this.b), bt(this.opacity));
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
    formatHex8: si,
    formatRgb: mn,
    toString: mn,
  })
);
function _n() {
  return `#${V(this.r)}${V(this.g)}${V(this.b)}`;
}
function si() {
  return `#${V(this.r)}${V(this.g)}${V(this.b)}${V(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function mn() {
  const t = bt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Y(this.r)}, ${Y(this.g)}, ${Y(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function bt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Y(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function V(t) {
  return (t = Y(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function yn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new N(t, n, e, r)
  );
}
function qn(t) {
  if (t instanceof N) return new N(t.h, t.s, t.l, t.opacity);
  if ((t instanceof ut || (t = ct(t)), !t)) return new N();
  if (t instanceof N) return t;
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
    new N(s, c, a, t.opacity)
  );
}
function ci(t, n, e, r) {
  return arguments.length === 1 ? qn(t) : new N(t, n, e, r ?? 1);
}
function N(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Kt(
  N,
  ci,
  Fn(ut, {
    brighter(t) {
      return (
        (t = t == null ? wt : Math.pow(wt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? ot : Math.pow(ot, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new w(
        St(t >= 240 ? t - 240 : t + 120, i, r),
        St(t, i, r),
        St(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new N(xn(this.h), pt(this.s), pt(this.l), bt(this.opacity));
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
      const t = bt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${xn(this.h)}, ${
        pt(this.s) * 100
      }%, ${pt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function xn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function pt(t) {
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
const Vn = (t) => () => t;
function ai(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function li(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function ui(t) {
  return (t = +t) == 1
    ? Yn
    : function (n, e) {
        return e - n ? li(n, e, t) : Vn(isNaN(n) ? e : n);
      };
}
function Yn(t, n) {
  var e = n - t;
  return e ? ai(t, e) : Vn(isNaN(t) ? n : t);
}
const vn = (function t(n) {
  var e = ui(n);
  function r(i, o) {
    var s = e((i = Dt(i)).r, (o = Dt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Yn(i.opacity, o.opacity);
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
function fi(t) {
  return function () {
    return t;
  };
}
function hi(t) {
  return function (n) {
    return t(n) + "";
  };
}
function di(t, n) {
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
        ? hi(a[0].x)
        : fi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var wn = 180 / Math.PI,
  Xt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Un(t, n, e, r, i, o) {
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
var gt;
function pi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Xt : Un(n.a, n.b, n.c, n.d, n.e, n.f);
}
function gi(t) {
  return t == null ||
    (gt || (gt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    gt.setAttribute("transform", t),
    !(t = gt.transform.baseVal.consolidate()))
    ? Xt
    : ((t = t.matrix), Un(t.a, t.b, t.c, t.d, t.e, t.f));
}
function zn(t, n, e, r) {
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
        for (var _ = -1, m = f.length, k; ++_ < m; ) h[(k = f[_]).i] = k.x(p);
        return h.join("");
      }
    );
  };
}
var _i = zn(pi, "px, ", "px)", "deg)"),
  mi = zn(gi, ", ", ")", ")"),
  J = 0,
  nt = 0,
  tt = 0,
  Kn = 1e3,
  Et,
  et,
  $t = 0,
  U = 0,
  kt = 0,
  at = typeof performance == "object" && performance.now ? performance : Date,
  Wn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Wt() {
  return U || (Wn(yi), (U = at.now() + kt));
}
function yi() {
  U = 0;
}
function It() {
  this._call = this._time = this._next = null;
}
It.prototype = Zn.prototype = {
  constructor: It,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Wt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        et !== this &&
        (et ? (et._next = this) : (Et = this), (et = this)),
      (this._call = t),
      (this._time = e),
      Gt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Gt());
  },
};
function Zn(t, n, e) {
  var r = new It();
  return r.restart(t, n, e), r;
}
function xi() {
  Wt(), ++J;
  for (var t = Et, n; t; )
    (n = U - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --J;
}
function bn() {
  (U = ($t = at.now()) + kt), (J = nt = 0);
  try {
    xi();
  } finally {
    (J = 0), wi(), (U = 0);
  }
}
function vi() {
  var t = at.now(),
    n = t - $t;
  n > Kn && ((kt -= n), ($t = t));
}
function wi() {
  for (var t, n = Et, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Et = e)));
  (et = t), Gt(r);
}
function Gt(t) {
  if (!J) {
    nt && (nt = clearTimeout(nt));
    var n = t - U;
    n > 24
      ? (t < 1 / 0 && (nt = setTimeout(bn, t - at.now() - kt)),
        tt && (tt = clearInterval(tt)))
      : (tt || (($t = at.now()), (tt = setInterval(vi, Kn))), (J = 1), Wn(bn));
  }
}
function En(t, n, e) {
  var r = new It();
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
var bi = Yt("start", "end", "cancel", "interrupt"),
  Ei = [],
  Qn = 0,
  $n = 1,
  Ht = 2,
  yt = 3,
  In = 4,
  Ft = 5,
  xt = 6;
function Nt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  $i(t, e, {
    name: n,
    index: r,
    group: i,
    on: bi,
    tween: Ei,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Qn,
  });
}
function Zt(t, n) {
  var e = A(t, n);
  if (e.state > Qn) throw new Error("too late; already scheduled");
  return e;
}
function R(t, n) {
  var e = A(t, n);
  if (e.state > yt) throw new Error("too late; already running");
  return e;
}
function A(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function $i(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Zn(o, 0, e.time));
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
        if (p.state === yt) return En(s);
        p.state === In
          ? ((p.state = xt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = xt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (En(function () {
        e.state === yt &&
          ((e.state = In), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Ht),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Ht)
    ) {
      for (
        e.state = yt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
    (e.state = xt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Ii(t, n) {
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
        (r.state = xt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Ci(t) {
  return this.each(function () {
    Ii(this, t);
  });
}
function ki(t, n) {
  var e, r;
  return function () {
    var i = R(this, t),
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
    var o = R(this, t),
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
    for (var r = A(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? ki : Ni)(e, t, n));
}
function Qt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = R(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return A(i, r).value[n];
    }
  );
}
function Jn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? O
      : n instanceof ct
      ? vn
      : (e = ct(n))
      ? ((n = e), vn)
      : di
  )(t, n);
}
function Ti(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Pi(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Si(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Mi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ri(t, n, e) {
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
function Li(t, n, e) {
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
function Bi(t, n) {
  var e = Ct(t),
    r = e === "transform" ? mi : Jn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Li : Ri)(e, r, Qt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Pi : Ti)(e)
      : (e.local ? Mi : Si)(e, r, n)
  );
}
function Di(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Oi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Xi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Oi(t, o)), e;
  }
  return (i._value = n), i;
}
function Gi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Di(t, o)), e;
  }
  return (i._value = n), i;
}
function Hi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Ct(t);
  return this.tween(e, (r.local ? Xi : Gi)(r, n));
}
function Fi(t, n) {
  return function () {
    Zt(this, t).delay = +n.apply(this, arguments);
  };
}
function qi(t, n) {
  return (
    (n = +n),
    function () {
      Zt(this, t).delay = n;
    }
  );
}
function Vi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Fi : qi)(n, t))
    : A(this.node(), n).delay;
}
function Yi(t, n) {
  return function () {
    R(this, t).duration = +n.apply(this, arguments);
  };
}
function Ui(t, n) {
  return (
    (n = +n),
    function () {
      R(this, t).duration = n;
    }
  );
}
function zi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Yi : Ui)(n, t))
    : A(this.node(), n).duration;
}
function Ki(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    R(this, t).ease = n;
  };
}
function Wi(t) {
  var n = this._id;
  return arguments.length ? this.each(Ki(n, t)) : A(this.node(), n).ease;
}
function Zi(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    R(this, t).ease = e;
  };
}
function Qi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Zi(this._id, t));
}
function Ji(t) {
  typeof t != "function" && (t = Sn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new B(r, this._parents, this._name, this._id);
}
function ji(t) {
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
function to(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function no(t, n, e) {
  var r,
    i,
    o = to(n) ? Zt : R;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function eo(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? A(this.node(), e).on.on(t)
    : this.each(no(e, t, n));
}
function ro(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function io() {
  return this.on("end.remove", ro(this._id));
}
function oo(t) {
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
        Nt(l[f], n, e, f, l, A(u, e)));
  return new B(o, this._parents, n, e);
}
function so(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Pn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            _ = A(u, e),
            m = 0,
            k = f.length;
          m < k;
          ++m
        )
          (p = f[m]) && Nt(p, n, e, m, f, _);
        o.push(f), s.push(u);
      }
  return new B(o, s, n, e);
}
var co = lt.prototype.constructor;
function ao() {
  return new co(this._groups, this._parents);
}
function lo(t, n) {
  var e, r, i;
  return function () {
    var o = Q(this, t),
      s = (this.style.removeProperty(t), Q(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function jn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function uo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = Q(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function fo(t, n, e) {
  var r, i, o;
  return function () {
    var s = Q(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), Q(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function ho(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = R(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = jn(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function po(t, n, e) {
  var r = (t += "") == "transform" ? _i : Jn;
  return n == null
    ? this.styleTween(t, lo(t, r)).on("end.style." + t, jn(t))
    : typeof n == "function"
    ? this.styleTween(t, fo(t, r, Qt(this, "style." + t, n))).each(
        ho(this._id, t)
      )
    : this.styleTween(t, uo(t, r, n), e).on("end.style." + t, null);
}
function go(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function _o(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && go(t, s, e)), r;
  }
  return (o._value = n), o;
}
function mo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, _o(t, n, e ?? ""));
}
function yo(t) {
  return function () {
    this.textContent = t;
  };
}
function xo(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function vo(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? xo(Qt(this, "text", t))
      : yo(t == null ? "" : t + "")
  );
}
function wo(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function bo(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && wo(i)), n;
  }
  return (r._value = t), r;
}
function Eo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, bo(t));
}
function $o() {
  for (
    var t = this._name,
      n = this._id,
      e = te(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = A(a, n);
        Nt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new B(r, this._parents, t, e);
}
function Io() {
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
      var l = R(this, r),
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
var Co = 0;
function B(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function te() {
  return ++Co;
}
var L = lt.prototype;
B.prototype = {
  constructor: B,
  select: oo,
  selectAll: so,
  selectChild: L.selectChild,
  selectChildren: L.selectChildren,
  filter: Ji,
  merge: ji,
  selection: ao,
  transition: $o,
  call: L.call,
  nodes: L.nodes,
  node: L.node,
  size: L.size,
  empty: L.empty,
  each: L.each,
  on: eo,
  attr: Bi,
  attrTween: Hi,
  style: po,
  styleTween: mo,
  text: vo,
  textTween: Eo,
  remove: io,
  tween: Ai,
  delay: Vi,
  duration: zi,
  ease: Wi,
  easeVarying: Qi,
  end: Io,
  [Symbol.iterator]: L[Symbol.iterator],
};
function ko(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var No = { time: null, delay: 0, duration: 250, ease: ko };
function Ao(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function To(t) {
  var n, e;
  t instanceof B
    ? ((n = t._id), (t = t._name))
    : ((n = te()), ((e = No).time = Wt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Nt(a, t, n, l, s, e || Ao(a, n));
  return new B(r, this._parents, t, n);
}
lt.prototype.interrupt = Ci;
lt.prototype.transition = To;
const qt = Math.PI,
  Vt = 2 * qt,
  q = 1e-6,
  Po = Vt - q;
function ne(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function So(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return ne;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Mo {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? ne : So(n));
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
    else if (f > q)
      if (!(Math.abs(h * a - l * u) > q) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          m = a * a + l * l,
          k = p * p + _ * _,
          z = Math.sqrt(m),
          T = Math.sqrt(f),
          P = o * Math.tan((qt - Math.acos((m + f - k) / (2 * z * T))) / 2),
          d = P / T,
          g = P / z;
        Math.abs(d - 1) > q && this._append`L${n + d * u},${e + d * h}`,
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
      : (Math.abs(this._x1 - l) > q || Math.abs(this._y1 - u) > q) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Vt) + Vt),
        f > Po
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > q &&
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
function Ro(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Lo(t, n) {
  return fetch(t, n).then(Ro);
}
function Bo(t) {
  return (n, e) => Lo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Do = Bo("application/xml");
function rt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
rt.prototype = {
  constructor: rt,
  scale: function (t) {
    return t === 1 ? this : new rt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new rt(this.k, this.x + this.k * t, this.y + this.k * n);
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
rt.prototype;
class j {
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
    if (b("#" + this.id).node() != null) return;
    const n = await Do(this.url);
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
      this.sensor.node().append(b(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          Wr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    b(this).raise().classed("active", !0);
  }
  dragended(n) {
    b(this).classed("active", !1);
  }
}
const H = [
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
  X = {
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
  Oo = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  Xo = [
    "hc05_key_pin",
    "hc05_vcc_pin",
    "hc05_gnd_pin",
    "hc05_txd_pin",
    "hc05_rxd_pin",
    "hc05_state_pin",
  ],
  _t = {
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
        if (X[r.connector] == "GND") {
          e++, console.log("gnd", e);
          return;
        }
        if (X[r.connector].includes("UART")) {
          e++, console.log("uart0", e);
          return;
        }
        if (X[r.connector].includes("5V")) {
          e++, console.log("5v", e);
          return;
        }
        H[r.connector];
      }),
      console.log(e, "total"),
      e == 8
    );
  };
class Ho {
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
      const e = X[this.connections[this.connections.length - 2].connector]
          ? `${
              X[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : _t[this.connections[this.connections.length - 2].connector]
          ? _t[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = X[this.connections[this.connections.length - 1].connector]
          ? `${
              X[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : _t[this.connections[this.connections.length - 1].connector]
          ? _t[this.connections[this.connections.length - 1].connector]
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
class Fo {
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
  kn = (t, n, e) => {
    v.append("circle")
      .attr("cx", t)
      .attr("cy", n)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("id", e);
  },
  v = b("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  qo = new j("raspberry", v, "images/pi3dirk.svg", 1, !1, 0, 0),
  Vo = new j("ultraSonicsensor", v, "images/sensor1.svg", 0.45, !1, 200, 0),
  Yo = new j("box", v, "images/box.svg", 0.5, !1, 700, 0),
  Uo = new j("bluetooth", v, "images/box2.svg", 0.5, !1, 700, 0),
  zo = new j("phone", v, "images/test.svg", 0.5, !1, 700, 0),
  Ko = new j("bconnect", v, "images/start.svg", 0.5, !1, 700, 0),
  Jt = v.append("g").attr("id", "pathsGroup"),
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
  Wo = document.getElementById("info"),
  Zo = document.getElementById("list"),
  Qo = document.getElementById("displayInfo"),
  Jo = document.getElementById("codeSubmit"),
  F = document.getElementById("componentDescription"),
  jo = document.getElementById("undoButton");
tn.addEventListener("click", async () => await qo.load());
nn.addEventListener("click", () => Vo.load());
tn.addEventListener("mouseover", () => {
  (F.textContent = jt.rasberryPi), (F.style.display = "block");
});
nn.addEventListener("mouseover", () => {
  (F.textContent = jt.sensor), (F.style.display = "block");
});
en.addEventListener("mouseover", () => {
  (F.textContent = jt.object), (F.style.display = "block");
});
[tn, nn, en].forEach((t) => {
  t.addEventListener("mouseout", () => {
    (F.textContent = "Hover over a component to see its description."),
      (F.style.display = "none");
  });
});
let Rt = !1;
Wo.addEventListener("click", () => {
  (Rt = !Rt), (Zo.style.display = Rt ? "block" : "none");
});
const Nn = (t) =>
  H.includes(t.srcElement.id) ||
  Oo.includes(t.srcElement.id) ||
  Xo.includes(t.srcElement.id);
let I;
const G = new Ho("connectionLog"),
  An = new Fo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let C = 0;
jo.addEventListener("click", () => {
  G.undoLastConnection(), ns();
});
const ts = (t) => {
  Jt.selectAll(`path[id="${t}"]`)
    .nodes()
    .forEach((e) => e.remove());
};
en.addEventListener("click", async () => {
  await zo.load(), await Yo.load(), await Uo.load(), await Ko.load();
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
        i.style.fill = "green";
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
const ns = () => {
  if (I) {
    Jt.selectAll(`path[id^="path${C}"]`)
      .nodes()
      .forEach((e) => e.remove());
    const n = v.select(`#marker-start-${C}`);
    n.empty() || n.remove(),
      (I = null),
      console.log("Removed all incomplete paths and markers");
    return;
  }
  if (G.connections.length > 0) {
    const t = G.connections[G.connections.length - 1],
      n = t.lineID,
      e = parseInt(n.replace("path", ""));
    ts(n);
    const r = v.select(`#marker-start-${e}`);
    r.empty() || r.remove();
    const i = v.select(`#marker-end-${e}`);
    i.empty() || i.remove(),
      H.includes(t.connector) && b(`#${t.connector}`).style("fill", "#9a916c"),
      t.connectorEnd &&
        H.includes(t.connectorEnd) &&
        b(`#${t.connectorEnd}`).style("fill", "#9a916c"),
      G.connections.pop(),
      console.log(`Removed paths and markers with line ID: ${n}`);
  } else console.warn("No more connections to undo");
};
v.on("dblclick", (t) => {
  if (Nn(t) && !I) {
    (I = new Mo()),
      I.moveTo(t.offsetX, t.offsetY),
      H.includes(t.srcElement.id)
        ? b(`#${t.srcElement.id}`).style("fill", "black")
        : kn(t.offsetX, t.offsetY, `marker-start-${C}`),
      G.addConnection({
        lineID: `path${C}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      v.style("cursor", "crosshair"),
      console.log("path created 0"),
      console.log(C, "path count");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !H.includes(t.srcElement.id)) {
    I &&
      (I.lineTo(t.offsetX, t.offsetY),
      Cn(I.toString(), `path${C}`),
      console.log("path created"),
      console.log(C));
    return;
  }
  if (Nn(t) && I) {
    I.lineTo(t.offsetX, t.offsetY),
      Cn(I.toString(), `path${C}`),
      H.includes(t.srcElement.id)
        ? b(`#${t.srcElement.id}`).style("fill", "black")
        : kn(t.offsetX, t.offsetY, `marker-end-${C}`),
      G.addConnection({
        lineID: `path${C}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      C++,
      v.style("cursor", "default"),
      (I = null),
      console.log("path created 2"),
      console.log(C);
    return;
  }
});
v.on("mouseover", (t) => {
  H.includes(t.srcElement.id) && (Qo.innerHTML = X[t.srcElement.id]);
});
Jo.addEventListener("click", () => {
  const t = Go(G.getConnectionLog());
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
