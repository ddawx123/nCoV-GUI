webpackJsonp([5],{21:function(e,t,n){var a=n(8)(n(28),n(37),null,null);a.options.__file="E:\\NodeJS\\2019nCoV\\src\\views\\telegram.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] telegram.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},28:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{data:[],timer:null,canUpdate:!0}},methods:{filterMessage:function(e){return!/^pinned/.test(e.trim())},removeBrTag:function(e){return/<br><br>$/.test(e)?e.replace(/<br><br>$/,""):e},blend_substr:function(e,t){var n=/[^\x00-\xff]/g;if(e.replace(n,"mm").length<=t)return e;for(var a=Math.floor(t/2),r=a;r<e.length;r++)if(e.substr(0,r).replace(n,"mm").length>=t)return e.substr(0,r)+"...";return e},getData:function(){this.$data.canUpdate=!1;var e=this.$Message.loading({content:"正在获取数据，请稍事等待",duration:0}),t=this,n=new XMLHttpRequest;n.open("GET","https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/?name=tg-channel&rnd="+btoa(Math.random())+"&client_time="+(new Date).getTime(),!0),n.onreadystatechange=function(){if(4==n.readyState){t.$data.canUpdate=!0,setTimeout(e,800);try{var a=JSON.parse(n.responseText);t.$data.data=a.entry}catch(e){t.$Modal.warning({title:"【系统异常】糟糕，翻车了",content:e.message})}}},n.send()}},mounted:function(){var e=this;this.getData(),this.$data.timer=window.setInterval(function(){if(e.$data.canUpdate){e.$data.canUpdate=!1;var t=e.$Message.loading({content:"正在获取数据，请稍事等待",duration:0}),n=e,a=new XMLHttpRequest;a.open("GET","https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/?name=tg-channel&rnd="+btoa(Math.random())+"&client_time="+(new Date).getTime(),!0),a.onreadystatechange=function(){if(4==a.readyState){n.$data.canUpdate=!0,setTimeout(t,800);try{var e=JSON.parse(a.responseText);n.$data.data=e.entry}catch(e){window.clearInterval(timer),n.$Modal.warning({title:"【系统异常】糟糕，翻车了",content:e.message})}}},a.send()}},3e4)},beforeRouteLeave:function(e,t,n){window.clearInterval(this.$data.timer),console.log("timer closed."),this.$data.canUpdate?n():(window.location.hash=t.fullPath,this.$Modal.warning({title:"数据仍在加载",content:"我们抱歉的通知您，由于数据仍处于加载状态，页面暂时无法完成切换。请等候本次数据加载完成后再次切换页面，由此给您带来的不便敬请谅解！"}))}}},37:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.data,function(t){return n("Card",{key:t.title},[e.filterMessage(t.title)?n("p",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.title))]):e._e(),e._v(" "),n("p",{domProps:{innerHTML:e._s(e.removeBrTag(t.content))}})])}))},staticRenderFns:[]},e.exports.render._withStripped=!0}});