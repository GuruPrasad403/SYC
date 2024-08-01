
import { FunnelIcon } from "@heroicons/react/24/solid";
import ChatPart from "../components/chat";
import VideoConference from "../components/Video";

export default function Room(){
    return (
        <div className="h-screen flex flex-col lg:flex-row">
            {/* Video Conference Section */}
            <div className="lg:w-3/4 w-full lg:h-full h-screen flex-grow bg-gray-900">
                <VideoConference />
            </div>

            {/* Chat Part Section */}
            <div className="lg:w-1/4 w-full lg:h-full h-screen bg-zinc-700 flex-shrink-0">
                <ChatPart />
            </div>
        </div>
    )
}