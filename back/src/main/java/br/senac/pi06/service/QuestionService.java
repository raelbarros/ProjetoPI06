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

import br.senac.pi06.dao.QuestionDao;
import br.senac.pi06.exception.QuestionException;
import br.senac.pi06.model.Question;
import br.senac.pi06.validator.QuestionValidator;

@Path("/question")
public class QuestionService {


	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	//@Produces(MediaType.APPLICATION_JSON)
	public Response create(Question q) {
		try {
			QuestionException ex = QuestionValidator.validate(q);
			if (ex != null)
				throw ex;

			QuestionDao.getInstance().persist(q);
			return Response.status(Response.Status.NO_CONTENT).build();
		} catch (QuestionException e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_ACCEPTABLE).entity("{\"message\": \""+e.getMessage()+"\"}").type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response read() {
		Response response;
		try {
			List<Question> list = QuestionDao.getInstance().findAll();
			response = Response.status(Response.Status.OK).entity(list).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			response  = Response.status(Response.Status.BAD_REQUEST).build();
		}
		return response;
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response update(Question q){
		Response response;
		try {
			QuestionException ex = QuestionValidator.validate(q);
			if (ex != null)
				throw ex;

			QuestionDao.getInstance().merge(q);
			response = Response.status(Response.Status.NO_CONTENT).build();
		} catch (QuestionException e) {
			e.printStackTrace();
			response = Response.status(Response.Status.NOT_ACCEPTABLE).entity("{\"message\": \""+e.getMessage()+"\"}").type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			response = Response.status(Response.Status.BAD_REQUEST).entity(null).build();
		}

		return response;
	}

}
