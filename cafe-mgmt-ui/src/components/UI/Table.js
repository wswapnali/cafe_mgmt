import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Table = (props) => {
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <AgGridReact
        columnDefs={props.columnDefs}
        rowData={props.rowData}
      ></AgGridReact>
    </div>
  );
};

export default Table;
