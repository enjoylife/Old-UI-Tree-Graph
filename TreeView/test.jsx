'use strict';

import React from 'react/addons';
import TreeView from './TreeView.jsx';

import jasmine from 'jasmine';

 
let TestUtils = React.addons.TestUtils;

let data = [
    {
      title:'Test Data Set',
      type: 'csv',
      children: [
        {
          title: 'id',
          type:'int'
        },
        {
          title: 'first name',
          type:'text'
        },
        {
          title:'byHour',
          type:'time'
        }
        
      ]

    },
    {
      title: 'Random Extra Long Data Set',
      type: 'xlsx',
      children: [
        {
          title: 'month',
          type: 'date'
        },
        {
          title: 'exactTime',
          type:'timestamp'
        },
        {
          title:'isDone',
          type: 'bool'
        },
        {
          title: 'city with really longabcdefghijk',
          type: 'geo'
        }
      ]
    }
  ];

// Example
jasmine.getEnv().addReporter({jasmineDone: Example})

function Example(){
  let treeAnchor = document.createElement('div');
  treeAnchor.style.padding = '100px';
  window.document.body.appendChild(treeAnchor); 
  React.render(<TreeView root={data} />, treeAnchor)   
}



describe('TreeView', () => {
  
  let component;
  
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<TreeView root={data} />)
  let result = shallowRenderer.getRenderOutput();

  beforeEach(() => {  
    component = TestUtils.renderIntoDocument(<TreeView root={data} />)
    console.log([React.findDOMNode(component.refs.list)])
  });
 
  it('Resource list should have correct top level nodes', () => {
    expect(React.findDOMNode(component.refs.list).childElementCount).toEqual(data.length);
  });
});