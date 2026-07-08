
import json
import re

with open('generated-config.json', 'r') as f:
    config = json.load(f)

with open('src/app.js', 'r') as f:
    app_js = f.read()

# Replace imports (from line 31 to 73 approx)
# We look for the block of requires
app_js = re.sub(
    r"const .*?Json = require\('\.\./image-targets/.*?\.json'\);(\nconst .*?Json = require\('\.\./image-targets/.*?\.json'\);)*",
    config['appImports'],
    app_js
)

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
