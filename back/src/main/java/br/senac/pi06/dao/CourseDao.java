package br.senac.pi06.dao;

import java.util.List;

import javax.persistence.EntityManager;

import br.senac.pi06.model.Course;

public class CourseDao {


	private static CourseDao instance;
	protected EntityManager em;

	public static CourseDao getInstance(){
		if (instance == null)
			instance = new CourseDao();
		return instance;
	}

	private CourseDao() {
		em = Manager.getInstance().entityManager;
	}

	public Course getById(final int id) {
		return em.find(Course.class, id);
	}
	
	@SuppressWarnings("unchecked")
	public List<Course> findAll() {
		return em.createQuery("FROM Course WHERE enabled = 1").getResultList();
	}

	public void persist(Course course) {
		try {
			em.getTransaction().begin();
			em.persist(course);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void merge(Course course) {
		try {
			em.getTransaction().begin();
			em.merge(course);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	void remove(Course course) {
		try {
			em.getTransaction().begin();
			em.remove(course);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}
	
}
