'use strict';

import React from 'react/addons';
import ChartCard from './ChartCard.jsx';
import './_chartcard.scss';

import jasmine from 'jasmine';

 
let TestUtils = React.addons.TestUtils;

let data = {
		"_id": {
            "CreationTime": "/Date(1436894191000)/"
        },
	"ownerID": "06cf005f-8680-4eea-a8f6-154c624389dc",
	"chartType": "bar",
	"title": "barChart",
	"chartID": "55a543ef637ec460d6df2f1c"
 }

// Example
jasmine.getEnv().addReporter({jasmineDone: Example})

function Example(){
  let gridAnchor = document.createElement('div');
  gridAnchor.style.padding = '100px';
  gridAnchor.style.width = '80%';
  
  window.document.body.appendChild(gridAnchor); 


  React.render(

    <div className="mdl-cell mdl-cell--4-col">
      <ChartCard   cardInfo={data} />
    </div>, gridAnchor)   
}

