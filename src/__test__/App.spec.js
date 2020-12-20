import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("should add a new appointment", () => {
	// const wrapper = render(<App />);
	// wrapper.debug();

	render(<App />);

	expect(screen.getByText("Patient Manager")).toBeInTheDocument();
	expect(screen.getByTestId("name-app").textContent).toBe("Patient Manager");
	expect(screen.getByTestId("name-app").tagName).toBe("H1");

	expect(screen.getByText("Create Appointment")).toBeInTheDocument();
	expect(screen.getByText("There is not appointments")).toBeInTheDocument();
});

test("should <App/> render correctly", () => {
	render(<App />);

	userEvent.type(screen.getByTestId("pet"), "Hook");
	userEvent.type(screen.getByTestId("owner"), "Alejandro");
	userEvent.type(screen.getByTestId("date"), "2020-12-20");
	userEvent.type(screen.getByTestId("time"), "10:30");
	userEvent.type(screen.getByTestId("syntoms"), "Hooks syntoms");

	// Click submit button
	const btnSubmit = screen.getByTestId("btn-submit");
	userEvent.click(btnSubmit);

	// userEvent.type(screen.getByTestId("pet"), "Hook 2");
	// userEvent.type(screen.getByTestId("owner"), "Alejandro");
	// userEvent.type(screen.getByTestId("date"), "2020-12-20");
	// userEvent.type(screen.getByTestId("time"), "10:30");
	// userEvent.type(screen.getByTestId("syntoms"), "Hooks syntoms");
	// userEvent.click(btnSubmit);

	// Review alert
	const alert = screen.queryByTestId("alert"); // query instead get
	expect(alert).not.toBeInTheDocument();

	// Review title
	expect(screen.getByTestId("title-dynamic").textContent).toBe(
		"Manage your Appointments"
	);
	expect(screen.getByTestId("title-dynamic").textContent).not.toBe(
		"There is not appointments"
	);
});

test("should Verify the appointmes on the DOM", async () => {
	render(<App />);
	const appointments = await screen.findAllByTestId("appointment");

	// Snapshot crea u archivo para verificar su contenido
	// expect(appointments).toMatchSnapshot();

	expect(screen.getByTestId("btn-delete").tagName).toBe("BUTTON");
	expect(screen.getByTestId("btn-delete")).toBeInTheDocument();

	// Verify an appointment
	expect(screen.getByText("Hook")).toBeDefined();
});

test("should delete and appointmen", () => {
	render(<App />);

	const btnDelete = screen.getByTestId("btn-delete");
	expect(btnDelete.tagName).toBe("BUTTON");
	expect(btnDelete).toBeInTheDocument();

	// simulate click
	userEvent.click(btnDelete);

	// The button must disappear
	expect(btnDelete).not.toBeInTheDocument();

	// The appointment must disappear too
	expect(screen.queryByText("Hook")).not.toBeInTheDocument();
	expect(screen.queryByTestId("appointment")).not.toBeInTheDocument();
});
