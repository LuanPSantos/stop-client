import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../App"
import { socket } from "../main"

function LobbyPage() {
    const { app, setApp } = useContext(AppContext)
    const [messageText, setMessageText] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('round_started', (data) => {
            setApp({
                type: 'APP_START_ROUND',
                payload: {
                    letter: data.letter
                }
            })

            navigate('/gameplay')
        })

        socket.on('message_sent', (message) => {

            setApp({
                type: 'APP_LOBBY_SEND_MESSAGE',
                payload: {
                    message
                }
            })
        })

        return () => {
            socket.off("round_started");
            socket.off("message_sent");
        }
    }, [])

    function startRound() {
        socket.emit('start_round')
    }

    function send() {
        socket.emit('send_message', { sender: { ...app.player }, text: messageText })
        setMessageText('')
    }
    return (

        <div style={{ height: "100%" }} className="d-flex align-items-center">
            <MDBContainer fluid>
                <MDBRow className='mb-4' center>
                    <MDBCol className="d-flex align-items-center" sm={12} md={8} lg={8} xl={8} xxl={8}>

                        <h1>Aguardando Jogadores</h1>

                        <div className="flex-fill"></div>

                        <Link style={{ marginRight: '8px' }} to="/home">
                            <MDBBtn type='button'>
                                Sair
                            </MDBBtn>
                        </Link>
                        <MDBBtn type='button' onClick={startRound}>
                            Iniciar
                        </MDBBtn>

                    </MDBCol>
                </MDBRow>
                <MDBRow style={{ minHeight: '500px', backgroundColor: '#eee' }} className='mb-4' center >
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <section className="flex-row">
                            {app.lobby.messages.map((message: any, i: number) => {
                                if (message.sender.id == app.player.id) {
                                    return (
                                        <MDBRow key={i} className='mb-1 p-2' end>
                                            <MDBCol sm={4} md={4} lg={4} xl={4} xxl={4} style={{ backgroundColor: '#fff', borderRadius: '4px' }}>
                                                {`${message.sender.name}: ${message.text}`}
                                            </MDBCol>
                                        </MDBRow>
                                    )
                                } else {
                                    return (
                                        <MDBRow key={i} className='mb-1 p-2' start>
                                            <MDBCol sm={4} md={4} lg={4} xl={4} xxl={4} style={{ backgroundColor: '#fff', borderRadius: '4px' }}>
                                                {`${message.sender.name}: ${message.text}`}
                                            </MDBCol>
                                        </MDBRow>
                                    )
                                }
                            })}
                        </section>

                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <form>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput type='text' id='message' label='Mensagem...' value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                                </MDBCol>
                                <MDBCol style={{ maxWidth: '120px' }}>
                                    <MDBBtn type='button' block onClick={send}>
                                        Enviar
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </form>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default LobbyPage