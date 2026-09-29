import express from "express";


/* =========================================
   BAGHEWALA DIGITAL-WELL
   LOCAL PETRO-AI BACKEND
========================================= */


/* =========================================
   CONFIGURATION
========================================= */

const app =
    express();

const PORT =
    3000;


/* =========================================
   MIDDLEWARE
========================================= */

app.use(
    express.json()
);

app.use(
    express.static(".")
);


/* =========================================
   DEMONSTRATION WELL DATA
========================================= */

const wells = [

    {
        id: "BW-001",

        health: 72,

        production: 980,

        steamRate: 1050,

        srp: 7.8,

        rodFloatRisk: 62,

        temperature: 82,

        viscosity: 145,

        sor: 1.07,

        energyIntensity: 2.8

    },


    {
        id: "BW-002",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },

    

    {
        id: "BW-003",

        health: 91,

        production: 1250,

        steamRate: 920,

        srp: 8.5,

        rodFloatRisk: 18,

        temperature: 85,

        viscosity: 132,

        sor: 0.74,

        energyIntensity: 2.1

    },

    
    {
        id: "BW-004",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },

    
    {
        id: "BW-005",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },


    
    {
        id: "BW-006",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },


    
    {
        id: "BW-007",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },


    
    {
        id: "BW-008",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },


    
    {
        id: "BW-009",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },


    
    {
        id: "BW-010",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },


    
    {
        id: "BW-011",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    },
    
    {
        id: "BW-012",

        health: 84,

        production: 1120,

        steamRate: 980,

        srp: 8.2,

        rodFloatRisk: 34,

        temperature: 79,

        viscosity: 158,

        sor: 0.88,

        energyIntensity: 2.4

    }

];


/* =========================================
   HELPER FUNCTIONS
========================================= */


/*
   Find well by ID
*/

function findWell(
    question
) {

    const upperQuestion =
        question.toUpperCase();


    return wells.find(
        (well) =>
            upperQuestion.includes(
                well.id
            )
    );

}


/*
   Get highest-risk well
*/

function getHighestRiskWell() {

    return wells.reduce(
        (highest, current) => {

            return current.rodFloatRisk >
                highest.rodFloatRisk
                ? current
                : highest;

        }
    );

}


/*
   Get average production
*/

function getAverageProduction() {

    const total =
        wells.reduce(
            (sum, well) =>
                sum + well.production,
            0
        );


    return Math.round(
        total / wells.length
    );

}


/*
   Get average health
*/

function getAverageHealth() {

    const total =
        wells.reduce(
            (sum, well) =>
                sum + well.health,
            0
        );


    return Math.round(
        total / wells.length
    );

}


/* =========================================
   LOCAL PETRO-AI ENGINE
========================================= */

function generateLocalResponse(
    question
) {

    const query =
        question
            .toLowerCase()
            .trim();


    /* =========================================
       GREETINGS
    ========================================= */

    if (
        query === "hi" ||
        query === "hello" ||
        query === "hey" ||
        query.includes("good morning") ||
        query.includes("good afternoon") ||
        query.includes("good evening")
    ) {

        return (
            "Hello! 👋 I'm PETRO-AI. " +
            "I can help you analyze well health, " +
            "rod-float risk, SRP, CSS, SOR, " +
            "temperature, viscosity and energy performance."
        );

    }


    /* =========================================
       THANK YOU
    ========================================= */

    if (
        query.includes("thank you") ||
        query.includes("thanks") ||
        query.includes("thankyou")
    ) {

        return (
            "You're welcome! 🤝 " +
            "I'm here to help with your " +
            "well monitoring and production analysis."
        );

    }


    /* =========================================
       SORRY
    ========================================= */

    if (
        query.includes("sorry") ||
        query.includes("apolog")
    ) {

        return (
            "No worries! 😊 " +
            "How can I help you with the wells?"
        );

    }


    /* =========================================
       GOODBYE
    ========================================= */

    if (
        query.includes("bye") ||
        query.includes("goodbye") ||
        query.includes("see you")
    ) {

        return (
            "Goodbye! 👋 Keep monitoring the wells " +
            "and stay focused on safe operations."
        );

    }


    /* =========================================
       HELP
    ========================================= */

    if (
        query === "help" ||
        query.includes("what can you do") ||
        query.includes("what can you help")
    ) {

        return (
            "I can help with:\n\n" +

            "• Well health\n" +
            "• Rod-float risk\n" +
            "• SRP / SPM\n" +
            "• CSS / steam injection\n" +
            "• SOR\n" +
            "• Reservoir temperature\n" +
            "• Oil viscosity\n" +
            "• Energy intensity\n" +
            "• Well comparison\n" +
            "• Production analysis"
        );

    }


    /* =========================================
       SPECIFIC WELL
    ========================================= */

    const well =
        findWell(question);


    if (well) {

        /* WELL HEALTH */

        if (
            query.includes("health")
        ) {

            return (
                `Well ${well.id} has a ` +
                `demonstration Health Index of ` +
                `${well.health}/100. ` +

                `Current demonstration production ` +
                `is approximately ${well.production} bpd. ` +

                `Rod-float risk is ${well.rodFloatRisk}%.`
            );

        }


        /* PRODUCTION */

        if (
            query.includes("production") ||
            query.includes("produce") ||
            query.includes("output")
        ) {

            return (
                `${well.id} has a ` +
                `demonstration production rate of ` +
                `${well.production} bpd.`
            );

        }


        /* ROD FLOAT */

        if (
            query.includes("rod") ||
            query.includes("risk") ||
            query.includes("float")
        ) {

            return (
                `${well.id} has a ` +
                `demonstration rod-float risk of ` +
                `${well.rodFloatRisk}%. ` +

                `Higher risk should be investigated ` +
                `using pump load, fillage and ` +
                `surface-card behaviour before ` +
                `changing operating parameters.`
            );

        }


        /* SRP */

        if (
            query.includes("srp") ||
            query.includes("spm") ||
            query.includes("pump")
        ) {

            return (
                `${well.id} is currently represented ` +
                `with a demonstration SRP speed of ` +
                `${well.srp} SPM. ` +

                `Any operational change should be ` +
                `validated by qualified field engineers.`
            );

        }


        /* TEMPERATURE */

        if (
            query.includes("temperature") ||
            query.includes("temp")
        ) {

            return (
                `${well.id} has a demonstration ` +
                `reservoir temperature of approximately ` +
                `${well.temperature}°C.`
            );

        }


        /* VISCOSITY */

        if (
            query.includes("viscosity")
        ) {

            return (
                `${well.id} has a demonstration oil ` +
                `viscosity value of approximately ` +
                `${well.viscosity} cP. ` +

                `For heavy oil systems, higher temperature ` +
                `can generally reduce viscosity and improve ` +
                `fluid mobility.`
            );

        }


        /* SOR */

        if (
            query.includes("sor") ||
            query.includes("steam oil")
        ) {

            return (
                `${well.id} has a demonstration ` +
                `SOR of ${well.sor}. ` +

                `SOR compares steam input with oil ` +
                `production and is useful for evaluating ` +
                `steam efficiency.`
            );

        }


        /* ENERGY */

        if (
            query.includes("energy") ||
            query.includes("intensity")
        ) {

            return (
                `${well.id} has a demonstration ` +
                `energy intensity of approximately ` +
                `${well.energyIntensity} units per barrel. ` +

                `Lower energy intensity generally means ` +
                `less energy is required per unit of production.`
            );

        }


        /* DEFAULT WELL RESPONSE */

        return (
            `${well.id} is available in the demonstration ` +
            `dataset with Health Index ${well.health}/100, ` +
            `production ${well.production} bpd and ` +
            `rod-float risk ${well.rodFloatRisk}%.`
        );

    }


    /* =========================================
       WELL ATTENTION
    ========================================= */

    if (
        query.includes("attention") ||
        query.includes("which well") ||
        query.includes("problem well") ||
        query.includes("risk") &&
        query.includes("well")
    ) {

        const highestRisk =
            getHighestRiskWell();


        return (
            "Based on the demonstration dataset, " +
            "the main wells requiring attention are " +
            "BW-0005 and BW-0011.\n\n" +

            `• BW-0005 → Rod-float risk ${wells[0].rodFloatRisk}%\n` +
            `• BW-0011 → Rod-float risk ${wells[1].rodFloatRisk}%\n\n` +

            `BW-0005 currently has the highest ` +
            `demonstration rod-float risk at ` +
            `${highestRisk.rodFloatRisk}%.`
        );

    }


    /* =========================================
       ALL WELLS
    ========================================= */

    if (
        query.includes("all wells") ||
        query.includes("list wells") ||
        query.includes("show wells")
    ) {

        return (
            "Current demonstration wells:\n\n" +

            wells
                .map(
                    (well) =>
                        `• ${well.id} — Health ${well.health}/100 — ` +
                        `Production ${well.production} bpd — ` +
                        `Rod-float risk ${well.rodFloatRisk}%`
                )
                .join("\n")
        );

    }


    /* =========================================
       COMPARE WELLS
    ========================================= */

    if (
        query.includes("compare") ||
        query.includes("comparison")
    ) {

        return (
            "Demonstration well comparison:\n\n" +

            wells
                .map(
                    (well) =>
                        `• ${well.id}: ` +
                        `Health ${well.health}/100, ` +
                        `Production ${well.production} bpd, ` +
                        `Rod risk ${well.rodFloatRisk}%`
                )
                .join("\n\n")
        );

    }


    /* =========================================
       CSS
    ========================================= */

    if (
        query.includes("css") ||
        query.includes("cyclic steam")
    ) {

        return (
            "CSS stands for Cyclic Steam Stimulation. " +
            "It generally involves three stages: " +
            "steam injection, a soak period and production. " +

            "For this Digital-Well demonstration, CSS analysis " +
            "is used to understand how steam and reservoir " +
            "conditions can affect production."
        );

    }


    /* =========================================
       STEAM
    ========================================= */

    if (
        query.includes("steam")
    ) {

        return (
            "The balanced demonstration plan uses " +
            "approximately 1,050 bpd steam rate. " +

            "Steam conditions should be evaluated together " +
            "with production, SOR, temperature and energy " +
            "performance."
        );

    }


    /* =========================================
       SRP GENERAL
    ========================================= */

    if (
        query.includes("srp") ||
        query.includes("spm")
    ) {

        return (
            "The balanced demonstration plan uses " +
            "approximately 7.8 SPM. " +

            "SRP optimization should consider production, " +
            "pump loading, fillage, rod-float risk and " +
            "energy performance."
        );

    }


    /* =========================================
       SOR GENERAL
    ========================================= */

    if (
        query.includes("sor") ||
        query.includes("steam oil ratio")
    ) {

        return (
            "SOR means Steam-Oil Ratio. " +

            "It compares steam input with oil production " +
            "and helps evaluate steam efficiency. " +

            "Lower SOR can indicate better steam utilization, " +
            "but it should always be interpreted with production " +
            "and reservoir conditions."
        );

    }


    /* =========================================
       TEMPERATURE
    ========================================= */

    if (
        query.includes("temperature") ||
        query.includes("reservoir temperature")
    ) {

        return (
            "Reservoir temperature can strongly affect " +
            "heavy-oil viscosity. " +

            "In general, increasing temperature reduces " +
            "oil viscosity and can improve mobility. " +

            "The actual field response depends on reservoir " +
            "properties and operating conditions."
        );

    }


    /* =========================================
       VISCOSITY
    ========================================= */

    if (
        query.includes("viscosity")
    ) {

        return (
            "Oil viscosity describes resistance to flow. " +

            "For heavy oil, higher temperature generally " +
            "reduces viscosity and can improve mobility. " +

            "PETRO-AI can also compare the demonstration " +
            "viscosity values for individual wells."
        );

    }


    /* =========================================
       ENERGY
    ========================================= */

    if (
        query.includes("energy")
    ) {

        return (
            "Energy intensity represents the energy required " +
            "for a unit of production. " +

            "PETRO-AI can compare demonstration energy " +
            "intensity across wells and operating plans."
        );

    }


    /* =========================================
       DATA
    ========================================= */

    if (
        query.includes("data") ||
        query.includes("dataset") ||
        query.includes("demo")
    ) {

        return (
            "PETRO-AI is currently using a simulated " +
            "demonstration dataset containing wells " +
            "BW-0005, BW-0011 and BW-0007. " +

            "These values are not live field measurements."
        );

    }


    /* =========================================
       DEFAULT RESPONSE
    ========================================= */

    return (
        "I can help with:\n\n" +

        "• Well health\n" +
        "• Rod-float risk\n" +
        "• Production\n" +
        "• SRP / SPM\n" +
        "• CSS / steam\n" +
        "• SOR\n" +
        "• Reservoir temperature\n" +
        "• Oil viscosity\n" +
        "• Energy intensity\n" +
        "• Well comparison\n\n" +

        "Try asking: " +
        "\"Which wells need attention?\""
    );

}


/* =========================================
   CHAT API
========================================= */

app.post(
    "/api/chat",
    (request, response) => {

        try {

            const question =
                request.body.question;


            /* Validate */

            if (
                !question ||
                !question.trim()
            ) {

                return response
                    .status(400)
                    .json({

                        error:
                            "Question is required."

                    });

            }


            /* Generate local response */

            const answer =
                generateLocalResponse(
                    question
                );


            /* Send response */

            response.json({

                answer: answer

            });

        }


        catch (error) {

            console.error(
                "PETRO-AI Error:",
                error
            );


            response
                .status(500)
                .json({

                    error:
                        "PETRO-AI local engine unavailable."

                });

        }

    }
);


/* =========================================
   HEALTH CHECK
========================================= */

app.get(
    "/api/health",
    (request, response) => {

        response.json({

            status:
                "online",

            service:
                "Baghewala Digital-Well",

            assistant:
                "PETRO-AI",

            mode:
                "local",

            api:
                "not required"

        });

    }
);


/* =========================================
   WELL DATA API
========================================= */

app.get(
    "/api/wells",
    (request, response) => {

        response.json({

            mode:
                "demonstration",

            wells:
                wells

        });

    }
);


/* =========================================
   START SERVER
========================================= */

app.listen(
    PORT,
    () => {

        console.log(
            "Baghewala Digital-Well server started."
        );

        console.log(
            `http://localhost:${PORT}`
        );

        console.log(
            "PETRO-AI running in LOCAL MODE."
        );

        console.log(
            "OpenAI API credits are NOT required."
        );

    }
);