public class Main {
    public static void main(String[] args) {
        try {
            Database db = Database.production();
            DatabaseInitializer.initialize(db);

            System.out.println("Bare Swap database initialized successfully.");
        } catch (Exception e) {
            System.err.println("Database startup failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}