"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6913],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(r),m=a,g=d["".concat(s,".").concat(m)]||d[m]||u[m]||i;return r?n.createElement(g,o(o({ref:t},c),{},{components:r})):n.createElement(g,o({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4959:(e,t,r)=>{r.d(t,{Z:()=>p});var n=r(7294),a=r(9960),i=r(4477),o=r(2263),l=r(643).version.split("."),s=[l[0],l[1]].join(".");const p=function(e){var t=e.to,r=e.children,l=(0,i.E)();return(0,o.default)().siteConfig.presets[0][1].docs.disableVersioning||l.version===s?n.createElement(a.default,{to:"/api/"+t},r):n.createElement(a.default,{to:"/api/"+("current"===l.version?"next":l.version)+"/"+t},r)}},653:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=(r(4959),["components"]),l={id:"introduction",title:"Introduction",description:"Your first steps into the world of scraping with Crawlee"},s=void 0,p={unversionedId:"introduction/introduction",id:"introduction/introduction",title:"Introduction",description:"Your first steps into the world of scraping with Crawlee",source:"@site/../docs/introduction/index.mdx",sourceDirName:"introduction",slug:"/introduction/",permalink:"/docs/next/introduction/",draft:!1,tags:[],version:"current",lastUpdatedBy:"Jind\u0159ich B\xe4r",lastUpdatedAt:1670597185,formattedLastUpdatedAt:"Dec 9, 2022",frontMatter:{id:"introduction",title:"Introduction",description:"Your first steps into the world of scraping with Crawlee"},sidebar:"docs",previous:{title:"Quick Start",permalink:"/docs/next/quick-start/"},next:{title:"Setting up",permalink:"/docs/next/introduction/setting-up"}},c={},u=[{value:"What you will learn",id:"what-you-will-learn",level:2},{value:"\ud83d\udee0 Features",id:"-features",level:2},{value:"\ud83d\udc7e HTTP crawling",id:"-http-crawling",level:3},{value:"\ud83d\udcbb Real browser crawling",id:"-real-browser-crawling",level:3},{value:"Next lesson",id:"next-lesson",level:2}],d={toc:u};function m(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Crawlee covers your crawling and scraping end-to-end and helps you ",(0,i.kt)("strong",{parentName:"p"},"build reliable scrapers. Fast.")),(0,i.kt)("p",null,"Your crawlers will appear human-like and fly under the radar of modern bot protections even with the default configuration. Crawlee gives you the tools to crawl the web for links, scrape data and persistently store it in machine-readable formats, without having to worry about the technical details. And thanks to rich configuration options, you can tweak almost any aspect of Crawlee to suit your project's needs if the default settings don't cut it."),(0,i.kt)("h2",{id:"what-you-will-learn"},"What you will learn"),(0,i.kt)("p",null,"The goal of the introduction is to provide a step-by-step guide to the most important features of Crawlee. It will walk you through creating the simplest of crawlers that only prints text to console, all the way up to a full-featured scraper that collects links from a website and extracts data."),(0,i.kt)("h2",{id:"-features"},"\ud83d\udee0 Features"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Single interface for ",(0,i.kt)("strong",{parentName:"li"},"HTTP and headless browser")," crawling"),(0,i.kt)("li",{parentName:"ul"},"Persistent ",(0,i.kt)("strong",{parentName:"li"},"queue")," for URLs to crawl (breadth & depth first)"),(0,i.kt)("li",{parentName:"ul"},"Pluggable ",(0,i.kt)("strong",{parentName:"li"},"storage")," of both tabular data and files"),(0,i.kt)("li",{parentName:"ul"},"Automatic ",(0,i.kt)("strong",{parentName:"li"},"scaling")," with available system resources"),(0,i.kt)("li",{parentName:"ul"},"Integrated ",(0,i.kt)("strong",{parentName:"li"},"proxy rotation")," and session management"),(0,i.kt)("li",{parentName:"ul"},"Lifecycles customizable with ",(0,i.kt)("strong",{parentName:"li"},"hooks")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"CLI")," to bootstrap your projects"),(0,i.kt)("li",{parentName:"ul"},"Configurable ",(0,i.kt)("strong",{parentName:"li"},"routing"),", ",(0,i.kt)("strong",{parentName:"li"},"error handling")," and ",(0,i.kt)("strong",{parentName:"li"},"retries")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Dockerfiles")," ready to deploy"),(0,i.kt)("li",{parentName:"ul"},"Written in ",(0,i.kt)("strong",{parentName:"li"},"TypeScript")," with generics")),(0,i.kt)("h3",{id:"-http-crawling"},"\ud83d\udc7e HTTP crawling"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Zero config ",(0,i.kt)("strong",{parentName:"li"},"HTTP2 support"),", even for proxies"),(0,i.kt)("li",{parentName:"ul"},"Automatic generation of ",(0,i.kt)("strong",{parentName:"li"},"browser-like headers")),(0,i.kt)("li",{parentName:"ul"},"Replication of browser ",(0,i.kt)("strong",{parentName:"li"},"TLS fingerprints")),(0,i.kt)("li",{parentName:"ul"},"Integrated fast ",(0,i.kt)("strong",{parentName:"li"},"HTML parsers"),". Cheerio and JSDOM"),(0,i.kt)("li",{parentName:"ul"},"Yes, you can scrape ",(0,i.kt)("strong",{parentName:"li"},"JSON APIs")," as well")),(0,i.kt)("h3",{id:"-real-browser-crawling"},"\ud83d\udcbb Real browser crawling"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"JavaScript ",(0,i.kt)("strong",{parentName:"li"},"rendering")," and ",(0,i.kt)("strong",{parentName:"li"},"screenshots")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Headless")," and ",(0,i.kt)("strong",{parentName:"li"},"headful")," support"),(0,i.kt)("li",{parentName:"ul"},"Zero-config generation of ",(0,i.kt)("strong",{parentName:"li"},"human-like fingerprints")),(0,i.kt)("li",{parentName:"ul"},"Automatic ",(0,i.kt)("strong",{parentName:"li"},"browser management")),(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("strong",{parentName:"li"},"Playwright")," and ",(0,i.kt)("strong",{parentName:"li"},"Puppeteer")," with the same interface"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Chrome"),", ",(0,i.kt)("strong",{parentName:"li"},"Firefox"),", ",(0,i.kt)("strong",{parentName:"li"},"Webkit")," and many others")),(0,i.kt)("h2",{id:"next-lesson"},"Next lesson"),(0,i.kt)("p",null,"In the next lesson you will install Crawlee and learn how to bootstrap projects with the Crawlee CLI."))}m.isMDXComponent=!0},643:e=>{e.exports=JSON.parse('{"name":"crawlee","version":"3.1.3","description":"The scalable web crawling and scraping library for JavaScript/Node.js. Enables development of data extraction and web automation jobs (not only) with headless Chrome and Puppeteer.","engines":{"node":">=16.0.0"},"bin":{"crawlee":"./src/cli.ts"},"main":"./dist/index.js","module":"./dist/index.mjs","types":"./dist/index.d.ts","exports":{".":{"import":"./dist/index.mjs","require":"./dist/index.js","types":"./dist/index.d.ts"},"./package.json":"./package.json"},"keywords":["apify","headless","chrome","puppeteer","crawler","scraper"],"author":{"name":"Apify","email":"support@apify.com","url":"https://apify.com"},"contributors":["Jan Curn <jan@apify.com>","Marek Trunkat <marek@apify.com>","Ondra Urban <ondra@apify.com>"],"license":"Apache-2.0","repository":{"type":"git","url":"git+https://github.com/apify/crawlee"},"bugs":{"url":"https://github.com/apify/crawlee/issues"},"homepage":"https://crawlee.dev","scripts":{"build":"npm run clean && npm run compile && npm run copy","clean":"rimraf ./dist","compile":"tsc -p tsconfig.build.json && gen-esm-wrapper ./dist/index.js ./dist/index.mjs","copy":"ts-node -T ../../scripts/copy.ts"},"publishConfig":{"access":"public"},"dependencies":{"@crawlee/basic":"^3.1.3","@crawlee/browser":"^3.1.3","@crawlee/cheerio":"^3.1.3","@crawlee/cli":"^3.1.2","@crawlee/core":"^3.1.3","@crawlee/http":"^3.1.3","@crawlee/jsdom":"^3.1.3","@crawlee/playwright":"^3.1.3","@crawlee/puppeteer":"^3.1.3","@crawlee/utils":"^3.1.2","import-local":"^3.1.0"},"peerDependencies":{"playwright":">= 1.21.x <= 1.27.x","puppeteer":"<= 19.x"},"peerDependenciesMeta":{"playwright":{"optional":true},"puppeteer":{"optional":true}}}')}}]);