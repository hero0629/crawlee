"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8328],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=l(r),m=a,f=u["".concat(p,".").concat(m)]||u[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4959:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(7294),a=r(9960),o=r(4477),i=r(2263),s=r(643).version.split("."),p=[s[0],s[1]].join(".");const l=function(e){var t=e.to,r=e.children,s=(0,o.E)();return(0,i.default)().siteConfig.presets[0][1].docs.disableVersioning||s.version===p?n.createElement(a.default,{to:"/api/"+t},r):n.createElement(a.default,{to:"/api/"+("current"===s.version?"next":s.version)+"/"+t},r)}},3134:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>f,frontMatter:()=>p,metadata:()=>c,toc:()=>u});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=r(1435);r(4959);var s=["components"],p={id:"export-entire-dataset",title:"Export entire dataset to one file"},l=void 0,c={unversionedId:"examples/export-entire-dataset",id:"version-3.0/examples/export-entire-dataset",title:"Export entire dataset to one file",description:'This Dataset example uses the exportToValue function to export the entire default dataset to a single CSV file into a key-value store named "my-data".',source:"@site/versioned_docs/version-3.0/examples/export_entire_dataset.mdx",sourceDirName:"examples",slug:"/examples/export-entire-dataset",permalink:"/docs/3.0/examples/export-entire-dataset",draft:!1,tags:[],version:"3.0",lastUpdatedBy:"Jind\u0159ich B\xe4r",lastUpdatedAt:1670597185,formattedLastUpdatedAt:"Dec 9, 2022",frontMatter:{id:"export-entire-dataset",title:"Export entire dataset to one file"},sidebar:"docs",previous:{title:"Crawl some links on a website",permalink:"/docs/3.0/examples/crawl-some-links"},next:{title:"Forms",permalink:"/docs/3.0/examples/forms"}},d={},u=[],m={toc:u};function f(e){var t=e.components,r=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This ",(0,o.kt)("inlineCode",{parentName:"p"},"Dataset")," example uses the ",(0,o.kt)("inlineCode",{parentName:"p"},"exportToValue"),' function to export the entire default dataset to a single CSV file into a key-value store named "my-data".'),(0,o.kt)(i.Z,{className:"language-js",mdxType:"CodeBlock"},"import { Dataset } from 'crawlee';\n\n// Retrieve or generate two items to be pushed\nconst data = [\n    {\n        id: 123,\n        name: 'foo',\n    },\n    {\n        id: 456,\n        name: 'bar'\n    },\n];\n\n// Push the two items to the default dataset\nawait Dataset.pushData(data);\n\n// Export the entirety of the dataset to a single file in\n// a key-value store named \"my-data\" under the key \"OUTPUT\"\nawait Dataset.exportToValue('OUTPUT', { contentType: 'text/csv', keyValueStoreName: 'my-data' });\n"))}f.isMDXComponent=!0},643:e=>{e.exports=JSON.parse('{"name":"crawlee","version":"3.1.3","description":"The scalable web crawling and scraping library for JavaScript/Node.js. Enables development of data extraction and web automation jobs (not only) with headless Chrome and Puppeteer.","engines":{"node":">=16.0.0"},"bin":{"crawlee":"./src/cli.ts"},"main":"./dist/index.js","module":"./dist/index.mjs","types":"./dist/index.d.ts","exports":{".":{"import":"./dist/index.mjs","require":"./dist/index.js","types":"./dist/index.d.ts"},"./package.json":"./package.json"},"keywords":["apify","headless","chrome","puppeteer","crawler","scraper"],"author":{"name":"Apify","email":"support@apify.com","url":"https://apify.com"},"contributors":["Jan Curn <jan@apify.com>","Marek Trunkat <marek@apify.com>","Ondra Urban <ondra@apify.com>"],"license":"Apache-2.0","repository":{"type":"git","url":"git+https://github.com/apify/crawlee"},"bugs":{"url":"https://github.com/apify/crawlee/issues"},"homepage":"https://crawlee.dev","scripts":{"build":"npm run clean && npm run compile && npm run copy","clean":"rimraf ./dist","compile":"tsc -p tsconfig.build.json && gen-esm-wrapper ./dist/index.js ./dist/index.mjs","copy":"ts-node -T ../../scripts/copy.ts"},"publishConfig":{"access":"public"},"dependencies":{"@crawlee/basic":"^3.1.3","@crawlee/browser":"^3.1.3","@crawlee/cheerio":"^3.1.3","@crawlee/cli":"^3.1.2","@crawlee/core":"^3.1.3","@crawlee/http":"^3.1.3","@crawlee/jsdom":"^3.1.3","@crawlee/playwright":"^3.1.3","@crawlee/puppeteer":"^3.1.3","@crawlee/utils":"^3.1.2","import-local":"^3.1.0"},"peerDependencies":{"playwright":">= 1.21.x <= 1.27.x","puppeteer":"<= 19.x"},"peerDependenciesMeta":{"playwright":{"optional":true},"puppeteer":{"optional":true}}}')}}]);