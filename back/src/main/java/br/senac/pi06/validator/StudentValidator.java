package br.senac.pi06.validator;

import br.senac.pi06.exception.StudentException;
import br.senac.pi06.model.Student;
import br.senac.pi06.util.Util;

public class StudentValidator {
	public static StudentException validate(Student s) {
		// Email 
		if (!Util.isValidEmailAddress(s.getEmail()))
			return new StudentException("O endereco de e-mail esta invalido.");

		// NOT NULL
		if (Util.empty(s.getFirstName()))
			return new StudentException("O nome eh obrigatorio.");
		
		if (Util.empty(s.getLastName()))
			return new StudentException("O sobrenome eh obrigatorio.");

		if (Util.empty(s.getEmail()))
			return new StudentException("O email eh obrigatorio.");

		if (Util.empty(s.getPeriodo()))
			return new StudentException("O semestre eh obrigatorio.");

		return null;
	}
}
