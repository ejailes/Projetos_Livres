package model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(PermissaoUsuario.class)
public abstract class PermissaoUsuario_ {

	public static volatile SingularAttribute<PermissaoUsuario, Usuario> usuario;
	public static volatile SingularAttribute<PermissaoUsuario, PermissaoUsuarioID> id;
	public static volatile SingularAttribute<PermissaoUsuario, Permissao> permissao;

	public static final String USUARIO = "usuario";
	public static final String ID = "id";
	public static final String PERMISSAO = "permissao";

}

