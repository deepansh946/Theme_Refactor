import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import './style.css';

const CountryCode = ({ selectedCountry, updateCountryCode }) => {
	let codes = [
		{
			country: 'IN',
			code: '+91',
			flag: 'assets/flags/in.png',
		},
		{
			country: 'SG',
			code: '+65',
			flag: 'assets/flags/sg.png',
		},
		{
			country: 'PH',
			code: '+63',
			flag: 'assets/flags/ph.png',
		},
	];

	// labels
	const options = codes.map((item) => {
		return { label: item.country, value: item.code };
	});

	// get Image from code
	const getFlagFromCode = (code) => {
		return codes.filter((country) => country.code === code)[0].flag;
	};

	// flag Template
	const flagTemplate = (option) => {
		if (!option.value) {
			return option.label;
		} else {
			return (
				<div style={{ position: 'relative' }} className="p-clearfix">
					<img
						alt={option.label}
						src={getFlagFromCode(option.value)}
						style={{
							display: 'inline-block',
							margin: '10px 0 0 5px',
							float: 'right',
							right: '5px',
							top: '-5px',
						}}
						width="24"
					/>
					<span style={{ margin: '.5em .25em 0 0' }}>{option.label}</span>
				</div>
			);
		}
	};

	return (
		<div className="dropdown-flag--group">
			<Dropdown
				value={selectedCountry}
				options={options}
				onChange={updateCountryCode}
				itemTemplate={flagTemplate}
			/>
			<img src={getFlagFromCode(selectedCountry)} alt={selectedCountry} />
		</div>
	);
};

export default React.memo(CountryCode, (prevProps, nextProps) => {
	return prevProps.selectedCountry === nextProps.selectedCountry;
});
