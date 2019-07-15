import React from 'react';
import { Static } from './sections/index';
import { TextField, DatePicker } from '../util/sections/index';

const Undertaking = (props) => {
	const {
		borrowerSignatureAbovePrintedName,
		dateUndertaking,
		updateValue,
	} = props;

	return (
		<div className="p-grid p-justify-around">
			<div className="p-col-12 p-md-12 p-sm-12">
				<Static />
			</div>
			<div className="p-col-12 p-md-6 p-sm-12">
				<TextField
					nameT={borrowerSignatureAbovePrintedName}
					updateValue={updateValue}
					fieldname={'Borrower Signature Above Printed Name'}
					infoType={'undertaking'}
					// maxlength={360}
					// id="businessAddress"
				/>
			</div>
			<div className="p-col-12 p-md-4 p-sm-12">
				<DatePicker
					DOB={dateUndertaking}
					updateValue={updateValue}
					fieldName={'Date'}
					infoType={'undertaking'}
				/>
			</div>
		</div>
	);
};
export default Undertaking;
