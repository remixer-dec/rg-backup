import re
import json
with open('screenshots.json') as file:
  str = file.read()
  ranges = [(int(m.group(1)), m.span()[0] + 4 + len(m.group(1)), m.span()[1] - 1) for m in re.finditer(r'"i([0-9]+)":("[^"]+")', str)]
  with open('screenshots.ranges0.json', 'w') as f:
    json.dump(ranges, f, separators=(',', ':'))