import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Form from "../components/Form";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const createAppointment = jest.fn();

afterEach(cleanup);

test("should load the <Form /> component", () => {
	// const wrapper = render(<Form />);
	// wrapper.debug();
	// const { getByText } = render(<Form />);
	// expect(getByText("Create Appointment")).toBeInTheDocument();
	render(<Form createAppointment={createAppointment} />);
	expect(screen.getByText("Create Appointment")).toBeInTheDocument();

	// Heading
	const title = screen.getByTestId("title");
	expect(title.tagName).toBe("H2");
	expect(title.tagName).not.toBe("H1");
	expect(title.textContent).toBe("Create Appointment");

	// Submit Button
	expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON");
	expect(screen.getByTestId("btn-submit").textContent).toBe("Add Appointment");
});

test("should validate <Form /> with error alert", () => {
	render(<Form createAppointment={createAppointment} />);

	// Click submit button
	const btnSubmit = screen.getByTestId("btn-submit");
	fireEvent.click(btnSubmit);

	// Review alert
	const alert = screen.getByTestId("alert");
	expect(alert).toBeInTheDocument();
	expect(alert.textContent).toBe("All fields are required");
	expect(alert.tagName).toBe("P");
});

test("should Validate Form with userEvent", () => {
	render(<Form createAppointment={createAppointment} />);

	// With firEvent
	// fireEvent.change(screen.getByTestId("pet"), {
	// 	target: { value: "Hook" },
	// });

	// fireEvent.change(screen.getByTestId("owner"), {
	// 	target: { value: "Alejandro" },
	// });

	userEvent.type(screen.getByTestId("pet"), "Hook");
	userEvent.type(screen.getByTestId("owner"), "Alejandro");
	userEvent.type(screen.getByTestId("date"), "2020-12-20");
	userEvent.type(screen.getByTestId("time"), "10:30");
	userEvent.type(screen.getByTestId("syntoms"), "Hooks syntoms");

	// Click submit button
	const btnSubmit = screen.getByTestId("btn-submit");
	userEvent.click(btnSubmit);

	// Review alert
	const alert = screen.queryByTestId("alert"); // query instead get
	expect(alert).not.toBeInTheDocument();

	// Create a date by form and check callback has been called
	expect(createAppointment).toHaveBeenCalled();
	expect(createAppointment).toHaveBeenCalledTimes(1);
});
