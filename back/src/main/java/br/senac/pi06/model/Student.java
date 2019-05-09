package br.senac.pi06.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "student")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "first_name", nullable = false, length = 50)
	private String firstName;
	
	@Column(name = "last_name", nullable = false, length = 50)
	private String lastName;
	
	@Column(name = "email", nullable = false, length = 100)
	private String email;
	
	@Column(name = "periodo", nullable = false, length = 2)
	private String periodo;

	@Column(name = "enabled", nullable = false)
	boolean enabled = true;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_college", nullable=false)
	private College collegeKey;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_course", nullable=false)
	private Course courseKey;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public College getCollege() {
		return collegeKey;
	}

	public void setCollege(College college) {
		this.collegeKey = college;
	}

	public Course getCourse() {
		return courseKey;
	}

	public void setCourse(Course course) {
		this.courseKey = course;
	}


}
