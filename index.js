var fetch = require('node-fetch-retry');

const SITE = "https://api.modpacks.ch/";

async function get(endpoint, VERSION = "public")
{ 
	const response = await fetch(SITE + VERSION + endpoint, { method: 'GET', retry: 5 });
	return await response.json();
}

function overwriteFetch(newFetch)
{
    fetch = newFetch
}

function checkForNaN(number)
{
    if(isNaN(number)) throw new Error(number + ' was not a number!');
}

async function tagMostAssignedOrUsed(limit)
{
    checkForNaN(limit);

    return get('/tag/popular/' + limit);
}

async function recentlyUpdatedPacks(limit)
{
    checkForNaN(limit);

    return get('/modpack/updated/' + limit);
}

async function featuredPacks(limit)
{
    checkForNaN(limit);

    return get('/modpack/featured/' + limit);
}

async function mostPlayedPacks(limit)
{
    checkForNaN(limit);

    return get('/modpack/popular/plays/' + limit);
}

async function mostInstalledPacks(limit)
{
    checkForNaN(limit);

    return get('/modpack/popular/installs/' + limit);
}

async function mostPlayedPacksByTag(tag, limit)
{
    checkForNaN(limit);

    return get(`/modpack/popular/plays/${tag}/${limit}`);
}

async function mostInstalledPacksByTag(tag, limit)
{
    checkForNaN(limit);

    return get(`/modpack/popular/installs/${tag}/${limit}`);
}

async function mostPlayedPacksInDays(days, limit)
{
    checkForNaN(limit);
    checkForNaN(days);

    return get(`/modpack/popular/plays/${limit}/${days}`);
}

async function mostInstalledPacksInDays(days, limit)
{
    checkForNaN(limit);
    checkForNaN(days);

    return get(`/modpack/popular/installs/${limit}/${days}`);
}

async function searchPack(searchTerm, limit)
{
    checkForNaN(limit);

    return get(`/modpack/search/${limit}?term=${encodeURIComponent(searchTerm)}`);
}

async function packManifest(packID)
{
    checkForNaN(packID);

    return get('/modpack/' + packID);
}

async function versionManifest(packID)
{
    checkForNaN(packID);

    return get(`/modpack/${packID}/${packID}`);
}

async function versionChangelog(packID)
{
    checkForNaN(packID);

    return get(`/modpack/${packID}/${packID}/changelog`);
}

function linuxServerDownloadLink(packID)
{
    checkForNaN(packID);
    
    return `${SITE}public/modpack/${packID}/${packID}/server/linux`;
}

function windowsServerDownloadLink(packID)
{
    checkForNaN(packID);

    return `${SITE}public/modpack/${packID}/${packID}/server/windows`;
}

async function incrementPlayCount(packID)
{
    checkForNaN(packID);

    return get(`/modpack/${packID}/${packID}/play`);
}

async function incrementInstallCount(packID)
{
    checkForNaN(packID);

    return get(`/modpack/${packID}/${packID}/install`);
}

async function listAssignedPrivatePacks(limit, userKey)
{
    checkForNaN(limit);

    return get(`/modpack/private/${limit}`, encodeURIComponent(userKey));
}

module.exports = 
{
    overwriteFetch: overwriteFetch,
    tagMostAssignedOrUsed: tagMostAssignedOrUsed,
    recentlyUpdatedPacks: recentlyUpdatedPacks,
    featuredPacks: featuredPacks,
    mostPlayedPacks: mostPlayedPacks,
    mostInstalledPacks: mostInstalledPacks,
    mostPlayedPacksByTag: mostPlayedPacksByTag,
    mostInstalledPacksByTag: mostInstalledPacksByTag,
    mostPlayedPacksInDays: mostPlayedPacksInDays,
    mostInstalledPacksInDays: mostInstalledPacksInDays,
    searchPack: searchPack,
    packManifest: packManifest,
    versionManifest: versionManifest,
    versionChangelog: versionChangelog,
    linuxServerDownloadLink: linuxServerDownloadLink,
    windowsServerDownloadLink: windowsServerDownloadLink,
    incrementPlayCount: incrementPlayCount,
    incrementInstallCount: incrementInstallCount,
    listAssignedPrivatePacks: listAssignedPrivatePacks
}