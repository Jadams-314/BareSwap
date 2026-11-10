import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.SwingUtilities;

public class FrontEndTest {
    
    private static JPanel contentPanel;

    static class Item {
        String id;
        String name;
        String description;
        double price;

        public Item(String id, String name, String description, double price) {
            this.id = id;
            this.name = name;
            this.description = description != null ? description : "No description provided.";
            this.price = price;
        }
    }

    public static void main(String[] args) {
        
        SwingUtilities.invokeLater(FrontEndTest::setupGUI);

        
        CompletableFuture<Void> future = loadItems();
        if (future != null) {
            future.join();
        }
    }

    private static void setupGUI() {
        JFrame frame = new JFrame("Store Items Portfolio");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(500, 600);
        frame.setLocationRelativeTo(null);

      
        contentPanel = new JPanel();
        contentPanel.setLayout(new GridLayout(0, 1, 10, 10)); 
        contentPanel.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));
        contentPanel.setBackground(new Color(245, 245, 247)); 

        // Add scroll mechanics for overflows
        JScrollPane scrollPane = new JScrollPane(contentPanel);
        scrollPane.setBorder(BorderFactory.createEmptyBorder());
        scrollPane.getVerticalScrollBar().setUnitIncrement(16);

        frame.add(scrollPane, BorderLayout.CENTER);
        frame.setVisible(true);
    }

    public static CompletableFuture<Void> loadItems() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:3000/items"))
                .GET()
                .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenAccept(jsonResponse -> {
                    Pattern pattern = Pattern.compile("\\{[^\\}]+\\}");
                    Matcher matcher = pattern.matcher(jsonResponse);
                    while (matcher.find()) {
                        String itemJson = matcher.group();
                        String id = extractField(itemJson, "id");
                        String name = extractField(itemJson, "name");
                        String description = extractField(itemJson, "description");
                        String priceStr = extractField(itemJson, "price");
                        
                        double price = 0.0;
                        if (priceStr != null) {
                            try {
                                price = Double.parseDouble(priceStr);
                            } catch (NumberFormatException e) {
                                
                            }
                        }
                        
                        Item item = new Item(id, name, description, price);
                        
                        
                        SwingUtilities.invokeLater(() -> renderItemInBox(item));
                    }
                })
                .exceptionally(ex -> {
                    System.err.println("Error loading store: " + ex.getMessage());
                    return null;
                });
    }

    private static String extractField(String json, String field) {
        Pattern p = Pattern.compile("\"" + field + "\":\\s*\"?([^\",\\}]+)\"?");
        Matcher m = p.matcher(json);
        if (m.find()) {
            return m.group(1).trim().replace("\"", "");
        }
        return null;
    }

    private static void renderItemInBox(Item item) {
        
        JPanel card = new JPanel();
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(220, 220, 225), 1, true),
                BorderFactory.createEmptyBorder(12, 15, 12, 15)
        ));

        
        JLabel nameLabel = new JLabel(item.name);
        nameLabel.setFont(new Font("SansSerif", Font.BOLD, 16));
        nameLabel.setForeground(new Color(33, 33, 33));

        JLabel descLabel = new JLabel("<html><p style=\"width:300px;\">" + item.description + "</p></html>");
        descLabel.setFont(new Font("SansSerif", Font.PLAIN, 13));
        descLabel.setForeground(new Color(110, 110, 115));
        descLabel.setBorder(BorderFactory.createEmptyBorder(5, 0, 8, 0));

        JLabel priceLabel = new JLabel(String.format("$%.2f", item.price));
        priceLabel.setFont(new Font("SansSerif", Font.BOLD, 14));
        priceLabel.setForeground(new Color(0, 122, 255)); 

       
        card.add(nameLabel);
        card.add(descLabel);
        card.add(priceLabel);

        
        contentPanel.add(card);
        contentPanel.revalidate();
        contentPanel.repaint();
    }
}
