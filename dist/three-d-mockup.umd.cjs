(function(oD){typeof define=="function"&&define.amd?define(oD):oD()})(function(){"use strict";const oD={};function pT(N){oD.context=N}const hz={equals:(N,M)=>N===M};let dz=Uz;const wt=1,fN=2,vz={owned:null,cleanups:null,context:null,owner:null};var pD=null;let Qt=null,KM=null,ND=null,et=null,Ki=0;function UT(N,M){const D=KM,t=pD,e=N.length===0,i=e?vz:{owned:null,cleanups:null,context:null,owner:M===void 0?t:M},z=e?N:()=>N(()=>Xe(()=>ZN(i)));pD=i,KM=null;try{return qe(z,!0)}finally{KM=D,pD=t}}function Ri(N,M){M=M?Object.assign({},hz,M):hz;const D={value:N,observers:null,observerSlots:null,comparator:M.equals||void 0},t=e=>(typeof e=="function"&&(e=e(D.value)),Yz(D,e));return[QT.bind(D),t]}function mN(N,M,D){const t=pz(N,M,!1,wt);QN(t)}function fT(N,M,D){dz=ZT;const t=pz(N,M,!1,wt);t.user=!0,et?et.push(t):QN(t)}function Xe(N){if(KM===null)return N();const M=KM;KM=null;try{return N()}finally{KM=M}}function mT(N){fT(()=>Xe(N))}function QT(){const N=Qt;if(this.sources&&(this.state||N))if(this.state===wt||N)QN(this);else{const M=ND;ND=null,qe(()=>SN(this),!1),ND=M}if(KM){const M=this.observers?this.observers.length:0;KM.sources?(KM.sources.push(this),KM.sourceSlots.push(M)):(KM.sources=[this],KM.sourceSlots=[M]),this.observers?(this.observers.push(KM),this.observerSlots.push(KM.sources.length-1)):(this.observers=[KM],this.observerSlots=[KM.sources.length-1])}return this.value}function Yz(N,M,D){let t=N.value;return(!N.comparator||!N.comparator(t,M))&&(N.value=M,N.observers&&N.observers.length&&qe(()=>{for(let e=0;e<N.observers.length;e+=1){const i=N.observers[e],z=Qt&&Qt.running;z&&Qt.disposed.has(i),(z&&!i.tState||!z&&!i.state)&&(i.pure?ND.push(i):et.push(i),i.observers&&fz(i)),z||(i.state=wt)}if(ND.length>1e6)throw ND=[],new Error},!1)),M}function QN(N){if(!N.fn)return;ZN(N);const M=pD,D=KM,t=Ki;KM=pD=N,kT(N,N.value,t),KM=D,pD=M}function kT(N,M,D){let t;try{t=N.fn(M)}catch(e){N.pure&&(N.state=wt,N.owned&&N.owned.forEach(ZN),N.owned=null),mz(e)}(!N.updatedAt||N.updatedAt<=D)&&(N.updatedAt!=null&&"observers"in N?Yz(N,t):N.value=t,N.updatedAt=D)}function pz(N,M,D,t=wt,e){const i={fn:N,state:t,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:M,owner:pD,context:null,pure:D};return pD===null||pD!==vz&&(pD.owned?pD.owned.push(i):pD.owned=[i]),i}function kN(N){const M=Qt;if(N.state===0||M)return;if(N.state===fN||M)return SN(N);if(N.suspense&&Xe(N.suspense.inFallback))return N.suspense.effects.push(N);const D=[N];for(;(N=N.owner)&&(!N.updatedAt||N.updatedAt<Ki);)(N.state||M)&&D.push(N);for(let t=D.length-1;t>=0;t--)if(N=D[t],N.state===wt||M)QN(N);else if(N.state===fN||M){const e=ND;ND=null,qe(()=>SN(N,D[0]),!1),ND=e}}function qe(N,M){if(ND)return N();let D=!1;M||(ND=[]),et?D=!0:et=[],Ki++;try{const t=N();return ST(D),t}catch(t){D||(et=null),ND=null,mz(t)}}function ST(N){if(ND&&(Uz(ND),ND=null),N)return;const M=et;et=null,M.length&&qe(()=>dz(M),!1)}function Uz(N){for(let M=0;M<N.length;M++)kN(N[M])}function ZT(N){let M,D=0;for(M=0;M<N.length;M++){const t=N[M];t.user?N[D++]=t:kN(t)}for(oD.context&&pT(),M=0;M<D;M++)kN(N[M])}function SN(N,M){const D=Qt;N.state=0;for(let t=0;t<N.sources.length;t+=1){const e=N.sources[t];e.sources&&(e.state===wt||D?e!==M&&kN(e):(e.state===fN||D)&&SN(e,M))}}function fz(N){const M=Qt;for(let D=0;D<N.observers.length;D+=1){const t=N.observers[D];(!t.state||M)&&(t.state=fN,t.pure?ND.push(t):et.push(t),t.observers&&fz(t))}}function ZN(N){let M;if(N.sources)for(;N.sources.length;){const D=N.sources.pop(),t=N.sourceSlots.pop(),e=D.observers;if(e&&e.length){const i=e.pop(),z=D.observerSlots.pop();t<e.length&&(i.sourceSlots[z]=t,e[t]=i,D.observerSlots[t]=z)}}if(N.owned){for(M=0;M<N.owned.length;M++)ZN(N.owned[M]);N.owned=null}if(N.cleanups){for(M=0;M<N.cleanups.length;M++)N.cleanups[M]();N.cleanups=null}N.state=0,N.context=null}function _T(N){return N instanceof Error||typeof N=="string"?N:new Error("Unknown error")}function mz(N){throw N=_T(N),N}function bT(N,M){return Xe(()=>N(M||{}))}function KT(N,M,D){let t=D.length,e=M.length,i=t,z=0,A=0,I=M[e-1].nextSibling,n=null;for(;z<e||A<i;){if(M[z]===D[A]){z++,A++;continue}for(;M[e-1]===D[i-1];)e--,i--;if(e===z){const T=i<t?A?D[A-1].nextSibling:D[i-A]:I;for(;A<i;)N.insertBefore(D[A++],T)}else if(i===A)for(;z<e;)(!n||!n.has(M[z]))&&M[z].remove(),z++;else if(M[z]===D[i-1]&&D[A]===M[e-1]){const T=M[--e].nextSibling;N.insertBefore(D[A++],M[z++].nextSibling),N.insertBefore(D[--i],T),M[e]=D[i]}else{if(!n){n=new Map;let u=A;for(;u<i;)n.set(D[u],u++)}const T=n.get(M[z]);if(T!=null)if(A<T&&T<i){let u=z,g=1,s;for(;++u<e&&u<i&&!((s=n.get(M[u]))==null||s!==T+g);)g++;if(g>T-A){const j=M[z];for(;A<T;)N.insertBefore(D[A++],j)}else N.replaceChild(D[A++],M[z++])}else z++;else M[z++].remove()}}}const Qz="_$DX_DELEGATE";function kz(N,M,D){const t=document.createElement("template");t.innerHTML=N;let e=t.content.firstChild;return D&&(e=e.firstChild),e}function RT(N,M=window.document){const D=M[Qz]||(M[Qz]=new Set);for(let t=0,e=N.length;t<e;t++){const i=N[t];D.has(i)||(D.add(i),M.addEventListener(i,FT))}}function PT(N,M,D){return Xe(()=>N(M,D))}function Sz(N,M,D,t){if(D!==void 0&&!t&&(t=[]),typeof M!="function")return _N(N,M,t,D);mN(e=>_N(N,M(),e,D),t)}function FT(N){const M=`$$${N.type}`;let D=N.composedPath&&N.composedPath()[0]||N.target;for(N.target!==D&&Object.defineProperty(N,"target",{configurable:!0,value:D}),Object.defineProperty(N,"currentTarget",{configurable:!0,get(){return D||document}}),oD.registry&&!oD.done&&(oD.done=!0,document.querySelectorAll("[id^=pl-]").forEach(t=>{for(;t&&t.nodeType!==8&&t.nodeValue!=="pl-"+N;){let e=t.nextSibling;t.remove(),t=e}t&&t.remove()}));D;){const t=D[M];if(t&&!D.disabled){const e=D[`${M}Data`];if(e!==void 0?t.call(D,e,N):t.call(D,N),N.cancelBubble)return}D=D._$host||D.parentNode||D.host}}function _N(N,M,D,t,e){for(oD.context&&!D&&(D=[...N.childNodes]);typeof D=="function";)D=D();if(M===D)return D;const i=typeof M,z=t!==void 0;if(N=z&&D[0]&&D[0].parentNode||N,i==="string"||i==="number"){if(oD.context)return D;if(i==="number"&&(M=M.toString()),z){let A=D[0];A&&A.nodeType===3?A.data=M:A=document.createTextNode(M),D=ze(N,D,t,A)}else D!==""&&typeof D=="string"?D=N.firstChild.data=M:D=N.textContent=M}else if(M==null||i==="boolean"){if(oD.context)return D;D=ze(N,D,t)}else{if(i==="function")return mN(()=>{let A=M();for(;typeof A=="function";)A=A();D=_N(N,A,D,t)}),()=>D;if(Array.isArray(M)){const A=[],I=D&&Array.isArray(D);if(Pi(A,M,D,e))return mN(()=>D=_N(N,A,D,t,!0)),()=>D;if(oD.context){if(!A.length)return D;for(let n=0;n<A.length;n++)if(A[n].parentNode)return D=A}if(A.length===0){if(D=ze(N,D,t),z)return D}else I?D.length===0?Zz(N,A,t):KT(N,D,A):(D&&ze(N),Zz(N,A));D=A}else if(M instanceof Node){if(oD.context&&M.parentNode)return D=z?[M]:M;if(Array.isArray(D)){if(z)return D=ze(N,D,t,M);ze(N,D,null,M)}else D==null||D===""||!N.firstChild?N.appendChild(M):N.replaceChild(M,N.firstChild);D=M}}return D}function Pi(N,M,D,t){let e=!1;for(let i=0,z=M.length;i<z;i++){let A=M[i],I=D&&D[i];if(A instanceof Node)N.push(A);else if(!(A==null||A===!0||A===!1))if(Array.isArray(A))e=Pi(N,A,I)||e;else if(typeof A=="function")if(t){for(;typeof A=="function";)A=A();e=Pi(N,Array.isArray(A)?A:[A],Array.isArray(I)?I:[I])||e}else N.push(A),e=!0;else{const n=String(A);I&&I.nodeType===3&&I.data===n?N.push(I):N.push(document.createTextNode(n))}}return e}function Zz(N,M,D=null){for(let t=0,e=M.length;t<e;t++)N.insertBefore(M[t],D)}function ze(N,M,D,t){if(D===void 0)return N.textContent="";const e=t||document.createTextNode("");if(M.length){let i=!1;for(let z=M.length-1;z>=0;z--){const A=M[z];if(e!==A){const I=A.parentNode===N;!i&&!z?I?N.replaceChild(e,A):N.insertBefore(e,D):I&&A.remove()}else i=!0}}else N.insertBefore(e,D);return[e]}function BT(N){return Object.keys(N).reduce((D,t)=>{const e=N[t];return D[t]=Object.assign({},e),Kz(e.value)&&!XT(e.value)&&!Array.isArray(e.value)&&(D[t].value=Object.assign({},e.value)),Array.isArray(e.value)&&(D[t].value=e.value.slice(0)),D},{})}function GT(N){return N?Object.keys(N).reduce((D,t)=>{const e=N[t];return D[t]=Kz(e)&&"value"in e?e:{value:e},D[t].attribute||(D[t].attribute=WT(t)),D[t].parse="parse"in D[t]?D[t].parse:typeof D[t].value!="string",D},{}):{}}function VT(N){return Object.keys(N).reduce((D,t)=>(D[t]=N[t].value,D),{})}function HT(N,M){const D=BT(M);return Object.keys(M).forEach(e=>{const i=D[e],z=N.getAttribute(i.attribute),A=N[e];z&&(i.value=i.parse?_z(z):z),A!=null&&(i.value=Array.isArray(A)?A.slice(0):A),i.reflect&&bz(N,i.attribute,i.value),Object.defineProperty(N,e,{get(){return i.value},set(I){const n=i.value;i.value=I,i.reflect&&bz(this,i.attribute,i.value);for(let T=0,u=this.__propertyChangedCallbacks.length;T<u;T++)this.__propertyChangedCallbacks[T](e,I,n)},enumerable:!0,configurable:!0})}),D}function _z(N){if(N)try{return JSON.parse(N)}catch{return N}}function bz(N,M,D){if(D==null||D===!1)return N.removeAttribute(M);let t=JSON.stringify(D);N.__updating[M]=!0,t==="true"&&(t=""),N.setAttribute(M,t),Promise.resolve().then(()=>delete N.__updating[M])}function WT(N){return N.replace(/\.?([A-Z]+)/g,(M,D)=>"-"+D.toLowerCase()).replace("_","-").replace(/^-/,"")}function Kz(N){return N!=null&&(typeof N=="object"||typeof N=="function")}function XT(N){return Object.prototype.toString.call(N)==="[object Function]"}function qT(N){return typeof N=="function"&&N.toString().indexOf("class")===0}let Fi;function $T(N,M){const D=Object.keys(M);return class extends N{static get observedAttributes(){return D.map(e=>M[e].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=HT(this,M);const e=VT(this.props),i=this.Component,z=Fi;try{Fi=this,this.__initialized=!0,qT(i)?new i(e,{element:this}):i(e,{element:this})}finally{Fi=z}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let e=null;for(;e=this.__releaseCallbacks.pop();)e(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(e,i,z){if(this.__initialized&&!this.__updating[e]&&(e=this.lookupProp(e),e in M)){if(z==null&&!this[e])return;this[e]=M[e].parse?_z(z):z}}lookupProp(e){if(M)return D.find(i=>e===i||e===M[i].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(e){this.__releaseCallbacks.push(e)}addPropertyChangedCallback(e){this.__propertyChangedCallbacks.push(e)}}}function JT(N,M={},D={}){const{BaseElement:t=HTMLElement,extension:e}=D;return i=>{if(!N)throw new Error("tag is required to register a Component");let z=customElements.get(N);return z?(z.prototype.Component=i,z):(z=$T(t,GT(M)),z.prototype.Component=i,z.prototype.registeredTag=N,customElements.define(N,z,e),z)}}function Mu(N){const M=Object.keys(N),D={};for(let t=0;t<M.length;t++){const[e,i]=Ri(N[M[t]]);Object.defineProperty(D,M[t],{get:e,set(z){i(()=>z)}})}return D}function Du(N){if(N.assignedSlot&&N.assignedSlot._$owner)return N.assignedSlot._$owner;let M=N.parentNode;for(;M&&!M._$owner&&!(M.assignedSlot&&M.assignedSlot._$owner);)M=M.parentNode;return M&&M.assignedSlot?M.assignedSlot._$owner:N._$owner}function tu(N){return(M,D)=>{const{element:t}=D;return UT(e=>{const i=Mu(M);t.addPropertyChangedCallback((A,I)=>i[A]=I),t.addReleaseCallback(()=>{t.renderRoot.textContent="",e()});const z=N(i,D);return Sz(t.renderRoot,z)},Du(t))}}function eu(N,M,D){return arguments.length===2&&(D=M,M={}),JT(N,M)(tu(D))}const iD=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bi=Math.PI/180,Rz=180/Math.PI;function ne(){const N=Math.random()*4294967295|0,M=Math.random()*4294967295|0,D=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(iD[N&255]+iD[N>>8&255]+iD[N>>16&255]+iD[N>>24&255]+"-"+iD[M&255]+iD[M>>8&255]+"-"+iD[M>>16&15|64]+iD[M>>24&255]+"-"+iD[D&63|128]+iD[D>>8&255]+"-"+iD[D>>16&255]+iD[D>>24&255]+iD[t&255]+iD[t>>8&255]+iD[t>>16&255]+iD[t>>24&255]).toLowerCase()}function ID(N,M,D){return Math.max(M,Math.min(D,N))}function Nu(N,M){return(N%M+M)%M}function Gi(N,M,D){return(1-D)*N+D*M}function Pz(N){return(N&N-1)===0&&N!==0}function Vi(N){return Math.pow(2,Math.floor(Math.log(N)/Math.LN2))}function bN(N,M){switch(M.constructor){case Float32Array:return N;case Uint16Array:return N/65535;case Uint8Array:return N/255;case Int16Array:return Math.max(N/32767,-1);case Int8Array:return Math.max(N/127,-1);default:throw new Error("Invalid component type.")}}function CD(N,M){switch(M.constructor){case Float32Array:return N;case Uint16Array:return Math.round(N*65535);case Uint8Array:return Math.round(N*255);case Int16Array:return Math.round(N*32767);case Int8Array:return Math.round(N*127);default:throw new Error("Invalid component type.")}}let $e=class{constructor(M=0,D=0,t=0,e=1){this.isQuaternion=!0,this._x=M,this._y=D,this._z=t,this._w=e}static slerpFlat(M,D,t,e,i,z,A){let I=t[e+0],n=t[e+1],T=t[e+2],u=t[e+3];const g=i[z+0],s=i[z+1],j=i[z+2],r=i[z+3];if(A===0){M[D+0]=I,M[D+1]=n,M[D+2]=T,M[D+3]=u;return}if(A===1){M[D+0]=g,M[D+1]=s,M[D+2]=j,M[D+3]=r;return}if(u!==r||I!==g||n!==s||T!==j){let c=1-A;const y=I*g+n*s+T*j+u*r,w=y>=0?1:-1,a=1-y*y;if(a>Number.EPSILON){const O=Math.sqrt(a),h=Math.atan2(O,y*w);c=Math.sin(c*h)/O,A=Math.sin(A*h)/O}const o=A*w;if(I=I*c+g*o,n=n*c+s*o,T=T*c+j*o,u=u*c+r*o,c===1-A){const O=1/Math.sqrt(I*I+n*n+T*T+u*u);I*=O,n*=O,T*=O,u*=O}}M[D]=I,M[D+1]=n,M[D+2]=T,M[D+3]=u}static multiplyQuaternionsFlat(M,D,t,e,i,z){const A=t[e],I=t[e+1],n=t[e+2],T=t[e+3],u=i[z],g=i[z+1],s=i[z+2],j=i[z+3];return M[D]=A*j+T*u+I*s-n*g,M[D+1]=I*j+T*g+n*u-A*s,M[D+2]=n*j+T*s+A*g-I*u,M[D+3]=T*j-A*u-I*g-n*s,M}get x(){return this._x}set x(M){this._x=M,this._onChangeCallback()}get y(){return this._y}set y(M){this._y=M,this._onChangeCallback()}get z(){return this._z}set z(M){this._z=M,this._onChangeCallback()}get w(){return this._w}set w(M){this._w=M,this._onChangeCallback()}set(M,D,t,e){return this._x=M,this._y=D,this._z=t,this._w=e,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(M){return this._x=M.x,this._y=M.y,this._z=M.z,this._w=M.w,this._onChangeCallback(),this}setFromEuler(M,D){const t=M._x,e=M._y,i=M._z,z=M._order,A=Math.cos,I=Math.sin,n=A(t/2),T=A(e/2),u=A(i/2),g=I(t/2),s=I(e/2),j=I(i/2);switch(z){case"XYZ":this._x=g*T*u+n*s*j,this._y=n*s*u-g*T*j,this._z=n*T*j+g*s*u,this._w=n*T*u-g*s*j;break;case"YXZ":this._x=g*T*u+n*s*j,this._y=n*s*u-g*T*j,this._z=n*T*j-g*s*u,this._w=n*T*u+g*s*j;break;case"ZXY":this._x=g*T*u-n*s*j,this._y=n*s*u+g*T*j,this._z=n*T*j+g*s*u,this._w=n*T*u-g*s*j;break;case"ZYX":this._x=g*T*u-n*s*j,this._y=n*s*u+g*T*j,this._z=n*T*j-g*s*u,this._w=n*T*u+g*s*j;break;case"YZX":this._x=g*T*u+n*s*j,this._y=n*s*u+g*T*j,this._z=n*T*j-g*s*u,this._w=n*T*u-g*s*j;break;case"XZY":this._x=g*T*u-n*s*j,this._y=n*s*u-g*T*j,this._z=n*T*j+g*s*u,this._w=n*T*u+g*s*j;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+z)}return D!==!1&&this._onChangeCallback(),this}setFromAxisAngle(M,D){const t=D/2,e=Math.sin(t);return this._x=M.x*e,this._y=M.y*e,this._z=M.z*e,this._w=Math.cos(t),this._onChangeCallback(),this}setFromRotationMatrix(M){const D=M.elements,t=D[0],e=D[4],i=D[8],z=D[1],A=D[5],I=D[9],n=D[2],T=D[6],u=D[10],g=t+A+u;if(g>0){const s=.5/Math.sqrt(g+1);this._w=.25/s,this._x=(T-I)*s,this._y=(i-n)*s,this._z=(z-e)*s}else if(t>A&&t>u){const s=2*Math.sqrt(1+t-A-u);this._w=(T-I)/s,this._x=.25*s,this._y=(e+z)/s,this._z=(i+n)/s}else if(A>u){const s=2*Math.sqrt(1+A-t-u);this._w=(i-n)/s,this._x=(e+z)/s,this._y=.25*s,this._z=(I+T)/s}else{const s=2*Math.sqrt(1+u-t-A);this._w=(z-e)/s,this._x=(i+n)/s,this._y=(I+T)/s,this._z=.25*s}return this._onChangeCallback(),this}setFromUnitVectors(M,D){let t=M.dot(D)+1;return t<Number.EPSILON?(t=0,Math.abs(M.x)>Math.abs(M.z)?(this._x=-M.y,this._y=M.x,this._z=0,this._w=t):(this._x=0,this._y=-M.z,this._z=M.y,this._w=t)):(this._x=M.y*D.z-M.z*D.y,this._y=M.z*D.x-M.x*D.z,this._z=M.x*D.y-M.y*D.x,this._w=t),this.normalize()}angleTo(M){return 2*Math.acos(Math.abs(ID(this.dot(M),-1,1)))}rotateTowards(M,D){const t=this.angleTo(M);if(t===0)return this;const e=Math.min(1,D/t);return this.slerp(M,e),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(M){return this._x*M._x+this._y*M._y+this._z*M._z+this._w*M._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let M=this.length();return M===0?(this._x=0,this._y=0,this._z=0,this._w=1):(M=1/M,this._x=this._x*M,this._y=this._y*M,this._z=this._z*M,this._w=this._w*M),this._onChangeCallback(),this}multiply(M){return this.multiplyQuaternions(this,M)}premultiply(M){return this.multiplyQuaternions(M,this)}multiplyQuaternions(M,D){const t=M._x,e=M._y,i=M._z,z=M._w,A=D._x,I=D._y,n=D._z,T=D._w;return this._x=t*T+z*A+e*n-i*I,this._y=e*T+z*I+i*A-t*n,this._z=i*T+z*n+t*I-e*A,this._w=z*T-t*A-e*I-i*n,this._onChangeCallback(),this}slerp(M,D){if(D===0)return this;if(D===1)return this.copy(M);const t=this._x,e=this._y,i=this._z,z=this._w;let A=z*M._w+t*M._x+e*M._y+i*M._z;if(A<0?(this._w=-M._w,this._x=-M._x,this._y=-M._y,this._z=-M._z,A=-A):this.copy(M),A>=1)return this._w=z,this._x=t,this._y=e,this._z=i,this;const I=1-A*A;if(I<=Number.EPSILON){const s=1-D;return this._w=s*z+D*this._w,this._x=s*t+D*this._x,this._y=s*e+D*this._y,this._z=s*i+D*this._z,this.normalize(),this._onChangeCallback(),this}const n=Math.sqrt(I),T=Math.atan2(n,A),u=Math.sin((1-D)*T)/n,g=Math.sin(D*T)/n;return this._w=z*u+this._w*g,this._x=t*u+this._x*g,this._y=e*u+this._y*g,this._z=i*u+this._z*g,this._onChangeCallback(),this}slerpQuaternions(M,D,t){return this.copy(M).slerp(D,t)}random(){const M=Math.random(),D=Math.sqrt(1-M),t=Math.sqrt(M),e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random();return this.set(D*Math.cos(e),t*Math.sin(i),t*Math.cos(i),D*Math.sin(e))}equals(M){return M._x===this._x&&M._y===this._y&&M._z===this._z&&M._w===this._w}fromArray(M,D=0){return this._x=M[D],this._y=M[D+1],this._z=M[D+2],this._w=M[D+3],this._onChangeCallback(),this}toArray(M=[],D=0){return M[D]=this._x,M[D+1]=this._y,M[D+2]=this._z,M[D+3]=this._w,M}fromBufferAttribute(M,D){return this._x=M.getX(D),this._y=M.getY(D),this._z=M.getZ(D),this._w=M.getW(D),this}_onChange(M){return this._onChangeCallback=M,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class lT{constructor(M=0,D=0,t=0){lT.prototype.isVector3=!0,this.x=M,this.y=D,this.z=t}set(M,D,t){return t===void 0&&(t=this.z),this.x=M,this.y=D,this.z=t,this}setScalar(M){return this.x=M,this.y=M,this.z=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setZ(M){return this.z=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;case 2:this.z=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(M){return this.x=M.x,this.y=M.y,this.z=M.z,this}add(M){return this.x+=M.x,this.y+=M.y,this.z+=M.z,this}addScalar(M){return this.x+=M,this.y+=M,this.z+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this.z=M.z+D.z,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this.z+=M.z*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this.z-=M.z,this}subScalar(M){return this.x-=M,this.y-=M,this.z-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this.z=M.z-D.z,this}multiply(M){return this.x*=M.x,this.y*=M.y,this.z*=M.z,this}multiplyScalar(M){return this.x*=M,this.y*=M,this.z*=M,this}multiplyVectors(M,D){return this.x=M.x*D.x,this.y=M.y*D.y,this.z=M.z*D.z,this}applyEuler(M){return this.applyQuaternion(Fz.setFromEuler(M))}applyAxisAngle(M,D){return this.applyQuaternion(Fz.setFromAxisAngle(M,D))}applyMatrix3(M){const D=this.x,t=this.y,e=this.z,i=M.elements;return this.x=i[0]*D+i[3]*t+i[6]*e,this.y=i[1]*D+i[4]*t+i[7]*e,this.z=i[2]*D+i[5]*t+i[8]*e,this}applyNormalMatrix(M){return this.applyMatrix3(M).normalize()}applyMatrix4(M){const D=this.x,t=this.y,e=this.z,i=M.elements,z=1/(i[3]*D+i[7]*t+i[11]*e+i[15]);return this.x=(i[0]*D+i[4]*t+i[8]*e+i[12])*z,this.y=(i[1]*D+i[5]*t+i[9]*e+i[13])*z,this.z=(i[2]*D+i[6]*t+i[10]*e+i[14])*z,this}applyQuaternion(M){const D=this.x,t=this.y,e=this.z,i=M.x,z=M.y,A=M.z,I=M.w,n=I*D+z*e-A*t,T=I*t+A*D-i*e,u=I*e+i*t-z*D,g=-i*D-z*t-A*e;return this.x=n*I+g*-i+T*-A-u*-z,this.y=T*I+g*-z+u*-i-n*-A,this.z=u*I+g*-A+n*-z-T*-i,this}project(M){return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix)}unproject(M){return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld)}transformDirection(M){const D=this.x,t=this.y,e=this.z,i=M.elements;return this.x=i[0]*D+i[4]*t+i[8]*e,this.y=i[1]*D+i[5]*t+i[9]*e,this.z=i[2]*D+i[6]*t+i[10]*e,this.normalize()}divide(M){return this.x/=M.x,this.y/=M.y,this.z/=M.z,this}divideScalar(M){return this.multiplyScalar(1/M)}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this.z=Math.min(this.z,M.z),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this.z=Math.max(this.z,M.z),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this.z=Math.max(M.z,Math.min(D.z,this.z)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this.z=Math.max(M,Math.min(D,this.z)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(M){return this.x*M.x+this.y*M.y+this.z*M.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this.z+=(M.z-this.z)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this.z=M.z+(D.z-M.z)*t,this}cross(M){return this.crossVectors(this,M)}crossVectors(M,D){const t=M.x,e=M.y,i=M.z,z=D.x,A=D.y,I=D.z;return this.x=e*I-i*A,this.y=i*z-t*I,this.z=t*A-e*z,this}projectOnVector(M){const D=M.lengthSq();if(D===0)return this.set(0,0,0);const t=M.dot(this)/D;return this.copy(M).multiplyScalar(t)}projectOnPlane(M){return Hi.copy(this).projectOnVector(M),this.sub(Hi)}reflect(M){return this.sub(Hi.copy(M).multiplyScalar(2*this.dot(M)))}angleTo(M){const D=Math.sqrt(this.lengthSq()*M.lengthSq());if(D===0)return Math.PI/2;const t=this.dot(M)/D;return Math.acos(ID(t,-1,1))}distanceTo(M){return Math.sqrt(this.distanceToSquared(M))}distanceToSquared(M){const D=this.x-M.x,t=this.y-M.y,e=this.z-M.z;return D*D+t*t+e*e}manhattanDistanceTo(M){return Math.abs(this.x-M.x)+Math.abs(this.y-M.y)+Math.abs(this.z-M.z)}setFromSpherical(M){return this.setFromSphericalCoords(M.radius,M.phi,M.theta)}setFromSphericalCoords(M,D,t){const e=Math.sin(D)*M;return this.x=e*Math.sin(t),this.y=Math.cos(D)*M,this.z=e*Math.cos(t),this}setFromCylindrical(M){return this.setFromCylindricalCoords(M.radius,M.theta,M.y)}setFromCylindricalCoords(M,D,t){return this.x=M*Math.sin(D),this.y=t,this.z=M*Math.cos(D),this}setFromMatrixPosition(M){const D=M.elements;return this.x=D[12],this.y=D[13],this.z=D[14],this}setFromMatrixScale(M){const D=this.setFromMatrixColumn(M,0).length(),t=this.setFromMatrixColumn(M,1).length(),e=this.setFromMatrixColumn(M,2).length();return this.x=D,this.y=t,this.z=e,this}setFromMatrixColumn(M,D){return this.fromArray(M.elements,D*4)}setFromMatrix3Column(M,D){return this.fromArray(M.elements,D*3)}setFromEuler(M){return this.x=M._x,this.y=M._y,this.z=M._z,this}equals(M){return M.x===this.x&&M.y===this.y&&M.z===this.z}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this.z=M[D+2],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M[D+2]=this.z,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this.z=M.getZ(D),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const M=(Math.random()-.5)*2,D=Math.random()*Math.PI*2,t=Math.sqrt(1-M**2);return this.x=t*Math.cos(D),this.y=t*Math.sin(D),this.z=M,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};const Hi=new U,Fz=new $e,iu=`.mockup{width:100%;height:100%;animation:levitate 1.5s infinite alternate ease-in-out}@keyframes levitate{0%{transform:translateY(-2%)}to{transform:translateY(2%)}}
`;let eD=class lz{constructor(){lz.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(M,D,t,e,i,z,A,I,n,T,u,g,s,j,r,c){const y=this.elements;return y[0]=M,y[4]=D,y[8]=t,y[12]=e,y[1]=i,y[5]=z,y[9]=A,y[13]=I,y[2]=n,y[6]=T,y[10]=u,y[14]=g,y[3]=s,y[7]=j,y[11]=r,y[15]=c,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lz().fromArray(this.elements)}copy(M){const D=this.elements,t=M.elements;return D[0]=t[0],D[1]=t[1],D[2]=t[2],D[3]=t[3],D[4]=t[4],D[5]=t[5],D[6]=t[6],D[7]=t[7],D[8]=t[8],D[9]=t[9],D[10]=t[10],D[11]=t[11],D[12]=t[12],D[13]=t[13],D[14]=t[14],D[15]=t[15],this}copyPosition(M){const D=this.elements,t=M.elements;return D[12]=t[12],D[13]=t[13],D[14]=t[14],this}setFromMatrix3(M){const D=M.elements;return this.set(D[0],D[3],D[6],0,D[1],D[4],D[7],0,D[2],D[5],D[8],0,0,0,0,1),this}extractBasis(M,D,t){return M.setFromMatrixColumn(this,0),D.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(M,D,t){return this.set(M.x,D.x,t.x,0,M.y,D.y,t.y,0,M.z,D.z,t.z,0,0,0,0,1),this}extractRotation(M){const D=this.elements,t=M.elements,e=1/Ie.setFromMatrixColumn(M,0).length(),i=1/Ie.setFromMatrixColumn(M,1).length(),z=1/Ie.setFromMatrixColumn(M,2).length();return D[0]=t[0]*e,D[1]=t[1]*e,D[2]=t[2]*e,D[3]=0,D[4]=t[4]*i,D[5]=t[5]*i,D[6]=t[6]*i,D[7]=0,D[8]=t[8]*z,D[9]=t[9]*z,D[10]=t[10]*z,D[11]=0,D[12]=0,D[13]=0,D[14]=0,D[15]=1,this}makeRotationFromEuler(M){const D=this.elements,t=M.x,e=M.y,i=M.z,z=Math.cos(t),A=Math.sin(t),I=Math.cos(e),n=Math.sin(e),T=Math.cos(i),u=Math.sin(i);if(M.order==="XYZ"){const g=z*T,s=z*u,j=A*T,r=A*u;D[0]=I*T,D[4]=-I*u,D[8]=n,D[1]=s+j*n,D[5]=g-r*n,D[9]=-A*I,D[2]=r-g*n,D[6]=j+s*n,D[10]=z*I}else if(M.order==="YXZ"){const g=I*T,s=I*u,j=n*T,r=n*u;D[0]=g+r*A,D[4]=j*A-s,D[8]=z*n,D[1]=z*u,D[5]=z*T,D[9]=-A,D[2]=s*A-j,D[6]=r+g*A,D[10]=z*I}else if(M.order==="ZXY"){const g=I*T,s=I*u,j=n*T,r=n*u;D[0]=g-r*A,D[4]=-z*u,D[8]=j+s*A,D[1]=s+j*A,D[5]=z*T,D[9]=r-g*A,D[2]=-z*n,D[6]=A,D[10]=z*I}else if(M.order==="ZYX"){const g=z*T,s=z*u,j=A*T,r=A*u;D[0]=I*T,D[4]=j*n-s,D[8]=g*n+r,D[1]=I*u,D[5]=r*n+g,D[9]=s*n-j,D[2]=-n,D[6]=A*I,D[10]=z*I}else if(M.order==="YZX"){const g=z*I,s=z*n,j=A*I,r=A*n;D[0]=I*T,D[4]=r-g*u,D[8]=j*u+s,D[1]=u,D[5]=z*T,D[9]=-A*T,D[2]=-n*T,D[6]=s*u+j,D[10]=g-r*u}else if(M.order==="XZY"){const g=z*I,s=z*n,j=A*I,r=A*n;D[0]=I*T,D[4]=-u,D[8]=n*T,D[1]=g*u+r,D[5]=z*T,D[9]=s*u-j,D[2]=j*u-s,D[6]=A*T,D[10]=r*u+g}return D[3]=0,D[7]=0,D[11]=0,D[12]=0,D[13]=0,D[14]=0,D[15]=1,this}makeRotationFromQuaternion(M){return this.compose(Au,M,zu)}lookAt(M,D,t){const e=this.elements;return LD.subVectors(M,D),LD.lengthSq()===0&&(LD.z=1),LD.normalize(),xt.crossVectors(t,LD),xt.lengthSq()===0&&(Math.abs(t.z)===1?LD.x+=1e-4:LD.z+=1e-4,LD.normalize(),xt.crossVectors(t,LD)),xt.normalize(),KN.crossVectors(LD,xt),e[0]=xt.x,e[4]=KN.x,e[8]=LD.x,e[1]=xt.y,e[5]=KN.y,e[9]=LD.y,e[2]=xt.z,e[6]=KN.z,e[10]=LD.z,this}multiply(M){return this.multiplyMatrices(this,M)}premultiply(M){return this.multiplyMatrices(M,this)}multiplyMatrices(M,D){const t=M.elements,e=D.elements,i=this.elements,z=t[0],A=t[4],I=t[8],n=t[12],T=t[1],u=t[5],g=t[9],s=t[13],j=t[2],r=t[6],c=t[10],y=t[14],w=t[3],a=t[7],o=t[11],O=t[15],h=e[0],d=e[4],L=e[8],l=e[12],p=e[1],B=e[5],G=e[9],Q=e[13],m=e[2],Z=e[6],H=e[10],$=e[14],F=e[3],J=e[7],W=e[11],TM=e[15];return i[0]=z*h+A*p+I*m+n*F,i[4]=z*d+A*B+I*Z+n*J,i[8]=z*L+A*G+I*H+n*W,i[12]=z*l+A*Q+I*$+n*TM,i[1]=T*h+u*p+g*m+s*F,i[5]=T*d+u*B+g*Z+s*J,i[9]=T*L+u*G+g*H+s*W,i[13]=T*l+u*Q+g*$+s*TM,i[2]=j*h+r*p+c*m+y*F,i[6]=j*d+r*B+c*Z+y*J,i[10]=j*L+r*G+c*H+y*W,i[14]=j*l+r*Q+c*$+y*TM,i[3]=w*h+a*p+o*m+O*F,i[7]=w*d+a*B+o*Z+O*J,i[11]=w*L+a*G+o*H+O*W,i[15]=w*l+a*Q+o*$+O*TM,this}multiplyScalar(M){const D=this.elements;return D[0]*=M,D[4]*=M,D[8]*=M,D[12]*=M,D[1]*=M,D[5]*=M,D[9]*=M,D[13]*=M,D[2]*=M,D[6]*=M,D[10]*=M,D[14]*=M,D[3]*=M,D[7]*=M,D[11]*=M,D[15]*=M,this}determinant(){const M=this.elements,D=M[0],t=M[4],e=M[8],i=M[12],z=M[1],A=M[5],I=M[9],n=M[13],T=M[2],u=M[6],g=M[10],s=M[14],j=M[3],r=M[7],c=M[11],y=M[15];return j*(+i*I*u-e*n*u-i*A*g+t*n*g+e*A*s-t*I*s)+r*(+D*I*s-D*n*g+i*z*g-e*z*s+e*n*T-i*I*T)+c*(+D*n*u-D*A*s-i*z*u+t*z*s+i*A*T-t*n*T)+y*(-e*A*T-D*I*u+D*A*g+e*z*u-t*z*g+t*I*T)}transpose(){const M=this.elements;let D;return D=M[1],M[1]=M[4],M[4]=D,D=M[2],M[2]=M[8],M[8]=D,D=M[6],M[6]=M[9],M[9]=D,D=M[3],M[3]=M[12],M[12]=D,D=M[7],M[7]=M[13],M[13]=D,D=M[11],M[11]=M[14],M[14]=D,this}setPosition(M,D,t){const e=this.elements;return M.isVector3?(e[12]=M.x,e[13]=M.y,e[14]=M.z):(e[12]=M,e[13]=D,e[14]=t),this}invert(){const M=this.elements,D=M[0],t=M[1],e=M[2],i=M[3],z=M[4],A=M[5],I=M[6],n=M[7],T=M[8],u=M[9],g=M[10],s=M[11],j=M[12],r=M[13],c=M[14],y=M[15],w=u*c*n-r*g*n+r*I*s-A*c*s-u*I*y+A*g*y,a=j*g*n-T*c*n-j*I*s+z*c*s+T*I*y-z*g*y,o=T*r*n-j*u*n+j*A*s-z*r*s-T*A*y+z*u*y,O=j*u*I-T*r*I-j*A*g+z*r*g+T*A*c-z*u*c,h=D*w+t*a+e*o+i*O;if(h===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const d=1/h;return M[0]=w*d,M[1]=(r*g*i-u*c*i-r*e*s+t*c*s+u*e*y-t*g*y)*d,M[2]=(A*c*i-r*I*i+r*e*n-t*c*n-A*e*y+t*I*y)*d,M[3]=(u*I*i-A*g*i-u*e*n+t*g*n+A*e*s-t*I*s)*d,M[4]=a*d,M[5]=(T*c*i-j*g*i+j*e*s-D*c*s-T*e*y+D*g*y)*d,M[6]=(j*I*i-z*c*i-j*e*n+D*c*n+z*e*y-D*I*y)*d,M[7]=(z*g*i-T*I*i+T*e*n-D*g*n-z*e*s+D*I*s)*d,M[8]=o*d,M[9]=(j*u*i-T*r*i-j*t*s+D*r*s+T*t*y-D*u*y)*d,M[10]=(z*r*i-j*A*i+j*t*n-D*r*n-z*t*y+D*A*y)*d,M[11]=(T*A*i-z*u*i-T*t*n+D*u*n+z*t*s-D*A*s)*d,M[12]=O*d,M[13]=(T*r*e-j*u*e+j*t*g-D*r*g-T*t*c+D*u*c)*d,M[14]=(j*A*e-z*r*e-j*t*I+D*r*I+z*t*c-D*A*c)*d,M[15]=(z*u*e-T*A*e+T*t*I-D*u*I-z*t*g+D*A*g)*d,this}scale(M){const D=this.elements,t=M.x,e=M.y,i=M.z;return D[0]*=t,D[4]*=e,D[8]*=i,D[1]*=t,D[5]*=e,D[9]*=i,D[2]*=t,D[6]*=e,D[10]*=i,D[3]*=t,D[7]*=e,D[11]*=i,this}getMaxScaleOnAxis(){const M=this.elements,D=M[0]*M[0]+M[1]*M[1]+M[2]*M[2],t=M[4]*M[4]+M[5]*M[5]+M[6]*M[6],e=M[8]*M[8]+M[9]*M[9]+M[10]*M[10];return Math.sqrt(Math.max(D,t,e))}makeTranslation(M,D,t){return this.set(1,0,0,M,0,1,0,D,0,0,1,t,0,0,0,1),this}makeRotationX(M){const D=Math.cos(M),t=Math.sin(M);return this.set(1,0,0,0,0,D,-t,0,0,t,D,0,0,0,0,1),this}makeRotationY(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,0,t,0,0,1,0,0,-t,0,D,0,0,0,0,1),this}makeRotationZ(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,-t,0,0,t,D,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(M,D){const t=Math.cos(D),e=Math.sin(D),i=1-t,z=M.x,A=M.y,I=M.z,n=i*z,T=i*A;return this.set(n*z+t,n*A-e*I,n*I+e*A,0,n*A+e*I,T*A+t,T*I-e*z,0,n*I-e*A,T*I+e*z,i*I*I+t,0,0,0,0,1),this}makeScale(M,D,t){return this.set(M,0,0,0,0,D,0,0,0,0,t,0,0,0,0,1),this}makeShear(M,D,t,e,i,z){return this.set(1,t,i,0,M,1,z,0,D,e,1,0,0,0,0,1),this}compose(M,D,t){const e=this.elements,i=D._x,z=D._y,A=D._z,I=D._w,n=i+i,T=z+z,u=A+A,g=i*n,s=i*T,j=i*u,r=z*T,c=z*u,y=A*u,w=I*n,a=I*T,o=I*u,O=t.x,h=t.y,d=t.z;return e[0]=(1-(r+y))*O,e[1]=(s+o)*O,e[2]=(j-a)*O,e[3]=0,e[4]=(s-o)*h,e[5]=(1-(g+y))*h,e[6]=(c+w)*h,e[7]=0,e[8]=(j+a)*d,e[9]=(c-w)*d,e[10]=(1-(g+r))*d,e[11]=0,e[12]=M.x,e[13]=M.y,e[14]=M.z,e[15]=1,this}decompose(M,D,t){const e=this.elements;let i=Ie.set(e[0],e[1],e[2]).length();const z=Ie.set(e[4],e[5],e[6]).length(),A=Ie.set(e[8],e[9],e[10]).length();this.determinant()<0&&(i=-i),M.x=e[12],M.y=e[13],M.z=e[14],bD.copy(this);const n=1/i,T=1/z,u=1/A;return bD.elements[0]*=n,bD.elements[1]*=n,bD.elements[2]*=n,bD.elements[4]*=T,bD.elements[5]*=T,bD.elements[6]*=T,bD.elements[8]*=u,bD.elements[9]*=u,bD.elements[10]*=u,D.setFromRotationMatrix(bD),t.x=i,t.y=z,t.z=A,this}makePerspective(M,D,t,e,i,z){const A=this.elements,I=2*i/(D-M),n=2*i/(t-e),T=(D+M)/(D-M),u=(t+e)/(t-e),g=-(z+i)/(z-i),s=-2*z*i/(z-i);return A[0]=I,A[4]=0,A[8]=T,A[12]=0,A[1]=0,A[5]=n,A[9]=u,A[13]=0,A[2]=0,A[6]=0,A[10]=g,A[14]=s,A[3]=0,A[7]=0,A[11]=-1,A[15]=0,this}makeOrthographic(M,D,t,e,i,z){const A=this.elements,I=1/(D-M),n=1/(t-e),T=1/(z-i),u=(D+M)*I,g=(t+e)*n,s=(z+i)*T;return A[0]=2*I,A[4]=0,A[8]=0,A[12]=-u,A[1]=0,A[5]=2*n,A[9]=0,A[13]=-g,A[2]=0,A[6]=0,A[10]=-2*T,A[14]=-s,A[3]=0,A[7]=0,A[11]=0,A[15]=1,this}equals(M){const D=this.elements,t=M.elements;for(let e=0;e<16;e++)if(D[e]!==t[e])return!1;return!0}fromArray(M,D=0){for(let t=0;t<16;t++)this.elements[t]=M[t+D];return this}toArray(M=[],D=0){const t=this.elements;return M[D]=t[0],M[D+1]=t[1],M[D+2]=t[2],M[D+3]=t[3],M[D+4]=t[4],M[D+5]=t[5],M[D+6]=t[6],M[D+7]=t[7],M[D+8]=t[8],M[D+9]=t[9],M[D+10]=t[10],M[D+11]=t[11],M[D+12]=t[12],M[D+13]=t[13],M[D+14]=t[14],M[D+15]=t[15],M}};const Ie=new U,bD=new eD,Au=new U(0,0,0),zu=new U(1,1,1),xt=new U,KN=new U,LD=new U;let Te=class{addEventListener(M,D){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[M]===void 0&&(t[M]=[]),t[M].indexOf(D)===-1&&t[M].push(D)}hasEventListener(M,D){if(this._listeners===void 0)return!1;const t=this._listeners;return t[M]!==void 0&&t[M].indexOf(D)!==-1}removeEventListener(M,D){if(this._listeners===void 0)return;const e=this._listeners[M];if(e!==void 0){const i=e.indexOf(D);i!==-1&&e.splice(i,1)}}dispatchEvent(M){if(this._listeners===void 0)return;const t=this._listeners[M.type];if(t!==void 0){M.target=this;const e=t.slice(0);for(let i=0,z=e.length;i<z;i++)e[i].call(this,M);M.target=null}}};const Bz=new eD,Gz=new $e;let Vz=class hT{constructor(M=0,D=0,t=0,e=hT.DEFAULT_ORDER){this.isEuler=!0,this._x=M,this._y=D,this._z=t,this._order=e}get x(){return this._x}set x(M){this._x=M,this._onChangeCallback()}get y(){return this._y}set y(M){this._y=M,this._onChangeCallback()}get z(){return this._z}set z(M){this._z=M,this._onChangeCallback()}get order(){return this._order}set order(M){this._order=M,this._onChangeCallback()}set(M,D,t,e=this._order){return this._x=M,this._y=D,this._z=t,this._order=e,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(M){return this._x=M._x,this._y=M._y,this._z=M._z,this._order=M._order,this._onChangeCallback(),this}setFromRotationMatrix(M,D=this._order,t=!0){const e=M.elements,i=e[0],z=e[4],A=e[8],I=e[1],n=e[5],T=e[9],u=e[2],g=e[6],s=e[10];switch(D){case"XYZ":this._y=Math.asin(ID(A,-1,1)),Math.abs(A)<.9999999?(this._x=Math.atan2(-T,s),this._z=Math.atan2(-z,i)):(this._x=Math.atan2(g,n),this._z=0);break;case"YXZ":this._x=Math.asin(-ID(T,-1,1)),Math.abs(T)<.9999999?(this._y=Math.atan2(A,s),this._z=Math.atan2(I,n)):(this._y=Math.atan2(-u,i),this._z=0);break;case"ZXY":this._x=Math.asin(ID(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-u,s),this._z=Math.atan2(-z,n)):(this._y=0,this._z=Math.atan2(I,i));break;case"ZYX":this._y=Math.asin(-ID(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,s),this._z=Math.atan2(I,i)):(this._x=0,this._z=Math.atan2(-z,n));break;case"YZX":this._z=Math.asin(ID(I,-1,1)),Math.abs(I)<.9999999?(this._x=Math.atan2(-T,n),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(A,s));break;case"XZY":this._z=Math.asin(-ID(z,-1,1)),Math.abs(z)<.9999999?(this._x=Math.atan2(g,n),this._y=Math.atan2(A,i)):(this._x=Math.atan2(-T,s),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+D)}return this._order=D,t===!0&&this._onChangeCallback(),this}setFromQuaternion(M,D,t){return Bz.makeRotationFromQuaternion(M),this.setFromRotationMatrix(Bz,D,t)}setFromVector3(M,D=this._order){return this.set(M.x,M.y,M.z,D)}reorder(M){return Gz.setFromEuler(this),this.setFromQuaternion(Gz,M)}equals(M){return M._x===this._x&&M._y===this._y&&M._z===this._z&&M._order===this._order}fromArray(M){return this._x=M[0],this._y=M[1],this._z=M[2],M[3]!==void 0&&(this._order=M[3]),this._onChangeCallback(),this}toArray(M=[],D=0){return M[D]=this._x,M[D+1]=this._y,M[D+2]=this._z,M[D+3]=this._order,M}_onChange(M){return this._onChangeCallback=M,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vz.DEFAULT_ORDER="XYZ";let Hz=class{constructor(){this.mask=1}set(M){this.mask=(1<<M|0)>>>0}enable(M){this.mask|=1<<M|0}enableAll(){this.mask=-1}toggle(M){this.mask^=1<<M|0}disable(M){this.mask&=~(1<<M|0)}disableAll(){this.mask=0}test(M){return(this.mask&M.mask)!==0}isEnabled(M){return(this.mask&(1<<M|0))!==0}},KD=class dT{constructor(){dT.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(M,D,t,e,i,z,A,I,n){const T=this.elements;return T[0]=M,T[1]=e,T[2]=A,T[3]=D,T[4]=i,T[5]=I,T[6]=t,T[7]=z,T[8]=n,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(M){const D=this.elements,t=M.elements;return D[0]=t[0],D[1]=t[1],D[2]=t[2],D[3]=t[3],D[4]=t[4],D[5]=t[5],D[6]=t[6],D[7]=t[7],D[8]=t[8],this}extractBasis(M,D,t){return M.setFromMatrix3Column(this,0),D.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(M){const D=M.elements;return this.set(D[0],D[4],D[8],D[1],D[5],D[9],D[2],D[6],D[10]),this}multiply(M){return this.multiplyMatrices(this,M)}premultiply(M){return this.multiplyMatrices(M,this)}multiplyMatrices(M,D){const t=M.elements,e=D.elements,i=this.elements,z=t[0],A=t[3],I=t[6],n=t[1],T=t[4],u=t[7],g=t[2],s=t[5],j=t[8],r=e[0],c=e[3],y=e[6],w=e[1],a=e[4],o=e[7],O=e[2],h=e[5],d=e[8];return i[0]=z*r+A*w+I*O,i[3]=z*c+A*a+I*h,i[6]=z*y+A*o+I*d,i[1]=n*r+T*w+u*O,i[4]=n*c+T*a+u*h,i[7]=n*y+T*o+u*d,i[2]=g*r+s*w+j*O,i[5]=g*c+s*a+j*h,i[8]=g*y+s*o+j*d,this}multiplyScalar(M){const D=this.elements;return D[0]*=M,D[3]*=M,D[6]*=M,D[1]*=M,D[4]*=M,D[7]*=M,D[2]*=M,D[5]*=M,D[8]*=M,this}determinant(){const M=this.elements,D=M[0],t=M[1],e=M[2],i=M[3],z=M[4],A=M[5],I=M[6],n=M[7],T=M[8];return D*z*T-D*A*n-t*i*T+t*A*I+e*i*n-e*z*I}invert(){const M=this.elements,D=M[0],t=M[1],e=M[2],i=M[3],z=M[4],A=M[5],I=M[6],n=M[7],T=M[8],u=T*z-A*n,g=A*I-T*i,s=n*i-z*I,j=D*u+t*g+e*s;if(j===0)return this.set(0,0,0,0,0,0,0,0,0);const r=1/j;return M[0]=u*r,M[1]=(e*n-T*t)*r,M[2]=(A*t-e*z)*r,M[3]=g*r,M[4]=(T*D-e*I)*r,M[5]=(e*i-A*D)*r,M[6]=s*r,M[7]=(t*I-n*D)*r,M[8]=(z*D-t*i)*r,this}transpose(){let M;const D=this.elements;return M=D[1],D[1]=D[3],D[3]=M,M=D[2],D[2]=D[6],D[6]=M,M=D[5],D[5]=D[7],D[7]=M,this}getNormalMatrix(M){return this.setFromMatrix4(M).invert().transpose()}transposeIntoArray(M){const D=this.elements;return M[0]=D[0],M[1]=D[3],M[2]=D[6],M[3]=D[1],M[4]=D[4],M[5]=D[7],M[6]=D[2],M[7]=D[5],M[8]=D[8],this}setUvTransform(M,D,t,e,i,z,A){const I=Math.cos(i),n=Math.sin(i);return this.set(t*I,t*n,-t*(I*z+n*A)+z+M,-e*n,e*I,-e*(-n*z+I*A)+A+D,0,0,1),this}scale(M,D){return this.premultiply(Wi.makeScale(M,D)),this}rotate(M){return this.premultiply(Wi.makeRotation(-M)),this}translate(M,D){return this.premultiply(Wi.makeTranslation(M,D)),this}makeTranslation(M,D){return this.set(1,0,M,0,1,D,0,0,1),this}makeRotation(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,-t,0,t,D,0,0,0,1),this}makeScale(M,D){return this.set(M,0,0,0,D,0,0,0,1),this}equals(M){const D=this.elements,t=M.elements;for(let e=0;e<9;e++)if(D[e]!==t[e])return!1;return!0}fromArray(M,D=0){for(let t=0;t<9;t++)this.elements[t]=M[t+D];return this}toArray(M=[],D=0){const t=this.elements;return M[D]=t[0],M[D+1]=t[1],M[D+2]=t[2],M[D+3]=t[3],M[D+4]=t[4],M[D+5]=t[5],M[D+6]=t[6],M[D+7]=t[7],M[D+8]=t[8],M}clone(){return new this.constructor().fromArray(this.elements)}};const Wi=new KD;let nu=0;const Wz=new U,ue=new $e,Nt=new eD,RN=new U,Je=new U,Iu=new U,Tu=new $e,Xz=new U(1,0,0),qz=new U(0,1,0),$z=new U(0,0,1),uu={type:"added"},Jz={type:"removed"};let yD=class _i extends Te{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=ne(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_i.DEFAULT_UP.clone();const M=new U,D=new Vz,t=new $e,e=new U(1,1,1);function i(){t.setFromEuler(D,!1)}function z(){D.setFromQuaternion(t,void 0,!1)}D._onChange(i),t._onChange(z),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:M},rotation:{configurable:!0,enumerable:!0,value:D},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:e},modelViewMatrix:{value:new eD},normalMatrix:{value:new KD}}),this.matrix=new eD,this.matrixWorld=new eD,this.matrixAutoUpdate=_i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=_i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Hz,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(M){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(M),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(M){return this.quaternion.premultiply(M),this}setRotationFromAxisAngle(M,D){this.quaternion.setFromAxisAngle(M,D)}setRotationFromEuler(M){this.quaternion.setFromEuler(M,!0)}setRotationFromMatrix(M){this.quaternion.setFromRotationMatrix(M)}setRotationFromQuaternion(M){this.quaternion.copy(M)}rotateOnAxis(M,D){return ue.setFromAxisAngle(M,D),this.quaternion.multiply(ue),this}rotateOnWorldAxis(M,D){return ue.setFromAxisAngle(M,D),this.quaternion.premultiply(ue),this}rotateX(M){return this.rotateOnAxis(Xz,M)}rotateY(M){return this.rotateOnAxis(qz,M)}rotateZ(M){return this.rotateOnAxis($z,M)}translateOnAxis(M,D){return Wz.copy(M).applyQuaternion(this.quaternion),this.position.add(Wz.multiplyScalar(D)),this}translateX(M){return this.translateOnAxis(Xz,M)}translateY(M){return this.translateOnAxis(qz,M)}translateZ(M){return this.translateOnAxis($z,M)}localToWorld(M){return this.updateWorldMatrix(!0,!1),M.applyMatrix4(this.matrixWorld)}worldToLocal(M){return this.updateWorldMatrix(!0,!1),M.applyMatrix4(Nt.copy(this.matrixWorld).invert())}lookAt(M,D,t){M.isVector3?RN.copy(M):RN.set(M,D,t);const e=this.parent;this.updateWorldMatrix(!0,!1),Je.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nt.lookAt(Je,RN,this.up):Nt.lookAt(RN,Je,this.up),this.quaternion.setFromRotationMatrix(Nt),e&&(Nt.extractRotation(e.matrixWorld),ue.setFromRotationMatrix(Nt),this.quaternion.premultiply(ue.invert()))}add(M){if(arguments.length>1){for(let D=0;D<arguments.length;D++)this.add(arguments[D]);return this}return M===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",M),this):(M&&M.isObject3D?(M.parent!==null&&M.parent.remove(M),M.parent=this,this.children.push(M),M.dispatchEvent(uu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",M),this)}remove(M){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const D=this.children.indexOf(M);return D!==-1&&(M.parent=null,this.children.splice(D,1),M.dispatchEvent(Jz)),this}removeFromParent(){const M=this.parent;return M!==null&&M.remove(this),this}clear(){for(let M=0;M<this.children.length;M++){const D=this.children[M];D.parent=null,D.dispatchEvent(Jz)}return this.children.length=0,this}attach(M){return this.updateWorldMatrix(!0,!1),Nt.copy(this.matrixWorld).invert(),M.parent!==null&&(M.parent.updateWorldMatrix(!0,!1),Nt.multiply(M.parent.matrixWorld)),M.applyMatrix4(Nt),this.add(M),M.updateWorldMatrix(!1,!0),this}getObjectById(M){return this.getObjectByProperty("id",M)}getObjectByName(M){return this.getObjectByProperty("name",M)}getObjectByProperty(M,D){if(this[M]===D)return this;for(let t=0,e=this.children.length;t<e;t++){const z=this.children[t].getObjectByProperty(M,D);if(z!==void 0)return z}}getObjectsByProperty(M,D){let t=[];this[M]===D&&t.push(this);for(let e=0,i=this.children.length;e<i;e++){const z=this.children[e].getObjectsByProperty(M,D);z.length>0&&(t=t.concat(z))}return t}getWorldPosition(M){return this.updateWorldMatrix(!0,!1),M.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(M){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Je,M,Iu),M}getWorldScale(M){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Je,Tu,M),M}getWorldDirection(M){this.updateWorldMatrix(!0,!1);const D=this.matrixWorld.elements;return M.set(D[8],D[9],D[10]).normalize()}raycast(){}traverse(M){M(this);const D=this.children;for(let t=0,e=D.length;t<e;t++)D[t].traverse(M)}traverseVisible(M){if(this.visible===!1)return;M(this);const D=this.children;for(let t=0,e=D.length;t<e;t++)D[t].traverseVisible(M)}traverseAncestors(M){const D=this.parent;D!==null&&(M(D),D.traverseAncestors(M))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(M){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||M)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,M=!0);const D=this.children;for(let t=0,e=D.length;t<e;t++){const i=D[t];(i.matrixWorldAutoUpdate===!0||M===!0)&&i.updateMatrixWorld(M)}}updateWorldMatrix(M,D){const t=this.parent;if(M===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),D===!0){const e=this.children;for(let i=0,z=e.length;i<z;i++){const A=e[i];A.matrixWorldAutoUpdate===!0&&A.updateWorldMatrix(!1,!0)}}}toJSON(M){const D=M===void 0||typeof M=="string",t={};D&&(M={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const e={};e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),this.castShadow===!0&&(e.castShadow=!0),this.receiveShadow===!0&&(e.receiveShadow=!0),this.visible===!1&&(e.visible=!1),this.frustumCulled===!1&&(e.frustumCulled=!1),this.renderOrder!==0&&(e.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(e.userData=this.userData),e.layers=this.layers.mask,e.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(e.matrixAutoUpdate=!1),this.isInstancedMesh&&(e.type="InstancedMesh",e.count=this.count,e.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(e.instanceColor=this.instanceColor.toJSON()));function i(A,I){return A[I.uuid]===void 0&&(A[I.uuid]=I.toJSON(M)),I.uuid}if(this.isScene)this.background&&(this.background.isColor?e.background=this.background.toJSON():this.background.isTexture&&(e.background=this.background.toJSON(M).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(e.environment=this.environment.toJSON(M).uuid);else if(this.isMesh||this.isLine||this.isPoints){e.geometry=i(M.geometries,this.geometry);const A=this.geometry.parameters;if(A!==void 0&&A.shapes!==void 0){const I=A.shapes;if(Array.isArray(I))for(let n=0,T=I.length;n<T;n++){const u=I[n];i(M.shapes,u)}else i(M.shapes,I)}}if(this.isSkinnedMesh&&(e.bindMode=this.bindMode,e.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(M.skeletons,this.skeleton),e.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const A=[];for(let I=0,n=this.material.length;I<n;I++)A.push(i(M.materials,this.material[I]));e.material=A}else e.material=i(M.materials,this.material);if(this.children.length>0){e.children=[];for(let A=0;A<this.children.length;A++)e.children.push(this.children[A].toJSON(M).object)}if(this.animations.length>0){e.animations=[];for(let A=0;A<this.animations.length;A++){const I=this.animations[A];e.animations.push(i(M.animations,I))}}if(D){const A=z(M.geometries),I=z(M.materials),n=z(M.textures),T=z(M.images),u=z(M.shapes),g=z(M.skeletons),s=z(M.animations),j=z(M.nodes);A.length>0&&(t.geometries=A),I.length>0&&(t.materials=I),n.length>0&&(t.textures=n),T.length>0&&(t.images=T),u.length>0&&(t.shapes=u),g.length>0&&(t.skeletons=g),s.length>0&&(t.animations=s),j.length>0&&(t.nodes=j)}return t.object=e,t;function z(A){const I=[];for(const n in A){const T=A[n];delete T.metadata,I.push(T)}return I}}clone(M){return new this.constructor().copy(this,M)}copy(M,D=!0){if(this.name=M.name,this.up.copy(M.up),this.position.copy(M.position),this.rotation.order=M.rotation.order,this.quaternion.copy(M.quaternion),this.scale.copy(M.scale),this.matrix.copy(M.matrix),this.matrixWorld.copy(M.matrixWorld),this.matrixAutoUpdate=M.matrixAutoUpdate,this.matrixWorldNeedsUpdate=M.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=M.matrixWorldAutoUpdate,this.layers.mask=M.layers.mask,this.visible=M.visible,this.castShadow=M.castShadow,this.receiveShadow=M.receiveShadow,this.frustumCulled=M.frustumCulled,this.renderOrder=M.renderOrder,this.userData=JSON.parse(JSON.stringify(M.userData)),D===!0)for(let t=0;t<M.children.length;t++){const e=M.children[t];this.add(e.clone())}return this}};yD.DEFAULT_UP=new U(0,1,0),yD.DEFAULT_MATRIX_AUTO_UPDATE=!0,yD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Mn extends yD{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new eD,this.projectionMatrix=new eD,this.projectionMatrixInverse=new eD}copy(M,D){return super.copy(M,D),this.matrixWorldInverse.copy(M.matrixWorldInverse),this.projectionMatrix.copy(M.projectionMatrix),this.projectionMatrixInverse.copy(M.projectionMatrixInverse),this}getWorldDirection(M){this.updateWorldMatrix(!0,!1);const D=this.matrixWorld.elements;return M.set(-D[8],-D[9],-D[10]).normalize()}updateMatrixWorld(M){super.updateMatrixWorld(M),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(M,D){super.updateWorldMatrix(M,D),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class UD extends Mn{constructor(M=50,D=1,t=.1,e=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=M,this.zoom=1,this.near=t,this.far=e,this.focus=10,this.aspect=D,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(M,D){return super.copy(M,D),this.fov=M.fov,this.zoom=M.zoom,this.near=M.near,this.far=M.far,this.focus=M.focus,this.aspect=M.aspect,this.view=M.view===null?null:Object.assign({},M.view),this.filmGauge=M.filmGauge,this.filmOffset=M.filmOffset,this}setFocalLength(M){const D=.5*this.getFilmHeight()/M;this.fov=Rz*2*Math.atan(D),this.updateProjectionMatrix()}getFocalLength(){const M=Math.tan(Bi*.5*this.fov);return .5*this.getFilmHeight()/M}getEffectiveFOV(){return Rz*2*Math.atan(Math.tan(Bi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(M,D,t,e,i,z){this.aspect=M/D,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=M,this.view.fullHeight=D,this.view.offsetX=t,this.view.offsetY=e,this.view.width=i,this.view.height=z,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const M=this.near;let D=M*Math.tan(Bi*.5*this.fov)/this.zoom,t=2*D,e=this.aspect*t,i=-.5*e;const z=this.view;if(this.view!==null&&this.view.enabled){const I=z.fullWidth,n=z.fullHeight;i+=z.offsetX*e/I,D-=z.offsetY*t/n,e*=z.width/I,t*=z.height/n}const A=this.filmOffset;A!==0&&(i+=M*A/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+e,D,D-t,M,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(M){const D=super.toJSON(M);return D.object.fov=this.fov,D.object.zoom=this.zoom,D.object.near=this.near,D.object.far=this.far,D.object.focus=this.focus,D.object.aspect=this.aspect,this.view!==null&&(D.object.view=Object.assign({},this.view)),D.object.filmGauge=this.filmGauge,D.object.filmOffset=this.filmOffset,D}}const gu="149",su=0,Dn=1,ru=2,tn=1,cu=2,MN=3,Ot=0,wD=1,Et=2,lt=0,ge=1,en=2,Nn=3,An=4,ju=5,se=100,yu=101,au=102,zn=103,nn=104,ou=200,Cu=201,Lu=202,wu=203,In=204,Tn=205,xu=206,Ou=207,Eu=208,lu=209,hu=210,du=0,vu=1,Yu=2,Xi=3,pu=4,Uu=5,fu=6,mu=7,qi=0,Qu=1,ku=2,it=0,Su=1,Zu=2,_u=3,bu=4,Ku=5,un=300,re=301,ce=302,$i=303,Ji=304,PN=306,MA=1e3,RD=1001,DA=1002,TD=1003,gn=1004,tA=1005,aD=1006,Ru=1007,DN=1008,kt=1009,Pu=1010,Fu=1011,sn=1012,Bu=1013,St=1014,Zt=1015,tN=1016,Gu=1017,Vu=1018,je=1020,Hu=1021,PD=1023,Wu=1024,Xu=1025,_t=1026,ye=1027,qu=1028,$u=1029,Ju=1030,Mg=1031,Dg=1033,eA=33776,NA=33777,iA=33778,AA=33779,rn=35840,cn=35841,jn=35842,yn=35843,tg=36196,an=37492,on=37496,Cn=37808,Ln=37809,wn=37810,xn=37811,On=37812,En=37813,ln=37814,hn=37815,dn=37816,vn=37817,Yn=37818,pn=37819,Un=37820,fn=37821,zA=36492,eg=36283,mn=36284,Qn=36285,kn=36286,bt=3e3,SM=3001,Ng=3200,ig=3201,Sn=0,Ag=1,qD="srgb",eN="srgb-linear",nA=7680,zg=519,Zn=35044,_n="300 es",IA=1035;function Kt(N){return N<.04045?N*.0773993808:Math.pow(N*.9478672986+.0521327014,2.4)}function FN(N){return N<.0031308?N*12.92:1.055*Math.pow(N,.41666)-.055}const TA={[qD]:{[eN]:Kt},[eN]:{[qD]:FN}},uD={legacyMode:!0,get workingColorSpace(){return eN},set workingColorSpace(N){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(N,M,D){if(this.legacyMode||M===D||!M||!D)return N;if(TA[M]&&TA[M][D]!==void 0){const t=TA[M][D];return N.r=t(N.r),N.g=t(N.g),N.b=t(N.b),N}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(N,M){return this.convert(N,this.workingColorSpace,M)},toWorkingColorSpace:function(N,M){return this.convert(N,M,this.workingColorSpace)}},bn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},GM={r:0,g:0,b:0},FD={h:0,s:0,l:0},BN={h:0,s:0,l:0};function uA(N,M,D){return D<0&&(D+=1),D>1&&(D-=1),D<1/6?N+(M-N)*6*D:D<1/2?M:D<2/3?N+(M-N)*6*(2/3-D):N}function GN(N,M){return M.r=N.r,M.g=N.g,M.b=N.b,M}let QM=class{constructor(M,D,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,D===void 0&&t===void 0?this.set(M):this.setRGB(M,D,t)}set(M){return M&&M.isColor?this.copy(M):typeof M=="number"?this.setHex(M):typeof M=="string"&&this.setStyle(M),this}setScalar(M){return this.r=M,this.g=M,this.b=M,this}setHex(M,D=qD){return M=Math.floor(M),this.r=(M>>16&255)/255,this.g=(M>>8&255)/255,this.b=(M&255)/255,uD.toWorkingColorSpace(this,D),this}setRGB(M,D,t,e=uD.workingColorSpace){return this.r=M,this.g=D,this.b=t,uD.toWorkingColorSpace(this,e),this}setHSL(M,D,t,e=uD.workingColorSpace){if(M=Nu(M,1),D=ID(D,0,1),t=ID(t,0,1),D===0)this.r=this.g=this.b=t;else{const i=t<=.5?t*(1+D):t+D-t*D,z=2*t-i;this.r=uA(z,i,M+1/3),this.g=uA(z,i,M),this.b=uA(z,i,M-1/3)}return uD.toWorkingColorSpace(this,e),this}setStyle(M,D=qD){function t(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+M+" will be ignored.")}let e;if(e=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(M)){let i;const z=e[1],A=e[2];switch(z){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))return this.r=Math.min(255,parseInt(i[1],10))/255,this.g=Math.min(255,parseInt(i[2],10))/255,this.b=Math.min(255,parseInt(i[3],10))/255,uD.toWorkingColorSpace(this,D),t(i[4]),this;if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))return this.r=Math.min(100,parseInt(i[1],10))/100,this.g=Math.min(100,parseInt(i[2],10))/100,this.b=Math.min(100,parseInt(i[3],10))/100,uD.toWorkingColorSpace(this,D),t(i[4]),this;break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A)){const I=parseFloat(i[1])/360,n=parseFloat(i[2])/100,T=parseFloat(i[3])/100;return t(i[4]),this.setHSL(I,n,T,D)}break}}else if(e=/^\#([A-Fa-f\d]+)$/.exec(M)){const i=e[1],z=i.length;if(z===3)return this.r=parseInt(i.charAt(0)+i.charAt(0),16)/255,this.g=parseInt(i.charAt(1)+i.charAt(1),16)/255,this.b=parseInt(i.charAt(2)+i.charAt(2),16)/255,uD.toWorkingColorSpace(this,D),this;if(z===6)return this.r=parseInt(i.charAt(0)+i.charAt(1),16)/255,this.g=parseInt(i.charAt(2)+i.charAt(3),16)/255,this.b=parseInt(i.charAt(4)+i.charAt(5),16)/255,uD.toWorkingColorSpace(this,D),this}return M&&M.length>0?this.setColorName(M,D):this}setColorName(M,D=qD){const t=bn[M.toLowerCase()];return t!==void 0?this.setHex(t,D):console.warn("THREE.Color: Unknown color "+M),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(M){return this.r=M.r,this.g=M.g,this.b=M.b,this}copySRGBToLinear(M){return this.r=Kt(M.r),this.g=Kt(M.g),this.b=Kt(M.b),this}copyLinearToSRGB(M){return this.r=FN(M.r),this.g=FN(M.g),this.b=FN(M.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(M=qD){return uD.fromWorkingColorSpace(GN(this,GM),M),ID(GM.r*255,0,255)<<16^ID(GM.g*255,0,255)<<8^ID(GM.b*255,0,255)<<0}getHexString(M=qD){return("000000"+this.getHex(M).toString(16)).slice(-6)}getHSL(M,D=uD.workingColorSpace){uD.fromWorkingColorSpace(GN(this,GM),D);const t=GM.r,e=GM.g,i=GM.b,z=Math.max(t,e,i),A=Math.min(t,e,i);let I,n;const T=(A+z)/2;if(A===z)I=0,n=0;else{const u=z-A;switch(n=T<=.5?u/(z+A):u/(2-z-A),z){case t:I=(e-i)/u+(e<i?6:0);break;case e:I=(i-t)/u+2;break;case i:I=(t-e)/u+4;break}I/=6}return M.h=I,M.s=n,M.l=T,M}getRGB(M,D=uD.workingColorSpace){return uD.fromWorkingColorSpace(GN(this,GM),D),M.r=GM.r,M.g=GM.g,M.b=GM.b,M}getStyle(M=qD){return uD.fromWorkingColorSpace(GN(this,GM),M),M!==qD?`color(${M} ${GM.r} ${GM.g} ${GM.b})`:`rgb(${GM.r*255|0},${GM.g*255|0},${GM.b*255|0})`}offsetHSL(M,D,t){return this.getHSL(FD),FD.h+=M,FD.s+=D,FD.l+=t,this.setHSL(FD.h,FD.s,FD.l),this}add(M){return this.r+=M.r,this.g+=M.g,this.b+=M.b,this}addColors(M,D){return this.r=M.r+D.r,this.g=M.g+D.g,this.b=M.b+D.b,this}addScalar(M){return this.r+=M,this.g+=M,this.b+=M,this}sub(M){return this.r=Math.max(0,this.r-M.r),this.g=Math.max(0,this.g-M.g),this.b=Math.max(0,this.b-M.b),this}multiply(M){return this.r*=M.r,this.g*=M.g,this.b*=M.b,this}multiplyScalar(M){return this.r*=M,this.g*=M,this.b*=M,this}lerp(M,D){return this.r+=(M.r-this.r)*D,this.g+=(M.g-this.g)*D,this.b+=(M.b-this.b)*D,this}lerpColors(M,D,t){return this.r=M.r+(D.r-M.r)*t,this.g=M.g+(D.g-M.g)*t,this.b=M.b+(D.b-M.b)*t,this}lerpHSL(M,D){this.getHSL(FD),M.getHSL(BN);const t=Gi(FD.h,BN.h,D),e=Gi(FD.s,BN.s,D),i=Gi(FD.l,BN.l,D);return this.setHSL(t,e,i),this}equals(M){return M.r===this.r&&M.g===this.g&&M.b===this.b}fromArray(M,D=0){return this.r=M[D],this.g=M[D+1],this.b=M[D+2],this}toArray(M=[],D=0){return M[D]=this.r,M[D+1]=this.g,M[D+2]=this.b,M}fromBufferAttribute(M,D){return this.r=M.getX(D),this.g=M.getY(D),this.b=M.getZ(D),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};QM.NAMES=bn;class ng extends yD{constructor(M,D=1){super(),this.isLight=!0,this.type="Light",this.color=new QM(M),this.intensity=D}dispose(){}copy(M,D){return super.copy(M,D),this.color.copy(M.color),this.intensity=M.intensity,this}toJSON(M){const D=super.toJSON(M);return D.object.color=this.color.getHex(),D.object.intensity=this.intensity,this.groundColor!==void 0&&(D.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(D.object.distance=this.distance),this.angle!==void 0&&(D.object.angle=this.angle),this.decay!==void 0&&(D.object.decay=this.decay),this.penumbra!==void 0&&(D.object.penumbra=this.penumbra),this.shadow!==void 0&&(D.object.shadow=this.shadow.toJSON()),D}}let gM=class vT{constructor(M=0,D=0){vT.prototype.isVector2=!0,this.x=M,this.y=D}get width(){return this.x}set width(M){this.x=M}get height(){return this.y}set height(M){this.y=M}set(M,D){return this.x=M,this.y=D,this}setScalar(M){return this.x=M,this.y=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y)}copy(M){return this.x=M.x,this.y=M.y,this}add(M){return this.x+=M.x,this.y+=M.y,this}addScalar(M){return this.x+=M,this.y+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this}subScalar(M){return this.x-=M,this.y-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this}multiply(M){return this.x*=M.x,this.y*=M.y,this}multiplyScalar(M){return this.x*=M,this.y*=M,this}divide(M){return this.x/=M.x,this.y/=M.y,this}divideScalar(M){return this.multiplyScalar(1/M)}applyMatrix3(M){const D=this.x,t=this.y,e=M.elements;return this.x=e[0]*D+e[3]*t+e[6],this.y=e[1]*D+e[4]*t+e[7],this}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(M){return this.x*M.x+this.y*M.y}cross(M){return this.x*M.y-this.y*M.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(M){return Math.sqrt(this.distanceToSquared(M))}distanceToSquared(M){const D=this.x-M.x,t=this.y-M.y;return D*D+t*t}manhattanDistanceTo(M){return Math.abs(this.x-M.x)+Math.abs(this.y-M.y)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this}equals(M){return M.x===this.x&&M.y===this.y}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this}rotateAround(M,D){const t=Math.cos(D),e=Math.sin(D),i=this.x-M.x,z=this.y-M.y;return this.x=i*t-z*e+M.x,this.y=i*e+z*t+M.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};class qM{constructor(M=0,D=0,t=0,e=1){qM.prototype.isVector4=!0,this.x=M,this.y=D,this.z=t,this.w=e}get width(){return this.z}set width(M){this.z=M}get height(){return this.w}set height(M){this.w=M}set(M,D,t,e){return this.x=M,this.y=D,this.z=t,this.w=e,this}setScalar(M){return this.x=M,this.y=M,this.z=M,this.w=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setZ(M){return this.z=M,this}setW(M){return this.w=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;case 2:this.z=D;break;case 3:this.w=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(M){return this.x=M.x,this.y=M.y,this.z=M.z,this.w=M.w!==void 0?M.w:1,this}add(M){return this.x+=M.x,this.y+=M.y,this.z+=M.z,this.w+=M.w,this}addScalar(M){return this.x+=M,this.y+=M,this.z+=M,this.w+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this.z=M.z+D.z,this.w=M.w+D.w,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this.z+=M.z*D,this.w+=M.w*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this.z-=M.z,this.w-=M.w,this}subScalar(M){return this.x-=M,this.y-=M,this.z-=M,this.w-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this.z=M.z-D.z,this.w=M.w-D.w,this}multiply(M){return this.x*=M.x,this.y*=M.y,this.z*=M.z,this.w*=M.w,this}multiplyScalar(M){return this.x*=M,this.y*=M,this.z*=M,this.w*=M,this}applyMatrix4(M){const D=this.x,t=this.y,e=this.z,i=this.w,z=M.elements;return this.x=z[0]*D+z[4]*t+z[8]*e+z[12]*i,this.y=z[1]*D+z[5]*t+z[9]*e+z[13]*i,this.z=z[2]*D+z[6]*t+z[10]*e+z[14]*i,this.w=z[3]*D+z[7]*t+z[11]*e+z[15]*i,this}divideScalar(M){return this.multiplyScalar(1/M)}setAxisAngleFromQuaternion(M){this.w=2*Math.acos(M.w);const D=Math.sqrt(1-M.w*M.w);return D<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=M.x/D,this.y=M.y/D,this.z=M.z/D),this}setAxisAngleFromRotationMatrix(M){let D,t,e,i;const I=M.elements,n=I[0],T=I[4],u=I[8],g=I[1],s=I[5],j=I[9],r=I[2],c=I[6],y=I[10];if(Math.abs(T-g)<.01&&Math.abs(u-r)<.01&&Math.abs(j-c)<.01){if(Math.abs(T+g)<.1&&Math.abs(u+r)<.1&&Math.abs(j+c)<.1&&Math.abs(n+s+y-3)<.1)return this.set(1,0,0,0),this;D=Math.PI;const a=(n+1)/2,o=(s+1)/2,O=(y+1)/2,h=(T+g)/4,d=(u+r)/4,L=(j+c)/4;return a>o&&a>O?a<.01?(t=0,e=.707106781,i=.707106781):(t=Math.sqrt(a),e=h/t,i=d/t):o>O?o<.01?(t=.707106781,e=0,i=.707106781):(e=Math.sqrt(o),t=h/e,i=L/e):O<.01?(t=.707106781,e=.707106781,i=0):(i=Math.sqrt(O),t=d/i,e=L/i),this.set(t,e,i,D),this}let w=Math.sqrt((c-j)*(c-j)+(u-r)*(u-r)+(g-T)*(g-T));return Math.abs(w)<.001&&(w=1),this.x=(c-j)/w,this.y=(u-r)/w,this.z=(g-T)/w,this.w=Math.acos((n+s+y-1)/2),this}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this.z=Math.min(this.z,M.z),this.w=Math.min(this.w,M.w),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this.z=Math.max(this.z,M.z),this.w=Math.max(this.w,M.w),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this.z=Math.max(M.z,Math.min(D.z,this.z)),this.w=Math.max(M.w,Math.min(D.w,this.w)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this.z=Math.max(M,Math.min(D,this.z)),this.w=Math.max(M,Math.min(D,this.w)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(M){return this.x*M.x+this.y*M.y+this.z*M.z+this.w*M.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this.z+=(M.z-this.z)*D,this.w+=(M.w-this.w)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this.z=M.z+(D.z-M.z)*t,this.w=M.w+(D.w-M.w)*t,this}equals(M){return M.x===this.x&&M.y===this.y&&M.z===this.z&&M.w===this.w}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this.z=M[D+2],this.w=M[D+3],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M[D+2]=this.z,M[D+3]=this.w,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this.z=M.getZ(D),this.w=M.getW(D),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}let ae=class{constructor(M=new U(1/0,1/0,1/0),D=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=M,this.max=D}set(M,D){return this.min.copy(M),this.max.copy(D),this}setFromArray(M){let D=1/0,t=1/0,e=1/0,i=-1/0,z=-1/0,A=-1/0;for(let I=0,n=M.length;I<n;I+=3){const T=M[I],u=M[I+1],g=M[I+2];T<D&&(D=T),u<t&&(t=u),g<e&&(e=g),T>i&&(i=T),u>z&&(z=u),g>A&&(A=g)}return this.min.set(D,t,e),this.max.set(i,z,A),this}setFromBufferAttribute(M){let D=1/0,t=1/0,e=1/0,i=-1/0,z=-1/0,A=-1/0;for(let I=0,n=M.count;I<n;I++){const T=M.getX(I),u=M.getY(I),g=M.getZ(I);T<D&&(D=T),u<t&&(t=u),g<e&&(e=g),T>i&&(i=T),u>z&&(z=u),g>A&&(A=g)}return this.min.set(D,t,e),this.max.set(i,z,A),this}setFromPoints(M){this.makeEmpty();for(let D=0,t=M.length;D<t;D++)this.expandByPoint(M[D]);return this}setFromCenterAndSize(M,D){const t=Rt.copy(D).multiplyScalar(.5);return this.min.copy(M).sub(t),this.max.copy(M).add(t),this}setFromObject(M,D=!1){return this.makeEmpty(),this.expandByObject(M,D)}clone(){return new this.constructor().copy(this)}copy(M){return this.min.copy(M.min),this.max.copy(M.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(M){return this.isEmpty()?M.set(0,0,0):M.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(M){return this.isEmpty()?M.set(0,0,0):M.subVectors(this.max,this.min)}expandByPoint(M){return this.min.min(M),this.max.max(M),this}expandByVector(M){return this.min.sub(M),this.max.add(M),this}expandByScalar(M){return this.min.addScalar(-M),this.max.addScalar(M),this}expandByObject(M,D=!1){M.updateWorldMatrix(!1,!1);const t=M.geometry;if(t!==void 0)if(D&&t.attributes!=null&&t.attributes.position!==void 0){const i=t.attributes.position;for(let z=0,A=i.count;z<A;z++)Rt.fromBufferAttribute(i,z).applyMatrix4(M.matrixWorld),this.expandByPoint(Rt)}else t.boundingBox===null&&t.computeBoundingBox(),gA.copy(t.boundingBox),gA.applyMatrix4(M.matrixWorld),this.union(gA);const e=M.children;for(let i=0,z=e.length;i<z;i++)this.expandByObject(e[i],D);return this}containsPoint(M){return!(M.x<this.min.x||M.x>this.max.x||M.y<this.min.y||M.y>this.max.y||M.z<this.min.z||M.z>this.max.z)}containsBox(M){return this.min.x<=M.min.x&&M.max.x<=this.max.x&&this.min.y<=M.min.y&&M.max.y<=this.max.y&&this.min.z<=M.min.z&&M.max.z<=this.max.z}getParameter(M,D){return D.set((M.x-this.min.x)/(this.max.x-this.min.x),(M.y-this.min.y)/(this.max.y-this.min.y),(M.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(M){return!(M.max.x<this.min.x||M.min.x>this.max.x||M.max.y<this.min.y||M.min.y>this.max.y||M.max.z<this.min.z||M.min.z>this.max.z)}intersectsSphere(M){return this.clampPoint(M.center,Rt),Rt.distanceToSquared(M.center)<=M.radius*M.radius}intersectsPlane(M){let D,t;return M.normal.x>0?(D=M.normal.x*this.min.x,t=M.normal.x*this.max.x):(D=M.normal.x*this.max.x,t=M.normal.x*this.min.x),M.normal.y>0?(D+=M.normal.y*this.min.y,t+=M.normal.y*this.max.y):(D+=M.normal.y*this.max.y,t+=M.normal.y*this.min.y),M.normal.z>0?(D+=M.normal.z*this.min.z,t+=M.normal.z*this.max.z):(D+=M.normal.z*this.max.z,t+=M.normal.z*this.min.z),D<=-M.constant&&t>=-M.constant}intersectsTriangle(M){if(this.isEmpty())return!1;this.getCenter(NN),VN.subVectors(this.max,NN),oe.subVectors(M.a,NN),Ce.subVectors(M.b,NN),Le.subVectors(M.c,NN),ht.subVectors(Ce,oe),dt.subVectors(Le,Ce),Pt.subVectors(oe,Le);let D=[0,-ht.z,ht.y,0,-dt.z,dt.y,0,-Pt.z,Pt.y,ht.z,0,-ht.x,dt.z,0,-dt.x,Pt.z,0,-Pt.x,-ht.y,ht.x,0,-dt.y,dt.x,0,-Pt.y,Pt.x,0];return!sA(D,oe,Ce,Le,VN)||(D=[1,0,0,0,1,0,0,0,1],!sA(D,oe,Ce,Le,VN))?!1:(HN.crossVectors(ht,dt),D=[HN.x,HN.y,HN.z],sA(D,oe,Ce,Le,VN))}clampPoint(M,D){return D.copy(M).clamp(this.min,this.max)}distanceToPoint(M){return Rt.copy(M).clamp(this.min,this.max).sub(M).length()}getBoundingSphere(M){return this.getCenter(M.center),M.radius=this.getSize(Rt).length()*.5,M}intersect(M){return this.min.max(M.min),this.max.min(M.max),this.isEmpty()&&this.makeEmpty(),this}union(M){return this.min.min(M.min),this.max.max(M.max),this}applyMatrix4(M){return this.isEmpty()?this:(At[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(M),At[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(M),At[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(M),At[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(M),At[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(M),At[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(M),At[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(M),At[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(M),this.setFromPoints(At),this)}translate(M){return this.min.add(M),this.max.add(M),this}equals(M){return M.min.equals(this.min)&&M.max.equals(this.max)}};const At=[new U,new U,new U,new U,new U,new U,new U,new U],Rt=new U,gA=new ae,oe=new U,Ce=new U,Le=new U,ht=new U,dt=new U,Pt=new U,NN=new U,VN=new U,HN=new U,Ft=new U;function sA(N,M,D,t,e){for(let i=0,z=N.length-3;i<=z;i+=3){Ft.fromArray(N,i);const A=e.x*Math.abs(Ft.x)+e.y*Math.abs(Ft.y)+e.z*Math.abs(Ft.z),I=M.dot(Ft),n=D.dot(Ft),T=t.dot(Ft);if(Math.max(-Math.max(I,n,T),Math.min(I,n,T))>A)return!1}return!0}const Ig=new ae,iN=new U,rA=new U;let cA=class{constructor(M=new U,D=-1){this.center=M,this.radius=D}set(M,D){return this.center.copy(M),this.radius=D,this}setFromPoints(M,D){const t=this.center;D!==void 0?t.copy(D):Ig.setFromPoints(M).getCenter(t);let e=0;for(let i=0,z=M.length;i<z;i++)e=Math.max(e,t.distanceToSquared(M[i]));return this.radius=Math.sqrt(e),this}copy(M){return this.center.copy(M.center),this.radius=M.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(M){return M.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(M){return M.distanceTo(this.center)-this.radius}intersectsSphere(M){const D=this.radius+M.radius;return M.center.distanceToSquared(this.center)<=D*D}intersectsBox(M){return M.intersectsSphere(this)}intersectsPlane(M){return Math.abs(M.distanceToPoint(this.center))<=this.radius}clampPoint(M,D){const t=this.center.distanceToSquared(M);return D.copy(M),t>this.radius*this.radius&&(D.sub(this.center).normalize(),D.multiplyScalar(this.radius).add(this.center)),D}getBoundingBox(M){return this.isEmpty()?(M.makeEmpty(),M):(M.set(this.center,this.center),M.expandByScalar(this.radius),M)}applyMatrix4(M){return this.center.applyMatrix4(M),this.radius=this.radius*M.getMaxScaleOnAxis(),this}translate(M){return this.center.add(M),this}expandByPoint(M){if(this.isEmpty())return this.center.copy(M),this.radius=0,this;iN.subVectors(M,this.center);const D=iN.lengthSq();if(D>this.radius*this.radius){const t=Math.sqrt(D),e=(t-this.radius)*.5;this.center.addScaledVector(iN,e/t),this.radius+=e}return this}union(M){return M.isEmpty()?this:this.isEmpty()?(this.copy(M),this):(this.center.equals(M.center)===!0?this.radius=Math.max(this.radius,M.radius):(rA.subVectors(M.center,this.center).setLength(M.radius),this.expandByPoint(iN.copy(M.center).add(rA)),this.expandByPoint(iN.copy(M.center).sub(rA))),this)}equals(M){return M.center.equals(this.center)&&M.radius===this.radius}clone(){return new this.constructor().copy(this)}};const jA=new U,Tg=new U,ug=new KD;class Bt{constructor(M=new U(1,0,0),D=0){this.isPlane=!0,this.normal=M,this.constant=D}set(M,D){return this.normal.copy(M),this.constant=D,this}setComponents(M,D,t,e){return this.normal.set(M,D,t),this.constant=e,this}setFromNormalAndCoplanarPoint(M,D){return this.normal.copy(M),this.constant=-D.dot(this.normal),this}setFromCoplanarPoints(M,D,t){const e=jA.subVectors(t,D).cross(Tg.subVectors(M,D)).normalize();return this.setFromNormalAndCoplanarPoint(e,M),this}copy(M){return this.normal.copy(M.normal),this.constant=M.constant,this}normalize(){const M=1/this.normal.length();return this.normal.multiplyScalar(M),this.constant*=M,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(M){return this.normal.dot(M)+this.constant}distanceToSphere(M){return this.distanceToPoint(M.center)-M.radius}projectPoint(M,D){return D.copy(this.normal).multiplyScalar(-this.distanceToPoint(M)).add(M)}intersectLine(M,D){const t=M.delta(jA),e=this.normal.dot(t);if(e===0)return this.distanceToPoint(M.start)===0?D.copy(M.start):null;const i=-(M.start.dot(this.normal)+this.constant)/e;return i<0||i>1?null:D.copy(t).multiplyScalar(i).add(M.start)}intersectsLine(M){const D=this.distanceToPoint(M.start),t=this.distanceToPoint(M.end);return D<0&&t>0||t<0&&D>0}intersectsBox(M){return M.intersectsPlane(this)}intersectsSphere(M){return M.intersectsPlane(this)}coplanarPoint(M){return M.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(M,D){const t=D||ug.getNormalMatrix(M),e=this.coplanarPoint(jA).applyMatrix4(M),i=this.normal.applyMatrix3(t).normalize();return this.constant=-e.dot(i),this}translate(M){return this.constant-=M.dot(this.normal),this}equals(M){return M.normal.equals(this.normal)&&M.constant===this.constant}clone(){return new this.constructor().copy(this)}}const we=new cA,WN=new U;class yA{constructor(M=new Bt,D=new Bt,t=new Bt,e=new Bt,i=new Bt,z=new Bt){this.planes=[M,D,t,e,i,z]}set(M,D,t,e,i,z){const A=this.planes;return A[0].copy(M),A[1].copy(D),A[2].copy(t),A[3].copy(e),A[4].copy(i),A[5].copy(z),this}copy(M){const D=this.planes;for(let t=0;t<6;t++)D[t].copy(M.planes[t]);return this}setFromProjectionMatrix(M){const D=this.planes,t=M.elements,e=t[0],i=t[1],z=t[2],A=t[3],I=t[4],n=t[5],T=t[6],u=t[7],g=t[8],s=t[9],j=t[10],r=t[11],c=t[12],y=t[13],w=t[14],a=t[15];return D[0].setComponents(A-e,u-I,r-g,a-c).normalize(),D[1].setComponents(A+e,u+I,r+g,a+c).normalize(),D[2].setComponents(A+i,u+n,r+s,a+y).normalize(),D[3].setComponents(A-i,u-n,r-s,a-y).normalize(),D[4].setComponents(A-z,u-T,r-j,a-w).normalize(),D[5].setComponents(A+z,u+T,r+j,a+w).normalize(),this}intersectsObject(M){const D=M.geometry;return D.boundingSphere===null&&D.computeBoundingSphere(),we.copy(D.boundingSphere).applyMatrix4(M.matrixWorld),this.intersectsSphere(we)}intersectsSprite(M){return we.center.set(0,0,0),we.radius=.7071067811865476,we.applyMatrix4(M.matrixWorld),this.intersectsSphere(we)}intersectsSphere(M){const D=this.planes,t=M.center,e=-M.radius;for(let i=0;i<6;i++)if(D[i].distanceToPoint(t)<e)return!1;return!0}intersectsBox(M){const D=this.planes;for(let t=0;t<6;t++){const e=D[t];if(WN.x=e.normal.x>0?M.max.x:M.min.x,WN.y=e.normal.y>0?M.max.y:M.min.y,WN.z=e.normal.z>0?M.max.z:M.min.z,e.distanceToPoint(WN)<0)return!1}return!0}containsPoint(M){const D=this.planes;for(let t=0;t<6;t++)if(D[t].distanceToPoint(M)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const aA=new eD,Kn=new U,Rn=new U;class gg{constructor(M){this.camera=M,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gM(512,512),this.map=null,this.mapPass=null,this.matrix=new eD,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yA,this._frameExtents=new gM(1,1),this._viewportCount=1,this._viewports=[new qM(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(M){const D=this.camera,t=this.matrix;Kn.setFromMatrixPosition(M.matrixWorld),D.position.copy(Kn),Rn.setFromMatrixPosition(M.target.matrixWorld),D.lookAt(Rn),D.updateMatrixWorld(),aA.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),this._frustum.setFromProjectionMatrix(aA),t.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),t.multiply(aA)}getViewport(M){return this._viewports[M]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(M){return this.camera=M.camera.clone(),this.bias=M.bias,this.radius=M.radius,this.mapSize.copy(M.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const M={};return this.bias!==0&&(M.bias=this.bias),this.normalBias!==0&&(M.normalBias=this.normalBias),this.radius!==1&&(M.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(M.mapSize=this.mapSize.toArray()),M.camera=this.camera.toJSON(!1).object,delete M.camera.matrix,M}}class Pn extends Mn{constructor(M=-1,D=1,t=1,e=-1,i=.1,z=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=M,this.right=D,this.top=t,this.bottom=e,this.near=i,this.far=z,this.updateProjectionMatrix()}copy(M,D){return super.copy(M,D),this.left=M.left,this.right=M.right,this.top=M.top,this.bottom=M.bottom,this.near=M.near,this.far=M.far,this.zoom=M.zoom,this.view=M.view===null?null:Object.assign({},M.view),this}setViewOffset(M,D,t,e,i,z){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=M,this.view.fullHeight=D,this.view.offsetX=t,this.view.offsetY=e,this.view.width=i,this.view.height=z,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const M=(this.right-this.left)/(2*this.zoom),D=(this.top-this.bottom)/(2*this.zoom),t=(this.right+this.left)/2,e=(this.top+this.bottom)/2;let i=t-M,z=t+M,A=e+D,I=e-D;if(this.view!==null&&this.view.enabled){const n=(this.right-this.left)/this.view.fullWidth/this.zoom,T=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=n*this.view.offsetX,z=i+n*this.view.width,A-=T*this.view.offsetY,I=A-T*this.view.height}this.projectionMatrix.makeOrthographic(i,z,A,I,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(M){const D=super.toJSON(M);return D.object.zoom=this.zoom,D.object.left=this.left,D.object.right=this.right,D.object.top=this.top,D.object.bottom=this.bottom,D.object.near=this.near,D.object.far=this.far,this.view!==null&&(D.object.view=Object.assign({},this.view)),D}}class sg extends gg{constructor(){super(new Pn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rg extends ng{constructor(M,D){super(M,D),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yD.DEFAULT_UP),this.updateMatrix(),this.target=new yD,this.shadow=new sg}dispose(){this.shadow.dispose()}copy(M){return super.copy(M),this.target=M.target.clone(),this.shadow=M.shadow.clone(),this}}const Fn={enabled:!1,files:{},add:function(N,M){this.enabled!==!1&&(this.files[N]=M)},get:function(N){if(this.enabled!==!1)return this.files[N]},remove:function(N){delete this.files[N]},clear:function(){this.files={}}};let cg=class{constructor(M,D,t){const e=this;let i=!1,z=0,A=0,I;const n=[];this.onStart=void 0,this.onLoad=M,this.onProgress=D,this.onError=t,this.itemStart=function(T){A++,i===!1&&e.onStart!==void 0&&e.onStart(T,z,A),i=!0},this.itemEnd=function(T){z++,e.onProgress!==void 0&&e.onProgress(T,z,A),z===A&&(i=!1,e.onLoad!==void 0&&e.onLoad())},this.itemError=function(T){e.onError!==void 0&&e.onError(T)},this.resolveURL=function(T){return I?I(T):T},this.setURLModifier=function(T){return I=T,this},this.addHandler=function(T,u){return n.push(T,u),this},this.removeHandler=function(T){const u=n.indexOf(T);return u!==-1&&n.splice(u,2),this},this.getHandler=function(T){for(let u=0,g=n.length;u<g;u+=2){const s=n[u],j=n[u+1];if(s.global&&(s.lastIndex=0),s.test(T))return j}return null}}};const jg=new cg;let Bn=class{constructor(M){this.manager=M!==void 0?M:jg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(M,D){const t=this;return new Promise(function(e,i){t.load(M,e,D,i)})}parse(){}setCrossOrigin(M){return this.crossOrigin=M,this}setWithCredentials(M){return this.withCredentials=M,this}setPath(M){return this.path=M,this}setResourcePath(M){return this.resourcePath=M,this}setRequestHeader(M){return this.requestHeader=M,this}};function Gn(N){for(let M=N.length-1;M>=0;--M)if(N[M]>=65535)return!0;return!1}function AN(N){return document.createElementNS("http://www.w3.org/1999/xhtml",N)}class yg extends Bn{constructor(M){super(M)}load(M,D,t,e){this.path!==void 0&&(M=this.path+M),M=this.manager.resolveURL(M);const i=this,z=Fn.get(M);if(z!==void 0)return i.manager.itemStart(M),setTimeout(function(){D&&D(z),i.manager.itemEnd(M)},0),z;const A=AN("img");function I(){T(),Fn.add(M,this),D&&D(this),i.manager.itemEnd(M)}function n(u){T(),e&&e(u),i.manager.itemError(M),i.manager.itemEnd(M)}function T(){A.removeEventListener("load",I,!1),A.removeEventListener("error",n,!1)}return A.addEventListener("load",I,!1),A.addEventListener("error",n,!1),M.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(A.crossOrigin=this.crossOrigin),i.manager.itemStart(M),A.src=M,A}}let xe,Vn=class{static getDataURL(M){if(/^data:/i.test(M.src)||typeof HTMLCanvasElement>"u")return M.src;let D;if(M instanceof HTMLCanvasElement)D=M;else{xe===void 0&&(xe=AN("canvas")),xe.width=M.width,xe.height=M.height;const t=xe.getContext("2d");M instanceof ImageData?t.putImageData(M,0,0):t.drawImage(M,0,0,M.width,M.height),D=xe}return D.width>2048||D.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",M),D.toDataURL("image/jpeg",.6)):D.toDataURL("image/png")}static sRGBToLinear(M){if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const D=AN("canvas");D.width=M.width,D.height=M.height;const t=D.getContext("2d");t.drawImage(M,0,0,M.width,M.height);const e=t.getImageData(0,0,M.width,M.height),i=e.data;for(let z=0;z<i.length;z++)i[z]=Kt(i[z]/255)*255;return t.putImageData(e,0,0),D}else if(M.data){const D=M.data.slice(0);for(let t=0;t<D.length;t++)D instanceof Uint8Array||D instanceof Uint8ClampedArray?D[t]=Math.floor(Kt(D[t]/255)*255):D[t]=Kt(D[t]);return{data:D,width:M.width,height:M.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),M}},Hn=class{constructor(M=null){this.isSource=!0,this.uuid=ne(),this.data=M,this.version=0}set needsUpdate(M){M===!0&&this.version++}toJSON(M){const D=M===void 0||typeof M=="string";if(!D&&M.images[this.uuid]!==void 0)return M.images[this.uuid];const t={uuid:this.uuid,url:""},e=this.data;if(e!==null){let i;if(Array.isArray(e)){i=[];for(let z=0,A=e.length;z<A;z++)e[z].isDataTexture?i.push(oA(e[z].image)):i.push(oA(e[z]))}else i=oA(e);t.url=i}return D||(M.images[this.uuid]=t),t}};function oA(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap?Vn.getDataURL(N):N.data?{data:Array.from(N.data),width:N.width,height:N.height,type:N.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ag=0,BD=class bi extends Te{constructor(M=bi.DEFAULT_IMAGE,D=bi.DEFAULT_MAPPING,t=RD,e=RD,i=aD,z=DN,A=PD,I=kt,n=bi.DEFAULT_ANISOTROPY,T=bt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=ne(),this.name="",this.source=new Hn(M),this.mipmaps=[],this.mapping=D,this.wrapS=t,this.wrapT=e,this.magFilter=i,this.minFilter=z,this.anisotropy=n,this.format=A,this.internalFormat=null,this.type=I,this.offset=new gM(0,0),this.repeat=new gM(1,1),this.center=new gM(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new KD,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=T,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(M){this.source.data=M}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(M){return this.name=M.name,this.source=M.source,this.mipmaps=M.mipmaps.slice(0),this.mapping=M.mapping,this.wrapS=M.wrapS,this.wrapT=M.wrapT,this.magFilter=M.magFilter,this.minFilter=M.minFilter,this.anisotropy=M.anisotropy,this.format=M.format,this.internalFormat=M.internalFormat,this.type=M.type,this.offset.copy(M.offset),this.repeat.copy(M.repeat),this.center.copy(M.center),this.rotation=M.rotation,this.matrixAutoUpdate=M.matrixAutoUpdate,this.matrix.copy(M.matrix),this.generateMipmaps=M.generateMipmaps,this.premultiplyAlpha=M.premultiplyAlpha,this.flipY=M.flipY,this.unpackAlignment=M.unpackAlignment,this.encoding=M.encoding,this.userData=JSON.parse(JSON.stringify(M.userData)),this.needsUpdate=!0,this}toJSON(M){const D=M===void 0||typeof M=="string";if(!D&&M.textures[this.uuid]!==void 0)return M.textures[this.uuid];const t={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(M).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),D||(M.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(M){if(this.mapping!==un)return M;if(M.applyMatrix3(this.matrix),M.x<0||M.x>1)switch(this.wrapS){case MA:M.x=M.x-Math.floor(M.x);break;case RD:M.x=M.x<0?0:1;break;case DA:Math.abs(Math.floor(M.x)%2)===1?M.x=Math.ceil(M.x)-M.x:M.x=M.x-Math.floor(M.x);break}if(M.y<0||M.y>1)switch(this.wrapT){case MA:M.y=M.y-Math.floor(M.y);break;case RD:M.y=M.y<0?0:1;break;case DA:Math.abs(Math.floor(M.y)%2)===1?M.y=Math.ceil(M.y)-M.y:M.y=M.y-Math.floor(M.y);break}return this.flipY&&(M.y=1-M.y),M}set needsUpdate(M){M===!0&&(this.version++,this.source.needsUpdate=!0)}};BD.DEFAULT_IMAGE=null,BD.DEFAULT_MAPPING=un,BD.DEFAULT_ANISOTROPY=1;class og extends Bn{constructor(M){super(M)}load(M,D,t,e){const i=new BD,z=new yg(this.manager);return z.setCrossOrigin(this.crossOrigin),z.setPath(this.path),z.load(M,function(A){i.image=A,i.needsUpdate=!0,D!==void 0&&D(i)},t,e),i}}let Cg=0,zN=class extends Te{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=ne(),this.name="",this.type="Material",this.blending=ge,this.side=Ot,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=In,this.blendDst=Tn,this.blendEquation=se,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nA,this.stencilZFail=nA,this.stencilZPass=nA,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(M){this._alphaTest>0!=M>0&&this.version++,this._alphaTest=M}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(M){if(M!==void 0)for(const D in M){const t=M[D];if(t===void 0){console.warn("THREE.Material: '"+D+"' parameter is undefined.");continue}const e=this[D];if(e===void 0){console.warn("THREE."+this.type+": '"+D+"' is not a property of this material.");continue}e&&e.isColor?e.set(t):e&&e.isVector3&&t&&t.isVector3?e.copy(t):this[D]=t}}toJSON(M){const D=M===void 0||typeof M=="string";D&&(M={textures:{},images:{}});const t={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen!==void 0&&(t.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(t.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(t.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(t.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(t.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(M).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(M).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(M).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(t.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(t.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(t.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(t.iridescenceMap=this.iridescenceMap.toJSON(M).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(t.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(M).uuid),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(M).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(M).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(M).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(M).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(M).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(M).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(M).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(M).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(M).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(M).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(M).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(M).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(t.specularIntensityMap=this.specularIntensityMap.toJSON(M).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(t.specularColorMap=this.specularColorMap.toJSON(M).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(M).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(M).uuid),this.transmission!==void 0&&(t.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(t.transmissionMap=this.transmissionMap.toJSON(M).uuid),this.thickness!==void 0&&(t.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(t.thicknessMap=this.thicknessMap.toJSON(M).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(t.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(t.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==ge&&(t.blending=this.blending),this.side!==Ot&&(t.side=this.side),this.vertexColors&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=this.transparent),t.depthFunc=this.depthFunc,t.depthTest=this.depthTest,t.depthWrite=this.depthWrite,t.colorWrite=this.colorWrite,t.stencilWrite=this.stencilWrite,t.stencilWriteMask=this.stencilWriteMask,t.stencilFunc=this.stencilFunc,t.stencilRef=this.stencilRef,t.stencilFuncMask=this.stencilFuncMask,t.stencilFail=this.stencilFail,t.stencilZFail=this.stencilZFail,t.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(t.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(t.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(t.wireframe=this.wireframe),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(t.flatShading=this.flatShading),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),this.fog===!1&&(t.fog=!1),Object.keys(this.userData).length>0&&(t.userData=this.userData);function e(i){const z=[];for(const A in i){const I=i[A];delete I.metadata,z.push(I)}return z}if(D){const i=e(M.textures),z=e(M.images);i.length>0&&(t.textures=i),z.length>0&&(t.images=z)}return t}clone(){return new this.constructor().copy(this)}copy(M){this.name=M.name,this.blending=M.blending,this.side=M.side,this.vertexColors=M.vertexColors,this.opacity=M.opacity,this.transparent=M.transparent,this.blendSrc=M.blendSrc,this.blendDst=M.blendDst,this.blendEquation=M.blendEquation,this.blendSrcAlpha=M.blendSrcAlpha,this.blendDstAlpha=M.blendDstAlpha,this.blendEquationAlpha=M.blendEquationAlpha,this.depthFunc=M.depthFunc,this.depthTest=M.depthTest,this.depthWrite=M.depthWrite,this.stencilWriteMask=M.stencilWriteMask,this.stencilFunc=M.stencilFunc,this.stencilRef=M.stencilRef,this.stencilFuncMask=M.stencilFuncMask,this.stencilFail=M.stencilFail,this.stencilZFail=M.stencilZFail,this.stencilZPass=M.stencilZPass,this.stencilWrite=M.stencilWrite;const D=M.clippingPlanes;let t=null;if(D!==null){const e=D.length;t=new Array(e);for(let i=0;i!==e;++i)t[i]=D[i].clone()}return this.clippingPlanes=t,this.clipIntersection=M.clipIntersection,this.clipShadows=M.clipShadows,this.shadowSide=M.shadowSide,this.colorWrite=M.colorWrite,this.precision=M.precision,this.polygonOffset=M.polygonOffset,this.polygonOffsetFactor=M.polygonOffsetFactor,this.polygonOffsetUnits=M.polygonOffsetUnits,this.dithering=M.dithering,this.alphaTest=M.alphaTest,this.alphaToCoverage=M.alphaToCoverage,this.premultipliedAlpha=M.premultipliedAlpha,this.forceSinglePass=M.forceSinglePass,this.visible=M.visible,this.toneMapped=M.toneMapped,this.userData=JSON.parse(JSON.stringify(M.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(M){M===!0&&this.version++}};class Wn extends zN{constructor(M){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new QM(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new QM(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sn,this.normalScale=new gM(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=qi,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.map=M.map,this.lightMap=M.lightMap,this.lightMapIntensity=M.lightMapIntensity,this.aoMap=M.aoMap,this.aoMapIntensity=M.aoMapIntensity,this.emissive.copy(M.emissive),this.emissiveMap=M.emissiveMap,this.emissiveIntensity=M.emissiveIntensity,this.bumpMap=M.bumpMap,this.bumpScale=M.bumpScale,this.normalMap=M.normalMap,this.normalMapType=M.normalMapType,this.normalScale.copy(M.normalScale),this.displacementMap=M.displacementMap,this.displacementScale=M.displacementScale,this.displacementBias=M.displacementBias,this.specularMap=M.specularMap,this.alphaMap=M.alphaMap,this.envMap=M.envMap,this.combine=M.combine,this.reflectivity=M.reflectivity,this.refractionRatio=M.refractionRatio,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.wireframeLinecap=M.wireframeLinecap,this.wireframeLinejoin=M.wireframeLinejoin,this.flatShading=M.flatShading,this.fog=M.fog,this}}const zt=new U,CA=new U,XN=new U,vt=new U,LA=new U,qN=new U,wA=new U;let Lg=class{constructor(M=new U,D=new U(0,0,-1)){this.origin=M,this.direction=D}set(M,D){return this.origin.copy(M),this.direction.copy(D),this}copy(M){return this.origin.copy(M.origin),this.direction.copy(M.direction),this}at(M,D){return D.copy(this.direction).multiplyScalar(M).add(this.origin)}lookAt(M){return this.direction.copy(M).sub(this.origin).normalize(),this}recast(M){return this.origin.copy(this.at(M,zt)),this}closestPointToPoint(M,D){D.subVectors(M,this.origin);const t=D.dot(this.direction);return t<0?D.copy(this.origin):D.copy(this.direction).multiplyScalar(t).add(this.origin)}distanceToPoint(M){return Math.sqrt(this.distanceSqToPoint(M))}distanceSqToPoint(M){const D=zt.subVectors(M,this.origin).dot(this.direction);return D<0?this.origin.distanceToSquared(M):(zt.copy(this.direction).multiplyScalar(D).add(this.origin),zt.distanceToSquared(M))}distanceSqToSegment(M,D,t,e){CA.copy(M).add(D).multiplyScalar(.5),XN.copy(D).sub(M).normalize(),vt.copy(this.origin).sub(CA);const i=M.distanceTo(D)*.5,z=-this.direction.dot(XN),A=vt.dot(this.direction),I=-vt.dot(XN),n=vt.lengthSq(),T=Math.abs(1-z*z);let u,g,s,j;if(T>0)if(u=z*I-A,g=z*A-I,j=i*T,u>=0)if(g>=-j)if(g<=j){const r=1/T;u*=r,g*=r,s=u*(u+z*g+2*A)+g*(z*u+g+2*I)+n}else g=i,u=Math.max(0,-(z*g+A)),s=-u*u+g*(g+2*I)+n;else g=-i,u=Math.max(0,-(z*g+A)),s=-u*u+g*(g+2*I)+n;else g<=-j?(u=Math.max(0,-(-z*i+A)),g=u>0?-i:Math.min(Math.max(-i,-I),i),s=-u*u+g*(g+2*I)+n):g<=j?(u=0,g=Math.min(Math.max(-i,-I),i),s=g*(g+2*I)+n):(u=Math.max(0,-(z*i+A)),g=u>0?i:Math.min(Math.max(-i,-I),i),s=-u*u+g*(g+2*I)+n);else g=z>0?-i:i,u=Math.max(0,-(z*g+A)),s=-u*u+g*(g+2*I)+n;return t&&t.copy(this.direction).multiplyScalar(u).add(this.origin),e&&e.copy(XN).multiplyScalar(g).add(CA),s}intersectSphere(M,D){zt.subVectors(M.center,this.origin);const t=zt.dot(this.direction),e=zt.dot(zt)-t*t,i=M.radius*M.radius;if(e>i)return null;const z=Math.sqrt(i-e),A=t-z,I=t+z;return A<0&&I<0?null:A<0?this.at(I,D):this.at(A,D)}intersectsSphere(M){return this.distanceSqToPoint(M.center)<=M.radius*M.radius}distanceToPlane(M){const D=M.normal.dot(this.direction);if(D===0)return M.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(M.normal)+M.constant)/D;return t>=0?t:null}intersectPlane(M,D){const t=this.distanceToPlane(M);return t===null?null:this.at(t,D)}intersectsPlane(M){const D=M.distanceToPoint(this.origin);return D===0||M.normal.dot(this.direction)*D<0}intersectBox(M,D){let t,e,i,z,A,I;const n=1/this.direction.x,T=1/this.direction.y,u=1/this.direction.z,g=this.origin;return n>=0?(t=(M.min.x-g.x)*n,e=(M.max.x-g.x)*n):(t=(M.max.x-g.x)*n,e=(M.min.x-g.x)*n),T>=0?(i=(M.min.y-g.y)*T,z=(M.max.y-g.y)*T):(i=(M.max.y-g.y)*T,z=(M.min.y-g.y)*T),t>z||i>e||((i>t||isNaN(t))&&(t=i),(z<e||isNaN(e))&&(e=z),u>=0?(A=(M.min.z-g.z)*u,I=(M.max.z-g.z)*u):(A=(M.max.z-g.z)*u,I=(M.min.z-g.z)*u),t>I||A>e)||((A>t||t!==t)&&(t=A),(I<e||e!==e)&&(e=I),e<0)?null:this.at(t>=0?t:e,D)}intersectsBox(M){return this.intersectBox(M,zt)!==null}intersectTriangle(M,D,t,e,i){LA.subVectors(D,M),qN.subVectors(t,M),wA.crossVectors(LA,qN);let z=this.direction.dot(wA),A;if(z>0){if(e)return null;A=1}else if(z<0)A=-1,z=-z;else return null;vt.subVectors(this.origin,M);const I=A*this.direction.dot(qN.crossVectors(vt,qN));if(I<0)return null;const n=A*this.direction.dot(LA.cross(vt));if(n<0||I+n>z)return null;const T=-A*vt.dot(wA);return T<0?null:this.at(T/z,i)}applyMatrix4(M){return this.origin.applyMatrix4(M),this.direction.transformDirection(M),this}equals(M){return M.origin.equals(this.origin)&&M.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};const GD=new U,nt=new U,xA=new U,It=new U,Oe=new U,Ee=new U,Xn=new U,OA=new U,EA=new U,lA=new U;let hA=class We{constructor(M=new U,D=new U,t=new U){this.a=M,this.b=D,this.c=t}static getNormal(M,D,t,e){e.subVectors(t,D),GD.subVectors(M,D),e.cross(GD);const i=e.lengthSq();return i>0?e.multiplyScalar(1/Math.sqrt(i)):e.set(0,0,0)}static getBarycoord(M,D,t,e,i){GD.subVectors(e,D),nt.subVectors(t,D),xA.subVectors(M,D);const z=GD.dot(GD),A=GD.dot(nt),I=GD.dot(xA),n=nt.dot(nt),T=nt.dot(xA),u=z*n-A*A;if(u===0)return i.set(-2,-1,-1);const g=1/u,s=(n*I-A*T)*g,j=(z*T-A*I)*g;return i.set(1-s-j,j,s)}static containsPoint(M,D,t,e){return this.getBarycoord(M,D,t,e,It),It.x>=0&&It.y>=0&&It.x+It.y<=1}static getUV(M,D,t,e,i,z,A,I){return this.getBarycoord(M,D,t,e,It),I.set(0,0),I.addScaledVector(i,It.x),I.addScaledVector(z,It.y),I.addScaledVector(A,It.z),I}static isFrontFacing(M,D,t,e){return GD.subVectors(t,D),nt.subVectors(M,D),GD.cross(nt).dot(e)<0}set(M,D,t){return this.a.copy(M),this.b.copy(D),this.c.copy(t),this}setFromPointsAndIndices(M,D,t,e){return this.a.copy(M[D]),this.b.copy(M[t]),this.c.copy(M[e]),this}setFromAttributeAndIndices(M,D,t,e){return this.a.fromBufferAttribute(M,D),this.b.fromBufferAttribute(M,t),this.c.fromBufferAttribute(M,e),this}clone(){return new this.constructor().copy(this)}copy(M){return this.a.copy(M.a),this.b.copy(M.b),this.c.copy(M.c),this}getArea(){return GD.subVectors(this.c,this.b),nt.subVectors(this.a,this.b),GD.cross(nt).length()*.5}getMidpoint(M){return M.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(M){return We.getNormal(this.a,this.b,this.c,M)}getPlane(M){return M.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(M,D){return We.getBarycoord(M,this.a,this.b,this.c,D)}getUV(M,D,t,e,i){return We.getUV(M,this.a,this.b,this.c,D,t,e,i)}containsPoint(M){return We.containsPoint(M,this.a,this.b,this.c)}isFrontFacing(M){return We.isFrontFacing(this.a,this.b,this.c,M)}intersectsBox(M){return M.intersectsTriangle(this)}closestPointToPoint(M,D){const t=this.a,e=this.b,i=this.c;let z,A;Oe.subVectors(e,t),Ee.subVectors(i,t),OA.subVectors(M,t);const I=Oe.dot(OA),n=Ee.dot(OA);if(I<=0&&n<=0)return D.copy(t);EA.subVectors(M,e);const T=Oe.dot(EA),u=Ee.dot(EA);if(T>=0&&u<=T)return D.copy(e);const g=I*u-T*n;if(g<=0&&I>=0&&T<=0)return z=I/(I-T),D.copy(t).addScaledVector(Oe,z);lA.subVectors(M,i);const s=Oe.dot(lA),j=Ee.dot(lA);if(j>=0&&s<=j)return D.copy(i);const r=s*n-I*j;if(r<=0&&n>=0&&j<=0)return A=n/(n-j),D.copy(t).addScaledVector(Ee,A);const c=T*j-s*u;if(c<=0&&u-T>=0&&s-j>=0)return Xn.subVectors(i,e),A=(u-T)/(u-T+(s-j)),D.copy(e).addScaledVector(Xn,A);const y=1/(c+r+g);return z=r*y,A=g*y,D.copy(t).addScaledVector(Oe,z).addScaledVector(Ee,A)}equals(M){return M.a.equals(this.a)&&M.b.equals(this.b)&&M.c.equals(this.c)}},qn=class extends zN{constructor(M){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new QM(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=qi,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.map=M.map,this.lightMap=M.lightMap,this.lightMapIntensity=M.lightMapIntensity,this.aoMap=M.aoMap,this.aoMapIntensity=M.aoMapIntensity,this.specularMap=M.specularMap,this.alphaMap=M.alphaMap,this.envMap=M.envMap,this.combine=M.combine,this.reflectivity=M.reflectivity,this.refractionRatio=M.refractionRatio,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.wireframeLinecap=M.wireframeLinecap,this.wireframeLinejoin=M.wireframeLinejoin,this.fog=M.fog,this}};const RM=new U,$N=new gM;let $D=class{constructor(M,D,t=!1){if(Array.isArray(M))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=M,this.itemSize=D,this.count=M!==void 0?M.length/D:0,this.normalized=t,this.usage=Zn,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(M){M===!0&&this.version++}setUsage(M){return this.usage=M,this}copy(M){return this.name=M.name,this.array=new M.array.constructor(M.array),this.itemSize=M.itemSize,this.count=M.count,this.normalized=M.normalized,this.usage=M.usage,this}copyAt(M,D,t){M*=this.itemSize,t*=D.itemSize;for(let e=0,i=this.itemSize;e<i;e++)this.array[M+e]=D.array[t+e];return this}copyArray(M){return this.array.set(M),this}applyMatrix3(M){if(this.itemSize===2)for(let D=0,t=this.count;D<t;D++)$N.fromBufferAttribute(this,D),$N.applyMatrix3(M),this.setXY(D,$N.x,$N.y);else if(this.itemSize===3)for(let D=0,t=this.count;D<t;D++)RM.fromBufferAttribute(this,D),RM.applyMatrix3(M),this.setXYZ(D,RM.x,RM.y,RM.z);return this}applyMatrix4(M){for(let D=0,t=this.count;D<t;D++)RM.fromBufferAttribute(this,D),RM.applyMatrix4(M),this.setXYZ(D,RM.x,RM.y,RM.z);return this}applyNormalMatrix(M){for(let D=0,t=this.count;D<t;D++)RM.fromBufferAttribute(this,D),RM.applyNormalMatrix(M),this.setXYZ(D,RM.x,RM.y,RM.z);return this}transformDirection(M){for(let D=0,t=this.count;D<t;D++)RM.fromBufferAttribute(this,D),RM.transformDirection(M),this.setXYZ(D,RM.x,RM.y,RM.z);return this}set(M,D=0){return this.array.set(M,D),this}getX(M){let D=this.array[M*this.itemSize];return this.normalized&&(D=bN(D,this.array)),D}setX(M,D){return this.normalized&&(D=CD(D,this.array)),this.array[M*this.itemSize]=D,this}getY(M){let D=this.array[M*this.itemSize+1];return this.normalized&&(D=bN(D,this.array)),D}setY(M,D){return this.normalized&&(D=CD(D,this.array)),this.array[M*this.itemSize+1]=D,this}getZ(M){let D=this.array[M*this.itemSize+2];return this.normalized&&(D=bN(D,this.array)),D}setZ(M,D){return this.normalized&&(D=CD(D,this.array)),this.array[M*this.itemSize+2]=D,this}getW(M){let D=this.array[M*this.itemSize+3];return this.normalized&&(D=bN(D,this.array)),D}setW(M,D){return this.normalized&&(D=CD(D,this.array)),this.array[M*this.itemSize+3]=D,this}setXY(M,D,t){return M*=this.itemSize,this.normalized&&(D=CD(D,this.array),t=CD(t,this.array)),this.array[M+0]=D,this.array[M+1]=t,this}setXYZ(M,D,t,e){return M*=this.itemSize,this.normalized&&(D=CD(D,this.array),t=CD(t,this.array),e=CD(e,this.array)),this.array[M+0]=D,this.array[M+1]=t,this.array[M+2]=e,this}setXYZW(M,D,t,e,i){return M*=this.itemSize,this.normalized&&(D=CD(D,this.array),t=CD(t,this.array),e=CD(e,this.array),i=CD(i,this.array)),this.array[M+0]=D,this.array[M+1]=t,this.array[M+2]=e,this.array[M+3]=i,this}onUpload(M){return this.onUploadCallback=M,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const M={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(M.name=this.name),this.usage!==Zn&&(M.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(M.updateRange=this.updateRange),M}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}},$n=class extends $D{constructor(M,D,t){super(new Uint16Array(M),D,t)}},Jn=class extends $D{constructor(M,D,t){super(new Uint32Array(M),D,t)}},JD=class extends $D{constructor(M,D,t){super(new Float32Array(M),D,t)}},wg=0;const fD=new eD,dA=new yD,le=new U,xD=new ae,nN=new ae,$M=new U;let he=class YT extends Te{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=ne(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(M){return Array.isArray(M)?this.index=new(Gn(M)?Jn:$n)(M,1):this.index=M,this}getAttribute(M){return this.attributes[M]}setAttribute(M,D){return this.attributes[M]=D,this}deleteAttribute(M){return delete this.attributes[M],this}hasAttribute(M){return this.attributes[M]!==void 0}addGroup(M,D,t=0){this.groups.push({start:M,count:D,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(M,D){this.drawRange.start=M,this.drawRange.count=D}applyMatrix4(M){const D=this.attributes.position;D!==void 0&&(D.applyMatrix4(M),D.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const i=new KD().getNormalMatrix(M);t.applyNormalMatrix(i),t.needsUpdate=!0}const e=this.attributes.tangent;return e!==void 0&&(e.transformDirection(M),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(M){return fD.makeRotationFromQuaternion(M),this.applyMatrix4(fD),this}rotateX(M){return fD.makeRotationX(M),this.applyMatrix4(fD),this}rotateY(M){return fD.makeRotationY(M),this.applyMatrix4(fD),this}rotateZ(M){return fD.makeRotationZ(M),this.applyMatrix4(fD),this}translate(M,D,t){return fD.makeTranslation(M,D,t),this.applyMatrix4(fD),this}scale(M,D,t){return fD.makeScale(M,D,t),this.applyMatrix4(fD),this}lookAt(M){return dA.lookAt(M),dA.updateMatrix(),this.applyMatrix4(dA.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(le).negate(),this.translate(le.x,le.y,le.z),this}setFromPoints(M){const D=[];for(let t=0,e=M.length;t<e;t++){const i=M[t];D.push(i.x,i.y,i.z||0)}return this.setAttribute("position",new JD(D,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ae);const M=this.attributes.position,D=this.morphAttributes.position;if(M&&M.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(M!==void 0){if(this.boundingBox.setFromBufferAttribute(M),D)for(let t=0,e=D.length;t<e;t++){const i=D[t];xD.setFromBufferAttribute(i),this.morphTargetsRelative?($M.addVectors(this.boundingBox.min,xD.min),this.boundingBox.expandByPoint($M),$M.addVectors(this.boundingBox.max,xD.max),this.boundingBox.expandByPoint($M)):(this.boundingBox.expandByPoint(xD.min),this.boundingBox.expandByPoint(xD.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cA);const M=this.attributes.position,D=this.morphAttributes.position;if(M&&M.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(M){const t=this.boundingSphere.center;if(xD.setFromBufferAttribute(M),D)for(let i=0,z=D.length;i<z;i++){const A=D[i];nN.setFromBufferAttribute(A),this.morphTargetsRelative?($M.addVectors(xD.min,nN.min),xD.expandByPoint($M),$M.addVectors(xD.max,nN.max),xD.expandByPoint($M)):(xD.expandByPoint(nN.min),xD.expandByPoint(nN.max))}xD.getCenter(t);let e=0;for(let i=0,z=M.count;i<z;i++)$M.fromBufferAttribute(M,i),e=Math.max(e,t.distanceToSquared($M));if(D)for(let i=0,z=D.length;i<z;i++){const A=D[i],I=this.morphTargetsRelative;for(let n=0,T=A.count;n<T;n++)$M.fromBufferAttribute(A,n),I&&(le.fromBufferAttribute(M,n),$M.add(le)),e=Math.max(e,t.distanceToSquared($M))}this.boundingSphere.radius=Math.sqrt(e),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const M=this.index,D=this.attributes;if(M===null||D.position===void 0||D.normal===void 0||D.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=M.array,e=D.position.array,i=D.normal.array,z=D.uv.array,A=e.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $D(new Float32Array(4*A),4));const I=this.getAttribute("tangent").array,n=[],T=[];for(let p=0;p<A;p++)n[p]=new U,T[p]=new U;const u=new U,g=new U,s=new U,j=new gM,r=new gM,c=new gM,y=new U,w=new U;function a(p,B,G){u.fromArray(e,p*3),g.fromArray(e,B*3),s.fromArray(e,G*3),j.fromArray(z,p*2),r.fromArray(z,B*2),c.fromArray(z,G*2),g.sub(u),s.sub(u),r.sub(j),c.sub(j);const Q=1/(r.x*c.y-c.x*r.y);isFinite(Q)&&(y.copy(g).multiplyScalar(c.y).addScaledVector(s,-r.y).multiplyScalar(Q),w.copy(s).multiplyScalar(r.x).addScaledVector(g,-c.x).multiplyScalar(Q),n[p].add(y),n[B].add(y),n[G].add(y),T[p].add(w),T[B].add(w),T[G].add(w))}let o=this.groups;o.length===0&&(o=[{start:0,count:t.length}]);for(let p=0,B=o.length;p<B;++p){const G=o[p],Q=G.start,m=G.count;for(let Z=Q,H=Q+m;Z<H;Z+=3)a(t[Z+0],t[Z+1],t[Z+2])}const O=new U,h=new U,d=new U,L=new U;function l(p){d.fromArray(i,p*3),L.copy(d);const B=n[p];O.copy(B),O.sub(d.multiplyScalar(d.dot(B))).normalize(),h.crossVectors(L,B);const Q=h.dot(T[p])<0?-1:1;I[p*4]=O.x,I[p*4+1]=O.y,I[p*4+2]=O.z,I[p*4+3]=Q}for(let p=0,B=o.length;p<B;++p){const G=o[p],Q=G.start,m=G.count;for(let Z=Q,H=Q+m;Z<H;Z+=3)l(t[Z+0]),l(t[Z+1]),l(t[Z+2])}}computeVertexNormals(){const M=this.index,D=this.getAttribute("position");if(D!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new $D(new Float32Array(D.count*3),3),this.setAttribute("normal",t);else for(let g=0,s=t.count;g<s;g++)t.setXYZ(g,0,0,0);const e=new U,i=new U,z=new U,A=new U,I=new U,n=new U,T=new U,u=new U;if(M)for(let g=0,s=M.count;g<s;g+=3){const j=M.getX(g+0),r=M.getX(g+1),c=M.getX(g+2);e.fromBufferAttribute(D,j),i.fromBufferAttribute(D,r),z.fromBufferAttribute(D,c),T.subVectors(z,i),u.subVectors(e,i),T.cross(u),A.fromBufferAttribute(t,j),I.fromBufferAttribute(t,r),n.fromBufferAttribute(t,c),A.add(T),I.add(T),n.add(T),t.setXYZ(j,A.x,A.y,A.z),t.setXYZ(r,I.x,I.y,I.z),t.setXYZ(c,n.x,n.y,n.z)}else for(let g=0,s=D.count;g<s;g+=3)e.fromBufferAttribute(D,g+0),i.fromBufferAttribute(D,g+1),z.fromBufferAttribute(D,g+2),T.subVectors(z,i),u.subVectors(e,i),T.cross(u),t.setXYZ(g+0,T.x,T.y,T.z),t.setXYZ(g+1,T.x,T.y,T.z),t.setXYZ(g+2,T.x,T.y,T.z);this.normalizeNormals(),t.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const M=this.attributes.normal;for(let D=0,t=M.count;D<t;D++)$M.fromBufferAttribute(M,D),$M.normalize(),M.setXYZ(D,$M.x,$M.y,$M.z)}toNonIndexed(){function M(A,I){const n=A.array,T=A.itemSize,u=A.normalized,g=new n.constructor(I.length*T);let s=0,j=0;for(let r=0,c=I.length;r<c;r++){A.isInterleavedBufferAttribute?s=I[r]*A.data.stride+A.offset:s=I[r]*T;for(let y=0;y<T;y++)g[j++]=n[s++]}return new $D(g,T,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const D=new YT,t=this.index.array,e=this.attributes;for(const A in e){const I=e[A],n=M(I,t);D.setAttribute(A,n)}const i=this.morphAttributes;for(const A in i){const I=[],n=i[A];for(let T=0,u=n.length;T<u;T++){const g=n[T],s=M(g,t);I.push(s)}D.morphAttributes[A]=I}D.morphTargetsRelative=this.morphTargetsRelative;const z=this.groups;for(let A=0,I=z.length;A<I;A++){const n=z[A];D.addGroup(n.start,n.count,n.materialIndex)}return D}toJSON(){const M={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(M.uuid=this.uuid,M.type=this.type,this.name!==""&&(M.name=this.name),Object.keys(this.userData).length>0&&(M.userData=this.userData),this.parameters!==void 0){const I=this.parameters;for(const n in I)I[n]!==void 0&&(M[n]=I[n]);return M}M.data={attributes:{}};const D=this.index;D!==null&&(M.data.index={type:D.array.constructor.name,array:Array.prototype.slice.call(D.array)});const t=this.attributes;for(const I in t){const n=t[I];M.data.attributes[I]=n.toJSON(M.data)}const e={};let i=!1;for(const I in this.morphAttributes){const n=this.morphAttributes[I],T=[];for(let u=0,g=n.length;u<g;u++){const s=n[u];T.push(s.toJSON(M.data))}T.length>0&&(e[I]=T,i=!0)}i&&(M.data.morphAttributes=e,M.data.morphTargetsRelative=this.morphTargetsRelative);const z=this.groups;z.length>0&&(M.data.groups=JSON.parse(JSON.stringify(z)));const A=this.boundingSphere;return A!==null&&(M.data.boundingSphere={center:A.center.toArray(),radius:A.radius}),M}clone(){return new this.constructor().copy(this)}copy(M){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const D={};this.name=M.name;const t=M.index;t!==null&&this.setIndex(t.clone(D));const e=M.attributes;for(const n in e){const T=e[n];this.setAttribute(n,T.clone(D))}const i=M.morphAttributes;for(const n in i){const T=[],u=i[n];for(let g=0,s=u.length;g<s;g++)T.push(u[g].clone(D));this.morphAttributes[n]=T}this.morphTargetsRelative=M.morphTargetsRelative;const z=M.groups;for(let n=0,T=z.length;n<T;n++){const u=z[n];this.addGroup(u.start,u.count,u.materialIndex)}const A=M.boundingBox;A!==null&&(this.boundingBox=A.clone());const I=M.boundingSphere;return I!==null&&(this.boundingSphere=I.clone()),this.drawRange.start=M.drawRange.start,this.drawRange.count=M.drawRange.count,this.userData=M.userData,M.parameters!==void 0&&(this.parameters=Object.assign({},M.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}};const MI=new eD,de=new Lg,vA=new cA,IN=new U,TN=new U,uN=new U,YA=new U,JN=new U,Mi=new gM,Di=new gM,ti=new gM,pA=new U,ei=new U;let Mt=class extends yD{constructor(M=new he,D=new qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=M,this.material=D,this.updateMorphTargets()}copy(M,D){return super.copy(M,D),M.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=M.morphTargetInfluences.slice()),M.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},M.morphTargetDictionary)),this.material=M.material,this.geometry=M.geometry,this}updateMorphTargets(){const D=this.geometry.morphAttributes,t=Object.keys(D);if(t.length>0){const e=D[t[0]];if(e!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,z=e.length;i<z;i++){const A=e[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[A]=i}}}}getVertexPosition(M,D){const t=this.geometry,e=t.attributes.position,i=t.morphAttributes.position,z=t.morphTargetsRelative;D.fromBufferAttribute(e,M);const A=this.morphTargetInfluences;if(i&&A){JN.set(0,0,0);for(let I=0,n=i.length;I<n;I++){const T=A[I],u=i[I];T!==0&&(YA.fromBufferAttribute(u,M),z?JN.addScaledVector(YA,T):JN.addScaledVector(YA.sub(D),T))}D.add(JN)}return this.isSkinnedMesh&&this.boneTransform(M,D),D}raycast(M,D){const t=this.geometry,e=this.material,i=this.matrixWorld;if(e===void 0||(t.boundingSphere===null&&t.computeBoundingSphere(),vA.copy(t.boundingSphere),vA.applyMatrix4(i),M.ray.intersectsSphere(vA)===!1)||(MI.copy(i).invert(),de.copy(M.ray).applyMatrix4(MI),t.boundingBox!==null&&de.intersectsBox(t.boundingBox)===!1))return;let z;const A=t.index,I=t.attributes.position,n=t.attributes.uv,T=t.attributes.uv2,u=t.groups,g=t.drawRange;if(A!==null)if(Array.isArray(e))for(let s=0,j=u.length;s<j;s++){const r=u[s],c=e[r.materialIndex],y=Math.max(r.start,g.start),w=Math.min(A.count,Math.min(r.start+r.count,g.start+g.count));for(let a=y,o=w;a<o;a+=3){const O=A.getX(a),h=A.getX(a+1),d=A.getX(a+2);z=Ni(this,c,M,de,n,T,O,h,d),z&&(z.faceIndex=Math.floor(a/3),z.face.materialIndex=r.materialIndex,D.push(z))}}else{const s=Math.max(0,g.start),j=Math.min(A.count,g.start+g.count);for(let r=s,c=j;r<c;r+=3){const y=A.getX(r),w=A.getX(r+1),a=A.getX(r+2);z=Ni(this,e,M,de,n,T,y,w,a),z&&(z.faceIndex=Math.floor(r/3),D.push(z))}}else if(I!==void 0)if(Array.isArray(e))for(let s=0,j=u.length;s<j;s++){const r=u[s],c=e[r.materialIndex],y=Math.max(r.start,g.start),w=Math.min(I.count,Math.min(r.start+r.count,g.start+g.count));for(let a=y,o=w;a<o;a+=3){const O=a,h=a+1,d=a+2;z=Ni(this,c,M,de,n,T,O,h,d),z&&(z.faceIndex=Math.floor(a/3),z.face.materialIndex=r.materialIndex,D.push(z))}}else{const s=Math.max(0,g.start),j=Math.min(I.count,g.start+g.count);for(let r=s,c=j;r<c;r+=3){const y=r,w=r+1,a=r+2;z=Ni(this,e,M,de,n,T,y,w,a),z&&(z.faceIndex=Math.floor(r/3),D.push(z))}}}};function xg(N,M,D,t,e,i,z,A){let I;if(M.side===wD?I=t.intersectTriangle(z,i,e,!0,A):I=t.intersectTriangle(e,i,z,M.side===Ot,A),I===null)return null;ei.copy(A),ei.applyMatrix4(N.matrixWorld);const n=D.ray.origin.distanceTo(ei);return n<D.near||n>D.far?null:{distance:n,point:ei.clone(),object:N}}function Ni(N,M,D,t,e,i,z,A,I){N.getVertexPosition(z,IN),N.getVertexPosition(A,TN),N.getVertexPosition(I,uN);const n=xg(N,M,D,t,IN,TN,uN,pA);if(n){e&&(Mi.fromBufferAttribute(e,z),Di.fromBufferAttribute(e,A),ti.fromBufferAttribute(e,I),n.uv=hA.getUV(pA,IN,TN,uN,Mi,Di,ti,new gM)),i&&(Mi.fromBufferAttribute(i,z),Di.fromBufferAttribute(i,A),ti.fromBufferAttribute(i,I),n.uv2=hA.getUV(pA,IN,TN,uN,Mi,Di,ti,new gM));const T={a:z,b:A,c:I,normal:new U,materialIndex:0};hA.getNormal(IN,TN,uN,T.normal),n.face=T}return n}function DI(){let N=null,M=!1,D=null,t=null;function e(i,z){D(i,z),t=N.requestAnimationFrame(e)}return{start:function(){M!==!0&&D!==null&&(t=N.requestAnimationFrame(e),M=!0)},stop:function(){N.cancelAnimationFrame(t),M=!1},setAnimationLoop:function(i){D=i},setContext:function(i){N=i}}}function Og(N,M){const D=M.isWebGL2,t=new WeakMap;function e(n,T){const u=n.array,g=n.usage,s=N.createBuffer();N.bindBuffer(T,s),N.bufferData(T,u,g),n.onUploadCallback();let j;if(u instanceof Float32Array)j=N.FLOAT;else if(u instanceof Uint16Array)if(n.isFloat16BufferAttribute)if(D)j=N.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else j=N.UNSIGNED_SHORT;else if(u instanceof Int16Array)j=N.SHORT;else if(u instanceof Uint32Array)j=N.UNSIGNED_INT;else if(u instanceof Int32Array)j=N.INT;else if(u instanceof Int8Array)j=N.BYTE;else if(u instanceof Uint8Array)j=N.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)j=N.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:s,type:j,bytesPerElement:u.BYTES_PER_ELEMENT,version:n.version}}function i(n,T,u){const g=T.array,s=T.updateRange;N.bindBuffer(u,n),s.count===-1?N.bufferSubData(u,0,g):(D?N.bufferSubData(u,s.offset*g.BYTES_PER_ELEMENT,g,s.offset,s.count):N.bufferSubData(u,s.offset*g.BYTES_PER_ELEMENT,g.subarray(s.offset,s.offset+s.count)),s.count=-1),T.onUploadCallback()}function z(n){return n.isInterleavedBufferAttribute&&(n=n.data),t.get(n)}function A(n){n.isInterleavedBufferAttribute&&(n=n.data);const T=t.get(n);T&&(N.deleteBuffer(T.buffer),t.delete(n))}function I(n,T){if(n.isGLBufferAttribute){const g=t.get(n);(!g||g.version<n.version)&&t.set(n,{buffer:n.buffer,type:n.type,bytesPerElement:n.elementSize,version:n.version});return}n.isInterleavedBufferAttribute&&(n=n.data);const u=t.get(n);u===void 0?t.set(n,e(n,T)):u.version<n.version&&(i(u.buffer,n,T),u.version=n.version)}return{get:z,remove:A,update:I}}class gN extends he{constructor(M=1,D=1,t=1,e=1,i=1,z=1){super(),this.type="BoxGeometry",this.parameters={width:M,height:D,depth:t,widthSegments:e,heightSegments:i,depthSegments:z};const A=this;e=Math.floor(e),i=Math.floor(i),z=Math.floor(z);const I=[],n=[],T=[],u=[];let g=0,s=0;j("z","y","x",-1,-1,t,D,M,z,i,0),j("z","y","x",1,-1,t,D,-M,z,i,1),j("x","z","y",1,1,M,t,D,e,z,2),j("x","z","y",1,-1,M,t,-D,e,z,3),j("x","y","z",1,-1,M,D,t,e,i,4),j("x","y","z",-1,-1,M,D,-t,e,i,5),this.setIndex(I),this.setAttribute("position",new JD(n,3)),this.setAttribute("normal",new JD(T,3)),this.setAttribute("uv",new JD(u,2));function j(r,c,y,w,a,o,O,h,d,L,l){const p=o/d,B=O/L,G=o/2,Q=O/2,m=h/2,Z=d+1,H=L+1;let $=0,F=0;const J=new U;for(let W=0;W<H;W++){const TM=W*B-Q;for(let S=0;S<Z;S++){const X=S*p-G;J[r]=X*w,J[c]=TM*a,J[y]=m,n.push(J.x,J.y,J.z),J[r]=0,J[c]=0,J[y]=h>0?1:-1,T.push(J.x,J.y,J.z),u.push(S/d),u.push(1-W/L),$+=1}}for(let W=0;W<L;W++)for(let TM=0;TM<d;TM++){const S=g+TM+Z*W,X=g+TM+Z*(W+1),eM=g+(TM+1)+Z*(W+1),NM=g+(TM+1)+Z*W;I.push(S,X,NM),I.push(X,eM,NM),F+=6}A.addGroup(s,F,l),s+=F,g+=$}}static fromJSON(M){return new gN(M.width,M.height,M.depth,M.widthSegments,M.heightSegments,M.depthSegments)}}class UA extends he{constructor(M=1,D=1,t=1,e=1){super(),this.type="PlaneGeometry",this.parameters={width:M,height:D,widthSegments:t,heightSegments:e};const i=M/2,z=D/2,A=Math.floor(t),I=Math.floor(e),n=A+1,T=I+1,u=M/A,g=D/I,s=[],j=[],r=[],c=[];for(let y=0;y<T;y++){const w=y*g-z;for(let a=0;a<n;a++){const o=a*u-i;j.push(o,-w,0),r.push(0,0,1),c.push(a/A),c.push(1-y/I)}}for(let y=0;y<I;y++)for(let w=0;w<A;w++){const a=w+n*y,o=w+n*(y+1),O=w+1+n*(y+1),h=w+1+n*y;s.push(a,o,h),s.push(o,O,h)}this.setIndex(s),this.setAttribute("position",new JD(j,3)),this.setAttribute("normal",new JD(r,3)),this.setAttribute("uv",new JD(c,2))}static fromJSON(M){return new UA(M.width,M.height,M.widthSegments,M.heightSegments)}}function ve(N){const M={};for(const D in N){M[D]={};for(const t in N[D]){const e=N[D][t];e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)?M[D][t]=e.clone():Array.isArray(e)?M[D][t]=e.slice():M[D][t]=e}}return M}function gD(N){const M={};for(let D=0;D<N.length;D++){const t=ve(N[D]);for(const e in t)M[e]=t[e]}return M}function Eg(N){const M=[];for(let D=0;D<N.length;D++)M.push(N[D].clone());return M}function tI(N){return N.getRenderTarget()===null&&N.outputEncoding===SM?qD:eN}const lg={clone:ve,merge:gD},hg=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`,dg=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;class Gt extends zN{constructor(M){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hg,this.fragmentShader=dg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,M!==void 0&&this.setValues(M)}copy(M){return super.copy(M),this.fragmentShader=M.fragmentShader,this.vertexShader=M.vertexShader,this.uniforms=ve(M.uniforms),this.uniformsGroups=Eg(M.uniformsGroups),this.defines=Object.assign({},M.defines),this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.fog=M.fog,this.lights=M.lights,this.clipping=M.clipping,this.extensions=Object.assign({},M.extensions),this.glslVersion=M.glslVersion,this}toJSON(M){const D=super.toJSON(M);D.glslVersion=this.glslVersion,D.uniforms={};for(const e in this.uniforms){const z=this.uniforms[e].value;z&&z.isTexture?D.uniforms[e]={type:"t",value:z.toJSON(M).uuid}:z&&z.isColor?D.uniforms[e]={type:"c",value:z.getHex()}:z&&z.isVector2?D.uniforms[e]={type:"v2",value:z.toArray()}:z&&z.isVector3?D.uniforms[e]={type:"v3",value:z.toArray()}:z&&z.isVector4?D.uniforms[e]={type:"v4",value:z.toArray()}:z&&z.isMatrix3?D.uniforms[e]={type:"m3",value:z.toArray()}:z&&z.isMatrix4?D.uniforms[e]={type:"m4",value:z.toArray()}:D.uniforms[e]={value:z}}Object.keys(this.defines).length>0&&(D.defines=this.defines),D.vertexShader=this.vertexShader,D.fragmentShader=this.fragmentShader;const t={};for(const e in this.extensions)this.extensions[e]===!0&&(t[e]=!0);return Object.keys(t).length>0&&(D.extensions=t),D}}const OM={alphamap_fragment:`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vUv ).g;

#endif
`,alphamap_pars_fragment:`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,alphatest_fragment:`
#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

#endif
`,alphatest_pars_fragment:`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`,aomap_fragment:`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`,aomap_pars_fragment:`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`,begin_vertex:`
vec3 transformed = vec3( position );
`,beginnormal_vertex:`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`,bsdfs:`

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
`,iridescence_fragment:`

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

`,bumpmap_pars_fragment:`
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
`,clipping_planes_fragment:`
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
`,clipping_planes_pars_fragment:`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`,clipping_planes_pars_vertex:`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`,clipping_planes_vertex:`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`,color_fragment:`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`,color_pars_fragment:`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`,color_pars_vertex:`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	varying vec3 vColor;

#endif
`,color_vertex:`
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
`,common:`
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
`,cube_uv_reflection_fragment:`
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
`,defaultnormal_vertex:`
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
`,displacementmap_pars_vertex:`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`,displacementmap_vertex:`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );

#endif
`,emissivemap_fragment:`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vUv );

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`,emissivemap_pars_fragment:`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`,encodings_fragment:`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`,encodings_pars_fragment:`

vec4 LinearToLinear( in vec4 value ) {
	return value;
}

vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`,envmap_fragment:`
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
`,envmap_common_pars_fragment:`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`,envmap_pars_fragment:`
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
`,envmap_pars_vertex:`
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
`,envmap_physical_pars_fragment:`
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
`,envmap_vertex:`
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
`,fog_vertex:`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`,fog_pars_vertex:`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`,fog_fragment:`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`,fog_pars_fragment:`
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
`,gradientmap_pars_fragment:`

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
`,lightmap_fragment:`
#ifdef USE_LIGHTMAP

	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

	reflectedLight.indirectDiffuse += lightMapIrradiance;

#endif
`,lightmap_pars_fragment:`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`,lights_lambert_fragment:`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`,lights_lambert_pars_fragment:`
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
`,lights_pars_begin:`
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
`,lights_toon_fragment:`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`,lights_toon_pars_fragment:`
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
`,lights_phong_fragment:`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`,lights_phong_pars_fragment:`
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
`,lights_physical_fragment:`
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
`,lights_physical_pars_fragment:`
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
`,lights_fragment_begin:`
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
`,lights_fragment_maps:`
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
`,lights_fragment_end:`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );

#endif
`,logdepthbuf_fragment:`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`,logdepthbuf_pars_fragment:`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`,logdepthbuf_pars_vertex:`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`,logdepthbuf_vertex:`
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
`,map_fragment:`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)

		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`,map_pars_fragment:`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`,map_particle_fragment:`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`,map_particle_pars_fragment:`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	uniform mat3 uvTransform;

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,metalnessmap_fragment:`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`,metalnessmap_pars_fragment:`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`,morphcolor_vertex:`
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
`,morphnormal_vertex:`
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
`,morphtarget_pars_vertex:`
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
`,morphtarget_vertex:`
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
`,normal_fragment_begin:`
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

`,normal_fragment_maps:`

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
`,normal_pars_fragment:`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`,normal_pars_vertex:`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`,normal_vertex:`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`,normalmap_pars_fragment:`
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
`,clearcoat_normal_fragment_begin:`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = geometryNormal;

#endif
`,clearcoat_normal_fragment_maps:`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	#ifdef USE_TANGENT

		clearcoatNormal = normalize( vTBN * clearcoatMapN );

	#else

		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );

	#endif

#endif
`,clearcoat_pars_fragment:`

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
`,iridescence_pars_fragment:`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`,output_fragment:`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

// https://github.com/mrdoob/three.js/pull/22425
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`,packing:`
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
`,premultiplied_alpha_fragment:`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`,project_vertex:`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`,dithering_fragment:`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`,dithering_pars_fragment:`
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
`,roughnessmap_fragment:`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`,roughnessmap_pars_fragment:`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`,shadowmap_pars_fragment:`
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
`,shadowmap_pars_vertex:`

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
`,shadowmap_vertex:`

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


`,shadowmask_pars_fragment:`
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
`,skinbase_vertex:`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`,skinning_pars_vertex:`
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
`,skinning_vertex:`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`,skinnormal_vertex:`
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
`,specularmap_fragment:`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`,specularmap_pars_fragment:`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`,tonemapping_fragment:`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`,tonemapping_pars_fragment:`
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
`,transmission_fragment:`
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
`,transmission_pars_fragment:`
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
`,uv_pars_fragment:`
#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )

	varying vec2 vUv;

#endif
`,uv_pars_vertex:`
#ifdef USE_UV

	#ifdef UVS_VERTEX_ONLY

		vec2 vUv;

	#else

		varying vec2 vUv;

	#endif

	uniform mat3 uvTransform;

#endif
`,uv_vertex:`
#ifdef USE_UV

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

#endif
`,uv2_pars_fragment:`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	varying vec2 vUv2;

#endif
`,uv2_pars_vertex:`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	attribute vec2 uv2;
	varying vec2 vUv2;

	uniform mat3 uv2Transform;

#endif
`,uv2_vertex:`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;

#endif
`,worldpos_vertex:`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`,background_vert:`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,background_frag:`
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
`,backgroundCube_vert:`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,backgroundCube_frag:`

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
`,cube_vert:`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,cube_frag:`
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
`,depth_vert:`
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
`,depth_frag:`
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
`,distanceRGBA_vert:`
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
`,distanceRGBA_frag:`
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
`,equirect_vert:`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,equirect_frag:`
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
`,linedashed_vert:`
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
`,linedashed_frag:`
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
`,meshbasic_vert:`
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
`,meshbasic_frag:`
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
`,meshlambert_vert:`
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
`,meshlambert_frag:`
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
`,meshmatcap_vert:`
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
`,meshmatcap_frag:`
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
`,meshnormal_vert:`
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
`,meshnormal_frag:`
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
`,meshphong_vert:`
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
`,meshphong_frag:`
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
`,meshphysical_vert:`
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
`,meshphysical_frag:`
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
`,meshtoon_vert:`
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
`,meshtoon_frag:`
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
`,points_vert:`
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
`,points_frag:`
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
`,shadow_vert:`
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
`,shadow_frag:`
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
`,sprite_vert:`
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
`,sprite_frag:`
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
`},tM={common:{diffuse:{value:new QM(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new KD},uv2Transform:{value:new KD},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new gM(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new QM(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new QM(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new KD}},sprite:{diffuse:{value:new QM(16777215)},opacity:{value:1},center:{value:new gM(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new KD}}},Dt={basic:{uniforms:gD([tM.common,tM.specularmap,tM.envmap,tM.aomap,tM.lightmap,tM.fog]),vertexShader:OM.meshbasic_vert,fragmentShader:OM.meshbasic_frag},lambert:{uniforms:gD([tM.common,tM.specularmap,tM.envmap,tM.aomap,tM.lightmap,tM.emissivemap,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.fog,tM.lights,{emissive:{value:new QM(0)}}]),vertexShader:OM.meshlambert_vert,fragmentShader:OM.meshlambert_frag},phong:{uniforms:gD([tM.common,tM.specularmap,tM.envmap,tM.aomap,tM.lightmap,tM.emissivemap,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.fog,tM.lights,{emissive:{value:new QM(0)},specular:{value:new QM(1118481)},shininess:{value:30}}]),vertexShader:OM.meshphong_vert,fragmentShader:OM.meshphong_frag},standard:{uniforms:gD([tM.common,tM.envmap,tM.aomap,tM.lightmap,tM.emissivemap,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.roughnessmap,tM.metalnessmap,tM.fog,tM.lights,{emissive:{value:new QM(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:OM.meshphysical_vert,fragmentShader:OM.meshphysical_frag},toon:{uniforms:gD([tM.common,tM.aomap,tM.lightmap,tM.emissivemap,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.gradientmap,tM.fog,tM.lights,{emissive:{value:new QM(0)}}]),vertexShader:OM.meshtoon_vert,fragmentShader:OM.meshtoon_frag},matcap:{uniforms:gD([tM.common,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.fog,{matcap:{value:null}}]),vertexShader:OM.meshmatcap_vert,fragmentShader:OM.meshmatcap_frag},points:{uniforms:gD([tM.points,tM.fog]),vertexShader:OM.points_vert,fragmentShader:OM.points_frag},dashed:{uniforms:gD([tM.common,tM.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:OM.linedashed_vert,fragmentShader:OM.linedashed_frag},depth:{uniforms:gD([tM.common,tM.displacementmap]),vertexShader:OM.depth_vert,fragmentShader:OM.depth_frag},normal:{uniforms:gD([tM.common,tM.bumpmap,tM.normalmap,tM.displacementmap,{opacity:{value:1}}]),vertexShader:OM.meshnormal_vert,fragmentShader:OM.meshnormal_frag},sprite:{uniforms:gD([tM.sprite,tM.fog]),vertexShader:OM.sprite_vert,fragmentShader:OM.sprite_frag},background:{uniforms:{uvTransform:{value:new KD},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:OM.background_vert,fragmentShader:OM.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:OM.backgroundCube_vert,fragmentShader:OM.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:OM.cube_vert,fragmentShader:OM.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:OM.equirect_vert,fragmentShader:OM.equirect_frag},distanceRGBA:{uniforms:gD([tM.common,tM.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:OM.distanceRGBA_vert,fragmentShader:OM.distanceRGBA_frag},shadow:{uniforms:gD([tM.lights,tM.fog,{color:{value:new QM(0)},opacity:{value:1}}]),vertexShader:OM.shadow_vert,fragmentShader:OM.shadow_frag}};Dt.physical={uniforms:gD([Dt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new gM(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new QM(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new gM},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new QM(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new QM(1,1,1)},specularColorMap:{value:null}}]),vertexShader:OM.meshphysical_vert,fragmentShader:OM.meshphysical_frag};const ii={r:0,b:0,g:0};function vg(N,M,D,t,e,i,z){const A=new QM(0);let I=i===!0?0:1,n,T,u=null,g=0,s=null;function j(c,y){let w=!1,a=y.isScene===!0?y.background:null;a&&a.isTexture&&(a=(y.backgroundBlurriness>0?D:M).get(a));const o=N.xr,O=o.getSession&&o.getSession();O&&O.environmentBlendMode==="additive"&&(a=null),a===null?r(A,I):a&&a.isColor&&(r(a,1),w=!0),(N.autoClear||w)&&N.clear(N.autoClearColor,N.autoClearDepth,N.autoClearStencil),a&&(a.isCubeTexture||a.mapping===PN)?(T===void 0&&(T=new Mt(new gN(1,1,1),new Gt({name:"BackgroundCubeMaterial",uniforms:ve(Dt.backgroundCube.uniforms),vertexShader:Dt.backgroundCube.vertexShader,fragmentShader:Dt.backgroundCube.fragmentShader,side:wD,depthTest:!1,depthWrite:!1,fog:!1})),T.geometry.deleteAttribute("normal"),T.geometry.deleteAttribute("uv"),T.onBeforeRender=function(h,d,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(T.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),e.update(T)),T.material.uniforms.envMap.value=a,T.material.uniforms.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,T.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,T.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,T.material.toneMapped=a.encoding!==SM,(u!==a||g!==a.version||s!==N.toneMapping)&&(T.material.needsUpdate=!0,u=a,g=a.version,s=N.toneMapping),T.layers.enableAll(),c.unshift(T,T.geometry,T.material,0,0,null)):a&&a.isTexture&&(n===void 0&&(n=new Mt(new UA(2,2),new Gt({name:"BackgroundMaterial",uniforms:ve(Dt.background.uniforms),vertexShader:Dt.background.vertexShader,fragmentShader:Dt.background.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),n.geometry.deleteAttribute("normal"),Object.defineProperty(n.material,"map",{get:function(){return this.uniforms.t2D.value}}),e.update(n)),n.material.uniforms.t2D.value=a,n.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,n.material.toneMapped=a.encoding!==SM,a.matrixAutoUpdate===!0&&a.updateMatrix(),n.material.uniforms.uvTransform.value.copy(a.matrix),(u!==a||g!==a.version||s!==N.toneMapping)&&(n.material.needsUpdate=!0,u=a,g=a.version,s=N.toneMapping),n.layers.enableAll(),c.unshift(n,n.geometry,n.material,0,0,null))}function r(c,y){c.getRGB(ii,tI(N)),t.buffers.color.setClear(ii.r,ii.g,ii.b,y,z)}return{getClearColor:function(){return A},setClearColor:function(c,y=1){A.set(c),I=y,r(A,I)},getClearAlpha:function(){return I},setClearAlpha:function(c){I=c,r(A,I)},render:j}}function Yg(N,M,D,t){const e=N.getParameter(N.MAX_VERTEX_ATTRIBS),i=t.isWebGL2?null:M.get("OES_vertex_array_object"),z=t.isWebGL2||i!==null,A={},I=c(null);let n=I,T=!1;function u(m,Z,H,$,F){let J=!1;if(z){const W=r($,H,Z);n!==W&&(n=W,s(n.object)),J=y(m,$,H,F),J&&w(m,$,H,F)}else{const W=Z.wireframe===!0;(n.geometry!==$.id||n.program!==H.id||n.wireframe!==W)&&(n.geometry=$.id,n.program=H.id,n.wireframe=W,J=!0)}F!==null&&D.update(F,N.ELEMENT_ARRAY_BUFFER),(J||T)&&(T=!1,L(m,Z,H,$),F!==null&&N.bindBuffer(N.ELEMENT_ARRAY_BUFFER,D.get(F).buffer))}function g(){return t.isWebGL2?N.createVertexArray():i.createVertexArrayOES()}function s(m){return t.isWebGL2?N.bindVertexArray(m):i.bindVertexArrayOES(m)}function j(m){return t.isWebGL2?N.deleteVertexArray(m):i.deleteVertexArrayOES(m)}function r(m,Z,H){const $=H.wireframe===!0;let F=A[m.id];F===void 0&&(F={},A[m.id]=F);let J=F[Z.id];J===void 0&&(J={},F[Z.id]=J);let W=J[$];return W===void 0&&(W=c(g()),J[$]=W),W}function c(m){const Z=[],H=[],$=[];for(let F=0;F<e;F++)Z[F]=0,H[F]=0,$[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Z,enabledAttributes:H,attributeDivisors:$,object:m,attributes:{},index:null}}function y(m,Z,H,$){const F=n.attributes,J=Z.attributes;let W=0;const TM=H.getAttributes();for(const S in TM)if(TM[S].location>=0){const eM=F[S];let NM=J[S];if(NM===void 0&&(S==="instanceMatrix"&&m.instanceMatrix&&(NM=m.instanceMatrix),S==="instanceColor"&&m.instanceColor&&(NM=m.instanceColor)),eM===void 0||eM.attribute!==NM||NM&&eM.data!==NM.data)return!0;W++}return n.attributesNum!==W||n.index!==$}function w(m,Z,H,$){const F={},J=Z.attributes;let W=0;const TM=H.getAttributes();for(const S in TM)if(TM[S].location>=0){let eM=J[S];eM===void 0&&(S==="instanceMatrix"&&m.instanceMatrix&&(eM=m.instanceMatrix),S==="instanceColor"&&m.instanceColor&&(eM=m.instanceColor));const NM={};NM.attribute=eM,eM&&eM.data&&(NM.data=eM.data),F[S]=NM,W++}n.attributes=F,n.attributesNum=W,n.index=$}function a(){const m=n.newAttributes;for(let Z=0,H=m.length;Z<H;Z++)m[Z]=0}function o(m){O(m,0)}function O(m,Z){const H=n.newAttributes,$=n.enabledAttributes,F=n.attributeDivisors;H[m]=1,$[m]===0&&(N.enableVertexAttribArray(m),$[m]=1),F[m]!==Z&&((t.isWebGL2?N:M.get("ANGLE_instanced_arrays"))[t.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](m,Z),F[m]=Z)}function h(){const m=n.newAttributes,Z=n.enabledAttributes;for(let H=0,$=Z.length;H<$;H++)Z[H]!==m[H]&&(N.disableVertexAttribArray(H),Z[H]=0)}function d(m,Z,H,$,F,J){t.isWebGL2===!0&&(H===N.INT||H===N.UNSIGNED_INT)?N.vertexAttribIPointer(m,Z,H,F,J):N.vertexAttribPointer(m,Z,H,$,F,J)}function L(m,Z,H,$){if(t.isWebGL2===!1&&(m.isInstancedMesh||$.isInstancedBufferGeometry)&&M.get("ANGLE_instanced_arrays")===null)return;a();const F=$.attributes,J=H.getAttributes(),W=Z.defaultAttributeValues;for(const TM in J){const S=J[TM];if(S.location>=0){let X=F[TM];if(X===void 0&&(TM==="instanceMatrix"&&m.instanceMatrix&&(X=m.instanceMatrix),TM==="instanceColor"&&m.instanceColor&&(X=m.instanceColor)),X!==void 0){const eM=X.normalized,NM=X.itemSize,v=D.get(X);if(v===void 0)continue;const xM=v.buffer,sM=v.type,rM=v.bytesPerElement;if(X.isInterleavedBufferAttribute){const nM=X.data,kM=nM.stride,EM=X.offset;if(nM.isInstancedInterleavedBuffer){for(let CM=0;CM<S.locationSize;CM++)O(S.location+CM,nM.meshPerAttribute);m.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=nM.meshPerAttribute*nM.count)}else for(let CM=0;CM<S.locationSize;CM++)o(S.location+CM);N.bindBuffer(N.ARRAY_BUFFER,xM);for(let CM=0;CM<S.locationSize;CM++)d(S.location+CM,NM/S.locationSize,sM,eM,kM*rM,(EM+NM/S.locationSize*CM)*rM)}else{if(X.isInstancedBufferAttribute){for(let nM=0;nM<S.locationSize;nM++)O(S.location+nM,X.meshPerAttribute);m.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let nM=0;nM<S.locationSize;nM++)o(S.location+nM);N.bindBuffer(N.ARRAY_BUFFER,xM);for(let nM=0;nM<S.locationSize;nM++)d(S.location+nM,NM/S.locationSize,sM,eM,NM*rM,NM/S.locationSize*nM*rM)}}else if(W!==void 0){const eM=W[TM];if(eM!==void 0)switch(eM.length){case 2:N.vertexAttrib2fv(S.location,eM);break;case 3:N.vertexAttrib3fv(S.location,eM);break;case 4:N.vertexAttrib4fv(S.location,eM);break;default:N.vertexAttrib1fv(S.location,eM)}}}}h()}function l(){G();for(const m in A){const Z=A[m];for(const H in Z){const $=Z[H];for(const F in $)j($[F].object),delete $[F];delete Z[H]}delete A[m]}}function p(m){if(A[m.id]===void 0)return;const Z=A[m.id];for(const H in Z){const $=Z[H];for(const F in $)j($[F].object),delete $[F];delete Z[H]}delete A[m.id]}function B(m){for(const Z in A){const H=A[Z];if(H[m.id]===void 0)continue;const $=H[m.id];for(const F in $)j($[F].object),delete $[F];delete H[m.id]}}function G(){Q(),T=!0,n!==I&&(n=I,s(n.object))}function Q(){I.geometry=null,I.program=null,I.wireframe=!1}return{setup:u,reset:G,resetDefaultState:Q,dispose:l,releaseStatesOfGeometry:p,releaseStatesOfProgram:B,initAttributes:a,enableAttribute:o,disableUnusedAttributes:h}}function pg(N,M,D,t){const e=t.isWebGL2;let i;function z(n){i=n}function A(n,T){N.drawArrays(i,n,T),D.update(T,i,1)}function I(n,T,u){if(u===0)return;let g,s;if(e)g=N,s="drawArraysInstanced";else if(g=M.get("ANGLE_instanced_arrays"),s="drawArraysInstancedANGLE",g===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[s](i,n,T,u),D.update(T,i,u)}this.setMode=z,this.render=A,this.renderInstances=I}function Ug(N,M,D){let t;function e(){if(t!==void 0)return t;if(M.has("EXT_texture_filter_anisotropic")===!0){const d=M.get("EXT_texture_filter_anisotropic");t=N.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else t=0;return t}function i(d){if(d==="highp"){if(N.getShaderPrecisionFormat(N.VERTEX_SHADER,N.HIGH_FLOAT).precision>0&&N.getShaderPrecisionFormat(N.FRAGMENT_SHADER,N.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&N.getShaderPrecisionFormat(N.VERTEX_SHADER,N.MEDIUM_FLOAT).precision>0&&N.getShaderPrecisionFormat(N.FRAGMENT_SHADER,N.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const z=typeof WebGL2RenderingContext<"u"&&N instanceof WebGL2RenderingContext;let A=D.precision!==void 0?D.precision:"highp";const I=i(A);I!==A&&(console.warn("THREE.WebGLRenderer:",A,"not supported, using",I,"instead."),A=I);const n=z||M.has("WEBGL_draw_buffers"),T=D.logarithmicDepthBuffer===!0,u=N.getParameter(N.MAX_TEXTURE_IMAGE_UNITS),g=N.getParameter(N.MAX_VERTEX_TEXTURE_IMAGE_UNITS),s=N.getParameter(N.MAX_TEXTURE_SIZE),j=N.getParameter(N.MAX_CUBE_MAP_TEXTURE_SIZE),r=N.getParameter(N.MAX_VERTEX_ATTRIBS),c=N.getParameter(N.MAX_VERTEX_UNIFORM_VECTORS),y=N.getParameter(N.MAX_VARYING_VECTORS),w=N.getParameter(N.MAX_FRAGMENT_UNIFORM_VECTORS),a=g>0,o=z||M.has("OES_texture_float"),O=a&&o,h=z?N.getParameter(N.MAX_SAMPLES):0;return{isWebGL2:z,drawBuffers:n,getMaxAnisotropy:e,getMaxPrecision:i,precision:A,logarithmicDepthBuffer:T,maxTextures:u,maxVertexTextures:g,maxTextureSize:s,maxCubemapSize:j,maxAttributes:r,maxVertexUniforms:c,maxVaryings:y,maxFragmentUniforms:w,vertexTextures:a,floatFragmentTextures:o,floatVertexTextures:O,maxSamples:h}}function fg(N){const M=this;let D=null,t=0,e=!1,i=!1;const z=new Bt,A=new KD,I={value:null,needsUpdate:!1};this.uniform=I,this.numPlanes=0,this.numIntersection=0,this.init=function(u,g){const s=u.length!==0||g||t!==0||e;return e=g,t=u.length,s},this.beginShadows=function(){i=!0,T(null)},this.endShadows=function(){i=!1},this.setGlobalState=function(u,g){D=T(u,g,0)},this.setState=function(u,g,s){const j=u.clippingPlanes,r=u.clipIntersection,c=u.clipShadows,y=N.get(u);if(!e||j===null||j.length===0||i&&!c)i?T(null):n();else{const w=i?0:t,a=w*4;let o=y.clippingState||null;I.value=o,o=T(j,g,a,s);for(let O=0;O!==a;++O)o[O]=D[O];y.clippingState=o,this.numIntersection=r?this.numPlanes:0,this.numPlanes+=w}};function n(){I.value!==D&&(I.value=D,I.needsUpdate=t>0),M.numPlanes=t,M.numIntersection=0}function T(u,g,s,j){const r=u!==null?u.length:0;let c=null;if(r!==0){if(c=I.value,j!==!0||c===null){const y=s+r*4,w=g.matrixWorldInverse;A.getNormalMatrix(w),(c===null||c.length<y)&&(c=new Float32Array(y));for(let a=0,o=s;a!==r;++a,o+=4)z.copy(u[a]).applyMatrix4(w,A),z.normal.toArray(c,o),c[o+3]=z.constant}I.value=c,I.needsUpdate=!0}return M.numPlanes=r,M.numIntersection=0,c}}class Vt extends Te{constructor(M=1,D=1,t={}){super(),this.isWebGLRenderTarget=!0,this.width=M,this.height=D,this.depth=1,this.scissor=new qM(0,0,M,D),this.scissorTest=!1,this.viewport=new qM(0,0,M,D);const e={width:M,height:D,depth:1};this.texture=new BD(e,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.internalFormat=t.internalFormat!==void 0?t.internalFormat:null,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:aD,this.depthBuffer=t.depthBuffer!==void 0?t.depthBuffer:!0,this.stencilBuffer=t.stencilBuffer!==void 0?t.stencilBuffer:!1,this.depthTexture=t.depthTexture!==void 0?t.depthTexture:null,this.samples=t.samples!==void 0?t.samples:0}setSize(M,D,t=1){(this.width!==M||this.height!==D||this.depth!==t)&&(this.width=M,this.height=D,this.depth=t,this.texture.image.width=M,this.texture.image.height=D,this.texture.image.depth=t,this.dispose()),this.viewport.set(0,0,M,D),this.scissor.set(0,0,M,D)}clone(){return new this.constructor().copy(this)}copy(M){this.width=M.width,this.height=M.height,this.depth=M.depth,this.viewport.copy(M.viewport),this.texture=M.texture.clone(),this.texture.isRenderTargetTexture=!0;const D=Object.assign({},M.texture.image);return this.texture.source=new Hn(D),this.depthBuffer=M.depthBuffer,this.stencilBuffer=M.stencilBuffer,M.depthTexture!==null&&(this.depthTexture=M.depthTexture.clone()),this.samples=M.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ye=-90,pe=1;class mg extends yD{constructor(M,D,t){super(),this.type="CubeCamera",this.renderTarget=t;const e=new UD(Ye,pe,M,D);e.layers=this.layers,e.up.set(0,1,0),e.lookAt(1,0,0),this.add(e);const i=new UD(Ye,pe,M,D);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(-1,0,0),this.add(i);const z=new UD(Ye,pe,M,D);z.layers=this.layers,z.up.set(0,0,-1),z.lookAt(0,1,0),this.add(z);const A=new UD(Ye,pe,M,D);A.layers=this.layers,A.up.set(0,0,1),A.lookAt(0,-1,0),this.add(A);const I=new UD(Ye,pe,M,D);I.layers=this.layers,I.up.set(0,1,0),I.lookAt(0,0,1),this.add(I);const n=new UD(Ye,pe,M,D);n.layers=this.layers,n.up.set(0,1,0),n.lookAt(0,0,-1),this.add(n)}update(M,D){this.parent===null&&this.updateMatrixWorld();const t=this.renderTarget,[e,i,z,A,I,n]=this.children,T=M.getRenderTarget(),u=M.toneMapping,g=M.xr.enabled;M.toneMapping=it,M.xr.enabled=!1;const s=t.texture.generateMipmaps;t.texture.generateMipmaps=!1,M.setRenderTarget(t,0),M.render(D,e),M.setRenderTarget(t,1),M.render(D,i),M.setRenderTarget(t,2),M.render(D,z),M.setRenderTarget(t,3),M.render(D,A),M.setRenderTarget(t,4),M.render(D,I),t.texture.generateMipmaps=s,M.setRenderTarget(t,5),M.render(D,n),M.setRenderTarget(T),M.toneMapping=u,M.xr.enabled=g,t.texture.needsPMREMUpdate=!0}}class eI extends BD{constructor(M,D,t,e,i,z,A,I,n,T){M=M!==void 0?M:[],D=D!==void 0?D:re,super(M,D,t,e,i,z,A,I,n,T),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(M){this.image=M}}class Qg extends Vt{constructor(M=1,D={}){super(M,M,D),this.isWebGLCubeRenderTarget=!0;const t={width:M,height:M,depth:1},e=[t,t,t,t,t,t];this.texture=new eI(e,D.mapping,D.wrapS,D.wrapT,D.magFilter,D.minFilter,D.format,D.type,D.anisotropy,D.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=D.generateMipmaps!==void 0?D.generateMipmaps:!1,this.texture.minFilter=D.minFilter!==void 0?D.minFilter:aD}fromEquirectangularTexture(M,D){this.texture.type=D.type,this.texture.encoding=D.encoding,this.texture.generateMipmaps=D.generateMipmaps,this.texture.minFilter=D.minFilter,this.texture.magFilter=D.magFilter;const t={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},e=new gN(5,5,5),i=new Gt({name:"CubemapFromEquirect",uniforms:ve(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:wD,blending:lt});i.uniforms.tEquirect.value=D;const z=new Mt(e,i),A=D.minFilter;return D.minFilter===DN&&(D.minFilter=aD),new mg(1,10,this).update(M,z),D.minFilter=A,z.geometry.dispose(),z.material.dispose(),this}clear(M,D,t,e){const i=M.getRenderTarget();for(let z=0;z<6;z++)M.setRenderTarget(this,z),M.clear(D,t,e);M.setRenderTarget(i)}}function kg(N){let M=new WeakMap;function D(z,A){return A===$i?z.mapping=re:A===Ji&&(z.mapping=ce),z}function t(z){if(z&&z.isTexture&&z.isRenderTargetTexture===!1){const A=z.mapping;if(A===$i||A===Ji)if(M.has(z)){const I=M.get(z).texture;return D(I,z.mapping)}else{const I=z.image;if(I&&I.height>0){const n=new Qg(I.height/2);return n.fromEquirectangularTexture(N,z),M.set(z,n),z.addEventListener("dispose",e),D(n.texture,z.mapping)}else return null}}return z}function e(z){const A=z.target;A.removeEventListener("dispose",e);const I=M.get(A);I!==void 0&&(M.delete(A),I.dispose())}function i(){M=new WeakMap}return{get:t,dispose:i}}const Ue=4,NI=[.125,.215,.35,.446,.526,.582],Ht=20,fA=new Pn,iI=new QM;let mA=null;const Wt=(1+Math.sqrt(5))/2,fe=1/Wt,AI=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Wt,fe),new U(0,Wt,-fe),new U(fe,0,Wt),new U(-fe,0,Wt),new U(Wt,fe,0),new U(-Wt,fe,0)];class zI{constructor(M){this._renderer=M,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(M,D=0,t=.1,e=100){mA=this._renderer.getRenderTarget(),this._setSize(256);const i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(M,t,e,i),D>0&&this._blur(i,0,0,D),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(M,D=null){return this._fromTexture(M,D)}fromCubemap(M,D=null){return this._fromTexture(M,D)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=TI(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=II(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(M){this._lodMax=Math.floor(Math.log2(M)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let M=0;M<this._lodPlanes.length;M++)this._lodPlanes[M].dispose()}_cleanup(M){this._renderer.setRenderTarget(mA),M.scissorTest=!1,Ai(M,0,0,M.width,M.height)}_fromTexture(M,D){M.mapping===re||M.mapping===ce?this._setSize(M.image.length===0?16:M.image[0].width||M.image[0].image.width):this._setSize(M.image.width/4),mA=this._renderer.getRenderTarget();const t=D||this._allocateTargets();return this._textureToCubeUV(M,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const M=3*Math.max(this._cubeSize,112),D=4*this._cubeSize,t={magFilter:aD,minFilter:aD,generateMipmaps:!1,type:tN,format:PD,encoding:bt,depthBuffer:!1},e=nI(M,D,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==M||this._pingPongRenderTarget.height!==D){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nI(M,D,t);const{_lodMax:i}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sg(i)),this._blurMaterial=Zg(i,M,D)}return e}_compileMaterial(M){const D=new Mt(this._lodPlanes[0],M);this._renderer.compile(D,fA)}_sceneToCubeUV(M,D,t,e){const A=new UD(90,1,D,t),I=[1,-1,1,1,1,1],n=[1,1,1,-1,-1,-1],T=this._renderer,u=T.autoClear,g=T.toneMapping;T.getClearColor(iI),T.toneMapping=it,T.autoClear=!1;const s=new qn({name:"PMREM.Background",side:wD,depthWrite:!1,depthTest:!1}),j=new Mt(new gN,s);let r=!1;const c=M.background;c?c.isColor&&(s.color.copy(c),M.background=null,r=!0):(s.color.copy(iI),r=!0);for(let y=0;y<6;y++){const w=y%3;w===0?(A.up.set(0,I[y],0),A.lookAt(n[y],0,0)):w===1?(A.up.set(0,0,I[y]),A.lookAt(0,n[y],0)):(A.up.set(0,I[y],0),A.lookAt(0,0,n[y]));const a=this._cubeSize;Ai(e,w*a,y>2?a:0,a,a),T.setRenderTarget(e),r&&T.render(j,A),T.render(M,A)}j.geometry.dispose(),j.material.dispose(),T.toneMapping=g,T.autoClear=u,M.background=c}_textureToCubeUV(M,D){const t=this._renderer,e=M.mapping===re||M.mapping===ce;e?(this._cubemapMaterial===null&&(this._cubemapMaterial=TI()),this._cubemapMaterial.uniforms.flipEnvMap.value=M.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=II());const i=e?this._cubemapMaterial:this._equirectMaterial,z=new Mt(this._lodPlanes[0],i),A=i.uniforms;A.envMap.value=M;const I=this._cubeSize;Ai(D,0,0,3*I,2*I),t.setRenderTarget(D),t.render(z,fA)}_applyPMREM(M){const D=this._renderer,t=D.autoClear;D.autoClear=!1;for(let e=1;e<this._lodPlanes.length;e++){const i=Math.sqrt(this._sigmas[e]*this._sigmas[e]-this._sigmas[e-1]*this._sigmas[e-1]),z=AI[(e-1)%AI.length];this._blur(M,e-1,e,i,z)}D.autoClear=t}_blur(M,D,t,e,i){const z=this._pingPongRenderTarget;this._halfBlur(M,z,D,t,e,"latitudinal",i),this._halfBlur(z,M,t,t,e,"longitudinal",i)}_halfBlur(M,D,t,e,i,z,A){const I=this._renderer,n=this._blurMaterial;z!=="latitudinal"&&z!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const T=3,u=new Mt(this._lodPlanes[e],n),g=n.uniforms,s=this._sizeLods[t]-1,j=isFinite(i)?Math.PI/(2*s):2*Math.PI/(2*Ht-1),r=i/j,c=isFinite(i)?1+Math.floor(T*r):Ht;c>Ht&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${Ht}`);const y=[];let w=0;for(let d=0;d<Ht;++d){const L=d/r,l=Math.exp(-L*L/2);y.push(l),d===0?w+=l:d<c&&(w+=2*l)}for(let d=0;d<y.length;d++)y[d]=y[d]/w;g.envMap.value=M.texture,g.samples.value=c,g.weights.value=y,g.latitudinal.value=z==="latitudinal",A&&(g.poleAxis.value=A);const{_lodMax:a}=this;g.dTheta.value=j,g.mipInt.value=a-t;const o=this._sizeLods[e],O=3*o*(e>a-Ue?e-a+Ue:0),h=4*(this._cubeSize-o);Ai(D,O,h,3*o,2*o),I.setRenderTarget(D),I.render(u,fA)}}function Sg(N){const M=[],D=[],t=[];let e=N;const i=N-Ue+1+NI.length;for(let z=0;z<i;z++){const A=Math.pow(2,e);D.push(A);let I=1/A;z>N-Ue?I=NI[z-N+Ue-1]:z===0&&(I=0),t.push(I);const n=1/(A-2),T=-n,u=1+n,g=[T,T,u,T,u,u,T,T,u,u,T,u],s=6,j=6,r=3,c=2,y=1,w=new Float32Array(r*j*s),a=new Float32Array(c*j*s),o=new Float32Array(y*j*s);for(let h=0;h<s;h++){const d=h%3*2/3-1,L=h>2?0:-1,l=[d,L,0,d+2/3,L,0,d+2/3,L+1,0,d,L,0,d+2/3,L+1,0,d,L+1,0];w.set(l,r*j*h),a.set(g,c*j*h);const p=[h,h,h,h,h,h];o.set(p,y*j*h)}const O=new he;O.setAttribute("position",new $D(w,r)),O.setAttribute("uv",new $D(a,c)),O.setAttribute("faceIndex",new $D(o,y)),M.push(O),e>Ue&&e--}return{lodPlanes:M,sizeLods:D,sigmas:t}}function nI(N,M,D){const t=new Vt(N,M,D);return t.texture.mapping=PN,t.texture.name="PMREM.cubeUv",t.scissorTest=!0,t}function Ai(N,M,D,t,e){N.viewport.set(M,D,t,e),N.scissor.set(M,D,t,e)}function Zg(N,M,D){const t=new Float32Array(Ht),e=new U(0,1,0);return new Gt({name:"SphericalGaussianBlur",defines:{n:Ht,CUBEUV_TEXEL_WIDTH:1/M,CUBEUV_TEXEL_HEIGHT:1/D,CUBEUV_MAX_MIP:`${N}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:t},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:e}},vertexShader:QA(),fragmentShader:`

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
		`,blending:lt,depthTest:!1,depthWrite:!1})}function II(){return new Gt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:QA(),fragmentShader:`

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
		`,blending:lt,depthTest:!1,depthWrite:!1})}function TI(){return new Gt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:QA(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:lt,depthTest:!1,depthWrite:!1})}function QA(){return`

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
	`}function _g(N){let M=new WeakMap,D=null;function t(A){if(A&&A.isTexture){const I=A.mapping,n=I===$i||I===Ji,T=I===re||I===ce;if(n||T)if(A.isRenderTargetTexture&&A.needsPMREMUpdate===!0){A.needsPMREMUpdate=!1;let u=M.get(A);return D===null&&(D=new zI(N)),u=n?D.fromEquirectangular(A,u):D.fromCubemap(A,u),M.set(A,u),u.texture}else{if(M.has(A))return M.get(A).texture;{const u=A.image;if(n&&u&&u.height>0||T&&u&&e(u)){D===null&&(D=new zI(N));const g=n?D.fromEquirectangular(A):D.fromCubemap(A);return M.set(A,g),A.addEventListener("dispose",i),g.texture}else return null}}}return A}function e(A){let I=0;const n=6;for(let T=0;T<n;T++)A[T]!==void 0&&I++;return I===n}function i(A){const I=A.target;I.removeEventListener("dispose",i);const n=M.get(I);n!==void 0&&(M.delete(I),n.dispose())}function z(){M=new WeakMap,D!==null&&(D.dispose(),D=null)}return{get:t,dispose:z}}function bg(N){const M={};function D(t){if(M[t]!==void 0)return M[t];let e;switch(t){case"WEBGL_depth_texture":e=N.getExtension("WEBGL_depth_texture")||N.getExtension("MOZ_WEBGL_depth_texture")||N.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":e=N.getExtension("EXT_texture_filter_anisotropic")||N.getExtension("MOZ_EXT_texture_filter_anisotropic")||N.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":e=N.getExtension("WEBGL_compressed_texture_s3tc")||N.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||N.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":e=N.getExtension("WEBGL_compressed_texture_pvrtc")||N.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:e=N.getExtension(t)}return M[t]=e,e}return{has:function(t){return D(t)!==null},init:function(t){t.isWebGL2?D("EXT_color_buffer_float"):(D("WEBGL_depth_texture"),D("OES_texture_float"),D("OES_texture_half_float"),D("OES_texture_half_float_linear"),D("OES_standard_derivatives"),D("OES_element_index_uint"),D("OES_vertex_array_object"),D("ANGLE_instanced_arrays")),D("OES_texture_float_linear"),D("EXT_color_buffer_half_float"),D("WEBGL_multisampled_render_to_texture")},get:function(t){const e=D(t);return e===null&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),e}}}function Kg(N,M,D,t){const e={},i=new WeakMap;function z(u){const g=u.target;g.index!==null&&M.remove(g.index);for(const j in g.attributes)M.remove(g.attributes[j]);g.removeEventListener("dispose",z),delete e[g.id];const s=i.get(g);s&&(M.remove(s),i.delete(g)),t.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,D.memory.geometries--}function A(u,g){return e[g.id]===!0||(g.addEventListener("dispose",z),e[g.id]=!0,D.memory.geometries++),g}function I(u){const g=u.attributes;for(const j in g)M.update(g[j],N.ARRAY_BUFFER);const s=u.morphAttributes;for(const j in s){const r=s[j];for(let c=0,y=r.length;c<y;c++)M.update(r[c],N.ARRAY_BUFFER)}}function n(u){const g=[],s=u.index,j=u.attributes.position;let r=0;if(s!==null){const w=s.array;r=s.version;for(let a=0,o=w.length;a<o;a+=3){const O=w[a+0],h=w[a+1],d=w[a+2];g.push(O,h,h,d,d,O)}}else{const w=j.array;r=j.version;for(let a=0,o=w.length/3-1;a<o;a+=3){const O=a+0,h=a+1,d=a+2;g.push(O,h,h,d,d,O)}}const c=new(Gn(g)?Jn:$n)(g,1);c.version=r;const y=i.get(u);y&&M.remove(y),i.set(u,c)}function T(u){const g=i.get(u);if(g){const s=u.index;s!==null&&g.version<s.version&&n(u)}else n(u);return i.get(u)}return{get:A,update:I,getWireframeAttribute:T}}function Rg(N,M,D,t){const e=t.isWebGL2;let i;function z(g){i=g}let A,I;function n(g){A=g.type,I=g.bytesPerElement}function T(g,s){N.drawElements(i,s,A,g*I),D.update(s,i,1)}function u(g,s,j){if(j===0)return;let r,c;if(e)r=N,c="drawElementsInstanced";else if(r=M.get("ANGLE_instanced_arrays"),c="drawElementsInstancedANGLE",r===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}r[c](i,s,A,g*I,j),D.update(s,i,j)}this.setMode=z,this.setIndex=n,this.render=T,this.renderInstances=u}function Pg(N){const M={geometries:0,textures:0},D={frame:0,calls:0,triangles:0,points:0,lines:0};function t(i,z,A){switch(D.calls++,z){case N.TRIANGLES:D.triangles+=A*(i/3);break;case N.LINES:D.lines+=A*(i/2);break;case N.LINE_STRIP:D.lines+=A*(i-1);break;case N.LINE_LOOP:D.lines+=A*i;break;case N.POINTS:D.points+=A*i;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",z);break}}function e(){D.frame++,D.calls=0,D.triangles=0,D.points=0,D.lines=0}return{memory:M,render:D,programs:null,autoReset:!0,reset:e,update:t}}class uI extends BD{constructor(M=null,D=1,t=1,e=1){super(null),this.isDataArrayTexture=!0,this.image={data:M,width:D,height:t,depth:e},this.magFilter=TD,this.minFilter=TD,this.wrapR=RD,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}function Fg(N,M){return N[0]-M[0]}function Bg(N,M){return Math.abs(M[1])-Math.abs(N[1])}function Gg(N,M,D){const t={},e=new Float32Array(8),i=new WeakMap,z=new qM,A=[];for(let n=0;n<8;n++)A[n]=[n,0];function I(n,T,u,g){const s=n.morphTargetInfluences;if(M.isWebGL2===!0){const j=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,r=j!==void 0?j.length:0;let c=i.get(T);if(c===void 0||c.count!==r){let Z=function(){Q.dispose(),i.delete(T),T.removeEventListener("dispose",Z)};c!==void 0&&c.texture.dispose();const a=T.morphAttributes.position!==void 0,o=T.morphAttributes.normal!==void 0,O=T.morphAttributes.color!==void 0,h=T.morphAttributes.position||[],d=T.morphAttributes.normal||[],L=T.morphAttributes.color||[];let l=0;a===!0&&(l=1),o===!0&&(l=2),O===!0&&(l=3);let p=T.attributes.position.count*l,B=1;p>M.maxTextureSize&&(B=Math.ceil(p/M.maxTextureSize),p=M.maxTextureSize);const G=new Float32Array(p*B*4*r),Q=new uI(G,p,B,r);Q.type=Zt,Q.needsUpdate=!0;const m=l*4;for(let H=0;H<r;H++){const $=h[H],F=d[H],J=L[H],W=p*B*4*H;for(let TM=0;TM<$.count;TM++){const S=TM*m;a===!0&&(z.fromBufferAttribute($,TM),G[W+S+0]=z.x,G[W+S+1]=z.y,G[W+S+2]=z.z,G[W+S+3]=0),o===!0&&(z.fromBufferAttribute(F,TM),G[W+S+4]=z.x,G[W+S+5]=z.y,G[W+S+6]=z.z,G[W+S+7]=0),O===!0&&(z.fromBufferAttribute(J,TM),G[W+S+8]=z.x,G[W+S+9]=z.y,G[W+S+10]=z.z,G[W+S+11]=J.itemSize===4?z.w:1)}}c={count:r,texture:Q,size:new gM(p,B)},i.set(T,c),T.addEventListener("dispose",Z)}let y=0;for(let a=0;a<s.length;a++)y+=s[a];const w=T.morphTargetsRelative?1:1-y;g.getUniforms().setValue(N,"morphTargetBaseInfluence",w),g.getUniforms().setValue(N,"morphTargetInfluences",s),g.getUniforms().setValue(N,"morphTargetsTexture",c.texture,D),g.getUniforms().setValue(N,"morphTargetsTextureSize",c.size)}else{const j=s===void 0?0:s.length;let r=t[T.id];if(r===void 0||r.length!==j){r=[];for(let o=0;o<j;o++)r[o]=[o,0];t[T.id]=r}for(let o=0;o<j;o++){const O=r[o];O[0]=o,O[1]=s[o]}r.sort(Bg);for(let o=0;o<8;o++)o<j&&r[o][1]?(A[o][0]=r[o][0],A[o][1]=r[o][1]):(A[o][0]=Number.MAX_SAFE_INTEGER,A[o][1]=0);A.sort(Fg);const c=T.morphAttributes.position,y=T.morphAttributes.normal;let w=0;for(let o=0;o<8;o++){const O=A[o],h=O[0],d=O[1];h!==Number.MAX_SAFE_INTEGER&&d?(c&&T.getAttribute("morphTarget"+o)!==c[h]&&T.setAttribute("morphTarget"+o,c[h]),y&&T.getAttribute("morphNormal"+o)!==y[h]&&T.setAttribute("morphNormal"+o,y[h]),e[o]=d,w+=d):(c&&T.hasAttribute("morphTarget"+o)===!0&&T.deleteAttribute("morphTarget"+o),y&&T.hasAttribute("morphNormal"+o)===!0&&T.deleteAttribute("morphNormal"+o),e[o]=0)}const a=T.morphTargetsRelative?1:1-w;g.getUniforms().setValue(N,"morphTargetBaseInfluence",a),g.getUniforms().setValue(N,"morphTargetInfluences",e)}}return{update:I}}function Vg(N,M,D,t){let e=new WeakMap;function i(I){const n=t.render.frame,T=I.geometry,u=M.get(I,T);return e.get(u)!==n&&(M.update(u),e.set(u,n)),I.isInstancedMesh&&(I.hasEventListener("dispose",A)===!1&&I.addEventListener("dispose",A),D.update(I.instanceMatrix,N.ARRAY_BUFFER),I.instanceColor!==null&&D.update(I.instanceColor,N.ARRAY_BUFFER)),u}function z(){e=new WeakMap}function A(I){const n=I.target;n.removeEventListener("dispose",A),D.remove(n.instanceMatrix),n.instanceColor!==null&&D.remove(n.instanceColor)}return{update:i,dispose:z}}class Hg extends BD{constructor(M=null,D=1,t=1,e=1){super(null),this.isData3DTexture=!0,this.image={data:M,width:D,height:t,depth:e},this.magFilter=TD,this.minFilter=TD,this.wrapR=RD,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const gI=new BD,sI=new uI,rI=new Hg,cI=new eI,jI=[],yI=[],aI=new Float32Array(16),oI=new Float32Array(9),CI=new Float32Array(4);function me(N,M,D){const t=N[0];if(t<=0||t>0)return N;const e=M*D;let i=jI[e];if(i===void 0&&(i=new Float32Array(e),jI[e]=i),M!==0){t.toArray(i,0);for(let z=1,A=0;z!==M;++z)A+=D,N[z].toArray(i,A)}return i}function VM(N,M){if(N.length!==M.length)return!1;for(let D=0,t=N.length;D<t;D++)if(N[D]!==M[D])return!1;return!0}function HM(N,M){for(let D=0,t=M.length;D<t;D++)N[D]=M[D]}function zi(N,M){let D=yI[M];D===void 0&&(D=new Int32Array(M),yI[M]=D);for(let t=0;t!==M;++t)D[t]=N.allocateTextureUnit();return D}function Wg(N,M){const D=this.cache;D[0]!==M&&(N.uniform1f(this.addr,M),D[0]=M)}function Xg(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y)&&(N.uniform2f(this.addr,M.x,M.y),D[0]=M.x,D[1]=M.y);else{if(VM(D,M))return;N.uniform2fv(this.addr,M),HM(D,M)}}function qg(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z)&&(N.uniform3f(this.addr,M.x,M.y,M.z),D[0]=M.x,D[1]=M.y,D[2]=M.z);else if(M.r!==void 0)(D[0]!==M.r||D[1]!==M.g||D[2]!==M.b)&&(N.uniform3f(this.addr,M.r,M.g,M.b),D[0]=M.r,D[1]=M.g,D[2]=M.b);else{if(VM(D,M))return;N.uniform3fv(this.addr,M),HM(D,M)}}function $g(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z||D[3]!==M.w)&&(N.uniform4f(this.addr,M.x,M.y,M.z,M.w),D[0]=M.x,D[1]=M.y,D[2]=M.z,D[3]=M.w);else{if(VM(D,M))return;N.uniform4fv(this.addr,M),HM(D,M)}}function Jg(N,M){const D=this.cache,t=M.elements;if(t===void 0){if(VM(D,M))return;N.uniformMatrix2fv(this.addr,!1,M),HM(D,M)}else{if(VM(D,t))return;CI.set(t),N.uniformMatrix2fv(this.addr,!1,CI),HM(D,t)}}function Ms(N,M){const D=this.cache,t=M.elements;if(t===void 0){if(VM(D,M))return;N.uniformMatrix3fv(this.addr,!1,M),HM(D,M)}else{if(VM(D,t))return;oI.set(t),N.uniformMatrix3fv(this.addr,!1,oI),HM(D,t)}}function Ds(N,M){const D=this.cache,t=M.elements;if(t===void 0){if(VM(D,M))return;N.uniformMatrix4fv(this.addr,!1,M),HM(D,M)}else{if(VM(D,t))return;aI.set(t),N.uniformMatrix4fv(this.addr,!1,aI),HM(D,t)}}function ts(N,M){const D=this.cache;D[0]!==M&&(N.uniform1i(this.addr,M),D[0]=M)}function es(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y)&&(N.uniform2i(this.addr,M.x,M.y),D[0]=M.x,D[1]=M.y);else{if(VM(D,M))return;N.uniform2iv(this.addr,M),HM(D,M)}}function Ns(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z)&&(N.uniform3i(this.addr,M.x,M.y,M.z),D[0]=M.x,D[1]=M.y,D[2]=M.z);else{if(VM(D,M))return;N.uniform3iv(this.addr,M),HM(D,M)}}function is(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z||D[3]!==M.w)&&(N.uniform4i(this.addr,M.x,M.y,M.z,M.w),D[0]=M.x,D[1]=M.y,D[2]=M.z,D[3]=M.w);else{if(VM(D,M))return;N.uniform4iv(this.addr,M),HM(D,M)}}function As(N,M){const D=this.cache;D[0]!==M&&(N.uniform1ui(this.addr,M),D[0]=M)}function zs(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y)&&(N.uniform2ui(this.addr,M.x,M.y),D[0]=M.x,D[1]=M.y);else{if(VM(D,M))return;N.uniform2uiv(this.addr,M),HM(D,M)}}function ns(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z)&&(N.uniform3ui(this.addr,M.x,M.y,M.z),D[0]=M.x,D[1]=M.y,D[2]=M.z);else{if(VM(D,M))return;N.uniform3uiv(this.addr,M),HM(D,M)}}function Is(N,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z||D[3]!==M.w)&&(N.uniform4ui(this.addr,M.x,M.y,M.z,M.w),D[0]=M.x,D[1]=M.y,D[2]=M.z,D[3]=M.w);else{if(VM(D,M))return;N.uniform4uiv(this.addr,M),HM(D,M)}}function Ts(N,M,D){const t=this.cache,e=D.allocateTextureUnit();t[0]!==e&&(N.uniform1i(this.addr,e),t[0]=e),D.setTexture2D(M||gI,e)}function us(N,M,D){const t=this.cache,e=D.allocateTextureUnit();t[0]!==e&&(N.uniform1i(this.addr,e),t[0]=e),D.setTexture3D(M||rI,e)}function gs(N,M,D){const t=this.cache,e=D.allocateTextureUnit();t[0]!==e&&(N.uniform1i(this.addr,e),t[0]=e),D.setTextureCube(M||cI,e)}function ss(N,M,D){const t=this.cache,e=D.allocateTextureUnit();t[0]!==e&&(N.uniform1i(this.addr,e),t[0]=e),D.setTexture2DArray(M||sI,e)}function rs(N){switch(N){case 5126:return Wg;case 35664:return Xg;case 35665:return qg;case 35666:return $g;case 35674:return Jg;case 35675:return Ms;case 35676:return Ds;case 5124:case 35670:return ts;case 35667:case 35671:return es;case 35668:case 35672:return Ns;case 35669:case 35673:return is;case 5125:return As;case 36294:return zs;case 36295:return ns;case 36296:return Is;case 35678:case 36198:case 36298:case 36306:case 35682:return Ts;case 35679:case 36299:case 36307:return us;case 35680:case 36300:case 36308:case 36293:return gs;case 36289:case 36303:case 36311:case 36292:return ss}}function cs(N,M){N.uniform1fv(this.addr,M)}function js(N,M){const D=me(M,this.size,2);N.uniform2fv(this.addr,D)}function ys(N,M){const D=me(M,this.size,3);N.uniform3fv(this.addr,D)}function as(N,M){const D=me(M,this.size,4);N.uniform4fv(this.addr,D)}function os(N,M){const D=me(M,this.size,4);N.uniformMatrix2fv(this.addr,!1,D)}function Cs(N,M){const D=me(M,this.size,9);N.uniformMatrix3fv(this.addr,!1,D)}function Ls(N,M){const D=me(M,this.size,16);N.uniformMatrix4fv(this.addr,!1,D)}function ws(N,M){N.uniform1iv(this.addr,M)}function xs(N,M){N.uniform2iv(this.addr,M)}function Os(N,M){N.uniform3iv(this.addr,M)}function Es(N,M){N.uniform4iv(this.addr,M)}function ls(N,M){N.uniform1uiv(this.addr,M)}function hs(N,M){N.uniform2uiv(this.addr,M)}function ds(N,M){N.uniform3uiv(this.addr,M)}function vs(N,M){N.uniform4uiv(this.addr,M)}function Ys(N,M,D){const t=this.cache,e=M.length,i=zi(D,e);VM(t,i)||(N.uniform1iv(this.addr,i),HM(t,i));for(let z=0;z!==e;++z)D.setTexture2D(M[z]||gI,i[z])}function ps(N,M,D){const t=this.cache,e=M.length,i=zi(D,e);VM(t,i)||(N.uniform1iv(this.addr,i),HM(t,i));for(let z=0;z!==e;++z)D.setTexture3D(M[z]||rI,i[z])}function Us(N,M,D){const t=this.cache,e=M.length,i=zi(D,e);VM(t,i)||(N.uniform1iv(this.addr,i),HM(t,i));for(let z=0;z!==e;++z)D.setTextureCube(M[z]||cI,i[z])}function fs(N,M,D){const t=this.cache,e=M.length,i=zi(D,e);VM(t,i)||(N.uniform1iv(this.addr,i),HM(t,i));for(let z=0;z!==e;++z)D.setTexture2DArray(M[z]||sI,i[z])}function ms(N){switch(N){case 5126:return cs;case 35664:return js;case 35665:return ys;case 35666:return as;case 35674:return os;case 35675:return Cs;case 35676:return Ls;case 5124:case 35670:return ws;case 35667:case 35671:return xs;case 35668:case 35672:return Os;case 35669:case 35673:return Es;case 5125:return ls;case 36294:return hs;case 36295:return ds;case 36296:return vs;case 35678:case 36198:case 36298:case 36306:case 35682:return Ys;case 35679:case 36299:case 36307:return ps;case 35680:case 36300:case 36308:case 36293:return Us;case 36289:case 36303:case 36311:case 36292:return fs}}class Qs{constructor(M,D,t){this.id=M,this.addr=t,this.cache=[],this.setValue=rs(D.type)}}class ks{constructor(M,D,t){this.id=M,this.addr=t,this.cache=[],this.size=D.size,this.setValue=ms(D.type)}}class Ss{constructor(M){this.id=M,this.seq=[],this.map={}}setValue(M,D,t){const e=this.seq;for(let i=0,z=e.length;i!==z;++i){const A=e[i];A.setValue(M,D[A.id],t)}}}const kA=/(\w+)(\])?(\[|\.)?/g;function LI(N,M){N.seq.push(M),N.map[M.id]=M}function Zs(N,M,D){const t=N.name,e=t.length;for(kA.lastIndex=0;;){const i=kA.exec(t),z=kA.lastIndex;let A=i[1];const I=i[2]==="]",n=i[3];if(I&&(A=A|0),n===void 0||n==="["&&z+2===e){LI(D,n===void 0?new Qs(A,N,M):new ks(A,N,M));break}else{let u=D.map[A];u===void 0&&(u=new Ss(A),LI(D,u)),D=u}}}class ni{constructor(M,D){this.seq=[],this.map={};const t=M.getProgramParameter(D,M.ACTIVE_UNIFORMS);for(let e=0;e<t;++e){const i=M.getActiveUniform(D,e),z=M.getUniformLocation(D,i.name);Zs(i,z,this)}}setValue(M,D,t,e){const i=this.map[D];i!==void 0&&i.setValue(M,t,e)}setOptional(M,D,t){const e=D[t];e!==void 0&&this.setValue(M,t,e)}static upload(M,D,t,e){for(let i=0,z=D.length;i!==z;++i){const A=D[i],I=t[A.id];I.needsUpdate!==!1&&A.setValue(M,I.value,e)}}static seqWithValue(M,D){const t=[];for(let e=0,i=M.length;e!==i;++e){const z=M[e];z.id in D&&t.push(z)}return t}}function wI(N,M,D){const t=N.createShader(M);return N.shaderSource(t,D),N.compileShader(t),t}let _s=0;function bs(N,M){const D=N.split(`
`),t=[],e=Math.max(M-6,0),i=Math.min(M+6,D.length);for(let z=e;z<i;z++){const A=z+1;t.push(`${A===M?">":" "} ${A}: ${D[z]}`)}return t.join(`
`)}function Ks(N){switch(N){case bt:return["Linear","( value )"];case SM:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",N),["Linear","( value )"]}}function xI(N,M,D){const t=N.getShaderParameter(M,N.COMPILE_STATUS),e=N.getShaderInfoLog(M).trim();if(t&&e==="")return"";const i=/ERROR: 0:(\d+)/.exec(e);if(i){const z=parseInt(i[1]);return D.toUpperCase()+`

`+e+`

`+bs(N.getShaderSource(M),z)}else return e}function Rs(N,M){const D=Ks(M);return"vec4 "+N+"( vec4 value ) { return LinearTo"+D[0]+D[1]+"; }"}function Ps(N,M){let D;switch(M){case Su:D="Linear";break;case Zu:D="Reinhard";break;case _u:D="OptimizedCineon";break;case bu:D="ACESFilmic";break;case Ku:D="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",M),D="Linear"}return"vec3 "+N+"( vec3 color ) { return "+D+"ToneMapping( color ); }"}function Fs(N){return[N.extensionDerivatives||N.envMapCubeUVHeight||N.bumpMap||N.tangentSpaceNormalMap||N.clearcoatNormalMap||N.flatShading||N.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(N.extensionFragDepth||N.logarithmicDepthBuffer)&&N.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",N.extensionDrawBuffers&&N.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(N.extensionShaderTextureLOD||N.envMap||N.transmission)&&N.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(sN).join(`
`)}function Bs(N){const M=[];for(const D in N){const t=N[D];t!==!1&&M.push("#define "+D+" "+t)}return M.join(`
`)}function Gs(N,M){const D={},t=N.getProgramParameter(M,N.ACTIVE_ATTRIBUTES);for(let e=0;e<t;e++){const i=N.getActiveAttrib(M,e),z=i.name;let A=1;i.type===N.FLOAT_MAT2&&(A=2),i.type===N.FLOAT_MAT3&&(A=3),i.type===N.FLOAT_MAT4&&(A=4),D[z]={type:i.type,location:N.getAttribLocation(M,z),locationSize:A}}return D}function sN(N){return N!==""}function OI(N,M){const D=M.numSpotLightShadows+M.numSpotLightMaps-M.numSpotLightShadowsWithMaps;return N.replace(/NUM_DIR_LIGHTS/g,M.numDirLights).replace(/NUM_SPOT_LIGHTS/g,M.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,M.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,D).replace(/NUM_RECT_AREA_LIGHTS/g,M.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,M.numPointLights).replace(/NUM_HEMI_LIGHTS/g,M.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,M.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,M.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,M.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,M.numPointLightShadows)}function EI(N,M){return N.replace(/NUM_CLIPPING_PLANES/g,M.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,M.numClippingPlanes-M.numClipIntersection)}const Vs=/^[ \t]*#include +<([\w\d./]+)>/gm;function SA(N){return N.replace(Vs,Hs)}function Hs(N,M){const D=OM[M];if(D===void 0)throw new Error("Can not resolve #include <"+M+">");return SA(D)}const Ws=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lI(N){return N.replace(Ws,Xs)}function Xs(N,M,D,t){let e="";for(let i=parseInt(M);i<parseInt(D);i++)e+=t.replace(/\[\s*i\s*\]/g,"[ "+i+" ]").replace(/UNROLLED_LOOP_INDEX/g,i);return e}function hI(N){let M="precision "+N.precision+` float;
precision `+N.precision+" int;";return N.precision==="highp"?M+=`
#define HIGH_PRECISION`:N.precision==="mediump"?M+=`
#define MEDIUM_PRECISION`:N.precision==="lowp"&&(M+=`
#define LOW_PRECISION`),M}function qs(N){let M="SHADOWMAP_TYPE_BASIC";return N.shadowMapType===tn?M="SHADOWMAP_TYPE_PCF":N.shadowMapType===cu?M="SHADOWMAP_TYPE_PCF_SOFT":N.shadowMapType===MN&&(M="SHADOWMAP_TYPE_VSM"),M}function $s(N){let M="ENVMAP_TYPE_CUBE";if(N.envMap)switch(N.envMapMode){case re:case ce:M="ENVMAP_TYPE_CUBE";break;case PN:M="ENVMAP_TYPE_CUBE_UV";break}return M}function Js(N){let M="ENVMAP_MODE_REFLECTION";if(N.envMap)switch(N.envMapMode){case ce:M="ENVMAP_MODE_REFRACTION";break}return M}function Mr(N){let M="ENVMAP_BLENDING_NONE";if(N.envMap)switch(N.combine){case qi:M="ENVMAP_BLENDING_MULTIPLY";break;case Qu:M="ENVMAP_BLENDING_MIX";break;case ku:M="ENVMAP_BLENDING_ADD";break}return M}function Dr(N){const M=N.envMapCubeUVHeight;if(M===null)return null;const D=Math.log2(M)-2,t=1/M;return{texelWidth:1/(3*Math.max(Math.pow(2,D),7*16)),texelHeight:t,maxMip:D}}function tr(N,M,D,t){const e=N.getContext(),i=D.defines;let z=D.vertexShader,A=D.fragmentShader;const I=qs(D),n=$s(D),T=Js(D),u=Mr(D),g=Dr(D),s=D.isWebGL2?"":Fs(D),j=Bs(i),r=e.createProgram();let c,y,w=D.glslVersion?"#version "+D.glslVersion+`
`:"";D.isRawShaderMaterial?(c=[j].filter(sN).join(`
`),c.length>0&&(c+=`
`),y=[s,j].filter(sN).join(`
`),y.length>0&&(y+=`
`)):(c=[hI(D),"#define SHADER_NAME "+D.shaderName,j,D.instancing?"#define USE_INSTANCING":"",D.instancingColor?"#define USE_INSTANCING_COLOR":"",D.supportsVertexTextures?"#define VERTEX_TEXTURES":"",D.useFog&&D.fog?"#define USE_FOG":"",D.useFog&&D.fogExp2?"#define FOG_EXP2":"",D.map?"#define USE_MAP":"",D.envMap?"#define USE_ENVMAP":"",D.envMap?"#define "+T:"",D.lightMap?"#define USE_LIGHTMAP":"",D.aoMap?"#define USE_AOMAP":"",D.emissiveMap?"#define USE_EMISSIVEMAP":"",D.bumpMap?"#define USE_BUMPMAP":"",D.normalMap?"#define USE_NORMALMAP":"",D.normalMap&&D.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",D.normalMap&&D.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",D.clearcoatMap?"#define USE_CLEARCOATMAP":"",D.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",D.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",D.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",D.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",D.displacementMap&&D.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",D.specularMap?"#define USE_SPECULARMAP":"",D.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",D.specularColorMap?"#define USE_SPECULARCOLORMAP":"",D.roughnessMap?"#define USE_ROUGHNESSMAP":"",D.metalnessMap?"#define USE_METALNESSMAP":"",D.alphaMap?"#define USE_ALPHAMAP":"",D.transmission?"#define USE_TRANSMISSION":"",D.transmissionMap?"#define USE_TRANSMISSIONMAP":"",D.thicknessMap?"#define USE_THICKNESSMAP":"",D.sheenColorMap?"#define USE_SHEENCOLORMAP":"",D.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",D.vertexTangents?"#define USE_TANGENT":"",D.vertexColors?"#define USE_COLOR":"",D.vertexAlphas?"#define USE_COLOR_ALPHA":"",D.vertexUvs?"#define USE_UV":"",D.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",D.flatShading?"#define FLAT_SHADED":"",D.skinning?"#define USE_SKINNING":"",D.morphTargets?"#define USE_MORPHTARGETS":"",D.morphNormals&&D.flatShading===!1?"#define USE_MORPHNORMALS":"",D.morphColors&&D.isWebGL2?"#define USE_MORPHCOLORS":"",D.morphTargetsCount>0&&D.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",D.morphTargetsCount>0&&D.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+D.morphTextureStride:"",D.morphTargetsCount>0&&D.isWebGL2?"#define MORPHTARGETS_COUNT "+D.morphTargetsCount:"",D.doubleSided?"#define DOUBLE_SIDED":"",D.flipSided?"#define FLIP_SIDED":"",D.shadowMapEnabled?"#define USE_SHADOWMAP":"",D.shadowMapEnabled?"#define "+I:"",D.sizeAttenuation?"#define USE_SIZEATTENUATION":"",D.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",D.logarithmicDepthBuffer&&D.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sN).join(`
`),y=[s,hI(D),"#define SHADER_NAME "+D.shaderName,j,D.useFog&&D.fog?"#define USE_FOG":"",D.useFog&&D.fogExp2?"#define FOG_EXP2":"",D.map?"#define USE_MAP":"",D.matcap?"#define USE_MATCAP":"",D.envMap?"#define USE_ENVMAP":"",D.envMap?"#define "+n:"",D.envMap?"#define "+T:"",D.envMap?"#define "+u:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",D.lightMap?"#define USE_LIGHTMAP":"",D.aoMap?"#define USE_AOMAP":"",D.emissiveMap?"#define USE_EMISSIVEMAP":"",D.bumpMap?"#define USE_BUMPMAP":"",D.normalMap?"#define USE_NORMALMAP":"",D.normalMap&&D.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",D.normalMap&&D.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",D.clearcoat?"#define USE_CLEARCOAT":"",D.clearcoatMap?"#define USE_CLEARCOATMAP":"",D.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",D.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",D.iridescence?"#define USE_IRIDESCENCE":"",D.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",D.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",D.specularMap?"#define USE_SPECULARMAP":"",D.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",D.specularColorMap?"#define USE_SPECULARCOLORMAP":"",D.roughnessMap?"#define USE_ROUGHNESSMAP":"",D.metalnessMap?"#define USE_METALNESSMAP":"",D.alphaMap?"#define USE_ALPHAMAP":"",D.alphaTest?"#define USE_ALPHATEST":"",D.sheen?"#define USE_SHEEN":"",D.sheenColorMap?"#define USE_SHEENCOLORMAP":"",D.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",D.transmission?"#define USE_TRANSMISSION":"",D.transmissionMap?"#define USE_TRANSMISSIONMAP":"",D.thicknessMap?"#define USE_THICKNESSMAP":"",D.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",D.vertexTangents?"#define USE_TANGENT":"",D.vertexColors||D.instancingColor?"#define USE_COLOR":"",D.vertexAlphas?"#define USE_COLOR_ALPHA":"",D.vertexUvs?"#define USE_UV":"",D.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",D.gradientMap?"#define USE_GRADIENTMAP":"",D.flatShading?"#define FLAT_SHADED":"",D.doubleSided?"#define DOUBLE_SIDED":"",D.flipSided?"#define FLIP_SIDED":"",D.shadowMapEnabled?"#define USE_SHADOWMAP":"",D.shadowMapEnabled?"#define "+I:"",D.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",D.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",D.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",D.logarithmicDepthBuffer&&D.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",D.toneMapping!==it?"#define TONE_MAPPING":"",D.toneMapping!==it?OM.tonemapping_pars_fragment:"",D.toneMapping!==it?Ps("toneMapping",D.toneMapping):"",D.dithering?"#define DITHERING":"",D.opaque?"#define OPAQUE":"",OM.encodings_pars_fragment,Rs("linearToOutputTexel",D.outputEncoding),D.useDepthPacking?"#define DEPTH_PACKING "+D.depthPacking:"",`
`].filter(sN).join(`
`)),z=SA(z),z=OI(z,D),z=EI(z,D),A=SA(A),A=OI(A,D),A=EI(A,D),z=lI(z),A=lI(A),D.isWebGL2&&D.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,c=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+c,y=["#define varying in",D.glslVersion===_n?"":"layout(location = 0) out highp vec4 pc_fragColor;",D.glslVersion===_n?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const a=w+c+z,o=w+y+A,O=wI(e,e.VERTEX_SHADER,a),h=wI(e,e.FRAGMENT_SHADER,o);if(e.attachShader(r,O),e.attachShader(r,h),D.index0AttributeName!==void 0?e.bindAttribLocation(r,0,D.index0AttributeName):D.morphTargets===!0&&e.bindAttribLocation(r,0,"position"),e.linkProgram(r),N.debug.checkShaderErrors){const l=e.getProgramInfoLog(r).trim(),p=e.getShaderInfoLog(O).trim(),B=e.getShaderInfoLog(h).trim();let G=!0,Q=!0;if(e.getProgramParameter(r,e.LINK_STATUS)===!1){G=!1;const m=xI(e,O,"vertex"),Z=xI(e,h,"fragment");console.error("THREE.WebGLProgram: Shader Error "+e.getError()+" - VALIDATE_STATUS "+e.getProgramParameter(r,e.VALIDATE_STATUS)+`

Program Info Log: `+l+`
`+m+`
`+Z)}else l!==""?console.warn("THREE.WebGLProgram: Program Info Log:",l):(p===""||B==="")&&(Q=!1);Q&&(this.diagnostics={runnable:G,programLog:l,vertexShader:{log:p,prefix:c},fragmentShader:{log:B,prefix:y}})}e.deleteShader(O),e.deleteShader(h);let d;this.getUniforms=function(){return d===void 0&&(d=new ni(e,r)),d};let L;return this.getAttributes=function(){return L===void 0&&(L=Gs(e,r)),L},this.destroy=function(){t.releaseStatesOfProgram(this),e.deleteProgram(r),this.program=void 0},this.name=D.shaderName,this.id=_s++,this.cacheKey=M,this.usedTimes=1,this.program=r,this.vertexShader=O,this.fragmentShader=h,this}let er=0;class Nr{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(M){const D=M.vertexShader,t=M.fragmentShader,e=this._getShaderStage(D),i=this._getShaderStage(t),z=this._getShaderCacheForMaterial(M);return z.has(e)===!1&&(z.add(e),e.usedTimes++),z.has(i)===!1&&(z.add(i),i.usedTimes++),this}remove(M){const D=this.materialCache.get(M);for(const t of D)t.usedTimes--,t.usedTimes===0&&this.shaderCache.delete(t.code);return this.materialCache.delete(M),this}getVertexShaderID(M){return this._getShaderStage(M.vertexShader).id}getFragmentShaderID(M){return this._getShaderStage(M.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(M){const D=this.materialCache;let t=D.get(M);return t===void 0&&(t=new Set,D.set(M,t)),t}_getShaderStage(M){const D=this.shaderCache;let t=D.get(M);return t===void 0&&(t=new ir(M),D.set(M,t)),t}}class ir{constructor(M){this.id=er++,this.code=M,this.usedTimes=0}}function Ar(N,M,D,t,e,i,z){const A=new Hz,I=new Nr,n=[],T=e.isWebGL2,u=e.logarithmicDepthBuffer,g=e.vertexTextures;let s=e.precision;const j={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function r(L,l,p,B,G){const Q=B.fog,m=G.geometry,Z=L.isMeshStandardMaterial?B.environment:null,H=(L.isMeshStandardMaterial?D:M).get(L.envMap||Z),$=H&&H.mapping===PN?H.image.height:null,F=j[L.type];L.precision!==null&&(s=e.getMaxPrecision(L.precision),s!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",s,"instead."));const J=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,W=J!==void 0?J.length:0;let TM=0;m.morphAttributes.position!==void 0&&(TM=1),m.morphAttributes.normal!==void 0&&(TM=2),m.morphAttributes.color!==void 0&&(TM=3);let S,X,eM,NM;if(F){const kM=Dt[F];S=kM.vertexShader,X=kM.fragmentShader}else S=L.vertexShader,X=L.fragmentShader,I.update(L),eM=I.getVertexShaderID(L),NM=I.getFragmentShaderID(L);const v=N.getRenderTarget(),xM=L.alphaTest>0,sM=L.clearcoat>0,rM=L.iridescence>0;return{isWebGL2:T,shaderID:F,shaderName:L.type,vertexShader:S,fragmentShader:X,defines:L.defines,customVertexShaderID:eM,customFragmentShaderID:NM,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:s,instancing:G.isInstancedMesh===!0,instancingColor:G.isInstancedMesh===!0&&G.instanceColor!==null,supportsVertexTextures:g,outputEncoding:v===null?N.outputEncoding:v.isXRRenderTarget===!0?v.texture.encoding:bt,map:!!L.map,matcap:!!L.matcap,envMap:!!H,envMapMode:H&&H.mapping,envMapCubeUVHeight:$,lightMap:!!L.lightMap,aoMap:!!L.aoMap,emissiveMap:!!L.emissiveMap,bumpMap:!!L.bumpMap,normalMap:!!L.normalMap,objectSpaceNormalMap:L.normalMapType===Ag,tangentSpaceNormalMap:L.normalMapType===Sn,decodeVideoTexture:!!L.map&&L.map.isVideoTexture===!0&&L.map.encoding===SM,clearcoat:sM,clearcoatMap:sM&&!!L.clearcoatMap,clearcoatRoughnessMap:sM&&!!L.clearcoatRoughnessMap,clearcoatNormalMap:sM&&!!L.clearcoatNormalMap,iridescence:rM,iridescenceMap:rM&&!!L.iridescenceMap,iridescenceThicknessMap:rM&&!!L.iridescenceThicknessMap,displacementMap:!!L.displacementMap,roughnessMap:!!L.roughnessMap,metalnessMap:!!L.metalnessMap,specularMap:!!L.specularMap,specularIntensityMap:!!L.specularIntensityMap,specularColorMap:!!L.specularColorMap,opaque:L.transparent===!1&&L.blending===ge,alphaMap:!!L.alphaMap,alphaTest:xM,gradientMap:!!L.gradientMap,sheen:L.sheen>0,sheenColorMap:!!L.sheenColorMap,sheenRoughnessMap:!!L.sheenRoughnessMap,transmission:L.transmission>0,transmissionMap:!!L.transmissionMap,thicknessMap:!!L.thicknessMap,combine:L.combine,vertexTangents:!!L.normalMap&&!!m.attributes.tangent,vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!m.attributes.color&&m.attributes.color.itemSize===4,vertexUvs:!!L.map||!!L.bumpMap||!!L.normalMap||!!L.specularMap||!!L.alphaMap||!!L.emissiveMap||!!L.roughnessMap||!!L.metalnessMap||!!L.clearcoatMap||!!L.clearcoatRoughnessMap||!!L.clearcoatNormalMap||!!L.iridescenceMap||!!L.iridescenceThicknessMap||!!L.displacementMap||!!L.transmissionMap||!!L.thicknessMap||!!L.specularIntensityMap||!!L.specularColorMap||!!L.sheenColorMap||!!L.sheenRoughnessMap,uvsVertexOnly:!(L.map||L.bumpMap||L.normalMap||L.specularMap||L.alphaMap||L.emissiveMap||L.roughnessMap||L.metalnessMap||L.clearcoatNormalMap||L.iridescenceMap||L.iridescenceThicknessMap||L.transmission>0||L.transmissionMap||L.thicknessMap||L.specularIntensityMap||L.specularColorMap||L.sheen>0||L.sheenColorMap||L.sheenRoughnessMap)&&!!L.displacementMap,fog:!!Q,useFog:L.fog===!0,fogExp2:Q&&Q.isFogExp2,flatShading:!!L.flatShading,sizeAttenuation:L.sizeAttenuation,logarithmicDepthBuffer:u,skinning:G.isSkinnedMesh===!0,morphTargets:m.morphAttributes.position!==void 0,morphNormals:m.morphAttributes.normal!==void 0,morphColors:m.morphAttributes.color!==void 0,morphTargetsCount:W,morphTextureStride:TM,numDirLights:l.directional.length,numPointLights:l.point.length,numSpotLights:l.spot.length,numSpotLightMaps:l.spotLightMap.length,numRectAreaLights:l.rectArea.length,numHemiLights:l.hemi.length,numDirLightShadows:l.directionalShadowMap.length,numPointLightShadows:l.pointShadowMap.length,numSpotLightShadows:l.spotShadowMap.length,numSpotLightShadowsWithMaps:l.numSpotLightShadowsWithMaps,numClippingPlanes:z.numPlanes,numClipIntersection:z.numIntersection,dithering:L.dithering,shadowMapEnabled:N.shadowMap.enabled&&p.length>0,shadowMapType:N.shadowMap.type,toneMapping:L.toneMapped?N.toneMapping:it,physicallyCorrectLights:N.physicallyCorrectLights,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===Et,flipSided:L.side===wD,useDepthPacking:!!L.depthPacking,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionDerivatives:L.extensions&&L.extensions.derivatives,extensionFragDepth:L.extensions&&L.extensions.fragDepth,extensionDrawBuffers:L.extensions&&L.extensions.drawBuffers,extensionShaderTextureLOD:L.extensions&&L.extensions.shaderTextureLOD,rendererExtensionFragDepth:T||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:T||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:T||t.has("EXT_shader_texture_lod"),customProgramCacheKey:L.customProgramCacheKey()}}function c(L){const l=[];if(L.shaderID?l.push(L.shaderID):(l.push(L.customVertexShaderID),l.push(L.customFragmentShaderID)),L.defines!==void 0)for(const p in L.defines)l.push(p),l.push(L.defines[p]);return L.isRawShaderMaterial===!1&&(y(l,L),w(l,L),l.push(N.outputEncoding)),l.push(L.customProgramCacheKey),l.join()}function y(L,l){L.push(l.precision),L.push(l.outputEncoding),L.push(l.envMapMode),L.push(l.envMapCubeUVHeight),L.push(l.combine),L.push(l.vertexUvs),L.push(l.fogExp2),L.push(l.sizeAttenuation),L.push(l.morphTargetsCount),L.push(l.morphAttributeCount),L.push(l.numDirLights),L.push(l.numPointLights),L.push(l.numSpotLights),L.push(l.numSpotLightMaps),L.push(l.numHemiLights),L.push(l.numRectAreaLights),L.push(l.numDirLightShadows),L.push(l.numPointLightShadows),L.push(l.numSpotLightShadows),L.push(l.numSpotLightShadowsWithMaps),L.push(l.shadowMapType),L.push(l.toneMapping),L.push(l.numClippingPlanes),L.push(l.numClipIntersection),L.push(l.depthPacking)}function w(L,l){A.disableAll(),l.isWebGL2&&A.enable(0),l.supportsVertexTextures&&A.enable(1),l.instancing&&A.enable(2),l.instancingColor&&A.enable(3),l.map&&A.enable(4),l.matcap&&A.enable(5),l.envMap&&A.enable(6),l.lightMap&&A.enable(7),l.aoMap&&A.enable(8),l.emissiveMap&&A.enable(9),l.bumpMap&&A.enable(10),l.normalMap&&A.enable(11),l.objectSpaceNormalMap&&A.enable(12),l.tangentSpaceNormalMap&&A.enable(13),l.clearcoat&&A.enable(14),l.clearcoatMap&&A.enable(15),l.clearcoatRoughnessMap&&A.enable(16),l.clearcoatNormalMap&&A.enable(17),l.iridescence&&A.enable(18),l.iridescenceMap&&A.enable(19),l.iridescenceThicknessMap&&A.enable(20),l.displacementMap&&A.enable(21),l.specularMap&&A.enable(22),l.roughnessMap&&A.enable(23),l.metalnessMap&&A.enable(24),l.gradientMap&&A.enable(25),l.alphaMap&&A.enable(26),l.alphaTest&&A.enable(27),l.vertexColors&&A.enable(28),l.vertexAlphas&&A.enable(29),l.vertexUvs&&A.enable(30),l.vertexTangents&&A.enable(31),l.uvsVertexOnly&&A.enable(32),L.push(A.mask),A.disableAll(),l.fog&&A.enable(0),l.useFog&&A.enable(1),l.flatShading&&A.enable(2),l.logarithmicDepthBuffer&&A.enable(3),l.skinning&&A.enable(4),l.morphTargets&&A.enable(5),l.morphNormals&&A.enable(6),l.morphColors&&A.enable(7),l.premultipliedAlpha&&A.enable(8),l.shadowMapEnabled&&A.enable(9),l.physicallyCorrectLights&&A.enable(10),l.doubleSided&&A.enable(11),l.flipSided&&A.enable(12),l.useDepthPacking&&A.enable(13),l.dithering&&A.enable(14),l.specularIntensityMap&&A.enable(15),l.specularColorMap&&A.enable(16),l.transmission&&A.enable(17),l.transmissionMap&&A.enable(18),l.thicknessMap&&A.enable(19),l.sheen&&A.enable(20),l.sheenColorMap&&A.enable(21),l.sheenRoughnessMap&&A.enable(22),l.decodeVideoTexture&&A.enable(23),l.opaque&&A.enable(24),L.push(A.mask)}function a(L){const l=j[L.type];let p;if(l){const B=Dt[l];p=lg.clone(B.uniforms)}else p=L.uniforms;return p}function o(L,l){let p;for(let B=0,G=n.length;B<G;B++){const Q=n[B];if(Q.cacheKey===l){p=Q,++p.usedTimes;break}}return p===void 0&&(p=new tr(N,l,L,i),n.push(p)),p}function O(L){if(--L.usedTimes===0){const l=n.indexOf(L);n[l]=n[n.length-1],n.pop(),L.destroy()}}function h(L){I.remove(L)}function d(){I.dispose()}return{getParameters:r,getProgramCacheKey:c,getUniforms:a,acquireProgram:o,releaseProgram:O,releaseShaderCache:h,programs:n,dispose:d}}function zr(){let N=new WeakMap;function M(i){let z=N.get(i);return z===void 0&&(z={},N.set(i,z)),z}function D(i){N.delete(i)}function t(i,z,A){N.get(i)[z]=A}function e(){N=new WeakMap}return{get:M,remove:D,update:t,dispose:e}}function nr(N,M){return N.groupOrder!==M.groupOrder?N.groupOrder-M.groupOrder:N.renderOrder!==M.renderOrder?N.renderOrder-M.renderOrder:N.material.id!==M.material.id?N.material.id-M.material.id:N.z!==M.z?N.z-M.z:N.id-M.id}function dI(N,M){return N.groupOrder!==M.groupOrder?N.groupOrder-M.groupOrder:N.renderOrder!==M.renderOrder?N.renderOrder-M.renderOrder:N.z!==M.z?M.z-N.z:N.id-M.id}function vI(){const N=[];let M=0;const D=[],t=[],e=[];function i(){M=0,D.length=0,t.length=0,e.length=0}function z(u,g,s,j,r,c){let y=N[M];return y===void 0?(y={id:u.id,object:u,geometry:g,material:s,groupOrder:j,renderOrder:u.renderOrder,z:r,group:c},N[M]=y):(y.id=u.id,y.object=u,y.geometry=g,y.material=s,y.groupOrder=j,y.renderOrder=u.renderOrder,y.z=r,y.group=c),M++,y}function A(u,g,s,j,r,c){const y=z(u,g,s,j,r,c);s.transmission>0?t.push(y):s.transparent===!0?e.push(y):D.push(y)}function I(u,g,s,j,r,c){const y=z(u,g,s,j,r,c);s.transmission>0?t.unshift(y):s.transparent===!0?e.unshift(y):D.unshift(y)}function n(u,g){D.length>1&&D.sort(u||nr),t.length>1&&t.sort(g||dI),e.length>1&&e.sort(g||dI)}function T(){for(let u=M,g=N.length;u<g;u++){const s=N[u];if(s.id===null)break;s.id=null,s.object=null,s.geometry=null,s.material=null,s.group=null}}return{opaque:D,transmissive:t,transparent:e,init:i,push:A,unshift:I,finish:T,sort:n}}function Ir(){let N=new WeakMap;function M(t,e){const i=N.get(t);let z;return i===void 0?(z=new vI,N.set(t,[z])):e>=i.length?(z=new vI,i.push(z)):z=i[e],z}function D(){N=new WeakMap}return{get:M,dispose:D}}function Tr(){const N={};return{get:function(M){if(N[M.id]!==void 0)return N[M.id];let D;switch(M.type){case"DirectionalLight":D={direction:new U,color:new QM};break;case"SpotLight":D={position:new U,direction:new U,color:new QM,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":D={position:new U,color:new QM,distance:0,decay:0};break;case"HemisphereLight":D={direction:new U,skyColor:new QM,groundColor:new QM};break;case"RectAreaLight":D={color:new QM,position:new U,halfWidth:new U,halfHeight:new U};break}return N[M.id]=D,D}}}function ur(){const N={};return{get:function(M){if(N[M.id]!==void 0)return N[M.id];let D;switch(M.type){case"DirectionalLight":D={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gM};break;case"SpotLight":D={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gM};break;case"PointLight":D={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gM,shadowCameraNear:1,shadowCameraFar:1e3};break}return N[M.id]=D,D}}}let gr=0;function sr(N,M){return(M.castShadow?2:0)-(N.castShadow?2:0)+(M.map?1:0)-(N.map?1:0)}function rr(N,M){const D=new Tr,t=ur(),e={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let T=0;T<9;T++)e.probe.push(new U);const i=new U,z=new eD,A=new eD;function I(T,u){let g=0,s=0,j=0;for(let B=0;B<9;B++)e.probe[B].set(0,0,0);let r=0,c=0,y=0,w=0,a=0,o=0,O=0,h=0,d=0,L=0;T.sort(sr);const l=u!==!0?Math.PI:1;for(let B=0,G=T.length;B<G;B++){const Q=T[B],m=Q.color,Z=Q.intensity,H=Q.distance,$=Q.shadow&&Q.shadow.map?Q.shadow.map.texture:null;if(Q.isAmbientLight)g+=m.r*Z*l,s+=m.g*Z*l,j+=m.b*Z*l;else if(Q.isLightProbe)for(let F=0;F<9;F++)e.probe[F].addScaledVector(Q.sh.coefficients[F],Z);else if(Q.isDirectionalLight){const F=D.get(Q);if(F.color.copy(Q.color).multiplyScalar(Q.intensity*l),Q.castShadow){const J=Q.shadow,W=t.get(Q);W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,e.directionalShadow[r]=W,e.directionalShadowMap[r]=$,e.directionalShadowMatrix[r]=Q.shadow.matrix,o++}e.directional[r]=F,r++}else if(Q.isSpotLight){const F=D.get(Q);F.position.setFromMatrixPosition(Q.matrixWorld),F.color.copy(m).multiplyScalar(Z*l),F.distance=H,F.coneCos=Math.cos(Q.angle),F.penumbraCos=Math.cos(Q.angle*(1-Q.penumbra)),F.decay=Q.decay,e.spot[y]=F;const J=Q.shadow;if(Q.map&&(e.spotLightMap[d]=Q.map,d++,J.updateMatrices(Q),Q.castShadow&&L++),e.spotLightMatrix[y]=J.matrix,Q.castShadow){const W=t.get(Q);W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,e.spotShadow[y]=W,e.spotShadowMap[y]=$,h++}y++}else if(Q.isRectAreaLight){const F=D.get(Q);F.color.copy(m).multiplyScalar(Z),F.halfWidth.set(Q.width*.5,0,0),F.halfHeight.set(0,Q.height*.5,0),e.rectArea[w]=F,w++}else if(Q.isPointLight){const F=D.get(Q);if(F.color.copy(Q.color).multiplyScalar(Q.intensity*l),F.distance=Q.distance,F.decay=Q.decay,Q.castShadow){const J=Q.shadow,W=t.get(Q);W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,W.shadowCameraNear=J.camera.near,W.shadowCameraFar=J.camera.far,e.pointShadow[c]=W,e.pointShadowMap[c]=$,e.pointShadowMatrix[c]=Q.shadow.matrix,O++}e.point[c]=F,c++}else if(Q.isHemisphereLight){const F=D.get(Q);F.skyColor.copy(Q.color).multiplyScalar(Z*l),F.groundColor.copy(Q.groundColor).multiplyScalar(Z*l),e.hemi[a]=F,a++}}w>0&&(M.isWebGL2||N.has("OES_texture_float_linear")===!0?(e.rectAreaLTC1=tM.LTC_FLOAT_1,e.rectAreaLTC2=tM.LTC_FLOAT_2):N.has("OES_texture_half_float_linear")===!0?(e.rectAreaLTC1=tM.LTC_HALF_1,e.rectAreaLTC2=tM.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),e.ambient[0]=g,e.ambient[1]=s,e.ambient[2]=j;const p=e.hash;(p.directionalLength!==r||p.pointLength!==c||p.spotLength!==y||p.rectAreaLength!==w||p.hemiLength!==a||p.numDirectionalShadows!==o||p.numPointShadows!==O||p.numSpotShadows!==h||p.numSpotMaps!==d)&&(e.directional.length=r,e.spot.length=y,e.rectArea.length=w,e.point.length=c,e.hemi.length=a,e.directionalShadow.length=o,e.directionalShadowMap.length=o,e.pointShadow.length=O,e.pointShadowMap.length=O,e.spotShadow.length=h,e.spotShadowMap.length=h,e.directionalShadowMatrix.length=o,e.pointShadowMatrix.length=O,e.spotLightMatrix.length=h+d-L,e.spotLightMap.length=d,e.numSpotLightShadowsWithMaps=L,p.directionalLength=r,p.pointLength=c,p.spotLength=y,p.rectAreaLength=w,p.hemiLength=a,p.numDirectionalShadows=o,p.numPointShadows=O,p.numSpotShadows=h,p.numSpotMaps=d,e.version=gr++)}function n(T,u){let g=0,s=0,j=0,r=0,c=0;const y=u.matrixWorldInverse;for(let w=0,a=T.length;w<a;w++){const o=T[w];if(o.isDirectionalLight){const O=e.directional[g];O.direction.setFromMatrixPosition(o.matrixWorld),i.setFromMatrixPosition(o.target.matrixWorld),O.direction.sub(i),O.direction.transformDirection(y),g++}else if(o.isSpotLight){const O=e.spot[j];O.position.setFromMatrixPosition(o.matrixWorld),O.position.applyMatrix4(y),O.direction.setFromMatrixPosition(o.matrixWorld),i.setFromMatrixPosition(o.target.matrixWorld),O.direction.sub(i),O.direction.transformDirection(y),j++}else if(o.isRectAreaLight){const O=e.rectArea[r];O.position.setFromMatrixPosition(o.matrixWorld),O.position.applyMatrix4(y),A.identity(),z.copy(o.matrixWorld),z.premultiply(y),A.extractRotation(z),O.halfWidth.set(o.width*.5,0,0),O.halfHeight.set(0,o.height*.5,0),O.halfWidth.applyMatrix4(A),O.halfHeight.applyMatrix4(A),r++}else if(o.isPointLight){const O=e.point[s];O.position.setFromMatrixPosition(o.matrixWorld),O.position.applyMatrix4(y),s++}else if(o.isHemisphereLight){const O=e.hemi[c];O.direction.setFromMatrixPosition(o.matrixWorld),O.direction.transformDirection(y),c++}}}return{setup:I,setupView:n,state:e}}function YI(N,M){const D=new rr(N,M),t=[],e=[];function i(){t.length=0,e.length=0}function z(u){t.push(u)}function A(u){e.push(u)}function I(u){D.setup(t,u)}function n(u){D.setupView(t,u)}return{init:i,state:{lightsArray:t,shadowsArray:e,lights:D},setupLights:I,setupLightsView:n,pushLight:z,pushShadow:A}}function cr(N,M){let D=new WeakMap;function t(i,z=0){const A=D.get(i);let I;return A===void 0?(I=new YI(N,M),D.set(i,[I])):z>=A.length?(I=new YI(N,M),A.push(I)):I=A[z],I}function e(){D=new WeakMap}return{get:t,dispose:e}}class jr extends zN{constructor(M){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ng,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(M)}copy(M){return super.copy(M),this.depthPacking=M.depthPacking,this.map=M.map,this.alphaMap=M.alphaMap,this.displacementMap=M.displacementMap,this.displacementScale=M.displacementScale,this.displacementBias=M.displacementBias,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this}}class yr extends zN{constructor(M){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new U,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(M)}copy(M){return super.copy(M),this.referencePosition.copy(M.referencePosition),this.nearDistance=M.nearDistance,this.farDistance=M.farDistance,this.map=M.map,this.alphaMap=M.alphaMap,this.displacementMap=M.displacementMap,this.displacementScale=M.displacementScale,this.displacementBias=M.displacementBias,this}}const ar=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,or=`
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
`;function Cr(N,M,D){let t=new yA;const e=new gM,i=new gM,z=new qM,A=new jr({depthPacking:ig}),I=new yr,n={},T=D.maxTextureSize,u={[Ot]:wD,[wD]:Ot,[Et]:Et},g=new Gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gM},radius:{value:4}},vertexShader:ar,fragmentShader:or}),s=g.clone();s.defines.HORIZONTAL_PASS=1;const j=new he;j.setAttribute("position",new $D(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const r=new Mt(j,g),c=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tn,this.render=function(o,O,h){if(c.enabled===!1||c.autoUpdate===!1&&c.needsUpdate===!1||o.length===0)return;const d=N.getRenderTarget(),L=N.getActiveCubeFace(),l=N.getActiveMipmapLevel(),p=N.state;p.setBlending(lt),p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);for(let B=0,G=o.length;B<G;B++){const Q=o[B],m=Q.shadow;if(m===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(m.autoUpdate===!1&&m.needsUpdate===!1)continue;e.copy(m.mapSize);const Z=m.getFrameExtents();if(e.multiply(Z),i.copy(m.mapSize),(e.x>T||e.y>T)&&(e.x>T&&(i.x=Math.floor(T/Z.x),e.x=i.x*Z.x,m.mapSize.x=i.x),e.y>T&&(i.y=Math.floor(T/Z.y),e.y=i.y*Z.y,m.mapSize.y=i.y)),m.map===null){const $=this.type!==MN?{minFilter:TD,magFilter:TD}:{};m.map=new Vt(e.x,e.y,$),m.map.texture.name=Q.name+".shadowMap",m.camera.updateProjectionMatrix()}N.setRenderTarget(m.map),N.clear();const H=m.getViewportCount();for(let $=0;$<H;$++){const F=m.getViewport($);z.set(i.x*F.x,i.y*F.y,i.x*F.z,i.y*F.w),p.viewport(z),m.updateMatrices(Q,$),t=m.getFrustum(),a(O,h,m.camera,Q,this.type)}m.isPointLightShadow!==!0&&this.type===MN&&y(m,h),m.needsUpdate=!1}c.needsUpdate=!1,N.setRenderTarget(d,L,l)};function y(o,O){const h=M.update(r);g.defines.VSM_SAMPLES!==o.blurSamples&&(g.defines.VSM_SAMPLES=o.blurSamples,s.defines.VSM_SAMPLES=o.blurSamples,g.needsUpdate=!0,s.needsUpdate=!0),o.mapPass===null&&(o.mapPass=new Vt(e.x,e.y)),g.uniforms.shadow_pass.value=o.map.texture,g.uniforms.resolution.value=o.mapSize,g.uniforms.radius.value=o.radius,N.setRenderTarget(o.mapPass),N.clear(),N.renderBufferDirect(O,null,h,g,r,null),s.uniforms.shadow_pass.value=o.mapPass.texture,s.uniforms.resolution.value=o.mapSize,s.uniforms.radius.value=o.radius,N.setRenderTarget(o.map),N.clear(),N.renderBufferDirect(O,null,h,s,r,null)}function w(o,O,h,d,L,l){let p=null;const B=h.isPointLight===!0?o.customDistanceMaterial:o.customDepthMaterial;if(B!==void 0)p=B;else if(p=h.isPointLight===!0?I:A,N.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const G=p.uuid,Q=O.uuid;let m=n[G];m===void 0&&(m={},n[G]=m);let Z=m[Q];Z===void 0&&(Z=p.clone(),m[Q]=Z),p=Z}return p.visible=O.visible,p.wireframe=O.wireframe,l===MN?p.side=O.shadowSide!==null?O.shadowSide:O.side:p.side=O.shadowSide!==null?O.shadowSide:u[O.side],p.alphaMap=O.alphaMap,p.alphaTest=O.alphaTest,p.map=O.map,p.clipShadows=O.clipShadows,p.clippingPlanes=O.clippingPlanes,p.clipIntersection=O.clipIntersection,p.displacementMap=O.displacementMap,p.displacementScale=O.displacementScale,p.displacementBias=O.displacementBias,p.wireframeLinewidth=O.wireframeLinewidth,p.linewidth=O.linewidth,h.isPointLight===!0&&p.isMeshDistanceMaterial===!0&&(p.referencePosition.setFromMatrixPosition(h.matrixWorld),p.nearDistance=d,p.farDistance=L),p}function a(o,O,h,d,L){if(o.visible===!1)return;if(o.layers.test(O.layers)&&(o.isMesh||o.isLine||o.isPoints)&&(o.castShadow||o.receiveShadow&&L===MN)&&(!o.frustumCulled||t.intersectsObject(o))){o.modelViewMatrix.multiplyMatrices(h.matrixWorldInverse,o.matrixWorld);const B=M.update(o),G=o.material;if(Array.isArray(G)){const Q=B.groups;for(let m=0,Z=Q.length;m<Z;m++){const H=Q[m],$=G[H.materialIndex];if($&&$.visible){const F=w(o,$,d,h.near,h.far,L);N.renderBufferDirect(h,null,B,F,o,H)}}}else if(G.visible){const Q=w(o,G,d,h.near,h.far,L);N.renderBufferDirect(h,null,B,Q,o,null)}}const p=o.children;for(let B=0,G=p.length;B<G;B++)a(p[B],O,h,d,L)}}function Lr(N,M,D){const t=D.isWebGL2;function e(){let Y=!1;const _=new qM;let q=null;const zM=new qM(0,0,0,0);return{setMask:function(uM){q!==uM&&!Y&&(N.colorMask(uM,uM,uM,uM),q=uM)},setLocked:function(uM){Y=uM},setClear:function(uM,fM,DD,nD,ee){ee===!0&&(uM*=nD,fM*=nD,DD*=nD),_.set(uM,fM,DD,nD),zM.equals(_)===!1&&(N.clearColor(uM,fM,DD,nD),zM.copy(_))},reset:function(){Y=!1,q=null,zM.set(-1,0,0,0)}}}function i(){let Y=!1,_=null,q=null,zM=null;return{setTest:function(uM){uM?xM(N.DEPTH_TEST):sM(N.DEPTH_TEST)},setMask:function(uM){_!==uM&&!Y&&(N.depthMask(uM),_=uM)},setFunc:function(uM){if(q!==uM){switch(uM){case du:N.depthFunc(N.NEVER);break;case vu:N.depthFunc(N.ALWAYS);break;case Yu:N.depthFunc(N.LESS);break;case Xi:N.depthFunc(N.LEQUAL);break;case pu:N.depthFunc(N.EQUAL);break;case Uu:N.depthFunc(N.GEQUAL);break;case fu:N.depthFunc(N.GREATER);break;case mu:N.depthFunc(N.NOTEQUAL);break;default:N.depthFunc(N.LEQUAL)}q=uM}},setLocked:function(uM){Y=uM},setClear:function(uM){zM!==uM&&(N.clearDepth(uM),zM=uM)},reset:function(){Y=!1,_=null,q=null,zM=null}}}function z(){let Y=!1,_=null,q=null,zM=null,uM=null,fM=null,DD=null,nD=null,ee=null;return{setTest:function(_M){Y||(_M?xM(N.STENCIL_TEST):sM(N.STENCIL_TEST))},setMask:function(_M){_!==_M&&!Y&&(N.stencilMask(_M),_=_M)},setFunc:function(_M,Ct,_D){(q!==_M||zM!==Ct||uM!==_D)&&(N.stencilFunc(_M,Ct,_D),q=_M,zM=Ct,uM=_D)},setOp:function(_M,Ct,_D){(fM!==_M||DD!==Ct||nD!==_D)&&(N.stencilOp(_M,Ct,_D),fM=_M,DD=Ct,nD=_D)},setLocked:function(_M){Y=_M},setClear:function(_M){ee!==_M&&(N.clearStencil(_M),ee=_M)},reset:function(){Y=!1,_=null,q=null,zM=null,uM=null,fM=null,DD=null,nD=null,ee=null}}}const A=new e,I=new i,n=new z,T=new WeakMap,u=new WeakMap;let g={},s={},j=new WeakMap,r=[],c=null,y=!1,w=null,a=null,o=null,O=null,h=null,d=null,L=null,l=!1,p=null,B=null,G=null,Q=null,m=null;const Z=N.getParameter(N.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,$=0;const F=N.getParameter(N.VERSION);F.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(F)[1]),H=$>=1):F.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),H=$>=2);let J=null,W={};const TM=N.getParameter(N.SCISSOR_BOX),S=N.getParameter(N.VIEWPORT),X=new qM().fromArray(TM),eM=new qM().fromArray(S);function NM(Y,_,q){const zM=new Uint8Array(4),uM=N.createTexture();N.bindTexture(Y,uM),N.texParameteri(Y,N.TEXTURE_MIN_FILTER,N.NEAREST),N.texParameteri(Y,N.TEXTURE_MAG_FILTER,N.NEAREST);for(let fM=0;fM<q;fM++)N.texImage2D(_+fM,0,N.RGBA,1,1,0,N.RGBA,N.UNSIGNED_BYTE,zM);return uM}const v={};v[N.TEXTURE_2D]=NM(N.TEXTURE_2D,N.TEXTURE_2D,1),v[N.TEXTURE_CUBE_MAP]=NM(N.TEXTURE_CUBE_MAP,N.TEXTURE_CUBE_MAP_POSITIVE_X,6),A.setClear(0,0,0,1),I.setClear(1),n.setClear(0),xM(N.DEPTH_TEST),I.setFunc(Xi),zD(!1),ZD(Dn),xM(N.CULL_FACE),cD(lt);function xM(Y){g[Y]!==!0&&(N.enable(Y),g[Y]=!0)}function sM(Y){g[Y]!==!1&&(N.disable(Y),g[Y]=!1)}function rM(Y,_){return s[Y]!==_?(N.bindFramebuffer(Y,_),s[Y]=_,t&&(Y===N.DRAW_FRAMEBUFFER&&(s[N.FRAMEBUFFER]=_),Y===N.FRAMEBUFFER&&(s[N.DRAW_FRAMEBUFFER]=_)),!0):!1}function nM(Y,_){let q=r,zM=!1;if(Y)if(q=j.get(_),q===void 0&&(q=[],j.set(_,q)),Y.isWebGLMultipleRenderTargets){const uM=Y.texture;if(q.length!==uM.length||q[0]!==N.COLOR_ATTACHMENT0){for(let fM=0,DD=uM.length;fM<DD;fM++)q[fM]=N.COLOR_ATTACHMENT0+fM;q.length=uM.length,zM=!0}}else q[0]!==N.COLOR_ATTACHMENT0&&(q[0]=N.COLOR_ATTACHMENT0,zM=!0);else q[0]!==N.BACK&&(q[0]=N.BACK,zM=!0);zM&&(D.isWebGL2?N.drawBuffers(q):M.get("WEBGL_draw_buffers").drawBuffersWEBGL(q))}function kM(Y){return c!==Y?(N.useProgram(Y),c=Y,!0):!1}const EM={[se]:N.FUNC_ADD,[yu]:N.FUNC_SUBTRACT,[au]:N.FUNC_REVERSE_SUBTRACT};if(t)EM[zn]=N.MIN,EM[nn]=N.MAX;else{const Y=M.get("EXT_blend_minmax");Y!==null&&(EM[zn]=Y.MIN_EXT,EM[nn]=Y.MAX_EXT)}const CM={[ou]:N.ZERO,[Cu]:N.ONE,[Lu]:N.SRC_COLOR,[In]:N.SRC_ALPHA,[hu]:N.SRC_ALPHA_SATURATE,[Eu]:N.DST_COLOR,[xu]:N.DST_ALPHA,[wu]:N.ONE_MINUS_SRC_COLOR,[Tn]:N.ONE_MINUS_SRC_ALPHA,[lu]:N.ONE_MINUS_DST_COLOR,[Ou]:N.ONE_MINUS_DST_ALPHA};function cD(Y,_,q,zM,uM,fM,DD,nD){if(Y===lt){y===!0&&(sM(N.BLEND),y=!1);return}if(y===!1&&(xM(N.BLEND),y=!0),Y!==ju){if(Y!==w||nD!==l){if((a!==se||h!==se)&&(N.blendEquation(N.FUNC_ADD),a=se,h=se),nD)switch(Y){case ge:N.blendFuncSeparate(N.ONE,N.ONE_MINUS_SRC_ALPHA,N.ONE,N.ONE_MINUS_SRC_ALPHA);break;case en:N.blendFunc(N.ONE,N.ONE);break;case Nn:N.blendFuncSeparate(N.ZERO,N.ONE_MINUS_SRC_COLOR,N.ZERO,N.ONE);break;case An:N.blendFuncSeparate(N.ZERO,N.SRC_COLOR,N.ZERO,N.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}else switch(Y){case ge:N.blendFuncSeparate(N.SRC_ALPHA,N.ONE_MINUS_SRC_ALPHA,N.ONE,N.ONE_MINUS_SRC_ALPHA);break;case en:N.blendFunc(N.SRC_ALPHA,N.ONE);break;case Nn:N.blendFuncSeparate(N.ZERO,N.ONE_MINUS_SRC_COLOR,N.ZERO,N.ONE);break;case An:N.blendFunc(N.ZERO,N.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}o=null,O=null,d=null,L=null,w=Y,l=nD}return}uM=uM||_,fM=fM||q,DD=DD||zM,(_!==a||uM!==h)&&(N.blendEquationSeparate(EM[_],EM[uM]),a=_,h=uM),(q!==o||zM!==O||fM!==d||DD!==L)&&(N.blendFuncSeparate(CM[q],CM[zM],CM[fM],CM[DD]),o=q,O=zM,d=fM,L=DD),w=Y,l=!1}function SD(Y,_){Y.side===Et?sM(N.CULL_FACE):xM(N.CULL_FACE);let q=Y.side===wD;_&&(q=!q),zD(q),Y.blending===ge&&Y.transparent===!1?cD(lt):cD(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.premultipliedAlpha),I.setFunc(Y.depthFunc),I.setTest(Y.depthTest),I.setMask(Y.depthWrite),A.setMask(Y.colorWrite);const zM=Y.stencilWrite;n.setTest(zM),zM&&(n.setMask(Y.stencilWriteMask),n.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),n.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),mM(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?xM(N.SAMPLE_ALPHA_TO_COVERAGE):sM(N.SAMPLE_ALPHA_TO_COVERAGE)}function zD(Y){p!==Y&&(Y?N.frontFace(N.CW):N.frontFace(N.CCW),p=Y)}function ZD(Y){Y!==su?(xM(N.CULL_FACE),Y!==B&&(Y===Dn?N.cullFace(N.BACK):Y===ru?N.cullFace(N.FRONT):N.cullFace(N.FRONT_AND_BACK))):sM(N.CULL_FACE),B=Y}function XM(Y){Y!==G&&(H&&N.lineWidth(Y),G=Y)}function mM(Y,_,q){Y?(xM(N.POLYGON_OFFSET_FILL),(Q!==_||m!==q)&&(N.polygonOffset(_,q),Q=_,m=q)):sM(N.POLYGON_OFFSET_FILL)}function ot(Y){Y?xM(N.SCISSOR_TEST):sM(N.SCISSOR_TEST)}function XD(Y){Y===void 0&&(Y=N.TEXTURE0+Z-1),J!==Y&&(N.activeTexture(Y),J=Y)}function E(Y,_,q){q===void 0&&(J===null?q=N.TEXTURE0+Z-1:q=J);let zM=W[q];zM===void 0&&(zM={type:void 0,texture:void 0},W[q]=zM),(zM.type!==Y||zM.texture!==_)&&(J!==q&&(N.activeTexture(q),J=q),N.bindTexture(Y,_||v[Y]),zM.type=Y,zM.texture=_)}function C(){const Y=W[J];Y!==void 0&&Y.type!==void 0&&(N.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function K(){try{N.compressedTexImage2D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function MM(){try{N.compressedTexImage3D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function DM(){try{N.texSubImage2D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function iM(){try{N.texSubImage3D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function LM(){try{N.compressedTexSubImage2D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function AM(){try{N.compressedTexSubImage3D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function V(){try{N.texStorage2D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function yM(){try{N.texStorage3D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function oM(){try{N.texImage2D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function IM(){try{N.texImage3D.apply(N,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function aM(Y){X.equals(Y)===!1&&(N.scissor(Y.x,Y.y,Y.z,Y.w),X.copy(Y))}function cM(Y){eM.equals(Y)===!1&&(N.viewport(Y.x,Y.y,Y.z,Y.w),eM.copy(Y))}function pM(Y,_){let q=u.get(_);q===void 0&&(q=new WeakMap,u.set(_,q));let zM=q.get(Y);zM===void 0&&(zM=N.getUniformBlockIndex(_,Y.name),q.set(Y,zM))}function ZM(Y,_){const zM=u.get(_).get(Y);T.get(_)!==zM&&(N.uniformBlockBinding(_,zM,Y.__bindingPointIndex),T.set(_,zM))}function MD(){N.disable(N.BLEND),N.disable(N.CULL_FACE),N.disable(N.DEPTH_TEST),N.disable(N.POLYGON_OFFSET_FILL),N.disable(N.SCISSOR_TEST),N.disable(N.STENCIL_TEST),N.disable(N.SAMPLE_ALPHA_TO_COVERAGE),N.blendEquation(N.FUNC_ADD),N.blendFunc(N.ONE,N.ZERO),N.blendFuncSeparate(N.ONE,N.ZERO,N.ONE,N.ZERO),N.colorMask(!0,!0,!0,!0),N.clearColor(0,0,0,0),N.depthMask(!0),N.depthFunc(N.LESS),N.clearDepth(1),N.stencilMask(4294967295),N.stencilFunc(N.ALWAYS,0,4294967295),N.stencilOp(N.KEEP,N.KEEP,N.KEEP),N.clearStencil(0),N.cullFace(N.BACK),N.frontFace(N.CCW),N.polygonOffset(0,0),N.activeTexture(N.TEXTURE0),N.bindFramebuffer(N.FRAMEBUFFER,null),t===!0&&(N.bindFramebuffer(N.DRAW_FRAMEBUFFER,null),N.bindFramebuffer(N.READ_FRAMEBUFFER,null)),N.useProgram(null),N.lineWidth(1),N.scissor(0,0,N.canvas.width,N.canvas.height),N.viewport(0,0,N.canvas.width,N.canvas.height),g={},J=null,W={},s={},j=new WeakMap,r=[],c=null,y=!1,w=null,a=null,o=null,O=null,h=null,d=null,L=null,l=!1,p=null,B=null,G=null,Q=null,m=null,X.set(0,0,N.canvas.width,N.canvas.height),eM.set(0,0,N.canvas.width,N.canvas.height),A.reset(),I.reset(),n.reset()}return{buffers:{color:A,depth:I,stencil:n},enable:xM,disable:sM,bindFramebuffer:rM,drawBuffers:nM,useProgram:kM,setBlending:cD,setMaterial:SD,setFlipSided:zD,setCullFace:ZD,setLineWidth:XM,setPolygonOffset:mM,setScissorTest:ot,activeTexture:XD,bindTexture:E,unbindTexture:C,compressedTexImage2D:K,compressedTexImage3D:MM,texImage2D:oM,texImage3D:IM,updateUBOMapping:pM,uniformBlockBinding:ZM,texStorage2D:V,texStorage3D:yM,texSubImage2D:DM,texSubImage3D:iM,compressedTexSubImage2D:LM,compressedTexSubImage3D:AM,scissor:aM,viewport:cM,reset:MD}}function wr(N,M,D,t,e,i,z){const A=e.isWebGL2,I=e.maxTextures,n=e.maxCubemapSize,T=e.maxTextureSize,u=e.maxSamples,g=M.has("WEBGL_multisampled_render_to_texture")?M.get("WEBGL_multisampled_render_to_texture"):null,s=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),j=new WeakMap;let r;const c=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(E,C){return y?new OffscreenCanvas(E,C):AN("canvas")}function a(E,C,K,MM){let DM=1;if((E.width>MM||E.height>MM)&&(DM=MM/Math.max(E.width,E.height)),DM<1||C===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const iM=C?Vi:Math.floor,LM=iM(DM*E.width),AM=iM(DM*E.height);r===void 0&&(r=w(LM,AM));const V=K?w(LM,AM):r;return V.width=LM,V.height=AM,V.getContext("2d").drawImage(E,0,0,LM,AM),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+LM+"x"+AM+")."),V}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function o(E){return Pz(E.width)&&Pz(E.height)}function O(E){return A?!1:E.wrapS!==RD||E.wrapT!==RD||E.minFilter!==TD&&E.minFilter!==aD}function h(E,C){return E.generateMipmaps&&C&&E.minFilter!==TD&&E.minFilter!==aD}function d(E){N.generateMipmap(E)}function L(E,C,K,MM,DM=!1){if(A===!1)return C;if(E!==null){if(N[E]!==void 0)return N[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let iM=C;return C===N.RED&&(K===N.FLOAT&&(iM=N.R32F),K===N.HALF_FLOAT&&(iM=N.R16F),K===N.UNSIGNED_BYTE&&(iM=N.R8)),C===N.RG&&(K===N.FLOAT&&(iM=N.RG32F),K===N.HALF_FLOAT&&(iM=N.RG16F),K===N.UNSIGNED_BYTE&&(iM=N.RG8)),C===N.RGBA&&(K===N.FLOAT&&(iM=N.RGBA32F),K===N.HALF_FLOAT&&(iM=N.RGBA16F),K===N.UNSIGNED_BYTE&&(iM=MM===SM&&DM===!1?N.SRGB8_ALPHA8:N.RGBA8),K===N.UNSIGNED_SHORT_4_4_4_4&&(iM=N.RGBA4),K===N.UNSIGNED_SHORT_5_5_5_1&&(iM=N.RGB5_A1)),(iM===N.R16F||iM===N.R32F||iM===N.RG16F||iM===N.RG32F||iM===N.RGBA16F||iM===N.RGBA32F)&&M.get("EXT_color_buffer_float"),iM}function l(E,C,K){return h(E,K)===!0||E.isFramebufferTexture&&E.minFilter!==TD&&E.minFilter!==aD?Math.log2(Math.max(C.width,C.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?C.mipmaps.length:1}function p(E){return E===TD||E===gn||E===tA?N.NEAREST:N.LINEAR}function B(E){const C=E.target;C.removeEventListener("dispose",B),Q(C),C.isVideoTexture&&j.delete(C)}function G(E){const C=E.target;C.removeEventListener("dispose",G),Z(C)}function Q(E){const C=t.get(E);if(C.__webglInit===void 0)return;const K=E.source,MM=c.get(K);if(MM){const DM=MM[C.__cacheKey];DM.usedTimes--,DM.usedTimes===0&&m(E),Object.keys(MM).length===0&&c.delete(K)}t.remove(E)}function m(E){const C=t.get(E);N.deleteTexture(C.__webglTexture);const K=E.source,MM=c.get(K);delete MM[C.__cacheKey],z.memory.textures--}function Z(E){const C=E.texture,K=t.get(E),MM=t.get(C);if(MM.__webglTexture!==void 0&&(N.deleteTexture(MM.__webglTexture),z.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let DM=0;DM<6;DM++)N.deleteFramebuffer(K.__webglFramebuffer[DM]),K.__webglDepthbuffer&&N.deleteRenderbuffer(K.__webglDepthbuffer[DM]);else{if(N.deleteFramebuffer(K.__webglFramebuffer),K.__webglDepthbuffer&&N.deleteRenderbuffer(K.__webglDepthbuffer),K.__webglMultisampledFramebuffer&&N.deleteFramebuffer(K.__webglMultisampledFramebuffer),K.__webglColorRenderbuffer)for(let DM=0;DM<K.__webglColorRenderbuffer.length;DM++)K.__webglColorRenderbuffer[DM]&&N.deleteRenderbuffer(K.__webglColorRenderbuffer[DM]);K.__webglDepthRenderbuffer&&N.deleteRenderbuffer(K.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let DM=0,iM=C.length;DM<iM;DM++){const LM=t.get(C[DM]);LM.__webglTexture&&(N.deleteTexture(LM.__webglTexture),z.memory.textures--),t.remove(C[DM])}t.remove(C),t.remove(E)}let H=0;function $(){H=0}function F(){const E=H;return E>=I&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+I),H+=1,E}function J(E){const C=[];return C.push(E.wrapS),C.push(E.wrapT),C.push(E.wrapR||0),C.push(E.magFilter),C.push(E.minFilter),C.push(E.anisotropy),C.push(E.internalFormat),C.push(E.format),C.push(E.type),C.push(E.generateMipmaps),C.push(E.premultiplyAlpha),C.push(E.flipY),C.push(E.unpackAlignment),C.push(E.encoding),C.join()}function W(E,C){const K=t.get(E);if(E.isVideoTexture&&ot(E),E.isRenderTargetTexture===!1&&E.version>0&&K.__version!==E.version){const MM=E.image;if(MM===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(MM.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{sM(K,E,C);return}}D.bindTexture(N.TEXTURE_2D,K.__webglTexture,N.TEXTURE0+C)}function TM(E,C){const K=t.get(E);if(E.version>0&&K.__version!==E.version){sM(K,E,C);return}D.bindTexture(N.TEXTURE_2D_ARRAY,K.__webglTexture,N.TEXTURE0+C)}function S(E,C){const K=t.get(E);if(E.version>0&&K.__version!==E.version){sM(K,E,C);return}D.bindTexture(N.TEXTURE_3D,K.__webglTexture,N.TEXTURE0+C)}function X(E,C){const K=t.get(E);if(E.version>0&&K.__version!==E.version){rM(K,E,C);return}D.bindTexture(N.TEXTURE_CUBE_MAP,K.__webglTexture,N.TEXTURE0+C)}const eM={[MA]:N.REPEAT,[RD]:N.CLAMP_TO_EDGE,[DA]:N.MIRRORED_REPEAT},NM={[TD]:N.NEAREST,[gn]:N.NEAREST_MIPMAP_NEAREST,[tA]:N.NEAREST_MIPMAP_LINEAR,[aD]:N.LINEAR,[Ru]:N.LINEAR_MIPMAP_NEAREST,[DN]:N.LINEAR_MIPMAP_LINEAR};function v(E,C,K){if(K?(N.texParameteri(E,N.TEXTURE_WRAP_S,eM[C.wrapS]),N.texParameteri(E,N.TEXTURE_WRAP_T,eM[C.wrapT]),(E===N.TEXTURE_3D||E===N.TEXTURE_2D_ARRAY)&&N.texParameteri(E,N.TEXTURE_WRAP_R,eM[C.wrapR]),N.texParameteri(E,N.TEXTURE_MAG_FILTER,NM[C.magFilter]),N.texParameteri(E,N.TEXTURE_MIN_FILTER,NM[C.minFilter])):(N.texParameteri(E,N.TEXTURE_WRAP_S,N.CLAMP_TO_EDGE),N.texParameteri(E,N.TEXTURE_WRAP_T,N.CLAMP_TO_EDGE),(E===N.TEXTURE_3D||E===N.TEXTURE_2D_ARRAY)&&N.texParameteri(E,N.TEXTURE_WRAP_R,N.CLAMP_TO_EDGE),(C.wrapS!==RD||C.wrapT!==RD)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),N.texParameteri(E,N.TEXTURE_MAG_FILTER,p(C.magFilter)),N.texParameteri(E,N.TEXTURE_MIN_FILTER,p(C.minFilter)),C.minFilter!==TD&&C.minFilter!==aD&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.has("EXT_texture_filter_anisotropic")===!0){const MM=M.get("EXT_texture_filter_anisotropic");if(C.magFilter===TD||C.minFilter!==tA&&C.minFilter!==DN||C.type===Zt&&M.has("OES_texture_float_linear")===!1||A===!1&&C.type===tN&&M.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||t.get(C).__currentAnisotropy)&&(N.texParameterf(E,MM.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,e.getMaxAnisotropy())),t.get(C).__currentAnisotropy=C.anisotropy)}}function xM(E,C){let K=!1;E.__webglInit===void 0&&(E.__webglInit=!0,C.addEventListener("dispose",B));const MM=C.source;let DM=c.get(MM);DM===void 0&&(DM={},c.set(MM,DM));const iM=J(C);if(iM!==E.__cacheKey){DM[iM]===void 0&&(DM[iM]={texture:N.createTexture(),usedTimes:0},z.memory.textures++,K=!0),DM[iM].usedTimes++;const LM=DM[E.__cacheKey];LM!==void 0&&(DM[E.__cacheKey].usedTimes--,LM.usedTimes===0&&m(C)),E.__cacheKey=iM,E.__webglTexture=DM[iM].texture}return K}function sM(E,C,K){let MM=N.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(MM=N.TEXTURE_2D_ARRAY),C.isData3DTexture&&(MM=N.TEXTURE_3D);const DM=xM(E,C),iM=C.source;D.bindTexture(MM,E.__webglTexture,N.TEXTURE0+K);const LM=t.get(iM);if(iM.version!==LM.__version||DM===!0){D.activeTexture(N.TEXTURE0+K),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,C.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,C.unpackAlignment),N.pixelStorei(N.UNPACK_COLORSPACE_CONVERSION_WEBGL,N.NONE);const AM=O(C)&&o(C.image)===!1;let V=a(C.image,AM,!1,T);V=XD(C,V);const yM=o(V)||A,oM=i.convert(C.format,C.encoding);let IM=i.convert(C.type),aM=L(C.internalFormat,oM,IM,C.encoding,C.isVideoTexture);v(MM,C,yM);let cM;const pM=C.mipmaps,ZM=A&&C.isVideoTexture!==!0,MD=LM.__version===void 0||DM===!0,Y=l(C,V,yM);if(C.isDepthTexture)aM=N.DEPTH_COMPONENT,A?C.type===Zt?aM=N.DEPTH_COMPONENT32F:C.type===St?aM=N.DEPTH_COMPONENT24:C.type===je?aM=N.DEPTH24_STENCIL8:aM=N.DEPTH_COMPONENT16:C.type===Zt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===_t&&aM===N.DEPTH_COMPONENT&&C.type!==sn&&C.type!==St&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=St,IM=i.convert(C.type)),C.format===ye&&aM===N.DEPTH_COMPONENT&&(aM=N.DEPTH_STENCIL,C.type!==je&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=je,IM=i.convert(C.type))),MD&&(ZM?D.texStorage2D(N.TEXTURE_2D,1,aM,V.width,V.height):D.texImage2D(N.TEXTURE_2D,0,aM,V.width,V.height,0,oM,IM,null));else if(C.isDataTexture)if(pM.length>0&&yM){ZM&&MD&&D.texStorage2D(N.TEXTURE_2D,Y,aM,pM[0].width,pM[0].height);for(let _=0,q=pM.length;_<q;_++)cM=pM[_],ZM?D.texSubImage2D(N.TEXTURE_2D,_,0,0,cM.width,cM.height,oM,IM,cM.data):D.texImage2D(N.TEXTURE_2D,_,aM,cM.width,cM.height,0,oM,IM,cM.data);C.generateMipmaps=!1}else ZM?(MD&&D.texStorage2D(N.TEXTURE_2D,Y,aM,V.width,V.height),D.texSubImage2D(N.TEXTURE_2D,0,0,0,V.width,V.height,oM,IM,V.data)):D.texImage2D(N.TEXTURE_2D,0,aM,V.width,V.height,0,oM,IM,V.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){ZM&&MD&&D.texStorage3D(N.TEXTURE_2D_ARRAY,Y,aM,pM[0].width,pM[0].height,V.depth);for(let _=0,q=pM.length;_<q;_++)cM=pM[_],C.format!==PD?oM!==null?ZM?D.compressedTexSubImage3D(N.TEXTURE_2D_ARRAY,_,0,0,0,cM.width,cM.height,V.depth,oM,cM.data,0,0):D.compressedTexImage3D(N.TEXTURE_2D_ARRAY,_,aM,cM.width,cM.height,V.depth,0,cM.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ZM?D.texSubImage3D(N.TEXTURE_2D_ARRAY,_,0,0,0,cM.width,cM.height,V.depth,oM,IM,cM.data):D.texImage3D(N.TEXTURE_2D_ARRAY,_,aM,cM.width,cM.height,V.depth,0,oM,IM,cM.data)}else{ZM&&MD&&D.texStorage2D(N.TEXTURE_2D,Y,aM,pM[0].width,pM[0].height);for(let _=0,q=pM.length;_<q;_++)cM=pM[_],C.format!==PD?oM!==null?ZM?D.compressedTexSubImage2D(N.TEXTURE_2D,_,0,0,cM.width,cM.height,oM,cM.data):D.compressedTexImage2D(N.TEXTURE_2D,_,aM,cM.width,cM.height,0,cM.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ZM?D.texSubImage2D(N.TEXTURE_2D,_,0,0,cM.width,cM.height,oM,IM,cM.data):D.texImage2D(N.TEXTURE_2D,_,aM,cM.width,cM.height,0,oM,IM,cM.data)}else if(C.isDataArrayTexture)ZM?(MD&&D.texStorage3D(N.TEXTURE_2D_ARRAY,Y,aM,V.width,V.height,V.depth),D.texSubImage3D(N.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,oM,IM,V.data)):D.texImage3D(N.TEXTURE_2D_ARRAY,0,aM,V.width,V.height,V.depth,0,oM,IM,V.data);else if(C.isData3DTexture)ZM?(MD&&D.texStorage3D(N.TEXTURE_3D,Y,aM,V.width,V.height,V.depth),D.texSubImage3D(N.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,oM,IM,V.data)):D.texImage3D(N.TEXTURE_3D,0,aM,V.width,V.height,V.depth,0,oM,IM,V.data);else if(C.isFramebufferTexture){if(MD)if(ZM)D.texStorage2D(N.TEXTURE_2D,Y,aM,V.width,V.height);else{let _=V.width,q=V.height;for(let zM=0;zM<Y;zM++)D.texImage2D(N.TEXTURE_2D,zM,aM,_,q,0,oM,IM,null),_>>=1,q>>=1}}else if(pM.length>0&&yM){ZM&&MD&&D.texStorage2D(N.TEXTURE_2D,Y,aM,pM[0].width,pM[0].height);for(let _=0,q=pM.length;_<q;_++)cM=pM[_],ZM?D.texSubImage2D(N.TEXTURE_2D,_,0,0,oM,IM,cM):D.texImage2D(N.TEXTURE_2D,_,aM,oM,IM,cM);C.generateMipmaps=!1}else ZM?(MD&&D.texStorage2D(N.TEXTURE_2D,Y,aM,V.width,V.height),D.texSubImage2D(N.TEXTURE_2D,0,0,0,oM,IM,V)):D.texImage2D(N.TEXTURE_2D,0,aM,oM,IM,V);h(C,yM)&&d(MM),LM.__version=iM.version,C.onUpdate&&C.onUpdate(C)}E.__version=C.version}function rM(E,C,K){if(C.image.length!==6)return;const MM=xM(E,C),DM=C.source;D.bindTexture(N.TEXTURE_CUBE_MAP,E.__webglTexture,N.TEXTURE0+K);const iM=t.get(DM);if(DM.version!==iM.__version||MM===!0){D.activeTexture(N.TEXTURE0+K),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,C.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,C.unpackAlignment),N.pixelStorei(N.UNPACK_COLORSPACE_CONVERSION_WEBGL,N.NONE);const LM=C.isCompressedTexture||C.image[0].isCompressedTexture,AM=C.image[0]&&C.image[0].isDataTexture,V=[];for(let _=0;_<6;_++)!LM&&!AM?V[_]=a(C.image[_],!1,!0,n):V[_]=AM?C.image[_].image:C.image[_],V[_]=XD(C,V[_]);const yM=V[0],oM=o(yM)||A,IM=i.convert(C.format,C.encoding),aM=i.convert(C.type),cM=L(C.internalFormat,IM,aM,C.encoding),pM=A&&C.isVideoTexture!==!0,ZM=iM.__version===void 0||MM===!0;let MD=l(C,yM,oM);v(N.TEXTURE_CUBE_MAP,C,oM);let Y;if(LM){pM&&ZM&&D.texStorage2D(N.TEXTURE_CUBE_MAP,MD,cM,yM.width,yM.height);for(let _=0;_<6;_++){Y=V[_].mipmaps;for(let q=0;q<Y.length;q++){const zM=Y[q];C.format!==PD?IM!==null?pM?D.compressedTexSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,q,0,0,zM.width,zM.height,IM,zM.data):D.compressedTexImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,q,cM,zM.width,zM.height,0,zM.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):pM?D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,q,0,0,zM.width,zM.height,IM,aM,zM.data):D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,q,cM,zM.width,zM.height,0,IM,aM,zM.data)}}}else{Y=C.mipmaps,pM&&ZM&&(Y.length>0&&MD++,D.texStorage2D(N.TEXTURE_CUBE_MAP,MD,cM,V[0].width,V[0].height));for(let _=0;_<6;_++)if(AM){pM?D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,0,0,V[_].width,V[_].height,IM,aM,V[_].data):D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,cM,V[_].width,V[_].height,0,IM,aM,V[_].data);for(let q=0;q<Y.length;q++){const uM=Y[q].image[_].image;pM?D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,q+1,0,0,uM.width,uM.height,IM,aM,uM.data):D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,q+1,cM,uM.width,uM.height,0,IM,aM,uM.data)}}else{pM?D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,0,0,IM,aM,V[_]):D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,cM,IM,aM,V[_]);for(let q=0;q<Y.length;q++){const zM=Y[q];pM?D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,q+1,0,0,IM,aM,zM.image[_]):D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X+_,q+1,cM,IM,aM,zM.image[_])}}}h(C,oM)&&d(N.TEXTURE_CUBE_MAP),iM.__version=DM.version,C.onUpdate&&C.onUpdate(C)}E.__version=C.version}function nM(E,C,K,MM,DM){const iM=i.convert(K.format,K.encoding),LM=i.convert(K.type),AM=L(K.internalFormat,iM,LM,K.encoding);t.get(C).__hasExternalTextures||(DM===N.TEXTURE_3D||DM===N.TEXTURE_2D_ARRAY?D.texImage3D(DM,0,AM,C.width,C.height,C.depth,0,iM,LM,null):D.texImage2D(DM,0,AM,C.width,C.height,0,iM,LM,null)),D.bindFramebuffer(N.FRAMEBUFFER,E),mM(C)?g.framebufferTexture2DMultisampleEXT(N.FRAMEBUFFER,MM,DM,t.get(K).__webglTexture,0,XM(C)):(DM===N.TEXTURE_2D||DM>=N.TEXTURE_CUBE_MAP_POSITIVE_X&&DM<=N.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&N.framebufferTexture2D(N.FRAMEBUFFER,MM,DM,t.get(K).__webglTexture,0),D.bindFramebuffer(N.FRAMEBUFFER,null)}function kM(E,C,K){if(N.bindRenderbuffer(N.RENDERBUFFER,E),C.depthBuffer&&!C.stencilBuffer){let MM=N.DEPTH_COMPONENT16;if(K||mM(C)){const DM=C.depthTexture;DM&&DM.isDepthTexture&&(DM.type===Zt?MM=N.DEPTH_COMPONENT32F:DM.type===St&&(MM=N.DEPTH_COMPONENT24));const iM=XM(C);mM(C)?g.renderbufferStorageMultisampleEXT(N.RENDERBUFFER,iM,MM,C.width,C.height):N.renderbufferStorageMultisample(N.RENDERBUFFER,iM,MM,C.width,C.height)}else N.renderbufferStorage(N.RENDERBUFFER,MM,C.width,C.height);N.framebufferRenderbuffer(N.FRAMEBUFFER,N.DEPTH_ATTACHMENT,N.RENDERBUFFER,E)}else if(C.depthBuffer&&C.stencilBuffer){const MM=XM(C);K&&mM(C)===!1?N.renderbufferStorageMultisample(N.RENDERBUFFER,MM,N.DEPTH24_STENCIL8,C.width,C.height):mM(C)?g.renderbufferStorageMultisampleEXT(N.RENDERBUFFER,MM,N.DEPTH24_STENCIL8,C.width,C.height):N.renderbufferStorage(N.RENDERBUFFER,N.DEPTH_STENCIL,C.width,C.height),N.framebufferRenderbuffer(N.FRAMEBUFFER,N.DEPTH_STENCIL_ATTACHMENT,N.RENDERBUFFER,E)}else{const MM=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let DM=0;DM<MM.length;DM++){const iM=MM[DM],LM=i.convert(iM.format,iM.encoding),AM=i.convert(iM.type),V=L(iM.internalFormat,LM,AM,iM.encoding),yM=XM(C);K&&mM(C)===!1?N.renderbufferStorageMultisample(N.RENDERBUFFER,yM,V,C.width,C.height):mM(C)?g.renderbufferStorageMultisampleEXT(N.RENDERBUFFER,yM,V,C.width,C.height):N.renderbufferStorage(N.RENDERBUFFER,V,C.width,C.height)}}N.bindRenderbuffer(N.RENDERBUFFER,null)}function EM(E,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(D.bindFramebuffer(N.FRAMEBUFFER,E),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!t.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),W(C.depthTexture,0);const MM=t.get(C.depthTexture).__webglTexture,DM=XM(C);if(C.depthTexture.format===_t)mM(C)?g.framebufferTexture2DMultisampleEXT(N.FRAMEBUFFER,N.DEPTH_ATTACHMENT,N.TEXTURE_2D,MM,0,DM):N.framebufferTexture2D(N.FRAMEBUFFER,N.DEPTH_ATTACHMENT,N.TEXTURE_2D,MM,0);else if(C.depthTexture.format===ye)mM(C)?g.framebufferTexture2DMultisampleEXT(N.FRAMEBUFFER,N.DEPTH_STENCIL_ATTACHMENT,N.TEXTURE_2D,MM,0,DM):N.framebufferTexture2D(N.FRAMEBUFFER,N.DEPTH_STENCIL_ATTACHMENT,N.TEXTURE_2D,MM,0);else throw new Error("Unknown depthTexture format")}function CM(E){const C=t.get(E),K=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!C.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");EM(C.__webglFramebuffer,E)}else if(K){C.__webglDepthbuffer=[];for(let MM=0;MM<6;MM++)D.bindFramebuffer(N.FRAMEBUFFER,C.__webglFramebuffer[MM]),C.__webglDepthbuffer[MM]=N.createRenderbuffer(),kM(C.__webglDepthbuffer[MM],E,!1)}else D.bindFramebuffer(N.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=N.createRenderbuffer(),kM(C.__webglDepthbuffer,E,!1);D.bindFramebuffer(N.FRAMEBUFFER,null)}function cD(E,C,K){const MM=t.get(E);C!==void 0&&nM(MM.__webglFramebuffer,E,E.texture,N.COLOR_ATTACHMENT0,N.TEXTURE_2D),K!==void 0&&CM(E)}function SD(E){const C=E.texture,K=t.get(E),MM=t.get(C);E.addEventListener("dispose",G),E.isWebGLMultipleRenderTargets!==!0&&(MM.__webglTexture===void 0&&(MM.__webglTexture=N.createTexture()),MM.__version=C.version,z.memory.textures++);const DM=E.isWebGLCubeRenderTarget===!0,iM=E.isWebGLMultipleRenderTargets===!0,LM=o(E)||A;if(DM){K.__webglFramebuffer=[];for(let AM=0;AM<6;AM++)K.__webglFramebuffer[AM]=N.createFramebuffer()}else{if(K.__webglFramebuffer=N.createFramebuffer(),iM)if(e.drawBuffers){const AM=E.texture;for(let V=0,yM=AM.length;V<yM;V++){const oM=t.get(AM[V]);oM.__webglTexture===void 0&&(oM.__webglTexture=N.createTexture(),z.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(A&&E.samples>0&&mM(E)===!1){const AM=iM?C:[C];K.__webglMultisampledFramebuffer=N.createFramebuffer(),K.__webglColorRenderbuffer=[],D.bindFramebuffer(N.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let V=0;V<AM.length;V++){const yM=AM[V];K.__webglColorRenderbuffer[V]=N.createRenderbuffer(),N.bindRenderbuffer(N.RENDERBUFFER,K.__webglColorRenderbuffer[V]);const oM=i.convert(yM.format,yM.encoding),IM=i.convert(yM.type),aM=L(yM.internalFormat,oM,IM,yM.encoding,E.isXRRenderTarget===!0),cM=XM(E);N.renderbufferStorageMultisample(N.RENDERBUFFER,cM,aM,E.width,E.height),N.framebufferRenderbuffer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+V,N.RENDERBUFFER,K.__webglColorRenderbuffer[V])}N.bindRenderbuffer(N.RENDERBUFFER,null),E.depthBuffer&&(K.__webglDepthRenderbuffer=N.createRenderbuffer(),kM(K.__webglDepthRenderbuffer,E,!0)),D.bindFramebuffer(N.FRAMEBUFFER,null)}}if(DM){D.bindTexture(N.TEXTURE_CUBE_MAP,MM.__webglTexture),v(N.TEXTURE_CUBE_MAP,C,LM);for(let AM=0;AM<6;AM++)nM(K.__webglFramebuffer[AM],E,C,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+AM);h(C,LM)&&d(N.TEXTURE_CUBE_MAP),D.unbindTexture()}else if(iM){const AM=E.texture;for(let V=0,yM=AM.length;V<yM;V++){const oM=AM[V],IM=t.get(oM);D.bindTexture(N.TEXTURE_2D,IM.__webglTexture),v(N.TEXTURE_2D,oM,LM),nM(K.__webglFramebuffer,E,oM,N.COLOR_ATTACHMENT0+V,N.TEXTURE_2D),h(oM,LM)&&d(N.TEXTURE_2D)}D.unbindTexture()}else{let AM=N.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(A?AM=E.isWebGL3DRenderTarget?N.TEXTURE_3D:N.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),D.bindTexture(AM,MM.__webglTexture),v(AM,C,LM),nM(K.__webglFramebuffer,E,C,N.COLOR_ATTACHMENT0,AM),h(C,LM)&&d(AM),D.unbindTexture()}E.depthBuffer&&CM(E)}function zD(E){const C=o(E)||A,K=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let MM=0,DM=K.length;MM<DM;MM++){const iM=K[MM];if(h(iM,C)){const LM=E.isWebGLCubeRenderTarget?N.TEXTURE_CUBE_MAP:N.TEXTURE_2D,AM=t.get(iM).__webglTexture;D.bindTexture(LM,AM),d(LM),D.unbindTexture()}}}function ZD(E){if(A&&E.samples>0&&mM(E)===!1){const C=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],K=E.width,MM=E.height;let DM=N.COLOR_BUFFER_BIT;const iM=[],LM=E.stencilBuffer?N.DEPTH_STENCIL_ATTACHMENT:N.DEPTH_ATTACHMENT,AM=t.get(E),V=E.isWebGLMultipleRenderTargets===!0;if(V)for(let yM=0;yM<C.length;yM++)D.bindFramebuffer(N.FRAMEBUFFER,AM.__webglMultisampledFramebuffer),N.framebufferRenderbuffer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+yM,N.RENDERBUFFER,null),D.bindFramebuffer(N.FRAMEBUFFER,AM.__webglFramebuffer),N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0+yM,N.TEXTURE_2D,null,0);D.bindFramebuffer(N.READ_FRAMEBUFFER,AM.__webglMultisampledFramebuffer),D.bindFramebuffer(N.DRAW_FRAMEBUFFER,AM.__webglFramebuffer);for(let yM=0;yM<C.length;yM++){iM.push(N.COLOR_ATTACHMENT0+yM),E.depthBuffer&&iM.push(LM);const oM=AM.__ignoreDepthValues!==void 0?AM.__ignoreDepthValues:!1;if(oM===!1&&(E.depthBuffer&&(DM|=N.DEPTH_BUFFER_BIT),E.stencilBuffer&&(DM|=N.STENCIL_BUFFER_BIT)),V&&N.framebufferRenderbuffer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.RENDERBUFFER,AM.__webglColorRenderbuffer[yM]),oM===!0&&(N.invalidateFramebuffer(N.READ_FRAMEBUFFER,[LM]),N.invalidateFramebuffer(N.DRAW_FRAMEBUFFER,[LM])),V){const IM=t.get(C[yM]).__webglTexture;N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,IM,0)}N.blitFramebuffer(0,0,K,MM,0,0,K,MM,DM,N.NEAREST),s&&N.invalidateFramebuffer(N.READ_FRAMEBUFFER,iM)}if(D.bindFramebuffer(N.READ_FRAMEBUFFER,null),D.bindFramebuffer(N.DRAW_FRAMEBUFFER,null),V)for(let yM=0;yM<C.length;yM++){D.bindFramebuffer(N.FRAMEBUFFER,AM.__webglMultisampledFramebuffer),N.framebufferRenderbuffer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+yM,N.RENDERBUFFER,AM.__webglColorRenderbuffer[yM]);const oM=t.get(C[yM]).__webglTexture;D.bindFramebuffer(N.FRAMEBUFFER,AM.__webglFramebuffer),N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0+yM,N.TEXTURE_2D,oM,0)}D.bindFramebuffer(N.DRAW_FRAMEBUFFER,AM.__webglMultisampledFramebuffer)}}function XM(E){return Math.min(u,E.samples)}function mM(E){const C=t.get(E);return A&&E.samples>0&&M.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function ot(E){const C=z.render.frame;j.get(E)!==C&&(j.set(E,C),E.update())}function XD(E,C){const K=E.encoding,MM=E.format,DM=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===IA||K!==bt&&(K===SM?A===!1?M.has("EXT_sRGB")===!0&&MM===PD?(E.format=IA,E.minFilter=aD,E.generateMipmaps=!1):C=Vn.sRGBToLinear(C):(MM!==PD||DM!==kt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",K)),C}this.allocateTextureUnit=F,this.resetTextureUnits=$,this.setTexture2D=W,this.setTexture2DArray=TM,this.setTexture3D=S,this.setTextureCube=X,this.rebindTextures=cD,this.setupRenderTarget=SD,this.updateRenderTargetMipmap=zD,this.updateMultisampleRenderTarget=ZD,this.setupDepthRenderbuffer=CM,this.setupFrameBufferTexture=nM,this.useMultisampledRTT=mM}function xr(N,M,D){const t=D.isWebGL2;function e(i,z=null){let A;if(i===kt)return N.UNSIGNED_BYTE;if(i===Gu)return N.UNSIGNED_SHORT_4_4_4_4;if(i===Vu)return N.UNSIGNED_SHORT_5_5_5_1;if(i===Pu)return N.BYTE;if(i===Fu)return N.SHORT;if(i===sn)return N.UNSIGNED_SHORT;if(i===Bu)return N.INT;if(i===St)return N.UNSIGNED_INT;if(i===Zt)return N.FLOAT;if(i===tN)return t?N.HALF_FLOAT:(A=M.get("OES_texture_half_float"),A!==null?A.HALF_FLOAT_OES:null);if(i===Hu)return N.ALPHA;if(i===PD)return N.RGBA;if(i===Wu)return N.LUMINANCE;if(i===Xu)return N.LUMINANCE_ALPHA;if(i===_t)return N.DEPTH_COMPONENT;if(i===ye)return N.DEPTH_STENCIL;if(i===IA)return A=M.get("EXT_sRGB"),A!==null?A.SRGB_ALPHA_EXT:null;if(i===qu)return N.RED;if(i===$u)return N.RED_INTEGER;if(i===Ju)return N.RG;if(i===Mg)return N.RG_INTEGER;if(i===Dg)return N.RGBA_INTEGER;if(i===eA||i===NA||i===iA||i===AA)if(z===SM)if(A=M.get("WEBGL_compressed_texture_s3tc_srgb"),A!==null){if(i===eA)return A.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===NA)return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===iA)return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===AA)return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(A=M.get("WEBGL_compressed_texture_s3tc"),A!==null){if(i===eA)return A.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===NA)return A.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===iA)return A.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===AA)return A.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rn||i===cn||i===jn||i===yn)if(A=M.get("WEBGL_compressed_texture_pvrtc"),A!==null){if(i===rn)return A.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===cn)return A.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jn)return A.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yn)return A.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===tg)return A=M.get("WEBGL_compressed_texture_etc1"),A!==null?A.COMPRESSED_RGB_ETC1_WEBGL:null;if(i===an||i===on)if(A=M.get("WEBGL_compressed_texture_etc"),A!==null){if(i===an)return z===SM?A.COMPRESSED_SRGB8_ETC2:A.COMPRESSED_RGB8_ETC2;if(i===on)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:A.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Cn||i===Ln||i===wn||i===xn||i===On||i===En||i===ln||i===hn||i===dn||i===vn||i===Yn||i===pn||i===Un||i===fn)if(A=M.get("WEBGL_compressed_texture_astc"),A!==null){if(i===Cn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:A.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ln)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:A.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:A.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:A.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===On)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:A.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===En)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:A.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ln)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:A.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:A.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===dn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:A.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===vn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:A.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Yn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:A.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===pn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:A.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Un)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:A.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===fn)return z===SM?A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:A.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zA)if(A=M.get("EXT_texture_compression_bptc"),A!==null){if(i===zA)return z===SM?A.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:A.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(i===eg||i===mn||i===Qn||i===kn)if(A=M.get("EXT_texture_compression_rgtc"),A!==null){if(i===zA)return A.COMPRESSED_RED_RGTC1_EXT;if(i===mn)return A.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qn)return A.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===kn)return A.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===je?t?N.UNSIGNED_INT_24_8:(A=M.get("WEBGL_depth_texture"),A!==null?A.UNSIGNED_INT_24_8_WEBGL:null):N[i]!==void 0?N[i]:null}return{convert:e}}class Or extends UD{constructor(M=[]){super(),this.isArrayCamera=!0,this.cameras=M}}let rN=class extends yD{constructor(){super(),this.isGroup=!0,this.type="Group"}};const Er={type:"move"};class ZA{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rN,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rN,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rN,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(M){return this._targetRay!==null&&this._targetRay.dispatchEvent(M),this._grip!==null&&this._grip.dispatchEvent(M),this._hand!==null&&this._hand.dispatchEvent(M),this}connect(M){if(M&&M.hand){const D=this._hand;if(D)for(const t of M.hand.values())this._getHandJoint(D,t)}return this.dispatchEvent({type:"connected",data:M}),this}disconnect(M){return this.dispatchEvent({type:"disconnected",data:M}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(M,D,t){let e=null,i=null,z=null;const A=this._targetRay,I=this._grip,n=this._hand;if(M&&D.session.visibilityState!=="visible-blurred"){if(n&&M.hand){z=!0;for(const r of M.hand.values()){const c=D.getJointPose(r,t),y=this._getHandJoint(n,r);c!==null&&(y.matrix.fromArray(c.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.jointRadius=c.radius),y.visible=c!==null}const T=n.joints["index-finger-tip"],u=n.joints["thumb-tip"],g=T.position.distanceTo(u.position),s=.02,j=.005;n.inputState.pinching&&g>s+j?(n.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:M.handedness,target:this})):!n.inputState.pinching&&g<=s-j&&(n.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:M.handedness,target:this}))}else I!==null&&M.gripSpace&&(i=D.getPose(M.gripSpace,t),i!==null&&(I.matrix.fromArray(i.transform.matrix),I.matrix.decompose(I.position,I.rotation,I.scale),i.linearVelocity?(I.hasLinearVelocity=!0,I.linearVelocity.copy(i.linearVelocity)):I.hasLinearVelocity=!1,i.angularVelocity?(I.hasAngularVelocity=!0,I.angularVelocity.copy(i.angularVelocity)):I.hasAngularVelocity=!1));A!==null&&(e=D.getPose(M.targetRaySpace,t),e===null&&i!==null&&(e=i),e!==null&&(A.matrix.fromArray(e.transform.matrix),A.matrix.decompose(A.position,A.rotation,A.scale),e.linearVelocity?(A.hasLinearVelocity=!0,A.linearVelocity.copy(e.linearVelocity)):A.hasLinearVelocity=!1,e.angularVelocity?(A.hasAngularVelocity=!0,A.angularVelocity.copy(e.angularVelocity)):A.hasAngularVelocity=!1,this.dispatchEvent(Er)))}return A!==null&&(A.visible=e!==null),I!==null&&(I.visible=i!==null),n!==null&&(n.visible=z!==null),this}_getHandJoint(M,D){if(M.joints[D.jointName]===void 0){const t=new rN;t.matrixAutoUpdate=!1,t.visible=!1,M.joints[D.jointName]=t,M.add(t)}return M.joints[D.jointName]}}class lr extends BD{constructor(M,D,t,e,i,z,A,I,n,T){if(T=T!==void 0?T:_t,T!==_t&&T!==ye)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");t===void 0&&T===_t&&(t=St),t===void 0&&T===ye&&(t=je),super(null,e,i,z,A,I,T,t,n),this.isDepthTexture=!0,this.image={width:M,height:D},this.magFilter=A!==void 0?A:TD,this.minFilter=I!==void 0?I:TD,this.flipY=!1,this.generateMipmaps=!1}}class hr extends Te{constructor(M,D){super();const t=this;let e=null,i=1,z=null,A="local-floor",I=1,n=null,T=null,u=null,g=null,s=null,j=null;const r=D.getContextAttributes();let c=null,y=null;const w=[],a=[],o=new Set,O=new Map,h=new UD;h.layers.enable(1),h.viewport=new qM;const d=new UD;d.layers.enable(2),d.viewport=new qM;const L=[h,d],l=new Or;l.layers.enable(1),l.layers.enable(2);let p=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(S){let X=w[S];return X===void 0&&(X=new ZA,w[S]=X),X.getTargetRaySpace()},this.getControllerGrip=function(S){let X=w[S];return X===void 0&&(X=new ZA,w[S]=X),X.getGripSpace()},this.getHand=function(S){let X=w[S];return X===void 0&&(X=new ZA,w[S]=X),X.getHandSpace()};function G(S){const X=a.indexOf(S.inputSource);if(X===-1)return;const eM=w[X];eM!==void 0&&eM.dispatchEvent({type:S.type,data:S.inputSource})}function Q(){e.removeEventListener("select",G),e.removeEventListener("selectstart",G),e.removeEventListener("selectend",G),e.removeEventListener("squeeze",G),e.removeEventListener("squeezestart",G),e.removeEventListener("squeezeend",G),e.removeEventListener("end",Q),e.removeEventListener("inputsourceschange",m);for(let S=0;S<w.length;S++){const X=a[S];X!==null&&(a[S]=null,w[S].disconnect(X))}p=null,B=null,M.setRenderTarget(c),s=null,g=null,u=null,e=null,y=null,TM.stop(),t.isPresenting=!1,t.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(S){i=S,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(S){A=S,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return n||z},this.setReferenceSpace=function(S){n=S},this.getBaseLayer=function(){return g!==null?g:s},this.getBinding=function(){return u},this.getFrame=function(){return j},this.getSession=function(){return e},this.setSession=async function(S){if(e=S,e!==null){if(c=M.getRenderTarget(),e.addEventListener("select",G),e.addEventListener("selectstart",G),e.addEventListener("selectend",G),e.addEventListener("squeeze",G),e.addEventListener("squeezestart",G),e.addEventListener("squeezeend",G),e.addEventListener("end",Q),e.addEventListener("inputsourceschange",m),r.xrCompatible!==!0&&await D.makeXRCompatible(),e.renderState.layers===void 0||M.capabilities.isWebGL2===!1){const X={antialias:e.renderState.layers===void 0?r.antialias:!0,alpha:r.alpha,depth:r.depth,stencil:r.stencil,framebufferScaleFactor:i};s=new XRWebGLLayer(e,D,X),e.updateRenderState({baseLayer:s}),y=new Vt(s.framebufferWidth,s.framebufferHeight,{format:PD,type:kt,encoding:M.outputEncoding,stencilBuffer:r.stencil})}else{let X=null,eM=null,NM=null;r.depth&&(NM=r.stencil?D.DEPTH24_STENCIL8:D.DEPTH_COMPONENT24,X=r.stencil?ye:_t,eM=r.stencil?je:St);const v={colorFormat:D.RGBA8,depthFormat:NM,scaleFactor:i};u=new XRWebGLBinding(e,D),g=u.createProjectionLayer(v),e.updateRenderState({layers:[g]}),y=new Vt(g.textureWidth,g.textureHeight,{format:PD,type:kt,depthTexture:new lr(g.textureWidth,g.textureHeight,eM,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:r.stencil,encoding:M.outputEncoding,samples:r.antialias?4:0});const xM=M.properties.get(y);xM.__ignoreDepthValues=g.ignoreDepthValues}y.isXRRenderTarget=!0,this.setFoveation(I),n=null,z=await e.requestReferenceSpace(A),TM.setContext(e),TM.start(),t.isPresenting=!0,t.dispatchEvent({type:"sessionstart"})}};function m(S){for(let X=0;X<S.removed.length;X++){const eM=S.removed[X],NM=a.indexOf(eM);NM>=0&&(a[NM]=null,w[NM].disconnect(eM))}for(let X=0;X<S.added.length;X++){const eM=S.added[X];let NM=a.indexOf(eM);if(NM===-1){for(let xM=0;xM<w.length;xM++)if(xM>=a.length){a.push(eM),NM=xM;break}else if(a[xM]===null){a[xM]=eM,NM=xM;break}if(NM===-1)break}const v=w[NM];v&&v.connect(eM)}}const Z=new U,H=new U;function $(S,X,eM){Z.setFromMatrixPosition(X.matrixWorld),H.setFromMatrixPosition(eM.matrixWorld);const NM=Z.distanceTo(H),v=X.projectionMatrix.elements,xM=eM.projectionMatrix.elements,sM=v[14]/(v[10]-1),rM=v[14]/(v[10]+1),nM=(v[9]+1)/v[5],kM=(v[9]-1)/v[5],EM=(v[8]-1)/v[0],CM=(xM[8]+1)/xM[0],cD=sM*EM,SD=sM*CM,zD=NM/(-EM+CM),ZD=zD*-EM;X.matrixWorld.decompose(S.position,S.quaternion,S.scale),S.translateX(ZD),S.translateZ(zD),S.matrixWorld.compose(S.position,S.quaternion,S.scale),S.matrixWorldInverse.copy(S.matrixWorld).invert();const XM=sM+zD,mM=rM+zD,ot=cD-ZD,XD=SD+(NM-ZD),E=nM*rM/mM*XM,C=kM*rM/mM*XM;S.projectionMatrix.makePerspective(ot,XD,E,C,XM,mM)}function F(S,X){X===null?S.matrixWorld.copy(S.matrix):S.matrixWorld.multiplyMatrices(X.matrixWorld,S.matrix),S.matrixWorldInverse.copy(S.matrixWorld).invert()}this.updateCamera=function(S){if(e===null)return;l.near=d.near=h.near=S.near,l.far=d.far=h.far=S.far,(p!==l.near||B!==l.far)&&(e.updateRenderState({depthNear:l.near,depthFar:l.far}),p=l.near,B=l.far);const X=S.parent,eM=l.cameras;F(l,X);for(let v=0;v<eM.length;v++)F(eM[v],X);l.matrixWorld.decompose(l.position,l.quaternion,l.scale),S.matrix.copy(l.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale);const NM=S.children;for(let v=0,xM=NM.length;v<xM;v++)NM[v].updateMatrixWorld(!0);eM.length===2?$(l,h,d):l.projectionMatrix.copy(h.projectionMatrix)},this.getCamera=function(){return l},this.getFoveation=function(){if(!(g===null&&s===null))return I},this.setFoveation=function(S){I=S,g!==null&&(g.fixedFoveation=S),s!==null&&s.fixedFoveation!==void 0&&(s.fixedFoveation=S)},this.getPlanes=function(){return o};let J=null;function W(S,X){if(T=X.getViewerPose(n||z),j=X,T!==null){const eM=T.views;s!==null&&(M.setRenderTargetFramebuffer(y,s.framebuffer),M.setRenderTarget(y));let NM=!1;eM.length!==l.cameras.length&&(l.cameras.length=0,NM=!0);for(let v=0;v<eM.length;v++){const xM=eM[v];let sM=null;if(s!==null)sM=s.getViewport(xM);else{const nM=u.getViewSubImage(g,xM);sM=nM.viewport,v===0&&(M.setRenderTargetTextures(y,nM.colorTexture,g.ignoreDepthValues?void 0:nM.depthStencilTexture),M.setRenderTarget(y))}let rM=L[v];rM===void 0&&(rM=new UD,rM.layers.enable(v),rM.viewport=new qM,L[v]=rM),rM.matrix.fromArray(xM.transform.matrix),rM.projectionMatrix.fromArray(xM.projectionMatrix),rM.viewport.set(sM.x,sM.y,sM.width,sM.height),v===0&&l.matrix.copy(rM.matrix),NM===!0&&l.cameras.push(rM)}}for(let eM=0;eM<w.length;eM++){const NM=a[eM],v=w[eM];NM!==null&&v!==void 0&&v.update(NM,X,n||z)}if(J&&J(S,X),X.detectedPlanes){t.dispatchEvent({type:"planesdetected",data:X.detectedPlanes});let eM=null;for(const NM of o)X.detectedPlanes.has(NM)||(eM===null&&(eM=[]),eM.push(NM));if(eM!==null)for(const NM of eM)o.delete(NM),O.delete(NM),t.dispatchEvent({type:"planeremoved",data:NM});for(const NM of X.detectedPlanes)if(!o.has(NM))o.add(NM),O.set(NM,X.lastChangedTime),t.dispatchEvent({type:"planeadded",data:NM});else{const v=O.get(NM);NM.lastChangedTime>v&&(O.set(NM,NM.lastChangedTime),t.dispatchEvent({type:"planechanged",data:NM}))}}j=null}const TM=new DI;TM.setAnimationLoop(W),this.setAnimationLoop=function(S){J=S},this.dispose=function(){}}}function dr(N,M){function D(r,c){c.color.getRGB(r.fogColor.value,tI(N)),c.isFog?(r.fogNear.value=c.near,r.fogFar.value=c.far):c.isFogExp2&&(r.fogDensity.value=c.density)}function t(r,c,y,w,a){c.isMeshBasicMaterial||c.isMeshLambertMaterial?e(r,c):c.isMeshToonMaterial?(e(r,c),T(r,c)):c.isMeshPhongMaterial?(e(r,c),n(r,c)):c.isMeshStandardMaterial?(e(r,c),u(r,c),c.isMeshPhysicalMaterial&&g(r,c,a)):c.isMeshMatcapMaterial?(e(r,c),s(r,c)):c.isMeshDepthMaterial?e(r,c):c.isMeshDistanceMaterial?(e(r,c),j(r,c)):c.isMeshNormalMaterial?e(r,c):c.isLineBasicMaterial?(i(r,c),c.isLineDashedMaterial&&z(r,c)):c.isPointsMaterial?A(r,c,y,w):c.isSpriteMaterial?I(r,c):c.isShadowMaterial?(r.color.value.copy(c.color),r.opacity.value=c.opacity):c.isShaderMaterial&&(c.uniformsNeedUpdate=!1)}function e(r,c){r.opacity.value=c.opacity,c.color&&r.diffuse.value.copy(c.color),c.emissive&&r.emissive.value.copy(c.emissive).multiplyScalar(c.emissiveIntensity),c.map&&(r.map.value=c.map),c.alphaMap&&(r.alphaMap.value=c.alphaMap),c.bumpMap&&(r.bumpMap.value=c.bumpMap,r.bumpScale.value=c.bumpScale,c.side===wD&&(r.bumpScale.value*=-1)),c.displacementMap&&(r.displacementMap.value=c.displacementMap,r.displacementScale.value=c.displacementScale,r.displacementBias.value=c.displacementBias),c.emissiveMap&&(r.emissiveMap.value=c.emissiveMap),c.normalMap&&(r.normalMap.value=c.normalMap,r.normalScale.value.copy(c.normalScale),c.side===wD&&r.normalScale.value.negate()),c.specularMap&&(r.specularMap.value=c.specularMap),c.alphaTest>0&&(r.alphaTest.value=c.alphaTest);const y=M.get(c).envMap;if(y&&(r.envMap.value=y,r.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=c.reflectivity,r.ior.value=c.ior,r.refractionRatio.value=c.refractionRatio),c.lightMap){r.lightMap.value=c.lightMap;const o=N.physicallyCorrectLights!==!0?Math.PI:1;r.lightMapIntensity.value=c.lightMapIntensity*o}c.aoMap&&(r.aoMap.value=c.aoMap,r.aoMapIntensity.value=c.aoMapIntensity);let w;c.map?w=c.map:c.specularMap?w=c.specularMap:c.displacementMap?w=c.displacementMap:c.normalMap?w=c.normalMap:c.bumpMap?w=c.bumpMap:c.roughnessMap?w=c.roughnessMap:c.metalnessMap?w=c.metalnessMap:c.alphaMap?w=c.alphaMap:c.emissiveMap?w=c.emissiveMap:c.clearcoatMap?w=c.clearcoatMap:c.clearcoatNormalMap?w=c.clearcoatNormalMap:c.clearcoatRoughnessMap?w=c.clearcoatRoughnessMap:c.iridescenceMap?w=c.iridescenceMap:c.iridescenceThicknessMap?w=c.iridescenceThicknessMap:c.specularIntensityMap?w=c.specularIntensityMap:c.specularColorMap?w=c.specularColorMap:c.transmissionMap?w=c.transmissionMap:c.thicknessMap?w=c.thicknessMap:c.sheenColorMap?w=c.sheenColorMap:c.sheenRoughnessMap&&(w=c.sheenRoughnessMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),r.uvTransform.value.copy(w.matrix));let a;c.aoMap?a=c.aoMap:c.lightMap&&(a=c.lightMap),a!==void 0&&(a.isWebGLRenderTarget&&(a=a.texture),a.matrixAutoUpdate===!0&&a.updateMatrix(),r.uv2Transform.value.copy(a.matrix))}function i(r,c){r.diffuse.value.copy(c.color),r.opacity.value=c.opacity}function z(r,c){r.dashSize.value=c.dashSize,r.totalSize.value=c.dashSize+c.gapSize,r.scale.value=c.scale}function A(r,c,y,w){r.diffuse.value.copy(c.color),r.opacity.value=c.opacity,r.size.value=c.size*y,r.scale.value=w*.5,c.map&&(r.map.value=c.map),c.alphaMap&&(r.alphaMap.value=c.alphaMap),c.alphaTest>0&&(r.alphaTest.value=c.alphaTest);let a;c.map?a=c.map:c.alphaMap&&(a=c.alphaMap),a!==void 0&&(a.matrixAutoUpdate===!0&&a.updateMatrix(),r.uvTransform.value.copy(a.matrix))}function I(r,c){r.diffuse.value.copy(c.color),r.opacity.value=c.opacity,r.rotation.value=c.rotation,c.map&&(r.map.value=c.map),c.alphaMap&&(r.alphaMap.value=c.alphaMap),c.alphaTest>0&&(r.alphaTest.value=c.alphaTest);let y;c.map?y=c.map:c.alphaMap&&(y=c.alphaMap),y!==void 0&&(y.matrixAutoUpdate===!0&&y.updateMatrix(),r.uvTransform.value.copy(y.matrix))}function n(r,c){r.specular.value.copy(c.specular),r.shininess.value=Math.max(c.shininess,1e-4)}function T(r,c){c.gradientMap&&(r.gradientMap.value=c.gradientMap)}function u(r,c){r.roughness.value=c.roughness,r.metalness.value=c.metalness,c.roughnessMap&&(r.roughnessMap.value=c.roughnessMap),c.metalnessMap&&(r.metalnessMap.value=c.metalnessMap),M.get(c).envMap&&(r.envMapIntensity.value=c.envMapIntensity)}function g(r,c,y){r.ior.value=c.ior,c.sheen>0&&(r.sheenColor.value.copy(c.sheenColor).multiplyScalar(c.sheen),r.sheenRoughness.value=c.sheenRoughness,c.sheenColorMap&&(r.sheenColorMap.value=c.sheenColorMap),c.sheenRoughnessMap&&(r.sheenRoughnessMap.value=c.sheenRoughnessMap)),c.clearcoat>0&&(r.clearcoat.value=c.clearcoat,r.clearcoatRoughness.value=c.clearcoatRoughness,c.clearcoatMap&&(r.clearcoatMap.value=c.clearcoatMap),c.clearcoatRoughnessMap&&(r.clearcoatRoughnessMap.value=c.clearcoatRoughnessMap),c.clearcoatNormalMap&&(r.clearcoatNormalScale.value.copy(c.clearcoatNormalScale),r.clearcoatNormalMap.value=c.clearcoatNormalMap,c.side===wD&&r.clearcoatNormalScale.value.negate())),c.iridescence>0&&(r.iridescence.value=c.iridescence,r.iridescenceIOR.value=c.iridescenceIOR,r.iridescenceThicknessMinimum.value=c.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum.value=c.iridescenceThicknessRange[1],c.iridescenceMap&&(r.iridescenceMap.value=c.iridescenceMap),c.iridescenceThicknessMap&&(r.iridescenceThicknessMap.value=c.iridescenceThicknessMap)),c.transmission>0&&(r.transmission.value=c.transmission,r.transmissionSamplerMap.value=y.texture,r.transmissionSamplerSize.value.set(y.width,y.height),c.transmissionMap&&(r.transmissionMap.value=c.transmissionMap),r.thickness.value=c.thickness,c.thicknessMap&&(r.thicknessMap.value=c.thicknessMap),r.attenuationDistance.value=c.attenuationDistance,r.attenuationColor.value.copy(c.attenuationColor)),r.specularIntensity.value=c.specularIntensity,r.specularColor.value.copy(c.specularColor),c.specularIntensityMap&&(r.specularIntensityMap.value=c.specularIntensityMap),c.specularColorMap&&(r.specularColorMap.value=c.specularColorMap)}function s(r,c){c.matcap&&(r.matcap.value=c.matcap)}function j(r,c){r.referencePosition.value.copy(c.referencePosition),r.nearDistance.value=c.nearDistance,r.farDistance.value=c.farDistance}return{refreshFogUniforms:D,refreshMaterialUniforms:t}}function vr(N,M,D,t){let e={},i={},z=[];const A=D.isWebGL2?N.getParameter(N.MAX_UNIFORM_BUFFER_BINDINGS):0;function I(w,a){const o=a.program;t.uniformBlockBinding(w,o)}function n(w,a){let o=e[w.id];o===void 0&&(j(w),o=T(w),e[w.id]=o,w.addEventListener("dispose",c));const O=a.program;t.updateUBOMapping(w,O);const h=M.render.frame;i[w.id]!==h&&(g(w),i[w.id]=h)}function T(w){const a=u();w.__bindingPointIndex=a;const o=N.createBuffer(),O=w.__size,h=w.usage;return N.bindBuffer(N.UNIFORM_BUFFER,o),N.bufferData(N.UNIFORM_BUFFER,O,h),N.bindBuffer(N.UNIFORM_BUFFER,null),N.bindBufferBase(N.UNIFORM_BUFFER,a,o),o}function u(){for(let w=0;w<A;w++)if(z.indexOf(w)===-1)return z.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(w){const a=e[w.id],o=w.uniforms,O=w.__cache;N.bindBuffer(N.UNIFORM_BUFFER,a);for(let h=0,d=o.length;h<d;h++){const L=o[h];if(s(L,h,O)===!0){const l=L.__offset,p=Array.isArray(L.value)?L.value:[L.value];let B=0;for(let G=0;G<p.length;G++){const Q=p[G],m=r(Q);typeof Q=="number"?(L.__data[0]=Q,N.bufferSubData(N.UNIFORM_BUFFER,l+B,L.__data)):Q.isMatrix3?(L.__data[0]=Q.elements[0],L.__data[1]=Q.elements[1],L.__data[2]=Q.elements[2],L.__data[3]=Q.elements[0],L.__data[4]=Q.elements[3],L.__data[5]=Q.elements[4],L.__data[6]=Q.elements[5],L.__data[7]=Q.elements[0],L.__data[8]=Q.elements[6],L.__data[9]=Q.elements[7],L.__data[10]=Q.elements[8],L.__data[11]=Q.elements[0]):(Q.toArray(L.__data,B),B+=m.storage/Float32Array.BYTES_PER_ELEMENT)}N.bufferSubData(N.UNIFORM_BUFFER,l,L.__data)}}N.bindBuffer(N.UNIFORM_BUFFER,null)}function s(w,a,o){const O=w.value;if(o[a]===void 0){if(typeof O=="number")o[a]=O;else{const h=Array.isArray(O)?O:[O],d=[];for(let L=0;L<h.length;L++)d.push(h[L].clone());o[a]=d}return!0}else if(typeof O=="number"){if(o[a]!==O)return o[a]=O,!0}else{const h=Array.isArray(o[a])?o[a]:[o[a]],d=Array.isArray(O)?O:[O];for(let L=0;L<h.length;L++){const l=h[L];if(l.equals(d[L])===!1)return l.copy(d[L]),!0}}return!1}function j(w){const a=w.uniforms;let o=0;const O=16;let h=0;for(let d=0,L=a.length;d<L;d++){const l=a[d],p={boundary:0,storage:0},B=Array.isArray(l.value)?l.value:[l.value];for(let G=0,Q=B.length;G<Q;G++){const m=B[G],Z=r(m);p.boundary+=Z.boundary,p.storage+=Z.storage}if(l.__data=new Float32Array(p.storage/Float32Array.BYTES_PER_ELEMENT),l.__offset=o,d>0){h=o%O;const G=O-h;h!==0&&G-p.boundary<0&&(o+=O-h,l.__offset=o)}o+=p.storage}return h=o%O,h>0&&(o+=O-h),w.__size=o,w.__cache={},this}function r(w){const a={boundary:0,storage:0};return typeof w=="number"?(a.boundary=4,a.storage=4):w.isVector2?(a.boundary=8,a.storage=8):w.isVector3||w.isColor?(a.boundary=16,a.storage=12):w.isVector4?(a.boundary=16,a.storage=16):w.isMatrix3?(a.boundary=48,a.storage=48):w.isMatrix4?(a.boundary=64,a.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),a}function c(w){const a=w.target;a.removeEventListener("dispose",c);const o=z.indexOf(a.__bindingPointIndex);z.splice(o,1),N.deleteBuffer(e[a.id]),delete e[a.id],delete i[a.id]}function y(){for(const w in e)N.deleteBuffer(e[w]);z=[],e={},i={}}return{bind:I,update:n,dispose:y}}function Yr(){const N=AN("canvas");return N.style.display="block",N}function pr(N={}){this.isWebGLRenderer=!0;const M=N.canvas!==void 0?N.canvas:Yr(),D=N.context!==void 0?N.context:null,t=N.depth!==void 0?N.depth:!0,e=N.stencil!==void 0?N.stencil:!0,i=N.antialias!==void 0?N.antialias:!1,z=N.premultipliedAlpha!==void 0?N.premultipliedAlpha:!0,A=N.preserveDrawingBuffer!==void 0?N.preserveDrawingBuffer:!1,I=N.powerPreference!==void 0?N.powerPreference:"default",n=N.failIfMajorPerformanceCaveat!==void 0?N.failIfMajorPerformanceCaveat:!1;let T;D!==null?T=D.getContextAttributes().alpha:T=N.alpha!==void 0?N.alpha:!1;let u=null,g=null;const s=[],j=[];this.domElement=M,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=bt,this.physicallyCorrectLights=!1,this.toneMapping=it,this.toneMappingExposure=1;const r=this;let c=!1,y=0,w=0,a=null,o=-1,O=null;const h=new qM,d=new qM;let L=null,l=M.width,p=M.height,B=1,G=null,Q=null;const m=new qM(0,0,l,p),Z=new qM(0,0,l,p);let H=!1;const $=new yA;let F=!1,J=!1,W=null;const TM=new eD,S=new gM,X=new U,eM={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function NM(){return a===null?B:1}let v=D;function xM(x,k){for(let b=0;b<x.length;b++){const f=x[b],R=M.getContext(f,k);if(R!==null)return R}return null}try{const x={alpha:!0,depth:t,stencil:e,antialias:i,premultipliedAlpha:z,preserveDrawingBuffer:A,powerPreference:I,failIfMajorPerformanceCaveat:n};if("setAttribute"in M&&M.setAttribute("data-engine",`three.js r${gu}`),M.addEventListener("webglcontextlost",aM,!1),M.addEventListener("webglcontextrestored",cM,!1),M.addEventListener("webglcontextcreationerror",pM,!1),v===null){const k=["webgl2","webgl","experimental-webgl"];if(r.isWebGL1Renderer===!0&&k.shift(),v=xM(k,x),v===null)throw xM(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}v.getShaderPrecisionFormat===void 0&&(v.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let sM,rM,nM,kM,EM,CM,cD,SD,zD,ZD,XM,mM,ot,XD,E,C,K,MM,DM,iM,LM,AM,V,yM;function oM(){sM=new bg(v),rM=new Ug(v,sM,N),sM.init(rM),AM=new xr(v,sM,rM),nM=new Lr(v,sM,rM),kM=new Pg(v),EM=new zr,CM=new wr(v,sM,nM,EM,rM,AM,kM),cD=new kg(r),SD=new _g(r),zD=new Og(v,rM),V=new Yg(v,sM,zD,rM),ZD=new Kg(v,zD,kM,V),XM=new Vg(v,ZD,zD,kM),DM=new Gg(v,rM,CM),C=new fg(EM),mM=new Ar(r,cD,SD,sM,rM,V,C),ot=new dr(r,EM),XD=new Ir,E=new cr(sM,rM),MM=new vg(r,cD,SD,nM,XM,T,z),K=new Cr(r,XM,rM),yM=new vr(v,kM,rM,nM),iM=new pg(v,sM,kM,rM),LM=new Rg(v,sM,kM,rM),kM.programs=mM.programs,r.capabilities=rM,r.extensions=sM,r.properties=EM,r.renderLists=XD,r.shadowMap=K,r.state=nM,r.info=kM}oM();const IM=new hr(r,v);this.xr=IM,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){const x=sM.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=sM.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(x){x!==void 0&&(B=x,this.setSize(l,p,!1))},this.getSize=function(x){return x.set(l,p)},this.setSize=function(x,k,b){if(IM.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}l=x,p=k,M.width=Math.floor(x*B),M.height=Math.floor(k*B),b!==!1&&(M.style.width=x+"px",M.style.height=k+"px"),this.setViewport(0,0,x,k)},this.getDrawingBufferSize=function(x){return x.set(l*B,p*B).floor()},this.setDrawingBufferSize=function(x,k,b){l=x,p=k,B=b,M.width=Math.floor(x*b),M.height=Math.floor(k*b),this.setViewport(0,0,x,k)},this.getCurrentViewport=function(x){return x.copy(h)},this.getViewport=function(x){return x.copy(m)},this.setViewport=function(x,k,b,f){x.isVector4?m.set(x.x,x.y,x.z,x.w):m.set(x,k,b,f),nM.viewport(h.copy(m).multiplyScalar(B).floor())},this.getScissor=function(x){return x.copy(Z)},this.setScissor=function(x,k,b,f){x.isVector4?Z.set(x.x,x.y,x.z,x.w):Z.set(x,k,b,f),nM.scissor(d.copy(Z).multiplyScalar(B).floor())},this.getScissorTest=function(){return H},this.setScissorTest=function(x){nM.setScissorTest(H=x)},this.setOpaqueSort=function(x){G=x},this.setTransparentSort=function(x){Q=x},this.getClearColor=function(x){return x.copy(MM.getClearColor())},this.setClearColor=function(){MM.setClearColor.apply(MM,arguments)},this.getClearAlpha=function(){return MM.getClearAlpha()},this.setClearAlpha=function(){MM.setClearAlpha.apply(MM,arguments)},this.clear=function(x=!0,k=!0,b=!0){let f=0;x&&(f|=v.COLOR_BUFFER_BIT),k&&(f|=v.DEPTH_BUFFER_BIT),b&&(f|=v.STENCIL_BUFFER_BIT),v.clear(f)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){M.removeEventListener("webglcontextlost",aM,!1),M.removeEventListener("webglcontextrestored",cM,!1),M.removeEventListener("webglcontextcreationerror",pM,!1),XD.dispose(),E.dispose(),EM.dispose(),cD.dispose(),SD.dispose(),XM.dispose(),V.dispose(),yM.dispose(),mM.dispose(),IM.dispose(),IM.removeEventListener("sessionstart",zM),IM.removeEventListener("sessionend",uM),W&&(W.dispose(),W=null),fM.stop()};function aM(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),c=!0}function cM(){console.log("THREE.WebGLRenderer: Context Restored."),c=!1;const x=kM.autoReset,k=K.enabled,b=K.autoUpdate,f=K.needsUpdate,R=K.type;oM(),kM.autoReset=x,K.enabled=k,K.autoUpdate=b,K.needsUpdate=f,K.type=R}function pM(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function ZM(x){const k=x.target;k.removeEventListener("dispose",ZM),MD(k)}function MD(x){Y(x),EM.remove(x)}function Y(x){const k=EM.get(x).programs;k!==void 0&&(k.forEach(function(b){mM.releaseProgram(b)}),x.isShaderMaterial&&mM.releaseShaderCache(x))}this.renderBufferDirect=function(x,k,b,f,R,jM){k===null&&(k=eM);const wM=R.isMesh&&R.matrixWorld.determinant()<0,lM=cj(x,k,b,f,R);nM.setMaterial(f,wM);let hM=b.index,UM=1;f.wireframe===!0&&(hM=ZD.getWireframeAttribute(b),UM=2);const dM=b.drawRange,vM=b.attributes.position;let FM=dM.start*UM,vD=(dM.start+dM.count)*UM;jM!==null&&(FM=Math.max(FM,jM.start*UM),vD=Math.min(vD,(jM.start+jM.count)*UM)),hM!==null?(FM=Math.max(FM,0),vD=Math.min(vD,hM.count)):vM!=null&&(FM=Math.max(FM,0),vD=Math.min(vD,vM.count));const Lt=vD-FM;if(Lt<0||Lt===1/0)return;V.setup(R,f,lM,b,hM);let Ne,BM=iM;if(hM!==null&&(Ne=zD.get(hM),BM=LM,BM.setIndex(Ne)),R.isMesh)f.wireframe===!0?(nM.setLineWidth(f.wireframeLinewidth*NM()),BM.setMode(v.LINES)):BM.setMode(v.TRIANGLES);else if(R.isLine){let YM=f.linewidth;YM===void 0&&(YM=1),nM.setLineWidth(YM*NM()),R.isLineSegments?BM.setMode(v.LINES):R.isLineLoop?BM.setMode(v.LINE_LOOP):BM.setMode(v.LINE_STRIP)}else R.isPoints?BM.setMode(v.POINTS):R.isSprite&&BM.setMode(v.TRIANGLES);if(R.isInstancedMesh)BM.renderInstances(FM,Lt,R.count);else if(b.isInstancedBufferGeometry){const YM=b._maxInstanceCount!==void 0?b._maxInstanceCount:1/0,wz=Math.min(b.instanceCount,YM);BM.renderInstances(FM,Lt,wz)}else BM.render(FM,Lt)},this.compile=function(x,k){function b(f,R,jM){f.transparent===!0&&f.side===Et&&f.forceSinglePass===!1?(f.side=wD,f.needsUpdate=!0,_D(f,R,jM),f.side=Ot,f.needsUpdate=!0,_D(f,R,jM),f.side=Et):_D(f,R,jM)}g=E.get(x),g.init(),j.push(g),x.traverseVisible(function(f){f.isLight&&f.layers.test(k.layers)&&(g.pushLight(f),f.castShadow&&g.pushShadow(f))}),g.setupLights(r.physicallyCorrectLights),x.traverse(function(f){const R=f.material;if(R)if(Array.isArray(R))for(let jM=0;jM<R.length;jM++){const wM=R[jM];b(wM,x,f)}else b(R,x,f)}),j.pop(),g=null};let _=null;function q(x){_&&_(x)}function zM(){fM.stop()}function uM(){fM.start()}const fM=new DI;fM.setAnimationLoop(q),typeof self<"u"&&fM.setContext(self),this.setAnimationLoop=function(x){_=x,IM.setAnimationLoop(x),x===null?fM.stop():fM.start()},IM.addEventListener("sessionstart",zM),IM.addEventListener("sessionend",uM),this.render=function(x,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(c===!0)return;x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),IM.enabled===!0&&IM.isPresenting===!0&&(IM.cameraAutoUpdate===!0&&IM.updateCamera(k),k=IM.getCamera()),x.isScene===!0&&x.onBeforeRender(r,x,k,a),g=E.get(x,j.length),g.init(),j.push(g),TM.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),$.setFromProjectionMatrix(TM),J=this.localClippingEnabled,F=C.init(this.clippingPlanes,J),u=XD.get(x,s.length),u.init(),s.push(u),DD(x,k,0,r.sortObjects),u.finish(),r.sortObjects===!0&&u.sort(G,Q),F===!0&&C.beginShadows();const b=g.state.shadowsArray;if(K.render(b,x,k),F===!0&&C.endShadows(),this.info.autoReset===!0&&this.info.reset(),MM.render(u,x),g.setupLights(r.physicallyCorrectLights),k.isArrayCamera){const f=k.cameras;for(let R=0,jM=f.length;R<jM;R++){const wM=f[R];nD(u,x,wM,wM.viewport)}}else nD(u,x,k);a!==null&&(CM.updateMultisampleRenderTarget(a),CM.updateRenderTargetMipmap(a)),x.isScene===!0&&x.onAfterRender(r,x,k),V.resetDefaultState(),o=-1,O=null,j.pop(),j.length>0?g=j[j.length-1]:g=null,s.pop(),s.length>0?u=s[s.length-1]:u=null};function DD(x,k,b,f){if(x.visible===!1)return;if(x.layers.test(k.layers)){if(x.isGroup)b=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(k);else if(x.isLight)g.pushLight(x),x.castShadow&&g.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||$.intersectsSprite(x)){f&&X.setFromMatrixPosition(x.matrixWorld).applyMatrix4(TM);const wM=XM.update(x),lM=x.material;lM.visible&&u.push(x,wM,lM,b,X.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(x.isSkinnedMesh&&x.skeleton.frame!==kM.render.frame&&(x.skeleton.update(),x.skeleton.frame=kM.render.frame),!x.frustumCulled||$.intersectsObject(x))){f&&X.setFromMatrixPosition(x.matrixWorld).applyMatrix4(TM);const wM=XM.update(x),lM=x.material;if(Array.isArray(lM)){const hM=wM.groups;for(let UM=0,dM=hM.length;UM<dM;UM++){const vM=hM[UM],FM=lM[vM.materialIndex];FM&&FM.visible&&u.push(x,wM,FM,b,X.z,vM)}}else lM.visible&&u.push(x,wM,lM,b,X.z,null)}}const jM=x.children;for(let wM=0,lM=jM.length;wM<lM;wM++)DD(jM[wM],k,b,f)}function nD(x,k,b,f){const R=x.opaque,jM=x.transmissive,wM=x.transparent;g.setupLightsView(b),F===!0&&C.setGlobalState(r.clippingPlanes,b),jM.length>0&&ee(R,k,b),f&&nM.viewport(h.copy(f)),R.length>0&&_M(R,k,b),jM.length>0&&_M(jM,k,b),wM.length>0&&_M(wM,k,b),nM.buffers.depth.setTest(!0),nM.buffers.depth.setMask(!0),nM.buffers.color.setMask(!0),nM.setPolygonOffset(!1)}function ee(x,k,b){const f=rM.isWebGL2;W===null&&(W=new Vt(1,1,{generateMipmaps:!0,type:sM.has("EXT_color_buffer_half_float")?tN:kt,minFilter:DN,samples:f&&i===!0?4:0})),r.getDrawingBufferSize(S),f?W.setSize(S.x,S.y):W.setSize(Vi(S.x),Vi(S.y));const R=r.getRenderTarget();r.setRenderTarget(W),r.clear();const jM=r.toneMapping;r.toneMapping=it,_M(x,k,b),r.toneMapping=jM,CM.updateMultisampleRenderTarget(W),CM.updateRenderTargetMipmap(W),r.setRenderTarget(R)}function _M(x,k,b){const f=k.isScene===!0?k.overrideMaterial:null;for(let R=0,jM=x.length;R<jM;R++){const wM=x[R],lM=wM.object,hM=wM.geometry,UM=f===null?wM.material:f,dM=wM.group;lM.layers.test(b.layers)&&Ct(lM,k,b,hM,UM,dM)}}function Ct(x,k,b,f,R,jM){x.onBeforeRender(r,k,b,f,R,jM),x.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),R.onBeforeRender(r,k,b,f,x,jM),R.transparent===!0&&R.side===Et&&R.forceSinglePass===!1?(R.side=wD,R.needsUpdate=!0,r.renderBufferDirect(b,k,f,R,x,jM),R.side=Ot,R.needsUpdate=!0,r.renderBufferDirect(b,k,f,R,x,jM),R.side=Et):r.renderBufferDirect(b,k,f,R,x,jM),x.onAfterRender(r,k,b,f,R,jM)}function _D(x,k,b){k.isScene!==!0&&(k=eM);const f=EM.get(x),R=g.state.lights,jM=g.state.shadowsArray,wM=R.state.version,lM=mM.getParameters(x,R.state,jM,k,b),hM=mM.getProgramCacheKey(lM);let UM=f.programs;f.environment=x.isMeshStandardMaterial?k.environment:null,f.fog=k.fog,f.envMap=(x.isMeshStandardMaterial?SD:cD).get(x.envMap||f.environment),UM===void 0&&(x.addEventListener("dispose",ZM),UM=new Map,f.programs=UM);let dM=UM.get(hM);if(dM!==void 0){if(f.currentProgram===dM&&f.lightsStateVersion===wM)return xT(x,lM),dM}else lM.uniforms=mM.getUniforms(x),x.onBuild(b,lM,r),x.onBeforeCompile(lM,r),dM=mM.acquireProgram(lM,hM),UM.set(hM,dM),f.uniforms=lM.uniforms;const vM=f.uniforms;(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(vM.clippingPlanes=C.uniform),xT(x,lM),f.needsLights=yj(x),f.lightsStateVersion=wM,f.needsLights&&(vM.ambientLightColor.value=R.state.ambient,vM.lightProbe.value=R.state.probe,vM.directionalLights.value=R.state.directional,vM.directionalLightShadows.value=R.state.directionalShadow,vM.spotLights.value=R.state.spot,vM.spotLightShadows.value=R.state.spotShadow,vM.rectAreaLights.value=R.state.rectArea,vM.ltc_1.value=R.state.rectAreaLTC1,vM.ltc_2.value=R.state.rectAreaLTC2,vM.pointLights.value=R.state.point,vM.pointLightShadows.value=R.state.pointShadow,vM.hemisphereLights.value=R.state.hemi,vM.directionalShadowMap.value=R.state.directionalShadowMap,vM.directionalShadowMatrix.value=R.state.directionalShadowMatrix,vM.spotShadowMap.value=R.state.spotShadowMap,vM.spotLightMatrix.value=R.state.spotLightMatrix,vM.spotLightMap.value=R.state.spotLightMap,vM.pointShadowMap.value=R.state.pointShadowMap,vM.pointShadowMatrix.value=R.state.pointShadowMatrix);const FM=dM.getUniforms(),vD=ni.seqWithValue(FM.seq,vM);return f.currentProgram=dM,f.uniformsList=vD,dM}function xT(x,k){const b=EM.get(x);b.outputEncoding=k.outputEncoding,b.instancing=k.instancing,b.skinning=k.skinning,b.morphTargets=k.morphTargets,b.morphNormals=k.morphNormals,b.morphColors=k.morphColors,b.morphTargetsCount=k.morphTargetsCount,b.numClippingPlanes=k.numClippingPlanes,b.numIntersection=k.numClipIntersection,b.vertexAlphas=k.vertexAlphas,b.vertexTangents=k.vertexTangents,b.toneMapping=k.toneMapping}function cj(x,k,b,f,R){k.isScene!==!0&&(k=eM),CM.resetTextureUnits();const jM=k.fog,wM=f.isMeshStandardMaterial?k.environment:null,lM=a===null?r.outputEncoding:a.isXRRenderTarget===!0?a.texture.encoding:bt,hM=(f.isMeshStandardMaterial?SD:cD).get(f.envMap||wM),UM=f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,dM=!!f.normalMap&&!!b.attributes.tangent,vM=!!b.morphAttributes.position,FM=!!b.morphAttributes.normal,vD=!!b.morphAttributes.color,Lt=f.toneMapped?r.toneMapping:it,Ne=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,BM=Ne!==void 0?Ne.length:0,YM=EM.get(f),wz=g.state.lights;if(F===!0&&(J===!0||x!==O)){const YD=x===O&&f.id===o;C.setState(f,x,YD)}let tD=!1;f.version===YM.__version?(YM.needsLights&&YM.lightsStateVersion!==wz.state.version||YM.outputEncoding!==lM||R.isInstancedMesh&&YM.instancing===!1||!R.isInstancedMesh&&YM.instancing===!0||R.isSkinnedMesh&&YM.skinning===!1||!R.isSkinnedMesh&&YM.skinning===!0||YM.envMap!==hM||f.fog===!0&&YM.fog!==jM||YM.numClippingPlanes!==void 0&&(YM.numClippingPlanes!==C.numPlanes||YM.numIntersection!==C.numIntersection)||YM.vertexAlphas!==UM||YM.vertexTangents!==dM||YM.morphTargets!==vM||YM.morphNormals!==FM||YM.morphColors!==vD||YM.toneMapping!==Lt||rM.isWebGL2===!0&&YM.morphTargetsCount!==BM)&&(tD=!0):(tD=!0,YM.__version=f.version);let ie=YM.currentProgram;tD===!0&&(ie=_D(f,k,R));let OT=!1,UN=!1,xz=!1;const jD=ie.getUniforms(),Ae=YM.uniforms;if(nM.useProgram(ie.program)&&(OT=!0,UN=!0,xz=!0),f.id!==o&&(o=f.id,UN=!0),OT||O!==x){if(jD.setValue(v,"projectionMatrix",x.projectionMatrix),rM.logarithmicDepthBuffer&&jD.setValue(v,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),O!==x&&(O=x,UN=!0,xz=!0),f.isShaderMaterial||f.isMeshPhongMaterial||f.isMeshToonMaterial||f.isMeshStandardMaterial||f.envMap){const YD=jD.map.cameraPosition;YD!==void 0&&YD.setValue(v,X.setFromMatrixPosition(x.matrixWorld))}(f.isMeshPhongMaterial||f.isMeshToonMaterial||f.isMeshLambertMaterial||f.isMeshBasicMaterial||f.isMeshStandardMaterial||f.isShaderMaterial)&&jD.setValue(v,"isOrthographic",x.isOrthographicCamera===!0),(f.isMeshPhongMaterial||f.isMeshToonMaterial||f.isMeshLambertMaterial||f.isMeshBasicMaterial||f.isMeshStandardMaterial||f.isShaderMaterial||f.isShadowMaterial||R.isSkinnedMesh)&&jD.setValue(v,"viewMatrix",x.matrixWorldInverse)}if(R.isSkinnedMesh){jD.setOptional(v,R,"bindMatrix"),jD.setOptional(v,R,"bindMatrixInverse");const YD=R.skeleton;YD&&(rM.floatVertexTextures?(YD.boneTexture===null&&YD.computeBoneTexture(),jD.setValue(v,"boneTexture",YD.boneTexture,CM),jD.setValue(v,"boneTextureSize",YD.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Oz=b.morphAttributes;if((Oz.position!==void 0||Oz.normal!==void 0||Oz.color!==void 0&&rM.isWebGL2===!0)&&DM.update(R,b,f,ie),(UN||YM.receiveShadow!==R.receiveShadow)&&(YM.receiveShadow=R.receiveShadow,jD.setValue(v,"receiveShadow",R.receiveShadow)),f.isMeshGouraudMaterial&&f.envMap!==null&&(Ae.envMap.value=hM,Ae.flipEnvMap.value=hM.isCubeTexture&&hM.isRenderTargetTexture===!1?-1:1),UN&&(jD.setValue(v,"toneMappingExposure",r.toneMappingExposure),YM.needsLights&&jj(Ae,xz),jM&&f.fog===!0&&ot.refreshFogUniforms(Ae,jM),ot.refreshMaterialUniforms(Ae,f,B,p,W),ni.upload(v,YM.uniformsList,Ae,CM)),f.isShaderMaterial&&f.uniformsNeedUpdate===!0&&(ni.upload(v,YM.uniformsList,Ae,CM),f.uniformsNeedUpdate=!1),f.isSpriteMaterial&&jD.setValue(v,"center",R.center),jD.setValue(v,"modelViewMatrix",R.modelViewMatrix),jD.setValue(v,"normalMatrix",R.normalMatrix),jD.setValue(v,"modelMatrix",R.matrixWorld),f.isShaderMaterial||f.isRawShaderMaterial){const YD=f.uniformsGroups;for(let Ez=0,aj=YD.length;Ez<aj;Ez++)if(rM.isWebGL2){const ET=YD[Ez];yM.update(ET,ie),yM.bind(ET,ie)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ie}function jj(x,k){x.ambientLightColor.needsUpdate=k,x.lightProbe.needsUpdate=k,x.directionalLights.needsUpdate=k,x.directionalLightShadows.needsUpdate=k,x.pointLights.needsUpdate=k,x.pointLightShadows.needsUpdate=k,x.spotLights.needsUpdate=k,x.spotLightShadows.needsUpdate=k,x.rectAreaLights.needsUpdate=k,x.hemisphereLights.needsUpdate=k}function yj(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return a},this.setRenderTargetTextures=function(x,k,b){EM.get(x.texture).__webglTexture=k,EM.get(x.depthTexture).__webglTexture=b;const f=EM.get(x);f.__hasExternalTextures=!0,f.__hasExternalTextures&&(f.__autoAllocateDepthBuffer=b===void 0,f.__autoAllocateDepthBuffer||sM.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),f.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(x,k){const b=EM.get(x);b.__webglFramebuffer=k,b.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(x,k=0,b=0){a=x,y=k,w=b;let f=!0,R=null,jM=!1,wM=!1;if(x){const hM=EM.get(x);hM.__useDefaultFramebuffer!==void 0?(nM.bindFramebuffer(v.FRAMEBUFFER,null),f=!1):hM.__webglFramebuffer===void 0?CM.setupRenderTarget(x):hM.__hasExternalTextures&&CM.rebindTextures(x,EM.get(x.texture).__webglTexture,EM.get(x.depthTexture).__webglTexture);const UM=x.texture;(UM.isData3DTexture||UM.isDataArrayTexture||UM.isCompressedArrayTexture)&&(wM=!0);const dM=EM.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(R=dM[k],jM=!0):rM.isWebGL2&&x.samples>0&&CM.useMultisampledRTT(x)===!1?R=EM.get(x).__webglMultisampledFramebuffer:R=dM,h.copy(x.viewport),d.copy(x.scissor),L=x.scissorTest}else h.copy(m).multiplyScalar(B).floor(),d.copy(Z).multiplyScalar(B).floor(),L=H;if(nM.bindFramebuffer(v.FRAMEBUFFER,R)&&rM.drawBuffers&&f&&nM.drawBuffers(x,R),nM.viewport(h),nM.scissor(d),nM.setScissorTest(L),jM){const hM=EM.get(x.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+k,hM.__webglTexture,b)}else if(wM){const hM=EM.get(x.texture),UM=k||0;v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,hM.__webglTexture,b||0,UM)}o=-1},this.readRenderTargetPixels=function(x,k,b,f,R,jM,wM){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let lM=EM.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&wM!==void 0&&(lM=lM[wM]),lM){nM.bindFramebuffer(v.FRAMEBUFFER,lM);try{const hM=x.texture,UM=hM.format,dM=hM.type;if(UM!==PD&&AM.convert(UM)!==v.getParameter(v.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const vM=dM===tN&&(sM.has("EXT_color_buffer_half_float")||rM.isWebGL2&&sM.has("EXT_color_buffer_float"));if(dM!==kt&&AM.convert(dM)!==v.getParameter(v.IMPLEMENTATION_COLOR_READ_TYPE)&&!(dM===Zt&&(rM.isWebGL2||sM.has("OES_texture_float")||sM.has("WEBGL_color_buffer_float")))&&!vM){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=x.width-f&&b>=0&&b<=x.height-R&&v.readPixels(k,b,f,R,AM.convert(UM),AM.convert(dM),jM)}finally{const hM=a!==null?EM.get(a).__webglFramebuffer:null;nM.bindFramebuffer(v.FRAMEBUFFER,hM)}}},this.copyFramebufferToTexture=function(x,k,b=0){const f=Math.pow(2,-b),R=Math.floor(k.image.width*f),jM=Math.floor(k.image.height*f);CM.setTexture2D(k,0),v.copyTexSubImage2D(v.TEXTURE_2D,b,0,0,x.x,x.y,R,jM),nM.unbindTexture()},this.copyTextureToTexture=function(x,k,b,f=0){const R=k.image.width,jM=k.image.height,wM=AM.convert(b.format),lM=AM.convert(b.type);CM.setTexture2D(b,0),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,b.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,b.unpackAlignment),k.isDataTexture?v.texSubImage2D(v.TEXTURE_2D,f,x.x,x.y,R,jM,wM,lM,k.image.data):k.isCompressedTexture?v.compressedTexSubImage2D(v.TEXTURE_2D,f,x.x,x.y,k.mipmaps[0].width,k.mipmaps[0].height,wM,k.mipmaps[0].data):v.texSubImage2D(v.TEXTURE_2D,f,x.x,x.y,wM,lM,k.image),f===0&&b.generateMipmaps&&v.generateMipmap(v.TEXTURE_2D),nM.unbindTexture()},this.copyTextureToTexture3D=function(x,k,b,f,R=0){if(r.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const jM=x.max.x-x.min.x+1,wM=x.max.y-x.min.y+1,lM=x.max.z-x.min.z+1,hM=AM.convert(f.format),UM=AM.convert(f.type);let dM;if(f.isData3DTexture)CM.setTexture3D(f,0),dM=v.TEXTURE_3D;else if(f.isDataArrayTexture)CM.setTexture2DArray(f,0),dM=v.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,f.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,f.unpackAlignment);const vM=v.getParameter(v.UNPACK_ROW_LENGTH),FM=v.getParameter(v.UNPACK_IMAGE_HEIGHT),vD=v.getParameter(v.UNPACK_SKIP_PIXELS),Lt=v.getParameter(v.UNPACK_SKIP_ROWS),Ne=v.getParameter(v.UNPACK_SKIP_IMAGES),BM=b.isCompressedTexture?b.mipmaps[0]:b.image;v.pixelStorei(v.UNPACK_ROW_LENGTH,BM.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,BM.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,x.min.x),v.pixelStorei(v.UNPACK_SKIP_ROWS,x.min.y),v.pixelStorei(v.UNPACK_SKIP_IMAGES,x.min.z),b.isDataTexture||b.isData3DTexture?v.texSubImage3D(dM,R,k.x,k.y,k.z,jM,wM,lM,hM,UM,BM.data):b.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),v.compressedTexSubImage3D(dM,R,k.x,k.y,k.z,jM,wM,lM,hM,BM.data)):v.texSubImage3D(dM,R,k.x,k.y,k.z,jM,wM,lM,hM,UM,BM),v.pixelStorei(v.UNPACK_ROW_LENGTH,vM),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,FM),v.pixelStorei(v.UNPACK_SKIP_PIXELS,vD),v.pixelStorei(v.UNPACK_SKIP_ROWS,Lt),v.pixelStorei(v.UNPACK_SKIP_IMAGES,Ne),R===0&&f.generateMipmaps&&v.generateMipmap(dM),nM.unbindTexture()},this.initTexture=function(x){x.isCubeTexture?CM.setTextureCube(x,0):x.isData3DTexture?CM.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?CM.setTexture2DArray(x,0):CM.setTexture2D(x,0),nM.unbindTexture()},this.resetState=function(){y=0,w=0,a=null,nM.reset(),V.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class Ur extends yD{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(M,D){return super.copy(M,D),M.background!==null&&(this.background=M.background.clone()),M.environment!==null&&(this.environment=M.environment.clone()),M.fog!==null&&(this.fog=M.fog.clone()),this.backgroundBlurriness=M.backgroundBlurriness,this.backgroundIntensity=M.backgroundIntensity,M.overrideMaterial!==null&&(this.overrideMaterial=M.overrideMaterial.clone()),this.matrixAutoUpdate=M.matrixAutoUpdate,this}toJSON(M){const D=super.toJSON(M);return this.fog!==null&&(D.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(D.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(D.object.backgroundIntensity=this.backgroundIntensity),D}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(M){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=M}}class fr extends BD{constructor(M,D,t,e,i,z,A,I,n){super(M,D,t,e,i,z,A,I,n),this.isVideoTexture=!0,this.minFilter=z!==void 0?z:aD,this.magFilter=i!==void 0?i:aD,this.generateMipmaps=!1;const T=this;function u(){T.needsUpdate=!0,M.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in M&&M.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const M=this.image;"requestVideoFrameCallback"in M===!1&&M.readyState>=M.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pI="149",_A=0,mr=1,UI=1,Qr=100,kr=204,Sr=205,Zr=3,fI=0,mI=300,QI=1e3,Ii=1001,kI=1002,_r=1006,br=1008,Kr=1009,Rr=1023,Pr=3e3,Fr=0,Tt="srgb",bA="srgb-linear",KA=7680,Br=519,SI=35044;class Ti{addEventListener(M,D){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[M]===void 0&&(t[M]=[]),t[M].indexOf(D)===-1&&t[M].push(D)}hasEventListener(M,D){if(this._listeners===void 0)return!1;const t=this._listeners;return t[M]!==void 0&&t[M].indexOf(D)!==-1}removeEventListener(M,D){if(this._listeners===void 0)return;const e=this._listeners[M];if(e!==void 0){const i=e.indexOf(D);i!==-1&&e.splice(i,1)}}dispatchEvent(M){if(this._listeners===void 0)return;const t=this._listeners[M.type];if(t!==void 0){M.target=this;const e=t.slice(0);for(let i=0,z=e.length;i<z;i++)e[i].call(this,M);M.target=null}}}const AD=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];function cN(){const N=Math.random()*4294967295|0,M=Math.random()*4294967295|0,D=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(AD[N&255]+AD[N>>8&255]+AD[N>>16&255]+AD[N>>24&255]+"-"+AD[M&255]+AD[M>>8&255]+"-"+AD[M>>16&15|64]+AD[M>>24&255]+"-"+AD[D&63|128]+AD[D>>8&255]+"-"+AD[D>>16&255]+AD[D>>24&255]+AD[t&255]+AD[t>>8&255]+AD[t>>16&255]+AD[t>>24&255]).toLowerCase()}function OD(N,M,D){return Math.max(M,Math.min(D,N))}function Gr(N,M){return(N%M+M)%M}function RA(N,M,D){return(1-D)*N+D*M}function ui(N,M){switch(M.constructor){case Float32Array:return N;case Uint16Array:return N/65535;case Uint8Array:return N/255;case Int16Array:return Math.max(N/32767,-1);case Int8Array:return Math.max(N/127,-1);default:throw new Error("Invalid component type.")}}function ED(N,M){switch(M.constructor){case Float32Array:return N;case Uint16Array:return Math.round(N*65535);case Uint8Array:return Math.round(N*255);case Int16Array:return Math.round(N*32767);case Int8Array:return Math.round(N*127);default:throw new Error("Invalid component type.")}}class sD{constructor(M=0,D=0){sD.prototype.isVector2=!0,this.x=M,this.y=D}get width(){return this.x}set width(M){this.x=M}get height(){return this.y}set height(M){this.y=M}set(M,D){return this.x=M,this.y=D,this}setScalar(M){return this.x=M,this.y=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y)}copy(M){return this.x=M.x,this.y=M.y,this}add(M){return this.x+=M.x,this.y+=M.y,this}addScalar(M){return this.x+=M,this.y+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this}subScalar(M){return this.x-=M,this.y-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this}multiply(M){return this.x*=M.x,this.y*=M.y,this}multiplyScalar(M){return this.x*=M,this.y*=M,this}divide(M){return this.x/=M.x,this.y/=M.y,this}divideScalar(M){return this.multiplyScalar(1/M)}applyMatrix3(M){const D=this.x,t=this.y,e=M.elements;return this.x=e[0]*D+e[3]*t+e[6],this.y=e[1]*D+e[4]*t+e[7],this}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(M){return this.x*M.x+this.y*M.y}cross(M){return this.x*M.y-this.y*M.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(M){return Math.sqrt(this.distanceToSquared(M))}distanceToSquared(M){const D=this.x-M.x,t=this.y-M.y;return D*D+t*t}manhattanDistanceTo(M){return Math.abs(this.x-M.x)+Math.abs(this.y-M.y)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this}equals(M){return M.x===this.x&&M.y===this.y}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this}rotateAround(M,D){const t=Math.cos(D),e=Math.sin(D),i=this.x-M.x,z=this.y-M.y;return this.x=i*t-z*e+M.x,this.y=i*e+z*t+M.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(M,D,t,e,i,z,A,I,n){const T=this.elements;return T[0]=M,T[1]=e,T[2]=A,T[3]=D,T[4]=i,T[5]=I,T[6]=t,T[7]=z,T[8]=n,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(M){const D=this.elements,t=M.elements;return D[0]=t[0],D[1]=t[1],D[2]=t[2],D[3]=t[3],D[4]=t[4],D[5]=t[5],D[6]=t[6],D[7]=t[7],D[8]=t[8],this}extractBasis(M,D,t){return M.setFromMatrix3Column(this,0),D.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(M){const D=M.elements;return this.set(D[0],D[4],D[8],D[1],D[5],D[9],D[2],D[6],D[10]),this}multiply(M){return this.multiplyMatrices(this,M)}premultiply(M){return this.multiplyMatrices(M,this)}multiplyMatrices(M,D){const t=M.elements,e=D.elements,i=this.elements,z=t[0],A=t[3],I=t[6],n=t[1],T=t[4],u=t[7],g=t[2],s=t[5],j=t[8],r=e[0],c=e[3],y=e[6],w=e[1],a=e[4],o=e[7],O=e[2],h=e[5],d=e[8];return i[0]=z*r+A*w+I*O,i[3]=z*c+A*a+I*h,i[6]=z*y+A*o+I*d,i[1]=n*r+T*w+u*O,i[4]=n*c+T*a+u*h,i[7]=n*y+T*o+u*d,i[2]=g*r+s*w+j*O,i[5]=g*c+s*a+j*h,i[8]=g*y+s*o+j*d,this}multiplyScalar(M){const D=this.elements;return D[0]*=M,D[3]*=M,D[6]*=M,D[1]*=M,D[4]*=M,D[7]*=M,D[2]*=M,D[5]*=M,D[8]*=M,this}determinant(){const M=this.elements,D=M[0],t=M[1],e=M[2],i=M[3],z=M[4],A=M[5],I=M[6],n=M[7],T=M[8];return D*z*T-D*A*n-t*i*T+t*A*I+e*i*n-e*z*I}invert(){const M=this.elements,D=M[0],t=M[1],e=M[2],i=M[3],z=M[4],A=M[5],I=M[6],n=M[7],T=M[8],u=T*z-A*n,g=A*I-T*i,s=n*i-z*I,j=D*u+t*g+e*s;if(j===0)return this.set(0,0,0,0,0,0,0,0,0);const r=1/j;return M[0]=u*r,M[1]=(e*n-T*t)*r,M[2]=(A*t-e*z)*r,M[3]=g*r,M[4]=(T*D-e*I)*r,M[5]=(e*i-A*D)*r,M[6]=s*r,M[7]=(t*I-n*D)*r,M[8]=(z*D-t*i)*r,this}transpose(){let M;const D=this.elements;return M=D[1],D[1]=D[3],D[3]=M,M=D[2],D[2]=D[6],D[6]=M,M=D[5],D[5]=D[7],D[7]=M,this}getNormalMatrix(M){return this.setFromMatrix4(M).invert().transpose()}transposeIntoArray(M){const D=this.elements;return M[0]=D[0],M[1]=D[3],M[2]=D[6],M[3]=D[1],M[4]=D[4],M[5]=D[7],M[6]=D[2],M[7]=D[5],M[8]=D[8],this}setUvTransform(M,D,t,e,i,z,A){const I=Math.cos(i),n=Math.sin(i);return this.set(t*I,t*n,-t*(I*z+n*A)+z+M,-e*n,e*I,-e*(-n*z+I*A)+A+D,0,0,1),this}scale(M,D){return this.premultiply(PA.makeScale(M,D)),this}rotate(M){return this.premultiply(PA.makeRotation(-M)),this}translate(M,D){return this.premultiply(PA.makeTranslation(M,D)),this}makeTranslation(M,D){return this.set(1,0,M,0,1,D,0,0,1),this}makeRotation(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,-t,0,t,D,0,0,0,1),this}makeScale(M,D){return this.set(M,0,0,0,D,0,0,0,1),this}equals(M){const D=this.elements,t=M.elements;for(let e=0;e<9;e++)if(D[e]!==t[e])return!1;return!0}fromArray(M,D=0){for(let t=0;t<9;t++)this.elements[t]=M[t+D];return this}toArray(M=[],D=0){const t=this.elements;return M[D]=t[0],M[D+1]=t[1],M[D+2]=t[2],M[D+3]=t[3],M[D+4]=t[4],M[D+5]=t[5],M[D+6]=t[6],M[D+7]=t[7],M[D+8]=t[8],M}clone(){return new this.constructor().fromArray(this.elements)}}const PA=new Qe;function Vr(N){for(let M=N.length-1;M>=0;--M)if(N[M]>=65535)return!0;return!1}function ZI(N){return document.createElementNS("http://www.w3.org/1999/xhtml",N)}function Xt(N){return N<.04045?N*.0773993808:Math.pow(N*.9478672986+.0521327014,2.4)}function gi(N){return N<.0031308?N*12.92:1.055*Math.pow(N,.41666)-.055}const FA={[Tt]:{[bA]:Xt},[bA]:{[Tt]:gi}},rD={legacyMode:!0,get workingColorSpace(){return bA},set workingColorSpace(N){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(N,M,D){if(this.legacyMode||M===D||!M||!D)return N;if(FA[M]&&FA[M][D]!==void 0){const t=FA[M][D];return N.r=t(N.r),N.g=t(N.g),N.b=t(N.b),N}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(N,M){return this.convert(N,this.workingColorSpace,M)},toWorkingColorSpace:function(N,M){return this.convert(N,M,this.workingColorSpace)}},_I={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},WM={r:0,g:0,b:0},VD={h:0,s:0,l:0},si={h:0,s:0,l:0};function BA(N,M,D){return D<0&&(D+=1),D>1&&(D-=1),D<1/6?N+(M-N)*6*D:D<1/2?M:D<2/3?N+(M-N)*6*(2/3-D):N}function ri(N,M){return M.r=N.r,M.g=N.g,M.b=N.b,M}class Yt{constructor(M,D,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,D===void 0&&t===void 0?this.set(M):this.setRGB(M,D,t)}set(M){return M&&M.isColor?this.copy(M):typeof M=="number"?this.setHex(M):typeof M=="string"&&this.setStyle(M),this}setScalar(M){return this.r=M,this.g=M,this.b=M,this}setHex(M,D=Tt){return M=Math.floor(M),this.r=(M>>16&255)/255,this.g=(M>>8&255)/255,this.b=(M&255)/255,rD.toWorkingColorSpace(this,D),this}setRGB(M,D,t,e=rD.workingColorSpace){return this.r=M,this.g=D,this.b=t,rD.toWorkingColorSpace(this,e),this}setHSL(M,D,t,e=rD.workingColorSpace){if(M=Gr(M,1),D=OD(D,0,1),t=OD(t,0,1),D===0)this.r=this.g=this.b=t;else{const i=t<=.5?t*(1+D):t+D-t*D,z=2*t-i;this.r=BA(z,i,M+1/3),this.g=BA(z,i,M),this.b=BA(z,i,M-1/3)}return rD.toWorkingColorSpace(this,e),this}setStyle(M,D=Tt){function t(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+M+" will be ignored.")}let e;if(e=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(M)){let i;const z=e[1],A=e[2];switch(z){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))return this.r=Math.min(255,parseInt(i[1],10))/255,this.g=Math.min(255,parseInt(i[2],10))/255,this.b=Math.min(255,parseInt(i[3],10))/255,rD.toWorkingColorSpace(this,D),t(i[4]),this;if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))return this.r=Math.min(100,parseInt(i[1],10))/100,this.g=Math.min(100,parseInt(i[2],10))/100,this.b=Math.min(100,parseInt(i[3],10))/100,rD.toWorkingColorSpace(this,D),t(i[4]),this;break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A)){const I=parseFloat(i[1])/360,n=parseFloat(i[2])/100,T=parseFloat(i[3])/100;return t(i[4]),this.setHSL(I,n,T,D)}break}}else if(e=/^\#([A-Fa-f\d]+)$/.exec(M)){const i=e[1],z=i.length;if(z===3)return this.r=parseInt(i.charAt(0)+i.charAt(0),16)/255,this.g=parseInt(i.charAt(1)+i.charAt(1),16)/255,this.b=parseInt(i.charAt(2)+i.charAt(2),16)/255,rD.toWorkingColorSpace(this,D),this;if(z===6)return this.r=parseInt(i.charAt(0)+i.charAt(1),16)/255,this.g=parseInt(i.charAt(2)+i.charAt(3),16)/255,this.b=parseInt(i.charAt(4)+i.charAt(5),16)/255,rD.toWorkingColorSpace(this,D),this}return M&&M.length>0?this.setColorName(M,D):this}setColorName(M,D=Tt){const t=_I[M.toLowerCase()];return t!==void 0?this.setHex(t,D):console.warn("THREE.Color: Unknown color "+M),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(M){return this.r=M.r,this.g=M.g,this.b=M.b,this}copySRGBToLinear(M){return this.r=Xt(M.r),this.g=Xt(M.g),this.b=Xt(M.b),this}copyLinearToSRGB(M){return this.r=gi(M.r),this.g=gi(M.g),this.b=gi(M.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(M=Tt){return rD.fromWorkingColorSpace(ri(this,WM),M),OD(WM.r*255,0,255)<<16^OD(WM.g*255,0,255)<<8^OD(WM.b*255,0,255)<<0}getHexString(M=Tt){return("000000"+this.getHex(M).toString(16)).slice(-6)}getHSL(M,D=rD.workingColorSpace){rD.fromWorkingColorSpace(ri(this,WM),D);const t=WM.r,e=WM.g,i=WM.b,z=Math.max(t,e,i),A=Math.min(t,e,i);let I,n;const T=(A+z)/2;if(A===z)I=0,n=0;else{const u=z-A;switch(n=T<=.5?u/(z+A):u/(2-z-A),z){case t:I=(e-i)/u+(e<i?6:0);break;case e:I=(i-t)/u+2;break;case i:I=(t-e)/u+4;break}I/=6}return M.h=I,M.s=n,M.l=T,M}getRGB(M,D=rD.workingColorSpace){return rD.fromWorkingColorSpace(ri(this,WM),D),M.r=WM.r,M.g=WM.g,M.b=WM.b,M}getStyle(M=Tt){return rD.fromWorkingColorSpace(ri(this,WM),M),M!==Tt?`color(${M} ${WM.r} ${WM.g} ${WM.b})`:`rgb(${WM.r*255|0},${WM.g*255|0},${WM.b*255|0})`}offsetHSL(M,D,t){return this.getHSL(VD),VD.h+=M,VD.s+=D,VD.l+=t,this.setHSL(VD.h,VD.s,VD.l),this}add(M){return this.r+=M.r,this.g+=M.g,this.b+=M.b,this}addColors(M,D){return this.r=M.r+D.r,this.g=M.g+D.g,this.b=M.b+D.b,this}addScalar(M){return this.r+=M,this.g+=M,this.b+=M,this}sub(M){return this.r=Math.max(0,this.r-M.r),this.g=Math.max(0,this.g-M.g),this.b=Math.max(0,this.b-M.b),this}multiply(M){return this.r*=M.r,this.g*=M.g,this.b*=M.b,this}multiplyScalar(M){return this.r*=M,this.g*=M,this.b*=M,this}lerp(M,D){return this.r+=(M.r-this.r)*D,this.g+=(M.g-this.g)*D,this.b+=(M.b-this.b)*D,this}lerpColors(M,D,t){return this.r=M.r+(D.r-M.r)*t,this.g=M.g+(D.g-M.g)*t,this.b=M.b+(D.b-M.b)*t,this}lerpHSL(M,D){this.getHSL(VD),M.getHSL(si);const t=RA(VD.h,si.h,D),e=RA(VD.s,si.s,D),i=RA(VD.l,si.l,D);return this.setHSL(t,e,i),this}equals(M){return M.r===this.r&&M.g===this.g&&M.b===this.b}fromArray(M,D=0){return this.r=M[D],this.g=M[D+1],this.b=M[D+2],this}toArray(M=[],D=0){return M[D]=this.r,M[D+1]=this.g,M[D+2]=this.b,M}fromBufferAttribute(M,D){return this.r=M.getX(D),this.g=M.getY(D),this.b=M.getZ(D),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}Yt.NAMES=_I;let ke;class Hr{static getDataURL(M){if(/^data:/i.test(M.src)||typeof HTMLCanvasElement>"u")return M.src;let D;if(M instanceof HTMLCanvasElement)D=M;else{ke===void 0&&(ke=ZI("canvas")),ke.width=M.width,ke.height=M.height;const t=ke.getContext("2d");M instanceof ImageData?t.putImageData(M,0,0):t.drawImage(M,0,0,M.width,M.height),D=ke}return D.width>2048||D.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",M),D.toDataURL("image/jpeg",.6)):D.toDataURL("image/png")}static sRGBToLinear(M){if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const D=ZI("canvas");D.width=M.width,D.height=M.height;const t=D.getContext("2d");t.drawImage(M,0,0,M.width,M.height);const e=t.getImageData(0,0,M.width,M.height),i=e.data;for(let z=0;z<i.length;z++)i[z]=Xt(i[z]/255)*255;return t.putImageData(e,0,0),D}else if(M.data){const D=M.data.slice(0);for(let t=0;t<D.length;t++)D instanceof Uint8Array||D instanceof Uint8ClampedArray?D[t]=Math.floor(Xt(D[t]/255)*255):D[t]=Xt(D[t]);return{data:D,width:M.width,height:M.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),M}}class Wr{constructor(M=null){this.isSource=!0,this.uuid=cN(),this.data=M,this.version=0}set needsUpdate(M){M===!0&&this.version++}toJSON(M){const D=M===void 0||typeof M=="string";if(!D&&M.images[this.uuid]!==void 0)return M.images[this.uuid];const t={uuid:this.uuid,url:""},e=this.data;if(e!==null){let i;if(Array.isArray(e)){i=[];for(let z=0,A=e.length;z<A;z++)e[z].isDataTexture?i.push(GA(e[z].image)):i.push(GA(e[z]))}else i=GA(e);t.url=i}return D||(M.images[this.uuid]=t),t}}function GA(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap?Hr.getDataURL(N):N.data?{data:Array.from(N.data),width:N.width,height:N.height,type:N.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xr=0;class qt extends Ti{constructor(M=qt.DEFAULT_IMAGE,D=qt.DEFAULT_MAPPING,t=Ii,e=Ii,i=_r,z=br,A=Rr,I=Kr,n=qt.DEFAULT_ANISOTROPY,T=Pr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xr++}),this.uuid=cN(),this.name="",this.source=new Wr(M),this.mipmaps=[],this.mapping=D,this.wrapS=t,this.wrapT=e,this.magFilter=i,this.minFilter=z,this.anisotropy=n,this.format=A,this.internalFormat=null,this.type=I,this.offset=new sD(0,0),this.repeat=new sD(1,1),this.center=new sD(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=T,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(M){this.source.data=M}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(M){return this.name=M.name,this.source=M.source,this.mipmaps=M.mipmaps.slice(0),this.mapping=M.mapping,this.wrapS=M.wrapS,this.wrapT=M.wrapT,this.magFilter=M.magFilter,this.minFilter=M.minFilter,this.anisotropy=M.anisotropy,this.format=M.format,this.internalFormat=M.internalFormat,this.type=M.type,this.offset.copy(M.offset),this.repeat.copy(M.repeat),this.center.copy(M.center),this.rotation=M.rotation,this.matrixAutoUpdate=M.matrixAutoUpdate,this.matrix.copy(M.matrix),this.generateMipmaps=M.generateMipmaps,this.premultiplyAlpha=M.premultiplyAlpha,this.flipY=M.flipY,this.unpackAlignment=M.unpackAlignment,this.encoding=M.encoding,this.userData=JSON.parse(JSON.stringify(M.userData)),this.needsUpdate=!0,this}toJSON(M){const D=M===void 0||typeof M=="string";if(!D&&M.textures[this.uuid]!==void 0)return M.textures[this.uuid];const t={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(M).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),D||(M.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(M){if(this.mapping!==mI)return M;if(M.applyMatrix3(this.matrix),M.x<0||M.x>1)switch(this.wrapS){case QI:M.x=M.x-Math.floor(M.x);break;case Ii:M.x=M.x<0?0:1;break;case kI:Math.abs(Math.floor(M.x)%2)===1?M.x=Math.ceil(M.x)-M.x:M.x=M.x-Math.floor(M.x);break}if(M.y<0||M.y>1)switch(this.wrapT){case QI:M.y=M.y-Math.floor(M.y);break;case Ii:M.y=M.y<0?0:1;break;case kI:Math.abs(Math.floor(M.y)%2)===1?M.y=Math.ceil(M.y)-M.y:M.y=M.y-Math.floor(M.y);break}return this.flipY&&(M.y=1-M.y),M}set needsUpdate(M){M===!0&&(this.version++,this.source.needsUpdate=!0)}}qt.DEFAULT_IMAGE=null,qt.DEFAULT_MAPPING=mI,qt.DEFAULT_ANISOTROPY=1;class jN{constructor(M=0,D=0,t=0,e=1){this.isQuaternion=!0,this._x=M,this._y=D,this._z=t,this._w=e}static slerpFlat(M,D,t,e,i,z,A){let I=t[e+0],n=t[e+1],T=t[e+2],u=t[e+3];const g=i[z+0],s=i[z+1],j=i[z+2],r=i[z+3];if(A===0){M[D+0]=I,M[D+1]=n,M[D+2]=T,M[D+3]=u;return}if(A===1){M[D+0]=g,M[D+1]=s,M[D+2]=j,M[D+3]=r;return}if(u!==r||I!==g||n!==s||T!==j){let c=1-A;const y=I*g+n*s+T*j+u*r,w=y>=0?1:-1,a=1-y*y;if(a>Number.EPSILON){const O=Math.sqrt(a),h=Math.atan2(O,y*w);c=Math.sin(c*h)/O,A=Math.sin(A*h)/O}const o=A*w;if(I=I*c+g*o,n=n*c+s*o,T=T*c+j*o,u=u*c+r*o,c===1-A){const O=1/Math.sqrt(I*I+n*n+T*T+u*u);I*=O,n*=O,T*=O,u*=O}}M[D]=I,M[D+1]=n,M[D+2]=T,M[D+3]=u}static multiplyQuaternionsFlat(M,D,t,e,i,z){const A=t[e],I=t[e+1],n=t[e+2],T=t[e+3],u=i[z],g=i[z+1],s=i[z+2],j=i[z+3];return M[D]=A*j+T*u+I*s-n*g,M[D+1]=I*j+T*g+n*u-A*s,M[D+2]=n*j+T*s+A*g-I*u,M[D+3]=T*j-A*u-I*g-n*s,M}get x(){return this._x}set x(M){this._x=M,this._onChangeCallback()}get y(){return this._y}set y(M){this._y=M,this._onChangeCallback()}get z(){return this._z}set z(M){this._z=M,this._onChangeCallback()}get w(){return this._w}set w(M){this._w=M,this._onChangeCallback()}set(M,D,t,e){return this._x=M,this._y=D,this._z=t,this._w=e,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(M){return this._x=M.x,this._y=M.y,this._z=M.z,this._w=M.w,this._onChangeCallback(),this}setFromEuler(M,D){const t=M._x,e=M._y,i=M._z,z=M._order,A=Math.cos,I=Math.sin,n=A(t/2),T=A(e/2),u=A(i/2),g=I(t/2),s=I(e/2),j=I(i/2);switch(z){case"XYZ":this._x=g*T*u+n*s*j,this._y=n*s*u-g*T*j,this._z=n*T*j+g*s*u,this._w=n*T*u-g*s*j;break;case"YXZ":this._x=g*T*u+n*s*j,this._y=n*s*u-g*T*j,this._z=n*T*j-g*s*u,this._w=n*T*u+g*s*j;break;case"ZXY":this._x=g*T*u-n*s*j,this._y=n*s*u+g*T*j,this._z=n*T*j+g*s*u,this._w=n*T*u-g*s*j;break;case"ZYX":this._x=g*T*u-n*s*j,this._y=n*s*u+g*T*j,this._z=n*T*j-g*s*u,this._w=n*T*u+g*s*j;break;case"YZX":this._x=g*T*u+n*s*j,this._y=n*s*u+g*T*j,this._z=n*T*j-g*s*u,this._w=n*T*u-g*s*j;break;case"XZY":this._x=g*T*u-n*s*j,this._y=n*s*u-g*T*j,this._z=n*T*j+g*s*u,this._w=n*T*u+g*s*j;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+z)}return D!==!1&&this._onChangeCallback(),this}setFromAxisAngle(M,D){const t=D/2,e=Math.sin(t);return this._x=M.x*e,this._y=M.y*e,this._z=M.z*e,this._w=Math.cos(t),this._onChangeCallback(),this}setFromRotationMatrix(M){const D=M.elements,t=D[0],e=D[4],i=D[8],z=D[1],A=D[5],I=D[9],n=D[2],T=D[6],u=D[10],g=t+A+u;if(g>0){const s=.5/Math.sqrt(g+1);this._w=.25/s,this._x=(T-I)*s,this._y=(i-n)*s,this._z=(z-e)*s}else if(t>A&&t>u){const s=2*Math.sqrt(1+t-A-u);this._w=(T-I)/s,this._x=.25*s,this._y=(e+z)/s,this._z=(i+n)/s}else if(A>u){const s=2*Math.sqrt(1+A-t-u);this._w=(i-n)/s,this._x=(e+z)/s,this._y=.25*s,this._z=(I+T)/s}else{const s=2*Math.sqrt(1+u-t-A);this._w=(z-e)/s,this._x=(i+n)/s,this._y=(I+T)/s,this._z=.25*s}return this._onChangeCallback(),this}setFromUnitVectors(M,D){let t=M.dot(D)+1;return t<Number.EPSILON?(t=0,Math.abs(M.x)>Math.abs(M.z)?(this._x=-M.y,this._y=M.x,this._z=0,this._w=t):(this._x=0,this._y=-M.z,this._z=M.y,this._w=t)):(this._x=M.y*D.z-M.z*D.y,this._y=M.z*D.x-M.x*D.z,this._z=M.x*D.y-M.y*D.x,this._w=t),this.normalize()}angleTo(M){return 2*Math.acos(Math.abs(OD(this.dot(M),-1,1)))}rotateTowards(M,D){const t=this.angleTo(M);if(t===0)return this;const e=Math.min(1,D/t);return this.slerp(M,e),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(M){return this._x*M._x+this._y*M._y+this._z*M._z+this._w*M._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let M=this.length();return M===0?(this._x=0,this._y=0,this._z=0,this._w=1):(M=1/M,this._x=this._x*M,this._y=this._y*M,this._z=this._z*M,this._w=this._w*M),this._onChangeCallback(),this}multiply(M){return this.multiplyQuaternions(this,M)}premultiply(M){return this.multiplyQuaternions(M,this)}multiplyQuaternions(M,D){const t=M._x,e=M._y,i=M._z,z=M._w,A=D._x,I=D._y,n=D._z,T=D._w;return this._x=t*T+z*A+e*n-i*I,this._y=e*T+z*I+i*A-t*n,this._z=i*T+z*n+t*I-e*A,this._w=z*T-t*A-e*I-i*n,this._onChangeCallback(),this}slerp(M,D){if(D===0)return this;if(D===1)return this.copy(M);const t=this._x,e=this._y,i=this._z,z=this._w;let A=z*M._w+t*M._x+e*M._y+i*M._z;if(A<0?(this._w=-M._w,this._x=-M._x,this._y=-M._y,this._z=-M._z,A=-A):this.copy(M),A>=1)return this._w=z,this._x=t,this._y=e,this._z=i,this;const I=1-A*A;if(I<=Number.EPSILON){const s=1-D;return this._w=s*z+D*this._w,this._x=s*t+D*this._x,this._y=s*e+D*this._y,this._z=s*i+D*this._z,this.normalize(),this._onChangeCallback(),this}const n=Math.sqrt(I),T=Math.atan2(n,A),u=Math.sin((1-D)*T)/n,g=Math.sin(D*T)/n;return this._w=z*u+this._w*g,this._x=t*u+this._x*g,this._y=e*u+this._y*g,this._z=i*u+this._z*g,this._onChangeCallback(),this}slerpQuaternions(M,D,t){return this.copy(M).slerp(D,t)}random(){const M=Math.random(),D=Math.sqrt(1-M),t=Math.sqrt(M),e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random();return this.set(D*Math.cos(e),t*Math.sin(i),t*Math.cos(i),D*Math.sin(e))}equals(M){return M._x===this._x&&M._y===this._y&&M._z===this._z&&M._w===this._w}fromArray(M,D=0){return this._x=M[D],this._y=M[D+1],this._z=M[D+2],this._w=M[D+3],this._onChangeCallback(),this}toArray(M=[],D=0){return M[D]=this._x,M[D+1]=this._y,M[D+2]=this._z,M[D+3]=this._w,M}fromBufferAttribute(M,D){return this._x=M.getX(D),this._y=M.getY(D),this._z=M.getZ(D),this._w=M.getW(D),this}_onChange(M){return this._onChangeCallback=M,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(M=0,D=0,t=0){P.prototype.isVector3=!0,this.x=M,this.y=D,this.z=t}set(M,D,t){return t===void 0&&(t=this.z),this.x=M,this.y=D,this.z=t,this}setScalar(M){return this.x=M,this.y=M,this.z=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setZ(M){return this.z=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;case 2:this.z=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(M){return this.x=M.x,this.y=M.y,this.z=M.z,this}add(M){return this.x+=M.x,this.y+=M.y,this.z+=M.z,this}addScalar(M){return this.x+=M,this.y+=M,this.z+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this.z=M.z+D.z,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this.z+=M.z*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this.z-=M.z,this}subScalar(M){return this.x-=M,this.y-=M,this.z-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this.z=M.z-D.z,this}multiply(M){return this.x*=M.x,this.y*=M.y,this.z*=M.z,this}multiplyScalar(M){return this.x*=M,this.y*=M,this.z*=M,this}multiplyVectors(M,D){return this.x=M.x*D.x,this.y=M.y*D.y,this.z=M.z*D.z,this}applyEuler(M){return this.applyQuaternion(bI.setFromEuler(M))}applyAxisAngle(M,D){return this.applyQuaternion(bI.setFromAxisAngle(M,D))}applyMatrix3(M){const D=this.x,t=this.y,e=this.z,i=M.elements;return this.x=i[0]*D+i[3]*t+i[6]*e,this.y=i[1]*D+i[4]*t+i[7]*e,this.z=i[2]*D+i[5]*t+i[8]*e,this}applyNormalMatrix(M){return this.applyMatrix3(M).normalize()}applyMatrix4(M){const D=this.x,t=this.y,e=this.z,i=M.elements,z=1/(i[3]*D+i[7]*t+i[11]*e+i[15]);return this.x=(i[0]*D+i[4]*t+i[8]*e+i[12])*z,this.y=(i[1]*D+i[5]*t+i[9]*e+i[13])*z,this.z=(i[2]*D+i[6]*t+i[10]*e+i[14])*z,this}applyQuaternion(M){const D=this.x,t=this.y,e=this.z,i=M.x,z=M.y,A=M.z,I=M.w,n=I*D+z*e-A*t,T=I*t+A*D-i*e,u=I*e+i*t-z*D,g=-i*D-z*t-A*e;return this.x=n*I+g*-i+T*-A-u*-z,this.y=T*I+g*-z+u*-i-n*-A,this.z=u*I+g*-A+n*-z-T*-i,this}project(M){return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix)}unproject(M){return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld)}transformDirection(M){const D=this.x,t=this.y,e=this.z,i=M.elements;return this.x=i[0]*D+i[4]*t+i[8]*e,this.y=i[1]*D+i[5]*t+i[9]*e,this.z=i[2]*D+i[6]*t+i[10]*e,this.normalize()}divide(M){return this.x/=M.x,this.y/=M.y,this.z/=M.z,this}divideScalar(M){return this.multiplyScalar(1/M)}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this.z=Math.min(this.z,M.z),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this.z=Math.max(this.z,M.z),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this.z=Math.max(M.z,Math.min(D.z,this.z)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this.z=Math.max(M,Math.min(D,this.z)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(M){return this.x*M.x+this.y*M.y+this.z*M.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this.z+=(M.z-this.z)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this.z=M.z+(D.z-M.z)*t,this}cross(M){return this.crossVectors(this,M)}crossVectors(M,D){const t=M.x,e=M.y,i=M.z,z=D.x,A=D.y,I=D.z;return this.x=e*I-i*A,this.y=i*z-t*I,this.z=t*A-e*z,this}projectOnVector(M){const D=M.lengthSq();if(D===0)return this.set(0,0,0);const t=M.dot(this)/D;return this.copy(M).multiplyScalar(t)}projectOnPlane(M){return VA.copy(this).projectOnVector(M),this.sub(VA)}reflect(M){return this.sub(VA.copy(M).multiplyScalar(2*this.dot(M)))}angleTo(M){const D=Math.sqrt(this.lengthSq()*M.lengthSq());if(D===0)return Math.PI/2;const t=this.dot(M)/D;return Math.acos(OD(t,-1,1))}distanceTo(M){return Math.sqrt(this.distanceToSquared(M))}distanceToSquared(M){const D=this.x-M.x,t=this.y-M.y,e=this.z-M.z;return D*D+t*t+e*e}manhattanDistanceTo(M){return Math.abs(this.x-M.x)+Math.abs(this.y-M.y)+Math.abs(this.z-M.z)}setFromSpherical(M){return this.setFromSphericalCoords(M.radius,M.phi,M.theta)}setFromSphericalCoords(M,D,t){const e=Math.sin(D)*M;return this.x=e*Math.sin(t),this.y=Math.cos(D)*M,this.z=e*Math.cos(t),this}setFromCylindrical(M){return this.setFromCylindricalCoords(M.radius,M.theta,M.y)}setFromCylindricalCoords(M,D,t){return this.x=M*Math.sin(D),this.y=t,this.z=M*Math.cos(D),this}setFromMatrixPosition(M){const D=M.elements;return this.x=D[12],this.y=D[13],this.z=D[14],this}setFromMatrixScale(M){const D=this.setFromMatrixColumn(M,0).length(),t=this.setFromMatrixColumn(M,1).length(),e=this.setFromMatrixColumn(M,2).length();return this.x=D,this.y=t,this.z=e,this}setFromMatrixColumn(M,D){return this.fromArray(M.elements,D*4)}setFromMatrix3Column(M,D){return this.fromArray(M.elements,D*3)}setFromEuler(M){return this.x=M._x,this.y=M._y,this.z=M._z,this}equals(M){return M.x===this.x&&M.y===this.y&&M.z===this.z}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this.z=M[D+2],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M[D+2]=this.z,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this.z=M.getZ(D),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const M=(Math.random()-.5)*2,D=Math.random()*Math.PI*2,t=Math.sqrt(1-M**2);return this.x=t*Math.cos(D),this.y=t*Math.sin(D),this.z=M,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const VA=new P,bI=new jN;class yN{constructor(M=new P(1/0,1/0,1/0),D=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=M,this.max=D}set(M,D){return this.min.copy(M),this.max.copy(D),this}setFromArray(M){let D=1/0,t=1/0,e=1/0,i=-1/0,z=-1/0,A=-1/0;for(let I=0,n=M.length;I<n;I+=3){const T=M[I],u=M[I+1],g=M[I+2];T<D&&(D=T),u<t&&(t=u),g<e&&(e=g),T>i&&(i=T),u>z&&(z=u),g>A&&(A=g)}return this.min.set(D,t,e),this.max.set(i,z,A),this}setFromBufferAttribute(M){let D=1/0,t=1/0,e=1/0,i=-1/0,z=-1/0,A=-1/0;for(let I=0,n=M.count;I<n;I++){const T=M.getX(I),u=M.getY(I),g=M.getZ(I);T<D&&(D=T),u<t&&(t=u),g<e&&(e=g),T>i&&(i=T),u>z&&(z=u),g>A&&(A=g)}return this.min.set(D,t,e),this.max.set(i,z,A),this}setFromPoints(M){this.makeEmpty();for(let D=0,t=M.length;D<t;D++)this.expandByPoint(M[D]);return this}setFromCenterAndSize(M,D){const t=$t.copy(D).multiplyScalar(.5);return this.min.copy(M).sub(t),this.max.copy(M).add(t),this}setFromObject(M,D=!1){return this.makeEmpty(),this.expandByObject(M,D)}clone(){return new this.constructor().copy(this)}copy(M){return this.min.copy(M.min),this.max.copy(M.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(M){return this.isEmpty()?M.set(0,0,0):M.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(M){return this.isEmpty()?M.set(0,0,0):M.subVectors(this.max,this.min)}expandByPoint(M){return this.min.min(M),this.max.max(M),this}expandByVector(M){return this.min.sub(M),this.max.add(M),this}expandByScalar(M){return this.min.addScalar(-M),this.max.addScalar(M),this}expandByObject(M,D=!1){M.updateWorldMatrix(!1,!1);const t=M.geometry;if(t!==void 0)if(D&&t.attributes!=null&&t.attributes.position!==void 0){const i=t.attributes.position;for(let z=0,A=i.count;z<A;z++)$t.fromBufferAttribute(i,z).applyMatrix4(M.matrixWorld),this.expandByPoint($t)}else t.boundingBox===null&&t.computeBoundingBox(),HA.copy(t.boundingBox),HA.applyMatrix4(M.matrixWorld),this.union(HA);const e=M.children;for(let i=0,z=e.length;i<z;i++)this.expandByObject(e[i],D);return this}containsPoint(M){return!(M.x<this.min.x||M.x>this.max.x||M.y<this.min.y||M.y>this.max.y||M.z<this.min.z||M.z>this.max.z)}containsBox(M){return this.min.x<=M.min.x&&M.max.x<=this.max.x&&this.min.y<=M.min.y&&M.max.y<=this.max.y&&this.min.z<=M.min.z&&M.max.z<=this.max.z}getParameter(M,D){return D.set((M.x-this.min.x)/(this.max.x-this.min.x),(M.y-this.min.y)/(this.max.y-this.min.y),(M.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(M){return!(M.max.x<this.min.x||M.min.x>this.max.x||M.max.y<this.min.y||M.min.y>this.max.y||M.max.z<this.min.z||M.min.z>this.max.z)}intersectsSphere(M){return this.clampPoint(M.center,$t),$t.distanceToSquared(M.center)<=M.radius*M.radius}intersectsPlane(M){let D,t;return M.normal.x>0?(D=M.normal.x*this.min.x,t=M.normal.x*this.max.x):(D=M.normal.x*this.max.x,t=M.normal.x*this.min.x),M.normal.y>0?(D+=M.normal.y*this.min.y,t+=M.normal.y*this.max.y):(D+=M.normal.y*this.max.y,t+=M.normal.y*this.min.y),M.normal.z>0?(D+=M.normal.z*this.min.z,t+=M.normal.z*this.max.z):(D+=M.normal.z*this.max.z,t+=M.normal.z*this.min.z),D<=-M.constant&&t>=-M.constant}intersectsTriangle(M){if(this.isEmpty())return!1;this.getCenter(aN),ci.subVectors(this.max,aN),Se.subVectors(M.a,aN),Ze.subVectors(M.b,aN),_e.subVectors(M.c,aN),pt.subVectors(Ze,Se),Ut.subVectors(_e,Ze),Jt.subVectors(Se,_e);let D=[0,-pt.z,pt.y,0,-Ut.z,Ut.y,0,-Jt.z,Jt.y,pt.z,0,-pt.x,Ut.z,0,-Ut.x,Jt.z,0,-Jt.x,-pt.y,pt.x,0,-Ut.y,Ut.x,0,-Jt.y,Jt.x,0];return!WA(D,Se,Ze,_e,ci)||(D=[1,0,0,0,1,0,0,0,1],!WA(D,Se,Ze,_e,ci))?!1:(ji.crossVectors(pt,Ut),D=[ji.x,ji.y,ji.z],WA(D,Se,Ze,_e,ci))}clampPoint(M,D){return D.copy(M).clamp(this.min,this.max)}distanceToPoint(M){return $t.copy(M).clamp(this.min,this.max).sub(M).length()}getBoundingSphere(M){return this.getCenter(M.center),M.radius=this.getSize($t).length()*.5,M}intersect(M){return this.min.max(M.min),this.max.min(M.max),this.isEmpty()&&this.makeEmpty(),this}union(M){return this.min.min(M.min),this.max.max(M.max),this}applyMatrix4(M){return this.isEmpty()?this:(ut[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(M),ut[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(M),ut[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(M),ut[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(M),ut[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(M),ut[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(M),ut[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(M),ut[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(M),this.setFromPoints(ut),this)}translate(M){return this.min.add(M),this.max.add(M),this}equals(M){return M.min.equals(this.min)&&M.max.equals(this.max)}}const ut=[new P,new P,new P,new P,new P,new P,new P,new P],$t=new P,HA=new yN,Se=new P,Ze=new P,_e=new P,pt=new P,Ut=new P,Jt=new P,aN=new P,ci=new P,ji=new P,Me=new P;function WA(N,M,D,t,e){for(let i=0,z=N.length-3;i<=z;i+=3){Me.fromArray(N,i);const A=e.x*Math.abs(Me.x)+e.y*Math.abs(Me.y)+e.z*Math.abs(Me.z),I=M.dot(Me),n=D.dot(Me),T=t.dot(Me);if(Math.max(-Math.max(I,n,T),Math.min(I,n,T))>A)return!1}return!0}const qr=new yN,oN=new P,XA=new P;class yi{constructor(M=new P,D=-1){this.center=M,this.radius=D}set(M,D){return this.center.copy(M),this.radius=D,this}setFromPoints(M,D){const t=this.center;D!==void 0?t.copy(D):qr.setFromPoints(M).getCenter(t);let e=0;for(let i=0,z=M.length;i<z;i++)e=Math.max(e,t.distanceToSquared(M[i]));return this.radius=Math.sqrt(e),this}copy(M){return this.center.copy(M.center),this.radius=M.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(M){return M.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(M){return M.distanceTo(this.center)-this.radius}intersectsSphere(M){const D=this.radius+M.radius;return M.center.distanceToSquared(this.center)<=D*D}intersectsBox(M){return M.intersectsSphere(this)}intersectsPlane(M){return Math.abs(M.distanceToPoint(this.center))<=this.radius}clampPoint(M,D){const t=this.center.distanceToSquared(M);return D.copy(M),t>this.radius*this.radius&&(D.sub(this.center).normalize(),D.multiplyScalar(this.radius).add(this.center)),D}getBoundingBox(M){return this.isEmpty()?(M.makeEmpty(),M):(M.set(this.center,this.center),M.expandByScalar(this.radius),M)}applyMatrix4(M){return this.center.applyMatrix4(M),this.radius=this.radius*M.getMaxScaleOnAxis(),this}translate(M){return this.center.add(M),this}expandByPoint(M){if(this.isEmpty())return this.center.copy(M),this.radius=0,this;oN.subVectors(M,this.center);const D=oN.lengthSq();if(D>this.radius*this.radius){const t=Math.sqrt(D),e=(t-this.radius)*.5;this.center.addScaledVector(oN,e/t),this.radius+=e}return this}union(M){return M.isEmpty()?this:this.isEmpty()?(this.copy(M),this):(this.center.equals(M.center)===!0?this.radius=Math.max(this.radius,M.radius):(XA.subVectors(M.center,this.center).setLength(M.radius),this.expandByPoint(oN.copy(M.center).add(XA)),this.expandByPoint(oN.copy(M.center).sub(XA))),this)}equals(M){return M.center.equals(this.center)&&M.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gt=new P,qA=new P,ai=new P,ft=new P,$A=new P,oi=new P,JA=new P;class Mz{constructor(M=new P,D=new P(0,0,-1)){this.origin=M,this.direction=D}set(M,D){return this.origin.copy(M),this.direction.copy(D),this}copy(M){return this.origin.copy(M.origin),this.direction.copy(M.direction),this}at(M,D){return D.copy(this.direction).multiplyScalar(M).add(this.origin)}lookAt(M){return this.direction.copy(M).sub(this.origin).normalize(),this}recast(M){return this.origin.copy(this.at(M,gt)),this}closestPointToPoint(M,D){D.subVectors(M,this.origin);const t=D.dot(this.direction);return t<0?D.copy(this.origin):D.copy(this.direction).multiplyScalar(t).add(this.origin)}distanceToPoint(M){return Math.sqrt(this.distanceSqToPoint(M))}distanceSqToPoint(M){const D=gt.subVectors(M,this.origin).dot(this.direction);return D<0?this.origin.distanceToSquared(M):(gt.copy(this.direction).multiplyScalar(D).add(this.origin),gt.distanceToSquared(M))}distanceSqToSegment(M,D,t,e){qA.copy(M).add(D).multiplyScalar(.5),ai.copy(D).sub(M).normalize(),ft.copy(this.origin).sub(qA);const i=M.distanceTo(D)*.5,z=-this.direction.dot(ai),A=ft.dot(this.direction),I=-ft.dot(ai),n=ft.lengthSq(),T=Math.abs(1-z*z);let u,g,s,j;if(T>0)if(u=z*I-A,g=z*A-I,j=i*T,u>=0)if(g>=-j)if(g<=j){const r=1/T;u*=r,g*=r,s=u*(u+z*g+2*A)+g*(z*u+g+2*I)+n}else g=i,u=Math.max(0,-(z*g+A)),s=-u*u+g*(g+2*I)+n;else g=-i,u=Math.max(0,-(z*g+A)),s=-u*u+g*(g+2*I)+n;else g<=-j?(u=Math.max(0,-(-z*i+A)),g=u>0?-i:Math.min(Math.max(-i,-I),i),s=-u*u+g*(g+2*I)+n):g<=j?(u=0,g=Math.min(Math.max(-i,-I),i),s=g*(g+2*I)+n):(u=Math.max(0,-(z*i+A)),g=u>0?i:Math.min(Math.max(-i,-I),i),s=-u*u+g*(g+2*I)+n);else g=z>0?-i:i,u=Math.max(0,-(z*g+A)),s=-u*u+g*(g+2*I)+n;return t&&t.copy(this.direction).multiplyScalar(u).add(this.origin),e&&e.copy(ai).multiplyScalar(g).add(qA),s}intersectSphere(M,D){gt.subVectors(M.center,this.origin);const t=gt.dot(this.direction),e=gt.dot(gt)-t*t,i=M.radius*M.radius;if(e>i)return null;const z=Math.sqrt(i-e),A=t-z,I=t+z;return A<0&&I<0?null:A<0?this.at(I,D):this.at(A,D)}intersectsSphere(M){return this.distanceSqToPoint(M.center)<=M.radius*M.radius}distanceToPlane(M){const D=M.normal.dot(this.direction);if(D===0)return M.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(M.normal)+M.constant)/D;return t>=0?t:null}intersectPlane(M,D){const t=this.distanceToPlane(M);return t===null?null:this.at(t,D)}intersectsPlane(M){const D=M.distanceToPoint(this.origin);return D===0||M.normal.dot(this.direction)*D<0}intersectBox(M,D){let t,e,i,z,A,I;const n=1/this.direction.x,T=1/this.direction.y,u=1/this.direction.z,g=this.origin;return n>=0?(t=(M.min.x-g.x)*n,e=(M.max.x-g.x)*n):(t=(M.max.x-g.x)*n,e=(M.min.x-g.x)*n),T>=0?(i=(M.min.y-g.y)*T,z=(M.max.y-g.y)*T):(i=(M.max.y-g.y)*T,z=(M.min.y-g.y)*T),t>z||i>e||((i>t||isNaN(t))&&(t=i),(z<e||isNaN(e))&&(e=z),u>=0?(A=(M.min.z-g.z)*u,I=(M.max.z-g.z)*u):(A=(M.max.z-g.z)*u,I=(M.min.z-g.z)*u),t>I||A>e)||((A>t||t!==t)&&(t=A),(I<e||e!==e)&&(e=I),e<0)?null:this.at(t>=0?t:e,D)}intersectsBox(M){return this.intersectBox(M,gt)!==null}intersectTriangle(M,D,t,e,i){$A.subVectors(D,M),oi.subVectors(t,M),JA.crossVectors($A,oi);let z=this.direction.dot(JA),A;if(z>0){if(e)return null;A=1}else if(z<0)A=-1,z=-z;else return null;ft.subVectors(this.origin,M);const I=A*this.direction.dot(oi.crossVectors(ft,oi));if(I<0)return null;const n=A*this.direction.dot($A.cross(ft));if(n<0||I+n>z)return null;const T=-A*ft.dot(JA);return T<0?null:this.at(T/z,i)}applyMatrix4(M){return this.origin.applyMatrix4(M),this.direction.transformDirection(M),this}equals(M){return M.origin.equals(this.origin)&&M.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lD{constructor(){lD.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(M,D,t,e,i,z,A,I,n,T,u,g,s,j,r,c){const y=this.elements;return y[0]=M,y[4]=D,y[8]=t,y[12]=e,y[1]=i,y[5]=z,y[9]=A,y[13]=I,y[2]=n,y[6]=T,y[10]=u,y[14]=g,y[3]=s,y[7]=j,y[11]=r,y[15]=c,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lD().fromArray(this.elements)}copy(M){const D=this.elements,t=M.elements;return D[0]=t[0],D[1]=t[1],D[2]=t[2],D[3]=t[3],D[4]=t[4],D[5]=t[5],D[6]=t[6],D[7]=t[7],D[8]=t[8],D[9]=t[9],D[10]=t[10],D[11]=t[11],D[12]=t[12],D[13]=t[13],D[14]=t[14],D[15]=t[15],this}copyPosition(M){const D=this.elements,t=M.elements;return D[12]=t[12],D[13]=t[13],D[14]=t[14],this}setFromMatrix3(M){const D=M.elements;return this.set(D[0],D[3],D[6],0,D[1],D[4],D[7],0,D[2],D[5],D[8],0,0,0,0,1),this}extractBasis(M,D,t){return M.setFromMatrixColumn(this,0),D.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(M,D,t){return this.set(M.x,D.x,t.x,0,M.y,D.y,t.y,0,M.z,D.z,t.z,0,0,0,0,1),this}extractRotation(M){const D=this.elements,t=M.elements,e=1/be.setFromMatrixColumn(M,0).length(),i=1/be.setFromMatrixColumn(M,1).length(),z=1/be.setFromMatrixColumn(M,2).length();return D[0]=t[0]*e,D[1]=t[1]*e,D[2]=t[2]*e,D[3]=0,D[4]=t[4]*i,D[5]=t[5]*i,D[6]=t[6]*i,D[7]=0,D[8]=t[8]*z,D[9]=t[9]*z,D[10]=t[10]*z,D[11]=0,D[12]=0,D[13]=0,D[14]=0,D[15]=1,this}makeRotationFromEuler(M){const D=this.elements,t=M.x,e=M.y,i=M.z,z=Math.cos(t),A=Math.sin(t),I=Math.cos(e),n=Math.sin(e),T=Math.cos(i),u=Math.sin(i);if(M.order==="XYZ"){const g=z*T,s=z*u,j=A*T,r=A*u;D[0]=I*T,D[4]=-I*u,D[8]=n,D[1]=s+j*n,D[5]=g-r*n,D[9]=-A*I,D[2]=r-g*n,D[6]=j+s*n,D[10]=z*I}else if(M.order==="YXZ"){const g=I*T,s=I*u,j=n*T,r=n*u;D[0]=g+r*A,D[4]=j*A-s,D[8]=z*n,D[1]=z*u,D[5]=z*T,D[9]=-A,D[2]=s*A-j,D[6]=r+g*A,D[10]=z*I}else if(M.order==="ZXY"){const g=I*T,s=I*u,j=n*T,r=n*u;D[0]=g-r*A,D[4]=-z*u,D[8]=j+s*A,D[1]=s+j*A,D[5]=z*T,D[9]=r-g*A,D[2]=-z*n,D[6]=A,D[10]=z*I}else if(M.order==="ZYX"){const g=z*T,s=z*u,j=A*T,r=A*u;D[0]=I*T,D[4]=j*n-s,D[8]=g*n+r,D[1]=I*u,D[5]=r*n+g,D[9]=s*n-j,D[2]=-n,D[6]=A*I,D[10]=z*I}else if(M.order==="YZX"){const g=z*I,s=z*n,j=A*I,r=A*n;D[0]=I*T,D[4]=r-g*u,D[8]=j*u+s,D[1]=u,D[5]=z*T,D[9]=-A*T,D[2]=-n*T,D[6]=s*u+j,D[10]=g-r*u}else if(M.order==="XZY"){const g=z*I,s=z*n,j=A*I,r=A*n;D[0]=I*T,D[4]=-u,D[8]=n*T,D[1]=g*u+r,D[5]=z*T,D[9]=s*u-j,D[2]=j*u-s,D[6]=A*T,D[10]=r*u+g}return D[3]=0,D[7]=0,D[11]=0,D[12]=0,D[13]=0,D[14]=0,D[15]=1,this}makeRotationFromQuaternion(M){return this.compose($r,M,Jr)}lookAt(M,D,t){const e=this.elements;return hD.subVectors(M,D),hD.lengthSq()===0&&(hD.z=1),hD.normalize(),mt.crossVectors(t,hD),mt.lengthSq()===0&&(Math.abs(t.z)===1?hD.x+=1e-4:hD.z+=1e-4,hD.normalize(),mt.crossVectors(t,hD)),mt.normalize(),Ci.crossVectors(hD,mt),e[0]=mt.x,e[4]=Ci.x,e[8]=hD.x,e[1]=mt.y,e[5]=Ci.y,e[9]=hD.y,e[2]=mt.z,e[6]=Ci.z,e[10]=hD.z,this}multiply(M){return this.multiplyMatrices(this,M)}premultiply(M){return this.multiplyMatrices(M,this)}multiplyMatrices(M,D){const t=M.elements,e=D.elements,i=this.elements,z=t[0],A=t[4],I=t[8],n=t[12],T=t[1],u=t[5],g=t[9],s=t[13],j=t[2],r=t[6],c=t[10],y=t[14],w=t[3],a=t[7],o=t[11],O=t[15],h=e[0],d=e[4],L=e[8],l=e[12],p=e[1],B=e[5],G=e[9],Q=e[13],m=e[2],Z=e[6],H=e[10],$=e[14],F=e[3],J=e[7],W=e[11],TM=e[15];return i[0]=z*h+A*p+I*m+n*F,i[4]=z*d+A*B+I*Z+n*J,i[8]=z*L+A*G+I*H+n*W,i[12]=z*l+A*Q+I*$+n*TM,i[1]=T*h+u*p+g*m+s*F,i[5]=T*d+u*B+g*Z+s*J,i[9]=T*L+u*G+g*H+s*W,i[13]=T*l+u*Q+g*$+s*TM,i[2]=j*h+r*p+c*m+y*F,i[6]=j*d+r*B+c*Z+y*J,i[10]=j*L+r*G+c*H+y*W,i[14]=j*l+r*Q+c*$+y*TM,i[3]=w*h+a*p+o*m+O*F,i[7]=w*d+a*B+o*Z+O*J,i[11]=w*L+a*G+o*H+O*W,i[15]=w*l+a*Q+o*$+O*TM,this}multiplyScalar(M){const D=this.elements;return D[0]*=M,D[4]*=M,D[8]*=M,D[12]*=M,D[1]*=M,D[5]*=M,D[9]*=M,D[13]*=M,D[2]*=M,D[6]*=M,D[10]*=M,D[14]*=M,D[3]*=M,D[7]*=M,D[11]*=M,D[15]*=M,this}determinant(){const M=this.elements,D=M[0],t=M[4],e=M[8],i=M[12],z=M[1],A=M[5],I=M[9],n=M[13],T=M[2],u=M[6],g=M[10],s=M[14],j=M[3],r=M[7],c=M[11],y=M[15];return j*(+i*I*u-e*n*u-i*A*g+t*n*g+e*A*s-t*I*s)+r*(+D*I*s-D*n*g+i*z*g-e*z*s+e*n*T-i*I*T)+c*(+D*n*u-D*A*s-i*z*u+t*z*s+i*A*T-t*n*T)+y*(-e*A*T-D*I*u+D*A*g+e*z*u-t*z*g+t*I*T)}transpose(){const M=this.elements;let D;return D=M[1],M[1]=M[4],M[4]=D,D=M[2],M[2]=M[8],M[8]=D,D=M[6],M[6]=M[9],M[9]=D,D=M[3],M[3]=M[12],M[12]=D,D=M[7],M[7]=M[13],M[13]=D,D=M[11],M[11]=M[14],M[14]=D,this}setPosition(M,D,t){const e=this.elements;return M.isVector3?(e[12]=M.x,e[13]=M.y,e[14]=M.z):(e[12]=M,e[13]=D,e[14]=t),this}invert(){const M=this.elements,D=M[0],t=M[1],e=M[2],i=M[3],z=M[4],A=M[5],I=M[6],n=M[7],T=M[8],u=M[9],g=M[10],s=M[11],j=M[12],r=M[13],c=M[14],y=M[15],w=u*c*n-r*g*n+r*I*s-A*c*s-u*I*y+A*g*y,a=j*g*n-T*c*n-j*I*s+z*c*s+T*I*y-z*g*y,o=T*r*n-j*u*n+j*A*s-z*r*s-T*A*y+z*u*y,O=j*u*I-T*r*I-j*A*g+z*r*g+T*A*c-z*u*c,h=D*w+t*a+e*o+i*O;if(h===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const d=1/h;return M[0]=w*d,M[1]=(r*g*i-u*c*i-r*e*s+t*c*s+u*e*y-t*g*y)*d,M[2]=(A*c*i-r*I*i+r*e*n-t*c*n-A*e*y+t*I*y)*d,M[3]=(u*I*i-A*g*i-u*e*n+t*g*n+A*e*s-t*I*s)*d,M[4]=a*d,M[5]=(T*c*i-j*g*i+j*e*s-D*c*s-T*e*y+D*g*y)*d,M[6]=(j*I*i-z*c*i-j*e*n+D*c*n+z*e*y-D*I*y)*d,M[7]=(z*g*i-T*I*i+T*e*n-D*g*n-z*e*s+D*I*s)*d,M[8]=o*d,M[9]=(j*u*i-T*r*i-j*t*s+D*r*s+T*t*y-D*u*y)*d,M[10]=(z*r*i-j*A*i+j*t*n-D*r*n-z*t*y+D*A*y)*d,M[11]=(T*A*i-z*u*i-T*t*n+D*u*n+z*t*s-D*A*s)*d,M[12]=O*d,M[13]=(T*r*e-j*u*e+j*t*g-D*r*g-T*t*c+D*u*c)*d,M[14]=(j*A*e-z*r*e-j*t*I+D*r*I+z*t*c-D*A*c)*d,M[15]=(z*u*e-T*A*e+T*t*I-D*u*I-z*t*g+D*A*g)*d,this}scale(M){const D=this.elements,t=M.x,e=M.y,i=M.z;return D[0]*=t,D[4]*=e,D[8]*=i,D[1]*=t,D[5]*=e,D[9]*=i,D[2]*=t,D[6]*=e,D[10]*=i,D[3]*=t,D[7]*=e,D[11]*=i,this}getMaxScaleOnAxis(){const M=this.elements,D=M[0]*M[0]+M[1]*M[1]+M[2]*M[2],t=M[4]*M[4]+M[5]*M[5]+M[6]*M[6],e=M[8]*M[8]+M[9]*M[9]+M[10]*M[10];return Math.sqrt(Math.max(D,t,e))}makeTranslation(M,D,t){return this.set(1,0,0,M,0,1,0,D,0,0,1,t,0,0,0,1),this}makeRotationX(M){const D=Math.cos(M),t=Math.sin(M);return this.set(1,0,0,0,0,D,-t,0,0,t,D,0,0,0,0,1),this}makeRotationY(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,0,t,0,0,1,0,0,-t,0,D,0,0,0,0,1),this}makeRotationZ(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,-t,0,0,t,D,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(M,D){const t=Math.cos(D),e=Math.sin(D),i=1-t,z=M.x,A=M.y,I=M.z,n=i*z,T=i*A;return this.set(n*z+t,n*A-e*I,n*I+e*A,0,n*A+e*I,T*A+t,T*I-e*z,0,n*I-e*A,T*I+e*z,i*I*I+t,0,0,0,0,1),this}makeScale(M,D,t){return this.set(M,0,0,0,0,D,0,0,0,0,t,0,0,0,0,1),this}makeShear(M,D,t,e,i,z){return this.set(1,t,i,0,M,1,z,0,D,e,1,0,0,0,0,1),this}compose(M,D,t){const e=this.elements,i=D._x,z=D._y,A=D._z,I=D._w,n=i+i,T=z+z,u=A+A,g=i*n,s=i*T,j=i*u,r=z*T,c=z*u,y=A*u,w=I*n,a=I*T,o=I*u,O=t.x,h=t.y,d=t.z;return e[0]=(1-(r+y))*O,e[1]=(s+o)*O,e[2]=(j-a)*O,e[3]=0,e[4]=(s-o)*h,e[5]=(1-(g+y))*h,e[6]=(c+w)*h,e[7]=0,e[8]=(j+a)*d,e[9]=(c-w)*d,e[10]=(1-(g+r))*d,e[11]=0,e[12]=M.x,e[13]=M.y,e[14]=M.z,e[15]=1,this}decompose(M,D,t){const e=this.elements;let i=be.set(e[0],e[1],e[2]).length();const z=be.set(e[4],e[5],e[6]).length(),A=be.set(e[8],e[9],e[10]).length();this.determinant()<0&&(i=-i),M.x=e[12],M.y=e[13],M.z=e[14],HD.copy(this);const n=1/i,T=1/z,u=1/A;return HD.elements[0]*=n,HD.elements[1]*=n,HD.elements[2]*=n,HD.elements[4]*=T,HD.elements[5]*=T,HD.elements[6]*=T,HD.elements[8]*=u,HD.elements[9]*=u,HD.elements[10]*=u,D.setFromRotationMatrix(HD),t.x=i,t.y=z,t.z=A,this}makePerspective(M,D,t,e,i,z){const A=this.elements,I=2*i/(D-M),n=2*i/(t-e),T=(D+M)/(D-M),u=(t+e)/(t-e),g=-(z+i)/(z-i),s=-2*z*i/(z-i);return A[0]=I,A[4]=0,A[8]=T,A[12]=0,A[1]=0,A[5]=n,A[9]=u,A[13]=0,A[2]=0,A[6]=0,A[10]=g,A[14]=s,A[3]=0,A[7]=0,A[11]=-1,A[15]=0,this}makeOrthographic(M,D,t,e,i,z){const A=this.elements,I=1/(D-M),n=1/(t-e),T=1/(z-i),u=(D+M)*I,g=(t+e)*n,s=(z+i)*T;return A[0]=2*I,A[4]=0,A[8]=0,A[12]=-u,A[1]=0,A[5]=2*n,A[9]=0,A[13]=-g,A[2]=0,A[6]=0,A[10]=-2*T,A[14]=-s,A[3]=0,A[7]=0,A[11]=0,A[15]=1,this}equals(M){const D=this.elements,t=M.elements;for(let e=0;e<16;e++)if(D[e]!==t[e])return!1;return!0}fromArray(M,D=0){for(let t=0;t<16;t++)this.elements[t]=M[t+D];return this}toArray(M=[],D=0){const t=this.elements;return M[D]=t[0],M[D+1]=t[1],M[D+2]=t[2],M[D+3]=t[3],M[D+4]=t[4],M[D+5]=t[5],M[D+6]=t[6],M[D+7]=t[7],M[D+8]=t[8],M[D+9]=t[9],M[D+10]=t[10],M[D+11]=t[11],M[D+12]=t[12],M[D+13]=t[13],M[D+14]=t[14],M[D+15]=t[15],M}}const be=new P,HD=new lD,$r=new P(0,0,0),Jr=new P(1,1,1),mt=new P,Ci=new P,hD=new P,KI=new lD,RI=new jN;class Li{constructor(M=0,D=0,t=0,e=Li.DEFAULT_ORDER){this.isEuler=!0,this._x=M,this._y=D,this._z=t,this._order=e}get x(){return this._x}set x(M){this._x=M,this._onChangeCallback()}get y(){return this._y}set y(M){this._y=M,this._onChangeCallback()}get z(){return this._z}set z(M){this._z=M,this._onChangeCallback()}get order(){return this._order}set order(M){this._order=M,this._onChangeCallback()}set(M,D,t,e=this._order){return this._x=M,this._y=D,this._z=t,this._order=e,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(M){return this._x=M._x,this._y=M._y,this._z=M._z,this._order=M._order,this._onChangeCallback(),this}setFromRotationMatrix(M,D=this._order,t=!0){const e=M.elements,i=e[0],z=e[4],A=e[8],I=e[1],n=e[5],T=e[9],u=e[2],g=e[6],s=e[10];switch(D){case"XYZ":this._y=Math.asin(OD(A,-1,1)),Math.abs(A)<.9999999?(this._x=Math.atan2(-T,s),this._z=Math.atan2(-z,i)):(this._x=Math.atan2(g,n),this._z=0);break;case"YXZ":this._x=Math.asin(-OD(T,-1,1)),Math.abs(T)<.9999999?(this._y=Math.atan2(A,s),this._z=Math.atan2(I,n)):(this._y=Math.atan2(-u,i),this._z=0);break;case"ZXY":this._x=Math.asin(OD(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-u,s),this._z=Math.atan2(-z,n)):(this._y=0,this._z=Math.atan2(I,i));break;case"ZYX":this._y=Math.asin(-OD(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,s),this._z=Math.atan2(I,i)):(this._x=0,this._z=Math.atan2(-z,n));break;case"YZX":this._z=Math.asin(OD(I,-1,1)),Math.abs(I)<.9999999?(this._x=Math.atan2(-T,n),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(A,s));break;case"XZY":this._z=Math.asin(-OD(z,-1,1)),Math.abs(z)<.9999999?(this._x=Math.atan2(g,n),this._y=Math.atan2(A,i)):(this._x=Math.atan2(-T,s),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+D)}return this._order=D,t===!0&&this._onChangeCallback(),this}setFromQuaternion(M,D,t){return KI.makeRotationFromQuaternion(M),this.setFromRotationMatrix(KI,D,t)}setFromVector3(M,D=this._order){return this.set(M.x,M.y,M.z,D)}reorder(M){return RI.setFromEuler(this),this.setFromQuaternion(RI,M)}equals(M){return M._x===this._x&&M._y===this._y&&M._z===this._z&&M._order===this._order}fromArray(M){return this._x=M[0],this._y=M[1],this._z=M[2],M[3]!==void 0&&(this._order=M[3]),this._onChangeCallback(),this}toArray(M=[],D=0){return M[D]=this._x,M[D+1]=this._y,M[D+2]=this._z,M[D+3]=this._order,M}_onChange(M){return this._onChangeCallback=M,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Li.DEFAULT_ORDER="XYZ";class Mc{constructor(){this.mask=1}set(M){this.mask=(1<<M|0)>>>0}enable(M){this.mask|=1<<M|0}enableAll(){this.mask=-1}toggle(M){this.mask^=1<<M|0}disable(M){this.mask&=~(1<<M|0)}disableAll(){this.mask=0}test(M){return(this.mask&M.mask)!==0}isEnabled(M){return(this.mask&(1<<M|0))!==0}}let Dc=0;const PI=new P,Ke=new jN,st=new lD,wi=new P,CN=new P,tc=new P,ec=new jN,FI=new P(1,0,0),BI=new P(0,1,0),GI=new P(0,0,1),Nc={type:"added"},VI={type:"removed"};class mD extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dc++}),this.uuid=cN(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mD.DEFAULT_UP.clone();const M=new P,D=new Li,t=new jN,e=new P(1,1,1);function i(){t.setFromEuler(D,!1)}function z(){D.setFromQuaternion(t,void 0,!1)}D._onChange(i),t._onChange(z),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:M},rotation:{configurable:!0,enumerable:!0,value:D},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:e},modelViewMatrix:{value:new lD},normalMatrix:{value:new Qe}}),this.matrix=new lD,this.matrixWorld=new lD,this.matrixAutoUpdate=mD.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=mD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Mc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(M){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(M),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(M){return this.quaternion.premultiply(M),this}setRotationFromAxisAngle(M,D){this.quaternion.setFromAxisAngle(M,D)}setRotationFromEuler(M){this.quaternion.setFromEuler(M,!0)}setRotationFromMatrix(M){this.quaternion.setFromRotationMatrix(M)}setRotationFromQuaternion(M){this.quaternion.copy(M)}rotateOnAxis(M,D){return Ke.setFromAxisAngle(M,D),this.quaternion.multiply(Ke),this}rotateOnWorldAxis(M,D){return Ke.setFromAxisAngle(M,D),this.quaternion.premultiply(Ke),this}rotateX(M){return this.rotateOnAxis(FI,M)}rotateY(M){return this.rotateOnAxis(BI,M)}rotateZ(M){return this.rotateOnAxis(GI,M)}translateOnAxis(M,D){return PI.copy(M).applyQuaternion(this.quaternion),this.position.add(PI.multiplyScalar(D)),this}translateX(M){return this.translateOnAxis(FI,M)}translateY(M){return this.translateOnAxis(BI,M)}translateZ(M){return this.translateOnAxis(GI,M)}localToWorld(M){return this.updateWorldMatrix(!0,!1),M.applyMatrix4(this.matrixWorld)}worldToLocal(M){return this.updateWorldMatrix(!0,!1),M.applyMatrix4(st.copy(this.matrixWorld).invert())}lookAt(M,D,t){M.isVector3?wi.copy(M):wi.set(M,D,t);const e=this.parent;this.updateWorldMatrix(!0,!1),CN.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?st.lookAt(CN,wi,this.up):st.lookAt(wi,CN,this.up),this.quaternion.setFromRotationMatrix(st),e&&(st.extractRotation(e.matrixWorld),Ke.setFromRotationMatrix(st),this.quaternion.premultiply(Ke.invert()))}add(M){if(arguments.length>1){for(let D=0;D<arguments.length;D++)this.add(arguments[D]);return this}return M===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",M),this):(M&&M.isObject3D?(M.parent!==null&&M.parent.remove(M),M.parent=this,this.children.push(M),M.dispatchEvent(Nc)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",M),this)}remove(M){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const D=this.children.indexOf(M);return D!==-1&&(M.parent=null,this.children.splice(D,1),M.dispatchEvent(VI)),this}removeFromParent(){const M=this.parent;return M!==null&&M.remove(this),this}clear(){for(let M=0;M<this.children.length;M++){const D=this.children[M];D.parent=null,D.dispatchEvent(VI)}return this.children.length=0,this}attach(M){return this.updateWorldMatrix(!0,!1),st.copy(this.matrixWorld).invert(),M.parent!==null&&(M.parent.updateWorldMatrix(!0,!1),st.multiply(M.parent.matrixWorld)),M.applyMatrix4(st),this.add(M),M.updateWorldMatrix(!1,!0),this}getObjectById(M){return this.getObjectByProperty("id",M)}getObjectByName(M){return this.getObjectByProperty("name",M)}getObjectByProperty(M,D){if(this[M]===D)return this;for(let t=0,e=this.children.length;t<e;t++){const z=this.children[t].getObjectByProperty(M,D);if(z!==void 0)return z}}getObjectsByProperty(M,D){let t=[];this[M]===D&&t.push(this);for(let e=0,i=this.children.length;e<i;e++){const z=this.children[e].getObjectsByProperty(M,D);z.length>0&&(t=t.concat(z))}return t}getWorldPosition(M){return this.updateWorldMatrix(!0,!1),M.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(M){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(CN,M,tc),M}getWorldScale(M){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(CN,ec,M),M}getWorldDirection(M){this.updateWorldMatrix(!0,!1);const D=this.matrixWorld.elements;return M.set(D[8],D[9],D[10]).normalize()}raycast(){}traverse(M){M(this);const D=this.children;for(let t=0,e=D.length;t<e;t++)D[t].traverse(M)}traverseVisible(M){if(this.visible===!1)return;M(this);const D=this.children;for(let t=0,e=D.length;t<e;t++)D[t].traverseVisible(M)}traverseAncestors(M){const D=this.parent;D!==null&&(M(D),D.traverseAncestors(M))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(M){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||M)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,M=!0);const D=this.children;for(let t=0,e=D.length;t<e;t++){const i=D[t];(i.matrixWorldAutoUpdate===!0||M===!0)&&i.updateMatrixWorld(M)}}updateWorldMatrix(M,D){const t=this.parent;if(M===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),D===!0){const e=this.children;for(let i=0,z=e.length;i<z;i++){const A=e[i];A.matrixWorldAutoUpdate===!0&&A.updateWorldMatrix(!1,!0)}}}toJSON(M){const D=M===void 0||typeof M=="string",t={};D&&(M={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const e={};e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),this.castShadow===!0&&(e.castShadow=!0),this.receiveShadow===!0&&(e.receiveShadow=!0),this.visible===!1&&(e.visible=!1),this.frustumCulled===!1&&(e.frustumCulled=!1),this.renderOrder!==0&&(e.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(e.userData=this.userData),e.layers=this.layers.mask,e.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(e.matrixAutoUpdate=!1),this.isInstancedMesh&&(e.type="InstancedMesh",e.count=this.count,e.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(e.instanceColor=this.instanceColor.toJSON()));function i(A,I){return A[I.uuid]===void 0&&(A[I.uuid]=I.toJSON(M)),I.uuid}if(this.isScene)this.background&&(this.background.isColor?e.background=this.background.toJSON():this.background.isTexture&&(e.background=this.background.toJSON(M).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(e.environment=this.environment.toJSON(M).uuid);else if(this.isMesh||this.isLine||this.isPoints){e.geometry=i(M.geometries,this.geometry);const A=this.geometry.parameters;if(A!==void 0&&A.shapes!==void 0){const I=A.shapes;if(Array.isArray(I))for(let n=0,T=I.length;n<T;n++){const u=I[n];i(M.shapes,u)}else i(M.shapes,I)}}if(this.isSkinnedMesh&&(e.bindMode=this.bindMode,e.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(M.skeletons,this.skeleton),e.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const A=[];for(let I=0,n=this.material.length;I<n;I++)A.push(i(M.materials,this.material[I]));e.material=A}else e.material=i(M.materials,this.material);if(this.children.length>0){e.children=[];for(let A=0;A<this.children.length;A++)e.children.push(this.children[A].toJSON(M).object)}if(this.animations.length>0){e.animations=[];for(let A=0;A<this.animations.length;A++){const I=this.animations[A];e.animations.push(i(M.animations,I))}}if(D){const A=z(M.geometries),I=z(M.materials),n=z(M.textures),T=z(M.images),u=z(M.shapes),g=z(M.skeletons),s=z(M.animations),j=z(M.nodes);A.length>0&&(t.geometries=A),I.length>0&&(t.materials=I),n.length>0&&(t.textures=n),T.length>0&&(t.images=T),u.length>0&&(t.shapes=u),g.length>0&&(t.skeletons=g),s.length>0&&(t.animations=s),j.length>0&&(t.nodes=j)}return t.object=e,t;function z(A){const I=[];for(const n in A){const T=A[n];delete T.metadata,I.push(T)}return I}}clone(M){return new this.constructor().copy(this,M)}copy(M,D=!0){if(this.name=M.name,this.up.copy(M.up),this.position.copy(M.position),this.rotation.order=M.rotation.order,this.quaternion.copy(M.quaternion),this.scale.copy(M.scale),this.matrix.copy(M.matrix),this.matrixWorld.copy(M.matrixWorld),this.matrixAutoUpdate=M.matrixAutoUpdate,this.matrixWorldNeedsUpdate=M.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=M.matrixWorldAutoUpdate,this.layers.mask=M.layers.mask,this.visible=M.visible,this.castShadow=M.castShadow,this.receiveShadow=M.receiveShadow,this.frustumCulled=M.frustumCulled,this.renderOrder=M.renderOrder,this.userData=JSON.parse(JSON.stringify(M.userData)),D===!0)for(let t=0;t<M.children.length;t++){const e=M.children[t];this.add(e.clone())}return this}}mD.DEFAULT_UP=new P(0,1,0),mD.DEFAULT_MATRIX_AUTO_UPDATE=!0,mD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const WD=new P,rt=new P,Dz=new P,ct=new P,Re=new P,Pe=new P,HI=new P,tz=new P,ez=new P,Nz=new P;class jt{constructor(M=new P,D=new P,t=new P){this.a=M,this.b=D,this.c=t}static getNormal(M,D,t,e){e.subVectors(t,D),WD.subVectors(M,D),e.cross(WD);const i=e.lengthSq();return i>0?e.multiplyScalar(1/Math.sqrt(i)):e.set(0,0,0)}static getBarycoord(M,D,t,e,i){WD.subVectors(e,D),rt.subVectors(t,D),Dz.subVectors(M,D);const z=WD.dot(WD),A=WD.dot(rt),I=WD.dot(Dz),n=rt.dot(rt),T=rt.dot(Dz),u=z*n-A*A;if(u===0)return i.set(-2,-1,-1);const g=1/u,s=(n*I-A*T)*g,j=(z*T-A*I)*g;return i.set(1-s-j,j,s)}static containsPoint(M,D,t,e){return this.getBarycoord(M,D,t,e,ct),ct.x>=0&&ct.y>=0&&ct.x+ct.y<=1}static getUV(M,D,t,e,i,z,A,I){return this.getBarycoord(M,D,t,e,ct),I.set(0,0),I.addScaledVector(i,ct.x),I.addScaledVector(z,ct.y),I.addScaledVector(A,ct.z),I}static isFrontFacing(M,D,t,e){return WD.subVectors(t,D),rt.subVectors(M,D),WD.cross(rt).dot(e)<0}set(M,D,t){return this.a.copy(M),this.b.copy(D),this.c.copy(t),this}setFromPointsAndIndices(M,D,t,e){return this.a.copy(M[D]),this.b.copy(M[t]),this.c.copy(M[e]),this}setFromAttributeAndIndices(M,D,t,e){return this.a.fromBufferAttribute(M,D),this.b.fromBufferAttribute(M,t),this.c.fromBufferAttribute(M,e),this}clone(){return new this.constructor().copy(this)}copy(M){return this.a.copy(M.a),this.b.copy(M.b),this.c.copy(M.c),this}getArea(){return WD.subVectors(this.c,this.b),rt.subVectors(this.a,this.b),WD.cross(rt).length()*.5}getMidpoint(M){return M.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(M){return jt.getNormal(this.a,this.b,this.c,M)}getPlane(M){return M.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(M,D){return jt.getBarycoord(M,this.a,this.b,this.c,D)}getUV(M,D,t,e,i){return jt.getUV(M,this.a,this.b,this.c,D,t,e,i)}containsPoint(M){return jt.containsPoint(M,this.a,this.b,this.c)}isFrontFacing(M){return jt.isFrontFacing(this.a,this.b,this.c,M)}intersectsBox(M){return M.intersectsTriangle(this)}closestPointToPoint(M,D){const t=this.a,e=this.b,i=this.c;let z,A;Re.subVectors(e,t),Pe.subVectors(i,t),tz.subVectors(M,t);const I=Re.dot(tz),n=Pe.dot(tz);if(I<=0&&n<=0)return D.copy(t);ez.subVectors(M,e);const T=Re.dot(ez),u=Pe.dot(ez);if(T>=0&&u<=T)return D.copy(e);const g=I*u-T*n;if(g<=0&&I>=0&&T<=0)return z=I/(I-T),D.copy(t).addScaledVector(Re,z);Nz.subVectors(M,i);const s=Re.dot(Nz),j=Pe.dot(Nz);if(j>=0&&s<=j)return D.copy(i);const r=s*n-I*j;if(r<=0&&n>=0&&j<=0)return A=n/(n-j),D.copy(t).addScaledVector(Pe,A);const c=T*j-s*u;if(c<=0&&u-T>=0&&s-j>=0)return HI.subVectors(i,e),A=(u-T)/(u-T+(s-j)),D.copy(e).addScaledVector(HI,A);const y=1/(c+r+g);return z=r*y,A=g*y,D.copy(t).addScaledVector(Re,z).addScaledVector(Pe,A)}equals(M){return M.a.equals(this.a)&&M.b.equals(this.b)&&M.c.equals(this.c)}}let ic=0;class Fe extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ic++}),this.uuid=cN(),this.name="",this.type="Material",this.blending=UI,this.side=_A,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=kr,this.blendDst=Sr,this.blendEquation=Qr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Br,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=KA,this.stencilZFail=KA,this.stencilZPass=KA,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(M){this._alphaTest>0!=M>0&&this.version++,this._alphaTest=M}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(M){if(M!==void 0)for(const D in M){const t=M[D];if(t===void 0){console.warn("THREE.Material: '"+D+"' parameter is undefined.");continue}const e=this[D];if(e===void 0){console.warn("THREE."+this.type+": '"+D+"' is not a property of this material.");continue}e&&e.isColor?e.set(t):e&&e.isVector3&&t&&t.isVector3?e.copy(t):this[D]=t}}toJSON(M){const D=M===void 0||typeof M=="string";D&&(M={textures:{},images:{}});const t={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen!==void 0&&(t.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(t.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(t.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(t.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(t.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(M).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(M).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(M).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(t.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(t.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(t.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(t.iridescenceMap=this.iridescenceMap.toJSON(M).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(t.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(M).uuid),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(M).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(M).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(M).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(M).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(M).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(M).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(M).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(M).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(M).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(M).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(M).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(M).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(t.specularIntensityMap=this.specularIntensityMap.toJSON(M).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(t.specularColorMap=this.specularColorMap.toJSON(M).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(M).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(M).uuid),this.transmission!==void 0&&(t.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(t.transmissionMap=this.transmissionMap.toJSON(M).uuid),this.thickness!==void 0&&(t.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(t.thicknessMap=this.thicknessMap.toJSON(M).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(t.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(t.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==UI&&(t.blending=this.blending),this.side!==_A&&(t.side=this.side),this.vertexColors&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=this.transparent),t.depthFunc=this.depthFunc,t.depthTest=this.depthTest,t.depthWrite=this.depthWrite,t.colorWrite=this.colorWrite,t.stencilWrite=this.stencilWrite,t.stencilWriteMask=this.stencilWriteMask,t.stencilFunc=this.stencilFunc,t.stencilRef=this.stencilRef,t.stencilFuncMask=this.stencilFuncMask,t.stencilFail=this.stencilFail,t.stencilZFail=this.stencilZFail,t.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(t.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(t.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(t.wireframe=this.wireframe),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(t.flatShading=this.flatShading),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),this.fog===!1&&(t.fog=!1),Object.keys(this.userData).length>0&&(t.userData=this.userData);function e(i){const z=[];for(const A in i){const I=i[A];delete I.metadata,z.push(I)}return z}if(D){const i=e(M.textures),z=e(M.images);i.length>0&&(t.textures=i),z.length>0&&(t.images=z)}return t}clone(){return new this.constructor().copy(this)}copy(M){this.name=M.name,this.blending=M.blending,this.side=M.side,this.vertexColors=M.vertexColors,this.opacity=M.opacity,this.transparent=M.transparent,this.blendSrc=M.blendSrc,this.blendDst=M.blendDst,this.blendEquation=M.blendEquation,this.blendSrcAlpha=M.blendSrcAlpha,this.blendDstAlpha=M.blendDstAlpha,this.blendEquationAlpha=M.blendEquationAlpha,this.depthFunc=M.depthFunc,this.depthTest=M.depthTest,this.depthWrite=M.depthWrite,this.stencilWriteMask=M.stencilWriteMask,this.stencilFunc=M.stencilFunc,this.stencilRef=M.stencilRef,this.stencilFuncMask=M.stencilFuncMask,this.stencilFail=M.stencilFail,this.stencilZFail=M.stencilZFail,this.stencilZPass=M.stencilZPass,this.stencilWrite=M.stencilWrite;const D=M.clippingPlanes;let t=null;if(D!==null){const e=D.length;t=new Array(e);for(let i=0;i!==e;++i)t[i]=D[i].clone()}return this.clippingPlanes=t,this.clipIntersection=M.clipIntersection,this.clipShadows=M.clipShadows,this.shadowSide=M.shadowSide,this.colorWrite=M.colorWrite,this.precision=M.precision,this.polygonOffset=M.polygonOffset,this.polygonOffsetFactor=M.polygonOffsetFactor,this.polygonOffsetUnits=M.polygonOffsetUnits,this.dithering=M.dithering,this.alphaTest=M.alphaTest,this.alphaToCoverage=M.alphaToCoverage,this.premultipliedAlpha=M.premultipliedAlpha,this.forceSinglePass=M.forceSinglePass,this.visible=M.visible,this.toneMapped=M.toneMapped,this.userData=JSON.parse(JSON.stringify(M.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(M){M===!0&&this.version++}}class Ac extends Fe{constructor(M){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=fI,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.map=M.map,this.lightMap=M.lightMap,this.lightMapIntensity=M.lightMapIntensity,this.aoMap=M.aoMap,this.aoMapIntensity=M.aoMapIntensity,this.specularMap=M.specularMap,this.alphaMap=M.alphaMap,this.envMap=M.envMap,this.combine=M.combine,this.reflectivity=M.reflectivity,this.refractionRatio=M.refractionRatio,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.wireframeLinecap=M.wireframeLinecap,this.wireframeLinejoin=M.wireframeLinejoin,this.fog=M.fog,this}}const PM=new P,xi=new sD;class Be{constructor(M,D,t=!1){if(Array.isArray(M))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=M,this.itemSize=D,this.count=M!==void 0?M.length/D:0,this.normalized=t,this.usage=SI,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(M){M===!0&&this.version++}setUsage(M){return this.usage=M,this}copy(M){return this.name=M.name,this.array=new M.array.constructor(M.array),this.itemSize=M.itemSize,this.count=M.count,this.normalized=M.normalized,this.usage=M.usage,this}copyAt(M,D,t){M*=this.itemSize,t*=D.itemSize;for(let e=0,i=this.itemSize;e<i;e++)this.array[M+e]=D.array[t+e];return this}copyArray(M){return this.array.set(M),this}applyMatrix3(M){if(this.itemSize===2)for(let D=0,t=this.count;D<t;D++)xi.fromBufferAttribute(this,D),xi.applyMatrix3(M),this.setXY(D,xi.x,xi.y);else if(this.itemSize===3)for(let D=0,t=this.count;D<t;D++)PM.fromBufferAttribute(this,D),PM.applyMatrix3(M),this.setXYZ(D,PM.x,PM.y,PM.z);return this}applyMatrix4(M){for(let D=0,t=this.count;D<t;D++)PM.fromBufferAttribute(this,D),PM.applyMatrix4(M),this.setXYZ(D,PM.x,PM.y,PM.z);return this}applyNormalMatrix(M){for(let D=0,t=this.count;D<t;D++)PM.fromBufferAttribute(this,D),PM.applyNormalMatrix(M),this.setXYZ(D,PM.x,PM.y,PM.z);return this}transformDirection(M){for(let D=0,t=this.count;D<t;D++)PM.fromBufferAttribute(this,D),PM.transformDirection(M),this.setXYZ(D,PM.x,PM.y,PM.z);return this}set(M,D=0){return this.array.set(M,D),this}getX(M){let D=this.array[M*this.itemSize];return this.normalized&&(D=ui(D,this.array)),D}setX(M,D){return this.normalized&&(D=ED(D,this.array)),this.array[M*this.itemSize]=D,this}getY(M){let D=this.array[M*this.itemSize+1];return this.normalized&&(D=ui(D,this.array)),D}setY(M,D){return this.normalized&&(D=ED(D,this.array)),this.array[M*this.itemSize+1]=D,this}getZ(M){let D=this.array[M*this.itemSize+2];return this.normalized&&(D=ui(D,this.array)),D}setZ(M,D){return this.normalized&&(D=ED(D,this.array)),this.array[M*this.itemSize+2]=D,this}getW(M){let D=this.array[M*this.itemSize+3];return this.normalized&&(D=ui(D,this.array)),D}setW(M,D){return this.normalized&&(D=ED(D,this.array)),this.array[M*this.itemSize+3]=D,this}setXY(M,D,t){return M*=this.itemSize,this.normalized&&(D=ED(D,this.array),t=ED(t,this.array)),this.array[M+0]=D,this.array[M+1]=t,this}setXYZ(M,D,t,e){return M*=this.itemSize,this.normalized&&(D=ED(D,this.array),t=ED(t,this.array),e=ED(e,this.array)),this.array[M+0]=D,this.array[M+1]=t,this.array[M+2]=e,this}setXYZW(M,D,t,e,i){return M*=this.itemSize,this.normalized&&(D=ED(D,this.array),t=ED(t,this.array),e=ED(e,this.array),i=ED(i,this.array)),this.array[M+0]=D,this.array[M+1]=t,this.array[M+2]=e,this.array[M+3]=i,this}onUpload(M){return this.onUploadCallback=M,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const M={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(M.name=this.name),this.usage!==SI&&(M.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(M.updateRange=this.updateRange),M}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class zc extends Be{constructor(M,D,t){super(new Uint16Array(M),D,t)}}class nc extends Be{constructor(M,D,t){super(new Uint32Array(M),D,t)}}class yt extends Be{constructor(M,D,t){super(new Float32Array(M),D,t)}}let Ic=0;const QD=new lD,iz=new mD,Ge=new P,dD=new yN,LN=new yN,JM=new P;class De extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ic++}),this.uuid=cN(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(M){return Array.isArray(M)?this.index=new(Vr(M)?nc:zc)(M,1):this.index=M,this}getAttribute(M){return this.attributes[M]}setAttribute(M,D){return this.attributes[M]=D,this}deleteAttribute(M){return delete this.attributes[M],this}hasAttribute(M){return this.attributes[M]!==void 0}addGroup(M,D,t=0){this.groups.push({start:M,count:D,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(M,D){this.drawRange.start=M,this.drawRange.count=D}applyMatrix4(M){const D=this.attributes.position;D!==void 0&&(D.applyMatrix4(M),D.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const i=new Qe().getNormalMatrix(M);t.applyNormalMatrix(i),t.needsUpdate=!0}const e=this.attributes.tangent;return e!==void 0&&(e.transformDirection(M),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(M){return QD.makeRotationFromQuaternion(M),this.applyMatrix4(QD),this}rotateX(M){return QD.makeRotationX(M),this.applyMatrix4(QD),this}rotateY(M){return QD.makeRotationY(M),this.applyMatrix4(QD),this}rotateZ(M){return QD.makeRotationZ(M),this.applyMatrix4(QD),this}translate(M,D,t){return QD.makeTranslation(M,D,t),this.applyMatrix4(QD),this}scale(M,D,t){return QD.makeScale(M,D,t),this.applyMatrix4(QD),this}lookAt(M){return iz.lookAt(M),iz.updateMatrix(),this.applyMatrix4(iz.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ge).negate(),this.translate(Ge.x,Ge.y,Ge.z),this}setFromPoints(M){const D=[];for(let t=0,e=M.length;t<e;t++){const i=M[t];D.push(i.x,i.y,i.z||0)}return this.setAttribute("position",new yt(D,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yN);const M=this.attributes.position,D=this.morphAttributes.position;if(M&&M.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(M!==void 0){if(this.boundingBox.setFromBufferAttribute(M),D)for(let t=0,e=D.length;t<e;t++){const i=D[t];dD.setFromBufferAttribute(i),this.morphTargetsRelative?(JM.addVectors(this.boundingBox.min,dD.min),this.boundingBox.expandByPoint(JM),JM.addVectors(this.boundingBox.max,dD.max),this.boundingBox.expandByPoint(JM)):(this.boundingBox.expandByPoint(dD.min),this.boundingBox.expandByPoint(dD.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi);const M=this.attributes.position,D=this.morphAttributes.position;if(M&&M.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(M){const t=this.boundingSphere.center;if(dD.setFromBufferAttribute(M),D)for(let i=0,z=D.length;i<z;i++){const A=D[i];LN.setFromBufferAttribute(A),this.morphTargetsRelative?(JM.addVectors(dD.min,LN.min),dD.expandByPoint(JM),JM.addVectors(dD.max,LN.max),dD.expandByPoint(JM)):(dD.expandByPoint(LN.min),dD.expandByPoint(LN.max))}dD.getCenter(t);let e=0;for(let i=0,z=M.count;i<z;i++)JM.fromBufferAttribute(M,i),e=Math.max(e,t.distanceToSquared(JM));if(D)for(let i=0,z=D.length;i<z;i++){const A=D[i],I=this.morphTargetsRelative;for(let n=0,T=A.count;n<T;n++)JM.fromBufferAttribute(A,n),I&&(Ge.fromBufferAttribute(M,n),JM.add(Ge)),e=Math.max(e,t.distanceToSquared(JM))}this.boundingSphere.radius=Math.sqrt(e),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const M=this.index,D=this.attributes;if(M===null||D.position===void 0||D.normal===void 0||D.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=M.array,e=D.position.array,i=D.normal.array,z=D.uv.array,A=e.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Be(new Float32Array(4*A),4));const I=this.getAttribute("tangent").array,n=[],T=[];for(let p=0;p<A;p++)n[p]=new P,T[p]=new P;const u=new P,g=new P,s=new P,j=new sD,r=new sD,c=new sD,y=new P,w=new P;function a(p,B,G){u.fromArray(e,p*3),g.fromArray(e,B*3),s.fromArray(e,G*3),j.fromArray(z,p*2),r.fromArray(z,B*2),c.fromArray(z,G*2),g.sub(u),s.sub(u),r.sub(j),c.sub(j);const Q=1/(r.x*c.y-c.x*r.y);isFinite(Q)&&(y.copy(g).multiplyScalar(c.y).addScaledVector(s,-r.y).multiplyScalar(Q),w.copy(s).multiplyScalar(r.x).addScaledVector(g,-c.x).multiplyScalar(Q),n[p].add(y),n[B].add(y),n[G].add(y),T[p].add(w),T[B].add(w),T[G].add(w))}let o=this.groups;o.length===0&&(o=[{start:0,count:t.length}]);for(let p=0,B=o.length;p<B;++p){const G=o[p],Q=G.start,m=G.count;for(let Z=Q,H=Q+m;Z<H;Z+=3)a(t[Z+0],t[Z+1],t[Z+2])}const O=new P,h=new P,d=new P,L=new P;function l(p){d.fromArray(i,p*3),L.copy(d);const B=n[p];O.copy(B),O.sub(d.multiplyScalar(d.dot(B))).normalize(),h.crossVectors(L,B);const Q=h.dot(T[p])<0?-1:1;I[p*4]=O.x,I[p*4+1]=O.y,I[p*4+2]=O.z,I[p*4+3]=Q}for(let p=0,B=o.length;p<B;++p){const G=o[p],Q=G.start,m=G.count;for(let Z=Q,H=Q+m;Z<H;Z+=3)l(t[Z+0]),l(t[Z+1]),l(t[Z+2])}}computeVertexNormals(){const M=this.index,D=this.getAttribute("position");if(D!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new Be(new Float32Array(D.count*3),3),this.setAttribute("normal",t);else for(let g=0,s=t.count;g<s;g++)t.setXYZ(g,0,0,0);const e=new P,i=new P,z=new P,A=new P,I=new P,n=new P,T=new P,u=new P;if(M)for(let g=0,s=M.count;g<s;g+=3){const j=M.getX(g+0),r=M.getX(g+1),c=M.getX(g+2);e.fromBufferAttribute(D,j),i.fromBufferAttribute(D,r),z.fromBufferAttribute(D,c),T.subVectors(z,i),u.subVectors(e,i),T.cross(u),A.fromBufferAttribute(t,j),I.fromBufferAttribute(t,r),n.fromBufferAttribute(t,c),A.add(T),I.add(T),n.add(T),t.setXYZ(j,A.x,A.y,A.z),t.setXYZ(r,I.x,I.y,I.z),t.setXYZ(c,n.x,n.y,n.z)}else for(let g=0,s=D.count;g<s;g+=3)e.fromBufferAttribute(D,g+0),i.fromBufferAttribute(D,g+1),z.fromBufferAttribute(D,g+2),T.subVectors(z,i),u.subVectors(e,i),T.cross(u),t.setXYZ(g+0,T.x,T.y,T.z),t.setXYZ(g+1,T.x,T.y,T.z),t.setXYZ(g+2,T.x,T.y,T.z);this.normalizeNormals(),t.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const M=this.attributes.normal;for(let D=0,t=M.count;D<t;D++)JM.fromBufferAttribute(M,D),JM.normalize(),M.setXYZ(D,JM.x,JM.y,JM.z)}toNonIndexed(){function M(A,I){const n=A.array,T=A.itemSize,u=A.normalized,g=new n.constructor(I.length*T);let s=0,j=0;for(let r=0,c=I.length;r<c;r++){A.isInterleavedBufferAttribute?s=I[r]*A.data.stride+A.offset:s=I[r]*T;for(let y=0;y<T;y++)g[j++]=n[s++]}return new Be(g,T,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const D=new De,t=this.index.array,e=this.attributes;for(const A in e){const I=e[A],n=M(I,t);D.setAttribute(A,n)}const i=this.morphAttributes;for(const A in i){const I=[],n=i[A];for(let T=0,u=n.length;T<u;T++){const g=n[T],s=M(g,t);I.push(s)}D.morphAttributes[A]=I}D.morphTargetsRelative=this.morphTargetsRelative;const z=this.groups;for(let A=0,I=z.length;A<I;A++){const n=z[A];D.addGroup(n.start,n.count,n.materialIndex)}return D}toJSON(){const M={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(M.uuid=this.uuid,M.type=this.type,this.name!==""&&(M.name=this.name),Object.keys(this.userData).length>0&&(M.userData=this.userData),this.parameters!==void 0){const I=this.parameters;for(const n in I)I[n]!==void 0&&(M[n]=I[n]);return M}M.data={attributes:{}};const D=this.index;D!==null&&(M.data.index={type:D.array.constructor.name,array:Array.prototype.slice.call(D.array)});const t=this.attributes;for(const I in t){const n=t[I];M.data.attributes[I]=n.toJSON(M.data)}const e={};let i=!1;for(const I in this.morphAttributes){const n=this.morphAttributes[I],T=[];for(let u=0,g=n.length;u<g;u++){const s=n[u];T.push(s.toJSON(M.data))}T.length>0&&(e[I]=T,i=!0)}i&&(M.data.morphAttributes=e,M.data.morphTargetsRelative=this.morphTargetsRelative);const z=this.groups;z.length>0&&(M.data.groups=JSON.parse(JSON.stringify(z)));const A=this.boundingSphere;return A!==null&&(M.data.boundingSphere={center:A.center.toArray(),radius:A.radius}),M}clone(){return new this.constructor().copy(this)}copy(M){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const D={};this.name=M.name;const t=M.index;t!==null&&this.setIndex(t.clone(D));const e=M.attributes;for(const n in e){const T=e[n];this.setAttribute(n,T.clone(D))}const i=M.morphAttributes;for(const n in i){const T=[],u=i[n];for(let g=0,s=u.length;g<s;g++)T.push(u[g].clone(D));this.morphAttributes[n]=T}this.morphTargetsRelative=M.morphTargetsRelative;const z=M.groups;for(let n=0,T=z.length;n<T;n++){const u=z[n];this.addGroup(u.start,u.count,u.materialIndex)}const A=M.boundingBox;A!==null&&(this.boundingBox=A.clone());const I=M.boundingSphere;return I!==null&&(this.boundingSphere=I.clone()),this.drawRange.start=M.drawRange.start,this.drawRange.count=M.drawRange.count,this.userData=M.userData,M.parameters!==void 0&&(this.parameters=Object.assign({},M.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const WI=new lD,Ve=new Mz,Az=new yi,wN=new P,xN=new P,ON=new P,zz=new P,Oi=new P,Ei=new sD,li=new sD,hi=new sD,nz=new P,di=new P;class XI extends mD{constructor(M=new De,D=new Ac){super(),this.isMesh=!0,this.type="Mesh",this.geometry=M,this.material=D,this.updateMorphTargets()}copy(M,D){return super.copy(M,D),M.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=M.morphTargetInfluences.slice()),M.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},M.morphTargetDictionary)),this.material=M.material,this.geometry=M.geometry,this}updateMorphTargets(){const D=this.geometry.morphAttributes,t=Object.keys(D);if(t.length>0){const e=D[t[0]];if(e!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,z=e.length;i<z;i++){const A=e[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[A]=i}}}}getVertexPosition(M,D){const t=this.geometry,e=t.attributes.position,i=t.morphAttributes.position,z=t.morphTargetsRelative;D.fromBufferAttribute(e,M);const A=this.morphTargetInfluences;if(i&&A){Oi.set(0,0,0);for(let I=0,n=i.length;I<n;I++){const T=A[I],u=i[I];T!==0&&(zz.fromBufferAttribute(u,M),z?Oi.addScaledVector(zz,T):Oi.addScaledVector(zz.sub(D),T))}D.add(Oi)}return this.isSkinnedMesh&&this.boneTransform(M,D),D}raycast(M,D){const t=this.geometry,e=this.material,i=this.matrixWorld;if(e===void 0||(t.boundingSphere===null&&t.computeBoundingSphere(),Az.copy(t.boundingSphere),Az.applyMatrix4(i),M.ray.intersectsSphere(Az)===!1)||(WI.copy(i).invert(),Ve.copy(M.ray).applyMatrix4(WI),t.boundingBox!==null&&Ve.intersectsBox(t.boundingBox)===!1))return;let z;const A=t.index,I=t.attributes.position,n=t.attributes.uv,T=t.attributes.uv2,u=t.groups,g=t.drawRange;if(A!==null)if(Array.isArray(e))for(let s=0,j=u.length;s<j;s++){const r=u[s],c=e[r.materialIndex],y=Math.max(r.start,g.start),w=Math.min(A.count,Math.min(r.start+r.count,g.start+g.count));for(let a=y,o=w;a<o;a+=3){const O=A.getX(a),h=A.getX(a+1),d=A.getX(a+2);z=vi(this,c,M,Ve,n,T,O,h,d),z&&(z.faceIndex=Math.floor(a/3),z.face.materialIndex=r.materialIndex,D.push(z))}}else{const s=Math.max(0,g.start),j=Math.min(A.count,g.start+g.count);for(let r=s,c=j;r<c;r+=3){const y=A.getX(r),w=A.getX(r+1),a=A.getX(r+2);z=vi(this,e,M,Ve,n,T,y,w,a),z&&(z.faceIndex=Math.floor(r/3),D.push(z))}}else if(I!==void 0)if(Array.isArray(e))for(let s=0,j=u.length;s<j;s++){const r=u[s],c=e[r.materialIndex],y=Math.max(r.start,g.start),w=Math.min(I.count,Math.min(r.start+r.count,g.start+g.count));for(let a=y,o=w;a<o;a+=3){const O=a,h=a+1,d=a+2;z=vi(this,c,M,Ve,n,T,O,h,d),z&&(z.faceIndex=Math.floor(a/3),z.face.materialIndex=r.materialIndex,D.push(z))}}else{const s=Math.max(0,g.start),j=Math.min(I.count,g.start+g.count);for(let r=s,c=j;r<c;r+=3){const y=r,w=r+1,a=r+2;z=vi(this,e,M,Ve,n,T,y,w,a),z&&(z.faceIndex=Math.floor(r/3),D.push(z))}}}}function Tc(N,M,D,t,e,i,z,A){let I;if(M.side===mr?I=t.intersectTriangle(z,i,e,!0,A):I=t.intersectTriangle(e,i,z,M.side===_A,A),I===null)return null;di.copy(A),di.applyMatrix4(N.matrixWorld);const n=D.ray.origin.distanceTo(di);return n<D.near||n>D.far?null:{distance:n,point:di.clone(),object:N}}function vi(N,M,D,t,e,i,z,A,I){N.getVertexPosition(z,wN),N.getVertexPosition(A,xN),N.getVertexPosition(I,ON);const n=Tc(N,M,D,t,wN,xN,ON,nz);if(n){e&&(Ei.fromBufferAttribute(e,z),li.fromBufferAttribute(e,A),hi.fromBufferAttribute(e,I),n.uv=jt.getUV(nz,wN,xN,ON,Ei,li,hi,new sD)),i&&(Ei.fromBufferAttribute(i,z),li.fromBufferAttribute(i,A),hi.fromBufferAttribute(i,I),n.uv2=jt.getUV(nz,wN,xN,ON,Ei,li,hi,new sD));const T={a:z,b:A,c:I,normal:new P,materialIndex:0};jt.getNormal(wN,xN,ON,T.normal),n.face=T}return n}class uc extends mD{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Yi extends Fe{constructor(M){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.linewidth=M.linewidth,this.linecap=M.linecap,this.linejoin=M.linejoin,this.fog=M.fog,this}}const qI=new P,$I=new P,JI=new lD,Iz=new Mz,pi=new yi;class gc extends mD{constructor(M=new De,D=new Yi){super(),this.isLine=!0,this.type="Line",this.geometry=M,this.material=D,this.updateMorphTargets()}copy(M,D){return super.copy(M,D),this.material=M.material,this.geometry=M.geometry,this}computeLineDistances(){const M=this.geometry;if(M.index===null){const D=M.attributes.position,t=[0];for(let e=1,i=D.count;e<i;e++)qI.fromBufferAttribute(D,e-1),$I.fromBufferAttribute(D,e),t[e]=t[e-1],t[e]+=qI.distanceTo($I);M.setAttribute("lineDistance",new yt(t,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(M,D){const t=this.geometry,e=this.matrixWorld,i=M.params.Line.threshold,z=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere),pi.applyMatrix4(e),pi.radius+=i,M.ray.intersectsSphere(pi)===!1)return;JI.copy(e).invert(),Iz.copy(M.ray).applyMatrix4(JI);const A=i/((this.scale.x+this.scale.y+this.scale.z)/3),I=A*A,n=new P,T=new P,u=new P,g=new P,s=this.isLineSegments?2:1,j=t.index,c=t.attributes.position;if(j!==null){const y=Math.max(0,z.start),w=Math.min(j.count,z.start+z.count);for(let a=y,o=w-1;a<o;a+=s){const O=j.getX(a),h=j.getX(a+1);if(n.fromBufferAttribute(c,O),T.fromBufferAttribute(c,h),Iz.distanceSqToSegment(n,T,g,u)>I)continue;g.applyMatrix4(this.matrixWorld);const L=M.ray.origin.distanceTo(g);L<M.near||L>M.far||D.push({distance:L,point:u.clone().applyMatrix4(this.matrixWorld),index:a,face:null,faceIndex:null,object:this})}}else{const y=Math.max(0,z.start),w=Math.min(c.count,z.start+z.count);for(let a=y,o=w-1;a<o;a+=s){if(n.fromBufferAttribute(c,a),T.fromBufferAttribute(c,a+1),Iz.distanceSqToSegment(n,T,g,u)>I)continue;g.applyMatrix4(this.matrixWorld);const h=M.ray.origin.distanceTo(g);h<M.near||h>M.far||D.push({distance:h,point:u.clone().applyMatrix4(this.matrixWorld),index:a,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const D=this.geometry.morphAttributes,t=Object.keys(D);if(t.length>0){const e=D[t[0]];if(e!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,z=e.length;i<z;i++){const A=e[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[A]=i}}}}}const MT=new P,DT=new P;class tT extends gc{constructor(M,D){super(M,D),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const M=this.geometry;if(M.index===null){const D=M.attributes.position,t=[];for(let e=0,i=D.count;e<i;e+=2)MT.fromBufferAttribute(D,e),DT.fromBufferAttribute(D,e+1),t[e]=e===0?0:t[e-1],t[e+1]=t[e]+MT.distanceTo(DT);M.setAttribute("lineDistance",new yt(t,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class EN extends Fe{constructor(M){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.map=M.map,this.alphaMap=M.alphaMap,this.size=M.size,this.sizeAttenuation=M.sizeAttenuation,this.fog=M.fog,this}}const eT=new lD,Tz=new Mz,Ui=new yi,fi=new P;class uz extends mD{constructor(M=new De,D=new EN){super(),this.isPoints=!0,this.type="Points",this.geometry=M,this.material=D,this.updateMorphTargets()}copy(M,D){return super.copy(M,D),this.material=M.material,this.geometry=M.geometry,this}raycast(M,D){const t=this.geometry,e=this.matrixWorld,i=M.params.Points.threshold,z=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere),Ui.applyMatrix4(e),Ui.radius+=i,M.ray.intersectsSphere(Ui)===!1)return;eT.copy(e).invert(),Tz.copy(M.ray).applyMatrix4(eT);const A=i/((this.scale.x+this.scale.y+this.scale.z)/3),I=A*A,n=t.index,u=t.attributes.position;if(n!==null){const g=Math.max(0,z.start),s=Math.min(n.count,z.start+z.count);for(let j=g,r=s;j<r;j++){const c=n.getX(j);fi.fromBufferAttribute(u,c),NT(fi,c,I,e,M,D,this)}}else{const g=Math.max(0,z.start),s=Math.min(u.count,z.start+z.count);for(let j=g,r=s;j<r;j++)fi.fromBufferAttribute(u,j),NT(fi,j,I,e,M,D,this)}}updateMorphTargets(){const D=this.geometry.morphAttributes,t=Object.keys(D);if(t.length>0){const e=D[t[0]];if(e!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,z=e.length;i<z;i++){const A=e[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[A]=i}}}}}function NT(N,M,D,t,e,i,z){const A=Tz.distanceSqToPoint(N);if(A<D){const I=new P;Tz.closestPointToPoint(N,I),I.applyMatrix4(t);const n=e.ray.origin.distanceTo(I);if(n<e.near||n>e.far)return;i.push({distance:n,distanceToRay:Math.sqrt(A),point:I,index:M,face:null,object:z})}}class sc extends Fe{constructor(M){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Yt(16777215),this.specular=new Yt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fr,this.normalScale=new sD(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=fI,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.specular.copy(M.specular),this.shininess=M.shininess,this.map=M.map,this.lightMap=M.lightMap,this.lightMapIntensity=M.lightMapIntensity,this.aoMap=M.aoMap,this.aoMapIntensity=M.aoMapIntensity,this.emissive.copy(M.emissive),this.emissiveMap=M.emissiveMap,this.emissiveIntensity=M.emissiveIntensity,this.bumpMap=M.bumpMap,this.bumpScale=M.bumpScale,this.normalMap=M.normalMap,this.normalMapType=M.normalMapType,this.normalScale.copy(M.normalScale),this.displacementMap=M.displacementMap,this.displacementScale=M.displacementScale,this.displacementBias=M.displacementBias,this.specularMap=M.specularMap,this.alphaMap=M.alphaMap,this.envMap=M.envMap,this.combine=M.combine,this.reflectivity=M.reflectivity,this.refractionRatio=M.refractionRatio,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.wireframeLinecap=M.wireframeLinecap,this.wireframeLinejoin=M.wireframeLinejoin,this.flatShading=M.flatShading,this.fog=M.fog,this}}const iT={enabled:!1,files:{},add:function(N,M){this.enabled!==!1&&(this.files[N]=M)},get:function(N){if(this.enabled!==!1)return this.files[N]},remove:function(N){delete this.files[N]},clear:function(){this.files={}}};class rc{constructor(M,D,t){const e=this;let i=!1,z=0,A=0,I;const n=[];this.onStart=void 0,this.onLoad=M,this.onProgress=D,this.onError=t,this.itemStart=function(T){A++,i===!1&&e.onStart!==void 0&&e.onStart(T,z,A),i=!0},this.itemEnd=function(T){z++,e.onProgress!==void 0&&e.onProgress(T,z,A),z===A&&(i=!1,e.onLoad!==void 0&&e.onLoad())},this.itemError=function(T){e.onError!==void 0&&e.onError(T)},this.resolveURL=function(T){return I?I(T):T},this.setURLModifier=function(T){return I=T,this},this.addHandler=function(T,u){return n.push(T,u),this},this.removeHandler=function(T){const u=n.indexOf(T);return u!==-1&&n.splice(u,2),this},this.getHandler=function(T){for(let u=0,g=n.length;u<g;u+=2){const s=n[u],j=n[u+1];if(s.global&&(s.lastIndex=0),s.test(T))return j}return null}}}const cc=new rc;class AT{constructor(M){this.manager=M!==void 0?M:cc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(M,D){const t=this;return new Promise(function(e,i){t.load(M,e,D,i)})}parse(){}setCrossOrigin(M){return this.crossOrigin=M,this}setWithCredentials(M){return this.withCredentials=M,this}setPath(M){return this.path=M,this}setResourcePath(M){return this.resourcePath=M,this}setRequestHeader(M){return this.requestHeader=M,this}}const at={};class jc extends Error{constructor(M,D){super(M),this.response=D}}class yc extends AT{constructor(M){super(M)}load(M,D,t,e){M===void 0&&(M=""),this.path!==void 0&&(M=this.path+M),M=this.manager.resolveURL(M);const i=iT.get(M);if(i!==void 0)return this.manager.itemStart(M),setTimeout(()=>{D&&D(i),this.manager.itemEnd(M)},0),i;if(at[M]!==void 0){at[M].push({onLoad:D,onProgress:t,onError:e});return}at[M]=[],at[M].push({onLoad:D,onProgress:t,onError:e});const z=new Request(M,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),A=this.mimeType,I=this.responseType;fetch(z).then(n=>{if(n.status===200||n.status===0){if(n.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||n.body===void 0||n.body.getReader===void 0)return n;const T=at[M],u=n.body.getReader(),g=n.headers.get("Content-Length")||n.headers.get("X-File-Size"),s=g?parseInt(g):0,j=s!==0;let r=0;const c=new ReadableStream({start(y){w();function w(){u.read().then(({done:a,value:o})=>{if(a)y.close();else{r+=o.byteLength;const O=new ProgressEvent("progress",{lengthComputable:j,loaded:r,total:s});for(let h=0,d=T.length;h<d;h++){const L=T[h];L.onProgress&&L.onProgress(O)}y.enqueue(o),w()}})}}});return new Response(c)}else throw new jc(`fetch for "${n.url}" responded with ${n.status}: ${n.statusText}`,n)}).then(n=>{switch(I){case"arraybuffer":return n.arrayBuffer();case"blob":return n.blob();case"document":return n.text().then(T=>new DOMParser().parseFromString(T,A));case"json":return n.json();default:if(A===void 0)return n.text();{const u=/charset="?([^;"\s]*)"?/i.exec(A),g=u&&u[1]?u[1].toLowerCase():void 0,s=new TextDecoder(g);return n.arrayBuffer().then(j=>s.decode(j))}}}).then(n=>{iT.add(M,n);const T=at[M];delete at[M];for(let u=0,g=T.length;u<g;u++){const s=T[u];s.onLoad&&s.onLoad(n)}}).catch(n=>{const T=at[M];if(T===void 0)throw this.manager.itemError(M),n;delete at[M];for(let u=0,g=T.length;u<g;u++){const s=T[u];s.onError&&s.onError(n)}this.manager.itemError(M)}).finally(()=>{this.manager.itemEnd(M)}),this.manager.itemStart(M)}setResponseType(M){return this.responseType=M,this}setMimeType(M){return this.mimeType=M,this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pI}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pI);const ac=/^[og]\s*(.+)?/,oc=/^mtllib /,Cc=/^usemtl /,Lc=/^usemap /,zT=/\s+/,nT=new P,gz=new P,IT=new P,TT=new P,kD=new P,mi=new Yt;function wc(){const N={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(M,D){if(this.object&&this.object.fromDeclaration===!1){this.object.name=M,this.object.fromDeclaration=D!==!1;return}const t=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:M||"",fromDeclaration:D!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(e,i){const z=this._finalize(!1);z&&(z.inherited||z.groupCount<=0)&&this.materials.splice(z.index,1);const A={index:this.materials.length,name:e||"",mtllib:Array.isArray(i)&&i.length>0?i[i.length-1]:"",smooth:z!==void 0?z.smooth:this.smooth,groupStart:z!==void 0?z.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(I){const n={index:typeof I=="number"?I:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return n.clone=this.clone.bind(n),n}};return this.materials.push(A),A},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(e){const i=this.currentMaterial();if(i&&i.groupEnd===-1&&(i.groupEnd=this.geometry.vertices.length/3,i.groupCount=i.groupEnd-i.groupStart,i.inherited=!1),e&&this.materials.length>1)for(let z=this.materials.length-1;z>=0;z--)this.materials[z].groupCount<=0&&this.materials.splice(z,1);return e&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),i}},t&&t.name&&typeof t.clone=="function"){const e=t.clone(0);e.inherited=!0,this.object.materials.push(e)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(M,D){const t=parseInt(M,10);return(t>=0?t-1:t+D/3)*3},parseNormalIndex:function(M,D){const t=parseInt(M,10);return(t>=0?t-1:t+D/3)*3},parseUVIndex:function(M,D){const t=parseInt(M,10);return(t>=0?t-1:t+D/2)*2},addVertex:function(M,D,t){const e=this.vertices,i=this.object.geometry.vertices;i.push(e[M+0],e[M+1],e[M+2]),i.push(e[D+0],e[D+1],e[D+2]),i.push(e[t+0],e[t+1],e[t+2])},addVertexPoint:function(M){const D=this.vertices;this.object.geometry.vertices.push(D[M+0],D[M+1],D[M+2])},addVertexLine:function(M){const D=this.vertices;this.object.geometry.vertices.push(D[M+0],D[M+1],D[M+2])},addNormal:function(M,D,t){const e=this.normals,i=this.object.geometry.normals;i.push(e[M+0],e[M+1],e[M+2]),i.push(e[D+0],e[D+1],e[D+2]),i.push(e[t+0],e[t+1],e[t+2])},addFaceNormal:function(M,D,t){const e=this.vertices,i=this.object.geometry.normals;nT.fromArray(e,M),gz.fromArray(e,D),IT.fromArray(e,t),kD.subVectors(IT,gz),TT.subVectors(nT,gz),kD.cross(TT),kD.normalize(),i.push(kD.x,kD.y,kD.z),i.push(kD.x,kD.y,kD.z),i.push(kD.x,kD.y,kD.z)},addColor:function(M,D,t){const e=this.colors,i=this.object.geometry.colors;e[M]!==void 0&&i.push(e[M+0],e[M+1],e[M+2]),e[D]!==void 0&&i.push(e[D+0],e[D+1],e[D+2]),e[t]!==void 0&&i.push(e[t+0],e[t+1],e[t+2])},addUV:function(M,D,t){const e=this.uvs,i=this.object.geometry.uvs;i.push(e[M+0],e[M+1]),i.push(e[D+0],e[D+1]),i.push(e[t+0],e[t+1])},addDefaultUV:function(){const M=this.object.geometry.uvs;M.push(0,0),M.push(0,0),M.push(0,0)},addUVLine:function(M){const D=this.uvs;this.object.geometry.uvs.push(D[M+0],D[M+1])},addFace:function(M,D,t,e,i,z,A,I,n){const T=this.vertices.length;let u=this.parseVertexIndex(M,T),g=this.parseVertexIndex(D,T),s=this.parseVertexIndex(t,T);if(this.addVertex(u,g,s),this.addColor(u,g,s),A!==void 0&&A!==""){const j=this.normals.length;u=this.parseNormalIndex(A,j),g=this.parseNormalIndex(I,j),s=this.parseNormalIndex(n,j),this.addNormal(u,g,s)}else this.addFaceNormal(u,g,s);if(e!==void 0&&e!==""){const j=this.uvs.length;u=this.parseUVIndex(e,j),g=this.parseUVIndex(i,j),s=this.parseUVIndex(z,j),this.addUV(u,g,s),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(M){this.object.geometry.type="Points";const D=this.vertices.length;for(let t=0,e=M.length;t<e;t++){const i=this.parseVertexIndex(M[t],D);this.addVertexPoint(i),this.addColor(i)}},addLineGeometry:function(M,D){this.object.geometry.type="Line";const t=this.vertices.length,e=this.uvs.length;for(let i=0,z=M.length;i<z;i++)this.addVertexLine(this.parseVertexIndex(M[i],t));for(let i=0,z=D.length;i<z;i++)this.addUVLine(this.parseUVIndex(D[i],e))}};return N.startObject("",!1),N}class xc extends AT{constructor(M){super(M),this.materials=null}load(M,D,t,e){const i=this,z=new yc(this.manager);z.setPath(this.path),z.setRequestHeader(this.requestHeader),z.setWithCredentials(this.withCredentials),z.load(M,function(A){try{D(i.parse(A))}catch(I){e?e(I):console.error(I),i.manager.itemError(M)}},t,e)}setMaterials(M){return this.materials=M,this}parse(M){const D=new wc;M.indexOf(`\r
`)!==-1&&(M=M.replace(/\r\n/g,`
`)),M.indexOf(`\\
`)!==-1&&(M=M.replace(/\\\n/g,""));const t=M.split(`