package repository;

import java.sql.SQLException;
import java.util.List;

public interface Medicamento {

	public void novo(model.Medicamento medicamento) throws SQLException;
	
	public List<model.Medicamento> todos();
	
	public model.Medicamento porId(Integer id);
	
	public void atualizar(model.Medicamento medicamento) throws SQLException;
	
	public void remover(Integer id); 
	
}
