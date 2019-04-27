package br.senac.pi06.connection;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class ConnectionUtils {
	
	public static EntityManager getConnection() throws Exception {
		// Variable for connection with db
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("pi06");

		try {
			// Set a persistence with the db and return the session
			return emf.createEntityManager();
		} catch (Exception e) {
			// If fail, show the error and return null
			e.printStackTrace();
			return null;
		}
	}
}

