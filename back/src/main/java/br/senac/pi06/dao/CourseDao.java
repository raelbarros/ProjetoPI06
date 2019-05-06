package br.senac.pi06.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

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

	public Course getById(int id) {
		return em.find(Course.class, id);
	}
	
	@SuppressWarnings("unchecked")
	public List<Course> findAll() {
		return em.createQuery("FROM Course WHERE enabled = 1").getResultList();
	}
	
	public Course getByName(String name) {
		Query query = em.createQuery("FROM Course WHERE enabled = 1 AND name=:name");
		query.setParameter("name", name);

		try {
			return (Course) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
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

	public void remove(Course course) {
		try {
			em.getTransaction().begin();
			em.remove(course);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}
	
	public void removeById(int id) {
		try {
			Course s = getById(id);
			s.setEnabled(false);
			merge(s);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
