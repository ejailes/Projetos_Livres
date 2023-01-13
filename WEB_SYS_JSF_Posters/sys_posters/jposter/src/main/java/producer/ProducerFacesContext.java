package producer;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

public class ProducerFacesContext {
	
	@Produces
	@RequestScoped
	public FacesContext getFacesContext(){
	    return FacesContext.getCurrentInstance();
	}
	
	@Produces
	@RequestScoped
	public ExternalContext getExternalContext(){
	    return getFacesContext().getExternalContext();
	}
	
}
