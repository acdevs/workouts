import { useState } from "react"
import { useRegister } from "../hooks/useRegister"

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register, isLoading, error } = useRegister()

    const handleRegister = async (e) => {
        e.preventDefault()

        await register(email, password)
    }

    return (
        <form className="signup" onSubmit={handleRegister}>
            <h3>Register</h3>

            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Register</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Register