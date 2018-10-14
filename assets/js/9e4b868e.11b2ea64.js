"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6721],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return n?a.createElement(h,l(l({ref:t},p),{},{components:n})):a.createElement(h,l({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var u=2;u<i;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(7294),r=n(6010);const i="tabItem_Ymn6";function l(e){var t=e.children,n=e.hidden,l=e.className;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(i,l),hidden:n},t)}},5488:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(7462),r=n(7294),i=n(6010),l=n(2389),o=n(7392),s=n(7094),u=n(2466);const p="tabList__CuJ",c="tabItem_LNqP";function d(e){var t,n,l=e.lazy,d=e.block,m=e.defaultValue,h=e.values,w=e.groupId,f=e.className,k=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),g=null!=h?h:k.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),y=(0,o.l)(g,(function(e,t){return e.value===t.value}));if(y.length>0)throw new Error('Docusaurus error: Duplicate values "'+y.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var v=null===m?m:null!=(t=null!=m?m:null==(n=k.find((function(e){return e.props.default})))?void 0:n.props.value)?t:k[0].props.value;if(null!==v&&!g.some((function(e){return e.value===v})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+v+'" but none of its children has the corresponding value. Available values are: '+g.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var b=(0,s.U)(),q=b.tabGroupChoices,C=b.setTabGroupChoices,N=(0,r.useState)(v),x=N[0],T=N[1],L=[],R=(0,u.o5)().blockElementScrollPositionUntilNextRender;if(null!=w){var j=q[w];null!=j&&j!==x&&g.some((function(e){return e.value===j}))&&T(j)}var U=function(e){var t=e.currentTarget,n=L.indexOf(t),a=g[n].value;a!==x&&(R(t),T(a),null!=w&&C(w,String(a)))},E=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a,r=L.indexOf(e.currentTarget)+1;n=null!=(a=L[r])?a:L[0];break;case"ArrowLeft":var i,l=L.indexOf(e.currentTarget)-1;n=null!=(i=L[l])?i:L[L.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:(0,i.Z)("tabs-container",p)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":d},f)},g.map((function(e){var t=e.value,n=e.label,l=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:x===t?0:-1,"aria-selected":x===t,key:t,ref:function(e){return L.push(e)},onKeyDown:E,onFocus:U,onClick:U},l,{className:(0,i.Z)("tabs__item",c,null==l?void 0:l.className,{"tabs__item--active":x===t})}),null!=n?n:t)}))),l?(0,r.cloneElement)(k.filter((function(e){return e.props.value===x}))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},k.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==x})}))))}function m(e){var t=(0,l.Z)();return r.createElement(d,(0,a.Z)({key:String(t)},e))}},4959:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(7294),r=n(9960),i=n(4477),l=n(2263),o=n(643).version.split("."),s=[o[0],o[1]].join(".");const u=function(e){var t=e.to,n=e.children,o=(0,i.E)();return(0,l.default)().siteConfig.presets[0][1].docs.disableVersioning||o.version===s?a.createElement(r.default,{to:"/api/"+t},n):a.createElement(r.default,{to:"/api/"+("current"===o.version?"next":o.version)+"/"+t},n)}},4422:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>d,default:()=>k,frontMatter:()=>c,metadata:()=>m,toc:()=>w});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=n(4959),o=n(5488),s=n(5162),u=n(1435);var p=["components"],c={id:"adding-urls",title:"Adding more URLs",description:"Your first steps into the world of scraping with Crawlee"},d=void 0,m={unversionedId:"introduction/adding-urls",id:"version-3.0/introduction/adding-urls",title:"Adding more URLs",description:"Your first steps into the world of scraping with Crawlee",source:"@site/versioned_docs/version-3.0/introduction/03-adding-urls.mdx",sourceDirName:"introduction",slug:"/introduction/adding-urls",permalink:"/docs/3.0/introduction/adding-urls",draft:!1,tags:[],version:"3.0",lastUpdatedBy:"Jind\u0159ich B\xe4r",lastUpdatedAt:1670597185,formattedLastUpdatedAt:"Dec 9, 2022",sidebarPosition:3,frontMatter:{id:"adding-urls",title:"Adding more URLs",description:"Your first steps into the world of scraping with Crawlee"},sidebar:"docs",previous:{title:"First crawler",permalink:"/docs/3.0/introduction/first-crawler"},next:{title:"Real-world project",permalink:"/docs/3.0/introduction/real-world-project"}},h={},w=[{value:"How crawling works",id:"how-crawling-works",level:2},{value:"Limit your crawls with <code>maxRequestsPerCrawl</code>",id:"limit-your-crawls-with-maxrequestspercrawl",level:2},{value:"Finding new links",id:"finding-new-links",level:2},{value:"Filtering links to same domain",id:"filtering-links-to-same-domain",level:2},{value:"Skipping duplicate URLs",id:"skipping-duplicate-urls",level:2},{value:"Advanced filtering arguments",id:"advanced-filtering-arguments",level:2},{value:"Filter URLs with patterns",id:"filter-urls-with-patterns",level:3},{value:"Transform requests",id:"transform-requests",level:3},{value:"Next lesson",id:"next-lesson",level:2}],f={toc:w};function k(e){var t=e.components,n=(0,r.Z)(e,p);return(0,i.kt)("wrapper",(0,a.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In the previous lesson you built a very simple crawler that downloads HTML of a single page, reads its title and prints\nit to the console. This is the original source code:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { CheerioCrawler } from 'crawlee';\n\nconst crawler = new CheerioCrawler({\n    async requestHandler({ $, request }) {\n        const title = $('title').text();\n        console.log(`The title of \"${request.url}\" is: ${title}.`);\n    }\n})\n\nawait crawler.run(['https://crawlee.dev']);\n")),(0,i.kt)("p",null,"In this lesson you'll use the example from the previous section and improve on it. You'll add more URLs to the queue and thanks to that the crawler will keep going, finding new links, enqueuing them into the ",(0,i.kt)("inlineCode",{parentName:"p"},"RequestQueue")," and then scraping them."),(0,i.kt)("h2",{id:"how-crawling-works"},"How crawling works"),(0,i.kt)("p",null,"The process is simple:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Find new links on the page."),(0,i.kt)("li",{parentName:"ol"},"Filter only those pointing to the same domain, in this case ",(0,i.kt)("inlineCode",{parentName:"li"},"crawlee.dev"),"."),(0,i.kt)("li",{parentName:"ol"},"Enqueue (add) them to the ",(0,i.kt)("inlineCode",{parentName:"li"},"RequestQueue"),"."),(0,i.kt)("li",{parentName:"ol"},"Visit the newly enqueued links."),(0,i.kt)("li",{parentName:"ol"},"Repeat the process.")),(0,i.kt)("p",null,"In the following paragraphs you will learn about the ",(0,i.kt)(l.Z,{to:"core/function/enqueueLinks",mdxType:"ApiLink"},(0,i.kt)("inlineCode",{parentName:"p"},"enqueueLinks"))," function which simplifies crawling to a single function call. For comparison and learning purposes we will show an equivalent solution written without ",(0,i.kt)("inlineCode",{parentName:"p"},"enqueueLinks")," in the second code tab."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"enqueueLinks")," function is context aware. It means that it will read the information about the currently crawled page from the context, and you don't need to explicitly provide any arguments. It will find the links using the Cheerio function ",(0,i.kt)("inlineCode",{parentName:"p"},"$")," and automatically add the links to the running crawler's ",(0,i.kt)("inlineCode",{parentName:"p"},"RequestQueue"),".")),(0,i.kt)("h2",{id:"limit-your-crawls-with-maxrequestspercrawl"},"Limit your crawls with ",(0,i.kt)("inlineCode",{parentName:"h2"},"maxRequestsPerCrawl")),(0,i.kt)("p",null," When you're just testing your code or when your crawler could potentially find millions of links, it's very useful to set a maximum limit of crawled pages. The option is called ",(0,i.kt)("inlineCode",{parentName:"p"},"maxRequestsPerCrawl"),", is available in all crawlers, and you can set it like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const crawler = new CheerioCrawler({\n    maxRequestsPerCrawl: 20,\n    // ...\n});\n")),(0,i.kt)("p",null,"This means that no new requests will be started after the 20th request is finished. The actual number of processed requests might be a little higher thanks to parallelization, because the running requests won't be forcefully aborted. It's not even possible in most cases."),(0,i.kt)("h2",{id:"finding-new-links"},"Finding new links"),(0,i.kt)("p",null,"There are numerous approaches to finding links to follow when crawling the web. For our purposes, we will be looking for ",(0,i.kt)("inlineCode",{parentName:"p"},"<a>")," elements that contain the ",(0,i.kt)("inlineCode",{parentName:"p"},"href")," attribute because that's what you need in most cases. For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<a href="https://crawlee.dev/docs/introduction">This is a link to Crawlee introduction</a>\n')),(0,i.kt)("p",null,"Since this is the most common case, it is also the ",(0,i.kt)("inlineCode",{parentName:"p"},"enqueueLinks")," default."),(0,i.kt)(o.Z,{groupId:"crawling-links",mdxType:"Tabs"},(0,i.kt)(s.Z,{value:"enqueue-links",label:"with enqueueLinks",default:!0,mdxType:"TabItem"},(0,i.kt)(u.Z,{language:"js",title:"src/main.mjs",mdxType:"CodeBlock"},"import { CheerioCrawler } from 'crawlee';\n\nconst crawler = new CheerioCrawler({\n    // Let's limit our crawls to make our\n    // tests shorter and safer.\n    maxRequestsPerCrawl: 20,\n    // enqueueLinks is an argument of the requestHandler\n    async requestHandler({ $, request, enqueueLinks }) {\n        const title = $('title').text();\n        console.log(`The title of \"${request.url}\" is: ${title}.`);\n        // The enqueueLinks function is context aware,\n        // so it does not require any parameters.\n        await enqueueLinks();\n    },\n});\n\nawait crawler.run(['https://crawlee.dev']);\n")),(0,i.kt)(s.Z,{value:"plain-js",label:"without enqueueLinks",mdxType:"TabItem"},(0,i.kt)(u.Z,{language:"js",title:"src/main.mjs",mdxType:"CodeBlock"},"import { CheerioCrawler } from 'crawlee';\nimport { URL } from 'node:url';\n\nconst crawler = new CheerioCrawler({\n    // Let's limit our crawls to make our\n    // tests shorter and safer.\n    maxRequestsPerCrawl: 20,\n    async requestHandler({ request, $ }) {\n        const title = $('title').text();\n        console.log(`The title of \"${request.url}\" is: ${title}.`);\n\n        const links = $('a[href]')\n            .map((_, el) => $(el).attr('href'))\n            .get();\n\n        // Besides resolving the URLs, we now also need to\n        // grab their hostname for filtering.\n        const { hostname } = new URL(request.loadedUrl);\n        const absoluteUrls = links\n            .map((link) => new URL(link, request.loadedUrl));\n\n        // We use the hostname to filter links that point\n        // to a different domain, even subdomain.\n        const sameHostnameLinks = absoluteUrls\n            .filter((url) => url.hostname === hostname)\n            .map((url) => ({ url: url.href }));\n\n        // Finally, we have to add the URLs to the queue\n        await crawler.addRequests(sameHostnameLinks);\n    },\n});\n\nawait crawler.run(['https://crawlee.dev']);\n"))),(0,i.kt)("p",null,"If you need to override the default selection of elements in ",(0,i.kt)("inlineCode",{parentName:"p"},"enqueueLinks"),", you can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"selector")," argument."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"await enqueueLinks({\n    selector: 'div.has-link'\n});\n")),(0,i.kt)("h2",{id:"filtering-links-to-same-domain"},"Filtering links to same domain"),(0,i.kt)("p",null,"Websites typically contain a lot of links that lead away from the original page. This is normal, but when crawling a website, we usually want to crawl that one site and not let our crawler wander away to Google, Facebook and Twitter. Therefore, we need to filter out the off-domain links and only keep the ones that lead to the same domain."),(0,i.kt)(o.Z,{groupId:"crawling-links",mdxType:"Tabs"},(0,i.kt)(s.Z,{value:"enqueue-links",label:"with enqueueLinks",default:!0,mdxType:"TabItem"},(0,i.kt)(u.Z,{language:"js",title:"src/main.mjs",mdxType:"CodeBlock"},"import { CheerioCrawler } from 'crawlee';\n\nconst crawler = new CheerioCrawler({\n    maxRequestsPerCrawl: 20,\n    async requestHandler({ $, request, enqueueLinks }) {\n        const title = $('title').text();\n        console.log(`The title of \"${request.url}\" is: ${title}.`);\n        await enqueueLinks();\n    },\n});\n\nawait crawler.run(['https://crawlee.dev']);\n")),(0,i.kt)(s.Z,{value:"plain-js",label:"without enqueueLinks",mdxType:"TabItem"},(0,i.kt)(u.Z,{language:"js",title:"src/main.mjs",mdxType:"CodeBlock"},"import { CheerioCrawler } from 'crawlee';\nimport { URL } from 'node:url';\n\nconst crawler = new CheerioCrawler({\n    maxRequestsPerCrawl: 20,\n    async requestHandler({ request, $ }) {\n        const title = $('title').text();\n        console.log(`The title of \"${request.url}\" is: ${title}.`);\n\n        // Without enqueueLinks, we first have to extract all\n        // the URLs from the page with Cheerio.\n        const links = $('a[href]')\n            .map((_, el) => $(el).attr('href'))\n            .get();\n\n        // Then we need to resolve relative URLs,\n        // otherwise they would be unusable for crawling.\n        const absoluteUrls = links\n            .map((link) => new URL(link, request.loadedUrl).href);\n\n        // Finally, we have to add the URLs to the queue\n        await crawler.addRequests(absoluteUrls);\n    },\n});\n\nawait crawler.run(['https://crawlee.dev']);\n"))),(0,i.kt)("p",null,"The default behavior of ",(0,i.kt)("inlineCode",{parentName:"p"},"enqueueLinks")," is to stay on the same hostname. This ",(0,i.kt)("strong",{parentName:"p"},"does not include subdomains"),". To include subdomains in your crawl, use the ",(0,i.kt)("inlineCode",{parentName:"p"},"strategy")," argument."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"await enqueueLinks({\n    strategy: 'same-domain'\n});\n")),(0,i.kt)("p",null,"When you run the code, you will see the crawler  log the ",(0,i.kt)("strong",{parentName:"p"},"title")," of the first page, then the ",(0,i.kt)("strong",{parentName:"p"},"enqueueing")," message showing number of URLs, followed by the ",(0,i.kt)("strong",{parentName:"p"},"title")," of the first enqueued page and so on and so on."),(0,i.kt)("h2",{id:"skipping-duplicate-urls"},"Skipping duplicate URLs"),(0,i.kt)("p",null,"Skipping of duplicate URLs is critical, because visiting the same page multiple times would lead to duplicate results. This is automatically handled by the ",(0,i.kt)("inlineCode",{parentName:"p"},"RequestQueue")," which deduplicates requests using their ",(0,i.kt)("inlineCode",{parentName:"p"},"uniqueKey"),". This ",(0,i.kt)("inlineCode",{parentName:"p"},"uniqueKey")," is automatically generated from the request's URL by lowercasing the URL, lexically ordering query parameters, removing fragments and a few other tweaks that ensure the queue only includes unique URLs."),(0,i.kt)("h2",{id:"advanced-filtering-arguments"},"Advanced filtering arguments"),(0,i.kt)("p",null,"While the defaults for ",(0,i.kt)("inlineCode",{parentName:"p"},"enqueueLinks")," can be often exactly what you need, it also gives you fine-grained control over which URLs should be enqueued. One way we already mentioned above is by using the ",(0,i.kt)(l.Z,{to:"core/enum/EnqueueStrategy",mdxType:"ApiLink"},(0,i.kt)("inlineCode",{parentName:"p"},"EnqueueStrategy")),". You can use the ",(0,i.kt)(l.Z,{to:"core/enum/EnqueueStrategy#All",mdxType:"ApiLink"},(0,i.kt)("inlineCode",{parentName:"p"},"All"))," strategy if you want to follow every single link, regardless of its domain, or you can enqueue links that target the same domain name with the ",(0,i.kt)(l.Z,{to:"core/enum/EnqueueStrategy#SameDomain",mdxType:"ApiLink"},(0,i.kt)("inlineCode",{parentName:"p"},"SameDomain"))," strategy."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"await enqueueLinks({\n    strategy: 'all', // wander the internet\n});\n")),(0,i.kt)("h3",{id:"filter-urls-with-patterns"},"Filter URLs with patterns"),(0,i.kt)("p",null,"For even more control, you can use ",(0,i.kt)("inlineCode",{parentName:"p"},"globs"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"regexps")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"pseudoUrls")," to filter the URLs. Each of those arguments is always an ",(0,i.kt)("inlineCode",{parentName:"p"},"Array"),", but the contents can take on many forms. ",(0,i.kt)(l.Z,{to:"core/interface/EnqueueLinksOptions",mdxType:"ApiLink"},"See the reference")," for more information about them as well as other options."),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"If you provide one of those options, the default ",(0,i.kt)("inlineCode",{parentName:"p"},"same-hostname")," strategy will ",(0,i.kt)("strong",{parentName:"p"},"not")," be applied unless explicitly set in the options.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"await enqueueLinks({\n    globs: ['http?(s)://apify.com/*/*'],\n});\n")),(0,i.kt)("h3",{id:"transform-requests"},"Transform requests"),(0,i.kt)("p",null,"To have absolute control, we have the ",(0,i.kt)(l.Z,{to:"core/interface/EnqueueLinksOptions/#transformRequestFunction",mdxType:"ApiLink"},(0,i.kt)("inlineCode",{parentName:"p"},"transformRequestFunction")),". Just before a new ",(0,i.kt)(l.Z,{to:"core/class/Request",mdxType:"ApiLink"},(0,i.kt)("inlineCode",{parentName:"p"},"Request"))," is constructed and enqueued to the ",(0,i.kt)(l.Z,{to:"core/class/RequestQueue",mdxType:"ApiLink"},(0,i.kt)("inlineCode",{parentName:"p"},"RequestQueue")),", this function can be used to skip it or modify its contents such as ",(0,i.kt)("inlineCode",{parentName:"p"},"userData"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"payload")," or, most importantly, ",(0,i.kt)("inlineCode",{parentName:"p"},"uniqueKey"),". This is useful when you need to enqueue multiple requests to the queue, and these requests share the same URL, but differ in methods or payloads. Another use case is to dynamically update or create the ",(0,i.kt)("inlineCode",{parentName:"p"},"userData"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"await enqueueLinks({\n    globs: ['http?(s)://apify.com/*/*'],\n    transformRequestFunction(req) {\n        // ignore all links ending with `.pdf`\n        if (req.url.endsWith('.pdf')) return false;\n        return req;\n    },\n});\n")),(0,i.kt)("p",null,"And that's it! ",(0,i.kt)("inlineCode",{parentName:"p"},"enqueueLinks()")," is just one example of Crawlee's powerful helper functions. They're all designed to make your life easier, so you can focus on getting your data, while leaving the mundane crawling management to the tools."),(0,i.kt)("h2",{id:"next-lesson"},"Next lesson"),(0,i.kt)("p",null,"In the next lesson you will start your project of scraping a production website and learn some more Crawlee tricks in the process."))}k.isMDXComponent=!0},643:e=>{e.exports=JSON.parse('{"name":"crawlee","version":"3.1.3","description":"The scalable web crawling and scraping library for JavaScript/Node.js. Enables development of data extraction and web automation jobs (not only) with headless Chrome and Puppeteer.","engines":{"node":">=16.0.0"},"bin":{"crawlee":"./src/cli.ts"},"main":"./dist/index.js","module":"./dist/index.mjs","types":"./dist/index.d.ts","exports":{".":{"import":"./dist/index.mjs","require":"./dist/index.js","types":"./dist/index.d.ts"},"./package.json":"./package.json"},"keywords":["apify","headless","chrome","puppeteer","crawler","scraper"],"author":{"name":"Apify","email":"support@apify.com","url":"https://apify.com"},"contributors":["Jan Curn <jan@apify.com>","Marek Trunkat <marek@apify.com>","Ondra Urban <ondra@apify.com>"],"license":"Apache-2.0","repository":{"type":"git","url":"git+https://github.com/apify/crawlee"},"bugs":{"url":"https://github.com/apify/crawlee/issues"},"homepage":"https://crawlee.dev","scripts":{"build":"npm run clean && npm run compile && npm run copy","clean":"rimraf ./dist","compile":"tsc -p tsconfig.build.json && gen-esm-wrapper ./dist/index.js ./dist/index.mjs","copy":"ts-node -T ../../scripts/copy.ts"},"publishConfig":{"access":"public"},"dependencies":{"@crawlee/basic":"^3.1.3","@crawlee/browser":"^3.1.3","@crawlee/cheerio":"^3.1.3","@crawlee/cli":"^3.1.2","@crawlee/core":"^3.1.3","@crawlee/http":"^3.1.3","@crawlee/jsdom":"^3.1.3","@crawlee/playwright":"^3.1.3","@crawlee/puppeteer":"^3.1.3","@crawlee/utils":"^3.1.2","import-local":"^3.1.0"},"peerDependencies":{"playwright":">= 1.21.x <= 1.27.x","puppeteer":"<= 19.x"},"peerDependenciesMeta":{"playwright":{"optional":true},"puppeteer":{"optional":true}}}')}}]);