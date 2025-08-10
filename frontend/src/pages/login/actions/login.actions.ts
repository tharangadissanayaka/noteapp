import { signIn } from "supertokens-web-js/recipe/emailpassword";
import Session from "supertokens-web-js/recipe/session";

export async function signInUser(email: string, password: string): Promise<{ status: boolean, msg: string }> {
    try {
        let response = await signIn({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })


        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax).
                    return { status: false, msg: formField.error };
                }
            })
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            return { status: false, msg: "Email password combination is incorrect." };
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign in was not allowed.
            return { status: false, msg: response.reason };
        } else {
            // sign in successful. The session tokens are automatically handled by
            // the frontend SDK.
            return { status: true, msg: "user successfully signed in" };
        }
        return { status: false, msg: "Failed to sign in user. Please try again" }
    } catch (error: any) {
        if (error.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(error.message);
        } else {
            throw new Error("Oops! Something went wrong.")
        }
    }
}

