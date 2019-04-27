package br.senac.pi06.dao;

import javax.persistence.EntityManager;

import br.senac.pi06.connection.ConnectionUtils;
import br.senac.pi06.model.Student;

public class DaoStudent {
	
	private static final DaoStudent INSTANCE = new DaoStudent();
	
	public static DaoStudent getInstance() {
		return INSTANCE;
	}
	
			
	public void save(Student s) throws Exception {
		// Get the db session
		EntityManager em = ConnectionUtils.getConnection();
		
		try {
			// begin a transaction with the db
			em.getTransaction().begin();
			em.persist(s);
			em.getTransaction().commit();
		} finally {
			// close the session
			em.close();
		}
	}

	
}
