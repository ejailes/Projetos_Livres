package model;

import java.io.Serializable;

public class UsuarioDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String nome;
	private String email;

	public UsuarioDTO(Usuario usuario) {
		this.id = usuario.getId();
		this.nome = usuario.getNome();
		this.email = usuario.getEmail();
	}

	public UsuarioDTO(Integer id, String nome, String email) {

		this.id = id;
		this.nome = nome;
		this.email = email;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Usuario getUsuario() {

		Usuario usuario = null;

		if (this.id != null) {

			usuario = new Usuario();
			usuario.setId(this.id);
			usuario.setEmail(this.email);
			usuario.setNome(this.nome);

		}

		return usuario;
	}

	@Override
	public String toString() {
		return "UsuarioDTO [id=" + id + ", nome=" + nome + ", email=" + email + "]";
	}

}
