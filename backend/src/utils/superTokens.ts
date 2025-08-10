import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import dotenv from 'dotenv';


async function initializeSuperTokens() {
    dotenv.config();
    // console.log({
    //     // learn more about this on https://supertokens.com/docs/session/appinfo
    //     appName: process.env.APP_NAME as string,
    //     apiDomain: process.env.API_DOMAIN as string,
    //     websiteDomain: process.env.WEBSITE_DOMAIN as string,
    //     apiBasePath: process.env.API_BASE_PATH as string,
    //     websiteBasePath: process.env.WEBSITE_BASE_PATH as string,
    // })
    supertokens.init({
        framework: "express",
        supertokens: {
            // We use try.supertokens for demo purposes.
            // At the end of the tutorial we will show you how to create
            // your own SuperTokens core instance and then update your config.
            connectionURI: process.env.CONNECTION_URI as string,
            apiKey: process.env.API_KEY
        },

        appInfo: {
            // learn more about this on https://supertokens.com/docs/session/appinfo
            appName: process.env.APP_NAME as string,
            apiDomain: process.env.API_DOMAIN as string,
            websiteDomain: process.env.WEBSITE_DOMAIN as string,
            apiBasePath: process.env.API_BASE_PATH as string,
            websiteBasePath: process.env.WEBSITE_BASE_PATH as string,
        },
        recipeList: [
            EmailVerification.init({
                mode: "REQUIRED", // or "OPTIONAL"
                // emailDelivery: {
                //     override: (originalImplementation) => {
                //         return {
                //             ...originalImplementation,
                //             sendEmail(input) {
                //                 return originalImplementation.sendEmail({
                //                     ...input,
                //                     emailVerifyLink: input.emailVerifyLink.replace(
                //                         // This is: `<YOUR_WEBSITE_DOMAIN>/auth/verify-email`
                //                         `${process.env.WEBSITE_DOMAIN as string}/verify-email`,
                //                         "http://localhost:5173/verify-email",
                //                     )
                //                 }
                //                 )
                //             },
                //         }
                //     }
                // }
            }),
            EmailPassword.init(), // initializes signin / sign up features
            Session.init() // initializes session features
        ]
    });
}

export default initializeSuperTokens;
