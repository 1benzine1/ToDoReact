import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { HomePage } from '../../Pages/HomePage/HomePage';
import { SecondaryPage } from '../../Pages/SecondaryPage/SecondaryPage';

export function NavBar() {

    return (
        <Router>
            <div>
                <AppBar position="static" style={{ backgroundColor: 'darkgray' }}>
                    <Toolbar>
                        <Typography variant="h6">
                            NavBar
                            <div>
                                <Button component={Link} style={{ marginRight: '1em' }} to='/home' variant="contained" color="primary"> Home </Button>
                                <Button component={Link} to='/secondary' variant="contained" color="secondary"> Secondary</Button>
                            </div>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div style={{ marginTop: '0.7em' }}>
                <Route path='/home' component={HomePage} />
                <Route path='/secondary' component={SecondaryPage} />
            </div>
        </Router>
    );
}