package br.senac.pi06.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.senac.pi06.model.College;

public class CollegeDao {

	private static CollegeDao instance;
	protected EntityManager em;

	public static CollegeDao getInstance() {
		if (instance == null)
			instance = new CollegeDao();
		return instance;
	}

	private CollegeDao() {
		em = Manager.getInstance().entityManager;
	}

	public College getById(int id) {
		return em.find(College.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<College> findAll() {
		return em.createQuery("FROM College WHERE enabled = 1").getResultList();
	}

	public College getByName(String name) {
		Query query = em.createQuery("FROM College WHERE enabled = 1 AND name=:name");
		query.setParameter("name", name);

		try {
			return (College) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	public void persist(College college) {
		try {
			em.getTransaction().begin();
			em.persist(college);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void merge(College college) {
		try {
			em.getTransaction().begin();
			em.merge(college);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void remove(College college) {
		try {
			em.getTransaction().begin();
			em.remove(college);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void removeById(int id) {
		try {
			College s = getById(id);
			s.setEnabled(false);
			merge(s);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
