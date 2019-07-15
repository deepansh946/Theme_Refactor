import React, { PureComponent } from 'react';
import './style.css';

class ContentHeader extends PureComponent {
	render() {
		const { heading, subHeading } = this.props;
		return (
			<div className="p-col-12">
				{heading && <h2>{heading}</h2>}
				{subHeading && <p className="subHeading">{subHeading}</p>}
			</div>
		);
	}
}

export default ContentHeader;
