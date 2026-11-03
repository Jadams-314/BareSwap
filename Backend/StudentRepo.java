import java.sql.*;

public class StudentRepo {
    private final Database database;

    public StudentRepo(Database database) {
        this.database = database;
    }

    public void createStudent(String firstName, String lastName,
                              String email, String passwordHash)
            throws SQLException {

        String sql = """
            INSERT INTO students(first_name, last_name, email, password_hash)
            VALUES (?, ?, ?, ?)
            """;

        try (Connection c = database.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setString(1, firstName);
            ps.setString(2, lastName);
            ps.setString(3, email);
            ps.setString(4, passwordHash);
            ps.executeUpdate();
        }
    }
}