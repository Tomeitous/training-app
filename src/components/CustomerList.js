import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import { api_customers, api_trainings } from "./../constants";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import { CSVLink } from "react-csv";
import convertArrayToCSV from "convert-array-to-csv";

function Customerlist() {
  const [customers, setCustomers] = useState([]);

  const newArray = customers.map(({ content, links, ...item }) => item);

  // My excel separator is semicolon instead of comma?
  const csvArray = convertArrayToCSV(newArray).replaceAll(",", ";");

  const [columnDefs] = useState([
    { field: "firstname", sortable: true, width: 120, filter: true },
    { field: "lastname", sortable: true, width: 120, filter: true },
    { field: "streetaddress", sortable: true, filter: true, width: 150 },
    { field: "postcode", sortable: true, filter: true, width: 120 },
    { field: "city", sortable: true, filter: true, width: 120 },
    { field: "email", sortable: true, filter: true, width: 140 },
    { field: "phone", sortable: true, filter: true, width: 140 },
    {
      width: 80,
      cellRenderer: (params) => (
        <EditCustomer data={params.data} updateCustomer={updateCustomer} />
      ),
    },

    {
      width: 100,
      cellRenderer: (params) => (
        <Button color="error" onClick={() => deleteCustomer(params.data)}>
          Delete
        </Button>
      ),
    },
    {
      width: 140,
      cellRenderer: (params) => (
        <AddTraining data={params.data} addTraining={addTraining} />
      ),
    },
  ]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetch(api_customers)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("something went wrong");
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const addCustomer = (customer) => {
    fetch(api_customers, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) getCustomers();
        else alert("something went wrong");
      })
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    fetch(api_trainings, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) console.log(training);
        else alert("something went wrong");
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (data) => {
    window.confirm("Delete?");
    fetch(data.links[0].href, { method: "DELETE" })
      .then((response) => {
        if (response.ok) getCustomers();
        else alert("Something went wrong");
      })
      .catch((err) => console.error(err));
  };

  const updateCustomer = (customer, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) getCustomers();
        else alert("something went wrong");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <CSVLink data={csvArray}>Download me</CSVLink>
      <AddCustomer addCustomer={addCustomer}></AddCustomer>
      <div
        className="ag-theme-material"
        style={{ width: "80%", height: 600, margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>
    </>
  );
}
export default Customerlist;
