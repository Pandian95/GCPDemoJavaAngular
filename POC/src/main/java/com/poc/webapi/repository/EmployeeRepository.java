package com.poc.webapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poc.webapi.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}