package beans;

import java.io.Serializable;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import model.Laboratorio;
import service.LaboratorioService;
import util.FacesMessageUtil;
import util.Repositorios;

@Named("labBean")
@ViewScoped
public class LabBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Repositorios repositorios;
	@Inject
	private Laboratorio lab;
	private boolean checkId = false;

	public void salvar() {
		new LaboratorioService(repositorios).salvar(this.lab);
	}

	public List<Laboratorio> getLabs() {
		return this.repositorios.getLaboratorio().todos();
	}

	public void remover(int n) {
		new LaboratorioService(repositorios).deletar(n);
	}

	public String editar() {
		return "/editarlab.jsf";
	}

	public Laboratorio getLab() {
		return this.lab;
	}

	public void setLab(Laboratorio lab) {
		this.lab = lab;
	}

	/*
	 * Modelo Metodo validator personalizado
	 * 
	 * public void validatorNome(FacesContext fc, UIComponent comp, Object obj)
	 * throws ValidatorException {
	 * 
	 * try{ throw new ValidatorException(new
	 * FacesMessage(FacesMessage.SEVERITY_ERROR, "Error", nul)); }
	 * 
	 * }
	 */

	// Validator ID
	public void validatorID() {

		this.checkId = new LaboratorioService(repositorios).checkId(this.lab);
		if (!this.checkId) {
			FacesMessageUtil.templateMSG("Id numero " + lab.getId() + " não encontrado", FacesMessage.SEVERITY_ERROR);
		}
	}

	public boolean isCheckId() {
		return checkId;
	}

}