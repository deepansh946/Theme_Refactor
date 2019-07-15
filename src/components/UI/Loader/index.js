import React, { Component } from 'react';
import './style.css';

class Loader extends Component {
	componentDidMount() {
		if (this.props.className) {
			document.body.style.overflow = 'hidden';
		}
	}

	componentWillUnmount() {
		if (this.props.className) {
			document.body.style.overflow = 'visible';
		}
	}

	render() {
		return (
			<div className={`loader-screen ${this.props.className || null}`}>
				<div className="loader">
					<div className="bar1" />
					<div className="bar2" />
					<div className="bar3" />
					<div className="bar4" />
					<div className="bar5" />
					<div className="bar6" />
				</div>
			</div>
		);
	}
}

export default Loader;
