export type messageType = 'INFO' | 'ERROR';
export type listenerType = (message: string, type: messageType) => void;

let listeners: listenerType[] = [];

export const notify = (message: string, type: messageType) => {
    listeners.forEach((listener) => {
        setTimeout(() => listener(message, type));
    });
};

export const listenToNotifications = (listener: listenerType) => {
    listeners.push(listener);

    return () => {
        listeners = [...listeners.filter((l) => l !== listener)];
    };
};
