package br.senac.pi06.service;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.senac.pi06.dao.CityDao;
import br.senac.pi06.dao.StudentDao;
import br.senac.pi06.exception.StudentException;
import br.senac.pi06.model.City;
import br.senac.pi06.model.Student;
import br.senac.pi06.util.Util;
import br.senac.pi06.validator.StudentValidator;

@Path("/student")
public class StudentService {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Student s) {
		try {
			StudentException ex = StudentValidator.validate(s);
			if (ex != null)
				throw ex;

			Student student = StudentDao.getInstance().persist(s);
			return Response.status(Response.Status.OK).entity(student).type(MediaType.APPLICATION_JSON).build();
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

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response readById(@PathParam("id") String id) {
		try {
			Student s = StudentDao.getInstance().getById(id);
			return Response.status(Response.Status.OK).entity(s).type(MediaType.APPLICATION_JSON).build();
			
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}
	
	@GET
	@Path("/instituicao")
	@Produces(MediaType.APPLICATION_JSON)
	public Response tipoinst(@QueryParam("tipo") String tipo) {
		try {
			List<Student> list = StudentDao.getInstance().getBytipoinst(tipo);
			return Response.status(Response.Status.OK).entity(list).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
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

	@DELETE
	@Path("/{id}")
	public Response deleteById(@PathParam("id") String id) {
		try {
			StudentDao.getInstance().removeById(id);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

}
