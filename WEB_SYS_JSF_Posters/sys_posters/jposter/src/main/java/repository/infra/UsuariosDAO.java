package repository.infra;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import model.Permissao;
import model.PermissaoUsuario;
import model.PermissaoUsuario_;
import model.Permissao_;
import model.Permissoes;
import model.Usuario;
import model.UsuarioDTO;
import model.Usuario_;
import repository.Usuarios;

public class UsuariosDAO implements Usuarios, Serializable {

	private static final long serialVersionUID = 1L;

	private EntityManager em;

	public UsuariosDAO(EntityManager em) {

		this.em = em;
	}

	private Usuario setPermissaoUsuario(Usuario usuario) {

		if (usuario.getPermissoes().size() > 0) {

			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<Permissao> query = cb.createQuery(Permissao.class);

			Root<Permissao> permissoes = query.from(Permissao.class);
			query.select(permissoes);

			List<Permissao> listaPermissoesDoBanco = em.createQuery(query).getResultList();

			List<PermissaoUsuario> listaPermissoesTemp = new ArrayList<PermissaoUsuario>();

			if (listaPermissoesDoBanco.size() > 0) {

				for (int x = usuario.getPermissoes().size() - 1; x >= 0; x--) {

					// Checa se a permissao atribuida ao usuario já esta salva no banco,
					// se essa permissao existe no banco, seta ela na listaPermissoesTemp
					// para depois atribui-la ao usuario
					int index = listaPermissoesDoBanco.indexOf(usuario.getPermissoes().get(x).getPermissao());
					if (index > -1) {

						listaPermissoesTemp.add(new PermissaoUsuario(usuario, listaPermissoesDoBanco.get(index)));

					} else {

						listaPermissoesTemp.add(usuario.getPermissoes().get(x));

					}

				}

				usuario.setPermissoes(listaPermissoesTemp);

			}
		}

		return usuario;
	}

	public void novo(Usuario usuario) {

		try {

			this.em.merge(setPermissaoUsuario(usuario));

		} catch (Exception e) {

			System.err.println("Error: " + e.getMessage());
		}

	}

	public void atualizarSenha(Usuario usuarioNewPass) {

		Usuario usuario = this.em.find(Usuario.class, usuarioNewPass.getId());
		usuario.setPassword(usuarioNewPass.getPassword());
		this.em.merge(usuario);

	}

	@Override
	public void atualizarDados(UsuarioDTO usuarioDTO) {

		Usuario usuario = this.em.find(Usuario.class, usuarioDTO.getId());
		usuario.setNome(usuarioDTO.getNome());
		usuario.setEmail(usuarioDTO.getEmail());

		this.em.merge(usuario);

	}

	@Override
	public Usuario porEmail(String email) {

		try {

			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<Usuario> query = cb.createQuery(Usuario.class);

			Root<Usuario> usuario = query.from(Usuario.class);
			query.select(usuario).where(cb.equal(usuario.get(Usuario_.EMAIL), cb.parameter(String.class, "email")));

			return em.createQuery(query).setParameter("email", email.toLowerCase()).getSingleResult();

		} catch (NoResultException e) {

			return null;
		}

	}

	@Override
	public List<Usuario> todos() {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Usuario> query = cb.createQuery(Usuario.class);

		Root<Usuario> usuarios = query.from(Usuario.class);
		query.select(usuarios);

		return em.createQuery(query).getResultList();
	}

	@Override
	public List<Usuario> todosComExcecao(Usuario usuario) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Usuario> query = cb.createQuery(Usuario.class);

		Root<Usuario> usuarios = query.from(Usuario.class);
		query.select(usuarios).where(cb.notEqual(usuarios.get(Usuario_.EMAIL), cb.parameter(String.class, "email")));

		return em.createQuery(query).setParameter("email", usuario.getEmail().toLowerCase()).getResultList();
	}

	@Override
	public List<PermissaoUsuario> permissoes(Usuario usuario) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<PermissaoUsuario> query = cb.createQuery(PermissaoUsuario.class);

		Root<PermissaoUsuario> permissoes = query.from(PermissaoUsuario.class);

		// Start Joins

		@SuppressWarnings({ "unused", "rawtypes", "unchecked" })
		Join<PermissaoUsuario, Permissao> permissoesUsuario = (Join) permissoes.fetch(PermissaoUsuario_.PERMISSAO);

		@SuppressWarnings({ "unused", "rawtypes", "unchecked" })
		Join<PermissaoUsuario, Usuario> dadosUsuario = (Join) permissoes.fetch(PermissaoUsuario_.USUARIO);

		// End Joins

		query.select(permissoes)
				.where(cb.equal(permissoes.get(PermissaoUsuario_.USUARIO), cb.parameter(Usuario.class, "usuario")));

		return em.createQuery(query).setParameter("usuario", usuario).getResultList();
	}

	@Override
	public void atualizarPermissoes(Usuario usuario) {

		try {

			this.em.merge(setPermissaoUsuario(usuario));

		} catch (Exception e) {

			System.err.println("Error: " + e.getMessage());
		}

	}

	@Override
	public void deletar(Usuario usuario) {
		this.em.remove(this.em.find(Usuario.class, usuario.getId()));

	}

	@Override
	public int quantidadeDeUsuariosAdmin() {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);

		Root<PermissaoUsuario> permissoes = query.from(PermissaoUsuario.class);
		
		@SuppressWarnings({ "unused", "rawtypes", "unchecked" })
		Join<PermissaoUsuario, Permissao> permissoesUsuario = permissoes.join(PermissaoUsuario_.PERMISSAO);
		/*
		@SuppressWarnings({ "unused", "rawtypes", "unchecked" })
		Join<PermissaoUsuario, Usuario> dadosUsuario = (Join) permissoes.fetch(PermissaoUsuario_.USUARIO);
		*/
		
	
		query.select(cb.count(permissoes))
				.where(cb.equal(permissoes.get(PermissaoUsuario_.PERMISSAO).get(Permissao_.PERMISSAO), Permissoes.ADMIN));

		
		return this.em.createQuery(query).getSingleResult().intValue();

	}
}
