
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './inicio.estilo.scss'
import { toast } from 'react-toastify'
import apiLocal from '../API/apiLocal/api'

export default function Inicio() {
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Quando eu pego o token está como string
    const iToken = localStorage.getItem('@tklogin2023')
    //Aqui o Json.parse serve para transformar o token em objeto{}
    const token = JSON.parse(iToken)
    //Aqui cabe um console.log(token)
    useEffect(() => {
        //se o token for vazio, navege para pagina login, ou seja nem sai dela
        if (!token) {
            navigation('/')
            return
        } else if (token) {
            async function verificaToken() {
                const resposta = await apiLocal.get('/ListarUsuarioToken', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                //aqui cabe um console.log(token)
                if (resposta.data.dados) {
                    navigation('/')
                    return
                } else if (resposta.data.dados) {
                    navigation('/Dashboard')
                    return
                }

            }
            verificaToken()
        }
    }, [])

    async function handleLogin(e) {
        e.preventDefault()
        // console.log(email, password)
        if (!email || !password) {
            toast.warn('Existe Campos em Branco')
        }
        try {
            const resposta = await apiLocal.post('/LoginUsuarios', {
                email, password
            })
            if (resposta.data.id) {
                const token = resposta.data.token
                localStorage.setItem('@tklogin2023', JSON.stringify(token))
                toast.success('Login Efetuado Com Sucesso')
                navigation('/Dashboard')
            }
            //console.log(resposta)
        } catch (err) {
            //aqui um console.log(err) o erro é "explicado" assim chegamos no caminho do erro(err.response.data.error) 
            toast.error(err.response.data.error)
        }


    }


    return (
        <div>
            <div className='loginInicio'>
                <h1>Login</h1>
            </div>
            <div className='formInicio'>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                </form>
                <p>Para se cadastrar clique <Link to='/Login'>AQUI</Link></p>
            </div>
        </div>
    )
}
