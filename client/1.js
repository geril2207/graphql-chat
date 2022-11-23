const hours_delta = 0;

	const single_record_export = true;

	//report vars:
	//report_intents - array of string: "key" | "key@subkey"
	//report_errors - array of string: "key@value1;value2;value3"
	//report_debug - array of string: "key@value1;value2;value3"
	//report_mark - integer

	const { id, call } = params;
	const channel = call.channel;
	const session_id = call.session_id;
	const ani = call.ani;
	const dnis = call.dnis;
	const start_date = call.start_date;
	const end_date = call.end_date;
	const duration = Math.trunc((end_date.getTime() - start_date.getTime()) / 1000);
	const steps = call.steps;

	let main_intent = "";
	let all_intents = [];
	let errors = [];
	let debug = [];
	let mark = 0;
	let result = [];

	function getDateWithTimezone(dt, hoursDelta) {
		var tmp_date = new Date(dt);
		tmp_date.setTime(tmp_date.getTime() + (hoursDelta * 60 * 60 * 1000));
		return tmp_date;
	}

	function createItem(mainIntent, allIntents, errors, debug, mark) {
		return {
			start_date: getDateWithTimezone(start_date, hours_delta),
			phone: ani,
			session_id: session_id,
			channel: channel,
			duration: duration,
			main_intent: mainIntent,
			all_intents: allIntents,
			errors: errors,
			debug: debug,
			mark: mark
		};
	}

	function getArrAsStr(arr) {
		let tmp = "";
		arr.forEach(item => {
			tmp = tmp + item + ";";
		});
		tmp = tmp.replace(/;$/g, '');
		return tmp;
    }

	if (steps.length > 0) {
		for (let i = steps.length - 1; i >= 0; i--) {
			const step = steps[i];
			const step_variables = step.variables;

			if (step_variables === undefined) {
				continue;
			}
			if (Object.keys(step_variables).length === 0) {
				continue;
			}
			if (mark === 0) {
				if ("report_mark" in step_variables["#"]) {
					mark = step_variables["#"].report_mark;
				}
			}
			if (all_intents.length === 0) {
				if ("report_intents" in step_variables["#"]) {
					let report_intents = step_variables["#"].report_intents;
					report_intents.forEach((element) => {
						if (element.length != 0) {
							element = element.replace(/;{3,}/g, '');
							element = element.replace(/;{2}/g, ';');
							element = element.replace(/;$/g, '');
							if (main_intent === "") {
								main_intent = element;
							}
							all_intents.push(element);
						}
					});
				}
			}
			if (errors.length === 0) {
				if ("report_errors" in step_variables["#"]) {
					let report_errors = step_variables["#"].report_errors;
					report_errors.forEach((element) => {
						if (element.length != 0) {
							element = element.replace(/;{3,}/g, '');
							element = element.replace(/;{2}/g, ';');
							element = element.replace(/;$/g, '');
							errors.push(element);
						}
					});
				}
			}
			if (debug.length === 0) {
				if ("report_debug" in step_variables["#"]) {
					let report_debug = step_variables["#"].report_debug;
					report_debug.forEach((element) => {
						if (element.length != 0) {
							element = element.replace(/;{3,}/g, '');
							element = element.replace(/;{2}/g, ';');
							element = element.replace(/;$/g, '');
							debug.push(element);
						}
					});
				}
			}
		}
	}
	if (main_intent === "") {
		main_intent = "Сброс звонка";
	}
	if (single_record_export) {
		let tmp_intents = getArrAsStr(all_intents);
		let tmp_errors = getArrAsStr(errors);
		let tmp_debug = getArrAsStr(debug);
		result.push(createItem(main_intent, tmp_intents, tmp_errors , tmp_debug, mark));
	} else {
		let tmp_intents = getArrAsStr(all_intents);
		let tmp_errors = getArrAsStr(errors);
		let tmp_debug = getArrAsStr(debug);
		all_intents.forEach(intent => {
			result.push(createItem(intent, tmp_intents, tmp_errors, tmp_debug, mark));
		});
	}

	return result
