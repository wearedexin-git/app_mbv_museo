
import os
import json

# Percorsi del progetto
ASSETS_DIR = "src/asset"
TARGETS_DIR = "image-targets"
APP_JS = "src/app.js"
TARGETS_DATA = "src/config/targetsData.json"

def get_active_targets():
    """Estrae i target configurati in app.js"""
    with open(APP_JS, 'r') as f:
        content = f.read()
    # Esempio: require('../image-targets/biblioteca_capitello_busto.json');
    import re
    matches = re.findall(r"require\('\.\./image-targets/(.*?)\.json'\)", content)
    return set(matches)

def get_transformed_targets():
    """Elenca i file JSON presenti nella cartella image-targets"""
    if not os.path.exists(TARGETS_DIR):
        return set()
    return {f.replace(".json", "") for f in os.listdir(TARGETS_DIR) if f.endswith(".json")}

def get_config_targets():
    """Elenca gli ID presenti in targetsData.json"""
    with open(TARGETS_DATA, 'r') as f:
        data = json.load(f)
    return {item['id'] for item in data}

def scan_triggers():
    active = get_active_targets()
    transformed = get_transformed_targets()
    config = get_config_targets()
    
    results = []
    for root, dirs, files in os.walk(ASSETS_DIR):
        for f in files:
            if f.startswith("trigger_") and f.lower().endswith((".jpg", ".jpeg", ".png")):
                full_path = os.path.join(root, f)
                parts = root.split(os.sep)
                asset_idx = parts.index("asset")
                subpath = parts[asset_idx+1:] # [room, item, ...]
                
                # Nome base pulito (es. capitello_busto)
                base_name = f.replace("trigger_", "").split(".")[0]
                
                # Prova combinazioni di ID
                # 1. room_item_base (più specifico)
                id_v1 = "_".join(subpath + [base_name])
                # 2. room_base
                id_v2 = f"{subpath[0]}_{base_name}"
                # 3. just base
                id_v3 = base_name
                
                # Scegliamo un identificativo candidato vedendo cosa esiste già
                chosen_id = id_v1
                status = "NEW" # Default
                
                # Check se esiste già in transformed
                existing_id = None
                
                # Sostituito logica con match per sottostringhe o pattern precisi
                for candidate in [id_v1, id_v2, id_v3]:
                     if candidate in transformed:
                         existing_id = candidate
                         break
                
                # Se non trovato tra i transformed, vediamo se as-is nel filesystem
                if not existing_id:
                    # Alcuni file hanno nomi tipo "armatura_1" e il target si chiama "armatura_1"
                    name_no_ext = f.split(".")[0]
                    if name_no_ext in transformed:
                        existing_id = name_no_ext
                
                if existing_id:
                    status = "READY" if existing_id in active else "TRANSFORMED_ONLY"
                else:
                    status = "NEW"
                
                results.append({
                    "file": f,
                    "room": subpath[0],
                    "item": subpath[1] if len(subpath) > 1 else "",
                    "path": full_path,
                    "status": status,
                    "existing_id": existing_id,
                    "candidate_id": id_v1
                })
    return results

def main():
    print(f"{'STATO':<12} | {'ROOM':<15} | {'FILE':<30} | {'TARGET ID'}")
    print("-" * 80)
    
    triggers = scan_triggers()
    triggers.sort(key=lambda x: (x['status'], x['room']))
    
    for t in triggers:
        target_id = t['existing_id'] if t['existing_id'] else t['candidate_id']
        print(f"{t['status']:<12} | {t['room']:<15} | {t['file']:<30} | {target_id}")

if __name__ == "__main__":
    main()
