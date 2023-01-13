package model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Permissao.class)
public abstract class Permissao_ {

	public static volatile SingularAttribute<Permissao, Integer> id;
	public static volatile SingularAttribute<Permissao, Permissoes> permissao;

	public static final String ID = "id";
	public static final String PERMISSAO = "permissao";

}

