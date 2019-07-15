import React, { PureComponent } from 'react';
import Table from '../components/UI/Table';
import { getFieldsAndValues } from '../Utils/common';
import { SampleForm } from '../Utils/formStructure';

class SampleTableContainer extends PureComponent {
	columns = [
		{ field: 'vin', header: 'Vin' },
		{ field: 'year', header: 'Year' },
		{ field: 'brand', header: 'Brand' },
		// filter:true
		// sortable:true
		// filterType: 'multiselect','dropdown
	];

	state = {
		globalSearch: '',
		fieldData: {},
		selectedFilters: {},
		selectedField: {},
		expandedRow: null,
		displayModal: false,
		updateField: false,
		formData: {
			...SampleForm,
		},
		columns: this.columns,
		values: [
			{
				brand: 'Audi',
				vin: 'Jay',
				year: '1995',
				color: 'Brown',
			},
			{
				brand: 'BMW',
				vin: 'Ashish',
				year: '1996',
				color: 'White',
			},
			{
				brand: 'Fiat',
				vin: 'Deepansh',
				year: '1997',
				color: 'Black',
			},
			{
				brand: 'Honda',
				vin: 'Dikshit',
				year: '1995',
				color: 'Green',
			},
		],
	};

	// rows per page
	rowsPerPageOptions = [10, 50, 100];

	componentDidMount() {
		// console.log(this.columnOptions);
		const fieldData = getFieldsAndValues({
			columns: this.state.columns,
			values: this.state.values,
		});

		const selectedFilters = {
			brand: 'Audi',
			color: null,
		};

		this.setState({ fieldData, selectedFilters });
	}

	updateSelectedFilter = (field, value) => {
		const selectedFilters = { ...this.state.selectedFilters };
		selectedFilters[field] = value;
		this.setState({
			selectedFilters,
		});
	};

	createExpansionTemplate = (data) => <p>{JSON.stringify(data)}</p>;

	onValueUpdate = (e, form = false) => {
		if (form) {
			const formData = { ...this.state.formData };
			formData[e.target.name].value = e.target.value;
			this.setState({
				formData,
			});
		} else {
			this.setState({
				[e.target.name]: e.target.value,
			});
		}
	};

	onColumnToggle = (e) => {
		console.log(e);
		this.setState({ columns: e.value });
	};

	onReloadUpdate = () => {
		alert('RELOAD DATA');
	};

	onSaveItem = () => {
		alert('Save Item');
	};

	onUpdateItem = () => {
		alert('UpdateItem');
	};

	onPaginationUpdate = (e) => {
		alert('Pagination Update');
	};

	render() {
		/**
		 * Table
		 * @required ["columns","rowsPerPageOptions"]
		 */
		return (
			<Table
				columns={this.state.columns}
				values={this.state.values}
				rowsPerPageOptions={this.rowsPerPageOptions}
				valueUpdate={this.onValueUpdate}
				// // for filter
				// fieldData={this.state.fieldData}
				// selectedFilters={this.state.selectedFilters}
				// updateSelectedFilter={this.updateSelectedFilter}
				// paginationUpdate={this.onPaginationUpdate}
				// // for global search
				globalFilterFunc={true}
				globalFilter={this.state.globalSearch}
				// // for reload
				// refresh={true}
				// reloadData={this.onReloadUpdate}
				// // for crud
				crud={true}
				formData={this.state.formData}
				selectedField={this.state.selectedField}
				updateSelectedItem={(data) => {
					const formData = { ...this.state.formData };

					// update values in formData
					for (let key in formData) {
						formData[key].value = data[key];
					}

					this.setState({
						selectedField: data,
						displayModal: true,
						updateField: true,
						formData,
					});
				}}
				addNewItem={() => {
					this.setState({
						updateField: false,
						displayModal: true,
					});
				}}
				updateField={this.state.updateField}
				displayModal={this.state.displayModal}
				modalHeading={this.state.updateField ? 'Update' : 'Add'}
				hideModal={() => {
					const formData = { ...this.state.formData };

					// reset values in formData
					for (let key in formData) {
						formData[key].value = '';
					}

					this.setState({
						displayModal: false,
						updateField: false,
						formData: { ...formData },
						selectedField: {},
					});
				}}
				saveItem={this.onSaveItem}
				updateItem={this.onUpdateItem}
				// for colToggle
				colToggle={true}
				onColumnToggle={this.onColumnToggle}
				columnOptions={this.columns}
				// for colResize
				colResize={true}
				// for export
				exportFunc={true}
				onExportTable={this.onExportTable}
				// for rows expand
				rowExpandFunc={true}
				expandedRow={this.state.expandedRow}
				onRowExpansion={this.createExpansionTemplate}
				onRowToggle={(e) => this.setState({ expandedRow: e.data })}
				// for col reorder
				colReorderFunc={true}
			/>
		);
	}
}

export default SampleTableContainer;
