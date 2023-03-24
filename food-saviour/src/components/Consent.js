import React from "react";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from "mdb-react-ui-kit";

function Consent({ onConsent, onCancel }) {
    return (
        <MDBModal show>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <h5 className="modal-title">Consent</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <p>By clicking "I Agree," you consent to our Terms of Service and Privacy Policy.</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={onCancel}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={onConsent}>
                            I Agree
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default Consent;
