import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user) {
            setError('You need to be logged in.')
            return
        }
        const workout = { title, load, reps };
        
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(workout)
        });

        const json = await response.json();

        if(!response.ok) {
            setError(json.message)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add a New Workout</h2>
            <label>Excercise Title</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={ emptyFields.includes('title') ? 'error' : '' }
                />
            <label>Load (Kgs)</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={ emptyFields.includes('load') ? 'error' : '' }
                />
            <label>Reps</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={ emptyFields.includes('reps') ? 'error' : '' }
                />
            <button>Add Workout</button>
            {
                error && <div className="error">{error}</div>
            }
        </form>
    )
}

export default WorkoutForm