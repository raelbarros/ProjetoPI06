package br.senac.pi06.validator;

import br.senac.pi06.exception.CollegeException;
import br.senac.pi06.model.College;
import br.senac.pi06.util.Util;

public class CollegeValidator {
	
	public static Exception validate(College college) {

		// NOT NULL
		if (Util.empty(college.getName()))
			return new CollegeException("o nome eh obrigatorio.");
	
		return null;
	
	}
}
