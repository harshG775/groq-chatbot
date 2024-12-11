import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Fetch } from "@/utils/Fetch";
import { catchError } from "@/utils/catchError";
import { useCookieContext } from "@/store/context/cookie-context";
export default function LoginPage() {
    const cookieStore = useCookieContext()
    //
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const [error, response] = await catchError(
            Fetch("https://onyx-ai-server.vercel.app/api/v1/users/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
        );
        if (error) {
            setError("Failed to login. Please try again.");
        }
        if (!error && response.ok) {
            const data = await response.json();
            cookieStore.set("token", data?.data?.token || undefined,{expires: new Date(Date.now() + 60 * 60 * 1000) }); //1h
            navigate("/");
        }

        setIsLoading(false);
    };
    console.log();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
