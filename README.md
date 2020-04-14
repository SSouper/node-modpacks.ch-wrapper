# Promise-based node wrapper around https://modpacksch.docs.apiary.io/

## Usage example

### Search for a modpack with a limit of 5 results then get the files for the first result.
```javascript
const modpacksch = require('modpacks.ch');

let searchResult = await modpacksch.searchPack('HermitPack', 5);
let versionManifest = await modpacksch.versionManifest(searchResult.packs[0], searchResult.packs[0]);

console.log(versionManifest.files);
```