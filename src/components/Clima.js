import React from "react";
import PropTypes from "prop-types";

const Clima = ({ resultadoConsulta }) => {
	const { name, main } = resultadoConsulta;

	if (!name) return null;
	console.log(resultadoConsulta);

	const gradosC = parseFloat(main.temp - 273.15, 10).toFixed(2);
	const gradosCmax = parseFloat(main.temp_max - 273.15, 10).toFixed(2);
	const gradosCmin = parseFloat(main.temp_min - 273.15, 10).toFixed(2);

	return (
		<div className="card-panel white col s12">
			<div className="black-text">
				<h2>EL clima de {name} es: </h2>
				<p className="temperatura">
					{gradosC} <span>&#x2103;</span>
				</p>
				<p>
					Temperatura Maxima:
					{gradosCmax} <span>&#x2103;</span>
				</p>
				<p>
					Temperatura Minima:
					{gradosCmin} <span>&#x2103;</span>
				</p>
			</div>
		</div>
	);
};

Clima.protoTypes = {
	resultadoConsulta: PropTypes.object.isRequired,
};
export default Clima;
