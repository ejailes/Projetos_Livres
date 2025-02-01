package service;

import java.io.Serializable;

import javax.faces.application.FacesMessage;

import model.Laboratorio;
import util.FacesMessageUtil;
import util.Repositorios;

public class LaboratorioService implements Serializable {

	private static final long serialVersionUID = 1L;
	private Repositorios repositorios;

	public LaboratorioService(Repositorios repositorios) {
		this.repositorios = repositorios;
	}

	public void salvar(Laboratorio laboratorio) {

		String status;
		if (this.checkId(laboratorio)) {

			status = " foi salvo com sucesso !!";
			this.repositorios.getLaboratorio().atualizar(laboratorio);
			
		} else {

			status = " foi alterado com sucesso !!";
			this.repositorios.getLaboratorio().novo(laboratorio);
		}

		FacesMessageUtil.templateMSG("Laboratório " + laboratorio.getNome() + status, FacesMessage.SEVERITY_INFO);
	}

	public void deletar(int n) {
		if (!this.repositorios.getLaboratorio().remover(n)) {
			FacesMessageUtil.templateMSG("Não é possível excluir esse laboratório, existe medicamento dependente dele.",
					FacesMessage.SEVERITY_ERROR);
		}
	}

	public boolean checkId(Laboratorio lab) {

		if (this.repositorios.getLaboratorio().porId(lab.getId()) != null) {
			return true;
		}

		return false;
	}

}
