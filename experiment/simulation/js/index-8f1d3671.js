var Jn = Object.defineProperty;
var jn = (t, n, e) =>
  n in t
    ? Jn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var en = (t, n, e) => (jn(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var te = { value: () => {} };
function Yt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new gt(e);
}
function gt(t) {
  this._ = t;
}
function ne(t, n) {
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
gt.prototype = Yt.prototype = {
  constructor: gt,
  on: function (t, n) {
    var e = this._,
      r = ne(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ee(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = rn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = rn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new gt(t);
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
function ee(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function rn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = te), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Rt = "http://www.w3.org/1999/xhtml";
const on = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Rt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function $t(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    on.hasOwnProperty(n) ? { space: on[n], local: t } : t
  );
}
function re(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Rt && n.documentElement.namespaceURI === Rt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function ie(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function $n(t) {
  var n = $t(t);
  return (n.local ? ie : re)(n);
}
function oe() {}
function Vt(t) {
  return t == null
    ? oe
    : function () {
        return this.querySelector(t);
      };
}
function se(t) {
  typeof t != "function" && (t = Vt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new b(r, this._parents);
}
function ce(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ae() {
  return [];
}
function In(t) {
  return t == null
    ? ae
    : function () {
        return this.querySelectorAll(t);
      };
}
function le(t) {
  return function () {
    return ce(t.apply(this, arguments));
  };
}
function ue(t) {
  typeof t == "function" ? (t = le(t)) : (t = In(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new b(r, i);
}
function Nn(t) {
  return function () {
    return this.matches(t);
  };
}
function Cn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var fe = Array.prototype.find;
function he(t) {
  return function () {
    return fe.call(this.children, t);
  };
}
function de() {
  return this.firstElementChild;
}
function pe(t) {
  return this.select(t == null ? de : he(typeof t == "function" ? t : Cn(t)));
}
var ge = Array.prototype.filter;
function _e() {
  return Array.from(this.children);
}
function me(t) {
  return function () {
    return ge.call(this.children, t);
  };
}
function ye(t) {
  return this.selectAll(
    t == null ? _e : me(typeof t == "function" ? t : Cn(t))
  );
}
function ve(t) {
  typeof t != "function" && (t = Nn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new b(r, this._parents);
}
function An(t) {
  return new Array(t.length);
}
function xe() {
  return new b(this._enter || this._groups.map(An), this._parents);
}
function yt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
yt.prototype = {
  constructor: yt,
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
function we(t) {
  return function () {
    return t;
  };
}
function be(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new yt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Ee(t, n, e, r, i, o, s) {
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
        : (e[c] = new yt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function $e(t) {
  return t.__data__;
}
function Ie(t, n) {
  if (!arguments.length) return Array.from(this, $e);
  var e = n ? Ee : be,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = we(t));
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
      p = Ne(t.call(u, u && u.__data__, l, r)),
      _ = p.length,
      m = (c[l] = new Array(_)),
      $ = (s[l] = new Array(_)),
      V = (a[l] = new Array(f));
    e(u, h, m, $, V, p, n);
    for (var k = 0, T = 0, d, g; k < _; ++k)
      if ((d = m[k])) {
        for (k >= T && (T = k + 1); !(g = $[T]) && ++T < _; );
        d._next = g || null;
      }
  }
  return (s = new b(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ne(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ce() {
  return new b(this._exit || this._groups.map(An), this._parents);
}
function Ae(t, n, e) {
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
function ke(t) {
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
  return new b(c, this._parents);
}
function Te() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Se(t) {
  t || (t = Pe);
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
  return new b(i, this._parents).order();
}
function Pe(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Me() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Re() {
  return Array.from(this);
}
function Le() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Oe() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Be() {
  return !this.node();
}
function De(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Ge(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Xe(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function He(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function qe(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Fe(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ye(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ve(t, n) {
  var e = $t(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Xe
        : Ge
      : typeof n == "function"
      ? e.local
        ? Ye
        : Fe
      : e.local
      ? qe
      : He)(e, n)
  );
}
function kn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function ze(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Ue(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Ke(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function We(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? ze : typeof n == "function" ? Ke : Ue)(t, n, e ?? "")
      )
    : W(this.node(), t);
}
function W(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    kn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Ze(t) {
  return function () {
    delete this[t];
  };
}
function Qe(t, n) {
  return function () {
    this[t] = n;
  };
}
function Je(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function je(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Ze : typeof n == "function" ? Je : Qe)(t, n))
    : this.node()[t];
}
function Tn(t) {
  return t.trim().split(/^|\s+/);
}
function zt(t) {
  return t.classList || new Sn(t);
}
function Sn(t) {
  (this._node = t), (this._names = Tn(t.getAttribute("class") || ""));
}
Sn.prototype = {
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
function Pn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Mn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function tr(t) {
  return function () {
    Pn(this, t);
  };
}
function nr(t) {
  return function () {
    Mn(this, t);
  };
}
function er(t, n) {
  return function () {
    (n.apply(this, arguments) ? Pn : Mn)(this, t);
  };
}
function rr(t, n) {
  var e = Tn(t + "");
  if (arguments.length < 2) {
    for (var r = zt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? er : n ? tr : nr)(e, n));
}
function ir() {
  this.textContent = "";
}
function or(t) {
  return function () {
    this.textContent = t;
  };
}
function sr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function cr(t) {
  return arguments.length
    ? this.each(t == null ? ir : (typeof t == "function" ? sr : or)(t))
    : this.node().textContent;
}
function ar() {
  this.innerHTML = "";
}
function lr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function ur(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function fr(t) {
  return arguments.length
    ? this.each(t == null ? ar : (typeof t == "function" ? ur : lr)(t))
    : this.node().innerHTML;
}
function hr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function dr() {
  return this.each(hr);
}
function pr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function gr() {
  return this.each(pr);
}
function _r(t) {
  var n = typeof t == "function" ? t : $n(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function mr() {
  return null;
}
function yr(t, n) {
  var e = typeof t == "function" ? t : $n(t),
    r = n == null ? mr : typeof n == "function" ? n : Vt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function vr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function xr() {
  return this.each(vr);
}
function wr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function br() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Er(t) {
  return this.select(t ? br : wr);
}
function $r(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ir(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Nr(t) {
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
function Cr(t) {
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
function Ar(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Ir(n);
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
function kr(t, n, e) {
  var r = Nr(t + ""),
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
  for (c = n ? Ar : Cr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Rn(t, n, e) {
  var r = kn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Tr(t, n) {
  return function () {
    return Rn(this, t, n);
  };
}
function Sr(t, n) {
  return function () {
    return Rn(this, t, n.apply(this, arguments));
  };
}
function Pr(t, n) {
  return this.each((typeof n == "function" ? Sr : Tr)(t, n));
}
function* Mr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Ln = [null];
function b(t, n) {
  (this._groups = t), (this._parents = n);
}
function ct() {
  return new b([[document.documentElement]], Ln);
}
function Rr() {
  return this;
}
b.prototype = ct.prototype = {
  constructor: b,
  select: se,
  selectAll: ue,
  selectChild: pe,
  selectChildren: ye,
  filter: ve,
  data: Ie,
  enter: xe,
  exit: Ce,
  join: Ae,
  merge: ke,
  selection: Rr,
  order: Te,
  sort: Se,
  call: Me,
  nodes: Re,
  node: Le,
  size: Oe,
  empty: Be,
  each: De,
  attr: Ve,
  style: We,
  property: je,
  classed: rr,
  text: cr,
  html: fr,
  raise: dr,
  lower: gr,
  append: _r,
  insert: yr,
  remove: xr,
  clone: Er,
  datum: $r,
  on: kr,
  dispatch: Pr,
  [Symbol.iterator]: Mr,
};
function O(t) {
  return typeof t == "string"
    ? new b([[document.querySelector(t)]], [document.documentElement])
    : new b([[t]], Ln);
}
function Lr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function sn(t, n) {
  if (((t = Lr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Or = { passive: !1 },
  et = { capture: !0, passive: !1 };
function Tt(t) {
  t.stopImmediatePropagation();
}
function U(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Br(t) {
  var n = t.document.documentElement,
    e = O(t).on("dragstart.drag", U, et);
  "onselectstart" in n
    ? e.on("selectstart.drag", U, et)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Dr(t, n) {
  var e = t.document.documentElement,
    r = O(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", U, et),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ut = (t) => () => t;
function Lt(
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
Lt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Gr(t) {
  return !t.ctrlKey && !t.button;
}
function Xr() {
  return this.parentNode;
}
function Hr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function qr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Fr() {
  var t = Gr,
    n = Xr,
    e = Hr,
    r = qr,
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
      .on("touchmove.drag", V, Or)
      .on("touchend.drag touchcancel.drag", k)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = T(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (O(d.view).on("mousemove.drag", _, et).on("mouseup.drag", m, et),
        Br(d.view),
        Tt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((U(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    O(d.view).on("mousemove.drag mouseup.drag", null),
      Dr(d.view, l),
      U(d),
      i.mouse("end", d);
  }
  function $(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        v = n.call(this, d, g),
        E = y.length,
        D,
        z;
      for (D = 0; D < E; ++D)
        (z = T(this, v, d, g, y[D].identifier, y[D])) &&
          (Tt(d), z("start", d, y[D]));
    }
  }
  function V(d) {
    var g = d.changedTouches,
      y = g.length,
      v,
      E;
    for (v = 0; v < y; ++v)
      (E = i[g[v].identifier]) && (U(d), E("drag", d, g[v]));
  }
  function k(d) {
    var g = d.changedTouches,
      y = g.length,
      v,
      E;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        v = 0;
      v < y;
      ++v
    )
      (E = i[g[v].identifier]) && (Tt(d), E("end", d, g[v]));
  }
  function T(d, g, y, v, E, D) {
    var z = o.copy(),
      S = sn(D || y, g),
      Jt,
      jt,
      lt;
    if (
      (lt = e.call(
        d,
        new Lt("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: E,
          active: s,
          x: S[0],
          y: S[1],
          dx: 0,
          dy: 0,
          dispatch: z,
        }),
        v
      )) != null
    )
      return (
        (Jt = lt.x - S[0] || 0),
        (jt = lt.y - S[1] || 0),
        function Zn(At, tn, Qn) {
          var nn = S,
            kt;
          switch (At) {
            case "start":
              (i[E] = Zn), (kt = s++);
              break;
            case "end":
              delete i[E], --s;
            case "drag":
              (S = sn(Qn || tn, g)), (kt = s);
              break;
          }
          z.call(
            At,
            d,
            new Lt(At, {
              sourceEvent: tn,
              subject: lt,
              target: f,
              identifier: E,
              active: kt,
              x: S[0] + Jt,
              y: S[1] + jt,
              dx: S[0] - nn[0],
              dy: S[1] - nn[1],
              dispatch: z,
            }),
            v
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ut(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ut(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ut(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ut(!!d)), f)
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
function Ut(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function On(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function at() {}
var rt = 0.7,
  vt = 1 / rt,
  K = "\\s*([+-]?\\d+)\\s*",
  it = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  M = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Yr = /^#([0-9a-f]{3,8})$/,
  Vr = new RegExp(`^rgb\\(${K},${K},${K}\\)$`),
  zr = new RegExp(`^rgb\\(${M},${M},${M}\\)$`),
  Ur = new RegExp(`^rgba\\(${K},${K},${K},${it}\\)$`),
  Kr = new RegExp(`^rgba\\(${M},${M},${M},${it}\\)$`),
  Wr = new RegExp(`^hsl\\(${it},${M},${M}\\)$`),
  Zr = new RegExp(`^hsla\\(${it},${M},${M},${it}\\)$`),
  cn = {
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
Ut(at, ot, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: an,
  formatHex: an,
  formatHex8: Qr,
  formatHsl: Jr,
  formatRgb: ln,
  toString: ln,
});
function an() {
  return this.rgb().formatHex();
}
function Qr() {
  return this.rgb().formatHex8();
}
function Jr() {
  return Bn(this).formatHsl();
}
function ln() {
  return this.rgb().formatRgb();
}
function ot(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = Yr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? un(n)
          : e === 3
          ? new w(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ft(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ft(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = Vr.exec(t))
      ? new w(n[1], n[2], n[3], 1)
      : (n = zr.exec(t))
      ? new w((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = Ur.exec(t))
      ? ft(n[1], n[2], n[3], n[4])
      : (n = Kr.exec(t))
      ? ft((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = Wr.exec(t))
      ? dn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = Zr.exec(t))
      ? dn(n[1], n[2] / 100, n[3] / 100, n[4])
      : cn.hasOwnProperty(t)
      ? un(cn[t])
      : t === "transparent"
      ? new w(NaN, NaN, NaN, 0)
      : null
  );
}
function un(t) {
  return new w((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ft(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new w(t, n, e, r);
}
function jr(t) {
  return (
    t instanceof at || (t = ot(t)),
    t ? ((t = t.rgb()), new w(t.r, t.g, t.b, t.opacity)) : new w()
  );
}
function Ot(t, n, e, r) {
  return arguments.length === 1 ? jr(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Ut(
  w,
  Ot,
  On(at, {
    brighter(t) {
      return (
        (t = t == null ? vt : Math.pow(vt, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new w(F(this.r), F(this.g), F(this.b), xt(this.opacity));
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
    hex: fn,
    formatHex: fn,
    formatHex8: ti,
    formatRgb: hn,
    toString: hn,
  })
);
function fn() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}`;
}
function ti() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}${q(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function hn() {
  const t = xt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${F(this.r)}, ${F(this.g)}, ${F(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function xt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function F(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function q(t) {
  return (t = F(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function dn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new I(t, n, e, r)
  );
}
function Bn(t) {
  if (t instanceof I) return new I(t.h, t.s, t.l, t.opacity);
  if ((t instanceof at || (t = ot(t)), !t)) return new I();
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
function ni(t, n, e, r) {
  return arguments.length === 1 ? Bn(t) : new I(t, n, e, r ?? 1);
}
function I(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Ut(
  I,
  ni,
  On(at, {
    brighter(t) {
      return (
        (t = t == null ? vt : Math.pow(vt, t)),
        new I(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new I(this.h, this.s, this.l * t, this.opacity)
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
      return new I(pn(this.h), ht(this.s), ht(this.l), xt(this.opacity));
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
      const t = xt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${pn(this.h)}, ${
        ht(this.s) * 100
      }%, ${ht(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function pn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function ht(t) {
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
const Dn = (t) => () => t;
function ei(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function ri(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function ii(t) {
  return (t = +t) == 1
    ? Gn
    : function (n, e) {
        return e - n ? ri(n, e, t) : Dn(isNaN(n) ? e : n);
      };
}
function Gn(t, n) {
  var e = n - t;
  return e ? ei(t, e) : Dn(isNaN(t) ? n : t);
}
const gn = (function t(n) {
  var e = ii(n);
  function r(i, o) {
    var s = e((i = Ot(i)).r, (o = Ot(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Gn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function G(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Bt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Pt = new RegExp(Bt.source, "g");
function oi(t) {
  return function () {
    return t;
  };
}
function si(t) {
  return function (n) {
    return t(n) + "";
  };
}
function ci(t, n) {
  var e = (Bt.lastIndex = Pt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Bt.exec(t)) && (i = Pt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: G(r, i) })),
      (e = Pt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? si(a[0].x)
        : oi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var _n = 180 / Math.PI,
  Dt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Xn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * _n,
      skewX: Math.atan(a) * _n,
      scaleX: s,
      scaleY: c,
    }
  );
}
var dt;
function ai(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Dt : Xn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function li(t) {
  return t == null ||
    (dt || (dt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    dt.setAttribute("transform", t),
    !(t = dt.transform.baseVal.consolidate()))
    ? Dt
    : ((t = t.matrix), Xn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Hn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push("translate(", null, n, null, e);
      _.push({ i: m - 4, x: G(l, h) }, { i: m - 2, x: G(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: G(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: G(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: G(l, h) }, { i: m - 2, x: G(u, f) });
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
var ui = Hn(ai, "px, ", "px)", "deg)"),
  fi = Hn(li, ", ", ")", ")"),
  Z = 0,
  j = 0,
  J = 0,
  qn = 1e3,
  wt,
  tt,
  bt = 0,
  Y = 0,
  It = 0,
  st = typeof performance == "object" && performance.now ? performance : Date,
  Fn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Kt() {
  return Y || (Fn(hi), (Y = st.now() + It));
}
function hi() {
  Y = 0;
}
function Et() {
  this._call = this._time = this._next = null;
}
Et.prototype = Yn.prototype = {
  constructor: Et,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Kt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        tt !== this &&
        (tt ? (tt._next = this) : (wt = this), (tt = this)),
      (this._call = t),
      (this._time = e),
      Gt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Gt());
  },
};
function Yn(t, n, e) {
  var r = new Et();
  return r.restart(t, n, e), r;
}
function di() {
  Kt(), ++Z;
  for (var t = wt, n; t; )
    (n = Y - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Z;
}
function mn() {
  (Y = (bt = st.now()) + It), (Z = j = 0);
  try {
    di();
  } finally {
    (Z = 0), gi(), (Y = 0);
  }
}
function pi() {
  var t = st.now(),
    n = t - bt;
  n > qn && ((It -= n), (bt = t));
}
function gi() {
  for (var t, n = wt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (wt = e)));
  (tt = t), Gt(r);
}
function Gt(t) {
  if (!Z) {
    j && (j = clearTimeout(j));
    var n = t - Y;
    n > 24
      ? (t < 1 / 0 && (j = setTimeout(mn, t - st.now() - It)),
        J && (J = clearInterval(J)))
      : (J || ((bt = st.now()), (J = setInterval(pi, qn))), (Z = 1), Fn(mn));
  }
}
function yn(t, n, e) {
  var r = new Et();
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
var _i = Yt("start", "end", "cancel", "interrupt"),
  mi = [],
  Vn = 0,
  vn = 1,
  Xt = 2,
  _t = 3,
  xn = 4,
  Ht = 5,
  mt = 6;
function Nt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  yi(t, e, {
    name: n,
    index: r,
    group: i,
    on: _i,
    tween: mi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Vn,
  });
}
function Wt(t, n) {
  var e = A(t, n);
  if (e.state > Vn) throw new Error("too late; already scheduled");
  return e;
}
function R(t, n) {
  var e = A(t, n);
  if (e.state > _t) throw new Error("too late; already running");
  return e;
}
function A(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function yi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Yn(o, 0, e.time));
  function o(l) {
    (e.state = vn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== vn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === _t) return yn(s);
        p.state === xn
          ? ((p.state = mt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = mt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (yn(function () {
        e.state === _t &&
          ((e.state = xn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Xt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Xt)
    ) {
      for (
        e.state = _t, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = Ht), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Ht && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = mt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function vi(t, n) {
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
      (i = r.state > Xt && r.state < Ht),
        (r.state = mt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function xi(t) {
  return this.each(function () {
    vi(this, t);
  });
}
function wi(t, n) {
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
function bi(t, n, e) {
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
function Ei(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = A(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? wi : bi)(e, t, n));
}
function Zt(t, n, e) {
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
function zn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? G
      : n instanceof ot
      ? gn
      : (e = ot(n))
      ? ((n = e), gn)
      : ci
  )(t, n);
}
function $i(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ii(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ni(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ci(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ai(t, n, e) {
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
function ki(t, n, e) {
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
function Ti(t, n) {
  var e = $t(t),
    r = e === "transform" ? fi : zn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? ki : Ai)(e, r, Zt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Ii : $i)(e)
      : (e.local ? Ci : Ni)(e, r, n)
  );
}
function Si(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Pi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Mi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Pi(t, o)), e;
  }
  return (i._value = n), i;
}
function Ri(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Si(t, o)), e;
  }
  return (i._value = n), i;
}
function Li(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = $t(t);
  return this.tween(e, (r.local ? Mi : Ri)(r, n));
}
function Oi(t, n) {
  return function () {
    Wt(this, t).delay = +n.apply(this, arguments);
  };
}
function Bi(t, n) {
  return (
    (n = +n),
    function () {
      Wt(this, t).delay = n;
    }
  );
}
function Di(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Oi : Bi)(n, t))
    : A(this.node(), n).delay;
}
function Gi(t, n) {
  return function () {
    R(this, t).duration = +n.apply(this, arguments);
  };
}
function Xi(t, n) {
  return (
    (n = +n),
    function () {
      R(this, t).duration = n;
    }
  );
}
function Hi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Gi : Xi)(n, t))
    : A(this.node(), n).duration;
}
function qi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    R(this, t).ease = n;
  };
}
function Fi(t) {
  var n = this._id;
  return arguments.length ? this.each(qi(n, t)) : A(this.node(), n).ease;
}
function Yi(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    R(this, t).ease = e;
  };
}
function Vi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Yi(this._id, t));
}
function zi(t) {
  typeof t != "function" && (t = Nn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new B(r, this._parents, this._name, this._id);
}
function Ui(t) {
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
function Ki(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Wi(t, n, e) {
  var r,
    i,
    o = Ki(n) ? Wt : R;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function Zi(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? A(this.node(), e).on.on(t)
    : this.each(Wi(e, t, n));
}
function Qi(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function Ji() {
  return this.on("end.remove", Qi(this._id));
}
function ji(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Vt(t));
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
function to(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = In(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            _ = A(u, e),
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
var no = ct.prototype.constructor;
function eo() {
  return new no(this._groups, this._parents);
}
function ro(t, n) {
  var e, r, i;
  return function () {
    var o = W(this, t),
      s = (this.style.removeProperty(t), W(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Un(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function io(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = W(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function oo(t, n, e) {
  var r, i, o;
  return function () {
    var s = W(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), W(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function so(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = R(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = Un(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function co(t, n, e) {
  var r = (t += "") == "transform" ? ui : zn;
  return n == null
    ? this.styleTween(t, ro(t, r)).on("end.style." + t, Un(t))
    : typeof n == "function"
    ? this.styleTween(t, oo(t, r, Zt(this, "style." + t, n))).each(
        so(this._id, t)
      )
    : this.styleTween(t, io(t, r, n), e).on("end.style." + t, null);
}
function ao(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function lo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && ao(t, s, e)), r;
  }
  return (o._value = n), o;
}
function uo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, lo(t, n, e ?? ""));
}
function fo(t) {
  return function () {
    this.textContent = t;
  };
}
function ho(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function po(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? ho(Zt(this, "text", t))
      : fo(t == null ? "" : t + "")
  );
}
function go(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function _o(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && go(i)), n;
  }
  return (r._value = t), r;
}
function mo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, _o(t));
}
function yo() {
  for (
    var t = this._name,
      n = this._id,
      e = Kn(),
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
function vo() {
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
var xo = 0;
function B(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Kn() {
  return ++xo;
}
var L = ct.prototype;
B.prototype = {
  constructor: B,
  select: ji,
  selectAll: to,
  selectChild: L.selectChild,
  selectChildren: L.selectChildren,
  filter: zi,
  merge: Ui,
  selection: eo,
  transition: yo,
  call: L.call,
  nodes: L.nodes,
  node: L.node,
  size: L.size,
  empty: L.empty,
  each: L.each,
  on: Zi,
  attr: Ti,
  attrTween: Li,
  style: co,
  styleTween: uo,
  text: po,
  textTween: mo,
  remove: Ji,
  tween: Ei,
  delay: Di,
  duration: Hi,
  ease: Fi,
  easeVarying: Vi,
  end: vo,
  [Symbol.iterator]: L[Symbol.iterator],
};
function wo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var bo = { time: null, delay: 0, duration: 250, ease: wo };
function Eo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function $o(t) {
  var n, e;
  t instanceof B
    ? ((n = t._id), (t = t._name))
    : ((n = Kn()), ((e = bo).time = Kt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Nt(a, t, n, l, s, e || Eo(a, n));
  return new B(r, this._parents, t, n);
}
ct.prototype.interrupt = xi;
ct.prototype.transition = $o;
const qt = Math.PI,
  Ft = 2 * qt,
  H = 1e-6,
  Io = Ft - H;
function Wn(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function No(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return Wn;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Co {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? Wn : No(n));
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
    else if (f > H)
      if (!(Math.abs(h * a - l * u) > H) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          m = a * a + l * l,
          $ = p * p + _ * _,
          V = Math.sqrt(m),
          k = Math.sqrt(f),
          T = o * Math.tan((qt - Math.acos((m + f - $) / (2 * V * k))) / 2),
          d = T / k,
          g = T / V;
        Math.abs(d - 1) > H && this._append`L${n + d * u},${e + d * h}`,
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
      : (Math.abs(this._x1 - l) > H || Math.abs(this._y1 - u) > H) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Ft) + Ft),
        f > Io
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > H &&
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
function Ao(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function ko(t, n) {
  return fetch(t, n).then(Ao);
}
function To(t) {
  return (n, e) => ko(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const So = To("application/xml");
function nt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
nt.prototype = {
  constructor: nt,
  scale: function (t) {
    return t === 1 ? this : new nt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new nt(this.k, this.x + this.k * t, this.y + this.k * n);
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
nt.prototype;
class Q {
  constructor(n, e, r, i, o, s, c) {
    en(this, "dragged", (n) => {
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
    if (O("#" + this.id).node() != null) return;
    const n = await So(this.url);
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
      this.sensor.node().append(O(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          Fr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    O(this).raise().classed("active", !0);
  }
  dragended(n) {
    O(this).classed("active", !1);
  }
}
const Ct = [
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
  ],
  Po = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  Mo = [
    "hc05_key_pin",
    "hc05_vcc_pin",
    "hc05_gnd_pin",
    "hc05_txd_pin",
    "hc05_rxd_pin",
    "hc05_state_pin",
  ],
  pt = {
    hc05_key_pin: "Key",
    hc05_vcc_pin: "Vcc",
    hc05_gnd_pin: "GND",
    hc05_txd_pin: "TXD",
    hc05_rxd_pin: "RXD",
    hc05_state_pin: "State",
  },
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
  },
  Ro = (t) => {
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
        Ct[r.connector];
      }),
      console.log(e, "total"),
      e == 8
    );
  };
class Lo {
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
          ? X[this.connections[this.connections.length - 2].connector]
          : pt[this.connections[this.connections.length - 2].connector]
          ? pt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = X[this.connections[this.connections.length - 1].connector]
          ? X[this.connections[this.connections.length - 1].connector]
          : pt[this.connections[this.connections.length - 1].connector]
          ? pt[this.connections[this.connections.length - 1].connector]
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
class Oo {
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
const wn = (t, n) => {
    Qt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  C = O("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Bo = new Q("raspberry", C, "./images/pi3dirk.svg", 1, !1, 0, 0),
  Do = new Q("ultraSonicsensor", C, "./images/sensor.svg", 0.45, !1, 200, 0),
  Go = new Q("box", C, "./images/box.svg", 0.7, !1, 700, 0),
  Xo = new Q("bluetootth", C, "./images/box1.svg", 0.7, !1, 700, 0),
  Ho = new Q("phone", C, "./images/test.svg", 0.7, !1, 700, 0),
  qo = new Q("bconnect", C, "./images/start.svg", 0.7, !1, 700, 0),
  Qt = C.append("g").attr("id", "pathsGroup"),
  Fo = document.getElementById("rasberryPi"),
  Yo = document.getElementById("sensor"),
  Vo = document.getElementById("object"),
  zo = document.getElementById("info"),
  Uo = document.getElementById("list"),
  bn = (t) =>
    Ct.includes(t.srcElement.id) ||
    Po.includes(t.srcElement.id) ||
    Mo.includes(t.srcElement.id),
  Ko = document.getElementById("displayInfo"),
  Wo = document.getElementById("codeSubmit");
let Mt = !1;
zo.addEventListener("click", () => {
  (Mt = !Mt), (Uo.style.display = Mt ? "block" : "none");
});
Fo.addEventListener("click", async () => await Bo.load());
Yo.addEventListener("click", () => Do.load());
let x;
const N = new Lo("connectionLog"),
  En = new Oo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let P = 0;
const Zo = document.querySelector("#undoButton");
Zo.addEventListener("click", () => {
  N.undoLastConnection(), Jo();
});
const Qo = (t) => {
  Qt.selectAll(`path[id="${t}"]`)
    .nodes()
    .forEach((e) => {
      e.remove();
    });
};
Vo.addEventListener("click", async () => {
  await Ho.load(), await Go.load(), await Xo.load(), await qo.load();
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
        const i = document.getElementById("bluetootth");
        i.style.display = "none";
      }
    });
});
const Jo = () => {
  if (x) {
    Qt.selectAll(`path[id^="path${P}"]`)
      .nodes()
      .forEach((n) => n.remove()),
      (x = null),
      (P = 0),
      console.log("Removed all incomplete paths");
    return;
  }
  if (N.connections.length > 0) {
    const n = N.connections[N.connections.length - 1].lineID;
    Qo(n), N.connections.pop(), console.log(`Removed paths with line ID: ${n}`);
  } else console.warn("No more connections to undo");
};
C.on("dblclick", (t) => {
  if (bn(t) && x == null) {
    (x = new Co()),
      x.moveTo(t.offsetX, t.offsetY),
      N.addConnection({
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
  if (t.srcElement.id == "svgContainer" && !Ct.includes(t.srcElement.id)) {
    x && x.lineTo(t.offsetX, t.offsetY),
      x &&
        N.connections.length > 0 &&
        (N.connections[N.connections.length - 1].connectorEnd = null),
      x &&
        (wn(x.toString(), `path${P}`),
        console.log("path created"),
        console.log(P));
    return;
  }
  if (bn(t) && x) {
    x.lineTo(t.offsetX, t.offsetY),
      wn(x.toString(), `path${P}`),
      N.addConnection({
        lineID: `path${P}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      P++,
      C.style("cursor", "default"),
      (x = null),
      console.log("path created 2"),
      console.log(P);
    return;
  }
});
C.on("mouseover", (t) => {
  Ct.includes(t.srcElement.id) && (Ko.innerHTML = X[t.srcElement.id]);
});
Wo.addEventListener("click", () => {
  const t = Ro(N.getConnectionLog());
  if (t == !0) {
    const n = document.getElementById("inputValue").value,
      e = document.getElementById("tspan4567");
    e.textContent = n;
  } else
    t.error
      ? En.throw("Error", t.error)
      : En.throw(
          "Error",
          "Please connect the components properly. Refer to the connection diagram."
        );
});
