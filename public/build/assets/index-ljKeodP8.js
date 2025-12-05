import{r as d,j as Z}from"./app-zbGiaHVp.js";import{c as q}from"./button-C_qHBv8k.js";const K=d.forwardRef(({className:e,type:t,...a},s)=>Z.jsx("input",{type:t,className:q("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:s,...a}));K.displayName="Input";let Q={data:""},V=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Q},W=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,G=/\/\*[^]*?\*\/|  +/g,R=/\n+/g,x=(e,t)=>{let a="",s="",o="";for(let i in e){let r=e[i];i[0]=="@"?i[1]=="i"?a=i+" "+r+";":s+=i[1]=="f"?x(r,i):i+"{"+x(r,i[1]=="k"?"":t)+"}":typeof r=="object"?s+=x(r,t?t.replace(/([^,])+/g,n=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):i):r!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=x.p?x.p(i,r):i+":"+r+";")}return a+(t&&o?t+"{"+o+"}":o)+s},h={},_=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+_(e[a]);return t}return e},J=(e,t,a,s,o)=>{let i=_(e),r=h[i]||(h[i]=(l=>{let u=0,p=11;for(;u<l.length;)p=101*p+l.charCodeAt(u++)>>>0;return"go"+p})(i));if(!h[r]){let l=i!==e?e:(u=>{let p,c,m=[{}];for(;p=W.exec(u.replace(G,""));)p[4]?m.shift():p[3]?(c=p[3].replace(R," ").trim(),m.unshift(m[0][c]=m[0][c]||{})):m[0][p[1]]=p[2].replace(R," ").trim();return m[0]})(e);h[r]=x(o?{["@keyframes "+r]:l}:l,a?"":"."+r)}let n=a&&h.g?h.g:null;return a&&(h.g=h[r]),((l,u,p,c)=>{c?u.data=u.data.replace(c,l):u.data.indexOf(l)===-1&&(u.data=p?l+u.data:u.data+l)})(h[r],t,s,n),r},X=(e,t,a)=>e.reduce((s,o,i)=>{let r=t[i];if(r&&r.call){let n=r(a),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=l?"."+l:n&&typeof n=="object"?n.props?"":x(n,""):n===!1?"":n}return s+o+(r??"")},"");function D(e){let t=this||{},a=e.call?e(t.p):e;return J(a.unshift?a.raw?X(a,[].slice.call(arguments,1),t.p):a.reduce((s,o)=>Object.assign(s,o&&o.call?o(t.p):o),{}):a,V(t.target),t.g,t.o,t.k)}let L,z,A;D.bind({g:1});let v=D.bind({k:1});function ee(e,t,a,s){x.p=t,L=e,z=a,A=s}function w(e,t){let a=this||{};return function(){let s=arguments;function o(i,r){let n=Object.assign({},i),l=n.className||o.className;a.p=Object.assign({theme:z&&z()},n),a.o=/ *go\d+/.test(l),n.className=D.apply(a,s)+(l?" "+l:"");let u=e;return e[0]&&(u=n.as||e,delete n.as),A&&u[0]&&A(n),L(u,n)}return t?t(o):o}}var te=e=>typeof e=="function",C=(e,t)=>te(e)?e(t):e,ae=(()=>{let e=0;return()=>(++e).toString()})(),M=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),re=20,P="default",S=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return S(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(r=>r.id===o||o===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+i}))}}},j=[],H={toasts:[],pausedAt:void 0,settings:{toastLimit:re}},y={},B=(e,t=P)=>{y[t]=S(y[t]||H,e),j.forEach(([a,s])=>{a===t&&s(y[t])})},U=e=>Object.keys(y).forEach(t=>B(e,t)),se=e=>Object.keys(y).find(t=>y[t].toasts.some(a=>a.id===e)),O=(e=P)=>t=>{B(t,e)},ie={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},oe=(e={},t=P)=>{let[a,s]=d.useState(y[t]||H),o=d.useRef(y[t]);d.useEffect(()=>(o.current!==y[t]&&s(y[t]),j.push([t,s]),()=>{let r=j.findIndex(([n])=>n===t);r>-1&&j.splice(r,1)}),[t]);let i=a.toasts.map(r=>{var n,l,u;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:r.duration||((l=e[r.type])==null?void 0:l.duration)||e?.duration||ie[r.type],style:{...e.style,...(u=e[r.type])==null?void 0:u.style,...r.style}}});return{...a,toasts:i}},ne=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||ae()}),E=e=>(t,a)=>{let s=ne(t,e,a);return O(s.toasterId||se(s.id))({type:2,toast:s}),s.id},f=(e,t)=>E("blank")(e,t);f.error=E("error");f.success=E("success");f.loading=E("loading");f.custom=E("custom");f.dismiss=(e,t)=>{let a={type:3,toastId:e};t?O(t)(a):U(a)};f.dismissAll=e=>f.dismiss(void 0,e);f.remove=(e,t)=>{let a={type:4,toastId:e};t?O(t)(a):U(a)};f.removeAll=e=>f.remove(void 0,e);f.promise=(e,t,a)=>{let s=f.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let i=t.success?C(t.success,o):void 0;return i?f.success(i,{id:s,...a,...a?.success}):f.dismiss(s),o}).catch(o=>{let i=t.error?C(t.error,o):void 0;i?f.error(i,{id:s,...a,...a?.error}):f.dismiss(s)}),e};var le=1e3,de=(e,t="default")=>{let{toasts:a,pausedAt:s}=oe(e,t),o=d.useRef(new Map).current,i=d.useCallback((c,m=le)=>{if(o.has(c))return;let g=setTimeout(()=>{o.delete(c),r({type:4,toastId:c})},m);o.set(c,g)},[]);d.useEffect(()=>{if(s)return;let c=Date.now(),m=a.map(g=>{if(g.duration===1/0)return;let k=(g.duration||0)+g.pauseDuration-(c-g.createdAt);if(k<0){g.visible&&f.dismiss(g.id);return}return setTimeout(()=>f.dismiss(g.id,t),k)});return()=>{m.forEach(g=>g&&clearTimeout(g))}},[a,s,t]);let r=d.useCallback(O(t),[t]),n=d.useCallback(()=>{r({type:5,time:Date.now()})},[r]),l=d.useCallback((c,m)=>{r({type:1,toast:{id:c,height:m}})},[r]),u=d.useCallback(()=>{s&&r({type:6,time:Date.now()})},[s,r]),p=d.useCallback((c,m)=>{let{reverseOrder:g=!1,gutter:k=8,defaultPosition:T}=m||{},I=a.filter(b=>(b.position||T)===(c.position||T)&&b.height),Y=I.findIndex(b=>b.id===c.id),F=I.filter((b,N)=>N<Y&&b.visible).length;return I.filter(b=>b.visible).slice(...g?[F+1]:[0,F]).reduce((b,N)=>b+(N.height||0)+k,0)},[a]);return d.useEffect(()=>{a.forEach(c=>{if(c.dismissed)i(c.id,c.removeDelay);else{let m=o.get(c.id);m&&(clearTimeout(m),o.delete(c.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:l,startPause:n,endPause:u,calculateOffset:p}}},ce=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ue=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,pe=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,me=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ce} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ue} 0.15s ease-out forwards;
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
    animation: ${pe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,fe=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ge=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${fe} 1s linear infinite;
`,be=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ye=v`
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
}`,he=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${be} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ye} 0.2s ease-out forwards;
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
`,ve=w("div")`
  position: absolute;
`,xe=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,we=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ee=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${we} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ke=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?d.createElement(Ee,null,t):t:a==="blank"?null:d.createElement(xe,null,d.createElement(ge,{...s}),a!=="loading"&&d.createElement(ve,null,a==="error"?d.createElement(me,{...s}):d.createElement(he,{...s})))},$e=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,je=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ce="0%{opacity:0;} 100%{opacity:1;}",De="0%{opacity:1;} 100%{opacity:0;}",Oe=w("div")`
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
`,Ie=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ne=(e,t)=>{let a=e.includes("top")?1:-1,[s,o]=M()?[Ce,De]:[$e(a),je(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ze=d.memo(({toast:e,position:t,style:a,children:s})=>{let o=e.height?Ne(e.position||t||"top-center",e.visible):{opacity:0},i=d.createElement(ke,{toast:e}),r=d.createElement(Ie,{...e.ariaProps},C(e.message,e));return d.createElement(Oe,{className:e.className,style:{...o,...a,...e.style}},typeof s=="function"?s({icon:i,message:r}):d.createElement(d.Fragment,null,i,r))});ee(d.createElement);var Ae=({id:e,className:t,style:a,onHeightUpdate:s,children:o})=>{let i=d.useCallback(r=>{if(r){let n=()=>{let l=r.getBoundingClientRect().height;s(e,l)};n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return d.createElement("div",{ref:i,className:t,style:a},o)},Pe=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:M()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...o}},Te=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,_e=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:o,toasterId:i,containerStyle:r,containerClassName:n})=>{let{toasts:l,handlers:u}=de(a,i);return d.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...r},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(p=>{let c=p.position||t,m=u.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),g=Pe(c,m);return d.createElement(Ae,{id:p.id,key:p.id,onHeightUpdate:u.updateHeight,className:p.visible?Te:"",style:g},p.type==="custom"?C(p.message,p):o?o(p):d.createElement(ze,{toast:p,position:c}))}))},Le=f;export{_e as F,K as I,Le as z};
