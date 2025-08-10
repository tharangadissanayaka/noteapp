import { useEffect, useState, useMemo } from 'react'
import type { DashboardProps, JournalCardProps, Note } from '@/types/types';
import NoteCard from './components/NoteCard';
import { AddUpdateModal } from './components/addUpdateModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { doesSessionExist } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { createNewNote, fetchUserNotes } from './actions/dashboard.actions';




function Dashboard({ search }: DashboardProps) {

    const navigate = useNavigate();

    const [notes, setNotes] = useState<JournalCardProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Filter notes based on search query
    const filteredNotes = useMemo(() => {
        let filtered = notes;
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = notes.filter((note) => {
                const titleMatch = note.title.toLowerCase().includes(query);
                const descriptionMatch = note.description.toLowerCase().includes(query);
                const hashtagMatch = note.hashtags.some(tag => 
                    tag.toLowerCase().includes(query)
                );
                
                return titleMatch || descriptionMatch || hashtagMatch;
            });
        }
        
        // Sort pinned notes to the top
        return filtered.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return 0;
        });
    }, [notes, searchQuery]);

    // Function to refresh notes after pin status change
    const refreshNotes = async () => {
        try {
            const userNotes = await fetchUserNotes();
            const mapped: JournalCardProps[] = userNotes.map((n) => ({
                id: n._id,
                title: n.title,
                date: new Date(n.date).toISOString().slice(0, 10),
                description: n.description,
                hashtags: n.hashtags,
                isPinned: n.isPinned ?? false,
            }));
            setNotes(mapped);
        } catch (e) {
            // noop for now
        }
    };


    useEffect(() => {
        let isMounted = true;
        (async () => {
            const hasSession = await doesSessionExist();
            if (!hasSession) {
                navigate('/');
                return;
            }
            try {
                const userNotes = await fetchUserNotes();
                if (!isMounted) return;
                const mapped: JournalCardProps[] = userNotes.map((n) => ({
                    id: n._id,
                    title: n.title,
                    date: new Date(n.date).toISOString().slice(0, 10),
                    description: n.description,
                    hashtags: n.hashtags,
                    isPinned: n.isPinned ?? false,
                }));
                setNotes(mapped);
            } catch (e) {
                // noop for now
            } finally {
                if (isMounted) setIsLoading(false);
            }
        })();
        return () => {
            isMounted = false;
        }
    }, [])

    useEffect(
        () => {
            setSearchQuery(search || "");
        }, [search]
    );

    const [isModalOpen, setIsModalOpen] = useState(false)

    async function handleUpdateNote(note: Note) {
        if (await doesSessionExist()) {
            await createNewNote(note);
            // refresh list after creation
            const userNotes = await fetchUserNotes();
            const mapped: JournalCardProps[] = userNotes.map((n) => ({
                id: n._id,
                title: n.title,
                date: new Date(n.date).toISOString().slice(0, 10),
                description: n.description,
                hashtags: n.hashtags,
                isPinned: n.isPinned ?? false,
            }));
            setNotes(mapped);
        } else {
            navigate('/');
        }
    }
    return (
        <div className=' flex justify-center items-center mt-[10vh] mx-[5vw] '>
            <div className='md:grid md:grid-cols-3 flex flex-col gap-5'>
                {(isLoading ? [] : filteredNotes).map((data, index) => (
                    <NoteCard
                        key={index}
                        id={data.id}
                        title={data.title}
                        date={data.date}
                        description={data.description}
                        hashtags={data.hashtags}
                        isPinned={data.isPinned}
                        onPinChange={refreshNotes}
                    />)
                )}
            </div>
            {/* Add Note Button */}
            <div className="fixed bottom-6 right-6 z-10">
                <Button
                    onClick={() => setIsModalOpen(true)}
                    size="lg"
                    className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
                >
                    <Plus className="h-6 w-6" />
                </Button>
            </div>
            <AddUpdateModal open={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleUpdateNote} />
        </div>
    )
}

export default Dashboard
