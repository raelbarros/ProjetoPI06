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

import br.senac.pi06.dao.CourseDao;
import br.senac.pi06.model.Course;
import br.senac.pi06.validator.CourseValidator;

@Path("/course")
public class CourseService {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(Course course) {
		try {
			Exception Exception = CourseValidator.validate(course);
			if (Exception != null)
				throw Exception;

			CourseDao.getInstance().persist(course);
			return Response
					.status(Response.Status.NO_CONTENT)
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
			List<Course> list = CourseDao.getInstance().findAll();
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
	public Response update(Course course){
		Response response;
		try {
			Exception userException = CourseValidator.validate(course);
			if (userException != null)
				throw userException;

			CourseDao.getInstance().merge(course);
			response = Response
					.status(Response.Status.NO_CONTENT)
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
