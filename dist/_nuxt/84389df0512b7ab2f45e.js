(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{301:function(t,e,r){"use strict";var n=r(302);e.a=n.a},326:function(t,e,r){"use strict";var n=r(1),o=r(0);var l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"change";return o.a.extend({name:"proxyable",model:{prop:t,event:e},props:Object(n.a)({},t,{required:!1}),data:function(){return{internalLazyValue:this[t]}},computed:{internalValue:{get:function(){return this.internalLazyValue},set:function(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:Object(n.a)({},t,(function(t){this.internalLazyValue=t}))})}();e.a=l},327:function(t,e,r){"use strict";var n=r(126);function o(){for(var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return(t=Array()).concat.apply(t,[e].concat(n))}function l(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top center 0",r=arguments.length>2?arguments[2]:void 0;return{name:t,functional:!0,props:{group:{type:Boolean,default:!1},hideOnLeave:{type:Boolean,default:!1},leaveAbsolute:{type:Boolean,default:!1},mode:{type:String,default:r},origin:{type:String,default:e}},render:function(e,r){var l="transition".concat(r.props.group?"-group":""),data={props:{name:t,mode:r.props.mode},on:{beforeEnter:function(t){t.style.transformOrigin=r.props.origin,t.style.webkitTransformOrigin=r.props.origin}}};return r.props.leaveAbsolute&&(data.on.leave=o(data.on.leave,(function(t){return t.style.position="absolute"}))),r.props.hideOnLeave&&(data.on.leave=o(data.on.leave,(function(t){return t.style.display="none"}))),e(l,Object(n.a)(r.data,data),r.children)}}}function c(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out";return{name:t,functional:!0,props:{mode:{type:String,default:r}},render:function(r,o){return r("transition",Object(n.a)(o.data,{props:{name:t},on:e}),o.children)}}}var d=r(1),v=r(2),f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e?"width":"height",n="offset".concat(Object(v.s)(r));return{beforeEnter:function(t){t._parent=t.parentNode,t._initialStyle=Object(d.a)({transition:t.style.transition,visibility:t.style.visibility,overflow:t.style.overflow},r,t.style[r])},enter:function(e){var o=e._initialStyle,l="".concat(e[n],"px");e.style.setProperty("transition","none","important"),e.style.visibility="hidden",e.style.visibility=o.visibility,e.style.overflow="hidden",e.style[r]="0",e.offsetHeight,e.style.transition=o.transition,t&&e._parent&&e._parent.classList.add(t),requestAnimationFrame((function(){e.style[r]=l}))},afterEnter:l,enterCancelled:l,leave:function(t){t._initialStyle=Object(d.a)({transition:"",visibility:"",overflow:t.style.overflow},r,t.style[r]),t.style.overflow="hidden",t.style[r]="".concat(t[n],"px"),t.offsetHeight,requestAnimationFrame((function(){return t.style[r]="0"}))},afterLeave:o,leaveCancelled:o};function o(e){t&&e._parent&&e._parent.classList.remove(t),l(e)}function l(t){var e=t._initialStyle[r];t.style.overflow=t._initialStyle.overflow,null!=e&&(t.style[r]=e),delete t._initialStyle}};r.d(e,"b",(function(){return h})),r.d(e,"c",(function(){return m})),r.d(e,"a",(function(){return y}));l("carousel-transition"),l("carousel-reverse-transition"),l("tab-transition"),l("tab-reverse-transition"),l("menu-transition"),l("fab-transition","center center","out-in"),l("dialog-transition"),l("dialog-bottom-transition");var h=l("fade-transition"),m=(l("scale-transition"),l("scroll-x-transition"),l("scroll-x-reverse-transition"),l("scroll-y-transition"),l("scroll-y-reverse-transition"),l("slide-x-transition")),y=(l("slide-x-reverse-transition"),l("slide-y-transition"),l("slide-y-reverse-transition"),c("expand-transition",f()));c("expand-x-transition",f("",!0))},334:function(t,e,r){var content=r(374);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("332e57e8",content,!0,{sourceMap:!1})},338:function(t,e,r){"use strict";r(125);var n=r(78);e.a=Object(n.a)("flex")},373:function(t,e,r){"use strict";var n=r(334);r.n(n).a},374:function(t,e,r){var n=r(11);(t.exports=n(!1)).push([t.i,'.chat-box[data-v-0517c4ab]{height:500px;width:100%;overflow:scroll}.chat-item[data-v-0517c4ab]{border:none}.chatImg[data-v-0517c4ab]{width:60px;height:60px;-webkit-border-radius:60px;-webkit-background-clip:padding-box;-moz-border-radius:60px;-moz-background-clip:padding;border-radius:60px;background-clip:padding-box;background-size:cover;background-position:50%}.chat-status[data-v-0517c4ab]{min-height:49px}.chat-status .chat-date[data-v-0517c4ab]{display:block;font-size:10px;font-style:italic;color:#999;height:15px;left:10%;right:10%}.chat-status .chat-content-center[data-v-0517c4ab]{padding:5px 10px;background-color:#e1e1f7;border-radius:6px;font-size:12px;color:#555;height:34px;left:10%;right:10%}.right-bubble[data-v-0517c4ab]{position:relative;background:#dcf8c6;border-top-left-radius:.4em;border-bottom-left-radius:.4em;border-bottom-right-radius:.4em;padding:5px 10px 10px;left:15%}.right-bubble span.msg-name[data-v-0517c4ab]{font-size:12px;font-weight:700;color:green;display:block}.right-bubble span.msg-date[data-v-0517c4ab]{font-size:10px;display:block}.right-bubble[data-v-0517c4ab]:after{content:"";position:absolute;right:0;top:0;width:0;height:0;border:27px solid transparent;border-left-color:#dcf8c6;border-right:0;border-top:0;margin-top:-.5px;margin-right:-27px}.left-bubble[data-v-0517c4ab]{position:relative;background:#efefef;border-top-right-radius:.4em;border-bottom-left-radius:.4em;border-bottom-right-radius:.4em;padding:5px 10px 10px;left:5%}.left-bubble span.msg-name[data-v-0517c4ab]{font-size:12px;font-weight:700;color:#00f;display:block}.left-bubble span.msg-date[data-v-0517c4ab]{font-size:10px;display:block}.left-bubble[data-v-0517c4ab]:after{content:"";position:absolute;left:0;top:0;width:0;height:0;border:27px solid transparent;border-right-color:#efefef;border-left:0;border-top:0;margin-top:-.5px;margin-left:-27px}footer.sticky-footer[data-v-0517c4ab]{position:fixed;bottom:0;left:0;width:100%;padding:10px;background-color:#fff;border-top:1px solid #efefef}',""])},377:function(t,e,r){var content=r(378);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("7132a15d",content,!0,{sourceMap:!1})},378:function(t,e,r){var n=r(11);(t.exports=n(!1)).push([t.i,".theme--light.v-divider{border-color:rgba(0,0,0,.12)}.theme--dark.v-divider{border-color:hsla(0,0%,100%,.12)}.v-divider{display:block;-webkit-box-flex:1;flex:1 1 0px;max-width:100%;height:0;max-height:0;border:solid;border-width:thin 0 0;-webkit-transition:inherit;transition:inherit}.v-divider--inset:not(.v-divider--vertical){max-width:calc(100% - 72px)}.v-application--is-ltr .v-divider--inset:not(.v-divider--vertical){margin-left:72px}.v-application--is-rtl .v-divider--inset:not(.v-divider--vertical){margin-right:72px}.v-divider--vertical{align-self:stretch;border:solid;border-width:0 thin 0 0;display:-webkit-inline-box;display:inline-flex;height:inherit;min-height:100%;max-height:100%;max-width:0;width:0;vertical-align:text-bottom}.v-divider--vertical.v-divider--inset{margin-top:8px;min-height:0;max-height:calc(100% - 16px)}",""])},408:function(t,e,r){"use strict";r.r(e);var n=r(17),o=(r(36),{auth:!0,data:function(){return{showCallDialog:!1,message:"",myUser:null,name:null,id:null,isLoading:!0,chats:[]}},mounted:function(){this.getMyInfo()},methods:{getMyInfo:function(){var t=this;this.$axios.get("/user/me").then((function(e){t.isLoading=!0,t.myUser=e.data,t.loadChat(),setInterval((function(){this.loadChat()}),3e3)})).catch((function(e){console.log(e),t.isLoading=!1,t.flash(e,"error")}))},goToUser:function(t,e){this.$router.push({path:"/user/"+t+"/"+e})},loadChat:function(){var t=this;this.isLoading=!0,this.$axios.get("/user/chats?page=1&limit=100").then((function(e){t.isLoading=!1;var data=e.data;null!=data?t.chats=data:console.log("no results found!")})).catch((function(e){t.isLoading=!1,console.log(e),t.$toast.error(e.response.data.error)}))},formatPhone:function(t){return t.replace(/[^0-9]/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3")},getFormattedDate:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=["January","February","March","April","May","June","July","August","September","October","November","December"],o=t.getDate(),l=n[t.getMonth()],c=t.getFullYear(),d=t.getHours(),v=t.getMinutes(),f=d>=12?"pm":"am";return d=(d%=12)||12,v<10&&(v="0".concat(v)),e?"".concat(e," at ").concat(d,":").concat(v," ").concat(f):r?"".concat(o,". ").concat(l," at ").concat(d,":").concat(v," ").concat(f):"".concat(o,". ").concat(l," ").concat(c,". at ").concat(d,":").concat(v," ").concat(f)},timeAgo:function(t){if(!t)return null;var e="object"===Object(n.a)(t)?t:new Date(1e3*t),r=new Date,o=new Date(r-864e5),l=Math.round((r-e)/1e3),c=Math.round(l/60),d=r.toDateString()===e.toDateString(),v=o.toDateString()===e.toDateString(),f=r.getFullYear()===e.getFullYear();return l<5?"now":l<60?"".concat(l," seconds ago"):l<90?"about a minute ago":c<60?"".concat(c," minutes ago"):d?this.getFormattedDate(e,"Today"):v?this.getFormattedDate(e,"Yesterday"):f?this.getFormattedDate(e,!1,!0):this.getFormattedDate(e)}}}),l=(r(373),r(21)),c=r(73),d=r.n(c),v=r(402),f=r(311),h=(r(14),r(8),r(5),r(4),r(7),r(1));r(377);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(h.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var x=r(53).a.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:y({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:y({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}}),w=r(338),_=r(179),O=r(312),k=r(344),j=r(335),L=r(348),D=r(319),V=r(119),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-flex",{staticStyle:{"max-width":"900px"},attrs:{xs12:"",sm8:"",md6:"","ma-5":""}},[r("v-layout",{attrs:{column:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",sm4:""}},[r("h2",{staticClass:"display-1"},[t._v("\n          Inbox\n          "),t.isLoading?r("span",[r("v-progress-circular",{attrs:{indeterminate:"",color:"green"}})],1):t._e()])])],1),t._v(" "),r("v-container",{attrs:{fluid:""}},[r("v-col",{attrs:{cols:12}},[t.chats.length>0?r("div",[r("v-list",{attrs:{"two-line":""}},[t._l(t.chats,(function(e){return[r("v-list-item",{key:e.message,on:{click:function(r){return t.goToUser(e.from_user_name,e.to_user_id)}}},[r("v-list-item-avatar",[r("v-img",{attrs:{src:e.from_user_pic}})],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",{domProps:{innerHTML:t._s(e.message)}}),t._v(" "),r("v-list-item-subtitle",{domProps:{innerHTML:t._s(t.timeAgo(e.created_at))}}),t._v(" "),r("v-divider")],1)],1)]}))],2)],1):t._e(),t._v(" "),t.isLoading?t._e():r("div",[t.chats.length<1?r("div",{staticClass:"text-xs-center justify-center"},[r("v-layout",{attrs:{"justify-center":""}},[r("p",{staticClass:"justify-center"},[t._v("\n                you can start by sending someone a message. your chat history\n                will appear here\n              ")])])],1):t._e()])])],1)],1)],1)}),[],!1,null,"0517c4ab",null);e.default=component.exports;d()(component,{VCol:v.a,VContainer:f.a,VDivider:x,VFlex:w.a,VImg:_.a,VLayout:O.a,VList:k.a,VListItem:j.a,VListItemAvatar:L.a,VListItemContent:D.a,VListItemSubtitle:D.b,VListItemTitle:D.c,VProgressCircular:V.a})}}]);