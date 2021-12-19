import axios from 'axios';

const baseUrl = 'http://localhost/spaising';

export const getEmployees = () => {
    return new Promise(async (resolve, reject) => {
        axios.get(baseUrl + '/employees').then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });
}

export const getEmployeeById = (id) => {
    return new Promise(async (resolve, reject) => {
        axios.get(baseUrl + '/employees/' + id).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });
}

export const addEmployee = (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('mobile', data.mobile);
    formData.append('address', data.address);
    formData.append('pincode', data.pincode);
    formData.append('dob', data.dob);
    if (data.image) {
        formData.append('image', data.image);
    }
    return new Promise(async (resolve, reject) => {
        axios.post(baseUrl + '/employee/insert', formData).then(res => {
            console.log(res);
            resolve(res.data);
        }).catch(err => {
            reject(err);
            console.log(err)
        });
    });
}

export const updateEmployee = (data) => {
    let formData = new FormData();
    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('mobile', data.mobile);
    formData.append('address', data.address);
    formData.append('pincode', data.pincode);
    formData.append('dob', data.dob);
    if (data.image) {
        formData.append('image', data.image);
    }
    return new Promise(async (resolve, reject) => {
        axios.post(baseUrl + '/employee/update', formData).then(res => {
            console.log(res);
            resolve(res.data);
        }).catch(err => {
            reject(err);
            console.log(err);
        });
    });
}

export const deleteEmployee = (id) => {
    return new Promise(async (resolve, reject) => {
        axios.delete(baseUrl + '/employee/delete/' + id, {
            headers: { "Access-Control-Allow-Origin": "*" }
        }).then(res => {
            console.log(res);
            resolve(res.data);
        }).catch(err => {
            reject(err);
            console.log(err);
        });
    });
}