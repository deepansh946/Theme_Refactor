import React from 'react';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

/**
 * 
 *let message = "2020-02-19T18:30:00.000Z";

const rest = message.slice(0, 10);
console.log(rest);

 */

const MonthYearCal = ({
	DOB,
	fieldName,
	dateTemplate,
	updateValue,
	infoType,
}) => {
	const date = DOB.value ? moment(DOB['value']).format('DD/MM/YYYY') : '';
	return (
		<>
			<div className="input-section p-float-label">
				<Calendar
					value={date}
					onChange={(e) => updateValue(e, infoType)}
					monthNavigator={true}
					yearNavigator={true}
					yearRange={'2019:3000'}
					readOnlyInput={true}
					name={DOB.name}
					dateTemplate={dateTemplate}

					//dateTemplate={onDateTemplte}
				/>
				<label htmlFor="in"> {fieldName}</label>
			</div>
		</>
	);
};
export default React.memo(MonthYearCal);
