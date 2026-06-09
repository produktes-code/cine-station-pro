import re

with open("/Users/jesusferrer/Desktop/Cloud-Gen-AI-Studio.html", "r") as f:
    content = f.read()

# Look for JavaScript arrays containing backticks or quotes
matches = re.findall(r"\[([`\"'][^\]]*?[`\"'])\]", content)
for i, m in enumerate(matches):
    if len(m) > 20 and "," in m:
        print(f"--- ARRAY {i} ---")
        print(m[:1000])

