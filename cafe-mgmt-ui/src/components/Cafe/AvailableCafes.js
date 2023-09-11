import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import { useState, useEffect } from "react";
import Table from "../UI/Table";
import EmployeesRedirectionRenderer from "./Helpers/EmployeesRedirectionRenderer";
import CafeActionRenderer from "./Helpers/CafeActionRenderer";
import LogoRenderer from "./Helpers/LogoRenderer";
import { fetchAllCafes, createCafe, deleteCafe, updateCafe } from "../../api";
import CustomButton from "../UI/CustomButton";
import CafeFormModal from "./Form/CafeFormModal";
import { useRef } from "react";
import Alert from "@mui/material/Alert";
import { cafesActions } from "../../store/cafes";
import Modal from "../UI/Modal";

const AvailableCafes = () => {
  const dispatch = useDispatch();
  const [header, setHeader] = useState("");
  const [cafes, setCafes] = useState([]);
  const [deleteCafeId, setDeleteCafeId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [message, setMessage] = useState("");
  const cafeNameInput = useRef(null);
  const descriptionInput = useRef(null);
  const locationInput = useRef(null);
  const idInput = useRef(null);

  const inputRefs = {
    cafeNameInput: cafeNameInput,
    descriptionInput: descriptionInput,
    locationInput: locationInput,
    idInput: idInput,
  };

  const getAllCafes = () => {
    fetchAllCafes()
      .then((data) => {
        // myImage.src = URL.createObjectURL(blob);
        if (data) {
          data.forEach((d) => {
            if (d.logo) {
              let url = "data:image/png;base64," + btoa(d.logo.data);
              d.logoUrl = <img src={url} alt={d.name} />;
            } else {
              d.logoUrl = null;
            }
          });
          setCafes(data);
          dispatch(cafesActions.setCafes(data));
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setHttpError(err.message);
      });
  };

  const deleteCafeHandler = (id) => {
    // confirmDelete
    setShowConfirmationModal(true);
    setDeleteCafeId(id);
    // deleteRecord(id);
  };

  const confirmDelete = () => {
    deleteRecord(deleteCafeId);
  };

  const deleteRecord = (id) => {
    let formData = new FormData();
    formData.append("id", id);

    deleteCafe(formData)
      .then((data) => {
        setMessage(data);
        getAllCafes();
        setDeleteCafeId(null);
        setShowConfirmationModal(false);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const editCafeHandler = (data) => {
    setHeader("Edit Cafe");
    setShowForm(true);

    cafeNameInput.current = data.name;
    descriptionInput.current = data.description;
    locationInput.current = data.location;
    idInput.current = data.id;
  };

  const columnDefs = [
    // { headerName: "Logo", cellRenderer: LogoRenderer },
    { headerName: "Name", field: "name", resizable: true },
    {
      headerName: "Description",
      field: "description",
      resizable: true,
      defaultMinWidth: 250,
    },
    {
      headerName: "Employees",
      cellRenderer: EmployeesRedirectionRenderer,
      resizable: true,
    },
    {
      headerName: "Location",
      field: "location",
      filter: true,
      resizable: true,
    },
    {
      headerName: "Actions",
      cellRenderer: CafeActionRenderer,
      cellRendererParams: {
        deleteCafeHandler: deleteCafeHandler,
        editCafeHandler: editCafeHandler,
      },
      resizable: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    getAllCafes();
  }, []);

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
    idInput.current = "";
    setHeader("Add New Cafe");
  };

  const modalCloseHandler = () => {
    setShowForm(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    let formData = new FormData();
    if (idInput.current) {
      formData.append("id", idInput.current);

      formData.append("name", cafeNameInput.current.value);
      formData.append("description", descriptionInput.current.value);
      formData.append("location", locationInput.current.value);
      // formData.append("file", this.state.selectedFile);

      updateCafe(formData)
        .then((data) => {
          setMessage(data);
          getAllCafes();
          modalCloseHandler();
        })
        .catch((err) => {
          setHttpError(err.message);
        });
    } else {
      formData.append("name", cafeNameInput.current.value);
      formData.append("description", descriptionInput.current.value);
      formData.append("location", locationInput.current.value);
      // formData.append("file", this.state.selectedFile);

      createCafe(formData)
        .then((data) => {
          setMessage(data);
          getAllCafes();
          modalCloseHandler();
        })
        .catch((err) => {
          setHttpError(err.message);
        });
    }
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setDeleteCafeId(null);
  };

  return (
    <section className="sectionBox">
      <Card>
        <div className="textRight">
          <CustomButton onClick={addButtonHandler}>Add New Café</CustomButton>
        </div>
        <Table columnDefs={columnDefs} rowData={cafes} />
      </Card>
      {showForm && (
        <CafeFormModal
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
          header="Are you sure you want to delete this cafe?"
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

export default AvailableCafes;
