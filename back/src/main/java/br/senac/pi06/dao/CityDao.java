package br.senac.pi06.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.senac.pi06.model.City;

public class CityDao {

	private static CityDao instance;
	protected EntityManager em;

	public static CityDao getInstance() {
		if (instance == null)
			instance = new CityDao();
		return instance;
	}

	private CityDao() {
		em = Manager.getInstance().entityManager;
	}

	@SuppressWarnings("unchecked")
	public List<City> getCity(String uf) {
		Query query = em.createQuery("FROM City WHERE uf =:uf");
		query.setParameter("uf", uf);
		try {
			return (List<City>) query.getResultList();
		} catch (Exception e) {
			return null;
		}
	}

	public City getById(int id) {
		return em.find(City.class, id);
	}

	//@SuppressWarnings("unchecked")
	//public List<City> findAll() {
	//	return em.createQuery("FROM * state WHERE enabled = 1").getResultList();
	//}


	public void persist(City city) {
		try {
			em.getTransaction().begin();
			em.persist(city);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}

	public void merge(City city) {
		try {
			em.getTransaction().begin();
			em.merge(city);
			em.getTransaction().commit();
		} catch (Exception ex) {
			ex.printStackTrace();
			em.getTransaction().rollback();
		}
	}

}
