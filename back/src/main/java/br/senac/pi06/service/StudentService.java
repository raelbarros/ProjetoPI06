package br.senac.pi06.service;

import java.util.List;

import javax.ws.rs.Consumes;
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
import br.senac.pi06.validator.StudentValidator;

@Path("/student")
public class StudentService {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(Student user) {
		try {
			StudentException studentException = StudentValidator.validate(user);
			if (studentException != null)
				throw studentException;

			StudentDao.getInstance().persist(user);
			return Response
					.status(Response.Status.NO_CONTENT)
					.build();
		} catch (StudentException e) {
			e.printStackTrace();
			return Response
					.status(Response.Status.NOT_ACCEPTABLE)
					.entity("{\"message\": \""+e.getMessage()+"\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response
					.status(Response.Status.BAD_REQUEST)
					.build();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response read() {
		Response response;
		try {
			List<Student> list = StudentDao.getInstance().findAll();
			response = Response
					.status(Response.Status.OK)
					.entity(list)
					.type(MediaType.APPLICATION_JSON)
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			response  = Response
					.status(Response.Status.BAD_REQUEST)
					.build();
		}
		return response;
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response update(Student user){
		Response response;
		try {
			StudentException userException = StudentValidator.validate(user);
			if (userException != null)
				throw userException;

			StudentDao.getInstance().merge(user);
			response = Response
					.status(Response.Status.NO_CONTENT)
					.build();
		} catch (StudentException e) {
			e.printStackTrace();
			response = Response
					.status(Response.Status.NOT_ACCEPTABLE)
					.entity("{\"message\": \""+e.getMessage()+"\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			response = Response
					.status(Response.Status.BAD_REQUEST)
					.entity(null)
					.build();
		}

		return response;
	}

}
