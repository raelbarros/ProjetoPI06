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

import br.senac.pi06.dao.CourseDao;
import br.senac.pi06.exception.CourseException;
import br.senac.pi06.model.Course;
import br.senac.pi06.util.Util;
import br.senac.pi06.validator.CourseValidator;

@Path("/course")
public class CourseService {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(Course course) {
		try {
			CourseException ex = CourseValidator.validate(course);
			if (ex != null)
				throw ex;

			CourseDao.getInstance().persist(course);
			return Util.printOk();
		} catch (CourseException e) {
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
			List<Course> list = CourseDao.getInstance().findAll();
			return Response.status(Response.Status.OK).entity(list).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}

	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
	public Response update(Course course){
		try {
			CourseException ex = CourseValidator.validate(course);
			if (ex != null)
				throw ex;

			CourseDao.getInstance().merge(course);
			return Util.printOk();
		} catch (CourseException e) {
			e.printStackTrace();
			return Util.printNotAccept(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}

	}
	
	@DELETE
	public Response delete(Course course) {
		try {
			CourseDao.getInstance().remove(course);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}


}
