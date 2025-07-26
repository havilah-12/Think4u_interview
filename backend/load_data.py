import os
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# DB connection string
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:Jo12sam12%40@localhost:3306/LSO")

# Tables and corresponding CSV filenames
TABLE_CSV_MAP = {
    "distribution_centers": "distribution_centers.csv",
    "inventory": "inventory_items.csv", 
    "orders": "orders.csv",
    "order_items": "order_items.csv",
    "products": "products.csv",
    "users": "users.csv"
}

# CSV folder
CSV_FOLDER = os.getenv("CSV_FOLDER", r"c:\Users\havil\Downloads\Think4u_interview\data")
print("CSV folder path:", CSV_FOLDER)

# Connect to DB
engine = create_engine(DATABASE_URL)

# Insert data into each table
with engine.begin() as connection:  # begin() ensures commit or rollback
    for table, csv_file in TABLE_CSV_MAP.items():
        file_path = os.path.join(CSV_FOLDER, csv_file)
        print(f"\n🚀 Inserting into `{table}` from `{file_path}`...")
        try:
            df = pd.read_csv(file_path)
            df.to_sql(table, con=connection, if_exists='append', index=False)
            print(f"✅ Inserted {len(df)} records into `{table}`")
        except Exception as e:
            print(f"❌ Failed to insert data for `{table}`: {e}")
