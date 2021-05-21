(this["webpackJsonpvaccine-slot-finder"]=this["webpackJsonpvaccine-slot-finder"]||[]).push([[0],{157:function(e,t,c){"use strict";c.r(t);var n=c(4),a=c.n(n),s=c(21),i=c.n(s),r=(c(74),c(75),c(7)),l=function(e,t){localStorage.setItem(e,JSON.stringify(t))},o=function(e,t){var c=localStorage.getItem(e);return c?JSON.parse(c):t||null},d=c(13),b=c(34),j=c.n(b),u=c(67),m=c.n(u),h=(c(94),c(95),c(0));var p=function(e){var t=null,c=6e4,a=[{value:15e3,label:"15 Seconds"},{value:3e4,label:"30 Seconds"},{value:c,label:"1 Minute"},{value:12e4,label:"2 Minutes"},{value:9e5,label:"15 Minutes"},{value:18e5,label:"30 Minutes"}],s="AUTO_REFRESH_INTERVAL",i="AUTO_REFRESH_FLAG",b="SEARCH_CONDITIONS",u="STATES",p="AGE_LIMIT_18",O="AGE_LIMIT_45",f="DOSE_1",x="DOSE_2",v=Object(n.useState)([]),g=Object(r.a)(v,2),N=g[0],_=g[1],k=Object(n.useState)(function(){var e=o(b,[]);return e.length>0?e.map((function(e,t){return{id:t,districtList:e.districtList,state:e.state,state_name:e.state_name,district:e.district,district_name:e.district_name,availableSlots:[]}})):[{id:0,districtList:[],state:"",district:""}]}()),S=Object(r.a)(k,2),y=S[0],C=S[1],I=Object(n.useState)(new Date),L=Object(r.a)(I,2),w=L[0],D=L[1],F=Object(n.useState)(!1),E=Object(r.a)(F,2),A=E[0],G=E[1],R=Object(n.useState)(null),z=Object(r.a)(R,2),M=z[0],T=z[1],K=Object(n.useState)(!1),H=Object(r.a)(K,2),J=H[0],q=H[1],V=Object(n.useState)(!1),B=Object(r.a)(V,2),U=B[0],P=B[1],X=Object(n.useState)(!0),Y=Object(r.a)(X,2),Q=Y[0],W=Y[1],Z=Object(n.useState)(!0),$=Object(r.a)(Z,2),ee=$[0],te=$[1],ce=Object(n.useState)(""),ne=Object(r.a)(ce,2),ae=ne[0],se=ne[1],ie=function(e,t){var c=e.target.value;!function(e,t){var c="DISTRICTS_".concat(e),n=o(c,[]);n.length>0?t(n):j.a.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+e).then((function(e){if(e&&e.data){var n=e.data.districts;l(c,n),t(n)}}))}(c,(function(e){var n=y.findIndex((function(e){return e.id===t.id}));if(n>-1){y[n].state=c;var a=N.find((function(e){return e.state_id===parseInt(c)}));a&&(y[n].state_name=a.state_name),y[n].districtList=e,C((function(e){return Object(d.a)(y)})),re(y)}}))},re=function(e){var t=[];e&&(t=e.map((function(e){return{id:e.id,state:e.state,state_name:e.state_name,district:e.district,district_name:e.district_name,districtList:e.districtList,availableSlots:e.availableSlots}}))),l(b,t)},le=function(e){var t=e.getDate(),c=e.getMonth()+1;return(t<=9?"0"+t:t)+"-"+(c<=9?"0"+c:c)+"-"+e.getFullYear()},oe=function(){var e=o(b,[]);e.length>0&&e.map((function(e){var t=y.findIndex((function(t){return t.id===e.id}));t>-1&&(y[t].isLoading=!0,C(Object(d.a)(y)));var c="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=".concat(e.district,"&date=").concat(le(new Date(w)));return j.a.get(c).then((function(t){t&&t.data&&de(e,t.data.centers)})),!0}))},de=function(e,t){var c=[],n=[],a=o(p),s=o(O),i=o(f),r=o(x);a&&n.push(18),s&&n.push(45);var l=0;t.length>0&&t.map((function(e){var t=[],a=e.sessions||[];return n.length>0&&(a=a.filter((function(e){return n.indexOf(e.min_age_limit)>-1}))),(i&&!r||r&&!i)&&(i&&(a=a.filter((function(e){return e.available_capacity_dose1>0}))),r&&(a=a.filter((function(e){return e.available_capacity_dose2>0})))),a.map((function(e){return(e.available_capacity_dose1>0||e.available_capacity_dose2>0)&&t.push(e),!0})),t.length>1&&(l+=t.length,c.push({center:e,sessions:t})),!0}));var b=y.findIndex((function(t){return t.id===e.id}));b>-1&&(y[b].isLoading=!1,y[b].availableSlots=c,y[b].totalRecords=l,C(Object(d.a)(y)),re(y))},be=function(){if(5!==y.length){var e=[].concat(Object(d.a)(y),[{id:y.length,districtList:[],state:"",district:"",availableSlots:[]}]);C(Object(d.a)(e)),re(e)}},je=function(){ue();var e=0;t=window.setInterval((function(){if(!o(i,!1))return se(""),void(e=0);var t=parseInt(M)/1e3;++e>t&&(e=1);var c=t-e;if(c){var n=Math.floor(c/60),a=Math.ceil(c%60),s=[];s.push(n<10?"0".concat(n,"m: "):"".concat(n,"m:")),s.push(a<10?"0".concat(a,"s"):"".concat(a,"s")),se(s.join(""))}e===t&&oe()}),1e3)},ue=function(){t&&window.clearInterval(t)},me=function(){return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("button",{className:"btn btn-secodary",type:"button",disabled:!0,children:[Object(h.jsx)("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),Object(h.jsx)("span",{className:"ml-10",children:"Loading..."})]})})};return Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t},Object(n.useEffect)((function(){return function(){var e=o(u,[]);e.length>0?_(e):j.a.get("https://cdn-api.co-vin.in/api/v2/admin/location/states").then((function(e){if(e&&e.data){var t=e.data.states;l(u,t),_(e.data.states)}}))}(),function(){var e=o(i,!1);G(e);var t=o(s,c);T(parseInt(t));var n=o(p,!1);q(n);var a=o(O,!1);P(a);var r=o(f,!1);W(r);var l=o(x,!1);te(l)}(),je(),function(){ue()}}),[]),Object(n.useEffect)((function(){}),[y,ae,M,J,U]),Object(n.useEffect)((function(){je()}),[M]),Object(h.jsxs)("div",{className:"header-section",children:[Object(h.jsxs)("div",{className:"row form-row",children:[(y||[]).map((function(e,t){return Object(h.jsxs)("div",{className:"col-md-4 col-sm-6",children:[Object(h.jsxs)("h5",{children:["Location ",t+1,y.length>1&&Object(h.jsx)("button",{className:"btn text-danger btn-sm btn-del-location",title:"Delete location",onClick:function(){!function(e){if(1!==y.length){var t=y.findIndex((function(t){return t.id===e.id}));t>-1&&y.splice(t,1),C(Object(d.a)(y)),re(y)}}(e)},children:"X"}),t===y.length-1&&Object(h.jsx)("button",{className:"btn btn-info btn-sm btn-add-location",onClick:be,children:"+ Add Location"})]},"".concat(e.id,"-").concat(e.district,"-").concat(t,"-h5")),Object(h.jsxs)("div",{className:"input-group input-group-sm mb-3",children:[Object(h.jsx)("span",{className:"input-group-text",id:"inputGroup-sizing-sm-s-".concat(e.id),children:"State"}),Object(h.jsxs)("select",{className:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm-s-".concat(e.id),value:e.state,onChange:function(t){ie(t,e)},children:[Object(h.jsx)("option",{children:"Select State"}),N.map((function(e){return Object(h.jsx)("option",{value:e.state_id,children:e.state_name},"state-".concat(e.state_id))}))]})]},"".concat(e.id,"-").concat(e.district,"-").concat(t,"-div1")),Object(h.jsxs)("div",{className:"input-group input-group-sm mb-3",children:[Object(h.jsx)("span",{className:"input-group-text",id:"inputGroup-sizing-sm-d-".concat(e.id),children:"District"}),Object(h.jsxs)("select",{className:"form-control","aria-describedby":"inputGroup-sizing-sm-d-".concat(e.id),"aria-label":".district-select-sm example",value:e.district,onChange:function(t){!function(e,t){var c=e.target.value,n=y.findIndex((function(e){return e.id===t.id}));if(n>-1){y[n].district=c;var a=y[n].districtList.find((function(e){return e.district_id===parseInt(c)}));a&&(y[n].district_name=a.district_name)}C(Object(d.a)(y)),re(y),oe()}(t,e)},children:[Object(h.jsx)("option",{children:"Select District"}),e.districtList&&e.districtList.map((function(e){return Object(h.jsx)("option",{value:e.district_id,children:e.district_name},"district-".concat(e.district_id))}))]})]},"".concat(e.id,"-").concat(e.district,"-").concat(t,"-ig"))]},"".concat(e.id,"-").concat(e.district,"-").concat(t,"-main"))})),Object(h.jsxs)("div",{className:"col-md-4 col-sm-6",children:[Object(h.jsxs)("div",{className:"input-group input-group-sm mb-3",children:[Object(h.jsx)("span",{className:"input-group-text",id:"inputGroup-sizing-sm-dt",children:"Date"}),Object(h.jsxs)("div",{className:"form-control","aria-describedby":"inputGroup-sizing-sm-dt","aria-label":".district-select-sm example",children:[Object(h.jsx)(m.a,{selected:w,onChange:function(e){D(e),oe()},dateFormat:"dd-MM-yyyy"}),Object(h.jsxs)("span",{className:"float-right",children:[" to ",Object(h.jsx)("small",{children:le(new Date(w).addDays(5))})]})]})]}),Object(h.jsxs)("div",{className:"input-group input-group-sm mb-3",children:[Object(h.jsx)("span",{className:"input-group-text mr-20",id:"inputGroup-sizing-sm-s-email",children:"Age Limit"}),Object(h.jsxs)("div",{className:"form-check age-limit-chkbox form-check-inline ml-10",children:[Object(h.jsx)("input",{className:"form-check-input",type:"checkbox",id:"inlineCheckbox1",checked:J,value:J,onChange:function(e){q(e.target.checked),l(p,e.target.checked),oe()}}),Object(h.jsx)("label",{className:"form-check-label",htmlFor:"inlineCheckbox1",children:"18+"})]}),Object(h.jsxs)("div",{className:"form-check form-check-inline age-limit-chkbox",children:[Object(h.jsx)("input",{className:"form-check-input",type:"checkbox",id:"inlineCheckbox2",checked:U,value:U,onChange:function(e){P(e.target.checked),l(O,e.target.checked),oe()}}),Object(h.jsx)("label",{className:"form-check-label",htmlFor:"inlineCheckbox2",children:"45+"})]})]}),Object(h.jsxs)("div",{className:"input-group input-group-sm mb-3",children:[Object(h.jsx)("span",{className:"input-group-text mr-20",id:"inputGroup-sizing-sm-s-email",children:"Dose"}),Object(h.jsxs)("div",{className:"form-check age-limit-chkbox form-check-inline ml-10",children:[Object(h.jsx)("input",{className:"form-check-input",type:"checkbox",id:"dose1",checked:Q,value:Q,onChange:function(e){W(e.target.checked),l(f,e.target.checked),oe()}}),Object(h.jsx)("label",{className:"form-check-label",htmlFor:"dose1",children:"First"})]}),Object(h.jsxs)("div",{className:"form-check form-check-inline age-limit-chkbox",children:[Object(h.jsx)("input",{className:"form-check-input",type:"checkbox",id:"dose2",checked:ee,value:ee,onChange:function(e){te(e.target.checked),l(x,e.target.checked),oe()}}),Object(h.jsx)("label",{className:"form-check-label",htmlFor:"dose2",children:"Second"})]})]}),Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)("div",{className:"col-md-6 col-sm-12",children:Object(h.jsxs)("div",{className:"form-check",children:[Object(h.jsx)("input",{className:"form-check-input",type:"checkbox",value:"",id:"flexCheckChecked",checked:A,onChange:function(e){var t=e.target.checked;l(i,t),G((function(){return t}))}}),Object(h.jsx)("label",{className:"form-check-label",htmlFor:"flexCheckChecked",children:"Auto Refresh"})]})}),Object(h.jsx)("div",{className:"col-md-6 col-sm-12",children:Object(h.jsxs)("div",{className:"input-group input-group-sm mb-3",children:[Object(h.jsx)("span",{className:"input-group-text",id:"inputGroup-sizing-sm-s-interval",children:"Interval"}),Object(h.jsxs)("select",{className:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm-interval",value:M||"",onChange:function(e){var t=e.target.value;l(s,t),T((function(){return t})),window.location.reload()},disabled:!A,children:[Object(h.jsx)("option",{children:"Select Interval"}),a.map((function(e){return Object(h.jsx)("option",{value:e.value,children:e.label},"int-".concat(e.value))}))]})]})})]})]}),Object(h.jsxs)("div",{className:"col-md-2 col-sm-6",children:[Object(h.jsx)("button",{className:"btn btn-sm btn-primary btn-block",onClick:oe,children:"Search"}),A&&Object(h.jsx)("span",{children:Object(h.jsxs)("small",{children:["Auto-Refreshing in ",ae]})})]})]},"result-list"),Object(h.jsx)("div",{className:"row d-md-block d-lg-block d-sm-none d-xs-none d-none",children:(y||[]).map((function(e,t){var c=0;return Object(h.jsxs)("div",{className:"col-md-12 slot-result-wrapper",children:[Object(h.jsxs)("h4",{children:[e.state_name," (",e.district_name,")",e.totalRecords>0&&Object(h.jsxs)("small",{className:"float-right record-count",children:[e.totalRecords," records"]})]}),e.isLoading&&Object(h.jsx)("div",{className:"loader-img",children:me()}),!e.isLoading&&Object(h.jsxs)("table",{className:"table table-dark table-striped table-sm table-hover table-slot-result",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"#"}),Object(h.jsx)("th",{children:"Fee Type"}),Object(h.jsx)("th",{children:"Fees"}),Object(h.jsx)("th",{children:"Vaccine"}),Object(h.jsx)("th",{children:"Age Limit"}),Object(h.jsx)("th",{children:"Dose 1"}),Object(h.jsx)("th",{children:"Dose 2"}),Object(h.jsx)("th",{children:"Date"}),Object(h.jsx)("th",{children:"Address"})]})}),Object(h.jsxs)("tbody",{children:[0===(e.availableSlots||[]).length&&Object(h.jsx)("tr",{children:Object(h.jsx)("td",{colSpan:"10",className:"no-record",children:"No slots found!"})}),(e.availableSlots||[]).map((function(e){return(e.sessions||[]).map((function(t,n){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:++c}),Object(h.jsx)("td",{children:e.center.fee_type}),Object(h.jsx)("td",{children:e.center.vaccine_fees?"".concat(e.center.vaccine_fees[0].fee," (").concat(e.center.vaccine_fees[0].vaccine,")"):"0"}),Object(h.jsx)("td",{children:t.vaccine}),Object(h.jsx)("td",{children:t.min_age_limit}),Object(h.jsx)("td",{children:t.available_capacity_dose1}),Object(h.jsx)("td",{children:t.available_capacity_dose2}),Object(h.jsx)("td",{children:t.date}),Object(h.jsxs)("td",{children:[e.center.name,", ",e.center.address]})]},t.session_id)}))}))]})]})]},"".concat(e.center_id,"-").concat(t))}))}),Object(h.jsx)("div",{className:"row d-lg-none d-md-none d-sm-block d-xs-block",children:(y||[]).map((function(e){return Object(h.jsxs)("div",{className:"col-md-12 slot-result-wrapper",children:[Object(h.jsxs)("h4",{children:[e.state_name," (",e.district_name,")",e.totalRecords>0&&Object(h.jsxs)("small",{className:"float-right record-count",children:[e.totalRecords," records"]})]}),e.isLoading&&Object(h.jsx)("div",{className:"loader-img",children:me()}),!e.isLoading&&Object(h.jsxs)(h.Fragment,{children:[0===(e.availableSlots||[]).length&&Object(h.jsx)("div",{className:"no-record",children:"No slots found!"}),Object(h.jsx)("div",{className:"list-group",children:(e.availableSlots||[]).map((function(e){return(e.sessions||[]).map((function(t,c){return Object(h.jsxs)("a",{href:"#",onClick:function(e){return e.preventDefault(),!1},className:"list-group-item list-group-item-action","aria-current":"true",children:[Object(h.jsxs)("div",{className:"d-flex w-100 justify-content-between",children:[Object(h.jsxs)("h5",{className:"mb-1",children:["Age Limit: ",t.min_age_limit,"Free"!=e.center.fee_type&&Object(h.jsx)(h.Fragment,{children:e.center.vaccine_fees?", Rs. ".concat(e.center.vaccine_fees[0].fee," (").concat(e.center.vaccine_fees[0].vaccine,")"):""})]}),Object(h.jsx)("small",{children:Object(h.jsx)("span",{className:"badge ".concat("Free"===e.center.fee_type?"bg-primary":"bg-info"),children:e.center.fee_type})})]}),Object(h.jsxs)("p",{className:"mb-1",children:["First Dose: ",Object(h.jsx)("b",{children:t.available_capacity_dose1}),","," ","Second Dose: ",Object(h.jsx)("b",{children:t.available_capacity_dose2}),","]}),Object(h.jsx)("p",{className:"mb-2",children:Object(h.jsxs)("small",{children:[e.center.name,", ",e.center.address]})}),Object(h.jsxs)("p",{className:"mb-0",children:[Object(h.jsx)("small",{children:Object(h.jsx)("span",{className:"badge bg-secondary",children:t.vaccine})}),Object(h.jsx)("small",{children:Object(h.jsx)("span",{className:"badge bg-secondary ml-10",children:t.date})})]})]},"a-".concat(t.session_id))}))}))})]})]},"".concat(e.center_id,"-mob"))}))})]})},O=c(30),f=c(48);var x=function(e){var t=e.onHandleSubmit,c=Object(n.useState)(!1),a=Object(r.a)(c,2),s=a[0],i=a[1],l=Object(n.useState)({secretCode:null,secretKey:null}),o=Object(r.a)(l,2),d=o[0],b=o[1],j=function(e){var t=e.target,c=t.id,n=t.value;b((function(e){return Object(f.a)(Object(f.a)({},e),{},Object(O.a)({},c,n))}))};return Object(h.jsxs)("div",{className:"login-wrapper",children:[Object(h.jsxs)("div",{className:"mb-3",children:[Object(h.jsx)("label",{htmlFor:"secretCode",className:"form-label",children:"Code"}),Object(h.jsx)("input",{type:"password",className:"form-control",id:"secretCode",placeholder:"Enter code",onChange:j})]}),Object(h.jsxs)("div",{className:"mb-3",children:[Object(h.jsx)("label",{htmlFor:"secretKey",className:"form-label",children:"Secret Key"}),Object(h.jsx)("input",{type:"password",className:"form-control",id:"secretKey",placeholder:"Enter secret key",onChange:j})]}),s&&Object(h.jsx)("div",{className:"text-danger",children:"Invalid code and key. Please try with valid credentials. "}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{type:"button",className:"btn btn-primary btn-block",disabled:!d.secretCode||!d.secretKey,onClick:function(){i(!1);var e=d.secretCode,c=d.secretKey;if(!e||!c)return!1;"I4096"===c&&"4096"===e?t&&t(!0):i(!0)},children:"Submit"})]})};var v=function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),c=t[0],a=t[1];return Object(n.useEffect)((function(){var e=o("ISLG",!1);a(e)}),[]),Object(n.useEffect)((function(){}),[c]),Object(h.jsx)("div",{className:"row row-home",children:Object(h.jsx)("div",{className:"col-md-12",children:c?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("figure",{className:"text-center fig-app",children:[Object(h.jsxs)("blockquote",{className:"blockquote",children:[Object(h.jsx)("p",{children:"Vaccine Slot Finder."}),Object(h.jsx)("button",{className:"btn btn-sm btn-danger btn-logout",onClick:function(){var e;e="ISLG",localStorage.removeItem(e),window.location.reload()},children:"Log Out"})]}),Object(h.jsx)("figcaption",{className:"blockquote-footer",children:Object(h.jsx)("cite",{title:"Source Title",children:"Find slots at multiple locations together"})})]}),Object(h.jsx)(p,{})]}):Object(h.jsx)(x,{onHandleSubmit:function(e){a(e),l("ISLG",e)}})})})};var g=function(){return Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(v,{})})};i.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(g,{})}),document.getElementById("root"))},74:function(e,t,c){},75:function(e,t,c){},95:function(e,t,c){}},[[157,1,2]]]);
//# sourceMappingURL=main.45a22628.chunk.js.map