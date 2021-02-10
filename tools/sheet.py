import csv
import json
import argparse


parser = argparse.ArgumentParser()
# parser.add_argument("file_path", type=,
#                     help="path to the csv file you wish to scrape into json")

args = parser.parse_args()

# if not len(sys.argv) > 1:
#     print("\nERROR: No Argument Passed")
#     print("Try \'sheet.py --help\' for more information\n")
#     exit(1)
#args.file_path = '..\\bows.csv'
with open('../bows.csv', 'r') as csv_file:
    inputdict = csv.DictReader(csv_file)
    print(inputdict)
    for row in inputdict:
        print(row)
    print("test, bay bee")