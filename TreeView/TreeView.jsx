import React from 'react';
import './style.scss';

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
    	return <svg className="tree-view-resource-type-icon" dangerouslySetInnerHTML={{__html: useTag }} />;
	}

	animateTitle(root, event){
		// Get all sub resources
		let nodes = event.target.parentNode.querySelectorAll('.tree-view-resource');
		
		for (var i = 0; i < nodes.length; i++) {
			if(root.open){
				Velocity(nodes[i],'reverse');
			} else {
				Velocity(nodes[i], {height:0, opacity:0},{duration:500, easing:'easeInQuad'})	
			}
			
		};
		root.open = !root.open;
	}

	createResources = (root) => {
		var onClick;
		var tree = []
		for (var i = 0; i < root.length; i++) {
			if(root[i].children){
				root[i].open = false;
				var onClick = this.animateTitle.bind(null, root[i])
			};
			tree.push(
				<div className="tree-view-resource">
					<span className="tree-view-resource-type">{this.createIcon(root[i].type)}</span>
					<span className="tree-view-resource-title" onClick={onClick}>{root[i].title}</span>
					{(root[i].children == undefined) ? null : this.createResources(root[i].children)}
				</div>
				)
		};
		return tree;
	}

	createChildren(child, i){
		return (<div key={i}>{child.title}</div>)
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

	componentWillMount(){
		this.validateRoot(this.props.root);
	}

	componentWillReceiveProps(nextProps) {
		this.validateRoot(nextProps.root);
	}
	render() {
 		let tree = this.createResources(this.props.root);
		return (
	    <ResizableBox className="tree-view mdl-card mdl-shadow--2dp" width={200} height={400} minConstraints={[200,300]}>
				<h3 className="tree-view-title">Resources</h3>
				<div className="tree-view-search mdl-textfield mdl-js-textfield">
					<input className="tree-view-search-box mdl-textfield__input" type="text"  />
					<label className="mdl-textfield__label" >Search</label>
				</div>
				<div ref='list' className="tree-view-resource-list">
					{tree}
				</div>
			</ResizableBox>
		
		);
	}
}