import React, { Component } from 'react';

import "../styles/button.scss";

export default class Button extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		let addonClasses = "";
		addonClasses += (this.props.medical === true) ? ' medical' : '';
		addonClasses += (this.props.alert === true) ? ' alert' : '';
		
		
		return (
			<div className={"lc button"+addonClasses} >
				<span>{this.props.children}</span>
				<div>{this.props.children}</div>
			</div>
		)
	}
}