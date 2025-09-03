# Site Template

- [Project structure](#project-structure)
- [Concepts: The "bricks"](#concepts-the-bricks)
- [Tools](#tools)
  - [Responsive design](#responsive-design)
  - [SVG](#svg)
  - [Generator](#generator)
  - [Build](#build)
  - [Local server](#local-server)
- [Deployment](#deployment)
- [Installation](#installation)
- [Update](#update)

# Site Template

Creating a site template. This tool allows you to integrate a design and create pages, then enrich them with CSS and JS so they can later be incorporated into a production website.

## Project structure

The `./src` folder contains the files used to build the design: `.js`, `.css` or `.scss`, `.hbs`, and `.json`.  
The `./src/assets` folder contains assets (mainly SVGs) used during the build task.

The `./public` folder contains all the elements meant to be public on the production site.  
Before each build, the entire `./public` folder is copied into the `./dist` folder which contains the built application.

The `./src/globals/` folder contains all JS and (S)CSS files not specific to a particular component.  
It also contains the `head.rbs` and `foot.rbs` files, which are automatically included before and after each page during the build.

## Concepts: The "bricks"

A brick can be: a page, a component, or a fragment.  
The command `npm run gen` lets you generate brick prototypes. [Learn more about this command](#generator)

- **Pages**: rich HTML/CSS/JS structures built from components and fragments. They include all the HTML needed to perform various functions (e.g. a product page, a homepage).
- **Components**: HTML/CSS/JS structures made up of other components or fragments, serving defined purposes (e.g. a menu, footer, survey module).
- **Fragments**: the basic design units — simple HTML/CSS/JS structures, without any nested components/fragments. Used for specific elements (e.g. a button, an illustration).

[Based on Atomic Design logic: a site is composed of increasingly complex elements](https://atomicdesign.bradfrost.com/)

- A site is made of pages
- A page is made of components and fragments
- A component is made of fragments (or other components)
- A fragment contains only standard HTML

Bricks are stored in the following folders:

```sh
./src/pages/
./src/components/
./src/fragments/
```

Each brick is a folder named with a slug, e.g. `./src/fragments/menu`

Inside each brick folder are at least 3 files:

- `.hbs`: the brick's HTML, using [Handlebars](https://handlebarsjs.com/) syntax
- `.scss`: the SASS/CSS styling (can be `.css` if SASS isn’t needed)
- `.json`: metadata (name, description, etc.)

Optional:

- `.js`: the JS module for the brick

You can import any brick into another using: `{{>[brick-slug]}}`

Example:

```hbs
{{>menu}}
```

## Tools

### Responsive design

The template defines 5 breakpoints: `tiny`, `small`, `medium`, `large`, `xlarge`  
(Breakpoint details are in [./lib/breakpoints.js](./lib/breakpoints.js))

There are two ways to use breakpoints:

### SCSS responsive mixins

Use `@include [breakpoint]`. Example for `medium`:

```scss
@include medium {
  // ...
}
```

Which compiles to:

```css
@media (min-width: 1200px) {
  // ...
}
```

### Responsive SCSS/CSS files

You can also add `.scss` files per breakpoint in a brick folder.  
Name them with the breakpoint slug (e.g. `test-medium.scss`) to scope all rules inside the corresponding media query.

Example file: `test-medium.scss`

```scss
.test {
  font-weight: bold;
}
.test2 {
  font-weight: bolder;
}
```

After compilation:

```css
@media (min-width: 1200px) {
  .test {
    font-weight: bold;
  }
  .test2 {
    font-weight: bolder;
  }
}
```

(This works with `.css` files too)

### SVG

`.hbs` files can include SVGs using: `{{svg 'svg-slug'}}`  
SVGs are stored in `./src/assets/svg`

### Generator

You can scaffold new bricks by running:

```bash
npm run gen
```

Follow the prompts to create a page, component, or fragment.  
Files are generated in `./src/[brick-type]/[brick-name]`.  
If it's a page, it will be available at `/[slug].html`.

### Build

Build a fully static HTML site, with compiled CSS and JS:

```bash
npm run build
```

Output is placed in `./dist`.

### Local server

Run a local dev server with:

```bash
npm run dev
```

The server runs on `localhost` at the port set in your `.env` file (default: `3000`).  
The output shows:

- Local site URL
- Network-accessible URL (e.g. for mobile testing)
- Admin URL to browse all bricks

## Deployment

Deployment can be done via **Netlify**, using:

- Build command: `npm run build`
- Output folder: `./dist`

## Installation

```bash
npm i -g awesome-site-template
```

## Usage

The package exposes a single executable `awesome-site-template` which can be run with `npx`.

### Start the development server

```bash
npx awesome-site-template
```

Watches your source files, rebuilds on change, and reloads the browser.  
Default port: `3333` (can be changed with `PORT` env var)

### Build for production

```bash
npx awesome-site-template --build
```

Empties the `dist` folder, builds assets, and copies `public` to `dist`.

### Generate a new item

```bash
npx awesome-site-template --gen
```

You'll be prompted to create a page, component, or fragment. The generator sets up the directory and files.

**Warning:** It’s recommended to save and commit your work before running an update.

## License

MIT
