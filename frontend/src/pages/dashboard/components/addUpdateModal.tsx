
import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import type { AddUpdateModalProps } from "@/types/types"


export function AddUpdateModal({ open, onOpenChange, onSave, initialData }: AddUpdateModalProps) {
    const [title, setTitle] = useState(initialData?.title || "")
    const [content, setContent] = useState(initialData?.content || "")
    const [tags, setTags] = useState<string[]>(initialData?.tags || [])
    const [newTag, setNewTag] = useState("")

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()])
            setNewTag("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const handleSave = () => {
        onSave?.({
            title,
            content,
            tags,
        })
        onOpenChange(false)
        // Reset form
        setTitle("")
        setContent("")
        setTags([])
        setNewTag("")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddTag()
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">TITLE</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Title Input */}
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter note title..."
                        className="text-xl font-semibold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    {/* Content Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide">CONTENT</Label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note content here..."
                            className="min-h-[200px] resize-none border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-700"
                        />
                    </div>

                    {/* Tags Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide">TAGS</Label>

                        {/* Existing Tags */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1">
                                    #{tag}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>

                        {/* Add New Tag */}
                        <div className="flex gap-2">
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Add tags"
                                className="flex-1"
                            />
                            <Button onClick={handleAddTag} size="sm" variant="outline" className="px-3" disabled={!newTag.trim()}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Add Button */}
                    <Button
                        onClick={handleSave}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
                        disabled={!title.trim() || !content.trim()}
                    >
                        SAVE
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
