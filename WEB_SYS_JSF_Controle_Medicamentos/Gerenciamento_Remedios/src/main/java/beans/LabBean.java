package beans;

import java.io.Serializable;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.ValidatorException;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import database.MedicamentoDAO;
import model.Laboratorio;

@Named("labBean")
@ViewScoped
public class LabBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private String nome;
	@Inject
	private Laboratorio lab;

	// Criação de novo Lab
	public void setNome(String nome) {

		this.lab.setNome(nome);
		this.lab.insertLab();
		this.adicionarLabSucesso(nome);

	}

	public String getNome() {

		return null;
	}

	// Get List Laboratórios
	public List<Laboratorio> getLabs() {

		return this.lab.selectLabs();
	}

	public void remover(int n) {

		boolean response = this.lab.deletar(n);

		if(!response) {
			
			this.falhaExclucao();
		}
	}

	public String editar() {

		return "/editarlab.jsf";
	}

	public Laboratorio getLab() {

		// Verificação de id diferente de nulo lançar uma msg caso nulo
		return this.lab;
	}

	public void alterar() {

		System.out.println("Alterar Lab");
		this.validatorID();

		// Se update Sucesso mostre msg
		if (this.lab.updateLab()) {

			this.alterLabSucesso();
			
		} else {
			
			//se quiser adicionar msg de falha caso ocorra
		}

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

		if (!this.lab.getCheckId()) {

			this.lab.findLab(this.lab.getId());

			if (!this.lab.getCheckId()) {

				FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,
						"Id numero " + this.lab.getId() + " não encontrado", null));

			}
		}
	}

	private void adicionarLabSucesso(String nome) {

		this.templateMSG("Laboratório " + nome + " foi salvo com sucesso !!", FacesMessage.SEVERITY_INFO);
	}

	private void alterLabSucesso() {

		this.templateMSG("Laboratório com ID " + this.lab.getId() + " foi alterado com sucesso !!", FacesMessage.SEVERITY_INFO);
	}
	
	private void falhaExclucao() {
		
		this.templateMSG("Não é possível excluir esse laboratório, existe medicamento dependente dele.", FacesMessage.SEVERITY_ERROR);
	}

	private void templateMSG(String msg, FacesMessage.Severity tipoAlerta) {

		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(tipoAlerta, msg, null));
		
	}
}