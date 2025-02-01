package util;

import java.io.Serializable;
import java.sql.Connection;

import javax.inject.Inject;

import repository.infra.LaboratorioDAO;
import repository.infra.MedicamentoDAO;

public class Repositorios implements Serializable {

	private static final long serialVersionUID = 4628401453623630408L;
	
	@Inject
	private Connection conn;

	public LaboratorioDAO getLaboratorio() {

		return new LaboratorioDAO(this.conn);
	}
	
	public MedicamentoDAO getMedicamento() {
		
		return new MedicamentoDAO(this.conn);
	}

}
