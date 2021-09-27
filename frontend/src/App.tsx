import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import HorizontalLinearStepper from './Steps';

export default function App() {
  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" component="div">
          Survey
        </Typography>
      </Toolbar>
    </AppBar>
    <HorizontalLinearStepper></HorizontalLinearStepper>
    </>
  );
}
