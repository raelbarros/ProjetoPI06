package br.senac.pi06.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.senac.pi06.model.Teacher;

public class AuthAuthenticatePojo {
	private String token;
	private Teacher user;

	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	@JsonIgnoreProperties({"password"})
	public Teacher getUser() {
		return user;
	}
	public void setUser(Teacher user) {
		this.user = user;
	}
}