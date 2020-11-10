class TreeBox {
  constructor({config = {}, nodes, root} = {}) {
    config = Object.assign({
      initialPath: '/',
      onnavigate: () => {},
    }, config);

    if (!nodes) {
      throw new Error('TreeBox: nodes not provided.');
    }

    if (!root) {
      throw new Error('TreeBox: root element not provided.');
    }

    this.config = config;
    this.root = root;

    this.nodes = nodes;
    this._prepareNodesChildren(this.nodes);

    this.activeElement = null;
    this.selectedNode = null;

    this.path = config.initialPath;

    this.navigateCb = config.onnavigate;
    this.navigate(config.initialPath);
  }

  /**
   */
  _activate() {
    const selectedNode = this._getNodeAtPath(this.nodes, this._pathToKeys());
    this.selectedNode = selectedNode;

    const {children, display} = selectedNode;

    if (display) {
      this._display(display);
      return true;
    } else if (children) {
      return children;
    } else {
      throw new Error('TreeBox: given path yields invalid result.');
    }
  }

  /**
   * @param {Node} el
   */
  _display(el) {
    if (typeof el !== 'string') {
      el = el.toString();
    }

    el = el.trim();

    if (typeof window !== 'undefined') {
      const div = document.createElement('DIV');
      div.innerHTML = el;
      el = div.firstChild;
    } // if SSR support is ever needed, xmldom can be used for server-side DOM parsing

    el = this._prepareNewEl(el);

    if (this.activeElement) {
      this.removeCb(this.activeElement);
      this.root.removeChild(this.activeElement);
    }

    this.removeCb = this.selectedNode.onremove || (() => {});
    this.beforeAppendCb = this.selectedNode.onbeforeadded || (() => {});
    this.appendCb = this.selectedNode.onadded || (() => {});

    this.beforeAppendCb(el);

    this.activeElement = el;
    this.root.appendChild(el);

    this.appendCb(this.activeElement);
  }

  /**
   * @param {Class} parser
   * @param {Node}
   */
  _getDOMNodeFromString(parser, el) {
    return parser.parseFromString(el, 'text/xml').documentElement;
  }

  /**
   * @param {Object} nodes
   * @param {Array} keyPath
   */
  _getNodeAtPath(nodes, keyPath) {
    let curr = nodes;
    let visitedStr = '';

    keyPath.forEach((id, index) => {
      visitedStr += `/${id}`;

      if (curr.hasOwnProperty('children') && curr.children.hasOwnProperty(id)) {
        curr = curr.children[id];
      } else {
        throw new Error(`Path does not exist at "${visitedStr}"`);
      }
    });

    return curr;
  }

  /**
   * @param {Node} el
   */
  _prepareNewEl(el) {
    if (el.querySelectorAll) {
      Array.from(el.querySelectorAll('[treebox-href]')).forEach(tbLink => {
        const tbHref = tbLink.getAttribute('treebox-href');

        if (tbHref && !tbLink.href) {
          tbLink.href = 'treebox: ' + tbHref;
        }

        tbLink.onclick = e => {
          if (e.metaKey || e.ctrlKey) return;

          e.preventDefault();
          tbLink.blur();
          return this.navigate(tbHref);
        };
      });
    }

    return el;
  }

  /**
   * @param {Object} nodes
   * @param {Array} currPath
   */
  _prepareNodesChildren(nodes, currPath = []) {
    Object.keys(nodes.children).forEach(key => {
      nodes.children[key].id = key;

      const keyPath = currPath.concat(nodes.children[key].id);
      nodes.children[key].keyPath = keyPath;

      if (nodes.children[key].hasOwnProperty('children')) {
        this._prepareNodesChildren(nodes.children[key], keyPath);
      }
    });
  }

  /**
   * @return {Array}
   */
  _pathToKeys() {
    return this.path.split('/').filter(x => x);
  }

  /**
   * @param {string} path
   * @return {Array}
   */
  navigate(path) {
    this.navigateCb({from: this.path, to: path});
    this.path = path;

    return this._activate();
  }
}

module.exports = TreeBox;
module.exports.default = TreeBox;
