import { Link } from 'react-router'
import { Trash2 } from 'lucide-react'
import api from '../lib/axios'
import toast from 'react-hot-toast'

function NoteCard({ note, setNotes }) {
  const handleDelete = async (e) => {
    e.preventDefault()

    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`/notes/${note._id}`)
      toast.success('Note deleted successfully')
      setNotes((prev) => prev.filter((n) => n._id !== note._id))
    } catch (error) {
      toast.error('Failed to delete note')
      console.error('Error deleting note:', error)
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-shadow border border-base-content/10"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/50">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <button onClick={handleDelete} className="btn btn-ghost btn-xs text-error">
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard