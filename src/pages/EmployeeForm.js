import classes from './EmployeeForm.module.css';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button, Grid, TextField } from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { getEmployeeById, addEmployee, updateEmployee } from '../services/employee-service';

const EmployeeForm = props => {

    const { id } = useParams();
    const navigate = useNavigate();
    // const today = new Date();
    // const todayLocal = today.toLocaleDateString('en-US');
    const isEditMode = props.isEditMode ? true : false;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(null);
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const getEmployee = async () => {
                try {
                    const data = await getEmployeeById(id);
                    setName(data.data.name);
                    setEmail(data.data.email);
                    setDob(data.data.dob);
                    setMobile(data.data.mobile);
                    setPreviewImage(data.data.image);
                    setAddress(data.data.address);
                    setPincode(data.data.pincode);
                } catch (e) {
                    console.log(e);
                }
            };

            getEmployee();
        }
    }, []);

    const formatDate = (date) => {
        let d = new Date(date);
        let month = (d.getMonth() + 1);
        let day = d.getDate();
        let year = d.getFullYear();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let submitData = {
            name,
            email,
            dob: formatDate(dob),
            mobile,
            image,
            address,
            pincode
        };
        if (isEditMode) {
            submitData.id = id;
            updateEmployee(submitData).then(res => {
                if (res.status) {
                    alert('Employee updated successfully');
                    navigate('/employees');
                } else {
                    alert(res.message);
                }
            }).catch(err => {
                alert('Something went wrong');
                console.log(err);
            });
        } else {
            addEmployee(submitData).then(res => {
                if (res.status) {
                    alert('Employee added successfully');
                    navigate('/employees');
                } else {
                    alert(res.message);
                }
            }).catch(err => {
                alert('Something went wrong');
                console.log(err);
            });
        }
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <TextField
                            label="Email"
                            type="email"
                            className="w100"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date Of Birth"
                                inputFormat="dd/MM/yyyy"
                                value={dob}
                                clearable={true}
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
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
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
                            onChange={(e) => { setImage(e.target.files[0]) }}
                        />
                    </Grid>
                    {isEditMode &&
                        <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                            <img src={previewImage} alt="employee" style={{ height: '100px' }} />
                        </Grid>
                    }
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <TextField
                            label="Address"
                            type="text"
                            className="w100"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <TextField
                            label="Pincode"
                            type="number"
                            maxLength={6}
                            className="w100"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "10px" }}>
                    <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                        <Button type="submit" variant="contained" color="primary" className="w100" >Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default EmployeeForm;