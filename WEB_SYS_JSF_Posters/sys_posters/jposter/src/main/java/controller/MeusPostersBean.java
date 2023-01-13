package controller;

import java.io.Serializable;

import javax.faces.application.FacesMessage;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import model.Poster;
import model.modelolazy.LazyPosterDataModel;
import service.PosterService;
import util.FacesMessageUtil;

@Named
@ViewScoped
public class MeusPostersBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private LazyPosterDataModel lazyPosters;
	@Inject
	private PosterService posterService;

	public LazyPosterDataModel getLazyPosters() {
		return lazyPosters;
	}

	@Transactional
	public void removerPoster(Poster poster) {

		try {
			
			this.posterService.removerPoster(poster);

		} catch (Exception e) {
			e.printStackTrace();
			FacesMessageUtil.templateMSG("Erro ao remover Poster", FacesMessage.SEVERITY_ERROR);
		}

	}

}
