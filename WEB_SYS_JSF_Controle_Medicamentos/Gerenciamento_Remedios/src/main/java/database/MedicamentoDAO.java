package database;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class MedicamentoDAO implements Serializable {

	private static Connection conn;

	private static void initConnection() throws SQLException, ClassNotFoundException {

		if (conn == null) {

			//Nome db: dbmedicamento
			String url = "jdbc:mysql://localhost:3306/dbmedicamento?useTimezone=true&serverTimezone=UTC";
			String user = "root";
			String pass = "";

			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(url, user, pass);
			
			createTableLab();
			createTableMed();
			

		}
	}
	
	public static Connection getConnection() {

		if (conn == null) {

			try {

				initConnection();

			} catch (ClassNotFoundException | SQLException e) {

				System.out.println(e.getMessage());
			}
		}

		return conn;
	}

	public static void closeConn(Connection conn, Statement state) {

		if (conn != null && state != null) {

			closeConn(conn);
			closeState(state);

		} else if (conn != null) {

			closeConn(conn);

		} else if (state != null) {

			closeState(state);
		}

	}

	private static void closeConn(Connection conn) {

		try {
			conn.close();
		} catch (SQLException e) {

			e.printStackTrace();
		}
	}

	public static void closeState(Statement state) {

		if(state == null) {
			
			return ;
		}
		
		try {
			
			state.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
	}
	
	private static void createTableMed() throws SQLException {
	    String sqlCreate = "CREATE TABLE IF NOT EXISTS med"
	            + "  (id           INTEGER AUTO_INCREMENT PRIMARY KEY,"
	            + "   lab          INTEGER NOT NULL,"
	            + "   nome         VARCHAR(80) NOT NULL,"
	            + "   prescricao   VARCHAR(80) NOT NULL,"
	            + "   registro_rem VARCHAR(80) NOT NULL,"
	            + "   preco        DOUBLE(10, 2) NOT NULL,"
	            + "   FOREIGN KEY (lab) REFERENCES lab(id))";

	    Statement stmt = conn.createStatement();
	    stmt.execute(sqlCreate);
	}
	
	private static void createTableLab() throws SQLException {
	    String sqlCreate = "CREATE TABLE IF NOT EXISTS lab"
	            + "  (id           INTEGER AUTO_INCREMENT PRIMARY KEY,"
	            + "   nome         VARCHAR(80) NOT NULL)";

	    Statement stmt = conn.createStatement();
	    stmt.execute(sqlCreate);
	}

}
