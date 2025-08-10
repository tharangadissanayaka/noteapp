"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Loader2 } from "lucide-react"
import type { NavbarProps } from "@/types/types"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Session from "supertokens-web-js/recipe/session"
import { doesSessionExist, getDisplayName, getUserIntials } from "@/lib/utils"
import api from "@/lib/api.service"


export function Navbar({
    brandName,
    onLogout,
    onSearch
}: NavbarProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [userInitials, setUserInitials] = useState<string>("");
    const [query, setQuery] = useState<string>('');

    async function refreshUserInfo() {
        setLoading(true);
        const hasSession = await doesSessionExist();
        setSignedIn(hasSession);
        if (!hasSession) {
            setUserName("");
            setUserInitials("");
            setLoading(false);
            return;
        }
        try {
            const superTokenId = await Session.getUserId();
            const response = await api.getUser(superTokenId);
            const email: string = response.data.email || "";
            setUserName(getDisplayName(email) || email);
            setUserInitials(getUserIntials(email));
        } catch (e) {
            setUserName("");
            setUserInitials("");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const location = useLocation();
    useEffect(() => {
        refreshUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    async function handleLogout() {
        setLoading(true);
        if (onLogout) {
            onLogout();
        }
        setLoading(false);
    }
    async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
        onSearch(event.target.value);
    }
    return (
        <nav className="w-full bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Brand/Logo */}
                <div className="flex-shrink-0">
                    <h1 className="text-lg font-semibold text-gray-900">{brandName}</h1>
                </div>

                {signedIn && (
                    <>
                        {loading ? (
                            <div className="flex-1 max-w-md mx-8 flex justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                            </div>
                        ) : (
                            <div className="flex-1 max-w-md mx-8">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Search Notes"
                                        className="w-full bg-gray-50 border-gray-200 pl-4 pr-10 py-2 text-sm placeholder:text-gray-500 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                                        onChange={handleSearch}
                                        value={query}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 flex items-center justify-center">
                                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-700 font-medium">{userName}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 hover:text-gray-700 p-0 h-auto font-normal"
                                        onClick={handleLogout}
                                        disabled={loading}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </nav>
    )
}
