
import json
import re

with open('generated-config.json', 'r') as f:
    config = json.load(f)

with open('src/app.js', 'r') as f:
    lines = f.readlines()

# Replace imports: individua il blocco di righe consecutive
# "const ...Json = require('../image-targets/...json');" e lo sostituisce
# in un colpo solo. Nota: un regex con gruppo ripetuto tipo
# "(\nconst ...)*" qui NON estende il match su righe multiple (ogni riga
# finisce per matchare come occorrenza separata), quindi re.sub la
# sostituiva riga per riga duplicando l'intero blocco N volte.
import_line_re = re.compile(r"^\s*const \w+Json = require\('\.\./image-targets/.*?\.json'\);\s*$")

start = end = None
for i, line in enumerate(lines):
    if import_line_re.match(line):
        if start is None:
            start = i
        end = i
    elif start is not None:
        break

if start is None:
    raise SystemExit('Blocco import image-targets non trovato in src/app.js')

lines[start:end + 1] = [config['appImports'] + '\n']
app_js = ''.join(lines)

# Replace imageTargetData array
app_js = re.sub(
    r"imageTargetData: \[.*?\],",
    f"imageTargetData: [{config['appVarNames']}],",
    app_js
)

# Replace imageTargets list
# We need to extract the names from the imports to put them in the imageTargets array as strings
target_ids = re.findall(r"require\('\.\./image-targets/(.*?)\.json'\)", config['appImports'])
target_ids_str = ", ".join([f"'{tid}'" for tid in target_ids])

app_js = re.sub(
    r"imageTargets: \[.*?\]",
    f"imageTargets: [{target_ids_str}]",
    app_js
)

with open('src/app.js', 'w') as f:
    f.write(app_js)

print("✅ app.js updated successfully with all new targets.")
