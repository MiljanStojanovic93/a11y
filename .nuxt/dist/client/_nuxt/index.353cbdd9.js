import{_ as oe}from"./nuxt-link.9e88655f.js";import{_ as ce}from"./Spinner.022385d5.js";import{d as ae,s as me,$ as Z,X as pe,r as d,p as T,Z as fe,b as C,o as l,c as p,f,g as c,e as i,j as o,l as M,m as V,v as F,t as Y,F as P,z as te,q as b,a0 as ve,n as _e,U as be,_ as ye,W as ge,a as se,x as he,y as we,a1 as xe}from"./entry.bde0faaf.js";import{h as le,o as Ae}from"./time.9f250bef.js";import"./_plugin-vue_export-helper.c27b6911.js";const je=["draft","completed"],ke=be(()=>ye(()=>import("./AuditErrorsDialog.8f1d4ec9.js"),["./AuditErrorsDialog.8f1d4ec9.js","./entry.bde0faaf.js"],import.meta.url).then(U=>U.default||U)),Te={class:"flex flex-wrap items-center justify-between gap-2"},Ce={class:"flex w-full items-center lg:w-2/4"},Ve={class:"p-input-icon-left w-full lg:w-1/4"},Fe={class:"mt-3 flex flex-col gap-3 lg:flex-row"},$e={key:0,class:"flex w-full items-center"},Ie={key:1,class:"flex w-full items-center"},Se={key:2,class:"flex w-full items-center"},Ue=["href"],De={key:0,class:"flex items-center px-4"},Ee=ae({__name:"AuditTable",props:{audits:{},projects:{},projectId:{},showUserAudits:{type:Boolean}},emits:["delete-audit"],setup(U,{emit:q}){const m=U,N=q,$=me(),{user:D}=Z(),v=pe(),g=d(!1),h=d(""),I=d(""),B=T(()=>m.audits.map(t=>({data:{...t,project:t.projects.name,auditor:t.profiles.username}}))),y=T(()=>{const t=m.projects.map(({name:e,id:u})=>({name:e,value:e,id:u}));return t.unshift({name:"All",value:"",id:0}),t}),R=T(()=>{const t=je.map(e=>({name:e,value:e}));return t.unshift({name:"All",value:""}),t}),O=T(()=>m.audits.map(({profile_id:t})=>t)),w=T(()=>{const t=m.audits.filter(({profile_id:e},u)=>!O.value.includes(e,u+1)).map(e=>({name:e.profiles.username,value:e.profiles.username,id:e.profile_id}));return t.unshift({name:"All",value:"",id:""}),t}),x=d(y.value.find(({id:t})=>t===(m==null?void 0:m.projectId))||y.value[0]),A=d(m.showUserAudits?w.value.find(({id:t})=>t===D.value.id):w.value[0]),j=d(R.value[0]),E=T(()=>{var t;return{global:"",project:x.value.value,auditor:(t=A.value)==null?void 0:t.value,status:j.value.value}}),r=[{field:"config.title",header:"Title",sortable:!0,start:!0},{field:"project",header:"Project",sortable:!0,start:!0},{field:"auditor",header:"Auditor",sortable:!0,start:m.showUserAudits},{field:"status",header:"Status",sortable:!0},{field:"urls",header:"Urls",start:!0}],a=d(r.filter(t=>t.start)),n=t=>a.value.some(({field:e})=>e===t),{isAdmin:S,isAuditor:z}=Z(),H=t=>{$.require({message:"Do you want to delete this audit?",header:"Delete Confirmation",icon:"pi pi-info-circle",acceptClass:"p-button-danger !pr-6",accept:()=>{N("delete-audit",t)}})},J=t=>t.some(e=>{var u;return(u=e==null?void 0:e.errors)==null?void 0:u.length}),K=t=>le(t,15),W=t=>!t.axe.length&&!K(t.created_at),ne=t=>{var e,u,k;I.value=`Audit ${t.id} - errors during automatic test processing`,h.value=((k=(u=(e=t.axe)==null?void 0:e.find(({errors:_})=>_))==null?void 0:u.errors[0])==null?void 0:k.message)||"Something went wrong, test malformed.",g.value=!0},re=()=>{I.value="",h.value=""};return fe([x,A,a],t=>{var u,k;let e={};t[2].some(({field:_})=>_==="project")&&((u=t[0])!=null&&u.id)&&(e={...e,projectId:t[0].id}),t[2].some(({field:_})=>_==="auditor")&&((k=t[1])==null?void 0:k.id)===D.value.id&&(e={...e,user:"me"}),v.replace({query:e})}),(t,e)=>{const u=C("MultiSelect"),k=C("InputText"),_=C("Dropdown"),G=C("Column"),X=oe,Q=C("Button"),ie=C("TreeTable"),ue=ke;return l(),p(P,null,[f(ie,{"auto-layout":!0,size:"small","show-gridlines":"",value:o(B),filters:o(E)},{header:c(()=>[i("div",Te,[i("div",Ce,[e[6]||(e[6]=i("label",{class:"mr-2 shrink",for:"select-columns"}," Select columns ",-1)),f(u,{modelValue:o(a),"onUpdate:modelValue":e[0]||(e[0]=s=>M(a)?a.value=s:null),"input-id":"select-columns",options:r,"option-label":"header",class:"w-full overflow-auto lg:w-auto",display:"chip",placeholder:"Select Columns"},null,8,["modelValue"])]),i("div",Ve,[e[7]||(e[7]=i("i",{class:"pi pi-search"},null,-1)),f(k,{modelValue:o(E).global,"onUpdate:modelValue":e[1]||(e[1]=s=>o(E).global=s),placeholder:"Global Search",class:"w-full"},null,8,["modelValue"])])]),i("div",Fe,[n("project")?(l(),p("div",$e,[e[8]||(e[8]=i("label",{class:"mr-2 shrink-0",for:"filter-projects"}," Filter by projects ",-1)),f(_,{modelValue:o(x),"onUpdate:modelValue":e[2]||(e[2]=s=>M(x)?x.value=s:null),"input-id":"filter-projects","aria-label":"Filter by project",options:o(y),"option-label":"name",placeholder:"Filter by project",class:"w-full","data-testid":"audits-project-filter-select"},null,8,["modelValue","options"])])):V("",!0),n("auditor")?(l(),p("div",Ie,[e[9]||(e[9]=i("label",{class:"mr-2 shrink-0",for:"filter-auditor"}," Filter by auditor ",-1)),f(_,{id:"auditor-filter",modelValue:o(A),"onUpdate:modelValue":e[3]||(e[3]=s=>M(A)?A.value=s:null),"aria-label":"Filter by auditor",options:o(w),"option-label":"name",placeholder:"Filter by auditor",class:"w-full","data-testid":"audits-auditor-filter-select"},null,8,["modelValue","options"])])):V("",!0),n("status")?(l(),p("div",Se,[e[10]||(e[10]=i("label",{class:"mr-2 shrink-0",for:"filter-status"}," Filter by status ",-1)),f(_,{id:"status-filter",modelValue:o(j),"onUpdate:modelValue":e[4]||(e[4]=s=>M(j)?j.value=s:null),"aria-label":"Filter by status",options:o(R),"option-label":"name",placeholder:"Filter by status",class:"w-full","data-testid":"audits-status-filter-select"},null,8,["modelValue","options"])])):V("",!0)])]),empty:c(()=>e[16]||(e[16]=[i("div",{class:"p-2 text-center"},"The list is empty",-1)])),default:c(()=>[f(G,{header:"Created : Id"},{body:c(({node:s})=>[F(Y(new Date(s.data.created_at).toLocaleDateString("pl-PL"))+" : "+Y(s.data.id),1)]),_:1}),(l(!0),p(P,null,te(o(a),s=>(l(),b(G,{key:s.field,field:s.field,header:s.header,sortable:s.sortable},ve({_:2},[s.field==="urls"?{name:"body",fn:c(L=>[i("ul",null,[(l(!0),p(P,null,te(L.node.data.config.pages,(ee,de)=>(l(),p("li",{key:`page-${L.node.data.id}-${de}`},[i("a",{href:ee.url},Y(ee.url),9,Ue)]))),128))])]),key:"0"}:void 0]),1032,["field","header","sortable"]))),128)),f(G,{header:"Action"},{body:c(s=>[i("div",{class:_e(["grid min-w-[386px] gap-2",{"grid-cols-3":!W(s.node.data),"grid-cols-1":W(s.node.data)}])},[W(s.node.data)?(l(),p("span",De,e[11]||(e[11]=[i("i",{class:"pi pi-spin pi-cog mr-4","aria-hidden":"true"},null,-1),F(" Tests in progress ")]))):(l(),p(P,{key:1},[s.node.data.status==="completed"?(l(),b(X,{key:0,class:"p-button p-button-info justify-center",to:`/audit/report/${s.node.data.id}?type=${s.node.data.report_type}`},{default:c(()=>e[12]||(e[12]=[F(" View report ")])),_:2},1032,["to"])):s.node.data.axe.length&&!J(s.node.data.axe)?(l(),b(X,{key:1,class:"p-button p-button-info justify-center",to:`/audit/${s.node.data.id}?resultId=${s.node.data.axe[0].id}`},{default:c(()=>e[13]||(e[13]=[F(" View results ")])),_:2},1032,["to"])):J(s.node.data.axe)||!s.node.data.axe.length&&K(s.node.data.created_at)?(l(),b(Q,{key:2,severity:"danger",label:"View errors",onClick:L=>ne(s.node.data)},null,8,["onClick"])):V("",!0),f(X,{to:`/audit/new?baseAuditId=${s.node.data.id}`,class:"p-button p-button-info p-button-outlined justify-center"},{default:c(()=>e[14]||(e[14]=[F(" Repeat ")])),_:2},1032,["to"]),o(S)||o(z)&&s.node.data.status==="draft"?(l(),b(Q,{key:3,severity:"danger",outlined:"",class:"justify-center",onClick:L=>H(s.node.data.id)},{default:c(()=>e[15]||(e[15]=[F(" Remove ")])),_:2},1032,["onClick"])):V("",!0)],64))],2)]),_:1})]),_:1},8,["value","filters"]),o(I)&&o(h)?(l(),b(ue,{key:0,visible:o(g),"onUpdate:visible":e[5]||(e[5]=s=>M(g)?g.value=s:null),header:o(I),"error-message":o(h),onHide:re},null,8,["visible","header","error-message"])):V("",!0)],64)}}}),Me={class:"grid"},Ne={class:"flex justify-between"},Re={class:"grid"},Le={key:2},He=ae({__name:"index",setup(U){const{isAdmin:q,isAuditor:m}=Z(),N=ge(),$=se(),D=he(),v=d([]),g=d([]),h=d(!0),I=d(Number(N.query.projectId)),B=d(N.query.user==="me"),y=d(new Map),R=T(()=>v.value.every(r=>le(r.created_at,15))),O=$.channel("axe").on("postgres_changes",{event:"INSERT",schema:"public",table:"axe"},async r=>{var S;const a=r.new.audit_id,n=y.value.get(a);if(!(!n||n.didAutomaticTestsFail)){if((S=r.new.errors)!=null&&S.length){n.didAutomaticTestsFail=!0,y.value.set(a,n),await w();return}n.automaticTestsCount+=1,y.value.set(a,n),n.automaticTestsCount===n.totalNumberOfAllTests&&(await w(),D.add({severity:"info",summary:"The audit list has been updated",life:3e3}))}}).subscribe();async function w(){const{data:r}=await $.from("audits").select("*, projects(name), profiles(username, full_name), axe (id, errors)").order("created_at",{ascending:!1});v.value=r||[],v.value.filter(a=>!a.axe.length).forEach(({id:a,config:n})=>{y.value.set(a,{totalNumberOfAllTests:n.pages.length*n.viewports.length,automaticTestsCount:0,didAutomaticTestsFail:!1})})}async function x(){const r=se();try{const{data:a}=await r.from("projects").select("*").order("name",{ascending:!0});g.value=a||[]}catch(a){console.error("Error fetching projects:",a)}}const A=async r=>{const{error:a}=await $.from("audits").delete().eq("id",r);a||(v.value=v.value.filter(({id:n})=>n!==r),D.add({severity:"success",summary:`Audit #${r} deleted`,life:3e3}))};async function j(){try{await Promise.all([w(),x()])}catch(r){console.error("Error fetching data:",r)}finally{h.value=!1}}const E=setTimeout(async()=>{await j()},15*Ae);return R.value&&clearTimeout(E),we(async()=>{await j()}),xe(()=>{$.removeChannel(O)}),(r,a)=>{const n=oe,S=ce,z=Ee,H=C("Card");return l(),p("div",Me,[i("div",Ne,[a[1]||(a[1]=i("h1",null,"Audit list",-1)),o(q)||o(m)?(l(),b(n,{key:0,to:"/audit/new",class:"p-button-link"},{default:c(()=>a[0]||(a[0]=[F(" Add new audit ")])),_:1})):V("",!0)]),i("div",Re,[f(H,{pt:{content:{class:"flex flex-col"}},class:"mb-6 overflow-auto"},{content:c(()=>[o(h)?(l(),b(S,{key:0,class:"mx-auto w-20"})):o(v).length?(l(),b(z,{key:1,audits:o(v),projects:o(g),"project-id":o(I),"show-user-audits":o(B),onDeleteAudit:A},null,8,["audits","projects","project-id","show-user-audits"])):(l(),p("p",Le,"Your audit list is empty"))]),_:1})])])}}});export{He as default};
