import json
import re

def convert_events_to_json(input_file='events.txt', output_file='event_payloads.json'):
    events = []
    try:
        with open(input_file, 'r') as f:
            for line in f:
                clean_line = line.strip()
                if clean_line:
                    events.append(clean_line)
        data = {"Events": events}
        with open(output_file, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully converted '{input_file}' to '{output_file}'.")

    except FileNotFoundError:
        print(f"Error: The file '{input_file}' was not found.")
    except Exception as e:
        print(f"An error occurred while processing '{input_file}': {e}")


def convert_enums_to_json(input_file='enums.txt', output_file='enums.json'):
    data = {}
    current_key = None
    # Regex to find section headers like '=== SectionName ==='
    header_pattern = re.compile(r'^===\s*(.+?)\s*===$')

    try:
        with open(input_file, 'r') as f:
            for line in f:
                clean_line = line.strip()
                match = header_pattern.match(clean_line)

                if match:
                    key_name = match.group(1).strip()
                    current_key = key_name
                    data[current_key] = []
                elif current_key and clean_line:
                    data[current_key].append(clean_line)

        with open(output_file, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully converted '{input_file}' to '{output_file}'.")

    except FileNotFoundError:
        print(f"Error: The file '{input_file}' was not found.")
    except Exception as e:
        print(f"An error occurred while processing '{input_file}': {e}")


if __name__ == '__main__':
    convert_events_to_json()
    convert_enums_to_json()
    print("\nConversion process complete.")
