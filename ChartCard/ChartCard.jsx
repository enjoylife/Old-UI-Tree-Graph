import React from 'react';

import './_chartcard.scss';




export default class ChartCard extends React.Component {

	static propTypes = {cardInfo: React.PropTypes.object  };

  onClick = () => {
  	console.log(this.props.chartID);
  }


  componentDidMount() {
				
		componentHandler.upgradeDom();
	}

	render() {
		let ci = this.props.cardInfo;

		let time = new Date(parseInt(ci._id.CreationTime.substr(6,13)))
		return (			
			<div className="cht-card mdl-card mdl-shadow--2dp demo-card-square">
			  <div className="mdl-card__title mdl-card--expand">
			    <h2 className="mdl-card__title-text">{ci.title}</h2>
			  </div>
			  <div className="cht-card-info mdl-card__supporting-text mdl-grid">
			   <span className="cht-card-type"><strong>Type:</strong> {ci.chartType}</span>
			    <span className="cht-card-time"><strong>Created:</strong>{time_ago(time)}</span>
			   
			  </div>
			  <div className="mdl-card__actions mdl-card--border">
			    <a onClick={this.onClick} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
			      View Chart
			    </a>
			  </div>
			</div>			
		);
	}
}

// Helper 
// http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function time_ago(time){

switch (typeof time) {
    case 'number': break;
    case 'string': time = +new Date(time); break;
    case 'object': if (time.constructor === Date) time = time.getTime(); break;
    default: time = +new Date();
}
var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
];
var seconds = (+new Date() - time) / 1000,
    token = 'ago', list_choice = 1;

if (seconds == 0) {
    return 'Just now'
}
if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
}
var i = 0, format;
while (format = time_formats[i++])
    if (seconds < format[0]) {
        if (typeof format[2] == 'string')
            return format[list_choice];
        else
            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
return time;
}