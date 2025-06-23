-- Create shops table for Bulawayo Shop Map
CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    building VARCHAR(255) NOT NULL,
    floor VARCHAR(100) NOT NULL,
    shop_number VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    whatsapp VARCHAR(20) NOT NULL,
    operating_hours TEXT NOT NULL,
    weekly_special TEXT,
    images TEXT[], -- Array of image URLs
    popular_items TEXT[], -- Array of popular item names
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster searches
CREATE INDEX IF NOT EXISTS idx_shops_category ON shops(category);
CREATE INDEX IF NOT EXISTS idx_shops_building ON shops(building);
CREATE INDEX IF NOT EXISTS idx_shops_name ON shops(name);

-- Insert sample data for Bulawayo shops
INSERT INTO shops (name, building, floor, shop_number, category, description, whatsapp, operating_hours, weekly_special, popular_items) VALUES
('Trendy Threads', 'Ascot Shopping Centre', 'Ground Floor', 'G12', 'clothing', 'Latest fashion trends for men and women', '+263771234567', 'Mon-Sat: 8:00-18:00, Sun: 10:00-16:00', '20% off all dresses this week!', ARRAY['Dresses', 'Jeans', 'T-shirts']),
('TechHub Electronics', 'Parkade Centre', '1st Floor', 'F15', 'electronics', 'Mobile phones, accessories and repairs', '+263772345678', 'Mon-Fri: 8:30-17:30, Sat: 9:00-15:00', 'Free screen protector with every phone purchase', ARRAY['Samsung phones', 'iPhone accessories', 'Chargers']),
('Mama''s Kitchen', 'City Centre Complex', 'Ground Floor', 'G08', 'food', 'Traditional Zimbabwean cuisine and takeaways', '+263773456789', 'Mon-Sat: 7:00-19:00', 'Buy 2 sadza meals, get 1 free drink', ARRAY['Sadza & Beef', 'Chicken & Rice', 'Matemba']),
('Glow Beauty Salon', 'Ascot Shopping Centre', '1st Floor', 'F22', 'beauty', 'Hair styling, nails, and beauty treatments', '+263774567890', 'Tue-Sat: 9:00-17:00', 'Manicure + Pedicure combo for $15', ARRAY['Hair braiding', 'Gel nails', 'Facials']),
('Shoe Palace', 'Parkade Centre', 'Ground Floor', 'G25', 'accessories', 'Quality footwear for the whole family', '+263775678901', 'Mon-Sat: 8:00-18:00, Sun: 10:00-15:00', 'Buy 2 pairs, get 30% off the second pair', ARRAY['Sneakers', 'Formal shoes', 'Sandals']),
('Zimtech Repairs', 'TM Hypermarket Complex', '1st Floor', 'F08', 'services', 'Computer and phone repair services', '+263776789012', 'Mon-Fri: 8:00-17:00, Sat: 9:00-13:00', 'Free diagnosis this week', ARRAY['Screen repairs', 'Data recovery', 'Virus removal']),
('Fashion Forward', 'Ascot Shopping Centre', 'Ground Floor', 'G18', 'clothing', 'Affordable fashion for young professionals', '+263777890123', 'Mon-Sat: 9:00-18:00', 'Buy 3 items, get 1 free', ARRAY['Blazers', 'Shirts', 'Trousers']),
('Spice Market', 'City Centre Complex', 'Ground Floor', 'G15', 'food', 'Fresh spices and traditional ingredients', '+263778901234', 'Mon-Sat: 7:30-18:30', '10% off bulk purchases', ARRAY['Curry spices', 'Traditional herbs', 'Cooking oils']);
