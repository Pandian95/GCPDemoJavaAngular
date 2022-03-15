package com.poc.webapi.model;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table
public class Employee implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
    @GeneratedValue
    @Id
    private int id;
    @Column(name = "name")
    @NotNull
    private String name;
    
    @Column(name = "designation")
    private String designation;
    
    @Column(name = "address")
    private String address;


}