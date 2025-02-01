package repository.infra;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Laboratorio;
import producer.ConnectionProducer;

public class LaboratorioDAO implements repository.Laboratorio {

	private Connection conn;

	public LaboratorioDAO(Connection conn) {
		this.conn = conn;
	}

	@Override
	public void novo(Laboratorio laboratorio) {

		String sql = "INSERT INTO lab (id, nome) VALUES(?, ?);";
		PreparedStatement pStatement = null;
		try {

			pStatement = this.conn.prepareStatement(sql);

			pStatement.setString(1, null);
			pStatement.setString(2, laboratorio.getNome());
			pStatement.executeUpdate();

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			ConnectionProducer.closeState(pStatement);
		}
	}

	@Override
	public List<Laboratorio> todos() {

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

			ConnectionProducer.closeState(pStatement);
		}

		return labs;
	}

	@Override
	public Laboratorio porId(Integer id) {

		String sql = "SELECT * FROM lab WHERE id = ?;";
		Laboratorio laboratorio = null;
		PreparedStatement pStatement = null;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setInt(1, id);
			ResultSet result = pStatement.executeQuery();

			for (boolean loop = result.next(); loop != false; loop = result.next()) {

				laboratorio = new Laboratorio();
				laboratorio.setId(result.getInt("id"));
				laboratorio.setNome(result.getString("nome"));
			}

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			ConnectionProducer.closeState(pStatement);
		}

		return laboratorio;
	}

	@Override
	public boolean atualizar(Laboratorio laboratorio) {

		String sql = "UPDATE lab SET nome = ? WHERE id = ?;";
		PreparedStatement pStatement = null;
		boolean result = false;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setString(1, laboratorio.getNome());
			pStatement.setInt(2, laboratorio.getId());
			pStatement.executeUpdate();
			result = true;

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			ConnectionProducer.closeState(pStatement);
		}

		return result;
	}

	@Override
	public boolean remover(Integer id) {

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

			ConnectionProducer.closeState(pStatement);
		}

		return resut;
	}

}
