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

import br.senac.pi06.dao.CollegeDao;
import br.senac.pi06.model.College;
import br.senac.pi06.validator.CollegeValidator;

@Path("/college")
public class CollegeService {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(College college) {
		try {
			Exception Exception = CollegeValidator.validate(college);
			if (Exception != null)
				throw Exception;

			CollegeDao.getInstance().persist(college);
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
			List<College> list = CollegeDao.getInstance().findAll();
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
	public Response update(College college){
		Response response;
		try {
			Exception userException = CollegeValidator.validate(college);
			if (userException != null)
				throw userException;

			CollegeDao.getInstance().merge(college);
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
