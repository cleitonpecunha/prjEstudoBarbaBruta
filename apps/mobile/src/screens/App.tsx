import { View, Text} from 'react-native'

export function App() {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{process.env.API_URL}</Text>
    </View>
}