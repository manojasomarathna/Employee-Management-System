import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";


export const getEmployees = (page = 0, size = 5) => {
    return axios.get(
        `${API_URL}?page=${page}&size=${size}`
    );
};


export const getEmployeeById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};


export const createEmployee = (employee) => {
    return axios.post(API_URL, employee);
};


export const updateEmployee = (id, employee) => {
    return axios.put(`${API_URL}/${id}`, employee);
};


export const deleteEmployee = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


export const searchEmployees = (name) => {
    return axios.get(
        `${API_URL}/search?name=${name}`
    );
};