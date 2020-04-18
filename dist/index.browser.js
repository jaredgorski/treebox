 export default class TreeBox { constructor({config = {}, nodes, root} = {}) { if (!nodes) { throw new Error('TreeBox: nodes not provided.'); } if (!root) { throw new Error('TreeBox: root element not provided.'); } this.nodes = nodes; this.root = root; this.activeNode; this._prepareNodesChildren(this.nodes); } _activate(keyPath) { const {children, display} = this._getNodeAtPath(this.nodes, keyPath); if (display) { this._display(display); return true; } else if (children) { return children; } else { throw new Error('TreeBox: given path yields invalid result.'); } } _display(el) { if (typeof el === 'string') { if (typeof window !== 'undefined') { const div = document.createElement('DIV'); div.innerHTML = el; el = div.firstChild; } } if (this.activeNode) { this.root.removeChild(this.activeNode); } this.activeNode = el; this.root.appendChild(el); } _getDOMNodeFromString(parser, el) { return parser.parseFromString(el, 'text/xml').documentElement; } _getNodeAtPath(nodes, keyPath) { let curr = nodes; let visitedStr = ''; keyPath.forEach((id, index) => { visitedStr += `/${id}`; if (curr.hasOwnProperty('children') && curr.children.hasOwnProperty(id)) { curr = curr.children[id]; } else { throw new Error(`Path does not exist at "${visitedStr}"`); } }); return curr; } _prepareNodesChildren(nodes, currPath = []) { Object.keys(nodes.children).forEach(key => { nodes.children[key].id = key; const keyPath = currPath.concat(nodes.children[key].id); nodes.children[key].keyPath = keyPath; if (nodes.children[key].hasOwnProperty('children')) { this._prepareNodesChildren(nodes.children[key], keyPath); } }); } _pathToKeys(path) { return path.split('/').filter(x => x); } navigate(path) { return this._activate(this._pathToKeys(path)); } } 