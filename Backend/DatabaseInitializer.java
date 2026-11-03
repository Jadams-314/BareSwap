import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseInitializer {
    public static void initialize(Database database) throws SQLException {
        try (Connection conn = database.getConnection(); Statement st = conn.createStatement()) {
            st.execute("""
                CREATE TABLE IF NOT EXISTS students (
                    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL
                )
            """);
            st.execute("""
                CREATE TABLE IF NOT EXISTS listings (
                    listing_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    seller_id INTEGER NOT NULL,
                    title TEXT NOT NULL
                        CHECK(length(trim(title)) > 0),
                    description TEXT NOT NULL,
                    price_cents INTEGER
                        CHECK(price_cents >= 0),
                    listing_type TEXT NOT NULL
                        CHECK(listing_type IN ('sale', 'trade', 'both')),
                    status TEXT NOT NULL DEFAULT 'available'
                        CHECK(status IN (
                            'available', 'reserved', 'sold',
                            'traded', 'removed'
                        )),
                    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(seller_id)
                        REFERENCES students(student_id),
                    CHECK(
                        listing_type = 'trade'
                        OR price_cents IS NOT NULL
                    )
                )
                """);
            st.execute("""
                CREATE TABLE IF NOT EXISTS requests (
                    request_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    listing_id INTEGER NOT NULL,
                    sender_id INTEGER NOT NULL,
                    request_type TEXT NOT NULL
                        CHECK(request_type IN ('buy', 'trade')),
                    offered_price_cents INTEGER
                        CHECK(offered_price_cents >= 0),
                    message TEXT,
                    status TEXT NOT NULL DEFAULT 'pending'
                        CHECK(status IN (
                            'pending', 'accepted', 'declined', 'cancelled'
                        )),
                    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(listing_id)
                        REFERENCES listings(listing_id),
                    FOREIGN KEY(sender_id)
                        REFERENCES students(student_id),
                    CHECK(
                        (request_type = 'buy'
                            AND offered_price_cents IS NOT NULL)
                        OR
                        (request_type = 'trade'
                            AND offered_price_cents IS NULL)
                    )
		)
            """);
            st.execute("""
                CREATE TABLE IF NOT EXISTS trade_items (
                    request_id INTEGER NOT NULL,
                    offered_listing_id INTEGER NOT NULL,
                    PRIMARY KEY(request_id, offered_listing_id),
                    FOREIGN KEY(request_id)
                        REFERENCES requests(request_id)
                        ON DELETE CASCADE,
                    FOREIGN KEY(offered_listing_id)
                        REFERENCES listings(listing_id)
                )
                """);

            System.out.println("Bare Swap database tables are ready.");
        }
    }
}