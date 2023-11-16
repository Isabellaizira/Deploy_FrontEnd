import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../API/apiLocal/api'

//como vai ser usado em outros locais, exportamos a constante
export const AuthContext = createContext()

// children é uma palavra reservada
export default function AuthProvider({ children }) {
    const [user, setUser] = useState('')

    const isAutenthicated = !!user

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)
    //context serve para quando uma função que vai ser utilazado em varios componentes, escrevemos ele uma vez e chamamos nos componentes 
    async function loginToken() {
        try {
            const resposta = await api.get('/ListarUsuarioToken', {
                headers: {
                    //dar espaço depois de bearer
                    Authorization: 'Bearer ' + `${token}`
                }
            })
          console.log(resposta)
        } catch (err) {

        }
    }




    async function signIn({ email, password }) {
        try {
            const resposta = await api.post('/LoginUsuarios', {
                email,
                password
            })

            return resposta

        } catch (err) {
            toast.error('Erro ao Fazer Login')
        }

    }
    return (
        <AuthContext.Provider value={{ isAutenthicated, signIn, loginToken }}>
            {children}
        </AuthContext.Provider>
    )

}
