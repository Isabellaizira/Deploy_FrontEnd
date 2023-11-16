import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
//Quando exportamos sem default precisa importar com {}
import apiLocal from '../API/apiLocal/api'

export default function Dashboard() {
    //proteção da pagina, se não houver token ou seja um login valido não vai entrar na pagina de dashboard
    const navigation = useNavigate()

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    useEffect(() => {
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


    function handleSair() {
    localStorage.removeItem('@tklogin2023')
    navigation('/')
    }
    return (
        <div>
            <h1>Dashboard</h1>

            <Link to='/Produtos'>Cadastrar Produtos</Link><p />

            <button onClick={handleSair}>SAIR</button>
        </div>
    )
}