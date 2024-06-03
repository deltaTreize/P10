import { useEffect, useState } from "react";
import { getMonth } from "../../helpers/Date";
import { useData } from "../../contexts/DataContext";


import "./style.scss";
const Slider = () => {
	const { data } = useData();
	const [index, setIndex] = useState(0);
	// filtre du tableau par date du plus ancien au plus recent 
	const byDateDesc = data?.focus.sort((evtA, evtB) =>
	new Date(evtA.date) > new Date(evtB.date) ? 1 :-1
	);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
		}, 5000);

		return () => clearTimeout(timer); // nettoyage du timeout précédent
	}, [index, byDateDesc]);
	
	return (
			<div className="SlideCardList">
				{byDateDesc?.map((event, idx) => (
					<div
						key={event.title}
						className={`SlideCard SlideCard--${
							index === idx ? "display" : "hide"
						}`}
					>
						<img src={event.cover} alt="forum" />
						<div className="SlideCard__descriptionContainer">
							<div className="SlideCard__description">
								<h3>{event.title}</h3>
								<p>{event.description}</p>
								<div>{getMonth(new Date(event.date))}</div>
							</div>
						</div>
					</div>
				))}
				{/* séparation des bouletPoints pour ne les créer q'une fois */}
			<div className="SlideCard__paginationContainer">
				<div className="SlideCard__pagination">
					{byDateDesc?.map((event, idx) => (
						<input
							key= {event.id + event.title}
							type="radio"
							name="radio-button"
							checked= {idx === index}
							onClick={() => setIndex(idx)}
						/>
					))}
				</div>
			</div>
			</div>
	);
};

export default Slider;
