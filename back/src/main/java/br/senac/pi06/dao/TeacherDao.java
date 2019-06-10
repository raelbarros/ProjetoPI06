package br.senac.pi06.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.senac.pi06.model.Teacher;
import br.senac.pi06.util.Util;

public class TeacherDao {
	
	private static TeacherDao instance;
	protected EntityManager em;

	public static TeacherDao getInstance(){
		if (instance == null)
			instance = new TeacherDao();
		return instance;
	}

	private TeacherDao() {
		em = Manager.getInstance().entityManager;
	}

	public Teacher getById(final int id) { 
		em.clear();
		return em.find(Teacher.class, id);
	}


	public Teacher getByEmail(final String email) {
		em.clear();
		Query query = em.createQuery("FROM Teacher where enabled = 1 AND email=:email");
		query.setParameter("email", email);
	
		try {
			return (Teacher) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	public Teacher getByUserName(final String teacher) {
		if(Util.isValidEmailAddress(teacher))
			return getByEmail(teacher);
		else 
			return null;
	}

	@SuppressWarnings("unchecked")
	public List<Teacher> findAll() {
		em.clear();
		return em.createQuery("FROM Teacher WHERE enabled = 1").getResultList();
	}

	public void persist(Teacher user) {
		try {
			em.getTransaction().begin();
			em.persist(user);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
		em.clear();
	}

	public void merge(Teacher user) {

		try {
			em.getTransaction().begin();
			em.merge(user);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
		em.clear();
	}

	public void removeById(final int id) {
		try {
			em.getTransaction().begin();
			Teacher user = getById(id);
			user.setEnabled(false); 
			em.merge(user);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
		em.clear();
	}


}
