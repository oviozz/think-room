import {disconnectDB} from "./database.ts";

export default async function gracefulShutdown() {
    try {
        await disconnectDB();
    } catch (error) {
        console.log("Error shutting down");
    }
}