package br.senac.pi06.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.senac.pi06.model.State;

public class StateDao {

	private static StateDao instance;
	protected EntityManager em;

	public static StateDao getInstance() {
		if (instance == null)
			instance = new StateDao();
		return instance;
	}
	
	private StateDao() {
		em = Manager.getInstance().entityManager;
	}

	public State getById(int id) {
		return em.find(State.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<State> findAll() {
		return em.createQuery("SELECT * FROM State WHERE enabled = 1").getResultList();
	}

	public State getByName(String name) {
		Query query = em.createQuery("FROM State WHERE enabled = 1 AND name=:name");
		query.setParameter("name", name);

		try {
			return (State) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	public void persist(State state) {
		try {
			em.getTransaction().begin();
			em.persist(state);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void merge(State state) {
		try {
			em.getTransaction().begin();
			em.merge(state);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}


}
