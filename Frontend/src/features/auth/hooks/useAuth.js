import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context


    const handleLogin = async (username, password) => {

        try {
            setLoading(true)

            const response = await login(username, password)

            setUser(response.user)
        } catch (error) {
            console.error("handleLogin failed:", error)
            throw error
        } finally {
            setLoading(false)
        }

    }

    const handleRegister = async (username, email, password) => {

        try {
            setLoading(true)
            const response = await register(username, email, password)
            setUser(response.user)
        } catch (error) {
            console.error("handleRegister failed:", error)
            throw error
        } finally {
            setLoading(false)
        }

    }

    return {
        user, loading, handleLogin, handleRegister
    }

}
