import { CollectionReference } from 'firebase-admin/firestore'
import { connectDb } from '../connectDb'
import { Car } from '../models/car'

interface CarService {
	addNewCar(car: Car): Promise<Car>
	getAllCars(): Promise<Car[] | null>
	getCarById(carId: string): Car
}

const carCollection = connectDb().collection('car') as CollectionReference<Car>

const getAllCars = async (): Promise<Car[] | null> => {
	// const cars: Car[] = []
	// const car1: Car = { make: 'Ford', model: 'Fiesta', year: 2022 }
	// const car2 = { make: 'Ford', model: 'F-150' } as Car

	// cars.push(car1, car2)
	try {
		const result = await carCollection.get()
		const cars = result.docs.map((doc) => {
			const car: Car = doc.data()
			car.id = doc.id
			return car
		})
		return cars
	} catch (error) {
		return null
	}
}

const addNewCar = async (car: Car): Promise<Car> => {
  const result = await carCollection.add(car)
  car.id = result.id
  return car
}

export const carService = { getAllCars, addNewCar } as CarService
