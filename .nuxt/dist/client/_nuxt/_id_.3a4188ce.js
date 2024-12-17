import{a as ee}from"./index.d1857067.js";import{d as N,o as n,c as l,e as u,t as _,j as c,m as b,q as C,b as F,F as k,z as A,f as v,n as P,v as $,g as R,a7 as te,r as B,a8 as se,Z as oe,a4 as ne,a9 as ae,aa as ue,ab as le,a as O,W as ie,u as re,w as W,Y as ce,x as de,l as pe}from"./entry.bde0faaf.js";import{_ as me}from"./nuxt-link.9e88655f.js";import _e from"./logo.221fe42f.js";import fe from"./worried-face.91af0b07.js";import ge from"./confused-face.f0f6d0dc.js";import ye from"./smiling-face.bcbfd098.js";import he from"./without-mouth-face.cf62d0c1.js";import{b as be,_ as ve,a as xe,u as ke,g as Ce}from"./useAudit.2dbbba49.js";function we(){return new URL(window.location.href)}const $e={class:"print:hidden"},Te={class:"flex justify-between rounded-md border border-blue-900 bg-white"},Re={key:0},Ae={key:1},Se=N({__name:"AuditReportSharableLink",setup(a){const{origin:e,pathname:s,searchParams:t}=we(),o=e+s+"?type="+(t.get("type")||"review")+"&share=true",{copy:r,copied:d,isSupported:p}=ee({source:o});return(h,g)=>(n(),l("div",$e,[g[1]||(g[1]=u("h2",{class:"text-blue-900"},"Share report",-1)),u("div",Te,[u("span",{class:"break-all px-4 py-2"},_(o)),u("div",null,[c(p)?(n(),l("button",{key:0,class:"h-full min-w-[80px] flex-1 cursor-pointer bg-blue-900 text-white",onClick:g[0]||(g[0]=m=>c(r)())},[c(d)?(n(),l("span",Ae,"Copied!")):(n(),l("span",Re,"Copy"))])):b("",!0)])])]))}}),Ee={class:"flex w-full flex-col items-center justify-between gap-1 rounded-md border-4 border-red-600 bg-red-50 font-medium md:aspect-square"},Fe={class:"flex flex-1 items-center justify-center p-6 text-7xl text-red-600"},Ne=N({__name:"AuditReportIssuesCount",props:{count:{}},setup(a){return(e,s)=>(n(),l("p",Ee,[s[0]||(s[0]=u("span",{class:"w-full bg-red-600 p-2 text-center text-xl uppercase text-white"}," issues ",-1)),u("span",Fe,_(e.count),1)]))}}),je=N({__name:"StatusFaceIcon",props:{statusList:{}},setup(a){return(e,s)=>{const t=fe,o=ge,r=ye,d=he;return e.statusList.some(p=>p==="Failed")?(n(),C(t,{key:0,role:"img"})):e.statusList.some(p=>p==="Not tested")?(n(),C(o,{key:1,role:"img"})):e.statusList.some(p=>p==="Passed")?(n(),C(r,{key:2,role:"img"})):(n(),C(d,{key:3,role:"img"}))}}}),Le={class:"rounded-md border p-6"},Pe={class:"mb-2 text-lg font-medium"},Ue={class:"space-y-4"},qe={class:"mb-2 text-sm font-medium"},Be={class:"grid grid-cols-[1fr_48px]"},Ve={class:"text-right font-medium"},De=N({__name:"AuditAutomaticTestResultSummary",props:{totalCount:{},issuesCount:{},passesCount:{}},setup(a){return(e,s)=>{const t=F("ProgressBar");return n(),l("div",Le,[u("h3",Pe," Total tested elements: "+_(e.totalCount),1),u("div",Ue,[(n(!0),l(k,null,A([{name:"Issues",count:e.issuesCount},{name:"Passes",count:e.passesCount}],({name:o,count:r})=>(n(),l("div",{key:o},[u("h4",qe,_(o),1),u("div",Be,[v(t,{value:r/e.totalCount*100,"show-value":!1,class:P({"[&>.p-progressbar-value]:!bg-red-600":o==="Issues","[&>.p-progressbar-value]:!bg-green-600":o==="Passes"})},null,8,["value","class"]),u("span",Ve,_(r),1)])]))),128))])])}}}),ze={class:"rounded-md border p-6"},He={class:"divide-y"},Me={class:"mb-2 break-all text-sm font-medium"},Oe=N({__name:"AuditReportPageStatuses",props:{pageStatuses:{}},setup(a){return(e,s)=>{const t=F("Tag");return n(),l("div",ze,[s[0]||(s[0]=u("h3",{class:"text-lg font-medium"},"Test status",-1)),u("ul",He,[(n(!0),l(k,null,A(e.pageStatuses,({status:o,pageName:r},d)=>(n(),l("li",{key:d,class:"py-4 last-of-type:pb-0"},[u("div",Me,_(r),1),v(t,{class:P(["w-full !text-base",{"!bg-gray-600":o==="Not applicable"}]),value:o,severity:o==="Passed"?"success":o==="Failed"?"danger":"primary"},null,8,["value","severity","class"])]))),128))])])}}}),We={key:0,class:"break-words text-base font-medium"},Ie={key:0},Ke={key:1},Ye=N({__name:"AuditReportManualTestResults",props:{type:{},manualTestResults:{}},setup(a){return(e,s)=>(n(),l("li",{class:P(["break-inside-avoid rounded-md border p-6",{"border-red-600":e.type==="issues","border-green-600":e.type==="passes"}])},[["issues","passes"].includes(e.type)?(n(),l("h5",{key:0,class:P(["text-lg font-medium",{"text-red-800":e.type==="issues","text-green-800":e.type==="passes"}])}," Manual tests ",2)):b("",!0),u("ul",{class:P(["divide-y",{"divide-red-600":e.type==="issues","divide-green-600":e.type==="passes"}])},[(n(!0),l(k,null,A(e.manualTestResults,(t,o)=>(n(),l("li",{key:o,class:"space-y-4 py-4 last-of-type:pb-0"},[t.pageName?(n(),l("h5",We,_(t.pageName),1)):b("",!0),u("div",null,[t.issues.length?(n(),l("p",Ie,[s[0]||(s[0]=u("span",{class:"font-medium"},"Issues:",-1)),$(" "+_(t.issues),1)])):b("",!0),t.recommendedFixes.length?(n(),l("p",Ke,[s[1]||(s[1]=u("span",{class:"font-medium"}," Recommended fixes: ",-1)),$(" "+_(t.recommendedFixes),1)])):b("",!0)])]))),128))],2)],2))}}),Ze={class:"mb-6 flex break-after-avoid items-center"},Ge={class:"order-1 ml-3 text-2xl font-medium"},Je={class:"mr-2"},Qe={class:"mb-4 grid break-inside-avoid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2"},Xe={class:"flex h-full flex-col space-y-4"},et={class:"flex-1 rounded-md border p-6"},tt={class:"space-y-4"},st={key:0,class:"rounded-md border p-6"},ot={class:"mb-4 text-lg font-medium first-letter:uppercase"},nt={class:"space-y-4"},at=N({__name:"AuditReportCategoryTests",props:{name:{},status:{},tests:{}},setup(a){return(e,s)=>{const t=je,o=be,r=De,d=Oe,p=Ye,h=ve,g=xe,m=F("AccordionTab"),j=F("Accordion");return n(),l(k,null,[u("div",Ze,[u("h2",Ge,_(e.name),1),v(t,{"status-list":[e.status],class:"h-12 w-12"},null,8,["status-list"])]),v(j,{multiple:!0},{default:R(()=>[(n(!0),l(k,null,A(e.tests,(y,w)=>(n(),C(m,{key:w},{header:R(()=>[u("span",Je,_(y.name),1),v(t,{"status-list":y.pageStatuses.map(({status:x})=>x),class:"h-8 w-8"},null,8,["status-list"])]),default:R(()=>{var x,T;return[u("div",Qe,[u("div",Xe,[u("div",et,[v(o,{info:y.info,"displayed-info-keys":["WCAG SC","Level","Test Conditions"]},null,8,["info"])]),y.testedElementsCount>0?(n(),C(r,{key:0,"total-count":y.testedElementsCount,"issues-count":((x=y.groupedResults.find(f=>f.type==="issues"))==null?void 0:x.testedElementsCount)||0,"passes-count":((T=y.groupedResults.find(f=>f.type==="passes"))==null?void 0:T.testedElementsCount)||0},null,8,["total-count","issues-count","passes-count"])):b("",!0)]),v(d,{"page-statuses":y.pageStatuses},null,8,["page-statuses"])]),u("div",tt,[(n(!0),l(k,null,A(y.groupedResults,(f,L)=>(n(),l(k,{key:L},[f.manualTestResults.length||f.automaticTestResults.length?(n(),l("div",st,[u("h3",ot,[$(_(f.type)+" ",1),u("span",{class:P({"text-red-800":f.type==="issues","text-green-800":f.type==="passes"})}," ("+_(f.testedElementsCount+f.manualTestResults.length)+") ",3)]),u("ul",nt,[f.manualTestResults.length?(n(),C(p,{key:0,type:f.type,"manual-test-results":f.manualTestResults},null,8,["type","manual-test-results"])):b("",!0),(n(!0),l(k,null,A(f.automaticTestResults,(i,S)=>(n(),l(k,{key:S},[f.type==="issues"?(n(),C(h,{key:0,id:i.id,description:i.description,impact:i.impact,"grouped-nodes":i.groupedNodes},null,8,["id","description","impact","grouped-nodes"])):(n(),C(g,{key:1,id:i.id,description:i.description,impact:i.impact,"grouped-nodes":i.groupedNodes},null,8,["id","description","impact","grouped-nodes"]))],64))),128))])])):b("",!0)],64))),128))])]}),_:2},1024))),128))]),_:1})],64)}}});let ut;function lt(){return ut}function it(a){return typeof a=="function"?a():c(a)}function z(a){if(a instanceof Promise||a instanceof Date||a instanceof RegExp)return a;const e=it(a);if(!a||!e)return e;if(Array.isArray(e))return e.map(s=>z(s));if(typeof e=="object"){const s={};for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)){if(t==="titleTemplate"||t[0]==="o"&&t[1]==="n"){s[t]=c(e[t]);continue}s[t]=z(e[t])}return s}return e}const rt="usehead",I=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},K="__unhead_injection_handler__";function ct(){if(K in I)return I[K]();const a=te(rt);return a||lt()}function dt(a,e={}){const s=e.head||ct();if(s)return s.ssr?s.push(a,e):pt(s,a,e)}function pt(a,e,s={}){const t=B(!1),o=B({});se(()=>{o.value=t.value?{}:z(e)});const r=a.push(o.value,s);return oe(o,p=>{r.patch(p)}),ne()&&(ae(()=>{r.dispose()}),ue(()=>{t.value=!0}),le(()=>{t.value=!1})),r}const mt=(a,e)=>{const s={categories:{},testedElementsCount:{total:0,issues:0,passes:0}};return a.forEach(t=>{let o="";t.results.url&&(o+=`URL: ${t.results.url} | `),t.selector&&(o+=`Selector: ${t.selector} | `),o+=`Screen size / Device: ${t.size}`;const{audit:r,formData:d}=ke(t);r.value.forEach(p=>{var T,f,L;const h=p.info["Test Category"],g=p.info["Test Name"],{manualTestResultsStatus:m,manualTestIssues:j,manualTestRecommendedFixes:y}=d.value[p.id],w=Ce({automaticTestResultsStatus:p.automaticTestResultsStatus,manualTestResultsStatus:m,reportType:e});let x=(T=s.categories[h])==null?void 0:T.tests.find(i=>i.name===g);x||(x={name:g,pageStatuses:[],testedElementsCount:0,info:p.info,groupedResults:[]},s.categories[h]={status:((f=s.categories[h])==null?void 0:f.status)||"Not applicable",tests:[...((L=s.categories[h])==null?void 0:L.tests)||[],x]}),x.pageStatuses.push({pageName:o,status:w}),s.categories[h].status=_t(s.categories[h].status,w),ft(p,x,o),gt(m,j,y,x,o,s)})}),yt(s),ht(s),s},_t=(a,e)=>e!=="Not applicable"&&a!=="Failed"||e==="Passed"&&a==="Not applicable"?e:a,ft=(a,e,s)=>{a.automaticTestGroupedResults.forEach(t=>{let o=e==null?void 0:e.groupedResults.find(r=>r.type===t.type);o||(o={type:t.type,testedElementsCount:0,automaticTestResults:[],manualTestResults:[]},e==null||e.groupedResults.push(o)),t.results.forEach(({id:r,description:d,impact:p,nodes:h})=>{let g=o==null?void 0:o.automaticTestResults.find(m=>m.id===r);g||(g={id:r,description:d,impact:p,groupedNodes:[]},o==null||o.automaticTestResults.push(g)),g.groupedNodes.push({pageName:s,nodes:h})})})},gt=(a,e,s,t,o,r)=>{let d="requires manual tests";a==="Failed"?(d="issues",r.testedElementsCount.issues++):a==="Passed"?(d="passes",r.testedElementsCount.passes++):a==="Not applicable"&&(d="not applicable");const p={pageName:o,issues:e,recommendedFixes:s},h=t.groupedResults.find(({type:g})=>g===d);h?h.manualTestResults.push(p):t.groupedResults.push({type:d,testedElementsCount:0,automaticTestResults:[],manualTestResults:[p]})},yt=a=>{const e=s=>s.automaticTestResults.reduce((t,o)=>t+o.groupedNodes.reduce((r,d)=>r+d.nodes.length,0),0);for(const s of Object.values(a.categories))for(const t of s.tests){let o=0;for(const r of t.groupedResults)r.testedElementsCount=e(r),o+=r.testedElementsCount,r.type in a.testedElementsCount&&(a.testedElementsCount[r.type]+=r.testedElementsCount);t.testedElementsCount=o,a.testedElementsCount.total+=o}},ht=a=>{a.categories=Object.entries(a.categories).sort(([,e],[,s])=>{const t=e.status==="Failed",o=s.status==="Failed";return t&&!o?-1:!t&&o?1:0}).reduce((e,[s,t])=>(e[s]=t,e),{})},bt={class:"mb-16 space-y-4 text-center"},vt={class:"font-medium"},xt={key:1},kt={class:"mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-[1fr_240px]"},Ct={class:"flex flex-col justify-center"},wt={class:"mb-4 list-disc space-y-2 pl-8"},$t={class:"break-words rounded-md bg-gray-100 px-2 py-1"},Tt={class:"list-disc pl-8"},Rt={key:0,class:"md:col-span-2"},At={class:"whitespace-pre-line"},St={key:1,class:"md:col-span-2"},Et={key:0,class:"fixed bottom-0 right-0 z-20 w-full border-t bg-white shadow-[0_-1px_6px_0_rgba(0,0,0,0.1)] print:hidden md:border-none md:bg-transparent md:shadow-none"},Ft={class:"flex w-full justify-end space-x-4 p-4 xl:container xl:mx-auto"},zt=N({__name:"[id]",async setup(a){let e,s;const t=O(),o=ie(),r=re(),d=o.params.id,p=o.query.share==="true"||!r.value,h=typeof o.query.type=="string"?o.query.type:"review",{data:g}=([e,s]=W(()=>t.from("axe").select("*").eq("audit_id",d)),e=await e,s(),e),{data:m}=([e,s]=W(()=>t.from("audits").select("*, projects(name), profiles(username, full_name)").eq("id",d).single()),e=await e,s(),e);if(!g||!m)throw ce({statusCode:404,statusMessage:"Audit not found",fatal:!0});dt({title:`Snowdog Accessibility Audit Report - ${m.config.title}`,titleTemplate:"%s"});const j=mt(g,h),y=B(m.status==="completed"),w=B(m.comment),x=de(),T=B(!1),f=async()=>{T.value=!0;const L=O();try{const{data:i,error:S}=await L.from("audits").update({status:"completed",report_type:h,comment:w.value}).eq("id",d).select();if(S)throw new Error(S==null?void 0:S.message);(i==null?void 0:i.length)===1&&(y.value=!0,x.add({severity:"success",summary:"Successfully completed report.",life:3e3}))}catch(i){x.add({severity:"error",summary:i.message||"Failed to save data.",life:3e3})}finally{T.value=!1}};return(L,i)=>{const S=Se,V=me,Y=_e,Z=F("Tag"),G=Ne,J=F("Textarea"),Q=F("Button"),H=F("Card"),X=at;return n(),l("div",null,[c(m)&&c(j)?(n(),l("div",{key:0,class:P(["space-y-6",{"mb-24":!c(y)}])},[c(y)&&!c(p)?(n(),C(S,{key:0})):b("",!0),c(p)?b("",!0):(n(),C(V,{key:1,to:`/audit/new?baseAuditId=${c(d)}`,class:"p-button p-button-outlined print:!hidden"},{default:R(()=>i[1]||(i[1]=[$(" Repeat audit ")])),_:1},8,["to"])),v(H,null,{content:R(()=>{var U,q;return[v(Y,{class:"mx-auto mb-8 w-60","aria-hidden":"true"}),u("div",bt,[c(y)?b("",!0):(n(),C(Z,{key:0,value:`${c(h)} report preview`,class:"!px-16 !text-xl !font-normal",severity:"info",rounded:""},null,8,["value"])),u("h1",vt,' Accessibility Audit Report "'+_(c(m).config.title)+'" ',1),c(m).config.description?(n(),l("p",xt,_(c(m).config.description),1)):b("",!0),u("p",null,[$(" Created by "+_((U=c(m).profiles)==null?void 0:U.full_name)+' in "'+_((q=c(m).projects)==null?void 0:q.name)+'" project on ',1),u("time",null,_(new Date(c(m).created_at).toLocaleDateString("pl-PL")),1),i[2]||(i[2]=$(". "))])]),u("div",kt,[u("div",Ct,[c(m).config.pages.length?(n(),l(k,{key:0},[i[4]||(i[4]=u("h2",{class:"text-lg font-medium"},"Pages:",-1)),u("ul",wt,[(n(!0),l(k,null,A(c(m).config.pages,(E,D)=>{var M;return n(),l("li",{key:D},[v(V,{to:E.url,target:"_blank",class:"break-all"},{default:R(()=>[$(_(E.url),1)]),_:2},1032,["to"]),(M=E.selector)!=null&&M.length?(n(),l(k,{key:0},[i[3]||(i[3]=$(" - selector: ")),u("code",$t,_(E.selector),1)],64)):b("",!0)])}),128))])],64)):b("",!0),i[5]||(i[5]=u("h2",{class:"text-lg font-medium"},"Screen sizes / Devices:",-1)),u("ul",Tt,[(n(!0),l(k,null,A(c(m).config.viewports,(E,D)=>(n(),l("li",{key:D},_(E),1))),128))])]),v(G,{count:c(j).testedElementsCount.issues},null,8,["count"]),c(y)&&c(w).length?(n(),l("div",Rt,[i[6]||(i[6]=u("h2",{class:"mb-2 text-lg font-medium"},"Auditor comment:",-1)),u("p",At,_(c(w)),1)])):c(y)?b("",!0):(n(),l("div",St,[i[7]||(i[7]=u("label",{for:"auditor-comment",class:"mb-2 block text-lg font-medium"}," Auditor comment: ",-1)),v(J,{id:"auditor-comment",modelValue:c(w),"onUpdate:modelValue":i[0]||(i[0]=E=>pe(w)?w.value=E:null),class:"w-full",rows:"10"},null,8,["modelValue"])]))]),c(y)?b("",!0):(n(),l("div",Et,[u("div",Ft,[v(V,{to:`/audit/${c(d)}`,class:"p-button p-button-lg p-button-outlined w-full shrink justify-center md:w-[240px]"},{default:R(()=>i[8]||(i[8]=[$(" Edit audit ")])),_:1},8,["to"]),v(Q,{disabled:c(T),class:"p-button-lg w-full shrink justify-center md:w-[240px]",onClick:f},{default:R(()=>i[9]||(i[9]=[$(" Complete report ")])),_:1},8,["disabled"])])]))]}),_:1}),(n(!0),l(k,null,A(c(j).categories,(U,q)=>(n(),C(H,{key:q},{content:R(()=>[v(X,{name:q,tests:U.tests,status:U.status},null,8,["name","tests","status"])]),_:2},1024))),128))],2)):b("",!0)])}}});export{zt as default};
