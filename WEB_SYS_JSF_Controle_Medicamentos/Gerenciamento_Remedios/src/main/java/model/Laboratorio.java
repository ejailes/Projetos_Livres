package model;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.validator.ValidatorException;

import database.MedicamentoDAO;

public class Laboratorio implements Serializable {

	private static final long serialVersionUID = 1L;
	private int id;
	private String nome;
	private Connection conn;
	private boolean checkId = false;

	public Laboratorio(int id, String nome) {

		this.id = id;
		this.nome = nome;
		this.conn = MedicamentoDAO.getConnection();

	}

	public Laboratorio() {

		this.conn = MedicamentoDAO.getConnection();

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {

		this.id = id;
		this.findLab(id);
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public boolean getCheckId() {

		return this.checkId;
	}

	public void insertLab() {

		String sql = "INSERT INTO lab (id, nome) VALUES(?, ?);";
		PreparedStatement pStatement = null;
		try {

			pStatement = this.conn.prepareStatement(sql);

			pStatement.setString(1, null);
			pStatement.setString(2, this.nome);
			pStatement.executeUpdate();

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}
	}

	public List<Laboratorio> selectLabs() {

		String sql = "SELECT * FROM lab";
		PreparedStatement pStatement = null;
		List<Laboratorio> labs = null;

		try {

			pStatement = this.conn.prepareStatement(sql);
			ResultSet result = pStatement.executeQuery();

			labs = new ArrayList<Laboratorio>();
			for (boolean loop = result.next(); loop != false; loop = result.next()) {

				int id = result.getInt("id");
				String nome = result.getString("nome");

				labs.add(new Laboratorio(id, nome));

			}

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}

		return labs;
	}

	public boolean deletar(int id) {

		String sql = "DELETE FROM lab WHERE id = ?;";
		PreparedStatement pStatement = null;
		boolean resut = false;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setInt(1, id);
			pStatement.executeUpdate();
			resut = true;

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}
		
		return resut;

	}

	public void findLab(int idLab) {

		String sql = "SELECT * FROM lab WHERE id = ?;";
		PreparedStatement pStatement = null;
		// Var para testar se existe registro
		this.checkId = false;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setInt(1, idLab);
			ResultSet result = pStatement.executeQuery();

			for (boolean loop = result.next(); loop != false; loop = result.next()) {

				this.id = result.getInt("id");
				this.nome = result.getString("nome");
				this.checkId = true;
			}

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			MedicamentoDAO.closeState(pStatement);
		}

	}

	public boolean updateLab() {

		String sql = "UPDATE lab SET nome = ? WHERE id = ?;";
		PreparedStatement pStatement = null;
		boolean result = false;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setString(1, this.nome);
			pStatement.setInt(2, this.id);
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
		Laboratorio other = (Laboratorio) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
