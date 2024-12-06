// LocalStorage DB Utilities for CRUD Operations

// Helper to retrieve an item and parse it from JSON
const getItem = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

// Helper to set an item after stringifying it
const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// CRUD Functions for History
export const HistoryDB = {
    create: (history) => {
        const histories = getItem("histories") || [];
        histories.push(history);
        setItem("histories", histories);
    },
    read: (id) => {
        const histories = getItem("histories") || [];
        return histories.find(history => history.id === id);
    },
    readAll: () => {
        return getItem("histories") || [];
    },
    update: (id, updates) => {
        const histories = getItem("histories") || [];
        const updatedHistories = histories.map(history =>
            history.id === id ? { ...history, ...updates, updatedAt: new Date().toISOString() } : history
        );
        setItem("histories", updatedHistories);
    },
    delete: (id) => {
        const histories = getItem("histories") || [];
        const updatedHistories = histories.filter(history => history.id !== id);
        setItem("histories", updatedHistories);
    }
};

// CRUD Functions for Message
export const MessageDB = {
    create: (message) => {
        const messages = getItem("messages") || [];
        messages.push(message);
        setItem("messages", messages);
    },
    read: (id) => {
        const messages = getItem("messages") || [];
        return messages.find(message => message.id === id);
    },
    readAllByHistoryId: (historyId) => {
        const messages = getItem("messages") || [];
        return messages.filter(message => message.historyId === historyId);
    },
    update: (id, updates) => {
        const messages = getItem("messages") || [];
        const updatedMessages = messages.map(message =>
            message.id === id ? { ...message, ...updates, updatedAt: new Date().toISOString() } : message
        );
        setItem("messages", updatedMessages);
    },
    delete: (id) => {
        const messages = getItem("messages") || [];
        const updatedMessages = messages.filter(message => message.id !== id);
        setItem("messages", updatedMessages);
    }
};

// Utility to Clear All Data
export const clearDB = () => {
    localStorage.removeItem("histories");
    localStorage.removeItem("messages");
};
