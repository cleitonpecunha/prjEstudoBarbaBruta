import { SafeAreaView, StyleSheet, View } from 'react-native'
import useSessao from '@/src/data/hooks/useSessao'
import PerfilUsuario from '@/src/components/usuario/PerfilUsuario'

export default function Usuario({ navigation }: any) {
    
    const { usuario, encerrarSessao } = useSessao()

    async function logout() {
        await encerrarSessao()
        navigation.replace('Autenticacao')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, paddingTop: 15 }}>
                <PerfilUsuario usuario={usuario!} logout={logout} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
})