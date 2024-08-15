/*==============================
~> Name Temp     : STING WEB - Plugin Leagues
~> Version	 : 2024 / v2.0 STABLE
~> Last Updated  : 15 - 8 - 2024 : 12:00 AM - 02:50 PM
~> Dev By     	 : STING WEB  - Facebook Page ->  https://www.facebook.com/stingweb.eg
~> Desgin URL    : https://www.sting-web.com
===============================*/
document.addEventListener("DOMContentLoaded", () => {
  const leagueDivs = document.querySelectorAll("#STING-WEB-Laegues-API > div");

  leagueDivs.forEach((leagueDiv) => {
    const lang = leagueDiv.getAttribute("lang") === "ar" ? 27 : 1;
    const leagueClass = leagueDiv.className;

    const leagueIdMap = {
      "Premier-League": 7, // الدوري الإنجليزي
      "La-Liga": 11, // الدوري الإسباني
      "France-League": 35, // الدوري الفرنسي
      "Bundesliga": 25, // الدوري الألماني
      "Italy-League": 17, // الدوري الإيطالي
      "Holland-League": 57, // الدوري الهولندي
      "Portugal-League": 73, // الدوري البرتغالي
      "Brasil-League": 113, // الدوري البرازيلي
      "Egypt-League": 552, // الدوري المصري
      "Morocco-League": 557, // الدوري المغربي
      "Saudi-League": 649, // الدوري السعودي
      "Algeria-League": 560, // الدوري الجزائري
      "Emirates-League": 549, // الدوري الإماراتي
      "Tunisia-League": 554, // الدوري التونسي
      "Syria-League": 564, // الدوري السوري
      "Palestine-League": 6079, // الدوري الفلسطيني
      "Iraqi-League": 6822, // الدوري العراقي
      "Qatar-League": 408, // الدوري القطري
      "Uefa-Europa-League": 573, // الدوري الأوروبي
      "Uefa-Champions-League": 572, // دوري أبطال أوروبا ---
      "Africa-Cup-of-Nations-League": 167, // بطولة أمم إفريقيا
      "Caf-Champions-League": 624, // دوري أبطال إفريقيا ---
      "Caf-Confederation-Cup-League": 627, // الكونفدرالية الإفريقية ---
      "Caf-Wc-Qualification-League": 645, // تصفيات كأس العالم إفريقيا
      "Caf-Super-Cup-League": 5581, // كأس السوبر الإفريقي ---
      "Asian-Cup-League": 6196, // كأس آسيا
      "Gulf-Cup-of-Nations-League": 5452, // كأس الخليج
      "Afc-Wc-Qualification-League": 605, // تصفيات كأس العالم آسيا
      "Arab-Club-Champions-Cup-League": 6840, // كأس الملك سلمان للأندية الأبطال
      "Saudi-Super-Cup-League": 6164, // كأس السوبر السعودي  ---
      "Saudi-Kings-Cup-League": 5501, // كأس الملك السعودي  ---
      "Uefa-Wc-League": 5421, // تصفيات أوروبا كأس العالم  ---
      "South-America-Wc-League": 613, // تصفيات أمريكا الجنوبية كأس العالم
      "North-America-Wc-League": 611, // تصفيات أمريكا الشمالية كأس العالم
      "Leagues-Cup-League": 7242, // كأس الدوريات
      "Argentine-League": 72, // الدوري الأرجنتيني
      "MLS-League": 104, // الدوري الأمريكي
      "Uefa-Conference-League": 7685, // دوري المؤتمر الأوروبي  ---
      "La-Copa-League": 13, // كأس ملك إسبانيا  ---
      "Uefa-Nations-League": 7016, // دوري الأمم الأوروبية
      "Euro-League": 6316, // أمم أوروبا
    };
    

    const leagueId = leagueIdMap[leagueClass];

    if (leagueId) {
      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("STING-WEB-Toggle-API");

      const buttonLabels = {
        27: {
          standings: "ترتيب الفرق",
          stats: "ترتيب الهدافين",
        },
        1: {
          standings: "Standings",
          stats: "Top Scorers",
        },
      };

      const labels = buttonLabels[lang];

      buttonsDiv.innerHTML = `
            <style>@font-face { font-family: "Neo Sans Arabic"; font-style: normal; font-weight: 400; font-display: swap; src: local("Neo Sans Arabic"), url("https://dev.sting-web.com/Fonts/NeoSansArabic.woff2") format("woff2"); } *, ::after, ::before { margin: 0; padding: 0; border: none; text-decoration: none; list-style: none; font-family: Neo Sans Arabic, Changa, Segoe UI; -webkit-box-sizing: border-box; box-sizing: border-box; } .STING-WEB-League-API-Top { width: 92%; margin: 20px auto; max-width: 1000px; border-radius: 8px; background: #f5f5f7; display: flex; align-items: center; justify-content: center; gap: 20px; padding: 20px 10px; display: none; } .OpenNow { background: #100d4836 !important; } .STING-WEB-League-API-Top-Right { width: 50px; height: 50px; } .STING-WEB-League-API-Top-Right > img { width: 100%; height: 100%; object-fit: contain; } .STING-WEB-Name-League-API { color: #100d48; font-size: 20px; text-align: center; width: 85%; margin: 0 auto; }.STING-WEB-Buttons-Toggle { display: flex; gap: 12px; width: 90%; margin: 20px auto; } .STING-WEB-Buttons-Toggle > button { width: 100%; border: 0; border-radius: 6px; background-color: #f5f5f7; font-size: 15px; height: 40px; cursor: pointer; color: #100d48; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px 5px; padding: 2px; font-weight: 600; } .STING-WEB-Buttons-Toggle > button:hover { background: #100d4836 !important; } .STING-WEB-Standings > table > thead > tr,.STING-WEB-Stats > table > thead > tr { color: #100d48; text-align: center; font-weight: 600; } .STING-WEB-Standings > table > tbody > tr > td { position: relative; } .STING-WEB-Standings > table > tbody > tr > td:nth-child(1)::before { content: ""; width: 3px; background: transparent; border-radius: 29px; right: 0; position: absolute; top: 0; bottom: 0; margin-left: 5px; } .STING-WEB-Standings > table > tbody > tr:nth-child(1) > td:nth-child(1)::before { background: green !important; } .STING-WEB-Standings > table > tbody > tr:nth-child(2) > td:nth-child(1)::before { background: green !important; } .STING-WEB-Standings > table > tbody > tr:nth-child(3) > td:nth-child(1)::before { background: green !important; } .STING-WEB-Standings > table > tbody > tr:nth-child(4) > td:nth-child(1)::before { background: green !important; } .STING-WEB-Standings > table > tbody > tr:nth-child(5) > td:nth-child(1)::before { background: rgb(3, 169, 244) !important; } .STING-WEB-Standings > table > tbody > tr:nth-child(18) > td:nth-child(1)::before { background: #ff0000 !important; } .STING-WEB-Standings > table > tbody > tr:nth-child(19) > td:nth-child(1)::before { background: #ff0000 !important; } .STING-WEB-Standings > table > tbody > tr:nth-child(20) > td:nth-child(1)::before { background: #ff0000 !important; } .STING-WEB-Standings > table > tbody > tr,.STING-WEB-Stats > table > tbody > tr { margin: 12px; text-align: center; color: #100d48; font-size: 16px; } .STING-WEB-Standings > table > tbody > tr > td > img { width: 30px; height: 30px; object-fit: contain; } .STING-WEB-Results > table, .STING-WEB-Standings > table > tbody > tr > td { font-size: 16px; font-w } tbody tr:nth-child(2n) { background: #c5c5d32e; } .STING-WEB-Stats > table > tbody > tr > td > img { width: 50px !important; height: 50px !important; object-fit: contain; } @media (max-width: 720px) { .STING-WEB-Results > table, .STING-WEB-Standings > table > tbody > tr > td,.STING-WEB-Stats > table > tbody > tr > td { font-size: 12px !important; } .STING-WEB-Name-League-API { font-size: 16px; } .STING-WEB-Standings > table > tbody > tr > td > img { width: 25px; height: 25px; } } .Night .STING-WEB-League-API-Top,.Night .STING-WEB-Buttons-Toggle > button { background: #0e1019; color: #fff; } .Night .STING-WEB-League-API-Top-Right > img { filter: invert(1); } .Night .STING-WEB-Name-League-API,.Night .STING-WEB-Standings > table > thead > tr,.Night .STING-WEB-Standings > table > tbody > tr,.Night .STING-WEB-Stats > table > tbody > tr,.Night .STING-WEB-Stats > table > thead > tr { color: #fff; }</style>
                <div class="STING-WEB-League-API">
                    <div class="STING-WEB-League-API-Top">
                        <div class="STING-WEB-League-API-Top-Right">
                            <img src="" alt=""/>
                        </div>
                        <div class="STING-WEB-League-API-Top-Left">
                            <h2 class="STING-WEB-Name-League-API"></h2>
                        </div>
                    </div>
                    <div class="STING-WEB-Buttons-Toggle">
                    <button class="STING-WEB-ShowStandings OpenNow">${labels.standings}</button>
                    <button class="STING-WEB-ShowStats">${labels.stats}</button>
                    </div>

                <span class="STING-WEB-Clear" style="text-align: center; display: block; color: #100d48" ><a href="https://www.sting-web.com" target="_blank" style=" color: #100d48; text-align: center; display: block; font-size: 13px; margin-top: 14px; " >=&gt; اطلب نسخة لموقعك الان - من خلال ستينج ويب</a > <div class="STING-WEB-Card br"> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> <br /> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <br /> <div class="STING-WEB-Lazy-League"> <div class="STING-WEB-Logo-T-League STING-WEB-Logo-T-League-Animate din" ></div> <div class="STING-WEB-League-Comment br STING-WEB-Logo-T-League-Animate STING-WEB-League-Read" ></div> </div> <div> <style> .br { border-radius: 8px; } .STING-WEB-League-Read { width: 90%; } .STING-WEB-Card { padding: 10px 10px; width: 80%; margin: 20px auto; } .STING-WEB-Lazy-League { width: 0px; animation: fullView 0.5s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94); display: flex; gap: 12px; } .STING-WEB-Logo-T-League { height: 35px; width: 35px; border-radius: 50%; } .STING-WEB-League-Comment { height: 8px; background: #777; margin-top: 20px; } @keyframes fullView { 100% { width: 100%; } } .STING-WEB-Logo-T-League-Animate { animation: shimmer 2s infinite linear; background: linear-gradient( to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36% ); background-size: 1000px 100%; } @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } } </style> </div> </div></span>


                </div>
            `;
      leagueDiv.appendChild(buttonsDiv);
      const standingsButton = buttonsDiv.querySelector(
        ".STING-WEB-ShowStandings"
      );
      const statsButton = buttonsDiv.querySelector(".STING-WEB-ShowStats");
      const resultsDiv = document.createElement("div");

      resultsDiv.classList.add("STING-WEB-Results");
      leagueDiv.appendChild(resultsDiv);

      fetchData(leagueId, lang)
        .then((data) => {
          const img = buttonsDiv.querySelector("img");
          const competition = data.standings[0];
          img.src = `https://imagecache.365scores.com/image/upload/f_png,w_68,h_68,c_limit,q_auto:eco,dpr_2,d_Countries:Round:1.png/v11/Competitions/light/${competition.competitionId}`;
          img.alt = competition.displayName;
          document.querySelector(".STING-WEB-League-API-Top").style.display =
            "flex";
          document.querySelector(".STING-WEB-Clear").remove();

          const Gadwel = {
            27: {
              Name: " جدول ترتيب الفرق والهدافين ",
              Year: " - ( 2024 / 2025 ) ",
            },
            1: {
              Name: " Team Standings & Scorers ",
              Year: " - ( 2024 / 2025 ) ",
            },
          };

          const GadwelLabels = Gadwel[lang];

          document.querySelector(".STING-WEB-Name-League-API").innerText =
            GadwelLabels.Name + competition.displayName + GadwelLabels.Year;

          displayStandings(data.standings, resultsDiv, lang);

          standingsButton.addEventListener("click", () => {
            toggleActive(standingsButton, statsButton);
            displayStandings(data.standings, resultsDiv, lang);
          });

          statsButton.addEventListener("click", () => {
            toggleActive(statsButton, standingsButton);
            displayStats(data.stats, resultsDiv, lang);
          });
        })
        .catch((error) => {
          const STING403 = `<div class="NotAllow">
 <span>الاضافة غير مفعلة علي موقعكم الرجاء التواصل معنا لتفعيلها</span>
 <a href="https://www.sting-web.com/"><span>ستينج ويب</span></a>
 <style>
 @font-face{font-family:"Neo Sans Arabic";font-style:normal;font-weight:400;font-display:swap;SrCss:local("Neo Sans Arabic"),url("https://cloud.sting-web.com/font/NeoSansArabic.woff2") format("woff2")}
 * {margin:0;padding:0;border:none;text-decoration:none;list-style:none;font-family:"Neo Sans Arabic",sans-serif}
 .NotAllow { margin: 20px auto; width: 80%; text-align: center; height: fit-content; font-size: 20px; display: grid; align-items: center; gap: 20px; background: #eceef2; border-radius: 12px; padding: 25px; color: #100d48; font-weight: 700; }
 .NotAllow a { background: #100d48; border-radius: 50px; width: fit-content; padding: 5px 20px; color: #fff; margin: 0 auto; font-size: 18px; }
 </style>
 </div>`;

          console.log("=> license          : None");
          document.querySelector("#STING-WEB-Laegues-API").innerHTML = STING403;
        });
    }
  });
});

function fetchData(leagueId, lang) {
  return fetch(
    `https://www.sting-web.com/apis/oo/v2/Plugins/get-all=leagues/?leagues=${leagueId}&lang=${lang}`
  ).then((response) => response.json());
}

function displayStandings(standings, resultsDiv, lang) {
  resultsDiv.classList.add("STING-WEB-Standings");
  resultsDiv.classList.remove("STING-WEB-Stats");

  const headers = {
    27: {
      position: "م",
      logo: "",
      team: "الفريق",
      gamesPlayed: "لعب",
      wins: "فاز",
      losses: "خسر",
      draws: "تعادل",
      ratio: "فارق",
      points: "النقاط",
    },
    1: {
      position: "#",
      logo: "",
      team: "Team",
      gamesPlayed: "Played",
      wins: "Won",
      losses: "Lost",
      draws: "Drawn",
      ratio: "+/-",
      points: "PTS",
    },
  };

  const headerLabels = headers[lang];

  let htmlContent = `
        <table style="width: 100%;">
            <thead>
                <tr style="height: 40px;">
                    <td style="width: 6%; height: 40px">${headerLabels.position}</td>
                    <td style="width: 3%; height: 40px">${headerLabels.logo}</td>
                    <td style="width: 8%; height: 40px">${headerLabels.team}</td>
                    <td style="width: 3%; height: 40px">${headerLabels.gamesPlayed}</td>
                    <td style="width: 3%; height: 40px">${headerLabels.wins}</td>
                    <td style="width: 3%; height: 40px">${headerLabels.losses}</td>
                    <td style="width: 3%; height: 40px">${headerLabels.draws}</td>
                    <td style="width: 3%; height: 40px">${headerLabels.ratio}</td>
                    <td style="width: 3%; height: 40px">${headerLabels.points}</td>
                </tr>
            </thead>
            <tbody>
    `;

  standings[0].rows.forEach((team) => {
    const position = team.position || "غير متوفر";
    const competitorId = team.competitor?.id || "default1";
    const competitorName = team.competitor?.name || "غير معروف";
    const gamePlayed = team.gamePlayed || "-";
    const gamesWon = team.gamesWon || "-";
    const gamesLost = team.gamesLost || "-";
    const gamesEven = team.gamesEven || "-";
    const gamesratio = team.ratio || "-";
    const points = team.points || "-";

    htmlContent += `
            <tr>
                <td style="width: 6%;">${position}</td>
                <td style="display: flex;align-items: center;width: 100%;justify-content: center;padding: 5px 0;">
                    <img src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v6/Competitors/${competitorId}" alt="${competitorName}"/>
                </td>
                <td style="width: 8%; text-align: start; padding-right: 15px;">${competitorName}</td>
                <td style="width: 3%;">${gamePlayed}</td>
                <td style="width: 3%;">${gamesWon}</td>
                <td style="width: 3%;">${gamesLost}</td>
                <td style="width: 3%;">${gamesEven}</td>    
                <td style="width: 3%;">${gamesratio}</td>       
                <td style="width: 3%; font-weight: 600; font-size: 15px !important;">${points}</td>
            </tr>
        `;
  });

  htmlContent += "</tbody></table>";
  resultsDiv.innerHTML = htmlContent;
}

function displayStats(stats, resultsDiv, lang) {
  resultsDiv.classList.add("STING-WEB-Stats");
  resultsDiv.classList.remove("STING-WEB-Standings");

  const headers = {
    27: {
      position: "م",
      logo: "",
      player: "اللاعب",
      backed: "النادي",
      goals: "الأهداف",
    },
    1: {
      position: "#",
      logo: "",
      player: "Player",
      backed: "Club",
      goals: "Goals",
    },
  };

  const headerLabels = headers[lang];

  let htmlContent = `
        <table style="width: 100%;">
            <thead>
                <tr style="height: 40px;">
                    <td style="width: 5%; height: 40px">${headerLabels.position}</td>
                    <td style="width: 10%; height: 40px">${headerLabels.logo}</td>
                    <td style="width: 10%; height: 40px">${headerLabels.player}</td>
                    <td style="width: 5%; height: 40px">${headerLabels.backed}</td>
                    <td style="width: 5%; height: 40px">${headerLabels.goals}</td>
                </tr>
            </thead>
            <tbody>
    `;

  stats.athletesStats[0].rows.forEach((player) => {
    const position =
      player.position !== undefined ? player.position : "غير متوفر";
    const logo =
      player.entity.id !== undefined ? player.entity.id : "غير معروف";
    const playerName =
      player.entity.name !== undefined ? player.entity.name : "غير معروف";
    const backedplayer =
      player.entity.competitorId !== undefined
        ? player.entity.competitorId
        : "غير معروف";
    const goals =
      player.stats[0].value !== undefined ? player.stats[0].value : "0";

    htmlContent += `
            <tr>
                <td style="width: 5%;">${position}</td>
                <td style="width: 5%;"><img src="https://imagecache.365scores.com/image/upload/f_png,w_80,h_80,c_limit,q_auto:eco,dpr_2,d_Athletes:default.png,r_max,c_thumb,g_face,z_0.65/v46/Athletes/${logo}" alt="${playerName}"/></td>
                <td style="width: 10%;">${playerName}</td>
                <td style="width: 5%; width: 30px !important;"><img style="width: 10%; width: 30px !important;height: 30px !important;" src="https://imagecache.365scores.com/image/upload/f_png,w_40,h_40,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${backedplayer}"/ alt="${playerName}"></td>
                <td style="width: 5%; font-weight: 600; font-size: 18px !important;">${goals}</td>
            </tr>
        `;
  });

  htmlContent += "</tbody></table>";
  resultsDiv.innerHTML = htmlContent;
}

function toggleActive(activeButton, inactiveButton) {
  activeButton.classList.add("OpenNow");
  inactiveButton.classList.remove("OpenNow");
}

console.group(
  "%cPlugin Leagues API - STING WEB",
  "font-weight:500;color:#fff;font-size:20px;background:#f50;padding:5px 10px;border-radius:6px;"
);
console.log("=> Designed by   : STING WEB");
console.log("=> FB Page URL   : https://fb.com/stingweb.eg");
console.log("=> Version       : v2.0 STABLE");
console.log("=> Main Website  : https://www.sting-web.com/");
console.log(
  "%c=>  اطلب نسخة لموقعك الان  - من خلال ستينج ويب",
  "font-weight:500;font-family:tahoma;color:#fff;font-size:15px;background:#100d48;padding:5px 10px;border-radius:6px;"
);
console.groupEnd();
