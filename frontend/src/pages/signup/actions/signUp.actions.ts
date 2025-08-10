import { doesEmailExist } from "supertokens-web-js/recipe/emailpassword";
import { signUp } from "supertokens-web-js/recipe/emailpassword";
import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";
import type { User } from "supertokens-web-js/types";

export async function verifyEmailUnique(email: string): Promise<boolean> {
    try {
        let response = await doesEmailExist({
            email
        });

        if (response.doesExist) {
            return false;
        }

        return true;
    } catch (error: any) {
        if (error.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(error.message);
        } else {
            throw new Error("Failed to verify email. Please try again.");
        }
    }
}


export async function signUpUser(email: string, password: string): Promise<{ status: boolean, msg: string, user: User | null }> {
    try {
        let response = await signUp({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validation
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    return { status: false, msg: formField.error };
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    return { status: false, msg: formField.error };
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign up was not allowed.
            return { status: false, msg: response.status, user: null };
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            return { status: true, msg: "signedUp successfully.", user: response.user }
        }
        return { status: false, msg: "Failed to register user. Please try again", user: null }
    } catch (error: any) {
        if (error.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(error.message);
        } else {
            throw new Error("Oops! Something went wrong.")
        }
    }
}

export async function sendEmail(): Promise<{ status: boolean, msg: string }> {
    return { status: true, msg: "success" }
    // try {
    //     let response = await sendVerificationEmail();
    //     if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
    //         // This can happen if the info about email verification in the session was outdated.
    //         // Redirect the user to the home page
    //         return { status: false, msg: 'Failed to verify email.' }
    //     } else {
    //         // email was sent successfully.
    //         return { status: true, msg: "Please check your email and click the link in it" }
    //     }
    // } catch (error: any) {
    //     if (error.isSuperTokensGeneralError === true) {
    //         // this may be a custom error message sent from the API by you.
    //         throw new Error(error.message);
    //     } else {
    //         throw new Error("Oops! Something went wrong.")
    //     }
    // }
}
