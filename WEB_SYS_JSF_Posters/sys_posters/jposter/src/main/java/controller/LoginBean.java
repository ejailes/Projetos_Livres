package controller;

import java.io.Serializable;

import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.ServletException;
import javax.transaction.Transactional;

import exception.NegocioException;
import service.LoginService;
import util.FacesMessageUtil;
import util.UsuarioUtil;

@Named
@RequestScoped
public class LoginBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private LoginService loginService;
	
	@Inject
	private ConfigApplicationBean config;
	
	private String email;
	private String password;

	
	public String init(UsuarioUtil usuarioUtil) {
		
		return UsuarioUtil.redirect(usuarioUtil);
		
	}
	
	@Transactional
	public String login() {

		try {
			
			this.config.initApp();
			this.loginService.login(email, password);
			return "sistema/home?faces-redirect=true";

		} catch (ServletException e) {

			this.password = "";
			FacesMessageUtil.templateMSG("Email ou Senha invalida", FacesMessage.SEVERITY_ERROR);

		} catch (NegocioException e) {

			this.password = "";
			FacesMessageUtil.templateMSG(e.getMessage(), FacesMessage.SEVERITY_ERROR);
		}

		return "";
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
