package validator;

import java.io.Serializable;
import java.util.regex.Pattern;

import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.ValidatorException;
import javax.inject.Named;

import org.primefaces.model.file.UploadedFile;

import exception.NegocioException;
import util.FacesMessageUtil;

@Named
@RequestScoped
public class Validator implements Serializable {

	private static final long serialVersionUID = 1L;
	private Pattern patternEmail;
	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

	public Validator() {
		this.patternEmail = Pattern.compile(EMAIL_PATTERN);
	}

	public void uploadImagem(FacesContext context, UIComponent component, Object value) throws ValidatorException {

		try {

			UploadedFile uploadedFile = (UploadedFile) value;
			validateFileSize(uploadedFile);
			validateContentType(uploadedFile);

		} catch (NullPointerException e) {

			throw new ValidatorException(
					FacesMessageUtil.getFacesMessage("Imagem de Capar é obrigatorio", FacesMessage.SEVERITY_ERROR));

		} catch (NegocioException e) {

			throw new ValidatorException(FacesMessageUtil.getFacesMessage(e.getMessage(), FacesMessage.SEVERITY_ERROR));

		} catch (Exception e) {

			throw new ValidatorException(
					FacesMessageUtil.getFacesMessage("Erro inesperado", FacesMessage.SEVERITY_ERROR));
		}

	}

	private void validateContentType(UploadedFile file) throws NegocioException {

		String type = file.getContentType();

		if (!type.equals("image/png") && !type.equals("image/jpeg") && !type.equals("image/jpg")) {

			throw new NegocioException("São permitidas somente imagens (jpeg, jpg e png)");
		}
	}

	private void validateFileSize(UploadedFile file) throws NegocioException {

		if (file.getSize() > 10000000) {

			throw new NegocioException("O tamanho máximo permitido é de 1Mb.");

		}
	}

	public void validationEmail(FacesContext context, UIComponent component, Object value) throws ValidatorException {

		String email = (String) value;
		if (!this.patternEmail.matcher(email).matches()) {
			
			throw new ValidatorException(FacesMessageUtil.getFacesMessage("E-mail Inválido", FacesMessage.SEVERITY_ERROR));
		}

	}

}
