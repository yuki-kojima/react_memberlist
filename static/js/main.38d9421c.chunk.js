(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){},25:function(e,t,a){e.exports=a(58)},31:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(23),i=a.n(s),l=(a(31),a(3)),o=a(4),c=a(6),m=a(5),u=a(7),d=a(61),h=a(60),p=a(11),f=a.n(p),v=(a(52),a(12),a(59)),b=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"\u30cb\u30b8\u30dc\u30c3\u30af\u30b9 \u793e\u54e1\u540d\u7c3f"),r.a.createElement("nav",{className:"nav"},r.a.createElement("h2",{className:"nav__title"},"\u30e1\u30cb\u30e5\u30fc"),r.a.createElement("ul",{className:"nav__list"},r.a.createElement("li",null,r.a.createElement(v.a,{to:"/search",className:"nav__item"},"\u793e\u54e1\u691c\u7d22")),r.a.createElement("li",null,r.a.createElement(v.a,{to:"/game",className:"nav__item"},"\u795e\u7d4c\u8870\u5f31")))))}}]),t}(n.Component),E=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e,t,a,n=this,s=!0,i=!0;return this.props.userList&&(e=this.props.userList.item_list,1===(t=this.props.userList.summary.current_page)&&(i=!1),t===(a=this.props.userList.summary.total_pages)&&(s=!1)),r.a.createElement("div",{className:"result-container"},this.props.userList?r.a.createElement("div",null,r.a.createElement("h2",null,"\u793e\u54e1\u4e00\u89a7"),r.a.createElement("div",null,r.a.createElement("ul",{className:"l-memberlist"},e.map(function(e,t){return r.a.createElement("li",{key:e.user_id},r.a.createElement(v.a,{to:"/user/"+e.user_id,className:"memberlist"},r.a.createElement("div",{className:"memberlist__img"},r.a.createElement("img",{src:e.photo_url,alt:e.user_name+"\u306e\u5199\u771f"})),r.a.createElement("div",{className:"memberlist__name"},e.user_name)))})),r.a.createElement("div",{className:"pager"},r.a.createElement("button",{type:"button",className:"btn-pager "+(i?"":"is-hidden"),onClick:function(e){return n.props.loadUserInfo(e)},"data-page":parseInt(t,10)-1,"data-id":this.props.departmentID,"data-query":this.props.query}," \u524d\u3078"),r.a.createElement("div",{className:"pager__page"},t,"/",a,"\u30da\u30fc\u30b8"),r.a.createElement("button",{type:"button",className:"btn-pager "+(s?"":"is-hidden"),onClick:function(e){return n.props.loadUserInfo(e)},"data-page":parseInt(t,10)+1,"data-id":this.props.departmentID,"data-query":this.props.query},"\u6b21\u3078")))):r.a.createElement("p",{className:"result-message"},"\u691c\u7d22\u3057\u3066\u304f\u3060\u3055\u3044"))}}]),t}(n.Component),g=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={isLogin:!1,departmentList:[],userList:null,departmentID:null,query:null,inputText:""},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.httpClient=f.a.create({baseURL:"https://kadou.i.nijibox.net/api",withCredentials:!0}),this.loadDepartments()}},{key:"commonResponseHandling",value:function(e){return console.debug(e),"200"!==e.data.code?(console.error(e.data.data),Promise.reject("API Error:"+e.data.data.message)):Promise.resolve(e.data.data)}},{key:"loadDepartments",value:function(){var e=this;return this.httpClient.get("/who/departments").then(this.commonResponseHandling).then(function(t){e.setState({departmentList:t})})}},{key:"loadUserInfo",value:function(e){var t=this,a=e.target,n={department_id:parseInt(a.getAttribute("data-id"),10)||null,page:parseInt(a.getAttribute("data-page"),10)||1,query:a.value||a.getAttribute("data-query")||""};return this.httpClient.get("/who/search/",{params:n}).then(this.commonResponseHandling).then(function(e){t.setState({userList:e,departmentID:n.department_id,query:n.query})})}},{key:"changeInputText",value:function(e){var t=e.target.value;this.setState({inputText:t})}},{key:"onClickSearh",value:function(e){0!==e.target.getAttribute("data-query").trim().length&&this.loadUserInfo(e)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"\u793e\u54e1\u691c\u7d22"),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h2",null,"\u90e8\u7f72\u304b\u3089\u691c\u7d22\u3059\u308b"),r.a.createElement("div",{className:"l-departmentlist"},r.a.createElement("ul",{className:"departmentlist"},this.state.departmentList.map(function(t,a){return r.a.createElement("li",{key:a},r.a.createElement("button",{onClick:function(t){return e.loadUserInfo(t)},"data-id":t.department_id,type:"button",className:"departmentlist__item"},t.department_name))})))),r.a.createElement("div",null,r.a.createElement("h2",null,"\u30d5\u30ea\u30fc\u30ef\u30fc\u30c9\u3067\u691c\u7d22\u3059\u308b"),r.a.createElement("div",{className:"l-freeword"},r.a.createElement("div",{className:"freeword"},r.a.createElement("input",{className:"freeword__input",type:"text",onChange:function(t){return e.changeInputText(t)},placeholder:"\u30ad\u30fc\u30ef\u30fc\u30c9\u3092\u5165\u308c\u3066\u304f\u3060\u3055\u3044"}),r.a.createElement("button",{onClick:function(t){return e.onClickSearh(t)},"data-query":this.state.inputText,type:"button",className:"freeword__btn"},"\u691c\u7d22\u3059\u308b"))))),r.a.createElement("div",null,r.a.createElement(E,{userList:this.state.userList,loadUserInfo:function(t){return e.loadUserInfo(t)},departmentID:this.state.departmentID,query:this.state.query})),r.a.createElement("div",{className:"l-pager"},r.a.createElement("div",{className:"pager pager--search"},r.a.createElement(v.a,{to:"/"},"\u30c8\u30c3\u30d7\u3078\u623b\u308b"))))}}]),t}(n.Component),_=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={isLogin:!1,userInfo:null},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.httpClient=f.a.create({baseURL:"https://kadou.i.nijibox.net/api",withCredentials:!0}),this.loadUserDetail()}},{key:"commonResponseHandling",value:function(e){return console.debug(e),"200"!==e.data.code?(console.error(e.data.data),Promise.reject("API Error:"+e.data.data.message)):Promise.resolve(e.data.data)}},{key:"loadUserDetail",value:function(){var e=this,t=this.props.match.params,a=parseInt(t.id,10);return this.httpClient.get("/who/user/"+a).then(this.commonResponseHandling).then(function(t){e.setState({userInfo:t})})}},{key:"render",value:function(){return r.a.createElement("div",null,this.state.userInfo?r.a.createElement("div",null,r.a.createElement("h2",null,"\u8a73\u7d30"),r.a.createElement("div",{className:"memberinfo"},r.a.createElement("div",{className:"memberinfo__img"},r.a.createElement("img",{src:this.state.userInfo.main_photo_url,alt:this.state.userInfo.user_name+"\u306e\u5199\u771f"})),r.a.createElement("div",{className:"memberinfo__info"},r.a.createElement("div",{className:"memberinfo__info__header"},r.a.createElement("h3",{className:"memberinfo-title"},r.a.createElement("span",{className:"memberinfo-title__name"},this.state.userInfo.user_name),r.a.createElement("span",{className:"memberinfo-title__sub"},this.state.userInfo.user_kana))),r.a.createElement("div",{className:"memberinfo__info__body"},r.a.createElement("table",{className:"infotable"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",{className:"infotable__header"},"\u30cb\u30c3\u30af\u30cd\u30fc\u30e0\uff1a"),r.a.createElement("td",{className:"infotable__body"},this.state.userInfo.nickname)),r.a.createElement("tr",null,r.a.createElement("td",{className:"infotable__header"},"\u90e8\u7f72\uff1a"),r.a.createElement("td",{className:"infotable__body"},this.state.userInfo.department_name)),r.a.createElement("tr",null,r.a.createElement("td",{className:"infotable__header"},"\u5165\u793e\u65e5\uff1a"),r.a.createElement("td",{className:"infotable__body"},this.state.userInfo.enter_date)),r.a.createElement("tr",null,r.a.createElement("td",{className:"infotable__header"},"slack\u540d\uff1a"),r.a.createElement("td",{className:"infotable__body"},this.state.userInfo.slack_desplay_name)),r.a.createElement("tr",null,r.a.createElement("td",{className:"infotable__header"},"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\uff1a"),r.a.createElement("td",{className:"infotable__body"},this.state.userInfo.mail)))))))):r.a.createElement("p",null,"\u8a72\u5f53\u30e1\u30f3\u30d0\u30fc\u304c\u3044\u307e\u305b\u3093"),r.a.createElement("div",{className:"pagenav"},r.a.createElement(v.a,{to:"/search"},"\u691c\u7d22\u3078\u623b\u308b"),r.a.createElement(v.a,{to:"/"},"\u30c8\u30c3\u30d7\u3078\u623b\u308b")))}}]),t}(n.Component),k=a(15),y=a.n(k),C=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.cardList;return 0===t.length?r.a.createElement("div",{className:"l-game-text"},r.a.createElement("div",{className:"game-text"},"\u90e8\u7f72\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044")):r.a.createElement("ul",{id:"card"},t.map(function(t,a){return r.a.createElement("li",{key:a+t.user_id,"data-id":t.user_id,"data-img":t.photo_url,onClick:function(t){return e.props.handleCardClick(t)}},r.a.createElement("img",{src:"./nblogo.jpg",alt:""}))}))}}]),t}(n.Component),N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={isLogin:!1,departmentList:[],userList:null,summary:null,departmentName:"",pairNum:0,cardList:[],flgFirst:!0,firstCard:null},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.httpClient=f.a.create({baseURL:"https://kadou.i.nijibox.net/api",withCredentials:!0}),this.loadDepartments()}},{key:"commonResponseHandling",value:function(e){return console.debug(e),"200"!==e.data.code?(console.error(e.data.data),Promise.reject("API Error:"+e.data.data.message)):Promise.resolve(e.data.data)}},{key:"loadDepartments",value:function(){var e=this;return this.httpClient.get("/who/departments").then(this.commonResponseHandling).then(function(t){e.setState({departmentList:t})})}},{key:"loadUserInfo",value:function(e){var t=this,a=e.target,n=a.innerText,r={department_id:parseInt(a.getAttribute("data-id"),10)||null,page:parseInt(a.getAttribute("data-page"),10)||1};return this.httpClient.get("/who/search/",{params:r}).then(this.commonResponseHandling).then(function(e){t.setState({userList:e.item_list,summary:e.summary,departmentName:n})})}},{key:"PickRandomUserList",value:function(e,t){for(var a=e,n=[],r=[],s=a.length,i=t<s?t:s;i-- >0;){var l=Math.random()*s|0;r[i]=n[l]||a[l],--s,n[l]=n[s]||a[s]}return r}},{key:"GenerateCardList",value:function(e){for(var t=[],a=0;a<e.length;a++){var n=e[a];t.push(n,n)}return t}},{key:"ShuffleCardList",value:function(e){e.sort(function(){return Math.random()-Math.random()})}},{key:"setCardList",value:function(e){if(null!==e){var t=this.PickRandomUserList(e,5),a=this.GenerateCardList(t);this.ShuffleCardList(a),this.setState({cardList:a})}}},{key:"initGameStatus",value:function(){this.setState({pairNum:0,firstCard:null,flgFirst:!0})}},{key:"startGame",value:function(e){this.initGameStatus(),this.setCardList(e)}},{key:"changeCard",value:function(e,t,a){var n=e.find("img");n.stop().animate({left:"75"},a),n.stop().animate({width:"0",height:"150"},a,function(){t(e,a)})}},{key:"showUpside",value:function(e,t){var a=e.find("img"),n=e.data("img");a.attr("src",n),a.stop().animate({width:"150px",height:"150"},t),e.stop().animate({left:"0"},t)}},{key:"showBackside",value:function(e,t){var a=e.find("img");a.attr("src","./nblogo.jpg"),a.stop().animate({width:"150px",height:"150"},t),e.stop().animate({left:"0"},t)}},{key:"lockCard",value:function(e){e.addClass("is-locked")}},{key:"lockAllCard",value:function(){y()("#card li").addClass("is-locked")}},{key:"unlockAllCards",value:function(){y()("#card li").removeClass("is-locked")}},{key:"judgeCards",value:function(e,t){var a=this,n=this.state.pairNum,r=this.state.firstCard,s=r.data("id"),i=e.data("id"),l=this.state.cardList.length;s===i?(r.addClass("is-disabled"),e.addClass("is-disabled"),++n===l/2&&setTimeout(function(){alert("\u30b3\u30f3\u30d7\u30ea\u30fc\u30c8\uff01\uff01\uff01")},1e3),this.setState({pairNum:n})):setTimeout(function(){a.changeCard(e,a.showBackside),a.changeCard(r,a.showBackside)},1e3),this.setState({flgFirst:!0}),setTimeout(function(){a.unlockAllCards()},2*t+1e3)}},{key:"handleCardClick",value:function(e){var t=y()(e.currentTarget),a=this.state.flgFirst;this.lockCard(t),this.changeCard(t,this.showUpside,150),!0===a?this.setState({firstCard:t,flgFirst:!1}):(this.lockAllCard(),this.judgeCards(t,150))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"\u795e\u7d4c\u8870\u5f31"),r.a.createElement("div",null,r.a.createElement("h2",null,"\u90e8\u7f72\u3092\u9078\u3076"),r.a.createElement("div",null,r.a.createElement("ul",{className:"radiolist"},this.state.departmentList.map(function(t,a){return r.a.createElement("li",{key:a},r.a.createElement("input",{type:"radio",name:"department",value:"",onClick:function(t){return e.loadUserInfo(t)},"data-id":t.department_id}),t.department_name)})),r.a.createElement("div",{className:"l-btn-start"},r.a.createElement("button",{onClick:function(t){return e.startGame(e.state.userList)},type:"button",className:"btn-start"},"\u904a\u3076\uff01")))),r.a.createElement("div",null,r.a.createElement(C,{cardList:this.state.cardList,handleCardClick:function(t,a){return e.handleCardClick(t,a)},flgFirst:this.props.flgFirst})),r.a.createElement("div",{className:"l-pager"},r.a.createElement("div",{className:"pager"},r.a.createElement(v.a,{to:"/"},"\u30c8\u30c3\u30d7\u3078\u623b\u308b"))))}}]),t}(n.Component),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={isLogin:!1},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.httpClient=f.a.create({baseURL:"https://kadou.i.nijibox.net/api",withCredentials:!0}),this.loadAuth().then(function(){if(!e.state.isLogin)return Promise.resolve()}).catch(function(e){alert("API\u304c\u30a8\u30e9\u30fc\u3092\u8fd4\u3057\u307e\u3057\u305f\n\n"+e)})}},{key:"loadAuth",value:function(){var e=this;return this.httpClient.get("/auth",{params:{callback:"http://localhost:3000"}}).then(this.commonResponseHandling).then(function(t){t.is_login?e.setState({isLogin:!0}):t.auth_url&&(window.location.href=t.auth_url)})}},{key:"commonResponseHandling",value:function(e){return console.debug(e),"200"!==e.data.code?(console.error(e.data.data),Promise.reject("API Error:"+e.data.data.message)):Promise.resolve(e.data.data)}},{key:"render",value:function(){return r.a.createElement(d.a,{basename:"/react_memberlist"},r.a.createElement("div",{className:"wrap"},r.a.createElement(h.a,{exact:!0,path:"/",component:b}),r.a.createElement(h.a,{path:"/search",component:g}),r.a.createElement(h.a,{path:"/user/:id",component:_}),r.a.createElement(h.a,{path:"/game",component:N})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[25,2,1]]]);
//# sourceMappingURL=main.38d9421c.chunk.js.map