import React, { Fragment, useState } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

const Form = ({ createAppointment }) => {
	const [appointment, updateAppointment] = useState({
		pet: "",
		owner: "",
		date: "",
		hour: "",
		syntoms: "",
	});
	const [error, updateError] = useState(false);

	const updateState = (e) => {
		updateAppointment({
			...appointment,
			[e.target.name]: e.target.value,
		});
	};

	const { pet, owner, date, hour, syntoms } = appointment;

	const submitAppointment = (e) => {
		e.preventDefault();

		// Validar
		if (
			pet.trim() === "" ||
			owner.trim() === "" ||
			date.trim() === "" ||
			hour.trim() === "" ||
			syntoms.trim() === ""
		) {
			updateError(true);
			return;
		}
		// Delete el mensaje previo
		updateError(false);

		// Asignar un ID
		appointment.id = uuid();

		// console.log(appointment);

		// Create la appointment
		createAppointment(appointment);

		// Reiniciar el form
		updateAppointment({
			pet: "",
			owner: "",
			date: "",
			hour: "",
			syntoms: "",
		});
	};

	return (
		<Fragment>
			<h2 data-testid="title">Create Appointment</h2>

			{error ? (
				<p data-testid="alert" className="alerta-error">
					All fields are required
				</p>
			) : null}

			<form onSubmit={submitAppointment}>
				<label>Name Pet</label>
				<input
					data-testid="pet"
					type="text"
					name="pet"
					className="u-full-width"
					placeholder="Name Pet"
					onChange={updateState}
					value={pet}
				/>

				<label>Name Owner</label>
				<input
					data-testid="owner"
					type="text"
					name="owner"
					className="u-full-width"
					placeholder="Name Owner"
					onChange={updateState}
					value={owner}
				/>

				<label>Date</label>
				<input
					data-testid="date"
					type="date"
					name="date"
					className="u-full-width"
					onChange={updateState}
					value={date}
				/>

				<label>Hour</label>
				<input
					data-testid="time"
					type="time"
					name="hour"
					className="u-full-width"
					onChange={updateState}
					value={hour}
				/>

				<label>Síntomas</label>
				<textarea
					data-testid="syntoms"
					className="u-full-width"
					name="syntoms"
					onChange={updateState}
					value={syntoms}></textarea>

				<button
					data-testid="btn-submit"
					type="submit"
					className="u-full-width button-primary">
					Add Appointment
				</button>
			</form>
		</Fragment>
	);
};

Form.propTypes = {
	createAppointment: PropTypes.func.isRequired,
};

export default Form;
