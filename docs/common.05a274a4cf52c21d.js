"use strict";(self.webpackChunkEleccionesFront=self.webpackChunkEleccionesFront||[]).push([[592],{1139:(T,d,u)=>{function g(t,c,n,s,h,r,e){try{var a=t[r](e),i=a.value}catch(m){return void n(m)}a.done?c(i):Promise.resolve(i).then(s,h)}u.d(d,{V:()=>w});var S=u(5619),y=u(7033),l=u(5879),F=u(4762);let C=(()=>{class t{speak(n){if("speechSynthesis"in window){const s=new SpeechSynthesisUtterance(n);s.lang="es-ES",s.rate=1.2,window.speechSynthesis.speak(s)}else console.error("La s\xedntesis de voz no es compatible con este navegador.")}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=l.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var j=u(9862);let w=(()=>{class t{constructor(n,s,h,r){var e=this;this.speechService=n,this.textToSpeechService=s,this.http=h,this.Urls=r,this.functionsCallings=[],this.functionReturned=new S.X(""),this.functionReturned$=this.functionReturned.asObservable(),this.mensajes=[],this.api_url=r.apiUrl,this.mensajes.push({role:"assistant",content:prompt+" Don't make assumptions about what values to plug into functions.  Ask for clarification if a user request is ambiguous. Only the values in the enum are valid. If it is not in the enum, it informs the user of the situation. Your Goal is allways response in valid json format. "}),this.speechService.transcriptionSubject.subscribe(function(){var a=function v(t){return function(){var c=this,n=arguments;return new Promise(function(s,h){var r=t.apply(c,n);function e(i){g(r,s,h,e,a,"next",i)}function a(i){g(r,s,h,e,a,"throw",i)}e(void 0)})}}(function*(i){if(i.trim().length>0){e.mensajes.push({role:"user",content:i}),e.mensajes.length>10&&e.mensajes.splice(1,1);const m={model:"gpt-3.5-turbo-0613",temperature:.2,messages:e.mensajes,functions:e.functionsCallings};try{const p=yield e.http.post(`${e.api_url}gpt`,m).toPromise();if(p&&p.data){const o=p.data;if(console.log(o.choices[0].message),console.log("Motivo de finalizad0 = "+o.choices[0].finish_reason),"function_call"!==o.choices[0].finish_reason){if(e.mensajes.push({role:"assistant",content:o.choices[0].message.content}),o.choices[0].message.content){e.functionReturned.next(o.choices[0].message.content);const f=o.choices[0].message.content;if(!f.includes("name")&&!f.includes("arguments")){const x=f.replace(/^"|"$/g,"").replace(/\\"/g,'"');e.textToSpeechService.speak(x)}}}else{const f=JSON.stringify(o.choices[0].message.function_call);e.functionReturned.next(f),e.mensajes.push({role:"assistant",content:f})}e.mensajes.length>10&&e.mensajes.shift()}}catch(p){console.error(p)}}});return function(i){return a.apply(this,arguments)}}())}crearPrompt(){return""}addFunction(n){this.functionsCallings.push(n)}addFunctions(n){this.functionsCallings=this.functionsCallings.concat(n)}removeFunction(n){this.functionsCallings.splice(this.functionsCallings.indexOf(n),1)}removeFunctions(n){for(const s of n)this.removeFunction(s)}getFunctions(){return this.functionsCallings}}return t.\u0275fac=function(n){return new(n||t)(l.LFG(F.A),l.LFG(C),l.LFG(j.eN),l.LFG(y.Y))},t.\u0275prov=l.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);