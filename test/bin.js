#!/usr/bin/env node
const TreeBox = require('../index.js');
const SDOMParser = require('xmldom').DOMParser;

const nodes = {
  label: 'index',
  display: `<h1>A heading 1</h1>`,
  children: {
    directory: {
      label: 'directory',
      children: {
        subfile: {
          label: 'subfile',
          display: `<p>A paragraph</p>`,
        },
        subfile2: {
          label: 'subfile2',
          display: `<span>A span</span>`,
        },
      },
    },
    file: {
      label: 'file',
      display: `<h2>A heading 2</h2>`,
    },
  },
};

const root = new SDOMParser().parseFromString('<ul class="blahblah"><li>This is already here</li></ul>').documentElement;

const tb = new TreeBox({nodes, root});
tb.navigate('directory/subfile');

console.log('Result: ', root.toString());
