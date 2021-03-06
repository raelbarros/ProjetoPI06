package br.senac.pi06.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.senac.pi06.model.Survey;

public class SurveyDao {

	private static SurveyDao instance;
	protected EntityManager em;

	public static SurveyDao getInstance() {
		if (instance == null)
			instance = new SurveyDao();
		return instance;
	}

	private SurveyDao() {
		em = Manager.getInstance().entityManager;
	}

	public Survey getById(int id) {
		return em.find(Survey.class, id);
	}

	public Survey getByStudent(int id) {
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

	@SuppressWarnings("unchecked")
	public List<Survey> getAllResultByMonth(final int month) {
		Query query = em.createQuery("FROM Survey WHERE Month(date_survey)=:month");
		query.setParameter("month", month);

		try {
			return query.getResultList();
		} catch (Exception e) {
			return null;
		}
	}
	
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

	public void removeById(int id) {
		try {
			Survey s = getById(id);
			s.setEnabled(false);
			merge(s);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
