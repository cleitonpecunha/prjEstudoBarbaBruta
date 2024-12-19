import CampoProfissional from "../profissional/CampoProfissional";
import CampoServicos from "../servico/CampoServicos";
import CampoDataHora from "../shared/formulario/CampoDataHora";
//import Link from "next/link";
import useAgendamento from "@/data/hooks/useAgendamento";
import Passos from "../shared/Passos";
import Sumario from "./Sumario";

export default function FormularioAgendamento() {

    // hook de agendamento
    const {profissional,
           servicos,
           data,
           horariosOcupados,
           selecionarProfissional,
           selecionarServicos,
           selecionarData,
           agendar,
           podeAgendar,
           qtdeHorarios} = useAgendamento()

    return (
        <div className="flex gap-10">

            <Passos 
                labels={['Selecione o Profissional','Selecione o Serviço','Escolha o Horário']}
                permiteProximoPasso={[!!profissional, servicos.length>0, podeAgendar(),]}
                acao={agendar}
                labelAcao="Agendar"
            >            
                <CampoProfissional 
                    label="Profissionais disponíveis" 
                    value={profissional} 
                    onChange={selecionarProfissional}
                    className="input"
                />
                <CampoServicos 
                    label="Serviços disponíveis" 
                    value={servicos} 
                    onChange={selecionarServicos}
                    className="input"
                /> 
                <CampoDataHora
                    label="Data e Hora" 
                    value={data}
                    qtdeHorarios={qtdeHorarios()}
                    onChange={selecionarData}
                    horariosOcupados={horariosOcupados}
                    className="input"
                    apenasNoFuturo={true}
                />
            
            </Passos>
            <Sumario/>           

            {/* <div className="flex gap-5">
                <button className="button bg-blue-500" onClick={agendar}>Agendar</button>
                <Link href="/" className="button">Voltar</Link>
            </div> */}

        </div>
    )
}