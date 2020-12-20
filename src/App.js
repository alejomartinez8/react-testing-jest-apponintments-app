import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";

function App() {
	// Appointments en local storage
	let initialAppointments = JSON.parse(localStorage.getItem("appointments"));
	if (!initialAppointments) {
		initialAppointments = [];
	}

	// Arreglo de appointments
	const [appointments, setAppointments] = useState(initialAppointments);

	// Use Effect para realizar ciertas operaciones cuando el state cambia
	useEffect(() => {
		let initialAppointments = JSON.parse(localStorage.getItem("appointments"));

		if (initialAppointments) {
			localStorage.setItem("appointments", JSON.stringify(appointments));
		} else {
			localStorage.setItem("appointments", JSON.stringify([]));
		}
	}, [appointments]);

	// Function that takes the current appointments and adds the new one
	const createAppointment = (appointment) => {
		setAppointments([...appointments, appointment]);
	};

	// Function that removes an appointment by its id
	const deleteAppointment = (id) => {
		const newAppointments = appointments.filter(
			(appointment) => appointment.id !== id
		);
		setAppointments(newAppointments);
	};

	// Conditional message
	const title =
		appointments.length === 0
			? "There is not appointments"
			: "Manage your Appointments";

	return (
		<Fragment>
			<h1 data-testid="name-app">Patient Manager</h1>

			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Form createAppointment={createAppointment} />
					</div>
					<div className="one-half column">
						<h2 data-testid="title-dynamic">{title}</h2>
						{appointments.map((appointment) => (
							<Appointment
								key={appointment.id}
								appointment={appointment}
								deleteAppointment={deleteAppointment}
							/>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
