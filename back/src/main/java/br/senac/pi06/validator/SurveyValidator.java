package br.senac.pi06.validator;


import br.senac.pi06.exception.SurveyException;
import br.senac.pi06.model.Survey;
import br.senac.pi06.util.Util;

public class SurveyValidator {

	public static SurveyException validate(Survey s) {

		// NOT NULL
		if (Util.isDate(s.getDate()))
			return new SurveyException("Data eh obrigatorio.");

		return null;

	}
}