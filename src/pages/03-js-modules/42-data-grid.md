---

title: Data Grid
name: data-grid-module
category: modules
subcategory: Component modules
layout: q+tq
id: data-grid-module-page

---

<div class="lead"><p>The Data Grid is a flexible component that allows you to display a range of data results in a variety of different ways</p></div>

For example, we can load a set of data from `Google Sheets` or `Firebase` and display those results in either a table, list element or even using flexbox.

It can be called using JavaScript as a stand alone module, or it can be automatically applied to a container using the class, `js-data-grid` and supplying a set of `data-xyz` attributes (these are listed in the 'options' section below).

### Use (via JavaScript call)

```javascript
DATAGRID.init({
    container: $('#id-of-a-container'),
    datasource: 'sheets',
    layout: 'table',
    includeHeaderRow: true,
    cssClassList: 'some-class another-class__here',
    sheetId: '1Vfqa37CInvrH3WsH4UkWpxKgUzoYqZ7Ij20fJBIfd08',
    sheetRange: 'Sheet1!A1:E'
});
```

**Note**: the Data Grid has to use an underlying datasource to load the required data. Currently, only Google Sheets or Firebase are supported, so you must ensure that you pass in both a Google Sheet Id (of a publicly accessible Sheet) _and_ the required Sheet Range. 

For Firebase, all that's needed is the config string of the database in question, so long as the dataset lives under the University of York's Firebase account.


### Example using Google Sheets in the Table layout

```markup
<div class="js-data-grid" 
data-source="sheets"
data-layout="table"
data-include-header="true"
data-css=""
data-sheet-id="1Vfqa37CInvrH3WsH4UkWpxKgUzoYqZ7Ij20fJBIfd08"
data-sheet-range="Sheet1!A1:E"
></div>
```

<div class="js-data-grid" 
data-source="sheets"
data-layout="table"
data-include-header="true"
data-css=""
data-sheet-id="1Vfqa37CInvrH3WsH4UkWpxKgUzoYqZ7Ij20fJBIfd08"
data-sheet-range="Sheet1!A1:E"
></div>

### Example using Firebase in the List layout

```markup
<div class="js-data-grid-ex" 
data-source="firebase"
data-layout="list"
data-firebase-config="[CONFIG IN HERE]"
></div>
```

<div class="js-data-grid-ex" 
data-source="firebase"
data-layout="list"
data-firebase-config="[CONFIG IN HERE]"
></div>


### Options

  Pass an _options_ object with the following keys:

  * **source** - either 'sheets' or 'firebase'. Where will the data be loaded from?
  * **layout** - the end result of HTML that is output. Select 'table', 'flex' or 'list'.
  * **include-header** - if using the 'table' layout, should the first row be a header? Either 'true' or 'false'. Defaults to 'false'
  * **css** - a list of css classes that can be added to the 
  * **sheet-id** - the publicly accessible id of the Google Sheet you're using as the datasource.
  * **sheet-range** - the range of values within the Google Sheet you're using as the datasource
  * **firebase-config** - the config string of the Firebase entity you're using as a datasource