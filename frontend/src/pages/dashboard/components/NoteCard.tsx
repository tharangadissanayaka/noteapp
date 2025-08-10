import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Pin } from "lucide-react"
import type { JournalCardProps, Note } from "@/types/types"
import { AddUpdateModal } from "./addUpdateModal"
import { updateNote, deleteNote, toggleNotePin } from "../actions/dashboard.actions"
import { toast } from "react-toastify"

export default function NoteCard({ id, title, date, description, hashtags, isPinned, onPinChange }: JournalCardProps) {

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [pinned, setPinned] = useState(isPinned)

    async function handleEdit() {
        try{
            setIsEditOpen(true)
        }catch(error){
            toast.error('Error editing note');
        }
    }

    async function handleDelete() {
        try{
            await deleteNote(id)
            // Simple refresh to reflect deletion
            window.location.reload()
        }catch(error){
            toast.error('Error deleting note');
        }
    }

    async function handlePinToggle() {
        try {
            const newPinStatus = !pinned;
            await toggleNotePin(id, newPinStatus);
            setPinned(newPinStatus);
            toast.success(newPinStatus ? 'Note pinned!' : 'Note unpinned!');
            // Call the callback to refresh notes in parent component
            if (onPinChange) {
                await onPinChange();
            }
        } catch (error) {
            toast.error('Error toggling pin status');
        }
    }

    return (
        <>
        <Card className="relative bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1">{title}</h3>
                        <p className="text-sm text-gray-500">{date}</p>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                        onClick={handlePinToggle}
                    >
                        <Pin className={`h-4 w-4 ${pinned ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                        {hashtags.map((tag, index) => (
                            <span key={index} className="text-sm text-gray-500">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600" onClick={handleEdit}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600" onClick={handleDelete}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <AddUpdateModal
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            initialData={{ title, content: description, tags: hashtags }}
            onSave={async (note: Note) => {
                await updateNote(id, note)
                setIsEditOpen(false)
                window.location.reload()
            }}
        />
        </>
    )
}
