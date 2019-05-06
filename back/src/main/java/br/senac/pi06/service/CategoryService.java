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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.senac.pi06.dao.CategoryDao;
import br.senac.pi06.exception.CategoryException;
import br.senac.pi06.model.Category;
import br.senac.pi06.util.Util;
import br.senac.pi06.validator.CategoryValidator;

@Path("/category")
public class CategoryService {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Category c) {
		try {
			CategoryException ex = CategoryValidator.validate(c);
			if (ex != null)
				throw ex;

			CategoryDao.getInstance().persist(c);
			return Util.printOk();
		} catch (CategoryException e) {
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
			List<Category> list = CategoryDao.getInstance().findAll();
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
			Category c = CategoryDao.getInstance().getById(id);
			return Response.status(Response.Status.OK).entity(c).type(MediaType.APPLICATION_JSON).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(Category c) {
		try {
			CategoryException ex = CategoryValidator.validate(c);
			if (ex != null)
				throw ex;

			CategoryDao.getInstance().merge(c);
			return Util.printOk();
		} catch (CategoryException e) {
			e.printStackTrace();
			return Util.printNotAccept(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

	@DELETE
	public Response delete(Category c) {
		try {
			CategoryDao.getInstance().remove(c);
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
			CategoryDao.getInstance().removeById(id);
			return Util.printOk();
		} catch (Exception e) {
			e.printStackTrace();
			return Util.printBadRequest();
		}
	}

}
