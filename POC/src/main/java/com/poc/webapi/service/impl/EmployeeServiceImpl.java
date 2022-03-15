package com.poc.webapi.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.poc.webapi.model.Employee;
import com.poc.webapi.repository.EmployeeRepository;
import com.poc.webapi.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    @Override
    public List<Employee> findAll() {
        return repository.findAll();
    }

    @Override
    public Employee findById(int id) throws NotFoundException {
        return repository.findById(id).orElseThrow(() -> new NotFoundException());
    }

    @Override
    public Employee save(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public Employee update(int id, Employee employee) throws NotFoundException {
    	repository.findById(id).orElseThrow(() -> new NotFoundException());
        
    	employee.setId(id);
    	return repository.save(employee);
    }

    @Override
    public void delete(int id) {
        repository.findById(id).ifPresent(Employee -> repository.delete(Employee));
    }
}