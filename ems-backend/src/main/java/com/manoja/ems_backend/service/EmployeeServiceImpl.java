package com.manoja.ems_backend.service;

import com.manoja.ems_backend.dto.EmployeeDto;
import com.manoja.ems_backend.entity.Employee;
import com.manoja.ems_backend.exception.ResourceNotFoundException;
import com.manoja.ems_backend.mapper.EmployeeMapper;
import com.manoja.ems_backend.repository.EmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public EmployeeDto saveEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }


    @Override
    public Page<EmployeeDto> getAllEmployees(Pageable pageable) {

        Page<Employee> employees = employeeRepository.findAll(pageable);

        return employees.map(EmployeeMapper::mapToEmployeeDto);
    }


    @Override
    public EmployeeDto getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id : " + id));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }


    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id : " + id));


        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());


        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }


    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id : " + id));

        employeeRepository.delete(employee);
    }


    // Search Employee By Name
    @Override
    public List<EmployeeDto> searchEmployees(String name) {

        List<Employee> employees =
                employeeRepository.findByFirstNameContainingIgnoreCase(name);

        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .toList();
    }
}