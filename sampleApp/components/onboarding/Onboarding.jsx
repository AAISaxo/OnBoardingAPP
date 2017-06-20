import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import { forEach, find } from 'lodash';
import OnboardingTemplate from './OnboardingTemplate';
import OnboardingUserTemplate from './OnboardingUserTemplate';
import API from './../utils/API';
class Onboarding extends React.PureComponent {
	constructor (props) {
		super();
    this.signupRequestParams = {
			AccountInformation : {
				CurrencyCode: "test",
  				IntendedCommissionGroupId: "test",
  				IntendedTemplateId: "test",
  				OtherInstructions: "test"
			},
			PersonalInformation : {
				CityOfBirth: "test",
  				ContactInformation: {
    				EmailAddress: "test",
    				PrimaryPhoneNumber: {
      					CountryCode: "test",
      					Number: "test"
    				},
    				SecondaryPhoneNumber: {
      					CountryCode: "test",
      					Number: "test"
    				}	
  				},
  				EmploymentInformation: {
    				EmployerName: "test",
    				OccupationTypes: [
      					"test"
    				],
    				Position: "test"
  				},
  				FirstName: "test",
  				LastName: "test",
  				ResidentialAddress: {
    				BuildingName: "test",
    				BuildingNumber: "test",
    				City: "test",
    				CountryOfResidenceCode: "test",
    				PostalCode: "test",
    				State: "test",
    				StreetName: "test"
  				},
  				ServiceLanguageCode: "test"
			},
			ProfileInformation : {
				AnnualIncomeInformation: {
    				AnnualSalaryAfterTax: "test",
    				SecondarySourcesOfIncome: [
      					"test"
    				],
   		 			SecondarySourcesOfIncomeTotal: "test"
  				},
  				InvestableAssets: {
    				IntendToInvest: "test",
    				PrimarySourcesOfWealth: [
      					"test"
    				],
    				ValueOfCashAndSecurities: "test"
 				 }	
			},
			RegulatoryInformation : {
				FatcaDeclaration: {
    				UnitedStatesCitizen: true,
    				UnitedStatesTaxId: "test",
    				UnitedStatesTaxLiable: false
  				}
			}
		};

    this.attachUserDocumentsParams = {
        DocumentType : 'test',
        RenewDate : '',
        SignUpId : '',
        Title : ''
    }

    this.state = {
      userDetailsSubmitted : false,
      signupId : ''
    }
	}

	componentWillMount() {
		
	}

  populateSignUpRequestParams(data) {
    this.signupRequestParams.PersonalInformation.FirstName = data.FirstName;
    this.signupRequestParams.PersonalInformation.LastName = data.lastName;
    this.signupRequestParams.PersonalInformation.ContactInformation.PrimaryPhoneNumber.Number = data.primaryPhoneNumber;
    this.signupRequestParams.PersonalInformation.ContactInformation.SecondaryPhoneNumber.Number = data.secondaryPhoneNumber;
    this.signupRequestParams.PersonalInformation.ContactInformation.EmailAddress = data.email;

    // TODO : fill request param using a map
  }

  populateAttachDocumentRequestParams(data){
    this.attachUserDocumentsParams.DocumentType = data.documentType;
    this.attachUserDocumentsParams.RenewDate =  data.renewDae;
    this.attachUserDocumentsParams.SignUpId = this.state.signupId;
    this.attachUserDocumentsParams.Title = data.title;
  }

	submitUserDetailsSuccessCallback(response){
    this.setState({userDetailsSubmitted : true, signUpId : response.SignUpId});
  }

  submitUserDetailsHandler(data){
		console.log("In handler")
		console.log(data);
    /*this.populateSignUpRequestParams(data);*/
    API.attachUserDocuments(this.attachUserDocumentsParams, this.submitUserDetailsSuccessCallback, this.errorCallback);
    this.setState({userDetailsSubmitted : true})

	}

  errorCallback(){
    alert("Error in submitting form");
  }

  attachUserDocumentSuccessCallback(data){
    console.lo
  }

  submitUserDetailsDocuments(data) {
      console.log("In attach document handler");
      console.log(data);
      /*this.populateAttachDocumentRequestParams();*/
      API.signupUser(this.signupRequestParams, this.attachUserDocumentSuccessCallback, this.errorCallback);
  }

  renderOnboardingForm(){
    if(this.state.userDetailsSubmitted){
      return <OnboardingUserTemplate submitUserDetailsDocuments={this.submitUserDetailsDocuments.bind(this)}/>
    }else{
      return <OnboardingTemplate submitUserDetailsHandler = {this.submitUserDetailsHandler.bind(this)}/>
    }
  }
	render() {
		return (
			<div className='pad-box'>
				{this.renderOnboardingForm()}
			</div>
		);
	}
}
export default bindHandlers(Onboarding);