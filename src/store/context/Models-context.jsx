import { getModel } from "@/services/groq/groq.ai";
import { createContext, useContext, useEffect, useState } from "react";

const ModelsContext = createContext(null);

export function ModelsProvider({ children }) {
    const [models, setModels] = useState([]);
    const [currentModel, setCurrentModel] = useState("");
    useEffect(() => {
        (async () => {
            const [error, response] = await getModel();
            const models = response?.data.reduce((acc, model) => {
                const owner = model.owned_by;
                if (!acc[owner]) {
                    acc[owner] = [];
                }
                acc[owner].push(model.id);
                return acc;
            }, {});
            setModels(models);
        })();
    }, []);

    return (
        <ModelsContext.Provider value={{ models, setModels, currentModel, setCurrentModel }}>
            {children}
        </ModelsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModelsContext = () => {
    const context = useContext(ModelsContext);
    if (!context) {
        throw new Error("useModelsContext must be used within a ModelsProvider");
    }
    return context;
};
