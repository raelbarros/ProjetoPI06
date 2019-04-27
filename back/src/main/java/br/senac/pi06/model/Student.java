package br.senac.pi06.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "student")
public class Student {
	
	// Class variable 

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_student", nullable = false)
	private Integer id;
	
	@Column(name = "name", length = 20, nullable = false)
	private String name;
	
	@Column(name = "last_name", length = 50, nullable = false)
	private String lastName;
	
	@ManyToOne
	private College college;
	
	@ManyToOne
	private Course course;
	
	@Column(name = "the_class", nullable = false)
	private Integer theClass;
	
	// Get e set of variables
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public College getCollege() {
		return college;
	}

	public void setCollege(College college) {
		this.college = college;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public Integer getTheClass() {
		return theClass;
	}

	public void setTheClass(Integer theClass) {
		this.theClass = theClass;
	}
	
	
}
