function displayMatches(matches, containerId) {
    const container = document.getElementById(containerId);
    if (!matches || matches.length === 0) {
        container.innerHTML = '<div class="STING-WEB_MatchingNone"><p>لا توجد مباريات هامة اليوم</p></div>';
        return;
    }
    const matchHtml = matches.map(match => `
<!-- ${match['Team-Right'].Name} vs ${match['Team-Left'].Name} -->
<div class="STING-WEB-Match"> <a href="${match.link}" title="${match['Team-Right'].Name} vs ${match['Team-Left'].Name}"> <div class="STING-WEB-Top"> <div class="STING-WEB-Right"> <img title="${match['Team-Right'].Name}" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-img="${match['Team-Right'].Logo}" alt="${match['Team-Right'].Name}" width="50" height="50" loading="lazy"/> <span>${match['Team-Right'].Name}</span> </div> <div class="STING-WEB-Center"> <div class="STING-WEB-Result">${match['Team-Right'].Goal}</div> <div class="STING-WEB-Match-Bio"> <div class="STING-WEB-TimeZone">بتوقيت جهازك</div> <div class="STING-WEB-Time"></div><div class="STING-WEB-Status"></div> <div class="STING-WEB-Time-Descending" data-start="${match['Time-Start']}" data-end="${match['Time-End']}"></div> </div> <div class="STING-WEB-Result">${match['Team-Left'].Goal}</div> </div> <div class="STING-WEB-Left"> <img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" title="${match['Team-Left'].Name}" data-img="${match['Team-Left'].Logo}" alt="${match['Team-Left'].Name}" width="50" height="50" loading="lazy"/> <span>${match['Team-Left'].Name}</span> </div> </div> <div class="STING-WEB-Bottom"> <span class="STING-WEB-Betola">${match.Cup}</span> </div> <div class="STING-WEB-Here"> <span class="STING-WEB-Play"></span> </div> </a> </div>
    `).join('');
    container.innerHTML = matchHtml;
}
if (document.querySelector("#STING-WEB-Today-Matches")) {
    document.querySelector("#STING-WEB-Today-Matches").style.display = "grid";
}


function startCountdown() {
    const matches = document.querySelectorAll(".STING-WEB-Match");
    matches.forEach((match) => {
        const countdownElement = match.querySelector('.STING-WEB-Time-Descending');
        const timeElement = match.querySelector('.STING-WEB-Time');
        const statusElement = match.querySelector('.STING-WEB-Status');
        const hereElement = match.querySelector('.STING-WEB-Here');
        
        const matchStartTime = countdownElement.getAttribute('data-start');
        const matchEndTime = countdownElement.getAttribute('data-end');
        
        const matchStartDate = new Date(matchStartTime);
        const matchEndDate = new Date(matchEndTime);

        timeElement.textContent = matchStartDate.toLocaleTimeString('en-EG', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    
        const interval = setInterval(() => {
            const now = new Date();
            const timeRemaining = matchStartDate - now;
            const timeToEnd = matchEndDate - now;
            
            if (timeToEnd <= 0) {
                hereElement.textContent = "المباراة انتهت";
                statusElement.textContent = "انتهت";
                clearInterval(interval);
                match.classList.add("END");
            }
            else if (timeRemaining <= 0 && timeToEnd > 0) {
                hereElement.textContent = "جارية الآن";
                statusElement.textContent = "جارية الآن";
                match.classList.add("LIVE");
            }
            else if (timeRemaining <= 30 * 60 * 1000) {
                const minutesRemaining = Math.floor(timeRemaining / (1000 * 60));
                statusElement.textContent = "بعد قليل";
                countdownElement.textContent = `${minutesRemaining} دقيقة`;
                match.classList.add("SOON");
                hereElement.textContent = "بعد قليل";
            }
            else {
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                const formattedHours = hours.toString().padStart(2, '0');
                const formattedMinutes = minutes.toString().padStart(2, '0');
                const formattedSeconds = seconds.toString().padStart(2, '0');
                hereElement.textContent = "لم تبدأ";
                countdownElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
                statusElement.textContent = "لم تبدأ بعد";
                match.classList.add("NOT");
            }
        }, 100);
    });
}
function lazyLoadImages() {
    const images = document.querySelectorAll('.STING-WEB-Right img, .STING-WEB-Left img');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const imgSrc = img.getAttribute('data-img');
                if (imgSrc) {
                    img.src = imgSrc;
                    img.style.opacity = 0; 
                    img.onload = () => {
                        img.style.transition = 'opacity 0.5s';
                        img.style.opacity = 1; 
                    };
                    observer.unobserve(img); 
                }
            }
        });
    }, options);

    images.forEach((img) => {
        observer.observe(img);
    });
}

console.group(
  "%cSTING WEB - Dashboard Matches API Plugin",
  "font-weight:500;color:#f50;font-size:20px;"
),
  console.log("=> Designed by      : STING WEB"),
  console.log("=> FB Page URL      : https://fb.com/stingweb.eg"),
  console.log("=> Version          : 2024 / 1.0 - STABLE"),
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

    lazyLoadImages();
    startCountdown();
            
        })
        .catch(error => {
            console.error(`Error fetching match data for ${element.id}:`, error);
        });
}
document.querySelectorAll('[npm]').forEach(fetchMatchesForElement);
