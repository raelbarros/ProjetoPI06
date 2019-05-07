package br.senac.pi06.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.senac.pi06.model.Question;

public class QuestionDao {

	private static QuestionDao instance;
	protected EntityManager em;

	public static QuestionDao getInstance() {
		if (instance == null)
			instance = new QuestionDao();
		return instance;
	}

	private QuestionDao() {
		em = Manager.getInstance().entityManager;
	}

	public Question getById(int id) {
		return em.find(Question.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<Question> findAll() {
		return em.createQuery("FROM Question WHERE enabled = 1").getResultList();
	}

	public Question getByName(String name) {
		Query query = em.createQuery("FROM Question WHERE enabled = 1 AND name=:name");
		query.setParameter("name", name);

		try {
			return (Question) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	public void persist(Question q) {
		try {
			em.getTransaction().begin();
			em.persist(q);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void merge(Question q) {
		try {
			em.getTransaction().begin();
			em.merge(q);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void remove(Question q) {
		try {
			em.getTransaction().begin();
			em.remove(q);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void removeById(int id) {
		try {
			Question s = getById(id);
			s.setEnabled(false);
			merge(s);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
