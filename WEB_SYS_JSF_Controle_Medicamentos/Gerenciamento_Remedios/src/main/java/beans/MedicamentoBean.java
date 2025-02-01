package beans;

import java.io.Serializable;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import model.Laboratorio;
import model.Medicamento;
import service.MedicamentoService;
import util.FacesMessageUtil;
import util.Repositorios;

@Named("medBean")
@ViewScoped
public class MedicamentoBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Repositorios repositorios;
	@Inject
	private Medicamento med;
	private boolean checkId = false;

	public List<Laboratorio> getLabs() {

		return this.repositorios.getLaboratorio().todos();
	}

	public List<Medicamento> getMeds() {

		return this.repositorios.getMedicamento().todos();
	}

	public Medicamento getMed() {

		return this.med;
	}

	public void remover(int id) {

		this.repositorios.getMedicamento().remover(id);
	}

	public void salvar() {

		new MedicamentoService(this.repositorios).salvar(med);
		this.med = new Medicamento();
	}

	public boolean isCheckId() {
		return checkId;
	}

	// Validator ID
	public void validatorID() {

		this.med = new MedicamentoService(this.repositorios).checkId(this.med);
		if (this.med == null) {
			FacesMessageUtil.templateMSG("Id numero " + med.getId() + " não encontrado", FacesMessage.SEVERITY_ERROR);
		} else {

			this.checkId = true;
		}
	}

}
