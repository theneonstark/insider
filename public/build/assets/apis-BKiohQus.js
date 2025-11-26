import{r as l,j as S,d as p}from"./app-DQRmcWXg.js";import{c as Z,i as Y,r as K,a as Q}from"./createLucideIcon-DVGJj3ST.js";const X=l.forwardRef(({className:e,type:t,...r},a)=>S.jsx("input",{type:t,className:Z("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...r}));X.displayName="Input";function G(e){const t=J(e),r=l.forwardRef((a,o)=>{const{children:n,...s}=a,i=l.Children.toArray(n),c=i.find(te);if(c){const d=c.props.children,f=i.map(u=>u===c?l.Children.count(d)>1?l.Children.only(null):l.isValidElement(d)?d.props.children:null:u);return S.jsx(t,{...s,ref:o,children:l.isValidElement(d)?l.cloneElement(d,void 0,f):null})}return S.jsx(t,{...s,ref:o,children:n})});return r.displayName=`${e}.Slot`,r}function J(e){const t=l.forwardRef((r,a)=>{const{children:o,...n}=r;if(l.isValidElement(o)){const s=se(o),i=re(n,o.props);return o.type!==l.Fragment&&(i.ref=a?Y(a,s):s),l.cloneElement(o,i)}return l.Children.count(o)>1?l.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var ee=Symbol("radix.slottable");function te(e){return l.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===ee}function re(e,t){const r={...t};for(const a in t){const o=e[a],n=t[a];/^on[A-Z]/.test(a)?o&&n?r[a]=(...i)=>{const c=n(...i);return o(...i),c}:o&&(r[a]=o):a==="style"?r[a]={...o,...n}:a==="className"&&(r[a]=[o,n].filter(Boolean).join(" "))}return{...e,...r}}function se(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}var ae=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Qe=ae.reduce((e,t)=>{const r=G(`Primitive.${t}`),a=l.forwardRef((o,n)=>{const{asChild:s,...i}=o,c=s?r:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),S.jsx(c,{...i,ref:n})});return a.displayName=`Primitive.${t}`,{...e,[t]:a}},{});function Xe(e,t){e&&K.flushSync(()=>e.dispatchEvent(t))}/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Ge=Q("x",oe);let ne={data:""},ie=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||ne},le=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ce=/\/\*[^]*?\*\/|  +/g,z=/\n+/g,x=(e,t)=>{let r="",a="",o="";for(let n in e){let s=e[n];n[0]=="@"?n[1]=="i"?r=n+" "+s+";":a+=n[1]=="f"?x(s,n):n+"{"+x(s,n[1]=="k"?"":t)+"}":typeof s=="object"?a+=x(s,t?t.replace(/([^,])+/g,i=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,i):i?i+" "+c:c)):n):s!=null&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=x.p?x.p(n,s):n+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},w={},F=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+F(e[r]);return t}return e},de=(e,t,r,a,o)=>{let n=F(e),s=w[n]||(w[n]=(c=>{let d=0,f=11;for(;d<c.length;)f=101*f+c.charCodeAt(d++)>>>0;return"go"+f})(n));if(!w[s]){let c=n!==e?e:(d=>{let f,u,m=[{}];for(;f=le.exec(d.replace(ce,""));)f[4]?m.shift():f[3]?(u=f[3].replace(z," ").trim(),m.unshift(m[0][u]=m[0][u]||{})):m[0][f[1]]=f[2].replace(z," ").trim();return m[0]})(e);w[s]=x(o?{["@keyframes "+s]:c}:c,r?"":"."+s)}let i=r&&w.g?w.g:null;return r&&(w.g=w[s]),((c,d,f,u)=>{u?d.data=d.data.replace(u,c):d.data.indexOf(c)===-1&&(d.data=f?c+d.data:d.data+c)})(w[s],t,a,i),s},ue=(e,t,r)=>e.reduce((a,o,n)=>{let s=t[n];if(s&&s.call){let i=s(r),c=i&&i.props&&i.props.className||/^go/.test(i)&&i;s=c?"."+c:i&&typeof i=="object"?i.props?"":x(i,""):i===!1?"":i}return a+o+(s??"")},"");function j(e){let t=this||{},r=e.call?e(t.p):e;return de(r.unshift?r.raw?ue(r,[].slice.call(arguments,1),t.p):r.reduce((a,o)=>Object.assign(a,o&&o.call?o(t.p):o),{}):r,ie(t.target),t.g,t.o,t.k)}let H,I,T;j.bind({g:1});let v=j.bind({k:1});function pe(e,t,r,a){x.p=t,H=e,I=r,T=a}function E(e,t){let r=this||{};return function(){let a=arguments;function o(n,s){let i=Object.assign({},n),c=i.className||o.className;r.p=Object.assign({theme:I&&I()},i),r.o=/ *go\d+/.test(c),i.className=j.apply(r,a)+(c?" "+c:"");let d=e;return e[0]&&(d=i.as||e,delete i.as),T&&d[0]&&T(i),H(d,i)}return t?t(o):o}}var fe=e=>typeof e=="function",A=(e,t)=>fe(e)?e(t):e,me=(()=>{let e=0;return()=>(++e).toString()})(),M=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ye=20,_="default",V=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:a}=t;return V(e,{type:e.toasts.find(s=>s.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(s=>s.id===o||o===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+n}))}}},P=[],W={toasts:[],pausedAt:void 0,settings:{toastLimit:ye}},b={},U=(e,t=_)=>{b[t]=V(b[t]||W,e),P.forEach(([r,a])=>{r===t&&a(b[t])})},B=e=>Object.keys(b).forEach(t=>U(e,t)),he=e=>Object.keys(b).find(t=>b[t].toasts.some(r=>r.id===e)),D=(e=_)=>t=>{U(t,e)},ge={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},be=(e={},t=_)=>{let[r,a]=l.useState(b[t]||W),o=l.useRef(b[t]);l.useEffect(()=>(o.current!==b[t]&&a(b[t]),P.push([t,a]),()=>{let s=P.findIndex(([i])=>i===t);s>-1&&P.splice(s,1)}),[t]);let n=r.toasts.map(s=>{var i,c,d;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((i=e[s.type])==null?void 0:i.removeDelay)||e?.removeDelay,duration:s.duration||((c=e[s.type])==null?void 0:c.duration)||e?.duration||ge[s.type],style:{...e.style,...(d=e[s.type])==null?void 0:d.style,...s.style}}});return{...r,toasts:n}},we=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||me()}),C=e=>(t,r)=>{let a=we(t,e,r);return D(a.toasterId||he(a.id))({type:2,toast:a}),a.id},y=(e,t)=>C("blank")(e,t);y.error=C("error");y.success=C("success");y.loading=C("loading");y.custom=C("custom");y.dismiss=(e,t)=>{let r={type:3,toastId:e};t?D(t)(r):B(r)};y.dismissAll=e=>y.dismiss(void 0,e);y.remove=(e,t)=>{let r={type:4,toastId:e};t?D(t)(r):B(r)};y.removeAll=e=>y.remove(void 0,e);y.promise=(e,t,r)=>{let a=y.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let n=t.success?A(t.success,o):void 0;return n?y.success(n,{id:a,...r,...r?.success}):y.dismiss(a),o}).catch(o=>{let n=t.error?A(t.error,o):void 0;n?y.error(n,{id:a,...r,...r?.error}):y.dismiss(a)}),e};var ve=1e3,xe=(e,t="default")=>{let{toasts:r,pausedAt:a}=be(e,t),o=l.useRef(new Map).current,n=l.useCallback((u,m=ve)=>{if(o.has(u))return;let h=setTimeout(()=>{o.delete(u),s({type:4,toastId:u})},m);o.set(u,h)},[]);l.useEffect(()=>{if(a)return;let u=Date.now(),m=r.map(h=>{if(h.duration===1/0)return;let k=(h.duration||0)+h.pauseDuration-(u-h.createdAt);if(k<0){h.visible&&y.dismiss(h.id);return}return setTimeout(()=>y.dismiss(h.id,t),k)});return()=>{m.forEach(h=>h&&clearTimeout(h))}},[r,a,t]);let s=l.useCallback(D(t),[t]),i=l.useCallback(()=>{s({type:5,time:Date.now()})},[s]),c=l.useCallback((u,m)=>{s({type:1,toast:{id:u,height:m}})},[s]),d=l.useCallback(()=>{a&&s({type:6,time:Date.now()})},[a,s]),f=l.useCallback((u,m)=>{let{reverseOrder:h=!1,gutter:k=8,defaultPosition:R}=m||{},N=r.filter(g=>(g.position||R)===(u.position||R)&&g.height),q=N.findIndex(g=>g.id===u.id),L=N.filter((g,O)=>O<q&&g.visible).length;return N.filter(g=>g.visible).slice(...h?[L+1]:[0,L]).reduce((g,O)=>g+(O.height||0)+k,0)},[r]);return l.useEffect(()=>{r.forEach(u=>{if(u.dismissed)n(u.id,u.removeDelay);else{let m=o.get(u.id);m&&(clearTimeout(m),o.delete(u.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:c,startPause:i,endPause:d,calculateOffset:f}}},Ee=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ce=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ke=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,$e=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ee} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ce} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ke} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Pe=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Se=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Pe} 1s linear infinite;
`,Ae=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,je=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,De=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ae} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${je} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Ne=E("div")`
  position: absolute;
`,Oe=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ie=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Te=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ie} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,_e=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return t!==void 0?typeof t=="string"?l.createElement(Te,null,t):t:r==="blank"?null:l.createElement(Oe,null,l.createElement(Se,{...a}),r!=="loading"&&l.createElement(Ne,null,r==="error"?l.createElement($e,{...a}):l.createElement(De,{...a})))},Re=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Le=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ze="0%{opacity:0;} 100%{opacity:1;}",Fe="0%{opacity:1;} 100%{opacity:0;}",He=E("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Me=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ve=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=M()?[ze,Fe]:[Re(r),Le(r)];return{animation:t?`${v(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},We=l.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?Ve(e.position||t||"top-center",e.visible):{opacity:0},n=l.createElement(_e,{toast:e}),s=l.createElement(Me,{...e.ariaProps},A(e.message,e));return l.createElement(He,{className:e.className,style:{...o,...r,...e.style}},typeof a=="function"?a({icon:n,message:s}):l.createElement(l.Fragment,null,n,s))});pe(l.createElement);var Ue=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let n=l.useCallback(s=>{if(s){let i=()=>{let c=s.getBoundingClientRect().height;a(e,c)};i(),new MutationObserver(i).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:n,className:t,style:r},o)},Be=(e,t)=>{let r=e.includes("top"),a=r?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:M()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...a,...o}},qe=j`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,Je=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,toasterId:n,containerStyle:s,containerClassName:i})=>{let{toasts:c,handlers:d}=xe(r,n);return l.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...s},className:i,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(f=>{let u=f.position||t,m=d.calculateOffset(f,{reverseOrder:e,gutter:a,defaultPosition:t}),h=Be(u,m);return l.createElement(Ue,{id:f.id,key:f.id,onHeightUpdate:d.updateHeight,className:f.visible?qe:"",style:h},f.type==="custom"?A(f.message,f):o?o(f):l.createElement(We,{toast:f,position:u}))}))},et=y;const Ze=document.head.querySelector('meta[name="csrf-token"]')?.content,tt=async e=>{try{return await p.post("/register",e)}catch(t){throw console.error("Something Went Wrong",t),t}},rt=async e=>{try{return await p.post("/auth/check",{_token:Ze,...e})}catch(t){throw console.error("Error fetching business statistics:",t),t}},st=async()=>{try{return await p.get("/region")}catch(e){throw console.error(e),e}},at=async(e,t=!1)=>{try{let r;return t?r=await p.post("/auth/update",e,{headers:{"Content-Type":"multipart/form-data"}}):r=await p.post("/auth/update",{data:e}),r}catch(r){throw console.error("Something went wrong",r),r}},ot=async e=>{try{return await p.post("/updatelandingpage",e)}catch(t){throw console.error("Something went wrong",t),t}},nt=async()=>{try{return await p.get("/getLandingPage")}catch(e){throw console.error(e),e}},it=async()=>{try{return await p.get("/membership/plans")}catch(e){throw console.error(e),e}},lt=async e=>{try{return(await p.post("/increase-view",{id:e})).data}catch(t){throw console.error("Error increasing view:",t),t}},ct=async e=>{try{return await p.post("/featured",e)}catch(t){throw console.error(t),t}},dt=async e=>{try{return await p.post("/auth/passwordChange",e)}catch(t){throw console.error(t),t}},ut=async e=>{try{return await p.post("/search/filter",e)}catch(t){throw console.error(t),t}},pt=async()=>await p.get("/allUsers"),ft=async()=>{try{return await p.get("/data/sparkle")}catch(e){throw console.error(e),e}},mt=async()=>{try{return await p.get("/data/shine")}catch(e){throw console.error(e),e}},yt=async()=>{try{return await p.get("/data/shinePlus")}catch(e){throw console.error(e),e}},ht=()=>p.get("/ads/data"),gt=()=>p.get("/ads/your"),bt=e=>p.post("/ads/create",e,{headers:{"Content-Type":"multipart/form-data"}}),wt=e=>p.post("/admin/ads/create",e,{headers:{"Content-Type":"multipart/form-data"}}),vt=(e,t)=>p.post(`/ads/${e}`,t,{headers:{"Content-Type":"multipart/form-data"}}),xt=e=>p.delete(`/ads/${e}`),Et=(e,t)=>p.post(`/ads/${e}/status`,t),Ct=async()=>{try{return(await p.get("/admin/userdata"))?.data}catch(e){throw console.error(e),e}},kt=async()=>{try{return await p.get("/admin/revenue")}catch(e){throw console.error(e),e}},$t=async()=>{try{return await p.get("/admin/revenue-tier")}catch(e){throw console.error(e),e}},Pt=async e=>{try{return await p.post("/admin/feature/add",{user_id:e})}catch(t){throw console.error(t),t}},St=async e=>{try{return await p.post("/admin/feature/remove",{user_id:e})}catch(t){throw console.error(t),t}},At=async e=>{try{return await p.post("/admin/setting/update",e)}catch(t){throw console.error(t),t}};export{Xe as A,wt as C,st as D,Je as F,X as I,rt as L,Qe as P,Ge as X,$t as a,vt as b,At as c,St as d,Pt as e,Et as f,ht as g,xt as h,nt as i,ot as j,ct as k,bt as l,it as m,gt as n,dt as o,at as p,ut as q,kt as r,tt as s,ft as t,Ct as u,mt as v,yt as w,pt as x,lt as y,et as z};
