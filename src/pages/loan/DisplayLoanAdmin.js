import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontSize: "13px"
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function DisplayLoanAdmin({ selectedLoan, setSelectedLoan }) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setSelectedLoan(null);
  }

  return (
    <div >
      <Modal
        isOpen={selectedLoan != null}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Loan Modal"
				id="display-loan-admin-container"
      >
				<h2>Loan Detail</h2>
        <table className="loan-display-table">
          <tbody>
            <tr>
              <td>User Name</td>
              <td>{selectedLoan?.user.name}</td>
            </tr>
            <tr>
              <td>Loan Status</td>
              <td>{selectedLoan?.status}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{selectedLoan?.user.email}</td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>{selectedLoan?.amount}</td>
            </tr>
            <tr>
              <td>Applied Date</td>
              <td>{new Date(selectedLoan?.createdAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Approved Date</td>
              <td>{selectedLoan?.approved_date && new Date(selectedLoan?.approved_date).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Approved by</td>
              <td>{selectedLoan?.approved_by?.name}</td>
            </tr>
            <tr>
              <td>Disbursed Date</td>
							<td>{selectedLoan?.disbursed_date && new Date(selectedLoan?.disbursed_date).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Disbursed by</td>
              <td>{selectedLoan?.disbursed_by?.name}</td>
            </tr>
          </tbody>
        </table>
        <button className="--btn --btn-primary" onClick={()=>setSelectedLoan(null)}>close</button>
      </Modal>
    </div>
  );
}
export default DisplayLoanAdmin;
