from dotenv import load_dotenv
load_dotenv()
from orchestractor import app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
