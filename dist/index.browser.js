export default class TreeBox{constructor({config:e={},nodes:t,root:r}={}){if(e=Object.assign({initialPath:"/",onnavigate:()=>{}},e),!t)throw new Error("TreeBox: nodes not provided.");if(!r)throw new Error("TreeBox: root element not provided.");this.config=e,this.root=r,this.nodes=t,this._prepareNodesChildren(this.nodes),this.activeElement=null,this.selectedNode=null,this.path=e.initialPath,this.navigateCb=e.onnavigate,this.navigate(e.initialPath)}_activate(){const e=this._getNodeAtPath(this.nodes,this._pathToKeys());this.selectedNode=e;const{children:t,display:r}=e;if(r)return this._display(r),!0;if(t)return t;throw new Error("TreeBox: given path yields invalid result.")}_display(e){if("string"!=typeof e&&(e=e.toString()),e=e.trim(),"undefined"!=typeof window){const t=document.createElement("DIV");t.innerHTML=e,e=t.firstChild}e=this._prepareNewEl(e),this.activeElement&&(this.removeCb(this.activeElement),this.root.removeChild(this.activeElement)),this.removeCb=this.selectedNode.onremove||(()=>{}),this.beforeAppendCb=this.selectedNode.onbeforeadded||(()=>{}),this.appendCb=this.selectedNode.onadded||(()=>{}),this.beforeAppendCb(e),this.activeElement=e,this.root.appendChild(e),this.appendCb(this.activeElement)}_getDOMNodeFromString(e,t){return e.parseFromString(t,"text/xml").documentElement}_getNodeAtPath(e,t){let r=e,i="";return t.forEach((e,t)=>{if(i+="/"+e,!r.hasOwnProperty("children")||!r.children.hasOwnProperty(e))throw new Error(`Path does not exist at "${i}"`);r=r.children[e]}),r}_prepareNewEl(e){return e.querySelectorAll&&Array.from(e.querySelectorAll("[treebox-href]")).forEach(e=>{const t=e.getAttribute("treebox-href");t&&!e.href&&(e.href="treebox: "+t),e.onclick=r=>{if(!r.metaKey&&!r.ctrlKey)return r.preventDefault(),e.blur(),this.navigate(t)}}),e}_prepareNodesChildren(e,t=[]){Object.keys(e.children).forEach(r=>{e.children[r].id=r;const i=t.concat(e.children[r].id);e.children[r].keyPath=i,e.children[r].hasOwnProperty("children")&&this._prepareNodesChildren(e.children[r],i)})}_pathToKeys(){return this.path.split("/").filter(e=>e)}navigate(e){return this.navigateCb({from:this.path,to:e}),this.path=e,this._activate()}}