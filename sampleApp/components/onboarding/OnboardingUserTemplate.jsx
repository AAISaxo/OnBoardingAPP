import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Row, Col, Checkbox, Button, FieldGroup} from 'react-bootstrap';
import {forEach, map, isArray, forOwn} from 'lodash';

export default (props) => {
  var currentIndex = 0
  const formData = {
    documentType : '',
    renewalDate : '',
    title : '',
    selectDocument : '',
  };
  
  const submitForm = function(){
    forOwn(formData, (val, key) =>{
      formData[key] = val.value;
    });
    props.submitUserDetailsDocuments(formData);
  };

  const finalize = function(){
    forOwn(formData, (val, key) =>{
      formData[key] = val.value;
    });
    props.submitUserDetailsDocuments(formData);

  }

  return (
    <div>
      <Form horizontal>
          <FormGroup controlId="formControlsSelect">
           <Col componentClass={ControlLabel} sm={3}>
                Document Type
            </Col>
            <Col sm={4}>
              <FormControl componentClass="select" placeholder="select" inputRef={(input)=>{formData.documentType = input}}>
                <option value="select">select</option>
                <option value="powerOfAttorny">Power Of Attorny</option>
                <option value="proofOfIdentity">Proof Of Identity</option>
                <option value="proofOfResidency">Proof Of Residency</option>
                <option value="termsAndConditions">Terms And Conditions</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="renewalDateId">
              <Col componentClass={ControlLabel} sm={3}>
                Renewal Date
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Renewal Date" inputRef={(input) => { formData.renewalDate = input;}} />
              </Col>
          </FormGroup>

          <FormGroup controlId="titleId">
              <Col componentClass={ControlLabel} sm={3}>
                Title
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="title"  inputRef={(input) => { formData.title = input;}}/>
              </Col>
          </FormGroup>

          <FormGroup controlId="selectDocumentId">
              <Col componentClass={ControlLabel} sm={3}>
                Select Document
              </Col>
              <Col sm={4}>
                <FormControl type="file" inputRef={(input) => { formData.selectDocument = input;}}/>
              </Col>
          </FormGroup>

          <FormGroup>
              <Col smOffset={3} sm={6}>
                <Button type="submit" onClick={submitForm}>
                    Add More Documents
                </Button>
              </Col>
          </FormGroup>

          <FormGroup>
              <Col smOffset={3} sm={6}>
                <Button type="submit" onClick={finalize}>
                    Finalize
                </Button>
              </Col>
          </FormGroup>
        </Form>
    </div>
  );
};