import { MDBBtn, MDBContainer, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../App"
import { http, socket } from "../main"

function GamePlayPage() {
    const { app } = useContext(AppContext)
    const [nameText, setNameText] = useState('')
    const [placeText, setPlaceText] = useState('')
    const [sportText, setSportText] = useState('')
    const [animalText, setAnimalText] = useState('')
    const [colorText, setColorText] = useState('')
    const [fruitText, setFruitText] = useState('')
    const [movieText, setMovieText] = useState('')
    const navigate = useNavigate()

    function stopRound() {
        socket.emit('stop_round')
    }

    useEffect(() => {
        socket.on('round_stopped', () => {
            socket.emit('send_answers', {
                playerId: app.player.id,
                answers: [
                    {
                        field: 'name',
                        value: nameText
                    },
                    {
                        field: 'place',
                        value: placeText
                    },
                    {
                        field: 'sport',
                        value: sportText
                    },
                    {
                        field: 'animal',
                        value: animalText
                    },
                    {
                        field: 'color',
                        value: colorText
                    },
                    {
                        field: 'fruit',
                        value: fruitText
                    },
                    {
                        field: 'movie',
                        value: movieText
                    }
                ]
            })
            navigate('/voting')
        })

        return () => {
            socket.off('round_stopped')
        }
    })

    return (
        <div style={{ height: "100%" }} className="d-flex align-items-center">
            <MDBContainer fluid>
                <MDBRow className='mb-4' center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <h1>Letra: {app.currentRound.letter}</h1>

                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBCol sm={12} md={8} lg={6} xl={4} xxl={3}>

                        <form>
                            <MDBInput className='mb-4' value={nameText} onChange={(e) => setNameText(e.target.value)} type='text' id='name' label='Um nome' />
                            <MDBInput className='mb-4' value={placeText} onChange={(e) => setPlaceText(e.target.value)} type='text' id='place' label='Um lugar' />
                            <MDBInput className='mb-4' value={sportText} onChange={(e) => setSportText(e.target.value)} type='text' id='sport' label='Um esporte' />
                            <MDBInput className='mb-4' value={animalText} onChange={(e) => setAnimalText(e.target.value)} type='text' id='animal' label='Um animal' />
                            <MDBInput className='mb-4' value={colorText} onChange={(e) => setColorText(e.target.value)} type='text' id='color' label='Uma cor' />
                            <MDBInput className='mb-4' value={fruitText} onChange={(e) => setFruitText(e.target.value)} type='text' id='fruit' label='Uma fruta' />
                            <MDBInput className='mb-4' value={movieText} onChange={(e) => setMovieText(e.target.value)} type='text' id='movie' label='Um filme' />

                            <MDBBtn type='button' block onClick={stopRound}>
                                STOP!
                            </MDBBtn>
                        </form>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default GamePlayPage