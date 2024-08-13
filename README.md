# Nathan Hutchison's Solution to the Integrum ESG Card App Challenge

Hi there! This repository acts as my solution to the challenge set by Integrum ESG. I will briefly detail my process for each of the tasks set!

## Add a Dark Mode

Starting with the Dark Mode Toggling - I created a toggle button within the NavBar of the page that includes two icons, a sun and a moon, representing light and dark mode respectively. The application uses the current Dark Mode state to determine which of these icons should be fully opaque, and which should be semi-transparent (at 20% opacity). Clicking on this toggles a state variable, which updates the main "html" class list to add or remove the class "dark". This is the standard way of implementing a dark mode with Tailwind CSS, and allows for easier thematic styling later on

Toggling Dark Mode adjusts the colour scheme of the website, from a cream and blue to a dark grey and orange colour scheme. The shadow on the original cards is swapped for a bright orange glowing effect, with the background flipped from light grey to dark grey and text flipped from black to white. The "New Entry" and "Update Entry" pages are also updated with a similar styling to maintain consistency throughout.


## Add a Scheduled Date to the cards

The first step of adding a Scheduled Date was to adjust the Backend to support the extra field. I adjusted the Entry interface in context.d.ts to add the "scheduled" field with type "Date | string". I similarly adjusted the Entry model of the schema in schema.prisma to add the field "scheduled" with type DateTime. Lastly for the Backend, I adjusted the create and update server functions in server.ts to format the scheduled date in the same way as the "created_at" date was formatted to prevent server errors.

On the Frontend, there were only minor adjustments needed. This included adapting the NewEntry.tsx and EditEntry.tsx files to include a new field for the scheduled date (using the same idea as the pre-existing created_at date field). I also adjusted the entries in AllEntries.tsx to add the new field to the cards, represented at the top right of the card.


## Add tests to the Backend

To test the Backend, I made use of the pre-existing file server.test.ts. Within this testing suite, I wrote up 11 tests in total, broken into five sections for each of the different database functions, namely:

* Get All Entries
* Get a Single Entry
* Create an Entry
* Delete an Entry
* Update an Entry

The tests make use of "Prisma.entry.create()" when needed to pre-populate a database when required. This helps isolate the tests to only use one function within each test case. The testing suite also deletes any existing local database entries before each test is run to prevent potential clashing data.

Except for the Get All Entries section, each section tests against a theoretically correct case and at least one incorrect case (e.g. faulty data, missing data, getting non-existent entries). 


### Other minor changes

Some further small Quality of Life changes I made:

* Creating or Updating a card now pops up with an Alert to tell the user their action was received. This action happens regardless of the success status of the create/update attempt, but in a real-world example this could be achieved by slightly modifying the context wrapper to include a return of the server response to the component
* Automatically redirecting back to the Home page once an Entry has been created/updated (including refreshing the component itself to prevent stale data) 
* Adjusting the layout of the forms slightly by increasing width and adding labels to the input fields (to help differentiate the "Created At" date and "Scheduled For" date)
