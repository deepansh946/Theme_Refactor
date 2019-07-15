import React, { Component } from 'react';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

const TimeDayCall = ({ timeDayCall, updateTimeDayCall, updateValue }) => {
	const date = timeDayCall.value
		? moment(timeDayCall['value']).format('DD/MM/YYYY HH:MM:SS')
		: '';
	return (
		<div className="input-section p-float-label">
			<Calendar
				id="in"
				value={date}
				onChange={(e) => updateValue(e, 'businessInfo')}
				showTime={true}
				name={timeDayCall.name}
				hourFormat="12"
				minDate={new Date()}
				yearRange={'2019:2022'}
			/>
			<label htmlFor="in">Best Time & Day To Call</label>
		</div>
	);
};

export default React.memo(TimeDayCall);
