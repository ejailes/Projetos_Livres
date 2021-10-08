package producer;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

@SuppressWarnings("serial")
@ApplicationScoped
public class ConnectionProducer implements Serializable {

	private static Connection conn;

	public ConnectionProducer() throws ClassNotFoundException, SQLException {

		if (conn == null) {

			// Nome db: dbmedicamento
			String url = "jdbc:mysql://localhost:3306/dbmedicamento?useTimezone=true&serverTimezone=UTC";
			String user = "user";
			String pass = "abcd1234";

			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(url, user, pass);

			createTableLab();
			createTableMed();

		}
	}

	@Produces
	public Connection getConnection() {

		if (conn != null) {
			return conn;
		}

		throw new RuntimeException("Erro ao criar PreparedStatement");
	}

	public static void closeState(Statement state) {

		if (state == null) {

			return;
		}

		try {

			state.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
	}

	//Metodo Util caso necessario fechar conexao
	public void closeConn(Connection conn, Statement state) {

		if (conn != null && state != null) {

			this.closeConn(conn);
			closeState(state);

		} else if (conn != null) {

			this.closeConn(conn);

		} else if (state != null) {

			closeState(state);
		}

	}

	private void closeConn(Connection conn) {

		try {
			conn.close();
		} catch (SQLException e) {

			e.printStackTrace();
		}
	}

	private void createTableMed() throws SQLException {
		String sqlCreate = "CREATE TABLE IF NOT EXISTS med" + "  (id           INTEGER AUTO_INCREMENT PRIMARY KEY,"
				+ "   lab          INTEGER NOT NULL," + "   nome         VARCHAR(80) NOT NULL,"
				+ "   prescricao   VARCHAR(80) NOT NULL," + "   registro_rem VARCHAR(80) NOT NULL,"
				+ "   preco        DOUBLE(10, 2) NOT NULL," + "   FOREIGN KEY (lab) REFERENCES lab(id))";

		Statement stmt = conn.createStatement();
		stmt.execute(sqlCreate);
	}

	private void createTableLab() throws SQLException {
		String sqlCreate = "CREATE TABLE IF NOT EXISTS lab" + "  (id           INTEGER AUTO_INCREMENT PRIMARY KEY,"
				+ "   nome         VARCHAR(80) NOT NULL)";

		Statement stmt = conn.createStatement();
		stmt.execute(sqlCreate);
	}

}
