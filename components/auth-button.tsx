import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

export default function AuthButton() {
    return <Button variant="outline">
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
    </Button>
}