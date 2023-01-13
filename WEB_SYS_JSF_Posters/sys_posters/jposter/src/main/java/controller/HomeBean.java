package controller;

import java.io.Serializable;

import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import util.PaginacaoUtil;

@Named
@ViewScoped
public class HomeBean implements Serializable {

	private static final long serialVersionUID = 1L;
	 
	@Inject
	private PaginacaoUtil pagUtil;

	public PaginacaoUtil getPagUtil() {
		return this.pagUtil;
	}

}
