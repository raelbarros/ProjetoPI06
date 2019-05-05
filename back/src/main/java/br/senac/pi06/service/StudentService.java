package br.senac.pi06.service;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.senac.pi06.dao.StudentDao;
import br.senac.pi06.exception.StudentException;
import br.senac.pi06.model.Student;
import br.senac.pi06.util.Util;
import br.senac.pi06.validator.StudentValidator;

@Path("/student")
public class StudentService {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	// @Produces(MediaType.APPLICATION_JSON)
	public Response create(Student s) {
		try {
			StudentException ex = StudentValidator.validate(s);
			if (ex != null)
				throw ex;

			StudentDao.getInstance().persist(s);
			return Util.printOk();
		} catch (StudentException e) {
			e.printStackTrace();
			return Util.printNotAccept(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response read() {
		try {
			List<Student> list = StudentDao.getInstance().findAll();
			return Response.status(Response.Status.OK).entity(list).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
	public Response update(Student s) {
		try {
			StudentException ex = StudentValidator.validate(s);
			if (ex != null)
				throw ex;

			StudentDao.getInstance().merge(s);
			return Util.printOk();
		} catch (StudentException e) {
			e.printStackTrace();
			return Util.printNotAccept(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}

	}

	@DELETE
	public Response delete(Student s) {
		try {
			StudentDao.getInstance().remove(s);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

}
