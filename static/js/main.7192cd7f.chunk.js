(this["webpackJsonpfmc-ranks"]=this["webpackJsonpfmc-ranks"]||[]).push([[0],{53:function(e,t,a){e.exports=a(85)},58:function(e,t,a){},59:function(e,t,a){},77:function(e,t,a){e.exports=a.p+"static/media/logo.b43c69b5.svg"},85:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(26),l=a.n(c),s=(a(58),a(59),a(8)),o=a(1),i=a(2),m=a(5),u=a(6),p=function(e){var t=new URL("https://scramble-web-api.herokuapp.com/scramble/333fm");return t.searchParams.append("numberOfScrambles",e),fetch(t.href)},h=(a(60),function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={copiedToClipboardIndex:null,image3d:!1},e.setCopiedToClipboard=function(t){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{copiedToClipboardIndex:t}));var a=document.createElement("textarea");document.body.appendChild(a),a.value=t+1+". "+e.props.scrambles[t],a.select(),document.execCommand("copy"),document.body.removeChild(a)},e.handleImage3d=function(){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{image3d:!e.state.image3d}))},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return this.props.scrambles?r.a.createElement(r.a.Fragment,null,this.props.scrambles.length>0&&r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-6 text-left text-muted"},"You can click to copy"),r.a.createElement("div",{className:"form-check col-6 text-right"},r.a.createElement("input",{type:"checkbox",className:"form-check-input",value:this.state.image3d,onClick:this.handleImage3d,id:"image3dcheck"}),r.a.createElement("label",{className:"form-check-label",htmlFor:"image3dcheck"},"3D image"))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("table",{className:"table table-condensed"},r.a.createElement("tbody",null,this.props.scrambles.map((function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",{className:"align-middle",onClick:function(t){return e.setCopiedToClipboard(a)}},r.a.createElement("div",{className:"row text-center"},"".concat(a+1,". ").concat(t)),r.a.createElement("div",{className:"row text-right text-muted"},"\xa0",e.state.copiedToClipboardIndex===a?"Copied":"")),r.a.createElement("td",{className:"text-left"},r.a.createElement("scramble-display",{event:"333",scramble:t,visualization:e.state.image3d?"3D":"2D"})))}))))))):null}}]),a}(n.Component)),d=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={scrambles:[],numberOfScrambles:3,loading:!1,error:"",image3d:!1,copiedToClipboardIndex:null},e.handleNumberOfScramblesChange=function(t){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{numberOfScrambles:t.target.value}))},e.handleClick=function(t){t.preventDefault(),e.setLoading(!0),p(e.state.numberOfScrambles).then((function(e){return e.json()})).then((function(t){return e.setState(Object(s.a)(Object(s.a)({},e.state),{},{scrambles:t.scrambles,loading:!1,error:"",copiedToClipboardIndex:null}))})).catch((function(t){console.log(t),e.setLoading(!1),e.setError("Error while generating scrambles.")}))},e.setLoading=function(t){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{loading:t}))},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"Generate new Scrambles"))),r.a.createElement("form",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-6"},r.a.createElement("div",{className:"input-group mb-3"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},"Number of Scrambles")),r.a.createElement("input",{type:"number",className:"form-control",required:!0,value:this.state.numberOfScrambles,onChange:function(t){return e.handleNumberOfScramblesChange(t)},min:1})),r.a.createElement("div",{className:"btn-group m-2",role:"group"},r.a.createElement("button",{type:"submit",className:"btn btn-group btn-primary",onClick:this.handleClick},"Generate Scrambles")))),this.state.loading&&r.a.createElement("div",{className:"row m-3"},r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"spinner-border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")))),!!this.state.error&&r.a.createElement("div",{className:"row m-3"},r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"bg-danger text-white"},r.a.createElement("span",null,this.state.error)))),r.a.createElement(h,{scrambles:this.state.scrambles}))}}]),a}(n.Component),b=a(17);function g(e,t){if(0===e.length)return 1/0;var a=Object(b.a)(e);a.sort();for(var n=0,r=t;r<a.length-t;r++){if(isNaN(a[r]))return 1/0;n+=Number(a[r])}return n/(a.length-2*t)}function f(e,t){for(var a=[],n=e.split(/[ ,=()]+/),r=0;r<n.length;r++){var c=n[r];if(v(c)?a.push(c):a=[],a.length===t)return a}return a}function E(e,t){return f(e,t).length===t}function v(e){return!!function(e){return(""+e).match(/[0-9]+/)}(e)||("DNF"===e.toUpperCase()||"DNS"===e.toUpperCase())}function N(e){return isNaN(e)?"DNF"===e.toUpperCase()?"DNF":"DNS"===e.toUpperCase()?"DNS":void 0:isFinite(e)?e.toFixed(2):"DNF"}var k=function e(t,a,n){Object(o.a)(this,e),this.avg=g(t,n),this.single=function(e){for(var t=1/0,a=0;a<e.length;a++)!isNaN(e[a])&&Number(e[a])<t&&(t=Number(e[a]));return t}(t),this.results=t,this.name=a};function O(e,t){return e.avg<t.avg?-1:e.avg>t.avg?1:e.single<t.single?-1:e.single>t.single?1:0}var j=[{fontWeight:"bold",backgroundColor:"rgb(255, 204, 0)"},{fontWeight:"bold",backgroundColor:"rgb(180, 180, 180)"},{fontWeight:"bold",backgroundColor:"rgb(230, 77, 0)"}],C={backgroundColor:"rgb(57, 181, 90)"},y={backgroundColor:"rgb(230, 0, 0)"},w={backgroundColor:"rgb(0, 138, 230)"},x=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=this,t=this.props.trim,a=this.props.data.filter((function(t){return E(t,e.props.attempts)})).map((function(a){var n=function(e){for(var t=[],a=e.split(/[ ,=]+/),n=0;n<a.length;n++){var r=a[n];if(v(r))break;t.push(r)}return t.join(" ")}(a),r=f(a,e.props.attempts);return new k(r,n,t)})).sort(O);if(0===a.length)return null;for(var n=[],c=function(e){n.push(Object(b.a)(new Set(a.map((function(t){return t.results[e]})))).filter((function(e){return!isNaN(e)})).sort())},l=0;l<this.props.attempts;l++)c(l);var s=n.map((function(e){return e[0]})),o=g(s,t),i=Object(b.a)(new Set(a.map((function(e){return e.avg})))).filter((function(e){return isFinite(e)})).sort(),m=50/(this.props.attempts+1),u={width:"".concat(m/this.props.columns,"%")},p={width:"".concat(10/this.props.columns,"%")},h={width:"".concat(40/this.props.columns,"%")},d=Math.ceil(a.length/this.props.columns),x=Object(b.a)(s).sort(),S=[].concat(Object(b.a)(x.slice(0,t)),Object(b.a)(x.slice(x.length-t,x.length)));console.log(S);var L=r.a.createElement("tfoot",null,r.a.createElement("tr",{style:j[0]},1===this.props.columns&&r.a.createElement("th",null),r.a.createElement("th",null,"Woaj"),s.map((function(e,t){var a=!1,n=S.indexOf(e);n>=0&&(a=!0,S.splice(n,1));var c=e||"-";return r.a.createElement("th",{key:t},a?"(".concat(c,")"):c)})),r.a.createElement("th",{style:j[0]},N(o)))),D="table table-condensed table-bordered m-0 p-0";return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",{className:D},r.a.createElement("thead",{className:"bg-dark text-white"},r.a.createElement("tr",null,Array.from({length:this.props.columns}).map((function(a,n){return r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("th",{style:p},"Pos"),r.a.createElement("th",{style:h},"Name"),Object(b.a)(Array.apply(null,{length:e.props.attempts})).map((function(e,t){return r.a.createElement("th",{key:t,style:u},"R".concat(t+1))})),r.a.createElement("th",{style:u},0===t?"Mean":"Avg"))})))),r.a.createElement("tbody",null,Array.from({length:d}).map((function(c,l){return r.a.createElement("tr",{key:l},Array.from({length:e.props.columns}).map((function(e,c){var s=c*d+l;if(s>=a.length)return null;var o=a[s],m=Object(b.a)(o.results).sort(),u=[].concat(Object(b.a)(m.slice(0,t)),Object(b.a)(m.slice(m.length-t,m.length))),p=o.avg,h=i.indexOf(p),g={};return h<j.length&&(g=j[h]),r.a.createElement(r.a.Fragment,{key:c},r.a.createElement("th",{style:C},0===s||0!==O(a[s],a[s-1])?s+1:"-"),r.a.createElement("td",null,o.name),o.results.map((function(e,t){var a=n[t].indexOf(e),c={},l=!1,s=u.indexOf(e);return s>=0&&(l=!0,u.splice(s,1)),"DNF"===e.toUpperCase()?c=y:"DNS"===e.toUpperCase()?c=w:a<j.length&&(c=j[a]),r.a.createElement("td",{key:t,style:c},l?"(".concat(e,")"):e)})),r.a.createElement("td",{style:g},N(o.avg)))})))}))),1===this.props.columns&&L),this.props.columns>1&&r.a.createElement("table",{className:D},L))}}]),a}(n.Component),S=function(e){return Math.max(0,Math.floor((e-1)/2))},L=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={attempts:3,columns:1,trim:0,data:[],content:""},e.handleAttemptsChange=function(t){var a=Number(t.target.value);e.setState(Object(s.a)(Object(s.a)({},e.state),{},{attempts:a,trim:Math.min(e.state.trim,S(a))}))},e.handleContentChange=function(t){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{content:t.target.value}))},e.handleShrinkData=function(){var t=[];e.state.content.split("\n").forEach((function(a){E(a,e.state.attempts)&&t.push(a.trim())})),e.setState(Object(s.a)(Object(s.a)({},e.state),{},{content:t.join("\n")}))},e.handleGenerate=function(t){t.preventDefault(),e.handleShrinkData(),e.setState(Object(s.a)(Object(s.a)({},e.state),{},{data:e.state.content.split("\n")}))},e.handleReset=function(){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{content:""}))},e.handleColumnsChange=function(t){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{columns:Number(t.target.value)}))},e.handleTrimChange=function(t){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{trim:Number(t.target.value)}))},e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"Generate Rank"))),r.a.createElement("form",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"input-group"},r.a.createElement("textarea",{className:"form-control",value:this.state.content,onChange:this.handleContentChange,placeholder:"Raw content",required:!0,rows:"8"})))),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-sm-10"},r.a.createElement("div",{className:"btn-group m-2",role:"group"},r.a.createElement("button",{type:"submit",className:"btn btn-group btn-success",onClick:this.handleGenerate},"Generate"),r.a.createElement("button",{type:"button",className:"btn btn-group btn-primary",onClick:this.handleShrinkData},"Shrink Data"),r.a.createElement("button",{type:"reset",className:"btn btn-group btn-warning",onClick:this.handleReset},"Reset"))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"input-group mb-3"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},"Attempts")),r.a.createElement("input",{type:"number",className:"form-control",required:!0,value:this.state.attempts,onChange:this.handleAttemptsChange,min:1}),r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},"Columns")),r.a.createElement("input",{type:"number",className:"form-control",required:!0,value:this.state.columns,onChange:this.handleColumnsChange,min:1}),r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},"Trim")),r.a.createElement("input",{type:"number",className:"form-control",required:!0,value:this.state.trim,onChange:this.handleTrimChange,min:0,max:S(this.state.attempts)}))))),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-12"},r.a.createElement(x,{attempts:this.state.attempts,data:this.state.data,columns:this.state.columns,trim:this.state.trim}))))}}]),a}(n.Component),D=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement(L,null))),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement(d,null))))},A=a(90),F=a(91),I=function(e){return r.a.createElement(A.a,{bg:"primary",expand:"lg",variant:"dark",fixedTop:!0},r.a.createElement(A.a.Brand,{href:e.baseLink},r.a.createElement("img",{src:a(77),width:"30",height:"30",className:"d-inline-block align-top text-white",alt:"Logo"})),r.a.createElement(A.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(A.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(F.a,{className:"mr-auto"},r.a.createElement(F.a.Link,{className:"text-white",href:e.rankLink},"Rank"),r.a.createElement(F.a.Link,{className:"text-white",href:e.scrambleLink},"Scramble"),r.a.createElement(F.a.Link,{className:"text-white",href:e.scrambleImageLink},"Image"),r.a.createElement(F.a.Link,{className:"text-white",href:e.aboutLink},"About"))))},T=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"About"))),r.a.createElement("div",{className:"text-justify"},r.a.createElement("p",null,"This project is open source and you can contribute"," ",r.a.createElement("a",{href:"https://github.com/campos20/fmc-ranks/"},"here"),"."),r.a.createElement("p",null,"At first, this was created to generate FMC ranks only, then it slowly became a multi-purpose FMC project")))},M=function(e){if(!e)return!1;if(0===e.length||e.length>3)return!1;if(1===e.length&&!R(e))return!1;if(2===e.length){if(!R(e[0]))return!1;if(!"'2".includes(e[1])&&"w"!==e[1])return!1}if(3===e.length){if("w"!==e[1])return!1;if(!"'2".includes(e[2]))return!1;if(!R(e[0]))return!1}return!0},R=function(e){return"UFRDLB".includes(e)||"xyz".includes(e)||"MSE".includes(e)},G=function(e){return e.trim().split(" ").map(M).reduce((function(e,t){return e&&t}),!0)},U=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={content:"",validScrambles:[]},e.handleContentChange=function(t){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{content:t.target.value}))},e.handleClick=function(){var t=e.state.content.split("\n").filter(G);e.setState(Object(s.a)(Object(s.a)({},e.state),{},{validScrambles:t}))},e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",{className:"p-2"},"Generate Scramble Images"))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"input-group"},r.a.createElement("textarea",{className:"form-control",value:this.state.content,onChange:this.handleContentChange,placeholder:"Place scrambles 1 each line",required:!0,rows:"8"})))),r.a.createElement("div",{className:"btn-group m-2",role:"group"},r.a.createElement("button",{className:"btn btn-group btn-primary",onClick:this.handleClick},"Generate Images")),r.a.createElement(h,{scrambles:this.state.validScrambles}))}}]),a}(n.Component),q=a(51),W=a(12);var B=function(){return r.a.createElement(q.a,{basename:"/"},r.a.createElement("div",{className:"App"},r.a.createElement(I,{baseLink:"/",rankLink:"/rank",scrambleLink:"/scramble",scrambleImageLink:"/scramble-image",aboutLink:"/about"}),r.a.createElement(W.c,null,r.a.createElement(W.a,{exact:!0,path:"/",component:D}),r.a.createElement(W.a,{path:"/rank",component:L}),r.a.createElement(W.a,{path:"/scramble",component:d}),r.a.createElement(W.a,{path:"/scramble-image",component:U}),r.a.createElement(W.a,{path:"/about",component:T}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(84);l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[53,1,2]]]);
//# sourceMappingURL=main.7192cd7f.chunk.js.map