class SSEParser extends TransformStream {
    constructor() {
        let buffer = "";
        let currentEvent = {};

        super({
            transform(chunk, controller) {
                buffer += new TextDecoder().decode(chunk);
                const lines = buffer.split(/\r\n|\r|\n/);

                buffer = lines.pop();

                for (const line of lines) {
                    if (line.startsWith("data:")) {
                        currentEvent.data = (currentEvent.data || "") + line.slice(5).trim() + "\n";
                    } else if (line.startsWith("event:")) {
                        currentEvent.event = line.slice(6).trim();
                    } else if (line.startsWith("id:")) {
                        currentEvent.id = line.slice(3).trim();
                    } else if (line.startsWith("retry:")) {
                        currentEvent.retry = parseInt(line.slice(6).trim());
                    } else if (line === "") {
                        if (currentEvent.data) {
                            currentEvent.data = currentEvent.data.slice(0, -1); // Remove trailing newline
                            controller.enqueue(currentEvent);
                        }
                        currentEvent = {};
                    }
                }
            },
            flush(controller) {
                if (buffer.trim() && currentEvent.data) {
                    currentEvent.data = currentEvent.data.slice(0, -1); // Remove trailing newline
                    controller.enqueue(currentEvent);
                }
            },
        });
    }
}
