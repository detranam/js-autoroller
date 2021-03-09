import csv
import json
import os

'''
I really want to be able to put this python file into a 'pile' 
of CSV's and allow it to churn through them creating json files 
out of those dictionaries that were pulled
'''

# Get a list of all files in current directory
all_files = os.listdir()

# Filter out non *.csv files
csv_files_to_read = []
for path in all_files:
    if path[len(path)-4:len(path)] == '.csv':
        csv_files_to_read.append(path)
        print(f'CSV [{path}] has been added to \'todo\'')

# Create output directory if it doesn't exist
if(os.path.exists('json_out')):
    print("JSON Output directory exists!")
else:
    os.mkdir('json_out',0o666)
    print("JSON Output directory did not exist!\nDirectory was created.")



# json-ify all the *.csv files into a json file with the same name, and add all the
# path names to a txt file for easy consumption by the Javascript reader
for path in csv_files_to_read:
    with open('created_files.txt', 'w') as textout:
        textout.append(csv_files_to_read)
        output_path = f'json_out/{path[:len(path)-4]}.json'
        with open(output_path, 'w') as json_out:
            with open(path, 'r', encoding='utf8') as csv_file:
                inputdict = csv.DictReader(csv_file)
                this_weapon_type_dict = []
                for row in inputdict:
                    this_weapon_type_dict.append(row)
                print(f"JSON.Dumping {path} to {output_path}!")
                json.dump(this_weapon_type_dict, json_out)