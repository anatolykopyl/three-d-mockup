var qn=Object.defineProperty;var Jn=(e,M,D)=>M in e?qn(e,M,{enumerable:!0,configurable:!0,writable:!0,value:D}):e[M]=D;var SN=(e,M,D)=>(Jn(e,typeof M!="symbol"?M+"":M,D),D);const te={};function $n(e){te.context=e}const Mu=(e,M)=>e===M,Qz={equals:Mu};let RT=HT;const _e=1,kA=2,PT={owned:null,cleanups:null,context:null,owner:null};var fD=null;let Dt=null,XM=null,rD=null,Ee=null,oz=0;function Du(e,M){const D=XM,t=fD,N=e.length===0,A=N?PT:{owned:null,cleanups:null,context:null,owner:M===void 0?t:M},z=N?e:()=>e(()=>hN(()=>KA(A)));fD=A,XM=null;try{return vN(z,!0)}finally{XM=D,fD=t}}function Nz(e,M){M=M?Object.assign({},Qz,M):Qz;const D={value:e,observers:null,observerSlots:null,comparator:M.equals||void 0},t=N=>(typeof N=="function"&&(N=N(D.value)),FT(D,N));return[Nu.bind(D),t]}function SA(e,M,D){const t=BT(e,M,!1,_e);bA(t)}function eu(e,M,D){RT=zu;const t=BT(e,M,!1,_e);t.user=!0,Ee?Ee.push(t):bA(t)}function hN(e){if(XM===null)return e();const M=XM;XM=null;try{return e()}finally{XM=M}}function tu(e){eu(()=>hN(e))}function Nu(){const e=Dt;if(this.sources&&(this.state||e))if(this.state===_e||e)bA(this);else{const M=rD;rD=null,vN(()=>ZA(this),!1),rD=M}if(XM){const M=this.observers?this.observers.length:0;XM.sources?(XM.sources.push(this),XM.sourceSlots.push(M)):(XM.sources=[this],XM.sourceSlots=[M]),this.observers?(this.observers.push(XM),this.observerSlots.push(XM.sources.length-1)):(this.observers=[XM],this.observerSlots=[XM.sources.length-1])}return this.value}function FT(e,M,D){let t=e.value;return(!e.comparator||!e.comparator(t,M))&&(e.value=M,e.observers&&e.observers.length&&vN(()=>{for(let N=0;N<e.observers.length;N+=1){const A=e.observers[N],z=Dt&&Dt.running;z&&Dt.disposed.has(A),(z&&!A.tState||!z&&!A.state)&&(A.pure?rD.push(A):Ee.push(A),A.observers&&GT(A)),z||(A.state=_e)}if(rD.length>1e6)throw rD=[],new Error},!1)),M}function bA(e){if(!e.fn)return;KA(e);const M=fD,D=XM,t=oz;XM=fD=e,Au(e,e.value,t),XM=D,fD=M}function Au(e,M,D){let t;try{t=e.fn(M)}catch(N){e.pure&&(e.state=_e,e.owned&&e.owned.forEach(KA),e.owned=null),VT(N)}(!e.updatedAt||e.updatedAt<=D)&&(e.updatedAt!=null&&"observers"in e?FT(e,t):e.value=t,e.updatedAt=D)}function BT(e,M,D,t=_e,N){const A={fn:e,state:t,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:M,owner:fD,context:null,pure:D};return fD===null||fD!==PT&&(fD.owned?fD.owned.push(A):fD.owned=[A]),A}function fA(e){const M=Dt;if(e.state===0||M)return;if(e.state===kA||M)return ZA(e);if(e.suspense&&hN(e.suspense.inFallback))return e.suspense.effects.push(e);const D=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<oz);)(e.state||M)&&D.push(e);for(let t=D.length-1;t>=0;t--)if(e=D[t],e.state===_e||M)bA(e);else if(e.state===kA||M){const N=rD;rD=null,vN(()=>ZA(e,D[0]),!1),rD=N}}function vN(e,M){if(rD)return e();let D=!1;M||(rD=[]),Ee?D=!0:Ee=[],oz++;try{const t=e();return iu(D),t}catch(t){D||(Ee=null),rD=null,VT(t)}}function iu(e){if(rD&&(HT(rD),rD=null),e)return;const M=Ee;Ee=null,M.length&&vN(()=>RT(M),!1)}function HT(e){for(let M=0;M<e.length;M++)fA(e[M])}function zu(e){let M,D=0;for(M=0;M<e.length;M++){const t=e[M];t.user?e[D++]=t:fA(t)}for(te.context&&$n(),M=0;M<D;M++)fA(e[M])}function ZA(e,M){const D=Dt;e.state=0;for(let t=0;t<e.sources.length;t+=1){const N=e.sources[t];N.sources&&(N.state===_e||D?N!==M&&fA(N):(N.state===kA||D)&&ZA(N,M))}}function GT(e){const M=Dt;for(let D=0;D<e.observers.length;D+=1){const t=e.observers[D];(!t.state||M)&&(t.state=kA,t.pure?rD.push(t):Ee.push(t),t.observers&&GT(t))}}function KA(e){let M;if(e.sources)for(;e.sources.length;){const D=e.sources.pop(),t=e.sourceSlots.pop(),N=D.observers;if(N&&N.length){const A=N.pop(),z=D.observerSlots.pop();t<N.length&&(A.sourceSlots[z]=t,N[t]=A,D.observerSlots[t]=z)}}if(e.owned){for(M=0;M<e.owned.length;M++)KA(e.owned[M]);e.owned=null}if(e.cleanups){for(M=0;M<e.cleanups.length;M++)e.cleanups[M]();e.cleanups=null}e.state=0,e.context=null}function Iu(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function VT(e){throw e=Iu(e),e}function Tu(e,M){return hN(()=>e(M||{}))}function nu(e,M,D){let t=D.length,N=M.length,A=t,z=0,i=0,T=M[N-1].nextSibling,I=null;for(;z<N||i<A;){if(M[z]===D[i]){z++,i++;continue}for(;M[N-1]===D[A-1];)N--,A--;if(N===z){const n=A<t?i?D[i-1].nextSibling:D[A-i]:T;for(;i<A;)e.insertBefore(D[i++],n)}else if(A===i)for(;z<N;)(!I||!I.has(M[z]))&&M[z].remove(),z++;else if(M[z]===D[A-1]&&D[i]===M[N-1]){const n=M[--N].nextSibling;e.insertBefore(D[i++],M[z++].nextSibling),e.insertBefore(D[--A],n),M[N]=D[A]}else{if(!I){I=new Map;let u=i;for(;u<A;)I.set(D[u],u++)}const n=I.get(M[z]);if(n!=null)if(i<n&&n<A){let u=z,g=1,r;for(;++u<N&&u<A&&!((r=I.get(M[u]))==null||r!==n+g);)g++;if(g>n-i){const a=M[z];for(;i<n;)e.insertBefore(D[i++],a)}else e.replaceChild(D[i++],M[z++])}else z++;else M[z++].remove()}}}const kz="_$DX_DELEGATE";function WT(e,M,D){const t=document.createElement("template");t.innerHTML=e;let N=t.content.firstChild;return D&&(N=N.firstChild),N}function uu(e,M=window.document){const D=M[kz]||(M[kz]=new Set);for(let t=0,N=e.length;t<N;t++){const A=e[t];D.has(A)||(D.add(A),M.addEventListener(A,ru))}}function gu(e,M,D){return hN(()=>e(M,D))}function XT(e,M,D,t){if(D!==void 0&&!t&&(t=[]),typeof M!="function")return _A(e,M,t,D);SA(N=>_A(e,M(),N,D),t)}function ru(e){const M=`$$${e.type}`;let D=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==D&&Object.defineProperty(e,"target",{configurable:!0,value:D}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return D||document}}),te.registry&&!te.done&&(te.done=!0,document.querySelectorAll("[id^=pl-]").forEach(t=>{for(;t&&t.nodeType!==8&&t.nodeValue!=="pl-"+e;){let N=t.nextSibling;t.remove(),t=N}t&&t.remove()}));D;){const t=D[M];if(t&&!D.disabled){const N=D[`${M}Data`];if(N!==void 0?t.call(D,N,e):t.call(D,e),e.cancelBubble)return}D=D._$host||D.parentNode||D.host}}function _A(e,M,D,t,N){for(te.context&&!D&&(D=[...e.childNodes]);typeof D=="function";)D=D();if(M===D)return D;const A=typeof M,z=t!==void 0;if(e=z&&D[0]&&D[0].parentNode||e,A==="string"||A==="number"){if(te.context)return D;if(A==="number"&&(M=M.toString()),z){let i=D[0];i&&i.nodeType===3?i.data=M:i=document.createTextNode(M),D=ut(e,D,t,i)}else D!==""&&typeof D=="string"?D=e.firstChild.data=M:D=e.textContent=M}else if(M==null||A==="boolean"){if(te.context)return D;D=ut(e,D,t)}else{if(A==="function")return SA(()=>{let i=M();for(;typeof i=="function";)i=i();D=_A(e,i,D,t)}),()=>D;if(Array.isArray(M)){const i=[],T=D&&Array.isArray(D);if(Az(i,M,D,N))return SA(()=>D=_A(e,i,D,t,!0)),()=>D;if(te.context){if(!i.length)return D;for(let I=0;I<i.length;I++)if(i[I].parentNode)return D=i}if(i.length===0){if(D=ut(e,D,t),z)return D}else T?D.length===0?Sz(e,i,t):nu(e,D,i):(D&&ut(e),Sz(e,i));D=i}else if(M instanceof Node){if(te.context&&M.parentNode)return D=z?[M]:M;if(Array.isArray(D)){if(z)return D=ut(e,D,t,M);ut(e,D,null,M)}else D==null||D===""||!e.firstChild?e.appendChild(M):e.replaceChild(M,e.firstChild);D=M}}return D}function Az(e,M,D,t){let N=!1;for(let A=0,z=M.length;A<z;A++){let i=M[A],T=D&&D[A];if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))N=Az(e,i,T)||N;else if(typeof i=="function")if(t){for(;typeof i=="function";)i=i();N=Az(e,Array.isArray(i)?i:[i],Array.isArray(T)?T:[T])||N}else e.push(i),N=!0;else{const I=String(i);T&&T.nodeType===3&&T.data===I?e.push(T):e.push(document.createTextNode(I))}}return N}function Sz(e,M,D=null){for(let t=0,N=M.length;t<N;t++)e.insertBefore(M[t],D)}function ut(e,M,D,t){if(D===void 0)return e.textContent="";const N=t||document.createTextNode("");if(M.length){let A=!1;for(let z=M.length-1;z>=0;z--){const i=M[z];if(N!==i){const T=i.parentNode===e;!A&&!z?T?e.replaceChild(N,i):e.insertBefore(N,D):T&&i.remove()}else A=!0}}else e.insertBefore(N,D);return[N]}function su(e){return Object.keys(e).reduce((M,D)=>{const t=e[D];return M[D]=Object.assign({},t),JT(t.value)&&!ou(t.value)&&!Array.isArray(t.value)&&(M[D].value=Object.assign({},t.value)),Array.isArray(t.value)&&(M[D].value=t.value.slice(0)),M},{})}function au(e){return e?Object.keys(e).reduce((M,D)=>{const t=e[D];return M[D]=JT(t)&&"value"in t?t:{value:t},M[D].attribute||(M[D].attribute=yu(D)),M[D].parse="parse"in M[D]?M[D].parse:typeof M[D].value!="string",M},{}):{}}function ju(e){return Object.keys(e).reduce((M,D)=>(M[D]=e[D].value,M),{})}function cu(e,M){const D=su(M);return Object.keys(M).forEach(t=>{const N=D[t],A=e.getAttribute(N.attribute),z=e[t];A&&(N.value=N.parse?qT(A):A),z!=null&&(N.value=Array.isArray(z)?z.slice(0):z),N.reflect&&fz(e,N.attribute,N.value),Object.defineProperty(e,t,{get(){return N.value},set(i){const T=N.value;N.value=i,N.reflect&&fz(this,N.attribute,N.value);for(let I=0,n=this.__propertyChangedCallbacks.length;I<n;I++)this.__propertyChangedCallbacks[I](t,i,T)},enumerable:!0,configurable:!0})}),D}function qT(e){if(e)try{return JSON.parse(e)}catch{return e}}function fz(e,M,D){if(D==null||D===!1)return e.removeAttribute(M);let t=JSON.stringify(D);e.__updating[M]=!0,t==="true"&&(t=""),e.setAttribute(M,t),Promise.resolve().then(()=>delete e.__updating[M])}function yu(e){return e.replace(/\.?([A-Z]+)/g,(M,D)=>"-"+D.toLowerCase()).replace("_","-").replace(/^-/,"")}function JT(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function ou(e){return Object.prototype.toString.call(e)==="[object Function]"}function Cu(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let $A;function Lu(e,M){const D=Object.keys(M);return class extends e{static get observedAttributes(){return D.map(t=>M[t].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=cu(this,M);const t=ju(this.props),N=this.Component,A=$A;try{$A=this,this.__initialized=!0,Cu(N)?new N(t,{element:this}):N(t,{element:this})}finally{$A=A}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let t=null;for(;t=this.__releaseCallbacks.pop();)t(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(t,N,A){if(this.__initialized&&!this.__updating[t]&&(t=this.lookupProp(t),t in M)){if(A==null&&!this[t])return;this[t]=M[t].parse?qT(A):A}}lookupProp(t){if(M)return D.find(N=>t===N||t===M[N].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(t){this.__releaseCallbacks.push(t)}addPropertyChangedCallback(t){this.__propertyChangedCallbacks.push(t)}}}function wu(e,M={},D={}){const{BaseElement:t=HTMLElement,extension:N}=D;return A=>{if(!e)throw new Error("tag is required to register a Component");let z=customElements.get(e);return z?(z.prototype.Component=A,z):(z=Lu(t,au(M)),z.prototype.Component=A,z.prototype.registeredTag=e,customElements.define(e,z,N),z)}}function Ou(e){const M=Object.keys(e),D={};for(let t=0;t<M.length;t++){const[N,A]=Nz(e[M[t]]);Object.defineProperty(D,M[t],{get:N,set(z){A(()=>z)}})}return D}function xu(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let M=e.parentNode;for(;M&&!M._$owner&&!(M.assignedSlot&&M.assignedSlot._$owner);)M=M.parentNode;return M&&M.assignedSlot?M.assignedSlot._$owner:e._$owner}function Eu(e){return(M,D)=>{const{element:t}=D;return Du(N=>{const A=Ou(M);t.addPropertyChangedCallback((i,T)=>A[i]=T),t.addReleaseCallback(()=>{t.renderRoot.textContent="",N()});const z=e(A,D);return XT(t.renderRoot,z)},xu(t))}}function lu(e,M,D){return arguments.length===2&&(D=M,M={}),wu(e,M)(Eu(D))}const ID=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mi=Math.PI/180,iz=180/Math.PI;function MN(){const e=Math.random()*4294967295|0,M=Math.random()*4294967295|0,D=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(ID[e&255]+ID[e>>8&255]+ID[e>>16&255]+ID[e>>24&255]+"-"+ID[M&255]+ID[M>>8&255]+"-"+ID[M>>16&15|64]+ID[M>>24&255]+"-"+ID[D&63|128]+ID[D>>8&255]+"-"+ID[D>>16&255]+ID[D>>24&255]+ID[t&255]+ID[t>>8&255]+ID[t>>16&255]+ID[t>>24&255]).toLowerCase()}function gD(e,M,D){return Math.max(M,Math.min(D,e))}function hu(e,M){return(e%M+M)%M}function Di(e,M,D){return(1-D)*e+D*M}function Zz(e){return(e&e-1)===0&&e!==0}function vu(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function fN(e,M){switch(M.constructor){case Float32Array:return e;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function ED(e,M){switch(M.constructor){case Float32Array:return e;case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}let dN=class{constructor(e=0,M=0,D=0,t=1){this.isQuaternion=!0,this._x=e,this._y=M,this._z=D,this._w=t}static slerpFlat(e,M,D,t,N,A,z){let i=D[t+0],T=D[t+1],I=D[t+2],n=D[t+3];const u=N[A+0],g=N[A+1],r=N[A+2],a=N[A+3];if(z===0){e[M+0]=i,e[M+1]=T,e[M+2]=I,e[M+3]=n;return}if(z===1){e[M+0]=u,e[M+1]=g,e[M+2]=r,e[M+3]=a;return}if(n!==a||i!==u||T!==g||I!==r){let c=1-z;const j=i*u+T*g+I*r+n*a,s=j>=0?1:-1,L=1-j*j;if(L>Number.EPSILON){const x=Math.sqrt(L),O=Math.atan2(x,j*s);c=Math.sin(c*O)/x,z=Math.sin(z*O)/x}const y=z*s;if(i=i*c+u*y,T=T*c+g*y,I=I*c+r*y,n=n*c+a*y,c===1-z){const x=1/Math.sqrt(i*i+T*T+I*I+n*n);i*=x,T*=x,I*=x,n*=x}}e[M]=i,e[M+1]=T,e[M+2]=I,e[M+3]=n}static multiplyQuaternionsFlat(e,M,D,t,N,A){const z=D[t],i=D[t+1],T=D[t+2],I=D[t+3],n=N[A],u=N[A+1],g=N[A+2],r=N[A+3];return e[M]=z*r+I*n+i*g-T*u,e[M+1]=i*r+I*u+T*n-z*g,e[M+2]=T*r+I*g+z*u-i*n,e[M+3]=I*r-z*n-i*u-T*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,M,D,t){return this._x=e,this._y=M,this._z=D,this._w=t,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,M){const D=e._x,t=e._y,N=e._z,A=e._order,z=Math.cos,i=Math.sin,T=z(D/2),I=z(t/2),n=z(N/2),u=i(D/2),g=i(t/2),r=i(N/2);switch(A){case"XYZ":this._x=u*I*n+T*g*r,this._y=T*g*n-u*I*r,this._z=T*I*r+u*g*n,this._w=T*I*n-u*g*r;break;case"YXZ":this._x=u*I*n+T*g*r,this._y=T*g*n-u*I*r,this._z=T*I*r-u*g*n,this._w=T*I*n+u*g*r;break;case"ZXY":this._x=u*I*n-T*g*r,this._y=T*g*n+u*I*r,this._z=T*I*r+u*g*n,this._w=T*I*n-u*g*r;break;case"ZYX":this._x=u*I*n-T*g*r,this._y=T*g*n+u*I*r,this._z=T*I*r-u*g*n,this._w=T*I*n+u*g*r;break;case"YZX":this._x=u*I*n+T*g*r,this._y=T*g*n+u*I*r,this._z=T*I*r-u*g*n,this._w=T*I*n-u*g*r;break;case"XZY":this._x=u*I*n-T*g*r,this._y=T*g*n-u*I*r,this._z=T*I*r+u*g*n,this._w=T*I*n+u*g*r;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+A)}return M!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,M){const D=M/2,t=Math.sin(D);return this._x=e.x*t,this._y=e.y*t,this._z=e.z*t,this._w=Math.cos(D),this._onChangeCallback(),this}setFromRotationMatrix(e){const M=e.elements,D=M[0],t=M[4],N=M[8],A=M[1],z=M[5],i=M[9],T=M[2],I=M[6],n=M[10],u=D+z+n;if(u>0){const g=.5/Math.sqrt(u+1);this._w=.25/g,this._x=(I-i)*g,this._y=(N-T)*g,this._z=(A-t)*g}else if(D>z&&D>n){const g=2*Math.sqrt(1+D-z-n);this._w=(I-i)/g,this._x=.25*g,this._y=(t+A)/g,this._z=(N+T)/g}else if(z>n){const g=2*Math.sqrt(1+z-D-n);this._w=(N-T)/g,this._x=(t+A)/g,this._y=.25*g,this._z=(i+I)/g}else{const g=2*Math.sqrt(1+n-D-z);this._w=(A-t)/g,this._x=(N+T)/g,this._y=(i+I)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,M){let D=e.dot(M)+1;return D<Number.EPSILON?(D=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=D):(this._x=0,this._y=-e.z,this._z=e.y,this._w=D)):(this._x=e.y*M.z-e.z*M.y,this._y=e.z*M.x-e.x*M.z,this._z=e.x*M.y-e.y*M.x,this._w=D),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gD(this.dot(e),-1,1)))}rotateTowards(e,M){const D=this.angleTo(e);if(D===0)return this;const t=Math.min(1,M/D);return this.slerp(e,t),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,M){const D=e._x,t=e._y,N=e._z,A=e._w,z=M._x,i=M._y,T=M._z,I=M._w;return this._x=D*I+A*z+t*T-N*i,this._y=t*I+A*i+N*z-D*T,this._z=N*I+A*T+D*i-t*z,this._w=A*I-D*z-t*i-N*T,this._onChangeCallback(),this}slerp(e,M){if(M===0)return this;if(M===1)return this.copy(e);const D=this._x,t=this._y,N=this._z,A=this._w;let z=A*e._w+D*e._x+t*e._y+N*e._z;if(z<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,z=-z):this.copy(e),z>=1)return this._w=A,this._x=D,this._y=t,this._z=N,this;const i=1-z*z;if(i<=Number.EPSILON){const g=1-M;return this._w=g*A+M*this._w,this._x=g*D+M*this._x,this._y=g*t+M*this._y,this._z=g*N+M*this._z,this.normalize(),this._onChangeCallback(),this}const T=Math.sqrt(i),I=Math.atan2(T,z),n=Math.sin((1-M)*I)/T,u=Math.sin(M*I)/T;return this._w=A*n+this._w*u,this._x=D*n+this._x*u,this._y=t*n+this._y*u,this._z=N*n+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,M,D){return this.copy(e).slerp(M,D)}random(){const e=Math.random(),M=Math.sqrt(1-e),D=Math.sqrt(e),t=2*Math.PI*Math.random(),N=2*Math.PI*Math.random();return this.set(M*Math.cos(t),D*Math.sin(N),D*Math.cos(N),M*Math.sin(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,M=0){return this._x=e[M],this._y=e[M+1],this._z=e[M+2],this._w=e[M+3],this._onChangeCallback(),this}toArray(e=[],M=0){return e[M]=this._x,e[M+1]=this._y,e[M+2]=this._z,e[M+3]=this._w,e}fromBufferAttribute(e,M){return this._x=e.getX(M),this._y=e.getY(M),this._z=e.getZ(M),this._w=e.getW(M),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class $T{constructor(M=0,D=0,t=0){$T.prototype.isVector3=!0,this.x=M,this.y=D,this.z=t}set(M,D,t){return t===void 0&&(t=this.z),this.x=M,this.y=D,this.z=t,this}setScalar(M){return this.x=M,this.y=M,this.z=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setZ(M){return this.z=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;case 2:this.z=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(M){return this.x=M.x,this.y=M.y,this.z=M.z,this}add(M){return this.x+=M.x,this.y+=M.y,this.z+=M.z,this}addScalar(M){return this.x+=M,this.y+=M,this.z+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this.z=M.z+D.z,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this.z+=M.z*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this.z-=M.z,this}subScalar(M){return this.x-=M,this.y-=M,this.z-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this.z=M.z-D.z,this}multiply(M){return this.x*=M.x,this.y*=M.y,this.z*=M.z,this}multiplyScalar(M){return this.x*=M,this.y*=M,this.z*=M,this}multiplyVectors(M,D){return this.x=M.x*D.x,this.y=M.y*D.y,this.z=M.z*D.z,this}applyEuler(M){return this.applyQuaternion(_z.setFromEuler(M))}applyAxisAngle(M,D){return this.applyQuaternion(_z.setFromAxisAngle(M,D))}applyMatrix3(M){const D=this.x,t=this.y,N=this.z,A=M.elements;return this.x=A[0]*D+A[3]*t+A[6]*N,this.y=A[1]*D+A[4]*t+A[7]*N,this.z=A[2]*D+A[5]*t+A[8]*N,this}applyNormalMatrix(M){return this.applyMatrix3(M).normalize()}applyMatrix4(M){const D=this.x,t=this.y,N=this.z,A=M.elements,z=1/(A[3]*D+A[7]*t+A[11]*N+A[15]);return this.x=(A[0]*D+A[4]*t+A[8]*N+A[12])*z,this.y=(A[1]*D+A[5]*t+A[9]*N+A[13])*z,this.z=(A[2]*D+A[6]*t+A[10]*N+A[14])*z,this}applyQuaternion(M){const D=this.x,t=this.y,N=this.z,A=M.x,z=M.y,i=M.z,T=M.w,I=T*D+z*N-i*t,n=T*t+i*D-A*N,u=T*N+A*t-z*D,g=-A*D-z*t-i*N;return this.x=I*T+g*-A+n*-i-u*-z,this.y=n*T+g*-z+u*-A-I*-i,this.z=u*T+g*-i+I*-z-n*-A,this}project(M){return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix)}unproject(M){return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld)}transformDirection(M){const D=this.x,t=this.y,N=this.z,A=M.elements;return this.x=A[0]*D+A[4]*t+A[8]*N,this.y=A[1]*D+A[5]*t+A[9]*N,this.z=A[2]*D+A[6]*t+A[10]*N,this.normalize()}divide(M){return this.x/=M.x,this.y/=M.y,this.z/=M.z,this}divideScalar(M){return this.multiplyScalar(1/M)}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this.z=Math.min(this.z,M.z),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this.z=Math.max(this.z,M.z),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this.z=Math.max(M.z,Math.min(D.z,this.z)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this.z=Math.max(M,Math.min(D,this.z)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(M){return this.x*M.x+this.y*M.y+this.z*M.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this.z+=(M.z-this.z)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this.z=M.z+(D.z-M.z)*t,this}cross(M){return this.crossVectors(this,M)}crossVectors(M,D){const t=M.x,N=M.y,A=M.z,z=D.x,i=D.y,T=D.z;return this.x=N*T-A*i,this.y=A*z-t*T,this.z=t*i-N*z,this}projectOnVector(M){const D=M.lengthSq();if(D===0)return this.set(0,0,0);const t=M.dot(this)/D;return this.copy(M).multiplyScalar(t)}projectOnPlane(M){return ei.copy(this).projectOnVector(M),this.sub(ei)}reflect(M){return this.sub(ei.copy(M).multiplyScalar(2*this.dot(M)))}angleTo(M){const D=Math.sqrt(this.lengthSq()*M.lengthSq());if(D===0)return Math.PI/2;const t=this.dot(M)/D;return Math.acos(gD(t,-1,1))}distanceTo(M){return Math.sqrt(this.distanceToSquared(M))}distanceToSquared(M){const D=this.x-M.x,t=this.y-M.y,N=this.z-M.z;return D*D+t*t+N*N}manhattanDistanceTo(M){return Math.abs(this.x-M.x)+Math.abs(this.y-M.y)+Math.abs(this.z-M.z)}setFromSpherical(M){return this.setFromSphericalCoords(M.radius,M.phi,M.theta)}setFromSphericalCoords(M,D,t){const N=Math.sin(D)*M;return this.x=N*Math.sin(t),this.y=Math.cos(D)*M,this.z=N*Math.cos(t),this}setFromCylindrical(M){return this.setFromCylindricalCoords(M.radius,M.theta,M.y)}setFromCylindricalCoords(M,D,t){return this.x=M*Math.sin(D),this.y=t,this.z=M*Math.cos(D),this}setFromMatrixPosition(M){const D=M.elements;return this.x=D[12],this.y=D[13],this.z=D[14],this}setFromMatrixScale(M){const D=this.setFromMatrixColumn(M,0).length(),t=this.setFromMatrixColumn(M,1).length(),N=this.setFromMatrixColumn(M,2).length();return this.x=D,this.y=t,this.z=N,this}setFromMatrixColumn(M,D){return this.fromArray(M.elements,D*4)}setFromMatrix3Column(M,D){return this.fromArray(M.elements,D*3)}setFromEuler(M){return this.x=M._x,this.y=M._y,this.z=M._z,this}setFromColor(M){return this.x=M.r,this.y=M.g,this.z=M.b,this}equals(M){return M.x===this.x&&M.y===this.y&&M.z===this.z}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this.z=M[D+2],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M[D+2]=this.z,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this.z=M.getZ(D),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const M=(Math.random()-.5)*2,D=Math.random()*Math.PI*2,t=Math.sqrt(1-M**2);return this.x=t*Math.cos(D),this.y=t*Math.sin(D),this.z=M,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};const ei=new Y,_z=new dN,du=`.mockup{width:100%;height:100%;animation:levitate 1.5s infinite alternate ease-in-out}@keyframes levitate{0%{transform:translateY(-2%)}to{transform:translateY(2%)}}
`;let iD=class zz{constructor(){zz.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(M,D,t,N,A,z,i,T,I,n,u,g,r,a,c,j){const s=this.elements;return s[0]=M,s[4]=D,s[8]=t,s[12]=N,s[1]=A,s[5]=z,s[9]=i,s[13]=T,s[2]=I,s[6]=n,s[10]=u,s[14]=g,s[3]=r,s[7]=a,s[11]=c,s[15]=j,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new zz().fromArray(this.elements)}copy(M){const D=this.elements,t=M.elements;return D[0]=t[0],D[1]=t[1],D[2]=t[2],D[3]=t[3],D[4]=t[4],D[5]=t[5],D[6]=t[6],D[7]=t[7],D[8]=t[8],D[9]=t[9],D[10]=t[10],D[11]=t[11],D[12]=t[12],D[13]=t[13],D[14]=t[14],D[15]=t[15],this}copyPosition(M){const D=this.elements,t=M.elements;return D[12]=t[12],D[13]=t[13],D[14]=t[14],this}setFromMatrix3(M){const D=M.elements;return this.set(D[0],D[3],D[6],0,D[1],D[4],D[7],0,D[2],D[5],D[8],0,0,0,0,1),this}extractBasis(M,D,t){return M.setFromMatrixColumn(this,0),D.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(M,D,t){return this.set(M.x,D.x,t.x,0,M.y,D.y,t.y,0,M.z,D.z,t.z,0,0,0,0,1),this}extractRotation(M){const D=this.elements,t=M.elements,N=1/gt.setFromMatrixColumn(M,0).length(),A=1/gt.setFromMatrixColumn(M,1).length(),z=1/gt.setFromMatrixColumn(M,2).length();return D[0]=t[0]*N,D[1]=t[1]*N,D[2]=t[2]*N,D[3]=0,D[4]=t[4]*A,D[5]=t[5]*A,D[6]=t[6]*A,D[7]=0,D[8]=t[8]*z,D[9]=t[9]*z,D[10]=t[10]*z,D[11]=0,D[12]=0,D[13]=0,D[14]=0,D[15]=1,this}makeRotationFromEuler(M){const D=this.elements,t=M.x,N=M.y,A=M.z,z=Math.cos(t),i=Math.sin(t),T=Math.cos(N),I=Math.sin(N),n=Math.cos(A),u=Math.sin(A);if(M.order==="XYZ"){const g=z*n,r=z*u,a=i*n,c=i*u;D[0]=T*n,D[4]=-T*u,D[8]=I,D[1]=r+a*I,D[5]=g-c*I,D[9]=-i*T,D[2]=c-g*I,D[6]=a+r*I,D[10]=z*T}else if(M.order==="YXZ"){const g=T*n,r=T*u,a=I*n,c=I*u;D[0]=g+c*i,D[4]=a*i-r,D[8]=z*I,D[1]=z*u,D[5]=z*n,D[9]=-i,D[2]=r*i-a,D[6]=c+g*i,D[10]=z*T}else if(M.order==="ZXY"){const g=T*n,r=T*u,a=I*n,c=I*u;D[0]=g-c*i,D[4]=-z*u,D[8]=a+r*i,D[1]=r+a*i,D[5]=z*n,D[9]=c-g*i,D[2]=-z*I,D[6]=i,D[10]=z*T}else if(M.order==="ZYX"){const g=z*n,r=z*u,a=i*n,c=i*u;D[0]=T*n,D[4]=a*I-r,D[8]=g*I+c,D[1]=T*u,D[5]=c*I+g,D[9]=r*I-a,D[2]=-I,D[6]=i*T,D[10]=z*T}else if(M.order==="YZX"){const g=z*T,r=z*I,a=i*T,c=i*I;D[0]=T*n,D[4]=c-g*u,D[8]=a*u+r,D[1]=u,D[5]=z*n,D[9]=-i*n,D[2]=-I*n,D[6]=r*u+a,D[10]=g-c*u}else if(M.order==="XZY"){const g=z*T,r=z*I,a=i*T,c=i*I;D[0]=T*n,D[4]=-u,D[8]=I*n,D[1]=g*u+c,D[5]=z*n,D[9]=r*u-a,D[2]=a*u-r,D[6]=i*n,D[10]=c*u+g}return D[3]=0,D[7]=0,D[11]=0,D[12]=0,D[13]=0,D[14]=0,D[15]=1,this}makeRotationFromQuaternion(M){return this.compose(pu,M,Yu)}lookAt(M,D,t){const N=this.elements;return lD.subVectors(M,D),lD.lengthSq()===0&&(lD.z=1),lD.normalize(),de.crossVectors(t,lD),de.lengthSq()===0&&(Math.abs(t.z)===1?lD.x+=1e-4:lD.z+=1e-4,lD.normalize(),de.crossVectors(t,lD)),de.normalize(),ZN.crossVectors(lD,de),N[0]=de.x,N[4]=ZN.x,N[8]=lD.x,N[1]=de.y,N[5]=ZN.y,N[9]=lD.y,N[2]=de.z,N[6]=ZN.z,N[10]=lD.z,this}multiply(M){return this.multiplyMatrices(this,M)}premultiply(M){return this.multiplyMatrices(M,this)}multiplyMatrices(M,D){const t=M.elements,N=D.elements,A=this.elements,z=t[0],i=t[4],T=t[8],I=t[12],n=t[1],u=t[5],g=t[9],r=t[13],a=t[2],c=t[6],j=t[10],s=t[14],L=t[3],y=t[7],x=t[11],O=t[15],h=N[0],d=N[4],G=N[8],o=N[12],l=N[1],F=N[5],K=N[9],m=N[13],f=N[2],k=N[6],J=N[10],V=N[14],H=N[3],X=N[7],$=N[11],gM=N[15];return A[0]=z*h+i*l+T*f+I*H,A[4]=z*d+i*F+T*k+I*X,A[8]=z*G+i*K+T*J+I*$,A[12]=z*o+i*m+T*V+I*gM,A[1]=n*h+u*l+g*f+r*H,A[5]=n*d+u*F+g*k+r*X,A[9]=n*G+u*K+g*J+r*$,A[13]=n*o+u*m+g*V+r*gM,A[2]=a*h+c*l+j*f+s*H,A[6]=a*d+c*F+j*k+s*X,A[10]=a*G+c*K+j*J+s*$,A[14]=a*o+c*m+j*V+s*gM,A[3]=L*h+y*l+x*f+O*H,A[7]=L*d+y*F+x*k+O*X,A[11]=L*G+y*K+x*J+O*$,A[15]=L*o+y*m+x*V+O*gM,this}multiplyScalar(M){const D=this.elements;return D[0]*=M,D[4]*=M,D[8]*=M,D[12]*=M,D[1]*=M,D[5]*=M,D[9]*=M,D[13]*=M,D[2]*=M,D[6]*=M,D[10]*=M,D[14]*=M,D[3]*=M,D[7]*=M,D[11]*=M,D[15]*=M,this}determinant(){const M=this.elements,D=M[0],t=M[4],N=M[8],A=M[12],z=M[1],i=M[5],T=M[9],I=M[13],n=M[2],u=M[6],g=M[10],r=M[14],a=M[3],c=M[7],j=M[11],s=M[15];return a*(+A*T*u-N*I*u-A*i*g+t*I*g+N*i*r-t*T*r)+c*(+D*T*r-D*I*g+A*z*g-N*z*r+N*I*n-A*T*n)+j*(+D*I*u-D*i*r-A*z*u+t*z*r+A*i*n-t*I*n)+s*(-N*i*n-D*T*u+D*i*g+N*z*u-t*z*g+t*T*n)}transpose(){const M=this.elements;let D;return D=M[1],M[1]=M[4],M[4]=D,D=M[2],M[2]=M[8],M[8]=D,D=M[6],M[6]=M[9],M[9]=D,D=M[3],M[3]=M[12],M[12]=D,D=M[7],M[7]=M[13],M[13]=D,D=M[11],M[11]=M[14],M[14]=D,this}setPosition(M,D,t){const N=this.elements;return M.isVector3?(N[12]=M.x,N[13]=M.y,N[14]=M.z):(N[12]=M,N[13]=D,N[14]=t),this}invert(){const M=this.elements,D=M[0],t=M[1],N=M[2],A=M[3],z=M[4],i=M[5],T=M[6],I=M[7],n=M[8],u=M[9],g=M[10],r=M[11],a=M[12],c=M[13],j=M[14],s=M[15],L=u*j*I-c*g*I+c*T*r-i*j*r-u*T*s+i*g*s,y=a*g*I-n*j*I-a*T*r+z*j*r+n*T*s-z*g*s,x=n*c*I-a*u*I+a*i*r-z*c*r-n*i*s+z*u*s,O=a*u*T-n*c*T-a*i*g+z*c*g+n*i*j-z*u*j,h=D*L+t*y+N*x+A*O;if(h===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const d=1/h;return M[0]=L*d,M[1]=(c*g*A-u*j*A-c*N*r+t*j*r+u*N*s-t*g*s)*d,M[2]=(i*j*A-c*T*A+c*N*I-t*j*I-i*N*s+t*T*s)*d,M[3]=(u*T*A-i*g*A-u*N*I+t*g*I+i*N*r-t*T*r)*d,M[4]=y*d,M[5]=(n*j*A-a*g*A+a*N*r-D*j*r-n*N*s+D*g*s)*d,M[6]=(a*T*A-z*j*A-a*N*I+D*j*I+z*N*s-D*T*s)*d,M[7]=(z*g*A-n*T*A+n*N*I-D*g*I-z*N*r+D*T*r)*d,M[8]=x*d,M[9]=(a*u*A-n*c*A-a*t*r+D*c*r+n*t*s-D*u*s)*d,M[10]=(z*c*A-a*i*A+a*t*I-D*c*I-z*t*s+D*i*s)*d,M[11]=(n*i*A-z*u*A-n*t*I+D*u*I+z*t*r-D*i*r)*d,M[12]=O*d,M[13]=(n*c*N-a*u*N+a*t*g-D*c*g-n*t*j+D*u*j)*d,M[14]=(a*i*N-z*c*N-a*t*T+D*c*T+z*t*j-D*i*j)*d,M[15]=(z*u*N-n*i*N+n*t*T-D*u*T-z*t*g+D*i*g)*d,this}scale(M){const D=this.elements,t=M.x,N=M.y,A=M.z;return D[0]*=t,D[4]*=N,D[8]*=A,D[1]*=t,D[5]*=N,D[9]*=A,D[2]*=t,D[6]*=N,D[10]*=A,D[3]*=t,D[7]*=N,D[11]*=A,this}getMaxScaleOnAxis(){const M=this.elements,D=M[0]*M[0]+M[1]*M[1]+M[2]*M[2],t=M[4]*M[4]+M[5]*M[5]+M[6]*M[6],N=M[8]*M[8]+M[9]*M[9]+M[10]*M[10];return Math.sqrt(Math.max(D,t,N))}makeTranslation(M,D,t){return this.set(1,0,0,M,0,1,0,D,0,0,1,t,0,0,0,1),this}makeRotationX(M){const D=Math.cos(M),t=Math.sin(M);return this.set(1,0,0,0,0,D,-t,0,0,t,D,0,0,0,0,1),this}makeRotationY(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,0,t,0,0,1,0,0,-t,0,D,0,0,0,0,1),this}makeRotationZ(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,-t,0,0,t,D,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(M,D){const t=Math.cos(D),N=Math.sin(D),A=1-t,z=M.x,i=M.y,T=M.z,I=A*z,n=A*i;return this.set(I*z+t,I*i-N*T,I*T+N*i,0,I*i+N*T,n*i+t,n*T-N*z,0,I*T-N*i,n*T+N*z,A*T*T+t,0,0,0,0,1),this}makeScale(M,D,t){return this.set(M,0,0,0,0,D,0,0,0,0,t,0,0,0,0,1),this}makeShear(M,D,t,N,A,z){return this.set(1,t,A,0,M,1,z,0,D,N,1,0,0,0,0,1),this}compose(M,D,t){const N=this.elements,A=D._x,z=D._y,i=D._z,T=D._w,I=A+A,n=z+z,u=i+i,g=A*I,r=A*n,a=A*u,c=z*n,j=z*u,s=i*u,L=T*I,y=T*n,x=T*u,O=t.x,h=t.y,d=t.z;return N[0]=(1-(c+s))*O,N[1]=(r+x)*O,N[2]=(a-y)*O,N[3]=0,N[4]=(r-x)*h,N[5]=(1-(g+s))*h,N[6]=(j+L)*h,N[7]=0,N[8]=(a+y)*d,N[9]=(j-L)*d,N[10]=(1-(g+c))*d,N[11]=0,N[12]=M.x,N[13]=M.y,N[14]=M.z,N[15]=1,this}decompose(M,D,t){const N=this.elements;let A=gt.set(N[0],N[1],N[2]).length();const z=gt.set(N[4],N[5],N[6]).length(),i=gt.set(N[8],N[9],N[10]).length();this.determinant()<0&&(A=-A),M.x=N[12],M.y=N[13],M.z=N[14],KD.copy(this);const T=1/A,I=1/z,n=1/i;return KD.elements[0]*=T,KD.elements[1]*=T,KD.elements[2]*=T,KD.elements[4]*=I,KD.elements[5]*=I,KD.elements[6]*=I,KD.elements[8]*=n,KD.elements[9]*=n,KD.elements[10]*=n,D.setFromRotationMatrix(KD),t.x=A,t.y=z,t.z=i,this}makePerspective(M,D,t,N,A,z){const i=this.elements,T=2*A/(D-M),I=2*A/(t-N),n=(D+M)/(D-M),u=(t+N)/(t-N),g=-(z+A)/(z-A),r=-2*z*A/(z-A);return i[0]=T,i[4]=0,i[8]=n,i[12]=0,i[1]=0,i[5]=I,i[9]=u,i[13]=0,i[2]=0,i[6]=0,i[10]=g,i[14]=r,i[3]=0,i[7]=0,i[11]=-1,i[15]=0,this}makeOrthographic(M,D,t,N,A,z){const i=this.elements,T=1/(D-M),I=1/(t-N),n=1/(z-A),u=(D+M)*T,g=(t+N)*I,r=(z+A)*n;return i[0]=2*T,i[4]=0,i[8]=0,i[12]=-u,i[1]=0,i[5]=2*I,i[9]=0,i[13]=-g,i[2]=0,i[6]=0,i[10]=-2*n,i[14]=-r,i[3]=0,i[7]=0,i[11]=0,i[15]=1,this}equals(M){const D=this.elements,t=M.elements;for(let N=0;N<16;N++)if(D[N]!==t[N])return!1;return!0}fromArray(M,D=0){for(let t=0;t<16;t++)this.elements[t]=M[t+D];return this}toArray(M=[],D=0){const t=this.elements;return M[D]=t[0],M[D+1]=t[1],M[D+2]=t[2],M[D+3]=t[3],M[D+4]=t[4],M[D+5]=t[5],M[D+6]=t[6],M[D+7]=t[7],M[D+8]=t[8],M[D+9]=t[9],M[D+10]=t[10],M[D+11]=t[11],M[D+12]=t[12],M[D+13]=t[13],M[D+14]=t[14],M[D+15]=t[15],M}};const gt=new Y,KD=new iD,pu=new Y(0,0,0),Yu=new Y(1,1,1),de=new Y,ZN=new Y,lD=new Y;let DN=class{addEventListener(e,M){this._listeners===void 0&&(this._listeners={});const D=this._listeners;D[e]===void 0&&(D[e]=[]),D[e].indexOf(M)===-1&&D[e].push(M)}hasEventListener(e,M){if(this._listeners===void 0)return!1;const D=this._listeners;return D[e]!==void 0&&D[e].indexOf(M)!==-1}removeEventListener(e,M){if(this._listeners===void 0)return;const D=this._listeners[e];if(D!==void 0){const t=D.indexOf(M);t!==-1&&D.splice(t,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const M=this._listeners[e.type];if(M!==void 0){e.target=this;const D=M.slice(0);for(let t=0,N=D.length;t<N;t++)D[t].call(this,e);e.target=null}}};const bz=new iD,Kz=new dN;let Mn=class Dn{constructor(M=0,D=0,t=0,N=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=M,this._y=D,this._z=t,this._order=N}get x(){return this._x}set x(M){this._x=M,this._onChangeCallback()}get y(){return this._y}set y(M){this._y=M,this._onChangeCallback()}get z(){return this._z}set z(M){this._z=M,this._onChangeCallback()}get order(){return this._order}set order(M){this._order=M,this._onChangeCallback()}set(M,D,t,N=this._order){return this._x=M,this._y=D,this._z=t,this._order=N,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(M){return this._x=M._x,this._y=M._y,this._z=M._z,this._order=M._order,this._onChangeCallback(),this}setFromRotationMatrix(M,D=this._order,t=!0){const N=M.elements,A=N[0],z=N[4],i=N[8],T=N[1],I=N[5],n=N[9],u=N[2],g=N[6],r=N[10];switch(D){case"XYZ":this._y=Math.asin(gD(i,-1,1)),Math.abs(i)<.9999999?(this._x=Math.atan2(-n,r),this._z=Math.atan2(-z,A)):(this._x=Math.atan2(g,I),this._z=0);break;case"YXZ":this._x=Math.asin(-gD(n,-1,1)),Math.abs(n)<.9999999?(this._y=Math.atan2(i,r),this._z=Math.atan2(T,I)):(this._y=Math.atan2(-u,A),this._z=0);break;case"ZXY":this._x=Math.asin(gD(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-u,r),this._z=Math.atan2(-z,I)):(this._y=0,this._z=Math.atan2(T,A));break;case"ZYX":this._y=Math.asin(-gD(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,r),this._z=Math.atan2(T,A)):(this._x=0,this._z=Math.atan2(-z,I));break;case"YZX":this._z=Math.asin(gD(T,-1,1)),Math.abs(T)<.9999999?(this._x=Math.atan2(-n,I),this._y=Math.atan2(-u,A)):(this._x=0,this._y=Math.atan2(i,r));break;case"XZY":this._z=Math.asin(-gD(z,-1,1)),Math.abs(z)<.9999999?(this._x=Math.atan2(g,I),this._y=Math.atan2(i,A)):(this._x=Math.atan2(-n,r),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+D)}return this._order=D,t===!0&&this._onChangeCallback(),this}setFromQuaternion(M,D,t){return bz.makeRotationFromQuaternion(M),this.setFromRotationMatrix(bz,D,t)}setFromVector3(M,D=this._order){return this.set(M.x,M.y,M.z,D)}reorder(M){return Kz.setFromEuler(this),this.setFromQuaternion(Kz,M)}equals(M){return M._x===this._x&&M._y===this._y&&M._z===this._z&&M._order===this._order}fromArray(M){return this._x=M[0],this._y=M[1],this._z=M[2],M[3]!==void 0&&(this._order=M[3]),this._onChangeCallback(),this}toArray(M=[],D=0){return M[D]=this._x,M[D+1]=this._y,M[D+2]=this._z,M[D+3]=this._order,M}_onChange(M){return this._onChangeCallback=M,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mn.DEFAULT_ORDER="XYZ";let en=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},QM=class tn{constructor(){tn.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(M,D,t,N,A,z,i,T,I){const n=this.elements;return n[0]=M,n[1]=N,n[2]=i,n[3]=D,n[4]=A,n[5]=T,n[6]=t,n[7]=z,n[8]=I,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(M){const D=this.elements,t=M.elements;return D[0]=t[0],D[1]=t[1],D[2]=t[2],D[3]=t[3],D[4]=t[4],D[5]=t[5],D[6]=t[6],D[7]=t[7],D[8]=t[8],this}extractBasis(M,D,t){return M.setFromMatrix3Column(this,0),D.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(M){const D=M.elements;return this.set(D[0],D[4],D[8],D[1],D[5],D[9],D[2],D[6],D[10]),this}multiply(M){return this.multiplyMatrices(this,M)}premultiply(M){return this.multiplyMatrices(M,this)}multiplyMatrices(M,D){const t=M.elements,N=D.elements,A=this.elements,z=t[0],i=t[3],T=t[6],I=t[1],n=t[4],u=t[7],g=t[2],r=t[5],a=t[8],c=N[0],j=N[3],s=N[6],L=N[1],y=N[4],x=N[7],O=N[2],h=N[5],d=N[8];return A[0]=z*c+i*L+T*O,A[3]=z*j+i*y+T*h,A[6]=z*s+i*x+T*d,A[1]=I*c+n*L+u*O,A[4]=I*j+n*y+u*h,A[7]=I*s+n*x+u*d,A[2]=g*c+r*L+a*O,A[5]=g*j+r*y+a*h,A[8]=g*s+r*x+a*d,this}multiplyScalar(M){const D=this.elements;return D[0]*=M,D[3]*=M,D[6]*=M,D[1]*=M,D[4]*=M,D[7]*=M,D[2]*=M,D[5]*=M,D[8]*=M,this}determinant(){const M=this.elements,D=M[0],t=M[1],N=M[2],A=M[3],z=M[4],i=M[5],T=M[6],I=M[7],n=M[8];return D*z*n-D*i*I-t*A*n+t*i*T+N*A*I-N*z*T}invert(){const M=this.elements,D=M[0],t=M[1],N=M[2],A=M[3],z=M[4],i=M[5],T=M[6],I=M[7],n=M[8],u=n*z-i*I,g=i*T-n*A,r=I*A-z*T,a=D*u+t*g+N*r;if(a===0)return this.set(0,0,0,0,0,0,0,0,0);const c=1/a;return M[0]=u*c,M[1]=(N*I-n*t)*c,M[2]=(i*t-N*z)*c,M[3]=g*c,M[4]=(n*D-N*T)*c,M[5]=(N*A-i*D)*c,M[6]=r*c,M[7]=(t*T-I*D)*c,M[8]=(z*D-t*A)*c,this}transpose(){let M;const D=this.elements;return M=D[1],D[1]=D[3],D[3]=M,M=D[2],D[2]=D[6],D[6]=M,M=D[5],D[5]=D[7],D[7]=M,this}getNormalMatrix(M){return this.setFromMatrix4(M).invert().transpose()}transposeIntoArray(M){const D=this.elements;return M[0]=D[0],M[1]=D[3],M[2]=D[6],M[3]=D[1],M[4]=D[4],M[5]=D[7],M[6]=D[2],M[7]=D[5],M[8]=D[8],this}setUvTransform(M,D,t,N,A,z,i){const T=Math.cos(A),I=Math.sin(A);return this.set(t*T,t*I,-t*(T*z+I*i)+z+M,-N*I,N*T,-N*(-I*z+T*i)+i+D,0,0,1),this}scale(M,D){return this.premultiply(ti.makeScale(M,D)),this}rotate(M){return this.premultiply(ti.makeRotation(-M)),this}translate(M,D){return this.premultiply(ti.makeTranslation(M,D)),this}makeTranslation(M,D){return this.set(1,0,M,0,1,D,0,0,1),this}makeRotation(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,-t,0,t,D,0,0,0,1),this}makeScale(M,D){return this.set(M,0,0,0,D,0,0,0,1),this}equals(M){const D=this.elements,t=M.elements;for(let N=0;N<9;N++)if(D[N]!==t[N])return!1;return!0}fromArray(M,D=0){for(let t=0;t<9;t++)this.elements[t]=M[t+D];return this}toArray(M=[],D=0){const t=this.elements;return M[D]=t[0],M[D+1]=t[1],M[D+2]=t[2],M[D+3]=t[3],M[D+4]=t[4],M[D+5]=t[5],M[D+6]=t[6],M[D+7]=t[7],M[D+8]=t[8],M}clone(){return new this.constructor().fromArray(this.elements)}};const ti=new QM;let Uu=0;const Rz=new Y,rt=new dN,Te=new iD,_N=new Y,iN=new Y,mu=new Y,Qu=new dN,Pz=new Y(1,0,0),Fz=new Y(0,1,0),Bz=new Y(0,0,1),ku={type:"added"},Hz={type:"removed"};let OD=class YA extends DN{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=MN(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=YA.DEFAULT_UP.clone();const M=new Y,D=new Mn,t=new dN,N=new Y(1,1,1);function A(){t.setFromEuler(D,!1)}function z(){D.setFromQuaternion(t,void 0,!1)}D._onChange(A),t._onChange(z),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:M},rotation:{configurable:!0,enumerable:!0,value:D},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:N},modelViewMatrix:{value:new iD},normalMatrix:{value:new QM}}),this.matrix=new iD,this.matrixWorld=new iD,this.matrixAutoUpdate=YA.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=YA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new en,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(M){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(M),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(M){return this.quaternion.premultiply(M),this}setRotationFromAxisAngle(M,D){this.quaternion.setFromAxisAngle(M,D)}setRotationFromEuler(M){this.quaternion.setFromEuler(M,!0)}setRotationFromMatrix(M){this.quaternion.setFromRotationMatrix(M)}setRotationFromQuaternion(M){this.quaternion.copy(M)}rotateOnAxis(M,D){return rt.setFromAxisAngle(M,D),this.quaternion.multiply(rt),this}rotateOnWorldAxis(M,D){return rt.setFromAxisAngle(M,D),this.quaternion.premultiply(rt),this}rotateX(M){return this.rotateOnAxis(Pz,M)}rotateY(M){return this.rotateOnAxis(Fz,M)}rotateZ(M){return this.rotateOnAxis(Bz,M)}translateOnAxis(M,D){return Rz.copy(M).applyQuaternion(this.quaternion),this.position.add(Rz.multiplyScalar(D)),this}translateX(M){return this.translateOnAxis(Pz,M)}translateY(M){return this.translateOnAxis(Fz,M)}translateZ(M){return this.translateOnAxis(Bz,M)}localToWorld(M){return this.updateWorldMatrix(!0,!1),M.applyMatrix4(this.matrixWorld)}worldToLocal(M){return this.updateWorldMatrix(!0,!1),M.applyMatrix4(Te.copy(this.matrixWorld).invert())}lookAt(M,D,t){M.isVector3?_N.copy(M):_N.set(M,D,t);const N=this.parent;this.updateWorldMatrix(!0,!1),iN.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Te.lookAt(iN,_N,this.up):Te.lookAt(_N,iN,this.up),this.quaternion.setFromRotationMatrix(Te),N&&(Te.extractRotation(N.matrixWorld),rt.setFromRotationMatrix(Te),this.quaternion.premultiply(rt.invert()))}add(M){if(arguments.length>1){for(let D=0;D<arguments.length;D++)this.add(arguments[D]);return this}return M===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",M),this):(M&&M.isObject3D?(M.parent!==null&&M.parent.remove(M),M.parent=this,this.children.push(M),M.dispatchEvent(ku)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",M),this)}remove(M){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const D=this.children.indexOf(M);return D!==-1&&(M.parent=null,this.children.splice(D,1),M.dispatchEvent(Hz)),this}removeFromParent(){const M=this.parent;return M!==null&&M.remove(this),this}clear(){for(let M=0;M<this.children.length;M++){const D=this.children[M];D.parent=null,D.dispatchEvent(Hz)}return this.children.length=0,this}attach(M){return this.updateWorldMatrix(!0,!1),Te.copy(this.matrixWorld).invert(),M.parent!==null&&(M.parent.updateWorldMatrix(!0,!1),Te.multiply(M.parent.matrixWorld)),M.applyMatrix4(Te),this.add(M),M.updateWorldMatrix(!1,!0),this}getObjectById(M){return this.getObjectByProperty("id",M)}getObjectByName(M){return this.getObjectByProperty("name",M)}getObjectByProperty(M,D){if(this[M]===D)return this;for(let t=0,N=this.children.length;t<N;t++){const A=this.children[t].getObjectByProperty(M,D);if(A!==void 0)return A}}getObjectsByProperty(M,D){let t=[];this[M]===D&&t.push(this);for(let N=0,A=this.children.length;N<A;N++){const z=this.children[N].getObjectsByProperty(M,D);z.length>0&&(t=t.concat(z))}return t}getWorldPosition(M){return this.updateWorldMatrix(!0,!1),M.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(M){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(iN,M,mu),M}getWorldScale(M){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(iN,Qu,M),M}getWorldDirection(M){this.updateWorldMatrix(!0,!1);const D=this.matrixWorld.elements;return M.set(D[8],D[9],D[10]).normalize()}raycast(){}traverse(M){M(this);const D=this.children;for(let t=0,N=D.length;t<N;t++)D[t].traverse(M)}traverseVisible(M){if(this.visible===!1)return;M(this);const D=this.children;for(let t=0,N=D.length;t<N;t++)D[t].traverseVisible(M)}traverseAncestors(M){const D=this.parent;D!==null&&(M(D),D.traverseAncestors(M))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(M){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||M)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,M=!0);const D=this.children;for(let t=0,N=D.length;t<N;t++){const A=D[t];(A.matrixWorldAutoUpdate===!0||M===!0)&&A.updateMatrixWorld(M)}}updateWorldMatrix(M,D){const t=this.parent;if(M===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),D===!0){const N=this.children;for(let A=0,z=N.length;A<z;A++){const i=N[A];i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!1,!0)}}}toJSON(M){const D=M===void 0||typeof M=="string",t={};D&&(M={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const N={};N.uuid=this.uuid,N.type=this.type,this.name!==""&&(N.name=this.name),this.castShadow===!0&&(N.castShadow=!0),this.receiveShadow===!0&&(N.receiveShadow=!0),this.visible===!1&&(N.visible=!1),this.frustumCulled===!1&&(N.frustumCulled=!1),this.renderOrder!==0&&(N.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(N.userData=this.userData),N.layers=this.layers.mask,N.matrix=this.matrix.toArray(),N.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(N.matrixAutoUpdate=!1),this.isInstancedMesh&&(N.type="InstancedMesh",N.count=this.count,N.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(N.instanceColor=this.instanceColor.toJSON()));function A(i,T){return i[T.uuid]===void 0&&(i[T.uuid]=T.toJSON(M)),T.uuid}if(this.isScene)this.background&&(this.background.isColor?N.background=this.background.toJSON():this.background.isTexture&&(N.background=this.background.toJSON(M).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(N.environment=this.environment.toJSON(M).uuid);else if(this.isMesh||this.isLine||this.isPoints){N.geometry=A(M.geometries,this.geometry);const i=this.geometry.parameters;if(i!==void 0&&i.shapes!==void 0){const T=i.shapes;if(Array.isArray(T))for(let I=0,n=T.length;I<n;I++){const u=T[I];A(M.shapes,u)}else A(M.shapes,T)}}if(this.isSkinnedMesh&&(N.bindMode=this.bindMode,N.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(A(M.skeletons,this.skeleton),N.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const i=[];for(let T=0,I=this.material.length;T<I;T++)i.push(A(M.materials,this.material[T]));N.material=i}else N.material=A(M.materials,this.material);if(this.children.length>0){N.children=[];for(let i=0;i<this.children.length;i++)N.children.push(this.children[i].toJSON(M).object)}if(this.animations.length>0){N.animations=[];for(let i=0;i<this.animations.length;i++){const T=this.animations[i];N.animations.push(A(M.animations,T))}}if(D){const i=z(M.geometries),T=z(M.materials),I=z(M.textures),n=z(M.images),u=z(M.shapes),g=z(M.skeletons),r=z(M.animations),a=z(M.nodes);i.length>0&&(t.geometries=i),T.length>0&&(t.materials=T),I.length>0&&(t.textures=I),n.length>0&&(t.images=n),u.length>0&&(t.shapes=u),g.length>0&&(t.skeletons=g),r.length>0&&(t.animations=r),a.length>0&&(t.nodes=a)}return t.object=N,t;function z(i){const T=[];for(const I in i){const n=i[I];delete n.metadata,T.push(n)}return T}}clone(M){return new this.constructor().copy(this,M)}copy(M,D=!0){if(this.name=M.name,this.up.copy(M.up),this.position.copy(M.position),this.rotation.order=M.rotation.order,this.quaternion.copy(M.quaternion),this.scale.copy(M.scale),this.matrix.copy(M.matrix),this.matrixWorld.copy(M.matrixWorld),this.matrixAutoUpdate=M.matrixAutoUpdate,this.matrixWorldNeedsUpdate=M.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=M.matrixWorldAutoUpdate,this.layers.mask=M.layers.mask,this.visible=M.visible,this.castShadow=M.castShadow,this.receiveShadow=M.receiveShadow,this.frustumCulled=M.frustumCulled,this.renderOrder=M.renderOrder,this.animations=M.animations,this.userData=JSON.parse(JSON.stringify(M.userData)),D===!0)for(let t=0;t<M.children.length;t++){const N=M.children[t];this.add(N.clone())}return this}};OD.DEFAULT_UP=new Y(0,1,0);OD.DEFAULT_MATRIX_AUTO_UPDATE=!0;OD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Nn extends OD{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new iD,this.projectionMatrix=new iD,this.projectionMatrixInverse=new iD}copy(M,D){return super.copy(M,D),this.matrixWorldInverse.copy(M.matrixWorldInverse),this.projectionMatrix.copy(M.projectionMatrix),this.projectionMatrixInverse.copy(M.projectionMatrixInverse),this}getWorldDirection(M){this.updateWorldMatrix(!0,!1);const D=this.matrixWorld.elements;return M.set(-D[8],-D[9],-D[10]).normalize()}updateMatrixWorld(M){super.updateMatrixWorld(M),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(M,D){super.updateWorldMatrix(M,D),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ZD extends Nn{constructor(M=50,D=1,t=.1,N=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=M,this.zoom=1,this.near=t,this.far=N,this.focus=10,this.aspect=D,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(M,D){return super.copy(M,D),this.fov=M.fov,this.zoom=M.zoom,this.near=M.near,this.far=M.far,this.focus=M.focus,this.aspect=M.aspect,this.view=M.view===null?null:Object.assign({},M.view),this.filmGauge=M.filmGauge,this.filmOffset=M.filmOffset,this}setFocalLength(M){const D=.5*this.getFilmHeight()/M;this.fov=iz*2*Math.atan(D),this.updateProjectionMatrix()}getFocalLength(){const M=Math.tan(Mi*.5*this.fov);return .5*this.getFilmHeight()/M}getEffectiveFOV(){return iz*2*Math.atan(Math.tan(Mi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(M,D,t,N,A,z){this.aspect=M/D,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=M,this.view.fullHeight=D,this.view.offsetX=t,this.view.offsetY=N,this.view.width=A,this.view.height=z,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const M=this.near;let D=M*Math.tan(Mi*.5*this.fov)/this.zoom,t=2*D,N=this.aspect*t,A=-.5*N;const z=this.view;if(this.view!==null&&this.view.enabled){const T=z.fullWidth,I=z.fullHeight;A+=z.offsetX*N/T,D-=z.offsetY*t/I,N*=z.width/T,t*=z.height/I}const i=this.filmOffset;i!==0&&(A+=M*i/this.getFilmWidth()),this.projectionMatrix.makePerspective(A,A+N,D,D-t,M,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(M){const D=super.toJSON(M);return D.object.fov=this.fov,D.object.zoom=this.zoom,D.object.near=this.near,D.object.far=this.far,D.object.focus=this.focus,D.object.aspect=this.aspect,this.view!==null&&(D.object.view=Object.assign({},this.view)),D.object.filmGauge=this.filmGauge,D.object.filmOffset=this.filmOffset,D}}const Su="152",fu=0,Gz=1,Zu=2,An=1,_u=2,we=3,Ze=0,wD=1,xe=2,fe=0,Ft=1,Vz=2,Wz=3,Xz=4,bu=5,Kt=100,Ku=101,Ru=102,qz=103,Jz=104,Pu=200,Fu=201,Bu=202,Hu=203,zn=204,In=205,Gu=206,Vu=207,Wu=208,Xu=209,qu=210,Ju=0,$u=1,Mg=2,Iz=3,Dg=4,eg=5,tg=6,Ng=7,Cz=0,Ag=1,ig=2,le=0,zg=1,Ig=2,Tg=3,ng=4,ug=5,Tn=300,Wt=301,Xt=302,Tz=303,nz=304,RA=306,uz=1e3,XD=1001,gz=1002,cD=1003,$z=1004,Ni=1005,CD=1006,gg=1007,LN=1008,it=1009,rg=1010,sg=1011,nn=1012,ag=1013,$e=1014,Mt=1015,wN=1016,jg=1017,cg=1018,Bt=1020,yg=1021,qD=1023,og=1024,Cg=1025,et=1026,qt=1027,Lg=1028,wg=1029,Og=1030,xg=1031,Eg=1033,Ai=33776,ii=33777,zi=33778,Ii=33779,MI=35840,DI=35841,eI=35842,tI=35843,lg=36196,NI=37492,AI=37496,iI=37808,zI=37809,II=37810,TI=37811,nI=37812,uI=37813,gI=37814,rI=37815,sI=37816,aI=37817,jI=37818,cI=37819,yI=37820,oI=37821,Ti=36492,hg=36283,CI=36284,LI=36285,wI=36286,un=3e3,tt=3001,vg=3200,dg=3201,gn=0,pg=1,Nt="",lM="srgb",ze="srgb-linear",rn="display-p3",ni=7680,Yg=519,OI=35044,xI="300 es",rz=1035;function Ht(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function ui(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}const Ug=new QM().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),mg=new QM().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function Qg(e){return e.convertSRGBToLinear().applyMatrix3(mg)}function kg(e){return e.applyMatrix3(Ug).convertLinearToSRGB()}const Sg={[ze]:e=>e,[lM]:e=>e.convertSRGBToLinear(),[rn]:Qg},fg={[ze]:e=>e,[lM]:e=>e.convertLinearToSRGB(),[rn]:kg},RD={enabled:!0,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(e){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!e},get workingColorSpace(){return ze},set workingColorSpace(e){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(e,M,D){if(this.enabled===!1||M===D||!M||!D)return e;const t=Sg[M],N=fg[D];if(t===void 0||N===void 0)throw new Error(`Unsupported color space conversion, "${M}" to "${D}".`);return N(t(e))},fromWorkingColorSpace:function(e,M){return this.convert(e,this.workingColorSpace,M)},toWorkingColorSpace:function(e,M){return this.convert(e,M,this.workingColorSpace)}},sn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},PD={h:0,s:0,l:0},bN={h:0,s:0,l:0};function gi(e,M,D){return D<0&&(D+=1),D>1&&(D-=1),D<1/6?e+(M-e)*6*D:D<1/2?M:D<2/3?e+(M-e)*6*(2/3-D):e}let bM=class{constructor(e,M,D){return this.isColor=!0,this.r=1,this.g=1,this.b=1,M===void 0&&D===void 0?this.set(e):this.setRGB(e,M,D)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,M=lM){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,RD.toWorkingColorSpace(this,M),this}setRGB(e,M,D,t=RD.workingColorSpace){return this.r=e,this.g=M,this.b=D,RD.toWorkingColorSpace(this,t),this}setHSL(e,M,D,t=RD.workingColorSpace){if(e=hu(e,1),M=gD(M,0,1),D=gD(D,0,1),M===0)this.r=this.g=this.b=D;else{const N=D<=.5?D*(1+M):D+M-D*M,A=2*D-N;this.r=gi(A,N,e+1/3),this.g=gi(A,N,e),this.b=gi(A,N,e-1/3)}return RD.toWorkingColorSpace(this,t),this}setStyle(e,M=lM){function D(N){N!==void 0&&parseFloat(N)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let t;if(t=/^(\w+)\(([^\)]*)\)/.exec(e)){let N;const A=t[1],z=t[2];switch(A){case"rgb":case"rgba":if(N=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(z))return D(N[4]),this.setRGB(Math.min(255,parseInt(N[1],10))/255,Math.min(255,parseInt(N[2],10))/255,Math.min(255,parseInt(N[3],10))/255,M);if(N=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(z))return D(N[4]),this.setRGB(Math.min(100,parseInt(N[1],10))/100,Math.min(100,parseInt(N[2],10))/100,Math.min(100,parseInt(N[3],10))/100,M);break;case"hsl":case"hsla":if(N=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(z))return D(N[4]),this.setHSL(parseFloat(N[1])/360,parseFloat(N[2])/100,parseFloat(N[3])/100,M);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(t=/^\#([A-Fa-f\d]+)$/.exec(e)){const N=t[1],A=N.length;if(A===3)return this.setRGB(parseInt(N.charAt(0),16)/15,parseInt(N.charAt(1),16)/15,parseInt(N.charAt(2),16)/15,M);if(A===6)return this.setHex(parseInt(N,16),M);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,M);return this}setColorName(e,M=lM){const D=sn[e.toLowerCase()];return D!==void 0?this.setHex(D,M):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ht(e.r),this.g=Ht(e.g),this.b=Ht(e.b),this}copyLinearToSRGB(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=lM){return RD.fromWorkingColorSpace(TD.copy(this),e),Math.round(gD(TD.r*255,0,255))*65536+Math.round(gD(TD.g*255,0,255))*256+Math.round(gD(TD.b*255,0,255))}getHexString(e=lM){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,M=RD.workingColorSpace){RD.fromWorkingColorSpace(TD.copy(this),M);const D=TD.r,t=TD.g,N=TD.b,A=Math.max(D,t,N),z=Math.min(D,t,N);let i,T;const I=(z+A)/2;if(z===A)i=0,T=0;else{const n=A-z;switch(T=I<=.5?n/(A+z):n/(2-A-z),A){case D:i=(t-N)/n+(t<N?6:0);break;case t:i=(N-D)/n+2;break;case N:i=(D-t)/n+4;break}i/=6}return e.h=i,e.s=T,e.l=I,e}getRGB(e,M=RD.workingColorSpace){return RD.fromWorkingColorSpace(TD.copy(this),M),e.r=TD.r,e.g=TD.g,e.b=TD.b,e}getStyle(e=lM){RD.fromWorkingColorSpace(TD.copy(this),e);const M=TD.r,D=TD.g,t=TD.b;return e!==lM?`color(${e} ${M.toFixed(3)} ${D.toFixed(3)} ${t.toFixed(3)})`:`rgb(${Math.round(M*255)},${Math.round(D*255)},${Math.round(t*255)})`}offsetHSL(e,M,D){return this.getHSL(PD),PD.h+=e,PD.s+=M,PD.l+=D,this.setHSL(PD.h,PD.s,PD.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,M){return this.r=e.r+M.r,this.g=e.g+M.g,this.b=e.b+M.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,M){return this.r+=(e.r-this.r)*M,this.g+=(e.g-this.g)*M,this.b+=(e.b-this.b)*M,this}lerpColors(e,M,D){return this.r=e.r+(M.r-e.r)*D,this.g=e.g+(M.g-e.g)*D,this.b=e.b+(M.b-e.b)*D,this}lerpHSL(e,M){this.getHSL(PD),e.getHSL(bN);const D=Di(PD.h,bN.h,M),t=Di(PD.s,bN.s,M),N=Di(PD.l,bN.l,M);return this.setHSL(D,t,N),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const M=this.r,D=this.g,t=this.b,N=e.elements;return this.r=N[0]*M+N[3]*D+N[6]*t,this.g=N[1]*M+N[4]*D+N[7]*t,this.b=N[2]*M+N[5]*D+N[8]*t,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,M=0){return this.r=e[M],this.g=e[M+1],this.b=e[M+2],this}toArray(e=[],M=0){return e[M]=this.r,e[M+1]=this.g,e[M+2]=this.b,e}fromBufferAttribute(e,M){return this.r=e.getX(M),this.g=e.getY(M),this.b=e.getZ(M),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const TD=new bM;bM.NAMES=sn;class Zg extends OD{constructor(M,D=1){super(),this.isLight=!0,this.type="Light",this.color=new bM(M),this.intensity=D}dispose(){}copy(M,D){return super.copy(M,D),this.color.copy(M.color),this.intensity=M.intensity,this}toJSON(M){const D=super.toJSON(M);return D.object.color=this.color.getHex(),D.object.intensity=this.intensity,this.groundColor!==void 0&&(D.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(D.object.distance=this.distance),this.angle!==void 0&&(D.object.angle=this.angle),this.decay!==void 0&&(D.object.decay=this.decay),this.penumbra!==void 0&&(D.object.penumbra=this.penumbra),this.shadow!==void 0&&(D.object.shadow=this.shadow.toJSON()),D}}let jM=class an{constructor(M=0,D=0){an.prototype.isVector2=!0,this.x=M,this.y=D}get width(){return this.x}set width(M){this.x=M}get height(){return this.y}set height(M){this.y=M}set(M,D){return this.x=M,this.y=D,this}setScalar(M){return this.x=M,this.y=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y)}copy(M){return this.x=M.x,this.y=M.y,this}add(M){return this.x+=M.x,this.y+=M.y,this}addScalar(M){return this.x+=M,this.y+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this}subScalar(M){return this.x-=M,this.y-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this}multiply(M){return this.x*=M.x,this.y*=M.y,this}multiplyScalar(M){return this.x*=M,this.y*=M,this}divide(M){return this.x/=M.x,this.y/=M.y,this}divideScalar(M){return this.multiplyScalar(1/M)}applyMatrix3(M){const D=this.x,t=this.y,N=M.elements;return this.x=N[0]*D+N[3]*t+N[6],this.y=N[1]*D+N[4]*t+N[7],this}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(M){return this.x*M.x+this.y*M.y}cross(M){return this.x*M.y-this.y*M.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(M){const D=Math.sqrt(this.lengthSq()*M.lengthSq());if(D===0)return Math.PI/2;const t=this.dot(M)/D;return Math.acos(gD(t,-1,1))}distanceTo(M){return Math.sqrt(this.distanceToSquared(M))}distanceToSquared(M){const D=this.x-M.x,t=this.y-M.y;return D*D+t*t}manhattanDistanceTo(M){return Math.abs(this.x-M.x)+Math.abs(this.y-M.y)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this}equals(M){return M.x===this.x&&M.y===this.y}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this}rotateAround(M,D){const t=Math.cos(D),N=Math.sin(D),A=this.x-M.x,z=this.y-M.y;return this.x=A*t-z*N+M.x,this.y=A*N+z*t+M.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};class ND{constructor(M=0,D=0,t=0,N=1){ND.prototype.isVector4=!0,this.x=M,this.y=D,this.z=t,this.w=N}get width(){return this.z}set width(M){this.z=M}get height(){return this.w}set height(M){this.w=M}set(M,D,t,N){return this.x=M,this.y=D,this.z=t,this.w=N,this}setScalar(M){return this.x=M,this.y=M,this.z=M,this.w=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setZ(M){return this.z=M,this}setW(M){return this.w=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;case 2:this.z=D;break;case 3:this.w=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(M){return this.x=M.x,this.y=M.y,this.z=M.z,this.w=M.w!==void 0?M.w:1,this}add(M){return this.x+=M.x,this.y+=M.y,this.z+=M.z,this.w+=M.w,this}addScalar(M){return this.x+=M,this.y+=M,this.z+=M,this.w+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this.z=M.z+D.z,this.w=M.w+D.w,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this.z+=M.z*D,this.w+=M.w*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this.z-=M.z,this.w-=M.w,this}subScalar(M){return this.x-=M,this.y-=M,this.z-=M,this.w-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this.z=M.z-D.z,this.w=M.w-D.w,this}multiply(M){return this.x*=M.x,this.y*=M.y,this.z*=M.z,this.w*=M.w,this}multiplyScalar(M){return this.x*=M,this.y*=M,this.z*=M,this.w*=M,this}applyMatrix4(M){const D=this.x,t=this.y,N=this.z,A=this.w,z=M.elements;return this.x=z[0]*D+z[4]*t+z[8]*N+z[12]*A,this.y=z[1]*D+z[5]*t+z[9]*N+z[13]*A,this.z=z[2]*D+z[6]*t+z[10]*N+z[14]*A,this.w=z[3]*D+z[7]*t+z[11]*N+z[15]*A,this}divideScalar(M){return this.multiplyScalar(1/M)}setAxisAngleFromQuaternion(M){this.w=2*Math.acos(M.w);const D=Math.sqrt(1-M.w*M.w);return D<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=M.x/D,this.y=M.y/D,this.z=M.z/D),this}setAxisAngleFromRotationMatrix(M){let D,t,N,A;const z=M.elements,i=z[0],T=z[4],I=z[8],n=z[1],u=z[5],g=z[9],r=z[2],a=z[6],c=z[10];if(Math.abs(T-n)<.01&&Math.abs(I-r)<.01&&Math.abs(g-a)<.01){if(Math.abs(T+n)<.1&&Math.abs(I+r)<.1&&Math.abs(g+a)<.1&&Math.abs(i+u+c-3)<.1)return this.set(1,0,0,0),this;D=Math.PI;const s=(i+1)/2,L=(u+1)/2,y=(c+1)/2,x=(T+n)/4,O=(I+r)/4,h=(g+a)/4;return s>L&&s>y?s<.01?(t=0,N=.707106781,A=.707106781):(t=Math.sqrt(s),N=x/t,A=O/t):L>y?L<.01?(t=.707106781,N=0,A=.707106781):(N=Math.sqrt(L),t=x/N,A=h/N):y<.01?(t=.707106781,N=.707106781,A=0):(A=Math.sqrt(y),t=O/A,N=h/A),this.set(t,N,A,D),this}let j=Math.sqrt((a-g)*(a-g)+(I-r)*(I-r)+(n-T)*(n-T));return Math.abs(j)<.001&&(j=1),this.x=(a-g)/j,this.y=(I-r)/j,this.z=(n-T)/j,this.w=Math.acos((i+u+c-1)/2),this}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this.z=Math.min(this.z,M.z),this.w=Math.min(this.w,M.w),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this.z=Math.max(this.z,M.z),this.w=Math.max(this.w,M.w),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this.z=Math.max(M.z,Math.min(D.z,this.z)),this.w=Math.max(M.w,Math.min(D.w,this.w)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this.z=Math.max(M,Math.min(D,this.z)),this.w=Math.max(M,Math.min(D,this.w)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(M){return this.x*M.x+this.y*M.y+this.z*M.z+this.w*M.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this.z+=(M.z-this.z)*D,this.w+=(M.w-this.w)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this.z=M.z+(D.z-M.z)*t,this.w=M.w+(D.w-M.w)*t,this}equals(M){return M.x===this.x&&M.y===this.y&&M.z===this.z&&M.w===this.w}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this.z=M[D+2],this.w=M[D+3],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M[D+2]=this.z,M[D+3]=this.w,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this.z=M.getZ(D),this.w=M.getW(D),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}let eN=class{constructor(e=new Y(1/0,1/0,1/0),M=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=M}set(e,M){return this.min.copy(e),this.max.copy(M),this}setFromArray(e){this.makeEmpty();for(let M=0,D=e.length;M<D;M+=3)this.expandByPoint(ue.fromArray(e,M));return this}setFromBufferAttribute(e){this.makeEmpty();for(let M=0,D=e.count;M<D;M++)this.expandByPoint(ue.fromBufferAttribute(e,M));return this}setFromPoints(e){this.makeEmpty();for(let M=0,D=e.length;M<D;M++)this.expandByPoint(e[M]);return this}setFromCenterAndSize(e,M){const D=ue.copy(M).multiplyScalar(.5);return this.min.copy(e).sub(D),this.max.copy(e).add(D),this}setFromObject(e,M=!1){return this.makeEmpty(),this.expandByObject(e,M)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,M=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),st.copy(e.boundingBox),st.applyMatrix4(e.matrixWorld),this.union(st);else{const t=e.geometry;if(t!==void 0)if(M&&t.attributes!==void 0&&t.attributes.position!==void 0){const N=t.attributes.position;for(let A=0,z=N.count;A<z;A++)ue.fromBufferAttribute(N,A).applyMatrix4(e.matrixWorld),this.expandByPoint(ue)}else t.boundingBox===null&&t.computeBoundingBox(),st.copy(t.boundingBox),st.applyMatrix4(e.matrixWorld),this.union(st)}const D=e.children;for(let t=0,N=D.length;t<N;t++)this.expandByObject(D[t],M);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,M){return M.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ue),ue.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let M,D;return e.normal.x>0?(M=e.normal.x*this.min.x,D=e.normal.x*this.max.x):(M=e.normal.x*this.max.x,D=e.normal.x*this.min.x),e.normal.y>0?(M+=e.normal.y*this.min.y,D+=e.normal.y*this.max.y):(M+=e.normal.y*this.max.y,D+=e.normal.y*this.min.y),e.normal.z>0?(M+=e.normal.z*this.min.z,D+=e.normal.z*this.max.z):(M+=e.normal.z*this.max.z,D+=e.normal.z*this.min.z),M<=-e.constant&&D>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zN),KN.subVectors(this.max,zN),at.subVectors(e.a,zN),jt.subVectors(e.b,zN),ct.subVectors(e.c,zN),pe.subVectors(jt,at),Ye.subVectors(ct,jt),Fe.subVectors(at,ct);let M=[0,-pe.z,pe.y,0,-Ye.z,Ye.y,0,-Fe.z,Fe.y,pe.z,0,-pe.x,Ye.z,0,-Ye.x,Fe.z,0,-Fe.x,-pe.y,pe.x,0,-Ye.y,Ye.x,0,-Fe.y,Fe.x,0];return!ri(M,at,jt,ct,KN)||(M=[1,0,0,0,1,0,0,0,1],!ri(M,at,jt,ct,KN))?!1:(RN.crossVectors(pe,Ye),M=[RN.x,RN.y,RN.z],ri(M,at,jt,ct,KN))}clampPoint(e,M){return M.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ue).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ue).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ne[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ne[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ne[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ne[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ne[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ne[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ne[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ne[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ne),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};const ne=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],ue=new Y,st=new eN,at=new Y,jt=new Y,ct=new Y,pe=new Y,Ye=new Y,Fe=new Y,zN=new Y,KN=new Y,RN=new Y,Be=new Y;function ri(e,M,D,t,N){for(let A=0,z=e.length-3;A<=z;A+=3){Be.fromArray(e,A);const i=N.x*Math.abs(Be.x)+N.y*Math.abs(Be.y)+N.z*Math.abs(Be.z),T=M.dot(Be),I=D.dot(Be),n=t.dot(Be);if(Math.max(-Math.max(T,I,n),Math.min(T,I,n))>i)return!1}return!0}const _g=new eN,IN=new Y,si=new Y;let Lz=class{constructor(e=new Y,M=-1){this.center=e,this.radius=M}set(e,M){return this.center.copy(e),this.radius=M,this}setFromPoints(e,M){const D=this.center;M!==void 0?D.copy(M):_g.setFromPoints(e).getCenter(D);let t=0;for(let N=0,A=e.length;N<A;N++)t=Math.max(t,D.distanceToSquared(e[N]));return this.radius=Math.sqrt(t),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const M=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=M*M}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,M){const D=this.center.distanceToSquared(e);return M.copy(e),D>this.radius*this.radius&&(M.sub(this.center).normalize(),M.multiplyScalar(this.radius).add(this.center)),M}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;IN.subVectors(e,this.center);const M=IN.lengthSq();if(M>this.radius*this.radius){const D=Math.sqrt(M),t=(D-this.radius)*.5;this.center.addScaledVector(IN,t/D),this.radius+=t}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(si.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(IN.copy(e.center).add(si)),this.expandByPoint(IN.copy(e.center).sub(si))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};const ai=new Y,bg=new Y,Kg=new QM;class We{constructor(M=new Y(1,0,0),D=0){this.isPlane=!0,this.normal=M,this.constant=D}set(M,D){return this.normal.copy(M),this.constant=D,this}setComponents(M,D,t,N){return this.normal.set(M,D,t),this.constant=N,this}setFromNormalAndCoplanarPoint(M,D){return this.normal.copy(M),this.constant=-D.dot(this.normal),this}setFromCoplanarPoints(M,D,t){const N=ai.subVectors(t,D).cross(bg.subVectors(M,D)).normalize();return this.setFromNormalAndCoplanarPoint(N,M),this}copy(M){return this.normal.copy(M.normal),this.constant=M.constant,this}normalize(){const M=1/this.normal.length();return this.normal.multiplyScalar(M),this.constant*=M,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(M){return this.normal.dot(M)+this.constant}distanceToSphere(M){return this.distanceToPoint(M.center)-M.radius}projectPoint(M,D){return D.copy(M).addScaledVector(this.normal,-this.distanceToPoint(M))}intersectLine(M,D){const t=M.delta(ai),N=this.normal.dot(t);if(N===0)return this.distanceToPoint(M.start)===0?D.copy(M.start):null;const A=-(M.start.dot(this.normal)+this.constant)/N;return A<0||A>1?null:D.copy(M.start).addScaledVector(t,A)}intersectsLine(M){const D=this.distanceToPoint(M.start),t=this.distanceToPoint(M.end);return D<0&&t>0||t<0&&D>0}intersectsBox(M){return M.intersectsPlane(this)}intersectsSphere(M){return M.intersectsPlane(this)}coplanarPoint(M){return M.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(M,D){const t=D||Kg.getNormalMatrix(M),N=this.coplanarPoint(ai).applyMatrix4(M),A=this.normal.applyMatrix3(t).normalize();return this.constant=-N.dot(A),this}translate(M){return this.constant-=M.dot(this.normal),this}equals(M){return M.normal.equals(this.normal)&&M.constant===this.constant}clone(){return new this.constructor().copy(this)}}const He=new Lz,PN=new Y;class wz{constructor(M=new We,D=new We,t=new We,N=new We,A=new We,z=new We){this.planes=[M,D,t,N,A,z]}set(M,D,t,N,A,z){const i=this.planes;return i[0].copy(M),i[1].copy(D),i[2].copy(t),i[3].copy(N),i[4].copy(A),i[5].copy(z),this}copy(M){const D=this.planes;for(let t=0;t<6;t++)D[t].copy(M.planes[t]);return this}setFromProjectionMatrix(M){const D=this.planes,t=M.elements,N=t[0],A=t[1],z=t[2],i=t[3],T=t[4],I=t[5],n=t[6],u=t[7],g=t[8],r=t[9],a=t[10],c=t[11],j=t[12],s=t[13],L=t[14],y=t[15];return D[0].setComponents(i-N,u-T,c-g,y-j).normalize(),D[1].setComponents(i+N,u+T,c+g,y+j).normalize(),D[2].setComponents(i+A,u+I,c+r,y+s).normalize(),D[3].setComponents(i-A,u-I,c-r,y-s).normalize(),D[4].setComponents(i-z,u-n,c-a,y-L).normalize(),D[5].setComponents(i+z,u+n,c+a,y+L).normalize(),this}intersectsObject(M){if(M.boundingSphere!==void 0)M.boundingSphere===null&&M.computeBoundingSphere(),He.copy(M.boundingSphere).applyMatrix4(M.matrixWorld);else{const D=M.geometry;D.boundingSphere===null&&D.computeBoundingSphere(),He.copy(D.boundingSphere).applyMatrix4(M.matrixWorld)}return this.intersectsSphere(He)}intersectsSprite(M){return He.center.set(0,0,0),He.radius=.7071067811865476,He.applyMatrix4(M.matrixWorld),this.intersectsSphere(He)}intersectsSphere(M){const D=this.planes,t=M.center,N=-M.radius;for(let A=0;A<6;A++)if(D[A].distanceToPoint(t)<N)return!1;return!0}intersectsBox(M){const D=this.planes;for(let t=0;t<6;t++){const N=D[t];if(PN.x=N.normal.x>0?M.max.x:M.min.x,PN.y=N.normal.y>0?M.max.y:M.min.y,PN.z=N.normal.z>0?M.max.z:M.min.z,N.distanceToPoint(PN)<0)return!1}return!0}containsPoint(M){const D=this.planes;for(let t=0;t<6;t++)if(D[t].distanceToPoint(M)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const ji=new iD,EI=new Y,lI=new Y;class Rg{constructor(M){this.camera=M,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new jM(512,512),this.map=null,this.mapPass=null,this.matrix=new iD,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wz,this._frameExtents=new jM(1,1),this._viewportCount=1,this._viewports=[new ND(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(M){const D=this.camera,t=this.matrix;EI.setFromMatrixPosition(M.matrixWorld),D.position.copy(EI),lI.setFromMatrixPosition(M.target.matrixWorld),D.lookAt(lI),D.updateMatrixWorld(),ji.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ji),t.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),t.multiply(ji)}getViewport(M){return this._viewports[M]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(M){return this.camera=M.camera.clone(),this.bias=M.bias,this.radius=M.radius,this.mapSize.copy(M.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const M={};return this.bias!==0&&(M.bias=this.bias),this.normalBias!==0&&(M.normalBias=this.normalBias),this.radius!==1&&(M.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(M.mapSize=this.mapSize.toArray()),M.camera=this.camera.toJSON(!1).object,delete M.camera.matrix,M}}class jn extends Nn{constructor(M=-1,D=1,t=1,N=-1,A=.1,z=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=M,this.right=D,this.top=t,this.bottom=N,this.near=A,this.far=z,this.updateProjectionMatrix()}copy(M,D){return super.copy(M,D),this.left=M.left,this.right=M.right,this.top=M.top,this.bottom=M.bottom,this.near=M.near,this.far=M.far,this.zoom=M.zoom,this.view=M.view===null?null:Object.assign({},M.view),this}setViewOffset(M,D,t,N,A,z){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=M,this.view.fullHeight=D,this.view.offsetX=t,this.view.offsetY=N,this.view.width=A,this.view.height=z,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const M=(this.right-this.left)/(2*this.zoom),D=(this.top-this.bottom)/(2*this.zoom),t=(this.right+this.left)/2,N=(this.top+this.bottom)/2;let A=t-M,z=t+M,i=N+D,T=N-D;if(this.view!==null&&this.view.enabled){const I=(this.right-this.left)/this.view.fullWidth/this.zoom,n=(this.top-this.bottom)/this.view.fullHeight/this.zoom;A+=I*this.view.offsetX,z=A+I*this.view.width,i-=n*this.view.offsetY,T=i-n*this.view.height}this.projectionMatrix.makeOrthographic(A,z,i,T,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(M){const D=super.toJSON(M);return D.object.zoom=this.zoom,D.object.left=this.left,D.object.right=this.right,D.object.top=this.top,D.object.bottom=this.bottom,D.object.near=this.near,D.object.far=this.far,this.view!==null&&(D.object.view=Object.assign({},this.view)),D}}class Pg extends Rg{constructor(){super(new jn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fg extends Zg{constructor(M,D){super(M,D),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(OD.DEFAULT_UP),this.updateMatrix(),this.target=new OD,this.shadow=new Pg}dispose(){this.shadow.dispose()}copy(M){return super.copy(M),this.target=M.target.clone(),this.shadow=M.shadow.clone(),this}}const hI={enabled:!1,files:{},add:function(e,M){this.enabled!==!1&&(this.files[e]=M)},get:function(e){if(this.enabled!==!1)return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};let Bg=class{constructor(e,M,D){const t=this;let N=!1,A=0,z=0,i;const T=[];this.onStart=void 0,this.onLoad=e,this.onProgress=M,this.onError=D,this.itemStart=function(I){z++,N===!1&&t.onStart!==void 0&&t.onStart(I,A,z),N=!0},this.itemEnd=function(I){A++,t.onProgress!==void 0&&t.onProgress(I,A,z),A===z&&(N=!1,t.onLoad!==void 0&&t.onLoad())},this.itemError=function(I){t.onError!==void 0&&t.onError(I)},this.resolveURL=function(I){return i?i(I):I},this.setURLModifier=function(I){return i=I,this},this.addHandler=function(I,n){return T.push(I,n),this},this.removeHandler=function(I){const n=T.indexOf(I);return n!==-1&&T.splice(n,2),this},this.getHandler=function(I){for(let n=0,u=T.length;n<u;n+=2){const g=T[n],r=T[n+1];if(g.global&&(g.lastIndex=0),g.test(I))return r}return null}}};const Hg=new Bg;let cn=class{constructor(e){this.manager=e!==void 0?e:Hg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,M){const D=this;return new Promise(function(t,N){D.load(e,t,M,N)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};function yn(e){for(let M=e.length-1;M>=0;--M)if(e[M]>=65535)return!0;return!1}function ON(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}const vI={};function cN(e){e in vI||(vI[e]=!0,console.warn(e))}class Gg extends cn{constructor(M){super(M)}load(M,D,t,N){this.path!==void 0&&(M=this.path+M),M=this.manager.resolveURL(M);const A=this,z=hI.get(M);if(z!==void 0)return A.manager.itemStart(M),setTimeout(function(){D&&D(z),A.manager.itemEnd(M)},0),z;const i=ON("img");function T(){n(),hI.add(M,this),D&&D(this),A.manager.itemEnd(M)}function I(u){n(),N&&N(u),A.manager.itemError(M),A.manager.itemEnd(M)}function n(){i.removeEventListener("load",T,!1),i.removeEventListener("error",I,!1)}return i.addEventListener("load",T,!1),i.addEventListener("error",I,!1),M.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(i.crossOrigin=this.crossOrigin),A.manager.itemStart(M),i.src=M,i}}let yt,on=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let M;if(e instanceof HTMLCanvasElement)M=e;else{yt===void 0&&(yt=ON("canvas")),yt.width=e.width,yt.height=e.height;const D=yt.getContext("2d");e instanceof ImageData?D.putImageData(e,0,0):D.drawImage(e,0,0,e.width,e.height),M=yt}return M.width>2048||M.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),M.toDataURL("image/jpeg",.6)):M.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const M=ON("canvas");M.width=e.width,M.height=e.height;const D=M.getContext("2d");D.drawImage(e,0,0,e.width,e.height);const t=D.getImageData(0,0,e.width,e.height),N=t.data;for(let A=0;A<N.length;A++)N[A]=Ht(N[A]/255)*255;return D.putImageData(t,0,0),M}else if(e.data){const M=e.data.slice(0);for(let D=0;D<M.length;D++)M instanceof Uint8Array||M instanceof Uint8ClampedArray?M[D]=Math.floor(Ht(M[D]/255)*255):M[D]=Ht(M[D]);return{data:M,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Cn=class{constructor(e=null){this.isSource=!0,this.uuid=MN(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const M=e===void 0||typeof e=="string";if(!M&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const D={uuid:this.uuid,url:""},t=this.data;if(t!==null){let N;if(Array.isArray(t)){N=[];for(let A=0,z=t.length;A<z;A++)t[A].isDataTexture?N.push(ci(t[A].image)):N.push(ci(t[A]))}else N=ci(t);D.url=N}return M||(e.images[this.uuid]=D),D}};function ci(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?on.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vg=0,JD=class UA extends DN{constructor(M=UA.DEFAULT_IMAGE,D=UA.DEFAULT_MAPPING,t=XD,N=XD,A=CD,z=LN,i=qD,T=it,I=UA.DEFAULT_ANISOTROPY,n=Nt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=MN(),this.name="",this.source=new Cn(M),this.mipmaps=[],this.mapping=D,this.channel=0,this.wrapS=t,this.wrapT=N,this.magFilter=A,this.minFilter=z,this.anisotropy=I,this.format=i,this.internalFormat=null,this.type=T,this.offset=new jM(0,0),this.repeat=new jM(1,1),this.center=new jM(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new QM,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof n=="string"?this.colorSpace=n:(cN("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=n===tt?lM:Nt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(M=null){this.source.data=M}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(M){return this.name=M.name,this.source=M.source,this.mipmaps=M.mipmaps.slice(0),this.mapping=M.mapping,this.channel=M.channel,this.wrapS=M.wrapS,this.wrapT=M.wrapT,this.magFilter=M.magFilter,this.minFilter=M.minFilter,this.anisotropy=M.anisotropy,this.format=M.format,this.internalFormat=M.internalFormat,this.type=M.type,this.offset.copy(M.offset),this.repeat.copy(M.repeat),this.center.copy(M.center),this.rotation=M.rotation,this.matrixAutoUpdate=M.matrixAutoUpdate,this.matrix.copy(M.matrix),this.generateMipmaps=M.generateMipmaps,this.premultiplyAlpha=M.premultiplyAlpha,this.flipY=M.flipY,this.unpackAlignment=M.unpackAlignment,this.colorSpace=M.colorSpace,this.userData=JSON.parse(JSON.stringify(M.userData)),this.needsUpdate=!0,this}toJSON(M){const D=M===void 0||typeof M=="string";if(!D&&M.textures[this.uuid]!==void 0)return M.textures[this.uuid];const t={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(M).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),D||(M.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(M){if(this.mapping!==Tn)return M;if(M.applyMatrix3(this.matrix),M.x<0||M.x>1)switch(this.wrapS){case uz:M.x=M.x-Math.floor(M.x);break;case XD:M.x=M.x<0?0:1;break;case gz:Math.abs(Math.floor(M.x)%2)===1?M.x=Math.ceil(M.x)-M.x:M.x=M.x-Math.floor(M.x);break}if(M.y<0||M.y>1)switch(this.wrapT){case uz:M.y=M.y-Math.floor(M.y);break;case XD:M.y=M.y<0?0:1;break;case gz:Math.abs(Math.floor(M.y)%2)===1?M.y=Math.ceil(M.y)-M.y:M.y=M.y-Math.floor(M.y);break}return this.flipY&&(M.y=1-M.y),M}set needsUpdate(M){M===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return cN("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===lM?tt:un}set encoding(M){cN("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=M===tt?lM:Nt}};JD.DEFAULT_IMAGE=null;JD.DEFAULT_MAPPING=Tn;JD.DEFAULT_ANISOTROPY=1;class Wg extends cn{constructor(M){super(M)}load(M,D,t,N){const A=new JD,z=new Gg(this.manager);return z.setCrossOrigin(this.crossOrigin),z.setPath(this.path),z.load(M,function(i){A.image=i,A.needsUpdate=!0,D!==void 0&&D(A)},t,N),A}}let Xg=0,pN=class extends DN{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xg++}),this.uuid=MN(),this.name="",this.type="Material",this.blending=Ft,this.side=Ze,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=zn,this.blendDst=In,this.blendEquation=Kt,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Iz,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const M in e){const D=e[M];if(D===void 0){console.warn(`THREE.Material: parameter '${M}' has value of undefined.`);continue}const t=this[M];if(t===void 0){console.warn(`THREE.Material: '${M}' is not a property of THREE.${this.type}.`);continue}t&&t.isColor?t.set(D):t&&t.isVector3&&D&&D.isVector3?t.copy(D):this[M]=D}}toJSON(e){const M=e===void 0||typeof e=="string";M&&(e={textures:{},images:{}});const D={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};D.uuid=this.uuid,D.type=this.type,this.name!==""&&(D.name=this.name),this.color&&this.color.isColor&&(D.color=this.color.getHex()),this.roughness!==void 0&&(D.roughness=this.roughness),this.metalness!==void 0&&(D.metalness=this.metalness),this.sheen!==void 0&&(D.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(D.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(D.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(D.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(D.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(D.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(D.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(D.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(D.shininess=this.shininess),this.clearcoat!==void 0&&(D.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(D.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(D.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(D.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(D.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,D.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(D.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(D.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(D.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(D.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(D.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(D.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(D.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(D.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(D.lightMap=this.lightMap.toJSON(e).uuid,D.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(D.aoMap=this.aoMap.toJSON(e).uuid,D.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(D.bumpMap=this.bumpMap.toJSON(e).uuid,D.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(D.normalMap=this.normalMap.toJSON(e).uuid,D.normalMapType=this.normalMapType,D.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(D.displacementMap=this.displacementMap.toJSON(e).uuid,D.displacementScale=this.displacementScale,D.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(D.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(D.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(D.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(D.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(D.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(D.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(D.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(D.combine=this.combine)),this.envMapIntensity!==void 0&&(D.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(D.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(D.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(D.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(D.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(D.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(D.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(D.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(D.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(D.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(D.size=this.size),this.shadowSide!==null&&(D.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(D.sizeAttenuation=this.sizeAttenuation),this.blending!==Ft&&(D.blending=this.blending),this.side!==Ze&&(D.side=this.side),this.vertexColors&&(D.vertexColors=!0),this.opacity<1&&(D.opacity=this.opacity),this.transparent===!0&&(D.transparent=this.transparent),D.depthFunc=this.depthFunc,D.depthTest=this.depthTest,D.depthWrite=this.depthWrite,D.colorWrite=this.colorWrite,D.stencilWrite=this.stencilWrite,D.stencilWriteMask=this.stencilWriteMask,D.stencilFunc=this.stencilFunc,D.stencilRef=this.stencilRef,D.stencilFuncMask=this.stencilFuncMask,D.stencilFail=this.stencilFail,D.stencilZFail=this.stencilZFail,D.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(D.rotation=this.rotation),this.polygonOffset===!0&&(D.polygonOffset=!0),this.polygonOffsetFactor!==0&&(D.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(D.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(D.linewidth=this.linewidth),this.dashSize!==void 0&&(D.dashSize=this.dashSize),this.gapSize!==void 0&&(D.gapSize=this.gapSize),this.scale!==void 0&&(D.scale=this.scale),this.dithering===!0&&(D.dithering=!0),this.alphaTest>0&&(D.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(D.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(D.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(D.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(D.wireframe=this.wireframe),this.wireframeLinewidth>1&&(D.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(D.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(D.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(D.flatShading=this.flatShading),this.visible===!1&&(D.visible=!1),this.toneMapped===!1&&(D.toneMapped=!1),this.fog===!1&&(D.fog=!1),Object.keys(this.userData).length>0&&(D.userData=this.userData);function t(N){const A=[];for(const z in N){const i=N[z];delete i.metadata,A.push(i)}return A}if(M){const N=t(e.textures),A=t(e.images);N.length>0&&(D.textures=N),A.length>0&&(D.images=A)}return D}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const M=e.clippingPlanes;let D=null;if(M!==null){const t=M.length;D=new Array(t);for(let N=0;N!==t;++N)D[N]=M[N].clone()}return this.clippingPlanes=D,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};class Ln extends pN{constructor(M){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new bM(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new bM(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gn,this.normalScale=new jM(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Cz,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.map=M.map,this.lightMap=M.lightMap,this.lightMapIntensity=M.lightMapIntensity,this.aoMap=M.aoMap,this.aoMapIntensity=M.aoMapIntensity,this.emissive.copy(M.emissive),this.emissiveMap=M.emissiveMap,this.emissiveIntensity=M.emissiveIntensity,this.bumpMap=M.bumpMap,this.bumpScale=M.bumpScale,this.normalMap=M.normalMap,this.normalMapType=M.normalMapType,this.normalScale.copy(M.normalScale),this.displacementMap=M.displacementMap,this.displacementScale=M.displacementScale,this.displacementBias=M.displacementBias,this.specularMap=M.specularMap,this.alphaMap=M.alphaMap,this.envMap=M.envMap,this.combine=M.combine,this.reflectivity=M.reflectivity,this.refractionRatio=M.refractionRatio,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.wireframeLinecap=M.wireframeLinecap,this.wireframeLinejoin=M.wireframeLinejoin,this.flatShading=M.flatShading,this.fog=M.fog,this}}const ge=new Y,yi=new Y,FN=new Y,Ue=new Y,oi=new Y,BN=new Y,Ci=new Y;let qg=class{constructor(e=new Y,M=new Y(0,0,-1)){this.origin=e,this.direction=M}set(e,M){return this.origin.copy(e),this.direction.copy(M),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,M){return M.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ge)),this}closestPointToPoint(e,M){M.subVectors(e,this.origin);const D=M.dot(this.direction);return D<0?M.copy(this.origin):M.copy(this.origin).addScaledVector(this.direction,D)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const M=ge.subVectors(e,this.origin).dot(this.direction);return M<0?this.origin.distanceToSquared(e):(ge.copy(this.origin).addScaledVector(this.direction,M),ge.distanceToSquared(e))}distanceSqToSegment(e,M,D,t){yi.copy(e).add(M).multiplyScalar(.5),FN.copy(M).sub(e).normalize(),Ue.copy(this.origin).sub(yi);const N=e.distanceTo(M)*.5,A=-this.direction.dot(FN),z=Ue.dot(this.direction),i=-Ue.dot(FN),T=Ue.lengthSq(),I=Math.abs(1-A*A);let n,u,g,r;if(I>0)if(n=A*i-z,u=A*z-i,r=N*I,n>=0)if(u>=-r)if(u<=r){const a=1/I;n*=a,u*=a,g=n*(n+A*u+2*z)+u*(A*n+u+2*i)+T}else u=N,n=Math.max(0,-(A*u+z)),g=-n*n+u*(u+2*i)+T;else u=-N,n=Math.max(0,-(A*u+z)),g=-n*n+u*(u+2*i)+T;else u<=-r?(n=Math.max(0,-(-A*N+z)),u=n>0?-N:Math.min(Math.max(-N,-i),N),g=-n*n+u*(u+2*i)+T):u<=r?(n=0,u=Math.min(Math.max(-N,-i),N),g=u*(u+2*i)+T):(n=Math.max(0,-(A*N+z)),u=n>0?N:Math.min(Math.max(-N,-i),N),g=-n*n+u*(u+2*i)+T);else u=A>0?-N:N,n=Math.max(0,-(A*u+z)),g=-n*n+u*(u+2*i)+T;return D&&D.copy(this.origin).addScaledVector(this.direction,n),t&&t.copy(yi).addScaledVector(FN,u),g}intersectSphere(e,M){ge.subVectors(e.center,this.origin);const D=ge.dot(this.direction),t=ge.dot(ge)-D*D,N=e.radius*e.radius;if(t>N)return null;const A=Math.sqrt(N-t),z=D-A,i=D+A;return i<0?null:z<0?this.at(i,M):this.at(z,M)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const M=e.normal.dot(this.direction);if(M===0)return e.distanceToPoint(this.origin)===0?0:null;const D=-(this.origin.dot(e.normal)+e.constant)/M;return D>=0?D:null}intersectPlane(e,M){const D=this.distanceToPlane(e);return D===null?null:this.at(D,M)}intersectsPlane(e){const M=e.distanceToPoint(this.origin);return M===0||e.normal.dot(this.direction)*M<0}intersectBox(e,M){let D,t,N,A,z,i;const T=1/this.direction.x,I=1/this.direction.y,n=1/this.direction.z,u=this.origin;return T>=0?(D=(e.min.x-u.x)*T,t=(e.max.x-u.x)*T):(D=(e.max.x-u.x)*T,t=(e.min.x-u.x)*T),I>=0?(N=(e.min.y-u.y)*I,A=(e.max.y-u.y)*I):(N=(e.max.y-u.y)*I,A=(e.min.y-u.y)*I),D>A||N>t||((N>D||isNaN(D))&&(D=N),(A<t||isNaN(t))&&(t=A),n>=0?(z=(e.min.z-u.z)*n,i=(e.max.z-u.z)*n):(z=(e.max.z-u.z)*n,i=(e.min.z-u.z)*n),D>i||z>t)||((z>D||D!==D)&&(D=z),(i<t||t!==t)&&(t=i),t<0)?null:this.at(D>=0?D:t,M)}intersectsBox(e){return this.intersectBox(e,ge)!==null}intersectTriangle(e,M,D,t,N){oi.subVectors(M,e),BN.subVectors(D,e),Ci.crossVectors(oi,BN);let A=this.direction.dot(Ci),z;if(A>0){if(t)return null;z=1}else if(A<0)z=-1,A=-A;else return null;Ue.subVectors(this.origin,e);const i=z*this.direction.dot(BN.crossVectors(Ue,BN));if(i<0)return null;const T=z*this.direction.dot(oi.cross(Ue));if(T<0||i+T>A)return null;const I=-z*Ue.dot(Ci);return I<0?null:this.at(I/A,N)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};const FD=new Y,re=new Y,Li=new Y,se=new Y,ot=new Y,Ct=new Y,dI=new Y,wi=new Y,Oi=new Y,xi=new Y;let HN=!1,GN=class Xe{constructor(M=new Y,D=new Y,t=new Y){this.a=M,this.b=D,this.c=t}static getNormal(M,D,t,N){N.subVectors(t,D),FD.subVectors(M,D),N.cross(FD);const A=N.lengthSq();return A>0?N.multiplyScalar(1/Math.sqrt(A)):N.set(0,0,0)}static getBarycoord(M,D,t,N,A){FD.subVectors(N,D),re.subVectors(t,D),Li.subVectors(M,D);const z=FD.dot(FD),i=FD.dot(re),T=FD.dot(Li),I=re.dot(re),n=re.dot(Li),u=z*I-i*i;if(u===0)return A.set(-2,-1,-1);const g=1/u,r=(I*T-i*n)*g,a=(z*n-i*T)*g;return A.set(1-r-a,a,r)}static containsPoint(M,D,t,N){return this.getBarycoord(M,D,t,N,se),se.x>=0&&se.y>=0&&se.x+se.y<=1}static getUV(M,D,t,N,A,z,i,T){return HN===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),HN=!0),this.getInterpolation(M,D,t,N,A,z,i,T)}static getInterpolation(M,D,t,N,A,z,i,T){return this.getBarycoord(M,D,t,N,se),T.setScalar(0),T.addScaledVector(A,se.x),T.addScaledVector(z,se.y),T.addScaledVector(i,se.z),T}static isFrontFacing(M,D,t,N){return FD.subVectors(t,D),re.subVectors(M,D),FD.cross(re).dot(N)<0}set(M,D,t){return this.a.copy(M),this.b.copy(D),this.c.copy(t),this}setFromPointsAndIndices(M,D,t,N){return this.a.copy(M[D]),this.b.copy(M[t]),this.c.copy(M[N]),this}setFromAttributeAndIndices(M,D,t,N){return this.a.fromBufferAttribute(M,D),this.b.fromBufferAttribute(M,t),this.c.fromBufferAttribute(M,N),this}clone(){return new this.constructor().copy(this)}copy(M){return this.a.copy(M.a),this.b.copy(M.b),this.c.copy(M.c),this}getArea(){return FD.subVectors(this.c,this.b),re.subVectors(this.a,this.b),FD.cross(re).length()*.5}getMidpoint(M){return M.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(M){return Xe.getNormal(this.a,this.b,this.c,M)}getPlane(M){return M.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(M,D){return Xe.getBarycoord(M,this.a,this.b,this.c,D)}getUV(M,D,t,N,A){return HN===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),HN=!0),Xe.getInterpolation(M,this.a,this.b,this.c,D,t,N,A)}getInterpolation(M,D,t,N,A){return Xe.getInterpolation(M,this.a,this.b,this.c,D,t,N,A)}containsPoint(M){return Xe.containsPoint(M,this.a,this.b,this.c)}isFrontFacing(M){return Xe.isFrontFacing(this.a,this.b,this.c,M)}intersectsBox(M){return M.intersectsTriangle(this)}closestPointToPoint(M,D){const t=this.a,N=this.b,A=this.c;let z,i;ot.subVectors(N,t),Ct.subVectors(A,t),wi.subVectors(M,t);const T=ot.dot(wi),I=Ct.dot(wi);if(T<=0&&I<=0)return D.copy(t);Oi.subVectors(M,N);const n=ot.dot(Oi),u=Ct.dot(Oi);if(n>=0&&u<=n)return D.copy(N);const g=T*u-n*I;if(g<=0&&T>=0&&n<=0)return z=T/(T-n),D.copy(t).addScaledVector(ot,z);xi.subVectors(M,A);const r=ot.dot(xi),a=Ct.dot(xi);if(a>=0&&r<=a)return D.copy(A);const c=r*I-T*a;if(c<=0&&I>=0&&a<=0)return i=I/(I-a),D.copy(t).addScaledVector(Ct,i);const j=n*a-r*u;if(j<=0&&u-n>=0&&r-a>=0)return dI.subVectors(A,N),i=(u-n)/(u-n+(r-a)),D.copy(N).addScaledVector(dI,i);const s=1/(j+c+g);return z=c*s,i=g*s,D.copy(t).addScaledVector(ot,z).addScaledVector(Ct,i)}equals(M){return M.a.equals(this.a)&&M.b.equals(this.b)&&M.c.equals(this.c)}},wn=class extends pN{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new bM(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Cz,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};const VM=new Y,VN=new jM;let Ae=class{constructor(e,M,D=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=M,this.count=e!==void 0?e.length/M:0,this.normalized=D,this.usage=OI,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,M,D){e*=this.itemSize,D*=M.itemSize;for(let t=0,N=this.itemSize;t<N;t++)this.array[e+t]=M.array[D+t];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let M=0,D=this.count;M<D;M++)VN.fromBufferAttribute(this,M),VN.applyMatrix3(e),this.setXY(M,VN.x,VN.y);else if(this.itemSize===3)for(let M=0,D=this.count;M<D;M++)VM.fromBufferAttribute(this,M),VM.applyMatrix3(e),this.setXYZ(M,VM.x,VM.y,VM.z);return this}applyMatrix4(e){for(let M=0,D=this.count;M<D;M++)VM.fromBufferAttribute(this,M),VM.applyMatrix4(e),this.setXYZ(M,VM.x,VM.y,VM.z);return this}applyNormalMatrix(e){for(let M=0,D=this.count;M<D;M++)VM.fromBufferAttribute(this,M),VM.applyNormalMatrix(e),this.setXYZ(M,VM.x,VM.y,VM.z);return this}transformDirection(e){for(let M=0,D=this.count;M<D;M++)VM.fromBufferAttribute(this,M),VM.transformDirection(e),this.setXYZ(M,VM.x,VM.y,VM.z);return this}set(e,M=0){return this.array.set(e,M),this}getX(e){let M=this.array[e*this.itemSize];return this.normalized&&(M=fN(M,this.array)),M}setX(e,M){return this.normalized&&(M=ED(M,this.array)),this.array[e*this.itemSize]=M,this}getY(e){let M=this.array[e*this.itemSize+1];return this.normalized&&(M=fN(M,this.array)),M}setY(e,M){return this.normalized&&(M=ED(M,this.array)),this.array[e*this.itemSize+1]=M,this}getZ(e){let M=this.array[e*this.itemSize+2];return this.normalized&&(M=fN(M,this.array)),M}setZ(e,M){return this.normalized&&(M=ED(M,this.array)),this.array[e*this.itemSize+2]=M,this}getW(e){let M=this.array[e*this.itemSize+3];return this.normalized&&(M=fN(M,this.array)),M}setW(e,M){return this.normalized&&(M=ED(M,this.array)),this.array[e*this.itemSize+3]=M,this}setXY(e,M,D){return e*=this.itemSize,this.normalized&&(M=ED(M,this.array),D=ED(D,this.array)),this.array[e+0]=M,this.array[e+1]=D,this}setXYZ(e,M,D,t){return e*=this.itemSize,this.normalized&&(M=ED(M,this.array),D=ED(D,this.array),t=ED(t,this.array)),this.array[e+0]=M,this.array[e+1]=D,this.array[e+2]=t,this}setXYZW(e,M,D,t,N){return e*=this.itemSize,this.normalized&&(M=ED(M,this.array),D=ED(D,this.array),t=ED(t,this.array),N=ED(N,this.array)),this.array[e+0]=M,this.array[e+1]=D,this.array[e+2]=t,this.array[e+3]=N,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==OI&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}},On=class extends Ae{constructor(e,M,D){super(new Uint16Array(e),M,D)}},xn=class extends Ae{constructor(e,M,D){super(new Uint32Array(e),M,D)}},ie=class extends Ae{constructor(e,M,D){super(new Float32Array(e),M,D)}},Jg=0;const mD=new iD,Ei=new OD,Lt=new Y,hD=new eN,TN=new eN,eD=new Y;let tN=class En extends DN{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=MN(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(M){return Array.isArray(M)?this.index=new(yn(M)?xn:On)(M,1):this.index=M,this}getAttribute(M){return this.attributes[M]}setAttribute(M,D){return this.attributes[M]=D,this}deleteAttribute(M){return delete this.attributes[M],this}hasAttribute(M){return this.attributes[M]!==void 0}addGroup(M,D,t=0){this.groups.push({start:M,count:D,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(M,D){this.drawRange.start=M,this.drawRange.count=D}applyMatrix4(M){const D=this.attributes.position;D!==void 0&&(D.applyMatrix4(M),D.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const A=new QM().getNormalMatrix(M);t.applyNormalMatrix(A),t.needsUpdate=!0}const N=this.attributes.tangent;return N!==void 0&&(N.transformDirection(M),N.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(M){return mD.makeRotationFromQuaternion(M),this.applyMatrix4(mD),this}rotateX(M){return mD.makeRotationX(M),this.applyMatrix4(mD),this}rotateY(M){return mD.makeRotationY(M),this.applyMatrix4(mD),this}rotateZ(M){return mD.makeRotationZ(M),this.applyMatrix4(mD),this}translate(M,D,t){return mD.makeTranslation(M,D,t),this.applyMatrix4(mD),this}scale(M,D,t){return mD.makeScale(M,D,t),this.applyMatrix4(mD),this}lookAt(M){return Ei.lookAt(M),Ei.updateMatrix(),this.applyMatrix4(Ei.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lt).negate(),this.translate(Lt.x,Lt.y,Lt.z),this}setFromPoints(M){const D=[];for(let t=0,N=M.length;t<N;t++){const A=M[t];D.push(A.x,A.y,A.z||0)}return this.setAttribute("position",new ie(D,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new eN);const M=this.attributes.position,D=this.morphAttributes.position;if(M&&M.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(M!==void 0){if(this.boundingBox.setFromBufferAttribute(M),D)for(let t=0,N=D.length;t<N;t++){const A=D[t];hD.setFromBufferAttribute(A),this.morphTargetsRelative?(eD.addVectors(this.boundingBox.min,hD.min),this.boundingBox.expandByPoint(eD),eD.addVectors(this.boundingBox.max,hD.max),this.boundingBox.expandByPoint(eD)):(this.boundingBox.expandByPoint(hD.min),this.boundingBox.expandByPoint(hD.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lz);const M=this.attributes.position,D=this.morphAttributes.position;if(M&&M.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Y,1/0);return}if(M){const t=this.boundingSphere.center;if(hD.setFromBufferAttribute(M),D)for(let A=0,z=D.length;A<z;A++){const i=D[A];TN.setFromBufferAttribute(i),this.morphTargetsRelative?(eD.addVectors(hD.min,TN.min),hD.expandByPoint(eD),eD.addVectors(hD.max,TN.max),hD.expandByPoint(eD)):(hD.expandByPoint(TN.min),hD.expandByPoint(TN.max))}hD.getCenter(t);let N=0;for(let A=0,z=M.count;A<z;A++)eD.fromBufferAttribute(M,A),N=Math.max(N,t.distanceToSquared(eD));if(D)for(let A=0,z=D.length;A<z;A++){const i=D[A],T=this.morphTargetsRelative;for(let I=0,n=i.count;I<n;I++)eD.fromBufferAttribute(i,I),T&&(Lt.fromBufferAttribute(M,I),eD.add(Lt)),N=Math.max(N,t.distanceToSquared(eD))}this.boundingSphere.radius=Math.sqrt(N),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const M=this.index,D=this.attributes;if(M===null||D.position===void 0||D.normal===void 0||D.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=M.array,N=D.position.array,A=D.normal.array,z=D.uv.array,i=N.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ae(new Float32Array(4*i),4));const T=this.getAttribute("tangent").array,I=[],n=[];for(let l=0;l<i;l++)I[l]=new Y,n[l]=new Y;const u=new Y,g=new Y,r=new Y,a=new jM,c=new jM,j=new jM,s=new Y,L=new Y;function y(l,F,K){u.fromArray(N,l*3),g.fromArray(N,F*3),r.fromArray(N,K*3),a.fromArray(z,l*2),c.fromArray(z,F*2),j.fromArray(z,K*2),g.sub(u),r.sub(u),c.sub(a),j.sub(a);const m=1/(c.x*j.y-j.x*c.y);isFinite(m)&&(s.copy(g).multiplyScalar(j.y).addScaledVector(r,-c.y).multiplyScalar(m),L.copy(r).multiplyScalar(c.x).addScaledVector(g,-j.x).multiplyScalar(m),I[l].add(s),I[F].add(s),I[K].add(s),n[l].add(L),n[F].add(L),n[K].add(L))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.length}]);for(let l=0,F=x.length;l<F;++l){const K=x[l],m=K.start,f=K.count;for(let k=m,J=m+f;k<J;k+=3)y(t[k+0],t[k+1],t[k+2])}const O=new Y,h=new Y,d=new Y,G=new Y;function o(l){d.fromArray(A,l*3),G.copy(d);const F=I[l];O.copy(F),O.sub(d.multiplyScalar(d.dot(F))).normalize(),h.crossVectors(G,F);const K=h.dot(n[l])<0?-1:1;T[l*4]=O.x,T[l*4+1]=O.y,T[l*4+2]=O.z,T[l*4+3]=K}for(let l=0,F=x.length;l<F;++l){const K=x[l],m=K.start,f=K.count;for(let k=m,J=m+f;k<J;k+=3)o(t[k+0]),o(t[k+1]),o(t[k+2])}}computeVertexNormals(){const M=this.index,D=this.getAttribute("position");if(D!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new Ae(new Float32Array(D.count*3),3),this.setAttribute("normal",t);else for(let g=0,r=t.count;g<r;g++)t.setXYZ(g,0,0,0);const N=new Y,A=new Y,z=new Y,i=new Y,T=new Y,I=new Y,n=new Y,u=new Y;if(M)for(let g=0,r=M.count;g<r;g+=3){const a=M.getX(g+0),c=M.getX(g+1),j=M.getX(g+2);N.fromBufferAttribute(D,a),A.fromBufferAttribute(D,c),z.fromBufferAttribute(D,j),n.subVectors(z,A),u.subVectors(N,A),n.cross(u),i.fromBufferAttribute(t,a),T.fromBufferAttribute(t,c),I.fromBufferAttribute(t,j),i.add(n),T.add(n),I.add(n),t.setXYZ(a,i.x,i.y,i.z),t.setXYZ(c,T.x,T.y,T.z),t.setXYZ(j,I.x,I.y,I.z)}else for(let g=0,r=D.count;g<r;g+=3)N.fromBufferAttribute(D,g+0),A.fromBufferAttribute(D,g+1),z.fromBufferAttribute(D,g+2),n.subVectors(z,A),u.subVectors(N,A),n.cross(u),t.setXYZ(g+0,n.x,n.y,n.z),t.setXYZ(g+1,n.x,n.y,n.z),t.setXYZ(g+2,n.x,n.y,n.z);this.normalizeNormals(),t.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const M=this.attributes.normal;for(let D=0,t=M.count;D<t;D++)eD.fromBufferAttribute(M,D),eD.normalize(),M.setXYZ(D,eD.x,eD.y,eD.z)}toNonIndexed(){function M(i,T){const I=i.array,n=i.itemSize,u=i.normalized,g=new I.constructor(T.length*n);let r=0,a=0;for(let c=0,j=T.length;c<j;c++){i.isInterleavedBufferAttribute?r=T[c]*i.data.stride+i.offset:r=T[c]*n;for(let s=0;s<n;s++)g[a++]=I[r++]}return new Ae(g,n,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const D=new En,t=this.index.array,N=this.attributes;for(const i in N){const T=N[i],I=M(T,t);D.setAttribute(i,I)}const A=this.morphAttributes;for(const i in A){const T=[],I=A[i];for(let n=0,u=I.length;n<u;n++){const g=I[n],r=M(g,t);T.push(r)}D.morphAttributes[i]=T}D.morphTargetsRelative=this.morphTargetsRelative;const z=this.groups;for(let i=0,T=z.length;i<T;i++){const I=z[i];D.addGroup(I.start,I.count,I.materialIndex)}return D}toJSON(){const M={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(M.uuid=this.uuid,M.type=this.type,this.name!==""&&(M.name=this.name),Object.keys(this.userData).length>0&&(M.userData=this.userData),this.parameters!==void 0){const T=this.parameters;for(const I in T)T[I]!==void 0&&(M[I]=T[I]);return M}M.data={attributes:{}};const D=this.index;D!==null&&(M.data.index={type:D.array.constructor.name,array:Array.prototype.slice.call(D.array)});const t=this.attributes;for(const T in t){const I=t[T];M.data.attributes[T]=I.toJSON(M.data)}const N={};let A=!1;for(const T in this.morphAttributes){const I=this.morphAttributes[T],n=[];for(let u=0,g=I.length;u<g;u++){const r=I[u];n.push(r.toJSON(M.data))}n.length>0&&(N[T]=n,A=!0)}A&&(M.data.morphAttributes=N,M.data.morphTargetsRelative=this.morphTargetsRelative);const z=this.groups;z.length>0&&(M.data.groups=JSON.parse(JSON.stringify(z)));const i=this.boundingSphere;return i!==null&&(M.data.boundingSphere={center:i.center.toArray(),radius:i.radius}),M}clone(){return new this.constructor().copy(this)}copy(M){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const D={};this.name=M.name;const t=M.index;t!==null&&this.setIndex(t.clone(D));const N=M.attributes;for(const I in N){const n=N[I];this.setAttribute(I,n.clone(D))}const A=M.morphAttributes;for(const I in A){const n=[],u=A[I];for(let g=0,r=u.length;g<r;g++)n.push(u[g].clone(D));this.morphAttributes[I]=n}this.morphTargetsRelative=M.morphTargetsRelative;const z=M.groups;for(let I=0,n=z.length;I<n;I++){const u=z[I];this.addGroup(u.start,u.count,u.materialIndex)}const i=M.boundingBox;i!==null&&(this.boundingBox=i.clone());const T=M.boundingSphere;return T!==null&&(this.boundingSphere=T.clone()),this.drawRange.start=M.drawRange.start,this.drawRange.count=M.drawRange.count,this.userData=M.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};const pI=new iD,Me=new qg,WN=new Lz,YI=new Y,wt=new Y,Ot=new Y,xt=new Y,li=new Y,XN=new Y,qN=new jM,JN=new jM,$N=new jM,UI=new Y,mI=new Y,QI=new Y,MA=new Y,DA=new Y;let Ne=class extends OD{constructor(e=new tN,M=new wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=M,this.updateMorphTargets()}copy(e,M){return super.copy(e,M),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,M=Object.keys(e);if(M.length>0){const D=e[M[0]];if(D!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let t=0,N=D.length;t<N;t++){const A=D[t].name||String(t);this.morphTargetInfluences.push(0),this.morphTargetDictionary[A]=t}}}}getVertexPosition(e,M){const D=this.geometry,t=D.attributes.position,N=D.morphAttributes.position,A=D.morphTargetsRelative;M.fromBufferAttribute(t,e);const z=this.morphTargetInfluences;if(N&&z){XN.set(0,0,0);for(let i=0,T=N.length;i<T;i++){const I=z[i],n=N[i];I!==0&&(li.fromBufferAttribute(n,e),A?XN.addScaledVector(li,I):XN.addScaledVector(li.sub(M),I))}M.add(XN)}return M}raycast(e,M){const D=this.geometry,t=this.material,N=this.matrixWorld;t!==void 0&&(D.boundingSphere===null&&D.computeBoundingSphere(),WN.copy(D.boundingSphere),WN.applyMatrix4(N),Me.copy(e.ray).recast(e.near),!(WN.containsPoint(Me.origin)===!1&&(Me.intersectSphere(WN,YI)===null||Me.origin.distanceToSquared(YI)>(e.far-e.near)**2))&&(pI.copy(N).invert(),Me.copy(e.ray).applyMatrix4(pI),!(D.boundingBox!==null&&Me.intersectsBox(D.boundingBox)===!1)&&this._computeIntersections(e,M)))}_computeIntersections(e,M){let D;const t=this.geometry,N=this.material,A=t.index,z=t.attributes.position,i=t.attributes.uv,T=t.attributes.uv1,I=t.attributes.normal,n=t.groups,u=t.drawRange;if(A!==null)if(Array.isArray(N))for(let g=0,r=n.length;g<r;g++){const a=n[g],c=N[a.materialIndex],j=Math.max(a.start,u.start),s=Math.min(A.count,Math.min(a.start+a.count,u.start+u.count));for(let L=j,y=s;L<y;L+=3){const x=A.getX(L),O=A.getX(L+1),h=A.getX(L+2);D=eA(this,c,e,Me,i,T,I,x,O,h),D&&(D.faceIndex=Math.floor(L/3),D.face.materialIndex=a.materialIndex,M.push(D))}}else{const g=Math.max(0,u.start),r=Math.min(A.count,u.start+u.count);for(let a=g,c=r;a<c;a+=3){const j=A.getX(a),s=A.getX(a+1),L=A.getX(a+2);D=eA(this,N,e,Me,i,T,I,j,s,L),D&&(D.faceIndex=Math.floor(a/3),M.push(D))}}else if(z!==void 0)if(Array.isArray(N))for(let g=0,r=n.length;g<r;g++){const a=n[g],c=N[a.materialIndex],j=Math.max(a.start,u.start),s=Math.min(z.count,Math.min(a.start+a.count,u.start+u.count));for(let L=j,y=s;L<y;L+=3){const x=L,O=L+1,h=L+2;D=eA(this,c,e,Me,i,T,I,x,O,h),D&&(D.faceIndex=Math.floor(L/3),D.face.materialIndex=a.materialIndex,M.push(D))}}else{const g=Math.max(0,u.start),r=Math.min(z.count,u.start+u.count);for(let a=g,c=r;a<c;a+=3){const j=a,s=a+1,L=a+2;D=eA(this,N,e,Me,i,T,I,j,s,L),D&&(D.faceIndex=Math.floor(a/3),M.push(D))}}}};function $g(e,M,D,t,N,A,z,i){let T;if(M.side===wD?T=t.intersectTriangle(z,A,N,!0,i):T=t.intersectTriangle(N,A,z,M.side===Ze,i),T===null)return null;DA.copy(i),DA.applyMatrix4(e.matrixWorld);const I=D.ray.origin.distanceTo(DA);return I<D.near||I>D.far?null:{distance:I,point:DA.clone(),object:e}}function eA(e,M,D,t,N,A,z,i,T,I){e.getVertexPosition(i,wt),e.getVertexPosition(T,Ot),e.getVertexPosition(I,xt);const n=$g(e,M,D,t,wt,Ot,xt,MA);if(n){N&&(qN.fromBufferAttribute(N,i),JN.fromBufferAttribute(N,T),$N.fromBufferAttribute(N,I),n.uv=GN.getInterpolation(MA,wt,Ot,xt,qN,JN,$N,new jM)),A&&(qN.fromBufferAttribute(A,i),JN.fromBufferAttribute(A,T),$N.fromBufferAttribute(A,I),n.uv1=GN.getInterpolation(MA,wt,Ot,xt,qN,JN,$N,new jM),n.uv2=n.uv1),z&&(UI.fromBufferAttribute(z,i),mI.fromBufferAttribute(z,T),QI.fromBufferAttribute(z,I),n.normal=GN.getInterpolation(MA,wt,Ot,xt,UI,mI,QI,new Y),n.normal.dot(t.direction)>0&&n.normal.multiplyScalar(-1));const u={a:i,b:T,c:I,normal:new Y,materialIndex:0};GN.getNormal(wt,Ot,xt,u.normal),n.face=u}return n}function ln(){let e=null,M=!1,D=null,t=null;function N(A,z){D(A,z),t=e.requestAnimationFrame(N)}return{start:function(){M!==!0&&D!==null&&(t=e.requestAnimationFrame(N),M=!0)},stop:function(){e.cancelAnimationFrame(t),M=!1},setAnimationLoop:function(A){D=A},setContext:function(A){e=A}}}function Mr(e,M){const D=M.isWebGL2,t=new WeakMap;function N(I,n){const u=I.array,g=I.usage,r=e.createBuffer();e.bindBuffer(n,r),e.bufferData(n,u,g),I.onUploadCallback();let a;if(u instanceof Float32Array)a=e.FLOAT;else if(u instanceof Uint16Array)if(I.isFloat16BufferAttribute)if(D)a=e.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else a=e.UNSIGNED_SHORT;else if(u instanceof Int16Array)a=e.SHORT;else if(u instanceof Uint32Array)a=e.UNSIGNED_INT;else if(u instanceof Int32Array)a=e.INT;else if(u instanceof Int8Array)a=e.BYTE;else if(u instanceof Uint8Array)a=e.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)a=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:r,type:a,bytesPerElement:u.BYTES_PER_ELEMENT,version:I.version}}function A(I,n,u){const g=n.array,r=n.updateRange;e.bindBuffer(u,I),r.count===-1?e.bufferSubData(u,0,g):(D?e.bufferSubData(u,r.offset*g.BYTES_PER_ELEMENT,g,r.offset,r.count):e.bufferSubData(u,r.offset*g.BYTES_PER_ELEMENT,g.subarray(r.offset,r.offset+r.count)),r.count=-1),n.onUploadCallback()}function z(I){return I.isInterleavedBufferAttribute&&(I=I.data),t.get(I)}function i(I){I.isInterleavedBufferAttribute&&(I=I.data);const n=t.get(I);n&&(e.deleteBuffer(n.buffer),t.delete(I))}function T(I,n){if(I.isGLBufferAttribute){const g=t.get(I);(!g||g.version<I.version)&&t.set(I,{buffer:I.buffer,type:I.type,bytesPerElement:I.elementSize,version:I.version});return}I.isInterleavedBufferAttribute&&(I=I.data);const u=t.get(I);u===void 0?t.set(I,N(I,n)):u.version<I.version&&(A(u.buffer,I,n),u.version=I.version)}return{get:z,remove:i,update:T}}class YN extends tN{constructor(M=1,D=1,t=1,N=1,A=1,z=1){super(),this.type="BoxGeometry",this.parameters={width:M,height:D,depth:t,widthSegments:N,heightSegments:A,depthSegments:z};const i=this;N=Math.floor(N),A=Math.floor(A),z=Math.floor(z);const T=[],I=[],n=[],u=[];let g=0,r=0;a("z","y","x",-1,-1,t,D,M,z,A,0),a("z","y","x",1,-1,t,D,-M,z,A,1),a("x","z","y",1,1,M,t,D,N,z,2),a("x","z","y",1,-1,M,t,-D,N,z,3),a("x","y","z",1,-1,M,D,t,N,A,4),a("x","y","z",-1,-1,M,D,-t,N,A,5),this.setIndex(T),this.setAttribute("position",new ie(I,3)),this.setAttribute("normal",new ie(n,3)),this.setAttribute("uv",new ie(u,2));function a(c,j,s,L,y,x,O,h,d,G,o){const l=x/d,F=O/G,K=x/2,m=O/2,f=h/2,k=d+1,J=G+1;let V=0,H=0;const X=new Y;for(let $=0;$<J;$++){const gM=$*F-m;for(let zM=0;zM<k;zM++){const S=zM*l-K;X[c]=S*L,X[j]=gM*y,X[s]=f,I.push(X.x,X.y,X.z),X[c]=0,X[j]=0,X[s]=h>0?1:-1,n.push(X.x,X.y,X.z),u.push(zM/d),u.push(1-$/G),V+=1}}for(let $=0;$<G;$++)for(let gM=0;gM<d;gM++){const zM=g+gM+k*$,S=g+gM+k*($+1),W=g+(gM+1)+k*($+1),IM=g+(gM+1)+k*$;T.push(zM,S,IM),T.push(S,W,IM),H+=6}i.addGroup(r,H,o),r+=H,g+=V}}copy(M){return super.copy(M),this.parameters=Object.assign({},M.parameters),this}static fromJSON(M){return new YN(M.width,M.height,M.depth,M.widthSegments,M.heightSegments,M.depthSegments)}}class Oz extends tN{constructor(M=1,D=1,t=1,N=1){super(),this.type="PlaneGeometry",this.parameters={width:M,height:D,widthSegments:t,heightSegments:N};const A=M/2,z=D/2,i=Math.floor(t),T=Math.floor(N),I=i+1,n=T+1,u=M/i,g=D/T,r=[],a=[],c=[],j=[];for(let s=0;s<n;s++){const L=s*g-z;for(let y=0;y<I;y++){const x=y*u-A;a.push(x,-L,0),c.push(0,0,1),j.push(y/i),j.push(1-s/T)}}for(let s=0;s<T;s++)for(let L=0;L<i;L++){const y=L+I*s,x=L+I*(s+1),O=L+1+I*(s+1),h=L+1+I*s;r.push(y,x,h),r.push(x,O,h)}this.setIndex(r),this.setAttribute("position",new ie(a,3)),this.setAttribute("normal",new ie(c,3)),this.setAttribute("uv",new ie(j,2))}copy(M){return super.copy(M),this.parameters=Object.assign({},M.parameters),this}static fromJSON(M){return new Oz(M.width,M.height,M.widthSegments,M.heightSegments)}}function Jt(e){const M={};for(const D in e){M[D]={};for(const t in e[D]){const N=e[D][t];N&&(N.isColor||N.isMatrix3||N.isMatrix4||N.isVector2||N.isVector3||N.isVector4||N.isTexture||N.isQuaternion)?N.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),M[D][t]=null):M[D][t]=N.clone():Array.isArray(N)?M[D][t]=N.slice():M[D][t]=N}}return M}function jD(e){const M={};for(let D=0;D<e.length;D++){const t=Jt(e[D]);for(const N in t)M[N]=t[N]}return M}function Dr(e){const M=[];for(let D=0;D<e.length;D++)M.push(e[D].clone());return M}function hn(e){return e.getRenderTarget()===null?e.outputColorSpace:ze}const er={clone:Jt,merge:jD},tr=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`,Nr=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;class zt extends pN{constructor(M){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tr,this.fragmentShader=Nr,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,M!==void 0&&this.setValues(M)}copy(M){return super.copy(M),this.fragmentShader=M.fragmentShader,this.vertexShader=M.vertexShader,this.uniforms=Jt(M.uniforms),this.uniformsGroups=Dr(M.uniformsGroups),this.defines=Object.assign({},M.defines),this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.fog=M.fog,this.lights=M.lights,this.clipping=M.clipping,this.extensions=Object.assign({},M.extensions),this.glslVersion=M.glslVersion,this}toJSON(M){const D=super.toJSON(M);D.glslVersion=this.glslVersion,D.uniforms={};for(const N in this.uniforms){const A=this.uniforms[N].value;A&&A.isTexture?D.uniforms[N]={type:"t",value:A.toJSON(M).uuid}:A&&A.isColor?D.uniforms[N]={type:"c",value:A.getHex()}:A&&A.isVector2?D.uniforms[N]={type:"v2",value:A.toArray()}:A&&A.isVector3?D.uniforms[N]={type:"v3",value:A.toArray()}:A&&A.isVector4?D.uniforms[N]={type:"v4",value:A.toArray()}:A&&A.isMatrix3?D.uniforms[N]={type:"m3",value:A.toArray()}:A&&A.isMatrix4?D.uniforms[N]={type:"m4",value:A.toArray()}:D.uniforms[N]={value:A}}Object.keys(this.defines).length>0&&(D.defines=this.defines),D.vertexShader=this.vertexShader,D.fragmentShader=this.fragmentShader,D.lights=this.lights,D.clipping=this.clipping;const t={};for(const N in this.extensions)this.extensions[N]===!0&&(t[N]=!0);return Object.keys(t).length>0&&(D.extensions=t),D}}const Ar=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`,ir=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,zr=`
#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

#endif
`,Ir=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`,Tr=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`,nr=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`,ur=`
vec3 transformed = vec3( position );
`,gr=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`,rr=`

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

`,sr=`

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

`,ar=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

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
`,jr=`
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
`,cr=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`,yr=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`,or=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`,Cr=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`,Lr=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`,wr=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	varying vec3 vColor;

#endif
`,Or=`
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
`,xr=`
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
`,Er=`
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
`,lr=`
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
`,hr=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`,vr=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`,dr=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`,pr=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`,Yr=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`,Ur=`

vec4 LinearToLinear( in vec4 value ) {
	return value;
}

vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`,mr=`
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
`,Qr=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`,kr=`
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
`,Sr=`
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
`,fr=`
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
`,Zr=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`,_r=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`,br=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`,Kr=`
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
`,Rr=`

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
`,Pr=`
#ifdef USE_LIGHTMAP

	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

	reflectedLight.indirectDiffuse += lightMapIrradiance;

#endif
`,Fr=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`,Br=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`,Hr=`
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
`,Gr=`
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

	#if defined ( LEGACY_LIGHTS )

		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {

			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );

		}

		return 1.0;

	#else

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

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
`,Vr=`
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
`,Wr=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`,Xr=`
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
`,qr=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`,Jr=`
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
`,$r=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef USE_SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULAR_COLORMAP

			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

		#endif

		#ifdef USE_SPECULAR_INTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

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

		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

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

		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEEN_COLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );

	#ifdef USE_SHEEN_ROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

	#endif

#endif
`,Ms=`

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

#ifdef USE_CLEARCOAT

	// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;

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

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	#ifdef USE_IRIDESCENCE

		F = mix( F, material.iridescenceFresnel, material.iridescence );

	#endif

	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

	float D = D_GGX( alpha, dotNH );

	return F * ( V * D );

}

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

		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );

	#endif

	#ifdef USE_SHEEN

		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );

	#endif

	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );

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
`,Ds=`
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
`,es=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
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
`,ts=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );

#endif
`,Ns=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`,As=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`,is=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`,zs=`
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
`,Is=`
#ifdef USE_MAP

	diffuseColor *= texture2D( map, vMapUv );

#endif
`,Ts=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`,ns=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`,us=`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,gs=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`,rs=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`,ss=`
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
`,as=`
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
`,js=`
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
`,cs=`
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
`,ys=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#ifdef USE_NORMALMAP_TANGENTSPACE

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 geometryNormal = normal;

`,os=`

#ifdef USE_NORMALMAP_OBJECTSPACE

	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`,Cs=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`,Ls=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`,ws=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`,Os=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

		return mat3( T * scale, B * scale, N );

	}

#endif
`,xs=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = geometryNormal;

#endif
`,Es=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`,ls=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif
`,hs=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`,vs=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

// https://github.com/mrdoob/three.js/pull/22425
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`,ds=`
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

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps orthographic depth in [ 0, 1 ] to viewZ
	return depth * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps perspective depth in [ 0, 1 ] to viewZ
	return ( near * far ) / ( ( far - near ) * depth - far );
}
`,ps=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`,Ys=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`,Us=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`,ms=`
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
`,Qs=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`,ks=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`,Ss=`
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
`,fs=`

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
`,Zs=`

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


`,_s=`
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
`,bs=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`,Ks=`
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
`,Rs=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`,Ps=`
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
`,Fs=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`,Bs=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`,Hs=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`,Gs=`
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
`,Vs=`
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

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
`,Ws=`
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

	// Mipped Bicubic Texture Filtering by N8
	// https://www.shadertoy.com/view/Dl2SDW

	float w0( float a ) {

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

	}

	float w1( float a ) {

		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

	}

	float w2( float a ){

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

	}

	float w3( float a ) {

		return ( 1.0 / 6.0 ) * ( a * a * a );

	}

	// g0 and g1 are the two amplitude functions
	float g0( float a ) {

		return w0( a ) + w1( a );

	}

	float g1( float a ) {

		return w2( a ) + w3( a );

	}

	// h0 and h1 are the two offset functions
	float h0( float a ) {

		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

	}

	float h1( float a ) {

		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

	}

	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

		uv = uv * texelSize.zw + 0.5;

		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );

		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );

		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

	}

	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );

	}

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

		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

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
`,Xs=`
#ifdef USE_UV

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

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`,qs=`
#ifdef USE_UV

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`,Js=`
#ifdef USE_UV

	vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`,$s=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`,Ma=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,Da=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`,ea=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,ta=`

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
`,Na=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,Aa=`
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
`,ia=`
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
`,za=`
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
`,Ia=`
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
`,Ta=`
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
`,na=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,ua=`
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
`,ga=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,ra=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
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
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`,sa=`
#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
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
`,aa=`
uniform vec3 diffuse;
uniform float opacity;

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

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
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
`,ja=`
#define LAMBERT

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

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,ca=`
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
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
`,ya=`
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
`,oa=`
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
`,Ca=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

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

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,La=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

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
`,wa=`
#define PHONG

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

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Oa=`
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
`,xa=`
#define STANDARD

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

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`,Ea=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif

	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
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

	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
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
`,la=`
#define TOON

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

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,ha=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
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
`,va=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

void main() {

	#ifdef USE_POINTS_UV

		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	#endif

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
`,da=`
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
`,pa=`
#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
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
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Ya=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`,Ua=`
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
`,ma=`
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
`,hM={alphamap_fragment:Ar,alphamap_pars_fragment:ir,alphatest_fragment:zr,alphatest_pars_fragment:Ir,aomap_fragment:Tr,aomap_pars_fragment:nr,begin_vertex:ur,beginnormal_vertex:gr,bsdfs:rr,iridescence_fragment:sr,bumpmap_pars_fragment:ar,clipping_planes_fragment:jr,clipping_planes_pars_fragment:cr,clipping_planes_pars_vertex:yr,clipping_planes_vertex:or,color_fragment:Cr,color_pars_fragment:Lr,color_pars_vertex:wr,color_vertex:Or,common:xr,cube_uv_reflection_fragment:Er,defaultnormal_vertex:lr,displacementmap_pars_vertex:hr,displacementmap_vertex:vr,emissivemap_fragment:dr,emissivemap_pars_fragment:pr,encodings_fragment:Yr,encodings_pars_fragment:Ur,envmap_fragment:mr,envmap_common_pars_fragment:Qr,envmap_pars_fragment:kr,envmap_pars_vertex:Sr,envmap_physical_pars_fragment:Vr,envmap_vertex:fr,fog_vertex:Zr,fog_pars_vertex:_r,fog_fragment:br,fog_pars_fragment:Kr,gradientmap_pars_fragment:Rr,lightmap_fragment:Pr,lightmap_pars_fragment:Fr,lights_lambert_fragment:Br,lights_lambert_pars_fragment:Hr,lights_pars_begin:Gr,lights_toon_fragment:Wr,lights_toon_pars_fragment:Xr,lights_phong_fragment:qr,lights_phong_pars_fragment:Jr,lights_physical_fragment:$r,lights_physical_pars_fragment:Ms,lights_fragment_begin:Ds,lights_fragment_maps:es,lights_fragment_end:ts,logdepthbuf_fragment:Ns,logdepthbuf_pars_fragment:As,logdepthbuf_pars_vertex:is,logdepthbuf_vertex:zs,map_fragment:Is,map_pars_fragment:Ts,map_particle_fragment:ns,map_particle_pars_fragment:us,metalnessmap_fragment:gs,metalnessmap_pars_fragment:rs,morphcolor_vertex:ss,morphnormal_vertex:as,morphtarget_pars_vertex:js,morphtarget_vertex:cs,normal_fragment_begin:ys,normal_fragment_maps:os,normal_pars_fragment:Cs,normal_pars_vertex:Ls,normal_vertex:ws,normalmap_pars_fragment:Os,clearcoat_normal_fragment_begin:xs,clearcoat_normal_fragment_maps:Es,clearcoat_pars_fragment:ls,iridescence_pars_fragment:hs,output_fragment:vs,packing:ds,premultiplied_alpha_fragment:ps,project_vertex:Ys,dithering_fragment:Us,dithering_pars_fragment:ms,roughnessmap_fragment:Qs,roughnessmap_pars_fragment:ks,shadowmap_pars_fragment:Ss,shadowmap_pars_vertex:fs,shadowmap_vertex:Zs,shadowmask_pars_fragment:_s,skinbase_vertex:bs,skinning_pars_vertex:Ks,skinning_vertex:Rs,skinnormal_vertex:Ps,specularmap_fragment:Fs,specularmap_pars_fragment:Bs,tonemapping_fragment:Hs,tonemapping_pars_fragment:Gs,transmission_fragment:Vs,transmission_pars_fragment:Ws,uv_pars_fragment:Xs,uv_pars_vertex:qs,uv_vertex:Js,worldpos_vertex:$s,background_vert:Ma,background_frag:Da,backgroundCube_vert:ea,backgroundCube_frag:ta,cube_vert:Na,cube_frag:Aa,depth_vert:ia,depth_frag:za,distanceRGBA_vert:Ia,distanceRGBA_frag:Ta,equirect_vert:na,equirect_frag:ua,linedashed_vert:ga,linedashed_frag:ra,meshbasic_vert:sa,meshbasic_frag:aa,meshlambert_vert:ja,meshlambert_frag:ca,meshmatcap_vert:ya,meshmatcap_frag:oa,meshnormal_vert:Ca,meshnormal_frag:La,meshphong_vert:wa,meshphong_frag:Oa,meshphysical_vert:xa,meshphysical_frag:Ea,meshtoon_vert:la,meshtoon_frag:ha,points_vert:va,points_frag:da,shadow_vert:pa,shadow_frag:Ya,sprite_vert:Ua,sprite_frag:ma},tM={common:{diffuse:{value:new bM(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new QM},alphaMap:{value:null},alphaMapTransform:{value:new QM},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new QM}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new QM}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new QM}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new QM},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new QM},normalScale:{value:new jM(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new QM},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new QM}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new QM}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new QM}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new bM(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new bM(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new QM}},sprite:{diffuse:{value:new bM(16777215)},opacity:{value:1},center:{value:new jM(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new QM},alphaMap:{value:null},alphaTest:{value:0}}},ee={basic:{uniforms:jD([tM.common,tM.specularmap,tM.envmap,tM.aomap,tM.lightmap,tM.fog]),vertexShader:hM.meshbasic_vert,fragmentShader:hM.meshbasic_frag},lambert:{uniforms:jD([tM.common,tM.specularmap,tM.envmap,tM.aomap,tM.lightmap,tM.emissivemap,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.fog,tM.lights,{emissive:{value:new bM(0)}}]),vertexShader:hM.meshlambert_vert,fragmentShader:hM.meshlambert_frag},phong:{uniforms:jD([tM.common,tM.specularmap,tM.envmap,tM.aomap,tM.lightmap,tM.emissivemap,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.fog,tM.lights,{emissive:{value:new bM(0)},specular:{value:new bM(1118481)},shininess:{value:30}}]),vertexShader:hM.meshphong_vert,fragmentShader:hM.meshphong_frag},standard:{uniforms:jD([tM.common,tM.envmap,tM.aomap,tM.lightmap,tM.emissivemap,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.roughnessmap,tM.metalnessmap,tM.fog,tM.lights,{emissive:{value:new bM(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:hM.meshphysical_vert,fragmentShader:hM.meshphysical_frag},toon:{uniforms:jD([tM.common,tM.aomap,tM.lightmap,tM.emissivemap,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.gradientmap,tM.fog,tM.lights,{emissive:{value:new bM(0)}}]),vertexShader:hM.meshtoon_vert,fragmentShader:hM.meshtoon_frag},matcap:{uniforms:jD([tM.common,tM.bumpmap,tM.normalmap,tM.displacementmap,tM.fog,{matcap:{value:null}}]),vertexShader:hM.meshmatcap_vert,fragmentShader:hM.meshmatcap_frag},points:{uniforms:jD([tM.points,tM.fog]),vertexShader:hM.points_vert,fragmentShader:hM.points_frag},dashed:{uniforms:jD([tM.common,tM.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:hM.linedashed_vert,fragmentShader:hM.linedashed_frag},depth:{uniforms:jD([tM.common,tM.displacementmap]),vertexShader:hM.depth_vert,fragmentShader:hM.depth_frag},normal:{uniforms:jD([tM.common,tM.bumpmap,tM.normalmap,tM.displacementmap,{opacity:{value:1}}]),vertexShader:hM.meshnormal_vert,fragmentShader:hM.meshnormal_frag},sprite:{uniforms:jD([tM.sprite,tM.fog]),vertexShader:hM.sprite_vert,fragmentShader:hM.sprite_frag},background:{uniforms:{uvTransform:{value:new QM},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:hM.background_vert,fragmentShader:hM.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:hM.backgroundCube_vert,fragmentShader:hM.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:hM.cube_vert,fragmentShader:hM.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:hM.equirect_vert,fragmentShader:hM.equirect_frag},distanceRGBA:{uniforms:jD([tM.common,tM.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:hM.distanceRGBA_vert,fragmentShader:hM.distanceRGBA_frag},shadow:{uniforms:jD([tM.lights,tM.fog,{color:{value:new bM(0)},opacity:{value:1}}]),vertexShader:hM.shadow_vert,fragmentShader:hM.shadow_frag}};ee.physical={uniforms:jD([ee.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new QM},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new QM},clearcoatNormalScale:{value:new jM(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new QM},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new QM},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new QM},sheen:{value:0},sheenColor:{value:new bM(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new QM},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new QM},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new QM},transmissionSamplerSize:{value:new jM},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new QM},attenuationDistance:{value:0},attenuationColor:{value:new bM(0)},specularColor:{value:new bM(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new QM},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new QM}}]),vertexShader:hM.meshphysical_vert,fragmentShader:hM.meshphysical_frag};const tA={r:0,b:0,g:0};function Qa(e,M,D,t,N,A,z){const i=new bM(0);let T=A===!0?0:1,I,n,u=null,g=0,r=null;function a(j,s){let L=!1,y=s.isScene===!0?s.background:null;switch(y&&y.isTexture&&(y=(s.backgroundBlurriness>0?D:M).get(y)),y===null?c(i,T):y&&y.isColor&&(c(y,1),L=!0),e.xr.getEnvironmentBlendMode()){case"opaque":L=!0;break;case"additive":t.buffers.color.setClear(0,0,0,1,z),L=!0;break;case"alpha-blend":t.buffers.color.setClear(0,0,0,0,z),L=!0;break}(e.autoClear||L)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),y&&(y.isCubeTexture||y.mapping===RA)?(n===void 0&&(n=new Ne(new YN(1,1,1),new zt({name:"BackgroundCubeMaterial",uniforms:Jt(ee.backgroundCube.uniforms),vertexShader:ee.backgroundCube.vertexShader,fragmentShader:ee.backgroundCube.fragmentShader,side:wD,depthTest:!1,depthWrite:!1,fog:!1})),n.geometry.deleteAttribute("normal"),n.geometry.deleteAttribute("uv"),n.onBeforeRender=function(x,O,h){this.matrixWorld.copyPosition(h.matrixWorld)},Object.defineProperty(n.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),N.update(n)),n.material.uniforms.envMap.value=y,n.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,n.material.uniforms.backgroundBlurriness.value=s.backgroundBlurriness,n.material.uniforms.backgroundIntensity.value=s.backgroundIntensity,n.material.toneMapped=y.colorSpace!==lM,(u!==y||g!==y.version||r!==e.toneMapping)&&(n.material.needsUpdate=!0,u=y,g=y.version,r=e.toneMapping),n.layers.enableAll(),j.unshift(n,n.geometry,n.material,0,0,null)):y&&y.isTexture&&(I===void 0&&(I=new Ne(new Oz(2,2),new zt({name:"BackgroundMaterial",uniforms:Jt(ee.background.uniforms),vertexShader:ee.background.vertexShader,fragmentShader:ee.background.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1})),I.geometry.deleteAttribute("normal"),Object.defineProperty(I.material,"map",{get:function(){return this.uniforms.t2D.value}}),N.update(I)),I.material.uniforms.t2D.value=y,I.material.uniforms.backgroundIntensity.value=s.backgroundIntensity,I.material.toneMapped=y.colorSpace!==lM,y.matrixAutoUpdate===!0&&y.updateMatrix(),I.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||g!==y.version||r!==e.toneMapping)&&(I.material.needsUpdate=!0,u=y,g=y.version,r=e.toneMapping),I.layers.enableAll(),j.unshift(I,I.geometry,I.material,0,0,null))}function c(j,s){j.getRGB(tA,hn(e)),t.buffers.color.setClear(tA.r,tA.g,tA.b,s,z)}return{getClearColor:function(){return i},setClearColor:function(j,s=1){i.set(j),T=s,c(i,T)},getClearAlpha:function(){return T},setClearAlpha:function(j){T=j,c(i,T)},render:a}}function ka(e,M,D,t){const N=e.getParameter(e.MAX_VERTEX_ATTRIBS),A=t.isWebGL2?null:M.get("OES_vertex_array_object"),z=t.isWebGL2||A!==null,i={},T=j(null);let I=T,n=!1;function u(f,k,J,V,H){let X=!1;if(z){const $=c(V,J,k);I!==$&&(I=$,r(I.object)),X=s(f,V,J,H),X&&L(f,V,J,H)}else{const $=k.wireframe===!0;(I.geometry!==V.id||I.program!==J.id||I.wireframe!==$)&&(I.geometry=V.id,I.program=J.id,I.wireframe=$,X=!0)}H!==null&&D.update(H,e.ELEMENT_ARRAY_BUFFER),(X||n)&&(n=!1,G(f,k,J,V),H!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,D.get(H).buffer))}function g(){return t.isWebGL2?e.createVertexArray():A.createVertexArrayOES()}function r(f){return t.isWebGL2?e.bindVertexArray(f):A.bindVertexArrayOES(f)}function a(f){return t.isWebGL2?e.deleteVertexArray(f):A.deleteVertexArrayOES(f)}function c(f,k,J){const V=J.wireframe===!0;let H=i[f.id];H===void 0&&(H={},i[f.id]=H);let X=H[k.id];X===void 0&&(X={},H[k.id]=X);let $=X[V];return $===void 0&&($=j(g()),X[V]=$),$}function j(f){const k=[],J=[],V=[];for(let H=0;H<N;H++)k[H]=0,J[H]=0,V[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:J,attributeDivisors:V,object:f,attributes:{},index:null}}function s(f,k,J,V){const H=I.attributes,X=k.attributes;let $=0;const gM=J.getAttributes();for(const zM in gM)if(gM[zM].location>=0){const S=H[zM];let W=X[zM];if(W===void 0&&(zM==="instanceMatrix"&&f.instanceMatrix&&(W=f.instanceMatrix),zM==="instanceColor"&&f.instanceColor&&(W=f.instanceColor)),S===void 0||S.attribute!==W||W&&S.data!==W.data)return!0;$++}return I.attributesNum!==$||I.index!==V}function L(f,k,J,V){const H={},X=k.attributes;let $=0;const gM=J.getAttributes();for(const zM in gM)if(gM[zM].location>=0){let S=X[zM];S===void 0&&(zM==="instanceMatrix"&&f.instanceMatrix&&(S=f.instanceMatrix),zM==="instanceColor"&&f.instanceColor&&(S=f.instanceColor));const W={};W.attribute=S,S&&S.data&&(W.data=S.data),H[zM]=W,$++}I.attributes=H,I.attributesNum=$,I.index=V}function y(){const f=I.newAttributes;for(let k=0,J=f.length;k<J;k++)f[k]=0}function x(f){O(f,0)}function O(f,k){const J=I.newAttributes,V=I.enabledAttributes,H=I.attributeDivisors;J[f]=1,V[f]===0&&(e.enableVertexAttribArray(f),V[f]=1),H[f]!==k&&((t.isWebGL2?e:M.get("ANGLE_instanced_arrays"))[t.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](f,k),H[f]=k)}function h(){const f=I.newAttributes,k=I.enabledAttributes;for(let J=0,V=k.length;J<V;J++)k[J]!==f[J]&&(e.disableVertexAttribArray(J),k[J]=0)}function d(f,k,J,V,H,X){t.isWebGL2===!0&&(J===e.INT||J===e.UNSIGNED_INT)?e.vertexAttribIPointer(f,k,J,H,X):e.vertexAttribPointer(f,k,J,V,H,X)}function G(f,k,J,V){if(t.isWebGL2===!1&&(f.isInstancedMesh||V.isInstancedBufferGeometry)&&M.get("ANGLE_instanced_arrays")===null)return;y();const H=V.attributes,X=J.getAttributes(),$=k.defaultAttributeValues;for(const gM in X){const zM=X[gM];if(zM.location>=0){let S=H[gM];if(S===void 0&&(gM==="instanceMatrix"&&f.instanceMatrix&&(S=f.instanceMatrix),gM==="instanceColor"&&f.instanceColor&&(S=f.instanceColor)),S!==void 0){const W=S.normalized,IM=S.itemSize,iM=D.get(S);if(iM===void 0)continue;const p=iM.buffer,EM=iM.type,OM=iM.bytesPerElement;if(S.isInterleavedBufferAttribute){const eM=S.data,CM=eM.stride,SM=S.offset;if(eM.isInstancedInterleavedBuffer){for(let aM=0;aM<zM.locationSize;aM++)O(zM.location+aM,eM.meshPerAttribute);f.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=eM.meshPerAttribute*eM.count)}else for(let aM=0;aM<zM.locationSize;aM++)x(zM.location+aM);e.bindBuffer(e.ARRAY_BUFFER,p);for(let aM=0;aM<zM.locationSize;aM++)d(zM.location+aM,IM/zM.locationSize,EM,W,CM*OM,(SM+IM/zM.locationSize*aM)*OM)}else{if(S.isInstancedBufferAttribute){for(let eM=0;eM<zM.locationSize;eM++)O(zM.location+eM,S.meshPerAttribute);f.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=S.meshPerAttribute*S.count)}else for(let eM=0;eM<zM.locationSize;eM++)x(zM.location+eM);e.bindBuffer(e.ARRAY_BUFFER,p);for(let eM=0;eM<zM.locationSize;eM++)d(zM.location+eM,IM/zM.locationSize,EM,W,IM*OM,IM/zM.locationSize*eM*OM)}}else if($!==void 0){const W=$[gM];if(W!==void 0)switch(W.length){case 2:e.vertexAttrib2fv(zM.location,W);break;case 3:e.vertexAttrib3fv(zM.location,W);break;case 4:e.vertexAttrib4fv(zM.location,W);break;default:e.vertexAttrib1fv(zM.location,W)}}}}h()}function o(){K();for(const f in i){const k=i[f];for(const J in k){const V=k[J];for(const H in V)a(V[H].object),delete V[H];delete k[J]}delete i[f]}}function l(f){if(i[f.id]===void 0)return;const k=i[f.id];for(const J in k){const V=k[J];for(const H in V)a(V[H].object),delete V[H];delete k[J]}delete i[f.id]}function F(f){for(const k in i){const J=i[k];if(J[f.id]===void 0)continue;const V=J[f.id];for(const H in V)a(V[H].object),delete V[H];delete J[f.id]}}function K(){m(),n=!0,I!==T&&(I=T,r(I.object))}function m(){T.geometry=null,T.program=null,T.wireframe=!1}return{setup:u,reset:K,resetDefaultState:m,dispose:o,releaseStatesOfGeometry:l,releaseStatesOfProgram:F,initAttributes:y,enableAttribute:x,disableUnusedAttributes:h}}function Sa(e,M,D,t){const N=t.isWebGL2;let A;function z(I){A=I}function i(I,n){e.drawArrays(A,I,n),D.update(n,A,1)}function T(I,n,u){if(u===0)return;let g,r;if(N)g=e,r="drawArraysInstanced";else if(g=M.get("ANGLE_instanced_arrays"),r="drawArraysInstancedANGLE",g===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[r](A,I,n,u),D.update(n,A,u)}this.setMode=z,this.render=i,this.renderInstances=T}function fa(e,M,D){let t;function N(){if(t!==void 0)return t;if(M.has("EXT_texture_filter_anisotropic")===!0){const d=M.get("EXT_texture_filter_anisotropic");t=e.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else t=0;return t}function A(d){if(d==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const z=typeof WebGL2RenderingContext<"u"&&e.constructor.name==="WebGL2RenderingContext";let i=D.precision!==void 0?D.precision:"highp";const T=A(i);T!==i&&(console.warn("THREE.WebGLRenderer:",i,"not supported, using",T,"instead."),i=T);const I=z||M.has("WEBGL_draw_buffers"),n=D.logarithmicDepthBuffer===!0,u=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),r=e.getParameter(e.MAX_TEXTURE_SIZE),a=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),c=e.getParameter(e.MAX_VERTEX_ATTRIBS),j=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),s=e.getParameter(e.MAX_VARYING_VECTORS),L=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=g>0,x=z||M.has("OES_texture_float"),O=y&&x,h=z?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:z,drawBuffers:I,getMaxAnisotropy:N,getMaxPrecision:A,precision:i,logarithmicDepthBuffer:n,maxTextures:u,maxVertexTextures:g,maxTextureSize:r,maxCubemapSize:a,maxAttributes:c,maxVertexUniforms:j,maxVaryings:s,maxFragmentUniforms:L,vertexTextures:y,floatFragmentTextures:x,floatVertexTextures:O,maxSamples:h}}function Za(e){const M=this;let D=null,t=0,N=!1,A=!1;const z=new We,i=new QM,T={value:null,needsUpdate:!1};this.uniform=T,this.numPlanes=0,this.numIntersection=0,this.init=function(u,g){const r=u.length!==0||g||t!==0||N;return N=g,t=u.length,r},this.beginShadows=function(){A=!0,n(null)},this.endShadows=function(){A=!1},this.setGlobalState=function(u,g){D=n(u,g,0)},this.setState=function(u,g,r){const a=u.clippingPlanes,c=u.clipIntersection,j=u.clipShadows,s=e.get(u);if(!N||a===null||a.length===0||A&&!j)A?n(null):I();else{const L=A?0:t,y=L*4;let x=s.clippingState||null;T.value=x,x=n(a,g,y,r);for(let O=0;O!==y;++O)x[O]=D[O];s.clippingState=x,this.numIntersection=c?this.numPlanes:0,this.numPlanes+=L}};function I(){T.value!==D&&(T.value=D,T.needsUpdate=t>0),M.numPlanes=t,M.numIntersection=0}function n(u,g,r,a){const c=u!==null?u.length:0;let j=null;if(c!==0){if(j=T.value,a!==!0||j===null){const s=r+c*4,L=g.matrixWorldInverse;i.getNormalMatrix(L),(j===null||j.length<s)&&(j=new Float32Array(s));for(let y=0,x=r;y!==c;++y,x+=4)z.copy(u[y]).applyMatrix4(L,i),z.normal.toArray(j,x),j[x+3]=z.constant}T.value=j,T.needsUpdate=!0}return M.numPlanes=c,M.numIntersection=0,j}}class It extends DN{constructor(M=1,D=1,t={}){super(),this.isWebGLRenderTarget=!0,this.width=M,this.height=D,this.depth=1,this.scissor=new ND(0,0,M,D),this.scissorTest=!1,this.viewport=new ND(0,0,M,D);const N={width:M,height:D,depth:1};t.encoding!==void 0&&(cN("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===tt?lM:Nt),this.texture=new JD(N,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.internalFormat=t.internalFormat!==void 0?t.internalFormat:null,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:CD,this.depthBuffer=t.depthBuffer!==void 0?t.depthBuffer:!0,this.stencilBuffer=t.stencilBuffer!==void 0?t.stencilBuffer:!1,this.depthTexture=t.depthTexture!==void 0?t.depthTexture:null,this.samples=t.samples!==void 0?t.samples:0}setSize(M,D,t=1){(this.width!==M||this.height!==D||this.depth!==t)&&(this.width=M,this.height=D,this.depth=t,this.texture.image.width=M,this.texture.image.height=D,this.texture.image.depth=t,this.dispose()),this.viewport.set(0,0,M,D),this.scissor.set(0,0,M,D)}clone(){return new this.constructor().copy(this)}copy(M){this.width=M.width,this.height=M.height,this.depth=M.depth,this.scissor.copy(M.scissor),this.scissorTest=M.scissorTest,this.viewport.copy(M.viewport),this.texture=M.texture.clone(),this.texture.isRenderTargetTexture=!0;const D=Object.assign({},M.texture.image);return this.texture.source=new Cn(D),this.depthBuffer=M.depthBuffer,this.stencilBuffer=M.stencilBuffer,M.depthTexture!==null&&(this.depthTexture=M.depthTexture.clone()),this.samples=M.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Et=-90,lt=1;class _a extends OD{constructor(M,D,t){super(),this.type="CubeCamera",this.renderTarget=t;const N=new ZD(Et,lt,M,D);N.layers=this.layers,N.up.set(0,1,0),N.lookAt(1,0,0),this.add(N);const A=new ZD(Et,lt,M,D);A.layers=this.layers,A.up.set(0,1,0),A.lookAt(-1,0,0),this.add(A);const z=new ZD(Et,lt,M,D);z.layers=this.layers,z.up.set(0,0,-1),z.lookAt(0,1,0),this.add(z);const i=new ZD(Et,lt,M,D);i.layers=this.layers,i.up.set(0,0,1),i.lookAt(0,-1,0),this.add(i);const T=new ZD(Et,lt,M,D);T.layers=this.layers,T.up.set(0,1,0),T.lookAt(0,0,1),this.add(T);const I=new ZD(Et,lt,M,D);I.layers=this.layers,I.up.set(0,1,0),I.lookAt(0,0,-1),this.add(I)}update(M,D){this.parent===null&&this.updateMatrixWorld();const t=this.renderTarget,[N,A,z,i,T,I]=this.children,n=M.getRenderTarget(),u=M.toneMapping,g=M.xr.enabled;M.toneMapping=le,M.xr.enabled=!1;const r=t.texture.generateMipmaps;t.texture.generateMipmaps=!1,M.setRenderTarget(t,0),M.render(D,N),M.setRenderTarget(t,1),M.render(D,A),M.setRenderTarget(t,2),M.render(D,z),M.setRenderTarget(t,3),M.render(D,i),M.setRenderTarget(t,4),M.render(D,T),t.texture.generateMipmaps=r,M.setRenderTarget(t,5),M.render(D,I),M.setRenderTarget(n),M.toneMapping=u,M.xr.enabled=g,t.texture.needsPMREMUpdate=!0}}class vn extends JD{constructor(M,D,t,N,A,z,i,T,I,n){M=M!==void 0?M:[],D=D!==void 0?D:Wt,super(M,D,t,N,A,z,i,T,I,n),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(M){this.image=M}}class ba extends It{constructor(M=1,D={}){super(M,M,D),this.isWebGLCubeRenderTarget=!0;const t={width:M,height:M,depth:1},N=[t,t,t,t,t,t];D.encoding!==void 0&&(cN("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),D.colorSpace=D.encoding===tt?lM:Nt),this.texture=new vn(N,D.mapping,D.wrapS,D.wrapT,D.magFilter,D.minFilter,D.format,D.type,D.anisotropy,D.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=D.generateMipmaps!==void 0?D.generateMipmaps:!1,this.texture.minFilter=D.minFilter!==void 0?D.minFilter:CD}fromEquirectangularTexture(M,D){this.texture.type=D.type,this.texture.colorSpace=D.colorSpace,this.texture.generateMipmaps=D.generateMipmaps,this.texture.minFilter=D.minFilter,this.texture.magFilter=D.magFilter;const t={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},N=new YN(5,5,5),A=new zt({name:"CubemapFromEquirect",uniforms:Jt(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:wD,blending:fe});A.uniforms.tEquirect.value=D;const z=new Ne(N,A),i=D.minFilter;return D.minFilter===LN&&(D.minFilter=CD),new _a(1,10,this).update(M,z),D.minFilter=i,z.geometry.dispose(),z.material.dispose(),this}clear(M,D,t,N){const A=M.getRenderTarget();for(let z=0;z<6;z++)M.setRenderTarget(this,z),M.clear(D,t,N);M.setRenderTarget(A)}}function Ka(e){let M=new WeakMap;function D(z,i){return i===Tz?z.mapping=Wt:i===nz&&(z.mapping=Xt),z}function t(z){if(z&&z.isTexture&&z.isRenderTargetTexture===!1){const i=z.mapping;if(i===Tz||i===nz)if(M.has(z)){const T=M.get(z).texture;return D(T,z.mapping)}else{const T=z.image;if(T&&T.height>0){const I=new ba(T.height/2);return I.fromEquirectangularTexture(e,z),M.set(z,I),z.addEventListener("dispose",N),D(I.texture,z.mapping)}else return null}}return z}function N(z){const i=z.target;i.removeEventListener("dispose",N);const T=M.get(i);T!==void 0&&(M.delete(i),T.dispose())}function A(){M=new WeakMap}return{get:t,dispose:A}}const Rt=4,kI=[.125,.215,.35,.446,.526,.582],Je=20,hi=new jn,SI=new bM;let vi=null;const qe=(1+Math.sqrt(5))/2,ht=1/qe,fI=[new Y(1,1,1),new Y(-1,1,1),new Y(1,1,-1),new Y(-1,1,-1),new Y(0,qe,ht),new Y(0,qe,-ht),new Y(ht,0,qe),new Y(-ht,0,qe),new Y(qe,ht,0),new Y(-qe,ht,0)];class ZI{constructor(M){this._renderer=M,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(M,D=0,t=.1,N=100){vi=this._renderer.getRenderTarget(),this._setSize(256);const A=this._allocateTargets();return A.depthBuffer=!0,this._sceneToCubeUV(M,t,N,A),D>0&&this._blur(A,0,0,D),this._applyPMREM(A),this._cleanup(A),A}fromEquirectangular(M,D=null){return this._fromTexture(M,D)}fromCubemap(M,D=null){return this._fromTexture(M,D)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=KI(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bI(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(M){this._lodMax=Math.floor(Math.log2(M)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let M=0;M<this._lodPlanes.length;M++)this._lodPlanes[M].dispose()}_cleanup(M){this._renderer.setRenderTarget(vi),M.scissorTest=!1,NA(M,0,0,M.width,M.height)}_fromTexture(M,D){M.mapping===Wt||M.mapping===Xt?this._setSize(M.image.length===0?16:M.image[0].width||M.image[0].image.width):this._setSize(M.image.width/4),vi=this._renderer.getRenderTarget();const t=D||this._allocateTargets();return this._textureToCubeUV(M,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const M=3*Math.max(this._cubeSize,112),D=4*this._cubeSize,t={magFilter:CD,minFilter:CD,generateMipmaps:!1,type:wN,format:qD,colorSpace:ze,depthBuffer:!1},N=_I(M,D,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==M||this._pingPongRenderTarget.height!==D){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_I(M,D,t);const{_lodMax:A}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ra(A)),this._blurMaterial=Pa(A,M,D)}return N}_compileMaterial(M){const D=new Ne(this._lodPlanes[0],M);this._renderer.compile(D,hi)}_sceneToCubeUV(M,D,t,N){const A=new ZD(90,1,D,t),z=[1,-1,1,1,1,1],i=[1,1,1,-1,-1,-1],T=this._renderer,I=T.autoClear,n=T.toneMapping;T.getClearColor(SI),T.toneMapping=le,T.autoClear=!1;const u=new wn({name:"PMREM.Background",side:wD,depthWrite:!1,depthTest:!1}),g=new Ne(new YN,u);let r=!1;const a=M.background;a?a.isColor&&(u.color.copy(a),M.background=null,r=!0):(u.color.copy(SI),r=!0);for(let c=0;c<6;c++){const j=c%3;j===0?(A.up.set(0,z[c],0),A.lookAt(i[c],0,0)):j===1?(A.up.set(0,0,z[c]),A.lookAt(0,i[c],0)):(A.up.set(0,z[c],0),A.lookAt(0,0,i[c]));const s=this._cubeSize;NA(N,j*s,c>2?s:0,s,s),T.setRenderTarget(N),r&&T.render(g,A),T.render(M,A)}g.geometry.dispose(),g.material.dispose(),T.toneMapping=n,T.autoClear=I,M.background=a}_textureToCubeUV(M,D){const t=this._renderer,N=M.mapping===Wt||M.mapping===Xt;N?(this._cubemapMaterial===null&&(this._cubemapMaterial=KI()),this._cubemapMaterial.uniforms.flipEnvMap.value=M.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bI());const A=N?this._cubemapMaterial:this._equirectMaterial,z=new Ne(this._lodPlanes[0],A),i=A.uniforms;i.envMap.value=M;const T=this._cubeSize;NA(D,0,0,3*T,2*T),t.setRenderTarget(D),t.render(z,hi)}_applyPMREM(M){const D=this._renderer,t=D.autoClear;D.autoClear=!1;for(let N=1;N<this._lodPlanes.length;N++){const A=Math.sqrt(this._sigmas[N]*this._sigmas[N]-this._sigmas[N-1]*this._sigmas[N-1]),z=fI[(N-1)%fI.length];this._blur(M,N-1,N,A,z)}D.autoClear=t}_blur(M,D,t,N,A){const z=this._pingPongRenderTarget;this._halfBlur(M,z,D,t,N,"latitudinal",A),this._halfBlur(z,M,t,t,N,"longitudinal",A)}_halfBlur(M,D,t,N,A,z,i){const T=this._renderer,I=this._blurMaterial;z!=="latitudinal"&&z!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const n=3,u=new Ne(this._lodPlanes[N],I),g=I.uniforms,r=this._sizeLods[t]-1,a=isFinite(A)?Math.PI/(2*r):2*Math.PI/(2*Je-1),c=A/a,j=isFinite(A)?1+Math.floor(n*c):Je;j>Je&&console.warn(`sigmaRadians, ${A}, is too large and will clip, as it requested ${j} samples when the maximum is set to ${Je}`);const s=[];let L=0;for(let d=0;d<Je;++d){const G=d/c,o=Math.exp(-G*G/2);s.push(o),d===0?L+=o:d<j&&(L+=2*o)}for(let d=0;d<s.length;d++)s[d]=s[d]/L;g.envMap.value=M.texture,g.samples.value=j,g.weights.value=s,g.latitudinal.value=z==="latitudinal",i&&(g.poleAxis.value=i);const{_lodMax:y}=this;g.dTheta.value=a,g.mipInt.value=y-t;const x=this._sizeLods[N],O=3*x*(N>y-Rt?N-y+Rt:0),h=4*(this._cubeSize-x);NA(D,O,h,3*x,2*x),T.setRenderTarget(D),T.render(u,hi)}}function Ra(e){const M=[],D=[],t=[];let N=e;const A=e-Rt+1+kI.length;for(let z=0;z<A;z++){const i=Math.pow(2,N);D.push(i);let T=1/i;z>e-Rt?T=kI[z-e+Rt-1]:z===0&&(T=0),t.push(T);const I=1/(i-2),n=-I,u=1+I,g=[n,n,u,n,u,u,n,n,u,u,n,u],r=6,a=6,c=3,j=2,s=1,L=new Float32Array(c*a*r),y=new Float32Array(j*a*r),x=new Float32Array(s*a*r);for(let h=0;h<r;h++){const d=h%3*2/3-1,G=h>2?0:-1,o=[d,G,0,d+2/3,G,0,d+2/3,G+1,0,d,G,0,d+2/3,G+1,0,d,G+1,0];L.set(o,c*a*h),y.set(g,j*a*h);const l=[h,h,h,h,h,h];x.set(l,s*a*h)}const O=new tN;O.setAttribute("position",new Ae(L,c)),O.setAttribute("uv",new Ae(y,j)),O.setAttribute("faceIndex",new Ae(x,s)),M.push(O),N>Rt&&N--}return{lodPlanes:M,sizeLods:D,sigmas:t}}function _I(e,M,D){const t=new It(e,M,D);return t.texture.mapping=RA,t.texture.name="PMREM.cubeUv",t.scissorTest=!0,t}function NA(e,M,D,t,N){e.viewport.set(M,D,t,N),e.scissor.set(M,D,t,N)}function Pa(e,M,D){const t=new Float32Array(Je),N=new Y(0,1,0);return new zt({name:"SphericalGaussianBlur",defines:{n:Je,CUBEUV_TEXEL_WIDTH:1/M,CUBEUV_TEXEL_HEIGHT:1/D,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:t},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:N}},vertexShader:xz(),fragmentShader:`

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
		`,blending:fe,depthTest:!1,depthWrite:!1})}function bI(){return new zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xz(),fragmentShader:`

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
		`,blending:fe,depthTest:!1,depthWrite:!1})}function KI(){return new zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xz(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fe,depthTest:!1,depthWrite:!1})}function xz(){return`

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
	`}function Fa(e){let M=new WeakMap,D=null;function t(i){if(i&&i.isTexture){const T=i.mapping,I=T===Tz||T===nz,n=T===Wt||T===Xt;if(I||n)if(i.isRenderTargetTexture&&i.needsPMREMUpdate===!0){i.needsPMREMUpdate=!1;let u=M.get(i);return D===null&&(D=new ZI(e)),u=I?D.fromEquirectangular(i,u):D.fromCubemap(i,u),M.set(i,u),u.texture}else{if(M.has(i))return M.get(i).texture;{const u=i.image;if(I&&u&&u.height>0||n&&u&&N(u)){D===null&&(D=new ZI(e));const g=I?D.fromEquirectangular(i):D.fromCubemap(i);return M.set(i,g),i.addEventListener("dispose",A),g.texture}else return null}}}return i}function N(i){let T=0;const I=6;for(let n=0;n<I;n++)i[n]!==void 0&&T++;return T===I}function A(i){const T=i.target;T.removeEventListener("dispose",A);const I=M.get(T);I!==void 0&&(M.delete(T),I.dispose())}function z(){M=new WeakMap,D!==null&&(D.dispose(),D=null)}return{get:t,dispose:z}}function Ba(e){const M={};function D(t){if(M[t]!==void 0)return M[t];let N;switch(t){case"WEBGL_depth_texture":N=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":N=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":N=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":N=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:N=e.getExtension(t)}return M[t]=N,N}return{has:function(t){return D(t)!==null},init:function(t){t.isWebGL2?D("EXT_color_buffer_float"):(D("WEBGL_depth_texture"),D("OES_texture_float"),D("OES_texture_half_float"),D("OES_texture_half_float_linear"),D("OES_standard_derivatives"),D("OES_element_index_uint"),D("OES_vertex_array_object"),D("ANGLE_instanced_arrays")),D("OES_texture_float_linear"),D("EXT_color_buffer_half_float"),D("WEBGL_multisampled_render_to_texture")},get:function(t){const N=D(t);return N===null&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),N}}}function Ha(e,M,D,t){const N={},A=new WeakMap;function z(u){const g=u.target;g.index!==null&&M.remove(g.index);for(const a in g.attributes)M.remove(g.attributes[a]);g.removeEventListener("dispose",z),delete N[g.id];const r=A.get(g);r&&(M.remove(r),A.delete(g)),t.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,D.memory.geometries--}function i(u,g){return N[g.id]===!0||(g.addEventListener("dispose",z),N[g.id]=!0,D.memory.geometries++),g}function T(u){const g=u.attributes;for(const a in g)M.update(g[a],e.ARRAY_BUFFER);const r=u.morphAttributes;for(const a in r){const c=r[a];for(let j=0,s=c.length;j<s;j++)M.update(c[j],e.ARRAY_BUFFER)}}function I(u){const g=[],r=u.index,a=u.attributes.position;let c=0;if(r!==null){const L=r.array;c=r.version;for(let y=0,x=L.length;y<x;y+=3){const O=L[y+0],h=L[y+1],d=L[y+2];g.push(O,h,h,d,d,O)}}else{const L=a.array;c=a.version;for(let y=0,x=L.length/3-1;y<x;y+=3){const O=y+0,h=y+1,d=y+2;g.push(O,h,h,d,d,O)}}const j=new(yn(g)?xn:On)(g,1);j.version=c;const s=A.get(u);s&&M.remove(s),A.set(u,j)}function n(u){const g=A.get(u);if(g){const r=u.index;r!==null&&g.version<r.version&&I(u)}else I(u);return A.get(u)}return{get:i,update:T,getWireframeAttribute:n}}function Ga(e,M,D,t){const N=t.isWebGL2;let A;function z(g){A=g}let i,T;function I(g){i=g.type,T=g.bytesPerElement}function n(g,r){e.drawElements(A,r,i,g*T),D.update(r,A,1)}function u(g,r,a){if(a===0)return;let c,j;if(N)c=e,j="drawElementsInstanced";else if(c=M.get("ANGLE_instanced_arrays"),j="drawElementsInstancedANGLE",c===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}c[j](A,r,i,g*T,a),D.update(r,A,a)}this.setMode=z,this.setIndex=I,this.render=n,this.renderInstances=u}function Va(e){const M={geometries:0,textures:0},D={frame:0,calls:0,triangles:0,points:0,lines:0};function t(A,z,i){switch(D.calls++,z){case e.TRIANGLES:D.triangles+=i*(A/3);break;case e.LINES:D.lines+=i*(A/2);break;case e.LINE_STRIP:D.lines+=i*(A-1);break;case e.LINE_LOOP:D.lines+=i*A;break;case e.POINTS:D.points+=i*A;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",z);break}}function N(){D.frame++,D.calls=0,D.triangles=0,D.points=0,D.lines=0}return{memory:M,render:D,programs:null,autoReset:!0,reset:N,update:t}}class dn extends JD{constructor(M=null,D=1,t=1,N=1){super(null),this.isDataArrayTexture=!0,this.image={data:M,width:D,height:t,depth:N},this.magFilter=cD,this.minFilter=cD,this.wrapR=XD,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}function Wa(e,M){return e[0]-M[0]}function Xa(e,M){return Math.abs(M[1])-Math.abs(e[1])}function qa(e,M,D){const t={},N=new Float32Array(8),A=new WeakMap,z=new ND,i=[];for(let I=0;I<8;I++)i[I]=[I,0];function T(I,n,u){const g=I.morphTargetInfluences;if(M.isWebGL2===!0){const r=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,a=r!==void 0?r.length:0;let c=A.get(n);if(c===void 0||c.count!==a){let L=function(){m.dispose(),A.delete(n),n.removeEventListener("dispose",L)};c!==void 0&&c.texture.dispose();const y=n.morphAttributes.position!==void 0,x=n.morphAttributes.normal!==void 0,O=n.morphAttributes.color!==void 0,h=n.morphAttributes.position||[],d=n.morphAttributes.normal||[],G=n.morphAttributes.color||[];let o=0;y===!0&&(o=1),x===!0&&(o=2),O===!0&&(o=3);let l=n.attributes.position.count*o,F=1;l>M.maxTextureSize&&(F=Math.ceil(l/M.maxTextureSize),l=M.maxTextureSize);const K=new Float32Array(l*F*4*a),m=new dn(K,l,F,a);m.type=Mt,m.needsUpdate=!0;const f=o*4;for(let k=0;k<a;k++){const J=h[k],V=d[k],H=G[k],X=l*F*4*k;for(let $=0;$<J.count;$++){const gM=$*f;y===!0&&(z.fromBufferAttribute(J,$),K[X+gM+0]=z.x,K[X+gM+1]=z.y,K[X+gM+2]=z.z,K[X+gM+3]=0),x===!0&&(z.fromBufferAttribute(V,$),K[X+gM+4]=z.x,K[X+gM+5]=z.y,K[X+gM+6]=z.z,K[X+gM+7]=0),O===!0&&(z.fromBufferAttribute(H,$),K[X+gM+8]=z.x,K[X+gM+9]=z.y,K[X+gM+10]=z.z,K[X+gM+11]=H.itemSize===4?z.w:1)}}c={count:a,texture:m,size:new jM(l,F)},A.set(n,c),n.addEventListener("dispose",L)}let j=0;for(let L=0;L<g.length;L++)j+=g[L];const s=n.morphTargetsRelative?1:1-j;u.getUniforms().setValue(e,"morphTargetBaseInfluence",s),u.getUniforms().setValue(e,"morphTargetInfluences",g),u.getUniforms().setValue(e,"morphTargetsTexture",c.texture,D),u.getUniforms().setValue(e,"morphTargetsTextureSize",c.size)}else{const r=g===void 0?0:g.length;let a=t[n.id];if(a===void 0||a.length!==r){a=[];for(let y=0;y<r;y++)a[y]=[y,0];t[n.id]=a}for(let y=0;y<r;y++){const x=a[y];x[0]=y,x[1]=g[y]}a.sort(Xa);for(let y=0;y<8;y++)y<r&&a[y][1]?(i[y][0]=a[y][0],i[y][1]=a[y][1]):(i[y][0]=Number.MAX_SAFE_INTEGER,i[y][1]=0);i.sort(Wa);const c=n.morphAttributes.position,j=n.morphAttributes.normal;let s=0;for(let y=0;y<8;y++){const x=i[y],O=x[0],h=x[1];O!==Number.MAX_SAFE_INTEGER&&h?(c&&n.getAttribute("morphTarget"+y)!==c[O]&&n.setAttribute("morphTarget"+y,c[O]),j&&n.getAttribute("morphNormal"+y)!==j[O]&&n.setAttribute("morphNormal"+y,j[O]),N[y]=h,s+=h):(c&&n.hasAttribute("morphTarget"+y)===!0&&n.deleteAttribute("morphTarget"+y),j&&n.hasAttribute("morphNormal"+y)===!0&&n.deleteAttribute("morphNormal"+y),N[y]=0)}const L=n.morphTargetsRelative?1:1-s;u.getUniforms().setValue(e,"morphTargetBaseInfluence",L),u.getUniforms().setValue(e,"morphTargetInfluences",N)}}return{update:T}}function Ja(e,M,D,t){let N=new WeakMap;function A(T){const I=t.render.frame,n=T.geometry,u=M.get(T,n);return N.get(u)!==I&&(M.update(u),N.set(u,I)),T.isInstancedMesh&&(T.hasEventListener("dispose",i)===!1&&T.addEventListener("dispose",i),D.update(T.instanceMatrix,e.ARRAY_BUFFER),T.instanceColor!==null&&D.update(T.instanceColor,e.ARRAY_BUFFER)),u}function z(){N=new WeakMap}function i(T){const I=T.target;I.removeEventListener("dispose",i),D.remove(I.instanceMatrix),I.instanceColor!==null&&D.remove(I.instanceColor)}return{update:A,dispose:z}}class $a extends JD{constructor(M=null,D=1,t=1,N=1){super(null),this.isData3DTexture=!0,this.image={data:M,width:D,height:t,depth:N},this.magFilter=cD,this.minFilter=cD,this.wrapR=XD,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const pn=new JD,Yn=new dn,Un=new $a,mn=new vn,RI=[],PI=[],FI=new Float32Array(16),BI=new Float32Array(9),HI=new Float32Array(4);function NN(e,M,D){const t=e[0];if(t<=0||t>0)return e;const N=M*D;let A=RI[N];if(A===void 0&&(A=new Float32Array(N),RI[N]=A),M!==0){t.toArray(A,0);for(let z=1,i=0;z!==M;++z)i+=D,e[z].toArray(A,i)}return A}function JM(e,M){if(e.length!==M.length)return!1;for(let D=0,t=e.length;D<t;D++)if(e[D]!==M[D])return!1;return!0}function $M(e,M){for(let D=0,t=M.length;D<t;D++)e[D]=M[D]}function PA(e,M){let D=PI[M];D===void 0&&(D=new Int32Array(M),PI[M]=D);for(let t=0;t!==M;++t)D[t]=e.allocateTextureUnit();return D}function Mj(e,M){const D=this.cache;D[0]!==M&&(e.uniform1f(this.addr,M),D[0]=M)}function Dj(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y)&&(e.uniform2f(this.addr,M.x,M.y),D[0]=M.x,D[1]=M.y);else{if(JM(D,M))return;e.uniform2fv(this.addr,M),$M(D,M)}}function ej(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z)&&(e.uniform3f(this.addr,M.x,M.y,M.z),D[0]=M.x,D[1]=M.y,D[2]=M.z);else if(M.r!==void 0)(D[0]!==M.r||D[1]!==M.g||D[2]!==M.b)&&(e.uniform3f(this.addr,M.r,M.g,M.b),D[0]=M.r,D[1]=M.g,D[2]=M.b);else{if(JM(D,M))return;e.uniform3fv(this.addr,M),$M(D,M)}}function tj(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z||D[3]!==M.w)&&(e.uniform4f(this.addr,M.x,M.y,M.z,M.w),D[0]=M.x,D[1]=M.y,D[2]=M.z,D[3]=M.w);else{if(JM(D,M))return;e.uniform4fv(this.addr,M),$M(D,M)}}function Nj(e,M){const D=this.cache,t=M.elements;if(t===void 0){if(JM(D,M))return;e.uniformMatrix2fv(this.addr,!1,M),$M(D,M)}else{if(JM(D,t))return;HI.set(t),e.uniformMatrix2fv(this.addr,!1,HI),$M(D,t)}}function Aj(e,M){const D=this.cache,t=M.elements;if(t===void 0){if(JM(D,M))return;e.uniformMatrix3fv(this.addr,!1,M),$M(D,M)}else{if(JM(D,t))return;BI.set(t),e.uniformMatrix3fv(this.addr,!1,BI),$M(D,t)}}function ij(e,M){const D=this.cache,t=M.elements;if(t===void 0){if(JM(D,M))return;e.uniformMatrix4fv(this.addr,!1,M),$M(D,M)}else{if(JM(D,t))return;FI.set(t),e.uniformMatrix4fv(this.addr,!1,FI),$M(D,t)}}function zj(e,M){const D=this.cache;D[0]!==M&&(e.uniform1i(this.addr,M),D[0]=M)}function Ij(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y)&&(e.uniform2i(this.addr,M.x,M.y),D[0]=M.x,D[1]=M.y);else{if(JM(D,M))return;e.uniform2iv(this.addr,M),$M(D,M)}}function Tj(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z)&&(e.uniform3i(this.addr,M.x,M.y,M.z),D[0]=M.x,D[1]=M.y,D[2]=M.z);else{if(JM(D,M))return;e.uniform3iv(this.addr,M),$M(D,M)}}function nj(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z||D[3]!==M.w)&&(e.uniform4i(this.addr,M.x,M.y,M.z,M.w),D[0]=M.x,D[1]=M.y,D[2]=M.z,D[3]=M.w);else{if(JM(D,M))return;e.uniform4iv(this.addr,M),$M(D,M)}}function uj(e,M){const D=this.cache;D[0]!==M&&(e.uniform1ui(this.addr,M),D[0]=M)}function gj(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y)&&(e.uniform2ui(this.addr,M.x,M.y),D[0]=M.x,D[1]=M.y);else{if(JM(D,M))return;e.uniform2uiv(this.addr,M),$M(D,M)}}function rj(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z)&&(e.uniform3ui(this.addr,M.x,M.y,M.z),D[0]=M.x,D[1]=M.y,D[2]=M.z);else{if(JM(D,M))return;e.uniform3uiv(this.addr,M),$M(D,M)}}function sj(e,M){const D=this.cache;if(M.x!==void 0)(D[0]!==M.x||D[1]!==M.y||D[2]!==M.z||D[3]!==M.w)&&(e.uniform4ui(this.addr,M.x,M.y,M.z,M.w),D[0]=M.x,D[1]=M.y,D[2]=M.z,D[3]=M.w);else{if(JM(D,M))return;e.uniform4uiv(this.addr,M),$M(D,M)}}function aj(e,M,D){const t=this.cache,N=D.allocateTextureUnit();t[0]!==N&&(e.uniform1i(this.addr,N),t[0]=N),D.setTexture2D(M||pn,N)}function jj(e,M,D){const t=this.cache,N=D.allocateTextureUnit();t[0]!==N&&(e.uniform1i(this.addr,N),t[0]=N),D.setTexture3D(M||Un,N)}function cj(e,M,D){const t=this.cache,N=D.allocateTextureUnit();t[0]!==N&&(e.uniform1i(this.addr,N),t[0]=N),D.setTextureCube(M||mn,N)}function yj(e,M,D){const t=this.cache,N=D.allocateTextureUnit();t[0]!==N&&(e.uniform1i(this.addr,N),t[0]=N),D.setTexture2DArray(M||Yn,N)}function oj(e){switch(e){case 5126:return Mj;case 35664:return Dj;case 35665:return ej;case 35666:return tj;case 35674:return Nj;case 35675:return Aj;case 35676:return ij;case 5124:case 35670:return zj;case 35667:case 35671:return Ij;case 35668:case 35672:return Tj;case 35669:case 35673:return nj;case 5125:return uj;case 36294:return gj;case 36295:return rj;case 36296:return sj;case 35678:case 36198:case 36298:case 36306:case 35682:return aj;case 35679:case 36299:case 36307:return jj;case 35680:case 36300:case 36308:case 36293:return cj;case 36289:case 36303:case 36311:case 36292:return yj}}function Cj(e,M){e.uniform1fv(this.addr,M)}function Lj(e,M){const D=NN(M,this.size,2);e.uniform2fv(this.addr,D)}function wj(e,M){const D=NN(M,this.size,3);e.uniform3fv(this.addr,D)}function Oj(e,M){const D=NN(M,this.size,4);e.uniform4fv(this.addr,D)}function xj(e,M){const D=NN(M,this.size,4);e.uniformMatrix2fv(this.addr,!1,D)}function Ej(e,M){const D=NN(M,this.size,9);e.uniformMatrix3fv(this.addr,!1,D)}function lj(e,M){const D=NN(M,this.size,16);e.uniformMatrix4fv(this.addr,!1,D)}function hj(e,M){e.uniform1iv(this.addr,M)}function vj(e,M){e.uniform2iv(this.addr,M)}function dj(e,M){e.uniform3iv(this.addr,M)}function pj(e,M){e.uniform4iv(this.addr,M)}function Yj(e,M){e.uniform1uiv(this.addr,M)}function Uj(e,M){e.uniform2uiv(this.addr,M)}function mj(e,M){e.uniform3uiv(this.addr,M)}function Qj(e,M){e.uniform4uiv(this.addr,M)}function kj(e,M,D){const t=this.cache,N=M.length,A=PA(D,N);JM(t,A)||(e.uniform1iv(this.addr,A),$M(t,A));for(let z=0;z!==N;++z)D.setTexture2D(M[z]||pn,A[z])}function Sj(e,M,D){const t=this.cache,N=M.length,A=PA(D,N);JM(t,A)||(e.uniform1iv(this.addr,A),$M(t,A));for(let z=0;z!==N;++z)D.setTexture3D(M[z]||Un,A[z])}function fj(e,M,D){const t=this.cache,N=M.length,A=PA(D,N);JM(t,A)||(e.uniform1iv(this.addr,A),$M(t,A));for(let z=0;z!==N;++z)D.setTextureCube(M[z]||mn,A[z])}function Zj(e,M,D){const t=this.cache,N=M.length,A=PA(D,N);JM(t,A)||(e.uniform1iv(this.addr,A),$M(t,A));for(let z=0;z!==N;++z)D.setTexture2DArray(M[z]||Yn,A[z])}function _j(e){switch(e){case 5126:return Cj;case 35664:return Lj;case 35665:return wj;case 35666:return Oj;case 35674:return xj;case 35675:return Ej;case 35676:return lj;case 5124:case 35670:return hj;case 35667:case 35671:return vj;case 35668:case 35672:return dj;case 35669:case 35673:return pj;case 5125:return Yj;case 36294:return Uj;case 36295:return mj;case 36296:return Qj;case 35678:case 36198:case 36298:case 36306:case 35682:return kj;case 35679:case 36299:case 36307:return Sj;case 35680:case 36300:case 36308:case 36293:return fj;case 36289:case 36303:case 36311:case 36292:return Zj}}class bj{constructor(M,D,t){this.id=M,this.addr=t,this.cache=[],this.setValue=oj(D.type)}}class Kj{constructor(M,D,t){this.id=M,this.addr=t,this.cache=[],this.size=D.size,this.setValue=_j(D.type)}}class Rj{constructor(M){this.id=M,this.seq=[],this.map={}}setValue(M,D,t){const N=this.seq;for(let A=0,z=N.length;A!==z;++A){const i=N[A];i.setValue(M,D[i.id],t)}}}const di=/(\w+)(\])?(\[|\.)?/g;function GI(e,M){e.seq.push(M),e.map[M.id]=M}function Pj(e,M,D){const t=e.name,N=t.length;for(di.lastIndex=0;;){const A=di.exec(t),z=di.lastIndex;let i=A[1];const T=A[2]==="]",I=A[3];if(T&&(i=i|0),I===void 0||I==="["&&z+2===N){GI(D,I===void 0?new bj(i,e,M):new Kj(i,e,M));break}else{let n=D.map[i];n===void 0&&(n=new Rj(i),GI(D,n)),D=n}}}class mA{constructor(M,D){this.seq=[],this.map={};const t=M.getProgramParameter(D,M.ACTIVE_UNIFORMS);for(let N=0;N<t;++N){const A=M.getActiveUniform(D,N),z=M.getUniformLocation(D,A.name);Pj(A,z,this)}}setValue(M,D,t,N){const A=this.map[D];A!==void 0&&A.setValue(M,t,N)}setOptional(M,D,t){const N=D[t];N!==void 0&&this.setValue(M,t,N)}static upload(M,D,t,N){for(let A=0,z=D.length;A!==z;++A){const i=D[A],T=t[i.id];T.needsUpdate!==!1&&i.setValue(M,T.value,N)}}static seqWithValue(M,D){const t=[];for(let N=0,A=M.length;N!==A;++N){const z=M[N];z.id in D&&t.push(z)}return t}}function VI(e,M,D){const t=e.createShader(M);return e.shaderSource(t,D),e.compileShader(t),t}let Fj=0;function Bj(e,M){const D=e.split(`
`),t=[],N=Math.max(M-6,0),A=Math.min(M+6,D.length);for(let z=N;z<A;z++){const i=z+1;t.push(`${i===M?">":" "} ${i}: ${D[z]}`)}return t.join(`
`)}function Hj(e){switch(e){case ze:return["Linear","( value )"];case lM:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",e),["Linear","( value )"]}}function WI(e,M,D){const t=e.getShaderParameter(M,e.COMPILE_STATUS),N=e.getShaderInfoLog(M).trim();if(t&&N==="")return"";const A=/ERROR: 0:(\d+)/.exec(N);if(A){const z=parseInt(A[1]);return D.toUpperCase()+`

`+N+`

`+Bj(e.getShaderSource(M),z)}else return N}function Gj(e,M){const D=Hj(M);return"vec4 "+e+"( vec4 value ) { return LinearTo"+D[0]+D[1]+"; }"}function Vj(e,M){let D;switch(M){case zg:D="Linear";break;case Ig:D="Reinhard";break;case Tg:D="OptimizedCineon";break;case ng:D="ACESFilmic";break;case ug:D="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",M),D="Linear"}return"vec3 "+e+"( vec3 color ) { return "+D+"ToneMapping( color ); }"}function Wj(e){return[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||e.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(sN).join(`
`)}function Xj(e){const M=[];for(const D in e){const t=e[D];t!==!1&&M.push("#define "+D+" "+t)}return M.join(`
`)}function qj(e,M){const D={},t=e.getProgramParameter(M,e.ACTIVE_ATTRIBUTES);for(let N=0;N<t;N++){const A=e.getActiveAttrib(M,N),z=A.name;let i=1;A.type===e.FLOAT_MAT2&&(i=2),A.type===e.FLOAT_MAT3&&(i=3),A.type===e.FLOAT_MAT4&&(i=4),D[z]={type:A.type,location:e.getAttribLocation(M,z),locationSize:i}}return D}function sN(e){return e!==""}function XI(e,M){const D=M.numSpotLightShadows+M.numSpotLightMaps-M.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,M.numDirLights).replace(/NUM_SPOT_LIGHTS/g,M.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,M.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,D).replace(/NUM_RECT_AREA_LIGHTS/g,M.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,M.numPointLights).replace(/NUM_HEMI_LIGHTS/g,M.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,M.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,M.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,M.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,M.numPointLightShadows)}function qI(e,M){return e.replace(/NUM_CLIPPING_PLANES/g,M.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,M.numClippingPlanes-M.numClipIntersection)}const Jj=/^[ \t]*#include +<([\w\d./]+)>/gm;function sz(e){return e.replace(Jj,$j)}function $j(e,M){const D=hM[M];if(D===void 0)throw new Error("Can not resolve #include <"+M+">");return sz(D)}const Mc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function JI(e){return e.replace(Mc,Dc)}function Dc(e,M,D,t){let N="";for(let A=parseInt(M);A<parseInt(D);A++)N+=t.replace(/\[\s*i\s*\]/g,"[ "+A+" ]").replace(/UNROLLED_LOOP_INDEX/g,A);return N}function $I(e){let M="precision "+e.precision+` float;
precision `+e.precision+" int;";return e.precision==="highp"?M+=`
#define HIGH_PRECISION`:e.precision==="mediump"?M+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(M+=`
#define LOW_PRECISION`),M}function ec(e){let M="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===An?M="SHADOWMAP_TYPE_PCF":e.shadowMapType===_u?M="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===we&&(M="SHADOWMAP_TYPE_VSM"),M}function tc(e){let M="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case Wt:case Xt:M="ENVMAP_TYPE_CUBE";break;case RA:M="ENVMAP_TYPE_CUBE_UV";break}return M}function Nc(e){let M="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case Xt:M="ENVMAP_MODE_REFRACTION";break}return M}function Ac(e){let M="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Cz:M="ENVMAP_BLENDING_MULTIPLY";break;case Ag:M="ENVMAP_BLENDING_MIX";break;case ig:M="ENVMAP_BLENDING_ADD";break}return M}function ic(e){const M=e.envMapCubeUVHeight;if(M===null)return null;const D=Math.log2(M)-2,t=1/M;return{texelWidth:1/(3*Math.max(Math.pow(2,D),7*16)),texelHeight:t,maxMip:D}}function zc(e,M,D,t){const N=e.getContext(),A=D.defines;let z=D.vertexShader,i=D.fragmentShader;const T=ec(D),I=tc(D),n=Nc(D),u=Ac(D),g=ic(D),r=D.isWebGL2?"":Wj(D),a=Xj(A),c=N.createProgram();let j,s,L=D.glslVersion?"#version "+D.glslVersion+`
`:"";D.isRawShaderMaterial?(j=[a].filter(sN).join(`
`),j.length>0&&(j+=`
`),s=[r,a].filter(sN).join(`
`),s.length>0&&(s+=`
`)):(j=[$I(D),"#define SHADER_NAME "+D.shaderName,a,D.instancing?"#define USE_INSTANCING":"",D.instancingColor?"#define USE_INSTANCING_COLOR":"",D.useFog&&D.fog?"#define USE_FOG":"",D.useFog&&D.fogExp2?"#define FOG_EXP2":"",D.map?"#define USE_MAP":"",D.envMap?"#define USE_ENVMAP":"",D.envMap?"#define "+n:"",D.lightMap?"#define USE_LIGHTMAP":"",D.aoMap?"#define USE_AOMAP":"",D.bumpMap?"#define USE_BUMPMAP":"",D.normalMap?"#define USE_NORMALMAP":"",D.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",D.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",D.displacementMap?"#define USE_DISPLACEMENTMAP":"",D.emissiveMap?"#define USE_EMISSIVEMAP":"",D.clearcoatMap?"#define USE_CLEARCOATMAP":"",D.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",D.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",D.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",D.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",D.specularMap?"#define USE_SPECULARMAP":"",D.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",D.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",D.roughnessMap?"#define USE_ROUGHNESSMAP":"",D.metalnessMap?"#define USE_METALNESSMAP":"",D.alphaMap?"#define USE_ALPHAMAP":"",D.transmission?"#define USE_TRANSMISSION":"",D.transmissionMap?"#define USE_TRANSMISSIONMAP":"",D.thicknessMap?"#define USE_THICKNESSMAP":"",D.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",D.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",D.mapUv?"#define MAP_UV "+D.mapUv:"",D.alphaMapUv?"#define ALPHAMAP_UV "+D.alphaMapUv:"",D.lightMapUv?"#define LIGHTMAP_UV "+D.lightMapUv:"",D.aoMapUv?"#define AOMAP_UV "+D.aoMapUv:"",D.emissiveMapUv?"#define EMISSIVEMAP_UV "+D.emissiveMapUv:"",D.bumpMapUv?"#define BUMPMAP_UV "+D.bumpMapUv:"",D.normalMapUv?"#define NORMALMAP_UV "+D.normalMapUv:"",D.displacementMapUv?"#define DISPLACEMENTMAP_UV "+D.displacementMapUv:"",D.metalnessMapUv?"#define METALNESSMAP_UV "+D.metalnessMapUv:"",D.roughnessMapUv?"#define ROUGHNESSMAP_UV "+D.roughnessMapUv:"",D.clearcoatMapUv?"#define CLEARCOATMAP_UV "+D.clearcoatMapUv:"",D.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+D.clearcoatNormalMapUv:"",D.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+D.clearcoatRoughnessMapUv:"",D.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+D.iridescenceMapUv:"",D.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+D.iridescenceThicknessMapUv:"",D.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+D.sheenColorMapUv:"",D.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+D.sheenRoughnessMapUv:"",D.specularMapUv?"#define SPECULARMAP_UV "+D.specularMapUv:"",D.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+D.specularColorMapUv:"",D.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+D.specularIntensityMapUv:"",D.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+D.transmissionMapUv:"",D.thicknessMapUv?"#define THICKNESSMAP_UV "+D.thicknessMapUv:"",D.vertexTangents?"#define USE_TANGENT":"",D.vertexColors?"#define USE_COLOR":"",D.vertexAlphas?"#define USE_COLOR_ALPHA":"",D.vertexUv1s?"#define USE_UV1":"",D.vertexUv2s?"#define USE_UV2":"",D.vertexUv3s?"#define USE_UV3":"",D.pointsUvs?"#define USE_POINTS_UV":"",D.flatShading?"#define FLAT_SHADED":"",D.skinning?"#define USE_SKINNING":"",D.morphTargets?"#define USE_MORPHTARGETS":"",D.morphNormals&&D.flatShading===!1?"#define USE_MORPHNORMALS":"",D.morphColors&&D.isWebGL2?"#define USE_MORPHCOLORS":"",D.morphTargetsCount>0&&D.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",D.morphTargetsCount>0&&D.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+D.morphTextureStride:"",D.morphTargetsCount>0&&D.isWebGL2?"#define MORPHTARGETS_COUNT "+D.morphTargetsCount:"",D.doubleSided?"#define DOUBLE_SIDED":"",D.flipSided?"#define FLIP_SIDED":"",D.shadowMapEnabled?"#define USE_SHADOWMAP":"",D.shadowMapEnabled?"#define "+T:"",D.sizeAttenuation?"#define USE_SIZEATTENUATION":"",D.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",D.logarithmicDepthBuffer&&D.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sN).join(`
`),s=[r,$I(D),"#define SHADER_NAME "+D.shaderName,a,D.useFog&&D.fog?"#define USE_FOG":"",D.useFog&&D.fogExp2?"#define FOG_EXP2":"",D.map?"#define USE_MAP":"",D.matcap?"#define USE_MATCAP":"",D.envMap?"#define USE_ENVMAP":"",D.envMap?"#define "+I:"",D.envMap?"#define "+n:"",D.envMap?"#define "+u:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",D.lightMap?"#define USE_LIGHTMAP":"",D.aoMap?"#define USE_AOMAP":"",D.bumpMap?"#define USE_BUMPMAP":"",D.normalMap?"#define USE_NORMALMAP":"",D.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",D.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",D.emissiveMap?"#define USE_EMISSIVEMAP":"",D.clearcoat?"#define USE_CLEARCOAT":"",D.clearcoatMap?"#define USE_CLEARCOATMAP":"",D.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",D.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",D.iridescence?"#define USE_IRIDESCENCE":"",D.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",D.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",D.specularMap?"#define USE_SPECULARMAP":"",D.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",D.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",D.roughnessMap?"#define USE_ROUGHNESSMAP":"",D.metalnessMap?"#define USE_METALNESSMAP":"",D.alphaMap?"#define USE_ALPHAMAP":"",D.alphaTest?"#define USE_ALPHATEST":"",D.sheen?"#define USE_SHEEN":"",D.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",D.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",D.transmission?"#define USE_TRANSMISSION":"",D.transmissionMap?"#define USE_TRANSMISSIONMAP":"",D.thicknessMap?"#define USE_THICKNESSMAP":"",D.vertexTangents?"#define USE_TANGENT":"",D.vertexColors||D.instancingColor?"#define USE_COLOR":"",D.vertexAlphas?"#define USE_COLOR_ALPHA":"",D.vertexUv1s?"#define USE_UV1":"",D.vertexUv2s?"#define USE_UV2":"",D.vertexUv3s?"#define USE_UV3":"",D.pointsUvs?"#define USE_POINTS_UV":"",D.gradientMap?"#define USE_GRADIENTMAP":"",D.flatShading?"#define FLAT_SHADED":"",D.doubleSided?"#define DOUBLE_SIDED":"",D.flipSided?"#define FLIP_SIDED":"",D.shadowMapEnabled?"#define USE_SHADOWMAP":"",D.shadowMapEnabled?"#define "+T:"",D.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",D.useLegacyLights?"#define LEGACY_LIGHTS":"",D.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",D.logarithmicDepthBuffer&&D.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",D.toneMapping!==le?"#define TONE_MAPPING":"",D.toneMapping!==le?hM.tonemapping_pars_fragment:"",D.toneMapping!==le?Vj("toneMapping",D.toneMapping):"",D.dithering?"#define DITHERING":"",D.opaque?"#define OPAQUE":"",hM.encodings_pars_fragment,Gj("linearToOutputTexel",D.outputColorSpace),D.useDepthPacking?"#define DEPTH_PACKING "+D.depthPacking:"",`
`].filter(sN).join(`
`)),z=sz(z),z=XI(z,D),z=qI(z,D),i=sz(i),i=XI(i,D),i=qI(i,D),z=JI(z),i=JI(i),D.isWebGL2&&D.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,j=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+j,s=["#define varying in",D.glslVersion===xI?"":"layout(location = 0) out highp vec4 pc_fragColor;",D.glslVersion===xI?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+s);const y=L+j+z,x=L+s+i,O=VI(N,N.VERTEX_SHADER,y),h=VI(N,N.FRAGMENT_SHADER,x);if(N.attachShader(c,O),N.attachShader(c,h),D.index0AttributeName!==void 0?N.bindAttribLocation(c,0,D.index0AttributeName):D.morphTargets===!0&&N.bindAttribLocation(c,0,"position"),N.linkProgram(c),e.debug.checkShaderErrors){const o=N.getProgramInfoLog(c).trim(),l=N.getShaderInfoLog(O).trim(),F=N.getShaderInfoLog(h).trim();let K=!0,m=!0;if(N.getProgramParameter(c,N.LINK_STATUS)===!1)if(K=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(N,c,O,h);else{const f=WI(N,O,"vertex"),k=WI(N,h,"fragment");console.error("THREE.WebGLProgram: Shader Error "+N.getError()+" - VALIDATE_STATUS "+N.getProgramParameter(c,N.VALIDATE_STATUS)+`

Program Info Log: `+o+`
`+f+`
`+k)}else o!==""?console.warn("THREE.WebGLProgram: Program Info Log:",o):(l===""||F==="")&&(m=!1);m&&(this.diagnostics={runnable:K,programLog:o,vertexShader:{log:l,prefix:j},fragmentShader:{log:F,prefix:s}})}N.deleteShader(O),N.deleteShader(h);let d;this.getUniforms=function(){return d===void 0&&(d=new mA(N,c)),d};let G;return this.getAttributes=function(){return G===void 0&&(G=qj(N,c)),G},this.destroy=function(){t.releaseStatesOfProgram(this),N.deleteProgram(c),this.program=void 0},this.name=D.shaderName,this.id=Fj++,this.cacheKey=M,this.usedTimes=1,this.program=c,this.vertexShader=O,this.fragmentShader=h,this}let Ic=0;class Tc{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(M){const D=M.vertexShader,t=M.fragmentShader,N=this._getShaderStage(D),A=this._getShaderStage(t),z=this._getShaderCacheForMaterial(M);return z.has(N)===!1&&(z.add(N),N.usedTimes++),z.has(A)===!1&&(z.add(A),A.usedTimes++),this}remove(M){const D=this.materialCache.get(M);for(const t of D)t.usedTimes--,t.usedTimes===0&&this.shaderCache.delete(t.code);return this.materialCache.delete(M),this}getVertexShaderID(M){return this._getShaderStage(M.vertexShader).id}getFragmentShaderID(M){return this._getShaderStage(M.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(M){const D=this.materialCache;let t=D.get(M);return t===void 0&&(t=new Set,D.set(M,t)),t}_getShaderStage(M){const D=this.shaderCache;let t=D.get(M);return t===void 0&&(t=new nc(M),D.set(M,t)),t}}class nc{constructor(M){this.id=Ic++,this.code=M,this.usedTimes=0}}function uc(e,M,D,t,N,A,z){const i=new en,T=new Tc,I=[],n=N.isWebGL2,u=N.logarithmicDepthBuffer,g=N.vertexTextures;let r=N.precision;const a={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function c(o){return o===1?"uv1":o===2?"uv2":o===3?"uv3":"uv"}function j(o,l,F,K,m){const f=K.fog,k=m.geometry,J=o.isMeshStandardMaterial?K.environment:null,V=(o.isMeshStandardMaterial?D:M).get(o.envMap||J),H=V&&V.mapping===RA?V.image.height:null,X=a[o.type];o.precision!==null&&(r=N.getMaxPrecision(o.precision),r!==o.precision&&console.warn("THREE.WebGLProgram.getParameters:",o.precision,"not supported, using",r,"instead."));const $=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,gM=$!==void 0?$.length:0;let zM=0;k.morphAttributes.position!==void 0&&(zM=1),k.morphAttributes.normal!==void 0&&(zM=2),k.morphAttributes.color!==void 0&&(zM=3);let S,W,IM,iM;if(X){const yM=ee[X];S=yM.vertexShader,W=yM.fragmentShader}else S=o.vertexShader,W=o.fragmentShader,T.update(o),IM=T.getVertexShaderID(o),iM=T.getFragmentShaderID(o);const p=e.getRenderTarget(),EM=m.isInstancedMesh===!0,OM=!!o.map,eM=!!o.matcap,CM=!!V,SM=!!o.aoMap,aM=!!o.lightMap,dM=!!o.bumpMap,MD=!!o.normalMap,AD=!!o.displacementMap,DD=!!o.emissiveMap,qM=!!o.metalnessMap,fM=!!o.roughnessMap,FM=o.clearcoat>0,oD=o.iridescence>0,E=o.sheen>0,C=o.transmission>0,Z=FM&&!!o.clearcoatMap,MM=FM&&!!o.clearcoatNormalMap,DM=FM&&!!o.clearcoatRoughnessMap,NM=oD&&!!o.iridescenceMap,LM=oD&&!!o.iridescenceThicknessMap,nM=E&&!!o.sheenColorMap,B=E&&!!o.sheenRoughnessMap,sM=!!o.specularMap,cM=!!o.specularColorMap,oM=!!o.specularIntensityMap,TM=C&&!!o.transmissionMap,rM=C&&!!o.thicknessMap,UM=!!o.gradientMap,ZM=!!o.alphaMap,BM=o.alphaTest>0,v=!!o.extensions,_=!!k.attributes.uv1,q=!!k.attributes.uv2,AM=!!k.attributes.uv3;return{isWebGL2:n,shaderID:X,shaderName:o.type,vertexShader:S,fragmentShader:W,defines:o.defines,customVertexShaderID:IM,customFragmentShaderID:iM,isRawShaderMaterial:o.isRawShaderMaterial===!0,glslVersion:o.glslVersion,precision:r,instancing:EM,instancingColor:EM&&m.instanceColor!==null,supportsVertexTextures:g,outputColorSpace:p===null?e.outputColorSpace:p.isXRRenderTarget===!0?p.texture.colorSpace:ze,map:OM,matcap:eM,envMap:CM,envMapMode:CM&&V.mapping,envMapCubeUVHeight:H,aoMap:SM,lightMap:aM,bumpMap:dM,normalMap:MD,displacementMap:g&&AD,emissiveMap:DD,normalMapObjectSpace:MD&&o.normalMapType===pg,normalMapTangentSpace:MD&&o.normalMapType===gn,metalnessMap:qM,roughnessMap:fM,clearcoat:FM,clearcoatMap:Z,clearcoatNormalMap:MM,clearcoatRoughnessMap:DM,iridescence:oD,iridescenceMap:NM,iridescenceThicknessMap:LM,sheen:E,sheenColorMap:nM,sheenRoughnessMap:B,specularMap:sM,specularColorMap:cM,specularIntensityMap:oM,transmission:C,transmissionMap:TM,thicknessMap:rM,gradientMap:UM,opaque:o.transparent===!1&&o.blending===Ft,alphaMap:ZM,alphaTest:BM,combine:o.combine,mapUv:OM&&c(o.map.channel),aoMapUv:SM&&c(o.aoMap.channel),lightMapUv:aM&&c(o.lightMap.channel),bumpMapUv:dM&&c(o.bumpMap.channel),normalMapUv:MD&&c(o.normalMap.channel),displacementMapUv:AD&&c(o.displacementMap.channel),emissiveMapUv:DD&&c(o.emissiveMap.channel),metalnessMapUv:qM&&c(o.metalnessMap.channel),roughnessMapUv:fM&&c(o.roughnessMap.channel),clearcoatMapUv:Z&&c(o.clearcoatMap.channel),clearcoatNormalMapUv:MM&&c(o.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:DM&&c(o.clearcoatRoughnessMap.channel),iridescenceMapUv:NM&&c(o.iridescenceMap.channel),iridescenceThicknessMapUv:LM&&c(o.iridescenceThicknessMap.channel),sheenColorMapUv:nM&&c(o.sheenColorMap.channel),sheenRoughnessMapUv:B&&c(o.sheenRoughnessMap.channel),specularMapUv:sM&&c(o.specularMap.channel),specularColorMapUv:cM&&c(o.specularColorMap.channel),specularIntensityMapUv:oM&&c(o.specularIntensityMap.channel),transmissionMapUv:TM&&c(o.transmissionMap.channel),thicknessMapUv:rM&&c(o.thicknessMap.channel),alphaMapUv:ZM&&c(o.alphaMap.channel),vertexTangents:MD&&!!k.attributes.tangent,vertexColors:o.vertexColors,vertexAlphas:o.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:_,vertexUv2s:q,vertexUv3s:AM,pointsUvs:m.isPoints===!0&&!!k.attributes.uv&&(OM||ZM),fog:!!f,useFog:o.fog===!0,fogExp2:f&&f.isFogExp2,flatShading:o.flatShading===!0,sizeAttenuation:o.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:m.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:gM,morphTextureStride:zM,numDirLights:l.directional.length,numPointLights:l.point.length,numSpotLights:l.spot.length,numSpotLightMaps:l.spotLightMap.length,numRectAreaLights:l.rectArea.length,numHemiLights:l.hemi.length,numDirLightShadows:l.directionalShadowMap.length,numPointLightShadows:l.pointShadowMap.length,numSpotLightShadows:l.spotShadowMap.length,numSpotLightShadowsWithMaps:l.numSpotLightShadowsWithMaps,numClippingPlanes:z.numPlanes,numClipIntersection:z.numIntersection,dithering:o.dithering,shadowMapEnabled:e.shadowMap.enabled&&F.length>0,shadowMapType:e.shadowMap.type,toneMapping:o.toneMapped?e.toneMapping:le,useLegacyLights:e.useLegacyLights,premultipliedAlpha:o.premultipliedAlpha,doubleSided:o.side===xe,flipSided:o.side===wD,useDepthPacking:o.depthPacking>=0,depthPacking:o.depthPacking||0,index0AttributeName:o.index0AttributeName,extensionDerivatives:v&&o.extensions.derivatives===!0,extensionFragDepth:v&&o.extensions.fragDepth===!0,extensionDrawBuffers:v&&o.extensions.drawBuffers===!0,extensionShaderTextureLOD:v&&o.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:n||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:n||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:n||t.has("EXT_shader_texture_lod"),customProgramCacheKey:o.customProgramCacheKey()}}function s(o){const l=[];if(o.shaderID?l.push(o.shaderID):(l.push(o.customVertexShaderID),l.push(o.customFragmentShaderID)),o.defines!==void 0)for(const F in o.defines)l.push(F),l.push(o.defines[F]);return o.isRawShaderMaterial===!1&&(L(l,o),y(l,o),l.push(e.outputColorSpace)),l.push(o.customProgramCacheKey),l.join()}function L(o,l){o.push(l.precision),o.push(l.outputColorSpace),o.push(l.envMapMode),o.push(l.envMapCubeUVHeight),o.push(l.mapUv),o.push(l.alphaMapUv),o.push(l.lightMapUv),o.push(l.aoMapUv),o.push(l.bumpMapUv),o.push(l.normalMapUv),o.push(l.displacementMapUv),o.push(l.emissiveMapUv),o.push(l.metalnessMapUv),o.push(l.roughnessMapUv),o.push(l.clearcoatMapUv),o.push(l.clearcoatNormalMapUv),o.push(l.clearcoatRoughnessMapUv),o.push(l.iridescenceMapUv),o.push(l.iridescenceThicknessMapUv),o.push(l.sheenColorMapUv),o.push(l.sheenRoughnessMapUv),o.push(l.specularMapUv),o.push(l.specularColorMapUv),o.push(l.specularIntensityMapUv),o.push(l.transmissionMapUv),o.push(l.thicknessMapUv),o.push(l.combine),o.push(l.fogExp2),o.push(l.sizeAttenuation),o.push(l.morphTargetsCount),o.push(l.morphAttributeCount),o.push(l.numDirLights),o.push(l.numPointLights),o.push(l.numSpotLights),o.push(l.numSpotLightMaps),o.push(l.numHemiLights),o.push(l.numRectAreaLights),o.push(l.numDirLightShadows),o.push(l.numPointLightShadows),o.push(l.numSpotLightShadows),o.push(l.numSpotLightShadowsWithMaps),o.push(l.shadowMapType),o.push(l.toneMapping),o.push(l.numClippingPlanes),o.push(l.numClipIntersection),o.push(l.depthPacking)}function y(o,l){i.disableAll(),l.isWebGL2&&i.enable(0),l.supportsVertexTextures&&i.enable(1),l.instancing&&i.enable(2),l.instancingColor&&i.enable(3),l.matcap&&i.enable(4),l.envMap&&i.enable(5),l.normalMapObjectSpace&&i.enable(6),l.normalMapTangentSpace&&i.enable(7),l.clearcoat&&i.enable(8),l.iridescence&&i.enable(9),l.alphaTest&&i.enable(10),l.vertexColors&&i.enable(11),l.vertexAlphas&&i.enable(12),l.vertexUv1s&&i.enable(13),l.vertexUv2s&&i.enable(14),l.vertexUv3s&&i.enable(15),l.vertexTangents&&i.enable(16),o.push(i.mask),i.disableAll(),l.fog&&i.enable(0),l.useFog&&i.enable(1),l.flatShading&&i.enable(2),l.logarithmicDepthBuffer&&i.enable(3),l.skinning&&i.enable(4),l.morphTargets&&i.enable(5),l.morphNormals&&i.enable(6),l.morphColors&&i.enable(7),l.premultipliedAlpha&&i.enable(8),l.shadowMapEnabled&&i.enable(9),l.useLegacyLights&&i.enable(10),l.doubleSided&&i.enable(11),l.flipSided&&i.enable(12),l.useDepthPacking&&i.enable(13),l.dithering&&i.enable(14),l.transmission&&i.enable(15),l.sheen&&i.enable(16),l.opaque&&i.enable(17),l.pointsUvs&&i.enable(18),o.push(i.mask)}function x(o){const l=a[o.type];let F;if(l){const K=ee[l];F=er.clone(K.uniforms)}else F=o.uniforms;return F}function O(o,l){let F;for(let K=0,m=I.length;K<m;K++){const f=I[K];if(f.cacheKey===l){F=f,++F.usedTimes;break}}return F===void 0&&(F=new zc(e,l,o,A),I.push(F)),F}function h(o){if(--o.usedTimes===0){const l=I.indexOf(o);I[l]=I[I.length-1],I.pop(),o.destroy()}}function d(o){T.remove(o)}function G(){T.dispose()}return{getParameters:j,getProgramCacheKey:s,getUniforms:x,acquireProgram:O,releaseProgram:h,releaseShaderCache:d,programs:I,dispose:G}}function gc(){let e=new WeakMap;function M(A){let z=e.get(A);return z===void 0&&(z={},e.set(A,z)),z}function D(A){e.delete(A)}function t(A,z,i){e.get(A)[z]=i}function N(){e=new WeakMap}return{get:M,remove:D,update:t,dispose:N}}function rc(e,M){return e.groupOrder!==M.groupOrder?e.groupOrder-M.groupOrder:e.renderOrder!==M.renderOrder?e.renderOrder-M.renderOrder:e.material.id!==M.material.id?e.material.id-M.material.id:e.z!==M.z?e.z-M.z:e.id-M.id}function MT(e,M){return e.groupOrder!==M.groupOrder?e.groupOrder-M.groupOrder:e.renderOrder!==M.renderOrder?e.renderOrder-M.renderOrder:e.z!==M.z?M.z-e.z:e.id-M.id}function DT(){const e=[];let M=0;const D=[],t=[],N=[];function A(){M=0,D.length=0,t.length=0,N.length=0}function z(u,g,r,a,c,j){let s=e[M];return s===void 0?(s={id:u.id,object:u,geometry:g,material:r,groupOrder:a,renderOrder:u.renderOrder,z:c,group:j},e[M]=s):(s.id=u.id,s.object=u,s.geometry=g,s.material=r,s.groupOrder=a,s.renderOrder=u.renderOrder,s.z=c,s.group=j),M++,s}function i(u,g,r,a,c,j){const s=z(u,g,r,a,c,j);r.transmission>0?t.push(s):r.transparent===!0?N.push(s):D.push(s)}function T(u,g,r,a,c,j){const s=z(u,g,r,a,c,j);r.transmission>0?t.unshift(s):r.transparent===!0?N.unshift(s):D.unshift(s)}function I(u,g){D.length>1&&D.sort(u||rc),t.length>1&&t.sort(g||MT),N.length>1&&N.sort(g||MT)}function n(){for(let u=M,g=e.length;u<g;u++){const r=e[u];if(r.id===null)break;r.id=null,r.object=null,r.geometry=null,r.material=null,r.group=null}}return{opaque:D,transmissive:t,transparent:N,init:A,push:i,unshift:T,finish:n,sort:I}}function sc(){let e=new WeakMap;function M(t,N){const A=e.get(t);let z;return A===void 0?(z=new DT,e.set(t,[z])):N>=A.length?(z=new DT,A.push(z)):z=A[N],z}function D(){e=new WeakMap}return{get:M,dispose:D}}function ac(){const e={};return{get:function(M){if(e[M.id]!==void 0)return e[M.id];let D;switch(M.type){case"DirectionalLight":D={direction:new Y,color:new bM};break;case"SpotLight":D={position:new Y,direction:new Y,color:new bM,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":D={position:new Y,color:new bM,distance:0,decay:0};break;case"HemisphereLight":D={direction:new Y,skyColor:new bM,groundColor:new bM};break;case"RectAreaLight":D={color:new bM,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return e[M.id]=D,D}}}function jc(){const e={};return{get:function(M){if(e[M.id]!==void 0)return e[M.id];let D;switch(M.type){case"DirectionalLight":D={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jM};break;case"SpotLight":D={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jM};break;case"PointLight":D={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jM,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[M.id]=D,D}}}let cc=0;function yc(e,M){return(M.castShadow?2:0)-(e.castShadow?2:0)+(M.map?1:0)-(e.map?1:0)}function oc(e,M){const D=new ac,t=jc(),N={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let n=0;n<9;n++)N.probe.push(new Y);const A=new Y,z=new iD,i=new iD;function T(n,u){let g=0,r=0,a=0;for(let F=0;F<9;F++)N.probe[F].set(0,0,0);let c=0,j=0,s=0,L=0,y=0,x=0,O=0,h=0,d=0,G=0;n.sort(yc);const o=u===!0?Math.PI:1;for(let F=0,K=n.length;F<K;F++){const m=n[F],f=m.color,k=m.intensity,J=m.distance,V=m.shadow&&m.shadow.map?m.shadow.map.texture:null;if(m.isAmbientLight)g+=f.r*k*o,r+=f.g*k*o,a+=f.b*k*o;else if(m.isLightProbe)for(let H=0;H<9;H++)N.probe[H].addScaledVector(m.sh.coefficients[H],k);else if(m.isDirectionalLight){const H=D.get(m);if(H.color.copy(m.color).multiplyScalar(m.intensity*o),m.castShadow){const X=m.shadow,$=t.get(m);$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,N.directionalShadow[c]=$,N.directionalShadowMap[c]=V,N.directionalShadowMatrix[c]=m.shadow.matrix,x++}N.directional[c]=H,c++}else if(m.isSpotLight){const H=D.get(m);H.position.setFromMatrixPosition(m.matrixWorld),H.color.copy(f).multiplyScalar(k*o),H.distance=J,H.coneCos=Math.cos(m.angle),H.penumbraCos=Math.cos(m.angle*(1-m.penumbra)),H.decay=m.decay,N.spot[s]=H;const X=m.shadow;if(m.map&&(N.spotLightMap[d]=m.map,d++,X.updateMatrices(m),m.castShadow&&G++),N.spotLightMatrix[s]=X.matrix,m.castShadow){const $=t.get(m);$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,N.spotShadow[s]=$,N.spotShadowMap[s]=V,h++}s++}else if(m.isRectAreaLight){const H=D.get(m);H.color.copy(f).multiplyScalar(k),H.halfWidth.set(m.width*.5,0,0),H.halfHeight.set(0,m.height*.5,0),N.rectArea[L]=H,L++}else if(m.isPointLight){const H=D.get(m);if(H.color.copy(m.color).multiplyScalar(m.intensity*o),H.distance=m.distance,H.decay=m.decay,m.castShadow){const X=m.shadow,$=t.get(m);$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,$.shadowCameraNear=X.camera.near,$.shadowCameraFar=X.camera.far,N.pointShadow[j]=$,N.pointShadowMap[j]=V,N.pointShadowMatrix[j]=m.shadow.matrix,O++}N.point[j]=H,j++}else if(m.isHemisphereLight){const H=D.get(m);H.skyColor.copy(m.color).multiplyScalar(k*o),H.groundColor.copy(m.groundColor).multiplyScalar(k*o),N.hemi[y]=H,y++}}L>0&&(M.isWebGL2||e.has("OES_texture_float_linear")===!0?(N.rectAreaLTC1=tM.LTC_FLOAT_1,N.rectAreaLTC2=tM.LTC_FLOAT_2):e.has("OES_texture_half_float_linear")===!0?(N.rectAreaLTC1=tM.LTC_HALF_1,N.rectAreaLTC2=tM.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),N.ambient[0]=g,N.ambient[1]=r,N.ambient[2]=a;const l=N.hash;(l.directionalLength!==c||l.pointLength!==j||l.spotLength!==s||l.rectAreaLength!==L||l.hemiLength!==y||l.numDirectionalShadows!==x||l.numPointShadows!==O||l.numSpotShadows!==h||l.numSpotMaps!==d)&&(N.directional.length=c,N.spot.length=s,N.rectArea.length=L,N.point.length=j,N.hemi.length=y,N.directionalShadow.length=x,N.directionalShadowMap.length=x,N.pointShadow.length=O,N.pointShadowMap.length=O,N.spotShadow.length=h,N.spotShadowMap.length=h,N.directionalShadowMatrix.length=x,N.pointShadowMatrix.length=O,N.spotLightMatrix.length=h+d-G,N.spotLightMap.length=d,N.numSpotLightShadowsWithMaps=G,l.directionalLength=c,l.pointLength=j,l.spotLength=s,l.rectAreaLength=L,l.hemiLength=y,l.numDirectionalShadows=x,l.numPointShadows=O,l.numSpotShadows=h,l.numSpotMaps=d,N.version=cc++)}function I(n,u){let g=0,r=0,a=0,c=0,j=0;const s=u.matrixWorldInverse;for(let L=0,y=n.length;L<y;L++){const x=n[L];if(x.isDirectionalLight){const O=N.directional[g];O.direction.setFromMatrixPosition(x.matrixWorld),A.setFromMatrixPosition(x.target.matrixWorld),O.direction.sub(A),O.direction.transformDirection(s),g++}else if(x.isSpotLight){const O=N.spot[a];O.position.setFromMatrixPosition(x.matrixWorld),O.position.applyMatrix4(s),O.direction.setFromMatrixPosition(x.matrixWorld),A.setFromMatrixPosition(x.target.matrixWorld),O.direction.sub(A),O.direction.transformDirection(s),a++}else if(x.isRectAreaLight){const O=N.rectArea[c];O.position.setFromMatrixPosition(x.matrixWorld),O.position.applyMatrix4(s),i.identity(),z.copy(x.matrixWorld),z.premultiply(s),i.extractRotation(z),O.halfWidth.set(x.width*.5,0,0),O.halfHeight.set(0,x.height*.5,0),O.halfWidth.applyMatrix4(i),O.halfHeight.applyMatrix4(i),c++}else if(x.isPointLight){const O=N.point[r];O.position.setFromMatrixPosition(x.matrixWorld),O.position.applyMatrix4(s),r++}else if(x.isHemisphereLight){const O=N.hemi[j];O.direction.setFromMatrixPosition(x.matrixWorld),O.direction.transformDirection(s),j++}}}return{setup:T,setupView:I,state:N}}function eT(e,M){const D=new oc(e,M),t=[],N=[];function A(){t.length=0,N.length=0}function z(n){t.push(n)}function i(n){N.push(n)}function T(n){D.setup(t,n)}function I(n){D.setupView(t,n)}return{init:A,state:{lightsArray:t,shadowsArray:N,lights:D},setupLights:T,setupLightsView:I,pushLight:z,pushShadow:i}}function Cc(e,M){let D=new WeakMap;function t(A,z=0){const i=D.get(A);let T;return i===void 0?(T=new eT(e,M),D.set(A,[T])):z>=i.length?(T=new eT(e,M),i.push(T)):T=i[z],T}function N(){D=new WeakMap}return{get:t,dispose:N}}class Lc extends pN{constructor(M){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(M)}copy(M){return super.copy(M),this.depthPacking=M.depthPacking,this.map=M.map,this.alphaMap=M.alphaMap,this.displacementMap=M.displacementMap,this.displacementScale=M.displacementScale,this.displacementBias=M.displacementBias,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this}}class wc extends pN{constructor(M){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(M)}copy(M){return super.copy(M),this.map=M.map,this.alphaMap=M.alphaMap,this.displacementMap=M.displacementMap,this.displacementScale=M.displacementScale,this.displacementBias=M.displacementBias,this}}const Oc=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,xc=`
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
`;function Ec(e,M,D){let t=new wz;const N=new jM,A=new jM,z=new ND,i=new Lc({depthPacking:dg}),T=new wc,I={},n=D.maxTextureSize,u={[Ze]:wD,[wD]:Ze,[xe]:xe},g=new zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jM},radius:{value:4}},vertexShader:Oc,fragmentShader:xc}),r=g.clone();r.defines.HORIZONTAL_PASS=1;const a=new tN;a.setAttribute("position",new Ae(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const c=new Ne(a,g),j=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=An;let s=this.type;this.render=function(O,h,d){if(j.enabled===!1||j.autoUpdate===!1&&j.needsUpdate===!1||O.length===0)return;const G=e.getRenderTarget(),o=e.getActiveCubeFace(),l=e.getActiveMipmapLevel(),F=e.state;F.setBlending(fe),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const K=s!==we&&this.type===we,m=s===we&&this.type!==we;for(let f=0,k=O.length;f<k;f++){const J=O[f],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;N.copy(V.mapSize);const H=V.getFrameExtents();if(N.multiply(H),A.copy(V.mapSize),(N.x>n||N.y>n)&&(N.x>n&&(A.x=Math.floor(n/H.x),N.x=A.x*H.x,V.mapSize.x=A.x),N.y>n&&(A.y=Math.floor(n/H.y),N.y=A.y*H.y,V.mapSize.y=A.y)),V.map===null||K===!0||m===!0){const $=this.type!==we?{minFilter:cD,magFilter:cD}:{};V.map!==null&&V.map.dispose(),V.map=new It(N.x,N.y,$),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();const X=V.getViewportCount();for(let $=0;$<X;$++){const gM=V.getViewport($);z.set(A.x*gM.x,A.y*gM.y,A.x*gM.z,A.y*gM.w),F.viewport(z),V.updateMatrices(J,$),t=V.getFrustum(),x(h,d,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===we&&L(V,d),V.needsUpdate=!1}s=this.type,j.needsUpdate=!1,e.setRenderTarget(G,o,l)};function L(O,h){const d=M.update(c);g.defines.VSM_SAMPLES!==O.blurSamples&&(g.defines.VSM_SAMPLES=O.blurSamples,r.defines.VSM_SAMPLES=O.blurSamples,g.needsUpdate=!0,r.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new It(N.x,N.y)),g.uniforms.shadow_pass.value=O.map.texture,g.uniforms.resolution.value=O.mapSize,g.uniforms.radius.value=O.radius,e.setRenderTarget(O.mapPass),e.clear(),e.renderBufferDirect(h,null,d,g,c,null),r.uniforms.shadow_pass.value=O.mapPass.texture,r.uniforms.resolution.value=O.mapSize,r.uniforms.radius.value=O.radius,e.setRenderTarget(O.map),e.clear(),e.renderBufferDirect(h,null,d,r,c,null)}function y(O,h,d,G){let o=null;const l=d.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(l!==void 0)o=l;else if(o=d.isPointLight===!0?T:i,e.localClippingEnabled&&h.clipShadows===!0&&Array.isArray(h.clippingPlanes)&&h.clippingPlanes.length!==0||h.displacementMap&&h.displacementScale!==0||h.alphaMap&&h.alphaTest>0||h.map&&h.alphaTest>0){const F=o.uuid,K=h.uuid;let m=I[F];m===void 0&&(m={},I[F]=m);let f=m[K];f===void 0&&(f=o.clone(),m[K]=f),o=f}if(o.visible=h.visible,o.wireframe=h.wireframe,G===we?o.side=h.shadowSide!==null?h.shadowSide:h.side:o.side=h.shadowSide!==null?h.shadowSide:u[h.side],o.alphaMap=h.alphaMap,o.alphaTest=h.alphaTest,o.map=h.map,o.clipShadows=h.clipShadows,o.clippingPlanes=h.clippingPlanes,o.clipIntersection=h.clipIntersection,o.displacementMap=h.displacementMap,o.displacementScale=h.displacementScale,o.displacementBias=h.displacementBias,o.wireframeLinewidth=h.wireframeLinewidth,o.linewidth=h.linewidth,d.isPointLight===!0&&o.isMeshDistanceMaterial===!0){const F=e.properties.get(o);F.light=d}return o}function x(O,h,d,G,o){if(O.visible===!1)return;if(O.layers.test(h.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&o===we)&&(!O.frustumCulled||t.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(d.matrixWorldInverse,O.matrixWorld);const F=M.update(O),K=O.material;if(Array.isArray(K)){const m=F.groups;for(let f=0,k=m.length;f<k;f++){const J=m[f],V=K[J.materialIndex];if(V&&V.visible){const H=y(O,V,G,o);e.renderBufferDirect(d,null,F,H,O,J)}}}else if(K.visible){const m=y(O,K,G,o);e.renderBufferDirect(d,null,F,m,O,null)}}const l=O.children;for(let F=0,K=l.length;F<K;F++)x(l[F],h,d,G,o)}}function lc(e,M,D){const t=D.isWebGL2;function N(){let v=!1;const _=new ND;let q=null;const AM=new ND(0,0,0,0);return{setMask:function(yM){q!==yM&&!v&&(e.colorMask(yM,yM,yM,yM),q=yM)},setLocked:function(yM){v=yM},setClear:function(yM,KM,_M,zD,ve){ve===!0&&(yM*=zD,KM*=zD,_M*=zD),_.set(yM,KM,_M,zD),AM.equals(_)===!1&&(e.clearColor(yM,KM,_M,zD),AM.copy(_))},reset:function(){v=!1,q=null,AM.set(-1,0,0,0)}}}function A(){let v=!1,_=null,q=null,AM=null;return{setTest:function(yM){yM?p(e.DEPTH_TEST):EM(e.DEPTH_TEST)},setMask:function(yM){_!==yM&&!v&&(e.depthMask(yM),_=yM)},setFunc:function(yM){if(q!==yM){switch(yM){case Ju:e.depthFunc(e.NEVER);break;case $u:e.depthFunc(e.ALWAYS);break;case Mg:e.depthFunc(e.LESS);break;case Iz:e.depthFunc(e.LEQUAL);break;case Dg:e.depthFunc(e.EQUAL);break;case eg:e.depthFunc(e.GEQUAL);break;case tg:e.depthFunc(e.GREATER);break;case Ng:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}q=yM}},setLocked:function(yM){v=yM},setClear:function(yM){AM!==yM&&(e.clearDepth(yM),AM=yM)},reset:function(){v=!1,_=null,q=null,AM=null}}}function z(){let v=!1,_=null,q=null,AM=null,yM=null,KM=null,_M=null,zD=null,ve=null;return{setTest:function(HM){v||(HM?p(e.STENCIL_TEST):EM(e.STENCIL_TEST))},setMask:function(HM){_!==HM&&!v&&(e.stencilMask(HM),_=HM)},setFunc:function(HM,UD,$D){(q!==HM||AM!==UD||yM!==$D)&&(e.stencilFunc(HM,UD,$D),q=HM,AM=UD,yM=$D)},setOp:function(HM,UD,$D){(KM!==HM||_M!==UD||zD!==$D)&&(e.stencilOp(HM,UD,$D),KM=HM,_M=UD,zD=$D)},setLocked:function(HM){v=HM},setClear:function(HM){ve!==HM&&(e.clearStencil(HM),ve=HM)},reset:function(){v=!1,_=null,q=null,AM=null,yM=null,KM=null,_M=null,zD=null,ve=null}}}const i=new N,T=new A,I=new z,n=new WeakMap,u=new WeakMap;let g={},r={},a=new WeakMap,c=[],j=null,s=!1,L=null,y=null,x=null,O=null,h=null,d=null,G=null,o=!1,l=null,F=null,K=null,m=null,f=null;const k=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,V=0;const H=e.getParameter(e.VERSION);H.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(H)[1]),J=V>=1):H.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),J=V>=2);let X=null,$={};const gM=e.getParameter(e.SCISSOR_BOX),zM=e.getParameter(e.VIEWPORT),S=new ND().fromArray(gM),W=new ND().fromArray(zM);function IM(v,_,q,AM){const yM=new Uint8Array(4),KM=e.createTexture();e.bindTexture(v,KM),e.texParameteri(v,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(v,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let _M=0;_M<q;_M++)t&&(v===e.TEXTURE_3D||v===e.TEXTURE_2D_ARRAY)?e.texImage3D(_,0,e.RGBA,1,1,AM,0,e.RGBA,e.UNSIGNED_BYTE,yM):e.texImage2D(_+_M,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,yM);return KM}const iM={};iM[e.TEXTURE_2D]=IM(e.TEXTURE_2D,e.TEXTURE_2D,1),iM[e.TEXTURE_CUBE_MAP]=IM(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),t&&(iM[e.TEXTURE_2D_ARRAY]=IM(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),iM[e.TEXTURE_3D]=IM(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),i.setClear(0,0,0,1),T.setClear(1),I.setClear(0),p(e.DEPTH_TEST),T.setFunc(Iz),AD(!1),DD(Gz),p(e.CULL_FACE),dM(fe);function p(v){g[v]!==!0&&(e.enable(v),g[v]=!0)}function EM(v){g[v]!==!1&&(e.disable(v),g[v]=!1)}function OM(v,_){return r[v]!==_?(e.bindFramebuffer(v,_),r[v]=_,t&&(v===e.DRAW_FRAMEBUFFER&&(r[e.FRAMEBUFFER]=_),v===e.FRAMEBUFFER&&(r[e.DRAW_FRAMEBUFFER]=_)),!0):!1}function eM(v,_){let q=c,AM=!1;if(v)if(q=a.get(_),q===void 0&&(q=[],a.set(_,q)),v.isWebGLMultipleRenderTargets){const yM=v.texture;if(q.length!==yM.length||q[0]!==e.COLOR_ATTACHMENT0){for(let KM=0,_M=yM.length;KM<_M;KM++)q[KM]=e.COLOR_ATTACHMENT0+KM;q.length=yM.length,AM=!0}}else q[0]!==e.COLOR_ATTACHMENT0&&(q[0]=e.COLOR_ATTACHMENT0,AM=!0);else q[0]!==e.BACK&&(q[0]=e.BACK,AM=!0);AM&&(D.isWebGL2?e.drawBuffers(q):M.get("WEBGL_draw_buffers").drawBuffersWEBGL(q))}function CM(v){return j!==v?(e.useProgram(v),j=v,!0):!1}const SM={[Kt]:e.FUNC_ADD,[Ku]:e.FUNC_SUBTRACT,[Ru]:e.FUNC_REVERSE_SUBTRACT};if(t)SM[qz]=e.MIN,SM[Jz]=e.MAX;else{const v=M.get("EXT_blend_minmax");v!==null&&(SM[qz]=v.MIN_EXT,SM[Jz]=v.MAX_EXT)}const aM={[Pu]:e.ZERO,[Fu]:e.ONE,[Bu]:e.SRC_COLOR,[zn]:e.SRC_ALPHA,[qu]:e.SRC_ALPHA_SATURATE,[Wu]:e.DST_COLOR,[Gu]:e.DST_ALPHA,[Hu]:e.ONE_MINUS_SRC_COLOR,[In]:e.ONE_MINUS_SRC_ALPHA,[Xu]:e.ONE_MINUS_DST_COLOR,[Vu]:e.ONE_MINUS_DST_ALPHA};function dM(v,_,q,AM,yM,KM,_M,zD){if(v===fe){s===!0&&(EM(e.BLEND),s=!1);return}if(s===!1&&(p(e.BLEND),s=!0),v!==bu){if(v!==L||zD!==o){if((y!==Kt||h!==Kt)&&(e.blendEquation(e.FUNC_ADD),y=Kt,h=Kt),zD)switch(v){case Ft:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Vz:e.blendFunc(e.ONE,e.ONE);break;case Wz:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Xz:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}else switch(v){case Ft:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Vz:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case Wz:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Xz:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}x=null,O=null,d=null,G=null,L=v,o=zD}return}yM=yM||_,KM=KM||q,_M=_M||AM,(_!==y||yM!==h)&&(e.blendEquationSeparate(SM[_],SM[yM]),y=_,h=yM),(q!==x||AM!==O||KM!==d||_M!==G)&&(e.blendFuncSeparate(aM[q],aM[AM],aM[KM],aM[_M]),x=q,O=AM,d=KM,G=_M),L=v,o=!1}function MD(v,_){v.side===xe?EM(e.CULL_FACE):p(e.CULL_FACE);let q=v.side===wD;_&&(q=!q),AD(q),v.blending===Ft&&v.transparent===!1?dM(fe):dM(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.premultipliedAlpha),T.setFunc(v.depthFunc),T.setTest(v.depthTest),T.setMask(v.depthWrite),i.setMask(v.colorWrite);const AM=v.stencilWrite;I.setTest(AM),AM&&(I.setMask(v.stencilWriteMask),I.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),I.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),fM(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?p(e.SAMPLE_ALPHA_TO_COVERAGE):EM(e.SAMPLE_ALPHA_TO_COVERAGE)}function AD(v){l!==v&&(v?e.frontFace(e.CW):e.frontFace(e.CCW),l=v)}function DD(v){v!==fu?(p(e.CULL_FACE),v!==F&&(v===Gz?e.cullFace(e.BACK):v===Zu?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):EM(e.CULL_FACE),F=v}function qM(v){v!==K&&(J&&e.lineWidth(v),K=v)}function fM(v,_,q){v?(p(e.POLYGON_OFFSET_FILL),(m!==_||f!==q)&&(e.polygonOffset(_,q),m=_,f=q)):EM(e.POLYGON_OFFSET_FILL)}function FM(v){v?p(e.SCISSOR_TEST):EM(e.SCISSOR_TEST)}function oD(v){v===void 0&&(v=e.TEXTURE0+k-1),X!==v&&(e.activeTexture(v),X=v)}function E(v,_,q){q===void 0&&(X===null?q=e.TEXTURE0+k-1:q=X);let AM=$[q];AM===void 0&&(AM={type:void 0,texture:void 0},$[q]=AM),(AM.type!==v||AM.texture!==_)&&(X!==q&&(e.activeTexture(q),X=q),e.bindTexture(v,_||iM[v]),AM.type=v,AM.texture=_)}function C(){const v=$[X];v!==void 0&&v.type!==void 0&&(e.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function Z(){try{e.compressedTexImage2D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function MM(){try{e.compressedTexImage3D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function DM(){try{e.texSubImage2D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function NM(){try{e.texSubImage3D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function LM(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function nM(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function B(){try{e.texStorage2D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function sM(){try{e.texStorage3D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function cM(){try{e.texImage2D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function oM(){try{e.texImage3D.apply(e,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function TM(v){S.equals(v)===!1&&(e.scissor(v.x,v.y,v.z,v.w),S.copy(v))}function rM(v){W.equals(v)===!1&&(e.viewport(v.x,v.y,v.z,v.w),W.copy(v))}function UM(v,_){let q=u.get(_);q===void 0&&(q=new WeakMap,u.set(_,q));let AM=q.get(v);AM===void 0&&(AM=e.getUniformBlockIndex(_,v.name),q.set(v,AM))}function ZM(v,_){const q=u.get(_).get(v);n.get(_)!==q&&(e.uniformBlockBinding(_,q,v.__bindingPointIndex),n.set(_,q))}function BM(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),t===!0&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),g={},X=null,$={},r={},a=new WeakMap,c=[],j=null,s=!1,L=null,y=null,x=null,O=null,h=null,d=null,G=null,o=!1,l=null,F=null,K=null,m=null,f=null,S.set(0,0,e.canvas.width,e.canvas.height),W.set(0,0,e.canvas.width,e.canvas.height),i.reset(),T.reset(),I.reset()}return{buffers:{color:i,depth:T,stencil:I},enable:p,disable:EM,bindFramebuffer:OM,drawBuffers:eM,useProgram:CM,setBlending:dM,setMaterial:MD,setFlipSided:AD,setCullFace:DD,setLineWidth:qM,setPolygonOffset:fM,setScissorTest:FM,activeTexture:oD,bindTexture:E,unbindTexture:C,compressedTexImage2D:Z,compressedTexImage3D:MM,texImage2D:cM,texImage3D:oM,updateUBOMapping:UM,uniformBlockBinding:ZM,texStorage2D:B,texStorage3D:sM,texSubImage2D:DM,texSubImage3D:NM,compressedTexSubImage2D:LM,compressedTexSubImage3D:nM,scissor:TM,viewport:rM,reset:BM}}function hc(e,M,D,t,N,A,z){const i=N.isWebGL2,T=N.maxTextures,I=N.maxCubemapSize,n=N.maxTextureSize,u=N.maxSamples,g=M.has("WEBGL_multisampled_render_to_texture")?M.get("WEBGL_multisampled_render_to_texture"):null,r=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),a=new WeakMap;let c;const j=new WeakMap;let s=!1;try{s=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function L(E,C){return s?new OffscreenCanvas(E,C):ON("canvas")}function y(E,C,Z,MM){let DM=1;if((E.width>MM||E.height>MM)&&(DM=MM/Math.max(E.width,E.height)),DM<1||C===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const NM=C?vu:Math.floor,LM=NM(DM*E.width),nM=NM(DM*E.height);c===void 0&&(c=L(LM,nM));const B=Z?L(LM,nM):c;return B.width=LM,B.height=nM,B.getContext("2d").drawImage(E,0,0,LM,nM),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+LM+"x"+nM+")."),B}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function x(E){return Zz(E.width)&&Zz(E.height)}function O(E){return i?!1:E.wrapS!==XD||E.wrapT!==XD||E.minFilter!==cD&&E.minFilter!==CD}function h(E,C){return E.generateMipmaps&&C&&E.minFilter!==cD&&E.minFilter!==CD}function d(E){e.generateMipmap(E)}function G(E,C,Z,MM,DM=!1){if(i===!1)return C;if(E!==null){if(e[E]!==void 0)return e[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let NM=C;return C===e.RED&&(Z===e.FLOAT&&(NM=e.R32F),Z===e.HALF_FLOAT&&(NM=e.R16F),Z===e.UNSIGNED_BYTE&&(NM=e.R8)),C===e.RG&&(Z===e.FLOAT&&(NM=e.RG32F),Z===e.HALF_FLOAT&&(NM=e.RG16F),Z===e.UNSIGNED_BYTE&&(NM=e.RG8)),C===e.RGBA&&(Z===e.FLOAT&&(NM=e.RGBA32F),Z===e.HALF_FLOAT&&(NM=e.RGBA16F),Z===e.UNSIGNED_BYTE&&(NM=MM===lM&&DM===!1?e.SRGB8_ALPHA8:e.RGBA8),Z===e.UNSIGNED_SHORT_4_4_4_4&&(NM=e.RGBA4),Z===e.UNSIGNED_SHORT_5_5_5_1&&(NM=e.RGB5_A1)),(NM===e.R16F||NM===e.R32F||NM===e.RG16F||NM===e.RG32F||NM===e.RGBA16F||NM===e.RGBA32F)&&M.get("EXT_color_buffer_float"),NM}function o(E,C,Z){return h(E,Z)===!0||E.isFramebufferTexture&&E.minFilter!==cD&&E.minFilter!==CD?Math.log2(Math.max(C.width,C.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?C.mipmaps.length:1}function l(E){return E===cD||E===$z||E===Ni?e.NEAREST:e.LINEAR}function F(E){const C=E.target;C.removeEventListener("dispose",F),m(C),C.isVideoTexture&&a.delete(C)}function K(E){const C=E.target;C.removeEventListener("dispose",K),k(C)}function m(E){const C=t.get(E);if(C.__webglInit===void 0)return;const Z=E.source,MM=j.get(Z);if(MM){const DM=MM[C.__cacheKey];DM.usedTimes--,DM.usedTimes===0&&f(E),Object.keys(MM).length===0&&j.delete(Z)}t.remove(E)}function f(E){const C=t.get(E);e.deleteTexture(C.__webglTexture);const Z=E.source,MM=j.get(Z);delete MM[C.__cacheKey],z.memory.textures--}function k(E){const C=E.texture,Z=t.get(E),MM=t.get(C);if(MM.__webglTexture!==void 0&&(e.deleteTexture(MM.__webglTexture),z.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let DM=0;DM<6;DM++)e.deleteFramebuffer(Z.__webglFramebuffer[DM]),Z.__webglDepthbuffer&&e.deleteRenderbuffer(Z.__webglDepthbuffer[DM]);else{if(e.deleteFramebuffer(Z.__webglFramebuffer),Z.__webglDepthbuffer&&e.deleteRenderbuffer(Z.__webglDepthbuffer),Z.__webglMultisampledFramebuffer&&e.deleteFramebuffer(Z.__webglMultisampledFramebuffer),Z.__webglColorRenderbuffer)for(let DM=0;DM<Z.__webglColorRenderbuffer.length;DM++)Z.__webglColorRenderbuffer[DM]&&e.deleteRenderbuffer(Z.__webglColorRenderbuffer[DM]);Z.__webglDepthRenderbuffer&&e.deleteRenderbuffer(Z.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let DM=0,NM=C.length;DM<NM;DM++){const LM=t.get(C[DM]);LM.__webglTexture&&(e.deleteTexture(LM.__webglTexture),z.memory.textures--),t.remove(C[DM])}t.remove(C),t.remove(E)}let J=0;function V(){J=0}function H(){const E=J;return E>=T&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+T),J+=1,E}function X(E){const C=[];return C.push(E.wrapS),C.push(E.wrapT),C.push(E.wrapR||0),C.push(E.magFilter),C.push(E.minFilter),C.push(E.anisotropy),C.push(E.internalFormat),C.push(E.format),C.push(E.type),C.push(E.generateMipmaps),C.push(E.premultiplyAlpha),C.push(E.flipY),C.push(E.unpackAlignment),C.push(E.colorSpace),C.join()}function $(E,C){const Z=t.get(E);if(E.isVideoTexture&&FM(E),E.isRenderTargetTexture===!1&&E.version>0&&Z.__version!==E.version){const MM=E.image;if(MM===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(MM.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{EM(Z,E,C);return}}D.bindTexture(e.TEXTURE_2D,Z.__webglTexture,e.TEXTURE0+C)}function gM(E,C){const Z=t.get(E);if(E.version>0&&Z.__version!==E.version){EM(Z,E,C);return}D.bindTexture(e.TEXTURE_2D_ARRAY,Z.__webglTexture,e.TEXTURE0+C)}function zM(E,C){const Z=t.get(E);if(E.version>0&&Z.__version!==E.version){EM(Z,E,C);return}D.bindTexture(e.TEXTURE_3D,Z.__webglTexture,e.TEXTURE0+C)}function S(E,C){const Z=t.get(E);if(E.version>0&&Z.__version!==E.version){OM(Z,E,C);return}D.bindTexture(e.TEXTURE_CUBE_MAP,Z.__webglTexture,e.TEXTURE0+C)}const W={[uz]:e.REPEAT,[XD]:e.CLAMP_TO_EDGE,[gz]:e.MIRRORED_REPEAT},IM={[cD]:e.NEAREST,[$z]:e.NEAREST_MIPMAP_NEAREST,[Ni]:e.NEAREST_MIPMAP_LINEAR,[CD]:e.LINEAR,[gg]:e.LINEAR_MIPMAP_NEAREST,[LN]:e.LINEAR_MIPMAP_LINEAR};function iM(E,C,Z){if(Z?(e.texParameteri(E,e.TEXTURE_WRAP_S,W[C.wrapS]),e.texParameteri(E,e.TEXTURE_WRAP_T,W[C.wrapT]),(E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)&&e.texParameteri(E,e.TEXTURE_WRAP_R,W[C.wrapR]),e.texParameteri(E,e.TEXTURE_MAG_FILTER,IM[C.magFilter]),e.texParameteri(E,e.TEXTURE_MIN_FILTER,IM[C.minFilter])):(e.texParameteri(E,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(E,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),(E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)&&e.texParameteri(E,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),(C.wrapS!==XD||C.wrapT!==XD)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(E,e.TEXTURE_MAG_FILTER,l(C.magFilter)),e.texParameteri(E,e.TEXTURE_MIN_FILTER,l(C.minFilter)),C.minFilter!==cD&&C.minFilter!==CD&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.has("EXT_texture_filter_anisotropic")===!0){const MM=M.get("EXT_texture_filter_anisotropic");if(C.magFilter===cD||C.minFilter!==Ni&&C.minFilter!==LN||C.type===Mt&&M.has("OES_texture_float_linear")===!1||i===!1&&C.type===wN&&M.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||t.get(C).__currentAnisotropy)&&(e.texParameterf(E,MM.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,N.getMaxAnisotropy())),t.get(C).__currentAnisotropy=C.anisotropy)}}function p(E,C){let Z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,C.addEventListener("dispose",F));const MM=C.source;let DM=j.get(MM);DM===void 0&&(DM={},j.set(MM,DM));const NM=X(C);if(NM!==E.__cacheKey){DM[NM]===void 0&&(DM[NM]={texture:e.createTexture(),usedTimes:0},z.memory.textures++,Z=!0),DM[NM].usedTimes++;const LM=DM[E.__cacheKey];LM!==void 0&&(DM[E.__cacheKey].usedTimes--,LM.usedTimes===0&&f(C)),E.__cacheKey=NM,E.__webglTexture=DM[NM].texture}return Z}function EM(E,C,Z){let MM=e.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(MM=e.TEXTURE_2D_ARRAY),C.isData3DTexture&&(MM=e.TEXTURE_3D);const DM=p(E,C),NM=C.source;D.bindTexture(MM,E.__webglTexture,e.TEXTURE0+Z);const LM=t.get(NM);if(NM.version!==LM.__version||DM===!0){D.activeTexture(e.TEXTURE0+Z),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,C.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,C.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE);const nM=O(C)&&x(C.image)===!1;let B=y(C.image,nM,!1,n);B=oD(C,B);const sM=x(B)||i,cM=A.convert(C.format,C.colorSpace);let oM=A.convert(C.type),TM=G(C.internalFormat,cM,oM,C.colorSpace);iM(MM,C,sM);let rM;const UM=C.mipmaps,ZM=i&&C.isVideoTexture!==!0,BM=LM.__version===void 0||DM===!0,v=o(C,B,sM);if(C.isDepthTexture)TM=e.DEPTH_COMPONENT,i?C.type===Mt?TM=e.DEPTH_COMPONENT32F:C.type===$e?TM=e.DEPTH_COMPONENT24:C.type===Bt?TM=e.DEPTH24_STENCIL8:TM=e.DEPTH_COMPONENT16:C.type===Mt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===et&&TM===e.DEPTH_COMPONENT&&C.type!==nn&&C.type!==$e&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=$e,oM=A.convert(C.type)),C.format===qt&&TM===e.DEPTH_COMPONENT&&(TM=e.DEPTH_STENCIL,C.type!==Bt&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=Bt,oM=A.convert(C.type))),BM&&(ZM?D.texStorage2D(e.TEXTURE_2D,1,TM,B.width,B.height):D.texImage2D(e.TEXTURE_2D,0,TM,B.width,B.height,0,cM,oM,null));else if(C.isDataTexture)if(UM.length>0&&sM){ZM&&BM&&D.texStorage2D(e.TEXTURE_2D,v,TM,UM[0].width,UM[0].height);for(let _=0,q=UM.length;_<q;_++)rM=UM[_],ZM?D.texSubImage2D(e.TEXTURE_2D,_,0,0,rM.width,rM.height,cM,oM,rM.data):D.texImage2D(e.TEXTURE_2D,_,TM,rM.width,rM.height,0,cM,oM,rM.data);C.generateMipmaps=!1}else ZM?(BM&&D.texStorage2D(e.TEXTURE_2D,v,TM,B.width,B.height),D.texSubImage2D(e.TEXTURE_2D,0,0,0,B.width,B.height,cM,oM,B.data)):D.texImage2D(e.TEXTURE_2D,0,TM,B.width,B.height,0,cM,oM,B.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){ZM&&BM&&D.texStorage3D(e.TEXTURE_2D_ARRAY,v,TM,UM[0].width,UM[0].height,B.depth);for(let _=0,q=UM.length;_<q;_++)rM=UM[_],C.format!==qD?cM!==null?ZM?D.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,_,0,0,0,rM.width,rM.height,B.depth,cM,rM.data,0,0):D.compressedTexImage3D(e.TEXTURE_2D_ARRAY,_,TM,rM.width,rM.height,B.depth,0,rM.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ZM?D.texSubImage3D(e.TEXTURE_2D_ARRAY,_,0,0,0,rM.width,rM.height,B.depth,cM,oM,rM.data):D.texImage3D(e.TEXTURE_2D_ARRAY,_,TM,rM.width,rM.height,B.depth,0,cM,oM,rM.data)}else{ZM&&BM&&D.texStorage2D(e.TEXTURE_2D,v,TM,UM[0].width,UM[0].height);for(let _=0,q=UM.length;_<q;_++)rM=UM[_],C.format!==qD?cM!==null?ZM?D.compressedTexSubImage2D(e.TEXTURE_2D,_,0,0,rM.width,rM.height,cM,rM.data):D.compressedTexImage2D(e.TEXTURE_2D,_,TM,rM.width,rM.height,0,rM.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ZM?D.texSubImage2D(e.TEXTURE_2D,_,0,0,rM.width,rM.height,cM,oM,rM.data):D.texImage2D(e.TEXTURE_2D,_,TM,rM.width,rM.height,0,cM,oM,rM.data)}else if(C.isDataArrayTexture)ZM?(BM&&D.texStorage3D(e.TEXTURE_2D_ARRAY,v,TM,B.width,B.height,B.depth),D.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,B.width,B.height,B.depth,cM,oM,B.data)):D.texImage3D(e.TEXTURE_2D_ARRAY,0,TM,B.width,B.height,B.depth,0,cM,oM,B.data);else if(C.isData3DTexture)ZM?(BM&&D.texStorage3D(e.TEXTURE_3D,v,TM,B.width,B.height,B.depth),D.texSubImage3D(e.TEXTURE_3D,0,0,0,0,B.width,B.height,B.depth,cM,oM,B.data)):D.texImage3D(e.TEXTURE_3D,0,TM,B.width,B.height,B.depth,0,cM,oM,B.data);else if(C.isFramebufferTexture){if(BM)if(ZM)D.texStorage2D(e.TEXTURE_2D,v,TM,B.width,B.height);else{let _=B.width,q=B.height;for(let AM=0;AM<v;AM++)D.texImage2D(e.TEXTURE_2D,AM,TM,_,q,0,cM,oM,null),_>>=1,q>>=1}}else if(UM.length>0&&sM){ZM&&BM&&D.texStorage2D(e.TEXTURE_2D,v,TM,UM[0].width,UM[0].height);for(let _=0,q=UM.length;_<q;_++)rM=UM[_],ZM?D.texSubImage2D(e.TEXTURE_2D,_,0,0,cM,oM,rM):D.texImage2D(e.TEXTURE_2D,_,TM,cM,oM,rM);C.generateMipmaps=!1}else ZM?(BM&&D.texStorage2D(e.TEXTURE_2D,v,TM,B.width,B.height),D.texSubImage2D(e.TEXTURE_2D,0,0,0,cM,oM,B)):D.texImage2D(e.TEXTURE_2D,0,TM,cM,oM,B);h(C,sM)&&d(MM),LM.__version=NM.version,C.onUpdate&&C.onUpdate(C)}E.__version=C.version}function OM(E,C,Z){if(C.image.length!==6)return;const MM=p(E,C),DM=C.source;D.bindTexture(e.TEXTURE_CUBE_MAP,E.__webglTexture,e.TEXTURE0+Z);const NM=t.get(DM);if(DM.version!==NM.__version||MM===!0){D.activeTexture(e.TEXTURE0+Z),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,C.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,C.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE);const LM=C.isCompressedTexture||C.image[0].isCompressedTexture,nM=C.image[0]&&C.image[0].isDataTexture,B=[];for(let _=0;_<6;_++)!LM&&!nM?B[_]=y(C.image[_],!1,!0,I):B[_]=nM?C.image[_].image:C.image[_],B[_]=oD(C,B[_]);const sM=B[0],cM=x(sM)||i,oM=A.convert(C.format,C.colorSpace),TM=A.convert(C.type),rM=G(C.internalFormat,oM,TM,C.colorSpace),UM=i&&C.isVideoTexture!==!0,ZM=NM.__version===void 0||MM===!0;let BM=o(C,sM,cM);iM(e.TEXTURE_CUBE_MAP,C,cM);let v;if(LM){UM&&ZM&&D.texStorage2D(e.TEXTURE_CUBE_MAP,BM,rM,sM.width,sM.height);for(let _=0;_<6;_++){v=B[_].mipmaps;for(let q=0;q<v.length;q++){const AM=v[q];C.format!==qD?oM!==null?UM?D.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,q,0,0,AM.width,AM.height,oM,AM.data):D.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,q,rM,AM.width,AM.height,0,AM.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):UM?D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,q,0,0,AM.width,AM.height,oM,TM,AM.data):D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,q,rM,AM.width,AM.height,0,oM,TM,AM.data)}}}else{v=C.mipmaps,UM&&ZM&&(v.length>0&&BM++,D.texStorage2D(e.TEXTURE_CUBE_MAP,BM,rM,B[0].width,B[0].height));for(let _=0;_<6;_++)if(nM){UM?D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,0,0,B[_].width,B[_].height,oM,TM,B[_].data):D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,rM,B[_].width,B[_].height,0,oM,TM,B[_].data);for(let q=0;q<v.length;q++){const AM=v[q].image[_].image;UM?D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,q+1,0,0,AM.width,AM.height,oM,TM,AM.data):D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,q+1,rM,AM.width,AM.height,0,oM,TM,AM.data)}}else{UM?D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,0,0,oM,TM,B[_]):D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,rM,oM,TM,B[_]);for(let q=0;q<v.length;q++){const AM=v[q];UM?D.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,q+1,0,0,oM,TM,AM.image[_]):D.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,q+1,rM,oM,TM,AM.image[_])}}}h(C,cM)&&d(e.TEXTURE_CUBE_MAP),NM.__version=DM.version,C.onUpdate&&C.onUpdate(C)}E.__version=C.version}function eM(E,C,Z,MM,DM){const NM=A.convert(Z.format,Z.colorSpace),LM=A.convert(Z.type),nM=G(Z.internalFormat,NM,LM,Z.colorSpace);t.get(C).__hasExternalTextures||(DM===e.TEXTURE_3D||DM===e.TEXTURE_2D_ARRAY?D.texImage3D(DM,0,nM,C.width,C.height,C.depth,0,NM,LM,null):D.texImage2D(DM,0,nM,C.width,C.height,0,NM,LM,null)),D.bindFramebuffer(e.FRAMEBUFFER,E),fM(C)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,MM,DM,t.get(Z).__webglTexture,0,qM(C)):(DM===e.TEXTURE_2D||DM>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&DM<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,MM,DM,t.get(Z).__webglTexture,0),D.bindFramebuffer(e.FRAMEBUFFER,null)}function CM(E,C,Z){if(e.bindRenderbuffer(e.RENDERBUFFER,E),C.depthBuffer&&!C.stencilBuffer){let MM=e.DEPTH_COMPONENT16;if(Z||fM(C)){const DM=C.depthTexture;DM&&DM.isDepthTexture&&(DM.type===Mt?MM=e.DEPTH_COMPONENT32F:DM.type===$e&&(MM=e.DEPTH_COMPONENT24));const NM=qM(C);fM(C)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,NM,MM,C.width,C.height):e.renderbufferStorageMultisample(e.RENDERBUFFER,NM,MM,C.width,C.height)}else e.renderbufferStorage(e.RENDERBUFFER,MM,C.width,C.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,E)}else if(C.depthBuffer&&C.stencilBuffer){const MM=qM(C);Z&&fM(C)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,MM,e.DEPTH24_STENCIL8,C.width,C.height):fM(C)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,MM,e.DEPTH24_STENCIL8,C.width,C.height):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,C.width,C.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,E)}else{const MM=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let DM=0;DM<MM.length;DM++){const NM=MM[DM],LM=A.convert(NM.format,NM.colorSpace),nM=A.convert(NM.type),B=G(NM.internalFormat,LM,nM,NM.colorSpace),sM=qM(C);Z&&fM(C)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,sM,B,C.width,C.height):fM(C)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,sM,B,C.width,C.height):e.renderbufferStorage(e.RENDERBUFFER,B,C.width,C.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function SM(E,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(D.bindFramebuffer(e.FRAMEBUFFER,E),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!t.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),$(C.depthTexture,0);const Z=t.get(C.depthTexture).__webglTexture,MM=qM(C);if(C.depthTexture.format===et)fM(C)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0,MM):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0);else if(C.depthTexture.format===qt)fM(C)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0,MM):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function aM(E){const C=t.get(E),Z=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!C.__autoAllocateDepthBuffer){if(Z)throw new Error("target.depthTexture not supported in Cube render targets");SM(C.__webglFramebuffer,E)}else if(Z){C.__webglDepthbuffer=[];for(let MM=0;MM<6;MM++)D.bindFramebuffer(e.FRAMEBUFFER,C.__webglFramebuffer[MM]),C.__webglDepthbuffer[MM]=e.createRenderbuffer(),CM(C.__webglDepthbuffer[MM],E,!1)}else D.bindFramebuffer(e.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=e.createRenderbuffer(),CM(C.__webglDepthbuffer,E,!1);D.bindFramebuffer(e.FRAMEBUFFER,null)}function dM(E,C,Z){const MM=t.get(E);C!==void 0&&eM(MM.__webglFramebuffer,E,E.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D),Z!==void 0&&aM(E)}function MD(E){const C=E.texture,Z=t.get(E),MM=t.get(C);E.addEventListener("dispose",K),E.isWebGLMultipleRenderTargets!==!0&&(MM.__webglTexture===void 0&&(MM.__webglTexture=e.createTexture()),MM.__version=C.version,z.memory.textures++);const DM=E.isWebGLCubeRenderTarget===!0,NM=E.isWebGLMultipleRenderTargets===!0,LM=x(E)||i;if(DM){Z.__webglFramebuffer=[];for(let nM=0;nM<6;nM++)Z.__webglFramebuffer[nM]=e.createFramebuffer()}else{if(Z.__webglFramebuffer=e.createFramebuffer(),NM)if(N.drawBuffers){const nM=E.texture;for(let B=0,sM=nM.length;B<sM;B++){const cM=t.get(nM[B]);cM.__webglTexture===void 0&&(cM.__webglTexture=e.createTexture(),z.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(i&&E.samples>0&&fM(E)===!1){const nM=NM?C:[C];Z.__webglMultisampledFramebuffer=e.createFramebuffer(),Z.__webglColorRenderbuffer=[],D.bindFramebuffer(e.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let B=0;B<nM.length;B++){const sM=nM[B];Z.__webglColorRenderbuffer[B]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,Z.__webglColorRenderbuffer[B]);const cM=A.convert(sM.format,sM.colorSpace),oM=A.convert(sM.type),TM=G(sM.internalFormat,cM,oM,sM.colorSpace,E.isXRRenderTarget===!0),rM=qM(E);e.renderbufferStorageMultisample(e.RENDERBUFFER,rM,TM,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+B,e.RENDERBUFFER,Z.__webglColorRenderbuffer[B])}e.bindRenderbuffer(e.RENDERBUFFER,null),E.depthBuffer&&(Z.__webglDepthRenderbuffer=e.createRenderbuffer(),CM(Z.__webglDepthRenderbuffer,E,!0)),D.bindFramebuffer(e.FRAMEBUFFER,null)}}if(DM){D.bindTexture(e.TEXTURE_CUBE_MAP,MM.__webglTexture),iM(e.TEXTURE_CUBE_MAP,C,LM);for(let nM=0;nM<6;nM++)eM(Z.__webglFramebuffer[nM],E,C,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+nM);h(C,LM)&&d(e.TEXTURE_CUBE_MAP),D.unbindTexture()}else if(NM){const nM=E.texture;for(let B=0,sM=nM.length;B<sM;B++){const cM=nM[B],oM=t.get(cM);D.bindTexture(e.TEXTURE_2D,oM.__webglTexture),iM(e.TEXTURE_2D,cM,LM),eM(Z.__webglFramebuffer,E,cM,e.COLOR_ATTACHMENT0+B,e.TEXTURE_2D),h(cM,LM)&&d(e.TEXTURE_2D)}D.unbindTexture()}else{let nM=e.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(i?nM=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),D.bindTexture(nM,MM.__webglTexture),iM(nM,C,LM),eM(Z.__webglFramebuffer,E,C,e.COLOR_ATTACHMENT0,nM),h(C,LM)&&d(nM),D.unbindTexture()}E.depthBuffer&&aM(E)}function AD(E){const C=x(E)||i,Z=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let MM=0,DM=Z.length;MM<DM;MM++){const NM=Z[MM];if(h(NM,C)){const LM=E.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,nM=t.get(NM).__webglTexture;D.bindTexture(LM,nM),d(LM),D.unbindTexture()}}}function DD(E){if(i&&E.samples>0&&fM(E)===!1){const C=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],Z=E.width,MM=E.height;let DM=e.COLOR_BUFFER_BIT;const NM=[],LM=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,nM=t.get(E),B=E.isWebGLMultipleRenderTargets===!0;if(B)for(let sM=0;sM<C.length;sM++)D.bindFramebuffer(e.FRAMEBUFFER,nM.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+sM,e.RENDERBUFFER,null),D.bindFramebuffer(e.FRAMEBUFFER,nM.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+sM,e.TEXTURE_2D,null,0);D.bindFramebuffer(e.READ_FRAMEBUFFER,nM.__webglMultisampledFramebuffer),D.bindFramebuffer(e.DRAW_FRAMEBUFFER,nM.__webglFramebuffer);for(let sM=0;sM<C.length;sM++){NM.push(e.COLOR_ATTACHMENT0+sM),E.depthBuffer&&NM.push(LM);const cM=nM.__ignoreDepthValues!==void 0?nM.__ignoreDepthValues:!1;if(cM===!1&&(E.depthBuffer&&(DM|=e.DEPTH_BUFFER_BIT),E.stencilBuffer&&(DM|=e.STENCIL_BUFFER_BIT)),B&&e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,nM.__webglColorRenderbuffer[sM]),cM===!0&&(e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[LM]),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[LM])),B){const oM=t.get(C[sM]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,oM,0)}e.blitFramebuffer(0,0,Z,MM,0,0,Z,MM,DM,e.NEAREST),r&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,NM)}if(D.bindFramebuffer(e.READ_FRAMEBUFFER,null),D.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),B)for(let sM=0;sM<C.length;sM++){D.bindFramebuffer(e.FRAMEBUFFER,nM.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+sM,e.RENDERBUFFER,nM.__webglColorRenderbuffer[sM]);const cM=t.get(C[sM]).__webglTexture;D.bindFramebuffer(e.FRAMEBUFFER,nM.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+sM,e.TEXTURE_2D,cM,0)}D.bindFramebuffer(e.DRAW_FRAMEBUFFER,nM.__webglMultisampledFramebuffer)}}function qM(E){return Math.min(u,E.samples)}function fM(E){const C=t.get(E);return i&&E.samples>0&&M.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function FM(E){const C=z.render.frame;a.get(E)!==C&&(a.set(E,C),E.update())}function oD(E,C){const Z=E.colorSpace,MM=E.format,DM=E.type;return E.isCompressedTexture===!0||E.format===rz||Z!==ze&&Z!==Nt&&(Z===lM?i===!1?M.has("EXT_sRGB")===!0&&MM===qD?(E.format=rz,E.minFilter=CD,E.generateMipmaps=!1):C=on.sRGBToLinear(C):(MM!==qD||DM!==it)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Z)),C}this.allocateTextureUnit=H,this.resetTextureUnits=V,this.setTexture2D=$,this.setTexture2DArray=gM,this.setTexture3D=zM,this.setTextureCube=S,this.rebindTextures=dM,this.setupRenderTarget=MD,this.updateRenderTargetMipmap=AD,this.updateMultisampleRenderTarget=DD,this.setupDepthRenderbuffer=aM,this.setupFrameBufferTexture=eM,this.useMultisampledRTT=fM}function vc(e,M,D){const t=D.isWebGL2;function N(A,z=Nt){let i;if(A===it)return e.UNSIGNED_BYTE;if(A===jg)return e.UNSIGNED_SHORT_4_4_4_4;if(A===cg)return e.UNSIGNED_SHORT_5_5_5_1;if(A===rg)return e.BYTE;if(A===sg)return e.SHORT;if(A===nn)return e.UNSIGNED_SHORT;if(A===ag)return e.INT;if(A===$e)return e.UNSIGNED_INT;if(A===Mt)return e.FLOAT;if(A===wN)return t?e.HALF_FLOAT:(i=M.get("OES_texture_half_float"),i!==null?i.HALF_FLOAT_OES:null);if(A===yg)return e.ALPHA;if(A===qD)return e.RGBA;if(A===og)return e.LUMINANCE;if(A===Cg)return e.LUMINANCE_ALPHA;if(A===et)return e.DEPTH_COMPONENT;if(A===qt)return e.DEPTH_STENCIL;if(A===rz)return i=M.get("EXT_sRGB"),i!==null?i.SRGB_ALPHA_EXT:null;if(A===Lg)return e.RED;if(A===wg)return e.RED_INTEGER;if(A===Og)return e.RG;if(A===xg)return e.RG_INTEGER;if(A===Eg)return e.RGBA_INTEGER;if(A===Ai||A===ii||A===zi||A===Ii)if(z===lM)if(i=M.get("WEBGL_compressed_texture_s3tc_srgb"),i!==null){if(A===Ai)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(A===ii)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(A===zi)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(A===Ii)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=M.get("WEBGL_compressed_texture_s3tc"),i!==null){if(A===Ai)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(A===ii)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(A===zi)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(A===Ii)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(A===MI||A===DI||A===eI||A===tI)if(i=M.get("WEBGL_compressed_texture_pvrtc"),i!==null){if(A===MI)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(A===DI)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(A===eI)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(A===tI)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(A===lg)return i=M.get("WEBGL_compressed_texture_etc1"),i!==null?i.COMPRESSED_RGB_ETC1_WEBGL:null;if(A===NI||A===AI)if(i=M.get("WEBGL_compressed_texture_etc"),i!==null){if(A===NI)return z===lM?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(A===AI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(A===iI||A===zI||A===II||A===TI||A===nI||A===uI||A===gI||A===rI||A===sI||A===aI||A===jI||A===cI||A===yI||A===oI)if(i=M.get("WEBGL_compressed_texture_astc"),i!==null){if(A===iI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(A===zI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(A===II)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(A===TI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(A===nI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(A===uI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(A===gI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(A===rI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(A===sI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(A===aI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(A===jI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(A===cI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(A===yI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(A===oI)return z===lM?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(A===Ti)if(i=M.get("EXT_texture_compression_bptc"),i!==null){if(A===Ti)return z===lM?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(A===hg||A===CI||A===LI||A===wI)if(i=M.get("EXT_texture_compression_rgtc"),i!==null){if(A===Ti)return i.COMPRESSED_RED_RGTC1_EXT;if(A===CI)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(A===LI)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(A===wI)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return A===Bt?t?e.UNSIGNED_INT_24_8:(i=M.get("WEBGL_depth_texture"),i!==null?i.UNSIGNED_INT_24_8_WEBGL:null):e[A]!==void 0?e[A]:null}return{convert:N}}class dc extends ZD{constructor(M=[]){super(),this.isArrayCamera=!0,this.cameras=M}}let aN=class extends OD{constructor(){super(),this.isGroup=!0,this.type="Group"}};const pc={type:"move"};class pi{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new aN,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new aN,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new aN,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(M){return this._targetRay!==null&&this._targetRay.dispatchEvent(M),this._grip!==null&&this._grip.dispatchEvent(M),this._hand!==null&&this._hand.dispatchEvent(M),this}connect(M){if(M&&M.hand){const D=this._hand;if(D)for(const t of M.hand.values())this._getHandJoint(D,t)}return this.dispatchEvent({type:"connected",data:M}),this}disconnect(M){return this.dispatchEvent({type:"disconnected",data:M}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(M,D,t){let N=null,A=null,z=null;const i=this._targetRay,T=this._grip,I=this._hand;if(M&&D.session.visibilityState!=="visible-blurred"){if(I&&M.hand){z=!0;for(const c of M.hand.values()){const j=D.getJointPose(c,t),s=this._getHandJoint(I,c);j!==null&&(s.matrix.fromArray(j.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,s.jointRadius=j.radius),s.visible=j!==null}const n=I.joints["index-finger-tip"],u=I.joints["thumb-tip"],g=n.position.distanceTo(u.position),r=.02,a=.005;I.inputState.pinching&&g>r+a?(I.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:M.handedness,target:this})):!I.inputState.pinching&&g<=r-a&&(I.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:M.handedness,target:this}))}else T!==null&&M.gripSpace&&(A=D.getPose(M.gripSpace,t),A!==null&&(T.matrix.fromArray(A.transform.matrix),T.matrix.decompose(T.position,T.rotation,T.scale),T.matrixWorldNeedsUpdate=!0,A.linearVelocity?(T.hasLinearVelocity=!0,T.linearVelocity.copy(A.linearVelocity)):T.hasLinearVelocity=!1,A.angularVelocity?(T.hasAngularVelocity=!0,T.angularVelocity.copy(A.angularVelocity)):T.hasAngularVelocity=!1));i!==null&&(N=D.getPose(M.targetRaySpace,t),N===null&&A!==null&&(N=A),N!==null&&(i.matrix.fromArray(N.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,N.linearVelocity?(i.hasLinearVelocity=!0,i.linearVelocity.copy(N.linearVelocity)):i.hasLinearVelocity=!1,N.angularVelocity?(i.hasAngularVelocity=!0,i.angularVelocity.copy(N.angularVelocity)):i.hasAngularVelocity=!1,this.dispatchEvent(pc)))}return i!==null&&(i.visible=N!==null),T!==null&&(T.visible=A!==null),I!==null&&(I.visible=z!==null),this}_getHandJoint(M,D){if(M.joints[D.jointName]===void 0){const t=new aN;t.matrixAutoUpdate=!1,t.visible=!1,M.joints[D.jointName]=t,M.add(t)}return M.joints[D.jointName]}}class Yc extends JD{constructor(M,D,t,N,A,z,i,T,I,n){if(n=n!==void 0?n:et,n!==et&&n!==qt)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");t===void 0&&n===et&&(t=$e),t===void 0&&n===qt&&(t=Bt),super(null,N,A,z,i,T,n,t,I),this.isDepthTexture=!0,this.image={width:M,height:D},this.magFilter=i!==void 0?i:cD,this.minFilter=T!==void 0?T:cD,this.flipY=!1,this.generateMipmaps=!1}}class Uc extends DN{constructor(M,D){super();const t=this;let N=null,A=1,z=null,i="local-floor",T=1,I=null,n=null,u=null,g=null,r=null,a=null;const c=D.getContextAttributes();let j=null,s=null;const L=[],y=[],x=new Set,O=new Map,h=new ZD;h.layers.enable(1),h.viewport=new ND;const d=new ZD;d.layers.enable(2),d.viewport=new ND;const G=[h,d],o=new dc;o.layers.enable(1),o.layers.enable(2);let l=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(S){let W=L[S];return W===void 0&&(W=new pi,L[S]=W),W.getTargetRaySpace()},this.getControllerGrip=function(S){let W=L[S];return W===void 0&&(W=new pi,L[S]=W),W.getGripSpace()},this.getHand=function(S){let W=L[S];return W===void 0&&(W=new pi,L[S]=W),W.getHandSpace()};function K(S){const W=y.indexOf(S.inputSource);if(W===-1)return;const IM=L[W];IM!==void 0&&(IM.update(S.inputSource,S.frame,I||z),IM.dispatchEvent({type:S.type,data:S.inputSource}))}function m(){N.removeEventListener("select",K),N.removeEventListener("selectstart",K),N.removeEventListener("selectend",K),N.removeEventListener("squeeze",K),N.removeEventListener("squeezestart",K),N.removeEventListener("squeezeend",K),N.removeEventListener("end",m),N.removeEventListener("inputsourceschange",f);for(let S=0;S<L.length;S++){const W=y[S];W!==null&&(y[S]=null,L[S].disconnect(W))}l=null,F=null,M.setRenderTarget(j),r=null,g=null,u=null,N=null,s=null,zM.stop(),t.isPresenting=!1,t.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(S){A=S,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(S){i=S,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return I||z},this.setReferenceSpace=function(S){I=S},this.getBaseLayer=function(){return g!==null?g:r},this.getBinding=function(){return u},this.getFrame=function(){return a},this.getSession=function(){return N},this.setSession=async function(S){if(N=S,N!==null){if(j=M.getRenderTarget(),N.addEventListener("select",K),N.addEventListener("selectstart",K),N.addEventListener("selectend",K),N.addEventListener("squeeze",K),N.addEventListener("squeezestart",K),N.addEventListener("squeezeend",K),N.addEventListener("end",m),N.addEventListener("inputsourceschange",f),c.xrCompatible!==!0&&await D.makeXRCompatible(),N.renderState.layers===void 0||M.capabilities.isWebGL2===!1){const W={antialias:N.renderState.layers===void 0?c.antialias:!0,alpha:!0,depth:c.depth,stencil:c.stencil,framebufferScaleFactor:A};r=new XRWebGLLayer(N,D,W),N.updateRenderState({baseLayer:r}),s=new It(r.framebufferWidth,r.framebufferHeight,{format:qD,type:it,colorSpace:M.outputColorSpace,stencilBuffer:c.stencil})}else{let W=null,IM=null,iM=null;c.depth&&(iM=c.stencil?D.DEPTH24_STENCIL8:D.DEPTH_COMPONENT24,W=c.stencil?qt:et,IM=c.stencil?Bt:$e);const p={colorFormat:D.RGBA8,depthFormat:iM,scaleFactor:A};u=new XRWebGLBinding(N,D),g=u.createProjectionLayer(p),N.updateRenderState({layers:[g]}),s=new It(g.textureWidth,g.textureHeight,{format:qD,type:it,depthTexture:new Yc(g.textureWidth,g.textureHeight,IM,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:c.stencil,colorSpace:M.outputColorSpace,samples:c.antialias?4:0});const EM=M.properties.get(s);EM.__ignoreDepthValues=g.ignoreDepthValues}s.isXRRenderTarget=!0,this.setFoveation(T),I=null,z=await N.requestReferenceSpace(i),zM.setContext(N),zM.start(),t.isPresenting=!0,t.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(N!==null)return N.environmentBlendMode};function f(S){for(let W=0;W<S.removed.length;W++){const IM=S.removed[W],iM=y.indexOf(IM);iM>=0&&(y[iM]=null,L[iM].disconnect(IM))}for(let W=0;W<S.added.length;W++){const IM=S.added[W];let iM=y.indexOf(IM);if(iM===-1){for(let EM=0;EM<L.length;EM++)if(EM>=y.length){y.push(IM),iM=EM;break}else if(y[EM]===null){y[EM]=IM,iM=EM;break}if(iM===-1)break}const p=L[iM];p&&p.connect(IM)}}const k=new Y,J=new Y;function V(S,W,IM){k.setFromMatrixPosition(W.matrixWorld),J.setFromMatrixPosition(IM.matrixWorld);const iM=k.distanceTo(J),p=W.projectionMatrix.elements,EM=IM.projectionMatrix.elements,OM=p[14]/(p[10]-1),eM=p[14]/(p[10]+1),CM=(p[9]+1)/p[5],SM=(p[9]-1)/p[5],aM=(p[8]-1)/p[0],dM=(EM[8]+1)/EM[0],MD=OM*aM,AD=OM*dM,DD=iM/(-aM+dM),qM=DD*-aM;W.matrixWorld.decompose(S.position,S.quaternion,S.scale),S.translateX(qM),S.translateZ(DD),S.matrixWorld.compose(S.position,S.quaternion,S.scale),S.matrixWorldInverse.copy(S.matrixWorld).invert();const fM=OM+DD,FM=eM+DD,oD=MD-qM,E=AD+(iM-qM),C=CM*eM/FM*fM,Z=SM*eM/FM*fM;S.projectionMatrix.makePerspective(oD,E,C,Z,fM,FM),S.projectionMatrixInverse.copy(S.projectionMatrix).invert()}function H(S,W){W===null?S.matrixWorld.copy(S.matrix):S.matrixWorld.multiplyMatrices(W.matrixWorld,S.matrix),S.matrixWorldInverse.copy(S.matrixWorld).invert()}this.updateCamera=function(S){if(N===null)return;o.near=d.near=h.near=S.near,o.far=d.far=h.far=S.far,(l!==o.near||F!==o.far)&&(N.updateRenderState({depthNear:o.near,depthFar:o.far}),l=o.near,F=o.far);const W=S.parent,IM=o.cameras;H(o,W);for(let iM=0;iM<IM.length;iM++)H(IM[iM],W);IM.length===2?V(o,h,d):o.projectionMatrix.copy(h.projectionMatrix),X(S,o,W)};function X(S,W,IM){IM===null?S.matrix.copy(W.matrixWorld):(S.matrix.copy(IM.matrixWorld),S.matrix.invert(),S.matrix.multiply(W.matrixWorld)),S.matrix.decompose(S.position,S.quaternion,S.scale),S.updateMatrixWorld(!0);const iM=S.children;for(let p=0,EM=iM.length;p<EM;p++)iM[p].updateMatrixWorld(!0);S.projectionMatrix.copy(W.projectionMatrix),S.projectionMatrixInverse.copy(W.projectionMatrixInverse),S.isPerspectiveCamera&&(S.fov=iz*2*Math.atan(1/S.projectionMatrix.elements[5]),S.zoom=1)}this.getCamera=function(){return o},this.getFoveation=function(){if(!(g===null&&r===null))return T},this.setFoveation=function(S){T=S,g!==null&&(g.fixedFoveation=S),r!==null&&r.fixedFoveation!==void 0&&(r.fixedFoveation=S)},this.getPlanes=function(){return x};let $=null;function gM(S,W){if(n=W.getViewerPose(I||z),a=W,n!==null){const IM=n.views;r!==null&&(M.setRenderTargetFramebuffer(s,r.framebuffer),M.setRenderTarget(s));let iM=!1;IM.length!==o.cameras.length&&(o.cameras.length=0,iM=!0);for(let p=0;p<IM.length;p++){const EM=IM[p];let OM=null;if(r!==null)OM=r.getViewport(EM);else{const CM=u.getViewSubImage(g,EM);OM=CM.viewport,p===0&&(M.setRenderTargetTextures(s,CM.colorTexture,g.ignoreDepthValues?void 0:CM.depthStencilTexture),M.setRenderTarget(s))}let eM=G[p];eM===void 0&&(eM=new ZD,eM.layers.enable(p),eM.viewport=new ND,G[p]=eM),eM.matrix.fromArray(EM.transform.matrix),eM.matrix.decompose(eM.position,eM.quaternion,eM.scale),eM.projectionMatrix.fromArray(EM.projectionMatrix),eM.projectionMatrixInverse.copy(eM.projectionMatrix).invert(),eM.viewport.set(OM.x,OM.y,OM.width,OM.height),p===0&&(o.matrix.copy(eM.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale)),iM===!0&&o.cameras.push(eM)}}for(let IM=0;IM<L.length;IM++){const iM=y[IM],p=L[IM];iM!==null&&p!==void 0&&p.update(iM,W,I||z)}if($&&$(S,W),W.detectedPlanes){t.dispatchEvent({type:"planesdetected",data:W.detectedPlanes});let IM=null;for(const iM of x)W.detectedPlanes.has(iM)||(IM===null&&(IM=[]),IM.push(iM));if(IM!==null)for(const iM of IM)x.delete(iM),O.delete(iM),t.dispatchEvent({type:"planeremoved",data:iM});for(const iM of W.detectedPlanes)if(!x.has(iM))x.add(iM),O.set(iM,W.lastChangedTime),t.dispatchEvent({type:"planeadded",data:iM});else{const p=O.get(iM);iM.lastChangedTime>p&&(O.set(iM,iM.lastChangedTime),t.dispatchEvent({type:"planechanged",data:iM}))}}a=null}const zM=new ln;zM.setAnimationLoop(gM),this.setAnimationLoop=function(S){$=S},this.dispose=function(){}}}function mc(e,M){function D(j,s){j.matrixAutoUpdate===!0&&j.updateMatrix(),s.value.copy(j.matrix)}function t(j,s){s.color.getRGB(j.fogColor.value,hn(e)),s.isFog?(j.fogNear.value=s.near,j.fogFar.value=s.far):s.isFogExp2&&(j.fogDensity.value=s.density)}function N(j,s,L,y,x){s.isMeshBasicMaterial||s.isMeshLambertMaterial?A(j,s):s.isMeshToonMaterial?(A(j,s),u(j,s)):s.isMeshPhongMaterial?(A(j,s),n(j,s)):s.isMeshStandardMaterial?(A(j,s),g(j,s),s.isMeshPhysicalMaterial&&r(j,s,x)):s.isMeshMatcapMaterial?(A(j,s),a(j,s)):s.isMeshDepthMaterial?A(j,s):s.isMeshDistanceMaterial?(A(j,s),c(j,s)):s.isMeshNormalMaterial?A(j,s):s.isLineBasicMaterial?(z(j,s),s.isLineDashedMaterial&&i(j,s)):s.isPointsMaterial?T(j,s,L,y):s.isSpriteMaterial?I(j,s):s.isShadowMaterial?(j.color.value.copy(s.color),j.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}function A(j,s){j.opacity.value=s.opacity,s.color&&j.diffuse.value.copy(s.color),s.emissive&&j.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(j.map.value=s.map,D(s.map,j.mapTransform)),s.alphaMap&&(j.alphaMap.value=s.alphaMap,D(s.alphaMap,j.alphaMapTransform)),s.bumpMap&&(j.bumpMap.value=s.bumpMap,D(s.bumpMap,j.bumpMapTransform),j.bumpScale.value=s.bumpScale,s.side===wD&&(j.bumpScale.value*=-1)),s.normalMap&&(j.normalMap.value=s.normalMap,D(s.normalMap,j.normalMapTransform),j.normalScale.value.copy(s.normalScale),s.side===wD&&j.normalScale.value.negate()),s.displacementMap&&(j.displacementMap.value=s.displacementMap,D(s.displacementMap,j.displacementMapTransform),j.displacementScale.value=s.displacementScale,j.displacementBias.value=s.displacementBias),s.emissiveMap&&(j.emissiveMap.value=s.emissiveMap,D(s.emissiveMap,j.emissiveMapTransform)),s.specularMap&&(j.specularMap.value=s.specularMap,D(s.specularMap,j.specularMapTransform)),s.alphaTest>0&&(j.alphaTest.value=s.alphaTest);const L=M.get(s).envMap;if(L&&(j.envMap.value=L,j.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,j.reflectivity.value=s.reflectivity,j.ior.value=s.ior,j.refractionRatio.value=s.refractionRatio),s.lightMap){j.lightMap.value=s.lightMap;const y=e.useLegacyLights===!0?Math.PI:1;j.lightMapIntensity.value=s.lightMapIntensity*y,D(s.lightMap,j.lightMapTransform)}s.aoMap&&(j.aoMap.value=s.aoMap,j.aoMapIntensity.value=s.aoMapIntensity,D(s.aoMap,j.aoMapTransform))}function z(j,s){j.diffuse.value.copy(s.color),j.opacity.value=s.opacity,s.map&&(j.map.value=s.map,D(s.map,j.mapTransform))}function i(j,s){j.dashSize.value=s.dashSize,j.totalSize.value=s.dashSize+s.gapSize,j.scale.value=s.scale}function T(j,s,L,y){j.diffuse.value.copy(s.color),j.opacity.value=s.opacity,j.size.value=s.size*L,j.scale.value=y*.5,s.map&&(j.map.value=s.map,D(s.map,j.uvTransform)),s.alphaMap&&(j.alphaMap.value=s.alphaMap),s.alphaTest>0&&(j.alphaTest.value=s.alphaTest)}function I(j,s){j.diffuse.value.copy(s.color),j.opacity.value=s.opacity,j.rotation.value=s.rotation,s.map&&(j.map.value=s.map,D(s.map,j.mapTransform)),s.alphaMap&&(j.alphaMap.value=s.alphaMap),s.alphaTest>0&&(j.alphaTest.value=s.alphaTest)}function n(j,s){j.specular.value.copy(s.specular),j.shininess.value=Math.max(s.shininess,1e-4)}function u(j,s){s.gradientMap&&(j.gradientMap.value=s.gradientMap)}function g(j,s){j.metalness.value=s.metalness,s.metalnessMap&&(j.metalnessMap.value=s.metalnessMap,D(s.metalnessMap,j.metalnessMapTransform)),j.roughness.value=s.roughness,s.roughnessMap&&(j.roughnessMap.value=s.roughnessMap,D(s.roughnessMap,j.roughnessMapTransform)),M.get(s).envMap&&(j.envMapIntensity.value=s.envMapIntensity)}function r(j,s,L){j.ior.value=s.ior,s.sheen>0&&(j.sheenColor.value.copy(s.sheenColor).multiplyScalar(s.sheen),j.sheenRoughness.value=s.sheenRoughness,s.sheenColorMap&&(j.sheenColorMap.value=s.sheenColorMap,D(s.sheenColorMap,j.sheenColorMapTransform)),s.sheenRoughnessMap&&(j.sheenRoughnessMap.value=s.sheenRoughnessMap,D(s.sheenRoughnessMap,j.sheenRoughnessMapTransform))),s.clearcoat>0&&(j.clearcoat.value=s.clearcoat,j.clearcoatRoughness.value=s.clearcoatRoughness,s.clearcoatMap&&(j.clearcoatMap.value=s.clearcoatMap,D(s.clearcoatMap,j.clearcoatMapTransform)),s.clearcoatRoughnessMap&&(j.clearcoatRoughnessMap.value=s.clearcoatRoughnessMap,D(s.clearcoatRoughnessMap,j.clearcoatRoughnessMapTransform)),s.clearcoatNormalMap&&(j.clearcoatNormalMap.value=s.clearcoatNormalMap,D(s.clearcoatNormalMap,j.clearcoatNormalMapTransform),j.clearcoatNormalScale.value.copy(s.clearcoatNormalScale),s.side===wD&&j.clearcoatNormalScale.value.negate())),s.iridescence>0&&(j.iridescence.value=s.iridescence,j.iridescenceIOR.value=s.iridescenceIOR,j.iridescenceThicknessMinimum.value=s.iridescenceThicknessRange[0],j.iridescenceThicknessMaximum.value=s.iridescenceThicknessRange[1],s.iridescenceMap&&(j.iridescenceMap.value=s.iridescenceMap,D(s.iridescenceMap,j.iridescenceMapTransform)),s.iridescenceThicknessMap&&(j.iridescenceThicknessMap.value=s.iridescenceThicknessMap,D(s.iridescenceThicknessMap,j.iridescenceThicknessMapTransform))),s.transmission>0&&(j.transmission.value=s.transmission,j.transmissionSamplerMap.value=L.texture,j.transmissionSamplerSize.value.set(L.width,L.height),s.transmissionMap&&(j.transmissionMap.value=s.transmissionMap,D(s.transmissionMap,j.transmissionMapTransform)),j.thickness.value=s.thickness,s.thicknessMap&&(j.thicknessMap.value=s.thicknessMap,D(s.thicknessMap,j.thicknessMapTransform)),j.attenuationDistance.value=s.attenuationDistance,j.attenuationColor.value.copy(s.attenuationColor)),j.specularIntensity.value=s.specularIntensity,j.specularColor.value.copy(s.specularColor),s.specularColorMap&&(j.specularColorMap.value=s.specularColorMap,D(s.specularColorMap,j.specularColorMapTransform)),s.specularIntensityMap&&(j.specularIntensityMap.value=s.specularIntensityMap,D(s.specularIntensityMap,j.specularIntensityMapTransform))}function a(j,s){s.matcap&&(j.matcap.value=s.matcap)}function c(j,s){const L=M.get(s).light;j.referencePosition.value.setFromMatrixPosition(L.matrixWorld),j.nearDistance.value=L.shadow.camera.near,j.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:t,refreshMaterialUniforms:N}}function Qc(e,M,D,t){let N={},A={},z=[];const i=D.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function T(L,y){const x=y.program;t.uniformBlockBinding(L,x)}function I(L,y){let x=N[L.id];x===void 0&&(a(L),x=n(L),N[L.id]=x,L.addEventListener("dispose",j));const O=y.program;t.updateUBOMapping(L,O);const h=M.render.frame;A[L.id]!==h&&(g(L),A[L.id]=h)}function n(L){const y=u();L.__bindingPointIndex=y;const x=e.createBuffer(),O=L.__size,h=L.usage;return e.bindBuffer(e.UNIFORM_BUFFER,x),e.bufferData(e.UNIFORM_BUFFER,O,h),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,y,x),x}function u(){for(let L=0;L<i;L++)if(z.indexOf(L)===-1)return z.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(L){const y=N[L.id],x=L.uniforms,O=L.__cache;e.bindBuffer(e.UNIFORM_BUFFER,y);for(let h=0,d=x.length;h<d;h++){const G=x[h];if(r(G,h,O)===!0){const o=G.__offset,l=Array.isArray(G.value)?G.value:[G.value];let F=0;for(let K=0;K<l.length;K++){const m=l[K],f=c(m);typeof m=="number"?(G.__data[0]=m,e.bufferSubData(e.UNIFORM_BUFFER,o+F,G.__data)):m.isMatrix3?(G.__data[0]=m.elements[0],G.__data[1]=m.elements[1],G.__data[2]=m.elements[2],G.__data[3]=m.elements[0],G.__data[4]=m.elements[3],G.__data[5]=m.elements[4],G.__data[6]=m.elements[5],G.__data[7]=m.elements[0],G.__data[8]=m.elements[6],G.__data[9]=m.elements[7],G.__data[10]=m.elements[8],G.__data[11]=m.elements[0]):(m.toArray(G.__data,F),F+=f.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,o,G.__data)}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function r(L,y,x){const O=L.value;if(x[y]===void 0){if(typeof O=="number")x[y]=O;else{const h=Array.isArray(O)?O:[O],d=[];for(let G=0;G<h.length;G++)d.push(h[G].clone());x[y]=d}return!0}else if(typeof O=="number"){if(x[y]!==O)return x[y]=O,!0}else{const h=Array.isArray(x[y])?x[y]:[x[y]],d=Array.isArray(O)?O:[O];for(let G=0;G<h.length;G++){const o=h[G];if(o.equals(d[G])===!1)return o.copy(d[G]),!0}}return!1}function a(L){const y=L.uniforms;let x=0;const O=16;let h=0;for(let d=0,G=y.length;d<G;d++){const o=y[d],l={boundary:0,storage:0},F=Array.isArray(o.value)?o.value:[o.value];for(let K=0,m=F.length;K<m;K++){const f=F[K],k=c(f);l.boundary+=k.boundary,l.storage+=k.storage}if(o.__data=new Float32Array(l.storage/Float32Array.BYTES_PER_ELEMENT),o.__offset=x,d>0){h=x%O;const K=O-h;h!==0&&K-l.boundary<0&&(x+=O-h,o.__offset=x)}x+=l.storage}return h=x%O,h>0&&(x+=O-h),L.__size=x,L.__cache={},this}function c(L){const y={boundary:0,storage:0};return typeof L=="number"?(y.boundary=4,y.storage=4):L.isVector2?(y.boundary=8,y.storage=8):L.isVector3||L.isColor?(y.boundary=16,y.storage=12):L.isVector4?(y.boundary=16,y.storage=16):L.isMatrix3?(y.boundary=48,y.storage=48):L.isMatrix4?(y.boundary=64,y.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),y}function j(L){const y=L.target;y.removeEventListener("dispose",j);const x=z.indexOf(y.__bindingPointIndex);z.splice(x,1),e.deleteBuffer(N[y.id]),delete N[y.id],delete A[y.id]}function s(){for(const L in N)e.deleteBuffer(N[L]);z=[],N={},A={}}return{bind:T,update:I,dispose:s}}function kc(){const e=ON("canvas");return e.style.display="block",e}class Sc{constructor(M={}){const{canvas:D=kc(),context:t=null,depth:N=!0,stencil:A=!0,alpha:z=!1,antialias:i=!1,premultipliedAlpha:T=!0,preserveDrawingBuffer:I=!1,powerPreference:n="default",failIfMajorPerformanceCaveat:u=!1}=M;this.isWebGLRenderer=!0;let g;t!==null?g=t.getContextAttributes().alpha:g=z;let r=null,a=null;const c=[],j=[];this.domElement=D,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputColorSpace=lM,this.useLegacyLights=!0,this.toneMapping=le,this.toneMappingExposure=1;const s=this;let L=!1,y=0,x=0,O=null,h=-1,d=null;const G=new ND,o=new ND;let l=null,F=D.width,K=D.height,m=1,f=null,k=null;const J=new ND(0,0,F,K),V=new ND(0,0,F,K);let H=!1;const X=new wz;let $=!1,gM=!1,zM=null;const S=new iD,W=new Y,IM={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function iM(){return O===null?m:1}let p=t;function EM(w,Q){for(let b=0;b<w.length;b++){const U=w[b],R=D.getContext(U,Q);if(R!==null)return R}return null}try{const w={alpha:!0,depth:N,stencil:A,antialias:i,premultipliedAlpha:T,preserveDrawingBuffer:I,powerPreference:n,failIfMajorPerformanceCaveat:u};if("setAttribute"in D&&D.setAttribute("data-engine",`three.js r${Su}`),D.addEventListener("webglcontextlost",rM,!1),D.addEventListener("webglcontextrestored",UM,!1),D.addEventListener("webglcontextcreationerror",ZM,!1),p===null){const Q=["webgl2","webgl","experimental-webgl"];if(s.isWebGL1Renderer===!0&&Q.shift(),p=EM(Q,w),p===null)throw EM(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}p.getShaderPrecisionFormat===void 0&&(p.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let OM,eM,CM,SM,aM,dM,MD,AD,DD,qM,fM,FM,oD,E,C,Z,MM,DM,NM,LM,nM,B,sM,cM;function oM(){OM=new Ba(p),eM=new fa(p,OM,M),OM.init(eM),B=new vc(p,OM,eM),CM=new lc(p,OM,eM),SM=new Va(p),aM=new gc,dM=new hc(p,OM,CM,aM,eM,B,SM),MD=new Ka(s),AD=new Fa(s),DD=new Mr(p,eM),sM=new ka(p,OM,DD,eM),qM=new Ha(p,DD,SM,sM),fM=new Ja(p,qM,DD,SM),NM=new qa(p,eM,dM),Z=new Za(aM),FM=new uc(s,MD,AD,OM,eM,sM,Z),oD=new mc(s,aM),E=new sc,C=new Cc(OM,eM),DM=new Qa(s,MD,AD,CM,fM,g,T),MM=new Ec(s,fM,eM),cM=new Qc(p,SM,eM,CM),LM=new Sa(p,OM,SM,eM),nM=new Ga(p,OM,SM,eM),SM.programs=FM.programs,s.capabilities=eM,s.extensions=OM,s.properties=aM,s.renderLists=E,s.shadowMap=MM,s.state=CM,s.info=SM}oM();const TM=new Uc(s,p);this.xr=TM,this.getContext=function(){return p},this.getContextAttributes=function(){return p.getContextAttributes()},this.forceContextLoss=function(){const w=OM.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=OM.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return m},this.setPixelRatio=function(w){w!==void 0&&(m=w,this.setSize(F,K,!1))},this.getSize=function(w){return w.set(F,K)},this.setSize=function(w,Q,b=!0){if(TM.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=w,K=Q,D.width=Math.floor(w*m),D.height=Math.floor(Q*m),b===!0&&(D.style.width=w+"px",D.style.height=Q+"px"),this.setViewport(0,0,w,Q)},this.getDrawingBufferSize=function(w){return w.set(F*m,K*m).floor()},this.setDrawingBufferSize=function(w,Q,b){F=w,K=Q,m=b,D.width=Math.floor(w*b),D.height=Math.floor(Q*b),this.setViewport(0,0,w,Q)},this.getCurrentViewport=function(w){return w.copy(G)},this.getViewport=function(w){return w.copy(J)},this.setViewport=function(w,Q,b,U){w.isVector4?J.set(w.x,w.y,w.z,w.w):J.set(w,Q,b,U),CM.viewport(G.copy(J).multiplyScalar(m).floor())},this.getScissor=function(w){return w.copy(V)},this.setScissor=function(w,Q,b,U){w.isVector4?V.set(w.x,w.y,w.z,w.w):V.set(w,Q,b,U),CM.scissor(o.copy(V).multiplyScalar(m).floor())},this.getScissorTest=function(){return H},this.setScissorTest=function(w){CM.setScissorTest(H=w)},this.setOpaqueSort=function(w){f=w},this.setTransparentSort=function(w){k=w},this.getClearColor=function(w){return w.copy(DM.getClearColor())},this.setClearColor=function(){DM.setClearColor.apply(DM,arguments)},this.getClearAlpha=function(){return DM.getClearAlpha()},this.setClearAlpha=function(){DM.setClearAlpha.apply(DM,arguments)},this.clear=function(w=!0,Q=!0,b=!0){let U=0;w&&(U|=p.COLOR_BUFFER_BIT),Q&&(U|=p.DEPTH_BUFFER_BIT),b&&(U|=p.STENCIL_BUFFER_BIT),p.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){D.removeEventListener("webglcontextlost",rM,!1),D.removeEventListener("webglcontextrestored",UM,!1),D.removeEventListener("webglcontextcreationerror",ZM,!1),E.dispose(),C.dispose(),aM.dispose(),MD.dispose(),AD.dispose(),fM.dispose(),sM.dispose(),cM.dispose(),FM.dispose(),TM.dispose(),TM.removeEventListener("sessionstart",yM),TM.removeEventListener("sessionend",KM),zM&&(zM.dispose(),zM=null),_M.stop()};function rM(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function UM(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const w=SM.autoReset,Q=MM.enabled,b=MM.autoUpdate,U=MM.needsUpdate,R=MM.type;oM(),SM.autoReset=w,MM.enabled=Q,MM.autoUpdate=b,MM.needsUpdate=U,MM.type=R}function ZM(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function BM(w){const Q=w.target;Q.removeEventListener("dispose",BM),v(Q)}function v(w){_(w),aM.remove(w)}function _(w){const Q=aM.get(w).programs;Q!==void 0&&(Q.forEach(function(b){FM.releaseProgram(b)}),w.isShaderMaterial&&FM.releaseShaderCache(w))}this.renderBufferDirect=function(w,Q,b,U,R,uM){Q===null&&(Q=IM);const wM=R.isMesh&&R.matrixWorld.determinant()<0,xM=Gn(w,Q,b,U,R);CM.setMaterial(U,wM);let vM=b.index,kM=1;U.wireframe===!0&&(vM=qM.getWireframeAttribute(b),kM=2);const YM=b.drawRange,pM=b.attributes.position;let RM=YM.start*kM,sD=(YM.start+YM.count)*kM;uM!==null&&(RM=Math.max(RM,uM.start*kM),sD=Math.min(sD,(uM.start+uM.count)*kM)),vM!==null?(RM=Math.max(RM,0),sD=Math.min(sD,vM.count)):pM!=null&&(RM=Math.max(RM,0),sD=Math.min(sD,pM.count));const bD=sD-RM;if(bD<0||bD===1/0)return;sM.setup(R,U,xM,b,vM);let Ke,GM=LM;if(vM!==null&&(Ke=DD.get(vM),GM=nM,GM.setIndex(Ke)),R.isMesh)U.wireframe===!0?(CM.setLineWidth(U.wireframeLinewidth*iM()),GM.setMode(p.LINES)):GM.setMode(p.TRIANGLES);else if(R.isLine){let mM=U.linewidth;mM===void 0&&(mM=1),CM.setLineWidth(mM*iM()),R.isLineSegments?GM.setMode(p.LINES):R.isLineLoop?GM.setMode(p.LINE_LOOP):GM.setMode(p.LINE_STRIP)}else R.isPoints?GM.setMode(p.POINTS):R.isSprite&&GM.setMode(p.TRIANGLES);if(R.isInstancedMesh)GM.renderInstances(RM,bD,R.count);else if(b.isInstancedBufferGeometry){const mM=b._maxInstanceCount!==void 0?b._maxInstanceCount:1/0,VA=Math.min(b.instanceCount,mM);GM.renderInstances(RM,bD,VA)}else GM.render(RM,bD)},this.compile=function(w,Q){function b(U,R,uM){U.transparent===!0&&U.side===xe&&U.forceSinglePass===!1?(U.side=wD,U.needsUpdate=!0,kN(U,R,uM),U.side=Ze,U.needsUpdate=!0,kN(U,R,uM),U.side=xe):kN(U,R,uM)}a=C.get(w),a.init(),j.push(a),w.traverseVisible(function(U){U.isLight&&U.layers.test(Q.layers)&&(a.pushLight(U),U.castShadow&&a.pushShadow(U))}),a.setupLights(s.useLegacyLights),w.traverse(function(U){const R=U.material;if(R)if(Array.isArray(R))for(let uM=0;uM<R.length;uM++){const wM=R[uM];b(wM,w,U)}else b(R,w,U)}),j.pop(),a=null};let q=null;function AM(w){q&&q(w)}function yM(){_M.stop()}function KM(){_M.start()}const _M=new ln;_M.setAnimationLoop(AM),typeof self<"u"&&_M.setContext(self),this.setAnimationLoop=function(w){q=w,TM.setAnimationLoop(w),w===null?_M.stop():_M.start()},TM.addEventListener("sessionstart",yM),TM.addEventListener("sessionend",KM),this.render=function(w,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),TM.enabled===!0&&TM.isPresenting===!0&&(TM.cameraAutoUpdate===!0&&TM.updateCamera(Q),Q=TM.getCamera()),w.isScene===!0&&w.onBeforeRender(s,w,Q,O),a=C.get(w,j.length),a.init(),j.push(a),S.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),X.setFromProjectionMatrix(S),gM=this.localClippingEnabled,$=Z.init(this.clippingPlanes,gM),r=E.get(w,c.length),r.init(),c.push(r),zD(w,Q,0,s.sortObjects),r.finish(),s.sortObjects===!0&&r.sort(f,k),$===!0&&Z.beginShadows();const b=a.state.shadowsArray;if(MM.render(b,w,Q),$===!0&&Z.endShadows(),this.info.autoReset===!0&&this.info.reset(),DM.render(r,w),a.setupLights(s.useLegacyLights),Q.isArrayCamera){const U=Q.cameras;for(let R=0,uM=U.length;R<uM;R++){const wM=U[R];ve(r,w,wM,wM.viewport)}}else ve(r,w,Q);O!==null&&(dM.updateMultisampleRenderTarget(O),dM.updateRenderTargetMipmap(O)),w.isScene===!0&&w.onAfterRender(s,w,Q),sM.resetDefaultState(),h=-1,d=null,j.pop(),j.length>0?a=j[j.length-1]:a=null,c.pop(),c.length>0?r=c[c.length-1]:r=null};function zD(w,Q,b,U){if(w.visible===!1)return;if(w.layers.test(Q.layers)){if(w.isGroup)b=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(Q);else if(w.isLight)a.pushLight(w),w.castShadow&&a.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){U&&W.setFromMatrixPosition(w.matrixWorld).applyMatrix4(S);const uM=fM.update(w),wM=w.material;wM.visible&&r.push(w,uM,wM,b,W.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){w.isSkinnedMesh&&w.skeleton.frame!==SM.render.frame&&(w.skeleton.update(),w.skeleton.frame=SM.render.frame);const uM=fM.update(w),wM=w.material;if(U&&(uM.boundingSphere===null&&uM.computeBoundingSphere(),W.copy(uM.boundingSphere.center).applyMatrix4(w.matrixWorld).applyMatrix4(S)),Array.isArray(wM)){const xM=uM.groups;for(let vM=0,kM=xM.length;vM<kM;vM++){const YM=xM[vM],pM=wM[YM.materialIndex];pM&&pM.visible&&r.push(w,uM,pM,b,W.z,YM)}}else wM.visible&&r.push(w,uM,wM,b,W.z,null)}}const R=w.children;for(let uM=0,wM=R.length;uM<wM;uM++)zD(R[uM],Q,b,U)}function ve(w,Q,b,U){const R=w.opaque,uM=w.transmissive,wM=w.transparent;a.setupLightsView(b),$===!0&&Z.setGlobalState(s.clippingPlanes,b),uM.length>0&&HM(R,uM,Q,b),U&&CM.viewport(G.copy(U)),R.length>0&&UD(R,Q,b),uM.length>0&&UD(uM,Q,b),wM.length>0&&UD(wM,Q,b),CM.buffers.depth.setTest(!0),CM.buffers.depth.setMask(!0),CM.buffers.color.setMask(!0),CM.setPolygonOffset(!1)}function HM(w,Q,b,U){if(zM===null){const xM=eM.isWebGL2;zM=new It(1024,1024,{generateMipmaps:!0,type:OM.has("EXT_color_buffer_half_float")?wN:it,minFilter:LN,samples:xM&&i===!0?4:0})}const R=s.getRenderTarget();s.setRenderTarget(zM),s.clear();const uM=s.toneMapping;s.toneMapping=le,UD(w,b,U),dM.updateMultisampleRenderTarget(zM),dM.updateRenderTargetMipmap(zM);let wM=!1;for(let xM=0,vM=Q.length;xM<vM;xM++){const kM=Q[xM],YM=kM.object,pM=kM.geometry,RM=kM.material,sD=kM.group;if(RM.side===xe&&YM.layers.test(U.layers)){const bD=RM.side;RM.side=wD,RM.needsUpdate=!0,$D(YM,b,U,pM,RM,sD),RM.side=bD,RM.needsUpdate=!0,wM=!0}}wM===!0&&(dM.updateMultisampleRenderTarget(zM),dM.updateRenderTargetMipmap(zM)),s.setRenderTarget(R),s.toneMapping=uM}function UD(w,Q,b){const U=Q.isScene===!0?Q.overrideMaterial:null;for(let R=0,uM=w.length;R<uM;R++){const wM=w[R],xM=wM.object,vM=wM.geometry,kM=U===null?wM.material:U,YM=wM.group;xM.layers.test(b.layers)&&$D(xM,Q,b,vM,kM,YM)}}function $D(w,Q,b,U,R,uM){w.onBeforeRender(s,Q,b,U,R,uM),w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),R.onBeforeRender(s,Q,b,U,w,uM),R.transparent===!0&&R.side===xe&&R.forceSinglePass===!1?(R.side=wD,R.needsUpdate=!0,s.renderBufferDirect(b,Q,U,R,w,uM),R.side=Ze,R.needsUpdate=!0,s.renderBufferDirect(b,Q,U,R,w,uM),R.side=xe):s.renderBufferDirect(b,Q,U,R,w,uM),w.onAfterRender(s,Q,b,U,R,uM)}function kN(w,Q,b){Q.isScene!==!0&&(Q=IM);const U=aM.get(w),R=a.state.lights,uM=a.state.shadowsArray,wM=R.state.version,xM=FM.getParameters(w,R.state,uM,Q,b),vM=FM.getProgramCacheKey(xM);let kM=U.programs;U.environment=w.isMeshStandardMaterial?Q.environment:null,U.fog=Q.fog,U.envMap=(w.isMeshStandardMaterial?AD:MD).get(w.envMap||U.environment),kM===void 0&&(w.addEventListener("dispose",BM),kM=new Map,U.programs=kM);let YM=kM.get(vM);if(YM!==void 0){if(U.currentProgram===YM&&U.lightsStateVersion===wM)return Yz(w,xM),YM}else xM.uniforms=FM.getUniforms(w),w.onBuild(b,xM,s),w.onBeforeCompile(xM,s),YM=FM.acquireProgram(xM,vM),kM.set(vM,YM),U.uniforms=xM.uniforms;const pM=U.uniforms;(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(pM.clippingPlanes=Z.uniform),Yz(w,xM),U.needsLights=Wn(w),U.lightsStateVersion=wM,U.needsLights&&(pM.ambientLightColor.value=R.state.ambient,pM.lightProbe.value=R.state.probe,pM.directionalLights.value=R.state.directional,pM.directionalLightShadows.value=R.state.directionalShadow,pM.spotLights.value=R.state.spot,pM.spotLightShadows.value=R.state.spotShadow,pM.rectAreaLights.value=R.state.rectArea,pM.ltc_1.value=R.state.rectAreaLTC1,pM.ltc_2.value=R.state.rectAreaLTC2,pM.pointLights.value=R.state.point,pM.pointLightShadows.value=R.state.pointShadow,pM.hemisphereLights.value=R.state.hemi,pM.directionalShadowMap.value=R.state.directionalShadowMap,pM.directionalShadowMatrix.value=R.state.directionalShadowMatrix,pM.spotShadowMap.value=R.state.spotShadowMap,pM.spotLightMatrix.value=R.state.spotLightMatrix,pM.spotLightMap.value=R.state.spotLightMap,pM.pointShadowMap.value=R.state.pointShadowMap,pM.pointShadowMatrix.value=R.state.pointShadowMatrix);const RM=YM.getUniforms(),sD=mA.seqWithValue(RM.seq,pM);return U.currentProgram=YM,U.uniformsList=sD,YM}function Yz(w,Q){const b=aM.get(w);b.outputColorSpace=Q.outputColorSpace,b.instancing=Q.instancing,b.skinning=Q.skinning,b.morphTargets=Q.morphTargets,b.morphNormals=Q.morphNormals,b.morphColors=Q.morphColors,b.morphTargetsCount=Q.morphTargetsCount,b.numClippingPlanes=Q.numClippingPlanes,b.numIntersection=Q.numClipIntersection,b.vertexAlphas=Q.vertexAlphas,b.vertexTangents=Q.vertexTangents,b.toneMapping=Q.toneMapping}function Gn(w,Q,b,U,R){Q.isScene!==!0&&(Q=IM),dM.resetTextureUnits();const uM=Q.fog,wM=U.isMeshStandardMaterial?Q.environment:null,xM=O===null?s.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ze,vM=(U.isMeshStandardMaterial?AD:MD).get(U.envMap||wM),kM=U.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,YM=!!U.normalMap&&!!b.attributes.tangent,pM=!!b.morphAttributes.position,RM=!!b.morphAttributes.normal,sD=!!b.morphAttributes.color,bD=U.toneMapped?s.toneMapping:le,Ke=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,GM=Ke!==void 0?Ke.length:0,mM=aM.get(U),VA=a.state.lights;if($===!0&&(gM===!0||w!==d)){const xD=w===d&&U.id===h;Z.setState(U,w,xD)}let WA=!1;U.version===mM.__version?(mM.needsLights&&mM.lightsStateVersion!==VA.state.version||mM.outputColorSpace!==xM||R.isInstancedMesh&&mM.instancing===!1||!R.isInstancedMesh&&mM.instancing===!0||R.isSkinnedMesh&&mM.skinning===!1||!R.isSkinnedMesh&&mM.skinning===!0||mM.envMap!==vM||U.fog===!0&&mM.fog!==uM||mM.numClippingPlanes!==void 0&&(mM.numClippingPlanes!==Z.numPlanes||mM.numIntersection!==Z.numIntersection)||mM.vertexAlphas!==kM||mM.vertexTangents!==YM||mM.morphTargets!==pM||mM.morphNormals!==RM||mM.morphColors!==sD||mM.toneMapping!==bD||eM.isWebGL2===!0&&mM.morphTargetsCount!==GM)&&(WA=!0):(WA=!0,mM.__version=U.version);let Re=mM.currentProgram;WA===!0&&(Re=kN(U,Q,R));let Uz=!1,AN=!1,XA=!1;const aD=Re.getUniforms(),Pe=mM.uniforms;if(CM.useProgram(Re.program)&&(Uz=!0,AN=!0,XA=!0),U.id!==h&&(h=U.id,AN=!0),Uz||d!==w){if(aD.setValue(p,"projectionMatrix",w.projectionMatrix),eM.logarithmicDepthBuffer&&aD.setValue(p,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),d!==w&&(d=w,AN=!0,XA=!0),U.isShaderMaterial||U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshStandardMaterial||U.envMap){const xD=aD.map.cameraPosition;xD!==void 0&&xD.setValue(p,W.setFromMatrixPosition(w.matrixWorld))}(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&aD.setValue(p,"isOrthographic",w.isOrthographicCamera===!0),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial||U.isShadowMaterial||R.isSkinnedMesh)&&aD.setValue(p,"viewMatrix",w.matrixWorldInverse)}if(R.isSkinnedMesh){aD.setOptional(p,R,"bindMatrix"),aD.setOptional(p,R,"bindMatrixInverse");const xD=R.skeleton;xD&&(eM.floatVertexTextures?(xD.boneTexture===null&&xD.computeBoneTexture(),aD.setValue(p,"boneTexture",xD.boneTexture,dM),aD.setValue(p,"boneTextureSize",xD.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const qA=b.morphAttributes;if((qA.position!==void 0||qA.normal!==void 0||qA.color!==void 0&&eM.isWebGL2===!0)&&NM.update(R,b,Re),(AN||mM.receiveShadow!==R.receiveShadow)&&(mM.receiveShadow=R.receiveShadow,aD.setValue(p,"receiveShadow",R.receiveShadow)),U.isMeshGouraudMaterial&&U.envMap!==null&&(Pe.envMap.value=vM,Pe.flipEnvMap.value=vM.isCubeTexture&&vM.isRenderTargetTexture===!1?-1:1),AN&&(aD.setValue(p,"toneMappingExposure",s.toneMappingExposure),mM.needsLights&&Vn(Pe,XA),uM&&U.fog===!0&&oD.refreshFogUniforms(Pe,uM),oD.refreshMaterialUniforms(Pe,U,m,K,zM),mA.upload(p,mM.uniformsList,Pe,dM)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(mA.upload(p,mM.uniformsList,Pe,dM),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&aD.setValue(p,"center",R.center),aD.setValue(p,"modelViewMatrix",R.modelViewMatrix),aD.setValue(p,"normalMatrix",R.normalMatrix),aD.setValue(p,"modelMatrix",R.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){const xD=U.uniformsGroups;for(let JA=0,Xn=xD.length;JA<Xn;JA++)if(eM.isWebGL2){const mz=xD[JA];cM.update(mz,Re),cM.bind(mz,Re)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Re}function Vn(w,Q){w.ambientLightColor.needsUpdate=Q,w.lightProbe.needsUpdate=Q,w.directionalLights.needsUpdate=Q,w.directionalLightShadows.needsUpdate=Q,w.pointLights.needsUpdate=Q,w.pointLightShadows.needsUpdate=Q,w.spotLights.needsUpdate=Q,w.spotLightShadows.needsUpdate=Q,w.rectAreaLights.needsUpdate=Q,w.hemisphereLights.needsUpdate=Q}function Wn(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(w,Q,b){aM.get(w.texture).__webglTexture=Q,aM.get(w.depthTexture).__webglTexture=b;const U=aM.get(w);U.__hasExternalTextures=!0,U.__hasExternalTextures&&(U.__autoAllocateDepthBuffer=b===void 0,U.__autoAllocateDepthBuffer||OM.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),U.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,Q){const b=aM.get(w);b.__webglFramebuffer=Q,b.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(w,Q=0,b=0){O=w,y=Q,x=b;let U=!0,R=null,uM=!1,wM=!1;if(w){const xM=aM.get(w);xM.__useDefaultFramebuffer!==void 0?(CM.bindFramebuffer(p.FRAMEBUFFER,null),U=!1):xM.__webglFramebuffer===void 0?dM.setupRenderTarget(w):xM.__hasExternalTextures&&dM.rebindTextures(w,aM.get(w.texture).__webglTexture,aM.get(w.depthTexture).__webglTexture);const vM=w.texture;(vM.isData3DTexture||vM.isDataArrayTexture||vM.isCompressedArrayTexture)&&(wM=!0);const kM=aM.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(R=kM[Q],uM=!0):eM.isWebGL2&&w.samples>0&&dM.useMultisampledRTT(w)===!1?R=aM.get(w).__webglMultisampledFramebuffer:R=kM,G.copy(w.viewport),o.copy(w.scissor),l=w.scissorTest}else G.copy(J).multiplyScalar(m).floor(),o.copy(V).multiplyScalar(m).floor(),l=H;if(CM.bindFramebuffer(p.FRAMEBUFFER,R)&&eM.drawBuffers&&U&&CM.drawBuffers(w,R),CM.viewport(G),CM.scissor(o),CM.setScissorTest(l),uM){const xM=aM.get(w.texture);p.framebufferTexture2D(p.FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xM.__webglTexture,b)}else if(wM){const xM=aM.get(w.texture),vM=Q||0;p.framebufferTextureLayer(p.FRAMEBUFFER,p.COLOR_ATTACHMENT0,xM.__webglTexture,b||0,vM)}h=-1},this.readRenderTargetPixels=function(w,Q,b,U,R,uM,wM){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xM=aM.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&wM!==void 0&&(xM=xM[wM]),xM){CM.bindFramebuffer(p.FRAMEBUFFER,xM);try{const vM=w.texture,kM=vM.format,YM=vM.type;if(kM!==qD&&B.convert(kM)!==p.getParameter(p.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const pM=YM===wN&&(OM.has("EXT_color_buffer_half_float")||eM.isWebGL2&&OM.has("EXT_color_buffer_float"));if(YM!==it&&B.convert(YM)!==p.getParameter(p.IMPLEMENTATION_COLOR_READ_TYPE)&&!(YM===Mt&&(eM.isWebGL2||OM.has("OES_texture_float")||OM.has("WEBGL_color_buffer_float")))&&!pM){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=w.width-U&&b>=0&&b<=w.height-R&&p.readPixels(Q,b,U,R,B.convert(kM),B.convert(YM),uM)}finally{const vM=O!==null?aM.get(O).__webglFramebuffer:null;CM.bindFramebuffer(p.FRAMEBUFFER,vM)}}},this.copyFramebufferToTexture=function(w,Q,b=0){const U=Math.pow(2,-b),R=Math.floor(Q.image.width*U),uM=Math.floor(Q.image.height*U);dM.setTexture2D(Q,0),p.copyTexSubImage2D(p.TEXTURE_2D,b,0,0,w.x,w.y,R,uM),CM.unbindTexture()},this.copyTextureToTexture=function(w,Q,b,U=0){const R=Q.image.width,uM=Q.image.height,wM=B.convert(b.format),xM=B.convert(b.type);dM.setTexture2D(b,0),p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL,b.flipY),p.pixelStorei(p.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),p.pixelStorei(p.UNPACK_ALIGNMENT,b.unpackAlignment),Q.isDataTexture?p.texSubImage2D(p.TEXTURE_2D,U,w.x,w.y,R,uM,wM,xM,Q.image.data):Q.isCompressedTexture?p.compressedTexSubImage2D(p.TEXTURE_2D,U,w.x,w.y,Q.mipmaps[0].width,Q.mipmaps[0].height,wM,Q.mipmaps[0].data):p.texSubImage2D(p.TEXTURE_2D,U,w.x,w.y,wM,xM,Q.image),U===0&&b.generateMipmaps&&p.generateMipmap(p.TEXTURE_2D),CM.unbindTexture()},this.copyTextureToTexture3D=function(w,Q,b,U,R=0){if(s.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const uM=w.max.x-w.min.x+1,wM=w.max.y-w.min.y+1,xM=w.max.z-w.min.z+1,vM=B.convert(U.format),kM=B.convert(U.type);let YM;if(U.isData3DTexture)dM.setTexture3D(U,0),YM=p.TEXTURE_3D;else if(U.isDataArrayTexture)dM.setTexture2DArray(U,0),YM=p.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL,U.flipY),p.pixelStorei(p.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),p.pixelStorei(p.UNPACK_ALIGNMENT,U.unpackAlignment);const pM=p.getParameter(p.UNPACK_ROW_LENGTH),RM=p.getParameter(p.UNPACK_IMAGE_HEIGHT),sD=p.getParameter(p.UNPACK_SKIP_PIXELS),bD=p.getParameter(p.UNPACK_SKIP_ROWS),Ke=p.getParameter(p.UNPACK_SKIP_IMAGES),GM=b.isCompressedTexture?b.mipmaps[0]:b.image;p.pixelStorei(p.UNPACK_ROW_LENGTH,GM.width),p.pixelStorei(p.UNPACK_IMAGE_HEIGHT,GM.height),p.pixelStorei(p.UNPACK_SKIP_PIXELS,w.min.x),p.pixelStorei(p.UNPACK_SKIP_ROWS,w.min.y),p.pixelStorei(p.UNPACK_SKIP_IMAGES,w.min.z),b.isDataTexture||b.isData3DTexture?p.texSubImage3D(YM,R,Q.x,Q.y,Q.z,uM,wM,xM,vM,kM,GM.data):b.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),p.compressedTexSubImage3D(YM,R,Q.x,Q.y,Q.z,uM,wM,xM,vM,GM.data)):p.texSubImage3D(YM,R,Q.x,Q.y,Q.z,uM,wM,xM,vM,kM,GM),p.pixelStorei(p.UNPACK_ROW_LENGTH,pM),p.pixelStorei(p.UNPACK_IMAGE_HEIGHT,RM),p.pixelStorei(p.UNPACK_SKIP_PIXELS,sD),p.pixelStorei(p.UNPACK_SKIP_ROWS,bD),p.pixelStorei(p.UNPACK_SKIP_IMAGES,Ke),R===0&&U.generateMipmaps&&p.generateMipmap(YM),CM.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?dM.setTextureCube(w,0):w.isData3DTexture?dM.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?dM.setTexture2DArray(w,0):dM.setTexture2D(w,0),CM.unbindTexture()},this.resetState=function(){y=0,x=0,O=null,CM.reset(),sM.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(M){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!M}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===lM?tt:un}set outputEncoding(M){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=M===tt?lM:ze}}class fc extends OD{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(M,D){return super.copy(M,D),M.background!==null&&(this.background=M.background.clone()),M.environment!==null&&(this.environment=M.environment.clone()),M.fog!==null&&(this.fog=M.fog.clone()),this.backgroundBlurriness=M.backgroundBlurriness,this.backgroundIntensity=M.backgroundIntensity,M.overrideMaterial!==null&&(this.overrideMaterial=M.overrideMaterial.clone()),this.matrixAutoUpdate=M.matrixAutoUpdate,this}toJSON(M){const D=super.toJSON(M);return this.fog!==null&&(D.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(D.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(D.object.backgroundIntensity=this.backgroundIntensity),D}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(M){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=M}}class Zc extends JD{constructor(M,D,t,N,A,z,i,T,I){super(M,D,t,N,A,z,i,T,I),this.isVideoTexture=!0,this.minFilter=z!==void 0?z:CD,this.magFilter=A!==void 0?A:CD,this.generateMipmaps=!1;const n=this;function u(){n.needsUpdate=!0,M.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in M&&M.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const M=this.image;!("requestVideoFrameCallback"in M)&&M.readyState>=M.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qn="152",az=0,_c=1,tT=1,bc=100,Kc=204,Rc=205,Pc=3,kn=0,Sn=300,NT=1e3,AA=1001,AT=1002,Fc=1006,Bc=1008,Hc=1009,Gc=1023,Vc=3e3,Yi=3001,Wc=0,Ui="",SD="srgb",Ez="srgb-linear",fn="display-p3",mi=7680,Xc=519,iT=35044;class FA{addEventListener(M,D){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[M]===void 0&&(t[M]=[]),t[M].indexOf(D)===-1&&t[M].push(D)}hasEventListener(M,D){if(this._listeners===void 0)return!1;const t=this._listeners;return t[M]!==void 0&&t[M].indexOf(D)!==-1}removeEventListener(M,D){if(this._listeners===void 0)return;const t=this._listeners[M];if(t!==void 0){const N=t.indexOf(D);N!==-1&&t.splice(N,1)}}dispatchEvent(M){if(this._listeners===void 0)return;const D=this._listeners[M.type];if(D!==void 0){M.target=this;const t=D.slice(0);for(let N=0,A=t.length;N<A;N++)t[N].call(this,M);M.target=null}}}const nD=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];function UN(){const e=Math.random()*4294967295|0,M=Math.random()*4294967295|0,D=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(nD[e&255]+nD[e>>8&255]+nD[e>>16&255]+nD[e>>24&255]+"-"+nD[M&255]+nD[M>>8&255]+"-"+nD[M>>16&15|64]+nD[M>>24&255]+"-"+nD[D&63|128]+nD[D>>8&255]+"-"+nD[D>>16&255]+nD[D>>24&255]+nD[t&255]+nD[t>>8&255]+nD[t>>16&255]+nD[t>>24&255]).toLowerCase()}function LD(e,M,D){return Math.max(M,Math.min(D,e))}function qc(e,M){return(e%M+M)%M}function Qi(e,M,D){return(1-D)*e+D*M}function iA(e,M){switch(M.constructor){case Float32Array:return e;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function vD(e,M){switch(M.constructor){case Float32Array:return e;case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}class yD{constructor(M=0,D=0){yD.prototype.isVector2=!0,this.x=M,this.y=D}get width(){return this.x}set width(M){this.x=M}get height(){return this.y}set height(M){this.y=M}set(M,D){return this.x=M,this.y=D,this}setScalar(M){return this.x=M,this.y=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y)}copy(M){return this.x=M.x,this.y=M.y,this}add(M){return this.x+=M.x,this.y+=M.y,this}addScalar(M){return this.x+=M,this.y+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this}subScalar(M){return this.x-=M,this.y-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this}multiply(M){return this.x*=M.x,this.y*=M.y,this}multiplyScalar(M){return this.x*=M,this.y*=M,this}divide(M){return this.x/=M.x,this.y/=M.y,this}divideScalar(M){return this.multiplyScalar(1/M)}applyMatrix3(M){const D=this.x,t=this.y,N=M.elements;return this.x=N[0]*D+N[3]*t+N[6],this.y=N[1]*D+N[4]*t+N[7],this}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(M){return this.x*M.x+this.y*M.y}cross(M){return this.x*M.y-this.y*M.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(M){const D=Math.sqrt(this.lengthSq()*M.lengthSq());if(D===0)return Math.PI/2;const t=this.dot(M)/D;return Math.acos(LD(t,-1,1))}distanceTo(M){return Math.sqrt(this.distanceToSquared(M))}distanceToSquared(M){const D=this.x-M.x,t=this.y-M.y;return D*D+t*t}manhattanDistanceTo(M){return Math.abs(this.x-M.x)+Math.abs(this.y-M.y)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this}equals(M){return M.x===this.x&&M.y===this.y}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this}rotateAround(M,D){const t=Math.cos(D),N=Math.sin(D),A=this.x-M.x,z=this.y-M.y;return this.x=A*t-z*N+M.x,this.y=A*N+z*t+M.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class be{constructor(){be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(M,D,t,N,A,z,i,T,I){const n=this.elements;return n[0]=M,n[1]=N,n[2]=i,n[3]=D,n[4]=A,n[5]=T,n[6]=t,n[7]=z,n[8]=I,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(M){const D=this.elements,t=M.elements;return D[0]=t[0],D[1]=t[1],D[2]=t[2],D[3]=t[3],D[4]=t[4],D[5]=t[5],D[6]=t[6],D[7]=t[7],D[8]=t[8],this}extractBasis(M,D,t){return M.setFromMatrix3Column(this,0),D.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(M){const D=M.elements;return this.set(D[0],D[4],D[8],D[1],D[5],D[9],D[2],D[6],D[10]),this}multiply(M){return this.multiplyMatrices(this,M)}premultiply(M){return this.multiplyMatrices(M,this)}multiplyMatrices(M,D){const t=M.elements,N=D.elements,A=this.elements,z=t[0],i=t[3],T=t[6],I=t[1],n=t[4],u=t[7],g=t[2],r=t[5],a=t[8],c=N[0],j=N[3],s=N[6],L=N[1],y=N[4],x=N[7],O=N[2],h=N[5],d=N[8];return A[0]=z*c+i*L+T*O,A[3]=z*j+i*y+T*h,A[6]=z*s+i*x+T*d,A[1]=I*c+n*L+u*O,A[4]=I*j+n*y+u*h,A[7]=I*s+n*x+u*d,A[2]=g*c+r*L+a*O,A[5]=g*j+r*y+a*h,A[8]=g*s+r*x+a*d,this}multiplyScalar(M){const D=this.elements;return D[0]*=M,D[3]*=M,D[6]*=M,D[1]*=M,D[4]*=M,D[7]*=M,D[2]*=M,D[5]*=M,D[8]*=M,this}determinant(){const M=this.elements,D=M[0],t=M[1],N=M[2],A=M[3],z=M[4],i=M[5],T=M[6],I=M[7],n=M[8];return D*z*n-D*i*I-t*A*n+t*i*T+N*A*I-N*z*T}invert(){const M=this.elements,D=M[0],t=M[1],N=M[2],A=M[3],z=M[4],i=M[5],T=M[6],I=M[7],n=M[8],u=n*z-i*I,g=i*T-n*A,r=I*A-z*T,a=D*u+t*g+N*r;if(a===0)return this.set(0,0,0,0,0,0,0,0,0);const c=1/a;return M[0]=u*c,M[1]=(N*I-n*t)*c,M[2]=(i*t-N*z)*c,M[3]=g*c,M[4]=(n*D-N*T)*c,M[5]=(N*A-i*D)*c,M[6]=r*c,M[7]=(t*T-I*D)*c,M[8]=(z*D-t*A)*c,this}transpose(){let M;const D=this.elements;return M=D[1],D[1]=D[3],D[3]=M,M=D[2],D[2]=D[6],D[6]=M,M=D[5],D[5]=D[7],D[7]=M,this}getNormalMatrix(M){return this.setFromMatrix4(M).invert().transpose()}transposeIntoArray(M){const D=this.elements;return M[0]=D[0],M[1]=D[3],M[2]=D[6],M[3]=D[1],M[4]=D[4],M[5]=D[7],M[6]=D[2],M[7]=D[5],M[8]=D[8],this}setUvTransform(M,D,t,N,A,z,i){const T=Math.cos(A),I=Math.sin(A);return this.set(t*T,t*I,-t*(T*z+I*i)+z+M,-N*I,N*T,-N*(-I*z+T*i)+i+D,0,0,1),this}scale(M,D){return this.premultiply(ki.makeScale(M,D)),this}rotate(M){return this.premultiply(ki.makeRotation(-M)),this}translate(M,D){return this.premultiply(ki.makeTranslation(M,D)),this}makeTranslation(M,D){return this.set(1,0,M,0,1,D,0,0,1),this}makeRotation(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,-t,0,t,D,0,0,0,1),this}makeScale(M,D){return this.set(M,0,0,0,D,0,0,0,1),this}equals(M){const D=this.elements,t=M.elements;for(let N=0;N<9;N++)if(D[N]!==t[N])return!1;return!0}fromArray(M,D=0){for(let t=0;t<9;t++)this.elements[t]=M[t+D];return this}toArray(M=[],D=0){const t=this.elements;return M[D]=t[0],M[D+1]=t[1],M[D+2]=t[2],M[D+3]=t[3],M[D+4]=t[4],M[D+5]=t[5],M[D+6]=t[6],M[D+7]=t[7],M[D+8]=t[8],M}clone(){return new this.constructor().fromArray(this.elements)}}const ki=new be;function Jc(e){for(let M=e.length-1;M>=0;--M)if(e[M]>=65535)return!0;return!1}function zT(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}const IT={};function Si(e){e in IT||(IT[e]=!0,console.warn(e))}function Gt(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function fi(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}const $c=new be().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),M0=new be().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function D0(e){return e.convertSRGBToLinear().applyMatrix3(M0)}function e0(e){return e.applyMatrix3($c).convertLinearToSRGB()}const t0={[Ez]:e=>e,[SD]:e=>e.convertSRGBToLinear(),[fn]:D0},N0={[Ez]:e=>e,[SD]:e=>e.convertLinearToSRGB(),[fn]:e0},BD={enabled:!0,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(e){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!e},get workingColorSpace(){return Ez},set workingColorSpace(e){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(e,M,D){if(this.enabled===!1||M===D||!M||!D)return e;const t=t0[M],N=N0[D];if(t===void 0||N===void 0)throw new Error(`Unsupported color space conversion, "${M}" to "${D}".`);return N(t(e))},fromWorkingColorSpace:function(e,M){return this.convert(e,this.workingColorSpace,M)},toWorkingColorSpace:function(e,M){return this.convert(e,M,this.workingColorSpace)}};let vt;class A0{static getDataURL(M){if(/^data:/i.test(M.src)||typeof HTMLCanvasElement>"u")return M.src;let D;if(M instanceof HTMLCanvasElement)D=M;else{vt===void 0&&(vt=zT("canvas")),vt.width=M.width,vt.height=M.height;const t=vt.getContext("2d");M instanceof ImageData?t.putImageData(M,0,0):t.drawImage(M,0,0,M.width,M.height),D=vt}return D.width>2048||D.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",M),D.toDataURL("image/jpeg",.6)):D.toDataURL("image/png")}static sRGBToLinear(M){if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const D=zT("canvas");D.width=M.width,D.height=M.height;const t=D.getContext("2d");t.drawImage(M,0,0,M.width,M.height);const N=t.getImageData(0,0,M.width,M.height),A=N.data;for(let z=0;z<A.length;z++)A[z]=Gt(A[z]/255)*255;return t.putImageData(N,0,0),D}else if(M.data){const D=M.data.slice(0);for(let t=0;t<D.length;t++)D instanceof Uint8Array||D instanceof Uint8ClampedArray?D[t]=Math.floor(Gt(D[t]/255)*255):D[t]=Gt(D[t]);return{data:D,width:M.width,height:M.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),M}}class i0{constructor(M=null){this.isSource=!0,this.uuid=UN(),this.data=M,this.version=0}set needsUpdate(M){M===!0&&this.version++}toJSON(M){const D=M===void 0||typeof M=="string";if(!D&&M.images[this.uuid]!==void 0)return M.images[this.uuid];const t={uuid:this.uuid,url:""},N=this.data;if(N!==null){let A;if(Array.isArray(N)){A=[];for(let z=0,i=N.length;z<i;z++)N[z].isDataTexture?A.push(Zi(N[z].image)):A.push(Zi(N[z]))}else A=Zi(N);t.url=A}return D||(M.images[this.uuid]=t),t}}function Zi(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?A0.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let z0=0;class At extends FA{constructor(M=At.DEFAULT_IMAGE,D=At.DEFAULT_MAPPING,t=AA,N=AA,A=Fc,z=Bc,i=Gc,T=Hc,I=At.DEFAULT_ANISOTROPY,n=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=UN(),this.name="",this.source=new i0(M),this.mipmaps=[],this.mapping=D,this.channel=0,this.wrapS=t,this.wrapT=N,this.magFilter=A,this.minFilter=z,this.anisotropy=I,this.format=i,this.internalFormat=null,this.type=T,this.offset=new yD(0,0),this.repeat=new yD(1,1),this.center=new yD(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof n=="string"?this.colorSpace=n:(Si("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=n===Yi?SD:Ui),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(M=null){this.source.data=M}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(M){return this.name=M.name,this.source=M.source,this.mipmaps=M.mipmaps.slice(0),this.mapping=M.mapping,this.channel=M.channel,this.wrapS=M.wrapS,this.wrapT=M.wrapT,this.magFilter=M.magFilter,this.minFilter=M.minFilter,this.anisotropy=M.anisotropy,this.format=M.format,this.internalFormat=M.internalFormat,this.type=M.type,this.offset.copy(M.offset),this.repeat.copy(M.repeat),this.center.copy(M.center),this.rotation=M.rotation,this.matrixAutoUpdate=M.matrixAutoUpdate,this.matrix.copy(M.matrix),this.generateMipmaps=M.generateMipmaps,this.premultiplyAlpha=M.premultiplyAlpha,this.flipY=M.flipY,this.unpackAlignment=M.unpackAlignment,this.colorSpace=M.colorSpace,this.userData=JSON.parse(JSON.stringify(M.userData)),this.needsUpdate=!0,this}toJSON(M){const D=M===void 0||typeof M=="string";if(!D&&M.textures[this.uuid]!==void 0)return M.textures[this.uuid];const t={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(M).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),D||(M.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(M){if(this.mapping!==Sn)return M;if(M.applyMatrix3(this.matrix),M.x<0||M.x>1)switch(this.wrapS){case NT:M.x=M.x-Math.floor(M.x);break;case AA:M.x=M.x<0?0:1;break;case AT:Math.abs(Math.floor(M.x)%2)===1?M.x=Math.ceil(M.x)-M.x:M.x=M.x-Math.floor(M.x);break}if(M.y<0||M.y>1)switch(this.wrapT){case NT:M.y=M.y-Math.floor(M.y);break;case AA:M.y=M.y<0?0:1;break;case AT:Math.abs(Math.floor(M.y)%2)===1?M.y=Math.ceil(M.y)-M.y:M.y=M.y-Math.floor(M.y);break}return this.flipY&&(M.y=1-M.y),M}set needsUpdate(M){M===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Si("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===SD?Yi:Vc}set encoding(M){Si("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=M===Yi?SD:Ui}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=Sn;At.DEFAULT_ANISOTROPY=1;class mN{constructor(M=0,D=0,t=0,N=1){this.isQuaternion=!0,this._x=M,this._y=D,this._z=t,this._w=N}static slerpFlat(M,D,t,N,A,z,i){let T=t[N+0],I=t[N+1],n=t[N+2],u=t[N+3];const g=A[z+0],r=A[z+1],a=A[z+2],c=A[z+3];if(i===0){M[D+0]=T,M[D+1]=I,M[D+2]=n,M[D+3]=u;return}if(i===1){M[D+0]=g,M[D+1]=r,M[D+2]=a,M[D+3]=c;return}if(u!==c||T!==g||I!==r||n!==a){let j=1-i;const s=T*g+I*r+n*a+u*c,L=s>=0?1:-1,y=1-s*s;if(y>Number.EPSILON){const O=Math.sqrt(y),h=Math.atan2(O,s*L);j=Math.sin(j*h)/O,i=Math.sin(i*h)/O}const x=i*L;if(T=T*j+g*x,I=I*j+r*x,n=n*j+a*x,u=u*j+c*x,j===1-i){const O=1/Math.sqrt(T*T+I*I+n*n+u*u);T*=O,I*=O,n*=O,u*=O}}M[D]=T,M[D+1]=I,M[D+2]=n,M[D+3]=u}static multiplyQuaternionsFlat(M,D,t,N,A,z){const i=t[N],T=t[N+1],I=t[N+2],n=t[N+3],u=A[z],g=A[z+1],r=A[z+2],a=A[z+3];return M[D]=i*a+n*u+T*r-I*g,M[D+1]=T*a+n*g+I*u-i*r,M[D+2]=I*a+n*r+i*g-T*u,M[D+3]=n*a-i*u-T*g-I*r,M}get x(){return this._x}set x(M){this._x=M,this._onChangeCallback()}get y(){return this._y}set y(M){this._y=M,this._onChangeCallback()}get z(){return this._z}set z(M){this._z=M,this._onChangeCallback()}get w(){return this._w}set w(M){this._w=M,this._onChangeCallback()}set(M,D,t,N){return this._x=M,this._y=D,this._z=t,this._w=N,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(M){return this._x=M.x,this._y=M.y,this._z=M.z,this._w=M.w,this._onChangeCallback(),this}setFromEuler(M,D){const t=M._x,N=M._y,A=M._z,z=M._order,i=Math.cos,T=Math.sin,I=i(t/2),n=i(N/2),u=i(A/2),g=T(t/2),r=T(N/2),a=T(A/2);switch(z){case"XYZ":this._x=g*n*u+I*r*a,this._y=I*r*u-g*n*a,this._z=I*n*a+g*r*u,this._w=I*n*u-g*r*a;break;case"YXZ":this._x=g*n*u+I*r*a,this._y=I*r*u-g*n*a,this._z=I*n*a-g*r*u,this._w=I*n*u+g*r*a;break;case"ZXY":this._x=g*n*u-I*r*a,this._y=I*r*u+g*n*a,this._z=I*n*a+g*r*u,this._w=I*n*u-g*r*a;break;case"ZYX":this._x=g*n*u-I*r*a,this._y=I*r*u+g*n*a,this._z=I*n*a-g*r*u,this._w=I*n*u+g*r*a;break;case"YZX":this._x=g*n*u+I*r*a,this._y=I*r*u+g*n*a,this._z=I*n*a-g*r*u,this._w=I*n*u-g*r*a;break;case"XZY":this._x=g*n*u-I*r*a,this._y=I*r*u-g*n*a,this._z=I*n*a+g*r*u,this._w=I*n*u+g*r*a;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+z)}return D!==!1&&this._onChangeCallback(),this}setFromAxisAngle(M,D){const t=D/2,N=Math.sin(t);return this._x=M.x*N,this._y=M.y*N,this._z=M.z*N,this._w=Math.cos(t),this._onChangeCallback(),this}setFromRotationMatrix(M){const D=M.elements,t=D[0],N=D[4],A=D[8],z=D[1],i=D[5],T=D[9],I=D[2],n=D[6],u=D[10],g=t+i+u;if(g>0){const r=.5/Math.sqrt(g+1);this._w=.25/r,this._x=(n-T)*r,this._y=(A-I)*r,this._z=(z-N)*r}else if(t>i&&t>u){const r=2*Math.sqrt(1+t-i-u);this._w=(n-T)/r,this._x=.25*r,this._y=(N+z)/r,this._z=(A+I)/r}else if(i>u){const r=2*Math.sqrt(1+i-t-u);this._w=(A-I)/r,this._x=(N+z)/r,this._y=.25*r,this._z=(T+n)/r}else{const r=2*Math.sqrt(1+u-t-i);this._w=(z-N)/r,this._x=(A+I)/r,this._y=(T+n)/r,this._z=.25*r}return this._onChangeCallback(),this}setFromUnitVectors(M,D){let t=M.dot(D)+1;return t<Number.EPSILON?(t=0,Math.abs(M.x)>Math.abs(M.z)?(this._x=-M.y,this._y=M.x,this._z=0,this._w=t):(this._x=0,this._y=-M.z,this._z=M.y,this._w=t)):(this._x=M.y*D.z-M.z*D.y,this._y=M.z*D.x-M.x*D.z,this._z=M.x*D.y-M.y*D.x,this._w=t),this.normalize()}angleTo(M){return 2*Math.acos(Math.abs(LD(this.dot(M),-1,1)))}rotateTowards(M,D){const t=this.angleTo(M);if(t===0)return this;const N=Math.min(1,D/t);return this.slerp(M,N),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(M){return this._x*M._x+this._y*M._y+this._z*M._z+this._w*M._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let M=this.length();return M===0?(this._x=0,this._y=0,this._z=0,this._w=1):(M=1/M,this._x=this._x*M,this._y=this._y*M,this._z=this._z*M,this._w=this._w*M),this._onChangeCallback(),this}multiply(M){return this.multiplyQuaternions(this,M)}premultiply(M){return this.multiplyQuaternions(M,this)}multiplyQuaternions(M,D){const t=M._x,N=M._y,A=M._z,z=M._w,i=D._x,T=D._y,I=D._z,n=D._w;return this._x=t*n+z*i+N*I-A*T,this._y=N*n+z*T+A*i-t*I,this._z=A*n+z*I+t*T-N*i,this._w=z*n-t*i-N*T-A*I,this._onChangeCallback(),this}slerp(M,D){if(D===0)return this;if(D===1)return this.copy(M);const t=this._x,N=this._y,A=this._z,z=this._w;let i=z*M._w+t*M._x+N*M._y+A*M._z;if(i<0?(this._w=-M._w,this._x=-M._x,this._y=-M._y,this._z=-M._z,i=-i):this.copy(M),i>=1)return this._w=z,this._x=t,this._y=N,this._z=A,this;const T=1-i*i;if(T<=Number.EPSILON){const r=1-D;return this._w=r*z+D*this._w,this._x=r*t+D*this._x,this._y=r*N+D*this._y,this._z=r*A+D*this._z,this.normalize(),this._onChangeCallback(),this}const I=Math.sqrt(T),n=Math.atan2(I,i),u=Math.sin((1-D)*n)/I,g=Math.sin(D*n)/I;return this._w=z*u+this._w*g,this._x=t*u+this._x*g,this._y=N*u+this._y*g,this._z=A*u+this._z*g,this._onChangeCallback(),this}slerpQuaternions(M,D,t){return this.copy(M).slerp(D,t)}random(){const M=Math.random(),D=Math.sqrt(1-M),t=Math.sqrt(M),N=2*Math.PI*Math.random(),A=2*Math.PI*Math.random();return this.set(D*Math.cos(N),t*Math.sin(A),t*Math.cos(A),D*Math.sin(N))}equals(M){return M._x===this._x&&M._y===this._y&&M._z===this._z&&M._w===this._w}fromArray(M,D=0){return this._x=M[D],this._y=M[D+1],this._z=M[D+2],this._w=M[D+3],this._onChangeCallback(),this}toArray(M=[],D=0){return M[D]=this._x,M[D+1]=this._y,M[D+2]=this._z,M[D+3]=this._w,M}fromBufferAttribute(M,D){return this._x=M.getX(D),this._y=M.getY(D),this._z=M.getZ(D),this._w=M.getW(D),this}toJSON(){return this.toArray()}_onChange(M){return this._onChangeCallback=M,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(M=0,D=0,t=0){P.prototype.isVector3=!0,this.x=M,this.y=D,this.z=t}set(M,D,t){return t===void 0&&(t=this.z),this.x=M,this.y=D,this.z=t,this}setScalar(M){return this.x=M,this.y=M,this.z=M,this}setX(M){return this.x=M,this}setY(M){return this.y=M,this}setZ(M){return this.z=M,this}setComponent(M,D){switch(M){case 0:this.x=D;break;case 1:this.y=D;break;case 2:this.z=D;break;default:throw new Error("index is out of range: "+M)}return this}getComponent(M){switch(M){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+M)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(M){return this.x=M.x,this.y=M.y,this.z=M.z,this}add(M){return this.x+=M.x,this.y+=M.y,this.z+=M.z,this}addScalar(M){return this.x+=M,this.y+=M,this.z+=M,this}addVectors(M,D){return this.x=M.x+D.x,this.y=M.y+D.y,this.z=M.z+D.z,this}addScaledVector(M,D){return this.x+=M.x*D,this.y+=M.y*D,this.z+=M.z*D,this}sub(M){return this.x-=M.x,this.y-=M.y,this.z-=M.z,this}subScalar(M){return this.x-=M,this.y-=M,this.z-=M,this}subVectors(M,D){return this.x=M.x-D.x,this.y=M.y-D.y,this.z=M.z-D.z,this}multiply(M){return this.x*=M.x,this.y*=M.y,this.z*=M.z,this}multiplyScalar(M){return this.x*=M,this.y*=M,this.z*=M,this}multiplyVectors(M,D){return this.x=M.x*D.x,this.y=M.y*D.y,this.z=M.z*D.z,this}applyEuler(M){return this.applyQuaternion(TT.setFromEuler(M))}applyAxisAngle(M,D){return this.applyQuaternion(TT.setFromAxisAngle(M,D))}applyMatrix3(M){const D=this.x,t=this.y,N=this.z,A=M.elements;return this.x=A[0]*D+A[3]*t+A[6]*N,this.y=A[1]*D+A[4]*t+A[7]*N,this.z=A[2]*D+A[5]*t+A[8]*N,this}applyNormalMatrix(M){return this.applyMatrix3(M).normalize()}applyMatrix4(M){const D=this.x,t=this.y,N=this.z,A=M.elements,z=1/(A[3]*D+A[7]*t+A[11]*N+A[15]);return this.x=(A[0]*D+A[4]*t+A[8]*N+A[12])*z,this.y=(A[1]*D+A[5]*t+A[9]*N+A[13])*z,this.z=(A[2]*D+A[6]*t+A[10]*N+A[14])*z,this}applyQuaternion(M){const D=this.x,t=this.y,N=this.z,A=M.x,z=M.y,i=M.z,T=M.w,I=T*D+z*N-i*t,n=T*t+i*D-A*N,u=T*N+A*t-z*D,g=-A*D-z*t-i*N;return this.x=I*T+g*-A+n*-i-u*-z,this.y=n*T+g*-z+u*-A-I*-i,this.z=u*T+g*-i+I*-z-n*-A,this}project(M){return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix)}unproject(M){return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld)}transformDirection(M){const D=this.x,t=this.y,N=this.z,A=M.elements;return this.x=A[0]*D+A[4]*t+A[8]*N,this.y=A[1]*D+A[5]*t+A[9]*N,this.z=A[2]*D+A[6]*t+A[10]*N,this.normalize()}divide(M){return this.x/=M.x,this.y/=M.y,this.z/=M.z,this}divideScalar(M){return this.multiplyScalar(1/M)}min(M){return this.x=Math.min(this.x,M.x),this.y=Math.min(this.y,M.y),this.z=Math.min(this.z,M.z),this}max(M){return this.x=Math.max(this.x,M.x),this.y=Math.max(this.y,M.y),this.z=Math.max(this.z,M.z),this}clamp(M,D){return this.x=Math.max(M.x,Math.min(D.x,this.x)),this.y=Math.max(M.y,Math.min(D.y,this.y)),this.z=Math.max(M.z,Math.min(D.z,this.z)),this}clampScalar(M,D){return this.x=Math.max(M,Math.min(D,this.x)),this.y=Math.max(M,Math.min(D,this.y)),this.z=Math.max(M,Math.min(D,this.z)),this}clampLength(M,D){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(M,Math.min(D,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(M){return this.x*M.x+this.y*M.y+this.z*M.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(M){return this.normalize().multiplyScalar(M)}lerp(M,D){return this.x+=(M.x-this.x)*D,this.y+=(M.y-this.y)*D,this.z+=(M.z-this.z)*D,this}lerpVectors(M,D,t){return this.x=M.x+(D.x-M.x)*t,this.y=M.y+(D.y-M.y)*t,this.z=M.z+(D.z-M.z)*t,this}cross(M){return this.crossVectors(this,M)}crossVectors(M,D){const t=M.x,N=M.y,A=M.z,z=D.x,i=D.y,T=D.z;return this.x=N*T-A*i,this.y=A*z-t*T,this.z=t*i-N*z,this}projectOnVector(M){const D=M.lengthSq();if(D===0)return this.set(0,0,0);const t=M.dot(this)/D;return this.copy(M).multiplyScalar(t)}projectOnPlane(M){return _i.copy(this).projectOnVector(M),this.sub(_i)}reflect(M){return this.sub(_i.copy(M).multiplyScalar(2*this.dot(M)))}angleTo(M){const D=Math.sqrt(this.lengthSq()*M.lengthSq());if(D===0)return Math.PI/2;const t=this.dot(M)/D;return Math.acos(LD(t,-1,1))}distanceTo(M){return Math.sqrt(this.distanceToSquared(M))}distanceToSquared(M){const D=this.x-M.x,t=this.y-M.y,N=this.z-M.z;return D*D+t*t+N*N}manhattanDistanceTo(M){return Math.abs(this.x-M.x)+Math.abs(this.y-M.y)+Math.abs(this.z-M.z)}setFromSpherical(M){return this.setFromSphericalCoords(M.radius,M.phi,M.theta)}setFromSphericalCoords(M,D,t){const N=Math.sin(D)*M;return this.x=N*Math.sin(t),this.y=Math.cos(D)*M,this.z=N*Math.cos(t),this}setFromCylindrical(M){return this.setFromCylindricalCoords(M.radius,M.theta,M.y)}setFromCylindricalCoords(M,D,t){return this.x=M*Math.sin(D),this.y=t,this.z=M*Math.cos(D),this}setFromMatrixPosition(M){const D=M.elements;return this.x=D[12],this.y=D[13],this.z=D[14],this}setFromMatrixScale(M){const D=this.setFromMatrixColumn(M,0).length(),t=this.setFromMatrixColumn(M,1).length(),N=this.setFromMatrixColumn(M,2).length();return this.x=D,this.y=t,this.z=N,this}setFromMatrixColumn(M,D){return this.fromArray(M.elements,D*4)}setFromMatrix3Column(M,D){return this.fromArray(M.elements,D*3)}setFromEuler(M){return this.x=M._x,this.y=M._y,this.z=M._z,this}setFromColor(M){return this.x=M.r,this.y=M.g,this.z=M.b,this}equals(M){return M.x===this.x&&M.y===this.y&&M.z===this.z}fromArray(M,D=0){return this.x=M[D],this.y=M[D+1],this.z=M[D+2],this}toArray(M=[],D=0){return M[D]=this.x,M[D+1]=this.y,M[D+2]=this.z,M}fromBufferAttribute(M,D){return this.x=M.getX(D),this.y=M.getY(D),this.z=M.getZ(D),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const M=(Math.random()-.5)*2,D=Math.random()*Math.PI*2,t=Math.sqrt(1-M**2);return this.x=t*Math.cos(D),this.y=t*Math.sin(D),this.z=M,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _i=new P,TT=new mN;class QN{constructor(M=new P(1/0,1/0,1/0),D=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=M,this.max=D}set(M,D){return this.min.copy(M),this.max.copy(D),this}setFromArray(M){this.makeEmpty();for(let D=0,t=M.length;D<t;D+=3)this.expandByPoint(je.fromArray(M,D));return this}setFromBufferAttribute(M){this.makeEmpty();for(let D=0,t=M.count;D<t;D++)this.expandByPoint(je.fromBufferAttribute(M,D));return this}setFromPoints(M){this.makeEmpty();for(let D=0,t=M.length;D<t;D++)this.expandByPoint(M[D]);return this}setFromCenterAndSize(M,D){const t=je.copy(D).multiplyScalar(.5);return this.min.copy(M).sub(t),this.max.copy(M).add(t),this}setFromObject(M,D=!1){return this.makeEmpty(),this.expandByObject(M,D)}clone(){return new this.constructor().copy(this)}copy(M){return this.min.copy(M.min),this.max.copy(M.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(M){return this.isEmpty()?M.set(0,0,0):M.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(M){return this.isEmpty()?M.set(0,0,0):M.subVectors(this.max,this.min)}expandByPoint(M){return this.min.min(M),this.max.max(M),this}expandByVector(M){return this.min.sub(M),this.max.add(M),this}expandByScalar(M){return this.min.addScalar(-M),this.max.addScalar(M),this}expandByObject(M,D=!1){if(M.updateWorldMatrix(!1,!1),M.boundingBox!==void 0)M.boundingBox===null&&M.computeBoundingBox(),dt.copy(M.boundingBox),dt.applyMatrix4(M.matrixWorld),this.union(dt);else{const N=M.geometry;if(N!==void 0)if(D&&N.attributes!==void 0&&N.attributes.position!==void 0){const A=N.attributes.position;for(let z=0,i=A.count;z<i;z++)je.fromBufferAttribute(A,z).applyMatrix4(M.matrixWorld),this.expandByPoint(je)}else N.boundingBox===null&&N.computeBoundingBox(),dt.copy(N.boundingBox),dt.applyMatrix4(M.matrixWorld),this.union(dt)}const t=M.children;for(let N=0,A=t.length;N<A;N++)this.expandByObject(t[N],D);return this}containsPoint(M){return!(M.x<this.min.x||M.x>this.max.x||M.y<this.min.y||M.y>this.max.y||M.z<this.min.z||M.z>this.max.z)}containsBox(M){return this.min.x<=M.min.x&&M.max.x<=this.max.x&&this.min.y<=M.min.y&&M.max.y<=this.max.y&&this.min.z<=M.min.z&&M.max.z<=this.max.z}getParameter(M,D){return D.set((M.x-this.min.x)/(this.max.x-this.min.x),(M.y-this.min.y)/(this.max.y-this.min.y),(M.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(M){return!(M.max.x<this.min.x||M.min.x>this.max.x||M.max.y<this.min.y||M.min.y>this.max.y||M.max.z<this.min.z||M.min.z>this.max.z)}intersectsSphere(M){return this.clampPoint(M.center,je),je.distanceToSquared(M.center)<=M.radius*M.radius}intersectsPlane(M){let D,t;return M.normal.x>0?(D=M.normal.x*this.min.x,t=M.normal.x*this.max.x):(D=M.normal.x*this.max.x,t=M.normal.x*this.min.x),M.normal.y>0?(D+=M.normal.y*this.min.y,t+=M.normal.y*this.max.y):(D+=M.normal.y*this.max.y,t+=M.normal.y*this.min.y),M.normal.z>0?(D+=M.normal.z*this.min.z,t+=M.normal.z*this.max.z):(D+=M.normal.z*this.max.z,t+=M.normal.z*this.min.z),D<=-M.constant&&t>=-M.constant}intersectsTriangle(M){if(this.isEmpty())return!1;this.getCenter(nN),zA.subVectors(this.max,nN),pt.subVectors(M.a,nN),Yt.subVectors(M.b,nN),Ut.subVectors(M.c,nN),me.subVectors(Yt,pt),Qe.subVectors(Ut,Yt),Ge.subVectors(pt,Ut);let D=[0,-me.z,me.y,0,-Qe.z,Qe.y,0,-Ge.z,Ge.y,me.z,0,-me.x,Qe.z,0,-Qe.x,Ge.z,0,-Ge.x,-me.y,me.x,0,-Qe.y,Qe.x,0,-Ge.y,Ge.x,0];return!bi(D,pt,Yt,Ut,zA)||(D=[1,0,0,0,1,0,0,0,1],!bi(D,pt,Yt,Ut,zA))?!1:(IA.crossVectors(me,Qe),D=[IA.x,IA.y,IA.z],bi(D,pt,Yt,Ut,zA))}clampPoint(M,D){return D.copy(M).clamp(this.min,this.max)}distanceToPoint(M){return this.clampPoint(M,je).distanceTo(M)}getBoundingSphere(M){return this.isEmpty()?M.makeEmpty():(this.getCenter(M.center),M.radius=this.getSize(je).length()*.5),M}intersect(M){return this.min.max(M.min),this.max.min(M.max),this.isEmpty()&&this.makeEmpty(),this}union(M){return this.min.min(M.min),this.max.max(M.max),this}applyMatrix4(M){return this.isEmpty()?this:(ae[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(M),ae[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(M),ae[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(M),ae[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(M),ae[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(M),ae[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(M),ae[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(M),ae[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(M),this.setFromPoints(ae),this)}translate(M){return this.min.add(M),this.max.add(M),this}equals(M){return M.min.equals(this.min)&&M.max.equals(this.max)}}const ae=[new P,new P,new P,new P,new P,new P,new P,new P],je=new P,dt=new QN,pt=new P,Yt=new P,Ut=new P,me=new P,Qe=new P,Ge=new P,nN=new P,zA=new P,IA=new P,Ve=new P;function bi(e,M,D,t,N){for(let A=0,z=e.length-3;A<=z;A+=3){Ve.fromArray(e,A);const i=N.x*Math.abs(Ve.x)+N.y*Math.abs(Ve.y)+N.z*Math.abs(Ve.z),T=M.dot(Ve),I=D.dot(Ve),n=t.dot(Ve);if(Math.max(-Math.max(T,I,n),Math.min(T,I,n))>i)return!1}return!0}const I0=new QN,uN=new P,Ki=new P;class BA{constructor(M=new P,D=-1){this.center=M,this.radius=D}set(M,D){return this.center.copy(M),this.radius=D,this}setFromPoints(M,D){const t=this.center;D!==void 0?t.copy(D):I0.setFromPoints(M).getCenter(t);let N=0;for(let A=0,z=M.length;A<z;A++)N=Math.max(N,t.distanceToSquared(M[A]));return this.radius=Math.sqrt(N),this}copy(M){return this.center.copy(M.center),this.radius=M.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(M){return M.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(M){return M.distanceTo(this.center)-this.radius}intersectsSphere(M){const D=this.radius+M.radius;return M.center.distanceToSquared(this.center)<=D*D}intersectsBox(M){return M.intersectsSphere(this)}intersectsPlane(M){return Math.abs(M.distanceToPoint(this.center))<=this.radius}clampPoint(M,D){const t=this.center.distanceToSquared(M);return D.copy(M),t>this.radius*this.radius&&(D.sub(this.center).normalize(),D.multiplyScalar(this.radius).add(this.center)),D}getBoundingBox(M){return this.isEmpty()?(M.makeEmpty(),M):(M.set(this.center,this.center),M.expandByScalar(this.radius),M)}applyMatrix4(M){return this.center.applyMatrix4(M),this.radius=this.radius*M.getMaxScaleOnAxis(),this}translate(M){return this.center.add(M),this}expandByPoint(M){if(this.isEmpty())return this.center.copy(M),this.radius=0,this;uN.subVectors(M,this.center);const D=uN.lengthSq();if(D>this.radius*this.radius){const t=Math.sqrt(D),N=(t-this.radius)*.5;this.center.addScaledVector(uN,N/t),this.radius+=N}return this}union(M){return M.isEmpty()?this:this.isEmpty()?(this.copy(M),this):(this.center.equals(M.center)===!0?this.radius=Math.max(this.radius,M.radius):(Ki.subVectors(M.center,this.center).setLength(M.radius),this.expandByPoint(uN.copy(M.center).add(Ki)),this.expandByPoint(uN.copy(M.center).sub(Ki))),this)}equals(M){return M.center.equals(this.center)&&M.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ce=new P,Ri=new P,TA=new P,ke=new P,Pi=new P,nA=new P,Fi=new P;class lz{constructor(M=new P,D=new P(0,0,-1)){this.origin=M,this.direction=D}set(M,D){return this.origin.copy(M),this.direction.copy(D),this}copy(M){return this.origin.copy(M.origin),this.direction.copy(M.direction),this}at(M,D){return D.copy(this.origin).addScaledVector(this.direction,M)}lookAt(M){return this.direction.copy(M).sub(this.origin).normalize(),this}recast(M){return this.origin.copy(this.at(M,ce)),this}closestPointToPoint(M,D){D.subVectors(M,this.origin);const t=D.dot(this.direction);return t<0?D.copy(this.origin):D.copy(this.origin).addScaledVector(this.direction,t)}distanceToPoint(M){return Math.sqrt(this.distanceSqToPoint(M))}distanceSqToPoint(M){const D=ce.subVectors(M,this.origin).dot(this.direction);return D<0?this.origin.distanceToSquared(M):(ce.copy(this.origin).addScaledVector(this.direction,D),ce.distanceToSquared(M))}distanceSqToSegment(M,D,t,N){Ri.copy(M).add(D).multiplyScalar(.5),TA.copy(D).sub(M).normalize(),ke.copy(this.origin).sub(Ri);const A=M.distanceTo(D)*.5,z=-this.direction.dot(TA),i=ke.dot(this.direction),T=-ke.dot(TA),I=ke.lengthSq(),n=Math.abs(1-z*z);let u,g,r,a;if(n>0)if(u=z*T-i,g=z*i-T,a=A*n,u>=0)if(g>=-a)if(g<=a){const c=1/n;u*=c,g*=c,r=u*(u+z*g+2*i)+g*(z*u+g+2*T)+I}else g=A,u=Math.max(0,-(z*g+i)),r=-u*u+g*(g+2*T)+I;else g=-A,u=Math.max(0,-(z*g+i)),r=-u*u+g*(g+2*T)+I;else g<=-a?(u=Math.max(0,-(-z*A+i)),g=u>0?-A:Math.min(Math.max(-A,-T),A),r=-u*u+g*(g+2*T)+I):g<=a?(u=0,g=Math.min(Math.max(-A,-T),A),r=g*(g+2*T)+I):(u=Math.max(0,-(z*A+i)),g=u>0?A:Math.min(Math.max(-A,-T),A),r=-u*u+g*(g+2*T)+I);else g=z>0?-A:A,u=Math.max(0,-(z*g+i)),r=-u*u+g*(g+2*T)+I;return t&&t.copy(this.origin).addScaledVector(this.direction,u),N&&N.copy(Ri).addScaledVector(TA,g),r}intersectSphere(M,D){ce.subVectors(M.center,this.origin);const t=ce.dot(this.direction),N=ce.dot(ce)-t*t,A=M.radius*M.radius;if(N>A)return null;const z=Math.sqrt(A-N),i=t-z,T=t+z;return T<0?null:i<0?this.at(T,D):this.at(i,D)}intersectsSphere(M){return this.distanceSqToPoint(M.center)<=M.radius*M.radius}distanceToPlane(M){const D=M.normal.dot(this.direction);if(D===0)return M.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(M.normal)+M.constant)/D;return t>=0?t:null}intersectPlane(M,D){const t=this.distanceToPlane(M);return t===null?null:this.at(t,D)}intersectsPlane(M){const D=M.distanceToPoint(this.origin);return D===0||M.normal.dot(this.direction)*D<0}intersectBox(M,D){let t,N,A,z,i,T;const I=1/this.direction.x,n=1/this.direction.y,u=1/this.direction.z,g=this.origin;return I>=0?(t=(M.min.x-g.x)*I,N=(M.max.x-g.x)*I):(t=(M.max.x-g.x)*I,N=(M.min.x-g.x)*I),n>=0?(A=(M.min.y-g.y)*n,z=(M.max.y-g.y)*n):(A=(M.max.y-g.y)*n,z=(M.min.y-g.y)*n),t>z||A>N||((A>t||isNaN(t))&&(t=A),(z<N||isNaN(N))&&(N=z),u>=0?(i=(M.min.z-g.z)*u,T=(M.max.z-g.z)*u):(i=(M.max.z-g.z)*u,T=(M.min.z-g.z)*u),t>T||i>N)||((i>t||t!==t)&&(t=i),(T<N||N!==N)&&(N=T),N<0)?null:this.at(t>=0?t:N,D)}intersectsBox(M){return this.intersectBox(M,ce)!==null}intersectTriangle(M,D,t,N,A){Pi.subVectors(D,M),nA.subVectors(t,M),Fi.crossVectors(Pi,nA);let z=this.direction.dot(Fi),i;if(z>0){if(N)return null;i=1}else if(z<0)i=-1,z=-z;else return null;ke.subVectors(this.origin,M);const T=i*this.direction.dot(nA.crossVectors(ke,nA));if(T<0)return null;const I=i*this.direction.dot(Pi.cross(ke));if(I<0||T+I>z)return null;const n=-i*ke.dot(Fi);return n<0?null:this.at(n/z,A)}applyMatrix4(M){return this.origin.applyMatrix4(M),this.direction.transformDirection(M),this}equals(M){return M.origin.equals(this.origin)&&M.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class YD{constructor(){YD.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(M,D,t,N,A,z,i,T,I,n,u,g,r,a,c,j){const s=this.elements;return s[0]=M,s[4]=D,s[8]=t,s[12]=N,s[1]=A,s[5]=z,s[9]=i,s[13]=T,s[2]=I,s[6]=n,s[10]=u,s[14]=g,s[3]=r,s[7]=a,s[11]=c,s[15]=j,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new YD().fromArray(this.elements)}copy(M){const D=this.elements,t=M.elements;return D[0]=t[0],D[1]=t[1],D[2]=t[2],D[3]=t[3],D[4]=t[4],D[5]=t[5],D[6]=t[6],D[7]=t[7],D[8]=t[8],D[9]=t[9],D[10]=t[10],D[11]=t[11],D[12]=t[12],D[13]=t[13],D[14]=t[14],D[15]=t[15],this}copyPosition(M){const D=this.elements,t=M.elements;return D[12]=t[12],D[13]=t[13],D[14]=t[14],this}setFromMatrix3(M){const D=M.elements;return this.set(D[0],D[3],D[6],0,D[1],D[4],D[7],0,D[2],D[5],D[8],0,0,0,0,1),this}extractBasis(M,D,t){return M.setFromMatrixColumn(this,0),D.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(M,D,t){return this.set(M.x,D.x,t.x,0,M.y,D.y,t.y,0,M.z,D.z,t.z,0,0,0,0,1),this}extractRotation(M){const D=this.elements,t=M.elements,N=1/mt.setFromMatrixColumn(M,0).length(),A=1/mt.setFromMatrixColumn(M,1).length(),z=1/mt.setFromMatrixColumn(M,2).length();return D[0]=t[0]*N,D[1]=t[1]*N,D[2]=t[2]*N,D[3]=0,D[4]=t[4]*A,D[5]=t[5]*A,D[6]=t[6]*A,D[7]=0,D[8]=t[8]*z,D[9]=t[9]*z,D[10]=t[10]*z,D[11]=0,D[12]=0,D[13]=0,D[14]=0,D[15]=1,this}makeRotationFromEuler(M){const D=this.elements,t=M.x,N=M.y,A=M.z,z=Math.cos(t),i=Math.sin(t),T=Math.cos(N),I=Math.sin(N),n=Math.cos(A),u=Math.sin(A);if(M.order==="XYZ"){const g=z*n,r=z*u,a=i*n,c=i*u;D[0]=T*n,D[4]=-T*u,D[8]=I,D[1]=r+a*I,D[5]=g-c*I,D[9]=-i*T,D[2]=c-g*I,D[6]=a+r*I,D[10]=z*T}else if(M.order==="YXZ"){const g=T*n,r=T*u,a=I*n,c=I*u;D[0]=g+c*i,D[4]=a*i-r,D[8]=z*I,D[1]=z*u,D[5]=z*n,D[9]=-i,D[2]=r*i-a,D[6]=c+g*i,D[10]=z*T}else if(M.order==="ZXY"){const g=T*n,r=T*u,a=I*n,c=I*u;D[0]=g-c*i,D[4]=-z*u,D[8]=a+r*i,D[1]=r+a*i,D[5]=z*n,D[9]=c-g*i,D[2]=-z*I,D[6]=i,D[10]=z*T}else if(M.order==="ZYX"){const g=z*n,r=z*u,a=i*n,c=i*u;D[0]=T*n,D[4]=a*I-r,D[8]=g*I+c,D[1]=T*u,D[5]=c*I+g,D[9]=r*I-a,D[2]=-I,D[6]=i*T,D[10]=z*T}else if(M.order==="YZX"){const g=z*T,r=z*I,a=i*T,c=i*I;D[0]=T*n,D[4]=c-g*u,D[8]=a*u+r,D[1]=u,D[5]=z*n,D[9]=-i*n,D[2]=-I*n,D[6]=r*u+a,D[10]=g-c*u}else if(M.order==="XZY"){const g=z*T,r=z*I,a=i*T,c=i*I;D[0]=T*n,D[4]=-u,D[8]=I*n,D[1]=g*u+c,D[5]=z*n,D[9]=r*u-a,D[2]=a*u-r,D[6]=i*n,D[10]=c*u+g}return D[3]=0,D[7]=0,D[11]=0,D[12]=0,D[13]=0,D[14]=0,D[15]=1,this}makeRotationFromQuaternion(M){return this.compose(T0,M,n0)}lookAt(M,D,t){const N=this.elements;return dD.subVectors(M,D),dD.lengthSq()===0&&(dD.z=1),dD.normalize(),Se.crossVectors(t,dD),Se.lengthSq()===0&&(Math.abs(t.z)===1?dD.x+=1e-4:dD.z+=1e-4,dD.normalize(),Se.crossVectors(t,dD)),Se.normalize(),uA.crossVectors(dD,Se),N[0]=Se.x,N[4]=uA.x,N[8]=dD.x,N[1]=Se.y,N[5]=uA.y,N[9]=dD.y,N[2]=Se.z,N[6]=uA.z,N[10]=dD.z,this}multiply(M){return this.multiplyMatrices(this,M)}premultiply(M){return this.multiplyMatrices(M,this)}multiplyMatrices(M,D){const t=M.elements,N=D.elements,A=this.elements,z=t[0],i=t[4],T=t[8],I=t[12],n=t[1],u=t[5],g=t[9],r=t[13],a=t[2],c=t[6],j=t[10],s=t[14],L=t[3],y=t[7],x=t[11],O=t[15],h=N[0],d=N[4],G=N[8],o=N[12],l=N[1],F=N[5],K=N[9],m=N[13],f=N[2],k=N[6],J=N[10],V=N[14],H=N[3],X=N[7],$=N[11],gM=N[15];return A[0]=z*h+i*l+T*f+I*H,A[4]=z*d+i*F+T*k+I*X,A[8]=z*G+i*K+T*J+I*$,A[12]=z*o+i*m+T*V+I*gM,A[1]=n*h+u*l+g*f+r*H,A[5]=n*d+u*F+g*k+r*X,A[9]=n*G+u*K+g*J+r*$,A[13]=n*o+u*m+g*V+r*gM,A[2]=a*h+c*l+j*f+s*H,A[6]=a*d+c*F+j*k+s*X,A[10]=a*G+c*K+j*J+s*$,A[14]=a*o+c*m+j*V+s*gM,A[3]=L*h+y*l+x*f+O*H,A[7]=L*d+y*F+x*k+O*X,A[11]=L*G+y*K+x*J+O*$,A[15]=L*o+y*m+x*V+O*gM,this}multiplyScalar(M){const D=this.elements;return D[0]*=M,D[4]*=M,D[8]*=M,D[12]*=M,D[1]*=M,D[5]*=M,D[9]*=M,D[13]*=M,D[2]*=M,D[6]*=M,D[10]*=M,D[14]*=M,D[3]*=M,D[7]*=M,D[11]*=M,D[15]*=M,this}determinant(){const M=this.elements,D=M[0],t=M[4],N=M[8],A=M[12],z=M[1],i=M[5],T=M[9],I=M[13],n=M[2],u=M[6],g=M[10],r=M[14],a=M[3],c=M[7],j=M[11],s=M[15];return a*(+A*T*u-N*I*u-A*i*g+t*I*g+N*i*r-t*T*r)+c*(+D*T*r-D*I*g+A*z*g-N*z*r+N*I*n-A*T*n)+j*(+D*I*u-D*i*r-A*z*u+t*z*r+A*i*n-t*I*n)+s*(-N*i*n-D*T*u+D*i*g+N*z*u-t*z*g+t*T*n)}transpose(){const M=this.elements;let D;return D=M[1],M[1]=M[4],M[4]=D,D=M[2],M[2]=M[8],M[8]=D,D=M[6],M[6]=M[9],M[9]=D,D=M[3],M[3]=M[12],M[12]=D,D=M[7],M[7]=M[13],M[13]=D,D=M[11],M[11]=M[14],M[14]=D,this}setPosition(M,D,t){const N=this.elements;return M.isVector3?(N[12]=M.x,N[13]=M.y,N[14]=M.z):(N[12]=M,N[13]=D,N[14]=t),this}invert(){const M=this.elements,D=M[0],t=M[1],N=M[2],A=M[3],z=M[4],i=M[5],T=M[6],I=M[7],n=M[8],u=M[9],g=M[10],r=M[11],a=M[12],c=M[13],j=M[14],s=M[15],L=u*j*I-c*g*I+c*T*r-i*j*r-u*T*s+i*g*s,y=a*g*I-n*j*I-a*T*r+z*j*r+n*T*s-z*g*s,x=n*c*I-a*u*I+a*i*r-z*c*r-n*i*s+z*u*s,O=a*u*T-n*c*T-a*i*g+z*c*g+n*i*j-z*u*j,h=D*L+t*y+N*x+A*O;if(h===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const d=1/h;return M[0]=L*d,M[1]=(c*g*A-u*j*A-c*N*r+t*j*r+u*N*s-t*g*s)*d,M[2]=(i*j*A-c*T*A+c*N*I-t*j*I-i*N*s+t*T*s)*d,M[3]=(u*T*A-i*g*A-u*N*I+t*g*I+i*N*r-t*T*r)*d,M[4]=y*d,M[5]=(n*j*A-a*g*A+a*N*r-D*j*r-n*N*s+D*g*s)*d,M[6]=(a*T*A-z*j*A-a*N*I+D*j*I+z*N*s-D*T*s)*d,M[7]=(z*g*A-n*T*A+n*N*I-D*g*I-z*N*r+D*T*r)*d,M[8]=x*d,M[9]=(a*u*A-n*c*A-a*t*r+D*c*r+n*t*s-D*u*s)*d,M[10]=(z*c*A-a*i*A+a*t*I-D*c*I-z*t*s+D*i*s)*d,M[11]=(n*i*A-z*u*A-n*t*I+D*u*I+z*t*r-D*i*r)*d,M[12]=O*d,M[13]=(n*c*N-a*u*N+a*t*g-D*c*g-n*t*j+D*u*j)*d,M[14]=(a*i*N-z*c*N-a*t*T+D*c*T+z*t*j-D*i*j)*d,M[15]=(z*u*N-n*i*N+n*t*T-D*u*T-z*t*g+D*i*g)*d,this}scale(M){const D=this.elements,t=M.x,N=M.y,A=M.z;return D[0]*=t,D[4]*=N,D[8]*=A,D[1]*=t,D[5]*=N,D[9]*=A,D[2]*=t,D[6]*=N,D[10]*=A,D[3]*=t,D[7]*=N,D[11]*=A,this}getMaxScaleOnAxis(){const M=this.elements,D=M[0]*M[0]+M[1]*M[1]+M[2]*M[2],t=M[4]*M[4]+M[5]*M[5]+M[6]*M[6],N=M[8]*M[8]+M[9]*M[9]+M[10]*M[10];return Math.sqrt(Math.max(D,t,N))}makeTranslation(M,D,t){return this.set(1,0,0,M,0,1,0,D,0,0,1,t,0,0,0,1),this}makeRotationX(M){const D=Math.cos(M),t=Math.sin(M);return this.set(1,0,0,0,0,D,-t,0,0,t,D,0,0,0,0,1),this}makeRotationY(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,0,t,0,0,1,0,0,-t,0,D,0,0,0,0,1),this}makeRotationZ(M){const D=Math.cos(M),t=Math.sin(M);return this.set(D,-t,0,0,t,D,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(M,D){const t=Math.cos(D),N=Math.sin(D),A=1-t,z=M.x,i=M.y,T=M.z,I=A*z,n=A*i;return this.set(I*z+t,I*i-N*T,I*T+N*i,0,I*i+N*T,n*i+t,n*T-N*z,0,I*T-N*i,n*T+N*z,A*T*T+t,0,0,0,0,1),this}makeScale(M,D,t){return this.set(M,0,0,0,0,D,0,0,0,0,t,0,0,0,0,1),this}makeShear(M,D,t,N,A,z){return this.set(1,t,A,0,M,1,z,0,D,N,1,0,0,0,0,1),this}compose(M,D,t){const N=this.elements,A=D._x,z=D._y,i=D._z,T=D._w,I=A+A,n=z+z,u=i+i,g=A*I,r=A*n,a=A*u,c=z*n,j=z*u,s=i*u,L=T*I,y=T*n,x=T*u,O=t.x,h=t.y,d=t.z;return N[0]=(1-(c+s))*O,N[1]=(r+x)*O,N[2]=(a-y)*O,N[3]=0,N[4]=(r-x)*h,N[5]=(1-(g+s))*h,N[6]=(j+L)*h,N[7]=0,N[8]=(a+y)*d,N[9]=(j-L)*d,N[10]=(1-(g+c))*d,N[11]=0,N[12]=M.x,N[13]=M.y,N[14]=M.z,N[15]=1,this}decompose(M,D,t){const N=this.elements;let A=mt.set(N[0],N[1],N[2]).length();const z=mt.set(N[4],N[5],N[6]).length(),i=mt.set(N[8],N[9],N[10]).length();this.determinant()<0&&(A=-A),M.x=N[12],M.y=N[13],M.z=N[14],HD.copy(this);const T=1/A,I=1/z,n=1/i;return HD.elements[0]*=T,HD.elements[1]*=T,HD.elements[2]*=T,HD.elements[4]*=I,HD.elements[5]*=I,HD.elements[6]*=I,HD.elements[8]*=n,HD.elements[9]*=n,HD.elements[10]*=n,D.setFromRotationMatrix(HD),t.x=A,t.y=z,t.z=i,this}makePerspective(M,D,t,N,A,z){const i=this.elements,T=2*A/(D-M),I=2*A/(t-N),n=(D+M)/(D-M),u=(t+N)/(t-N),g=-(z+A)/(z-A),r=-2*z*A/(z-A);return i[0]=T,i[4]=0,i[8]=n,i[12]=0,i[1]=0,i[5]=I,i[9]=u,i[13]=0,i[2]=0,i[6]=0,i[10]=g,i[14]=r,i[3]=0,i[7]=0,i[11]=-1,i[15]=0,this}makeOrthographic(M,D,t,N,A,z){const i=this.elements,T=1/(D-M),I=1/(t-N),n=1/(z-A),u=(D+M)*T,g=(t+N)*I,r=(z+A)*n;return i[0]=2*T,i[4]=0,i[8]=0,i[12]=-u,i[1]=0,i[5]=2*I,i[9]=0,i[13]=-g,i[2]=0,i[6]=0,i[10]=-2*n,i[14]=-r,i[3]=0,i[7]=0,i[11]=0,i[15]=1,this}equals(M){const D=this.elements,t=M.elements;for(let N=0;N<16;N++)if(D[N]!==t[N])return!1;return!0}fromArray(M,D=0){for(let t=0;t<16;t++)this.elements[t]=M[t+D];return this}toArray(M=[],D=0){const t=this.elements;return M[D]=t[0],M[D+1]=t[1],M[D+2]=t[2],M[D+3]=t[3],M[D+4]=t[4],M[D+5]=t[5],M[D+6]=t[6],M[D+7]=t[7],M[D+8]=t[8],M[D+9]=t[9],M[D+10]=t[10],M[D+11]=t[11],M[D+12]=t[12],M[D+13]=t[13],M[D+14]=t[14],M[D+15]=t[15],M}}const mt=new P,HD=new YD,T0=new P(0,0,0),n0=new P(1,1,1),Se=new P,uA=new P,dD=new P,nT=new YD,uT=new mN;class HA{constructor(M=0,D=0,t=0,N=HA.DEFAULT_ORDER){this.isEuler=!0,this._x=M,this._y=D,this._z=t,this._order=N}get x(){return this._x}set x(M){this._x=M,this._onChangeCallback()}get y(){return this._y}set y(M){this._y=M,this._onChangeCallback()}get z(){return this._z}set z(M){this._z=M,this._onChangeCallback()}get order(){return this._order}set order(M){this._order=M,this._onChangeCallback()}set(M,D,t,N=this._order){return this._x=M,this._y=D,this._z=t,this._order=N,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(M){return this._x=M._x,this._y=M._y,this._z=M._z,this._order=M._order,this._onChangeCallback(),this}setFromRotationMatrix(M,D=this._order,t=!0){const N=M.elements,A=N[0],z=N[4],i=N[8],T=N[1],I=N[5],n=N[9],u=N[2],g=N[6],r=N[10];switch(D){case"XYZ":this._y=Math.asin(LD(i,-1,1)),Math.abs(i)<.9999999?(this._x=Math.atan2(-n,r),this._z=Math.atan2(-z,A)):(this._x=Math.atan2(g,I),this._z=0);break;case"YXZ":this._x=Math.asin(-LD(n,-1,1)),Math.abs(n)<.9999999?(this._y=Math.atan2(i,r),this._z=Math.atan2(T,I)):(this._y=Math.atan2(-u,A),this._z=0);break;case"ZXY":this._x=Math.asin(LD(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-u,r),this._z=Math.atan2(-z,I)):(this._y=0,this._z=Math.atan2(T,A));break;case"ZYX":this._y=Math.asin(-LD(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,r),this._z=Math.atan2(T,A)):(this._x=0,this._z=Math.atan2(-z,I));break;case"YZX":this._z=Math.asin(LD(T,-1,1)),Math.abs(T)<.9999999?(this._x=Math.atan2(-n,I),this._y=Math.atan2(-u,A)):(this._x=0,this._y=Math.atan2(i,r));break;case"XZY":this._z=Math.asin(-LD(z,-1,1)),Math.abs(z)<.9999999?(this._x=Math.atan2(g,I),this._y=Math.atan2(i,A)):(this._x=Math.atan2(-n,r),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+D)}return this._order=D,t===!0&&this._onChangeCallback(),this}setFromQuaternion(M,D,t){return nT.makeRotationFromQuaternion(M),this.setFromRotationMatrix(nT,D,t)}setFromVector3(M,D=this._order){return this.set(M.x,M.y,M.z,D)}reorder(M){return uT.setFromEuler(this),this.setFromQuaternion(uT,M)}equals(M){return M._x===this._x&&M._y===this._y&&M._z===this._z&&M._order===this._order}fromArray(M){return this._x=M[0],this._y=M[1],this._z=M[2],M[3]!==void 0&&(this._order=M[3]),this._onChangeCallback(),this}toArray(M=[],D=0){return M[D]=this._x,M[D+1]=this._y,M[D+2]=this._z,M[D+3]=this._order,M}_onChange(M){return this._onChangeCallback=M,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}HA.DEFAULT_ORDER="XYZ";class u0{constructor(){this.mask=1}set(M){this.mask=(1<<M|0)>>>0}enable(M){this.mask|=1<<M|0}enableAll(){this.mask=-1}toggle(M){this.mask^=1<<M|0}disable(M){this.mask&=~(1<<M|0)}disableAll(){this.mask=0}test(M){return(this.mask&M.mask)!==0}isEnabled(M){return(this.mask&(1<<M|0))!==0}}let g0=0;const gT=new P,Qt=new mN,ye=new YD,gA=new P,gN=new P,r0=new P,s0=new mN,rT=new P(1,0,0),sT=new P(0,1,0),aT=new P(0,0,1),a0={type:"added"},jT={type:"removed"};class _D extends FA{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:g0++}),this.uuid=UN(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_D.DEFAULT_UP.clone();const M=new P,D=new HA,t=new mN,N=new P(1,1,1);function A(){t.setFromEuler(D,!1)}function z(){D.setFromQuaternion(t,void 0,!1)}D._onChange(A),t._onChange(z),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:M},rotation:{configurable:!0,enumerable:!0,value:D},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:N},modelViewMatrix:{value:new YD},normalMatrix:{value:new be}}),this.matrix=new YD,this.matrixWorld=new YD,this.matrixAutoUpdate=_D.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=_D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new u0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(M){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(M),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(M){return this.quaternion.premultiply(M),this}setRotationFromAxisAngle(M,D){this.quaternion.setFromAxisAngle(M,D)}setRotationFromEuler(M){this.quaternion.setFromEuler(M,!0)}setRotationFromMatrix(M){this.quaternion.setFromRotationMatrix(M)}setRotationFromQuaternion(M){this.quaternion.copy(M)}rotateOnAxis(M,D){return Qt.setFromAxisAngle(M,D),this.quaternion.multiply(Qt),this}rotateOnWorldAxis(M,D){return Qt.setFromAxisAngle(M,D),this.quaternion.premultiply(Qt),this}rotateX(M){return this.rotateOnAxis(rT,M)}rotateY(M){return this.rotateOnAxis(sT,M)}rotateZ(M){return this.rotateOnAxis(aT,M)}translateOnAxis(M,D){return gT.copy(M).applyQuaternion(this.quaternion),this.position.add(gT.multiplyScalar(D)),this}translateX(M){return this.translateOnAxis(rT,M)}translateY(M){return this.translateOnAxis(sT,M)}translateZ(M){return this.translateOnAxis(aT,M)}localToWorld(M){return this.updateWorldMatrix(!0,!1),M.applyMatrix4(this.matrixWorld)}worldToLocal(M){return this.updateWorldMatrix(!0,!1),M.applyMatrix4(ye.copy(this.matrixWorld).invert())}lookAt(M,D,t){M.isVector3?gA.copy(M):gA.set(M,D,t);const N=this.parent;this.updateWorldMatrix(!0,!1),gN.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ye.lookAt(gN,gA,this.up):ye.lookAt(gA,gN,this.up),this.quaternion.setFromRotationMatrix(ye),N&&(ye.extractRotation(N.matrixWorld),Qt.setFromRotationMatrix(ye),this.quaternion.premultiply(Qt.invert()))}add(M){if(arguments.length>1){for(let D=0;D<arguments.length;D++)this.add(arguments[D]);return this}return M===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",M),this):(M&&M.isObject3D?(M.parent!==null&&M.parent.remove(M),M.parent=this,this.children.push(M),M.dispatchEvent(a0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",M),this)}remove(M){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const D=this.children.indexOf(M);return D!==-1&&(M.parent=null,this.children.splice(D,1),M.dispatchEvent(jT)),this}removeFromParent(){const M=this.parent;return M!==null&&M.remove(this),this}clear(){for(let M=0;M<this.children.length;M++){const D=this.children[M];D.parent=null,D.dispatchEvent(jT)}return this.children.length=0,this}attach(M){return this.updateWorldMatrix(!0,!1),ye.copy(this.matrixWorld).invert(),M.parent!==null&&(M.parent.updateWorldMatrix(!0,!1),ye.multiply(M.parent.matrixWorld)),M.applyMatrix4(ye),this.add(M),M.updateWorldMatrix(!1,!0),this}getObjectById(M){return this.getObjectByProperty("id",M)}getObjectByName(M){return this.getObjectByProperty("name",M)}getObjectByProperty(M,D){if(this[M]===D)return this;for(let t=0,N=this.children.length;t<N;t++){const A=this.children[t].getObjectByProperty(M,D);if(A!==void 0)return A}}getObjectsByProperty(M,D){let t=[];this[M]===D&&t.push(this);for(let N=0,A=this.children.length;N<A;N++){const z=this.children[N].getObjectsByProperty(M,D);z.length>0&&(t=t.concat(z))}return t}getWorldPosition(M){return this.updateWorldMatrix(!0,!1),M.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(M){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gN,M,r0),M}getWorldScale(M){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gN,s0,M),M}getWorldDirection(M){this.updateWorldMatrix(!0,!1);const D=this.matrixWorld.elements;return M.set(D[8],D[9],D[10]).normalize()}raycast(){}traverse(M){M(this);const D=this.children;for(let t=0,N=D.length;t<N;t++)D[t].traverse(M)}traverseVisible(M){if(this.visible===!1)return;M(this);const D=this.children;for(let t=0,N=D.length;t<N;t++)D[t].traverseVisible(M)}traverseAncestors(M){const D=this.parent;D!==null&&(M(D),D.traverseAncestors(M))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(M){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||M)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,M=!0);const D=this.children;for(let t=0,N=D.length;t<N;t++){const A=D[t];(A.matrixWorldAutoUpdate===!0||M===!0)&&A.updateMatrixWorld(M)}}updateWorldMatrix(M,D){const t=this.parent;if(M===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),D===!0){const N=this.children;for(let A=0,z=N.length;A<z;A++){const i=N[A];i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!1,!0)}}}toJSON(M){const D=M===void 0||typeof M=="string",t={};D&&(M={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const N={};N.uuid=this.uuid,N.type=this.type,this.name!==""&&(N.name=this.name),this.castShadow===!0&&(N.castShadow=!0),this.receiveShadow===!0&&(N.receiveShadow=!0),this.visible===!1&&(N.visible=!1),this.frustumCulled===!1&&(N.frustumCulled=!1),this.renderOrder!==0&&(N.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(N.userData=this.userData),N.layers=this.layers.mask,N.matrix=this.matrix.toArray(),N.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(N.matrixAutoUpdate=!1),this.isInstancedMesh&&(N.type="InstancedMesh",N.count=this.count,N.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(N.instanceColor=this.instanceColor.toJSON()));function A(i,T){return i[T.uuid]===void 0&&(i[T.uuid]=T.toJSON(M)),T.uuid}if(this.isScene)this.background&&(this.background.isColor?N.background=this.background.toJSON():this.background.isTexture&&(N.background=this.background.toJSON(M).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(N.environment=this.environment.toJSON(M).uuid);else if(this.isMesh||this.isLine||this.isPoints){N.geometry=A(M.geometries,this.geometry);const i=this.geometry.parameters;if(i!==void 0&&i.shapes!==void 0){const T=i.shapes;if(Array.isArray(T))for(let I=0,n=T.length;I<n;I++){const u=T[I];A(M.shapes,u)}else A(M.shapes,T)}}if(this.isSkinnedMesh&&(N.bindMode=this.bindMode,N.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(A(M.skeletons,this.skeleton),N.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const i=[];for(let T=0,I=this.material.length;T<I;T++)i.push(A(M.materials,this.material[T]));N.material=i}else N.material=A(M.materials,this.material);if(this.children.length>0){N.children=[];for(let i=0;i<this.children.length;i++)N.children.push(this.children[i].toJSON(M).object)}if(this.animations.length>0){N.animations=[];for(let i=0;i<this.animations.length;i++){const T=this.animations[i];N.animations.push(A(M.animations,T))}}if(D){const i=z(M.geometries),T=z(M.materials),I=z(M.textures),n=z(M.images),u=z(M.shapes),g=z(M.skeletons),r=z(M.animations),a=z(M.nodes);i.length>0&&(t.geometries=i),T.length>0&&(t.materials=T),I.length>0&&(t.textures=I),n.length>0&&(t.images=n),u.length>0&&(t.shapes=u),g.length>0&&(t.skeletons=g),r.length>0&&(t.animations=r),a.length>0&&(t.nodes=a)}return t.object=N,t;function z(i){const T=[];for(const I in i){const n=i[I];delete n.metadata,T.push(n)}return T}}clone(M){return new this.constructor().copy(this,M)}copy(M,D=!0){if(this.name=M.name,this.up.copy(M.up),this.position.copy(M.position),this.rotation.order=M.rotation.order,this.quaternion.copy(M.quaternion),this.scale.copy(M.scale),this.matrix.copy(M.matrix),this.matrixWorld.copy(M.matrixWorld),this.matrixAutoUpdate=M.matrixAutoUpdate,this.matrixWorldNeedsUpdate=M.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=M.matrixWorldAutoUpdate,this.layers.mask=M.layers.mask,this.visible=M.visible,this.castShadow=M.castShadow,this.receiveShadow=M.receiveShadow,this.frustumCulled=M.frustumCulled,this.renderOrder=M.renderOrder,this.animations=M.animations,this.userData=JSON.parse(JSON.stringify(M.userData)),D===!0)for(let t=0;t<M.children.length;t++){const N=M.children[t];this.add(N.clone())}return this}}_D.DEFAULT_UP=new P(0,1,0);_D.DEFAULT_MATRIX_AUTO_UPDATE=!0;_D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const GD=new P,oe=new P,Bi=new P,Ce=new P,kt=new P,St=new P,cT=new P,Hi=new P,Gi=new P,Vi=new P;let rA=!1;class WD{constructor(M=new P,D=new P,t=new P){this.a=M,this.b=D,this.c=t}static getNormal(M,D,t,N){N.subVectors(t,D),GD.subVectors(M,D),N.cross(GD);const A=N.lengthSq();return A>0?N.multiplyScalar(1/Math.sqrt(A)):N.set(0,0,0)}static getBarycoord(M,D,t,N,A){GD.subVectors(N,D),oe.subVectors(t,D),Bi.subVectors(M,D);const z=GD.dot(GD),i=GD.dot(oe),T=GD.dot(Bi),I=oe.dot(oe),n=oe.dot(Bi),u=z*I-i*i;if(u===0)return A.set(-2,-1,-1);const g=1/u,r=(I*T-i*n)*g,a=(z*n-i*T)*g;return A.set(1-r-a,a,r)}static containsPoint(M,D,t,N){return this.getBarycoord(M,D,t,N,Ce),Ce.x>=0&&Ce.y>=0&&Ce.x+Ce.y<=1}static getUV(M,D,t,N,A,z,i,T){return rA===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),rA=!0),this.getInterpolation(M,D,t,N,A,z,i,T)}static getInterpolation(M,D,t,N,A,z,i,T){return this.getBarycoord(M,D,t,N,Ce),T.setScalar(0),T.addScaledVector(A,Ce.x),T.addScaledVector(z,Ce.y),T.addScaledVector(i,Ce.z),T}static isFrontFacing(M,D,t,N){return GD.subVectors(t,D),oe.subVectors(M,D),GD.cross(oe).dot(N)<0}set(M,D,t){return this.a.copy(M),this.b.copy(D),this.c.copy(t),this}setFromPointsAndIndices(M,D,t,N){return this.a.copy(M[D]),this.b.copy(M[t]),this.c.copy(M[N]),this}setFromAttributeAndIndices(M,D,t,N){return this.a.fromBufferAttribute(M,D),this.b.fromBufferAttribute(M,t),this.c.fromBufferAttribute(M,N),this}clone(){return new this.constructor().copy(this)}copy(M){return this.a.copy(M.a),this.b.copy(M.b),this.c.copy(M.c),this}getArea(){return GD.subVectors(this.c,this.b),oe.subVectors(this.a,this.b),GD.cross(oe).length()*.5}getMidpoint(M){return M.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(M){return WD.getNormal(this.a,this.b,this.c,M)}getPlane(M){return M.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(M,D){return WD.getBarycoord(M,this.a,this.b,this.c,D)}getUV(M,D,t,N,A){return rA===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),rA=!0),WD.getInterpolation(M,this.a,this.b,this.c,D,t,N,A)}getInterpolation(M,D,t,N,A){return WD.getInterpolation(M,this.a,this.b,this.c,D,t,N,A)}containsPoint(M){return WD.containsPoint(M,this.a,this.b,this.c)}isFrontFacing(M){return WD.isFrontFacing(this.a,this.b,this.c,M)}intersectsBox(M){return M.intersectsTriangle(this)}closestPointToPoint(M,D){const t=this.a,N=this.b,A=this.c;let z,i;kt.subVectors(N,t),St.subVectors(A,t),Hi.subVectors(M,t);const T=kt.dot(Hi),I=St.dot(Hi);if(T<=0&&I<=0)return D.copy(t);Gi.subVectors(M,N);const n=kt.dot(Gi),u=St.dot(Gi);if(n>=0&&u<=n)return D.copy(N);const g=T*u-n*I;if(g<=0&&T>=0&&n<=0)return z=T/(T-n),D.copy(t).addScaledVector(kt,z);Vi.subVectors(M,A);const r=kt.dot(Vi),a=St.dot(Vi);if(a>=0&&r<=a)return D.copy(A);const c=r*I-T*a;if(c<=0&&I>=0&&a<=0)return i=I/(I-a),D.copy(t).addScaledVector(St,i);const j=n*a-r*u;if(j<=0&&u-n>=0&&r-a>=0)return cT.subVectors(A,N),i=(u-n)/(u-n+(r-a)),D.copy(N).addScaledVector(cT,i);const s=1/(j+c+g);return z=c*s,i=g*s,D.copy(t).addScaledVector(kt,z).addScaledVector(St,i)}equals(M){return M.a.equals(this.a)&&M.b.equals(this.b)&&M.c.equals(this.c)}}let j0=0;class $t extends FA{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:j0++}),this.uuid=UN(),this.name="",this.type="Material",this.blending=tT,this.side=az,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Kc,this.blendDst=Rc,this.blendEquation=bc,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Pc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(M){this._alphaTest>0!=M>0&&this.version++,this._alphaTest=M}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(M){if(M!==void 0)for(const D in M){const t=M[D];if(t===void 0){console.warn(`THREE.Material: parameter '${D}' has value of undefined.`);continue}const N=this[D];if(N===void 0){console.warn(`THREE.Material: '${D}' is not a property of THREE.${this.type}.`);continue}N&&N.isColor?N.set(t):N&&N.isVector3&&t&&t.isVector3?N.copy(t):this[D]=t}}toJSON(M){const D=M===void 0||typeof M=="string";D&&(M={textures:{},images:{}});const t={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen!==void 0&&(t.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(t.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(t.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(t.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(t.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(M).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(M).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(M).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(t.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(t.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(t.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(t.iridescenceMap=this.iridescenceMap.toJSON(M).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(t.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(M).uuid),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(M).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(M).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(M).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(M).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(M).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(M).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(M).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(M).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(M).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(M).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(M).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(M).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(t.specularIntensityMap=this.specularIntensityMap.toJSON(M).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(t.specularColorMap=this.specularColorMap.toJSON(M).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(M).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(M).uuid),this.transmission!==void 0&&(t.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(t.transmissionMap=this.transmissionMap.toJSON(M).uuid),this.thickness!==void 0&&(t.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(t.thicknessMap=this.thicknessMap.toJSON(M).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(t.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(t.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==tT&&(t.blending=this.blending),this.side!==az&&(t.side=this.side),this.vertexColors&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=this.transparent),t.depthFunc=this.depthFunc,t.depthTest=this.depthTest,t.depthWrite=this.depthWrite,t.colorWrite=this.colorWrite,t.stencilWrite=this.stencilWrite,t.stencilWriteMask=this.stencilWriteMask,t.stencilFunc=this.stencilFunc,t.stencilRef=this.stencilRef,t.stencilFuncMask=this.stencilFuncMask,t.stencilFail=this.stencilFail,t.stencilZFail=this.stencilZFail,t.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(t.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(t.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(t.wireframe=this.wireframe),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(t.flatShading=this.flatShading),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),this.fog===!1&&(t.fog=!1),Object.keys(this.userData).length>0&&(t.userData=this.userData);function N(A){const z=[];for(const i in A){const T=A[i];delete T.metadata,z.push(T)}return z}if(D){const A=N(M.textures),z=N(M.images);A.length>0&&(t.textures=A),z.length>0&&(t.images=z)}return t}clone(){return new this.constructor().copy(this)}copy(M){this.name=M.name,this.blending=M.blending,this.side=M.side,this.vertexColors=M.vertexColors,this.opacity=M.opacity,this.transparent=M.transparent,this.blendSrc=M.blendSrc,this.blendDst=M.blendDst,this.blendEquation=M.blendEquation,this.blendSrcAlpha=M.blendSrcAlpha,this.blendDstAlpha=M.blendDstAlpha,this.blendEquationAlpha=M.blendEquationAlpha,this.depthFunc=M.depthFunc,this.depthTest=M.depthTest,this.depthWrite=M.depthWrite,this.stencilWriteMask=M.stencilWriteMask,this.stencilFunc=M.stencilFunc,this.stencilRef=M.stencilRef,this.stencilFuncMask=M.stencilFuncMask,this.stencilFail=M.stencilFail,this.stencilZFail=M.stencilZFail,this.stencilZPass=M.stencilZPass,this.stencilWrite=M.stencilWrite;const D=M.clippingPlanes;let t=null;if(D!==null){const N=D.length;t=new Array(N);for(let A=0;A!==N;++A)t[A]=D[A].clone()}return this.clippingPlanes=t,this.clipIntersection=M.clipIntersection,this.clipShadows=M.clipShadows,this.shadowSide=M.shadowSide,this.colorWrite=M.colorWrite,this.precision=M.precision,this.polygonOffset=M.polygonOffset,this.polygonOffsetFactor=M.polygonOffsetFactor,this.polygonOffsetUnits=M.polygonOffsetUnits,this.dithering=M.dithering,this.alphaTest=M.alphaTest,this.alphaToCoverage=M.alphaToCoverage,this.premultipliedAlpha=M.premultipliedAlpha,this.forceSinglePass=M.forceSinglePass,this.visible=M.visible,this.toneMapped=M.toneMapped,this.userData=JSON.parse(JSON.stringify(M.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(M){M===!0&&this.version++}}const Zn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},VD={h:0,s:0,l:0},sA={h:0,s:0,l:0};function Wi(e,M,D){return D<0&&(D+=1),D>1&&(D-=1),D<1/6?e+(M-e)*6*D:D<1/2?M:D<2/3?e+(M-e)*6*(2/3-D):e}class he{constructor(M,D,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,D===void 0&&t===void 0?this.set(M):this.setRGB(M,D,t)}set(M){return M&&M.isColor?this.copy(M):typeof M=="number"?this.setHex(M):typeof M=="string"&&this.setStyle(M),this}setScalar(M){return this.r=M,this.g=M,this.b=M,this}setHex(M,D=SD){return M=Math.floor(M),this.r=(M>>16&255)/255,this.g=(M>>8&255)/255,this.b=(M&255)/255,BD.toWorkingColorSpace(this,D),this}setRGB(M,D,t,N=BD.workingColorSpace){return this.r=M,this.g=D,this.b=t,BD.toWorkingColorSpace(this,N),this}setHSL(M,D,t,N=BD.workingColorSpace){if(M=qc(M,1),D=LD(D,0,1),t=LD(t,0,1),D===0)this.r=this.g=this.b=t;else{const A=t<=.5?t*(1+D):t+D-t*D,z=2*t-A;this.r=Wi(z,A,M+1/3),this.g=Wi(z,A,M),this.b=Wi(z,A,M-1/3)}return BD.toWorkingColorSpace(this,N),this}setStyle(M,D=SD){function t(A){A!==void 0&&parseFloat(A)<1&&console.warn("THREE.Color: Alpha component of "+M+" will be ignored.")}let N;if(N=/^(\w+)\(([^\)]*)\)/.exec(M)){let A;const z=N[1],i=N[2];switch(z){case"rgb":case"rgba":if(A=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i))return t(A[4]),this.setRGB(Math.min(255,parseInt(A[1],10))/255,Math.min(255,parseInt(A[2],10))/255,Math.min(255,parseInt(A[3],10))/255,D);if(A=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i))return t(A[4]),this.setRGB(Math.min(100,parseInt(A[1],10))/100,Math.min(100,parseInt(A[2],10))/100,Math.min(100,parseInt(A[3],10))/100,D);break;case"hsl":case"hsla":if(A=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i))return t(A[4]),this.setHSL(parseFloat(A[1])/360,parseFloat(A[2])/100,parseFloat(A[3])/100,D);break;default:console.warn("THREE.Color: Unknown color model "+M)}}else if(N=/^\#([A-Fa-f\d]+)$/.exec(M)){const A=N[1],z=A.length;if(z===3)return this.setRGB(parseInt(A.charAt(0),16)/15,parseInt(A.charAt(1),16)/15,parseInt(A.charAt(2),16)/15,D);if(z===6)return this.setHex(parseInt(A,16),D);console.warn("THREE.Color: Invalid hex color "+M)}else if(M&&M.length>0)return this.setColorName(M,D);return this}setColorName(M,D=SD){const t=Zn[M.toLowerCase()];return t!==void 0?this.setHex(t,D):console.warn("THREE.Color: Unknown color "+M),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(M){return this.r=M.r,this.g=M.g,this.b=M.b,this}copySRGBToLinear(M){return this.r=Gt(M.r),this.g=Gt(M.g),this.b=Gt(M.b),this}copyLinearToSRGB(M){return this.r=fi(M.r),this.g=fi(M.g),this.b=fi(M.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(M=SD){return BD.fromWorkingColorSpace(uD.copy(this),M),Math.round(LD(uD.r*255,0,255))*65536+Math.round(LD(uD.g*255,0,255))*256+Math.round(LD(uD.b*255,0,255))}getHexString(M=SD){return("000000"+this.getHex(M).toString(16)).slice(-6)}getHSL(M,D=BD.workingColorSpace){BD.fromWorkingColorSpace(uD.copy(this),D);const t=uD.r,N=uD.g,A=uD.b,z=Math.max(t,N,A),i=Math.min(t,N,A);let T,I;const n=(i+z)/2;if(i===z)T=0,I=0;else{const u=z-i;switch(I=n<=.5?u/(z+i):u/(2-z-i),z){case t:T=(N-A)/u+(N<A?6:0);break;case N:T=(A-t)/u+2;break;case A:T=(t-N)/u+4;break}T/=6}return M.h=T,M.s=I,M.l=n,M}getRGB(M,D=BD.workingColorSpace){return BD.fromWorkingColorSpace(uD.copy(this),D),M.r=uD.r,M.g=uD.g,M.b=uD.b,M}getStyle(M=SD){BD.fromWorkingColorSpace(uD.copy(this),M);const D=uD.r,t=uD.g,N=uD.b;return M!==SD?`color(${M} ${D.toFixed(3)} ${t.toFixed(3)} ${N.toFixed(3)})`:`rgb(${Math.round(D*255)},${Math.round(t*255)},${Math.round(N*255)})`}offsetHSL(M,D,t){return this.getHSL(VD),VD.h+=M,VD.s+=D,VD.l+=t,this.setHSL(VD.h,VD.s,VD.l),this}add(M){return this.r+=M.r,this.g+=M.g,this.b+=M.b,this}addColors(M,D){return this.r=M.r+D.r,this.g=M.g+D.g,this.b=M.b+D.b,this}addScalar(M){return this.r+=M,this.g+=M,this.b+=M,this}sub(M){return this.r=Math.max(0,this.r-M.r),this.g=Math.max(0,this.g-M.g),this.b=Math.max(0,this.b-M.b),this}multiply(M){return this.r*=M.r,this.g*=M.g,this.b*=M.b,this}multiplyScalar(M){return this.r*=M,this.g*=M,this.b*=M,this}lerp(M,D){return this.r+=(M.r-this.r)*D,this.g+=(M.g-this.g)*D,this.b+=(M.b-this.b)*D,this}lerpColors(M,D,t){return this.r=M.r+(D.r-M.r)*t,this.g=M.g+(D.g-M.g)*t,this.b=M.b+(D.b-M.b)*t,this}lerpHSL(M,D){this.getHSL(VD),M.getHSL(sA);const t=Qi(VD.h,sA.h,D),N=Qi(VD.s,sA.s,D),A=Qi(VD.l,sA.l,D);return this.setHSL(t,N,A),this}setFromVector3(M){return this.r=M.x,this.g=M.y,this.b=M.z,this}applyMatrix3(M){const D=this.r,t=this.g,N=this.b,A=M.elements;return this.r=A[0]*D+A[3]*t+A[6]*N,this.g=A[1]*D+A[4]*t+A[7]*N,this.b=A[2]*D+A[5]*t+A[8]*N,this}equals(M){return M.r===this.r&&M.g===this.g&&M.b===this.b}fromArray(M,D=0){return this.r=M[D],this.g=M[D+1],this.b=M[D+2],this}toArray(M=[],D=0){return M[D]=this.r,M[D+1]=this.g,M[D+2]=this.b,M}fromBufferAttribute(M,D){return this.r=M.getX(D),this.g=M.getY(D),this.b=M.getZ(D),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const uD=new he;he.NAMES=Zn;class c0 extends $t{constructor(M){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=kn,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.map=M.map,this.lightMap=M.lightMap,this.lightMapIntensity=M.lightMapIntensity,this.aoMap=M.aoMap,this.aoMapIntensity=M.aoMapIntensity,this.specularMap=M.specularMap,this.alphaMap=M.alphaMap,this.envMap=M.envMap,this.combine=M.combine,this.reflectivity=M.reflectivity,this.refractionRatio=M.refractionRatio,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.wireframeLinecap=M.wireframeLinecap,this.wireframeLinejoin=M.wireframeLinejoin,this.fog=M.fog,this}}const WM=new P,aA=new yD;class Vt{constructor(M,D,t=!1){if(Array.isArray(M))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=M,this.itemSize=D,this.count=M!==void 0?M.length/D:0,this.normalized=t,this.usage=iT,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(M){M===!0&&this.version++}setUsage(M){return this.usage=M,this}copy(M){return this.name=M.name,this.array=new M.array.constructor(M.array),this.itemSize=M.itemSize,this.count=M.count,this.normalized=M.normalized,this.usage=M.usage,this}copyAt(M,D,t){M*=this.itemSize,t*=D.itemSize;for(let N=0,A=this.itemSize;N<A;N++)this.array[M+N]=D.array[t+N];return this}copyArray(M){return this.array.set(M),this}applyMatrix3(M){if(this.itemSize===2)for(let D=0,t=this.count;D<t;D++)aA.fromBufferAttribute(this,D),aA.applyMatrix3(M),this.setXY(D,aA.x,aA.y);else if(this.itemSize===3)for(let D=0,t=this.count;D<t;D++)WM.fromBufferAttribute(this,D),WM.applyMatrix3(M),this.setXYZ(D,WM.x,WM.y,WM.z);return this}applyMatrix4(M){for(let D=0,t=this.count;D<t;D++)WM.fromBufferAttribute(this,D),WM.applyMatrix4(M),this.setXYZ(D,WM.x,WM.y,WM.z);return this}applyNormalMatrix(M){for(let D=0,t=this.count;D<t;D++)WM.fromBufferAttribute(this,D),WM.applyNormalMatrix(M),this.setXYZ(D,WM.x,WM.y,WM.z);return this}transformDirection(M){for(let D=0,t=this.count;D<t;D++)WM.fromBufferAttribute(this,D),WM.transformDirection(M),this.setXYZ(D,WM.x,WM.y,WM.z);return this}set(M,D=0){return this.array.set(M,D),this}getX(M){let D=this.array[M*this.itemSize];return this.normalized&&(D=iA(D,this.array)),D}setX(M,D){return this.normalized&&(D=vD(D,this.array)),this.array[M*this.itemSize]=D,this}getY(M){let D=this.array[M*this.itemSize+1];return this.normalized&&(D=iA(D,this.array)),D}setY(M,D){return this.normalized&&(D=vD(D,this.array)),this.array[M*this.itemSize+1]=D,this}getZ(M){let D=this.array[M*this.itemSize+2];return this.normalized&&(D=iA(D,this.array)),D}setZ(M,D){return this.normalized&&(D=vD(D,this.array)),this.array[M*this.itemSize+2]=D,this}getW(M){let D=this.array[M*this.itemSize+3];return this.normalized&&(D=iA(D,this.array)),D}setW(M,D){return this.normalized&&(D=vD(D,this.array)),this.array[M*this.itemSize+3]=D,this}setXY(M,D,t){return M*=this.itemSize,this.normalized&&(D=vD(D,this.array),t=vD(t,this.array)),this.array[M+0]=D,this.array[M+1]=t,this}setXYZ(M,D,t,N){return M*=this.itemSize,this.normalized&&(D=vD(D,this.array),t=vD(t,this.array),N=vD(N,this.array)),this.array[M+0]=D,this.array[M+1]=t,this.array[M+2]=N,this}setXYZW(M,D,t,N,A){return M*=this.itemSize,this.normalized&&(D=vD(D,this.array),t=vD(t,this.array),N=vD(N,this.array),A=vD(A,this.array)),this.array[M+0]=D,this.array[M+1]=t,this.array[M+2]=N,this.array[M+3]=A,this}onUpload(M){return this.onUploadCallback=M,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const M={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(M.name=this.name),this.usage!==iT&&(M.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(M.updateRange=this.updateRange),M}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class y0 extends Vt{constructor(M,D,t){super(new Uint16Array(M),D,t)}}class o0 extends Vt{constructor(M,D,t){super(new Uint32Array(M),D,t)}}class Oe extends Vt{constructor(M,D,t){super(new Float32Array(M),D,t)}}let C0=0;const QD=new YD,Xi=new _D,ft=new P,pD=new QN,rN=new QN,tD=new P;class Tt extends FA{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=UN(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(M){return Array.isArray(M)?this.index=new(Jc(M)?o0:y0)(M,1):this.index=M,this}getAttribute(M){return this.attributes[M]}setAttribute(M,D){return this.attributes[M]=D,this}deleteAttribute(M){return delete this.attributes[M],this}hasAttribute(M){return this.attributes[M]!==void 0}addGroup(M,D,t=0){this.groups.push({start:M,count:D,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(M,D){this.drawRange.start=M,this.drawRange.count=D}applyMatrix4(M){const D=this.attributes.position;D!==void 0&&(D.applyMatrix4(M),D.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const A=new be().getNormalMatrix(M);t.applyNormalMatrix(A),t.needsUpdate=!0}const N=this.attributes.tangent;return N!==void 0&&(N.transformDirection(M),N.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(M){return QD.makeRotationFromQuaternion(M),this.applyMatrix4(QD),this}rotateX(M){return QD.makeRotationX(M),this.applyMatrix4(QD),this}rotateY(M){return QD.makeRotationY(M),this.applyMatrix4(QD),this}rotateZ(M){return QD.makeRotationZ(M),this.applyMatrix4(QD),this}translate(M,D,t){return QD.makeTranslation(M,D,t),this.applyMatrix4(QD),this}scale(M,D,t){return QD.makeScale(M,D,t),this.applyMatrix4(QD),this}lookAt(M){return Xi.lookAt(M),Xi.updateMatrix(),this.applyMatrix4(Xi.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ft).negate(),this.translate(ft.x,ft.y,ft.z),this}setFromPoints(M){const D=[];for(let t=0,N=M.length;t<N;t++){const A=M[t];D.push(A.x,A.y,A.z||0)}return this.setAttribute("position",new Oe(D,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new QN);const M=this.attributes.position,D=this.morphAttributes.position;if(M&&M.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(M!==void 0){if(this.boundingBox.setFromBufferAttribute(M),D)for(let t=0,N=D.length;t<N;t++){const A=D[t];pD.setFromBufferAttribute(A),this.morphTargetsRelative?(tD.addVectors(this.boundingBox.min,pD.min),this.boundingBox.expandByPoint(tD),tD.addVectors(this.boundingBox.max,pD.max),this.boundingBox.expandByPoint(tD)):(this.boundingBox.expandByPoint(pD.min),this.boundingBox.expandByPoint(pD.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new BA);const M=this.attributes.position,D=this.morphAttributes.position;if(M&&M.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(M){const t=this.boundingSphere.center;if(pD.setFromBufferAttribute(M),D)for(let A=0,z=D.length;A<z;A++){const i=D[A];rN.setFromBufferAttribute(i),this.morphTargetsRelative?(tD.addVectors(pD.min,rN.min),pD.expandByPoint(tD),tD.addVectors(pD.max,rN.max),pD.expandByPoint(tD)):(pD.expandByPoint(rN.min),pD.expandByPoint(rN.max))}pD.getCenter(t);let N=0;for(let A=0,z=M.count;A<z;A++)tD.fromBufferAttribute(M,A),N=Math.max(N,t.distanceToSquared(tD));if(D)for(let A=0,z=D.length;A<z;A++){const i=D[A],T=this.morphTargetsRelative;for(let I=0,n=i.count;I<n;I++)tD.fromBufferAttribute(i,I),T&&(ft.fromBufferAttribute(M,I),tD.add(ft)),N=Math.max(N,t.distanceToSquared(tD))}this.boundingSphere.radius=Math.sqrt(N),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const M=this.index,D=this.attributes;if(M===null||D.position===void 0||D.normal===void 0||D.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=M.array,N=D.position.array,A=D.normal.array,z=D.uv.array,i=N.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*i),4));const T=this.getAttribute("tangent").array,I=[],n=[];for(let l=0;l<i;l++)I[l]=new P,n[l]=new P;const u=new P,g=new P,r=new P,a=new yD,c=new yD,j=new yD,s=new P,L=new P;function y(l,F,K){u.fromArray(N,l*3),g.fromArray(N,F*3),r.fromArray(N,K*3),a.fromArray(z,l*2),c.fromArray(z,F*2),j.fromArray(z,K*2),g.sub(u),r.sub(u),c.sub(a),j.sub(a);const m=1/(c.x*j.y-j.x*c.y);isFinite(m)&&(s.copy(g).multiplyScalar(j.y).addScaledVector(r,-c.y).multiplyScalar(m),L.copy(r).multiplyScalar(c.x).addScaledVector(g,-j.x).multiplyScalar(m),I[l].add(s),I[F].add(s),I[K].add(s),n[l].add(L),n[F].add(L),n[K].add(L))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.length}]);for(let l=0,F=x.length;l<F;++l){const K=x[l],m=K.start,f=K.count;for(let k=m,J=m+f;k<J;k+=3)y(t[k+0],t[k+1],t[k+2])}const O=new P,h=new P,d=new P,G=new P;function o(l){d.fromArray(A,l*3),G.copy(d);const F=I[l];O.copy(F),O.sub(d.multiplyScalar(d.dot(F))).normalize(),h.crossVectors(G,F);const K=h.dot(n[l])<0?-1:1;T[l*4]=O.x,T[l*4+1]=O.y,T[l*4+2]=O.z,T[l*4+3]=K}for(let l=0,F=x.length;l<F;++l){const K=x[l],m=K.start,f=K.count;for(let k=m,J=m+f;k<J;k+=3)o(t[k+0]),o(t[k+1]),o(t[k+2])}}computeVertexNormals(){const M=this.index,D=this.getAttribute("position");if(D!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new Vt(new Float32Array(D.count*3),3),this.setAttribute("normal",t);else for(let g=0,r=t.count;g<r;g++)t.setXYZ(g,0,0,0);const N=new P,A=new P,z=new P,i=new P,T=new P,I=new P,n=new P,u=new P;if(M)for(let g=0,r=M.count;g<r;g+=3){const a=M.getX(g+0),c=M.getX(g+1),j=M.getX(g+2);N.fromBufferAttribute(D,a),A.fromBufferAttribute(D,c),z.fromBufferAttribute(D,j),n.subVectors(z,A),u.subVectors(N,A),n.cross(u),i.fromBufferAttribute(t,a),T.fromBufferAttribute(t,c),I.fromBufferAttribute(t,j),i.add(n),T.add(n),I.add(n),t.setXYZ(a,i.x,i.y,i.z),t.setXYZ(c,T.x,T.y,T.z),t.setXYZ(j,I.x,I.y,I.z)}else for(let g=0,r=D.count;g<r;g+=3)N.fromBufferAttribute(D,g+0),A.fromBufferAttribute(D,g+1),z.fromBufferAttribute(D,g+2),n.subVectors(z,A),u.subVectors(N,A),n.cross(u),t.setXYZ(g+0,n.x,n.y,n.z),t.setXYZ(g+1,n.x,n.y,n.z),t.setXYZ(g+2,n.x,n.y,n.z);this.normalizeNormals(),t.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const M=this.attributes.normal;for(let D=0,t=M.count;D<t;D++)tD.fromBufferAttribute(M,D),tD.normalize(),M.setXYZ(D,tD.x,tD.y,tD.z)}toNonIndexed(){function M(i,T){const I=i.array,n=i.itemSize,u=i.normalized,g=new I.constructor(T.length*n);let r=0,a=0;for(let c=0,j=T.length;c<j;c++){i.isInterleavedBufferAttribute?r=T[c]*i.data.stride+i.offset:r=T[c]*n;for(let s=0;s<n;s++)g[a++]=I[r++]}return new Vt(g,n,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const D=new Tt,t=this.index.array,N=this.attributes;for(const i in N){const T=N[i],I=M(T,t);D.setAttribute(i,I)}const A=this.morphAttributes;for(const i in A){const T=[],I=A[i];for(let n=0,u=I.length;n<u;n++){const g=I[n],r=M(g,t);T.push(r)}D.morphAttributes[i]=T}D.morphTargetsRelative=this.morphTargetsRelative;const z=this.groups;for(let i=0,T=z.length;i<T;i++){const I=z[i];D.addGroup(I.start,I.count,I.materialIndex)}return D}toJSON(){const M={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(M.uuid=this.uuid,M.type=this.type,this.name!==""&&(M.name=this.name),Object.keys(this.userData).length>0&&(M.userData=this.userData),this.parameters!==void 0){const T=this.parameters;for(const I in T)T[I]!==void 0&&(M[I]=T[I]);return M}M.data={attributes:{}};const D=this.index;D!==null&&(M.data.index={type:D.array.constructor.name,array:Array.prototype.slice.call(D.array)});const t=this.attributes;for(const T in t){const I=t[T];M.data.attributes[T]=I.toJSON(M.data)}const N={};let A=!1;for(const T in this.morphAttributes){const I=this.morphAttributes[T],n=[];for(let u=0,g=I.length;u<g;u++){const r=I[u];n.push(r.toJSON(M.data))}n.length>0&&(N[T]=n,A=!0)}A&&(M.data.morphAttributes=N,M.data.morphTargetsRelative=this.morphTargetsRelative);const z=this.groups;z.length>0&&(M.data.groups=JSON.parse(JSON.stringify(z)));const i=this.boundingSphere;return i!==null&&(M.data.boundingSphere={center:i.center.toArray(),radius:i.radius}),M}clone(){return new this.constructor().copy(this)}copy(M){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const D={};this.name=M.name;const t=M.index;t!==null&&this.setIndex(t.clone(D));const N=M.attributes;for(const I in N){const n=N[I];this.setAttribute(I,n.clone(D))}const A=M.morphAttributes;for(const I in A){const n=[],u=A[I];for(let g=0,r=u.length;g<r;g++)n.push(u[g].clone(D));this.morphAttributes[I]=n}this.morphTargetsRelative=M.morphTargetsRelative;const z=M.groups;for(let I=0,n=z.length;I<n;I++){const u=z[I];this.addGroup(u.start,u.count,u.materialIndex)}const i=M.boundingBox;i!==null&&(this.boundingBox=i.clone());const T=M.boundingSphere;return T!==null&&(this.boundingSphere=T.clone()),this.drawRange.start=M.drawRange.start,this.drawRange.count=M.drawRange.count,this.userData=M.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yT=new YD,De=new lz,jA=new BA,oT=new P,Zt=new P,_t=new P,bt=new P,qi=new P,cA=new P,yA=new yD,oA=new yD,CA=new yD,CT=new P,LT=new P,wT=new P,LA=new P,wA=new P;class OT extends _D{constructor(M=new Tt,D=new c0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=M,this.material=D,this.updateMorphTargets()}copy(M,D){return super.copy(M,D),M.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=M.morphTargetInfluences.slice()),M.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},M.morphTargetDictionary)),this.material=M.material,this.geometry=M.geometry,this}updateMorphTargets(){const M=this.geometry.morphAttributes,D=Object.keys(M);if(D.length>0){const t=M[D[0]];if(t!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let N=0,A=t.length;N<A;N++){const z=t[N].name||String(N);this.morphTargetInfluences.push(0),this.morphTargetDictionary[z]=N}}}}getVertexPosition(M,D){const t=this.geometry,N=t.attributes.position,A=t.morphAttributes.position,z=t.morphTargetsRelative;D.fromBufferAttribute(N,M);const i=this.morphTargetInfluences;if(A&&i){cA.set(0,0,0);for(let T=0,I=A.length;T<I;T++){const n=i[T],u=A[T];n!==0&&(qi.fromBufferAttribute(u,M),z?cA.addScaledVector(qi,n):cA.addScaledVector(qi.sub(D),n))}D.add(cA)}return D}raycast(M,D){const t=this.geometry,N=this.material,A=this.matrixWorld;N!==void 0&&(t.boundingSphere===null&&t.computeBoundingSphere(),jA.copy(t.boundingSphere),jA.applyMatrix4(A),De.copy(M.ray).recast(M.near),!(jA.containsPoint(De.origin)===!1&&(De.intersectSphere(jA,oT)===null||De.origin.distanceToSquared(oT)>(M.far-M.near)**2))&&(yT.copy(A).invert(),De.copy(M.ray).applyMatrix4(yT),!(t.boundingBox!==null&&De.intersectsBox(t.boundingBox)===!1)&&this._computeIntersections(M,D)))}_computeIntersections(M,D){let t;const N=this.geometry,A=this.material,z=N.index,i=N.attributes.position,T=N.attributes.uv,I=N.attributes.uv1,n=N.attributes.normal,u=N.groups,g=N.drawRange;if(z!==null)if(Array.isArray(A))for(let r=0,a=u.length;r<a;r++){const c=u[r],j=A[c.materialIndex],s=Math.max(c.start,g.start),L=Math.min(z.count,Math.min(c.start+c.count,g.start+g.count));for(let y=s,x=L;y<x;y+=3){const O=z.getX(y),h=z.getX(y+1),d=z.getX(y+2);t=OA(this,j,M,De,T,I,n,O,h,d),t&&(t.faceIndex=Math.floor(y/3),t.face.materialIndex=c.materialIndex,D.push(t))}}else{const r=Math.max(0,g.start),a=Math.min(z.count,g.start+g.count);for(let c=r,j=a;c<j;c+=3){const s=z.getX(c),L=z.getX(c+1),y=z.getX(c+2);t=OA(this,A,M,De,T,I,n,s,L,y),t&&(t.faceIndex=Math.floor(c/3),D.push(t))}}else if(i!==void 0)if(Array.isArray(A))for(let r=0,a=u.length;r<a;r++){const c=u[r],j=A[c.materialIndex],s=Math.max(c.start,g.start),L=Math.min(i.count,Math.min(c.start+c.count,g.start+g.count));for(let y=s,x=L;y<x;y+=3){const O=y,h=y+1,d=y+2;t=OA(this,j,M,De,T,I,n,O,h,d),t&&(t.faceIndex=Math.floor(y/3),t.face.materialIndex=c.materialIndex,D.push(t))}}else{const r=Math.max(0,g.start),a=Math.min(i.count,g.start+g.count);for(let c=r,j=a;c<j;c+=3){const s=c,L=c+1,y=c+2;t=OA(this,A,M,De,T,I,n,s,L,y),t&&(t.faceIndex=Math.floor(c/3),D.push(t))}}}}function L0(e,M,D,t,N,A,z,i){let T;if(M.side===_c?T=t.intersectTriangle(z,A,N,!0,i):T=t.intersectTriangle(N,A,z,M.side===az,i),T===null)return null;wA.copy(i),wA.applyMatrix4(e.matrixWorld);const I=D.ray.origin.distanceTo(wA);return I<D.near||I>D.far?null:{distance:I,point:wA.clone(),object:e}}function OA(e,M,D,t,N,A,z,i,T,I){e.getVertexPosition(i,Zt),e.getVertexPosition(T,_t),e.getVertexPosition(I,bt);const n=L0(e,M,D,t,Zt,_t,bt,LA);if(n){N&&(yA.fromBufferAttribute(N,i),oA.fromBufferAttribute(N,T),CA.fromBufferAttribute(N,I),n.uv=WD.getInterpolation(LA,Zt,_t,bt,yA,oA,CA,new yD)),A&&(yA.fromBufferAttribute(A,i),oA.fromBufferAttribute(A,T),CA.fromBufferAttribute(A,I),n.uv1=WD.getInterpolation(LA,Zt,_t,bt,yA,oA,CA,new yD),n.uv2=n.uv1),z&&(CT.fromBufferAttribute(z,i),LT.fromBufferAttribute(z,T),wT.fromBufferAttribute(z,I),n.normal=WD.getInterpolation(LA,Zt,_t,bt,CT,LT,wT,new P),n.normal.dot(t.direction)>0&&n.normal.multiplyScalar(-1));const u={a:i,b:T,c:I,normal:new P,materialIndex:0};WD.getNormal(Zt,_t,bt,u.normal),n.face=u}return n}class w0 extends _D{constructor(){super(),this.isGroup=!0,this.type="Group"}}class QA extends $t{constructor(M){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.map=M.map,this.linewidth=M.linewidth,this.linecap=M.linecap,this.linejoin=M.linejoin,this.fog=M.fog,this}}const xT=new P,ET=new P,lT=new YD,Ji=new lz,xA=new BA;class O0 extends _D{constructor(M=new Tt,D=new QA){super(),this.isLine=!0,this.type="Line",this.geometry=M,this.material=D,this.updateMorphTargets()}copy(M,D){return super.copy(M,D),this.material=M.material,this.geometry=M.geometry,this}computeLineDistances(){const M=this.geometry;if(M.index===null){const D=M.attributes.position,t=[0];for(let N=1,A=D.count;N<A;N++)xT.fromBufferAttribute(D,N-1),ET.fromBufferAttribute(D,N),t[N]=t[N-1],t[N]+=xT.distanceTo(ET);M.setAttribute("lineDistance",new Oe(t,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(M,D){const t=this.geometry,N=this.matrixWorld,A=M.params.Line.threshold,z=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),xA.copy(t.boundingSphere),xA.applyMatrix4(N),xA.radius+=A,M.ray.intersectsSphere(xA)===!1)return;lT.copy(N).invert(),Ji.copy(M.ray).applyMatrix4(lT);const i=A/((this.scale.x+this.scale.y+this.scale.z)/3),T=i*i,I=new P,n=new P,u=new P,g=new P,r=this.isLineSegments?2:1,a=t.index,c=t.attributes.position;if(a!==null){const j=Math.max(0,z.start),s=Math.min(a.count,z.start+z.count);for(let L=j,y=s-1;L<y;L+=r){const x=a.getX(L),O=a.getX(L+1);if(I.fromBufferAttribute(c,x),n.fromBufferAttribute(c,O),Ji.distanceSqToSegment(I,n,g,u)>T)continue;g.applyMatrix4(this.matrixWorld);const h=M.ray.origin.distanceTo(g);h<M.near||h>M.far||D.push({distance:h,point:u.clone().applyMatrix4(this.matrixWorld),index:L,face:null,faceIndex:null,object:this})}}else{const j=Math.max(0,z.start),s=Math.min(c.count,z.start+z.count);for(let L=j,y=s-1;L<y;L+=r){if(I.fromBufferAttribute(c,L),n.fromBufferAttribute(c,L+1),Ji.distanceSqToSegment(I,n,g,u)>T)continue;g.applyMatrix4(this.matrixWorld);const x=M.ray.origin.distanceTo(g);x<M.near||x>M.far||D.push({distance:x,point:u.clone().applyMatrix4(this.matrixWorld),index:L,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const M=this.geometry.morphAttributes,D=Object.keys(M);if(D.length>0){const t=M[D[0]];if(t!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let N=0,A=t.length;N<A;N++){const z=t[N].name||String(N);this.morphTargetInfluences.push(0),this.morphTargetDictionary[z]=N}}}}}const hT=new P,vT=new P;class dT extends O0{constructor(M,D){super(M,D),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const M=this.geometry;if(M.index===null){const D=M.attributes.position,t=[];for(let N=0,A=D.count;N<A;N+=2)hT.fromBufferAttribute(D,N),vT.fromBufferAttribute(D,N+1),t[N]=N===0?0:t[N-1],t[N+1]=t[N]+hT.distanceTo(vT);M.setAttribute("lineDistance",new Oe(t,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class jN extends $t{constructor(M){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.map=M.map,this.alphaMap=M.alphaMap,this.size=M.size,this.sizeAttenuation=M.sizeAttenuation,this.fog=M.fog,this}}const pT=new YD,jz=new lz,EA=new BA,lA=new P;class $i extends _D{constructor(M=new Tt,D=new jN){super(),this.isPoints=!0,this.type="Points",this.geometry=M,this.material=D,this.updateMorphTargets()}copy(M,D){return super.copy(M,D),this.material=M.material,this.geometry=M.geometry,this}raycast(M,D){const t=this.geometry,N=this.matrixWorld,A=M.params.Points.threshold,z=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),EA.copy(t.boundingSphere),EA.applyMatrix4(N),EA.radius+=A,M.ray.intersectsSphere(EA)===!1)return;pT.copy(N).invert(),jz.copy(M.ray).applyMatrix4(pT);const i=A/((this.scale.x+this.scale.y+this.scale.z)/3),T=i*i,I=t.index,n=t.attributes.position;if(I!==null){const u=Math.max(0,z.start),g=Math.min(I.count,z.start+z.count);for(let r=u,a=g;r<a;r++){const c=I.getX(r);lA.fromBufferAttribute(n,c),YT(lA,c,T,N,M,D,this)}}else{const u=Math.max(0,z.start),g=Math.min(n.count,z.start+z.count);for(let r=u,a=g;r<a;r++)lA.fromBufferAttribute(n,r),YT(lA,r,T,N,M,D,this)}}updateMorphTargets(){const M=this.geometry.morphAttributes,D=Object.keys(M);if(D.length>0){const t=M[D[0]];if(t!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let N=0,A=t.length;N<A;N++){const z=t[N].name||String(N);this.morphTargetInfluences.push(0),this.morphTargetDictionary[z]=N}}}}}function YT(e,M,D,t,N,A,z){const i=jz.distanceSqToPoint(e);if(i<D){const T=new P;jz.closestPointToPoint(e,T),T.applyMatrix4(t);const I=N.ray.origin.distanceTo(T);if(I<N.near||I>N.far)return;A.push({distance:I,distanceToRay:Math.sqrt(i),point:T,index:M,face:null,object:z})}}class x0 extends $t{constructor(M){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new he(16777215),this.specular=new he(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wc,this.normalScale=new yD(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=kn,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(M)}copy(M){return super.copy(M),this.color.copy(M.color),this.specular.copy(M.specular),this.shininess=M.shininess,this.map=M.map,this.lightMap=M.lightMap,this.lightMapIntensity=M.lightMapIntensity,this.aoMap=M.aoMap,this.aoMapIntensity=M.aoMapIntensity,this.emissive.copy(M.emissive),this.emissiveMap=M.emissiveMap,this.emissiveIntensity=M.emissiveIntensity,this.bumpMap=M.bumpMap,this.bumpScale=M.bumpScale,this.normalMap=M.normalMap,this.normalMapType=M.normalMapType,this.normalScale.copy(M.normalScale),this.displacementMap=M.displacementMap,this.displacementScale=M.displacementScale,this.displacementBias=M.displacementBias,this.specularMap=M.specularMap,this.alphaMap=M.alphaMap,this.envMap=M.envMap,this.combine=M.combine,this.reflectivity=M.reflectivity,this.refractionRatio=M.refractionRatio,this.wireframe=M.wireframe,this.wireframeLinewidth=M.wireframeLinewidth,this.wireframeLinecap=M.wireframeLinecap,this.wireframeLinejoin=M.wireframeLinejoin,this.flatShading=M.flatShading,this.fog=M.fog,this}}const UT={enabled:!1,files:{},add:function(e,M){this.enabled!==!1&&(this.files[e]=M)},get:function(e){if(this.enabled!==!1)return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};class E0{constructor(M,D,t){const N=this;let A=!1,z=0,i=0,T;const I=[];this.onStart=void 0,this.onLoad=M,this.onProgress=D,this.onError=t,this.itemStart=function(n){i++,A===!1&&N.onStart!==void 0&&N.onStart(n,z,i),A=!0},this.itemEnd=function(n){z++,N.onProgress!==void 0&&N.onProgress(n,z,i),z===i&&(A=!1,N.onLoad!==void 0&&N.onLoad())},this.itemError=function(n){N.onError!==void 0&&N.onError(n)},this.resolveURL=function(n){return T?T(n):n},this.setURLModifier=function(n){return T=n,this},this.addHandler=function(n,u){return I.push(n,u),this},this.removeHandler=function(n){const u=I.indexOf(n);return u!==-1&&I.splice(u,2),this},this.getHandler=function(n){for(let u=0,g=I.length;u<g;u+=2){const r=I[u],a=I[u+1];if(r.global&&(r.lastIndex=0),r.test(n))return a}return null}}}const l0=new E0;class _n{constructor(M){this.manager=M!==void 0?M:l0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(M,D){const t=this;return new Promise(function(N,A){t.load(M,N,D,A)})}parse(){}setCrossOrigin(M){return this.crossOrigin=M,this}setWithCredentials(M){return this.withCredentials=M,this}setPath(M){return this.path=M,this}setResourcePath(M){return this.resourcePath=M,this}setRequestHeader(M){return this.requestHeader=M,this}}const Le={};class h0 extends Error{constructor(M,D){super(M),this.response=D}}class v0 extends _n{constructor(M){super(M)}load(M,D,t,N){M===void 0&&(M=""),this.path!==void 0&&(M=this.path+M),M=this.manager.resolveURL(M);const A=UT.get(M);if(A!==void 0)return this.manager.itemStart(M),setTimeout(()=>{D&&D(A),this.manager.itemEnd(M)},0),A;if(Le[M]!==void 0){Le[M].push({onLoad:D,onProgress:t,onError:N});return}Le[M]=[],Le[M].push({onLoad:D,onProgress:t,onError:N});const z=new Request(M,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),i=this.mimeType,T=this.responseType;fetch(z).then(I=>{if(I.status===200||I.status===0){if(I.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||I.body===void 0||I.body.getReader===void 0)return I;const n=Le[M],u=I.body.getReader(),g=I.headers.get("Content-Length")||I.headers.get("X-File-Size"),r=g?parseInt(g):0,a=r!==0;let c=0;const j=new ReadableStream({start(s){L();function L(){u.read().then(({done:y,value:x})=>{if(y)s.close();else{c+=x.byteLength;const O=new ProgressEvent("progress",{lengthComputable:a,loaded:c,total:r});for(let h=0,d=n.length;h<d;h++){const G=n[h];G.onProgress&&G.onProgress(O)}s.enqueue(x),L()}})}}});return new Response(j)}else throw new h0(`fetch for "${I.url}" responded with ${I.status}: ${I.statusText}`,I)}).then(I=>{switch(T){case"arraybuffer":return I.arrayBuffer();case"blob":return I.blob();case"document":return I.text().then(n=>new DOMParser().parseFromString(n,i));case"json":return I.json();default:if(i===void 0)return I.text();{const n=/charset="?([^;"\s]*)"?/i.exec(i),u=n&&n[1]?n[1].toLowerCase():void 0,g=new TextDecoder(u);return I.arrayBuffer().then(r=>g.decode(r))}}}).then(I=>{UT.add(M,I);const n=Le[M];delete Le[M];for(let u=0,g=n.length;u<g;u++){const r=n[u];r.onLoad&&r.onLoad(I)}}).catch(I=>{const n=Le[M];if(n===void 0)throw this.manager.itemError(M),I;delete Le[M];for(let u=0,g=n.length;u<g;u++){const r=n[u];r.onError&&r.onError(I)}this.manager.itemError(M)}).finally(()=>{this.manager.itemEnd(M)}),this.manager.itemStart(M)}setResponseType(M){return this.responseType=M,this}setMimeType(M){return this.mimeType=M,this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qn}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qn);const d0=/^[og]\s*(.+)?/,p0=/^mtllib /,Y0=/^usemtl /,U0=/^usemap /,mT=/\s+/,QT=new P,Mz=new P,kT=new P,ST=new P,kD=new P,hA=new he;function m0(){const e={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(M,D){if(this.object&&this.object.fromDeclaration===!1){this.object.name=M,this.object.fromDeclaration=D!==!1;return}const t=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:M||"",fromDeclaration:D!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(N,A){const z=this._finalize(!1);z&&(z.inherited||z.groupCount<=0)&&this.materials.splice(z.index,1);const i={index:this.materials.length,name:N||"",mtllib:Array.isArray(A)&&A.length>0?A[A.length-1]:"",smooth:z!==void 0?z.smooth:this.smooth,groupStart:z!==void 0?z.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(T){const I={index:typeof T=="number"?T:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return I.clone=this.clone.bind(I),I}};return this.materials.push(i),i},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(N){const A=this.currentMaterial();if(A&&A.groupEnd===-1&&(A.groupEnd=this.geometry.vertices.length/3,A.groupCount=A.groupEnd-A.groupStart,A.inherited=!1),N&&this.materials.length>1)for(let z=this.materials.length-1;z>=0;z--)this.materials[z].groupCount<=0&&this.materials.splice(z,1);return N&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),A}},t&&t.name&&typeof t.clone=="function"){const N=t.clone(0);N.inherited=!0,this.object.materials.push(N)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(M,D){const t=parseInt(M,10);return(t>=0?t-1:t+D/3)*3},parseNormalIndex:function(M,D){const t=parseInt(M,10);return(t>=0?t-1:t+D/3)*3},parseUVIndex:function(M,D){const t=parseInt(M,10);return(t>=0?t-1:t+D/2)*2},addVertex:function(M,D,t){const N=this.vertices,A=this.object.geometry.vertices;A.push(N[M+0],N[M+1],N[M+2]),A.push(N[D+0],N[D+1],N[D+2]),A.push(N[t+0],N[t+1],N[t+2])},addVertexPoint:function(M){const D=this.vertices;this.object.geometry.vertices.push(D[M+0],D[M+1],D[M+2])},addVertexLine:function(M){const D=this.vertices;this.object.geometry.vertices.push(D[M+0],D[M+1],D[M+2])},addNormal:function(M,D,t){const N=this.normals,A=this.object.geometry.normals;A.push(N[M+0],N[M+1],N[M+2]),A.push(N[D+0],N[D+1],N[D+2]),A.push(N[t+0],N[t+1],N[t+2])},addFaceNormal:function(M,D,t){const N=this.vertices,A=this.object.geometry.normals;QT.fromArray(N,M),Mz.fromArray(N,D),kT.fromArray(N,t),kD.subVectors(kT,Mz),ST.subVectors(QT,Mz),kD.cross(ST),kD.normalize(),A.push(kD.x,kD.y,kD.z),A.push(kD.x,kD.y,kD.z),A.push(kD.x,kD.y,kD.z)},addColor:function(M,D,t){const N=this.colors,A=this.object.geometry.colors;N[M]!==void 0&&A.push(N[M+0],N[M+1],N[M+2]),N[D]!==void 0&&A.push(N[D+0],N[D+1],N[D+2]),N[t]!==void 0&&A.push(N[t+0],N[t+1],N[t+2])},addUV:function(M,D,t){const N=this.uvs,A=this.object.geometry.uvs;A.push(N[M+0],N[M+1]),A.push(N[D+0],N[D+1]),A.push(N[t+0],N[t+1])},addDefaultUV:function(){const M=this.object.geometry.uvs;M.push(0,0),M.push(0,0),M.push(0,0)},addUVLine:function(M){const D=this.uvs;this.object.geometry.uvs.push(D[M+0],D[M+1])},addFace:function(M,D,t,N,A,z,i,T,I){const n=this.vertices.length;let u=this.parseVertexIndex(M,n),g=this.parseVertexIndex(D,n),r=this.parseVertexIndex(t,n);if(this.addVertex(u,g,r),this.addColor(u,g,r),i!==void 0&&i!==""){const a=this.normals.length;u=this.parseNormalIndex(i,a),g=this.parseNormalIndex(T,a),r=this.parseNormalIndex(I,a),this.addNormal(u,g,r)}else this.addFaceNormal(u,g,r);if(N!==void 0&&N!==""){const a=this.uvs.length;u=this.parseUVIndex(N,a),g=this.parseUVIndex(A,a),r=this.parseUVIndex(z,a),this.addUV(u,g,r),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(M){this.object.geometry.type="Points";const D=this.vertices.length;for(let t=0,N=M.length;t<N;t++){const A=this.parseVertexIndex(M[t],D);this.addVertexPoint(A),this.addColor(A)}},addLineGeometry:function(M,D){this.object.geometry.type="Line";const t=this.vertices.length,N=this.uvs.length;for(let A=0,z=M.length;A<z;A++)this.addVertexLine(this.parseVertexIndex(M[A],t));for(let A=0,z=D.length;A<z;A++)this.addUVLine(this.parseUVIndex(D[A],N))}};return e.startObject("",!1),e}class Q0 extends _n{constructor(M){super(M),this.materials=null}load(M,D,t,N){const A=this,z=new v0(this.manager);z.setPath(this.path),z.setRequestHeader(this.requestHeader),z.setWithCredentials(this.withCredentials),z.load(M,function(i){try{D(A.parse(i))}catch(T){N?N(T):console.error(T),A.manager.itemError(M)}},t,N)}setMaterials(M){return this.materials=M,this}parse(M){const D=new m0;M.indexOf(`\r
`)!==-1&&(M=M.replace(/\r\n/g,`
`)),M.indexOf(`\\
`)!==-1&&(M=M.replace(/\\\n/g,""));const t=M.split(`