package br.senac.pi06.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "course")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_course", nullable = false)
	private Integer id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	//cascadeType = ALL quando apagar um curso, apaga os alunos
	//mappedBy = quem toma conta da relacao
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "course")
	@JoinColumn(name = "id_student")
	private List<Student> listStudent;

	
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

	public List<Student> getStudent() {
		return listStudent;
	}

	public void setStudent(Student s) {
		if (listStudent == null) {
			listStudent = new ArrayList<Student>();
		}
		this.listStudent.add(s);
	}
		
}
