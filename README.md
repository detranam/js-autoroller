# js-autoroller

## The Future Of This App

In all honesty, this app is going to expand a lot. I'm going to need to add some tools, such as a spreadsheet scraper to get all necessary values. Once acquired, those files should be turned into json files for easy cross-compatibility. Potentially even having some sort of HTML page/application to allow for GUI interaction, hopefully allowing people to create their own characters by simply clicking on the traits they want, then potentially exporting it as a json file then utilizing another tool to print the JSON values onto the character sheet PDF.

## TODO

- [x] Autoroll and print stats.
- [x] Allow user input of data in order to calculate various statistics.
- [x] Create character object for a 'one shot expendable' character. This should lay most of the groundwork for creating a 'full' character object.
- [x] Python scraper for Spreadsheets to allow for easier data input: new folder with various 'tools' inside to allow data collection.
- [x] Extract certain files as either folders or modules, whichever would make the code most readable and maintainable.
- [ ] Allow for importation of **.json* files.
- [ ] Create a pdf exporter for the 'one shot' character object.
- [ ] Create a full-fledged character object to allow for different saved outputs into JSON format. This should effectively be created as a copy of the character sheet to allow easy query of, for example.
- [ ] HTML/Flask (?) GUI for assigning character traits. This might be easiest done by utilizing python and flask, as I've done that before and it's not very difficult.
- [ ] Some sort of client-side downloader for filled-out character sheets, whether that includes simply sending the json file, or preferably a pdf downloader to abstract the application from the consumer.

## JSON Compatibility

### RPG Module Outline

In order to be able to import (at least for now) the cyberpunk weapons/armor data, I have to find a standard way to organize the 'random' values for each. When creating a 'one-shot' character, you should be automatically assigned weapons and armor as a part of your initialization. For example, if you get, for example, the 10% chance of getting a 'rifle', then inside of that chance you have 10 possible weapons, I don't want to have to load EVERY single json file, only the ones that are randomly rolled. Thus, I need some sort of overall file that assigns weights to each individual json file. This file should be named *percents.json*, and should simply be a file that has the percent, as a number, assigned directly to the exact filename of the JSON file that has the list of weapons and stats that are of that weapon category. Then, inside that same folder, should be all the JSON files with all the weapon types inside them.

### Individual JSON File Structure

To allow for different precisions when dealing with the percent, there must be one element in each JSON file of the form *"_PRECISION" : precisionvalue* in order to tell the program how large of a number to roll. This allows for deviation from the standard integer percent, and allows for something to have (for example) a percent of acquisition of 11.232%. **NOTE: All the percents in each individual *.json description file MUST add up to the precision.**

### 'Presicion' in Json Files

For example, with a *_PRECISION* of 0, we are utilizing integer values. This means that all percents must add up to 100. For simplicity's sake, it breaks down to this: all percents must add up to 10^(2+*_PRECISION*). If they do not, the file is invalid.
