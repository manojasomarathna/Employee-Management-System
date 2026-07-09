package com.manoja.ems_backend.mapper;

import com.manoja.ems_backend.dto.EmployeeDto;
import com.manoja.ems_backend.entity.Employee;

public class EmployeeMapper {

    // Entity -> DTO
    public static EmployeeDto mapToEmployeeDto(Employee employee) {

        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

    // DTO -> Entity
    public static Employee mapToEmployee(EmployeeDto employeeDto) {

        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}