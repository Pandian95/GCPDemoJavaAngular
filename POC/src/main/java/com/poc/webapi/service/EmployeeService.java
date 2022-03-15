package com.poc.webapi.service;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import com.poc.webapi.model.Employee;

public interface EmployeeService {

    List<?> findAll();

    Employee findById(int id) throws NotFoundException;

    Employee save(Employee superHero);

	Employee update(int id, Employee employee) throws NotFoundException;

    void delete(int id);

}