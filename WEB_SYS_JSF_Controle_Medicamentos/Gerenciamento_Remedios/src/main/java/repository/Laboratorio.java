package repository;

import java.util.List;

public interface Laboratorio {

	public void novo(model.Laboratorio laboratorio);
	
	public List<model.Laboratorio> todos();
	
	public model.Laboratorio porId(Integer id);
	
	public boolean atualizar(model.Laboratorio laboratorio);
	
	public boolean remover(Integer id); 
}
