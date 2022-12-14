import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { trainings_id } from "../constants";
import ReactDatepicker from "./DatePicker";

export default function EditTraining(props) {
  const [open, setOpen] = React.useState(false);

  const [training, setTraining] = React.useState({
    date: "",
    duration: "",
    activity: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data.date);
    setTraining({
      date: new Date(props.data.date),
      duration: props.data.duration,
      activity: props.data.activity,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateTraining(training, trainings_id + props.data.id);
  };
  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Training</DialogTitle>
        <DialogContent>
          <ReactDatepicker
            selected={training.date}
            onChange={(e) => setTraining({ ...training, date: e })}
          ></ReactDatepicker>

          <TextField
            margin="dense"
            label="duration"
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
