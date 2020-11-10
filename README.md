<div align="right">
  <img alt="npm" src="https://img.shields.io/npm/v/treeboxjs">&nbsp;
  <img alt="David" src="https://img.shields.io/david/jaredgorski/treebox">&nbsp;
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/treeboxjs">
</div>

<div align="center">
  <h1>
    treebox
  </h1>
</div>

#### [See a live example on CodePen](https://codepen.io/jaredgorski/pen/XWmKVPQ)

<div align="center">
  <h2>
    Install
  </h2>
</div>

```
npm i treeboxjs
```

<div align="center">
  <h2>
    Import
  </h2>
</div>
<h3>
  External JS with NPM:
</h3>

```js
  import TreeBox from 'treeboxjs';

  ...
```

<h3>
  ES6 module:
</h3>

```js
  <script type="module">
    import TreeBox from 'path-to-module/dist/index.js';
    
    ...
```

<div align="center">
  <h2>
    Use
  </h2>
</div>

```js
import TreeBox from 'treeboxjs';

const nodes = {
  display: `<h1>treebox example</h1>`, // This will display by default when treebox is rendered
  children: {
    directory: {
      children: {
        file: {
          display: `<p>A file</p>`,
        },
      },
    },
    file: {
      display: `
        <div>
          <p>Another file</p>
          <p>Multiple elements must be wrapped in a single enclosing element</p>
          <a treebox-href="/directory/file">Link to /directory/file within treebox</a>
        </div>
      `,
    },
  },
};

const root = document.getElementById('myTreeBoxRoot');

const tb = new TreeBox({nodes, root}); // Initiate treebox and append it to the "root" element

tb.navigate('/file'); // This code will cause treebox to render the `display` HTML at `nodes.children.file`
tb.navigate('/directory/file'); // This code will cause treebox to render the `display` HTML at `nodes.children.directory.children.file`
tb.navigate('/'); // This code will cause treebox to render the `display` HTML at `nodes.children`
```
