import{r as s,j as n,e as x,g as w}from"./app-zbGiaHVp.js";import{c}from"./button-C_qHBv8k.js";const N=s.forwardRef((r,e)=>{const{className:t,...a}=r;return n.jsx("div",{ref:e,className:c("rounded-lg border bg-card text-card-foreground shadow-sm",t),...a})});N.displayName="Card";const g=s.forwardRef((r,e)=>{const{className:t,...a}=r;return n.jsx("div",{ref:e,className:c("flex flex-col space-y-1.5 p-6",t),...a})});g.displayName="CardHeader";const h=s.forwardRef((r,e)=>{const{className:t,...a}=r;return n.jsx("h3",{ref:e,className:c("text-2xl font-semibold leading-none tracking-tight",t),...a})});h.displayName="CardTitle";const R=s.forwardRef((r,e)=>{const{className:t,...a}=r;return n.jsx("p",{ref:e,className:c("text-sm text-muted-foreground",t),...a})});R.displayName="CardDescription";const j=s.forwardRef((r,e)=>{const{className:t,...a}=r;return n.jsx("div",{ref:e,className:c("p-6 pt-0",t),...a})});j.displayName="CardContent";const y=s.forwardRef((r,e)=>{const{className:t,...a}=r;return n.jsx("div",{ref:e,className:c("flex items-center p-6 pt-0",t),...a})});y.displayName="CardFooter";var b=x();const F=w(b);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),A=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase()),i=r=>{const e=A(r);return e.charAt(0).toUpperCase()+e.slice(1)},m=(...r)=>r.filter((e,t,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===t).join(" ").trim(),E=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=s.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:a,className:d="",children:o,iconNode:p,...l},f)=>s.createElement("svg",{ref:f,...k,width:e,height:e,stroke:r,strokeWidth:a?Number(t)*24/Number(e):t,className:m("lucide",d),...!o&&!E(l)&&{"aria-hidden":"true"},...l},[...p.map(([u,C])=>s.createElement(u,C)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=(r,e)=>{const t=s.forwardRef(({className:a,...d},o)=>s.createElement(D,{ref:o,iconNode:e,className:m(`lucide-${v(i(r))}`,`lucide-${r}`,a),...d}));return t.displayName=i(r),t};export{N as C,F as R,g as a,h as b,B as c,R as d,j as e,y as f,b as r};
