package model;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import exception.NegocioException;

@Entity
@Table(name = "poster")
public class Poster implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date dataCriacao;

	@Column(nullable = false)
	private String titulo;

	@Column(nullable = false)
	private String introducao;

	@Lob
	@Column(nullable = false)
	private String texto;

	@Lob
	@Column(nullable = false)
	private byte[] imgCapa;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(nullable = false)
	private Usuario autor;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, name = "status")
	private StatusPoster status;

	@OneToOne(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.REMOVE,
			CascadeType.DETACH }, orphanRemoval = true)
	private RevisaoPoster revisao;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getIntroducao() {
		return introducao;
	}

	public void setIntroducao(String introducao) {
		this.introducao = introducao;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public byte[] getImgCapa() {
		return imgCapa;
	}

	public void setImgCapa(byte[] imgCapa) {
		this.imgCapa = imgCapa;
	}

	public Usuario getAutor() {
		return autor;
	}

	public void setAutor(Usuario autor) {
		this.autor = autor;
	}

	public StatusPoster getStatus() {
		return status;
	}

	public void setStatus(StatusPoster status) {
		this.status = status;
	}

	public RevisaoPoster getRevisao() {
		return revisao;
	}

	public void setRevisao(RevisaoPoster revisao) {
		this.revisao = revisao;
	}

	@Transient
	public void formatTexto() throws NegocioException {

		this.texto = this.texto.replaceAll("\\s+"," ");
		List<String> palavras = Arrays.asList(this.texto.split("\\s+"));
		for(String palavra : palavras){
			if(palavra.length() > 25) {
				throw new NegocioException("Palvra: " + palavra + " muito longa");
			}
        }
		

	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Poster other = (Poster) obj;
		return Objects.equals(id, other.id);
	}

}
