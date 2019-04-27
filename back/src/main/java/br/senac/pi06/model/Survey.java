package br.senac.pi06.model;

import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "survey")
public class Survey {
	
	// Class variable 

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_survey")
	private Integer id;
	
	@Column(name = "date_survey")
	@Temporal(TemporalType.DATE)
	private Calendar date;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_student")
	private Student student;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_category")
	private Category category;
	
	// Get e set of variables

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
	

}
