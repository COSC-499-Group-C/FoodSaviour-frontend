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
                        <p>By using this website, you agree to allow your information to be collected.</p>
                        <hr/>
                        <p>
                            This project gets you active and contributes to Canadian research about social
                            activities, exercise, wellness, and learning platforms in organizations. The
                            information you enter will be stored in a secure database that meets Canadian
                            privacy regulations. Only researchers and professionals will have access to the
                            information. If you have concerns, please contact UBC Behavioural Research Ethics
                            Council (BREB) about Barb Marcolin's study #H17-00851, or call her at 250-807-9637.
                            Faculty of Management, 'Developing Academic-Industry Fast Collaboration Integration
                            for Strategic Partners'. Please ask Barb Marcolin any further questions.
                        </p>
                        <a href="/consent.pdf">Link to digital version of paper consent</a>
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
