import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import { T_API_URL, trainings_id } from "./../constants";
import EditTraining from "./EditTraining";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  const [columnDefs] = useState([
    {
      field: "date",
      sortable: true,
      width: 120,
      filter: true,
      cellRenderer: (data) => {
        return data.value ? new Date(data.value).toLocaleDateString() : "";
      },
    },
    {
      field: "date",
      headerName: "Time",
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: (data) => {
        return data.value ? new Date(data.value).toLocaleTimeString() : "";
      },
    },
    { field: "duration", sortable: true, filter: true, width: 120 },
    { field: "activity", sortable: true, filter: true },
    {
      field: "customer.firstname",
      headerName: "Name",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "customer.lastname",
      headerName: "Last name",
      sortable: true,
      filter: true,
      width: 140,
    },
    {
      width: 140,
      cellRenderer: (params) => (
        <EditTraining data={params.data} updateTraining={updateTraining} />
      ),
    },
    {
      width: 120,
      cellRenderer: (params) => (
        <Button color="error" onClick={() => deleteTraining(params.data)}>
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch(T_API_URL)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("something went wrong");
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (data) => {
    console.log(data);
    window.confirm("Delete?");
    fetch(trainings_id + data.id, { method: "DELETE" })
      .then((response) => {
        if (response.ok) getTrainings();
        else alert("Something went wrong");
      })
      .catch((err) => console.error(err));
  };
  console.log(trainings);

  const updateTraining = (training, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) getTrainings();
        else alert("something went wrong");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ width: "80%", height: 600, margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>
    </>
  );
}
export default Traininglist;
