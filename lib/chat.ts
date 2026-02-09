import { db } from "./firebase"
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"

/**
 * Auto-creates a project channel when a new project is created
 */
export async function createProjectChannel(projectId: string, projectName: string, participants: string[]) {
    try {
        // Check if channel already exists
        const q = query(
            collection(db, "conversations"),
            where("type", "==", "project"),
            where("projectId", "==", projectId)
        )
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
            return snapshot.docs[0].id // Channel already exists
        }

        // Create new project channel
        const channelRef = await addDoc(collection(db, "conversations"), {
            type: 'project',
            projectId,
            projectName,
            participants,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })

        return channelRef.id
    } catch (error) {
        console.error("Error creating project channel:", error)
        return null
    }
}

/**
 * Auto-creates a department channel
 */
export async function createDepartmentChannel(departmentId: string, departmentName: string) {
    try {
        // Check if channel already exists
        const q = query(
            collection(db, "conversations"),
            where("type", "==", "department"),
            where("departmentId", "==", departmentId)
        )
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
            return snapshot.docs[0].id
        }

        // Create new department channel
        const channelRef = await addDoc(collection(db, "conversations"), {
            type: 'department',
            departmentId,
            departmentName,
            participants: [], // All department members can access
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })

        return channelRef.id
    } catch (error) {
        console.error("Error creating department channel:", error)
        return null
    }
}

/**
 * Creates the general agency-wide channel
 */
export async function createGeneralChannel() {
    try {
        const q = query(
            collection(db, "conversations"),
            where("type", "==", "general")
        )
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
            return snapshot.docs[0].id
        }

        const channelRef = await addDoc(collection(db, "conversations"), {
            type: 'general',
            participants: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })

        return channelRef.id
    } catch (error) {
        console.error("Error creating general channel:", error)
        return null
    }
}
