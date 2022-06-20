import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBInputGroup, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { socket } from "../main";

function VotingPage() {
    const { app, setApp } = useContext(AppContext)
    const [playerToBeVoted, setToBeVoted] = useState({
        player: { name: '', id: null },
        answers: []
    })
    const [result, setResult] = useState<{
        [key: string]: number | undefined;
    }>({})
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('start_voting', (data) => {
            setToBeVoted({
                player: data.player,
                answers: data.answers
            })

            setResult({})
        })

        socket.on('round_started', (data) => {
            setApp({
                type: 'APP_START_ROUND',
                payload: {
                    letter: data.letter
                }
            })

            navigate('/gameplay')
        })

        socket.on('round_finished', (payload) => {
            console.log(payload)
            setApp({
                type: 'ROUND_FINISHED',
                payload: {
                    scores: payload
                }
            })
            navigate('/score')
        })

        socket.on('last_round_finished', (payload) => {
            console.log(payload)
            setApp({
                type: 'LAST_ROUND_FINISHED',
                payload: {
                    scores: payload
                }
            })
            navigate('/final-score')
        })

        return () => {
            socket.off('start_voting')
            socket.off('round_started')
            socket.off('last_round_finished')
            socket.off('round_finished')
        }
    }, [])



    function vote() {
        socket.emit('vote', { playerId: playerToBeVoted.player.id, votes: result })
    }

    function positiveVote(field: string) {
        const copy: any = { ...result }
        copy[field] = 1
        setResult(copy)
    }

    function negativeVote(field: string) {
        const copy: any = { ...result }
        copy[field] = -1
        setResult(copy)
    }

    function getColorGivenAnswer(answer: any) {

        if (!result[answer.field]) return

        return result[answer.field] == 1 ? 'bg-success' : 'bg-danger'
    }

    return (
        <div style={{ height: "100%" }} className="d-flex align-items-center">
            <MDBContainer fluid>
                <MDBRow className='mb-4' center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <h1>Votação: {playerToBeVoted.player.name}</h1>
                        <h2>Letra: {app.currentRound.letter}</h2>

                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <form>
                            {playerToBeVoted.answers.map((answer: any) => {
                                return (
                                    <MDBInputGroup key={answer.field} className={'mb-4'} >
                                        <MDBBtn color='danger' type='button' outline onClick={() => negativeVote(answer.field)}>-</MDBBtn>
                                        <div className="flex-grow-1">
                                            <MDBInput className={getColorGivenAnswer(answer)} type='text' id={answer.field} value={answer.value} disabled />
                                        </div>
                                        <MDBBtn color='success' type='button' outline onClick={() => positiveVote(answer.field)}>+</MDBBtn>
                                    </MDBInputGroup>
                                )
                            })}

                            <MDBBtn type='button' block onClick={vote}>
                                Finalizar votação
                            </MDBBtn>
                        </form>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default VotingPage;