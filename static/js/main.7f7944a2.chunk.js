(this["webpackJsonpvaccine-slot-finder"]=this["webpackJsonpvaccine-slot-finder"]||[]).push([[0],{156:function(e,t,c){"use strict";c.r(t);var n=c(4),i=c.n(n),a=c(22),s=c.n(a),r=(c(74),c(75),c(7)),l=function(e,t){localStorage.setItem(e,JSON.stringify(t))},d=function(e,t){var c=localStorage.getItem(e);return c?JSON.parse(c):t||null},o=c(10),b=c(14),j=c(34),u=c.n(j),h=c(67),m=c.n(h),p=(c(94),c.p,c(95),c(1));var O=function(e){var t,c=null,i=6e4,a=[{value:15e3,label:"15 Seconds"},{value:3e4,label:"30 Seconds"},{value:i,label:"1 Minute"},{value:12e4,label:"2 Minutes"},{value:9e5,label:"15 Minutes"},{value:18e5,label:"30 Minutes"}],s="AUTO_REFRESH_INTERVAL",j="AUTO_REFRESH_FLAG",h="SEARCH_CONDITIONS",O="STATES",f="AGE_LIMIT_18",x="AGE_LIMIT_45",v="AGE_LIMIT_60",g=Object(n.useState)([]),_=Object(r.a)(g,2),k=_[0],S=_[1],y=Object(n.useState)(function(){var e=d(h,[]);return e.length>0?e.map((function(e,t){return{id:t,districtList:e.districtList,state:e.state,state_name:e.state_name,district:e.district,district_name:e.district_name,availableSlots:[]}})):[{id:0,districtList:[],state:"",district:""}]}()),C=Object(r.a)(y,2),N=C[0],I=C[1],L=Object(n.useState)(new Date),w=Object(r.a)(L,2),D=w[0],A=w[1],E=Object(n.useState)(!1),G=Object(r.a)(E,2),F=G[0],z=G[1],M=Object(n.useState)(null),T=Object(r.a)(M,2),R=T[0],K=T[1],H=Object(n.useState)(!1),J=Object(r.a)(H,2),V=J[0],q=J[1],B=Object(n.useState)(!1),U=Object(r.a)(B,2),P=U[0],X=U[1],Y=Object(n.useState)(!1),Q=Object(r.a)(Y,2),W=Q[0],Z=Q[1],$=Object(n.useState)(""),ee=Object(r.a)($,2),te=ee[0],ce=ee[1],ne=function(e,t){var c=e.target.value;!function(e,t){var c="DISTRICTS_".concat(e),n=d(c,[]);n.length>0?t(n):u.a.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+e).then((function(e){if(e&&e.data){var n=e.data.districts;l(c,n),t(n)}}))}(c,(function(e){var n=N.findIndex((function(e){return e.id===t.id}));if(n>-1){N[n].state=c;var i=k.find((function(e){return e.state_id==c}));i&&(N[n].state_name=i.state_name),N[n].districtList=e,I((function(e){return Object(b.a)(N)})),ie(N)}}))},ie=function(e){var t=[];e&&(t=e.map((function(e){return{id:e.id,state:e.state,state_name:e.state_name,district:e.district,district_name:e.district_name,districtList:e.districtList,availableSlots:e.availableSlots}}))),l(h,t)},ae=function(e){var t=e.getDate(),c=e.getMonth()+1;return(t<=9?"0"+t:t)+"-"+(c<=9?"0"+c:c)+"-"+e.getFullYear()},se=function(){var e=d(h,[]);e.length>0&&e.map((function(e){var t=N.findIndex((function(t){return t.id===e.id}));t>-1&&(N[t].isLoading=!0,I(Object(b.a)(N)));var c="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=".concat(e.district,"&date=").concat(ae(new Date(D)));u.a.get(c).then((function(t){t&&t.data&&re(e,t.data.centers)}))}))},re=function(e,t){var c=[];t.length>0&&t.map((function(e){var t=[],n=[];V&&n.push(18),P&&n.push(45),W&&n.push(60);var i=e.sessions||[];n.length>0&&(i=i.filter((function(e){return n.indexOf(e.min_age_limit)>-1}))),i.map((function(e){(e.available_capacity>0||e.available_capacity_dose1>0||e.available_capacity_dose2>0)&&t.push(e)})),t.length>1&&c.push({center:e,sessions:t})}));var n=N.findIndex((function(t){return t.id===e.id}));n>-1&&(N[n].isLoading=!1,N[n].availableSlots=c,I(Object(b.a)(N)),ie(N))},le=function(){if(5!==N.length){var e=[].concat(Object(b.a)(N),[{id:N.length,districtList:[],state:"",district:"",availableSlots:[]}]);I(Object(b.a)(e)),ie(e)}},de=function(){oe();var e=0;c=window.setInterval((function(){if(!d(j,!1))return ce(""),void(e=0);var t=parseInt(R)/1e3;++e>t&&(e=1);var c=t-e;if(c){var n=Math.floor(c/60),i=Math.ceil(c%60),a=[];a.push(n<10?"0".concat(n,"m: "):"".concat(n,"m:")),a.push(i<10?"0".concat(i,"s"):"".concat(i,"s")),ce(a.join(""))}e===t&&se()}),1e3)},oe=function(){c&&window.clearInterval(c)},be=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("button",{class:"btn btn-secodary",type:"button",disabled:!0,children:[Object(p.jsx)("span",{class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),Object(p.jsx)("span",{className:"ml-10",children:"Loading..."})]})})};return Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t},Object(n.useEffect)((function(){return function(){var e=d(O,[]);e.length>0?S(e):u.a.get("https://cdn-api.co-vin.in/api/v2/admin/location/states").then((function(e){if(e&&e.data){var t=e.data.states;l(O,t),S(e.data.states)}}))}(),function(){var e=d(j,!1);z(e);var t=d(s,i);K(parseInt(t));var c=d(f,!1);q(c);var n=d(x,!1);X(n);var a=d(v,!1);Z(a)}(),de(),function(){oe()}}),[]),Object(n.useEffect)((function(){}),[N,te,R,V,P,W]),Object(n.useEffect)((function(){de()}),[R]),Object(p.jsxs)("div",{className:"header-section",children:[Object(p.jsxs)("div",{className:"row form-row",children:[(N||[]).map((function(e,t){var c;return Object(p.jsxs)("div",{className:"col-md-4 col-sm-6",children:[Object(p.jsxs)("h5",{children:["Location ",t+1,N.length>1&&Object(p.jsx)("button",{className:"btn text-danger btn-sm btn-del-location",title:"Delete location",onClick:function(){!function(e){if(1!==N.length){var t=N.findIndex((function(t){return t.id===e.id}));t>-1&&N.splice(t,1),I(Object(b.a)(N)),ie(N)}}(e)},children:"X"}),t===N.length-1&&Object(p.jsx)("button",{className:"btn btn-info btn-sm btn-add-location",onClick:le,children:"+ Add Location"})]}),Object(p.jsxs)("div",{class:"input-group input-group-sm mb-3",children:[Object(p.jsx)("span",{class:"input-group-text",id:"inputGroup-sizing-sm-s-".concat(e.id),children:"State"}),Object(p.jsxs)("select",{class:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm-s-".concat(e.id),value:e.state,onChange:function(t){ne(t,e)},children:[Object(p.jsx)("option",{children:"Select State"}),k.map((function(e){return Object(p.jsx)("option",{value:e.state_id,children:e.state_name})}))]})]}),Object(p.jsxs)("div",{class:"input-group input-group-sm mb-3",children:[Object(p.jsx)("span",{class:"input-group-text",id:"inputGroup-sizing-sm-d-".concat(e.id),children:"District"}),Object(p.jsxs)("select",(c={class:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm-d-".concat(e.id)},Object(o.a)(c,"aria-label",".district-select-sm example"),Object(o.a)(c,"value",e.district),Object(o.a)(c,"onChange",(function(t){!function(e,t){var c=e.target.value,n=N.findIndex((function(e){return e.id===t.id}));if(n>-1){N[n].district=c;var i=N[n].districtList.find((function(e){return e.district_id==c}));i&&(N[n].district_name=i.district_name)}I(Object(b.a)(N)),ie(N),se()}(t,e)})),Object(o.a)(c,"children",[Object(p.jsx)("option",{children:"Select District"}),e.districtList&&e.districtList.map((function(e){return Object(p.jsx)("option",{value:e.district_id,children:e.district_name})}))]),c))]})]},e.id)})),Object(p.jsxs)("div",{className:"col-md-4 col-sm-6",children:[Object(p.jsxs)("div",{class:"input-group input-group-sm mb-3",children:[Object(p.jsx)("span",{class:"input-group-text",id:"inputGroup-sizing-sm-dt",children:"Date"}),Object(p.jsxs)("div",(t={class:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm-dt"},Object(o.a)(t,"aria-label",".district-select-sm example"),Object(o.a)(t,"children",[Object(p.jsx)(m.a,{selected:D,onChange:function(e){return A(e)},dateFormat:"dd-MM-yyyy"}),Object(p.jsxs)("span",{className:"float-right",children:[" to ",Object(p.jsx)("small",{children:ae(new Date(D).addDays(5))})]})]),t))]}),Object(p.jsxs)("div",{class:"input-group input-group-sm mb-3",children:[Object(p.jsx)("span",{class:"input-group-text mr-20",id:"inputGroup-sizing-sm-s-email",children:"Age Limit"}),Object(p.jsxs)("div",{class:"form-check age-limit-chkbox form-check-inline ml-10",children:[Object(p.jsx)("input",{class:"form-check-input",type:"checkbox",id:"inlineCheckbox1",checked:V,value:V,onChange:function(e){q(e.target.checked),l(f,e.target.checked)}}),Object(p.jsx)("label",{class:"form-check-label",for:"inlineCheckbox1",children:"18+"})]}),Object(p.jsxs)("div",{class:"form-check form-check-inline age-limit-chkbox",children:[Object(p.jsx)("input",{class:"form-check-input",type:"checkbox",id:"inlineCheckbox2",checked:P,value:P,onChange:function(e){X(e.target.checked),l(x,e.target.checked)}}),Object(p.jsx)("label",{class:"form-check-label",for:"inlineCheckbox2",children:"45+"})]}),Object(p.jsxs)("div",{class:"form-check form-check-inline age-limit-chkbox",children:[Object(p.jsx)("input",{class:"form-check-input",type:"checkbox",id:"inlineCheckbox3",checked:W,value:W,onChange:function(e){Z(e.target.checked),l(v,e.target.checked)}}),Object(p.jsx)("label",{class:"form-check-label",for:"inlineCheckbox3",children:"60+"})]})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("div",{className:"col-md-6 col-sm-12",children:Object(p.jsxs)("div",{class:"form-check",children:[Object(p.jsx)("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckChecked",checked:F,onChange:function(e){var t=e.target.checked;l(j,t),z((function(){return t}))}}),Object(p.jsx)("label",{class:"form-check-label",for:"flexCheckChecked",children:"Auto Refresh"})]})}),Object(p.jsx)("div",{className:"col-md-6 col-sm-12",children:Object(p.jsxs)("div",{class:"input-group input-group-sm mb-3",children:[Object(p.jsx)("span",{class:"input-group-text",id:"inputGroup-sizing-sm-s-interval",children:"Interval"}),Object(p.jsxs)("select",{class:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm-interval",value:R,onChange:function(e){var t=e.target.value;l(s,t),K((function(){return t})),window.location.reload()},disabled:!F,children:[Object(p.jsx)("option",{children:"Select Interval"}),a.map((function(e){return Object(p.jsx)("option",{value:e.value,children:e.label})}))]})]})})]})]}),Object(p.jsxs)("div",{className:"col-md-2 col-sm-6",children:[Object(p.jsx)("button",{className:"btn btn-sm btn-primary btn-block",onClick:se,children:"Search"}),F&&Object(p.jsx)("span",{children:Object(p.jsxs)("small",{children:["Auto-Refreshing in ",te]})})]})]}),Object(p.jsx)("div",{className:"row d-md-block d-lg-block d-sm-none d-xs-none d-none",children:(N||[]).map((function(e){var t=0;return Object(p.jsxs)("div",{className:"col-md-12 slot-result-wrapper",children:[Object(p.jsxs)("h4",{children:[e.state_name," (",e.district_name,")"]}),e.isLoading&&Object(p.jsx)("div",{className:"loader-img",children:be()}),!e.isLoading&&Object(p.jsxs)("table",{className:"table table-dark table-striped table-sm table-hover table-slot-result",children:[Object(p.jsx)("thead",{children:Object(p.jsxs)("tr",{children:[Object(p.jsx)("th",{children:"#"}),Object(p.jsx)("th",{children:"Fee Type"}),Object(p.jsx)("th",{children:"Fees"}),Object(p.jsx)("th",{children:"Vaccine"}),Object(p.jsx)("th",{children:"Age Limit"}),Object(p.jsx)("th",{children:"Avl Capacity"}),Object(p.jsx)("th",{children:"Avl Dose 1"}),Object(p.jsx)("th",{children:"Avl Dose 2"}),Object(p.jsx)("th",{children:"Date"}),Object(p.jsx)("th",{children:"Address"})]})}),Object(p.jsxs)("tbody",{children:[0===(e.availableSlots||[]).length&&Object(p.jsx)("tr",{children:Object(p.jsx)("td",{colSpan:"10",className:"no-record",children:"No slots found!"})}),(e.availableSlots||[]).map((function(e){return(e.sessions||[]).map((function(c,n){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:++t}),Object(p.jsx)("td",{children:e.center.fee_type}),Object(p.jsx)("td",{children:e.center.vaccine_fees?"".concat(e.center.vaccine_fees[0].fee," (").concat(e.center.vaccine_fees[0].vaccine,")"):"0"}),Object(p.jsx)("td",{children:c.vaccine}),Object(p.jsx)("td",{children:c.min_age_limit}),Object(p.jsx)("td",{children:c.available_capacity}),Object(p.jsx)("td",{children:c.available_capacity_dose1}),Object(p.jsx)("td",{children:c.available_capacity_dose2}),Object(p.jsx)("td",{children:c.date}),Object(p.jsxs)("td",{children:[e.center.name,", ",e.center.address]})]})}))}))]})]})]})}))}),Object(p.jsx)("div",{className:"row d-lg-none d-md-none d-sm-block d-xs-block",children:(N||[]).map((function(e){return Object(p.jsxs)("div",{className:"col-md-12 slot-result-wrapper",children:[Object(p.jsxs)("h4",{children:[e.state_name," (",e.district_name,")"]}),e.isLoading&&Object(p.jsx)("div",{className:"loader-img",children:be()}),!e.isLoading&&Object(p.jsxs)(p.Fragment,{children:[0===(e.availableSlots||[]).length&&Object(p.jsx)("div",{className:"no-record",children:"No slots found!"}),Object(p.jsx)("div",{class:"list-group",children:(e.availableSlots||[]).map((function(e){return(e.sessions||[]).map((function(t,c){return Object(p.jsxs)("a",{href:"javascript:void(0)",class:"list-group-item list-group-item-action","aria-current":"true",children:[Object(p.jsxs)("div",{class:"d-flex w-100 justify-content-between",children:[Object(p.jsxs)("h5",{class:"mb-1",children:["Age Limit: ",t.min_age_limit,"Free"!=e.center.fee_type&&Object(p.jsxs)(p.Fragment,{children:[", Rs. ",e.center.vaccine_fees?"".concat(e.center.vaccine_fees[0].fee," (").concat(e.center.vaccine_fees[0].vaccine,")"):"0"]})]}),Object(p.jsx)("small",{children:Object(p.jsx)("span",{class:"badge ".concat("Free"===e.center.fee_type?"bg-primary":"bg-warning"),children:e.center.fee_type})})]}),Object(p.jsxs)("p",{class:"mb-1",children:["Available Capacity: ",t.available_capacity,","," ",Object(p.jsx)("b",{children:"Dose 1"}),": ",t.available_capacity_dose1,","," ",Object(p.jsx)("b",{children:"Dose 2"}),": ",t.available_capacity_dose2,","]}),Object(p.jsxs)("small",{children:["Vaccine: ",t.vaccine,", Date: ",t.date]}),Object(p.jsx)("p",{children:Object(p.jsxs)("small",{children:[e.center.name,", ",e.center.address]})})]})}))}))})]})]})}))})]})},f=c(48);var x=function(e){var t=e.onHandleSubmit,c=Object(n.useState)(!1),i=Object(r.a)(c,2),a=i[0],s=i[1],l=Object(n.useState)({secretCode:null,secretKey:null}),d=Object(r.a)(l,2),b=d[0],j=d[1],u=function(e){var t=e.target,c=t.id,n=t.value;j((function(e){return Object(f.a)(Object(f.a)({},e),{},Object(o.a)({},c,n))}))};return Object(p.jsxs)("div",{className:"login-wrapper",children:[Object(p.jsxs)("div",{class:"mb-3",children:[Object(p.jsx)("label",{for:"secretCode",class:"form-label",children:"Code"}),Object(p.jsx)("input",{type:"password",class:"form-control",id:"secretCode",placeholder:"Enter code",onChange:u})]}),Object(p.jsxs)("div",{class:"mb-3",children:[Object(p.jsx)("label",{for:"secretKey",class:"form-label",children:"Secret Key"}),Object(p.jsx)("input",{type:"password",class:"form-control",id:"secretKey",placeholder:"Enter secret key",onChange:u})]}),a&&Object(p.jsx)("div",{className:"text-danger",children:"Invalid code and key. Please try with valid credentials. "}),Object(p.jsx)("br",{}),Object(p.jsx)("button",{type:"button",class:"btn btn-primary btn-block",disabled:!b.secretCode||!b.secretKey,onClick:function(){s(!1);var e=b.secretCode,c=b.secretKey;if(!e||!c)return!1;"I4096"===c&&"4096"===e?t&&t(!0):s(!0)},children:"Submit"})]})};var v=function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),c=t[0],i=t[1];return Object(n.useEffect)((function(){var e=d("ISLG",!1);i(e)}),[]),Object(n.useEffect)((function(){}),[c]),Object(p.jsx)("div",{className:"row row-home",children:Object(p.jsx)("div",{className:"col-md-12",children:c?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("figure",{class:"text-center fig-app",children:[Object(p.jsxs)("blockquote",{class:"blockquote",children:[Object(p.jsx)("p",{children:"Vaccine Slot Finder."}),Object(p.jsx)("button",{className:"btn btn-sm btn-danger btn-logout",onClick:function(){var e;e="ISLG",localStorage.removeItem(e),window.location.reload()},children:"Log Out"})]}),Object(p.jsx)("figcaption",{class:"blockquote-footer",children:Object(p.jsx)("cite",{title:"Source Title",children:"Find slots at multiple locations together"})})]}),Object(p.jsx)(O,{})]}):Object(p.jsx)(x,{onHandleSubmit:function(e){i(e),l("ISLG",e)}})})})};var g=function(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsx)(v,{})})};s.a.render(Object(p.jsx)(i.a.StrictMode,{children:Object(p.jsx)(g,{})}),document.getElementById("root"))},74:function(e,t,c){},75:function(e,t,c){},95:function(e,t,c){}},[[156,1,2]]]);
//# sourceMappingURL=main.7f7944a2.chunk.js.map