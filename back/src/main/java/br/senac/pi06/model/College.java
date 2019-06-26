package br.senac.pi06.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "college")
public class College {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Fetch(FetchMode.JOIN)
	private int id;
	
	@Column(name = "name", nullable = false, length = 100)
	private String name;
	
	@Column(name = "tipo", nullable = false, length = 20)
	private String tipo;
	
	@Column(name = "enabled", nullable = false)
	boolean enabled = true;
	
	@ManyToOne
	private State state;
	
	@ManyToOne
	private City city;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

}
