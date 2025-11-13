import{r as l,j as _,d as m}from"./app-esbWCyrI.js";import{c as Y,h as Z,r as K}from"./index-blgN1C5h.js";const Q=l.forwardRef(({className:e,type:t,...r},s)=>_.jsx("input",{type:t,className:Y("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:s,...r}));Q.displayName="Input";var G=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Ue=G.reduce((e,t)=>{const r=Z(`Primitive.${t}`),s=l.forwardRef((i,o)=>{const{asChild:a,...n}=i,c=a?r:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),_.jsx(c,{...n,ref:o})});return s.displayName=`Primitive.${t}`,{...e,[t]:s}},{});function Be(e,t){e&&K.flushSync(()=>e.dispatchEvent(t))}let J={data:""},X=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||J},ee=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,te=/\/\*[^]*?\*\/|  +/g,F=/\n+/g,x=(e,t)=>{let r="",s="",i="";for(let o in e){let a=e[o];o[0]=="@"?o[1]=="i"?r=o+" "+a+";":s+=o[1]=="f"?x(a,o):o+"{"+x(a,o[1]=="k"?"":t)+"}":typeof a=="object"?s+=x(a,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):o):a!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=x.p?x.p(o,a):o+":"+a+";")}return r+(t&&i?t+"{"+i+"}":i)+s},w={},R=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+R(e[r]);return t}return e},re=(e,t,r,s,i)=>{let o=R(e),a=w[o]||(w[o]=(c=>{let u=0,p=11;for(;u<c.length;)p=101*p+c.charCodeAt(u++)>>>0;return"go"+p})(o));if(!w[a]){let c=o!==e?e:(u=>{let p,d,f=[{}];for(;p=ee.exec(u.replace(te,""));)p[4]?f.shift():p[3]?(d=p[3].replace(F," ").trim(),f.unshift(f[0][d]=f[0][d]||{})):f[0][p[1]]=p[2].replace(F," ").trim();return f[0]})(e);w[a]=x(i?{["@keyframes "+a]:c}:c,r?"":"."+a)}let n=r&&w.g?w.g:null;return r&&(w.g=w[a]),((c,u,p,d)=>{d?u.data=u.data.replace(d,c):u.data.indexOf(c)===-1&&(u.data=p?c+u.data:u.data+c)})(w[a],t,s,n),a},ae=(e,t,r)=>e.reduce((s,i,o)=>{let a=t[o];if(a&&a.call){let n=a(r),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;a=c?"."+c:n&&typeof n=="object"?n.props?"":x(n,""):n===!1?"":n}return s+i+(a??"")},"");function j(e){let t=this||{},r=e.call?e(t.p):e;return re(r.unshift?r.raw?ae(r,[].slice.call(arguments,1),t.p):r.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):r,X(t.target),t.g,t.o,t.k)}let M,I,z;j.bind({g:1});let v=j.bind({k:1});function se(e,t,r,s){x.p=t,M=e,I=r,z=s}function E(e,t){let r=this||{};return function(){let s=arguments;function i(o,a){let n=Object.assign({},o),c=n.className||i.className;r.p=Object.assign({theme:I&&I()},n),r.o=/ *go\d+/.test(c),n.className=j.apply(r,s)+(c?" "+c:"");let u=e;return e[0]&&(u=n.as||e,delete n.as),z&&u[0]&&z(n),M(u,n)}return t?t(i):i}}var oe=e=>typeof e=="function",D=(e,t)=>oe(e)?e(t):e,ie=(()=>{let e=0;return()=>(++e).toString()})(),H=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ne=20,A="default",U=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:s}=t;return U(e,{type:e.toasts.find(a=>a.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+o}))}}},C=[],B={toasts:[],pausedAt:void 0,settings:{toastLimit:ne}},b={},W=(e,t=A)=>{b[t]=U(b[t]||B,e),C.forEach(([r,s])=>{r===t&&s(b[t])})},q=e=>Object.keys(b).forEach(t=>W(e,t)),ce=e=>Object.keys(b).find(t=>b[t].toasts.some(r=>r.id===e)),N=(e=A)=>t=>{W(t,e)},le={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},de=(e={},t=A)=>{let[r,s]=l.useState(b[t]||B),i=l.useRef(b[t]);l.useEffect(()=>(i.current!==b[t]&&s(b[t]),C.push([t,s]),()=>{let a=C.findIndex(([n])=>n===t);a>-1&&C.splice(a,1)}),[t]);let o=r.toasts.map(a=>{var n,c,u;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((n=e[a.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:a.duration||((c=e[a.type])==null?void 0:c.duration)||e?.duration||le[a.type],style:{...e.style,...(u=e[a.type])==null?void 0:u.style,...a.style}}});return{...r,toasts:o}},ue=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||ie()}),k=e=>(t,r)=>{let s=ue(t,e,r);return N(s.toasterId||ce(s.id))({type:2,toast:s}),s.id},h=(e,t)=>k("blank")(e,t);h.error=k("error");h.success=k("success");h.loading=k("loading");h.custom=k("custom");h.dismiss=(e,t)=>{let r={type:3,toastId:e};t?N(t)(r):q(r)};h.dismissAll=e=>h.dismiss(void 0,e);h.remove=(e,t)=>{let r={type:4,toastId:e};t?N(t)(r):q(r)};h.removeAll=e=>h.remove(void 0,e);h.promise=(e,t,r)=>{let s=h.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?D(t.success,i):void 0;return o?h.success(o,{id:s,...r,...r?.success}):h.dismiss(s),i}).catch(i=>{let o=t.error?D(t.error,i):void 0;o?h.error(o,{id:s,...r,...r?.error}):h.dismiss(s)}),e};var pe=1e3,me=(e,t="default")=>{let{toasts:r,pausedAt:s}=de(e,t),i=l.useRef(new Map).current,o=l.useCallback((d,f=pe)=>{if(i.has(d))return;let g=setTimeout(()=>{i.delete(d),a({type:4,toastId:d})},f);i.set(d,g)},[]);l.useEffect(()=>{if(s)return;let d=Date.now(),f=r.map(g=>{if(g.duration===1/0)return;let $=(g.duration||0)+g.pauseDuration-(d-g.createdAt);if($<0){g.visible&&h.dismiss(g.id);return}return setTimeout(()=>h.dismiss(g.id,t),$)});return()=>{f.forEach(g=>g&&clearTimeout(g))}},[r,s,t]);let a=l.useCallback(N(t),[t]),n=l.useCallback(()=>{a({type:5,time:Date.now()})},[a]),c=l.useCallback((d,f)=>{a({type:1,toast:{id:d,height:f}})},[a]),u=l.useCallback(()=>{s&&a({type:6,time:Date.now()})},[s,a]),p=l.useCallback((d,f)=>{let{reverseOrder:g=!1,gutter:$=8,defaultPosition:T}=f||{},O=r.filter(y=>(y.position||T)===(d.position||T)&&y.height),V=O.findIndex(y=>y.id===d.id),L=O.filter((y,S)=>S<V&&y.visible).length;return O.filter(y=>y.visible).slice(...g?[L+1]:[0,L]).reduce((y,S)=>y+(S.height||0)+$,0)},[r]);return l.useEffect(()=>{r.forEach(d=>{if(d.dismissed)o(d.id,d.removeDelay);else{let f=i.get(d.id);f&&(clearTimeout(f),i.delete(d.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:n,endPause:u,calculateOffset:p}}},fe=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,he=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ge=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ye=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${fe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${he} 0.15s ease-out forwards;
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
    animation: ${ge} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,be=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,we=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${be} 1s linear infinite;
`,ve=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,xe=v`
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
}`,Ee=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ve} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${xe} 0.2s ease-out forwards;
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
`,ke=E("div")`
  position: absolute;
`,$e=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Pe=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ce=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Pe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,De=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement(Ce,null,t):t:r==="blank"?null:l.createElement($e,null,l.createElement(we,{...s}),r!=="loading"&&l.createElement(ke,null,r==="error"?l.createElement(ye,{...s}):l.createElement(Ee,{...s})))},je=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ne=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Oe="0%{opacity:0;} 100%{opacity:1;}",Se="0%{opacity:1;} 100%{opacity:0;}",Ie=E("div")`
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
`,ze=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ae=(e,t)=>{let r=e.includes("top")?1:-1,[s,i]=H()?[Oe,Se]:[je(r),Ne(r)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Te=l.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?Ae(e.position||t||"top-center",e.visible):{opacity:0},o=l.createElement(De,{toast:e}),a=l.createElement(ze,{...e.ariaProps},D(e.message,e));return l.createElement(Ie,{className:e.className,style:{...i,...r,...e.style}},typeof s=="function"?s({icon:o,message:a}):l.createElement(l.Fragment,null,o,a))});se(l.createElement);var Le=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=l.useCallback(a=>{if(a){let n=()=>{let c=a.getBoundingClientRect().height;s(e,c)};n(),new MutationObserver(n).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:o,className:t,style:r},i)},Fe=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:H()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...i}},_e=j`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,P=16,We=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:a,containerClassName:n})=>{let{toasts:c,handlers:u}=me(r,o);return l.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:P,left:P,right:P,bottom:P,pointerEvents:"none",...a},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(p=>{let d=p.position||t,f=u.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),g=Fe(d,f);return l.createElement(Le,{id:p.id,key:p.id,onHeightUpdate:u.updateHeight,className:p.visible?_e:"",style:g},p.type==="custom"?D(p.message,p):i?i(p):l.createElement(Te,{toast:p,position:d}))}))},qe=h;const Re=document.head.querySelector('meta[name="csrf-token"]')?.content,Ve=async e=>{try{return await m.post("/register",e)}catch(t){throw console.error("Something Went Wrong",t),t}},Ye=async e=>{try{return await m.post("/auth/check",{_token:Re,...e})}catch(t){throw console.error("Error fetching business statistics:",t),t}},Ze=async()=>{try{return await m.get("/region")}catch(e){throw console.error(e),e}},Ke=async(e,t=!1)=>{try{let r;return t?r=await m.post("/auth/update",e,{headers:{"Content-Type":"multipart/form-data"}}):r=await m.post("/auth/update",{data:e}),r}catch(r){throw console.error("Something went wrong",r),r}},Qe=async e=>{try{return await m.post("/updatelandingpage",e)}catch(t){throw console.error("Something went wrong",t),t}},Ge=async()=>{try{return await m.get("/getLandingPage")}catch(e){throw console.error(e),e}},Je=async()=>{try{return await m.get("/membership/plans")}catch(e){throw console.error(e),e}},Xe=async e=>{try{return(await m.post("/increase-view",{id:e})).data}catch(t){throw console.error("Error increasing view:",t),t}},et=async e=>{try{return await m.post("/featured",e)}catch(t){throw console.error(t),t}},tt=async e=>{try{return await m.post("/auth/passwordChange",e)}catch(t){throw console.error(t),t}},rt=async e=>{try{return await m.post("/search/filter",e)}catch(t){throw console.error(t),t}},at=async()=>{try{return await m.get("/data/sparkle")}catch(e){throw console.error(e),e}},st=async()=>{try{return await m.get("/data/shine")}catch(e){throw console.error(e),e}},ot=async()=>{try{return await m.get("/data/shinePlus")}catch(e){throw console.error(e),e}},it=async()=>{try{return(await m.get("/admin/userdata"))?.data}catch(e){throw console.error(e),e}},nt=async()=>{try{return await m.get("/admin/revenue")}catch(e){throw console.error(e),e}},ct=async()=>{try{return await m.get("/admin/revenue-tier")}catch(e){throw console.error(e),e}},lt=async e=>{try{return await m.post("/admin/feature/add",{user_id:e})}catch(t){throw console.error(t),t}},dt=async e=>{try{return await m.post("/admin/feature/remove",{user_id:e})}catch(t){throw console.error(t),t}},ut=async e=>{try{return await m.post("/admin/setting/update",e)}catch(t){throw console.error(t),t}};export{Ze as D,We as F,Q as I,Ye as L,Ue as P,ct as a,ut as b,dt as c,lt as d,Qe as e,et as f,Ge as g,tt as h,Ke as i,rt as j,Ve as k,st as l,Je as m,ot as n,Xe as o,Be as p,nt as r,at as s,it as u,qe as z};
