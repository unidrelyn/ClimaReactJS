import React, { Fragment, useState, useEffect } from "react";
import Clima from "./components/Clima";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Error from "./components/Error";

function App() {
	const [busqueda, setBusqueda] = useState({
		ciudad: "",
		pais: "",
	});

	const [consultar, setConsultar] = useState(false);
	const [resultadoConsulta, setResultadoConsulta] = useState({});
	const [error, setError] = useState(false);

	const { ciudad, pais } = busqueda;

	useEffect(() => {
		const consultarAPI = async () => {
			if (consultar) {
				const appId = "4200ee98942767817d8d63d6c0a2f8ff";
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

				const respuesta = await fetch(url);

				const resultado = await respuesta.json();
				setResultadoConsulta(resultado);
				setConsultar(false);
				if (resultadoConsulta.cod === "404") {
					setError(true);
				} else {
					setError(false);
				}
			}
		};
		consultarAPI();
		//eslint-disable-next-line
	}, [consultar]);

	let componente;
	if (error) {
		componente = <Error mensaje="no hay resultados" />;
	} else {
		componente = <Clima resultadoConsulta={resultadoConsulta} />;
	}

	return (
		<Fragment>
			<Header titulo="Clima React App" />
			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className="col m6 s12">
							<Formulario
								busqueda={busqueda}
								setBusqueda={setBusqueda}
								setConsultar={setConsultar}
							/>
						</div>
						<div className="col m6 s12">{componente}</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
