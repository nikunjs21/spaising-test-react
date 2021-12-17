export const getEmployees = () => {
    return new Promise(async (resolve, reject) => {
        fetch('http://localhost/spaising/employee/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
    });
}

export const getEmployeeById = (id) => {
    return new Promise(async (resolve, reject) => {
        fetch('http://localhost/spaising/employee/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
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
        fetch('http://localhost/spaising/employee/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        }).then(res => res.json())
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
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
        fetch('http://localhost/spaising/employee/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        }).then(res => res.json())
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
    });
}

export const deleteEmployee = (id) => {
    return new Promise(async (resolve, reject) => {
        fetch('http://localhost/spaising/employee/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
    });
}