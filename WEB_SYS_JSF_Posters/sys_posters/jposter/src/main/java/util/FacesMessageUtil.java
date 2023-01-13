package util;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

public class FacesMessageUtil {

	public static void templateMSG(String msg, FacesMessage.Severity tipoAlerta) {
		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(tipoAlerta, msg, null));
		
	}
	
	public static FacesMessage getFacesMessage(String msg, FacesMessage.Severity tipoAlerta) {
		return new FacesMessage(tipoAlerta, msg, null);

	}
}
