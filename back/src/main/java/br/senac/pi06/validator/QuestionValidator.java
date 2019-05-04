package br.senac.pi06.validator;


import br.senac.pi06.exception.QuestionException;
import br.senac.pi06.model.Question;
import br.senac.pi06.util.Util;

public class QuestionValidator {

	public static QuestionException validate(Question q) {

		// NOT NULL
		if (Util.empty(q.getQuestion()))
			return new QuestionException("A questao eh obrigatorio.");

		return null;

	}
}