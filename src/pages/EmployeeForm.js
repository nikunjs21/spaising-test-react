import classes from './EmployeeForm.module.css';

import { useEffect, useState } from 'react';

import { Button, Grid, TextField } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { getEmployeeById } from '../services/employee-service';

const EmployeeForm = props => {

    const today = new Date();

    const [isEditMode, setIsEditMode] = useState(props.isEditMode ? true : false);
    const [id, setId] = useState(props.id ? props.id : 0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(today.toLocaleDateString('en-US'));
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const getEmployee = async () => {
                try {
                    const data = await getEmployeeById(id);
                    setName(data.data.name);
                    setEmail(data.data.email);
                    setDob(data.data.dob);
                    setMobile(data.data.mobile);
                    setImage(data.data.image);
                    setAddress(data.data.address);
                    setPincode(data.data.pincode);
                } catch (e) {
                    console.log(e);
                }
            };

            getEmployee();
        }
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
    }

    const handleChange = (newValue) => {
        setDob(newValue);
    };

    return (
        <div className={classes['form-container']}>
            <div className={classes['form-header']}>
                {isEditMode ? <h2>Edit Employee</h2> : <h2>Add Employee</h2>}
            </div>
            <form onSubmit={onSubmitHandler}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2} >
                        <TextField
                            label="Name"
                            type="text"
                            className="w100"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <TextField
                            label="Email"
                            type="email"
                            className="w100"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                label="Date Of Birth"
                                inputFormat="MM/dd/yyyy"
                                value={dob}
                                onChange={handleChange}
                                renderInput={(params) => <TextField className="w100" {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <TextField
                            label="Mobile"
                            type="number"
                            className="w100"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <TextField
                            label="Image"
                            type="file"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className="w100"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <TextField
                            label="Address"
                            type="text"
                            className="w100"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <TextField
                            label="Pincode"
                            type="number"
                            maxLength={6}
                            className="w100"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{marginTop:"10px"}}>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <Button type="submit" variant="contained" color="primary" className="w100" >Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default EmployeeForm;