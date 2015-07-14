'use strict';

import React from 'react/addons';
import CKANGrid from './CKANGrid.jsx';

import jasmine from 'jasmine';

 
let TestUtils = React.addons.TestUtils;

let data = [
    
  ];

// Example
jasmine.getEnv().addReporter({jasmineDone: Example})

function Example(){
  let gridAnchor = document.createElement('div');
  gridAnchor.style.padding = '100px';
  gridAnchor.style.width = '80%';
  window.document.body.appendChild(gridAnchor); 
  React.render(<CKANGrid items={data} />, gridAnchor)   
}
