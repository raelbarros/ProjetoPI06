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

import br.senac.pi06.dao.SurveyDao;
import br.senac.pi06.exception.SurveyException;
import br.senac.pi06.model.Survey;
import br.senac.pi06.validator.SurveyValidator;

@Path("/survey")
public class SurveyService {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	//@Produces(MediaType.APPLICATION_JSON)
	public Response create(Survey survey) {
		try {
			SurveyException ex = SurveyValidator.validate(survey);
			if (ex != null)
				throw ex;

			SurveyDao.getInstance().persist(survey);
			return Response.status(Response.Status.NO_CONTENT).build();
		} catch (SurveyException e) {
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
			List<Survey> list = SurveyDao.getInstance().findAll();
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
	public Response update(Survey survey){
		Response response;
		try {
			SurveyException ex = SurveyValidator.validate(survey);
			if (ex != null)
				throw ex;

			SurveyDao.getInstance().merge(survey);
			response = Response.status(Response.Status.NO_CONTENT).build();
		} catch (SurveyException e) {
			e.printStackTrace();
			response = Response.status(Response.Status.NOT_ACCEPTABLE).entity("{\"message\": \""+e.getMessage()+"\"}").type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			response = Response.status(Response.Status.BAD_REQUEST).entity(null).build();
		}

		return response;
	}


}
