package br.senac.pi06.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import br.senac.pi06.model.Survey;

public class SurveyDao {
	
	private static SurveyDao instance;
	protected EntityManager em;

	public static SurveyDao getInstance(){
		if (instance == null)
			instance = new SurveyDao();
		return instance;
	}

	private SurveyDao() {
		em = Manager.getInstance().entityManager;
	}

	public Survey getById(final int id) {
		return em.find(Survey.class, id);
	}

	public Survey getByStudent(final int id) {
		Query query = em.createQuery("FROM Survey WHERE enabled = 1 AND id_student=:id_student");
		query.setParameter("id_student", id);

		try {
			return (Survey) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
	
	public Survey getByDate(final Date sDate) {
		Query query = em.createQuery("FROM Survey WHERE enabled = 1 AND date_survey=:date_survey");
		query.setParameter("date_survey", sDate);

		try {
			return (Survey) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
	
	/*
	public Survey getByResult(final int id) {
		Query query = em.createQuery("FROM survey WHERE AND result=:id_student");
		query.setParameter("id_student", id);

		try {
			return (Survey) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
	*/

	@SuppressWarnings("unchecked")
	public List<Survey> findAll() {
		return em.createQuery("FROM Survey WHERE enabled = 1").getResultList();
	}

	public void persist(Survey s) {
		try {
			em.getTransaction().begin();
			em.persist(s);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void merge(Survey s) {
		try {
			em.getTransaction().begin();
			em.merge(s);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void remove(Survey s) {
		try {
			em.getTransaction().begin();
			em.remove(s);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

}
