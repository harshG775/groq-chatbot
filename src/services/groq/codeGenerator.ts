import { groqClient } from ".";

export async function codeGenerator(userPrompt: string) {
    const systemPrompt = `
      You are an expert React developer using Vite and Tailwind CSS. Your task is to generate React code based on user requests.
      
      Rules:
      1. Use functional components
      2. Export components as default
      3. Use Tailwind classes for styling
      4. Keep components focused and modular
      5. Use ES6+ syntax
      6. Add PropTypes for component validation
      7. Use named exports for utilities
      8. Follow standard directory structure
      
      Always use the generate_react_code tool to provide your response.
      `;
    const response = await groqClient.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        model: "deepseek-r1-distill-llama-70b",
        tools: [
            {
                type: "function",
                function: {
                    name: "generate_react_code",
                    description: "Generates React code for a given component or feature using Vite and Tailwind CSS.",
                    parameters: {
                        type: "object",
                        properties: {
                            components: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            description: "The name of the React component",
                                        },
                                        path: {
                                            type: "string",
                                            description:
                                                "The file path where the component should be saved (e.g., src/components/Button.jsx)",
                                        },
                                        code: {
                                            type: "string",
                                            description: "The React code for the component",
                                        },
                                    },
                                    required: ["name", "path", "code"],
                                },
                            },
                            dependencies: {
                                type: "array",
                                items: {
                                    type: "string",
                                    description: "List of npm packages required for the generated code",
                                },
                            },
                        },
                        required: ["components"],
                    },
                },
            },
        ],
        tool_choice: "auto",
    });
    const message = response.choices[0].message;
    console.log(message.reasoning);
    if (message.tool_calls) {
        console.log(JSON.parse(message.tool_calls[0].function.arguments));
    }
}
