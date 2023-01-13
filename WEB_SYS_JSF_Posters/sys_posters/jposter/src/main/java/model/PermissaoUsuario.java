package model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "permissao_usuario")
public class PermissaoUsuario implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	private PermissaoUsuarioID id = new PermissaoUsuarioID();

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH }, fetch = FetchType.EAGER)
	@MapsId("usuarioId")
	private Usuario usuario;

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH }, fetch = FetchType.EAGER)
	@MapsId("permissaoId")
	private Permissao permissao;

	public PermissaoUsuario() {

	}

	public PermissaoUsuario(Usuario usuario, Permissao permissao) {

		this.setId(new PermissaoUsuarioID(usuario.getId(), permissao.getId()));
		this.setUsuario(usuario);
		this.setPermissao(permissao);
	}

	public PermissaoUsuarioID getId() {
		return id;
	}

	public void setId(PermissaoUsuarioID id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Permissao getPermissao() {
		return permissao;
	}

	public void setPermissao(Permissao permissao) {
		this.permissao = permissao;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PermissaoUsuario other = (PermissaoUsuario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}



}
