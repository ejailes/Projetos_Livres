package util;

import java.io.Serializable;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import exception.NegocioException;
import model.UsuarioDTO;

public class UsuarioUtil implements Serializable {

	private static final long serialVersionUID = 1L;

	private Repositorios repositorios;
	private UsuarioDTO usuarioDTO;

	public UsuarioUtil() {

	}
	
	public UsuarioUtil(Repositorios repositorios, String email) throws NegocioException {
		this.repositorios = repositorios;
		this.usuarioDTO = new UsuarioDTO(this.repositorios.getUsuarios().porEmail(email));
	}

	public UsuarioDTO getUsuarioDTO() {
		return usuarioDTO;
	}

	public String sair() throws ServletException {

		HttpServletRequest req = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext()
				.getRequest();

		// Encerra sessão JAAS e minha sessão
		req.logout();
		req.getSession().invalidate();

		return "/login?faces-redirect=true";

	}
	
	public static String redirect(UsuarioUtil usuarioUtil) {
		
		if(usuarioUtil != null) {
			return "sistema/home?faces-redirect=true";
		}
		
		return "";	
	}	

}
