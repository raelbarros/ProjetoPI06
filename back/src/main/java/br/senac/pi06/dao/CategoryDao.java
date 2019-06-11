package br.senac.pi06.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.senac.pi06.model.Category;

public class CategoryDao {
	// Variaveis
	private static CategoryDao instance;
	protected EntityManager em;

	public static CategoryDao getInstance() {
		if (instance == null)
			instance = new CategoryDao();
		return instance;
	}

	private CategoryDao() {
		em = Manager.getInstance().entityManager;
	}

	public Category getById(int id) {
		return em.find(Category.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<Category> findAll() {
		return em.createQuery("FROM Category WHERE enabled = 1").getResultList();
	}

	public Category getByName(String name) {
		Query query = em.createQuery("FROM Category WHERE enabled = 1 AND name=:name");
		query.setParameter("name", name);

		try {
			return (Category) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	public void persist(Category c) {
		try {
			em.getTransaction().begin();
			em.persist(c);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void merge(Category c) {
		try {
			em.getTransaction().begin();
			em.merge(c);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void remove(Category c) {
		try {
			em.getTransaction().begin();
			em.remove(c);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void removeById(int id) {
		try {
			Category s = getById(id);
			s.setEnabled(false);
			merge(s);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
