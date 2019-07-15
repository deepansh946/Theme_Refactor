import React, { PureComponent } from 'react';

import { Rating } from 'primereact/rating';

import './style.css';

class StarRating extends PureComponent {
	state = {
		rating: null,
	};

	render() {
		const { error, value, updateValue, name } = this.props;

		return (
			<div className="p-col-12">
				<span
					style={{
						display: 'flex',
					}}
				>
					<label className="label-title">Rating</label>
					<Rating
						name={name}
						value={value}
						cancel={false}
						onChange={(e) => updateValue(e)}
					/>
				</span>
				{error && <span className="error-text">{error}</span>}
			</div>
		);
	}
}

export default StarRating;
