/*! Built with http://stenciljs.com */
(function(Context,appNamespace,hydratedCssClass,publicPath){"use strict";
var s=document.querySelector("script[data-namespace='wordpress-api']");if(s){publicPath=s.getAttribute('data-path');}
(function(n,e,t,o,i){"use strict";function c(n,e,t,o,i,c,r){let f=t.n+(o||W),u=t[f];if(u||(u=t[f=t.n+W]),u){let o=e.e;if(e.t)if(1===t.encapsulation)o=i.shadowRoot;else for(;i=e.o(i);)if(i.host&&i.host.shadowRoot){o=i.host.shadowRoot;break}const c=n.i.get(o)||{};if(!c[f]){r=u.content.cloneNode(!0);const t=o.querySelectorAll("[data-styles]");e.c(o,r,t.length&&t[t.length-1].nextSibling||o.r),c[f]=!0,n.i.set(o,c)}}}function r(n){return{f:n[0],u:n[1],l:!!n[2],s:!!n[3],a:!!n[4]}}function f(n,e){if(x(e)){if(n===Boolean||3===n)return"false"!==e&&(""===e||!!e);if(n===Number||4===n)return parseFloat(e)}return e}function u(n,e,t,o){const i=n.p.get(e);i&&((o=i.$activeLoading)&&((t=o.indexOf(e))>-1&&o.splice(t,1),!o.length&&i.$initLoad()),n.p.delete(e))}function l(n,e,t){let o,i=!1,c=!1;for(var r=arguments.length;r-- >2;)L.push(arguments[r]);for(;L.length;)if((t=L.pop())&&void 0!==t.pop)for(r=t.length;r--;)L.push(t[r]);else"boolean"==typeof t&&(t=null),(c="function"!=typeof n)&&(null==t?t="":"number"==typeof t?t=String(t):"string"!=typeof t&&(c=!1)),c&&i?o[o.length-1].d+=t:void 0===o?o=[c?s(t):t]:o.push(c?s(t):t),i=c;const f=new A;if(f.m=n,f.y=o,e&&(f.w=e,f.v=e.b,f.M=e.ref,e.className&&(e.class=e.className),"object"==typeof e.class)){for(r in e.class)e.class[r]&&L.push(r);e.class=L.join(" "),L.length=0}return f}function s(n){const e=new A;return e.d=n,e}function a(n,e){n.k.has(e)||(n.k.set(e,!0),n.g.add(()=>{(function n(e,t,o,i,c){if(e.k.delete(t),!e.C.has(t)){let r;if(i=e.W.get(t),o=!i){if((c=e.p.get(t))&&!c.$rendered)return void(c.$onRender=c.$onRender||[]).push(()=>{n(e,t)});i=function r(n,e,t,o,i,c){try{(function r(n,e,t,o,i,c){for(c in n.N.set(o,t),n.j.has(t)||n.j.set(t,{}),(i=Object.assign({color:{type:String}},e.properties)).mode={type:String},i)d(n,i[c],t,o,c)})(n,o=n.O(e).x,e,t=new o)}catch(o){t={},n.S(o,7,e,!0)}return n.W.set(e,t),t}(e,t);try{i.componentWillLoad&&(r=i.componentWillLoad())}catch(n){e.S(n,3,t)}}r&&r.then?r.then(()=>p(e,t,i,o)):p(e,t,i,o)}})(n,e)}))}function p(n,e,t,o){(function i(n,e,t,o,c){try{const i=e.x.host;if(o.render||o.hostData||i){n.T=!0;const i=o.render&&o.render();let r;n.T=!1;const f=n.A.get(t)||new A;f.L=t,n.A.set(t,n.render(f,l(null,r,i),c,n.P.get(t),n.R.get(t),e.x.encapsulation))}n.q(n,n.B,e,o.mode,t),t.$rendered=!0,t.$onRender&&(t.$onRender.forEach(n=>n()),t.$onRender=null)}catch(e){n.T=!1,n.S(e,8,t,!0)}})(n,n.O(e),e,t,!o);try{o&&e.$initLoad()}catch(t){n.S(t,6,e,!0)}}function d(n,e,t,o,i){if(e.type||e.state){const c=n.j.get(t);if(!e.state){if(e.attr&&(void 0===c[i]||""===c[i])){const o=n.B.D(t,e.attr);null!=o&&(c[i]=f(e.type,o))}t.hasOwnProperty(i)&&(void 0===c[i]&&(c[i]=t[i]),delete t[i])}o.hasOwnProperty(i)&&void 0===c[i]&&(c[i]=o[i]),e.watchCallbacks&&(c[P+i]=e.watchCallbacks.slice()),h(o,i,function c(e){return(e=n.j.get(n.N.get(this)))&&e[i]},function r(t,o){(o=n.N.get(this))&&(e.state||e.mutable)&&m(n,o,i,t)})}else e.elementRef?y(o,i,t):e.method&&y(t,i,o[i].bind(o))}function m(n,e,t,o,i,c,r){(i=n.j.get(e))||n.j.set(e,i={}),o!==i[t]&&(i[t]=o,n.W.get(e)&&(i[P+t],!n.T&&e.$rendered&&a(n,e)))}function y(n,e,t){Object.defineProperty(n,e,{configurable:!0,value:t})}function h(n,e,t,o){Object.defineProperty(n,e,{configurable:!0,get:t,set:o})}function w(n,e,t,o,i){const c=11===t.L.nodeType&&t.L.host?t.L.host:t.L,r=e&&e.w||E,f=t.w||E;for(i in r)f&&null!=f[i]||null==r[i]||v(n,c,i,r[i],void 0,o);for(i in f)i in r&&f[i]===("value"===i||"checked"===i?c[i]:r[i])||v(n,c,i,r[i],f[i],o)}function v(n,e,t,o,i,c,r,f){if("class"!==t||c)if("style"===t){for(r in o=o||E,i=i||E,o)i[r]||(e.style[r]="");for(r in i)i[r]!==o[r]&&(e.style[r]=i[r])}else if("o"!==t[0]||"n"!==t[1]||t in e)if("list"!==t&&"type"!==t&&!c&&(t in e||-1!==["object","function"].indexOf(typeof i)&&null!==i)){const o=n.O(e);o&&o.H&&o.H[t]?b(e,t,i):"ref"!==t&&(b(e,t,null==i?"":i),null!=i&&!1!==i||e.removeAttribute(t))}else null!=i&&(r=t!==(t=t.replace(/^xlink\:?/,"")),1!==R[t]||i&&"false"!==i?"function"!=typeof i&&(r?e.setAttributeNS(q,S(t),i):e.setAttribute(t,i)):r?e.removeAttributeNS(q,S(t)):e.removeAttribute(t));else t=S(t.substring(2)),i?i!==o&&n.B.F(e,t,i):n.B.z(e,t);else if(o!==i){const n=null==o||""===o?N:o.trim().split(/\s+/),t=null==i||""===i?N:i.trim().split(/\s+/);let c=null==e.className||""===e.className?N:e.className.trim().split(/\s+/);for(r=0,f=n.length;r<f;r++)-1===t.indexOf(n[r])&&(c=c.filter(e=>e!==n[r]));for(r=0,f=t.length;r<f;r++)-1===n.indexOf(t[r])&&(c=[...c,t[r]]);e.className=c.join(" ")}}function b(n,e,t){try{n[e]=t}catch(n){}}function M(n,e){n&&(n.M&&n.M(e?null:n.L),n.y&&n.y.forEach(n=>{M(n,e)}))}function $(n,e,t,o,i){const c=n.I(e);let r,f,u,l;if(i&&1===c){(f=n.D(e,C))&&(u=f.split("."))[0]===o&&((l=new A).m=n.Q(l.L=e),t.y||(t.y=[]),t.y[u[1]]=l,t=l,i=""!==u[2]);for(let c=0;c<e.childNodes.length;c++)$(n,e.childNodes[c],t,o,i)}else 3===c&&(r=e.previousSibling)&&8===n.I(r)&&"s"===(u=n.U(r).split("."))[0]&&u[1]===o&&((l=s(n.U(e))).L=e,t.y||(t.y=[]),t.y[u[2]]=l)}function k(n,e,t,o){return function(){const i=arguments;return function c(n,e,t){return new Promise(o=>{let i=e[t];i||(i=n.G.querySelector(t)),i||(i=e[t]=n.J(t),n.K(n.G,i)),i.componentOnReady(o)})}(n,e,t).then(n=>n[o].apply(n,i))}}const g="data-ssrv",C="data-ssrc",W="$",E={},N=[],j={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},x=n=>void 0!==n&&null!==n,O=n=>void 0===n||null===n,S=n=>n.toLowerCase(),T=()=>{};class A{}const L=[],P="wc-",R={allowfullscreen:1,async:1,autofocus:1,autoplay:1,checked:1,controls:1,disabled:1,enabled:1,formnovalidate:1,hidden:1,multiple:1,noresize:1,readonly:1,required:1,selected:1,spellcheck:1},q="http://www.w3.org/1999/xlink";let B=!1;const D=n[o]=n[o]||{};{const o=function H(e,t,o,i,s,p){const d={html:{}},v={},b=function C(n,e){const t=new WeakMap,o={V:e.documentElement,e:e.head,G:e.body,X:!1,I:n=>n.nodeType,J:n=>e.createElement(n),Y:(n,t)=>e.createElementNS(n,t),Z:n=>e.createTextNode(n),_:n=>e.createComment(n),c:(n,e,t)=>n.insertBefore(e,t),nn:n=>n.remove(),K:(n,e)=>n.appendChild(e),en:n=>n.childNodes,o:n=>n.parentNode,tn:n=>n.nextSibling,Q:n=>S(n.tagName),U:n=>n.textContent,on:(n,e)=>n.textContent=e,D:(n,e)=>n.getAttribute(e),in:(n,e,t)=>n.setAttribute(e,t),cn:(n,e,t,o)=>n.setAttributeNS(e,t,o),rn:(n,e)=>n.removeAttribute(e),fn:(t,i)=>"child"===i?t.firstElementChild:"parent"===i?o.un(t):"body"===i?o.G:"document"===i?e:"window"===i?n:t,F:(n,e,i,c,r,f,u,l)=>{const s=e;let a=n,p=t.get(n);if(p&&p[s]&&p[s](),"string"==typeof f?a=o.fn(n,f):"object"==typeof f?a=f:(l=e.split(":")).length>1&&(a=o.fn(n,l[0]),e=l[1]),!a)return;let d=i;(l=e.split(".")).length>1&&(e=l[0],d=(n=>{n.keyCode===j[l[1]]&&i(n)})),u=o.X?{capture:!!c,passive:!!r}:!!c,a.addEventListener(e,d,u),p||t.set(n,p={}),p[s]=(()=>{a&&a.removeEventListener(e,d,u),p[s]=null})},z:(n,e)=>{const o=t.get(n);o&&(e?o[e]&&o[e]():Object.keys(o).forEach(n=>{o[n]&&o[n]()}))},un:(n,e)=>(e=o.o(n))&&11===o.I(e)?e.host:e};return o}(o,i);e.isServer=e.isPrerender=!(e.isClient=!0),e.window=o,e.location=o.location,e.document=i,e.publicPath=s,t.h=l,t.Context=e;const E=o.$definedCmps=o.$definedCmps||{},N={ln:function L(n,t){t.mode||(t.mode=b.D(t,"mode")||e.mode),b.D(t,g)||function o(n,e){return n&&1===e.encapsulation}(b.t,n)||function i(n,e,t,o,c,r,f,u,l){for(t.$defaultHolder||e.c(t,t.$defaultHolder=e._(""),o[0]),l=0;l<o.length;l++)c=o[l],1===e.I(c)&&null!=(r=e.D(c,"slot"))?(u=u||{})[r]?u[r].push(c):u[r]=[c]:f?f.push(c):f=[c];n.P.set(t,f),n.R.set(t,u)}(N,b,t,t.childNodes),b.t||1!==n.encapsulation||(t.shadowRoot=t)},B:b,sn:function P(n,e){if(!E[n.n]){E[n.n]=!0,function t(n,e,o,i){o.connectedCallback=function(){(function t(n,e,o){n.C.delete(o),n.an.has(o)||(n.an.set(o,!0),function i(n,e,t){for(t=e;t=n.B.un(t);)if(n.pn(t)){n.dn.has(e)||(n.p.set(e,t),(t.$activeLoading=t.$activeLoading||[]).push(e));break}}(n,o),n.g.add(()=>{n.ln(e,o),n.loadBundle(e,o.mode,()=>a(n,o))},3))})(n,e,this)},o.attributeChangedCallback=function(n,t,o){(function i(n,e,t,o,c,r){if(o!==c&&n)for(r in t=S(t),n)if(n[r].mn===t){e[r]=f(n[r].yn,c);break}})(e.H,this,n,t,o)},o.disconnectedCallback=function(){(function e(n,t,o){!n.hn&&function i(n,e){for(;e;){if(!n.o(e))return 9!==n.I(e);e=n.o(e)}}(n.B,t)&&(n.C.set(t,!0),u(n,t),M(n.A.get(t),!0),n.B.z(t),n.wn.delete(t))})(n,this)},o.componentOnReady=function(e,t){return e||(t=new Promise(n=>e=n)),function o(n,e,t,i){n.C.has(e)||(n.dn.has(e)?t(e):((i=n.vn.get(e)||[]).push(t),n.vn.set(e,i)))}(n,this,e),t},o.$initLoad=function(){(function e(n,t,o,i,c){if(!n.dn.has(t)&&n.W.get(t)&&!n.C.has(t)&&(!t.$activeLoading||!t.$activeLoading.length)){delete t.$activeLoading,n.dn.set(t,!0);try{M(n.A.get(t)),(c=n.vn.get(t))&&(c.forEach(n=>n(t)),n.vn.delete(t))}catch(e){n.S(e,4,t)}t.classList.add(o),u(n,t)}})(n,this,i)},o.bn=function(){a(n,this)},function c(n,e,t){e&&Object.keys(e).forEach(o=>{const i=e[o].Mn;1===i||2===i?h(t,o,function e(){return(n.j.get(this)||{})[o]},function e(t){m(n,this,o,t)}):6===i&&y(t,o,T)})}(n,e.H,o)}(N,n,e.prototype,p);{const t=[];for(const e in n.H)n.H[e].mn&&t.push(n.H[e].mn);e.observedAttributes=t}o.customElements.define(n.n,e)}},$n:e.emit,O:n=>d[b.Q(n)],kn:n=>e[n],isClient:!0,pn:n=>!(!E[b.Q(n)]&&!N.O(n)),loadBundle:function R(n,e,t){if(n.x)t();else{const o="string"==typeof n.gn?n.gn:n.gn[e],i=s+o+(function o(n,e){return 2===e.encapsulation||1===e.encapsulation&&!n}(b.t,n)?".sc":"")+".js";import(i).then(e=>{try{n.x=e[(n=>S(n).split("-").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(""))(n.n)],function o(n,e,t){const o=t.style;if(o){const i=t.is+(t.styleMode||W);if(!e[i]){const t=n.J("template");e[i]=t,t.innerHTML=`<style>${o}</style>`,n.K(n.e,t)}}}(b,n,n.x)}catch(e){n.x=class{}}t()}).catch(n=>void 0)}},S:(n,e,t)=>void 0,Cn:n=>(function e(n,t,o){return{create:k(n,t,o,"create"),componentOnReady:k(n,t,o,"componentOnReady")}})(b,v,n),g:function q(e,t,o){function i(){for(;s.length>0;)s.shift()();t=!1}function c(n){for(n=f(),i();a.length>0&&f()-n<40;)a.shift()();(o=a.length>0)&&u(r)}function r(n){for(i(),n=4+f();a.length>0&&f()<n;)a.shift()();(o=a.length>0)&&u(c)}const f=()=>e.performance.now(),u=e=>n.requestAnimationFrame(e),l=Promise.resolve(),s=[],a=[];return{add:(n,e)=>{3===e?(s.push(n),t||(t=!0,l.then(i))):(a.push(n),o||(o=!0,u(c)))}}}(o),Wn:n=>(n||[]).map(n=>(function e(n,t,o,i){const c={n:n[0],H:{color:{mn:"color"}}};c.gn=n[1];const f=n[3];if(f)for(o=0;o<f.length;o++)i=f[o],c.H[i[0]]={Mn:i[1],mn:"string"==typeof i[2]?i[2]:i[2]?i[0]:0,yn:i[3]};return c.encapsulation=n[4],n[5]&&(c.En=n[5].map(r)),t[c.n]=c})(n,d)),p:new WeakMap,i:new WeakMap,P:new WeakMap,an:new WeakMap,wn:new WeakMap,dn:new WeakMap,N:new WeakMap,W:new WeakMap,C:new WeakMap,k:new WeakMap,R:new WeakMap,vn:new WeakMap,Nn:new WeakMap,A:new WeakMap,j:new WeakMap};N.render=function D(n,e){function t(o,i,r,f,u,l,m,y,h){if("function"==typeof o.m&&(o=o.m(Object.assign({},o.w,{jn:o.y}))),!p&&"slot"===o.m){if((s||a)&&(d&&e.in(i,d+"-slot",""),m=o.w&&o.w.name,y=x(m)?a&&a[m]:s,x(y))){for(n.hn=!0,f=0;f<y.length;f++)l=y[f],e.nn(l),e.K(i,l),8!==l.nodeType&&(h=!0);!h&&o.y&&c(i,[],o.y),n.hn=!1}return null}if(x(o.d))o.L=e.Z(o.d);else{u=o.L=e.J(o.m),w(n,null,o,B),null!==d&&u.xn!==d&&e.in(u,u.xn=d,"");const i=o.y;if(i)for(f=0;f<i.length;++f)(l=t(i[f],u))&&e.K(u,l)}return o.L}function o(n,o,i,c,r,f,u){const l=n.$defaultHolder&&e.o(n.$defaultHolder)||n;for(;c<=r;++c)u=i[c],x(u)&&(f=x(u.d)?e.Z(u.d):t(u,n),x(f)&&(u.L=f,e.c(l,f,o)))}function i(n,t,o){for(;t<=o;++t)x(n[t])&&e.nn(n[t].L)}function c(n,c,l){let s,a,p,d,m=0,y=0,h=c.length-1,w=c[0],v=c[h],b=l.length-1,M=l[0],$=l[b];for(;m<=h&&y<=b;)null==w?w=c[++m]:null==v?v=c[--h]:null==M?M=l[++y]:null==$?$=l[--b]:r(w,M)?(u(w,M),w=c[++m],M=l[++y]):r(v,$)?(u(v,$),v=c[--h],$=l[--b]):r(w,$)?(u(w,$),e.c(n,w.L,e.tn(v.L)),w=c[++m],$=l[--b]):r(v,M)?(u(v,M),e.c(n,v.L,w.L),v=c[--h],M=l[++y]):(O(s)&&(s=f(c,m,h)),a=s[M.v],O(a)?(d=t(M,n),M=l[++y]):((p=c[a]).m!==M.m?d=t(M,n):(u(p,M),c[a]=void 0,d=p.L),M=l[++y]),d&&e.c(w.L&&w.L.parentNode||n,d,w.L));m>h?o(n,null==l[b+1]?null:l[b+1].L,l,y,b):y>b&&i(c,m,h)}function r(n,e){return n.m===e.m&&n.v===e.v}function f(n,e,t){const o={};let i,c,r;for(i=e;i<=t;++i)null!=(r=n[i])&&void 0!==(c=r.v)&&(o.On=i);return o}function u(t,r){const f=r.L=t.L,u=t.y,l=r.y;let s;if(O(r.d))"slot"!==r.m&&w(n,t,r,B),x(u)&&x(l)?c(f,u,l):x(l)?(x(t.d)&&e.on(f,""),o(f,null,l,0,l.length-1)):x(u)&&i(u,0,u.length-1);else if(s=n.P.get(f)){const t=s[0].parentElement;e.on(t,r.d),n.P.set(f,[t.childNodes[0]])}else t.d!==r.d&&e.on(f,r.d)}let l,s,a,p,d;return function n(t,o,i,c,r,f,p){return l=i,s=c,a=r,d="scoped"===f||"shadow"===f&&!e.t?"data-"+e.Q(t.L):null,l||d&&e.in(t.L,d+"-host",""),u(t,o),o}}(N,b);const H=b.V;return H.$rendered=!0,H.$activeLoading=[],H.$initLoad=(()=>N.dn.set(H,!0)),function F(n,e,t){const o=t.querySelectorAll(`[${g}]`),i=o.length;let c,r,f,u,l,s;if(i>0)for(n.dn.set(t,!0),u=0;u<i;u++)for(c=o[u],r=e.D(c,g),(f=new A).m=e.Q(f.L=c),n.A.set(c,f),l=0,s=c.childNodes.length;l<s;l++)$(e,c.childNodes[l],f,r,!0)}(N,b,H),N.q=c,N}(t,D,n,e,i,hydratedCssClass);o.Wn(D.components).forEach(n=>o.sn(n,class extends HTMLElement{}))}})(window,document,Context,appNamespace,publicPath);
})({},"WordpressApi","hydrated","/build/wordpress-api/");