import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 304,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  question: {
    padding: 4,
    marginTop: 16,
  },
  formControlQuestion: {
    minWidth: 160,
  },
}));

export default function FormDialog({ addNode, currentNodeId, open, setOpen }) {
  const [type, setType] = React.useState('');
  const [action, setAction] = React.useState('');
  const [question, setQuestion] = React.useState({});

  const actionLabels = {
    'send-email': 'Send Email',
    'send-follow-up': 'Send Email',
    call: 'Call to the customer',
  };

  const getLabel = () => {
    if (type === 'action') return actionLabels[action];
    if (type === 'rule') {
      if (question.id === 'past-due-value') {
        return `Is Past Due ${question.comparator} than ${question.noOfDays} days?`;
      }
      if (question.id === 'broken-p2p-value') {
        return `Is P2P commited ${question.comparator} and Payment not made than ${question.noOfDays} days?`;
      } else {
        return `Is Email ${question.comparator} than ${question.noOfDays} days?`;
      }
    }
    return 'End';
  };

  const handleChangeQuestion = (id, itemName, value) => {
    setQuestion({ ...question, [itemName]: value, id });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setType('');
    setAction('');
    setQuestion({});
  };

  const classes = useStyles();

  const handleAdd = () => {
    let returnObj = {};
    if (type === 'action') {
      returnObj = {
        currentNodeId: currentNodeId,
        type,
        action,
        label: getLabel(),
      };
    } else if (type === 'end') {
      returnObj = {
        currentNodeId: currentNodeId,
        type: 'action',
        isEnd: true,
        label: getLabel(),
      };
    } else {
      const { id, comparator, noOfDays } = question;
      returnObj = {
        currentNodeId: currentNodeId,
        type,
        label: getLabel(),
        rules: {
          questionId: id,
          value: noOfDays,
          comparator,
        },
      };
    }
    console.log(returnObj);
    addNode(returnObj);
    handleClose();
  };

  const disabledState =
    type === '' ||
    (action === 'action' && action === '') ||
    (action === 'rule' && Object.keys(question).length === 0);

  const questions = {
    'past-due-value': (
      <Grid item xs={12} container>
        <Grid item xs={3} container alignItems="center">
          <Typography variant="h7" className={classes.question}>
            If Past Due is
          </Typography>
        </Grid>
        <Grid item xs={5} container alignItems="center">
          <FormControl className={classes.formControlQuestion}>
            <InputLabel id="demo-simple-select-label">Comparator</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={question.comparator}
              onChange={(e) =>
                handleChangeQuestion(
                  'past-due-value',
                  'comparator',
                  e.target.value
                )
              }
            >
              <MenuItem value={'>'}>Greater Than</MenuItem>
              <MenuItem value={'<'}>Less Than</MenuItem>
              <MenuItem value={'='}>Equal to</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} container alignItems="center">
          <TextField
            id="standard-basic"
            type="number"
            label="No. of days"
            onChange={(e) =>
              handleChangeQuestion('past-due-value', 'noOfDays', e.target.value)
            }
            value={question.noOfDays}
          />
        </Grid>
        <Grid item xs={2} container alignItems="center">
          <Typography variant="h7" className={classes.question}>
            days
          </Typography>
        </Grid>
      </Grid>
    ),
    'broken-p2p-value': (
      <Grid item xs={12} container>
        <Grid item xs={3} container alignItems="center">
          <Typography variant="h7" className={classes.question}>
            If P2P commited is
          </Typography>
        </Grid>
        <Grid item xs={5} container alignItems="center">
          <FormControl className={classes.formControlQuestion}>
            <InputLabel id="demo-simple-select-label">Comparator</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={question.comparator}
              onChange={(e) =>
                handleChangeQuestion(
                  'broken-p2p-value',
                  'comparator',
                  e.target.value
                )
              }
            >
              <MenuItem value={'>'}>Greater Than</MenuItem>
              <MenuItem value={'<'}>Less Than</MenuItem>
              <MenuItem value={'='}>Equal to</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5} container alignItems="center">
          <Typography variant="h7" className={classes.question}>
            and Payment not made than
          </Typography>
        </Grid>
        <Grid item xs={3} container alignItems="center">
          <TextField
            id="standard-basic"
            type="number"
            label="No. of days"
            onChange={(e) =>
              handleChangeQuestion(
                'broken-p2p-value',
                'noOfDays',
                e.target.value
              )
            }
            value={question.noOfDays}
          />
        </Grid>
        <Grid item xs={2} container alignItems="center">
          <Typography variant="h7" className={classes.question}>
            days
          </Typography>
        </Grid>
      </Grid>
    ),
    'email-opened': (
      <Grid item xs={12} container>
        <Grid item xs={3} container alignItems="center">
          <Typography variant="h7" className={classes.question}>
            If E-Mail is
          </Typography>
        </Grid>
        <Grid item xs={5} container alignItems="center">
          <FormControl className={classes.formControlQuestion}>
            <InputLabel id="demo-simple-select-label">Comparator</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={question.comparator}
              onChange={(e) =>
                handleChangeQuestion(
                  'email-opened',
                  'comparator',
                  e.target.value
                )
              }
            >
              <MenuItem value={'opened'}>Opened</MenuItem>
              <MenuItem value={'not-opened'}>Not Opened</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <Typography variant="h7" className={classes.question}>
            than
          </Typography>
        </Grid>
        <Grid item xs={2} container alignItems="center">
          <TextField
            id="standard-basic"
            type="number"
            label="No. of days"
            onChange={(e) =>
              handleChangeQuestion('email-opened', 'noOfDays', e.target.value)
            }
            value={question.noOfDays}
          />
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <Typography variant="h7" className={classes.question}>
            days
          </Typography>
        </Grid>
      </Grid>
    ),
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a New Node
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add A New Node</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add a New Node, please start by entering a type and consequent
            action or rules and values for it
          </DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={'action'}>Action</MenuItem>
                  <MenuItem value={'rule'}>Rule/Question</MenuItem>
                  <MenuItem value={'end'}>End</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                disabled={type !== 'action'}
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">
                  Action To be Taken
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                >
                  <MenuItem value={'send-email'}>Send Email</MenuItem>
                  <MenuItem value={'send-follow-up'}>
                    Send Follow Up Email
                  </MenuItem>
                  <MenuItem value={'call'}>Call the Customer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                disabled={type !== 'rule'}
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">Rule Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={action}
                  onChange={(e) => {
                    setAction(e.target.value);
                    setQuestion({});
                  }}
                >
                  <MenuItem value={'past-due-value'}>Past Due</MenuItem>
                  <MenuItem value={'broken-p2p-value'}>P2P Committed</MenuItem>
                  <MenuItem value={'email-opened'}>Email Opened</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {type === 'rule' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.question}>
                    Question
                  </Typography>
                </Grid>
                {questions[action]}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary" disabled={disabledState}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
