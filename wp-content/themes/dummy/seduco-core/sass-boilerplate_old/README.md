# Sass Boilerplate

This is a sample project using the [7-1 architecture pattern](http://sass-guidelin.es/#architecture) and sticking to [Sass Guidelines](http://sass-guidelin.es) writing conventions.

**This is a fork of above mentioned repository**

**Added changes**
1. Added npm + some scripts
2. Updated to dart scss, changed @import to @use and @forward 
3. Added scss lint with presets and prettier config
4. Added dynamic REM calculation based on screen dimensions
5. Imported bootstrap
6. Added sample UI page, to represent the base concept

## Bugs and work to be done

1. Resolve todo's
2. @use bootstrap instead of @import -ing it
3. Replace Slovak texts in index.html and separate tiny .js

Each folder of this project has its own `README.md` file to explain the purpose and add extra information. Be sure to browse the repository to see how it works.

## Using the indented syntax

### Sass conversion

This boilerplate does not provide a `.sass` version as it would be painful to maintain both versions without an appropriate build process. However, it is very easy to convert this boilerplate to Sass indented syntax.

Clone it, head into the project and then run:

```
sass-convert -F scss -T sass -i -R ./  && find . -iname “*.scss” -exec bash -c 'mv "$0" “${0%\.scss}.sass"' {} \;
```

### Use with Dart-sass

When using `Dart sass` - in order to build that boilerplate, one needs to:

- mpm install :

```bash
npm install -g node-sass
```
- run build command from command line:

```bash
npm run sass
```
