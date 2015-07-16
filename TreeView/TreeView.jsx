import React from 'react';

import './_treeview.scss';
import {ResizableBox} from 'react-resizable';

import Velocity from 'Velocity';
 
export default class TreeView extends React.Component {

	static allowedTypes = ['int','float', 'text','date','time','timestamp','bool']

	constructor(props){
		super(props);
	}

	datatypeIcon(type){
		switch(type){

			case 'int': case 'float':
				return 'number';

			case 'text':
				return 'text';

			case 'bool':
				return 'bool';

			case 'date': case 'time': case 'timestamp':
				return 'time';

			case 'geo':
				return 'geo';

			default:
				return null;
		}
	}


	createIcon(type){
			let typeStr = this.datatypeIcon(type);
			if(typeStr == null){ return null;}
			// React doesnt support use tag yet.
			// http://stackoverflow.com/questions/26815738/svg-use-tag-and-reactjs
			var useTag = '<use xlink:href="icons/symbols.svg#datatype-' + typeStr +'"  />';
    	return <svg className="treev-res-type-icon" dangerouslySetInnerHTML={{__html: useTag }} />;
	}

	animateTitle(root, event){
		// Get all sub resources
		let nodes = event.target.parentNode.querySelectorAll('.treev-res');
		
		for (var i = 0; i < nodes.length; i++) {
			if(root.open){
				Velocity(nodes[i],'reverse');
			} else {
				Velocity(nodes[i], {height:0, opacity:0, margin:0},{duration:1000,  easing: [900, 40]})	
			}
			
		};
		root.open = !root.open;
	}

	parseTree(root, func){
		var queue = [],
        next = root;
    while (next) {
        if (next.children) {
            next.children.forEach((i, child) => {
                queue.push(child);
            });
        }
    		func(next);
        next = queue.shift();
    }
	}


	createResources = (root,id) => {
		var onClick;
		var tree = []
		for (var i = 0; i < root.length; i++) {
			root[i]._key = id++;
			root[i].open = false;	

			if(root[i].children){
				var onClick = this.animateTitle.bind(null, root[i])
			};
			tree.push(
				<div className="treev-res" key={root[i]._key}>
					<span className="treev-res-type">{this.createIcon(root[i].type)}</span>
					<span className="treev-res-title" onClick={onClick}>{root[i].title}</span>
					{	(root[i].children == undefined) ? 
							null : this.createResources(root[i].children,++id)
					}
				</div>
				)
		};
		return tree;
	}



	validateRoot = (root) => {
			for (var i = root.length - 1; i >= 0; i--) {
				
				if(root[i].title == undefined){
					throw new Error("The Treeview root prop has an invalid structure.\n \
					 One of the objects is missing a title property")
				}
				if(root[i].type == undefined){
					throw new Error("The Treeview root prop has an invalid structure.\n \
					 One of the objects is missing a type property")
				}
				// Check children nodes too
				if(root[i].children != undefined){
					this.validateRoot(root[i].children)
				}
			}
	}

	search = (event) => {
			let list = React.findDOMNode(this.refs.list);
			let elems = list.querySelectorAll('.treev-res-title');
			
			for (var i = elems.length - 1; i >= 0; i--) {
				if(event.target.value == "" || ~elems[i].innerText.indexOf(event.target.value) > -1){
					elems[i].classList.remove('treev-res-title__highlight');
				}  else{
					elems[i].classList.add('treev-res-title__highlight');
				}
			};
	}

	componentWillMount(){
		this.validateRoot(this.props.root);
	}

	componentDidMount() {
		let search = React.findDOMNode(this.refs.search);
		console.log(search);		
		componentHandler.upgradeDom();
	}

	componentWillReceiveProps(nextProps) {
		this.validateRoot(nextProps.root);
	}
	render() {
 		let tree = this.createResources(this.props.root,0);
		return (
	    <ResizableBox className="mdl-card mdl-shadow--2dp" width={200} height={400} minConstraints={[200, 200]}>
	    <div className="treev ">
	    <div className="treev-extras">
				<h3 className="treev-title">Resources</h3>
				<div ref="search" className="treev-search mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label">
					<label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search-expandable">
					<i className="material-icons">search</i>
					</label>
					<div className="mdl-textfield__expandable-holder">
						<input onChange={this.search} className="treev-search-box mdl mdl-textfield__input" type="text" id="search-expandable" />
						<label className="mdl-textfield__label" htmlFor="search-expandable">Find by name</label>
					</div>
				</div>
				</div>
			
				
				<div ref='list' className="treev-res-list">
					{tree}
				</div>
				</div>
			</ResizableBox>
		
		);
	}
}