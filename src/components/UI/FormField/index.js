import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import './style.css';

const ViewPassword = ({ viewPassword, toggleViewPassword, target }) => (
	<span
		style={{
			position: 'absolute',
			fontSize: '12px',
			right: '5px',
			padding: '15px 10px',
			borderRadius: '3px',
			color: '#a9a9a9',
		}}
		onClick={() => toggleViewPassword(target)}
	>
		{' '}
		<i className={viewPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} />{' '}
	</span>
);

const FormField = (props) => {
	const {
		type,
		label,
		name,
		value,
		valid,
		updateValue,
		min,
		max,
		size,
	} = props;

	let formField = null;
	let backspace = false;

	switch (type) {
		case 'mask': {
			formField = (
				<span className="p-float-label">
					<InputMask
						id={name}
						name={name}
						mask={props.mask}
						value={value}
						className={!valid ? 'invalid-field' : ''}
						onChange={(e) => updateValue(e)}
					/>
					<label htmlFor="name">{label} </label>
				</span>
			);
			break;
		}

		case 'password': {
			formField = (
				<span className="p-float-label">
					{props.showPasswordFunc && props.viewPassword ? (
						<InputText
							id={name}
							name={name}
							value={value}
							autoComplete="off"
							className={!valid ? 'invalid-field' : ''}
							onBlur={
								props.blurValidate
									? (e) => props.blurValidate(e.target.name)
									: null
							}
							onChange={(e) => updateValue(e)}
						/>
					) : (
						<Password
							id={name}
							feedback={props.feedback}
							name={name}
							className={!valid ? 'invalid-field' : ''}
							value={value}
							onBlur={
								props.blurValidate
									? (e) => props.blurValidate(e.target.name)
									: null
							}
							onChange={(e) => updateValue(e)}
						/>
					)}
					{props.showPasswordFunc && (
						<ViewPassword
							target={name}
							viewPassword={props.viewPassword}
							toggleViewPassword={props.toggleViewPassword}
						/>
					)}
					<label htmlFor={name}>{label}</label>
				</span>
			);
			break;
		}

		case 'checkbox': {
			formField = (
				<>
					<Checkbox
						inputId={name}
						name={name}
						value={value}
						onChange={(e) => updateValue(e)}
						checked={Boolean(value)}
					/>
					<label
						style={{
							position: 'relative',
							marginLeft: '5px',
							color: '#898989',
						}}
						htmlFor={name}
					>
						{' '}
						{label}
						<Button
							type="button"
							className="tooltip-btn"
							icon="fa fa-info-circle"
							tooltip={props.tooltip}
							tooltipOptions={{ position: 'bottom' }}
							style={{
								background: 'transparent',
								position: 'absolute',
								paddingTop: '3px',
								color: '#a9a9a9',
								width: '0',
								height: '0',
								bottom: '0',
								padding: '10px 12px',
								outline: 'none',
								border: 'none',
							}}
						/>
					</label>
				</>
			);
			break;
		}

		case 'dropdown': {
			formField = (
				<Dropdown
					id={name}
					className={props.classes}
					name={name}
					value={value}
					options={props.options}
					onChange={(e) => updateValue(e)}
					placeholder={label}
					optionLabel={props.optionLabel}
				/>
			);
			break;
		}

		case 'textarea': {
			formField = (
				<>
					<InputTextarea
						className="p-inputtextarea"
						name={name}
						id={name}
						placeholder={label}
						autoResize={true}
						maxLength={150}
						rows={props.rows}
						cols={props.cols}
						value={value}
						onChange={(e) => updateValue(e)}
					/>
				</>
			);
			break;
		}

		case 'number': {
			formField = (
				<>
					<span className="p-float-label">
						<InputText
							id={name}
							name={name}
							value={value}
							className={!valid ? 'invalid-field' : ''}
							onBlur={
								props.blurValidate
									? (e) => props.blurValidate(e.target.name)
									: null
							}
							min={min}
							max={max}
							type={type === 'number' ? 'number' : ''}
							onChange={(e) => updateValue(e)}
							size={size}
						/>
						<label htmlFor={name}>{label}</label>
					</span>
				</>
			);
			break;
		}
		default: {
			formField = (
				<span className="p-float-label">
					<InputText
						id={name}
						name={name}
						value={value}
						className={!valid ? 'invalid-field' : ''}
						onBlur={
							props.blurValidate
								? (e) => props.blurValidate(e.target.name)
								: null
						}
						onKeyDown={
							props.onlyNumber ? (e) => (backspace = e.keyCode === 8) : null
						}
						onChange={(e) => {
							if (props.onlyNumber) {
								const pattern = /^[0-9\b]+$/;
								const value = e.target.value;
								if (pattern.test(value) || backspace) {
									updateValue(e);
								}
							} else {
								return updateValue(e);
							}
						}}
						maxLength={props.maxLength || null}
						minLength={props.minLength || null}
					/>
					<label htmlFor={name}>{label}</label>
				</span>
			);
		}
	}

	return formField;
};

export default React.memo(FormField);
