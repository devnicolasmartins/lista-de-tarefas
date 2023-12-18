import { TouchableOpacity, Text } from "react-native-web";
import estilos from './estilos';

export function BotaoTarefa({ onPress }) {
    return (
        <TouchableOpacity style={estilos.botao} onPress= {onPress}>
            <Text style={estilos.textoBotao}>+</Text>
        </TouchableOpacity>
    )
}