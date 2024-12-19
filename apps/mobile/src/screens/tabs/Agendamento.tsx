import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import FormularioAgendamento from '@/src/components/agendamento/FormularioAgendamento'
import { ProvedorAgendamento } from '@/src/data/contexts/ContextoAgendamento'

export default function Agendamento({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <FormularioAgendamento finalizar={() => navigation.navigate('Sumario')} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    scroll: {
        paddingVertical: 20,
    },
})