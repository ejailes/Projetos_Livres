package repository.infra;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import model.Poster;
import model.Poster_;
import model.StatusPoster;
import model.Usuario;
import repository.Posters;

public class PostersDAO implements Posters {

	private EntityManager em;

	public PostersDAO(EntityManager em) {
		this.em = em;
	}

	@Override
	public void novo(Poster poster) {

		this.em.merge(poster);
	}

	@Override
	public void remover(Poster poster) {
		
		this.em.remove(this.em.find(Poster.class, poster.getId()));
	}

	@Override
	public Long quantidadeDePostersChecked() {

		CriteriaBuilder cb = this.em.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);
		Root<Poster> poster = query.from(Poster.class);
		
		query.select(cb.count(poster)).where(cb.equal(poster.get(Poster_.STATUS), StatusPoster.CHECKED));
		return this.em.createQuery(query).getSingleResult();
	}
	
	@Override
	public Long quantidadeDePostersNotChecked() {

		CriteriaBuilder cb = this.em.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);
		Root<Poster> poster = query.from(Poster.class);
		
		query.select(cb.count(poster)).where(cb.equal(poster.get(Poster_.STATUS), StatusPoster.NOTCHECKED));
		return this.em.createQuery(query).getSingleResult();
	}

	@Override
	public Long quantidadeTotalDePosters() {

		CriteriaBuilder cb = this.em.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);
		query.select(cb.count(query.from(Poster.class)));

		return this.em.createQuery(query).getSingleResult();
	}

	
	@Override
	public Long quantidadeDePosterPorAutor(Usuario usuario) {

		CriteriaBuilder cb = this.em.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);

		Root<Poster> poster = query.from(Poster.class);
		query.select(cb.count(poster)).where(cb.equal(poster.get(Poster_.AUTOR), usuario));

		return em.createQuery(query).getSingleResult();
	}

	@Override
	public List<Poster> buscaComPaginacao(int inicio, int tamanho) {

		//Buscar todos os Posters 
		
		CriteriaBuilder cb = this.em.getCriteriaBuilder();
		CriteriaQuery<Poster> query = cb.createQuery(Poster.class);
		query.select(query.from(Poster.class));
		//Root<Poster> poster = query.from(Poster.class);
		//query.select(poster).where(cb.equal(poster.get(Poster_.STATUS), StatusPoster.CHECKED));
		
		return this.em.createQuery(query).setFirstResult(inicio).setMaxResults(tamanho).getResultList();

	}
	
	@Override
	public List<Poster> buscaComPaginacaoPostersCheckeds(int inicio, int tamanho) {

		//Buscar apenas Posters CHECKED
		
		CriteriaBuilder cb = this.em.getCriteriaBuilder();
		CriteriaQuery<Poster> query = cb.createQuery(Poster.class);
		//query.select(query.from(Poster.class));
		Root<Poster> poster = query.from(Poster.class);
		query.select(poster).where(cb.equal(poster.get(Poster_.STATUS), StatusPoster.CHECKED));
		
		return this.em.createQuery(query).setFirstResult(inicio).setMaxResults(tamanho).getResultList();

	}
	
	@Override
	public List<Poster> buscaComPaginacaoPostersNotCheckeds(int inicio, int tamanho) {

		//Buscar apenas Posters NOTCHECKED
		
		CriteriaBuilder cb = this.em.getCriteriaBuilder();
		CriteriaQuery<Poster> query = cb.createQuery(Poster.class);
		//query.select(query.from(Poster.class));
		Root<Poster> poster = query.from(Poster.class);
		query.select(poster).where(cb.equal(poster.get(Poster_.STATUS), StatusPoster.NOTCHECKED));
		
		return this.em.createQuery(query).setFirstResult(inicio).setMaxResults(tamanho).getResultList();

	}

	@Override
	public List<Poster> buscaComPaginacaoPorAutor(Usuario usuario, int inicio, int tamanho) {

		CriteriaBuilder cb = this.em.getCriteriaBuilder();
		CriteriaQuery<Poster> query = cb.createQuery(Poster.class);

		Root<Poster> poster = query.from(Poster.class);
		query.select(poster).where(cb.equal(poster.get(Poster_.AUTOR), usuario));

		return em.createQuery(query).setFirstResult(inicio).setMaxResults(tamanho).getResultList();
	}

	@Override
	public Poster porId(Integer id) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Poster> query = cb.createQuery(Poster.class);

		Root<Poster> poster = query.from(Poster.class);

		@SuppressWarnings({ "unused", "rawtypes", "unchecked" })
		Join<Poster, Usuario> usuarioPoster = (Join) poster.fetch("autor");

		query.select(poster).where(cb.equal(poster.get(Poster_.ID), id));

		Poster result = em.createQuery(query).getSingleResult();

		if (result.getRevisao() != null) {

			result.getRevisao().setDescricao(result.getRevisao().getDescricao());
		}

		return result;
	}

}
