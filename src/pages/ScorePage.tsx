import { MDBBtn, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBInputGroup, MDBListGroup, MDBListGroupItem, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { socket } from "../main";

function ScorePage() {
    const { app, setApp } = useContext(AppContext)
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

        return () => {
            socket.off("round_started")
        }
    }, [])

    return (
        <div style={{ height: "100%" }} className="d-flex align-items-center">
            <MDBContainer fluid>
                <MDBRow className='mb-4' center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <h1>Round Finalizado</h1>
                        <h2>Contagem dos pontos</h2>

                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <MDBListGroup flush style={{ minWidth: '22rem' }}>

                            {app.scores.map((playerScore: any, index: any) => {
                                return (
                                    <MDBListGroupItem key={index}>
                                        <span style={{ float: 'left' }}>{playerScore.player.name}</span >
                                        <span style={{ float: 'right' }}>{playerScore.score}</span>
                                    </MDBListGroupItem>
                                )
                            })}

                        </MDBListGroup>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default ScorePage;