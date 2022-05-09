import re
import json
def flatten(t):
    return [item for sublist in t for item in sublist]
with open('screenshots.json') as file:
  str = file.read()
  ranges = [(int(m.group(1)), len(m.group(2)) - 1) for m in re.finditer(r'"i([0-9]+)":("[^"]*"|false)', str)]
  with open('screenshots.ranges.json', 'w') as f:
    json.dump(flatten(ranges), f, separators=(',', ':'))