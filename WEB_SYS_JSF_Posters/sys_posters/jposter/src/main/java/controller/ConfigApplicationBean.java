package controller;

import java.io.Serializable;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.application.FacesMessage;
import javax.inject.Inject;
import javax.inject.Named;

import exception.NegocioException;
import service.UsuarioService;
import util.CreateUserUtil;
import util.FacesMessageUtil;

@Named
@ApplicationScoped
public class ConfigApplicationBean implements Serializable {

	@Inject
	private UsuarioService userService;
	private static final long serialVersionUID = 1L;

	public ConfigApplicationBean() {

	}

	@PostConstruct
	private void initApplication() {
		this.createUserAdmin(this.userService);
	}

	// HardCode para criar usuario Admin
	private void createUserAdmin(UsuarioService usuarioService) {

		try {
			
			CreateUserUtil.createUserAdmin(usuarioService);
			this.userService = null;
			
		} catch (NegocioException e) {
			FacesMessageUtil.templateMSG(e.getMessage(), FacesMessage.SEVERITY_ERROR);
		}
	}

	public void initApp() {
		return;
	}

}
