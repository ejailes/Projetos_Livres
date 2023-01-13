package controller;

import java.io.Serializable;

import javax.faces.application.FacesMessage;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import org.primefaces.model.file.UploadedFile;

import exception.NegocioException;
import model.Poster;
import service.PosterService;
import util.FacesMessageUtil;

@Named
@ViewScoped
public class CriarPosterBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private PosterService posterService;
	@Inject
	private Poster poster;
	private UploadedFile uploadedFile;

	public Poster getPoster() {
		return poster;
	}

	public void setPoster(Poster poster) {
		this.poster = poster;
	}

	@Transactional
	public void salvar() {

		try {

			byte[] bytes = uploadedFile.getContent();
			this.poster.setImgCapa(bytes);
			this.poster.formatTexto();
			this.poster = this.posterService.salvarPoster(this.poster);

		} catch (NegocioException e) {

			FacesMessageUtil.templateMSG(e.getMessage(), FacesMessage.SEVERITY_ERROR);
		}

	}

	public UploadedFile getUploadedFile() {
		return uploadedFile;
	}

	public void setUploadedFile(UploadedFile uploadedFile) {
		this.uploadedFile = uploadedFile;
	}

}
