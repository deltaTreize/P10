import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Form from "./index";

describe("When Events is created", () => {
	it("a list of event card is displayed", async () => {
		render(<Form />);
		await screen.findByText("Email");
		await screen.findByText("Nom");
		await screen.findByText("Prénom");
		await screen.findByText("Personel / Entreprise");
	});

	describe("and a click is triggered on the submit button", () => {
		it("the success action is called", async () => {
			const onSuccess = jest.fn();
			render(<Form onSuccess={onSuccess} />);
      act(async ()=>{

        fireEvent(
          await screen.findByTestId("button-test-id"),
          new MouseEvent("click", {
            cancelable: true,
            bubbles: true,
          })
          );
          
          // Trigger a click on the submit button
          fireEvent.click(screen.getByTestId("button-test-id"));
          
          // Attendez les états que vous voulez tester
          await screen.findByText("En cours");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await screen.findByText("Envoyer");
          expect(onSuccess).toHaveBeenCalled();
        });
      });
    });
  })
