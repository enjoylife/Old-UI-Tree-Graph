import React from 'react';

import './grid.scss';

export default class CKANGrid extends React.Component {
	createItem(item,i){
		return (
			<div className="mdl-card mdl-shadow--2dp demo-card-wide">
			  <div className="mdl-card__title mdl-card--expand">
			    <h2 className="mdl-card__title-text" >Data Set Name</h2>
			  </div>
			  <div className="mdl-card__supporting-text">
			    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			    Mauris sagittis pellentesque lacus eleifend lacinia...
			    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			    Mauris sagittis pellentesque lacus eleifend lacinia...
			  </div>
			  <div className="mdl-card__actions mdl-card--border">
			    <a className="mdl-button mdl-js-button  mdl-js-ripple-effect">Edit</a>
			    <a className="mdl-button  mdl-js-button mdl-js-ripple-effect">Info</a>
			  </div>
			  <div className="mdl-card__menu">
			    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
			      <i className="material-icons">cloud_upload</i>
			    </button>
			  </div>
			</div>
)
	}

	componentDidMount() {
		let search = React.findDOMNode(this.refs.grid);
		console.log(search);		
		componentHandler.upgradeDom();
	}

	render() {
		return (
			<div className="ck-grid-container" ref="grid">
				<ul className="ck-grid">
					{this.createItem()}
					{this.createItem()}
				</ul>
			</div>
		);
	}
}
