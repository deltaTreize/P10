import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

import "./form.scss";

const mockContactApi = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

const Form = ({ onSuccess, onError }) => {
	const [sending, setSending] = useState(false);
	const [success, setSuccess] = useState(false);
	const sendContact = useCallback(
		async (evt) => {
			evt.preventDefault();
			setSending(true);
			// We try to call mockContactApi
			try {
				await mockContactApi();
				setSending(false);
				setSuccess(true);
			} catch (err) {
				setSending(false);
				setSuccess(false);
				onError(err);
			}
		},
		[onSuccess, onError]
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setSuccess(false);
		}, 3000);

		return () => clearTimeout(timer);
	});

	return (
		<form onSubmit={sendContact}>
			<div className="row">
				<div className="col">
					<Field placeholder="" label="Nom" />
					<Field placeholder="" label="Prénom" />
					<Select
						selection={["Personel", "Entreprise"]}
						onChange={() => null}
						label="Personel / Entreprise"
						type="large"
						titleEmpty
					/>
					<Field placeholder="" label="Email" />
					<Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
						{sending ? "En cours" : "Envoyer"}
					</Button>
				</div>
				<div className="col">
					<Field
						placeholder="message"
						label="Message"
						type={FIELD_TYPES.TEXTAREA}
					/>
					{success && <p className="success_message">Message envoyé !</p>}
				</div>
			</div>
		</form>
	);
};

Form.propTypes = {
	onError: PropTypes.func,
	onSuccess: PropTypes.func,
};

Form.defaultProps = {
	onError: () => null,
	onSuccess: () => null,
};

export default Form;
