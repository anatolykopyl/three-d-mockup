const $D = {};
function mT(e) {
  $D.context = e;
}
const kT = (e, M) => e === M, Yz = {
  equals: kT
};
let YI = QI;
const Qt = 1, di = 2, pI = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var kD = null;
let Xt = null, BM = null, nD = null, Ct = null, jz = 0;
function ST(e, M) {
  const D = BM, t = kD, N = e.length === 0, i = N ? pI : {
    owned: null,
    cleanups: null,
    context: null,
    owner: M === void 0 ? t : M
  }, z = N ? e : () => e(() => Ee(() => Qi(i)));
  kD = i, BM = null;
  try {
    return le(z, !0);
  } finally {
    BM = D, kD = t;
  }
}
function Mz(e, M) {
  M = M ? Object.assign({}, Yz, M) : Yz;
  const D = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: M.equals || void 0
  }, t = (N) => (typeof N == "function" && (N = N(D.value)), UI(D, N));
  return [bT.bind(D), t];
}
function vi(e, M, D) {
  const t = fI(e, M, !1, Qt);
  fi(t);
}
function ZT(e, M, D) {
  YI = PT;
  const t = fI(e, M, !1, Qt);
  t.user = !0, Ct ? Ct.push(t) : fi(t);
}
function Ee(e) {
  if (BM === null)
    return e();
  const M = BM;
  BM = null;
  try {
    return e();
  } finally {
    BM = M;
  }
}
function _T(e) {
  ZT(() => Ee(e));
}
function bT() {
  const e = Xt;
  if (this.sources && (this.state || e))
    if (this.state === Qt || e)
      fi(this);
    else {
      const M = nD;
      nD = null, le(() => pi(this), !1), nD = M;
    }
  if (BM) {
    const M = this.observers ? this.observers.length : 0;
    BM.sources ? (BM.sources.push(this), BM.sourceSlots.push(M)) : (BM.sources = [this], BM.sourceSlots = [M]), this.observers ? (this.observers.push(BM), this.observerSlots.push(BM.sources.length - 1)) : (this.observers = [BM], this.observerSlots = [BM.sources.length - 1]);
  }
  return this.value;
}
function UI(e, M, D) {
  let t = e.value;
  return (!e.comparator || !e.comparator(t, M)) && (e.value = M, e.observers && e.observers.length && le(() => {
    for (let N = 0; N < e.observers.length; N += 1) {
      const i = e.observers[N], z = Xt && Xt.running;
      z && Xt.disposed.has(i), (z && !i.tState || !z && !i.state) && (i.pure ? nD.push(i) : Ct.push(i), i.observers && mI(i)), z || (i.state = Qt);
    }
    if (nD.length > 1e6)
      throw nD = [], new Error();
  }, !1)), M;
}
function fi(e) {
  if (!e.fn)
    return;
  Qi(e);
  const M = kD, D = BM, t = jz;
  BM = kD = e, KT(e, e.value, t), BM = D, kD = M;
}
function KT(e, M, D) {
  let t;
  try {
    t = e.fn(M);
  } catch (N) {
    e.pure && (e.state = Qt, e.owned && e.owned.forEach(Qi), e.owned = null), kI(N);
  }
  (!e.updatedAt || e.updatedAt <= D) && (e.updatedAt != null && "observers" in e ? UI(e, t) : e.value = t, e.updatedAt = D);
}
function fI(e, M, D, t = Qt, N) {
  const i = {
    fn: e,
    state: t,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: M,
    owner: kD,
    context: null,
    pure: D
  };
  return kD === null || kD !== pI && (kD.owned ? kD.owned.push(i) : kD.owned = [i]), i;
}
function Yi(e) {
  const M = Xt;
  if (e.state === 0 || M)
    return;
  if (e.state === di || M)
    return pi(e);
  if (e.suspense && Ee(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const D = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < jz); )
    (e.state || M) && D.push(e);
  for (let t = D.length - 1; t >= 0; t--)
    if (e = D[t], e.state === Qt || M)
      fi(e);
    else if (e.state === di || M) {
      const N = nD;
      nD = null, le(() => pi(e, D[0]), !1), nD = N;
    }
}
function le(e, M) {
  if (nD)
    return e();
  let D = !1;
  M || (nD = []), Ct ? D = !0 : Ct = [], jz++;
  try {
    const t = e();
    return RT(D), t;
  } catch (t) {
    D || (Ct = null), nD = null, kI(t);
  }
}
function RT(e) {
  if (nD && (QI(nD), nD = null), e)
    return;
  const M = Ct;
  Ct = null, M.length && le(() => YI(M), !1);
}
function QI(e) {
  for (let M = 0; M < e.length; M++)
    Yi(e[M]);
}
function PT(e) {
  let M, D = 0;
  for (M = 0; M < e.length; M++) {
    const t = e[M];
    t.user ? e[D++] = t : Yi(t);
  }
  for ($D.context && mT(), M = 0; M < D; M++)
    Yi(e[M]);
}
function pi(e, M) {
  const D = Xt;
  e.state = 0;
  for (let t = 0; t < e.sources.length; t += 1) {
    const N = e.sources[t];
    N.sources && (N.state === Qt || D ? N !== M && Yi(N) : (N.state === di || D) && pi(N, M));
  }
}
function mI(e) {
  const M = Xt;
  for (let D = 0; D < e.observers.length; D += 1) {
    const t = e.observers[D];
    (!t.state || M) && (t.state = di, t.pure ? nD.push(t) : Ct.push(t), t.observers && mI(t));
  }
}
function Qi(e) {
  let M;
  if (e.sources)
    for (; e.sources.length; ) {
      const D = e.sources.pop(), t = e.sourceSlots.pop(), N = D.observers;
      if (N && N.length) {
        const i = N.pop(), z = D.observerSlots.pop();
        t < N.length && (i.sourceSlots[z] = t, N[t] = i, D.observerSlots[t] = z);
      }
    }
  if (e.owned) {
    for (M = 0; M < e.owned.length; M++)
      Qi(e.owned[M]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (M = 0; M < e.cleanups.length; M++)
      e.cleanups[M]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function FT(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function kI(e) {
  throw e = FT(e), e;
}
function BT(e, M) {
  return Ee(() => e(M || {}));
}
function GT(e, M, D) {
  let t = D.length, N = M.length, i = t, z = 0, A = 0, I = M[N - 1].nextSibling, n = null;
  for (; z < N || A < i; ) {
    if (M[z] === D[A]) {
      z++, A++;
      continue;
    }
    for (; M[N - 1] === D[i - 1]; )
      N--, i--;
    if (N === z) {
      const T = i < t ? A ? D[A - 1].nextSibling : D[i - A] : I;
      for (; A < i; )
        e.insertBefore(D[A++], T);
    } else if (i === A)
      for (; z < N; )
        (!n || !n.has(M[z])) && M[z].remove(), z++;
    else if (M[z] === D[i - 1] && D[A] === M[N - 1]) {
      const T = M[--N].nextSibling;
      e.insertBefore(D[A++], M[z++].nextSibling), e.insertBefore(D[--i], T), M[N] = D[i];
    } else {
      if (!n) {
        n = /* @__PURE__ */ new Map();
        let u = A;
        for (; u < i; )
          n.set(D[u], u++);
      }
      const T = n.get(M[z]);
      if (T != null)
        if (A < T && T < i) {
          let u = z, g = 1, s;
          for (; ++u < N && u < i && !((s = n.get(M[u])) == null || s !== T + g); )
            g++;
          if (g > T - A) {
            const j = M[z];
            for (; A < T; )
              e.insertBefore(D[A++], j);
          } else
            e.replaceChild(D[A++], M[z++]);
        } else
          z++;
      else
        M[z++].remove();
    }
  }
}
const pz = "_$DX_DELEGATE";
function SI(e, M, D) {
  const t = document.createElement("template");
  t.innerHTML = e;
  let N = t.content.firstChild;
  return D && (N = N.firstChild), N;
}
function VT(e, M = window.document) {
  const D = M[pz] || (M[pz] = /* @__PURE__ */ new Set());
  for (let t = 0, N = e.length; t < N; t++) {
    const i = e[t];
    D.has(i) || (D.add(i), M.addEventListener(i, WT));
  }
}
function HT(e, M, D) {
  return Ee(() => e(M, D));
}
function ZI(e, M, D, t) {
  if (D !== void 0 && !t && (t = []), typeof M != "function")
    return Ui(e, M, t, D);
  vi((N) => Ui(e, M(), N, D), t);
}
function WT(e) {
  const M = `$$${e.type}`;
  let D = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== D && Object.defineProperty(e, "target", {
    configurable: !0,
    value: D
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return D || document;
    }
  }), $D.registry && !$D.done && ($D.done = !0, document.querySelectorAll("[id^=pl-]").forEach((t) => {
    for (; t && t.nodeType !== 8 && t.nodeValue !== "pl-" + e; ) {
      let N = t.nextSibling;
      t.remove(), t = N;
    }
    t && t.remove();
  })); D; ) {
    const t = D[M];
    if (t && !D.disabled) {
      const N = D[`${M}Data`];
      if (N !== void 0 ? t.call(D, N, e) : t.call(D, e), e.cancelBubble)
        return;
    }
    D = D._$host || D.parentNode || D.host;
  }
}
function Ui(e, M, D, t, N) {
  for ($D.context && !D && (D = [...e.childNodes]); typeof D == "function"; )
    D = D();
  if (M === D)
    return D;
  const i = typeof M, z = t !== void 0;
  if (e = z && D[0] && D[0].parentNode || e, i === "string" || i === "number") {
    if ($D.context)
      return D;
    if (i === "number" && (M = M.toString()), z) {
      let A = D[0];
      A && A.nodeType === 3 ? A.data = M : A = document.createTextNode(M), D = zN(e, D, t, A);
    } else
      D !== "" && typeof D == "string" ? D = e.firstChild.data = M : D = e.textContent = M;
  } else if (M == null || i === "boolean") {
    if ($D.context)
      return D;
    D = zN(e, D, t);
  } else {
    if (i === "function")
      return vi(() => {
        let A = M();
        for (; typeof A == "function"; )
          A = A();
        D = Ui(e, A, D, t);
      }), () => D;
    if (Array.isArray(M)) {
      const A = [], I = D && Array.isArray(D);
      if (Dz(A, M, D, N))
        return vi(() => D = Ui(e, A, D, t, !0)), () => D;
      if ($D.context) {
        if (!A.length)
          return D;
        for (let n = 0; n < A.length; n++)
          if (A[n].parentNode)
            return D = A;
      }
      if (A.length === 0) {
        if (D = zN(e, D, t), z)
          return D;
      } else
        I ? D.length === 0 ? Uz(e, A, t) : GT(e, D, A) : (D && zN(e), Uz(e, A));
      D = A;
    } else if (M instanceof Node) {
      if ($D.context && M.parentNode)
        return D = z ? [M] : M;
      if (Array.isArray(D)) {
        if (z)
          return D = zN(e, D, t, M);
        zN(e, D, null, M);
      } else
        D == null || D === "" || !e.firstChild ? e.appendChild(M) : e.replaceChild(M, e.firstChild);
      D = M;
    }
  }
  return D;
}
function Dz(e, M, D, t) {
  let N = !1;
  for (let i = 0, z = M.length; i < z; i++) {
    let A = M[i], I = D && D[i];
    if (A instanceof Node)
      e.push(A);
    else if (!(A == null || A === !0 || A === !1))
      if (Array.isArray(A))
        N = Dz(e, A, I) || N;
      else if (typeof A == "function")
        if (t) {
          for (; typeof A == "function"; )
            A = A();
          N = Dz(e, Array.isArray(A) ? A : [A], Array.isArray(I) ? I : [I]) || N;
        } else
          e.push(A), N = !0;
      else {
        const n = String(A);
        I && I.nodeType === 3 && I.data === n ? e.push(I) : e.push(document.createTextNode(n));
      }
  }
  return N;
}
function Uz(e, M, D = null) {
  for (let t = 0, N = M.length; t < N; t++)
    e.insertBefore(M[t], D);
}
function zN(e, M, D, t) {
  if (D === void 0)
    return e.textContent = "";
  const N = t || document.createTextNode("");
  if (M.length) {
    let i = !1;
    for (let z = M.length - 1; z >= 0; z--) {
      const A = M[z];
      if (N !== A) {
        const I = A.parentNode === e;
        !i && !z ? I ? e.replaceChild(N, A) : e.insertBefore(N, D) : I && A.remove();
      } else
        i = !0;
    }
  } else
    e.insertBefore(N, D);
  return [N];
}
function XT(e) {
  return Object.keys(e).reduce((D, t) => {
    const N = e[t];
    return D[t] = Object.assign({}, N), bI(N.value) && !Du(N.value) && !Array.isArray(N.value) && (D[t].value = Object.assign({}, N.value)), Array.isArray(N.value) && (D[t].value = N.value.slice(0)), D;
  }, {});
}
function qT(e) {
  return e ? Object.keys(e).reduce((D, t) => {
    const N = e[t];
    return D[t] = bI(N) && "value" in N ? N : {
      value: N
    }, D[t].attribute || (D[t].attribute = Mu(t)), D[t].parse = "parse" in D[t] ? D[t].parse : typeof D[t].value != "string", D;
  }, {}) : {};
}
function $T(e) {
  return Object.keys(e).reduce((D, t) => (D[t] = e[t].value, D), {});
}
function JT(e, M) {
  const D = XT(M);
  return Object.keys(M).forEach((N) => {
    const i = D[N], z = e.getAttribute(i.attribute), A = e[N];
    z && (i.value = i.parse ? _I(z) : z), A != null && (i.value = Array.isArray(A) ? A.slice(0) : A), i.reflect && fz(e, i.attribute, i.value), Object.defineProperty(e, N, {
      get() {
        return i.value;
      },
      set(I) {
        const n = i.value;
        i.value = I, i.reflect && fz(this, i.attribute, i.value);
        for (let T = 0, u = this.__propertyChangedCallbacks.length; T < u; T++)
          this.__propertyChangedCallbacks[T](N, I, n);
      },
      enumerable: !0,
      configurable: !0
    });
  }), D;
}
function _I(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function fz(e, M, D) {
  if (D == null || D === !1)
    return e.removeAttribute(M);
  let t = JSON.stringify(D);
  e.__updating[M] = !0, t === "true" && (t = ""), e.setAttribute(M, t), Promise.resolve().then(() => delete e.__updating[M]);
}
function Mu(e) {
  return e.replace(/\.?([A-Z]+)/g, (M, D) => "-" + D.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function bI(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function Du(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function tu(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let Bi;
function Nu(e, M) {
  const D = Object.keys(M);
  return class extends e {
    static get observedAttributes() {
      return D.map((N) => M[N].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = JT(this, M);
      const N = $T(this.props), i = this.Component, z = Bi;
      try {
        Bi = this, this.__initialized = !0, tu(i) ? new i(N, {
          element: this
        }) : i(N, {
          element: this
        });
      } finally {
        Bi = z;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let N = null;
      for (; N = this.__releaseCallbacks.pop(); )
        N(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(N, i, z) {
      if (this.__initialized && !this.__updating[N] && (N = this.lookupProp(N), N in M)) {
        if (z == null && !this[N])
          return;
        this[N] = M[N].parse ? _I(z) : z;
      }
    }
    lookupProp(N) {
      if (M)
        return D.find((i) => N === i || N === M[i].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(N) {
      this.__releaseCallbacks.push(N);
    }
    addPropertyChangedCallback(N) {
      this.__propertyChangedCallbacks.push(N);
    }
  };
}
function eu(e, M = {}, D = {}) {
  const {
    BaseElement: t = HTMLElement,
    extension: N
  } = D;
  return (i) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let z = customElements.get(e);
    return z ? (z.prototype.Component = i, z) : (z = Nu(t, qT(M)), z.prototype.Component = i, z.prototype.registeredTag = e, customElements.define(e, z, N), z);
  };
}
function iu(e) {
  const M = Object.keys(e), D = {};
  for (let t = 0; t < M.length; t++) {
    const [N, i] = Mz(e[M[t]]);
    Object.defineProperty(D, M[t], {
      get: N,
      set(z) {
        i(() => z);
      }
    });
  }
  return D;
}
function Au(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let M = e.parentNode;
  for (; M && !M._$owner && !(M.assignedSlot && M.assignedSlot._$owner); )
    M = M.parentNode;
  return M && M.assignedSlot ? M.assignedSlot._$owner : e._$owner;
}
function zu(e) {
  return (M, D) => {
    const { element: t } = D;
    return ST((N) => {
      const i = iu(M);
      t.addPropertyChangedCallback((A, I) => i[A] = I), t.addReleaseCallback(() => {
        t.renderRoot.textContent = "", N();
      });
      const z = e(i, D);
      return ZI(t.renderRoot, z);
    }, Au(t));
  };
}
function nu(e, M, D) {
  return arguments.length === 2 && (D = M, M = {}), eu(e, M)(zu(D));
}
const AD = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Gi = Math.PI / 180, Qz = 180 / Math.PI;
function FN() {
  const e = Math.random() * 4294967295 | 0, M = Math.random() * 4294967295 | 0, D = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0;
  return (AD[e & 255] + AD[e >> 8 & 255] + AD[e >> 16 & 255] + AD[e >> 24 & 255] + "-" + AD[M & 255] + AD[M >> 8 & 255] + "-" + AD[M >> 16 & 15 | 64] + AD[M >> 24 & 255] + "-" + AD[D & 63 | 128] + AD[D >> 8 & 255] + "-" + AD[D >> 16 & 255] + AD[D >> 24 & 255] + AD[t & 255] + AD[t >> 8 & 255] + AD[t >> 16 & 255] + AD[t >> 24 & 255]).toLowerCase();
}
function cD(e, M, D) {
  return Math.max(M, Math.min(D, e));
}
function Iu(e, M) {
  return (e % M + M) % M;
}
function Vi(e, M, D) {
  return (1 - D) * e + D * M;
}
function mz(e) {
  return (e & e - 1) === 0 && e !== 0;
}
function tz(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function fe(e, M) {
  switch (M.constructor) {
    case Float32Array:
      return e;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function LD(e, M) {
  switch (M.constructor) {
    case Float32Array:
      return e;
    case Uint16Array:
      return Math.round(e * 65535);
    case Uint8Array:
      return Math.round(e * 255);
    case Int16Array:
      return Math.round(e * 32767);
    case Int8Array:
      return Math.round(e * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
let he = class {
  constructor(M = 0, D = 0, t = 0, N = 1) {
    this.isQuaternion = !0, this._x = M, this._y = D, this._z = t, this._w = N;
  }
  static slerpFlat(M, D, t, N, i, z, A) {
    let I = t[N + 0], n = t[N + 1], T = t[N + 2], u = t[N + 3];
    const g = i[z + 0], s = i[z + 1], j = i[z + 2], r = i[z + 3];
    if (A === 0) {
      M[D + 0] = I, M[D + 1] = n, M[D + 2] = T, M[D + 3] = u;
      return;
    }
    if (A === 1) {
      M[D + 0] = g, M[D + 1] = s, M[D + 2] = j, M[D + 3] = r;
      return;
    }
    if (u !== r || I !== g || n !== s || T !== j) {
      let c = 1 - A;
      const y = I * g + n * s + T * j + u * r, w = y >= 0 ? 1 : -1, a = 1 - y * y;
      if (a > Number.EPSILON) {
        const x = Math.sqrt(a), l = Math.atan2(x, y * w);
        c = Math.sin(c * l) / x, A = Math.sin(A * l) / x;
      }
      const C = A * w;
      if (I = I * c + g * C, n = n * c + s * C, T = T * c + j * C, u = u * c + r * C, c === 1 - A) {
        const x = 1 / Math.sqrt(I * I + n * n + T * T + u * u);
        I *= x, n *= x, T *= x, u *= x;
      }
    }
    M[D] = I, M[D + 1] = n, M[D + 2] = T, M[D + 3] = u;
  }
  static multiplyQuaternionsFlat(M, D, t, N, i, z) {
    const A = t[N], I = t[N + 1], n = t[N + 2], T = t[N + 3], u = i[z], g = i[z + 1], s = i[z + 2], j = i[z + 3];
    return M[D] = A * j + T * u + I * s - n * g, M[D + 1] = I * j + T * g + n * u - A * s, M[D + 2] = n * j + T * s + A * g - I * u, M[D + 3] = T * j - A * u - I * g - n * s, M;
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
  set(M, D, t, N) {
    return this._x = M, this._y = D, this._z = t, this._w = N, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(M) {
    return this._x = M.x, this._y = M.y, this._z = M.z, this._w = M.w, this._onChangeCallback(), this;
  }
  setFromEuler(M, D) {
    const t = M._x, N = M._y, i = M._z, z = M._order, A = Math.cos, I = Math.sin, n = A(t / 2), T = A(N / 2), u = A(i / 2), g = I(t / 2), s = I(N / 2), j = I(i / 2);
    switch (z) {
      case "XYZ":
        this._x = g * T * u + n * s * j, this._y = n * s * u - g * T * j, this._z = n * T * j + g * s * u, this._w = n * T * u - g * s * j;
        break;
      case "YXZ":
        this._x = g * T * u + n * s * j, this._y = n * s * u - g * T * j, this._z = n * T * j - g * s * u, this._w = n * T * u + g * s * j;
        break;
      case "ZXY":
        this._x = g * T * u - n * s * j, this._y = n * s * u + g * T * j, this._z = n * T * j + g * s * u, this._w = n * T * u - g * s * j;
        break;
      case "ZYX":
        this._x = g * T * u - n * s * j, this._y = n * s * u + g * T * j, this._z = n * T * j - g * s * u, this._w = n * T * u + g * s * j;
        break;
      case "YZX":
        this._x = g * T * u + n * s * j, this._y = n * s * u + g * T * j, this._z = n * T * j - g * s * u, this._w = n * T * u - g * s * j;
        break;
      case "XZY":
        this._x = g * T * u - n * s * j, this._y = n * s * u - g * T * j, this._z = n * T * j + g * s * u, this._w = n * T * u + g * s * j;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + z);
    }
    return D !== !1 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(M, D) {
    const t = D / 2, N = Math.sin(t);
    return this._x = M.x * N, this._y = M.y * N, this._z = M.z * N, this._w = Math.cos(t), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M) {
    const D = M.elements, t = D[0], N = D[4], i = D[8], z = D[1], A = D[5], I = D[9], n = D[2], T = D[6], u = D[10], g = t + A + u;
    if (g > 0) {
      const s = 0.5 / Math.sqrt(g + 1);
      this._w = 0.25 / s, this._x = (T - I) * s, this._y = (i - n) * s, this._z = (z - N) * s;
    } else if (t > A && t > u) {
      const s = 2 * Math.sqrt(1 + t - A - u);
      this._w = (T - I) / s, this._x = 0.25 * s, this._y = (N + z) / s, this._z = (i + n) / s;
    } else if (A > u) {
      const s = 2 * Math.sqrt(1 + A - t - u);
      this._w = (i - n) / s, this._x = (N + z) / s, this._y = 0.25 * s, this._z = (I + T) / s;
    } else {
      const s = 2 * Math.sqrt(1 + u - t - A);
      this._w = (z - N) / s, this._x = (i + n) / s, this._y = (I + T) / s, this._z = 0.25 * s;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(M, D) {
    let t = M.dot(D) + 1;
    return t < Number.EPSILON ? (t = 0, Math.abs(M.x) > Math.abs(M.z) ? (this._x = -M.y, this._y = M.x, this._z = 0, this._w = t) : (this._x = 0, this._y = -M.z, this._z = M.y, this._w = t)) : (this._x = M.y * D.z - M.z * D.y, this._y = M.z * D.x - M.x * D.z, this._z = M.x * D.y - M.y * D.x, this._w = t), this.normalize();
  }
  angleTo(M) {
    return 2 * Math.acos(Math.abs(cD(this.dot(M), -1, 1)));
  }
  rotateTowards(M, D) {
    const t = this.angleTo(M);
    if (t === 0)
      return this;
    const N = Math.min(1, D / t);
    return this.slerp(M, N), this;
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
    const t = M._x, N = M._y, i = M._z, z = M._w, A = D._x, I = D._y, n = D._z, T = D._w;
    return this._x = t * T + z * A + N * n - i * I, this._y = N * T + z * I + i * A - t * n, this._z = i * T + z * n + t * I - N * A, this._w = z * T - t * A - N * I - i * n, this._onChangeCallback(), this;
  }
  slerp(M, D) {
    if (D === 0)
      return this;
    if (D === 1)
      return this.copy(M);
    const t = this._x, N = this._y, i = this._z, z = this._w;
    let A = z * M._w + t * M._x + N * M._y + i * M._z;
    if (A < 0 ? (this._w = -M._w, this._x = -M._x, this._y = -M._y, this._z = -M._z, A = -A) : this.copy(M), A >= 1)
      return this._w = z, this._x = t, this._y = N, this._z = i, this;
    const I = 1 - A * A;
    if (I <= Number.EPSILON) {
      const s = 1 - D;
      return this._w = s * z + D * this._w, this._x = s * t + D * this._x, this._y = s * N + D * this._y, this._z = s * i + D * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const n = Math.sqrt(I), T = Math.atan2(n, A), u = Math.sin((1 - D) * T) / n, g = Math.sin(D * T) / n;
    return this._w = z * u + this._w * g, this._x = t * u + this._x * g, this._y = N * u + this._y * g, this._z = i * u + this._z * g, this._onChangeCallback(), this;
  }
  slerpQuaternions(M, D, t) {
    return this.copy(M).slerp(D, t);
  }
  random() {
    const M = Math.random(), D = Math.sqrt(1 - M), t = Math.sqrt(M), N = 2 * Math.PI * Math.random(), i = 2 * Math.PI * Math.random();
    return this.set(
      D * Math.cos(N),
      t * Math.sin(i),
      t * Math.cos(i),
      D * Math.sin(N)
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
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}, f = class KI {
  constructor(M = 0, D = 0, t = 0) {
    KI.prototype.isVector3 = !0, this.x = M, this.y = D, this.z = t;
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
    return this.applyQuaternion(kz.setFromEuler(M));
  }
  applyAxisAngle(M, D) {
    return this.applyQuaternion(kz.setFromAxisAngle(M, D));
  }
  applyMatrix3(M) {
    const D = this.x, t = this.y, N = this.z, i = M.elements;
    return this.x = i[0] * D + i[3] * t + i[6] * N, this.y = i[1] * D + i[4] * t + i[7] * N, this.z = i[2] * D + i[5] * t + i[8] * N, this;
  }
  applyNormalMatrix(M) {
    return this.applyMatrix3(M).normalize();
  }
  applyMatrix4(M) {
    const D = this.x, t = this.y, N = this.z, i = M.elements, z = 1 / (i[3] * D + i[7] * t + i[11] * N + i[15]);
    return this.x = (i[0] * D + i[4] * t + i[8] * N + i[12]) * z, this.y = (i[1] * D + i[5] * t + i[9] * N + i[13]) * z, this.z = (i[2] * D + i[6] * t + i[10] * N + i[14]) * z, this;
  }
  applyQuaternion(M) {
    const D = this.x, t = this.y, N = this.z, i = M.x, z = M.y, A = M.z, I = M.w, n = I * D + z * N - A * t, T = I * t + A * D - i * N, u = I * N + i * t - z * D, g = -i * D - z * t - A * N;
    return this.x = n * I + g * -i + T * -A - u * -z, this.y = T * I + g * -z + u * -i - n * -A, this.z = u * I + g * -A + n * -z - T * -i, this;
  }
  project(M) {
    return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix);
  }
  unproject(M) {
    return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld);
  }
  transformDirection(M) {
    const D = this.x, t = this.y, N = this.z, i = M.elements;
    return this.x = i[0] * D + i[4] * t + i[8] * N, this.y = i[1] * D + i[5] * t + i[9] * N, this.z = i[2] * D + i[6] * t + i[10] * N, this.normalize();
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
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this;
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
    const t = M.x, N = M.y, i = M.z, z = D.x, A = D.y, I = D.z;
    return this.x = N * I - i * A, this.y = i * z - t * I, this.z = t * A - N * z, this;
  }
  projectOnVector(M) {
    const D = M.lengthSq();
    if (D === 0)
      return this.set(0, 0, 0);
    const t = M.dot(this) / D;
    return this.copy(M).multiplyScalar(t);
  }
  projectOnPlane(M) {
    return Hi.copy(this).projectOnVector(M), this.sub(Hi);
  }
  reflect(M) {
    return this.sub(Hi.copy(M).multiplyScalar(2 * this.dot(M)));
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const t = this.dot(M) / D;
    return Math.acos(cD(t, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, t = this.y - M.y, N = this.z - M.z;
    return D * D + t * t + N * N;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y) + Math.abs(this.z - M.z);
  }
  setFromSpherical(M) {
    return this.setFromSphericalCoords(M.radius, M.phi, M.theta);
  }
  setFromSphericalCoords(M, D, t) {
    const N = Math.sin(D) * M;
    return this.x = N * Math.sin(t), this.y = Math.cos(D) * M, this.z = N * Math.cos(t), this;
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
    const D = this.setFromMatrixColumn(M, 0).length(), t = this.setFromMatrixColumn(M, 1).length(), N = this.setFromMatrixColumn(M, 2).length();
    return this.x = D, this.y = t, this.z = N, this;
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
const Hi = /* @__PURE__ */ new f(), kz = /* @__PURE__ */ new he(), Tu = `.mockup{width:100%;height:100%;animation:levitate 1.5s infinite alternate ease-in-out}@keyframes levitate{0%{transform:translateY(-2%)}to{transform:translateY(2%)}}
`;
let ND = class Nz {
  constructor() {
    Nz.prototype.isMatrix4 = !0, this.elements = [
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
    ];
  }
  set(M, D, t, N, i, z, A, I, n, T, u, g, s, j, r, c) {
    const y = this.elements;
    return y[0] = M, y[4] = D, y[8] = t, y[12] = N, y[1] = i, y[5] = z, y[9] = A, y[13] = I, y[2] = n, y[6] = T, y[10] = u, y[14] = g, y[3] = s, y[7] = j, y[11] = r, y[15] = c, this;
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
    return new Nz().fromArray(this.elements);
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
    const D = this.elements, t = M.elements, N = 1 / nN.setFromMatrixColumn(M, 0).length(), i = 1 / nN.setFromMatrixColumn(M, 1).length(), z = 1 / nN.setFromMatrixColumn(M, 2).length();
    return D[0] = t[0] * N, D[1] = t[1] * N, D[2] = t[2] * N, D[3] = 0, D[4] = t[4] * i, D[5] = t[5] * i, D[6] = t[6] * i, D[7] = 0, D[8] = t[8] * z, D[9] = t[9] * z, D[10] = t[10] * z, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromEuler(M) {
    const D = this.elements, t = M.x, N = M.y, i = M.z, z = Math.cos(t), A = Math.sin(t), I = Math.cos(N), n = Math.sin(N), T = Math.cos(i), u = Math.sin(i);
    if (M.order === "XYZ") {
      const g = z * T, s = z * u, j = A * T, r = A * u;
      D[0] = I * T, D[4] = -I * u, D[8] = n, D[1] = s + j * n, D[5] = g - r * n, D[9] = -A * I, D[2] = r - g * n, D[6] = j + s * n, D[10] = z * I;
    } else if (M.order === "YXZ") {
      const g = I * T, s = I * u, j = n * T, r = n * u;
      D[0] = g + r * A, D[4] = j * A - s, D[8] = z * n, D[1] = z * u, D[5] = z * T, D[9] = -A, D[2] = s * A - j, D[6] = r + g * A, D[10] = z * I;
    } else if (M.order === "ZXY") {
      const g = I * T, s = I * u, j = n * T, r = n * u;
      D[0] = g - r * A, D[4] = -z * u, D[8] = j + s * A, D[1] = s + j * A, D[5] = z * T, D[9] = r - g * A, D[2] = -z * n, D[6] = A, D[10] = z * I;
    } else if (M.order === "ZYX") {
      const g = z * T, s = z * u, j = A * T, r = A * u;
      D[0] = I * T, D[4] = j * n - s, D[8] = g * n + r, D[1] = I * u, D[5] = r * n + g, D[9] = s * n - j, D[2] = -n, D[6] = A * I, D[10] = z * I;
    } else if (M.order === "YZX") {
      const g = z * I, s = z * n, j = A * I, r = A * n;
      D[0] = I * T, D[4] = r - g * u, D[8] = j * u + s, D[1] = u, D[5] = z * T, D[9] = -A * T, D[2] = -n * T, D[6] = s * u + j, D[10] = g - r * u;
    } else if (M.order === "XZY") {
      const g = z * I, s = z * n, j = A * I, r = A * n;
      D[0] = I * T, D[4] = -u, D[8] = n * T, D[1] = g * u + r, D[5] = z * T, D[9] = s * u - j, D[2] = j * u - s, D[6] = A * T, D[10] = r * u + g;
    }
    return D[3] = 0, D[7] = 0, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromQuaternion(M) {
    return this.compose(uu, M, gu);
  }
  lookAt(M, D, t) {
    const N = this.elements;
    return wD.subVectors(M, D), wD.lengthSq() === 0 && (wD.z = 1), wD.normalize(), wt.crossVectors(t, wD), wt.lengthSq() === 0 && (Math.abs(t.z) === 1 ? wD.x += 1e-4 : wD.z += 1e-4, wD.normalize(), wt.crossVectors(t, wD)), wt.normalize(), Qe.crossVectors(wD, wt), N[0] = wt.x, N[4] = Qe.x, N[8] = wD.x, N[1] = wt.y, N[5] = Qe.y, N[9] = wD.y, N[2] = wt.z, N[6] = Qe.z, N[10] = wD.z, this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const t = M.elements, N = D.elements, i = this.elements, z = t[0], A = t[4], I = t[8], n = t[12], T = t[1], u = t[5], g = t[9], s = t[13], j = t[2], r = t[6], c = t[10], y = t[14], w = t[3], a = t[7], C = t[11], x = t[15], l = N[0], d = N[4], L = N[8], h = N[12], p = N[1], P = N[5], H = N[9], Q = N[13], U = N[2], Z = N[6], W = N[10], X = N[14], F = N[3], J = N[7], $ = N[11], IM = N[15];
    return i[0] = z * l + A * p + I * U + n * F, i[4] = z * d + A * P + I * Z + n * J, i[8] = z * L + A * H + I * W + n * $, i[12] = z * h + A * Q + I * X + n * IM, i[1] = T * l + u * p + g * U + s * F, i[5] = T * d + u * P + g * Z + s * J, i[9] = T * L + u * H + g * W + s * $, i[13] = T * h + u * Q + g * X + s * IM, i[2] = j * l + r * p + c * U + y * F, i[6] = j * d + r * P + c * Z + y * J, i[10] = j * L + r * H + c * W + y * $, i[14] = j * h + r * Q + c * X + y * IM, i[3] = w * l + a * p + C * U + x * F, i[7] = w * d + a * P + C * Z + x * J, i[11] = w * L + a * H + C * W + x * $, i[15] = w * h + a * Q + C * X + x * IM, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[4] *= M, D[8] *= M, D[12] *= M, D[1] *= M, D[5] *= M, D[9] *= M, D[13] *= M, D[2] *= M, D[6] *= M, D[10] *= M, D[14] *= M, D[3] *= M, D[7] *= M, D[11] *= M, D[15] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], t = M[4], N = M[8], i = M[12], z = M[1], A = M[5], I = M[9], n = M[13], T = M[2], u = M[6], g = M[10], s = M[14], j = M[3], r = M[7], c = M[11], y = M[15];
    return j * (+i * I * u - N * n * u - i * A * g + t * n * g + N * A * s - t * I * s) + r * (+D * I * s - D * n * g + i * z * g - N * z * s + N * n * T - i * I * T) + c * (+D * n * u - D * A * s - i * z * u + t * z * s + i * A * T - t * n * T) + y * (-N * A * T - D * I * u + D * A * g + N * z * u - t * z * g + t * I * T);
  }
  transpose() {
    const M = this.elements;
    let D;
    return D = M[1], M[1] = M[4], M[4] = D, D = M[2], M[2] = M[8], M[8] = D, D = M[6], M[6] = M[9], M[9] = D, D = M[3], M[3] = M[12], M[12] = D, D = M[7], M[7] = M[13], M[13] = D, D = M[11], M[11] = M[14], M[14] = D, this;
  }
  setPosition(M, D, t) {
    const N = this.elements;
    return M.isVector3 ? (N[12] = M.x, N[13] = M.y, N[14] = M.z) : (N[12] = M, N[13] = D, N[14] = t), this;
  }
  invert() {
    const M = this.elements, D = M[0], t = M[1], N = M[2], i = M[3], z = M[4], A = M[5], I = M[6], n = M[7], T = M[8], u = M[9], g = M[10], s = M[11], j = M[12], r = M[13], c = M[14], y = M[15], w = u * c * n - r * g * n + r * I * s - A * c * s - u * I * y + A * g * y, a = j * g * n - T * c * n - j * I * s + z * c * s + T * I * y - z * g * y, C = T * r * n - j * u * n + j * A * s - z * r * s - T * A * y + z * u * y, x = j * u * I - T * r * I - j * A * g + z * r * g + T * A * c - z * u * c, l = D * w + t * a + N * C + i * x;
    if (l === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const d = 1 / l;
    return M[0] = w * d, M[1] = (r * g * i - u * c * i - r * N * s + t * c * s + u * N * y - t * g * y) * d, M[2] = (A * c * i - r * I * i + r * N * n - t * c * n - A * N * y + t * I * y) * d, M[3] = (u * I * i - A * g * i - u * N * n + t * g * n + A * N * s - t * I * s) * d, M[4] = a * d, M[5] = (T * c * i - j * g * i + j * N * s - D * c * s - T * N * y + D * g * y) * d, M[6] = (j * I * i - z * c * i - j * N * n + D * c * n + z * N * y - D * I * y) * d, M[7] = (z * g * i - T * I * i + T * N * n - D * g * n - z * N * s + D * I * s) * d, M[8] = C * d, M[9] = (j * u * i - T * r * i - j * t * s + D * r * s + T * t * y - D * u * y) * d, M[10] = (z * r * i - j * A * i + j * t * n - D * r * n - z * t * y + D * A * y) * d, M[11] = (T * A * i - z * u * i - T * t * n + D * u * n + z * t * s - D * A * s) * d, M[12] = x * d, M[13] = (T * r * N - j * u * N + j * t * g - D * r * g - T * t * c + D * u * c) * d, M[14] = (j * A * N - z * r * N - j * t * I + D * r * I + z * t * c - D * A * c) * d, M[15] = (z * u * N - T * A * N + T * t * I - D * u * I - z * t * g + D * A * g) * d, this;
  }
  scale(M) {
    const D = this.elements, t = M.x, N = M.y, i = M.z;
    return D[0] *= t, D[4] *= N, D[8] *= i, D[1] *= t, D[5] *= N, D[9] *= i, D[2] *= t, D[6] *= N, D[10] *= i, D[3] *= t, D[7] *= N, D[11] *= i, this;
  }
  getMaxScaleOnAxis() {
    const M = this.elements, D = M[0] * M[0] + M[1] * M[1] + M[2] * M[2], t = M[4] * M[4] + M[5] * M[5] + M[6] * M[6], N = M[8] * M[8] + M[9] * M[9] + M[10] * M[10];
    return Math.sqrt(Math.max(D, t, N));
  }
  makeTranslation(M, D, t) {
    return this.set(
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
    const t = Math.cos(D), N = Math.sin(D), i = 1 - t, z = M.x, A = M.y, I = M.z, n = i * z, T = i * A;
    return this.set(
      n * z + t,
      n * A - N * I,
      n * I + N * A,
      0,
      n * A + N * I,
      T * A + t,
      T * I - N * z,
      0,
      n * I - N * A,
      T * I + N * z,
      i * I * I + t,
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
  makeShear(M, D, t, N, i, z) {
    return this.set(
      1,
      t,
      i,
      0,
      M,
      1,
      z,
      0,
      D,
      N,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(M, D, t) {
    const N = this.elements, i = D._x, z = D._y, A = D._z, I = D._w, n = i + i, T = z + z, u = A + A, g = i * n, s = i * T, j = i * u, r = z * T, c = z * u, y = A * u, w = I * n, a = I * T, C = I * u, x = t.x, l = t.y, d = t.z;
    return N[0] = (1 - (r + y)) * x, N[1] = (s + C) * x, N[2] = (j - a) * x, N[3] = 0, N[4] = (s - C) * l, N[5] = (1 - (g + y)) * l, N[6] = (c + w) * l, N[7] = 0, N[8] = (j + a) * d, N[9] = (c - w) * d, N[10] = (1 - (g + r)) * d, N[11] = 0, N[12] = M.x, N[13] = M.y, N[14] = M.z, N[15] = 1, this;
  }
  decompose(M, D, t) {
    const N = this.elements;
    let i = nN.set(N[0], N[1], N[2]).length();
    const z = nN.set(N[4], N[5], N[6]).length(), A = nN.set(N[8], N[9], N[10]).length();
    this.determinant() < 0 && (i = -i), M.x = N[12], M.y = N[13], M.z = N[14], bD.copy(this);
    const n = 1 / i, T = 1 / z, u = 1 / A;
    return bD.elements[0] *= n, bD.elements[1] *= n, bD.elements[2] *= n, bD.elements[4] *= T, bD.elements[5] *= T, bD.elements[6] *= T, bD.elements[8] *= u, bD.elements[9] *= u, bD.elements[10] *= u, D.setFromRotationMatrix(bD), t.x = i, t.y = z, t.z = A, this;
  }
  makePerspective(M, D, t, N, i, z) {
    const A = this.elements, I = 2 * i / (D - M), n = 2 * i / (t - N), T = (D + M) / (D - M), u = (t + N) / (t - N), g = -(z + i) / (z - i), s = -2 * z * i / (z - i);
    return A[0] = I, A[4] = 0, A[8] = T, A[12] = 0, A[1] = 0, A[5] = n, A[9] = u, A[13] = 0, A[2] = 0, A[6] = 0, A[10] = g, A[14] = s, A[3] = 0, A[7] = 0, A[11] = -1, A[15] = 0, this;
  }
  makeOrthographic(M, D, t, N, i, z) {
    const A = this.elements, I = 1 / (D - M), n = 1 / (t - N), T = 1 / (z - i), u = (D + M) * I, g = (t + N) * n, s = (z + i) * T;
    return A[0] = 2 * I, A[4] = 0, A[8] = 0, A[12] = -u, A[1] = 0, A[5] = 2 * n, A[9] = 0, A[13] = -g, A[2] = 0, A[6] = 0, A[10] = -2 * T, A[14] = -s, A[3] = 0, A[7] = 0, A[11] = 0, A[15] = 1, this;
  }
  equals(M) {
    const D = this.elements, t = M.elements;
    for (let N = 0; N < 16; N++)
      if (D[N] !== t[N])
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
const nN = /* @__PURE__ */ new f(), bD = /* @__PURE__ */ new ND(), uu = /* @__PURE__ */ new f(0, 0, 0), gu = /* @__PURE__ */ new f(1, 1, 1), wt = /* @__PURE__ */ new f(), Qe = /* @__PURE__ */ new f(), wD = /* @__PURE__ */ new f();
let BN = class {
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
    const N = this._listeners[M];
    if (N !== void 0) {
      const i = N.indexOf(D);
      i !== -1 && N.splice(i, 1);
    }
  }
  dispatchEvent(M) {
    if (this._listeners === void 0)
      return;
    const t = this._listeners[M.type];
    if (t !== void 0) {
      M.target = this;
      const N = t.slice(0);
      for (let i = 0, z = N.length; i < z; i++)
        N[i].call(this, M);
      M.target = null;
    }
  }
};
const Sz = /* @__PURE__ */ new ND(), Zz = /* @__PURE__ */ new he();
let RI = class PI {
  constructor(M = 0, D = 0, t = 0, N = PI.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = M, this._y = D, this._z = t, this._order = N;
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
  set(M, D, t, N = this._order) {
    return this._x = M, this._y = D, this._z = t, this._order = N, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(M) {
    return this._x = M._x, this._y = M._y, this._z = M._z, this._order = M._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M, D = this._order, t = !0) {
    const N = M.elements, i = N[0], z = N[4], A = N[8], I = N[1], n = N[5], T = N[9], u = N[2], g = N[6], s = N[10];
    switch (D) {
      case "XYZ":
        this._y = Math.asin(cD(A, -1, 1)), Math.abs(A) < 0.9999999 ? (this._x = Math.atan2(-T, s), this._z = Math.atan2(-z, i)) : (this._x = Math.atan2(g, n), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-cD(T, -1, 1)), Math.abs(T) < 0.9999999 ? (this._y = Math.atan2(A, s), this._z = Math.atan2(I, n)) : (this._y = Math.atan2(-u, i), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(cD(g, -1, 1)), Math.abs(g) < 0.9999999 ? (this._y = Math.atan2(-u, s), this._z = Math.atan2(-z, n)) : (this._y = 0, this._z = Math.atan2(I, i));
        break;
      case "ZYX":
        this._y = Math.asin(-cD(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(g, s), this._z = Math.atan2(I, i)) : (this._x = 0, this._z = Math.atan2(-z, n));
        break;
      case "YZX":
        this._z = Math.asin(cD(I, -1, 1)), Math.abs(I) < 0.9999999 ? (this._x = Math.atan2(-T, n), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(A, s));
        break;
      case "XZY":
        this._z = Math.asin(-cD(z, -1, 1)), Math.abs(z) < 0.9999999 ? (this._x = Math.atan2(g, n), this._y = Math.atan2(A, i)) : (this._x = Math.atan2(-T, s), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + D);
    }
    return this._order = D, t === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(M, D, t) {
    return Sz.makeRotationFromQuaternion(M), this.setFromRotationMatrix(Sz, D, t);
  }
  setFromVector3(M, D = this._order) {
    return this.set(M.x, M.y, M.z, D);
  }
  reorder(M) {
    return Zz.setFromEuler(this), this.setFromQuaternion(Zz, M);
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
RI.DEFAULT_ORDER = "XYZ";
let FI = class {
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
}, HD = class BI {
  constructor() {
    BI.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ];
  }
  set(M, D, t, N, i, z, A, I, n) {
    const T = this.elements;
    return T[0] = M, T[1] = N, T[2] = A, T[3] = D, T[4] = i, T[5] = I, T[6] = t, T[7] = z, T[8] = n, this;
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
    const t = M.elements, N = D.elements, i = this.elements, z = t[0], A = t[3], I = t[6], n = t[1], T = t[4], u = t[7], g = t[2], s = t[5], j = t[8], r = N[0], c = N[3], y = N[6], w = N[1], a = N[4], C = N[7], x = N[2], l = N[5], d = N[8];
    return i[0] = z * r + A * w + I * x, i[3] = z * c + A * a + I * l, i[6] = z * y + A * C + I * d, i[1] = n * r + T * w + u * x, i[4] = n * c + T * a + u * l, i[7] = n * y + T * C + u * d, i[2] = g * r + s * w + j * x, i[5] = g * c + s * a + j * l, i[8] = g * y + s * C + j * d, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[3] *= M, D[6] *= M, D[1] *= M, D[4] *= M, D[7] *= M, D[2] *= M, D[5] *= M, D[8] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], t = M[1], N = M[2], i = M[3], z = M[4], A = M[5], I = M[6], n = M[7], T = M[8];
    return D * z * T - D * A * n - t * i * T + t * A * I + N * i * n - N * z * I;
  }
  invert() {
    const M = this.elements, D = M[0], t = M[1], N = M[2], i = M[3], z = M[4], A = M[5], I = M[6], n = M[7], T = M[8], u = T * z - A * n, g = A * I - T * i, s = n * i - z * I, j = D * u + t * g + N * s;
    if (j === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const r = 1 / j;
    return M[0] = u * r, M[1] = (N * n - T * t) * r, M[2] = (A * t - N * z) * r, M[3] = g * r, M[4] = (T * D - N * I) * r, M[5] = (N * i - A * D) * r, M[6] = s * r, M[7] = (t * I - n * D) * r, M[8] = (z * D - t * i) * r, this;
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
  setUvTransform(M, D, t, N, i, z, A) {
    const I = Math.cos(i), n = Math.sin(i);
    return this.set(
      t * I,
      t * n,
      -t * (I * z + n * A) + z + M,
      -N * n,
      N * I,
      -N * (-n * z + I * A) + A + D,
      0,
      0,
      1
    ), this;
  }
  //
  scale(M, D) {
    return this.premultiply(Wi.makeScale(M, D)), this;
  }
  rotate(M) {
    return this.premultiply(Wi.makeRotation(-M)), this;
  }
  translate(M, D) {
    return this.premultiply(Wi.makeTranslation(M, D)), this;
  }
  // for 2D Transforms
  makeTranslation(M, D) {
    return this.set(
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
    for (let N = 0; N < 9; N++)
      if (D[N] !== t[N])
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
const Wi = /* @__PURE__ */ new HD();
let su = 0;
const _z = /* @__PURE__ */ new f(), IN = /* @__PURE__ */ new he(), At = /* @__PURE__ */ new ND(), me = /* @__PURE__ */ new f(), qN = /* @__PURE__ */ new f(), ru = /* @__PURE__ */ new f(), cu = /* @__PURE__ */ new he(), bz = /* @__PURE__ */ new f(1, 0, 0), Kz = /* @__PURE__ */ new f(0, 1, 0), Rz = /* @__PURE__ */ new f(0, 0, 1), ju = { type: "added" }, Pz = { type: "removed" };
let aD = class wi extends BN {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: su++ }), this.uuid = FN(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = wi.DEFAULT_UP.clone();
    const M = new f(), D = new RI(), t = new he(), N = new f(1, 1, 1);
    function i() {
      t.setFromEuler(D, !1);
    }
    function z() {
      D.setFromQuaternion(t, void 0, !1);
    }
    D._onChange(i), t._onChange(z), Object.defineProperties(this, {
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
        value: N
      },
      modelViewMatrix: {
        value: new ND()
      },
      normalMatrix: {
        value: new HD()
      }
    }), this.matrix = new ND(), this.matrixWorld = new ND(), this.matrixAutoUpdate = wi.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = wi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.layers = new FI(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
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
    return IN.setFromAxisAngle(M, D), this.quaternion.multiply(IN), this;
  }
  rotateOnWorldAxis(M, D) {
    return IN.setFromAxisAngle(M, D), this.quaternion.premultiply(IN), this;
  }
  rotateX(M) {
    return this.rotateOnAxis(bz, M);
  }
  rotateY(M) {
    return this.rotateOnAxis(Kz, M);
  }
  rotateZ(M) {
    return this.rotateOnAxis(Rz, M);
  }
  translateOnAxis(M, D) {
    return _z.copy(M).applyQuaternion(this.quaternion), this.position.add(_z.multiplyScalar(D)), this;
  }
  translateX(M) {
    return this.translateOnAxis(bz, M);
  }
  translateY(M) {
    return this.translateOnAxis(Kz, M);
  }
  translateZ(M) {
    return this.translateOnAxis(Rz, M);
  }
  localToWorld(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(At.copy(this.matrixWorld).invert());
  }
  lookAt(M, D, t) {
    M.isVector3 ? me.copy(M) : me.set(M, D, t);
    const N = this.parent;
    this.updateWorldMatrix(!0, !1), qN.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? At.lookAt(qN, me, this.up) : At.lookAt(me, qN, this.up), this.quaternion.setFromRotationMatrix(At), N && (At.extractRotation(N.matrixWorld), IN.setFromRotationMatrix(At), this.quaternion.premultiply(IN.invert()));
  }
  add(M) {
    if (arguments.length > 1) {
      for (let D = 0; D < arguments.length; D++)
        this.add(arguments[D]);
      return this;
    }
    return M === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", M), this) : (M && M.isObject3D ? (M.parent !== null && M.parent.remove(M), M.parent = this, this.children.push(M), M.dispatchEvent(ju)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", M), this);
  }
  remove(M) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.remove(arguments[t]);
      return this;
    }
    const D = this.children.indexOf(M);
    return D !== -1 && (M.parent = null, this.children.splice(D, 1), M.dispatchEvent(Pz)), this;
  }
  removeFromParent() {
    const M = this.parent;
    return M !== null && M.remove(this), this;
  }
  clear() {
    for (let M = 0; M < this.children.length; M++) {
      const D = this.children[M];
      D.parent = null, D.dispatchEvent(Pz);
    }
    return this.children.length = 0, this;
  }
  attach(M) {
    return this.updateWorldMatrix(!0, !1), At.copy(this.matrixWorld).invert(), M.parent !== null && (M.parent.updateWorldMatrix(!0, !1), At.multiply(M.parent.matrixWorld)), M.applyMatrix4(At), this.add(M), M.updateWorldMatrix(!1, !0), this;
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
    for (let t = 0, N = this.children.length; t < N; t++) {
      const z = this.children[t].getObjectByProperty(M, D);
      if (z !== void 0)
        return z;
    }
  }
  getObjectsByProperty(M, D) {
    let t = [];
    this[M] === D && t.push(this);
    for (let N = 0, i = this.children.length; N < i; N++) {
      const z = this.children[N].getObjectsByProperty(M, D);
      z.length > 0 && (t = t.concat(z));
    }
    return t;
  }
  getWorldPosition(M) {
    return this.updateWorldMatrix(!0, !1), M.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(qN, M, ru), M;
  }
  getWorldScale(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(qN, cu, M), M;
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
    for (let t = 0, N = D.length; t < N; t++)
      D[t].traverse(M);
  }
  traverseVisible(M) {
    if (this.visible === !1)
      return;
    M(this);
    const D = this.children;
    for (let t = 0, N = D.length; t < N; t++)
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
    for (let t = 0, N = D.length; t < N; t++) {
      const i = D[t];
      (i.matrixWorldAutoUpdate === !0 || M === !0) && i.updateMatrixWorld(M);
    }
  }
  updateWorldMatrix(M, D) {
    const t = this.parent;
    if (M === !0 && t !== null && t.matrixWorldAutoUpdate === !0 && t.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), D === !0) {
      const N = this.children;
      for (let i = 0, z = N.length; i < z; i++) {
        const A = N[i];
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
      version: 4.5,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const N = {};
    N.uuid = this.uuid, N.type = this.type, this.name !== "" && (N.name = this.name), this.castShadow === !0 && (N.castShadow = !0), this.receiveShadow === !0 && (N.receiveShadow = !0), this.visible === !1 && (N.visible = !1), this.frustumCulled === !1 && (N.frustumCulled = !1), this.renderOrder !== 0 && (N.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (N.userData = this.userData), N.layers = this.layers.mask, N.matrix = this.matrix.toArray(), this.matrixAutoUpdate === !1 && (N.matrixAutoUpdate = !1), this.isInstancedMesh && (N.type = "InstancedMesh", N.count = this.count, N.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (N.instanceColor = this.instanceColor.toJSON()));
    function i(A, I) {
      return A[I.uuid] === void 0 && (A[I.uuid] = I.toJSON(M)), I.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? N.background = this.background.toJSON() : this.background.isTexture && (N.background = this.background.toJSON(M).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (N.environment = this.environment.toJSON(M).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      N.geometry = i(M.geometries, this.geometry);
      const A = this.geometry.parameters;
      if (A !== void 0 && A.shapes !== void 0) {
        const I = A.shapes;
        if (Array.isArray(I))
          for (let n = 0, T = I.length; n < T; n++) {
            const u = I[n];
            i(M.shapes, u);
          }
        else
          i(M.shapes, I);
      }
    }
    if (this.isSkinnedMesh && (N.bindMode = this.bindMode, N.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(M.skeletons, this.skeleton), N.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const A = [];
        for (let I = 0, n = this.material.length; I < n; I++)
          A.push(i(M.materials, this.material[I]));
        N.material = A;
      } else
        N.material = i(M.materials, this.material);
    if (this.children.length > 0) {
      N.children = [];
      for (let A = 0; A < this.children.length; A++)
        N.children.push(this.children[A].toJSON(M).object);
    }
    if (this.animations.length > 0) {
      N.animations = [];
      for (let A = 0; A < this.animations.length; A++) {
        const I = this.animations[A];
        N.animations.push(i(M.animations, I));
      }
    }
    if (D) {
      const A = z(M.geometries), I = z(M.materials), n = z(M.textures), T = z(M.images), u = z(M.shapes), g = z(M.skeletons), s = z(M.animations), j = z(M.nodes);
      A.length > 0 && (t.geometries = A), I.length > 0 && (t.materials = I), n.length > 0 && (t.textures = n), T.length > 0 && (t.images = T), u.length > 0 && (t.shapes = u), g.length > 0 && (t.skeletons = g), s.length > 0 && (t.animations = s), j.length > 0 && (t.nodes = j);
    }
    return t.object = N, t;
    function z(A) {
      const I = [];
      for (const n in A) {
        const T = A[n];
        delete T.metadata, I.push(T);
      }
      return I;
    }
  }
  clone(M) {
    return new this.constructor().copy(this, M);
  }
  copy(M, D = !0) {
    if (this.name = M.name, this.up.copy(M.up), this.position.copy(M.position), this.rotation.order = M.rotation.order, this.quaternion.copy(M.quaternion), this.scale.copy(M.scale), this.matrix.copy(M.matrix), this.matrixWorld.copy(M.matrixWorld), this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrixWorldNeedsUpdate = M.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = M.matrixWorldAutoUpdate, this.layers.mask = M.layers.mask, this.visible = M.visible, this.castShadow = M.castShadow, this.receiveShadow = M.receiveShadow, this.frustumCulled = M.frustumCulled, this.renderOrder = M.renderOrder, this.userData = JSON.parse(JSON.stringify(M.userData)), D === !0)
      for (let t = 0; t < M.children.length; t++) {
        const N = M.children[t];
        this.add(N.clone());
      }
    return this;
  }
};
aD.DEFAULT_UP = /* @__PURE__ */ new f(0, 1, 0);
aD.DEFAULT_MATRIX_AUTO_UPDATE = !0;
aD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class GI extends aD {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ND(), this.projectionMatrix = new ND(), this.projectionMatrixInverse = new ND();
  }
  copy(M, D) {
    return super.copy(M, D), this.matrixWorldInverse.copy(M.matrixWorldInverse), this.projectionMatrix.copy(M.projectionMatrix), this.projectionMatrixInverse.copy(M.projectionMatrixInverse), this;
  }
  getWorldDirection(M) {
    this.updateWorldMatrix(!0, !1);
    const D = this.matrixWorld.elements;
    return M.set(-D[8], -D[9], -D[10]).normalize();
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
class SD extends GI {
  constructor(M = 50, D = 1, t = 0.1, N = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = M, this.zoom = 1, this.near = t, this.far = N, this.focus = 10, this.aspect = D, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
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
    this.fov = Qz * 2 * Math.atan(D), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const M = Math.tan(Gi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / M;
  }
  getEffectiveFOV() {
    return Qz * 2 * Math.atan(
      Math.tan(Gi * 0.5 * this.fov) / this.zoom
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
  setViewOffset(M, D, t, N, i, z) {
    this.aspect = M / D, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = M, this.view.fullHeight = D, this.view.offsetX = t, this.view.offsetY = N, this.view.width = i, this.view.height = z, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const M = this.near;
    let D = M * Math.tan(Gi * 0.5 * this.fov) / this.zoom, t = 2 * D, N = this.aspect * t, i = -0.5 * N;
    const z = this.view;
    if (this.view !== null && this.view.enabled) {
      const I = z.fullWidth, n = z.fullHeight;
      i += z.offsetX * N / I, D -= z.offsetY * t / n, N *= z.width / I, t *= z.height / n;
    }
    const A = this.filmOffset;
    A !== 0 && (i += M * A / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + N, D, D - t, M, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return D.object.fov = this.fov, D.object.zoom = this.zoom, D.object.near = this.near, D.object.far = this.far, D.object.focus = this.focus, D.object.aspect = this.aspect, this.view !== null && (D.object.view = Object.assign({}, this.view)), D.object.filmGauge = this.filmGauge, D.object.filmOffset = this.filmOffset, D;
  }
}
const yu = "149", au = 0, Fz = 1, ou = 2, VI = 1, Cu = 2, ue = 3, ft = 0, dD = 1, Yt = 2, pt = 0, kN = 1, Bz = 2, Gz = 3, Vz = 4, Lu = 5, UN = 100, wu = 101, xu = 102, Hz = 103, Wz = 104, Ou = 200, Eu = 201, lu = 202, hu = 203, HI = 204, WI = 205, du = 206, vu = 207, Yu = 208, pu = 209, Uu = 210, fu = 0, Qu = 1, mu = 2, ez = 3, ku = 4, Su = 5, Zu = 6, _u = 7, yz = 0, bu = 1, Ku = 2, Lt = 0, Ru = 1, Pu = 2, Fu = 3, Bu = 4, Gu = 5, XI = 300, _N = 301, bN = 302, iz = 303, Az = 304, mi = 306, zz = 1e3, GD = 1001, nz = 1002, rD = 1003, Xz = 1004, Xi = 1005, yD = 1006, Vu = 1007, ae = 1008, DN = 1009, Hu = 1010, Wu = 1011, qI = 1012, Xu = 1013, Ht = 1014, Wt = 1015, oe = 1016, qu = 1017, $u = 1018, SN = 1020, Ju = 1021, VD = 1023, Mg = 1024, Dg = 1025, qt = 1026, KN = 1027, tg = 1028, Ng = 1029, eg = 1030, ig = 1031, Ag = 1033, qi = 33776, $i = 33777, Ji = 33778, MA = 33779, qz = 35840, $z = 35841, Jz = 35842, Mn = 35843, zg = 36196, Dn = 37492, tn = 37496, Nn = 37808, en = 37809, An = 37810, zn = 37811, nn = 37812, In = 37813, Tn = 37814, un = 37815, gn = 37816, sn = 37817, rn = 37818, cn = 37819, jn = 37820, yn = 37821, DA = 36492, ng = 36283, an = 36284, on = 36285, Cn = 36286, tN = 3e3, SM = 3001, Ig = 3200, Tg = 3201, $I = 0, ug = 1, XD = "srgb", Ce = "srgb-linear", tA = 7680, gg = 519, Ln = 35044, wn = "300 es", Iz = 1035;
function $t(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function xi(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
const NA = {
  [XD]: { [Ce]: $t },
  [Ce]: { [XD]: xi }
}, uD = {
  legacyMode: !0,
  get workingColorSpace() {
    return Ce;
  },
  set workingColorSpace(e) {
    console.warn("THREE.ColorManagement: .workingColorSpace is readonly.");
  },
  convert: function(e, M, D) {
    if (this.legacyMode || M === D || !M || !D)
      return e;
    if (NA[M] && NA[M][D] !== void 0) {
      const t = NA[M][D];
      return e.r = t(e.r), e.g = t(e.g), e.b = t(e.b), e;
    }
    throw new Error("Unsupported color space conversion.");
  },
  fromWorkingColorSpace: function(e, M) {
    return this.convert(e, this.workingColorSpace, M);
  },
  toWorkingColorSpace: function(e, M) {
    return this.convert(e, M, this.workingColorSpace);
  }
}, JI = {
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
}, VM = { r: 0, g: 0, b: 0 }, KD = { h: 0, s: 0, l: 0 }, ke = { h: 0, s: 0, l: 0 };
function eA(e, M, D) {
  return D < 0 && (D += 1), D > 1 && (D -= 1), D < 1 / 6 ? e + (M - e) * 6 * D : D < 1 / 2 ? M : D < 2 / 3 ? e + (M - e) * 6 * (2 / 3 - D) : e;
}
function Se(e, M) {
  return M.r = e.r, M.g = e.g, M.b = e.b, M;
}
let kM = class {
  constructor(M, D, t) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, D === void 0 && t === void 0 ? this.set(M) : this.setRGB(M, D, t);
  }
  set(M) {
    return M && M.isColor ? this.copy(M) : typeof M == "number" ? this.setHex(M) : typeof M == "string" && this.setStyle(M), this;
  }
  setScalar(M) {
    return this.r = M, this.g = M, this.b = M, this;
  }
  setHex(M, D = XD) {
    return M = Math.floor(M), this.r = (M >> 16 & 255) / 255, this.g = (M >> 8 & 255) / 255, this.b = (M & 255) / 255, uD.toWorkingColorSpace(this, D), this;
  }
  setRGB(M, D, t, N = uD.workingColorSpace) {
    return this.r = M, this.g = D, this.b = t, uD.toWorkingColorSpace(this, N), this;
  }
  setHSL(M, D, t, N = uD.workingColorSpace) {
    if (M = Iu(M, 1), D = cD(D, 0, 1), t = cD(t, 0, 1), D === 0)
      this.r = this.g = this.b = t;
    else {
      const i = t <= 0.5 ? t * (1 + D) : t + D - t * D, z = 2 * t - i;
      this.r = eA(z, i, M + 1 / 3), this.g = eA(z, i, M), this.b = eA(z, i, M - 1 / 3);
    }
    return uD.toWorkingColorSpace(this, N), this;
  }
  setStyle(M, D = XD) {
    function t(i) {
      i !== void 0 && parseFloat(i) < 1 && console.warn("THREE.Color: Alpha component of " + M + " will be ignored.");
    }
    let N;
    if (N = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(M)) {
      let i;
      const z = N[1], A = N[2];
      switch (z) {
        case "rgb":
        case "rgba":
          if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return this.r = Math.min(255, parseInt(i[1], 10)) / 255, this.g = Math.min(255, parseInt(i[2], 10)) / 255, this.b = Math.min(255, parseInt(i[3], 10)) / 255, uD.toWorkingColorSpace(this, D), t(i[4]), this;
          if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return this.r = Math.min(100, parseInt(i[1], 10)) / 100, this.g = Math.min(100, parseInt(i[2], 10)) / 100, this.b = Math.min(100, parseInt(i[3], 10)) / 100, uD.toWorkingColorSpace(this, D), t(i[4]), this;
          break;
        case "hsl":
        case "hsla":
          if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A)) {
            const I = parseFloat(i[1]) / 360, n = parseFloat(i[2]) / 100, T = parseFloat(i[3]) / 100;
            return t(i[4]), this.setHSL(I, n, T, D);
          }
          break;
      }
    } else if (N = /^\#([A-Fa-f\d]+)$/.exec(M)) {
      const i = N[1], z = i.length;
      if (z === 3)
        return this.r = parseInt(i.charAt(0) + i.charAt(0), 16) / 255, this.g = parseInt(i.charAt(1) + i.charAt(1), 16) / 255, this.b = parseInt(i.charAt(2) + i.charAt(2), 16) / 255, uD.toWorkingColorSpace(this, D), this;
      if (z === 6)
        return this.r = parseInt(i.charAt(0) + i.charAt(1), 16) / 255, this.g = parseInt(i.charAt(2) + i.charAt(3), 16) / 255, this.b = parseInt(i.charAt(4) + i.charAt(5), 16) / 255, uD.toWorkingColorSpace(this, D), this;
    }
    return M && M.length > 0 ? this.setColorName(M, D) : this;
  }
  setColorName(M, D = XD) {
    const t = JI[M.toLowerCase()];
    return t !== void 0 ? this.setHex(t, D) : console.warn("THREE.Color: Unknown color " + M), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(M) {
    return this.r = M.r, this.g = M.g, this.b = M.b, this;
  }
  copySRGBToLinear(M) {
    return this.r = $t(M.r), this.g = $t(M.g), this.b = $t(M.b), this;
  }
  copyLinearToSRGB(M) {
    return this.r = xi(M.r), this.g = xi(M.g), this.b = xi(M.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(M = XD) {
    return uD.fromWorkingColorSpace(Se(this, VM), M), cD(VM.r * 255, 0, 255) << 16 ^ cD(VM.g * 255, 0, 255) << 8 ^ cD(VM.b * 255, 0, 255) << 0;
  }
  getHexString(M = XD) {
    return ("000000" + this.getHex(M).toString(16)).slice(-6);
  }
  getHSL(M, D = uD.workingColorSpace) {
    uD.fromWorkingColorSpace(Se(this, VM), D);
    const t = VM.r, N = VM.g, i = VM.b, z = Math.max(t, N, i), A = Math.min(t, N, i);
    let I, n;
    const T = (A + z) / 2;
    if (A === z)
      I = 0, n = 0;
    else {
      const u = z - A;
      switch (n = T <= 0.5 ? u / (z + A) : u / (2 - z - A), z) {
        case t:
          I = (N - i) / u + (N < i ? 6 : 0);
          break;
        case N:
          I = (i - t) / u + 2;
          break;
        case i:
          I = (t - N) / u + 4;
          break;
      }
      I /= 6;
    }
    return M.h = I, M.s = n, M.l = T, M;
  }
  getRGB(M, D = uD.workingColorSpace) {
    return uD.fromWorkingColorSpace(Se(this, VM), D), M.r = VM.r, M.g = VM.g, M.b = VM.b, M;
  }
  getStyle(M = XD) {
    return uD.fromWorkingColorSpace(Se(this, VM), M), M !== XD ? `color(${M} ${VM.r} ${VM.g} ${VM.b})` : `rgb(${VM.r * 255 | 0},${VM.g * 255 | 0},${VM.b * 255 | 0})`;
  }
  offsetHSL(M, D, t) {
    return this.getHSL(KD), KD.h += M, KD.s += D, KD.l += t, this.setHSL(KD.h, KD.s, KD.l), this;
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
    this.getHSL(KD), M.getHSL(ke);
    const t = Vi(KD.h, ke.h, D), N = Vi(KD.s, ke.s, D), i = Vi(KD.l, ke.l, D);
    return this.setHSL(t, N, i), this;
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
kM.NAMES = JI;
class sg extends aD {
  constructor(M, D = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new kM(M), this.intensity = D;
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
let gM = class MT {
  constructor(M = 0, D = 0) {
    MT.prototype.isVector2 = !0, this.x = M, this.y = D;
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
    const D = this.x, t = this.y, N = M.elements;
    return this.x = N[0] * D + N[3] * t + N[6], this.y = N[1] * D + N[4] * t + N[7], this;
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
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this;
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
    const t = Math.cos(D), N = Math.sin(D), i = this.x - M.x, z = this.y - M.y;
    return this.x = i * t - z * N + M.x, this.y = i * N + z * t + M.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
};
class tD {
  constructor(M = 0, D = 0, t = 0, N = 1) {
    tD.prototype.isVector4 = !0, this.x = M, this.y = D, this.z = t, this.w = N;
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
  set(M, D, t, N) {
    return this.x = M, this.y = D, this.z = t, this.w = N, this;
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
    const D = this.x, t = this.y, N = this.z, i = this.w, z = M.elements;
    return this.x = z[0] * D + z[4] * t + z[8] * N + z[12] * i, this.y = z[1] * D + z[5] * t + z[9] * N + z[13] * i, this.z = z[2] * D + z[6] * t + z[10] * N + z[14] * i, this.w = z[3] * D + z[7] * t + z[11] * N + z[15] * i, this;
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
    let D, t, N, i;
    const I = M.elements, n = I[0], T = I[4], u = I[8], g = I[1], s = I[5], j = I[9], r = I[2], c = I[6], y = I[10];
    if (Math.abs(T - g) < 0.01 && Math.abs(u - r) < 0.01 && Math.abs(j - c) < 0.01) {
      if (Math.abs(T + g) < 0.1 && Math.abs(u + r) < 0.1 && Math.abs(j + c) < 0.1 && Math.abs(n + s + y - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      D = Math.PI;
      const a = (n + 1) / 2, C = (s + 1) / 2, x = (y + 1) / 2, l = (T + g) / 4, d = (u + r) / 4, L = (j + c) / 4;
      return a > C && a > x ? a < 0.01 ? (t = 0, N = 0.707106781, i = 0.707106781) : (t = Math.sqrt(a), N = l / t, i = d / t) : C > x ? C < 0.01 ? (t = 0.707106781, N = 0, i = 0.707106781) : (N = Math.sqrt(C), t = l / N, i = L / N) : x < 0.01 ? (t = 0.707106781, N = 0.707106781, i = 0) : (i = Math.sqrt(x), t = d / i, N = L / i), this.set(t, N, i, D), this;
    }
    let w = Math.sqrt((c - j) * (c - j) + (u - r) * (u - r) + (g - T) * (g - T));
    return Math.abs(w) < 1e-3 && (w = 1), this.x = (c - j) / w, this.y = (u - r) / w, this.z = (g - T) / w, this.w = Math.acos((n + s + y - 1) / 2), this;
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
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this;
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
let GN = class {
  constructor(M = new f(1 / 0, 1 / 0, 1 / 0), D = new f(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = M, this.max = D;
  }
  set(M, D) {
    return this.min.copy(M), this.max.copy(D), this;
  }
  setFromArray(M) {
    let D = 1 / 0, t = 1 / 0, N = 1 / 0, i = -1 / 0, z = -1 / 0, A = -1 / 0;
    for (let I = 0, n = M.length; I < n; I += 3) {
      const T = M[I], u = M[I + 1], g = M[I + 2];
      T < D && (D = T), u < t && (t = u), g < N && (N = g), T > i && (i = T), u > z && (z = u), g > A && (A = g);
    }
    return this.min.set(D, t, N), this.max.set(i, z, A), this;
  }
  setFromBufferAttribute(M) {
    let D = 1 / 0, t = 1 / 0, N = 1 / 0, i = -1 / 0, z = -1 / 0, A = -1 / 0;
    for (let I = 0, n = M.count; I < n; I++) {
      const T = M.getX(I), u = M.getY(I), g = M.getZ(I);
      T < D && (D = T), u < t && (t = u), g < N && (N = g), T > i && (i = T), u > z && (z = u), g > A && (A = g);
    }
    return this.min.set(D, t, N), this.max.set(i, z, A), this;
  }
  setFromPoints(M) {
    this.makeEmpty();
    for (let D = 0, t = M.length; D < t; D++)
      this.expandByPoint(M[D]);
    return this;
  }
  setFromCenterAndSize(M, D) {
    const t = _t.copy(D).multiplyScalar(0.5);
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
    M.updateWorldMatrix(!1, !1);
    const t = M.geometry;
    if (t !== void 0)
      if (D && t.attributes != null && t.attributes.position !== void 0) {
        const i = t.attributes.position;
        for (let z = 0, A = i.count; z < A; z++)
          _t.fromBufferAttribute(i, z).applyMatrix4(M.matrixWorld), this.expandByPoint(_t);
      } else
        t.boundingBox === null && t.computeBoundingBox(), iA.copy(t.boundingBox), iA.applyMatrix4(M.matrixWorld), this.union(iA);
    const N = M.children;
    for (let i = 0, z = N.length; i < z; i++)
      this.expandByObject(N[i], D);
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
    return this.clampPoint(M.center, _t), _t.distanceToSquared(M.center) <= M.radius * M.radius;
  }
  intersectsPlane(M) {
    let D, t;
    return M.normal.x > 0 ? (D = M.normal.x * this.min.x, t = M.normal.x * this.max.x) : (D = M.normal.x * this.max.x, t = M.normal.x * this.min.x), M.normal.y > 0 ? (D += M.normal.y * this.min.y, t += M.normal.y * this.max.y) : (D += M.normal.y * this.max.y, t += M.normal.y * this.min.y), M.normal.z > 0 ? (D += M.normal.z * this.min.z, t += M.normal.z * this.max.z) : (D += M.normal.z * this.max.z, t += M.normal.z * this.min.z), D <= -M.constant && t >= -M.constant;
  }
  intersectsTriangle(M) {
    if (this.isEmpty())
      return !1;
    this.getCenter($N), Ze.subVectors(this.max, $N), TN.subVectors(M.a, $N), uN.subVectors(M.b, $N), gN.subVectors(M.c, $N), xt.subVectors(uN, TN), Ot.subVectors(gN, uN), bt.subVectors(TN, gN);
    let D = [
      0,
      -xt.z,
      xt.y,
      0,
      -Ot.z,
      Ot.y,
      0,
      -bt.z,
      bt.y,
      xt.z,
      0,
      -xt.x,
      Ot.z,
      0,
      -Ot.x,
      bt.z,
      0,
      -bt.x,
      -xt.y,
      xt.x,
      0,
      -Ot.y,
      Ot.x,
      0,
      -bt.y,
      bt.x,
      0
    ];
    return !AA(D, TN, uN, gN, Ze) || (D = [1, 0, 0, 0, 1, 0, 0, 0, 1], !AA(D, TN, uN, gN, Ze)) ? !1 : (_e.crossVectors(xt, Ot), D = [_e.x, _e.y, _e.z], AA(D, TN, uN, gN, Ze));
  }
  clampPoint(M, D) {
    return D.copy(M).clamp(this.min, this.max);
  }
  distanceToPoint(M) {
    return _t.copy(M).clamp(this.min, this.max).sub(M).length();
  }
  getBoundingSphere(M) {
    return this.getCenter(M.center), M.radius = this.getSize(_t).length() * 0.5, M;
  }
  intersect(M) {
    return this.min.max(M.min), this.max.min(M.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(M) {
    return this.min.min(M.min), this.max.max(M.max), this;
  }
  applyMatrix4(M) {
    return this.isEmpty() ? this : (zt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(M), zt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(M), zt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(M), zt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(M), zt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(M), zt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(M), zt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(M), zt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(M), this.setFromPoints(zt), this);
  }
  translate(M) {
    return this.min.add(M), this.max.add(M), this;
  }
  equals(M) {
    return M.min.equals(this.min) && M.max.equals(this.max);
  }
};
const zt = [
  /* @__PURE__ */ new f(),
  /* @__PURE__ */ new f(),
  /* @__PURE__ */ new f(),
  /* @__PURE__ */ new f(),
  /* @__PURE__ */ new f(),
  /* @__PURE__ */ new f(),
  /* @__PURE__ */ new f(),
  /* @__PURE__ */ new f()
], _t = /* @__PURE__ */ new f(), iA = /* @__PURE__ */ new GN(), TN = /* @__PURE__ */ new f(), uN = /* @__PURE__ */ new f(), gN = /* @__PURE__ */ new f(), xt = /* @__PURE__ */ new f(), Ot = /* @__PURE__ */ new f(), bt = /* @__PURE__ */ new f(), $N = /* @__PURE__ */ new f(), Ze = /* @__PURE__ */ new f(), _e = /* @__PURE__ */ new f(), Kt = /* @__PURE__ */ new f();
function AA(e, M, D, t, N) {
  for (let i = 0, z = e.length - 3; i <= z; i += 3) {
    Kt.fromArray(e, i);
    const A = N.x * Math.abs(Kt.x) + N.y * Math.abs(Kt.y) + N.z * Math.abs(Kt.z), I = M.dot(Kt), n = D.dot(Kt), T = t.dot(Kt);
    if (Math.max(-Math.max(I, n, T), Math.min(I, n, T)) > A)
      return !1;
  }
  return !0;
}
const rg = /* @__PURE__ */ new GN(), JN = /* @__PURE__ */ new f(), zA = /* @__PURE__ */ new f();
let az = class {
  constructor(M = new f(), D = -1) {
    this.center = M, this.radius = D;
  }
  set(M, D) {
    return this.center.copy(M), this.radius = D, this;
  }
  setFromPoints(M, D) {
    const t = this.center;
    D !== void 0 ? t.copy(D) : rg.setFromPoints(M).getCenter(t);
    let N = 0;
    for (let i = 0, z = M.length; i < z; i++)
      N = Math.max(N, t.distanceToSquared(M[i]));
    return this.radius = Math.sqrt(N), this;
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
    JN.subVectors(M, this.center);
    const D = JN.lengthSq();
    if (D > this.radius * this.radius) {
      const t = Math.sqrt(D), N = (t - this.radius) * 0.5;
      this.center.addScaledVector(JN, N / t), this.radius += N;
    }
    return this;
  }
  union(M) {
    return M.isEmpty() ? this : this.isEmpty() ? (this.copy(M), this) : (this.center.equals(M.center) === !0 ? this.radius = Math.max(this.radius, M.radius) : (zA.subVectors(M.center, this.center).setLength(M.radius), this.expandByPoint(JN.copy(M.center).add(zA)), this.expandByPoint(JN.copy(M.center).sub(zA))), this);
  }
  equals(M) {
    return M.center.equals(this.center) && M.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
const nA = /* @__PURE__ */ new f(), cg = /* @__PURE__ */ new f(), jg = /* @__PURE__ */ new HD();
class Bt {
  constructor(M = new f(1, 0, 0), D = 0) {
    this.isPlane = !0, this.normal = M, this.constant = D;
  }
  set(M, D) {
    return this.normal.copy(M), this.constant = D, this;
  }
  setComponents(M, D, t, N) {
    return this.normal.set(M, D, t), this.constant = N, this;
  }
  setFromNormalAndCoplanarPoint(M, D) {
    return this.normal.copy(M), this.constant = -D.dot(this.normal), this;
  }
  setFromCoplanarPoints(M, D, t) {
    const N = nA.subVectors(t, D).cross(cg.subVectors(M, D)).normalize();
    return this.setFromNormalAndCoplanarPoint(N, M), this;
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
    return D.copy(this.normal).multiplyScalar(-this.distanceToPoint(M)).add(M);
  }
  intersectLine(M, D) {
    const t = M.delta(nA), N = this.normal.dot(t);
    if (N === 0)
      return this.distanceToPoint(M.start) === 0 ? D.copy(M.start) : null;
    const i = -(M.start.dot(this.normal) + this.constant) / N;
    return i < 0 || i > 1 ? null : D.copy(t).multiplyScalar(i).add(M.start);
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
    const t = D || jg.getNormalMatrix(M), N = this.coplanarPoint(nA).applyMatrix4(M), i = this.normal.applyMatrix3(t).normalize();
    return this.constant = -N.dot(i), this;
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
const sN = /* @__PURE__ */ new az(), be = /* @__PURE__ */ new f();
class oz {
  constructor(M = new Bt(), D = new Bt(), t = new Bt(), N = new Bt(), i = new Bt(), z = new Bt()) {
    this.planes = [M, D, t, N, i, z];
  }
  set(M, D, t, N, i, z) {
    const A = this.planes;
    return A[0].copy(M), A[1].copy(D), A[2].copy(t), A[3].copy(N), A[4].copy(i), A[5].copy(z), this;
  }
  copy(M) {
    const D = this.planes;
    for (let t = 0; t < 6; t++)
      D[t].copy(M.planes[t]);
    return this;
  }
  setFromProjectionMatrix(M) {
    const D = this.planes, t = M.elements, N = t[0], i = t[1], z = t[2], A = t[3], I = t[4], n = t[5], T = t[6], u = t[7], g = t[8], s = t[9], j = t[10], r = t[11], c = t[12], y = t[13], w = t[14], a = t[15];
    return D[0].setComponents(A - N, u - I, r - g, a - c).normalize(), D[1].setComponents(A + N, u + I, r + g, a + c).normalize(), D[2].setComponents(A + i, u + n, r + s, a + y).normalize(), D[3].setComponents(A - i, u - n, r - s, a - y).normalize(), D[4].setComponents(A - z, u - T, r - j, a - w).normalize(), D[5].setComponents(A + z, u + T, r + j, a + w).normalize(), this;
  }
  intersectsObject(M) {
    const D = M.geometry;
    return D.boundingSphere === null && D.computeBoundingSphere(), sN.copy(D.boundingSphere).applyMatrix4(M.matrixWorld), this.intersectsSphere(sN);
  }
  intersectsSprite(M) {
    return sN.center.set(0, 0, 0), sN.radius = 0.7071067811865476, sN.applyMatrix4(M.matrixWorld), this.intersectsSphere(sN);
  }
  intersectsSphere(M) {
    const D = this.planes, t = M.center, N = -M.radius;
    for (let i = 0; i < 6; i++)
      if (D[i].distanceToPoint(t) < N)
        return !1;
    return !0;
  }
  intersectsBox(M) {
    const D = this.planes;
    for (let t = 0; t < 6; t++) {
      const N = D[t];
      if (be.x = N.normal.x > 0 ? M.max.x : M.min.x, be.y = N.normal.y > 0 ? M.max.y : M.min.y, be.z = N.normal.z > 0 ? M.max.z : M.min.z, N.distanceToPoint(be) < 0)
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
const IA = /* @__PURE__ */ new ND(), xn = /* @__PURE__ */ new f(), On = /* @__PURE__ */ new f();
class yg {
  constructor(M) {
    this.camera = M, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new gM(512, 512), this.map = null, this.mapPass = null, this.matrix = new ND(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new oz(), this._frameExtents = new gM(1, 1), this._viewportCount = 1, this._viewports = [
      new tD(0, 0, 1, 1)
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
    xn.setFromMatrixPosition(M.matrixWorld), D.position.copy(xn), On.setFromMatrixPosition(M.target.matrixWorld), D.lookAt(On), D.updateMatrixWorld(), IA.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), this._frustum.setFromProjectionMatrix(IA), t.set(
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
    ), t.multiply(IA);
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
class DT extends GI {
  constructor(M = -1, D = 1, t = 1, N = -1, i = 0.1, z = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = M, this.right = D, this.top = t, this.bottom = N, this.near = i, this.far = z, this.updateProjectionMatrix();
  }
  copy(M, D) {
    return super.copy(M, D), this.left = M.left, this.right = M.right, this.top = M.top, this.bottom = M.bottom, this.near = M.near, this.far = M.far, this.zoom = M.zoom, this.view = M.view === null ? null : Object.assign({}, M.view), this;
  }
  setViewOffset(M, D, t, N, i, z) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = M, this.view.fullHeight = D, this.view.offsetX = t, this.view.offsetY = N, this.view.width = i, this.view.height = z, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const M = (this.right - this.left) / (2 * this.zoom), D = (this.top - this.bottom) / (2 * this.zoom), t = (this.right + this.left) / 2, N = (this.top + this.bottom) / 2;
    let i = t - M, z = t + M, A = N + D, I = N - D;
    if (this.view !== null && this.view.enabled) {
      const n = (this.right - this.left) / this.view.fullWidth / this.zoom, T = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      i += n * this.view.offsetX, z = i + n * this.view.width, A -= T * this.view.offsetY, I = A - T * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(i, z, A, I, this.near, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return D.object.zoom = this.zoom, D.object.left = this.left, D.object.right = this.right, D.object.top = this.top, D.object.bottom = this.bottom, D.object.near = this.near, D.object.far = this.far, this.view !== null && (D.object.view = Object.assign({}, this.view)), D;
  }
}
class ag extends yg {
  constructor() {
    super(new DT(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class og extends sg {
  constructor(M, D) {
    super(M, D), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(aD.DEFAULT_UP), this.updateMatrix(), this.target = new aD(), this.shadow = new ag();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(M) {
    return super.copy(M), this.target = M.target.clone(), this.shadow = M.shadow.clone(), this;
  }
}
const En = {
  enabled: !1,
  files: {},
  add: function(e, M) {
    this.enabled !== !1 && (this.files[e] = M);
  },
  get: function(e) {
    if (this.enabled !== !1)
      return this.files[e];
  },
  remove: function(e) {
    delete this.files[e];
  },
  clear: function() {
    this.files = {};
  }
};
let Cg = class {
  constructor(M, D, t) {
    const N = this;
    let i = !1, z = 0, A = 0, I;
    const n = [];
    this.onStart = void 0, this.onLoad = M, this.onProgress = D, this.onError = t, this.itemStart = function(T) {
      A++, i === !1 && N.onStart !== void 0 && N.onStart(T, z, A), i = !0;
    }, this.itemEnd = function(T) {
      z++, N.onProgress !== void 0 && N.onProgress(T, z, A), z === A && (i = !1, N.onLoad !== void 0 && N.onLoad());
    }, this.itemError = function(T) {
      N.onError !== void 0 && N.onError(T);
    }, this.resolveURL = function(T) {
      return I ? I(T) : T;
    }, this.setURLModifier = function(T) {
      return I = T, this;
    }, this.addHandler = function(T, u) {
      return n.push(T, u), this;
    }, this.removeHandler = function(T) {
      const u = n.indexOf(T);
      return u !== -1 && n.splice(u, 2), this;
    }, this.getHandler = function(T) {
      for (let u = 0, g = n.length; u < g; u += 2) {
        const s = n[u], j = n[u + 1];
        if (s.global && (s.lastIndex = 0), s.test(T))
          return j;
      }
      return null;
    };
  }
};
const Lg = /* @__PURE__ */ new Cg();
let tT = class {
  constructor(M) {
    this.manager = M !== void 0 ? M : Lg, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(M, D) {
    const t = this;
    return new Promise(function(N, i) {
      t.load(M, N, D, i);
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
function NT(e) {
  for (let M = e.length - 1; M >= 0; --M)
    if (e[M] >= 65535)
      return !0;
  return !1;
}
function Le(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
class wg extends tT {
  constructor(M) {
    super(M);
  }
  load(M, D, t, N) {
    this.path !== void 0 && (M = this.path + M), M = this.manager.resolveURL(M);
    const i = this, z = En.get(M);
    if (z !== void 0)
      return i.manager.itemStart(M), setTimeout(function() {
        D && D(z), i.manager.itemEnd(M);
      }, 0), z;
    const A = Le("img");
    function I() {
      T(), En.add(M, this), D && D(this), i.manager.itemEnd(M);
    }
    function n(u) {
      T(), N && N(u), i.manager.itemError(M), i.manager.itemEnd(M);
    }
    function T() {
      A.removeEventListener("load", I, !1), A.removeEventListener("error", n, !1);
    }
    return A.addEventListener("load", I, !1), A.addEventListener("error", n, !1), M.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (A.crossOrigin = this.crossOrigin), i.manager.itemStart(M), A.src = M, A;
  }
}
let rN, eT = class {
  static getDataURL(M) {
    if (/^data:/i.test(M.src) || typeof HTMLCanvasElement > "u")
      return M.src;
    let D;
    if (M instanceof HTMLCanvasElement)
      D = M;
    else {
      rN === void 0 && (rN = Le("canvas")), rN.width = M.width, rN.height = M.height;
      const t = rN.getContext("2d");
      M instanceof ImageData ? t.putImageData(M, 0, 0) : t.drawImage(M, 0, 0, M.width, M.height), D = rN;
    }
    return D.width > 2048 || D.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", M), D.toDataURL("image/jpeg", 0.6)) : D.toDataURL("image/png");
  }
  static sRGBToLinear(M) {
    if (typeof HTMLImageElement < "u" && M instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && M instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && M instanceof ImageBitmap) {
      const D = Le("canvas");
      D.width = M.width, D.height = M.height;
      const t = D.getContext("2d");
      t.drawImage(M, 0, 0, M.width, M.height);
      const N = t.getImageData(0, 0, M.width, M.height), i = N.data;
      for (let z = 0; z < i.length; z++)
        i[z] = $t(i[z] / 255) * 255;
      return t.putImageData(N, 0, 0), D;
    } else if (M.data) {
      const D = M.data.slice(0);
      for (let t = 0; t < D.length; t++)
        D instanceof Uint8Array || D instanceof Uint8ClampedArray ? D[t] = Math.floor($t(D[t] / 255) * 255) : D[t] = $t(D[t]);
      return {
        data: D,
        width: M.width,
        height: M.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), M;
  }
}, iT = class {
  constructor(M = null) {
    this.isSource = !0, this.uuid = FN(), this.data = M, this.version = 0;
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
    }, N = this.data;
    if (N !== null) {
      let i;
      if (Array.isArray(N)) {
        i = [];
        for (let z = 0, A = N.length; z < A; z++)
          N[z].isDataTexture ? i.push(TA(N[z].image)) : i.push(TA(N[z]));
      } else
        i = TA(N);
      t.url = i;
    }
    return D || (M.images[this.uuid] = t), t;
  }
};
function TA(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? eT.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let xg = 0, WD = class Oi extends BN {
  constructor(M = Oi.DEFAULT_IMAGE, D = Oi.DEFAULT_MAPPING, t = GD, N = GD, i = yD, z = ae, A = VD, I = DN, n = Oi.DEFAULT_ANISOTROPY, T = tN) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: xg++ }), this.uuid = FN(), this.name = "", this.source = new iT(M), this.mipmaps = [], this.mapping = D, this.wrapS = t, this.wrapT = N, this.magFilter = i, this.minFilter = z, this.anisotropy = n, this.format = A, this.internalFormat = null, this.type = I, this.offset = new gM(0, 0), this.repeat = new gM(1, 1), this.center = new gM(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new HD(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = T, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(M) {
    this.source.data = M;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.name = M.name, this.source = M.source, this.mipmaps = M.mipmaps.slice(0), this.mapping = M.mapping, this.wrapS = M.wrapS, this.wrapT = M.wrapT, this.magFilter = M.magFilter, this.minFilter = M.minFilter, this.anisotropy = M.anisotropy, this.format = M.format, this.internalFormat = M.internalFormat, this.type = M.type, this.offset.copy(M.offset), this.repeat.copy(M.repeat), this.center.copy(M.center), this.rotation = M.rotation, this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrix.copy(M.matrix), this.generateMipmaps = M.generateMipmaps, this.premultiplyAlpha = M.premultiplyAlpha, this.flipY = M.flipY, this.unpackAlignment = M.unpackAlignment, this.encoding = M.encoding, this.userData = JSON.parse(JSON.stringify(M.userData)), this.needsUpdate = !0, this;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.textures[this.uuid] !== void 0)
      return M.textures[this.uuid];
    const t = {
      metadata: {
        version: 4.5,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(M).uuid,
      mapping: this.mapping,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      type: this.type,
      encoding: this.encoding,
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
    if (this.mapping !== XI)
      return M;
    if (M.applyMatrix3(this.matrix), M.x < 0 || M.x > 1)
      switch (this.wrapS) {
        case zz:
          M.x = M.x - Math.floor(M.x);
          break;
        case GD:
          M.x = M.x < 0 ? 0 : 1;
          break;
        case nz:
          Math.abs(Math.floor(M.x) % 2) === 1 ? M.x = Math.ceil(M.x) - M.x : M.x = M.x - Math.floor(M.x);
          break;
      }
    if (M.y < 0 || M.y > 1)
      switch (this.wrapT) {
        case zz:
          M.y = M.y - Math.floor(M.y);
          break;
        case GD:
          M.y = M.y < 0 ? 0 : 1;
          break;
        case nz:
          Math.abs(Math.floor(M.y) % 2) === 1 ? M.y = Math.ceil(M.y) - M.y : M.y = M.y - Math.floor(M.y);
          break;
      }
    return this.flipY && (M.y = 1 - M.y), M;
  }
  set needsUpdate(M) {
    M === !0 && (this.version++, this.source.needsUpdate = !0);
  }
};
WD.DEFAULT_IMAGE = null;
WD.DEFAULT_MAPPING = XI;
WD.DEFAULT_ANISOTROPY = 1;
class Og extends tT {
  constructor(M) {
    super(M);
  }
  load(M, D, t, N) {
    const i = new WD(), z = new wg(this.manager);
    return z.setCrossOrigin(this.crossOrigin), z.setPath(this.path), z.load(M, function(A) {
      i.image = A, i.needsUpdate = !0, D !== void 0 && D(i);
    }, t, N), i;
  }
}
let Eg = 0, de = class extends BN {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Eg++ }), this.uuid = FN(), this.name = "", this.type = "Material", this.blending = kN, this.side = ft, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.blendSrc = HI, this.blendDst = WI, this.blendEquation = UN, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = ez, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = gg, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = tA, this.stencilZFail = tA, this.stencilZPass = tA, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
          console.warn("THREE.Material: '" + D + "' parameter is undefined.");
          continue;
        }
        const N = this[D];
        if (N === void 0) {
          console.warn("THREE." + this.type + ": '" + D + "' is not a property of this material.");
          continue;
        }
        N && N.isColor ? N.set(t) : N && N.isVector3 && t && t.isVector3 ? N.copy(t) : this[D] = t;
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
        version: 4.5,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), this.color && this.color.isColor && (t.color = this.color.getHex()), this.roughness !== void 0 && (t.roughness = this.roughness), this.metalness !== void 0 && (t.metalness = this.metalness), this.sheen !== void 0 && (t.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (t.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (t.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (t.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (t.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (t.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (t.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (t.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (t.shininess = this.shininess), this.clearcoat !== void 0 && (t.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (t.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (t.clearcoatMap = this.clearcoatMap.toJSON(M).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (t.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(M).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (t.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(M).uuid, t.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (t.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (t.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (t.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (t.iridescenceMap = this.iridescenceMap.toJSON(M).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (t.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(M).uuid), this.map && this.map.isTexture && (t.map = this.map.toJSON(M).uuid), this.matcap && this.matcap.isTexture && (t.matcap = this.matcap.toJSON(M).uuid), this.alphaMap && this.alphaMap.isTexture && (t.alphaMap = this.alphaMap.toJSON(M).uuid), this.lightMap && this.lightMap.isTexture && (t.lightMap = this.lightMap.toJSON(M).uuid, t.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (t.aoMap = this.aoMap.toJSON(M).uuid, t.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (t.bumpMap = this.bumpMap.toJSON(M).uuid, t.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (t.normalMap = this.normalMap.toJSON(M).uuid, t.normalMapType = this.normalMapType, t.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (t.displacementMap = this.displacementMap.toJSON(M).uuid, t.displacementScale = this.displacementScale, t.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (t.roughnessMap = this.roughnessMap.toJSON(M).uuid), this.metalnessMap && this.metalnessMap.isTexture && (t.metalnessMap = this.metalnessMap.toJSON(M).uuid), this.emissiveMap && this.emissiveMap.isTexture && (t.emissiveMap = this.emissiveMap.toJSON(M).uuid), this.specularMap && this.specularMap.isTexture && (t.specularMap = this.specularMap.toJSON(M).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (t.specularIntensityMap = this.specularIntensityMap.toJSON(M).uuid), this.specularColorMap && this.specularColorMap.isTexture && (t.specularColorMap = this.specularColorMap.toJSON(M).uuid), this.envMap && this.envMap.isTexture && (t.envMap = this.envMap.toJSON(M).uuid, this.combine !== void 0 && (t.combine = this.combine)), this.envMapIntensity !== void 0 && (t.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (t.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (t.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (t.gradientMap = this.gradientMap.toJSON(M).uuid), this.transmission !== void 0 && (t.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (t.transmissionMap = this.transmissionMap.toJSON(M).uuid), this.thickness !== void 0 && (t.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (t.thicknessMap = this.thicknessMap.toJSON(M).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (t.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (t.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (t.size = this.size), this.shadowSide !== null && (t.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (t.sizeAttenuation = this.sizeAttenuation), this.blending !== kN && (t.blending = this.blending), this.side !== ft && (t.side = this.side), this.vertexColors && (t.vertexColors = !0), this.opacity < 1 && (t.opacity = this.opacity), this.transparent === !0 && (t.transparent = this.transparent), t.depthFunc = this.depthFunc, t.depthTest = this.depthTest, t.depthWrite = this.depthWrite, t.colorWrite = this.colorWrite, t.stencilWrite = this.stencilWrite, t.stencilWriteMask = this.stencilWriteMask, t.stencilFunc = this.stencilFunc, t.stencilRef = this.stencilRef, t.stencilFuncMask = this.stencilFuncMask, t.stencilFail = this.stencilFail, t.stencilZFail = this.stencilZFail, t.stencilZPass = this.stencilZPass, this.rotation !== void 0 && this.rotation !== 0 && (t.rotation = this.rotation), this.polygonOffset === !0 && (t.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (t.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (t.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (t.linewidth = this.linewidth), this.dashSize !== void 0 && (t.dashSize = this.dashSize), this.gapSize !== void 0 && (t.gapSize = this.gapSize), this.scale !== void 0 && (t.scale = this.scale), this.dithering === !0 && (t.dithering = !0), this.alphaTest > 0 && (t.alphaTest = this.alphaTest), this.alphaToCoverage === !0 && (t.alphaToCoverage = this.alphaToCoverage), this.premultipliedAlpha === !0 && (t.premultipliedAlpha = this.premultipliedAlpha), this.forceSinglePass === !0 && (t.forceSinglePass = this.forceSinglePass), this.wireframe === !0 && (t.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (t.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (t.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (t.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (t.flatShading = this.flatShading), this.visible === !1 && (t.visible = !1), this.toneMapped === !1 && (t.toneMapped = !1), this.fog === !1 && (t.fog = !1), Object.keys(this.userData).length > 0 && (t.userData = this.userData);
    function N(i) {
      const z = [];
      for (const A in i) {
        const I = i[A];
        delete I.metadata, z.push(I);
      }
      return z;
    }
    if (D) {
      const i = N(M.textures), z = N(M.images);
      i.length > 0 && (t.textures = i), z.length > 0 && (t.images = z);
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
      const N = D.length;
      t = new Array(N);
      for (let i = 0; i !== N; ++i)
        t[i] = D[i].clone();
    }
    return this.clippingPlanes = t, this.clipIntersection = M.clipIntersection, this.clipShadows = M.clipShadows, this.shadowSide = M.shadowSide, this.colorWrite = M.colorWrite, this.precision = M.precision, this.polygonOffset = M.polygonOffset, this.polygonOffsetFactor = M.polygonOffsetFactor, this.polygonOffsetUnits = M.polygonOffsetUnits, this.dithering = M.dithering, this.alphaTest = M.alphaTest, this.alphaToCoverage = M.alphaToCoverage, this.premultipliedAlpha = M.premultipliedAlpha, this.forceSinglePass = M.forceSinglePass, this.visible = M.visible, this.toneMapped = M.toneMapped, this.userData = JSON.parse(JSON.stringify(M.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
};
class AT extends de {
  constructor(M) {
    super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new kM(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new kM(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = $I, this.normalScale = new gM(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = yz, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.emissive.copy(M.emissive), this.emissiveMap = M.emissiveMap, this.emissiveIntensity = M.emissiveIntensity, this.bumpMap = M.bumpMap, this.bumpScale = M.bumpScale, this.normalMap = M.normalMap, this.normalMapType = M.normalMapType, this.normalScale.copy(M.normalScale), this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.flatShading = M.flatShading, this.fog = M.fog, this;
  }
}
const nt = /* @__PURE__ */ new f(), uA = /* @__PURE__ */ new f(), Ke = /* @__PURE__ */ new f(), Et = /* @__PURE__ */ new f(), gA = /* @__PURE__ */ new f(), Re = /* @__PURE__ */ new f(), sA = /* @__PURE__ */ new f();
let lg = class {
  constructor(M = new f(), D = new f(0, 0, -1)) {
    this.origin = M, this.direction = D;
  }
  set(M, D) {
    return this.origin.copy(M), this.direction.copy(D), this;
  }
  copy(M) {
    return this.origin.copy(M.origin), this.direction.copy(M.direction), this;
  }
  at(M, D) {
    return D.copy(this.direction).multiplyScalar(M).add(this.origin);
  }
  lookAt(M) {
    return this.direction.copy(M).sub(this.origin).normalize(), this;
  }
  recast(M) {
    return this.origin.copy(this.at(M, nt)), this;
  }
  closestPointToPoint(M, D) {
    D.subVectors(M, this.origin);
    const t = D.dot(this.direction);
    return t < 0 ? D.copy(this.origin) : D.copy(this.direction).multiplyScalar(t).add(this.origin);
  }
  distanceToPoint(M) {
    return Math.sqrt(this.distanceSqToPoint(M));
  }
  distanceSqToPoint(M) {
    const D = nt.subVectors(M, this.origin).dot(this.direction);
    return D < 0 ? this.origin.distanceToSquared(M) : (nt.copy(this.direction).multiplyScalar(D).add(this.origin), nt.distanceToSquared(M));
  }
  distanceSqToSegment(M, D, t, N) {
    uA.copy(M).add(D).multiplyScalar(0.5), Ke.copy(D).sub(M).normalize(), Et.copy(this.origin).sub(uA);
    const i = M.distanceTo(D) * 0.5, z = -this.direction.dot(Ke), A = Et.dot(this.direction), I = -Et.dot(Ke), n = Et.lengthSq(), T = Math.abs(1 - z * z);
    let u, g, s, j;
    if (T > 0)
      if (u = z * I - A, g = z * A - I, j = i * T, u >= 0)
        if (g >= -j)
          if (g <= j) {
            const r = 1 / T;
            u *= r, g *= r, s = u * (u + z * g + 2 * A) + g * (z * u + g + 2 * I) + n;
          } else
            g = i, u = Math.max(0, -(z * g + A)), s = -u * u + g * (g + 2 * I) + n;
        else
          g = -i, u = Math.max(0, -(z * g + A)), s = -u * u + g * (g + 2 * I) + n;
      else
        g <= -j ? (u = Math.max(0, -(-z * i + A)), g = u > 0 ? -i : Math.min(Math.max(-i, -I), i), s = -u * u + g * (g + 2 * I) + n) : g <= j ? (u = 0, g = Math.min(Math.max(-i, -I), i), s = g * (g + 2 * I) + n) : (u = Math.max(0, -(z * i + A)), g = u > 0 ? i : Math.min(Math.max(-i, -I), i), s = -u * u + g * (g + 2 * I) + n);
    else
      g = z > 0 ? -i : i, u = Math.max(0, -(z * g + A)), s = -u * u + g * (g + 2 * I) + n;
    return t && t.copy(this.direction).multiplyScalar(u).add(this.origin), N && N.copy(Ke).multiplyScalar(g).add(uA), s;
  }
  intersectSphere(M, D) {
    nt.subVectors(M.center, this.origin);
    const t = nt.dot(this.direction), N = nt.dot(nt) - t * t, i = M.radius * M.radius;
    if (N > i)
      return null;
    const z = Math.sqrt(i - N), A = t - z, I = t + z;
    return A < 0 && I < 0 ? null : A < 0 ? this.at(I, D) : this.at(A, D);
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
    let t, N, i, z, A, I;
    const n = 1 / this.direction.x, T = 1 / this.direction.y, u = 1 / this.direction.z, g = this.origin;
    return n >= 0 ? (t = (M.min.x - g.x) * n, N = (M.max.x - g.x) * n) : (t = (M.max.x - g.x) * n, N = (M.min.x - g.x) * n), T >= 0 ? (i = (M.min.y - g.y) * T, z = (M.max.y - g.y) * T) : (i = (M.max.y - g.y) * T, z = (M.min.y - g.y) * T), t > z || i > N || ((i > t || isNaN(t)) && (t = i), (z < N || isNaN(N)) && (N = z), u >= 0 ? (A = (M.min.z - g.z) * u, I = (M.max.z - g.z) * u) : (A = (M.max.z - g.z) * u, I = (M.min.z - g.z) * u), t > I || A > N) || ((A > t || t !== t) && (t = A), (I < N || N !== N) && (N = I), N < 0) ? null : this.at(t >= 0 ? t : N, D);
  }
  intersectsBox(M) {
    return this.intersectBox(M, nt) !== null;
  }
  intersectTriangle(M, D, t, N, i) {
    gA.subVectors(D, M), Re.subVectors(t, M), sA.crossVectors(gA, Re);
    let z = this.direction.dot(sA), A;
    if (z > 0) {
      if (N)
        return null;
      A = 1;
    } else if (z < 0)
      A = -1, z = -z;
    else
      return null;
    Et.subVectors(this.origin, M);
    const I = A * this.direction.dot(Re.crossVectors(Et, Re));
    if (I < 0)
      return null;
    const n = A * this.direction.dot(gA.cross(Et));
    if (n < 0 || I + n > z)
      return null;
    const T = -A * Et.dot(sA);
    return T < 0 ? null : this.at(T / z, i);
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
const RD = /* @__PURE__ */ new f(), It = /* @__PURE__ */ new f(), rA = /* @__PURE__ */ new f(), Tt = /* @__PURE__ */ new f(), cN = /* @__PURE__ */ new f(), jN = /* @__PURE__ */ new f(), ln = /* @__PURE__ */ new f(), cA = /* @__PURE__ */ new f(), jA = /* @__PURE__ */ new f(), yA = /* @__PURE__ */ new f();
let aA = class fN {
  constructor(M = new f(), D = new f(), t = new f()) {
    this.a = M, this.b = D, this.c = t;
  }
  static getNormal(M, D, t, N) {
    N.subVectors(t, D), RD.subVectors(M, D), N.cross(RD);
    const i = N.lengthSq();
    return i > 0 ? N.multiplyScalar(1 / Math.sqrt(i)) : N.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(M, D, t, N, i) {
    RD.subVectors(N, D), It.subVectors(t, D), rA.subVectors(M, D);
    const z = RD.dot(RD), A = RD.dot(It), I = RD.dot(rA), n = It.dot(It), T = It.dot(rA), u = z * n - A * A;
    if (u === 0)
      return i.set(-2, -1, -1);
    const g = 1 / u, s = (n * I - A * T) * g, j = (z * T - A * I) * g;
    return i.set(1 - s - j, j, s);
  }
  static containsPoint(M, D, t, N) {
    return this.getBarycoord(M, D, t, N, Tt), Tt.x >= 0 && Tt.y >= 0 && Tt.x + Tt.y <= 1;
  }
  static getUV(M, D, t, N, i, z, A, I) {
    return this.getBarycoord(M, D, t, N, Tt), I.set(0, 0), I.addScaledVector(i, Tt.x), I.addScaledVector(z, Tt.y), I.addScaledVector(A, Tt.z), I;
  }
  static isFrontFacing(M, D, t, N) {
    return RD.subVectors(t, D), It.subVectors(M, D), RD.cross(It).dot(N) < 0;
  }
  set(M, D, t) {
    return this.a.copy(M), this.b.copy(D), this.c.copy(t), this;
  }
  setFromPointsAndIndices(M, D, t, N) {
    return this.a.copy(M[D]), this.b.copy(M[t]), this.c.copy(M[N]), this;
  }
  setFromAttributeAndIndices(M, D, t, N) {
    return this.a.fromBufferAttribute(M, D), this.b.fromBufferAttribute(M, t), this.c.fromBufferAttribute(M, N), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.a.copy(M.a), this.b.copy(M.b), this.c.copy(M.c), this;
  }
  getArea() {
    return RD.subVectors(this.c, this.b), It.subVectors(this.a, this.b), RD.cross(It).length() * 0.5;
  }
  getMidpoint(M) {
    return M.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(M) {
    return fN.getNormal(this.a, this.b, this.c, M);
  }
  getPlane(M) {
    return M.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(M, D) {
    return fN.getBarycoord(M, this.a, this.b, this.c, D);
  }
  getUV(M, D, t, N, i) {
    return fN.getUV(M, this.a, this.b, this.c, D, t, N, i);
  }
  containsPoint(M) {
    return fN.containsPoint(M, this.a, this.b, this.c);
  }
  isFrontFacing(M) {
    return fN.isFrontFacing(this.a, this.b, this.c, M);
  }
  intersectsBox(M) {
    return M.intersectsTriangle(this);
  }
  closestPointToPoint(M, D) {
    const t = this.a, N = this.b, i = this.c;
    let z, A;
    cN.subVectors(N, t), jN.subVectors(i, t), cA.subVectors(M, t);
    const I = cN.dot(cA), n = jN.dot(cA);
    if (I <= 0 && n <= 0)
      return D.copy(t);
    jA.subVectors(M, N);
    const T = cN.dot(jA), u = jN.dot(jA);
    if (T >= 0 && u <= T)
      return D.copy(N);
    const g = I * u - T * n;
    if (g <= 0 && I >= 0 && T <= 0)
      return z = I / (I - T), D.copy(t).addScaledVector(cN, z);
    yA.subVectors(M, i);
    const s = cN.dot(yA), j = jN.dot(yA);
    if (j >= 0 && s <= j)
      return D.copy(i);
    const r = s * n - I * j;
    if (r <= 0 && n >= 0 && j <= 0)
      return A = n / (n - j), D.copy(t).addScaledVector(jN, A);
    const c = T * j - s * u;
    if (c <= 0 && u - T >= 0 && s - j >= 0)
      return ln.subVectors(i, N), A = (u - T) / (u - T + (s - j)), D.copy(N).addScaledVector(ln, A);
    const y = 1 / (c + r + g);
    return z = r * y, A = g * y, D.copy(t).addScaledVector(cN, z).addScaledVector(jN, A);
  }
  equals(M) {
    return M.a.equals(this.a) && M.b.equals(this.b) && M.c.equals(this.c);
  }
}, zT = class extends de {
  constructor(M) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new kM(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = yz, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.fog = M.fog, this;
  }
};
const PM = /* @__PURE__ */ new f(), Pe = /* @__PURE__ */ new gM();
let Mt = class {
  constructor(M, D, t = !1) {
    if (Array.isArray(M))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = M, this.itemSize = D, this.count = M !== void 0 ? M.length / D : 0, this.normalized = t, this.usage = Ln, this.updateRange = { offset: 0, count: -1 }, this.version = 0;
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
    return this.name = M.name, this.array = new M.array.constructor(M.array), this.itemSize = M.itemSize, this.count = M.count, this.normalized = M.normalized, this.usage = M.usage, this;
  }
  copyAt(M, D, t) {
    M *= this.itemSize, t *= D.itemSize;
    for (let N = 0, i = this.itemSize; N < i; N++)
      this.array[M + N] = D.array[t + N];
    return this;
  }
  copyArray(M) {
    return this.array.set(M), this;
  }
  applyMatrix3(M) {
    if (this.itemSize === 2)
      for (let D = 0, t = this.count; D < t; D++)
        Pe.fromBufferAttribute(this, D), Pe.applyMatrix3(M), this.setXY(D, Pe.x, Pe.y);
    else if (this.itemSize === 3)
      for (let D = 0, t = this.count; D < t; D++)
        PM.fromBufferAttribute(this, D), PM.applyMatrix3(M), this.setXYZ(D, PM.x, PM.y, PM.z);
    return this;
  }
  applyMatrix4(M) {
    for (let D = 0, t = this.count; D < t; D++)
      PM.fromBufferAttribute(this, D), PM.applyMatrix4(M), this.setXYZ(D, PM.x, PM.y, PM.z);
    return this;
  }
  applyNormalMatrix(M) {
    for (let D = 0, t = this.count; D < t; D++)
      PM.fromBufferAttribute(this, D), PM.applyNormalMatrix(M), this.setXYZ(D, PM.x, PM.y, PM.z);
    return this;
  }
  transformDirection(M) {
    for (let D = 0, t = this.count; D < t; D++)
      PM.fromBufferAttribute(this, D), PM.transformDirection(M), this.setXYZ(D, PM.x, PM.y, PM.z);
    return this;
  }
  set(M, D = 0) {
    return this.array.set(M, D), this;
  }
  getX(M) {
    let D = this.array[M * this.itemSize];
    return this.normalized && (D = fe(D, this.array)), D;
  }
  setX(M, D) {
    return this.normalized && (D = LD(D, this.array)), this.array[M * this.itemSize] = D, this;
  }
  getY(M) {
    let D = this.array[M * this.itemSize + 1];
    return this.normalized && (D = fe(D, this.array)), D;
  }
  setY(M, D) {
    return this.normalized && (D = LD(D, this.array)), this.array[M * this.itemSize + 1] = D, this;
  }
  getZ(M) {
    let D = this.array[M * this.itemSize + 2];
    return this.normalized && (D = fe(D, this.array)), D;
  }
  setZ(M, D) {
    return this.normalized && (D = LD(D, this.array)), this.array[M * this.itemSize + 2] = D, this;
  }
  getW(M) {
    let D = this.array[M * this.itemSize + 3];
    return this.normalized && (D = fe(D, this.array)), D;
  }
  setW(M, D) {
    return this.normalized && (D = LD(D, this.array)), this.array[M * this.itemSize + 3] = D, this;
  }
  setXY(M, D, t) {
    return M *= this.itemSize, this.normalized && (D = LD(D, this.array), t = LD(t, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this;
  }
  setXYZ(M, D, t, N) {
    return M *= this.itemSize, this.normalized && (D = LD(D, this.array), t = LD(t, this.array), N = LD(N, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this.array[M + 2] = N, this;
  }
  setXYZW(M, D, t, N, i) {
    return M *= this.itemSize, this.normalized && (D = LD(D, this.array), t = LD(t, this.array), N = LD(N, this.array), i = LD(i, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this.array[M + 2] = N, this.array[M + 3] = i, this;
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
    return this.name !== "" && (M.name = this.name), this.usage !== Ln && (M.usage = this.usage), (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (M.updateRange = this.updateRange), M;
  }
  // @deprecated
  copyColorsArray() {
    console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.");
  }
  copyVector2sArray() {
    console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.");
  }
  copyVector3sArray() {
    console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.");
  }
  copyVector4sArray() {
    console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.");
  }
}, nT = class extends Mt {
  constructor(M, D, t) {
    super(new Uint16Array(M), D, t);
  }
}, IT = class extends Mt {
  constructor(M, D, t) {
    super(new Uint32Array(M), D, t);
  }
}, Dt = class extends Mt {
  constructor(M, D, t) {
    super(new Float32Array(M), D, t);
  }
}, hg = 0;
const fD = /* @__PURE__ */ new ND(), oA = /* @__PURE__ */ new aD(), yN = /* @__PURE__ */ new f(), xD = /* @__PURE__ */ new GN(), Me = /* @__PURE__ */ new GN(), MD = /* @__PURE__ */ new f();
let VN = class TT extends BN {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: hg++ }), this.uuid = FN(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(M) {
    return Array.isArray(M) ? this.index = new (NT(M) ? IT : nT)(M, 1) : this.index = M, this;
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
      const i = new HD().getNormalMatrix(M);
      t.applyNormalMatrix(i), t.needsUpdate = !0;
    }
    const N = this.attributes.tangent;
    return N !== void 0 && (N.transformDirection(M), N.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(M) {
    return fD.makeRotationFromQuaternion(M), this.applyMatrix4(fD), this;
  }
  rotateX(M) {
    return fD.makeRotationX(M), this.applyMatrix4(fD), this;
  }
  rotateY(M) {
    return fD.makeRotationY(M), this.applyMatrix4(fD), this;
  }
  rotateZ(M) {
    return fD.makeRotationZ(M), this.applyMatrix4(fD), this;
  }
  translate(M, D, t) {
    return fD.makeTranslation(M, D, t), this.applyMatrix4(fD), this;
  }
  scale(M, D, t) {
    return fD.makeScale(M, D, t), this.applyMatrix4(fD), this;
  }
  lookAt(M) {
    return oA.lookAt(M), oA.updateMatrix(), this.applyMatrix4(oA.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(yN).negate(), this.translate(yN.x, yN.y, yN.z), this;
  }
  setFromPoints(M) {
    const D = [];
    for (let t = 0, N = M.length; t < N; t++) {
      const i = M[t];
      D.push(i.x, i.y, i.z || 0);
    }
    return this.setAttribute("position", new Dt(D, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new GN());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new f(-1 / 0, -1 / 0, -1 / 0),
        new f(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (M !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(M), D)
        for (let t = 0, N = D.length; t < N; t++) {
          const i = D[t];
          xD.setFromBufferAttribute(i), this.morphTargetsRelative ? (MD.addVectors(this.boundingBox.min, xD.min), this.boundingBox.expandByPoint(MD), MD.addVectors(this.boundingBox.max, xD.max), this.boundingBox.expandByPoint(MD)) : (this.boundingBox.expandByPoint(xD.min), this.boundingBox.expandByPoint(xD.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new az());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new f(), 1 / 0);
      return;
    }
    if (M) {
      const t = this.boundingSphere.center;
      if (xD.setFromBufferAttribute(M), D)
        for (let i = 0, z = D.length; i < z; i++) {
          const A = D[i];
          Me.setFromBufferAttribute(A), this.morphTargetsRelative ? (MD.addVectors(xD.min, Me.min), xD.expandByPoint(MD), MD.addVectors(xD.max, Me.max), xD.expandByPoint(MD)) : (xD.expandByPoint(Me.min), xD.expandByPoint(Me.max));
        }
      xD.getCenter(t);
      let N = 0;
      for (let i = 0, z = M.count; i < z; i++)
        MD.fromBufferAttribute(M, i), N = Math.max(N, t.distanceToSquared(MD));
      if (D)
        for (let i = 0, z = D.length; i < z; i++) {
          const A = D[i], I = this.morphTargetsRelative;
          for (let n = 0, T = A.count; n < T; n++)
            MD.fromBufferAttribute(A, n), I && (yN.fromBufferAttribute(M, n), MD.add(yN)), N = Math.max(N, t.distanceToSquared(MD));
        }
      this.boundingSphere.radius = Math.sqrt(N), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const M = this.index, D = this.attributes;
    if (M === null || D.position === void 0 || D.normal === void 0 || D.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const t = M.array, N = D.position.array, i = D.normal.array, z = D.uv.array, A = N.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Mt(new Float32Array(4 * A), 4));
    const I = this.getAttribute("tangent").array, n = [], T = [];
    for (let p = 0; p < A; p++)
      n[p] = new f(), T[p] = new f();
    const u = new f(), g = new f(), s = new f(), j = new gM(), r = new gM(), c = new gM(), y = new f(), w = new f();
    function a(p, P, H) {
      u.fromArray(N, p * 3), g.fromArray(N, P * 3), s.fromArray(N, H * 3), j.fromArray(z, p * 2), r.fromArray(z, P * 2), c.fromArray(z, H * 2), g.sub(u), s.sub(u), r.sub(j), c.sub(j);
      const Q = 1 / (r.x * c.y - c.x * r.y);
      isFinite(Q) && (y.copy(g).multiplyScalar(c.y).addScaledVector(s, -r.y).multiplyScalar(Q), w.copy(s).multiplyScalar(r.x).addScaledVector(g, -c.x).multiplyScalar(Q), n[p].add(y), n[P].add(y), n[H].add(y), T[p].add(w), T[P].add(w), T[H].add(w));
    }
    let C = this.groups;
    C.length === 0 && (C = [{
      start: 0,
      count: t.length
    }]);
    for (let p = 0, P = C.length; p < P; ++p) {
      const H = C[p], Q = H.start, U = H.count;
      for (let Z = Q, W = Q + U; Z < W; Z += 3)
        a(
          t[Z + 0],
          t[Z + 1],
          t[Z + 2]
        );
    }
    const x = new f(), l = new f(), d = new f(), L = new f();
    function h(p) {
      d.fromArray(i, p * 3), L.copy(d);
      const P = n[p];
      x.copy(P), x.sub(d.multiplyScalar(d.dot(P))).normalize(), l.crossVectors(L, P);
      const Q = l.dot(T[p]) < 0 ? -1 : 1;
      I[p * 4] = x.x, I[p * 4 + 1] = x.y, I[p * 4 + 2] = x.z, I[p * 4 + 3] = Q;
    }
    for (let p = 0, P = C.length; p < P; ++p) {
      const H = C[p], Q = H.start, U = H.count;
      for (let Z = Q, W = Q + U; Z < W; Z += 3)
        h(t[Z + 0]), h(t[Z + 1]), h(t[Z + 2]);
    }
  }
  computeVertexNormals() {
    const M = this.index, D = this.getAttribute("position");
    if (D !== void 0) {
      let t = this.getAttribute("normal");
      if (t === void 0)
        t = new Mt(new Float32Array(D.count * 3), 3), this.setAttribute("normal", t);
      else
        for (let g = 0, s = t.count; g < s; g++)
          t.setXYZ(g, 0, 0, 0);
      const N = new f(), i = new f(), z = new f(), A = new f(), I = new f(), n = new f(), T = new f(), u = new f();
      if (M)
        for (let g = 0, s = M.count; g < s; g += 3) {
          const j = M.getX(g + 0), r = M.getX(g + 1), c = M.getX(g + 2);
          N.fromBufferAttribute(D, j), i.fromBufferAttribute(D, r), z.fromBufferAttribute(D, c), T.subVectors(z, i), u.subVectors(N, i), T.cross(u), A.fromBufferAttribute(t, j), I.fromBufferAttribute(t, r), n.fromBufferAttribute(t, c), A.add(T), I.add(T), n.add(T), t.setXYZ(j, A.x, A.y, A.z), t.setXYZ(r, I.x, I.y, I.z), t.setXYZ(c, n.x, n.y, n.z);
        }
      else
        for (let g = 0, s = D.count; g < s; g += 3)
          N.fromBufferAttribute(D, g + 0), i.fromBufferAttribute(D, g + 1), z.fromBufferAttribute(D, g + 2), T.subVectors(z, i), u.subVectors(N, i), T.cross(u), t.setXYZ(g + 0, T.x, T.y, T.z), t.setXYZ(g + 1, T.x, T.y, T.z), t.setXYZ(g + 2, T.x, T.y, T.z);
      this.normalizeNormals(), t.needsUpdate = !0;
    }
  }
  // @deprecated since r144
  merge() {
    return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."), this;
  }
  normalizeNormals() {
    const M = this.attributes.normal;
    for (let D = 0, t = M.count; D < t; D++)
      MD.fromBufferAttribute(M, D), MD.normalize(), M.setXYZ(D, MD.x, MD.y, MD.z);
  }
  toNonIndexed() {
    function M(A, I) {
      const n = A.array, T = A.itemSize, u = A.normalized, g = new n.constructor(I.length * T);
      let s = 0, j = 0;
      for (let r = 0, c = I.length; r < c; r++) {
        A.isInterleavedBufferAttribute ? s = I[r] * A.data.stride + A.offset : s = I[r] * T;
        for (let y = 0; y < T; y++)
          g[j++] = n[s++];
      }
      return new Mt(g, T, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const D = new TT(), t = this.index.array, N = this.attributes;
    for (const A in N) {
      const I = N[A], n = M(I, t);
      D.setAttribute(A, n);
    }
    const i = this.morphAttributes;
    for (const A in i) {
      const I = [], n = i[A];
      for (let T = 0, u = n.length; T < u; T++) {
        const g = n[T], s = M(g, t);
        I.push(s);
      }
      D.morphAttributes[A] = I;
    }
    D.morphTargetsRelative = this.morphTargetsRelative;
    const z = this.groups;
    for (let A = 0, I = z.length; A < I; A++) {
      const n = z[A];
      D.addGroup(n.start, n.count, n.materialIndex);
    }
    return D;
  }
  toJSON() {
    const M = {
      metadata: {
        version: 4.5,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (M.uuid = this.uuid, M.type = this.type, this.name !== "" && (M.name = this.name), Object.keys(this.userData).length > 0 && (M.userData = this.userData), this.parameters !== void 0) {
      const I = this.parameters;
      for (const n in I)
        I[n] !== void 0 && (M[n] = I[n]);
      return M;
    }
    M.data = { attributes: {} };
    const D = this.index;
    D !== null && (M.data.index = {
      type: D.array.constructor.name,
      array: Array.prototype.slice.call(D.array)
    });
    const t = this.attributes;
    for (const I in t) {
      const n = t[I];
      M.data.attributes[I] = n.toJSON(M.data);
    }
    const N = {};
    let i = !1;
    for (const I in this.morphAttributes) {
      const n = this.morphAttributes[I], T = [];
      for (let u = 0, g = n.length; u < g; u++) {
        const s = n[u];
        T.push(s.toJSON(M.data));
      }
      T.length > 0 && (N[I] = T, i = !0);
    }
    i && (M.data.morphAttributes = N, M.data.morphTargetsRelative = this.morphTargetsRelative);
    const z = this.groups;
    z.length > 0 && (M.data.groups = JSON.parse(JSON.stringify(z)));
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
    const N = M.attributes;
    for (const n in N) {
      const T = N[n];
      this.setAttribute(n, T.clone(D));
    }
    const i = M.morphAttributes;
    for (const n in i) {
      const T = [], u = i[n];
      for (let g = 0, s = u.length; g < s; g++)
        T.push(u[g].clone(D));
      this.morphAttributes[n] = T;
    }
    this.morphTargetsRelative = M.morphTargetsRelative;
    const z = M.groups;
    for (let n = 0, T = z.length; n < T; n++) {
      const u = z[n];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const A = M.boundingBox;
    A !== null && (this.boundingBox = A.clone());
    const I = M.boundingSphere;
    return I !== null && (this.boundingSphere = I.clone()), this.drawRange.start = M.drawRange.start, this.drawRange.count = M.drawRange.count, this.userData = M.userData, M.parameters !== void 0 && (this.parameters = Object.assign({}, M.parameters)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
const hn = /* @__PURE__ */ new ND(), aN = /* @__PURE__ */ new lg(), CA = /* @__PURE__ */ new az(), De = /* @__PURE__ */ new f(), te = /* @__PURE__ */ new f(), Ne = /* @__PURE__ */ new f(), LA = /* @__PURE__ */ new f(), Fe = /* @__PURE__ */ new f(), Be = /* @__PURE__ */ new gM(), Ge = /* @__PURE__ */ new gM(), Ve = /* @__PURE__ */ new gM(), wA = /* @__PURE__ */ new f(), He = /* @__PURE__ */ new f();
let JD = class extends aD {
  constructor(M = new VN(), D = new zT()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), M.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = M.morphTargetInfluences.slice()), M.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, M.morphTargetDictionary)), this.material = M.material, this.geometry = M.geometry, this;
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, t = Object.keys(D);
    if (t.length > 0) {
      const N = D[t[0]];
      if (N !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, z = N.length; i < z; i++) {
          const A = N[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = i;
        }
      }
    }
  }
  getVertexPosition(M, D) {
    const t = this.geometry, N = t.attributes.position, i = t.morphAttributes.position, z = t.morphTargetsRelative;
    D.fromBufferAttribute(N, M);
    const A = this.morphTargetInfluences;
    if (i && A) {
      Fe.set(0, 0, 0);
      for (let I = 0, n = i.length; I < n; I++) {
        const T = A[I], u = i[I];
        T !== 0 && (LA.fromBufferAttribute(u, M), z ? Fe.addScaledVector(LA, T) : Fe.addScaledVector(LA.sub(D), T));
      }
      D.add(Fe);
    }
    return this.isSkinnedMesh && this.boneTransform(M, D), D;
  }
  raycast(M, D) {
    const t = this.geometry, N = this.material, i = this.matrixWorld;
    if (N === void 0 || (t.boundingSphere === null && t.computeBoundingSphere(), CA.copy(t.boundingSphere), CA.applyMatrix4(i), M.ray.intersectsSphere(CA) === !1) || (hn.copy(i).invert(), aN.copy(M.ray).applyMatrix4(hn), t.boundingBox !== null && aN.intersectsBox(t.boundingBox) === !1))
      return;
    let z;
    const A = t.index, I = t.attributes.position, n = t.attributes.uv, T = t.attributes.uv2, u = t.groups, g = t.drawRange;
    if (A !== null)
      if (Array.isArray(N))
        for (let s = 0, j = u.length; s < j; s++) {
          const r = u[s], c = N[r.materialIndex], y = Math.max(r.start, g.start), w = Math.min(A.count, Math.min(r.start + r.count, g.start + g.count));
          for (let a = y, C = w; a < C; a += 3) {
            const x = A.getX(a), l = A.getX(a + 1), d = A.getX(a + 2);
            z = We(this, c, M, aN, n, T, x, l, d), z && (z.faceIndex = Math.floor(a / 3), z.face.materialIndex = r.materialIndex, D.push(z));
          }
        }
      else {
        const s = Math.max(0, g.start), j = Math.min(A.count, g.start + g.count);
        for (let r = s, c = j; r < c; r += 3) {
          const y = A.getX(r), w = A.getX(r + 1), a = A.getX(r + 2);
          z = We(this, N, M, aN, n, T, y, w, a), z && (z.faceIndex = Math.floor(r / 3), D.push(z));
        }
      }
    else if (I !== void 0)
      if (Array.isArray(N))
        for (let s = 0, j = u.length; s < j; s++) {
          const r = u[s], c = N[r.materialIndex], y = Math.max(r.start, g.start), w = Math.min(I.count, Math.min(r.start + r.count, g.start + g.count));
          for (let a = y, C = w; a < C; a += 3) {
            const x = a, l = a + 1, d = a + 2;
            z = We(this, c, M, aN, n, T, x, l, d), z && (z.faceIndex = Math.floor(a / 3), z.face.materialIndex = r.materialIndex, D.push(z));
          }
        }
      else {
        const s = Math.max(0, g.start), j = Math.min(I.count, g.start + g.count);
        for (let r = s, c = j; r < c; r += 3) {
          const y = r, w = r + 1, a = r + 2;
          z = We(this, N, M, aN, n, T, y, w, a), z && (z.faceIndex = Math.floor(r / 3), D.push(z));
        }
      }
  }
};
function dg(e, M, D, t, N, i, z, A) {
  let I;
  if (M.side === dD ? I = t.intersectTriangle(z, i, N, !0, A) : I = t.intersectTriangle(N, i, z, M.side === ft, A), I === null)
    return null;
  He.copy(A), He.applyMatrix4(e.matrixWorld);
  const n = D.ray.origin.distanceTo(He);
  return n < D.near || n > D.far ? null : {
    distance: n,
    point: He.clone(),
    object: e
  };
}
function We(e, M, D, t, N, i, z, A, I) {
  e.getVertexPosition(z, De), e.getVertexPosition(A, te), e.getVertexPosition(I, Ne);
  const n = dg(e, M, D, t, De, te, Ne, wA);
  if (n) {
    N && (Be.fromBufferAttribute(N, z), Ge.fromBufferAttribute(N, A), Ve.fromBufferAttribute(N, I), n.uv = aA.getUV(wA, De, te, Ne, Be, Ge, Ve, new gM())), i && (Be.fromBufferAttribute(i, z), Ge.fromBufferAttribute(i, A), Ve.fromBufferAttribute(i, I), n.uv2 = aA.getUV(wA, De, te, Ne, Be, Ge, Ve, new gM()));
    const T = {
      a: z,
      b: A,
      c: I,
      normal: new f(),
      materialIndex: 0
    };
    aA.getNormal(De, te, Ne, T.normal), n.face = T;
  }
  return n;
}
function uT() {
  let e = null, M = !1, D = null, t = null;
  function N(i, z) {
    D(i, z), t = e.requestAnimationFrame(N);
  }
  return {
    start: function() {
      M !== !0 && D !== null && (t = e.requestAnimationFrame(N), M = !0);
    },
    stop: function() {
      e.cancelAnimationFrame(t), M = !1;
    },
    setAnimationLoop: function(i) {
      D = i;
    },
    setContext: function(i) {
      e = i;
    }
  };
}
function vg(e, M) {
  const D = M.isWebGL2, t = /* @__PURE__ */ new WeakMap();
  function N(n, T) {
    const u = n.array, g = n.usage, s = e.createBuffer();
    e.bindBuffer(T, s), e.bufferData(T, u, g), n.onUploadCallback();
    let j;
    if (u instanceof Float32Array)
      j = e.FLOAT;
    else if (u instanceof Uint16Array)
      if (n.isFloat16BufferAttribute)
        if (D)
          j = e.HALF_FLOAT;
        else
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else
        j = e.UNSIGNED_SHORT;
    else if (u instanceof Int16Array)
      j = e.SHORT;
    else if (u instanceof Uint32Array)
      j = e.UNSIGNED_INT;
    else if (u instanceof Int32Array)
      j = e.INT;
    else if (u instanceof Int8Array)
      j = e.BYTE;
    else if (u instanceof Uint8Array)
      j = e.UNSIGNED_BYTE;
    else if (u instanceof Uint8ClampedArray)
      j = e.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + u);
    return {
      buffer: s,
      type: j,
      bytesPerElement: u.BYTES_PER_ELEMENT,
      version: n.version
    };
  }
  function i(n, T, u) {
    const g = T.array, s = T.updateRange;
    e.bindBuffer(u, n), s.count === -1 ? e.bufferSubData(u, 0, g) : (D ? e.bufferSubData(
      u,
      s.offset * g.BYTES_PER_ELEMENT,
      g,
      s.offset,
      s.count
    ) : e.bufferSubData(
      u,
      s.offset * g.BYTES_PER_ELEMENT,
      g.subarray(s.offset, s.offset + s.count)
    ), s.count = -1), T.onUploadCallback();
  }
  function z(n) {
    return n.isInterleavedBufferAttribute && (n = n.data), t.get(n);
  }
  function A(n) {
    n.isInterleavedBufferAttribute && (n = n.data);
    const T = t.get(n);
    T && (e.deleteBuffer(T.buffer), t.delete(n));
  }
  function I(n, T) {
    if (n.isGLBufferAttribute) {
      const g = t.get(n);
      (!g || g.version < n.version) && t.set(n, {
        buffer: n.buffer,
        type: n.type,
        bytesPerElement: n.elementSize,
        version: n.version
      });
      return;
    }
    n.isInterleavedBufferAttribute && (n = n.data);
    const u = t.get(n);
    u === void 0 ? t.set(n, N(n, T)) : u.version < n.version && (i(u.buffer, n, T), u.version = n.version);
  }
  return {
    get: z,
    remove: A,
    update: I
  };
}
class ve extends VN {
  constructor(M = 1, D = 1, t = 1, N = 1, i = 1, z = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: M,
      height: D,
      depth: t,
      widthSegments: N,
      heightSegments: i,
      depthSegments: z
    };
    const A = this;
    N = Math.floor(N), i = Math.floor(i), z = Math.floor(z);
    const I = [], n = [], T = [], u = [];
    let g = 0, s = 0;
    j("z", "y", "x", -1, -1, t, D, M, z, i, 0), j("z", "y", "x", 1, -1, t, D, -M, z, i, 1), j("x", "z", "y", 1, 1, M, t, D, N, z, 2), j("x", "z", "y", 1, -1, M, t, -D, N, z, 3), j("x", "y", "z", 1, -1, M, D, t, N, i, 4), j("x", "y", "z", -1, -1, M, D, -t, N, i, 5), this.setIndex(I), this.setAttribute("position", new Dt(n, 3)), this.setAttribute("normal", new Dt(T, 3)), this.setAttribute("uv", new Dt(u, 2));
    function j(r, c, y, w, a, C, x, l, d, L, h) {
      const p = C / d, P = x / L, H = C / 2, Q = x / 2, U = l / 2, Z = d + 1, W = L + 1;
      let X = 0, F = 0;
      const J = new f();
      for (let $ = 0; $ < W; $++) {
        const IM = $ * P - Q;
        for (let S = 0; S < Z; S++) {
          const V = S * p - H;
          J[r] = V * w, J[c] = IM * a, J[y] = U, n.push(J.x, J.y, J.z), J[r] = 0, J[c] = 0, J[y] = l > 0 ? 1 : -1, T.push(J.x, J.y, J.z), u.push(S / d), u.push(1 - $ / L), X += 1;
        }
      }
      for (let $ = 0; $ < L; $++)
        for (let IM = 0; IM < d; IM++) {
          const S = g + IM + Z * $, V = g + IM + Z * ($ + 1), NM = g + (IM + 1) + Z * ($ + 1), eM = g + (IM + 1) + Z * $;
          I.push(S, V, eM), I.push(V, NM, eM), F += 6;
        }
      A.addGroup(s, F, h), s += F, g += X;
    }
  }
  static fromJSON(M) {
    return new ve(M.width, M.height, M.depth, M.widthSegments, M.heightSegments, M.depthSegments);
  }
}
class Cz extends VN {
  constructor(M = 1, D = 1, t = 1, N = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: M,
      height: D,
      widthSegments: t,
      heightSegments: N
    };
    const i = M / 2, z = D / 2, A = Math.floor(t), I = Math.floor(N), n = A + 1, T = I + 1, u = M / A, g = D / I, s = [], j = [], r = [], c = [];
    for (let y = 0; y < T; y++) {
      const w = y * g - z;
      for (let a = 0; a < n; a++) {
        const C = a * u - i;
        j.push(C, -w, 0), r.push(0, 0, 1), c.push(a / A), c.push(1 - y / I);
      }
    }
    for (let y = 0; y < I; y++)
      for (let w = 0; w < A; w++) {
        const a = w + n * y, C = w + n * (y + 1), x = w + 1 + n * (y + 1), l = w + 1 + n * y;
        s.push(a, C, l), s.push(C, x, l);
      }
    this.setIndex(s), this.setAttribute("position", new Dt(j, 3)), this.setAttribute("normal", new Dt(r, 3)), this.setAttribute("uv", new Dt(c, 2));
  }
  static fromJSON(M) {
    return new Cz(M.width, M.height, M.widthSegments, M.heightSegments);
  }
}
function RN(e) {
  const M = {};
  for (const D in e) {
    M[D] = {};
    for (const t in e[D]) {
      const N = e[D][t];
      N && (N.isColor || N.isMatrix3 || N.isMatrix4 || N.isVector2 || N.isVector3 || N.isVector4 || N.isTexture || N.isQuaternion) ? M[D][t] = N.clone() : Array.isArray(N) ? M[D][t] = N.slice() : M[D][t] = N;
    }
  }
  return M;
}
function sD(e) {
  const M = {};
  for (let D = 0; D < e.length; D++) {
    const t = RN(e[D]);
    for (const N in t)
      M[N] = t[N];
  }
  return M;
}
function Yg(e) {
  const M = [];
  for (let D = 0; D < e.length; D++)
    M.push(e[D].clone());
  return M;
}
function gT(e) {
  return e.getRenderTarget() === null && e.outputEncoding === SM ? XD : Ce;
}
const pg = { clone: RN, merge: sD }, Ug = (
  /* glsl */
  `
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
), fg = (
  /* glsl */
  `
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`
);
class NN extends de {
  constructor(M) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Ug, this.fragmentShader = fg, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.extensions = {
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
      uv2: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, M !== void 0 && this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.fragmentShader = M.fragmentShader, this.vertexShader = M.vertexShader, this.uniforms = RN(M.uniforms), this.uniformsGroups = Yg(M.uniformsGroups), this.defines = Object.assign({}, M.defines), this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.fog = M.fog, this.lights = M.lights, this.clipping = M.clipping, this.extensions = Object.assign({}, M.extensions), this.glslVersion = M.glslVersion, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    D.glslVersion = this.glslVersion, D.uniforms = {};
    for (const N in this.uniforms) {
      const z = this.uniforms[N].value;
      z && z.isTexture ? D.uniforms[N] = {
        type: "t",
        value: z.toJSON(M).uuid
      } : z && z.isColor ? D.uniforms[N] = {
        type: "c",
        value: z.getHex()
      } : z && z.isVector2 ? D.uniforms[N] = {
        type: "v2",
        value: z.toArray()
      } : z && z.isVector3 ? D.uniforms[N] = {
        type: "v3",
        value: z.toArray()
      } : z && z.isVector4 ? D.uniforms[N] = {
        type: "v4",
        value: z.toArray()
      } : z && z.isMatrix3 ? D.uniforms[N] = {
        type: "m3",
        value: z.toArray()
      } : z && z.isMatrix4 ? D.uniforms[N] = {
        type: "m4",
        value: z.toArray()
      } : D.uniforms[N] = {
        value: z
      };
    }
    Object.keys(this.defines).length > 0 && (D.defines = this.defines), D.vertexShader = this.vertexShader, D.fragmentShader = this.fragmentShader;
    const t = {};
    for (const N in this.extensions)
      this.extensions[N] === !0 && (t[N] = !0);
    return Object.keys(t).length > 0 && (D.extensions = t), D;
  }
}
const Qg = (
  /* glsl */
  `
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vUv ).g;

#endif
`
), mg = (
  /* glsl */
  `
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`
), kg = (
  /* glsl */
  `
#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

#endif
`
), Sg = (
  /* glsl */
  `
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`
), Zg = (
  /* glsl */
  `
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`
), _g = (
  /* glsl */
  `
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`
), bg = (
  /* glsl */
  `
vec3 transformed = vec3( position );
`
), Kg = (
  /* glsl */
  `
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`
), Rg = (
  /* glsl */
  `

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );

	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

	float D = D_GGX( alpha, dotNH );

	return F * ( V * D );

}

#ifdef USE_IRIDESCENCE

	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {

		float alpha = pow2( roughness ); // UE4's roughness

		vec3 halfDir = normalize( lightDir + viewDir );

		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );

		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

		return F * ( V * D );

	}

#endif

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see referece)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light


float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

	float alpha = pow2( roughness );

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );

	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );

	return sheenColor * ( D * V );

}

#endif
`
), Pg = (
  /* glsl */
  `

#ifdef USE_IRIDESCENCE

	// XYZ to linear-sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	// Assume air interface for top
	// Note: We don't handle the case fresnel0 == 1
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float IorToFresnel0( float transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

	}

	// Fresnel equations for dielectric/dielectric interfaces.
	// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	// Evaluation XYZ sensitivity curves in Fourier space
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;

		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;

	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			 return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

		// Phase shift
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

#endif

`
), Fg = (
  /* glsl */
  `
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );

		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`
), Bg = (
  /* glsl */
  `
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

	}
	#pragma unroll_loop_end

	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

		bool clipped = true;

		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

		}
		#pragma unroll_loop_end

		if ( clipped ) discard;

	#endif

#endif
`
), Gg = (
  /* glsl */
  `
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`
), Vg = (
  /* glsl */
  `
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`
), Hg = (
  /* glsl */
  `
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`
), Wg = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`
), Xg = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`
), qg = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	varying vec3 vColor;

#endif
`
), $g = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

	vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif
`
), Jg = (
  /* glsl */
  `
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

mat3 transposeMat3( const in mat3 m ) {

	mat3 tmp;

	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

	return tmp;

}

float luminance( const in vec3 rgb ) {

	// assumes rgb is in linear color space with sRGB primaries and D65 white point

	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );

	return dot( weights, rgb );

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}
`
), Ms = (
  /* glsl */
  `
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		#ifdef texture2DGradEXT

			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

		#else

			return texture2D( envMap, uv ).rgb;

		#endif

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`
), Ds = (
  /* glsl */
  `
vec3 transformedNormal = objectNormal;

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 m = mat3( instanceMatrix );

	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );

	transformedNormal = m * transformedNormal;

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`
), ts = (
  /* glsl */
  `
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`
), Ns = (
  /* glsl */
  `
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );

#endif
`
), es = (
  /* glsl */
  `
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vUv );

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`
), is = (
  /* glsl */
  `
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`
), As = (
  /* glsl */
  `
gl_FragColor = linearToOutputTexel( gl_FragColor );
`
), zs = (
  /* glsl */
  `

vec4 LinearToLinear( in vec4 value ) {
	return value;
}

vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`
), ns = (
  /* glsl */
  `
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

	#else

		vec4 envColor = vec4( 0.0 );

	#endif

	#ifdef ENVMAP_BLENDING_MULTIPLY

		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_MIX )

		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_ADD )

		outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif
`
), Is = (
  /* glsl */
  `
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`
), Ts = (
  /* glsl */
  `
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`
), us = (
  /* glsl */
  `
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`
), gs = (
  /* glsl */
  `
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`
), ss = (
  /* glsl */
  `
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`
), rs = (
  /* glsl */
  `
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`
), cs = (
  /* glsl */
  `
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`
), js = (
  /* glsl */
  `
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`
), ys = (
  /* glsl */
  `

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return vec3( texture2D( gradientMap, coord ).r );

	#else

		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

	#endif

}
`
), as = (
  /* glsl */
  `
#ifdef USE_LIGHTMAP

	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

	reflectedLight.indirectDiffuse += lightMapIrradiance;

#endif
`
), os = (
  /* glsl */
  `
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`
), Cs = (
  /* glsl */
  `
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`
), Ls = (
  /* glsl */
  `
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`
), ws = (
  /* glsl */
  `
uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	#if defined ( PHYSICALLY_CORRECT_LIGHTS )

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	#else

		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {

			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );

		}

		return 1.0;

	#endif

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometry.position;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometry.position;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif
`
), xs = (
  /* glsl */
  `
#if defined( USE_ENVMAP )

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#if defined( ENVMAP_TYPE_CUBE_UV )

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#if defined( ENVMAP_TYPE_CUBE_UV )

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

#endif
`
), Os = (
  /* glsl */
  `
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`
), Es = (
  /* glsl */
  `
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`
), ls = (
  /* glsl */
  `
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`
), hs = (
  /* glsl */
  `
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`
), ds = (
  /* glsl */
  `
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULARINTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;

		#endif

		#ifdef USE_SPECULARCOLORMAP

			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_IRIDESCENCE

	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;

	#ifdef USE_IRIDESCENCEMAP

		material.iridescence *= texture2D( iridescenceMap, vUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEENCOLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );

	#ifdef USE_SHEENROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;

	#endif

#endif
`
), vs = (
  /* glsl */
  `
struct PhysicalMaterial {

	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;

	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif

	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif

	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif

	#ifdef IOR
		float ior;
	#endif

	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif

};

// temporary
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );

// This is a curve-fit approxmation to the "Charlie sheen" BRDF integrated over the hemisphere from 
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found
// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	float r2 = roughness * roughness;

	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;

	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;

	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );

	return saturate( DG * RECIPROCAL_PI );

}

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	vec4 r = roughness * c0 + c1;

	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;

	return fab;

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Agüera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	#ifdef USE_IRIDESCENCE

		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

	#else

		vec3 Fr = specularColor;

	#endif

	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifdef USE_CLEARCOAT

		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = dotNLcc * directLight.color;

		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );

	#endif

	#ifdef USE_IRIDESCENCE

		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );

	#else

		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );

	#endif

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef USE_CLEARCOAT

		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );

	#endif

	// Both indirect specular and indirect diffuse light accumulate here

	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );

	#else

		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );

	#endif

	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );

	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`
), Ys = (
  /* glsl */
  `
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

GeometricContext geometry;

geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

#ifdef USE_CLEARCOAT

	geometry.clearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometry.viewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometry, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`
), ps = (
  /* glsl */
  `
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )

		iblIrradiance += getIBLIrradiance( geometry.normal );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );

	#ifdef USE_CLEARCOAT

		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );

	#endif

#endif
`
), Us = (
  /* glsl */
  `
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );

#endif
`
), fs = (
  /* glsl */
  `
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`
), Qs = (
  /* glsl */
  `
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`
), ms = (
  /* glsl */
  `
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`
), ks = (
  /* glsl */
  `
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

	#else

		if ( isPerspectiveMatrix( projectionMatrix ) ) {

			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;

			gl_Position.z *= gl_Position.w;

		}

	#endif

#endif
`
), Ss = (
  /* glsl */
  `
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)

		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`
), Zs = (
  /* glsl */
  `
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`
), _s = (
  /* glsl */
  `
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`
), bs = (
  /* glsl */
  `
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	uniform mat3 uvTransform;

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`
), Ks = (
  /* glsl */
  `
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`
), Rs = (
  /* glsl */
  `
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`
), Ps = (
  /* glsl */
  `
#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	vColor *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		#if defined( USE_COLOR_ALPHA )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

		#elif defined( USE_COLOR )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

		#endif

	}

#endif
`
), Fs = (
  /* glsl */
  `
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

		}

	#else

		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];

	#endif

#endif
`
), Bs = (
  /* glsl */
  `
#ifdef USE_MORPHTARGETS

	uniform float morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;

		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;

			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );

		}

	#else

		#ifndef USE_MORPHNORMALS

			uniform float morphTargetInfluences[ 8 ];

		#else

			uniform float morphTargetInfluences[ 4 ];

		#endif

	#endif

#endif
`
), Gs = (
  /* glsl */
  `
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

		}

	#else

		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];

		#ifndef USE_MORPHNORMALS

			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];

		#endif

	#endif

#endif
`
), Vs = (
  /* glsl */
  `
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	#ifdef USE_TANGENT

		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );

		#ifdef DOUBLE_SIDED

			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;

		#endif

		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )

			mat3 vTBN = mat3( tangent, bitangent, normal );

		#endif

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 geometryNormal = normal;

`
), Hs = (
  /* glsl */
  `

#ifdef OBJECTSPACE_NORMALMAP

	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( TANGENTSPACE_NORMALMAP )

	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	#ifdef USE_TANGENT

		normal = normalize( vTBN * mapN );

	#else

		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );

	#endif

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`
), Ws = (
  /* glsl */
  `
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`
), Xs = (
  /* glsl */
  `
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`
), qs = (
  /* glsl */
  `
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`
), $s = (
  /* glsl */
  `
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef OBJECTSPACE_NORMALMAP

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );

		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );

	}

#endif
`
), Js = (
  /* glsl */
  `
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = geometryNormal;

#endif
`
), Mr = (
  /* glsl */
  `
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	#ifdef USE_TANGENT

		clearcoatNormal = normalize( vTBN * clearcoatMapN );

	#else

		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );

	#endif

#endif
`
), Dr = (
  /* glsl */
  `

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif
`
), tr = (
  /* glsl */
  `

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`
), Nr = (
  /* glsl */
  `
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

// https://github.com/mrdoob/three.js/pull/22425
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`
), er = (
  /* glsl */
  `
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)

const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );

const float ShiftRight8 = 1. / 256.;

vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8; // tidy overflow
	return r * PackUpscale;
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}

vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}

float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}

vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}
`
), ir = (
  /* glsl */
  `
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`
), Ar = (
  /* glsl */
  `
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`
), zr = (
  /* glsl */
  `
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`
), nr = (
  /* glsl */
  `
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift according to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`
), Ir = (
  /* glsl */
  `
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`
), Tr = (
  /* glsl */
  `
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`
), ur = (
  /* glsl */
  `
#if NUM_SPOT_LIGHT_COORDS > 0

  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): create uniforms for area light shadows

	#endif
	*/

	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );

	}

	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {

		return unpackRGBATo2Half( texture2D( shadow, uv ) );

	}

	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){

		float occlusion = 1.0;

		vec2 distribution = texture2DDistribution( shadow, uv );

		float hard_shadow = step( compare , distribution.x ); // Hard Shadow

		if (hard_shadow != 1.0 ) {

			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

		}
		return occlusion;

	}

	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

		float shadow = 1.0;

		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;

		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

		if ( frustumTest ) {

		#if defined( SHADOWMAP_TYPE_PCF )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;

			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );

		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;

			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;

			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );

		#elif defined( SHADOWMAP_TYPE_VSM )

			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

		#else // no percentage-closer filtering:

			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

		#endif

		}

		return shadow;

	}

	// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
	// vector suitable for 2D texture mapping. This code uses the following layout for the
	// 2D texture:
	//
	// xzXZ
	//  y Y
	//
	// Y - Positive y direction
	// y - Negative y direction
	// X - Positive x direction
	// x - Negative x direction
	// Z - Positive z direction
	// z - Negative z direction
	//
	// Source and test bed:
	// https://gist.github.com/tschw/da10c43c467ce8afd0c4

	vec2 cubeToUV( vec3 v, float texelSizeY ) {

		// Number of texels to avoid at the edge of each square

		vec3 absV = abs( v );

		// Intersect unit cube

		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;

		// Apply scale to avoid seams

		// two texels less per square (one texel will do for NEAREST)
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

		// Unwrap

		// space: -1 ... 1 range for each square
		//
		// #X##		dim    := ( 4 , 2 )
		//  # #		center := ( 1 , 1 )

		vec2 planar = v.xy;

		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;

		if ( absV.z >= almostOne ) {

			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;

		} else if ( absV.x >= almostOne ) {

			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;

		} else if ( absV.y >= almostOne ) {

			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;

		}

		// Transform to UV space

		// scale := 0.5 / dim
		// translate := ( center + 0.5 ) / dim
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

	}

	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// dp = normalized distance from light to fragment position
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
		dp += shadowBias;

		// bd3D = base direction 3D
		vec3 bd3D = normalize( lightToPosition );

		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )

			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );

		#else // no percentage-closer filtering

			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

		#endif

	}

#endif
`
), gr = (
  /* glsl */
  `

#if NUM_SPOT_LIGHT_COORDS > 0

  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`
), sr = (
  /* glsl */
  `

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

	// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

#endif


`
), rr = (
  /* glsl */
  `
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`
), cr = (
  /* glsl */
  `
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`
), jr = (
  /* glsl */
  `
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;

	mat4 getBoneMatrix( const in float i ) {

		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );

		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );

		y = dy * ( y + 0.5 );

		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );

		mat4 bone = mat4( v1, v2, v3, v4 );

		return bone;

	}

#endif
`
), yr = (
  /* glsl */
  `
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`
), ar = (
  /* glsl */
  `
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`
), or = (
  /* glsl */
  `
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`
), Cr = (
  /* glsl */
  `
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`
), Lr = (
  /* glsl */
  `
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`
), wr = (
  /* glsl */
  `
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return toneMappingExposure * color;

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 OptimizedCineonToneMapping( vec3 color ) {

	// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`
), xr = (
  /* glsl */
  `
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );

	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );

	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );

	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );

#endif
`
), Or = (
  /* glsl */
  `
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independant scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( const in float roughness, const in float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );

		#ifdef texture2DLodEXT

			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );

		#else

			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );

		#endif

	}

	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

		if ( isinf( attenuationDistance ) ) {

			// Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
			return radiance;

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance * radiance;

		}

	}

	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {

		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;

		// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;

		// Sample framebuffer to get pixel the refracted ray hits.
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );

		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );

		// Get the specular component.
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );

	}
#endif
`
), Er = (
  /* glsl */
  `
#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )

	varying vec2 vUv;

#endif
`
), lr = (
  /* glsl */
  `
#ifdef USE_UV

	#ifdef UVS_VERTEX_ONLY

		vec2 vUv;

	#else

		varying vec2 vUv;

	#endif

	uniform mat3 uvTransform;

#endif
`
), hr = (
  /* glsl */
  `
#ifdef USE_UV

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

#endif
`
), dr = (
  /* glsl */
  `
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	varying vec2 vUv2;

#endif
`
), vr = (
  /* glsl */
  `
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	attribute vec2 uv2;
	varying vec2 vUv2;

	uniform mat3 uv2Transform;

#endif
`
), Yr = (
  /* glsl */
  `
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;

#endif
`
), pr = (
  /* glsl */
  `
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`
), Ur = (
  /* glsl */
  `
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`
), fr = (
  /* glsl */
  `
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`
), Qr = (
  /* glsl */
  `
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`
), mr = (
  /* glsl */
  `

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`
), kr = (
  /* glsl */
  `
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`
), Sr = (
  /* glsl */
  `
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`
), Zr = (
  /* glsl */
  `
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

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

	vHighPrecisionZW = gl_Position.zw;

}
`
), _r = (
  /* glsl */
  `
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#endif

}
`
), br = (
  /* glsl */
  `
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

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

	vWorldPosition = worldPosition.xyz;

}
`
), Kr = (
  /* glsl */
  `
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`
), Rr = (
  /* glsl */
  `
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`
), Pr = (
  /* glsl */
  `
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`
), Fr = (
  /* glsl */
  `
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`
), Br = (
  /* glsl */
  `
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`
), Gr = (
  /* glsl */
  `
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

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

}
`
), Vr = (
  /* glsl */
  `
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`
), Hr = (
  /* glsl */
  `
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
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

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
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

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`
), Wr = (
  /* glsl */
  `
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
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

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`
), Xr = (
  /* glsl */
  `
#define MATCAP

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

void main() {

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

	vViewPosition = - mvPosition.xyz;

}
`
), qr = (
  /* glsl */
  `
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`
), $r = (
  /* glsl */
  `
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )

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

void main() {

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

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )

	vViewPosition = - mvPosition.xyz;

#endif

}
`
), Jr = (
  /* glsl */
  `
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )

	varying vec3 vViewPosition;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`
), Mc = (
  /* glsl */
  `
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
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

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
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

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`
), Dc = (
  /* glsl */
  `
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
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

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`
), tc = (
  /* glsl */
  `
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
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

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`
), Nc = (
  /* glsl */
  `
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif

	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
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

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;

	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;

	#endif

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`
), ec = (
  /* glsl */
  `
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
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

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`
), ic = (
  /* glsl */
  `
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
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

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`
), Ac = (
  /* glsl */
  `
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`
), zc = (
  /* glsl */
  `
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`
), nc = (
  /* glsl */
  `
#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`
), Ic = (
  /* glsl */
  `
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`
), Tc = (
  /* glsl */
  `
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`
), uc = (
  /* glsl */
  `
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`
), EM = {
  alphamap_fragment: Qg,
  alphamap_pars_fragment: mg,
  alphatest_fragment: kg,
  alphatest_pars_fragment: Sg,
  aomap_fragment: Zg,
  aomap_pars_fragment: _g,
  begin_vertex: bg,
  beginnormal_vertex: Kg,
  bsdfs: Rg,
  iridescence_fragment: Pg,
  bumpmap_pars_fragment: Fg,
  clipping_planes_fragment: Bg,
  clipping_planes_pars_fragment: Gg,
  clipping_planes_pars_vertex: Vg,
  clipping_planes_vertex: Hg,
  color_fragment: Wg,
  color_pars_fragment: Xg,
  color_pars_vertex: qg,
  color_vertex: $g,
  common: Jg,
  cube_uv_reflection_fragment: Ms,
  defaultnormal_vertex: Ds,
  displacementmap_pars_vertex: ts,
  displacementmap_vertex: Ns,
  emissivemap_fragment: es,
  emissivemap_pars_fragment: is,
  encodings_fragment: As,
  encodings_pars_fragment: zs,
  envmap_fragment: ns,
  envmap_common_pars_fragment: Is,
  envmap_pars_fragment: Ts,
  envmap_pars_vertex: us,
  envmap_physical_pars_fragment: xs,
  envmap_vertex: gs,
  fog_vertex: ss,
  fog_pars_vertex: rs,
  fog_fragment: cs,
  fog_pars_fragment: js,
  gradientmap_pars_fragment: ys,
  lightmap_fragment: as,
  lightmap_pars_fragment: os,
  lights_lambert_fragment: Cs,
  lights_lambert_pars_fragment: Ls,
  lights_pars_begin: ws,
  lights_toon_fragment: Os,
  lights_toon_pars_fragment: Es,
  lights_phong_fragment: ls,
  lights_phong_pars_fragment: hs,
  lights_physical_fragment: ds,
  lights_physical_pars_fragment: vs,
  lights_fragment_begin: Ys,
  lights_fragment_maps: ps,
  lights_fragment_end: Us,
  logdepthbuf_fragment: fs,
  logdepthbuf_pars_fragment: Qs,
  logdepthbuf_pars_vertex: ms,
  logdepthbuf_vertex: ks,
  map_fragment: Ss,
  map_pars_fragment: Zs,
  map_particle_fragment: _s,
  map_particle_pars_fragment: bs,
  metalnessmap_fragment: Ks,
  metalnessmap_pars_fragment: Rs,
  morphcolor_vertex: Ps,
  morphnormal_vertex: Fs,
  morphtarget_pars_vertex: Bs,
  morphtarget_vertex: Gs,
  normal_fragment_begin: Vs,
  normal_fragment_maps: Hs,
  normal_pars_fragment: Ws,
  normal_pars_vertex: Xs,
  normal_vertex: qs,
  normalmap_pars_fragment: $s,
  clearcoat_normal_fragment_begin: Js,
  clearcoat_normal_fragment_maps: Mr,
  clearcoat_pars_fragment: Dr,
  iridescence_pars_fragment: tr,
  output_fragment: Nr,
  packing: er,
  premultiplied_alpha_fragment: ir,
  project_vertex: Ar,
  dithering_fragment: zr,
  dithering_pars_fragment: nr,
  roughnessmap_fragment: Ir,
  roughnessmap_pars_fragment: Tr,
  shadowmap_pars_fragment: ur,
  shadowmap_pars_vertex: gr,
  shadowmap_vertex: sr,
  shadowmask_pars_fragment: rr,
  skinbase_vertex: cr,
  skinning_pars_vertex: jr,
  skinning_vertex: yr,
  skinnormal_vertex: ar,
  specularmap_fragment: or,
  specularmap_pars_fragment: Cr,
  tonemapping_fragment: Lr,
  tonemapping_pars_fragment: wr,
  transmission_fragment: xr,
  transmission_pars_fragment: Or,
  uv_pars_fragment: Er,
  uv_pars_vertex: lr,
  uv_vertex: hr,
  uv2_pars_fragment: dr,
  uv2_pars_vertex: vr,
  uv2_vertex: Yr,
  worldpos_vertex: pr,
  background_vert: Ur,
  background_frag: fr,
  backgroundCube_vert: Qr,
  backgroundCube_frag: mr,
  cube_vert: kr,
  cube_frag: Sr,
  depth_vert: Zr,
  depth_frag: _r,
  distanceRGBA_vert: br,
  distanceRGBA_frag: Kr,
  equirect_vert: Rr,
  equirect_frag: Pr,
  linedashed_vert: Fr,
  linedashed_frag: Br,
  meshbasic_vert: Gr,
  meshbasic_frag: Vr,
  meshlambert_vert: Hr,
  meshlambert_frag: Wr,
  meshmatcap_vert: Xr,
  meshmatcap_frag: qr,
  meshnormal_vert: $r,
  meshnormal_frag: Jr,
  meshphong_vert: Mc,
  meshphong_frag: Dc,
  meshphysical_vert: tc,
  meshphysical_frag: Nc,
  meshtoon_vert: ec,
  meshtoon_frag: ic,
  points_vert: Ac,
  points_frag: zc,
  shadow_vert: nc,
  shadow_frag: Ic,
  sprite_vert: Tc,
  sprite_frag: uc
}, tM = {
  common: {
    diffuse: { value: /* @__PURE__ */ new kM(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    uvTransform: { value: /* @__PURE__ */ new HD() },
    uv2Transform: { value: /* @__PURE__ */ new HD() },
    alphaMap: { value: null },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null }
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
    aoMapIntensity: { value: 1 }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 }
  },
  emissivemap: {
    emissiveMap: { value: null }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalScale: { value: /* @__PURE__ */ new gM(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  roughnessmap: {
    roughnessMap: { value: null }
  },
  metalnessmap: {
    metalnessMap: { value: null }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new kM(16777215) }
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
    diffuse: { value: /* @__PURE__ */ new kM(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new HD() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new kM(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new gM(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    alphaMap: { value: null },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new HD() }
  }
}, qD = {
  basic: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.specularmap,
      tM.envmap,
      tM.aomap,
      tM.lightmap,
      tM.fog
    ]),
    vertexShader: EM.meshbasic_vert,
    fragmentShader: EM.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.specularmap,
      tM.envmap,
      tM.aomap,
      tM.lightmap,
      tM.emissivemap,
      tM.bumpmap,
      tM.normalmap,
      tM.displacementmap,
      tM.fog,
      tM.lights,
      {
        emissive: { value: /* @__PURE__ */ new kM(0) }
      }
    ]),
    vertexShader: EM.meshlambert_vert,
    fragmentShader: EM.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.specularmap,
      tM.envmap,
      tM.aomap,
      tM.lightmap,
      tM.emissivemap,
      tM.bumpmap,
      tM.normalmap,
      tM.displacementmap,
      tM.fog,
      tM.lights,
      {
        emissive: { value: /* @__PURE__ */ new kM(0) },
        specular: { value: /* @__PURE__ */ new kM(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: EM.meshphong_vert,
    fragmentShader: EM.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.envmap,
      tM.aomap,
      tM.lightmap,
      tM.emissivemap,
      tM.bumpmap,
      tM.normalmap,
      tM.displacementmap,
      tM.roughnessmap,
      tM.metalnessmap,
      tM.fog,
      tM.lights,
      {
        emissive: { value: /* @__PURE__ */ new kM(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
        // temporary
      }
    ]),
    vertexShader: EM.meshphysical_vert,
    fragmentShader: EM.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.aomap,
      tM.lightmap,
      tM.emissivemap,
      tM.bumpmap,
      tM.normalmap,
      tM.displacementmap,
      tM.gradientmap,
      tM.fog,
      tM.lights,
      {
        emissive: { value: /* @__PURE__ */ new kM(0) }
      }
    ]),
    vertexShader: EM.meshtoon_vert,
    fragmentShader: EM.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.bumpmap,
      tM.normalmap,
      tM.displacementmap,
      tM.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: EM.meshmatcap_vert,
    fragmentShader: EM.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ sD([
      tM.points,
      tM.fog
    ]),
    vertexShader: EM.points_vert,
    fragmentShader: EM.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: EM.linedashed_vert,
    fragmentShader: EM.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.displacementmap
    ]),
    vertexShader: EM.depth_vert,
    fragmentShader: EM.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.bumpmap,
      tM.normalmap,
      tM.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: EM.meshnormal_vert,
    fragmentShader: EM.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ sD([
      tM.sprite,
      tM.fog
    ]),
    vertexShader: EM.sprite_vert,
    fragmentShader: EM.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new HD() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: EM.background_vert,
    fragmentShader: EM.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: EM.backgroundCube_vert,
    fragmentShader: EM.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: EM.cube_vert,
    fragmentShader: EM.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: EM.equirect_vert,
    fragmentShader: EM.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ sD([
      tM.common,
      tM.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new f() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: EM.distanceRGBA_vert,
    fragmentShader: EM.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ sD([
      tM.lights,
      tM.fog,
      {
        color: { value: /* @__PURE__ */ new kM(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: EM.shadow_vert,
    fragmentShader: EM.shadow_frag
  }
};
qD.physical = {
  uniforms: /* @__PURE__ */ sD([
    qD.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatNormalScale: { value: /* @__PURE__ */ new gM(1, 1) },
      clearcoatNormalMap: { value: null },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new kM(0) },
      sheenColorMap: { value: null },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionSamplerSize: { value: /* @__PURE__ */ new gM() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new kM(0) },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularColor: { value: /* @__PURE__ */ new kM(1, 1, 1) },
      specularColorMap: { value: null }
    }
  ]),
  vertexShader: EM.meshphysical_vert,
  fragmentShader: EM.meshphysical_frag
};
const Xe = { r: 0, b: 0, g: 0 };
function gc(e, M, D, t, N, i, z) {
  const A = new kM(0);
  let I = i === !0 ? 0 : 1, n, T, u = null, g = 0, s = null;
  function j(c, y) {
    let w = !1, a = y.isScene === !0 ? y.background : null;
    a && a.isTexture && (a = (y.backgroundBlurriness > 0 ? D : M).get(a));
    const C = e.xr, x = C.getSession && C.getSession();
    x && x.environmentBlendMode === "additive" && (a = null), a === null ? r(A, I) : a && a.isColor && (r(a, 1), w = !0), (e.autoClear || w) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), a && (a.isCubeTexture || a.mapping === mi) ? (T === void 0 && (T = new JD(
      new ve(1, 1, 1),
      new NN({
        name: "BackgroundCubeMaterial",
        uniforms: RN(qD.backgroundCube.uniforms),
        vertexShader: qD.backgroundCube.vertexShader,
        fragmentShader: qD.backgroundCube.fragmentShader,
        side: dD,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), T.geometry.deleteAttribute("normal"), T.geometry.deleteAttribute("uv"), T.onBeforeRender = function(l, d, L) {
      this.matrixWorld.copyPosition(L.matrixWorld);
    }, Object.defineProperty(T.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), N.update(T)), T.material.uniforms.envMap.value = a, T.material.uniforms.flipEnvMap.value = a.isCubeTexture && a.isRenderTargetTexture === !1 ? -1 : 1, T.material.uniforms.backgroundBlurriness.value = y.backgroundBlurriness, T.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, T.material.toneMapped = a.encoding !== SM, (u !== a || g !== a.version || s !== e.toneMapping) && (T.material.needsUpdate = !0, u = a, g = a.version, s = e.toneMapping), T.layers.enableAll(), c.unshift(T, T.geometry, T.material, 0, 0, null)) : a && a.isTexture && (n === void 0 && (n = new JD(
      new Cz(2, 2),
      new NN({
        name: "BackgroundMaterial",
        uniforms: RN(qD.background.uniforms),
        vertexShader: qD.background.vertexShader,
        fragmentShader: qD.background.fragmentShader,
        side: ft,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), n.geometry.deleteAttribute("normal"), Object.defineProperty(n.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), N.update(n)), n.material.uniforms.t2D.value = a, n.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, n.material.toneMapped = a.encoding !== SM, a.matrixAutoUpdate === !0 && a.updateMatrix(), n.material.uniforms.uvTransform.value.copy(a.matrix), (u !== a || g !== a.version || s !== e.toneMapping) && (n.material.needsUpdate = !0, u = a, g = a.version, s = e.toneMapping), n.layers.enableAll(), c.unshift(n, n.geometry, n.material, 0, 0, null));
  }
  function r(c, y) {
    c.getRGB(Xe, gT(e)), t.buffers.color.setClear(Xe.r, Xe.g, Xe.b, y, z);
  }
  return {
    getClearColor: function() {
      return A;
    },
    setClearColor: function(c, y = 1) {
      A.set(c), I = y, r(A, I);
    },
    getClearAlpha: function() {
      return I;
    },
    setClearAlpha: function(c) {
      I = c, r(A, I);
    },
    render: j
  };
}
function sc(e, M, D, t) {
  const N = e.getParameter(e.MAX_VERTEX_ATTRIBS), i = t.isWebGL2 ? null : M.get("OES_vertex_array_object"), z = t.isWebGL2 || i !== null, A = {}, I = c(null);
  let n = I, T = !1;
  function u(U, Z, W, X, F) {
    let J = !1;
    if (z) {
      const $ = r(X, W, Z);
      n !== $ && (n = $, s(n.object)), J = y(U, X, W, F), J && w(U, X, W, F);
    } else {
      const $ = Z.wireframe === !0;
      (n.geometry !== X.id || n.program !== W.id || n.wireframe !== $) && (n.geometry = X.id, n.program = W.id, n.wireframe = $, J = !0);
    }
    F !== null && D.update(F, e.ELEMENT_ARRAY_BUFFER), (J || T) && (T = !1, L(U, Z, W, X), F !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, D.get(F).buffer));
  }
  function g() {
    return t.isWebGL2 ? e.createVertexArray() : i.createVertexArrayOES();
  }
  function s(U) {
    return t.isWebGL2 ? e.bindVertexArray(U) : i.bindVertexArrayOES(U);
  }
  function j(U) {
    return t.isWebGL2 ? e.deleteVertexArray(U) : i.deleteVertexArrayOES(U);
  }
  function r(U, Z, W) {
    const X = W.wireframe === !0;
    let F = A[U.id];
    F === void 0 && (F = {}, A[U.id] = F);
    let J = F[Z.id];
    J === void 0 && (J = {}, F[Z.id] = J);
    let $ = J[X];
    return $ === void 0 && ($ = c(g()), J[X] = $), $;
  }
  function c(U) {
    const Z = [], W = [], X = [];
    for (let F = 0; F < N; F++)
      Z[F] = 0, W[F] = 0, X[F] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: Z,
      enabledAttributes: W,
      attributeDivisors: X,
      object: U,
      attributes: {},
      index: null
    };
  }
  function y(U, Z, W, X) {
    const F = n.attributes, J = Z.attributes;
    let $ = 0;
    const IM = W.getAttributes();
    for (const S in IM)
      if (IM[S].location >= 0) {
        const NM = F[S];
        let eM = J[S];
        if (eM === void 0 && (S === "instanceMatrix" && U.instanceMatrix && (eM = U.instanceMatrix), S === "instanceColor" && U.instanceColor && (eM = U.instanceColor)), NM === void 0 || NM.attribute !== eM || eM && NM.data !== eM.data)
          return !0;
        $++;
      }
    return n.attributesNum !== $ || n.index !== X;
  }
  function w(U, Z, W, X) {
    const F = {}, J = Z.attributes;
    let $ = 0;
    const IM = W.getAttributes();
    for (const S in IM)
      if (IM[S].location >= 0) {
        let NM = J[S];
        NM === void 0 && (S === "instanceMatrix" && U.instanceMatrix && (NM = U.instanceMatrix), S === "instanceColor" && U.instanceColor && (NM = U.instanceColor));
        const eM = {};
        eM.attribute = NM, NM && NM.data && (eM.data = NM.data), F[S] = eM, $++;
      }
    n.attributes = F, n.attributesNum = $, n.index = X;
  }
  function a() {
    const U = n.newAttributes;
    for (let Z = 0, W = U.length; Z < W; Z++)
      U[Z] = 0;
  }
  function C(U) {
    x(U, 0);
  }
  function x(U, Z) {
    const W = n.newAttributes, X = n.enabledAttributes, F = n.attributeDivisors;
    W[U] = 1, X[U] === 0 && (e.enableVertexAttribArray(U), X[U] = 1), F[U] !== Z && ((t.isWebGL2 ? e : M.get("ANGLE_instanced_arrays"))[t.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](U, Z), F[U] = Z);
  }
  function l() {
    const U = n.newAttributes, Z = n.enabledAttributes;
    for (let W = 0, X = Z.length; W < X; W++)
      Z[W] !== U[W] && (e.disableVertexAttribArray(W), Z[W] = 0);
  }
  function d(U, Z, W, X, F, J) {
    t.isWebGL2 === !0 && (W === e.INT || W === e.UNSIGNED_INT) ? e.vertexAttribIPointer(U, Z, W, F, J) : e.vertexAttribPointer(U, Z, W, X, F, J);
  }
  function L(U, Z, W, X) {
    if (t.isWebGL2 === !1 && (U.isInstancedMesh || X.isInstancedBufferGeometry) && M.get("ANGLE_instanced_arrays") === null)
      return;
    a();
    const F = X.attributes, J = W.getAttributes(), $ = Z.defaultAttributeValues;
    for (const IM in J) {
      const S = J[IM];
      if (S.location >= 0) {
        let V = F[IM];
        if (V === void 0 && (IM === "instanceMatrix" && U.instanceMatrix && (V = U.instanceMatrix), IM === "instanceColor" && U.instanceColor && (V = U.instanceColor)), V !== void 0) {
          const NM = V.normalized, eM = V.itemSize, v = D.get(V);
          if (v === void 0)
            continue;
          const xM = v.buffer, sM = v.type, rM = v.bytesPerElement;
          if (V.isInterleavedBufferAttribute) {
            const nM = V.data, mM = nM.stride, OM = V.offset;
            if (nM.isInstancedInterleavedBuffer) {
              for (let CM = 0; CM < S.locationSize; CM++)
                x(S.location + CM, nM.meshPerAttribute);
              U.isInstancedMesh !== !0 && X._maxInstanceCount === void 0 && (X._maxInstanceCount = nM.meshPerAttribute * nM.count);
            } else
              for (let CM = 0; CM < S.locationSize; CM++)
                C(S.location + CM);
            e.bindBuffer(e.ARRAY_BUFFER, xM);
            for (let CM = 0; CM < S.locationSize; CM++)
              d(
                S.location + CM,
                eM / S.locationSize,
                sM,
                NM,
                mM * rM,
                (OM + eM / S.locationSize * CM) * rM
              );
          } else {
            if (V.isInstancedBufferAttribute) {
              for (let nM = 0; nM < S.locationSize; nM++)
                x(S.location + nM, V.meshPerAttribute);
              U.isInstancedMesh !== !0 && X._maxInstanceCount === void 0 && (X._maxInstanceCount = V.meshPerAttribute * V.count);
            } else
              for (let nM = 0; nM < S.locationSize; nM++)
                C(S.location + nM);
            e.bindBuffer(e.ARRAY_BUFFER, xM);
            for (let nM = 0; nM < S.locationSize; nM++)
              d(
                S.location + nM,
                eM / S.locationSize,
                sM,
                NM,
                eM * rM,
                eM / S.locationSize * nM * rM
              );
          }
        } else if ($ !== void 0) {
          const NM = $[IM];
          if (NM !== void 0)
            switch (NM.length) {
              case 2:
                e.vertexAttrib2fv(S.location, NM);
                break;
              case 3:
                e.vertexAttrib3fv(S.location, NM);
                break;
              case 4:
                e.vertexAttrib4fv(S.location, NM);
                break;
              default:
                e.vertexAttrib1fv(S.location, NM);
            }
        }
      }
    }
    l();
  }
  function h() {
    H();
    for (const U in A) {
      const Z = A[U];
      for (const W in Z) {
        const X = Z[W];
        for (const F in X)
          j(X[F].object), delete X[F];
        delete Z[W];
      }
      delete A[U];
    }
  }
  function p(U) {
    if (A[U.id] === void 0)
      return;
    const Z = A[U.id];
    for (const W in Z) {
      const X = Z[W];
      for (const F in X)
        j(X[F].object), delete X[F];
      delete Z[W];
    }
    delete A[U.id];
  }
  function P(U) {
    for (const Z in A) {
      const W = A[Z];
      if (W[U.id] === void 0)
        continue;
      const X = W[U.id];
      for (const F in X)
        j(X[F].object), delete X[F];
      delete W[U.id];
    }
  }
  function H() {
    Q(), T = !0, n !== I && (n = I, s(n.object));
  }
  function Q() {
    I.geometry = null, I.program = null, I.wireframe = !1;
  }
  return {
    setup: u,
    reset: H,
    resetDefaultState: Q,
    dispose: h,
    releaseStatesOfGeometry: p,
    releaseStatesOfProgram: P,
    initAttributes: a,
    enableAttribute: C,
    disableUnusedAttributes: l
  };
}
function rc(e, M, D, t) {
  const N = t.isWebGL2;
  let i;
  function z(n) {
    i = n;
  }
  function A(n, T) {
    e.drawArrays(i, n, T), D.update(T, i, 1);
  }
  function I(n, T, u) {
    if (u === 0)
      return;
    let g, s;
    if (N)
      g = e, s = "drawArraysInstanced";
    else if (g = M.get("ANGLE_instanced_arrays"), s = "drawArraysInstancedANGLE", g === null) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    g[s](i, n, T, u), D.update(T, i, u);
  }
  this.setMode = z, this.render = A, this.renderInstances = I;
}
function cc(e, M, D) {
  let t;
  function N() {
    if (t !== void 0)
      return t;
    if (M.has("EXT_texture_filter_anisotropic") === !0) {
      const d = M.get("EXT_texture_filter_anisotropic");
      t = e.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      t = 0;
    return t;
  }
  function i(d) {
    if (d === "highp") {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0)
        return "highp";
      d = "mediump";
    }
    return d === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  const z = typeof WebGL2RenderingContext < "u" && e instanceof WebGL2RenderingContext;
  let A = D.precision !== void 0 ? D.precision : "highp";
  const I = i(A);
  I !== A && (console.warn("THREE.WebGLRenderer:", A, "not supported, using", I, "instead."), A = I);
  const n = z || M.has("WEBGL_draw_buffers"), T = D.logarithmicDepthBuffer === !0, u = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), g = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), s = e.getParameter(e.MAX_TEXTURE_SIZE), j = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), r = e.getParameter(e.MAX_VERTEX_ATTRIBS), c = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), y = e.getParameter(e.MAX_VARYING_VECTORS), w = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), a = g > 0, C = z || M.has("OES_texture_float"), x = a && C, l = z ? e.getParameter(e.MAX_SAMPLES) : 0;
  return {
    isWebGL2: z,
    drawBuffers: n,
    getMaxAnisotropy: N,
    getMaxPrecision: i,
    precision: A,
    logarithmicDepthBuffer: T,
    maxTextures: u,
    maxVertexTextures: g,
    maxTextureSize: s,
    maxCubemapSize: j,
    maxAttributes: r,
    maxVertexUniforms: c,
    maxVaryings: y,
    maxFragmentUniforms: w,
    vertexTextures: a,
    floatFragmentTextures: C,
    floatVertexTextures: x,
    maxSamples: l
  };
}
function jc(e) {
  const M = this;
  let D = null, t = 0, N = !1, i = !1;
  const z = new Bt(), A = new HD(), I = { value: null, needsUpdate: !1 };
  this.uniform = I, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, g) {
    const s = u.length !== 0 || g || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    t !== 0 || N;
    return N = g, t = u.length, s;
  }, this.beginShadows = function() {
    i = !0, T(null);
  }, this.endShadows = function() {
    i = !1;
  }, this.setGlobalState = function(u, g) {
    D = T(u, g, 0);
  }, this.setState = function(u, g, s) {
    const j = u.clippingPlanes, r = u.clipIntersection, c = u.clipShadows, y = e.get(u);
    if (!N || j === null || j.length === 0 || i && !c)
      i ? T(null) : n();
    else {
      const w = i ? 0 : t, a = w * 4;
      let C = y.clippingState || null;
      I.value = C, C = T(j, g, a, s);
      for (let x = 0; x !== a; ++x)
        C[x] = D[x];
      y.clippingState = C, this.numIntersection = r ? this.numPlanes : 0, this.numPlanes += w;
    }
  };
  function n() {
    I.value !== D && (I.value = D, I.needsUpdate = t > 0), M.numPlanes = t, M.numIntersection = 0;
  }
  function T(u, g, s, j) {
    const r = u !== null ? u.length : 0;
    let c = null;
    if (r !== 0) {
      if (c = I.value, j !== !0 || c === null) {
        const y = s + r * 4, w = g.matrixWorldInverse;
        A.getNormalMatrix(w), (c === null || c.length < y) && (c = new Float32Array(y));
        for (let a = 0, C = s; a !== r; ++a, C += 4)
          z.copy(u[a]).applyMatrix4(w, A), z.normal.toArray(c, C), c[C + 3] = z.constant;
      }
      I.value = c, I.needsUpdate = !0;
    }
    return M.numPlanes = r, M.numIntersection = 0, c;
  }
}
class eN extends BN {
  constructor(M = 1, D = 1, t = {}) {
    super(), this.isWebGLRenderTarget = !0, this.width = M, this.height = D, this.depth = 1, this.scissor = new tD(0, 0, M, D), this.scissorTest = !1, this.viewport = new tD(0, 0, M, D);
    const N = { width: M, height: D, depth: 1 };
    this.texture = new WD(N, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.encoding), this.texture.isRenderTargetTexture = !0, this.texture.flipY = !1, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.internalFormat = t.internalFormat !== void 0 ? t.internalFormat : null, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : yD, this.depthBuffer = t.depthBuffer !== void 0 ? t.depthBuffer : !0, this.stencilBuffer = t.stencilBuffer !== void 0 ? t.stencilBuffer : !1, this.depthTexture = t.depthTexture !== void 0 ? t.depthTexture : null, this.samples = t.samples !== void 0 ? t.samples : 0;
  }
  setSize(M, D, t = 1) {
    (this.width !== M || this.height !== D || this.depth !== t) && (this.width = M, this.height = D, this.depth = t, this.texture.image.width = M, this.texture.image.height = D, this.texture.image.depth = t, this.dispose()), this.viewport.set(0, 0, M, D), this.scissor.set(0, 0, M, D);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.width = M.width, this.height = M.height, this.depth = M.depth, this.viewport.copy(M.viewport), this.texture = M.texture.clone(), this.texture.isRenderTargetTexture = !0;
    const D = Object.assign({}, M.texture.image);
    return this.texture.source = new iT(D), this.depthBuffer = M.depthBuffer, this.stencilBuffer = M.stencilBuffer, M.depthTexture !== null && (this.depthTexture = M.depthTexture.clone()), this.samples = M.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const oN = -90, CN = 1;
class yc extends aD {
  constructor(M, D, t) {
    super(), this.type = "CubeCamera", this.renderTarget = t;
    const N = new SD(oN, CN, M, D);
    N.layers = this.layers, N.up.set(0, 1, 0), N.lookAt(1, 0, 0), this.add(N);
    const i = new SD(oN, CN, M, D);
    i.layers = this.layers, i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), this.add(i);
    const z = new SD(oN, CN, M, D);
    z.layers = this.layers, z.up.set(0, 0, -1), z.lookAt(0, 1, 0), this.add(z);
    const A = new SD(oN, CN, M, D);
    A.layers = this.layers, A.up.set(0, 0, 1), A.lookAt(0, -1, 0), this.add(A);
    const I = new SD(oN, CN, M, D);
    I.layers = this.layers, I.up.set(0, 1, 0), I.lookAt(0, 0, 1), this.add(I);
    const n = new SD(oN, CN, M, D);
    n.layers = this.layers, n.up.set(0, 1, 0), n.lookAt(0, 0, -1), this.add(n);
  }
  update(M, D) {
    this.parent === null && this.updateMatrixWorld();
    const t = this.renderTarget, [N, i, z, A, I, n] = this.children, T = M.getRenderTarget(), u = M.toneMapping, g = M.xr.enabled;
    M.toneMapping = Lt, M.xr.enabled = !1;
    const s = t.texture.generateMipmaps;
    t.texture.generateMipmaps = !1, M.setRenderTarget(t, 0), M.render(D, N), M.setRenderTarget(t, 1), M.render(D, i), M.setRenderTarget(t, 2), M.render(D, z), M.setRenderTarget(t, 3), M.render(D, A), M.setRenderTarget(t, 4), M.render(D, I), t.texture.generateMipmaps = s, M.setRenderTarget(t, 5), M.render(D, n), M.setRenderTarget(T), M.toneMapping = u, M.xr.enabled = g, t.texture.needsPMREMUpdate = !0;
  }
}
class sT extends WD {
  constructor(M, D, t, N, i, z, A, I, n, T) {
    M = M !== void 0 ? M : [], D = D !== void 0 ? D : _N, super(M, D, t, N, i, z, A, I, n, T), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(M) {
    this.image = M;
  }
}
class ac extends eN {
  constructor(M = 1, D = {}) {
    super(M, M, D), this.isWebGLCubeRenderTarget = !0;
    const t = { width: M, height: M, depth: 1 }, N = [t, t, t, t, t, t];
    this.texture = new sT(N, D.mapping, D.wrapS, D.wrapT, D.magFilter, D.minFilter, D.format, D.type, D.anisotropy, D.encoding), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = D.generateMipmaps !== void 0 ? D.generateMipmaps : !1, this.texture.minFilter = D.minFilter !== void 0 ? D.minFilter : yD;
  }
  fromEquirectangularTexture(M, D) {
    this.texture.type = D.type, this.texture.encoding = D.encoding, this.texture.generateMipmaps = D.generateMipmaps, this.texture.minFilter = D.minFilter, this.texture.magFilter = D.magFilter;
    const t = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, N = new ve(5, 5, 5), i = new NN({
      name: "CubemapFromEquirect",
      uniforms: RN(t.uniforms),
      vertexShader: t.vertexShader,
      fragmentShader: t.fragmentShader,
      side: dD,
      blending: pt
    });
    i.uniforms.tEquirect.value = D;
    const z = new JD(N, i), A = D.minFilter;
    return D.minFilter === ae && (D.minFilter = yD), new yc(1, 10, this).update(M, z), D.minFilter = A, z.geometry.dispose(), z.material.dispose(), this;
  }
  clear(M, D, t, N) {
    const i = M.getRenderTarget();
    for (let z = 0; z < 6; z++)
      M.setRenderTarget(this, z), M.clear(D, t, N);
    M.setRenderTarget(i);
  }
}
function oc(e) {
  let M = /* @__PURE__ */ new WeakMap();
  function D(z, A) {
    return A === iz ? z.mapping = _N : A === Az && (z.mapping = bN), z;
  }
  function t(z) {
    if (z && z.isTexture && z.isRenderTargetTexture === !1) {
      const A = z.mapping;
      if (A === iz || A === Az)
        if (M.has(z)) {
          const I = M.get(z).texture;
          return D(I, z.mapping);
        } else {
          const I = z.image;
          if (I && I.height > 0) {
            const n = new ac(I.height / 2);
            return n.fromEquirectangularTexture(e, z), M.set(z, n), z.addEventListener("dispose", N), D(n.texture, z.mapping);
          } else
            return null;
        }
    }
    return z;
  }
  function N(z) {
    const A = z.target;
    A.removeEventListener("dispose", N);
    const I = M.get(A);
    I !== void 0 && (M.delete(A), I.dispose());
  }
  function i() {
    M = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: i
  };
}
const QN = 4, dn = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Vt = 20, xA = /* @__PURE__ */ new DT(), vn = /* @__PURE__ */ new kM();
let OA = null;
const Gt = (1 + Math.sqrt(5)) / 2, LN = 1 / Gt, Yn = [
  /* @__PURE__ */ new f(1, 1, 1),
  /* @__PURE__ */ new f(-1, 1, 1),
  /* @__PURE__ */ new f(1, 1, -1),
  /* @__PURE__ */ new f(-1, 1, -1),
  /* @__PURE__ */ new f(0, Gt, LN),
  /* @__PURE__ */ new f(0, Gt, -LN),
  /* @__PURE__ */ new f(LN, 0, Gt),
  /* @__PURE__ */ new f(-LN, 0, Gt),
  /* @__PURE__ */ new f(Gt, LN, 0),
  /* @__PURE__ */ new f(-Gt, LN, 0)
];
class pn {
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
  fromScene(M, D = 0, t = 0.1, N = 100) {
    OA = this._renderer.getRenderTarget(), this._setSize(256);
    const i = this._allocateTargets();
    return i.depthBuffer = !0, this._sceneToCubeUV(M, t, N, i), D > 0 && this._blur(i, 0, 0, D), this._applyPMREM(i), this._cleanup(i), i;
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
    this._cubemapMaterial === null && (this._cubemapMaterial = Qn(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = fn(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(OA), M.scissorTest = !1, qe(M, 0, 0, M.width, M.height);
  }
  _fromTexture(M, D) {
    M.mapping === _N || M.mapping === bN ? this._setSize(M.image.length === 0 ? 16 : M.image[0].width || M.image[0].image.width) : this._setSize(M.image.width / 4), OA = this._renderer.getRenderTarget();
    const t = D || this._allocateTargets();
    return this._textureToCubeUV(M, t), this._applyPMREM(t), this._cleanup(t), t;
  }
  _allocateTargets() {
    const M = 3 * Math.max(this._cubeSize, 112), D = 4 * this._cubeSize, t = {
      magFilter: yD,
      minFilter: yD,
      generateMipmaps: !1,
      type: oe,
      format: VD,
      encoding: tN,
      depthBuffer: !1
    }, N = Un(M, D, t);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== M || this._pingPongRenderTarget.height !== D) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Un(M, D, t);
      const { _lodMax: i } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Cc(i)), this._blurMaterial = Lc(i, M, D);
    }
    return N;
  }
  _compileMaterial(M) {
    const D = new JD(this._lodPlanes[0], M);
    this._renderer.compile(D, xA);
  }
  _sceneToCubeUV(M, D, t, N) {
    const A = new SD(90, 1, D, t), I = [1, -1, 1, 1, 1, 1], n = [1, 1, 1, -1, -1, -1], T = this._renderer, u = T.autoClear, g = T.toneMapping;
    T.getClearColor(vn), T.toneMapping = Lt, T.autoClear = !1;
    const s = new zT({
      name: "PMREM.Background",
      side: dD,
      depthWrite: !1,
      depthTest: !1
    }), j = new JD(new ve(), s);
    let r = !1;
    const c = M.background;
    c ? c.isColor && (s.color.copy(c), M.background = null, r = !0) : (s.color.copy(vn), r = !0);
    for (let y = 0; y < 6; y++) {
      const w = y % 3;
      w === 0 ? (A.up.set(0, I[y], 0), A.lookAt(n[y], 0, 0)) : w === 1 ? (A.up.set(0, 0, I[y]), A.lookAt(0, n[y], 0)) : (A.up.set(0, I[y], 0), A.lookAt(0, 0, n[y]));
      const a = this._cubeSize;
      qe(N, w * a, y > 2 ? a : 0, a, a), T.setRenderTarget(N), r && T.render(j, A), T.render(M, A);
    }
    j.geometry.dispose(), j.material.dispose(), T.toneMapping = g, T.autoClear = u, M.background = c;
  }
  _textureToCubeUV(M, D) {
    const t = this._renderer, N = M.mapping === _N || M.mapping === bN;
    N ? (this._cubemapMaterial === null && (this._cubemapMaterial = Qn()), this._cubemapMaterial.uniforms.flipEnvMap.value = M.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = fn());
    const i = N ? this._cubemapMaterial : this._equirectMaterial, z = new JD(this._lodPlanes[0], i), A = i.uniforms;
    A.envMap.value = M;
    const I = this._cubeSize;
    qe(D, 0, 0, 3 * I, 2 * I), t.setRenderTarget(D), t.render(z, xA);
  }
  _applyPMREM(M) {
    const D = this._renderer, t = D.autoClear;
    D.autoClear = !1;
    for (let N = 1; N < this._lodPlanes.length; N++) {
      const i = Math.sqrt(this._sigmas[N] * this._sigmas[N] - this._sigmas[N - 1] * this._sigmas[N - 1]), z = Yn[(N - 1) % Yn.length];
      this._blur(M, N - 1, N, i, z);
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
  _blur(M, D, t, N, i) {
    const z = this._pingPongRenderTarget;
    this._halfBlur(
      M,
      z,
      D,
      t,
      N,
      "latitudinal",
      i
    ), this._halfBlur(
      z,
      M,
      t,
      t,
      N,
      "longitudinal",
      i
    );
  }
  _halfBlur(M, D, t, N, i, z, A) {
    const I = this._renderer, n = this._blurMaterial;
    z !== "latitudinal" && z !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const T = 3, u = new JD(this._lodPlanes[N], n), g = n.uniforms, s = this._sizeLods[t] - 1, j = isFinite(i) ? Math.PI / (2 * s) : 2 * Math.PI / (2 * Vt - 1), r = i / j, c = isFinite(i) ? 1 + Math.floor(T * r) : Vt;
    c > Vt && console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${Vt}`);
    const y = [];
    let w = 0;
    for (let d = 0; d < Vt; ++d) {
      const L = d / r, h = Math.exp(-L * L / 2);
      y.push(h), d === 0 ? w += h : d < c && (w += 2 * h);
    }
    for (let d = 0; d < y.length; d++)
      y[d] = y[d] / w;
    g.envMap.value = M.texture, g.samples.value = c, g.weights.value = y, g.latitudinal.value = z === "latitudinal", A && (g.poleAxis.value = A);
    const { _lodMax: a } = this;
    g.dTheta.value = j, g.mipInt.value = a - t;
    const C = this._sizeLods[N], x = 3 * C * (N > a - QN ? N - a + QN : 0), l = 4 * (this._cubeSize - C);
    qe(D, x, l, 3 * C, 2 * C), I.setRenderTarget(D), I.render(u, xA);
  }
}
function Cc(e) {
  const M = [], D = [], t = [];
  let N = e;
  const i = e - QN + 1 + dn.length;
  for (let z = 0; z < i; z++) {
    const A = Math.pow(2, N);
    D.push(A);
    let I = 1 / A;
    z > e - QN ? I = dn[z - e + QN - 1] : z === 0 && (I = 0), t.push(I);
    const n = 1 / (A - 2), T = -n, u = 1 + n, g = [T, T, u, T, u, u, T, T, u, u, T, u], s = 6, j = 6, r = 3, c = 2, y = 1, w = new Float32Array(r * j * s), a = new Float32Array(c * j * s), C = new Float32Array(y * j * s);
    for (let l = 0; l < s; l++) {
      const d = l % 3 * 2 / 3 - 1, L = l > 2 ? 0 : -1, h = [
        d,
        L,
        0,
        d + 2 / 3,
        L,
        0,
        d + 2 / 3,
        L + 1,
        0,
        d,
        L,
        0,
        d + 2 / 3,
        L + 1,
        0,
        d,
        L + 1,
        0
      ];
      w.set(h, r * j * l), a.set(g, c * j * l);
      const p = [l, l, l, l, l, l];
      C.set(p, y * j * l);
    }
    const x = new VN();
    x.setAttribute("position", new Mt(w, r)), x.setAttribute("uv", new Mt(a, c)), x.setAttribute("faceIndex", new Mt(C, y)), M.push(x), N > QN && N--;
  }
  return { lodPlanes: M, sizeLods: D, sigmas: t };
}
function Un(e, M, D) {
  const t = new eN(e, M, D);
  return t.texture.mapping = mi, t.texture.name = "PMREM.cubeUv", t.scissorTest = !0, t;
}
function qe(e, M, D, t, N) {
  e.viewport.set(M, D, t, N), e.scissor.set(M, D, t, N);
}
function Lc(e, M, D) {
  const t = new Float32Array(Vt), N = new f(0, 1, 0);
  return new NN({
    name: "SphericalGaussianBlur",
    defines: {
      n: Vt,
      CUBEUV_TEXEL_WIDTH: 1 / M,
      CUBEUV_TEXEL_HEIGHT: 1 / D,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: t },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: N }
    },
    vertexShader: Lz(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: pt,
    depthTest: !1,
    depthWrite: !1
  });
}
function fn() {
  return new NN({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Lz(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: pt,
    depthTest: !1,
    depthWrite: !1
  });
}
function Qn() {
  return new NN({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Lz(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: pt,
    depthTest: !1,
    depthWrite: !1
  });
}
function Lz() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function wc(e) {
  let M = /* @__PURE__ */ new WeakMap(), D = null;
  function t(A) {
    if (A && A.isTexture) {
      const I = A.mapping, n = I === iz || I === Az, T = I === _N || I === bN;
      if (n || T)
        if (A.isRenderTargetTexture && A.needsPMREMUpdate === !0) {
          A.needsPMREMUpdate = !1;
          let u = M.get(A);
          return D === null && (D = new pn(e)), u = n ? D.fromEquirectangular(A, u) : D.fromCubemap(A, u), M.set(A, u), u.texture;
        } else {
          if (M.has(A))
            return M.get(A).texture;
          {
            const u = A.image;
            if (n && u && u.height > 0 || T && u && N(u)) {
              D === null && (D = new pn(e));
              const g = n ? D.fromEquirectangular(A) : D.fromCubemap(A);
              return M.set(A, g), A.addEventListener("dispose", i), g.texture;
            } else
              return null;
          }
        }
    }
    return A;
  }
  function N(A) {
    let I = 0;
    const n = 6;
    for (let T = 0; T < n; T++)
      A[T] !== void 0 && I++;
    return I === n;
  }
  function i(A) {
    const I = A.target;
    I.removeEventListener("dispose", i);
    const n = M.get(I);
    n !== void 0 && (M.delete(I), n.dispose());
  }
  function z() {
    M = /* @__PURE__ */ new WeakMap(), D !== null && (D.dispose(), D = null);
  }
  return {
    get: t,
    dispose: z
  };
}
function xc(e) {
  const M = {};
  function D(t) {
    if (M[t] !== void 0)
      return M[t];
    let N;
    switch (t) {
      case "WEBGL_depth_texture":
        N = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        N = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        N = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        N = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        N = e.getExtension(t);
    }
    return M[t] = N, N;
  }
  return {
    has: function(t) {
      return D(t) !== null;
    },
    init: function(t) {
      t.isWebGL2 ? D("EXT_color_buffer_float") : (D("WEBGL_depth_texture"), D("OES_texture_float"), D("OES_texture_half_float"), D("OES_texture_half_float_linear"), D("OES_standard_derivatives"), D("OES_element_index_uint"), D("OES_vertex_array_object"), D("ANGLE_instanced_arrays")), D("OES_texture_float_linear"), D("EXT_color_buffer_half_float"), D("WEBGL_multisampled_render_to_texture");
    },
    get: function(t) {
      const N = D(t);
      return N === null && console.warn("THREE.WebGLRenderer: " + t + " extension not supported."), N;
    }
  };
}
function Oc(e, M, D, t) {
  const N = {}, i = /* @__PURE__ */ new WeakMap();
  function z(u) {
    const g = u.target;
    g.index !== null && M.remove(g.index);
    for (const j in g.attributes)
      M.remove(g.attributes[j]);
    g.removeEventListener("dispose", z), delete N[g.id];
    const s = i.get(g);
    s && (M.remove(s), i.delete(g)), t.releaseStatesOfGeometry(g), g.isInstancedBufferGeometry === !0 && delete g._maxInstanceCount, D.memory.geometries--;
  }
  function A(u, g) {
    return N[g.id] === !0 || (g.addEventListener("dispose", z), N[g.id] = !0, D.memory.geometries++), g;
  }
  function I(u) {
    const g = u.attributes;
    for (const j in g)
      M.update(g[j], e.ARRAY_BUFFER);
    const s = u.morphAttributes;
    for (const j in s) {
      const r = s[j];
      for (let c = 0, y = r.length; c < y; c++)
        M.update(r[c], e.ARRAY_BUFFER);
    }
  }
  function n(u) {
    const g = [], s = u.index, j = u.attributes.position;
    let r = 0;
    if (s !== null) {
      const w = s.array;
      r = s.version;
      for (let a = 0, C = w.length; a < C; a += 3) {
        const x = w[a + 0], l = w[a + 1], d = w[a + 2];
        g.push(x, l, l, d, d, x);
      }
    } else {
      const w = j.array;
      r = j.version;
      for (let a = 0, C = w.length / 3 - 1; a < C; a += 3) {
        const x = a + 0, l = a + 1, d = a + 2;
        g.push(x, l, l, d, d, x);
      }
    }
    const c = new (NT(g) ? IT : nT)(g, 1);
    c.version = r;
    const y = i.get(u);
    y && M.remove(y), i.set(u, c);
  }
  function T(u) {
    const g = i.get(u);
    if (g) {
      const s = u.index;
      s !== null && g.version < s.version && n(u);
    } else
      n(u);
    return i.get(u);
  }
  return {
    get: A,
    update: I,
    getWireframeAttribute: T
  };
}
function Ec(e, M, D, t) {
  const N = t.isWebGL2;
  let i;
  function z(g) {
    i = g;
  }
  let A, I;
  function n(g) {
    A = g.type, I = g.bytesPerElement;
  }
  function T(g, s) {
    e.drawElements(i, s, A, g * I), D.update(s, i, 1);
  }
  function u(g, s, j) {
    if (j === 0)
      return;
    let r, c;
    if (N)
      r = e, c = "drawElementsInstanced";
    else if (r = M.get("ANGLE_instanced_arrays"), c = "drawElementsInstancedANGLE", r === null) {
      console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    r[c](i, s, A, g * I, j), D.update(s, i, j);
  }
  this.setMode = z, this.setIndex = n, this.render = T, this.renderInstances = u;
}
function lc(e) {
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
  function t(i, z, A) {
    switch (D.calls++, z) {
      case e.TRIANGLES:
        D.triangles += A * (i / 3);
        break;
      case e.LINES:
        D.lines += A * (i / 2);
        break;
      case e.LINE_STRIP:
        D.lines += A * (i - 1);
        break;
      case e.LINE_LOOP:
        D.lines += A * i;
        break;
      case e.POINTS:
        D.points += A * i;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", z);
        break;
    }
  }
  function N() {
    D.frame++, D.calls = 0, D.triangles = 0, D.points = 0, D.lines = 0;
  }
  return {
    memory: M,
    render: D,
    programs: null,
    autoReset: !0,
    reset: N,
    update: t
  };
}
class rT extends WD {
  constructor(M = null, D = 1, t = 1, N = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: M, width: D, height: t, depth: N }, this.magFilter = rD, this.minFilter = rD, this.wrapR = GD, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
function hc(e, M) {
  return e[0] - M[0];
}
function dc(e, M) {
  return Math.abs(M[1]) - Math.abs(e[1]);
}
function vc(e, M, D) {
  const t = {}, N = new Float32Array(8), i = /* @__PURE__ */ new WeakMap(), z = new tD(), A = [];
  for (let n = 0; n < 8; n++)
    A[n] = [n, 0];
  function I(n, T, u, g) {
    const s = n.morphTargetInfluences;
    if (M.isWebGL2 === !0) {
      const r = T.morphAttributes.position || T.morphAttributes.normal || T.morphAttributes.color, c = r !== void 0 ? r.length : 0;
      let y = i.get(T);
      if (y === void 0 || y.count !== c) {
        let W = function() {
          U.dispose(), i.delete(T), T.removeEventListener("dispose", W);
        };
        var j = W;
        y !== void 0 && y.texture.dispose();
        const C = T.morphAttributes.position !== void 0, x = T.morphAttributes.normal !== void 0, l = T.morphAttributes.color !== void 0, d = T.morphAttributes.position || [], L = T.morphAttributes.normal || [], h = T.morphAttributes.color || [];
        let p = 0;
        C === !0 && (p = 1), x === !0 && (p = 2), l === !0 && (p = 3);
        let P = T.attributes.position.count * p, H = 1;
        P > M.maxTextureSize && (H = Math.ceil(P / M.maxTextureSize), P = M.maxTextureSize);
        const Q = new Float32Array(P * H * 4 * c), U = new rT(Q, P, H, c);
        U.type = Wt, U.needsUpdate = !0;
        const Z = p * 4;
        for (let X = 0; X < c; X++) {
          const F = d[X], J = L[X], $ = h[X], IM = P * H * 4 * X;
          for (let S = 0; S < F.count; S++) {
            const V = S * Z;
            C === !0 && (z.fromBufferAttribute(F, S), Q[IM + V + 0] = z.x, Q[IM + V + 1] = z.y, Q[IM + V + 2] = z.z, Q[IM + V + 3] = 0), x === !0 && (z.fromBufferAttribute(J, S), Q[IM + V + 4] = z.x, Q[IM + V + 5] = z.y, Q[IM + V + 6] = z.z, Q[IM + V + 7] = 0), l === !0 && (z.fromBufferAttribute($, S), Q[IM + V + 8] = z.x, Q[IM + V + 9] = z.y, Q[IM + V + 10] = z.z, Q[IM + V + 11] = $.itemSize === 4 ? z.w : 1);
          }
        }
        y = {
          count: c,
          texture: U,
          size: new gM(P, H)
        }, i.set(T, y), T.addEventListener("dispose", W);
      }
      let w = 0;
      for (let C = 0; C < s.length; C++)
        w += s[C];
      const a = T.morphTargetsRelative ? 1 : 1 - w;
      g.getUniforms().setValue(e, "morphTargetBaseInfluence", a), g.getUniforms().setValue(e, "morphTargetInfluences", s), g.getUniforms().setValue(e, "morphTargetsTexture", y.texture, D), g.getUniforms().setValue(e, "morphTargetsTextureSize", y.size);
    } else {
      const r = s === void 0 ? 0 : s.length;
      let c = t[T.id];
      if (c === void 0 || c.length !== r) {
        c = [];
        for (let x = 0; x < r; x++)
          c[x] = [x, 0];
        t[T.id] = c;
      }
      for (let x = 0; x < r; x++) {
        const l = c[x];
        l[0] = x, l[1] = s[x];
      }
      c.sort(dc);
      for (let x = 0; x < 8; x++)
        x < r && c[x][1] ? (A[x][0] = c[x][0], A[x][1] = c[x][1]) : (A[x][0] = Number.MAX_SAFE_INTEGER, A[x][1] = 0);
      A.sort(hc);
      const y = T.morphAttributes.position, w = T.morphAttributes.normal;
      let a = 0;
      for (let x = 0; x < 8; x++) {
        const l = A[x], d = l[0], L = l[1];
        d !== Number.MAX_SAFE_INTEGER && L ? (y && T.getAttribute("morphTarget" + x) !== y[d] && T.setAttribute("morphTarget" + x, y[d]), w && T.getAttribute("morphNormal" + x) !== w[d] && T.setAttribute("morphNormal" + x, w[d]), N[x] = L, a += L) : (y && T.hasAttribute("morphTarget" + x) === !0 && T.deleteAttribute("morphTarget" + x), w && T.hasAttribute("morphNormal" + x) === !0 && T.deleteAttribute("morphNormal" + x), N[x] = 0);
      }
      const C = T.morphTargetsRelative ? 1 : 1 - a;
      g.getUniforms().setValue(e, "morphTargetBaseInfluence", C), g.getUniforms().setValue(e, "morphTargetInfluences", N);
    }
  }
  return {
    update: I
  };
}
function Yc(e, M, D, t) {
  let N = /* @__PURE__ */ new WeakMap();
  function i(I) {
    const n = t.render.frame, T = I.geometry, u = M.get(I, T);
    return N.get(u) !== n && (M.update(u), N.set(u, n)), I.isInstancedMesh && (I.hasEventListener("dispose", A) === !1 && I.addEventListener("dispose", A), D.update(I.instanceMatrix, e.ARRAY_BUFFER), I.instanceColor !== null && D.update(I.instanceColor, e.ARRAY_BUFFER)), u;
  }
  function z() {
    N = /* @__PURE__ */ new WeakMap();
  }
  function A(I) {
    const n = I.target;
    n.removeEventListener("dispose", A), D.remove(n.instanceMatrix), n.instanceColor !== null && D.remove(n.instanceColor);
  }
  return {
    update: i,
    dispose: z
  };
}
class pc extends WD {
  constructor(M = null, D = 1, t = 1, N = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: M, width: D, height: t, depth: N }, this.magFilter = rD, this.minFilter = rD, this.wrapR = GD, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const cT = /* @__PURE__ */ new WD(), jT = /* @__PURE__ */ new rT(), yT = /* @__PURE__ */ new pc(), aT = /* @__PURE__ */ new sT(), mn = [], kn = [], Sn = new Float32Array(16), Zn = new Float32Array(9), _n = new Float32Array(4);
function HN(e, M, D) {
  const t = e[0];
  if (t <= 0 || t > 0)
    return e;
  const N = M * D;
  let i = mn[N];
  if (i === void 0 && (i = new Float32Array(N), mn[N] = i), M !== 0) {
    t.toArray(i, 0);
    for (let z = 1, A = 0; z !== M; ++z)
      A += D, e[z].toArray(i, A);
  }
  return i;
}
function WM(e, M) {
  if (e.length !== M.length)
    return !1;
  for (let D = 0, t = e.length; D < t; D++)
    if (e[D] !== M[D])
      return !1;
  return !0;
}
function XM(e, M) {
  for (let D = 0, t = M.length; D < t; D++)
    e[D] = M[D];
}
function ki(e, M) {
  let D = kn[M];
  D === void 0 && (D = new Int32Array(M), kn[M] = D);
  for (let t = 0; t !== M; ++t)
    D[t] = e.allocateTextureUnit();
  return D;
}
function Uc(e, M) {
  const D = this.cache;
  D[0] !== M && (e.uniform1f(this.addr, M), D[0] = M);
}
function fc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (e.uniform2f(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (WM(D, M))
      return;
    e.uniform2fv(this.addr, M), XM(D, M);
  }
}
function Qc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (e.uniform3f(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else if (M.r !== void 0)
    (D[0] !== M.r || D[1] !== M.g || D[2] !== M.b) && (e.uniform3f(this.addr, M.r, M.g, M.b), D[0] = M.r, D[1] = M.g, D[2] = M.b);
  else {
    if (WM(D, M))
      return;
    e.uniform3fv(this.addr, M), XM(D, M);
  }
}
function mc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (e.uniform4f(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (WM(D, M))
      return;
    e.uniform4fv(this.addr, M), XM(D, M);
  }
}
function kc(e, M) {
  const D = this.cache, t = M.elements;
  if (t === void 0) {
    if (WM(D, M))
      return;
    e.uniformMatrix2fv(this.addr, !1, M), XM(D, M);
  } else {
    if (WM(D, t))
      return;
    _n.set(t), e.uniformMatrix2fv(this.addr, !1, _n), XM(D, t);
  }
}
function Sc(e, M) {
  const D = this.cache, t = M.elements;
  if (t === void 0) {
    if (WM(D, M))
      return;
    e.uniformMatrix3fv(this.addr, !1, M), XM(D, M);
  } else {
    if (WM(D, t))
      return;
    Zn.set(t), e.uniformMatrix3fv(this.addr, !1, Zn), XM(D, t);
  }
}
function Zc(e, M) {
  const D = this.cache, t = M.elements;
  if (t === void 0) {
    if (WM(D, M))
      return;
    e.uniformMatrix4fv(this.addr, !1, M), XM(D, M);
  } else {
    if (WM(D, t))
      return;
    Sn.set(t), e.uniformMatrix4fv(this.addr, !1, Sn), XM(D, t);
  }
}
function _c(e, M) {
  const D = this.cache;
  D[0] !== M && (e.uniform1i(this.addr, M), D[0] = M);
}
function bc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (e.uniform2i(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (WM(D, M))
      return;
    e.uniform2iv(this.addr, M), XM(D, M);
  }
}
function Kc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (e.uniform3i(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else {
    if (WM(D, M))
      return;
    e.uniform3iv(this.addr, M), XM(D, M);
  }
}
function Rc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (e.uniform4i(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (WM(D, M))
      return;
    e.uniform4iv(this.addr, M), XM(D, M);
  }
}
function Pc(e, M) {
  const D = this.cache;
  D[0] !== M && (e.uniform1ui(this.addr, M), D[0] = M);
}
function Fc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (e.uniform2ui(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (WM(D, M))
      return;
    e.uniform2uiv(this.addr, M), XM(D, M);
  }
}
function Bc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (e.uniform3ui(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else {
    if (WM(D, M))
      return;
    e.uniform3uiv(this.addr, M), XM(D, M);
  }
}
function Gc(e, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (e.uniform4ui(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (WM(D, M))
      return;
    e.uniform4uiv(this.addr, M), XM(D, M);
  }
}
function Vc(e, M, D) {
  const t = this.cache, N = D.allocateTextureUnit();
  t[0] !== N && (e.uniform1i(this.addr, N), t[0] = N), D.setTexture2D(M || cT, N);
}
function Hc(e, M, D) {
  const t = this.cache, N = D.allocateTextureUnit();
  t[0] !== N && (e.uniform1i(this.addr, N), t[0] = N), D.setTexture3D(M || yT, N);
}
function Wc(e, M, D) {
  const t = this.cache, N = D.allocateTextureUnit();
  t[0] !== N && (e.uniform1i(this.addr, N), t[0] = N), D.setTextureCube(M || aT, N);
}
function Xc(e, M, D) {
  const t = this.cache, N = D.allocateTextureUnit();
  t[0] !== N && (e.uniform1i(this.addr, N), t[0] = N), D.setTexture2DArray(M || jT, N);
}
function qc(e) {
  switch (e) {
    case 5126:
      return Uc;
    case 35664:
      return fc;
    case 35665:
      return Qc;
    case 35666:
      return mc;
    case 35674:
      return kc;
    case 35675:
      return Sc;
    case 35676:
      return Zc;
    case 5124:
    case 35670:
      return _c;
    case 35667:
    case 35671:
      return bc;
    case 35668:
    case 35672:
      return Kc;
    case 35669:
    case 35673:
      return Rc;
    case 5125:
      return Pc;
    case 36294:
      return Fc;
    case 36295:
      return Bc;
    case 36296:
      return Gc;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Vc;
    case 35679:
    case 36299:
    case 36307:
      return Hc;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Wc;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Xc;
  }
}
function $c(e, M) {
  e.uniform1fv(this.addr, M);
}
function Jc(e, M) {
  const D = HN(M, this.size, 2);
  e.uniform2fv(this.addr, D);
}
function Mj(e, M) {
  const D = HN(M, this.size, 3);
  e.uniform3fv(this.addr, D);
}
function Dj(e, M) {
  const D = HN(M, this.size, 4);
  e.uniform4fv(this.addr, D);
}
function tj(e, M) {
  const D = HN(M, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, D);
}
function Nj(e, M) {
  const D = HN(M, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, D);
}
function ej(e, M) {
  const D = HN(M, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, D);
}
function ij(e, M) {
  e.uniform1iv(this.addr, M);
}
function Aj(e, M) {
  e.uniform2iv(this.addr, M);
}
function zj(e, M) {
  e.uniform3iv(this.addr, M);
}
function nj(e, M) {
  e.uniform4iv(this.addr, M);
}
function Ij(e, M) {
  e.uniform1uiv(this.addr, M);
}
function Tj(e, M) {
  e.uniform2uiv(this.addr, M);
}
function uj(e, M) {
  e.uniform3uiv(this.addr, M);
}
function gj(e, M) {
  e.uniform4uiv(this.addr, M);
}
function sj(e, M, D) {
  const t = this.cache, N = M.length, i = ki(D, N);
  WM(t, i) || (e.uniform1iv(this.addr, i), XM(t, i));
  for (let z = 0; z !== N; ++z)
    D.setTexture2D(M[z] || cT, i[z]);
}
function rj(e, M, D) {
  const t = this.cache, N = M.length, i = ki(D, N);
  WM(t, i) || (e.uniform1iv(this.addr, i), XM(t, i));
  for (let z = 0; z !== N; ++z)
    D.setTexture3D(M[z] || yT, i[z]);
}
function cj(e, M, D) {
  const t = this.cache, N = M.length, i = ki(D, N);
  WM(t, i) || (e.uniform1iv(this.addr, i), XM(t, i));
  for (let z = 0; z !== N; ++z)
    D.setTextureCube(M[z] || aT, i[z]);
}
function jj(e, M, D) {
  const t = this.cache, N = M.length, i = ki(D, N);
  WM(t, i) || (e.uniform1iv(this.addr, i), XM(t, i));
  for (let z = 0; z !== N; ++z)
    D.setTexture2DArray(M[z] || jT, i[z]);
}
function yj(e) {
  switch (e) {
    case 5126:
      return $c;
    case 35664:
      return Jc;
    case 35665:
      return Mj;
    case 35666:
      return Dj;
    case 35674:
      return tj;
    case 35675:
      return Nj;
    case 35676:
      return ej;
    case 5124:
    case 35670:
      return ij;
    case 35667:
    case 35671:
      return Aj;
    case 35668:
    case 35672:
      return zj;
    case 35669:
    case 35673:
      return nj;
    case 5125:
      return Ij;
    case 36294:
      return Tj;
    case 36295:
      return uj;
    case 36296:
      return gj;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return sj;
    case 35679:
    case 36299:
    case 36307:
      return rj;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return cj;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return jj;
  }
}
class aj {
  constructor(M, D, t) {
    this.id = M, this.addr = t, this.cache = [], this.setValue = qc(D.type);
  }
}
class oj {
  constructor(M, D, t) {
    this.id = M, this.addr = t, this.cache = [], this.size = D.size, this.setValue = yj(D.type);
  }
}
class Cj {
  constructor(M) {
    this.id = M, this.seq = [], this.map = {};
  }
  setValue(M, D, t) {
    const N = this.seq;
    for (let i = 0, z = N.length; i !== z; ++i) {
      const A = N[i];
      A.setValue(M, D[A.id], t);
    }
  }
}
const EA = /(\w+)(\])?(\[|\.)?/g;
function bn(e, M) {
  e.seq.push(M), e.map[M.id] = M;
}
function Lj(e, M, D) {
  const t = e.name, N = t.length;
  for (EA.lastIndex = 0; ; ) {
    const i = EA.exec(t), z = EA.lastIndex;
    let A = i[1];
    const I = i[2] === "]", n = i[3];
    if (I && (A = A | 0), n === void 0 || n === "[" && z + 2 === N) {
      bn(D, n === void 0 ? new aj(A, e, M) : new oj(A, e, M));
      break;
    } else {
      let u = D.map[A];
      u === void 0 && (u = new Cj(A), bn(D, u)), D = u;
    }
  }
}
class Ei {
  constructor(M, D) {
    this.seq = [], this.map = {};
    const t = M.getProgramParameter(D, M.ACTIVE_UNIFORMS);
    for (let N = 0; N < t; ++N) {
      const i = M.getActiveUniform(D, N), z = M.getUniformLocation(D, i.name);
      Lj(i, z, this);
    }
  }
  setValue(M, D, t, N) {
    const i = this.map[D];
    i !== void 0 && i.setValue(M, t, N);
  }
  setOptional(M, D, t) {
    const N = D[t];
    N !== void 0 && this.setValue(M, t, N);
  }
  static upload(M, D, t, N) {
    for (let i = 0, z = D.length; i !== z; ++i) {
      const A = D[i], I = t[A.id];
      I.needsUpdate !== !1 && A.setValue(M, I.value, N);
    }
  }
  static seqWithValue(M, D) {
    const t = [];
    for (let N = 0, i = M.length; N !== i; ++N) {
      const z = M[N];
      z.id in D && t.push(z);
    }
    return t;
  }
}
function Kn(e, M, D) {
  const t = e.createShader(M);
  return e.shaderSource(t, D), e.compileShader(t), t;
}
let wj = 0;
function xj(e, M) {
  const D = e.split(`
`), t = [], N = Math.max(M - 6, 0), i = Math.min(M + 6, D.length);
  for (let z = N; z < i; z++) {
    const A = z + 1;
    t.push(`${A === M ? ">" : " "} ${A}: ${D[z]}`);
  }
  return t.join(`
`);
}
function Oj(e) {
  switch (e) {
    case tN:
      return ["Linear", "( value )"];
    case SM:
      return ["sRGB", "( value )"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported encoding:", e), ["Linear", "( value )"];
  }
}
function Rn(e, M, D) {
  const t = e.getShaderParameter(M, e.COMPILE_STATUS), N = e.getShaderInfoLog(M).trim();
  if (t && N === "")
    return "";
  const i = /ERROR: 0:(\d+)/.exec(N);
  if (i) {
    const z = parseInt(i[1]);
    return D.toUpperCase() + `

` + N + `

` + xj(e.getShaderSource(M), z);
  } else
    return N;
}
function Ej(e, M) {
  const D = Oj(M);
  return "vec4 " + e + "( vec4 value ) { return LinearTo" + D[0] + D[1] + "; }";
}
function lj(e, M) {
  let D;
  switch (M) {
    case Ru:
      D = "Linear";
      break;
    case Pu:
      D = "Reinhard";
      break;
    case Fu:
      D = "OptimizedCineon";
      break;
    case Bu:
      D = "ACESFilmic";
      break;
    case Gu:
      D = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", M), D = "Linear";
  }
  return "vec3 " + e + "( vec3 color ) { return " + D + "ToneMapping( color ); }";
}
function hj(e) {
  return [
    e.extensionDerivatives || e.envMapCubeUVHeight || e.bumpMap || e.tangentSpaceNormalMap || e.clearcoatNormalMap || e.flatShading || e.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "",
    (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
    e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
    (e.extensionShaderTextureLOD || e.envMap || e.transmission) && e.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""
  ].filter(ge).join(`
`);
}
function dj(e) {
  const M = [];
  for (const D in e) {
    const t = e[D];
    t !== !1 && M.push("#define " + D + " " + t);
  }
  return M.join(`
`);
}
function vj(e, M) {
  const D = {}, t = e.getProgramParameter(M, e.ACTIVE_ATTRIBUTES);
  for (let N = 0; N < t; N++) {
    const i = e.getActiveAttrib(M, N), z = i.name;
    let A = 1;
    i.type === e.FLOAT_MAT2 && (A = 2), i.type === e.FLOAT_MAT3 && (A = 3), i.type === e.FLOAT_MAT4 && (A = 4), D[z] = {
      type: i.type,
      location: e.getAttribLocation(M, z),
      locationSize: A
    };
  }
  return D;
}
function ge(e) {
  return e !== "";
}
function Pn(e, M) {
  const D = M.numSpotLightShadows + M.numSpotLightMaps - M.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, M.numDirLights).replace(/NUM_SPOT_LIGHTS/g, M.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, M.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, D).replace(/NUM_RECT_AREA_LIGHTS/g, M.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, M.numPointLights).replace(/NUM_HEMI_LIGHTS/g, M.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, M.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, M.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, M.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, M.numPointLightShadows);
}
function Fn(e, M) {
  return e.replace(/NUM_CLIPPING_PLANES/g, M.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, M.numClippingPlanes - M.numClipIntersection);
}
const Yj = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Tz(e) {
  return e.replace(Yj, pj);
}
function pj(e, M) {
  const D = EM[M];
  if (D === void 0)
    throw new Error("Can not resolve #include <" + M + ">");
  return Tz(D);
}
const Uj = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Bn(e) {
  return e.replace(Uj, fj);
}
function fj(e, M, D, t) {
  let N = "";
  for (let i = parseInt(M); i < parseInt(D); i++)
    N += t.replace(/\[\s*i\s*\]/g, "[ " + i + " ]").replace(/UNROLLED_LOOP_INDEX/g, i);
  return N;
}
function Gn(e) {
  let M = "precision " + e.precision + ` float;
precision ` + e.precision + " int;";
  return e.precision === "highp" ? M += `
#define HIGH_PRECISION` : e.precision === "mediump" ? M += `
#define MEDIUM_PRECISION` : e.precision === "lowp" && (M += `
#define LOW_PRECISION`), M;
}
function Qj(e) {
  let M = "SHADOWMAP_TYPE_BASIC";
  return e.shadowMapType === VI ? M = "SHADOWMAP_TYPE_PCF" : e.shadowMapType === Cu ? M = "SHADOWMAP_TYPE_PCF_SOFT" : e.shadowMapType === ue && (M = "SHADOWMAP_TYPE_VSM"), M;
}
function mj(e) {
  let M = "ENVMAP_TYPE_CUBE";
  if (e.envMap)
    switch (e.envMapMode) {
      case _N:
      case bN:
        M = "ENVMAP_TYPE_CUBE";
        break;
      case mi:
        M = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return M;
}
function kj(e) {
  let M = "ENVMAP_MODE_REFLECTION";
  if (e.envMap)
    switch (e.envMapMode) {
      case bN:
        M = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return M;
}
function Sj(e) {
  let M = "ENVMAP_BLENDING_NONE";
  if (e.envMap)
    switch (e.combine) {
      case yz:
        M = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case bu:
        M = "ENVMAP_BLENDING_MIX";
        break;
      case Ku:
        M = "ENVMAP_BLENDING_ADD";
        break;
    }
  return M;
}
function Zj(e) {
  const M = e.envMapCubeUVHeight;
  if (M === null)
    return null;
  const D = Math.log2(M) - 2, t = 1 / M;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, D), 7 * 16)), texelHeight: t, maxMip: D };
}
function _j(e, M, D, t) {
  const N = e.getContext(), i = D.defines;
  let z = D.vertexShader, A = D.fragmentShader;
  const I = Qj(D), n = mj(D), T = kj(D), u = Sj(D), g = Zj(D), s = D.isWebGL2 ? "" : hj(D), j = dj(i), r = N.createProgram();
  let c, y, w = D.glslVersion ? "#version " + D.glslVersion + `
` : "";
  D.isRawShaderMaterial ? (c = [
    j
  ].filter(ge).join(`
`), c.length > 0 && (c += `
`), y = [
    s,
    j
  ].filter(ge).join(`
`), y.length > 0 && (y += `
`)) : (c = [
    Gn(D),
    "#define SHADER_NAME " + D.shaderName,
    j,
    D.instancing ? "#define USE_INSTANCING" : "",
    D.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    D.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",
    D.useFog && D.fog ? "#define USE_FOG" : "",
    D.useFog && D.fogExp2 ? "#define FOG_EXP2" : "",
    D.map ? "#define USE_MAP" : "",
    D.envMap ? "#define USE_ENVMAP" : "",
    D.envMap ? "#define " + T : "",
    D.lightMap ? "#define USE_LIGHTMAP" : "",
    D.aoMap ? "#define USE_AOMAP" : "",
    D.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    D.bumpMap ? "#define USE_BUMPMAP" : "",
    D.normalMap ? "#define USE_NORMALMAP" : "",
    D.normalMap && D.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "",
    D.normalMap && D.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "",
    D.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    D.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    D.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    D.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    D.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    D.displacementMap && D.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "",
    D.specularMap ? "#define USE_SPECULARMAP" : "",
    D.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "",
    D.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "",
    D.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    D.metalnessMap ? "#define USE_METALNESSMAP" : "",
    D.alphaMap ? "#define USE_ALPHAMAP" : "",
    D.transmission ? "#define USE_TRANSMISSION" : "",
    D.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    D.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    D.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "",
    D.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "",
    D.vertexTangents ? "#define USE_TANGENT" : "",
    D.vertexColors ? "#define USE_COLOR" : "",
    D.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    D.vertexUvs ? "#define USE_UV" : "",
    D.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
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
    D.shadowMapEnabled ? "#define " + I : "",
    D.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
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
  ].filter(ge).join(`
`), y = [
    s,
    Gn(D),
    "#define SHADER_NAME " + D.shaderName,
    j,
    D.useFog && D.fog ? "#define USE_FOG" : "",
    D.useFog && D.fogExp2 ? "#define FOG_EXP2" : "",
    D.map ? "#define USE_MAP" : "",
    D.matcap ? "#define USE_MATCAP" : "",
    D.envMap ? "#define USE_ENVMAP" : "",
    D.envMap ? "#define " + n : "",
    D.envMap ? "#define " + T : "",
    D.envMap ? "#define " + u : "",
    g ? "#define CUBEUV_TEXEL_WIDTH " + g.texelWidth : "",
    g ? "#define CUBEUV_TEXEL_HEIGHT " + g.texelHeight : "",
    g ? "#define CUBEUV_MAX_MIP " + g.maxMip + ".0" : "",
    D.lightMap ? "#define USE_LIGHTMAP" : "",
    D.aoMap ? "#define USE_AOMAP" : "",
    D.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    D.bumpMap ? "#define USE_BUMPMAP" : "",
    D.normalMap ? "#define USE_NORMALMAP" : "",
    D.normalMap && D.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "",
    D.normalMap && D.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "",
    D.clearcoat ? "#define USE_CLEARCOAT" : "",
    D.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    D.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    D.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    D.iridescence ? "#define USE_IRIDESCENCE" : "",
    D.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    D.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    D.specularMap ? "#define USE_SPECULARMAP" : "",
    D.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "",
    D.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "",
    D.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    D.metalnessMap ? "#define USE_METALNESSMAP" : "",
    D.alphaMap ? "#define USE_ALPHAMAP" : "",
    D.alphaTest ? "#define USE_ALPHATEST" : "",
    D.sheen ? "#define USE_SHEEN" : "",
    D.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "",
    D.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "",
    D.transmission ? "#define USE_TRANSMISSION" : "",
    D.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    D.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    D.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    D.vertexTangents ? "#define USE_TANGENT" : "",
    D.vertexColors || D.instancingColor ? "#define USE_COLOR" : "",
    D.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    D.vertexUvs ? "#define USE_UV" : "",
    D.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
    D.gradientMap ? "#define USE_GRADIENTMAP" : "",
    D.flatShading ? "#define FLAT_SHADED" : "",
    D.doubleSided ? "#define DOUBLE_SIDED" : "",
    D.flipSided ? "#define FLIP_SIDED" : "",
    D.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    D.shadowMapEnabled ? "#define " + I : "",
    D.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    D.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "",
    D.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    D.logarithmicDepthBuffer && D.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    D.toneMapping !== Lt ? "#define TONE_MAPPING" : "",
    D.toneMapping !== Lt ? EM.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    D.toneMapping !== Lt ? lj("toneMapping", D.toneMapping) : "",
    D.dithering ? "#define DITHERING" : "",
    D.opaque ? "#define OPAQUE" : "",
    EM.encodings_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Ej("linearToOutputTexel", D.outputEncoding),
    D.useDepthPacking ? "#define DEPTH_PACKING " + D.depthPacking : "",
    `
`
  ].filter(ge).join(`
`)), z = Tz(z), z = Pn(z, D), z = Fn(z, D), A = Tz(A), A = Pn(A, D), A = Fn(A, D), z = Bn(z), A = Bn(A), D.isWebGL2 && D.isRawShaderMaterial !== !0 && (w = `#version 300 es
`, c = [
    "precision mediump sampler2DArray;",
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + c, y = [
    "#define varying in",
    D.glslVersion === wn ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    D.glslVersion === wn ? "" : "#define gl_FragColor pc_fragColor",
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
` + y);
  const a = w + c + z, C = w + y + A, x = Kn(N, N.VERTEX_SHADER, a), l = Kn(N, N.FRAGMENT_SHADER, C);
  if (N.attachShader(r, x), N.attachShader(r, l), D.index0AttributeName !== void 0 ? N.bindAttribLocation(r, 0, D.index0AttributeName) : D.morphTargets === !0 && N.bindAttribLocation(r, 0, "position"), N.linkProgram(r), e.debug.checkShaderErrors) {
    const h = N.getProgramInfoLog(r).trim(), p = N.getShaderInfoLog(x).trim(), P = N.getShaderInfoLog(l).trim();
    let H = !0, Q = !0;
    if (N.getProgramParameter(r, N.LINK_STATUS) === !1) {
      H = !1;
      const U = Rn(N, x, "vertex"), Z = Rn(N, l, "fragment");
      console.error(
        "THREE.WebGLProgram: Shader Error " + N.getError() + " - VALIDATE_STATUS " + N.getProgramParameter(r, N.VALIDATE_STATUS) + `

Program Info Log: ` + h + `
` + U + `
` + Z
      );
    } else
      h !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", h) : (p === "" || P === "") && (Q = !1);
    Q && (this.diagnostics = {
      runnable: H,
      programLog: h,
      vertexShader: {
        log: p,
        prefix: c
      },
      fragmentShader: {
        log: P,
        prefix: y
      }
    });
  }
  N.deleteShader(x), N.deleteShader(l);
  let d;
  this.getUniforms = function() {
    return d === void 0 && (d = new Ei(N, r)), d;
  };
  let L;
  return this.getAttributes = function() {
    return L === void 0 && (L = vj(N, r)), L;
  }, this.destroy = function() {
    t.releaseStatesOfProgram(this), N.deleteProgram(r), this.program = void 0;
  }, this.name = D.shaderName, this.id = wj++, this.cacheKey = M, this.usedTimes = 1, this.program = r, this.vertexShader = x, this.fragmentShader = l, this;
}
let bj = 0;
class Kj {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(M) {
    const D = M.vertexShader, t = M.fragmentShader, N = this._getShaderStage(D), i = this._getShaderStage(t), z = this._getShaderCacheForMaterial(M);
    return z.has(N) === !1 && (z.add(N), N.usedTimes++), z.has(i) === !1 && (z.add(i), i.usedTimes++), this;
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
    return t === void 0 && (t = new Rj(M), D.set(M, t)), t;
  }
}
class Rj {
  constructor(M) {
    this.id = bj++, this.code = M, this.usedTimes = 0;
  }
}
function Pj(e, M, D, t, N, i, z) {
  const A = new FI(), I = new Kj(), n = [], T = N.isWebGL2, u = N.logarithmicDepthBuffer, g = N.vertexTextures;
  let s = N.precision;
  const j = {
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
  function r(L, h, p, P, H) {
    const Q = P.fog, U = H.geometry, Z = L.isMeshStandardMaterial ? P.environment : null, W = (L.isMeshStandardMaterial ? D : M).get(L.envMap || Z), X = W && W.mapping === mi ? W.image.height : null, F = j[L.type];
    L.precision !== null && (s = N.getMaxPrecision(L.precision), s !== L.precision && console.warn("THREE.WebGLProgram.getParameters:", L.precision, "not supported, using", s, "instead."));
    const J = U.morphAttributes.position || U.morphAttributes.normal || U.morphAttributes.color, $ = J !== void 0 ? J.length : 0;
    let IM = 0;
    U.morphAttributes.position !== void 0 && (IM = 1), U.morphAttributes.normal !== void 0 && (IM = 2), U.morphAttributes.color !== void 0 && (IM = 3);
    let S, V, NM, eM;
    if (F) {
      const mM = qD[F];
      S = mM.vertexShader, V = mM.fragmentShader;
    } else
      S = L.vertexShader, V = L.fragmentShader, I.update(L), NM = I.getVertexShaderID(L), eM = I.getFragmentShaderID(L);
    const v = e.getRenderTarget(), xM = L.alphaTest > 0, sM = L.clearcoat > 0, rM = L.iridescence > 0;
    return {
      isWebGL2: T,
      shaderID: F,
      shaderName: L.type,
      vertexShader: S,
      fragmentShader: V,
      defines: L.defines,
      customVertexShaderID: NM,
      customFragmentShaderID: eM,
      isRawShaderMaterial: L.isRawShaderMaterial === !0,
      glslVersion: L.glslVersion,
      precision: s,
      instancing: H.isInstancedMesh === !0,
      instancingColor: H.isInstancedMesh === !0 && H.instanceColor !== null,
      supportsVertexTextures: g,
      outputEncoding: v === null ? e.outputEncoding : v.isXRRenderTarget === !0 ? v.texture.encoding : tN,
      map: !!L.map,
      matcap: !!L.matcap,
      envMap: !!W,
      envMapMode: W && W.mapping,
      envMapCubeUVHeight: X,
      lightMap: !!L.lightMap,
      aoMap: !!L.aoMap,
      emissiveMap: !!L.emissiveMap,
      bumpMap: !!L.bumpMap,
      normalMap: !!L.normalMap,
      objectSpaceNormalMap: L.normalMapType === ug,
      tangentSpaceNormalMap: L.normalMapType === $I,
      decodeVideoTexture: !!L.map && L.map.isVideoTexture === !0 && L.map.encoding === SM,
      clearcoat: sM,
      clearcoatMap: sM && !!L.clearcoatMap,
      clearcoatRoughnessMap: sM && !!L.clearcoatRoughnessMap,
      clearcoatNormalMap: sM && !!L.clearcoatNormalMap,
      iridescence: rM,
      iridescenceMap: rM && !!L.iridescenceMap,
      iridescenceThicknessMap: rM && !!L.iridescenceThicknessMap,
      displacementMap: !!L.displacementMap,
      roughnessMap: !!L.roughnessMap,
      metalnessMap: !!L.metalnessMap,
      specularMap: !!L.specularMap,
      specularIntensityMap: !!L.specularIntensityMap,
      specularColorMap: !!L.specularColorMap,
      opaque: L.transparent === !1 && L.blending === kN,
      alphaMap: !!L.alphaMap,
      alphaTest: xM,
      gradientMap: !!L.gradientMap,
      sheen: L.sheen > 0,
      sheenColorMap: !!L.sheenColorMap,
      sheenRoughnessMap: !!L.sheenRoughnessMap,
      transmission: L.transmission > 0,
      transmissionMap: !!L.transmissionMap,
      thicknessMap: !!L.thicknessMap,
      combine: L.combine,
      vertexTangents: !!L.normalMap && !!U.attributes.tangent,
      vertexColors: L.vertexColors,
      vertexAlphas: L.vertexColors === !0 && !!U.attributes.color && U.attributes.color.itemSize === 4,
      vertexUvs: !!L.map || !!L.bumpMap || !!L.normalMap || !!L.specularMap || !!L.alphaMap || !!L.emissiveMap || !!L.roughnessMap || !!L.metalnessMap || !!L.clearcoatMap || !!L.clearcoatRoughnessMap || !!L.clearcoatNormalMap || !!L.iridescenceMap || !!L.iridescenceThicknessMap || !!L.displacementMap || !!L.transmissionMap || !!L.thicknessMap || !!L.specularIntensityMap || !!L.specularColorMap || !!L.sheenColorMap || !!L.sheenRoughnessMap,
      uvsVertexOnly: !(L.map || L.bumpMap || L.normalMap || L.specularMap || L.alphaMap || L.emissiveMap || L.roughnessMap || L.metalnessMap || L.clearcoatNormalMap || L.iridescenceMap || L.iridescenceThicknessMap || L.transmission > 0 || L.transmissionMap || L.thicknessMap || L.specularIntensityMap || L.specularColorMap || L.sheen > 0 || L.sheenColorMap || L.sheenRoughnessMap) && !!L.displacementMap,
      fog: !!Q,
      useFog: L.fog === !0,
      fogExp2: Q && Q.isFogExp2,
      flatShading: !!L.flatShading,
      sizeAttenuation: L.sizeAttenuation,
      logarithmicDepthBuffer: u,
      skinning: H.isSkinnedMesh === !0,
      morphTargets: U.morphAttributes.position !== void 0,
      morphNormals: U.morphAttributes.normal !== void 0,
      morphColors: U.morphAttributes.color !== void 0,
      morphTargetsCount: $,
      morphTextureStride: IM,
      numDirLights: h.directional.length,
      numPointLights: h.point.length,
      numSpotLights: h.spot.length,
      numSpotLightMaps: h.spotLightMap.length,
      numRectAreaLights: h.rectArea.length,
      numHemiLights: h.hemi.length,
      numDirLightShadows: h.directionalShadowMap.length,
      numPointLightShadows: h.pointShadowMap.length,
      numSpotLightShadows: h.spotShadowMap.length,
      numSpotLightShadowsWithMaps: h.numSpotLightShadowsWithMaps,
      numClippingPlanes: z.numPlanes,
      numClipIntersection: z.numIntersection,
      dithering: L.dithering,
      shadowMapEnabled: e.shadowMap.enabled && p.length > 0,
      shadowMapType: e.shadowMap.type,
      toneMapping: L.toneMapped ? e.toneMapping : Lt,
      physicallyCorrectLights: e.physicallyCorrectLights,
      premultipliedAlpha: L.premultipliedAlpha,
      doubleSided: L.side === Yt,
      flipSided: L.side === dD,
      useDepthPacking: !!L.depthPacking,
      depthPacking: L.depthPacking || 0,
      index0AttributeName: L.index0AttributeName,
      extensionDerivatives: L.extensions && L.extensions.derivatives,
      extensionFragDepth: L.extensions && L.extensions.fragDepth,
      extensionDrawBuffers: L.extensions && L.extensions.drawBuffers,
      extensionShaderTextureLOD: L.extensions && L.extensions.shaderTextureLOD,
      rendererExtensionFragDepth: T || t.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: T || t.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: T || t.has("EXT_shader_texture_lod"),
      customProgramCacheKey: L.customProgramCacheKey()
    };
  }
  function c(L) {
    const h = [];
    if (L.shaderID ? h.push(L.shaderID) : (h.push(L.customVertexShaderID), h.push(L.customFragmentShaderID)), L.defines !== void 0)
      for (const p in L.defines)
        h.push(p), h.push(L.defines[p]);
    return L.isRawShaderMaterial === !1 && (y(h, L), w(h, L), h.push(e.outputEncoding)), h.push(L.customProgramCacheKey), h.join();
  }
  function y(L, h) {
    L.push(h.precision), L.push(h.outputEncoding), L.push(h.envMapMode), L.push(h.envMapCubeUVHeight), L.push(h.combine), L.push(h.vertexUvs), L.push(h.fogExp2), L.push(h.sizeAttenuation), L.push(h.morphTargetsCount), L.push(h.morphAttributeCount), L.push(h.numDirLights), L.push(h.numPointLights), L.push(h.numSpotLights), L.push(h.numSpotLightMaps), L.push(h.numHemiLights), L.push(h.numRectAreaLights), L.push(h.numDirLightShadows), L.push(h.numPointLightShadows), L.push(h.numSpotLightShadows), L.push(h.numSpotLightShadowsWithMaps), L.push(h.shadowMapType), L.push(h.toneMapping), L.push(h.numClippingPlanes), L.push(h.numClipIntersection), L.push(h.depthPacking);
  }
  function w(L, h) {
    A.disableAll(), h.isWebGL2 && A.enable(0), h.supportsVertexTextures && A.enable(1), h.instancing && A.enable(2), h.instancingColor && A.enable(3), h.map && A.enable(4), h.matcap && A.enable(5), h.envMap && A.enable(6), h.lightMap && A.enable(7), h.aoMap && A.enable(8), h.emissiveMap && A.enable(9), h.bumpMap && A.enable(10), h.normalMap && A.enable(11), h.objectSpaceNormalMap && A.enable(12), h.tangentSpaceNormalMap && A.enable(13), h.clearcoat && A.enable(14), h.clearcoatMap && A.enable(15), h.clearcoatRoughnessMap && A.enable(16), h.clearcoatNormalMap && A.enable(17), h.iridescence && A.enable(18), h.iridescenceMap && A.enable(19), h.iridescenceThicknessMap && A.enable(20), h.displacementMap && A.enable(21), h.specularMap && A.enable(22), h.roughnessMap && A.enable(23), h.metalnessMap && A.enable(24), h.gradientMap && A.enable(25), h.alphaMap && A.enable(26), h.alphaTest && A.enable(27), h.vertexColors && A.enable(28), h.vertexAlphas && A.enable(29), h.vertexUvs && A.enable(30), h.vertexTangents && A.enable(31), h.uvsVertexOnly && A.enable(32), L.push(A.mask), A.disableAll(), h.fog && A.enable(0), h.useFog && A.enable(1), h.flatShading && A.enable(2), h.logarithmicDepthBuffer && A.enable(3), h.skinning && A.enable(4), h.morphTargets && A.enable(5), h.morphNormals && A.enable(6), h.morphColors && A.enable(7), h.premultipliedAlpha && A.enable(8), h.shadowMapEnabled && A.enable(9), h.physicallyCorrectLights && A.enable(10), h.doubleSided && A.enable(11), h.flipSided && A.enable(12), h.useDepthPacking && A.enable(13), h.dithering && A.enable(14), h.specularIntensityMap && A.enable(15), h.specularColorMap && A.enable(16), h.transmission && A.enable(17), h.transmissionMap && A.enable(18), h.thicknessMap && A.enable(19), h.sheen && A.enable(20), h.sheenColorMap && A.enable(21), h.sheenRoughnessMap && A.enable(22), h.decodeVideoTexture && A.enable(23), h.opaque && A.enable(24), L.push(A.mask);
  }
  function a(L) {
    const h = j[L.type];
    let p;
    if (h) {
      const P = qD[h];
      p = pg.clone(P.uniforms);
    } else
      p = L.uniforms;
    return p;
  }
  function C(L, h) {
    let p;
    for (let P = 0, H = n.length; P < H; P++) {
      const Q = n[P];
      if (Q.cacheKey === h) {
        p = Q, ++p.usedTimes;
        break;
      }
    }
    return p === void 0 && (p = new _j(e, h, L, i), n.push(p)), p;
  }
  function x(L) {
    if (--L.usedTimes === 0) {
      const h = n.indexOf(L);
      n[h] = n[n.length - 1], n.pop(), L.destroy();
    }
  }
  function l(L) {
    I.remove(L);
  }
  function d() {
    I.dispose();
  }
  return {
    getParameters: r,
    getProgramCacheKey: c,
    getUniforms: a,
    acquireProgram: C,
    releaseProgram: x,
    releaseShaderCache: l,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: n,
    dispose: d
  };
}
function Fj() {
  let e = /* @__PURE__ */ new WeakMap();
  function M(i) {
    let z = e.get(i);
    return z === void 0 && (z = {}, e.set(i, z)), z;
  }
  function D(i) {
    e.delete(i);
  }
  function t(i, z, A) {
    e.get(i)[z] = A;
  }
  function N() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: M,
    remove: D,
    update: t,
    dispose: N
  };
}
function Bj(e, M) {
  return e.groupOrder !== M.groupOrder ? e.groupOrder - M.groupOrder : e.renderOrder !== M.renderOrder ? e.renderOrder - M.renderOrder : e.material.id !== M.material.id ? e.material.id - M.material.id : e.z !== M.z ? e.z - M.z : e.id - M.id;
}
function Vn(e, M) {
  return e.groupOrder !== M.groupOrder ? e.groupOrder - M.groupOrder : e.renderOrder !== M.renderOrder ? e.renderOrder - M.renderOrder : e.z !== M.z ? M.z - e.z : e.id - M.id;
}
function Hn() {
  const e = [];
  let M = 0;
  const D = [], t = [], N = [];
  function i() {
    M = 0, D.length = 0, t.length = 0, N.length = 0;
  }
  function z(u, g, s, j, r, c) {
    let y = e[M];
    return y === void 0 ? (y = {
      id: u.id,
      object: u,
      geometry: g,
      material: s,
      groupOrder: j,
      renderOrder: u.renderOrder,
      z: r,
      group: c
    }, e[M] = y) : (y.id = u.id, y.object = u, y.geometry = g, y.material = s, y.groupOrder = j, y.renderOrder = u.renderOrder, y.z = r, y.group = c), M++, y;
  }
  function A(u, g, s, j, r, c) {
    const y = z(u, g, s, j, r, c);
    s.transmission > 0 ? t.push(y) : s.transparent === !0 ? N.push(y) : D.push(y);
  }
  function I(u, g, s, j, r, c) {
    const y = z(u, g, s, j, r, c);
    s.transmission > 0 ? t.unshift(y) : s.transparent === !0 ? N.unshift(y) : D.unshift(y);
  }
  function n(u, g) {
    D.length > 1 && D.sort(u || Bj), t.length > 1 && t.sort(g || Vn), N.length > 1 && N.sort(g || Vn);
  }
  function T() {
    for (let u = M, g = e.length; u < g; u++) {
      const s = e[u];
      if (s.id === null)
        break;
      s.id = null, s.object = null, s.geometry = null, s.material = null, s.group = null;
    }
  }
  return {
    opaque: D,
    transmissive: t,
    transparent: N,
    init: i,
    push: A,
    unshift: I,
    finish: T,
    sort: n
  };
}
function Gj() {
  let e = /* @__PURE__ */ new WeakMap();
  function M(t, N) {
    const i = e.get(t);
    let z;
    return i === void 0 ? (z = new Hn(), e.set(t, [z])) : N >= i.length ? (z = new Hn(), i.push(z)) : z = i[N], z;
  }
  function D() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: M,
    dispose: D
  };
}
function Vj() {
  const e = {};
  return {
    get: function(M) {
      if (e[M.id] !== void 0)
        return e[M.id];
      let D;
      switch (M.type) {
        case "DirectionalLight":
          D = {
            direction: new f(),
            color: new kM()
          };
          break;
        case "SpotLight":
          D = {
            position: new f(),
            direction: new f(),
            color: new kM(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          D = {
            position: new f(),
            color: new kM(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          D = {
            direction: new f(),
            skyColor: new kM(),
            groundColor: new kM()
          };
          break;
        case "RectAreaLight":
          D = {
            color: new kM(),
            position: new f(),
            halfWidth: new f(),
            halfHeight: new f()
          };
          break;
      }
      return e[M.id] = D, D;
    }
  };
}
function Hj() {
  const e = {};
  return {
    get: function(M) {
      if (e[M.id] !== void 0)
        return e[M.id];
      let D;
      switch (M.type) {
        case "DirectionalLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new gM()
          };
          break;
        case "SpotLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new gM()
          };
          break;
        case "PointLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new gM(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return e[M.id] = D, D;
    }
  };
}
let Wj = 0;
function Xj(e, M) {
  return (M.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (M.map ? 1 : 0) - (e.map ? 1 : 0);
}
function qj(e, M) {
  const D = new Vj(), t = Hj(), N = {
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
      numSpotMaps: -1
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
    numSpotLightShadowsWithMaps: 0
  };
  for (let T = 0; T < 9; T++)
    N.probe.push(new f());
  const i = new f(), z = new ND(), A = new ND();
  function I(T, u) {
    let g = 0, s = 0, j = 0;
    for (let P = 0; P < 9; P++)
      N.probe[P].set(0, 0, 0);
    let r = 0, c = 0, y = 0, w = 0, a = 0, C = 0, x = 0, l = 0, d = 0, L = 0;
    T.sort(Xj);
    const h = u !== !0 ? Math.PI : 1;
    for (let P = 0, H = T.length; P < H; P++) {
      const Q = T[P], U = Q.color, Z = Q.intensity, W = Q.distance, X = Q.shadow && Q.shadow.map ? Q.shadow.map.texture : null;
      if (Q.isAmbientLight)
        g += U.r * Z * h, s += U.g * Z * h, j += U.b * Z * h;
      else if (Q.isLightProbe)
        for (let F = 0; F < 9; F++)
          N.probe[F].addScaledVector(Q.sh.coefficients[F], Z);
      else if (Q.isDirectionalLight) {
        const F = D.get(Q);
        if (F.color.copy(Q.color).multiplyScalar(Q.intensity * h), Q.castShadow) {
          const J = Q.shadow, $ = t.get(Q);
          $.shadowBias = J.bias, $.shadowNormalBias = J.normalBias, $.shadowRadius = J.radius, $.shadowMapSize = J.mapSize, N.directionalShadow[r] = $, N.directionalShadowMap[r] = X, N.directionalShadowMatrix[r] = Q.shadow.matrix, C++;
        }
        N.directional[r] = F, r++;
      } else if (Q.isSpotLight) {
        const F = D.get(Q);
        F.position.setFromMatrixPosition(Q.matrixWorld), F.color.copy(U).multiplyScalar(Z * h), F.distance = W, F.coneCos = Math.cos(Q.angle), F.penumbraCos = Math.cos(Q.angle * (1 - Q.penumbra)), F.decay = Q.decay, N.spot[y] = F;
        const J = Q.shadow;
        if (Q.map && (N.spotLightMap[d] = Q.map, d++, J.updateMatrices(Q), Q.castShadow && L++), N.spotLightMatrix[y] = J.matrix, Q.castShadow) {
          const $ = t.get(Q);
          $.shadowBias = J.bias, $.shadowNormalBias = J.normalBias, $.shadowRadius = J.radius, $.shadowMapSize = J.mapSize, N.spotShadow[y] = $, N.spotShadowMap[y] = X, l++;
        }
        y++;
      } else if (Q.isRectAreaLight) {
        const F = D.get(Q);
        F.color.copy(U).multiplyScalar(Z), F.halfWidth.set(Q.width * 0.5, 0, 0), F.halfHeight.set(0, Q.height * 0.5, 0), N.rectArea[w] = F, w++;
      } else if (Q.isPointLight) {
        const F = D.get(Q);
        if (F.color.copy(Q.color).multiplyScalar(Q.intensity * h), F.distance = Q.distance, F.decay = Q.decay, Q.castShadow) {
          const J = Q.shadow, $ = t.get(Q);
          $.shadowBias = J.bias, $.shadowNormalBias = J.normalBias, $.shadowRadius = J.radius, $.shadowMapSize = J.mapSize, $.shadowCameraNear = J.camera.near, $.shadowCameraFar = J.camera.far, N.pointShadow[c] = $, N.pointShadowMap[c] = X, N.pointShadowMatrix[c] = Q.shadow.matrix, x++;
        }
        N.point[c] = F, c++;
      } else if (Q.isHemisphereLight) {
        const F = D.get(Q);
        F.skyColor.copy(Q.color).multiplyScalar(Z * h), F.groundColor.copy(Q.groundColor).multiplyScalar(Z * h), N.hemi[a] = F, a++;
      }
    }
    w > 0 && (M.isWebGL2 || e.has("OES_texture_float_linear") === !0 ? (N.rectAreaLTC1 = tM.LTC_FLOAT_1, N.rectAreaLTC2 = tM.LTC_FLOAT_2) : e.has("OES_texture_half_float_linear") === !0 ? (N.rectAreaLTC1 = tM.LTC_HALF_1, N.rectAreaLTC2 = tM.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), N.ambient[0] = g, N.ambient[1] = s, N.ambient[2] = j;
    const p = N.hash;
    (p.directionalLength !== r || p.pointLength !== c || p.spotLength !== y || p.rectAreaLength !== w || p.hemiLength !== a || p.numDirectionalShadows !== C || p.numPointShadows !== x || p.numSpotShadows !== l || p.numSpotMaps !== d) && (N.directional.length = r, N.spot.length = y, N.rectArea.length = w, N.point.length = c, N.hemi.length = a, N.directionalShadow.length = C, N.directionalShadowMap.length = C, N.pointShadow.length = x, N.pointShadowMap.length = x, N.spotShadow.length = l, N.spotShadowMap.length = l, N.directionalShadowMatrix.length = C, N.pointShadowMatrix.length = x, N.spotLightMatrix.length = l + d - L, N.spotLightMap.length = d, N.numSpotLightShadowsWithMaps = L, p.directionalLength = r, p.pointLength = c, p.spotLength = y, p.rectAreaLength = w, p.hemiLength = a, p.numDirectionalShadows = C, p.numPointShadows = x, p.numSpotShadows = l, p.numSpotMaps = d, N.version = Wj++);
  }
  function n(T, u) {
    let g = 0, s = 0, j = 0, r = 0, c = 0;
    const y = u.matrixWorldInverse;
    for (let w = 0, a = T.length; w < a; w++) {
      const C = T[w];
      if (C.isDirectionalLight) {
        const x = N.directional[g];
        x.direction.setFromMatrixPosition(C.matrixWorld), i.setFromMatrixPosition(C.target.matrixWorld), x.direction.sub(i), x.direction.transformDirection(y), g++;
      } else if (C.isSpotLight) {
        const x = N.spot[j];
        x.position.setFromMatrixPosition(C.matrixWorld), x.position.applyMatrix4(y), x.direction.setFromMatrixPosition(C.matrixWorld), i.setFromMatrixPosition(C.target.matrixWorld), x.direction.sub(i), x.direction.transformDirection(y), j++;
      } else if (C.isRectAreaLight) {
        const x = N.rectArea[r];
        x.position.setFromMatrixPosition(C.matrixWorld), x.position.applyMatrix4(y), A.identity(), z.copy(C.matrixWorld), z.premultiply(y), A.extractRotation(z), x.halfWidth.set(C.width * 0.5, 0, 0), x.halfHeight.set(0, C.height * 0.5, 0), x.halfWidth.applyMatrix4(A), x.halfHeight.applyMatrix4(A), r++;
      } else if (C.isPointLight) {
        const x = N.point[s];
        x.position.setFromMatrixPosition(C.matrixWorld), x.position.applyMatrix4(y), s++;
      } else if (C.isHemisphereLight) {
        const x = N.hemi[c];
        x.direction.setFromMatrixPosition(C.matrixWorld), x.direction.transformDirection(y), c++;
      }
    }
  }
  return {
    setup: I,
    setupView: n,
    state: N
  };
}
function Wn(e, M) {
  const D = new qj(e, M), t = [], N = [];
  function i() {
    t.length = 0, N.length = 0;
  }
  function z(u) {
    t.push(u);
  }
  function A(u) {
    N.push(u);
  }
  function I(u) {
    D.setup(t, u);
  }
  function n(u) {
    D.setupView(t, u);
  }
  return {
    init: i,
    state: {
      lightsArray: t,
      shadowsArray: N,
      lights: D
    },
    setupLights: I,
    setupLightsView: n,
    pushLight: z,
    pushShadow: A
  };
}
function $j(e, M) {
  let D = /* @__PURE__ */ new WeakMap();
  function t(i, z = 0) {
    const A = D.get(i);
    let I;
    return A === void 0 ? (I = new Wn(e, M), D.set(i, [I])) : z >= A.length ? (I = new Wn(e, M), A.push(I)) : I = A[z], I;
  }
  function N() {
    D = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: N
  };
}
class Jj extends de {
  constructor(M) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Ig, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.depthPacking = M.depthPacking, this.map = M.map, this.alphaMap = M.alphaMap, this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this;
  }
}
class My extends de {
  constructor(M) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.referencePosition = new f(), this.nearDistance = 1, this.farDistance = 1e3, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.referencePosition.copy(M.referencePosition), this.nearDistance = M.nearDistance, this.farDistance = M.farDistance, this.map = M.map, this.alphaMap = M.alphaMap, this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this;
  }
}
const Dy = (
  /* glsl */
  `
void main() {

	gl_Position = vec4( position, 1.0 );

}
`
), ty = (
  /* glsl */
  `
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

#include <packing>

void main() {

	const float samples = float( VSM_SAMPLES );

	float mean = 0.0;
	float squared_mean = 0.0;

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( squared_mean - mean * mean );

	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );

}
`
);
function Ny(e, M, D) {
  let t = new oz();
  const N = new gM(), i = new gM(), z = new tD(), A = new Jj({ depthPacking: Tg }), I = new My(), n = {}, T = D.maxTextureSize, u = { [ft]: dD, [dD]: ft, [Yt]: Yt }, g = new NN({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new gM() },
      radius: { value: 4 }
    },
    vertexShader: Dy,
    fragmentShader: ty
  }), s = g.clone();
  s.defines.HORIZONTAL_PASS = 1;
  const j = new VN();
  j.setAttribute(
    "position",
    new Mt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const r = new JD(j, g), c = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = VI, this.render = function(C, x, l) {
    if (c.enabled === !1 || c.autoUpdate === !1 && c.needsUpdate === !1 || C.length === 0)
      return;
    const d = e.getRenderTarget(), L = e.getActiveCubeFace(), h = e.getActiveMipmapLevel(), p = e.state;
    p.setBlending(pt), p.buffers.color.setClear(1, 1, 1, 1), p.buffers.depth.setTest(!0), p.setScissorTest(!1);
    for (let P = 0, H = C.length; P < H; P++) {
      const Q = C[P], U = Q.shadow;
      if (U === void 0) {
        console.warn("THREE.WebGLShadowMap:", Q, "has no shadow.");
        continue;
      }
      if (U.autoUpdate === !1 && U.needsUpdate === !1)
        continue;
      N.copy(U.mapSize);
      const Z = U.getFrameExtents();
      if (N.multiply(Z), i.copy(U.mapSize), (N.x > T || N.y > T) && (N.x > T && (i.x = Math.floor(T / Z.x), N.x = i.x * Z.x, U.mapSize.x = i.x), N.y > T && (i.y = Math.floor(T / Z.y), N.y = i.y * Z.y, U.mapSize.y = i.y)), U.map === null) {
        const X = this.type !== ue ? { minFilter: rD, magFilter: rD } : {};
        U.map = new eN(N.x, N.y, X), U.map.texture.name = Q.name + ".shadowMap", U.camera.updateProjectionMatrix();
      }
      e.setRenderTarget(U.map), e.clear();
      const W = U.getViewportCount();
      for (let X = 0; X < W; X++) {
        const F = U.getViewport(X);
        z.set(
          i.x * F.x,
          i.y * F.y,
          i.x * F.z,
          i.y * F.w
        ), p.viewport(z), U.updateMatrices(Q, X), t = U.getFrustum(), a(x, l, U.camera, Q, this.type);
      }
      U.isPointLightShadow !== !0 && this.type === ue && y(U, l), U.needsUpdate = !1;
    }
    c.needsUpdate = !1, e.setRenderTarget(d, L, h);
  };
  function y(C, x) {
    const l = M.update(r);
    g.defines.VSM_SAMPLES !== C.blurSamples && (g.defines.VSM_SAMPLES = C.blurSamples, s.defines.VSM_SAMPLES = C.blurSamples, g.needsUpdate = !0, s.needsUpdate = !0), C.mapPass === null && (C.mapPass = new eN(N.x, N.y)), g.uniforms.shadow_pass.value = C.map.texture, g.uniforms.resolution.value = C.mapSize, g.uniforms.radius.value = C.radius, e.setRenderTarget(C.mapPass), e.clear(), e.renderBufferDirect(x, null, l, g, r, null), s.uniforms.shadow_pass.value = C.mapPass.texture, s.uniforms.resolution.value = C.mapSize, s.uniforms.radius.value = C.radius, e.setRenderTarget(C.map), e.clear(), e.renderBufferDirect(x, null, l, s, r, null);
  }
  function w(C, x, l, d, L, h) {
    let p = null;
    const P = l.isPointLight === !0 ? C.customDistanceMaterial : C.customDepthMaterial;
    if (P !== void 0)
      p = P;
    else if (p = l.isPointLight === !0 ? I : A, e.localClippingEnabled && x.clipShadows === !0 && Array.isArray(x.clippingPlanes) && x.clippingPlanes.length !== 0 || x.displacementMap && x.displacementScale !== 0 || x.alphaMap && x.alphaTest > 0 || x.map && x.alphaTest > 0) {
      const H = p.uuid, Q = x.uuid;
      let U = n[H];
      U === void 0 && (U = {}, n[H] = U);
      let Z = U[Q];
      Z === void 0 && (Z = p.clone(), U[Q] = Z), p = Z;
    }
    return p.visible = x.visible, p.wireframe = x.wireframe, h === ue ? p.side = x.shadowSide !== null ? x.shadowSide : x.side : p.side = x.shadowSide !== null ? x.shadowSide : u[x.side], p.alphaMap = x.alphaMap, p.alphaTest = x.alphaTest, p.map = x.map, p.clipShadows = x.clipShadows, p.clippingPlanes = x.clippingPlanes, p.clipIntersection = x.clipIntersection, p.displacementMap = x.displacementMap, p.displacementScale = x.displacementScale, p.displacementBias = x.displacementBias, p.wireframeLinewidth = x.wireframeLinewidth, p.linewidth = x.linewidth, l.isPointLight === !0 && p.isMeshDistanceMaterial === !0 && (p.referencePosition.setFromMatrixPosition(l.matrixWorld), p.nearDistance = d, p.farDistance = L), p;
  }
  function a(C, x, l, d, L) {
    if (C.visible === !1)
      return;
    if (C.layers.test(x.layers) && (C.isMesh || C.isLine || C.isPoints) && (C.castShadow || C.receiveShadow && L === ue) && (!C.frustumCulled || t.intersectsObject(C))) {
      C.modelViewMatrix.multiplyMatrices(l.matrixWorldInverse, C.matrixWorld);
      const P = M.update(C), H = C.material;
      if (Array.isArray(H)) {
        const Q = P.groups;
        for (let U = 0, Z = Q.length; U < Z; U++) {
          const W = Q[U], X = H[W.materialIndex];
          if (X && X.visible) {
            const F = w(C, X, d, l.near, l.far, L);
            e.renderBufferDirect(l, null, P, F, C, W);
          }
        }
      } else if (H.visible) {
        const Q = w(C, H, d, l.near, l.far, L);
        e.renderBufferDirect(l, null, P, Q, C, null);
      }
    }
    const p = C.children;
    for (let P = 0, H = p.length; P < H; P++)
      a(p[P], x, l, d, L);
  }
}
function ey(e, M, D) {
  const t = D.isWebGL2;
  function N() {
    let Y = !1;
    const _ = new tD();
    let q = null;
    const zM = new tD(0, 0, 0, 0);
    return {
      setMask: function(uM) {
        q !== uM && !Y && (e.colorMask(uM, uM, uM, uM), q = uM);
      },
      setLocked: function(uM) {
        Y = uM;
      },
      setClear: function(uM, fM, $M, iD, mt) {
        mt === !0 && (uM *= iD, fM *= iD, $M *= iD), _.set(uM, fM, $M, iD), zM.equals(_) === !1 && (e.clearColor(uM, fM, $M, iD), zM.copy(_));
      },
      reset: function() {
        Y = !1, q = null, zM.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let Y = !1, _ = null, q = null, zM = null;
    return {
      setTest: function(uM) {
        uM ? xM(e.DEPTH_TEST) : sM(e.DEPTH_TEST);
      },
      setMask: function(uM) {
        _ !== uM && !Y && (e.depthMask(uM), _ = uM);
      },
      setFunc: function(uM) {
        if (q !== uM) {
          switch (uM) {
            case fu:
              e.depthFunc(e.NEVER);
              break;
            case Qu:
              e.depthFunc(e.ALWAYS);
              break;
            case mu:
              e.depthFunc(e.LESS);
              break;
            case ez:
              e.depthFunc(e.LEQUAL);
              break;
            case ku:
              e.depthFunc(e.EQUAL);
              break;
            case Su:
              e.depthFunc(e.GEQUAL);
              break;
            case Zu:
              e.depthFunc(e.GREATER);
              break;
            case _u:
              e.depthFunc(e.NOTEQUAL);
              break;
            default:
              e.depthFunc(e.LEQUAL);
          }
          q = uM;
        }
      },
      setLocked: function(uM) {
        Y = uM;
      },
      setClear: function(uM) {
        zM !== uM && (e.clearDepth(uM), zM = uM);
      },
      reset: function() {
        Y = !1, _ = null, q = null, zM = null;
      }
    };
  }
  function z() {
    let Y = !1, _ = null, q = null, zM = null, uM = null, fM = null, $M = null, iD = null, mt = null;
    return {
      setTest: function(_M) {
        Y || (_M ? xM(e.STENCIL_TEST) : sM(e.STENCIL_TEST));
      },
      setMask: function(_M) {
        _ !== _M && !Y && (e.stencilMask(_M), _ = _M);
      },
      setFunc: function(_M, et, UD) {
        (q !== _M || zM !== et || uM !== UD) && (e.stencilFunc(_M, et, UD), q = _M, zM = et, uM = UD);
      },
      setOp: function(_M, et, UD) {
        (fM !== _M || $M !== et || iD !== UD) && (e.stencilOp(_M, et, UD), fM = _M, $M = et, iD = UD);
      },
      setLocked: function(_M) {
        Y = _M;
      },
      setClear: function(_M) {
        mt !== _M && (e.clearStencil(_M), mt = _M);
      },
      reset: function() {
        Y = !1, _ = null, q = null, zM = null, uM = null, fM = null, $M = null, iD = null, mt = null;
      }
    };
  }
  const A = new N(), I = new i(), n = new z(), T = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
  let g = {}, s = {}, j = /* @__PURE__ */ new WeakMap(), r = [], c = null, y = !1, w = null, a = null, C = null, x = null, l = null, d = null, L = null, h = !1, p = null, P = null, H = null, Q = null, U = null;
  const Z = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let W = !1, X = 0;
  const F = e.getParameter(e.VERSION);
  F.indexOf("WebGL") !== -1 ? (X = parseFloat(/^WebGL (\d)/.exec(F)[1]), W = X >= 1) : F.indexOf("OpenGL ES") !== -1 && (X = parseFloat(/^OpenGL ES (\d)/.exec(F)[1]), W = X >= 2);
  let J = null, $ = {};
  const IM = e.getParameter(e.SCISSOR_BOX), S = e.getParameter(e.VIEWPORT), V = new tD().fromArray(IM), NM = new tD().fromArray(S);
  function eM(Y, _, q) {
    const zM = new Uint8Array(4), uM = e.createTexture();
    e.bindTexture(Y, uM), e.texParameteri(Y, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(Y, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let fM = 0; fM < q; fM++)
      e.texImage2D(_ + fM, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, zM);
    return uM;
  }
  const v = {};
  v[e.TEXTURE_2D] = eM(e.TEXTURE_2D, e.TEXTURE_2D, 1), v[e.TEXTURE_CUBE_MAP] = eM(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), A.setClear(0, 0, 0, 1), I.setClear(1), n.setClear(0), xM(e.DEPTH_TEST), I.setFunc(ez), eD(!1), pD(Fz), xM(e.CULL_FACE), ID(pt);
  function xM(Y) {
    g[Y] !== !0 && (e.enable(Y), g[Y] = !0);
  }
  function sM(Y) {
    g[Y] !== !1 && (e.disable(Y), g[Y] = !1);
  }
  function rM(Y, _) {
    return s[Y] !== _ ? (e.bindFramebuffer(Y, _), s[Y] = _, t && (Y === e.DRAW_FRAMEBUFFER && (s[e.FRAMEBUFFER] = _), Y === e.FRAMEBUFFER && (s[e.DRAW_FRAMEBUFFER] = _)), !0) : !1;
  }
  function nM(Y, _) {
    let q = r, zM = !1;
    if (Y)
      if (q = j.get(_), q === void 0 && (q = [], j.set(_, q)), Y.isWebGLMultipleRenderTargets) {
        const uM = Y.texture;
        if (q.length !== uM.length || q[0] !== e.COLOR_ATTACHMENT0) {
          for (let fM = 0, $M = uM.length; fM < $M; fM++)
            q[fM] = e.COLOR_ATTACHMENT0 + fM;
          q.length = uM.length, zM = !0;
        }
      } else
        q[0] !== e.COLOR_ATTACHMENT0 && (q[0] = e.COLOR_ATTACHMENT0, zM = !0);
    else
      q[0] !== e.BACK && (q[0] = e.BACK, zM = !0);
    zM && (D.isWebGL2 ? e.drawBuffers(q) : M.get("WEBGL_draw_buffers").drawBuffersWEBGL(q));
  }
  function mM(Y) {
    return c !== Y ? (e.useProgram(Y), c = Y, !0) : !1;
  }
  const OM = {
    [UN]: e.FUNC_ADD,
    [wu]: e.FUNC_SUBTRACT,
    [xu]: e.FUNC_REVERSE_SUBTRACT
  };
  if (t)
    OM[Hz] = e.MIN, OM[Wz] = e.MAX;
  else {
    const Y = M.get("EXT_blend_minmax");
    Y !== null && (OM[Hz] = Y.MIN_EXT, OM[Wz] = Y.MAX_EXT);
  }
  const CM = {
    [Ou]: e.ZERO,
    [Eu]: e.ONE,
    [lu]: e.SRC_COLOR,
    [HI]: e.SRC_ALPHA,
    [Uu]: e.SRC_ALPHA_SATURATE,
    [Yu]: e.DST_COLOR,
    [du]: e.DST_ALPHA,
    [hu]: e.ONE_MINUS_SRC_COLOR,
    [WI]: e.ONE_MINUS_SRC_ALPHA,
    [pu]: e.ONE_MINUS_DST_COLOR,
    [vu]: e.ONE_MINUS_DST_ALPHA
  };
  function ID(Y, _, q, zM, uM, fM, $M, iD) {
    if (Y === pt) {
      y === !0 && (sM(e.BLEND), y = !1);
      return;
    }
    if (y === !1 && (xM(e.BLEND), y = !0), Y !== Lu) {
      if (Y !== w || iD !== h) {
        if ((a !== UN || l !== UN) && (e.blendEquation(e.FUNC_ADD), a = UN, l = UN), iD)
          switch (Y) {
            case kN:
              e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
              break;
            case Bz:
              e.blendFunc(e.ONE, e.ONE);
              break;
            case Gz:
              e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
              break;
            case Vz:
              e.blendFuncSeparate(e.ZERO, e.SRC_COLOR, e.ZERO, e.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", Y);
              break;
          }
        else
          switch (Y) {
            case kN:
              e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
              break;
            case Bz:
              e.blendFunc(e.SRC_ALPHA, e.ONE);
              break;
            case Gz:
              e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
              break;
            case Vz:
              e.blendFunc(e.ZERO, e.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", Y);
              break;
          }
        C = null, x = null, d = null, L = null, w = Y, h = iD;
      }
      return;
    }
    uM = uM || _, fM = fM || q, $M = $M || zM, (_ !== a || uM !== l) && (e.blendEquationSeparate(OM[_], OM[uM]), a = _, l = uM), (q !== C || zM !== x || fM !== d || $M !== L) && (e.blendFuncSeparate(CM[q], CM[zM], CM[fM], CM[$M]), C = q, x = zM, d = fM, L = $M), w = Y, h = !1;
  }
  function YD(Y, _) {
    Y.side === Yt ? sM(e.CULL_FACE) : xM(e.CULL_FACE);
    let q = Y.side === dD;
    _ && (q = !q), eD(q), Y.blending === kN && Y.transparent === !1 ? ID(pt) : ID(Y.blending, Y.blendEquation, Y.blendSrc, Y.blendDst, Y.blendEquationAlpha, Y.blendSrcAlpha, Y.blendDstAlpha, Y.premultipliedAlpha), I.setFunc(Y.depthFunc), I.setTest(Y.depthTest), I.setMask(Y.depthWrite), A.setMask(Y.colorWrite);
    const zM = Y.stencilWrite;
    n.setTest(zM), zM && (n.setMask(Y.stencilWriteMask), n.setFunc(Y.stencilFunc, Y.stencilRef, Y.stencilFuncMask), n.setOp(Y.stencilFail, Y.stencilZFail, Y.stencilZPass)), QM(Y.polygonOffset, Y.polygonOffsetFactor, Y.polygonOffsetUnits), Y.alphaToCoverage === !0 ? xM(e.SAMPLE_ALPHA_TO_COVERAGE) : sM(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function eD(Y) {
    p !== Y && (Y ? e.frontFace(e.CW) : e.frontFace(e.CCW), p = Y);
  }
  function pD(Y) {
    Y !== au ? (xM(e.CULL_FACE), Y !== P && (Y === Fz ? e.cullFace(e.BACK) : Y === ou ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : sM(e.CULL_FACE), P = Y;
  }
  function GM(Y) {
    Y !== H && (W && e.lineWidth(Y), H = Y);
  }
  function QM(Y, _, q) {
    Y ? (xM(e.POLYGON_OFFSET_FILL), (Q !== _ || U !== q) && (e.polygonOffset(_, q), Q = _, U = q)) : sM(e.POLYGON_OFFSET_FILL);
  }
  function Nt(Y) {
    Y ? xM(e.SCISSOR_TEST) : sM(e.SCISSOR_TEST);
  }
  function _D(Y) {
    Y === void 0 && (Y = e.TEXTURE0 + Z - 1), J !== Y && (e.activeTexture(Y), J = Y);
  }
  function E(Y, _, q) {
    q === void 0 && (J === null ? q = e.TEXTURE0 + Z - 1 : q = J);
    let zM = $[q];
    zM === void 0 && (zM = { type: void 0, texture: void 0 }, $[q] = zM), (zM.type !== Y || zM.texture !== _) && (J !== q && (e.activeTexture(q), J = q), e.bindTexture(Y, _ || v[Y]), zM.type = Y, zM.texture = _);
  }
  function o() {
    const Y = $[J];
    Y !== void 0 && Y.type !== void 0 && (e.bindTexture(Y.type, null), Y.type = void 0, Y.texture = void 0);
  }
  function K() {
    try {
      e.compressedTexImage2D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function MM() {
    try {
      e.compressedTexImage3D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function DM() {
    try {
      e.texSubImage2D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function iM() {
    try {
      e.texSubImage3D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function LM() {
    try {
      e.compressedTexSubImage2D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function AM() {
    try {
      e.compressedTexSubImage3D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function G() {
    try {
      e.texStorage2D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function yM() {
    try {
      e.texStorage3D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function oM() {
    try {
      e.texImage2D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function TM() {
    try {
      e.texImage3D.apply(e, arguments);
    } catch (Y) {
      console.error("THREE.WebGLState:", Y);
    }
  }
  function aM(Y) {
    V.equals(Y) === !1 && (e.scissor(Y.x, Y.y, Y.z, Y.w), V.copy(Y));
  }
  function cM(Y) {
    NM.equals(Y) === !1 && (e.viewport(Y.x, Y.y, Y.z, Y.w), NM.copy(Y));
  }
  function pM(Y, _) {
    let q = u.get(_);
    q === void 0 && (q = /* @__PURE__ */ new WeakMap(), u.set(_, q));
    let zM = q.get(Y);
    zM === void 0 && (zM = e.getUniformBlockIndex(_, Y.name), q.set(Y, zM));
  }
  function ZM(Y, _) {
    const zM = u.get(_).get(Y);
    T.get(_) !== zM && (e.uniformBlockBinding(_, zM, Y.__bindingPointIndex), T.set(_, zM));
  }
  function qM() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), t === !0 && (e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null)), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), g = {}, J = null, $ = {}, s = {}, j = /* @__PURE__ */ new WeakMap(), r = [], c = null, y = !1, w = null, a = null, C = null, x = null, l = null, d = null, L = null, h = !1, p = null, P = null, H = null, Q = null, U = null, V.set(0, 0, e.canvas.width, e.canvas.height), NM.set(0, 0, e.canvas.width, e.canvas.height), A.reset(), I.reset(), n.reset();
  }
  return {
    buffers: {
      color: A,
      depth: I,
      stencil: n
    },
    enable: xM,
    disable: sM,
    bindFramebuffer: rM,
    drawBuffers: nM,
    useProgram: mM,
    setBlending: ID,
    setMaterial: YD,
    setFlipSided: eD,
    setCullFace: pD,
    setLineWidth: GM,
    setPolygonOffset: QM,
    setScissorTest: Nt,
    activeTexture: _D,
    bindTexture: E,
    unbindTexture: o,
    compressedTexImage2D: K,
    compressedTexImage3D: MM,
    texImage2D: oM,
    texImage3D: TM,
    updateUBOMapping: pM,
    uniformBlockBinding: ZM,
    texStorage2D: G,
    texStorage3D: yM,
    texSubImage2D: DM,
    texSubImage3D: iM,
    compressedTexSubImage2D: LM,
    compressedTexSubImage3D: AM,
    scissor: aM,
    viewport: cM,
    reset: qM
  };
}
function iy(e, M, D, t, N, i, z) {
  const A = N.isWebGL2, I = N.maxTextures, n = N.maxCubemapSize, T = N.maxTextureSize, u = N.maxSamples, g = M.has("WEBGL_multisampled_render_to_texture") ? M.get("WEBGL_multisampled_render_to_texture") : null, s = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), j = /* @__PURE__ */ new WeakMap();
  let r;
  const c = /* @__PURE__ */ new WeakMap();
  let y = !1;
  try {
    y = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function w(E, o) {
    return y ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(E, o)
    ) : Le("canvas");
  }
  function a(E, o, K, MM) {
    let DM = 1;
    if ((E.width > MM || E.height > MM) && (DM = MM / Math.max(E.width, E.height)), DM < 1 || o === !0)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap) {
        const iM = o ? tz : Math.floor, LM = iM(DM * E.width), AM = iM(DM * E.height);
        r === void 0 && (r = w(LM, AM));
        const G = K ? w(LM, AM) : r;
        return G.width = LM, G.height = AM, G.getContext("2d").drawImage(E, 0, 0, LM, AM), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + E.width + "x" + E.height + ") to (" + LM + "x" + AM + ")."), G;
      } else
        return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + E.width + "x" + E.height + ")."), E;
    return E;
  }
  function C(E) {
    return mz(E.width) && mz(E.height);
  }
  function x(E) {
    return A ? !1 : E.wrapS !== GD || E.wrapT !== GD || E.minFilter !== rD && E.minFilter !== yD;
  }
  function l(E, o) {
    return E.generateMipmaps && o && E.minFilter !== rD && E.minFilter !== yD;
  }
  function d(E) {
    e.generateMipmap(E);
  }
  function L(E, o, K, MM, DM = !1) {
    if (A === !1)
      return o;
    if (E !== null) {
      if (e[E] !== void 0)
        return e[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let iM = o;
    return o === e.RED && (K === e.FLOAT && (iM = e.R32F), K === e.HALF_FLOAT && (iM = e.R16F), K === e.UNSIGNED_BYTE && (iM = e.R8)), o === e.RG && (K === e.FLOAT && (iM = e.RG32F), K === e.HALF_FLOAT && (iM = e.RG16F), K === e.UNSIGNED_BYTE && (iM = e.RG8)), o === e.RGBA && (K === e.FLOAT && (iM = e.RGBA32F), K === e.HALF_FLOAT && (iM = e.RGBA16F), K === e.UNSIGNED_BYTE && (iM = MM === SM && DM === !1 ? e.SRGB8_ALPHA8 : e.RGBA8), K === e.UNSIGNED_SHORT_4_4_4_4 && (iM = e.RGBA4), K === e.UNSIGNED_SHORT_5_5_5_1 && (iM = e.RGB5_A1)), (iM === e.R16F || iM === e.R32F || iM === e.RG16F || iM === e.RG32F || iM === e.RGBA16F || iM === e.RGBA32F) && M.get("EXT_color_buffer_float"), iM;
  }
  function h(E, o, K) {
    return l(E, K) === !0 || E.isFramebufferTexture && E.minFilter !== rD && E.minFilter !== yD ? Math.log2(Math.max(o.width, o.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? o.mipmaps.length : 1;
  }
  function p(E) {
    return E === rD || E === Xz || E === Xi ? e.NEAREST : e.LINEAR;
  }
  function P(E) {
    const o = E.target;
    o.removeEventListener("dispose", P), Q(o), o.isVideoTexture && j.delete(o);
  }
  function H(E) {
    const o = E.target;
    o.removeEventListener("dispose", H), Z(o);
  }
  function Q(E) {
    const o = t.get(E);
    if (o.__webglInit === void 0)
      return;
    const K = E.source, MM = c.get(K);
    if (MM) {
      const DM = MM[o.__cacheKey];
      DM.usedTimes--, DM.usedTimes === 0 && U(E), Object.keys(MM).length === 0 && c.delete(K);
    }
    t.remove(E);
  }
  function U(E) {
    const o = t.get(E);
    e.deleteTexture(o.__webglTexture);
    const K = E.source, MM = c.get(K);
    delete MM[o.__cacheKey], z.memory.textures--;
  }
  function Z(E) {
    const o = E.texture, K = t.get(E), MM = t.get(o);
    if (MM.__webglTexture !== void 0 && (e.deleteTexture(MM.__webglTexture), z.memory.textures--), E.depthTexture && E.depthTexture.dispose(), E.isWebGLCubeRenderTarget)
      for (let DM = 0; DM < 6; DM++)
        e.deleteFramebuffer(K.__webglFramebuffer[DM]), K.__webglDepthbuffer && e.deleteRenderbuffer(K.__webglDepthbuffer[DM]);
    else {
      if (e.deleteFramebuffer(K.__webglFramebuffer), K.__webglDepthbuffer && e.deleteRenderbuffer(K.__webglDepthbuffer), K.__webglMultisampledFramebuffer && e.deleteFramebuffer(K.__webglMultisampledFramebuffer), K.__webglColorRenderbuffer)
        for (let DM = 0; DM < K.__webglColorRenderbuffer.length; DM++)
          K.__webglColorRenderbuffer[DM] && e.deleteRenderbuffer(K.__webglColorRenderbuffer[DM]);
      K.__webglDepthRenderbuffer && e.deleteRenderbuffer(K.__webglDepthRenderbuffer);
    }
    if (E.isWebGLMultipleRenderTargets)
      for (let DM = 0, iM = o.length; DM < iM; DM++) {
        const LM = t.get(o[DM]);
        LM.__webglTexture && (e.deleteTexture(LM.__webglTexture), z.memory.textures--), t.remove(o[DM]);
      }
    t.remove(o), t.remove(E);
  }
  let W = 0;
  function X() {
    W = 0;
  }
  function F() {
    const E = W;
    return E >= I && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + I), W += 1, E;
  }
  function J(E) {
    const o = [];
    return o.push(E.wrapS), o.push(E.wrapT), o.push(E.wrapR || 0), o.push(E.magFilter), o.push(E.minFilter), o.push(E.anisotropy), o.push(E.internalFormat), o.push(E.format), o.push(E.type), o.push(E.generateMipmaps), o.push(E.premultiplyAlpha), o.push(E.flipY), o.push(E.unpackAlignment), o.push(E.encoding), o.join();
  }
  function $(E, o) {
    const K = t.get(E);
    if (E.isVideoTexture && Nt(E), E.isRenderTargetTexture === !1 && E.version > 0 && K.__version !== E.version) {
      const MM = E.image;
      if (MM === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (MM.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        sM(K, E, o);
        return;
      }
    }
    D.bindTexture(e.TEXTURE_2D, K.__webglTexture, e.TEXTURE0 + o);
  }
  function IM(E, o) {
    const K = t.get(E);
    if (E.version > 0 && K.__version !== E.version) {
      sM(K, E, o);
      return;
    }
    D.bindTexture(e.TEXTURE_2D_ARRAY, K.__webglTexture, e.TEXTURE0 + o);
  }
  function S(E, o) {
    const K = t.get(E);
    if (E.version > 0 && K.__version !== E.version) {
      sM(K, E, o);
      return;
    }
    D.bindTexture(e.TEXTURE_3D, K.__webglTexture, e.TEXTURE0 + o);
  }
  function V(E, o) {
    const K = t.get(E);
    if (E.version > 0 && K.__version !== E.version) {
      rM(K, E, o);
      return;
    }
    D.bindTexture(e.TEXTURE_CUBE_MAP, K.__webglTexture, e.TEXTURE0 + o);
  }
  const NM = {
    [zz]: e.REPEAT,
    [GD]: e.CLAMP_TO_EDGE,
    [nz]: e.MIRRORED_REPEAT
  }, eM = {
    [rD]: e.NEAREST,
    [Xz]: e.NEAREST_MIPMAP_NEAREST,
    [Xi]: e.NEAREST_MIPMAP_LINEAR,
    [yD]: e.LINEAR,
    [Vu]: e.LINEAR_MIPMAP_NEAREST,
    [ae]: e.LINEAR_MIPMAP_LINEAR
  };
  function v(E, o, K) {
    if (K ? (e.texParameteri(E, e.TEXTURE_WRAP_S, NM[o.wrapS]), e.texParameteri(E, e.TEXTURE_WRAP_T, NM[o.wrapT]), (E === e.TEXTURE_3D || E === e.TEXTURE_2D_ARRAY) && e.texParameteri(E, e.TEXTURE_WRAP_R, NM[o.wrapR]), e.texParameteri(E, e.TEXTURE_MAG_FILTER, eM[o.magFilter]), e.texParameteri(E, e.TEXTURE_MIN_FILTER, eM[o.minFilter])) : (e.texParameteri(E, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(E, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), (E === e.TEXTURE_3D || E === e.TEXTURE_2D_ARRAY) && e.texParameteri(E, e.TEXTURE_WRAP_R, e.CLAMP_TO_EDGE), (o.wrapS !== GD || o.wrapT !== GD) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), e.texParameteri(E, e.TEXTURE_MAG_FILTER, p(o.magFilter)), e.texParameteri(E, e.TEXTURE_MIN_FILTER, p(o.minFilter)), o.minFilter !== rD && o.minFilter !== yD && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), M.has("EXT_texture_filter_anisotropic") === !0) {
      const MM = M.get("EXT_texture_filter_anisotropic");
      if (o.magFilter === rD || o.minFilter !== Xi && o.minFilter !== ae || o.type === Wt && M.has("OES_texture_float_linear") === !1 || A === !1 && o.type === oe && M.has("OES_texture_half_float_linear") === !1)
        return;
      (o.anisotropy > 1 || t.get(o).__currentAnisotropy) && (e.texParameterf(E, MM.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(o.anisotropy, N.getMaxAnisotropy())), t.get(o).__currentAnisotropy = o.anisotropy);
    }
  }
  function xM(E, o) {
    let K = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, o.addEventListener("dispose", P));
    const MM = o.source;
    let DM = c.get(MM);
    DM === void 0 && (DM = {}, c.set(MM, DM));
    const iM = J(o);
    if (iM !== E.__cacheKey) {
      DM[iM] === void 0 && (DM[iM] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, z.memory.textures++, K = !0), DM[iM].usedTimes++;
      const LM = DM[E.__cacheKey];
      LM !== void 0 && (DM[E.__cacheKey].usedTimes--, LM.usedTimes === 0 && U(o)), E.__cacheKey = iM, E.__webglTexture = DM[iM].texture;
    }
    return K;
  }
  function sM(E, o, K) {
    let MM = e.TEXTURE_2D;
    (o.isDataArrayTexture || o.isCompressedArrayTexture) && (MM = e.TEXTURE_2D_ARRAY), o.isData3DTexture && (MM = e.TEXTURE_3D);
    const DM = xM(E, o), iM = o.source;
    D.bindTexture(MM, E.__webglTexture, e.TEXTURE0 + K);
    const LM = t.get(iM);
    if (iM.version !== LM.__version || DM === !0) {
      D.activeTexture(e.TEXTURE0 + K), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), e.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.NONE);
      const AM = x(o) && C(o.image) === !1;
      let G = a(o.image, AM, !1, T);
      G = _D(o, G);
      const yM = C(G) || A, oM = i.convert(o.format, o.encoding);
      let TM = i.convert(o.type), aM = L(o.internalFormat, oM, TM, o.encoding, o.isVideoTexture);
      v(MM, o, yM);
      let cM;
      const pM = o.mipmaps, ZM = A && o.isVideoTexture !== !0, qM = LM.__version === void 0 || DM === !0, Y = h(o, G, yM);
      if (o.isDepthTexture)
        aM = e.DEPTH_COMPONENT, A ? o.type === Wt ? aM = e.DEPTH_COMPONENT32F : o.type === Ht ? aM = e.DEPTH_COMPONENT24 : o.type === SN ? aM = e.DEPTH24_STENCIL8 : aM = e.DEPTH_COMPONENT16 : o.type === Wt && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), o.format === qt && aM === e.DEPTH_COMPONENT && o.type !== qI && o.type !== Ht && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), o.type = Ht, TM = i.convert(o.type)), o.format === KN && aM === e.DEPTH_COMPONENT && (aM = e.DEPTH_STENCIL, o.type !== SN && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), o.type = SN, TM = i.convert(o.type))), qM && (ZM ? D.texStorage2D(e.TEXTURE_2D, 1, aM, G.width, G.height) : D.texImage2D(e.TEXTURE_2D, 0, aM, G.width, G.height, 0, oM, TM, null));
      else if (o.isDataTexture)
        if (pM.length > 0 && yM) {
          ZM && qM && D.texStorage2D(e.TEXTURE_2D, Y, aM, pM[0].width, pM[0].height);
          for (let _ = 0, q = pM.length; _ < q; _++)
            cM = pM[_], ZM ? D.texSubImage2D(e.TEXTURE_2D, _, 0, 0, cM.width, cM.height, oM, TM, cM.data) : D.texImage2D(e.TEXTURE_2D, _, aM, cM.width, cM.height, 0, oM, TM, cM.data);
          o.generateMipmaps = !1;
        } else
          ZM ? (qM && D.texStorage2D(e.TEXTURE_2D, Y, aM, G.width, G.height), D.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, G.width, G.height, oM, TM, G.data)) : D.texImage2D(e.TEXTURE_2D, 0, aM, G.width, G.height, 0, oM, TM, G.data);
      else if (o.isCompressedTexture)
        if (o.isCompressedArrayTexture) {
          ZM && qM && D.texStorage3D(e.TEXTURE_2D_ARRAY, Y, aM, pM[0].width, pM[0].height, G.depth);
          for (let _ = 0, q = pM.length; _ < q; _++)
            cM = pM[_], o.format !== VD ? oM !== null ? ZM ? D.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, _, 0, 0, 0, cM.width, cM.height, G.depth, oM, cM.data, 0, 0) : D.compressedTexImage3D(e.TEXTURE_2D_ARRAY, _, aM, cM.width, cM.height, G.depth, 0, cM.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : ZM ? D.texSubImage3D(e.TEXTURE_2D_ARRAY, _, 0, 0, 0, cM.width, cM.height, G.depth, oM, TM, cM.data) : D.texImage3D(e.TEXTURE_2D_ARRAY, _, aM, cM.width, cM.height, G.depth, 0, oM, TM, cM.data);
        } else {
          ZM && qM && D.texStorage2D(e.TEXTURE_2D, Y, aM, pM[0].width, pM[0].height);
          for (let _ = 0, q = pM.length; _ < q; _++)
            cM = pM[_], o.format !== VD ? oM !== null ? ZM ? D.compressedTexSubImage2D(e.TEXTURE_2D, _, 0, 0, cM.width, cM.height, oM, cM.data) : D.compressedTexImage2D(e.TEXTURE_2D, _, aM, cM.width, cM.height, 0, cM.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : ZM ? D.texSubImage2D(e.TEXTURE_2D, _, 0, 0, cM.width, cM.height, oM, TM, cM.data) : D.texImage2D(e.TEXTURE_2D, _, aM, cM.width, cM.height, 0, oM, TM, cM.data);
        }
      else if (o.isDataArrayTexture)
        ZM ? (qM && D.texStorage3D(e.TEXTURE_2D_ARRAY, Y, aM, G.width, G.height, G.depth), D.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, G.width, G.height, G.depth, oM, TM, G.data)) : D.texImage3D(e.TEXTURE_2D_ARRAY, 0, aM, G.width, G.height, G.depth, 0, oM, TM, G.data);
      else if (o.isData3DTexture)
        ZM ? (qM && D.texStorage3D(e.TEXTURE_3D, Y, aM, G.width, G.height, G.depth), D.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, G.width, G.height, G.depth, oM, TM, G.data)) : D.texImage3D(e.TEXTURE_3D, 0, aM, G.width, G.height, G.depth, 0, oM, TM, G.data);
      else if (o.isFramebufferTexture) {
        if (qM)
          if (ZM)
            D.texStorage2D(e.TEXTURE_2D, Y, aM, G.width, G.height);
          else {
            let _ = G.width, q = G.height;
            for (let zM = 0; zM < Y; zM++)
              D.texImage2D(e.TEXTURE_2D, zM, aM, _, q, 0, oM, TM, null), _ >>= 1, q >>= 1;
          }
      } else if (pM.length > 0 && yM) {
        ZM && qM && D.texStorage2D(e.TEXTURE_2D, Y, aM, pM[0].width, pM[0].height);
        for (let _ = 0, q = pM.length; _ < q; _++)
          cM = pM[_], ZM ? D.texSubImage2D(e.TEXTURE_2D, _, 0, 0, oM, TM, cM) : D.texImage2D(e.TEXTURE_2D, _, aM, oM, TM, cM);
        o.generateMipmaps = !1;
      } else
        ZM ? (qM && D.texStorage2D(e.TEXTURE_2D, Y, aM, G.width, G.height), D.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, oM, TM, G)) : D.texImage2D(e.TEXTURE_2D, 0, aM, oM, TM, G);
      l(o, yM) && d(MM), LM.__version = iM.version, o.onUpdate && o.onUpdate(o);
    }
    E.__version = o.version;
  }
  function rM(E, o, K) {
    if (o.image.length !== 6)
      return;
    const MM = xM(E, o), DM = o.source;
    D.bindTexture(e.TEXTURE_CUBE_MAP, E.__webglTexture, e.TEXTURE0 + K);
    const iM = t.get(DM);
    if (DM.version !== iM.__version || MM === !0) {
      D.activeTexture(e.TEXTURE0 + K), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), e.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.NONE);
      const LM = o.isCompressedTexture || o.image[0].isCompressedTexture, AM = o.image[0] && o.image[0].isDataTexture, G = [];
      for (let _ = 0; _ < 6; _++)
        !LM && !AM ? G[_] = a(o.image[_], !1, !0, n) : G[_] = AM ? o.image[_].image : o.image[_], G[_] = _D(o, G[_]);
      const yM = G[0], oM = C(yM) || A, TM = i.convert(o.format, o.encoding), aM = i.convert(o.type), cM = L(o.internalFormat, TM, aM, o.encoding), pM = A && o.isVideoTexture !== !0, ZM = iM.__version === void 0 || MM === !0;
      let qM = h(o, yM, oM);
      v(e.TEXTURE_CUBE_MAP, o, oM);
      let Y;
      if (LM) {
        pM && ZM && D.texStorage2D(e.TEXTURE_CUBE_MAP, qM, cM, yM.width, yM.height);
        for (let _ = 0; _ < 6; _++) {
          Y = G[_].mipmaps;
          for (let q = 0; q < Y.length; q++) {
            const zM = Y[q];
            o.format !== VD ? TM !== null ? pM ? D.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, q, 0, 0, zM.width, zM.height, TM, zM.data) : D.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, q, cM, zM.width, zM.height, 0, zM.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : pM ? D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, q, 0, 0, zM.width, zM.height, TM, aM, zM.data) : D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, q, cM, zM.width, zM.height, 0, TM, aM, zM.data);
          }
        }
      } else {
        Y = o.mipmaps, pM && ZM && (Y.length > 0 && qM++, D.texStorage2D(e.TEXTURE_CUBE_MAP, qM, cM, G[0].width, G[0].height));
        for (let _ = 0; _ < 6; _++)
          if (AM) {
            pM ? D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, 0, 0, 0, G[_].width, G[_].height, TM, aM, G[_].data) : D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, 0, cM, G[_].width, G[_].height, 0, TM, aM, G[_].data);
            for (let q = 0; q < Y.length; q++) {
              const uM = Y[q].image[_].image;
              pM ? D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, q + 1, 0, 0, uM.width, uM.height, TM, aM, uM.data) : D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, q + 1, cM, uM.width, uM.height, 0, TM, aM, uM.data);
            }
          } else {
            pM ? D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, 0, 0, 0, TM, aM, G[_]) : D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, 0, cM, TM, aM, G[_]);
            for (let q = 0; q < Y.length; q++) {
              const zM = Y[q];
              pM ? D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, q + 1, 0, 0, TM, aM, zM.image[_]) : D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + _, q + 1, cM, TM, aM, zM.image[_]);
            }
          }
      }
      l(o, oM) && d(e.TEXTURE_CUBE_MAP), iM.__version = DM.version, o.onUpdate && o.onUpdate(o);
    }
    E.__version = o.version;
  }
  function nM(E, o, K, MM, DM) {
    const iM = i.convert(K.format, K.encoding), LM = i.convert(K.type), AM = L(K.internalFormat, iM, LM, K.encoding);
    t.get(o).__hasExternalTextures || (DM === e.TEXTURE_3D || DM === e.TEXTURE_2D_ARRAY ? D.texImage3D(DM, 0, AM, o.width, o.height, o.depth, 0, iM, LM, null) : D.texImage2D(DM, 0, AM, o.width, o.height, 0, iM, LM, null)), D.bindFramebuffer(e.FRAMEBUFFER, E), QM(o) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, MM, DM, t.get(K).__webglTexture, 0, GM(o)) : (DM === e.TEXTURE_2D || DM >= e.TEXTURE_CUBE_MAP_POSITIVE_X && DM <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, MM, DM, t.get(K).__webglTexture, 0), D.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function mM(E, o, K) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, E), o.depthBuffer && !o.stencilBuffer) {
      let MM = e.DEPTH_COMPONENT16;
      if (K || QM(o)) {
        const DM = o.depthTexture;
        DM && DM.isDepthTexture && (DM.type === Wt ? MM = e.DEPTH_COMPONENT32F : DM.type === Ht && (MM = e.DEPTH_COMPONENT24));
        const iM = GM(o);
        QM(o) ? g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, iM, MM, o.width, o.height) : e.renderbufferStorageMultisample(e.RENDERBUFFER, iM, MM, o.width, o.height);
      } else
        e.renderbufferStorage(e.RENDERBUFFER, MM, o.width, o.height);
      e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, E);
    } else if (o.depthBuffer && o.stencilBuffer) {
      const MM = GM(o);
      K && QM(o) === !1 ? e.renderbufferStorageMultisample(e.RENDERBUFFER, MM, e.DEPTH24_STENCIL8, o.width, o.height) : QM(o) ? g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, MM, e.DEPTH24_STENCIL8, o.width, o.height) : e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, o.width, o.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, E);
    } else {
      const MM = o.isWebGLMultipleRenderTargets === !0 ? o.texture : [o.texture];
      for (let DM = 0; DM < MM.length; DM++) {
        const iM = MM[DM], LM = i.convert(iM.format, iM.encoding), AM = i.convert(iM.type), G = L(iM.internalFormat, LM, AM, iM.encoding), yM = GM(o);
        K && QM(o) === !1 ? e.renderbufferStorageMultisample(e.RENDERBUFFER, yM, G, o.width, o.height) : QM(o) ? g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, yM, G, o.width, o.height) : e.renderbufferStorage(e.RENDERBUFFER, G, o.width, o.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function OM(E, o) {
    if (o && o.isWebGLCubeRenderTarget)
      throw new Error("Depth Texture with cube render targets is not supported");
    if (D.bindFramebuffer(e.FRAMEBUFFER, E), !(o.depthTexture && o.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!t.get(o.depthTexture).__webglTexture || o.depthTexture.image.width !== o.width || o.depthTexture.image.height !== o.height) && (o.depthTexture.image.width = o.width, o.depthTexture.image.height = o.height, o.depthTexture.needsUpdate = !0), $(o.depthTexture, 0);
    const MM = t.get(o.depthTexture).__webglTexture, DM = GM(o);
    if (o.depthTexture.format === qt)
      QM(o) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, MM, 0, DM) : e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, MM, 0);
    else if (o.depthTexture.format === KN)
      QM(o) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.TEXTURE_2D, MM, 0, DM) : e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.TEXTURE_2D, MM, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function CM(E) {
    const o = t.get(E), K = E.isWebGLCubeRenderTarget === !0;
    if (E.depthTexture && !o.__autoAllocateDepthBuffer) {
      if (K)
        throw new Error("target.depthTexture not supported in Cube render targets");
      OM(o.__webglFramebuffer, E);
    } else if (K) {
      o.__webglDepthbuffer = [];
      for (let MM = 0; MM < 6; MM++)
        D.bindFramebuffer(e.FRAMEBUFFER, o.__webglFramebuffer[MM]), o.__webglDepthbuffer[MM] = e.createRenderbuffer(), mM(o.__webglDepthbuffer[MM], E, !1);
    } else
      D.bindFramebuffer(e.FRAMEBUFFER, o.__webglFramebuffer), o.__webglDepthbuffer = e.createRenderbuffer(), mM(o.__webglDepthbuffer, E, !1);
    D.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function ID(E, o, K) {
    const MM = t.get(E);
    o !== void 0 && nM(MM.__webglFramebuffer, E, E.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D), K !== void 0 && CM(E);
  }
  function YD(E) {
    const o = E.texture, K = t.get(E), MM = t.get(o);
    E.addEventListener("dispose", H), E.isWebGLMultipleRenderTargets !== !0 && (MM.__webglTexture === void 0 && (MM.__webglTexture = e.createTexture()), MM.__version = o.version, z.memory.textures++);
    const DM = E.isWebGLCubeRenderTarget === !0, iM = E.isWebGLMultipleRenderTargets === !0, LM = C(E) || A;
    if (DM) {
      K.__webglFramebuffer = [];
      for (let AM = 0; AM < 6; AM++)
        K.__webglFramebuffer[AM] = e.createFramebuffer();
    } else {
      if (K.__webglFramebuffer = e.createFramebuffer(), iM)
        if (N.drawBuffers) {
          const AM = E.texture;
          for (let G = 0, yM = AM.length; G < yM; G++) {
            const oM = t.get(AM[G]);
            oM.__webglTexture === void 0 && (oM.__webglTexture = e.createTexture(), z.memory.textures++);
          }
        } else
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (A && E.samples > 0 && QM(E) === !1) {
        const AM = iM ? o : [o];
        K.__webglMultisampledFramebuffer = e.createFramebuffer(), K.__webglColorRenderbuffer = [], D.bindFramebuffer(e.FRAMEBUFFER, K.__webglMultisampledFramebuffer);
        for (let G = 0; G < AM.length; G++) {
          const yM = AM[G];
          K.__webglColorRenderbuffer[G] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, K.__webglColorRenderbuffer[G]);
          const oM = i.convert(yM.format, yM.encoding), TM = i.convert(yM.type), aM = L(yM.internalFormat, oM, TM, yM.encoding, E.isXRRenderTarget === !0), cM = GM(E);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, cM, aM, E.width, E.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + G, e.RENDERBUFFER, K.__webglColorRenderbuffer[G]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), E.depthBuffer && (K.__webglDepthRenderbuffer = e.createRenderbuffer(), mM(K.__webglDepthRenderbuffer, E, !0)), D.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (DM) {
      D.bindTexture(e.TEXTURE_CUBE_MAP, MM.__webglTexture), v(e.TEXTURE_CUBE_MAP, o, LM);
      for (let AM = 0; AM < 6; AM++)
        nM(K.__webglFramebuffer[AM], E, o, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + AM);
      l(o, LM) && d(e.TEXTURE_CUBE_MAP), D.unbindTexture();
    } else if (iM) {
      const AM = E.texture;
      for (let G = 0, yM = AM.length; G < yM; G++) {
        const oM = AM[G], TM = t.get(oM);
        D.bindTexture(e.TEXTURE_2D, TM.__webglTexture), v(e.TEXTURE_2D, oM, LM), nM(K.__webglFramebuffer, E, oM, e.COLOR_ATTACHMENT0 + G, e.TEXTURE_2D), l(oM, LM) && d(e.TEXTURE_2D);
      }
      D.unbindTexture();
    } else {
      let AM = e.TEXTURE_2D;
      (E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (A ? AM = E.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), D.bindTexture(AM, MM.__webglTexture), v(AM, o, LM), nM(K.__webglFramebuffer, E, o, e.COLOR_ATTACHMENT0, AM), l(o, LM) && d(AM), D.unbindTexture();
    }
    E.depthBuffer && CM(E);
  }
  function eD(E) {
    const o = C(E) || A, K = E.isWebGLMultipleRenderTargets === !0 ? E.texture : [E.texture];
    for (let MM = 0, DM = K.length; MM < DM; MM++) {
      const iM = K[MM];
      if (l(iM, o)) {
        const LM = E.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : e.TEXTURE_2D, AM = t.get(iM).__webglTexture;
        D.bindTexture(LM, AM), d(LM), D.unbindTexture();
      }
    }
  }
  function pD(E) {
    if (A && E.samples > 0 && QM(E) === !1) {
      const o = E.isWebGLMultipleRenderTargets ? E.texture : [E.texture], K = E.width, MM = E.height;
      let DM = e.COLOR_BUFFER_BIT;
      const iM = [], LM = E.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, AM = t.get(E), G = E.isWebGLMultipleRenderTargets === !0;
      if (G)
        for (let yM = 0; yM < o.length; yM++)
          D.bindFramebuffer(e.FRAMEBUFFER, AM.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + yM, e.RENDERBUFFER, null), D.bindFramebuffer(e.FRAMEBUFFER, AM.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + yM, e.TEXTURE_2D, null, 0);
      D.bindFramebuffer(e.READ_FRAMEBUFFER, AM.__webglMultisampledFramebuffer), D.bindFramebuffer(e.DRAW_FRAMEBUFFER, AM.__webglFramebuffer);
      for (let yM = 0; yM < o.length; yM++) {
        iM.push(e.COLOR_ATTACHMENT0 + yM), E.depthBuffer && iM.push(LM);
        const oM = AM.__ignoreDepthValues !== void 0 ? AM.__ignoreDepthValues : !1;
        if (oM === !1 && (E.depthBuffer && (DM |= e.DEPTH_BUFFER_BIT), E.stencilBuffer && (DM |= e.STENCIL_BUFFER_BIT)), G && e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, AM.__webglColorRenderbuffer[yM]), oM === !0 && (e.invalidateFramebuffer(e.READ_FRAMEBUFFER, [LM]), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [LM])), G) {
          const TM = t.get(o[yM]).__webglTexture;
          e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, TM, 0);
        }
        e.blitFramebuffer(0, 0, K, MM, 0, 0, K, MM, DM, e.NEAREST), s && e.invalidateFramebuffer(e.READ_FRAMEBUFFER, iM);
      }
      if (D.bindFramebuffer(e.READ_FRAMEBUFFER, null), D.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), G)
        for (let yM = 0; yM < o.length; yM++) {
          D.bindFramebuffer(e.FRAMEBUFFER, AM.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + yM, e.RENDERBUFFER, AM.__webglColorRenderbuffer[yM]);
          const oM = t.get(o[yM]).__webglTexture;
          D.bindFramebuffer(e.FRAMEBUFFER, AM.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + yM, e.TEXTURE_2D, oM, 0);
        }
      D.bindFramebuffer(e.DRAW_FRAMEBUFFER, AM.__webglMultisampledFramebuffer);
    }
  }
  function GM(E) {
    return Math.min(u, E.samples);
  }
  function QM(E) {
    const o = t.get(E);
    return A && E.samples > 0 && M.has("WEBGL_multisampled_render_to_texture") === !0 && o.__useRenderToTexture !== !1;
  }
  function Nt(E) {
    const o = z.render.frame;
    j.get(E) !== o && (j.set(E, o), E.update());
  }
  function _D(E, o) {
    const K = E.encoding, MM = E.format, DM = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || E.format === Iz || K !== tN && (K === SM ? A === !1 ? M.has("EXT_sRGB") === !0 && MM === VD ? (E.format = Iz, E.minFilter = yD, E.generateMipmaps = !1) : o = eT.sRGBToLinear(o) : (MM !== VD || DM !== DN) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture encoding:", K)), o;
  }
  this.allocateTextureUnit = F, this.resetTextureUnits = X, this.setTexture2D = $, this.setTexture2DArray = IM, this.setTexture3D = S, this.setTextureCube = V, this.rebindTextures = ID, this.setupRenderTarget = YD, this.updateRenderTargetMipmap = eD, this.updateMultisampleRenderTarget = pD, this.setupDepthRenderbuffer = CM, this.setupFrameBufferTexture = nM, this.useMultisampledRTT = QM;
}
function Ay(e, M, D) {
  const t = D.isWebGL2;
  function N(i, z = null) {
    let A;
    if (i === DN)
      return e.UNSIGNED_BYTE;
    if (i === qu)
      return e.UNSIGNED_SHORT_4_4_4_4;
    if (i === $u)
      return e.UNSIGNED_SHORT_5_5_5_1;
    if (i === Hu)
      return e.BYTE;
    if (i === Wu)
      return e.SHORT;
    if (i === qI)
      return e.UNSIGNED_SHORT;
    if (i === Xu)
      return e.INT;
    if (i === Ht)
      return e.UNSIGNED_INT;
    if (i === Wt)
      return e.FLOAT;
    if (i === oe)
      return t ? e.HALF_FLOAT : (A = M.get("OES_texture_half_float"), A !== null ? A.HALF_FLOAT_OES : null);
    if (i === Ju)
      return e.ALPHA;
    if (i === VD)
      return e.RGBA;
    if (i === Mg)
      return e.LUMINANCE;
    if (i === Dg)
      return e.LUMINANCE_ALPHA;
    if (i === qt)
      return e.DEPTH_COMPONENT;
    if (i === KN)
      return e.DEPTH_STENCIL;
    if (i === Iz)
      return A = M.get("EXT_sRGB"), A !== null ? A.SRGB_ALPHA_EXT : null;
    if (i === tg)
      return e.RED;
    if (i === Ng)
      return e.RED_INTEGER;
    if (i === eg)
      return e.RG;
    if (i === ig)
      return e.RG_INTEGER;
    if (i === Ag)
      return e.RGBA_INTEGER;
    if (i === qi || i === $i || i === Ji || i === MA)
      if (z === SM)
        if (A = M.get("WEBGL_compressed_texture_s3tc_srgb"), A !== null) {
          if (i === qi)
            return A.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (i === $i)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (i === Ji)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (i === MA)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (A = M.get("WEBGL_compressed_texture_s3tc"), A !== null) {
        if (i === qi)
          return A.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (i === $i)
          return A.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (i === Ji)
          return A.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (i === MA)
          return A.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (i === qz || i === $z || i === Jz || i === Mn)
      if (A = M.get("WEBGL_compressed_texture_pvrtc"), A !== null) {
        if (i === qz)
          return A.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === $z)
          return A.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === Jz)
          return A.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === Mn)
          return A.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (i === zg)
      return A = M.get("WEBGL_compressed_texture_etc1"), A !== null ? A.COMPRESSED_RGB_ETC1_WEBGL : null;
    if (i === Dn || i === tn)
      if (A = M.get("WEBGL_compressed_texture_etc"), A !== null) {
        if (i === Dn)
          return z === SM ? A.COMPRESSED_SRGB8_ETC2 : A.COMPRESSED_RGB8_ETC2;
        if (i === tn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : A.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (i === Nn || i === en || i === An || i === zn || i === nn || i === In || i === Tn || i === un || i === gn || i === sn || i === rn || i === cn || i === jn || i === yn)
      if (A = M.get("WEBGL_compressed_texture_astc"), A !== null) {
        if (i === Nn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : A.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === en)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : A.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === An)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : A.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === zn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : A.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === nn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : A.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === In)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : A.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === Tn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : A.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === un)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : A.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === gn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : A.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === sn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : A.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === rn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : A.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === cn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : A.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === jn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : A.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === yn)
          return z === SM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : A.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (i === DA)
      if (A = M.get("EXT_texture_compression_bptc"), A !== null) {
        if (i === DA)
          return z === SM ? A.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : A.COMPRESSED_RGBA_BPTC_UNORM_EXT;
      } else
        return null;
    if (i === ng || i === an || i === on || i === Cn)
      if (A = M.get("EXT_texture_compression_rgtc"), A !== null) {
        if (i === DA)
          return A.COMPRESSED_RED_RGTC1_EXT;
        if (i === an)
          return A.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === on)
          return A.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === Cn)
          return A.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return i === SN ? t ? e.UNSIGNED_INT_24_8 : (A = M.get("WEBGL_depth_texture"), A !== null ? A.UNSIGNED_INT_24_8_WEBGL : null) : e[i] !== void 0 ? e[i] : null;
  }
  return { convert: N };
}
class zy extends SD {
  constructor(M = []) {
    super(), this.isArrayCamera = !0, this.cameras = M;
  }
}
let se = class extends aD {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
};
const ny = { type: "move" };
class lA {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new se(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new se(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new f(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new f()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new se(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new f(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new f()), this._grip;
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
    let N = null, i = null, z = null;
    const A = this._targetRay, I = this._grip, n = this._hand;
    if (M && D.session.visibilityState !== "visible-blurred") {
      if (n && M.hand) {
        z = !0;
        for (const r of M.hand.values()) {
          const c = D.getJointPose(r, t), y = this._getHandJoint(n, r);
          c !== null && (y.matrix.fromArray(c.transform.matrix), y.matrix.decompose(y.position, y.rotation, y.scale), y.jointRadius = c.radius), y.visible = c !== null;
        }
        const T = n.joints["index-finger-tip"], u = n.joints["thumb-tip"], g = T.position.distanceTo(u.position), s = 0.02, j = 5e-3;
        n.inputState.pinching && g > s + j ? (n.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: M.handedness,
          target: this
        })) : !n.inputState.pinching && g <= s - j && (n.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: M.handedness,
          target: this
        }));
      } else
        I !== null && M.gripSpace && (i = D.getPose(M.gripSpace, t), i !== null && (I.matrix.fromArray(i.transform.matrix), I.matrix.decompose(I.position, I.rotation, I.scale), i.linearVelocity ? (I.hasLinearVelocity = !0, I.linearVelocity.copy(i.linearVelocity)) : I.hasLinearVelocity = !1, i.angularVelocity ? (I.hasAngularVelocity = !0, I.angularVelocity.copy(i.angularVelocity)) : I.hasAngularVelocity = !1));
      A !== null && (N = D.getPose(M.targetRaySpace, t), N === null && i !== null && (N = i), N !== null && (A.matrix.fromArray(N.transform.matrix), A.matrix.decompose(A.position, A.rotation, A.scale), N.linearVelocity ? (A.hasLinearVelocity = !0, A.linearVelocity.copy(N.linearVelocity)) : A.hasLinearVelocity = !1, N.angularVelocity ? (A.hasAngularVelocity = !0, A.angularVelocity.copy(N.angularVelocity)) : A.hasAngularVelocity = !1, this.dispatchEvent(ny)));
    }
    return A !== null && (A.visible = N !== null), I !== null && (I.visible = i !== null), n !== null && (n.visible = z !== null), this;
  }
  // private method
  _getHandJoint(M, D) {
    if (M.joints[D.jointName] === void 0) {
      const t = new se();
      t.matrixAutoUpdate = !1, t.visible = !1, M.joints[D.jointName] = t, M.add(t);
    }
    return M.joints[D.jointName];
  }
}
class Iy extends WD {
  constructor(M, D, t, N, i, z, A, I, n, T) {
    if (T = T !== void 0 ? T : qt, T !== qt && T !== KN)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    t === void 0 && T === qt && (t = Ht), t === void 0 && T === KN && (t = SN), super(null, N, i, z, A, I, T, t, n), this.isDepthTexture = !0, this.image = { width: M, height: D }, this.magFilter = A !== void 0 ? A : rD, this.minFilter = I !== void 0 ? I : rD, this.flipY = !1, this.generateMipmaps = !1;
  }
}
class Ty extends BN {
  constructor(M, D) {
    super();
    const t = this;
    let N = null, i = 1, z = null, A = "local-floor", I = 1, n = null, T = null, u = null, g = null, s = null, j = null;
    const r = D.getContextAttributes();
    let c = null, y = null;
    const w = [], a = [], C = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Map(), l = new SD();
    l.layers.enable(1), l.viewport = new tD();
    const d = new SD();
    d.layers.enable(2), d.viewport = new tD();
    const L = [l, d], h = new zy();
    h.layers.enable(1), h.layers.enable(2);
    let p = null, P = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(S) {
      let V = w[S];
      return V === void 0 && (V = new lA(), w[S] = V), V.getTargetRaySpace();
    }, this.getControllerGrip = function(S) {
      let V = w[S];
      return V === void 0 && (V = new lA(), w[S] = V), V.getGripSpace();
    }, this.getHand = function(S) {
      let V = w[S];
      return V === void 0 && (V = new lA(), w[S] = V), V.getHandSpace();
    };
    function H(S) {
      const V = a.indexOf(S.inputSource);
      if (V === -1)
        return;
      const NM = w[V];
      NM !== void 0 && NM.dispatchEvent({ type: S.type, data: S.inputSource });
    }
    function Q() {
      N.removeEventListener("select", H), N.removeEventListener("selectstart", H), N.removeEventListener("selectend", H), N.removeEventListener("squeeze", H), N.removeEventListener("squeezestart", H), N.removeEventListener("squeezeend", H), N.removeEventListener("end", Q), N.removeEventListener("inputsourceschange", U);
      for (let S = 0; S < w.length; S++) {
        const V = a[S];
        V !== null && (a[S] = null, w[S].disconnect(V));
      }
      p = null, P = null, M.setRenderTarget(c), s = null, g = null, u = null, N = null, y = null, IM.stop(), t.isPresenting = !1, t.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(S) {
      i = S, t.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(S) {
      A = S, t.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return n || z;
    }, this.setReferenceSpace = function(S) {
      n = S;
    }, this.getBaseLayer = function() {
      return g !== null ? g : s;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return j;
    }, this.getSession = function() {
      return N;
    }, this.setSession = async function(S) {
      if (N = S, N !== null) {
        if (c = M.getRenderTarget(), N.addEventListener("select", H), N.addEventListener("selectstart", H), N.addEventListener("selectend", H), N.addEventListener("squeeze", H), N.addEventListener("squeezestart", H), N.addEventListener("squeezeend", H), N.addEventListener("end", Q), N.addEventListener("inputsourceschange", U), r.xrCompatible !== !0 && await D.makeXRCompatible(), N.renderState.layers === void 0 || M.capabilities.isWebGL2 === !1) {
          const V = {
            antialias: N.renderState.layers === void 0 ? r.antialias : !0,
            alpha: r.alpha,
            depth: r.depth,
            stencil: r.stencil,
            framebufferScaleFactor: i
          };
          s = new XRWebGLLayer(N, D, V), N.updateRenderState({ baseLayer: s }), y = new eN(
            s.framebufferWidth,
            s.framebufferHeight,
            {
              format: VD,
              type: DN,
              encoding: M.outputEncoding,
              stencilBuffer: r.stencil
            }
          );
        } else {
          let V = null, NM = null, eM = null;
          r.depth && (eM = r.stencil ? D.DEPTH24_STENCIL8 : D.DEPTH_COMPONENT24, V = r.stencil ? KN : qt, NM = r.stencil ? SN : Ht);
          const v = {
            colorFormat: D.RGBA8,
            depthFormat: eM,
            scaleFactor: i
          };
          u = new XRWebGLBinding(N, D), g = u.createProjectionLayer(v), N.updateRenderState({ layers: [g] }), y = new eN(
            g.textureWidth,
            g.textureHeight,
            {
              format: VD,
              type: DN,
              depthTexture: new Iy(g.textureWidth, g.textureHeight, NM, void 0, void 0, void 0, void 0, void 0, void 0, V),
              stencilBuffer: r.stencil,
              encoding: M.outputEncoding,
              samples: r.antialias ? 4 : 0
            }
          );
          const xM = M.properties.get(y);
          xM.__ignoreDepthValues = g.ignoreDepthValues;
        }
        y.isXRRenderTarget = !0, this.setFoveation(I), n = null, z = await N.requestReferenceSpace(A), IM.setContext(N), IM.start(), t.isPresenting = !0, t.dispatchEvent({ type: "sessionstart" });
      }
    };
    function U(S) {
      for (let V = 0; V < S.removed.length; V++) {
        const NM = S.removed[V], eM = a.indexOf(NM);
        eM >= 0 && (a[eM] = null, w[eM].disconnect(NM));
      }
      for (let V = 0; V < S.added.length; V++) {
        const NM = S.added[V];
        let eM = a.indexOf(NM);
        if (eM === -1) {
          for (let xM = 0; xM < w.length; xM++)
            if (xM >= a.length) {
              a.push(NM), eM = xM;
              break;
            } else if (a[xM] === null) {
              a[xM] = NM, eM = xM;
              break;
            }
          if (eM === -1)
            break;
        }
        const v = w[eM];
        v && v.connect(NM);
      }
    }
    const Z = new f(), W = new f();
    function X(S, V, NM) {
      Z.setFromMatrixPosition(V.matrixWorld), W.setFromMatrixPosition(NM.matrixWorld);
      const eM = Z.distanceTo(W), v = V.projectionMatrix.elements, xM = NM.projectionMatrix.elements, sM = v[14] / (v[10] - 1), rM = v[14] / (v[10] + 1), nM = (v[9] + 1) / v[5], mM = (v[9] - 1) / v[5], OM = (v[8] - 1) / v[0], CM = (xM[8] + 1) / xM[0], ID = sM * OM, YD = sM * CM, eD = eM / (-OM + CM), pD = eD * -OM;
      V.matrixWorld.decompose(S.position, S.quaternion, S.scale), S.translateX(pD), S.translateZ(eD), S.matrixWorld.compose(S.position, S.quaternion, S.scale), S.matrixWorldInverse.copy(S.matrixWorld).invert();
      const GM = sM + eD, QM = rM + eD, Nt = ID - pD, _D = YD + (eM - pD), E = nM * rM / QM * GM, o = mM * rM / QM * GM;
      S.projectionMatrix.makePerspective(Nt, _D, E, o, GM, QM);
    }
    function F(S, V) {
      V === null ? S.matrixWorld.copy(S.matrix) : S.matrixWorld.multiplyMatrices(V.matrixWorld, S.matrix), S.matrixWorldInverse.copy(S.matrixWorld).invert();
    }
    this.updateCamera = function(S) {
      if (N === null)
        return;
      h.near = d.near = l.near = S.near, h.far = d.far = l.far = S.far, (p !== h.near || P !== h.far) && (N.updateRenderState({
        depthNear: h.near,
        depthFar: h.far
      }), p = h.near, P = h.far);
      const V = S.parent, NM = h.cameras;
      F(h, V);
      for (let v = 0; v < NM.length; v++)
        F(NM[v], V);
      h.matrixWorld.decompose(h.position, h.quaternion, h.scale), S.matrix.copy(h.matrix), S.matrix.decompose(S.position, S.quaternion, S.scale);
      const eM = S.children;
      for (let v = 0, xM = eM.length; v < xM; v++)
        eM[v].updateMatrixWorld(!0);
      NM.length === 2 ? X(h, l, d) : h.projectionMatrix.copy(l.projectionMatrix);
    }, this.getCamera = function() {
      return h;
    }, this.getFoveation = function() {
      if (!(g === null && s === null))
        return I;
    }, this.setFoveation = function(S) {
      I = S, g !== null && (g.fixedFoveation = S), s !== null && s.fixedFoveation !== void 0 && (s.fixedFoveation = S);
    }, this.getPlanes = function() {
      return C;
    };
    let J = null;
    function $(S, V) {
      if (T = V.getViewerPose(n || z), j = V, T !== null) {
        const NM = T.views;
        s !== null && (M.setRenderTargetFramebuffer(y, s.framebuffer), M.setRenderTarget(y));
        let eM = !1;
        NM.length !== h.cameras.length && (h.cameras.length = 0, eM = !0);
        for (let v = 0; v < NM.length; v++) {
          const xM = NM[v];
          let sM = null;
          if (s !== null)
            sM = s.getViewport(xM);
          else {
            const nM = u.getViewSubImage(g, xM);
            sM = nM.viewport, v === 0 && (M.setRenderTargetTextures(
              y,
              nM.colorTexture,
              g.ignoreDepthValues ? void 0 : nM.depthStencilTexture
            ), M.setRenderTarget(y));
          }
          let rM = L[v];
          rM === void 0 && (rM = new SD(), rM.layers.enable(v), rM.viewport = new tD(), L[v] = rM), rM.matrix.fromArray(xM.transform.matrix), rM.projectionMatrix.fromArray(xM.projectionMatrix), rM.viewport.set(sM.x, sM.y, sM.width, sM.height), v === 0 && h.matrix.copy(rM.matrix), eM === !0 && h.cameras.push(rM);
        }
      }
      for (let NM = 0; NM < w.length; NM++) {
        const eM = a[NM], v = w[NM];
        eM !== null && v !== void 0 && v.update(eM, V, n || z);
      }
      if (J && J(S, V), V.detectedPlanes) {
        t.dispatchEvent({ type: "planesdetected", data: V.detectedPlanes });
        let NM = null;
        for (const eM of C)
          V.detectedPlanes.has(eM) || (NM === null && (NM = []), NM.push(eM));
        if (NM !== null)
          for (const eM of NM)
            C.delete(eM), x.delete(eM), t.dispatchEvent({ type: "planeremoved", data: eM });
        for (const eM of V.detectedPlanes)
          if (!C.has(eM))
            C.add(eM), x.set(eM, V.lastChangedTime), t.dispatchEvent({ type: "planeadded", data: eM });
          else {
            const v = x.get(eM);
            eM.lastChangedTime > v && (x.set(eM, eM.lastChangedTime), t.dispatchEvent({ type: "planechanged", data: eM }));
          }
      }
      j = null;
    }
    const IM = new uT();
    IM.setAnimationLoop($), this.setAnimationLoop = function(S) {
      J = S;
    }, this.dispose = function() {
    };
  }
}
function uy(e, M) {
  function D(r, c) {
    c.color.getRGB(r.fogColor.value, gT(e)), c.isFog ? (r.fogNear.value = c.near, r.fogFar.value = c.far) : c.isFogExp2 && (r.fogDensity.value = c.density);
  }
  function t(r, c, y, w, a) {
    c.isMeshBasicMaterial || c.isMeshLambertMaterial ? N(r, c) : c.isMeshToonMaterial ? (N(r, c), T(r, c)) : c.isMeshPhongMaterial ? (N(r, c), n(r, c)) : c.isMeshStandardMaterial ? (N(r, c), u(r, c), c.isMeshPhysicalMaterial && g(r, c, a)) : c.isMeshMatcapMaterial ? (N(r, c), s(r, c)) : c.isMeshDepthMaterial ? N(r, c) : c.isMeshDistanceMaterial ? (N(r, c), j(r, c)) : c.isMeshNormalMaterial ? N(r, c) : c.isLineBasicMaterial ? (i(r, c), c.isLineDashedMaterial && z(r, c)) : c.isPointsMaterial ? A(r, c, y, w) : c.isSpriteMaterial ? I(r, c) : c.isShadowMaterial ? (r.color.value.copy(c.color), r.opacity.value = c.opacity) : c.isShaderMaterial && (c.uniformsNeedUpdate = !1);
  }
  function N(r, c) {
    r.opacity.value = c.opacity, c.color && r.diffuse.value.copy(c.color), c.emissive && r.emissive.value.copy(c.emissive).multiplyScalar(c.emissiveIntensity), c.map && (r.map.value = c.map), c.alphaMap && (r.alphaMap.value = c.alphaMap), c.bumpMap && (r.bumpMap.value = c.bumpMap, r.bumpScale.value = c.bumpScale, c.side === dD && (r.bumpScale.value *= -1)), c.displacementMap && (r.displacementMap.value = c.displacementMap, r.displacementScale.value = c.displacementScale, r.displacementBias.value = c.displacementBias), c.emissiveMap && (r.emissiveMap.value = c.emissiveMap), c.normalMap && (r.normalMap.value = c.normalMap, r.normalScale.value.copy(c.normalScale), c.side === dD && r.normalScale.value.negate()), c.specularMap && (r.specularMap.value = c.specularMap), c.alphaTest > 0 && (r.alphaTest.value = c.alphaTest);
    const y = M.get(c).envMap;
    if (y && (r.envMap.value = y, r.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, r.reflectivity.value = c.reflectivity, r.ior.value = c.ior, r.refractionRatio.value = c.refractionRatio), c.lightMap) {
      r.lightMap.value = c.lightMap;
      const C = e.physicallyCorrectLights !== !0 ? Math.PI : 1;
      r.lightMapIntensity.value = c.lightMapIntensity * C;
    }
    c.aoMap && (r.aoMap.value = c.aoMap, r.aoMapIntensity.value = c.aoMapIntensity);
    let w;
    c.map ? w = c.map : c.specularMap ? w = c.specularMap : c.displacementMap ? w = c.displacementMap : c.normalMap ? w = c.normalMap : c.bumpMap ? w = c.bumpMap : c.roughnessMap ? w = c.roughnessMap : c.metalnessMap ? w = c.metalnessMap : c.alphaMap ? w = c.alphaMap : c.emissiveMap ? w = c.emissiveMap : c.clearcoatMap ? w = c.clearcoatMap : c.clearcoatNormalMap ? w = c.clearcoatNormalMap : c.clearcoatRoughnessMap ? w = c.clearcoatRoughnessMap : c.iridescenceMap ? w = c.iridescenceMap : c.iridescenceThicknessMap ? w = c.iridescenceThicknessMap : c.specularIntensityMap ? w = c.specularIntensityMap : c.specularColorMap ? w = c.specularColorMap : c.transmissionMap ? w = c.transmissionMap : c.thicknessMap ? w = c.thicknessMap : c.sheenColorMap ? w = c.sheenColorMap : c.sheenRoughnessMap && (w = c.sheenRoughnessMap), w !== void 0 && (w.isWebGLRenderTarget && (w = w.texture), w.matrixAutoUpdate === !0 && w.updateMatrix(), r.uvTransform.value.copy(w.matrix));
    let a;
    c.aoMap ? a = c.aoMap : c.lightMap && (a = c.lightMap), a !== void 0 && (a.isWebGLRenderTarget && (a = a.texture), a.matrixAutoUpdate === !0 && a.updateMatrix(), r.uv2Transform.value.copy(a.matrix));
  }
  function i(r, c) {
    r.diffuse.value.copy(c.color), r.opacity.value = c.opacity;
  }
  function z(r, c) {
    r.dashSize.value = c.dashSize, r.totalSize.value = c.dashSize + c.gapSize, r.scale.value = c.scale;
  }
  function A(r, c, y, w) {
    r.diffuse.value.copy(c.color), r.opacity.value = c.opacity, r.size.value = c.size * y, r.scale.value = w * 0.5, c.map && (r.map.value = c.map), c.alphaMap && (r.alphaMap.value = c.alphaMap), c.alphaTest > 0 && (r.alphaTest.value = c.alphaTest);
    let a;
    c.map ? a = c.map : c.alphaMap && (a = c.alphaMap), a !== void 0 && (a.matrixAutoUpdate === !0 && a.updateMatrix(), r.uvTransform.value.copy(a.matrix));
  }
  function I(r, c) {
    r.diffuse.value.copy(c.color), r.opacity.value = c.opacity, r.rotation.value = c.rotation, c.map && (r.map.value = c.map), c.alphaMap && (r.alphaMap.value = c.alphaMap), c.alphaTest > 0 && (r.alphaTest.value = c.alphaTest);
    let y;
    c.map ? y = c.map : c.alphaMap && (y = c.alphaMap), y !== void 0 && (y.matrixAutoUpdate === !0 && y.updateMatrix(), r.uvTransform.value.copy(y.matrix));
  }
  function n(r, c) {
    r.specular.value.copy(c.specular), r.shininess.value = Math.max(c.shininess, 1e-4);
  }
  function T(r, c) {
    c.gradientMap && (r.gradientMap.value = c.gradientMap);
  }
  function u(r, c) {
    r.roughness.value = c.roughness, r.metalness.value = c.metalness, c.roughnessMap && (r.roughnessMap.value = c.roughnessMap), c.metalnessMap && (r.metalnessMap.value = c.metalnessMap), M.get(c).envMap && (r.envMapIntensity.value = c.envMapIntensity);
  }
  function g(r, c, y) {
    r.ior.value = c.ior, c.sheen > 0 && (r.sheenColor.value.copy(c.sheenColor).multiplyScalar(c.sheen), r.sheenRoughness.value = c.sheenRoughness, c.sheenColorMap && (r.sheenColorMap.value = c.sheenColorMap), c.sheenRoughnessMap && (r.sheenRoughnessMap.value = c.sheenRoughnessMap)), c.clearcoat > 0 && (r.clearcoat.value = c.clearcoat, r.clearcoatRoughness.value = c.clearcoatRoughness, c.clearcoatMap && (r.clearcoatMap.value = c.clearcoatMap), c.clearcoatRoughnessMap && (r.clearcoatRoughnessMap.value = c.clearcoatRoughnessMap), c.clearcoatNormalMap && (r.clearcoatNormalScale.value.copy(c.clearcoatNormalScale), r.clearcoatNormalMap.value = c.clearcoatNormalMap, c.side === dD && r.clearcoatNormalScale.value.negate())), c.iridescence > 0 && (r.iridescence.value = c.iridescence, r.iridescenceIOR.value = c.iridescenceIOR, r.iridescenceThicknessMinimum.value = c.iridescenceThicknessRange[0], r.iridescenceThicknessMaximum.value = c.iridescenceThicknessRange[1], c.iridescenceMap && (r.iridescenceMap.value = c.iridescenceMap), c.iridescenceThicknessMap && (r.iridescenceThicknessMap.value = c.iridescenceThicknessMap)), c.transmission > 0 && (r.transmission.value = c.transmission, r.transmissionSamplerMap.value = y.texture, r.transmissionSamplerSize.value.set(y.width, y.height), c.transmissionMap && (r.transmissionMap.value = c.transmissionMap), r.thickness.value = c.thickness, c.thicknessMap && (r.thicknessMap.value = c.thicknessMap), r.attenuationDistance.value = c.attenuationDistance, r.attenuationColor.value.copy(c.attenuationColor)), r.specularIntensity.value = c.specularIntensity, r.specularColor.value.copy(c.specularColor), c.specularIntensityMap && (r.specularIntensityMap.value = c.specularIntensityMap), c.specularColorMap && (r.specularColorMap.value = c.specularColorMap);
  }
  function s(r, c) {
    c.matcap && (r.matcap.value = c.matcap);
  }
  function j(r, c) {
    r.referencePosition.value.copy(c.referencePosition), r.nearDistance.value = c.nearDistance, r.farDistance.value = c.farDistance;
  }
  return {
    refreshFogUniforms: D,
    refreshMaterialUniforms: t
  };
}
function gy(e, M, D, t) {
  let N = {}, i = {}, z = [];
  const A = D.isWebGL2 ? e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function I(w, a) {
    const C = a.program;
    t.uniformBlockBinding(w, C);
  }
  function n(w, a) {
    let C = N[w.id];
    C === void 0 && (j(w), C = T(w), N[w.id] = C, w.addEventListener("dispose", c));
    const x = a.program;
    t.updateUBOMapping(w, x);
    const l = M.render.frame;
    i[w.id] !== l && (g(w), i[w.id] = l);
  }
  function T(w) {
    const a = u();
    w.__bindingPointIndex = a;
    const C = e.createBuffer(), x = w.__size, l = w.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, C), e.bufferData(e.UNIFORM_BUFFER, x, l), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, a, C), C;
  }
  function u() {
    for (let w = 0; w < A; w++)
      if (z.indexOf(w) === -1)
        return z.push(w), w;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function g(w) {
    const a = N[w.id], C = w.uniforms, x = w.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, a);
    for (let l = 0, d = C.length; l < d; l++) {
      const L = C[l];
      if (s(L, l, x) === !0) {
        const h = L.__offset, p = Array.isArray(L.value) ? L.value : [L.value];
        let P = 0;
        for (let H = 0; H < p.length; H++) {
          const Q = p[H], U = r(Q);
          typeof Q == "number" ? (L.__data[0] = Q, e.bufferSubData(e.UNIFORM_BUFFER, h + P, L.__data)) : Q.isMatrix3 ? (L.__data[0] = Q.elements[0], L.__data[1] = Q.elements[1], L.__data[2] = Q.elements[2], L.__data[3] = Q.elements[0], L.__data[4] = Q.elements[3], L.__data[5] = Q.elements[4], L.__data[6] = Q.elements[5], L.__data[7] = Q.elements[0], L.__data[8] = Q.elements[6], L.__data[9] = Q.elements[7], L.__data[10] = Q.elements[8], L.__data[11] = Q.elements[0]) : (Q.toArray(L.__data, P), P += U.storage / Float32Array.BYTES_PER_ELEMENT);
        }
        e.bufferSubData(e.UNIFORM_BUFFER, h, L.__data);
      }
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function s(w, a, C) {
    const x = w.value;
    if (C[a] === void 0) {
      if (typeof x == "number")
        C[a] = x;
      else {
        const l = Array.isArray(x) ? x : [x], d = [];
        for (let L = 0; L < l.length; L++)
          d.push(l[L].clone());
        C[a] = d;
      }
      return !0;
    } else if (typeof x == "number") {
      if (C[a] !== x)
        return C[a] = x, !0;
    } else {
      const l = Array.isArray(C[a]) ? C[a] : [C[a]], d = Array.isArray(x) ? x : [x];
      for (let L = 0; L < l.length; L++) {
        const h = l[L];
        if (h.equals(d[L]) === !1)
          return h.copy(d[L]), !0;
      }
    }
    return !1;
  }
  function j(w) {
    const a = w.uniforms;
    let C = 0;
    const x = 16;
    let l = 0;
    for (let d = 0, L = a.length; d < L; d++) {
      const h = a[d], p = {
        boundary: 0,
        // bytes
        storage: 0
        // bytes
      }, P = Array.isArray(h.value) ? h.value : [h.value];
      for (let H = 0, Q = P.length; H < Q; H++) {
        const U = P[H], Z = r(U);
        p.boundary += Z.boundary, p.storage += Z.storage;
      }
      if (h.__data = new Float32Array(p.storage / Float32Array.BYTES_PER_ELEMENT), h.__offset = C, d > 0) {
        l = C % x;
        const H = x - l;
        l !== 0 && H - p.boundary < 0 && (C += x - l, h.__offset = C);
      }
      C += p.storage;
    }
    return l = C % x, l > 0 && (C += x - l), w.__size = C, w.__cache = {}, this;
  }
  function r(w) {
    const a = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof w == "number" ? (a.boundary = 4, a.storage = 4) : w.isVector2 ? (a.boundary = 8, a.storage = 8) : w.isVector3 || w.isColor ? (a.boundary = 16, a.storage = 12) : w.isVector4 ? (a.boundary = 16, a.storage = 16) : w.isMatrix3 ? (a.boundary = 48, a.storage = 48) : w.isMatrix4 ? (a.boundary = 64, a.storage = 64) : w.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", w), a;
  }
  function c(w) {
    const a = w.target;
    a.removeEventListener("dispose", c);
    const C = z.indexOf(a.__bindingPointIndex);
    z.splice(C, 1), e.deleteBuffer(N[a.id]), delete N[a.id], delete i[a.id];
  }
  function y() {
    for (const w in N)
      e.deleteBuffer(N[w]);
    z = [], N = {}, i = {};
  }
  return {
    bind: I,
    update: n,
    dispose: y
  };
}
function sy() {
  const e = Le("canvas");
  return e.style.display = "block", e;
}
function ry(e = {}) {
  this.isWebGLRenderer = !0;
  const M = e.canvas !== void 0 ? e.canvas : sy(), D = e.context !== void 0 ? e.context : null, t = e.depth !== void 0 ? e.depth : !0, N = e.stencil !== void 0 ? e.stencil : !0, i = e.antialias !== void 0 ? e.antialias : !1, z = e.premultipliedAlpha !== void 0 ? e.premultipliedAlpha : !0, A = e.preserveDrawingBuffer !== void 0 ? e.preserveDrawingBuffer : !1, I = e.powerPreference !== void 0 ? e.powerPreference : "default", n = e.failIfMajorPerformanceCaveat !== void 0 ? e.failIfMajorPerformanceCaveat : !1;
  let T;
  D !== null ? T = D.getContextAttributes().alpha : T = e.alpha !== void 0 ? e.alpha : !1;
  let u = null, g = null;
  const s = [], j = [];
  this.domElement = M, this.debug = {
    /**
     * Enables error checking and reporting when shader programs are being compiled
     * @type {boolean}
     */
    checkShaderErrors: !0
  }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.outputEncoding = tN, this.physicallyCorrectLights = !1, this.toneMapping = Lt, this.toneMappingExposure = 1;
  const r = this;
  let c = !1, y = 0, w = 0, a = null, C = -1, x = null;
  const l = new tD(), d = new tD();
  let L = null, h = M.width, p = M.height, P = 1, H = null, Q = null;
  const U = new tD(0, 0, h, p), Z = new tD(0, 0, h, p);
  let W = !1;
  const X = new oz();
  let F = !1, J = !1, $ = null;
  const IM = new ND(), S = new gM(), V = new f(), NM = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
  function eM() {
    return a === null ? P : 1;
  }
  let v = D;
  function xM(O, k) {
    for (let b = 0; b < O.length; b++) {
      const m = O[b], R = M.getContext(m, k);
      if (R !== null)
        return R;
    }
    return null;
  }
  try {
    const O = {
      alpha: !0,
      depth: t,
      stencil: N,
      antialias: i,
      premultipliedAlpha: z,
      preserveDrawingBuffer: A,
      powerPreference: I,
      failIfMajorPerformanceCaveat: n
    };
    if ("setAttribute" in M && M.setAttribute("data-engine", `three.js r${yu}`), M.addEventListener("webglcontextlost", aM, !1), M.addEventListener("webglcontextrestored", cM, !1), M.addEventListener("webglcontextcreationerror", pM, !1), v === null) {
      const k = ["webgl2", "webgl", "experimental-webgl"];
      if (r.isWebGL1Renderer === !0 && k.shift(), v = xM(k, O), v === null)
        throw xM(k) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
    }
    v.getShaderPrecisionFormat === void 0 && (v.getShaderPrecisionFormat = function() {
      return { rangeMin: 1, rangeMax: 1, precision: 1 };
    });
  } catch (O) {
    throw console.error("THREE.WebGLRenderer: " + O.message), O;
  }
  let sM, rM, nM, mM, OM, CM, ID, YD, eD, pD, GM, QM, Nt, _D, E, o, K, MM, DM, iM, LM, AM, G, yM;
  function oM() {
    sM = new xc(v), rM = new cc(v, sM, e), sM.init(rM), AM = new Ay(v, sM, rM), nM = new ey(v, sM, rM), mM = new lc(v), OM = new Fj(), CM = new iy(v, sM, nM, OM, rM, AM, mM), ID = new oc(r), YD = new wc(r), eD = new vg(v, rM), G = new sc(v, sM, eD, rM), pD = new Oc(v, eD, mM, G), GM = new Yc(v, pD, eD, mM), DM = new vc(v, rM, CM), o = new jc(OM), QM = new Pj(r, ID, YD, sM, rM, G, o), Nt = new uy(r, OM), _D = new Gj(), E = new $j(sM, rM), MM = new gc(r, ID, YD, nM, GM, T, z), K = new Ny(r, GM, rM), yM = new gy(v, mM, rM, nM), iM = new rc(v, sM, mM, rM), LM = new Ec(v, sM, mM, rM), mM.programs = QM.programs, r.capabilities = rM, r.extensions = sM, r.properties = OM, r.renderLists = _D, r.shadowMap = K, r.state = nM, r.info = mM;
  }
  oM();
  const TM = new Ty(r, v);
  this.xr = TM, this.getContext = function() {
    return v;
  }, this.getContextAttributes = function() {
    return v.getContextAttributes();
  }, this.forceContextLoss = function() {
    const O = sM.get("WEBGL_lose_context");
    O && O.loseContext();
  }, this.forceContextRestore = function() {
    const O = sM.get("WEBGL_lose_context");
    O && O.restoreContext();
  }, this.getPixelRatio = function() {
    return P;
  }, this.setPixelRatio = function(O) {
    O !== void 0 && (P = O, this.setSize(h, p, !1));
  }, this.getSize = function(O) {
    return O.set(h, p);
  }, this.setSize = function(O, k, b) {
    if (TM.isPresenting) {
      console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
      return;
    }
    h = O, p = k, M.width = Math.floor(O * P), M.height = Math.floor(k * P), b !== !1 && (M.style.width = O + "px", M.style.height = k + "px"), this.setViewport(0, 0, O, k);
  }, this.getDrawingBufferSize = function(O) {
    return O.set(h * P, p * P).floor();
  }, this.setDrawingBufferSize = function(O, k, b) {
    h = O, p = k, P = b, M.width = Math.floor(O * b), M.height = Math.floor(k * b), this.setViewport(0, 0, O, k);
  }, this.getCurrentViewport = function(O) {
    return O.copy(l);
  }, this.getViewport = function(O) {
    return O.copy(U);
  }, this.setViewport = function(O, k, b, m) {
    O.isVector4 ? U.set(O.x, O.y, O.z, O.w) : U.set(O, k, b, m), nM.viewport(l.copy(U).multiplyScalar(P).floor());
  }, this.getScissor = function(O) {
    return O.copy(Z);
  }, this.setScissor = function(O, k, b, m) {
    O.isVector4 ? Z.set(O.x, O.y, O.z, O.w) : Z.set(O, k, b, m), nM.scissor(d.copy(Z).multiplyScalar(P).floor());
  }, this.getScissorTest = function() {
    return W;
  }, this.setScissorTest = function(O) {
    nM.setScissorTest(W = O);
  }, this.setOpaqueSort = function(O) {
    H = O;
  }, this.setTransparentSort = function(O) {
    Q = O;
  }, this.getClearColor = function(O) {
    return O.copy(MM.getClearColor());
  }, this.setClearColor = function() {
    MM.setClearColor.apply(MM, arguments);
  }, this.getClearAlpha = function() {
    return MM.getClearAlpha();
  }, this.setClearAlpha = function() {
    MM.setClearAlpha.apply(MM, arguments);
  }, this.clear = function(O = !0, k = !0, b = !0) {
    let m = 0;
    O && (m |= v.COLOR_BUFFER_BIT), k && (m |= v.DEPTH_BUFFER_BIT), b && (m |= v.STENCIL_BUFFER_BIT), v.clear(m);
  }, this.clearColor = function() {
    this.clear(!0, !1, !1);
  }, this.clearDepth = function() {
    this.clear(!1, !0, !1);
  }, this.clearStencil = function() {
    this.clear(!1, !1, !0);
  }, this.dispose = function() {
    M.removeEventListener("webglcontextlost", aM, !1), M.removeEventListener("webglcontextrestored", cM, !1), M.removeEventListener("webglcontextcreationerror", pM, !1), _D.dispose(), E.dispose(), OM.dispose(), ID.dispose(), YD.dispose(), GM.dispose(), G.dispose(), yM.dispose(), QM.dispose(), TM.dispose(), TM.removeEventListener("sessionstart", zM), TM.removeEventListener("sessionend", uM), $ && ($.dispose(), $ = null), fM.stop();
  };
  function aM(O) {
    O.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), c = !0;
  }
  function cM() {
    console.log("THREE.WebGLRenderer: Context Restored."), c = !1;
    const O = mM.autoReset, k = K.enabled, b = K.autoUpdate, m = K.needsUpdate, R = K.type;
    oM(), mM.autoReset = O, K.enabled = k, K.autoUpdate = b, K.needsUpdate = m, K.type = R;
  }
  function pM(O) {
    console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", O.statusMessage);
  }
  function ZM(O) {
    const k = O.target;
    k.removeEventListener("dispose", ZM), qM(k);
  }
  function qM(O) {
    Y(O), OM.remove(O);
  }
  function Y(O) {
    const k = OM.get(O).programs;
    k !== void 0 && (k.forEach(function(b) {
      QM.releaseProgram(b);
    }), O.isShaderMaterial && QM.releaseShaderCache(O));
  }
  this.renderBufferDirect = function(O, k, b, m, R, jM) {
    k === null && (k = NM);
    const wM = R.isMesh && R.matrixWorld.determinant() < 0, lM = pT(O, k, b, m, R);
    nM.setMaterial(m, wM);
    let hM = b.index, UM = 1;
    m.wireframe === !0 && (hM = pD.getWireframeAttribute(b), UM = 2);
    const dM = b.drawRange, vM = b.attributes.position;
    let KM = dM.start * UM, oD = (dM.start + dM.count) * UM;
    jM !== null && (KM = Math.max(KM, jM.start * UM), oD = Math.min(oD, (jM.start + jM.count) * UM)), hM !== null ? (KM = Math.max(KM, 0), oD = Math.min(oD, hM.count)) : vM != null && (KM = Math.max(KM, 0), oD = Math.min(oD, vM.count));
    const it = oD - KM;
    if (it < 0 || it === 1 / 0)
      return;
    G.setup(R, m, lM, b, hM);
    let kt, RM = iM;
    if (hM !== null && (kt = eD.get(hM), RM = LM, RM.setIndex(kt)), R.isMesh)
      m.wireframe === !0 ? (nM.setLineWidth(m.wireframeLinewidth * eM()), RM.setMode(v.LINES)) : RM.setMode(v.TRIANGLES);
    else if (R.isLine) {
      let YM = m.linewidth;
      YM === void 0 && (YM = 1), nM.setLineWidth(YM * eM()), R.isLineSegments ? RM.setMode(v.LINES) : R.isLineLoop ? RM.setMode(v.LINE_LOOP) : RM.setMode(v.LINE_STRIP);
    } else
      R.isPoints ? RM.setMode(v.POINTS) : R.isSprite && RM.setMode(v.TRIANGLES);
    if (R.isInstancedMesh)
      RM.renderInstances(KM, it, R.count);
    else if (b.isInstancedBufferGeometry) {
      const YM = b._maxInstanceCount !== void 0 ? b._maxInstanceCount : 1 / 0, Ki = Math.min(b.instanceCount, YM);
      RM.renderInstances(KM, it, Ki);
    } else
      RM.render(KM, it);
  }, this.compile = function(O, k) {
    function b(m, R, jM) {
      m.transparent === !0 && m.side === Yt && m.forceSinglePass === !1 ? (m.side = dD, m.needsUpdate = !0, UD(m, R, jM), m.side = ft, m.needsUpdate = !0, UD(m, R, jM), m.side = Yt) : UD(m, R, jM);
    }
    g = E.get(O), g.init(), j.push(g), O.traverseVisible(function(m) {
      m.isLight && m.layers.test(k.layers) && (g.pushLight(m), m.castShadow && g.pushShadow(m));
    }), g.setupLights(r.physicallyCorrectLights), O.traverse(function(m) {
      const R = m.material;
      if (R)
        if (Array.isArray(R))
          for (let jM = 0; jM < R.length; jM++) {
            const wM = R[jM];
            b(wM, O, m);
          }
        else
          b(R, O, m);
    }), j.pop(), g = null;
  };
  let _ = null;
  function q(O) {
    _ && _(O);
  }
  function zM() {
    fM.stop();
  }
  function uM() {
    fM.start();
  }
  const fM = new uT();
  fM.setAnimationLoop(q), typeof self < "u" && fM.setContext(self), this.setAnimationLoop = function(O) {
    _ = O, TM.setAnimationLoop(O), O === null ? fM.stop() : fM.start();
  }, TM.addEventListener("sessionstart", zM), TM.addEventListener("sessionend", uM), this.render = function(O, k) {
    if (k !== void 0 && k.isCamera !== !0) {
      console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
      return;
    }
    if (c === !0)
      return;
    O.matrixWorldAutoUpdate === !0 && O.updateMatrixWorld(), k.parent === null && k.matrixWorldAutoUpdate === !0 && k.updateMatrixWorld(), TM.enabled === !0 && TM.isPresenting === !0 && (TM.cameraAutoUpdate === !0 && TM.updateCamera(k), k = TM.getCamera()), O.isScene === !0 && O.onBeforeRender(r, O, k, a), g = E.get(O, j.length), g.init(), j.push(g), IM.multiplyMatrices(k.projectionMatrix, k.matrixWorldInverse), X.setFromProjectionMatrix(IM), J = this.localClippingEnabled, F = o.init(this.clippingPlanes, J), u = _D.get(O, s.length), u.init(), s.push(u), $M(O, k, 0, r.sortObjects), u.finish(), r.sortObjects === !0 && u.sort(H, Q), F === !0 && o.beginShadows();
    const b = g.state.shadowsArray;
    if (K.render(b, O, k), F === !0 && o.endShadows(), this.info.autoReset === !0 && this.info.reset(), MM.render(u, O), g.setupLights(r.physicallyCorrectLights), k.isArrayCamera) {
      const m = k.cameras;
      for (let R = 0, jM = m.length; R < jM; R++) {
        const wM = m[R];
        iD(u, O, wM, wM.viewport);
      }
    } else
      iD(u, O, k);
    a !== null && (CM.updateMultisampleRenderTarget(a), CM.updateRenderTargetMipmap(a)), O.isScene === !0 && O.onAfterRender(r, O, k), G.resetDefaultState(), C = -1, x = null, j.pop(), j.length > 0 ? g = j[j.length - 1] : g = null, s.pop(), s.length > 0 ? u = s[s.length - 1] : u = null;
  };
  function $M(O, k, b, m) {
    if (O.visible === !1)
      return;
    if (O.layers.test(k.layers)) {
      if (O.isGroup)
        b = O.renderOrder;
      else if (O.isLOD)
        O.autoUpdate === !0 && O.update(k);
      else if (O.isLight)
        g.pushLight(O), O.castShadow && g.pushShadow(O);
      else if (O.isSprite) {
        if (!O.frustumCulled || X.intersectsSprite(O)) {
          m && V.setFromMatrixPosition(O.matrixWorld).applyMatrix4(IM);
          const wM = GM.update(O), lM = O.material;
          lM.visible && u.push(O, wM, lM, b, V.z, null);
        }
      } else if ((O.isMesh || O.isLine || O.isPoints) && (O.isSkinnedMesh && O.skeleton.frame !== mM.render.frame && (O.skeleton.update(), O.skeleton.frame = mM.render.frame), !O.frustumCulled || X.intersectsObject(O))) {
        m && V.setFromMatrixPosition(O.matrixWorld).applyMatrix4(IM);
        const wM = GM.update(O), lM = O.material;
        if (Array.isArray(lM)) {
          const hM = wM.groups;
          for (let UM = 0, dM = hM.length; UM < dM; UM++) {
            const vM = hM[UM], KM = lM[vM.materialIndex];
            KM && KM.visible && u.push(O, wM, KM, b, V.z, vM);
          }
        } else
          lM.visible && u.push(O, wM, lM, b, V.z, null);
      }
    }
    const jM = O.children;
    for (let wM = 0, lM = jM.length; wM < lM; wM++)
      $M(jM[wM], k, b, m);
  }
  function iD(O, k, b, m) {
    const R = O.opaque, jM = O.transmissive, wM = O.transparent;
    g.setupLightsView(b), F === !0 && o.setGlobalState(r.clippingPlanes, b), jM.length > 0 && mt(R, k, b), m && nM.viewport(l.copy(m)), R.length > 0 && _M(R, k, b), jM.length > 0 && _M(jM, k, b), wM.length > 0 && _M(wM, k, b), nM.buffers.depth.setTest(!0), nM.buffers.depth.setMask(!0), nM.buffers.color.setMask(!0), nM.setPolygonOffset(!1);
  }
  function mt(O, k, b) {
    const m = rM.isWebGL2;
    $ === null && ($ = new eN(1, 1, {
      generateMipmaps: !0,
      type: sM.has("EXT_color_buffer_half_float") ? oe : DN,
      minFilter: ae,
      samples: m && i === !0 ? 4 : 0
    })), r.getDrawingBufferSize(S), m ? $.setSize(S.x, S.y) : $.setSize(tz(S.x), tz(S.y));
    const R = r.getRenderTarget();
    r.setRenderTarget($), r.clear();
    const jM = r.toneMapping;
    r.toneMapping = Lt, _M(O, k, b), r.toneMapping = jM, CM.updateMultisampleRenderTarget($), CM.updateRenderTargetMipmap($), r.setRenderTarget(R);
  }
  function _M(O, k, b) {
    const m = k.isScene === !0 ? k.overrideMaterial : null;
    for (let R = 0, jM = O.length; R < jM; R++) {
      const wM = O[R], lM = wM.object, hM = wM.geometry, UM = m === null ? wM.material : m, dM = wM.group;
      lM.layers.test(b.layers) && et(lM, k, b, hM, UM, dM);
    }
  }
  function et(O, k, b, m, R, jM) {
    O.onBeforeRender(r, k, b, m, R, jM), O.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, O.matrixWorld), O.normalMatrix.getNormalMatrix(O.modelViewMatrix), R.onBeforeRender(r, k, b, m, O, jM), R.transparent === !0 && R.side === Yt && R.forceSinglePass === !1 ? (R.side = dD, R.needsUpdate = !0, r.renderBufferDirect(b, k, m, R, O, jM), R.side = ft, R.needsUpdate = !0, r.renderBufferDirect(b, k, m, R, O, jM), R.side = Yt) : r.renderBufferDirect(b, k, m, R, O, jM), O.onAfterRender(r, k, b, m, R, jM);
  }
  function UD(O, k, b) {
    k.isScene !== !0 && (k = NM);
    const m = OM.get(O), R = g.state.lights, jM = g.state.shadowsArray, wM = R.state.version, lM = QM.getParameters(O, R.state, jM, k, b), hM = QM.getProgramCacheKey(lM);
    let UM = m.programs;
    m.environment = O.isMeshStandardMaterial ? k.environment : null, m.fog = k.fog, m.envMap = (O.isMeshStandardMaterial ? YD : ID).get(O.envMap || m.environment), UM === void 0 && (O.addEventListener("dispose", ZM), UM = /* @__PURE__ */ new Map(), m.programs = UM);
    let dM = UM.get(hM);
    if (dM !== void 0) {
      if (m.currentProgram === dM && m.lightsStateVersion === wM)
        return hz(O, lM), dM;
    } else
      lM.uniforms = QM.getUniforms(O), O.onBuild(b, lM, r), O.onBeforeCompile(lM, r), dM = QM.acquireProgram(lM, hM), UM.set(hM, dM), m.uniforms = lM.uniforms;
    const vM = m.uniforms;
    (!O.isShaderMaterial && !O.isRawShaderMaterial || O.clipping === !0) && (vM.clippingPlanes = o.uniform), hz(O, lM), m.needsLights = fT(O), m.lightsStateVersion = wM, m.needsLights && (vM.ambientLightColor.value = R.state.ambient, vM.lightProbe.value = R.state.probe, vM.directionalLights.value = R.state.directional, vM.directionalLightShadows.value = R.state.directionalShadow, vM.spotLights.value = R.state.spot, vM.spotLightShadows.value = R.state.spotShadow, vM.rectAreaLights.value = R.state.rectArea, vM.ltc_1.value = R.state.rectAreaLTC1, vM.ltc_2.value = R.state.rectAreaLTC2, vM.pointLights.value = R.state.point, vM.pointLightShadows.value = R.state.pointShadow, vM.hemisphereLights.value = R.state.hemi, vM.directionalShadowMap.value = R.state.directionalShadowMap, vM.directionalShadowMatrix.value = R.state.directionalShadowMatrix, vM.spotShadowMap.value = R.state.spotShadowMap, vM.spotLightMatrix.value = R.state.spotLightMatrix, vM.spotLightMap.value = R.state.spotLightMap, vM.pointShadowMap.value = R.state.pointShadowMap, vM.pointShadowMatrix.value = R.state.pointShadowMatrix);
    const KM = dM.getUniforms(), oD = Ei.seqWithValue(KM.seq, vM);
    return m.currentProgram = dM, m.uniformsList = oD, dM;
  }
  function hz(O, k) {
    const b = OM.get(O);
    b.outputEncoding = k.outputEncoding, b.instancing = k.instancing, b.skinning = k.skinning, b.morphTargets = k.morphTargets, b.morphNormals = k.morphNormals, b.morphColors = k.morphColors, b.morphTargetsCount = k.morphTargetsCount, b.numClippingPlanes = k.numClippingPlanes, b.numIntersection = k.numClipIntersection, b.vertexAlphas = k.vertexAlphas, b.vertexTangents = k.vertexTangents, b.toneMapping = k.toneMapping;
  }
  function pT(O, k, b, m, R) {
    k.isScene !== !0 && (k = NM), CM.resetTextureUnits();
    const jM = k.fog, wM = m.isMeshStandardMaterial ? k.environment : null, lM = a === null ? r.outputEncoding : a.isXRRenderTarget === !0 ? a.texture.encoding : tN, hM = (m.isMeshStandardMaterial ? YD : ID).get(m.envMap || wM), UM = m.vertexColors === !0 && !!b.attributes.color && b.attributes.color.itemSize === 4, dM = !!m.normalMap && !!b.attributes.tangent, vM = !!b.morphAttributes.position, KM = !!b.morphAttributes.normal, oD = !!b.morphAttributes.color, it = m.toneMapped ? r.toneMapping : Lt, kt = b.morphAttributes.position || b.morphAttributes.normal || b.morphAttributes.color, RM = kt !== void 0 ? kt.length : 0, YM = OM.get(m), Ki = g.state.lights;
    if (F === !0 && (J === !0 || O !== x)) {
      const CD = O === x && m.id === C;
      o.setState(m, O, CD);
    }
    let JM = !1;
    m.version === YM.__version ? (YM.needsLights && YM.lightsStateVersion !== Ki.state.version || YM.outputEncoding !== lM || R.isInstancedMesh && YM.instancing === !1 || !R.isInstancedMesh && YM.instancing === !0 || R.isSkinnedMesh && YM.skinning === !1 || !R.isSkinnedMesh && YM.skinning === !0 || YM.envMap !== hM || m.fog === !0 && YM.fog !== jM || YM.numClippingPlanes !== void 0 && (YM.numClippingPlanes !== o.numPlanes || YM.numIntersection !== o.numIntersection) || YM.vertexAlphas !== UM || YM.vertexTangents !== dM || YM.morphTargets !== vM || YM.morphNormals !== KM || YM.morphColors !== oD || YM.toneMapping !== it || rM.isWebGL2 === !0 && YM.morphTargetsCount !== RM) && (JM = !0) : (JM = !0, YM.__version = m.version);
    let St = YM.currentProgram;
    JM === !0 && (St = UD(m, k, R));
    let dz = !1, XN = !1, Ri = !1;
    const TD = St.getUniforms(), Zt = YM.uniforms;
    if (nM.useProgram(St.program) && (dz = !0, XN = !0, Ri = !0), m.id !== C && (C = m.id, XN = !0), dz || x !== O) {
      if (TD.setValue(v, "projectionMatrix", O.projectionMatrix), rM.logarithmicDepthBuffer && TD.setValue(
        v,
        "logDepthBufFC",
        2 / (Math.log(O.far + 1) / Math.LN2)
      ), x !== O && (x = O, XN = !0, Ri = !0), m.isShaderMaterial || m.isMeshPhongMaterial || m.isMeshToonMaterial || m.isMeshStandardMaterial || m.envMap) {
        const CD = TD.map.cameraPosition;
        CD !== void 0 && CD.setValue(
          v,
          V.setFromMatrixPosition(O.matrixWorld)
        );
      }
      (m.isMeshPhongMaterial || m.isMeshToonMaterial || m.isMeshLambertMaterial || m.isMeshBasicMaterial || m.isMeshStandardMaterial || m.isShaderMaterial) && TD.setValue(v, "isOrthographic", O.isOrthographicCamera === !0), (m.isMeshPhongMaterial || m.isMeshToonMaterial || m.isMeshLambertMaterial || m.isMeshBasicMaterial || m.isMeshStandardMaterial || m.isShaderMaterial || m.isShadowMaterial || R.isSkinnedMesh) && TD.setValue(v, "viewMatrix", O.matrixWorldInverse);
    }
    if (R.isSkinnedMesh) {
      TD.setOptional(v, R, "bindMatrix"), TD.setOptional(v, R, "bindMatrixInverse");
      const CD = R.skeleton;
      CD && (rM.floatVertexTextures ? (CD.boneTexture === null && CD.computeBoneTexture(), TD.setValue(v, "boneTexture", CD.boneTexture, CM), TD.setValue(v, "boneTextureSize", CD.boneTextureSize)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
    }
    const Pi = b.morphAttributes;
    if ((Pi.position !== void 0 || Pi.normal !== void 0 || Pi.color !== void 0 && rM.isWebGL2 === !0) && DM.update(R, b, m, St), (XN || YM.receiveShadow !== R.receiveShadow) && (YM.receiveShadow = R.receiveShadow, TD.setValue(v, "receiveShadow", R.receiveShadow)), m.isMeshGouraudMaterial && m.envMap !== null && (Zt.envMap.value = hM, Zt.flipEnvMap.value = hM.isCubeTexture && hM.isRenderTargetTexture === !1 ? -1 : 1), XN && (TD.setValue(v, "toneMappingExposure", r.toneMappingExposure), YM.needsLights && UT(Zt, Ri), jM && m.fog === !0 && Nt.refreshFogUniforms(Zt, jM), Nt.refreshMaterialUniforms(Zt, m, P, p, $), Ei.upload(v, YM.uniformsList, Zt, CM)), m.isShaderMaterial && m.uniformsNeedUpdate === !0 && (Ei.upload(v, YM.uniformsList, Zt, CM), m.uniformsNeedUpdate = !1), m.isSpriteMaterial && TD.setValue(v, "center", R.center), TD.setValue(v, "modelViewMatrix", R.modelViewMatrix), TD.setValue(v, "normalMatrix", R.normalMatrix), TD.setValue(v, "modelMatrix", R.matrixWorld), m.isShaderMaterial || m.isRawShaderMaterial) {
      const CD = m.uniformsGroups;
      for (let Fi = 0, QT = CD.length; Fi < QT; Fi++)
        if (rM.isWebGL2) {
          const vz = CD[Fi];
          yM.update(vz, St), yM.bind(vz, St);
        } else
          console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
    }
    return St;
  }
  function UT(O, k) {
    O.ambientLightColor.needsUpdate = k, O.lightProbe.needsUpdate = k, O.directionalLights.needsUpdate = k, O.directionalLightShadows.needsUpdate = k, O.pointLights.needsUpdate = k, O.pointLightShadows.needsUpdate = k, O.spotLights.needsUpdate = k, O.spotLightShadows.needsUpdate = k, O.rectAreaLights.needsUpdate = k, O.hemisphereLights.needsUpdate = k;
  }
  function fT(O) {
    return O.isMeshLambertMaterial || O.isMeshToonMaterial || O.isMeshPhongMaterial || O.isMeshStandardMaterial || O.isShadowMaterial || O.isShaderMaterial && O.lights === !0;
  }
  this.getActiveCubeFace = function() {
    return y;
  }, this.getActiveMipmapLevel = function() {
    return w;
  }, this.getRenderTarget = function() {
    return a;
  }, this.setRenderTargetTextures = function(O, k, b) {
    OM.get(O.texture).__webglTexture = k, OM.get(O.depthTexture).__webglTexture = b;
    const m = OM.get(O);
    m.__hasExternalTextures = !0, m.__hasExternalTextures && (m.__autoAllocateDepthBuffer = b === void 0, m.__autoAllocateDepthBuffer || sM.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), m.__useRenderToTexture = !1));
  }, this.setRenderTargetFramebuffer = function(O, k) {
    const b = OM.get(O);
    b.__webglFramebuffer = k, b.__useDefaultFramebuffer = k === void 0;
  }, this.setRenderTarget = function(O, k = 0, b = 0) {
    a = O, y = k, w = b;
    let m = !0, R = null, jM = !1, wM = !1;
    if (O) {
      const hM = OM.get(O);
      hM.__useDefaultFramebuffer !== void 0 ? (nM.bindFramebuffer(v.FRAMEBUFFER, null), m = !1) : hM.__webglFramebuffer === void 0 ? CM.setupRenderTarget(O) : hM.__hasExternalTextures && CM.rebindTextures(O, OM.get(O.texture).__webglTexture, OM.get(O.depthTexture).__webglTexture);
      const UM = O.texture;
      (UM.isData3DTexture || UM.isDataArrayTexture || UM.isCompressedArrayTexture) && (wM = !0);
      const dM = OM.get(O).__webglFramebuffer;
      O.isWebGLCubeRenderTarget ? (R = dM[k], jM = !0) : rM.isWebGL2 && O.samples > 0 && CM.useMultisampledRTT(O) === !1 ? R = OM.get(O).__webglMultisampledFramebuffer : R = dM, l.copy(O.viewport), d.copy(O.scissor), L = O.scissorTest;
    } else
      l.copy(U).multiplyScalar(P).floor(), d.copy(Z).multiplyScalar(P).floor(), L = W;
    if (nM.bindFramebuffer(v.FRAMEBUFFER, R) && rM.drawBuffers && m && nM.drawBuffers(O, R), nM.viewport(l), nM.scissor(d), nM.setScissorTest(L), jM) {
      const hM = OM.get(O.texture);
      v.framebufferTexture2D(v.FRAMEBUFFER, v.COLOR_ATTACHMENT0, v.TEXTURE_CUBE_MAP_POSITIVE_X + k, hM.__webglTexture, b);
    } else if (wM) {
      const hM = OM.get(O.texture), UM = k || 0;
      v.framebufferTextureLayer(v.FRAMEBUFFER, v.COLOR_ATTACHMENT0, hM.__webglTexture, b || 0, UM);
    }
    C = -1;
  }, this.readRenderTargetPixels = function(O, k, b, m, R, jM, wM) {
    if (!(O && O.isWebGLRenderTarget)) {
      console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      return;
    }
    let lM = OM.get(O).__webglFramebuffer;
    if (O.isWebGLCubeRenderTarget && wM !== void 0 && (lM = lM[wM]), lM) {
      nM.bindFramebuffer(v.FRAMEBUFFER, lM);
      try {
        const hM = O.texture, UM = hM.format, dM = hM.type;
        if (UM !== VD && AM.convert(UM) !== v.getParameter(v.IMPLEMENTATION_COLOR_READ_FORMAT)) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
          return;
        }
        const vM = dM === oe && (sM.has("EXT_color_buffer_half_float") || rM.isWebGL2 && sM.has("EXT_color_buffer_float"));
        if (dM !== DN && AM.convert(dM) !== v.getParameter(v.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
        !(dM === Wt && (rM.isWebGL2 || sM.has("OES_texture_float") || sM.has("WEBGL_color_buffer_float"))) && // Chrome Mac >= 52 and Firefox
        !vM) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
          return;
        }
        k >= 0 && k <= O.width - m && b >= 0 && b <= O.height - R && v.readPixels(k, b, m, R, AM.convert(UM), AM.convert(dM), jM);
      } finally {
        const hM = a !== null ? OM.get(a).__webglFramebuffer : null;
        nM.bindFramebuffer(v.FRAMEBUFFER, hM);
      }
    }
  }, this.copyFramebufferToTexture = function(O, k, b = 0) {
    const m = Math.pow(2, -b), R = Math.floor(k.image.width * m), jM = Math.floor(k.image.height * m);
    CM.setTexture2D(k, 0), v.copyTexSubImage2D(v.TEXTURE_2D, b, 0, 0, O.x, O.y, R, jM), nM.unbindTexture();
  }, this.copyTextureToTexture = function(O, k, b, m = 0) {
    const R = k.image.width, jM = k.image.height, wM = AM.convert(b.format), lM = AM.convert(b.type);
    CM.setTexture2D(b, 0), v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL, b.flipY), v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL, b.premultiplyAlpha), v.pixelStorei(v.UNPACK_ALIGNMENT, b.unpackAlignment), k.isDataTexture ? v.texSubImage2D(v.TEXTURE_2D, m, O.x, O.y, R, jM, wM, lM, k.image.data) : k.isCompressedTexture ? v.compressedTexSubImage2D(v.TEXTURE_2D, m, O.x, O.y, k.mipmaps[0].width, k.mipmaps[0].height, wM, k.mipmaps[0].data) : v.texSubImage2D(v.TEXTURE_2D, m, O.x, O.y, wM, lM, k.image), m === 0 && b.generateMipmaps && v.generateMipmap(v.TEXTURE_2D), nM.unbindTexture();
  }, this.copyTextureToTexture3D = function(O, k, b, m, R = 0) {
    if (r.isWebGL1Renderer) {
      console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
      return;
    }
    const jM = O.max.x - O.min.x + 1, wM = O.max.y - O.min.y + 1, lM = O.max.z - O.min.z + 1, hM = AM.convert(m.format), UM = AM.convert(m.type);
    let dM;
    if (m.isData3DTexture)
      CM.setTexture3D(m, 0), dM = v.TEXTURE_3D;
    else if (m.isDataArrayTexture)
      CM.setTexture2DArray(m, 0), dM = v.TEXTURE_2D_ARRAY;
    else {
      console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
      return;
    }
    v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL, m.flipY), v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL, m.premultiplyAlpha), v.pixelStorei(v.UNPACK_ALIGNMENT, m.unpackAlignment);
    const vM = v.getParameter(v.UNPACK_ROW_LENGTH), KM = v.getParameter(v.UNPACK_IMAGE_HEIGHT), oD = v.getParameter(v.UNPACK_SKIP_PIXELS), it = v.getParameter(v.UNPACK_SKIP_ROWS), kt = v.getParameter(v.UNPACK_SKIP_IMAGES), RM = b.isCompressedTexture ? b.mipmaps[0] : b.image;
    v.pixelStorei(v.UNPACK_ROW_LENGTH, RM.width), v.pixelStorei(v.UNPACK_IMAGE_HEIGHT, RM.height), v.pixelStorei(v.UNPACK_SKIP_PIXELS, O.min.x), v.pixelStorei(v.UNPACK_SKIP_ROWS, O.min.y), v.pixelStorei(v.UNPACK_SKIP_IMAGES, O.min.z), b.isDataTexture || b.isData3DTexture ? v.texSubImage3D(dM, R, k.x, k.y, k.z, jM, wM, lM, hM, UM, RM.data) : b.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), v.compressedTexSubImage3D(dM, R, k.x, k.y, k.z, jM, wM, lM, hM, RM.data)) : v.texSubImage3D(dM, R, k.x, k.y, k.z, jM, wM, lM, hM, UM, RM), v.pixelStorei(v.UNPACK_ROW_LENGTH, vM), v.pixelStorei(v.UNPACK_IMAGE_HEIGHT, KM), v.pixelStorei(v.UNPACK_SKIP_PIXELS, oD), v.pixelStorei(v.UNPACK_SKIP_ROWS, it), v.pixelStorei(v.UNPACK_SKIP_IMAGES, kt), R === 0 && m.generateMipmaps && v.generateMipmap(dM), nM.unbindTexture();
  }, this.initTexture = function(O) {
    O.isCubeTexture ? CM.setTextureCube(O, 0) : O.isData3DTexture ? CM.setTexture3D(O, 0) : O.isDataArrayTexture || O.isCompressedArrayTexture ? CM.setTexture2DArray(O, 0) : CM.setTexture2D(O, 0), nM.unbindTexture();
  }, this.resetState = function() {
    y = 0, w = 0, a = null, nM.reset(), G.reset();
  }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
}
class cy extends aD {
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
  // @deprecated
  get autoUpdate() {
    return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."), this.matrixWorldAutoUpdate;
  }
  set autoUpdate(M) {
    console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."), this.matrixWorldAutoUpdate = M;
  }
}
class jy extends WD {
  constructor(M, D, t, N, i, z, A, I, n) {
    super(M, D, t, N, i, z, A, I, n), this.isVideoTexture = !0, this.minFilter = z !== void 0 ? z : yD, this.magFilter = i !== void 0 ? i : yD, this.generateMipmaps = !1;
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
const oT = "149", uz = 0, yy = 1, Xn = 1, ay = 100, oy = 204, Cy = 205, Ly = 3, CT = 0, LT = 300, qn = 1e3, $e = 1001, $n = 1002, wy = 1006, xy = 1008, Oy = 1009, Ey = 1023, ly = 3e3, hy = 0, yt = "srgb", gz = "srgb-linear", hA = 7680, dy = 519, Jn = 35044;
class Si {
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
    const N = this._listeners[M];
    if (N !== void 0) {
      const i = N.indexOf(D);
      i !== -1 && N.splice(i, 1);
    }
  }
  dispatchEvent(M) {
    if (this._listeners === void 0)
      return;
    const t = this._listeners[M.type];
    if (t !== void 0) {
      M.target = this;
      const N = t.slice(0);
      for (let i = 0, z = N.length; i < z; i++)
        N[i].call(this, M);
      M.target = null;
    }
  }
}
const zD = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function Ye() {
  const e = Math.random() * 4294967295 | 0, M = Math.random() * 4294967295 | 0, D = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0;
  return (zD[e & 255] + zD[e >> 8 & 255] + zD[e >> 16 & 255] + zD[e >> 24 & 255] + "-" + zD[M & 255] + zD[M >> 8 & 255] + "-" + zD[M >> 16 & 15 | 64] + zD[M >> 24 & 255] + "-" + zD[D & 63 | 128] + zD[D >> 8 & 255] + "-" + zD[D >> 16 & 255] + zD[D >> 24 & 255] + zD[t & 255] + zD[t >> 8 & 255] + zD[t >> 16 & 255] + zD[t >> 24 & 255]).toLowerCase();
}
function hD(e, M, D) {
  return Math.max(M, Math.min(D, e));
}
function vy(e, M) {
  return (e % M + M) % M;
}
function dA(e, M, D) {
  return (1 - D) * e + D * M;
}
function Je(e, M) {
  switch (M.constructor) {
    case Float32Array:
      return e;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function OD(e, M) {
  switch (M.constructor) {
    case Float32Array:
      return e;
    case Uint16Array:
      return Math.round(e * 65535);
    case Uint8Array:
      return Math.round(e * 255);
    case Int16Array:
      return Math.round(e * 32767);
    case Int8Array:
      return Math.round(e * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class jD {
  constructor(M = 0, D = 0) {
    jD.prototype.isVector2 = !0, this.x = M, this.y = D;
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
    const D = this.x, t = this.y, N = M.elements;
    return this.x = N[0] * D + N[3] * t + N[6], this.y = N[1] * D + N[4] * t + N[7], this;
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
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this;
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
    const t = Math.cos(D), N = Math.sin(D), i = this.x - M.x, z = this.y - M.y;
    return this.x = i * t - z * N + M.x, this.y = i * N + z * t + M.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class WN {
  constructor() {
    WN.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ];
  }
  set(M, D, t, N, i, z, A, I, n) {
    const T = this.elements;
    return T[0] = M, T[1] = N, T[2] = A, T[3] = D, T[4] = i, T[5] = I, T[6] = t, T[7] = z, T[8] = n, this;
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
    const t = M.elements, N = D.elements, i = this.elements, z = t[0], A = t[3], I = t[6], n = t[1], T = t[4], u = t[7], g = t[2], s = t[5], j = t[8], r = N[0], c = N[3], y = N[6], w = N[1], a = N[4], C = N[7], x = N[2], l = N[5], d = N[8];
    return i[0] = z * r + A * w + I * x, i[3] = z * c + A * a + I * l, i[6] = z * y + A * C + I * d, i[1] = n * r + T * w + u * x, i[4] = n * c + T * a + u * l, i[7] = n * y + T * C + u * d, i[2] = g * r + s * w + j * x, i[5] = g * c + s * a + j * l, i[8] = g * y + s * C + j * d, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[3] *= M, D[6] *= M, D[1] *= M, D[4] *= M, D[7] *= M, D[2] *= M, D[5] *= M, D[8] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], t = M[1], N = M[2], i = M[3], z = M[4], A = M[5], I = M[6], n = M[7], T = M[8];
    return D * z * T - D * A * n - t * i * T + t * A * I + N * i * n - N * z * I;
  }
  invert() {
    const M = this.elements, D = M[0], t = M[1], N = M[2], i = M[3], z = M[4], A = M[5], I = M[6], n = M[7], T = M[8], u = T * z - A * n, g = A * I - T * i, s = n * i - z * I, j = D * u + t * g + N * s;
    if (j === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const r = 1 / j;
    return M[0] = u * r, M[1] = (N * n - T * t) * r, M[2] = (A * t - N * z) * r, M[3] = g * r, M[4] = (T * D - N * I) * r, M[5] = (N * i - A * D) * r, M[6] = s * r, M[7] = (t * I - n * D) * r, M[8] = (z * D - t * i) * r, this;
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
  setUvTransform(M, D, t, N, i, z, A) {
    const I = Math.cos(i), n = Math.sin(i);
    return this.set(
      t * I,
      t * n,
      -t * (I * z + n * A) + z + M,
      -N * n,
      N * I,
      -N * (-n * z + I * A) + A + D,
      0,
      0,
      1
    ), this;
  }
  //
  scale(M, D) {
    return this.premultiply(vA.makeScale(M, D)), this;
  }
  rotate(M) {
    return this.premultiply(vA.makeRotation(-M)), this;
  }
  translate(M, D) {
    return this.premultiply(vA.makeTranslation(M, D)), this;
  }
  // for 2D Transforms
  makeTranslation(M, D) {
    return this.set(
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
    for (let N = 0; N < 9; N++)
      if (D[N] !== t[N])
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
const vA = /* @__PURE__ */ new WN();
function Yy(e) {
  for (let M = e.length - 1; M >= 0; --M)
    if (e[M] >= 65535)
      return !0;
  return !1;
}
function MI(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function Jt(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function li(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
const YA = {
  [yt]: { [gz]: Jt },
  [gz]: { [yt]: li }
}, gD = {
  legacyMode: !0,
  get workingColorSpace() {
    return gz;
  },
  set workingColorSpace(e) {
    console.warn("THREE.ColorManagement: .workingColorSpace is readonly.");
  },
  convert: function(e, M, D) {
    if (this.legacyMode || M === D || !M || !D)
      return e;
    if (YA[M] && YA[M][D] !== void 0) {
      const t = YA[M][D];
      return e.r = t(e.r), e.g = t(e.g), e.b = t(e.b), e;
    }
    throw new Error("Unsupported color space conversion.");
  },
  fromWorkingColorSpace: function(e, M) {
    return this.convert(e, this.workingColorSpace, M);
  },
  toWorkingColorSpace: function(e, M) {
    return this.convert(e, M, this.workingColorSpace);
  }
}, wT = {
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
}, HM = { r: 0, g: 0, b: 0 }, PD = { h: 0, s: 0, l: 0 }, Mi = { h: 0, s: 0, l: 0 };
function pA(e, M, D) {
  return D < 0 && (D += 1), D > 1 && (D -= 1), D < 1 / 6 ? e + (M - e) * 6 * D : D < 1 / 2 ? M : D < 2 / 3 ? e + (M - e) * 6 * (2 / 3 - D) : e;
}
function Di(e, M) {
  return M.r = e.r, M.g = e.g, M.b = e.b, M;
}
class Ut {
  constructor(M, D, t) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, D === void 0 && t === void 0 ? this.set(M) : this.setRGB(M, D, t);
  }
  set(M) {
    return M && M.isColor ? this.copy(M) : typeof M == "number" ? this.setHex(M) : typeof M == "string" && this.setStyle(M), this;
  }
  setScalar(M) {
    return this.r = M, this.g = M, this.b = M, this;
  }
  setHex(M, D = yt) {
    return M = Math.floor(M), this.r = (M >> 16 & 255) / 255, this.g = (M >> 8 & 255) / 255, this.b = (M & 255) / 255, gD.toWorkingColorSpace(this, D), this;
  }
  setRGB(M, D, t, N = gD.workingColorSpace) {
    return this.r = M, this.g = D, this.b = t, gD.toWorkingColorSpace(this, N), this;
  }
  setHSL(M, D, t, N = gD.workingColorSpace) {
    if (M = vy(M, 1), D = hD(D, 0, 1), t = hD(t, 0, 1), D === 0)
      this.r = this.g = this.b = t;
    else {
      const i = t <= 0.5 ? t * (1 + D) : t + D - t * D, z = 2 * t - i;
      this.r = pA(z, i, M + 1 / 3), this.g = pA(z, i, M), this.b = pA(z, i, M - 1 / 3);
    }
    return gD.toWorkingColorSpace(this, N), this;
  }
  setStyle(M, D = yt) {
    function t(i) {
      i !== void 0 && parseFloat(i) < 1 && console.warn("THREE.Color: Alpha component of " + M + " will be ignored.");
    }
    let N;
    if (N = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(M)) {
      let i;
      const z = N[1], A = N[2];
      switch (z) {
        case "rgb":
        case "rgba":
          if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return this.r = Math.min(255, parseInt(i[1], 10)) / 255, this.g = Math.min(255, parseInt(i[2], 10)) / 255, this.b = Math.min(255, parseInt(i[3], 10)) / 255, gD.toWorkingColorSpace(this, D), t(i[4]), this;
          if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return this.r = Math.min(100, parseInt(i[1], 10)) / 100, this.g = Math.min(100, parseInt(i[2], 10)) / 100, this.b = Math.min(100, parseInt(i[3], 10)) / 100, gD.toWorkingColorSpace(this, D), t(i[4]), this;
          break;
        case "hsl":
        case "hsla":
          if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A)) {
            const I = parseFloat(i[1]) / 360, n = parseFloat(i[2]) / 100, T = parseFloat(i[3]) / 100;
            return t(i[4]), this.setHSL(I, n, T, D);
          }
          break;
      }
    } else if (N = /^\#([A-Fa-f\d]+)$/.exec(M)) {
      const i = N[1], z = i.length;
      if (z === 3)
        return this.r = parseInt(i.charAt(0) + i.charAt(0), 16) / 255, this.g = parseInt(i.charAt(1) + i.charAt(1), 16) / 255, this.b = parseInt(i.charAt(2) + i.charAt(2), 16) / 255, gD.toWorkingColorSpace(this, D), this;
      if (z === 6)
        return this.r = parseInt(i.charAt(0) + i.charAt(1), 16) / 255, this.g = parseInt(i.charAt(2) + i.charAt(3), 16) / 255, this.b = parseInt(i.charAt(4) + i.charAt(5), 16) / 255, gD.toWorkingColorSpace(this, D), this;
    }
    return M && M.length > 0 ? this.setColorName(M, D) : this;
  }
  setColorName(M, D = yt) {
    const t = wT[M.toLowerCase()];
    return t !== void 0 ? this.setHex(t, D) : console.warn("THREE.Color: Unknown color " + M), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(M) {
    return this.r = M.r, this.g = M.g, this.b = M.b, this;
  }
  copySRGBToLinear(M) {
    return this.r = Jt(M.r), this.g = Jt(M.g), this.b = Jt(M.b), this;
  }
  copyLinearToSRGB(M) {
    return this.r = li(M.r), this.g = li(M.g), this.b = li(M.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(M = yt) {
    return gD.fromWorkingColorSpace(Di(this, HM), M), hD(HM.r * 255, 0, 255) << 16 ^ hD(HM.g * 255, 0, 255) << 8 ^ hD(HM.b * 255, 0, 255) << 0;
  }
  getHexString(M = yt) {
    return ("000000" + this.getHex(M).toString(16)).slice(-6);
  }
  getHSL(M, D = gD.workingColorSpace) {
    gD.fromWorkingColorSpace(Di(this, HM), D);
    const t = HM.r, N = HM.g, i = HM.b, z = Math.max(t, N, i), A = Math.min(t, N, i);
    let I, n;
    const T = (A + z) / 2;
    if (A === z)
      I = 0, n = 0;
    else {
      const u = z - A;
      switch (n = T <= 0.5 ? u / (z + A) : u / (2 - z - A), z) {
        case t:
          I = (N - i) / u + (N < i ? 6 : 0);
          break;
        case N:
          I = (i - t) / u + 2;
          break;
        case i:
          I = (t - N) / u + 4;
          break;
      }
      I /= 6;
    }
    return M.h = I, M.s = n, M.l = T, M;
  }
  getRGB(M, D = gD.workingColorSpace) {
    return gD.fromWorkingColorSpace(Di(this, HM), D), M.r = HM.r, M.g = HM.g, M.b = HM.b, M;
  }
  getStyle(M = yt) {
    return gD.fromWorkingColorSpace(Di(this, HM), M), M !== yt ? `color(${M} ${HM.r} ${HM.g} ${HM.b})` : `rgb(${HM.r * 255 | 0},${HM.g * 255 | 0},${HM.b * 255 | 0})`;
  }
  offsetHSL(M, D, t) {
    return this.getHSL(PD), PD.h += M, PD.s += D, PD.l += t, this.setHSL(PD.h, PD.s, PD.l), this;
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
    this.getHSL(PD), M.getHSL(Mi);
    const t = dA(PD.h, Mi.h, D), N = dA(PD.s, Mi.s, D), i = dA(PD.l, Mi.l, D);
    return this.setHSL(t, N, i), this;
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
Ut.NAMES = wT;
let wN;
class py {
  static getDataURL(M) {
    if (/^data:/i.test(M.src) || typeof HTMLCanvasElement > "u")
      return M.src;
    let D;
    if (M instanceof HTMLCanvasElement)
      D = M;
    else {
      wN === void 0 && (wN = MI("canvas")), wN.width = M.width, wN.height = M.height;
      const t = wN.getContext("2d");
      M instanceof ImageData ? t.putImageData(M, 0, 0) : t.drawImage(M, 0, 0, M.width, M.height), D = wN;
    }
    return D.width > 2048 || D.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", M), D.toDataURL("image/jpeg", 0.6)) : D.toDataURL("image/png");
  }
  static sRGBToLinear(M) {
    if (typeof HTMLImageElement < "u" && M instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && M instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && M instanceof ImageBitmap) {
      const D = MI("canvas");
      D.width = M.width, D.height = M.height;
      const t = D.getContext("2d");
      t.drawImage(M, 0, 0, M.width, M.height);
      const N = t.getImageData(0, 0, M.width, M.height), i = N.data;
      for (let z = 0; z < i.length; z++)
        i[z] = Jt(i[z] / 255) * 255;
      return t.putImageData(N, 0, 0), D;
    } else if (M.data) {
      const D = M.data.slice(0);
      for (let t = 0; t < D.length; t++)
        D instanceof Uint8Array || D instanceof Uint8ClampedArray ? D[t] = Math.floor(Jt(D[t] / 255) * 255) : D[t] = Jt(D[t]);
      return {
        data: D,
        width: M.width,
        height: M.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), M;
  }
}
class Uy {
  constructor(M = null) {
    this.isSource = !0, this.uuid = Ye(), this.data = M, this.version = 0;
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
    }, N = this.data;
    if (N !== null) {
      let i;
      if (Array.isArray(N)) {
        i = [];
        for (let z = 0, A = N.length; z < A; z++)
          N[z].isDataTexture ? i.push(UA(N[z].image)) : i.push(UA(N[z]));
      } else
        i = UA(N);
      t.url = i;
    }
    return D || (M.images[this.uuid] = t), t;
  }
}
function UA(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? py.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let fy = 0;
class MN extends Si {
  constructor(M = MN.DEFAULT_IMAGE, D = MN.DEFAULT_MAPPING, t = $e, N = $e, i = wy, z = xy, A = Ey, I = Oy, n = MN.DEFAULT_ANISOTROPY, T = ly) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: fy++ }), this.uuid = Ye(), this.name = "", this.source = new Uy(M), this.mipmaps = [], this.mapping = D, this.wrapS = t, this.wrapT = N, this.magFilter = i, this.minFilter = z, this.anisotropy = n, this.format = A, this.internalFormat = null, this.type = I, this.offset = new jD(0, 0), this.repeat = new jD(1, 1), this.center = new jD(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new WN(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = T, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(M) {
    this.source.data = M;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.name = M.name, this.source = M.source, this.mipmaps = M.mipmaps.slice(0), this.mapping = M.mapping, this.wrapS = M.wrapS, this.wrapT = M.wrapT, this.magFilter = M.magFilter, this.minFilter = M.minFilter, this.anisotropy = M.anisotropy, this.format = M.format, this.internalFormat = M.internalFormat, this.type = M.type, this.offset.copy(M.offset), this.repeat.copy(M.repeat), this.center.copy(M.center), this.rotation = M.rotation, this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrix.copy(M.matrix), this.generateMipmaps = M.generateMipmaps, this.premultiplyAlpha = M.premultiplyAlpha, this.flipY = M.flipY, this.unpackAlignment = M.unpackAlignment, this.encoding = M.encoding, this.userData = JSON.parse(JSON.stringify(M.userData)), this.needsUpdate = !0, this;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.textures[this.uuid] !== void 0)
      return M.textures[this.uuid];
    const t = {
      metadata: {
        version: 4.5,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(M).uuid,
      mapping: this.mapping,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      type: this.type,
      encoding: this.encoding,
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
    if (this.mapping !== LT)
      return M;
    if (M.applyMatrix3(this.matrix), M.x < 0 || M.x > 1)
      switch (this.wrapS) {
        case qn:
          M.x = M.x - Math.floor(M.x);
          break;
        case $e:
          M.x = M.x < 0 ? 0 : 1;
          break;
        case $n:
          Math.abs(Math.floor(M.x) % 2) === 1 ? M.x = Math.ceil(M.x) - M.x : M.x = M.x - Math.floor(M.x);
          break;
      }
    if (M.y < 0 || M.y > 1)
      switch (this.wrapT) {
        case qn:
          M.y = M.y - Math.floor(M.y);
          break;
        case $e:
          M.y = M.y < 0 ? 0 : 1;
          break;
        case $n:
          Math.abs(Math.floor(M.y) % 2) === 1 ? M.y = Math.ceil(M.y) - M.y : M.y = M.y - Math.floor(M.y);
          break;
      }
    return this.flipY && (M.y = 1 - M.y), M;
  }
  set needsUpdate(M) {
    M === !0 && (this.version++, this.source.needsUpdate = !0);
  }
}
MN.DEFAULT_IMAGE = null;
MN.DEFAULT_MAPPING = LT;
MN.DEFAULT_ANISOTROPY = 1;
class pe {
  constructor(M = 0, D = 0, t = 0, N = 1) {
    this.isQuaternion = !0, this._x = M, this._y = D, this._z = t, this._w = N;
  }
  static slerpFlat(M, D, t, N, i, z, A) {
    let I = t[N + 0], n = t[N + 1], T = t[N + 2], u = t[N + 3];
    const g = i[z + 0], s = i[z + 1], j = i[z + 2], r = i[z + 3];
    if (A === 0) {
      M[D + 0] = I, M[D + 1] = n, M[D + 2] = T, M[D + 3] = u;
      return;
    }
    if (A === 1) {
      M[D + 0] = g, M[D + 1] = s, M[D + 2] = j, M[D + 3] = r;
      return;
    }
    if (u !== r || I !== g || n !== s || T !== j) {
      let c = 1 - A;
      const y = I * g + n * s + T * j + u * r, w = y >= 0 ? 1 : -1, a = 1 - y * y;
      if (a > Number.EPSILON) {
        const x = Math.sqrt(a), l = Math.atan2(x, y * w);
        c = Math.sin(c * l) / x, A = Math.sin(A * l) / x;
      }
      const C = A * w;
      if (I = I * c + g * C, n = n * c + s * C, T = T * c + j * C, u = u * c + r * C, c === 1 - A) {
        const x = 1 / Math.sqrt(I * I + n * n + T * T + u * u);
        I *= x, n *= x, T *= x, u *= x;
      }
    }
    M[D] = I, M[D + 1] = n, M[D + 2] = T, M[D + 3] = u;
  }
  static multiplyQuaternionsFlat(M, D, t, N, i, z) {
    const A = t[N], I = t[N + 1], n = t[N + 2], T = t[N + 3], u = i[z], g = i[z + 1], s = i[z + 2], j = i[z + 3];
    return M[D] = A * j + T * u + I * s - n * g, M[D + 1] = I * j + T * g + n * u - A * s, M[D + 2] = n * j + T * s + A * g - I * u, M[D + 3] = T * j - A * u - I * g - n * s, M;
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
  set(M, D, t, N) {
    return this._x = M, this._y = D, this._z = t, this._w = N, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(M) {
    return this._x = M.x, this._y = M.y, this._z = M.z, this._w = M.w, this._onChangeCallback(), this;
  }
  setFromEuler(M, D) {
    const t = M._x, N = M._y, i = M._z, z = M._order, A = Math.cos, I = Math.sin, n = A(t / 2), T = A(N / 2), u = A(i / 2), g = I(t / 2), s = I(N / 2), j = I(i / 2);
    switch (z) {
      case "XYZ":
        this._x = g * T * u + n * s * j, this._y = n * s * u - g * T * j, this._z = n * T * j + g * s * u, this._w = n * T * u - g * s * j;
        break;
      case "YXZ":
        this._x = g * T * u + n * s * j, this._y = n * s * u - g * T * j, this._z = n * T * j - g * s * u, this._w = n * T * u + g * s * j;
        break;
      case "ZXY":
        this._x = g * T * u - n * s * j, this._y = n * s * u + g * T * j, this._z = n * T * j + g * s * u, this._w = n * T * u - g * s * j;
        break;
      case "ZYX":
        this._x = g * T * u - n * s * j, this._y = n * s * u + g * T * j, this._z = n * T * j - g * s * u, this._w = n * T * u + g * s * j;
        break;
      case "YZX":
        this._x = g * T * u + n * s * j, this._y = n * s * u + g * T * j, this._z = n * T * j - g * s * u, this._w = n * T * u - g * s * j;
        break;
      case "XZY":
        this._x = g * T * u - n * s * j, this._y = n * s * u - g * T * j, this._z = n * T * j + g * s * u, this._w = n * T * u + g * s * j;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + z);
    }
    return D !== !1 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(M, D) {
    const t = D / 2, N = Math.sin(t);
    return this._x = M.x * N, this._y = M.y * N, this._z = M.z * N, this._w = Math.cos(t), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M) {
    const D = M.elements, t = D[0], N = D[4], i = D[8], z = D[1], A = D[5], I = D[9], n = D[2], T = D[6], u = D[10], g = t + A + u;
    if (g > 0) {
      const s = 0.5 / Math.sqrt(g + 1);
      this._w = 0.25 / s, this._x = (T - I) * s, this._y = (i - n) * s, this._z = (z - N) * s;
    } else if (t > A && t > u) {
      const s = 2 * Math.sqrt(1 + t - A - u);
      this._w = (T - I) / s, this._x = 0.25 * s, this._y = (N + z) / s, this._z = (i + n) / s;
    } else if (A > u) {
      const s = 2 * Math.sqrt(1 + A - t - u);
      this._w = (i - n) / s, this._x = (N + z) / s, this._y = 0.25 * s, this._z = (I + T) / s;
    } else {
      const s = 2 * Math.sqrt(1 + u - t - A);
      this._w = (z - N) / s, this._x = (i + n) / s, this._y = (I + T) / s, this._z = 0.25 * s;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(M, D) {
    let t = M.dot(D) + 1;
    return t < Number.EPSILON ? (t = 0, Math.abs(M.x) > Math.abs(M.z) ? (this._x = -M.y, this._y = M.x, this._z = 0, this._w = t) : (this._x = 0, this._y = -M.z, this._z = M.y, this._w = t)) : (this._x = M.y * D.z - M.z * D.y, this._y = M.z * D.x - M.x * D.z, this._z = M.x * D.y - M.y * D.x, this._w = t), this.normalize();
  }
  angleTo(M) {
    return 2 * Math.acos(Math.abs(hD(this.dot(M), -1, 1)));
  }
  rotateTowards(M, D) {
    const t = this.angleTo(M);
    if (t === 0)
      return this;
    const N = Math.min(1, D / t);
    return this.slerp(M, N), this;
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
    const t = M._x, N = M._y, i = M._z, z = M._w, A = D._x, I = D._y, n = D._z, T = D._w;
    return this._x = t * T + z * A + N * n - i * I, this._y = N * T + z * I + i * A - t * n, this._z = i * T + z * n + t * I - N * A, this._w = z * T - t * A - N * I - i * n, this._onChangeCallback(), this;
  }
  slerp(M, D) {
    if (D === 0)
      return this;
    if (D === 1)
      return this.copy(M);
    const t = this._x, N = this._y, i = this._z, z = this._w;
    let A = z * M._w + t * M._x + N * M._y + i * M._z;
    if (A < 0 ? (this._w = -M._w, this._x = -M._x, this._y = -M._y, this._z = -M._z, A = -A) : this.copy(M), A >= 1)
      return this._w = z, this._x = t, this._y = N, this._z = i, this;
    const I = 1 - A * A;
    if (I <= Number.EPSILON) {
      const s = 1 - D;
      return this._w = s * z + D * this._w, this._x = s * t + D * this._x, this._y = s * N + D * this._y, this._z = s * i + D * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const n = Math.sqrt(I), T = Math.atan2(n, A), u = Math.sin((1 - D) * T) / n, g = Math.sin(D * T) / n;
    return this._w = z * u + this._w * g, this._x = t * u + this._x * g, this._y = N * u + this._y * g, this._z = i * u + this._z * g, this._onChangeCallback(), this;
  }
  slerpQuaternions(M, D, t) {
    return this.copy(M).slerp(D, t);
  }
  random() {
    const M = Math.random(), D = Math.sqrt(1 - M), t = Math.sqrt(M), N = 2 * Math.PI * Math.random(), i = 2 * Math.PI * Math.random();
    return this.set(
      D * Math.cos(N),
      t * Math.sin(i),
      t * Math.cos(i),
      D * Math.sin(N)
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
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class B {
  constructor(M = 0, D = 0, t = 0) {
    B.prototype.isVector3 = !0, this.x = M, this.y = D, this.z = t;
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
    return this.applyQuaternion(DI.setFromEuler(M));
  }
  applyAxisAngle(M, D) {
    return this.applyQuaternion(DI.setFromAxisAngle(M, D));
  }
  applyMatrix3(M) {
    const D = this.x, t = this.y, N = this.z, i = M.elements;
    return this.x = i[0] * D + i[3] * t + i[6] * N, this.y = i[1] * D + i[4] * t + i[7] * N, this.z = i[2] * D + i[5] * t + i[8] * N, this;
  }
  applyNormalMatrix(M) {
    return this.applyMatrix3(M).normalize();
  }
  applyMatrix4(M) {
    const D = this.x, t = this.y, N = this.z, i = M.elements, z = 1 / (i[3] * D + i[7] * t + i[11] * N + i[15]);
    return this.x = (i[0] * D + i[4] * t + i[8] * N + i[12]) * z, this.y = (i[1] * D + i[5] * t + i[9] * N + i[13]) * z, this.z = (i[2] * D + i[6] * t + i[10] * N + i[14]) * z, this;
  }
  applyQuaternion(M) {
    const D = this.x, t = this.y, N = this.z, i = M.x, z = M.y, A = M.z, I = M.w, n = I * D + z * N - A * t, T = I * t + A * D - i * N, u = I * N + i * t - z * D, g = -i * D - z * t - A * N;
    return this.x = n * I + g * -i + T * -A - u * -z, this.y = T * I + g * -z + u * -i - n * -A, this.z = u * I + g * -A + n * -z - T * -i, this;
  }
  project(M) {
    return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix);
  }
  unproject(M) {
    return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld);
  }
  transformDirection(M) {
    const D = this.x, t = this.y, N = this.z, i = M.elements;
    return this.x = i[0] * D + i[4] * t + i[8] * N, this.y = i[1] * D + i[5] * t + i[9] * N, this.z = i[2] * D + i[6] * t + i[10] * N, this.normalize();
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
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this;
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
    const t = M.x, N = M.y, i = M.z, z = D.x, A = D.y, I = D.z;
    return this.x = N * I - i * A, this.y = i * z - t * I, this.z = t * A - N * z, this;
  }
  projectOnVector(M) {
    const D = M.lengthSq();
    if (D === 0)
      return this.set(0, 0, 0);
    const t = M.dot(this) / D;
    return this.copy(M).multiplyScalar(t);
  }
  projectOnPlane(M) {
    return fA.copy(this).projectOnVector(M), this.sub(fA);
  }
  reflect(M) {
    return this.sub(fA.copy(M).multiplyScalar(2 * this.dot(M)));
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const t = this.dot(M) / D;
    return Math.acos(hD(t, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, t = this.y - M.y, N = this.z - M.z;
    return D * D + t * t + N * N;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y) + Math.abs(this.z - M.z);
  }
  setFromSpherical(M) {
    return this.setFromSphericalCoords(M.radius, M.phi, M.theta);
  }
  setFromSphericalCoords(M, D, t) {
    const N = Math.sin(D) * M;
    return this.x = N * Math.sin(t), this.y = Math.cos(D) * M, this.z = N * Math.cos(t), this;
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
    const D = this.setFromMatrixColumn(M, 0).length(), t = this.setFromMatrixColumn(M, 1).length(), N = this.setFromMatrixColumn(M, 2).length();
    return this.x = D, this.y = t, this.z = N, this;
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
const fA = /* @__PURE__ */ new B(), DI = /* @__PURE__ */ new pe();
class Ue {
  constructor(M = new B(1 / 0, 1 / 0, 1 / 0), D = new B(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = M, this.max = D;
  }
  set(M, D) {
    return this.min.copy(M), this.max.copy(D), this;
  }
  setFromArray(M) {
    let D = 1 / 0, t = 1 / 0, N = 1 / 0, i = -1 / 0, z = -1 / 0, A = -1 / 0;
    for (let I = 0, n = M.length; I < n; I += 3) {
      const T = M[I], u = M[I + 1], g = M[I + 2];
      T < D && (D = T), u < t && (t = u), g < N && (N = g), T > i && (i = T), u > z && (z = u), g > A && (A = g);
    }
    return this.min.set(D, t, N), this.max.set(i, z, A), this;
  }
  setFromBufferAttribute(M) {
    let D = 1 / 0, t = 1 / 0, N = 1 / 0, i = -1 / 0, z = -1 / 0, A = -1 / 0;
    for (let I = 0, n = M.count; I < n; I++) {
      const T = M.getX(I), u = M.getY(I), g = M.getZ(I);
      T < D && (D = T), u < t && (t = u), g < N && (N = g), T > i && (i = T), u > z && (z = u), g > A && (A = g);
    }
    return this.min.set(D, t, N), this.max.set(i, z, A), this;
  }
  setFromPoints(M) {
    this.makeEmpty();
    for (let D = 0, t = M.length; D < t; D++)
      this.expandByPoint(M[D]);
    return this;
  }
  setFromCenterAndSize(M, D) {
    const t = Rt.copy(D).multiplyScalar(0.5);
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
    M.updateWorldMatrix(!1, !1);
    const t = M.geometry;
    if (t !== void 0)
      if (D && t.attributes != null && t.attributes.position !== void 0) {
        const i = t.attributes.position;
        for (let z = 0, A = i.count; z < A; z++)
          Rt.fromBufferAttribute(i, z).applyMatrix4(M.matrixWorld), this.expandByPoint(Rt);
      } else
        t.boundingBox === null && t.computeBoundingBox(), QA.copy(t.boundingBox), QA.applyMatrix4(M.matrixWorld), this.union(QA);
    const N = M.children;
    for (let i = 0, z = N.length; i < z; i++)
      this.expandByObject(N[i], D);
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
    return this.clampPoint(M.center, Rt), Rt.distanceToSquared(M.center) <= M.radius * M.radius;
  }
  intersectsPlane(M) {
    let D, t;
    return M.normal.x > 0 ? (D = M.normal.x * this.min.x, t = M.normal.x * this.max.x) : (D = M.normal.x * this.max.x, t = M.normal.x * this.min.x), M.normal.y > 0 ? (D += M.normal.y * this.min.y, t += M.normal.y * this.max.y) : (D += M.normal.y * this.max.y, t += M.normal.y * this.min.y), M.normal.z > 0 ? (D += M.normal.z * this.min.z, t += M.normal.z * this.max.z) : (D += M.normal.z * this.max.z, t += M.normal.z * this.min.z), D <= -M.constant && t >= -M.constant;
  }
  intersectsTriangle(M) {
    if (this.isEmpty())
      return !1;
    this.getCenter(ee), ti.subVectors(this.max, ee), xN.subVectors(M.a, ee), ON.subVectors(M.b, ee), EN.subVectors(M.c, ee), lt.subVectors(ON, xN), ht.subVectors(EN, ON), Pt.subVectors(xN, EN);
    let D = [
      0,
      -lt.z,
      lt.y,
      0,
      -ht.z,
      ht.y,
      0,
      -Pt.z,
      Pt.y,
      lt.z,
      0,
      -lt.x,
      ht.z,
      0,
      -ht.x,
      Pt.z,
      0,
      -Pt.x,
      -lt.y,
      lt.x,
      0,
      -ht.y,
      ht.x,
      0,
      -Pt.y,
      Pt.x,
      0
    ];
    return !mA(D, xN, ON, EN, ti) || (D = [1, 0, 0, 0, 1, 0, 0, 0, 1], !mA(D, xN, ON, EN, ti)) ? !1 : (Ni.crossVectors(lt, ht), D = [Ni.x, Ni.y, Ni.z], mA(D, xN, ON, EN, ti));
  }
  clampPoint(M, D) {
    return D.copy(M).clamp(this.min, this.max);
  }
  distanceToPoint(M) {
    return Rt.copy(M).clamp(this.min, this.max).sub(M).length();
  }
  getBoundingSphere(M) {
    return this.getCenter(M.center), M.radius = this.getSize(Rt).length() * 0.5, M;
  }
  intersect(M) {
    return this.min.max(M.min), this.max.min(M.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(M) {
    return this.min.min(M.min), this.max.max(M.max), this;
  }
  applyMatrix4(M) {
    return this.isEmpty() ? this : (ut[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(M), ut[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(M), ut[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(M), ut[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(M), ut[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(M), ut[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(M), ut[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(M), ut[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(M), this.setFromPoints(ut), this);
  }
  translate(M) {
    return this.min.add(M), this.max.add(M), this;
  }
  equals(M) {
    return M.min.equals(this.min) && M.max.equals(this.max);
  }
}
const ut = [
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B()
], Rt = /* @__PURE__ */ new B(), QA = /* @__PURE__ */ new Ue(), xN = /* @__PURE__ */ new B(), ON = /* @__PURE__ */ new B(), EN = /* @__PURE__ */ new B(), lt = /* @__PURE__ */ new B(), ht = /* @__PURE__ */ new B(), Pt = /* @__PURE__ */ new B(), ee = /* @__PURE__ */ new B(), ti = /* @__PURE__ */ new B(), Ni = /* @__PURE__ */ new B(), Ft = /* @__PURE__ */ new B();
function mA(e, M, D, t, N) {
  for (let i = 0, z = e.length - 3; i <= z; i += 3) {
    Ft.fromArray(e, i);
    const A = N.x * Math.abs(Ft.x) + N.y * Math.abs(Ft.y) + N.z * Math.abs(Ft.z), I = M.dot(Ft), n = D.dot(Ft), T = t.dot(Ft);
    if (Math.max(-Math.max(I, n, T), Math.min(I, n, T)) > A)
      return !1;
  }
  return !0;
}
const Qy = /* @__PURE__ */ new Ue(), ie = /* @__PURE__ */ new B(), kA = /* @__PURE__ */ new B();
class Zi {
  constructor(M = new B(), D = -1) {
    this.center = M, this.radius = D;
  }
  set(M, D) {
    return this.center.copy(M), this.radius = D, this;
  }
  setFromPoints(M, D) {
    const t = this.center;
    D !== void 0 ? t.copy(D) : Qy.setFromPoints(M).getCenter(t);
    let N = 0;
    for (let i = 0, z = M.length; i < z; i++)
      N = Math.max(N, t.distanceToSquared(M[i]));
    return this.radius = Math.sqrt(N), this;
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
    ie.subVectors(M, this.center);
    const D = ie.lengthSq();
    if (D > this.radius * this.radius) {
      const t = Math.sqrt(D), N = (t - this.radius) * 0.5;
      this.center.addScaledVector(ie, N / t), this.radius += N;
    }
    return this;
  }
  union(M) {
    return M.isEmpty() ? this : this.isEmpty() ? (this.copy(M), this) : (this.center.equals(M.center) === !0 ? this.radius = Math.max(this.radius, M.radius) : (kA.subVectors(M.center, this.center).setLength(M.radius), this.expandByPoint(ie.copy(M.center).add(kA)), this.expandByPoint(ie.copy(M.center).sub(kA))), this);
  }
  equals(M) {
    return M.center.equals(this.center) && M.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const gt = /* @__PURE__ */ new B(), SA = /* @__PURE__ */ new B(), ei = /* @__PURE__ */ new B(), dt = /* @__PURE__ */ new B(), ZA = /* @__PURE__ */ new B(), ii = /* @__PURE__ */ new B(), _A = /* @__PURE__ */ new B();
class wz {
  constructor(M = new B(), D = new B(0, 0, -1)) {
    this.origin = M, this.direction = D;
  }
  set(M, D) {
    return this.origin.copy(M), this.direction.copy(D), this;
  }
  copy(M) {
    return this.origin.copy(M.origin), this.direction.copy(M.direction), this;
  }
  at(M, D) {
    return D.copy(this.direction).multiplyScalar(M).add(this.origin);
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
    return t < 0 ? D.copy(this.origin) : D.copy(this.direction).multiplyScalar(t).add(this.origin);
  }
  distanceToPoint(M) {
    return Math.sqrt(this.distanceSqToPoint(M));
  }
  distanceSqToPoint(M) {
    const D = gt.subVectors(M, this.origin).dot(this.direction);
    return D < 0 ? this.origin.distanceToSquared(M) : (gt.copy(this.direction).multiplyScalar(D).add(this.origin), gt.distanceToSquared(M));
  }
  distanceSqToSegment(M, D, t, N) {
    SA.copy(M).add(D).multiplyScalar(0.5), ei.copy(D).sub(M).normalize(), dt.copy(this.origin).sub(SA);
    const i = M.distanceTo(D) * 0.5, z = -this.direction.dot(ei), A = dt.dot(this.direction), I = -dt.dot(ei), n = dt.lengthSq(), T = Math.abs(1 - z * z);
    let u, g, s, j;
    if (T > 0)
      if (u = z * I - A, g = z * A - I, j = i * T, u >= 0)
        if (g >= -j)
          if (g <= j) {
            const r = 1 / T;
            u *= r, g *= r, s = u * (u + z * g + 2 * A) + g * (z * u + g + 2 * I) + n;
          } else
            g = i, u = Math.max(0, -(z * g + A)), s = -u * u + g * (g + 2 * I) + n;
        else
          g = -i, u = Math.max(0, -(z * g + A)), s = -u * u + g * (g + 2 * I) + n;
      else
        g <= -j ? (u = Math.max(0, -(-z * i + A)), g = u > 0 ? -i : Math.min(Math.max(-i, -I), i), s = -u * u + g * (g + 2 * I) + n) : g <= j ? (u = 0, g = Math.min(Math.max(-i, -I), i), s = g * (g + 2 * I) + n) : (u = Math.max(0, -(z * i + A)), g = u > 0 ? i : Math.min(Math.max(-i, -I), i), s = -u * u + g * (g + 2 * I) + n);
    else
      g = z > 0 ? -i : i, u = Math.max(0, -(z * g + A)), s = -u * u + g * (g + 2 * I) + n;
    return t && t.copy(this.direction).multiplyScalar(u).add(this.origin), N && N.copy(ei).multiplyScalar(g).add(SA), s;
  }
  intersectSphere(M, D) {
    gt.subVectors(M.center, this.origin);
    const t = gt.dot(this.direction), N = gt.dot(gt) - t * t, i = M.radius * M.radius;
    if (N > i)
      return null;
    const z = Math.sqrt(i - N), A = t - z, I = t + z;
    return A < 0 && I < 0 ? null : A < 0 ? this.at(I, D) : this.at(A, D);
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
    let t, N, i, z, A, I;
    const n = 1 / this.direction.x, T = 1 / this.direction.y, u = 1 / this.direction.z, g = this.origin;
    return n >= 0 ? (t = (M.min.x - g.x) * n, N = (M.max.x - g.x) * n) : (t = (M.max.x - g.x) * n, N = (M.min.x - g.x) * n), T >= 0 ? (i = (M.min.y - g.y) * T, z = (M.max.y - g.y) * T) : (i = (M.max.y - g.y) * T, z = (M.min.y - g.y) * T), t > z || i > N || ((i > t || isNaN(t)) && (t = i), (z < N || isNaN(N)) && (N = z), u >= 0 ? (A = (M.min.z - g.z) * u, I = (M.max.z - g.z) * u) : (A = (M.max.z - g.z) * u, I = (M.min.z - g.z) * u), t > I || A > N) || ((A > t || t !== t) && (t = A), (I < N || N !== N) && (N = I), N < 0) ? null : this.at(t >= 0 ? t : N, D);
  }
  intersectsBox(M) {
    return this.intersectBox(M, gt) !== null;
  }
  intersectTriangle(M, D, t, N, i) {
    ZA.subVectors(D, M), ii.subVectors(t, M), _A.crossVectors(ZA, ii);
    let z = this.direction.dot(_A), A;
    if (z > 0) {
      if (N)
        return null;
      A = 1;
    } else if (z < 0)
      A = -1, z = -z;
    else
      return null;
    dt.subVectors(this.origin, M);
    const I = A * this.direction.dot(ii.crossVectors(dt, ii));
    if (I < 0)
      return null;
    const n = A * this.direction.dot(ZA.cross(dt));
    if (n < 0 || I + n > z)
      return null;
    const T = -A * dt.dot(_A);
    return T < 0 ? null : this.at(T / z, i);
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
class vD {
  constructor() {
    vD.prototype.isMatrix4 = !0, this.elements = [
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
    ];
  }
  set(M, D, t, N, i, z, A, I, n, T, u, g, s, j, r, c) {
    const y = this.elements;
    return y[0] = M, y[4] = D, y[8] = t, y[12] = N, y[1] = i, y[5] = z, y[9] = A, y[13] = I, y[2] = n, y[6] = T, y[10] = u, y[14] = g, y[3] = s, y[7] = j, y[11] = r, y[15] = c, this;
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
    return new vD().fromArray(this.elements);
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
    const D = this.elements, t = M.elements, N = 1 / lN.setFromMatrixColumn(M, 0).length(), i = 1 / lN.setFromMatrixColumn(M, 1).length(), z = 1 / lN.setFromMatrixColumn(M, 2).length();
    return D[0] = t[0] * N, D[1] = t[1] * N, D[2] = t[2] * N, D[3] = 0, D[4] = t[4] * i, D[5] = t[5] * i, D[6] = t[6] * i, D[7] = 0, D[8] = t[8] * z, D[9] = t[9] * z, D[10] = t[10] * z, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromEuler(M) {
    const D = this.elements, t = M.x, N = M.y, i = M.z, z = Math.cos(t), A = Math.sin(t), I = Math.cos(N), n = Math.sin(N), T = Math.cos(i), u = Math.sin(i);
    if (M.order === "XYZ") {
      const g = z * T, s = z * u, j = A * T, r = A * u;
      D[0] = I * T, D[4] = -I * u, D[8] = n, D[1] = s + j * n, D[5] = g - r * n, D[9] = -A * I, D[2] = r - g * n, D[6] = j + s * n, D[10] = z * I;
    } else if (M.order === "YXZ") {
      const g = I * T, s = I * u, j = n * T, r = n * u;
      D[0] = g + r * A, D[4] = j * A - s, D[8] = z * n, D[1] = z * u, D[5] = z * T, D[9] = -A, D[2] = s * A - j, D[6] = r + g * A, D[10] = z * I;
    } else if (M.order === "ZXY") {
      const g = I * T, s = I * u, j = n * T, r = n * u;
      D[0] = g - r * A, D[4] = -z * u, D[8] = j + s * A, D[1] = s + j * A, D[5] = z * T, D[9] = r - g * A, D[2] = -z * n, D[6] = A, D[10] = z * I;
    } else if (M.order === "ZYX") {
      const g = z * T, s = z * u, j = A * T, r = A * u;
      D[0] = I * T, D[4] = j * n - s, D[8] = g * n + r, D[1] = I * u, D[5] = r * n + g, D[9] = s * n - j, D[2] = -n, D[6] = A * I, D[10] = z * I;
    } else if (M.order === "YZX") {
      const g = z * I, s = z * n, j = A * I, r = A * n;
      D[0] = I * T, D[4] = r - g * u, D[8] = j * u + s, D[1] = u, D[5] = z * T, D[9] = -A * T, D[2] = -n * T, D[6] = s * u + j, D[10] = g - r * u;
    } else if (M.order === "XZY") {
      const g = z * I, s = z * n, j = A * I, r = A * n;
      D[0] = I * T, D[4] = -u, D[8] = n * T, D[1] = g * u + r, D[5] = z * T, D[9] = s * u - j, D[2] = j * u - s, D[6] = A * T, D[10] = r * u + g;
    }
    return D[3] = 0, D[7] = 0, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromQuaternion(M) {
    return this.compose(my, M, ky);
  }
  lookAt(M, D, t) {
    const N = this.elements;
    return ED.subVectors(M, D), ED.lengthSq() === 0 && (ED.z = 1), ED.normalize(), vt.crossVectors(t, ED), vt.lengthSq() === 0 && (Math.abs(t.z) === 1 ? ED.x += 1e-4 : ED.z += 1e-4, ED.normalize(), vt.crossVectors(t, ED)), vt.normalize(), Ai.crossVectors(ED, vt), N[0] = vt.x, N[4] = Ai.x, N[8] = ED.x, N[1] = vt.y, N[5] = Ai.y, N[9] = ED.y, N[2] = vt.z, N[6] = Ai.z, N[10] = ED.z, this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const t = M.elements, N = D.elements, i = this.elements, z = t[0], A = t[4], I = t[8], n = t[12], T = t[1], u = t[5], g = t[9], s = t[13], j = t[2], r = t[6], c = t[10], y = t[14], w = t[3], a = t[7], C = t[11], x = t[15], l = N[0], d = N[4], L = N[8], h = N[12], p = N[1], P = N[5], H = N[9], Q = N[13], U = N[2], Z = N[6], W = N[10], X = N[14], F = N[3], J = N[7], $ = N[11], IM = N[15];
    return i[0] = z * l + A * p + I * U + n * F, i[4] = z * d + A * P + I * Z + n * J, i[8] = z * L + A * H + I * W + n * $, i[12] = z * h + A * Q + I * X + n * IM, i[1] = T * l + u * p + g * U + s * F, i[5] = T * d + u * P + g * Z + s * J, i[9] = T * L + u * H + g * W + s * $, i[13] = T * h + u * Q + g * X + s * IM, i[2] = j * l + r * p + c * U + y * F, i[6] = j * d + r * P + c * Z + y * J, i[10] = j * L + r * H + c * W + y * $, i[14] = j * h + r * Q + c * X + y * IM, i[3] = w * l + a * p + C * U + x * F, i[7] = w * d + a * P + C * Z + x * J, i[11] = w * L + a * H + C * W + x * $, i[15] = w * h + a * Q + C * X + x * IM, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[4] *= M, D[8] *= M, D[12] *= M, D[1] *= M, D[5] *= M, D[9] *= M, D[13] *= M, D[2] *= M, D[6] *= M, D[10] *= M, D[14] *= M, D[3] *= M, D[7] *= M, D[11] *= M, D[15] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], t = M[4], N = M[8], i = M[12], z = M[1], A = M[5], I = M[9], n = M[13], T = M[2], u = M[6], g = M[10], s = M[14], j = M[3], r = M[7], c = M[11], y = M[15];
    return j * (+i * I * u - N * n * u - i * A * g + t * n * g + N * A * s - t * I * s) + r * (+D * I * s - D * n * g + i * z * g - N * z * s + N * n * T - i * I * T) + c * (+D * n * u - D * A * s - i * z * u + t * z * s + i * A * T - t * n * T) + y * (-N * A * T - D * I * u + D * A * g + N * z * u - t * z * g + t * I * T);
  }
  transpose() {
    const M = this.elements;
    let D;
    return D = M[1], M[1] = M[4], M[4] = D, D = M[2], M[2] = M[8], M[8] = D, D = M[6], M[6] = M[9], M[9] = D, D = M[3], M[3] = M[12], M[12] = D, D = M[7], M[7] = M[13], M[13] = D, D = M[11], M[11] = M[14], M[14] = D, this;
  }
  setPosition(M, D, t) {
    const N = this.elements;
    return M.isVector3 ? (N[12] = M.x, N[13] = M.y, N[14] = M.z) : (N[12] = M, N[13] = D, N[14] = t), this;
  }
  invert() {
    const M = this.elements, D = M[0], t = M[1], N = M[2], i = M[3], z = M[4], A = M[5], I = M[6], n = M[7], T = M[8], u = M[9], g = M[10], s = M[11], j = M[12], r = M[13], c = M[14], y = M[15], w = u * c * n - r * g * n + r * I * s - A * c * s - u * I * y + A * g * y, a = j * g * n - T * c * n - j * I * s + z * c * s + T * I * y - z * g * y, C = T * r * n - j * u * n + j * A * s - z * r * s - T * A * y + z * u * y, x = j * u * I - T * r * I - j * A * g + z * r * g + T * A * c - z * u * c, l = D * w + t * a + N * C + i * x;
    if (l === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const d = 1 / l;
    return M[0] = w * d, M[1] = (r * g * i - u * c * i - r * N * s + t * c * s + u * N * y - t * g * y) * d, M[2] = (A * c * i - r * I * i + r * N * n - t * c * n - A * N * y + t * I * y) * d, M[3] = (u * I * i - A * g * i - u * N * n + t * g * n + A * N * s - t * I * s) * d, M[4] = a * d, M[5] = (T * c * i - j * g * i + j * N * s - D * c * s - T * N * y + D * g * y) * d, M[6] = (j * I * i - z * c * i - j * N * n + D * c * n + z * N * y - D * I * y) * d, M[7] = (z * g * i - T * I * i + T * N * n - D * g * n - z * N * s + D * I * s) * d, M[8] = C * d, M[9] = (j * u * i - T * r * i - j * t * s + D * r * s + T * t * y - D * u * y) * d, M[10] = (z * r * i - j * A * i + j * t * n - D * r * n - z * t * y + D * A * y) * d, M[11] = (T * A * i - z * u * i - T * t * n + D * u * n + z * t * s - D * A * s) * d, M[12] = x * d, M[13] = (T * r * N - j * u * N + j * t * g - D * r * g - T * t * c + D * u * c) * d, M[14] = (j * A * N - z * r * N - j * t * I + D * r * I + z * t * c - D * A * c) * d, M[15] = (z * u * N - T * A * N + T * t * I - D * u * I - z * t * g + D * A * g) * d, this;
  }
  scale(M) {
    const D = this.elements, t = M.x, N = M.y, i = M.z;
    return D[0] *= t, D[4] *= N, D[8] *= i, D[1] *= t, D[5] *= N, D[9] *= i, D[2] *= t, D[6] *= N, D[10] *= i, D[3] *= t, D[7] *= N, D[11] *= i, this;
  }
  getMaxScaleOnAxis() {
    const M = this.elements, D = M[0] * M[0] + M[1] * M[1] + M[2] * M[2], t = M[4] * M[4] + M[5] * M[5] + M[6] * M[6], N = M[8] * M[8] + M[9] * M[9] + M[10] * M[10];
    return Math.sqrt(Math.max(D, t, N));
  }
  makeTranslation(M, D, t) {
    return this.set(
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
    const t = Math.cos(D), N = Math.sin(D), i = 1 - t, z = M.x, A = M.y, I = M.z, n = i * z, T = i * A;
    return this.set(
      n * z + t,
      n * A - N * I,
      n * I + N * A,
      0,
      n * A + N * I,
      T * A + t,
      T * I - N * z,
      0,
      n * I - N * A,
      T * I + N * z,
      i * I * I + t,
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
  makeShear(M, D, t, N, i, z) {
    return this.set(
      1,
      t,
      i,
      0,
      M,
      1,
      z,
      0,
      D,
      N,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(M, D, t) {
    const N = this.elements, i = D._x, z = D._y, A = D._z, I = D._w, n = i + i, T = z + z, u = A + A, g = i * n, s = i * T, j = i * u, r = z * T, c = z * u, y = A * u, w = I * n, a = I * T, C = I * u, x = t.x, l = t.y, d = t.z;
    return N[0] = (1 - (r + y)) * x, N[1] = (s + C) * x, N[2] = (j - a) * x, N[3] = 0, N[4] = (s - C) * l, N[5] = (1 - (g + y)) * l, N[6] = (c + w) * l, N[7] = 0, N[8] = (j + a) * d, N[9] = (c - w) * d, N[10] = (1 - (g + r)) * d, N[11] = 0, N[12] = M.x, N[13] = M.y, N[14] = M.z, N[15] = 1, this;
  }
  decompose(M, D, t) {
    const N = this.elements;
    let i = lN.set(N[0], N[1], N[2]).length();
    const z = lN.set(N[4], N[5], N[6]).length(), A = lN.set(N[8], N[9], N[10]).length();
    this.determinant() < 0 && (i = -i), M.x = N[12], M.y = N[13], M.z = N[14], FD.copy(this);
    const n = 1 / i, T = 1 / z, u = 1 / A;
    return FD.elements[0] *= n, FD.elements[1] *= n, FD.elements[2] *= n, FD.elements[4] *= T, FD.elements[5] *= T, FD.elements[6] *= T, FD.elements[8] *= u, FD.elements[9] *= u, FD.elements[10] *= u, D.setFromRotationMatrix(FD), t.x = i, t.y = z, t.z = A, this;
  }
  makePerspective(M, D, t, N, i, z) {
    const A = this.elements, I = 2 * i / (D - M), n = 2 * i / (t - N), T = (D + M) / (D - M), u = (t + N) / (t - N), g = -(z + i) / (z - i), s = -2 * z * i / (z - i);
    return A[0] = I, A[4] = 0, A[8] = T, A[12] = 0, A[1] = 0, A[5] = n, A[9] = u, A[13] = 0, A[2] = 0, A[6] = 0, A[10] = g, A[14] = s, A[3] = 0, A[7] = 0, A[11] = -1, A[15] = 0, this;
  }
  makeOrthographic(M, D, t, N, i, z) {
    const A = this.elements, I = 1 / (D - M), n = 1 / (t - N), T = 1 / (z - i), u = (D + M) * I, g = (t + N) * n, s = (z + i) * T;
    return A[0] = 2 * I, A[4] = 0, A[8] = 0, A[12] = -u, A[1] = 0, A[5] = 2 * n, A[9] = 0, A[13] = -g, A[2] = 0, A[6] = 0, A[10] = -2 * T, A[14] = -s, A[3] = 0, A[7] = 0, A[11] = 0, A[15] = 1, this;
  }
  equals(M) {
    const D = this.elements, t = M.elements;
    for (let N = 0; N < 16; N++)
      if (D[N] !== t[N])
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
const lN = /* @__PURE__ */ new B(), FD = /* @__PURE__ */ new vD(), my = /* @__PURE__ */ new B(0, 0, 0), ky = /* @__PURE__ */ new B(1, 1, 1), vt = /* @__PURE__ */ new B(), Ai = /* @__PURE__ */ new B(), ED = /* @__PURE__ */ new B(), tI = /* @__PURE__ */ new vD(), NI = /* @__PURE__ */ new pe();
class _i {
  constructor(M = 0, D = 0, t = 0, N = _i.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = M, this._y = D, this._z = t, this._order = N;
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
  set(M, D, t, N = this._order) {
    return this._x = M, this._y = D, this._z = t, this._order = N, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(M) {
    return this._x = M._x, this._y = M._y, this._z = M._z, this._order = M._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M, D = this._order, t = !0) {
    const N = M.elements, i = N[0], z = N[4], A = N[8], I = N[1], n = N[5], T = N[9], u = N[2], g = N[6], s = N[10];
    switch (D) {
      case "XYZ":
        this._y = Math.asin(hD(A, -1, 1)), Math.abs(A) < 0.9999999 ? (this._x = Math.atan2(-T, s), this._z = Math.atan2(-z, i)) : (this._x = Math.atan2(g, n), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-hD(T, -1, 1)), Math.abs(T) < 0.9999999 ? (this._y = Math.atan2(A, s), this._z = Math.atan2(I, n)) : (this._y = Math.atan2(-u, i), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(hD(g, -1, 1)), Math.abs(g) < 0.9999999 ? (this._y = Math.atan2(-u, s), this._z = Math.atan2(-z, n)) : (this._y = 0, this._z = Math.atan2(I, i));
        break;
      case "ZYX":
        this._y = Math.asin(-hD(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(g, s), this._z = Math.atan2(I, i)) : (this._x = 0, this._z = Math.atan2(-z, n));
        break;
      case "YZX":
        this._z = Math.asin(hD(I, -1, 1)), Math.abs(I) < 0.9999999 ? (this._x = Math.atan2(-T, n), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(A, s));
        break;
      case "XZY":
        this._z = Math.asin(-hD(z, -1, 1)), Math.abs(z) < 0.9999999 ? (this._x = Math.atan2(g, n), this._y = Math.atan2(A, i)) : (this._x = Math.atan2(-T, s), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + D);
    }
    return this._order = D, t === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(M, D, t) {
    return tI.makeRotationFromQuaternion(M), this.setFromRotationMatrix(tI, D, t);
  }
  setFromVector3(M, D = this._order) {
    return this.set(M.x, M.y, M.z, D);
  }
  reorder(M) {
    return NI.setFromEuler(this), this.setFromQuaternion(NI, M);
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
_i.DEFAULT_ORDER = "XYZ";
class Sy {
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
let Zy = 0;
const eI = /* @__PURE__ */ new B(), hN = /* @__PURE__ */ new pe(), st = /* @__PURE__ */ new vD(), zi = /* @__PURE__ */ new B(), Ae = /* @__PURE__ */ new B(), _y = /* @__PURE__ */ new B(), by = /* @__PURE__ */ new pe(), iI = /* @__PURE__ */ new B(1, 0, 0), AI = /* @__PURE__ */ new B(0, 1, 0), zI = /* @__PURE__ */ new B(0, 0, 1), Ky = { type: "added" }, nI = { type: "removed" };
class ZD extends Si {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Zy++ }), this.uuid = Ye(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ZD.DEFAULT_UP.clone();
    const M = new B(), D = new _i(), t = new pe(), N = new B(1, 1, 1);
    function i() {
      t.setFromEuler(D, !1);
    }
    function z() {
      D.setFromQuaternion(t, void 0, !1);
    }
    D._onChange(i), t._onChange(z), Object.defineProperties(this, {
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
        value: N
      },
      modelViewMatrix: {
        value: new vD()
      },
      normalMatrix: {
        value: new WN()
      }
    }), this.matrix = new vD(), this.matrixWorld = new vD(), this.matrixAutoUpdate = ZD.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = ZD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.layers = new Sy(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
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
    return hN.setFromAxisAngle(M, D), this.quaternion.multiply(hN), this;
  }
  rotateOnWorldAxis(M, D) {
    return hN.setFromAxisAngle(M, D), this.quaternion.premultiply(hN), this;
  }
  rotateX(M) {
    return this.rotateOnAxis(iI, M);
  }
  rotateY(M) {
    return this.rotateOnAxis(AI, M);
  }
  rotateZ(M) {
    return this.rotateOnAxis(zI, M);
  }
  translateOnAxis(M, D) {
    return eI.copy(M).applyQuaternion(this.quaternion), this.position.add(eI.multiplyScalar(D)), this;
  }
  translateX(M) {
    return this.translateOnAxis(iI, M);
  }
  translateY(M) {
    return this.translateOnAxis(AI, M);
  }
  translateZ(M) {
    return this.translateOnAxis(zI, M);
  }
  localToWorld(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(st.copy(this.matrixWorld).invert());
  }
  lookAt(M, D, t) {
    M.isVector3 ? zi.copy(M) : zi.set(M, D, t);
    const N = this.parent;
    this.updateWorldMatrix(!0, !1), Ae.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? st.lookAt(Ae, zi, this.up) : st.lookAt(zi, Ae, this.up), this.quaternion.setFromRotationMatrix(st), N && (st.extractRotation(N.matrixWorld), hN.setFromRotationMatrix(st), this.quaternion.premultiply(hN.invert()));
  }
  add(M) {
    if (arguments.length > 1) {
      for (let D = 0; D < arguments.length; D++)
        this.add(arguments[D]);
      return this;
    }
    return M === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", M), this) : (M && M.isObject3D ? (M.parent !== null && M.parent.remove(M), M.parent = this, this.children.push(M), M.dispatchEvent(Ky)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", M), this);
  }
  remove(M) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.remove(arguments[t]);
      return this;
    }
    const D = this.children.indexOf(M);
    return D !== -1 && (M.parent = null, this.children.splice(D, 1), M.dispatchEvent(nI)), this;
  }
  removeFromParent() {
    const M = this.parent;
    return M !== null && M.remove(this), this;
  }
  clear() {
    for (let M = 0; M < this.children.length; M++) {
      const D = this.children[M];
      D.parent = null, D.dispatchEvent(nI);
    }
    return this.children.length = 0, this;
  }
  attach(M) {
    return this.updateWorldMatrix(!0, !1), st.copy(this.matrixWorld).invert(), M.parent !== null && (M.parent.updateWorldMatrix(!0, !1), st.multiply(M.parent.matrixWorld)), M.applyMatrix4(st), this.add(M), M.updateWorldMatrix(!1, !0), this;
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
    for (let t = 0, N = this.children.length; t < N; t++) {
      const z = this.children[t].getObjectByProperty(M, D);
      if (z !== void 0)
        return z;
    }
  }
  getObjectsByProperty(M, D) {
    let t = [];
    this[M] === D && t.push(this);
    for (let N = 0, i = this.children.length; N < i; N++) {
      const z = this.children[N].getObjectsByProperty(M, D);
      z.length > 0 && (t = t.concat(z));
    }
    return t;
  }
  getWorldPosition(M) {
    return this.updateWorldMatrix(!0, !1), M.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ae, M, _y), M;
  }
  getWorldScale(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ae, by, M), M;
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
    for (let t = 0, N = D.length; t < N; t++)
      D[t].traverse(M);
  }
  traverseVisible(M) {
    if (this.visible === !1)
      return;
    M(this);
    const D = this.children;
    for (let t = 0, N = D.length; t < N; t++)
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
    for (let t = 0, N = D.length; t < N; t++) {
      const i = D[t];
      (i.matrixWorldAutoUpdate === !0 || M === !0) && i.updateMatrixWorld(M);
    }
  }
  updateWorldMatrix(M, D) {
    const t = this.parent;
    if (M === !0 && t !== null && t.matrixWorldAutoUpdate === !0 && t.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), D === !0) {
      const N = this.children;
      for (let i = 0, z = N.length; i < z; i++) {
        const A = N[i];
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
      version: 4.5,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const N = {};
    N.uuid = this.uuid, N.type = this.type, this.name !== "" && (N.name = this.name), this.castShadow === !0 && (N.castShadow = !0), this.receiveShadow === !0 && (N.receiveShadow = !0), this.visible === !1 && (N.visible = !1), this.frustumCulled === !1 && (N.frustumCulled = !1), this.renderOrder !== 0 && (N.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (N.userData = this.userData), N.layers = this.layers.mask, N.matrix = this.matrix.toArray(), this.matrixAutoUpdate === !1 && (N.matrixAutoUpdate = !1), this.isInstancedMesh && (N.type = "InstancedMesh", N.count = this.count, N.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (N.instanceColor = this.instanceColor.toJSON()));
    function i(A, I) {
      return A[I.uuid] === void 0 && (A[I.uuid] = I.toJSON(M)), I.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? N.background = this.background.toJSON() : this.background.isTexture && (N.background = this.background.toJSON(M).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (N.environment = this.environment.toJSON(M).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      N.geometry = i(M.geometries, this.geometry);
      const A = this.geometry.parameters;
      if (A !== void 0 && A.shapes !== void 0) {
        const I = A.shapes;
        if (Array.isArray(I))
          for (let n = 0, T = I.length; n < T; n++) {
            const u = I[n];
            i(M.shapes, u);
          }
        else
          i(M.shapes, I);
      }
    }
    if (this.isSkinnedMesh && (N.bindMode = this.bindMode, N.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(M.skeletons, this.skeleton), N.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const A = [];
        for (let I = 0, n = this.material.length; I < n; I++)
          A.push(i(M.materials, this.material[I]));
        N.material = A;
      } else
        N.material = i(M.materials, this.material);
    if (this.children.length > 0) {
      N.children = [];
      for (let A = 0; A < this.children.length; A++)
        N.children.push(this.children[A].toJSON(M).object);
    }
    if (this.animations.length > 0) {
      N.animations = [];
      for (let A = 0; A < this.animations.length; A++) {
        const I = this.animations[A];
        N.animations.push(i(M.animations, I));
      }
    }
    if (D) {
      const A = z(M.geometries), I = z(M.materials), n = z(M.textures), T = z(M.images), u = z(M.shapes), g = z(M.skeletons), s = z(M.animations), j = z(M.nodes);
      A.length > 0 && (t.geometries = A), I.length > 0 && (t.materials = I), n.length > 0 && (t.textures = n), T.length > 0 && (t.images = T), u.length > 0 && (t.shapes = u), g.length > 0 && (t.skeletons = g), s.length > 0 && (t.animations = s), j.length > 0 && (t.nodes = j);
    }
    return t.object = N, t;
    function z(A) {
      const I = [];
      for (const n in A) {
        const T = A[n];
        delete T.metadata, I.push(T);
      }
      return I;
    }
  }
  clone(M) {
    return new this.constructor().copy(this, M);
  }
  copy(M, D = !0) {
    if (this.name = M.name, this.up.copy(M.up), this.position.copy(M.position), this.rotation.order = M.rotation.order, this.quaternion.copy(M.quaternion), this.scale.copy(M.scale), this.matrix.copy(M.matrix), this.matrixWorld.copy(M.matrixWorld), this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrixWorldNeedsUpdate = M.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = M.matrixWorldAutoUpdate, this.layers.mask = M.layers.mask, this.visible = M.visible, this.castShadow = M.castShadow, this.receiveShadow = M.receiveShadow, this.frustumCulled = M.frustumCulled, this.renderOrder = M.renderOrder, this.userData = JSON.parse(JSON.stringify(M.userData)), D === !0)
      for (let t = 0; t < M.children.length; t++) {
        const N = M.children[t];
        this.add(N.clone());
      }
    return this;
  }
}
ZD.DEFAULT_UP = /* @__PURE__ */ new B(0, 1, 0);
ZD.DEFAULT_MATRIX_AUTO_UPDATE = !0;
ZD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const BD = /* @__PURE__ */ new B(), rt = /* @__PURE__ */ new B(), bA = /* @__PURE__ */ new B(), ct = /* @__PURE__ */ new B(), dN = /* @__PURE__ */ new B(), vN = /* @__PURE__ */ new B(), II = /* @__PURE__ */ new B(), KA = /* @__PURE__ */ new B(), RA = /* @__PURE__ */ new B(), PA = /* @__PURE__ */ new B();
class ot {
  constructor(M = new B(), D = new B(), t = new B()) {
    this.a = M, this.b = D, this.c = t;
  }
  static getNormal(M, D, t, N) {
    N.subVectors(t, D), BD.subVectors(M, D), N.cross(BD);
    const i = N.lengthSq();
    return i > 0 ? N.multiplyScalar(1 / Math.sqrt(i)) : N.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(M, D, t, N, i) {
    BD.subVectors(N, D), rt.subVectors(t, D), bA.subVectors(M, D);
    const z = BD.dot(BD), A = BD.dot(rt), I = BD.dot(bA), n = rt.dot(rt), T = rt.dot(bA), u = z * n - A * A;
    if (u === 0)
      return i.set(-2, -1, -1);
    const g = 1 / u, s = (n * I - A * T) * g, j = (z * T - A * I) * g;
    return i.set(1 - s - j, j, s);
  }
  static containsPoint(M, D, t, N) {
    return this.getBarycoord(M, D, t, N, ct), ct.x >= 0 && ct.y >= 0 && ct.x + ct.y <= 1;
  }
  static getUV(M, D, t, N, i, z, A, I) {
    return this.getBarycoord(M, D, t, N, ct), I.set(0, 0), I.addScaledVector(i, ct.x), I.addScaledVector(z, ct.y), I.addScaledVector(A, ct.z), I;
  }
  static isFrontFacing(M, D, t, N) {
    return BD.subVectors(t, D), rt.subVectors(M, D), BD.cross(rt).dot(N) < 0;
  }
  set(M, D, t) {
    return this.a.copy(M), this.b.copy(D), this.c.copy(t), this;
  }
  setFromPointsAndIndices(M, D, t, N) {
    return this.a.copy(M[D]), this.b.copy(M[t]), this.c.copy(M[N]), this;
  }
  setFromAttributeAndIndices(M, D, t, N) {
    return this.a.fromBufferAttribute(M, D), this.b.fromBufferAttribute(M, t), this.c.fromBufferAttribute(M, N), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.a.copy(M.a), this.b.copy(M.b), this.c.copy(M.c), this;
  }
  getArea() {
    return BD.subVectors(this.c, this.b), rt.subVectors(this.a, this.b), BD.cross(rt).length() * 0.5;
  }
  getMidpoint(M) {
    return M.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(M) {
    return ot.getNormal(this.a, this.b, this.c, M);
  }
  getPlane(M) {
    return M.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(M, D) {
    return ot.getBarycoord(M, this.a, this.b, this.c, D);
  }
  getUV(M, D, t, N, i) {
    return ot.getUV(M, this.a, this.b, this.c, D, t, N, i);
  }
  containsPoint(M) {
    return ot.containsPoint(M, this.a, this.b, this.c);
  }
  isFrontFacing(M) {
    return ot.isFrontFacing(this.a, this.b, this.c, M);
  }
  intersectsBox(M) {
    return M.intersectsTriangle(this);
  }
  closestPointToPoint(M, D) {
    const t = this.a, N = this.b, i = this.c;
    let z, A;
    dN.subVectors(N, t), vN.subVectors(i, t), KA.subVectors(M, t);
    const I = dN.dot(KA), n = vN.dot(KA);
    if (I <= 0 && n <= 0)
      return D.copy(t);
    RA.subVectors(M, N);
    const T = dN.dot(RA), u = vN.dot(RA);
    if (T >= 0 && u <= T)
      return D.copy(N);
    const g = I * u - T * n;
    if (g <= 0 && I >= 0 && T <= 0)
      return z = I / (I - T), D.copy(t).addScaledVector(dN, z);
    PA.subVectors(M, i);
    const s = dN.dot(PA), j = vN.dot(PA);
    if (j >= 0 && s <= j)
      return D.copy(i);
    const r = s * n - I * j;
    if (r <= 0 && n >= 0 && j <= 0)
      return A = n / (n - j), D.copy(t).addScaledVector(vN, A);
    const c = T * j - s * u;
    if (c <= 0 && u - T >= 0 && s - j >= 0)
      return II.subVectors(i, N), A = (u - T) / (u - T + (s - j)), D.copy(N).addScaledVector(II, A);
    const y = 1 / (c + r + g);
    return z = r * y, A = g * y, D.copy(t).addScaledVector(dN, z).addScaledVector(vN, A);
  }
  equals(M) {
    return M.a.equals(this.a) && M.b.equals(this.b) && M.c.equals(this.c);
  }
}
let Ry = 0;
class PN extends Si {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Ry++ }), this.uuid = Ye(), this.name = "", this.type = "Material", this.blending = Xn, this.side = uz, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.blendSrc = oy, this.blendDst = Cy, this.blendEquation = ay, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = Ly, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = dy, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = hA, this.stencilZFail = hA, this.stencilZPass = hA, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
          console.warn("THREE.Material: '" + D + "' parameter is undefined.");
          continue;
        }
        const N = this[D];
        if (N === void 0) {
          console.warn("THREE." + this.type + ": '" + D + "' is not a property of this material.");
          continue;
        }
        N && N.isColor ? N.set(t) : N && N.isVector3 && t && t.isVector3 ? N.copy(t) : this[D] = t;
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
        version: 4.5,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), this.color && this.color.isColor && (t.color = this.color.getHex()), this.roughness !== void 0 && (t.roughness = this.roughness), this.metalness !== void 0 && (t.metalness = this.metalness), this.sheen !== void 0 && (t.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (t.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (t.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (t.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (t.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (t.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (t.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (t.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (t.shininess = this.shininess), this.clearcoat !== void 0 && (t.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (t.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (t.clearcoatMap = this.clearcoatMap.toJSON(M).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (t.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(M).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (t.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(M).uuid, t.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (t.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (t.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (t.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (t.iridescenceMap = this.iridescenceMap.toJSON(M).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (t.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(M).uuid), this.map && this.map.isTexture && (t.map = this.map.toJSON(M).uuid), this.matcap && this.matcap.isTexture && (t.matcap = this.matcap.toJSON(M).uuid), this.alphaMap && this.alphaMap.isTexture && (t.alphaMap = this.alphaMap.toJSON(M).uuid), this.lightMap && this.lightMap.isTexture && (t.lightMap = this.lightMap.toJSON(M).uuid, t.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (t.aoMap = this.aoMap.toJSON(M).uuid, t.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (t.bumpMap = this.bumpMap.toJSON(M).uuid, t.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (t.normalMap = this.normalMap.toJSON(M).uuid, t.normalMapType = this.normalMapType, t.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (t.displacementMap = this.displacementMap.toJSON(M).uuid, t.displacementScale = this.displacementScale, t.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (t.roughnessMap = this.roughnessMap.toJSON(M).uuid), this.metalnessMap && this.metalnessMap.isTexture && (t.metalnessMap = this.metalnessMap.toJSON(M).uuid), this.emissiveMap && this.emissiveMap.isTexture && (t.emissiveMap = this.emissiveMap.toJSON(M).uuid), this.specularMap && this.specularMap.isTexture && (t.specularMap = this.specularMap.toJSON(M).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (t.specularIntensityMap = this.specularIntensityMap.toJSON(M).uuid), this.specularColorMap && this.specularColorMap.isTexture && (t.specularColorMap = this.specularColorMap.toJSON(M).uuid), this.envMap && this.envMap.isTexture && (t.envMap = this.envMap.toJSON(M).uuid, this.combine !== void 0 && (t.combine = this.combine)), this.envMapIntensity !== void 0 && (t.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (t.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (t.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (t.gradientMap = this.gradientMap.toJSON(M).uuid), this.transmission !== void 0 && (t.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (t.transmissionMap = this.transmissionMap.toJSON(M).uuid), this.thickness !== void 0 && (t.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (t.thicknessMap = this.thicknessMap.toJSON(M).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (t.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (t.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (t.size = this.size), this.shadowSide !== null && (t.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (t.sizeAttenuation = this.sizeAttenuation), this.blending !== Xn && (t.blending = this.blending), this.side !== uz && (t.side = this.side), this.vertexColors && (t.vertexColors = !0), this.opacity < 1 && (t.opacity = this.opacity), this.transparent === !0 && (t.transparent = this.transparent), t.depthFunc = this.depthFunc, t.depthTest = this.depthTest, t.depthWrite = this.depthWrite, t.colorWrite = this.colorWrite, t.stencilWrite = this.stencilWrite, t.stencilWriteMask = this.stencilWriteMask, t.stencilFunc = this.stencilFunc, t.stencilRef = this.stencilRef, t.stencilFuncMask = this.stencilFuncMask, t.stencilFail = this.stencilFail, t.stencilZFail = this.stencilZFail, t.stencilZPass = this.stencilZPass, this.rotation !== void 0 && this.rotation !== 0 && (t.rotation = this.rotation), this.polygonOffset === !0 && (t.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (t.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (t.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (t.linewidth = this.linewidth), this.dashSize !== void 0 && (t.dashSize = this.dashSize), this.gapSize !== void 0 && (t.gapSize = this.gapSize), this.scale !== void 0 && (t.scale = this.scale), this.dithering === !0 && (t.dithering = !0), this.alphaTest > 0 && (t.alphaTest = this.alphaTest), this.alphaToCoverage === !0 && (t.alphaToCoverage = this.alphaToCoverage), this.premultipliedAlpha === !0 && (t.premultipliedAlpha = this.premultipliedAlpha), this.forceSinglePass === !0 && (t.forceSinglePass = this.forceSinglePass), this.wireframe === !0 && (t.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (t.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (t.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (t.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (t.flatShading = this.flatShading), this.visible === !1 && (t.visible = !1), this.toneMapped === !1 && (t.toneMapped = !1), this.fog === !1 && (t.fog = !1), Object.keys(this.userData).length > 0 && (t.userData = this.userData);
    function N(i) {
      const z = [];
      for (const A in i) {
        const I = i[A];
        delete I.metadata, z.push(I);
      }
      return z;
    }
    if (D) {
      const i = N(M.textures), z = N(M.images);
      i.length > 0 && (t.textures = i), z.length > 0 && (t.images = z);
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
      const N = D.length;
      t = new Array(N);
      for (let i = 0; i !== N; ++i)
        t[i] = D[i].clone();
    }
    return this.clippingPlanes = t, this.clipIntersection = M.clipIntersection, this.clipShadows = M.clipShadows, this.shadowSide = M.shadowSide, this.colorWrite = M.colorWrite, this.precision = M.precision, this.polygonOffset = M.polygonOffset, this.polygonOffsetFactor = M.polygonOffsetFactor, this.polygonOffsetUnits = M.polygonOffsetUnits, this.dithering = M.dithering, this.alphaTest = M.alphaTest, this.alphaToCoverage = M.alphaToCoverage, this.premultipliedAlpha = M.premultipliedAlpha, this.forceSinglePass = M.forceSinglePass, this.visible = M.visible, this.toneMapped = M.toneMapped, this.userData = JSON.parse(JSON.stringify(M.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
}
class Py extends PN {
  constructor(M) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Ut(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = CT, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.fog = M.fog, this;
  }
}
const FM = /* @__PURE__ */ new B(), ni = /* @__PURE__ */ new jD();
class ZN {
  constructor(M, D, t = !1) {
    if (Array.isArray(M))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = M, this.itemSize = D, this.count = M !== void 0 ? M.length / D : 0, this.normalized = t, this.usage = Jn, this.updateRange = { offset: 0, count: -1 }, this.version = 0;
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
    return this.name = M.name, this.array = new M.array.constructor(M.array), this.itemSize = M.itemSize, this.count = M.count, this.normalized = M.normalized, this.usage = M.usage, this;
  }
  copyAt(M, D, t) {
    M *= this.itemSize, t *= D.itemSize;
    for (let N = 0, i = this.itemSize; N < i; N++)
      this.array[M + N] = D.array[t + N];
    return this;
  }
  copyArray(M) {
    return this.array.set(M), this;
  }
  applyMatrix3(M) {
    if (this.itemSize === 2)
      for (let D = 0, t = this.count; D < t; D++)
        ni.fromBufferAttribute(this, D), ni.applyMatrix3(M), this.setXY(D, ni.x, ni.y);
    else if (this.itemSize === 3)
      for (let D = 0, t = this.count; D < t; D++)
        FM.fromBufferAttribute(this, D), FM.applyMatrix3(M), this.setXYZ(D, FM.x, FM.y, FM.z);
    return this;
  }
  applyMatrix4(M) {
    for (let D = 0, t = this.count; D < t; D++)
      FM.fromBufferAttribute(this, D), FM.applyMatrix4(M), this.setXYZ(D, FM.x, FM.y, FM.z);
    return this;
  }
  applyNormalMatrix(M) {
    for (let D = 0, t = this.count; D < t; D++)
      FM.fromBufferAttribute(this, D), FM.applyNormalMatrix(M), this.setXYZ(D, FM.x, FM.y, FM.z);
    return this;
  }
  transformDirection(M) {
    for (let D = 0, t = this.count; D < t; D++)
      FM.fromBufferAttribute(this, D), FM.transformDirection(M), this.setXYZ(D, FM.x, FM.y, FM.z);
    return this;
  }
  set(M, D = 0) {
    return this.array.set(M, D), this;
  }
  getX(M) {
    let D = this.array[M * this.itemSize];
    return this.normalized && (D = Je(D, this.array)), D;
  }
  setX(M, D) {
    return this.normalized && (D = OD(D, this.array)), this.array[M * this.itemSize] = D, this;
  }
  getY(M) {
    let D = this.array[M * this.itemSize + 1];
    return this.normalized && (D = Je(D, this.array)), D;
  }
  setY(M, D) {
    return this.normalized && (D = OD(D, this.array)), this.array[M * this.itemSize + 1] = D, this;
  }
  getZ(M) {
    let D = this.array[M * this.itemSize + 2];
    return this.normalized && (D = Je(D, this.array)), D;
  }
  setZ(M, D) {
    return this.normalized && (D = OD(D, this.array)), this.array[M * this.itemSize + 2] = D, this;
  }
  getW(M) {
    let D = this.array[M * this.itemSize + 3];
    return this.normalized && (D = Je(D, this.array)), D;
  }
  setW(M, D) {
    return this.normalized && (D = OD(D, this.array)), this.array[M * this.itemSize + 3] = D, this;
  }
  setXY(M, D, t) {
    return M *= this.itemSize, this.normalized && (D = OD(D, this.array), t = OD(t, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this;
  }
  setXYZ(M, D, t, N) {
    return M *= this.itemSize, this.normalized && (D = OD(D, this.array), t = OD(t, this.array), N = OD(N, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this.array[M + 2] = N, this;
  }
  setXYZW(M, D, t, N, i) {
    return M *= this.itemSize, this.normalized && (D = OD(D, this.array), t = OD(t, this.array), N = OD(N, this.array), i = OD(i, this.array)), this.array[M + 0] = D, this.array[M + 1] = t, this.array[M + 2] = N, this.array[M + 3] = i, this;
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
    return this.name !== "" && (M.name = this.name), this.usage !== Jn && (M.usage = this.usage), (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (M.updateRange = this.updateRange), M;
  }
  // @deprecated
  copyColorsArray() {
    console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.");
  }
  copyVector2sArray() {
    console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.");
  }
  copyVector3sArray() {
    console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.");
  }
  copyVector4sArray() {
    console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.");
  }
}
class Fy extends ZN {
  constructor(M, D, t) {
    super(new Uint16Array(M), D, t);
  }
}
class By extends ZN {
  constructor(M, D, t) {
    super(new Uint32Array(M), D, t);
  }
}
class at extends ZN {
  constructor(M, D, t) {
    super(new Float32Array(M), D, t);
  }
}
let Gy = 0;
const QD = /* @__PURE__ */ new vD(), FA = /* @__PURE__ */ new ZD(), YN = /* @__PURE__ */ new B(), lD = /* @__PURE__ */ new Ue(), ze = /* @__PURE__ */ new Ue(), DD = /* @__PURE__ */ new B();
class iN extends Si {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Gy++ }), this.uuid = Ye(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(M) {
    return Array.isArray(M) ? this.index = new (Yy(M) ? By : Fy)(M, 1) : this.index = M, this;
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
      const i = new WN().getNormalMatrix(M);
      t.applyNormalMatrix(i), t.needsUpdate = !0;
    }
    const N = this.attributes.tangent;
    return N !== void 0 && (N.transformDirection(M), N.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(M) {
    return QD.makeRotationFromQuaternion(M), this.applyMatrix4(QD), this;
  }
  rotateX(M) {
    return QD.makeRotationX(M), this.applyMatrix4(QD), this;
  }
  rotateY(M) {
    return QD.makeRotationY(M), this.applyMatrix4(QD), this;
  }
  rotateZ(M) {
    return QD.makeRotationZ(M), this.applyMatrix4(QD), this;
  }
  translate(M, D, t) {
    return QD.makeTranslation(M, D, t), this.applyMatrix4(QD), this;
  }
  scale(M, D, t) {
    return QD.makeScale(M, D, t), this.applyMatrix4(QD), this;
  }
  lookAt(M) {
    return FA.lookAt(M), FA.updateMatrix(), this.applyMatrix4(FA.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(YN).negate(), this.translate(YN.x, YN.y, YN.z), this;
  }
  setFromPoints(M) {
    const D = [];
    for (let t = 0, N = M.length; t < N; t++) {
      const i = M[t];
      D.push(i.x, i.y, i.z || 0);
    }
    return this.setAttribute("position", new at(D, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Ue());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new B(-1 / 0, -1 / 0, -1 / 0),
        new B(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (M !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(M), D)
        for (let t = 0, N = D.length; t < N; t++) {
          const i = D[t];
          lD.setFromBufferAttribute(i), this.morphTargetsRelative ? (DD.addVectors(this.boundingBox.min, lD.min), this.boundingBox.expandByPoint(DD), DD.addVectors(this.boundingBox.max, lD.max), this.boundingBox.expandByPoint(DD)) : (this.boundingBox.expandByPoint(lD.min), this.boundingBox.expandByPoint(lD.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Zi());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new B(), 1 / 0);
      return;
    }
    if (M) {
      const t = this.boundingSphere.center;
      if (lD.setFromBufferAttribute(M), D)
        for (let i = 0, z = D.length; i < z; i++) {
          const A = D[i];
          ze.setFromBufferAttribute(A), this.morphTargetsRelative ? (DD.addVectors(lD.min, ze.min), lD.expandByPoint(DD), DD.addVectors(lD.max, ze.max), lD.expandByPoint(DD)) : (lD.expandByPoint(ze.min), lD.expandByPoint(ze.max));
        }
      lD.getCenter(t);
      let N = 0;
      for (let i = 0, z = M.count; i < z; i++)
        DD.fromBufferAttribute(M, i), N = Math.max(N, t.distanceToSquared(DD));
      if (D)
        for (let i = 0, z = D.length; i < z; i++) {
          const A = D[i], I = this.morphTargetsRelative;
          for (let n = 0, T = A.count; n < T; n++)
            DD.fromBufferAttribute(A, n), I && (YN.fromBufferAttribute(M, n), DD.add(YN)), N = Math.max(N, t.distanceToSquared(DD));
        }
      this.boundingSphere.radius = Math.sqrt(N), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const M = this.index, D = this.attributes;
    if (M === null || D.position === void 0 || D.normal === void 0 || D.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const t = M.array, N = D.position.array, i = D.normal.array, z = D.uv.array, A = N.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new ZN(new Float32Array(4 * A), 4));
    const I = this.getAttribute("tangent").array, n = [], T = [];
    for (let p = 0; p < A; p++)
      n[p] = new B(), T[p] = new B();
    const u = new B(), g = new B(), s = new B(), j = new jD(), r = new jD(), c = new jD(), y = new B(), w = new B();
    function a(p, P, H) {
      u.fromArray(N, p * 3), g.fromArray(N, P * 3), s.fromArray(N, H * 3), j.fromArray(z, p * 2), r.fromArray(z, P * 2), c.fromArray(z, H * 2), g.sub(u), s.sub(u), r.sub(j), c.sub(j);
      const Q = 1 / (r.x * c.y - c.x * r.y);
      isFinite(Q) && (y.copy(g).multiplyScalar(c.y).addScaledVector(s, -r.y).multiplyScalar(Q), w.copy(s).multiplyScalar(r.x).addScaledVector(g, -c.x).multiplyScalar(Q), n[p].add(y), n[P].add(y), n[H].add(y), T[p].add(w), T[P].add(w), T[H].add(w));
    }
    let C = this.groups;
    C.length === 0 && (C = [{
      start: 0,
      count: t.length
    }]);
    for (let p = 0, P = C.length; p < P; ++p) {
      const H = C[p], Q = H.start, U = H.count;
      for (let Z = Q, W = Q + U; Z < W; Z += 3)
        a(
          t[Z + 0],
          t[Z + 1],
          t[Z + 2]
        );
    }
    const x = new B(), l = new B(), d = new B(), L = new B();
    function h(p) {
      d.fromArray(i, p * 3), L.copy(d);
      const P = n[p];
      x.copy(P), x.sub(d.multiplyScalar(d.dot(P))).normalize(), l.crossVectors(L, P);
      const Q = l.dot(T[p]) < 0 ? -1 : 1;
      I[p * 4] = x.x, I[p * 4 + 1] = x.y, I[p * 4 + 2] = x.z, I[p * 4 + 3] = Q;
    }
    for (let p = 0, P = C.length; p < P; ++p) {
      const H = C[p], Q = H.start, U = H.count;
      for (let Z = Q, W = Q + U; Z < W; Z += 3)
        h(t[Z + 0]), h(t[Z + 1]), h(t[Z + 2]);
    }
  }
  computeVertexNormals() {
    const M = this.index, D = this.getAttribute("position");
    if (D !== void 0) {
      let t = this.getAttribute("normal");
      if (t === void 0)
        t = new ZN(new Float32Array(D.count * 3), 3), this.setAttribute("normal", t);
      else
        for (let g = 0, s = t.count; g < s; g++)
          t.setXYZ(g, 0, 0, 0);
      const N = new B(), i = new B(), z = new B(), A = new B(), I = new B(), n = new B(), T = new B(), u = new B();
      if (M)
        for (let g = 0, s = M.count; g < s; g += 3) {
          const j = M.getX(g + 0), r = M.getX(g + 1), c = M.getX(g + 2);
          N.fromBufferAttribute(D, j), i.fromBufferAttribute(D, r), z.fromBufferAttribute(D, c), T.subVectors(z, i), u.subVectors(N, i), T.cross(u), A.fromBufferAttribute(t, j), I.fromBufferAttribute(t, r), n.fromBufferAttribute(t, c), A.add(T), I.add(T), n.add(T), t.setXYZ(j, A.x, A.y, A.z), t.setXYZ(r, I.x, I.y, I.z), t.setXYZ(c, n.x, n.y, n.z);
        }
      else
        for (let g = 0, s = D.count; g < s; g += 3)
          N.fromBufferAttribute(D, g + 0), i.fromBufferAttribute(D, g + 1), z.fromBufferAttribute(D, g + 2), T.subVectors(z, i), u.subVectors(N, i), T.cross(u), t.setXYZ(g + 0, T.x, T.y, T.z), t.setXYZ(g + 1, T.x, T.y, T.z), t.setXYZ(g + 2, T.x, T.y, T.z);
      this.normalizeNormals(), t.needsUpdate = !0;
    }
  }
  // @deprecated since r144
  merge() {
    return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."), this;
  }
  normalizeNormals() {
    const M = this.attributes.normal;
    for (let D = 0, t = M.count; D < t; D++)
      DD.fromBufferAttribute(M, D), DD.normalize(), M.setXYZ(D, DD.x, DD.y, DD.z);
  }
  toNonIndexed() {
    function M(A, I) {
      const n = A.array, T = A.itemSize, u = A.normalized, g = new n.constructor(I.length * T);
      let s = 0, j = 0;
      for (let r = 0, c = I.length; r < c; r++) {
        A.isInterleavedBufferAttribute ? s = I[r] * A.data.stride + A.offset : s = I[r] * T;
        for (let y = 0; y < T; y++)
          g[j++] = n[s++];
      }
      return new ZN(g, T, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const D = new iN(), t = this.index.array, N = this.attributes;
    for (const A in N) {
      const I = N[A], n = M(I, t);
      D.setAttribute(A, n);
    }
    const i = this.morphAttributes;
    for (const A in i) {
      const I = [], n = i[A];
      for (let T = 0, u = n.length; T < u; T++) {
        const g = n[T], s = M(g, t);
        I.push(s);
      }
      D.morphAttributes[A] = I;
    }
    D.morphTargetsRelative = this.morphTargetsRelative;
    const z = this.groups;
    for (let A = 0, I = z.length; A < I; A++) {
      const n = z[A];
      D.addGroup(n.start, n.count, n.materialIndex);
    }
    return D;
  }
  toJSON() {
    const M = {
      metadata: {
        version: 4.5,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (M.uuid = this.uuid, M.type = this.type, this.name !== "" && (M.name = this.name), Object.keys(this.userData).length > 0 && (M.userData = this.userData), this.parameters !== void 0) {
      const I = this.parameters;
      for (const n in I)
        I[n] !== void 0 && (M[n] = I[n]);
      return M;
    }
    M.data = { attributes: {} };
    const D = this.index;
    D !== null && (M.data.index = {
      type: D.array.constructor.name,
      array: Array.prototype.slice.call(D.array)
    });
    const t = this.attributes;
    for (const I in t) {
      const n = t[I];
      M.data.attributes[I] = n.toJSON(M.data);
    }
    const N = {};
    let i = !1;
    for (const I in this.morphAttributes) {
      const n = this.morphAttributes[I], T = [];
      for (let u = 0, g = n.length; u < g; u++) {
        const s = n[u];
        T.push(s.toJSON(M.data));
      }
      T.length > 0 && (N[I] = T, i = !0);
    }
    i && (M.data.morphAttributes = N, M.data.morphTargetsRelative = this.morphTargetsRelative);
    const z = this.groups;
    z.length > 0 && (M.data.groups = JSON.parse(JSON.stringify(z)));
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
    const N = M.attributes;
    for (const n in N) {
      const T = N[n];
      this.setAttribute(n, T.clone(D));
    }
    const i = M.morphAttributes;
    for (const n in i) {
      const T = [], u = i[n];
      for (let g = 0, s = u.length; g < s; g++)
        T.push(u[g].clone(D));
      this.morphAttributes[n] = T;
    }
    this.morphTargetsRelative = M.morphTargetsRelative;
    const z = M.groups;
    for (let n = 0, T = z.length; n < T; n++) {
      const u = z[n];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const A = M.boundingBox;
    A !== null && (this.boundingBox = A.clone());
    const I = M.boundingSphere;
    return I !== null && (this.boundingSphere = I.clone()), this.drawRange.start = M.drawRange.start, this.drawRange.count = M.drawRange.count, this.userData = M.userData, M.parameters !== void 0 && (this.parameters = Object.assign({}, M.parameters)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const TI = /* @__PURE__ */ new vD(), pN = /* @__PURE__ */ new wz(), BA = /* @__PURE__ */ new Zi(), ne = /* @__PURE__ */ new B(), Ie = /* @__PURE__ */ new B(), Te = /* @__PURE__ */ new B(), GA = /* @__PURE__ */ new B(), Ii = /* @__PURE__ */ new B(), Ti = /* @__PURE__ */ new jD(), ui = /* @__PURE__ */ new jD(), gi = /* @__PURE__ */ new jD(), VA = /* @__PURE__ */ new B(), si = /* @__PURE__ */ new B();
class uI extends ZD {
  constructor(M = new iN(), D = new Py()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), M.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = M.morphTargetInfluences.slice()), M.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, M.morphTargetDictionary)), this.material = M.material, this.geometry = M.geometry, this;
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, t = Object.keys(D);
    if (t.length > 0) {
      const N = D[t[0]];
      if (N !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, z = N.length; i < z; i++) {
          const A = N[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = i;
        }
      }
    }
  }
  getVertexPosition(M, D) {
    const t = this.geometry, N = t.attributes.position, i = t.morphAttributes.position, z = t.morphTargetsRelative;
    D.fromBufferAttribute(N, M);
    const A = this.morphTargetInfluences;
    if (i && A) {
      Ii.set(0, 0, 0);
      for (let I = 0, n = i.length; I < n; I++) {
        const T = A[I], u = i[I];
        T !== 0 && (GA.fromBufferAttribute(u, M), z ? Ii.addScaledVector(GA, T) : Ii.addScaledVector(GA.sub(D), T));
      }
      D.add(Ii);
    }
    return this.isSkinnedMesh && this.boneTransform(M, D), D;
  }
  raycast(M, D) {
    const t = this.geometry, N = this.material, i = this.matrixWorld;
    if (N === void 0 || (t.boundingSphere === null && t.computeBoundingSphere(), BA.copy(t.boundingSphere), BA.applyMatrix4(i), M.ray.intersectsSphere(BA) === !1) || (TI.copy(i).invert(), pN.copy(M.ray).applyMatrix4(TI), t.boundingBox !== null && pN.intersectsBox(t.boundingBox) === !1))
      return;
    let z;
    const A = t.index, I = t.attributes.position, n = t.attributes.uv, T = t.attributes.uv2, u = t.groups, g = t.drawRange;
    if (A !== null)
      if (Array.isArray(N))
        for (let s = 0, j = u.length; s < j; s++) {
          const r = u[s], c = N[r.materialIndex], y = Math.max(r.start, g.start), w = Math.min(A.count, Math.min(r.start + r.count, g.start + g.count));
          for (let a = y, C = w; a < C; a += 3) {
            const x = A.getX(a), l = A.getX(a + 1), d = A.getX(a + 2);
            z = ri(this, c, M, pN, n, T, x, l, d), z && (z.faceIndex = Math.floor(a / 3), z.face.materialIndex = r.materialIndex, D.push(z));
          }
        }
      else {
        const s = Math.max(0, g.start), j = Math.min(A.count, g.start + g.count);
        for (let r = s, c = j; r < c; r += 3) {
          const y = A.getX(r), w = A.getX(r + 1), a = A.getX(r + 2);
          z = ri(this, N, M, pN, n, T, y, w, a), z && (z.faceIndex = Math.floor(r / 3), D.push(z));
        }
      }
    else if (I !== void 0)
      if (Array.isArray(N))
        for (let s = 0, j = u.length; s < j; s++) {
          const r = u[s], c = N[r.materialIndex], y = Math.max(r.start, g.start), w = Math.min(I.count, Math.min(r.start + r.count, g.start + g.count));
          for (let a = y, C = w; a < C; a += 3) {
            const x = a, l = a + 1, d = a + 2;
            z = ri(this, c, M, pN, n, T, x, l, d), z && (z.faceIndex = Math.floor(a / 3), z.face.materialIndex = r.materialIndex, D.push(z));
          }
        }
      else {
        const s = Math.max(0, g.start), j = Math.min(I.count, g.start + g.count);
        for (let r = s, c = j; r < c; r += 3) {
          const y = r, w = r + 1, a = r + 2;
          z = ri(this, N, M, pN, n, T, y, w, a), z && (z.faceIndex = Math.floor(r / 3), D.push(z));
        }
      }
  }
}
function Vy(e, M, D, t, N, i, z, A) {
  let I;
  if (M.side === yy ? I = t.intersectTriangle(z, i, N, !0, A) : I = t.intersectTriangle(N, i, z, M.side === uz, A), I === null)
    return null;
  si.copy(A), si.applyMatrix4(e.matrixWorld);
  const n = D.ray.origin.distanceTo(si);
  return n < D.near || n > D.far ? null : {
    distance: n,
    point: si.clone(),
    object: e
  };
}
function ri(e, M, D, t, N, i, z, A, I) {
  e.getVertexPosition(z, ne), e.getVertexPosition(A, Ie), e.getVertexPosition(I, Te);
  const n = Vy(e, M, D, t, ne, Ie, Te, VA);
  if (n) {
    N && (Ti.fromBufferAttribute(N, z), ui.fromBufferAttribute(N, A), gi.fromBufferAttribute(N, I), n.uv = ot.getUV(VA, ne, Ie, Te, Ti, ui, gi, new jD())), i && (Ti.fromBufferAttribute(i, z), ui.fromBufferAttribute(i, A), gi.fromBufferAttribute(i, I), n.uv2 = ot.getUV(VA, ne, Ie, Te, Ti, ui, gi, new jD()));
    const T = {
      a: z,
      b: A,
      c: I,
      normal: new B(),
      materialIndex: 0
    };
    ot.getNormal(ne, Ie, Te, T.normal), n.face = T;
  }
  return n;
}
class Hy extends ZD {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
class hi extends PN {
  constructor(M) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Ut(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.linewidth = M.linewidth, this.linecap = M.linecap, this.linejoin = M.linejoin, this.fog = M.fog, this;
  }
}
const gI = /* @__PURE__ */ new B(), sI = /* @__PURE__ */ new B(), rI = /* @__PURE__ */ new vD(), HA = /* @__PURE__ */ new wz(), ci = /* @__PURE__ */ new Zi();
class Wy extends ZD {
  constructor(M = new iN(), D = new hi()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), this.material = M.material, this.geometry = M.geometry, this;
  }
  computeLineDistances() {
    const M = this.geometry;
    if (M.index === null) {
      const D = M.attributes.position, t = [0];
      for (let N = 1, i = D.count; N < i; N++)
        gI.fromBufferAttribute(D, N - 1), sI.fromBufferAttribute(D, N), t[N] = t[N - 1], t[N] += gI.distanceTo(sI);
      M.setAttribute("lineDistance", new at(t, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(M, D) {
    const t = this.geometry, N = this.matrixWorld, i = M.params.Line.threshold, z = t.drawRange;
    if (t.boundingSphere === null && t.computeBoundingSphere(), ci.copy(t.boundingSphere), ci.applyMatrix4(N), ci.radius += i, M.ray.intersectsSphere(ci) === !1)
      return;
    rI.copy(N).invert(), HA.copy(M.ray).applyMatrix4(rI);
    const A = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), I = A * A, n = new B(), T = new B(), u = new B(), g = new B(), s = this.isLineSegments ? 2 : 1, j = t.index, c = t.attributes.position;
    if (j !== null) {
      const y = Math.max(0, z.start), w = Math.min(j.count, z.start + z.count);
      for (let a = y, C = w - 1; a < C; a += s) {
        const x = j.getX(a), l = j.getX(a + 1);
        if (n.fromBufferAttribute(c, x), T.fromBufferAttribute(c, l), HA.distanceSqToSegment(n, T, g, u) > I)
          continue;
        g.applyMatrix4(this.matrixWorld);
        const L = M.ray.origin.distanceTo(g);
        L < M.near || L > M.far || D.push({
          distance: L,
          // What do we want? intersection point on the ray or on the segment??
          // point: raycaster.ray.at( distance ),
          point: u.clone().applyMatrix4(this.matrixWorld),
          index: a,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    } else {
      const y = Math.max(0, z.start), w = Math.min(c.count, z.start + z.count);
      for (let a = y, C = w - 1; a < C; a += s) {
        if (n.fromBufferAttribute(c, a), T.fromBufferAttribute(c, a + 1), HA.distanceSqToSegment(n, T, g, u) > I)
          continue;
        g.applyMatrix4(this.matrixWorld);
        const l = M.ray.origin.distanceTo(g);
        l < M.near || l > M.far || D.push({
          distance: l,
          // What do we want? intersection point on the ray or on the segment??
          // point: raycaster.ray.at( distance ),
          point: u.clone().applyMatrix4(this.matrixWorld),
          index: a,
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
      const N = D[t[0]];
      if (N !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, z = N.length; i < z; i++) {
          const A = N[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = i;
        }
      }
    }
  }
}
const cI = /* @__PURE__ */ new B(), jI = /* @__PURE__ */ new B();
class yI extends Wy {
  constructor(M, D) {
    super(M, D), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const M = this.geometry;
    if (M.index === null) {
      const D = M.attributes.position, t = [];
      for (let N = 0, i = D.count; N < i; N += 2)
        cI.fromBufferAttribute(D, N), jI.fromBufferAttribute(D, N + 1), t[N] = N === 0 ? 0 : t[N - 1], t[N + 1] = t[N] + cI.distanceTo(jI);
      M.setAttribute("lineDistance", new at(t, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class re extends PN {
  constructor(M) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Ut(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.alphaMap = M.alphaMap, this.size = M.size, this.sizeAttenuation = M.sizeAttenuation, this.fog = M.fog, this;
  }
}
const aI = /* @__PURE__ */ new vD(), sz = /* @__PURE__ */ new wz(), ji = /* @__PURE__ */ new Zi(), yi = /* @__PURE__ */ new B();
class WA extends ZD {
  constructor(M = new iN(), D = new re()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), this.material = M.material, this.geometry = M.geometry, this;
  }
  raycast(M, D) {
    const t = this.geometry, N = this.matrixWorld, i = M.params.Points.threshold, z = t.drawRange;
    if (t.boundingSphere === null && t.computeBoundingSphere(), ji.copy(t.boundingSphere), ji.applyMatrix4(N), ji.radius += i, M.ray.intersectsSphere(ji) === !1)
      return;
    aI.copy(N).invert(), sz.copy(M.ray).applyMatrix4(aI);
    const A = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), I = A * A, n = t.index, u = t.attributes.position;
    if (n !== null) {
      const g = Math.max(0, z.start), s = Math.min(n.count, z.start + z.count);
      for (let j = g, r = s; j < r; j++) {
        const c = n.getX(j);
        yi.fromBufferAttribute(u, c), oI(yi, c, I, N, M, D, this);
      }
    } else {
      const g = Math.max(0, z.start), s = Math.min(u.count, z.start + z.count);
      for (let j = g, r = s; j < r; j++)
        yi.fromBufferAttribute(u, j), oI(yi, j, I, N, M, D, this);
    }
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, t = Object.keys(D);
    if (t.length > 0) {
      const N = D[t[0]];
      if (N !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, z = N.length; i < z; i++) {
          const A = N[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = i;
        }
      }
    }
  }
}
function oI(e, M, D, t, N, i, z) {
  const A = sz.distanceSqToPoint(e);
  if (A < D) {
    const I = new B();
    sz.closestPointToPoint(e, I), I.applyMatrix4(t);
    const n = N.ray.origin.distanceTo(I);
    if (n < N.near || n > N.far)
      return;
    i.push({
      distance: n,
      distanceToRay: Math.sqrt(A),
      point: I,
      index: M,
      face: null,
      object: z
    });
  }
}
class Xy extends PN {
  constructor(M) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new Ut(16777215), this.specular = new Ut(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ut(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = hy, this.normalScale = new jD(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = CT, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.specular.copy(M.specular), this.shininess = M.shininess, this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.emissive.copy(M.emissive), this.emissiveMap = M.emissiveMap, this.emissiveIntensity = M.emissiveIntensity, this.bumpMap = M.bumpMap, this.bumpScale = M.bumpScale, this.normalMap = M.normalMap, this.normalMapType = M.normalMapType, this.normalScale.copy(M.normalScale), this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.flatShading = M.flatShading, this.fog = M.fog, this;
  }
}
const CI = {
  enabled: !1,
  files: {},
  add: function(e, M) {
    this.enabled !== !1 && (this.files[e] = M);
  },
  get: function(e) {
    if (this.enabled !== !1)
      return this.files[e];
  },
  remove: function(e) {
    delete this.files[e];
  },
  clear: function() {
    this.files = {};
  }
};
class qy {
  constructor(M, D, t) {
    const N = this;
    let i = !1, z = 0, A = 0, I;
    const n = [];
    this.onStart = void 0, this.onLoad = M, this.onProgress = D, this.onError = t, this.itemStart = function(T) {
      A++, i === !1 && N.onStart !== void 0 && N.onStart(T, z, A), i = !0;
    }, this.itemEnd = function(T) {
      z++, N.onProgress !== void 0 && N.onProgress(T, z, A), z === A && (i = !1, N.onLoad !== void 0 && N.onLoad());
    }, this.itemError = function(T) {
      N.onError !== void 0 && N.onError(T);
    }, this.resolveURL = function(T) {
      return I ? I(T) : T;
    }, this.setURLModifier = function(T) {
      return I = T, this;
    }, this.addHandler = function(T, u) {
      return n.push(T, u), this;
    }, this.removeHandler = function(T) {
      const u = n.indexOf(T);
      return u !== -1 && n.splice(u, 2), this;
    }, this.getHandler = function(T) {
      for (let u = 0, g = n.length; u < g; u += 2) {
        const s = n[u], j = n[u + 1];
        if (s.global && (s.lastIndex = 0), s.test(T))
          return j;
      }
      return null;
    };
  }
}
const $y = /* @__PURE__ */ new qy();
class xT {
  constructor(M) {
    this.manager = M !== void 0 ? M : $y, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(M, D) {
    const t = this;
    return new Promise(function(N, i) {
      t.load(M, N, D, i);
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
const jt = {};
class Jy extends Error {
  constructor(M, D) {
    super(M), this.response = D;
  }
}
class M0 extends xT {
  constructor(M) {
    super(M);
  }
  load(M, D, t, N) {
    M === void 0 && (M = ""), this.path !== void 0 && (M = this.path + M), M = this.manager.resolveURL(M);
    const i = CI.get(M);
    if (i !== void 0)
      return this.manager.itemStart(M), setTimeout(() => {
        D && D(i), this.manager.itemEnd(M);
      }, 0), i;
    if (jt[M] !== void 0) {
      jt[M].push({
        onLoad: D,
        onProgress: t,
        onError: N
      });
      return;
    }
    jt[M] = [], jt[M].push({
      onLoad: D,
      onProgress: t,
      onError: N
    });
    const z = new Request(M, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin"
      // An abort controller could be added within a future PR
    }), A = this.mimeType, I = this.responseType;
    fetch(z).then((n) => {
      if (n.status === 200 || n.status === 0) {
        if (n.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || n.body === void 0 || n.body.getReader === void 0)
          return n;
        const T = jt[M], u = n.body.getReader(), g = n.headers.get("Content-Length") || n.headers.get("X-File-Size"), s = g ? parseInt(g) : 0, j = s !== 0;
        let r = 0;
        const c = new ReadableStream({
          start(y) {
            w();
            function w() {
              u.read().then(({ done: a, value: C }) => {
                if (a)
                  y.close();
                else {
                  r += C.byteLength;
                  const x = new ProgressEvent("progress", { lengthComputable: j, loaded: r, total: s });
                  for (let l = 0, d = T.length; l < d; l++) {
                    const L = T[l];
                    L.onProgress && L.onProgress(x);
                  }
                  y.enqueue(C), w();
                }
              });
            }
          }
        });
        return new Response(c);
      } else
        throw new Jy(`fetch for "${n.url}" responded with ${n.status}: ${n.statusText}`, n);
    }).then((n) => {
      switch (I) {
        case "arraybuffer":
          return n.arrayBuffer();
        case "blob":
          return n.blob();
        case "document":
          return n.text().then((T) => new DOMParser().parseFromString(T, A));
        case "json":
          return n.json();
        default:
          if (A === void 0)
            return n.text();
          {
            const u = /charset="?([^;"\s]*)"?/i.exec(A), g = u && u[1] ? u[1].toLowerCase() : void 0, s = new TextDecoder(g);
            return n.arrayBuffer().then((j) => s.decode(j));
          }
      }
    }).then((n) => {
      CI.add(M, n);
      const T = jt[M];
      delete jt[M];
      for (let u = 0, g = T.length; u < g; u++) {
        const s = T[u];
        s.onLoad && s.onLoad(n);
      }
    }).catch((n) => {
      const T = jt[M];
      if (T === void 0)
        throw this.manager.itemError(M), n;
      delete jt[M];
      for (let u = 0, g = T.length; u < g; u++) {
        const s = T[u];
        s.onError && s.onError(n);
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
  revision: oT
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = oT);
const D0 = /^[og]\s*(.+)?/, t0 = /^mtllib /, N0 = /^usemtl /, e0 = /^usemap /, LI = /\s+/, wI = new B(), XA = new B(), xI = new B(), OI = new B(), mD = new B(), ai = new Ut();
function i0() {
  const e = {
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
        startMaterial: function(N, i) {
          const z = this._finalize(!1);
          z && (z.inherited || z.groupCount <= 0) && this.materials.splice(z.index, 1);
          const A = {
            index: this.materials.length,
            name: N || "",
            mtllib: Array.isArray(i) && i.length > 0 ? i[i.length - 1] : "",
            smooth: z !== void 0 ? z.smooth : this.smooth,
            groupStart: z !== void 0 ? z.groupEnd : 0,
            groupEnd: -1,
            groupCount: -1,
            inherited: !1,
            clone: function(I) {
              const n = {
                index: typeof I == "number" ? I : this.index,
                name: this.name,
                mtllib: this.mtllib,
                smooth: this.smooth,
                groupStart: 0,
                groupEnd: -1,
                groupCount: -1,
                inherited: !1
              };
              return n.clone = this.clone.bind(n), n;
            }
          };
          return this.materials.push(A), A;
        },
        currentMaterial: function() {
          if (this.materials.length > 0)
            return this.materials[this.materials.length - 1];
        },
        _finalize: function(N) {
          const i = this.currentMaterial();
          if (i && i.groupEnd === -1 && (i.groupEnd = this.geometry.vertices.length / 3, i.groupCount = i.groupEnd - i.groupStart, i.inherited = !1), N && this.materials.length > 1)
            for (let z = this.materials.length - 1; z >= 0; z--)
              this.materials[z].groupCount <= 0 && this.materials.splice(z, 1);
          return N && this.materials.length === 0 && this.materials.push({
            name: "",
            smooth: this.smooth
          }), i;
        }
      }, t && t.name && typeof t.clone == "function") {
        const N = t.clone(0);
        N.inherited = !0, this.object.materials.push(N);
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
      const N = this.vertices, i = this.object.geometry.vertices;
      i.push(N[M + 0], N[M + 1], N[M + 2]), i.push(N[D + 0], N[D + 1], N[D + 2]), i.push(N[t + 0], N[t + 1], N[t + 2]);
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
      const N = this.normals, i = this.object.geometry.normals;
      i.push(N[M + 0], N[M + 1], N[M + 2]), i.push(N[D + 0], N[D + 1], N[D + 2]), i.push(N[t + 0], N[t + 1], N[t + 2]);
    },
    addFaceNormal: function(M, D, t) {
      const N = this.vertices, i = this.object.geometry.normals;
      wI.fromArray(N, M), XA.fromArray(N, D), xI.fromArray(N, t), mD.subVectors(xI, XA), OI.subVectors(wI, XA), mD.cross(OI), mD.normalize(), i.push(mD.x, mD.y, mD.z), i.push(mD.x, mD.y, mD.z), i.push(mD.x, mD.y, mD.z);
    },
    addColor: function(M, D, t) {
      const N = this.colors, i = this.object.geometry.colors;
      N[M] !== void 0 && i.push(N[M + 0], N[M + 1], N[M + 2]), N[D] !== void 0 && i.push(N[D + 0], N[D + 1], N[D + 2]), N[t] !== void 0 && i.push(N[t + 0], N[t + 1], N[t + 2]);
    },
    addUV: function(M, D, t) {
      const N = this.uvs, i = this.object.geometry.uvs;
      i.push(N[M + 0], N[M + 1]), i.push(N[D + 0], N[D + 1]), i.push(N[t + 0], N[t + 1]);
    },
    addDefaultUV: function() {
      const M = this.object.geometry.uvs;
      M.push(0, 0), M.push(0, 0), M.push(0, 0);
    },
    addUVLine: function(M) {
      const D = this.uvs;
      this.object.geometry.uvs.push(D[M + 0], D[M + 1]);
    },
    addFace: function(M, D, t, N, i, z, A, I, n) {
      const T = this.vertices.length;
      let u = this.parseVertexIndex(M, T), g = this.parseVertexIndex(D, T), s = this.parseVertexIndex(t, T);
      if (this.addVertex(u, g, s), this.addColor(u, g, s), A !== void 0 && A !== "") {
        const j = this.normals.length;
        u = this.parseNormalIndex(A, j), g = this.parseNormalIndex(I, j), s = this.parseNormalIndex(n, j), this.addNormal(u, g, s);
      } else
        this.addFaceNormal(u, g, s);
      if (N !== void 0 && N !== "") {
        const j = this.uvs.length;
        u = this.parseUVIndex(N, j), g = this.parseUVIndex(i, j), s = this.parseUVIndex(z, j), this.addUV(u, g, s), this.object.geometry.hasUVIndices = !0;
      } else
        this.addDefaultUV();
    },
    addPointGeometry: function(M) {
      this.object.geometry.type = "Points";
      const D = this.vertices.length;
      for (let t = 0, N = M.length; t < N; t++) {
        const i = this.parseVertexIndex(M[t], D);
        this.addVertexPoint(i), this.addColor(i);
      }
    },
    addLineGeometry: function(M, D) {
      this.object.geometry.type = "Line";
      const t = this.vertices.length, N = this.uvs.length;
      for (let i = 0, z = M.length; i < z; i++)
        this.addVertexLine(this.parseVertexIndex(M[i], t));
      for (let i = 0, z = D.length; i < z; i++)
        this.addUVLine(this.parseUVIndex(D[i], N));
    }
  };
  return e.startObject("", !1), e;
}
class A0 extends xT {
  constructor(M) {
    super(M), this.materials = null;
  }
  load(M, D, t, N) {
    const i = this, z = new M0(this.manager);
    z.setPath(this.path), z.setRequestHeader(this.requestHeader), z.setWithCredentials(this.withCredentials), z.load(M, function(A) {
      try {
        D(i.parse(A));
      } catch (I) {
        N ? N(I) : console.error(I), i.manager.itemError(M);
      }
    }, t, N);
  }
  setMaterials(M) {
    return this.materials = M, this;
  }
  parse(M) {
    const D = new i0();
    M.indexOf(`\r
`) !== -1 && (M = M.replace(/\r\n/g, `
`)), M.indexOf(`\\
`) !== -1 && (M = M.replace(/\\\n/g, ""));
    const t = M.split(`
`);
    let N = [];
    for (let A = 0, I = t.length; A < I; A++) {
      const n = t[A].trimStart();
      if (n.length === 0)
        continue;
      const T = n.charAt(0);
      if (T !== "#")
        if (T === "v") {
          const u = n.split(LI);
          switch (u[0]) {
            case "v":
              D.vertices.push(
                parseFloat(u[1]),
                parseFloat(u[2]),
                parseFloat(u[3])
              ), u.length >= 7 ? (ai.setRGB(
                parseFloat(u[4]),
                parseFloat(u[5]),
                parseFloat(u[6])
              ).convertSRGBToLinear(), D.colors.push(ai.r, ai.g, ai.b)) : D.colors.push(void 0, void 0, void 0);
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
          const g = n.slice(1).trim().split(LI), s = [];
          for (let r = 0, c = g.length; r < c; r++) {
            const y = g[r];
            if (y.length > 0) {
              const w = y.split("/");
              s.push(w);
            }
          }
          const j = s[0];
          for (let r = 1, c = s.length - 1; r < c; r++) {
            const y = s[r], w = s[r + 1];
            D.addFace(
              j[0],
              y[0],
              w[0],
              j[1],
              y[1],
              w[1],
              j[2],
              y[2],
              w[2]
            );
          }
        } else if (T === "l") {
          const u = n.substring(1).trim().split(" ");
          let g = [];
          const s = [];
          if (n.indexOf("/") === -1)
            g = u;
          else
            for (let j = 0, r = u.length; j < r; j++) {
              const c = u[j].split("/");
              c[0] !== "" && g.push(c[0]), c[1] !== "" && s.push(c[1]);
            }
          D.addLineGeometry(g, s);
        } else if (T === "p") {
          const g = n.slice(1).trim().split(" ");
          D.addPointGeometry(g);
        } else if ((N = D0.exec(n)) !== null) {
          const u = (" " + N[0].slice(1).trim()).slice(1);
          D.startObject(u);
        } else if (N0.test(n))
          D.object.startMaterial(n.substring(7).trim(), D.materialLibraries);
        else if (t0.test(n))
          D.materialLibraries.push(n.substring(7).trim());
        else if (e0.test(n))
          console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
        else if (T === "s") {
          if (N = n.split(" "), N.length > 1) {
            const g = N[1].trim().toLowerCase();
            D.object.smooth = g !== "0" && g !== "off";
          } else
            D.object.smooth = !0;
          const u = D.object.currentMaterial();
          u && (u.smooth = D.object.smooth);
        } else {
          if (n === "\0")
            continue;
          console.warn('THREE.OBJLoader: Unexpected line: "' + n + '"');
        }
    }
    D.finalize();
    const i = new Hy();
    if (i.materialLibraries = [].concat(D.materialLibraries), !(D.objects.length === 1 && D.objects[0].geometry.vertices.length === 0) === !0)
      for (let A = 0, I = D.objects.length; A < I; A++) {
        const n = D.objects[A], T = n.geometry, u = n.materials, g = T.type === "Line", s = T.type === "Points";
        let j = !1;
        if (T.vertices.length === 0)
          continue;
        const r = new iN();
        r.setAttribute("position", new at(T.vertices, 3)), T.normals.length > 0 && r.setAttribute("normal", new at(T.normals, 3)), T.colors.length > 0 && (j = !0, r.setAttribute("color", new at(T.colors, 3))), T.hasUVIndices === !0 && r.setAttribute("uv", new at(T.uvs, 2));
        const c = [];
        for (let w = 0, a = u.length; w < a; w++) {
          const C = u[w], x = C.name + "_" + C.smooth + "_" + j;
          let l = D.materials[x];
          if (this.materials !== null) {
            if (l = this.materials.create(C.name), g && l && !(l instanceof hi)) {
              const d = new hi();
              PN.prototype.copy.call(d, l), d.color.copy(l.color), l = d;
            } else if (s && l && !(l instanceof re)) {
              const d = new re({ size: 10, sizeAttenuation: !1 });
              PN.prototype.copy.call(d, l), d.color.copy(l.color), d.map = l.map, l = d;
            }
          }
          l === void 0 && (g ? l = new hi() : s ? l = new re({ size: 1, sizeAttenuation: !1 }) : l = new Xy(), l.name = C.name, l.flatShading = !C.smooth, l.vertexColors = j, D.materials[x] = l), c.push(l);
        }
        let y;
        if (c.length > 1) {
          for (let w = 0, a = u.length; w < a; w++) {
            const C = u[w];
            r.addGroup(C.groupStart, C.groupCount, w);
          }
          g ? y = new yI(r, c) : s ? y = new WA(r, c) : y = new uI(r, c);
        } else
          g ? y = new yI(r, c[0]) : s ? y = new WA(r, c[0]) : y = new uI(r, c[0]);
        y.name = n.name, i.add(y);
      }
    else if (D.vertices.length > 0) {
      const A = new re({ size: 1, sizeAttenuation: !1 }), I = new iN();
      I.setAttribute("position", new at(D.vertices, 3)), D.colors.length > 0 && D.colors[0] !== void 0 && (I.setAttribute("color", new at(D.colors, 3)), A.vertexColors = !0);
      const n = new WA(I, A);
      i.add(n);
    }
    return i;
  }
}
const z0 = new A0(), n0 = (e) => {
  const M = new GN().setFromObject(e), D = new f();
  M.getSize(D);
  const t = new f(), N = e.geometry.attributes.position, i = e.geometry.attributes.uv;
  for (let z = 0; z < N.count; z += 1)
    t.fromBufferAttribute(N, z), i.setXY(
      z,
      (t.x - M.min.x) / D.x,
      (t.y - M.min.y) / D.y
    );
}, I0 = (e, M) => new Promise((D) => {
  z0.load(e, (t) => {
    const N = new aD();
    t.traverse((i) => {
      const z = i;
      if (!z.material || !z.geometry)
        return;
      z.material = new AT({ color: M }), z.geometry.center();
      const A = new JD(z.geometry, z.material), I = 8.6;
      A.rotateX(Math.PI / 2), A.scale.set(-I, I, I), N.add(A);
    }), D(N);
  });
class u0 extends se {
  home;
  lookingAtSomething;
  color;
  constructor(M, D) {
    super(), this.home = M, this.lookAt(M), this.lookingAtSomething = !1, this.color = D, this.position.setY(5);
  }
  async init() {
    return this.add(await I0(T0, this.color)), this;
  }
  animation(M, D) {
    const t = new aD();
    t.lookAt(this.lookingAtSomething ? D : this.home), this.quaternion.slerp(t.quaternion, 10 * M);
  }
}
class tt {
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
    let t, N = this.getPoint(0), i = 0;
    D.push(0);
    for (let z = 1; z <= M; z++)
      t = this.getPoint(z / M), i += t.distanceTo(N), D.push(i), N = t;
    return this.cacheArcLengths = D, D;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(M, D) {
    const t = this.getLengths();
    let N = 0;
    const i = t.length;
    let z;
    D ? z = D : z = M * t[i - 1];
    let A = 0, I = i - 1, n;
    for (; A <= I; )
      if (N = Math.floor(A + (I - A) / 2), n = t[N] - z, n < 0)
        A = N + 1;
      else if (n > 0)
        I = N - 1;
      else {
        I = N;
        break;
      }
    if (N = I, t[N] === z)
      return N / (i - 1);
    const T = t[N], g = t[N + 1] - T, s = (z - T) / g;
    return (N + s) / (i - 1);
  }
  // Returns a unit vector tangent at t
  // In case any sub curve does not implement its tangent derivation,
  // 2 points a small delta apart will be used to find its gradient
  // which seems to give a reasonable approximation
  getTangent(M, D) {
    let N = M - 1e-4, i = M + 1e-4;
    N < 0 && (N = 0), i > 1 && (i = 1);
    const z = this.getPoint(N), A = this.getPoint(i), I = D || (z.isVector2 ? new gM() : new f());
    return I.copy(A).sub(z).normalize(), I;
  }
  getTangentAt(M, D) {
    const t = this.getUtoTmapping(M);
    return this.getTangent(t, D);
  }
  computeFrenetFrames(M, D) {
    const t = new f(), N = [], i = [], z = [], A = new f(), I = new ND();
    for (let s = 0; s <= M; s++) {
      const j = s / M;
      N[s] = this.getTangentAt(j, new f());
    }
    i[0] = new f(), z[0] = new f();
    let n = Number.MAX_VALUE;
    const T = Math.abs(N[0].x), u = Math.abs(N[0].y), g = Math.abs(N[0].z);
    T <= n && (n = T, t.set(1, 0, 0)), u <= n && (n = u, t.set(0, 1, 0)), g <= n && t.set(0, 0, 1), A.crossVectors(N[0], t).normalize(), i[0].crossVectors(N[0], A), z[0].crossVectors(N[0], i[0]);
    for (let s = 1; s <= M; s++) {
      if (i[s] = i[s - 1].clone(), z[s] = z[s - 1].clone(), A.crossVectors(N[s - 1], N[s]), A.length() > Number.EPSILON) {
        A.normalize();
        const j = Math.acos(cD(N[s - 1].dot(N[s]), -1, 1));
        i[s].applyMatrix4(I.makeRotationAxis(A, j));
      }
      z[s].crossVectors(N[s], i[s]);
    }
    if (D === !0) {
      let s = Math.acos(cD(i[0].dot(i[M]), -1, 1));
      s /= M, N[0].dot(A.crossVectors(i[0], i[M])) > 0 && (s = -s);
      for (let j = 1; j <= M; j++)
        i[j].applyMatrix4(I.makeRotationAxis(N[j], s * j)), z[j].crossVectors(N[j], i[j]);
    }
    return {
      tangents: N,
      normals: i,
      binormals: z
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
        version: 4.5,
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
class xz extends tt {
  constructor(M = 0, D = 0, t = 1, N = 1, i = 0, z = Math.PI * 2, A = !1, I = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = M, this.aY = D, this.xRadius = t, this.yRadius = N, this.aStartAngle = i, this.aEndAngle = z, this.aClockwise = A, this.aRotation = I;
  }
  getPoint(M, D) {
    const t = D || new gM(), N = Math.PI * 2;
    let i = this.aEndAngle - this.aStartAngle;
    const z = Math.abs(i) < Number.EPSILON;
    for (; i < 0; )
      i += N;
    for (; i > N; )
      i -= N;
    i < Number.EPSILON && (z ? i = 0 : i = N), this.aClockwise === !0 && !z && (i === N ? i = -N : i = i - N);
    const A = this.aStartAngle + M * i;
    let I = this.aX + this.xRadius * Math.cos(A), n = this.aY + this.yRadius * Math.sin(A);
    if (this.aRotation !== 0) {
      const T = Math.cos(this.aRotation), u = Math.sin(this.aRotation), g = I - this.aX, s = n - this.aY;
      I = g * T - s * u + this.aX, n = g * u + s * T + this.aY;
    }
    return t.set(I, n);
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
class g0 extends xz {
  constructor(M, D, t, N, i, z) {
    super(M, D, t, t, N, i, z), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Oz() {
  let e = 0, M = 0, D = 0, t = 0;
  function N(i, z, A, I) {
    e = i, M = A, D = -3 * i + 3 * z - 2 * A - I, t = 2 * i - 2 * z + A + I;
  }
  return {
    initCatmullRom: function(i, z, A, I, n) {
      N(z, A, n * (A - i), n * (I - z));
    },
    initNonuniformCatmullRom: function(i, z, A, I, n, T, u) {
      let g = (z - i) / n - (A - i) / (n + T) + (A - z) / T, s = (A - z) / T - (I - z) / (T + u) + (I - A) / u;
      g *= T, s *= T, N(z, A, g, s);
    },
    calc: function(i) {
      const z = i * i, A = z * i;
      return e + M * i + D * z + t * A;
    }
  };
}
const oi = /* @__PURE__ */ new f(), qA = /* @__PURE__ */ new Oz(), $A = /* @__PURE__ */ new Oz(), JA = /* @__PURE__ */ new Oz();
class s0 extends tt {
  constructor(M = [], D = !1, t = "centripetal", N = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = M, this.closed = D, this.curveType = t, this.tension = N;
  }
  getPoint(M, D = new f()) {
    const t = D, N = this.points, i = N.length, z = (i - (this.closed ? 0 : 1)) * M;
    let A = Math.floor(z), I = z - A;
    this.closed ? A += A > 0 ? 0 : (Math.floor(Math.abs(A) / i) + 1) * i : I === 0 && A === i - 1 && (A = i - 2, I = 1);
    let n, T;
    this.closed || A > 0 ? n = N[(A - 1) % i] : (oi.subVectors(N[0], N[1]).add(N[0]), n = oi);
    const u = N[A % i], g = N[(A + 1) % i];
    if (this.closed || A + 2 < i ? T = N[(A + 2) % i] : (oi.subVectors(N[i - 1], N[i - 2]).add(N[i - 1]), T = oi), this.curveType === "centripetal" || this.curveType === "chordal") {
      const s = this.curveType === "chordal" ? 0.5 : 0.25;
      let j = Math.pow(n.distanceToSquared(u), s), r = Math.pow(u.distanceToSquared(g), s), c = Math.pow(g.distanceToSquared(T), s);
      r < 1e-4 && (r = 1), j < 1e-4 && (j = r), c < 1e-4 && (c = r), qA.initNonuniformCatmullRom(n.x, u.x, g.x, T.x, j, r, c), $A.initNonuniformCatmullRom(n.y, u.y, g.y, T.y, j, r, c), JA.initNonuniformCatmullRom(n.z, u.z, g.z, T.z, j, r, c);
    } else
      this.curveType === "catmullrom" && (qA.initCatmullRom(n.x, u.x, g.x, T.x, this.tension), $A.initCatmullRom(n.y, u.y, g.y, T.y, this.tension), JA.initCatmullRom(n.z, u.z, g.z, T.z, this.tension));
    return t.set(
      qA.calc(I),
      $A.calc(I),
      JA.calc(I)
    ), t;
  }
  copy(M) {
    super.copy(M), this.points = [];
    for (let D = 0, t = M.points.length; D < t; D++) {
      const N = M.points[D];
      this.points.push(N.clone());
    }
    return this.closed = M.closed, this.curveType = M.curveType, this.tension = M.tension, this;
  }
  toJSON() {
    const M = super.toJSON();
    M.points = [];
    for (let D = 0, t = this.points.length; D < t; D++) {
      const N = this.points[D];
      M.points.push(N.toArray());
    }
    return M.closed = this.closed, M.curveType = this.curveType, M.tension = this.tension, M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.points = [];
    for (let D = 0, t = M.points.length; D < t; D++) {
      const N = M.points[D];
      this.points.push(new f().fromArray(N));
    }
    return this.closed = M.closed, this.curveType = M.curveType, this.tension = M.tension, this;
  }
}
function EI(e, M, D, t, N) {
  const i = (t - M) * 0.5, z = (N - D) * 0.5, A = e * e, I = e * A;
  return (2 * D - 2 * t + i + z) * I + (-3 * D + 3 * t - 2 * i - z) * A + i * e + D;
}
function r0(e, M) {
  const D = 1 - e;
  return D * D * M;
}
function c0(e, M) {
  return 2 * (1 - e) * e * M;
}
function j0(e, M) {
  return e * e * M;
}
function ce(e, M, D, t) {
  return r0(e, M) + c0(e, D) + j0(e, t);
}
function y0(e, M) {
  const D = 1 - e;
  return D * D * D * M;
}
function a0(e, M) {
  const D = 1 - e;
  return 3 * D * D * e * M;
}
function o0(e, M) {
  return 3 * (1 - e) * e * e * M;
}
function C0(e, M) {
  return e * e * e * M;
}
function je(e, M, D, t, N) {
  return y0(e, M) + a0(e, D) + o0(e, t) + C0(e, N);
}
class OT extends tt {
  constructor(M = new gM(), D = new gM(), t = new gM(), N = new gM()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = M, this.v1 = D, this.v2 = t, this.v3 = N;
  }
  getPoint(M, D = new gM()) {
    const t = D, N = this.v0, i = this.v1, z = this.v2, A = this.v3;
    return t.set(
      je(M, N.x, i.x, z.x, A.x),
      je(M, N.y, i.y, z.y, A.y)
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
class L0 extends tt {
  constructor(M = new f(), D = new f(), t = new f(), N = new f()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = M, this.v1 = D, this.v2 = t, this.v3 = N;
  }
  getPoint(M, D = new f()) {
    const t = D, N = this.v0, i = this.v1, z = this.v2, A = this.v3;
    return t.set(
      je(M, N.x, i.x, z.x, A.x),
      je(M, N.y, i.y, z.y, A.y),
      je(M, N.z, i.z, z.z, A.z)
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
class Ez extends tt {
  constructor(M = new gM(), D = new gM()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = M, this.v2 = D;
  }
  getPoint(M, D = new gM()) {
    const t = D;
    return M === 1 ? t.copy(this.v2) : (t.copy(this.v2).sub(this.v1), t.multiplyScalar(M).add(this.v1)), t;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(M, D) {
    return this.getPoint(M, D);
  }
  getTangent(M, D) {
    const t = D || new gM();
    return t.copy(this.v2).sub(this.v1).normalize(), t;
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
class w0 extends tt {
  constructor(M = new f(), D = new f()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = M, this.v2 = D;
  }
  getPoint(M, D = new f()) {
    const t = D;
    return M === 1 ? t.copy(this.v2) : (t.copy(this.v2).sub(this.v1), t.multiplyScalar(M).add(this.v1)), t;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(M, D) {
    return this.getPoint(M, D);
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
class ET extends tt {
  constructor(M = new gM(), D = new gM(), t = new gM()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = M, this.v1 = D, this.v2 = t;
  }
  getPoint(M, D = new gM()) {
    const t = D, N = this.v0, i = this.v1, z = this.v2;
    return t.set(
      ce(M, N.x, i.x, z.x),
      ce(M, N.y, i.y, z.y)
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
class x0 extends tt {
  constructor(M = new f(), D = new f(), t = new f()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = M, this.v1 = D, this.v2 = t;
  }
  getPoint(M, D = new f()) {
    const t = D, N = this.v0, i = this.v1, z = this.v2;
    return t.set(
      ce(M, N.x, i.x, z.x),
      ce(M, N.y, i.y, z.y),
      ce(M, N.z, i.z, z.z)
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
class lT extends tt {
  constructor(M = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = M;
  }
  getPoint(M, D = new gM()) {
    const t = D, N = this.points, i = (N.length - 1) * M, z = Math.floor(i), A = i - z, I = N[z === 0 ? z : z - 1], n = N[z], T = N[z > N.length - 2 ? N.length - 1 : z + 1], u = N[z > N.length - 3 ? N.length - 1 : z + 2];
    return t.set(
      EI(A, I.x, n.x, T.x, u.x),
      EI(A, I.y, n.y, T.y, u.y)
    ), t;
  }
  copy(M) {
    super.copy(M), this.points = [];
    for (let D = 0, t = M.points.length; D < t; D++) {
      const N = M.points[D];
      this.points.push(N.clone());
    }
    return this;
  }
  toJSON() {
    const M = super.toJSON();
    M.points = [];
    for (let D = 0, t = this.points.length; D < t; D++) {
      const N = this.points[D];
      M.points.push(N.toArray());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.points = [];
    for (let D = 0, t = M.points.length; D < t; D++) {
      const N = M.points[D];
      this.points.push(new gM().fromArray(N));
    }
    return this;
  }
}
const O0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArcCurve: g0,
  CatmullRomCurve3: s0,
  CubicBezierCurve: OT,
  CubicBezierCurve3: L0,
  EllipseCurve: xz,
  LineCurve: Ez,
  LineCurve3: w0,
  QuadraticBezierCurve: ET,
  QuadraticBezierCurve3: x0,
  SplineCurve: lT
}, Symbol.toStringTag, { value: "Module" }));
class E0 extends tt {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(M) {
    this.curves.push(M);
  }
  closePath() {
    const M = this.curves[0].getPoint(0), D = this.curves[this.curves.length - 1].getPoint(1);
    M.equals(D) || this.curves.push(new Ez(D, M));
  }
  // To get accurate point with reference to
  // entire path distance at time t,
  // following has to be done:
  // 1. Length of each sub path have to be known
  // 2. Locate and identify type of curve
  // 3. Get t for the curve
  // 4. Return curve.getPointAt(t')
  getPoint(M, D) {
    const t = M * this.getLength(), N = this.getCurveLengths();
    let i = 0;
    for (; i < N.length; ) {
      if (N[i] >= t) {
        const z = N[i] - t, A = this.curves[i], I = A.getLength(), n = I === 0 ? 0 : 1 - z / I;
        return A.getPointAt(n, D);
      }
      i++;
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
    for (let t = 0, N = this.curves.length; t < N; t++)
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
    for (let N = 0, i = this.curves; N < i.length; N++) {
      const z = i[N], A = z.isEllipseCurve ? M * 2 : z.isLineCurve || z.isLineCurve3 ? 1 : z.isSplineCurve ? M * z.points.length : M, I = z.getPoints(A);
      for (let n = 0; n < I.length; n++) {
        const T = I[n];
        t && t.equals(T) || (D.push(T), t = T);
      }
    }
    return this.autoClose && D.length > 1 && !D[D.length - 1].equals(D[0]) && D.push(D[0]), D;
  }
  copy(M) {
    super.copy(M), this.curves = [];
    for (let D = 0, t = M.curves.length; D < t; D++) {
      const N = M.curves[D];
      this.curves.push(N.clone());
    }
    return this.autoClose = M.autoClose, this;
  }
  toJSON() {
    const M = super.toJSON();
    M.autoClose = this.autoClose, M.curves = [];
    for (let D = 0, t = this.curves.length; D < t; D++) {
      const N = this.curves[D];
      M.curves.push(N.toJSON());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.autoClose = M.autoClose, this.curves = [];
    for (let D = 0, t = M.curves.length; D < t; D++) {
      const N = M.curves[D];
      this.curves.push(new O0[N.type]().fromJSON(N));
    }
    return this;
  }
}
class lI extends E0 {
  constructor(M) {
    super(), this.type = "Path", this.currentPoint = new gM(), M && this.setFromPoints(M);
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
    const t = new Ez(this.currentPoint.clone(), new gM(M, D));
    return this.curves.push(t), this.currentPoint.set(M, D), this;
  }
  quadraticCurveTo(M, D, t, N) {
    const i = new ET(
      this.currentPoint.clone(),
      new gM(M, D),
      new gM(t, N)
    );
    return this.curves.push(i), this.currentPoint.set(t, N), this;
  }
  bezierCurveTo(M, D, t, N, i, z) {
    const A = new OT(
      this.currentPoint.clone(),
      new gM(M, D),
      new gM(t, N),
      new gM(i, z)
    );
    return this.curves.push(A), this.currentPoint.set(i, z), this;
  }
  splineThru(M) {
    const D = [this.currentPoint.clone()].concat(M), t = new lT(D);
    return this.curves.push(t), this.currentPoint.copy(M[M.length - 1]), this;
  }
  arc(M, D, t, N, i, z) {
    const A = this.currentPoint.x, I = this.currentPoint.y;
    return this.absarc(
      M + A,
      D + I,
      t,
      N,
      i,
      z
    ), this;
  }
  absarc(M, D, t, N, i, z) {
    return this.absellipse(M, D, t, t, N, i, z), this;
  }
  ellipse(M, D, t, N, i, z, A, I) {
    const n = this.currentPoint.x, T = this.currentPoint.y;
    return this.absellipse(M + n, D + T, t, N, i, z, A, I), this;
  }
  absellipse(M, D, t, N, i, z, A, I) {
    const n = new xz(M, D, t, N, i, z, A, I);
    if (this.curves.length > 0) {
      const u = n.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(n);
    const T = n.getPoint(1);
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
class hT extends lI {
  constructor(M) {
    super(M), this.uuid = FN(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(M) {
    const D = [];
    for (let t = 0, N = this.holes.length; t < N; t++)
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
      const N = M.holes[D];
      this.holes.push(N.clone());
    }
    return this;
  }
  toJSON() {
    const M = super.toJSON();
    M.uuid = this.uuid, M.holes = [];
    for (let D = 0, t = this.holes.length; D < t; D++) {
      const N = this.holes[D];
      M.holes.push(N.toJSON());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.uuid = M.uuid, this.holes = [];
    for (let D = 0, t = M.holes.length; D < t; D++) {
      const N = M.holes[D];
      this.holes.push(new lI().fromJSON(N));
    }
    return this;
  }
}
const l0 = {
  triangulate: function(e, M, D = 2) {
    const t = M && M.length, N = t ? M[0] * D : e.length;
    let i = dT(e, 0, N, D, !0);
    const z = [];
    if (!i || i.next === i.prev)
      return z;
    let A, I, n, T, u, g, s;
    if (t && (i = p0(e, M, i, D)), e.length > 80 * D) {
      A = n = e[0], I = T = e[1];
      for (let j = D; j < N; j += D)
        u = e[j], g = e[j + 1], u < A && (A = u), g < I && (I = g), u > n && (n = u), g > T && (T = g);
      s = Math.max(n - A, T - I), s = s !== 0 ? 32767 / s : 0;
    }
    return we(i, z, D, A, I, s, 0), z;
  }
};
function dT(e, M, D, t, N) {
  let i, z;
  if (N === R0(e, M, D, t) > 0)
    for (i = M; i < D; i += t)
      z = hI(i, e[i], e[i + 1], z);
  else
    for (i = D - t; i >= M; i -= t)
      z = hI(i, e[i], e[i + 1], z);
  return z && bi(z, z.next) && (Oe(z), z = z.next), z;
}
function AN(e, M) {
  if (!e)
    return e;
  M || (M = e);
  let D = e, t;
  do
    if (t = !1, !D.steiner && (bi(D, D.next) || bM(D.prev, D, D.next) === 0)) {
      if (Oe(D), D = M = D.prev, D === D.next)
        break;
      t = !0;
    } else
      D = D.next;
  while (t || D !== M);
  return M;
}
function we(e, M, D, t, N, i, z) {
  if (!e)
    return;
  !z && i && k0(e, t, N, i);
  let A = e, I, n;
  for (; e.prev !== e.next; ) {
    if (I = e.prev, n = e.next, i ? d0(e, t, N, i) : h0(e)) {
      M.push(I.i / D | 0), M.push(e.i / D | 0), M.push(n.i / D | 0), Oe(e), e = n.next, A = n.next;
      continue;
    }
    if (e = n, e === A) {
      z ? z === 1 ? (e = v0(AN(e), M, D), we(e, M, D, t, N, i, 2)) : z === 2 && Y0(e, M, D, t, N, i) : we(AN(e), M, D, t, N, i, 1);
      break;
    }
  }
}
function h0(e) {
  const M = e.prev, D = e, t = e.next;
  if (bM(M, D, t) >= 0)
    return !1;
  const N = M.x, i = D.x, z = t.x, A = M.y, I = D.y, n = t.y, T = N < i ? N < z ? N : z : i < z ? i : z, u = A < I ? A < n ? A : n : I < n ? I : n, g = N > i ? N > z ? N : z : i > z ? i : z, s = A > I ? A > n ? A : n : I > n ? I : n;
  let j = t.next;
  for (; j !== M; ) {
    if (j.x >= T && j.x <= g && j.y >= u && j.y <= s && mN(N, A, i, I, z, n, j.x, j.y) && bM(j.prev, j, j.next) >= 0)
      return !1;
    j = j.next;
  }
  return !0;
}
function d0(e, M, D, t) {
  const N = e.prev, i = e, z = e.next;
  if (bM(N, i, z) >= 0)
    return !1;
  const A = N.x, I = i.x, n = z.x, T = N.y, u = i.y, g = z.y, s = A < I ? A < n ? A : n : I < n ? I : n, j = T < u ? T < g ? T : g : u < g ? u : g, r = A > I ? A > n ? A : n : I > n ? I : n, c = T > u ? T > g ? T : g : u > g ? u : g, y = rz(s, j, M, D, t), w = rz(r, c, M, D, t);
  let a = e.prevZ, C = e.nextZ;
  for (; a && a.z >= y && C && C.z <= w; ) {
    if (a.x >= s && a.x <= r && a.y >= j && a.y <= c && a !== N && a !== z && mN(A, T, I, u, n, g, a.x, a.y) && bM(a.prev, a, a.next) >= 0 || (a = a.prevZ, C.x >= s && C.x <= r && C.y >= j && C.y <= c && C !== N && C !== z && mN(A, T, I, u, n, g, C.x, C.y) && bM(C.prev, C, C.next) >= 0))
      return !1;
    C = C.nextZ;
  }
  for (; a && a.z >= y; ) {
    if (a.x >= s && a.x <= r && a.y >= j && a.y <= c && a !== N && a !== z && mN(A, T, I, u, n, g, a.x, a.y) && bM(a.prev, a, a.next) >= 0)
      return !1;
    a = a.prevZ;
  }
  for (; C && C.z <= w; ) {
    if (C.x >= s && C.x <= r && C.y >= j && C.y <= c && C !== N && C !== z && mN(A, T, I, u, n, g, C.x, C.y) && bM(C.prev, C, C.next) >= 0)
      return !1;
    C = C.nextZ;
  }
  return !0;
}
function v0(e, M, D) {
  let t = e;
  do {
    const N = t.prev, i = t.next.next;
    !bi(N, i) && vT(N, t, t.next, i) && xe(N, i) && xe(i, N) && (M.push(N.i / D | 0), M.push(t.i / D | 0), M.push(i.i / D | 0), Oe(t), Oe(t.next), t = e = i), t = t.next;
  } while (t !== e);
  return AN(t);
}
function Y0(e, M, D, t, N, i) {
  let z = e;
  do {
    let A = z.next.next;
    for (; A !== z.prev; ) {
      if (z.i !== A.i && _0(z, A)) {
        let I = YT(z, A);
        z = AN(z, z.next), I = AN(I, I.next), we(z, M, D, t, N, i, 0), we(I, M, D, t, N, i, 0);
        return;
      }
      A = A.next;
    }
    z = z.next;
  } while (z !== e);
}
function p0(e, M, D, t) {
  const N = [];
  let i, z, A, I, n;
  for (i = 0, z = M.length; i < z; i++)
    A = M[i] * t, I = i < z - 1 ? M[i + 1] * t : e.length, n = dT(e, A, I, t, !1), n === n.next && (n.steiner = !0), N.push(Z0(n));
  for (N.sort(U0), i = 0; i < N.length; i++)
    D = f0(N[i], D);
  return D;
}
function U0(e, M) {
  return e.x - M.x;
}
function f0(e, M) {
  const D = Q0(e, M);
  if (!D)
    return M;
  const t = YT(D, e);
  return AN(t, t.next), AN(D, D.next);
}
function Q0(e, M) {
  let D = M, t = -1 / 0, N;
  const i = e.x, z = e.y;
  do {
    if (z <= D.y && z >= D.next.y && D.next.y !== D.y) {
      const g = D.x + (z - D.y) * (D.next.x - D.x) / (D.next.y - D.y);
      if (g <= i && g > t && (t = g, N = D.x < D.next.x ? D : D.next, g === i))
        return N;
    }
    D = D.next;
  } while (D !== M);
  if (!N)
    return null;
  const A = N, I = N.x, n = N.y;
  let T = 1 / 0, u;
  D = N;
  do
    i >= D.x && D.x >= I && i !== D.x && mN(z < n ? i : t, z, I, n, z < n ? t : i, z, D.x, D.y) && (u = Math.abs(z - D.y) / (i - D.x), xe(D, e) && (u < T || u === T && (D.x > N.x || D.x === N.x && m0(N, D))) && (N = D, T = u)), D = D.next;
  while (D !== A);
  return N;
}
function m0(e, M) {
  return bM(e.prev, e, M.prev) < 0 && bM(M.next, e, e.next) < 0;
}
function k0(e, M, D, t) {
  let N = e;
  do
    N.z === 0 && (N.z = rz(N.x, N.y, M, D, t)), N.prevZ = N.prev, N.nextZ = N.next, N = N.next;
  while (N !== e);
  N.prevZ.nextZ = null, N.prevZ = null, S0(N);
}
function S0(e) {
  let M, D, t, N, i, z, A, I, n = 1;
  do {
    for (D = e, e = null, i = null, z = 0; D; ) {
      for (z++, t = D, A = 0, M = 0; M < n && (A++, t = t.nextZ, !!t); M++)
        ;
      for (I = n; A > 0 || I > 0 && t; )
        A !== 0 && (I === 0 || !t || D.z <= t.z) ? (N = D, D = D.nextZ, A--) : (N = t, t = t.nextZ, I--), i ? i.nextZ = N : e = N, N.prevZ = i, i = N;
      D = t;
    }
    i.nextZ = null, n *= 2;
  } while (z > 1);
  return e;
}
function rz(e, M, D, t, N) {
  return e = (e - D) * N | 0, M = (M - t) * N | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, M = (M | M << 8) & 16711935, M = (M | M << 4) & 252645135, M = (M | M << 2) & 858993459, M = (M | M << 1) & 1431655765, e | M << 1;
}
function Z0(e) {
  let M = e, D = e;
  do
    (M.x < D.x || M.x === D.x && M.y < D.y) && (D = M), M = M.next;
  while (M !== e);
  return D;
}
function mN(e, M, D, t, N, i, z, A) {
  return (N - z) * (M - A) >= (e - z) * (i - A) && (e - z) * (t - A) >= (D - z) * (M - A) && (D - z) * (i - A) >= (N - z) * (t - A);
}
function _0(e, M) {
  return e.next.i !== M.i && e.prev.i !== M.i && !b0(e, M) && // dones't intersect other edges
  (xe(e, M) && xe(M, e) && K0(e, M) && // locally visible
  (bM(e.prev, e, M.prev) || bM(e, M.prev, M)) || // does not create opposite-facing sectors
  bi(e, M) && bM(e.prev, e, e.next) > 0 && bM(M.prev, M, M.next) > 0);
}
function bM(e, M, D) {
  return (M.y - e.y) * (D.x - M.x) - (M.x - e.x) * (D.y - M.y);
}
function bi(e, M) {
  return e.x === M.x && e.y === M.y;
}
function vT(e, M, D, t) {
  const N = Li(bM(e, M, D)), i = Li(bM(e, M, t)), z = Li(bM(D, t, e)), A = Li(bM(D, t, M));
  return !!(N !== i && z !== A || N === 0 && Ci(e, D, M) || i === 0 && Ci(e, t, M) || z === 0 && Ci(D, e, t) || A === 0 && Ci(D, M, t));
}
function Ci(e, M, D) {
  return M.x <= Math.max(e.x, D.x) && M.x >= Math.min(e.x, D.x) && M.y <= Math.max(e.y, D.y) && M.y >= Math.min(e.y, D.y);
}
function Li(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function b0(e, M) {
  let D = e;
  do {
    if (D.i !== e.i && D.next.i !== e.i && D.i !== M.i && D.next.i !== M.i && vT(D, D.next, e, M))
      return !0;
    D = D.next;
  } while (D !== e);
  return !1;
}
function xe(e, M) {
  return bM(e.prev, e, e.next) < 0 ? bM(e, M, e.next) >= 0 && bM(e, e.prev, M) >= 0 : bM(e, M, e.prev) < 0 || bM(e, e.next, M) < 0;
}
function K0(e, M) {
  let D = e, t = !1;
  const N = (e.x + M.x) / 2, i = (e.y + M.y) / 2;
  do
    D.y > i != D.next.y > i && D.next.y !== D.y && N < (D.next.x - D.x) * (i - D.y) / (D.next.y - D.y) + D.x && (t = !t), D = D.next;
  while (D !== e);
  return t;
}
function YT(e, M) {
  const D = new cz(e.i, e.x, e.y), t = new cz(M.i, M.x, M.y), N = e.next, i = M.prev;
  return e.next = M, M.prev = e, D.next = N, N.prev = D, t.next = D, D.prev = t, i.next = t, t.prev = i, t;
}
function hI(e, M, D, t) {
  const N = new cz(e, M, D);
  return t ? (N.next = t.next, N.prev = t, t.next.prev = N, t.next = N) : (N.prev = N, N.next = N), N;
}
function Oe(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function cz(e, M, D) {
  this.i = e, this.x = M, this.y = D, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function R0(e, M, D, t) {
  let N = 0;
  for (let i = M, z = D - t; i < D; i += t)
    N += (e[z] - e[i]) * (e[i + 1] + e[z + 1]), z = i;
  return N;
}
class ye {
  // calculate area of the contour polygon
  static area(M) {
    const D = M.length;
    let t = 0;
    for (let N = D - 1, i = 0; i < D; N = i++)
      t += M[N].x * M[i].y - M[i].x * M[N].y;
    return t * 0.5;
  }
  static isClockWise(M) {
    return ye.area(M) < 0;
  }
  static triangulateShape(M, D) {
    const t = [], N = [], i = [];
    dI(M), vI(t, M);
    let z = M.length;
    D.forEach(dI);
    for (let I = 0; I < D.length; I++)
      N.push(z), z += D[I].length, vI(t, D[I]);
    const A = l0.triangulate(t, N);
    for (let I = 0; I < A.length; I += 3)
      i.push(A.slice(I, I + 3));
    return i;
  }
}
function dI(e) {
  const M = e.length;
  M > 2 && e[M - 1].equals(e[0]) && e.pop();
}
function vI(e, M) {
  for (let D = 0; D < M.length; D++)
    e.push(M[D].x), e.push(M[D].y);
}
class lz extends VN {
  constructor(M = new hT([new gM(0, 0.5), new gM(-0.5, -0.5), new gM(0.5, -0.5)]), D = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: M,
      curveSegments: D
    };
    const t = [], N = [], i = [], z = [];
    let A = 0, I = 0;
    if (Array.isArray(M) === !1)
      n(M);
    else
      for (let T = 0; T < M.length; T++)
        n(M[T]), this.addGroup(A, I, T), A += I, I = 0;
    this.setIndex(t), this.setAttribute("position", new Dt(N, 3)), this.setAttribute("normal", new Dt(i, 3)), this.setAttribute("uv", new Dt(z, 2));
    function n(T) {
      const u = N.length / 3, g = T.extractPoints(D);
      let s = g.shape;
      const j = g.holes;
      ye.isClockWise(s) === !1 && (s = s.reverse());
      for (let c = 0, y = j.length; c < y; c++) {
        const w = j[c];
        ye.isClockWise(w) === !0 && (j[c] = w.reverse());
      }
      const r = ye.triangulateShape(s, j);
      for (let c = 0, y = j.length; c < y; c++) {
        const w = j[c];
        s = s.concat(w);
      }
      for (let c = 0, y = s.length; c < y; c++) {
        const w = s[c];
        N.push(w.x, w.y, 0), i.push(0, 0, 1), z.push(w.x, w.y);
      }
      for (let c = 0, y = r.length; c < y; c++) {
        const w = r[c], a = w[0] + u, C = w[1] + u, x = w[2] + u;
        t.push(a, C, x), I += 3;
      }
    }
  }
  toJSON() {
    const M = super.toJSON(), D = this.parameters.shapes;
    return P0(D, M);
  }
  static fromJSON(M, D) {
    const t = [];
    for (let N = 0, i = M.shapes.length; N < i; N++) {
      const z = D[M.shapes[N]];
      t.push(z);
    }
    return new lz(t, M.curveSegments);
  }
}
function P0(e, M) {
  if (M.shapes = [], Array.isArray(e))
    for (let D = 0, t = e.length; D < t; D++) {
      const N = e[D];
      M.shapes.push(N.uuid);
    }
  else
    M.shapes.push(e.uuid);
  return M;
}
function F0(e, M, D) {
  const z = D / 2.2, A = new hT();
  return A.moveTo(0, 0 + D), A.lineTo(0, 0 + M - D), A.quadraticCurveTo(0, 0 + M, 0 + D, 0 + M), A.lineTo(e / 2 - 25 / 2 - z, 0 + M), A.quadraticCurveTo(
    e / 2 - 25 / 2,
    0 + M,
    e / 2 - 25 / 2,
    0 + M - z / 10
  ), A.quadraticCurveTo(
    e / 2 - 25 / 2,
    0 + M - z,
    e / 2 - 25 / 2 + z,
    0 + M - z
  ), A.lineTo(e / 2 + 25 / 2 - z, 0 + M - z), A.quadraticCurveTo(
    e / 2 + 25 / 2,
    0 + M - z,
    e / 2 + 25 / 2,
    0 + M - z / 10
  ), A.quadraticCurveTo(
    e / 2 + 25 / 2,
    0 + M,
    e / 2 + 25 / 2 + z,
    0 + M
  ), A.lineTo(0 + e - D, 0 + M), A.quadraticCurveTo(0 + e, 0 + M, 0 + e, 0 + M - D), A.lineTo(0 + e, 0 + D), A.quadraticCurveTo(0 + e, 0, 0 + e - D, 0), A.lineTo(0 + D, 0), A.quadraticCurveTo(0, 0, 0, 0 + D), new lz(A);
}
const B0 = () => {
  const e = new og();
  return e.position.set(0, 0, 300), e;
}, G0 = (e) => {
  const M = new SD(
    45,
    e
  );
  return M.position.set(0, 0, 200), M;
}, V0 = async (e, M, D) => {
  const t = await new u0(e, M).init(), N = 6, i = N * 9, z = N * 19.3, I = F0(i, z, 8);
  let n;
  if (D.endsWith(".mp4")) {
    const g = document.createElement("video");
    g.src = D, g.muted = !0, g.loop = !0, g.play(), n = new jy(g);
  } else
    n = new Og().load(D);
  const T = new AT({ map: n }), u = new JD(I, T);
  return n0(u), u.translateZ(3.6), u.geometry.center(), t.add(u), t;
}, H0 = async (e, M, D, t, N) => {
  const i = new ry({ antialias: !0, alpha: !0 });
  i.setSize(e, M);
  const z = new cy(), A = B0();
  z.add(A);
  const I = G0(e / M), n = await V0(D, t, N);
  return z.add(n), {
    renderer: i,
    update: (T, u, g) => {
      n.lookingAtSomething = !g, n.animation(T, u), i.render(z, I);
    }
  };
}, W0 = /* @__PURE__ */ SI("<style></style>"), X0 = /* @__PURE__ */ SI('<div class="mockup"></div>');
function q0(e) {
  const [M, D] = Mz(new f(0, 0, e.distance)), [t, N] = Mz(!0);
  let i, z, A;
  _T(async () => {
    i = i;
    const s = new f(e.rotation.x, e.rotation.y, e.rotation.z);
    ({
      renderer: A,
      update: z
    } = await H0(i.clientWidth, i.clientHeight, s, e.bodyColor, e.screen)), A.setPixelRatio(window.devicePixelRatio), i.appendChild(A.domElement);
  });
  let I = 0;
  function n(s) {
    s *= 1e-3;
    const j = s - I;
    I = s, requestAnimationFrame(n), z?.(j, M(), t());
  }
  n(0);
  function T(s) {
    if (!i)
      return;
    const j = i.getBoundingClientRect();
    D(new f(s.clientX - j.left - j.width / 2, -(s.clientY - j.top - j.height / 2), e.distance));
  }
  function u() {
    N(!1);
  }
  function g() {
    N(!0);
  }
  return [(() => {
    const s = W0.cloneNode(!0);
    return ZI(s, Tu), s;
  })(), (() => {
    const s = X0.cloneNode(!0);
    s.addEventListener("mouseleave", g), s.addEventListener("mouseenter", u), s.$$mousemove = T;
    const j = i;
    return typeof j == "function" ? HT(j, s) : i = s, vi(() => s.style.setProperty("animation-name", e.levitate ? "levitate" : "none")), s;
  })()];
}
VT(["mousemove"]);
nu("three-d-mockup", {
  screen: null,
  bodyColor: "white",
  distance: 500,
  rotation: {
    x: 250,
    y: 170,
    z: 500
  },
  levitate: !0
}, (e) => {
  if (!e.screen)
    throw new Error("The screen prop is required");
  return BT(q0, {
    get screen() {
      return e.screen;
    },
    get bodyColor() {
      return e.bodyColor;
    },
    get distance() {
      return e.distance;
    },
    get rotation() {
      return e.rotation;
    },
    get levitate() {
      return e.levitate;
    }
  });
});