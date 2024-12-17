import{_ as F}from"./nuxt-link.9e88655f.js";import{d as N,a as T,x as I,a2 as L,b as c,o as d,c as m,e as a,f as r,j as e,l as g,n as b,t as v,m as y,v as C,g as E,k as A,F as M}from"./entry.bde0faaf.js";import{u as R,a as j,i as z,d as D}from"./form.41b0e6ae.js";import"./screenSizes.19d85ebf.js";const q={class:"mb-4 w-full"},G={key:0,class:"p-error mt-1"},H={class:"mb-4 w-full"},J={key:0,class:"p-error mt-1"},K={class:"mb-10 w-full"},O={key:0,class:"p-error mt-1"},Q={class:"mt-4"},ss=N({__name:"register",setup(W){const V=T(),_=I(),{useFieldModel:k,handleSubmit:P,errors:t,submitCount:S}=R({validationSchema:z}),[u,p,f]=k(["email","newPassword","passwordConfirm"]),{isSubmitted:l}=j(S),x=P(async({email:i,newPassword:s})=>{const{data:w,error:n}=await V.auth.signUp({email:i,password:s});n&&_.add({severity:"error",summary:n.message,life:3e3}),w.user&&(L("/login"),_.add({severity:"success",summary:"Account successfully created. Please check your email to verify your account."}))},({errors:i})=>D(i));return(i,s)=>{const w=c("InputText"),n=c("Password"),U=c("Button"),B=F;return d(),m(M,null,[s[9]||(s[9]=a("div",{class:"mb-4"},[a("h1",{class:"Login"},"Register"),a("span",null,"Let's get started")],-1)),a("form",{class:"flex flex-col",novalidate:"",onSubmit:s[3]||(s[3]=A((...o)=>e(x)&&e(x)(...o),["prevent"]))},[a("span",q,[s[4]||(s[4]=a("label",{for:"email"}," Email ",-1)),r(w,{id:"email",modelValue:e(u),"onUpdate:modelValue":s[0]||(s[0]=o=>g(u)?u.value=o:null),"data-test-id":"register-email-field",class:b(["p-inputtext-lg md:w-25rem w-full",[{"p-invalid":e(t).email&&e(l)}]]),name:"email"},null,8,["modelValue","class"]),e(t).email&&e(l)?(d(),m("small",G,v(e(t).email),1)):y("",!0)]),a("span",H,[s[5]||(s[5]=a("label",{for:"new-password"}," Password ",-1)),r(n,{modelValue:e(p),"onUpdate:modelValue":s[1]||(s[1]=o=>g(p)?p.value=o:null),"input-id":"new-password","data-testid":"register-password-field",class:b(["p-inputtext-lg md:w-25rem w-full",[{"p-invalid":e(t).newPassword&&e(l)}]]),"input-class":"w-full",feedback:!1,"toggle-mask":"",pt:{input:{name:"newPassword"}}},null,8,["modelValue","class"]),e(t).newPassword&&e(l)?(d(),m("small",J,v(e(t).newPassword),1)):y("",!0)]),a("span",K,[s[6]||(s[6]=a("label",{for:"password-confirm"}," Confirm password ",-1)),r(n,{modelValue:e(f),"onUpdate:modelValue":s[2]||(s[2]=o=>g(f)?f.value=o:null),"input-id":"password-confirm","data-testid":"register-confirm-password-field",class:b(["p-inputtext-lg md:w-25rem w-full",[{"p-invalid":e(t).passwordConfirm&&e(l)}]]),"input-class":"w-full",feedback:!1,"toggle-mask":"",pt:{input:{name:"passwordConfirm"}}},null,8,["modelValue","class"]),e(t).passwordConfirm&&e(l)?(d(),m("small",O,v(e(t).passwordConfirm),1)):y("",!0)]),r(U,{class:"p-button-lg mb-4 w-full",type:"submit",label:"Sign Up","data-testid":"register-submit-button"}),a("p",Q,[s[8]||(s[8]=C(" Already have an account? ")),r(B,{to:"/login",class:"hover:text-primary transition-duration-300 cursor-pointer transition-colors"},{default:E(()=>s[7]||(s[7]=[C(" Login ")])),_:1})])],32)],64)}}});export{ss as default};