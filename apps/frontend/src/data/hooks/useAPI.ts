import useSessao from "./useSessao"

export default function useAPI() {

    const { token } = useSessao()

    const urlBase = process.env.NEXT_PUBLIC_API_URL

    async function extrairDados(resposta: Response) {
        let conteudo = ''
        try {
            conteudo = await resposta.text()
            //console.log(conteudo)
            return JSON.parse(conteudo)
        } catch (e) {
            return conteudo
        }
    }
    
    async function httpGet(caminho: string) {
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`

        const resposta = await fetch(urlCompleta, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return extrairDados(resposta)
    }
    
    async function httpPost(caminho: string, body: any) {
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`

        const resposta = await fetch(urlCompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
        //console.log(resposta)
        return extrairDados(resposta)
    }
    
    return { httpGet, httpPost }
}