JS Date Range Picker
====================

There is a cross-browser solution presented to specify a date range for further activities (queries etc.). The date range can be selected from a pre-defined list of spans and the date fields can be straight-edited. The date picker is integrated with the date spanner to specify the date from a popup calendar. Different short date formats can be set and calendar weeks can be set to begin from Monday or Sunday. The dates entered are checked for correctness and saved to hidden fields in standard format (ISO-8601 extended).

How it works
------------

The classes use the functionality supplied by *common.js* and the view is determined by *datespck.css*.

The *frm* object is created from the *Forms* class after page load to manage the fields status and contents. The *dsp* object is created from the *DateSpan* class and the event handlers are attached during initialization. The date fields are filled according to spans list selection and checked for a correctness after editing.

Clicking the calendar button invokes the *DatePick* class initiation by *dsp*. The calendar popup is created and the event handlers are attached. Clicking any day returns the date to *dsp* to be saved in the date field. Any click outside the calendar cancels the pickup. In both cases the events are detached and the popup is closed.

The *dsp.CheckDates* method checks the range and saves the dates in hidden fields. The *frm.Term* method detaches the events and disables the fields.

About the example
-----------------

The *example.php* creates necessary html/css/js shell to run the demo. You can edit the text arrays in the beginnig of the code in your preferred language. The *$sets* array contains 2 settings that are passed to JS:

- *dats* defines a date format: delimiter and day-month-year sequence (yy - full year); for example, 01 Jan 2013: '.dmyy' means
*01.09.2013*, '/ymd' means *13/09/01*, '-yymd' means *2013-09-01*;
- *wsuf* determines the calendar week's 1st day: false - Monday, true - Sunday; Monday is recommended as meeting ISO-8601 (try Jan 2016).

In real applications the settings should be specified from some preferences panel and made available via some globals mechanism. It concerns the texts also in multilingual applications. The classes presume certain field id's to be used. Some of id's can be passed as parameters during instantiation. Although the pickup calendar is created on the fly, it's skeleton must be prepared server-side.

The years list is complemented dynamically if needed. If the date format is incorrect (do not correspond to *dats* setting), then the field label's color becomes red. Pressing *Go* button displays the dates' hidden values, *End* button deactivates the datespan form.

The package
-----------

The following files are included:

1. *datespan.js*  - class of date span selection & editing and checking;
2. *datepick.js*  - class of date selection from a popup calendar;
3. *common.js*    - support functions and classes;
4. *datespck.css* - date span and pick styling;
5. *calendar.png* - date picker button's image;
6. *example.php*  - html/css/js shell for functionality demonstration;
7. *readme.md*    - the file you are reading.

The *Date Range Picker* is implemented in vRegistry solution (see [vregistry.com]).

  [vregistry.com]: http://vregistry.com/hlp/en
