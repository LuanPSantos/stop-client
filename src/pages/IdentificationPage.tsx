import { MDBBtn, MDBContainer, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { socket } from "../main"
import { useNavigate } from "react-router-dom";


function IdentificationPage() {
    const { app, setApp } = useContext(AppContext)
    const [name, setName] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('player_setted', (player) => {
            setApp({ type: 'APP_ENTER', payload: { player } })
            navigate('/lobby')
        })


        return () => {
            socket.off('player_setted')
        }
    }, [])

    function enter() {
        socket.emit('set_player', { name })
    }

    return (
        <div style={{ height: "100%" }} className="d-flex align-items-center">
            <MDBContainer fluid>
                <MDBRow className='mb-4' center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <h1>STOP!</h1>

                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <form>
                            <MDBInput className='mb-4' type='text' id='name' label='Seu nome' value={name} onChange={(e) => setName(e.target.value)} />

                            <MDBBtn type='button' block onClick={enter}>
                                Entrar
                            </MDBBtn>
                        </form>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default IdentificationPage