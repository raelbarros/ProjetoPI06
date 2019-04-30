package br.senac.pi06.validator;

import br.senac.pi06.exception.StudentException;
import br.senac.pi06.model.Student;
import br.senac.pi06.util.Util;

public class StudentValidator {
	public static StudentException validate(Student user) {

		// Email 
		if (!Util.isValidEmailAddress(user.getEmail()))
			return new StudentException("O endere�o de e-mail est� inv�lido.");


		// NOT NULL
		if (Util.empty(user.getFirstName()))
			return new StudentException("O nome � obrigat�rio.");

		if (Util.empty(user.getEmail()))
			return new StudentException("O email � obrigat�rio.");

		if (Util.empty(user.getPeriodo()))
			return new StudentException("O nickname � obrigat�rio.");

		

		return null;
	}
}
