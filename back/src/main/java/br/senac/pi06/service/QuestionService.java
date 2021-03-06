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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import br.senac.pi06.annotation.Secured;
import br.senac.pi06.dao.QuestionDao;
import br.senac.pi06.exception.QuestionException;
import br.senac.pi06.model.Question;
import br.senac.pi06.util.Util;
import br.senac.pi06.validator.QuestionValidator;

@Path("/question")
public class QuestionService {
	@Context SecurityContext securityContext;

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Secured
	public Response create(Question q, @Context SecurityContext securityContext) {
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

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response readById(@PathParam("id") int id) {
		try {
			Question q = QuestionDao.getInstance().getById(id);
			return Response.status(Response.Status.OK).entity(q).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Secured
	public Response update(Question q, @Context SecurityContext securityContext) {
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
	@Secured
	public Response delete(Question q, @Context SecurityContext securityContext) {
		try {
			QuestionDao.getInstance().remove(q);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@DELETE
	@Path("/{id}")
	@Secured
	public Response deleteById(@PathParam("id") int id, @Context SecurityContext securityContext) {
		try {
			QuestionDao.getInstance().removeById(id);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

}
