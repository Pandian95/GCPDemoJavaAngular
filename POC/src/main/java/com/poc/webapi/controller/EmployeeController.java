package com.poc.webapi.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.poc.webapi.model.Employee;
import com.poc.webapi.service.EmployeeService;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService service;


    @GetMapping("/hi")
	public String Hello() {
		return "WOW";
	}
	
    
    
    @GetMapping("/findbyid/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) throws NotFoundException {
        Employee employee = service.findById(id);
        return ResponseEntity.ok().body(employee);
    }

    	
    @GetMapping("/findall")
    public ResponseEntity<?> findAll() throws NotFoundException {
        List<?> employee = service.findAll();
        return ResponseEntity.ok().body(employee);
    }

   
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Employee employee) {
        Employee savedEmployee = service.save(employee);
        
//        return ResponseEntity.ok().body(savedEmployee);
        
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
        		.path("/findbyid/{id}")
        		.buildAndExpand(savedEmployee.getId())
        		.toUri();
        return ResponseEntity.created(uri).body(savedEmployee);
    }


   
    @PutMapping("/updateemp/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Employee employee) throws NotFoundException {
        Employee updatedEmployee = service.update(id, employee);
        return ResponseEntity.ok().body(updatedEmployee);
    }


    @DeleteMapping("/deleteemp/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.ok().body("Deleted successfully...!");
    }
}