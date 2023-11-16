import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react'
import { toast } from 'react-toastify'
import './produtos.css'
import apiLocal from '../API/apiLocal/api'

export default function Produtos() {

    const [categorias, setCategorias] = useState([''])
    const [nome, setNome] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [preco, setPreco] = useState('')
    const [idCategorias, setIdCategorias] = useState('')
    const [imagem, setImagem] = useState('null')

    const navigation = useNavigate()
    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)


    useEffect(() => {
        if (!token) {
            navigation('/')
            return
        } else if (token) {
            async function listarCategorias() {
                const resposta = await apiLocal.get('/ListarCategorias', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                //console.log(resposta.data)
                if (resposta.data.dados) {
                    navigation('/')
                    return
                } else if (resposta.data.dados) {
                    navigation('/Dashboard')
                    return
                }
            }
            setCategorias()
            listarCategorias()
        }
    }, [])

    function handleImagem(e) {
        if (!e.target.files) {
            return
        }
        const image = e.target.files[0]
        if (image.type === 'image/png' || image.type === 'image/jpeg') {
            setImagem(image)
        }
    }

    //função assincrona para conectar como banco de dados
    async function CadastroProdutos(event) {
        try {
            event.preventDefault()
            const categoriaId = idCategorias
            const data = new FormData()

            data.append('nome', nome)
            data.append('fabricante', fabricante)
            data.append('quantidade', quantidade)
            data.append('preco', preco)
            data.append('categoriaID', categoriaId)
            data.append('file', imagem)

            const resposta = await apiLocal.post('/Produtos', data, {

            })
            toast.success(resposta.data.dados)

        } catch (err) {
            console.log(err)
        }

        setNome('')
        setFabricante('')
        setQuantidade('')
        setPreco('')
        setImagem(null)

    }

    return (
        <div>
            <div>
                <h1>Produtos</h1>
            </div>
            <div>
                <form className='form'
                    onSubmit={CadastroProdutos}>

                    <select
                        value={idCategorias}
                        onChange={(e) => setIdCategorias(e.target.value)}>
                        <option>Selecione...</option>
                        {categorias.map((item) => {
                            return (
                                <option
                                    value={item.id}
                                    key={item.id}>
                                    {item.name}</option>
                            )
                        })}
                    </select><br />

                    <label>Nome:</label>
                    <input
                        type='text'
                        value={nome}
                        //o alvo é a mudança do input de vazio par ao valor atribuido.
                        onChange={(e) => setNome(e.target.value)} /><br />

                    <label>Fabricante:</label>
                    <input
                        type='text'
                        value={fabricante}
                        onChange={(e) => setFabricante(e.target.value)} /> <br />

                    <label>Quantidade:</label>
                    <input
                        type='number'
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)} /> <br />

                    <label>Preço:</label>
                    <input
                        type='number'
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    /> <br />

                    <label>Imagem:</label>
                    <input
                        type='file'
                        accept='image/jpeg, image/png'
                        onChange={handleImagem}
                    /> <br /> <br /><br />

                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    )
}