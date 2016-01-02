## Footprints

Footprints is an iOS app that allows you to tell a story or share an experience by creating tours to share
with friends, visitors, and tourists.

## Table of Contents

1. [Team](#Team)
1. [Usage](#Usage)
1. [Requirements](#Requirements)
1. [Development](#Development)
    1. [Installing Dependencies](#Installing-Dependencies)
1. [Documentation](#Documentation)
1. [Roadmap](#Roadmap)
1. [Contributing](#Contributing)

<a name="Team"></a>
## Team 

  - __Product Owner__: [Si Wang](https://github.com/sdwang)
  - __Scrum Master__: [Jira Vinyoopongphan](https://github.com/thekamahele)
  - __Development Team Members__: [Shashi Dokania](https://github.com/shashi-dokania), [Rochelle Lee](https://github.com/rochness)

<a name="Usage"></a>
## Usage 

1. Create an account
2. Browse all tours or create your own
3. Find one you like and take it or share yours

<a name="Requirements"></a>
## Requirements 

- npm
- React Native
- XCode
- MySQL
- Node/Express

<a name="Development"></a>
## Development 

1. Install all dependencies - see below.
2. Start MySQL server ```mysql.server start```
3. cd into server and run ``` node server.js```
4. cd into mobile and run ```react-native start```
5. Open XCode and build
6. Enjoy

To run server tests, run ```grunt testBack```

### Installing Dependencies <a name="Installing-Dependencies"></a>

From within the root, server, and mobile directories:

```sh
npm install
```
<a name="Documentation"></a>
## Documentation 

Please read [docs](http://thesisserver-env.elasticbeanstalk.com/docs/) for more information.

<a name="Roadmap"></a>
### Roadmap

View the project roadmap [here](http://github.com/terrifying-vegetable/thesisProject/issues)

1. Add location awareness
2. Ability to save and favorite tours
3. Search functionality
4. Load tours based on GPS location

<a name="Contributing"></a>
## Contributing 

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
