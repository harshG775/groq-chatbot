import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

export default function VoiceInput({ inputValue, continuousListening, handleStartListing, handleStopListing }) {
    if (!continuousListening) {
        return (
            <>
                {inputValue.trim("")?.length === 0 && (
                    <Button onClick={handleStartListing} className="rounded-full" size="icon" variant="ghost">
                        <Mic className="h-6 w-6" />
                    </Button>
                )}
            </>
        );
    } else {
        return (
            <Button onClick={handleStopListing} className="rounded-full" size="icon" variant="destructive">
                <MicOff className="h-6 w-6" />
            </Button>
        );
    }
}
