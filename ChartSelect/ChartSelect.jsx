import React from 'react';
import './styles.scss';
import slick from 'slick-carousel';


export default class ChartSelect extends React.Component {

	componentDidMount() {
		let carousel = React.findDOMNode(this.refs.carousel)
		let colorPicker = React.findDOMNode(this.refs.color);

		$(carousel).slick({
		  infinite: true,
		  slidesToShow: 3,
		  slidesToScroll: 3,
		  prevArrow: React.findDOMNode(this.refs.left),
		  nextArrow: React.findDOMNode(this.refs.right)
		});

		$(colorPicker).spectrum({
	    showPaletteOnly: true,
	    togglePaletteOnly: true,
	    togglePaletteMoreText: 'more',
	    togglePaletteLessText: 'less',
	    color: 'blanchedalmond',
	    palette: [
	        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
	        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
	        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
	        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
	        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
	        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
	        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
	        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
	    ]
		});
			componentHandler.upgradeDom();
	}

	setBar(event){
		console.log(event);
	}

	setLine(event){
		console.log(event);
	}

	setRadar(event){
		console.log(event);
	}

	setPolar(event){
		console.log(event);
	}

	render() {
		return (
			<div className="cht-sel">
				<div className="cht-sel-title">
					<h6>Chart Select</h6>
				</div>
				<div className="mdl-grid">
						<div className="cht-sel-carousel-buttons mdl-cell mdl-cell--1-col">
							<button ref="left" className="mdl-button mdl-js-button mdl-button--icon">
							  <i className="material-icons">keyboard_arrow_left</i>
							</button>
						</div>
						<div className="cht-sel-carousel mdl-cell mdl-cell--10-col" ref="carousel">
							<div className="cht-sel-carousel-type" onClick={this.setBar}>Bar</div>
							<div className="cht-sel-carousel-type" onClick={this.setLine}>Line</div>
							<div className="cht-sel-carousel-type" onClick={this.setRadar}>Radar</div>
							<div className="cht-sel-carousel-type" onClick={this.setPolar}>Polar</div>
						</div>
						
						<div className="cht-sel-carousel-buttons mdl-cell mdl-cell--1-col">						
							<button ref="right" className="mdl-button mdl-js-button mdl-button--icon">
							  <i className="material-icons">keyboard_arrow_right</i>
							</button>
						</div>
				</div>
				<div className="cht-sel-option mdl-grid">
					<h6 className="cht-sel-option-title">Axis Select</h6>
					<p>axis x</p>
					<p>axis y</p>
				</div>
				
				<div className="cht-sel-option mdl-grid">
					<h6 className="cht-sel-option-title">Colors</h6>
					<input ref="color"/>
				</div>

				<div className="cht-sel-option mdl-grid">
					<h6 className="cht-sel-option-title">Enable Legend</h6>
					<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-1">
  <input type="checkbox" id="switch-1" className="mdl-switch__input"  />
  <span className="mdl-switch__label"></span>
</label>
				</div>

			</div>
		);
	}
}
