package br.senac.pi06.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.senac.pi06.model.City;
import br.senac.pi06.model.Student;

public class StudentDao {

	private static StudentDao instance;
	protected EntityManager em;

	public static StudentDao getInstance() {
		if (instance == null)
			instance = new StudentDao();
		return instance;
	}

	private StudentDao() {
		em = Manager.getInstance().entityManager;
	}

	public Student getById(String id) {
		return em.find(Student.class, id);
	}

	
	
	public Student getByEmail(String email) {
		Query query = em.createQuery("FROM Student WHERE enabled = 1 AND email=:email");
		query.setParameter("email", email);

		try {
			return (Student) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
	
	//
	
	@SuppressWarnings("unchecked")
	public List<Student> getBytipoinst(String tipo) {
		Query query = em.createQuery("FROM Student s LEFT JOIN s.college c WHERE c.tipo=:tipo");
				query.setParameter("tipo", tipo);

		try {
			return (List<Student>) query.getResultList();
		} catch (Exception e) {
			return null;
		}
	}
	

	@SuppressWarnings("unchecked")
	public List<Student> findAll() {
		return em.createQuery("FROM Student WHERE enabled = 1").getResultList();
	}

	public Student persist(Student s) {
		try {
			em.getTransaction().begin();
			em.persist(s);
			em.getTransaction().commit();
			return s;
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
			return null;
		}
	}

	public void merge(Student s) {
		try {
			em.getTransaction().begin();
			em.merge(s);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void remove(Student s) {
		try {
			em.getTransaction().begin();
			em.remove(s);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void removeById(String id) {
		try {
			Student s = getById(id);
			s.setEnabled(false);
			merge(s);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
