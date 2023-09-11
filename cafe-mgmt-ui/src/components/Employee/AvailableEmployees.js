import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../UI/Table";
import {
  fetchAllEmployees,
  createNewEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../api";
import Card from "../UI/Card";

import CustomButton from "../UI/CustomButton";
import EmployeeFormModal from "./Form/EmployeeFormModal";
import { useRef } from "react";
import Alert from "@mui/material/Alert";
import EmployeesActionRenderer from "./Helpers/EmployeesActionRenderer";
import Modal from "../UI/Modal";
const AvailableEmployees = () => {
  const params = useParams();
  const [employees, setEmployees] = useState([]);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [header, setHeader] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [message, setMessage] = useState("");
  const employeeNameRef = useRef(null);
  const emailAddressRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const genderMaleRef = useRef(null);
  const genderFemaleRef = useRef(null);
  const genderOtherRef = useRef(null);
  const cafeRef = useRef(null);
  const defaultGenderRef = useRef(null);
  const idRef = useRef(null);

  const inputRefs = {
    employeeNameRef: employeeNameRef,
    emailAddressRef: emailAddressRef,
    phoneNumberRef: phoneNumberRef,
    genderMaleRef: genderMaleRef,
    genderFemaleRef: genderFemaleRef,
    genderOtherRef: genderOtherRef,
    cafeRef: cafeRef,
    defaultGenderRef: defaultGenderRef,
    idRef: idRef,
  };

  const getAllEmployees = () => {
    fetchAllEmployees(params.id)
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setHttpError(err.message);
      });
  };

  const deleteEmployeeHandler = (id) => {
    setShowConfirmationModal(true);
    setDeleteEmployeeId(id);
  };

  const confirmDelete = () => {
    deleteEmployeeRecord(deleteEmployeeId);
  };

  const deleteEmployeeRecord = (id) => {
    let payload = {
      id: id,
    };

    deleteEmployee(payload)
      .then((data) => {
        setMessage(data);
        getAllEmployees();
        setShowConfirmationModal(false);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setDeleteEmployeeId(null);
  };

  const editEmployeeHandler = (data) => {
    setHeader("Edit Employee");
    setShowForm(true);

    employeeNameRef.current = data.name;
    emailAddressRef.current = data.email_address;
    phoneNumberRef.current = data.phone_number;
    defaultGenderRef.current = data.gender;
    cafeRef.current = data?.cafe_id ? data.cafe_id : null;
    idRef.current = data.id;
  };

  const columnDefs = [
    { headerName: "Employee id", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email address", field: "email_address" },
    { headerName: "Phone number", field: "phone_number" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Days worked", field: "days_worked" },
    { headerName: "Assigned  Café", field: "cafe_name" },
    {
      headerName: "Actions",
      cellRenderer: EmployeesActionRenderer,
      cellRendererParams: {
        deleteEmployeeHandler: deleteEmployeeHandler,
        editEmployeeHandler: editEmployeeHandler,
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    getAllEmployees();
  }, [params.id]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [message]);

  if (loading) {
    return (
      <section className="sectionBox">
        <Card>
          <p className="textCenter">Loading...</p>
        </Card>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className="sectionBox">
        <Card>
          <p className="sectionError textCenter">{httpError}</p>
        </Card>
      </section>
    );
  }

  const addButtonHandler = () => {
    setShowForm(true);
    idRef.current = null;
    defaultGenderRef.current = null;
    setHeader("Add New Employee");
  };

  const modalCloseHandler = () => {
    setShowForm(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    let gender = genderMaleRef.current.checked
      ? "Male"
      : genderFemaleRef.current.checked
      ? "Female"
      : null;
    let payload = {
      name: employeeNameRef.current.value,
      email_address: emailAddressRef.current.value,
      phone_number: phoneNumberRef.current.value,
      gender: gender,
      cafe: cafeRef?.current.value,
    };
    if (idRef.current) {
      payload.id = idRef.current;
      updateEmployee(payload)
        .then((data) => {
          setMessage(data);
          getAllEmployees();
          modalCloseHandler();
        })
        .catch((err) => {
          setHttpError(err.message);
        });
    } else {
      createNewEmployee(payload)
        .then((data) => {
          setMessage(data);
          getAllEmployees();
          modalCloseHandler();
        })
        .catch((err) => {
          setHttpError(err.message);
        });
    }
  };

  return (
    <section className="sectionBox">
      <Card>
        <div className="textRight">
          <CustomButton onClick={addButtonHandler}>
            Add New Employee
          </CustomButton>
        </div>
        <Table columnDefs={columnDefs} rowData={employees} />
      </Card>

      {showForm && (
        <EmployeeFormModal
          open={showForm}
          close={modalCloseHandler}
          header={header}
          ref={inputRefs}
          formSubmitHandler={(e) => formSubmitHandler(e)}
        />
      )}
      {message && (
        <Alert
          className="alerts"
          onClose={() => {
            setMessage("");
          }}
        >
          {message}
        </Alert>
      )}

      {showConfirmationModal && (
        <Modal
          onClose={closeConfirmationModal}
          header="Are you sure you want to delete this employee?"
        >
          <div className="textRight">
            <CustomButton
              type="button"
              onClick={closeConfirmationModal}
              cancel={true}
            >
              Cancel
            </CustomButton>
            <CustomButton type="button" onClick={confirmDelete}>
              Confirm
            </CustomButton>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default AvailableEmployees;
