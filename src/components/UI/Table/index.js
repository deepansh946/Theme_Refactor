import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import GlobalSearch from './GlobalSearch';
import FilterType from './FilterType';
import FormField from '../FormField';
import './style.css';

const generateFunctionalProps = (props) => {
	let functionalProps = {};

	Object.keys(props).map((key) => {
		if (key === 'globalFilterFunc' && props[key]) {
			functionalProps[key] = true;
			functionalProps['globalFilter'] = props.globalFilter;
		}

		if (key === 'crud' && props[key]) {
			functionalProps[key] = true;
			functionalProps['selectionMode'] = 'single';
			functionalProps['selection'] = props.selectedField;
			functionalProps['onSelectionChange'] = (e) => {
				props.updateSelectedItem(e.value);
			};
		}

		if (key === 'rowExpandFunc' && props[key]) {
			functionalProps[key] = true;
			functionalProps['expandedRows'] = props.expandedRow;
			functionalProps['rowExpansionTemplate'] = props.onRowExpansion;
			functionalProps['onRowToggle'] = props.onRowToggle;
		}

		if (key === 'colReorderFunc' && props[key]) {
			functionalProps[key] = true;
			functionalProps['reorderableColumns'] = true;
		}
	});

	return functionalProps;
};

const Table = (props) => {
	// dataTable element reference
	let dt = null;

	function onExportCSV() {
		dt.exportCSV();
	}

	// colOptions for ColToggle functionality
	let colOptions = [];

	if (props.colToggle) {
		for (let col of props.columnOptions) {
			colOptions.push({ label: col.header, value: col });
		}
	}

	// datatable header & footer
	const dataTableHeader = (
		<>
			{props.colToggle && (
				<MultiSelect
					value={props.columns}
					options={colOptions}
					onChange={(e) => props.onColumnToggle(e)}
					style={{ width: '250px' }}
					fixedPlaceholder={true}
					placeholder="Select Columns"
				/>
			)}
			{props.globalFilterFunc && (
				<GlobalSearch updateValue={props.valueUpdate} />
			)}
			{props.exportFunc && (
				<Button
					type="button"
					icon="pi pi-external-link"
					iconPos="left"
					label="CSV"
					onClick={onExportCSV}
				></Button>
			)}
		</>
	);

	const dataTableFooter = (
		<div className="p-clearfix" style={{ width: '100%' }}>
			{props.crud && (
				<Button
					style={{ float: 'left' }}
					label="Add"
					icon="pi pi-plus"
					onClick={props.addNewItem}
				/>
			)}
		</div>
	);

	// refreshButton
	const refreshButton = props.refresh ? (
		<Button icon="pi pi-refresh" onClick={props.reloadData} />
	) : null;

	// modal footer
	const modalFooter = (
		<div className="ui-dialog-buttonpane p-clearfix">
			{props.updateField && (
				<Button label="Delete" icon="pi pi-times" onClick={props.deleteItem} />
			)}
			<Button
				label="Save"
				icon="pi pi-check"
				onClick={props.updateField ? props.updateItem : props.saveItem}
			/>
		</div>
	);

	// functional props for DataTable
	const functionalProps = generateFunctionalProps(props);

	// dropdownChange
	const onDropdownChange = (e) => {
		dt.filter(e.value, e.target.name, 'equals');
		props.updateSelectedFilter(e.target.name, e.value);
	};

	// multiSelectChange
	const onMultiSelectChange = (e) => {
		dt.filter(e.value, e.target.name, 'in');
		props.updateSelectedFilter(e.target.name, e.value);
	};

	// Column Fields
	let columnFields = props.columns.map((col, i) => {
		return (
			<Column
				field={col.field}
				header={col.header}
				filter={col.filter}
				sortable={col.sortable}
				body={col.body}
				key={i}
				filterElement={FilterType(
					col.field,
					col.filterType,
					props.fieldData ? props.fieldData[col.field] : null,
					props.selectedFilters ? props.selectedFilters[col.field] : null,
					onDropdownChange,
					onMultiSelectChange,
				)}
			/>
		);
	});

	// Add Expander if functionality present
	if (props.rowExpandFunc && props.columns.length) {
		let expander = <Column expander={true} key="-1" className="expand-btn" />;
		columnFields.unshift(expander);
	}

	return (
		<div>
			<div className="content-section implementation">
				<DataTable
					ref={(el) => (dt = el)}
					value={props.values}
					globalFilter={props.globalFilter}
					paginator={true}
					paginatorLeft={refreshButton}
					rows={props.rowsPerPageOptions[0]}
					rowsPerPageOptions={props.rowsPerPageOptions}
					resizableColumns={props.colResize}
					responsive={true}
					header={dataTableHeader}
					footer={dataTableFooter}
					onPage={props.paginationUpdate}
					{...functionalProps}
				>
					{columnFields}
				</DataTable>
				{props.crud && (
					<Dialog
						visible={props.displayModal}
						className="table-modal"
						header={props.modalHeading}
						modal={true}
						footer={modalFooter}
						onHide={props.hideModal}
					>
						<form>
							<div className="p-grid">
								<div className="p-col-12">
									{Object.keys(props.formData).map((key, i) => {
										return (
											<div className="form-group" key={i}>
												<FormField
													updateValue={(e) => props.valueUpdate(e, true)}
													{...props.formData[key]}
												/>
											</div>
										);
									})}
								</div>
							</div>
						</form>
					</Dialog>
				)}
			</div>
		</div>
	);
};

export default React.memo(Table, (prevProps, nextProps) => {
	return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
