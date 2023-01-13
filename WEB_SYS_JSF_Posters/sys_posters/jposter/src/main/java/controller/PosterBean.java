package controller;

import java.io.Serializable;

import javax.faces.application.FacesMessage;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import model.Poster;
import model.RevisaoPoster;
import model.StatusPoster;
import service.PosterService;
import util.FacesMessageUtil;

@Named
@ViewScoped
public class PosterBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private PosterService posterService;
	private Poster poster;
	@Inject
	private RevisaoPoster revisao;

	//Verificar ID
	public String init() {

		if (this.poster.getId() == null) {
			return "home?faces-redirect=true";
		}

		return null;
	}

	@Transactional
	public String solicitarRevisao() {

		try {

			this.posterService.solicitarRevisao(this.poster, this.revisao);
			return "revisao_posters?faces-redirect=true";

		} catch (Exception e) {

			System.err.println(e.getMessage());
		}

		return null;

	}

	public Poster getPoster() {
		return poster;
	}

	public void setPoster(Poster poster) {
		this.poster = poster;
	}

	public RevisaoPoster getRevisao() {
		return revisao;
	}

	public void setRevisao(RevisaoPoster revisao) {
		this.revisao = revisao;
	}
	
	@Transactional
	public String publicar() {
		
		try {

			this.poster.setStatus(StatusPoster.CHECKED);
			this.poster = this.posterService.salvarPoster(this.poster);

			return "revisao_posters?faces-redirect=true";

		} catch (Exception e) {

			FacesMessageUtil.getFacesMessage("Erro inesperado", FacesMessage.SEVERITY_ERROR);
		}
		
		return null;
	}
}
