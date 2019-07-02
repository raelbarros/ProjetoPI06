package br.senac.pi06.service;

import java.util.Calendar;
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

import br.senac.pi06.dao.StudentDao;
import br.senac.pi06.dao.SurveyDao;
import br.senac.pi06.exception.SurveyException;
import br.senac.pi06.model.Student;
import br.senac.pi06.model.Survey;
import br.senac.pi06.util.Util;
import br.senac.pi06.validator.SurveyValidator;

@Path("/survey")
public class SurveyService {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Survey survey) {
		Calendar c = Calendar.getInstance();
		survey.setDate(c);
		try {
			SurveyException ex = SurveyValidator.validate(survey);
			if (ex != null)
				throw ex;
			
			SurveyDao.getInstance().persist(survey);
			return Util.printOk();
		} catch (SurveyException e) {
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
			List<Survey> list = SurveyDao.getInstance().findAll();
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
			Survey s = SurveyDao.getInstance().getById(id);
			return Response.status(Response.Status.OK).entity(s).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}
	
	@GET
	@Path("/result_month/{month}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response readAllResultByMonth(@PathParam("month") int month) {
		try {
			List<Survey> list = SurveyDao.getInstance().getAllResultByMonth(month);
			return Response.status(Response.Status.OK).entity(list).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}
	
	@GET
	@Path("/college")
	@Produces(MediaType.APPLICATION_JSON)
	public Response tipoinst(@QueryParam("type") String tipo) {
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
	public Response update(Survey survey) {
		try {
			SurveyException ex = SurveyValidator.validate(survey);
			if (ex != null)
				throw ex;

			SurveyDao.getInstance().merge(survey);
			return Util.printOk();
		} catch (SurveyException e) {
			e.printStackTrace();
			return Util.printNotAccept(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@DELETE
	public Response delete(Survey s) {
		try {
			SurveyDao.getInstance().remove(s);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@DELETE
	@Path("/{id}")
	public Response deleteById(@PathParam("id") int id) {
		try {
			SurveyDao.getInstance().removeById(id);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

}
