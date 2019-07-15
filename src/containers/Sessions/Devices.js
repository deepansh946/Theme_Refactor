import React, { PureComponent } from 'react';
import { Button } from 'primereact/button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Table from '../../components/UI/Table';

import {
	GET_USER_DEVICE_SUCCESS,
	FORGOT_USER_DEVICE_SUCCESS,
	FORGOT_USER_ALL_DEVICE_SUCCESS,
} from '../../redux/constants/user_constant';
import {
	get_user_devices$,
	forgot_user_device$,
	forgot_user_all_device$,
} from '../../redux/effects/user_effects';

import { getFieldsAndValues } from '../../Utils/common';

class Devices extends PureComponent {
	async loadDevices() {
		const response = await this.props.get_user_devices$({
			action: 'listAllDevices',
			payload: {
				sessionId: this.props.sessionId,
				idToken: this.props.idToken,
			},
		});

		if (response.type === GET_USER_DEVICE_SUCCESS) {
			const { devices } = response.payload;

			const values =
				devices &&
				devices.map((device) => {
					return {
						deviceId: device,
						deviceName: `Test- ${device.substring(3, 17)}`,
						os: 'Windows',
						osVersion: '10',
					};
				});

			const fieldData = getFieldsAndValues({
				columns: this.state.columns,
				values: values || [],
			});

			this.setState({ fieldData, values });
		}
	}

	async forgotThisDevice(deviceId) {
		const response = await this.props.forgot_user_device$({
			action: 'forgetDevice',
			payload: {
				sessionId: this.props.sessionId,
				idToken: this.props.idToken,
				deviceId,
			},
		});
		if (response.type === FORGOT_USER_DEVICE_SUCCESS) {
			const { devices } = this.props;
			const values =
				devices &&
				devices.map((device) => {
					return {
						deviceId: device,
						deviceName: `Test- ${device.substring(3, 7)}`,
						os: 'Windows',
						osVersion: '10',
					};
				});
			this.setState({ values });
		}
	}

	forgotAllDevice = async () => {
		const response = await this.props.forgot_user_all_device$({
			action: 'forgetAllDevice',
			payload: {
				sessionId: this.props.sessionId,
				idToken: this.props.idToken,
			},
		});

		if (response.type === FORGOT_USER_ALL_DEVICE_SUCCESS) {
			const { devices } = this.props;
			const values = devices.map((device) => {
				return {
					deviceId: device,
					deviceName: `Test- ${device.substring(3, 7)}`,
					os: 'Windows',
					osVersion: '10',
				};
			});
			this.setState({ values });
		}
	};

	actionTemplate = (rowData) => {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					onClick={() => this.forgotThisDevice(rowData.deviceId)}
					type="button"
					label="Forgot Device"
					icon="fa fa-minus-square"
					className="p-button-danger"
					style={{ marginRight: '.5em' }}
				></Button>
			</div>
		);
	};

	columns = [
		{ field: 'deviceId', header: 'Device Id', sortable: true },
		{ field: 'deviceName', header: 'Device Name', sortable: true },
		{ field: 'os', header: 'Operating System', sortable: true },
		{ field: 'osVersion', header: 'Version', sortable: true },
		{ field: 'action', header: 'Action', body: this.actionTemplate },
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
		columns: this.columns,
		values: [],
	};

	// rows per page
	rowsPerPageOptions = [10, 50, 100];

	async componentDidMount() {
		if (this.props.devices && this.props.devices.length === 0) {
			this.loadDevices();
		} else {
			const { devices } = this.props;
			const values =
				devices &&
				devices.map((device) => {
					return {
						deviceId: device,
						deviceName: `Test- ${device.substring(3, 7)}`,
						os: 'Windows',
						osVersion: '10',
					};
				});

			const fieldData = getFieldsAndValues({
				columns: this.state.columns,
				values,
			});

			this.setState({ fieldData, values });
		}
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
		this.loadDevices();
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
			<>
				<Table
					columns={this.state.columns}
					values={this.state.values}
					rowsPerPageOptions={this.rowsPerPageOptions}
					valueUpdate={this.onValueUpdate}
					globalFilterFunc={true}
					globalFilter={this.state.globalSearch}
					refresh={true}
					reloadData={this.onReloadUpdate}
					colResize={true}
					colReorderFunc={true}
				/>
				{this.props.devices && this.props.devices.length ? (
					<Button
						className="p-button"
						label="Forgot All Devices"
						onClick={this.forgotAllDevice}
						style={{ marginTop: '35px' }}
					/>
				) : null}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state.UI,
		...state.USER,
		sessionId: state.AUTH.auth.sessionId,
		idToken: state.AUTH.auth.IdToken,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{ get_user_devices$, forgot_user_device$, forgot_user_all_device$ },
		dispatch,
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Devices);
