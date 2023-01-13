package service;

import java.io.Serializable;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import exception.NegocioException;
import util.Repositorios;
import util.UsuarioUtil;

public class LoginService implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Repositorios repositorios;
	@Inject
	private HttpServletRequest req;

	public LoginService() {

	}

	public void login(String email, String password) throws ServletException, NegocioException {

		this.req.login(email, password);
		// adiciona UsuarioUtil com nome usuario e outros metodos na sessão do JAAS
		this.req.getSession().setAttribute("usuario", new UsuarioUtil(this.repositorios, email));

	}
}
