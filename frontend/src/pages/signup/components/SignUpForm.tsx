"use client"

import type React from "react"

import { useState } from "react"
import { cn, logout } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"
import { CheckCircle, Mail, ArrowLeft } from "lucide-react"
import { sendEmail, signUpUser, verifyEmailUnique } from "../actions/signUp.actions"
import { toast } from "react-toastify"
import api from "@/lib/api.service"

type SignUpStep = "email" | "password" | "confirmation"

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState<SignUpStep>("email")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)

        try {
            const isUnique = await verifyEmailUnique(email)
            if (isUnique) {
                setCurrentStep("password")
            } else {
                toast.error("This email is already registered. Please use a different email.",)
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password) return

        setIsLoading(true)

        try {
            const isUserSignedUP = await signUpUser(email, password);
            if (isUserSignedUP.status) {
                toast.success(isUserSignedUP.msg);
                const isUserEmailVerified = await sendEmail();
                if (isUserEmailVerified.status && isUserSignedUP.user) {
                    // setCurrentStep("confirmation");
                    await api.createUser(isUserSignedUP.user.id, email);
                    // await logout();
                    // toast.warn('Please login with your new credentials.');
                    navigate("/")
                } else {
                    toast.error(isUserEmailVerified.msg)
                }
            } else {
                toast.error(isUserSignedUP.msg)
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handleBackToEmail = () => {
        setCurrentStep("email")
    }

    const handleLoginRedirect = () => {
        navigate("/")
    }

    const renderEmailStep = () => (
        <Card>
            <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>Enter your email address to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleEmailSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Continue"}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={handleLoginRedirect}
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )

    const renderPasswordStep = () => (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={handleBackToEmail} className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Create your password</CardTitle>
                        <CardDescription>Creating account for {email}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                disabled={isLoading}
                            />
                            <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )

    // const renderConfirmationStep = () => (
    // <Card>
    //     <CardHeader className="text-center">
    //         <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
    //             <CheckCircle className="h-6 w-6 text-green-600" />
    //         </div>
    //         <CardTitle>Check your email</CardTitle>
    //         <CardDescription>We've sent a verification link to {email}</CardDescription>
    //     </CardHeader>
    //     <CardContent className="text-center">
    //         <div className="flex flex-col gap-4">
    //             <div className="rounded-lg bg-muted p-4">
    //                 <Mail className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
    //                 <p className="text-sm text-muted-foreground">
    //                     Click the link in your email to verify your account and complete the signup process.
    //                 </p>
    //             </div>
    //             <div className="text-sm text-muted-foreground">
    //                 Didn't receive the email? Check your spam folder or{" "}
    //                 <button onClick={() => setCurrentStep("email")} className="underline underline-offset-4 hover:text-primary">
    //                     try a different email address
    //                 </button>
    //             </div>
    //             <Button variant="outline" onClick={handleLoginRedirect} className="w-full bg-transparent">
    //                 Back to Login
    //             </Button>
    //         </div>
    //     </CardContent>
    // </Card>
    // )

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            {currentStep === "email" && renderEmailStep()}
            {currentStep === "password" && renderPasswordStep()}
            {/* {currentStep === "confirmation" && renderConfirmationStep()} */}
        </div>
    )
}
