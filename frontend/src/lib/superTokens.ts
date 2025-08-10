import React from "react";
// import dotenv from 'dotenv';
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";
// dotenv.config();

async function initializeSuperTokens() {
    SuperTokens.init({
        appInfo: {
            appName: "My App 1",
            apiDomain: "http://localhost:4000/note-app",
            websiteDomain: "http://localhost:5173",
            apiBasePath: "/",
            websiteBasePath: "/",
        },
        recipeList: [EmailPassword.init(), Session.init()],
    });
}

export default initializeSuperTokens;