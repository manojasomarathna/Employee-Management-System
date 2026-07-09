package com.manoja.ems_backend.service;

import com.manoja.ems_backend.dto.EmployeeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeService {

    EmployeeDto saveEmployee(EmployeeDto employeeDto);

    Page<EmployeeDto> getAllEmployees(Pageable pageable);

    EmployeeDto getEmployeeById(Long id);

    EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto);

    void deleteEmployee(Long id);

    List<EmployeeDto> searchEmployees(String name);
}