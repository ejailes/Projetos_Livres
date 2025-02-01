package model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class PermissaoUsuarioID implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer usuarioId;
	private Integer permissaoId;

	public PermissaoUsuarioID() {

	}

	public PermissaoUsuarioID(Integer usuarioId, Integer permissaoId) {
		super();
		this.usuarioId = usuarioId;
		this.permissaoId = permissaoId;
	}

	public Integer getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(Integer usuarioId) {
		this.usuarioId = usuarioId;
	}

	public Integer getPermissaoId() {
		return permissaoId;
	}

	public void setPermissaoId(Integer permissaoId) {
		this.permissaoId = permissaoId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((permissaoId == null) ? 0 : permissaoId.hashCode());
		result = prime * result + ((usuarioId == null) ? 0 : usuarioId.hashCode());
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
		PermissaoUsuarioID other = (PermissaoUsuarioID) obj;
		if (permissaoId == null) {
			if (other.permissaoId != null)
				return false;
		} else if (!permissaoId.equals(other.permissaoId))
			return false;
		if (usuarioId == null) {
			if (other.usuarioId != null)
				return false;
		} else if (!usuarioId.equals(other.usuarioId))
			return false;
		return true;
	}

}
