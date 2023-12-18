import React, {useEffect, useState} from 'react';
import { View, Text, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import Cabecalho from '../../componentes/Cabecalho';
import estilos from './estilos';
import { auth } from '../../config/firebase';
import { BotaoTarefa } from '../../componentes/BotaoTarefa';
import { pegarTarefas, pegarTarefasTempoReal } from '../../servicos/firestore';
import Tarefa from '../../componentes/Tarefas'

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;
  const [tarefas, setTarefas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarDadosTarefas() {
    setRefreshing(true)
    const tarefasFirestore = await pegarTarefas()
    setTarefas(tarefasFirestore)
    setRefreshing(false)
  }

  useEffect(() => {
    carregarDadosTarefas()
    pegarTarefasTempoReal(setTarefas)
  }, [])

  function deslogar(){
    auth.signOut();
    navigation.replace('Login');
  }

  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <ScrollView 
        style={{ width: '100%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarDadosTarefas}
          />
        }
      >
        {
          tarefas?.map((tarefa) => {
            return (  
            <TouchableOpacity key={tarefa.id} onPress={() => navigation.navigate('DadosTarefa', tarefa)}>
              <Tarefa nome={tarefa.nome} desc={tarefa.desc} data={tarefa.data} />
            </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      
      <BotaoTarefa onPress={() => navigation.navigate('DadosTarefa')}/>
     </View>
  );
}
