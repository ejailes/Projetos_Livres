package repository.infra;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Laboratorio;
import producer.ConnectionProducer;
import repository.Medicamento;

public class MedicamentoDAO implements Medicamento {

	private Connection conn;

	public MedicamentoDAO(Connection conn) {

		this.conn = conn;
	}

	@Override
	public void novo(model.Medicamento medicamento) throws SQLException {

		String sql = "INSERT INTO med (id, lab, nome, prescricao, registro_rem, preco) VALUES(?, ?, ?, ?, ?, ?);";
		PreparedStatement pStatement = null;
		
		try {

			pStatement = this.conn.prepareStatement(sql);

			pStatement.setString(1, null);
			pStatement.setInt(2, medicamento.getForeignKeyLab());
			pStatement.setString(3, medicamento.getNome());
			pStatement.setString(4, medicamento.getPrescricao());
			pStatement.setString(5, medicamento.getRegistroMS());
			pStatement.setDouble(6, medicamento.getPreco());
			pStatement.executeUpdate();

		} catch (SQLException e) {

			throw new SQLException(e);

		} finally {

			ConnectionProducer.closeState(pStatement);
		}
	}

	@Override
	public List<model.Medicamento> todos() {

		String sql = "SELECT * FROM med";
		PreparedStatement pStatement = null;
		List<model.Medicamento> meds = null;

		try {

			pStatement = this.conn.prepareStatement(sql);
			ResultSet result = pStatement.executeQuery();

			meds = new ArrayList<model.Medicamento>();
			for (boolean loop = result.next(); loop != false; loop = result.next()) {

				model.Medicamento medicamento = new model.Medicamento();
				medicamento.setId(result.getInt("id"));
				medicamento.setNome(result.getString("nome"));
				medicamento.setPrescricao(result.getString("prescricao"));
				medicamento.setRegistroMS(result.getString("registro_rem"));
				medicamento.setPreco(result.getDouble("preco"));
				medicamento.setForeignKeyLab(result.getInt("lab"));

				// Recuperar nome Lab
				LaboratorioDAO labDAO = new LaboratorioDAO(conn);
				Laboratorio laboratorio = labDAO.porId(medicamento.getForeignKeyLab());

				medicamento.setNomeLab(laboratorio.getNome());
				meds.add(medicamento);

			}

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			ConnectionProducer.closeState(pStatement);
		}

		return meds;
	}

	@Override
	public model.Medicamento porId(Integer id) {

		String sql = "SELECT * FROM med WHERE id = ?;";
		PreparedStatement pStatement = null;
		model.Medicamento medicamento = null;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setInt(1, id);
			ResultSet result = pStatement.executeQuery();

			for (boolean loop = result.next(); loop != false; loop = result.next()) {

				medicamento = new model.Medicamento();
				
				medicamento.setId(result.getInt("id"));
				medicamento.setNome(result.getString("nome"));
				medicamento.setPrescricao(result.getString("prescricao"));
				medicamento.setRegistroMS(result.getString("registro_rem"));
				medicamento.setPreco(result.getDouble("preco"));
				medicamento.setForeignKeyLab(result.getInt("lab"));

				// Recuperar nome Lab
				LaboratorioDAO labDAO = new LaboratorioDAO(this.conn);
				Laboratorio laboratorio = labDAO.porId(medicamento.getForeignKeyLab());

				medicamento.setNomeLab(laboratorio.getNome());

			}

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			ConnectionProducer.closeState(pStatement);
		}

		return medicamento;
	}

	@Override
	public void atualizar(model.Medicamento medicamento) throws SQLException {

		String sql = "UPDATE med SET nome = ?, prescricao = ?, lab = ?,  registro_rem = ?,  preco = ? WHERE id = ?;";
		PreparedStatement pStatement = null;

		try {

			pStatement = this.conn.prepareStatement(sql);

			pStatement.setString(1, medicamento.getNome());
			pStatement.setString(2, medicamento.getPrescricao());
			pStatement.setInt(3, medicamento.getForeignKeyLab());
			pStatement.setString(4, medicamento.getRegistroMS());
			pStatement.setDouble(5, medicamento.getPreco());
			pStatement.setInt(6, medicamento.getId());
			pStatement.executeUpdate();

		} catch (SQLException e) {

			throw new SQLException(e);

		} finally {

			ConnectionProducer.closeState(pStatement);
		}

	}

	@Override
	public void remover(Integer id) {

		String sql = "DELETE FROM med WHERE id = ?;";
		PreparedStatement pStatement = null;

		try {

			pStatement = this.conn.prepareStatement(sql);
			pStatement.setInt(1, id);
			pStatement.executeUpdate();

		} catch (SQLException e) {

			e.printStackTrace();

		} finally {

			ConnectionProducer.closeState(pStatement);
		}

	}

}
