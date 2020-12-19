package beans;

import java.io.Serializable;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import model.Laboratorio;
import model.Medicamento;

@Named("medBean")
@ViewScoped
public class MedicamentoBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Laboratorio lab;
	@Inject
	private Medicamento med;

	public List<Laboratorio> getLabs() {

		return this.lab.selectLabs();
	}

	public Medicamento getMed() {

		return this.med;
	}

	public void remover(int id) {

		this.med.deletar(id);
	}

	public void salvarMedicamento() {

		this.med.insertMed();

		if (this.med.getSalvo()) {
			this.templateMsg("Medicamento " + this.med.getNome() + " adicionado com sucesso !!!",
					FacesMessage.SEVERITY_INFO);
			this.med = new Medicamento();
		} else {

			this.ErroMed();
		}

	}

	private void templateMsg(String msg, FacesMessage.Severity tipoAlerta) {

		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(tipoAlerta, msg, null));

	}

	private void alterMedSucesso() {

		this.templateMsg("Medicamento com ID " + this.med.getId() + " foi alterado com sucesso !!",
				FacesMessage.SEVERITY_INFO);
	}

	private void ErroMed() {

		this.templateMsg("Descrição do Medicamento muito grande", FacesMessage.SEVERITY_ERROR);
	}

	public void alterar() {

		this.validatorID();

		if (this.med.updateMed()) {

			this.alterMedSucesso();

		} else {

			// Adicionar msg de falha caso ocorra
		}
	}

	// Validator ID
	public void validatorID() {

		if (!this.med.getCheckId()) {

			this.med.findMed(this.med.getId());

			if (!this.med.getCheckId()) {

				FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,
						"Id numero " + this.med.getId() + " não encontrado", null));

			}
		}
	}

}
