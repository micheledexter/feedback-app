# Prime Academy Feedback Form

This project is a simple feedback form with a user and admin client to it.

## User client

The user client contains 4 feedback inputs:
* Feeling - How the user feels about how the day went (scale of 1-5)
* Understanding - How well the user understood the material (scale of 1-5)
* Support - How much the user felt supported by the staff (scale of 1-5)
* Comments - Any comments the user wants to leave (text input)
* Thank-you & reset - A thank-you for the feedback if the entry was successfully submitted and an "oops" message if there was a problem with the submission (either because the form wasn't sent to the database properly, or because they tried to double-submit)

## Admin client

The admin client contains a table with all of the feedback ever received. The admin has two things they may do with the table entries:
* Flag - Flag the entry for locating it later with ease
* Delete - Delete any entry upon confirmation

## Additional functionality

There are a few different things in place to avoid possible errors, especially in the user client.

* User-client-side routing - In order to quickly get the user to where they need to be, client-side routing prevents users from accidentally going to the wrong card if they directly type in an address of a card that would cause them to skip over earlier cards.
* Disabled buttons until conditions are met - The user may not continue to the next part of the feedback until they've filled out and saved their feedback on the current card. Once feedback is saved, the buttons will be enabled to let you know you may continue the form process
* A progress bar - At the top of the user client there's a progress bar so that the user can see about how far they are through the feedback form. Only once it's full may the user submit their feedback.
* Common-error handling - If the user tries to type a page in manually to the address bar thinking they are going to a page whose URL looks similar, because there are very few pages for this app, we'll redirect them to the page we *think* they meant instead of to an "error 404" page.