"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2359],{3905:(e,a,t)=>{t.d(a,{Zo:()=>s,kt:()=>h});var r=t(7294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function p(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var o=r.createContext({}),c=function(e){var a=r.useContext(o),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},s=function(e){var a=c(e.components);return r.createElement(o.Provider,{value:a},e.children)},m={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},w=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),w=c(t),h=n,u=w["".concat(o,".").concat(h)]||w[h]||m[h]||l;return t?r.createElement(u,i(i({ref:a},s),{},{components:t})):r.createElement(u,i({ref:a},s))}));function h(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var l=t.length,i=new Array(l);i[0]=w;var p={};for(var o in a)hasOwnProperty.call(a,o)&&(p[o]=a[o]);p.originalType=e,p.mdxType="string"==typeof e?e:n,i[1]=p;for(var c=2;c<l;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}w.displayName="MDXCreateElement"},1515:(e,a,t)=>{t.r(a),t.d(a,{contentTitle:()=>o,default:()=>m,frontMatter:()=>p,toc:()=>c});var r=t(7462),n=t(3366),l=(t(7294),t(3905)),i=["components"],p={},o=void 0,c=[{value:"Installing Crawlee",id:"installing-crawlee",level:2}],s={toc:c};function m(e){var a=e.components,t=(0,n.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},s,t,{components:a,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Core set of classes required for Crawlee."),(0,l.kt)("p",null,"The ",(0,l.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/crawlee"},(0,l.kt)("inlineCode",{parentName:"a"},"crawlee"))," package consists of several smaller packages, released separately under ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee")," namespace:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/core"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/core")),": the base for all the crawler implementations, also contains things like ",(0,l.kt)("inlineCode",{parentName:"li"},"Request"),", ",(0,l.kt)("inlineCode",{parentName:"li"},"RequestQueue"),", ",(0,l.kt)("inlineCode",{parentName:"li"},"RequestList")," or ",(0,l.kt)("inlineCode",{parentName:"li"},"Dataset")," classes"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/cheerio-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/cheerio")),": exports ",(0,l.kt)("inlineCode",{parentName:"li"},"CheerioCrawler")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/playwright-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/playwright")),": exports ",(0,l.kt)("inlineCode",{parentName:"li"},"PlaywrightCrawler")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/puppeteer-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/puppeteer")),": exports ",(0,l.kt)("inlineCode",{parentName:"li"},"PuppeteerCrawler")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/jsdom-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/jsdom")),": exports ",(0,l.kt)("inlineCode",{parentName:"li"},"JSDOMCrawler")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/basic-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/basic")),": exports ",(0,l.kt)("inlineCode",{parentName:"li"},"BasicCrawler")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/http-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/http")),": exports ",(0,l.kt)("inlineCode",{parentName:"li"},"HttpCrawler")," (which is used for creating ",(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/jsdom-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/jsdom"))," and ",(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/cheerio-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/cheerio")),")"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/browser-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/browser")),": exports ",(0,l.kt)("inlineCode",{parentName:"li"},"BrowserCrawler")," (which is used for creating ",(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/playwright-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/playwright"))," and ",(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/puppeteer-crawler"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/puppeteer")),")"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/memory-storage"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/memory-storage")),": ",(0,l.kt)("a",{parentName:"li",href:"https://npmjs.com/package/@apify/storage-local"},(0,l.kt)("inlineCode",{parentName:"a"},"@apify/storage-local"))," alternative"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/browser-pool"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/browser-pool")),": previously ",(0,l.kt)("a",{parentName:"li",href:"https://npmjs.com/package/browser-pool"},(0,l.kt)("inlineCode",{parentName:"a"},"browser-pool"))," package"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/utils"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/utils")),": utility methods"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/types"},(0,l.kt)("inlineCode",{parentName:"a"},"@crawlee/types")),": holds TS interfaces mainly about the ",(0,l.kt)("a",{parentName:"li",href:"https://crawlee.dev/api/core/interface/StorageClient"},(0,l.kt)("inlineCode",{parentName:"a"},"StorageClient")))),(0,l.kt)("h2",{id:"installing-crawlee"},"Installing Crawlee"),(0,l.kt)("p",null,"Most of the Crawlee packages are extending and reexporting each other, so it's enough to install just the one you plan on using, e.g. ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/playwright")," if you plan on using ",(0,l.kt)("inlineCode",{parentName:"p"},"playwright")," - it already contains everything from the ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/browser")," package, which includes everything from ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/basic"),", which includes everything from ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/core"),"."),(0,l.kt)("p",null,"If we don't care much about additional code being pulled in, we can just use the ",(0,l.kt)("inlineCode",{parentName:"p"},"crawlee")," meta-package, which contains (re-exports) most of the ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/*")," packages, and therefore contains all the crawler classes."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm install crawlee\n")),(0,l.kt)("p",null,"Or if all we need is cheerio support, we can install only ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/cheerio"),"."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @crawlee/cheerio\n")),(0,l.kt)("p",null,"When using ",(0,l.kt)("inlineCode",{parentName:"p"},"playwright")," or ",(0,l.kt)("inlineCode",{parentName:"p"},"puppeteer"),", we still need to install those dependencies explicitly - this allows the users to be in control of which version will be used."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm install crawlee playwright\n# or npm install @crawlee/playwright playwright\n")),(0,l.kt)("p",null,"Alternatively we can also use the ",(0,l.kt)("inlineCode",{parentName:"p"},"crawlee")," meta-package which contains (re-exports) most of the ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/*")," packages, and therefore contains all the crawler classes."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Sometimes you might want to use some utility methods from ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/utils"),", so you might want to install that as well. This package contains some utilities that were previously available under ",(0,l.kt)("inlineCode",{parentName:"p"},"Apify.utils"),". Browser related utilities can be also found in the crawler packages (e.g. ",(0,l.kt)("inlineCode",{parentName:"p"},"@crawlee/playwright"),").")))}m.isMDXComponent=!0}}]);