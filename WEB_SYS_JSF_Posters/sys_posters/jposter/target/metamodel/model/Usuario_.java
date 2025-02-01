package model;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Usuario.class)
public abstract class Usuario_ {

	public static volatile ListAttribute<Usuario, PermissaoUsuario> permissoes;
	public static volatile SingularAttribute<Usuario, String> password;
	public static volatile ListAttribute<Usuario, Poster> posters;
	public static volatile SingularAttribute<Usuario, String> nome;
	public static volatile SingularAttribute<Usuario, Integer> id;
	public static volatile SingularAttribute<Usuario, String> email;

	public static final String PERMISSOES = "permissoes";
	public static final String PASSWORD = "password";
	public static final String POSTERS = "posters";
	public static final String NOME = "nome";
	public static final String ID = "id";
	public static final String EMAIL = "email";

}

