import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const getEmployees = (page = 0, size = 5, sortBy = "id", sortDirection = "asc") => {
    return axios.get(
        `${API_URL}?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`
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
    return axios.get(`${API_URL}/search?name=${encodeURIComponent(name)}`);
};
