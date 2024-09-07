const LiveTxT = "جارية الآن";
const SoonTxT = "بعد قليل";
const NotTxT = "لم تبدأ بعد";
const EndTxT = "إنتهت";
    
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
function getVisitorTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function updateMatchStatus() {
    let matches = document.querySelectorAll(".STING-WEB_Match .STING-WEB_Data");
    let visitorTimeZone = getVisitorTimeZone();
    matches.forEach(function (match) {
        let startTime = new Date(match.getAttribute("data-start"));
        let gameEnds = new Date(match.getAttribute("data-gameends"));
        let currentTime = new Date();
        let timeDiff = Math.floor((startTime - currentTime) / (1000 * 60));
        let timeDiffEnd = Math.floor((gameEnds - currentTime) / (1000 * 60));
        let timeElement = match.parentNode.querySelector("#STING-WEB_Match-Time");
        let matchContainer = match.closest(".STING-WEB_Match");
        let options = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: visitorTimeZone,
        };
        if (timeDiff > 20) {
            let startFormatted = startTime.toLocaleTimeString([], options);
            timeElement.textContent = startFormatted;
            match.innerHTML = 'Not Started'; // You should define NotTxT
            match.classList.add("NOT");
            matchContainer.classList.add("NOT");
        } else if (timeDiff > 0) {
            let startFormatted = startTime.toLocaleTimeString([], options);
            timeElement.textContent = startFormatted;
            match.innerHTML = 'Soon'; // You should define SoonTxT
            match.classList.add("SOON");
            matchContainer.classList.add("SOON");
        } else if (timeDiffEnd > 0) {
            timeElement.style.display = "inline-block";
            let startFormatted = startTime.toLocaleTimeString([], options);
            timeElement.textContent = startFormatted;
            match.innerHTML = 'Live'; // You should define LiveTxT
            match.classList.add("LIVE");
            matchContainer.classList.add("LIVE");
        } else {
            timeElement.style.display = "inline-block";
            let startFormatted = startTime.toLocaleTimeString([], options);
            timeElement.textContent = startFormatted;
            match.innerHTML = 'Ended'; // You should define EndTxT
            match.classList.add("END");
            matchContainer.classList.add("END");
        }
    });
}

console.group(
  "%cSTING WEB - Dashboard Matches API Plugin",
  "font-weight:500;color:#f50;font-size:20px;"
),
  console.log("=> Designed by      : STING WEB"),
  console.log("=> FB Page URL      : https://fb.com/stingweb.eg"),
  console.log("=> Version          : 2024 / 2.0 - STABLE"),
  console.log("=> Desgin URL       : https://www.sting-web.com"),
  console.log(
    "=> %cاطلب نسخة لموقعك الان  - من خلال ستينج ويب",
    "font-weight:600;color:#f50;font-size:15px;font-family:Segoe UI;"
  ),
  console.groupEnd();

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
            updateMatchStatus(); // Call this function after displaying matches
        })
        .catch(error => {
            console.error(`Error fetching match data for ${element.id}:`, error);
        });
}

document.querySelectorAll('[npm]').forEach(fetchMatchesForElement);
