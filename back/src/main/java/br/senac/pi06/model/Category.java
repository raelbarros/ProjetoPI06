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
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_category")
	private Integer id;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
	@JoinColumn(name = "id_question")
	private List<Question> listQuestion;

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public List<Question> getQuestion() {
		return listQuestion;
	}

	public void setQuestion(Question q) {
		if (listQuestion == null) {
			listQuestion = new ArrayList<Question>();
		}
		this.listQuestion.add(q);
	}
	
}
