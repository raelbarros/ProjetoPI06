package br.senac.pi06.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "student")
public class Student {

	@Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
	private String id;
	
	@Column(name = "firstName", nullable = false, length = 50)
	private String firstName;
	
	@Column(name = "lastName", nullable = false, length = 50)
	private String lastName;
	
	@Column(name = "email", nullable = false, length = 100)
	private String email;
	
	@Column(name = "periodo", nullable = false, length = 2)
	private String periodo;

	@Column(name = "enabled", nullable = false)
	boolean enabled = true;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="college_id",
			referencedColumnName = "college_id")
	private College college;
	
	@ManyToOne
	private Course course;

	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	
}
