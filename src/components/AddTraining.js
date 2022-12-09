import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import ReactDatepicker from "./DatePicker";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  // const [startDate, setStartDate] = useState();

  const [training, setTraining] = React.useState({
    date: new Date(),
    duration: "",
    activity: "",
    customer: props.data.links[0].href,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        New Training
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <ReactDatepicker
            selected={training.date}
            onChange={(e) => setTraining({ ...training, date: e })}
          ></ReactDatepicker>
          <TextField
            margin="dense"
            label="Duration"
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="activity"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
