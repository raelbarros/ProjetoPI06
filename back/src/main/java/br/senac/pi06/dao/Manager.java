package br.senac.pi06.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Manager {

	private static Manager instance;
	protected EntityManager entityManager;

	public static Manager getInstance() {
		if (instance == null)
			instance = new Manager();
		return instance;
	}

	private Manager() {
		entityManager = getEntityManager();
	}

	private EntityManager getEntityManager() {
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("pi06");
		if (entityManager == null)
			entityManager = factory.createEntityManager();
		return entityManager;
	}

}
