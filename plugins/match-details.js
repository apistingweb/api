

        const getValue = document.querySelector(".STING-WEB-Match-Details").getAttribute("Get");
        const HomeTeam = document.querySelector(".STING-WEB-Details-Right");
        const LenupTeams = document.querySelector(".STING-WEB-Details-Center");
        const AwayTeam = document.querySelector(".STING-WEB-Details-Left");

        async function fetchMatchDetails() {

            const apiUrl = `https://www.sting-web.com/apis/oo/v2/Plugins/get=all-match-details/?id-get=${getValue}`;
            

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                console.log(data);

                HomeTeam.innerHTML = `
                    <div class="STING-WEB-Details-Up" style="display: grid; align-items: center; justify-items: center; padding-bottom: 15px;text-align: center;"> 
                        <span class="STING-WEB-IlI"><img style="width: 40px; height: 40px; border-radius: 50px;" src="${data.analytics.home_team.logo}" alt="${data.analytics.home_team.txt}"></span>
                        <span>${data.analytics.home_team.trainer}</span>
                    </div>

                    <div class="STING-WEB-Details-Down">
                        <div class="STING-WEB-Details-Player" style=" padding: 10px 0 20px 0; color: #213c51; font-weight: 600; border-bottom: 1px solid #c7c7c7; ">
                                <span>اللاعب</span> 
                                <span>رقم اللاعب</span>
                            </div>
                        ${data.analytics.home_team.players.map(player => `
                            <div class="STING-WEB-Details-Player">
                                <span style=" display: flex; align-items: center; gap: 12px; "><span class="Player_SVG"></span>
                                <span style="display: block; color: #213c51; font-size: 14px; font-weight: 600;">${player.name}</span> </span>
                                <span style="color: #2196f3; font-weight: bold; padding: 5px; font-size: 20px; width: 30px;">${player.number}</span>
                            </div>
                        `).join('')}
                    </div>
                `;

                LenupTeams.innerHTML = `
                <div class="STING-WEB-Arround"><span style=" font-size: 18px; padding-bottom: 15px; display: flex; color: #213c65; font-weight: 600; ">تشكيـلة الفريقيــن</span></div>
                    <div class="STING-WEB-Stadium">
                        <span class="STING-WEB-lineup-Home" style="font-size: 12px;position: absolute;right: 25px;top: 25px;background: #00000030;padding: 2px 6px;border-radius: 6px;line-height: 1;color: #ffffffcf;display: flex;align-items: center;gap: 2px;letter-spacing: 2px;font-weight: 600;"><img style="width: 25px; height: 25px; border-radius: 50px;" src="${data.analytics.home_team.logo}" alt="${data.analytics.home_team.txt}"/>${data.analytics.home_team.lineup}</span>
                        <span class="STING-WEB-lineup-Away" style="font-size: 12px;position: absolute;left: 25px;bottom: 25px;background: #00000030;padding: 2px 6px;border-radius: 6px;line-height: 1;color: #ffffffcf;display: flex;align-items: center;gap: 2px;letter-spacing: 2px;font-weight: 600;">${data.analytics.away_team.lineup}<img style="width: 25px; height: 25px; border-radius: 50px;" src="${data.analytics.away_team.logo}" alt="${data.analytics.away_team.txt}"/></span>
                        ${data.analytics.formation.map(formation => `
                            <div class="STING-WEB-Player-Studium-Float" style="${formation.style}">
                                <span>${formation.svg}</span>
                                <span style="position: absolute; top: 6px; color: #fff;font-size: 14px;">${formation.number}</span>
                                <span style="color: #fff;font-size: 10px;position: relative;top: -10px;width: 60px;text-align: center;line-height: 18px;margin-top: 5px;">${formation.name}</span>
                            </div>
                        `).join('')}
                    </div>
                `;

                AwayTeam.innerHTML = `
                    <div class="STING-WEB-Details-Up" style="display: grid; align-items: center; justify-items: center; padding-bottom: 15px;text-align: center;"> 
                        <span class="STING-WEB-IlI"><img style="width: 40px; height: 40px; border-radius: 50px;" src="${data.analytics.away_team.logo}" alt="${data.analytics.away_team.txt}"></span>
                        <span>${data.analytics.away_team.trainer}</span>
                    </div>

                    <div class="STING-WEB-Details-Down">
                        <div class="STING-WEB-Details-Player" style=" padding: 10px 0 20px 0; color: #213c51; font-weight: 600; border-bottom: 1px solid #c7c7c7; ">
                                <span>رقم اللاعب</span>
                                <span>اللاعب</span> 
                            </div>
                        ${data.analytics.away_team.players.map(player => `
                            <div class="STING-WEB-Details-Player">
                                <span style="color: #e93534; font-weight: bold; padding: 5px; font-size: 20px; width: 30px;">${player.number}</span>
                                <span style=" display: flex; align-items: center; gap: 12px; ">
                                <span style="display: block; color: #213c51; font-size: 14px;font-weight: 600;">${player.name}</span>
                                <span class="Player_SVG"></span>
                                 </span>
                            </div>
                        `).join('')}
                    </div>
                `;

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        fetchMatchDetails();
