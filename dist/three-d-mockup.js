const et = {};
function du(i) {
  et.context = i;
}
const vu = (i, M) => i === M, Jn = {
  equals: vu
};
let aT = CT;
const Bt = 1, Pi = 2, oT = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var KD = null;
let Ae = null, DD = null, oD = null, lt = null, Un = 0;
function pu(i, M) {
  const D = DD, t = KD, e = i.length === 0, N = e ? oT : {
    owned: null,
    cleanups: null,
    context: null,
    owner: M === void 0 ? t : M
  }, n = e ? i : () => i(() => UN(() => $i(N)));
  KD = N, DD = null;
  try {
    return fN(n, !0);
  } finally {
    DD = D, KD = t;
  }
}
function cn(i, M) {
  M = M ? Object.assign({}, Jn, M) : Jn;
  const D = {
    value: i,
    observers: null,
    observerSlots: null,
    comparator: M.equals || void 0
  }, t = (e) => (typeof e == "function" && (e = e(D.value)), yT(D, e));
  return [fu.bind(D), t];
}
function Ri(i, M, D) {
  const t = jT(i, M, !1, Bt);
  Xi(t);
}
function Yu(i, M, D) {
  aT = ku;
  const t = jT(i, M, !1, Bt);
  t.user = !0, lt ? lt.push(t) : Xi(t);
}
function UN(i) {
  if (DD === null)
    return i();
  const M = DD;
  DD = null;
  try {
    return i();
  } finally {
    DD = M;
  }
}
function Uu(i) {
  Yu(() => UN(i));
}
function fu() {
  const i = Ae;
  if (this.sources && (this.state || i))
    if (this.state === Bt || i)
      Xi(this);
    else {
      const M = oD;
      oD = null, fN(() => Bi(this), !1), oD = M;
    }
  if (DD) {
    const M = this.observers ? this.observers.length : 0;
    DD.sources ? (DD.sources.push(this), DD.sourceSlots.push(M)) : (DD.sources = [this], DD.sourceSlots = [M]), this.observers ? (this.observers.push(DD), this.observerSlots.push(DD.sources.length - 1)) : (this.observers = [DD], this.observerSlots = [DD.sources.length - 1]);
  }
  return this.value;
}
function yT(i, M, D) {
  let t = i.value;
  return (!i.comparator || !i.comparator(t, M)) && (i.value = M, i.observers && i.observers.length && fN(() => {
    for (let e = 0; e < i.observers.length; e += 1) {
      const N = i.observers[e], n = Ae && Ae.running;
      n && Ae.disposed.has(N), (n && !N.tState || !n && !N.state) && (N.pure ? oD.push(N) : lt.push(N), N.observers && LT(N)), n || (N.state = Bt);
    }
    if (oD.length > 1e6)
      throw oD = [], new Error();
  }, !1)), M;
}
function Xi(i) {
  if (!i.fn)
    return;
  $i(i);
  const M = KD, D = DD, t = Un;
  DD = KD = i, mu(i, i.value, t), DD = D, KD = M;
}
function mu(i, M, D) {
  let t;
  try {
    t = i.fn(M);
  } catch (e) {
    i.pure && (i.state = Bt, i.owned && i.owned.forEach($i), i.owned = null), wT(e);
  }
  (!i.updatedAt || i.updatedAt <= D) && (i.updatedAt != null && "observers" in i ? yT(i, t) : i.value = t, i.updatedAt = D);
}
function jT(i, M, D, t = Bt, e) {
  const N = {
    fn: i,
    state: t,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: M,
    owner: KD,
    context: null,
    pure: D
  };
  return KD === null || KD !== oT && (KD.owned ? KD.owned.push(N) : KD.owned = [N]), N;
}
function Fi(i) {
  const M = Ae;
  if (i.state === 0 || M)
    return;
  if (i.state === Pi || M)
    return Bi(i);
  if (i.suspense && UN(i.suspense.inFallback))
    return i.suspense.effects.push(i);
  const D = [i];
  for (; (i = i.owner) && (!i.updatedAt || i.updatedAt < Un); )
    (i.state || M) && D.push(i);
  for (let t = D.length - 1; t >= 0; t--)
    if (i = D[t], i.state === Bt || M)
      Xi(i);
    else if (i.state === Pi || M) {
      const e = oD;
      oD = null, fN(() => Bi(i, D[0]), !1), oD = e;
    }
}
function fN(i, M) {
  if (oD)
    return i();
  let D = !1;
  M || (oD = []), lt ? D = !0 : lt = [], Un++;
  try {
    const t = i();
    return Qu(D), t;
  } catch (t) {
    D || (lt = null), oD = null, wT(t);
  }
}
function Qu(i) {
  if (oD && (CT(oD), oD = null), i)
    return;
  const M = lt;
  lt = null, M.length && fN(() => aT(M), !1);
}
function CT(i) {
  for (let M = 0; M < i.length; M++)
    Fi(i[M]);
}
function ku(i) {
  let M, D = 0;
  for (M = 0; M < i.length; M++) {
    const t = i[M];
    t.user ? i[D++] = t : Fi(t);
  }
  for (et.context && du(), M = 0; M < D; M++)
    Fi(i[M]);
}
function Bi(i, M) {
  const D = Ae;
  i.state = 0;
  for (let t = 0; t < i.sources.length; t += 1) {
    const e = i.sources[t];
    e.sources && (e.state === Bt || D ? e !== M && Fi(e) : (e.state === Pi || D) && Bi(e, M));
  }
}
function LT(i) {
  const M = Ae;
  for (let D = 0; D < i.observers.length; D += 1) {
    const t = i.observers[D];
    (!t.state || M) && (t.state = Pi, t.pure ? oD.push(t) : lt.push(t), t.observers && LT(t));
  }
}
function $i(i) {
  let M;
  if (i.sources)
    for (; i.sources.length; ) {
      const D = i.sources.pop(), t = i.sourceSlots.pop(), e = D.observers;
      if (e && e.length) {
        const N = e.pop(), n = D.observerSlots.pop();
        t < e.length && (N.sourceSlots[n] = t, e[t] = N, D.observerSlots[t] = n);
      }
    }
  if (i.owned) {
    for (M = 0; M < i.owned.length; M++)
      $i(i.owned[M]);
    i.owned = null;
  }
  if (i.cleanups) {
    for (M = 0; M < i.cleanups.length; M++)
      i.cleanups[M]();
    i.cleanups = null;
  }
  i.state = 0, i.context = null;
}
function Su(i) {
  return i instanceof Error || typeof i == "string" ? i : new Error("Unknown error");
}
function wT(i) {
  throw i = Su(i), i;
}
function Zu(i, M) {
  return UN(() => i(M || {}));
}
function _u(i, M, D) {
  let t = D.length, e = M.length, N = t, n = 0, A = 0, z = M[e - 1].nextSibling, I = null;
  for (; n < e || A < N; ) {
    if (M[n] === D[A]) {
      n++, A++;
      continue;
    }
    for (; M[e - 1] === D[N - 1]; )
      e--, N--;
    if (e === n) {
      const T = N < t ? A ? D[A - 1].nextSibling : D[N - A] : z;
      for (; A < N; )
        i.insertBefore(D[A++], T);
    } else if (N === A)
      for (; n < e; )
        (!I || !I.has(M[n])) && M[n].remove(), n++;
    else if (M[n] === D[N - 1] && D[A] === M[e - 1]) {
      const T = M[--e].nextSibling;
      i.insertBefore(D[A++], M[n++].nextSibling), i.insertBefore(D[--N], T), M[e] = D[N];
    } else {
      if (!I) {
        I = /* @__PURE__ */ new Map();
        let u = A;
        for (; u < N; )
          I.set(D[u], u++);
      }
      const T = I.get(M[n]);
      if (T != null)
        if (A < T && T < N) {
          let u = n, g = 1, s;
          for (; ++u < e && u < N && !((s = I.get(M[u])) == null || s !== T + g); )
            g++;
          if (g > T - A) {
            const a = M[n];
            for (; A < T; )
              i.insertBefore(D[A++], a);
          } else
            i.replaceChild(D[A++], M[n++]);
        } else
          n++;
      else
        M[n++].remove();
    }
  }
}
const Mz = "_$DX_DELEGATE";
function xT(i, M, D) {
  const t = document.createElement("template");
  t.innerHTML = i;
  let e = t.content.firstChild;
  return D && (e = e.firstChild), e;
}
function bu(i, M = window.document) {
  const D = M[Mz] || (M[Mz] = /* @__PURE__ */ new Set());
  for (let t = 0, e = i.length; t < e; t++) {
    const N = i[t];
    D.has(N) || (D.add(N), M.addEventListener(N, Pu));
  }
}
function Ku(i, M, D) {
  return UN(() => i(M, D));
}
function OT(i, M, D, t) {
  if (D !== void 0 && !t && (t = []), typeof M != "function")
    return Vi(i, M, t, D);
  Ri((e) => Vi(i, M(), e, D), t);
}
function Pu(i) {
  const M = `$$${i.type}`;
  let D = i.composedPath && i.composedPath()[0] || i.target;
  for (i.target !== D && Object.defineProperty(i, "target", {
    configurable: !0,
    value: D
  }), Object.defineProperty(i, "currentTarget", {
    configurable: !0,
    get() {
      return D || document;
    }
  }), et.registry && !et.done && (et.done = !0, document.querySelectorAll("[id^=pl-]").forEach((t) => {
    for (; t && t.nodeType !== 8 && t.nodeValue !== "pl-" + i; ) {
      let e = t.nextSibling;
      t.remove(), t = e;
    }
    t && t.remove();
  })); D; ) {
    const t = D[M];
    if (t && !D.disabled) {
      const e = D[`${M}Data`];
      if (e !== void 0 ? t.call(D, e, i) : t.call(D, i), i.cancelBubble)
        return;
    }
    D = D._$host || D.parentNode || D.host;
  }
}
function Vi(i, M, D, t, e) {
  for (et.context && !D && (D = [...i.childNodes]); typeof D == "function"; )
    D = D();
  if (M === D)
    return D;
  const N = typeof M, n = t !== void 0;
  if (i = n && D[0] && D[0].parentNode || i, N === "string" || N === "number") {
    if (et.context)
      return D;
    if (N === "number" && (M = M.toString()), n) {
      let A = D[0];
      A && A.nodeType === 3 ? A.data = M : A = document.createTextNode(M), D = ce(i, D, t, A);
    } else
      D !== "" && typeof D == "string" ? D = i.firstChild.data = M : D = i.textContent = M;
  } else if (M == null || N === "boolean") {
    if (et.context)
      return D;
    D = ce(i, D, t);
  } else {
    if (N === "function")
      return Ri(() => {
        let A = M();
        for (; typeof A == "function"; )
          A = A();
        D = Vi(i, A, D, t);
      }), () => D;
    if (Array.isArray(M)) {
      const A = [], z = D && Array.isArray(D);
      if (an(A, M, D, e))
        return Ri(() => D = Vi(i, A, D, t, !0)), () => D;
      if (et.context) {
        if (!A.length)
          return D;
        for (let I = 0; I < A.length; I++)
          if (A[I].parentNode)
            return D = A;
      }
      if (A.length === 0) {
        if (D = ce(i, D, t), n)
          return D;
      } else
        z ? D.length === 0 ? Dz(i, A, t) : _u(i, D, A) : (D && ce(i), Dz(i, A));
      D = A;
    } else if (M instanceof Node) {
      if (et.context && M.parentNode)
        return D = n ? [M] : M;
      if (Array.isArray(D)) {
        if (n)
          return D = ce(i, D, t, M);
        ce(i, D, null, M);
      } else
        D == null || D === "" || !i.firstChild ? i.appendChild(M) : i.replaceChild(M, i.firstChild);
      D = M;
    }
  }
  return D;
}
function an(i, M, D, t) {
  let e = !1;
  for (let N = 0, n = M.length; N < n; N++) {
    let A = M[N], z = D && D[N];
    if (A instanceof Node)
      i.push(A);
    else if (!(A == null || A === !0 || A === !1))
      if (Array.isArray(A))
        e = an(i, A, z) || e;
      else if (typeof A == "function")
        if (t) {
          for (; typeof A == "function"; )
            A = A();
          e = an(i, Array.isArray(A) ? A : [A], Array.isArray(z) ? z : [z]) || e;
        } else
          i.push(A), e = !0;
      else {
        const I = String(A);
        z && z.nodeType === 3 && z.data === I ? i.push(z) : i.push(document.createTextNode(I));
      }
  }
  return e;
}
function Dz(i, M, D = null) {
  for (let t = 0, e = M.length; t < e; t++)
    i.insertBefore(M[t], D);
}
function ce(i, M, D, t) {
  if (D === void 0)
    return i.textContent = "";
  const e = t || document.createTextNode("");
  if (M.length) {
    let N = !1;
    for (let n = M.length - 1; n >= 0; n--) {
      const A = M[n];
      if (e !== A) {
        const z = A.parentNode === i;
        !N && !n ? z ? i.replaceChild(e, A) : i.insertBefore(e, D) : z && A.remove();
      } else
        N = !0;
    }
  } else
    i.insertBefore(e, D);
  return [e];
}
function Ru(i) {
  return Object.keys(i).reduce((D, t) => {
    const e = i[t];
    return D[t] = Object.assign({}, e), lT(e.value) && !Hu(e.value) && !Array.isArray(e.value) && (D[t].value = Object.assign({}, e.value)), Array.isArray(e.value) && (D[t].value = e.value.slice(0)), D;
  }, {});
}
function Fu(i) {
  return i ? Object.keys(i).reduce((D, t) => {
    const e = i[t];
    return D[t] = lT(e) && "value" in e ? e : {
      value: e
    }, D[t].attribute || (D[t].attribute = Gu(t)), D[t].parse = "parse" in D[t] ? D[t].parse : typeof D[t].value != "string", D;
  }, {}) : {};
}
function Bu(i) {
  return Object.keys(i).reduce((D, t) => (D[t] = i[t].value, D), {});
}
function Vu(i, M) {
  const D = Ru(M);
  return Object.keys(M).forEach((e) => {
    const N = D[e], n = i.getAttribute(N.attribute), A = i[e];
    n && (N.value = N.parse ? ET(n) : n), A != null && (N.value = Array.isArray(A) ? A.slice(0) : A), N.reflect && tz(i, N.attribute, N.value), Object.defineProperty(i, e, {
      get() {
        return N.value;
      },
      set(z) {
        const I = N.value;
        N.value = z, N.reflect && tz(this, N.attribute, N.value);
        for (let T = 0, u = this.__propertyChangedCallbacks.length; T < u; T++)
          this.__propertyChangedCallbacks[T](e, z, I);
      },
      enumerable: !0,
      configurable: !0
    });
  }), D;
}
function ET(i) {
  if (i)
    try {
      return JSON.parse(i);
    } catch {
      return i;
    }
}
function tz(i, M, D) {
  if (D == null || D === !1)
    return i.removeAttribute(M);
  let t = JSON.stringify(D);
  i.__updating[M] = !0, t === "true" && (t = ""), i.setAttribute(M, t), Promise.resolve().then(() => delete i.__updating[M]);
}
function Gu(i) {
  return i.replace(/\.?([A-Z]+)/g, (M, D) => "-" + D.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function lT(i) {
  return i != null && (typeof i == "object" || typeof i == "function");
}
function Hu(i) {
  return Object.prototype.toString.call(i) === "[object Function]";
}
function Wu(i) {
  return typeof i == "function" && i.toString().indexOf("class") === 0;
}
let TA;
function qu(i, M) {
  const D = Object.keys(M);
  return class extends i {
    static get observedAttributes() {
      return D.map((e) => M[e].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Vu(this, M);
      const e = Bu(this.props), N = this.Component, n = TA;
      try {
        TA = this, this.__initialized = !0, Wu(N) ? new N(e, {
          element: this
        }) : N(e, {
          element: this
        });
      } finally {
        TA = n;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let e = null;
      for (; e = this.__releaseCallbacks.pop(); )
        e(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(e, N, n) {
      if (this.__initialized && !this.__updating[e] && (e = this.lookupProp(e), e in M)) {
        if (n == null && !this[e])
          return;
        this[e] = M[e].parse ? ET(n) : n;
      }
    }
    lookupProp(e) {
      if (M)
        return D.find((N) => e === N || e === M[N].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(e) {
      this.__releaseCallbacks.push(e);
    }
    addPropertyChangedCallback(e) {
      this.__propertyChangedCallbacks.push(e);
    }
  };
}
function Xu(i, M = {}, D = {}) {
  const {
    BaseElement: t = HTMLElement,
    extension: e
  } = D;
  return (N) => {
    if (!i)
      throw new Error("tag is required to register a Component");
    let n = customElements.get(i);
    return n ? (n.prototype.Component = N, n) : (n = qu(t, Fu(M)), n.prototype.Component = N, n.prototype.registeredTag = i, customElements.define(i, n, e), n);
  };
}
function $u(i) {
  const M = Object.keys(i), D = {};
  for (let t = 0; t < M.length; t++) {
    const [e, N] = cn(i[M[t]]);
    Object.defineProperty(D, M[t], {
      get: e,
      set(n) {
        N(() => n);
      }
    });
  }
  return D;
}
function Ju(i) {
  if (i.assignedSlot && i.assignedSlot._$owner)
    return i.assignedSlot._$owner;
  let M = i.parentNode;
  for (; M && !M._$owner && !(M.assignedSlot && M.assignedSlot._$owner); )
    M = M.parentNode;
  return M && M.assignedSlot ? M.assignedSlot._$owner : i._$owner;
}
function Mg(i) {
  return (M, D) => {
    const { element: t } = D;
    return pu((e) => {
      const N = $u(M);
      t.addPropertyChangedCallback((A, z) => N[A] = z), t.addReleaseCallback(() => {
        t.renderRoot.textContent = "", e();
      });
      const n = i(N, D);
      return OT(t.renderRoot, n);
    }, Ju(t));
  };
}
function Dg(i, M, D) {
  return arguments.length === 2 && (D = M, M = {}), Xu(i, M)(Mg(D));
}
const gD = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], uA = Math.PI / 180, on = 180 / Math.PI;
function eN() {
  const i = Math.random() * 4294967295 | 0, M = Math.random() * 4294967295 | 0, D = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0;
  return (gD[i & 255] + gD[i >> 8 & 255] + gD[i >> 16 & 255] + gD[i >> 24 & 255] + "-" + gD[M & 255] + gD[M >> 8 & 255] + "-" + gD[M >> 16 & 15 | 64] + gD[M >> 24 & 255] + "-" + gD[D & 63 | 128] + gD[D >> 8 & 255] + "-" + gD[D >> 16 & 255] + gD[D >> 24 & 255] + gD[t & 255] + gD[t >> 8 & 255] + gD[t >> 16 & 255] + gD[t >> 24 & 255]).toLowerCase();
}
function aD(i, M, D) {
  return Math.max(M, Math.min(D, i));
}
function tg(i, M) {
  return (i % M + M) % M;
}
function gA(i, M, D) {
  return (1 - D) * i + D * M;
}
function ez(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function yn(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function IN(i, M) {
  switch (M.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function ED(i, M) {
  switch (M.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
let mN = class {
  constructor(M = 0, D = 0, t = 0, e = 1) {
    this.isQuaternion = !0, this._x = M, this._y = D, this._z = t, this._w = e;
  }
  static slerpFlat(M, D, t, e, N, n, A) {
    let z = t[e + 0], I = t[e + 1], T = t[e + 2], u = t[e + 3];
    const g = N[n + 0], s = N[n + 1], a = N[n + 2], o = N[n + 3];
    if (A === 0) {
      M[D + 0] = z, M[D + 1] = I, M[D + 2] = T, M[D + 3] = u;
      return;
    }
    if (A === 1) {
      M[D + 0] = g, M[D + 1] = s, M[D + 2] = a, M[D + 3] = o;
      return;
    }
    if (u !== o || z !== g || I !== s || T !== a) {
      let c = 1 - A;
      const r = z * g + I * s + T * a + u * o, w = r >= 0 ? 1 : -1, y = 1 - r * r;
      if (y > Number.EPSILON) {
        const l = Math.sqrt(y), d = Math.atan2(l, r * w);
        c = Math.sin(c * d) / l, A = Math.sin(A * d) / l;
      }
      const j = A * w;
      if (z = z * c + g * j, I = I * c + s * j, T = T * c + a * j, u = u * c + o * j, c === 1 - A) {
        const l = 1 / Math.sqrt(z * z + I * I + T * T + u * u);
        z *= l, I *= l, T *= l, u *= l;
      }
    }
    M[D] = z, M[D + 1] = I, M[D + 2] = T, M[D + 3] = u;
  }
  static multiplyQuaternionsFlat(M, D, t, e, N, n) {
    const A = t[e], z = t[e + 1], I = t[e + 2], T = t[e + 3], u = N[n], g = N[n + 1], s = N[n + 2], a = N[n + 3];
    return M[D] = A * a + T * u + z * s - I * g, M[D + 1] = z * a + T * g + I * u - A * s, M[D + 2] = I * a + T * s + A * g - z * u, M[D + 3] = T * a - A * u - z * g - I * s, M;
  }
  get x() {
    return this._x;
  }
  set x(M) {
    this._x = M, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(M) {
    this._y = M, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(M) {
    this._z = M, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(M) {
    this._w = M, this._onChangeCallback();
  }
  set(M, D, t, e) {
    return this._x = M, this._y = D, this._z = t, this._w = e, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(M) {
    return this._x = M.x, this._y = M.y, this._z = M.z, this._w = M.w, this._onChangeCallback(), this;
  }
  setFromEuler(M, D) {
    const t = M._x, e = M._y, N = M._z, n = M._order, A = Math.cos, z = Math.sin, I = A(t / 2), T = A(e / 2), u = A(N / 2), g = z(t / 2), s = z(e / 2), a = z(N / 2);
    switch (n) {
      case "XYZ":
        this._x = g * T * u + I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "YXZ":
        this._x = g * T * u + I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u + g * s * a;
        break;
      case "ZXY":
        this._x = g * T * u - I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "ZYX":
        this._x = g * T * u - I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u + g * s * a;
        break;
      case "YZX":
        this._x = g * T * u + I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "XZY":
        this._x = g * T * u - I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u + g * s * a;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + n);
    }
    return D !== !1 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(M, D) {
    const t = D / 2, e = Math.sin(t);
    return this._x = M.x * e, this._y = M.y * e, this._z = M.z * e, this._w = Math.cos(t), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M) {
    const D = M.elements, t = D[0], e = D[4], N = D[8], n = D[1], A = D[5], z = D[9], I = D[2], T = D[6], u = D[10], g = t + A + u;
    if (g > 0) {
      const s = 0.5 / Math.sqrt(g + 1);
      this._w = 0.25 / s, this._x = (T - z) * s, this._y = (N - I) * s, this._z = (n - e) * s;
    } else if (t > A && t > u) {
      const s = 2 * Math.sqrt(1 + t - A - u);
      this._w = (T - z) / s, this._x = 0.25 * s, this._y = (e + n) / s, this._z = (N + I) / s;
    } else if (A > u) {
      const s = 2 * Math.sqrt(1 + A - t - u);
      this._w = (N - I) / s, this._x = (e + n) / s, this._y = 0.25 * s, this._z = (z + T) / s;
    } else {
      const s = 2 * Math.sqrt(1 + u - t - A);
      this._w = (n - e) / s, this._x = (N + I) / s, this._y = (z + T) / s, this._z = 0.25 * s;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(M, D) {
    let t = M.dot(D) + 1;
    return t < Number.EPSILON ? (t = 0, Math.abs(M.x) > Math.abs(M.z) ? (this._x = -M.y, this._y = M.x, this._z = 0, this._w = t) : (this._x = 0, this._y = -M.z, this._z = M.y, this._w = t)) : (this._x = M.y * D.z - M.z * D.y, this._y = M.z * D.x - M.x * D.z, this._z = M.x * D.y - M.y * D.x, this._w = t), this.normalize();
  }
  angleTo(M) {
    return 2 * Math.acos(Math.abs(aD(this.dot(M), -1, 1)));
  }
  rotateTowards(M, D) {
    const t = this.angleTo(M);
    if (t === 0)
      return this;
    const e = Math.min(1, D / t);
    return this.slerp(M, e), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(M) {
    return this._x * M._x + this._y * M._y + this._z * M._z + this._w * M._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let M = this.length();
    return M === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (M = 1 / M, this._x = this._x * M, this._y = this._y * M, this._z = this._z * M, this._w = this._w * M), this._onChangeCallback(), this;
  }
  multiply(M) {
    return this.multiplyQuaternions(this, M);
  }
  premultiply(M) {
    return this.multiplyQuaternions(M, this);
  }
  multiplyQuaternions(M, D) {
    const t = M._x, e = M._y, N = M._z, n = M._w, A = D._x, z = D._y, I = D._z, T = D._w;
    return this._x = t * T + n * A + e * I - N * z, this._y = e * T + n * z + N * A - t * I, this._z = N * T + n * I + t * z - e * A, this._w = n * T - t * A - e * z - N * I, this._onChangeCallback(), this;
  }
  slerp(M, D) {
    if (D === 0)
      return this;
    if (D === 1)
      return this.copy(M);
    const t = this._x, e = this._y, N = this._z, n = this._w;
    let A = n * M._w + t * M._x + e * M._y + N * M._z;
    if (A < 0 ? (this._w = -M._w, this._x = -M._x, this._y = -M._y, this._z = -M._z, A = -A) : this.copy(M), A >= 1)
      return this._w = n, this._x = t, this._y = e, this._z = N, this;
    const z = 1 - A * A;
    if (z <= Number.EPSILON) {
      const s = 1 - D;
      return this._w = s * n + D * this._w, this._x = s * t + D * this._x, this._y = s * e + D * this._y, this._z = s * N + D * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const I = Math.sqrt(z), T = Math.atan2(I, A), u = Math.sin((1 - D) * T) / I, g = Math.sin(D * T) / I;
    return this._w = n * u + this._w * g, this._x = t * u + this._x * g, this._y = e * u + this._y * g, this._z = N * u + this._z * g, this._onChangeCallback(), this;
  }
  slerpQuaternions(M, D, t) {
    return this.copy(M).slerp(D, t);
  }
  random() {
    const M = Math.random(), D = Math.sqrt(1 - M), t = Math.sqrt(M), e = 2 * Math.PI * Math.random(), N = 2 * Math.PI * Math.random();
    return this.set(
      D * Math.cos(e),
      t * Math.sin(N),
      t * Math.cos(N),
      D * Math.sin(e)
    );
  }
  equals(M) {
    return M._x === this._x && M._y === this._y && M._z === this._z && M._w === this._w;
  }
  fromArray(M, D = 0) {
    return this._x = M[D], this._y = M[D + 1], this._z = M[D + 2], this._w = M[D + 3], this._onChangeCallback(), this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this._x, M[D + 1] = this._y, M[D + 2] = this._z, M[D + 3] = this._w, M;
  }
  fromBufferAttribute(M, D) {
    return this._x = M.getX(D), this._y = M.getY(D), this._z = M.getZ(D), this._w = M.getW(D), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}, Y = class hT {
  constructor(M = 0, D = 0, t = 0) {
    hT.prototype.isVector3 = !0, this.x = M, this.y = D, this.z = t;
  }
  set(M, D, t) {
    return t === void 0 && (t = this.z), this.x = M, this.y = D, this.z = t, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this.z = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setZ(M) {
    return this.z = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      case 2:
        this.z = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this.z = M.z, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this.z += M.z, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this.z += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this.z = M.z + D.z, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this.z += M.z * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this.z -= M.z, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this.z -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this.z = M.z - D.z, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this.z *= M.z, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this.z *= M, this;
  }
  multiplyVectors(M, D) {
    return this.x = M.x * D.x, this.y = M.y * D.y, this.z = M.z * D.z, this;
  }
  applyEuler(M) {
    return this.applyQuaternion(Nz.setFromEuler(M));
  }
  applyAxisAngle(M, D) {
    return this.applyQuaternion(Nz.setFromAxisAngle(M, D));
  }
  applyMatrix3(M) {
    const D = this.x, t = this.y, e = this.z, N = M.elements;
    return this.x = N[0] * D + N[3] * t + N[6] * e, this.y = N[1] * D + N[4] * t + N[7] * e, this.z = N[2] * D + N[5] * t + N[8] * e, this;
  }
  applyNormalMatrix(M) {
    return this.applyMatrix3(M).normalize();
  }
  applyMatrix4(M) {
    const D = this.x, t = this.y, e = this.z, N = M.elements, n = 1 / (N[3] * D + N[7] * t + N[11] * e + N[15]);
    return this.x = (N[0] * D + N[4] * t + N[8] * e + N[12]) * n, this.y = (N[1] * D + N[5] * t + N[9] * e + N[13]) * n, this.z = (N[2] * D + N[6] * t + N[10] * e + N[14]) * n, this;
  }
  applyQuaternion(M) {
    const D = this.x, t = this.y, e = this.z, N = M.x, n = M.y, A = M.z, z = M.w, I = z * D + n * e - A * t, T = z * t + A * D - N * e, u = z * e + N * t - n * D, g = -N * D - n * t - A * e;
    return this.x = I * z + g * -N + T * -A - u * -n, this.y = T * z + g * -n + u * -N - I * -A, this.z = u * z + g * -A + I * -n - T * -N, this;
  }
  project(M) {
    return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix);
  }
  unproject(M) {
    return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld);
  }
  transformDirection(M) {
    const D = this.x, t = this.y, e = this.z, N = M.elements;
    return this.x = N[0] * D + N[4] * t + N[8] * e, this.y = N[1] * D + N[5] * t + N[9] * e, this.z = N[2] * D + N[6] * t + N[10] * e, this.normalize();
  }
  divide(M) {
    return this.x /= M.x, this.y /= M.y, this.z /= M.z, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this.z = Math.min(this.z, M.z), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this.z = Math.max(this.z, M.z), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this.z = Math.max(M.z, Math.min(D.z, this.z)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this.z = Math.max(M, Math.min(D, this.z)), this;
  }
  clampLength(M, D) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(Math.max(M, Math.min(D, t)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y + this.z * M.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this.z += (M.z - this.z) * D, this;
  }
  lerpVectors(M, D, t) {
    return this.x = M.x + (D.x - M.x) * t, this.y = M.y + (D.y - M.y) * t, this.z = M.z + (D.z - M.z) * t, this;
  }
  cross(M) {
    return this.crossVectors(this, M);
  }
  crossVectors(M, D) {
    const t = M.x, e = M.y, N = M.z, n = D.x, A = D.y, z = D.z;
    return this.x = e * z - N * A, this.y = N * n - t * z, this.z = t * A - e * n, this;
  }
  projectOnVector(M) {
    const D = M.lengthSq();
    if (D === 0)
      return this.set(0, 0, 0);
    const t = M.dot(this) / D;
    return this.copy(M).multiplyScalar(t);
  }
  projectOnPlane(M) {
    return sA.copy(this).projectOnVector(M), this.sub(sA);
  }
  reflect(M) {
    return this.sub(sA.copy(M).multiplyScalar(2 * this.dot(M)));
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const t = this.dot(M) / D;
    return Math.acos(aD(t, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, t = this.y - M.y, e = this.z - M.z;
    return D * D + t * t + e * e;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y) + Math.abs(this.z - M.z);
  }
  setFromSpherical(M) {
    return this.setFromSphericalCoords(M.radius, M.phi, M.theta);
  }
  setFromSphericalCoords(M, D, t) {
    const e = Math.sin(D) * M;
    return this.x = e * Math.sin(t), this.y = Math.cos(D) * M, this.z = e * Math.cos(t), this;
  }
  setFromCylindrical(M) {
    return this.setFromCylindricalCoords(M.radius, M.theta, M.y);
  }
  setFromCylindricalCoords(M, D, t) {
    return this.x = M * Math.sin(D), this.y = t, this.z = M * Math.cos(D), this;
  }
  setFromMatrixPosition(M) {
    const D = M.elements;
    return this.x = D[12], this.y = D[13], this.z = D[14], this;
  }
  setFromMatrixScale(M) {
    const D = this.setFromMatrixColumn(M, 0).length(), t = this.setFromMatrixColumn(M, 1).length(), e = this.setFromMatrixColumn(M, 2).length();
    return this.x = D, this.y = t, this.z = e, this;
  }
  setFromMatrixColumn(M, D) {
    return this.fromArray(M.elements, D * 4);
  }
  setFromMatrix3Column(M, D) {
    return this.fromArray(M.elements, D * 3);
  }
  setFromEuler(M) {
    return this.x = M._x, this.y = M._y, this.z = M._z, this;
  }
  setFromColor(M) {
    return this.x = M.r, this.y = M.g, this.z = M.b, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y && M.z === this.z;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this.z = M[D + 2], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M[D + 2] = this.z, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this.z = M.getZ(D), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const M = (Math.random() - 0.5) * 2, D = Math.random() * Math.PI * 2, t = Math.sqrt(1 - M ** 2);
    return this.x = t * Math.cos(D), this.y = t * Math.sin(D), this.z = M, this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
};
const sA = /* @__PURE__ */ new Y(), Nz = /* @__PURE__ */ new mN(), eg = `.mockup{width:100%;height:100%;animation:levitate 1.5s infinite alternate ease-in-out}@keyframes levitate{0%{transform:translateY(-2%)}to{transform:translateY(2%)}}
`, Ng = "157", ig = 0, iz = 1, Ag = 2, dT = 1, ng = 2, wt = 3, Ft = 0, vD = 1, Ot = 2, Kt = 0, He = 1, Az = 2, nz = 3, zz = 4, zg = 5, Be = 100, Ig = 101, Tg = 102, Iz = 103, Tz = 104, ug = 200, gg = 201, sg = 202, rg = 203, vT = 204, pT = 205, cg = 206, ag = 207, og = 208, yg = 209, jg = 210, Cg = 0, Lg = 1, wg = 2, jn = 3, xg = 4, Og = 5, Eg = 6, lg = 7, fn = 0, hg = 1, dg = 2, Pt = 0, vg = 1, pg = 2, Yg = 3, Ug = 4, fg = 5, YT = 300, $e = 301, Je = 302, Cn = 303, Ln = 304, Ji = 306, wn = 1e3, $D = 1001, xn = 1002, wD = 1003, uz = 1004, rA = 1005, hD = 1006, mg = 1007, lN = 1008, Rt = 1009, Qg = 1010, kg = 1011, mn = 1012, UT = 1013, _t = 1014, bt = 1015, hN = 1016, fT = 1017, mT = 1018, ne = 1020, Sg = 1021, JD = 1023, Zg = 1024, _g = 1025, ze = 1026, MN = 1027, bg = 1028, QT = 1029, Kg = 1030, kT = 1031, ST = 1033, cA = 33776, aA = 33777, oA = 33778, yA = 33779, gz = 35840, sz = 35841, rz = 35842, cz = 35843, Pg = 36196, az = 37492, oz = 37496, yz = 37808, jz = 37809, Cz = 37810, Lz = 37811, wz = 37812, xz = 37813, Oz = 37814, Ez = 37815, lz = 37816, hz = 37817, dz = 37818, vz = 37819, pz = 37820, Yz = 37821, jA = 36492, Uz = 36494, fz = 36495, Rg = 36283, mz = 36284, Qz = 36285, kz = 36286, ZT = 3e3, Ie = 3001, Fg = 3200, Bg = 3201, _T = 0, Vg = 1, RD = "", tD = "srgb", dt = "srgb-linear", Qn = "display-p3", MA = "display-p3-linear", Gi = "linear", VM = "srgb", Hi = "rec709", Wi = "p3", CA = 7680, Gg = 519, Hg = 512, Wg = 513, qg = 514, Xg = 515, $g = 516, Jg = 517, Ms = 518, Ds = 519, Sz = 35044, Zz = "300 es", On = 1035, Et = 2e3, qi = 2001;
let ID = class En {
  constructor(M, D, t, e, N, n, A, z, I, T, u, g, s, a, o, c) {
    En.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], M !== void 0 && this.set(M, D, t, e, N, n, A, z, I, T, u, g, s, a, o, c);
  }
  set(M, D, t, e, N, n, A, z, I, T, u, g, s, a, o, c) {
    const r = this.elements;
    return r[0] = M, r[4] = D, r[8] = t, r[12] = e, r[1] = N, r[5] = n, r[9] = A, r[13] = z, r[2] = I, r[6] = T, r[10] = u, r[14] = g, r[3] = s, r[7] = a, r[11] = o, r[15] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new En().fromArray(this.elements);
  }
  copy(M) {
    const D = this.elements, t = M.elements;
    return D[0] = t[0], D[1] = t[1], D[2] = t[2], D[3] = t[3], D[4] = t[4], D[5] = t[5], D[6] = t[6], D[7] = t[7], D[8] = t[8], D[9] = t[9], D[10] = t[10], D[11] = t[11], D[12] = t[12], D[13] = t[13], D[14] = t[14], D[15] = t[15], this;
  }
  copyPosition(M) {
    const D = this.elements, t = M.elements;
    return D[12] = t[12], D[13] = t[13], D[14] = t[14], this;
  }
  setFromMatrix3(M) {
    const D = M.elements;
    return this.set(
      D[0],
      D[3],
      D[6],
      0,
      D[1],
      D[4],
      D[7],
      0,
      D[2],
      D[5],
      D[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(M, D, t) {
    return M.setFromMatrixColumn(this, 0), D.setFromMatrixColumn(this, 1), t.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(M, D, t) {
    return this.set(
      M.x,
      D.x,
      t.x,
      0,
      M.y,
      D.y,
      t.y,
      0,
      M.z,
      D.z,
      t.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(M) {
    const D = this.elements, t = M.elements, e = 1 / ae.setFromMatrixColumn(M, 0).length(), N = 1 / ae.setFromMatrixColumn(M, 1).length(), n = 1 / ae.setFromMatrixColumn(M, 2).length();
    return D[0] = t[0] * e, D[1] = t[1] * e, D[2] = t[2] * e, D[3] = 0, D[4] = t[4] * N, D[5] = t[5] * N, D[6] = t[6] * N, D[7] = 0, D[8] = t[8] * n, D[9] = t[9] * n, D[10] = t[10] * n, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromEuler(M) {
    const D = this.elements, t = M.x, e = M.y, N = M.z, n = Math.cos(t), A = Math.sin(t), z = Math.cos(e), I = Math.sin(e), T = Math.cos(N), u = Math.sin(N);
    if (M.order === "XYZ") {
      const g = n * T, s = n * u, a = A * T, o = A * u;
      D[0] = z * T, D[4] = -z * u, D[8] = I, D[1] = s + a * I, D[5] = g - o * I, D[9] = -A * z, D[2] = o - g * I, D[6] = a + s * I, D[10] = n * z;
    } else if (M.order === "YXZ") {
      const g = z * T, s = z * u, a = I * T, o = I * u;
      D[0] = g + o * A, D[4] = a * A - s, D[8] = n * I, D[1] = n * u, D[5] = n * T, D[9] = -A, D[2] = s * A - a, D[6] = o + g * A, D[10] = n * z;
    } else if (M.order === "ZXY") {
      const g = z * T, s = z * u, a = I * T, o = I * u;
      D[0] = g - o * A, D[4] = -n * u, D[8] = a + s * A, D[1] = s + a * A, D[5] = n * T, D[9] = o - g * A, D[2] = -n * I, D[6] = A, D[10] = n * z;
    } else if (M.order === "ZYX") {
      const g = n * T, s = n * u, a = A * T, o = A * u;
      D[0] = z * T, D[4] = a * I - s, D[8] = g * I + o, D[1] = z * u, D[5] = o * I + g, D[9] = s * I - a, D[2] = -I, D[6] = A * z, D[10] = n * z;
    } else if (M.order === "YZX") {
      const g = n * z, s = n * I, a = A * z, o = A * I;
      D[0] = z * T, D[4] = o - g * u, D[8] = a * u + s, D[1] = u, D[5] = n * T, D[9] = -A * T, D[2] = -I * T, D[6] = s * u + a, D[10] = g - o * u;
    } else if (M.order === "XZY") {
      const g = n * z, s = n * I, a = A * z, o = A * I;
      D[0] = z * T, D[4] = -u, D[8] = I * T, D[1] = g * u + o, D[5] = n * T, D[9] = s * u - a, D[2] = a * u - s, D[6] = A * T, D[10] = o * u + g;
    }
    return D[3] = 0, D[7] = 0, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromQuaternion(M) {
    return this.compose(ts, M, es);
  }
  lookAt(M, D, t) {
    const e = this.elements;
    return UD.subVectors(M, D), UD.lengthSq() === 0 && (UD.z = 1), UD.normalize(), vt.crossVectors(t, UD), vt.lengthSq() === 0 && (Math.abs(t.z) === 1 ? UD.x += 1e-4 : UD.z += 1e-4, UD.normalize(), vt.crossVectors(t, UD)), vt.normalize(), PN.crossVectors(UD, vt), e[0] = vt.x, e[4] = PN.x, e[8] = UD.x, e[1] = vt.y, e[5] = PN.y, e[9] = UD.y, e[2] = vt.z, e[6] = PN.z, e[10] = UD.z, this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const t = M.elements, e = D.elements, N = this.elements, n = t[0], A = t[4], z = t[8], I = t[12], T = t[1], u = t[5], g = t[9], s = t[13], a = t[2], o = t[6], c = t[10], r = t[14], w = t[3], y = t[7], j = t[11], l = t[15], d = e[0], h = e[4], S = e[8], L = e[12], O = e[1], K = e[5], F = e[9], G = e[13], p = e[2], k = e[6], B = e[10], R = e[14], $ = e[3], H = e[7], V = e[11], U = e[15];
    return N[0] = n * d + A * O + z * p + I * $, N[4] = n * h + A * K + z * k + I * H, N[8] = n * S + A * F + z * B + I * V, N[12] = n * L + A * G + z * R + I * U, N[1] = T * d + u * O + g * p + s * $, N[5] = T * h + u * K + g * k + s * H, N[9] = T * S + u * F + g * B + s * V, N[13] = T * L + u * G + g * R + s * U, N[2] = a * d + o * O + c * p + r * $, N[6] = a * h + o * K + c * k + r * H, N[10] = a * S + o * F + c * B + r * V, N[14] = a * L + o * G + c * R + r * U, N[3] = w * d + y * O + j * p + l * $, N[7] = w * h + y * K + j * k + l * H, N[11] = w * S + y * F + j * B + l * V, N[15] = w * L + y * G + j * R + l * U, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[4] *= M, D[8] *= M, D[12] *= M, D[1] *= M, D[5] *= M, D[9] *= M, D[13] *= M, D[2] *= M, D[6] *= M, D[10] *= M, D[14] *= M, D[3] *= M, D[7] *= M, D[11] *= M, D[15] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], t = M[4], e = M[8], N = M[12], n = M[1], A = M[5], z = M[9], I = M[13], T = M[2], u = M[6], g = M[10], s = M[14], a = M[3], o = M[7], c = M[11], r = M[15];
    return a * (+N * z * u - e * I * u - N * A * g + t * I * g + e * A * s - t * z * s) + o * (+D * z * s - D * I * g + N * n * g - e * n * s + e * I * T - N * z * T) + c * (+D * I * u - D * A * s - N * n * u + t * n * s + N * A * T - t * I * T) + r * (-e * A * T - D * z * u + D * A * g + e * n * u - t * n * g + t * z * T);
  }
  transpose() {
    const M = this.elements;
    let D;
    return D = M[1], M[1] = M[4], M[4] = D, D = M[2], M[2] = M[8], M[8] = D, D = M[6], M[6] = M[9], M[9] = D, D = M[3], M[3] = M[12], M[12] = D, D = M[7], M[7] = M[13], M[13] = D, D = M[11], M[11] = M[14], M[14] = D, this;
  }
  setPosition(M, D, t) {
    const e = this.elements;
    return M.isVector3 ? (e[12] = M.x, e[13] = M.y, e[14] = M.z) : (e[12] = M, e[13] = D, e[14] = t), this;
  }
  invert() {
    const M = this.elements, D = M[0], t = M[1], e = M[2], N = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8], u = M[9], g = M[10], s = M[11], a = M[12], o = M[13], c = M[14], r = M[15], w = u * c * I - o * g * I + o * z * s - A * c * s - u * z * r + A * g * r, y = a * g * I - T * c * I - a * z * s + n * c * s + T * z * r - n * g * r, j = T * o * I - a * u * I + a * A * s - n * o * s - T * A * r + n * u * r, l = a * u * z - T * o * z - a * A * g + n * o * g + T * A * c - n * u * c, d = D * w + t * y + e * j + N * l;
    if (d === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const h = 1 / d;
    return M[0] = w * h, M[1] = (o * g * N - u * c * N - o * e * s + t * c * s + u * e * r - t * g * r) * h, M[2] = (A * c * N - o * z * N + o * e * I - t * c * I - A * e * r + t * z * r) * h, M[3] = (u * z * N - A * g * N - u * e * I + t * g * I + A * e * s - t * z * s) * h, M[4] = y * h, M[5] = (T * c * N - a * g * N + a * e * s - D * c * s - T * e * r + D * g * r) * h, M[6] = (a * z * N - n * c * N - a * e * I + D * c * I + n * e * r - D * z * r) * h, M[7] = (n * g * N - T * z * N + T * e * I - D * g * I - n * e * s + D * z * s) * h, M[8] = j * h, M[9] = (a * u * N - T * o * N - a * t * s + D * o * s + T * t * r - D * u * r) * h, M[10] = (n * o * N - a * A * N + a * t * I - D * o * I - n * t * r + D * A * r) * h, M[11] = (T * A * N - n * u * N - T * t * I + D * u * I + n * t * s - D * A * s) * h, M[12] = l * h, M[13] = (T * o * e - a * u * e + a * t * g - D * o * g - T * t * c + D * u * c) * h, M[14] = (a * A * e - n * o * e - a * t * z + D * o * z + n * t * c - D * A * c) * h, M[15] = (n * u * e - T * A * e + T * t * z - D * u * z - n * t * g + D * A * g) * h, this;
  }
  scale(M) {
    const D = this.elements, t = M.x, e = M.y, N = M.z;
    return D[0] *= t, D[4] *= e, D[8] *= N, D[1] *= t, D[5] *= e, D[9] *= N, D[2] *= t, D[6] *= e, D[10] *= N, D[3] *= t, D[7] *= e, D[11] *= N, this;
  }
  getMaxScaleOnAxis() {
    const M = this.elements, D = M[0] * M[0] + M[1] * M[1] + M[2] * M[2], t = M[4] * M[4] + M[5] * M[5] + M[6] * M[6], e = M[8] * M[8] + M[9] * M[9] + M[10] * M[10];
    return Math.sqrt(Math.max(D, t, e));
  }
  makeTranslation(M, D, t) {
    return M.isVector3 ? this.set(
      1,
      0,
      0,
      M.x,
      0,
      1,
      0,
      M.y,
      0,
      0,
      1,
      M.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      M,
      0,
      1,
      0,
      D,
      0,
      0,
      1,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(M) {
    const D = Math.cos(M), t = Math.sin(M);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      D,
      -t,
      0,
      0,
      t,
      D,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(M) {
    const D = Math.cos(M), t = Math.sin(M);
    return this.set(
      D,
      0,
      t,
      0,
      0,
      1,
      0,
      0,
      -t,
      0,
      D,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(M) {
    const D = Math.cos(M), t = Math.sin(M);
    return this.set(
      D,
      -t,
      0,
      0,
      t,
      D,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(M, D) {
    const t = Math.cos(D), e = Math.sin(D), N = 1 - t, n = M.x, A = M.y, z = M.z, I = N * n, T = N * A;
    return this.set(
      I * n + t,
      I * A - e * z,
      I * z + e * A,
      0,
      I * A + e * z,
      T * A + t,
      T * z - e * n,
      0,
      I * z - e * A,
      T * z + e * n,
      N * z * z + t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(M, D, t) {
    return this.set(
      M,
      0,
      0,
      0,
      0,
      D,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(M, D, t, e, N, n) {
    return this.set(
      1,
      t,
      N,
      0,
      M,
      1,
      n,
      0,
      D,
      e,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(M, D, t) {
    const e = this.elements, N = D._x, n = D._y, A = D._z, z = D._w, I = N + N, T = n + n, u = A + A, g = N * I, s = N * T, a = N * u, o = n * T, c = n * u, r = A * u, w = z * I, y = z * T, j = z * u, l = t.x, d = t.y, h = t.z;
    return e[0] = (1 - (o + r)) * l, e[1] = (s + j) * l, e[2] = (a - y) * l, e[3] = 0, e[4] = (s - j) * d, e[5] = (1 - (g + r)) * d, e[6] = (c + w) * d, e[7] = 0, e[8] = (a + y) * h, e[9] = (c - w) * h, e[10] = (1 - (g + o)) * h, e[11] = 0, e[12] = M.x, e[13] = M.y, e[14] = M.z, e[15] = 1, this;
  }
  decompose(M, D, t) {
    const e = this.elements;
    let N = ae.set(e[0], e[1], e[2]).length();
    const n = ae.set(e[4], e[5], e[6]).length(), A = ae.set(e[8], e[9], e[10]).length();
    this.determinant() < 0 && (N = -N), M.x = e[12], M.y = e[13], M.z = e[14], BD.copy(this);
    const I = 1 / N, T = 1 / n, u = 1 / A;
    return BD.elements[0] *= I, BD.elements[1] *= I, BD.elements[2] *= I, BD.elements[4] *= T, BD.elements[5] *= T, BD.elements[6] *= T, BD.elements[8] *= u, BD.elements[9] *= u, BD.elements[10] *= u, D.setFromRotationMatrix(BD), t.x = N, t.y = n, t.z = A, this;
  }
  makePerspective(M, D, t, e, N, n, A = Et) {
    const z = this.elements, I = 2 * N / (D - M), T = 2 * N / (t - e), u = (D + M) / (D - M), g = (t + e) / (t - e);
    let s, a;
    if (A === Et)
      s = -(n + N) / (n - N), a = -2 * n * N / (n - N);
    else if (A === qi)
      s = -n / (n - N), a = -n * N / (n - N);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + A);
    return z[0] = I, z[4] = 0, z[8] = u, z[12] = 0, z[1] = 0, z[5] = T, z[9] = g, z[13] = 0, z[2] = 0, z[6] = 0, z[10] = s, z[14] = a, z[3] = 0, z[7] = 0, z[11] = -1, z[15] = 0, this;
  }
  makeOrthographic(M, D, t, e, N, n, A = Et) {
    const z = this.elements, I = 1 / (D - M), T = 1 / (t - e), u = 1 / (n - N), g = (D + M) * I, s = (t + e) * T;
    let a, o;
    if (A === Et)
      a = (n + N) * u, o = -2 * u;
    else if (A === qi)
      a = N * u, o = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + A);
    return z[0] = 2 * I, z[4] = 0, z[8] = 0, z[12] = -g, z[1] = 0, z[5] = 2 * T, z[9] = 0, z[13] = -s, z[2] = 0, z[6] = 0, z[10] = o, z[14] = -a, z[3] = 0, z[7] = 0, z[11] = 0, z[15] = 1, this;
  }
  equals(M) {
    const D = this.elements, t = M.elements;
    for (let e = 0; e < 16; e++)
      if (D[e] !== t[e])
        return !1;
    return !0;
  }
  fromArray(M, D = 0) {
    for (let t = 0; t < 16; t++)
      this.elements[t] = M[t + D];
    return this;
  }
  toArray(M = [], D = 0) {
    const t = this.elements;
    return M[D] = t[0], M[D + 1] = t[1], M[D + 2] = t[2], M[D + 3] = t[3], M[D + 4] = t[4], M[D + 5] = t[5], M[D + 6] = t[6], M[D + 7] = t[7], M[D + 8] = t[8], M[D + 9] = t[9], M[D + 10] = t[10], M[D + 11] = t[11], M[D + 12] = t[12], M[D + 13] = t[13], M[D + 14] = t[14], M[D + 15] = t[15], M;
  }
};
const ae = /* @__PURE__ */ new Y(), BD = /* @__PURE__ */ new ID(), ts = /* @__PURE__ */ new Y(0, 0, 0), es = /* @__PURE__ */ new Y(1, 1, 1), vt = /* @__PURE__ */ new Y(), PN = /* @__PURE__ */ new Y(), UD = /* @__PURE__ */ new Y();
let NN = class {
  addEventListener(M, D) {
    this._listeners === void 0 && (this._listeners = {});
    const t = this._listeners;
    t[M] === void 0 && (t[M] = []), t[M].indexOf(D) === -1 && t[M].push(D);
  }
  hasEventListener(M, D) {
    if (this._listeners === void 0)
      return !1;
    const t = this._listeners;
    return t[M] !== void 0 && t[M].indexOf(D) !== -1;
  }
  removeEventListener(M, D) {
    if (this._listeners === void 0)
      return;
    const e = this._listeners[M];
    if (e !== void 0) {
      const N = e.indexOf(D);
      N !== -1 && e.splice(N, 1);
    }
  }
  dispatchEvent(M) {
    if (this._listeners === void 0)
      return;
    const t = this._listeners[M.type];
    if (t !== void 0) {
      M.target = this;
      const e = t.slice(0);
      for (let N = 0, n = e.length; N < n; N++)
        e[N].call(this, M);
      M.target = null;
    }
  }
};
const _z = /* @__PURE__ */ new ID(), bz = /* @__PURE__ */ new mN();
let bT = class KT {
  constructor(M = 0, D = 0, t = 0, e = KT.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = M, this._y = D, this._z = t, this._order = e;
  }
  get x() {
    return this._x;
  }
  set x(M) {
    this._x = M, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(M) {
    this._y = M, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(M) {
    this._z = M, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(M) {
    this._order = M, this._onChangeCallback();
  }
  set(M, D, t, e = this._order) {
    return this._x = M, this._y = D, this._z = t, this._order = e, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(M) {
    return this._x = M._x, this._y = M._y, this._z = M._z, this._order = M._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M, D = this._order, t = !0) {
    const e = M.elements, N = e[0], n = e[4], A = e[8], z = e[1], I = e[5], T = e[9], u = e[2], g = e[6], s = e[10];
    switch (D) {
      case "XYZ":
        this._y = Math.asin(aD(A, -1, 1)), Math.abs(A) < 0.9999999 ? (this._x = Math.atan2(-T, s), this._z = Math.atan2(-n, N)) : (this._x = Math.atan2(g, I), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-aD(T, -1, 1)), Math.abs(T) < 0.9999999 ? (this._y = Math.atan2(A, s), this._z = Math.atan2(z, I)) : (this._y = Math.atan2(-u, N), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(aD(g, -1, 1)), Math.abs(g) < 0.9999999 ? (this._y = Math.atan2(-u, s), this._z = Math.atan2(-n, I)) : (this._y = 0, this._z = Math.atan2(z, N));
        break;
      case "ZYX":
        this._y = Math.asin(-aD(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(g, s), this._z = Math.atan2(z, N)) : (this._x = 0, this._z = Math.atan2(-n, I));
        break;
      case "YZX":
        this._z = Math.asin(aD(z, -1, 1)), Math.abs(z) < 0.9999999 ? (this._x = Math.atan2(-T, I), this._y = Math.atan2(-u, N)) : (this._x = 0, this._y = Math.atan2(A, s));
        break;
      case "XZY":
        this._z = Math.asin(-aD(n, -1, 1)), Math.abs(n) < 0.9999999 ? (this._x = Math.atan2(g, I), this._y = Math.atan2(A, N)) : (this._x = Math.atan2(-T, s), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + D);
    }
    return this._order = D, t === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(M, D, t) {
    return _z.makeRotationFromQuaternion(M), this.setFromRotationMatrix(_z, D, t);
  }
  setFromVector3(M, D = this._order) {
    return this.set(M.x, M.y, M.z, D);
  }
  reorder(M) {
    return bz.setFromEuler(this), this.setFromQuaternion(bz, M);
  }
  equals(M) {
    return M._x === this._x && M._y === this._y && M._z === this._z && M._order === this._order;
  }
  fromArray(M) {
    return this._x = M[0], this._y = M[1], this._z = M[2], M[3] !== void 0 && (this._order = M[3]), this._onChangeCallback(), this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this._x, M[D + 1] = this._y, M[D + 2] = this._z, M[D + 3] = this._order, M;
  }
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
};
bT.DEFAULT_ORDER = "XYZ";
let PT = class {
  constructor() {
    this.mask = 1;
  }
  set(M) {
    this.mask = (1 << M | 0) >>> 0;
  }
  enable(M) {
    this.mask |= 1 << M | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(M) {
    this.mask ^= 1 << M | 0;
  }
  disable(M) {
    this.mask &= ~(1 << M | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(M) {
    return (this.mask & M.mask) !== 0;
  }
  isEnabled(M) {
    return (this.mask & (1 << M | 0)) !== 0;
  }
}, SM = class RT {
  constructor(M, D, t, e, N, n, A, z, I) {
    RT.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], M !== void 0 && this.set(M, D, t, e, N, n, A, z, I);
  }
  set(M, D, t, e, N, n, A, z, I) {
    const T = this.elements;
    return T[0] = M, T[1] = e, T[2] = A, T[3] = D, T[4] = N, T[5] = z, T[6] = t, T[7] = n, T[8] = I, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(M) {
    const D = this.elements, t = M.elements;
    return D[0] = t[0], D[1] = t[1], D[2] = t[2], D[3] = t[3], D[4] = t[4], D[5] = t[5], D[6] = t[6], D[7] = t[7], D[8] = t[8], this;
  }
  extractBasis(M, D, t) {
    return M.setFromMatrix3Column(this, 0), D.setFromMatrix3Column(this, 1), t.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(M) {
    const D = M.elements;
    return this.set(
      D[0],
      D[4],
      D[8],
      D[1],
      D[5],
      D[9],
      D[2],
      D[6],
      D[10]
    ), this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const t = M.elements, e = D.elements, N = this.elements, n = t[0], A = t[3], z = t[6], I = t[1], T = t[4], u = t[7], g = t[2], s = t[5], a = t[8], o = e[0], c = e[3], r = e[6], w = e[1], y = e[4], j = e[7], l = e[2], d = e[5], h = e[8];
    return N[0] = n * o + A * w + z * l, N[3] = n * c + A * y + z * d, N[6] = n * r + A * j + z * h, N[1] = I * o + T * w + u * l, N[4] = I * c + T * y + u * d, N[7] = I * r + T * j + u * h, N[2] = g * o + s * w + a * l, N[5] = g * c + s * y + a * d, N[8] = g * r + s * j + a * h, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[3] *= M, D[6] *= M, D[1] *= M, D[4] *= M, D[7] *= M, D[2] *= M, D[5] *= M, D[8] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], t = M[1], e = M[2], N = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8];
    return D * n * T - D * A * I - t * N * T + t * A * z + e * N * I - e * n * z;
  }
  invert() {
    const M = this.elements, D = M[0], t = M[1], e = M[2], N = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8], u = T * n - A * I, g = A * z - T * N, s = I * N - n * z, a = D * u + t * g + e * s;
    if (a === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const o = 1 / a;
    return M[0] = u * o, M[1] = (e * I - T * t) * o, M[2] = (A * t - e * n) * o, M[3] = g * o, M[4] = (T * D - e * z) * o, M[5] = (e * N - A * D) * o, M[6] = s * o, M[7] = (t * z - I * D) * o, M[8] = (n * D - t * N) * o, this;
  }
  transpose() {
    let M;
    const D = this.elements;
    return M = D[1], D[1] = D[3], D[3] = M, M = D[2], D[2] = D[6], D[6] = M, M = D[5], D[5] = D[7], D[7] = M, this;
  }
  getNormalMatrix(M) {
    return this.setFromMatrix4(M).invert().transpose();
  }
  transposeIntoArray(M) {
    const D = this.elements;
    return M[0] = D[0], M[1] = D[3], M[2] = D[6], M[3] = D[1], M[4] = D[4], M[5] = D[7], M[6] = D[2], M[7] = D[5], M[8] = D[8], this;
  }
  setUvTransform(M, D, t, e, N, n, A) {
    const z = Math.cos(N), I = Math.sin(N);
    return this.set(
      t * z,
      t * I,
      -t * (z * n + I * A) + n + M,
      -e * I,
      e * z,
      -e * (-I * n + z * A) + A + D,
      0,
      0,
      1
    ), this;
  }
  //
  scale(M, D) {
    return this.premultiply(LA.makeScale(M, D)), this;
  }
  rotate(M) {
    return this.premultiply(LA.makeRotation(-M)), this;
  }
  translate(M, D) {
    return this.premultiply(LA.makeTranslation(M, D)), this;
  }
  // for 2D Transforms
  makeTranslation(M, D) {
    return M.isVector2 ? this.set(
      1,
      0,
      M.x,
      0,
      1,
      M.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      M,
      0,
      1,
      D,
      0,
      0,
      1
    ), this;
  }
  makeRotation(M) {
    const D = Math.cos(M), t = Math.sin(M);
    return this.set(
      D,
      -t,
      0,
      t,
      D,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(M, D) {
    return this.set(
      M,
      0,
      0,
      0,
      D,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(M) {
    const D = this.elements, t = M.elements;
    for (let e = 0; e < 9; e++)
      if (D[e] !== t[e])
        return !1;
    return !0;
  }
  fromArray(M, D = 0) {
    for (let t = 0; t < 9; t++)
      this.elements[t] = M[t + D];
    return this;
  }
  toArray(M = [], D = 0) {
    const t = this.elements;
    return M[D] = t[0], M[D + 1] = t[1], M[D + 2] = t[2], M[D + 3] = t[3], M[D + 4] = t[4], M[D + 5] = t[5], M[D + 6] = t[6], M[D + 7] = t[7], M[D + 8] = t[8], M;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
const LA = /* @__PURE__ */ new SM();
let Ns = 0;
const Kz = /* @__PURE__ */ new Y(), oe = /* @__PURE__ */ new mN(), It = /* @__PURE__ */ new ID(), RN = /* @__PURE__ */ new Y(), TN = /* @__PURE__ */ new Y(), is = /* @__PURE__ */ new Y(), As = /* @__PURE__ */ new mN(), Pz = /* @__PURE__ */ new Y(1, 0, 0), Rz = /* @__PURE__ */ new Y(0, 1, 0), Fz = /* @__PURE__ */ new Y(0, 0, 1), ns = { type: "added" }, zs = { type: "removed" };
let pD = class Si extends NN {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Ns++ }), this.uuid = eN(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Si.DEFAULT_UP.clone();
    const M = new Y(), D = new bT(), t = new mN(), e = new Y(1, 1, 1);
    function N() {
      t.setFromEuler(D, !1);
    }
    function n() {
      D.setFromQuaternion(t, void 0, !1);
    }
    D._onChange(N), t._onChange(n), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: M
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: D
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      modelViewMatrix: {
        value: new ID()
      },
      normalMatrix: {
        value: new SM()
      }
    }), this.matrix = new ID(), this.matrixWorld = new ID(), this.matrixAutoUpdate = Si.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = Si.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.layers = new PT(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(M) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(M), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(M) {
    return this.quaternion.premultiply(M), this;
  }
  setRotationFromAxisAngle(M, D) {
    this.quaternion.setFromAxisAngle(M, D);
  }
  setRotationFromEuler(M) {
    this.quaternion.setFromEuler(M, !0);
  }
  setRotationFromMatrix(M) {
    this.quaternion.setFromRotationMatrix(M);
  }
  setRotationFromQuaternion(M) {
    this.quaternion.copy(M);
  }
  rotateOnAxis(M, D) {
    return oe.setFromAxisAngle(M, D), this.quaternion.multiply(oe), this;
  }
  rotateOnWorldAxis(M, D) {
    return oe.setFromAxisAngle(M, D), this.quaternion.premultiply(oe), this;
  }
  rotateX(M) {
    return this.rotateOnAxis(Pz, M);
  }
  rotateY(M) {
    return this.rotateOnAxis(Rz, M);
  }
  rotateZ(M) {
    return this.rotateOnAxis(Fz, M);
  }
  translateOnAxis(M, D) {
    return Kz.copy(M).applyQuaternion(this.quaternion), this.position.add(Kz.multiplyScalar(D)), this;
  }
  translateX(M) {
    return this.translateOnAxis(Pz, M);
  }
  translateY(M) {
    return this.translateOnAxis(Rz, M);
  }
  translateZ(M) {
    return this.translateOnAxis(Fz, M);
  }
  localToWorld(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(It.copy(this.matrixWorld).invert());
  }
  lookAt(M, D, t) {
    M.isVector3 ? RN.copy(M) : RN.set(M, D, t);
    const e = this.parent;
    this.updateWorldMatrix(!0, !1), TN.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? It.lookAt(TN, RN, this.up) : It.lookAt(RN, TN, this.up), this.quaternion.setFromRotationMatrix(It), e && (It.extractRotation(e.matrixWorld), oe.setFromRotationMatrix(It), this.quaternion.premultiply(oe.invert()));
  }
  add(M) {
    if (arguments.length > 1) {
      for (let D = 0; D < arguments.length; D++)
        this.add(arguments[D]);
      return this;
    }
    return M === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", M), this) : (M && M.isObject3D ? (M.parent !== null && M.parent.remove(M), M.parent = this, this.children.push(M), M.dispatchEvent(ns)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", M), this);
  }
  remove(M) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.remove(arguments[t]);
      return this;
    }
    const D = this.children.indexOf(M);
    return D !== -1 && (M.parent = null, this.children.splice(D, 1), M.dispatchEvent(zs)), this;
  }
  removeFromParent() {
    const M = this.parent;
    return M !== null && M.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(M) {
    return this.updateWorldMatrix(!0, !1), It.copy(this.matrixWorld).invert(), M.parent !== null && (M.parent.updateWorldMatrix(!0, !1), It.multiply(M.parent.matrixWorld)), M.applyMatrix4(It), this.add(M), M.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(M) {
    return this.getObjectByProperty("id", M);
  }
  getObjectByName(M) {
    return this.getObjectByProperty("name", M);
  }
  getObjectByProperty(M, D) {
    if (this[M] === D)
      return this;
    for (let t = 0, e = this.children.length; t < e; t++) {
      const n = this.children[t].getObjectByProperty(M, D);
      if (n !== void 0)
        return n;
    }
  }
  getObjectsByProperty(M, D) {
    let t = [];
    this[M] === D && t.push(this);
    for (let e = 0, N = this.children.length; e < N; e++) {
      const n = this.children[e].getObjectsByProperty(M, D);
      n.length > 0 && (t = t.concat(n));
    }
    return t;
  }
  getWorldPosition(M) {
    return this.updateWorldMatrix(!0, !1), M.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(TN, M, is), M;
  }
  getWorldScale(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(TN, As, M), M;
  }
  getWorldDirection(M) {
    this.updateWorldMatrix(!0, !1);
    const D = this.matrixWorld.elements;
    return M.set(D[8], D[9], D[10]).normalize();
  }
  raycast() {
  }
  traverse(M) {
    M(this);
    const D = this.children;
    for (let t = 0, e = D.length; t < e; t++)
      D[t].traverse(M);
  }
  traverseVisible(M) {
    if (this.visible === !1)
      return;
    M(this);
    const D = this.children;
    for (let t = 0, e = D.length; t < e; t++)
      D[t].traverseVisible(M);
  }
  traverseAncestors(M) {
    const D = this.parent;
    D !== null && (M(D), D.traverseAncestors(M));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(M) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || M) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, M = !0);
    const D = this.children;
    for (let t = 0, e = D.length; t < e; t++) {
      const N = D[t];
      (N.matrixWorldAutoUpdate === !0 || M === !0) && N.updateMatrixWorld(M);
    }
  }
  updateWorldMatrix(M, D) {
    const t = this.parent;
    if (M === !0 && t !== null && t.matrixWorldAutoUpdate === !0 && t.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), D === !0) {
      const e = this.children;
      for (let N = 0, n = e.length; N < n; N++) {
        const A = e[N];
        A.matrixWorldAutoUpdate === !0 && A.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string", t = {};
    D && (M = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, t.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const e = {};
    e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), this.castShadow === !0 && (e.castShadow = !0), this.receiveShadow === !0 && (e.receiveShadow = !0), this.visible === !1 && (e.visible = !1), this.frustumCulled === !1 && (e.frustumCulled = !1), this.renderOrder !== 0 && (e.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (e.userData = this.userData), e.layers = this.layers.mask, e.matrix = this.matrix.toArray(), e.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (e.matrixAutoUpdate = !1), this.isInstancedMesh && (e.type = "InstancedMesh", e.count = this.count, e.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (e.instanceColor = this.instanceColor.toJSON()));
    function N(A, z) {
      return A[z.uuid] === void 0 && (A[z.uuid] = z.toJSON(M)), z.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? e.background = this.background.toJSON() : this.background.isTexture && (e.background = this.background.toJSON(M).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (e.environment = this.environment.toJSON(M).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      e.geometry = N(M.geometries, this.geometry);
      const A = this.geometry.parameters;
      if (A !== void 0 && A.shapes !== void 0) {
        const z = A.shapes;
        if (Array.isArray(z))
          for (let I = 0, T = z.length; I < T; I++) {
            const u = z[I];
            N(M.shapes, u);
          }
        else
          N(M.shapes, z);
      }
    }
    if (this.isSkinnedMesh && (e.bindMode = this.bindMode, e.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (N(M.skeletons, this.skeleton), e.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const A = [];
        for (let z = 0, I = this.material.length; z < I; z++)
          A.push(N(M.materials, this.material[z]));
        e.material = A;
      } else
        e.material = N(M.materials, this.material);
    if (this.children.length > 0) {
      e.children = [];
      for (let A = 0; A < this.children.length; A++)
        e.children.push(this.children[A].toJSON(M).object);
    }
    if (this.animations.length > 0) {
      e.animations = [];
      for (let A = 0; A < this.animations.length; A++) {
        const z = this.animations[A];
        e.animations.push(N(M.animations, z));
      }
    }
    if (D) {
      const A = n(M.geometries), z = n(M.materials), I = n(M.textures), T = n(M.images), u = n(M.shapes), g = n(M.skeletons), s = n(M.animations), a = n(M.nodes);
      A.length > 0 && (t.geometries = A), z.length > 0 && (t.materials = z), I.length > 0 && (t.textures = I), T.length > 0 && (t.images = T), u.length > 0 && (t.shapes = u), g.length > 0 && (t.skeletons = g), s.length > 0 && (t.animations = s), a.length > 0 && (t.nodes = a);
    }
    return t.object = e, t;
    function n(A) {
      const z = [];
      for (const I in A) {
        const T = A[I];
        delete T.metadata, z.push(T);
      }
      return z;
    }
  }
  clone(M) {
    return new this.constructor().copy(this, M);
  }
  copy(M, D = !0) {
    if (this.name = M.name, this.up.copy(M.up), this.position.copy(M.position), this.rotation.order = M.rotation.order, this.quaternion.copy(M.quaternion), this.scale.copy(M.scale), this.matrix.copy(M.matrix), this.matrixWorld.copy(M.matrixWorld), this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrixWorldNeedsUpdate = M.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = M.matrixWorldAutoUpdate, this.layers.mask = M.layers.mask, this.visible = M.visible, this.castShadow = M.castShadow, this.receiveShadow = M.receiveShadow, this.frustumCulled = M.frustumCulled, this.renderOrder = M.renderOrder, this.animations = M.animations.slice(), this.userData = JSON.parse(JSON.stringify(M.userData)), D === !0)
      for (let t = 0; t < M.children.length; t++) {
        const e = M.children[t];
        this.add(e.clone());
      }
    return this;
  }
};
pD.DEFAULT_UP = /* @__PURE__ */ new Y(0, 1, 0);
pD.DEFAULT_MATRIX_AUTO_UPDATE = !0;
pD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class FT extends pD {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ID(), this.projectionMatrix = new ID(), this.projectionMatrixInverse = new ID(), this.coordinateSystem = Et;
  }
  copy(M, D) {
    return super.copy(M, D), this.matrixWorldInverse.copy(M.matrixWorldInverse), this.projectionMatrix.copy(M.projectionMatrix), this.projectionMatrixInverse.copy(M.projectionMatrixInverse), this.coordinateSystem = M.coordinateSystem, this;
  }
  getWorldDirection(M) {
    return super.getWorldDirection(M).negate();
  }
  updateMatrixWorld(M) {
    super.updateMatrixWorld(M), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(M, D) {
    super.updateWorldMatrix(M, D), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class PD extends FT {
  constructor(M = 50, D = 1, t = 0.1, e = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = M, this.zoom = 1, this.near = t, this.far = e, this.focus = 10, this.aspect = D, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(M, D) {
    return super.copy(M, D), this.fov = M.fov, this.zoom = M.zoom, this.near = M.near, this.far = M.far, this.focus = M.focus, this.aspect = M.aspect, this.view = M.view === null ? null : Object.assign({}, M.view), this.filmGauge = M.filmGauge, this.filmOffset = M.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(M) {
    const D = 0.5 * this.getFilmHeight() / M;
    this.fov = on * 2 * Math.atan(D), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const M = Math.tan(uA * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / M;
  }
  getEffectiveFOV() {
    return on * 2 * Math.atan(
      Math.tan(uA * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(M, D, t, e, N, n) {
    this.aspect = M / D, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = M, this.view.fullHeight = D, this.view.offsetX = t, this.view.offsetY = e, this.view.width = N, this.view.height = n, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const M = this.near;
    let D = M * Math.tan(uA * 0.5 * this.fov) / this.zoom, t = 2 * D, e = this.aspect * t, N = -0.5 * e;
    const n = this.view;
    if (this.view !== null && this.view.enabled) {
      const z = n.fullWidth, I = n.fullHeight;
      N += n.offsetX * e / z, D -= n.offsetY * t / I, e *= n.width / z, t *= n.height / I;
    }
    const A = this.filmOffset;
    A !== 0 && (N += M * A / this.getFilmWidth()), this.projectionMatrix.makePerspective(N, N + e, D, D - t, M, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return D.object.fov = this.fov, D.object.zoom = this.zoom, D.object.near = this.near, D.object.far = this.far, D.object.focus = this.focus, D.object.aspect = this.aspect, this.view !== null && (D.object.view = Object.assign({}, this.view)), D.object.filmGauge = this.filmGauge, D.object.filmOffset = this.filmOffset, D;
  }
}
const Bz = /* @__PURE__ */ new SM().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), Vz = /* @__PURE__ */ new SM().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), FN = {
  [dt]: {
    transfer: Gi,
    primaries: Hi,
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [tD]: {
    transfer: VM,
    primaries: Hi,
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [MA]: {
    transfer: Gi,
    primaries: Wi,
    toReference: (i) => i.applyMatrix3(Vz),
    fromReference: (i) => i.applyMatrix3(Bz)
  },
  [Qn]: {
    transfer: VM,
    primaries: Wi,
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(Vz),
    fromReference: (i) => i.applyMatrix3(Bz).convertLinearToSRGB()
  }
}, Is = /* @__PURE__ */ new Set([dt, MA]), RM = {
  enabled: !0,
  _workingColorSpace: dt,
  get legacyMode() {
    return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), !this.enabled;
  },
  set legacyMode(i) {
    console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), this.enabled = !i;
  },
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!Is.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, M, D) {
    if (this.enabled === !1 || M === D || !M || !D)
      return i;
    const t = FN[M].toReference, e = FN[D].fromReference;
    return e(t(i));
  },
  fromWorkingColorSpace: function(i, M) {
    return this.convert(i, this._workingColorSpace, M);
  },
  toWorkingColorSpace: function(i, M) {
    return this.convert(i, M, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return FN[i].primaries;
  },
  getTransfer: function(i) {
    return i === RD ? Gi : FN[i].transfer;
  }
};
function We(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function wA(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const BT = {
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
  yellowgreen: 10145074
}, pt = { h: 0, s: 0, l: 0 }, BN = { h: 0, s: 0, l: 0 };
function xA(i, M, D) {
  return D < 0 && (D += 1), D > 1 && (D -= 1), D < 1 / 6 ? i + (M - i) * 6 * D : D < 1 / 2 ? M : D < 2 / 3 ? i + (M - i) * 6 * (2 / 3 - D) : i;
}
let KM = class {
  constructor(M, D, t) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(M, D, t);
  }
  set(M, D, t) {
    if (D === void 0 && t === void 0) {
      const e = M;
      e && e.isColor ? this.copy(e) : typeof e == "number" ? this.setHex(e) : typeof e == "string" && this.setStyle(e);
    } else
      this.setRGB(M, D, t);
    return this;
  }
  setScalar(M) {
    return this.r = M, this.g = M, this.b = M, this;
  }
  setHex(M, D = tD) {
    return M = Math.floor(M), this.r = (M >> 16 & 255) / 255, this.g = (M >> 8 & 255) / 255, this.b = (M & 255) / 255, RM.toWorkingColorSpace(this, D), this;
  }
  setRGB(M, D, t, e = RM.workingColorSpace) {
    return this.r = M, this.g = D, this.b = t, RM.toWorkingColorSpace(this, e), this;
  }
  setHSL(M, D, t, e = RM.workingColorSpace) {
    if (M = tg(M, 1), D = aD(D, 0, 1), t = aD(t, 0, 1), D === 0)
      this.r = this.g = this.b = t;
    else {
      const N = t <= 0.5 ? t * (1 + D) : t + D - t * D, n = 2 * t - N;
      this.r = xA(n, N, M + 1 / 3), this.g = xA(n, N, M), this.b = xA(n, N, M - 1 / 3);
    }
    return RM.toWorkingColorSpace(this, e), this;
  }
  setStyle(M, D = tD) {
    function t(N) {
      N !== void 0 && parseFloat(N) < 1 && console.warn("THREE.Color: Alpha component of " + M + " will be ignored.");
    }
    let e;
    if (e = /^(\w+)\(([^\)]*)\)/.exec(M)) {
      let N;
      const n = e[1], A = e[2];
      switch (n) {
        case "rgb":
        case "rgba":
          if (N = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return t(N[4]), this.setRGB(
              Math.min(255, parseInt(N[1], 10)) / 255,
              Math.min(255, parseInt(N[2], 10)) / 255,
              Math.min(255, parseInt(N[3], 10)) / 255,
              D
            );
          if (N = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return t(N[4]), this.setRGB(
              Math.min(100, parseInt(N[1], 10)) / 100,
              Math.min(100, parseInt(N[2], 10)) / 100,
              Math.min(100, parseInt(N[3], 10)) / 100,
              D
            );
          break;
        case "hsl":
        case "hsla":
          if (N = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return t(N[4]), this.setHSL(
              parseFloat(N[1]) / 360,
              parseFloat(N[2]) / 100,
              parseFloat(N[3]) / 100,
              D
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + M);
      }
    } else if (e = /^\#([A-Fa-f\d]+)$/.exec(M)) {
      const N = e[1], n = N.length;
      if (n === 3)
        return this.setRGB(
          parseInt(N.charAt(0), 16) / 15,
          parseInt(N.charAt(1), 16) / 15,
          parseInt(N.charAt(2), 16) / 15,
          D
        );
      if (n === 6)
        return this.setHex(parseInt(N, 16), D);
      console.warn("THREE.Color: Invalid hex color " + M);
    } else if (M && M.length > 0)
      return this.setColorName(M, D);
    return this;
  }
  setColorName(M, D = tD) {
    const t = BT[M.toLowerCase()];
    return t !== void 0 ? this.setHex(t, D) : console.warn("THREE.Color: Unknown color " + M), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(M) {
    return this.r = M.r, this.g = M.g, this.b = M.b, this;
  }
  copySRGBToLinear(M) {
    return this.r = We(M.r), this.g = We(M.g), this.b = We(M.b), this;
  }
  copyLinearToSRGB(M) {
    return this.r = wA(M.r), this.g = wA(M.g), this.b = wA(M.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(M = tD) {
    return RM.fromWorkingColorSpace(sD.copy(this), M), Math.round(aD(sD.r * 255, 0, 255)) * 65536 + Math.round(aD(sD.g * 255, 0, 255)) * 256 + Math.round(aD(sD.b * 255, 0, 255));
  }
  getHexString(M = tD) {
    return ("000000" + this.getHex(M).toString(16)).slice(-6);
  }
  getHSL(M, D = RM.workingColorSpace) {
    RM.fromWorkingColorSpace(sD.copy(this), D);
    const t = sD.r, e = sD.g, N = sD.b, n = Math.max(t, e, N), A = Math.min(t, e, N);
    let z, I;
    const T = (A + n) / 2;
    if (A === n)
      z = 0, I = 0;
    else {
      const u = n - A;
      switch (I = T <= 0.5 ? u / (n + A) : u / (2 - n - A), n) {
        case t:
          z = (e - N) / u + (e < N ? 6 : 0);
          break;
        case e:
          z = (N - t) / u + 2;
          break;
        case N:
          z = (t - e) / u + 4;
          break;
      }
      z /= 6;
    }
    return M.h = z, M.s = I, M.l = T, M;
  }
  getRGB(M, D = RM.workingColorSpace) {
    return RM.fromWorkingColorSpace(sD.copy(this), D), M.r = sD.r, M.g = sD.g, M.b = sD.b, M;
  }
  getStyle(M = tD) {
    RM.fromWorkingColorSpace(sD.copy(this), M);
    const D = sD.r, t = sD.g, e = sD.b;
    return M !== tD ? `color(${M} ${D.toFixed(3)} ${t.toFixed(3)} ${e.toFixed(3)})` : `rgb(${Math.round(D * 255)},${Math.round(t * 255)},${Math.round(e * 255)})`;
  }
  offsetHSL(M, D, t) {
    return this.getHSL(pt), this.setHSL(pt.h + M, pt.s + D, pt.l + t);
  }
  add(M) {
    return this.r += M.r, this.g += M.g, this.b += M.b, this;
  }
  addColors(M, D) {
    return this.r = M.r + D.r, this.g = M.g + D.g, this.b = M.b + D.b, this;
  }
  addScalar(M) {
    return this.r += M, this.g += M, this.b += M, this;
  }
  sub(M) {
    return this.r = Math.max(0, this.r - M.r), this.g = Math.max(0, this.g - M.g), this.b = Math.max(0, this.b - M.b), this;
  }
  multiply(M) {
    return this.r *= M.r, this.g *= M.g, this.b *= M.b, this;
  }
  multiplyScalar(M) {
    return this.r *= M, this.g *= M, this.b *= M, this;
  }
  lerp(M, D) {
    return this.r += (M.r - this.r) * D, this.g += (M.g - this.g) * D, this.b += (M.b - this.b) * D, this;
  }
  lerpColors(M, D, t) {
    return this.r = M.r + (D.r - M.r) * t, this.g = M.g + (D.g - M.g) * t, this.b = M.b + (D.b - M.b) * t, this;
  }
  lerpHSL(M, D) {
    this.getHSL(pt), M.getHSL(BN);
    const t = gA(pt.h, BN.h, D), e = gA(pt.s, BN.s, D), N = gA(pt.l, BN.l, D);
    return this.setHSL(t, e, N), this;
  }
  setFromVector3(M) {
    return this.r = M.x, this.g = M.y, this.b = M.z, this;
  }
  applyMatrix3(M) {
    const D = this.r, t = this.g, e = this.b, N = M.elements;
    return this.r = N[0] * D + N[3] * t + N[6] * e, this.g = N[1] * D + N[4] * t + N[7] * e, this.b = N[2] * D + N[5] * t + N[8] * e, this;
  }
  equals(M) {
    return M.r === this.r && M.g === this.g && M.b === this.b;
  }
  fromArray(M, D = 0) {
    return this.r = M[D], this.g = M[D + 1], this.b = M[D + 2], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.r, M[D + 1] = this.g, M[D + 2] = this.b, M;
  }
  fromBufferAttribute(M, D) {
    return this.r = M.getX(D), this.g = M.getY(D), this.b = M.getZ(D), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
};
const sD = /* @__PURE__ */ new KM();
KM.NAMES = BT;
class Ts extends pD {
  constructor(M, D = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new KM(M), this.intensity = D;
  }
  dispose() {
  }
  copy(M, D) {
    return super.copy(M, D), this.color.copy(M.color), this.intensity = M.intensity, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return D.object.color = this.color.getHex(), D.object.intensity = this.intensity, this.groundColor !== void 0 && (D.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (D.object.distance = this.distance), this.angle !== void 0 && (D.object.angle = this.angle), this.decay !== void 0 && (D.object.decay = this.decay), this.penumbra !== void 0 && (D.object.penumbra = this.penumbra), this.shadow !== void 0 && (D.object.shadow = this.shadow.toJSON()), D;
  }
}
let rM = class VT {
  constructor(M = 0, D = 0) {
    VT.prototype.isVector2 = !0, this.x = M, this.y = D;
  }
  get width() {
    return this.x;
  }
  set width(M) {
    this.x = M;
  }
  get height() {
    return this.y;
  }
  set height(M) {
    this.y = M;
  }
  set(M, D) {
    return this.x = M, this.y = D, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this;
  }
  divide(M) {
    return this.x /= M.x, this.y /= M.y, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  applyMatrix3(M) {
    const D = this.x, t = this.y, e = M.elements;
    return this.x = e[0] * D + e[3] * t + e[6], this.y = e[1] * D + e[4] * t + e[7], this;
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this;
  }
  clampLength(M, D) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(Math.max(M, Math.min(D, t)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y;
  }
  cross(M) {
    return this.x * M.y - this.y * M.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const t = this.dot(M) / D;
    return Math.acos(aD(t, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, t = this.y - M.y;
    return D * D + t * t;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this;
  }
  lerpVectors(M, D, t) {
    return this.x = M.x + (D.x - M.x) * t, this.y = M.y + (D.y - M.y) * t, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this;
  }
  rotateAround(M, D) {
    const t = Math.cos(D), e = Math.sin(D), N = this.x - M.x, n = this.y - M.y;
    return this.x = N * t - n * e + M.x, this.y = N * e + n * t + M.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
};
class nD {
  constructor(M = 0, D = 0, t = 0, e = 1) {
    nD.prototype.isVector4 = !0, this.x = M, this.y = D, this.z = t, this.w = e;
  }
  get width() {
    return this.z;
  }
  set width(M) {
    this.z = M;
  }
  get height() {
    return this.w;
  }
  set height(M) {
    this.w = M;
  }
  set(M, D, t, e) {
    return this.x = M, this.y = D, this.z = t, this.w = e, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this.z = M, this.w = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setZ(M) {
    return this.z = M, this;
  }
  setW(M) {
    return this.w = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      case 2:
        this.z = D;
        break;
      case 3:
        this.w = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this.z = M.z, this.w = M.w !== void 0 ? M.w : 1, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this.z += M.z, this.w += M.w, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this.z += M, this.w += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this.z = M.z + D.z, this.w = M.w + D.w, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this.z += M.z * D, this.w += M.w * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this.z -= M.z, this.w -= M.w, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this.z -= M, this.w -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this.z = M.z - D.z, this.w = M.w - D.w, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this.z *= M.z, this.w *= M.w, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this.z *= M, this.w *= M, this;
  }
  applyMatrix4(M) {
    const D = this.x, t = this.y, e = this.z, N = this.w, n = M.elements;
    return this.x = n[0] * D + n[4] * t + n[8] * e + n[12] * N, this.y = n[1] * D + n[5] * t + n[9] * e + n[13] * N, this.z = n[2] * D + n[6] * t + n[10] * e + n[14] * N, this.w = n[3] * D + n[7] * t + n[11] * e + n[15] * N, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  setAxisAngleFromQuaternion(M) {
    this.w = 2 * Math.acos(M.w);
    const D = Math.sqrt(1 - M.w * M.w);
    return D < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = M.x / D, this.y = M.y / D, this.z = M.z / D), this;
  }
  setAxisAngleFromRotationMatrix(M) {
    let D, t, e, N;
    const z = M.elements, I = z[0], T = z[4], u = z[8], g = z[1], s = z[5], a = z[9], o = z[2], c = z[6], r = z[10];
    if (Math.abs(T - g) < 0.01 && Math.abs(u - o) < 0.01 && Math.abs(a - c) < 0.01) {
      if (Math.abs(T + g) < 0.1 && Math.abs(u + o) < 0.1 && Math.abs(a + c) < 0.1 && Math.abs(I + s + r - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      D = Math.PI;
      const y = (I + 1) / 2, j = (s + 1) / 2, l = (r + 1) / 2, d = (T + g) / 4, h = (u + o) / 4, S = (a + c) / 4;
      return y > j && y > l ? y < 0.01 ? (t = 0, e = 0.707106781, N = 0.707106781) : (t = Math.sqrt(y), e = d / t, N = h / t) : j > l ? j < 0.01 ? (t = 0.707106781, e = 0, N = 0.707106781) : (e = Math.sqrt(j), t = d / e, N = S / e) : l < 0.01 ? (t = 0.707106781, e = 0.707106781, N = 0) : (N = Math.sqrt(l), t = h / N, e = S / N), this.set(t, e, N, D), this;
    }
    let w = Math.sqrt((c - a) * (c - a) + (u - o) * (u - o) + (g - T) * (g - T));
    return Math.abs(w) < 1e-3 && (w = 1), this.x = (c - a) / w, this.y = (u - o) / w, this.z = (g - T) / w, this.w = Math.acos((I + s + r - 1) / 2), this;
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this.z = Math.min(this.z, M.z), this.w = Math.min(this.w, M.w), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this.z = Math.max(this.z, M.z), this.w = Math.max(this.w, M.w), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this.z = Math.max(M.z, Math.min(D.z, this.z)), this.w = Math.max(M.w, Math.min(D.w, this.w)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this.z = Math.max(M, Math.min(D, this.z)), this.w = Math.max(M, Math.min(D, this.w)), this;
  }
  clampLength(M, D) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(Math.max(M, Math.min(D, t)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y + this.z * M.z + this.w * M.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this.z += (M.z - this.z) * D, this.w += (M.w - this.w) * D, this;
  }
  lerpVectors(M, D, t) {
    return this.x = M.x + (D.x - M.x) * t, this.y = M.y + (D.y - M.y) * t, this.z = M.z + (D.z - M.z) * t, this.w = M.w + (D.w - M.w) * t, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y && M.z === this.z && M.w === this.w;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this.z = M[D + 2], this.w = M[D + 3], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M[D + 2] = this.z, M[D + 3] = this.w, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this.z = M.getZ(D), this.w = M.getW(D), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
let iN = class {
  constructor(M = new Y(1 / 0, 1 / 0, 1 / 0), D = new Y(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = M, this.max = D;
  }
  set(M, D) {
    return this.min.copy(M), this.max.copy(D), this;
  }
  setFromArray(M) {
    this.makeEmpty();
    for (let D = 0, t = M.length; D < t; D += 3)
      this.expandByPoint(ut.fromArray(M, D));
    return this;
  }
  setFromBufferAttribute(M) {
    this.makeEmpty();
    for (let D = 0, t = M.count; D < t; D++)
      this.expandByPoint(ut.fromBufferAttribute(M, D));
    return this;
  }
  setFromPoints(M) {
    this.makeEmpty();
    for (let D = 0, t = M.length; D < t; D++)
      this.expandByPoint(M[D]);
    return this;
  }
  setFromCenterAndSize(M, D) {
    const t = ut.copy(D).multiplyScalar(0.5);
    return this.min.copy(M).sub(t), this.max.copy(M).add(t), this;
  }
  setFromObject(M, D = !1) {
    return this.makeEmpty(), this.expandByObject(M, D);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.min.copy(M.min), this.max.copy(M.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(M) {
    return this.isEmpty() ? M.set(0, 0, 0) : M.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(M) {
    return this.isEmpty() ? M.set(0, 0, 0) : M.subVectors(this.max, this.min);
  }
  expandByPoint(M) {
    return this.min.min(M), this.max.max(M), this;
  }
  expandByVector(M) {
    return this.min.sub(M), this.max.add(M), this;
  }
  expandByScalar(M) {
    return this.min.addScalar(-M), this.max.addScalar(M), this;
  }
  expandByObject(M, D = !1) {
    if (M.updateWorldMatrix(!1, !1), M.boundingBox !== void 0)
      M.boundingBox === null && M.computeBoundingBox(), ye.copy(M.boundingBox), ye.applyMatrix4(M.matrixWorld), this.union(ye);
    else {
      const e = M.geometry;
      if (e !== void 0)
        if (D && e.attributes !== void 0 && e.attributes.position !== void 0) {
          const N = e.attributes.position;
          for (let n = 0, A = N.count; n < A; n++)
            ut.fromBufferAttribute(N, n).applyMatrix4(M.matrixWorld), this.expandByPoint(ut);
        } else
          e.boundingBox === null && e.computeBoundingBox(), ye.copy(e.boundingBox), ye.applyMatrix4(M.matrixWorld), this.union(ye);
    }
    const t = M.children;
    for (let e = 0, N = t.length; e < N; e++)
      this.expandByObject(t[e], D);
    return this;
  }
  containsPoint(M) {
    return !(M.x < this.min.x || M.x > this.max.x || M.y < this.min.y || M.y > this.max.y || M.z < this.min.z || M.z > this.max.z);
  }
  containsBox(M) {
    return this.min.x <= M.min.x && M.max.x <= this.max.x && this.min.y <= M.min.y && M.max.y <= this.max.y && this.min.z <= M.min.z && M.max.z <= this.max.z;
  }
  getParameter(M, D) {
    return D.set(
      (M.x - this.min.x) / (this.max.x - this.min.x),
      (M.y - this.min.y) / (this.max.y - this.min.y),
      (M.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(M) {
    return !(M.max.x < this.min.x || M.min.x > this.max.x || M.max.y < this.min.y || M.min.y > this.max.y || M.max.z < this.min.z || M.min.z > this.max.z);
  }
  intersectsSphere(M) {
    return this.clampPoint(M.center, ut), ut.distanceToSquared(M.center) <= M.radius * M.radius;
  }
  intersectsPlane(M) {
    let D, t;
    return M.normal.x > 0 ? (D = M.normal.x * this.min.x, t = M.normal.x * this.max.x) : (D = M.normal.x * this.max.x, t = M.normal.x * this.min.x), M.normal.y > 0 ? (D += M.normal.y * this.min.y, t += M.normal.y * this.max.y) : (D += M.normal.y * this.max.y, t += M.normal.y * this.min.y), M.normal.z > 0 ? (D += M.normal.z * this.min.z, t += M.normal.z * this.max.z) : (D += M.normal.z * this.max.z, t += M.normal.z * this.min.z), D <= -M.constant && t >= -M.constant;
  }
  intersectsTriangle(M) {
    if (this.isEmpty())
      return !1;
    this.getCenter(uN), VN.subVectors(this.max, uN), je.subVectors(M.a, uN), Ce.subVectors(M.b, uN), Le.subVectors(M.c, uN), Yt.subVectors(Ce, je), Ut.subVectors(Le, Ce), Wt.subVectors(je, Le);
    let D = [
      0,
      -Yt.z,
      Yt.y,
      0,
      -Ut.z,
      Ut.y,
      0,
      -Wt.z,
      Wt.y,
      Yt.z,
      0,
      -Yt.x,
      Ut.z,
      0,
      -Ut.x,
      Wt.z,
      0,
      -Wt.x,
      -Yt.y,
      Yt.x,
      0,
      -Ut.y,
      Ut.x,
      0,
      -Wt.y,
      Wt.x,
      0
    ];
    return !OA(D, je, Ce, Le, VN) || (D = [1, 0, 0, 0, 1, 0, 0, 0, 1], !OA(D, je, Ce, Le, VN)) ? !1 : (GN.crossVectors(Yt, Ut), D = [GN.x, GN.y, GN.z], OA(D, je, Ce, Le, VN));
  }
  clampPoint(M, D) {
    return D.copy(M).clamp(this.min, this.max);
  }
  distanceToPoint(M) {
    return this.clampPoint(M, ut).distanceTo(M);
  }
  getBoundingSphere(M) {
    return this.isEmpty() ? M.makeEmpty() : (this.getCenter(M.center), M.radius = this.getSize(ut).length() * 0.5), M;
  }
  intersect(M) {
    return this.min.max(M.min), this.max.min(M.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(M) {
    return this.min.min(M.min), this.max.max(M.max), this;
  }
  applyMatrix4(M) {
    return this.isEmpty() ? this : (Tt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(M), Tt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(M), Tt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(M), Tt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(M), Tt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(M), Tt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(M), Tt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(M), Tt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(M), this.setFromPoints(Tt), this);
  }
  translate(M) {
    return this.min.add(M), this.max.add(M), this;
  }
  equals(M) {
    return M.min.equals(this.min) && M.max.equals(this.max);
  }
};
const Tt = [
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y()
], ut = /* @__PURE__ */ new Y(), ye = /* @__PURE__ */ new iN(), je = /* @__PURE__ */ new Y(), Ce = /* @__PURE__ */ new Y(), Le = /* @__PURE__ */ new Y(), Yt = /* @__PURE__ */ new Y(), Ut = /* @__PURE__ */ new Y(), Wt = /* @__PURE__ */ new Y(), uN = /* @__PURE__ */ new Y(), VN = /* @__PURE__ */ new Y(), GN = /* @__PURE__ */ new Y(), qt = /* @__PURE__ */ new Y();
function OA(i, M, D, t, e) {
  for (let N = 0, n = i.length - 3; N <= n; N += 3) {
    qt.fromArray(i, N);
    const A = e.x * Math.abs(qt.x) + e.y * Math.abs(qt.y) + e.z * Math.abs(qt.z), z = M.dot(qt), I = D.dot(qt), T = t.dot(qt);
    if (Math.max(-Math.max(z, I, T), Math.min(z, I, T)) > A)
      return !1;
  }
  return !0;
}
const us = /* @__PURE__ */ new iN(), gN = /* @__PURE__ */ new Y(), EA = /* @__PURE__ */ new Y();
let kn = class {
  constructor(M = new Y(), D = -1) {
    this.center = M, this.radius = D;
  }
  set(M, D) {
    return this.center.copy(M), this.radius = D, this;
  }
  setFromPoints(M, D) {
    const t = this.center;
    D !== void 0 ? t.copy(D) : us.setFromPoints(M).getCenter(t);
    let e = 0;
    for (let N = 0, n = M.length; N < n; N++)
      e = Math.max(e, t.distanceToSquared(M[N]));
    return this.radius = Math.sqrt(e), this;
  }
  copy(M) {
    return this.center.copy(M.center), this.radius = M.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(M) {
    return M.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(M) {
    return M.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(M) {
    const D = this.radius + M.radius;
    return M.center.distanceToSquared(this.center) <= D * D;
  }
  intersectsBox(M) {
    return M.intersectsSphere(this);
  }
  intersectsPlane(M) {
    return Math.abs(M.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(M, D) {
    const t = this.center.distanceToSquared(M);
    return D.copy(M), t > this.radius * this.radius && (D.sub(this.center).normalize(), D.multiplyScalar(this.radius).add(this.center)), D;
  }
  getBoundingBox(M) {
    return this.isEmpty() ? (M.makeEmpty(), M) : (M.set(this.center, this.center), M.expandByScalar(this.radius), M);
  }
  applyMatrix4(M) {
    return this.center.applyMatrix4(M), this.radius = this.radius * M.getMaxScaleOnAxis(), this;
  }
  translate(M) {
    return this.center.add(M), this;
  }
  expandByPoint(M) {
    if (this.isEmpty())
      return this.center.copy(M), this.radius = 0, this;
    gN.subVectors(M, this.center);
    const D = gN.lengthSq();
    if (D > this.radius * this.radius) {
      const t = Math.sqrt(D), e = (t - this.radius) * 0.5;
      this.center.addScaledVector(gN, e / t), this.radius += e;
    }
    return this;
  }
  union(M) {
    return M.isEmpty() ? this : this.isEmpty() ? (this.copy(M), this) : (this.center.equals(M.center) === !0 ? this.radius = Math.max(this.radius, M.radius) : (EA.subVectors(M.center, this.center).setLength(M.radius), this.expandByPoint(gN.copy(M.center).add(EA)), this.expandByPoint(gN.copy(M.center).sub(EA))), this);
  }
  equals(M) {
    return M.center.equals(this.center) && M.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
const lA = /* @__PURE__ */ new Y(), gs = /* @__PURE__ */ new Y(), ss = /* @__PURE__ */ new SM();
class te {
  constructor(M = new Y(1, 0, 0), D = 0) {
    this.isPlane = !0, this.normal = M, this.constant = D;
  }
  set(M, D) {
    return this.normal.copy(M), this.constant = D, this;
  }
  setComponents(M, D, t, e) {
    return this.normal.set(M, D, t), this.constant = e, this;
  }
  setFromNormalAndCoplanarPoint(M, D) {
    return this.normal.copy(M), this.constant = -D.dot(this.normal), this;
  }
  setFromCoplanarPoints(M, D, t) {
    const e = lA.subVectors(t, D).cross(gs.subVectors(M, D)).normalize();
    return this.setFromNormalAndCoplanarPoint(e, M), this;
  }
  copy(M) {
    return this.normal.copy(M.normal), this.constant = M.constant, this;
  }
  normalize() {
    const M = 1 / this.normal.length();
    return this.normal.multiplyScalar(M), this.constant *= M, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(M) {
    return this.normal.dot(M) + this.constant;
  }
  distanceToSphere(M) {
    return this.distanceToPoint(M.center) - M.radius;
  }
  projectPoint(M, D) {
    return D.copy(M).addScaledVector(this.normal, -this.distanceToPoint(M));
  }
  intersectLine(M, D) {
    const t = M.delta(lA), e = this.normal.dot(t);
    if (e === 0)
      return this.distanceToPoint(M.start) === 0 ? D.copy(M.start) : null;
    const N = -(M.start.dot(this.normal) + this.constant) / e;
    return N < 0 || N > 1 ? null : D.copy(M.start).addScaledVector(t, N);
  }
  intersectsLine(M) {
    const D = this.distanceToPoint(M.start), t = this.distanceToPoint(M.end);
    return D < 0 && t > 0 || t < 0 && D > 0;
  }
  intersectsBox(M) {
    return M.intersectsPlane(this);
  }
  intersectsSphere(M) {
    return M.intersectsPlane(this);
  }
  coplanarPoint(M) {
    return M.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(M, D) {
    const t = D || ss.getNormalMatrix(M), e = this.coplanarPoint(lA).applyMatrix4(M), N = this.normal.applyMatrix3(t).normalize();
    return this.constant = -e.dot(N), this;
  }
  translate(M) {
    return this.constant -= M.dot(this.normal), this;
  }
  equals(M) {
    return M.normal.equals(this.normal) && M.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Xt = /* @__PURE__ */ new kn(), HN = /* @__PURE__ */ new Y();
class Sn {
  constructor(M = new te(), D = new te(), t = new te(), e = new te(), N = new te(), n = new te()) {
    this.planes = [M, D, t, e, N, n];
  }
  set(M, D, t, e, N, n) {
    const A = this.planes;
    return A[0].copy(M), A[1].copy(D), A[2].copy(t), A[3].copy(e), A[4].copy(N), A[5].copy(n), this;
  }
  copy(M) {
    const D = this.planes;
    for (let t = 0; t < 6; t++)
      D[t].copy(M.planes[t]);
    return this;
  }
  setFromProjectionMatrix(M, D = Et) {
    const t = this.planes, e = M.elements, N = e[0], n = e[1], A = e[2], z = e[3], I = e[4], T = e[5], u = e[6], g = e[7], s = e[8], a = e[9], o = e[10], c = e[11], r = e[12], w = e[13], y = e[14], j = e[15];
    if (t[0].setComponents(z - N, g - I, c - s, j - r).normalize(), t[1].setComponents(z + N, g + I, c + s, j + r).normalize(), t[2].setComponents(z + n, g + T, c + a, j + w).normalize(), t[3].setComponents(z - n, g - T, c - a, j - w).normalize(), t[4].setComponents(z - A, g - u, c - o, j - y).normalize(), D === Et)
      t[5].setComponents(z + A, g + u, c + o, j + y).normalize();
    else if (D === qi)
      t[5].setComponents(A, u, o, y).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + D);
    return this;
  }
  intersectsObject(M) {
    if (M.boundingSphere !== void 0)
      M.boundingSphere === null && M.computeBoundingSphere(), Xt.copy(M.boundingSphere).applyMatrix4(M.matrixWorld);
    else {
      const D = M.geometry;
      D.boundingSphere === null && D.computeBoundingSphere(), Xt.copy(D.boundingSphere).applyMatrix4(M.matrixWorld);
    }
    return this.intersectsSphere(Xt);
  }
  intersectsSprite(M) {
    return Xt.center.set(0, 0, 0), Xt.radius = 0.7071067811865476, Xt.applyMatrix4(M.matrixWorld), this.intersectsSphere(Xt);
  }
  intersectsSphere(M) {
    const D = this.planes, t = M.center, e = -M.radius;
    for (let N = 0; N < 6; N++)
      if (D[N].distanceToPoint(t) < e)
        return !1;
    return !0;
  }
  intersectsBox(M) {
    const D = this.planes;
    for (let t = 0; t < 6; t++) {
      const e = D[t];
      if (HN.x = e.normal.x > 0 ? M.max.x : M.min.x, HN.y = e.normal.y > 0 ? M.max.y : M.min.y, HN.z = e.normal.z > 0 ? M.max.z : M.min.z, e.distanceToPoint(HN) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(M) {
    const D = this.planes;
    for (let t = 0; t < 6; t++)
      if (D[t].distanceToPoint(M) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const hA = /* @__PURE__ */ new ID(), Gz = /* @__PURE__ */ new Y(), Hz = /* @__PURE__ */ new Y();
class rs {
  constructor(M) {
    this.camera = M, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new rM(512, 512), this.map = null, this.mapPass = null, this.matrix = new ID(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Sn(), this._frameExtents = new rM(1, 1), this._viewportCount = 1, this._viewports = [
      new nD(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(M) {
    const D = this.camera, t = this.matrix;
    Gz.setFromMatrixPosition(M.matrixWorld), D.position.copy(Gz), Hz.setFromMatrixPosition(M.target.matrixWorld), D.lookAt(Hz), D.updateMatrixWorld(), hA.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), this._frustum.setFromProjectionMatrix(hA), t.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), t.multiply(hA);
  }
  getViewport(M) {
    return this._viewports[M];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(M) {
    return this.camera = M.camera.clone(), this.bias = M.bias, this.radius = M.radius, this.mapSize.copy(M.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const M = {};
    return this.bias !== 0 && (M.bias = this.bias), this.normalBias !== 0 && (M.normalBias = this.normalBias), this.radius !== 1 && (M.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (M.mapSize = this.mapSize.toArray()), M.camera = this.camera.toJSON(!1).object, delete M.camera.matrix, M;
  }
}
class GT extends FT {
  constructor(M = -1, D = 1, t = 1, e = -1, N = 0.1, n = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = M, this.right = D, this.top = t, this.bottom = e, this.near = N, this.far = n, this.updateProjectionMatrix();
  }
  copy(M, D) {
    return super.copy(M, D), this.left = M.left, this.right = M.right, this.top = M.top, this.bottom = M.bottom, this.near = M.near, this.far = M.far, this.zoom = M.zoom, this.view = M.view === null ? null : Object.assign({}, M.view), this;
  }
  setViewOffset(M, D, t, e, N, n) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = M, this.view.fullHeight = D, this.view.offsetX = t, this.view.offsetY = e, this.view.width = N, this.view.height = n, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const M = (this.right - this.left) / (2 * this.zoom), D = (this.top - this.bottom) / (2 * this.zoom), t = (this.right + this.left) / 2, e = (this.top + this.bottom) / 2;
    let N = t - M, n = t + M, A = e + D, z = e - D;
    if (this.view !== null && this.view.enabled) {
      const I = (this.right - this.left) / this.view.fullWidth / this.zoom, T = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      N += I * this.view.offsetX, n = N + I * this.view.width, A -= T * this.view.offsetY, z = A - T * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(N, n, A, z, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return D.object.zoom = this.zoom, D.object.left = this.left, D.object.right = this.right, D.object.top = this.top, D.object.bottom = this.bottom, D.object.near = this.near, D.object.far = this.far, this.view !== null && (D.object.view = Object.assign({}, this.view)), D;
  }
}
class cs extends rs {
  constructor() {
    super(new GT(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class as extends Ts {
  constructor(M, D) {
    super(M, D), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(pD.DEFAULT_UP), this.updateMatrix(), this.target = new pD(), this.shadow = new cs();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(M) {
    return super.copy(M), this.target = M.target.clone(), this.shadow = M.shadow.clone(), this;
  }
}
const Wz = {
  enabled: !1,
  files: {},
  add: function(i, M) {
    this.enabled !== !1 && (this.files[i] = M);
  },
  get: function(i) {
    if (this.enabled !== !1)
      return this.files[i];
  },
  remove: function(i) {
    delete this.files[i];
  },
  clear: function() {
    this.files = {};
  }
};
let os = class {
  constructor(M, D, t) {
    const e = this;
    let N = !1, n = 0, A = 0, z;
    const I = [];
    this.onStart = void 0, this.onLoad = M, this.onProgress = D, this.onError = t, this.itemStart = function(T) {
      A++, N === !1 && e.onStart !== void 0 && e.onStart(T, n, A), N = !0;
    }, this.itemEnd = function(T) {
      n++, e.onProgress !== void 0 && e.onProgress(T, n, A), n === A && (N = !1, e.onLoad !== void 0 && e.onLoad());
    }, this.itemError = function(T) {
      e.onError !== void 0 && e.onError(T);
    }, this.resolveURL = function(T) {
      return z ? z(T) : T;
    }, this.setURLModifier = function(T) {
      return z = T, this;
    }, this.addHandler = function(T, u) {
      return I.push(T, u), this;
    }, this.removeHandler = function(T) {
      const u = I.indexOf(T);
      return u !== -1 && I.splice(u, 2), this;
    }, this.getHandler = function(T) {
      for (let u = 0, g = I.length; u < g; u += 2) {
        const s = I[u], a = I[u + 1];
        if (s.global && (s.lastIndex = 0), s.test(T))
          return a;
      }
      return null;
    };
  }
};
const ys = /* @__PURE__ */ new os();
let Zn = class {
  constructor(M) {
    this.manager = M !== void 0 ? M : ys, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(M, D) {
    const t = this;
    return new Promise(function(e, N) {
      t.load(M, e, D, N);
    });
  }
  parse() {
  }
  setCrossOrigin(M) {
    return this.crossOrigin = M, this;
  }
  setWithCredentials(M) {
    return this.withCredentials = M, this;
  }
  setPath(M) {
    return this.path = M, this;
  }
  setResourcePath(M) {
    return this.resourcePath = M, this;
  }
  setRequestHeader(M) {
    return this.requestHeader = M, this;
  }
};
Zn.DEFAULT_MATERIAL_NAME = "__DEFAULT";
function HT(i) {
  for (let M = i.length - 1; M >= 0; --M)
    if (i[M] >= 65535)
      return !0;
  return !1;
}
function dN(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function js() {
  const i = dN("canvas");
  return i.style.display = "block", i;
}
const qz = {};
function wN(i) {
  i in qz || (qz[i] = !0, console.warn(i));
}
class Cs extends Zn {
  constructor(M) {
    super(M);
  }
  load(M, D, t, e) {
    this.path !== void 0 && (M = this.path + M), M = this.manager.resolveURL(M);
    const N = this, n = Wz.get(M);
    if (n !== void 0)
      return N.manager.itemStart(M), setTimeout(function() {
        D && D(n), N.manager.itemEnd(M);
      }, 0), n;
    const A = dN("img");
    function z() {
      T(), Wz.add(M, this), D && D(this), N.manager.itemEnd(M);
    }
    function I(u) {
      T(), e && e(u), N.manager.itemError(M), N.manager.itemEnd(M);
    }
    function T() {
      A.removeEventListener("load", z, !1), A.removeEventListener("error", I, !1);
    }
    return A.addEventListener("load", z, !1), A.addEventListener("error", I, !1), M.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (A.crossOrigin = this.crossOrigin), N.manager.itemStart(M), A.src = M, A;
  }
}
let we, WT = class {
  static getDataURL(M) {
    if (/^data:/i.test(M.src) || typeof HTMLCanvasElement > "u")
      return M.src;
    let D;
    if (M instanceof HTMLCanvasElement)
      D = M;
    else {
      we === void 0 && (we = dN("canvas")), we.width = M.width, we.height = M.height;
      const t = we.getContext("2d");
      M instanceof ImageData ? t.putImageData(M, 0, 0) : t.drawImage(M, 0, 0, M.width, M.height), D = we;
    }
    return D.width > 2048 || D.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", M), D.toDataURL("image/jpeg", 0.6)) : D.toDataURL("image/png");
  }
  static sRGBToLinear(M) {
    if (typeof HTMLImageElement < "u" && M instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && M instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && M instanceof ImageBitmap) {
      const D = dN("canvas");
      D.width = M.width, D.height = M.height;
      const t = D.getContext("2d");
      t.drawImage(M, 0, 0, M.width, M.height);
      const e = t.getImageData(0, 0, M.width, M.height), N = e.data;
      for (let n = 0; n < N.length; n++)
        N[n] = We(N[n] / 255) * 255;
      return t.putImageData(e, 0, 0), D;
    } else if (M.data) {
      const D = M.data.slice(0);
      for (let t = 0; t < D.length; t++)
        D instanceof Uint8Array || D instanceof Uint8ClampedArray ? D[t] = Math.floor(We(D[t] / 255) * 255) : D[t] = We(D[t]);
      return {
        data: D,
        width: M.width,
        height: M.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), M;
  }
}, Ls = 0, qT = class {
  constructor(M = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Ls++ }), this.uuid = eN(), this.data = M, this.version = 0;
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.images[this.uuid] !== void 0)
      return M.images[this.uuid];
    const t = {
      uuid: this.uuid,
      url: ""
    }, e = this.data;
    if (e !== null) {
      let N;
      if (Array.isArray(e)) {
        N = [];
        for (let n = 0, A = e.length; n < A; n++)
          e[n].isDataTexture ? N.push(dA(e[n].image)) : N.push(dA(e[n]));
      } else
        N = dA(e);
      t.url = N;
    }
    return D || (M.images[this.uuid] = t), t;
  }
};
function dA(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? WT.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let ws = 0, Mt = class Zi extends NN {
  constructor(M = Zi.DEFAULT_IMAGE, D = Zi.DEFAULT_MAPPING, t = $D, e = $D, N = hD, n = lN, A = JD, z = Rt, I = Zi.DEFAULT_ANISOTROPY, T = RD) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: ws++ }), this.uuid = eN(), this.name = "", this.source = new qT(M), this.mipmaps = [], this.mapping = D, this.channel = 0, this.wrapS = t, this.wrapT = e, this.magFilter = N, this.minFilter = n, this.anisotropy = I, this.format = A, this.internalFormat = null, this.type = z, this.offset = new rM(0, 0), this.repeat = new rM(1, 1), this.center = new rM(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new SM(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, typeof T == "string" ? this.colorSpace = T : (wN("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = T === Ie ? tD : RD), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(M = null) {
    this.source.data = M;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.name = M.name, this.source = M.source, this.mipmaps = M.mipmaps.slice(0), this.mapping = M.mapping, this.channel = M.channel, this.wrapS = M.wrapS, this.wrapT = M.wrapT, this.magFilter = M.magFilter, this.minFilter = M.minFilter, this.anisotropy = M.anisotropy, this.format = M.format, this.internalFormat = M.internalFormat, this.type = M.type, this.offset.copy(M.offset), this.repeat.copy(M.repeat), this.center.copy(M.center), this.rotation = M.rotation, this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrix.copy(M.matrix), this.generateMipmaps = M.generateMipmaps, this.premultiplyAlpha = M.premultiplyAlpha, this.flipY = M.flipY, this.unpackAlignment = M.unpackAlignment, this.colorSpace = M.colorSpace, this.userData = JSON.parse(JSON.stringify(M.userData)), this.needsUpdate = !0, this;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.textures[this.uuid] !== void 0)
      return M.textures[this.uuid];
    const t = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(M).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (t.userData = this.userData), D || (M.textures[this.uuid] = t), t;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(M) {
    if (this.mapping !== YT)
      return M;
    if (M.applyMatrix3(this.matrix), M.x < 0 || M.x > 1)
      switch (this.wrapS) {
        case wn:
          M.x = M.x - Math.floor(M.x);
          break;
        case $D:
          M.x = M.x < 0 ? 0 : 1;
          break;
        case xn:
          Math.abs(Math.floor(M.x) % 2) === 1 ? M.x = Math.ceil(M.x) - M.x : M.x = M.x - Math.floor(M.x);
          break;
      }
    if (M.y < 0 || M.y > 1)
      switch (this.wrapT) {
        case wn:
          M.y = M.y - Math.floor(M.y);
          break;
        case $D:
          M.y = M.y < 0 ? 0 : 1;
          break;
        case xn:
          Math.abs(Math.floor(M.y) % 2) === 1 ? M.y = Math.ceil(M.y) - M.y : M.y = M.y - Math.floor(M.y);
          break;
      }
    return this.flipY && (M.y = 1 - M.y), M;
  }
  set needsUpdate(M) {
    M === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  get encoding() {
    return wN("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === tD ? Ie : ZT;
  }
  set encoding(M) {
    wN("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = M === Ie ? tD : RD;
  }
};
Mt.DEFAULT_IMAGE = null;
Mt.DEFAULT_MAPPING = YT;
Mt.DEFAULT_ANISOTROPY = 1;
class xs extends Zn {
  constructor(M) {
    super(M);
  }
  load(M, D, t, e) {
    const N = new Mt(), n = new Cs(this.manager);
    return n.setCrossOrigin(this.crossOrigin), n.setPath(this.path), n.load(M, function(A) {
      N.image = A, N.needsUpdate = !0, D !== void 0 && D(N);
    }, t, e), N;
  }
}
let Os = 0, QN = class extends NN {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Os++ }), this.uuid = eN(), this.name = "", this.type = "Material", this.blending = He, this.side = Ft, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = vT, this.blendDst = pT, this.blendEquation = Be, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = jn, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = Gg, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = CA, this.stencilZFail = CA, this.stencilZPass = CA, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(M) {
    this._alphaTest > 0 != M > 0 && this.version++, this._alphaTest = M;
  }
  onBuild() {
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(M) {
    if (M !== void 0)
      for (const D in M) {
        const t = M[D];
        if (t === void 0) {
          console.warn(`THREE.Material: parameter '${D}' has value of undefined.`);
          continue;
        }
        const e = this[D];
        if (e === void 0) {
          console.warn(`THREE.Material: '${D}' is not a property of THREE.${this.type}.`);
          continue;
        }
        e && e.isColor ? e.set(t) : e && e.isVector3 && t && t.isVector3 ? e.copy(t) : this[D] = t;
      }
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    D && (M = {
      textures: {},
      images: {}
    });
    const t = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), this.color && this.color.isColor && (t.color = this.color.getHex()), this.roughness !== void 0 && (t.roughness = this.roughness), this.metalness !== void 0 && (t.metalness = this.metalness), this.sheen !== void 0 && (t.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (t.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (t.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (t.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (t.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (t.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (t.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (t.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (t.shininess = this.shininess), this.clearcoat !== void 0 && (t.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (t.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (t.clearcoatMap = this.clearcoatMap.toJSON(M).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (t.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(M).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (t.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(M).uuid, t.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (t.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (t.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (t.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (t.iridescenceMap = this.iridescenceMap.toJSON(M).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (t.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(M).uuid), this.anisotropy !== void 0 && (t.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (t.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (t.anisotropyMap = this.anisotropyMap.toJSON(M).uuid), this.map && this.map.isTexture && (t.map = this.map.toJSON(M).uuid), this.matcap && this.matcap.isTexture && (t.matcap = this.matcap.toJSON(M).uuid), this.alphaMap && this.alphaMap.isTexture && (t.alphaMap = this.alphaMap.toJSON(M).uuid), this.lightMap && this.lightMap.isTexture && (t.lightMap = this.lightMap.toJSON(M).uuid, t.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (t.aoMap = this.aoMap.toJSON(M).uuid, t.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (t.bumpMap = this.bumpMap.toJSON(M).uuid, t.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (t.normalMap = this.normalMap.toJSON(M).uuid, t.normalMapType = this.normalMapType, t.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (t.displacementMap = this.displacementMap.toJSON(M).uuid, t.displacementScale = this.displacementScale, t.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (t.roughnessMap = this.roughnessMap.toJSON(M).uuid), this.metalnessMap && this.metalnessMap.isTexture && (t.metalnessMap = this.metalnessMap.toJSON(M).uuid), this.emissiveMap && this.emissiveMap.isTexture && (t.emissiveMap = this.emissiveMap.toJSON(M).uuid), this.specularMap && this.specularMap.isTexture && (t.specularMap = this.specularMap.toJSON(M).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (t.specularIntensityMap = this.specularIntensityMap.toJSON(M).uuid), this.specularColorMap && this.specularColorMap.isTexture && (t.specularColorMap = this.specularColorMap.toJSON(M).uuid), this.envMap && this.envMap.isTexture && (t.envMap = this.envMap.toJSON(M).uuid, this.combine !== void 0 && (t.combine = this.combine)), this.envMapIntensity !== void 0 && (t.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (t.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (t.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (t.gradientMap = this.gradientMap.toJSON(M).uuid), this.transmission !== void 0 && (t.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (t.transmissionMap = this.transmissionMap.toJSON(M).uuid), this.thickness !== void 0 && (t.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (t.thicknessMap = this.thicknessMap.toJSON(M).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (t.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (t.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (t.size = this.size), this.shadowSide !== null && (t.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (t.sizeAttenuation = this.sizeAttenuation), this.blending !== He && (t.blending = this.blending), this.side !== Ft && (t.side = this.side), this.vertexColors === !0 && (t.vertexColors = !0), this.opacity < 1 && (t.opacity = this.opacity), this.transparent === !0 && (t.transparent = !0), t.depthFunc = this.depthFunc, t.depthTest = this.depthTest, t.depthWrite = this.depthWrite, t.colorWrite = this.colorWrite, t.stencilWrite = this.stencilWrite, t.stencilWriteMask = this.stencilWriteMask, t.stencilFunc = this.stencilFunc, t.stencilRef = this.stencilRef, t.stencilFuncMask = this.stencilFuncMask, t.stencilFail = this.stencilFail, t.stencilZFail = this.stencilZFail, t.stencilZPass = this.stencilZPass, this.rotation !== void 0 && this.rotation !== 0 && (t.rotation = this.rotation), this.polygonOffset === !0 && (t.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (t.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (t.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (t.linewidth = this.linewidth), this.dashSize !== void 0 && (t.dashSize = this.dashSize), this.gapSize !== void 0 && (t.gapSize = this.gapSize), this.scale !== void 0 && (t.scale = this.scale), this.dithering === !0 && (t.dithering = !0), this.alphaTest > 0 && (t.alphaTest = this.alphaTest), this.alphaHash === !0 && (t.alphaHash = !0), this.alphaToCoverage === !0 && (t.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (t.premultipliedAlpha = !0), this.forceSinglePass === !0 && (t.forceSinglePass = !0), this.wireframe === !0 && (t.wireframe = !0), this.wireframeLinewidth > 1 && (t.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (t.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (t.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (t.flatShading = !0), this.visible === !1 && (t.visible = !1), this.toneMapped === !1 && (t.toneMapped = !1), this.fog === !1 && (t.fog = !1), Object.keys(this.userData).length > 0 && (t.userData = this.userData);
    function e(N) {
      const n = [];
      for (const A in N) {
        const z = N[A];
        delete z.metadata, n.push(z);
      }
      return n;
    }
    if (D) {
      const N = e(M.textures), n = e(M.images);
      N.length > 0 && (t.textures = N), n.length > 0 && (t.images = n);
    }
    return t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.name = M.name, this.blending = M.blending, this.side = M.side, this.vertexColors = M.vertexColors, this.opacity = M.opacity, this.transparent = M.transparent, this.blendSrc = M.blendSrc, this.blendDst = M.blendDst, this.blendEquation = M.blendEquation, this.blendSrcAlpha = M.blendSrcAlpha, this.blendDstAlpha = M.blendDstAlpha, this.blendEquationAlpha = M.blendEquationAlpha, this.depthFunc = M.depthFunc, this.depthTest = M.depthTest, this.depthWrite = M.depthWrite, this.stencilWriteMask = M.stencilWriteMask, this.stencilFunc = M.stencilFunc, this.stencilRef = M.stencilRef, this.stencilFuncMask = M.stencilFuncMask, this.stencilFail = M.stencilFail, this.stencilZFail = M.stencilZFail, this.stencilZPass = M.stencilZPass, this.stencilWrite = M.stencilWrite;
    const D = M.clippingPlanes;
    let t = null;
    if (D !== null) {
      const e = D.length;
      t = new Array(e);
      for (let N = 0; N !== e; ++N)
        t[N] = D[N].clone();
    }
    return this.clippingPlanes = t, this.clipIntersection = M.clipIntersection, this.clipShadows = M.clipShadows, this.shadowSide = M.shadowSide, this.colorWrite = M.colorWrite, this.precision = M.precision, this.polygonOffset = M.polygonOffset, this.polygonOffsetFactor = M.polygonOffsetFactor, this.polygonOffsetUnits = M.polygonOffsetUnits, this.dithering = M.dithering, this.alphaTest = M.alphaTest, this.alphaHash = M.alphaHash, this.alphaToCoverage = M.alphaToCoverage, this.premultipliedAlpha = M.premultipliedAlpha, this.forceSinglePass = M.forceSinglePass, this.visible = M.visible, this.toneMapped = M.toneMapped, this.userData = JSON.parse(JSON.stringify(M.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
};
class XT extends QN {
  constructor(M) {
    super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new KM(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new KM(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = _T, this.normalScale = new rM(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = fn, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.emissive.copy(M.emissive), this.emissiveMap = M.emissiveMap, this.emissiveIntensity = M.emissiveIntensity, this.bumpMap = M.bumpMap, this.bumpScale = M.bumpScale, this.normalMap = M.normalMap, this.normalMapType = M.normalMapType, this.normalScale.copy(M.normalScale), this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.flatShading = M.flatShading, this.fog = M.fog, this;
  }
}
const gt = /* @__PURE__ */ new Y(), vA = /* @__PURE__ */ new Y(), WN = /* @__PURE__ */ new Y(), ft = /* @__PURE__ */ new Y(), pA = /* @__PURE__ */ new Y(), qN = /* @__PURE__ */ new Y(), YA = /* @__PURE__ */ new Y();
let Es = class {
  constructor(M = new Y(), D = new Y(0, 0, -1)) {
    this.origin = M, this.direction = D;
  }
  set(M, D) {
    return this.origin.copy(M), this.direction.copy(D), this;
  }
  copy(M) {
    return this.origin.copy(M.origin), this.direction.copy(M.direction), this;
  }
  at(M, D) {
    return D.copy(this.origin).addScaledVector(this.direction, M);
  }
  lookAt(M) {
    return this.direction.copy(M).sub(this.origin).normalize(), this;
  }
  recast(M) {
    return this.origin.copy(this.at(M, gt)), this;
  }
  closestPointToPoint(M, D) {
    D.subVectors(M, this.origin);
    const t = D.dot(this.direction);
    return t < 0 ? D.copy(this.origin) : D.copy(this.origin).addScaledVector(this.direction, t);
  }
  distanceToPoint(M) {
    return Math.sqrt(this.distanceSqToPoint(M));
  }
  distanceSqToPoint(M) {
    const D = gt.subVectors(M, this.origin).dot(this.direction);
    return D < 0 ? this.origin.distanceToSquared(M) : (gt.copy(this.origin).addScaledVector(this.direction, D), gt.distanceToSquared(M));
  }
  distanceSqToSegment(M, D, t, e) {
    vA.copy(M).add(D).multiplyScalar(0.5), WN.copy(D).sub(M).normalize(), ft.copy(this.origin).sub(vA);
    const N = M.distanceTo(D) * 0.5, n = -this.direction.dot(WN), A = ft.dot(this.direction), z = -ft.dot(WN), I = ft.lengthSq(), T = Math.abs(1 - n * n);
    let u, g, s, a;
    if (T > 0)
      if (u = n * z - A, g = n * A - z, a = N * T, u >= 0)
        if (g >= -a)
          if (g <= a) {
            const o = 1 / T;
            u *= o, g *= o, s = u * (u + n * g + 2 * A) + g * (n * u + g + 2 * z) + I;
          } else
            g = N, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
        else
          g = -N, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
      else
        g <= -a ? (u = Math.max(0, -(-n * N + A)), g = u > 0 ? -N : Math.min(Math.max(-N, -z), N), s = -u * u + g * (g + 2 * z) + I) : g <= a ? (u = 0, g = Math.min(Math.max(-N, -z), N), s = g * (g + 2 * z) + I) : (u = Math.max(0, -(n * N + A)), g = u > 0 ? N : Math.min(Math.max(-N, -z), N), s = -u * u + g * (g + 2 * z) + I);
    else
      g = n > 0 ? -N : N, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
    return t && t.copy(this.origin).addScaledVector(this.direction, u), e && e.copy(vA).addScaledVector(WN, g), s;
  }
  intersectSphere(M, D) {
    gt.subVectors(M.center, this.origin);
    const t = gt.dot(this.direction), e = gt.dot(gt) - t * t, N = M.radius * M.radius;
    if (e > N)
      return null;
    const n = Math.sqrt(N - e), A = t - n, z = t + n;
    return z < 0 ? null : A < 0 ? this.at(z, D) : this.at(A, D);
  }
  intersectsSphere(M) {
    return this.distanceSqToPoint(M.center) <= M.radius * M.radius;
  }
  distanceToPlane(M) {
    const D = M.normal.dot(this.direction);
    if (D === 0)
      return M.distanceToPoint(this.origin) === 0 ? 0 : null;
    const t = -(this.origin.dot(M.normal) + M.constant) / D;
    return t >= 0 ? t : null;
  }
  intersectPlane(M, D) {
    const t = this.distanceToPlane(M);
    return t === null ? null : this.at(t, D);
  }
  intersectsPlane(M) {
    const D = M.distanceToPoint(this.origin);
    return D === 0 || M.normal.dot(this.direction) * D < 0;
  }
  intersectBox(M, D) {
    let t, e, N, n, A, z;
    const I = 1 / this.direction.x, T = 1 / this.direction.y, u = 1 / this.direction.z, g = this.origin;
    return I >= 0 ? (t = (M.min.x - g.x) * I, e = (M.max.x - g.x) * I) : (t = (M.max.x - g.x) * I, e = (M.min.x - g.x) * I), T >= 0 ? (N = (M.min.y - g.y) * T, n = (M.max.y - g.y) * T) : (N = (M.max.y - g.y) * T, n = (M.min.y - g.y) * T), t > n || N > e || ((N > t || isNaN(t)) && (t = N), (n < e || isNaN(e)) && (e = n), u >= 0 ? (A = (M.min.z - g.z) * u, z = (M.max.z - g.z) * u) : (A = (M.max.z - g.z) * u, z = (M.min.z - g.z) * u), t > z || A > e) || ((A > t || t !== t) && (t = A), (z < e || e !== e) && (e = z), e < 0) ? null : this.at(t >= 0 ? t : e, D);
  }
  intersectsBox(M) {
    return this.intersectBox(M, gt) !== null;
  }
  intersectTriangle(M, D, t, e, N) {
    pA.subVectors(D, M), qN.subVectors(t, M), YA.crossVectors(pA, qN);
    let n = this.direction.dot(YA), A;
    if (n > 0) {
      if (e)
        return null;
      A = 1;
    } else if (n < 0)
      A = -1, n = -n;
    else
      return null;
    ft.subVectors(this.origin, M);
    const z = A * this.direction.dot(qN.crossVectors(ft, qN));
    if (z < 0)
      return null;
    const I = A * this.direction.dot(pA.cross(ft));
    if (I < 0 || z + I > n)
      return null;
    const T = -A * ft.dot(YA);
    return T < 0 ? null : this.at(T / n, N);
  }
  applyMatrix4(M) {
    return this.origin.applyMatrix4(M), this.direction.transformDirection(M), this;
  }
  equals(M) {
    return M.origin.equals(this.origin) && M.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
const VD = /* @__PURE__ */ new Y(), st = /* @__PURE__ */ new Y(), UA = /* @__PURE__ */ new Y(), rt = /* @__PURE__ */ new Y(), xe = /* @__PURE__ */ new Y(), Oe = /* @__PURE__ */ new Y(), Xz = /* @__PURE__ */ new Y(), fA = /* @__PURE__ */ new Y(), mA = /* @__PURE__ */ new Y(), QA = /* @__PURE__ */ new Y();
let XN = !1, $N = class ee {
  constructor(M = new Y(), D = new Y(), t = new Y()) {
    this.a = M, this.b = D, this.c = t;
  }
  static getNormal(M, D, t, e) {
    e.subVectors(t, D), VD.subVectors(M, D), e.cross(VD);
    const N = e.lengthSq();
    return N > 0 ? e.multiplyScalar(1 / Math.sqrt(N)) : e.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(M, D, t, e, N) {
    VD.subVectors(e, D), st.subVectors(t, D), UA.subVectors(M, D);
    const n = VD.dot(VD), A = VD.dot(st), z = VD.dot(UA), I = st.dot(st), T = st.dot(UA), u = n * I - A * A;
    if (u === 0)
      return N.set(-2, -1, -1);
    const g = 1 / u, s = (I * z - A * T) * g, a = (n * T - A * z) * g;
    return N.set(1 - s - a, a, s);
  }
  static containsPoint(M, D, t, e) {
    return this.getBarycoord(M, D, t, e, rt), rt.x >= 0 && rt.y >= 0 && rt.x + rt.y <= 1;
  }
  static getUV(M, D, t, e, N, n, A, z) {
    return XN === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), XN = !0), this.getInterpolation(M, D, t, e, N, n, A, z);
  }
  static getInterpolation(M, D, t, e, N, n, A, z) {
    return this.getBarycoord(M, D, t, e, rt), z.setScalar(0), z.addScaledVector(N, rt.x), z.addScaledVector(n, rt.y), z.addScaledVector(A, rt.z), z;
  }
  static isFrontFacing(M, D, t, e) {
    return VD.subVectors(t, D), st.subVectors(M, D), VD.cross(st).dot(e) < 0;
  }
  set(M, D, t) {
    return this.a.copy(M), this.b.copy(D), this.c.copy(t), this;
  }
  setFromPointsAndIndices(M, D, t, e) {
    return this.a.copy(M[D]), this.b.copy(M[t]), this.c.copy(M[e]), this;
  }
  setFromAttributeAndIndices(M, D, t, e) {
    return this.a.fromBufferAttribute(M, D), this.b.fromBufferAttribute(M, t), this.c.fromBufferAttribute(M, e), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.a.copy(M.a), this.b.copy(M.b), this.c.copy(M.c), this;
  }
  getArea() {
    return VD.subVectors(this.c, this.b), st.subVectors(this.a, this.b), VD.cross(st).length() * 0.5;
  }
  getMidpoint(M) {
    return M.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(M) {
    return ee.getNormal(this.a, this.b, this.c, M);
  }
  getPlane(M) {
    return M.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(M, D) {
    return ee.getBarycoord(M, this.a, this.b, this.c, D);
  }
  getUV(M, D, t, e, N) {
    return XN === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), XN = !0), ee.getInterpolation(M, this.a, this.b, this.c, D, t, e, N);
  }
  getInterpolation(M, D, t, e, N) {
    return ee.getInterpolation(M, this.a, this.b, this.c, D, t, e, N);
  }
  containsPoint(M) {
    return ee.containsPoint(M, this.a, this.b, this.c);
  }
  isFrontFacing(M) {
    return ee.isFrontFacing(this.a, this.b, this.c, M);
  }
  intersectsBox(M) {
    return M.intersectsTriangle(this);
  }
  closestPointToPoint(M, D) {
    const t = this.a, e = this.b, N = this.c;
    let n, A;
    xe.subVectors(e, t), Oe.subVectors(N, t), fA.subVectors(M, t);
    const z = xe.dot(fA), I = Oe.dot(fA);
    if (z <= 0 && I <= 0)
      return D.copy(t);
    mA.subVectors(M, e);
    const T = xe.dot(mA), u = Oe.dot(mA);
    if (T >= 0 && u <= T)
      return D.copy(e);
    const g = z * u - T * I;
    if (g <= 0 && z >= 0 && T <= 0)
      return n = z / (z - T), D.copy(t).addScaledVector(xe, n);
    QA.subVectors(M, N);
    const s = xe.dot(QA), a = Oe.dot(QA);
    if (a >= 0 && s <= a)
      return D.copy(N);
    const o = s * I - z * a;
    if (o <= 0 && I >= 0 && a <= 0)
      return A = I / (I - a), D.copy(t).addScaledVector(Oe, A);
    const c = T * a - s * u;
    if (c <= 0 && u - T >= 0 && s - a >= 0)
      return Xz.subVectors(N, e), A = (u - T) / (u - T + (s - a)), D.copy(e).addScaledVector(Xz, A);
    const r = 1 / (c + o + g);
    return n = o * r, A = g * r, D.copy(t).addScaledVector(xe, n).addScaledVector(Oe, A);
  }
  equals(M) {
    return M.a.equals(this.a) && M.b.equals(this.b) && M.c.equals(this.c);
  }
}, $T = class extends QN {
  constructor(M) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new KM(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = fn, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.fog = M.fog, this;
  }
};
const JM = /* @__PURE__ */ new Y(), JN = /* @__PURE__ */ new rM();
let it = class {
  constructor(M, D, t = !1) {
    if (Array.isArray(M))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = M, this.itemSize = D, this.count = M !== void 0 ? M.length / D : 0, this.normalized = t, this.usage = Sz, this.updateRange = { offset: 0, count: -1 }, this.gpuType = bt, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
  setUsage(M) {
    return this.usage = M, this;
  }
  copy(M) {
    return this.name = M.name, this.array = new M.array.constructor(M.array), this.itemSize = M.itemSize, this.count = M.count, this.normalized = M.normalized, this.usage = M.usage, this.gpuType = M.gpuType, this;
  }
  copyAt(M, D, t) {
    M *= this.itemSize, t *= D.itemSize;
    for (let e = 0, N = this.itemSize; e < N; e++)
      this.array[M + e] = D.array[t + e];
    return this;
  }
  copyArray(M) {
    return this.array.set(M), this;
  }
  applyMatrix3(M) {
    if (this.itemSize === 2)
      for (let D = 0, t = this.count; D < t; D++)
        JN.fromBufferAttribute(this, D), JN.applyMatrix3(M), this.setXY(D, JN.x, JN.y);
    else if (this.itemSize === 3)
      for (let D = 0, t = this.count; D < t; D++)
        JM.fromBufferAttribute(this, D), JM.applyMatrix3(M), this.setXYZ(D, JM.x, JM.y, JM.z);
    return this;
  }
  applyMatrix4(M) {
    for (let D = 0, t = this.count; D < t; D++)
      JM.fromBufferAttribute(this, D), JM.applyMatrix4(M), this.setXYZ(D, JM.x, JM.y, JM.z);
    return this;
  }
  applyNormalMatrix(M) {
    for (let D = 0, t = this.count; D < t; D++)
      JM.fromBufferAttribute(this, D), JM.applyNormalMatrix(M), this.setXYZ(D, JM.x, JM.y, JM.z);
    return this;
  }
  transformDirection(M) {
    for (let D = 0, t = this.count; D < t; D++)
      JM.fromBufferAttribute(this, D), JM.transformDirection(M), this.setXYZ(D, JM.x, JM.y, JM.z);
    return this;
  }
  set(M, D = 0) {
    return this.array.set(M, D), this;
  }
  getComponent(M, D) {
    let t = this.array[M * this.itemSize + D];
    return this.normalized && (t = IN(t, this.array)), t;
  }
  setComponent(M, D, t) {
    return this.normalized && (t = ED(t, this.array)), this.array[M * this.itemSize + D] = t, this;
  }
  getX(M) {
    let D = this.array[M * this.itemSize];
    return this.normalized && (D = IN(D, this.array)), D;
  }
  setX(M, D) {
    return this.normalized && (D = ED(D, this.array)), this.array[M * this.itemSize] = D, this;
  }
  getY(M) {
    let D = this.array[M * this.itemSize + 1];
    return this.normalized && (D = IN(D, this.array)), D;
  }
  setY(M, D) {
    return this.normalized && (D = ED(D, this.array)), this.array[M * this.itemSize + 1] = D, this;
  }
  getZ(M) {
    let D = this.array[M * this.itemSize + 2];
    return this.normalized && (D = IN(D, this.array)), D;
  }
  setZ(M, D) {
    return this.normalized && (D = ED(D, this.array)), this.array[M * this.itemSize + 2] = D, this;
  }
  getW(M) {
    let D = this.array[M * this.itemSize + 3];
    return this.normalized && (D = IN(D, this.array)), D;
  }
  setW(M, D) {
    return this.normalized && (D = ED(D, this.array)), this.array[M * this.itemSize + 3] = D, this;
  }
  setXY(M, D, t) {
    return M *= this.itemSize, this.normalized && (D = ED(D, this.array), t = ED(t, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this;
  }
  setXYZ(M, D, t, e) {
    return M *= this.itemSize, this.normalized && (D = ED(D, this.array), t = ED(t, this.array), e = ED(e, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this.array[M + 2] = e, this;
  }
  setXYZW(M, D, t, e, N) {
    return M *= this.itemSize, this.normalized && (D = ED(D, this.array), t = ED(t, this.array), e = ED(e, this.array), N = ED(N, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this.array[M + 2] = e, this.array[M + 3] = N, this;
  }
  onUpload(M) {
    return this.onUploadCallback = M, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const M = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (M.name = this.name), this.usage !== Sz && (M.usage = this.usage), (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (M.updateRange = this.updateRange), M;
  }
}, JT = class extends it {
  constructor(M, D, t) {
    super(new Uint16Array(M), D, t);
  }
}, Mu = class extends it {
  constructor(M, D, t) {
    super(new Uint32Array(M), D, t);
  }
}, At = class extends it {
  constructor(M, D, t) {
    super(new Float32Array(M), D, t);
  }
}, ls = 0;
const ZD = /* @__PURE__ */ new ID(), kA = /* @__PURE__ */ new pD(), Ee = /* @__PURE__ */ new Y(), fD = /* @__PURE__ */ new iN(), sN = /* @__PURE__ */ new iN(), iD = /* @__PURE__ */ new Y();
let AN = class Du extends NN {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: ls++ }), this.uuid = eN(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(M) {
    return Array.isArray(M) ? this.index = new (HT(M) ? Mu : JT)(M, 1) : this.index = M, this;
  }
  getAttribute(M) {
    return this.attributes[M];
  }
  setAttribute(M, D) {
    return this.attributes[M] = D, this;
  }
  deleteAttribute(M) {
    return delete this.attributes[M], this;
  }
  hasAttribute(M) {
    return this.attributes[M] !== void 0;
  }
  addGroup(M, D, t = 0) {
    this.groups.push({
      start: M,
      count: D,
      materialIndex: t
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(M, D) {
    this.drawRange.start = M, this.drawRange.count = D;
  }
  applyMatrix4(M) {
    const D = this.attributes.position;
    D !== void 0 && (D.applyMatrix4(M), D.needsUpdate = !0);
    const t = this.attributes.normal;
    if (t !== void 0) {
      const N = new SM().getNormalMatrix(M);
      t.applyNormalMatrix(N), t.needsUpdate = !0;
    }
    const e = this.attributes.tangent;
    return e !== void 0 && (e.transformDirection(M), e.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(M) {
    return ZD.makeRotationFromQuaternion(M), this.applyMatrix4(ZD), this;
  }
  rotateX(M) {
    return ZD.makeRotationX(M), this.applyMatrix4(ZD), this;
  }
  rotateY(M) {
    return ZD.makeRotationY(M), this.applyMatrix4(ZD), this;
  }
  rotateZ(M) {
    return ZD.makeRotationZ(M), this.applyMatrix4(ZD), this;
  }
  translate(M, D, t) {
    return ZD.makeTranslation(M, D, t), this.applyMatrix4(ZD), this;
  }
  scale(M, D, t) {
    return ZD.makeScale(M, D, t), this.applyMatrix4(ZD), this;
  }
  lookAt(M) {
    return kA.lookAt(M), kA.updateMatrix(), this.applyMatrix4(kA.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Ee).negate(), this.translate(Ee.x, Ee.y, Ee.z), this;
  }
  setFromPoints(M) {
    const D = [];
    for (let t = 0, e = M.length; t < e; t++) {
      const N = M[t];
      D.push(N.x, N.y, N.z || 0);
    }
    return this.setAttribute("position", new At(D, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new iN());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new Y(-1 / 0, -1 / 0, -1 / 0),
        new Y(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (M !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(M), D)
        for (let t = 0, e = D.length; t < e; t++) {
          const N = D[t];
          fD.setFromBufferAttribute(N), this.morphTargetsRelative ? (iD.addVectors(this.boundingBox.min, fD.min), this.boundingBox.expandByPoint(iD), iD.addVectors(this.boundingBox.max, fD.max), this.boundingBox.expandByPoint(iD)) : (this.boundingBox.expandByPoint(fD.min), this.boundingBox.expandByPoint(fD.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new kn());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new Y(), 1 / 0);
      return;
    }
    if (M) {
      const t = this.boundingSphere.center;
      if (fD.setFromBufferAttribute(M), D)
        for (let N = 0, n = D.length; N < n; N++) {
          const A = D[N];
          sN.setFromBufferAttribute(A), this.morphTargetsRelative ? (iD.addVectors(fD.min, sN.min), fD.expandByPoint(iD), iD.addVectors(fD.max, sN.max), fD.expandByPoint(iD)) : (fD.expandByPoint(sN.min), fD.expandByPoint(sN.max));
        }
      fD.getCenter(t);
      let e = 0;
      for (let N = 0, n = M.count; N < n; N++)
        iD.fromBufferAttribute(M, N), e = Math.max(e, t.distanceToSquared(iD));
      if (D)
        for (let N = 0, n = D.length; N < n; N++) {
          const A = D[N], z = this.morphTargetsRelative;
          for (let I = 0, T = A.count; I < T; I++)
            iD.fromBufferAttribute(A, I), z && (Ee.fromBufferAttribute(M, I), iD.add(Ee)), e = Math.max(e, t.distanceToSquared(iD));
        }
      this.boundingSphere.radius = Math.sqrt(e), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const M = this.index, D = this.attributes;
    if (M === null || D.position === void 0 || D.normal === void 0 || D.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const t = M.array, e = D.position.array, N = D.normal.array, n = D.uv.array, A = e.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new it(new Float32Array(4 * A), 4));
    const z = this.getAttribute("tangent").array, I = [], T = [];
    for (let O = 0; O < A; O++)
      I[O] = new Y(), T[O] = new Y();
    const u = new Y(), g = new Y(), s = new Y(), a = new rM(), o = new rM(), c = new rM(), r = new Y(), w = new Y();
    function y(O, K, F) {
      u.fromArray(e, O * 3), g.fromArray(e, K * 3), s.fromArray(e, F * 3), a.fromArray(n, O * 2), o.fromArray(n, K * 2), c.fromArray(n, F * 2), g.sub(u), s.sub(u), o.sub(a), c.sub(a);
      const G = 1 / (o.x * c.y - c.x * o.y);
      isFinite(G) && (r.copy(g).multiplyScalar(c.y).addScaledVector(s, -o.y).multiplyScalar(G), w.copy(s).multiplyScalar(o.x).addScaledVector(g, -c.x).multiplyScalar(G), I[O].add(r), I[K].add(r), I[F].add(r), T[O].add(w), T[K].add(w), T[F].add(w));
    }
    let j = this.groups;
    j.length === 0 && (j = [{
      start: 0,
      count: t.length
    }]);
    for (let O = 0, K = j.length; O < K; ++O) {
      const F = j[O], G = F.start, p = F.count;
      for (let k = G, B = G + p; k < B; k += 3)
        y(
          t[k + 0],
          t[k + 1],
          t[k + 2]
        );
    }
    const l = new Y(), d = new Y(), h = new Y(), S = new Y();
    function L(O) {
      h.fromArray(N, O * 3), S.copy(h);
      const K = I[O];
      l.copy(K), l.sub(h.multiplyScalar(h.dot(K))).normalize(), d.crossVectors(S, K);
      const G = d.dot(T[O]) < 0 ? -1 : 1;
      z[O * 4] = l.x, z[O * 4 + 1] = l.y, z[O * 4 + 2] = l.z, z[O * 4 + 3] = G;
    }
    for (let O = 0, K = j.length; O < K; ++O) {
      const F = j[O], G = F.start, p = F.count;
      for (let k = G, B = G + p; k < B; k += 3)
        L(t[k + 0]), L(t[k + 1]), L(t[k + 2]);
    }
  }
  computeVertexNormals() {
    const M = this.index, D = this.getAttribute("position");
    if (D !== void 0) {
      let t = this.getAttribute("normal");
      if (t === void 0)
        t = new it(new Float32Array(D.count * 3), 3), this.setAttribute("normal", t);
      else
        for (let g = 0, s = t.count; g < s; g++)
          t.setXYZ(g, 0, 0, 0);
      const e = new Y(), N = new Y(), n = new Y(), A = new Y(), z = new Y(), I = new Y(), T = new Y(), u = new Y();
      if (M)
        for (let g = 0, s = M.count; g < s; g += 3) {
          const a = M.getX(g + 0), o = M.getX(g + 1), c = M.getX(g + 2);
          e.fromBufferAttribute(D, a), N.fromBufferAttribute(D, o), n.fromBufferAttribute(D, c), T.subVectors(n, N), u.subVectors(e, N), T.cross(u), A.fromBufferAttribute(t, a), z.fromBufferAttribute(t, o), I.fromBufferAttribute(t, c), A.add(T), z.add(T), I.add(T), t.setXYZ(a, A.x, A.y, A.z), t.setXYZ(o, z.x, z.y, z.z), t.setXYZ(c, I.x, I.y, I.z);
        }
      else
        for (let g = 0, s = D.count; g < s; g += 3)
          e.fromBufferAttribute(D, g + 0), N.fromBufferAttribute(D, g + 1), n.fromBufferAttribute(D, g + 2), T.subVectors(n, N), u.subVectors(e, N), T.cross(u), t.setXYZ(g + 0, T.x, T.y, T.z), t.setXYZ(g + 1, T.x, T.y, T.z), t.setXYZ(g + 2, T.x, T.y, T.z);
      this.normalizeNormals(), t.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const M = this.attributes.normal;
    for (let D = 0, t = M.count; D < t; D++)
      iD.fromBufferAttribute(M, D), iD.normalize(), M.setXYZ(D, iD.x, iD.y, iD.z);
  }
  toNonIndexed() {
    function M(A, z) {
      const I = A.array, T = A.itemSize, u = A.normalized, g = new I.constructor(z.length * T);
      let s = 0, a = 0;
      for (let o = 0, c = z.length; o < c; o++) {
        A.isInterleavedBufferAttribute ? s = z[o] * A.data.stride + A.offset : s = z[o] * T;
        for (let r = 0; r < T; r++)
          g[a++] = I[s++];
      }
      return new it(g, T, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const D = new Du(), t = this.index.array, e = this.attributes;
    for (const A in e) {
      const z = e[A], I = M(z, t);
      D.setAttribute(A, I);
    }
    const N = this.morphAttributes;
    for (const A in N) {
      const z = [], I = N[A];
      for (let T = 0, u = I.length; T < u; T++) {
        const g = I[T], s = M(g, t);
        z.push(s);
      }
      D.morphAttributes[A] = z;
    }
    D.morphTargetsRelative = this.morphTargetsRelative;
    const n = this.groups;
    for (let A = 0, z = n.length; A < z; A++) {
      const I = n[A];
      D.addGroup(I.start, I.count, I.materialIndex);
    }
    return D;
  }
  toJSON() {
    const M = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (M.uuid = this.uuid, M.type = this.type, this.name !== "" && (M.name = this.name), Object.keys(this.userData).length > 0 && (M.userData = this.userData), this.parameters !== void 0) {
      const z = this.parameters;
      for (const I in z)
        z[I] !== void 0 && (M[I] = z[I]);
      return M;
    }
    M.data = { attributes: {} };
    const D = this.index;
    D !== null && (M.data.index = {
      type: D.array.constructor.name,
      array: Array.prototype.slice.call(D.array)
    });
    const t = this.attributes;
    for (const z in t) {
      const I = t[z];
      M.data.attributes[z] = I.toJSON(M.data);
    }
    const e = {};
    let N = !1;
    for (const z in this.morphAttributes) {
      const I = this.morphAttributes[z], T = [];
      for (let u = 0, g = I.length; u < g; u++) {
        const s = I[u];
        T.push(s.toJSON(M.data));
      }
      T.length > 0 && (e[z] = T, N = !0);
    }
    N && (M.data.morphAttributes = e, M.data.morphTargetsRelative = this.morphTargetsRelative);
    const n = this.groups;
    n.length > 0 && (M.data.groups = JSON.parse(JSON.stringify(n)));
    const A = this.boundingSphere;
    return A !== null && (M.data.boundingSphere = {
      center: A.center.toArray(),
      radius: A.radius
    }), M;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const D = {};
    this.name = M.name;
    const t = M.index;
    t !== null && this.setIndex(t.clone(D));
    const e = M.attributes;
    for (const I in e) {
      const T = e[I];
      this.setAttribute(I, T.clone(D));
    }
    const N = M.morphAttributes;
    for (const I in N) {
      const T = [], u = N[I];
      for (let g = 0, s = u.length; g < s; g++)
        T.push(u[g].clone(D));
      this.morphAttributes[I] = T;
    }
    this.morphTargetsRelative = M.morphTargetsRelative;
    const n = M.groups;
    for (let I = 0, T = n.length; I < T; I++) {
      const u = n[I];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const A = M.boundingBox;
    A !== null && (this.boundingBox = A.clone());
    const z = M.boundingSphere;
    return z !== null && (this.boundingSphere = z.clone()), this.drawRange.start = M.drawRange.start, this.drawRange.count = M.drawRange.count, this.userData = M.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
const $z = /* @__PURE__ */ new ID(), $t = /* @__PURE__ */ new Es(), Mi = /* @__PURE__ */ new kn(), Jz = /* @__PURE__ */ new Y(), le = /* @__PURE__ */ new Y(), he = /* @__PURE__ */ new Y(), de = /* @__PURE__ */ new Y(), SA = /* @__PURE__ */ new Y(), Di = /* @__PURE__ */ new Y(), ti = /* @__PURE__ */ new rM(), ei = /* @__PURE__ */ new rM(), Ni = /* @__PURE__ */ new rM(), MI = /* @__PURE__ */ new Y(), DI = /* @__PURE__ */ new Y(), tI = /* @__PURE__ */ new Y(), ii = /* @__PURE__ */ new Y(), Ai = /* @__PURE__ */ new Y();
let Nt = class extends pD {
  constructor(M = new AN(), D = new $T()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), M.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = M.morphTargetInfluences.slice()), M.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, M.morphTargetDictionary)), this.material = Array.isArray(M.material) ? M.material.slice() : M.material, this.geometry = M.geometry, this;
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, t = Object.keys(D);
    if (t.length > 0) {
      const e = D[t[0]];
      if (e !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let N = 0, n = e.length; N < n; N++) {
          const A = e[N].name || String(N);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = N;
        }
      }
    }
  }
  getVertexPosition(M, D) {
    const t = this.geometry, e = t.attributes.position, N = t.morphAttributes.position, n = t.morphTargetsRelative;
    D.fromBufferAttribute(e, M);
    const A = this.morphTargetInfluences;
    if (N && A) {
      Di.set(0, 0, 0);
      for (let z = 0, I = N.length; z < I; z++) {
        const T = A[z], u = N[z];
        T !== 0 && (SA.fromBufferAttribute(u, M), n ? Di.addScaledVector(SA, T) : Di.addScaledVector(SA.sub(D), T));
      }
      D.add(Di);
    }
    return D;
  }
  raycast(M, D) {
    const t = this.geometry, e = this.material, N = this.matrixWorld;
    e !== void 0 && (t.boundingSphere === null && t.computeBoundingSphere(), Mi.copy(t.boundingSphere), Mi.applyMatrix4(N), $t.copy(M.ray).recast(M.near), !(Mi.containsPoint($t.origin) === !1 && ($t.intersectSphere(Mi, Jz) === null || $t.origin.distanceToSquared(Jz) > (M.far - M.near) ** 2)) && ($z.copy(N).invert(), $t.copy(M.ray).applyMatrix4($z), !(t.boundingBox !== null && $t.intersectsBox(t.boundingBox) === !1) && this._computeIntersections(M, D, $t)));
  }
  _computeIntersections(M, D, t) {
    let e;
    const N = this.geometry, n = this.material, A = N.index, z = N.attributes.position, I = N.attributes.uv, T = N.attributes.uv1, u = N.attributes.normal, g = N.groups, s = N.drawRange;
    if (A !== null)
      if (Array.isArray(n))
        for (let a = 0, o = g.length; a < o; a++) {
          const c = g[a], r = n[c.materialIndex], w = Math.max(c.start, s.start), y = Math.min(A.count, Math.min(c.start + c.count, s.start + s.count));
          for (let j = w, l = y; j < l; j += 3) {
            const d = A.getX(j), h = A.getX(j + 1), S = A.getX(j + 2);
            e = ni(this, r, M, t, I, T, u, d, h, S), e && (e.faceIndex = Math.floor(j / 3), e.face.materialIndex = c.materialIndex, D.push(e));
          }
        }
      else {
        const a = Math.max(0, s.start), o = Math.min(A.count, s.start + s.count);
        for (let c = a, r = o; c < r; c += 3) {
          const w = A.getX(c), y = A.getX(c + 1), j = A.getX(c + 2);
          e = ni(this, n, M, t, I, T, u, w, y, j), e && (e.faceIndex = Math.floor(c / 3), D.push(e));
        }
      }
    else if (z !== void 0)
      if (Array.isArray(n))
        for (let a = 0, o = g.length; a < o; a++) {
          const c = g[a], r = n[c.materialIndex], w = Math.max(c.start, s.start), y = Math.min(z.count, Math.min(c.start + c.count, s.start + s.count));
          for (let j = w, l = y; j < l; j += 3) {
            const d = j, h = j + 1, S = j + 2;
            e = ni(this, r, M, t, I, T, u, d, h, S), e && (e.faceIndex = Math.floor(j / 3), e.face.materialIndex = c.materialIndex, D.push(e));
          }
        }
      else {
        const a = Math.max(0, s.start), o = Math.min(z.count, s.start + s.count);
        for (let c = a, r = o; c < r; c += 3) {
          const w = c, y = c + 1, j = c + 2;
          e = ni(this, n, M, t, I, T, u, w, y, j), e && (e.faceIndex = Math.floor(c / 3), D.push(e));
        }
      }
  }
};
function hs(i, M, D, t, e, N, n, A) {
  let z;
  if (M.side === vD ? z = t.intersectTriangle(n, N, e, !0, A) : z = t.intersectTriangle(e, N, n, M.side === Ft, A), z === null)
    return null;
  Ai.copy(A), Ai.applyMatrix4(i.matrixWorld);
  const I = D.ray.origin.distanceTo(Ai);
  return I < D.near || I > D.far ? null : {
    distance: I,
    point: Ai.clone(),
    object: i
  };
}
function ni(i, M, D, t, e, N, n, A, z, I) {
  i.getVertexPosition(A, le), i.getVertexPosition(z, he), i.getVertexPosition(I, de);
  const T = hs(i, M, D, t, le, he, de, ii);
  if (T) {
    e && (ti.fromBufferAttribute(e, A), ei.fromBufferAttribute(e, z), Ni.fromBufferAttribute(e, I), T.uv = $N.getInterpolation(ii, le, he, de, ti, ei, Ni, new rM())), N && (ti.fromBufferAttribute(N, A), ei.fromBufferAttribute(N, z), Ni.fromBufferAttribute(N, I), T.uv1 = $N.getInterpolation(ii, le, he, de, ti, ei, Ni, new rM()), T.uv2 = T.uv1), n && (MI.fromBufferAttribute(n, A), DI.fromBufferAttribute(n, z), tI.fromBufferAttribute(n, I), T.normal = $N.getInterpolation(ii, le, he, de, MI, DI, tI, new Y()), T.normal.dot(t.direction) > 0 && T.normal.multiplyScalar(-1));
    const u = {
      a: A,
      b: z,
      c: I,
      normal: new Y(),
      materialIndex: 0
    };
    $N.getNormal(le, he, de, u.normal), T.face = u;
  }
  return T;
}
function tu() {
  let i = null, M = !1, D = null, t = null;
  function e(N, n) {
    D(N, n), t = i.requestAnimationFrame(e);
  }
  return {
    start: function() {
      M !== !0 && D !== null && (t = i.requestAnimationFrame(e), M = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(t), M = !1;
    },
    setAnimationLoop: function(N) {
      D = N;
    },
    setContext: function(N) {
      i = N;
    }
  };
}
function ds(i, M) {
  const D = M.isWebGL2, t = /* @__PURE__ */ new WeakMap();
  function e(I, T) {
    const u = I.array, g = I.usage, s = i.createBuffer();
    i.bindBuffer(T, s), i.bufferData(T, u, g), I.onUploadCallback();
    let a;
    if (u instanceof Float32Array)
      a = 5126;
    else if (u instanceof Uint16Array)
      if (I.isFloat16BufferAttribute)
        if (D)
          a = 5131;
        else
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else
        a = 5123;
    else if (u instanceof Int16Array)
      a = 5122;
    else if (u instanceof Uint32Array)
      a = 5125;
    else if (u instanceof Int32Array)
      a = 5124;
    else if (u instanceof Int8Array)
      a = 5120;
    else if (u instanceof Uint8Array)
      a = 5121;
    else if (u instanceof Uint8ClampedArray)
      a = 5121;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + u);
    return {
      buffer: s,
      type: a,
      bytesPerElement: u.BYTES_PER_ELEMENT,
      version: I.version
    };
  }
  function N(I, T, u) {
    const g = T.array, s = T.updateRange;
    i.bindBuffer(u, I), s.count === -1 ? i.bufferSubData(u, 0, g) : (D ? i.bufferSubData(
      u,
      s.offset * g.BYTES_PER_ELEMENT,
      g,
      s.offset,
      s.count
    ) : i.bufferSubData(
      u,
      s.offset * g.BYTES_PER_ELEMENT,
      g.subarray(s.offset, s.offset + s.count)
    ), s.count = -1), T.onUploadCallback();
  }
  function n(I) {
    return I.isInterleavedBufferAttribute && (I = I.data), t.get(I);
  }
  function A(I) {
    I.isInterleavedBufferAttribute && (I = I.data);
    const T = t.get(I);
    T && (i.deleteBuffer(T.buffer), t.delete(I));
  }
  function z(I, T) {
    if (I.isGLBufferAttribute) {
      const g = t.get(I);
      (!g || g.version < I.version) && t.set(I, {
        buffer: I.buffer,
        type: I.type,
        bytesPerElement: I.elementSize,
        version: I.version
      });
      return;
    }
    I.isInterleavedBufferAttribute && (I = I.data);
    const u = t.get(I);
    u === void 0 ? t.set(I, e(I, T)) : u.version < I.version && (N(u.buffer, I, T), u.version = I.version);
  }
  return {
    get: n,
    remove: A,
    update: z
  };
}
class kN extends AN {
  constructor(M = 1, D = 1, t = 1, e = 1, N = 1, n = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: M,
      height: D,
      depth: t,
      widthSegments: e,
      heightSegments: N,
      depthSegments: n
    };
    const A = this;
    e = Math.floor(e), N = Math.floor(N), n = Math.floor(n);
    const z = [], I = [], T = [], u = [];
    let g = 0, s = 0;
    a("z", "y", "x", -1, -1, t, D, M, n, N, 0), a("z", "y", "x", 1, -1, t, D, -M, n, N, 1), a("x", "z", "y", 1, 1, M, t, D, e, n, 2), a("x", "z", "y", 1, -1, M, t, -D, e, n, 3), a("x", "y", "z", 1, -1, M, D, t, e, N, 4), a("x", "y", "z", -1, -1, M, D, -t, e, N, 5), this.setIndex(z), this.setAttribute("position", new At(I, 3)), this.setAttribute("normal", new At(T, 3)), this.setAttribute("uv", new At(u, 2));
    function a(o, c, r, w, y, j, l, d, h, S, L) {
      const O = j / h, K = l / S, F = j / 2, G = l / 2, p = d / 2, k = h + 1, B = S + 1;
      let R = 0, $ = 0;
      const H = new Y();
      for (let V = 0; V < B; V++) {
        const U = V * K - G;
        for (let b = 0; b < k; b++) {
          const nM = b * O - F;
          H[o] = nM * w, H[c] = U * y, H[r] = p, I.push(H.x, H.y, H.z), H[o] = 0, H[c] = 0, H[r] = d > 0 ? 1 : -1, T.push(H.x, H.y, H.z), u.push(b / h), u.push(1 - V / S), R += 1;
        }
      }
      for (let V = 0; V < S; V++)
        for (let U = 0; U < h; U++) {
          const b = g + U + k * V, nM = g + U + k * (V + 1), zM = g + (U + 1) + k * (V + 1), gM = g + (U + 1) + k * V;
          z.push(b, nM, gM), z.push(nM, zM, gM), $ += 6;
        }
      A.addGroup(s, $, L), s += $, g += R;
    }
  }
  copy(M) {
    return super.copy(M), this.parameters = Object.assign({}, M.parameters), this;
  }
  static fromJSON(M) {
    return new kN(M.width, M.height, M.depth, M.widthSegments, M.heightSegments, M.depthSegments);
  }
}
class _n extends AN {
  constructor(M = 1, D = 1, t = 1, e = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: M,
      height: D,
      widthSegments: t,
      heightSegments: e
    };
    const N = M / 2, n = D / 2, A = Math.floor(t), z = Math.floor(e), I = A + 1, T = z + 1, u = M / A, g = D / z, s = [], a = [], o = [], c = [];
    for (let r = 0; r < T; r++) {
      const w = r * g - n;
      for (let y = 0; y < I; y++) {
        const j = y * u - N;
        a.push(j, -w, 0), o.push(0, 0, 1), c.push(y / A), c.push(1 - r / z);
      }
    }
    for (let r = 0; r < z; r++)
      for (let w = 0; w < A; w++) {
        const y = w + I * r, j = w + I * (r + 1), l = w + 1 + I * (r + 1), d = w + 1 + I * r;
        s.push(y, j, d), s.push(j, l, d);
      }
    this.setIndex(s), this.setAttribute("position", new At(a, 3)), this.setAttribute("normal", new At(o, 3)), this.setAttribute("uv", new At(c, 2));
  }
  copy(M) {
    return super.copy(M), this.parameters = Object.assign({}, M.parameters), this;
  }
  static fromJSON(M) {
    return new _n(M.width, M.height, M.widthSegments, M.heightSegments);
  }
}
function DN(i) {
  const M = {};
  for (const D in i) {
    M[D] = {};
    for (const t in i[D]) {
      const e = i[D][t];
      e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion) ? e.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), M[D][t] = null) : M[D][t] = e.clone() : Array.isArray(e) ? M[D][t] = e.slice() : M[D][t] = e;
    }
  }
  return M;
}
function LD(i) {
  const M = {};
  for (let D = 0; D < i.length; D++) {
    const t = DN(i[D]);
    for (const e in t)
      M[e] = t[e];
  }
  return M;
}
function vs(i) {
  const M = [];
  for (let D = 0; D < i.length; D++)
    M.push(i[D].clone());
  return M;
}
function eu(i) {
  return i.getRenderTarget() === null ? i.outputColorSpace : RM.workingColorSpace;
}
const ps = { clone: DN, merge: LD }, Ys = (
  /* glsl */
  "void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}"
), Us = (
  /* glsl */
  "void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}"
);
class ue extends QN {
  constructor(M) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Ys, this.fragmentShader = Us, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      derivatives: !1,
      // set to use derivatives
      fragDepth: !1,
      // set to use fragment depth values
      drawBuffers: !1,
      // set to use draw buffers
      shaderTextureLOD: !1
      // set to use shader texture LOD
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, M !== void 0 && this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.fragmentShader = M.fragmentShader, this.vertexShader = M.vertexShader, this.uniforms = DN(M.uniforms), this.uniformsGroups = vs(M.uniformsGroups), this.defines = Object.assign({}, M.defines), this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.fog = M.fog, this.lights = M.lights, this.clipping = M.clipping, this.extensions = Object.assign({}, M.extensions), this.glslVersion = M.glslVersion, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    D.glslVersion = this.glslVersion, D.uniforms = {};
    for (const e in this.uniforms) {
      const n = this.uniforms[e].value;
      n && n.isTexture ? D.uniforms[e] = {
        type: "t",
        value: n.toJSON(M).uuid
      } : n && n.isColor ? D.uniforms[e] = {
        type: "c",
        value: n.getHex()
      } : n && n.isVector2 ? D.uniforms[e] = {
        type: "v2",
        value: n.toArray()
      } : n && n.isVector3 ? D.uniforms[e] = {
        type: "v3",
        value: n.toArray()
      } : n && n.isVector4 ? D.uniforms[e] = {
        type: "v4",
        value: n.toArray()
      } : n && n.isMatrix3 ? D.uniforms[e] = {
        type: "m3",
        value: n.toArray()
      } : n && n.isMatrix4 ? D.uniforms[e] = {
        type: "m4",
        value: n.toArray()
      } : D.uniforms[e] = {
        value: n
      };
    }
    Object.keys(this.defines).length > 0 && (D.defines = this.defines), D.vertexShader = this.vertexShader, D.fragmentShader = this.fragmentShader, D.lights = this.lights, D.clipping = this.clipping;
    const t = {};
    for (const e in this.extensions)
      this.extensions[e] === !0 && (t[e] = !0);
    return Object.keys(t).length > 0 && (D.extensions = t), D;
  }
}
const fs = (
  /* glsl */
  `#ifdef USE_ALPHAHASH
if(diffuseColor.a<getAlphaHashThreshold(vPosition))discard;
#endif`
), ms = (
  /* glsl */
  `#ifdef USE_ALPHAHASH
const float ALPHA_HASH_SCALE=0.05;float hash2D(vec2 value){return fract(1.0e4*sin(17.0*value.x+0.1*value.y)*(0.1+abs(sin(13.0*value.y+value.x))));}float hash3D(vec3 value){return hash2D(vec2(hash2D(value.xy),value.z));}float getAlphaHashThreshold(vec3 position){float maxDeriv=max(length(dFdx(position.xyz)),length(dFdy(position.xyz)));float pixScale=1.0/(ALPHA_HASH_SCALE*maxDeriv);vec2 pixScales=vec2(exp2(floor(log2(pixScale))),exp2(ceil(log2(pixScale))));vec2 alpha=vec2(hash3D(floor(pixScales.x*position.xyz)),hash3D(floor(pixScales.y*position.xyz)));float lerpFactor=fract(log2(pixScale));float x=(1.0-lerpFactor)*alpha.x+lerpFactor*alpha.y;float a=min(lerpFactor,1.0-lerpFactor);vec3 cases=vec3(x*x/(2.0*a*(1.0-a)),(x-0.5*a)/(1.0-a),1.0-((1.0-x)*(1.0-x)/(2.0*a*(1.0-a))));float threshold=(x<(1.0-a))?((x<a)?cases.x:cases.y):cases.z;return clamp(threshold,1.0e-6,1.0);}
#endif`
), Qs = (
  /* glsl */
  `#ifdef USE_ALPHAMAP
diffuseColor.a*=texture2D(alphaMap,vAlphaMapUv).g;
#endif`
), ks = (
  /* glsl */
  `#ifdef USE_ALPHAMAP
uniform sampler2D alphaMap;
#endif`
), Ss = (
  /* glsl */
  `#ifdef USE_ALPHATEST
if(diffuseColor.a<alphaTest)discard;
#endif`
), Zs = (
  /* glsl */
  `#ifdef USE_ALPHATEST
uniform float alphaTest;
#endif`
), _s = (
  /* glsl */
  `#ifdef USE_AOMAP
float ambientOcclusion=(texture2D(aoMap,vAoMapUv).r-1.0)*aoMapIntensity+1.0;reflectedLight.indirectDiffuse*=ambientOcclusion;
#if defined(USE_ENVMAP)&&defined(STANDARD)
float dotNV=saturate(dot(geometryNormal,geometryViewDir));reflectedLight.indirectSpecular*=computeSpecularOcclusion(dotNV,ambientOcclusion,material.roughness);
#endif
#endif`
), bs = (
  /* glsl */
  `#ifdef USE_AOMAP
uniform sampler2D aoMap;uniform float aoMapIntensity;
#endif`
), Ks = (
  /* glsl */
  `vec3 transformed=vec3(position);
#ifdef USE_ALPHAHASH
vPosition=vec3(position);
#endif`
), Ps = (
  /* glsl */
  `vec3 objectNormal=vec3(normal);
#ifdef USE_TANGENT
vec3 objectTangent=vec3(tangent.xyz);
#endif`
), Rs = (
  /* glsl */
  "float G_BlinnPhong_Implicit(){return 0.25;}float D_BlinnPhong(const in float shininess,const in float dotNH){return RECIPROCAL_PI*(shininess*0.5+1.0)*pow(dotNH,shininess);}vec3 BRDF_BlinnPhong(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float shininess){vec3 halfDir=normalize(lightDir+viewDir);float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(specularColor,1.0,dotVH);float G=G_BlinnPhong_Implicit();float D=D_BlinnPhong(shininess,dotNH);return F*(G*D);}"
), Fs = (
  /* glsl */
  `#ifdef USE_IRIDESCENCE
const mat3 XYZ_TO_REC709=mat3(3.2404542,-0.9692660,0.0556434,-1.5371385,1.8760108,-0.2040259,-0.4985314,0.0415560,1.0572252);vec3 Fresnel0ToIor(vec3 fresnel0){vec3 sqrtF0=sqrt(fresnel0);return(vec3(1.0)+sqrtF0)/(vec3(1.0)-sqrtF0);}vec3 IorToFresnel0(vec3 transmittedIor,float incidentIor){return pow2((transmittedIor-vec3(incidentIor))/(transmittedIor+vec3(incidentIor)));}float IorToFresnel0(float transmittedIor,float incidentIor){return pow2((transmittedIor-incidentIor)/(transmittedIor+incidentIor));}vec3 evalSensitivity(float OPD,vec3 shift){float phase=2.0*PI*OPD*1.0e-9;vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);vec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-pow2(phase)*var);xyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*pow2(phase));xyz/=1.0685e-7;vec3 rgb=XYZ_TO_REC709*xyz;return rgb;}vec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0){vec3 I;float iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));float sinTheta2Sq=pow2(outsideIOR/iridescenceIOR)*(1.0-pow2(cosTheta1));float cosTheta2Sq=1.0-sinTheta2Sq;if(cosTheta2Sq<0.0){return vec3(1.0);}float cosTheta2=sqrt(cosTheta2Sq);float R0=IorToFresnel0(iridescenceIOR,outsideIOR);float R12=F_Schlick(R0,1.0,cosTheta1);float T121=1.0-R12;float phi12=0.0;if(iridescenceIOR<outsideIOR)phi12=PI;float phi21=PI-phi12;vec3 baseIOR=Fresnel0ToIor(clamp(baseF0,0.0,0.9999));vec3 R1=IorToFresnel0(baseIOR,iridescenceIOR);vec3 R23=F_Schlick(R1,1.0,cosTheta2);vec3 phi23=vec3(0.0);if(baseIOR[0]<iridescenceIOR)phi23[0]=PI;if(baseIOR[1]<iridescenceIOR)phi23[1]=PI;if(baseIOR[2]<iridescenceIOR)phi23[2]=PI;float OPD=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;vec3 phi=vec3(phi21)+phi23;vec3 R123=clamp(R12*R23,1e-5,0.9999);vec3 r123=sqrt(R123);vec3 Rs=pow2(T121)*R23/(vec3(1.0)-R123);vec3 C0=R12+Rs;I=C0;vec3 Cm=Rs-T121;for(int m=1;m<=2;++m){Cm*=r123;vec3 Sm=2.0*evalSensitivity(float(m)*OPD,float(m)*phi);I+=Cm*Sm;}return max(I,vec3(0.0));}
#endif`
), Bs = (
  /* glsl */
  `#ifdef USE_BUMPMAP
uniform sampler2D bumpMap;uniform float bumpScale;vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(vBumpMapUv);vec2 dSTdy=dFdy(vBumpMapUv);float Hll=bumpScale*texture2D(bumpMap,vBumpMapUv).x;float dBx=bumpScale*texture2D(bumpMap,vBumpMapUv+dSTdx).x-Hll;float dBy=bumpScale*texture2D(bumpMap,vBumpMapUv+dSTdy).x-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=dFdx(surf_pos.xyz);vec3 vSigmaY=dFdy(surf_pos.xyz);vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}
#endif`
), Vs = (
  /* glsl */
  `#if NUM_CLIPPING_PLANES>0
vec4 plane;
#pragma unroll_loop_start
for(int i=0;i<UNION_CLIPPING_PLANES;i++){plane=clippingPlanes[i];if(dot(vClipPosition,plane.xyz)>plane.w)discard;}
#pragma unroll_loop_end
#if UNION_CLIPPING_PLANES<NUM_CLIPPING_PLANES
bool clipped=true;
#pragma unroll_loop_start
for(int i=UNION_CLIPPING_PLANES;i<NUM_CLIPPING_PLANES;i++){plane=clippingPlanes[i];clipped=(dot(vClipPosition,plane.xyz)>plane.w)&&clipped;}
#pragma unroll_loop_end
if(clipped)discard;
#endif
#endif`
), Gs = (
  /* glsl */
  `#if NUM_CLIPPING_PLANES>0
varying vec3 vClipPosition;uniform vec4 clippingPlanes[NUM_CLIPPING_PLANES];
#endif`
), Hs = (
  /* glsl */
  `#if NUM_CLIPPING_PLANES>0
varying vec3 vClipPosition;
#endif`
), Ws = (
  /* glsl */
  `#if NUM_CLIPPING_PLANES>0
vClipPosition=-mvPosition.xyz;
#endif`
), qs = (
  /* glsl */
  `#if defined(USE_COLOR_ALPHA)
diffuseColor*=vColor;
#elif defined(USE_COLOR)
diffuseColor.rgb*=vColor;
#endif`
), Xs = (
  /* glsl */
  `#if defined(USE_COLOR_ALPHA)
varying vec4 vColor;
#elif defined(USE_COLOR)
varying vec3 vColor;
#endif`
), $s = (
  /* glsl */
  `#if defined(USE_COLOR_ALPHA)
varying vec4 vColor;
#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)
varying vec3 vColor;
#endif`
), Js = (
  /* glsl */
  `#if defined(USE_COLOR_ALPHA)
vColor=vec4(1.0);
#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)
vColor=vec3(1.0);
#endif
#ifdef USE_COLOR
vColor*=color;
#endif
#ifdef USE_INSTANCING_COLOR
vColor.xyz*=instanceColor.xyz;
#endif`
), Mr = (
  /* glsl */
  `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a)clamp(a,0.0,1.0)
#endif
#define whiteComplement(a)(1.0-saturate(a))
float pow2(const in float x){return x*x;}vec3 pow2(const in vec3 x){return x*x;}float pow3(const in float x){return x*x*x;}float pow4(const in float x){float x2=x*x;return x2*x2;}float max3(const in vec3 v){return max(max(v.x,v.y),v.z);}float average(const in vec3 v){return dot(v,vec3(0.3333333));}highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}
#ifdef HIGH_PRECISION
float precisionSafeLength(vec3 v){return length(v);}
#else
float precisionSafeLength(vec3 v){float maxComponent=max3(abs(v));return length(v/maxComponent)*maxComponent;}
#endif
struct IncidentLight{vec3 color;vec3 direction;bool visible;};struct ReflectedLight{vec3 directDiffuse;vec3 directSpecular;vec3 indirectDiffuse;vec3 indirectSpecular;};
#ifdef USE_ALPHAHASH
varying vec3 vPosition;
#endif
vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}mat3 transposeMat3(const in mat3 m){mat3 tmp;tmp[0]=vec3(m[0].x,m[1].x,m[2].x);tmp[1]=vec3(m[0].y,m[1].y,m[2].y);tmp[2]=vec3(m[0].z,m[1].z,m[2].z);return tmp;}float luminance(const in vec3 rgb){const vec3 weights=vec3(0.2126729,0.7151522,0.0721750);return dot(weights,rgb);}bool isPerspectiveMatrix(mat4 m){return m[2][3]==-1.0;}vec2 equirectUv(in vec3 dir){float u=atan(dir.z,dir.x)*RECIPROCAL_PI2+0.5;float v=asin(clamp(dir.y,-1.0,1.0))*RECIPROCAL_PI+0.5;return vec2(u,v);}vec3 BRDF_Lambert(const in vec3 diffuseColor){return RECIPROCAL_PI*diffuseColor;}vec3 F_Schlick(const in vec3 f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}float F_Schlick(const in float f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}`
), Dr = (
  /* glsl */
  `#ifdef ENVMAP_TYPE_CUBE_UV
#define cubeUV_minMipLevel 4.0
#define cubeUV_minTileSize 16.0
float getFace(vec3 direction){vec3 absDirection=abs(direction);float face=-1.0;if(absDirection.x>absDirection.z){if(absDirection.x>absDirection.y)face=direction.x>0.0?0.0:3.0;else face=direction.y>0.0?1.0:4.0;}else{if(absDirection.z>absDirection.y)face=direction.z>0.0?2.0:5.0;else face=direction.y>0.0?1.0:4.0;}return face;}vec2 getUV(vec3 direction,float face){vec2 uv;if(face==0.0){uv=vec2(direction.z,direction.y)/abs(direction.x);}else if(face==1.0){uv=vec2(-direction.x,-direction.z)/abs(direction.y);}else if(face==2.0){uv=vec2(-direction.x,direction.y)/abs(direction.z);}else if(face==3.0){uv=vec2(-direction.z,direction.y)/abs(direction.x);}else if(face==4.0){uv=vec2(-direction.x,direction.z)/abs(direction.y);}else{uv=vec2(direction.x,direction.y)/abs(direction.z);}return 0.5*(uv+1.0);}vec3 bilinearCubeUV(sampler2D envMap,vec3 direction,float mipInt){float face=getFace(direction);float filterInt=max(cubeUV_minMipLevel-mipInt,0.0);mipInt=max(mipInt,cubeUV_minMipLevel);float faceSize=exp2(mipInt);highp vec2 uv=getUV(direction,face)*(faceSize-2.0)+1.0;if(face>2.0){uv.y+=faceSize;face-=3.0;}uv.x+=face*faceSize;uv.x+=filterInt*3.0*cubeUV_minTileSize;uv.y+=4.0*(exp2(CUBEUV_MAX_MIP)-faceSize);uv.x*=CUBEUV_TEXEL_WIDTH;uv.y*=CUBEUV_TEXEL_HEIGHT;
#ifdef texture2DGradEXT
return texture2DGradEXT(envMap,uv,vec2(0.0),vec2(0.0)).rgb;
#else
return texture2D(envMap,uv).rgb;
#endif
}
#define cubeUV_r0 1.0
#define cubeUV_v0 0.339
#define cubeUV_m0-2.0
#define cubeUV_r1 0.8
#define cubeUV_v1 0.276
#define cubeUV_m1-1.0
#define cubeUV_r4 0.4
#define cubeUV_v4 0.046
#define cubeUV_m4 2.0
#define cubeUV_r5 0.305
#define cubeUV_v5 0.016
#define cubeUV_m5 3.0
#define cubeUV_r6 0.21
#define cubeUV_v6 0.0038
#define cubeUV_m6 4.0
float roughnessToMip(float roughness){float mip=0.0;if(roughness>=cubeUV_r1){mip=(cubeUV_r0-roughness)*(cubeUV_m1-cubeUV_m0)/(cubeUV_r0-cubeUV_r1)+cubeUV_m0;}else if(roughness>=cubeUV_r4){mip=(cubeUV_r1-roughness)*(cubeUV_m4-cubeUV_m1)/(cubeUV_r1-cubeUV_r4)+cubeUV_m1;}else if(roughness>=cubeUV_r5){mip=(cubeUV_r4-roughness)*(cubeUV_m5-cubeUV_m4)/(cubeUV_r4-cubeUV_r5)+cubeUV_m4;}else if(roughness>=cubeUV_r6){mip=(cubeUV_r5-roughness)*(cubeUV_m6-cubeUV_m5)/(cubeUV_r5-cubeUV_r6)+cubeUV_m5;}else{mip=-2.0*log2(1.16*roughness);}return mip;}vec4 textureCubeUV(sampler2D envMap,vec3 sampleDir,float roughness){float mip=clamp(roughnessToMip(roughness),cubeUV_m0,CUBEUV_MAX_MIP);float mipF=fract(mip);float mipInt=floor(mip);vec3 color0=bilinearCubeUV(envMap,sampleDir,mipInt);if(mipF==0.0){return vec4(color0,1.0);}else{vec3 color1=bilinearCubeUV(envMap,sampleDir,mipInt+1.0);return vec4(mix(color0,color1,mipF),1.0);}}
#endif`
), tr = (
  /* glsl */
  `vec3 transformedNormal=objectNormal;
#ifdef USE_INSTANCING
mat3 m=mat3(instanceMatrix);transformedNormal/=vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2]));transformedNormal=m*transformedNormal;
#endif
transformedNormal=normalMatrix*transformedNormal;
#ifdef FLIP_SIDED
transformedNormal=-transformedNormal;
#endif
#ifdef USE_TANGENT
vec3 transformedTangent=(modelViewMatrix*vec4(objectTangent,0.0)).xyz;
#ifdef FLIP_SIDED
transformedTangent=-transformedTangent;
#endif
#endif`
), er = (
  /* glsl */
  `#ifdef USE_DISPLACEMENTMAP
uniform sampler2D displacementMap;uniform float displacementScale;uniform float displacementBias;
#endif`
), Nr = (
  /* glsl */
  `#ifdef USE_DISPLACEMENTMAP
transformed+=normalize(objectNormal)*(texture2D(displacementMap,vDisplacementMapUv).x*displacementScale+displacementBias);
#endif`
), ir = (
  /* glsl */
  `#ifdef USE_EMISSIVEMAP
vec4 emissiveColor=texture2D(emissiveMap,vEmissiveMapUv);totalEmissiveRadiance*=emissiveColor.rgb;
#endif`
), Ar = (
  /* glsl */
  `#ifdef USE_EMISSIVEMAP
uniform sampler2D emissiveMap;
#endif`
), nr = (
  /* glsl */
  "gl_FragColor=linearToOutputTexel(gl_FragColor);"
), zr = (
  /* glsl */
  "const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3=mat3(vec3(0.8224621,0.177538,0.0),vec3(0.0331941,0.9668058,0.0),vec3(0.0170827,0.0723974,0.9105199));const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB=mat3(vec3(1.2249401,-0.2249404,0.0),vec3(-0.0420569,1.0420571,0.0),vec3(-0.0196376,-0.0786361,1.0982735));vec4 LinearSRGBToLinearDisplayP3(in vec4 value){return vec4(value.rgb*LINEAR_SRGB_TO_LINEAR_DISPLAY_P3,value.a);}vec4 LinearDisplayP3ToLinearSRGB(in vec4 value){return vec4(value.rgb*LINEAR_DISPLAY_P3_TO_LINEAR_SRGB,value.a);}vec4 LinearTransferOETF(in vec4 value){return value;}vec4 sRGBTransferOETF(in vec4 value){return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);}vec4 LinearToLinear(in vec4 value){return value;}vec4 LinearTosRGB(in vec4 value){return sRGBTransferOETF(value);}"
), Ir = (
  /* glsl */
  `#ifdef USE_ENVMAP
#ifdef ENV_WORLDPOS
vec3 cameraToFrag;if(isOrthographic){cameraToFrag=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToFrag=normalize(vWorldPosition-cameraPosition);}vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);
#ifdef ENVMAP_MODE_REFLECTION
vec3 reflectVec=reflect(cameraToFrag,worldNormal);
#else
vec3 reflectVec=refract(cameraToFrag,worldNormal,refractionRatio);
#endif
#else
vec3 reflectVec=vReflect;
#endif
#ifdef ENVMAP_TYPE_CUBE
vec4 envColor=textureCube(envMap,vec3(flipEnvMap*reflectVec.x,reflectVec.yz));
#else
vec4 envColor=vec4(0.0);
#endif
#ifdef ENVMAP_BLENDING_MULTIPLY
outgoingLight=mix(outgoingLight,outgoingLight*envColor.xyz,specularStrength*reflectivity);
#elif defined(ENVMAP_BLENDING_MIX)
outgoingLight=mix(outgoingLight,envColor.xyz,specularStrength*reflectivity);
#elif defined(ENVMAP_BLENDING_ADD)
outgoingLight+=envColor.xyz*specularStrength*reflectivity;
#endif
#endif`
), Tr = (
  /* glsl */
  `#ifdef USE_ENVMAP
uniform float envMapIntensity;uniform float flipEnvMap;
#ifdef ENVMAP_TYPE_CUBE
uniform samplerCube envMap;
#else
uniform sampler2D envMap;
#endif
#endif`
), ur = (
  /* glsl */
  `#ifdef USE_ENVMAP
uniform float reflectivity;
#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)||defined(LAMBERT)
#define ENV_WORLDPOS
#endif
#ifdef ENV_WORLDPOS
varying vec3 vWorldPosition;uniform float refractionRatio;
#else
varying vec3 vReflect;
#endif
#endif`
), gr = (
  /* glsl */
  `#ifdef USE_ENVMAP
#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)||defined(LAMBERT)
#define ENV_WORLDPOS
#endif
#ifdef ENV_WORLDPOS
varying vec3 vWorldPosition;
#else
varying vec3 vReflect;uniform float refractionRatio;
#endif
#endif`
), sr = (
  /* glsl */
  `#ifdef USE_ENVMAP
#ifdef ENV_WORLDPOS
vWorldPosition=worldPosition.xyz;
#else
vec3 cameraToVertex;if(isOrthographic){cameraToVertex=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToVertex=normalize(worldPosition.xyz-cameraPosition);}vec3 worldNormal=inverseTransformDirection(transformedNormal,viewMatrix);
#ifdef ENVMAP_MODE_REFLECTION
vReflect=reflect(cameraToVertex,worldNormal);
#else
vReflect=refract(cameraToVertex,worldNormal,refractionRatio);
#endif
#endif
#endif`
), rr = (
  /* glsl */
  `#ifdef USE_FOG
vFogDepth=-mvPosition.z;
#endif`
), cr = (
  /* glsl */
  `#ifdef USE_FOG
varying float vFogDepth;
#endif`
), ar = (
  /* glsl */
  `#ifdef USE_FOG
#ifdef FOG_EXP2
float fogFactor=1.0-exp(-fogDensity*fogDensity*vFogDepth*vFogDepth);
#else
float fogFactor=smoothstep(fogNear,fogFar,vFogDepth);
#endif
gl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,fogFactor);
#endif`
), or = (
  /* glsl */
  `#ifdef USE_FOG
uniform vec3 fogColor;varying float vFogDepth;
#ifdef FOG_EXP2
uniform float fogDensity;
#else
uniform float fogNear;uniform float fogFar;
#endif
#endif`
), yr = (
  /* glsl */
  `#ifdef USE_GRADIENTMAP
uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance(vec3 normal,vec3 lightDirection){float dotNL=dot(normal,lightDirection);vec2 coord=vec2(dotNL*0.5+0.5,0.0);
#ifdef USE_GRADIENTMAP
return vec3(texture2D(gradientMap,coord).r);
#else
vec2 fw=fwidth(coord)*0.5;return mix(vec3(0.7),vec3(1.0),smoothstep(0.7-fw.x,0.7+fw.x,coord.x));
#endif
}`
), jr = (
  /* glsl */
  `#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vLightMapUv);vec3 lightMapIrradiance=lightMapTexel.rgb*lightMapIntensity;reflectedLight.indirectDiffuse+=lightMapIrradiance;
#endif`
), Cr = (
  /* glsl */
  `#ifdef USE_LIGHTMAP
uniform sampler2D lightMap;uniform float lightMapIntensity;
#endif`
), Lr = (
  /* glsl */
  "LambertMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularStrength=specularStrength;"
), wr = (
  /* glsl */
  `varying vec3 vViewPosition;struct LambertMaterial{vec3 diffuseColor;float specularStrength;};void RE_Direct_Lambert(const in IncidentLight directLight,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in LambertMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometryNormal,directLight.direction));vec3 irradiance=dotNL*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Lambert(const in vec3 irradiance,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in LambertMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}
#define RE_Direct RE_Direct_Lambert
#define RE_IndirectDiffuse RE_IndirectDiffuse_Lambert`
), xr = (
  /* glsl */
  `uniform bool receiveShadow;uniform vec3 ambientLightColor;
#if defined(USE_LIGHT_PROBES)
uniform vec3 lightProbe[9];
#endif
vec3 shGetIrradianceAt(in vec3 normal,in vec3 shCoefficients[9]){float x=normal.x,y=normal.y,z=normal.z;vec3 result=shCoefficients[0]*0.886227;result+=shCoefficients[1]*2.0*0.511664*y;result+=shCoefficients[2]*2.0*0.511664*z;result+=shCoefficients[3]*2.0*0.511664*x;result+=shCoefficients[4]*2.0*0.429043*x*y;result+=shCoefficients[5]*2.0*0.429043*y*z;result+=shCoefficients[6]*(0.743125*z*z-0.247708);result+=shCoefficients[7]*2.0*0.429043*x*z;result+=shCoefficients[8]*0.429043*(x*x-y*y);return result;}vec3 getLightProbeIrradiance(const in vec3 lightProbe[9],const in vec3 normal){vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec3 irradiance=shGetIrradianceAt(worldNormal,lightProbe);return irradiance;}vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){vec3 irradiance=ambientLightColor;return irradiance;}float getDistanceAttenuation(const in float lightDistance,const in float cutoffDistance,const in float decayExponent){
#if defined(LEGACY_LIGHTS)
if(cutoffDistance>0.0&&decayExponent>0.0){return pow(saturate(-lightDistance/cutoffDistance+1.0),decayExponent);}return 1.0;
#else
float distanceFalloff=1.0/max(pow(lightDistance,decayExponent),0.01);if(cutoffDistance>0.0){distanceFalloff*=pow2(saturate(1.0-pow4(lightDistance/cutoffDistance)));}return distanceFalloff;
#endif
}float getSpotAttenuation(const in float coneCosine,const in float penumbraCosine,const in float angleCosine){return smoothstep(coneCosine,penumbraCosine,angleCosine);}
#if NUM_DIR_LIGHTS>0
struct DirectionalLight{vec3 direction;vec3 color;};uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];void getDirectionalLightInfo(const in DirectionalLight directionalLight,out IncidentLight light){light.color=directionalLight.color;light.direction=directionalLight.direction;light.visible=true;}
#endif
#if NUM_POINT_LIGHTS>0
struct PointLight{vec3 position;vec3 color;float distance;float decay;};uniform PointLight pointLights[NUM_POINT_LIGHTS];void getPointLightInfo(const in PointLight pointLight,const in vec3 geometryPosition,out IncidentLight light){vec3 lVector=pointLight.position-geometryPosition;light.direction=normalize(lVector);float lightDistance=length(lVector);light.color=pointLight.color;light.color*=getDistanceAttenuation(lightDistance,pointLight.distance,pointLight.decay);light.visible=(light.color!=vec3(0.0));}
#endif
#if NUM_SPOT_LIGHTS>0
struct SpotLight{vec3 position;vec3 direction;vec3 color;float distance;float decay;float coneCos;float penumbraCos;};uniform SpotLight spotLights[NUM_SPOT_LIGHTS];void getSpotLightInfo(const in SpotLight spotLight,const in vec3 geometryPosition,out IncidentLight light){vec3 lVector=spotLight.position-geometryPosition;light.direction=normalize(lVector);float angleCos=dot(light.direction,spotLight.direction);float spotAttenuation=getSpotAttenuation(spotLight.coneCos,spotLight.penumbraCos,angleCos);if(spotAttenuation>0.0){float lightDistance=length(lVector);light.color=spotLight.color*spotAttenuation;light.color*=getDistanceAttenuation(lightDistance,spotLight.distance,spotLight.decay);light.visible=(light.color!=vec3(0.0));}else{light.color=vec3(0.0);light.visible=false;}}
#endif
#if NUM_RECT_AREA_LIGHTS>0
struct RectAreaLight{vec3 color;vec3 position;vec3 halfWidth;vec3 halfHeight;};uniform sampler2D ltc_1;uniform sampler2D ltc_2;uniform RectAreaLight rectAreaLights[NUM_RECT_AREA_LIGHTS];
#endif
#if NUM_HEMI_LIGHTS>0
struct HemisphereLight{vec3 direction;vec3 skyColor;vec3 groundColor;};uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];vec3 getHemisphereLightIrradiance(const in HemisphereLight hemiLight,const in vec3 normal){float dotNL=dot(normal,hemiLight.direction);float hemiDiffuseWeight=0.5*dotNL+0.5;vec3 irradiance=mix(hemiLight.groundColor,hemiLight.skyColor,hemiDiffuseWeight);return irradiance;}
#endif`
), Or = (
  /* glsl */
  `#ifdef USE_ENVMAP
vec3 getIBLIrradiance(const in vec3 normal){
#ifdef ENVMAP_TYPE_CUBE_UV
vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,worldNormal,1.0);return PI*envMapColor.rgb*envMapIntensity;
#else
return vec3(0.0);
#endif
}vec3 getIBLRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness){
#ifdef ENVMAP_TYPE_CUBE_UV
vec3 reflectVec=reflect(-viewDir,normal);reflectVec=normalize(mix(reflectVec,normal,roughness*roughness));reflectVec=inverseTransformDirection(reflectVec,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,reflectVec,roughness);return envMapColor.rgb*envMapIntensity;
#else
return vec3(0.0);
#endif
}
#ifdef USE_ANISOTROPY
vec3 getIBLAnisotropyRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness,const in vec3 bitangent,const in float anisotropy){
#ifdef ENVMAP_TYPE_CUBE_UV
vec3 bentNormal=cross(bitangent,viewDir);bentNormal=normalize(cross(bentNormal,bitangent));bentNormal=normalize(mix(bentNormal,normal,pow2(pow2(1.0-anisotropy*(1.0-roughness)))));return getIBLRadiance(viewDir,bentNormal,roughness);
#else
return vec3(0.0);
#endif
}
#endif
#endif`
), Er = (
  /* glsl */
  "ToonMaterial material;material.diffuseColor=diffuseColor.rgb;"
), lr = (
  /* glsl */
  `varying vec3 vViewPosition;struct ToonMaterial{vec3 diffuseColor;};void RE_Direct_Toon(const in IncidentLight directLight,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in ToonMaterial material,inout ReflectedLight reflectedLight){vec3 irradiance=getGradientIrradiance(geometryNormal,directLight.direction)*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Toon(const in vec3 irradiance,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in ToonMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}
#define RE_Direct RE_Direct_Toon
#define RE_IndirectDiffuse RE_IndirectDiffuse_Toon`
), hr = (
  /* glsl */
  "BlinnPhongMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularColor=specular;material.specularShininess=shininess;material.specularStrength=specularStrength;"
), dr = (
  /* glsl */
  `varying vec3 vViewPosition;struct BlinnPhongMaterial{vec3 diffuseColor;vec3 specularColor;float specularShininess;float specularStrength;};void RE_Direct_BlinnPhong(const in IncidentLight directLight,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometryNormal,directLight.direction));vec3 irradiance=dotNL*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);reflectedLight.directSpecular+=irradiance*BRDF_BlinnPhong(directLight.direction,geometryViewDir,geometryNormal,material.specularColor,material.specularShininess)*material.specularStrength;}void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}
#define RE_Direct RE_Direct_BlinnPhong
#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong`
), vr = (
  /* glsl */
  `PhysicalMaterial material;material.diffuseColor=diffuseColor.rgb*(1.0-metalnessFactor);vec3 dxy=max(abs(dFdx(nonPerturbedNormal)),abs(dFdy(nonPerturbedNormal)));float geometryRoughness=max(max(dxy.x,dxy.y),dxy.z);material.roughness=max(roughnessFactor,0.0525);material.roughness+=geometryRoughness;material.roughness=min(material.roughness,1.0);
#ifdef IOR
material.ior=ior;
#ifdef USE_SPECULAR
float specularIntensityFactor=specularIntensity;vec3 specularColorFactor=specularColor;
#ifdef USE_SPECULAR_COLORMAP
specularColorFactor*=texture2D(specularColorMap,vSpecularColorMapUv).rgb;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
specularIntensityFactor*=texture2D(specularIntensityMap,vSpecularIntensityMapUv).a;
#endif
material.specularF90=mix(specularIntensityFactor,1.0,metalnessFactor);
#else
float specularIntensityFactor=1.0;vec3 specularColorFactor=vec3(1.0);material.specularF90=1.0;
#endif
material.specularColor=mix(min(pow2((material.ior-1.0)/(material.ior+1.0))*specularColorFactor,vec3(1.0))*specularIntensityFactor,diffuseColor.rgb,metalnessFactor);
#else
material.specularColor=mix(vec3(0.04),diffuseColor.rgb,metalnessFactor);material.specularF90=1.0;
#endif
#ifdef USE_CLEARCOAT
material.clearcoat=clearcoat;material.clearcoatRoughness=clearcoatRoughness;material.clearcoatF0=vec3(0.04);material.clearcoatF90=1.0;
#ifdef USE_CLEARCOATMAP
material.clearcoat*=texture2D(clearcoatMap,vClearcoatMapUv).x;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
material.clearcoatRoughness*=texture2D(clearcoatRoughnessMap,vClearcoatRoughnessMapUv).y;
#endif
material.clearcoat=saturate(material.clearcoat);material.clearcoatRoughness=max(material.clearcoatRoughness,0.0525);material.clearcoatRoughness+=geometryRoughness;material.clearcoatRoughness=min(material.clearcoatRoughness,1.0);
#endif
#ifdef USE_IRIDESCENCE
material.iridescence=iridescence;material.iridescenceIOR=iridescenceIOR;
#ifdef USE_IRIDESCENCEMAP
material.iridescence*=texture2D(iridescenceMap,vIridescenceMapUv).r;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
material.iridescenceThickness=(iridescenceThicknessMaximum-iridescenceThicknessMinimum)*texture2D(iridescenceThicknessMap,vIridescenceThicknessMapUv).g+iridescenceThicknessMinimum;
#else
material.iridescenceThickness=iridescenceThicknessMaximum;
#endif
#endif
#ifdef USE_SHEEN
material.sheenColor=sheenColor;
#ifdef USE_SHEEN_COLORMAP
material.sheenColor*=texture2D(sheenColorMap,vSheenColorMapUv).rgb;
#endif
material.sheenRoughness=clamp(sheenRoughness,0.07,1.0);
#ifdef USE_SHEEN_ROUGHNESSMAP
material.sheenRoughness*=texture2D(sheenRoughnessMap,vSheenRoughnessMapUv).a;
#endif
#endif
#ifdef USE_ANISOTROPY
#ifdef USE_ANISOTROPYMAP
mat2 anisotropyMat=mat2(anisotropyVector.x,anisotropyVector.y,-anisotropyVector.y,anisotropyVector.x);vec3 anisotropyPolar=texture2D(anisotropyMap,vAnisotropyMapUv).rgb;vec2 anisotropyV=anisotropyMat*normalize(2.0*anisotropyPolar.rg-vec2(1.0))*anisotropyPolar.b;
#else
vec2 anisotropyV=anisotropyVector;
#endif
material.anisotropy=length(anisotropyV);anisotropyV/=material.anisotropy;material.anisotropy=saturate(material.anisotropy);material.alphaT=mix(pow2(material.roughness),1.0,pow2(material.anisotropy));material.anisotropyT=tbn[0]*anisotropyV.x-tbn[1]*anisotropyV.y;material.anisotropyB=tbn[1]*anisotropyV.x+tbn[0]*anisotropyV.y;
#endif`
), pr = (
  /* glsl */
  `struct PhysicalMaterial{vec3 diffuseColor;float roughness;vec3 specularColor;float specularF90;
#ifdef USE_CLEARCOAT
float clearcoat;float clearcoatRoughness;vec3 clearcoatF0;float clearcoatF90;
#endif
#ifdef USE_IRIDESCENCE
float iridescence;float iridescenceIOR;float iridescenceThickness;vec3 iridescenceFresnel;vec3 iridescenceF0;
#endif
#ifdef USE_SHEEN
vec3 sheenColor;float sheenRoughness;
#endif
#ifdef IOR
float ior;
#endif
#ifdef USE_TRANSMISSION
float transmission;float transmissionAlpha;float thickness;float attenuationDistance;vec3 attenuationColor;
#endif
#ifdef USE_ANISOTROPY
float anisotropy;float alphaT;vec3 anisotropyT;vec3 anisotropyB;
#endif
};vec3 clearcoatSpecular=vec3(0.0);vec3 sheenSpecular=vec3(0.0);vec3 Schlick_to_F0(const in vec3 f,const in float f90,const in float dotVH){float x=clamp(1.0-dotVH,0.0,1.0);float x2=x*x;float x5=clamp(x*x2*x2,0.0,0.9999);return(f-vec3(f90)*x5)/(1.0-x5);}float V_GGX_SmithCorrelated(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gv=dotNL*sqrt(a2+(1.0-a2)*pow2(dotNV));float gl=dotNV*sqrt(a2+(1.0-a2)*pow2(dotNL));return 0.5/max(gv+gl,EPSILON);}float D_GGX(const in float alpha,const in float dotNH){float a2=pow2(alpha);float denom=pow2(dotNH)*(a2-1.0)+1.0;return RECIPROCAL_PI*a2/pow2(denom);}
#ifdef USE_ANISOTROPY
float V_GGX_SmithCorrelated_Anisotropic(const in float alphaT,const in float alphaB,const in float dotTV,const in float dotBV,const in float dotTL,const in float dotBL,const in float dotNV,const in float dotNL){float gv=dotNL*length(vec3(alphaT*dotTV,alphaB*dotBV,dotNV));float gl=dotNV*length(vec3(alphaT*dotTL,alphaB*dotBL,dotNL));float v=0.5/(gv+gl);return saturate(v);}float D_GGX_Anisotropic(const in float alphaT,const in float alphaB,const in float dotNH,const in float dotTH,const in float dotBH){float a2=alphaT*alphaB;highp vec3 v=vec3(alphaB*dotTH,alphaT*dotBH,a2*dotNH);highp float v2=dot(v,v);float w2=a2/v2;return RECIPROCAL_PI*a2*pow2(w2);}
#endif
#ifdef USE_CLEARCOAT
vec3 BRDF_GGX_Clearcoat(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in PhysicalMaterial material){vec3 f0=material.clearcoatF0;float f90=material.clearcoatF90;float roughness=material.clearcoatRoughness;float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(f0,f90,dotVH);float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(V*D);}
#endif
vec3 BRDF_GGX(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in PhysicalMaterial material){vec3 f0=material.specularColor;float f90=material.specularF90;float roughness=material.roughness;float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(f0,f90,dotVH);
#ifdef USE_IRIDESCENCE
F=mix(F,material.iridescenceFresnel,material.iridescence);
#endif
#ifdef USE_ANISOTROPY
float dotTL=dot(material.anisotropyT,lightDir);float dotTV=dot(material.anisotropyT,viewDir);float dotTH=dot(material.anisotropyT,halfDir);float dotBL=dot(material.anisotropyB,lightDir);float dotBV=dot(material.anisotropyB,viewDir);float dotBH=dot(material.anisotropyB,halfDir);float V=V_GGX_SmithCorrelated_Anisotropic(material.alphaT,alpha,dotTV,dotBV,dotTL,dotBL,dotNV,dotNL);float D=D_GGX_Anisotropic(material.alphaT,alpha,dotNH,dotTH,dotBH);
#else
float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);
#endif
return F*(V*D);}vec2 LTC_Uv(const in vec3 N,const in vec3 V,const in float roughness){const float LUT_SIZE=64.0;const float LUT_SCALE=(LUT_SIZE-1.0)/LUT_SIZE;const float LUT_BIAS=0.5/LUT_SIZE;float dotNV=saturate(dot(N,V));vec2 uv=vec2(roughness,sqrt(1.0-dotNV));uv=uv*LUT_SCALE+LUT_BIAS;return uv;}float LTC_ClippedSphereFormFactor(const in vec3 f){float l=length(f);return max((l*l+f.z)/(l+1.0),0.0);}vec3 LTC_EdgeVectorFormFactor(const in vec3 v1,const in vec3 v2){float x=dot(v1,v2);float y=abs(x);float a=0.8543985+(0.4965155+0.0145206*y)*y;float b=3.4175940+(4.1616724+y)*y;float v=a/b;float theta_sintheta=(x>0.0)?v:0.5*inversesqrt(max(1.0-x*x,1e-7))-v;return cross(v1,v2)*theta_sintheta;}vec3 LTC_Evaluate(const in vec3 N,const in vec3 V,const in vec3 P,const in mat3 mInv,const in vec3 rectCoords[4]){vec3 v1=rectCoords[1]-rectCoords[0];vec3 v2=rectCoords[3]-rectCoords[0];vec3 lightNormal=cross(v1,v2);if(dot(lightNormal,P-rectCoords[0])<0.0)return vec3(0.0);vec3 T1,T2;T1=normalize(V-N*dot(V,N));T2=-cross(N,T1);mat3 mat=mInv*transposeMat3(mat3(T1,T2,N));vec3 coords[4];coords[0]=mat*(rectCoords[0]-P);coords[1]=mat*(rectCoords[1]-P);coords[2]=mat*(rectCoords[2]-P);coords[3]=mat*(rectCoords[3]-P);coords[0]=normalize(coords[0]);coords[1]=normalize(coords[1]);coords[2]=normalize(coords[2]);coords[3]=normalize(coords[3]);vec3 vectorFormFactor=vec3(0.0);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[0],coords[1]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[1],coords[2]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[2],coords[3]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[3],coords[0]);float result=LTC_ClippedSphereFormFactor(vectorFormFactor);return vec3(result);}
#if defined(USE_SHEEN)
float D_Charlie(float roughness,float dotNH){float alpha=pow2(roughness);float invAlpha=1.0/alpha;float cos2h=dotNH*dotNH;float sin2h=max(1.0-cos2h,0.0078125);return(2.0+invAlpha)*pow(sin2h,invAlpha*0.5)/(2.0*PI);}float V_Neubelt(float dotNV,float dotNL){return saturate(1.0/(4.0*(dotNL+dotNV-dotNL*dotNV)));}vec3 BRDF_Sheen(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,vec3 sheenColor,const in float sheenRoughness){vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float D=D_Charlie(sheenRoughness,dotNH);float V=V_Neubelt(dotNV,dotNL);return sheenColor*(D*V);}
#endif
float IBLSheenBRDF(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));float r2=roughness*roughness;float a=roughness<0.25?-339.2*r2+161.4*roughness-25.9:-8.48*r2+14.3*roughness-9.95;float b=roughness<0.25?44.0*r2-23.7*roughness+3.26:1.97*r2-3.27*roughness+0.72;float DG=exp(a*dotNV+b)+(roughness<0.25?0.0:0.1*(roughness-0.25));return saturate(DG*RECIPROCAL_PI);}vec2 DFGApprox(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));const vec4 c0=vec4(-1,-0.0275,-0.572,0.022);const vec4 c1=vec4(1,0.0425,1.04,-0.04);vec4 r=roughness*c0+c1;float a004=min(r.x*r.x,exp2(-9.28*dotNV))*r.x+r.y;vec2 fab=vec2(-1.04,1.04)*a004+r.zw;return fab;}vec3 EnvironmentBRDF(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness){vec2 fab=DFGApprox(normal,viewDir,roughness);return specularColor*fab.x+specularF90*fab.y;}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float iridescence,const in vec3 iridescenceF0,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){
#else
void computeMultiscattering(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){
#endif
vec2 fab=DFGApprox(normal,viewDir,roughness);
#ifdef USE_IRIDESCENCE
vec3 Fr=mix(specularColor,iridescenceF0,iridescence);
#else
vec3 Fr=specularColor;
#endif
vec3 FssEss=Fr*fab.x+specularF90*fab.y;float Ess=fab.x+fab.y;float Ems=1.0-Ess;vec3 Favg=Fr+(1.0-Fr)*0.047619;vec3 Fms=FssEss*Favg/(1.0-Ems*Favg);singleScatter+=FssEss;multiScatter+=Fms*Ems;}
#if NUM_RECT_AREA_LIGHTS>0
void RE_Direct_RectArea_Physical(const in RectAreaLight rectAreaLight,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){vec3 normal=geometryNormal;vec3 viewDir=geometryViewDir;vec3 position=geometryPosition;vec3 lightPos=rectAreaLight.position;vec3 halfWidth=rectAreaLight.halfWidth;vec3 halfHeight=rectAreaLight.halfHeight;vec3 lightColor=rectAreaLight.color;float roughness=material.roughness;vec3 rectCoords[4];rectCoords[0]=lightPos+halfWidth-halfHeight;rectCoords[1]=lightPos-halfWidth-halfHeight;rectCoords[2]=lightPos-halfWidth+halfHeight;rectCoords[3]=lightPos+halfWidth+halfHeight;vec2 uv=LTC_Uv(normal,viewDir,roughness);vec4 t1=texture2D(ltc_1,uv);vec4 t2=texture2D(ltc_2,uv);mat3 mInv=mat3(vec3(t1.x,0,t1.y),vec3(0,1,0),vec3(t1.z,0,t1.w));vec3 fresnel=(material.specularColor*t2.x+(vec3(1.0)-material.specularColor)*t2.y);reflectedLight.directSpecular+=lightColor*fresnel*LTC_Evaluate(normal,viewDir,position,mInv,rectCoords);reflectedLight.directDiffuse+=lightColor*material.diffuseColor*LTC_Evaluate(normal,viewDir,position,mat3(1.0),rectCoords);}
#endif
void RE_Direct_Physical(const in IncidentLight directLight,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometryNormal,directLight.direction));vec3 irradiance=dotNL*directLight.color;
#ifdef USE_CLEARCOAT
float dotNLcc=saturate(dot(geometryClearcoatNormal,directLight.direction));vec3 ccIrradiance=dotNLcc*directLight.color;clearcoatSpecular+=ccIrradiance*BRDF_GGX_Clearcoat(directLight.direction,geometryViewDir,geometryClearcoatNormal,material);
#endif
#ifdef USE_SHEEN
sheenSpecular+=irradiance*BRDF_Sheen(directLight.direction,geometryViewDir,geometryNormal,material.sheenColor,material.sheenRoughness);
#endif
reflectedLight.directSpecular+=irradiance*BRDF_GGX(directLight.direction,geometryViewDir,geometryNormal,material);reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Physical(const in vec3 irradiance,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectSpecular_Physical(const in vec3 radiance,const in vec3 irradiance,const in vec3 clearcoatRadiance,const in vec3 geometryPosition,const in vec3 geometryNormal,const in vec3 geometryViewDir,const in vec3 geometryClearcoatNormal,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){
#ifdef USE_CLEARCOAT
clearcoatSpecular+=clearcoatRadiance*EnvironmentBRDF(geometryClearcoatNormal,geometryViewDir,material.clearcoatF0,material.clearcoatF90,material.clearcoatRoughness);
#endif
#ifdef USE_SHEEN
sheenSpecular+=irradiance*material.sheenColor*IBLSheenBRDF(geometryNormal,geometryViewDir,material.sheenRoughness);
#endif
vec3 singleScattering=vec3(0.0);vec3 multiScattering=vec3(0.0);vec3 cosineWeightedIrradiance=irradiance*RECIPROCAL_PI;
#ifdef USE_IRIDESCENCE
computeMultiscatteringIridescence(geometryNormal,geometryViewDir,material.specularColor,material.specularF90,material.iridescence,material.iridescenceFresnel,material.roughness,singleScattering,multiScattering);
#else
computeMultiscattering(geometryNormal,geometryViewDir,material.specularColor,material.specularF90,material.roughness,singleScattering,multiScattering);
#endif
vec3 totalScattering=singleScattering+multiScattering;vec3 diffuse=material.diffuseColor*(1.0-max(max(totalScattering.r,totalScattering.g),totalScattering.b));reflectedLight.indirectSpecular+=radiance*singleScattering;reflectedLight.indirectSpecular+=multiScattering*cosineWeightedIrradiance;reflectedLight.indirectDiffuse+=diffuse*cosineWeightedIrradiance;}
#define RE_Direct RE_Direct_Physical
#define RE_Direct_RectArea RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular RE_IndirectSpecular_Physical
float computeSpecularOcclusion(const in float dotNV,const in float ambientOcclusion,const in float roughness){return saturate(pow(dotNV+ambientOcclusion,exp2(-16.0*roughness-1.0))-1.0+ambientOcclusion);}`
), Yr = (
  /* glsl */
  `vec3 geometryPosition=-vViewPosition;vec3 geometryNormal=normal;vec3 geometryViewDir=(isOrthographic)?vec3(0,0,1):normalize(vViewPosition);vec3 geometryClearcoatNormal;
#ifdef USE_CLEARCOAT
geometryClearcoatNormal=clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
float dotNVi=saturate(dot(normal,geometryViewDir));if(material.iridescenceThickness==0.0){material.iridescence=0.0;}else{material.iridescence=saturate(material.iridescence);}if(material.iridescence>0.0){material.iridescenceFresnel=evalIridescence(1.0,material.iridescenceIOR,dotNVi,material.iridescenceThickness,material.specularColor);material.iridescenceF0=Schlick_to_F0(material.iridescenceFresnel,1.0,dotNVi);}
#endif
IncidentLight directLight;
#if (NUM_POINT_LIGHTS>0)&&defined(RE_Direct)
PointLight pointLight;
#if defined(USE_SHADOWMAP)&&NUM_POINT_LIGHT_SHADOWS>0
PointLightShadow pointLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHTS;i++){pointLight=pointLights[i];getPointLightInfo(pointLight,geometryPosition,directLight);
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_POINT_LIGHT_SHADOWS)
pointLightShadow=pointLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getPointShadow(pointShadowMap[i],pointLightShadow.shadowMapSize,pointLightShadow.shadowBias,pointLightShadow.shadowRadius,vPointShadowCoord[i],pointLightShadow.shadowCameraNear,pointLightShadow.shadowCameraFar):1.0;
#endif
RE_Direct(directLight,geometryPosition,geometryNormal,geometryViewDir,geometryClearcoatNormal,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_SPOT_LIGHTS>0)&&defined(RE_Direct)
SpotLight spotLight;vec4 spotColor;vec3 spotLightCoord;bool inSpotLightMap;
#if defined(USE_SHADOWMAP)&&NUM_SPOT_LIGHT_SHADOWS>0
SpotLightShadow spotLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHTS;i++){spotLight=spotLights[i];getSpotLightInfo(spotLight,geometryPosition,directLight);
#if (UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS)
#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
#elif (UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)
#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
#else
#define SPOT_LIGHT_MAP_INDEX(UNROLLED_LOOP_INDEX-NUM_SPOT_LIGHT_SHADOWS+NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS)
#endif
#if (SPOT_LIGHT_MAP_INDEX<NUM_SPOT_LIGHT_MAPS)
spotLightCoord=vSpotLightCoord[i].xyz/vSpotLightCoord[i].w;inSpotLightMap=all(lessThan(abs(spotLightCoord*2.-1.),vec3(1.0)));spotColor=texture2D(spotLightMap[SPOT_LIGHT_MAP_INDEX],spotLightCoord.xy);directLight.color=inSpotLightMap?directLight.color*spotColor.rgb:directLight.color;
#endif
#undef SPOT_LIGHT_MAP_INDEX
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)
spotLightShadow=spotLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getShadow(spotShadowMap[i],spotLightShadow.shadowMapSize,spotLightShadow.shadowBias,spotLightShadow.shadowRadius,vSpotLightCoord[i]):1.0;
#endif
RE_Direct(directLight,geometryPosition,geometryNormal,geometryViewDir,geometryClearcoatNormal,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_DIR_LIGHTS>0)&&defined(RE_Direct)
DirectionalLight directionalLight;
#if defined(USE_SHADOWMAP)&&NUM_DIR_LIGHT_SHADOWS>0
DirectionalLightShadow directionalLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHTS;i++){directionalLight=directionalLights[i];getDirectionalLightInfo(directionalLight,directLight);
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_DIR_LIGHT_SHADOWS)
directionalLightShadow=directionalLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getShadow(directionalShadowMap[i],directionalLightShadow.shadowMapSize,directionalLightShadow.shadowBias,directionalLightShadow.shadowRadius,vDirectionalShadowCoord[i]):1.0;
#endif
RE_Direct(directLight,geometryPosition,geometryNormal,geometryViewDir,geometryClearcoatNormal,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_RECT_AREA_LIGHTS>0)&&defined(RE_Direct_RectArea)
RectAreaLight rectAreaLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_RECT_AREA_LIGHTS;i++){rectAreaLight=rectAreaLights[i];RE_Direct_RectArea(rectAreaLight,geometryPosition,geometryNormal,geometryViewDir,geometryClearcoatNormal,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if defined(RE_IndirectDiffuse)
vec3 iblIrradiance=vec3(0.0);vec3 irradiance=getAmbientLightIrradiance(ambientLightColor);
#if defined(USE_LIGHT_PROBES)
irradiance+=getLightProbeIrradiance(lightProbe,geometryNormal);
#endif
#if (NUM_HEMI_LIGHTS>0)
#pragma unroll_loop_start
for(int i=0;i<NUM_HEMI_LIGHTS;i++){irradiance+=getHemisphereLightIrradiance(hemisphereLights[i],geometryNormal);}
#pragma unroll_loop_end
#endif
#endif
#if defined(RE_IndirectSpecular)
vec3 radiance=vec3(0.0);vec3 clearcoatRadiance=vec3(0.0);
#endif`
), Ur = (
  /* glsl */
  `#if defined(RE_IndirectDiffuse)
#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vLightMapUv);vec3 lightMapIrradiance=lightMapTexel.rgb*lightMapIntensity;irradiance+=lightMapIrradiance;
#endif
#if defined(USE_ENVMAP)&&defined(STANDARD)&&defined(ENVMAP_TYPE_CUBE_UV)
iblIrradiance+=getIBLIrradiance(geometryNormal);
#endif
#endif
#if defined(USE_ENVMAP)&&defined(RE_IndirectSpecular)
#ifdef USE_ANISOTROPY
radiance+=getIBLAnisotropyRadiance(geometryViewDir,geometryNormal,material.roughness,material.anisotropyB,material.anisotropy);
#else
radiance+=getIBLRadiance(geometryViewDir,geometryNormal,material.roughness);
#endif
#ifdef USE_CLEARCOAT
clearcoatRadiance+=getIBLRadiance(geometryViewDir,geometryClearcoatNormal,material.clearcoatRoughness);
#endif
#endif`
), fr = (
  /* glsl */
  `#if defined(RE_IndirectDiffuse)
RE_IndirectDiffuse(irradiance,geometryPosition,geometryNormal,geometryViewDir,geometryClearcoatNormal,material,reflectedLight);
#endif
#if defined(RE_IndirectSpecular)
RE_IndirectSpecular(radiance,iblIrradiance,clearcoatRadiance,geometryPosition,geometryNormal,geometryViewDir,geometryClearcoatNormal,material,reflectedLight);
#endif`
), mr = (
  /* glsl */
  `#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)
gl_FragDepthEXT=vIsPerspective==0.0?gl_FragCoord.z:log2(vFragDepth)*logDepthBufFC*0.5;
#endif`
), Qr = (
  /* glsl */
  `#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)
uniform float logDepthBufFC;varying float vFragDepth;varying float vIsPerspective;
#endif`
), kr = (
  /* glsl */
  `#ifdef USE_LOGDEPTHBUF
#ifdef USE_LOGDEPTHBUF_EXT
varying float vFragDepth;varying float vIsPerspective;
#else
uniform float logDepthBufFC;
#endif
#endif`
), Sr = (
  /* glsl */
  `#ifdef USE_LOGDEPTHBUF
#ifdef USE_LOGDEPTHBUF_EXT
vFragDepth=1.0+gl_Position.w;vIsPerspective=float(isPerspectiveMatrix(projectionMatrix));
#else
if(isPerspectiveMatrix(projectionMatrix)){gl_Position.z=log2(max(EPSILON,gl_Position.w+1.0))*logDepthBufFC-1.0;gl_Position.z*=gl_Position.w;}
#endif
#endif`
), Zr = (
  /* glsl */
  `#ifdef USE_MAP
vec4 sampledDiffuseColor=texture2D(map,vMapUv);
#ifdef DECODE_VIDEO_TEXTURE
sampledDiffuseColor=vec4(mix(pow(sampledDiffuseColor.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),sampledDiffuseColor.rgb*0.0773993808,vec3(lessThanEqual(sampledDiffuseColor.rgb,vec3(0.04045)))),sampledDiffuseColor.w);
#endif
diffuseColor*=sampledDiffuseColor;
#endif`
), _r = (
  /* glsl */
  `#ifdef USE_MAP
uniform sampler2D map;
#endif`
), br = (
  /* glsl */
  `#if defined(USE_MAP)||defined(USE_ALPHAMAP)
#if defined(USE_POINTS_UV)
vec2 uv=vUv;
#else
vec2 uv=(uvTransform*vec3(gl_PointCoord.x,1.0-gl_PointCoord.y,1)).xy;
#endif
#endif
#ifdef USE_MAP
diffuseColor*=texture2D(map,uv);
#endif
#ifdef USE_ALPHAMAP
diffuseColor.a*=texture2D(alphaMap,uv).g;
#endif`
), Kr = (
  /* glsl */
  `#if defined(USE_POINTS_UV)
varying vec2 vUv;
#else
#if defined(USE_MAP)||defined(USE_ALPHAMAP)
uniform mat3 uvTransform;
#endif
#endif
#ifdef USE_MAP
uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
uniform sampler2D alphaMap;
#endif`
), Pr = (
  /* glsl */
  `float metalnessFactor=metalness;
#ifdef USE_METALNESSMAP
vec4 texelMetalness=texture2D(metalnessMap,vMetalnessMapUv);metalnessFactor*=texelMetalness.b;
#endif`
), Rr = (
  /* glsl */
  `#ifdef USE_METALNESSMAP
uniform sampler2D metalnessMap;
#endif`
), Fr = (
  /* glsl */
  `#if defined(USE_MORPHCOLORS)&&defined(MORPHTARGETS_TEXTURE)
vColor*=morphTargetBaseInfluence;for(int i=0;i<MORPHTARGETS_COUNT;i++){
#if defined(USE_COLOR_ALPHA)
if(morphTargetInfluences[i]!=0.0)vColor+=getMorph(gl_VertexID,i,2)*morphTargetInfluences[i];
#elif defined(USE_COLOR)
if(morphTargetInfluences[i]!=0.0)vColor+=getMorph(gl_VertexID,i,2).rgb*morphTargetInfluences[i];
#endif
}
#endif`
), Br = (
  /* glsl */
  `#ifdef USE_MORPHNORMALS
objectNormal*=morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
for(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]!=0.0)objectNormal+=getMorph(gl_VertexID,i,1).xyz*morphTargetInfluences[i];}
#else
objectNormal+=morphNormal0*morphTargetInfluences[0];objectNormal+=morphNormal1*morphTargetInfluences[1];objectNormal+=morphNormal2*morphTargetInfluences[2];objectNormal+=morphNormal3*morphTargetInfluences[3];
#endif
#endif`
), Vr = (
  /* glsl */
  `#ifdef USE_MORPHTARGETS
uniform float morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
uniform float morphTargetInfluences[MORPHTARGETS_COUNT];uniform sampler2DArray morphTargetsTexture;uniform ivec2 morphTargetsTextureSize;vec4 getMorph(const in int vertexIndex,const in int morphTargetIndex,const in int offset){int texelIndex=vertexIndex*MORPHTARGETS_TEXTURE_STRIDE+offset;int y=texelIndex/morphTargetsTextureSize.x;int x=texelIndex-y*morphTargetsTextureSize.x;ivec3 morphUV=ivec3(x,y,morphTargetIndex);return texelFetch(morphTargetsTexture,morphUV,0);}
#else
#ifndef USE_MORPHNORMALS
uniform float morphTargetInfluences[8];
#else
uniform float morphTargetInfluences[4];
#endif
#endif
#endif`
), Gr = (
  /* glsl */
  `#ifdef USE_MORPHTARGETS
transformed*=morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
for(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]!=0.0)transformed+=getMorph(gl_VertexID,i,0).xyz*morphTargetInfluences[i];}
#else
transformed+=morphTarget0*morphTargetInfluences[0];transformed+=morphTarget1*morphTargetInfluences[1];transformed+=morphTarget2*morphTargetInfluences[2];transformed+=morphTarget3*morphTargetInfluences[3];
#ifndef USE_MORPHNORMALS
transformed+=morphTarget4*morphTargetInfluences[4];transformed+=morphTarget5*morphTargetInfluences[5];transformed+=morphTarget6*morphTargetInfluences[6];transformed+=morphTarget7*morphTargetInfluences[7];
#endif
#endif
#endif`
), Hr = (
  /* glsl */
  `float faceDirection=gl_FrontFacing?1.0:-1.0;
#ifdef FLAT_SHADED
vec3 fdx=dFdx(vViewPosition);vec3 fdy=dFdy(vViewPosition);vec3 normal=normalize(cross(fdx,fdy));
#else
vec3 normal=normalize(vNormal);
#ifdef DOUBLE_SIDED
normal*=faceDirection;
#endif
#endif
#if defined(USE_NORMALMAP_TANGENTSPACE)||defined(USE_CLEARCOAT_NORMALMAP)||defined(USE_ANISOTROPY)
#ifdef USE_TANGENT
mat3 tbn=mat3(normalize(vTangent),normalize(vBitangent),normal);
#else
mat3 tbn=getTangentFrame(-vViewPosition,normal,
#if defined(USE_NORMALMAP)
vNormalMapUv
#elif defined(USE_CLEARCOAT_NORMALMAP)
vClearcoatNormalMapUv
#else
vUv
#endif
);
#endif
#if defined(DOUBLE_SIDED)&&!defined(FLAT_SHADED)
tbn[0]*=faceDirection;tbn[1]*=faceDirection;
#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
#ifdef USE_TANGENT
mat3 tbn2=mat3(normalize(vTangent),normalize(vBitangent),normal);
#else
mat3 tbn2=getTangentFrame(-vViewPosition,normal,vClearcoatNormalMapUv);
#endif
#if defined(DOUBLE_SIDED)&&!defined(FLAT_SHADED)
tbn2[0]*=faceDirection;tbn2[1]*=faceDirection;
#endif
#endif
vec3 nonPerturbedNormal=normal;`
), Wr = (
  /* glsl */
  `#ifdef USE_NORMALMAP_OBJECTSPACE
normal=texture2D(normalMap,vNormalMapUv).xyz*2.0-1.0;
#ifdef FLIP_SIDED
normal=-normal;
#endif
#ifdef DOUBLE_SIDED
normal=normal*faceDirection;
#endif
normal=normalize(normalMatrix*normal);
#elif defined(USE_NORMALMAP_TANGENTSPACE)
vec3 mapN=texture2D(normalMap,vNormalMapUv).xyz*2.0-1.0;mapN.xy*=normalScale;normal=normalize(tbn*mapN);
#elif defined(USE_BUMPMAP)
normal=perturbNormalArb(-vViewPosition,normal,dHdxy_fwd(),faceDirection);
#endif`
), qr = (
  /* glsl */
  `#ifndef FLAT_SHADED
varying vec3 vNormal;
#ifdef USE_TANGENT
varying vec3 vTangent;varying vec3 vBitangent;
#endif
#endif`
), Xr = (
  /* glsl */
  `#ifndef FLAT_SHADED
varying vec3 vNormal;
#ifdef USE_TANGENT
varying vec3 vTangent;varying vec3 vBitangent;
#endif
#endif`
), $r = (
  /* glsl */
  `#ifndef FLAT_SHADED
vNormal=normalize(transformedNormal);
#ifdef USE_TANGENT
vTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);
#endif
#endif`
), Jr = (
  /* glsl */
  `#ifdef USE_NORMALMAP
uniform sampler2D normalMap;uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
uniform mat3 normalMatrix;
#endif
#if !defined(USE_TANGENT)&&(defined(USE_NORMALMAP_TANGENTSPACE)||defined(USE_CLEARCOAT_NORMALMAP)||defined(USE_ANISOTROPY))
mat3 getTangentFrame(vec3 eye_pos,vec3 surf_norm,vec2 uv){vec3 q0=dFdx(eye_pos.xyz);vec3 q1=dFdy(eye_pos.xyz);vec2 st0=dFdx(uv.st);vec2 st1=dFdy(uv.st);vec3 N=surf_norm;vec3 q1perp=cross(q1,N);vec3 q0perp=cross(N,q0);vec3 T=q1perp*st0.x+q0perp*st1.x;vec3 B=q1perp*st0.y+q0perp*st1.y;float det=max(dot(T,T),dot(B,B));float scale=(det==0.0)?0.0:inversesqrt(det);return mat3(T*scale,B*scale,N);}
#endif`
), Mc = (
  /* glsl */
  `#ifdef USE_CLEARCOAT
vec3 clearcoatNormal=nonPerturbedNormal;
#endif`
), Dc = (
  /* glsl */
  `#ifdef USE_CLEARCOAT_NORMALMAP
vec3 clearcoatMapN=texture2D(clearcoatNormalMap,vClearcoatNormalMapUv).xyz*2.0-1.0;clearcoatMapN.xy*=clearcoatNormalScale;clearcoatNormal=normalize(tbn2*clearcoatMapN);
#endif`
), tc = (
  /* glsl */
  `#ifdef USE_CLEARCOATMAP
uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
uniform sampler2D clearcoatNormalMap;uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
uniform sampler2D clearcoatRoughnessMap;
#endif`
), ec = (
  /* glsl */
  `#ifdef USE_IRIDESCENCEMAP
uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
uniform sampler2D iridescenceThicknessMap;
#endif`
), Nc = (
  /* glsl */
  `#ifdef OPAQUE
diffuseColor.a=1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a*=material.transmissionAlpha;
#endif
gl_FragColor=vec4(outgoingLight,diffuseColor.a);`
), ic = (
  /* glsl */
  "vec3 packNormalToRGB(const in vec3 normal){return normalize(normal)*0.5+0.5;}vec3 unpackRGBToNormal(const in vec3 rgb){return 2.0*rgb.xyz-1.0;}const float PackUpscale=256./255.;const float UnpackDownscale=255./256.;const vec3 PackFactors=vec3(256.*256.*256.,256.*256.,256.);const vec4 UnpackFactors=UnpackDownscale/vec4(PackFactors,1.);const float ShiftRight8=1./256.;vec4 packDepthToRGBA(const in float v){vec4 r=vec4(fract(v*PackFactors),v);r.yzw-=r.xyz*ShiftRight8;return r*PackUpscale;}float unpackRGBAToDepth(const in vec4 v){return dot(v,UnpackFactors);}vec2 packDepthToRG(in highp float v){return packDepthToRGBA(v).yx;}float unpackRGToDepth(const in highp vec2 v){return unpackRGBAToDepth(vec4(v.xy,0.0,0.0));}vec4 pack2HalfToRGBA(vec2 v){vec4 r=vec4(v.x,fract(v.x*255.0),v.y,fract(v.y*255.0));return vec4(r.x-r.y/255.0,r.y,r.z-r.w/255.0,r.w);}vec2 unpackRGBATo2Half(vec4 v){return vec2(v.x+(v.y/255.0),v.z+(v.w/255.0));}float viewZToOrthographicDepth(const in float viewZ,const in float near,const in float far){return(viewZ+near)/(near-far);}float orthographicDepthToViewZ(const in float depth,const in float near,const in float far){return depth*(near-far)-near;}float viewZToPerspectiveDepth(const in float viewZ,const in float near,const in float far){return((near+viewZ)*far)/((far-near)*viewZ);}float perspectiveDepthToViewZ(const in float depth,const in float near,const in float far){return(near*far)/((far-near)*depth-far);}"
), Ac = (
  /* glsl */
  `#ifdef PREMULTIPLIED_ALPHA
gl_FragColor.rgb*=gl_FragColor.a;
#endif`
), nc = (
  /* glsl */
  `vec4 mvPosition=vec4(transformed,1.0);
#ifdef USE_INSTANCING
mvPosition=instanceMatrix*mvPosition;
#endif
mvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;`
), zc = (
  /* glsl */
  `#ifdef DITHERING
gl_FragColor.rgb=dithering(gl_FragColor.rgb);
#endif`
), Ic = (
  /* glsl */
  `#ifdef DITHERING
vec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}
#endif`
), Tc = (
  /* glsl */
  `float roughnessFactor=roughness;
#ifdef USE_ROUGHNESSMAP
vec4 texelRoughness=texture2D(roughnessMap,vRoughnessMapUv);roughnessFactor*=texelRoughness.g;
#endif`
), uc = (
  /* glsl */
  `#ifdef USE_ROUGHNESSMAP
uniform sampler2D roughnessMap;
#endif`
), gc = (
  /* glsl */
  `#if NUM_SPOT_LIGHT_COORDS>0
varying vec4 vSpotLightCoord[NUM_SPOT_LIGHT_COORDS];
#endif
#if NUM_SPOT_LIGHT_MAPS>0
uniform sampler2D spotLightMap[NUM_SPOT_LIGHT_MAPS];
#endif
#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
uniform sampler2D directionalShadowMap[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
uniform sampler2D spotShadowMap[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
uniform sampler2D pointShadowMap[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];
#endif
float texture2DCompare(sampler2D depths,vec2 uv,float compare){return step(compare,unpackRGBAToDepth(texture2D(depths,uv)));}vec2 texture2DDistribution(sampler2D shadow,vec2 uv){return unpackRGBATo2Half(texture2D(shadow,uv));}float VSMShadow(sampler2D shadow,vec2 uv,float compare){float occlusion=1.0;vec2 distribution=texture2DDistribution(shadow,uv);float hard_shadow=step(compare,distribution.x);if(hard_shadow!=1.0){float distance=compare-distribution.x;float variance=max(0.00000,distribution.y*distribution.y);float softness_probability=variance/(variance+distance*distance);softness_probability=clamp((softness_probability-0.3)/(0.95-0.3),0.0,1.0);occlusion=clamp(max(hard_shadow,softness_probability),0.0,1.0);}return occlusion;}float getShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord){float shadow=1.0;shadowCoord.xyz/=shadowCoord.w;shadowCoord.z+=shadowBias;bool inFrustum=shadowCoord.x>=0.0&&shadowCoord.x<=1.0&&shadowCoord.y>=0.0&&shadowCoord.y<=1.0;bool frustumTest=inFrustum&&shadowCoord.z<=1.0;if(frustumTest){
#if defined(SHADOWMAP_TYPE_PCF)
vec2 texelSize=vec2(1.0)/shadowMapSize;float dx0=-texelSize.x*shadowRadius;float dy0=-texelSize.y*shadowRadius;float dx1=+texelSize.x*shadowRadius;float dy1=+texelSize.y*shadowRadius;float dx2=dx0/2.0;float dy2=dy0/2.0;float dx3=dx1/2.0;float dy3=dy1/2.0;shadow=(texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy1),shadowCoord.z))*(1.0/17.0);
#elif defined(SHADOWMAP_TYPE_PCF_SOFT)
vec2 texelSize=vec2(1.0)/shadowMapSize;float dx=texelSize.x;float dy=texelSize.y;vec2 uv=shadowCoord.xy;vec2 f=fract(uv*shadowMapSize+0.5);uv-=f*texelSize;shadow=(texture2DCompare(shadowMap,uv,shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(dx,0.0),shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(0.0,dy),shadowCoord.z)+texture2DCompare(shadowMap,uv+texelSize,shadowCoord.z)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,0.0),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,0.0),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,dy),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(0.0,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(0.0,2.0*dy),shadowCoord.z),f.y)+mix(texture2DCompare(shadowMap,uv+vec2(dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(dx,2.0*dy),shadowCoord.z),f.y)+mix(mix(texture2DCompare(shadowMap,uv+vec2(-dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,-dy),shadowCoord.z),f.x),mix(texture2DCompare(shadowMap,uv+vec2(-dx,2.0*dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,2.0*dy),shadowCoord.z),f.x),f.y))*(1.0/9.0);
#elif defined(SHADOWMAP_TYPE_VSM)
shadow=VSMShadow(shadowMap,shadowCoord.xy,shadowCoord.z);
#else
shadow=texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z);
#endif
}return shadow;}vec2 cubeToUV(vec3 v,float texelSizeY){vec3 absV=abs(v);float scaleToCube=1.0/max(absV.x,max(absV.y,absV.z));absV*=scaleToCube;v*=scaleToCube*(1.0-2.0*texelSizeY);vec2 planar=v.xy;float almostATexel=1.5*texelSizeY;float almostOne=1.0-almostATexel;if(absV.z>=almostOne){if(v.z>0.0)planar.x=4.0-v.x;}else if(absV.x>=almostOne){float signX=sign(v.x);planar.x=v.z*signX+2.0*signX;}else if(absV.y>=almostOne){float signY=sign(v.y);planar.x=v.x+2.0*signY+2.0;planar.y=v.z*signY-2.0;}return vec2(0.125,0.25)*planar+vec2(0.375,0.75);}float getPointShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord,float shadowCameraNear,float shadowCameraFar){vec2 texelSize=vec2(1.0)/(shadowMapSize*vec2(4.0,2.0));vec3 lightToPosition=shadowCoord.xyz;float dp=(length(lightToPosition)-shadowCameraNear)/(shadowCameraFar-shadowCameraNear);dp+=shadowBias;vec3 bd3D=normalize(lightToPosition);
#if defined(SHADOWMAP_TYPE_PCF)||defined(SHADOWMAP_TYPE_PCF_SOFT)||defined(SHADOWMAP_TYPE_VSM)
vec2 offset=vec2(-1,1)*shadowRadius*texelSize.y;return(texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxx,texelSize.y),dp))*(1.0/9.0);
#else
return texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp);
#endif
}
#endif`
), sc = (
  /* glsl */
  `#if NUM_SPOT_LIGHT_COORDS>0
uniform mat4 spotLightMatrix[NUM_SPOT_LIGHT_COORDS];varying vec4 vSpotLightCoord[NUM_SPOT_LIGHT_COORDS];
#endif
#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
uniform mat4 directionalShadowMatrix[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
uniform mat4 pointShadowMatrix[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];
#endif
#endif`
), rc = (
  /* glsl */
  `#if (defined(USE_SHADOWMAP)&&(NUM_DIR_LIGHT_SHADOWS>0||NUM_POINT_LIGHT_SHADOWS>0))||(NUM_SPOT_LIGHT_COORDS>0)
vec3 shadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 shadowWorldPosition;
#endif
#if defined(USE_SHADOWMAP)
#if NUM_DIR_LIGHT_SHADOWS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*directionalLightShadows[i].shadowNormalBias,0);vDirectionalShadowCoord[i]=directionalShadowMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*pointLightShadows[i].shadowNormalBias,0);vPointShadowCoord[i]=pointShadowMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif
#endif
#if NUM_SPOT_LIGHT_COORDS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHT_COORDS;i++){shadowWorldPosition=worldPosition;
#if (defined(USE_SHADOWMAP)&&UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)
shadowWorldPosition.xyz+=shadowWorldNormal*spotLightShadows[i].shadowNormalBias;
#endif
vSpotLightCoord[i]=spotLightMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif`
), cc = (
  /* glsl */
  `float getShadowMask(){float shadow=1.0;
#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
DirectionalLightShadow directionalLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){directionalLight=directionalLightShadows[i];shadow*=receiveShadow?getShadow(directionalShadowMap[i],directionalLight.shadowMapSize,directionalLight.shadowBias,directionalLight.shadowRadius,vDirectionalShadowCoord[i]):1.0;}
#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
SpotLightShadow spotLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){spotLight=spotLightShadows[i];shadow*=receiveShadow?getShadow(spotShadowMap[i],spotLight.shadowMapSize,spotLight.shadowBias,spotLight.shadowRadius,vSpotLightCoord[i]):1.0;}
#pragma unroll_loop_end
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
PointLightShadow pointLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){pointLight=pointLightShadows[i];shadow*=receiveShadow?getPointShadow(pointShadowMap[i],pointLight.shadowMapSize,pointLight.shadowBias,pointLight.shadowRadius,vPointShadowCoord[i],pointLight.shadowCameraNear,pointLight.shadowCameraFar):1.0;}
#pragma unroll_loop_end
#endif
#endif
return shadow;}`
), ac = (
  /* glsl */
  `#ifdef USE_SKINNING
mat4 boneMatX=getBoneMatrix(skinIndex.x);mat4 boneMatY=getBoneMatrix(skinIndex.y);mat4 boneMatZ=getBoneMatrix(skinIndex.z);mat4 boneMatW=getBoneMatrix(skinIndex.w);
#endif`
), oc = (
  /* glsl */
  `#ifdef USE_SKINNING
uniform mat4 bindMatrix;uniform mat4 bindMatrixInverse;uniform highp sampler2D boneTexture;uniform int boneTextureSize;mat4 getBoneMatrix(const in float i){float j=i*4.0;float x=mod(j,float(boneTextureSize));float y=floor(j/float(boneTextureSize));float dx=1.0/float(boneTextureSize);float dy=1.0/float(boneTextureSize);y=dy*(y+0.5);vec4 v1=texture2D(boneTexture,vec2(dx*(x+0.5),y));vec4 v2=texture2D(boneTexture,vec2(dx*(x+1.5),y));vec4 v3=texture2D(boneTexture,vec2(dx*(x+2.5),y));vec4 v4=texture2D(boneTexture,vec2(dx*(x+3.5),y));mat4 bone=mat4(v1,v2,v3,v4);return bone;}
#endif`
), yc = (
  /* glsl */
  `#ifdef USE_SKINNING
vec4 skinVertex=bindMatrix*vec4(transformed,1.0);vec4 skinned=vec4(0.0);skinned+=boneMatX*skinVertex*skinWeight.x;skinned+=boneMatY*skinVertex*skinWeight.y;skinned+=boneMatZ*skinVertex*skinWeight.z;skinned+=boneMatW*skinVertex*skinWeight.w;transformed=(bindMatrixInverse*skinned).xyz;
#endif`
), jc = (
  /* glsl */
  `#ifdef USE_SKINNING
mat4 skinMatrix=mat4(0.0);skinMatrix+=skinWeight.x*boneMatX;skinMatrix+=skinWeight.y*boneMatY;skinMatrix+=skinWeight.z*boneMatZ;skinMatrix+=skinWeight.w*boneMatW;skinMatrix=bindMatrixInverse*skinMatrix*bindMatrix;objectNormal=vec4(skinMatrix*vec4(objectNormal,0.0)).xyz;
#ifdef USE_TANGENT
objectTangent=vec4(skinMatrix*vec4(objectTangent,0.0)).xyz;
#endif
#endif`
), Cc = (
  /* glsl */
  `float specularStrength;
#ifdef USE_SPECULARMAP
vec4 texelSpecular=texture2D(specularMap,vSpecularMapUv);specularStrength=texelSpecular.r;
#else
specularStrength=1.0;
#endif`
), Lc = (
  /* glsl */
  `#ifdef USE_SPECULARMAP
uniform sampler2D specularMap;
#endif`
), wc = (
  /* glsl */
  `#if defined(TONE_MAPPING)
gl_FragColor.rgb=toneMapping(gl_FragColor.rgb);
#endif`
), xc = (
  /* glsl */
  `#ifndef saturate
#define saturate(a)clamp(a,0.0,1.0)
#endif
uniform float toneMappingExposure;vec3 LinearToneMapping(vec3 color){return saturate(toneMappingExposure*color);}vec3 ReinhardToneMapping(vec3 color){color*=toneMappingExposure;return saturate(color/(vec3(1.0)+color));}vec3 OptimizedCineonToneMapping(vec3 color){color*=toneMappingExposure;color=max(vec3(0.0),color-0.004);return pow((color*(6.2*color+0.5))/(color*(6.2*color+1.7)+0.06),vec3(2.2));}vec3 RRTAndODTFit(vec3 v){vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}vec3 ACESFilmicToneMapping(vec3 color){const mat3 ACESInputMat=mat3(vec3(0.59719,0.07600,0.02840),vec3(0.35458,0.90834,0.13383),vec3(0.04823,0.01566,0.83777));const mat3 ACESOutputMat=mat3(vec3(1.60475,-0.10208,-0.00327),vec3(-0.53108,1.10813,-0.07276),vec3(-0.07367,-0.00605,1.07602));color*=toneMappingExposure/0.6;color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;return saturate(color);}vec3 CustomToneMapping(vec3 color){return color;}`
), Oc = (
  /* glsl */
  `#ifdef USE_TRANSMISSION
material.transmission=transmission;material.transmissionAlpha=1.0;material.thickness=thickness;material.attenuationDistance=attenuationDistance;material.attenuationColor=attenuationColor;
#ifdef USE_TRANSMISSIONMAP
material.transmission*=texture2D(transmissionMap,vTransmissionMapUv).r;
#endif
#ifdef USE_THICKNESSMAP
material.thickness*=texture2D(thicknessMap,vThicknessMapUv).g;
#endif
vec3 pos=vWorldPosition;vec3 v=normalize(cameraPosition-pos);vec3 n=inverseTransformDirection(normal,viewMatrix);vec4 transmitted=getIBLVolumeRefraction(n,v,material.roughness,material.diffuseColor,material.specularColor,material.specularF90,pos,modelMatrix,viewMatrix,projectionMatrix,material.ior,material.thickness,material.attenuationColor,material.attenuationDistance);material.transmissionAlpha=mix(material.transmissionAlpha,transmitted.a,material.transmission);totalDiffuse=mix(totalDiffuse,transmitted.rgb,material.transmission);
#endif`
), Ec = (
  /* glsl */
  `#ifdef USE_TRANSMISSION
uniform float transmission;uniform float thickness;uniform float attenuationDistance;uniform vec3 attenuationColor;
#ifdef USE_TRANSMISSIONMAP
uniform sampler2D transmissionMap;
#endif
#ifdef USE_THICKNESSMAP
uniform sampler2D thicknessMap;
#endif
uniform vec2 transmissionSamplerSize;uniform sampler2D transmissionSamplerMap;uniform mat4 modelMatrix;uniform mat4 projectionMatrix;varying vec3 vWorldPosition;float w0(float a){return(1.0/6.0)*(a*(a*(-a+3.0)-3.0)+1.0);}float w1(float a){return(1.0/6.0)*(a*a*(3.0*a-6.0)+4.0);}float w2(float a){return(1.0/6.0)*(a*(a*(-3.0*a+3.0)+3.0)+1.0);}float w3(float a){return(1.0/6.0)*(a*a*a);}float g0(float a){return w0(a)+w1(a);}float g1(float a){return w2(a)+w3(a);}float h0(float a){return-1.0+w1(a)/(w0(a)+w1(a));}float h1(float a){return 1.0+w3(a)/(w2(a)+w3(a));}vec4 bicubic(sampler2D tex,vec2 uv,vec4 texelSize,float lod){uv=uv*texelSize.zw+0.5;vec2 iuv=floor(uv);vec2 fuv=fract(uv);float g0x=g0(fuv.x);float g1x=g1(fuv.x);float h0x=h0(fuv.x);float h1x=h1(fuv.x);float h0y=h0(fuv.y);float h1y=h1(fuv.y);vec2 p0=(vec2(iuv.x+h0x,iuv.y+h0y)-0.5)*texelSize.xy;vec2 p1=(vec2(iuv.x+h1x,iuv.y+h0y)-0.5)*texelSize.xy;vec2 p2=(vec2(iuv.x+h0x,iuv.y+h1y)-0.5)*texelSize.xy;vec2 p3=(vec2(iuv.x+h1x,iuv.y+h1y)-0.5)*texelSize.xy;return g0(fuv.y)*(g0x*textureLod(tex,p0,lod)+g1x*textureLod(tex,p1,lod))+g1(fuv.y)*(g0x*textureLod(tex,p2,lod)+g1x*textureLod(tex,p3,lod));}vec4 textureBicubic(sampler2D sampler,vec2 uv,float lod){vec2 fLodSize=vec2(textureSize(sampler,int(lod)));vec2 cLodSize=vec2(textureSize(sampler,int(lod+1.0)));vec2 fLodSizeInv=1.0/fLodSize;vec2 cLodSizeInv=1.0/cLodSize;vec4 fSample=bicubic(sampler,uv,vec4(fLodSizeInv,fLodSize),floor(lod));vec4 cSample=bicubic(sampler,uv,vec4(cLodSizeInv,cLodSize),ceil(lod));return mix(fSample,cSample,fract(lod));}vec3 getVolumeTransmissionRay(const in vec3 n,const in vec3 v,const in float thickness,const in float ior,const in mat4 modelMatrix){vec3 refractionVector=refract(-v,normalize(n),1.0/ior);vec3 modelScale;modelScale.x=length(vec3(modelMatrix[0].xyz));modelScale.y=length(vec3(modelMatrix[1].xyz));modelScale.z=length(vec3(modelMatrix[2].xyz));return normalize(refractionVector)*thickness*modelScale;}float applyIorToRoughness(const in float roughness,const in float ior){return roughness*clamp(ior*2.0-2.0,0.0,1.0);}vec4 getTransmissionSample(const in vec2 fragCoord,const in float roughness,const in float ior){float lod=log2(transmissionSamplerSize.x)*applyIorToRoughness(roughness,ior);return textureBicubic(transmissionSamplerMap,fragCoord.xy,lod);}vec3 volumeAttenuation(const in float transmissionDistance,const in vec3 attenuationColor,const in float attenuationDistance){if(isinf(attenuationDistance)){return vec3(1.0);}else{vec3 attenuationCoefficient=-log(attenuationColor)/attenuationDistance;vec3 transmittance=exp(-attenuationCoefficient*transmissionDistance);return transmittance;}}vec4 getIBLVolumeRefraction(const in vec3 n,const in vec3 v,const in float roughness,const in vec3 diffuseColor,const in vec3 specularColor,const in float specularF90,const in vec3 position,const in mat4 modelMatrix,const in mat4 viewMatrix,const in mat4 projMatrix,const in float ior,const in float thickness,const in vec3 attenuationColor,const in float attenuationDistance){vec3 transmissionRay=getVolumeTransmissionRay(n,v,thickness,ior,modelMatrix);vec3 refractedRayExit=position+transmissionRay;vec4 ndcPos=projMatrix*viewMatrix*vec4(refractedRayExit,1.0);vec2 refractionCoords=ndcPos.xy/ndcPos.w;refractionCoords+=1.0;refractionCoords/=2.0;vec4 transmittedLight=getTransmissionSample(refractionCoords,roughness,ior);vec3 transmittance=diffuseColor*volumeAttenuation(length(transmissionRay),attenuationColor,attenuationDistance);vec3 attenuatedColor=transmittance*transmittedLight.rgb;vec3 F=EnvironmentBRDF(n,v,specularColor,specularF90,roughness);float transmittanceFactor=(transmittance.r+transmittance.g+transmittance.b)/3.0;return vec4((1.0-F)*attenuatedColor,1.0-(1.0-transmittedLight.a)*transmittanceFactor);}
#endif`
), lc = (
  /* glsl */
  `#if defined(USE_UV)||defined(USE_ANISOTROPY)
varying vec2 vUv;
#endif
#ifdef USE_MAP
varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
uniform mat3 transmissionMapTransform;varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
uniform mat3 thicknessMapTransform;varying vec2 vThicknessMapUv;
#endif`
), hc = (
  /* glsl */
  `#if defined(USE_UV)||defined(USE_ANISOTROPY)
varying vec2 vUv;
#endif
#ifdef USE_MAP
uniform mat3 mapTransform;varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
uniform mat3 alphaMapTransform;varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
uniform mat3 lightMapTransform;varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
uniform mat3 aoMapTransform;varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
uniform mat3 bumpMapTransform;varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
uniform mat3 normalMapTransform;varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
uniform mat3 displacementMapTransform;varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
uniform mat3 emissiveMapTransform;varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
uniform mat3 metalnessMapTransform;varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
uniform mat3 roughnessMapTransform;varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
uniform mat3 anisotropyMapTransform;varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
uniform mat3 clearcoatMapTransform;varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
uniform mat3 clearcoatNormalMapTransform;varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
uniform mat3 clearcoatRoughnessMapTransform;varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
uniform mat3 sheenColorMapTransform;varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
uniform mat3 sheenRoughnessMapTransform;varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
uniform mat3 iridescenceMapTransform;varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
uniform mat3 iridescenceThicknessMapTransform;varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
uniform mat3 specularMapTransform;varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
uniform mat3 specularColorMapTransform;varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
uniform mat3 specularIntensityMapTransform;varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
uniform mat3 transmissionMapTransform;varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
uniform mat3 thicknessMapTransform;varying vec2 vThicknessMapUv;
#endif`
), dc = (
  /* glsl */
  `#if defined(USE_UV)||defined(USE_ANISOTROPY)
vUv=vec3(uv,1).xy;
#endif
#ifdef USE_MAP
vMapUv=(mapTransform*vec3(MAP_UV,1)).xy;
#endif
#ifdef USE_ALPHAMAP
vAlphaMapUv=(alphaMapTransform*vec3(ALPHAMAP_UV,1)).xy;
#endif
#ifdef USE_LIGHTMAP
vLightMapUv=(lightMapTransform*vec3(LIGHTMAP_UV,1)).xy;
#endif
#ifdef USE_AOMAP
vAoMapUv=(aoMapTransform*vec3(AOMAP_UV,1)).xy;
#endif
#ifdef USE_BUMPMAP
vBumpMapUv=(bumpMapTransform*vec3(BUMPMAP_UV,1)).xy;
#endif
#ifdef USE_NORMALMAP
vNormalMapUv=(normalMapTransform*vec3(NORMALMAP_UV,1)).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
vDisplacementMapUv=(displacementMapTransform*vec3(DISPLACEMENTMAP_UV,1)).xy;
#endif
#ifdef USE_EMISSIVEMAP
vEmissiveMapUv=(emissiveMapTransform*vec3(EMISSIVEMAP_UV,1)).xy;
#endif
#ifdef USE_METALNESSMAP
vMetalnessMapUv=(metalnessMapTransform*vec3(METALNESSMAP_UV,1)).xy;
#endif
#ifdef USE_ROUGHNESSMAP
vRoughnessMapUv=(roughnessMapTransform*vec3(ROUGHNESSMAP_UV,1)).xy;
#endif
#ifdef USE_ANISOTROPYMAP
vAnisotropyMapUv=(anisotropyMapTransform*vec3(ANISOTROPYMAP_UV,1)).xy;
#endif
#ifdef USE_CLEARCOATMAP
vClearcoatMapUv=(clearcoatMapTransform*vec3(CLEARCOATMAP_UV,1)).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
vClearcoatNormalMapUv=(clearcoatNormalMapTransform*vec3(CLEARCOAT_NORMALMAP_UV,1)).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
vClearcoatRoughnessMapUv=(clearcoatRoughnessMapTransform*vec3(CLEARCOAT_ROUGHNESSMAP_UV,1)).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
vIridescenceMapUv=(iridescenceMapTransform*vec3(IRIDESCENCEMAP_UV,1)).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
vIridescenceThicknessMapUv=(iridescenceThicknessMapTransform*vec3(IRIDESCENCE_THICKNESSMAP_UV,1)).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
vSheenColorMapUv=(sheenColorMapTransform*vec3(SHEEN_COLORMAP_UV,1)).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
vSheenRoughnessMapUv=(sheenRoughnessMapTransform*vec3(SHEEN_ROUGHNESSMAP_UV,1)).xy;
#endif
#ifdef USE_SPECULARMAP
vSpecularMapUv=(specularMapTransform*vec3(SPECULARMAP_UV,1)).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
vSpecularColorMapUv=(specularColorMapTransform*vec3(SPECULAR_COLORMAP_UV,1)).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
vSpecularIntensityMapUv=(specularIntensityMapTransform*vec3(SPECULAR_INTENSITYMAP_UV,1)).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
vTransmissionMapUv=(transmissionMapTransform*vec3(TRANSMISSIONMAP_UV,1)).xy;
#endif
#ifdef USE_THICKNESSMAP
vThicknessMapUv=(thicknessMapTransform*vec3(THICKNESSMAP_UV,1)).xy;
#endif`
), vc = (
  /* glsl */
  `#if defined(USE_ENVMAP)||defined(DISTANCE)||defined(USE_SHADOWMAP)||defined(USE_TRANSMISSION)||NUM_SPOT_LIGHT_COORDS>0
vec4 worldPosition=vec4(transformed,1.0);
#ifdef USE_INSTANCING
worldPosition=instanceMatrix*worldPosition;
#endif
worldPosition=modelMatrix*worldPosition;
#endif`
), pc = (
  /* glsl */
  "varying vec2 vUv;uniform mat3 uvTransform;void main(){vUv=(uvTransform*vec3(uv,1)).xy;gl_Position=vec4(position.xy,1.0,1.0);}"
), Yc = (
  /* glsl */
  `uniform sampler2D t2D;uniform float backgroundIntensity;varying vec2 vUv;void main(){vec4 texColor=texture2D(t2D,vUv);
#ifdef DECODE_VIDEO_TEXTURE
texColor=vec4(mix(pow(texColor.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),texColor.rgb*0.0773993808,vec3(lessThanEqual(texColor.rgb,vec3(0.04045)))),texColor.w);
#endif
texColor.rgb*=backgroundIntensity;gl_FragColor=texColor;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
), Uc = (
  /* glsl */
  `varying vec3 vWorldDirection;
#include <common>
void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
gl_Position.z=gl_Position.w;}`
), fc = (
  /* glsl */
  `#ifdef ENVMAP_TYPE_CUBE
uniform samplerCube envMap;
#elif defined(ENVMAP_TYPE_CUBE_UV)
uniform sampler2D envMap;
#endif
uniform float flipEnvMap;uniform float backgroundBlurriness;uniform float backgroundIntensity;varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main(){
#ifdef ENVMAP_TYPE_CUBE
vec4 texColor=textureCube(envMap,vec3(flipEnvMap*vWorldDirection.x,vWorldDirection.yz));
#elif defined(ENVMAP_TYPE_CUBE_UV)
vec4 texColor=textureCubeUV(envMap,vWorldDirection,backgroundBlurriness);
#else
vec4 texColor=vec4(0.0,0.0,0.0,1.0);
#endif
texColor.rgb*=backgroundIntensity;gl_FragColor=texColor;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
), mc = (
  /* glsl */
  `varying vec3 vWorldDirection;
#include <common>
void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
gl_Position.z=gl_Position.w;}`
), Qc = (
  /* glsl */
  `uniform samplerCube tCube;uniform float tFlip;uniform float opacity;varying vec3 vWorldDirection;void main(){vec4 texColor=textureCube(tCube,vec3(tFlip*vWorldDirection.x,vWorldDirection.yz));gl_FragColor=texColor;gl_FragColor.a*=opacity;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
), kc = (
  /* glsl */
  `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;void main(){
#include <uv_vertex>
#include <skinbase_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vHighPrecisionZW=gl_Position.zw;}`
), Sc = (
  /* glsl */
  `#if DEPTH_PACKING==3200
uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(1.0);
#if DEPTH_PACKING==3200
diffuseColor.a=opacity;
#endif
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <logdepthbuf_fragment>
float fragCoordZ=0.5*vHighPrecisionZW[0]/vHighPrecisionZW[1]+0.5;
#if DEPTH_PACKING==3200
gl_FragColor=vec4(vec3(1.0-fragCoordZ),opacity);
#elif DEPTH_PACKING==3201
gl_FragColor=packDepthToRGBA(fragCoordZ);
#endif
}`
), Zc = (
  /* glsl */
  `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <skinbase_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <worldpos_vertex>
#include <clipping_planes_vertex>
vWorldPosition=worldPosition.xyz;}`
), _c = (
  /* glsl */
  `#define DISTANCE
uniform vec3 referencePosition;uniform float nearDistance;uniform float farDistance;varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(1.0);
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
float dist=length(vWorldPosition-referencePosition);dist=(dist-nearDistance)/(farDistance-nearDistance);dist=saturate(dist);gl_FragColor=packDepthToRGBA(dist);}`
), bc = (
  /* glsl */
  `varying vec3 vWorldDirection;
#include <common>
void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
}`
), Kc = (
  /* glsl */
  `uniform sampler2D tEquirect;varying vec3 vWorldDirection;
#include <common>
void main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
), Pc = (
  /* glsl */
  `uniform float scale;attribute float lineDistance;varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){vLineDistance=scale*lineDistance;
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
}`
), Rc = (
  /* glsl */
  `uniform vec3 diffuse;uniform float opacity;uniform float dashSize;uniform float totalSize;varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
if(mod(vLineDistance,totalSize)>dashSize){discard;}vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
outgoingLight=diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`
), Fc = (
  /* glsl */
  `#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#if defined(USE_ENVMAP)||defined(USE_SKINNING)
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <envmap_vertex>
#include <fog_vertex>
}`
), Bc = (
  /* glsl */
  `uniform vec3 diffuse;uniform float opacity;
#ifndef FLAT_SHADED
varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));
#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vLightMapUv);reflectedLight.indirectDiffuse+=lightMapTexel.rgb*lightMapIntensity*RECIPROCAL_PI;
#else
reflectedLight.indirectDiffuse+=vec3(1.0);
#endif
#include <aomap_fragment>
reflectedLight.indirectDiffuse*=diffuseColor.rgb;vec3 outgoingLight=reflectedLight.indirectDiffuse;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
), Vc = (
  /* glsl */
  `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <envmap_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`
), Gc = (
  /* glsl */
  `#define LAMBERT
uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_lambert_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
), Hc = (
  /* glsl */
  `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
vViewPosition=-mvPosition.xyz;}`
), Wc = (
  /* glsl */
  `#define MATCAP
uniform vec3 diffuse;uniform float opacity;uniform sampler2D matcap;varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
vec3 viewDir=normalize(vViewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,normal),dot(y,normal))*0.495+0.5;
#ifdef USE_MATCAP
vec4 matcapColor=texture2D(matcap,uv);
#else
vec4 matcapColor=vec4(vec3(mix(0.2,0.8,uv.y)),1.0);
#endif
vec3 outgoingLight=diffuseColor.rgb*matcapColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
), qc = (
  /* glsl */
  `#define NORMAL
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(USE_NORMALMAP_TANGENTSPACE)
varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(USE_NORMALMAP_TANGENTSPACE)
vViewPosition=-mvPosition.xyz;
#endif
}`
), Xc = (
  /* glsl */
  `#define NORMAL
uniform float opacity;
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(USE_NORMALMAP_TANGENTSPACE)
varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
#include <logdepthbuf_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
gl_FragColor=vec4(packNormalToRGB(normal),opacity);
#ifdef OPAQUE
gl_FragColor.a=1.0;
#endif
}`
), $c = (
  /* glsl */
  `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <envmap_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`
), Jc = (
  /* glsl */
  `#define PHONG
uniform vec3 diffuse;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_phong_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
), Ma = (
  /* glsl */
  `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
#ifdef USE_TRANSMISSION
vWorldPosition=worldPosition.xyz;
#endif
}`
), Da = (
  /* glsl */
  `#define STANDARD
#ifdef PHYSICAL
#define IOR
#define USE_SPECULAR
#endif
uniform vec3 diffuse;uniform vec3 emissive;uniform float roughness;uniform float metalness;uniform float opacity;
#ifdef IOR
uniform float ior;
#endif
#ifdef USE_SPECULAR
uniform float specularIntensity;uniform vec3 specularColor;
#ifdef USE_SPECULAR_COLORMAP
uniform sampler2D specularColorMap;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif
#endif
#ifdef USE_CLEARCOAT
uniform float clearcoat;uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
uniform float iridescence;uniform float iridescenceIOR;uniform float iridescenceThicknessMinimum;uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
uniform vec3 sheenColor;uniform float sheenRoughness;
#ifdef USE_SHEEN_COLORMAP
uniform sampler2D sheenColorMap;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif
#ifdef USE_ANISOTROPY
uniform vec2 anisotropyVector;
#ifdef USE_ANISOTROPYMAP
uniform sampler2D anisotropyMap;
#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 totalDiffuse=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse;vec3 totalSpecular=reflectedLight.directSpecular+reflectedLight.indirectSpecular;
#include <transmission_fragment>
vec3 outgoingLight=totalDiffuse+totalSpecular+totalEmissiveRadiance;
#ifdef USE_SHEEN
float sheenEnergyComp=1.0-0.157*max3(material.sheenColor);outgoingLight=outgoingLight*sheenEnergyComp+sheenSpecular;
#endif
#ifdef USE_CLEARCOAT
float dotNVcc=saturate(dot(geometryClearcoatNormal,geometryViewDir));vec3 Fcc=F_Schlick(material.clearcoatF0,material.clearcoatF90,dotNVcc);outgoingLight=outgoingLight*(1.0-material.clearcoat*Fcc)+clearcoatSpecular*material.clearcoat;
#endif
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
), ta = (
  /* glsl */
  `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`
), ea = (
  /* glsl */
  `#define TOON
uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_toon_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
), Na = (
  /* glsl */
  `uniform float size;uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
varying vec2 vUv;uniform mat3 uvTransform;
#endif
void main(){
#ifdef USE_POINTS_UV
vUv=(uvTransform*vec3(uv,1)).xy;
#endif
#include <color_vertex>
#include <morphcolor_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
gl_PointSize=size;
#ifdef USE_SIZEATTENUATION
bool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)gl_PointSize*=(scale/-mvPosition.z);
#endif
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <fog_vertex>
}`
), ia = (
  /* glsl */
  `uniform vec3 diffuse;uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_particle_fragment>
#include <color_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
outgoingLight=diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`
), Aa = (
  /* glsl */
  `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main(){
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`
), na = (
  /* glsl */
  `uniform vec3 color;uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main(){
#include <logdepthbuf_fragment>
gl_FragColor=vec4(color,opacity*(1.0-getShadowMask()));
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
}`
), za = (
  /* glsl */
  `uniform float rotation;uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
vec4 mvPosition=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);vec2 scale;scale.x=length(vec3(modelMatrix[0].x,modelMatrix[0].y,modelMatrix[0].z));scale.y=length(vec3(modelMatrix[1].x,modelMatrix[1].y,modelMatrix[1].z));
#ifndef USE_SIZEATTENUATION
bool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)scale*=-mvPosition.z;
#endif
vec2 alignedPosition=(position.xy-(center-vec2(0.5)))*scale;vec2 rotatedPosition;rotatedPosition.x=cos(rotation)*alignedPosition.x-sin(rotation)*alignedPosition.y;rotatedPosition.y=sin(rotation)*alignedPosition.x+cos(rotation)*alignedPosition.y;mvPosition.xy+=rotatedPosition;gl_Position=projectionMatrix*mvPosition;
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
}`
), Ia = (
  /* glsl */
  `uniform vec3 diffuse;uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
outgoingLight=diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
}`
), UM = {
  alphahash_fragment: fs,
  alphahash_pars_fragment: ms,
  alphamap_fragment: Qs,
  alphamap_pars_fragment: ks,
  alphatest_fragment: Ss,
  alphatest_pars_fragment: Zs,
  aomap_fragment: _s,
  aomap_pars_fragment: bs,
  begin_vertex: Ks,
  beginnormal_vertex: Ps,
  bsdfs: Rs,
  iridescence_fragment: Fs,
  bumpmap_pars_fragment: Bs,
  clipping_planes_fragment: Vs,
  clipping_planes_pars_fragment: Gs,
  clipping_planes_pars_vertex: Hs,
  clipping_planes_vertex: Ws,
  color_fragment: qs,
  color_pars_fragment: Xs,
  color_pars_vertex: $s,
  color_vertex: Js,
  common: Mr,
  cube_uv_reflection_fragment: Dr,
  defaultnormal_vertex: tr,
  displacementmap_pars_vertex: er,
  displacementmap_vertex: Nr,
  emissivemap_fragment: ir,
  emissivemap_pars_fragment: Ar,
  colorspace_fragment: nr,
  colorspace_pars_fragment: zr,
  envmap_fragment: Ir,
  envmap_common_pars_fragment: Tr,
  envmap_pars_fragment: ur,
  envmap_pars_vertex: gr,
  envmap_physical_pars_fragment: Or,
  envmap_vertex: sr,
  fog_vertex: rr,
  fog_pars_vertex: cr,
  fog_fragment: ar,
  fog_pars_fragment: or,
  gradientmap_pars_fragment: yr,
  lightmap_fragment: jr,
  lightmap_pars_fragment: Cr,
  lights_lambert_fragment: Lr,
  lights_lambert_pars_fragment: wr,
  lights_pars_begin: xr,
  lights_toon_fragment: Er,
  lights_toon_pars_fragment: lr,
  lights_phong_fragment: hr,
  lights_phong_pars_fragment: dr,
  lights_physical_fragment: vr,
  lights_physical_pars_fragment: pr,
  lights_fragment_begin: Yr,
  lights_fragment_maps: Ur,
  lights_fragment_end: fr,
  logdepthbuf_fragment: mr,
  logdepthbuf_pars_fragment: Qr,
  logdepthbuf_pars_vertex: kr,
  logdepthbuf_vertex: Sr,
  map_fragment: Zr,
  map_pars_fragment: _r,
  map_particle_fragment: br,
  map_particle_pars_fragment: Kr,
  metalnessmap_fragment: Pr,
  metalnessmap_pars_fragment: Rr,
  morphcolor_vertex: Fr,
  morphnormal_vertex: Br,
  morphtarget_pars_vertex: Vr,
  morphtarget_vertex: Gr,
  normal_fragment_begin: Hr,
  normal_fragment_maps: Wr,
  normal_pars_fragment: qr,
  normal_pars_vertex: Xr,
  normal_vertex: $r,
  normalmap_pars_fragment: Jr,
  clearcoat_normal_fragment_begin: Mc,
  clearcoat_normal_fragment_maps: Dc,
  clearcoat_pars_fragment: tc,
  iridescence_pars_fragment: ec,
  opaque_fragment: Nc,
  packing: ic,
  premultiplied_alpha_fragment: Ac,
  project_vertex: nc,
  dithering_fragment: zc,
  dithering_pars_fragment: Ic,
  roughnessmap_fragment: Tc,
  roughnessmap_pars_fragment: uc,
  shadowmap_pars_fragment: gc,
  shadowmap_pars_vertex: sc,
  shadowmap_vertex: rc,
  shadowmask_pars_fragment: cc,
  skinbase_vertex: ac,
  skinning_pars_vertex: oc,
  skinning_vertex: yc,
  skinnormal_vertex: jc,
  specularmap_fragment: Cc,
  specularmap_pars_fragment: Lc,
  tonemapping_fragment: wc,
  tonemapping_pars_fragment: xc,
  transmission_fragment: Oc,
  transmission_pars_fragment: Ec,
  uv_pars_fragment: lc,
  uv_pars_vertex: hc,
  uv_vertex: dc,
  worldpos_vertex: vc,
  background_vert: pc,
  background_frag: Yc,
  backgroundCube_vert: Uc,
  backgroundCube_frag: fc,
  cube_vert: mc,
  cube_frag: Qc,
  depth_vert: kc,
  depth_frag: Sc,
  distanceRGBA_vert: Zc,
  distanceRGBA_frag: _c,
  equirect_vert: bc,
  equirect_frag: Kc,
  linedashed_vert: Pc,
  linedashed_frag: Rc,
  meshbasic_vert: Fc,
  meshbasic_frag: Bc,
  meshlambert_vert: Vc,
  meshlambert_frag: Gc,
  meshmatcap_vert: Hc,
  meshmatcap_frag: Wc,
  meshnormal_vert: qc,
  meshnormal_frag: Xc,
  meshphong_vert: $c,
  meshphong_frag: Jc,
  meshphysical_vert: Ma,
  meshphysical_frag: Da,
  meshtoon_vert: ta,
  meshtoon_frag: ea,
  points_vert: Na,
  points_frag: ia,
  shadow_vert: Aa,
  shadow_frag: na,
  sprite_vert: za,
  sprite_frag: Ia
}, iM = {
  common: {
    diffuse: { value: /* @__PURE__ */ new KM(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new SM() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new SM() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new SM() }
  },
  envmap: {
    envMap: { value: null },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new SM() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new SM() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new SM() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new SM() },
    normalScale: { value: /* @__PURE__ */ new rM(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new SM() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new SM() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new SM() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new SM() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new KM(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new KM(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new SM() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new SM() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new KM(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new rM(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new SM() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new SM() },
    alphaTest: { value: 0 }
  }
}, tt = {
  basic: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.specularmap,
      iM.envmap,
      iM.aomap,
      iM.lightmap,
      iM.fog
    ]),
    vertexShader: UM.meshbasic_vert,
    fragmentShader: UM.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.specularmap,
      iM.envmap,
      iM.aomap,
      iM.lightmap,
      iM.emissivemap,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.fog,
      iM.lights,
      {
        emissive: { value: /* @__PURE__ */ new KM(0) }
      }
    ]),
    vertexShader: UM.meshlambert_vert,
    fragmentShader: UM.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.specularmap,
      iM.envmap,
      iM.aomap,
      iM.lightmap,
      iM.emissivemap,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.fog,
      iM.lights,
      {
        emissive: { value: /* @__PURE__ */ new KM(0) },
        specular: { value: /* @__PURE__ */ new KM(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: UM.meshphong_vert,
    fragmentShader: UM.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.envmap,
      iM.aomap,
      iM.lightmap,
      iM.emissivemap,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.roughnessmap,
      iM.metalnessmap,
      iM.fog,
      iM.lights,
      {
        emissive: { value: /* @__PURE__ */ new KM(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
        // temporary
      }
    ]),
    vertexShader: UM.meshphysical_vert,
    fragmentShader: UM.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.aomap,
      iM.lightmap,
      iM.emissivemap,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.gradientmap,
      iM.fog,
      iM.lights,
      {
        emissive: { value: /* @__PURE__ */ new KM(0) }
      }
    ]),
    vertexShader: UM.meshtoon_vert,
    fragmentShader: UM.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: UM.meshmatcap_vert,
    fragmentShader: UM.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ LD([
      iM.points,
      iM.fog
    ]),
    vertexShader: UM.points_vert,
    fragmentShader: UM.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: UM.linedashed_vert,
    fragmentShader: UM.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.displacementmap
    ]),
    vertexShader: UM.depth_vert,
    fragmentShader: UM.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: UM.meshnormal_vert,
    fragmentShader: UM.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ LD([
      iM.sprite,
      iM.fog
    ]),
    vertexShader: UM.sprite_vert,
    fragmentShader: UM.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new SM() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: UM.background_vert,
    fragmentShader: UM.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: UM.backgroundCube_vert,
    fragmentShader: UM.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: UM.cube_vert,
    fragmentShader: UM.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: UM.equirect_vert,
    fragmentShader: UM.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new Y() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: UM.distanceRGBA_vert,
    fragmentShader: UM.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ LD([
      iM.lights,
      iM.fog,
      {
        color: { value: /* @__PURE__ */ new KM(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: UM.shadow_vert,
    fragmentShader: UM.shadow_frag
  }
};
tt.physical = {
  uniforms: /* @__PURE__ */ LD([
    tt.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new SM() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new SM() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new rM(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new SM() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new SM() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new SM() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new KM(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new SM() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new SM() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new SM() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new rM() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new SM() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new KM(0) },
      specularColor: { value: /* @__PURE__ */ new KM(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new SM() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new SM() },
      anisotropyVector: { value: /* @__PURE__ */ new rM() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new SM() }
    }
  ]),
  vertexShader: UM.meshphysical_vert,
  fragmentShader: UM.meshphysical_frag
};
const zi = { r: 0, b: 0, g: 0 };
function Ta(i, M, D, t, e, N, n) {
  const A = new KM(0);
  let z = N === !0 ? 0 : 1, I, T, u = null, g = 0, s = null;
  function a(c, r) {
    let w = !1, y = r.isScene === !0 ? r.background : null;
    y && y.isTexture && (y = (r.backgroundBlurriness > 0 ? D : M).get(y)), y === null ? o(A, z) : y && y.isColor && (o(y, 1), w = !0);
    const j = i.xr.getEnvironmentBlendMode();
    j === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, n) : j === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, n), (i.autoClear || w) && i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil), y && (y.isCubeTexture || y.mapping === Ji) ? (T === void 0 && (T = new Nt(
      new kN(1, 1, 1),
      new ue({
        name: "BackgroundCubeMaterial",
        uniforms: DN(tt.backgroundCube.uniforms),
        vertexShader: tt.backgroundCube.vertexShader,
        fragmentShader: tt.backgroundCube.fragmentShader,
        side: vD,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), T.geometry.deleteAttribute("normal"), T.geometry.deleteAttribute("uv"), T.onBeforeRender = function(l, d, h) {
      this.matrixWorld.copyPosition(h.matrixWorld);
    }, Object.defineProperty(T.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), e.update(T)), T.material.uniforms.envMap.value = y, T.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, T.material.uniforms.backgroundBlurriness.value = r.backgroundBlurriness, T.material.uniforms.backgroundIntensity.value = r.backgroundIntensity, T.material.toneMapped = RM.getTransfer(y.colorSpace) !== VM, (u !== y || g !== y.version || s !== i.toneMapping) && (T.material.needsUpdate = !0, u = y, g = y.version, s = i.toneMapping), T.layers.enableAll(), c.unshift(T, T.geometry, T.material, 0, 0, null)) : y && y.isTexture && (I === void 0 && (I = new Nt(
      new _n(2, 2),
      new ue({
        name: "BackgroundMaterial",
        uniforms: DN(tt.background.uniforms),
        vertexShader: tt.background.vertexShader,
        fragmentShader: tt.background.fragmentShader,
        side: Ft,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), I.geometry.deleteAttribute("normal"), Object.defineProperty(I.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), e.update(I)), I.material.uniforms.t2D.value = y, I.material.uniforms.backgroundIntensity.value = r.backgroundIntensity, I.material.toneMapped = RM.getTransfer(y.colorSpace) !== VM, y.matrixAutoUpdate === !0 && y.updateMatrix(), I.material.uniforms.uvTransform.value.copy(y.matrix), (u !== y || g !== y.version || s !== i.toneMapping) && (I.material.needsUpdate = !0, u = y, g = y.version, s = i.toneMapping), I.layers.enableAll(), c.unshift(I, I.geometry, I.material, 0, 0, null));
  }
  function o(c, r) {
    c.getRGB(zi, eu(i)), t.buffers.color.setClear(zi.r, zi.g, zi.b, r, n);
  }
  return {
    getClearColor: function() {
      return A;
    },
    setClearColor: function(c, r = 1) {
      A.set(c), z = r, o(A, z);
    },
    getClearAlpha: function() {
      return z;
    },
    setClearAlpha: function(c) {
      z = c, o(A, z);
    },
    render: a
  };
}
function ua(i, M, D, t) {
  const e = i.getParameter(34921), N = t.isWebGL2 ? null : M.get("OES_vertex_array_object"), n = t.isWebGL2 || N !== null, A = {}, z = c(null);
  let I = z, T = !1;
  function u(p, k, B, R, $) {
    let H = !1;
    if (n) {
      const V = o(R, B, k);
      I !== V && (I = V, s(I.object)), H = r(p, R, B, $), H && w(p, R, B, $);
    } else {
      const V = k.wireframe === !0;
      (I.geometry !== R.id || I.program !== B.id || I.wireframe !== V) && (I.geometry = R.id, I.program = B.id, I.wireframe = V, H = !0);
    }
    $ !== null && D.update($, 34963), (H || T) && (T = !1, S(p, k, B, R), $ !== null && i.bindBuffer(34963, D.get($).buffer));
  }
  function g() {
    return t.isWebGL2 ? i.createVertexArray() : N.createVertexArrayOES();
  }
  function s(p) {
    return t.isWebGL2 ? i.bindVertexArray(p) : N.bindVertexArrayOES(p);
  }
  function a(p) {
    return t.isWebGL2 ? i.deleteVertexArray(p) : N.deleteVertexArrayOES(p);
  }
  function o(p, k, B) {
    const R = B.wireframe === !0;
    let $ = A[p.id];
    $ === void 0 && ($ = {}, A[p.id] = $);
    let H = $[k.id];
    H === void 0 && (H = {}, $[k.id] = H);
    let V = H[R];
    return V === void 0 && (V = c(g()), H[R] = V), V;
  }
  function c(p) {
    const k = [], B = [], R = [];
    for (let $ = 0; $ < e; $++)
      k[$] = 0, B[$] = 0, R[$] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: k,
      enabledAttributes: B,
      attributeDivisors: R,
      object: p,
      attributes: {},
      index: null
    };
  }
  function r(p, k, B, R) {
    const $ = I.attributes, H = k.attributes;
    let V = 0;
    const U = B.getAttributes();
    for (const b in U)
      if (U[b].location >= 0) {
        const zM = $[b];
        let gM = H[b];
        if (gM === void 0 && (b === "instanceMatrix" && p.instanceMatrix && (gM = p.instanceMatrix), b === "instanceColor" && p.instanceColor && (gM = p.instanceColor)), zM === void 0 || zM.attribute !== gM || gM && zM.data !== gM.data)
          return !0;
        V++;
      }
    return I.attributesNum !== V || I.index !== R;
  }
  function w(p, k, B, R) {
    const $ = {}, H = k.attributes;
    let V = 0;
    const U = B.getAttributes();
    for (const b in U)
      if (U[b].location >= 0) {
        let zM = H[b];
        zM === void 0 && (b === "instanceMatrix" && p.instanceMatrix && (zM = p.instanceMatrix), b === "instanceColor" && p.instanceColor && (zM = p.instanceColor));
        const gM = {};
        gM.attribute = zM, zM && zM.data && (gM.data = zM.data), $[b] = gM, V++;
      }
    I.attributes = $, I.attributesNum = V, I.index = R;
  }
  function y() {
    const p = I.newAttributes;
    for (let k = 0, B = p.length; k < B; k++)
      p[k] = 0;
  }
  function j(p) {
    l(p, 0);
  }
  function l(p, k) {
    const B = I.newAttributes, R = I.enabledAttributes, $ = I.attributeDivisors;
    B[p] = 1, R[p] === 0 && (i.enableVertexAttribArray(p), R[p] = 1), $[p] !== k && ((t.isWebGL2 ? i : M.get("ANGLE_instanced_arrays"))[t.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](p, k), $[p] = k);
  }
  function d() {
    const p = I.newAttributes, k = I.enabledAttributes;
    for (let B = 0, R = k.length; B < R; B++)
      k[B] !== p[B] && (i.disableVertexAttribArray(B), k[B] = 0);
  }
  function h(p, k, B, R, $, H, V) {
    V === !0 ? i.vertexAttribIPointer(p, k, B, $, H) : i.vertexAttribPointer(p, k, B, R, $, H);
  }
  function S(p, k, B, R) {
    if (t.isWebGL2 === !1 && (p.isInstancedMesh || R.isInstancedBufferGeometry) && M.get("ANGLE_instanced_arrays") === null)
      return;
    y();
    const $ = R.attributes, H = B.getAttributes(), V = k.defaultAttributeValues;
    for (const U in H) {
      const b = H[U];
      if (b.location >= 0) {
        let nM = $[U];
        if (nM === void 0 && (U === "instanceMatrix" && p.instanceMatrix && (nM = p.instanceMatrix), U === "instanceColor" && p.instanceColor && (nM = p.instanceColor)), nM !== void 0) {
          const zM = nM.normalized, gM = nM.itemSize, yM = D.get(nM);
          if (yM === void 0)
            continue;
          const hM = yM.buffer, jM = yM.type, bM = yM.bytesPerElement, OD = t.isWebGL2 === !0 && (jM === 5124 || jM === 5125 || nM.gpuType === UT);
          if (nM.isInterleavedBufferAttribute) {
            const fM = nM.data, W = fM.stride, TD = nM.offset;
            if (fM.isInstancedInterleavedBuffer) {
              for (let CM = 0; CM < b.locationSize; CM++)
                l(b.location + CM, fM.meshPerAttribute);
              p.isInstancedMesh !== !0 && R._maxInstanceCount === void 0 && (R._maxInstanceCount = fM.meshPerAttribute * fM.count);
            } else
              for (let CM = 0; CM < b.locationSize; CM++)
                j(b.location + CM);
            i.bindBuffer(34962, hM);
            for (let CM = 0; CM < b.locationSize; CM++)
              h(
                b.location + CM,
                gM / b.locationSize,
                jM,
                zM,
                W * bM,
                (TD + gM / b.locationSize * CM) * bM,
                OD
              );
          } else {
            if (nM.isInstancedBufferAttribute) {
              for (let fM = 0; fM < b.locationSize; fM++)
                l(b.location + fM, nM.meshPerAttribute);
              p.isInstancedMesh !== !0 && R._maxInstanceCount === void 0 && (R._maxInstanceCount = nM.meshPerAttribute * nM.count);
            } else
              for (let fM = 0; fM < b.locationSize; fM++)
                j(b.location + fM);
            i.bindBuffer(34962, hM);
            for (let fM = 0; fM < b.locationSize; fM++)
              h(
                b.location + fM,
                gM / b.locationSize,
                jM,
                zM,
                gM * bM,
                gM / b.locationSize * fM * bM,
                OD
              );
          }
        } else if (V !== void 0) {
          const zM = V[U];
          if (zM !== void 0)
            switch (zM.length) {
              case 2:
                i.vertexAttrib2fv(b.location, zM);
                break;
              case 3:
                i.vertexAttrib3fv(b.location, zM);
                break;
              case 4:
                i.vertexAttrib4fv(b.location, zM);
                break;
              default:
                i.vertexAttrib1fv(b.location, zM);
            }
        }
      }
    }
    d();
  }
  function L() {
    F();
    for (const p in A) {
      const k = A[p];
      for (const B in k) {
        const R = k[B];
        for (const $ in R)
          a(R[$].object), delete R[$];
        delete k[B];
      }
      delete A[p];
    }
  }
  function O(p) {
    if (A[p.id] === void 0)
      return;
    const k = A[p.id];
    for (const B in k) {
      const R = k[B];
      for (const $ in R)
        a(R[$].object), delete R[$];
      delete k[B];
    }
    delete A[p.id];
  }
  function K(p) {
    for (const k in A) {
      const B = A[k];
      if (B[p.id] === void 0)
        continue;
      const R = B[p.id];
      for (const $ in R)
        a(R[$].object), delete R[$];
      delete B[p.id];
    }
  }
  function F() {
    G(), T = !0, I !== z && (I = z, s(I.object));
  }
  function G() {
    z.geometry = null, z.program = null, z.wireframe = !1;
  }
  return {
    setup: u,
    reset: F,
    resetDefaultState: G,
    dispose: L,
    releaseStatesOfGeometry: O,
    releaseStatesOfProgram: K,
    initAttributes: y,
    enableAttribute: j,
    disableUnusedAttributes: d
  };
}
function ga(i, M, D, t) {
  const e = t.isWebGL2;
  let N;
  function n(I) {
    N = I;
  }
  function A(I, T) {
    i.drawArrays(N, I, T), D.update(T, N, 1);
  }
  function z(I, T, u) {
    if (u === 0)
      return;
    let g, s;
    if (e)
      g = i, s = "drawArraysInstanced";
    else if (g = M.get("ANGLE_instanced_arrays"), s = "drawArraysInstancedANGLE", g === null) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    g[s](N, I, T, u), D.update(T, N, u);
  }
  this.setMode = n, this.render = A, this.renderInstances = z;
}
function sa(i, M, D) {
  let t;
  function e() {
    if (t !== void 0)
      return t;
    if (M.has("EXT_texture_filter_anisotropic") === !0) {
      const h = M.get("EXT_texture_filter_anisotropic");
      t = i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      t = 0;
    return t;
  }
  function N(h) {
    if (h === "highp") {
      if (i.getShaderPrecisionFormat(35633, 36338).precision > 0 && i.getShaderPrecisionFormat(35632, 36338).precision > 0)
        return "highp";
      h = "mediump";
    }
    return h === "mediump" && i.getShaderPrecisionFormat(35633, 36337).precision > 0 && i.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp";
  }
  const n = typeof WebGL2RenderingContext < "u" && i.constructor.name === "WebGL2RenderingContext";
  let A = D.precision !== void 0 ? D.precision : "highp";
  const z = N(A);
  z !== A && (console.warn("THREE.WebGLRenderer:", A, "not supported, using", z, "instead."), A = z);
  const I = n || M.has("WEBGL_draw_buffers"), T = D.logarithmicDepthBuffer === !0, u = i.getParameter(34930), g = i.getParameter(35660), s = i.getParameter(3379), a = i.getParameter(34076), o = i.getParameter(34921), c = i.getParameter(36347), r = i.getParameter(36348), w = i.getParameter(36349), y = g > 0, j = n || M.has("OES_texture_float"), l = y && j, d = n ? i.getParameter(36183) : 0;
  return {
    isWebGL2: n,
    drawBuffers: I,
    getMaxAnisotropy: e,
    getMaxPrecision: N,
    precision: A,
    logarithmicDepthBuffer: T,
    maxTextures: u,
    maxVertexTextures: g,
    maxTextureSize: s,
    maxCubemapSize: a,
    maxAttributes: o,
    maxVertexUniforms: c,
    maxVaryings: r,
    maxFragmentUniforms: w,
    vertexTextures: y,
    floatFragmentTextures: j,
    floatVertexTextures: l,
    maxSamples: d
  };
}
function ra(i) {
  const M = this;
  let D = null, t = 0, e = !1, N = !1;
  const n = new te(), A = new SM(), z = { value: null, needsUpdate: !1 };
  this.uniform = z, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, g) {
    const s = u.length !== 0 || g || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    t !== 0 || e;
    return e = g, t = u.length, s;
  }, this.beginShadows = function() {
    N = !0, T(null);
  }, this.endShadows = function() {
    N = !1;
  }, this.setGlobalState = function(u, g) {
    D = T(u, g, 0);
  }, this.setState = function(u, g, s) {
    const a = u.clippingPlanes, o = u.clipIntersection, c = u.clipShadows, r = i.get(u);
    if (!e || a === null || a.length === 0 || N && !c)
      N ? T(null) : I();
    else {
      const w = N ? 0 : t, y = w * 4;
      let j = r.clippingState || null;
      z.value = j, j = T(a, g, y, s);
      for (let l = 0; l !== y; ++l)
        j[l] = D[l];
      r.clippingState = j, this.numIntersection = o ? this.numPlanes : 0, this.numPlanes += w;
    }
  };
  function I() {
    z.value !== D && (z.value = D, z.needsUpdate = t > 0), M.numPlanes = t, M.numIntersection = 0;
  }
  function T(u, g, s, a) {
    const o = u !== null ? u.length : 0;
    let c = null;
    if (o !== 0) {
      if (c = z.value, a !== !0 || c === null) {
        const r = s + o * 4, w = g.matrixWorldInverse;
        A.getNormalMatrix(w), (c === null || c.length < r) && (c = new Float32Array(r));
        for (let y = 0, j = s; y !== o; ++y, j += 4)
          n.copy(u[y]).applyMatrix4(w, A), n.normal.toArray(c, j), c[j + 3] = n.constant;
      }
      z.value = c, z.needsUpdate = !0;
    }
    return M.numPlanes = o, M.numIntersection = 0, c;
  }
}
class ca extends NN {
  constructor(M = 1, D = 1, t = {}) {
    super(), this.isRenderTarget = !0, this.width = M, this.height = D, this.depth = 1, this.scissor = new nD(0, 0, M, D), this.scissorTest = !1, this.viewport = new nD(0, 0, M, D);
    const e = { width: M, height: D, depth: 1 };
    t.encoding !== void 0 && (wN("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."), t.colorSpace = t.encoding === Ie ? tD : RD), t = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: hD,
      depthBuffer: !0,
      stencilBuffer: !1,
      depthTexture: null,
      samples: 0
    }, t), this.texture = new Mt(e, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.flipY = !1, this.texture.generateMipmaps = t.generateMipmaps, this.texture.internalFormat = t.internalFormat, this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.depthTexture = t.depthTexture, this.samples = t.samples;
  }
  setSize(M, D, t = 1) {
    (this.width !== M || this.height !== D || this.depth !== t) && (this.width = M, this.height = D, this.depth = t, this.texture.image.width = M, this.texture.image.height = D, this.texture.image.depth = t, this.dispose()), this.viewport.set(0, 0, M, D), this.scissor.set(0, 0, M, D);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.width = M.width, this.height = M.height, this.depth = M.depth, this.scissor.copy(M.scissor), this.scissorTest = M.scissorTest, this.viewport.copy(M.viewport), this.texture = M.texture.clone(), this.texture.isRenderTargetTexture = !0;
    const D = Object.assign({}, M.texture.image);
    return this.texture.source = new qT(D), this.depthBuffer = M.depthBuffer, this.stencilBuffer = M.stencilBuffer, M.depthTexture !== null && (this.depthTexture = M.depthTexture.clone()), this.samples = M.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class ge extends ca {
  constructor(M = 1, D = 1, t = {}) {
    super(M, D, t), this.isWebGLRenderTarget = !0;
  }
}
const ve = -90, pe = 1;
class aa extends pD {
  constructor(M, D, t) {
    super(), this.type = "CubeCamera", this.renderTarget = t, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const e = new PD(ve, pe, M, D);
    e.layers = this.layers, this.add(e);
    const N = new PD(ve, pe, M, D);
    N.layers = this.layers, this.add(N);
    const n = new PD(ve, pe, M, D);
    n.layers = this.layers, this.add(n);
    const A = new PD(ve, pe, M, D);
    A.layers = this.layers, this.add(A);
    const z = new PD(ve, pe, M, D);
    z.layers = this.layers, this.add(z);
    const I = new PD(ve, pe, M, D);
    I.layers = this.layers, this.add(I);
  }
  updateCoordinateSystem() {
    const M = this.coordinateSystem, D = this.children.concat(), [t, e, N, n, A, z] = D;
    for (const I of D)
      this.remove(I);
    if (M === Et)
      t.up.set(0, 1, 0), t.lookAt(1, 0, 0), e.up.set(0, 1, 0), e.lookAt(-1, 0, 0), N.up.set(0, 0, -1), N.lookAt(0, 1, 0), n.up.set(0, 0, 1), n.lookAt(0, -1, 0), A.up.set(0, 1, 0), A.lookAt(0, 0, 1), z.up.set(0, 1, 0), z.lookAt(0, 0, -1);
    else if (M === qi)
      t.up.set(0, -1, 0), t.lookAt(-1, 0, 0), e.up.set(0, -1, 0), e.lookAt(1, 0, 0), N.up.set(0, 0, 1), N.lookAt(0, 1, 0), n.up.set(0, 0, -1), n.lookAt(0, -1, 0), A.up.set(0, -1, 0), A.lookAt(0, 0, 1), z.up.set(0, -1, 0), z.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + M);
    for (const I of D)
      this.add(I), I.updateMatrixWorld();
  }
  update(M, D) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: t, activeMipmapLevel: e } = this;
    this.coordinateSystem !== M.coordinateSystem && (this.coordinateSystem = M.coordinateSystem, this.updateCoordinateSystem());
    const [N, n, A, z, I, T] = this.children, u = M.getRenderTarget(), g = M.getActiveCubeFace(), s = M.getActiveMipmapLevel(), a = M.xr.enabled;
    M.xr.enabled = !1;
    const o = t.texture.generateMipmaps;
    t.texture.generateMipmaps = !1, M.setRenderTarget(t, 0, e), M.render(D, N), M.setRenderTarget(t, 1, e), M.render(D, n), M.setRenderTarget(t, 2, e), M.render(D, A), M.setRenderTarget(t, 3, e), M.render(D, z), M.setRenderTarget(t, 4, e), M.render(D, I), t.texture.generateMipmaps = o, M.setRenderTarget(t, 5, e), M.render(D, T), M.setRenderTarget(u, g, s), M.xr.enabled = a, t.texture.needsPMREMUpdate = !0;
  }
}
class Nu extends Mt {
  constructor(M, D, t, e, N, n, A, z, I, T) {
    M = M !== void 0 ? M : [], D = D !== void 0 ? D : $e, super(M, D, t, e, N, n, A, z, I, T), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(M) {
    this.image = M;
  }
}
class oa extends ge {
  constructor(M = 1, D = {}) {
    super(M, M, D), this.isWebGLCubeRenderTarget = !0;
    const t = { width: M, height: M, depth: 1 }, e = [t, t, t, t, t, t];
    D.encoding !== void 0 && (wN("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."), D.colorSpace = D.encoding === Ie ? tD : RD), this.texture = new Nu(e, D.mapping, D.wrapS, D.wrapT, D.magFilter, D.minFilter, D.format, D.type, D.anisotropy, D.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = D.generateMipmaps !== void 0 ? D.generateMipmaps : !1, this.texture.minFilter = D.minFilter !== void 0 ? D.minFilter : hD;
  }
  fromEquirectangularTexture(M, D) {
    this.texture.type = D.type, this.texture.colorSpace = D.colorSpace, this.texture.generateMipmaps = D.generateMipmaps, this.texture.minFilter = D.minFilter, this.texture.magFilter = D.magFilter;
    const t = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `varying vec3 vWorldDirection;vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
}`
      ),
      fragmentShader: (
        /* glsl */
        `uniform sampler2D tEquirect;varying vec3 vWorldDirection;
#include <common>
void main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);}`
      )
    }, e = new kN(5, 5, 5), N = new ue({
      name: "CubemapFromEquirect",
      uniforms: DN(t.uniforms),
      vertexShader: t.vertexShader,
      fragmentShader: t.fragmentShader,
      side: vD,
      blending: Kt
    });
    N.uniforms.tEquirect.value = D;
    const n = new Nt(e, N), A = D.minFilter;
    return D.minFilter === lN && (D.minFilter = hD), new aa(1, 10, this).update(M, n), D.minFilter = A, n.geometry.dispose(), n.material.dispose(), this;
  }
  clear(M, D, t, e) {
    const N = M.getRenderTarget();
    for (let n = 0; n < 6; n++)
      M.setRenderTarget(this, n), M.clear(D, t, e);
    M.setRenderTarget(N);
  }
}
function ya(i) {
  let M = /* @__PURE__ */ new WeakMap();
  function D(n, A) {
    return A === Cn ? n.mapping = $e : A === Ln && (n.mapping = Je), n;
  }
  function t(n) {
    if (n && n.isTexture && n.isRenderTargetTexture === !1) {
      const A = n.mapping;
      if (A === Cn || A === Ln)
        if (M.has(n)) {
          const z = M.get(n).texture;
          return D(z, n.mapping);
        } else {
          const z = n.image;
          if (z && z.height > 0) {
            const I = new oa(z.height / 2);
            return I.fromEquirectangularTexture(i, n), M.set(n, I), n.addEventListener("dispose", e), D(I.texture, n.mapping);
          } else
            return null;
        }
    }
    return n;
  }
  function e(n) {
    const A = n.target;
    A.removeEventListener("dispose", e);
    const z = M.get(A);
    z !== void 0 && (M.delete(A), z.dispose());
  }
  function N() {
    M = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: N
  };
}
const Ve = 4, eI = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], ie = 20, ZA = /* @__PURE__ */ new GT(), NI = /* @__PURE__ */ new KM();
let _A = null;
const Ne = (1 + Math.sqrt(5)) / 2, Ye = 1 / Ne, iI = [
  /* @__PURE__ */ new Y(1, 1, 1),
  /* @__PURE__ */ new Y(-1, 1, 1),
  /* @__PURE__ */ new Y(1, 1, -1),
  /* @__PURE__ */ new Y(-1, 1, -1),
  /* @__PURE__ */ new Y(0, Ne, Ye),
  /* @__PURE__ */ new Y(0, Ne, -Ye),
  /* @__PURE__ */ new Y(Ye, 0, Ne),
  /* @__PURE__ */ new Y(-Ye, 0, Ne),
  /* @__PURE__ */ new Y(Ne, Ye, 0),
  /* @__PURE__ */ new Y(-Ne, Ye, 0)
];
class AI {
  constructor(M) {
    this._renderer = M, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(M, D = 0, t = 0.1, e = 100) {
    _A = this._renderer.getRenderTarget(), this._setSize(256);
    const N = this._allocateTargets();
    return N.depthBuffer = !0, this._sceneToCubeUV(M, t, e, N), D > 0 && this._blur(N, 0, 0, D), this._applyPMREM(N), this._cleanup(N), N;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   */
  fromEquirectangular(M, D = null) {
    return this._fromTexture(M, D);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   */
  fromCubemap(M, D = null) {
    return this._fromTexture(M, D);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = II(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = zI(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(M) {
    this._lodMax = Math.floor(Math.log2(M)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let M = 0; M < this._lodPlanes.length; M++)
      this._lodPlanes[M].dispose();
  }
  _cleanup(M) {
    this._renderer.setRenderTarget(_A), M.scissorTest = !1, Ii(M, 0, 0, M.width, M.height);
  }
  _fromTexture(M, D) {
    M.mapping === $e || M.mapping === Je ? this._setSize(M.image.length === 0 ? 16 : M.image[0].width || M.image[0].image.width) : this._setSize(M.image.width / 4), _A = this._renderer.getRenderTarget();
    const t = D || this._allocateTargets();
    return this._textureToCubeUV(M, t), this._applyPMREM(t), this._cleanup(t), t;
  }
  _allocateTargets() {
    const M = 3 * Math.max(this._cubeSize, 112), D = 4 * this._cubeSize, t = {
      magFilter: hD,
      minFilter: hD,
      generateMipmaps: !1,
      type: hN,
      format: JD,
      colorSpace: dt,
      depthBuffer: !1
    }, e = nI(M, D, t);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== M || this._pingPongRenderTarget.height !== D) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = nI(M, D, t);
      const { _lodMax: N } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = ja(N)), this._blurMaterial = Ca(N, M, D);
    }
    return e;
  }
  _compileMaterial(M) {
    const D = new Nt(this._lodPlanes[0], M);
    this._renderer.compile(D, ZA);
  }
  _sceneToCubeUV(M, D, t, e) {
    const A = new PD(90, 1, D, t), z = [1, -1, 1, 1, 1, 1], I = [1, 1, 1, -1, -1, -1], T = this._renderer, u = T.autoClear, g = T.toneMapping;
    T.getClearColor(NI), T.toneMapping = Pt, T.autoClear = !1;
    const s = new $T({
      name: "PMREM.Background",
      side: vD,
      depthWrite: !1,
      depthTest: !1
    }), a = new Nt(new kN(), s);
    let o = !1;
    const c = M.background;
    c ? c.isColor && (s.color.copy(c), M.background = null, o = !0) : (s.color.copy(NI), o = !0);
    for (let r = 0; r < 6; r++) {
      const w = r % 3;
      w === 0 ? (A.up.set(0, z[r], 0), A.lookAt(I[r], 0, 0)) : w === 1 ? (A.up.set(0, 0, z[r]), A.lookAt(0, I[r], 0)) : (A.up.set(0, z[r], 0), A.lookAt(0, 0, I[r]));
      const y = this._cubeSize;
      Ii(e, w * y, r > 2 ? y : 0, y, y), T.setRenderTarget(e), o && T.render(a, A), T.render(M, A);
    }
    a.geometry.dispose(), a.material.dispose(), T.toneMapping = g, T.autoClear = u, M.background = c;
  }
  _textureToCubeUV(M, D) {
    const t = this._renderer, e = M.mapping === $e || M.mapping === Je;
    e ? (this._cubemapMaterial === null && (this._cubemapMaterial = II()), this._cubemapMaterial.uniforms.flipEnvMap.value = M.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = zI());
    const N = e ? this._cubemapMaterial : this._equirectMaterial, n = new Nt(this._lodPlanes[0], N), A = N.uniforms;
    A.envMap.value = M;
    const z = this._cubeSize;
    Ii(D, 0, 0, 3 * z, 2 * z), t.setRenderTarget(D), t.render(n, ZA);
  }
  _applyPMREM(M) {
    const D = this._renderer, t = D.autoClear;
    D.autoClear = !1;
    for (let e = 1; e < this._lodPlanes.length; e++) {
      const N = Math.sqrt(this._sigmas[e] * this._sigmas[e] - this._sigmas[e - 1] * this._sigmas[e - 1]), n = iI[(e - 1) % iI.length];
      this._blur(M, e - 1, e, N, n);
    }
    D.autoClear = t;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(M, D, t, e, N) {
    const n = this._pingPongRenderTarget;
    this._halfBlur(
      M,
      n,
      D,
      t,
      e,
      "latitudinal",
      N
    ), this._halfBlur(
      n,
      M,
      t,
      t,
      e,
      "longitudinal",
      N
    );
  }
  _halfBlur(M, D, t, e, N, n, A) {
    const z = this._renderer, I = this._blurMaterial;
    n !== "latitudinal" && n !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const T = 3, u = new Nt(this._lodPlanes[e], I), g = I.uniforms, s = this._sizeLods[t] - 1, a = isFinite(N) ? Math.PI / (2 * s) : 2 * Math.PI / (2 * ie - 1), o = N / a, c = isFinite(N) ? 1 + Math.floor(T * o) : ie;
    c > ie && console.warn(`sigmaRadians, ${N}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${ie}`);
    const r = [];
    let w = 0;
    for (let h = 0; h < ie; ++h) {
      const S = h / o, L = Math.exp(-S * S / 2);
      r.push(L), h === 0 ? w += L : h < c && (w += 2 * L);
    }
    for (let h = 0; h < r.length; h++)
      r[h] = r[h] / w;
    g.envMap.value = M.texture, g.samples.value = c, g.weights.value = r, g.latitudinal.value = n === "latitudinal", A && (g.poleAxis.value = A);
    const { _lodMax: y } = this;
    g.dTheta.value = a, g.mipInt.value = y - t;
    const j = this._sizeLods[e], l = 3 * j * (e > y - Ve ? e - y + Ve : 0), d = 4 * (this._cubeSize - j);
    Ii(D, l, d, 3 * j, 2 * j), z.setRenderTarget(D), z.render(u, ZA);
  }
}
function ja(i) {
  const M = [], D = [], t = [];
  let e = i;
  const N = i - Ve + 1 + eI.length;
  for (let n = 0; n < N; n++) {
    const A = Math.pow(2, e);
    D.push(A);
    let z = 1 / A;
    n > i - Ve ? z = eI[n - i + Ve - 1] : n === 0 && (z = 0), t.push(z);
    const I = 1 / (A - 2), T = -I, u = 1 + I, g = [T, T, u, T, u, u, T, T, u, u, T, u], s = 6, a = 6, o = 3, c = 2, r = 1, w = new Float32Array(o * a * s), y = new Float32Array(c * a * s), j = new Float32Array(r * a * s);
    for (let d = 0; d < s; d++) {
      const h = d % 3 * 2 / 3 - 1, S = d > 2 ? 0 : -1, L = [
        h,
        S,
        0,
        h + 2 / 3,
        S,
        0,
        h + 2 / 3,
        S + 1,
        0,
        h,
        S,
        0,
        h + 2 / 3,
        S + 1,
        0,
        h,
        S + 1,
        0
      ];
      w.set(L, o * a * d), y.set(g, c * a * d);
      const O = [d, d, d, d, d, d];
      j.set(O, r * a * d);
    }
    const l = new AN();
    l.setAttribute("position", new it(w, o)), l.setAttribute("uv", new it(y, c)), l.setAttribute("faceIndex", new it(j, r)), M.push(l), e > Ve && e--;
  }
  return { lodPlanes: M, sizeLods: D, sigmas: t };
}
function nI(i, M, D) {
  const t = new ge(i, M, D);
  return t.texture.mapping = Ji, t.texture.name = "PMREM.cubeUv", t.scissorTest = !0, t;
}
function Ii(i, M, D, t, e) {
  i.viewport.set(M, D, t, e), i.scissor.set(M, D, t, e);
}
function Ca(i, M, D) {
  const t = new Float32Array(ie), e = new Y(0, 1, 0);
  return new ue({
    name: "SphericalGaussianBlur",
    defines: {
      n: ie,
      CUBEUV_TEXEL_WIDTH: 1 / M,
      CUBEUV_TEXEL_HEIGHT: 1 / D,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: t },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: e }
    },
    vertexShader: bn(),
    fragmentShader: (
      /* glsl */
      `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;uniform int samples;uniform float weights[n];uniform bool latitudinal;uniform float dTheta;uniform float mipInt;uniform vec3 poleAxis;
#define ENVMAP_TYPE_CUBE_UV
#include <cube_uv_reflection_fragment>
vec3 getSample(float theta,vec3 axis){float cosTheta=cos(theta);vec3 sampleDirection=vOutputDirection*cosTheta+cross(axis,vOutputDirection)*sin(theta)+axis*dot(axis,vOutputDirection)*(1.0-cosTheta);return bilinearCubeUV(envMap,sampleDirection,mipInt);}void main(){vec3 axis=latitudinal?poleAxis:cross(poleAxis,vOutputDirection);if(all(equal(axis,vec3(0.0)))){axis=vec3(vOutputDirection.z,0.0,-vOutputDirection.x);}axis=normalize(axis);gl_FragColor=vec4(0.0,0.0,0.0,1.0);gl_FragColor.rgb+=weights[0]*getSample(0.0,axis);for(int i=1;i<n;i++){if(i>=samples){break;}float theta=dTheta*float(i);gl_FragColor.rgb+=weights[i]*getSample(-1.0*theta,axis);gl_FragColor.rgb+=weights[i]*getSample(theta,axis);}}`
    ),
    blending: Kt,
    depthTest: !1,
    depthWrite: !1
  });
}
function zI() {
  return new ue({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: bn(),
    fragmentShader: (
      /* glsl */
      `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;
#include <common>
void main(){vec3 outputDirection=normalize(vOutputDirection);vec2 uv=equirectUv(outputDirection);gl_FragColor=vec4(texture2D(envMap,uv).rgb,1.0);}`
    ),
    blending: Kt,
    depthTest: !1,
    depthWrite: !1
  });
}
function II() {
  return new ue({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: bn(),
    fragmentShader: (
      /* glsl */
      "precision mediump float;precision mediump int;uniform float flipEnvMap;varying vec3 vOutputDirection;uniform samplerCube envMap;void main(){gl_FragColor=textureCube(envMap,vec3(flipEnvMap*vOutputDirection.x,vOutputDirection.yz));}"
    ),
    blending: Kt,
    depthTest: !1,
    depthWrite: !1
  });
}
function bn() {
  return (
    /* glsl */
    "precision mediump float;precision mediump int;attribute float faceIndex;varying vec3 vOutputDirection;vec3 getDirection(vec2 uv,float face){uv=2.0*uv-1.0;vec3 direction=vec3(uv,1.0);if(face==0.0){direction=direction.zyx;}else if(face==1.0){direction=direction.xzy;direction.xz*=-1.0;}else if(face==2.0){direction.x*=-1.0;}else if(face==3.0){direction=direction.zyx;direction.xz*=-1.0;}else if(face==4.0){direction=direction.xzy;direction.xy*=-1.0;}else if(face==5.0){direction.z*=-1.0;}return direction;}void main(){vOutputDirection=getDirection(uv,faceIndex);gl_Position=vec4(position,1.0);}"
  );
}
function La(i) {
  let M = /* @__PURE__ */ new WeakMap(), D = null;
  function t(A) {
    if (A && A.isTexture) {
      const z = A.mapping, I = z === Cn || z === Ln, T = z === $e || z === Je;
      if (I || T)
        if (A.isRenderTargetTexture && A.needsPMREMUpdate === !0) {
          A.needsPMREMUpdate = !1;
          let u = M.get(A);
          return D === null && (D = new AI(i)), u = I ? D.fromEquirectangular(A, u) : D.fromCubemap(A, u), M.set(A, u), u.texture;
        } else {
          if (M.has(A))
            return M.get(A).texture;
          {
            const u = A.image;
            if (I && u && u.height > 0 || T && u && e(u)) {
              D === null && (D = new AI(i));
              const g = I ? D.fromEquirectangular(A) : D.fromCubemap(A);
              return M.set(A, g), A.addEventListener("dispose", N), g.texture;
            } else
              return null;
          }
        }
    }
    return A;
  }
  function e(A) {
    let z = 0;
    const I = 6;
    for (let T = 0; T < I; T++)
      A[T] !== void 0 && z++;
    return z === I;
  }
  function N(A) {
    const z = A.target;
    z.removeEventListener("dispose", N);
    const I = M.get(z);
    I !== void 0 && (M.delete(z), I.dispose());
  }
  function n() {
    M = /* @__PURE__ */ new WeakMap(), D !== null && (D.dispose(), D = null);
  }
  return {
    get: t,
    dispose: n
  };
}
function wa(i) {
  const M = {};
  function D(t) {
    if (M[t] !== void 0)
      return M[t];
    let e;
    switch (t) {
      case "WEBGL_depth_texture":
        e = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        e = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        e = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        e = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        e = i.getExtension(t);
    }
    return M[t] = e, e;
  }
  return {
    has: function(t) {
      return D(t) !== null;
    },
    init: function(t) {
      t.isWebGL2 ? D("EXT_color_buffer_float") : (D("WEBGL_depth_texture"), D("OES_texture_float"), D("OES_texture_half_float"), D("OES_texture_half_float_linear"), D("OES_standard_derivatives"), D("OES_element_index_uint"), D("OES_vertex_array_object"), D("ANGLE_instanced_arrays")), D("OES_texture_float_linear"), D("EXT_color_buffer_half_float"), D("WEBGL_multisampled_render_to_texture");
    },
    get: function(t) {
      const e = D(t);
      return e === null && console.warn("THREE.WebGLRenderer: " + t + " extension not supported."), e;
    }
  };
}
function xa(i, M, D, t) {
  const e = {}, N = /* @__PURE__ */ new WeakMap();
  function n(u) {
    const g = u.target;
    g.index !== null && M.remove(g.index);
    for (const a in g.attributes)
      M.remove(g.attributes[a]);
    for (const a in g.morphAttributes) {
      const o = g.morphAttributes[a];
      for (let c = 0, r = o.length; c < r; c++)
        M.remove(o[c]);
    }
    g.removeEventListener("dispose", n), delete e[g.id];
    const s = N.get(g);
    s && (M.remove(s), N.delete(g)), t.releaseStatesOfGeometry(g), g.isInstancedBufferGeometry === !0 && delete g._maxInstanceCount, D.memory.geometries--;
  }
  function A(u, g) {
    return e[g.id] === !0 || (g.addEventListener("dispose", n), e[g.id] = !0, D.memory.geometries++), g;
  }
  function z(u) {
    const g = u.attributes;
    for (const a in g)
      M.update(g[a], 34962);
    const s = u.morphAttributes;
    for (const a in s) {
      const o = s[a];
      for (let c = 0, r = o.length; c < r; c++)
        M.update(o[c], 34962);
    }
  }
  function I(u) {
    const g = [], s = u.index, a = u.attributes.position;
    let o = 0;
    if (s !== null) {
      const w = s.array;
      o = s.version;
      for (let y = 0, j = w.length; y < j; y += 3) {
        const l = w[y + 0], d = w[y + 1], h = w[y + 2];
        g.push(l, d, d, h, h, l);
      }
    } else if (a !== void 0) {
      const w = a.array;
      o = a.version;
      for (let y = 0, j = w.length / 3 - 1; y < j; y += 3) {
        const l = y + 0, d = y + 1, h = y + 2;
        g.push(l, d, d, h, h, l);
      }
    } else
      return;
    const c = new (HT(g) ? Mu : JT)(g, 1);
    c.version = o;
    const r = N.get(u);
    r && M.remove(r), N.set(u, c);
  }
  function T(u) {
    const g = N.get(u);
    if (g) {
      const s = u.index;
      s !== null && g.version < s.version && I(u);
    } else
      I(u);
    return N.get(u);
  }
  return {
    get: A,
    update: z,
    getWireframeAttribute: T
  };
}
function Oa(i, M, D, t) {
  const e = t.isWebGL2;
  let N;
  function n(g) {
    N = g;
  }
  let A, z;
  function I(g) {
    A = g.type, z = g.bytesPerElement;
  }
  function T(g, s) {
    i.drawElements(N, s, A, g * z), D.update(s, N, 1);
  }
  function u(g, s, a) {
    if (a === 0)
      return;
    let o, c;
    if (e)
      o = i, c = "drawElementsInstanced";
    else if (o = M.get("ANGLE_instanced_arrays"), c = "drawElementsInstancedANGLE", o === null) {
      console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    o[c](N, s, A, g * z, a), D.update(s, N, a);
  }
  this.setMode = n, this.setIndex = I, this.render = T, this.renderInstances = u;
}
function Ea(i) {
  const M = {
    geometries: 0,
    textures: 0
  }, D = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function t(N, n, A) {
    switch (D.calls++, n) {
      case 4:
        D.triangles += A * (N / 3);
        break;
      case 1:
        D.lines += A * (N / 2);
        break;
      case 3:
        D.lines += A * (N - 1);
        break;
      case 2:
        D.lines += A * N;
        break;
      case 0:
        D.points += A * N;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", n);
        break;
    }
  }
  function e() {
    D.calls = 0, D.triangles = 0, D.points = 0, D.lines = 0;
  }
  return {
    memory: M,
    render: D,
    programs: null,
    autoReset: !0,
    reset: e,
    update: t
  };
}
class iu extends Mt {
  constructor(M = null, D = 1, t = 1, e = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: M, width: D, height: t, depth: e }, this.magFilter = wD, this.minFilter = wD, this.wrapR = $D, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
function la(i, M) {
  return i[0] - M[0];
}
function ha(i, M) {
  return Math.abs(M[1]) - Math.abs(i[1]);
}
function da(i, M, D) {
  const t = {}, e = new Float32Array(8), N = /* @__PURE__ */ new WeakMap(), n = new nD(), A = [];
  for (let I = 0; I < 8; I++)
    A[I] = [I, 0];
  function z(I, T, u) {
    const g = I.morphTargetInfluences;
    if (M.isWebGL2 === !0) {
      const a = T.morphAttributes.position || T.morphAttributes.normal || T.morphAttributes.color, o = a !== void 0 ? a.length : 0;
      let c = N.get(T);
      if (c === void 0 || c.count !== o) {
        let k = function() {
          G.dispose(), N.delete(T), T.removeEventListener("dispose", k);
        };
        var s = k;
        c !== void 0 && c.texture.dispose();
        const y = T.morphAttributes.position !== void 0, j = T.morphAttributes.normal !== void 0, l = T.morphAttributes.color !== void 0, d = T.morphAttributes.position || [], h = T.morphAttributes.normal || [], S = T.morphAttributes.color || [];
        let L = 0;
        y === !0 && (L = 1), j === !0 && (L = 2), l === !0 && (L = 3);
        let O = T.attributes.position.count * L, K = 1;
        O > M.maxTextureSize && (K = Math.ceil(O / M.maxTextureSize), O = M.maxTextureSize);
        const F = new Float32Array(O * K * 4 * o), G = new iu(F, O, K, o);
        G.type = bt, G.needsUpdate = !0;
        const p = L * 4;
        for (let B = 0; B < o; B++) {
          const R = d[B], $ = h[B], H = S[B], V = O * K * 4 * B;
          for (let U = 0; U < R.count; U++) {
            const b = U * p;
            y === !0 && (n.fromBufferAttribute(R, U), F[V + b + 0] = n.x, F[V + b + 1] = n.y, F[V + b + 2] = n.z, F[V + b + 3] = 0), j === !0 && (n.fromBufferAttribute($, U), F[V + b + 4] = n.x, F[V + b + 5] = n.y, F[V + b + 6] = n.z, F[V + b + 7] = 0), l === !0 && (n.fromBufferAttribute(H, U), F[V + b + 8] = n.x, F[V + b + 9] = n.y, F[V + b + 10] = n.z, F[V + b + 11] = H.itemSize === 4 ? n.w : 1);
          }
        }
        c = {
          count: o,
          texture: G,
          size: new rM(O, K)
        }, N.set(T, c), T.addEventListener("dispose", k);
      }
      let r = 0;
      for (let y = 0; y < g.length; y++)
        r += g[y];
      const w = T.morphTargetsRelative ? 1 : 1 - r;
      u.getUniforms().setValue(i, "morphTargetBaseInfluence", w), u.getUniforms().setValue(i, "morphTargetInfluences", g), u.getUniforms().setValue(i, "morphTargetsTexture", c.texture, D), u.getUniforms().setValue(i, "morphTargetsTextureSize", c.size);
    } else {
      const a = g === void 0 ? 0 : g.length;
      let o = t[T.id];
      if (o === void 0 || o.length !== a) {
        o = [];
        for (let j = 0; j < a; j++)
          o[j] = [j, 0];
        t[T.id] = o;
      }
      for (let j = 0; j < a; j++) {
        const l = o[j];
        l[0] = j, l[1] = g[j];
      }
      o.sort(ha);
      for (let j = 0; j < 8; j++)
        j < a && o[j][1] ? (A[j][0] = o[j][0], A[j][1] = o[j][1]) : (A[j][0] = Number.MAX_SAFE_INTEGER, A[j][1] = 0);
      A.sort(la);
      const c = T.morphAttributes.position, r = T.morphAttributes.normal;
      let w = 0;
      for (let j = 0; j < 8; j++) {
        const l = A[j], d = l[0], h = l[1];
        d !== Number.MAX_SAFE_INTEGER && h ? (c && T.getAttribute("morphTarget" + j) !== c[d] && T.setAttribute("morphTarget" + j, c[d]), r && T.getAttribute("morphNormal" + j) !== r[d] && T.setAttribute("morphNormal" + j, r[d]), e[j] = h, w += h) : (c && T.hasAttribute("morphTarget" + j) === !0 && T.deleteAttribute("morphTarget" + j), r && T.hasAttribute("morphNormal" + j) === !0 && T.deleteAttribute("morphNormal" + j), e[j] = 0);
      }
      const y = T.morphTargetsRelative ? 1 : 1 - w;
      u.getUniforms().setValue(i, "morphTargetBaseInfluence", y), u.getUniforms().setValue(i, "morphTargetInfluences", e);
    }
  }
  return {
    update: z
  };
}
function va(i, M, D, t) {
  let e = /* @__PURE__ */ new WeakMap();
  function N(z) {
    const I = t.render.frame, T = z.geometry, u = M.get(z, T);
    if (e.get(u) !== I && (M.update(u), e.set(u, I)), z.isInstancedMesh && (z.hasEventListener("dispose", A) === !1 && z.addEventListener("dispose", A), e.get(z) !== I && (D.update(z.instanceMatrix, 34962), z.instanceColor !== null && D.update(z.instanceColor, 34962), e.set(z, I))), z.isSkinnedMesh) {
      const g = z.skeleton;
      e.get(g) !== I && (g.update(), e.set(g, I));
    }
    return u;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  function A(z) {
    const I = z.target;
    I.removeEventListener("dispose", A), D.remove(I.instanceMatrix), I.instanceColor !== null && D.remove(I.instanceColor);
  }
  return {
    update: N,
    dispose: n
  };
}
class pa extends Mt {
  constructor(M = null, D = 1, t = 1, e = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: M, width: D, height: t, depth: e }, this.magFilter = wD, this.minFilter = wD, this.wrapR = $D, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const Au = /* @__PURE__ */ new Mt(), nu = /* @__PURE__ */ new iu(), zu = /* @__PURE__ */ new pa(), Iu = /* @__PURE__ */ new Nu(), TI = [], uI = [], gI = new Float32Array(16), sI = new Float32Array(9), rI = new Float32Array(4);
function nN(i, M, D) {
  const t = i[0];
  if (t <= 0 || t > 0)
    return i;
  const e = M * D;
  let N = TI[e];
  if (N === void 0 && (N = new Float32Array(e), TI[e] = N), M !== 0) {
    t.toArray(N, 0);
    for (let n = 1, A = 0; n !== M; ++n)
      A += D, i[n].toArray(N, A);
  }
  return N;
}
function eD(i, M) {
  if (i.length !== M.length)
    return !1;
  for (let D = 0, t = i.length; D < t; D++)
    if (i[D] !== M[D])
      return !1;
  return !0;
}
function ND(i, M) {
  for (let D = 0, t = M.length; D < t; D++)
    i[D] = M[D];
}
function DA(i, M) {
  let D = uI[M];
  D === void 0 && (D = new Int32Array(M), uI[M] = D);
  for (let t = 0; t !== M; ++t)
    D[t] = i.allocateTextureUnit();
  return D;
}
function Ya(i, M) {
  const D = this.cache;
  D[0] !== M && (i.uniform1f(this.addr, M), D[0] = M);
}
function Ua(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (i.uniform2f(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (eD(D, M))
      return;
    i.uniform2fv(this.addr, M), ND(D, M);
  }
}
function fa(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (i.uniform3f(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else if (M.r !== void 0)
    (D[0] !== M.r || D[1] !== M.g || D[2] !== M.b) && (i.uniform3f(this.addr, M.r, M.g, M.b), D[0] = M.r, D[1] = M.g, D[2] = M.b);
  else {
    if (eD(D, M))
      return;
    i.uniform3fv(this.addr, M), ND(D, M);
  }
}
function ma(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (i.uniform4f(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (eD(D, M))
      return;
    i.uniform4fv(this.addr, M), ND(D, M);
  }
}
function Qa(i, M) {
  const D = this.cache, t = M.elements;
  if (t === void 0) {
    if (eD(D, M))
      return;
    i.uniformMatrix2fv(this.addr, !1, M), ND(D, M);
  } else {
    if (eD(D, t))
      return;
    rI.set(t), i.uniformMatrix2fv(this.addr, !1, rI), ND(D, t);
  }
}
function ka(i, M) {
  const D = this.cache, t = M.elements;
  if (t === void 0) {
    if (eD(D, M))
      return;
    i.uniformMatrix3fv(this.addr, !1, M), ND(D, M);
  } else {
    if (eD(D, t))
      return;
    sI.set(t), i.uniformMatrix3fv(this.addr, !1, sI), ND(D, t);
  }
}
function Sa(i, M) {
  const D = this.cache, t = M.elements;
  if (t === void 0) {
    if (eD(D, M))
      return;
    i.uniformMatrix4fv(this.addr, !1, M), ND(D, M);
  } else {
    if (eD(D, t))
      return;
    gI.set(t), i.uniformMatrix4fv(this.addr, !1, gI), ND(D, t);
  }
}
function Za(i, M) {
  const D = this.cache;
  D[0] !== M && (i.uniform1i(this.addr, M), D[0] = M);
}
function _a(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (i.uniform2i(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (eD(D, M))
      return;
    i.uniform2iv(this.addr, M), ND(D, M);
  }
}
function ba(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (i.uniform3i(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else {
    if (eD(D, M))
      return;
    i.uniform3iv(this.addr, M), ND(D, M);
  }
}
function Ka(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (i.uniform4i(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (eD(D, M))
      return;
    i.uniform4iv(this.addr, M), ND(D, M);
  }
}
function Pa(i, M) {
  const D = this.cache;
  D[0] !== M && (i.uniform1ui(this.addr, M), D[0] = M);
}
function Ra(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (i.uniform2ui(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (eD(D, M))
      return;
    i.uniform2uiv(this.addr, M), ND(D, M);
  }
}
function Fa(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (i.uniform3ui(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else {
    if (eD(D, M))
      return;
    i.uniform3uiv(this.addr, M), ND(D, M);
  }
}
function Ba(i, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (i.uniform4ui(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (eD(D, M))
      return;
    i.uniform4uiv(this.addr, M), ND(D, M);
  }
}
function Va(i, M, D) {
  const t = this.cache, e = D.allocateTextureUnit();
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e), D.setTexture2D(M || Au, e);
}
function Ga(i, M, D) {
  const t = this.cache, e = D.allocateTextureUnit();
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e), D.setTexture3D(M || zu, e);
}
function Ha(i, M, D) {
  const t = this.cache, e = D.allocateTextureUnit();
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e), D.setTextureCube(M || Iu, e);
}
function Wa(i, M, D) {
  const t = this.cache, e = D.allocateTextureUnit();
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e), D.setTexture2DArray(M || nu, e);
}
function qa(i) {
  switch (i) {
    case 5126:
      return Ya;
    case 35664:
      return Ua;
    case 35665:
      return fa;
    case 35666:
      return ma;
    case 35674:
      return Qa;
    case 35675:
      return ka;
    case 35676:
      return Sa;
    case 5124:
    case 35670:
      return Za;
    case 35667:
    case 35671:
      return _a;
    case 35668:
    case 35672:
      return ba;
    case 35669:
    case 35673:
      return Ka;
    case 5125:
      return Pa;
    case 36294:
      return Ra;
    case 36295:
      return Fa;
    case 36296:
      return Ba;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Va;
    case 35679:
    case 36299:
    case 36307:
      return Ga;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Ha;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Wa;
  }
}
function Xa(i, M) {
  i.uniform1fv(this.addr, M);
}
function $a(i, M) {
  const D = nN(M, this.size, 2);
  i.uniform2fv(this.addr, D);
}
function Ja(i, M) {
  const D = nN(M, this.size, 3);
  i.uniform3fv(this.addr, D);
}
function M0(i, M) {
  const D = nN(M, this.size, 4);
  i.uniform4fv(this.addr, D);
}
function D0(i, M) {
  const D = nN(M, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, D);
}
function t0(i, M) {
  const D = nN(M, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, D);
}
function e0(i, M) {
  const D = nN(M, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, D);
}
function N0(i, M) {
  i.uniform1iv(this.addr, M);
}
function i0(i, M) {
  i.uniform2iv(this.addr, M);
}
function A0(i, M) {
  i.uniform3iv(this.addr, M);
}
function n0(i, M) {
  i.uniform4iv(this.addr, M);
}
function z0(i, M) {
  i.uniform1uiv(this.addr, M);
}
function I0(i, M) {
  i.uniform2uiv(this.addr, M);
}
function T0(i, M) {
  i.uniform3uiv(this.addr, M);
}
function u0(i, M) {
  i.uniform4uiv(this.addr, M);
}
function g0(i, M, D) {
  const t = this.cache, e = M.length, N = DA(D, e);
  eD(t, N) || (i.uniform1iv(this.addr, N), ND(t, N));
  for (let n = 0; n !== e; ++n)
    D.setTexture2D(M[n] || Au, N[n]);
}
function s0(i, M, D) {
  const t = this.cache, e = M.length, N = DA(D, e);
  eD(t, N) || (i.uniform1iv(this.addr, N), ND(t, N));
  for (let n = 0; n !== e; ++n)
    D.setTexture3D(M[n] || zu, N[n]);
}
function r0(i, M, D) {
  const t = this.cache, e = M.length, N = DA(D, e);
  eD(t, N) || (i.uniform1iv(this.addr, N), ND(t, N));
  for (let n = 0; n !== e; ++n)
    D.setTextureCube(M[n] || Iu, N[n]);
}
function c0(i, M, D) {
  const t = this.cache, e = M.length, N = DA(D, e);
  eD(t, N) || (i.uniform1iv(this.addr, N), ND(t, N));
  for (let n = 0; n !== e; ++n)
    D.setTexture2DArray(M[n] || nu, N[n]);
}
function a0(i) {
  switch (i) {
    case 5126:
      return Xa;
    case 35664:
      return $a;
    case 35665:
      return Ja;
    case 35666:
      return M0;
    case 35674:
      return D0;
    case 35675:
      return t0;
    case 35676:
      return e0;
    case 5124:
    case 35670:
      return N0;
    case 35667:
    case 35671:
      return i0;
    case 35668:
    case 35672:
      return A0;
    case 35669:
    case 35673:
      return n0;
    case 5125:
      return z0;
    case 36294:
      return I0;
    case 36295:
      return T0;
    case 36296:
      return u0;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return g0;
    case 35679:
    case 36299:
    case 36307:
      return s0;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return r0;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return c0;
  }
}
class o0 {
  constructor(M, D, t) {
    this.id = M, this.addr = t, this.cache = [], this.setValue = qa(D.type);
  }
}
class y0 {
  constructor(M, D, t) {
    this.id = M, this.addr = t, this.cache = [], this.size = D.size, this.setValue = a0(D.type);
  }
}
class j0 {
  constructor(M) {
    this.id = M, this.seq = [], this.map = {};
  }
  setValue(M, D, t) {
    const e = this.seq;
    for (let N = 0, n = e.length; N !== n; ++N) {
      const A = e[N];
      A.setValue(M, D[A.id], t);
    }
  }
}
const bA = /(\w+)(\])?(\[|\.)?/g;
function cI(i, M) {
  i.seq.push(M), i.map[M.id] = M;
}
function C0(i, M, D) {
  const t = i.name, e = t.length;
  for (bA.lastIndex = 0; ; ) {
    const N = bA.exec(t), n = bA.lastIndex;
    let A = N[1];
    const z = N[2] === "]", I = N[3];
    if (z && (A = A | 0), I === void 0 || I === "[" && n + 2 === e) {
      cI(D, I === void 0 ? new o0(A, i, M) : new y0(A, i, M));
      break;
    } else {
      let u = D.map[A];
      u === void 0 && (u = new j0(A), cI(D, u)), D = u;
    }
  }
}
class _i {
  constructor(M, D) {
    this.seq = [], this.map = {};
    const t = M.getProgramParameter(D, 35718);
    for (let e = 0; e < t; ++e) {
      const N = M.getActiveUniform(D, e), n = M.getUniformLocation(D, N.name);
      C0(N, n, this);
    }
  }
  setValue(M, D, t, e) {
    const N = this.map[D];
    N !== void 0 && N.setValue(M, t, e);
  }
  setOptional(M, D, t) {
    const e = D[t];
    e !== void 0 && this.setValue(M, t, e);
  }
  static upload(M, D, t, e) {
    for (let N = 0, n = D.length; N !== n; ++N) {
      const A = D[N], z = t[A.id];
      z.needsUpdate !== !1 && A.setValue(M, z.value, e);
    }
  }
  static seqWithValue(M, D) {
    const t = [];
    for (let e = 0, N = M.length; e !== N; ++e) {
      const n = M[e];
      n.id in D && t.push(n);
    }
    return t;
  }
}
function aI(i, M, D) {
  const t = i.createShader(M);
  return i.shaderSource(t, D), i.compileShader(t), t;
}
let L0 = 0;
function w0(i, M) {
  const D = i.split(`
`), t = [], e = Math.max(M - 6, 0), N = Math.min(M + 6, D.length);
  for (let n = e; n < N; n++) {
    const A = n + 1;
    t.push(`${A === M ? ">" : " "} ${A}: ${D[n]}`);
  }
  return t.join(`
`);
}
function x0(i) {
  const M = RM.getPrimaries(RM.workingColorSpace), D = RM.getPrimaries(i);
  let t;
  switch (M === D ? t = "" : M === Wi && D === Hi ? t = "LinearDisplayP3ToLinearSRGB" : M === Hi && D === Wi && (t = "LinearSRGBToLinearDisplayP3"), i) {
    case dt:
    case MA:
      return [t, "LinearTransferOETF"];
    case tD:
    case Qn:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [t, "LinearTransferOETF"];
  }
}
function oI(i, M, D) {
  const t = i.getShaderParameter(M, 35713), e = i.getShaderInfoLog(M).trim();
  if (t && e === "")
    return "";
  const N = /ERROR: 0:(\d+)/.exec(e);
  if (N) {
    const n = parseInt(N[1]);
    return D.toUpperCase() + `

` + e + `

` + w0(i.getShaderSource(M), n);
  } else
    return e;
}
function O0(i, M) {
  const D = x0(M);
  return `vec4 ${i}( vec4 value ) { return ${D[0]}( ${D[1]}( value ) ); }`;
}
function E0(i, M) {
  let D;
  switch (M) {
    case vg:
      D = "Linear";
      break;
    case pg:
      D = "Reinhard";
      break;
    case Yg:
      D = "OptimizedCineon";
      break;
    case Ug:
      D = "ACESFilmic";
      break;
    case fg:
      D = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", M), D = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + D + "ToneMapping( color ); }";
}
function l0(i) {
  return [
    i.extensionDerivatives || i.envMapCubeUVHeight || i.bumpMap || i.normalMapTangentSpace || i.clearcoatNormalMap || i.flatShading || i.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "",
    (i.extensionFragDepth || i.logarithmicDepthBuffer) && i.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
    i.extensionDrawBuffers && i.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
    (i.extensionShaderTextureLOD || i.envMap || i.transmission) && i.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""
  ].filter(jN).join(`
`);
}
function h0(i) {
  const M = [];
  for (const D in i) {
    const t = i[D];
    t !== !1 && M.push("#define " + D + " " + t);
  }
  return M.join(`
`);
}
function d0(i, M) {
  const D = {}, t = i.getProgramParameter(M, 35721);
  for (let e = 0; e < t; e++) {
    const N = i.getActiveAttrib(M, e), n = N.name;
    let A = 1;
    N.type === 35674 && (A = 2), N.type === 35675 && (A = 3), N.type === 35676 && (A = 4), D[n] = {
      type: N.type,
      location: i.getAttribLocation(M, n),
      locationSize: A
    };
  }
  return D;
}
function jN(i) {
  return i !== "";
}
function yI(i, M) {
  const D = M.numSpotLightShadows + M.numSpotLightMaps - M.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, M.numDirLights).replace(/NUM_SPOT_LIGHTS/g, M.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, M.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, D).replace(/NUM_RECT_AREA_LIGHTS/g, M.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, M.numPointLights).replace(/NUM_HEMI_LIGHTS/g, M.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, M.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, M.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, M.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, M.numPointLightShadows);
}
function jI(i, M) {
  return i.replace(/NUM_CLIPPING_PLANES/g, M.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, M.numClippingPlanes - M.numClipIntersection);
}
const v0 = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ln(i) {
  return i.replace(v0, Y0);
}
const p0 = /* @__PURE__ */ new Map([
  ["encodings_fragment", "colorspace_fragment"],
  // @deprecated, r154
  ["encodings_pars_fragment", "colorspace_pars_fragment"],
  // @deprecated, r154
  ["output_fragment", "opaque_fragment"]
  // @deprecated, r154
]);
function Y0(i, M) {
  let D = UM[M];
  if (D === void 0) {
    const t = p0.get(M);
    if (t !== void 0)
      D = UM[t], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', M, t);
    else
      throw new Error("Can not resolve #include <" + M + ">");
  }
  return ln(D);
}
const U0 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function CI(i) {
  return i.replace(U0, f0);
}
function f0(i, M, D, t) {
  let e = "";
  for (let N = parseInt(M); N < parseInt(D); N++)
    e += t.replace(/\[\s*i\s*\]/g, "[ " + N + " ]").replace(/UNROLLED_LOOP_INDEX/g, N);
  return e;
}
function LI(i) {
  let M = "precision " + i.precision + ` float;
precision ` + i.precision + " int;";
  return i.precision === "highp" ? M += `
#define HIGH_PRECISION` : i.precision === "mediump" ? M += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (M += `
#define LOW_PRECISION`), M;
}
function m0(i) {
  let M = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === dT ? M = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === ng ? M = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === wt && (M = "SHADOWMAP_TYPE_VSM"), M;
}
function Q0(i) {
  let M = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case $e:
      case Je:
        M = "ENVMAP_TYPE_CUBE";
        break;
      case Ji:
        M = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return M;
}
function k0(i) {
  let M = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case Je:
        M = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return M;
}
function S0(i) {
  let M = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case fn:
        M = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case hg:
        M = "ENVMAP_BLENDING_MIX";
        break;
      case dg:
        M = "ENVMAP_BLENDING_ADD";
        break;
    }
  return M;
}
function Z0(i) {
  const M = i.envMapCubeUVHeight;
  if (M === null)
    return null;
  const D = Math.log2(M) - 2, t = 1 / M;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, D), 7 * 16)), texelHeight: t, maxMip: D };
}
function _0(i, M, D, t) {
  const e = i.getContext(), N = D.defines;
  let n = D.vertexShader, A = D.fragmentShader;
  const z = m0(D), I = Q0(D), T = k0(D), u = S0(D), g = Z0(D), s = D.isWebGL2 ? "" : l0(D), a = h0(N), o = e.createProgram();
  let c, r, w = D.glslVersion ? "#version " + D.glslVersion + `
` : "";
  D.isRawShaderMaterial ? (c = [
    "#define SHADER_TYPE " + D.shaderType,
    "#define SHADER_NAME " + D.shaderName,
    a
  ].filter(jN).join(`
`), c.length > 0 && (c += `
`), r = [
    s,
    "#define SHADER_TYPE " + D.shaderType,
    "#define SHADER_NAME " + D.shaderName,
    a
  ].filter(jN).join(`
`), r.length > 0 && (r += `
`)) : (c = [
    LI(D),
    "#define SHADER_TYPE " + D.shaderType,
    "#define SHADER_NAME " + D.shaderName,
    a,
    D.instancing ? "#define USE_INSTANCING" : "",
    D.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    D.useFog && D.fog ? "#define USE_FOG" : "",
    D.useFog && D.fogExp2 ? "#define FOG_EXP2" : "",
    D.map ? "#define USE_MAP" : "",
    D.envMap ? "#define USE_ENVMAP" : "",
    D.envMap ? "#define " + T : "",
    D.lightMap ? "#define USE_LIGHTMAP" : "",
    D.aoMap ? "#define USE_AOMAP" : "",
    D.bumpMap ? "#define USE_BUMPMAP" : "",
    D.normalMap ? "#define USE_NORMALMAP" : "",
    D.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    D.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    D.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    D.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    D.anisotropy ? "#define USE_ANISOTROPY" : "",
    D.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    D.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    D.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    D.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    D.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    D.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    D.specularMap ? "#define USE_SPECULARMAP" : "",
    D.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    D.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    D.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    D.metalnessMap ? "#define USE_METALNESSMAP" : "",
    D.alphaMap ? "#define USE_ALPHAMAP" : "",
    D.alphaHash ? "#define USE_ALPHAHASH" : "",
    D.transmission ? "#define USE_TRANSMISSION" : "",
    D.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    D.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    D.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    D.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    D.mapUv ? "#define MAP_UV " + D.mapUv : "",
    D.alphaMapUv ? "#define ALPHAMAP_UV " + D.alphaMapUv : "",
    D.lightMapUv ? "#define LIGHTMAP_UV " + D.lightMapUv : "",
    D.aoMapUv ? "#define AOMAP_UV " + D.aoMapUv : "",
    D.emissiveMapUv ? "#define EMISSIVEMAP_UV " + D.emissiveMapUv : "",
    D.bumpMapUv ? "#define BUMPMAP_UV " + D.bumpMapUv : "",
    D.normalMapUv ? "#define NORMALMAP_UV " + D.normalMapUv : "",
    D.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + D.displacementMapUv : "",
    D.metalnessMapUv ? "#define METALNESSMAP_UV " + D.metalnessMapUv : "",
    D.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + D.roughnessMapUv : "",
    D.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + D.anisotropyMapUv : "",
    D.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + D.clearcoatMapUv : "",
    D.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + D.clearcoatNormalMapUv : "",
    D.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + D.clearcoatRoughnessMapUv : "",
    D.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + D.iridescenceMapUv : "",
    D.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + D.iridescenceThicknessMapUv : "",
    D.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + D.sheenColorMapUv : "",
    D.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + D.sheenRoughnessMapUv : "",
    D.specularMapUv ? "#define SPECULARMAP_UV " + D.specularMapUv : "",
    D.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + D.specularColorMapUv : "",
    D.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + D.specularIntensityMapUv : "",
    D.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + D.transmissionMapUv : "",
    D.thicknessMapUv ? "#define THICKNESSMAP_UV " + D.thicknessMapUv : "",
    //
    D.vertexTangents && D.flatShading === !1 ? "#define USE_TANGENT" : "",
    D.vertexColors ? "#define USE_COLOR" : "",
    D.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    D.vertexUv1s ? "#define USE_UV1" : "",
    D.vertexUv2s ? "#define USE_UV2" : "",
    D.vertexUv3s ? "#define USE_UV3" : "",
    D.pointsUvs ? "#define USE_POINTS_UV" : "",
    D.flatShading ? "#define FLAT_SHADED" : "",
    D.skinning ? "#define USE_SKINNING" : "",
    D.morphTargets ? "#define USE_MORPHTARGETS" : "",
    D.morphNormals && D.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    D.morphColors && D.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
    D.morphTargetsCount > 0 && D.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
    D.morphTargetsCount > 0 && D.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + D.morphTextureStride : "",
    D.morphTargetsCount > 0 && D.isWebGL2 ? "#define MORPHTARGETS_COUNT " + D.morphTargetsCount : "",
    D.doubleSided ? "#define DOUBLE_SIDED" : "",
    D.flipSided ? "#define FLIP_SIDED" : "",
    D.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    D.shadowMapEnabled ? "#define " + z : "",
    D.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    D.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    D.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    D.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    D.logarithmicDepthBuffer && D.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
    "	attribute vec3 morphTarget0;",
    "	attribute vec3 morphTarget1;",
    "	attribute vec3 morphTarget2;",
    "	attribute vec3 morphTarget3;",
    "	#ifdef USE_MORPHNORMALS",
    "		attribute vec3 morphNormal0;",
    "		attribute vec3 morphNormal1;",
    "		attribute vec3 morphNormal2;",
    "		attribute vec3 morphNormal3;",
    "	#else",
    "		attribute vec3 morphTarget4;",
    "		attribute vec3 morphTarget5;",
    "		attribute vec3 morphTarget6;",
    "		attribute vec3 morphTarget7;",
    "	#endif",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(jN).join(`
`), r = [
    s,
    LI(D),
    "#define SHADER_TYPE " + D.shaderType,
    "#define SHADER_NAME " + D.shaderName,
    a,
    D.useFog && D.fog ? "#define USE_FOG" : "",
    D.useFog && D.fogExp2 ? "#define FOG_EXP2" : "",
    D.map ? "#define USE_MAP" : "",
    D.matcap ? "#define USE_MATCAP" : "",
    D.envMap ? "#define USE_ENVMAP" : "",
    D.envMap ? "#define " + I : "",
    D.envMap ? "#define " + T : "",
    D.envMap ? "#define " + u : "",
    g ? "#define CUBEUV_TEXEL_WIDTH " + g.texelWidth : "",
    g ? "#define CUBEUV_TEXEL_HEIGHT " + g.texelHeight : "",
    g ? "#define CUBEUV_MAX_MIP " + g.maxMip + ".0" : "",
    D.lightMap ? "#define USE_LIGHTMAP" : "",
    D.aoMap ? "#define USE_AOMAP" : "",
    D.bumpMap ? "#define USE_BUMPMAP" : "",
    D.normalMap ? "#define USE_NORMALMAP" : "",
    D.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    D.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    D.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    D.anisotropy ? "#define USE_ANISOTROPY" : "",
    D.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    D.clearcoat ? "#define USE_CLEARCOAT" : "",
    D.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    D.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    D.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    D.iridescence ? "#define USE_IRIDESCENCE" : "",
    D.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    D.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    D.specularMap ? "#define USE_SPECULARMAP" : "",
    D.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    D.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    D.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    D.metalnessMap ? "#define USE_METALNESSMAP" : "",
    D.alphaMap ? "#define USE_ALPHAMAP" : "",
    D.alphaTest ? "#define USE_ALPHATEST" : "",
    D.alphaHash ? "#define USE_ALPHAHASH" : "",
    D.sheen ? "#define USE_SHEEN" : "",
    D.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    D.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    D.transmission ? "#define USE_TRANSMISSION" : "",
    D.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    D.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    D.vertexTangents && D.flatShading === !1 ? "#define USE_TANGENT" : "",
    D.vertexColors || D.instancingColor ? "#define USE_COLOR" : "",
    D.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    D.vertexUv1s ? "#define USE_UV1" : "",
    D.vertexUv2s ? "#define USE_UV2" : "",
    D.vertexUv3s ? "#define USE_UV3" : "",
    D.pointsUvs ? "#define USE_POINTS_UV" : "",
    D.gradientMap ? "#define USE_GRADIENTMAP" : "",
    D.flatShading ? "#define FLAT_SHADED" : "",
    D.doubleSided ? "#define DOUBLE_SIDED" : "",
    D.flipSided ? "#define FLIP_SIDED" : "",
    D.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    D.shadowMapEnabled ? "#define " + z : "",
    D.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    D.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    D.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    D.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    D.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    D.logarithmicDepthBuffer && D.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    D.toneMapping !== Pt ? "#define TONE_MAPPING" : "",
    D.toneMapping !== Pt ? UM.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    D.toneMapping !== Pt ? E0("toneMapping", D.toneMapping) : "",
    D.dithering ? "#define DITHERING" : "",
    D.opaque ? "#define OPAQUE" : "",
    UM.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    O0("linearToOutputTexel", D.outputColorSpace),
    D.useDepthPacking ? "#define DEPTH_PACKING " + D.depthPacking : "",
    `
`
  ].filter(jN).join(`
`)), n = ln(n), n = yI(n, D), n = jI(n, D), A = ln(A), A = yI(A, D), A = jI(A, D), n = CI(n), A = CI(A), D.isWebGL2 && D.isRawShaderMaterial !== !0 && (w = `#version 300 es
`, c = [
    "precision mediump sampler2DArray;",
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + c, r = [
    "#define varying in",
    D.glslVersion === Zz ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    D.glslVersion === Zz ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + r);
  const y = w + c + n, j = w + r + A, l = aI(e, 35633, y), d = aI(e, 35632, j);
  if (e.attachShader(o, l), e.attachShader(o, d), D.index0AttributeName !== void 0 ? e.bindAttribLocation(o, 0, D.index0AttributeName) : D.morphTargets === !0 && e.bindAttribLocation(o, 0, "position"), e.linkProgram(o), i.debug.checkShaderErrors) {
    const L = e.getProgramInfoLog(o).trim(), O = e.getShaderInfoLog(l).trim(), K = e.getShaderInfoLog(d).trim();
    let F = !0, G = !0;
    if (e.getProgramParameter(o, 35714) === !1)
      if (F = !1, typeof i.debug.onShaderError == "function")
        i.debug.onShaderError(e, o, l, d);
      else {
        const p = oI(e, l, "vertex"), k = oI(e, d, "fragment");
        console.error(
          "THREE.WebGLProgram: Shader Error " + e.getError() + " - VALIDATE_STATUS " + e.getProgramParameter(o, 35715) + `

Program Info Log: ` + L + `
` + p + `
` + k
        );
      }
    else
      L !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", L) : (O === "" || K === "") && (G = !1);
    G && (this.diagnostics = {
      runnable: F,
      programLog: L,
      vertexShader: {
        log: O,
        prefix: c
      },
      fragmentShader: {
        log: K,
        prefix: r
      }
    });
  }
  e.deleteShader(l), e.deleteShader(d);
  let h;
  this.getUniforms = function() {
    return h === void 0 && (h = new _i(e, o)), h;
  };
  let S;
  return this.getAttributes = function() {
    return S === void 0 && (S = d0(e, o)), S;
  }, this.destroy = function() {
    t.releaseStatesOfProgram(this), e.deleteProgram(o), this.program = void 0;
  }, this.type = D.shaderType, this.name = D.shaderName, this.id = L0++, this.cacheKey = M, this.usedTimes = 1, this.program = o, this.vertexShader = l, this.fragmentShader = d, this;
}
let b0 = 0;
class K0 {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(M) {
    const D = M.vertexShader, t = M.fragmentShader, e = this._getShaderStage(D), N = this._getShaderStage(t), n = this._getShaderCacheForMaterial(M);
    return n.has(e) === !1 && (n.add(e), e.usedTimes++), n.has(N) === !1 && (n.add(N), N.usedTimes++), this;
  }
  remove(M) {
    const D = this.materialCache.get(M);
    for (const t of D)
      t.usedTimes--, t.usedTimes === 0 && this.shaderCache.delete(t.code);
    return this.materialCache.delete(M), this;
  }
  getVertexShaderID(M) {
    return this._getShaderStage(M.vertexShader).id;
  }
  getFragmentShaderID(M) {
    return this._getShaderStage(M.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(M) {
    const D = this.materialCache;
    let t = D.get(M);
    return t === void 0 && (t = /* @__PURE__ */ new Set(), D.set(M, t)), t;
  }
  _getShaderStage(M) {
    const D = this.shaderCache;
    let t = D.get(M);
    return t === void 0 && (t = new P0(M), D.set(M, t)), t;
  }
}
class P0 {
  constructor(M) {
    this.id = b0++, this.code = M, this.usedTimes = 0;
  }
}
function R0(i, M, D, t, e, N, n) {
  const A = new PT(), z = new K0(), I = [], T = e.isWebGL2, u = e.logarithmicDepthBuffer, g = e.vertexTextures;
  let s = e.precision;
  const a = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function o(L) {
    return L === 0 ? "uv" : `uv${L}`;
  }
  function c(L, O, K, F, G) {
    const p = F.fog, k = G.geometry, B = L.isMeshStandardMaterial ? F.environment : null, R = (L.isMeshStandardMaterial ? D : M).get(L.envMap || B), $ = R && R.mapping === Ji ? R.image.height : null, H = a[L.type];
    L.precision !== null && (s = e.getMaxPrecision(L.precision), s !== L.precision && console.warn("THREE.WebGLProgram.getParameters:", L.precision, "not supported, using", s, "instead."));
    const V = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, U = V !== void 0 ? V.length : 0;
    let b = 0;
    k.morphAttributes.position !== void 0 && (b = 1), k.morphAttributes.normal !== void 0 && (b = 2), k.morphAttributes.color !== void 0 && (b = 3);
    let nM, zM, gM, yM;
    if (H) {
      const BM = tt[H];
      nM = BM.vertexShader, zM = BM.fragmentShader;
    } else
      nM = L.vertexShader, zM = L.fragmentShader, z.update(L), gM = z.getVertexShaderID(L), yM = z.getFragmentShaderID(L);
    const hM = i.getRenderTarget(), jM = G.isInstancedMesh === !0, bM = !!L.map, OD = !!L.matcap, fM = !!R, W = !!L.aoMap, TD = !!L.lightMap, CM = !!L.bumpMap, pM = !!L.normalMap, lM = !!L.displacementMap, GM = !!L.emissiveMap, ZM = !!L.metalnessMap, mM = !!L.roughnessMap, FM = L.anisotropy > 0, zD = L.clearcoat > 0, uD = L.iridescence > 0, E = L.sheen > 0, C = L.transmission > 0, Q = FM && !!L.anisotropyMap, MM = zD && !!L.clearcoatMap, X = zD && !!L.clearcoatNormalMap, DM = zD && !!L.clearcoatRoughnessMap, sM = uD && !!L.iridescenceMap, NM = uD && !!L.iridescenceThicknessMap, IM = E && !!L.sheenColorMap, wM = E && !!L.sheenRoughnessMap, _M = !!L.specularMap, J = !!L.specularColorMap, PM = !!L.specularIntensityMap, dM = C && !!L.transmissionMap, xM = C && !!L.thicknessMap, oM = !!L.gradientMap, v = !!L.alphaMap, eM = L.alphaTest > 0, tM = !!L.alphaHash, TM = !!L.extensions, AM = !!k.attributes.uv1, q = !!k.attributes.uv2, cM = !!k.attributes.uv3;
    let vM = Pt;
    return L.toneMapped && (hM === null || hM.isXRRenderTarget === !0) && (vM = i.toneMapping), {
      isWebGL2: T,
      shaderID: H,
      shaderType: L.type,
      shaderName: L.name,
      vertexShader: nM,
      fragmentShader: zM,
      defines: L.defines,
      customVertexShaderID: gM,
      customFragmentShaderID: yM,
      isRawShaderMaterial: L.isRawShaderMaterial === !0,
      glslVersion: L.glslVersion,
      precision: s,
      instancing: jM,
      instancingColor: jM && G.instanceColor !== null,
      supportsVertexTextures: g,
      outputColorSpace: hM === null ? i.outputColorSpace : hM.isXRRenderTarget === !0 ? hM.texture.colorSpace : dt,
      map: bM,
      matcap: OD,
      envMap: fM,
      envMapMode: fM && R.mapping,
      envMapCubeUVHeight: $,
      aoMap: W,
      lightMap: TD,
      bumpMap: CM,
      normalMap: pM,
      displacementMap: g && lM,
      emissiveMap: GM,
      normalMapObjectSpace: pM && L.normalMapType === Vg,
      normalMapTangentSpace: pM && L.normalMapType === _T,
      metalnessMap: ZM,
      roughnessMap: mM,
      anisotropy: FM,
      anisotropyMap: Q,
      clearcoat: zD,
      clearcoatMap: MM,
      clearcoatNormalMap: X,
      clearcoatRoughnessMap: DM,
      iridescence: uD,
      iridescenceMap: sM,
      iridescenceThicknessMap: NM,
      sheen: E,
      sheenColorMap: IM,
      sheenRoughnessMap: wM,
      specularMap: _M,
      specularColorMap: J,
      specularIntensityMap: PM,
      transmission: C,
      transmissionMap: dM,
      thicknessMap: xM,
      gradientMap: oM,
      opaque: L.transparent === !1 && L.blending === He,
      alphaMap: v,
      alphaTest: eM,
      alphaHash: tM,
      combine: L.combine,
      //
      mapUv: bM && o(L.map.channel),
      aoMapUv: W && o(L.aoMap.channel),
      lightMapUv: TD && o(L.lightMap.channel),
      bumpMapUv: CM && o(L.bumpMap.channel),
      normalMapUv: pM && o(L.normalMap.channel),
      displacementMapUv: lM && o(L.displacementMap.channel),
      emissiveMapUv: GM && o(L.emissiveMap.channel),
      metalnessMapUv: ZM && o(L.metalnessMap.channel),
      roughnessMapUv: mM && o(L.roughnessMap.channel),
      anisotropyMapUv: Q && o(L.anisotropyMap.channel),
      clearcoatMapUv: MM && o(L.clearcoatMap.channel),
      clearcoatNormalMapUv: X && o(L.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: DM && o(L.clearcoatRoughnessMap.channel),
      iridescenceMapUv: sM && o(L.iridescenceMap.channel),
      iridescenceThicknessMapUv: NM && o(L.iridescenceThicknessMap.channel),
      sheenColorMapUv: IM && o(L.sheenColorMap.channel),
      sheenRoughnessMapUv: wM && o(L.sheenRoughnessMap.channel),
      specularMapUv: _M && o(L.specularMap.channel),
      specularColorMapUv: J && o(L.specularColorMap.channel),
      specularIntensityMapUv: PM && o(L.specularIntensityMap.channel),
      transmissionMapUv: dM && o(L.transmissionMap.channel),
      thicknessMapUv: xM && o(L.thicknessMap.channel),
      alphaMapUv: v && o(L.alphaMap.channel),
      //
      vertexTangents: !!k.attributes.tangent && (pM || FM),
      vertexColors: L.vertexColors,
      vertexAlphas: L.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4,
      vertexUv1s: AM,
      vertexUv2s: q,
      vertexUv3s: cM,
      pointsUvs: G.isPoints === !0 && !!k.attributes.uv && (bM || v),
      fog: !!p,
      useFog: L.fog === !0,
      fogExp2: p && p.isFogExp2,
      flatShading: L.flatShading === !0,
      sizeAttenuation: L.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      skinning: G.isSkinnedMesh === !0,
      morphTargets: k.morphAttributes.position !== void 0,
      morphNormals: k.morphAttributes.normal !== void 0,
      morphColors: k.morphAttributes.color !== void 0,
      morphTargetsCount: U,
      morphTextureStride: b,
      numDirLights: O.directional.length,
      numPointLights: O.point.length,
      numSpotLights: O.spot.length,
      numSpotLightMaps: O.spotLightMap.length,
      numRectAreaLights: O.rectArea.length,
      numHemiLights: O.hemi.length,
      numDirLightShadows: O.directionalShadowMap.length,
      numPointLightShadows: O.pointShadowMap.length,
      numSpotLightShadows: O.spotShadowMap.length,
      numSpotLightShadowsWithMaps: O.numSpotLightShadowsWithMaps,
      numLightProbes: O.numLightProbes,
      numClippingPlanes: n.numPlanes,
      numClipIntersection: n.numIntersection,
      dithering: L.dithering,
      shadowMapEnabled: i.shadowMap.enabled && K.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: vM,
      useLegacyLights: i._useLegacyLights,
      decodeVideoTexture: bM && L.map.isVideoTexture === !0 && RM.getTransfer(L.map.colorSpace) === VM,
      premultipliedAlpha: L.premultipliedAlpha,
      doubleSided: L.side === Ot,
      flipSided: L.side === vD,
      useDepthPacking: L.depthPacking >= 0,
      depthPacking: L.depthPacking || 0,
      index0AttributeName: L.index0AttributeName,
      extensionDerivatives: TM && L.extensions.derivatives === !0,
      extensionFragDepth: TM && L.extensions.fragDepth === !0,
      extensionDrawBuffers: TM && L.extensions.drawBuffers === !0,
      extensionShaderTextureLOD: TM && L.extensions.shaderTextureLOD === !0,
      rendererExtensionFragDepth: T || t.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: T || t.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: T || t.has("EXT_shader_texture_lod"),
      customProgramCacheKey: L.customProgramCacheKey()
    };
  }
  function r(L) {
    const O = [];
    if (L.shaderID ? O.push(L.shaderID) : (O.push(L.customVertexShaderID), O.push(L.customFragmentShaderID)), L.defines !== void 0)
      for (const K in L.defines)
        O.push(K), O.push(L.defines[K]);
    return L.isRawShaderMaterial === !1 && (w(O, L), y(O, L), O.push(i.outputColorSpace)), O.push(L.customProgramCacheKey), O.join();
  }
  function w(L, O) {
    L.push(O.precision), L.push(O.outputColorSpace), L.push(O.envMapMode), L.push(O.envMapCubeUVHeight), L.push(O.mapUv), L.push(O.alphaMapUv), L.push(O.lightMapUv), L.push(O.aoMapUv), L.push(O.bumpMapUv), L.push(O.normalMapUv), L.push(O.displacementMapUv), L.push(O.emissiveMapUv), L.push(O.metalnessMapUv), L.push(O.roughnessMapUv), L.push(O.anisotropyMapUv), L.push(O.clearcoatMapUv), L.push(O.clearcoatNormalMapUv), L.push(O.clearcoatRoughnessMapUv), L.push(O.iridescenceMapUv), L.push(O.iridescenceThicknessMapUv), L.push(O.sheenColorMapUv), L.push(O.sheenRoughnessMapUv), L.push(O.specularMapUv), L.push(O.specularColorMapUv), L.push(O.specularIntensityMapUv), L.push(O.transmissionMapUv), L.push(O.thicknessMapUv), L.push(O.combine), L.push(O.fogExp2), L.push(O.sizeAttenuation), L.push(O.morphTargetsCount), L.push(O.morphAttributeCount), L.push(O.numDirLights), L.push(O.numPointLights), L.push(O.numSpotLights), L.push(O.numSpotLightMaps), L.push(O.numHemiLights), L.push(O.numRectAreaLights), L.push(O.numDirLightShadows), L.push(O.numPointLightShadows), L.push(O.numSpotLightShadows), L.push(O.numSpotLightShadowsWithMaps), L.push(O.numLightProbes), L.push(O.shadowMapType), L.push(O.toneMapping), L.push(O.numClippingPlanes), L.push(O.numClipIntersection), L.push(O.depthPacking);
  }
  function y(L, O) {
    A.disableAll(), O.isWebGL2 && A.enable(0), O.supportsVertexTextures && A.enable(1), O.instancing && A.enable(2), O.instancingColor && A.enable(3), O.matcap && A.enable(4), O.envMap && A.enable(5), O.normalMapObjectSpace && A.enable(6), O.normalMapTangentSpace && A.enable(7), O.clearcoat && A.enable(8), O.iridescence && A.enable(9), O.alphaTest && A.enable(10), O.vertexColors && A.enable(11), O.vertexAlphas && A.enable(12), O.vertexUv1s && A.enable(13), O.vertexUv2s && A.enable(14), O.vertexUv3s && A.enable(15), O.vertexTangents && A.enable(16), O.anisotropy && A.enable(17), L.push(A.mask), A.disableAll(), O.fog && A.enable(0), O.useFog && A.enable(1), O.flatShading && A.enable(2), O.logarithmicDepthBuffer && A.enable(3), O.skinning && A.enable(4), O.morphTargets && A.enable(5), O.morphNormals && A.enable(6), O.morphColors && A.enable(7), O.premultipliedAlpha && A.enable(8), O.shadowMapEnabled && A.enable(9), O.useLegacyLights && A.enable(10), O.doubleSided && A.enable(11), O.flipSided && A.enable(12), O.useDepthPacking && A.enable(13), O.dithering && A.enable(14), O.transmission && A.enable(15), O.sheen && A.enable(16), O.opaque && A.enable(17), O.pointsUvs && A.enable(18), O.decodeVideoTexture && A.enable(19), L.push(A.mask);
  }
  function j(L) {
    const O = a[L.type];
    let K;
    if (O) {
      const F = tt[O];
      K = ps.clone(F.uniforms);
    } else
      K = L.uniforms;
    return K;
  }
  function l(L, O) {
    let K;
    for (let F = 0, G = I.length; F < G; F++) {
      const p = I[F];
      if (p.cacheKey === O) {
        K = p, ++K.usedTimes;
        break;
      }
    }
    return K === void 0 && (K = new _0(i, O, L, N), I.push(K)), K;
  }
  function d(L) {
    if (--L.usedTimes === 0) {
      const O = I.indexOf(L);
      I[O] = I[I.length - 1], I.pop(), L.destroy();
    }
  }
  function h(L) {
    z.remove(L);
  }
  function S() {
    z.dispose();
  }
  return {
    getParameters: c,
    getProgramCacheKey: r,
    getUniforms: j,
    acquireProgram: l,
    releaseProgram: d,
    releaseShaderCache: h,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: I,
    dispose: S
  };
}
function F0() {
  let i = /* @__PURE__ */ new WeakMap();
  function M(N) {
    let n = i.get(N);
    return n === void 0 && (n = {}, i.set(N, n)), n;
  }
  function D(N) {
    i.delete(N);
  }
  function t(N, n, A) {
    i.get(N)[n] = A;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: M,
    remove: D,
    update: t,
    dispose: e
  };
}
function B0(i, M) {
  return i.groupOrder !== M.groupOrder ? i.groupOrder - M.groupOrder : i.renderOrder !== M.renderOrder ? i.renderOrder - M.renderOrder : i.material.id !== M.material.id ? i.material.id - M.material.id : i.z !== M.z ? i.z - M.z : i.id - M.id;
}
function wI(i, M) {
  return i.groupOrder !== M.groupOrder ? i.groupOrder - M.groupOrder : i.renderOrder !== M.renderOrder ? i.renderOrder - M.renderOrder : i.z !== M.z ? M.z - i.z : i.id - M.id;
}
function xI() {
  const i = [];
  let M = 0;
  const D = [], t = [], e = [];
  function N() {
    M = 0, D.length = 0, t.length = 0, e.length = 0;
  }
  function n(u, g, s, a, o, c) {
    let r = i[M];
    return r === void 0 ? (r = {
      id: u.id,
      object: u,
      geometry: g,
      material: s,
      groupOrder: a,
      renderOrder: u.renderOrder,
      z: o,
      group: c
    }, i[M] = r) : (r.id = u.id, r.object = u, r.geometry = g, r.material = s, r.groupOrder = a, r.renderOrder = u.renderOrder, r.z = o, r.group = c), M++, r;
  }
  function A(u, g, s, a, o, c) {
    const r = n(u, g, s, a, o, c);
    s.transmission > 0 ? t.push(r) : s.transparent === !0 ? e.push(r) : D.push(r);
  }
  function z(u, g, s, a, o, c) {
    const r = n(u, g, s, a, o, c);
    s.transmission > 0 ? t.unshift(r) : s.transparent === !0 ? e.unshift(r) : D.unshift(r);
  }
  function I(u, g) {
    D.length > 1 && D.sort(u || B0), t.length > 1 && t.sort(g || wI), e.length > 1 && e.sort(g || wI);
  }
  function T() {
    for (let u = M, g = i.length; u < g; u++) {
      const s = i[u];
      if (s.id === null)
        break;
      s.id = null, s.object = null, s.geometry = null, s.material = null, s.group = null;
    }
  }
  return {
    opaque: D,
    transmissive: t,
    transparent: e,
    init: N,
    push: A,
    unshift: z,
    finish: T,
    sort: I
  };
}
function V0() {
  let i = /* @__PURE__ */ new WeakMap();
  function M(t, e) {
    const N = i.get(t);
    let n;
    return N === void 0 ? (n = new xI(), i.set(t, [n])) : e >= N.length ? (n = new xI(), N.push(n)) : n = N[e], n;
  }
  function D() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: M,
    dispose: D
  };
}
function G0() {
  const i = {};
  return {
    get: function(M) {
      if (i[M.id] !== void 0)
        return i[M.id];
      let D;
      switch (M.type) {
        case "DirectionalLight":
          D = {
            direction: new Y(),
            color: new KM()
          };
          break;
        case "SpotLight":
          D = {
            position: new Y(),
            direction: new Y(),
            color: new KM(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          D = {
            position: new Y(),
            color: new KM(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          D = {
            direction: new Y(),
            skyColor: new KM(),
            groundColor: new KM()
          };
          break;
        case "RectAreaLight":
          D = {
            color: new KM(),
            position: new Y(),
            halfWidth: new Y(),
            halfHeight: new Y()
          };
          break;
      }
      return i[M.id] = D, D;
    }
  };
}
function H0() {
  const i = {};
  return {
    get: function(M) {
      if (i[M.id] !== void 0)
        return i[M.id];
      let D;
      switch (M.type) {
        case "DirectionalLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rM()
          };
          break;
        case "SpotLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rM()
          };
          break;
        case "PointLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rM(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[M.id] = D, D;
    }
  };
}
let W0 = 0;
function q0(i, M) {
  return (M.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (M.map ? 1 : 0) - (i.map ? 1 : 0);
}
function X0(i, M) {
  const D = new G0(), t = H0(), e = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let T = 0; T < 9; T++)
    e.probe.push(new Y());
  const N = new Y(), n = new ID(), A = new ID();
  function z(T, u) {
    let g = 0, s = 0, a = 0;
    for (let F = 0; F < 9; F++)
      e.probe[F].set(0, 0, 0);
    let o = 0, c = 0, r = 0, w = 0, y = 0, j = 0, l = 0, d = 0, h = 0, S = 0, L = 0;
    T.sort(q0);
    const O = u === !0 ? Math.PI : 1;
    for (let F = 0, G = T.length; F < G; F++) {
      const p = T[F], k = p.color, B = p.intensity, R = p.distance, $ = p.shadow && p.shadow.map ? p.shadow.map.texture : null;
      if (p.isAmbientLight)
        g += k.r * B * O, s += k.g * B * O, a += k.b * B * O;
      else if (p.isLightProbe) {
        for (let H = 0; H < 9; H++)
          e.probe[H].addScaledVector(p.sh.coefficients[H], B);
        L++;
      } else if (p.isDirectionalLight) {
        const H = D.get(p);
        if (H.color.copy(p.color).multiplyScalar(p.intensity * O), p.castShadow) {
          const V = p.shadow, U = t.get(p);
          U.shadowBias = V.bias, U.shadowNormalBias = V.normalBias, U.shadowRadius = V.radius, U.shadowMapSize = V.mapSize, e.directionalShadow[o] = U, e.directionalShadowMap[o] = $, e.directionalShadowMatrix[o] = p.shadow.matrix, j++;
        }
        e.directional[o] = H, o++;
      } else if (p.isSpotLight) {
        const H = D.get(p);
        H.position.setFromMatrixPosition(p.matrixWorld), H.color.copy(k).multiplyScalar(B * O), H.distance = R, H.coneCos = Math.cos(p.angle), H.penumbraCos = Math.cos(p.angle * (1 - p.penumbra)), H.decay = p.decay, e.spot[r] = H;
        const V = p.shadow;
        if (p.map && (e.spotLightMap[h] = p.map, h++, V.updateMatrices(p), p.castShadow && S++), e.spotLightMatrix[r] = V.matrix, p.castShadow) {
          const U = t.get(p);
          U.shadowBias = V.bias, U.shadowNormalBias = V.normalBias, U.shadowRadius = V.radius, U.shadowMapSize = V.mapSize, e.spotShadow[r] = U, e.spotShadowMap[r] = $, d++;
        }
        r++;
      } else if (p.isRectAreaLight) {
        const H = D.get(p);
        H.color.copy(k).multiplyScalar(B), H.halfWidth.set(p.width * 0.5, 0, 0), H.halfHeight.set(0, p.height * 0.5, 0), e.rectArea[w] = H, w++;
      } else if (p.isPointLight) {
        const H = D.get(p);
        if (H.color.copy(p.color).multiplyScalar(p.intensity * O), H.distance = p.distance, H.decay = p.decay, p.castShadow) {
          const V = p.shadow, U = t.get(p);
          U.shadowBias = V.bias, U.shadowNormalBias = V.normalBias, U.shadowRadius = V.radius, U.shadowMapSize = V.mapSize, U.shadowCameraNear = V.camera.near, U.shadowCameraFar = V.camera.far, e.pointShadow[c] = U, e.pointShadowMap[c] = $, e.pointShadowMatrix[c] = p.shadow.matrix, l++;
        }
        e.point[c] = H, c++;
      } else if (p.isHemisphereLight) {
        const H = D.get(p);
        H.skyColor.copy(p.color).multiplyScalar(B * O), H.groundColor.copy(p.groundColor).multiplyScalar(B * O), e.hemi[y] = H, y++;
      }
    }
    w > 0 && (M.isWebGL2 || i.has("OES_texture_float_linear") === !0 ? (e.rectAreaLTC1 = iM.LTC_FLOAT_1, e.rectAreaLTC2 = iM.LTC_FLOAT_2) : i.has("OES_texture_half_float_linear") === !0 ? (e.rectAreaLTC1 = iM.LTC_HALF_1, e.rectAreaLTC2 = iM.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), e.ambient[0] = g, e.ambient[1] = s, e.ambient[2] = a;
    const K = e.hash;
    (K.directionalLength !== o || K.pointLength !== c || K.spotLength !== r || K.rectAreaLength !== w || K.hemiLength !== y || K.numDirectionalShadows !== j || K.numPointShadows !== l || K.numSpotShadows !== d || K.numSpotMaps !== h || K.numLightProbes !== L) && (e.directional.length = o, e.spot.length = r, e.rectArea.length = w, e.point.length = c, e.hemi.length = y, e.directionalShadow.length = j, e.directionalShadowMap.length = j, e.pointShadow.length = l, e.pointShadowMap.length = l, e.spotShadow.length = d, e.spotShadowMap.length = d, e.directionalShadowMatrix.length = j, e.pointShadowMatrix.length = l, e.spotLightMatrix.length = d + h - S, e.spotLightMap.length = h, e.numSpotLightShadowsWithMaps = S, e.numLightProbes = L, K.directionalLength = o, K.pointLength = c, K.spotLength = r, K.rectAreaLength = w, K.hemiLength = y, K.numDirectionalShadows = j, K.numPointShadows = l, K.numSpotShadows = d, K.numSpotMaps = h, K.numLightProbes = L, e.version = W0++);
  }
  function I(T, u) {
    let g = 0, s = 0, a = 0, o = 0, c = 0;
    const r = u.matrixWorldInverse;
    for (let w = 0, y = T.length; w < y; w++) {
      const j = T[w];
      if (j.isDirectionalLight) {
        const l = e.directional[g];
        l.direction.setFromMatrixPosition(j.matrixWorld), N.setFromMatrixPosition(j.target.matrixWorld), l.direction.sub(N), l.direction.transformDirection(r), g++;
      } else if (j.isSpotLight) {
        const l = e.spot[a];
        l.position.setFromMatrixPosition(j.matrixWorld), l.position.applyMatrix4(r), l.direction.setFromMatrixPosition(j.matrixWorld), N.setFromMatrixPosition(j.target.matrixWorld), l.direction.sub(N), l.direction.transformDirection(r), a++;
      } else if (j.isRectAreaLight) {
        const l = e.rectArea[o];
        l.position.setFromMatrixPosition(j.matrixWorld), l.position.applyMatrix4(r), A.identity(), n.copy(j.matrixWorld), n.premultiply(r), A.extractRotation(n), l.halfWidth.set(j.width * 0.5, 0, 0), l.halfHeight.set(0, j.height * 0.5, 0), l.halfWidth.applyMatrix4(A), l.halfHeight.applyMatrix4(A), o++;
      } else if (j.isPointLight) {
        const l = e.point[s];
        l.position.setFromMatrixPosition(j.matrixWorld), l.position.applyMatrix4(r), s++;
      } else if (j.isHemisphereLight) {
        const l = e.hemi[c];
        l.direction.setFromMatrixPosition(j.matrixWorld), l.direction.transformDirection(r), c++;
      }
    }
  }
  return {
    setup: z,
    setupView: I,
    state: e
  };
}
function OI(i, M) {
  const D = new X0(i, M), t = [], e = [];
  function N() {
    t.length = 0, e.length = 0;
  }
  function n(u) {
    t.push(u);
  }
  function A(u) {
    e.push(u);
  }
  function z(u) {
    D.setup(t, u);
  }
  function I(u) {
    D.setupView(t, u);
  }
  return {
    init: N,
    state: {
      lightsArray: t,
      shadowsArray: e,
      lights: D
    },
    setupLights: z,
    setupLightsView: I,
    pushLight: n,
    pushShadow: A
  };
}
function $0(i, M) {
  let D = /* @__PURE__ */ new WeakMap();
  function t(N, n = 0) {
    const A = D.get(N);
    let z;
    return A === void 0 ? (z = new OI(i, M), D.set(N, [z])) : n >= A.length ? (z = new OI(i, M), A.push(z)) : z = A[n], z;
  }
  function e() {
    D = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: e
  };
}
class J0 extends QN {
  constructor(M) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Fg, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.depthPacking = M.depthPacking, this.map = M.map, this.alphaMap = M.alphaMap, this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this;
  }
}
class Mo extends QN {
  constructor(M) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.map = M.map, this.alphaMap = M.alphaMap, this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this;
  }
}
const Do = (
  /* glsl */
  "void main(){gl_Position=vec4(position,1.0);}"
), to = (
  /* glsl */
  `uniform sampler2D shadow_pass;uniform vec2 resolution;uniform float radius;
#include <packing>
void main(){const float samples=float(VSM_SAMPLES);float mean=0.0;float squared_mean=0.0;float uvStride=samples<=1.0?0.0:2.0/(samples-1.0);float uvStart=samples<=1.0?0.0:-1.0;for(float i=0.0;i<samples;i++){float uvOffset=uvStart+i*uvStride;
#ifdef HORIZONTAL_PASS
vec2 distribution=unpackRGBATo2Half(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(uvOffset,0.0)*radius)/resolution));mean+=distribution.x;squared_mean+=distribution.y*distribution.y+distribution.x*distribution.x;
#else
float depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(0.0,uvOffset)*radius)/resolution));mean+=depth;squared_mean+=depth*depth;
#endif
}mean=mean/samples;squared_mean=squared_mean/samples;float std_dev=sqrt(squared_mean-mean*mean);gl_FragColor=pack2HalfToRGBA(vec2(mean,std_dev));}`
);
function eo(i, M, D) {
  let t = new Sn();
  const e = new rM(), N = new rM(), n = new nD(), A = new J0({ depthPacking: Bg }), z = new Mo(), I = {}, T = D.maxTextureSize, u = { [Ft]: vD, [vD]: Ft, [Ot]: Ot }, g = new ue({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new rM() },
      radius: { value: 4 }
    },
    vertexShader: Do,
    fragmentShader: to
  }), s = g.clone();
  s.defines.HORIZONTAL_PASS = 1;
  const a = new AN();
  a.setAttribute(
    "position",
    new it(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const o = new Nt(a, g), c = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = dT;
  let r = this.type;
  this.render = function(l, d, h) {
    if (c.enabled === !1 || c.autoUpdate === !1 && c.needsUpdate === !1 || l.length === 0)
      return;
    const S = i.getRenderTarget(), L = i.getActiveCubeFace(), O = i.getActiveMipmapLevel(), K = i.state;
    K.setBlending(Kt), K.buffers.color.setClear(1, 1, 1, 1), K.buffers.depth.setTest(!0), K.setScissorTest(!1);
    const F = r !== wt && this.type === wt, G = r === wt && this.type !== wt;
    for (let p = 0, k = l.length; p < k; p++) {
      const B = l[p], R = B.shadow;
      if (R === void 0) {
        console.warn("THREE.WebGLShadowMap:", B, "has no shadow.");
        continue;
      }
      if (R.autoUpdate === !1 && R.needsUpdate === !1)
        continue;
      e.copy(R.mapSize);
      const $ = R.getFrameExtents();
      if (e.multiply($), N.copy(R.mapSize), (e.x > T || e.y > T) && (e.x > T && (N.x = Math.floor(T / $.x), e.x = N.x * $.x, R.mapSize.x = N.x), e.y > T && (N.y = Math.floor(T / $.y), e.y = N.y * $.y, R.mapSize.y = N.y)), R.map === null || F === !0 || G === !0) {
        const V = this.type !== wt ? { minFilter: wD, magFilter: wD } : {};
        R.map !== null && R.map.dispose(), R.map = new ge(e.x, e.y, V), R.map.texture.name = B.name + ".shadowMap", R.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(R.map), i.clear();
      const H = R.getViewportCount();
      for (let V = 0; V < H; V++) {
        const U = R.getViewport(V);
        n.set(
          N.x * U.x,
          N.y * U.y,
          N.x * U.z,
          N.y * U.w
        ), K.viewport(n), R.updateMatrices(B, V), t = R.getFrustum(), j(d, h, R.camera, B, this.type);
      }
      R.isPointLightShadow !== !0 && this.type === wt && w(R, h), R.needsUpdate = !1;
    }
    r = this.type, c.needsUpdate = !1, i.setRenderTarget(S, L, O);
  };
  function w(l, d) {
    const h = M.update(o);
    g.defines.VSM_SAMPLES !== l.blurSamples && (g.defines.VSM_SAMPLES = l.blurSamples, s.defines.VSM_SAMPLES = l.blurSamples, g.needsUpdate = !0, s.needsUpdate = !0), l.mapPass === null && (l.mapPass = new ge(e.x, e.y)), g.uniforms.shadow_pass.value = l.map.texture, g.uniforms.resolution.value = l.mapSize, g.uniforms.radius.value = l.radius, i.setRenderTarget(l.mapPass), i.clear(), i.renderBufferDirect(d, null, h, g, o, null), s.uniforms.shadow_pass.value = l.mapPass.texture, s.uniforms.resolution.value = l.mapSize, s.uniforms.radius.value = l.radius, i.setRenderTarget(l.map), i.clear(), i.renderBufferDirect(d, null, h, s, o, null);
  }
  function y(l, d, h, S) {
    let L = null;
    const O = h.isPointLight === !0 ? l.customDistanceMaterial : l.customDepthMaterial;
    if (O !== void 0)
      L = O;
    else if (L = h.isPointLight === !0 ? z : A, i.localClippingEnabled && d.clipShadows === !0 && Array.isArray(d.clippingPlanes) && d.clippingPlanes.length !== 0 || d.displacementMap && d.displacementScale !== 0 || d.alphaMap && d.alphaTest > 0 || d.map && d.alphaTest > 0) {
      const K = L.uuid, F = d.uuid;
      let G = I[K];
      G === void 0 && (G = {}, I[K] = G);
      let p = G[F];
      p === void 0 && (p = L.clone(), G[F] = p), L = p;
    }
    if (L.visible = d.visible, L.wireframe = d.wireframe, S === wt ? L.side = d.shadowSide !== null ? d.shadowSide : d.side : L.side = d.shadowSide !== null ? d.shadowSide : u[d.side], L.alphaMap = d.alphaMap, L.alphaTest = d.alphaTest, L.map = d.map, L.clipShadows = d.clipShadows, L.clippingPlanes = d.clippingPlanes, L.clipIntersection = d.clipIntersection, L.displacementMap = d.displacementMap, L.displacementScale = d.displacementScale, L.displacementBias = d.displacementBias, L.wireframeLinewidth = d.wireframeLinewidth, L.linewidth = d.linewidth, h.isPointLight === !0 && L.isMeshDistanceMaterial === !0) {
      const K = i.properties.get(L);
      K.light = h;
    }
    return L;
  }
  function j(l, d, h, S, L) {
    if (l.visible === !1)
      return;
    if (l.layers.test(d.layers) && (l.isMesh || l.isLine || l.isPoints) && (l.castShadow || l.receiveShadow && L === wt) && (!l.frustumCulled || t.intersectsObject(l))) {
      l.modelViewMatrix.multiplyMatrices(h.matrixWorldInverse, l.matrixWorld);
      const F = M.update(l), G = l.material;
      if (Array.isArray(G)) {
        const p = F.groups;
        for (let k = 0, B = p.length; k < B; k++) {
          const R = p[k], $ = G[R.materialIndex];
          if ($ && $.visible) {
            const H = y(l, $, S, L);
            i.renderBufferDirect(h, null, F, H, l, R);
          }
        }
      } else if (G.visible) {
        const p = y(l, G, S, L);
        i.renderBufferDirect(h, null, F, p, l, null);
      }
    }
    const K = l.children;
    for (let F = 0, G = K.length; F < G; F++)
      j(K[F], d, h, S, L);
  }
}
function No(i, M, D) {
  const t = D.isWebGL2;
  function e() {
    let v = !1;
    const eM = new nD();
    let tM = null;
    const TM = new nD(0, 0, 0, 0);
    return {
      setMask: function(AM) {
        tM !== AM && !v && (i.colorMask(AM, AM, AM, AM), tM = AM);
      },
      setLocked: function(AM) {
        v = AM;
      },
      setClear: function(AM, q, cM, vM, yD) {
        yD === !0 && (AM *= vM, q *= vM, cM *= vM), eM.set(AM, q, cM, vM), TM.equals(eM) === !1 && (i.clearColor(AM, q, cM, vM), TM.copy(eM));
      },
      reset: function() {
        v = !1, tM = null, TM.set(-1, 0, 0, 0);
      }
    };
  }
  function N() {
    let v = !1, eM = null, tM = null, TM = null;
    return {
      setTest: function(AM) {
        AM ? hM(2929) : jM(2929);
      },
      setMask: function(AM) {
        eM !== AM && !v && (i.depthMask(AM), eM = AM);
      },
      setFunc: function(AM) {
        if (tM !== AM) {
          switch (AM) {
            case Cg:
              i.depthFunc(512);
              break;
            case Lg:
              i.depthFunc(519);
              break;
            case wg:
              i.depthFunc(513);
              break;
            case jn:
              i.depthFunc(515);
              break;
            case xg:
              i.depthFunc(514);
              break;
            case Og:
              i.depthFunc(518);
              break;
            case Eg:
              i.depthFunc(516);
              break;
            case lg:
              i.depthFunc(517);
              break;
            default:
              i.depthFunc(515);
          }
          tM = AM;
        }
      },
      setLocked: function(AM) {
        v = AM;
      },
      setClear: function(AM) {
        TM !== AM && (i.clearDepth(AM), TM = AM);
      },
      reset: function() {
        v = !1, eM = null, tM = null, TM = null;
      }
    };
  }
  function n() {
    let v = !1, eM = null, tM = null, TM = null, AM = null, q = null, cM = null, vM = null, yD = null;
    return {
      setTest: function(BM) {
        v || (BM ? hM(2960) : jM(2960));
      },
      setMask: function(BM) {
        eM !== BM && !v && (i.stencilMask(BM), eM = BM);
      },
      setFunc: function(BM, Dt, jD) {
        (tM !== BM || TM !== Dt || AM !== jD) && (i.stencilFunc(BM, Dt, jD), tM = BM, TM = Dt, AM = jD);
      },
      setOp: function(BM, Dt, jD) {
        (q !== BM || cM !== Dt || vM !== jD) && (i.stencilOp(BM, Dt, jD), q = BM, cM = Dt, vM = jD);
      },
      setLocked: function(BM) {
        v = BM;
      },
      setClear: function(BM) {
        yD !== BM && (i.clearStencil(BM), yD = BM);
      },
      reset: function() {
        v = !1, eM = null, tM = null, TM = null, AM = null, q = null, cM = null, vM = null, yD = null;
      }
    };
  }
  const A = new e(), z = new N(), I = new n(), T = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
  let g = {}, s = {}, a = /* @__PURE__ */ new WeakMap(), o = [], c = null, r = !1, w = null, y = null, j = null, l = null, d = null, h = null, S = null, L = !1, O = null, K = null, F = null, G = null, p = null;
  const k = i.getParameter(35661);
  let B = !1, R = 0;
  const $ = i.getParameter(7938);
  $.indexOf("WebGL") !== -1 ? (R = parseFloat(/^WebGL (\d)/.exec($)[1]), B = R >= 1) : $.indexOf("OpenGL ES") !== -1 && (R = parseFloat(/^OpenGL ES (\d)/.exec($)[1]), B = R >= 2);
  let H = null, V = {};
  const U = i.getParameter(3088), b = i.getParameter(2978), nM = new nD().fromArray(U), zM = new nD().fromArray(b);
  function gM(v, eM, tM, TM) {
    const AM = new Uint8Array(4), q = i.createTexture();
    i.bindTexture(v, q), i.texParameteri(v, 10241, 9728), i.texParameteri(v, 10240, 9728);
    for (let cM = 0; cM < tM; cM++)
      t && (v === 32879 || v === 35866) ? i.texImage3D(eM, 0, 6408, 1, 1, TM, 0, 6408, 5121, AM) : i.texImage2D(eM + cM, 0, 6408, 1, 1, 0, 6408, 5121, AM);
    return q;
  }
  const yM = {};
  yM[3553] = gM(3553, 3553, 1), yM[34067] = gM(34067, 34069, 6), t && (yM[35866] = gM(35866, 35866, 1, 1), yM[32879] = gM(32879, 32879, 1, 1)), A.setClear(0, 0, 0, 1), z.setClear(1), I.setClear(0), hM(2929), z.setFunc(jn), lM(!1), GM(iz), hM(2884), CM(Kt);
  function hM(v) {
    g[v] !== !0 && (i.enable(v), g[v] = !0);
  }
  function jM(v) {
    g[v] !== !1 && (i.disable(v), g[v] = !1);
  }
  function bM(v, eM) {
    return s[v] !== eM ? (i.bindFramebuffer(v, eM), s[v] = eM, t && (v === 36009 && (s[36160] = eM), v === 36160 && (s[36009] = eM)), !0) : !1;
  }
  function OD(v, eM) {
    let tM = o, TM = !1;
    if (v)
      if (tM = a.get(eM), tM === void 0 && (tM = [], a.set(eM, tM)), v.isWebGLMultipleRenderTargets) {
        const AM = v.texture;
        if (tM.length !== AM.length || tM[0] !== 36064) {
          for (let q = 0, cM = AM.length; q < cM; q++)
            tM[q] = 36064 + q;
          tM.length = AM.length, TM = !0;
        }
      } else
        tM[0] !== 36064 && (tM[0] = 36064, TM = !0);
    else
      tM[0] !== 1029 && (tM[0] = 1029, TM = !0);
    TM && (D.isWebGL2 ? i.drawBuffers(tM) : M.get("WEBGL_draw_buffers").drawBuffersWEBGL(tM));
  }
  function fM(v) {
    return c !== v ? (i.useProgram(v), c = v, !0) : !1;
  }
  const W = {
    [Be]: 32774,
    [Ig]: 32778,
    [Tg]: 32779
  };
  if (t)
    W[Iz] = 32775, W[Tz] = 32776;
  else {
    const v = M.get("EXT_blend_minmax");
    v !== null && (W[Iz] = v.MIN_EXT, W[Tz] = v.MAX_EXT);
  }
  const TD = {
    [ug]: 0,
    [gg]: 1,
    [sg]: 768,
    [vT]: 770,
    [jg]: 776,
    [og]: 774,
    [cg]: 772,
    [rg]: 769,
    [pT]: 771,
    [yg]: 775,
    [ag]: 773
  };
  function CM(v, eM, tM, TM, AM, q, cM, vM) {
    if (v === Kt) {
      r === !0 && (jM(3042), r = !1);
      return;
    }
    if (r === !1 && (hM(3042), r = !0), v !== zg) {
      if (v !== w || vM !== L) {
        if ((y !== Be || d !== Be) && (i.blendEquation(32774), y = Be, d = Be), vM)
          switch (v) {
            case He:
              i.blendFuncSeparate(1, 771, 1, 771);
              break;
            case Az:
              i.blendFunc(1, 1);
              break;
            case nz:
              i.blendFuncSeparate(0, 769, 0, 1);
              break;
            case zz:
              i.blendFuncSeparate(0, 768, 0, 770);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", v);
              break;
          }
        else
          switch (v) {
            case He:
              i.blendFuncSeparate(770, 771, 1, 771);
              break;
            case Az:
              i.blendFunc(770, 1);
              break;
            case nz:
              i.blendFuncSeparate(0, 769, 0, 1);
              break;
            case zz:
              i.blendFunc(0, 768);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", v);
              break;
          }
        j = null, l = null, h = null, S = null, w = v, L = vM;
      }
      return;
    }
    AM = AM || eM, q = q || tM, cM = cM || TM, (eM !== y || AM !== d) && (i.blendEquationSeparate(W[eM], W[AM]), y = eM, d = AM), (tM !== j || TM !== l || q !== h || cM !== S) && (i.blendFuncSeparate(TD[tM], TD[TM], TD[q], TD[cM]), j = tM, l = TM, h = q, S = cM), w = v, L = !1;
  }
  function pM(v, eM) {
    v.side === Ot ? jM(2884) : hM(2884);
    let tM = v.side === vD;
    eM && (tM = !tM), lM(tM), v.blending === He && v.transparent === !1 ? CM(Kt) : CM(v.blending, v.blendEquation, v.blendSrc, v.blendDst, v.blendEquationAlpha, v.blendSrcAlpha, v.blendDstAlpha, v.premultipliedAlpha), z.setFunc(v.depthFunc), z.setTest(v.depthTest), z.setMask(v.depthWrite), A.setMask(v.colorWrite);
    const TM = v.stencilWrite;
    I.setTest(TM), TM && (I.setMask(v.stencilWriteMask), I.setFunc(v.stencilFunc, v.stencilRef, v.stencilFuncMask), I.setOp(v.stencilFail, v.stencilZFail, v.stencilZPass)), mM(v.polygonOffset, v.polygonOffsetFactor, v.polygonOffsetUnits), v.alphaToCoverage === !0 ? hM(32926) : jM(32926);
  }
  function lM(v) {
    O !== v && (v ? i.frontFace(2304) : i.frontFace(2305), O = v);
  }
  function GM(v) {
    v !== ig ? (hM(2884), v !== K && (v === iz ? i.cullFace(1029) : v === Ag ? i.cullFace(1028) : i.cullFace(1032))) : jM(2884), K = v;
  }
  function ZM(v) {
    v !== F && (B && i.lineWidth(v), F = v);
  }
  function mM(v, eM, tM) {
    v ? (hM(32823), (G !== eM || p !== tM) && (i.polygonOffset(eM, tM), G = eM, p = tM)) : jM(32823);
  }
  function FM(v) {
    v ? hM(3089) : jM(3089);
  }
  function zD(v) {
    v === void 0 && (v = 33984 + k - 1), H !== v && (i.activeTexture(v), H = v);
  }
  function uD(v, eM, tM) {
    tM === void 0 && (H === null ? tM = 33984 + k - 1 : tM = H);
    let TM = V[tM];
    TM === void 0 && (TM = { type: void 0, texture: void 0 }, V[tM] = TM), (TM.type !== v || TM.texture !== eM) && (H !== tM && (i.activeTexture(tM), H = tM), i.bindTexture(v, eM || yM[v]), TM.type = v, TM.texture = eM);
  }
  function E() {
    const v = V[H];
    v !== void 0 && v.type !== void 0 && (i.bindTexture(v.type, null), v.type = void 0, v.texture = void 0);
  }
  function C() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function Q() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function MM() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function X() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function DM() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function sM() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function NM() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function IM() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function wM() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function _M() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function J(v) {
    nM.equals(v) === !1 && (i.scissor(v.x, v.y, v.z, v.w), nM.copy(v));
  }
  function PM(v) {
    zM.equals(v) === !1 && (i.viewport(v.x, v.y, v.z, v.w), zM.copy(v));
  }
  function dM(v, eM) {
    let tM = u.get(eM);
    tM === void 0 && (tM = /* @__PURE__ */ new WeakMap(), u.set(eM, tM));
    let TM = tM.get(v);
    TM === void 0 && (TM = i.getUniformBlockIndex(eM, v.name), tM.set(v, TM));
  }
  function xM(v, eM) {
    const TM = u.get(eM).get(v);
    T.get(eM) !== TM && (i.uniformBlockBinding(eM, TM, v.__bindingPointIndex), T.set(eM, TM));
  }
  function oM() {
    i.disable(3042), i.disable(2884), i.disable(2929), i.disable(32823), i.disable(3089), i.disable(2960), i.disable(32926), i.blendEquation(32774), i.blendFunc(1, 0), i.blendFuncSeparate(1, 0, 1, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(513), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(519, 0, 4294967295), i.stencilOp(7680, 7680, 7680), i.clearStencil(0), i.cullFace(1029), i.frontFace(2305), i.polygonOffset(0, 0), i.activeTexture(33984), i.bindFramebuffer(36160, null), t === !0 && (i.bindFramebuffer(36009, null), i.bindFramebuffer(36008, null)), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), g = {}, H = null, V = {}, s = {}, a = /* @__PURE__ */ new WeakMap(), o = [], c = null, r = !1, w = null, y = null, j = null, l = null, d = null, h = null, S = null, L = !1, O = null, K = null, F = null, G = null, p = null, nM.set(0, 0, i.canvas.width, i.canvas.height), zM.set(0, 0, i.canvas.width, i.canvas.height), A.reset(), z.reset(), I.reset();
  }
  return {
    buffers: {
      color: A,
      depth: z,
      stencil: I
    },
    enable: hM,
    disable: jM,
    bindFramebuffer: bM,
    drawBuffers: OD,
    useProgram: fM,
    setBlending: CM,
    setMaterial: pM,
    setFlipSided: lM,
    setCullFace: GM,
    setLineWidth: ZM,
    setPolygonOffset: mM,
    setScissorTest: FM,
    activeTexture: zD,
    bindTexture: uD,
    unbindTexture: E,
    compressedTexImage2D: C,
    compressedTexImage3D: Q,
    texImage2D: wM,
    texImage3D: _M,
    updateUBOMapping: dM,
    uniformBlockBinding: xM,
    texStorage2D: NM,
    texStorage3D: IM,
    texSubImage2D: MM,
    texSubImage3D: X,
    compressedTexSubImage2D: DM,
    compressedTexSubImage3D: sM,
    scissor: J,
    viewport: PM,
    reset: oM
  };
}
function io(i, M, D, t, e, N, n) {
  const A = e.isWebGL2, z = e.maxTextures, I = e.maxCubemapSize, T = e.maxTextureSize, u = e.maxSamples, g = M.has("WEBGL_multisampled_render_to_texture") ? M.get("WEBGL_multisampled_render_to_texture") : null, s = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), a = /* @__PURE__ */ new WeakMap();
  let o;
  const c = /* @__PURE__ */ new WeakMap();
  let r = !1;
  try {
    r = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function w(E, C) {
    return r ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(E, C)
    ) : dN("canvas");
  }
  function y(E, C, Q, MM) {
    let X = 1;
    if ((E.width > MM || E.height > MM) && (X = MM / Math.max(E.width, E.height)), X < 1 || C === !0)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap) {
        const DM = C ? yn : Math.floor, sM = DM(X * E.width), NM = DM(X * E.height);
        o === void 0 && (o = w(sM, NM));
        const IM = Q ? w(sM, NM) : o;
        return IM.width = sM, IM.height = NM, IM.getContext("2d").drawImage(E, 0, 0, sM, NM), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + E.width + "x" + E.height + ") to (" + sM + "x" + NM + ")."), IM;
      } else
        return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + E.width + "x" + E.height + ")."), E;
    return E;
  }
  function j(E) {
    return ez(E.width) && ez(E.height);
  }
  function l(E) {
    return A ? !1 : E.wrapS !== $D || E.wrapT !== $D || E.minFilter !== wD && E.minFilter !== hD;
  }
  function d(E, C) {
    return E.generateMipmaps && C && E.minFilter !== wD && E.minFilter !== hD;
  }
  function h(E) {
    i.generateMipmap(E);
  }
  function S(E, C, Q, MM, X = !1) {
    if (A === !1)
      return C;
    if (E !== null) {
      if (i[E] !== void 0)
        return i[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let DM = C;
    if (C === 6403 && (Q === 5126 && (DM = 33326), Q === 5131 && (DM = 33325), Q === 5121 && (DM = 33321)), C === 36244 && (Q === 5121 && (DM = 33330), Q === 5123 && (DM = 33332), Q === 5125 && (DM = 33334), Q === 5120 && (DM = 33329), Q === 5122 && (DM = 33331), Q === 5124 && (DM = 33333)), C === 33319 && (Q === 5126 && (DM = 33328), Q === 5131 && (DM = 33327), Q === 5121 && (DM = 33323)), C === 6408) {
      const sM = X ? Gi : RM.getTransfer(MM);
      Q === 5126 && (DM = 34836), Q === 5131 && (DM = 34842), Q === 5121 && (DM = sM === VM ? 35907 : 32856), Q === 32819 && (DM = 32854), Q === 32820 && (DM = 32855);
    }
    return (DM === 33325 || DM === 33326 || DM === 33327 || DM === 33328 || DM === 34842 || DM === 34836) && M.get("EXT_color_buffer_float"), DM;
  }
  function L(E, C, Q) {
    return d(E, Q) === !0 || E.isFramebufferTexture && E.minFilter !== wD && E.minFilter !== hD ? Math.log2(Math.max(C.width, C.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? C.mipmaps.length : 1;
  }
  function O(E) {
    return E === wD || E === uz || E === rA ? 9728 : 9729;
  }
  function K(E) {
    const C = E.target;
    C.removeEventListener("dispose", K), G(C), C.isVideoTexture && a.delete(C);
  }
  function F(E) {
    const C = E.target;
    C.removeEventListener("dispose", F), k(C);
  }
  function G(E) {
    const C = t.get(E);
    if (C.__webglInit === void 0)
      return;
    const Q = E.source, MM = c.get(Q);
    if (MM) {
      const X = MM[C.__cacheKey];
      X.usedTimes--, X.usedTimes === 0 && p(E), Object.keys(MM).length === 0 && c.delete(Q);
    }
    t.remove(E);
  }
  function p(E) {
    const C = t.get(E);
    i.deleteTexture(C.__webglTexture);
    const Q = E.source, MM = c.get(Q);
    delete MM[C.__cacheKey], n.memory.textures--;
  }
  function k(E) {
    const C = E.texture, Q = t.get(E), MM = t.get(C);
    if (MM.__webglTexture !== void 0 && (i.deleteTexture(MM.__webglTexture), n.memory.textures--), E.depthTexture && E.depthTexture.dispose(), E.isWebGLCubeRenderTarget)
      for (let X = 0; X < 6; X++) {
        if (Array.isArray(Q.__webglFramebuffer[X]))
          for (let DM = 0; DM < Q.__webglFramebuffer[X].length; DM++)
            i.deleteFramebuffer(Q.__webglFramebuffer[X][DM]);
        else
          i.deleteFramebuffer(Q.__webglFramebuffer[X]);
        Q.__webglDepthbuffer && i.deleteRenderbuffer(Q.__webglDepthbuffer[X]);
      }
    else {
      if (Array.isArray(Q.__webglFramebuffer))
        for (let X = 0; X < Q.__webglFramebuffer.length; X++)
          i.deleteFramebuffer(Q.__webglFramebuffer[X]);
      else
        i.deleteFramebuffer(Q.__webglFramebuffer);
      if (Q.__webglDepthbuffer && i.deleteRenderbuffer(Q.__webglDepthbuffer), Q.__webglMultisampledFramebuffer && i.deleteFramebuffer(Q.__webglMultisampledFramebuffer), Q.__webglColorRenderbuffer)
        for (let X = 0; X < Q.__webglColorRenderbuffer.length; X++)
          Q.__webglColorRenderbuffer[X] && i.deleteRenderbuffer(Q.__webglColorRenderbuffer[X]);
      Q.__webglDepthRenderbuffer && i.deleteRenderbuffer(Q.__webglDepthRenderbuffer);
    }
    if (E.isWebGLMultipleRenderTargets)
      for (let X = 0, DM = C.length; X < DM; X++) {
        const sM = t.get(C[X]);
        sM.__webglTexture && (i.deleteTexture(sM.__webglTexture), n.memory.textures--), t.remove(C[X]);
      }
    t.remove(C), t.remove(E);
  }
  let B = 0;
  function R() {
    B = 0;
  }
  function $() {
    const E = B;
    return E >= z && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + z), B += 1, E;
  }
  function H(E) {
    const C = [];
    return C.push(E.wrapS), C.push(E.wrapT), C.push(E.wrapR || 0), C.push(E.magFilter), C.push(E.minFilter), C.push(E.anisotropy), C.push(E.internalFormat), C.push(E.format), C.push(E.type), C.push(E.generateMipmaps), C.push(E.premultiplyAlpha), C.push(E.flipY), C.push(E.unpackAlignment), C.push(E.colorSpace), C.join();
  }
  function V(E, C) {
    const Q = t.get(E);
    if (E.isVideoTexture && zD(E), E.isRenderTargetTexture === !1 && E.version > 0 && Q.__version !== E.version) {
      const MM = E.image;
      if (MM === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (MM.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        bM(Q, E, C);
        return;
      }
    }
    D.bindTexture(3553, Q.__webglTexture, 33984 + C);
  }
  function U(E, C) {
    const Q = t.get(E);
    if (E.version > 0 && Q.__version !== E.version) {
      bM(Q, E, C);
      return;
    }
    D.bindTexture(35866, Q.__webglTexture, 33984 + C);
  }
  function b(E, C) {
    const Q = t.get(E);
    if (E.version > 0 && Q.__version !== E.version) {
      bM(Q, E, C);
      return;
    }
    D.bindTexture(32879, Q.__webglTexture, 33984 + C);
  }
  function nM(E, C) {
    const Q = t.get(E);
    if (E.version > 0 && Q.__version !== E.version) {
      OD(Q, E, C);
      return;
    }
    D.bindTexture(34067, Q.__webglTexture, 33984 + C);
  }
  const zM = {
    [wn]: 10497,
    [$D]: 33071,
    [xn]: 33648
  }, gM = {
    [wD]: 9728,
    [uz]: 9984,
    [rA]: 9986,
    [hD]: 9729,
    [mg]: 9985,
    [lN]: 9987
  }, yM = {
    [Hg]: 512,
    [Ds]: 519,
    [Wg]: 513,
    [Xg]: 515,
    [qg]: 514,
    [Ms]: 518,
    [$g]: 516,
    [Jg]: 517
  };
  function hM(E, C, Q) {
    if (Q ? (i.texParameteri(E, 10242, zM[C.wrapS]), i.texParameteri(E, 10243, zM[C.wrapT]), (E === 32879 || E === 35866) && i.texParameteri(E, 32882, zM[C.wrapR]), i.texParameteri(E, 10240, gM[C.magFilter]), i.texParameteri(E, 10241, gM[C.minFilter])) : (i.texParameteri(E, 10242, 33071), i.texParameteri(E, 10243, 33071), (E === 32879 || E === 35866) && i.texParameteri(E, 32882, 33071), (C.wrapS !== $D || C.wrapT !== $D) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), i.texParameteri(E, 10240, O(C.magFilter)), i.texParameteri(E, 10241, O(C.minFilter)), C.minFilter !== wD && C.minFilter !== hD && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), C.compareFunction && (i.texParameteri(E, 34892, 34894), i.texParameteri(E, 34893, yM[C.compareFunction])), M.has("EXT_texture_filter_anisotropic") === !0) {
      const MM = M.get("EXT_texture_filter_anisotropic");
      if (C.magFilter === wD || C.minFilter !== rA && C.minFilter !== lN || C.type === bt && M.has("OES_texture_float_linear") === !1 || A === !1 && C.type === hN && M.has("OES_texture_half_float_linear") === !1)
        return;
      (C.anisotropy > 1 || t.get(C).__currentAnisotropy) && (i.texParameterf(E, MM.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(C.anisotropy, e.getMaxAnisotropy())), t.get(C).__currentAnisotropy = C.anisotropy);
    }
  }
  function jM(E, C) {
    let Q = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, C.addEventListener("dispose", K));
    const MM = C.source;
    let X = c.get(MM);
    X === void 0 && (X = {}, c.set(MM, X));
    const DM = H(C);
    if (DM !== E.__cacheKey) {
      X[DM] === void 0 && (X[DM] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, n.memory.textures++, Q = !0), X[DM].usedTimes++;
      const sM = X[E.__cacheKey];
      sM !== void 0 && (X[E.__cacheKey].usedTimes--, sM.usedTimes === 0 && p(C)), E.__cacheKey = DM, E.__webglTexture = X[DM].texture;
    }
    return Q;
  }
  function bM(E, C, Q) {
    let MM = 3553;
    (C.isDataArrayTexture || C.isCompressedArrayTexture) && (MM = 35866), C.isData3DTexture && (MM = 32879);
    const X = jM(E, C), DM = C.source;
    D.bindTexture(MM, E.__webglTexture, 33984 + Q);
    const sM = t.get(DM);
    if (DM.version !== sM.__version || X === !0) {
      D.activeTexture(33984 + Q);
      const NM = RM.getPrimaries(RM.workingColorSpace), IM = C.colorSpace === RD ? null : RM.getPrimaries(C.colorSpace), wM = C.colorSpace === RD || NM === IM ? 0 : 37444;
      i.pixelStorei(37440, C.flipY), i.pixelStorei(37441, C.premultiplyAlpha), i.pixelStorei(3317, C.unpackAlignment), i.pixelStorei(37443, wM);
      const _M = l(C) && j(C.image) === !1;
      let J = y(C.image, _M, !1, T);
      J = uD(C, J);
      const PM = j(J) || A, dM = N.convert(C.format, C.colorSpace);
      let xM = N.convert(C.type), oM = S(C.internalFormat, dM, xM, C.colorSpace, C.isVideoTexture);
      hM(MM, C, PM);
      let v;
      const eM = C.mipmaps, tM = A && C.isVideoTexture !== !0, TM = sM.__version === void 0 || X === !0, AM = L(C, J, PM);
      if (C.isDepthTexture)
        oM = 6402, A ? C.type === bt ? oM = 36012 : C.type === _t ? oM = 33190 : C.type === ne ? oM = 35056 : oM = 33189 : C.type === bt && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), C.format === ze && oM === 6402 && C.type !== mn && C.type !== _t && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), C.type = _t, xM = N.convert(C.type)), C.format === MN && oM === 6402 && (oM = 34041, C.type !== ne && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), C.type = ne, xM = N.convert(C.type))), TM && (tM ? D.texStorage2D(3553, 1, oM, J.width, J.height) : D.texImage2D(3553, 0, oM, J.width, J.height, 0, dM, xM, null));
      else if (C.isDataTexture)
        if (eM.length > 0 && PM) {
          tM && TM && D.texStorage2D(3553, AM, oM, eM[0].width, eM[0].height);
          for (let q = 0, cM = eM.length; q < cM; q++)
            v = eM[q], tM ? D.texSubImage2D(3553, q, 0, 0, v.width, v.height, dM, xM, v.data) : D.texImage2D(3553, q, oM, v.width, v.height, 0, dM, xM, v.data);
          C.generateMipmaps = !1;
        } else
          tM ? (TM && D.texStorage2D(3553, AM, oM, J.width, J.height), D.texSubImage2D(3553, 0, 0, 0, J.width, J.height, dM, xM, J.data)) : D.texImage2D(3553, 0, oM, J.width, J.height, 0, dM, xM, J.data);
      else if (C.isCompressedTexture)
        if (C.isCompressedArrayTexture) {
          tM && TM && D.texStorage3D(35866, AM, oM, eM[0].width, eM[0].height, J.depth);
          for (let q = 0, cM = eM.length; q < cM; q++)
            v = eM[q], C.format !== JD ? dM !== null ? tM ? D.compressedTexSubImage3D(35866, q, 0, 0, 0, v.width, v.height, J.depth, dM, v.data, 0, 0) : D.compressedTexImage3D(35866, q, oM, v.width, v.height, J.depth, 0, v.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : tM ? D.texSubImage3D(35866, q, 0, 0, 0, v.width, v.height, J.depth, dM, xM, v.data) : D.texImage3D(35866, q, oM, v.width, v.height, J.depth, 0, dM, xM, v.data);
        } else {
          tM && TM && D.texStorage2D(3553, AM, oM, eM[0].width, eM[0].height);
          for (let q = 0, cM = eM.length; q < cM; q++)
            v = eM[q], C.format !== JD ? dM !== null ? tM ? D.compressedTexSubImage2D(3553, q, 0, 0, v.width, v.height, dM, v.data) : D.compressedTexImage2D(3553, q, oM, v.width, v.height, 0, v.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : tM ? D.texSubImage2D(3553, q, 0, 0, v.width, v.height, dM, xM, v.data) : D.texImage2D(3553, q, oM, v.width, v.height, 0, dM, xM, v.data);
        }
      else if (C.isDataArrayTexture)
        tM ? (TM && D.texStorage3D(35866, AM, oM, J.width, J.height, J.depth), D.texSubImage3D(35866, 0, 0, 0, 0, J.width, J.height, J.depth, dM, xM, J.data)) : D.texImage3D(35866, 0, oM, J.width, J.height, J.depth, 0, dM, xM, J.data);
      else if (C.isData3DTexture)
        tM ? (TM && D.texStorage3D(32879, AM, oM, J.width, J.height, J.depth), D.texSubImage3D(32879, 0, 0, 0, 0, J.width, J.height, J.depth, dM, xM, J.data)) : D.texImage3D(32879, 0, oM, J.width, J.height, J.depth, 0, dM, xM, J.data);
      else if (C.isFramebufferTexture) {
        if (TM)
          if (tM)
            D.texStorage2D(3553, AM, oM, J.width, J.height);
          else {
            let q = J.width, cM = J.height;
            for (let vM = 0; vM < AM; vM++)
              D.texImage2D(3553, vM, oM, q, cM, 0, dM, xM, null), q >>= 1, cM >>= 1;
          }
      } else if (eM.length > 0 && PM) {
        tM && TM && D.texStorage2D(3553, AM, oM, eM[0].width, eM[0].height);
        for (let q = 0, cM = eM.length; q < cM; q++)
          v = eM[q], tM ? D.texSubImage2D(3553, q, 0, 0, dM, xM, v) : D.texImage2D(3553, q, oM, dM, xM, v);
        C.generateMipmaps = !1;
      } else
        tM ? (TM && D.texStorage2D(3553, AM, oM, J.width, J.height), D.texSubImage2D(3553, 0, 0, 0, dM, xM, J)) : D.texImage2D(3553, 0, oM, dM, xM, J);
      d(C, PM) && h(MM), sM.__version = DM.version, C.onUpdate && C.onUpdate(C);
    }
    E.__version = C.version;
  }
  function OD(E, C, Q) {
    if (C.image.length !== 6)
      return;
    const MM = jM(E, C), X = C.source;
    D.bindTexture(34067, E.__webglTexture, 33984 + Q);
    const DM = t.get(X);
    if (X.version !== DM.__version || MM === !0) {
      D.activeTexture(33984 + Q);
      const sM = RM.getPrimaries(RM.workingColorSpace), NM = C.colorSpace === RD ? null : RM.getPrimaries(C.colorSpace), IM = C.colorSpace === RD || sM === NM ? 0 : 37444;
      i.pixelStorei(37440, C.flipY), i.pixelStorei(37441, C.premultiplyAlpha), i.pixelStorei(3317, C.unpackAlignment), i.pixelStorei(37443, IM);
      const wM = C.isCompressedTexture || C.image[0].isCompressedTexture, _M = C.image[0] && C.image[0].isDataTexture, J = [];
      for (let q = 0; q < 6; q++)
        !wM && !_M ? J[q] = y(C.image[q], !1, !0, I) : J[q] = _M ? C.image[q].image : C.image[q], J[q] = uD(C, J[q]);
      const PM = J[0], dM = j(PM) || A, xM = N.convert(C.format, C.colorSpace), oM = N.convert(C.type), v = S(C.internalFormat, xM, oM, C.colorSpace), eM = A && C.isVideoTexture !== !0, tM = DM.__version === void 0 || MM === !0;
      let TM = L(C, PM, dM);
      hM(34067, C, dM);
      let AM;
      if (wM) {
        eM && tM && D.texStorage2D(34067, TM, v, PM.width, PM.height);
        for (let q = 0; q < 6; q++) {
          AM = J[q].mipmaps;
          for (let cM = 0; cM < AM.length; cM++) {
            const vM = AM[cM];
            C.format !== JD ? xM !== null ? eM ? D.compressedTexSubImage2D(34069 + q, cM, 0, 0, vM.width, vM.height, xM, vM.data) : D.compressedTexImage2D(34069 + q, cM, v, vM.width, vM.height, 0, vM.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : eM ? D.texSubImage2D(34069 + q, cM, 0, 0, vM.width, vM.height, xM, oM, vM.data) : D.texImage2D(34069 + q, cM, v, vM.width, vM.height, 0, xM, oM, vM.data);
          }
        }
      } else {
        AM = C.mipmaps, eM && tM && (AM.length > 0 && TM++, D.texStorage2D(34067, TM, v, J[0].width, J[0].height));
        for (let q = 0; q < 6; q++)
          if (_M) {
            eM ? D.texSubImage2D(34069 + q, 0, 0, 0, J[q].width, J[q].height, xM, oM, J[q].data) : D.texImage2D(34069 + q, 0, v, J[q].width, J[q].height, 0, xM, oM, J[q].data);
            for (let cM = 0; cM < AM.length; cM++) {
              const yD = AM[cM].image[q].image;
              eM ? D.texSubImage2D(34069 + q, cM + 1, 0, 0, yD.width, yD.height, xM, oM, yD.data) : D.texImage2D(34069 + q, cM + 1, v, yD.width, yD.height, 0, xM, oM, yD.data);
            }
          } else {
            eM ? D.texSubImage2D(34069 + q, 0, 0, 0, xM, oM, J[q]) : D.texImage2D(34069 + q, 0, v, xM, oM, J[q]);
            for (let cM = 0; cM < AM.length; cM++) {
              const vM = AM[cM];
              eM ? D.texSubImage2D(34069 + q, cM + 1, 0, 0, xM, oM, vM.image[q]) : D.texImage2D(34069 + q, cM + 1, v, xM, oM, vM.image[q]);
            }
          }
      }
      d(C, dM) && h(34067), DM.__version = X.version, C.onUpdate && C.onUpdate(C);
    }
    E.__version = C.version;
  }
  function fM(E, C, Q, MM, X, DM) {
    const sM = N.convert(Q.format, Q.colorSpace), NM = N.convert(Q.type), IM = S(Q.internalFormat, sM, NM, Q.colorSpace);
    if (!t.get(C).__hasExternalTextures) {
      const _M = Math.max(1, C.width >> DM), J = Math.max(1, C.height >> DM);
      X === 32879 || X === 35866 ? D.texImage3D(X, DM, IM, _M, J, C.depth, 0, sM, NM, null) : D.texImage2D(X, DM, IM, _M, J, 0, sM, NM, null);
    }
    D.bindFramebuffer(36160, E), FM(C) ? g.framebufferTexture2DMultisampleEXT(36160, MM, X, t.get(Q).__webglTexture, 0, mM(C)) : (X === 3553 || X >= 34069 && X <= 34074) && i.framebufferTexture2D(36160, MM, X, t.get(Q).__webglTexture, DM), D.bindFramebuffer(36160, null);
  }
  function W(E, C, Q) {
    if (i.bindRenderbuffer(36161, E), C.depthBuffer && !C.stencilBuffer) {
      let MM = A === !0 ? 33190 : 33189;
      if (Q || FM(C)) {
        const X = C.depthTexture;
        X && X.isDepthTexture && (X.type === bt ? MM = 36012 : X.type === _t && (MM = 33190));
        const DM = mM(C);
        FM(C) ? g.renderbufferStorageMultisampleEXT(36161, DM, MM, C.width, C.height) : i.renderbufferStorageMultisample(36161, DM, MM, C.width, C.height);
      } else
        i.renderbufferStorage(36161, MM, C.width, C.height);
      i.framebufferRenderbuffer(36160, 36096, 36161, E);
    } else if (C.depthBuffer && C.stencilBuffer) {
      const MM = mM(C);
      Q && FM(C) === !1 ? i.renderbufferStorageMultisample(36161, MM, 35056, C.width, C.height) : FM(C) ? g.renderbufferStorageMultisampleEXT(36161, MM, 35056, C.width, C.height) : i.renderbufferStorage(36161, 34041, C.width, C.height), i.framebufferRenderbuffer(36160, 33306, 36161, E);
    } else {
      const MM = C.isWebGLMultipleRenderTargets === !0 ? C.texture : [C.texture];
      for (let X = 0; X < MM.length; X++) {
        const DM = MM[X], sM = N.convert(DM.format, DM.colorSpace), NM = N.convert(DM.type), IM = S(DM.internalFormat, sM, NM, DM.colorSpace), wM = mM(C);
        Q && FM(C) === !1 ? i.renderbufferStorageMultisample(36161, wM, IM, C.width, C.height) : FM(C) ? g.renderbufferStorageMultisampleEXT(36161, wM, IM, C.width, C.height) : i.renderbufferStorage(36161, IM, C.width, C.height);
      }
    }
    i.bindRenderbuffer(36161, null);
  }
  function TD(E, C) {
    if (C && C.isWebGLCubeRenderTarget)
      throw new Error("Depth Texture with cube render targets is not supported");
    if (D.bindFramebuffer(36160, E), !(C.depthTexture && C.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!t.get(C.depthTexture).__webglTexture || C.depthTexture.image.width !== C.width || C.depthTexture.image.height !== C.height) && (C.depthTexture.image.width = C.width, C.depthTexture.image.height = C.height, C.depthTexture.needsUpdate = !0), V(C.depthTexture, 0);
    const MM = t.get(C.depthTexture).__webglTexture, X = mM(C);
    if (C.depthTexture.format === ze)
      FM(C) ? g.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, MM, 0, X) : i.framebufferTexture2D(36160, 36096, 3553, MM, 0);
    else if (C.depthTexture.format === MN)
      FM(C) ? g.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, MM, 0, X) : i.framebufferTexture2D(36160, 33306, 3553, MM, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function CM(E) {
    const C = t.get(E), Q = E.isWebGLCubeRenderTarget === !0;
    if (E.depthTexture && !C.__autoAllocateDepthBuffer) {
      if (Q)
        throw new Error("target.depthTexture not supported in Cube render targets");
      TD(C.__webglFramebuffer, E);
    } else if (Q) {
      C.__webglDepthbuffer = [];
      for (let MM = 0; MM < 6; MM++)
        D.bindFramebuffer(36160, C.__webglFramebuffer[MM]), C.__webglDepthbuffer[MM] = i.createRenderbuffer(), W(C.__webglDepthbuffer[MM], E, !1);
    } else
      D.bindFramebuffer(36160, C.__webglFramebuffer), C.__webglDepthbuffer = i.createRenderbuffer(), W(C.__webglDepthbuffer, E, !1);
    D.bindFramebuffer(36160, null);
  }
  function pM(E, C, Q) {
    const MM = t.get(E);
    C !== void 0 && fM(MM.__webglFramebuffer, E, E.texture, 36064, 3553, 0), Q !== void 0 && CM(E);
  }
  function lM(E) {
    const C = E.texture, Q = t.get(E), MM = t.get(C);
    E.addEventListener("dispose", F), E.isWebGLMultipleRenderTargets !== !0 && (MM.__webglTexture === void 0 && (MM.__webglTexture = i.createTexture()), MM.__version = C.version, n.memory.textures++);
    const X = E.isWebGLCubeRenderTarget === !0, DM = E.isWebGLMultipleRenderTargets === !0, sM = j(E) || A;
    if (X) {
      Q.__webglFramebuffer = [];
      for (let NM = 0; NM < 6; NM++)
        if (A && C.mipmaps && C.mipmaps.length > 0) {
          Q.__webglFramebuffer[NM] = [];
          for (let IM = 0; IM < C.mipmaps.length; IM++)
            Q.__webglFramebuffer[NM][IM] = i.createFramebuffer();
        } else
          Q.__webglFramebuffer[NM] = i.createFramebuffer();
    } else {
      if (A && C.mipmaps && C.mipmaps.length > 0) {
        Q.__webglFramebuffer = [];
        for (let NM = 0; NM < C.mipmaps.length; NM++)
          Q.__webglFramebuffer[NM] = i.createFramebuffer();
      } else
        Q.__webglFramebuffer = i.createFramebuffer();
      if (DM)
        if (e.drawBuffers) {
          const NM = E.texture;
          for (let IM = 0, wM = NM.length; IM < wM; IM++) {
            const _M = t.get(NM[IM]);
            _M.__webglTexture === void 0 && (_M.__webglTexture = i.createTexture(), n.memory.textures++);
          }
        } else
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (A && E.samples > 0 && FM(E) === !1) {
        const NM = DM ? C : [C];
        Q.__webglMultisampledFramebuffer = i.createFramebuffer(), Q.__webglColorRenderbuffer = [], D.bindFramebuffer(36160, Q.__webglMultisampledFramebuffer);
        for (let IM = 0; IM < NM.length; IM++) {
          const wM = NM[IM];
          Q.__webglColorRenderbuffer[IM] = i.createRenderbuffer(), i.bindRenderbuffer(36161, Q.__webglColorRenderbuffer[IM]);
          const _M = N.convert(wM.format, wM.colorSpace), J = N.convert(wM.type), PM = S(wM.internalFormat, _M, J, wM.colorSpace, E.isXRRenderTarget === !0), dM = mM(E);
          i.renderbufferStorageMultisample(36161, dM, PM, E.width, E.height), i.framebufferRenderbuffer(36160, 36064 + IM, 36161, Q.__webglColorRenderbuffer[IM]);
        }
        i.bindRenderbuffer(36161, null), E.depthBuffer && (Q.__webglDepthRenderbuffer = i.createRenderbuffer(), W(Q.__webglDepthRenderbuffer, E, !0)), D.bindFramebuffer(36160, null);
      }
    }
    if (X) {
      D.bindTexture(34067, MM.__webglTexture), hM(34067, C, sM);
      for (let NM = 0; NM < 6; NM++)
        if (A && C.mipmaps && C.mipmaps.length > 0)
          for (let IM = 0; IM < C.mipmaps.length; IM++)
            fM(Q.__webglFramebuffer[NM][IM], E, C, 36064, 34069 + NM, IM);
        else
          fM(Q.__webglFramebuffer[NM], E, C, 36064, 34069 + NM, 0);
      d(C, sM) && h(34067), D.unbindTexture();
    } else if (DM) {
      const NM = E.texture;
      for (let IM = 0, wM = NM.length; IM < wM; IM++) {
        const _M = NM[IM], J = t.get(_M);
        D.bindTexture(3553, J.__webglTexture), hM(3553, _M, sM), fM(Q.__webglFramebuffer, E, _M, 36064 + IM, 3553, 0), d(_M, sM) && h(3553);
      }
      D.unbindTexture();
    } else {
      let NM = 3553;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (A ? NM = E.isWebGL3DRenderTarget ? 32879 : 35866 : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), D.bindTexture(NM, MM.__webglTexture), hM(NM, C, sM), A && C.mipmaps && C.mipmaps.length > 0)
        for (let IM = 0; IM < C.mipmaps.length; IM++)
          fM(Q.__webglFramebuffer[IM], E, C, 36064, NM, IM);
      else
        fM(Q.__webglFramebuffer, E, C, 36064, NM, 0);
      d(C, sM) && h(NM), D.unbindTexture();
    }
    E.depthBuffer && CM(E);
  }
  function GM(E) {
    const C = j(E) || A, Q = E.isWebGLMultipleRenderTargets === !0 ? E.texture : [E.texture];
    for (let MM = 0, X = Q.length; MM < X; MM++) {
      const DM = Q[MM];
      if (d(DM, C)) {
        const sM = E.isWebGLCubeRenderTarget ? 34067 : 3553, NM = t.get(DM).__webglTexture;
        D.bindTexture(sM, NM), h(sM), D.unbindTexture();
      }
    }
  }
  function ZM(E) {
    if (A && E.samples > 0 && FM(E) === !1) {
      const C = E.isWebGLMultipleRenderTargets ? E.texture : [E.texture], Q = E.width, MM = E.height;
      let X = 16384;
      const DM = [], sM = E.stencilBuffer ? 33306 : 36096, NM = t.get(E), IM = E.isWebGLMultipleRenderTargets === !0;
      if (IM)
        for (let wM = 0; wM < C.length; wM++)
          D.bindFramebuffer(36160, NM.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(36160, 36064 + wM, 36161, null), D.bindFramebuffer(36160, NM.__webglFramebuffer), i.framebufferTexture2D(36009, 36064 + wM, 3553, null, 0);
      D.bindFramebuffer(36008, NM.__webglMultisampledFramebuffer), D.bindFramebuffer(36009, NM.__webglFramebuffer);
      for (let wM = 0; wM < C.length; wM++) {
        DM.push(36064 + wM), E.depthBuffer && DM.push(sM);
        const _M = NM.__ignoreDepthValues !== void 0 ? NM.__ignoreDepthValues : !1;
        if (_M === !1 && (E.depthBuffer && (X |= 256), E.stencilBuffer && (X |= 1024)), IM && i.framebufferRenderbuffer(36008, 36064, 36161, NM.__webglColorRenderbuffer[wM]), _M === !0 && (i.invalidateFramebuffer(36008, [sM]), i.invalidateFramebuffer(36009, [sM])), IM) {
          const J = t.get(C[wM]).__webglTexture;
          i.framebufferTexture2D(36009, 36064, 3553, J, 0);
        }
        i.blitFramebuffer(0, 0, Q, MM, 0, 0, Q, MM, X, 9728), s && i.invalidateFramebuffer(36008, DM);
      }
      if (D.bindFramebuffer(36008, null), D.bindFramebuffer(36009, null), IM)
        for (let wM = 0; wM < C.length; wM++) {
          D.bindFramebuffer(36160, NM.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(36160, 36064 + wM, 36161, NM.__webglColorRenderbuffer[wM]);
          const _M = t.get(C[wM]).__webglTexture;
          D.bindFramebuffer(36160, NM.__webglFramebuffer), i.framebufferTexture2D(36009, 36064 + wM, 3553, _M, 0);
        }
      D.bindFramebuffer(36009, NM.__webglMultisampledFramebuffer);
    }
  }
  function mM(E) {
    return Math.min(u, E.samples);
  }
  function FM(E) {
    const C = t.get(E);
    return A && E.samples > 0 && M.has("WEBGL_multisampled_render_to_texture") === !0 && C.__useRenderToTexture !== !1;
  }
  function zD(E) {
    const C = n.render.frame;
    a.get(E) !== C && (a.set(E, C), E.update());
  }
  function uD(E, C) {
    const Q = E.colorSpace, MM = E.format, X = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || E.format === On || Q !== dt && Q !== RD && (RM.getTransfer(Q) === VM ? A === !1 ? M.has("EXT_sRGB") === !0 && MM === JD ? (E.format = On, E.minFilter = hD, E.generateMipmaps = !1) : C = WT.sRGBToLinear(C) : (MM !== JD || X !== Rt) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", Q)), C;
  }
  this.allocateTextureUnit = $, this.resetTextureUnits = R, this.setTexture2D = V, this.setTexture2DArray = U, this.setTexture3D = b, this.setTextureCube = nM, this.rebindTextures = pM, this.setupRenderTarget = lM, this.updateRenderTargetMipmap = GM, this.updateMultisampleRenderTarget = ZM, this.setupDepthRenderbuffer = CM, this.setupFrameBufferTexture = fM, this.useMultisampledRTT = FM;
}
function Ao(i, M, D) {
  const t = D.isWebGL2;
  function e(N, n = RD) {
    let A;
    const z = RM.getTransfer(n);
    if (N === Rt)
      return 5121;
    if (N === fT)
      return 32819;
    if (N === mT)
      return 32820;
    if (N === Qg)
      return 5120;
    if (N === kg)
      return 5122;
    if (N === mn)
      return 5123;
    if (N === UT)
      return 5124;
    if (N === _t)
      return 5125;
    if (N === bt)
      return 5126;
    if (N === hN)
      return t ? 5131 : (A = M.get("OES_texture_half_float"), A !== null ? A.HALF_FLOAT_OES : null);
    if (N === Sg)
      return 6406;
    if (N === JD)
      return 6408;
    if (N === Zg)
      return 6409;
    if (N === _g)
      return 6410;
    if (N === ze)
      return 6402;
    if (N === MN)
      return 34041;
    if (N === On)
      return A = M.get("EXT_sRGB"), A !== null ? A.SRGB_ALPHA_EXT : null;
    if (N === bg)
      return 6403;
    if (N === QT)
      return 36244;
    if (N === Kg)
      return 33319;
    if (N === kT)
      return 33320;
    if (N === ST)
      return 36249;
    if (N === cA || N === aA || N === oA || N === yA)
      if (z === VM)
        if (A = M.get("WEBGL_compressed_texture_s3tc_srgb"), A !== null) {
          if (N === cA)
            return A.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (N === aA)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (N === oA)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (N === yA)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (A = M.get("WEBGL_compressed_texture_s3tc"), A !== null) {
        if (N === cA)
          return A.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (N === aA)
          return A.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (N === oA)
          return A.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (N === yA)
          return A.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (N === gz || N === sz || N === rz || N === cz)
      if (A = M.get("WEBGL_compressed_texture_pvrtc"), A !== null) {
        if (N === gz)
          return A.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (N === sz)
          return A.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (N === rz)
          return A.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (N === cz)
          return A.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (N === Pg)
      return A = M.get("WEBGL_compressed_texture_etc1"), A !== null ? A.COMPRESSED_RGB_ETC1_WEBGL : null;
    if (N === az || N === oz)
      if (A = M.get("WEBGL_compressed_texture_etc"), A !== null) {
        if (N === az)
          return z === VM ? A.COMPRESSED_SRGB8_ETC2 : A.COMPRESSED_RGB8_ETC2;
        if (N === oz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : A.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (N === yz || N === jz || N === Cz || N === Lz || N === wz || N === xz || N === Oz || N === Ez || N === lz || N === hz || N === dz || N === vz || N === pz || N === Yz)
      if (A = M.get("WEBGL_compressed_texture_astc"), A !== null) {
        if (N === yz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : A.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (N === jz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : A.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (N === Cz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : A.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (N === Lz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : A.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (N === wz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : A.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (N === xz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : A.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (N === Oz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : A.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (N === Ez)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : A.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (N === lz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : A.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (N === hz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : A.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (N === dz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : A.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (N === vz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : A.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (N === pz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : A.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (N === Yz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : A.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (N === jA || N === Uz || N === fz)
      if (A = M.get("EXT_texture_compression_bptc"), A !== null) {
        if (N === jA)
          return z === VM ? A.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : A.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (N === Uz)
          return A.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (N === fz)
          return A.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (N === Rg || N === mz || N === Qz || N === kz)
      if (A = M.get("EXT_texture_compression_rgtc"), A !== null) {
        if (N === jA)
          return A.COMPRESSED_RED_RGTC1_EXT;
        if (N === mz)
          return A.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (N === Qz)
          return A.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (N === kz)
          return A.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return N === ne ? t ? 34042 : (A = M.get("WEBGL_depth_texture"), A !== null ? A.UNSIGNED_INT_24_8_WEBGL : null) : i[N] !== void 0 ? i[N] : null;
  }
  return { convert: e };
}
class no extends PD {
  constructor(M = []) {
    super(), this.isArrayCamera = !0, this.cameras = M;
  }
}
let CN = class extends pD {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
};
const zo = { type: "move" };
class KA {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new CN(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new CN(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Y(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Y()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new CN(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Y(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Y()), this._grip;
  }
  dispatchEvent(M) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(M), this._grip !== null && this._grip.dispatchEvent(M), this._hand !== null && this._hand.dispatchEvent(M), this;
  }
  connect(M) {
    if (M && M.hand) {
      const D = this._hand;
      if (D)
        for (const t of M.hand.values())
          this._getHandJoint(D, t);
    }
    return this.dispatchEvent({ type: "connected", data: M }), this;
  }
  disconnect(M) {
    return this.dispatchEvent({ type: "disconnected", data: M }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(M, D, t) {
    let e = null, N = null, n = null;
    const A = this._targetRay, z = this._grip, I = this._hand;
    if (M && D.session.visibilityState !== "visible-blurred") {
      if (I && M.hand) {
        n = !0;
        for (const o of M.hand.values()) {
          const c = D.getJointPose(o, t), r = this._getHandJoint(I, o);
          c !== null && (r.matrix.fromArray(c.transform.matrix), r.matrix.decompose(r.position, r.rotation, r.scale), r.matrixWorldNeedsUpdate = !0, r.jointRadius = c.radius), r.visible = c !== null;
        }
        const T = I.joints["index-finger-tip"], u = I.joints["thumb-tip"], g = T.position.distanceTo(u.position), s = 0.02, a = 5e-3;
        I.inputState.pinching && g > s + a ? (I.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: M.handedness,
          target: this
        })) : !I.inputState.pinching && g <= s - a && (I.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: M.handedness,
          target: this
        }));
      } else
        z !== null && M.gripSpace && (N = D.getPose(M.gripSpace, t), N !== null && (z.matrix.fromArray(N.transform.matrix), z.matrix.decompose(z.position, z.rotation, z.scale), z.matrixWorldNeedsUpdate = !0, N.linearVelocity ? (z.hasLinearVelocity = !0, z.linearVelocity.copy(N.linearVelocity)) : z.hasLinearVelocity = !1, N.angularVelocity ? (z.hasAngularVelocity = !0, z.angularVelocity.copy(N.angularVelocity)) : z.hasAngularVelocity = !1));
      A !== null && (e = D.getPose(M.targetRaySpace, t), e === null && N !== null && (e = N), e !== null && (A.matrix.fromArray(e.transform.matrix), A.matrix.decompose(A.position, A.rotation, A.scale), A.matrixWorldNeedsUpdate = !0, e.linearVelocity ? (A.hasLinearVelocity = !0, A.linearVelocity.copy(e.linearVelocity)) : A.hasLinearVelocity = !1, e.angularVelocity ? (A.hasAngularVelocity = !0, A.angularVelocity.copy(e.angularVelocity)) : A.hasAngularVelocity = !1, this.dispatchEvent(zo)));
    }
    return A !== null && (A.visible = e !== null), z !== null && (z.visible = N !== null), I !== null && (I.visible = n !== null), this;
  }
  // private method
  _getHandJoint(M, D) {
    if (M.joints[D.jointName] === void 0) {
      const t = new CN();
      t.matrixAutoUpdate = !1, t.visible = !1, M.joints[D.jointName] = t, M.add(t);
    }
    return M.joints[D.jointName];
  }
}
class Io extends Mt {
  constructor(M, D, t, e, N, n, A, z, I, T) {
    if (T = T !== void 0 ? T : ze, T !== ze && T !== MN)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    t === void 0 && T === ze && (t = _t), t === void 0 && T === MN && (t = ne), super(null, e, N, n, A, z, T, t, I), this.isDepthTexture = !0, this.image = { width: M, height: D }, this.magFilter = A !== void 0 ? A : wD, this.minFilter = z !== void 0 ? z : wD, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(M) {
    return super.copy(M), this.compareFunction = M.compareFunction, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return this.compareFunction !== null && (D.compareFunction = this.compareFunction), D;
  }
}
class To extends NN {
  constructor(M, D) {
    super();
    const t = this;
    let e = null, N = 1, n = null, A = "local-floor", z = 1, I = null, T = null, u = null, g = null, s = null, a = null;
    const o = D.getContextAttributes();
    let c = null, r = null;
    const w = [], y = [], j = new PD();
    j.layers.enable(1), j.viewport = new nD();
    const l = new PD();
    l.layers.enable(2), l.viewport = new nD();
    const d = [j, l], h = new no();
    h.layers.enable(1), h.layers.enable(2);
    let S = null, L = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(U) {
      let b = w[U];
      return b === void 0 && (b = new KA(), w[U] = b), b.getTargetRaySpace();
    }, this.getControllerGrip = function(U) {
      let b = w[U];
      return b === void 0 && (b = new KA(), w[U] = b), b.getGripSpace();
    }, this.getHand = function(U) {
      let b = w[U];
      return b === void 0 && (b = new KA(), w[U] = b), b.getHandSpace();
    };
    function O(U) {
      const b = y.indexOf(U.inputSource);
      if (b === -1)
        return;
      const nM = w[b];
      nM !== void 0 && (nM.update(U.inputSource, U.frame, I || n), nM.dispatchEvent({ type: U.type, data: U.inputSource }));
    }
    function K() {
      e.removeEventListener("select", O), e.removeEventListener("selectstart", O), e.removeEventListener("selectend", O), e.removeEventListener("squeeze", O), e.removeEventListener("squeezestart", O), e.removeEventListener("squeezeend", O), e.removeEventListener("end", K), e.removeEventListener("inputsourceschange", F);
      for (let U = 0; U < w.length; U++) {
        const b = y[U];
        b !== null && (y[U] = null, w[U].disconnect(b));
      }
      S = null, L = null, M.setRenderTarget(c), s = null, g = null, u = null, e = null, r = null, V.stop(), t.isPresenting = !1, t.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(U) {
      N = U, t.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(U) {
      A = U, t.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return I || n;
    }, this.setReferenceSpace = function(U) {
      I = U;
    }, this.getBaseLayer = function() {
      return g !== null ? g : s;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return a;
    }, this.getSession = function() {
      return e;
    }, this.setSession = async function(U) {
      if (e = U, e !== null) {
        if (c = M.getRenderTarget(), e.addEventListener("select", O), e.addEventListener("selectstart", O), e.addEventListener("selectend", O), e.addEventListener("squeeze", O), e.addEventListener("squeezestart", O), e.addEventListener("squeezeend", O), e.addEventListener("end", K), e.addEventListener("inputsourceschange", F), o.xrCompatible !== !0 && await D.makeXRCompatible(), e.renderState.layers === void 0 || M.capabilities.isWebGL2 === !1) {
          const b = {
            antialias: e.renderState.layers === void 0 ? o.antialias : !0,
            alpha: !0,
            depth: o.depth,
            stencil: o.stencil,
            framebufferScaleFactor: N
          };
          s = new XRWebGLLayer(e, D, b), e.updateRenderState({ baseLayer: s }), r = new ge(
            s.framebufferWidth,
            s.framebufferHeight,
            {
              format: JD,
              type: Rt,
              colorSpace: M.outputColorSpace,
              stencilBuffer: o.stencil
            }
          );
        } else {
          let b = null, nM = null, zM = null;
          o.depth && (zM = o.stencil ? 35056 : 33190, b = o.stencil ? MN : ze, nM = o.stencil ? ne : _t);
          const gM = {
            colorFormat: 32856,
            depthFormat: zM,
            scaleFactor: N
          };
          u = new XRWebGLBinding(e, D), g = u.createProjectionLayer(gM), e.updateRenderState({ layers: [g] }), r = new ge(
            g.textureWidth,
            g.textureHeight,
            {
              format: JD,
              type: Rt,
              depthTexture: new Io(g.textureWidth, g.textureHeight, nM, void 0, void 0, void 0, void 0, void 0, void 0, b),
              stencilBuffer: o.stencil,
              colorSpace: M.outputColorSpace,
              samples: o.antialias ? 4 : 0
            }
          );
          const yM = M.properties.get(r);
          yM.__ignoreDepthValues = g.ignoreDepthValues;
        }
        r.isXRRenderTarget = !0, this.setFoveation(z), I = null, n = await e.requestReferenceSpace(A), V.setContext(e), V.start(), t.isPresenting = !0, t.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (e !== null)
        return e.environmentBlendMode;
    };
    function F(U) {
      for (let b = 0; b < U.removed.length; b++) {
        const nM = U.removed[b], zM = y.indexOf(nM);
        zM >= 0 && (y[zM] = null, w[zM].disconnect(nM));
      }
      for (let b = 0; b < U.added.length; b++) {
        const nM = U.added[b];
        let zM = y.indexOf(nM);
        if (zM === -1) {
          for (let yM = 0; yM < w.length; yM++)
            if (yM >= y.length) {
              y.push(nM), zM = yM;
              break;
            } else if (y[yM] === null) {
              y[yM] = nM, zM = yM;
              break;
            }
          if (zM === -1)
            break;
        }
        const gM = w[zM];
        gM && gM.connect(nM);
      }
    }
    const G = new Y(), p = new Y();
    function k(U, b, nM) {
      G.setFromMatrixPosition(b.matrixWorld), p.setFromMatrixPosition(nM.matrixWorld);
      const zM = G.distanceTo(p), gM = b.projectionMatrix.elements, yM = nM.projectionMatrix.elements, hM = gM[14] / (gM[10] - 1), jM = gM[14] / (gM[10] + 1), bM = (gM[9] + 1) / gM[5], OD = (gM[9] - 1) / gM[5], fM = (gM[8] - 1) / gM[0], W = (yM[8] + 1) / yM[0], TD = hM * fM, CM = hM * W, pM = zM / (-fM + W), lM = pM * -fM;
      b.matrixWorld.decompose(U.position, U.quaternion, U.scale), U.translateX(lM), U.translateZ(pM), U.matrixWorld.compose(U.position, U.quaternion, U.scale), U.matrixWorldInverse.copy(U.matrixWorld).invert();
      const GM = hM + pM, ZM = jM + pM, mM = TD - lM, FM = CM + (zM - lM), zD = bM * jM / ZM * GM, uD = OD * jM / ZM * GM;
      U.projectionMatrix.makePerspective(mM, FM, zD, uD, GM, ZM), U.projectionMatrixInverse.copy(U.projectionMatrix).invert();
    }
    function B(U, b) {
      b === null ? U.matrixWorld.copy(U.matrix) : U.matrixWorld.multiplyMatrices(b.matrixWorld, U.matrix), U.matrixWorldInverse.copy(U.matrixWorld).invert();
    }
    this.updateCamera = function(U) {
      if (e === null)
        return;
      h.near = l.near = j.near = U.near, h.far = l.far = j.far = U.far, (S !== h.near || L !== h.far) && (e.updateRenderState({
        depthNear: h.near,
        depthFar: h.far
      }), S = h.near, L = h.far);
      const b = U.parent, nM = h.cameras;
      B(h, b);
      for (let zM = 0; zM < nM.length; zM++)
        B(nM[zM], b);
      nM.length === 2 ? k(h, j, l) : h.projectionMatrix.copy(j.projectionMatrix), R(U, h, b);
    };
    function R(U, b, nM) {
      nM === null ? U.matrix.copy(b.matrixWorld) : (U.matrix.copy(nM.matrixWorld), U.matrix.invert(), U.matrix.multiply(b.matrixWorld)), U.matrix.decompose(U.position, U.quaternion, U.scale), U.updateMatrixWorld(!0), U.projectionMatrix.copy(b.projectionMatrix), U.projectionMatrixInverse.copy(b.projectionMatrixInverse), U.isPerspectiveCamera && (U.fov = on * 2 * Math.atan(1 / U.projectionMatrix.elements[5]), U.zoom = 1);
    }
    this.getCamera = function() {
      return h;
    }, this.getFoveation = function() {
      if (!(g === null && s === null))
        return z;
    }, this.setFoveation = function(U) {
      z = U, g !== null && (g.fixedFoveation = U), s !== null && s.fixedFoveation !== void 0 && (s.fixedFoveation = U);
    };
    let $ = null;
    function H(U, b) {
      if (T = b.getViewerPose(I || n), a = b, T !== null) {
        const nM = T.views;
        s !== null && (M.setRenderTargetFramebuffer(r, s.framebuffer), M.setRenderTarget(r));
        let zM = !1;
        nM.length !== h.cameras.length && (h.cameras.length = 0, zM = !0);
        for (let gM = 0; gM < nM.length; gM++) {
          const yM = nM[gM];
          let hM = null;
          if (s !== null)
            hM = s.getViewport(yM);
          else {
            const bM = u.getViewSubImage(g, yM);
            hM = bM.viewport, gM === 0 && (M.setRenderTargetTextures(
              r,
              bM.colorTexture,
              g.ignoreDepthValues ? void 0 : bM.depthStencilTexture
            ), M.setRenderTarget(r));
          }
          let jM = d[gM];
          jM === void 0 && (jM = new PD(), jM.layers.enable(gM), jM.viewport = new nD(), d[gM] = jM), jM.matrix.fromArray(yM.transform.matrix), jM.matrix.decompose(jM.position, jM.quaternion, jM.scale), jM.projectionMatrix.fromArray(yM.projectionMatrix), jM.projectionMatrixInverse.copy(jM.projectionMatrix).invert(), jM.viewport.set(hM.x, hM.y, hM.width, hM.height), gM === 0 && (h.matrix.copy(jM.matrix), h.matrix.decompose(h.position, h.quaternion, h.scale)), zM === !0 && h.cameras.push(jM);
        }
      }
      for (let nM = 0; nM < w.length; nM++) {
        const zM = y[nM], gM = w[nM];
        zM !== null && gM !== void 0 && gM.update(zM, b, I || n);
      }
      $ && $(U, b), b.detectedPlanes && t.dispatchEvent({ type: "planesdetected", data: b }), a = null;
    }
    const V = new tu();
    V.setAnimationLoop(H), this.setAnimationLoop = function(U) {
      $ = U;
    }, this.dispose = function() {
    };
  }
}
function uo(i, M) {
  function D(c, r) {
    c.matrixAutoUpdate === !0 && c.updateMatrix(), r.value.copy(c.matrix);
  }
  function t(c, r) {
    r.color.getRGB(c.fogColor.value, eu(i)), r.isFog ? (c.fogNear.value = r.near, c.fogFar.value = r.far) : r.isFogExp2 && (c.fogDensity.value = r.density);
  }
  function e(c, r, w, y, j) {
    r.isMeshBasicMaterial || r.isMeshLambertMaterial ? N(c, r) : r.isMeshToonMaterial ? (N(c, r), u(c, r)) : r.isMeshPhongMaterial ? (N(c, r), T(c, r)) : r.isMeshStandardMaterial ? (N(c, r), g(c, r), r.isMeshPhysicalMaterial && s(c, r, j)) : r.isMeshMatcapMaterial ? (N(c, r), a(c, r)) : r.isMeshDepthMaterial ? N(c, r) : r.isMeshDistanceMaterial ? (N(c, r), o(c, r)) : r.isMeshNormalMaterial ? N(c, r) : r.isLineBasicMaterial ? (n(c, r), r.isLineDashedMaterial && A(c, r)) : r.isPointsMaterial ? z(c, r, w, y) : r.isSpriteMaterial ? I(c, r) : r.isShadowMaterial ? (c.color.value.copy(r.color), c.opacity.value = r.opacity) : r.isShaderMaterial && (r.uniformsNeedUpdate = !1);
  }
  function N(c, r) {
    c.opacity.value = r.opacity, r.color && c.diffuse.value.copy(r.color), r.emissive && c.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (c.map.value = r.map, D(r.map, c.mapTransform)), r.alphaMap && (c.alphaMap.value = r.alphaMap, D(r.alphaMap, c.alphaMapTransform)), r.bumpMap && (c.bumpMap.value = r.bumpMap, D(r.bumpMap, c.bumpMapTransform), c.bumpScale.value = r.bumpScale, r.side === vD && (c.bumpScale.value *= -1)), r.normalMap && (c.normalMap.value = r.normalMap, D(r.normalMap, c.normalMapTransform), c.normalScale.value.copy(r.normalScale), r.side === vD && c.normalScale.value.negate()), r.displacementMap && (c.displacementMap.value = r.displacementMap, D(r.displacementMap, c.displacementMapTransform), c.displacementScale.value = r.displacementScale, c.displacementBias.value = r.displacementBias), r.emissiveMap && (c.emissiveMap.value = r.emissiveMap, D(r.emissiveMap, c.emissiveMapTransform)), r.specularMap && (c.specularMap.value = r.specularMap, D(r.specularMap, c.specularMapTransform)), r.alphaTest > 0 && (c.alphaTest.value = r.alphaTest);
    const w = M.get(r).envMap;
    if (w && (c.envMap.value = w, c.flipEnvMap.value = w.isCubeTexture && w.isRenderTargetTexture === !1 ? -1 : 1, c.reflectivity.value = r.reflectivity, c.ior.value = r.ior, c.refractionRatio.value = r.refractionRatio), r.lightMap) {
      c.lightMap.value = r.lightMap;
      const y = i._useLegacyLights === !0 ? Math.PI : 1;
      c.lightMapIntensity.value = r.lightMapIntensity * y, D(r.lightMap, c.lightMapTransform);
    }
    r.aoMap && (c.aoMap.value = r.aoMap, c.aoMapIntensity.value = r.aoMapIntensity, D(r.aoMap, c.aoMapTransform));
  }
  function n(c, r) {
    c.diffuse.value.copy(r.color), c.opacity.value = r.opacity, r.map && (c.map.value = r.map, D(r.map, c.mapTransform));
  }
  function A(c, r) {
    c.dashSize.value = r.dashSize, c.totalSize.value = r.dashSize + r.gapSize, c.scale.value = r.scale;
  }
  function z(c, r, w, y) {
    c.diffuse.value.copy(r.color), c.opacity.value = r.opacity, c.size.value = r.size * w, c.scale.value = y * 0.5, r.map && (c.map.value = r.map, D(r.map, c.uvTransform)), r.alphaMap && (c.alphaMap.value = r.alphaMap, D(r.alphaMap, c.alphaMapTransform)), r.alphaTest > 0 && (c.alphaTest.value = r.alphaTest);
  }
  function I(c, r) {
    c.diffuse.value.copy(r.color), c.opacity.value = r.opacity, c.rotation.value = r.rotation, r.map && (c.map.value = r.map, D(r.map, c.mapTransform)), r.alphaMap && (c.alphaMap.value = r.alphaMap, D(r.alphaMap, c.alphaMapTransform)), r.alphaTest > 0 && (c.alphaTest.value = r.alphaTest);
  }
  function T(c, r) {
    c.specular.value.copy(r.specular), c.shininess.value = Math.max(r.shininess, 1e-4);
  }
  function u(c, r) {
    r.gradientMap && (c.gradientMap.value = r.gradientMap);
  }
  function g(c, r) {
    c.metalness.value = r.metalness, r.metalnessMap && (c.metalnessMap.value = r.metalnessMap, D(r.metalnessMap, c.metalnessMapTransform)), c.roughness.value = r.roughness, r.roughnessMap && (c.roughnessMap.value = r.roughnessMap, D(r.roughnessMap, c.roughnessMapTransform)), M.get(r).envMap && (c.envMapIntensity.value = r.envMapIntensity);
  }
  function s(c, r, w) {
    c.ior.value = r.ior, r.sheen > 0 && (c.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen), c.sheenRoughness.value = r.sheenRoughness, r.sheenColorMap && (c.sheenColorMap.value = r.sheenColorMap, D(r.sheenColorMap, c.sheenColorMapTransform)), r.sheenRoughnessMap && (c.sheenRoughnessMap.value = r.sheenRoughnessMap, D(r.sheenRoughnessMap, c.sheenRoughnessMapTransform))), r.clearcoat > 0 && (c.clearcoat.value = r.clearcoat, c.clearcoatRoughness.value = r.clearcoatRoughness, r.clearcoatMap && (c.clearcoatMap.value = r.clearcoatMap, D(r.clearcoatMap, c.clearcoatMapTransform)), r.clearcoatRoughnessMap && (c.clearcoatRoughnessMap.value = r.clearcoatRoughnessMap, D(r.clearcoatRoughnessMap, c.clearcoatRoughnessMapTransform)), r.clearcoatNormalMap && (c.clearcoatNormalMap.value = r.clearcoatNormalMap, D(r.clearcoatNormalMap, c.clearcoatNormalMapTransform), c.clearcoatNormalScale.value.copy(r.clearcoatNormalScale), r.side === vD && c.clearcoatNormalScale.value.negate())), r.iridescence > 0 && (c.iridescence.value = r.iridescence, c.iridescenceIOR.value = r.iridescenceIOR, c.iridescenceThicknessMinimum.value = r.iridescenceThicknessRange[0], c.iridescenceThicknessMaximum.value = r.iridescenceThicknessRange[1], r.iridescenceMap && (c.iridescenceMap.value = r.iridescenceMap, D(r.iridescenceMap, c.iridescenceMapTransform)), r.iridescenceThicknessMap && (c.iridescenceThicknessMap.value = r.iridescenceThicknessMap, D(r.iridescenceThicknessMap, c.iridescenceThicknessMapTransform))), r.transmission > 0 && (c.transmission.value = r.transmission, c.transmissionSamplerMap.value = w.texture, c.transmissionSamplerSize.value.set(w.width, w.height), r.transmissionMap && (c.transmissionMap.value = r.transmissionMap, D(r.transmissionMap, c.transmissionMapTransform)), c.thickness.value = r.thickness, r.thicknessMap && (c.thicknessMap.value = r.thicknessMap, D(r.thicknessMap, c.thicknessMapTransform)), c.attenuationDistance.value = r.attenuationDistance, c.attenuationColor.value.copy(r.attenuationColor)), r.anisotropy > 0 && (c.anisotropyVector.value.set(r.anisotropy * Math.cos(r.anisotropyRotation), r.anisotropy * Math.sin(r.anisotropyRotation)), r.anisotropyMap && (c.anisotropyMap.value = r.anisotropyMap, D(r.anisotropyMap, c.anisotropyMapTransform))), c.specularIntensity.value = r.specularIntensity, c.specularColor.value.copy(r.specularColor), r.specularColorMap && (c.specularColorMap.value = r.specularColorMap, D(r.specularColorMap, c.specularColorMapTransform)), r.specularIntensityMap && (c.specularIntensityMap.value = r.specularIntensityMap, D(r.specularIntensityMap, c.specularIntensityMapTransform));
  }
  function a(c, r) {
    r.matcap && (c.matcap.value = r.matcap);
  }
  function o(c, r) {
    const w = M.get(r).light;
    c.referencePosition.value.setFromMatrixPosition(w.matrixWorld), c.nearDistance.value = w.shadow.camera.near, c.farDistance.value = w.shadow.camera.far;
  }
  return {
    refreshFogUniforms: t,
    refreshMaterialUniforms: e
  };
}
function go(i, M, D, t) {
  let e = {}, N = {}, n = [];
  const A = D.isWebGL2 ? i.getParameter(35375) : 0;
  function z(w, y) {
    const j = y.program;
    t.uniformBlockBinding(w, j);
  }
  function I(w, y) {
    let j = e[w.id];
    j === void 0 && (a(w), j = T(w), e[w.id] = j, w.addEventListener("dispose", c));
    const l = y.program;
    t.updateUBOMapping(w, l);
    const d = M.render.frame;
    N[w.id] !== d && (g(w), N[w.id] = d);
  }
  function T(w) {
    const y = u();
    w.__bindingPointIndex = y;
    const j = i.createBuffer(), l = w.__size, d = w.usage;
    return i.bindBuffer(35345, j), i.bufferData(35345, l, d), i.bindBuffer(35345, null), i.bindBufferBase(35345, y, j), j;
  }
  function u() {
    for (let w = 0; w < A; w++)
      if (n.indexOf(w) === -1)
        return n.push(w), w;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function g(w) {
    const y = e[w.id], j = w.uniforms, l = w.__cache;
    i.bindBuffer(35345, y);
    for (let d = 0, h = j.length; d < h; d++) {
      const S = j[d];
      if (s(S, d, l) === !0) {
        const L = S.__offset, O = Array.isArray(S.value) ? S.value : [S.value];
        let K = 0;
        for (let F = 0; F < O.length; F++) {
          const G = O[F], p = o(G);
          typeof G == "number" ? (S.__data[0] = G, i.bufferSubData(35345, L + K, S.__data)) : G.isMatrix3 ? (S.__data[0] = G.elements[0], S.__data[1] = G.elements[1], S.__data[2] = G.elements[2], S.__data[3] = G.elements[0], S.__data[4] = G.elements[3], S.__data[5] = G.elements[4], S.__data[6] = G.elements[5], S.__data[7] = G.elements[0], S.__data[8] = G.elements[6], S.__data[9] = G.elements[7], S.__data[10] = G.elements[8], S.__data[11] = G.elements[0]) : (G.toArray(S.__data, K), K += p.storage / Float32Array.BYTES_PER_ELEMENT);
        }
        i.bufferSubData(35345, L, S.__data);
      }
    }
    i.bindBuffer(35345, null);
  }
  function s(w, y, j) {
    const l = w.value;
    if (j[y] === void 0) {
      if (typeof l == "number")
        j[y] = l;
      else {
        const d = Array.isArray(l) ? l : [l], h = [];
        for (let S = 0; S < d.length; S++)
          h.push(d[S].clone());
        j[y] = h;
      }
      return !0;
    } else if (typeof l == "number") {
      if (j[y] !== l)
        return j[y] = l, !0;
    } else {
      const d = Array.isArray(j[y]) ? j[y] : [j[y]], h = Array.isArray(l) ? l : [l];
      for (let S = 0; S < d.length; S++) {
        const L = d[S];
        if (L.equals(h[S]) === !1)
          return L.copy(h[S]), !0;
      }
    }
    return !1;
  }
  function a(w) {
    const y = w.uniforms;
    let j = 0;
    const l = 16;
    let d = 0;
    for (let h = 0, S = y.length; h < S; h++) {
      const L = y[h], O = {
        boundary: 0,
        // bytes
        storage: 0
        // bytes
      }, K = Array.isArray(L.value) ? L.value : [L.value];
      for (let F = 0, G = K.length; F < G; F++) {
        const p = K[F], k = o(p);
        O.boundary += k.boundary, O.storage += k.storage;
      }
      if (L.__data = new Float32Array(O.storage / Float32Array.BYTES_PER_ELEMENT), L.__offset = j, h > 0) {
        d = j % l;
        const F = l - d;
        d !== 0 && F - O.boundary < 0 && (j += l - d, L.__offset = j);
      }
      j += O.storage;
    }
    return d = j % l, d > 0 && (j += l - d), w.__size = j, w.__cache = {}, this;
  }
  function o(w) {
    const y = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof w == "number" ? (y.boundary = 4, y.storage = 4) : w.isVector2 ? (y.boundary = 8, y.storage = 8) : w.isVector3 || w.isColor ? (y.boundary = 16, y.storage = 12) : w.isVector4 ? (y.boundary = 16, y.storage = 16) : w.isMatrix3 ? (y.boundary = 48, y.storage = 48) : w.isMatrix4 ? (y.boundary = 64, y.storage = 64) : w.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", w), y;
  }
  function c(w) {
    const y = w.target;
    y.removeEventListener("dispose", c);
    const j = n.indexOf(y.__bindingPointIndex);
    n.splice(j, 1), i.deleteBuffer(e[y.id]), delete e[y.id], delete N[y.id];
  }
  function r() {
    for (const w in e)
      i.deleteBuffer(e[w]);
    n = [], e = {}, N = {};
  }
  return {
    bind: z,
    update: I,
    dispose: r
  };
}
class so {
  constructor(M = {}) {
    const {
      canvas: D = js(),
      context: t = null,
      depth: e = !0,
      stencil: N = !0,
      alpha: n = !1,
      antialias: A = !1,
      premultipliedAlpha: z = !0,
      preserveDrawingBuffer: I = !1,
      powerPreference: T = "default",
      failIfMajorPerformanceCaveat: u = !1
    } = M;
    this.isWebGLRenderer = !0;
    let g;
    t !== null ? g = t.getContextAttributes().alpha : g = n;
    const s = new Uint32Array(4), a = new Int32Array(4);
    let o = null, c = null;
    const r = [], w = [];
    this.domElement = D, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = tD, this._useLegacyLights = !1, this.toneMapping = Pt, this.toneMappingExposure = 1;
    const y = this;
    let j = !1, l = 0, d = 0, h = null, S = -1, L = null;
    const O = new nD(), K = new nD();
    let F = null;
    const G = new KM(0);
    let p = 0, k = D.width, B = D.height, R = 1, $ = null, H = null;
    const V = new nD(0, 0, k, B), U = new nD(0, 0, k, B);
    let b = !1;
    const nM = new Sn();
    let zM = !1, gM = !1, yM = null;
    const hM = new ID(), jM = new rM(), bM = new Y(), OD = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function fM() {
      return h === null ? R : 1;
    }
    let W = t;
    function TD(x, f) {
      for (let Z = 0; Z < x.length; Z++) {
        const m = x[Z], _ = D.getContext(m, f);
        if (_ !== null)
          return _;
      }
      return null;
    }
    try {
      const x = {
        alpha: !0,
        depth: e,
        stencil: N,
        antialias: A,
        premultipliedAlpha: z,
        preserveDrawingBuffer: I,
        powerPreference: T,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in D && D.setAttribute("data-engine", `three.js r${Ng}`), D.addEventListener("webglcontextlost", eM, !1), D.addEventListener("webglcontextrestored", tM, !1), D.addEventListener("webglcontextcreationerror", TM, !1), W === null) {
        const f = ["webgl2", "webgl", "experimental-webgl"];
        if (y.isWebGL1Renderer === !0 && f.shift(), W = TD(f, x), W === null)
          throw TD(f) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
      typeof WebGLRenderingContext < "u" && W instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."), W.getShaderPrecisionFormat === void 0 && (W.getShaderPrecisionFormat = function() {
        return { rangeMin: 1, rangeMax: 1, precision: 1 };
      });
    } catch (x) {
      throw console.error("THREE.WebGLRenderer: " + x.message), x;
    }
    let CM, pM, lM, GM, ZM, mM, FM, zD, uD, E, C, Q, MM, X, DM, sM, NM, IM, wM, _M, J, PM, dM, xM;
    function oM() {
      CM = new wa(W), pM = new sa(W, CM, M), CM.init(pM), PM = new Ao(W, CM, pM), lM = new No(W, CM, pM), GM = new Ea(), ZM = new F0(), mM = new io(W, CM, lM, ZM, pM, PM, GM), FM = new ya(y), zD = new La(y), uD = new ds(W, pM), dM = new ua(W, CM, uD, pM), E = new xa(W, uD, GM, dM), C = new va(W, E, uD, GM), wM = new da(W, pM, mM), sM = new ra(ZM), Q = new R0(y, FM, zD, CM, pM, dM, sM), MM = new uo(y, ZM), X = new V0(), DM = new $0(CM, pM), IM = new Ta(y, FM, zD, lM, C, g, z), NM = new eo(y, C, pM), xM = new go(W, GM, pM, lM), _M = new ga(W, CM, GM, pM), J = new Oa(W, CM, GM, pM), GM.programs = Q.programs, y.capabilities = pM, y.extensions = CM, y.properties = ZM, y.renderLists = X, y.shadowMap = NM, y.state = lM, y.info = GM;
    }
    oM();
    const v = new To(y, W);
    this.xr = v, this.getContext = function() {
      return W;
    }, this.getContextAttributes = function() {
      return W.getContextAttributes();
    }, this.forceContextLoss = function() {
      const x = CM.get("WEBGL_lose_context");
      x && x.loseContext();
    }, this.forceContextRestore = function() {
      const x = CM.get("WEBGL_lose_context");
      x && x.restoreContext();
    }, this.getPixelRatio = function() {
      return R;
    }, this.setPixelRatio = function(x) {
      x !== void 0 && (R = x, this.setSize(k, B, !1));
    }, this.getSize = function(x) {
      return x.set(k, B);
    }, this.setSize = function(x, f, Z = !0) {
      if (v.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      k = x, B = f, D.width = Math.floor(x * R), D.height = Math.floor(f * R), Z === !0 && (D.style.width = x + "px", D.style.height = f + "px"), this.setViewport(0, 0, x, f);
    }, this.getDrawingBufferSize = function(x) {
      return x.set(k * R, B * R).floor();
    }, this.setDrawingBufferSize = function(x, f, Z) {
      k = x, B = f, R = Z, D.width = Math.floor(x * Z), D.height = Math.floor(f * Z), this.setViewport(0, 0, x, f);
    }, this.getCurrentViewport = function(x) {
      return x.copy(O);
    }, this.getViewport = function(x) {
      return x.copy(V);
    }, this.setViewport = function(x, f, Z, m) {
      x.isVector4 ? V.set(x.x, x.y, x.z, x.w) : V.set(x, f, Z, m), lM.viewport(O.copy(V).multiplyScalar(R).floor());
    }, this.getScissor = function(x) {
      return x.copy(U);
    }, this.setScissor = function(x, f, Z, m) {
      x.isVector4 ? U.set(x.x, x.y, x.z, x.w) : U.set(x, f, Z, m), lM.scissor(K.copy(U).multiplyScalar(R).floor());
    }, this.getScissorTest = function() {
      return b;
    }, this.setScissorTest = function(x) {
      lM.setScissorTest(b = x);
    }, this.setOpaqueSort = function(x) {
      $ = x;
    }, this.setTransparentSort = function(x) {
      H = x;
    }, this.getClearColor = function(x) {
      return x.copy(IM.getClearColor());
    }, this.setClearColor = function() {
      IM.setClearColor.apply(IM, arguments);
    }, this.getClearAlpha = function() {
      return IM.getClearAlpha();
    }, this.setClearAlpha = function() {
      IM.setClearAlpha.apply(IM, arguments);
    }, this.clear = function(x = !0, f = !0, Z = !0) {
      let m = 0;
      if (x) {
        let _ = !1;
        if (h !== null) {
          const uM = h.texture.format;
          _ = uM === ST || uM === kT || uM === QT;
        }
        if (_) {
          const uM = h.texture.type, aM = uM === Rt || uM === _t || uM === mn || uM === ne || uM === fT || uM === mT, OM = IM.getClearColor(), EM = IM.getClearAlpha(), QM = OM.r, LM = OM.g, YM = OM.b;
          aM ? (s[0] = QM, s[1] = LM, s[2] = YM, s[3] = EM, W.clearBufferuiv(6144, 0, s)) : (a[0] = QM, a[1] = LM, a[2] = YM, a[3] = EM, W.clearBufferiv(6144, 0, a));
        } else
          m |= 16384;
      }
      f && (m |= 256), Z && (m |= 1024), W.clear(m);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      D.removeEventListener("webglcontextlost", eM, !1), D.removeEventListener("webglcontextrestored", tM, !1), D.removeEventListener("webglcontextcreationerror", TM, !1), X.dispose(), DM.dispose(), ZM.dispose(), FM.dispose(), zD.dispose(), C.dispose(), dM.dispose(), xM.dispose(), Q.dispose(), v.dispose(), v.removeEventListener("sessionstart", BM), v.removeEventListener("sessionend", Dt), yM && (yM.dispose(), yM = null), jD.stop();
    };
    function eM(x) {
      x.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), j = !0;
    }
    function tM() {
      console.log("THREE.WebGLRenderer: Context Restored."), j = !1;
      const x = GM.autoReset, f = NM.enabled, Z = NM.autoUpdate, m = NM.needsUpdate, _ = NM.type;
      oM(), GM.autoReset = x, NM.enabled = f, NM.autoUpdate = Z, NM.needsUpdate = m, NM.type = _;
    }
    function TM(x) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function AM(x) {
      const f = x.target;
      f.removeEventListener("dispose", AM), q(f);
    }
    function q(x) {
      cM(x), ZM.remove(x);
    }
    function cM(x) {
      const f = ZM.get(x).programs;
      f !== void 0 && (f.forEach(function(Z) {
        Q.releaseProgram(Z);
      }), x.isShaderMaterial && Q.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, f, Z, m, _, uM) {
      f === null && (f = OD);
      const aM = _.isMesh && _.matrixWorld.determinant() < 0, OM = Ou(x, f, Z, m, _);
      lM.setMaterial(m, aM);
      let EM = Z.index, QM = 1;
      if (m.wireframe === !0) {
        if (EM = E.getWireframeAttribute(Z), EM === void 0)
          return;
        QM = 2;
      }
      const LM = Z.drawRange, YM = Z.attributes.position;
      let WM = LM.start * QM, qM = (LM.start + LM.count) * QM;
      uM !== null && (WM = Math.max(WM, uM.start * QM), qM = Math.min(qM, (uM.start + uM.count) * QM)), EM !== null ? (WM = Math.max(WM, 0), qM = Math.min(qM, EM.count)) : YM != null && (WM = Math.max(WM, 0), qM = Math.min(qM, YM.count));
      const SD = qM - WM;
      if (SD < 0 || SD === 1 / 0)
        return;
      dM.setup(_, m, OM, Z, EM);
      let zt, XM = _M;
      if (EM !== null && (zt = uD.get(EM), XM = J, XM.setIndex(zt)), _.isMesh)
        m.wireframe === !0 ? (lM.setLineWidth(m.wireframeLinewidth * fM()), XM.setMode(1)) : XM.setMode(4);
      else if (_.isLine) {
        let kM = m.linewidth;
        kM === void 0 && (kM = 1), lM.setLineWidth(kM * fM()), _.isLineSegments ? XM.setMode(1) : _.isLineLoop ? XM.setMode(2) : XM.setMode(3);
      } else
        _.isPoints ? XM.setMode(0) : _.isSprite && XM.setMode(4);
      if (_.isInstancedMesh)
        XM.renderInstances(WM, SD, _.count);
      else if (Z.isInstancedBufferGeometry) {
        const kM = Z._maxInstanceCount !== void 0 ? Z._maxInstanceCount : 1 / 0, AA = Math.min(Z.instanceCount, kM);
        XM.renderInstances(WM, SD, AA);
      } else
        XM.render(WM, SD);
    }, this.compile = function(x, f) {
      function Z(m, _, uM) {
        m.transparent === !0 && m.side === Ot && m.forceSinglePass === !1 ? (m.side = vD, m.needsUpdate = !0, KN(m, _, uM), m.side = Ft, m.needsUpdate = !0, KN(m, _, uM), m.side = Ot) : KN(m, _, uM);
      }
      c = DM.get(x), c.init(), w.push(c), x.traverseVisible(function(m) {
        m.isLight && m.layers.test(f.layers) && (c.pushLight(m), m.castShadow && c.pushShadow(m));
      }), c.setupLights(y._useLegacyLights), x.traverse(function(m) {
        const _ = m.material;
        if (_)
          if (Array.isArray(_))
            for (let uM = 0; uM < _.length; uM++) {
              const aM = _[uM];
              Z(aM, x, m);
            }
          else
            Z(_, x, m);
      }), w.pop(), c = null;
    };
    let vM = null;
    function yD(x) {
      vM && vM(x);
    }
    function BM() {
      jD.stop();
    }
    function Dt() {
      jD.start();
    }
    const jD = new tu();
    jD.setAnimationLoop(yD), typeof self < "u" && jD.setContext(self), this.setAnimationLoop = function(x) {
      vM = x, v.setAnimationLoop(x), x === null ? jD.stop() : jD.start();
    }, v.addEventListener("sessionstart", BM), v.addEventListener("sessionend", Dt), this.render = function(x, f) {
      if (f !== void 0 && f.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (j === !0)
        return;
      x.matrixWorldAutoUpdate === !0 && x.updateMatrixWorld(), f.parent === null && f.matrixWorldAutoUpdate === !0 && f.updateMatrixWorld(), v.enabled === !0 && v.isPresenting === !0 && (v.cameraAutoUpdate === !0 && v.updateCamera(f), f = v.getCamera()), x.isScene === !0 && x.onBeforeRender(y, x, f, h), c = DM.get(x, w.length), c.init(), w.push(c), hM.multiplyMatrices(f.projectionMatrix, f.matrixWorldInverse), nM.setFromProjectionMatrix(hM), gM = this.localClippingEnabled, zM = sM.init(this.clippingPlanes, gM), o = X.get(x, r.length), o.init(), r.push(o), Gn(x, f, 0, y.sortObjects), o.finish(), y.sortObjects === !0 && o.sort($, H), this.info.render.frame++, zM === !0 && sM.beginShadows();
      const Z = c.state.shadowsArray;
      if (NM.render(Z, x, f), zM === !0 && sM.endShadows(), this.info.autoReset === !0 && this.info.reset(), IM.render(o, x), c.setupLights(y._useLegacyLights), f.isArrayCamera) {
        const m = f.cameras;
        for (let _ = 0, uM = m.length; _ < uM; _++) {
          const aM = m[_];
          Hn(o, x, aM, aM.viewport);
        }
      } else
        Hn(o, x, f);
      h !== null && (mM.updateMultisampleRenderTarget(h), mM.updateRenderTargetMipmap(h)), x.isScene === !0 && x.onAfterRender(y, x, f), dM.resetDefaultState(), S = -1, L = null, w.pop(), w.length > 0 ? c = w[w.length - 1] : c = null, r.pop(), r.length > 0 ? o = r[r.length - 1] : o = null;
    };
    function Gn(x, f, Z, m) {
      if (x.visible === !1)
        return;
      if (x.layers.test(f.layers)) {
        if (x.isGroup)
          Z = x.renderOrder;
        else if (x.isLOD)
          x.autoUpdate === !0 && x.update(f);
        else if (x.isLight)
          c.pushLight(x), x.castShadow && c.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || nM.intersectsSprite(x)) {
            m && bM.setFromMatrixPosition(x.matrixWorld).applyMatrix4(hM);
            const aM = C.update(x), OM = x.material;
            OM.visible && o.push(x, aM, OM, Z, bM.z, null);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || nM.intersectsObject(x))) {
          const aM = C.update(x), OM = x.material;
          if (m && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), bM.copy(x.boundingSphere.center)) : (aM.boundingSphere === null && aM.computeBoundingSphere(), bM.copy(aM.boundingSphere.center)), bM.applyMatrix4(x.matrixWorld).applyMatrix4(hM)), Array.isArray(OM)) {
            const EM = aM.groups;
            for (let QM = 0, LM = EM.length; QM < LM; QM++) {
              const YM = EM[QM], WM = OM[YM.materialIndex];
              WM && WM.visible && o.push(x, aM, WM, Z, bM.z, YM);
            }
          } else
            OM.visible && o.push(x, aM, OM, Z, bM.z, null);
        }
      }
      const uM = x.children;
      for (let aM = 0, OM = uM.length; aM < OM; aM++)
        Gn(uM[aM], f, Z, m);
    }
    function Hn(x, f, Z, m) {
      const _ = x.opaque, uM = x.transmissive, aM = x.transparent;
      c.setupLightsView(Z), zM === !0 && sM.setGlobalState(y.clippingPlanes, Z), uM.length > 0 && xu(_, uM, f, Z), m && lM.viewport(O.copy(m)), _.length > 0 && bN(_, f, Z), uM.length > 0 && bN(uM, f, Z), aM.length > 0 && bN(aM, f, Z), lM.buffers.depth.setTest(!0), lM.buffers.depth.setMask(!0), lM.buffers.color.setMask(!0), lM.setPolygonOffset(!1);
    }
    function xu(x, f, Z, m) {
      const _ = pM.isWebGL2;
      yM === null && (yM = new ge(1, 1, {
        generateMipmaps: !0,
        type: CM.has("EXT_color_buffer_half_float") ? hN : Rt,
        minFilter: lN,
        samples: _ ? 4 : 0
      })), y.getDrawingBufferSize(jM), _ ? yM.setSize(jM.x, jM.y) : yM.setSize(yn(jM.x), yn(jM.y));
      const uM = y.getRenderTarget();
      y.setRenderTarget(yM), y.getClearColor(G), p = y.getClearAlpha(), p < 1 && y.setClearColor(16777215, 0.5), y.clear();
      const aM = y.toneMapping;
      y.toneMapping = Pt, bN(x, Z, m), mM.updateMultisampleRenderTarget(yM), mM.updateRenderTargetMipmap(yM);
      let OM = !1;
      for (let EM = 0, QM = f.length; EM < QM; EM++) {
        const LM = f[EM], YM = LM.object, WM = LM.geometry, qM = LM.material, SD = LM.group;
        if (qM.side === Ot && YM.layers.test(m.layers)) {
          const zt = qM.side;
          qM.side = vD, qM.needsUpdate = !0, Wn(YM, Z, m, WM, qM, SD), qM.side = zt, qM.needsUpdate = !0, OM = !0;
        }
      }
      OM === !0 && (mM.updateMultisampleRenderTarget(yM), mM.updateRenderTargetMipmap(yM)), y.setRenderTarget(uM), y.setClearColor(G, p), y.toneMapping = aM;
    }
    function bN(x, f, Z) {
      const m = f.isScene === !0 ? f.overrideMaterial : null;
      for (let _ = 0, uM = x.length; _ < uM; _++) {
        const aM = x[_], OM = aM.object, EM = aM.geometry, QM = m === null ? aM.material : m, LM = aM.group;
        OM.layers.test(Z.layers) && Wn(OM, f, Z, EM, QM, LM);
      }
    }
    function Wn(x, f, Z, m, _, uM) {
      x.onBeforeRender(y, f, Z, m, _, uM), x.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), _.onBeforeRender(y, f, Z, m, x, uM), _.transparent === !0 && _.side === Ot && _.forceSinglePass === !1 ? (_.side = vD, _.needsUpdate = !0, y.renderBufferDirect(Z, f, m, _, x, uM), _.side = Ft, _.needsUpdate = !0, y.renderBufferDirect(Z, f, m, _, x, uM), _.side = Ot) : y.renderBufferDirect(Z, f, m, _, x, uM), x.onAfterRender(y, f, Z, m, _, uM);
    }
    function KN(x, f, Z) {
      f.isScene !== !0 && (f = OD);
      const m = ZM.get(x), _ = c.state.lights, uM = c.state.shadowsArray, aM = _.state.version, OM = Q.getParameters(x, _.state, uM, f, Z), EM = Q.getProgramCacheKey(OM);
      let QM = m.programs;
      m.environment = x.isMeshStandardMaterial ? f.environment : null, m.fog = f.fog, m.envMap = (x.isMeshStandardMaterial ? zD : FM).get(x.envMap || m.environment), QM === void 0 && (x.addEventListener("dispose", AM), QM = /* @__PURE__ */ new Map(), m.programs = QM);
      let LM = QM.get(EM);
      if (LM !== void 0) {
        if (m.currentProgram === LM && m.lightsStateVersion === aM)
          return qn(x, OM), LM;
      } else
        OM.uniforms = Q.getUniforms(x), x.onBuild(Z, OM, y), x.onBeforeCompile(OM, y), LM = Q.acquireProgram(OM, EM), QM.set(EM, LM), m.uniforms = OM.uniforms;
      const YM = m.uniforms;
      (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === !0) && (YM.clippingPlanes = sM.uniform), qn(x, OM), m.needsLights = lu(x), m.lightsStateVersion = aM, m.needsLights && (YM.ambientLightColor.value = _.state.ambient, YM.lightProbe.value = _.state.probe, YM.directionalLights.value = _.state.directional, YM.directionalLightShadows.value = _.state.directionalShadow, YM.spotLights.value = _.state.spot, YM.spotLightShadows.value = _.state.spotShadow, YM.rectAreaLights.value = _.state.rectArea, YM.ltc_1.value = _.state.rectAreaLTC1, YM.ltc_2.value = _.state.rectAreaLTC2, YM.pointLights.value = _.state.point, YM.pointLightShadows.value = _.state.pointShadow, YM.hemisphereLights.value = _.state.hemi, YM.directionalShadowMap.value = _.state.directionalShadowMap, YM.directionalShadowMatrix.value = _.state.directionalShadowMatrix, YM.spotShadowMap.value = _.state.spotShadowMap, YM.spotLightMatrix.value = _.state.spotLightMatrix, YM.spotLightMap.value = _.state.spotLightMap, YM.pointShadowMap.value = _.state.pointShadowMap, YM.pointShadowMatrix.value = _.state.pointShadowMatrix);
      const WM = LM.getUniforms(), qM = _i.seqWithValue(WM.seq, YM);
      return m.currentProgram = LM, m.uniformsList = qM, LM;
    }
    function qn(x, f) {
      const Z = ZM.get(x);
      Z.outputColorSpace = f.outputColorSpace, Z.instancing = f.instancing, Z.instancingColor = f.instancingColor, Z.skinning = f.skinning, Z.morphTargets = f.morphTargets, Z.morphNormals = f.morphNormals, Z.morphColors = f.morphColors, Z.morphTargetsCount = f.morphTargetsCount, Z.numClippingPlanes = f.numClippingPlanes, Z.numIntersection = f.numClipIntersection, Z.vertexAlphas = f.vertexAlphas, Z.vertexTangents = f.vertexTangents, Z.toneMapping = f.toneMapping;
    }
    function Ou(x, f, Z, m, _) {
      f.isScene !== !0 && (f = OD), mM.resetTextureUnits();
      const uM = f.fog, aM = m.isMeshStandardMaterial ? f.environment : null, OM = h === null ? y.outputColorSpace : h.isXRRenderTarget === !0 ? h.texture.colorSpace : dt, EM = (m.isMeshStandardMaterial ? zD : FM).get(m.envMap || aM), QM = m.vertexColors === !0 && !!Z.attributes.color && Z.attributes.color.itemSize === 4, LM = !!Z.attributes.tangent && (!!m.normalMap || m.anisotropy > 0), YM = !!Z.morphAttributes.position, WM = !!Z.morphAttributes.normal, qM = !!Z.morphAttributes.color;
      let SD = Pt;
      m.toneMapped && (h === null || h.isXRRenderTarget === !0) && (SD = y.toneMapping);
      const zt = Z.morphAttributes.position || Z.morphAttributes.normal || Z.morphAttributes.color, XM = zt !== void 0 ? zt.length : 0, kM = ZM.get(m), AA = c.state.lights;
      if (zM === !0 && (gM === !0 || x !== L)) {
        const YD = x === L && m.id === S;
        sM.setState(m, x, YD);
      }
      let $M = !1;
      m.version === kM.__version ? (kM.needsLights && kM.lightsStateVersion !== AA.state.version || kM.outputColorSpace !== OM || _.isInstancedMesh && kM.instancing === !1 || !_.isInstancedMesh && kM.instancing === !0 || _.isSkinnedMesh && kM.skinning === !1 || !_.isSkinnedMesh && kM.skinning === !0 || _.isInstancedMesh && kM.instancingColor === !0 && _.instanceColor === null || _.isInstancedMesh && kM.instancingColor === !1 && _.instanceColor !== null || kM.envMap !== EM || m.fog === !0 && kM.fog !== uM || kM.numClippingPlanes !== void 0 && (kM.numClippingPlanes !== sM.numPlanes || kM.numIntersection !== sM.numIntersection) || kM.vertexAlphas !== QM || kM.vertexTangents !== LM || kM.morphTargets !== YM || kM.morphNormals !== WM || kM.morphColors !== qM || kM.toneMapping !== SD || pM.isWebGL2 === !0 && kM.morphTargetsCount !== XM) && ($M = !0) : ($M = !0, kM.__version = m.version);
      let Gt = kM.currentProgram;
      $M === !0 && (Gt = KN(m, f, _));
      let Xn = !1, zN = !1, nA = !1;
      const CD = Gt.getUniforms(), Ht = kM.uniforms;
      if (lM.useProgram(Gt.program) && (Xn = !0, zN = !0, nA = !0), m.id !== S && (S = m.id, zN = !0), Xn || L !== x) {
        CD.setValue(W, "projectionMatrix", x.projectionMatrix), CD.setValue(W, "viewMatrix", x.matrixWorldInverse);
        const YD = CD.map.cameraPosition;
        YD !== void 0 && YD.setValue(W, bM.setFromMatrixPosition(x.matrixWorld)), pM.logarithmicDepthBuffer && CD.setValue(
          W,
          "logDepthBufFC",
          2 / (Math.log(x.far + 1) / Math.LN2)
        ), (m.isMeshPhongMaterial || m.isMeshToonMaterial || m.isMeshLambertMaterial || m.isMeshBasicMaterial || m.isMeshStandardMaterial || m.isShaderMaterial) && CD.setValue(W, "isOrthographic", x.isOrthographicCamera === !0), L !== x && (L = x, zN = !0, nA = !0);
      }
      if (_.isSkinnedMesh) {
        CD.setOptional(W, _, "bindMatrix"), CD.setOptional(W, _, "bindMatrixInverse");
        const YD = _.skeleton;
        YD && (pM.floatVertexTextures ? (YD.boneTexture === null && YD.computeBoneTexture(), CD.setValue(W, "boneTexture", YD.boneTexture, mM), CD.setValue(W, "boneTextureSize", YD.boneTextureSize)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
      }
      const zA = Z.morphAttributes;
      if ((zA.position !== void 0 || zA.normal !== void 0 || zA.color !== void 0 && pM.isWebGL2 === !0) && wM.update(_, Z, Gt), (zN || kM.receiveShadow !== _.receiveShadow) && (kM.receiveShadow = _.receiveShadow, CD.setValue(W, "receiveShadow", _.receiveShadow)), m.isMeshGouraudMaterial && m.envMap !== null && (Ht.envMap.value = EM, Ht.flipEnvMap.value = EM.isCubeTexture && EM.isRenderTargetTexture === !1 ? -1 : 1), zN && (CD.setValue(W, "toneMappingExposure", y.toneMappingExposure), kM.needsLights && Eu(Ht, nA), uM && m.fog === !0 && MM.refreshFogUniforms(Ht, uM), MM.refreshMaterialUniforms(Ht, m, R, B, yM), _i.upload(W, kM.uniformsList, Ht, mM)), m.isShaderMaterial && m.uniformsNeedUpdate === !0 && (_i.upload(W, kM.uniformsList, Ht, mM), m.uniformsNeedUpdate = !1), m.isSpriteMaterial && CD.setValue(W, "center", _.center), CD.setValue(W, "modelViewMatrix", _.modelViewMatrix), CD.setValue(W, "normalMatrix", _.normalMatrix), CD.setValue(W, "modelMatrix", _.matrixWorld), m.isShaderMaterial || m.isRawShaderMaterial) {
        const YD = m.uniformsGroups;
        for (let IA = 0, hu = YD.length; IA < hu; IA++)
          if (pM.isWebGL2) {
            const $n = YD[IA];
            xM.update($n, Gt), xM.bind($n, Gt);
          } else
            console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
      }
      return Gt;
    }
    function Eu(x, f) {
      x.ambientLightColor.needsUpdate = f, x.lightProbe.needsUpdate = f, x.directionalLights.needsUpdate = f, x.directionalLightShadows.needsUpdate = f, x.pointLights.needsUpdate = f, x.pointLightShadows.needsUpdate = f, x.spotLights.needsUpdate = f, x.spotLightShadows.needsUpdate = f, x.rectAreaLights.needsUpdate = f, x.hemisphereLights.needsUpdate = f;
    }
    function lu(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return l;
    }, this.getActiveMipmapLevel = function() {
      return d;
    }, this.getRenderTarget = function() {
      return h;
    }, this.setRenderTargetTextures = function(x, f, Z) {
      ZM.get(x.texture).__webglTexture = f, ZM.get(x.depthTexture).__webglTexture = Z;
      const m = ZM.get(x);
      m.__hasExternalTextures = !0, m.__hasExternalTextures && (m.__autoAllocateDepthBuffer = Z === void 0, m.__autoAllocateDepthBuffer || CM.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), m.__useRenderToTexture = !1));
    }, this.setRenderTargetFramebuffer = function(x, f) {
      const Z = ZM.get(x);
      Z.__webglFramebuffer = f, Z.__useDefaultFramebuffer = f === void 0;
    }, this.setRenderTarget = function(x, f = 0, Z = 0) {
      h = x, l = f, d = Z;
      let m = !0, _ = null, uM = !1, aM = !1;
      if (x) {
        const EM = ZM.get(x);
        EM.__useDefaultFramebuffer !== void 0 ? (lM.bindFramebuffer(36160, null), m = !1) : EM.__webglFramebuffer === void 0 ? mM.setupRenderTarget(x) : EM.__hasExternalTextures && mM.rebindTextures(x, ZM.get(x.texture).__webglTexture, ZM.get(x.depthTexture).__webglTexture);
        const QM = x.texture;
        (QM.isData3DTexture || QM.isDataArrayTexture || QM.isCompressedArrayTexture) && (aM = !0);
        const LM = ZM.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(LM[f]) ? _ = LM[f][Z] : _ = LM[f], uM = !0) : pM.isWebGL2 && x.samples > 0 && mM.useMultisampledRTT(x) === !1 ? _ = ZM.get(x).__webglMultisampledFramebuffer : Array.isArray(LM) ? _ = LM[Z] : _ = LM, O.copy(x.viewport), K.copy(x.scissor), F = x.scissorTest;
      } else
        O.copy(V).multiplyScalar(R).floor(), K.copy(U).multiplyScalar(R).floor(), F = b;
      if (lM.bindFramebuffer(36160, _) && pM.drawBuffers && m && lM.drawBuffers(x, _), lM.viewport(O), lM.scissor(K), lM.setScissorTest(F), uM) {
        const EM = ZM.get(x.texture);
        W.framebufferTexture2D(36160, 36064, 34069 + f, EM.__webglTexture, Z);
      } else if (aM) {
        const EM = ZM.get(x.texture), QM = f || 0;
        W.framebufferTextureLayer(36160, 36064, EM.__webglTexture, Z || 0, QM);
      }
      S = -1;
    }, this.readRenderTargetPixels = function(x, f, Z, m, _, uM, aM) {
      if (!(x && x.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let OM = ZM.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && aM !== void 0 && (OM = OM[aM]), OM) {
        lM.bindFramebuffer(36160, OM);
        try {
          const EM = x.texture, QM = EM.format, LM = EM.type;
          if (QM !== JD && PM.convert(QM) !== W.getParameter(35739)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          const YM = LM === hN && (CM.has("EXT_color_buffer_half_float") || pM.isWebGL2 && CM.has("EXT_color_buffer_float"));
          if (LM !== Rt && PM.convert(LM) !== W.getParameter(35738) && // Edge and Chrome Mac < 52 (#9513)
          !(LM === bt && (pM.isWebGL2 || CM.has("OES_texture_float") || CM.has("WEBGL_color_buffer_float"))) && // Chrome Mac >= 52 and Firefox
          !YM) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          f >= 0 && f <= x.width - m && Z >= 0 && Z <= x.height - _ && W.readPixels(f, Z, m, _, PM.convert(QM), PM.convert(LM), uM);
        } finally {
          const EM = h !== null ? ZM.get(h).__webglFramebuffer : null;
          lM.bindFramebuffer(36160, EM);
        }
      }
    }, this.copyFramebufferToTexture = function(x, f, Z = 0) {
      const m = Math.pow(2, -Z), _ = Math.floor(f.image.width * m), uM = Math.floor(f.image.height * m);
      mM.setTexture2D(f, 0), W.copyTexSubImage2D(3553, Z, 0, 0, x.x, x.y, _, uM), lM.unbindTexture();
    }, this.copyTextureToTexture = function(x, f, Z, m = 0) {
      const _ = f.image.width, uM = f.image.height, aM = PM.convert(Z.format), OM = PM.convert(Z.type);
      mM.setTexture2D(Z, 0), W.pixelStorei(37440, Z.flipY), W.pixelStorei(37441, Z.premultiplyAlpha), W.pixelStorei(3317, Z.unpackAlignment), f.isDataTexture ? W.texSubImage2D(3553, m, x.x, x.y, _, uM, aM, OM, f.image.data) : f.isCompressedTexture ? W.compressedTexSubImage2D(3553, m, x.x, x.y, f.mipmaps[0].width, f.mipmaps[0].height, aM, f.mipmaps[0].data) : W.texSubImage2D(3553, m, x.x, x.y, aM, OM, f.image), m === 0 && Z.generateMipmaps && W.generateMipmap(3553), lM.unbindTexture();
    }, this.copyTextureToTexture3D = function(x, f, Z, m, _ = 0) {
      if (y.isWebGL1Renderer) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
        return;
      }
      const uM = x.max.x - x.min.x + 1, aM = x.max.y - x.min.y + 1, OM = x.max.z - x.min.z + 1, EM = PM.convert(m.format), QM = PM.convert(m.type);
      let LM;
      if (m.isData3DTexture)
        mM.setTexture3D(m, 0), LM = 32879;
      else if (m.isDataArrayTexture)
        mM.setTexture2DArray(m, 0), LM = 35866;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      W.pixelStorei(37440, m.flipY), W.pixelStorei(37441, m.premultiplyAlpha), W.pixelStorei(3317, m.unpackAlignment);
      const YM = W.getParameter(3314), WM = W.getParameter(32878), qM = W.getParameter(3316), SD = W.getParameter(3315), zt = W.getParameter(32877), XM = Z.isCompressedTexture ? Z.mipmaps[0] : Z.image;
      W.pixelStorei(3314, XM.width), W.pixelStorei(32878, XM.height), W.pixelStorei(3316, x.min.x), W.pixelStorei(3315, x.min.y), W.pixelStorei(32877, x.min.z), Z.isDataTexture || Z.isData3DTexture ? W.texSubImage3D(LM, _, f.x, f.y, f.z, uM, aM, OM, EM, QM, XM.data) : Z.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), W.compressedTexSubImage3D(LM, _, f.x, f.y, f.z, uM, aM, OM, EM, XM.data)) : W.texSubImage3D(LM, _, f.x, f.y, f.z, uM, aM, OM, EM, QM, XM), W.pixelStorei(3314, YM), W.pixelStorei(32878, WM), W.pixelStorei(3316, qM), W.pixelStorei(3315, SD), W.pixelStorei(32877, zt), _ === 0 && m.generateMipmaps && W.generateMipmap(LM), lM.unbindTexture();
    }, this.initTexture = function(x) {
      x.isCubeTexture ? mM.setTextureCube(x, 0) : x.isData3DTexture ? mM.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? mM.setTexture2DArray(x, 0) : mM.setTexture2D(x, 0), lM.unbindTexture();
    }, this.resetState = function() {
      l = 0, d = 0, h = null, lM.reset(), dM.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return Et;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(M) {
    this._outputColorSpace = M;
    const D = this.getContext();
    D.drawingBufferColorSpace = M === Qn ? "display-p3" : "srgb", D.unpackColorSpace = RM.workingColorSpace === MA ? "display-p3" : "srgb";
  }
  get physicallyCorrectLights() {
    return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."), !this.useLegacyLights;
  }
  set physicallyCorrectLights(M) {
    console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."), this.useLegacyLights = !M;
  }
  get outputEncoding() {
    return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace === tD ? Ie : ZT;
  }
  set outputEncoding(M) {
    console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace = M === Ie ? tD : dt;
  }
  get useLegacyLights() {
    return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights;
  }
  set useLegacyLights(M) {
    console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights = M;
  }
}
class ro extends pD {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(M, D) {
    return super.copy(M, D), M.background !== null && (this.background = M.background.clone()), M.environment !== null && (this.environment = M.environment.clone()), M.fog !== null && (this.fog = M.fog.clone()), this.backgroundBlurriness = M.backgroundBlurriness, this.backgroundIntensity = M.backgroundIntensity, M.overrideMaterial !== null && (this.overrideMaterial = M.overrideMaterial.clone()), this.matrixAutoUpdate = M.matrixAutoUpdate, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return this.fog !== null && (D.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (D.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (D.object.backgroundIntensity = this.backgroundIntensity), D;
  }
}
class co extends Mt {
  constructor(M, D, t, e, N, n, A, z, I) {
    super(M, D, t, e, N, n, A, z, I), this.isVideoTexture = !0, this.minFilter = n !== void 0 ? n : hD, this.magFilter = N !== void 0 ? N : hD, this.generateMipmaps = !1;
    const T = this;
    function u() {
      T.needsUpdate = !0, M.requestVideoFrameCallback(u);
    }
    "requestVideoFrameCallback" in M && M.requestVideoFrameCallback(u);
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const M = this.image;
    "requestVideoFrameCallback" in M === !1 && M.readyState >= M.HAVE_CURRENT_DATA && (this.needsUpdate = !0);
  }
}
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Tu = "157", hn = 0, ao = 1, EI = 1, oo = 100, yo = 204, jo = 205, Co = 3, uu = 0, gu = 300, lI = 1e3, Ti = 1001, hI = 1002, Lo = 1006, wo = 1008, xo = 1009, Oo = 1015, Eo = 1023, lo = 3e3, PA = 3001, ho = 0, bi = "", qD = "srgb", Kn = "srgb-linear", vo = "display-p3", su = "display-p3-linear", dn = "linear", dI = "srgb", vI = "rec709", pI = "p3", RA = 7680, po = 519, YI = 35044, ui = 2e3, UI = 2001;
class tA {
  addEventListener(M, D) {
    this._listeners === void 0 && (this._listeners = {});
    const t = this._listeners;
    t[M] === void 0 && (t[M] = []), t[M].indexOf(D) === -1 && t[M].push(D);
  }
  hasEventListener(M, D) {
    if (this._listeners === void 0)
      return !1;
    const t = this._listeners;
    return t[M] !== void 0 && t[M].indexOf(D) !== -1;
  }
  removeEventListener(M, D) {
    if (this._listeners === void 0)
      return;
    const e = this._listeners[M];
    if (e !== void 0) {
      const N = e.indexOf(D);
      N !== -1 && e.splice(N, 1);
    }
  }
  dispatchEvent(M) {
    if (this._listeners === void 0)
      return;
    const t = this._listeners[M.type];
    if (t !== void 0) {
      M.target = this;
      const e = t.slice(0);
      for (let N = 0, n = e.length; N < n; N++)
        e[N].call(this, M);
      M.target = null;
    }
  }
}
const rD = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function SN() {
  const i = Math.random() * 4294967295 | 0, M = Math.random() * 4294967295 | 0, D = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0;
  return (rD[i & 255] + rD[i >> 8 & 255] + rD[i >> 16 & 255] + rD[i >> 24 & 255] + "-" + rD[M & 255] + rD[M >> 8 & 255] + "-" + rD[M >> 16 & 15 | 64] + rD[M >> 24 & 255] + "-" + rD[D & 63 | 128] + rD[D >> 8 & 255] + "-" + rD[D >> 16 & 255] + rD[D >> 24 & 255] + rD[t & 255] + rD[t >> 8 & 255] + rD[t >> 16 & 255] + rD[t >> 24 & 255]).toLowerCase();
}
function dD(i, M, D) {
  return Math.max(M, Math.min(D, i));
}
function Yo(i, M) {
  return (i % M + M) % M;
}
function FA(i, M, D) {
  return (1 - D) * i + D * M;
}
function rN(i, M) {
  switch (M.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function lD(i, M) {
  switch (M.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class xD {
  constructor(M = 0, D = 0) {
    xD.prototype.isVector2 = !0, this.x = M, this.y = D;
  }
  get width() {
    return this.x;
  }
  set width(M) {
    this.x = M;
  }
  get height() {
    return this.y;
  }
  set height(M) {
    this.y = M;
  }
  set(M, D) {
    return this.x = M, this.y = D, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this;
  }
  divide(M) {
    return this.x /= M.x, this.y /= M.y, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  applyMatrix3(M) {
    const D = this.x, t = this.y, e = M.elements;
    return this.x = e[0] * D + e[3] * t + e[6], this.y = e[1] * D + e[4] * t + e[7], this;
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this;
  }
  clampLength(M, D) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(Math.max(M, Math.min(D, t)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y;
  }
  cross(M) {
    return this.x * M.y - this.y * M.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const t = this.dot(M) / D;
    return Math.acos(dD(t, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, t = this.y - M.y;
    return D * D + t * t;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this;
  }
  lerpVectors(M, D, t) {
    return this.x = M.x + (D.x - M.x) * t, this.y = M.y + (D.y - M.y) * t, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this;
  }
  rotateAround(M, D) {
    const t = Math.cos(D), e = Math.sin(D), N = this.x - M.x, n = this.y - M.y;
    return this.x = N * t - n * e + M.x, this.y = N * e + n * t + M.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Vt {
  constructor(M, D, t, e, N, n, A, z, I) {
    Vt.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], M !== void 0 && this.set(M, D, t, e, N, n, A, z, I);
  }
  set(M, D, t, e, N, n, A, z, I) {
    const T = this.elements;
    return T[0] = M, T[1] = e, T[2] = A, T[3] = D, T[4] = N, T[5] = z, T[6] = t, T[7] = n, T[8] = I, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(M) {
    const D = this.elements, t = M.elements;
    return D[0] = t[0], D[1] = t[1], D[2] = t[2], D[3] = t[3], D[4] = t[4], D[5] = t[5], D[6] = t[6], D[7] = t[7], D[8] = t[8], this;
  }
  extractBasis(M, D, t) {
    return M.setFromMatrix3Column(this, 0), D.setFromMatrix3Column(this, 1), t.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(M) {
    const D = M.elements;
    return this.set(
      D[0],
      D[4],
      D[8],
      D[1],
      D[5],
      D[9],
      D[2],
      D[6],
      D[10]
    ), this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const t = M.elements, e = D.elements, N = this.elements, n = t[0], A = t[3], z = t[6], I = t[1], T = t[4], u = t[7], g = t[2], s = t[5], a = t[8], o = e[0], c = e[3], r = e[6], w = e[1], y = e[4], j = e[7], l = e[2], d = e[5], h = e[8];
    return N[0] = n * o + A * w + z * l, N[3] = n * c + A * y + z * d, N[6] = n * r + A * j + z * h, N[1] = I * o + T * w + u * l, N[4] = I * c + T * y + u * d, N[7] = I * r + T * j + u * h, N[2] = g * o + s * w + a * l, N[5] = g * c + s * y + a * d, N[8] = g * r + s * j + a * h, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[3] *= M, D[6] *= M, D[1] *= M, D[4] *= M, D[7] *= M, D[2] *= M, D[5] *= M, D[8] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], t = M[1], e = M[2], N = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8];
    return D * n * T - D * A * I - t * N * T + t * A * z + e * N * I - e * n * z;
  }
  invert() {
    const M = this.elements, D = M[0], t = M[1], e = M[2], N = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8], u = T * n - A * I, g = A * z - T * N, s = I * N - n * z, a = D * u + t * g + e * s;
    if (a === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const o = 1 / a;
    return M[0] = u * o, M[1] = (e * I - T * t) * o, M[2] = (A * t - e * n) * o, M[3] = g * o, M[4] = (T * D - e * z) * o, M[5] = (e * N - A * D) * o, M[6] = s * o, M[7] = (t * z - I * D) * o, M[8] = (n * D - t * N) * o, this;
  }
  transpose() {
    let M;
    const D = this.elements;
    return M = D[1], D[1] = D[3], D[3] = M, M = D[2], D[2] = D[6], D[6] = M, M = D[5], D[5] = D[7], D[7] = M, this;
  }
  getNormalMatrix(M) {
    return this.setFromMatrix4(M).invert().transpose();
  }
  transposeIntoArray(M) {
    const D = this.elements;
    return M[0] = D[0], M[1] = D[3], M[2] = D[6], M[3] = D[1], M[4] = D[4], M[5] = D[7], M[6] = D[2], M[7] = D[5], M[8] = D[8], this;
  }
  setUvTransform(M, D, t, e, N, n, A) {
    const z = Math.cos(N), I = Math.sin(N);
    return this.set(
      t * z,
      t * I,
      -t * (z * n + I * A) + n + M,
      -e * I,
      e * z,
      -e * (-I * n + z * A) + A + D,
      0,
      0,
      1
    ), this;
  }
  //
  scale(M, D) {
    return this.premultiply(BA.makeScale(M, D)), this;
  }
  rotate(M) {
    return this.premultiply(BA.makeRotation(-M)), this;
  }
  translate(M, D) {
    return this.premultiply(BA.makeTranslation(M, D)), this;
  }
  // for 2D Transforms
  makeTranslation(M, D) {
    return M.isVector2 ? this.set(
      1,
      0,
      M.x,
      0,
      1,
      M.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      M,
      0,
      1,
      D,
      0,
      0,
      1
    ), this;
  }
  makeRotation(M) {
    const D = Math.cos(M), t = Math.sin(M);
    return this.set(
      D,
      -t,
      0,
      t,
      D,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(M, D) {
    return this.set(
      M,
      0,
      0,
      0,
      D,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(M) {
    const D = this.elements, t = M.elements;
    for (let e = 0; e < 9; e++)
      if (D[e] !== t[e])
        return !1;
    return !0;
  }
  fromArray(M, D = 0) {
    for (let t = 0; t < 9; t++)
      this.elements[t] = M[t + D];
    return this;
  }
  toArray(M = [], D = 0) {
    const t = this.elements;
    return M[D] = t[0], M[D + 1] = t[1], M[D + 2] = t[2], M[D + 3] = t[3], M[D + 4] = t[4], M[D + 5] = t[5], M[D + 6] = t[6], M[D + 7] = t[7], M[D + 8] = t[8], M;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const BA = /* @__PURE__ */ new Vt();
function Uo(i) {
  for (let M = i.length - 1; M >= 0; --M)
    if (i[M] >= 65535)
      return !0;
  return !1;
}
function fI(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
const mI = {};
function VA(i) {
  i in mI || (mI[i] = !0, console.warn(i));
}
const QI = /* @__PURE__ */ new Vt().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), kI = /* @__PURE__ */ new Vt().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), gi = {
  [Kn]: {
    transfer: dn,
    primaries: vI,
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [qD]: {
    transfer: dI,
    primaries: vI,
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [su]: {
    transfer: dn,
    primaries: pI,
    toReference: (i) => i.applyMatrix3(kI),
    fromReference: (i) => i.applyMatrix3(QI)
  },
  [vo]: {
    transfer: dI,
    primaries: pI,
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(kI),
    fromReference: (i) => i.applyMatrix3(QI).convertLinearToSRGB()
  }
}, fo = /* @__PURE__ */ new Set([Kn, su]), GD = {
  enabled: !0,
  _workingColorSpace: Kn,
  get legacyMode() {
    return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), !this.enabled;
  },
  set legacyMode(i) {
    console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), this.enabled = !i;
  },
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!fo.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, M, D) {
    if (this.enabled === !1 || M === D || !M || !D)
      return i;
    const t = gi[M].toReference, e = gi[D].fromReference;
    return e(t(i));
  },
  fromWorkingColorSpace: function(i, M) {
    return this.convert(i, this._workingColorSpace, M);
  },
  toWorkingColorSpace: function(i, M) {
    return this.convert(i, M, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return gi[i].primaries;
  },
  getTransfer: function(i) {
    return i === bi ? dn : gi[i].transfer;
  }
};
function qe(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function GA(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let Ue;
class mo {
  static getDataURL(M) {
    if (/^data:/i.test(M.src) || typeof HTMLCanvasElement > "u")
      return M.src;
    let D;
    if (M instanceof HTMLCanvasElement)
      D = M;
    else {
      Ue === void 0 && (Ue = fI("canvas")), Ue.width = M.width, Ue.height = M.height;
      const t = Ue.getContext("2d");
      M instanceof ImageData ? t.putImageData(M, 0, 0) : t.drawImage(M, 0, 0, M.width, M.height), D = Ue;
    }
    return D.width > 2048 || D.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", M), D.toDataURL("image/jpeg", 0.6)) : D.toDataURL("image/png");
  }
  static sRGBToLinear(M) {
    if (typeof HTMLImageElement < "u" && M instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && M instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && M instanceof ImageBitmap) {
      const D = fI("canvas");
      D.width = M.width, D.height = M.height;
      const t = D.getContext("2d");
      t.drawImage(M, 0, 0, M.width, M.height);
      const e = t.getImageData(0, 0, M.width, M.height), N = e.data;
      for (let n = 0; n < N.length; n++)
        N[n] = qe(N[n] / 255) * 255;
      return t.putImageData(e, 0, 0), D;
    } else if (M.data) {
      const D = M.data.slice(0);
      for (let t = 0; t < D.length; t++)
        D instanceof Uint8Array || D instanceof Uint8ClampedArray ? D[t] = Math.floor(qe(D[t] / 255) * 255) : D[t] = qe(D[t]);
      return {
        data: D,
        width: M.width,
        height: M.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), M;
  }
}
let Qo = 0;
class ko {
  constructor(M = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Qo++ }), this.uuid = SN(), this.data = M, this.version = 0;
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.images[this.uuid] !== void 0)
      return M.images[this.uuid];
    const t = {
      uuid: this.uuid,
      url: ""
    }, e = this.data;
    if (e !== null) {
      let N;
      if (Array.isArray(e)) {
        N = [];
        for (let n = 0, A = e.length; n < A; n++)
          e[n].isDataTexture ? N.push(HA(e[n].image)) : N.push(HA(e[n]));
      } else
        N = HA(e);
      t.url = N;
    }
    return D || (M.images[this.uuid] = t), t;
  }
}
function HA(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? mo.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let So = 0;
class Te extends tA {
  constructor(M = Te.DEFAULT_IMAGE, D = Te.DEFAULT_MAPPING, t = Ti, e = Ti, N = Lo, n = wo, A = Eo, z = xo, I = Te.DEFAULT_ANISOTROPY, T = bi) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: So++ }), this.uuid = SN(), this.name = "", this.source = new ko(M), this.mipmaps = [], this.mapping = D, this.channel = 0, this.wrapS = t, this.wrapT = e, this.magFilter = N, this.minFilter = n, this.anisotropy = I, this.format = A, this.internalFormat = null, this.type = z, this.offset = new xD(0, 0), this.repeat = new xD(1, 1), this.center = new xD(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Vt(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, typeof T == "string" ? this.colorSpace = T : (VA("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = T === PA ? qD : bi), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(M = null) {
    this.source.data = M;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.name = M.name, this.source = M.source, this.mipmaps = M.mipmaps.slice(0), this.mapping = M.mapping, this.channel = M.channel, this.wrapS = M.wrapS, this.wrapT = M.wrapT, this.magFilter = M.magFilter, this.minFilter = M.minFilter, this.anisotropy = M.anisotropy, this.format = M.format, this.internalFormat = M.internalFormat, this.type = M.type, this.offset.copy(M.offset), this.repeat.copy(M.repeat), this.center.copy(M.center), this.rotation = M.rotation, this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrix.copy(M.matrix), this.generateMipmaps = M.generateMipmaps, this.premultiplyAlpha = M.premultiplyAlpha, this.flipY = M.flipY, this.unpackAlignment = M.unpackAlignment, this.colorSpace = M.colorSpace, this.userData = JSON.parse(JSON.stringify(M.userData)), this.needsUpdate = !0, this;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.textures[this.uuid] !== void 0)
      return M.textures[this.uuid];
    const t = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(M).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (t.userData = this.userData), D || (M.textures[this.uuid] = t), t;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(M) {
    if (this.mapping !== gu)
      return M;
    if (M.applyMatrix3(this.matrix), M.x < 0 || M.x > 1)
      switch (this.wrapS) {
        case lI:
          M.x = M.x - Math.floor(M.x);
          break;
        case Ti:
          M.x = M.x < 0 ? 0 : 1;
          break;
        case hI:
          Math.abs(Math.floor(M.x) % 2) === 1 ? M.x = Math.ceil(M.x) - M.x : M.x = M.x - Math.floor(M.x);
          break;
      }
    if (M.y < 0 || M.y > 1)
      switch (this.wrapT) {
        case lI:
          M.y = M.y - Math.floor(M.y);
          break;
        case Ti:
          M.y = M.y < 0 ? 0 : 1;
          break;
        case hI:
          Math.abs(Math.floor(M.y) % 2) === 1 ? M.y = Math.ceil(M.y) - M.y : M.y = M.y - Math.floor(M.y);
          break;
      }
    return this.flipY && (M.y = 1 - M.y), M;
  }
  set needsUpdate(M) {
    M === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  get encoding() {
    return VA("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === qD ? PA : lo;
  }
  set encoding(M) {
    VA("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = M === PA ? qD : bi;
  }
}
Te.DEFAULT_IMAGE = null;
Te.DEFAULT_MAPPING = gu;
Te.DEFAULT_ANISOTROPY = 1;
class ZN {
  constructor(M = 0, D = 0, t = 0, e = 1) {
    this.isQuaternion = !0, this._x = M, this._y = D, this._z = t, this._w = e;
  }
  static slerpFlat(M, D, t, e, N, n, A) {
    let z = t[e + 0], I = t[e + 1], T = t[e + 2], u = t[e + 3];
    const g = N[n + 0], s = N[n + 1], a = N[n + 2], o = N[n + 3];
    if (A === 0) {
      M[D + 0] = z, M[D + 1] = I, M[D + 2] = T, M[D + 3] = u;
      return;
    }
    if (A === 1) {
      M[D + 0] = g, M[D + 1] = s, M[D + 2] = a, M[D + 3] = o;
      return;
    }
    if (u !== o || z !== g || I !== s || T !== a) {
      let c = 1 - A;
      const r = z * g + I * s + T * a + u * o, w = r >= 0 ? 1 : -1, y = 1 - r * r;
      if (y > Number.EPSILON) {
        const l = Math.sqrt(y), d = Math.atan2(l, r * w);
        c = Math.sin(c * d) / l, A = Math.sin(A * d) / l;
      }
      const j = A * w;
      if (z = z * c + g * j, I = I * c + s * j, T = T * c + a * j, u = u * c + o * j, c === 1 - A) {
        const l = 1 / Math.sqrt(z * z + I * I + T * T + u * u);
        z *= l, I *= l, T *= l, u *= l;
      }
    }
    M[D] = z, M[D + 1] = I, M[D + 2] = T, M[D + 3] = u;
  }
  static multiplyQuaternionsFlat(M, D, t, e, N, n) {
    const A = t[e], z = t[e + 1], I = t[e + 2], T = t[e + 3], u = N[n], g = N[n + 1], s = N[n + 2], a = N[n + 3];
    return M[D] = A * a + T * u + z * s - I * g, M[D + 1] = z * a + T * g + I * u - A * s, M[D + 2] = I * a + T * s + A * g - z * u, M[D + 3] = T * a - A * u - z * g - I * s, M;
  }
  get x() {
    return this._x;
  }
  set x(M) {
    this._x = M, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(M) {
    this._y = M, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(M) {
    this._z = M, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(M) {
    this._w = M, this._onChangeCallback();
  }
  set(M, D, t, e) {
    return this._x = M, this._y = D, this._z = t, this._w = e, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(M) {
    return this._x = M.x, this._y = M.y, this._z = M.z, this._w = M.w, this._onChangeCallback(), this;
  }
  setFromEuler(M, D) {
    const t = M._x, e = M._y, N = M._z, n = M._order, A = Math.cos, z = Math.sin, I = A(t / 2), T = A(e / 2), u = A(N / 2), g = z(t / 2), s = z(e / 2), a = z(N / 2);
    switch (n) {
      case "XYZ":
        this._x = g * T * u + I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "YXZ":
        this._x = g * T * u + I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u + g * s * a;
        break;
      case "ZXY":
        this._x = g * T * u - I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "ZYX":
        this._x = g * T * u - I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u + g * s * a;
        break;
      case "YZX":
        this._x = g * T * u + I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "XZY":
        this._x = g * T * u - I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u + g * s * a;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + n);
    }
    return D !== !1 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(M, D) {
    const t = D / 2, e = Math.sin(t);
    return this._x = M.x * e, this._y = M.y * e, this._z = M.z * e, this._w = Math.cos(t), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M) {
    const D = M.elements, t = D[0], e = D[4], N = D[8], n = D[1], A = D[5], z = D[9], I = D[2], T = D[6], u = D[10], g = t + A + u;
    if (g > 0) {
      const s = 0.5 / Math.sqrt(g + 1);
      this._w = 0.25 / s, this._x = (T - z) * s, this._y = (N - I) * s, this._z = (n - e) * s;
    } else if (t > A && t > u) {
      const s = 2 * Math.sqrt(1 + t - A - u);
      this._w = (T - z) / s, this._x = 0.25 * s, this._y = (e + n) / s, this._z = (N + I) / s;
    } else if (A > u) {
      const s = 2 * Math.sqrt(1 + A - t - u);
      this._w = (N - I) / s, this._x = (e + n) / s, this._y = 0.25 * s, this._z = (z + T) / s;
    } else {
      const s = 2 * Math.sqrt(1 + u - t - A);
      this._w = (n - e) / s, this._x = (N + I) / s, this._y = (z + T) / s, this._z = 0.25 * s;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(M, D) {
    let t = M.dot(D) + 1;
    return t < Number.EPSILON ? (t = 0, Math.abs(M.x) > Math.abs(M.z) ? (this._x = -M.y, this._y = M.x, this._z = 0, this._w = t) : (this._x = 0, this._y = -M.z, this._z = M.y, this._w = t)) : (this._x = M.y * D.z - M.z * D.y, this._y = M.z * D.x - M.x * D.z, this._z = M.x * D.y - M.y * D.x, this._w = t), this.normalize();
  }
  angleTo(M) {
    return 2 * Math.acos(Math.abs(dD(this.dot(M), -1, 1)));
  }
  rotateTowards(M, D) {
    const t = this.angleTo(M);
    if (t === 0)
      return this;
    const e = Math.min(1, D / t);
    return this.slerp(M, e), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(M) {
    return this._x * M._x + this._y * M._y + this._z * M._z + this._w * M._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let M = this.length();
    return M === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (M = 1 / M, this._x = this._x * M, this._y = this._y * M, this._z = this._z * M, this._w = this._w * M), this._onChangeCallback(), this;
  }
  multiply(M) {
    return this.multiplyQuaternions(this, M);
  }
  premultiply(M) {
    return this.multiplyQuaternions(M, this);
  }
  multiplyQuaternions(M, D) {
    const t = M._x, e = M._y, N = M._z, n = M._w, A = D._x, z = D._y, I = D._z, T = D._w;
    return this._x = t * T + n * A + e * I - N * z, this._y = e * T + n * z + N * A - t * I, this._z = N * T + n * I + t * z - e * A, this._w = n * T - t * A - e * z - N * I, this._onChangeCallback(), this;
  }
  slerp(M, D) {
    if (D === 0)
      return this;
    if (D === 1)
      return this.copy(M);
    const t = this._x, e = this._y, N = this._z, n = this._w;
    let A = n * M._w + t * M._x + e * M._y + N * M._z;
    if (A < 0 ? (this._w = -M._w, this._x = -M._x, this._y = -M._y, this._z = -M._z, A = -A) : this.copy(M), A >= 1)
      return this._w = n, this._x = t, this._y = e, this._z = N, this;
    const z = 1 - A * A;
    if (z <= Number.EPSILON) {
      const s = 1 - D;
      return this._w = s * n + D * this._w, this._x = s * t + D * this._x, this._y = s * e + D * this._y, this._z = s * N + D * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const I = Math.sqrt(z), T = Math.atan2(I, A), u = Math.sin((1 - D) * T) / I, g = Math.sin(D * T) / I;
    return this._w = n * u + this._w * g, this._x = t * u + this._x * g, this._y = e * u + this._y * g, this._z = N * u + this._z * g, this._onChangeCallback(), this;
  }
  slerpQuaternions(M, D, t) {
    return this.copy(M).slerp(D, t);
  }
  random() {
    const M = Math.random(), D = Math.sqrt(1 - M), t = Math.sqrt(M), e = 2 * Math.PI * Math.random(), N = 2 * Math.PI * Math.random();
    return this.set(
      D * Math.cos(e),
      t * Math.sin(N),
      t * Math.cos(N),
      D * Math.sin(e)
    );
  }
  equals(M) {
    return M._x === this._x && M._y === this._y && M._z === this._z && M._w === this._w;
  }
  fromArray(M, D = 0) {
    return this._x = M[D], this._y = M[D + 1], this._z = M[D + 2], this._w = M[D + 3], this._onChangeCallback(), this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this._x, M[D + 1] = this._y, M[D + 2] = this._z, M[D + 3] = this._w, M;
  }
  fromBufferAttribute(M, D) {
    return this._x = M.getX(D), this._y = M.getY(D), this._z = M.getZ(D), this._w = M.getW(D), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class P {
  constructor(M = 0, D = 0, t = 0) {
    P.prototype.isVector3 = !0, this.x = M, this.y = D, this.z = t;
  }
  set(M, D, t) {
    return t === void 0 && (t = this.z), this.x = M, this.y = D, this.z = t, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this.z = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setZ(M) {
    return this.z = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      case 2:
        this.z = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this.z = M.z, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this.z += M.z, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this.z += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this.z = M.z + D.z, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this.z += M.z * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this.z -= M.z, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this.z -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this.z = M.z - D.z, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this.z *= M.z, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this.z *= M, this;
  }
  multiplyVectors(M, D) {
    return this.x = M.x * D.x, this.y = M.y * D.y, this.z = M.z * D.z, this;
  }
  applyEuler(M) {
    return this.applyQuaternion(SI.setFromEuler(M));
  }
  applyAxisAngle(M, D) {
    return this.applyQuaternion(SI.setFromAxisAngle(M, D));
  }
  applyMatrix3(M) {
    const D = this.x, t = this.y, e = this.z, N = M.elements;
    return this.x = N[0] * D + N[3] * t + N[6] * e, this.y = N[1] * D + N[4] * t + N[7] * e, this.z = N[2] * D + N[5] * t + N[8] * e, this;
  }
  applyNormalMatrix(M) {
    return this.applyMatrix3(M).normalize();
  }
  applyMatrix4(M) {
    const D = this.x, t = this.y, e = this.z, N = M.elements, n = 1 / (N[3] * D + N[7] * t + N[11] * e + N[15]);
    return this.x = (N[0] * D + N[4] * t + N[8] * e + N[12]) * n, this.y = (N[1] * D + N[5] * t + N[9] * e + N[13]) * n, this.z = (N[2] * D + N[6] * t + N[10] * e + N[14]) * n, this;
  }
  applyQuaternion(M) {
    const D = this.x, t = this.y, e = this.z, N = M.x, n = M.y, A = M.z, z = M.w, I = z * D + n * e - A * t, T = z * t + A * D - N * e, u = z * e + N * t - n * D, g = -N * D - n * t - A * e;
    return this.x = I * z + g * -N + T * -A - u * -n, this.y = T * z + g * -n + u * -N - I * -A, this.z = u * z + g * -A + I * -n - T * -N, this;
  }
  project(M) {
    return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix);
  }
  unproject(M) {
    return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld);
  }
  transformDirection(M) {
    const D = this.x, t = this.y, e = this.z, N = M.elements;
    return this.x = N[0] * D + N[4] * t + N[8] * e, this.y = N[1] * D + N[5] * t + N[9] * e, this.z = N[2] * D + N[6] * t + N[10] * e, this.normalize();
  }
  divide(M) {
    return this.x /= M.x, this.y /= M.y, this.z /= M.z, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this.z = Math.min(this.z, M.z), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this.z = Math.max(this.z, M.z), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this.z = Math.max(M.z, Math.min(D.z, this.z)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this.z = Math.max(M, Math.min(D, this.z)), this;
  }
  clampLength(M, D) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(Math.max(M, Math.min(D, t)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y + this.z * M.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this.z += (M.z - this.z) * D, this;
  }
  lerpVectors(M, D, t) {
    return this.x = M.x + (D.x - M.x) * t, this.y = M.y + (D.y - M.y) * t, this.z = M.z + (D.z - M.z) * t, this;
  }
  cross(M) {
    return this.crossVectors(this, M);
  }
  crossVectors(M, D) {
    const t = M.x, e = M.y, N = M.z, n = D.x, A = D.y, z = D.z;
    return this.x = e * z - N * A, this.y = N * n - t * z, this.z = t * A - e * n, this;
  }
  projectOnVector(M) {
    const D = M.lengthSq();
    if (D === 0)
      return this.set(0, 0, 0);
    const t = M.dot(this) / D;
    return this.copy(M).multiplyScalar(t);
  }
  projectOnPlane(M) {
    return WA.copy(this).projectOnVector(M), this.sub(WA);
  }
  reflect(M) {
    return this.sub(WA.copy(M).multiplyScalar(2 * this.dot(M)));
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const t = this.dot(M) / D;
    return Math.acos(dD(t, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, t = this.y - M.y, e = this.z - M.z;
    return D * D + t * t + e * e;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y) + Math.abs(this.z - M.z);
  }
  setFromSpherical(M) {
    return this.setFromSphericalCoords(M.radius, M.phi, M.theta);
  }
  setFromSphericalCoords(M, D, t) {
    const e = Math.sin(D) * M;
    return this.x = e * Math.sin(t), this.y = Math.cos(D) * M, this.z = e * Math.cos(t), this;
  }
  setFromCylindrical(M) {
    return this.setFromCylindricalCoords(M.radius, M.theta, M.y);
  }
  setFromCylindricalCoords(M, D, t) {
    return this.x = M * Math.sin(D), this.y = t, this.z = M * Math.cos(D), this;
  }
  setFromMatrixPosition(M) {
    const D = M.elements;
    return this.x = D[12], this.y = D[13], this.z = D[14], this;
  }
  setFromMatrixScale(M) {
    const D = this.setFromMatrixColumn(M, 0).length(), t = this.setFromMatrixColumn(M, 1).length(), e = this.setFromMatrixColumn(M, 2).length();
    return this.x = D, this.y = t, this.z = e, this;
  }
  setFromMatrixColumn(M, D) {
    return this.fromArray(M.elements, D * 4);
  }
  setFromMatrix3Column(M, D) {
    return this.fromArray(M.elements, D * 3);
  }
  setFromEuler(M) {
    return this.x = M._x, this.y = M._y, this.z = M._z, this;
  }
  setFromColor(M) {
    return this.x = M.r, this.y = M.g, this.z = M.b, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y && M.z === this.z;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this.z = M[D + 2], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M[D + 2] = this.z, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this.z = M.getZ(D), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const M = (Math.random() - 0.5) * 2, D = Math.random() * Math.PI * 2, t = Math.sqrt(1 - M ** 2);
    return this.x = t * Math.cos(D), this.y = t * Math.sin(D), this.z = M, this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const WA = /* @__PURE__ */ new P(), SI = /* @__PURE__ */ new ZN();
class _N {
  constructor(M = new P(1 / 0, 1 / 0, 1 / 0), D = new P(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = M, this.max = D;
  }
  set(M, D) {
    return this.min.copy(M), this.max.copy(D), this;
  }
  setFromArray(M) {
    this.makeEmpty();
    for (let D = 0, t = M.length; D < t; D += 3)
      this.expandByPoint(at.fromArray(M, D));
    return this;
  }
  setFromBufferAttribute(M) {
    this.makeEmpty();
    for (let D = 0, t = M.count; D < t; D++)
      this.expandByPoint(at.fromBufferAttribute(M, D));
    return this;
  }
  setFromPoints(M) {
    this.makeEmpty();
    for (let D = 0, t = M.length; D < t; D++)
      this.expandByPoint(M[D]);
    return this;
  }
  setFromCenterAndSize(M, D) {
    const t = at.copy(D).multiplyScalar(0.5);
    return this.min.copy(M).sub(t), this.max.copy(M).add(t), this;
  }
  setFromObject(M, D = !1) {
    return this.makeEmpty(), this.expandByObject(M, D);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.min.copy(M.min), this.max.copy(M.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(M) {
    return this.isEmpty() ? M.set(0, 0, 0) : M.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(M) {
    return this.isEmpty() ? M.set(0, 0, 0) : M.subVectors(this.max, this.min);
  }
  expandByPoint(M) {
    return this.min.min(M), this.max.max(M), this;
  }
  expandByVector(M) {
    return this.min.sub(M), this.max.add(M), this;
  }
  expandByScalar(M) {
    return this.min.addScalar(-M), this.max.addScalar(M), this;
  }
  expandByObject(M, D = !1) {
    if (M.updateWorldMatrix(!1, !1), M.boundingBox !== void 0)
      M.boundingBox === null && M.computeBoundingBox(), fe.copy(M.boundingBox), fe.applyMatrix4(M.matrixWorld), this.union(fe);
    else {
      const e = M.geometry;
      if (e !== void 0)
        if (D && e.attributes !== void 0 && e.attributes.position !== void 0) {
          const N = e.attributes.position;
          for (let n = 0, A = N.count; n < A; n++)
            at.fromBufferAttribute(N, n).applyMatrix4(M.matrixWorld), this.expandByPoint(at);
        } else
          e.boundingBox === null && e.computeBoundingBox(), fe.copy(e.boundingBox), fe.applyMatrix4(M.matrixWorld), this.union(fe);
    }
    const t = M.children;
    for (let e = 0, N = t.length; e < N; e++)
      this.expandByObject(t[e], D);
    return this;
  }
  containsPoint(M) {
    return !(M.x < this.min.x || M.x > this.max.x || M.y < this.min.y || M.y > this.max.y || M.z < this.min.z || M.z > this.max.z);
  }
  containsBox(M) {
    return this.min.x <= M.min.x && M.max.x <= this.max.x && this.min.y <= M.min.y && M.max.y <= this.max.y && this.min.z <= M.min.z && M.max.z <= this.max.z;
  }
  getParameter(M, D) {
    return D.set(
      (M.x - this.min.x) / (this.max.x - this.min.x),
      (M.y - this.min.y) / (this.max.y - this.min.y),
      (M.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(M) {
    return !(M.max.x < this.min.x || M.min.x > this.max.x || M.max.y < this.min.y || M.min.y > this.max.y || M.max.z < this.min.z || M.min.z > this.max.z);
  }
  intersectsSphere(M) {
    return this.clampPoint(M.center, at), at.distanceToSquared(M.center) <= M.radius * M.radius;
  }
  intersectsPlane(M) {
    let D, t;
    return M.normal.x > 0 ? (D = M.normal.x * this.min.x, t = M.normal.x * this.max.x) : (D = M.normal.x * this.max.x, t = M.normal.x * this.min.x), M.normal.y > 0 ? (D += M.normal.y * this.min.y, t += M.normal.y * this.max.y) : (D += M.normal.y * this.max.y, t += M.normal.y * this.min.y), M.normal.z > 0 ? (D += M.normal.z * this.min.z, t += M.normal.z * this.max.z) : (D += M.normal.z * this.max.z, t += M.normal.z * this.min.z), D <= -M.constant && t >= -M.constant;
  }
  intersectsTriangle(M) {
    if (this.isEmpty())
      return !1;
    this.getCenter(cN), si.subVectors(this.max, cN), me.subVectors(M.a, cN), Qe.subVectors(M.b, cN), ke.subVectors(M.c, cN), mt.subVectors(Qe, me), Qt.subVectors(ke, Qe), Jt.subVectors(me, ke);
    let D = [
      0,
      -mt.z,
      mt.y,
      0,
      -Qt.z,
      Qt.y,
      0,
      -Jt.z,
      Jt.y,
      mt.z,
      0,
      -mt.x,
      Qt.z,
      0,
      -Qt.x,
      Jt.z,
      0,
      -Jt.x,
      -mt.y,
      mt.x,
      0,
      -Qt.y,
      Qt.x,
      0,
      -Jt.y,
      Jt.x,
      0
    ];
    return !qA(D, me, Qe, ke, si) || (D = [1, 0, 0, 0, 1, 0, 0, 0, 1], !qA(D, me, Qe, ke, si)) ? !1 : (ri.crossVectors(mt, Qt), D = [ri.x, ri.y, ri.z], qA(D, me, Qe, ke, si));
  }
  clampPoint(M, D) {
    return D.copy(M).clamp(this.min, this.max);
  }
  distanceToPoint(M) {
    return this.clampPoint(M, at).distanceTo(M);
  }
  getBoundingSphere(M) {
    return this.isEmpty() ? M.makeEmpty() : (this.getCenter(M.center), M.radius = this.getSize(at).length() * 0.5), M;
  }
  intersect(M) {
    return this.min.max(M.min), this.max.min(M.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(M) {
    return this.min.min(M.min), this.max.max(M.max), this;
  }
  applyMatrix4(M) {
    return this.isEmpty() ? this : (ct[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(M), ct[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(M), ct[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(M), ct[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(M), ct[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(M), ct[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(M), ct[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(M), ct[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(M), this.setFromPoints(ct), this);
  }
  translate(M) {
    return this.min.add(M), this.max.add(M), this;
  }
  equals(M) {
    return M.min.equals(this.min) && M.max.equals(this.max);
  }
}
const ct = [
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P()
], at = /* @__PURE__ */ new P(), fe = /* @__PURE__ */ new _N(), me = /* @__PURE__ */ new P(), Qe = /* @__PURE__ */ new P(), ke = /* @__PURE__ */ new P(), mt = /* @__PURE__ */ new P(), Qt = /* @__PURE__ */ new P(), Jt = /* @__PURE__ */ new P(), cN = /* @__PURE__ */ new P(), si = /* @__PURE__ */ new P(), ri = /* @__PURE__ */ new P(), Me = /* @__PURE__ */ new P();
function qA(i, M, D, t, e) {
  for (let N = 0, n = i.length - 3; N <= n; N += 3) {
    Me.fromArray(i, N);
    const A = e.x * Math.abs(Me.x) + e.y * Math.abs(Me.y) + e.z * Math.abs(Me.z), z = M.dot(Me), I = D.dot(Me), T = t.dot(Me);
    if (Math.max(-Math.max(z, I, T), Math.min(z, I, T)) > A)
      return !1;
  }
  return !0;
}
const Zo = /* @__PURE__ */ new _N(), aN = /* @__PURE__ */ new P(), XA = /* @__PURE__ */ new P();
class eA {
  constructor(M = new P(), D = -1) {
    this.center = M, this.radius = D;
  }
  set(M, D) {
    return this.center.copy(M), this.radius = D, this;
  }
  setFromPoints(M, D) {
    const t = this.center;
    D !== void 0 ? t.copy(D) : Zo.setFromPoints(M).getCenter(t);
    let e = 0;
    for (let N = 0, n = M.length; N < n; N++)
      e = Math.max(e, t.distanceToSquared(M[N]));
    return this.radius = Math.sqrt(e), this;
  }
  copy(M) {
    return this.center.copy(M.center), this.radius = M.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(M) {
    return M.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(M) {
    return M.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(M) {
    const D = this.radius + M.radius;
    return M.center.distanceToSquared(this.center) <= D * D;
  }
  intersectsBox(M) {
    return M.intersectsSphere(this);
  }
  intersectsPlane(M) {
    return Math.abs(M.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(M, D) {
    const t = this.center.distanceToSquared(M);
    return D.copy(M), t > this.radius * this.radius && (D.sub(this.center).normalize(), D.multiplyScalar(this.radius).add(this.center)), D;
  }
  getBoundingBox(M) {
    return this.isEmpty() ? (M.makeEmpty(), M) : (M.set(this.center, this.center), M.expandByScalar(this.radius), M);
  }
  applyMatrix4(M) {
    return this.center.applyMatrix4(M), this.radius = this.radius * M.getMaxScaleOnAxis(), this;
  }
  translate(M) {
    return this.center.add(M), this;
  }
  expandByPoint(M) {
    if (this.isEmpty())
      return this.center.copy(M), this.radius = 0, this;
    aN.subVectors(M, this.center);
    const D = aN.lengthSq();
    if (D > this.radius * this.radius) {
      const t = Math.sqrt(D), e = (t - this.radius) * 0.5;
      this.center.addScaledVector(aN, e / t), this.radius += e;
    }
    return this;
  }
  union(M) {
    return M.isEmpty() ? this : this.isEmpty() ? (this.copy(M), this) : (this.center.equals(M.center) === !0 ? this.radius = Math.max(this.radius, M.radius) : (XA.subVectors(M.center, this.center).setLength(M.radius), this.expandByPoint(aN.copy(M.center).add(XA)), this.expandByPoint(aN.copy(M.center).sub(XA))), this);
  }
  equals(M) {
    return M.center.equals(this.center) && M.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const ot = /* @__PURE__ */ new P(), $A = /* @__PURE__ */ new P(), ci = /* @__PURE__ */ new P(), kt = /* @__PURE__ */ new P(), JA = /* @__PURE__ */ new P(), ai = /* @__PURE__ */ new P(), Mn = /* @__PURE__ */ new P();
class Pn {
  constructor(M = new P(), D = new P(0, 0, -1)) {
    this.origin = M, this.direction = D;
  }
  set(M, D) {
    return this.origin.copy(M), this.direction.copy(D), this;
  }
  copy(M) {
    return this.origin.copy(M.origin), this.direction.copy(M.direction), this;
  }
  at(M, D) {
    return D.copy(this.origin).addScaledVector(this.direction, M);
  }
  lookAt(M) {
    return this.direction.copy(M).sub(this.origin).normalize(), this;
  }
  recast(M) {
    return this.origin.copy(this.at(M, ot)), this;
  }
  closestPointToPoint(M, D) {
    D.subVectors(M, this.origin);
    const t = D.dot(this.direction);
    return t < 0 ? D.copy(this.origin) : D.copy(this.origin).addScaledVector(this.direction, t);
  }
  distanceToPoint(M) {
    return Math.sqrt(this.distanceSqToPoint(M));
  }
  distanceSqToPoint(M) {
    const D = ot.subVectors(M, this.origin).dot(this.direction);
    return D < 0 ? this.origin.distanceToSquared(M) : (ot.copy(this.origin).addScaledVector(this.direction, D), ot.distanceToSquared(M));
  }
  distanceSqToSegment(M, D, t, e) {
    $A.copy(M).add(D).multiplyScalar(0.5), ci.copy(D).sub(M).normalize(), kt.copy(this.origin).sub($A);
    const N = M.distanceTo(D) * 0.5, n = -this.direction.dot(ci), A = kt.dot(this.direction), z = -kt.dot(ci), I = kt.lengthSq(), T = Math.abs(1 - n * n);
    let u, g, s, a;
    if (T > 0)
      if (u = n * z - A, g = n * A - z, a = N * T, u >= 0)
        if (g >= -a)
          if (g <= a) {
            const o = 1 / T;
            u *= o, g *= o, s = u * (u + n * g + 2 * A) + g * (n * u + g + 2 * z) + I;
          } else
            g = N, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
        else
          g = -N, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
      else
        g <= -a ? (u = Math.max(0, -(-n * N + A)), g = u > 0 ? -N : Math.min(Math.max(-N, -z), N), s = -u * u + g * (g + 2 * z) + I) : g <= a ? (u = 0, g = Math.min(Math.max(-N, -z), N), s = g * (g + 2 * z) + I) : (u = Math.max(0, -(n * N + A)), g = u > 0 ? N : Math.min(Math.max(-N, -z), N), s = -u * u + g * (g + 2 * z) + I);
    else
      g = n > 0 ? -N : N, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
    return t && t.copy(this.origin).addScaledVector(this.direction, u), e && e.copy($A).addScaledVector(ci, g), s;
  }
  intersectSphere(M, D) {
    ot.subVectors(M.center, this.origin);
    const t = ot.dot(this.direction), e = ot.dot(ot) - t * t, N = M.radius * M.radius;
    if (e > N)
      return null;
    const n = Math.sqrt(N - e), A = t - n, z = t + n;
    return z < 0 ? null : A < 0 ? this.at(z, D) : this.at(A, D);
  }
  intersectsSphere(M) {
    return this.distanceSqToPoint(M.center) <= M.radius * M.radius;
  }
  distanceToPlane(M) {
    const D = M.normal.dot(this.direction);
    if (D === 0)
      return M.distanceToPoint(this.origin) === 0 ? 0 : null;
    const t = -(this.origin.dot(M.normal) + M.constant) / D;
    return t >= 0 ? t : null;
  }
  intersectPlane(M, D) {
    const t = this.distanceToPlane(M);
    return t === null ? null : this.at(t, D);
  }
  intersectsPlane(M) {
    const D = M.distanceToPoint(this.origin);
    return D === 0 || M.normal.dot(this.direction) * D < 0;
  }
  intersectBox(M, D) {
    let t, e, N, n, A, z;
    const I = 1 / this.direction.x, T = 1 / this.direction.y, u = 1 / this.direction.z, g = this.origin;
    return I >= 0 ? (t = (M.min.x - g.x) * I, e = (M.max.x - g.x) * I) : (t = (M.max.x - g.x) * I, e = (M.min.x - g.x) * I), T >= 0 ? (N = (M.min.y - g.y) * T, n = (M.max.y - g.y) * T) : (N = (M.max.y - g.y) * T, n = (M.min.y - g.y) * T), t > n || N > e || ((N > t || isNaN(t)) && (t = N), (n < e || isNaN(e)) && (e = n), u >= 0 ? (A = (M.min.z - g.z) * u, z = (M.max.z - g.z) * u) : (A = (M.max.z - g.z) * u, z = (M.min.z - g.z) * u), t > z || A > e) || ((A > t || t !== t) && (t = A), (z < e || e !== e) && (e = z), e < 0) ? null : this.at(t >= 0 ? t : e, D);
  }
  intersectsBox(M) {
    return this.intersectBox(M, ot) !== null;
  }
  intersectTriangle(M, D, t, e, N) {
    JA.subVectors(D, M), ai.subVectors(t, M), Mn.crossVectors(JA, ai);
    let n = this.direction.dot(Mn), A;
    if (n > 0) {
      if (e)
        return null;
      A = 1;
    } else if (n < 0)
      A = -1, n = -n;
    else
      return null;
    kt.subVectors(this.origin, M);
    const z = A * this.direction.dot(ai.crossVectors(kt, ai));
    if (z < 0)
      return null;
    const I = A * this.direction.dot(JA.cross(kt));
    if (I < 0 || z + I > n)
      return null;
    const T = -A * kt.dot(Mn);
    return T < 0 ? null : this.at(T / n, N);
  }
  applyMatrix4(M) {
    return this.origin.applyMatrix4(M), this.direction.transformDirection(M), this;
  }
  equals(M) {
    return M.origin.equals(this.origin) && M.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class kD {
  constructor(M, D, t, e, N, n, A, z, I, T, u, g, s, a, o, c) {
    kD.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], M !== void 0 && this.set(M, D, t, e, N, n, A, z, I, T, u, g, s, a, o, c);
  }
  set(M, D, t, e, N, n, A, z, I, T, u, g, s, a, o, c) {
    const r = this.elements;
    return r[0] = M, r[4] = D, r[8] = t, r[12] = e, r[1] = N, r[5] = n, r[9] = A, r[13] = z, r[2] = I, r[6] = T, r[10] = u, r[14] = g, r[3] = s, r[7] = a, r[11] = o, r[15] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new kD().fromArray(this.elements);
  }
  copy(M) {
    const D = this.elements, t = M.elements;
    return D[0] = t[0], D[1] = t[1], D[2] = t[2], D[3] = t[3], D[4] = t[4], D[5] = t[5], D[6] = t[6], D[7] = t[7], D[8] = t[8], D[9] = t[9], D[10] = t[10], D[11] = t[11], D[12] = t[12], D[13] = t[13], D[14] = t[14], D[15] = t[15], this;
  }
  copyPosition(M) {
    const D = this.elements, t = M.elements;
    return D[12] = t[12], D[13] = t[13], D[14] = t[14], this;
  }
  setFromMatrix3(M) {
    const D = M.elements;
    return this.set(
      D[0],
      D[3],
      D[6],
      0,
      D[1],
      D[4],
      D[7],
      0,
      D[2],
      D[5],
      D[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(M, D, t) {
    return M.setFromMatrixColumn(this, 0), D.setFromMatrixColumn(this, 1), t.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(M, D, t) {
    return this.set(
      M.x,
      D.x,
      t.x,
      0,
      M.y,
      D.y,
      t.y,
      0,
      M.z,
      D.z,
      t.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(M) {
    const D = this.elements, t = M.elements, e = 1 / Se.setFromMatrixColumn(M, 0).length(), N = 1 / Se.setFromMatrixColumn(M, 1).length(), n = 1 / Se.setFromMatrixColumn(M, 2).length();
    return D[0] = t[0] * e, D[1] = t[1] * e, D[2] = t[2] * e, D[3] = 0, D[4] = t[4] * N, D[5] = t[5] * N, D[6] = t[6] * N, D[7] = 0, D[8] = t[8] * n, D[9] = t[9] * n, D[10] = t[10] * n, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromEuler(M) {
    const D = this.elements, t = M.x, e = M.y, N = M.z, n = Math.cos(t), A = Math.sin(t), z = Math.cos(e), I = Math.sin(e), T = Math.cos(N), u = Math.sin(N);
    if (M.order === "XYZ") {
      const g = n * T, s = n * u, a = A * T, o = A * u;
      D[0] = z * T, D[4] = -z * u, D[8] = I, D[1] = s + a * I, D[5] = g - o * I, D[9] = -A * z, D[2] = o - g * I, D[6] = a + s * I, D[10] = n * z;
    } else if (M.order === "YXZ") {
      const g = z * T, s = z * u, a = I * T, o = I * u;
      D[0] = g + o * A, D[4] = a * A - s, D[8] = n * I, D[1] = n * u, D[5] = n * T, D[9] = -A, D[2] = s * A - a, D[6] = o + g * A, D[10] = n * z;
    } else if (M.order === "ZXY") {
      const g = z * T, s = z * u, a = I * T, o = I * u;
      D[0] = g - o * A, D[4] = -n * u, D[8] = a + s * A, D[1] = s + a * A, D[5] = n * T, D[9] = o - g * A, D[2] = -n * I, D[6] = A, D[10] = n * z;
    } else if (M.order === "ZYX") {
      const g = n * T, s = n * u, a = A * T, o = A * u;
      D[0] = z * T, D[4] = a * I - s, D[8] = g * I + o, D[1] = z * u, D[5] = o * I + g, D[9] = s * I - a, D[2] = -I, D[6] = A * z, D[10] = n * z;
    } else if (M.order === "YZX") {
      const g = n * z, s = n * I, a = A * z, o = A * I;
      D[0] = z * T, D[4] = o - g * u, D[8] = a * u + s, D[1] = u, D[5] = n * T, D[9] = -A * T, D[2] = -I * T, D[6] = s * u + a, D[10] = g - o * u;
    } else if (M.order === "XZY") {
      const g = n * z, s = n * I, a = A * z, o = A * I;
      D[0] = z * T, D[4] = -u, D[8] = I * T, D[1] = g * u + o, D[5] = n * T, D[9] = s * u - a, D[2] = a * u - s, D[6] = A * T, D[10] = o * u + g;
    }
    return D[3] = 0, D[7] = 0, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromQuaternion(M) {
    return this.compose(_o, M, bo);
  }
  lookAt(M, D, t) {
    const e = this.elements;
    return mD.subVectors(M, D), mD.lengthSq() === 0 && (mD.z = 1), mD.normalize(), St.crossVectors(t, mD), St.lengthSq() === 0 && (Math.abs(t.z) === 1 ? mD.x += 1e-4 : mD.z += 1e-4, mD.normalize(), St.crossVectors(t, mD)), St.normalize(), oi.crossVectors(mD, St), e[0] = St.x, e[4] = oi.x, e[8] = mD.x, e[1] = St.y, e[5] = oi.y, e[9] = mD.y, e[2] = St.z, e[6] = oi.z, e[10] = mD.z, this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const t = M.elements, e = D.elements, N = this.elements, n = t[0], A = t[4], z = t[8], I = t[12], T = t[1], u = t[5], g = t[9], s = t[13], a = t[2], o = t[6], c = t[10], r = t[14], w = t[3], y = t[7], j = t[11], l = t[15], d = e[0], h = e[4], S = e[8], L = e[12], O = e[1], K = e[5], F = e[9], G = e[13], p = e[2], k = e[6], B = e[10], R = e[14], $ = e[3], H = e[7], V = e[11], U = e[15];
    return N[0] = n * d + A * O + z * p + I * $, N[4] = n * h + A * K + z * k + I * H, N[8] = n * S + A * F + z * B + I * V, N[12] = n * L + A * G + z * R + I * U, N[1] = T * d + u * O + g * p + s * $, N[5] = T * h + u * K + g * k + s * H, N[9] = T * S + u * F + g * B + s * V, N[13] = T * L + u * G + g * R + s * U, N[2] = a * d + o * O + c * p + r * $, N[6] = a * h + o * K + c * k + r * H, N[10] = a * S + o * F + c * B + r * V, N[14] = a * L + o * G + c * R + r * U, N[3] = w * d + y * O + j * p + l * $, N[7] = w * h + y * K + j * k + l * H, N[11] = w * S + y * F + j * B + l * V, N[15] = w * L + y * G + j * R + l * U, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[4] *= M, D[8] *= M, D[12] *= M, D[1] *= M, D[5] *= M, D[9] *= M, D[13] *= M, D[2] *= M, D[6] *= M, D[10] *= M, D[14] *= M, D[3] *= M, D[7] *= M, D[11] *= M, D[15] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], t = M[4], e = M[8], N = M[12], n = M[1], A = M[5], z = M[9], I = M[13], T = M[2], u = M[6], g = M[10], s = M[14], a = M[3], o = M[7], c = M[11], r = M[15];
    return a * (+N * z * u - e * I * u - N * A * g + t * I * g + e * A * s - t * z * s) + o * (+D * z * s - D * I * g + N * n * g - e * n * s + e * I * T - N * z * T) + c * (+D * I * u - D * A * s - N * n * u + t * n * s + N * A * T - t * I * T) + r * (-e * A * T - D * z * u + D * A * g + e * n * u - t * n * g + t * z * T);
  }
  transpose() {
    const M = this.elements;
    let D;
    return D = M[1], M[1] = M[4], M[4] = D, D = M[2], M[2] = M[8], M[8] = D, D = M[6], M[6] = M[9], M[9] = D, D = M[3], M[3] = M[12], M[12] = D, D = M[7], M[7] = M[13], M[13] = D, D = M[11], M[11] = M[14], M[14] = D, this;
  }
  setPosition(M, D, t) {
    const e = this.elements;
    return M.isVector3 ? (e[12] = M.x, e[13] = M.y, e[14] = M.z) : (e[12] = M, e[13] = D, e[14] = t), this;
  }
  invert() {
    const M = this.elements, D = M[0], t = M[1], e = M[2], N = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8], u = M[9], g = M[10], s = M[11], a = M[12], o = M[13], c = M[14], r = M[15], w = u * c * I - o * g * I + o * z * s - A * c * s - u * z * r + A * g * r, y = a * g * I - T * c * I - a * z * s + n * c * s + T * z * r - n * g * r, j = T * o * I - a * u * I + a * A * s - n * o * s - T * A * r + n * u * r, l = a * u * z - T * o * z - a * A * g + n * o * g + T * A * c - n * u * c, d = D * w + t * y + e * j + N * l;
    if (d === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const h = 1 / d;
    return M[0] = w * h, M[1] = (o * g * N - u * c * N - o * e * s + t * c * s + u * e * r - t * g * r) * h, M[2] = (A * c * N - o * z * N + o * e * I - t * c * I - A * e * r + t * z * r) * h, M[3] = (u * z * N - A * g * N - u * e * I + t * g * I + A * e * s - t * z * s) * h, M[4] = y * h, M[5] = (T * c * N - a * g * N + a * e * s - D * c * s - T * e * r + D * g * r) * h, M[6] = (a * z * N - n * c * N - a * e * I + D * c * I + n * e * r - D * z * r) * h, M[7] = (n * g * N - T * z * N + T * e * I - D * g * I - n * e * s + D * z * s) * h, M[8] = j * h, M[9] = (a * u * N - T * o * N - a * t * s + D * o * s + T * t * r - D * u * r) * h, M[10] = (n * o * N - a * A * N + a * t * I - D * o * I - n * t * r + D * A * r) * h, M[11] = (T * A * N - n * u * N - T * t * I + D * u * I + n * t * s - D * A * s) * h, M[12] = l * h, M[13] = (T * o * e - a * u * e + a * t * g - D * o * g - T * t * c + D * u * c) * h, M[14] = (a * A * e - n * o * e - a * t * z + D * o * z + n * t * c - D * A * c) * h, M[15] = (n * u * e - T * A * e + T * t * z - D * u * z - n * t * g + D * A * g) * h, this;
  }
  scale(M) {
    const D = this.elements, t = M.x, e = M.y, N = M.z;
    return D[0] *= t, D[4] *= e, D[8] *= N, D[1] *= t, D[5] *= e, D[9] *= N, D[2] *= t, D[6] *= e, D[10] *= N, D[3] *= t, D[7] *= e, D[11] *= N, this;
  }
  getMaxScaleOnAxis() {
    const M = this.elements, D = M[0] * M[0] + M[1] * M[1] + M[2] * M[2], t = M[4] * M[4] + M[5] * M[5] + M[6] * M[6], e = M[8] * M[8] + M[9] * M[9] + M[10] * M[10];
    return Math.sqrt(Math.max(D, t, e));
  }
  makeTranslation(M, D, t) {
    return M.isVector3 ? this.set(
      1,
      0,
      0,
      M.x,
      0,
      1,
      0,
      M.y,
      0,
      0,
      1,
      M.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      M,
      0,
      1,
      0,
      D,
      0,
      0,
      1,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(M) {
    const D = Math.cos(M), t = Math.sin(M);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      D,
      -t,
      0,
      0,
      t,
      D,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(M) {
    const D = Math.cos(M), t = Math.sin(M);
    return this.set(
      D,
      0,
      t,
      0,
      0,
      1,
      0,
      0,
      -t,
      0,
      D,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(M) {
    const D = Math.cos(M), t = Math.sin(M);
    return this.set(
      D,
      -t,
      0,
      0,
      t,
      D,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(M, D) {
    const t = Math.cos(D), e = Math.sin(D), N = 1 - t, n = M.x, A = M.y, z = M.z, I = N * n, T = N * A;
    return this.set(
      I * n + t,
      I * A - e * z,
      I * z + e * A,
      0,
      I * A + e * z,
      T * A + t,
      T * z - e * n,
      0,
      I * z - e * A,
      T * z + e * n,
      N * z * z + t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(M, D, t) {
    return this.set(
      M,
      0,
      0,
      0,
      0,
      D,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(M, D, t, e, N, n) {
    return this.set(
      1,
      t,
      N,
      0,
      M,
      1,
      n,
      0,
      D,
      e,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(M, D, t) {
    const e = this.elements, N = D._x, n = D._y, A = D._z, z = D._w, I = N + N, T = n + n, u = A + A, g = N * I, s = N * T, a = N * u, o = n * T, c = n * u, r = A * u, w = z * I, y = z * T, j = z * u, l = t.x, d = t.y, h = t.z;
    return e[0] = (1 - (o + r)) * l, e[1] = (s + j) * l, e[2] = (a - y) * l, e[3] = 0, e[4] = (s - j) * d, e[5] = (1 - (g + r)) * d, e[6] = (c + w) * d, e[7] = 0, e[8] = (a + y) * h, e[9] = (c - w) * h, e[10] = (1 - (g + o)) * h, e[11] = 0, e[12] = M.x, e[13] = M.y, e[14] = M.z, e[15] = 1, this;
  }
  decompose(M, D, t) {
    const e = this.elements;
    let N = Se.set(e[0], e[1], e[2]).length();
    const n = Se.set(e[4], e[5], e[6]).length(), A = Se.set(e[8], e[9], e[10]).length();
    this.determinant() < 0 && (N = -N), M.x = e[12], M.y = e[13], M.z = e[14], HD.copy(this);
    const I = 1 / N, T = 1 / n, u = 1 / A;
    return HD.elements[0] *= I, HD.elements[1] *= I, HD.elements[2] *= I, HD.elements[4] *= T, HD.elements[5] *= T, HD.elements[6] *= T, HD.elements[8] *= u, HD.elements[9] *= u, HD.elements[10] *= u, D.setFromRotationMatrix(HD), t.x = N, t.y = n, t.z = A, this;
  }
  makePerspective(M, D, t, e, N, n, A = ui) {
    const z = this.elements, I = 2 * N / (D - M), T = 2 * N / (t - e), u = (D + M) / (D - M), g = (t + e) / (t - e);
    let s, a;
    if (A === ui)
      s = -(n + N) / (n - N), a = -2 * n * N / (n - N);
    else if (A === UI)
      s = -n / (n - N), a = -n * N / (n - N);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + A);
    return z[0] = I, z[4] = 0, z[8] = u, z[12] = 0, z[1] = 0, z[5] = T, z[9] = g, z[13] = 0, z[2] = 0, z[6] = 0, z[10] = s, z[14] = a, z[3] = 0, z[7] = 0, z[11] = -1, z[15] = 0, this;
  }
  makeOrthographic(M, D, t, e, N, n, A = ui) {
    const z = this.elements, I = 1 / (D - M), T = 1 / (t - e), u = 1 / (n - N), g = (D + M) * I, s = (t + e) * T;
    let a, o;
    if (A === ui)
      a = (n + N) * u, o = -2 * u;
    else if (A === UI)
      a = N * u, o = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + A);
    return z[0] = 2 * I, z[4] = 0, z[8] = 0, z[12] = -g, z[1] = 0, z[5] = 2 * T, z[9] = 0, z[13] = -s, z[2] = 0, z[6] = 0, z[10] = o, z[14] = -a, z[3] = 0, z[7] = 0, z[11] = 0, z[15] = 1, this;
  }
  equals(M) {
    const D = this.elements, t = M.elements;
    for (let e = 0; e < 16; e++)
      if (D[e] !== t[e])
        return !1;
    return !0;
  }
  fromArray(M, D = 0) {
    for (let t = 0; t < 16; t++)
      this.elements[t] = M[t + D];
    return this;
  }
  toArray(M = [], D = 0) {
    const t = this.elements;
    return M[D] = t[0], M[D + 1] = t[1], M[D + 2] = t[2], M[D + 3] = t[3], M[D + 4] = t[4], M[D + 5] = t[5], M[D + 6] = t[6], M[D + 7] = t[7], M[D + 8] = t[8], M[D + 9] = t[9], M[D + 10] = t[10], M[D + 11] = t[11], M[D + 12] = t[12], M[D + 13] = t[13], M[D + 14] = t[14], M[D + 15] = t[15], M;
  }
}
const Se = /* @__PURE__ */ new P(), HD = /* @__PURE__ */ new kD(), _o = /* @__PURE__ */ new P(0, 0, 0), bo = /* @__PURE__ */ new P(1, 1, 1), St = /* @__PURE__ */ new P(), oi = /* @__PURE__ */ new P(), mD = /* @__PURE__ */ new P(), ZI = /* @__PURE__ */ new kD(), _I = /* @__PURE__ */ new ZN();
class NA {
  constructor(M = 0, D = 0, t = 0, e = NA.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = M, this._y = D, this._z = t, this._order = e;
  }
  get x() {
    return this._x;
  }
  set x(M) {
    this._x = M, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(M) {
    this._y = M, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(M) {
    this._z = M, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(M) {
    this._order = M, this._onChangeCallback();
  }
  set(M, D, t, e = this._order) {
    return this._x = M, this._y = D, this._z = t, this._order = e, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(M) {
    return this._x = M._x, this._y = M._y, this._z = M._z, this._order = M._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M, D = this._order, t = !0) {
    const e = M.elements, N = e[0], n = e[4], A = e[8], z = e[1], I = e[5], T = e[9], u = e[2], g = e[6], s = e[10];
    switch (D) {
      case "XYZ":
        this._y = Math.asin(dD(A, -1, 1)), Math.abs(A) < 0.9999999 ? (this._x = Math.atan2(-T, s), this._z = Math.atan2(-n, N)) : (this._x = Math.atan2(g, I), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-dD(T, -1, 1)), Math.abs(T) < 0.9999999 ? (this._y = Math.atan2(A, s), this._z = Math.atan2(z, I)) : (this._y = Math.atan2(-u, N), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(dD(g, -1, 1)), Math.abs(g) < 0.9999999 ? (this._y = Math.atan2(-u, s), this._z = Math.atan2(-n, I)) : (this._y = 0, this._z = Math.atan2(z, N));
        break;
      case "ZYX":
        this._y = Math.asin(-dD(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(g, s), this._z = Math.atan2(z, N)) : (this._x = 0, this._z = Math.atan2(-n, I));
        break;
      case "YZX":
        this._z = Math.asin(dD(z, -1, 1)), Math.abs(z) < 0.9999999 ? (this._x = Math.atan2(-T, I), this._y = Math.atan2(-u, N)) : (this._x = 0, this._y = Math.atan2(A, s));
        break;
      case "XZY":
        this._z = Math.asin(-dD(n, -1, 1)), Math.abs(n) < 0.9999999 ? (this._x = Math.atan2(g, I), this._y = Math.atan2(A, N)) : (this._x = Math.atan2(-T, s), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + D);
    }
    return this._order = D, t === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(M, D, t) {
    return ZI.makeRotationFromQuaternion(M), this.setFromRotationMatrix(ZI, D, t);
  }
  setFromVector3(M, D = this._order) {
    return this.set(M.x, M.y, M.z, D);
  }
  reorder(M) {
    return _I.setFromEuler(this), this.setFromQuaternion(_I, M);
  }
  equals(M) {
    return M._x === this._x && M._y === this._y && M._z === this._z && M._order === this._order;
  }
  fromArray(M) {
    return this._x = M[0], this._y = M[1], this._z = M[2], M[3] !== void 0 && (this._order = M[3]), this._onChangeCallback(), this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this._x, M[D + 1] = this._y, M[D + 2] = this._z, M[D + 3] = this._order, M;
  }
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
NA.DEFAULT_ORDER = "XYZ";
class Ko {
  constructor() {
    this.mask = 1;
  }
  set(M) {
    this.mask = (1 << M | 0) >>> 0;
  }
  enable(M) {
    this.mask |= 1 << M | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(M) {
    this.mask ^= 1 << M | 0;
  }
  disable(M) {
    this.mask &= ~(1 << M | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(M) {
    return (this.mask & M.mask) !== 0;
  }
  isEnabled(M) {
    return (this.mask & (1 << M | 0)) !== 0;
  }
}
let Po = 0;
const bI = /* @__PURE__ */ new P(), Ze = /* @__PURE__ */ new ZN(), yt = /* @__PURE__ */ new kD(), yi = /* @__PURE__ */ new P(), oN = /* @__PURE__ */ new P(), Ro = /* @__PURE__ */ new P(), Fo = /* @__PURE__ */ new ZN(), KI = /* @__PURE__ */ new P(1, 0, 0), PI = /* @__PURE__ */ new P(0, 1, 0), RI = /* @__PURE__ */ new P(0, 0, 1), Bo = { type: "added" }, Vo = { type: "removed" };
class FD extends tA {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Po++ }), this.uuid = SN(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = FD.DEFAULT_UP.clone();
    const M = new P(), D = new NA(), t = new ZN(), e = new P(1, 1, 1);
    function N() {
      t.setFromEuler(D, !1);
    }
    function n() {
      D.setFromQuaternion(t, void 0, !1);
    }
    D._onChange(N), t._onChange(n), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: M
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: D
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      modelViewMatrix: {
        value: new kD()
      },
      normalMatrix: {
        value: new Vt()
      }
    }), this.matrix = new kD(), this.matrixWorld = new kD(), this.matrixAutoUpdate = FD.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = FD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.layers = new Ko(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(M) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(M), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(M) {
    return this.quaternion.premultiply(M), this;
  }
  setRotationFromAxisAngle(M, D) {
    this.quaternion.setFromAxisAngle(M, D);
  }
  setRotationFromEuler(M) {
    this.quaternion.setFromEuler(M, !0);
  }
  setRotationFromMatrix(M) {
    this.quaternion.setFromRotationMatrix(M);
  }
  setRotationFromQuaternion(M) {
    this.quaternion.copy(M);
  }
  rotateOnAxis(M, D) {
    return Ze.setFromAxisAngle(M, D), this.quaternion.multiply(Ze), this;
  }
  rotateOnWorldAxis(M, D) {
    return Ze.setFromAxisAngle(M, D), this.quaternion.premultiply(Ze), this;
  }
  rotateX(M) {
    return this.rotateOnAxis(KI, M);
  }
  rotateY(M) {
    return this.rotateOnAxis(PI, M);
  }
  rotateZ(M) {
    return this.rotateOnAxis(RI, M);
  }
  translateOnAxis(M, D) {
    return bI.copy(M).applyQuaternion(this.quaternion), this.position.add(bI.multiplyScalar(D)), this;
  }
  translateX(M) {
    return this.translateOnAxis(KI, M);
  }
  translateY(M) {
    return this.translateOnAxis(PI, M);
  }
  translateZ(M) {
    return this.translateOnAxis(RI, M);
  }
  localToWorld(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(yt.copy(this.matrixWorld).invert());
  }
  lookAt(M, D, t) {
    M.isVector3 ? yi.copy(M) : yi.set(M, D, t);
    const e = this.parent;
    this.updateWorldMatrix(!0, !1), oN.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? yt.lookAt(oN, yi, this.up) : yt.lookAt(yi, oN, this.up), this.quaternion.setFromRotationMatrix(yt), e && (yt.extractRotation(e.matrixWorld), Ze.setFromRotationMatrix(yt), this.quaternion.premultiply(Ze.invert()));
  }
  add(M) {
    if (arguments.length > 1) {
      for (let D = 0; D < arguments.length; D++)
        this.add(arguments[D]);
      return this;
    }
    return M === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", M), this) : (M && M.isObject3D ? (M.parent !== null && M.parent.remove(M), M.parent = this, this.children.push(M), M.dispatchEvent(Bo)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", M), this);
  }
  remove(M) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.remove(arguments[t]);
      return this;
    }
    const D = this.children.indexOf(M);
    return D !== -1 && (M.parent = null, this.children.splice(D, 1), M.dispatchEvent(Vo)), this;
  }
  removeFromParent() {
    const M = this.parent;
    return M !== null && M.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(M) {
    return this.updateWorldMatrix(!0, !1), yt.copy(this.matrixWorld).invert(), M.parent !== null && (M.parent.updateWorldMatrix(!0, !1), yt.multiply(M.parent.matrixWorld)), M.applyMatrix4(yt), this.add(M), M.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(M) {
    return this.getObjectByProperty("id", M);
  }
  getObjectByName(M) {
    return this.getObjectByProperty("name", M);
  }
  getObjectByProperty(M, D) {
    if (this[M] === D)
      return this;
    for (let t = 0, e = this.children.length; t < e; t++) {
      const n = this.children[t].getObjectByProperty(M, D);
      if (n !== void 0)
        return n;
    }
  }
  getObjectsByProperty(M, D) {
    let t = [];
    this[M] === D && t.push(this);
    for (let e = 0, N = this.children.length; e < N; e++) {
      const n = this.children[e].getObjectsByProperty(M, D);
      n.length > 0 && (t = t.concat(n));
    }
    return t;
  }
  getWorldPosition(M) {
    return this.updateWorldMatrix(!0, !1), M.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(oN, M, Ro), M;
  }
  getWorldScale(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(oN, Fo, M), M;
  }
  getWorldDirection(M) {
    this.updateWorldMatrix(!0, !1);
    const D = this.matrixWorld.elements;
    return M.set(D[8], D[9], D[10]).normalize();
  }
  raycast() {
  }
  traverse(M) {
    M(this);
    const D = this.children;
    for (let t = 0, e = D.length; t < e; t++)
      D[t].traverse(M);
  }
  traverseVisible(M) {
    if (this.visible === !1)
      return;
    M(this);
    const D = this.children;
    for (let t = 0, e = D.length; t < e; t++)
      D[t].traverseVisible(M);
  }
  traverseAncestors(M) {
    const D = this.parent;
    D !== null && (M(D), D.traverseAncestors(M));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(M) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || M) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, M = !0);
    const D = this.children;
    for (let t = 0, e = D.length; t < e; t++) {
      const N = D[t];
      (N.matrixWorldAutoUpdate === !0 || M === !0) && N.updateMatrixWorld(M);
    }
  }
  updateWorldMatrix(M, D) {
    const t = this.parent;
    if (M === !0 && t !== null && t.matrixWorldAutoUpdate === !0 && t.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), D === !0) {
      const e = this.children;
      for (let N = 0, n = e.length; N < n; N++) {
        const A = e[N];
        A.matrixWorldAutoUpdate === !0 && A.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string", t = {};
    D && (M = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, t.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const e = {};
    e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), this.castShadow === !0 && (e.castShadow = !0), this.receiveShadow === !0 && (e.receiveShadow = !0), this.visible === !1 && (e.visible = !1), this.frustumCulled === !1 && (e.frustumCulled = !1), this.renderOrder !== 0 && (e.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (e.userData = this.userData), e.layers = this.layers.mask, e.matrix = this.matrix.toArray(), e.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (e.matrixAutoUpdate = !1), this.isInstancedMesh && (e.type = "InstancedMesh", e.count = this.count, e.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (e.instanceColor = this.instanceColor.toJSON()));
    function N(A, z) {
      return A[z.uuid] === void 0 && (A[z.uuid] = z.toJSON(M)), z.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? e.background = this.background.toJSON() : this.background.isTexture && (e.background = this.background.toJSON(M).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (e.environment = this.environment.toJSON(M).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      e.geometry = N(M.geometries, this.geometry);
      const A = this.geometry.parameters;
      if (A !== void 0 && A.shapes !== void 0) {
        const z = A.shapes;
        if (Array.isArray(z))
          for (let I = 0, T = z.length; I < T; I++) {
            const u = z[I];
            N(M.shapes, u);
          }
        else
          N(M.shapes, z);
      }
    }
    if (this.isSkinnedMesh && (e.bindMode = this.bindMode, e.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (N(M.skeletons, this.skeleton), e.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const A = [];
        for (let z = 0, I = this.material.length; z < I; z++)
          A.push(N(M.materials, this.material[z]));
        e.material = A;
      } else
        e.material = N(M.materials, this.material);
    if (this.children.length > 0) {
      e.children = [];
      for (let A = 0; A < this.children.length; A++)
        e.children.push(this.children[A].toJSON(M).object);
    }
    if (this.animations.length > 0) {
      e.animations = [];
      for (let A = 0; A < this.animations.length; A++) {
        const z = this.animations[A];
        e.animations.push(N(M.animations, z));
      }
    }
    if (D) {
      const A = n(M.geometries), z = n(M.materials), I = n(M.textures), T = n(M.images), u = n(M.shapes), g = n(M.skeletons), s = n(M.animations), a = n(M.nodes);
      A.length > 0 && (t.geometries = A), z.length > 0 && (t.materials = z), I.length > 0 && (t.textures = I), T.length > 0 && (t.images = T), u.length > 0 && (t.shapes = u), g.length > 0 && (t.skeletons = g), s.length > 0 && (t.animations = s), a.length > 0 && (t.nodes = a);
    }
    return t.object = e, t;
    function n(A) {
      const z = [];
      for (const I in A) {
        const T = A[I];
        delete T.metadata, z.push(T);
      }
      return z;
    }
  }
  clone(M) {
    return new this.constructor().copy(this, M);
  }
  copy(M, D = !0) {
    if (this.name = M.name, this.up.copy(M.up), this.position.copy(M.position), this.rotation.order = M.rotation.order, this.quaternion.copy(M.quaternion), this.scale.copy(M.scale), this.matrix.copy(M.matrix), this.matrixWorld.copy(M.matrixWorld), this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrixWorldNeedsUpdate = M.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = M.matrixWorldAutoUpdate, this.layers.mask = M.layers.mask, this.visible = M.visible, this.castShadow = M.castShadow, this.receiveShadow = M.receiveShadow, this.frustumCulled = M.frustumCulled, this.renderOrder = M.renderOrder, this.animations = M.animations.slice(), this.userData = JSON.parse(JSON.stringify(M.userData)), D === !0)
      for (let t = 0; t < M.children.length; t++) {
        const e = M.children[t];
        this.add(e.clone());
      }
    return this;
  }
}
FD.DEFAULT_UP = /* @__PURE__ */ new P(0, 1, 0);
FD.DEFAULT_MATRIX_AUTO_UPDATE = !0;
FD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const WD = /* @__PURE__ */ new P(), jt = /* @__PURE__ */ new P(), Dn = /* @__PURE__ */ new P(), Ct = /* @__PURE__ */ new P(), _e = /* @__PURE__ */ new P(), be = /* @__PURE__ */ new P(), FI = /* @__PURE__ */ new P(), tn = /* @__PURE__ */ new P(), en = /* @__PURE__ */ new P(), Nn = /* @__PURE__ */ new P();
let ji = !1;
class XD {
  constructor(M = new P(), D = new P(), t = new P()) {
    this.a = M, this.b = D, this.c = t;
  }
  static getNormal(M, D, t, e) {
    e.subVectors(t, D), WD.subVectors(M, D), e.cross(WD);
    const N = e.lengthSq();
    return N > 0 ? e.multiplyScalar(1 / Math.sqrt(N)) : e.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(M, D, t, e, N) {
    WD.subVectors(e, D), jt.subVectors(t, D), Dn.subVectors(M, D);
    const n = WD.dot(WD), A = WD.dot(jt), z = WD.dot(Dn), I = jt.dot(jt), T = jt.dot(Dn), u = n * I - A * A;
    if (u === 0)
      return N.set(-2, -1, -1);
    const g = 1 / u, s = (I * z - A * T) * g, a = (n * T - A * z) * g;
    return N.set(1 - s - a, a, s);
  }
  static containsPoint(M, D, t, e) {
    return this.getBarycoord(M, D, t, e, Ct), Ct.x >= 0 && Ct.y >= 0 && Ct.x + Ct.y <= 1;
  }
  static getUV(M, D, t, e, N, n, A, z) {
    return ji === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), ji = !0), this.getInterpolation(M, D, t, e, N, n, A, z);
  }
  static getInterpolation(M, D, t, e, N, n, A, z) {
    return this.getBarycoord(M, D, t, e, Ct), z.setScalar(0), z.addScaledVector(N, Ct.x), z.addScaledVector(n, Ct.y), z.addScaledVector(A, Ct.z), z;
  }
  static isFrontFacing(M, D, t, e) {
    return WD.subVectors(t, D), jt.subVectors(M, D), WD.cross(jt).dot(e) < 0;
  }
  set(M, D, t) {
    return this.a.copy(M), this.b.copy(D), this.c.copy(t), this;
  }
  setFromPointsAndIndices(M, D, t, e) {
    return this.a.copy(M[D]), this.b.copy(M[t]), this.c.copy(M[e]), this;
  }
  setFromAttributeAndIndices(M, D, t, e) {
    return this.a.fromBufferAttribute(M, D), this.b.fromBufferAttribute(M, t), this.c.fromBufferAttribute(M, e), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.a.copy(M.a), this.b.copy(M.b), this.c.copy(M.c), this;
  }
  getArea() {
    return WD.subVectors(this.c, this.b), jt.subVectors(this.a, this.b), WD.cross(jt).length() * 0.5;
  }
  getMidpoint(M) {
    return M.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(M) {
    return XD.getNormal(this.a, this.b, this.c, M);
  }
  getPlane(M) {
    return M.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(M, D) {
    return XD.getBarycoord(M, this.a, this.b, this.c, D);
  }
  getUV(M, D, t, e, N) {
    return ji === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), ji = !0), XD.getInterpolation(M, this.a, this.b, this.c, D, t, e, N);
  }
  getInterpolation(M, D, t, e, N) {
    return XD.getInterpolation(M, this.a, this.b, this.c, D, t, e, N);
  }
  containsPoint(M) {
    return XD.containsPoint(M, this.a, this.b, this.c);
  }
  isFrontFacing(M) {
    return XD.isFrontFacing(this.a, this.b, this.c, M);
  }
  intersectsBox(M) {
    return M.intersectsTriangle(this);
  }
  closestPointToPoint(M, D) {
    const t = this.a, e = this.b, N = this.c;
    let n, A;
    _e.subVectors(e, t), be.subVectors(N, t), tn.subVectors(M, t);
    const z = _e.dot(tn), I = be.dot(tn);
    if (z <= 0 && I <= 0)
      return D.copy(t);
    en.subVectors(M, e);
    const T = _e.dot(en), u = be.dot(en);
    if (T >= 0 && u <= T)
      return D.copy(e);
    const g = z * u - T * I;
    if (g <= 0 && z >= 0 && T <= 0)
      return n = z / (z - T), D.copy(t).addScaledVector(_e, n);
    Nn.subVectors(M, N);
    const s = _e.dot(Nn), a = be.dot(Nn);
    if (a >= 0 && s <= a)
      return D.copy(N);
    const o = s * I - z * a;
    if (o <= 0 && I >= 0 && a <= 0)
      return A = I / (I - a), D.copy(t).addScaledVector(be, A);
    const c = T * a - s * u;
    if (c <= 0 && u - T >= 0 && s - a >= 0)
      return FI.subVectors(N, e), A = (u - T) / (u - T + (s - a)), D.copy(e).addScaledVector(FI, A);
    const r = 1 / (c + o + g);
    return n = o * r, A = g * r, D.copy(t).addScaledVector(_e, n).addScaledVector(be, A);
  }
  equals(M) {
    return M.a.equals(this.a) && M.b.equals(this.b) && M.c.equals(this.c);
  }
}
let Go = 0;
class tN extends tA {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Go++ }), this.uuid = SN(), this.name = "", this.type = "Material", this.blending = EI, this.side = hn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = yo, this.blendDst = jo, this.blendEquation = oo, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = Co, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = po, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = RA, this.stencilZFail = RA, this.stencilZPass = RA, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(M) {
    this._alphaTest > 0 != M > 0 && this.version++, this._alphaTest = M;
  }
  onBuild() {
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(M) {
    if (M !== void 0)
      for (const D in M) {
        const t = M[D];
        if (t === void 0) {
          console.warn(`THREE.Material: parameter '${D}' has value of undefined.`);
          continue;
        }
        const e = this[D];
        if (e === void 0) {
          console.warn(`THREE.Material: '${D}' is not a property of THREE.${this.type}.`);
          continue;
        }
        e && e.isColor ? e.set(t) : e && e.isVector3 && t && t.isVector3 ? e.copy(t) : this[D] = t;
      }
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    D && (M = {
      textures: {},
      images: {}
    });
    const t = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), this.color && this.color.isColor && (t.color = this.color.getHex()), this.roughness !== void 0 && (t.roughness = this.roughness), this.metalness !== void 0 && (t.metalness = this.metalness), this.sheen !== void 0 && (t.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (t.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (t.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (t.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (t.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (t.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (t.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (t.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (t.shininess = this.shininess), this.clearcoat !== void 0 && (t.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (t.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (t.clearcoatMap = this.clearcoatMap.toJSON(M).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (t.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(M).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (t.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(M).uuid, t.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (t.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (t.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (t.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (t.iridescenceMap = this.iridescenceMap.toJSON(M).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (t.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(M).uuid), this.anisotropy !== void 0 && (t.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (t.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (t.anisotropyMap = this.anisotropyMap.toJSON(M).uuid), this.map && this.map.isTexture && (t.map = this.map.toJSON(M).uuid), this.matcap && this.matcap.isTexture && (t.matcap = this.matcap.toJSON(M).uuid), this.alphaMap && this.alphaMap.isTexture && (t.alphaMap = this.alphaMap.toJSON(M).uuid), this.lightMap && this.lightMap.isTexture && (t.lightMap = this.lightMap.toJSON(M).uuid, t.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (t.aoMap = this.aoMap.toJSON(M).uuid, t.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (t.bumpMap = this.bumpMap.toJSON(M).uuid, t.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (t.normalMap = this.normalMap.toJSON(M).uuid, t.normalMapType = this.normalMapType, t.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (t.displacementMap = this.displacementMap.toJSON(M).uuid, t.displacementScale = this.displacementScale, t.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (t.roughnessMap = this.roughnessMap.toJSON(M).uuid), this.metalnessMap && this.metalnessMap.isTexture && (t.metalnessMap = this.metalnessMap.toJSON(M).uuid), this.emissiveMap && this.emissiveMap.isTexture && (t.emissiveMap = this.emissiveMap.toJSON(M).uuid), this.specularMap && this.specularMap.isTexture && (t.specularMap = this.specularMap.toJSON(M).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (t.specularIntensityMap = this.specularIntensityMap.toJSON(M).uuid), this.specularColorMap && this.specularColorMap.isTexture && (t.specularColorMap = this.specularColorMap.toJSON(M).uuid), this.envMap && this.envMap.isTexture && (t.envMap = this.envMap.toJSON(M).uuid, this.combine !== void 0 && (t.combine = this.combine)), this.envMapIntensity !== void 0 && (t.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (t.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (t.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (t.gradientMap = this.gradientMap.toJSON(M).uuid), this.transmission !== void 0 && (t.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (t.transmissionMap = this.transmissionMap.toJSON(M).uuid), this.thickness !== void 0 && (t.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (t.thicknessMap = this.thicknessMap.toJSON(M).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (t.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (t.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (t.size = this.size), this.shadowSide !== null && (t.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (t.sizeAttenuation = this.sizeAttenuation), this.blending !== EI && (t.blending = this.blending), this.side !== hn && (t.side = this.side), this.vertexColors === !0 && (t.vertexColors = !0), this.opacity < 1 && (t.opacity = this.opacity), this.transparent === !0 && (t.transparent = !0), t.depthFunc = this.depthFunc, t.depthTest = this.depthTest, t.depthWrite = this.depthWrite, t.colorWrite = this.colorWrite, t.stencilWrite = this.stencilWrite, t.stencilWriteMask = this.stencilWriteMask, t.stencilFunc = this.stencilFunc, t.stencilRef = this.stencilRef, t.stencilFuncMask = this.stencilFuncMask, t.stencilFail = this.stencilFail, t.stencilZFail = this.stencilZFail, t.stencilZPass = this.stencilZPass, this.rotation !== void 0 && this.rotation !== 0 && (t.rotation = this.rotation), this.polygonOffset === !0 && (t.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (t.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (t.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (t.linewidth = this.linewidth), this.dashSize !== void 0 && (t.dashSize = this.dashSize), this.gapSize !== void 0 && (t.gapSize = this.gapSize), this.scale !== void 0 && (t.scale = this.scale), this.dithering === !0 && (t.dithering = !0), this.alphaTest > 0 && (t.alphaTest = this.alphaTest), this.alphaHash === !0 && (t.alphaHash = !0), this.alphaToCoverage === !0 && (t.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (t.premultipliedAlpha = !0), this.forceSinglePass === !0 && (t.forceSinglePass = !0), this.wireframe === !0 && (t.wireframe = !0), this.wireframeLinewidth > 1 && (t.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (t.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (t.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (t.flatShading = !0), this.visible === !1 && (t.visible = !1), this.toneMapped === !1 && (t.toneMapped = !1), this.fog === !1 && (t.fog = !1), Object.keys(this.userData).length > 0 && (t.userData = this.userData);
    function e(N) {
      const n = [];
      for (const A in N) {
        const z = N[A];
        delete z.metadata, n.push(z);
      }
      return n;
    }
    if (D) {
      const N = e(M.textures), n = e(M.images);
      N.length > 0 && (t.textures = N), n.length > 0 && (t.images = n);
    }
    return t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.name = M.name, this.blending = M.blending, this.side = M.side, this.vertexColors = M.vertexColors, this.opacity = M.opacity, this.transparent = M.transparent, this.blendSrc = M.blendSrc, this.blendDst = M.blendDst, this.blendEquation = M.blendEquation, this.blendSrcAlpha = M.blendSrcAlpha, this.blendDstAlpha = M.blendDstAlpha, this.blendEquationAlpha = M.blendEquationAlpha, this.depthFunc = M.depthFunc, this.depthTest = M.depthTest, this.depthWrite = M.depthWrite, this.stencilWriteMask = M.stencilWriteMask, this.stencilFunc = M.stencilFunc, this.stencilRef = M.stencilRef, this.stencilFuncMask = M.stencilFuncMask, this.stencilFail = M.stencilFail, this.stencilZFail = M.stencilZFail, this.stencilZPass = M.stencilZPass, this.stencilWrite = M.stencilWrite;
    const D = M.clippingPlanes;
    let t = null;
    if (D !== null) {
      const e = D.length;
      t = new Array(e);
      for (let N = 0; N !== e; ++N)
        t[N] = D[N].clone();
    }
    return this.clippingPlanes = t, this.clipIntersection = M.clipIntersection, this.clipShadows = M.clipShadows, this.shadowSide = M.shadowSide, this.colorWrite = M.colorWrite, this.precision = M.precision, this.polygonOffset = M.polygonOffset, this.polygonOffsetFactor = M.polygonOffsetFactor, this.polygonOffsetUnits = M.polygonOffsetUnits, this.dithering = M.dithering, this.alphaTest = M.alphaTest, this.alphaHash = M.alphaHash, this.alphaToCoverage = M.alphaToCoverage, this.premultipliedAlpha = M.premultipliedAlpha, this.forceSinglePass = M.forceSinglePass, this.visible = M.visible, this.toneMapped = M.toneMapped, this.userData = JSON.parse(JSON.stringify(M.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
}
const ru = {
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
  yellowgreen: 10145074
}, Zt = { h: 0, s: 0, l: 0 }, Ci = { h: 0, s: 0, l: 0 };
function An(i, M, D) {
  return D < 0 && (D += 1), D > 1 && (D -= 1), D < 1 / 6 ? i + (M - i) * 6 * D : D < 1 / 2 ? M : D < 2 / 3 ? i + (M - i) * 6 * (2 / 3 - D) : i;
}
class ht {
  constructor(M, D, t) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(M, D, t);
  }
  set(M, D, t) {
    if (D === void 0 && t === void 0) {
      const e = M;
      e && e.isColor ? this.copy(e) : typeof e == "number" ? this.setHex(e) : typeof e == "string" && this.setStyle(e);
    } else
      this.setRGB(M, D, t);
    return this;
  }
  setScalar(M) {
    return this.r = M, this.g = M, this.b = M, this;
  }
  setHex(M, D = qD) {
    return M = Math.floor(M), this.r = (M >> 16 & 255) / 255, this.g = (M >> 8 & 255) / 255, this.b = (M & 255) / 255, GD.toWorkingColorSpace(this, D), this;
  }
  setRGB(M, D, t, e = GD.workingColorSpace) {
    return this.r = M, this.g = D, this.b = t, GD.toWorkingColorSpace(this, e), this;
  }
  setHSL(M, D, t, e = GD.workingColorSpace) {
    if (M = Yo(M, 1), D = dD(D, 0, 1), t = dD(t, 0, 1), D === 0)
      this.r = this.g = this.b = t;
    else {
      const N = t <= 0.5 ? t * (1 + D) : t + D - t * D, n = 2 * t - N;
      this.r = An(n, N, M + 1 / 3), this.g = An(n, N, M), this.b = An(n, N, M - 1 / 3);
    }
    return GD.toWorkingColorSpace(this, e), this;
  }
  setStyle(M, D = qD) {
    function t(N) {
      N !== void 0 && parseFloat(N) < 1 && console.warn("THREE.Color: Alpha component of " + M + " will be ignored.");
    }
    let e;
    if (e = /^(\w+)\(([^\)]*)\)/.exec(M)) {
      let N;
      const n = e[1], A = e[2];
      switch (n) {
        case "rgb":
        case "rgba":
          if (N = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return t(N[4]), this.setRGB(
              Math.min(255, parseInt(N[1], 10)) / 255,
              Math.min(255, parseInt(N[2], 10)) / 255,
              Math.min(255, parseInt(N[3], 10)) / 255,
              D
            );
          if (N = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return t(N[4]), this.setRGB(
              Math.min(100, parseInt(N[1], 10)) / 100,
              Math.min(100, parseInt(N[2], 10)) / 100,
              Math.min(100, parseInt(N[3], 10)) / 100,
              D
            );
          break;
        case "hsl":
        case "hsla":
          if (N = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return t(N[4]), this.setHSL(
              parseFloat(N[1]) / 360,
              parseFloat(N[2]) / 100,
              parseFloat(N[3]) / 100,
              D
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + M);
      }
    } else if (e = /^\#([A-Fa-f\d]+)$/.exec(M)) {
      const N = e[1], n = N.length;
      if (n === 3)
        return this.setRGB(
          parseInt(N.charAt(0), 16) / 15,
          parseInt(N.charAt(1), 16) / 15,
          parseInt(N.charAt(2), 16) / 15,
          D
        );
      if (n === 6)
        return this.setHex(parseInt(N, 16), D);
      console.warn("THREE.Color: Invalid hex color " + M);
    } else if (M && M.length > 0)
      return this.setColorName(M, D);
    return this;
  }
  setColorName(M, D = qD) {
    const t = ru[M.toLowerCase()];
    return t !== void 0 ? this.setHex(t, D) : console.warn("THREE.Color: Unknown color " + M), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(M) {
    return this.r = M.r, this.g = M.g, this.b = M.b, this;
  }
  copySRGBToLinear(M) {
    return this.r = qe(M.r), this.g = qe(M.g), this.b = qe(M.b), this;
  }
  copyLinearToSRGB(M) {
    return this.r = GA(M.r), this.g = GA(M.g), this.b = GA(M.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(M = qD) {
    return GD.fromWorkingColorSpace(cD.copy(this), M), Math.round(dD(cD.r * 255, 0, 255)) * 65536 + Math.round(dD(cD.g * 255, 0, 255)) * 256 + Math.round(dD(cD.b * 255, 0, 255));
  }
  getHexString(M = qD) {
    return ("000000" + this.getHex(M).toString(16)).slice(-6);
  }
  getHSL(M, D = GD.workingColorSpace) {
    GD.fromWorkingColorSpace(cD.copy(this), D);
    const t = cD.r, e = cD.g, N = cD.b, n = Math.max(t, e, N), A = Math.min(t, e, N);
    let z, I;
    const T = (A + n) / 2;
    if (A === n)
      z = 0, I = 0;
    else {
      const u = n - A;
      switch (I = T <= 0.5 ? u / (n + A) : u / (2 - n - A), n) {
        case t:
          z = (e - N) / u + (e < N ? 6 : 0);
          break;
        case e:
          z = (N - t) / u + 2;
          break;
        case N:
          z = (t - e) / u + 4;
          break;
      }
      z /= 6;
    }
    return M.h = z, M.s = I, M.l = T, M;
  }
  getRGB(M, D = GD.workingColorSpace) {
    return GD.fromWorkingColorSpace(cD.copy(this), D), M.r = cD.r, M.g = cD.g, M.b = cD.b, M;
  }
  getStyle(M = qD) {
    GD.fromWorkingColorSpace(cD.copy(this), M);
    const D = cD.r, t = cD.g, e = cD.b;
    return M !== qD ? `color(${M} ${D.toFixed(3)} ${t.toFixed(3)} ${e.toFixed(3)})` : `rgb(${Math.round(D * 255)},${Math.round(t * 255)},${Math.round(e * 255)})`;
  }
  offsetHSL(M, D, t) {
    return this.getHSL(Zt), this.setHSL(Zt.h + M, Zt.s + D, Zt.l + t);
  }
  add(M) {
    return this.r += M.r, this.g += M.g, this.b += M.b, this;
  }
  addColors(M, D) {
    return this.r = M.r + D.r, this.g = M.g + D.g, this.b = M.b + D.b, this;
  }
  addScalar(M) {
    return this.r += M, this.g += M, this.b += M, this;
  }
  sub(M) {
    return this.r = Math.max(0, this.r - M.r), this.g = Math.max(0, this.g - M.g), this.b = Math.max(0, this.b - M.b), this;
  }
  multiply(M) {
    return this.r *= M.r, this.g *= M.g, this.b *= M.b, this;
  }
  multiplyScalar(M) {
    return this.r *= M, this.g *= M, this.b *= M, this;
  }
  lerp(M, D) {
    return this.r += (M.r - this.r) * D, this.g += (M.g - this.g) * D, this.b += (M.b - this.b) * D, this;
  }
  lerpColors(M, D, t) {
    return this.r = M.r + (D.r - M.r) * t, this.g = M.g + (D.g - M.g) * t, this.b = M.b + (D.b - M.b) * t, this;
  }
  lerpHSL(M, D) {
    this.getHSL(Zt), M.getHSL(Ci);
    const t = FA(Zt.h, Ci.h, D), e = FA(Zt.s, Ci.s, D), N = FA(Zt.l, Ci.l, D);
    return this.setHSL(t, e, N), this;
  }
  setFromVector3(M) {
    return this.r = M.x, this.g = M.y, this.b = M.z, this;
  }
  applyMatrix3(M) {
    const D = this.r, t = this.g, e = this.b, N = M.elements;
    return this.r = N[0] * D + N[3] * t + N[6] * e, this.g = N[1] * D + N[4] * t + N[7] * e, this.b = N[2] * D + N[5] * t + N[8] * e, this;
  }
  equals(M) {
    return M.r === this.r && M.g === this.g && M.b === this.b;
  }
  fromArray(M, D = 0) {
    return this.r = M[D], this.g = M[D + 1], this.b = M[D + 2], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.r, M[D + 1] = this.g, M[D + 2] = this.b, M;
  }
  fromBufferAttribute(M, D) {
    return this.r = M.getX(D), this.g = M.getY(D), this.b = M.getZ(D), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const cD = /* @__PURE__ */ new ht();
ht.NAMES = ru;
class Ho extends tN {
  constructor(M) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new ht(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = uu, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.fog = M.fog, this;
  }
}
const MD = /* @__PURE__ */ new P(), Li = /* @__PURE__ */ new xD();
class Xe {
  constructor(M, D, t = !1) {
    if (Array.isArray(M))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = M, this.itemSize = D, this.count = M !== void 0 ? M.length / D : 0, this.normalized = t, this.usage = YI, this.updateRange = { offset: 0, count: -1 }, this.gpuType = Oo, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
  setUsage(M) {
    return this.usage = M, this;
  }
  copy(M) {
    return this.name = M.name, this.array = new M.array.constructor(M.array), this.itemSize = M.itemSize, this.count = M.count, this.normalized = M.normalized, this.usage = M.usage, this.gpuType = M.gpuType, this;
  }
  copyAt(M, D, t) {
    M *= this.itemSize, t *= D.itemSize;
    for (let e = 0, N = this.itemSize; e < N; e++)
      this.array[M + e] = D.array[t + e];
    return this;
  }
  copyArray(M) {
    return this.array.set(M), this;
  }
  applyMatrix3(M) {
    if (this.itemSize === 2)
      for (let D = 0, t = this.count; D < t; D++)
        Li.fromBufferAttribute(this, D), Li.applyMatrix3(M), this.setXY(D, Li.x, Li.y);
    else if (this.itemSize === 3)
      for (let D = 0, t = this.count; D < t; D++)
        MD.fromBufferAttribute(this, D), MD.applyMatrix3(M), this.setXYZ(D, MD.x, MD.y, MD.z);
    return this;
  }
  applyMatrix4(M) {
    for (let D = 0, t = this.count; D < t; D++)
      MD.fromBufferAttribute(this, D), MD.applyMatrix4(M), this.setXYZ(D, MD.x, MD.y, MD.z);
    return this;
  }
  applyNormalMatrix(M) {
    for (let D = 0, t = this.count; D < t; D++)
      MD.fromBufferAttribute(this, D), MD.applyNormalMatrix(M), this.setXYZ(D, MD.x, MD.y, MD.z);
    return this;
  }
  transformDirection(M) {
    for (let D = 0, t = this.count; D < t; D++)
      MD.fromBufferAttribute(this, D), MD.transformDirection(M), this.setXYZ(D, MD.x, MD.y, MD.z);
    return this;
  }
  set(M, D = 0) {
    return this.array.set(M, D), this;
  }
  getComponent(M, D) {
    let t = this.array[M * this.itemSize + D];
    return this.normalized && (t = rN(t, this.array)), t;
  }
  setComponent(M, D, t) {
    return this.normalized && (t = lD(t, this.array)), this.array[M * this.itemSize + D] = t, this;
  }
  getX(M) {
    let D = this.array[M * this.itemSize];
    return this.normalized && (D = rN(D, this.array)), D;
  }
  setX(M, D) {
    return this.normalized && (D = lD(D, this.array)), this.array[M * this.itemSize] = D, this;
  }
  getY(M) {
    let D = this.array[M * this.itemSize + 1];
    return this.normalized && (D = rN(D, this.array)), D;
  }
  setY(M, D) {
    return this.normalized && (D = lD(D, this.array)), this.array[M * this.itemSize + 1] = D, this;
  }
  getZ(M) {
    let D = this.array[M * this.itemSize + 2];
    return this.normalized && (D = rN(D, this.array)), D;
  }
  setZ(M, D) {
    return this.normalized && (D = lD(D, this.array)), this.array[M * this.itemSize + 2] = D, this;
  }
  getW(M) {
    let D = this.array[M * this.itemSize + 3];
    return this.normalized && (D = rN(D, this.array)), D;
  }
  setW(M, D) {
    return this.normalized && (D = lD(D, this.array)), this.array[M * this.itemSize + 3] = D, this;
  }
  setXY(M, D, t) {
    return M *= this.itemSize, this.normalized && (D = lD(D, this.array), t = lD(t, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this;
  }
  setXYZ(M, D, t, e) {
    return M *= this.itemSize, this.normalized && (D = lD(D, this.array), t = lD(t, this.array), e = lD(e, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this.array[M + 2] = e, this;
  }
  setXYZW(M, D, t, e, N) {
    return M *= this.itemSize, this.normalized && (D = lD(D, this.array), t = lD(t, this.array), e = lD(e, this.array), N = lD(N, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this.array[M + 2] = e, this.array[M + 3] = N, this;
  }
  onUpload(M) {
    return this.onUploadCallback = M, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const M = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (M.name = this.name), this.usage !== YI && (M.usage = this.usage), (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (M.updateRange = this.updateRange), M;
  }
}
class Wo extends Xe {
  constructor(M, D, t) {
    super(new Uint16Array(M), D, t);
  }
}
class qo extends Xe {
  constructor(M, D, t) {
    super(new Uint32Array(M), D, t);
  }
}
class xt extends Xe {
  constructor(M, D, t) {
    super(new Float32Array(M), D, t);
  }
}
let Xo = 0;
const _D = /* @__PURE__ */ new kD(), nn = /* @__PURE__ */ new FD(), Ke = /* @__PURE__ */ new P(), QD = /* @__PURE__ */ new _N(), yN = /* @__PURE__ */ new _N(), AD = /* @__PURE__ */ new P();
class se extends tA {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Xo++ }), this.uuid = SN(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(M) {
    return Array.isArray(M) ? this.index = new (Uo(M) ? qo : Wo)(M, 1) : this.index = M, this;
  }
  getAttribute(M) {
    return this.attributes[M];
  }
  setAttribute(M, D) {
    return this.attributes[M] = D, this;
  }
  deleteAttribute(M) {
    return delete this.attributes[M], this;
  }
  hasAttribute(M) {
    return this.attributes[M] !== void 0;
  }
  addGroup(M, D, t = 0) {
    this.groups.push({
      start: M,
      count: D,
      materialIndex: t
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(M, D) {
    this.drawRange.start = M, this.drawRange.count = D;
  }
  applyMatrix4(M) {
    const D = this.attributes.position;
    D !== void 0 && (D.applyMatrix4(M), D.needsUpdate = !0);
    const t = this.attributes.normal;
    if (t !== void 0) {
      const N = new Vt().getNormalMatrix(M);
      t.applyNormalMatrix(N), t.needsUpdate = !0;
    }
    const e = this.attributes.tangent;
    return e !== void 0 && (e.transformDirection(M), e.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(M) {
    return _D.makeRotationFromQuaternion(M), this.applyMatrix4(_D), this;
  }
  rotateX(M) {
    return _D.makeRotationX(M), this.applyMatrix4(_D), this;
  }
  rotateY(M) {
    return _D.makeRotationY(M), this.applyMatrix4(_D), this;
  }
  rotateZ(M) {
    return _D.makeRotationZ(M), this.applyMatrix4(_D), this;
  }
  translate(M, D, t) {
    return _D.makeTranslation(M, D, t), this.applyMatrix4(_D), this;
  }
  scale(M, D, t) {
    return _D.makeScale(M, D, t), this.applyMatrix4(_D), this;
  }
  lookAt(M) {
    return nn.lookAt(M), nn.updateMatrix(), this.applyMatrix4(nn.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Ke).negate(), this.translate(Ke.x, Ke.y, Ke.z), this;
  }
  setFromPoints(M) {
    const D = [];
    for (let t = 0, e = M.length; t < e; t++) {
      const N = M[t];
      D.push(N.x, N.y, N.z || 0);
    }
    return this.setAttribute("position", new xt(D, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new _N());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new P(-1 / 0, -1 / 0, -1 / 0),
        new P(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (M !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(M), D)
        for (let t = 0, e = D.length; t < e; t++) {
          const N = D[t];
          QD.setFromBufferAttribute(N), this.morphTargetsRelative ? (AD.addVectors(this.boundingBox.min, QD.min), this.boundingBox.expandByPoint(AD), AD.addVectors(this.boundingBox.max, QD.max), this.boundingBox.expandByPoint(AD)) : (this.boundingBox.expandByPoint(QD.min), this.boundingBox.expandByPoint(QD.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new eA());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new P(), 1 / 0);
      return;
    }
    if (M) {
      const t = this.boundingSphere.center;
      if (QD.setFromBufferAttribute(M), D)
        for (let N = 0, n = D.length; N < n; N++) {
          const A = D[N];
          yN.setFromBufferAttribute(A), this.morphTargetsRelative ? (AD.addVectors(QD.min, yN.min), QD.expandByPoint(AD), AD.addVectors(QD.max, yN.max), QD.expandByPoint(AD)) : (QD.expandByPoint(yN.min), QD.expandByPoint(yN.max));
        }
      QD.getCenter(t);
      let e = 0;
      for (let N = 0, n = M.count; N < n; N++)
        AD.fromBufferAttribute(M, N), e = Math.max(e, t.distanceToSquared(AD));
      if (D)
        for (let N = 0, n = D.length; N < n; N++) {
          const A = D[N], z = this.morphTargetsRelative;
          for (let I = 0, T = A.count; I < T; I++)
            AD.fromBufferAttribute(A, I), z && (Ke.fromBufferAttribute(M, I), AD.add(Ke)), e = Math.max(e, t.distanceToSquared(AD));
        }
      this.boundingSphere.radius = Math.sqrt(e), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const M = this.index, D = this.attributes;
    if (M === null || D.position === void 0 || D.normal === void 0 || D.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const t = M.array, e = D.position.array, N = D.normal.array, n = D.uv.array, A = e.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Xe(new Float32Array(4 * A), 4));
    const z = this.getAttribute("tangent").array, I = [], T = [];
    for (let O = 0; O < A; O++)
      I[O] = new P(), T[O] = new P();
    const u = new P(), g = new P(), s = new P(), a = new xD(), o = new xD(), c = new xD(), r = new P(), w = new P();
    function y(O, K, F) {
      u.fromArray(e, O * 3), g.fromArray(e, K * 3), s.fromArray(e, F * 3), a.fromArray(n, O * 2), o.fromArray(n, K * 2), c.fromArray(n, F * 2), g.sub(u), s.sub(u), o.sub(a), c.sub(a);
      const G = 1 / (o.x * c.y - c.x * o.y);
      isFinite(G) && (r.copy(g).multiplyScalar(c.y).addScaledVector(s, -o.y).multiplyScalar(G), w.copy(s).multiplyScalar(o.x).addScaledVector(g, -c.x).multiplyScalar(G), I[O].add(r), I[K].add(r), I[F].add(r), T[O].add(w), T[K].add(w), T[F].add(w));
    }
    let j = this.groups;
    j.length === 0 && (j = [{
      start: 0,
      count: t.length
    }]);
    for (let O = 0, K = j.length; O < K; ++O) {
      const F = j[O], G = F.start, p = F.count;
      for (let k = G, B = G + p; k < B; k += 3)
        y(
          t[k + 0],
          t[k + 1],
          t[k + 2]
        );
    }
    const l = new P(), d = new P(), h = new P(), S = new P();
    function L(O) {
      h.fromArray(N, O * 3), S.copy(h);
      const K = I[O];
      l.copy(K), l.sub(h.multiplyScalar(h.dot(K))).normalize(), d.crossVectors(S, K);
      const G = d.dot(T[O]) < 0 ? -1 : 1;
      z[O * 4] = l.x, z[O * 4 + 1] = l.y, z[O * 4 + 2] = l.z, z[O * 4 + 3] = G;
    }
    for (let O = 0, K = j.length; O < K; ++O) {
      const F = j[O], G = F.start, p = F.count;
      for (let k = G, B = G + p; k < B; k += 3)
        L(t[k + 0]), L(t[k + 1]), L(t[k + 2]);
    }
  }
  computeVertexNormals() {
    const M = this.index, D = this.getAttribute("position");
    if (D !== void 0) {
      let t = this.getAttribute("normal");
      if (t === void 0)
        t = new Xe(new Float32Array(D.count * 3), 3), this.setAttribute("normal", t);
      else
        for (let g = 0, s = t.count; g < s; g++)
          t.setXYZ(g, 0, 0, 0);
      const e = new P(), N = new P(), n = new P(), A = new P(), z = new P(), I = new P(), T = new P(), u = new P();
      if (M)
        for (let g = 0, s = M.count; g < s; g += 3) {
          const a = M.getX(g + 0), o = M.getX(g + 1), c = M.getX(g + 2);
          e.fromBufferAttribute(D, a), N.fromBufferAttribute(D, o), n.fromBufferAttribute(D, c), T.subVectors(n, N), u.subVectors(e, N), T.cross(u), A.fromBufferAttribute(t, a), z.fromBufferAttribute(t, o), I.fromBufferAttribute(t, c), A.add(T), z.add(T), I.add(T), t.setXYZ(a, A.x, A.y, A.z), t.setXYZ(o, z.x, z.y, z.z), t.setXYZ(c, I.x, I.y, I.z);
        }
      else
        for (let g = 0, s = D.count; g < s; g += 3)
          e.fromBufferAttribute(D, g + 0), N.fromBufferAttribute(D, g + 1), n.fromBufferAttribute(D, g + 2), T.subVectors(n, N), u.subVectors(e, N), T.cross(u), t.setXYZ(g + 0, T.x, T.y, T.z), t.setXYZ(g + 1, T.x, T.y, T.z), t.setXYZ(g + 2, T.x, T.y, T.z);
      this.normalizeNormals(), t.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const M = this.attributes.normal;
    for (let D = 0, t = M.count; D < t; D++)
      AD.fromBufferAttribute(M, D), AD.normalize(), M.setXYZ(D, AD.x, AD.y, AD.z);
  }
  toNonIndexed() {
    function M(A, z) {
      const I = A.array, T = A.itemSize, u = A.normalized, g = new I.constructor(z.length * T);
      let s = 0, a = 0;
      for (let o = 0, c = z.length; o < c; o++) {
        A.isInterleavedBufferAttribute ? s = z[o] * A.data.stride + A.offset : s = z[o] * T;
        for (let r = 0; r < T; r++)
          g[a++] = I[s++];
      }
      return new Xe(g, T, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const D = new se(), t = this.index.array, e = this.attributes;
    for (const A in e) {
      const z = e[A], I = M(z, t);
      D.setAttribute(A, I);
    }
    const N = this.morphAttributes;
    for (const A in N) {
      const z = [], I = N[A];
      for (let T = 0, u = I.length; T < u; T++) {
        const g = I[T], s = M(g, t);
        z.push(s);
      }
      D.morphAttributes[A] = z;
    }
    D.morphTargetsRelative = this.morphTargetsRelative;
    const n = this.groups;
    for (let A = 0, z = n.length; A < z; A++) {
      const I = n[A];
      D.addGroup(I.start, I.count, I.materialIndex);
    }
    return D;
  }
  toJSON() {
    const M = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (M.uuid = this.uuid, M.type = this.type, this.name !== "" && (M.name = this.name), Object.keys(this.userData).length > 0 && (M.userData = this.userData), this.parameters !== void 0) {
      const z = this.parameters;
      for (const I in z)
        z[I] !== void 0 && (M[I] = z[I]);
      return M;
    }
    M.data = { attributes: {} };
    const D = this.index;
    D !== null && (M.data.index = {
      type: D.array.constructor.name,
      array: Array.prototype.slice.call(D.array)
    });
    const t = this.attributes;
    for (const z in t) {
      const I = t[z];
      M.data.attributes[z] = I.toJSON(M.data);
    }
    const e = {};
    let N = !1;
    for (const z in this.morphAttributes) {
      const I = this.morphAttributes[z], T = [];
      for (let u = 0, g = I.length; u < g; u++) {
        const s = I[u];
        T.push(s.toJSON(M.data));
      }
      T.length > 0 && (e[z] = T, N = !0);
    }
    N && (M.data.morphAttributes = e, M.data.morphTargetsRelative = this.morphTargetsRelative);
    const n = this.groups;
    n.length > 0 && (M.data.groups = JSON.parse(JSON.stringify(n)));
    const A = this.boundingSphere;
    return A !== null && (M.data.boundingSphere = {
      center: A.center.toArray(),
      radius: A.radius
    }), M;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const D = {};
    this.name = M.name;
    const t = M.index;
    t !== null && this.setIndex(t.clone(D));
    const e = M.attributes;
    for (const I in e) {
      const T = e[I];
      this.setAttribute(I, T.clone(D));
    }
    const N = M.morphAttributes;
    for (const I in N) {
      const T = [], u = N[I];
      for (let g = 0, s = u.length; g < s; g++)
        T.push(u[g].clone(D));
      this.morphAttributes[I] = T;
    }
    this.morphTargetsRelative = M.morphTargetsRelative;
    const n = M.groups;
    for (let I = 0, T = n.length; I < T; I++) {
      const u = n[I];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const A = M.boundingBox;
    A !== null && (this.boundingBox = A.clone());
    const z = M.boundingSphere;
    return z !== null && (this.boundingSphere = z.clone()), this.drawRange.start = M.drawRange.start, this.drawRange.count = M.drawRange.count, this.userData = M.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const BI = /* @__PURE__ */ new kD(), De = /* @__PURE__ */ new Pn(), wi = /* @__PURE__ */ new eA(), VI = /* @__PURE__ */ new P(), Pe = /* @__PURE__ */ new P(), Re = /* @__PURE__ */ new P(), Fe = /* @__PURE__ */ new P(), zn = /* @__PURE__ */ new P(), xi = /* @__PURE__ */ new P(), Oi = /* @__PURE__ */ new xD(), Ei = /* @__PURE__ */ new xD(), li = /* @__PURE__ */ new xD(), GI = /* @__PURE__ */ new P(), HI = /* @__PURE__ */ new P(), WI = /* @__PURE__ */ new P(), hi = /* @__PURE__ */ new P(), di = /* @__PURE__ */ new P();
class qI extends FD {
  constructor(M = new se(), D = new Ho()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), M.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = M.morphTargetInfluences.slice()), M.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, M.morphTargetDictionary)), this.material = Array.isArray(M.material) ? M.material.slice() : M.material, this.geometry = M.geometry, this;
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, t = Object.keys(D);
    if (t.length > 0) {
      const e = D[t[0]];
      if (e !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let N = 0, n = e.length; N < n; N++) {
          const A = e[N].name || String(N);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = N;
        }
      }
    }
  }
  getVertexPosition(M, D) {
    const t = this.geometry, e = t.attributes.position, N = t.morphAttributes.position, n = t.morphTargetsRelative;
    D.fromBufferAttribute(e, M);
    const A = this.morphTargetInfluences;
    if (N && A) {
      xi.set(0, 0, 0);
      for (let z = 0, I = N.length; z < I; z++) {
        const T = A[z], u = N[z];
        T !== 0 && (zn.fromBufferAttribute(u, M), n ? xi.addScaledVector(zn, T) : xi.addScaledVector(zn.sub(D), T));
      }
      D.add(xi);
    }
    return D;
  }
  raycast(M, D) {
    const t = this.geometry, e = this.material, N = this.matrixWorld;
    e !== void 0 && (t.boundingSphere === null && t.computeBoundingSphere(), wi.copy(t.boundingSphere), wi.applyMatrix4(N), De.copy(M.ray).recast(M.near), !(wi.containsPoint(De.origin) === !1 && (De.intersectSphere(wi, VI) === null || De.origin.distanceToSquared(VI) > (M.far - M.near) ** 2)) && (BI.copy(N).invert(), De.copy(M.ray).applyMatrix4(BI), !(t.boundingBox !== null && De.intersectsBox(t.boundingBox) === !1) && this._computeIntersections(M, D, De)));
  }
  _computeIntersections(M, D, t) {
    let e;
    const N = this.geometry, n = this.material, A = N.index, z = N.attributes.position, I = N.attributes.uv, T = N.attributes.uv1, u = N.attributes.normal, g = N.groups, s = N.drawRange;
    if (A !== null)
      if (Array.isArray(n))
        for (let a = 0, o = g.length; a < o; a++) {
          const c = g[a], r = n[c.materialIndex], w = Math.max(c.start, s.start), y = Math.min(A.count, Math.min(c.start + c.count, s.start + s.count));
          for (let j = w, l = y; j < l; j += 3) {
            const d = A.getX(j), h = A.getX(j + 1), S = A.getX(j + 2);
            e = vi(this, r, M, t, I, T, u, d, h, S), e && (e.faceIndex = Math.floor(j / 3), e.face.materialIndex = c.materialIndex, D.push(e));
          }
        }
      else {
        const a = Math.max(0, s.start), o = Math.min(A.count, s.start + s.count);
        for (let c = a, r = o; c < r; c += 3) {
          const w = A.getX(c), y = A.getX(c + 1), j = A.getX(c + 2);
          e = vi(this, n, M, t, I, T, u, w, y, j), e && (e.faceIndex = Math.floor(c / 3), D.push(e));
        }
      }
    else if (z !== void 0)
      if (Array.isArray(n))
        for (let a = 0, o = g.length; a < o; a++) {
          const c = g[a], r = n[c.materialIndex], w = Math.max(c.start, s.start), y = Math.min(z.count, Math.min(c.start + c.count, s.start + s.count));
          for (let j = w, l = y; j < l; j += 3) {
            const d = j, h = j + 1, S = j + 2;
            e = vi(this, r, M, t, I, T, u, d, h, S), e && (e.faceIndex = Math.floor(j / 3), e.face.materialIndex = c.materialIndex, D.push(e));
          }
        }
      else {
        const a = Math.max(0, s.start), o = Math.min(z.count, s.start + s.count);
        for (let c = a, r = o; c < r; c += 3) {
          const w = c, y = c + 1, j = c + 2;
          e = vi(this, n, M, t, I, T, u, w, y, j), e && (e.faceIndex = Math.floor(c / 3), D.push(e));
        }
      }
  }
}
function $o(i, M, D, t, e, N, n, A) {
  let z;
  if (M.side === ao ? z = t.intersectTriangle(n, N, e, !0, A) : z = t.intersectTriangle(e, N, n, M.side === hn, A), z === null)
    return null;
  di.copy(A), di.applyMatrix4(i.matrixWorld);
  const I = D.ray.origin.distanceTo(di);
  return I < D.near || I > D.far ? null : {
    distance: I,
    point: di.clone(),
    object: i
  };
}
function vi(i, M, D, t, e, N, n, A, z, I) {
  i.getVertexPosition(A, Pe), i.getVertexPosition(z, Re), i.getVertexPosition(I, Fe);
  const T = $o(i, M, D, t, Pe, Re, Fe, hi);
  if (T) {
    e && (Oi.fromBufferAttribute(e, A), Ei.fromBufferAttribute(e, z), li.fromBufferAttribute(e, I), T.uv = XD.getInterpolation(hi, Pe, Re, Fe, Oi, Ei, li, new xD())), N && (Oi.fromBufferAttribute(N, A), Ei.fromBufferAttribute(N, z), li.fromBufferAttribute(N, I), T.uv1 = XD.getInterpolation(hi, Pe, Re, Fe, Oi, Ei, li, new xD()), T.uv2 = T.uv1), n && (GI.fromBufferAttribute(n, A), HI.fromBufferAttribute(n, z), WI.fromBufferAttribute(n, I), T.normal = XD.getInterpolation(hi, Pe, Re, Fe, GI, HI, WI, new P()), T.normal.dot(t.direction) > 0 && T.normal.multiplyScalar(-1));
    const u = {
      a: A,
      b: z,
      c: I,
      normal: new P(),
      materialIndex: 0
    };
    XD.getNormal(Pe, Re, Fe, u.normal), T.face = u;
  }
  return T;
}
class Jo extends FD {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
class Ki extends tN {
  constructor(M) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new ht(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.linewidth = M.linewidth, this.linecap = M.linecap, this.linejoin = M.linejoin, this.fog = M.fog, this;
  }
}
const XI = /* @__PURE__ */ new P(), $I = /* @__PURE__ */ new P(), JI = /* @__PURE__ */ new kD(), In = /* @__PURE__ */ new Pn(), pi = /* @__PURE__ */ new eA();
class My extends FD {
  constructor(M = new se(), D = new Ki()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), this.material = Array.isArray(M.material) ? M.material.slice() : M.material, this.geometry = M.geometry, this;
  }
  computeLineDistances() {
    const M = this.geometry;
    if (M.index === null) {
      const D = M.attributes.position, t = [0];
      for (let e = 1, N = D.count; e < N; e++)
        XI.fromBufferAttribute(D, e - 1), $I.fromBufferAttribute(D, e), t[e] = t[e - 1], t[e] += XI.distanceTo($I);
      M.setAttribute("lineDistance", new xt(t, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(M, D) {
    const t = this.geometry, e = this.matrixWorld, N = M.params.Line.threshold, n = t.drawRange;
    if (t.boundingSphere === null && t.computeBoundingSphere(), pi.copy(t.boundingSphere), pi.applyMatrix4(e), pi.radius += N, M.ray.intersectsSphere(pi) === !1)
      return;
    JI.copy(e).invert(), In.copy(M.ray).applyMatrix4(JI);
    const A = N / ((this.scale.x + this.scale.y + this.scale.z) / 3), z = A * A, I = new P(), T = new P(), u = new P(), g = new P(), s = this.isLineSegments ? 2 : 1, a = t.index, c = t.attributes.position;
    if (a !== null) {
      const r = Math.max(0, n.start), w = Math.min(a.count, n.start + n.count);
      for (let y = r, j = w - 1; y < j; y += s) {
        const l = a.getX(y), d = a.getX(y + 1);
        if (I.fromBufferAttribute(c, l), T.fromBufferAttribute(c, d), In.distanceSqToSegment(I, T, g, u) > z)
          continue;
        g.applyMatrix4(this.matrixWorld);
        const S = M.ray.origin.distanceTo(g);
        S < M.near || S > M.far || D.push({
          distance: S,
          // What do we want? intersection point on the ray or on the segment??
          // point: raycaster.ray.at( distance ),
          point: u.clone().applyMatrix4(this.matrixWorld),
          index: y,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    } else {
      const r = Math.max(0, n.start), w = Math.min(c.count, n.start + n.count);
      for (let y = r, j = w - 1; y < j; y += s) {
        if (I.fromBufferAttribute(c, y), T.fromBufferAttribute(c, y + 1), In.distanceSqToSegment(I, T, g, u) > z)
          continue;
        g.applyMatrix4(this.matrixWorld);
        const d = M.ray.origin.distanceTo(g);
        d < M.near || d > M.far || D.push({
          distance: d,
          // What do we want? intersection point on the ray or on the segment??
          // point: raycaster.ray.at( distance ),
          point: u.clone().applyMatrix4(this.matrixWorld),
          index: y,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    }
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, t = Object.keys(D);
    if (t.length > 0) {
      const e = D[t[0]];
      if (e !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let N = 0, n = e.length; N < n; N++) {
          const A = e[N].name || String(N);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = N;
        }
      }
    }
  }
}
const MT = /* @__PURE__ */ new P(), DT = /* @__PURE__ */ new P();
class tT extends My {
  constructor(M, D) {
    super(M, D), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const M = this.geometry;
    if (M.index === null) {
      const D = M.attributes.position, t = [];
      for (let e = 0, N = D.count; e < N; e += 2)
        MT.fromBufferAttribute(D, e), DT.fromBufferAttribute(D, e + 1), t[e] = e === 0 ? 0 : t[e - 1], t[e + 1] = t[e] + MT.distanceTo(DT);
      M.setAttribute("lineDistance", new xt(t, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class LN extends tN {
  constructor(M) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new ht(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.alphaMap = M.alphaMap, this.size = M.size, this.sizeAttenuation = M.sizeAttenuation, this.fog = M.fog, this;
  }
}
const eT = /* @__PURE__ */ new kD(), vn = /* @__PURE__ */ new Pn(), Yi = /* @__PURE__ */ new eA(), Ui = /* @__PURE__ */ new P();
class Tn extends FD {
  constructor(M = new se(), D = new LN()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), this.material = Array.isArray(M.material) ? M.material.slice() : M.material, this.geometry = M.geometry, this;
  }
  raycast(M, D) {
    const t = this.geometry, e = this.matrixWorld, N = M.params.Points.threshold, n = t.drawRange;
    if (t.boundingSphere === null && t.computeBoundingSphere(), Yi.copy(t.boundingSphere), Yi.applyMatrix4(e), Yi.radius += N, M.ray.intersectsSphere(Yi) === !1)
      return;
    eT.copy(e).invert(), vn.copy(M.ray).applyMatrix4(eT);
    const A = N / ((this.scale.x + this.scale.y + this.scale.z) / 3), z = A * A, I = t.index, u = t.attributes.position;
    if (I !== null) {
      const g = Math.max(0, n.start), s = Math.min(I.count, n.start + n.count);
      for (let a = g, o = s; a < o; a++) {
        const c = I.getX(a);
        Ui.fromBufferAttribute(u, c), NT(Ui, c, z, e, M, D, this);
      }
    } else {
      const g = Math.max(0, n.start), s = Math.min(u.count, n.start + n.count);
      for (let a = g, o = s; a < o; a++)
        Ui.fromBufferAttribute(u, a), NT(Ui, a, z, e, M, D, this);
    }
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, t = Object.keys(D);
    if (t.length > 0) {
      const e = D[t[0]];
      if (e !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let N = 0, n = e.length; N < n; N++) {
          const A = e[N].name || String(N);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = N;
        }
      }
    }
  }
}
function NT(i, M, D, t, e, N, n) {
  const A = vn.distanceSqToPoint(i);
  if (A < D) {
    const z = new P();
    vn.closestPointToPoint(i, z), z.applyMatrix4(t);
    const I = e.ray.origin.distanceTo(z);
    if (I < e.near || I > e.far)
      return;
    N.push({
      distance: I,
      distanceToRay: Math.sqrt(A),
      point: z,
      index: M,
      face: null,
      object: n
    });
  }
}
class Dy extends tN {
  constructor(M) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new ht(16777215), this.specular = new ht(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new ht(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = ho, this.normalScale = new xD(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = uu, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.specular.copy(M.specular), this.shininess = M.shininess, this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.emissive.copy(M.emissive), this.emissiveMap = M.emissiveMap, this.emissiveIntensity = M.emissiveIntensity, this.bumpMap = M.bumpMap, this.bumpScale = M.bumpScale, this.normalMap = M.normalMap, this.normalMapType = M.normalMapType, this.normalScale.copy(M.normalScale), this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.flatShading = M.flatShading, this.fog = M.fog, this;
  }
}
const iT = {
  enabled: !1,
  files: {},
  add: function(i, M) {
    this.enabled !== !1 && (this.files[i] = M);
  },
  get: function(i) {
    if (this.enabled !== !1)
      return this.files[i];
  },
  remove: function(i) {
    delete this.files[i];
  },
  clear: function() {
    this.files = {};
  }
};
class ty {
  constructor(M, D, t) {
    const e = this;
    let N = !1, n = 0, A = 0, z;
    const I = [];
    this.onStart = void 0, this.onLoad = M, this.onProgress = D, this.onError = t, this.itemStart = function(T) {
      A++, N === !1 && e.onStart !== void 0 && e.onStart(T, n, A), N = !0;
    }, this.itemEnd = function(T) {
      n++, e.onProgress !== void 0 && e.onProgress(T, n, A), n === A && (N = !1, e.onLoad !== void 0 && e.onLoad());
    }, this.itemError = function(T) {
      e.onError !== void 0 && e.onError(T);
    }, this.resolveURL = function(T) {
      return z ? z(T) : T;
    }, this.setURLModifier = function(T) {
      return z = T, this;
    }, this.addHandler = function(T, u) {
      return I.push(T, u), this;
    }, this.removeHandler = function(T) {
      const u = I.indexOf(T);
      return u !== -1 && I.splice(u, 2), this;
    }, this.getHandler = function(T) {
      for (let u = 0, g = I.length; u < g; u += 2) {
        const s = I[u], a = I[u + 1];
        if (s.global && (s.lastIndex = 0), s.test(T))
          return a;
      }
      return null;
    };
  }
}
const ey = /* @__PURE__ */ new ty();
class Rn {
  constructor(M) {
    this.manager = M !== void 0 ? M : ey, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(M, D) {
    const t = this;
    return new Promise(function(e, N) {
      t.load(M, e, D, N);
    });
  }
  parse() {
  }
  setCrossOrigin(M) {
    return this.crossOrigin = M, this;
  }
  setWithCredentials(M) {
    return this.withCredentials = M, this;
  }
  setPath(M) {
    return this.path = M, this;
  }
  setResourcePath(M) {
    return this.resourcePath = M, this;
  }
  setRequestHeader(M) {
    return this.requestHeader = M, this;
  }
}
Rn.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const Lt = {};
class Ny extends Error {
  constructor(M, D) {
    super(M), this.response = D;
  }
}
class iy extends Rn {
  constructor(M) {
    super(M);
  }
  load(M, D, t, e) {
    M === void 0 && (M = ""), this.path !== void 0 && (M = this.path + M), M = this.manager.resolveURL(M);
    const N = iT.get(M);
    if (N !== void 0)
      return this.manager.itemStart(M), setTimeout(() => {
        D && D(N), this.manager.itemEnd(M);
      }, 0), N;
    if (Lt[M] !== void 0) {
      Lt[M].push({
        onLoad: D,
        onProgress: t,
        onError: e
      });
      return;
    }
    Lt[M] = [], Lt[M].push({
      onLoad: D,
      onProgress: t,
      onError: e
    });
    const n = new Request(M, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin"
      // An abort controller could be added within a future PR
    }), A = this.mimeType, z = this.responseType;
    fetch(n).then((I) => {
      if (I.status === 200 || I.status === 0) {
        if (I.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || I.body === void 0 || I.body.getReader === void 0)
          return I;
        const T = Lt[M], u = I.body.getReader(), g = I.headers.get("Content-Length") || I.headers.get("X-File-Size"), s = g ? parseInt(g) : 0, a = s !== 0;
        let o = 0;
        const c = new ReadableStream({
          start(r) {
            w();
            function w() {
              u.read().then(({ done: y, value: j }) => {
                if (y)
                  r.close();
                else {
                  o += j.byteLength;
                  const l = new ProgressEvent("progress", { lengthComputable: a, loaded: o, total: s });
                  for (let d = 0, h = T.length; d < h; d++) {
                    const S = T[d];
                    S.onProgress && S.onProgress(l);
                  }
                  r.enqueue(j), w();
                }
              });
            }
          }
        });
        return new Response(c);
      } else
        throw new Ny(`fetch for "${I.url}" responded with ${I.status}: ${I.statusText}`, I);
    }).then((I) => {
      switch (z) {
        case "arraybuffer":
          return I.arrayBuffer();
        case "blob":
          return I.blob();
        case "document":
          return I.text().then((T) => new DOMParser().parseFromString(T, A));
        case "json":
          return I.json();
        default:
          if (A === void 0)
            return I.text();
          {
            const u = /charset="?([^;"\s]*)"?/i.exec(A), g = u && u[1] ? u[1].toLowerCase() : void 0, s = new TextDecoder(g);
            return I.arrayBuffer().then((a) => s.decode(a));
          }
      }
    }).then((I) => {
      iT.add(M, I);
      const T = Lt[M];
      delete Lt[M];
      for (let u = 0, g = T.length; u < g; u++) {
        const s = T[u];
        s.onLoad && s.onLoad(I);
      }
    }).catch((I) => {
      const T = Lt[M];
      if (T === void 0)
        throw this.manager.itemError(M), I;
      delete Lt[M];
      for (let u = 0, g = T.length; u < g; u++) {
        const s = T[u];
        s.onError && s.onError(I);
      }
      this.manager.itemError(M);
    }).finally(() => {
      this.manager.itemEnd(M);
    }), this.manager.itemStart(M);
  }
  setResponseType(M) {
    return this.responseType = M, this;
  }
  setMimeType(M) {
    return this.mimeType = M, this;
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: Tu
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Tu);
const Ay = /^[og]\s*(.+)?/, ny = /^mtllib /, zy = /^usemtl /, Iy = /^usemap /, AT = /\s+/, nT = new P(), un = new P(), zT = new P(), IT = new P(), bD = new P(), fi = new ht();
function Ty() {
  const i = {
    objects: [],
    object: {},
    vertices: [],
    normals: [],
    colors: [],
    uvs: [],
    materials: {},
    materialLibraries: [],
    startObject: function(M, D) {
      if (this.object && this.object.fromDeclaration === !1) {
        this.object.name = M, this.object.fromDeclaration = D !== !1;
        return;
      }
      const t = this.object && typeof this.object.currentMaterial == "function" ? this.object.currentMaterial() : void 0;
      if (this.object && typeof this.object._finalize == "function" && this.object._finalize(!0), this.object = {
        name: M || "",
        fromDeclaration: D !== !1,
        geometry: {
          vertices: [],
          normals: [],
          colors: [],
          uvs: [],
          hasUVIndices: !1
        },
        materials: [],
        smooth: !0,
        startMaterial: function(e, N) {
          const n = this._finalize(!1);
          n && (n.inherited || n.groupCount <= 0) && this.materials.splice(n.index, 1);
          const A = {
            index: this.materials.length,
            name: e || "",
            mtllib: Array.isArray(N) && N.length > 0 ? N[N.length - 1] : "",
            smooth: n !== void 0 ? n.smooth : this.smooth,
            groupStart: n !== void 0 ? n.groupEnd : 0,
            groupEnd: -1,
            groupCount: -1,
            inherited: !1,
            clone: function(z) {
              const I = {
                index: typeof z == "number" ? z : this.index,
                name: this.name,
                mtllib: this.mtllib,
                smooth: this.smooth,
                groupStart: 0,
                groupEnd: -1,
                groupCount: -1,
                inherited: !1
              };
              return I.clone = this.clone.bind(I), I;
            }
          };
          return this.materials.push(A), A;
        },
        currentMaterial: function() {
          if (this.materials.length > 0)
            return this.materials[this.materials.length - 1];
        },
        _finalize: function(e) {
          const N = this.currentMaterial();
          if (N && N.groupEnd === -1 && (N.groupEnd = this.geometry.vertices.length / 3, N.groupCount = N.groupEnd - N.groupStart, N.inherited = !1), e && this.materials.length > 1)
            for (let n = this.materials.length - 1; n >= 0; n--)
              this.materials[n].groupCount <= 0 && this.materials.splice(n, 1);
          return e && this.materials.length === 0 && this.materials.push({
            name: "",
            smooth: this.smooth
          }), N;
        }
      }, t && t.name && typeof t.clone == "function") {
        const e = t.clone(0);
        e.inherited = !0, this.object.materials.push(e);
      }
      this.objects.push(this.object);
    },
    finalize: function() {
      this.object && typeof this.object._finalize == "function" && this.object._finalize(!0);
    },
    parseVertexIndex: function(M, D) {
      const t = parseInt(M, 10);
      return (t >= 0 ? t - 1 : t + D / 3) * 3;
    },
    parseNormalIndex: function(M, D) {
      const t = parseInt(M, 10);
      return (t >= 0 ? t - 1 : t + D / 3) * 3;
    },
    parseUVIndex: function(M, D) {
      const t = parseInt(M, 10);
      return (t >= 0 ? t - 1 : t + D / 2) * 2;
    },
    addVertex: function(M, D, t) {
      const e = this.vertices, N = this.object.geometry.vertices;
      N.push(e[M + 0], e[M + 1], e[M + 2]), N.push(e[D + 0], e[D + 1], e[D + 2]), N.push(e[t + 0], e[t + 1], e[t + 2]);
    },
    addVertexPoint: function(M) {
      const D = this.vertices;
      this.object.geometry.vertices.push(D[M + 0], D[M + 1], D[M + 2]);
    },
    addVertexLine: function(M) {
      const D = this.vertices;
      this.object.geometry.vertices.push(D[M + 0], D[M + 1], D[M + 2]);
    },
    addNormal: function(M, D, t) {
      const e = this.normals, N = this.object.geometry.normals;
      N.push(e[M + 0], e[M + 1], e[M + 2]), N.push(e[D + 0], e[D + 1], e[D + 2]), N.push(e[t + 0], e[t + 1], e[t + 2]);
    },
    addFaceNormal: function(M, D, t) {
      const e = this.vertices, N = this.object.geometry.normals;
      nT.fromArray(e, M), un.fromArray(e, D), zT.fromArray(e, t), bD.subVectors(zT, un), IT.subVectors(nT, un), bD.cross(IT), bD.normalize(), N.push(bD.x, bD.y, bD.z), N.push(bD.x, bD.y, bD.z), N.push(bD.x, bD.y, bD.z);
    },
    addColor: function(M, D, t) {
      const e = this.colors, N = this.object.geometry.colors;
      e[M] !== void 0 && N.push(e[M + 0], e[M + 1], e[M + 2]), e[D] !== void 0 && N.push(e[D + 0], e[D + 1], e[D + 2]), e[t] !== void 0 && N.push(e[t + 0], e[t + 1], e[t + 2]);
    },
    addUV: function(M, D, t) {
      const e = this.uvs, N = this.object.geometry.uvs;
      N.push(e[M + 0], e[M + 1]), N.push(e[D + 0], e[D + 1]), N.push(e[t + 0], e[t + 1]);
    },
    addDefaultUV: function() {
      const M = this.object.geometry.uvs;
      M.push(0, 0), M.push(0, 0), M.push(0, 0);
    },
    addUVLine: function(M) {
      const D = this.uvs;
      this.object.geometry.uvs.push(D[M + 0], D[M + 1]);
    },
    addFace: function(M, D, t, e, N, n, A, z, I) {
      const T = this.vertices.length;
      let u = this.parseVertexIndex(M, T), g = this.parseVertexIndex(D, T), s = this.parseVertexIndex(t, T);
      if (this.addVertex(u, g, s), this.addColor(u, g, s), A !== void 0 && A !== "") {
        const a = this.normals.length;
        u = this.parseNormalIndex(A, a), g = this.parseNormalIndex(z, a), s = this.parseNormalIndex(I, a), this.addNormal(u, g, s);
      } else
        this.addFaceNormal(u, g, s);
      if (e !== void 0 && e !== "") {
        const a = this.uvs.length;
        u = this.parseUVIndex(e, a), g = this.parseUVIndex(N, a), s = this.parseUVIndex(n, a), this.addUV(u, g, s), this.object.geometry.hasUVIndices = !0;
      } else
        this.addDefaultUV();
    },
    addPointGeometry: function(M) {
      this.object.geometry.type = "Points";
      const D = this.vertices.length;
      for (let t = 0, e = M.length; t < e; t++) {
        const N = this.parseVertexIndex(M[t], D);
        this.addVertexPoint(N), this.addColor(N);
      }
    },
    addLineGeometry: function(M, D) {
      this.object.geometry.type = "Line";
      const t = this.vertices.length, e = this.uvs.length;
      for (let N = 0, n = M.length; N < n; N++)
        this.addVertexLine(this.parseVertexIndex(M[N], t));
      for (let N = 0, n = D.length; N < n; N++)
        this.addUVLine(this.parseUVIndex(D[N], e));
    }
  };
  return i.startObject("", !1), i;
}
class uy extends Rn {
  constructor(M) {
    super(M), this.materials = null;
  }
  load(M, D, t, e) {
    const N = this, n = new iy(this.manager);
    n.setPath(this.path), n.setRequestHeader(this.requestHeader), n.setWithCredentials(this.withCredentials), n.load(M, function(A) {
      try {
        D(N.parse(A));
      } catch (z) {
        e ? e(z) : console.error(z), N.manager.itemError(M);
      }
    }, t, e);
  }
  setMaterials(M) {
    return this.materials = M, this;
  }
  parse(M) {
    const D = new Ty();
    M.indexOf(`\r
`) !== -1 && (M = M.replace(/\r\n/g, `
`)), M.indexOf(`\\
`) !== -1 && (M = M.replace(/\\\n/g, ""));
    const t = M.split(`
`);
    let e = [];
    for (let A = 0, z = t.length; A < z; A++) {
      const I = t[A].trimStart();
      if (I.length === 0)
        continue;
      const T = I.charAt(0);
      if (T !== "#")
        if (T === "v") {
          const u = I.split(AT);
          switch (u[0]) {
            case "v":
              D.vertices.push(
                parseFloat(u[1]),
                parseFloat(u[2]),
                parseFloat(u[3])
              ), u.length >= 7 ? (fi.setRGB(
                parseFloat(u[4]),
                parseFloat(u[5]),
                parseFloat(u[6])
              ).convertSRGBToLinear(), D.colors.push(fi.r, fi.g, fi.b)) : D.colors.push(void 0, void 0, void 0);
              break;
            case "vn":
              D.normals.push(
                parseFloat(u[1]),
                parseFloat(u[2]),
                parseFloat(u[3])
              );
              break;
            case "vt":
              D.uvs.push(
                parseFloat(u[1]),
                parseFloat(u[2])
              );
              break;
          }
        } else if (T === "f") {
          const g = I.slice(1).trim().split(AT), s = [];
          for (let o = 0, c = g.length; o < c; o++) {
            const r = g[o];
            if (r.length > 0) {
              const w = r.split("/");
              s.push(w);
            }
          }
          const a = s[0];
          for (let o = 1, c = s.length - 1; o < c; o++) {
            const r = s[o], w = s[o + 1];
            D.addFace(
              a[0],
              r[0],
              w[0],
              a[1],
              r[1],
              w[1],
              a[2],
              r[2],
              w[2]
            );
          }
        } else if (T === "l") {
          const u = I.substring(1).trim().split(" ");
          let g = [];
          const s = [];
          if (I.indexOf("/") === -1)
            g = u;
          else
            for (let a = 0, o = u.length; a < o; a++) {
              const c = u[a].split("/");
              c[0] !== "" && g.push(c[0]), c[1] !== "" && s.push(c[1]);
            }
          D.addLineGeometry(g, s);
        } else if (T === "p") {
          const g = I.slice(1).trim().split(" ");
          D.addPointGeometry(g);
        } else if ((e = Ay.exec(I)) !== null) {
          const u = (" " + e[0].slice(1).trim()).slice(1);
          D.startObject(u);
        } else if (zy.test(I))
          D.object.startMaterial(I.substring(7).trim(), D.materialLibraries);
        else if (ny.test(I))
          D.materialLibraries.push(I.substring(7).trim());
        else if (Iy.test(I))
          console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
        else if (T === "s") {
          if (e = I.split(" "), e.length > 1) {
            const g = e[1].trim().toLowerCase();
            D.object.smooth = g !== "0" && g !== "off";
          } else
            D.object.smooth = !0;
          const u = D.object.currentMaterial();
          u && (u.smooth = D.object.smooth);
        } else {
          if (I === "\0")
            continue;
          console.warn('THREE.OBJLoader: Unexpected line: "' + I + '"');
        }
    }
    D.finalize();
    const N = new Jo();
    if (N.materialLibraries = [].concat(D.materialLibraries), !(D.objects.length === 1 && D.objects[0].geometry.vertices.length === 0) === !0)
      for (let A = 0, z = D.objects.length; A < z; A++) {
        const I = D.objects[A], T = I.geometry, u = I.materials, g = T.type === "Line", s = T.type === "Points";
        let a = !1;
        if (T.vertices.length === 0)
          continue;
        const o = new se();
        o.setAttribute("position", new xt(T.vertices, 3)), T.normals.length > 0 && o.setAttribute("normal", new xt(T.normals, 3)), T.colors.length > 0 && (a = !0, o.setAttribute("color", new xt(T.colors, 3))), T.hasUVIndices === !0 && o.setAttribute("uv", new xt(T.uvs, 2));
        const c = [];
        for (let w = 0, y = u.length; w < y; w++) {
          const j = u[w], l = j.name + "_" + j.smooth + "_" + a;
          let d = D.materials[l];
          if (this.materials !== null) {
            if (d = this.materials.create(j.name), g && d && !(d instanceof Ki)) {
              const h = new Ki();
              tN.prototype.copy.call(h, d), h.color.copy(d.color), d = h;
            } else if (s && d && !(d instanceof LN)) {
              const h = new LN({ size: 10, sizeAttenuation: !1 });
              tN.prototype.copy.call(h, d), h.color.copy(d.color), h.map = d.map, d = h;
            }
          }
          d === void 0 && (g ? d = new Ki() : s ? d = new LN({ size: 1, sizeAttenuation: !1 }) : d = new Dy(), d.name = j.name, d.flatShading = !j.smooth, d.vertexColors = a, D.materials[l] = d), c.push(d);
        }
        let r;
        if (c.length > 1) {
          for (let w = 0, y = u.length; w < y; w++) {
            const j = u[w];
            o.addGroup(j.groupStart, j.groupCount, w);
          }
          g ? r = new tT(o, c) : s ? r = new Tn(o, c) : r = new qI(o, c);
        } else
          g ? r = new tT(o, c[0]) : s ? r = new Tn(o, c[0]) : r = new qI(o, c[0]);
        r.name = I.name, N.add(r);
      }
    else if (D.vertices.length > 0) {
      const A = new LN({ size: 1, sizeAttenuation: !1 }), z = new se();
      z.setAttribute("position", new xt(D.vertices, 3)), D.colors.length > 0 && D.colors[0] !== void 0 && (z.setAttribute("color", new xt(D.colors, 3)), A.vertexColors = !0);
      const I = new Tn(z, A);
      N.add(I);
    }
    return N;
  }
}
const gy = new uy(), sy = (i) => {
  const M = new iN().setFromObject(i), D = new Y();
  M.getSize(D);
  const t = new Y(), e = i.geometry.attributes.position, N = i.geometry.attributes.uv;
  for (let n = 0; n < e.count; n += 1)
    t.fromBufferAttribute(e, n), N.setXY(
      n,
      (t.x - M.min.x) / D.x,
      (t.y - M.min.y) / D.y
    );
}, ry = (i, M) => new Promise((D) => {
  gy.load(i, (t) => {
    const e = new pD();
    t.traverse((N) => {
      const n = N;
      if (!n.material || !n.geometry)
        return;
      n.material = new XT({ color: new KM(M).convertSRGBToLinear() }), n.geometry.center();
      const A = new Nt(n.geometry, n.material), z = 8.6;
      A.rotateX(Math.PI / 2), A.scale.set(-z, z, z), e.add(A);
    }), D(e);
  });
class ay extends CN {
  home;
  lookingAtSomething;
  color;
  constructor(M, D) {
    super(), this.home = M, this.lookAt(M), this.lookingAtSomething = !1, this.color = D, this.position.setY(5);
  }
  async init() {
    return this.add(await ry(cy, this.color)), this;
  }
  animation(M, D) {
    const t = new pD();
    t.lookAt(this.lookingAtSomething ? D : this.home), this.quaternion.slerp(t.quaternion, 10 * M);
  }
}
class nt {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  // Virtual base class method to overwrite and implement in subclasses
  //	- t [0 .. 1]
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  // Get point at relative position in curve according to arc length
  // - u [0 .. 1]
  getPointAt(M, D) {
    const t = this.getUtoTmapping(M);
    return this.getPoint(t, D);
  }
  // Get sequence of points using getPoint( t )
  getPoints(M = 5) {
    const D = [];
    for (let t = 0; t <= M; t++)
      D.push(this.getPoint(t / M));
    return D;
  }
  // Get sequence of points using getPointAt( u )
  getSpacedPoints(M = 5) {
    const D = [];
    for (let t = 0; t <= M; t++)
      D.push(this.getPointAt(t / M));
    return D;
  }
  // Get total curve arc length
  getLength() {
    const M = this.getLengths();
    return M[M.length - 1];
  }
  // Get list of cumulative segment lengths
  getLengths(M = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === M + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const D = [];
    let t, e = this.getPoint(0), N = 0;
    D.push(0);
    for (let n = 1; n <= M; n++)
      t = this.getPoint(n / M), N += t.distanceTo(e), D.push(N), e = t;
    return this.cacheArcLengths = D, D;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(M, D) {
    const t = this.getLengths();
    let e = 0;
    const N = t.length;
    let n;
    D ? n = D : n = M * t[N - 1];
    let A = 0, z = N - 1, I;
    for (; A <= z; )
      if (e = Math.floor(A + (z - A) / 2), I = t[e] - n, I < 0)
        A = e + 1;
      else if (I > 0)
        z = e - 1;
      else {
        z = e;
        break;
      }
    if (e = z, t[e] === n)
      return e / (N - 1);
    const T = t[e], g = t[e + 1] - T, s = (n - T) / g;
    return (e + s) / (N - 1);
  }
  // Returns a unit vector tangent at t
  // In case any sub curve does not implement its tangent derivation,
  // 2 points a small delta apart will be used to find its gradient
  // which seems to give a reasonable approximation
  getTangent(M, D) {
    let e = M - 1e-4, N = M + 1e-4;
    e < 0 && (e = 0), N > 1 && (N = 1);
    const n = this.getPoint(e), A = this.getPoint(N), z = D || (n.isVector2 ? new rM() : new Y());
    return z.copy(A).sub(n).normalize(), z;
  }
  getTangentAt(M, D) {
    const t = this.getUtoTmapping(M);
    return this.getTangent(t, D);
  }
  computeFrenetFrames(M, D) {
    const t = new Y(), e = [], N = [], n = [], A = new Y(), z = new ID();
    for (let s = 0; s <= M; s++) {
      const a = s / M;
      e[s] = this.getTangentAt(a, new Y());
    }
    N[0] = new Y(), n[0] = new Y();
    let I = Number.MAX_VALUE;
    const T = Math.abs(e[0].x), u = Math.abs(e[0].y), g = Math.abs(e[0].z);
    T <= I && (I = T, t.set(1, 0, 0)), u <= I && (I = u, t.set(0, 1, 0)), g <= I && t.set(0, 0, 1), A.crossVectors(e[0], t).normalize(), N[0].crossVectors(e[0], A), n[0].crossVectors(e[0], N[0]);
    for (let s = 1; s <= M; s++) {
      if (N[s] = N[s - 1].clone(), n[s] = n[s - 1].clone(), A.crossVectors(e[s - 1], e[s]), A.length() > Number.EPSILON) {
        A.normalize();
        const a = Math.acos(aD(e[s - 1].dot(e[s]), -1, 1));
        N[s].applyMatrix4(z.makeRotationAxis(A, a));
      }
      n[s].crossVectors(e[s], N[s]);
    }
    if (D === !0) {
      let s = Math.acos(aD(N[0].dot(N[M]), -1, 1));
      s /= M, e[0].dot(A.crossVectors(N[0], N[M])) > 0 && (s = -s);
      for (let a = 1; a <= M; a++)
        N[a].applyMatrix4(z.makeRotationAxis(e[a], s * a)), n[a].crossVectors(e[a], N[a]);
    }
    return {
      tangents: e,
      normals: N,
      binormals: n
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.arcLengthDivisions = M.arcLengthDivisions, this;
  }
  toJSON() {
    const M = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return M.arcLengthDivisions = this.arcLengthDivisions, M.type = this.type, M;
  }
  fromJSON(M) {
    return this.arcLengthDivisions = M.arcLengthDivisions, this;
  }
}
class Fn extends nt {
  constructor(M = 0, D = 0, t = 1, e = 1, N = 0, n = Math.PI * 2, A = !1, z = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = M, this.aY = D, this.xRadius = t, this.yRadius = e, this.aStartAngle = N, this.aEndAngle = n, this.aClockwise = A, this.aRotation = z;
  }
  getPoint(M, D) {
    const t = D || new rM(), e = Math.PI * 2;
    let N = this.aEndAngle - this.aStartAngle;
    const n = Math.abs(N) < Number.EPSILON;
    for (; N < 0; )
      N += e;
    for (; N > e; )
      N -= e;
    N < Number.EPSILON && (n ? N = 0 : N = e), this.aClockwise === !0 && !n && (N === e ? N = -e : N = N - e);
    const A = this.aStartAngle + M * N;
    let z = this.aX + this.xRadius * Math.cos(A), I = this.aY + this.yRadius * Math.sin(A);
    if (this.aRotation !== 0) {
      const T = Math.cos(this.aRotation), u = Math.sin(this.aRotation), g = z - this.aX, s = I - this.aY;
      z = g * T - s * u + this.aX, I = g * u + s * T + this.aY;
    }
    return t.set(z, I);
  }
  copy(M) {
    return super.copy(M), this.aX = M.aX, this.aY = M.aY, this.xRadius = M.xRadius, this.yRadius = M.yRadius, this.aStartAngle = M.aStartAngle, this.aEndAngle = M.aEndAngle, this.aClockwise = M.aClockwise, this.aRotation = M.aRotation, this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.aX = this.aX, M.aY = this.aY, M.xRadius = this.xRadius, M.yRadius = this.yRadius, M.aStartAngle = this.aStartAngle, M.aEndAngle = this.aEndAngle, M.aClockwise = this.aClockwise, M.aRotation = this.aRotation, M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.aX = M.aX, this.aY = M.aY, this.xRadius = M.xRadius, this.yRadius = M.yRadius, this.aStartAngle = M.aStartAngle, this.aEndAngle = M.aEndAngle, this.aClockwise = M.aClockwise, this.aRotation = M.aRotation, this;
  }
}
class oy extends Fn {
  constructor(M, D, t, e, N, n) {
    super(M, D, t, t, e, N, n), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Bn() {
  let i = 0, M = 0, D = 0, t = 0;
  function e(N, n, A, z) {
    i = N, M = A, D = -3 * N + 3 * n - 2 * A - z, t = 2 * N - 2 * n + A + z;
  }
  return {
    initCatmullRom: function(N, n, A, z, I) {
      e(n, A, I * (A - N), I * (z - n));
    },
    initNonuniformCatmullRom: function(N, n, A, z, I, T, u) {
      let g = (n - N) / I - (A - N) / (I + T) + (A - n) / T, s = (A - n) / T - (z - n) / (T + u) + (z - A) / u;
      g *= T, s *= T, e(n, A, g, s);
    },
    calc: function(N) {
      const n = N * N, A = n * N;
      return i + M * N + D * n + t * A;
    }
  };
}
const mi = /* @__PURE__ */ new Y(), gn = /* @__PURE__ */ new Bn(), sn = /* @__PURE__ */ new Bn(), rn = /* @__PURE__ */ new Bn();
class yy extends nt {
  constructor(M = [], D = !1, t = "centripetal", e = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = M, this.closed = D, this.curveType = t, this.tension = e;
  }
  getPoint(M, D = new Y()) {
    const t = D, e = this.points, N = e.length, n = (N - (this.closed ? 0 : 1)) * M;
    let A = Math.floor(n), z = n - A;
    this.closed ? A += A > 0 ? 0 : (Math.floor(Math.abs(A) / N) + 1) * N : z === 0 && A === N - 1 && (A = N - 2, z = 1);
    let I, T;
    this.closed || A > 0 ? I = e[(A - 1) % N] : (mi.subVectors(e[0], e[1]).add(e[0]), I = mi);
    const u = e[A % N], g = e[(A + 1) % N];
    if (this.closed || A + 2 < N ? T = e[(A + 2) % N] : (mi.subVectors(e[N - 1], e[N - 2]).add(e[N - 1]), T = mi), this.curveType === "centripetal" || this.curveType === "chordal") {
      const s = this.curveType === "chordal" ? 0.5 : 0.25;
      let a = Math.pow(I.distanceToSquared(u), s), o = Math.pow(u.distanceToSquared(g), s), c = Math.pow(g.distanceToSquared(T), s);
      o < 1e-4 && (o = 1), a < 1e-4 && (a = o), c < 1e-4 && (c = o), gn.initNonuniformCatmullRom(I.x, u.x, g.x, T.x, a, o, c), sn.initNonuniformCatmullRom(I.y, u.y, g.y, T.y, a, o, c), rn.initNonuniformCatmullRom(I.z, u.z, g.z, T.z, a, o, c);
    } else
      this.curveType === "catmullrom" && (gn.initCatmullRom(I.x, u.x, g.x, T.x, this.tension), sn.initCatmullRom(I.y, u.y, g.y, T.y, this.tension), rn.initCatmullRom(I.z, u.z, g.z, T.z, this.tension));
    return t.set(
      gn.calc(z),
      sn.calc(z),
      rn.calc(z)
    ), t;
  }
  copy(M) {
    super.copy(M), this.points = [];
    for (let D = 0, t = M.points.length; D < t; D++) {
      const e = M.points[D];
      this.points.push(e.clone());
    }
    return this.closed = M.closed, this.curveType = M.curveType, this.tension = M.tension, this;
  }
  toJSON() {
    const M = super.toJSON();
    M.points = [];
    for (let D = 0, t = this.points.length; D < t; D++) {
      const e = this.points[D];
      M.points.push(e.toArray());
    }
    return M.closed = this.closed, M.curveType = this.curveType, M.tension = this.tension, M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.points = [];
    for (let D = 0, t = M.points.length; D < t; D++) {
      const e = M.points[D];
      this.points.push(new Y().fromArray(e));
    }
    return this.closed = M.closed, this.curveType = M.curveType, this.tension = M.tension, this;
  }
}
function TT(i, M, D, t, e) {
  const N = (t - M) * 0.5, n = (e - D) * 0.5, A = i * i, z = i * A;
  return (2 * D - 2 * t + N + n) * z + (-3 * D + 3 * t - 2 * N - n) * A + N * i + D;
}
function jy(i, M) {
  const D = 1 - i;
  return D * D * M;
}
function Cy(i, M) {
  return 2 * (1 - i) * i * M;
}
function Ly(i, M) {
  return i * i * M;
}
function xN(i, M, D, t) {
  return jy(i, M) + Cy(i, D) + Ly(i, t);
}
function wy(i, M) {
  const D = 1 - i;
  return D * D * D * M;
}
function xy(i, M) {
  const D = 1 - i;
  return 3 * D * D * i * M;
}
function Oy(i, M) {
  return 3 * (1 - i) * i * i * M;
}
function Ey(i, M) {
  return i * i * i * M;
}
function ON(i, M, D, t, e) {
  return wy(i, M) + xy(i, D) + Oy(i, t) + Ey(i, e);
}
class cu extends nt {
  constructor(M = new rM(), D = new rM(), t = new rM(), e = new rM()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = M, this.v1 = D, this.v2 = t, this.v3 = e;
  }
  getPoint(M, D = new rM()) {
    const t = D, e = this.v0, N = this.v1, n = this.v2, A = this.v3;
    return t.set(
      ON(M, e.x, N.x, n.x, A.x),
      ON(M, e.y, N.y, n.y, A.y)
    ), t;
  }
  copy(M) {
    return super.copy(M), this.v0.copy(M.v0), this.v1.copy(M.v1), this.v2.copy(M.v2), this.v3.copy(M.v3), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v0 = this.v0.toArray(), M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M.v3 = this.v3.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v0.fromArray(M.v0), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this.v3.fromArray(M.v3), this;
  }
}
class ly extends nt {
  constructor(M = new Y(), D = new Y(), t = new Y(), e = new Y()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = M, this.v1 = D, this.v2 = t, this.v3 = e;
  }
  getPoint(M, D = new Y()) {
    const t = D, e = this.v0, N = this.v1, n = this.v2, A = this.v3;
    return t.set(
      ON(M, e.x, N.x, n.x, A.x),
      ON(M, e.y, N.y, n.y, A.y),
      ON(M, e.z, N.z, n.z, A.z)
    ), t;
  }
  copy(M) {
    return super.copy(M), this.v0.copy(M.v0), this.v1.copy(M.v1), this.v2.copy(M.v2), this.v3.copy(M.v3), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v0 = this.v0.toArray(), M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M.v3 = this.v3.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v0.fromArray(M.v0), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this.v3.fromArray(M.v3), this;
  }
}
class au extends nt {
  constructor(M = new rM(), D = new rM()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = M, this.v2 = D;
  }
  getPoint(M, D = new rM()) {
    const t = D;
    return M === 1 ? t.copy(this.v2) : (t.copy(this.v2).sub(this.v1), t.multiplyScalar(M).add(this.v1)), t;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(M, D) {
    return this.getPoint(M, D);
  }
  getTangent(M, D = new rM()) {
    return D.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(M, D) {
    return this.getTangent(M, D);
  }
  copy(M) {
    return super.copy(M), this.v1.copy(M.v1), this.v2.copy(M.v2), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this;
  }
}
class hy extends nt {
  constructor(M = new Y(), D = new Y()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = M, this.v2 = D;
  }
  getPoint(M, D = new Y()) {
    const t = D;
    return M === 1 ? t.copy(this.v2) : (t.copy(this.v2).sub(this.v1), t.multiplyScalar(M).add(this.v1)), t;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(M, D) {
    return this.getPoint(M, D);
  }
  getTangent(M, D = new Y()) {
    return D.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(M, D) {
    return this.getTangent(M, D);
  }
  copy(M) {
    return super.copy(M), this.v1.copy(M.v1), this.v2.copy(M.v2), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this;
  }
}
class ou extends nt {
  constructor(M = new rM(), D = new rM(), t = new rM()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = M, this.v1 = D, this.v2 = t;
  }
  getPoint(M, D = new rM()) {
    const t = D, e = this.v0, N = this.v1, n = this.v2;
    return t.set(
      xN(M, e.x, N.x, n.x),
      xN(M, e.y, N.y, n.y)
    ), t;
  }
  copy(M) {
    return super.copy(M), this.v0.copy(M.v0), this.v1.copy(M.v1), this.v2.copy(M.v2), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v0 = this.v0.toArray(), M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v0.fromArray(M.v0), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this;
  }
}
class dy extends nt {
  constructor(M = new Y(), D = new Y(), t = new Y()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = M, this.v1 = D, this.v2 = t;
  }
  getPoint(M, D = new Y()) {
    const t = D, e = this.v0, N = this.v1, n = this.v2;
    return t.set(
      xN(M, e.x, N.x, n.x),
      xN(M, e.y, N.y, n.y),
      xN(M, e.z, N.z, n.z)
    ), t;
  }
  copy(M) {
    return super.copy(M), this.v0.copy(M.v0), this.v1.copy(M.v1), this.v2.copy(M.v2), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v0 = this.v0.toArray(), M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v0.fromArray(M.v0), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this;
  }
}
class yu extends nt {
  constructor(M = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = M;
  }
  getPoint(M, D = new rM()) {
    const t = D, e = this.points, N = (e.length - 1) * M, n = Math.floor(N), A = N - n, z = e[n === 0 ? n : n - 1], I = e[n], T = e[n > e.length - 2 ? e.length - 1 : n + 1], u = e[n > e.length - 3 ? e.length - 1 : n + 2];
    return t.set(
      TT(A, z.x, I.x, T.x, u.x),
      TT(A, z.y, I.y, T.y, u.y)
    ), t;
  }
  copy(M) {
    super.copy(M), this.points = [];
    for (let D = 0, t = M.points.length; D < t; D++) {
      const e = M.points[D];
      this.points.push(e.clone());
    }
    return this;
  }
  toJSON() {
    const M = super.toJSON();
    M.points = [];
    for (let D = 0, t = this.points.length; D < t; D++) {
      const e = this.points[D];
      M.points.push(e.toArray());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.points = [];
    for (let D = 0, t = M.points.length; D < t; D++) {
      const e = M.points[D];
      this.points.push(new rM().fromArray(e));
    }
    return this;
  }
}
const uT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArcCurve: oy,
  CatmullRomCurve3: yy,
  CubicBezierCurve: cu,
  CubicBezierCurve3: ly,
  EllipseCurve: Fn,
  LineCurve: au,
  LineCurve3: hy,
  QuadraticBezierCurve: ou,
  QuadraticBezierCurve3: dy,
  SplineCurve: yu
}, Symbol.toStringTag, { value: "Module" }));
class vy extends nt {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(M) {
    this.curves.push(M);
  }
  closePath() {
    const M = this.curves[0].getPoint(0), D = this.curves[this.curves.length - 1].getPoint(1);
    if (!M.equals(D)) {
      const t = M.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new uT[t](D, M));
    }
    return this;
  }
  // To get accurate point with reference to
  // entire path distance at time t,
  // following has to be done:
  // 1. Length of each sub path have to be known
  // 2. Locate and identify type of curve
  // 3. Get t for the curve
  // 4. Return curve.getPointAt(t')
  getPoint(M, D) {
    const t = M * this.getLength(), e = this.getCurveLengths();
    let N = 0;
    for (; N < e.length; ) {
      if (e[N] >= t) {
        const n = e[N] - t, A = this.curves[N], z = A.getLength(), I = z === 0 ? 0 : 1 - n / z;
        return A.getPointAt(I, D);
      }
      N++;
    }
    return null;
  }
  // We cannot use the default THREE.Curve getPoint() with getLength() because in
  // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
  // getPoint() depends on getLength
  getLength() {
    const M = this.getCurveLengths();
    return M[M.length - 1];
  }
  // cacheLengths must be recalculated.
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  // Compute lengths and cache them
  // We cannot overwrite getLengths() because UtoT mapping uses it.
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const M = [];
    let D = 0;
    for (let t = 0, e = this.curves.length; t < e; t++)
      D += this.curves[t].getLength(), M.push(D);
    return this.cacheLengths = M, M;
  }
  getSpacedPoints(M = 40) {
    const D = [];
    for (let t = 0; t <= M; t++)
      D.push(this.getPoint(t / M));
    return this.autoClose && D.push(D[0]), D;
  }
  getPoints(M = 12) {
    const D = [];
    let t;
    for (let e = 0, N = this.curves; e < N.length; e++) {
      const n = N[e], A = n.isEllipseCurve ? M * 2 : n.isLineCurve || n.isLineCurve3 ? 1 : n.isSplineCurve ? M * n.points.length : M, z = n.getPoints(A);
      for (let I = 0; I < z.length; I++) {
        const T = z[I];
        t && t.equals(T) || (D.push(T), t = T);
      }
    }
    return this.autoClose && D.length > 1 && !D[D.length - 1].equals(D[0]) && D.push(D[0]), D;
  }
  copy(M) {
    super.copy(M), this.curves = [];
    for (let D = 0, t = M.curves.length; D < t; D++) {
      const e = M.curves[D];
      this.curves.push(e.clone());
    }
    return this.autoClose = M.autoClose, this;
  }
  toJSON() {
    const M = super.toJSON();
    M.autoClose = this.autoClose, M.curves = [];
    for (let D = 0, t = this.curves.length; D < t; D++) {
      const e = this.curves[D];
      M.curves.push(e.toJSON());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.autoClose = M.autoClose, this.curves = [];
    for (let D = 0, t = M.curves.length; D < t; D++) {
      const e = M.curves[D];
      this.curves.push(new uT[e.type]().fromJSON(e));
    }
    return this;
  }
}
class gT extends vy {
  constructor(M) {
    super(), this.type = "Path", this.currentPoint = new rM(), M && this.setFromPoints(M);
  }
  setFromPoints(M) {
    this.moveTo(M[0].x, M[0].y);
    for (let D = 1, t = M.length; D < t; D++)
      this.lineTo(M[D].x, M[D].y);
    return this;
  }
  moveTo(M, D) {
    return this.currentPoint.set(M, D), this;
  }
  lineTo(M, D) {
    const t = new au(this.currentPoint.clone(), new rM(M, D));
    return this.curves.push(t), this.currentPoint.set(M, D), this;
  }
  quadraticCurveTo(M, D, t, e) {
    const N = new ou(
      this.currentPoint.clone(),
      new rM(M, D),
      new rM(t, e)
    );
    return this.curves.push(N), this.currentPoint.set(t, e), this;
  }
  bezierCurveTo(M, D, t, e, N, n) {
    const A = new cu(
      this.currentPoint.clone(),
      new rM(M, D),
      new rM(t, e),
      new rM(N, n)
    );
    return this.curves.push(A), this.currentPoint.set(N, n), this;
  }
  splineThru(M) {
    const D = [this.currentPoint.clone()].concat(M), t = new yu(D);
    return this.curves.push(t), this.currentPoint.copy(M[M.length - 1]), this;
  }
  arc(M, D, t, e, N, n) {
    const A = this.currentPoint.x, z = this.currentPoint.y;
    return this.absarc(
      M + A,
      D + z,
      t,
      e,
      N,
      n
    ), this;
  }
  absarc(M, D, t, e, N, n) {
    return this.absellipse(M, D, t, t, e, N, n), this;
  }
  ellipse(M, D, t, e, N, n, A, z) {
    const I = this.currentPoint.x, T = this.currentPoint.y;
    return this.absellipse(M + I, D + T, t, e, N, n, A, z), this;
  }
  absellipse(M, D, t, e, N, n, A, z) {
    const I = new Fn(M, D, t, e, N, n, A, z);
    if (this.curves.length > 0) {
      const u = I.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(I);
    const T = I.getPoint(1);
    return this.currentPoint.copy(T), this;
  }
  copy(M) {
    return super.copy(M), this.currentPoint.copy(M.currentPoint), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.currentPoint = this.currentPoint.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.currentPoint.fromArray(M.currentPoint), this;
  }
}
class ju extends gT {
  constructor(M) {
    super(M), this.uuid = eN(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(M) {
    const D = [];
    for (let t = 0, e = this.holes.length; t < e; t++)
      D[t] = this.holes[t].getPoints(M);
    return D;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints(M) {
    return {
      shape: this.getPoints(M),
      holes: this.getPointsHoles(M)
    };
  }
  copy(M) {
    super.copy(M), this.holes = [];
    for (let D = 0, t = M.holes.length; D < t; D++) {
      const e = M.holes[D];
      this.holes.push(e.clone());
    }
    return this;
  }
  toJSON() {
    const M = super.toJSON();
    M.uuid = this.uuid, M.holes = [];
    for (let D = 0, t = this.holes.length; D < t; D++) {
      const e = this.holes[D];
      M.holes.push(e.toJSON());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.uuid = M.uuid, this.holes = [];
    for (let D = 0, t = M.holes.length; D < t; D++) {
      const e = M.holes[D];
      this.holes.push(new gT().fromJSON(e));
    }
    return this;
  }
}
const py = {
  triangulate: function(i, M, D = 2) {
    const t = M && M.length, e = t ? M[0] * D : i.length;
    let N = Cu(i, 0, e, D, !0);
    const n = [];
    if (!N || N.next === N.prev)
      return n;
    let A, z, I, T, u, g, s;
    if (t && (N = Qy(i, M, N, D)), i.length > 80 * D) {
      A = I = i[0], z = T = i[1];
      for (let a = D; a < e; a += D)
        u = i[a], g = i[a + 1], u < A && (A = u), g < z && (z = g), u > I && (I = u), g > T && (T = g);
      s = Math.max(I - A, T - z), s = s !== 0 ? 32767 / s : 0;
    }
    return vN(N, n, D, A, z, s, 0), n;
  }
};
function Cu(i, M, D, t, e) {
  let N, n;
  if (e === Vy(i, M, D, t) > 0)
    for (N = M; N < D; N += t)
      n = sT(N, i[N], i[N + 1], n);
  else
    for (N = D - t; N >= M; N -= t)
      n = sT(N, i[N], i[N + 1], n);
  return n && iA(n, n.next) && (YN(n), n = n.next), n;
}
function re(i, M) {
  if (!i)
    return i;
  M || (M = i);
  let D = i, t;
  do
    if (t = !1, !D.steiner && (iA(D, D.next) || HM(D.prev, D, D.next) === 0)) {
      if (YN(D), D = M = D.prev, D === D.next)
        break;
      t = !0;
    } else
      D = D.next;
  while (t || D !== M);
  return M;
}
function vN(i, M, D, t, e, N, n) {
  if (!i)
    return;
  !n && N && by(i, t, e, N);
  let A = i, z, I;
  for (; i.prev !== i.next; ) {
    if (z = i.prev, I = i.next, N ? Uy(i, t, e, N) : Yy(i)) {
      M.push(z.i / D | 0), M.push(i.i / D | 0), M.push(I.i / D | 0), YN(i), i = I.next, A = I.next;
      continue;
    }
    if (i = I, i === A) {
      n ? n === 1 ? (i = fy(re(i), M, D), vN(i, M, D, t, e, N, 2)) : n === 2 && my(i, M, D, t, e, N) : vN(re(i), M, D, t, e, N, 1);
      break;
    }
  }
}
function Yy(i) {
  const M = i.prev, D = i, t = i.next;
  if (HM(M, D, t) >= 0)
    return !1;
  const e = M.x, N = D.x, n = t.x, A = M.y, z = D.y, I = t.y, T = e < N ? e < n ? e : n : N < n ? N : n, u = A < z ? A < I ? A : I : z < I ? z : I, g = e > N ? e > n ? e : n : N > n ? N : n, s = A > z ? A > I ? A : I : z > I ? z : I;
  let a = t.next;
  for (; a !== M; ) {
    if (a.x >= T && a.x <= g && a.y >= u && a.y <= s && Ge(e, A, N, z, n, I, a.x, a.y) && HM(a.prev, a, a.next) >= 0)
      return !1;
    a = a.next;
  }
  return !0;
}
function Uy(i, M, D, t) {
  const e = i.prev, N = i, n = i.next;
  if (HM(e, N, n) >= 0)
    return !1;
  const A = e.x, z = N.x, I = n.x, T = e.y, u = N.y, g = n.y, s = A < z ? A < I ? A : I : z < I ? z : I, a = T < u ? T < g ? T : g : u < g ? u : g, o = A > z ? A > I ? A : I : z > I ? z : I, c = T > u ? T > g ? T : g : u > g ? u : g, r = pn(s, a, M, D, t), w = pn(o, c, M, D, t);
  let y = i.prevZ, j = i.nextZ;
  for (; y && y.z >= r && j && j.z <= w; ) {
    if (y.x >= s && y.x <= o && y.y >= a && y.y <= c && y !== e && y !== n && Ge(A, T, z, u, I, g, y.x, y.y) && HM(y.prev, y, y.next) >= 0 || (y = y.prevZ, j.x >= s && j.x <= o && j.y >= a && j.y <= c && j !== e && j !== n && Ge(A, T, z, u, I, g, j.x, j.y) && HM(j.prev, j, j.next) >= 0))
      return !1;
    j = j.nextZ;
  }
  for (; y && y.z >= r; ) {
    if (y.x >= s && y.x <= o && y.y >= a && y.y <= c && y !== e && y !== n && Ge(A, T, z, u, I, g, y.x, y.y) && HM(y.prev, y, y.next) >= 0)
      return !1;
    y = y.prevZ;
  }
  for (; j && j.z <= w; ) {
    if (j.x >= s && j.x <= o && j.y >= a && j.y <= c && j !== e && j !== n && Ge(A, T, z, u, I, g, j.x, j.y) && HM(j.prev, j, j.next) >= 0)
      return !1;
    j = j.nextZ;
  }
  return !0;
}
function fy(i, M, D) {
  let t = i;
  do {
    const e = t.prev, N = t.next.next;
    !iA(e, N) && Lu(e, t, t.next, N) && pN(e, N) && pN(N, e) && (M.push(e.i / D | 0), M.push(t.i / D | 0), M.push(N.i / D | 0), YN(t), YN(t.next), t = i = N), t = t.next;
  } while (t !== i);
  return re(t);
}
function my(i, M, D, t, e, N) {
  let n = i;
  do {
    let A = n.next.next;
    for (; A !== n.prev; ) {
      if (n.i !== A.i && Ry(n, A)) {
        let z = wu(n, A);
        n = re(n, n.next), z = re(z, z.next), vN(n, M, D, t, e, N, 0), vN(z, M, D, t, e, N, 0);
        return;
      }
      A = A.next;
    }
    n = n.next;
  } while (n !== i);
}
function Qy(i, M, D, t) {
  const e = [];
  let N, n, A, z, I;
  for (N = 0, n = M.length; N < n; N++)
    A = M[N] * t, z = N < n - 1 ? M[N + 1] * t : i.length, I = Cu(i, A, z, t, !1), I === I.next && (I.steiner = !0), e.push(Py(I));
  for (e.sort(ky), N = 0; N < e.length; N++)
    D = Sy(e[N], D);
  return D;
}
function ky(i, M) {
  return i.x - M.x;
}
function Sy(i, M) {
  const D = Zy(i, M);
  if (!D)
    return M;
  const t = wu(D, i);
  return re(t, t.next), re(D, D.next);
}
function Zy(i, M) {
  let D = M, t = -1 / 0, e;
  const N = i.x, n = i.y;
  do {
    if (n <= D.y && n >= D.next.y && D.next.y !== D.y) {
      const g = D.x + (n - D.y) * (D.next.x - D.x) / (D.next.y - D.y);
      if (g <= N && g > t && (t = g, e = D.x < D.next.x ? D : D.next, g === N))
        return e;
    }
    D = D.next;
  } while (D !== M);
  if (!e)
    return null;
  const A = e, z = e.x, I = e.y;
  let T = 1 / 0, u;
  D = e;
  do
    N >= D.x && D.x >= z && N !== D.x && Ge(n < I ? N : t, n, z, I, n < I ? t : N, n, D.x, D.y) && (u = Math.abs(n - D.y) / (N - D.x), pN(D, i) && (u < T || u === T && (D.x > e.x || D.x === e.x && _y(e, D))) && (e = D, T = u)), D = D.next;
  while (D !== A);
  return e;
}
function _y(i, M) {
  return HM(i.prev, i, M.prev) < 0 && HM(M.next, i, i.next) < 0;
}
function by(i, M, D, t) {
  let e = i;
  do
    e.z === 0 && (e.z = pn(e.x, e.y, M, D, t)), e.prevZ = e.prev, e.nextZ = e.next, e = e.next;
  while (e !== i);
  e.prevZ.nextZ = null, e.prevZ = null, Ky(e);
}
function Ky(i) {
  let M, D, t, e, N, n, A, z, I = 1;
  do {
    for (D = i, i = null, N = null, n = 0; D; ) {
      for (n++, t = D, A = 0, M = 0; M < I && (A++, t = t.nextZ, !!t); M++)
        ;
      for (z = I; A > 0 || z > 0 && t; )
        A !== 0 && (z === 0 || !t || D.z <= t.z) ? (e = D, D = D.nextZ, A--) : (e = t, t = t.nextZ, z--), N ? N.nextZ = e : i = e, e.prevZ = N, N = e;
      D = t;
    }
    N.nextZ = null, I *= 2;
  } while (n > 1);
  return i;
}
function pn(i, M, D, t, e) {
  return i = (i - D) * e | 0, M = (M - t) * e | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, M = (M | M << 8) & 16711935, M = (M | M << 4) & 252645135, M = (M | M << 2) & 858993459, M = (M | M << 1) & 1431655765, i | M << 1;
}
function Py(i) {
  let M = i, D = i;
  do
    (M.x < D.x || M.x === D.x && M.y < D.y) && (D = M), M = M.next;
  while (M !== i);
  return D;
}
function Ge(i, M, D, t, e, N, n, A) {
  return (e - n) * (M - A) >= (i - n) * (N - A) && (i - n) * (t - A) >= (D - n) * (M - A) && (D - n) * (N - A) >= (e - n) * (t - A);
}
function Ry(i, M) {
  return i.next.i !== M.i && i.prev.i !== M.i && !Fy(i, M) && // dones't intersect other edges
  (pN(i, M) && pN(M, i) && By(i, M) && // locally visible
  (HM(i.prev, i, M.prev) || HM(i, M.prev, M)) || // does not create opposite-facing sectors
  iA(i, M) && HM(i.prev, i, i.next) > 0 && HM(M.prev, M, M.next) > 0);
}
function HM(i, M, D) {
  return (M.y - i.y) * (D.x - M.x) - (M.x - i.x) * (D.y - M.y);
}
function iA(i, M) {
  return i.x === M.x && i.y === M.y;
}
function Lu(i, M, D, t) {
  const e = ki(HM(i, M, D)), N = ki(HM(i, M, t)), n = ki(HM(D, t, i)), A = ki(HM(D, t, M));
  return !!(e !== N && n !== A || e === 0 && Qi(i, D, M) || N === 0 && Qi(i, t, M) || n === 0 && Qi(D, i, t) || A === 0 && Qi(D, M, t));
}
function Qi(i, M, D) {
  return M.x <= Math.max(i.x, D.x) && M.x >= Math.min(i.x, D.x) && M.y <= Math.max(i.y, D.y) && M.y >= Math.min(i.y, D.y);
}
function ki(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Fy(i, M) {
  let D = i;
  do {
    if (D.i !== i.i && D.next.i !== i.i && D.i !== M.i && D.next.i !== M.i && Lu(D, D.next, i, M))
      return !0;
    D = D.next;
  } while (D !== i);
  return !1;
}
function pN(i, M) {
  return HM(i.prev, i, i.next) < 0 ? HM(i, M, i.next) >= 0 && HM(i, i.prev, M) >= 0 : HM(i, M, i.prev) < 0 || HM(i, i.next, M) < 0;
}
function By(i, M) {
  let D = i, t = !1;
  const e = (i.x + M.x) / 2, N = (i.y + M.y) / 2;
  do
    D.y > N != D.next.y > N && D.next.y !== D.y && e < (D.next.x - D.x) * (N - D.y) / (D.next.y - D.y) + D.x && (t = !t), D = D.next;
  while (D !== i);
  return t;
}
function wu(i, M) {
  const D = new Yn(i.i, i.x, i.y), t = new Yn(M.i, M.x, M.y), e = i.next, N = M.prev;
  return i.next = M, M.prev = i, D.next = e, e.prev = D, t.next = D, D.prev = t, N.next = t, t.prev = N, t;
}
function sT(i, M, D, t) {
  const e = new Yn(i, M, D);
  return t ? (e.next = t.next, e.prev = t, t.next.prev = e, t.next = e) : (e.prev = e, e.next = e), e;
}
function YN(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function Yn(i, M, D) {
  this.i = i, this.x = M, this.y = D, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function Vy(i, M, D, t) {
  let e = 0;
  for (let N = M, n = D - t; N < D; N += t)
    e += (i[n] - i[N]) * (i[N + 1] + i[n + 1]), n = N;
  return e;
}
class EN {
  // calculate area of the contour polygon
  static area(M) {
    const D = M.length;
    let t = 0;
    for (let e = D - 1, N = 0; N < D; e = N++)
      t += M[e].x * M[N].y - M[N].x * M[e].y;
    return t * 0.5;
  }
  static isClockWise(M) {
    return EN.area(M) < 0;
  }
  static triangulateShape(M, D) {
    const t = [], e = [], N = [];
    rT(M), cT(t, M);
    let n = M.length;
    D.forEach(rT);
    for (let z = 0; z < D.length; z++)
      e.push(n), n += D[z].length, cT(t, D[z]);
    const A = py.triangulate(t, e);
    for (let z = 0; z < A.length; z += 3)
      N.push(A.slice(z, z + 3));
    return N;
  }
}
function rT(i) {
  const M = i.length;
  M > 2 && i[M - 1].equals(i[0]) && i.pop();
}
function cT(i, M) {
  for (let D = 0; D < M.length; D++)
    i.push(M[D].x), i.push(M[D].y);
}
class Vn extends AN {
  constructor(M = new ju([new rM(0, 0.5), new rM(-0.5, -0.5), new rM(0.5, -0.5)]), D = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: M,
      curveSegments: D
    };
    const t = [], e = [], N = [], n = [];
    let A = 0, z = 0;
    if (Array.isArray(M) === !1)
      I(M);
    else
      for (let T = 0; T < M.length; T++)
        I(M[T]), this.addGroup(A, z, T), A += z, z = 0;
    this.setIndex(t), this.setAttribute("position", new At(e, 3)), this.setAttribute("normal", new At(N, 3)), this.setAttribute("uv", new At(n, 2));
    function I(T) {
      const u = e.length / 3, g = T.extractPoints(D);
      let s = g.shape;
      const a = g.holes;
      EN.isClockWise(s) === !1 && (s = s.reverse());
      for (let c = 0, r = a.length; c < r; c++) {
        const w = a[c];
        EN.isClockWise(w) === !0 && (a[c] = w.reverse());
      }
      const o = EN.triangulateShape(s, a);
      for (let c = 0, r = a.length; c < r; c++) {
        const w = a[c];
        s = s.concat(w);
      }
      for (let c = 0, r = s.length; c < r; c++) {
        const w = s[c];
        e.push(w.x, w.y, 0), N.push(0, 0, 1), n.push(w.x, w.y);
      }
      for (let c = 0, r = o.length; c < r; c++) {
        const w = o[c], y = w[0] + u, j = w[1] + u, l = w[2] + u;
        t.push(y, j, l), z += 3;
      }
    }
  }
  copy(M) {
    return super.copy(M), this.parameters = Object.assign({}, M.parameters), this;
  }
  toJSON() {
    const M = super.toJSON(), D = this.parameters.shapes;
    return Gy(D, M);
  }
  static fromJSON(M, D) {
    const t = [];
    for (let e = 0, N = M.shapes.length; e < N; e++) {
      const n = D[M.shapes[e]];
      t.push(n);
    }
    return new Vn(t, M.curveSegments);
  }
}
function Gy(i, M) {
  if (M.shapes = [], Array.isArray(i))
    for (let D = 0, t = i.length; D < t; D++) {
      const e = i[D];
      M.shapes.push(e.uuid);
    }
  else
    M.shapes.push(i.uuid);
  return M;
}
function Hy(i, M, D) {
  const n = D / 2.2, A = new ju();
  return A.moveTo(0, 0 + D), A.lineTo(0, 0 + M - D), A.quadraticCurveTo(0, 0 + M, 0 + D, 0 + M), A.lineTo(i / 2 - 25 / 2 - n, 0 + M), A.quadraticCurveTo(
    i / 2 - 25 / 2,
    0 + M,
    i / 2 - 25 / 2,
    0 + M - n / 10
  ), A.quadraticCurveTo(
    i / 2 - 25 / 2,
    0 + M - n,
    i / 2 - 25 / 2 + n,
    0 + M - n
  ), A.lineTo(i / 2 + 25 / 2 - n, 0 + M - n), A.quadraticCurveTo(
    i / 2 + 25 / 2,
    0 + M - n,
    i / 2 + 25 / 2,
    0 + M - n / 10
  ), A.quadraticCurveTo(
    i / 2 + 25 / 2,
    0 + M,
    i / 2 + 25 / 2 + n,
    0 + M
  ), A.lineTo(0 + i - D, 0 + M), A.quadraticCurveTo(0 + i, 0 + M, 0 + i, 0 + M - D), A.lineTo(0 + i, 0 + D), A.quadraticCurveTo(0 + i, 0, 0 + i - D, 0), A.lineTo(0 + D, 0), A.quadraticCurveTo(0, 0, 0, 0 + D), new Vn(A);
}
const Wy = () => {
  const i = new as();
  return i.color.set(3, 3, 3), i.position.set(0, 0, 300), i;
}, qy = (i) => {
  const M = new PD(
    45,
    i
  );
  return M.position.set(0, 0, 200), M;
};
class Xy {
  screen;
  constructor(M) {
    this.screen = M;
  }
  init() {
    const M = document.createElement("video");
    M.src = this.screen, M.muted = !0, M.loop = !0, M.play();
    const D = new co(M);
    return D.colorSpace = tD, D;
  }
}
class $y {
  screen;
  constructor(M) {
    this.screen = M;
  }
  init() {
    const D = new xs().load(this.screen);
    return D.colorSpace = tD, D;
  }
}
const Jy = async (i, M, D) => {
  const t = new ay(i, M);
  await t.init();
  const e = 6, N = e * 9, n = e * 19.3, z = Hy(N, n, 8), I = D.init(), T = new XT({ map: I }), u = new Nt(z, T);
  return sy(u), u.translateZ(3.6), u.geometry.center(), t.add(u), t;
}, Mj = async (i, M, D, t, e) => {
  const N = new so({ antialias: !0, alpha: !0 });
  N.setSize(i, M);
  const n = new ro(), A = Wy();
  n.add(A);
  const z = qy(i / M), I = e.endsWith(".mp4") ? new Xy(e) : new $y(e), T = await Jy(D, t, I);
  return n.add(T), {
    renderer: N,
    update: (u, g, s) => {
      T.lookingAtSomething = !s, T.animation(u, g), N.render(n, z);
    }
  };
}, Dj = /* @__PURE__ */ xT("<style></style>"), tj = /* @__PURE__ */ xT('<div class="mockup"></div>');
function ej(i) {
  const [M, D] = cn(new Y(0, 0, i.distance)), [t, e] = cn(!0);
  let N, n, A;
  Uu(async () => {
    N = N;
    const s = new Y(i.rotation.x, i.rotation.y, i.rotation.z);
    ({
      renderer: A,
      update: n
    } = await Mj(N.clientWidth, N.clientHeight, s, i.bodyColor, i.screen)), A.setPixelRatio(window.devicePixelRatio), N.appendChild(A.domElement);
  });
  let z = 0;
  function I(s) {
    s *= 1e-3;
    const a = s - z;
    z = s, requestAnimationFrame(I), n?.(a, M(), t());
  }
  I(0);
  function T(s) {
    if (!N)
      return;
    const a = N.getBoundingClientRect();
    D(new Y(s.clientX - a.left - a.width / 2, -(s.clientY - a.top - a.height / 2), i.distance));
  }
  function u() {
    e(!1);
  }
  function g() {
    e(!0);
  }
  return [(() => {
    const s = Dj.cloneNode(!0);
    return OT(s, eg), s;
  })(), (() => {
    const s = tj.cloneNode(!0);
    s.addEventListener("mouseleave", g), s.addEventListener("mouseenter", u), s.$$mousemove = T;
    const a = N;
    return typeof a == "function" ? Ku(a, s) : N = s, Ri(() => s.style.setProperty("animation-name", i.levitate ? "levitate" : "none")), s;
  })()];
}
bu(["mousemove"]);
Dg("three-d-mockup", {
  screen: null,
  bodyColor: "white",
  distance: 500,
  rotation: {
    x: 250,
    y: 170,
    z: 500
  },
  levitate: !0
}, (i) => {
  if (!i.screen)
    throw new Error("The screen prop is required");
  return Zu(ej, {
    get screen() {
      return i.screen;
    },
    get bodyColor() {
      return i.bodyColor;
    },
    get distance() {
      return i.distance;
    },
    get rotation() {
      return i.rotation;
    },
    get levitate() {
      return i.levitate;
    }
  });
});