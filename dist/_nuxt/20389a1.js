/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{394:function(t,e,r){var n,o;!function(c){if(void 0===(o="function"==typeof(n=c)?n.call(e,r,e,t):n)||(t.exports=o),!0,t.exports=c(),!!0){var l=window.Cookies,d=window.Cookies=c();d.noConflict=function(){return window.Cookies=l,d}}}((function(){function t(){for(var i=0,t={};i<arguments.length;i++){var e=arguments[i];for(var r in e)t[r]=e[r]}return t}function e(s){return s.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function r(n){function o(){}function c(e,r,c){if("undefined"!=typeof document){"number"==typeof(c=t({path:"/"},o.defaults,c)).expires&&(c.expires=new Date(1*new Date+864e5*c.expires)),c.expires=c.expires?c.expires.toUTCString():"";try{var l=JSON.stringify(r);/^[\{\[]/.test(l)&&(r=l)}catch(t){}r=n.write?n.write(r,e):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var d="";for(var f in c)c[f]&&(d+="; "+f,!0!==c[f]&&(d+="="+c[f].split(";")[0]));return document.cookie=e+"="+r+d}}function l(t,r){if("undefined"!=typeof document){for(var o={},c=document.cookie?document.cookie.split("; "):[],i=0;i<c.length;i++){var l=c[i].split("="),d=l.slice(1).join("=");r||'"'!==d.charAt(0)||(d=d.slice(1,-1));try{var f=e(l[0]);if(d=(n.read||n)(d,f)||e(d),r)try{d=JSON.parse(d)}catch(t){}if(o[f]=d,t===f)break}catch(t){}}return t?o[t]:o}}return o.set=c,o.get=function(t){return l(t,!1)},o.getJSON=function(t){return l(t,!0)},o.remove=function(e,r){c(e,"",t(r,{expires:-1}))},o.defaults={},o.withConverter=r,o}((function(){}))}))},398:function(t,e,r){"use strict";r(10),r(7),r(109),r(8),r(46),r(13),r(14),r(11),r(166),r(59),r(9),r(47);var n=r(2),o=r(6),c=r(84),l=r(115);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(r.valid=e(input)))})):r.valid=e(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},452:function(t,e,r){"use strict";r.r(e);r(47),r(91);var n=r(24),o=r(394),c={layout:"auth",middleware:"notAuthenticated",data:function(){return{valid:!0,show:!1,email:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+\..+/.test(t)||"E-mail must be valid"}],password:"",passwordRules:[function(t){return!!t||"Password is required"},function(t){return t&&t.length<=15||"Password must be less than 15 characters"}]}},methods:{postLogin:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("login"),setTimeout((function(){var e={accessToken:"someStringGotFromApiServiceWithAjax"};t.$store.commit("setAuth",e),o.set("auth",e),t.$router.push("/")}),1e3);case 2:case"end":return e.stop()}}),e)})))()}}},l=r(60),d=r(79),f=r.n(d),h=r(348),m=r(375),v=r(361),w=r(398),y=r(444),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticClass:"spacing-playground pa-2",attrs:{fluid:""}},[r("v-card",{staticClass:"spacing-playground pa-5 mx-auto my-12",attrs:{elevation:"5","max-width":"650"}},[r("h1",[t._v("Login")]),t._v(" "),[r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("v-text-field",{attrs:{rules:t.emailRules,label:"E-mail",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),r("v-text-field",{attrs:{"append-icon":t.show?"mdi-eye":"mdi-eye-off",rules:t.passwordRules,type:t.show?"text":"password",name:"input-10-1",label:"Password",hint:"At least 8 characters",counter:""},on:{"click:append":function(e){t.show=!t.show}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),r("v-btn",{staticClass:"mr-4",attrs:{disabled:!t.valid,color:"primary"},on:{click:t.postLogin}},[t._v("\n          Login\n          ")])],1)]],2)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VBtn:h.a,VCard:m.a,VContainer:v.a,VForm:w.a,VTextField:y.a})}}]);