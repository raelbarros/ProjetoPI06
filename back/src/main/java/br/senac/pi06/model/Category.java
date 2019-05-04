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
@Table(name = "category")
public class Category {

	// Class variable

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", nullable = false, length = 50)
	private String name;

	// list for save all question of this category
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_question")
	private List<Question> listQuestion;

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

	public List<Question> getQuestion() {
		return listQuestion;
	}

	public void setQuestion(Question q) {
		// start the list
		if (listQuestion == null) {
			listQuestion = new ArrayList<Question>();
		}
		this.listQuestion.add(q);
	}

}