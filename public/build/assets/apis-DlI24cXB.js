import{r as l,j as S,d as f}from"./app-D8PK3UM-.js";import{c as Z,h as Y,r as K}from"./index-_NjlMxUf.js";const Q=l.forwardRef(({className:e,type:t,...r},a)=>S.jsx("input",{type:t,className:Z("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...r}));Q.displayName="Input";function G(e){const t=J(e),r=l.forwardRef((a,o)=>{const{children:n,...s}=a,i=l.Children.toArray(n),c=i.find(ee);if(c){const d=c.props.children,p=i.map(u=>u===c?l.Children.count(d)>1?l.Children.only(null):l.isValidElement(d)?d.props.children:null:u);return S.jsx(t,{...s,ref:o,children:l.isValidElement(d)?l.cloneElement(d,void 0,p):null})}return S.jsx(t,{...s,ref:o,children:n})});return r.displayName=`${e}.Slot`,r}function J(e){const t=l.forwardRef((r,a)=>{const{children:o,...n}=r;if(l.isValidElement(o)){const s=re(o),i=te(n,o.props);return o.type!==l.Fragment&&(i.ref=a?Y(a,s):s),l.cloneElement(o,i)}return l.Children.count(o)>1?l.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var X=Symbol("radix.slottable");function ee(e){return l.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===X}function te(e,t){const r={...t};for(const a in t){const o=e[a],n=t[a];/^on[A-Z]/.test(a)?o&&n?r[a]=(...i)=>{const c=n(...i);return o(...i),c}:o&&(r[a]=o):a==="style"?r[a]={...o,...n}:a==="className"&&(r[a]=[o,n].filter(Boolean).join(" "))}return{...e,...r}}function re(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}var se=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Ye=se.reduce((e,t)=>{const r=G(`Primitive.${t}`),a=l.forwardRef((o,n)=>{const{asChild:s,...i}=o,c=s?r:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),S.jsx(c,{...i,ref:n})});return a.displayName=`Primitive.${t}`,{...e,[t]:a}},{});function Ke(e,t){e&&K.flushSync(()=>e.dispatchEvent(t))}let ae={data:""},oe=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||ae},ne=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ie=/\/\*[^]*?\*\/|  +/g,z=/\n+/g,x=(e,t)=>{let r="",a="",o="";for(let n in e){let s=e[n];n[0]=="@"?n[1]=="i"?r=n+" "+s+";":a+=n[1]=="f"?x(s,n):n+"{"+x(s,n[1]=="k"?"":t)+"}":typeof s=="object"?a+=x(s,t?t.replace(/([^,])+/g,i=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,i):i?i+" "+c:c)):n):s!=null&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=x.p?x.p(n,s):n+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},w={},F=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+F(e[r]);return t}return e},le=(e,t,r,a,o)=>{let n=F(e),s=w[n]||(w[n]=(c=>{let d=0,p=11;for(;d<c.length;)p=101*p+c.charCodeAt(d++)>>>0;return"go"+p})(n));if(!w[s]){let c=n!==e?e:(d=>{let p,u,m=[{}];for(;p=ne.exec(d.replace(ie,""));)p[4]?m.shift():p[3]?(u=p[3].replace(z," ").trim(),m.unshift(m[0][u]=m[0][u]||{})):m[0][p[1]]=p[2].replace(z," ").trim();return m[0]})(e);w[s]=x(o?{["@keyframes "+s]:c}:c,r?"":"."+s)}let i=r&&w.g?w.g:null;return r&&(w.g=w[s]),((c,d,p,u)=>{u?d.data=d.data.replace(u,c):d.data.indexOf(c)===-1&&(d.data=p?c+d.data:d.data+c)})(w[s],t,a,i),s},ce=(e,t,r)=>e.reduce((a,o,n)=>{let s=t[n];if(s&&s.call){let i=s(r),c=i&&i.props&&i.props.className||/^go/.test(i)&&i;s=c?"."+c:i&&typeof i=="object"?i.props?"":x(i,""):i===!1?"":i}return a+o+(s??"")},"");function D(e){let t=this||{},r=e.call?e(t.p):e;return le(r.unshift?r.raw?ce(r,[].slice.call(arguments,1),t.p):r.reduce((a,o)=>Object.assign(a,o&&o.call?o(t.p):o),{}):r,oe(t.target),t.g,t.o,t.k)}let H,I,T;D.bind({g:1});let v=D.bind({k:1});function de(e,t,r,a){x.p=t,H=e,I=r,T=a}function E(e,t){let r=this||{};return function(){let a=arguments;function o(n,s){let i=Object.assign({},n),c=i.className||o.className;r.p=Object.assign({theme:I&&I()},i),r.o=/ *go\d+/.test(c),i.className=D.apply(r,a)+(c?" "+c:"");let d=e;return e[0]&&(d=i.as||e,delete i.as),T&&d[0]&&T(i),H(d,i)}return t?t(o):o}}var ue=e=>typeof e=="function",j=(e,t)=>ue(e)?e(t):e,pe=(()=>{let e=0;return()=>(++e).toString()})(),V=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),fe=20,R="default",W=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:a}=t;return W(e,{type:e.toasts.find(s=>s.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(s=>s.id===o||o===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+n}))}}},P=[],M={toasts:[],pausedAt:void 0,settings:{toastLimit:fe}},b={},B=(e,t=R)=>{b[t]=W(b[t]||M,e),P.forEach(([r,a])=>{r===t&&a(b[t])})},U=e=>Object.keys(b).forEach(t=>B(e,t)),me=e=>Object.keys(b).find(t=>b[t].toasts.some(r=>r.id===e)),A=(e=R)=>t=>{B(t,e)},he={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},ge=(e={},t=R)=>{let[r,a]=l.useState(b[t]||M),o=l.useRef(b[t]);l.useEffect(()=>(o.current!==b[t]&&a(b[t]),P.push([t,a]),()=>{let s=P.findIndex(([i])=>i===t);s>-1&&P.splice(s,1)}),[t]);let n=r.toasts.map(s=>{var i,c,d;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((i=e[s.type])==null?void 0:i.removeDelay)||e?.removeDelay,duration:s.duration||((c=e[s.type])==null?void 0:c.duration)||e?.duration||he[s.type],style:{...e.style,...(d=e[s.type])==null?void 0:d.style,...s.style}}});return{...r,toasts:n}},ye=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||pe()}),C=e=>(t,r)=>{let a=ye(t,e,r);return A(a.toasterId||me(a.id))({type:2,toast:a}),a.id},h=(e,t)=>C("blank")(e,t);h.error=C("error");h.success=C("success");h.loading=C("loading");h.custom=C("custom");h.dismiss=(e,t)=>{let r={type:3,toastId:e};t?A(t)(r):U(r)};h.dismissAll=e=>h.dismiss(void 0,e);h.remove=(e,t)=>{let r={type:4,toastId:e};t?A(t)(r):U(r)};h.removeAll=e=>h.remove(void 0,e);h.promise=(e,t,r)=>{let a=h.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let n=t.success?j(t.success,o):void 0;return n?h.success(n,{id:a,...r,...r?.success}):h.dismiss(a),o}).catch(o=>{let n=t.error?j(t.error,o):void 0;n?h.error(n,{id:a,...r,...r?.error}):h.dismiss(a)}),e};var be=1e3,we=(e,t="default")=>{let{toasts:r,pausedAt:a}=ge(e,t),o=l.useRef(new Map).current,n=l.useCallback((u,m=be)=>{if(o.has(u))return;let g=setTimeout(()=>{o.delete(u),s({type:4,toastId:u})},m);o.set(u,g)},[]);l.useEffect(()=>{if(a)return;let u=Date.now(),m=r.map(g=>{if(g.duration===1/0)return;let k=(g.duration||0)+g.pauseDuration-(u-g.createdAt);if(k<0){g.visible&&h.dismiss(g.id);return}return setTimeout(()=>h.dismiss(g.id,t),k)});return()=>{m.forEach(g=>g&&clearTimeout(g))}},[r,a,t]);let s=l.useCallback(A(t),[t]),i=l.useCallback(()=>{s({type:5,time:Date.now()})},[s]),c=l.useCallback((u,m)=>{s({type:1,toast:{id:u,height:m}})},[s]),d=l.useCallback(()=>{a&&s({type:6,time:Date.now()})},[a,s]),p=l.useCallback((u,m)=>{let{reverseOrder:g=!1,gutter:k=8,defaultPosition:_}=m||{},N=r.filter(y=>(y.position||_)===(u.position||_)&&y.height),q=N.findIndex(y=>y.id===u.id),L=N.filter((y,O)=>O<q&&y.visible).length;return N.filter(y=>y.visible).slice(...g?[L+1]:[0,L]).reduce((y,O)=>y+(O.height||0)+k,0)},[r]);return l.useEffect(()=>{r.forEach(u=>{if(u.dismissed)n(u.id,u.removeDelay);else{let m=o.get(u.id);m&&(clearTimeout(m),o.delete(u.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:c,startPause:i,endPause:d,calculateOffset:p}}},ve=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,xe=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ee=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ce=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ve} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${xe} 0.15s ease-out forwards;
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
    animation: ${Ee} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ke=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,$e=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ke} 1s linear infinite;
`,Pe=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Se=v`
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
}`,je=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Se} 0.2s ease-out forwards;
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
`,De=E("div")`
  position: absolute;
`,Ae=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ne=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Oe=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ne} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ie=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return t!==void 0?typeof t=="string"?l.createElement(Oe,null,t):t:r==="blank"?null:l.createElement(Ae,null,l.createElement($e,{...a}),r!=="loading"&&l.createElement(De,null,r==="error"?l.createElement(Ce,{...a}):l.createElement(je,{...a})))},Te=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Re=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,_e="0%{opacity:0;} 100%{opacity:1;}",Le="0%{opacity:1;} 100%{opacity:0;}",ze=E("div")`
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
`,Fe=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,He=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=V()?[_e,Le]:[Te(r),Re(r)];return{animation:t?`${v(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ve=l.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?He(e.position||t||"top-center",e.visible):{opacity:0},n=l.createElement(Ie,{toast:e}),s=l.createElement(Fe,{...e.ariaProps},j(e.message,e));return l.createElement(ze,{className:e.className,style:{...o,...r,...e.style}},typeof a=="function"?a({icon:n,message:s}):l.createElement(l.Fragment,null,n,s))});de(l.createElement);var We=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let n=l.useCallback(s=>{if(s){let i=()=>{let c=s.getBoundingClientRect().height;a(e,c)};i(),new MutationObserver(i).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:n,className:t,style:r},o)},Me=(e,t)=>{let r=e.includes("top"),a=r?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:V()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...a,...o}},Be=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,Qe=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,toasterId:n,containerStyle:s,containerClassName:i})=>{let{toasts:c,handlers:d}=we(r,n);return l.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...s},className:i,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(p=>{let u=p.position||t,m=d.calculateOffset(p,{reverseOrder:e,gutter:a,defaultPosition:t}),g=Me(u,m);return l.createElement(We,{id:p.id,key:p.id,onHeightUpdate:d.updateHeight,className:p.visible?Be:"",style:g},p.type==="custom"?j(p.message,p):o?o(p):l.createElement(Ve,{toast:p,position:u}))}))},Ge=h;const Ue=document.head.querySelector('meta[name="csrf-token"]')?.content,Je=async e=>{try{return await f.post("/register",e)}catch(t){throw console.error("Something Went Wrong",t),t}},Xe=async e=>{try{return await f.post("/auth/check",{_token:Ue,...e})}catch(t){throw console.error("Error fetching business statistics:",t),t}},et=async()=>{try{return await f.get("/region")}catch(e){throw console.error(e),e}},tt=async(e,t=!1)=>{try{let r;return t?r=await f.post("/auth/update",e,{headers:{"Content-Type":"multipart/form-data"}}):r=await f.post("/auth/update",{data:e}),r}catch(r){throw console.error("Something went wrong",r),r}},rt=async e=>{try{return await f.post("/updatelandingpage",e)}catch(t){throw console.error("Something went wrong",t),t}},st=async()=>{try{return await f.get("/getLandingPage")}catch(e){throw console.error(e),e}},at=async()=>{try{return await f.get("/membership/plans")}catch(e){throw console.error(e),e}},ot=async e=>{try{return(await f.post("/increase-view",{id:e})).data}catch(t){throw console.error("Error increasing view:",t),t}},nt=async e=>{try{return await f.post("/featured",e)}catch(t){throw console.error(t),t}},it=async e=>{try{return await f.post("/auth/passwordChange",e)}catch(t){throw console.error(t),t}},lt=async e=>{try{return await f.post("/search/filter",e)}catch(t){throw console.error(t),t}},ct=async()=>{try{return await f.get("/data/sparkle")}catch(e){throw console.error(e),e}},dt=async()=>{try{return await f.get("/data/shine")}catch(e){throw console.error(e),e}},ut=async()=>{try{return await f.get("/data/shinePlus")}catch(e){throw console.error(e),e}},pt=()=>f.get("/ads/data"),ft=e=>f.post("/ads/create",e,{headers:{"Content-Type":"multipart/form-data"}}),mt=(e,t)=>f.post(`/ads/${e}`,t,{headers:{"Content-Type":"multipart/form-data"}}),ht=e=>f.delete(`/ads/${e}`),gt=(e,t)=>f.post(`/ads/${e}/status`,t),yt=async()=>{try{return(await f.get("/admin/userdata"))?.data}catch(e){throw console.error(e),e}},bt=async()=>{try{return await f.get("/admin/revenue")}catch(e){throw console.error(e),e}},wt=async()=>{try{return await f.get("/admin/revenue-tier")}catch(e){throw console.error(e),e}},vt=async e=>{try{return await f.post("/admin/feature/add",{user_id:e})}catch(t){throw console.error(t),t}},xt=async e=>{try{return await f.post("/admin/feature/remove",{user_id:e})}catch(t){throw console.error(t),t}},Et=async e=>{try{return await f.post("/admin/setting/update",e)}catch(t){throw console.error(t),t}};export{ft as C,et as D,Qe as F,Q as I,Xe as L,Ye as P,wt as a,mt as b,Et as c,xt as d,vt as e,gt as f,pt as g,ht as h,st as i,rt as j,nt as k,it as l,at as m,tt as n,lt as o,Je as p,dt as q,bt as r,ct as s,ut as t,yt as u,ot as v,Ke as w,Ge as z};
