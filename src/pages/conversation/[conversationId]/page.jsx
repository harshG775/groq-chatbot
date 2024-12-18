import { useParams } from "react-router-dom";

export default function ConversationPage() {
    // get id
    const params = useParams();
    
    
    
    return (
        <div>
            current conversation page
            <div>id: {params?.conversationId}</div>
        </div>
    )
}
