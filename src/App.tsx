import React from 'react'
// import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Input, Text, Button, Card, Image, Divider, Stack } from '@chakra-ui/react'


function App() {
    // START - Joke part 
    const [joke, setJoke] = React.useState<any>("No joke retreived yet!");
    const handleRetreiveJokeFromBackend = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${process.env.REACT_APP_BackendURL_ForJoke}`, requestOptions)
            .then(async response => {
                const data = await response.json()
                console.log("data: ", data)
                setJoke(data.joke)
            })
            .catch(error => {
                //TODO: Not properly working
                console.error('BASRI=>There was an error!', error);
            });
    }
    // END - Joke part
    const [number1, setNumber1] = React.useState<any>(Math.floor(Math.random() * 10));
    const [number2, setNumber2] = React.useState<any>(Math.floor(Math.random() * 20));
    const [error, setError] = React.useState<any>('No error');
    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => setNumber1(e.target.value)
    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => setNumber2(e.target.value)
    const [sum, setSum] = React.useState<any>('Click submit to see the result :) ')
    const [multiplied, setMultiplied] = React.useState<any>('Click submit to see the result :) ')
    const handleSubmitLocal = () => {
        setSum(parseInt(number1) + parseInt(number2))
        setMultiplied(parseInt(number1) * parseInt(number2))
    }
    const handleSubmitBackend = () => {
        let reqObj = Object.create({})
        reqObj.inputArray = `${number1},${number2}`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqObj)
        };
        fetch(`${process.env.REACT_APP_BackendURL}`, requestOptions)
            .then(async response => {
                const data = await response.json()
                console.log("data: ", data)
                setSum(data.summed)
                setMultiplied(data.multiplied)
            })
            .catch(error => {
                //TODO: Not properly working
                console.error('BASRI=>There was an error!', error);
            });
    }

    return (
        <React.Fragment>
            <Card maxW='md'>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <h1>Enter 2 numbers below...Current numbers are random-really</h1>
                <Input value={number1} onChange={handleChange1} />
                <Divider />
                <Input value={number2} onChange={handleChange2} />
                <Divider />
                <Stack spacing={2} align='center'>
                    <Divider />
                    <Button onClick={handleSubmitLocal}>Submit for Local Calculation</Button>
                    <Divider />
                    <Button onClick={handleSubmitBackend}>Submit for Backend Calculation</Button>
                    <Divider />
                </Stack>
                <Divider />
                <Text fontSize='2xl'>Summed: {sum}</Text>
                <Divider />
                <Text fontSize='2xl'>Multiplied: {multiplied}</Text>
                <Divider />
                <Text fontSize='2xl'>Error: {error}</Text>
                <Stack spacing={2} align='center'>
                    <Divider />
                    <Button onClick={handleRetreiveJokeFromBackend}>Bring a Dad Joke!</Button>
                    <Divider />
                    <Text fontSize='2xl'>Dad Joke: {joke}</Text>
                    <Divider />
                </Stack>
            </Card>
        </React.Fragment>
    );
}

export default App
