import { MDBBtn, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBInputGroup, MDBListGroup, MDBListGroupItem, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { socket } from "../main";

function FinalScorePage() {
    const { app, setApp } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('game_finished', () => {
            navigate('/lobby')
        })

        return () => {
            socket.off("game_finished")
        }
    }, [])

    return (
        <div style={{ height: "100%" }} className="d-flex align-items-center">
            <MDBContainer fluid>
                <MDBRow className='mb-4' center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <h1>Placar Final</h1>

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

export default FinalScorePage;