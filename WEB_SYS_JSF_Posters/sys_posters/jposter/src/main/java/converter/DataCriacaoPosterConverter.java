package converter;

import java.io.Serializable;
import java.util.Calendar;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.inject.Named;

@Named("dataCriacaoConverter")
public class DataCriacaoPosterConverter implements Converter, Serializable {

	private static final long serialVersionUID = 1L;

	@Override
	public Object getAsObject(FacesContext context, UIComponent component, String value) {
		
		if(value.isEmpty() || !value.isEmpty()) {
			return Calendar.getInstance().getTime();
		}
		
		return null;
	}

	@Override
	public String getAsString(FacesContext context, UIComponent component, Object value) {
		
		return null;
	}

}
