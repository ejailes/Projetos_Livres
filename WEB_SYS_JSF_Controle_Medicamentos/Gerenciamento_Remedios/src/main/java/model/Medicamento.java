package model;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Medicamento implements Serializable {

	private int id;
	private String nome;
	// Ref para salvar no banco
	private int foreignKeyLab;
	// Para exiber na tabalea
	private String nomeLab;
	private String prescricao;
	private String registroMS;
	private double preco;

	public Medicamento() {

	}

	public Medicamento(int id, String nome, String nomeLab, String presc, String regMS, double preco) {

		this.id = id;
		this.nome = nome;
		this.nomeLab = nomeLab;
		this.prescricao = presc;
		this.registroMS = regMS;
		this.preco = preco;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;

	}

	public int getForeignKeyLab() {
		return foreignKeyLab;
	}

	public void setForeignKeyLab(int foreignKeyLab) {
		this.foreignKeyLab = foreignKeyLab;
	}

	public void setNomeLab(String nomeLab) {

		this.nomeLab = nomeLab;
	}

	public String getNomeLab() {

		return this.nomeLab;
	}

	public String getPrescricao() {
		return prescricao;
	}

	public void setPrescricao(String prescricao) {
		this.prescricao = prescricao;
	}

	public String getRegistroMS() {
		return registroMS;
	}

	public void setRegistroMS(String registroMS) {
		this.registroMS = registroMS;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
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
		Medicamento other = (Medicamento) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
