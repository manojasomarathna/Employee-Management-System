package com.manoja.ems_backend.controller;

import com.manoja.ems_backend.dto.EmployeeDto;
import com.manoja.ems_backend.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    // Create Employee
    @PostMapping
    public EmployeeDto saveEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
        return employeeService.saveEmployee(employeeDto);
    }


    // Get All Employees with Pagination and Sorting
    @GetMapping
    public Page<EmployeeDto> getAllEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection
    ) {

        Sort sort = sortDirection.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();


        Pageable pageable = PageRequest.of(page, size, sort);


        return employeeService.getAllEmployees(pageable);
    }


    // Search Employee By Name
    @GetMapping("/search")
    public List<EmployeeDto> searchEmployees(
            @RequestParam String name
    ) {
        return employeeService.searchEmployees(name);
    }


    // Get Employee By ID
    @GetMapping("/{id}")
    public EmployeeDto getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }


    // Update Employee
    @PutMapping("/{id}")
    public EmployeeDto updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeDto employeeDto) {

        return employeeService.updateEmployee(id, employeeDto);
    }


    // Delete Employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}