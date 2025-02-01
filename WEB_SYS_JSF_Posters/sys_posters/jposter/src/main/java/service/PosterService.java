package service;

import java.io.Serializable;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.inject.Inject;

import exception.NegocioException;
import model.Poster;
import model.RevisaoPoster;
import util.FacesMessageUtil;
import util.PaginacaoUtil;
import util.Repositorios;

public class PosterService implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Repositorios repositorios;

	public PosterService() {

	}

	public Poster salvarPoster(Poster poster) throws NegocioException {

		try {

			if(poster.getRevisao() != null) {
				poster.setRevisao(null);
			}
			
			this.repositorios.getPosters().novo(poster);
			poster = new Poster();
			FacesMessageUtil.templateMSG("Poster salva com sucesso !", FacesMessage.SEVERITY_INFO);

		} catch (Exception e) {

			throw new NegocioException("Erro ao criar Poster");
		}

		return poster;
	}

	public String solicitarRevisao(Poster poster, RevisaoPoster revisao) throws NegocioException {

		if (revisao.getDescricao().isEmpty()) {
			throw new NegocioException("Descrição vazia");
		}

		try {

			poster.setRevisao(revisao);
			this.repositorios.getPosters().novo(poster);
			return "revisao_posters?faces-redirect=true";

		} catch (Exception e) {

			throw new NegocioException(e.getMessage());
		}

	}

	public List<Poster> postersPorPaginacao(int paginaInicio) {

		//return this.repositorios.getPosters().buscaComPaginacao(paginaInicio, PaginacaoUtil.QTD_PAGINACAO);
		return this.repositorios.getPosters().buscaComPaginacaoPostersCheckeds(paginaInicio, PaginacaoUtil.QTD_PAGINACAO);

	}

	public void removerPoster(Poster poster) {

		this.repositorios.getPosters().remover(poster);
	}

	public Poster getPosterPorId(Integer id) {

		return this.repositorios.getPosters().porId(id);
	}

}
