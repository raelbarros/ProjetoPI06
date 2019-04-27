package br.senac.pi06.servicos;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import br.senac.pi06.dao.DaoStudent;
import br.senac.pi06.model.Student;

@Path("/student")
public class ServicoStudent {
	
	// Function for save a Student
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void saveStudent(Student s) {
		try {
			// Colocar o validador
			
			// call the Dao function for save the student
			DaoStudent.getInstance().save(s);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
