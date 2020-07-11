# KanjiVG (Angular)

Angular components for [KanjiVG](https://github.com/KanjiVG/kanjivg)



# Installation

## using Angular CLI

`ng add @madcat/kanjivg-ng`


## manually

1. `npm install @madcat/kanjivg @madcat/kanjivg-ng`
2. in `angular.json` add KanjiVG assets:
```json
{
  "projects": {
    "your-project": {
      "architect": {
        "build": {
          "assets": [
            {
              "glob": "*.svg",
              "input": "node_modules/@madcat/kanjivg/dist/min/main",
              "output": "kanjivg"
            }
          ]
        },

        "test": {
          "assets": [
            {
              "glob": "*.svg",
              "input": "node_modules/@madcat/kanjivg/dist/min/main",
              "output": "kanjivg"
            }
          ]
        }
      }
    }
  }
}

```



# Licence

1. KanjiVG is copyright Ulrich Apel and released under the Creative Commons Attribution-Share Aline 3.0 licence
2. `@madcat/kanjivg-ng` is copyright Michał Kurcius and released under the Creative Commons Attribution-Share Aline 3.0 licence

http://creativecommons.org/licenses/by-sa/3.0/

See the [LICENSE](./LICENSE) file for more details.



# Development
To build run `npm run build`. 

Under the hood this command will build angular components and schematics. 
Additionally, it will also copy `README.md` and `LICENCE` to `dist/kanjivg-ng` dir.

## NOTICE
Running `ng build` may be sufficient for development,
but will not create final deployable package (schematics, `README.md` and `LICENCE` will not be included).



# Publishing
To publish run `npm run deploy`.
Before publishing `npm version major|minor|patch` should be ran.

## NOTICE
`npm publish` will throw an error: `Use 'npm run deploy' to publish this package`.
This is by design, because only generated `dist/kanjivg-ng` should be published and `npm run deploy` will do it!

