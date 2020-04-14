var fetch = require('node-fetch-retry');

const SITE = "https://api.modpacks.ch/";

async function get(endpoint, VERSION = "public")
{ 
	const response = await fetch(SITE + VERSION + endpoint);
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

async function versionManifest(packID, parent)
{
    checkForNaN(packID);
    checkForNaN(parent);

    return get(`/modpack/${packID}/${parent}`);
}

async function versionChangelog(packID, parent)
{
    checkForNaN(packID);
    checkForNaN(parent);

    return get(`/modpack/${packID}/${parent}/changelog`);
}

function linuxServerDownloadLink(packID, parent)
{
    checkForNaN(packID);
    checkForNaN(parent);

    return `${SITE}public/modpack/${packID}/${parent}/server/linux`;
}

function windowsServerDownloadLink(packID, parent)
{
    checkForNaN(packID);
    checkForNaN(parent);

    return `${SITE}public/modpack/${packID}/${parent}/server/windows`;
}

async function incrementPlayCount(packID, parent)
{
    checkForNaN(packID);
    checkForNaN(parent);

    return get(`/modpack/${packID}/${parent}/play`);
}

async function incrementInstallCount(packID, parent)
{
    checkForNaN(packID);
    checkForNaN(parent);

    return get(`/modpack/${packID}/${parent}/install`);
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