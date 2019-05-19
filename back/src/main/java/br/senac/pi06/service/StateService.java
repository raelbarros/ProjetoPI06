package br.senac.pi06.service;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.senac.pi06.dao.StateDao;
import br.senac.pi06.model.State;
import br.senac.pi06.util.Util;

@Path("/state")
public class StateService {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response read() {
		try {
			List<State> list = StateDao.getInstance().findAll();
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
			State c = StateDao.getInstance().getById(id);
			return Response.status(Response.Status.OK).entity(c).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

}
