package ConnectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class ConnectionUtils {
	
	public static EntityManager getConnection() throws Exception {
		//Variavel de conexao com o db
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("pi06");

		try {
			//
			return emf.createEntityManager();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
