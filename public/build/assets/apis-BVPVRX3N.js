import{r as c,j as S,d}from"./app-Bpr-k0UO.js";import{c as Z,i as K,r as Y,a as G}from"./createLucideIcon-nG-ulZxx.js";const J=c.forwardRef(({className:e,type:t,...r},a)=>S.jsx("input",{type:t,className:Z("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...r}));J.displayName="Input";function Q(e){const t=X(e),r=c.forwardRef((a,o)=>{const{children:n,...s}=a,i=c.Children.toArray(n),l=i.find(te);if(l){const u=l.props.children,f=i.map(p=>p===l?c.Children.count(u)>1?c.Children.only(null):c.isValidElement(u)?u.props.children:null:p);return S.jsx(t,{...s,ref:o,children:c.isValidElement(u)?c.cloneElement(u,void 0,f):null})}return S.jsx(t,{...s,ref:o,children:n})});return r.displayName=`${e}.Slot`,r}function X(e){const t=c.forwardRef((r,a)=>{const{children:o,...n}=r;if(c.isValidElement(o)){const s=se(o),i=re(n,o.props);return o.type!==c.Fragment&&(i.ref=a?K(a,s):s),c.cloneElement(o,i)}return c.Children.count(o)>1?c.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var ee=Symbol("radix.slottable");function te(e){return c.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===ee}function re(e,t){const r={...t};for(const a in t){const o=e[a],n=t[a];/^on[A-Z]/.test(a)?o&&n?r[a]=(...i)=>{const l=n(...i);return o(...i),l}:o&&(r[a]=o):a==="style"?r[a]={...o,...n}:a==="className"&&(r[a]=[o,n].filter(Boolean).join(" "))}return{...e,...r}}function se(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}var ae=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Ge=ae.reduce((e,t)=>{const r=Q(`Primitive.${t}`),a=c.forwardRef((o,n)=>{const{asChild:s,...i}=o,l=s?r:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),S.jsx(l,{...i,ref:n})});return a.displayName=`Primitive.${t}`,{...e,[t]:a}},{});function Je(e,t){e&&Y.flushSync(()=>e.dispatchEvent(t))}/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Qe=G("x",oe);let ne={data:""},ie=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||ne},ce=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,le=/\/\*[^]*?\*\/|  +/g,z=/\n+/g,x=(e,t)=>{let r="",a="",o="";for(let n in e){let s=e[n];n[0]=="@"?n[1]=="i"?r=n+" "+s+";":a+=n[1]=="f"?x(s,n):n+"{"+x(s,n[1]=="k"?"":t)+"}":typeof s=="object"?a+=x(s,t?t.replace(/([^,])+/g,i=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):n):s!=null&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=x.p?x.p(n,s):n+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},w={},F=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+F(e[r]);return t}return e},de=(e,t,r,a,o)=>{let n=F(e),s=w[n]||(w[n]=(l=>{let u=0,f=11;for(;u<l.length;)f=101*f+l.charCodeAt(u++)>>>0;return"go"+f})(n));if(!w[s]){let l=n!==e?e:(u=>{let f,p,m=[{}];for(;f=ce.exec(u.replace(le,""));)f[4]?m.shift():f[3]?(p=f[3].replace(z," ").trim(),m.unshift(m[0][p]=m[0][p]||{})):m[0][f[1]]=f[2].replace(z," ").trim();return m[0]})(e);w[s]=x(o?{["@keyframes "+s]:l}:l,r?"":"."+s)}let i=r&&w.g?w.g:null;return r&&(w.g=w[s]),((l,u,f,p)=>{p?u.data=u.data.replace(p,l):u.data.indexOf(l)===-1&&(u.data=f?l+u.data:u.data+l)})(w[s],t,a,i),s},ue=(e,t,r)=>e.reduce((a,o,n)=>{let s=t[n];if(s&&s.call){let i=s(r),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;s=l?"."+l:i&&typeof i=="object"?i.props?"":x(i,""):i===!1?"":i}return a+o+(s??"")},"");function j(e){let t=this||{},r=e.call?e(t.p):e;return de(r.unshift?r.raw?ue(r,[].slice.call(arguments,1),t.p):r.reduce((a,o)=>Object.assign(a,o&&o.call?o(t.p):o),{}):r,ie(t.target),t.g,t.o,t.k)}let M,I,_;j.bind({g:1});let v=j.bind({k:1});function pe(e,t,r,a){x.p=t,M=e,I=r,_=a}function E(e,t){let r=this||{};return function(){let a=arguments;function o(n,s){let i=Object.assign({},n),l=i.className||o.className;r.p=Object.assign({theme:I&&I()},i),r.o=/ *go\d+/.test(l),i.className=j.apply(r,a)+(l?" "+l:"");let u=e;return e[0]&&(u=i.as||e,delete i.as),_&&u[0]&&_(i),M(u,i)}return t?t(o):o}}var fe=e=>typeof e=="function",A=(e,t)=>fe(e)?e(t):e,me=(()=>{let e=0;return()=>(++e).toString()})(),H=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),he=20,R="default",U=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:a}=t;return U(e,{type:e.toasts.find(s=>s.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(s=>s.id===o||o===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+n}))}}},P=[],V={toasts:[],pausedAt:void 0,settings:{toastLimit:he}},b={},W=(e,t=R)=>{b[t]=U(b[t]||V,e),P.forEach(([r,a])=>{r===t&&a(b[t])})},B=e=>Object.keys(b).forEach(t=>W(e,t)),ye=e=>Object.keys(b).find(t=>b[t].toasts.some(r=>r.id===e)),D=(e=R)=>t=>{W(t,e)},ge={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},be=(e={},t=R)=>{let[r,a]=c.useState(b[t]||V),o=c.useRef(b[t]);c.useEffect(()=>(o.current!==b[t]&&a(b[t]),P.push([t,a]),()=>{let s=P.findIndex(([i])=>i===t);s>-1&&P.splice(s,1)}),[t]);let n=r.toasts.map(s=>{var i,l,u;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((i=e[s.type])==null?void 0:i.removeDelay)||e?.removeDelay,duration:s.duration||((l=e[s.type])==null?void 0:l.duration)||e?.duration||ge[s.type],style:{...e.style,...(u=e[s.type])==null?void 0:u.style,...s.style}}});return{...r,toasts:n}},we=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||me()}),C=e=>(t,r)=>{let a=we(t,e,r);return D(a.toasterId||ye(a.id))({type:2,toast:a}),a.id},h=(e,t)=>C("blank")(e,t);h.error=C("error");h.success=C("success");h.loading=C("loading");h.custom=C("custom");h.dismiss=(e,t)=>{let r={type:3,toastId:e};t?D(t)(r):B(r)};h.dismissAll=e=>h.dismiss(void 0,e);h.remove=(e,t)=>{let r={type:4,toastId:e};t?D(t)(r):B(r)};h.removeAll=e=>h.remove(void 0,e);h.promise=(e,t,r)=>{let a=h.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let n=t.success?A(t.success,o):void 0;return n?h.success(n,{id:a,...r,...r?.success}):h.dismiss(a),o}).catch(o=>{let n=t.error?A(t.error,o):void 0;n?h.error(n,{id:a,...r,...r?.error}):h.dismiss(a)}),e};var ve=1e3,xe=(e,t="default")=>{let{toasts:r,pausedAt:a}=be(e,t),o=c.useRef(new Map).current,n=c.useCallback((p,m=ve)=>{if(o.has(p))return;let y=setTimeout(()=>{o.delete(p),s({type:4,toastId:p})},m);o.set(p,y)},[]);c.useEffect(()=>{if(a)return;let p=Date.now(),m=r.map(y=>{if(y.duration===1/0)return;let k=(y.duration||0)+y.pauseDuration-(p-y.createdAt);if(k<0){y.visible&&h.dismiss(y.id);return}return setTimeout(()=>h.dismiss(y.id,t),k)});return()=>{m.forEach(y=>y&&clearTimeout(y))}},[r,a,t]);let s=c.useCallback(D(t),[t]),i=c.useCallback(()=>{s({type:5,time:Date.now()})},[s]),l=c.useCallback((p,m)=>{s({type:1,toast:{id:p,height:m}})},[s]),u=c.useCallback(()=>{a&&s({type:6,time:Date.now()})},[a,s]),f=c.useCallback((p,m)=>{let{reverseOrder:y=!1,gutter:k=8,defaultPosition:T}=m||{},N=r.filter(g=>(g.position||T)===(p.position||T)&&g.height),q=N.findIndex(g=>g.id===p.id),L=N.filter((g,O)=>O<q&&g.visible).length;return N.filter(g=>g.visible).slice(...y?[L+1]:[0,L]).reduce((g,O)=>g+(O.height||0)+k,0)},[r]);return c.useEffect(()=>{r.forEach(p=>{if(p.dismissed)n(p.id,p.removeDelay);else{let m=o.get(p.id);m&&(clearTimeout(m),o.delete(p.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:l,startPause:i,endPause:u,calculateOffset:f}}},Ee=v`
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
}`,_e=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ie} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Re=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return t!==void 0?typeof t=="string"?c.createElement(_e,null,t):t:r==="blank"?null:c.createElement(Oe,null,c.createElement(Se,{...a}),r!=="loading"&&c.createElement(Ne,null,r==="error"?c.createElement($e,{...a}):c.createElement(De,{...a})))},Te=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Le=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ze="0%{opacity:0;} 100%{opacity:1;}",Fe="0%{opacity:1;} 100%{opacity:0;}",Me=E("div")`
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
`,He=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ue=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=H()?[ze,Fe]:[Te(r),Le(r)];return{animation:t?`${v(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ve=c.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?Ue(e.position||t||"top-center",e.visible):{opacity:0},n=c.createElement(Re,{toast:e}),s=c.createElement(He,{...e.ariaProps},A(e.message,e));return c.createElement(Me,{className:e.className,style:{...o,...r,...e.style}},typeof a=="function"?a({icon:n,message:s}):c.createElement(c.Fragment,null,n,s))});pe(c.createElement);var We=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let n=c.useCallback(s=>{if(s){let i=()=>{let l=s.getBoundingClientRect().height;a(e,l)};i(),new MutationObserver(i).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return c.createElement("div",{ref:n,className:t,style:r},o)},Be=(e,t)=>{let r=e.includes("top"),a=r?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:H()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...a,...o}},qe=j`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,Xe=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,toasterId:n,containerStyle:s,containerClassName:i})=>{let{toasts:l,handlers:u}=xe(r,n);return c.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...s},className:i,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(f=>{let p=f.position||t,m=u.calculateOffset(f,{reverseOrder:e,gutter:a,defaultPosition:t}),y=Be(p,m);return c.createElement(We,{id:f.id,key:f.id,onHeightUpdate:u.updateHeight,className:f.visible?qe:"",style:y},f.type==="custom"?A(f.message,f):o?o(f):c.createElement(Ve,{toast:f,position:p}))}))},et=h;const Ze=document.head.querySelector('meta[name="csrf-token"]')?.content,tt=async e=>{try{return await d.post("/register",e)}catch(t){throw console.error("Something Went Wrong",t),t}},rt=async e=>{try{return await d.post("/auth/check",{_token:Ze,...e})}catch(t){throw console.error("Error fetching business statistics:",t),t}},st=async()=>{try{return await d.get("/region")}catch(e){throw console.error(e),e}},at=async(e,t=!1)=>{try{let r;return t?r=await d.post("/auth/update",e,{headers:{"Content-Type":"multipart/form-data"}}):r=await d.post("/auth/update",{data:e}),r}catch(r){throw console.error("Something went wrong",r),r}},ot=async e=>{try{return await d.post("/updatelandingpage",e)}catch(t){throw console.error("Something went wrong",t),t}},nt=async()=>{try{return await d.get("/getLandingPage")}catch(e){throw console.error(e),e}},it=async()=>{try{return await d.get("/membership/plans")}catch(e){throw console.error(e),e}},ct=async e=>{try{return(await d.post("/increase-view",{id:e})).data}catch(t){throw console.error("Error increasing view:",t),t}},lt=async e=>{try{return await d.post("/featured",e)}catch(t){throw console.error(t),t}},dt=async e=>{try{return await d.post("/auth/passwordChange",e)}catch(t){throw console.error(t),t}},ut=async e=>{try{return await d.post("/search/filter",e)}catch(t){throw console.error(t),t}},pt=async()=>{try{return await d.get("/data/twinkle")}catch(e){throw console.error(e),e}},ft=async()=>{try{return await d.get("/data/sparkle")}catch(e){throw console.error(e),e}},mt=async()=>{try{return await d.get("/data/shine")}catch(e){throw console.error(e),e}},ht=async()=>{try{return await d.get("/data/shinePlus")}catch(e){throw console.error(e),e}},yt=()=>d.get("/ads/data"),gt=()=>d.get("/ads/your"),bt=e=>d.post("/ads/create",e,{headers:{"Content-Type":"multipart/form-data"}}),wt=e=>d.post("/admin/ads/create",e,{headers:{"Content-Type":"multipart/form-data"}}),vt=(e,t)=>d.post(`/ads/${e}`,t,{headers:{"Content-Type":"multipart/form-data"}}),xt=e=>d.delete(`/ads/${e}`),Et=(e,t)=>d.post(`/ads/${e}/status`,t),Ct=(e,t)=>d.post("/connect",{user_id:t}),kt=e=>d.post("/connect/accept",{connection_id:e}),$t=e=>d.post("/connect/remove",{connection_id:e}),Pt=()=>d.get("/connections"),St=async e=>d.get(`/connection/status/${e}`),At=async(e,t)=>d.post("/chat/send",{receiver_id:e,message:t}),jt=async e=>d.get(`/chat/${e}`),Dt=()=>d.get("/chat/list"),Nt=async()=>{try{return(await d.get("/admin/userdata"))?.data}catch(e){throw console.error(e),e}},Ot=async()=>{try{return await d.get("/admin/revenue")}catch(e){throw console.error(e),e}},It=async()=>{try{return await d.get("/admin/revenue-tier")}catch(e){throw console.error(e),e}},_t=async e=>{try{return await d.post("/admin/feature/add",e)}catch(t){throw console.error(t),t}},Rt=async e=>await d.post("/admin/add/user",e),Tt=async e=>{try{return await d.post("/admin/feature/remove",{user_id:e})}catch(t){throw console.error(t),t}},Lt=async e=>{try{return await d.post("/admin/setting/update",e)}catch(t){throw console.error(t),t}};export{At as A,at as B,wt as C,st as D,ut as E,Xe as F,tt as G,pt as H,J as I,ft as J,mt as K,rt as L,ht as M,ct as N,Je as O,Ge as P,Qe as X,Rt as a,It as b,vt as c,Lt as d,Tt as e,_t as f,yt as g,Et as h,xt as i,nt as j,ot as k,lt as l,bt as m,St as n,kt as o,Pt as p,Dt as q,Ot as r,Ct as s,it as t,Nt as u,gt as v,$t as w,dt as x,jt as y,et as z};
