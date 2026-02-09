import { db } from "./firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export type NotificationType = 'approval' | 'rejection' | 'request_new' | 'system'

export async function sendNotification(
    recipientId: string | 'finance', // 'finance' is a special alias for department-wide
    title: string,
    message: string,
    type: NotificationType = 'system',
    link?: string
) {
    try {
        await addDoc(collection(db, "notifications"), {
            recipientId,
            title,
            message,
            type,
            link,
            read: false,
            timestamp: serverTimestamp(),
            date: new Date().toISOString()
        })
        return true
    } catch (error) {
        console.error("Error sending notification:", error)
        return false
    }
}
