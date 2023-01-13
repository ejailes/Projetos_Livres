package model;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Poster.class)
public abstract class Poster_ {

	public static volatile SingularAttribute<Poster, String> texto;
	public static volatile SingularAttribute<Poster, String> introducao;
	public static volatile SingularAttribute<Poster, String> titulo;
	public static volatile SingularAttribute<Poster, Integer> id;
	public static volatile SingularAttribute<Poster, byte[]> imgCapa;
	public static volatile SingularAttribute<Poster, RevisaoPoster> revisao;
	public static volatile SingularAttribute<Poster, Date> dataCriacao;
	public static volatile SingularAttribute<Poster, Usuario> autor;
	public static volatile SingularAttribute<Poster, StatusPoster> status;

	public static final String TEXTO = "texto";
	public static final String INTRODUCAO = "introducao";
	public static final String TITULO = "titulo";
	public static final String ID = "id";
	public static final String IMG_CAPA = "imgCapa";
	public static final String REVISAO = "revisao";
	public static final String DATA_CRIACAO = "dataCriacao";
	public static final String AUTOR = "autor";
	public static final String STATUS = "status";

}

