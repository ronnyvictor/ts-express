import express, { Request, Response } from 'express'
import { Car } from './models/car'
import { carService } from './services/car-services'

const app = express()

app.use(express.json())

app.get('/cars', async (request: Request, response: Response) => {
  const result = await carService.getAllCars()
  if(!result){
    response.status(500).send('Something went wrong!')
  }
  response.status(200).json(result)
})

app.post('/cars', async (request: Request, response: Response) =>{
  const {make, model, year} = request.body
  const car: Car = {make, model, year}
  const result = await carService.addNewCar(car)
  car.id  = result.id

  response.status(201).json(car)
})

const PORT = 3450

app.listen(PORT, () => {
  console.log(`Listening at Port ${PORT}`)
})