# Boilerplate Build Script
I built this project as a way to get more familiar with build scripting.

I find myself always using the same boilerplate code for new React apps, and this seemed like a good way to automate that. I know I could have just made this into a template repo, but this was for fun/learning, not just functionality.

I make no claims regarding:
- the viability of this code as a base for your projects
- the security of the authentication
- the elegance of this code
- the elegance and charm of the author

I make no claims about this code at all except that it works when I run it.

## Setup
If you want to try it out just clone the repo, open the `file_content` folder, and copy the `.env.example` file into a `.env` file, substituting your own values for the example values.

You'll also need to have Node installed for this to work.

Note that the `connection.js` setup is based on using MongoDB Atlas for your database, so if you want to run Mongo locally, you'll need to modify the connection string in `connection.js` as well as the values in the `.env` file. If you want to use something other than Mongo, you can always modify the code to your liking. Go nuts!

You may also want to change the user date in `file_content/seeds/users.json` before you try to seed your db.

Also, note that this is NOT updated to work with the recent changes to `react-router-dom 6`. Honestly, it probably won't ever be. Again, feel free to modify to your heart's content. Go nuts! Again!

## Try It Out!
Once you're all set up:
- create a directory for your new project and cd into it
- run the index.js file at the base of this project:
`node /path/to/this/repo/on/your/computer`
- wait a couple minutes - when the project is done, the process should exit.

There are three flags you can add to modify how this works:
- `--with-react` will add a `client` folder at the base of the project and build a basic `create-react-app` app.
- `--with-react-auth` will add a `client` folder at the base of the project and build the boilerplate frontend in the `react_auth` folder. It includes basic file structure, a main page, a login page, authentication, styled-components, a CSS reset, a few ready-made elements, and redux
- `--code` will open the project in VSCode once the build is finished. If you don't use VSCode, this flag will do nothing - unless `code .` does something else on your computer. Then it will do whatever that does.

If you leave off both `react` flags, it will build just the backend, which works just fine by itself (but you may want to modify the start scripts in the `package.json` so they don't try to open a `client` folder and run `start` in there, too).

Note that you cannot use both react flags together. That would be dumb. You cannot dumb here.

Once the project is built, start it with `npm start`.

## Epilogue/Admission of Defeat
I had fun building this, and I may never actually use it. Who has time??
