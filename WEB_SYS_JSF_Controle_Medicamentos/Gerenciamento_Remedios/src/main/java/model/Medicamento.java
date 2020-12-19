package model;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import database.MedicamentoDAO;

public class Medicamento implements Serializable {

	// var aux para verificar se registro foi salvo com sucesso
	private boolean salvo = false;
	private Connection conn;

	private int id;
	private String nome;
	// Ref para salvar no banco
	private int foreignKeyLab;
	// Para exiber na tabalea
	private String nomeLab;
	private String prescricao;
	private String registroMS;
	private double preco;
	private boolean checkId;

	public Medicamento() {

		this.conn = MedicamentoDAO.getConnection();
	}

	public Medicamento(int id, String nome, String nomeLab, String presc, String regMS, double preco) {

		this.id = id;
		this.nome = nome;
		this.nomeLab = nomeLab;
		this.prescricao = presc;
		this.registroMS = regMS;
		this.preco = preco;
		this.conn = MedicamentoDAO.getConnection();
	}

	public Connection getConn() {
		return conn;
	}

	public void setConn(Connection conn) {
		this.conn = conn;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
		this.findMed(id);
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

	public boolean getSalvo() {

		return this.salvo;
	}
	
	public boolean getCheckId() {

		return this.checkId;
	}

	public void insertMed() {

		String sql = "INSERT INTO med (id, lab, nome, prescricao, registro_rem, preco) VALUES(?, ?, ?, ?, ?, ?);";
		PreparedStatement pStatement = null;
		this.salvo = false;
		try {

			pStatement = this.conn.prepareStatement(sql);

			pStatement.setString(1, null);
			pStatement.setInt(2, this.foreignKeyLab);
			pStatement.setString(3, this.nome);
			pStatement.setString(4, this.prescricao);
			pStatement.setString(5, this.registroMS);
			pStatement.setDouble(6, this.preco);
			pStatement.executeUpdate();
			this.salvo = true;

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}
	}

	public List<Medicamento> selectMedicamentos() {

		String sql = "SELECT * FROM med";
		PreparedStatement pStatement = null;
		List<Medicamento> meds = null;

		try {

			pStatement = this.conn.prepareStatement(sql);
			ResultSet result = pStatement.executeQuery();

			meds = new ArrayList<Medicamento>();
			for (boolean loop = result.next(); loop != false; loop = result.next()) {

				int id = result.getInt("id");
				String nome = result.getString("nome");
				String prescricao = result.getString("prescricao");
				String rMs = result.getString("registro_rem");
				double preco = result.getDouble("preco");

				// Recuperar nome Lab
				int refLab = result.getInt("lab");
				Laboratorio lab = new Laboratorio();
				lab.findLab(refLab);

				String nomeLab = lab.getNome();
				lab = null;

				meds.add(new Medicamento(id, nome, nomeLab, prescricao, rMs, preco));

			}

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}

		return meds;
	}

	public void deletar(int id) {

		String sql = "DELETE FROM med WHERE id = ?;";
		PreparedStatement pStatement = null;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setInt(1, id);
			pStatement.executeUpdate();

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}

	}
	
	public void findMed(int idMed) {

		String sql = "SELECT * FROM med WHERE id = ?;";
		PreparedStatement pStatement = null;
		// Var para testar se existe registro
		this.checkId = false;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setInt(1, idMed);
			ResultSet result = pStatement.executeQuery();

			for (boolean loop = result.next(); loop != false; loop = result.next()) {

				this.id = result.getInt("id");
				this.nome = result.getString("nome");
				this.prescricao = result.getString("prescricao");
				this.registroMS = result.getString("registro_rem");
				this.preco = result.getDouble("preco");

				// Recuperar nome Lab
				int refLab = result.getInt("lab");
				Laboratorio lab = new Laboratorio();
				lab.findLab(refLab);

				this.nomeLab = lab.getNome();
				lab = null;
			
				//sucesso
				this.checkId = true;
			}

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}

	}

	public boolean updateMed() {

		String sql = "UPDATE med SET nome = ?, prescricao = ?, lab = ?,  registro_rem = ?,  preco = ? WHERE id = ?;";
		PreparedStatement pStatement = null;
		boolean result = false;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setString(1, this.nome);
			pStatement.setString(2, this.prescricao);
			pStatement.setInt(3, this.foreignKeyLab);
			pStatement.setString(4, this.registroMS);
			pStatement.setDouble(5, this.preco);
			pStatement.setInt(6, this.id);
			pStatement.executeUpdate();
			result = true;

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}

		return result;
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
