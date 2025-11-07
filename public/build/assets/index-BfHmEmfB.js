import{r as l,j as T}from"./app-Bubjpy0j.js";import{P as K,c as Q,g as W}from"./index-hMp6Ad0U.js";var G="Label",F=l.forwardRef((e,t)=>T.jsx(K.label,{...e,ref:t,onMouseDown:a=>{a.target.closest("button, input, select, textarea")||(e.onMouseDown?.(a),!a.defaultPrevented&&a.detail>1&&a.preventDefault())}}));F.displayName=G;var _=F;const J=W("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),X=l.forwardRef(({className:e,...t},a)=>T.jsx(_,{ref:a,className:Q(J(),e),...t}));X.displayName=_.displayName;let ee={data:""},te=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||ee},ae=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,re=/\/\*[^]*?\*\/|  +/g,R=/\n+/g,x=(e,t)=>{let a="",s="",o="";for(let i in e){let r=e[i];i[0]=="@"?i[1]=="i"?a=i+" "+r+";":s+=i[1]=="f"?x(r,i):i+"{"+x(r,i[1]=="k"?"":t)+"}":typeof r=="object"?s+=x(r,t?t.replace(/([^,])+/g,n=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,n):n?n+" "+d:d)):i):r!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=x.p?x.p(i,r):i+":"+r+";")}return a+(t&&o?t+"{"+o+"}":o)+s},h={},S=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+S(e[a]);return t}return e},se=(e,t,a,s,o)=>{let i=S(e),r=h[i]||(h[i]=(d=>{let u=0,p=11;for(;u<d.length;)p=101*p+d.charCodeAt(u++)>>>0;return"go"+p})(i));if(!h[r]){let d=i!==e?e:(u=>{let p,c,m=[{}];for(;p=ae.exec(u.replace(re,""));)p[4]?m.shift():p[3]?(c=p[3].replace(R," ").trim(),m.unshift(m[0][c]=m[0][c]||{})):m[0][p[1]]=p[2].replace(R," ").trim();return m[0]})(e);h[r]=x(o?{["@keyframes "+r]:d}:d,a?"":"."+r)}let n=a&&h.g?h.g:null;return a&&(h.g=h[r]),((d,u,p,c)=>{c?u.data=u.data.replace(c,d):u.data.indexOf(d)===-1&&(u.data=p?d+u.data:u.data+d)})(h[r],t,s,n),r},ie=(e,t,a)=>e.reduce((s,o,i)=>{let r=t[i];if(r&&r.call){let n=r(a),d=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=d?"."+d:n&&typeof n=="object"?n.props?"":x(n,""):n===!1?"":n}return s+o+(r??"")},"");function N(e){let t=this||{},a=e.call?e(t.p):e;return se(a.unshift?a.raw?ie(a,[].slice.call(arguments,1),t.p):a.reduce((s,o)=>Object.assign(s,o&&o.call?o(t.p):o),{}):a,te(t.target),t.g,t.o,t.k)}let H,A,P;N.bind({g:1});let v=N.bind({k:1});function oe(e,t,a,s){x.p=t,H=e,A=a,P=s}function w(e,t){let a=this||{};return function(){let s=arguments;function o(i,r){let n=Object.assign({},i),d=n.className||o.className;a.p=Object.assign({theme:A&&A()},n),a.o=/ *go\d+/.test(d),n.className=N.apply(a,s)+(d?" "+d:"");let u=e;return e[0]&&(u=n.as||e,delete n.as),P&&u[0]&&P(n),H(u,n)}return t?t(o):o}}var ne=e=>typeof e=="function",D=(e,t)=>ne(e)?e(t):e,le=(()=>{let e=0;return()=>(++e).toString()})(),B=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),de=20,I="default",U=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return U(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(r=>r.id===o||o===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+i}))}}},j=[],V={toasts:[],pausedAt:void 0,settings:{toastLimit:de}},b={},Y=(e,t=I)=>{b[t]=U(b[t]||V,e),j.forEach(([a,s])=>{a===t&&s(b[t])})},Z=e=>Object.keys(b).forEach(t=>Y(e,t)),ce=e=>Object.keys(b).find(t=>b[t].toasts.some(a=>a.id===e)),C=(e=I)=>t=>{Y(t,e)},ue={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},pe=(e={},t=I)=>{let[a,s]=l.useState(b[t]||V),o=l.useRef(b[t]);l.useEffect(()=>(o.current!==b[t]&&s(b[t]),j.push([t,s]),()=>{let r=j.findIndex(([n])=>n===t);r>-1&&j.splice(r,1)}),[t]);let i=a.toasts.map(r=>{var n,d,u;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:r.duration||((d=e[r.type])==null?void 0:d.duration)||e?.duration||ue[r.type],style:{...e.style,...(u=e[r.type])==null?void 0:u.style,...r.style}}});return{...a,toasts:i}},me=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||le()}),E=e=>(t,a)=>{let s=me(t,e,a);return C(s.toasterId||ce(s.id))({type:2,toast:s}),s.id},f=(e,t)=>E("blank")(e,t);f.error=E("error");f.success=E("success");f.loading=E("loading");f.custom=E("custom");f.dismiss=(e,t)=>{let a={type:3,toastId:e};t?C(t)(a):Z(a)};f.dismissAll=e=>f.dismiss(void 0,e);f.remove=(e,t)=>{let a={type:4,toastId:e};t?C(t)(a):Z(a)};f.removeAll=e=>f.remove(void 0,e);f.promise=(e,t,a)=>{let s=f.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let i=t.success?D(t.success,o):void 0;return i?f.success(i,{id:s,...a,...a?.success}):f.dismiss(s),o}).catch(o=>{let i=t.error?D(t.error,o):void 0;i?f.error(i,{id:s,...a,...a?.error}):f.dismiss(s)}),e};var fe=1e3,ge=(e,t="default")=>{let{toasts:a,pausedAt:s}=pe(e,t),o=l.useRef(new Map).current,i=l.useCallback((c,m=fe)=>{if(o.has(c))return;let g=setTimeout(()=>{o.delete(c),r({type:4,toastId:c})},m);o.set(c,g)},[]);l.useEffect(()=>{if(s)return;let c=Date.now(),m=a.map(g=>{if(g.duration===1/0)return;let $=(g.duration||0)+g.pauseDuration-(c-g.createdAt);if($<0){g.visible&&f.dismiss(g.id);return}return setTimeout(()=>f.dismiss(g.id,t),$)});return()=>{m.forEach(g=>g&&clearTimeout(g))}},[a,s,t]);let r=l.useCallback(C(t),[t]),n=l.useCallback(()=>{r({type:5,time:Date.now()})},[r]),d=l.useCallback((c,m)=>{r({type:1,toast:{id:c,height:m}})},[r]),u=l.useCallback(()=>{s&&r({type:6,time:Date.now()})},[s,r]),p=l.useCallback((c,m)=>{let{reverseOrder:g=!1,gutter:$=8,defaultPosition:L}=m||{},O=a.filter(y=>(y.position||L)===(c.position||L)&&y.height),q=O.findIndex(y=>y.id===c.id),M=O.filter((y,z)=>z<q&&y.visible).length;return O.filter(y=>y.visible).slice(...g?[M+1]:[0,M]).reduce((y,z)=>y+(z.height||0)+$,0)},[a]);return l.useEffect(()=>{a.forEach(c=>{if(c.dismissed)i(c.id,c.removeDelay);else{let m=o.get(c.id);m&&(clearTimeout(m),o.delete(c.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:n,endPause:u,calculateOffset:p}}},ye=v`
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
}`,he=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ve=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ye} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${he} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,xe=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,we=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${xe} 1s linear infinite;
`,Ee=v`
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
}`,ke=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ee} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,je=w("div")`
  position: absolute;
`,De=w("div")`
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
}`,Ce=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ne} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Oe=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement(Ce,null,t):t:a==="blank"?null:l.createElement(De,null,l.createElement(we,{...s}),a!=="loading"&&l.createElement(je,null,a==="error"?l.createElement(ve,{...s}):l.createElement(ke,{...s})))},ze=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ae=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Pe="0%{opacity:0;} 100%{opacity:1;}",Ie="0%{opacity:1;} 100%{opacity:0;}",Le=w("div")`
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
`,Me=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Re=(e,t)=>{let a=e.includes("top")?1:-1,[s,o]=B()?[Pe,Ie]:[ze(a),Ae(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Te=l.memo(({toast:e,position:t,style:a,children:s})=>{let o=e.height?Re(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(Oe,{toast:e}),r=l.createElement(Me,{...e.ariaProps},D(e.message,e));return l.createElement(Le,{className:e.className,style:{...o,...a,...e.style}},typeof s=="function"?s({icon:i,message:r}):l.createElement(l.Fragment,null,i,r))});oe(l.createElement);var Fe=({id:e,className:t,style:a,onHeightUpdate:s,children:o})=>{let i=l.useCallback(r=>{if(r){let n=()=>{let d=r.getBoundingClientRect().height;s(e,d)};n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:i,className:t,style:a},o)},_e=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:B()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...o}},Se=N`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,k=16,Ue=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:o,toasterId:i,containerStyle:r,containerClassName:n})=>{let{toasts:d,handlers:u}=ge(a,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:k,left:k,right:k,bottom:k,pointerEvents:"none",...r},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},d.map(p=>{let c=p.position||t,m=u.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),g=_e(c,m);return l.createElement(Fe,{id:p.id,key:p.id,onHeightUpdate:u.updateHeight,className:p.visible?Se:"",style:g},p.type==="custom"?D(p.message,p):o?o(p):l.createElement(Te,{toast:p,position:c}))}))},Ve=f;export{Ue as F,X as L,Ve as z};
