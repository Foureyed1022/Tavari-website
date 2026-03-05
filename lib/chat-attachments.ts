import { storage, db } from "./firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore"

export async function uploadChatAttachment(
    file: File,
    conversationId: string,
    senderId: string,
    senderName: string
): Promise<{ url: string; name: string; type: string } | null> {
    try {
        // Create storage reference
        const timestamp = Date.now()
        const storageRef = ref(storage, `chat_attachments/${conversationId}/${timestamp}_${file.name}`)

        // Upload file
        await uploadBytes(storageRef, file)

        // Get download URL
        const url = await getDownloadURL(storageRef)

        return {
            url,
            name: file.name,
            type: file.type
        }
    } catch (error) {
        console.error("Error uploading attachment:", error)
        return null
    }
}

export async function sendMessageWithAttachment(
    conversationId: string,
    senderId: string,
    senderName: string,
    senderPhoto: string | null,
    text: string,
    attachment: { url: string; name: string; type: string }
) {
    try {
        await addDoc(collection(db, "messages"), {
            conversationId,
            senderId,
            senderName,
            senderPhoto,
            text: text || `Shared ${attachment.name}`,
            attachments: [attachment],
            readBy: [senderId],
            timestamp: serverTimestamp()
        })

        // Update conversation's last message
        await updateDoc(doc(db, "conversations", conversationId), {
            lastMessage: {
                text: text || `📎 ${attachment.name}`,
                senderId,
                senderName,
                timestamp: serverTimestamp()
            },
            updatedAt: serverTimestamp()
        })

        return true
    } catch (error) {
        console.error("Error sending message with attachment:", error)
        return false
    }
}
