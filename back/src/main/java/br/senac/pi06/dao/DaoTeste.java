package br.senac.pi06.dao;

import javax.persistence.EntityManager;

import br.senac.pi06.connection.ConnectionUtils;
import br.senac.pi06.model.Student;

public class DaoTeste {
	
	private static final DaoTeste INSTANCE = new DaoTeste();
	
	public static DaoTeste getInstance() {
		return INSTANCE;
	}
	
			
	/*public void save(Student s) throws Exception {
		EntityManager em = ConnectionUtils.getConnection();
		
		try {
			em.getTransaction().begin();
			em.persist(s);
			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}*/

	
}
