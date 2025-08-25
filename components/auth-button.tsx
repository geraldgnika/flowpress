"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function AuthButton() {
    const { data: session, status } = useSession();
    const [isSigningIn, setIsSigningIn] = useState(false);

    if (status === "loading") {
        return (
            <Button variant="ghost" disabled>Loading...</Button>
        );
    }

    if (!session) {
        return (
            <Button
                variant="outline"
                onClick={() => {
                    setIsSigningIn(true);
                    signIn("google", { prompt: "select_account" });
                }}
                className="cursor-pointer"
                disabled={isSigningIn}>
                {isSigningIn ? "Signing In..." : (
                    <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                    </>
                )}
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={session.user?.image || ""}
                            alt={session.user?.name || ""}
                        />
                        <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-normal cursor-pointer">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {session.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user?.email}
                        </p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}