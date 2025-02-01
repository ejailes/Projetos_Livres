package converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import model.Poster;
import util.Repositorios;

@Named
public class PosterConverter implements Converter, Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Repositorios repositorios;

	@Override
	@Transactional
	public Object getAsObject(FacesContext context, UIComponent component, String value) {

		Poster poster = new Poster();

		if (value != null && !value.isEmpty()) {

			try {

				Integer id = Integer.parseInt(value);
				poster = this.repositorios.getPosters().porId(id);

			} catch (Exception e) {

				e.printStackTrace();
			}

		}

		return poster;
	}

	@Override
	public String getAsString(FacesContext context, UIComponent component, Object value) {

		return null;
	}

}
