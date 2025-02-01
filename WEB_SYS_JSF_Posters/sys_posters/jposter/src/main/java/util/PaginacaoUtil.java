package util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.enterprise.context.Dependent;
import javax.inject.Inject;

import model.Poster;
import service.PosterService;

@Dependent
public class PaginacaoUtil implements Serializable {

	private static final long serialVersionUID = 1L;
	// Controladores de Navegação
	private static final int QTD_POSTERS_POR_PAGINA = 5;
	public static final int QTD_PAGINACAO = 25;

	@Inject
	private Repositorios repositorios;
	@Inject
	private PosterService posterService;

	// Controladores de Posters Carregados;
	private List<Integer> paginas;
	private int primeiraPagina;
	private int ultimaPagina = 0;
	private int paginaAtual;
	private int sizeListPostersTotalBanco;
	private Map<Integer, String> activePagina;

	// Posters Carregados
	private List<Poster> listPostersCarregados;
	private Map<Integer, List<Poster>> mapPostersCarregados;

	public PaginacaoUtil() {

	}

	@PostConstruct
	public void init() {

		this.sizeListPostersTotalBanco = Math.toIntExact(this.repositorios.getPosters().quantidadeDePostersChecked());
		
		this.setPostersCarregados(this.posterService.postersPorPaginacao(0));
		// Inicia na primeira pagina
		this.listPostersCarregados = mapPostersCarregados.get(1);

		this.cleanActivePagina(this.paginas);
		this.setPagActive(1);
		// this.activePagina.put(1, "active");
	}

	public void setPostersCarregados(List<Poster> posters) {

		getMapPostersCarregados(posters);
		this.configuracaoNavegacao();

	}

	public void getMapPostersCarregados(List<Poster> posters) {

		// Variaveis auxiliadoras
		int auxAnt = 0;
		int auxUltimaPagina = this.ultimaPagina != 0 ? (this.ultimaPagina - 1) : 0;
		int auxProx = QTD_POSTERS_POR_PAGINA;
		boolean auxFim = false;

		// Condição para paginas de retorno
		// (Ex: 3 - 4 - 5) - clicando na pagina 3 carrega novas paginas antecessoras
		// (Ex: 1 - 2 - 3)
		if (this.paginaAtual == this.primeiraPagina && this.primeiraPagina > 1) {
			auxUltimaPagina = (this.primeiraPagina - QTD_POSTERS_POR_PAGINA);
		}

		int posterPorPag = this.quantidadeNumerosParaNavegacao(posters.size());
		Map<Integer, List<Poster>> mapPaginas = new HashMap<Integer, List<Poster>>();

		List<Poster> listPoster;
		for (int i = 0; i < posterPorPag; i++) {

			listPoster = new ArrayList<Poster>();
			for (int j = auxAnt; j < auxProx; j++) {

				try {

					listPoster.add(posters.get(j));

				} catch (IndexOutOfBoundsException e) {
					auxFim = true;
					break;
				}
			}

			mapPaginas.put(((1 + i) + auxUltimaPagina), listPoster);
			if (auxFim) {
				break;
			}

			auxAnt = auxProx;
			auxProx += QTD_POSTERS_POR_PAGINA;
		}

		this.mapPostersCarregados = mapPaginas;
	}

	public List<Poster> getListPostersCarregados(int indice) {

		return this.mapPostersCarregados.get(indice);
	}

	public int getPaginaAtual() {
		return paginaAtual;
	}

	public void setPaginaAtual(int paginaAtual) {

		this.listPostersCarregados = mapPostersCarregados.get(paginaAtual);
		this.paginaAtual = paginaAtual;

		this.cleanActivePagina(this.paginas);
		this.setPagActive(paginaAtual);

		if (this.isNotUltimaPagina()) {

			this.setPostersCarregados(this.posterService
					.postersPorPaginacao(((this.ultimaPagina * QTD_POSTERS_POR_PAGINA) - QTD_POSTERS_POR_PAGINA)));
			/*
			 * this.setPostersCarregados(new PosterService(this.repositorios)
			 * .postersPorPaginacao(((this.ultimaPagina * QTD_POSTERS_POR_PAGINA) -
			 * QTD_POSTERS_POR_PAGINA)));
			 */

		} else if (this.isNotPrimeiraPagina()) {

			this.setPostersCarregados(this.posterService
					.postersPorPaginacao((this.primeiraPagina * QTD_POSTERS_POR_PAGINA) - QTD_PAGINACAO));

			/*
			 * this.setPostersCarregados(new PosterService(this.repositorios)
			 * .postersPorPaginacao((this.primeiraPagina * QTD_POSTERS_POR_PAGINA) -
			 * QTD_PAGINACAO));
			 */
		}
	}

	public List<Integer> getPaginas() {
		return paginas;
	}

	public void setPaginas(List<Integer> paginas) {
		this.paginas = paginas;
	}

	private void configuracaoNavegacao() {

		List<Integer> pags = new ArrayList<Integer>(this.mapPostersCarregados.keySet());

		if (pags == null || pags.isEmpty()) {

			return;
		}

		this.paginas = pags;
		this.primeiraPagina = pags.get(0);
		this.ultimaPagina = pags.get(pags.size() - 1);
		// Active Pag
		this.activePagina = new HashMap<Integer, String>();
		this.cleanActivePagina(pags);
		this.setPagActive(paginaAtual);
	}

	private boolean isNotUltimaPagina() {

		if (this.paginaAtual == this.ultimaPagina
				&& this.ultimaPagina < this.quantidadeNumerosParaNavegacao(this.sizeListPostersTotalBanco)) {

			return true;
		}

		return false;
	}

	private boolean isNotPrimeiraPagina() {

		if (this.paginaAtual == this.primeiraPagina && this.primeiraPagina > 1) {

			return true;
		}

		return false;
	}

	public List<Poster> getListPostersCarregados() {
		
		if(this.listPostersCarregados == null) {
			return new ArrayList<Poster>();
		}
		
		this.listPostersCarregados.forEach((poster) -> {
			poster.setTexto(poster.getTexto().substring(0, 28) + ".......");
		});

		return listPostersCarregados;
	}
	

	private int quantidadeNumerosParaNavegacao(int quantidade) {

		return (int) Math.ceil(Double.valueOf(quantidade) / QTD_POSTERS_POR_PAGINA);
	}

	public String getActivePagina(int index) {

		String act = this.activePagina.get(index);
		return act != null ? act : "";

	}

	private void cleanActivePagina(List<Integer> pags) {

		if (pags != null && !pags.isEmpty()) {
			for (Integer n : pags) {
				this.activePagina.put(n, "");
			}
		}

	}

	private void setPagActive(Integer pag) {

		if (this.activePagina != null) {
			this.activePagina.put(pag, "active");
		}
	}
}
