package br.senac.pi06.service;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.senac.pi06.dao.CityDao;
import br.senac.pi06.model.City;
import br.senac.pi06.util.Util;

@Path("/city")
public class CityService {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response readByUf(@QueryParam("uf") String uf) {
		try {
			List<City> list = CityDao.getInstance().getCity(uf);
			return Response.status(Response.Status.OK).entity(list).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

}
