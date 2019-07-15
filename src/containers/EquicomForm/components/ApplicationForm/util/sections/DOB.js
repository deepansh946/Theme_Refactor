import React from 'react';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';
const DatePicker = ({
	DOB,
	fieldName,
	required,

	dateTemplate,
	updateValue,
	infoType,
}) => {
	const date = DOB.value ? moment(DOB['value']).format('DD/MM/YYYY') : '';
	return (
		<>
			<div className="input-section p-float-label p-datepicker-today">
				<Calendar
					value={date}
					onChange={(e) => updateValue(e, infoType)}
					yearRange={'1900:2019'}
					monthNavigator={true}
					yearNavigator={true}
					readOnlyInput={true}
					name={DOB.name}
					dateFormat="dd/mm/yy"
					showTime={false}
					utc={false}
					dateTemplate={dateTemplate}
					//dateTemplate={onDateTemplate}
				/>
				<label htmlFor="in">
					{' '}
					{fieldName}{' '}
					{required ? <span className="required-field">*</span> : null}
				</label>
			</div>
			{DOB.isError && DOB.required && (
				<span style={{ color: 'red' }}>{DOB.ErrorMsg}</span>
			)}
		</>
	);
};

export default DatePicker;
