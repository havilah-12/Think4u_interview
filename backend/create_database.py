import pymysql

# Connect without database
conn = pymysql.connect(
    host="localhost",
    user="root",
    password="Jo12sam12@"
)
cursor = conn.cursor()

# Create database if not exists
cursor.execute("CREATE DATABASE IF NOT EXISTS LSO;")
print(" Database 'LSO' ensured.")

cursor.close()
conn.close()
