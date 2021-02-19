# js-autoroller

## The Future Of This App

In all honesty, this app is going to expand a lot. I'm going to need to add some tools, such as a Microsoft Excel spreadsheet scraper to get all the values of different values and turning them into json files. Potentially even having some sort of HTML page/application to allow for GUI interaction, hopefully allowing people to create their own characters by simply clicking on the traits they want, then potentially exporting it as a json file then utilizing another tool to actually print this onto the character sheet PDF.

## TODO

- [x] Autoroll and print stats.
- [x] Allow user input of data in order to calculate various statistics.
- [x] Create character object for a 'one shot expendable' character. This should lay most of the groundwork for creating a 'full' character object.
- [x] Python scraper for Spreadsheets to allow for easier data input: new folder with various 'tools' inside to allow data collection.
- [x] Extract certain files as either folders or modules, whichever would make the code most readable and maintainable.
- [ ] Create a pdf exporter for the 'one shot' character object
- [ ] Create a full-fledged character object to allow for different saved outputs into JSON format. This should effectively be created as a copy of the character sheet to allow easy query of, for example.
- [ ] HTML/Flask (?) GUI for assigning character traits. This might be easiest done by utilizing python and flask, as I've done that before and it's not very difficult.
- [ ] Some sort of client-side downloader for filled-out character sheets, whether that includes simply sending the json file, or preferably a pdf downloader to abstract the application from the consumer.
