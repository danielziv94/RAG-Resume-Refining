import requests
import os

BASE_URL = "http://localhost:8000"

def test_api():
    # 1. Test Root
    try:
        r = requests.get(f"{BASE_URL}/")
        print(f"Root: {r.status_code} - {r.json()}")
    except Exception as e:
        print(f"Root failed: {e}")
        return

    # 2. Upload PDF
    if not os.path.exists("test_resume.pdf"):
        print("test_resume.pdf not found.")
        return

    files = {'file': open('test_resume.pdf', 'rb')}
    try:
        r = requests.post(f"{BASE_URL}/upload", files=files)
        print(f"Upload: {r.status_code} - {r.json()}")
    except Exception as e:
        print(f"Upload failed: {e}")
        return

    # 3. Refine
    data = {'query': 'Rewrite for a Senior Python Developer role.'}
    try:
        r = requests.post(f"{BASE_URL}/refine", data=data)
        print(f"Refine: {r.status_code} - {r.json()}")
    except Exception as e:
        print(f"Refine failed: {e}")

if __name__ == "__main__":
    test_api()
