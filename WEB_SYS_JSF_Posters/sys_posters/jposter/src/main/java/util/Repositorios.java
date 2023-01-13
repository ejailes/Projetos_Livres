package util;

import java.io.Serializable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import repository.Posters;
import repository.Usuarios;
import repository.infra.PostersDAO;
import repository.infra.UsuariosDAO;

public class Repositorios implements Serializable {

	private static final long serialVersionUID = 1L;

	@PersistenceContext
	private EntityManager em;

	public Posters getPosters() {

		return new PostersDAO(this.em);
	}

	public Usuarios getUsuarios() {

		return new UsuariosDAO(this.em);
	}

}
