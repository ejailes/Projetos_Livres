package service;

import java.io.Serializable;

import javax.faces.application.FacesMessage;

import model.Medicamento;
import util.FacesMessageUtil;
import util.Repositorios;

@SuppressWarnings("serial")
public class MedicamentoService implements Serializable {

	private Repositorios repositorios;

	public MedicamentoService(Repositorios repositorios) {

		this.repositorios = repositorios;
	}

	public void salvar(Medicamento med) {

		try {

			String status;
			if (this.checkId(med) != null) {

				status = " foi alterado com sucesso !!";
				this.repositorios.getMedicamento().atualizar(med);

			} else {

				status = " foi salvo com sucesso !!";
				this.repositorios.getMedicamento().novo(med);
			}

			FacesMessageUtil.templateMSG("Medicamento " + med.getNome() + status, FacesMessage.SEVERITY_INFO);
			
		} catch (Exception e) {
			
			FacesMessageUtil.templateMSG("Ocorreu algum erro, verifique se o nome do medicamento e muito extenso", FacesMessage.SEVERITY_ERROR);
		}

	}

	public Medicamento checkId(Medicamento med) {

		Medicamento medicamento = this.repositorios.getMedicamento().porId(med.getId());
		return medicamento;
	}

}
