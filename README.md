# Tournament Maker

For full technical information about the project refer to the 
[wiki](https://gitlab.stud.idi.ntnu.no/jovre/tournament-maker/-/wikis/home)

### Version

This is the first release of the product

### Known bugs

**Bug 1:** Reloading the page when on the add player screen creates an error

>- No known workarounds

**Bug 2:** Changing results in a previous round in a bracket tournament messes up the following bracket

>- No known workarounds

**Bug 3:** Two people can not be on the add player screen at the same time when using the same database

>- If the program is distributed to additional users, they need to set up their own database with the in `my-pool.js` file provided in the repository

### Additional information

The code for the confetti animation in the CSS has been retrieved from
[codepen](https://codepen.io/zer0kool/pen/KjZWRW) with some alterations. The retrived code is
[free to use](https://blog.codepen.io/documentation/licensing/) with the
[MIT licence](https://opensource.org/licenses/MIT).
