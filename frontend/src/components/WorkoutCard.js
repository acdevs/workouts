import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutCard = ({ workout }) => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleDelete = async () => {

        if(!user) return
        
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        } );
        const json = await response.json();

        if(response.ok) {
            console.log("Deleted!", json);
            dispatch({ type: 'DELETE_WORKOUT', payload: workout._id })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (Kgs) : </strong>{workout.reps}</p>
            <p><strong>Reps : </strong>{workout.load}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span onClick={handleDelete}><i className="fa-solid fa-xmark"></i></span>
        </div>
    )
}

export default WorkoutCard