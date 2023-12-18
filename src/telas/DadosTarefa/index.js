import { Alert, View, TouchableOpacity } from 'react-native';
import { EntradaTexto, Input } from '../../componentes/EntradaTexto';
import Botao from '../../componentes/Botao';
import estilos from './estilos';
import React, { useState} from 'react';
import { salvarTarefa, atualizarTarefa, deletarTarefa } from '../../servicos/firestore';
import { Alerta } from "../../componentes/Alerta";
import Icon from 'react-native-vector-icons/Feather';

export default function DadosTarefa( {navigation, route} ) {
    const [nome, setNome] = useState(route?.params?.nome || '')
    const [desc, setDesc] = useState(route?.params?.desc || '')
    const [data, setData] = useState(route?.params?.data || '')
    const [mensagem, setMensagem] = useState('')
    const [mostrarMensagem, setMostrarMensagem] = useState(false)

    async function salvar() {
        if (nome == '' || desc == '' || data == '' ){
            setMensagem('Preencha todos os campos.')
            setMostrarMensagem(true)
            return
        }

        let resultado = ''
        if(route?.params){
            resultado = await atualizarTarefa(route?.params?.id, { 
                nome, desc, data
            })
        } else {
            resultado = await salvarTarefa({
                nome,
                desc,
                data
            })
        }

        
        if(resultado == "erro") {
            Alert.alert('Erro ao salvar!')
        }
        else {
            navigation.goBack()
        }
    }

    return (
        <View style={estilos.container}>
            { route?.params && <TouchableOpacity 
                onPress= {() => {
                    deletarTarefa(route?.params?.id)
                    navigation.goBack()
                }}
                >
                <Icon
                    name= "trash-2"
                    size={20}
                    color="#000"
                />
            </TouchableOpacity>}
            <EntradaTexto 
                label='Nome do tarefa'
                value={nome}
                onChangeText={texto => setNome(texto)}
            />

            <EntradaTexto
                label='Descrição da tarefa'
                value={desc}
                onChangeText={texto=> setDesc(texto)}
            />
            <EntradaTexto
                label='Data da tarefa'
                value={data}
                onChangeText={texto=> setData(texto)}
            />

            <Botao onPress={() => salvar()}> Salvar </Botao>
            <Alerta
                mensagem={mensagem}
                error={mostrarMensagem}
                setError={setMostrarMensagem}
            />
        </View>
    )
}