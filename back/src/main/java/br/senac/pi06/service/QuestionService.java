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

import br.senac.pi06.dao.QuestionDao;
import br.senac.pi06.exception.QuestionException;
import br.senac.pi06.model.Question;
import br.senac.pi06.util.Util;
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
			return Util.printOk();
		} catch (QuestionException e) {
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
			List<Question> list = QuestionDao.getInstance().findAll();
			return Response.status(Response.Status.OK).entity(list).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
	public Response update(Question q){
		try {
			QuestionException ex = QuestionValidator.validate(q);
			if (ex != null)
				throw ex;

			QuestionDao.getInstance().merge(q);
			return Util.printOk();
		} catch (QuestionException e) {
			e.printStackTrace();
			return Util.printNotAccept(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}
	
	@DELETE
	public Response delete(Question q) {
		try {
			QuestionDao.getInstance().remove(q);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

}
