import React, { Component } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import LoanInfo from './LoanInfo/LoanInfo';
import './ApplicationForm.css';
import BusinessInfo from './employement-businessInfo/BusinessInfo';
import { Button } from 'primereact/button';
import PersonalInfo from './Personal_Info/PersonalInfo';
import SpouseInfo from './Spouse_Info/SpouseInfo';
//import OtherInfo from "../ApplicationForm/OtherInfo/OtherInfo";
import OtherInfo from './OtherInfo/OtherInfo';
import DocumentRequirementsInfo from './DocumentRequirementInfo/DocumentRequirementInfo';
import Buttons from '../../containers/Button';
import Undertaking from './Undertaking/Undertaking';
import InterestRateInfo from './InterestRatesInfo/InterestRateInfo';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

class ApplicationForm extends Component {
	constructor(props) {
		super(props);
		this.collapseAll = this.collapseAll.bind(this);
		this.expandAll = this.expandAll.bind(this);
		this.state = {
			activeIndex: [],
			isDataPopulated: props.openAll,
			count: 0,
		};
	}
	collapseAll() {
		this.setState({
			activeIndex: null,
		});
	}
	expandAll() {
		const activeIndex = [0, 1, 2, 3, 4, 5, 6, 7];
		this.setState({
			activeIndex,
		});
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		// console.log(this.props.openAll, nextProps.openAll);
		// console.log(this.state.activeIndex, nextState.activeIndex);

		// console.log(this.props === nextProps);

		if (this.props.openAll !== nextProps.openAll) {
			return true;
		} else if (this.state.activeIndex !== nextState.activeIndex) {
			return true;
		} else if (this.props !== nextProps) {
			return true;
		} else {
			return false;
		}
	};

	componentDidUpdate = async () => {
		if (this.state.count === 0 && this.props.openAll) {
			await this.setState({ isDataPopulated: this.props.openAll, count: 1 });
		}
		const { isDataPopulated } = this.state;
		// console.log(isDataPopulated);

		if (isDataPopulated) {
			const activeIndex = [0, 1, 2, 3, 4, 5, 6, 7];
			this.setState(
				{
					activeIndex,
					isDataPopulated: false,
				},
				() => {
					console.log('State Updated');
				},
			);
		}
	};

	render() {
		return (
			<div className="application-form">
				<h3>Personal Loan Application Form</h3>

				<div className="float-button-common">
					<Button
						style={{ padding: '0', marginBottom: '2px' }}
						label="+"
						className="p-button-raised float-button-2 btn-hack"
						onClick={this.expandAll}
						data-tip="Expand all tabs"
					/>
					<Button
						className="float-button-1 p-button-raised btn-hack"
						label="-"
						onClick={this.collapseAll}
						data-tip="Collapse All tabs"
					/>
					<ReactTooltip />
				</div>

				<div
					className="p-grid p-justify-end"
					style={{ paddingRight: 20, marginBottom: 15 }}
				/>
				<div className="p-grid">
					<div className="p-col-12">
						<Accordion
							multiple={true}
							activeIndex={this.state.activeIndex}
							onTabChange={(e) => this.setState({ activeIndex: e.index })}
							className="accordion--parent"
						>
							<AccordionTab header="My Loan Information" selected="true">
								<LoanInfo {...this.props.loanInfo} />
							</AccordionTab>
							<AccordionTab header="My Personal Information">
								<PersonalInfo {...this.props.personalInfo} />
							</AccordionTab>
							<AccordionTab header="My Employment/Business Information">
								<BusinessInfo {...this.props.businessInfo} />
							</AccordionTab>
							<AccordionTab header="My Spouse Information">
								<SpouseInfo {...this.props.spouseInfo} />
							</AccordionTab>
							<AccordionTab header="Other Information">
								<OtherInfo {...this.props.otherInfo} />
							</AccordionTab>
							<AccordionTab header="Undertaking">
								<Undertaking {...this.props.Undertaking} />
							</AccordionTab>
							<AccordionTab header="Document Requirements">
								<DocumentRequirementsInfo
									{...this.props.DocumentRequirementInfo}
								/>
							</AccordionTab>
							<AccordionTab header="Monthly Add-On Interest Rates & Fees And Charges">
								<InterestRateInfo />
							</AccordionTab>
						</Accordion>
					</div>
					<div />

					<Buttons style={{ textAlign: 'center' }} {...this.props.button} />
				</div>
			</div>
		);
	}
}

export default ApplicationForm;
