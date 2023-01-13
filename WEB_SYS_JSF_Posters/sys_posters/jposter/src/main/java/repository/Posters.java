package repository;

import java.util.List;

import model.Poster;
import model.Usuario;

public interface Posters {

	public void novo(Poster poster);
	
	public void remover(Poster poster);

	public Poster porId(Integer id);

	public Long quantidadeDePostersChecked();
	
	public Long quantidadeDePostersNotChecked();
	
	public Long quantidadeTotalDePosters();
	
	public Long quantidadeDePosterPorAutor(Usuario usuario);

	public List<Poster> buscaComPaginacao(int inicio, int tamanho);
	
	public List<Poster> buscaComPaginacaoPostersCheckeds(int inicio, int tamanho);
	
	public List<Poster> buscaComPaginacaoPostersNotCheckeds(int inicio, int tamanho);
	
	public List<Poster> buscaComPaginacaoPorAutor(Usuario usuario, int inicio, int tamanho);
}
