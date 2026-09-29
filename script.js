/* =========================================
   PETROFLOW DIGITAL-WELL
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const sidebar =
    document.getElementById("sidebar");


const menuToggle =
    document.getElementById("menuToggle");


const navItems =
    document.querySelectorAll(".nav-item");


const pages =
    document.querySelectorAll(".page");


const pageTitle =
    document.getElementById("pageTitle");


const systemTime =
    document.getElementById("systemTime");


const refreshButton =
    document.getElementById("refreshButton");


/* =========================================
   PAGE TITLES
========================================= */

const pageTitles = {

    dashboard:
        "Field Overview",

    wells:
        "Live Wells",

    "digital-twin":
        "Digital Twin",

    optimization:
        "Optimization",

    alerts:
        "Alerts",

    reports:
        "Reports"

};


/* =========================================
   SIDEBAR HAMBURGER MENU
========================================= */

if (
    menuToggle &&
    sidebar
) {

    menuToggle.addEventListener(
        "click",
        () => {


            const isCollapsed =
                sidebar.classList.toggle(
                    "collapsed"
                );


            menuToggle.classList.toggle(
                "active",
                isCollapsed
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(!isCollapsed)
            );


        }
    );

}


/* =========================================
   PAGE NAVIGATION
========================================= */

navItems.forEach(
    (item) => {


        item.addEventListener(
            "click",
            () => {


                const page =
                    item.dataset.page;


                showPage(page);


            }
        );


    }
);


/* =========================================
   SHOW PAGE
========================================= */

function showPage(page) {


    pages.forEach(
        (section) => {

            section.classList.remove(
                "active"
            );

        }
    );


    navItems.forEach(
        (item) => {

            item.classList.remove(
                "active"
            );

        }
    );


    const selectedPage =
        document.getElementById(page);


    const selectedNav =
        document.querySelector(
            `[data-page="${page}"]`
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active"
        );

    }


    if (selectedNav) {

        selectedNav.classList.add(
            "active"
        );

    }


    if (pageTitle) {

        pageTitle.textContent =
            pageTitles[page] ||
            "Field Overview";

    }


    if (
        window.innerWidth <= 850 &&
        sidebar
    ) {

        sidebar.classList.add(
            "collapsed"
        );

        menuToggle.classList.remove(
            "active"
        );

    }


}


/* =========================================
   SYSTEM CLOCK
========================================= */

function updateClock() {


    const now =
        new Date();


    const hours =
        String(
            now.getUTCHours()
        ).padStart(
            2,
            "0"
        );


    const minutes =
        String(
            now.getUTCMinutes()
        ).padStart(
            2,
            "0"
        );


    const seconds =
        String(
            now.getUTCSeconds()
        ).padStart(
            2,
            "0"
        );


    systemTime.textContent =
        `${hours}:${minutes}:${seconds} UTC`;

}


updateClock();


setInterval(
    updateClock,
    1000
);


/* =========================================
   WELL DATA
========================================= */

const wells = [

    {
        id: "BW-0005",
        health: 72,
        production: 980,
        temperature: 82,
        viscosity: 145,
        risk: 62,
        efficiency: 74
    },

    {
        id: "BW-0011",
        health: 84,
        production: 1120,
        temperature: 79,
        viscosity: 158,
        risk: 34,
        efficiency: 82
    },

    {
        id: "BW-0007",
        health: 91,
        production: 1250,
        temperature: 85,
        viscosity: 132,
        risk: 18,
        efficiency: 88
    },

    {
        id: "BW-0009",
        health: 77,
        production: 1010,
        temperature: 81,
        viscosity: 150,
        risk: 48,
        efficiency: 76
    },

    {
        id: "BW-0013",
        health: 88,
        production: 1180,
        temperature: 83,
        viscosity: 141,
        risk: 21,
        efficiency: 85
    },

    {
        id: "BW-0017",
        health: 93,
        production: 1300,
        temperature: 86,
        viscosity: 128,
        risk: 14,
        efficiency: 91
    }

];


/* =========================================
   RENDER LIVE WELLS
========================================= */

function renderWells() {


    const grid =
        document.getElementById(
            "wellsGrid"
        );


    if (!grid) {

        return;

    }


    grid.innerHTML = "";


    wells.forEach(
        (well) => {


            let status =
                "Healthy";


            if (
                well.risk >= 50
            ) {

                status =
                    "Attention";

            } else if (
                well.risk >= 30
            ) {

                status =
                    "Monitor";

            }


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "well-card";


            card.innerHTML = `

                <h3>
                    ${well.id}
                </h3>

                <span class="well-status">
                    ${status}
                </span>


                <div class="well-data">

                    <div>

                        <span>
                            Health
                        </span>

                        <strong>
                            ${well.health}%
                        </strong>

                    </div>


                    <div>

                        <span>
                            Production
                        </span>

                        <strong>
                            ${well.production}
                            bpd
                        </strong>

                    </div>


                    <div>

                        <span>
                            Temperature
                        </span>

                        <strong>
                            ${well.temperature}°F
                        </strong>

                    </div>


                    <div>

                        <span>
                            Rod-Float Risk
                        </span>

                        <strong>
                            ${well.risk}%
                        </strong>

                    </div>

                </div>

            `;


            grid.appendChild(
                card
            );


        }
    );


}


/* =========================================
   PRODUCTION CHART
========================================= */

const productionCanvas =
    document.getElementById(
        "productionChart"
    );


const productionContext =
    productionCanvas.getContext(
        "2d"
    );


function resizeCanvas(canvas) {


    const ratio =
        window.devicePixelRatio ||
        1;


    const width =
        canvas.clientWidth;


    const height =
        canvas.clientHeight ||
        330;


    canvas.width =
        width * ratio;


    canvas.height =
        height * ratio;


    canvas.getContext("2d")
        .setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


    return {
        width,
        height
    };

}


function drawProductionChart() {


    const size =
        resizeCanvas(
            productionCanvas
        );


    const ctx =
        productionContext;


    const width =
        size.width;


    const height =
        size.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* Grid */

    ctx.strokeStyle =
        "#183249";


    ctx.lineWidth =
        1;


    for (
        let y = 50;
        y < height - 20;
        y += 49
    ) {

        ctx.beginPath();

        ctx.moveTo(
            20,
            y
        );

        ctx.lineTo(
            width - 20,
            y
        );

        ctx.stroke();

    }


    /* Data */

    const data = [

        920,
        960,
        1010,
        940,
        1080,
        1110,
        1060,
        1150,
        1190,
        1130,
        1200,
        1260,
        1170,
        1220,
        1300,
        1260,
        1340,
        1290,
        1390,
        1440,
        1470,
        1560,
        1600,
        1640

    ];


    const min =
        850;


    const max =
        1700;


    ctx.beginPath();


    data.forEach(
        (
            value,
            index
        ) => {


            const x =
                20 +
                index *
                (
                    (width - 40) /
                    (data.length - 1)
                );


            const y =
                height -
                35 -
                (
                    (value - min) /
                    (max - min)
                ) *
                (
                    height - 75
                );


            if (
                index === 0
            ) {

                ctx.moveTo(
                    x,
                    y
                );

            } else {

                ctx.lineTo(
                    x,
                    y
                );

            }


        }
    );


    ctx.strokeStyle =
        "#00d9ff";


    ctx.lineWidth =
        2;


    ctx.shadowBlur =
        10;


    ctx.shadowColor =
        "#00d9ff";


    ctx.stroke();


    ctx.shadowBlur =
        0;


}


drawProductionChart();


window.addEventListener(
    "resize",
    drawProductionChart
);


/* =========================================
   THERMAL CHART
========================================= */

const thermalCanvas =
    document.getElementById(
        "thermalChart"
    );


const thermalContext =
    thermalCanvas.getContext(
        "2d"
    );


function drawThermalChart() {


    const size =
        resizeCanvas(
            thermalCanvas
        );


    const ctx =
        thermalContext;


    const width =
        size.width;


    const height =
        size.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const temperature = [

        70,
        71,
        72,
        74,
        76,
        77,
        79,
        81,
        82,
        84,
        85,
        87,
        88,
        89,
        91

    ];


    ctx.beginPath();


    temperature.forEach(
        (
            value,
            index
        ) => {


            const x =
                20 +
                index *
                (
                    (width - 40) /
                    (
                        temperature.length - 1
                    )
                );


            const y =
                height -
                25 -
                (
                    value - 65
                ) *
                8;


            if (
                index === 0
            ) {

                ctx.moveTo(
                    x,
                    y
                );

            } else {

                ctx.lineTo(
                    x,
                    y
                );

            }


        }
    );


    ctx.strokeStyle =
        "#ff9d2e";


    ctx.lineWidth =
        2;


    ctx.shadowBlur =
        8;


    ctx.shadowColor =
        "#ff9d2e";


    ctx.stroke();


    ctx.shadowBlur =
        0;

}


drawThermalChart();


window.addEventListener(
    "resize",
    drawThermalChart
);


/* =========================================
   DIGITAL TWIN SLIDER
========================================= */

const daySlider =
    document.getElementById(
        "daySlider"
    );


function updateDigitalTwin() {


    const day =
        Number(
            daySlider.value
        );


    document.getElementById(
        "simulationDay"
    ).textContent =
        day;


    const temperature =
        72 +
        day *
        0.34;


    const viscosity =
        Math.max(
            780,
            1900 -
            day *
            14
        );


    const sweep =
        Math.min(
            91,
            48 +
            day *
            0.65
        );


    document.getElementById(
        "twinTemperature"
    ).textContent =
        `${temperature.toFixed(0)}°F`;


    document.getElementById(
        "twinViscosity"
    ).textContent =
        `${Math.round(
            viscosity
        ).toLocaleString()} cP`;


    document.getElementById(
        "twinSweep"
    ).textContent =
        `${Math.round(
            sweep
        )}%`;


    const title =
        document.getElementById(
            "recommendationTitle"
        );


    const text =
        document.getElementById(
            "recommendationText"
        );


    if (
        day > 65
    ) {

        title.textContent =
            "Reduce steam rate.";


        text.textContent =
            "Thermal maturity is high. " +
            "Protect energy intensity " +
            "while maintaining mobility.";

    } else if (
        day > 35
    ) {

        title.textContent =
            "Maintain balanced operation.";


        text.textContent =
            "The thermal front is expanding " +
            "with improving oil mobility.";

    } else {

        title.textContent =
            "Continue thermal ramp-up.";


        text.textContent =
            "Reservoir heating is still developing. " +
            "Current steam strategy remains suitable.";

    }


}


daySlider.addEventListener(
    "input",
    updateDigitalTwin
);


updateDigitalTwin();


/* =========================================
   OPTIMIZATION
========================================= */

const optimizationPlans = [

    {
        name:
            "Conservative",

        tag:
            "LOW RISK",

        production:
            "+5.8%",

        steam:
            "850 bpd",

        spm:
            "6.5 SPM",

        sor:
            "2.91",

        energy:
            "1.34",

        risk:
            "9%"

    },


    {
        name:
            "Balanced AI Plan",

        tag:
            "RECOMMENDED",

        production:
            "+12.8%",

        steam:
            "1,050 bpd",

        spm:
            "7.8 SPM",

        sor:
            "2.54",

        energy:
            "1.18",

        risk:
            "12%",

        recommended:
            true

    },


    {
        name:
            "Aggressive",

        tag:
            "HIGH OUTPUT",

        production:
            "+17.2%",

        steam:
            "1,350 bpd",

        spm:
            "9.2 SPM",

        sor:
            "3.08",

        energy:
            "1.62",

        risk:
            "27%"

    }

];


function renderOptimization() {


    const grid =
        document.getElementById(
            "optimizationGrid"
        );


    grid.innerHTML =
        "";


    optimizationPlans.forEach(
        (plan) => {


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "optimization-card";


            if (
                plan.recommended
            ) {

                card.classList.add(
                    "recommended"
                );

            }


            card.innerHTML = `

                <span class="plan-tag">
                    ${plan.tag}
                </span>


                <h3>
                    ${plan.name}
                </h3>


                <div class="production-gain">
                    ${plan.production}
                </div>


                <div class="plan-row">

                    <span>
                        Steam Rate
                    </span>

                    <strong>
                        ${plan.steam}
                    </strong>

                </div>


                <div class="plan-row">

                    <span>
                        SRP Speed
                    </span>

                    <strong>
                        ${plan.spm}
                    </strong>

                </div>


                <div class="plan-row">

                    <span>
                        SOR
                    </span>

                    <strong>
                        ${plan.sor}
                    </strong>

                </div>


                <div class="plan-row">

                    <span>
                        Energy
                    </span>

                    <strong>
                        ${plan.energy}
                        kWh/bbl
                    </strong>

                </div>


                <div class="plan-row">

                    <span>
                        Rod-Float Risk
                    </span>

                    <strong>
                        ${plan.risk}
                    </strong>

                </div>

            `;


            grid.appendChild(
                card
            );


        }
    );


}


renderOptimization();


/* =========================================
   RUN OPTIMIZATION
========================================= */

const runOptimization =
    document.getElementById(
        "runOptimization"
    );


runOptimization.addEventListener(
    "click",
    () => {


        runOptimization.textContent =
            "Running AI Model...";


        runOptimization.disabled =
            true;


        setTimeout(
            () => {


                runOptimization.textContent =
                    "✓ Optimization Complete";


                runOptimization.disabled =
                    false;


                renderOptimization();


                setTimeout(
                    () => {

                        runOptimization.textContent =
                            "Run Optimization";

                    },
                    1800
                );


            },
            1200
        );


    }
);


/* =========================================
   REFRESH TELEMETRY
========================================= */

refreshButton.addEventListener(
    "click",
    () => {


        const production =
            1800 +
            Math.floor(
                Math.random() *
                180
            );


        document.getElementById(
            "productionValue"
        ).innerHTML = `

            ${production.toLocaleString()}

            <small>
                bpd
            </small>

        `;


        refreshButton.style.transform =
            "rotate(360deg)";


        setTimeout(
            () => {

                refreshButton.style.transform =
                    "rotate(0deg)";

            },
            400
        );


        renderWells();

    }
);


/* =========================================
   ALERT DATA
========================================= */

let alerts = [

    {
        title:
            "High rod-float risk — BW-0005",

        description:
            "Pump load and rod behaviour deviation detected.",

        type:
            "red-alert"

    },


    {
        title:
            "Injection instability — BW-0009",

        description:
            "Steam injection rate variation detected.",

        type:
            "orange-alert"

    },


    {
        title:
            "Temperature drift — BW-0011",

        description:
            "Reservoir temperature requires observation.",

        type:
            "yellow-alert"

    }

];


/* =========================================
   RENDER FULL ALERTS
========================================= */

function renderFullAlerts() {


    const container =
        document.getElementById(
            "fullAlertList"
        );


    container.innerHTML =
        "";


    if (
        alerts.length === 0
    ) {

        container.innerHTML = `

            <div class="recommendation">

                <span>
                    SYSTEM STATUS
                </span>

                <h3>
                    No active alerts
                </h3>

                <p>
                    All current alerts have
                    been acknowledged.
                </p>

            </div>

        `;


        return;

    }


    alerts.forEach(
        (alert) => {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                `alert-item ${alert.type}`;


            item.innerHTML = `

                <strong>
                    ${alert.title}
                </strong>

                <small>
                    ${alert.description}
                </small>

            `;


            container.appendChild(
                item
            );


        }
    );


}


renderFullAlerts();


/* =========================================
   ACKNOWLEDGE ALL ALERTS
========================================= */

document
    .getElementById(
        "acknowledgeAll"
    )
    .addEventListener(
        "click",
        () => {


            alerts =
                [];


            renderFullAlerts();


            document.getElementById(
                "alertCount"
            ).textContent =
                "0";


        }
    );


/* =========================================
   VIEW ALERTS
========================================= */

document
    .getElementById(
        "viewAlerts"
    )
    .addEventListener(
        "click",
        () => {


            showPage(
                "alerts"
            );


        }
    );


/* =========================================
   CSV REPORT EXPORT
========================================= */

document
    .querySelectorAll(
        "[data-report]"
    )
    .forEach(
        (button) => {


            button.addEventListener(
                "click",
                () => {


                    exportReport(
                        button.dataset.report
                    );


                }
            );


        }
    );


function exportReport(
    type
) {


    let rows =
        [];


    if (
        type === "production"
    ) {

        rows = [

            [
                "Well",
                "Health",
                "Production BPD",
                "Temperature F"
            ],

            ...wells.map(
                (well) => [

                    well.id,
                    well.health,
                    well.production,
                    well.temperature

                ]
            )

        ];

    }


    if (
        type === "risk"
    ) {

        rows = [

            [
                "Well",
                "Rod Float Risk %",
                "Pump Efficiency %"
            ],

            ...wells.map(
                (well) => [

                    well.id,
                    well.risk,
                    well.efficiency

                ]
            )

        ];

    }


    if (
        type === "twin"
    ) {

        rows = [

            [
                "Simulation Day",
                "Temperature",
                "Viscosity",
                "Thermal Sweep"
            ],

            [

                daySlider.value,

                document
                    .getElementById(
                        "twinTemperature"
                    )
                    .textContent,

                document
                    .getElementById(
                        "twinViscosity"
                    )
                    .textContent,

                document
                    .getElementById(
                        "twinSweep"
                    )
                    .textContent

            ]

        ];

    }


    const csv =
        rows
            .map(
                row =>
                    row.join(",")
            )
            .join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `baghewala-${type}-report.csv`;


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );

}


/* =========================================
   PETRO-AI
========================================= */

const aiButton =
    document.getElementById(
        "aiButton"
    );


const floatingAI =
    document.getElementById(
        "floatingAI"
    );


const chatModal =
    document.getElementById(
        "chatModal"
    );


const closeChat =
    document.getElementById(
        "closeChat"
    );


const chatForm =
    document.getElementById(
        "chatForm"
    );


const chatInput =
    document.getElementById(
        "chatInput"
    );


const chatMessages =
    document.getElementById(
        "chatMessages"
    );


function openChat() {

    chatModal.classList.add(
        "show"
    );


    setTimeout(
        () => {

            chatInput.focus();

        },
        100
    );

}


function closeChatWindow() {

    chatModal.classList.remove(
        "show"
    );

}


aiButton.addEventListener(
    "click",
    openChat
);


floatingAI.addEventListener(
    "click",
    openChat
);


closeChat.addEventListener(
    "click",
    closeChatWindow
);


/* =========================================
   PETRO-AI MESSAGE
========================================= */

chatForm.addEventListener(
    "submit",
    async (
        event
    ) => {


        event.preventDefault();


        const question =
            chatInput.value.trim();


        if (
            !question
        ) {

            return;

        }


        addMessage(
            question,
            "user"
        );


        chatInput.value =
            "";


        const thinking =
            addMessage(
                "PETRO-AI is thinking...",
                "bot"
            );


        try {


            const response =
                await fetch(
                    "/api/chat",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                {
                                    question:
                                        question
                                }
                            )
                    }
                );


            const data =
                await response.json();


            thinking.remove();


            if (
                !response.ok
            ) {

                throw new Error(
                    data.error ||
                    "AI service unavailable."
                );

            }


            addMessage(
                data.answer,
                "bot"
            );


        } catch (
            error
        ) {


            thinking.remove();


            addMessage(
                generateLocalAIResponse(
                    question
                ),
                "bot"
            );


        }


    }
);


/* =========================================
   ADD CHAT MESSAGE
========================================= */

function addMessage(
    message,
    type
) {


    const element =
        document.createElement(
            "div"
        );


    element.className =
        type === "user"
            ? "user-message"
            : "bot-message";


    element.textContent =
        message;


    chatMessages.appendChild(
        element
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    return element;

}


/* =========================================
   LOCAL PETRO-AI
========================================= */

function generateLocalAIResponse(
    question
) {


    const text =
        question.toLowerCase();


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return (
            "Hello! I'm PETRO-AI. " +
            "How can I help you with the " +
            "Baghewala Digital-Well?"
        );

    }


    if (
        text.includes("thank")
    ) {

        return (
            "You're welcome! " +
            "I'm always ready to help with " +
            "well monitoring and analysis."
        );

    }


    if (
        text.includes("sorry")
    ) {

        return (
            "No problem at all. " +
            "Let's continue with the " +
            "Digital-Well analysis."
        );

    }


    if (
        text.includes("attention")
    ) {

        return (
            "Current attention wells are " +
            "BW-0005 and BW-0009. " +
            "BW-0005 has the highest " +
            "rod-float risk at 62%."
        );

    }


    if (
        text.includes("rod") ||
        text.includes("float")
    ) {

        return (
            "BW-0005 currently shows " +
            "the highest demo rod-float " +
            "risk at 62%. BW-0011 is at 34%."
        );

    }


    if (
        text.includes("production")
    ) {

        return (
            "Current demo production is " +
            "approximately 1,850 bpd. " +
            "Production values are simulated " +
            "for the prototype."
        );

    }


    if (
        text.includes("srp") ||
        text.includes("spm")
    ) {

        return (
            "SRP means Sucker Rod Pump. " +
            "SPM represents strokes per minute. " +
            "The demo balanced plan uses about " +
            "7.8 SPM."
        );

    }


    if (
        text.includes("css")
    ) {

        return (
            "CSS means Cyclic Steam Stimulation. " +
            "The typical cycle is steam injection, " +
            "soaking and production."
        );

    }


    if (
        text.includes("sor")
    ) {

        return (
            "SOR means Steam-Oil Ratio. " +
            "It is used to understand steam " +
            "requirement relative to oil production."
        );

    }


    if (
        text.includes("temperature")
    ) {

        return (
            "Demo reservoir temperatures are " +
            "approximately 79–86°F across " +
            "the displayed wells."
        );

    }


    if (
        text.includes("viscosity")
    ) {

        return (
            "Demo viscosity values are roughly " +
            "128–158 cP across the displayed wells."
        );

    }


    if (
        text.includes("compare")
    ) {

        return (
            "BW-0007 currently has the strongest " +
            "demo health at 91% and lower " +
            "rod-float risk of 18%."
        );

    }


    return (
        "I can help with well health, " +
        "production, rod-float risk, SRP, " +
        "SPM, CSS, SOR, temperature, " +
        "viscosity and Digital-Twin concepts."
    );

}


/* =========================================
   INITIALIZE
========================================= */

renderWells();


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "PETROFLOW Digital-Well loaded successfully."
);

console.log(
    "PETRO-AI frontend initialized."
);