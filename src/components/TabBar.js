import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Tab, Tabs, Typography } from "@mui/material";
import Traininglist from "./TrainingList";
import Customerlist from "./CustomerList";
import Calendars from "./Calendar";
import PieChart from "./PieChart";

function TabBar() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  return (
    <div>
      <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Training App
        </Typography>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={tabIndex}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Training" />
          <Tab label="Customers" />
          <Tab label="calendar" />
          <Tab label="Graphs" />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && <Traininglist></Traininglist>}
      {tabIndex === 1 && <Customerlist></Customerlist>}
      {tabIndex === 2 && <Calendars></Calendars>}
      {tabIndex === 3 && <PieChart></PieChart>}
    </div>
  );
}

export default TabBar;
