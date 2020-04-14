const modpacksch = require('./');

function equals(test1, test2, desc)
{
    console.log(`TEST - ${desc}`);
    if(test1 == test2)
    {
        console.log('✅ PASSED');
    } else
    {
        throw new Error(`❌ Test failed: ${desc}. Reason: ${test1} did not equal ${test2}`);
    }
}

(async function() 
{
    equals(modpacksch.windowsServerDownloadLink(9, 9), 'https://api.modpacks.ch/public/modpack/9/9/server/windows', 'Should return a valid windows download link');
    equals(modpacksch.linuxServerDownloadLink(9, 9), 'https://api.modpacks.ch/public/modpack/9/9/server/linux', 'Should return a valid linux download link');
    equals((await modpacksch.packManifest(9)).synopsis, 'FTB Presents HermitPack', 'Synopsis should match for packID 9');
    equals((await modpacksch.versionManifest(9, 9)).files[0].sha1, '26650f97bc7e024af2d80984ef36b3f1d6339f61', 'First file in packID 9 should match sha1');
    
}());