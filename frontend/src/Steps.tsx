import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MenuItem, Select, Snackbar, TextField } from '@mui/material';

const steps = ['Name', 'Email', 'SCM', 'People'];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [scm, setScm] = React.useState("");
  const [people, setPeople] = React.useState("");
  const [displayAlert, setDisplayAlert] = React.useState(false);

  React.useEffect(() => {
    if (activeStep === steps.length){
      const info = { name, email, scm, people };
      console.log(info);
      fetch("http://localhost:8000/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
      }).then(res => {
        if (res.status === 200){
          setDisplayAlert(true);
        }
      })
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleName = (e: {target: {value: string;};}) => {
    setName(e.target.value);
  }

  const handleEmail = (e: {target: {value: string;};}) => {
    setEmail(e.target.value);
  }

  const handleScm = (e: {target: {value: string;};}) => {
    setScm(e.target.value);
  }

  const handlePeople = (e: {target: {value: string;};}) => {
    setPeople(e.target.value);
  }

  const handleClose = (e: any)=>{
    setDisplayAlert(false);
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
        <Box>
            <Typography>What is your name?</Typography>
            <TextField value={name} onChange={handleName}/>
        </Box>
        );
      case 1:
        return (
            <Box>
            <Typography>What is your email?</Typography>
            <TextField value={email} onChange={handleEmail}/>
        </Box>);
      case 2:
        return (<Box>
            <Typography>What is your favorite SCM?</Typography>
            <Select value={scm}  onChange={handleScm}>
              <MenuItem value={"GitHub"}>GitHub</MenuItem>
              <MenuItem value={"GitLab"}>GitLab</MenuItem>
              <MenuItem value={"BitBucket"}>BitBucket</MenuItem>
              <MenuItem value={"TFS"}>TFS</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            </Box>);
      case 3:
        return (<Box>
            <Typography>How many people work in your team?</Typography>
            <TextField value={people} onChange={handlePeople}/>
            </Box>);
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }} padding={"1rem"}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Snackbar open={displayAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Your entries has been received!
            </Alert>
          </Snackbar>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
