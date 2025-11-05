import{r as l,j as R,c as E}from"./app-DW_GXsJe.js";import{P as K,c as Q,g as G}from"./index-iQycQFfj.js";var J="Label",_=l.forwardRef((e,t)=>R.jsx(K.label,{...e,ref:t,onMouseDown:r=>{r.target.closest("button, input, select, textarea")||(e.onMouseDown?.(r),!r.defaultPrevented&&r.detail>1&&r.preventDefault())}}));_.displayName=J;var F=_;const X=G("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),ee=l.forwardRef(({className:e,...t},r)=>R.jsx(F,{ref:r,className:Q(X(),e),...t}));ee.displayName=F.displayName;let te={data:""},re=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||te},ae=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,se=/\/\*[^]*?\*\/|  +/g,M=/\n+/g,x=(e,t)=>{let r="",s="",i="";for(let o in e){let a=e[o];o[0]=="@"?o[1]=="i"?r=o+" "+a+";":s+=o[1]=="f"?x(a,o):o+"{"+x(a,o[1]=="k"?"":t)+"}":typeof a=="object"?s+=x(a,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):o):a!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=x.p?x.p(o,a):o+":"+a+";")}return r+(t&&i?t+"{"+i+"}":i)+s},b={},H=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+H(e[r]);return t}return e},oe=(e,t,r,s,i)=>{let o=H(e),a=b[o]||(b[o]=(c=>{let u=0,p=11;for(;u<c.length;)p=101*p+c.charCodeAt(u++)>>>0;return"go"+p})(o));if(!b[a]){let c=o!==e?e:(u=>{let p,d,m=[{}];for(;p=ae.exec(u.replace(se,""));)p[4]?m.shift():p[3]?(d=p[3].replace(M," ").trim(),m.unshift(m[0][d]=m[0][d]||{})):m[0][p[1]]=p[2].replace(M," ").trim();return m[0]})(e);b[a]=x(i?{["@keyframes "+a]:c}:c,r?"":"."+a)}let n=r&&b.g?b.g:null;return r&&(b.g=b[a]),((c,u,p,d)=>{d?u.data=u.data.replace(d,c):u.data.indexOf(c)===-1&&(u.data=p?c+u.data:u.data+c)})(b[a],t,s,n),a},ie=(e,t,r)=>e.reduce((s,i,o)=>{let a=t[o];if(a&&a.call){let n=a(r),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;a=c?"."+c:n&&typeof n=="object"?n.props?"":x(n,""):n===!1?"":n}return s+i+(a??"")},"");function P(e){let t=this||{},r=e.call?e(t.p):e;return oe(r.unshift?r.raw?ie(r,[].slice.call(arguments,1),t.p):r.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):r,re(t.target),t.g,t.o,t.k)}let W,z,A;P.bind({g:1});let v=P.bind({k:1});function ne(e,t,r,s){x.p=t,W=e,z=r,A=s}function w(e,t){let r=this||{};return function(){let s=arguments;function i(o,a){let n=Object.assign({},o),c=n.className||i.className;r.p=Object.assign({theme:z&&z()},n),r.o=/ *go\d+/.test(c),n.className=P.apply(r,s)+(c?" "+c:"");let u=e;return e[0]&&(u=n.as||e,delete n.as),A&&u[0]&&A(n),W(u,n)}return t?t(i):i}}var le=e=>typeof e=="function",N=(e,t)=>le(e)?e(t):e,ce=(()=>{let e=0;return()=>(++e).toString()})(),q=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),de=20,I="default",B=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:s}=t;return B(e,{type:e.toasts.find(a=>a.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+o}))}}},D=[],U={toasts:[],pausedAt:void 0,settings:{toastLimit:de}},h={},V=(e,t=I)=>{h[t]=B(h[t]||U,e),D.forEach(([r,s])=>{r===t&&s(h[t])})},Y=e=>Object.keys(h).forEach(t=>V(e,t)),ue=e=>Object.keys(h).find(t=>h[t].toasts.some(r=>r.id===e)),C=(e=I)=>t=>{V(t,e)},pe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},me=(e={},t=I)=>{let[r,s]=l.useState(h[t]||U),i=l.useRef(h[t]);l.useEffect(()=>(i.current!==h[t]&&s(h[t]),D.push([t,s]),()=>{let a=D.findIndex(([n])=>n===t);a>-1&&D.splice(a,1)}),[t]);let o=r.toasts.map(a=>{var n,c,u;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((n=e[a.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:a.duration||((c=e[a.type])==null?void 0:c.duration)||e?.duration||pe[a.type],style:{...e.style,...(u=e[a.type])==null?void 0:u.style,...a.style}}});return{...r,toasts:o}},fe=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||ce()}),k=e=>(t,r)=>{let s=fe(t,e,r);return C(s.toasterId||ue(s.id))({type:2,toast:s}),s.id},f=(e,t)=>k("blank")(e,t);f.error=k("error");f.success=k("success");f.loading=k("loading");f.custom=k("custom");f.dismiss=(e,t)=>{let r={type:3,toastId:e};t?C(t)(r):Y(r)};f.dismissAll=e=>f.dismiss(void 0,e);f.remove=(e,t)=>{let r={type:4,toastId:e};t?C(t)(r):Y(r)};f.removeAll=e=>f.remove(void 0,e);f.promise=(e,t,r)=>{let s=f.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?N(t.success,i):void 0;return o?f.success(o,{id:s,...r,...r?.success}):f.dismiss(s),i}).catch(i=>{let o=t.error?N(t.error,i):void 0;o?f.error(o,{id:s,...r,...r?.error}):f.dismiss(s)}),e};var ge=1e3,ye=(e,t="default")=>{let{toasts:r,pausedAt:s}=me(e,t),i=l.useRef(new Map).current,o=l.useCallback((d,m=ge)=>{if(i.has(d))return;let g=setTimeout(()=>{i.delete(d),a({type:4,toastId:d})},m);i.set(d,g)},[]);l.useEffect(()=>{if(s)return;let d=Date.now(),m=r.map(g=>{if(g.duration===1/0)return;let $=(g.duration||0)+g.pauseDuration-(d-g.createdAt);if($<0){g.visible&&f.dismiss(g.id);return}return setTimeout(()=>f.dismiss(g.id,t),$)});return()=>{m.forEach(g=>g&&clearTimeout(g))}},[r,s,t]);let a=l.useCallback(C(t),[t]),n=l.useCallback(()=>{a({type:5,time:Date.now()})},[a]),c=l.useCallback((d,m)=>{a({type:1,toast:{id:d,height:m}})},[a]),u=l.useCallback(()=>{s&&a({type:6,time:Date.now()})},[s,a]),p=l.useCallback((d,m)=>{let{reverseOrder:g=!1,gutter:$=8,defaultPosition:S}=m||{},O=r.filter(y=>(y.position||S)===(d.position||S)&&y.height),Z=O.findIndex(y=>y.id===d.id),T=O.filter((y,L)=>L<Z&&y.visible).length;return O.filter(y=>y.visible).slice(...g?[T+1]:[0,T]).reduce((y,L)=>y+(L.height||0)+$,0)},[r]);return l.useEffect(()=>{r.forEach(d=>{if(d.dismissed)o(d.id,d.removeDelay);else{let m=i.get(d.id);m&&(clearTimeout(m),i.delete(d.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:n,endPause:u,calculateOffset:p}}},he=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,be=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ve=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,xe=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${he} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${be} 0.15s ease-out forwards;
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
    animation: ${ve} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,we=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ee=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${we} 1s linear infinite;
`,ke=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,$e=v`
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
}`,je=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ke} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${$e} 0.2s ease-out forwards;
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
`,De=w("div")`
  position: absolute;
`,Ne=w("div")`
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
}`,Ce=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Pe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Oe=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement(Ce,null,t):t:r==="blank"?null:l.createElement(Ne,null,l.createElement(Ee,{...s}),r!=="loading"&&l.createElement(De,null,r==="error"?l.createElement(xe,{...s}):l.createElement(je,{...s})))},Le=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ze=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ae="0%{opacity:0;} 100%{opacity:1;}",Ie="0%{opacity:1;} 100%{opacity:0;}",Se=w("div")`
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
`,Te=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Me=(e,t)=>{let r=e.includes("top")?1:-1,[s,i]=q()?[Ae,Ie]:[Le(r),ze(r)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Re=l.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?Me(e.position||t||"top-center",e.visible):{opacity:0},o=l.createElement(Oe,{toast:e}),a=l.createElement(Te,{...e.ariaProps},N(e.message,e));return l.createElement(Se,{className:e.className,style:{...i,...r,...e.style}},typeof s=="function"?s({icon:o,message:a}):l.createElement(l.Fragment,null,o,a))});ne(l.createElement);var _e=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=l.useCallback(a=>{if(a){let n=()=>{let c=a.getBoundingClientRect().height;s(e,c)};n(),new MutationObserver(n).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:o,className:t,style:r},i)},Fe=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:q()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...i}},He=P`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,j=16,Ue=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:a,containerClassName:n})=>{let{toasts:c,handlers:u}=ye(r,o);return l.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:j,left:j,right:j,bottom:j,pointerEvents:"none",...a},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(p=>{let d=p.position||t,m=u.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),g=Fe(d,m);return l.createElement(_e,{id:p.id,key:p.id,onHeightUpdate:u.updateHeight,className:p.visible?He:"",style:g},p.type==="custom"?N(p.message,p):i?i(p):l.createElement(Re,{toast:p,position:d}))}))},Ve=f;const We=document.head.querySelector('meta[name="csrf-token"]')?.content,Ye=async e=>{try{return await E.post("/register",e)}catch(t){throw console.error("Something Went Wrong",t),t}},Ze=async e=>{try{return await E.post("/auth/check",{_token:We,...e})}catch(t){throw console.error("Error fetching business statistics:",t),t}},Ke=async e=>{try{return await E.post("/auth/update",{data:e})}catch(t){throw console.error("Something went wrong",t),t}},Qe=async e=>{try{return await E.post("/updatelandingpage",e)}catch(t){throw console.error("Something went wrong",t),t}},Ge=async()=>{try{return await E.get("/getLandingPage")}catch(e){throw console.error(e),e}},Je=async()=>{try{return await E.get("/membership/plans")}catch(e){throw console.error(e),e}},Xe=async()=>{try{return(await E.get("/admin/userdata"))?.data}catch(e){throw console.error(e),e}};export{Ue as F,ee as L,Qe as a,Ke as b,Ze as c,Ge as g,Je as m,Ye as r,Xe as u,Ve as z};
