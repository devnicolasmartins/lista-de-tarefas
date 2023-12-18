import { View, Text } from 'react-native';
import estilos from './estilos';

export default function Tarefa({ nome, desc, data }) {

  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>Tarefa: {nome}</Text>
      <Text style={estilos.texto}>Descrição: {desc}</Text>
      <Text style={estilos.texto}>Data: {data}</Text>
    </View>
  );
}
