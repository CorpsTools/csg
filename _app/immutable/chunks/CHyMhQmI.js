import{al as X,p as re,a0 as y,q as D,z as ne,r as se,H as k,N as ie,Z as de,_ as oe,$ as V,a1 as P,y as F,am as le,an as ue,ao as Y,ap as fe,aq as ce,ar as z,a3 as ve,O as K,as as Z,i as he,at as M,au as $,av as pe,aw as W,ax as Ae,ay as B,az as Q,aA as me,aB as _e,aC as ge,aD as Ee,K as we,aE as j,D as Ce,aF as xe}from"./BoJF_WJl.js";import{w as Te}from"./DuEJCVQo.js";let J=null;function Ne(i,t){return t}function Ie(i,t,e){for(var d=i.items,l=[],u=t.length,o=0;o<u;o++)_e(t[o].e,l,!0);var h=u>0&&l.length===0&&e!==null;if(h){var g=e.parentNode;ge(g),g.append(e),d.clear(),x(i,t[0].prev,t[u-1].next)}Ee(l,()=>{for(var _=0;_<u;_++){var c=t[_];h||(d.delete(c.k),x(i,c.prev,c.next)),Q(c.e,!h)}})}function Ue(i,t,e,d,l,u=null){var o=i,h={flags:t,items:new Map,first:null},g=(t&j)!==0;if(g){var _=i;o=D?y(ne(_)):_.appendChild(X())}D&&se();var c=null,I=!1,E=new Map,S=ie(()=>{var f=e();return he(f)?f:f==null?[]:Z(f)}),n,A;function r(){be(A,n,h,E,o,l,t,d,e),u!==null&&(n.length===0?c?$(c):c=Y(()=>u(o)):c!==null&&pe(c,()=>{c=null}))}re(()=>{A??=we,n=k(S);var f=n.length;if(I&&f===0)return;I=f===0;let m=!1;if(D){var w=de(o)===oe;w!==(f===0)&&(o=V(),y(o),P(!1),m=!0)}if(D){for(var T=null,v,a=0;a<f;a++){if(F.nodeType===le&&F.data===ue){o=F,m=!0,P(!1);break}var s=n[a],p=d(s,a);v=q(F,h,T,null,s,p,a,l,t,e),h.items.set(p,v),T=v}f>0&&y(V())}if(D)f===0&&u&&(c=Y(()=>u(o)));else if(fe()){var N=new Set,R=ce;for(a=0;a<f;a+=1){s=n[a],p=d(s,a);var b=h.items.get(p)??E.get(p);b?(t&(W|M))!==0&&ee(b,s,a,t):(v=q(null,h,null,null,s,p,a,l,t,e,!0),E.set(p,v)),N.add(p)}for(const[C,O]of h.items)N.has(C)||R.skipped_effects.add(O.e);R.oncommit(r)}else r();m&&P(!0),k(S)}),D&&(o=F)}function be(i,t,e,d,l,u,o,h,g){var _=(o&xe)!==0,c=(o&(W|M))!==0,I=t.length,E=e.items,S=e.first,n=S,A,r=null,f,m=[],w=[],T,v,a,s;if(_)for(s=0;s<I;s+=1)T=t[s],v=h(T,s),a=E.get(v),a!==void 0&&(a.a?.measure(),(f??=new Set).add(a));for(s=0;s<I;s+=1){if(T=t[s],v=h(T,s),a=E.get(v),a===void 0){var p=d.get(v);if(p!==void 0){d.delete(v),E.set(v,p);var N=r?r.next:n;x(e,r,p),x(e,p,N),L(p,N,l),r=p}else{var R=n?n.e.nodes_start:l;r=q(R,e,r,r===null?e.first:r.next,T,v,s,u,o,g)}E.set(v,r),m=[],w=[],n=r.next;continue}if(c&&ee(a,T,s,o),(a.e.f&B)!==0&&($(a.e),_&&(a.a?.unfix(),(f??=new Set).delete(a))),a!==n){if(A!==void 0&&A.has(a)){if(m.length<w.length){var b=w[0],C;r=b.prev;var O=m[0],G=m[m.length-1];for(C=0;C<m.length;C+=1)L(m[C],b,l);for(C=0;C<w.length;C+=1)A.delete(w[C]);x(e,O.prev,G.next),x(e,r,O),x(e,G,b),n=b,r=G,s-=1,m=[],w=[]}else A.delete(a),L(a,n,l),x(e,a.prev,a.next),x(e,a,r===null?e.first:r.next),x(e,r,a),r=a;continue}for(m=[],w=[];n!==null&&n.k!==v;)(n.e.f&B)===0&&(A??=new Set).add(n),w.push(n),n=n.next;if(n===null)continue;a=n}m.push(a),r=a,n=a.next}if(n!==null||A!==void 0){for(var U=A===void 0?[]:Z(A);n!==null;)(n.e.f&B)===0&&U.push(n),n=n.next;var H=U.length;if(H>0){var ae=(o&j)!==0&&I===0?l:null;if(_){for(s=0;s<H;s+=1)U[s].a?.measure();for(s=0;s<H;s+=1)U[s].a?.fix()}Ie(e,U,ae)}}_&&Ce(()=>{if(f!==void 0)for(a of f)a.a?.apply()}),i.first=e.first&&e.first.e,i.last=r&&r.e;for(var te of d.values())Q(te.e);d.clear()}function ee(i,t,e,d){(d&W)!==0&&z(i.v,t),(d&M)!==0?z(i.i,e):i.i=e}function q(i,t,e,d,l,u,o,h,g,_,c){var I=J,E=(g&W)!==0,S=(g&Ae)===0,n=E?S?ve(l,!1,!1):K(l):l,A=(g&M)===0?o:K(o),r={i:A,v:n,k:u,a:null,e:null,prev:e,next:d};J=r;try{if(i===null){var f=document.createDocumentFragment();f.append(i=X())}return r.e=Y(()=>h(i,n,A,_),D),r.e.prev=e&&e.e,r.e.next=d&&d.e,e===null?c||(t.first=r):(e.next=r,e.e.next=r.e),d!==null&&(d.prev=r,d.e.prev=r.e),r}finally{J=I}}function L(i,t,e){for(var d=i.next?i.next.e.nodes_start:e,l=t?t.e.nodes_start:e,u=i.e.nodes_start;u!==null&&u!==d;){var o=me(u);l.before(u),u=o}}function x(i,t,e){t===null?i.first=e:(t.next=e,t.e.next=e&&e.e),e!==null&&(e.prev=t,e.e.prev=t&&t.e)}const Fe=[{date:"25SEP2025",changes:`
# Updated UI. (split section and instructor back into two lines)
# Updated all courses.
# Higher resolution coversheets.
`},{date:"17SEP2025",changes:`
# Updated coversheet to be IAW DAAW June 2025 standards. ("CDT" -> "CADET")
`},{date:"27AUG2025",changes:`
+ Added CorpsCard advertisements IOT support CorpsTools and the Corps.
# Redesigned website
`},{date:"17AUG2025",changes:`
# Updated coversheet to be IAW new DAAW June 2025 standards.
`},{date:"25APR2025",changes:`
# Fixed cursor in text box resetting to front when typing in the middle of the text.
`},{date:"24FEB2025",changes:`
# Fixed line spacing (1 -> 2) between certification statements ("I CERTIFY").
`},{date:"15JAN2025",changes:`
# Fixed downloaded coversheet's file name
+ Added option to add date to signature block of coversheet
`},{date:"16SEP2024",changes:`
# Fixed box showing up around signatures of clipboard images.
+ Added CorpsTools endorsement
`},{date:"12SEP2024",changes:`
# Split "Save/Print" into "Download" and "Print" Buttons.
+ Added the "Clipboard (Image)" and "Clipboard (Text)". The image option may work better for your coversheet workflow.
+ New DAAW statement initialing options
`},{date:"20AUG2024",changes:`
# Updated coversheet to be IAW new DAAW June 2024 standards.
`},{date:"20APR2024",changes:`
+ Added PDF coversheet prepending
`},{date:"29OCT2023",changes:`
# Fixed coversheet not properly pasting to Word document.
+ Added pasting images directly from your clipboard to the coversheet
`},{date:"29AUG2023",changes:`
# Updated "By" to "BY" on the coversheet template. (Thank you JG A4 '27 for pointing this out)
# Fixed some issues with the "Cadets" field.
`},{date:"29AUG2023",changes:`
+ Added DAAW and Citation Generator links
# Fixed some visual bugs
`},{date:"11AUG2023",changes:`
# Updated coversheet template to be IAW new DAAW
`},{date:"13MAR2023",changes:`
# Fixed coversheet date not updating sometimes
`},{date:"01MAR2023",changes:`
+ Added this info page
# Fixed the 'OUR/WE and MY/I' pronouns on the coversheet
`},{date:"06FEB2023",changes:`
+ The Coversheet Generator launched.
`}];function Re(i,t){const e=localStorage.getItem(i);let d;try{d=e?JSON.parse(e):t}catch{d=""}const l=Te(d);return l.subscribe(u=>{localStorage.setItem(i,JSON.stringify(u))}),l}export{Fe as C,J as c,Ue as e,Ne as i,Re as p};
