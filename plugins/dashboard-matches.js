function displayMatches(matches, containerId) {
    const container = document.getElementById(containerId);
    if (!matches || matches.length === 0) {
        container.innerHTML = '<div class="STING-WEB_MatchingNone"><p>لا توجد مباريات هامة اليوم</p></div>';
        return;
    }
    const matchHtml = matches.map(match => `
<!-- ${match['Team-Right'].Name} vs ${match['Team-Left'].Name} -->
<div class="STING-WEB_Match"> <a href="${match.link}" title="${match['Team-Right'].Name} vs ${match['Team-Left'].Name}" ><div class="STING-WEB_Right-Team"> <div class="STING-WEB_Team-Logo"> <img alt="${match['Team-Right'].Name}" data-img="${match['Team-Right'].Logo}" loading="lazy" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" title="${match['Team-Right'].Name}" width="70" height="70" /> </div> <div class="STING-WEB_Team-NAME">${match['Team-Right'].Name}</div> </div> <div class="STING-WEB_Match-Center"> <div class="STING-WEB_Match-Timing"> <div id="STING-WEB_Match-Time"></div> <div id="STING-WEB_Result">${match['Team-Left'].Goal}-${match['Team-Right'].Goal}</div> <div class="STING-WEB_Data" data-start="${match['Time-Start']}" data-gameends="${match['Time-End']}" >${match['Match-Status']}</div> </div> </div> <div class="STING-WEB_Left-Team"> <div class="STING-WEB_Team-Logo"> <img alt="${match['Team-Left'].Name}" data-img="${match['Team-Left'].Logo}" loading="lazy" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" title="${match['Team-Left'].Name}" width="70" height="70" /> </div> <div class="STING-WEB_Team-NAME">${match['Team-Left'].Name}</div> </div> <div class="STING-WEB_Match-Info"> <ul> <li><span>${match.Tv}</span></li> <li><span>${match.Mic}</span></li> <li><span>${match.Cup}</span></li> </ul> </div> <div class="STING-WEB_Overlay"><div class="STING-WEB_SVG-Play"></div></div ></a> </div>
    `).join('');
    container.innerHTML = matchHtml;
}
function fetchMatchesForElement(element) {
    const npmValue = element.getAttribute('npm');
    if (!npmValue) {
        return;
    }
    const url = `https://www.sting-web.com/apis/oo/v2/TB-Football-API/${npmValue}.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const containerId = element.id;
            switch(containerId) {
                case 'STING-WEB-Yesterday-Matches':
                    displayMatches(data.yesterday || [], containerId);
                    break;
                case 'STING-WEB-Today-Matches':
                    displayMatches(data.today || [], containerId);
                    break;
                case 'STING-WEB-Tomorrow-Matches':
                    displayMatches(data.tomorrow || [], containerId);
                    break;
                default:
                    console.warn(`No matching case for container ID: ${containerId}`);
            }
        })
        .catch(error => {
            console.error(`Error fetching match data for ${element.id}:`, error);
        });
}
updateMatchStatus();
document.querySelectorAll('[npm]').forEach(fetchMatchesForElement);
