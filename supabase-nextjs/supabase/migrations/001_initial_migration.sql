-- This is a simple migration script for Supabase

-- Create a new table
CREATE TABLE example_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);