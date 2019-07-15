import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';

const FilterType = (
	field,
	filterType,
	filterData,
	currentValue,
	onDropDownChange,
	onMultiSelectChange,
) => {
	let filterField = null;

	switch (filterType) {
		case 'dropdown': {
			filterField = (
				<Dropdown
					name={field}
					style={{ width: '100%' }}
					value={currentValue}
					options={filterData}
					onChange={(e) => onDropDownChange(e)}
				/>
			);
			break;
		}
		case 'multiselect': {
			filterField = (
				<MultiSelect
					name={field}
					style={{ width: '100%' }}
					value={currentValue}
					options={filterData}
					onChange={(e) => onMultiSelectChange(e)}
				/>
			);
			break;
		}
		default:
			filterField = null;
			break;
	}

	return filterField;
};

export default FilterType;
