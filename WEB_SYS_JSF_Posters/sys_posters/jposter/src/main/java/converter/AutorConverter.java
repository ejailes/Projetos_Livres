package converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;

import model.Usuario;
import model.UsuarioDTO;
import util.UsuarioUtil;

@Named
public class AutorConverter implements Converter, Serializable{

	private static final long serialVersionUID = 1L;
	
	@Inject
	private HttpServletRequest req;
	
	@Override
	public Object getAsObject(FacesContext context, UIComponent component, String value) {
		
		Usuario usuario = null;

		if (value.isEmpty() || !value.isEmpty()) {

			UsuarioUtil usuarioUtil = (UsuarioUtil) this.req.getSession().getAttribute("usuario");
			UsuarioDTO usuarioDTO = usuarioUtil.getUsuarioDTO();

			usuario = usuarioDTO.getUsuario();

		}

		return usuario;
	}

	@Override
	public String getAsString(FacesContext context, UIComponent component, Object value) {
		
		return null;
	}

}
